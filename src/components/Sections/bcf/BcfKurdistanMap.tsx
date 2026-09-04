import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Building2, Globe2, Minus, Plus, RotateCcw, Siren, Tent } from "lucide-react";
import {
  BCF_LOCATIONS,
  bcfCopy,
  type BcfLang,
  type LocationId,
  type MapFilterId,
} from "@/components/Sections/bcf/bcfContent";
import {
  BCF_MAP_CONTEXT,
  BCF_MAP_CORE,
  BCF_MAP_KIRKUK,
  BCF_MAP_VIEWBOX,
  bcfProjectPin,
} from "@/components/Sections/bcf/bcfMapGeometry";
import type {
  BcfDetailShape,
  BcfDetailTown,
} from "@/components/Sections/bcf/bcfKurdistanDetail";
import type { BcfCityDetail } from "@/components/Sections/bcf/bcfKurdistanStreets";
import BcfMapLocationCard from "@/components/Sections/bcf/BcfMapLocationCard";
import BcfMapPin from "@/components/Sections/bcf/BcfMapPin";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import {
  BCF_EASE,
  BCF_TAP,
  BCF_TAP_TRANSITION,
  bcfRise,
  bcfStagger,
} from "@/components/Sections/bcf/bcfMotion";
import {
  useBcfMapCamera,
  type BcfCameraBox,
  type BcfCameraState,
} from "@/components/Sections/bcf/useBcfMapCamera";

/**
 * The Region half of Where We Work, as a map a visitor can go into.
 *
 * It used to be one fixed picture: three governorate outlines and thirteen
 * dots, the whole Region at one scale, the same at the end of a visit as at the
 * beginning. That is a diagram of where BCF works. It is not a map — you cannot
 * ask it where Soran actually is, what road runs to Amedi, or how far Halabja
 * is from Sulaymaniyah, and those are the questions a visitor standing in front
 * of a 65" panel puts to a map with their hands.
 *
 * So it zooms, and it draws more the further in it goes:
 *
 *   the Region        outlines, thirteen places        — where BCF works
 *   the governorates  districts, lakes, the highways   — how you get there
 *   the districts     the minor roads, the towns       — what lies between them
 *   the city          the street grid and its blocks   — the place itself
 *
 * Every tier is the same drawing at the same coordinates — one projection, from
 * bcfMapGeometry.ts, all the way down to a residential street in Zakho — so
 * zooming is a camera move and never a swap between two maps that then have to
 * be kept in register.
 *
 * The two detail modules are about two megabytes of path data between them, and
 * they are fetched rather than bundled: the first when the visitor opens this
 * scope, the second only if they zoom far enough in to need a street. A visitor
 * who looks at the Region and moves on pays for neither.
 */

const filterIcons: Record<MapFilterId, typeof Building2> = {
  offices: Building2,
  camps: Tent,
  geographic: Globe2,
  emergency: Siren,
};

/**
 * What is drawn at what zoom.
 *
 * These four thresholds are most of the design of this screen. Too low and the
 * Region view is a plate of spaghetti nobody can read at kiosk distance; too
 * high and the visitor pinches, nothing happens, and they stop pinching. They
 * are set so each step in answers the question the step before it raises: the
 * highways arrive as soon as the governorates are big enough to hold them, the
 * towns as soon as there is room between the pins for a second name.
 */
const TIER = { region: 0, roads: 1, towns: 2, streets: 3 } as const;
type Tier = (typeof TIER)[keyof typeof TIER];

const tierFor = (k: number): Tier =>
  k < 1.9 ? TIER.region : k < 4 ? TIER.roads : k < 8.5 ? TIER.towns : TIER.streets;

const MAX_ZOOM = 16;

/** Metres per degree of latitude over the projection's units per degree. */
const KM_PER_UNIT = 111.32 / 283.23;

/** Round distances a scale bar is allowed to be, in kilometres. */
const SCALE_STEPS = [1, 2, 5, 10, 20, 50, 100, 200, 500];

/** A user-unit coordinate as a percentage of the plate. */
const atX = (x: number) =>
  `${((x - BCF_MAP_VIEWBOX.minX) / BCF_MAP_VIEWBOX.width) * 100}%`;
const atY = (y: number) =>
  `${((y - BCF_MAP_VIEWBOX.minY) / BCF_MAP_VIEWBOX.height) * 100}%`;

/**
 * A width in screen pixels, held there against the zoom.
 *
 * Everything inside the plate is scaled by the camera, which is right for a
 * river and wrong for the line that draws it: a road four times as thick is not
 * a road four times as wide, it is a mistake. The camera publishes 1/k as
 * `--bcf-inv-k` on the plate, and every stroke below is written in terms of it,
 * so a motorway is the same three pixels at every zoom — the way it is on the
 * map the visitor already knows.
 */
const held = (width: number) => `calc(var(--bcf-inv-k, 1) * ${width}px)`;

type DetailModule = typeof import("@/components/Sections/bcf/bcfKurdistanDetail");

type BcfKurdistanMapProps = {
  lang: BcfLang;
  /** Whether this is the scope on screen; the camera goes home when it is not. */
  active: boolean;
  selectedLocation: LocationId | null;
  onSelectLocation: (id: LocationId | null) => void;
  onExploreProjects: (id: LocationId) => void;
};

export default function BcfKurdistanMap({
  lang,
  active,
  selectedLocation,
  onSelectLocation,
  onExploreProjects,
}: BcfKurdistanMapProps) {
  const c = bcfCopy[lang];
  const reduceMotion = useReducedMotion();
  const planeRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const scaleBarRef = React.useRef<HTMLDivElement>(null);
  const scaleTextRef = React.useRef<HTMLSpanElement>(null);

  const [activeFilters, setActiveFilters] = React.useState<MapFilterId[]>([
    "offices",
    "camps",
    "geographic",
    "emergency",
  ]);
  const [hintVisible, setHintVisible] = React.useState(true);
  const [tier, setTier] = React.useState<Tier>(TIER.region);
  const [atHome, setAtHome] = React.useState(true);
  const [atCeiling, setAtCeiling] = React.useState(false);
  const [nearCities, setNearCities] = React.useState<string[]>([]);
  const [detail, setDetail] = React.useState<DetailModule | null>(null);
  const [cityDetail, setCityDetail] = React.useState<BcfCityDetail[] | null>(null);

  /* Everything the camera drives that is *not* a mount: the scale bar's width
     and its number, and which cities are close enough to be worth a street
     grid. Deliberately off React — this runs on every frame of a pinch, and a
     state update here would re-render a subtree holding a hundred thousand path
     commands sixty times a second. The three `setState`s below are all
     no-op-if-unchanged, so they fire on a threshold and never on a frame. */
  const onCamera = React.useCallback(
    (
      { k, x, y }: BcfCameraState,
      { plateW, planeW, planeH }: BcfCameraBox,
    ) => {
      const next = tierFor(k);
      setTier((current) => (current === next ? current : next));
      setAtHome((current) => (current === k <= 1.001 ? current : k <= 1.001));
      setAtCeiling((current) =>
        current === k >= MAX_ZOOM - 0.001 ? current : k >= MAX_ZOOM - 0.001,
      );

      if (!plateW) return;

      const bar = scaleBarRef.current;
      const text = scaleTextRef.current;
      if (bar && text) {
        const pxPerKm = ((plateW / BCF_MAP_VIEWBOX.width) * k) / KM_PER_UNIT;
        const km =
          SCALE_STEPS.find((step) => step * pxPerKm > 90) ??
          SCALE_STEPS[SCALE_STEPS.length - 1];
        bar.style.width = `${Math.round(km * pxPerKm)}px`;
        text.textContent = `${km} km`;
      }

      /* Thirteen boxes against one rectangle, once a frame, so that the twelve
         cities the visitor is not looking at cost nothing to not draw. */
      if (next < TIER.streets || !cityDetail) return;
      const units = BCF_MAP_VIEWBOX.width / plateW;
      const left = BCF_MAP_VIEWBOX.minX + (-x / k) * units;
      const right = BCF_MAP_VIEWBOX.minX + ((planeW - x) / k) * units;
      const top = BCF_MAP_VIEWBOX.minY + (-y / k) * units;
      const bottom = BCF_MAP_VIEWBOX.minY + ((planeH - y) / k) * units;
      const visible = cityDetail
        .filter(
          (city) =>
            city.maxX >= left &&
            city.minX <= right &&
            city.maxY >= top &&
            city.minY <= bottom,
        )
        .map((city) => city.id);
      setNearCities((current) =>
        current.length === visible.length && current.every((id, i) => id === visible[i])
          ? current
          : visible,
      );
    },
    [cityDetail],
  );

  const camera = useBcfMapCamera({
    planeRef,
    contentRef,
    minZoom: 1,
    maxZoom: MAX_ZOOM,
    onCamera,
  });

  /* The region layer is fetched when the visitor opens this scope; the city
     layer only once they have zoomed to where a street would be legible. Two
     requests instead of two megabytes in the bundle, and the second is usually
     never made. */
  React.useEffect(() => {
    if (!active || detail) return;
    let live = true;
    void import("@/components/Sections/bcf/bcfKurdistanDetail").then((module) => {
      if (live) setDetail(module);
    });
    return () => {
      live = false;
    };
  }, [active, detail]);

  React.useEffect(() => {
    if (tier < TIER.streets || cityDetail) return;
    let live = true;
    void import("@/components/Sections/bcf/bcfKurdistanStreets").then((module) => {
      if (live) setCityDetail(module.BCF_KRI_CITY_DETAIL);
    });
    return () => {
      live = false;
    };
  }, [tier, cityDetail]);

  /* Which cities are close enough to draw is decided the next time the camera
     moves — so a visitor who pinched to the street tier and then held still
     would watch nothing arrive. One tick, once the data is in hand. */
  React.useEffect(() => {
    if (cityDetail) camera.refresh();
  }, [cityDetail, camera]);

  /* Leaving the scope puts the map back where it started. Returning to the
     Region already zoomed into a street in Kalar, with no memory of having gone
     there, is the one thing a kiosk map must never do. */
  React.useEffect(() => {
    if (!active) camera.reset();
  }, [active, camera]);

  const toggleFilter = (id: MapFilterId) => {
    setActiveFilters((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  const visibleLocations = BCF_LOCATIONS.filter((loc) =>
    loc.filters.some((f) => activeFilters.includes(f)),
  );
  const selected = selectedLocation ? c.locations[selectedLocation] : null;

  const townName = (town: BcfDetailTown) =>
    lang === "ku" ? town.ku : lang === "ar" ? town.ar : town.en;

  const visibleCityDetail = (cityDetail ?? []).filter((city) =>
    nearCities.includes(city.id),
  );

  return (
    <>
      {/* Control band, matching the other two halves: instruction, then the
          filters, then a rule, and the map gets everything below. */}
      <div className="px-8 pt-7">
        {/* Faded rather than unmounted once a pin has been tapped — the row
            below it must not jump when the advice retires. */}
        <p
          className="text-center text-[26px] leading-relaxed text-white/70 transition-opacity duration-500"
          style={{ opacity: hintVisible && !selectedLocation ? 1 : 0 }}
        >
          {c.tapToExplore}
        </p>

        <motion.div
          className="mt-5 flex flex-wrap justify-center gap-3"
          variants={bcfStagger(0.06, 0.4)}
          initial="initial"
          animate="animate"
        >
          {(Object.keys(c.filters) as MapFilterId[]).map((id) => {
            const Icon = filterIcons[id];
            const on = activeFilters.includes(id);
            return (
              <motion.button
                key={id}
                type="button"
                variants={bcfRise}
                onClick={() => toggleFilter(id)}
                whileTap={BCF_TAP}
                transition={BCF_TAP_TRANSITION}
                aria-pressed={on}
                className="flex transform-gpu items-center gap-3 rounded-full border px-5 py-2.5 transition-all duration-300"
                style={{
                  borderColor: on ? `${BCF.gold}88` : "rgba(255,255,255,0.14)",
                  backgroundColor: on ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.28)",
                  boxShadow: on ? `0 0 22px ${BCF.gold}26` : "none",
                }}
              >
                <Icon
                  className="h-6 w-6"
                  style={{ color: on ? BCF.gold : "rgba(255,255,255,0.35)" }}
                />
                <span
                  className="text-[24px]"
                  style={{ color: on ? BCF.creamSoft : "rgba(255,255,255,0.4)" }}
                >
                  {c.filters[id]}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        <div
          className="mt-6 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(251,193,88,0.3), transparent)",
          }}
        />
      </div>

      {/* The plane is the window; the plate inside it is the drawing, and the
          camera moves the plate. `touch-action` is handed back to the page
          while the map is at home, so a visitor whose finger lands here can
          still scroll a screen that is 1920 tall — see useBcfMapCamera. */}
      <div
        ref={planeRef}
        className="relative min-h-0 flex-1 overflow-hidden"
        style={{ touchAction: atHome ? "pan-y" : "none" }}
      >
        {/* Fixed to the Region's own aspect ratio and centred, so the outlines
            and the pins share one coordinate space — the pin percentages in
            BCF_LOCATIONS are percentages of *this* box, which is the only
            reason a city can be trusted to sit on its own governorate. */}
        <div
          className="absolute inset-x-0 top-1/2 z-10 -translate-y-1/2"
          style={{
            aspectRatio: `${BCF_MAP_VIEWBOX.width} / ${BCF_MAP_VIEWBOX.height}`,
          }}
        >
          <div
            ref={contentRef}
            className="absolute inset-0"
            style={
              {
                transformOrigin: "0 0",
                "--bcf-inv-k": 1,
              } as React.CSSProperties
            }
          >
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox={`${BCF_MAP_VIEWBOX.minX} ${BCF_MAP_VIEWBOX.minY} ${BCF_MAP_VIEWBOX.width} ${BCF_MAP_VIEWBOX.height}`}
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="bcf-map-core" x1="0" y1="0" x2="0.4" y2="1">
                  <stop offset="0%" stopColor={BCF.gold} stopOpacity="0.22" />
                  <stop offset="100%" stopColor={BCF.goldDeep} stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {/* Ground. Neighbours first, and faint: they give the Region an
                  edge to sit against without ever competing with it. The
                  Region's own fill is here too rather than with its border,
                  because a translucent gold wash laid *over* the road network
                  would tint every road that runs under it. */}
              {BCF_MAP_CONTEXT.map((shape) => (
                <path
                  key={shape.id}
                  d={shape.d}
                  fill="rgba(255,255,255,0.022)"
                  stroke="rgba(255,255,255,0.1)"
                  style={{ strokeWidth: held(1.2) }}
                  strokeLinejoin="round"
                />
              ))}
              {/* The Region's gold wash is the identity of the map while the
                  map is a diagram of the Region. Once the roads arrive it is
                  competing with them — gold lines on a gold ground — so it
                  steps back as the cartography comes forward, the way an
                  administrative tint does on any map that also has to be
                  navigable. */}
              <motion.g
                animate={{ opacity: tier === TIER.region ? 1 : tier === TIER.roads ? 0.55 : 0.34 }}
                initial={false}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.5, ease: BCF_EASE }}
              >
                <path d={BCF_MAP_KIRKUK.d} fill={`${BCF.gold}0f`} />
                {BCF_MAP_CORE.map((shape) => (
                  <path key={`${shape.id}-fill`} d={shape.d} fill="url(#bcf-map-core)" />
                ))}
              </motion.g>

              {detail ? (
                <DetailLayers
                  tier={tier}
                  detail={detail}
                  cities={visibleCityDetail}
                  reduceMotion={Boolean(reduceMotion)}
                />
              ) : null}

              {/* Kirkuk is worked in but outside the Region — a dashed edge
                  says that without needing a legend. */}
              <path
                d={BCF_MAP_KIRKUK.d}
                stroke={`${BCF.gold}72`}
                style={{
                  strokeWidth: held(1.8),
                  strokeDasharray: `${held(12)} ${held(9)}`,
                }}
                strokeLinejoin="round"
              />

              {BCF_MAP_CORE.map((shape, index) => (
                <g key={shape.id}>
                  {/* Wide, soft pass under the hairline reads as a glow on a
                      65" panel, where a 2px stroke alone goes thin and mean. */}
                  <path
                    d={shape.d}
                    stroke={`${BCF.gold}26`}
                    style={{ strokeWidth: held(9) }}
                    strokeLinejoin="round"
                  />
                  <motion.path
                    d={shape.d}
                    stroke={BCF.goldBright}
                    style={{ strokeWidth: held(2.4) }}
                    strokeLinejoin="round"
                    // The border draws itself before the pins bloom, so the
                    // Region assembles rather than simply appearing.
                    initial={
                      reduceMotion ? { opacity: 0 } : { pathLength: 0, opacity: 0 }
                    }
                    animate={
                      reduceMotion
                        ? { opacity: 1, transition: { duration: 0.3 } }
                        : {
                            pathLength: 1,
                            opacity: 1,
                            transition: {
                              duration: 1.5,
                              ease: BCF_EASE,
                              delay: 0.4 + index * 0.16,
                            },
                          }
                    }
                  />
                </g>
              ))}
            </svg>

            {/* Town names are HTML over the drawing, like the pins, and like the
                pins they hold their size against the zoom. They arrive only once
                there is room between the thirteen dots for a second name —
                which is most of the reason the map zooms at all. */}
            {detail && tier >= TIER.roads
              ? detail.BCF_KRI_TOWNS.filter(
                  (town) => tier >= TIER.towns || town.rank === 1,
                ).map((town) => (
                  <div
                    key={town.id}
                    aria-hidden="true"
                    className="pointer-events-none absolute"
                    style={{
                      left: atX(town.x),
                      top: atY(town.y),
                      transform: "scale(var(--bcf-inv-k, 1))",
                      transformOrigin: "0 0",
                    }}
                  >
                    <span
                      className="absolute block rounded-full"
                      style={{
                        width: town.rank === 1 ? 9 : 6,
                        height: town.rank === 1 ? 9 : 6,
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "rgba(253,238,212,0.55)",
                        border: "1px solid rgba(4,6,9,0.7)",
                      }}
                    />
                    <span
                      className="absolute whitespace-nowrap font-medium"
                      style={{
                        transform: "translate(-50%, 7px)",
                        fontSize: town.rank === 1 ? 17 : 14,
                        color:
                          town.rank === 1
                            ? "rgba(253,238,212,0.86)"
                            : "rgba(253,238,212,0.6)",
                        textShadow:
                          "0 1px 6px rgba(4,6,9,0.95), 0 0 3px rgba(4,6,9,0.9)",
                      }}
                    >
                      {townName(town)}
                    </span>
                  </div>
                ))
              : null}

            <AnimatePresence initial={false}>
              {visibleLocations.map((loc, index) => {
                const pin = bcfProjectPin(...loc.coordinates);
                return (
                  <BcfMapPin
                    key={loc.id}
                    x={pin.x}
                    y={pin.y}
                    label={c.locations[loc.id].short}
                    selected={selectedLocation === loc.id}
                    index={index}
                    holdScale
                    onClick={() => {
                      /* A pan that happens to end on a pin is a pan, not a tap. */
                      if (camera.dragged.current) return;
                      setHintVisible(false);
                      onSelectLocation(loc.id);
                    }}
                  />
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Controls ride the top corner of the plane, matching the world half:
            the foot of a 1920 artboard is knee height on a panel stood on end. */}
        <div
          data-bcf-map-chrome
          className="pointer-events-none absolute inset-x-4 top-0 z-20 flex items-start justify-end"
        >
          <div className="pointer-events-auto flex items-center gap-2">
            <ZoomButton
              label={c.zoomOut}
              disabled={atHome}
              onClick={() => camera.zoomBy(1 / 1.8)}
            >
              <Minus className="h-7 w-7" />
            </ZoomButton>
            <ZoomButton
              label={c.zoomIn}
              disabled={atCeiling}
              onClick={() => camera.zoomBy(1.8)}
            >
              <Plus className="h-7 w-7" />
            </ZoomButton>
            <ZoomButton label={c.resetView} disabled={atHome} onClick={camera.reset}>
              <RotateCcw className="h-6 w-6" />
            </ZoomButton>
          </div>
        </div>

        {/* A map that says how far it is across is a map; one that does not is a
            picture of a region. */}
        <div className="pointer-events-none absolute bottom-1 start-6 z-20 flex items-end gap-6">
          <div className="flex flex-col gap-1">
            <div
              ref={scaleBarRef}
              className="h-[7px] border-x-2 border-b-2"
              style={{ borderColor: "rgba(253,238,212,0.5)", width: 120 }}
            />
            <span ref={scaleTextRef} className="text-[19px] tabular-nums text-white/45">
              &nbsp;
            </span>
          </div>
          <p className="pb-1 text-[20px] text-white/30">{c.globalZoomHint}</p>
        </div>

        {/* The roads, the water and the districts are other people's survey
            work, under licences that ask to be named. */}
        <p className="pointer-events-none absolute bottom-1 end-6 z-20 text-[16px] text-white/20">
          © OpenStreetMap · geoBoundaries · Natural Earth
        </p>
      </div>

      <AnimatePresence mode="wait">
        {selected && selectedLocation ? (
          <motion.div
            key={selectedLocation}
            className="absolute inset-0 z-30 flex items-center justify-center px-10"
            initial={{ opacity: 0, y: 56 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40, transition: { duration: 0.26 } }}
            transition={{ duration: 0.55, ease: BCF_EASE }}
          >
            <BcfMapLocationCard
              lang={lang}
              title={selected.name}
              description={selected.description}
              register={selectedLocation}
              preview={selectedLocation}
              onClose={() => onSelectLocation(null)}
              onExplore={() => onExploreProjects(selectedLocation)}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

/**
 * Everything between the governorate fill and the governorate border.
 *
 * Drawn in the order a map is read: water and land use under the roads, the
 * roads under the boundaries, the boundaries under the names. Each tier fades
 * in rather than appearing — a layer that switches on is a flicker; a layer that
 * arrives is a map getting closer.
 */
function DetailLayers({
  tier,
  detail,
  cities,
  reduceMotion,
}: {
  tier: Tier;
  detail: DetailModule;
  cities: BcfCityDetail[];
  reduceMotion: boolean;
}) {
  const fade = reduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.45, ease: BCF_EASE },
      };

  return (
    <>
      {tier >= TIER.roads ? (
        <motion.g key="water" {...fade}>
          <path
            d={detail.BCF_KRI_LAKES}
            fill="#12324a"
            stroke="#2b5f80"
            style={{ strokeWidth: held(0.8) }}
          />
          <path
            d={detail.BCF_KRI_RIVERS}
            stroke="#2b5f80"
            style={{ strokeWidth: held(1.4) }}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>
      ) : null}

      {tier >= TIER.towns ? (
        <motion.path
          key="urban"
          {...fade}
          d={detail.BCF_KRI_URBAN}
          fill="rgba(253,238,212,0.07)"
        />
      ) : null}

      {/* A city's own fabric: land use under its streets, and only for the
          cities whose ground is actually on screen. */}
      {tier >= TIER.streets
        ? cities.map((city) => (
            <motion.g key={city.id} {...fade}>
              <path d={city.built} fill="rgba(253,238,212,0.06)" />
              <path d={city.green} fill="rgba(120,170,120,0.12)" />
              <path
                d={city.streets}
                stroke="rgba(253,238,212,0.32)"
                style={{ strokeWidth: held(1) }}
                strokeLinecap="round"
              />
            </motion.g>
          ))
        : null}

      {/* Districts, under the road network: an administrative line is context
          for a road, never a thing anybody follows. */}
      {tier >= TIER.roads ? (
        <motion.g key="districts" {...fade}>
          {detail.BCF_KRI_DISTRICTS.map((district: BcfDetailShape) => (
            <path
              key={district.id}
              d={district.d}
              fill="none"
              stroke={`${BCF.gold}30`}
              style={{ strokeWidth: held(1) }}
              strokeLinejoin="round"
            />
          ))}
        </motion.g>
      ) : null}

      {/* Roads, thinnest first, so a motorway is never buried under a lane. */}
      {tier >= TIER.towns ? (
        <motion.g key="minor-roads" {...fade}>
          <path
            d={detail.BCF_KRI_ROADS.tertiary}
            stroke="rgba(253,238,212,0.18)"
            style={{ strokeWidth: held(1) }}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={detail.BCF_KRI_ROADS.secondary}
            stroke="rgba(253,238,212,0.3)"
            style={{ strokeWidth: held(1.4) }}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>
      ) : null}

      {tier >= TIER.roads ? (
        <motion.g key="major-roads" {...fade}>
          <path
            d={detail.BCF_KRI_ROADS.primary}
            stroke="rgba(226,190,126,0.6)"
            style={{ strokeWidth: held(2) }}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={detail.BCF_KRI_ROADS.trunk}
            stroke={`${BCF.gold}cc`}
            style={{ strokeWidth: held(2.8) }}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>
      ) : null}
    </>
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
