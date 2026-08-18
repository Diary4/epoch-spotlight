import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import BcfShell, { BcfBackButton } from "@/components/Sections/bcf/BcfShell";
import {
  bcfCopy,
  type BcfLang,
  type FutureTopicId,
} from "@/components/Sections/bcf/bcfContent";
import { BCF, BCF_GLASS_CARD } from "@/components/Sections/bcf/bcfTheme";
import {
  BCF_EASE,
  BCF_TAP,
  BCF_TAP_TRANSITION,
  bcfBloom,
  bcfRise,
  bcfStagger,
} from "@/components/Sections/bcf/bcfMotion";
import { bcfFutureDetailBg } from "@/components/Sections/bcf/bcfAssets";
import educationImg from "@/assets/images/bcf/selected/impact-schools.webp";
import environmentImg from "@/assets/images/bcf/from-source/future-environment.webp";
import crisesImg from "@/assets/images/bcf/selected/humanity-relief.webp";
import rehabImg from "@/assets/images/bcf/from-source/future-rehab.webp";
import rightsImg from "@/assets/images/bcf/from-source/future-rights.webp";

const topicImages: Record<FutureTopicId, string> = {
  education: educationImg,
  environment: environmentImg,
  crises: crisesImg,
  rehabilitation: rehabImg,
  rights: rightsImg,
};

/**
 * Hotspot positions inside the interactive map stage (1080×~1100).
 * Tuned to the Figma “Future We Build” landscape layout.
 */
const HOTSPOTS: { id: FutureTopicId; left: number; top: number; labelSide: "left" | "right" | "bottom" }[] = [
  { id: "education", left: 760, top: 180, labelSide: "right" },
  { id: "environment", left: 250, top: 340, labelSide: "left" },
  { id: "crises", left: 700, top: 420, labelSide: "right" },
  { id: "rehabilitation", left: 210, top: 620, labelSide: "left" },
  { id: "rights", left: 480, top: 720, labelSide: "bottom" },
];

type BcfFutureDetailProps = {
  lang: BcfLang;
  onBack: () => void;
};

/**
 * The modal is both an animating element and the stagger parent for its own
 * title, bullets and photo, so it has to drive its children by variant label —
 * object-valued `animate` would never propagate.
 */
const MODAL_CARD = {
  initial: { opacity: 0, scale: 0.94, y: 30 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: BCF_EASE,
      staggerChildren: 0.07,
      delayChildren: 0.14,
    },
  },
  exit: { opacity: 0, scale: 0.96, y: 18, transition: { duration: 0.22 } },
};

export default function BcfFutureDetail({ lang, onBack }: BcfFutureDetailProps) {
  const c = bcfCopy[lang];
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = React.useState<FutureTopicId | null>(null);
  const active = c.futureTopics.find((t) => t.id === activeId) ?? null;

  return (
    <BcfShell
      showLogo={false}
      backgroundImage={bcfFutureDetailBg}
      overlayClassName="bg-black/60"
    >
      <div className="relative flex min-h-[1920px] flex-col px-10 pb-16 pt-24">
        <BcfBackButton
          onClick={() => (active ? setActiveId(null) : onBack())}
          label={c.back}
        />

        {/* Title card */}
        <motion.div
          className={`${BCF_GLASS_CARD} relative z-20 mx-auto w-full max-w-[920px] px-12 py-10 text-center`}
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0.14, ease: BCF_EASE }}
          style={{ boxShadow: "0 26px 70px rgba(0,0,0,0.5)" }}
        >
          <h1 className="text-[64px] font-bold leading-tight">
            <span className="text-[#fbf4e4]">{c.futureHeadingWhite} </span>
            <span style={{ color: BCF.gold }}>{c.futureHeadingGold}</span>
            {c.futureHeadingRest ? (
              <span className="text-[#fbf4e4]"> {c.futureHeadingRest}</span>
            ) : null}
          </h1>
          <p className="mx-auto mt-6 max-w-[780px] text-[28px] leading-relaxed text-white/85">
            {c.futureSubtitle}
          </p>
        </motion.div>

        {/* Hotspot map stage */}
        <motion.div
          className="relative z-10 mx-auto mt-10 h-[1180px] w-full max-w-[1000px]"
          variants={bcfStagger(0.1, 0.34)}
          initial="initial"
          animate="animate"
        >
          {/* Constellation threads between the hotspots, so the five pins read as
              one landscape instead of five unrelated dots. */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 1000 1180"
            fill="none"
            aria-hidden="true"
          >
            {HOTSPOTS.slice(0, -1).map((pin, index) => {
              const next = HOTSPOTS[index + 1];
              return (
                <motion.line
                  key={`thread-${pin.id}`}
                  x1={pin.left}
                  y1={pin.top}
                  x2={next.left}
                  y2={next.top}
                  stroke="rgba(251,193,88,0.22)"
                  strokeWidth={1.25}
                  strokeDasharray="6 10"
                  initial={reduceMotion ? { opacity: 0 } : { pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: 1,
                    opacity: 1,
                    transition: {
                      duration: 0.9,
                      delay: 0.4 + index * 0.1,
                      ease: BCF_EASE,
                    },
                  }}
                />
              );
            })}
          </svg>

          {HOTSPOTS.map((pin, index) => {
            const topic = c.futureTopics.find((t) => t.id === pin.id);
            if (!topic) return null;
            const isActive = activeId === pin.id;

            return (
              /* Hotspot anchoring on a plain wrapper — motion owns `transform`
                 on the button, and would otherwise drop the translate. */
              <div
                key={pin.id}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                style={{ left: pin.left, top: pin.top }}
              >
              <motion.button
                type="button"
                variants={bcfBloom}
                onClick={() => setActiveId(pin.id)}
                whileTap={BCF_TAP}
                transition={BCF_TAP_TRANSITION}
                className="flex transform-gpu flex-col items-center"
                aria-label={topic.title}
              >
                <span className="relative grid h-[56px] w-[56px] place-items-center">
                  {!reduceMotion ? (
                    <span
                      aria-hidden="true"
                      className="bcf-ping absolute inset-0 rounded-full"
                      style={
                        {
                          backgroundColor: BCF.gold,
                          "--ping-scale": "2.1",
                          "--ping-opacity": "0.42",
                          "--ping-delay": `${index * 0.32}s`,
                        } as React.CSSProperties
                      }
                    />
                  ) : null}
                  <span
                    className="absolute inset-[-6px] rounded-full border-2 border-white/80 transition-shadow duration-500"
                    style={{
                      boxShadow: isActive
                        ? `0 0 28px ${BCF.gold}`
                        : `0 0 16px ${BCF.gold}99`,
                    }}
                  />
                  <span
                    className="relative h-7 w-7 rounded-full"
                    style={{
                      backgroundColor: BCF.goldBright,
                      boxShadow: `0 0 18px ${BCF.gold}`,
                    }}
                  />
                </span>

                <span
                  className={`mt-4 max-w-[280px] text-[28px] font-medium leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] ${
                    pin.labelSide === "left"
                      ? "self-end text-right"
                      : pin.labelSide === "right"
                        ? "self-start text-left"
                        : "text-center"
                  }`}
                >
                  {topic.title}
                </span>
              </motion.button>
              </div>
            );
          })}
        </motion.div>

        {/* Detail modal */}
        <AnimatePresence>
          {active ? (
            <motion.div
              className="absolute inset-0 z-30 flex items-center justify-center px-10 backdrop-blur-[2px]"
              initial={{ opacity: 0, backgroundColor: "rgba(0,0,0,0)" }}
              animate={{ opacity: 1, backgroundColor: "rgba(0,0,0,0.55)" }}
              exit={{ opacity: 0, backgroundColor: "rgba(0,0,0,0)" }}
              transition={{ duration: 0.3 }}
              onClick={() => setActiveId(null)}
            >
              <motion.div
                className={`${BCF_GLASS_CARD} relative w-full max-w-[860px] overflow-hidden p-12`}
                role="dialog"
                aria-modal="true"
                aria-label={active.title}
                onClick={(event) => event.stopPropagation()}
                variants={MODAL_CARD}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{ boxShadow: "0 40px 110px rgba(0,0,0,0.62)" }}
              >
                <motion.button
                  type="button"
                  onClick={() => setActiveId(null)}
                  whileTap={BCF_TAP}
                  transition={BCF_TAP_TRANSITION}
                  className="absolute end-8 top-8 grid h-14 w-14 transform-gpu place-items-center rounded-full border border-white/30 bg-black/40"
                  aria-label={c.close}
                >
                  <X className="h-7 w-7 text-white" />
                </motion.button>

                <motion.h2
                  variants={bcfRise}
                  className="pe-16 text-[64px] font-bold leading-none"
                  style={{ color: BCF.gold }}
                >
                  {active.title}
                </motion.h2>

                <ul className="mt-12 flex flex-col gap-7">
                  {active.bullets.map((bullet) => (
                    <motion.li
                      key={bullet}
                      variants={bcfRise}
                      className="flex items-start gap-5 text-[34px] leading-snug text-[#fdeed4]"
                    >
                      <span
                        className="mt-3 h-3.5 w-3.5 shrink-0 rounded-full"
                        style={{ backgroundColor: BCF.goldBright }}
                      />
                      <span>{bullet}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  variants={bcfRise}
                  className="mt-12 overflow-hidden rounded-[28px] border border-white/15"
                >
                  <img
                    src={topicImages[active.id]}
                    alt=""
                    className="h-[360px] w-full object-cover"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </BcfShell>
  );
}
