import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Building2, Globe2, Tent, Siren, X, ArrowRight, Globe, MapPin } from "lucide-react";
import BcfShell, { BcfBackButton } from "@/components/Sections/bcf/BcfShell";
import BcfChapterPill from "@/components/Sections/bcf/BcfChapterPill";
import {
  BCF_EASE,
  BCF_TAP,
  BCF_TAP_TRANSITION,
  bcfBloom,
  bcfRise,
  bcfStagger,
} from "@/components/Sections/bcf/bcfMotion";
import {
  BCF_BEYOND_LOCATIONS,
  BCF_LOCATIONS,
  bcfCopy,
  type BcfLang,
  type GlobalLocationId,
  type LocationId,
  type MapFilterId,
  type MapScopeId,
} from "@/components/Sections/bcf/bcfContent";
import {
  bcfEntryCountFor,
  bcfSectorsFor,
  bcfYearSpanFor,
} from "@/components/Sections/bcf/bcfProjectData";
import { BCF_SECTOR_ICONS } from "@/components/Sections/bcf/bcfSectorMeta";
import BcfGlobalMap from "@/components/Sections/bcf/BcfGlobalMap";
import { BCF, BCF_FIELD_BG } from "@/components/Sections/bcf/bcfTheme";
import {
  BCF_MAP_CONTEXT,
  BCF_MAP_CORE,
  BCF_MAP_KIRKUK,
  BCF_MAP_VIEWBOX,
  bcfProjectPin,
} from "@/components/Sections/bcf/bcfMapGeometry";
import { bcfSunrise, bcfJourneyMap } from "@/components/Sections/bcf/bcfAssets";

const filterIcons: Record<MapFilterId, typeof Building2> = {
  offices: Building2,
  camps: Tent,
  geographic: Globe2,
  emergency: Siren,
};

const scopeIcons: Record<MapScopeId, typeof Globe> = {
  global: Globe,
  kurdistan: MapPin,
};

/**
 * The world comes first. BCF is licensed in four countries and was across the
 * Turkish and Syrian border within days of the 2023 earthquakes; opening on the
 * Region alone told the smaller half of that story, so the scope is a category
 * the visitor switches, and it starts wide.
 */
const SCOPES: MapScopeId[] = ["global", "kurdistan"];

type BcfMapProps = {
  lang: BcfLang;
  selectedLocation: LocationId | null;
  onSelectLocation: (id: LocationId | null) => void;
  onExploreProjects: (id: LocationId) => void;
  onBack: () => void;
};

export default function BcfMap({
  lang,
  selectedLocation,
  onSelectLocation,
  onExploreProjects,
  onBack,
}: BcfMapProps) {
  const c = bcfCopy[lang];
  const reduceMotion = useReducedMotion();
  const [scope, setScope] = React.useState<MapScopeId>("global");
  const [globalSelection, setGlobalSelection] =
    React.useState<GlobalLocationId | null>(null);
  const [activeFilters, setActiveFilters] = React.useState<MapFilterId[]>([
    "offices",
    "camps",
    "geographic",
    "emergency",
  ]);
  const [hintVisible, setHintVisible] = React.useState(true);

  /* Switching scope closes whatever card was open on the half being left —
     otherwise the Region's Erbil panel is still sitting over the world map. */
  const selectScope = (next: MapScopeId) => {
    if (next === scope) return;
    setGlobalSelection(null);
    onSelectLocation(null);
    setScope(next);
  };

  const toggleFilter = (id: MapFilterId) => {
    setActiveFilters((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  const visibleLocations = BCF_LOCATIONS.filter((loc) =>
    loc.filters.some((f) => activeFilters.includes(f)),
  );

  const selected = selectedLocation ? c.locations[selectedLocation] : null;

  return (
    <BcfShell
      backgroundImage={bcfSunrise}
      overlayClassName="bg-black/65"
      drift={false}
    >
      <div className="relative flex min-h-[1920px] flex-col px-10 pb-16 pt-24">
        <BcfBackButton onClick={onBack} label={c.back} />

        <motion.div
          variants={bcfStagger(0.1, 0.16)}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={bcfRise}>
            <BcfChapterPill title={c.whereWeWork} thumb={bcfJourneyMap} />
          </motion.div>

          <div className="mt-12 max-w-[640px]">
            <motion.p
              variants={bcfRise}
              dir="ltr"
              className="text-[80px] font-bold leading-none"
            >
              <span className="text-[#fbf4e4]">0</span>
              <span style={{ color: BCF.gold }}>3</span>
            </motion.p>
            <motion.h1
              variants={bcfRise}
              className="mt-6 text-[80px] font-bold leading-[1.05]"
            >
              <span className="text-[#fbf4e4]">{c.across} </span>
              <span style={{ color: BCF.gold }}>{c.borders}</span>
            </motion.h1>
          </div>

          {/* Segmented scope control. Two states, both always visible, with the
              active one carrying the gold — on a kiosk a dropdown would be a
              second tap and a hidden option. */}
          <motion.div
            variants={bcfRise}
            role="tablist"
            aria-label={c.whereWeWork}
            className="mt-9 inline-flex gap-2 rounded-full border border-white/12 bg-black/45 p-2 backdrop-blur-md"
          >
            {SCOPES.map((id) => {
              const Icon = scopeIcons[id];
              const on = scope === id;
              return (
                <motion.button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => selectScope(id)}
                  whileTap={BCF_TAP}
                  transition={BCF_TAP_TRANSITION}
                  className="relative flex transform-gpu items-center gap-3 rounded-full px-8 py-4"
                >
                  {on ? (
                    <motion.span
                      layoutId="bcf-map-scope"
                      className="absolute inset-0 rounded-full border"
                      style={{
                        borderColor: `${BCF.gold}80`,
                        backgroundColor: "rgba(251,178,47,0.14)",
                        boxShadow: `0 0 28px ${BCF.gold}33`,
                      }}
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { duration: 0.4, ease: BCF_EASE }
                      }
                    />
                  ) : null}
                  <Icon
                    className="relative h-7 w-7"
                    style={{ color: on ? BCF.gold : "rgba(255,255,255,0.45)" }}
                  />
                  <span
                    className="relative text-[30px]"
                    style={{ color: on ? BCF.creamSoft : "rgba(255,255,255,0.5)" }}
                  >
                    {c.mapScopes[id]}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        </motion.div>

        {/* The near abroad, above the map rather than below it.
            Two reasons it moved. On a 65" panel stood on its end, a control at
            the foot of a 1920 artboard is around knee height — reachable in a
            mockup, not by a visitor. And it only belongs to the Region half:
            the world map answers "which countries?" itself, so a second list of
            countries under it was the same question asked twice. */}
        <AnimatePresence initial={false}>
          {scope === "kurdistan" ? (
            <motion.section
              key="beyond"
              className="mt-7 flex items-center gap-5 overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0, transition: { duration: 0.22 } }}
              transition={{ duration: 0.45, ease: BCF_EASE }}
            >
              <h2
                className="w-[190px] shrink-0 text-[28px] font-semibold leading-tight"
                style={{ color: BCF.gold }}
              >
                {c.projects.beyondTitle}
              </h2>
              <div className="grid flex-1 grid-cols-3 gap-4">
                {BCF_BEYOND_LOCATIONS.map((id) => (
                  <motion.button
                    key={id}
                    type="button"
                    onClick={() => onExploreProjects(id)}
                    whileTap={BCF_TAP}
                    transition={BCF_TAP_TRANSITION}
                    className="flex transform-gpu items-center justify-between gap-3 rounded-2xl border border-white/12 bg-black/45 px-5 py-4 text-start backdrop-blur-md"
                  >
                    <span className="min-w-0">
                      <span
                        className="block truncate text-[26px] font-semibold leading-tight"
                        style={{ color: BCF.creamSoft }}
                      >
                        {c.locations[id].short}
                      </span>
                      {/* Both numbers carry a noun — "3 Sectors · 4" left the
                          second one meaning nothing — but the short one, since
                          "Documented projects" wrapped the chip to three lines. */}
                      <span className="mt-1 block truncate text-[19px] lowercase text-white/50">
                        <span className="tabular-nums">
                          {bcfSectorsFor(id).length}
                        </span>{" "}
                        {c.projects.sectorsLabel} ·{" "}
                        <span className="tabular-nums">{bcfEntryCountFor(id)}</span>{" "}
                        {c.projects.entriesShort}
                      </span>
                    </span>
                    <span
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-full border"
                      style={{ borderColor: `${BCF.gold}80` }}
                    >
                      <ArrowRight
                        className="h-5 w-5 rtl:rotate-180"
                        style={{ color: BCF.gold }}
                      />
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.section>
          ) : null}
        </AnimatePresence>

        <motion.div
          className="relative mt-7 min-h-[900px] flex-1 overflow-hidden rounded-[32px] border border-[#fbc158]/28"
          style={{
            boxShadow:
              "inset 0 1px 0 rgba(251,193,88,0.14), inset 0 0 140px rgba(0,0,0,0.5), 0 34px 90px rgba(0,0,0,0.45)",
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: BCF_EASE }}
        >
          {/* A chart table, not a landscape. The plate used to be the sunrise
              photograph the opening screens are set on, dimmed to 30% — but a
              mountain ridge and a tree line under a world map read as two maps
              fighting, and the dark photo left the coastlines with almost no
              ground to sit on. The deep field the photograph-free scenes already
              use gives the cartography a surface of its own. */}
          <div className="absolute inset-0" style={{ background: BCF_FIELD_BG }} />
          {/* Gold graticule — reads as cartography rather than a dimmed photo. */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.13]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(251,193,88,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(251,193,88,0.5) 1px, transparent 1px)",
              backgroundSize: "120px 120px",
              maskImage:
                "radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent 82%)",
            }}
          />
          {/* Warm light under the middle of the plate, dark at the corners, so
              the map sits in the lit part and the buttons stay legible on the
              rim. Sized to this plate rather than the 1080×1920 artboard. */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 82% at 50% 44%, transparent 46%, rgba(4,6,9,0.62) 100%), radial-gradient(72% 54% at 50% 40%, rgba(251,193,88,0.1), transparent 72%)",
            }}
          />

          <AnimatePresence mode="wait">
            {scope === "global" ? (
              <motion.div
                key="scope-global"
                className="absolute inset-0 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.22 } }}
                transition={{ duration: 0.42, ease: BCF_EASE }}
              >
                <BcfGlobalMap
                  lang={lang}
                  selected={globalSelection}
                  onSelect={setGlobalSelection}
                  onExploreProjects={onExploreProjects}
                />
              </motion.div>
            ) : (
              <motion.div
                key="scope-kurdistan"
                className="absolute inset-0 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.22 } }}
                transition={{ duration: 0.42, ease: BCF_EASE }}
              >
                {/* Map plane. Fixed to the region's own aspect ratio and centred, so
                    the outlines and the pins share one coordinate space — the pin
                    percentages in BCF_LOCATIONS are percentages of *this* box, which
                    is the only reason a city can be trusted to sit on its own
                    governorate. */}
                <div
                  className="absolute inset-x-0 top-1/2 z-10 -translate-y-1/2"
                  style={{
                    aspectRatio: `${BCF_MAP_VIEWBOX.width} / ${BCF_MAP_VIEWBOX.height}`,
                  }}
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

                    {/* Neighbours first, and faint: they give the Region an edge to
                        sit against without ever competing with it. */}
                    {BCF_MAP_CONTEXT.map((shape) => (
                      <path
                        key={shape.id}
                        d={shape.d}
                        fill="rgba(255,255,255,0.022)"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth={1.2}
                        strokeLinejoin="round"
                      />
                    ))}

                    {/* Kirkuk is worked in but outside the Region — a dashed edge
                        says that without needing a legend. */}
                    <path
                      d={BCF_MAP_KIRKUK.d}
                      fill={`${BCF.gold}0f`}
                      stroke={`${BCF.gold}72`}
                      strokeWidth={1.8}
                      strokeDasharray="12 9"
                      strokeLinejoin="round"
                    />

                    {BCF_MAP_CORE.map((shape, index) => (
                      <g key={shape.id}>
                        {/* Wide, soft pass under the hairline reads as a glow on a
                            65" panel, where a 2px stroke alone goes thin and mean. */}
                        <path
                          d={shape.d}
                          fill="url(#bcf-map-core)"
                          stroke={`${BCF.gold}26`}
                          strokeWidth={9}
                          strokeLinejoin="round"
                        />
                        <motion.path
                          d={shape.d}
                          stroke={BCF.goldBright}
                          strokeWidth={2.4}
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

                  <AnimatePresence initial={false}>
                    {visibleLocations.map((loc, index) => {
                      const isSelected = selectedLocation === loc.id;
                      const pin = bcfProjectPin(...loc.coordinates);
                      return (
                        /* Pin anchoring stays on a plain wrapper — motion owns
                           `transform` on the button for the bloom and tap scale.
                           The wrapper centres on the coordinate rather than
                           sitting above it: with twelve markers the dot is the
                           thing that has to be exactly on its ground, and a
                           label hanging beneath is free to be approximate. */
                        <div
                          key={loc.id}
                          className="absolute -translate-x-1/2 -translate-y-1/2"
                          style={{ left: pin.x, top: pin.y }}
                        >
                          <motion.button
                            type="button"
                            variants={bcfBloom}
                            initial="initial"
                            animate="animate"
                            exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.22 } }}
                            transition={{
                              duration: 0.5,
                              delay: 0.9 + index * 0.05,
                              ease: BCF_EASE,
                            }}
                            onClick={() => {
                              setHintVisible(false);
                              onSelectLocation(loc.id);
                            }}
                            whileTap={BCF_TAP}
                            className="group flex transform-gpu flex-col items-center"
                          >
                            {/* A dot, not a name plate. Five cities could each
                                carry a pill with their full name on it; twelve
                                cannot — "Sulaymaniyah" alone is wider than the
                                gap to Halabja, and the labels collided before
                                the map had even finished drawing. The name now
                                rides under the dot at a size that fits, and the
                                card carries the full form. */}
                            <span className="relative grid h-9 w-9 place-items-center">
                              {/* Halo ping marks a pin as live without needing a hover. */}
                              {!reduceMotion ? (
                                <span
                                  aria-hidden="true"
                                  className="bcf-ping absolute h-6 w-6 rounded-full"
                                  style={
                                    {
                                      backgroundColor: `${BCF.goldBright}55`,
                                      "--ping-scale": "2.4",
                                      "--ping-opacity": "0.55",
                                      "--ping-duration": "2.4s",
                                      "--ping-delay": `${index * 0.28}s`,
                                    } as React.CSSProperties
                                  }
                                />
                              ) : null}
                              <span
                                className="relative rounded-full border-2 transition-all duration-300"
                                style={{
                                  width: isSelected ? 26 : 18,
                                  height: isSelected ? 26 : 18,
                                  borderColor: BCF.goldBright,
                                  backgroundColor: isSelected
                                    ? BCF.goldBright
                                    : "rgba(10,10,10,0.85)",
                                  boxShadow: isSelected
                                    ? `0 0 30px ${BCF.gold}aa`
                                    : `0 0 14px ${BCF.gold}55`,
                                }}
                              />
                            </span>
                            <span
                              className="mt-1 whitespace-nowrap rounded-md px-2 py-[3px] text-[22px] font-medium transition-all duration-300"
                              style={{
                                color: isSelected ? BCF.bg : BCF.creamSoft,
                                backgroundColor: isSelected
                                  ? BCF.goldBright
                                  : "rgba(4,6,9,0.72)",
                                textShadow: isSelected
                                  ? "none"
                                  : "0 2px 8px rgba(0,0,0,0.9)",
                              }}
                            >
                              {c.locations[loc.id].short}
                            </span>
                          </motion.button>
                        </div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* Filters sit low-left: the pins run from 18% to 58% of the stage,
                    so a top-left panel buried the Zakho marker behind itself. */}
                <motion.aside
                  className="absolute bottom-6 left-6 z-20 w-[300px] rounded-[24px] border border-white/10 bg-black/55 p-5 backdrop-blur-md"
                  variants={bcfStagger(0.06, 0.5)}
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
                        className="mb-3 flex w-full transform-gpu items-center justify-between gap-3 rounded-xl px-2 py-3 text-start last:mb-0"
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className="grid h-10 w-10 place-items-center rounded-full border transition-all duration-300"
                            style={{
                              borderColor: on ? BCF.gold : "rgba(255,255,255,0.25)",
                              color: on ? BCF.gold : "rgba(255,255,255,0.45)",
                              boxShadow: on ? `0 0 18px ${BCF.gold}40` : "none",
                            }}
                          >
                            <Icon className="h-5 w-5" />
                          </span>
                          <span
                            className="text-[28px] transition-colors duration-300"
                            style={{ color: on ? BCF.creamSoft : "rgba(255,255,255,0.45)" }}
                          >
                            {c.filters[id]}
                          </span>
                        </span>
                        <span
                          className="h-px transition-all duration-300"
                          style={{
                            width: on ? 32 : 0,
                            backgroundColor: BCF.gold,
                          }}
                        />
                      </motion.button>
                    );
                  })}
                </motion.aside>

                <AnimatePresence>
                  {hintVisible && !selectedLocation ? (
                    /* Above the topmost pin rather than mid-stage, where it landed
                       squarely on the Kirkuk and Erbil markers. */
                    <motion.div
                      className="pointer-events-none absolute left-1/2 top-6 z-20 -translate-x-1/2 text-center"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5, delay: 0.9, ease: BCF_EASE }}
                    >
                      <p className="rounded-full border border-white/10 bg-black/55 px-6 py-3 text-[24px] text-white backdrop-blur-md">
                        {c.tapToExplore}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

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
                      <div
                        className="w-full max-w-[920px] rounded-2xl border border-[#fbc158]/45 bg-[#0a0a0a]/95 p-8 backdrop-blur-xl"
                        style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.6)" }}
                      >
                        <div className="mb-4 flex items-start justify-between gap-4">
                          <h2 className="text-[48px] font-semibold" style={{ color: BCF.gold }}>
                            {selected.name}
                          </h2>
                          <motion.button
                            type="button"
                            onClick={() => onSelectLocation(null)}
                            whileTap={BCF_TAP}
                            transition={BCF_TAP_TRANSITION}
                            className="grid h-12 w-12 transform-gpu place-items-center rounded-full border border-white/30"
                            aria-label={c.close}
                          >
                            <X className="h-6 w-6" />
                          </motion.button>
                        </div>
                        <p className="max-w-[760px] text-[24px] leading-relaxed text-white/80">
                          {selected.description}
                        </p>

                        {/* Sectors, not a landscape photograph. The card used to
                            show a tourist plate of the nearest beauty spot — a
                            waterfall for Sulaymaniyah, a castle for Kirkuk — and
                            two invented totals underneath. What a visitor is
                            about to open is a register of sectors, so that is
                            what the card previews, drawn from the same data. */}
                        <div className="mt-7 flex flex-wrap gap-3">
                          {bcfSectorsFor(selectedLocation).map((record) => {
                            const SectorIcon = BCF_SECTOR_ICONS[record.id];
                            return (
                              <span
                                key={record.id}
                                className="flex items-center gap-2.5 rounded-full border px-4 py-2"
                                style={{
                                  borderColor: `${BCF.gold}3d`,
                                  backgroundColor: "rgba(251,193,88,0.07)",
                                }}
                              >
                                <SectorIcon
                                  className="h-6 w-6 shrink-0"
                                  style={{ color: BCF.gold }}
                                />
                                <span className="text-[22px] text-white/85">
                                  {c.projects.sectors[record.id]}
                                </span>
                              </span>
                            );
                          })}
                        </div>

                        <div className="mt-7 grid grid-cols-3 gap-8">
                          <div>
                            <p
                              className="text-[52px] font-bold leading-none tabular-nums"
                              style={{ color: BCF.gold }}
                            >
                              {bcfSectorsFor(selectedLocation).length}
                            </p>
                            <p className="mt-2 text-[22px] text-white/75">
                              {c.projects.sectorsLabel}
                            </p>
                          </div>
                          <div>
                            <p
                              className="text-[52px] font-bold leading-none tabular-nums"
                              style={{ color: BCF.gold }}
                            >
                              {bcfEntryCountFor(selectedLocation)}
                            </p>
                            <p className="mt-2 text-[22px] text-white/75">
                              {c.projects.entriesLabel}
                            </p>
                          </div>
                          {bcfYearSpanFor(selectedLocation) ? (
                            <div>
                              {/* Smaller than its two neighbours: "2012 - 2026"
                                  is nine glyphs where they are one or two, and
                                  at 52px it wrapped and shoved its own caption
                                  out of the row. */}
                              <p
                                className="whitespace-nowrap text-[40px] font-bold leading-none tabular-nums"
                                style={{ color: BCF.gold }}
                                dir="ltr"
                              >
                                {bcfYearSpanFor(selectedLocation)}
                              </p>
                              <p className="mt-2 text-[22px] text-white/75">
                                {c.projects.yearsLabel}
                              </p>
                            </div>
                          ) : null}
                        </div>
                        <motion.button
                          type="button"
                          onClick={() => onExploreProjects(selectedLocation)}
                          whileTap={BCF_TAP}
                          transition={BCF_TAP_TRANSITION}
                          className="mt-8 flex w-full transform-gpu items-center justify-between rounded-full border border-[#fbc158]/50 bg-black/25 px-8 py-5"
                        >
                          <span className="text-[28px] text-white">{selected.explore}</span>
                          <span
                            className={`grid h-14 w-14 place-items-center rounded-full border-2 ${
                              reduceMotion ? "" : "bcf-pulse"
                            }`}
                            style={
                              {
                                borderColor: BCF.gold,
                                "--pulse-scale": "1.06",
                                "--pulse-duration": "2.4s",
                              } as React.CSSProperties
                            }
                          >
                            <ArrowRight
                              className="h-7 w-7 rtl:rotate-180"
                              style={{ color: BCF.gold }}
                            />
                          </span>
                        </motion.button>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </BcfShell>
  );
}
