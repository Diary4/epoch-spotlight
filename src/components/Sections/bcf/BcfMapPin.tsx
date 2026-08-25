import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import { BCF_EASE, BCF_TAP, bcfBloom } from "@/components/Sections/bcf/bcfMotion";

/**
 * One place on a map plane: a dot on its own ground, with its name beside it.
 *
 * A dot, not a name plate. Five cities could each carry a pill with their full
 * name on it; twelve cannot — "Sulaymaniyah" alone is wider than the gap to
 * Halabja, and the labels collided before the map had even finished drawing.
 * The name rides next to the dot at a size that fits, and the card carries the
 * full form.
 *
 * `x`/`y` are percentages of the plane, so the caller's projection — Region or
 * Iraq — is the only thing that decides where a pin lands.
 */

/** The dot's touch target, in px. The button is exactly this: the label hangs
 *  outside it, so the box that carries the coordinate is the dot itself. */
const DOT_SPAN = 36;

/** Clearance between the dot's box and its name. */
const LABEL_GAP = 6;

/**
 * Which way the name hangs off the dot.
 *
 * Below for a pin with room under it, and one of the other three when a
 * neighbour is there — on the Iraq map the north is a quarter of the plate with
 * five cities in it, and every name pointing the same way meant "Kirkuk" landed
 * in "Sulaymaniyah" and the "Diyala" plate sat squarely on Baghdad's dot. A
 * label may overlap empty ground; it may never cover another city's dot.
 */
export type BcfPinLabelSide = "below" | "above" | "left" | "right";

const LABEL_PLACEMENT: Record<BcfPinLabelSide, React.CSSProperties> = {
  below: { left: "50%", top: `calc(100% + ${LABEL_GAP}px)`, transform: "translateX(-50%)" },
  above: { left: "50%", bottom: `calc(100% + ${LABEL_GAP}px)`, transform: "translateX(-50%)" },
  left: { right: `calc(100% + ${LABEL_GAP}px)`, top: "50%", transform: "translateY(-50%)" },
  right: { left: `calc(100% + ${LABEL_GAP}px)`, top: "50%", transform: "translateY(-50%)" },
};

type BcfMapPinProps = {
  x: string;
  y: string;
  label: string;
  selected: boolean;
  /** Staggers the bloom and the halo ping, so pins arrive as a sequence. */
  index: number;
  /** Defaults to `below`; set it where a neighbour is already standing there. */
  labelSide?: BcfPinLabelSide;
  onClick: () => void;
};

export default function BcfMapPin({
  x,
  y,
  label,
  selected,
  index,
  labelSide = "below",
  onClick,
}: BcfMapPinProps) {
  const reduceMotion = useReducedMotion();

  return (
    /* Pin anchoring stays on a plain wrapper — motion owns `transform` on the
       button for the bloom and tap scale. What sits on the coordinate is the
       *dot*, so the button is the dot's box and nothing else: when the name was
       inside that box, its height went into the centring and lifted every dot
       north of its own city. The name is positioned off the dot instead. */
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{
        left: x,
        top: y,
        // A selected pin's plate goes over its neighbours' rather than under.
        zIndex: selected ? 2 : 1,
      }}
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
        className="group relative grid transform-gpu place-items-center"
        style={{ width: DOT_SPAN, height: DOT_SPAN }}
      >
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
            boxShadow: selected ? `0 0 30px ${BCF.gold}aa` : `0 0 14px ${BCF.gold}55`,
          }}
        />
        <span
          className="absolute whitespace-nowrap rounded-md px-2 py-[3px] text-[22px] font-medium transition-all duration-300"
          style={{
            ...LABEL_PLACEMENT[labelSide],
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
