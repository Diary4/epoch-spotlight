// Codemod: rewrite every `.png` / `.jpg` / `.jpeg` reference inside src/**/*.{ts,tsx}
// (and src/data/*.ts) to `.webp`. Preserves Vite query suffixes like `?url`.
// Skips dynamic-template strings or json files; we only touch imports & string
// literals that look like asset paths.

import { promises as fs } from "node:fs";
import path from "node:path";
import url from "node:url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "src");

const FILE_EXTS = new Set([".ts", ".tsx"]);

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

// Match `"…/something.png"`, `'…/something.PNG?url'`, etc.
// Captures: 1=quote, 2=prefix path without ext, 3=ext, 4=optional ?query, 5=quote
const PATTERN =
  /(["'])([^"'\n]+?)\.(png|jpg|jpeg|PNG|JPG|JPEG|Png|Jpg|Jpeg)(\?[^"'\n]*)?\1/g;

function rewrite(content) {
  let changed = 0;
  const next = content.replace(PATTERN, (_match, q1, prefix, _ext, query) => {
    changed += 1;
    return `${q1}${prefix}.webp${query ?? ""}${q1}`;
  });
  return { next, changed };
}

async function main() {
  const files = (await walk(SRC)).filter((f) => FILE_EXTS.has(path.extname(f)));
  let totalChanges = 0;
  let filesChanged = 0;
  for (const file of files) {
    const original = await fs.readFile(file, "utf8");
    const { next, changed } = rewrite(original);
    if (changed && next !== original) {
      await fs.writeFile(file, next, "utf8");
      filesChanged += 1;
      totalChanges += changed;
      console.log(`${path.relative(ROOT, file)}  (${changed} replacement${changed === 1 ? "" : "s"})`);
    }
  }
  console.log("---");
  console.log(`Updated ${filesChanged} files, ${totalChanges} import paths.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
