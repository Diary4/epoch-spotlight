import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  BCF_IRAQ_PLACES,
  BCF_IRAQ_REGION_PINS,
  BCF_LOCATIONS,
  bcfCopy,
  type BcfLang,
  type IraqPlaceId,
  type LocationId,
} from "@/components/Sections/bcf/bcfContent";
import {
  BCF_IRAQ_SHAPES,
  BCF_IRAQ_VIEWBOX,
  bcfIraqPin,
} from "@/components/Sections/bcf/bcfIraqGeometry";
import BcfMapLocationCard from "@/components/Sections/bcf/BcfMapLocationCard";
import BcfMapPin, {
  type BcfPinLabelSide,
} from "@/components/Sections/bcf/BcfMapPin";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import { BCF_EASE, bcfRise, bcfStagger } from "@/components/Sections/bcf/bcfMotion";

/**
 * The country half of Where We Work.
 *
 * BCF is licensed in the Republic of Iraq as well as in the Region, and the
 * register documents food work in Baghdad, Diyala, Dhi Qar and Anbar and a
 * medical convoy to Samawah. All of that used to be one chip labelled "Iraq"
 * with no map behind it — a governorate list a visitor had to take on trust.
 *
 * The eighteen outlines are the same geoBoundaries ADM1 data, in the same
 * projection, as the Region map's three: see bcfIraqGeometry.ts. That is what
 * lets the Region be drawn *inside* the country here, in the gold it carries on
 * its own map, with its cities opening the very same cards.
 */

/** Iraq's proportions in the shared projection. */
const IRAQ_RATIO = BCF_IRAQ_VIEWBOX.width / BCF_IRAQ_VIEWBOX.height;

/**
 * The largest box of Iraq's own proportions that fits the plane it is handed.
 *
 * This has to be measured. The pins are HTML placed in percentages of the box,
 * while the outlines are an SVG that letterboxes itself inside it, and the two
 * only agree while the box carries the viewBox's exact ratio. CSS `aspect-ratio`
 * cannot honour a ratio *and* a height cap at once: on a portrait panel Iraq is
 * taller than the plane is wide, so the box kept the full height, the drawing
 * shrank to the width, and every pin floated off its governorate by as much as
 * half the letterbox bar — Duhok sat north of Duhok, Dhi Qar south of Dhi Qar.
 * Sizing the box from the plane is what puts a city back on its own ground.
 */
function useIraqPlate(ref: React.RefObject<HTMLDivElement | null>) {
  const [plate, setPlate] = React.useState<{ width: number; height: number } | null>(
    null,
  );

  React.useLayoutEffect(() => {
    const plane = ref.current;
    if (!plane) return;

    const measure = () => {
      const { width, height } = plane.getBoundingClientRect();
      if (!width || !height) return;
      const fitted = Math.min(width, height * IRAQ_RATIO);
      setPlate((current) =>
        current && Math.abs(current.width - fitted) < 0.5
          ? current
          : { width: fitted, height: fitted / IRAQ_RATIO },
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(plane);
    return () => observer.disconnect();
  }, [ref]);

  return plate;
}

type BcfIraqMapProps = {
  lang: BcfLang;
  /**
   * Whether this is the scope on screen. The map is no longer unmounted when
   * the visitor leaves it — that remount was the stutter — so leaving has to be
   * something it is told, rather than something that happens to it.
   */
  active: boolean;
  /** Region-side selection, held by the page so returning from a register can restore it. */
  selectedLocation: LocationId | null;
  onSelectLocation: (id: LocationId | null) => void;
  onExploreProjects: (id: LocationId) => void;
};

/**
 * Which way each name hangs off its dot.
 *
 * Iraq's north is a quarter of the plate with five cities packed into it, and a
 * country map cannot move a city to make room for its own name. So the names
 * move instead, each pointing at the nearest empty ground: Mosul and Kirkuk
 * west, Duhok and Erbil east, Diyala east of Baghdad — which is what frees
 * Baghdad's own dot, the one the Diyala plate used to stand on.
 *
 * The sides are not chosen by eye. They come from checking every label
 * rectangle against every other label and every other dot at the projected
 * positions, across the range of plate widths this screen is drawn at, and this
 * is the arrangement that collides nowhere at panel size. Change a coordinate,
 * add a pin, and the check has to be run again — the rule it enforces is that a
 * label may cross empty ground but never another city's dot.
 */
const LABEL_SIDES: Record<string, BcfPinLabelSide> = {
  duhok: "right",
  nineveh: "left",
  erbil: "right",
  sulaymaniyah: "below",
  kirkuk: "left",
  anbar: "left",
  baghdad: "below",
  diyala: "right",
  muthanna: "left",
  dhiqar: "below",
  basra: "right",
};

/** Region pins in the order they are declared, with their real coordinates. */
const REGION_PINS = BCF_IRAQ_REGION_PINS.map((id) => {
  const location = BCF_LOCATIONS.find((loc) => loc.id === id);
  if (!location) throw new Error(`No coordinates for region pin: ${id}`);
  return location;
});

export default function BcfIraqMap({
  lang,
  active,
  selectedLocation,
  onSelectLocation,
  onExploreProjects,
}: BcfIraqMapProps) {
  const c = bcfCopy[lang];
  const reduceMotion = useReducedMotion();
  const [place, setPlace] = React.useState<IraqPlaceId | null>(null);
  const [hintVisible, setHintVisible] = React.useState(true);
  const planeRef = React.useRef<HTMLDivElement>(null);
  const plate = useIraqPlate(planeRef);

  /* The governorate cards are this map's own state, and the page cannot clear
     them the way it clears the Region selection it holds. Left alone they would
     outlive the switch: tap Samawah, go to the world, come back, and Samawah's
     card is still standing over the country. */
  React.useEffect(() => {
    if (!active) setPlace(null);
  }, [active]);

  const openPlace = (id: IraqPlaceId) => {
    setHintVisible(false);
    onSelectLocation(null);
    setPlace(id);
  };

  const openLocation = (id: LocationId) => {
    setHintVisible(false);
    setPlace(null);
    onSelectLocation(id);
  };

  const closeCard = () => {
    setPlace(null);
    onSelectLocation(null);
  };

  const selectedPlace = place ? c.iraqPlaces[place] : null;
  const selectedRegion = selectedLocation ? c.locations[selectedLocation] : null;
  const cardOpen = Boolean(selectedPlace || selectedRegion);

  return (
    <div className="absolute inset-0 flex flex-col">
      {/* Control band, matching the other two halves: instruction, then the
          legend, then a rule, and the map gets everything below. */}
      <div className="px-8 pt-7">
        {/* Faded rather than unmounted once a pin has been tapped — the row
            below it must not jump when the advice retires. */}
        <p
          className="text-center text-[26px] leading-relaxed text-white/70 transition-opacity duration-500"
          style={{ opacity: hintVisible && !cardOpen ? 1 : 0 }}
        >
          {c.tapToExplore}
        </p>

        {/* Two keys, because the country map draws two things: the Region in the
            gold it carries on its own map, and the federal governorates around
            it. Without the legend the gold is decoration. */}
        <motion.div
          className="mt-5 flex flex-wrap items-center justify-center gap-3"
          variants={bcfStagger(0.06, 0.4)}
          initial="initial"
          animate="animate"
        >
          {(
            [
              { id: "region", label: c.iraqLegend.region, region: true },
              { id: "federal", label: c.iraqLegend.federal, region: false },
            ] as const
          ).map((key) => (
            <motion.span
              key={key.id}
              variants={bcfRise}
              className="flex items-center gap-3 rounded-full border px-5 py-2.5"
              style={{
                borderColor: key.region ? `${BCF.gold}88` : "rgba(255,255,255,0.14)",
                backgroundColor: key.region ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.28)",
              }}
            >
              <span
                className="h-5 w-5 shrink-0 rounded-[5px] border"
                style={{
                  borderColor: key.region ? BCF.goldBright : "rgba(255,255,255,0.35)",
                  backgroundColor: key.region
                    ? `${BCF.gold}3a`
                    : "rgba(255,255,255,0.06)",
                  boxShadow: key.region ? `0 0 16px ${BCF.gold}55` : "none",
                }}
              />
              <span
                className="text-[24px]"
                style={{
                  color: key.region ? BCF.creamSoft : "rgba(255,255,255,0.55)",
                }}
              >
                {key.label}
              </span>
            </motion.span>
          ))}
        </motion.div>

        <div
          className="mt-6 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(251,193,88,0.3), transparent)",
          }}
        />
      </div>

      {/* Map plane. The inner box is measured to Iraq's own proportions and
          centred, so the outlines and the pins share one coordinate space — the
          pin percentages are percentages of *this* box, which is the only
          reason a city can be trusted to sit on its own governorate. */}
      <div ref={planeRef} className="relative min-h-0 flex-1">
        <div
          className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: plate?.width ?? 0,
            height: plate?.height ?? 0,
            visibility: plate ? "visible" : "hidden",
          }}
        >
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox={`${BCF_IRAQ_VIEWBOX.minX} ${BCF_IRAQ_VIEWBOX.minY} ${BCF_IRAQ_VIEWBOX.width} ${BCF_IRAQ_VIEWBOX.height}`}
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="bcf-iraq-region" x1="0" y1="0" x2="0.4" y2="1">
                <stop offset="0%" stopColor={BCF.gold} stopOpacity="0.24" />
                <stop offset="100%" stopColor={BCF.goldDeep} stopOpacity="0.11" />
              </linearGradient>
            </defs>

            {/* Federal governorates first and quiet: they are the country the
                Region sits in, and internal borders at this scale only need to
                be readable, not lit. */}
            {BCF_IRAQ_SHAPES.filter((shape) => !shape.region).map((shape) => (
              <path
                key={shape.id}
                d={shape.d}
                fill="rgba(255,255,255,0.028)"
                stroke="rgba(255,255,255,0.16)"
                strokeWidth={3}
                strokeLinejoin="round"
              />
            ))}

            {BCF_IRAQ_SHAPES.filter((shape) => shape.region).map((shape, index) => (
              <g key={shape.id}>
                {/* Wide, soft pass under the hairline reads as a glow on a 65"
                    panel, where a thin stroke alone goes mean. */}
                <path
                  d={shape.d}
                  fill="url(#bcf-iraq-region)"
                  stroke={`${BCF.gold}26`}
                  strokeWidth={16}
                  strokeLinejoin="round"
                />
                <motion.path
                  d={shape.d}
                  stroke={BCF.goldBright}
                  strokeWidth={4}
                  strokeLinejoin="round"
                  // The Region draws itself before the pins bloom, so the
                  // country assembles rather than simply appearing.
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
            {REGION_PINS.map((loc, index) => {
              const pin = bcfIraqPin(...loc.coordinates);
              return (
                <BcfMapPin
                  key={loc.id}
                  x={pin.x}
                  y={pin.y}
                  label={c.locations[loc.id].short}
                  selected={selectedLocation === loc.id}
                  index={index}
                  labelSide={LABEL_SIDES[loc.id]}
                  onClick={() => openLocation(loc.id)}
                />
              );
            })}
            {BCF_IRAQ_PLACES.map((iraqPlace, index) => {
              const pin = bcfIraqPin(...iraqPlace.coordinates);
              return (
                <BcfMapPin
                  key={iraqPlace.id}
                  x={pin.x}
                  y={pin.y}
                  label={c.iraqPlaces[iraqPlace.id].short}
                  selected={place === iraqPlace.id}
                  index={REGION_PINS.length + index}
                  labelSide={LABEL_SIDES[iraqPlace.id]}
                  onClick={() => openPlace(iraqPlace.id)}
                />
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {cardOpen ? (
          <motion.div
            key={place ?? selectedLocation}
            className="absolute inset-0 z-30 flex items-center justify-center px-10"
            initial={{ opacity: 0, y: 56 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40, transition: { duration: 0.26 } }}
            transition={{ duration: 0.55, ease: BCF_EASE }}
          >
            {selectedPlace ? (
              <BcfMapLocationCard
                lang={lang}
                title={selectedPlace.name}
                description={selectedPlace.note}
                register="iraq"
                preview={null}
                onClose={closeCard}
                onExplore={() => onExploreProjects("iraq")}
              />
            ) : selectedRegion && selectedLocation ? (
              <BcfMapLocationCard
                lang={lang}
                title={selectedRegion.name}
                description={selectedRegion.description}
                register={selectedLocation}
                preview={selectedLocation}
                onClose={closeCard}
                onExplore={() => onExploreProjects(selectedLocation)}
              />
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
