import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import { BCF_EASE, BCF_TAP, bcfBloom } from "@/components/Sections/bcf/bcfMotion";

/**
 * One place on a map plane: a dot on its own ground, with its name beneath.
 *
 * A dot, not a name plate. Five cities could each carry a pill with their full
 * name on it; twelve cannot — "Sulaymaniyah" alone is wider than the gap to
 * Halabja, and the labels collided before the map had even finished drawing.
 * The name rides under the dot at a size that fits, and the card carries the
 * full form.
 *
 * `x`/`y` are percentages of the plane, so the caller's projection — Region or
 * Iraq — is the only thing that decides where a pin lands.
 */
type BcfMapPinProps = {
  x: string;
  y: string;
  label: string;
  selected: boolean;
  /** Staggers the bloom and the halo ping, so pins arrive as a sequence. */
  index: number;
  onClick: () => void;
};

export default function BcfMapPin({
  x,
  y,
  label,
  selected,
  index,
  onClick,
}: BcfMapPinProps) {
  const reduceMotion = useReducedMotion();

  return (
    /* Pin anchoring stays on a plain wrapper — motion owns `transform` on the
       button for the bloom and tap scale. The wrapper centres on the coordinate
       rather than sitting above it: the dot is the thing that has to be exactly
       on its ground, and a label hanging beneath is free to be approximate. */
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: x, top: y }}
    >
      <motion.button
        type="button"
        variants={bcfBloom}
        initial="initial"
        animate="animate"
        exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.22 } }}
        transition={{ duration: 0.5, delay: 0.9 + index * 0.05, ease: BCF_EASE }}
        onClick={onClick}
        whileTap={BCF_TAP}
        className="group flex transform-gpu flex-col items-center"
      >
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
              width: selected ? 26 : 18,
              height: selected ? 26 : 18,
              borderColor: BCF.goldBright,
              backgroundColor: selected ? BCF.goldBright : "rgba(10,10,10,0.85)",
              boxShadow: selected
                ? `0 0 30px ${BCF.gold}aa`
                : `0 0 14px ${BCF.gold}55`,
            }}
          />
        </span>
        <span
          className="mt-1 whitespace-nowrap rounded-md px-2 py-[3px] text-[22px] font-medium transition-all duration-300"
          style={{
            color: selected ? BCF.bg : BCF.creamSoft,
            backgroundColor: selected ? BCF.goldBright : "rgba(4,6,9,0.72)",
            textShadow: selected ? "none" : "0 2px 8px rgba(0,0,0,0.9)",
          }}
        >
          {label}
        </span>
      </motion.button>
    </div>
  );
}
