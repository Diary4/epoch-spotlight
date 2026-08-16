import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import {
  BCF_EASE,
  BCF_TAP_FIRM,
  BCF_TAP_TRANSITION,
} from "@/components/Sections/bcf/bcfMotion";

/* -------------------------------------------------------------------------
 * Geometry
 *
 * Sized against the 1080-wide artboard rather than the padded column: the two
 * neighbouring plates are *meant* to run off both edges, which is what tells a
 * visitor there is more film either side of the one they are looking at. The
 * row therefore overflows its container on purpose and the container clips it.
 * ---------------------------------------------------------------------- */

/**
 * Two sizes, because the strip plays two parts. On the Board Chief profile it
 * is the subject and gets the room; on the President's it runs between the
 * record and the awards, where the same height would push the last card off
 * the foot of the artboard.
 */
const SIZES = {
  lg: {
    band: 470,
    centreW: 604,
    centreH: 386,
    sideW: 300,
    sideH: 324,
    railInset: 40,
  },
  sm: {
    band: 340,
    centreW: 590,
    centreH: 300,
    sideW: 250,
    sideH: 248,
    railInset: 26,
  },
} as const;

export type FilmstripSize = keyof typeof SIZES;

const PLATE_GAP = 14;
const HOLE_W = 30;
const HOLE_H = 20;
const HOLE_GAP = 62;
/** How far the middle of the strip rises above its ends. */
const BOW = 26;

type Point = { x: number; y: number };

/** Point at `t` on the quadratic curve p0 → p1 (control) → p2. */
function quadPoint(p0: Point, p1: Point, p2: Point, t: number): Point {
  const mt = 1 - t;
  return {
    x: mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x,
    y: mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y,
  };
}

/**
 * The film the plates are mounted on.
 *
 * Drawn rather than tiled: the strip bows upward through the middle, and a
 * repeating-gradient perforation can only run dead straight. Holes are punched
 * with a mask so the deep-field gradient behind the page shows through them,
 * the way light does through real film.
 */
function FilmBand({ width, size }: { width: number; size: FilmstripSize }) {
  const maskId = React.useId();
  const fillId = React.useId();
  const { band: BAND_H, railInset: RAIL_INSET } = SIZES[size];

  const topY = RAIL_INSET;
  const bottomY = BAND_H - RAIL_INSET;
  const holeCount = Math.max(2, Math.round(width / HOLE_GAP));

  const railHoles = (y: number) => {
    const p0 = { x: 0, y };
    const p1 = { x: width / 2, y: y - BOW * 2 };
    const p2 = { x: width, y };
    return Array.from({ length: holeCount }, (_, i) =>
      quadPoint(p0, p1, p2, i / (holeCount - 1)),
    );
  };

  const edge = (y: number) => `Q${width / 2} ${y - BOW * 2} ${width} ${y}`;
  const bandTop = RAIL_INSET - 30;
  const bandBottom = BAND_H - RAIL_INSET + 30;
  const bandPath =
    `M0 ${bandTop} ${edge(bandTop)} ` +
    `L${width} ${bandBottom} Q${width / 2} ${bandBottom - BOW * 2} 0 ${bandBottom} Z`;

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox={`0 0 ${width} ${BAND_H}`}
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#100c06" stopOpacity="0.92" />
          <stop offset="50%" stopColor="#1b150b" stopOpacity="0.96" />
          <stop offset="100%" stopColor="#0c0904" stopOpacity="0.92" />
        </linearGradient>
        <mask id={maskId}>
          <rect x="0" y="0" width={width} height={BAND_H} fill="white" />
          {[topY, bottomY].map((y) =>
            railHoles(y).map((hole, index) => (
              <rect
                key={`${y}-${index}`}
                x={hole.x - HOLE_W / 2}
                y={hole.y - HOLE_H / 2}
                width={HOLE_W}
                height={HOLE_H}
                rx={5}
                fill="black"
              />
            )),
          )}
        </mask>
      </defs>
      <path d={bandPath} fill={`url(#${fillId})`} mask={`url(#${maskId})`} />
    </svg>
  );
}

function Plate({
  src,
  alt,
  centre,
  size,
}: {
  src: string;
  alt: string;
  centre: boolean;
  size: FilmstripSize;
}) {
  const s = SIZES[size];
  return (
    <span
      className="relative shrink-0 overflow-hidden"
      style={{
        width: centre ? s.centreW : s.sideW,
        height: centre ? s.centreH : s.sideH,
        borderRadius: centre ? 10 : 8,
        border: centre
          ? `3px solid ${BCF.gold}`
          : "1px solid rgba(255,255,255,0.14)",
        boxShadow: centre
          ? `0 26px 62px rgba(0,0,0,0.6), 0 0 44px ${BCF.gold}26`
          : "0 14px 34px rgba(0,0,0,0.45)",
        opacity: centre ? 1 : 0.5,
      }}
    >
      {/* Keyed on the source, not the index: neighbouring plates change source
          on every step, and an index key would hold the old photograph. */}
      <AnimatePresence initial={false}>
        <motion.img
          key={src}
          src={src}
          alt={alt}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: BCF_EASE }}
        />
      </AnimatePresence>
      {centre ? null : (
        <span
          className="pointer-events-none absolute inset-0"
          style={{ backgroundColor: "rgba(4,6,9,0.35)" }}
        />
      )}
    </span>
  );
}

function StripArrow({
  direction,
  rtl,
  onClick,
}: {
  direction: "prev" | "next";
  rtl: boolean;
  onClick: () => void;
}) {
  // "Previous" points back along the reading direction, so the glyph flips with
  // the language rather than always pointing left.
  const pointsLeft = direction === "prev" ? !rtl : rtl;
  const Icon = pointsLeft ? ChevronLeft : ChevronRight;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={direction}
      whileTap={BCF_TAP_FIRM}
      transition={BCF_TAP_TRANSITION}
      className="grid h-[64px] w-[64px] transform-gpu place-items-center rounded-full border bg-black/45 backdrop-blur-md"
      style={{ borderColor: `${BCF.gold}59` }}
    >
      <Icon className="h-8 w-8" style={{ color: BCF.sand }} />
    </motion.button>
  );
}

/** Dwell on each plate before it advances on its own. Long enough to take in
 *  the photograph without the strip feeling restless behind the copy. */
const SLIDE_DWELL_MS = 5600;

type BcfFilmstripProps = {
  images: string[];
  /** Per-plate description. Also the `alt` on the centre plate. */
  alts?: string[];
  rtl: boolean;
  /** Chevrons and dots under the strip. Off where the strip is decoration. */
  controls?: boolean;
  /** Advance on its own. Nobody walks up to a kiosk and taps a chevron first. */
  autoplay?: boolean;
  /** Width the film is drawn across — the artboard, not the padded column. */
  width?: number;
  size?: FilmstripSize;
  className?: string;
  delay?: number;
};

/**
 * Photography as a strip of film: one plate held in the gate with its
 * neighbours running off both edges of the screen.
 *
 * Shared by the Board Chief profile (where it is the subject, with controls)
 * and the President profile (where it sits between the biography and the
 * awards as a band of context, and runs on its own).
 */
export default function BcfFilmstrip({
  images,
  alts,
  rtl,
  controls = false,
  autoplay = true,
  width = 1080,
  size = "lg",
  className = "",
  delay = 0.3,
}: BcfFilmstripProps) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = React.useState(0);
  /** Bumped on every manual pick, purely to restart the dwell below. */
  const [touched, setTouched] = React.useState(0);
  const count = images.length;

  const go = (next: number) => {
    setIndex(((next % count) + count) % count);
    setTouched((n) => n + 1);
  };
  const step = (delta: number) => go(index + delta);

  React.useEffect(() => {
    if (!autoplay || reduceMotion || count < 2) return;
    const id = window.setTimeout(
      () => setIndex((current) => (current + 1) % count),
      SLIDE_DWELL_MS,
    );
    return () => window.clearTimeout(id);
  }, [index, touched, count, autoplay, reduceMotion]);

  const at = (offset: number) => images[((index + offset) % count + count) % count];
  const altAt = (offset: number) =>
    alts?.[((index + offset) % count + count) % count] ?? "";

  return (
    <motion.div
      className={`flex w-full flex-col items-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: BCF_EASE }}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ height: SIZES[size].band }}
      >
        <FilmBand width={width} size={size} />
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ gap: PLATE_GAP }}
        >
          <Plate src={at(-1)} alt="" centre={false} size={size} />
          <Plate src={at(0)} alt={altAt(0)} centre size={size} />
          <Plate src={at(1)} alt="" centre={false} size={size} />
        </div>
      </div>

      {controls ? (
        <div className="mt-5 flex items-center gap-8">
          <StripArrow direction="prev" rtl={rtl} onClick={() => step(-1)} />
          <div className="flex items-center gap-3">
            {images.map((src, dot) => (
              <button
                key={src}
                type="button"
                onClick={() => go(dot)}
                aria-label={`${dot + 1}`}
                aria-current={dot === index}
                className="grid h-[40px] w-[32px] place-items-center"
              >
                {/* The active dot stretches into a bar rather than only
                    brightening — on a 65" panel at walking distance a 6px
                    difference in diameter is not a state change anyone reads. */}
                <span
                  className="block rounded-full transition-all duration-400 ease-smooth-out"
                  style={{
                    width: dot === index ? 30 : 11,
                    height: 11,
                    backgroundColor:
                      dot === index ? BCF.goldBright : "rgba(255,255,255,0.28)",
                  }}
                />
              </button>
            ))}
          </div>
          <StripArrow direction="next" rtl={rtl} onClick={() => step(1)} />
        </div>
      ) : null}
    </motion.div>
  );
}
