// One-shot: kiosk-size WebPs from src/assets/images/bcf/employees
// into src/assets/images/bcf/optimized/employees (max edge 1600px).
import { promises as fs } from "node:fs";
import path from "node:path";
import url from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "src", "assets", "images", "bcf", "employees");
const DEST = path.join(ROOT, "src", "assets", "images", "bcf", "optimized", "employees");
const MAX_EDGE = 1600;
const QUALITY = 82;
const IMAGE_EXTS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".jfif",
  ".heic",
  ".webp",
]);

function slugBase(name) {
  const stem = name.replace(/\.[^.]+$/, "");
  const slug = stem
    .normalize("NFKD")
    .replace(/['’`]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
  return slug || "employee";
}

async function main() {
  await fs.mkdir(DEST, { recursive: true });
  const entries = await fs.readdir(SRC);
  const used = new Set();
  let ok = 0;
  const failures = [];

  for (const name of entries.sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" }),
  )) {
    const ext = path.extname(name).toLowerCase();
    if (!IMAGE_EXTS.has(ext)) continue;

    let base = slugBase(name);
    let destName = `${base}.webp`;
    let n = 2;
    while (used.has(destName)) {
      destName = `${base}-${n}.webp`;
      n += 1;
    }
    used.add(destName);

    const srcPath = path.join(SRC, name);
    const destPath = path.join(DEST, destName);

    try {
      await sharp(srcPath, { failOn: "none" })
        .rotate()
        .resize(MAX_EDGE, MAX_EDGE, { fit: "inside", withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 5 })
        .toFile(destPath);
      ok += 1;
      if (ok % 50 === 0) console.log(`converted ${ok}…`);
    } catch (err) {
      failures.push(`${name}: ${err.message}`);
      used.delete(destName);
    }
  }

  console.log(`Wrote ${ok} webps to ${path.relative(ROOT, DEST)}`);
  if (failures.length) {
    console.log("Failures:");
    for (const f of failures) console.log(" ", f);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
