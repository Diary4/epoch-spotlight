import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Building2, Globe2, Tent, Siren, X, ArrowRight } from "lucide-react";
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
  BCF_LOCATIONS,
  bcfCopy,
  type BcfLang,
  type LocationId,
  type MapFilterId,
} from "@/components/Sections/bcf/bcfContent";
import { BCF, BCF_GLASS_CARD } from "@/components/Sections/bcf/bcfTheme";
import BcfStatValue from "@/components/Sections/bcf/BcfStatValue";
import {
  BCF_MAP_CONTEXT,
  BCF_MAP_CORE,
  BCF_MAP_KIRKUK,
  BCF_MAP_VIEWBOX,
} from "@/components/Sections/bcf/bcfMapGeometry";
import { bcfSunrise, bcfJourneyMap } from "@/components/Sections/bcf/bcfAssets";
import erbilImg from "@/assets/images/TouristicPlace/ErbilCastle/IMG_8636 copy.webp";
import duhokImg from "@/assets/images/TouristicPlace/GaliAliBag/16.webp";
import zakhoImg from "@/assets/images/TouristicPlace/Bekodian/1000140576.webp";
import kirkukImg from "@/assets/images/TouristicPlace/XanzadCastle/IMG_8529 copy 3.webp";
import sulayImg from "@/assets/images/TouristicPlace/AhmedAwa/1000140566.webp";

const locationImages: Record<LocationId, string> = {
  erbil: erbilImg,
  duhok: duhokImg,
  zakho: zakhoImg,
  kirkuk: kirkukImg,
  sulaymaniyah: sulayImg,
};

const filterIcons: Record<MapFilterId, typeof Building2> = {
  offices: Building2,
  camps: Tent,
  geographic: Globe2,
  emergency: Siren,
};

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
  const [activeFilters, setActiveFilters] = React.useState<MapFilterId[]>([
    "offices",
    "camps",
    "geographic",
    "emergency",
  ]);
  const [hintVisible, setHintVisible] = React.useState(true);

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
        </motion.div>

        <motion.div
          className="relative mt-10 min-h-[1100px] flex-1 overflow-hidden rounded-[32px] border border-[#fbc158]/15"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: BCF_EASE }}
        >
          {/* The plate the opening screens are set on, pushed right down: it is
              texture under the cartography, not a picture in its own right. */}
          <img
            src={bcfSunrise}
            alt=""
            className="absolute inset-0 h-full w-full object-cover brightness-[0.3] saturate-[0.55]"
          />
          <div className="absolute inset-0 bg-[#050a10]/72" />
          {/* Gold graticule — reads as cartography rather than a dimmed photo. */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.16]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(251,193,88,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(251,193,88,0.5) 1px, transparent 1px)",
              backgroundSize: "120px 120px",
              maskImage:
                "radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent 82%)",
            }}
          />

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
              viewBox={`0 0 ${BCF_MAP_VIEWBOX.width} ${BCF_MAP_VIEWBOX.height}`}
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
                return (
                  /* Pin anchoring stays on a plain wrapper — motion owns
                     `transform` on the button for the bloom and tap scale. */
                  <div
                    key={loc.id}
                    className="absolute -translate-x-1/2 -translate-y-full"
                    style={{ left: loc.x, top: loc.y }}
                  >
                    <motion.button
                      type="button"
                      variants={bcfBloom}
                      initial="initial"
                      animate="animate"
                      exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.22 } }}
                      transition={{
                        duration: 0.5,
                        delay: 0.9 + index * 0.07,
                        ease: BCF_EASE,
                      }}
                      onClick={() => {
                        setHintVisible(false);
                        onSelectLocation(loc.id);
                      }}
                      whileTap={BCF_TAP}
                      className="group origin-bottom transform-gpu"
                    >
                      <span className="relative flex flex-col items-center">
                        {/* Halo ping marks a pin as live without needing a hover. */}
                        {!reduceMotion ? (
                          <motion.span
                            aria-hidden="true"
                            className="absolute -bottom-1 h-6 w-6 rounded-full"
                            style={{ backgroundColor: `${BCF.goldBright}55` }}
                            animate={{ scale: [1, 2.4], opacity: [0.55, 0] }}
                            transition={{
                              duration: 2.4,
                              repeat: Infinity,
                              delay: index * 0.35,
                              ease: "easeOut",
                            }}
                          />
                        ) : null}
                        <span
                          className="rounded-full border px-5 py-3 text-[28px] font-medium transition-all duration-300"
                          style={{
                            borderColor: isSelected
                              ? BCF.goldBright
                              : `${BCF.goldBright}aa`,
                            backgroundColor: isSelected
                              ? "rgba(251,178,47,0.2)"
                              : "rgba(0,0,0,0.55)",
                            color: BCF.creamSoft,
                            boxShadow: isSelected
                              ? `0 0 34px ${BCF.gold}66`
                              : "0 8px 24px rgba(0,0,0,0.4)",
                          }}
                        >
                          {c.locations[loc.id].name}
                        </span>
                        <span
                          className="mt-1 h-0 w-0 border-l-[10px] border-r-[10px] border-t-[14px] border-l-transparent border-r-transparent"
                          style={{ borderTopColor: BCF.goldBright }}
                        />
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
                className="absolute inset-x-10 bottom-10 z-30 mx-auto max-w-[920px]"
                initial={{ opacity: 0, y: 56 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40, transition: { duration: 0.26 } }}
                transition={{ duration: 0.55, ease: BCF_EASE }}
              >
                <div
                  className={`${BCF_GLASS_CARD} p-8`}
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
                  <div className="relative mt-6 overflow-hidden rounded-xl">
                    <img
                      src={locationImages[selectedLocation]}
                      alt=""
                      className="h-[280px] w-full object-cover"
                    />
                    <span
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(4,7,10,0) 55%, rgba(4,7,10,0.55) 100%)",
                      }}
                    />
                  </div>
                  <div className="mt-7 grid grid-cols-2 gap-8">
                    <div>
                      <BcfStatValue
                        value={selected.projectsStat}
                        className="text-[52px] font-bold leading-none"
                      />
                      <p className="mt-2 text-[22px] text-white/75">
                        {selected.projectsLabel}
                      </p>
                    </div>
                    <div>
                      <BcfStatValue
                        value={selected.peopleStat}
                        className="text-[52px] font-bold leading-none"
                      />
                      <p className="mt-2 text-[22px] text-white/75">{selected.peopleLabel}</p>
                    </div>
                  </div>
                  <motion.button
                    type="button"
                    onClick={() => onExploreProjects(selectedLocation)}
                    whileTap={BCF_TAP}
                    transition={BCF_TAP_TRANSITION}
                    className="mt-8 flex w-full transform-gpu items-center justify-between rounded-full border border-[#fbc158]/50 bg-black/25 px-8 py-5"
                  >
                    <span className="text-[28px] text-white">{selected.explore}</span>
                    <motion.span
                      className="grid h-14 w-14 place-items-center rounded-full border-2"
                      style={{ borderColor: BCF.gold }}
                      animate={reduceMotion ? undefined : { scale: [1, 1.06, 1] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight
                        className="h-7 w-7 rtl:rotate-180"
                        style={{ color: BCF.gold }}
                      />
                    </motion.span>
                  </motion.button>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>
    </BcfShell>
  );
}
