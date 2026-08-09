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
import { ArrowRight, BadgeCheck, HandHeart, Landmark, Minus, Plus, RotateCcw, Siren, X } from "lucide-react";
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
 * Equal Earth rather than the web-mercator default. Mercator inflates the
 * northern hemisphere — which is where every one of these eight countries
 * happens to sit — and an organisation showing its own reach should not be
 * doing it on a projection that quietly makes that reach look larger.
 */

/**
 * Frames the footprint, not the planet. The thirteen countries span Rabat to
 * Canberra and Scotland to Tasmania; drawn on a whole-world artboard that left
 * two empty continents on screen and shrank the part that carries the story.
 *
 * The artboard is the projected extent of lon [-20, 158] × lat [-46, 64] — the
 * footprint plus a margin of ocean — computed with d3-geo's fitExtent, which is
 * where the scale and centre come from. Its own aspect ratio, so nothing is
 * stretched, and `translateExtent` below fences panning to exactly this box, so
 * the Americas cannot be dragged back into view at any zoom.
 */
const MAP_WIDTH = 1000;
const MAP_HEIGHT = 754;
const HOME_CENTER: [number, number] = [69.21, 6.5];
const MAP_PROJECTION = { scale: 373.6, center: HOME_CENTER };

const MIN_ZOOM = 1;
const MAX_ZOOM = 10;
/** Below this the Levantine labels overlap; above it they have room to sit. */
const LABEL_ZOOM = 2.4;

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

const HOME_VIEW: View = { coordinates: HOME_CENTER, zoom: 1 };

const clampZoom = (z: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z));

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
  const [activeKinds, setActiveKinds] = React.useState<GlobalReachKind[]>(ALL_KINDS);
  const [view, setView] = React.useState<View>(HOME_VIEW);
  /**
   * A programmatic move gets a CSS transition so the map glides to the country
   * instead of teleporting; a finger drag must not, or every frame of the drag
   * would be chasing a 600ms tween. The flag is cleared the moment a gesture
   * starts and on a timer after a button or list tap.
   */
  const [gliding, setGliding] = React.useState(false);
  const glideTimer = React.useRef<number>();

  React.useEffect(() => () => window.clearTimeout(glideTimer.current), []);

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

  const toggleKind = (kind: GlobalReachKind) => {
    setActiveKinds((prev) =>
      prev.includes(kind) ? prev.filter((k) => k !== kind) : [...prev, kind],
    );
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
    moveTo({ coordinates: loc.coordinates, zoom: clampZoom(loc.focusZoom) });
  };

  const showLabels = view.zoom >= LABEL_ZOOM;
  /** Dots and labels are screen-sized, so they do not balloon as the map grows. */
  const inv = 1 / view.zoom;

  /**
   * 177 country paths are rebuilt only when the highlighting changes, never on
   * a zoom or pan: React sees the identical element and skips the whole subtree.
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

  return (
    <div className="relative flex h-full flex-col px-8 pb-8 pt-10">
      <motion.p
        className="mx-auto max-w-[760px] text-center text-[26px] leading-relaxed text-white/70"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: BCF_EASE }}
      >
        {c.globalLead}
      </motion.p>

      {/* `flex-1` plus a viewBox that meets rather than slices: the stage is
          whatever the 1920 artboard has left after the header, so the map takes
          the slack instead of the layout depending on a height nobody owns. */}
      <motion.div
        className="relative mt-4 flex min-h-0 flex-1 items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.25, ease: BCF_EASE }}
      >
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
            {/* The sphere is now the sea rather than a hairline around the
                globe — its outline sits far outside a frame this tight, so all
                it can still do is give the cartography a plane of its own,
                darker than the plate it is set on. */}
            <Sphere
              id="bcf-globe-sphere"
              fill="rgba(6,12,24,0.5)"
              stroke="none"
              strokeWidth={0}
              vectorEffect="non-scaling-stroke"
            />
            <Graticule
              step={[20, 20]}
              stroke={`${BCF.gold}1f`}
              strokeWidth={0.6}
              vectorEffect="non-scaling-stroke"
            />

            {countries}

            {/* Every thread runs back to Erbil: the reach is not eight separate
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
          </ZoomableGroup>
        </ComposableMap>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4">
          <p className="text-[20px] text-white/35">{c.globalZoomHint}</p>
          <div className="pointer-events-auto flex items-center gap-2">
            <ZoomButton
              label={c.zoomOut}
              disabled={view.zoom <= MIN_ZOOM}
              onClick={() => moveTo({ ...view, zoom: clampZoom(view.zoom / 1.6) })}
            >
              <Minus className="h-7 w-7" />
            </ZoomButton>
            <ZoomButton
              label={c.zoomIn}
              disabled={view.zoom >= MAX_ZOOM}
              onClick={() => moveTo({ ...view, zoom: clampZoom(view.zoom * 1.6) })}
            >
              <Plus className="h-7 w-7" />
            </ZoomButton>
            <ZoomButton
              label={c.resetView}
              disabled={view.zoom === 1 && view.coordinates === HOME_CENTER}
              onClick={() => {
                onSelect(null);
                moveTo(HOME_VIEW);
              }}
            >
              <RotateCcw className="h-6 w-6" />
            </ZoomButton>
          </div>
        </div>
      </motion.div>

      {/* Kinds double as the legend and as filters, the way the Region map's
          panel does — one control, so the two halves behave the same way. */}
      <motion.div
        className="mt-4 flex flex-wrap justify-center gap-3"
        variants={bcfStagger(0.06, 0.45)}
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
          sit inside a 15° box and cannot be picked apart by thumb at map zoom.
          Tapping one flies the map to it, so the two stay in step. Three columns
          rather than two — thirteen rows of pairs would eat the map's height. */}
      <motion.div
        className="mt-4 grid grid-cols-3 gap-2.5"
        variants={bcfStagger(0.05, 0.55)}
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
                className="flex transform-gpu items-center gap-3 rounded-2xl border px-4 py-2.5 text-start transition-colors duration-300"
                style={{
                  borderColor: isSelected ? `${color}99` : "rgba(255,255,255,0.1)",
                  backgroundColor: isSelected
                    ? "rgba(251,178,47,0.09)"
                    : "rgba(0,0,0,0.42)",
                }}
              >
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: color, boxShadow: `0 0 14px ${color}88` }}
                />
                <span className="min-w-0">
                  <span
                    className="block truncate text-[23px] leading-tight"
                    style={{ color: isSelected ? BCF.gold : BCF.creamSoft }}
                  >
                    {copy.name}
                  </span>
                  <span className="mt-0.5 block truncate text-[16px] text-white/50">
                    {copy.meta}
                  </span>
                </span>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* A sheet over the legend and the list rather than the whole stage: the
          map has just flown to this country and covering it would waste the
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
                        {bcfSectorsFor(projectLocation).length}
                      </span>{" "}
                      {bcfSectorsFor(projectLocation).length === 1
                        ? c.projects.sectorLabel
                        : c.projects.sectorsLabel}{" "}
                      ·{" "}
                      <span className="tabular-nums">
                        {bcfEntryCountFor(projectLocation)}
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
