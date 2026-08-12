import React from "react";
import { motion, useReducedMotion } from "motion/react";
import BcfShell, { BcfBackButton } from "@/components/Sections/bcf/BcfShell";
import {
  bcfCopy,
  type BcfLang,
  type JourneyChapterId,
} from "@/components/Sections/bcf/bcfContent";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import {
  bcfSunrise,
  bcfJourneyStory,
  bcfJourneyHumanity,
  bcfJourneyMap,
  bcfJourneyImpact,
  bcfJourneyTrust,
  bcfJourneyFuture,
} from "@/components/Sections/bcf/bcfAssets";
import {
  BCF_EASE,
  BCF_TAP,
  BCF_TAP_TRANSITION,
  bcfDrawX,
  bcfRise,
  bcfStagger,
} from "@/components/Sections/bcf/bcfMotion";

type BcfSectionsProps = {
  lang: BcfLang;
  onBack: () => void;
  onSelect: (id: JourneyChapterId) => void;
};

const thumbs: Record<JourneyChapterId, string> = {
  story: bcfJourneyStory,
  humanity: bcfJourneyHumanity,
  map: bcfJourneyMap,
  impact: bcfJourneyImpact,
  trust: bcfJourneyTrust,
  future: bcfJourneyFuture,
};

const CIRCLE = 236;

/**
 * Constellation layout (1080×1920) — two rows of circles with the top-middle
 * node lifted, matching the Explore Our Journey Figma frame.
 * Positions are circle centers.
 */
const LAYOUT: {
  id: JourneyChapterId;
  cx: number;
  cy: number;
}[] = [
  { id: "humanity", cx: 200, cy: 820 },
  { id: "story", cx: 540, cy: 680 },
  { id: "map", cx: 880, cy: 820 },
  { id: "impact", cx: 200, cy: 1240 },
  { id: "trust", cx: 540, cy: 1240 },
  { id: "future", cx: 880, cy: 1240 },
];

type Point = { cx: number; cy: number };

/**
 * Smooth cubic path through three circle centers (left → middle → right).
 * Top row arches through the elevated middle; bottom row keeps a soft ribbon
 * undulation so flat rows still match the Figma wave, without looking hand-drawn.
 */
function rowCurve(a: Point, b: Point, c: Point, dy = 0): string {
  const lift = (p: Point): Point => ({ cx: p.cx, cy: p.cy + dy });
  const A = lift(a);
  const B = lift(b);
  const C = lift(c);
  const t = 0.42;
  const dx1 = B.cx - A.cx;
  const dx2 = C.cx - B.cx;
  const flat = Math.abs(A.cy - B.cy) < 1 && Math.abs(B.cy - C.cy) < 1;
  // Gentle sine-like ribbon when the three centers are level.
  const wave = flat ? 22 : 0;

  return [
    `M ${A.cx} ${A.cy}`,
    `C ${A.cx + dx1 * t} ${A.cy - wave} ${B.cx - dx1 * t} ${B.cy + wave * 0.35} ${B.cx} ${B.cy}`,
    `C ${B.cx + dx2 * t} ${B.cy + wave * 0.35} ${C.cx - dx2 * t} ${C.cy - wave} ${C.cx} ${C.cy}`,
  ].join(" ");
}

/** Three perfectly parallel strands per row — matching the Figma ribbon look. */
const ROW_STRAND_OFFSETS = [-14, 0, 14] as const;

/** Nodes bloom out of the strands, so the lines draw first and the discs follow. */
const NODE_VARIANTS = {
  initial: { opacity: 0, scale: 0.72 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: BCF_EASE },
  },
};

export default function BcfSections({ lang, onBack, onSelect }: BcfSectionsProps) {
  const c = bcfCopy[lang];
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = React.useState<JourneyChapterId>("story");

  const topRow = React.useMemo(
    () => [LAYOUT[0], LAYOUT[1], LAYOUT[2]] as [Point, Point, Point],
    [],
  );
  const bottomRow = React.useMemo(
    () => [LAYOUT[3], LAYOUT[4], LAYOUT[5]] as [Point, Point, Point],
    [],
  );

  const rowPaths = React.useMemo(
    () => [
      ...ROW_STRAND_OFFSETS.map((dy) => rowCurve(topRow[0], topRow[1], topRow[2], dy)),
      ...ROW_STRAND_OFFSETS.map((dy) =>
        rowCurve(bottomRow[0], bottomRow[1], bottomRow[2], dy),
      ),
    ],
    [topRow, bottomRow],
  );

  return (
    <BcfShell
      showLogo={false}
      backgroundImage={bcfSunrise}
      overlayClassName="bg-black/38"
    >
      <div className="relative min-h-[1920px] w-full overflow-hidden">
        {/* A low, warm glow behind the constellation only — the same amber the
            rest of the experience carries, kept faint enough that the sunrise
            underneath stays the brightest thing on the screen. */}
        <div
          className="pointer-events-none absolute inset-x-0 top-[420px] h-[1100px]"
          style={{
            background:
              "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(251,193,88,0.16), transparent 70%)",
          }}
        />

        <BcfBackButton onClick={onBack} label={c.back} />

        <motion.div
          className="absolute left-[80px] top-[150px] z-20 max-w-[860px]"
          variants={bcfStagger(0.1, 0.16)}
          initial="initial"
          animate="animate"
        >
          <motion.h1
            variants={bcfRise}
            className="text-[80px] font-bold leading-none tracking-[0.01em]"
          >
            <span className="text-[#fbf4e4]">{c.journeyTitleLead}</span>{" "}
            <span style={{ color: BCF.gold }}>{c.journeyTitleGold}</span>
          </motion.h1>
          <motion.div
            variants={bcfDrawX}
            className="mt-8 flex w-full max-w-[520px] origin-left items-center gap-3"
          >
            <span className="h-px flex-1" style={{ backgroundColor: `${BCF.gold}aa` }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: BCF.gold }} />
          </motion.div>
          <motion.p variants={bcfRise} className="mt-6 text-[32px] text-[#d2ba91]">
            {c.journeySubtitle}
          </motion.p>
        </motion.div>

        <motion.div
          className="absolute inset-0 z-20"
          variants={bcfStagger(0.09, 0.5)}
          initial="initial"
          animate="animate"
        >
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 1080 1920"
            fill="none"
            aria-hidden="true"
          >
            {rowPaths.map((d, index) => {
              const isCenter = index % 3 === 1;
              return (
                <motion.path
                  key={`strand-${index}`}
                  d={d}
                  stroke={isCenter ? "rgba(251,193,88,0.42)" : "rgba(251,193,88,0.18)"}
                  strokeWidth={isCenter ? 1.75 : 1.25}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  // The strands draw themselves left to right before the nodes
                  // land on them — the constellation assembles instead of fading.
                  initial={reduceMotion ? { opacity: 0 } : { pathLength: 0, opacity: 0 }}
                  animate={
                    reduceMotion
                      ? { opacity: 1, transition: { duration: 0.3 } }
                      : {
                          pathLength: 1,
                          opacity: 1,
                          transition: {
                            duration: 1.15,
                            ease: BCF_EASE,
                            delay: 0.18 + (index % 3) * 0.06 + (index > 2 ? 0.14 : 0),
                          },
                        }
                  }
                />
              );
            })}
          </svg>

          {LAYOUT.map((item, index) => {
            const chapter = c.journeyChapters.find((ch) => ch.id === item.id);
            if (!chapter) return null;
            const isActive = activeId === item.id;
            const size = isActive ? CIRCLE + 16 : CIRCLE;

            return (
              /* The centring translate lives on a plain wrapper: motion writes
                 its own `transform` for the scale/tap, which would otherwise
                 overwrite the utility classes and knock every node half a card
                 down and to the side. */
              <div
                key={item.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: item.cx,
                  top: item.cy,
                  width: CIRCLE + 48,
                  height: CIRCLE + 48,
                }}
              >
              <motion.button
                type="button"
                variants={NODE_VARIANTS}
                onClick={() => {
                  setActiveId(item.id);
                  onSelect(item.id);
                }}
                onPointerEnter={() => setActiveId(item.id)}
                onPointerDown={() => setActiveId(item.id)}
                whileTap={BCF_TAP}
                transition={BCF_TAP_TRANSITION}
                className="relative h-full w-full"
              >
                {/* Ambient halo — always on at a whisper, so the constellation
                    reads as lit rather than pasted on top of the photograph;
                    it blooms with the node the visitor has landed on.

                    The gradient does the softening on its own; the `blur-2xl`
                    that used to sit on top of it was six 380px blur surfaces on
                    one screen, each of which Chrome renders by drawing the
                    element to a texture and running a separable convolution
                    over it — at 2× on the 4K panel, before anything moves. The
                    wider, softer falloff below is the same picture for free. */}
                <span
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-500"
                  style={{
                    width: size + 132,
                    height: size + 132,
                    background: `radial-gradient(circle, ${BCF.gold}4d 0%, ${BCF.gold}2b 42%, transparent 72%)`,
                    opacity: isActive ? 0.9 : 0.32,
                  }}
                />

                {/* Slow orbit ring — only the active node earns it, so it reads
                    as "you are here" rather than decoration repeated six times.
                    CSS keyframes, so the rotation lives on the compositor and
                    the main thread stays free for the next tap. */}
                {isActive && !reduceMotion ? (
                  <span
                    className="bcf-orbit pointer-events-none absolute left-1/2 top-1/2 rounded-full"
                    style={{
                      width: size + 34,
                      height: size + 34,
                      border: `1.5px dashed ${BCF.gold}99`,
                    }}
                  />
                ) : null}

                <span
                  className="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-2 transition-[width,height,box-shadow,border-color] duration-500 ease-smooth-out"
                  style={{
                    width: size,
                    height: size,
                    borderColor: isActive ? BCF.gold : "rgba(251,193,88,0.55)",
                    boxShadow: isActive
                      ? `0 0 28px ${BCF.gold}66, 0 0 0 6px rgba(251,193,88,0.12)`
                      : `0 0 0 0 ${BCF.gold}00`,
                  }}
                >
                  <img
                    src={thumbs[item.id]}
                    alt=""
                    decoding="async"
                    width={CIRCLE}
                    height={CIRCLE}
                    className="h-full w-full transform-gpu object-cover transition-transform duration-600 ease-smooth-out motion-reduce:transition-none"
                    style={{ transform: isActive ? "scale(1.08)" : "scale(1)" }}
                  />
                  <span
                    className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 50%, rgba(4,7,10,0.05), rgba(4,7,10,0.55))",
                      opacity: isActive ? 0.35 : 0.8,
                    }}
                  />
                </span>
                <span
                  className="absolute left-1/2 top-full mt-5 w-[280px] -translate-x-1/2 text-center text-[30px] font-medium leading-tight transition-colors duration-500"
                  style={{ color: isActive ? BCF.sand : "#fdeed4" }}
                >
                  {chapter.title}
                </span>
              </motion.button>
              </div>
            );
          })}
        </motion.div>
      </div>
    </BcfShell>
  );
}
