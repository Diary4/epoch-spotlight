/**
 * Generates the two detail modules the Region map zooms into:
 *
 *   src/components/Sections/bcf/bcfKurdistanDetail.ts  — districts, water,
 *       the road network, built-up footprints and town labels for the whole
 *       window.
 *   src/components/Sections/bcf/bcfKurdistanStreets.ts — the street grid and
 *       land use inside each of the thirteen places the register documents.
 *
 * Everything here is projected with the *same* four constants recovered in
 * bcfMapGeometry.ts, so a road, a district and a pin all land in one coordinate
 * space and the zoom is a camera over a single drawing rather than a stack of
 * maps that have to be kept in register by hand.
 *
 * Run:  cd <a working dir with the downloads below>
 *       node <repo>/scripts/build-bcf-kurdistan-detail.mjs
 *
 * Sources (all open, all attributed on the screen itself)
 *   geoBoundaries gbOpen IRQ ADM1 + ADM2      CC BY 4.0  geoboundaries.org
 *   OpenStreetMap via Overpass                ODbL       openstreetmap.org
 *   Natural Earth 10m urban areas             public domain
 *
 * Downloads this expects in the working directory, and how to get them. The
 * window is lon 41.6–46.6, lat 34.3–37.5 — the Region map's own viewBox, worked
 * back through the projection below.
 *
 *   B=https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson
 *   curl -sLo ne_urban.json $B/ne_10m_urban_areas.geojson
 *   curl -sLo irq_adm1.json https://media.githubusercontent.com/media/wmgeolab/\
 *     geoBoundaries/main/releaseData/gbOpen/IRQ/ADM1/geoBoundaries-IRQ-ADM1_simplified.geojson
 *   curl -sL "$(curl -s https://www.geoboundaries.org/api/current/gbOpen/IRQ/ADM2/ \
 *     | node -pe 'JSON.parse(require("fs").readFileSync(0)).gjDownloadURL')" -o irq_adm2.json
 *
 * The rest is Overpass. `O` is any interpreter endpoint — the main one rate
 * limits hard on queries this size, and the mirrors take turns being reachable,
 * so expect to retry and to switch host. `BB` is the window, in Overpass's
 * south,west,north,east order.
 *
 *   O=https://overpass-api.de/api/interpreter
 *   BB=34.30,41.60,37.50,46.60
 *   post() { curl -s -m 900 -X POST --data-binary "$2" "$O" -o "$1"; }
 *
 *   post roads-major.json '[out:json][timeout:600];
 *     way["highway"~"^(motorway|trunk|primary)$"]('$BB');out geom;'
 *   post roads-minor.json '[out:json][timeout:600];
 *     way["highway"~"^(secondary|tertiary)$"]('$BB');out geom;'
 *   post water.json '[out:json][timeout:600];(
 *     way["natural"="water"]["water"~"^(lake|reservoir)$"]('$BB');
 *     relation["natural"="water"]["water"~"^(lake|reservoir)$"]('$BB');
 *     way["waterway"="river"]('$BB'););out geom;'
 *   post places.json '[out:json][timeout:300];
 *     node["place"~"^(city|town)$"]('$BB');out body;'
 *
 * And one street file and one land-use file per city in CITIES below, each a
 * radius around that city's coordinates in bcfContent's BCF_LOCATIONS. The
 * radii are the ones the committed data was built with — a city whose data
 * comes back suspiciously thin has usually been cut short by the endpoint
 * rather than by its radius, so check the element count before widening it:
 *
 *   erbil 13000  duhok 9000  sulaymaniyah 12000  kirkuk 11000  nineveh 13000
 *   sinjar 5000  garmian 6000  halabja 5000  raparin 9000  soran 5000
 *   zakho 7000  akre 5000  amedi 4000
 *
 *   post streets/<city>.json '[out:json][timeout:900];
 *     way["highway"~"^(residential|unclassified|living_street|pedestrian)$"]
 *       (around:<r>,<lat>,<lon>);out geom;'
 *   post landuse/<city>.json '[out:json][timeout:900];(
 *     way["landuse"~"^(residential|industrial|commercial|retail)$"](around:<r>,<lat>,<lon>);
 *     way["leisure"~"^(park|garden|pitch|stadium)$"](around:<r>,<lat>,<lon>);
 *     way["aeroway"="aerodrome"](around:<r>,<lat>,<lon>););out geom;'
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT_DETAIL = resolve(HERE, "../src/components/Sections/bcf/bcfKurdistanDetail.ts");
const OUT_STREETS = resolve(HERE, "../src/components/Sections/bcf/bcfKurdistanStreets.ts");

/* ------------------------------------------------------------- projection */

/** Recovered in bcfMapGeometry.ts. Do not re-tune: every committed ring uses them. */
const LON_SCALE = 228.238;
const LON_OFFSET = -9623.542;
const LAT_SCALE = -283.23;
const LAT_OFFSET = 10612.201;

const project = ([lon, lat]) => [
  LON_SCALE * lon + LON_OFFSET,
  LAT_SCALE * lat + LAT_OFFSET,
];

/** The Region map's window, in the same units — nothing outside it is emitted. */
const VIEW = { minX: -120, minY: 0, width: 1120, height: 880 };
const WINDOW = {
  minX: VIEW.minX - 20,
  maxX: VIEW.minX + VIEW.width + 20,
  minY: VIEW.minY - 20,
  maxY: VIEW.minY + VIEW.height + 20,
};

/* ---------------------------------------------------------------- helpers */

const read = (f) => JSON.parse(readFileSync(resolve(process.cwd(), f), "utf8"));
/** Missing or half-written downloads read as absent, not as a crash. */
const readIf = (f) => {
  try {
    return read(f);
  } catch {
    return null;
  }
};

/** GeoJSON geometry → array of rings (outer and inner alike). */
function ringsOf(geom) {
  if (!geom) return [];
  if (geom.type === "Polygon") return geom.coordinates;
  if (geom.type === "MultiPolygon") return geom.coordinates.flat();
  return [];
}

function perpendicular(p, a, b) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  if (dx === 0 && dy === 0) return Math.hypot(p[0] - a[0], p[1] - a[1]);
  const t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy);
  const c = Math.max(0, Math.min(1, t));
  return Math.hypot(p[0] - (a[0] + c * dx), p[1] - (a[1] + c * dy));
}

/** Douglas–Peucker, iterative so a 40 000-point river cannot blow the stack. */
function simplify(points, tolerance) {
  if (points.length < 3) return points;
  const keep = new Uint8Array(points.length);
  keep[0] = 1;
  keep[points.length - 1] = 1;
  const stack = [[0, points.length - 1]];
  while (stack.length) {
    const [first, last] = stack.pop();
    let index = -1;
    let far = tolerance;
    for (let i = first + 1; i < last; i++) {
      const d = perpendicular(points[i], points[first], points[last]);
      if (d > far) {
        far = d;
        index = i;
      }
    }
    if (index !== -1) {
      keep[index] = 1;
      stack.push([first, index], [index, last]);
    }
  }
  return points.filter((_, i) => keep[i]);
}

const num = (n) => {
  const s = n.toFixed(1);
  return s.endsWith(".0") ? s.slice(0, -2) : s;
};

/** `M x,y x,y …` — implicit linetos, matching the committed governorate rings. */
const toPath = (points, close) =>
  `M${points.map(([x, y]) => `${num(x)},${num(y)}`).join(" ")}${close ? "Z" : ""}`;

function bbox(points) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const [x, y] of points) {
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }
  return { minX, minY, maxX, maxY };
}

const overlapsWindow = (b) =>
  b.maxX >= WINDOW.minX && b.minX <= WINDOW.maxX &&
  b.maxY >= WINDOW.minY && b.minY <= WINDOW.maxY;

/* ------------------------------------------------------------------ clip */

/**
 * The ground the map actually draws.
 *
 * The window reaches into Iran, Türkiye and Syria, and a road that runs off the
 * last drawn governorate into unpainted space reads as a rendering fault rather
 * than as a road. So every line, lake and label below is kept only where it
 * falls on one of the seven governorates the map paints — the Region's three,
 * Kirkuk, and the three faint neighbours.
 */
const DRAWN = [
  "Dohuk", "Erbil", "Al-Sulaimaniyah", "Kirkuk", "Ninawa", "Salah al-Din", "Diyala",
];

function buildClip(adm1) {
  const polys = [];
  for (const feature of adm1.features) {
    if (!DRAWN.includes(feature.properties.shapeName)) continue;
    for (const ring of ringsOf(feature.geometry)) {
      const points = ring.map(project);
      if (points.length < 4) continue;
      polys.push({ points, box: bbox(points) });
    }
  }
  return polys;
}

function inRing(x, y, points) {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const [xi, yi] = points[i];
    const [xj, yj] = points[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function makeInside(clip) {
  return (x, y) => {
    for (const poly of clip) {
      const b = poly.box;
      if (x < b.minX || x > b.maxX || y < b.minY || y > b.maxY) continue;
      if (inRing(x, y, poly.points)) return true;
    }
    return false;
  };
}

/**
 * Split a projected line into the runs that lie on drawn ground and inside the
 * window. Runs are cut at the vertex, not at the crossing — at the scale a
 * border is drawn at, half a kilometre of overshoot is under a pixel.
 */
function clipLine(points, inside) {
  const runs = [];
  let run = [];
  for (const [x, y] of points) {
    const ok =
      x >= WINDOW.minX && x <= WINDOW.maxX &&
      y >= WINDOW.minY && y <= WINDOW.maxY &&
      inside(x, y);
    if (ok) {
      run.push([x, y]);
    } else {
      if (run.length > 1) runs.push(run);
      run = [];
    }
  }
  if (run.length > 1) runs.push(run);
  return runs;
}

/* ------------------------------------------------------------ OSM readers */

/** Overpass `out geom` ways → projected point arrays. */
function osmWays(doc, predicate = () => true) {
  if (!doc) return [];
  return doc.elements
    .filter((el) => el.type === "way" && el.geometry && predicate(el))
    .map((el) => el.geometry.map((g) => project([g.lon, g.lat])));
}

/** Overpass `out geom` ways *and* relation members, for lakes mapped as both. */
function osmAreas(doc, predicate = () => true) {
  if (!doc) return [];
  const out = [];
  for (const el of doc.elements) {
    if (!predicate(el)) continue;
    if (el.type === "way" && el.geometry) {
      out.push(el.geometry.map((g) => project([g.lon, g.lat])));
    } else if (el.type === "relation" && el.members) {
      for (const member of el.members) {
        if (member.role === "outer" && member.geometry) {
          out.push(member.geometry.map((g) => project([g.lon, g.lat])));
        }
      }
    }
  }
  return out;
}

/**
 * Many short ways into one `d`.
 *
 * The road network is tens of thousands of OSM ways, and one `<path>` each is
 * tens of thousands of DOM nodes for a layer that carries no interaction — the
 * browser reconciles and hit-tests every one of them on every frame of a pinch.
 * Concatenated, a whole class of road is a single element the compositor moves
 * as one, which is what makes the zoom hold sixty on a kiosk panel.
 */
function mergePaths(lines, tolerance, close = false) {
  const parts = [];
  for (const line of lines) {
    const simplified = simplify(line, tolerance);
    if (simplified.length < 2) continue;
    parts.push(toPath(simplified, close));
  }
  return parts.join("");
}

/* --------------------------------------------------------------- sources */

const adm1 = read("irq_adm1.json");
const adm2 = read("irq_adm2.json");
const clip = buildClip(adm1);
const inside = makeInside(clip);

/* -------------------------------------------------------------- districts
 *
 * geoBoundaries ADM2 carries no link back to its governorate, so a district is
 * assigned by where it sits: the governorate ring its own centroid falls in.
 * That is also the test that keeps the ninety-odd districts of federal Iraq out
 * of a file about the Region.
 */
const REGION_ADM1 = ["Dohuk", "Erbil", "Al-Sulaimaniyah", "Kirkuk"];
const regionRings = [];
for (const feature of adm1.features) {
  if (!REGION_ADM1.includes(feature.properties.shapeName)) continue;
  for (const ring of ringsOf(feature.geometry)) {
    const points = ring.map(project);
    if (points.length > 3) regionRings.push({ points, box: bbox(points) });
  }
}
const inRegion = makeInside(regionRings);

const slug = (name) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const districts = [];
for (const feature of adm2.features) {
  const rings = ringsOf(feature.geometry).map((ring) => ring.map(project));
  if (!rings.length) continue;
  const largest = rings.reduce((a, b) => (b.length > a.length ? b : a));
  const box = bbox(largest);
  const cx = (box.minX + box.maxX) / 2;
  const cy = (box.minY + box.maxY) / 2;
  if (!inRegion(cx, cy)) continue;
  const d = rings
    .filter((ring) => ring.length > 8)
    .map((ring) => toPath(simplify(ring, 1.1), true))
    .join("");
  if (!d) continue;
  districts.push({ id: slug(feature.properties.shapeName), name: feature.properties.shapeName, d });
}
districts.sort((a, b) => a.id.localeCompare(b.id));

/* ------------------------------------------------------------------ water */

const water = readIf("water.json");
const lakes = mergePaths(
  osmAreas(water, (el) => el.tags && el.tags.natural === "water")
    .filter((ring) => ring.length > 6 && overlapsWindow(bbox(ring)))
    .filter((ring) => {
      const b = bbox(ring);
      /* A pond is not cartography at this scale, and there are thousands. */
      return (b.maxX - b.minX) * (b.maxY - b.minY) > 4;
    })
    .filter((ring) => {
      const b = bbox(ring);
      return inside((b.minX + b.maxX) / 2, (b.minY + b.maxY) / 2);
    }),
  0.5,
  true,
);

const rivers = mergePaths(
  osmWays(water, (el) => el.tags && el.tags.waterway === "river")
    .flatMap((line) => clipLine(line, inside))
    /* Every irrigation cut is tagged a river somewhere; length is the filter
       that leaves the Tigris, the two Zabs and the Sirwan. */
    .filter((line) => {
      const b = bbox(line);
      return Math.hypot(b.maxX - b.minX, b.maxY - b.minY) > 10;
    }),
  0.6,
);

/* ------------------------------------------------------------------ roads */

const major = readIf("roads-major.json");
const minor = readIf("roads-minor.json");

const roadClass = (doc, kinds, tolerance) =>
  mergePaths(
    osmWays(doc, (el) => el.tags && kinds.includes(el.tags.highway)).flatMap((line) =>
      clipLine(line, inside),
    ),
    tolerance,
  );

const roads = {
  trunk: roadClass(major, ["motorway", "trunk"], 0.7),
  primary: roadClass(major, ["primary"], 0.7),
  secondary: roadClass(minor, ["secondary"], 0.7),
  tertiary: roadClass(minor, ["tertiary"], 0.8),
};

/* ------------------------------------------------------------ urban areas */

const neUrban = readIf("ne_urban.json");
const urban = neUrban
  ? mergePaths(
      neUrban.features
        .flatMap((feature) => ringsOf(feature.geometry).map((ring) => ring.map(project)))
        .filter((ring) => ring.length > 4 && overlapsWindow(bbox(ring)))
        .filter((ring) => {
          const b = bbox(ring);
          return inside((b.minX + b.maxX) / 2, (b.minY + b.maxY) / 2);
        }),
      0.4,
      true,
    )
  : "";

/* ------------------------------------------------------------------ towns
 *
 * The thirteen places the register documents already have pins, cards and
 * translated names of their own. Everything here is the *other* settlements —
 * the ones that only need to exist once the visitor has zoomed past the point
 * where thirteen dots stop being a map.
 */
const PINNED = [
  [44.009, 36.191], [42.988, 36.868], [45.436, 35.561], [44.392, 35.468],
  [43.13, 36.345], [41.84, 36.32], [45.323, 34.629], [45.986, 35.178],
  [44.886, 36.329], [44.542, 36.652], [42.681, 37.144], [43.892, 36.741],
  [43.487, 37.093],
];

const places = readIf("places.json");
const towns = [];
if (places) {
  for (const node of places.elements) {
    const tags = node.tags || {};
    const en = tags["name:en"] || tags.int_name;
    if (!en) continue;
    const [x, y] = project([node.lon, node.lat]);
    if (x < WINDOW.minX || x > WINDOW.maxX || y < WINDOW.minY || y > WINDOW.maxY) continue;
    if (!inside(x, y)) continue;
    /* Within ~12 km of a pinned place is that place under another spelling. */
    if (PINNED.some(([lon, lat]) => {
      const [px, py] = project([lon, lat]);
      return Math.hypot(px - x, py - y) < 27;
    })) continue;
    const population = Number(tags.population) || 0;
    const rank = tags.place === "city" || population >= 60000 ? 1 : 2;
    towns.push({
      id: slug(en) || `n${node.id}`,
      en,
      ku: tags["name:ckb"] || tags["name:ku"] || en,
      ar: tags["name:ar"] || en,
      x: Number(x.toFixed(1)),
      y: Number(y.toFixed(1)),
      rank,
    });
  }
}
towns.sort((a, b) => a.rank - b.rank || a.en.localeCompare(b.en));
/* One row per id: OSM carries the same town as a node more than once. */
const seenTown = new Set();
const uniqueTowns = towns.filter((t) => !seenTown.has(t.id) && seenTown.add(t.id));

/* ------------------------------------------------------------ city detail */

const CITIES = [
  "erbil", "duhok", "sulaymaniyah", "kirkuk", "nineveh", "sinjar", "garmian",
  "halabja", "raparin", "soran", "zakho", "akre", "amedi",
];

const cityDetail = [];
for (const id of CITIES) {
  const streetDoc = readIf(`streets/${id}.json`);
  const landuseDoc = readIf(`landuse/${id}.json`);
  if (!streetDoc && !landuseDoc) continue;

  const streetLines = osmWays(streetDoc);
  const streets = mergePaths(streetLines, 0.12);

  /* A parcel smaller than about a city block is a shop plot or a garden: it
     carries no shape at any zoom this map reaches, and there are thousands of
     them per city. */
  const worthDrawing = (ring) => {
    if (ring.length < 4) return false;
    const b = bbox(ring);
    return (b.maxX - b.minX) * (b.maxY - b.minY) > 0.02;
  };

  const built = mergePaths(
    osmWays(landuseDoc, (el) => el.tags && el.tags.landuse).filter(worthDrawing),
    0.12,
    true,
  );
  const green = mergePaths(
    osmWays(
      landuseDoc,
      (el) => el.tags && (el.tags.leisure || el.tags.aeroway === "aerodrome"),
    ).filter(worthDrawing),
    0.12,
    true,
  );

  const all = streetLines.flat();
  if (!all.length) continue;
  const b = bbox(all);
  cityDetail.push({
    id,
    minX: Number(b.minX.toFixed(1)),
    minY: Number(b.minY.toFixed(1)),
    maxX: Number(b.maxX.toFixed(1)),
    maxY: Number(b.maxY.toFixed(1)),
    streets,
    built,
    green,
  });
}

/* ------------------------------------------------------------------ emit */

const banner = `/**
 * GENERATED FILE — do not edit by hand.
 * Rebuild with scripts/build-bcf-kurdistan-detail.mjs.
 *
 * Sources
 *   geoBoundaries gbOpen IRQ ADM2   CC BY 4.0        https://www.geoboundaries.org
 *   OpenStreetMap contributors      ODbL             https://www.openstreetmap.org
 *   Natural Earth 10m urban areas   public domain    https://www.naturalearthdata.com
 *
 * Every coordinate is in the Region map's own user units — the projection
 * recovered in bcfMapGeometry.ts — so these layers sit under the governorate
 * rings and the city pins without any registration of their own.
 */
`;

const detail = `${banner}
export type BcfDetailShape = { id: string; name: string; d: string };

/** A settlement the map only names once the visitor has zoomed past the pins. */
export type BcfDetailTown = {
  id: string;
  en: string;
  ku: string;
  ar: string;
  x: number;
  y: number;
  /** 1 = city or large town, drawn first; 2 = everything else. */
  rank: 1 | 2;
};

/** Districts (qadhas) of Duhok, Erbil, Sulaymaniyah and Kirkuk. */
export const BCF_KRI_DISTRICTS: BcfDetailShape[] = ${JSON.stringify(districts, null, 2)};

/** Lakes and reservoirs — Dukan, Darbandikhan, Mosul — as one filled path. */
export const BCF_KRI_LAKES = ${JSON.stringify(lakes)};

/** The Tigris, the Great and Little Zab, the Sirwan. */
export const BCF_KRI_RIVERS = ${JSON.stringify(rivers)};

/**
 * The road network, one merged path per class so a whole tier is a single
 * element. Drawn in this order, thinnest last.
 */
export const BCF_KRI_ROADS = {
  trunk: ${JSON.stringify(roads.trunk)},
  primary: ${JSON.stringify(roads.primary)},
  secondary: ${JSON.stringify(roads.secondary)},
  tertiary: ${JSON.stringify(roads.tertiary)},
};

/** Built-up extent, for the tier between "a region" and "a city". */
export const BCF_KRI_URBAN = ${JSON.stringify(urban)};

export const BCF_KRI_TOWNS: BcfDetailTown[] = ${JSON.stringify(uniqueTowns)};
`;

const streets = `${banner}
/** One city's own fabric, with the box it occupies so the map can cull it. */
export type BcfCityDetail = {
  id: string;
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  /** Residential and unclassified streets, merged into one path. */
  streets: string;
  /** Residential, commercial and industrial land use. */
  built: string;
  /** Parks, pitches and the airport aprons. */
  green: string;
};

export const BCF_KRI_CITY_DETAIL: BcfCityDetail[] = ${JSON.stringify(cityDetail)};
`;

writeFileSync(OUT_DETAIL, detail);
writeFileSync(OUT_STREETS, streets);

const kb = (s) => `${(s.length / 1024).toFixed(0)} kB`;
console.log(`districts   ${districts.length}`);
console.log(`towns       ${uniqueTowns.length}`);
console.log(`trunk       ${kb(roads.trunk)}`);
console.log(`primary     ${kb(roads.primary)}`);
console.log(`secondary   ${kb(roads.secondary)}`);
console.log(`tertiary    ${kb(roads.tertiary)}`);
console.log(`lakes       ${kb(lakes)}`);
console.log(`rivers      ${kb(rivers)}`);
console.log(`urban       ${kb(urban)}`);
console.log(`cities      ${cityDetail.length}`);
console.log(`-> ${OUT_DETAIL} ${kb(detail)}`);
console.log(`-> ${OUT_STREETS} ${kb(streets)}`);
