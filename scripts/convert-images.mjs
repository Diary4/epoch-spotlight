// One-shot script to convert all PNG/JPG/JPEG inside src/assets to WebP.
// Usage: node scripts/convert-images.mjs
// Requires: sharp (install with `npm install --no-save sharp`).

import { promises as fs } from "node:fs";
import path from "node:path";
import url from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ASSETS_ROOT = path.join(ROOT, "src", "assets");

const QUALITY = 82;
const SOURCE_EXTS = new Set([".png", ".jpg", ".jpeg"]);

async function walk(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walk(full)));
    } else {
      out.push(full);
    }
  }
  return out;
}

function bytesToMb(b) {
  return (b / 1024 / 1024).toFixed(2);
}

async function main() {
  console.log("Scanning", ASSETS_ROOT);
  const files = await walk(ASSETS_ROOT);

  let originalTotal = 0;
  let convertedTotal = 0;
  let count = 0;
  const failures = [];

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!SOURCE_EXTS.has(ext)) continue;

    const target = file.slice(0, -path.extname(file).length) + ".webp";

    try {
      const { size: oldSize } = await fs.stat(file);
      await sharp(file, { failOn: "none" })
        .webp({ quality: QUALITY, effort: 5 })
        .toFile(target);
      const { size: newSize } = await fs.stat(target);
      originalTotal += oldSize;
      convertedTotal += newSize;
      count += 1;
      const savings = (((oldSize - newSize) / oldSize) * 100).toFixed(1);
      console.log(
        `${path.relative(ROOT, file)}  →  ${path.basename(target)}  ` +
          `(${bytesToMb(oldSize)}MB → ${bytesToMb(newSize)}MB, -${savings}%)`,
      );
    } catch (err) {
      failures.push({ file, error: err.message });
    }
  }

  console.log("---");
  console.log(`Converted ${count} files`);
  console.log(
    `Total: ${bytesToMb(originalTotal)} MB  →  ${bytesToMb(convertedTotal)} MB ` +
      `(saved ${bytesToMb(originalTotal - convertedTotal)} MB)`,
  );
  if (failures.length) {
    console.log("Failures:");
    for (const f of failures) console.log("  ", f.file, "->", f.error);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
