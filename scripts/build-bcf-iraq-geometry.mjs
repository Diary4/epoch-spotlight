/**
 * Generates `src/components/Sections/bcf/bcfIraqGeometry.ts`.
 *
 * Source: geoBoundaries ADM1 for Iraq (CC BY 4.0, https://www.geoboundaries.org),
 * the same dataset the Kurdistan Region outlines in `bcfMapGeometry.ts` came
 * from — which is the point. The rings are projected with the *same* four
 * constants that file documents, so the Region shapes and the Iraq shapes share
 * one coordinate space and a city projected for one map lands correctly on the
 * other.
 *
 * Run:  node scripts/build-bcf-iraq-geometry.mjs [path-to-local-geojson]
 *
 * The argument is optional: pass a downloaded copy of the source when the
 * machine running this has no route to GitHub.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const SOURCE =
  "https://media.githubusercontent.com/media/wmgeolab/geoBoundaries/main/releaseData/gbOpen/IRQ/ADM1/geoBoundaries-IRQ-ADM1_simplified.geojson";

/** The projection recovered in bcfMapGeometry.ts. Do not re-tune. */
const LON_SCALE = 228.238;
const LON_OFFSET = -9623.542;
const LAT_SCALE = -283.23;
const LAT_OFFSET = 10612.201;

/** Path detail, in SVG user units. Matches the Region rings. */
const TOLERANCE = 2;
/** Rings smaller than this are marsh islands and sandbars, not governorates. */
const MIN_RING_AREA = 12;

/** geoBoundaries `shapeName` → our id, and whether it is in the Region. */
const GOVERNORATES = {
  Dohuk: { id: "duhok", region: true },
  Erbil: { id: "erbil", region: true },
  "Al-Sulaimaniyah": { id: "sulaymaniyah", region: true },
  Kirkuk: { id: "kirkuk", region: false },
  Ninawa: { id: "ninawa", region: false },
  "Salah al-Din": { id: "salahaddin", region: false },
  Diyala: { id: "diyala", region: false },
  Baghdad: { id: "baghdad", region: false },
  "Al-Anbar": { id: "anbar", region: false },
  Babil: { id: "babil", region: false },
  Karbala: { id: "karbala", region: false },
  "An-Najaf": { id: "najaf", region: false },
  "Al-Qadisiyah": { id: "qadisiyah", region: false },
  Wasit: { id: "wasit", region: false },
  Maysan: { id: "maysan", region: false },
  "Dhi Qar": { id: "dhiqar", region: false },
  "Al-Muthanna": { id: "muthanna", region: false },
  "Al-Basrah": { id: "basra", region: false },
};

const project = ([lon, lat]) => [
  LON_SCALE * lon + LON_OFFSET,
  LAT_SCALE * lat + LAT_OFFSET,
];

function ringArea(points) {
  let sum = 0;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    sum += points[j][0] * points[i][1] - points[i][0] * points[j][1];
  }
  return Math.abs(sum / 2);
}

/** Perpendicular distance from `p` to the segment `a`–`b`. */
function perpendicular(p, a, b) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  if (dx === 0 && dy === 0) return Math.hypot(p[0] - a[0], p[1] - a[1]);
  const t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy);
  const clamped = Math.max(0, Math.min(1, t));
  return Math.hypot(p[0] - (a[0] + clamped * dx), p[1] - (a[1] + clamped * dy));
}

function simplify(points, tolerance) {
  if (points.length < 3) return points;
  let furthest = 0;
  let index = 0;
  const first = points[0];
  const last = points[points.length - 1];
  for (let i = 1; i < points.length - 1; i += 1) {
    const distance = perpendicular(points[i], first, last);
    if (distance > furthest) {
      furthest = distance;
      index = i;
    }
  }
  if (furthest <= tolerance) return [first, last];
  return [
    ...simplify(points.slice(0, index + 1), tolerance).slice(0, -1),
    ...simplify(points.slice(index), tolerance),
  ];
}

const round = (n) => Number(n.toFixed(1));

function ringToPath(points) {
  return (
    points
      .map((p, i) => `${i === 0 ? "M" : ""}${round(p[0])},${round(p[1])}`)
      .join(" ") + "Z"
  );
}

function polygons(geometry) {
  if (geometry.type === "Polygon") return [geometry.coordinates];
  if (geometry.type === "MultiPolygon") return geometry.coordinates;
  throw new Error(`Unexpected geometry: ${geometry.type}`);
}

const local = process.argv[2];
let collection;
if (local) {
  collection = JSON.parse(readFileSync(local, "utf8"));
} else {
  const response = await fetch(SOURCE);
  if (!response.ok) throw new Error(`Source fetch failed: ${response.status}`);
  collection = await response.json();
}

const shapes = [];
let minX = Infinity;
let minY = Infinity;
let maxX = -Infinity;
let maxY = -Infinity;

for (const feature of collection.features) {
  const meta = GOVERNORATES[feature.properties.shapeName];
  if (!meta) throw new Error(`Unmapped governorate: ${feature.properties.shapeName}`);

  const paths = [];
  for (const polygon of polygons(feature.geometry)) {
    // Outer ring only. The holes in this dataset are lakes, and a lake drawn as
    // a hole punches the plate's own background through the governorate fill.
    const projected = polygon[0].map(project);
    if (ringArea(projected) < MIN_RING_AREA) continue;
    const reduced = simplify(projected, TOLERANCE);
    for (const [x, y] of reduced) {
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
    paths.push(ringToPath(reduced));
  }

  shapes.push({ id: meta.id, region: meta.region, d: paths.join(" ") });
}

/** Order the file so the Region governorates come last and paint on top. */
shapes.sort((a, b) => Number(a.region) - Number(b.region));

const PAD = 14;
const viewBox = {
  minX: Math.floor(minX - PAD),
  minY: Math.floor(minY - PAD),
  width: Math.ceil(maxX - minX + PAD * 2),
  height: Math.ceil(maxY - minY + PAD * 2),
};

const out = `/**
 * Governorate outlines for the Inside Iraq map.
 *
 * Generated — do not edit by hand. Run:
 *   node scripts/build-bcf-iraq-geometry.mjs
 *
 * Source: geoBoundaries ADM1 for Iraq (CC BY 4.0, https://www.geoboundaries.org),
 * projected with the same four constants documented in bcfMapGeometry.ts, so
 * this map and the Region map share one coordinate space.
 *
 * Halabja is inside Sulaymaniyah here: the source predates its split, and the
 * Region map is where Halabja is shown as a place of its own anyway.
 */

export type BcfIraqShape = {
  id: string;
  /** True for the three governorates of the Kurdistan Region. */
  region: boolean;
  d: string;
};

/** SVG user units, sized to Iraq's own extent in the shared projection. */
export const BCF_IRAQ_VIEWBOX = ${JSON.stringify(viewBox)};

/**
 * A [longitude, latitude] pair as a percentage of the Iraq artboard, ready for
 * the \`left\`/\`top\` of an absolutely positioned pin.
 */
export function bcfIraqPin(lon: number, lat: number): { x: string; y: string } {
  const px = ${LON_SCALE} * lon + ${LON_OFFSET};
  const py = ${LAT_SCALE} * lat + ${LAT_OFFSET};
  return {
    x: \`\${((px - BCF_IRAQ_VIEWBOX.minX) / BCF_IRAQ_VIEWBOX.width) * 100}%\`,
    y: \`\${((py - BCF_IRAQ_VIEWBOX.minY) / BCF_IRAQ_VIEWBOX.height) * 100}%\`,
  };
}

export const BCF_IRAQ_SHAPES: BcfIraqShape[] = [
${shapes
  .map(
    (shape) =>
      `  { id: ${JSON.stringify(shape.id)}, region: ${shape.region}, d: ${JSON.stringify(shape.d)} },`,
  )
  .join("\n")}
];
`;

const here = dirname(fileURLToPath(import.meta.url));
const target = join(here, "..", "src", "components", "Sections", "bcf", "bcfIraqGeometry.ts");
writeFileSync(target, out);
console.log(`Wrote ${shapes.length} governorates to ${target}`);
console.log("viewBox", viewBox);
