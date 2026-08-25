import { feature } from "topojson-client";
import worldTopology from "@/assets/geo/world-countries-110m.json";

/**
 * Natural Earth 110m country boundaries, converted to GeoJSON once.
 *
 * `<Geographies geography={topology}>` looks free, but react-simple-maps runs
 * whatever it is handed through `topojson.feature` *and* through `topojson.mesh`
 * twice — once for the world outline, once for the internal borders — inside an
 * effect that fires on every mount. The world map draws neither of those meshes;
 * it reads `geographies` and nothing else. So two thirds of that work was thrown
 * away, and all of it was paid again each time the visitor came back to the
 * world scope.
 *
 * Handing the component a plain feature array skips both mesh passes outright —
 * the library only converts when what it is given is a `Topology` — and moves the
 * one conversion that is actually needed to module load, where nothing is waiting
 * on it. The stable identity is the other half of the fix: that effect is keyed
 * on the prop, so a value that never changes is a conversion that never re-runs.
 *
 * `objects.countries` is the same object the library would have picked (it takes
 * the first key); naming it here means the `land` mesh beside it can never be
 * chosen by accident if the file is ever rebuilt with its keys in another order.
 */
const topology = worldTopology as unknown as {
  objects: Record<string, unknown>;
};

export const BCF_WORLD_FEATURES: unknown[] = feature(
  topology,
  topology.objects.countries,
).features;
