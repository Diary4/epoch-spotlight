// Writes .br and .gz siblings for every compressible file in dist/, so the
// server can hand over a pre-built Brotli payload instead of gzipping each
// response on the fly.
//
// Why precompress rather than rely on the server: nginx's `gzip on` recompresses
// on every request at a low level, and cannot produce Brotli at all without a
// third-party module. Compressing once at build time gets Brotli quality 11 —
// noticeably smaller than on-the-fly gzip on the CSS and JS this app ships — for
// no per-request CPU. `gzip_static`/`brotli_static` then serve the sibling file.
//
// Runs as part of `npm run build`.

import { promises as fs } from "node:fs";
import path from "node:path";
import url from "node:url";
import zlib from "node:zlib";
import { promisify } from "node:util";

const brotli = promisify(zlib.brotliCompress);
const gzip = promisify(zlib.gzip);

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "..", "dist");

/**
 * Text formats only. Images, video and audio are already compressed — running
 * them through Brotli costs build time and yields nothing.
 */
const COMPRESSIBLE = new Set([
  ".html",
  ".js",
  ".mjs",
  ".css",
  ".json",
  ".webmanifest",
  ".svg",
  ".txt",
  ".ttf",
]);

/** Below this, the header overhead outweighs the saving. */
const MIN_BYTES = 1024;

async function walk(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

const kb = (b) => (b / 1024).toFixed(1);

async function main() {
  let files;
  try {
    files = await walk(DIST);
  } catch {
    console.error("dist/ not found — run `vite build` first.");
    process.exit(1);
  }

  let raw = 0;
  let br = 0;
  let gz = 0;
  let count = 0;
  const rows = [];

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!COMPRESSIBLE.has(ext)) continue;
    if (file.endsWith(".br") || file.endsWith(".gz")) continue;

    const buf = await fs.readFile(file);
    if (buf.length < MIN_BYTES) continue;

    const [brBuf, gzBuf] = await Promise.all([
      brotli(buf, {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
          [zlib.constants.BROTLI_PARAM_SIZE_HINT]: buf.length,
        },
      }),
      gzip(buf, { level: 9 }),
    ]);

    await fs.writeFile(`${file}.br`, brBuf);
    await fs.writeFile(`${file}.gz`, gzBuf);

    raw += buf.length;
    br += brBuf.length;
    gz += gzBuf.length;
    count += 1;
    rows.push({ name: path.relative(DIST, file), raw: buf.length, br: brBuf.length });
  }

  rows.sort((a, b) => b.raw - a.raw);
  console.log("precompressed (largest first):");
  for (const r of rows.slice(0, 12)) {
    console.log(`  ${kb(r.raw).padStart(9)} KB → ${kb(r.br).padStart(8)} KB br   ${r.name}`);
  }
  console.log(
    `\n${count} files: ${kb(raw)} KB raw → ${kb(br)} KB brotli / ${kb(gz)} KB gzip`,
  );

  // cPanel/LiteSpeed: some hosts ignore rewrite rules but still honour a custom
  // 404 page. A copy of index.html lets /bcf refresh work via ErrorDocument.
  const index = path.join(DIST, "index.html");
  await fs.copyFile(index, path.join(DIST, "404.html"));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
