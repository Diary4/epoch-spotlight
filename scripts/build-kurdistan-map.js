/**
 * Builds src/components/Sections/TheLand/kurdistanMapGeometry.ts — the vector
 * Kurdistan map used by the three cards on The Land.
 *
 * This is a one-off generator, not part of the app build. Run it only when the
 * layers themselves need to change (a district added to the Article 140 list, a
 * province added to the homeland); the committed .ts file is the artefact.
 *
 *   mkdir -p /tmp/kurdistan-map && cd /tmp/kurdistan-map
 *   npm init -y && npm install polygon-clipping
 *   B=https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson
 *   curl -sLo ne50_countries.json $B/ne_50m_admin_0_countries.geojson
 *   curl -sLo ne10_adm1.json      $B/ne_10m_admin_1_states_provinces.geojson
 *   curl -sLo ne50_lakes.json     $B/ne_50m_lakes.geojson
 *   # geoBoundaries pins its downloads to a commit, so resolve them via the API:
 *   for S in "IRQ ADM1" "IRQ ADM2" "SYR ADM2"; do set -- $S; \\
 *     curl -sL "$(curl -s https://www.geoboundaries.org/api/current/gbOpen/$1/$2/ \\
 *       | node -pe 'JSON.parse(require("fs").readFileSync(0)).simplifiedGeometryGeoJSON')" \\
 *       -o ${1}_$(echo $2 | tr A-Z a-z).json; done
 *   node <repo>/scripts/build-kurdistan-map.js
 *
 * Sources
 *   Natural Earth 50m admin-0 countries + 10m admin-1 states  (public domain)
 *   geoBoundaries gbOpen IRQ ADM1/ADM2, SYR ADM2               (CC BY 4.0)
 */
const fs = require("fs");
const path = require("path");
const pc = require("polygon-clipping");

/** Run from the directory holding the downloads above; writes into the repo. */
const OUT = path.resolve(
  __dirname,
  "../src/components/Sections/TheLand/kurdistanMapGeometry.ts",
);

/* ---------------------------------------------------------------- projection */

/**
 * The window holds all four host states whole. Cutting Iran's eastern edge to
 * save empty ground read as a rendering bug rather than a framing choice, and
 * the Khorasani Kurds — the third layer's whole point — sit at 57°E.
 */
const BBOX = { west: 25.4, east: 63.5, south: 24.8, north: 43.3 };
const MEAN_LAT = (BBOX.south + BBOX.north) / 2;
const SQUEEZE = Math.cos((MEAN_LAT * Math.PI) / 180);
const WIDTH = 1600;
const SCALE = WIDTH / ((BBOX.east - BBOX.west) * SQUEEZE);
const HEIGHT = Math.round((BBOX.north - BBOX.south) * SCALE);

const px = (lon) => (lon - BBOX.west) * SQUEEZE * SCALE;
const py = (lat) => (BBOX.north - lat) * SCALE;

/* ------------------------------------------------------------------- helpers */

const read = (f) => JSON.parse(fs.readFileSync(path.resolve(process.cwd(), f), "utf8"));

/** GeoJSON geometry -> polygon-clipping MultiPolygon coordinates. */
function toMulti(geom) {
  if (!geom) return [];
  if (geom.type === "Polygon") return [geom.coordinates];
  if (geom.type === "MultiPolygon") return geom.coordinates;
  return [];
}

function union(...multis) {
  const parts = multis.filter((m) => m && m.length);
  if (!parts.length) return [];
  if (parts.length === 1) return parts[0];
  return pc.union(parts[0], ...parts.slice(1));
}

const difference = (a, b) => (b.length ? pc.difference(a, b) : a);
const intersection = (a, b) => pc.intersection(a, b);

const BBOX_POLY = [
  [
    [
      [BBOX.west, BBOX.south],
      [BBOX.east, BBOX.south],
      [BBOX.east, BBOX.north],
      [BBOX.west, BBOX.north],
      [BBOX.west, BBOX.south],
    ],
  ],
];

const clip = (multi) => (multi.length ? intersection(multi, BBOX_POLY) : []);

function bboxOf(multi) {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const poly of multi)
    for (const [lon, lat] of poly[0]) {
      if (lon < x0) x0 = lon;
      if (lon > x1) x1 = lon;
      if (lat < y0) y0 = lat;
      if (lat > y1) y1 = lat;
    }
  return { west: x0, south: y0, east: x1, north: y1 };
}

/* ------------------------------------------------------ simplify + serialise */

/** Douglas–Peucker on projected points. */
function simplifyRing(points, tolerance) {
  if (points.length < 5) return points;
  const sqTol = tolerance * tolerance;
  const keep = new Uint8Array(points.length);
  keep[0] = keep[points.length - 1] = 1;

  const stack = [[0, points.length - 1]];
  while (stack.length) {
    const [first, last] = stack.pop();
    let index = -1;
    let maxSq = sqTol;
    const [ax, ay] = points[first];
    const [bx, by] = points[last];
    const dx = bx - ax;
    const dy = by - ay;
    const len = dx * dx + dy * dy;
    for (let i = first + 1; i < last; i++) {
      const [cx, cy] = points[i];
      let t = len ? ((cx - ax) * dx + (cy - ay) * dy) / len : 0;
      t = t < 0 ? 0 : t > 1 ? 1 : t;
      const ex = ax + t * dx - cx;
      const ey = ay + t * dy - cy;
      const sq = ex * ex + ey * ey;
      if (sq > maxSq) {
        maxSq = sq;
        index = i;
      }
    }
    if (index > 0) {
      keep[index] = 1;
      stack.push([first, index], [index, last]);
    }
  }
  return points.filter((_, i) => keep[i]);
}

function ringArea(points) {
  let sum = 0;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++)
    sum += (points[j][0] - points[i][0]) * (points[j][1] + points[i][1]);
  return Math.abs(sum / 2);
}

const round = (n) => Math.round(n * 10) / 10;

/** Absolute area of a MultiPolygon in whatever units its coordinates are in. */
function multiArea(multi) {
  let total = 0;
  for (const polygon of multi)
    for (let i = 0; i < polygon.length; i++)
      total += (i === 0 ? 1 : -1) * ringArea(polygon[i]);
  return Math.abs(total);
}

/**
 * Projected, simplified SVG path for a MultiPolygon. `minArea` drops the
 * offshore specks that cost bytes and read as dirt on a 1600-unit artboard.
 */
function toPath(multi, { tolerance = 1.1, minArea = 6, dropHoles = false } = {}) {
  const commands = [];
  for (const polygon of multi) {
    for (const [index, ring] of polygon.entries()) {
      /* Two boundary sets simplified in different runs never meet exactly, so a
         union of them keeps hairline slivers as interior rings. Left in, they
         punch white through to the page between the Region and the Kurdistani
         areas. Nothing here has a hole worth keeping — Van and Urmia are drawn
         over the top as water — so the layers close themselves. */
      if (dropHoles && index > 0) continue;
      let points = ring.map(([lon, lat]) => [px(lon), py(lat)]);
      points = simplifyRing(points, tolerance);
      if (points.length < 4 || ringArea(points) < minArea) continue;
      commands.push(
        `M${points
          .slice(0, -1)
          .map(([x, y]) => `${round(x)},${round(y)}`)
          .join(" ")}Z`,
      );
    }
  }
  return commands.join("");
}

/* ------------------------------------------------------------------ the data */

const countries = read("ne50_countries.json");
const adm1 = read("ne10_adm1.json");
const lakes = read("ne50_lakes.json");
const irqAdm1 = read("IRQ_adm1.json");
const irqAdm2 = read("IRQ_adm2.json");
const syrAdm2 = read("SYR_adm2.json");

const provinces = (iso, names) => {
  const wanted = new Set(names);
  const found = new Set();
  const geoms = adm1.features
    .filter((f) => f.properties.adm0_a3 === iso && wanted.has(f.properties.name))
    .map((f) => {
      found.add(f.properties.name);
      return toMulti(f.geometry);
    });
  for (const name of wanted) if (!found.has(name)) throw new Error(`${iso} province not found: ${name}`);
  return union(...geoms);
};

const shapes = (collection, names) => {
  const wanted = new Set(names);
  const found = new Set();
  const geoms = collection.features
    .filter((f) => wanted.has(f.properties.shapeName))
    .map((f) => {
      found.add(f.properties.shapeName);
      return toMulti(f.geometry);
    });
  for (const name of wanted) if (!found.has(name)) throw new Error(`shape not found: ${name}`);
  return union(...geoms);
};

/* --- 1. The Kurdistan Region of Iraq: the three governorates, plus Halabja,
       which geoBoundaries still folds into Sulaymaniyah.

   Built out of ADM2 districts rather than the ADM1 governorate outlines, even
   though ADM1 is the authority on where the Region ends. The two files are
   simplified independently, so a Region drawn from one and Kirkuk drawn from
   the other miss each other by a few hundred metres the whole length of their
   shared border — which is a white seam between the green and the red on a
   screen. ADM1 still decides which districts belong: a district joins the
   Region when more than half of it falls inside the ADM1 Region.
   ---------------------------------------------------------------------- */
const KRI_NAMES = ["Dohuk", "Erbil", "Al-Sulaimaniyah"];
const kriByAdm1 = KRI_NAMES.map((name) => ({ name, geom: shapes(irqAdm1, [name]) }));
const kriOutline = union(...kriByAdm1.map((p) => p.geom));

const kriParts = KRI_NAMES.map((name) => ({ name, districts: [] }));
for (const feature of irqAdm2.features) {
  const district = toMulti(feature.geometry);
  if (!district.length) continue;
  const area = multiArea(district);
  if (!area) continue;
  const inside = intersection(district, kriOutline);
  if (!inside.length || multiArea(inside) / area <= 0.5) continue;
  /* Which of the three it belongs to, by the same measure. */
  let best = null;
  let bestArea = 0;
  for (const part of kriParts) {
    const overlap = intersection(district, kriByAdm1.find((p) => p.name === part.name).geom);
    const size = overlap.length ? multiArea(overlap) : 0;
    if (size > bestArea) {
      bestArea = size;
      best = part;
    }
  }
  (best ?? kriParts[0]).districts.push(district);
}
for (const part of kriParts) {
  if (!part.districts.length) throw new Error(`no ADM2 districts fell inside ${part.name}`);
  part.geom = union(...part.districts);
  console.log(`  ${part.name}: ${part.districts.length} districts`);
}
const kri = union(...kriParts.map((p) => p.geom));

/* --- 2. Kurdistani areas of Iraq outside the Region — the Article 140
       districts. Cut against the Region so the two never double-paint. ------ */
const disputedRaw = shapes(irqAdm2, [
  "Kirkuk",
  "Daquq",
  "Al-Hawiga",
  "Dibis",
  "Sinjar",
  "Telafar",
  "Tilkaef",
  "Al-Shikhan",
  "Al-Hamdaniya",
  "Aqra",
  "Makhmour",
  "Tooz Khurmato",
  "Khanaqin",
  "Kifri",
]);
const disputed = difference(disputedRaw, kri);

/* --- 3. Greater Kurdistan: the contiguous Kurdish-majority country across the
       four states. Provinces and districts, not a drawn impression. --------- */
const bakur = provinces("TUR", [
  "Adiyaman", "Agri", "Ardahan", "Batman", "Bingöl", "Bitlis", "Diyarbakir",
  "Elazig", "Erzincan", "Erzurum", "Hakkari", "Iğdir", "Kars", "Kilis",
  "Malatya", "Mardin", "Mus", "Siirt", "Sanliurfa", "Sirnak", "Tunceli", "Van",
]);
const rojhelat = provinces("IRN", ["West Azarbaijan", "Kordestan", "Kermanshah", "Ilam"]);
const rojava = shapes(syrAdm2, [
  "Al-Hasakeh", "Quamishli", "Al-Malikeyyeh", "Ras Al Ain",
  "Tell Abiad", "Ain Al Arab", "Afrin",
]);
const bashur = union(kri, disputed);
const greater = union(bakur, rojhelat, rojava, bashur);

/* --- 4. Kurdish presence beyond the contiguous country. Khorasan is a real
       block of ground — the Kurds deported there in the 1600s are still
       there — so it is drawn; the rest are communities in cities, which a
       shaded province would misrepresent, so they are marked. -------------- */
const khorasan = provinces("IRN", ["North Khorasan"]);

/* --- 5. Host states and their neighbours. ----------------------------------- */
const HOSTS = { TUR: "Turkey", SYR: "Syria", IRQ: "Iraq", IRN: "Iran" };
const hostShapes = [];
const neighbourShapes = [];
for (const feature of countries.features) {
  const iso = feature.properties.ADM0_A3;
  const geom = clip(toMulti(feature.geometry));
  if (!geom.length) continue;
  const d = toPath(geom, { tolerance: 1.0, minArea: 12 });
  if (!d) continue;
  const entry = { id: iso.toLowerCase(), name: feature.properties.NAME, d };
  if (HOSTS[iso]) hostShapes.push(entry);
  else neighbourShapes.push(entry);
}

/* Lakes read as holes in the land, which is what keeps Van and Urmia from
   looking like a smudge in the middle of the Kurdish provinces. */
const lakeShapes = [];
for (const feature of lakes.features) {
  const geom = clip(toMulti(feature.geometry));
  if (!geom.length) continue;
  const d = toPath(geom, { tolerance: 0.5, minArea: 14 });
  if (!d) continue;
  lakeShapes.push({ id: (feature.properties.name || "lake").toLowerCase().replace(/\W+/g, "-"), d });
}

/* ------------------------------------------------------------------- emitter */

const kriBounds = bboxOf(kri);
const greaterBounds = bboxOf(greater);
const bashurBounds = bboxOf(bashur);
const bbox4 = (b) => ({
  west: +b.west.toFixed(3),
  south: +b.south.toFixed(3),
  east: +b.east.toFixed(3),
  north: +b.north.toFixed(3),
});

const fmt = (v) => JSON.stringify(v);
const shapeList = (list) =>
  list.map((s) => `  { id: ${fmt(s.id)}, name: ${fmt(s.name ?? s.id)}, d: ${fmt(s.d)} },`).join("\n");

const out = `/**
 * Geometry for the Kurdistan map on The Land.
 *
 * Real boundaries, not a drawn impression. Country outlines are Natural Earth
 * 50m admin-0 (public domain); the Kurdish provinces of Turkey and Iran are
 * Natural Earth 10m admin-1; the Region, the Article 140 districts and the
 * Rojava cantons are geoBoundaries gbOpen (CC BY 4.0, geoboundaries.org),
 * unioned so no internal governorate line survives inside a single layer.
 *
 * Projection: equirectangular with the longitude squeezed by cos(${MEAN_LAT.toFixed(1)}°) so
 * the region is not stretched sideways — the same projection the BCF map uses,
 * on a wider window. Generated file; edit the generator, not this.
 */

export type LandMapShape = { id: string; name: string; d: string };

export const LAND_MAP_VIEWBOX = { minX: 0, minY: 0, width: ${WIDTH}, height: ${HEIGHT} };

const BBOX = ${fmt(BBOX)};
const SQUEEZE = ${SQUEEZE};
const SCALE = ${SCALE};

/** [longitude, latitude] -> SVG user units in this artboard. */
export function landMapPoint(lon: number, lat: number): { x: number; y: number } {
  return {
    x: (lon - BBOX.west) * SQUEEZE * SCALE,
    y: (BBOX.north - lat) * SCALE,
  };
}

/** The same point as percentages, for HTML pins laid over the SVG. */
export function landMapPin(lon: number, lat: number): { left: string; top: string } {
  const { x, y } = landMapPoint(lon, lat);
  return {
    left: \`\${(x / LAND_MAP_VIEWBOX.width) * 100}%\`,
    top: \`\${(y / LAND_MAP_VIEWBOX.height) * 100}%\`,
  };
}

/** Longitude/latitude extents of each layer, for the camera to frame them. */
export const LAND_MAP_BOUNDS = {
  greater: ${fmt(bbox4(greaterBounds))},
  region: ${fmt(bbox4(kriBounds))},
  disputed: ${fmt(bbox4(bashurBounds))},
  presence: ${fmt(BBOX)},
} as const;

/** Turkey, Syria, Iraq and Iran — the four states Kurdistan is divided between. */
export const LAND_MAP_HOST_COUNTRIES: LandMapShape[] = [
${shapeList(hostShapes)}
];

/** Everything else in frame, drawn faint so the four states carry the eye. */
export const LAND_MAP_NEIGHBOURS: LandMapShape[] = [
${shapeList(neighbourShapes)}
];

/** Van, Urmia, Tharthar and the rest — cut out of the land, not painted over. */
export const LAND_MAP_LAKES: LandMapShape[] = [
${shapeList(lakeShapes)}
];

/** Greater Kurdistan: the contiguous Kurdish homeland across the four states. */
export const LAND_MAP_GREATER: string = ${fmt(toPath(greater, { tolerance: 0.5, minArea: 8, dropHoles: true }))};

/** The Kurdistan Region of Iraq, as one body and as its three governorates. */
export const LAND_MAP_REGION: string = ${fmt(toPath(kri, { tolerance: 0.28, minArea: 3, dropHoles: true }))};

export const LAND_MAP_REGION_GOVERNORATES: LandMapShape[] = [
${kriParts
  .map(
    (p) =>
      `  { id: ${fmt(p.name.toLowerCase().replace(/\W+/g, "-"))}, name: ${fmt(
        p.name === "Dohuk" ? "Duhok" : p.name === "Al-Sulaimaniyah" ? "Sulaymaniyah" : p.name,
      )}, d: ${fmt(toPath(p.geom, { tolerance: 0.28, minArea: 3, dropHoles: true }))} },`,
  )
  .join("\n")}
];

/** The Kurdistani districts of Iraq outside the Region — the Article 140 areas. */
export const LAND_MAP_DISPUTED: string = ${fmt(toPath(disputed, { tolerance: 0.32, minArea: 3, dropHoles: true }))};

/** Khorasan in north-east Iran: Kurds deported there in the 1600s, still there. */
export const LAND_MAP_KHORASAN: string = ${fmt(toPath(khorasan, { tolerance: 0.7, minArea: 8, dropHoles: true }))};
`;

fs.writeFileSync(OUT, out);
console.log(`wrote ${OUT}  (${(out.length / 1024).toFixed(0)} KB)`);
console.log("greater bounds", greaterBounds);
console.log("region bounds", kriBounds);
console.log("hosts", hostShapes.length, "neighbours", neighbourShapes.length, "lakes", lakeShapes.length);
