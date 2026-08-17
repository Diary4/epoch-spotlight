// Downscales and recompresses the artwork that actually ships, for the
// 1080×1920 kiosk panel.
//
// Usage:
//   npm run build                                   # so dist/ reflects the current imports
//   npm install --no-save sharp
//   node scripts/optimize-images-for-kiosk.mjs       # dry run
//   node scripts/optimize-images-for-kiosk.mjs --apply
//
// Scope — only files Vite actually emitted. `src/assets` also holds camera
// originals that no longer have an importer (the `.JPG`s next to their converted
// `.webp`, for instance); rewriting those would cost time, risk clobbering a
// sibling and change nothing about what the kiosk downloads. Every candidate is
// therefore matched to a file in `dist/assets` **by content hash**, which is
// exact: Vite copies asset bytes through unchanged.
//
// Sizing — two rules, in order of how much is known about the image:
//
// 1. MEASURED. `kiosk-media-boxes.json` records the largest box each image was
//    actually drawn into, captured by walking the running production build at
//    1080×1920 with Chrome DevTools Protocol. Combined with the element's
//    `object-fit`, that gives the resolution the image needs — and it is often a
//    tiny fraction of what ships: `crown.webp` is a 1024×1536 file drawn into a
//    111×167 icon slot, and `land-6.webp` is 3504×2336 drawn into 310×159.
//
//    A walk only sees the states it reached, so the measured requirement is
//    multiplied by MEASURED_MARGIN (2×, i.e. four times the pixels) before it is
//    used. Even with that safety factor `crown.webp` still drops ~21× in pixels.
//
// 2. UNMEASURED — the conservative panel bound. The largest box any element can
//    occupy is the panel itself, 1080×1920, so an image filling it with `cover`
//    is scaled by `max(1080/w, 1920/h)`; resolution beyond that is detail the
//    panel physically cannot resolve. A 5472×3648 photo (20 MP, ~80 MB once
//    decoded to RGBA) becomes 2880×1920 — still covering the panel edge to edge,
//    at a quarter of the decode cost and memory footprint.
//
// Images already at or below their threshold keep their dimensions and are only
// re-encoded when their bytes-per-pixel is high enough to be clearly worth it,
// so the rest never take another lossy generation.

import { promises as fs } from "node:fs";
import crypto from "node:crypto";
import path from "node:path";
import url from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ASSETS_ROOT = path.join(ROOT, "src", "assets");
const DIST_ASSETS = path.join(ROOT, "dist", "assets");

/**
 * Bound for the unmeasured case, in physical panel pixels.
 *
 * The panel is 1080×1920, but that is not quite the ceiling: several screens sit
 * on a design artboard that is scaled to *fill* the viewport width and can end up
 * marginally wider than it, so a full-bleed layer measures up to ~1200×2133 on
 * this panel. Verification caught a handful of backgrounds sitting 4–6% under 1:1
 * after being cut to exactly 1080×1920, so the bound carries that headroom.
 */
const PANEL_W = 1200;
const PANEL_H = 2133;

/**
 * Safety factor on a measured requirement: allows for a state the walk never
 * reached drawing the image up to twice as large in each axis.
 */
const MEASURED_MARGIN = 2;

const BOXES_FILE = path.join(__dirname, "kiosk-media-boxes.json");

/** WebP quality. Matches scripts/convert-images.mjs so the look stays consistent. */
const QUALITY = 82;

/**
 * Only recompress a same-size image when it is denser than this many bytes per
 * pixel. Below it the file is already lean and re-encoding would just spend
 * another lossy generation to save a few kilobytes.
 */
const RECOMPRESS_BPP = 0.28;

const IMAGE_EXTS = new Set([".webp", ".png", ".jpg", ".jpeg"]);

/** Artwork that must keep its native resolution regardless of the panel rule. */
const SKIP = [
  // Escape hatch for art that is intentionally oversampled — e.g. an image the
  // UI zooms into past 1:1, where the panel rule would be too aggressive.
];

async function walk(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

const mb = (b) => (b / 1024 / 1024).toFixed(2);
const sha = (buf) => crypto.createHash("sha1").update(buf).digest("hex");

/** Scale needed for the image to still cover the panel, capped at 1 (never upscale). */
function coverScale(w, h) {
  return Math.min(1, Math.max(PANEL_W / w, PANEL_H / h));
}

/**
 * Target size for an image with a known display box. For `cover` the axis that
 * crops decides how much resolution is needed; for `contain` the axis that fits
 * does. Never upscales, and never exceeds the panel bound.
 */
function measuredTarget(w, h, entry) {
  const [bw, bh] = entry.box;
  const fit = entry.fit === "contain" || entry.fit === "scale-down" ? "contain" : "cover";
  const need = fit === "contain" ? Math.min(bw / w, bh / h) : Math.max(bw / w, bh / h);
  const scale = Math.min(coverScale(w, h), need * MEASURED_MARGIN);
  return scale;
}

async function shippedHashes() {
  let entries;
  try {
    entries = await fs.readdir(DIST_ASSETS);
  } catch {
    throw new Error(
      `${path.relative(ROOT, DIST_ASSETS)} not found — run \`npm run build\` first so the script knows which assets ship.`,
    );
  }
  const hashes = new Set();
  for (const name of entries) {
    if (!IMAGE_EXTS.has(path.extname(name).toLowerCase())) continue;
    hashes.add(sha(await fs.readFile(path.join(DIST_ASSETS, name))));
  }
  return hashes;
}

async function main() {
  const apply = process.argv.includes("--apply");
  if (!apply) console.log("DRY RUN — pass --apply to write files\n");

  const shipped = await shippedHashes();
  console.log(`${shipped.size} distinct images in dist/assets`);

  /** basename -> { box, fit, intrinsic? } from the measurement walk. */
  let measured = {};
  try {
    measured = JSON.parse(await fs.readFile(BOXES_FILE, "utf8"));
    console.log(`${Object.keys(measured).length} measured display boxes loaded\n`);
  } catch {
    console.log("no kiosk-media-boxes.json — falling back to the panel bound for every image\n");
  }

  const files = (await walk(ASSETS_ROOT)).filter((f) =>
    IMAGE_EXTS.has(path.extname(f).toLowerCase()),
  );

  let before = 0;
  let after = 0;
  let resized = 0;
  let recompressed = 0;
  let untouched = 0;
  let notShipped = 0;
  const failures = [];
  const plan = [];

  for (const file of files) {
    const rel = path.relative(ROOT, file);
    if (SKIP.some((s) => rel.includes(s))) {
      untouched++;
      continue;
    }

    try {
      const original = await fs.readFile(file);
      if (!shipped.has(sha(original))) {
        notShipped++;
        continue;
      }

      const size = original.length;
      const meta = await sharp(original).metadata();
      const { width: w, height: h } = meta;
      if (!w || !h) {
        untouched++;
        continue;
      }

      // A measured box only applies when the file on disk is the one that was
      // measured — the intrinsic size proves it, since basenames repeat between
      // asset folders.
      const entry = measured[path.basename(file)];
      const entryMatches =
        entry && (!entry.intrinsic || (entry.intrinsic[0] === w && entry.intrinsic[1] === h));

      const s = entryMatches ? measuredTarget(w, h, entry) : coverScale(w, h);
      const how = entryMatches ? `box ${entry.box[0]}×${entry.box[1]} ${entry.fit}` : "panel bound";
      const targetW = Math.max(1, Math.round(w * s));
      const targetH = Math.max(1, Math.round(h * s));
      const willResize = s < 1 && (targetW !== w || targetH !== h);
      const willRecompress = !willResize && size / (w * h) > RECOMPRESS_BPP;

      if (!willResize && !willRecompress) {
        before += size;
        after += size;
        untouched++;
        continue;
      }

      // Re-encode in place, keeping the container so no import has to change.
      // WebP alpha is carried through by sharp.
      const ext = path.extname(file).toLowerCase();
      let pipeline = sharp(original, { failOn: "none" });
      if (willResize) {
        pipeline = pipeline.resize(targetW, targetH, { fit: "fill", kernel: "lanczos3" });
      }
      if (ext === ".png") {
        pipeline = pipeline.png({ compressionLevel: 9, palette: true });
      } else if (ext === ".jpg" || ext === ".jpeg") {
        pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true });
      } else {
        pipeline = pipeline.webp({ quality: QUALITY, effort: 6, smartSubsample: true });
      }
      const buf = await pipeline.toBuffer();

      // Never regress: keep the original when the "optimized" file came out
      // bigger and we were not resizing real pixels away.
      if (!willResize && buf.length >= size) {
        before += size;
        after += size;
        untouched++;
        continue;
      }

      plan.push({ rel, w, h, targetW, targetH, size, newSize: buf.length, willResize, how });
      before += size;
      after += buf.length;
      if (willResize) resized++;
      else recompressed++;

      if (apply) await fs.writeFile(file, buf);
    } catch (err) {
      failures.push({ file: rel, error: err.message });
    }
  }

  plan.sort((a, b) => b.size - b.newSize - (a.size - a.newSize));
  console.log("Largest savings:");
  for (const p of plan.slice(0, 40)) {
    const dims = p.willResize
      ? `${p.w}×${p.h} → ${p.targetW}×${p.targetH} [${p.how}]`
      : `${p.w}×${p.h} (recompress)`;
    console.log(`  ${mb(p.size)}MB → ${mb(p.newSize)}MB  ${dims}  ${p.rel}`);
  }

  console.log("\n---");
  console.log(
    `resized: ${resized}   recompressed: ${recompressed}   ` +
      `already optimal: ${untouched}   not shipped (skipped): ${notShipped}`,
  );
  console.log(`shipped artwork: ${mb(before)} MB → ${mb(after)} MB (saved ${mb(before - after)} MB)`);
  if (failures.length) {
    console.log("\nFailures:");
    for (const f of failures) console.log("  ", f.file, "->", f.error);
  }
  if (!apply) console.log("\nDRY RUN — nothing written. Re-run with --apply.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
