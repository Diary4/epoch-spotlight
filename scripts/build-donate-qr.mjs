// Renders the BCF donate QR to a flat PNG, once, at build time.
//
// Why this is not a `<QRCode>` component any more:
//
// `react-qr-code` draws the code as two SVG `<path>` elements that carry one
// `M x y l 1 0 0 1 -1 0 Z` subpath per module — for this URL that is a little
// over twelve hundred subpaths in the DOM. Rasterising that is already the most
// expensive thing on the donate screen, and the panel it sits in arrives on a
// `scale` animation, so Chromium re-rasterises every one of those subpaths on
// every frame of the entrance, at the 2× the 4K portrait panel draws the
// artboard. That is the stutter on open the kiosk shows.
//
// A PNG is a texture. Scaling a texture is the one thing a GPU does for free,
// so the same entrance costs nothing to composite, and `react-qr-code` leaves
// the donate chunk entirely.
//
// The output is committed, so `npm run build` does not depend on this. Re-run it
// (`node scripts/build-donate-qr.mjs`) whenever BCF_DONATE_URL changes.

import { promises as fs } from "node:fs";
import path from "node:path";
import url from "node:url";
import zlib from "node:zlib";
import QRCodeImpl from "qr.js/lib/QRCode.js";
import ErrorCorrectLevel from "qr.js/lib/ErrorCorrectLevel.js";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

/** Must stay in step with BCF_DONATE_URL in BcfDonateOverlay.tsx. */
const DONATE_URL = "https://bcf.krd/donate-eng/";

/** The same two colours and the same error-correction level the SVG used. */
const FG = 0x0a;
const BG = 0xff;
const LEVEL = "L";

/**
 * The artboard is 1080 wide and the panel draws it at 2×, and the QR occupies
 * 480 of those artboard pixels — so 960 device pixels. Rendering at least that
 * many means the panel never upscales the code, which is what would cost it the
 * crisp module edges a phone camera needs.
 */
const TARGET_PX = 960;

const OUT = path.resolve(
  __dirname,
  "..",
  "src",
  "assets",
  "images",
  "bcf",
  "donate-qr.png",
);

/* -------------------------------------------------------------------------
 * Minimal greyscale PNG writer.
 *
 * A QR is two colours on a square grid, so the whole encoder is an IHDR, one
 * deflated IDAT of unfiltered scanlines, and an IEND. Pulling in an image
 * library for that would be more code, not less.
 * ---------------------------------------------------------------------- */

const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c;
  }
  return table;
})();

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i += 1) {
    c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return ~c >>> 0;
}

function chunk(type, data) {
  const head = Buffer.alloc(8);
  head.writeUInt32BE(data.length, 0);
  head.write(type, 4, "ascii");
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([head.subarray(4), data])), 0);
  return Buffer.concat([head, data, crc]);
}

function greyscalePng(pixels, width, height) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 0; // colour type: greyscale
  // 10..12 stay zero: deflate, adaptive filtering, no interlace.

  // One filter byte (0 — "None") in front of each row of samples.
  const raw = Buffer.alloc((width + 1) * height);
  for (let y = 0; y < height; y += 1) {
    raw[y * (width + 1)] = 0;
    pixels.copy(raw, y * (width + 1) + 1, y * width, (y + 1) * width);
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/* ---------------------------------------------------------------------- */

/**
 * `react-qr-code` fed the encoder a binary string of the UTF-8 bytes rather
 * than the string itself. Matching that keeps the generated code byte-identical
 * to the one the kiosk has been showing.
 */
function toBinaryString(value) {
  return Array.from(new TextEncoder().encode(value))
    .map((byte) => String.fromCharCode(byte))
    .join("");
}

const qr = new QRCodeImpl(-1, ErrorCorrectLevel[LEVEL]);
qr.addData(toBinaryString(DONATE_URL), "Byte");
qr.make();

const cells = qr.modules;
const modules = cells.length;

// Whole pixels per module, so no module edge ever lands mid-pixel — a QR with
// unevenly wide bars is the one thing that makes a camera work for the read.
const modulePx = Math.ceil(TARGET_PX / modules);
const size = modules * modulePx;

const pixels = Buffer.alloc(size * size, BG);
for (let row = 0; row < modules; row += 1) {
  for (let col = 0; col < modules; col += 1) {
    if (!cells[row][col]) continue;
    for (let y = 0; y < modulePx; y += 1) {
      const start = (row * modulePx + y) * size + col * modulePx;
      pixels.fill(FG, start, start + modulePx);
    }
  }
}

const png = greyscalePng(pixels, size, size);
await fs.mkdir(path.dirname(OUT), { recursive: true });
await fs.writeFile(OUT, png);

console.log(
  `donate-qr.png — ${modules}×${modules} modules at ${modulePx}px → ${size}×${size}, ${(png.length / 1024).toFixed(1)} KB`,
);
