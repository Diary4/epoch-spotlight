import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Line,
  Marker,
  Sphere,
  ZoomableGroup,
} from "react-simple-maps";
import {
  ArrowRight,
  BadgeCheck,
  Globe2,
  HandHeart,
  Landmark,
  Map as MapIcon,
  Minus,
  Plus,
  RotateCcw,
  Siren,
  X,
} from "lucide-react";
import {
  BCF_GLOBAL_LOCATIONS,
  BCF_GLOBAL_PROJECT_LOCATIONS,
  bcfCopy,
  type BcfLang,
  type GlobalLocationId,
  type GlobalReachKind,
  type LocationId,
} from "@/components/Sections/bcf/bcfContent";
import {
  bcfEntryCountFor,
  bcfSectorsFor,
} from "@/components/Sections/bcf/bcfProjectData";
import { bcfDigits } from "@/components/Sections/bcf/bcfDigits";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import {
  BCF_EASE,
  BCF_TAP,
  BCF_TAP_TRANSITION,
  bcfRise,
  bcfStagger,
} from "@/components/Sections/bcf/bcfMotion";
import worldTopology from "@/assets/geo/world-countries-110m.json";

/**
 * The world half of Where We Work.
 *
 * Natural Earth 110m country boundaries (public domain), shipped with the app
 * rather than fetched: this runs on a kiosk that cannot be assumed to have a
 * network, and a map that sometimes fails to arrive is worse than no map.
 *
 * Two views of the same thirteen countries:
 *
 *   Globe — an orthographic earth the visitor spins with a finger. It is the
 *   default because a wall panel is a thing people walk up to and touch, and a
 *   sphere that answers a drag is the one object on this screen that behaves
 *   like an object. It costs nothing in coverage either: Rabat to Canberra is
 *   145° of longitude and every one of the thirteen sits inside the hemisphere
 *   centred on the home rotation below, so the opening frame shows all of them.
 *
 *   Flat — Equal Earth, for reading the footprint as a whole. Mercator inflates
 *   the northern hemisphere, which is where nearly all of these countries
 *   happen to sit, and an organisation showing its own reach should not be
 *   doing it on a projection that quietly makes that reach look larger.
 */

/**
 * The flat artboard frames the footprint, not the planet: the projected extent
 * of lon [-20, 158] × lat [-46, 64] — the footprint plus a margin of ocean —
 * computed with d3-geo's fitExtent, which is where the scale and centre come
 * from. `translateExtent` fences panning to exactly this box, so the Americas
 * cannot be dragged back into view at any zoom.
 */
const MAP_WIDTH = 1000;
const MAP_HEIGHT = 754;
const HOME_CENTER: [number, number] = [69.21, 6.5];
const MAP_PROJECTION = { scale: 373.6, center: HOME_CENTER };

const MIN_ZOOM = 1;
const MAX_ZOOM = 10;
/** Below this the Levantine labels overlap; above it they have room to sit. */
const LABEL_ZOOM = 2.4;

/** Globe artboard. Square, so the sphere is never an ellipse. */
const GLOBE_SIZE = 1000;
/**
 * Radius in artboard units at zoom 1. Not the full half-square: the view
 * toggle and the zoom cluster float over the top corners of the stage, and a
 * globe drawn edge to edge would have them sitting on the Arctic.
 */
const GLOBE_SCALE = 420;
const GLOBE_MIN_ZOOM = 1;
const GLOBE_MAX_ZOOM = 6;
/** Labels crowd the Levant on a sphere sooner than they do on the flat map. */
const GLOBE_LABEL_ZOOM = 1.9;
/**
 * d3 rotates the sphere by the negation of the centre, so the home rotation is
 * the home centre flipped. Spinning to a country is the same trick.
 */
const HOME_ROTATION: [number, number] = [-HOME_CENTER[0], -HOME_CENTER[1]];
/**
 * The per-country `focusZoom` values were tuned against the flat artboard,
 * whose scale at zoom 1 is smaller than the globe's radius. Scaling them keeps
 * "tap Lebanon, get Lebanon" framing the same on both views without a second
 * column of numbers to maintain.
 */
const GLOBE_FOCUS_FACTOR = 0.8;

const DEG = Math.PI / 180;

const HQ = BCF_GLOBAL_LOCATIONS.find((l) => l.id === "kurdistan")!;

const kindIcons: Record<GlobalReachKind, typeof Landmark> = {
  hq: Landmark,
  registered: BadgeCheck,
  response: Siren,
  work: HandHeart,
};

/**
 * Response is the one kind that earns a colour outside the gold family.
 *
 * `work` cannot use BCF.nature, the obvious fourth token: it is a beige a few
 * percent off the colour of unhighlighted land, so nine of the thirteen
 * countries vanished into the continent they sit on. The deep gold reads as a
 * fill at a glance, which is the only job this colour has.
 */
const kindColors: Record<GlobalReachKind, string> = {
  hq: BCF.goldBright,
  registered: BCF.gold,
  response: BCF.red,
  work: BCF.goldDeep,
};

const ALL_KINDS: GlobalReachKind[] = ["hq", "registered", "response", "work"];

type View = { coordinates: [number, number]; zoom: number };
type ViewMode = "globe" | "flat";

const HOME_VIEW: View = { coordinates: HOME_CENTER, zoom: 1 };

const clampZoom = (z: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z));
const clampGlobeZoom = (z: number) =>
  Math.min(GLOBE_MAX_ZOOM, Math.max(GLOBE_MIN_ZOOM, z));
/** Past the poles the sphere turns upside down, which reads as a glitch. */
const clampTilt = (t: number) => Math.min(90, Math.max(-90, t));
/** Folds a longitude difference into ±180, so the globe never takes the long way. */
const shortWay = (degrees: number) => (((degrees % 360) + 540) % 360) - 180;

/**
 * Is a point on the near face of the globe? Markers are plain translates, so
 * d3's clipping never reaches them — without this, Australia stays pinned to
 * the disc while its landmass is round the back.
 */
function facingCamera(
  [lon, lat]: [number, number],
  rotation: [number, number],
): boolean {
  const cLon = -rotation[0];
  const cLat = -rotation[1];
  const cosine =
    Math.sin(lat * DEG) * Math.sin(cLat * DEG) +
    Math.cos(lat * DEG) * Math.cos(cLat * DEG) * Math.cos((lon - cLon) * DEG);
  /* A hair inside the limb: a dot exactly on the horizon is a smear. */
  return cosine > 0.04;
}

type BcfGlobalMapProps = {
  lang: BcfLang;
  selected: GlobalLocationId | null;
  onSelect: (id: GlobalLocationId | null) => void;
  /** Opens a country's own register, for the three countries that have one. */
  onExploreProjects: (id: LocationId) => void;
};

export default function BcfGlobalMap({
  lang,
  selected,
  onSelect,
  onExploreProjects,
}: BcfGlobalMapProps) {
  const c = bcfCopy[lang];
  const reduceMotion = useReducedMotion();
  const [mode, setMode] = React.useState<ViewMode>("globe");
  const [activeKinds, setActiveKinds] = React.useState<GlobalReachKind[]>(ALL_KINDS);
  const [view, setView] = React.useState<View>(HOME_VIEW);
  const [rotation, setRotation] = React.useState<[number, number]>(HOME_ROTATION);
  const [globeZoom, setGlobeZoom] = React.useState(1);
  /**
   * A programmatic move gets a CSS transition so the flat map glides to the
   * country instead of teleporting; a finger drag must not, or every frame of
   * the drag would be chasing a 600ms tween. The flag is cleared the moment a
   * gesture starts and on a timer after a button or list tap.
   */
  const [gliding, setGliding] = React.useState(false);
  const glideTimer = React.useRef<number>();

  /* The globe cannot use that trick — its rotation is baked into the
     projection, so there is nothing for CSS to interpolate. It gets a real
     tween instead, written straight to refs and flushed once per frame. */
  const rotationRef = React.useRef(rotation);
  const globeZoomRef = React.useRef(globeZoom);
  const spinFrame = React.useRef<number>();
  const rafFrame = React.useRef<number>();
  /** Live pointers on the globe, by id — two of them means a pinch. */
  const pointers = React.useRef(new Map<number, { x: number; y: number }>());
  const pinch = React.useRef<{ distance: number; zoom: number } | null>(null);
  const releaseDrag = React.useRef<() => void>();

  React.useEffect(
    () => () => {
      window.clearTimeout(glideTimer.current);
      if (spinFrame.current) cancelAnimationFrame(spinFrame.current);
      if (rafFrame.current) cancelAnimationFrame(rafFrame.current);
      releaseDrag.current?.();
    },
    [],
  );

  const moveTo = React.useCallback(
    (next: View) => {
      if (!reduceMotion) {
        setGliding(true);
        window.clearTimeout(glideTimer.current);
        glideTimer.current = window.setTimeout(() => setGliding(false), 700);
      }
      setView(next);
    },
    [reduceMotion],
  );

  /**
   * Rotation is written to a ref and flushed on the next frame. A drag fires
   * pointermove far faster than the 177 country paths can be reprojected, and
   * without this the panel spends the whole gesture rendering positions the
   * finger has already left behind.
   */
  const commitGlobe = React.useCallback(
    (nextRotation: [number, number], nextZoom = globeZoomRef.current) => {
      rotationRef.current = nextRotation;
      globeZoomRef.current = nextZoom;
      if (rafFrame.current) return;
      rafFrame.current = requestAnimationFrame(() => {
        rafFrame.current = undefined;
        setRotation(rotationRef.current);
        setGlobeZoom(globeZoomRef.current);
      });
    },
    [],
  );

  const stopSpin = React.useCallback(() => {
    if (spinFrame.current) cancelAnimationFrame(spinFrame.current);
    spinFrame.current = undefined;
  }, []);

  /** Turns the globe so a country faces the visitor, by the shorter way round. */
  const spinTo = React.useCallback(
    (coordinates: [number, number], zoom: number) => {
      stopSpin();
      const from = rotationRef.current;
      const fromZoom = globeZoomRef.current;
      const target: [number, number] = [
        from[0] + shortWay(-coordinates[0] - from[0]),
        clampTilt(-coordinates[1]),
      ];
      if (reduceMotion) {
        commitGlobe(target, zoom);
        return;
      }
      const started = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - started) / 760);
        const eased = 1 - Math.pow(1 - p, 3);
        commitGlobe(
          [
            from[0] + (target[0] - from[0]) * eased,
            from[1] + (target[1] - from[1]) * eased,
          ],
          fromZoom + (zoom - fromZoom) * eased,
        );
        spinFrame.current = p < 1 ? requestAnimationFrame(step) : undefined;
      };
      spinFrame.current = requestAnimationFrame(step);
    },
    [commitGlobe, reduceMotion, stopSpin],
  );

  const zoomGlobe = React.useCallback(
    (factor: number) => {
      stopSpin();
      commitGlobe(rotationRef.current, clampGlobeZoom(globeZoomRef.current * factor));
    },
    [commitGlobe, stopSpin],
  );

  /**
   * The drag lives on `window`, not on the stage, and takes no pointer capture.
   * Capture would have been the tidy way to follow a finger off the edge of the
   * globe, but a captured pointer also swallows the `click` that follows it —
   * and the thirteen markers on the sphere are buttons. Window listeners give
   * the same reach and leave the taps alone.
   */
  const beginDrag = React.useCallback(() => {
    if (releaseDrag.current) return;
    const move = (event: PointerEvent) => {
      const previous = pointers.current.get(event.pointerId);
      if (!previous) return;
      const next = { x: event.clientX, y: event.clientY };
      pointers.current.set(event.pointerId, next);

      if (pointers.current.size >= 2 && pinch.current) {
        const [a, b] = [...pointers.current.values()];
        const distance = Math.hypot(a.x - b.x, a.y - b.y) || 1;
        commitGlobe(
          rotationRef.current,
          clampGlobeZoom(pinch.current.zoom * (distance / pinch.current.distance)),
        );
        return;
      }

      /* Degrees of spin per pixel, tied to the on-screen radius so the surface
         tracks the finger at every zoom rather than racing it. */
      const perPixel = 78 / (GLOBE_SCALE * globeZoomRef.current);
      const [lon, tilt] = rotationRef.current;
      /* Drag right and the earth turns right: the centre longitude falls, and
         the rotation is its negation, so it rises. */
      commitGlobe([
        lon + (next.x - previous.x) * perPixel,
        clampTilt(tilt - (next.y - previous.y) * perPixel),
      ]);
    };
    const end = (event: PointerEvent) => {
      pointers.current.delete(event.pointerId);
      if (pointers.current.size < 2) pinch.current = null;
      if (pointers.current.size === 0) releaseDrag.current?.();
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
    releaseDrag.current = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
      releaseDrag.current = undefined;
      pointers.current.clear();
      pinch.current = null;
    };
  }, [commitGlobe]);

  const onGlobePointerDown = (event: React.PointerEvent) => {
    stopSpin();
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinch.current = {
        distance: Math.hypot(a.x - b.x, a.y - b.y) || 1,
        zoom: globeZoomRef.current,
      };
    }
    beginDrag();
  };

  const toggleKind = (kind: GlobalReachKind) => {
    setActiveKinds((prev) =>
      prev.includes(kind) ? prev.filter((k) => k !== kind) : [...prev, kind],
    );
  };

  const resetView = () => {
    onSelect(null);
    if (mode === "globe") {
      stopSpin();
      spinTo(HOME_CENTER, 1);
    } else {
      moveTo(HOME_VIEW);
    }
  };

  const visible = BCF_GLOBAL_LOCATIONS.filter((loc) => activeKinds.includes(loc.kind));
  const highlighted = React.useMemo(
    () => new Map(visible.map((loc) => [loc.iso, loc])),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeKinds],
  );
  const detail = selected ? c.globalLocations[selected] : null;
  const selectedLoc = selected
    ? BCF_GLOBAL_LOCATIONS.find((l) => l.id === selected) ?? null
    : null;
  const projectLocation = selected ? BCF_GLOBAL_PROJECT_LOCATIONS[selected] : undefined;

  /**
   * Tapping a place both opens its card and takes the map there — to the zoom
   * that frames *that* country, not to whichever zoom the map happened to be
   * on. Picking a country is a request to see it, so it may zoom out.
   */
  const pick = (id: GlobalLocationId) => {
    if (selected === id) {
      onSelect(null);
      return;
    }
    const loc = BCF_GLOBAL_LOCATIONS.find((l) => l.id === id)!;
    onSelect(id);
    if (mode === "globe") {
      spinTo(loc.coordinates, clampGlobeZoom(loc.focusZoom * GLOBE_FOCUS_FACTOR));
    } else {
      moveTo({ coordinates: loc.coordinates, zoom: clampZoom(loc.focusZoom) });
    }
  };

  const isGlobe = mode === "globe";
  const zoom = isGlobe ? globeZoom : view.zoom;
  const showLabels = isGlobe ? zoom >= GLOBE_LABEL_ZOOM : zoom >= LABEL_ZOOM;
  /** Flat markers ride inside a scaled group and have to be scaled back out. */
  const inv = isGlobe ? 1 : 1 / view.zoom;
  const canZoomOut = isGlobe ? globeZoom > GLOBE_MIN_ZOOM : view.zoom > MIN_ZOOM;
  const canZoomIn = isGlobe ? globeZoom < GLOBE_MAX_ZOOM : view.zoom < MAX_ZOOM;
  /* The globe can arrive home a whole turn away from where it started, so the
     longitudes are compared as bearings rather than as numbers. */
  const atHome = isGlobe
    ? Math.abs(globeZoom - 1) < 0.001 &&
      Math.abs(shortWay(rotation[0] - HOME_ROTATION[0])) < 0.05 &&
      Math.abs(rotation[1] - HOME_ROTATION[1]) < 0.05
    : view.zoom === 1 && view.coordinates === HOME_CENTER;

  /**
   * 177 country paths are rebuilt only when the highlighting changes, never on
   * a zoom or pan: React sees the identical element and skips the whole subtree.
   * (Spinning the globe still reprojects them — the projection lives in context,
   * and a context change reaches consumers through a bailed-out parent.)
   */
  const countries = React.useMemo(
    () => (
      <Geographies geography={worldTopology}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const hit = highlighted.get(String(geo.id));
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                vectorEffect="non-scaling-stroke"
                /* Cool grey land, warm fills. Plain white land over the warm
                   field came out the same beige as the gold highlights, so the
                   countries that matter had nothing to stand against. */
                fill={hit ? `${kindColors[hit.kind]}55` : "rgba(176,196,222,0.11)"}
                stroke={hit ? `${kindColors[hit.kind]}d9` : "rgba(200,218,240,0.22)"}
                strokeWidth={hit ? 1.4 : 0.6}
                style={{
                  default: { outline: "none", transition: "fill 300ms ease" },
                  hover: { outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            );
          })
        }
      </Geographies>
    ),
    [highlighted],
  );

  /* Sphere, graticule, arcs and markers are the same in both views — only the
     projection and the gesture around them change. */
  const cartography = (
    <>
      {isGlobe ? (
        <>
          {/* Atmosphere: a ring of gold just outside the limb. It is what
              separates a sphere from a filled circle at a glance. */}
          <circle
            cx={GLOBE_SIZE / 2}
            cy={GLOBE_SIZE / 2}
            r={GLOBE_SCALE * globeZoom * 1.08}
            fill="url(#bcf-globe-atmosphere)"
            pointerEvents="none"
          />
          <Sphere
            id="bcf-globe-sphere"
            fill="url(#bcf-globe-ocean)"
            stroke={`${BCF.gold}59`}
            strokeWidth={1.2}
            vectorEffect="non-scaling-stroke"
          />
        </>
      ) : (
        /* On the flat view the sphere is the sea rather than a hairline around
           the globe — its outline sits far outside a frame this tight, so all
           it can still do is give the cartography a plane of its own, darker
           than the plate it is set on. */
        <Sphere
          id="bcf-globe-sphere"
          fill="rgba(6,12,24,0.5)"
          stroke="none"
          strokeWidth={0}
          vectorEffect="non-scaling-stroke"
        />
      )}

      <Graticule
        step={isGlobe ? [15, 15] : [20, 20]}
        stroke={`${BCF.gold}1f`}
        strokeWidth={0.6}
        vectorEffect="non-scaling-stroke"
      />

      {countries}

      {/* Every thread runs back to Erbil: the reach is not thirteen separate
          footprints, it is one organisation reaching out of one place. */}
      {visible
        .filter((loc) => loc.id !== HQ.id)
        .map((loc) => (
          <Line
            key={`arc-${loc.id}`}
            from={HQ.coordinates}
            to={loc.coordinates}
            stroke={selected === loc.id ? `${BCF.gold}cc` : `${BCF.gold}42`}
            strokeWidth={selected === loc.id ? 1.8 : 1}
            strokeDasharray="7 9"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            fill="none"
          />
        ))}

      {visible.map((loc) => {
        if (isGlobe && !facingCamera(loc.coordinates, rotation)) return null;
        const isSelected = selected === loc.id;
        const color = kindColors[loc.kind];
        const radius = (loc.kind === "hq" ? 9 : 7) * inv;
        return (
          <Marker
            key={loc.id}
            coordinates={loc.coordinates}
            onClick={() => pick(loc.id)}
            style={{
              default: { cursor: "pointer", outline: "none" },
              hover: { outline: "none" },
              pressed: { outline: "none" },
            }}
          >
            {!reduceMotion ? (
              <circle
                r={radius}
                fill={`${color}55`}
                className="bcf-ping"
                style={
                  {
                    transformOrigin: "center",
                    transformBox: "fill-box",
                    "--ping-scale": loc.kind === "hq" ? "3.4" : "2.6",
                    "--ping-opacity": "0.5",
                    "--ping-duration": loc.kind === "hq" ? "2.8s" : "3.2s",
                  } as React.CSSProperties
                }
              />
            ) : null}
            {isSelected ? (
              <circle
                r={radius + 9 * inv}
                fill="none"
                stroke={color}
                strokeWidth={1.6}
                vectorEffect="non-scaling-stroke"
              />
            ) : null}
            <circle
              r={radius}
              fill={color}
              stroke="rgba(4,7,10,0.85)"
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
            />
            {/* A 7px dot is not a touch target on a wall panel. */}
            <circle r={30 * inv} fill="transparent" />
            {showLabels ? (
              <text
                x={0}
                y={-18 * inv}
                textAnchor="middle"
                fontSize={22 * inv}
                fill={isSelected ? BCF.gold : BCF.creamSoft}
                stroke="rgba(4,7,10,0.9)"
                strokeWidth={4 * inv}
                paintOrder="stroke"
                style={{ pointerEvents: "none" }}
              >
                {c.globalLocations[loc.id].name}
              </text>
            ) : null}
          </Marker>
        );
      })}
    </>
  );

  return (
    <div className="relative flex h-full flex-col">
      {/* Control band, above the map rather than under it.
          Everything a visitor has to touch lives here. On a 1080×1920 artboard
          stood on its end, a row of thirteen countries at the foot of the plate
          is around knee height on the panel — reachable in a mockup, not by a
          person. Moving the band up also hands the map every pixel below it,
          which is the other half of the same fix. */}
      <div className="px-8 pt-7">
        <motion.p
          className="mx-auto max-w-[820px] text-center text-[26px] leading-relaxed text-white/70"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: BCF_EASE }}
        >
          {c.globalLead}
        </motion.p>

        {/* Kinds double as the legend and as filters, the way the Region map's
            panel does — one control, so the two halves behave the same way. */}
        <motion.div
          className="mt-5 flex flex-wrap justify-center gap-3"
          variants={bcfStagger(0.06, 0.4)}
          initial="initial"
          animate="animate"
        >
          {ALL_KINDS.map((kind) => {
            const Icon = kindIcons[kind];
            const on = activeKinds.includes(kind);
            return (
              <motion.button
                key={kind}
                type="button"
                variants={bcfRise}
                onClick={() => toggleKind(kind)}
                whileTap={BCF_TAP}
                transition={BCF_TAP_TRANSITION}
                aria-pressed={on}
                className="flex transform-gpu items-center gap-3 rounded-full border px-5 py-2.5 transition-all duration-300"
                style={{
                  borderColor: on ? `${kindColors[kind]}88` : "rgba(255,255,255,0.14)",
                  backgroundColor: on ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.28)",
                  boxShadow: on ? `0 0 22px ${kindColors[kind]}26` : "none",
                }}
              >
                <Icon
                  className="h-6 w-6"
                  style={{ color: on ? kindColors[kind] : "rgba(255,255,255,0.35)" }}
                />
                <span
                  className="text-[24px]"
                  style={{ color: on ? BCF.creamSoft : "rgba(255,255,255,0.4)" }}
                >
                  {c.globalKinds[kind]}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* The list, not the dots, is the way in: six of the thirteen countries
            sit inside a 15° box and cannot be picked apart by thumb, and on the
            globe a third of them are round the back at any moment. Tapping one
            spins the earth to it, so the two stay in step. Name only — the
            meta line each row used to carry is on the card the tap opens, and
            three rows of chips buy the map two hundred pixels of height. */}
        <motion.div
          className="mt-4 flex flex-wrap justify-center gap-2.5"
          variants={bcfStagger(0.045, 0.5)}
          initial="initial"
          animate="animate"
        >
          <AnimatePresence initial={false}>
            {visible.map((loc) => {
              const copy = c.globalLocations[loc.id];
              const isSelected = selected === loc.id;
              const color = kindColors[loc.kind];
              return (
                <motion.button
                  key={loc.id}
                  type="button"
                  layout={!reduceMotion}
                  variants={bcfRise}
                  exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                  onClick={() => pick(loc.id)}
                  whileTap={BCF_TAP}
                  className="flex transform-gpu items-center gap-3 rounded-full border px-5 py-3 transition-colors duration-300"
                  style={{
                    borderColor: isSelected ? `${color}aa` : "rgba(255,255,255,0.11)",
                    backgroundColor: isSelected
                      ? "rgba(251,178,47,0.11)"
                      : "rgba(0,0,0,0.42)",
                    boxShadow: isSelected ? `0 0 26px ${color}33` : "none",
                  }}
                >
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: color, boxShadow: `0 0 12px ${color}99` }}
                  />
                  <span
                    className="whitespace-nowrap text-[24px] leading-none"
                    style={{ color: isSelected ? BCF.gold : BCF.creamSoft }}
                  >
                    {copy.name}
                  </span>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <div
          className="mt-6 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(251,193,88,0.3), transparent)",
          }}
        />
      </div>

      {/* Map stage. `flex-1` with a viewBox that meets rather than slices: the
          stage is whatever the artboard has left after the band, so the map
          takes all the slack instead of the layout depending on a height
          nobody owns. */}
      <motion.div
        className="relative min-h-0 flex-1 px-4 pb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.25, ease: BCF_EASE }}
      >
        <div
          className="relative h-full w-full"
          style={isGlobe ? { touchAction: "none" } : undefined}
          onPointerDown={isGlobe ? onGlobePointerDown : undefined}
          onWheel={
            isGlobe
              ? (event) => zoomGlobe(event.deltaY < 0 ? 1.12 : 1 / 1.12)
              : undefined
          }
        >
          {isGlobe ? (
            <ComposableMap
              width={GLOBE_SIZE}
              height={GLOBE_SIZE}
              projection="geoOrthographic"
              projectionConfig={{
                scale: GLOBE_SCALE * globeZoom,
                rotate: [rotation[0], rotation[1], 0],
              }}
              style={{ width: "100%", height: "100%" }}
            >
              <defs>
                {/* Lit from the upper left, like everything else in the scene. */}
                <radialGradient id="bcf-globe-ocean" cx="36%" cy="28%" r="82%">
                  <stop offset="0%" stopColor="#1c3054" />
                  <stop offset="52%" stopColor="#0d1a30" />
                  <stop offset="100%" stopColor="#04070f" />
                </radialGradient>
                <radialGradient id="bcf-globe-atmosphere" cx="50%" cy="50%" r="50%">
                  <stop offset="76%" stopColor={BCF.gold} stopOpacity="0" />
                  <stop offset="92%" stopColor={BCF.gold} stopOpacity="0.18" />
                  <stop offset="100%" stopColor={BCF.gold} stopOpacity="0" />
                </radialGradient>
              </defs>
              {cartography}
            </ComposableMap>
          ) : (
            <ComposableMap
              width={MAP_WIDTH}
              height={MAP_HEIGHT}
              projection="geoEqualEarth"
              projectionConfig={MAP_PROJECTION}
              style={{ width: "100%", height: "100%" }}
            >
              <ZoomableGroup
                center={view.coordinates}
                zoom={view.zoom}
                minZoom={MIN_ZOOM}
                maxZoom={MAX_ZOOM}
                /* Panning is fenced to the artboard, so the world can never be
                   dragged off the stage and left as an empty gold rectangle. */
                translateExtent={[
                  [0, 0],
                  [MAP_WIDTH, MAP_HEIGHT],
                ]}
                className={gliding ? "bcf-map-glide" : undefined}
                onMoveStart={() => {
                  window.clearTimeout(glideTimer.current);
                  setGliding(false);
                }}
                onMoveEnd={(position) =>
                  setView({
                    coordinates: position.coordinates as [number, number],
                    zoom: position.zoom,
                  })
                }
              >
                {cartography}
              </ZoomableGroup>
            </ComposableMap>
          )}
        </div>

        {/* Controls ride the top corners of the stage, not the bottom ones:
            the plate now runs to the foot of the artboard, and the foot of the
            artboard is not somewhere a visitor's hand goes. */}
        <div className="pointer-events-none absolute inset-x-4 top-0 flex items-start justify-between gap-4">
          <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/12 bg-black/55 p-1.5 backdrop-blur-md">
            {(["globe", "flat"] as ViewMode[]).map((id) => {
              const on = mode === id;
              const Icon = id === "globe" ? Globe2 : MapIcon;
              return (
                <motion.button
                  key={id}
                  type="button"
                  onClick={() => setMode(id)}
                  whileTap={BCF_TAP}
                  transition={BCF_TAP_TRANSITION}
                  aria-pressed={on}
                  className="flex transform-gpu items-center gap-2.5 rounded-full px-5 py-3 transition-colors duration-300"
                  style={{
                    backgroundColor: on ? "rgba(251,178,47,0.15)" : "transparent",
                    color: on ? BCF.gold : "rgba(255,255,255,0.45)",
                  }}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-[22px]">
                    {id === "globe" ? c.viewGlobe : c.viewFlat}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <div className="pointer-events-auto flex items-center gap-2">
            <ZoomButton
              label={c.zoomOut}
              disabled={!canZoomOut}
              onClick={() =>
                isGlobe
                  ? zoomGlobe(1 / 1.5)
                  : moveTo({ ...view, zoom: clampZoom(view.zoom / 1.6) })
              }
            >
              <Minus className="h-7 w-7" />
            </ZoomButton>
            <ZoomButton
              label={c.zoomIn}
              disabled={!canZoomIn}
              onClick={() =>
                isGlobe
                  ? zoomGlobe(1.5)
                  : moveTo({ ...view, zoom: clampZoom(view.zoom * 1.6) })
              }
            >
              <Plus className="h-7 w-7" />
            </ZoomButton>
            <ZoomButton label={c.resetView} disabled={atHome} onClick={resetView}>
              <RotateCcw className="h-6 w-6" />
            </ZoomButton>
          </div>
        </div>

        <p className="pointer-events-none absolute bottom-1 start-6 text-[20px] text-white/30">
          {isGlobe ? c.globeHint : c.globalZoomHint}
        </p>
      </motion.div>

      {/* A sheet over the middle of the stage rather than the whole screen: the
          map has just turned to this country and covering it would waste the
          only move the screen makes. */}
      <AnimatePresence mode="wait">
        {detail && selectedLoc ? (
          <motion.div
            key={selectedLoc.id}
            /* Centred, not pinned to the foot of the stage. The card carries
               the one button on this half of the screen, and at the bottom of a
               1920 artboard that button is knee height on a 65" panel stood on
               its end. */
            className="absolute inset-x-8 top-1/2 z-30 -translate-y-1/2"
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 32, transition: { duration: 0.24 } }}
            transition={{ duration: 0.5, ease: BCF_EASE }}
          >
            <div
              className="rounded-2xl border border-[#fbc158]/45 bg-[#0a0a0a]/95 p-8 backdrop-blur-xl"
              style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.6)" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span
                    className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[20px]"
                    style={{
                      borderColor: `${kindColors[selectedLoc.kind]}66`,
                      color: kindColors[selectedLoc.kind],
                    }}
                  >
                    {React.createElement(kindIcons[selectedLoc.kind], {
                      className: "h-5 w-5",
                    })}
                    {c.globalKinds[selectedLoc.kind]}
                  </span>
                  <h2
                    className="mt-4 text-[46px] font-semibold leading-tight"
                    style={{ color: BCF.gold }}
                  >
                    {detail.name}
                  </h2>
                  <p className="mt-1 text-[24px] text-white/55">{detail.meta}</p>
                </div>
                <motion.button
                  type="button"
                  onClick={() => onSelect(null)}
                  whileTap={BCF_TAP}
                  transition={BCF_TAP_TRANSITION}
                  className="grid h-12 w-12 shrink-0 transform-gpu place-items-center rounded-full border border-white/30"
                  aria-label={c.close}
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>

              <p className="mt-5 max-w-[760px] text-[25px] leading-relaxed text-white/80">
                {detail.description}
              </p>

              {/* The countries added from the twenty-year map carry no facts
                  yet; an empty rule under the description would read as a
                  missing block rather than a deliberate one. */}
              {detail.facts.length > 0 ? (
                <ul className="mt-5 space-y-3 border-t border-white/10 pt-5">
                  {detail.facts.map((fact) => (
                    <li key={fact} className="flex items-start gap-4">
                      <span
                        className="mt-3 h-px w-8 shrink-0"
                        style={{ backgroundColor: BCF.gold }}
                      />
                      <span className="text-[23px] leading-relaxed text-white/75">
                        {fact}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {/* Türkiye, Syria and Lebanon each carry a documented register,
                  so their card opens it here — the Van camp and the earthquake
                  response belong to Türkiye, not to a separate "International"
                  page filed under no country at all. The other ten countries
                  are on this map because the twenty-year poster puts them
                  there; it names no project for them, and a way in with nothing
                  behind it is worse than none. */}
              {projectLocation ? (
                <motion.button
                  type="button"
                  onClick={() => onExploreProjects(projectLocation)}
                  whileTap={BCF_TAP}
                  transition={BCF_TAP_TRANSITION}
                  className="mt-6 flex w-full transform-gpu items-center justify-between rounded-full border border-[#fbc158]/50 bg-black/25 px-7 py-4"
                >
                  <span className="text-start">
                    <span className="block text-[26px] text-white">
                      {c.locations[projectLocation].explore}
                    </span>
                    <span className="mt-0.5 block text-[19px] lowercase text-white/45">
                      <span className="tabular-nums">
                        {bcfDigits(bcfSectorsFor(projectLocation).length, lang)}
                      </span>{" "}
                      {bcfSectorsFor(projectLocation).length === 1
                        ? c.projects.sectorLabel
                        : c.projects.sectorsLabel}{" "}
                      ·{" "}
                      <span className="tabular-nums">
                        {bcfDigits(bcfEntryCountFor(projectLocation), lang)}
                      </span>{" "}
                      {c.projects.entriesShort}
                    </span>
                  </span>
                  <span
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2"
                    style={{ borderColor: BCF.gold }}
                  >
                    <ArrowRight
                      className="h-6 w-6 rtl:rotate-180"
                      style={{ color: BCF.gold }}
                    />
                  </span>
                </motion.button>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function ZoomButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileTap={disabled ? undefined : BCF_TAP}
      transition={BCF_TAP_TRANSITION}
      aria-label={label}
      className="grid h-16 w-16 transform-gpu place-items-center rounded-full border border-white/15 bg-black/60 backdrop-blur-md transition-opacity duration-300 disabled:opacity-30"
      style={{ color: BCF.gold }}
    >
      {children}
    </motion.button>
  );
}
