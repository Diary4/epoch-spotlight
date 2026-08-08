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
} from "react-simple-maps";
import { Award, BadgeCheck, Landmark, Siren, X } from "lucide-react";
import {
  BCF_GLOBAL_LOCATIONS,
  bcfCopy,
  type BcfLang,
  type GlobalLocationId,
  type GlobalReachKind,
} from "@/components/Sections/bcf/bcfContent";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import { BCF_EASE, BCF_TAP, BCF_TAP_TRANSITION, bcfRise, bcfStagger } from "@/components/Sections/bcf/bcfMotion";
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
 * Sized against the 1080-wide artboard: the frame crops the mid-Pacific and the
 * foot of Antarctica, neither of which carries anything this screen is saying,
 * and spends the pixels it saves on the Atlantic band the eight countries sit in.
 */
const MAP_WIDTH = 1000;
const MAP_HEIGHT = 560;
const MAP_PROJECTION = { scale: 198, center: [10, 8] as [number, number] };

const HQ = BCF_GLOBAL_LOCATIONS.find((l) => l.id === "kurdistan")!;

const kindIcons: Record<GlobalReachKind, typeof Landmark> = {
  hq: Landmark,
  registered: BadgeCheck,
  response: Siren,
  recognition: Award,
};

/** Response is the one kind that earns a colour outside the gold family. */
const kindColors: Record<GlobalReachKind, string> = {
  hq: BCF.goldBright,
  registered: BCF.gold,
  response: BCF.red,
  recognition: BCF.nature,
};

const ALL_KINDS: GlobalReachKind[] = ["hq", "registered", "response", "recognition"];

type BcfGlobalMapProps = {
  lang: BcfLang;
  selected: GlobalLocationId | null;
  onSelect: (id: GlobalLocationId | null) => void;
};

export default function BcfGlobalMap({ lang, selected, onSelect }: BcfGlobalMapProps) {
  const c = bcfCopy[lang];
  const reduceMotion = useReducedMotion();
  const [activeKinds, setActiveKinds] = React.useState<GlobalReachKind[]>(ALL_KINDS);

  const toggleKind = (kind: GlobalReachKind) => {
    setActiveKinds((prev) =>
      prev.includes(kind) ? prev.filter((k) => k !== kind) : [...prev, kind],
    );
  };

  const visible = BCF_GLOBAL_LOCATIONS.filter((loc) => activeKinds.includes(loc.kind));
  const highlighted = React.useMemo(
    () => new Map(visible.map((loc) => [loc.iso, loc])),
    [visible],
  );
  const detail = selected ? c.globalLocations[selected] : null;
  const selectedLoc = selected
    ? BCF_GLOBAL_LOCATIONS.find((l) => l.id === selected) ?? null
    : null;

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
          aria-hidden="true"
        >
          <Sphere
            id="bcf-globe-sphere"
            fill="rgba(255,255,255,0.018)"
            stroke={`${BCF.gold}2e`}
            strokeWidth={1.2}
          />
          <Graticule step={[20, 20]} stroke={`${BCF.gold}1f`} strokeWidth={0.6} />

          <Geographies geography={worldTopology}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const hit = highlighted.get(String(geo.id));
                const isSelected = hit != null && hit.id === selected;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={
                      hit
                        ? isSelected
                          ? `${kindColors[hit.kind]}59`
                          : `${kindColors[hit.kind]}2e`
                        : "rgba(255,255,255,0.045)"
                    }
                    stroke={hit ? `${kindColors[hit.kind]}b3` : "rgba(255,255,255,0.14)"}
                    strokeWidth={hit ? 1.1 : 0.5}
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
                fill="none"
              />
            ))}

          {visible.map((loc) => {
            const isSelected = selected === loc.id;
            const color = kindColors[loc.kind];
            const radius = loc.kind === "hq" ? 9 : 7;
            return (
              <Marker
                key={loc.id}
                coordinates={loc.coordinates}
                onClick={() => onSelect(isSelected ? null : loc.id)}
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
                  <circle r={radius + 8} fill="none" stroke={color} strokeWidth={1.6} />
                ) : null}
                <circle
                  r={radius}
                  fill={color}
                  stroke="rgba(4,7,10,0.85)"
                  strokeWidth={2}
                />
                {/* A 7px dot is not a touch target on a wall panel. */}
                <circle r={30} fill="transparent" />
              </Marker>
            );
          })}
        </ComposableMap>
      </motion.div>

      {/* Kinds double as the legend and as filters, the way the Region map's
          panel does — one control, so the two halves behave the same way. */}
      <motion.div
        className="mt-6 flex flex-wrap justify-center gap-3"
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

      {/* The list, not the dots, is the real tap target: four of the eight
          countries sit inside a 15° box and cannot be picked apart by thumb. */}
      <motion.div
        className="mt-6 grid grid-cols-2 gap-4"
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
                onClick={() => onSelect(isSelected ? null : loc.id)}
                whileTap={BCF_TAP}
                className="flex transform-gpu items-center gap-4 rounded-2xl border p-3 text-start transition-colors duration-300"
                style={{
                  borderColor: isSelected ? `${color}99` : "rgba(255,255,255,0.1)",
                  backgroundColor: isSelected ? "rgba(251,178,47,0.09)" : "rgba(0,0,0,0.42)",
                }}
              >
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: color, boxShadow: `0 0 14px ${color}88` }}
                />
                <span className="min-w-0">
                  <span
                    className="block truncate text-[28px] leading-tight"
                    style={{ color: isSelected ? BCF.gold : BCF.creamSoft }}
                  >
                    {copy.name}
                  </span>
                  <span className="mt-1 block truncate text-[19px] text-white/50">
                    {copy.meta}
                  </span>
                </span>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence mode="wait">
        {detail && selectedLoc ? (
          <motion.div
            key={selectedLoc.id}
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
              <div className="mb-2 flex items-start justify-between gap-4">
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
                    className="mt-4 text-[48px] font-semibold leading-tight"
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

              <p className="mt-6 max-w-[760px] text-[26px] leading-relaxed text-white/80">
                {detail.description}
              </p>

              <ul className="mt-7 space-y-4 border-t border-white/10 pt-6">
                {detail.facts.map((fact) => (
                  <li key={fact} className="flex items-start gap-4">
                    <span
                      className="mt-3 h-px w-8 shrink-0"
                      style={{ backgroundColor: BCF.gold }}
                    />
                    <span className="text-[24px] leading-relaxed text-white/75">
                      {fact}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
