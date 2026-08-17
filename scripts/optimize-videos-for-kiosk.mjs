// Re-encodes the hero videos for the 1080×1920 kiosk panel.
// Usage: node scripts/optimize-videos-for-kiosk.mjs [--apply] [name ...]
// Requires: ffmpeg/ffprobe on PATH.
//
// The problem this solves is decode cost, not just download size. Several heroes
// are 4K60 sources — `kch3.webm` is 3840×2160 at 60 fps — and the panel's GPU has
// to decode every one of those pixels before scaling them down into a box a
// fraction of that size. That is the budget the page's own animations need.
//
// WHAT IS PRESERVED, EXACTLY
//   - Duration, frame rate, frame timing and colour are untouched: no `-r`, no
//     `-vsync`, no filters beyond `scale`. Every video still plays for the same
//     time, at the same speed, with the same motion.
//   - Codec stays VP9 in WebM, so nothing about loading or compatibility changes.
//   - Only the pixel grid shrinks, and only to the point where the panel can
//     still show one source pixel per device pixel in the box the element
//     actually occupies.
//   - The audio track is dropped. Every one of these videos is rendered by a
//     `<video muted>` element, so the track was decoded and never heard.
//
// HOW EACH TARGET WAS DERIVED
// `BOXES` below records the box each video is drawn into, in physical pixels on
// the 1080×1920 panel, and how that box was established:
//   - "measured": read off the running production build with Chrome DevTools
//     Protocol at 1080×1920 (element getBoundingClientRect).
//   - "css": derived from the component's own classes plus the design canvas it
//     sits in. Screens built on the 1080 artboard map 1:1 to the panel; the
//     `women` artboard is 1400 wide and is width-scaled by 1080/1400 = 0.771.
//
// From the box and the element's `object-fit`, `requiredSize` computes the
// smallest source that still fills it without upscaling — for `cover` the axis
// that crops decides, for `contain` the axis that fits does.
//
// A video whose box was not established keeps its resolution: it is only
// re-encoded to shed bitrate, never resized on a guess.

import { execFile } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";
import url from "node:url";
import { promisify } from "node:util";

const run = promisify(execFile);
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const VIDEO_DIR = path.join(ROOT, "src", "assets", "videos");

/**
 * Headroom over the measured box. The artboards scale with viewport width, so a
 * panel a little wider than 1080 draws these boxes a little larger; 15% keeps
 * that case sharp while still shedding most of the excess.
 */
const MARGIN = 1.15;

/**
 * Constant-quality target for the re-encode.
 *
 * These are deliberately conservative. An earlier pass used crf 32, which cut
 * `main.webm` from 19.7 MB to 1.6 MB — but comparing frames *downscaled to the
 * box each video is actually drawn into* showed a mean absolute difference of ~5
 * with peaks of 58, i.e. compression artifacts starting to be visible rather
 * than just discarded resolution. The resolution reduction is what buys the
 * decode saving; spending some of the recovered bytes back on quality keeps the
 * picture indistinguishable, which is the requirement.
 *
 * At crf 26 the same comparison comes out near the noise floor while the files
 * are still several times smaller than the originals.
 */
const CRF_RESIZED = 26;
const CRF_SAME_RESOLUTION = 24;

/**
 * box: [width, height] in physical panel pixels.
 *
 * Where a box was both measured and derived from CSS, the entry keeps whichever
 * is larger. The two agreed exactly for `hawler` (1080×663) and `natural`
 * (1080×694), which is the check that the CSS derivations are sound; where they
 * differ the CSS bound is the cautious one, because a walk only ever samples the
 * states it happened to reach.
 */
const BOXES = {
  "main.webm": { box: [980, 552], fit: "cover", how: "measured" },
  "dws.webm": { box: [1164, 1194], fit: "cover", how: "measured" },
  "women.webm": { box: [844, 631], fit: "contain", how: "measured" },
  "G1.webm": { box: [873, 873], fit: "contain", how: "measured" },
  "culture.webm": { box: [1119, 1119], fit: "cover", how: "measured" },
  "resistance.webm": { box: [1356, 763], fit: "contain", how: "measured" },
  "hawler.webm": { box: [1080, 663], fit: "cover", how: "measured + css agree" },
  "natural.webm": { box: [1080, 694], fit: "cover", how: "measured + css agree" },

  // ThePople detail heroes: `h-[min(82cqh,1150px)] w-full` on the 1080 artboard.
  // The walk measured these at 1080×887; the CSS ceiling of 1150 is kept as the
  // taller, safer bound.
  "kch3.webm": { box: [1080, 1150], fit: "cover", how: "css (≥ measured)" },
  "diy.webm": { box: [1080, 1150], fit: "cover", how: "css (≥ measured)" },
  "sharwal.webm": { box: [1080, 1150], fit: "cover", how: "css (≥ measured)" },

  // religions/Faiths hero: `h-[900px] w-full` on the 1080 artboard.
  "faiths.webm": { box: [1080, 900], fit: "cover", how: "css" },

  // KurdishLanguageDialects hero: `h-[700px] w-full` on the 1400 artboard,
  // width-scaled to the panel → 1080 × (700 × 1080/1400).
  "language.webm": { box: [1080, 540], fit: "cover", how: "css" },
};

/** Smallest source size that still fills `box` under `fit`, never upscaling. */
function requiredSize(srcW, srcH, box, fit) {
  const [bw, bh] = box;
  const scale =
    fit === "contain"
      ? Math.min(bw / srcW, bh / srcH) // whole frame visible: the fitting axis decides
      : Math.max(bw / srcW, bh / srcH); // cropped: the covering axis decides
  return [srcW * scale, srcH * scale];
}

/** VP9 needs even dimensions. */
const even = (n) => {
  const r = Math.round(n);
  return r % 2 === 0 ? r : r + 1;
};

async function probe(file) {
  const { stdout } = await run("ffprobe", [
    "-v", "error",
    "-select_streams", "v:0",
    "-show_entries", "stream=width,height,r_frame_rate",
    "-show_entries", "format=duration,size",
    "-of", "json",
    file,
  ]);
  const j = JSON.parse(stdout);
  const s = j.streams[0];
  return {
    w: s.width,
    h: s.height,
    fps: s.r_frame_rate,
    duration: Number(j.format.duration),
    size: Number(j.format.size),
  };
}

const mb = (b) => (b / 1024 / 1024).toFixed(2);

async function main() {
  const args = process.argv.slice(2);
  const apply = args.includes("--apply");
  const only = args.filter((a) => !a.startsWith("--"));
  if (!apply) console.log("DRY RUN — pass --apply to write files\n");

  const names = Object.keys(BOXES).filter((n) => !only.length || only.includes(n));

  let before = 0;
  let after = 0;
  const results = [];

  for (const name of names) {
    const file = path.join(VIDEO_DIR, name);
    try {
      await fs.access(file);
    } catch {
      console.log(`  skip (missing): ${name}`);
      continue;
    }

    const meta = await probe(file);
    const spec = BOXES[name];

    let targetW = meta.w;
    let targetH = meta.h;
    let note = "bitrate only (box not established)";

    if (spec) {
      const [reqW, reqH] = requiredSize(meta.w, meta.h, spec.box, spec.fit);
      const wantW = even(Math.min(meta.w, reqW * MARGIN));
      const wantH = even(Math.min(meta.h, reqH * MARGIN));
      if (wantW < meta.w || wantH < meta.h) {
        targetW = wantW;
        targetH = wantH;
        note = `box ${spec.box[0]}×${spec.box[1]} ${spec.fit} (${spec.how}) → needs ${Math.round(reqW)}×${Math.round(reqH)}`;
      } else {
        note = `already at or below what its box needs (${spec.how})`;
      }
    }

    const resizing = targetW !== meta.w || targetH !== meta.h;
    const crf = resizing ? CRF_RESIZED : CRF_SAME_RESOLUTION;
    const out = file.replace(/\.webm$/, ".opt.webm");
    const pixelRatio = (targetW * targetH) / (meta.w * meta.h);

    console.log(`${name}`);
    console.log(`  ${meta.w}×${meta.h} @ ${meta.fps} ${meta.duration.toFixed(1)}s ${mb(meta.size)}MB`);
    console.log(`  → ${targetW}×${targetH} crf ${crf}   ${note}`);

    before += meta.size;

    if (!apply) {
      after += meta.size;
      continue;
    }

    const filters = resizing ? ["-vf", `scale=${targetW}:${targetH}:flags=lanczos`] : [];

    /** `bitrateCap` in bits/s switches VP9 into constrained-quality mode. */
    const encode = async (bitrateCap) => {
      await run(
        "ffmpeg",
        [
          "-y", "-i", file,
          ...filters,
          "-c:v", "libvpx-vp9",
          "-crf", String(crf),
          "-b:v", bitrateCap ? String(Math.round(bitrateCap)) : "0",
          "-row-mt", "1",
          "-tile-columns", "2",
          "-threads", "8",
          // Deadline/cpu-used trade encode time for compression, not for playback
          // behaviour or visual timing.
          "-deadline", "good",
          "-cpu-used", "2",
          // Keyframes every ~2s so the loop restart and any seek stay responsive.
          "-g", "120",
          "-pix_fmt", "yuv420p",
          "-an", // every consumer is <video muted>
          out,
        ],
        { maxBuffer: 1 << 28 },
      );
      return probe(out);
    };

    let newMeta = await encode(null);

    // Some sources are already tightly encoded, so constant-quality output can
    // come out *larger* than the original. When the resolution dropped, that is
    // worth a second attempt rather than a straight rejection: capping the
    // bitrate at the original's, scaled by the pixel reduction, keeps
    // bits-per-pixel the same — so quality per displayed pixel holds — while the
    // file necessarily shrinks along with the decode cost.
    if (newMeta.size >= meta.size && resizing) {
      const originalBps = (meta.size * 8) / meta.duration;
      const cap = originalBps * pixelRatio * 0.95;
      console.log(
        `  constant-quality came out at ${mb(newMeta.size)}MB; retrying capped at ` +
          `${(cap / 1e6).toFixed(2)} Mbps (same bits/pixel)`,
      );
      newMeta = await encode(cap);
    }
    // Sanity gate: never accept an encode that changed the timeline or grew.
    const driftMs = Math.abs(newMeta.duration - meta.duration) * 1000;
    if (driftMs > 60) {
      await fs.rm(out);
      console.log(`  REJECTED: duration drifted ${driftMs.toFixed(0)}ms`);
      after += meta.size;
      continue;
    }
    if (newMeta.size >= meta.size) {
      await fs.rm(out);
      console.log(`  REJECTED: output larger (${mb(newMeta.size)}MB)`);
      after += meta.size;
      continue;
    }

    await fs.rename(out, file);
    after += newMeta.size;
    results.push({ name, from: meta.size, to: newMeta.size });
    console.log(`  wrote ${mb(newMeta.size)}MB (was ${mb(meta.size)}MB)`);
  }

  console.log("\n---");
  console.log(`videos: ${mb(before)} MB → ${mb(after)} MB (saved ${mb(before - after)} MB)`);
  if (!apply) console.log("\nDRY RUN — nothing written. Re-run with --apply.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
