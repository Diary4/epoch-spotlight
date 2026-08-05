import React from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type TargetAndTransition,
} from "motion/react";
import { ArrowRight } from "lucide-react";

import { bcfCopy, type BcfLang } from "@/components/Sections/bcf/bcfContent";
import {
  BCF,
  BCF_GRAIN_STYLE,
  BCF_VIGNETTE_STYLE,
} from "@/components/Sections/bcf/bcfTheme";
import {
  BCF_DRIFT_TRANSITION,
  BCF_EASE,
  BCF_TAP,
  BCF_TAP_TRANSITION,
  bcfScene,
  bcfSceneReduced,
} from "@/components/Sections/bcf/bcfMotion";
import {
  bcfAttractPoster,
  bcfLogo,
  bcfSunrise,
} from "@/components/Sections/bcf/bcfAssets";

/**
 * Opening attract screen for the BCF kiosk.
 *
 * There is no film here any more. The previous version was a 17-second GSAP
 * reel gated behind a Play button: the visitor's first touch bought them a
 * video they then had to sit through or Skip, and the screen stood dead still
 * until somebody pressed play — the opposite of inviting on a kiosk.
 *
 * This is a *living plate* instead. Two commissioned portrait photographs
 * cross-fade through each other on a slow cycle, each carrying its own
 * ken-burns push, with embers drifting up the frame and the three words of the
 * foundation — humanity, dignity, hope — turning over in all three languages.
 * Nothing has to finish before the visitor is allowed in: one touch anywhere
 * enters, at any moment.
 */

type BcfAttractProps = {
  onEnter: () => void;
};

/** Trilingual order matches the language menu: Kurdish, English, Arabic. */
const LANGS: BcfLang[] = ["ku", "en", "ar"];

const WORD_KEYS = ["humanity", "dignity", "hope"] as const;

/** How long each word holds, and how long each photograph holds. */
const WORD_HOLD_MS = 3600;
const PLATE_HOLD_MS = 10_800;

const PLATES = [bcfAttractPoster, bcfSunrise];

/**
 * Ken-burns per plate. Module-level so the keyframe arrays keep their identity
 * across renders — rebuilt inline, they would restart the push every time the
 * word above them turned over, and the backdrop would twitch on a 3.6s beat.
 * The two plates push opposite ways, so the cross-fade has parallax in it.
 */
const PLATE_DRIFT: TargetAndTransition[] = [
  { scale: [1.05, 1.14], x: [0, -18] },
  { scale: [1.14, 1.05], x: [0, 16] },
];

const PLATE_ORIGINS = ["62% 38%", "38% 44%"];

/**
 * Embers. Fixed coordinates rather than `Math.random()` so the field is the
 * same on every mount — a kiosk restarts this screen dozens of times a day and
 * a reshuffling particle field reads as a glitch.
 */
const EMBERS = [
  { x: 8, delay: 0, duration: 15, size: 5, drift: 26 },
  { x: 17, delay: 5.5, duration: 19, size: 3, drift: -18 },
  { x: 26, delay: 2.2, duration: 13, size: 4, drift: 34 },
  { x: 34, delay: 9, duration: 21, size: 6, drift: -28 },
  { x: 43, delay: 1.1, duration: 16, size: 3, drift: 20 },
  { x: 52, delay: 7.4, duration: 18, size: 5, drift: -34 },
  { x: 61, delay: 3.8, duration: 14, size: 4, drift: 30 },
  { x: 69, delay: 11, duration: 20, size: 3, drift: -22 },
  { x: 77, delay: 6.2, duration: 17, size: 6, drift: 24 },
  { x: 85, delay: 0.9, duration: 22, size: 4, drift: -30 },
  { x: 93, delay: 8.6, duration: 15, size: 3, drift: 18 },
];

function BcfMonogram() {
  return (
    <img
      src={bcfLogo}
      alt="Barzani Charity Foundation"
      decoding="async"
      fetchPriority="high"
      className="h-[300px] w-auto"
      // The seal carries its own ring, so the gold that used to be a border
      // becomes the glow behind it — the halo stays, the placeholder goes.
      style={{
        filter: `drop-shadow(0 0 60px ${BCF.gold}44) drop-shadow(0 12px 30px rgba(0,0,0,0.5))`,
      }}
    />
  );
}

/** Rotates a value every `intervalMs`, paused entirely under reduced motion. */
function useCycle(length: number, intervalMs: number, enabled: boolean) {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (!enabled || length < 2) return;
    const id = window.setInterval(
      () => setIndex((prev) => (prev + 1) % length),
      intervalMs,
    );
    return () => window.clearInterval(id);
  }, [enabled, length, intervalMs]);

  return index;
}

export default function BcfAttract({ onEnter }: BcfAttractProps) {
  const reduceMotion = useReducedMotion();
  const animate = !reduceMotion;

  const plateIndex = useCycle(PLATES.length, PLATE_HOLD_MS, animate);
  const wordIndex = useCycle(WORD_KEYS.length, WORD_HOLD_MS, animate);
  const wordKey = WORD_KEYS[wordIndex];

  return (
    <motion.section
      className="relative flex h-full min-h-[1920px] w-full flex-col overflow-hidden bg-[#0a0a0a] text-white"
      variants={reduceMotion ? bcfSceneReduced : bcfScene}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Plate stack. Both photographs stay mounted so a cross-fade never has to
          decode an image mid-transition; only opacity and scale move. */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {PLATES.map((plate, index) => {
          const isActive = index === plateIndex;
          return (
            /* Drift and fade are split across two elements on purpose: the
               outer one owns a push that never stops or restarts, the inner one
               owns the dissolve. Driving both from a single element made the
               plate jump back to its start scale as it faded out. */
            <motion.div
              key={plate}
              className="absolute inset-0"
              style={{ transformOrigin: PLATE_ORIGINS[index] }}
              animate={animate ? PLATE_DRIFT[index] : undefined}
              transition={BCF_DRIFT_TRANSITION}
            >
              <motion.img
                src={plate}
                alt=""
                decoding="async"
                fetchPriority={index === 0 ? "high" : "low"}
                className="absolute inset-0 h-full w-full object-cover"
                initial={false}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 2.6, ease: BCF_EASE }}
              />
            </motion.div>
          );
        })}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(4,6,9,0.86) 0%, rgba(4,6,9,0.28) 32%, rgba(4,6,9,0.42) 58%, rgba(4,6,9,0.92) 100%)",
          }}
        />
      </div>

      {/* Warm shaft that breathes across the horizon — the plate is a still, so
          this is what keeps the light itself feeling alive. */}
      {animate ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background: `radial-gradient(760px 620px at 74% 46%, ${BCF.gold}26, transparent 66%)`,
          }}
          animate={{ opacity: [0.55, 1, 0.55], scale: [1, 1.08, 1] }}
          transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}

      {/* Embers rising off the valley floor. */}
      {animate ? (
        <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
          {EMBERS.map((ember) => (
            <motion.span
              key={ember.x}
              className="absolute rounded-full"
              style={{
                left: `${ember.x}%`,
                bottom: -20,
                width: ember.size,
                height: ember.size,
                backgroundColor: BCF.sand,
                boxShadow: `0 0 12px ${BCF.gold}`,
              }}
              animate={{
                y: [0, -1180],
                x: [0, ember.drift],
                opacity: [0, 0.7, 0.7, 0],
              }}
              // Opacity carries four stops to the travel's two, so it needs its
              // own timing — a shared `times` would not line up with either.
              transition={{
                duration: ember.duration,
                delay: ember.delay,
                repeat: Infinity,
                ease: "linear",
                opacity: {
                  duration: ember.duration,
                  delay: ember.delay,
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, 0.16, 0.74, 1],
                },
              }}
            />
          ))}
        </div>
      ) : null}

      <div
        className="pointer-events-none absolute inset-0 z-[3] opacity-[0.1]"
        style={BCF_GRAIN_STYLE}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[4]"
        style={BCF_VIGNETTE_STYLE}
      />

      {/* One tap anywhere enters. It sits under the copy so the Enter pill still
          gets its own press feedback, but no part of the screen is dead. */}
      <button
        type="button"
        className="absolute inset-0 z-10 cursor-pointer border-0 bg-transparent p-0"
        onClick={onEnter}
        aria-label={bcfCopy.en.attractStart}
      />

      <div className="pointer-events-none relative z-20 flex min-h-[1920px] flex-col items-center px-16 pb-[220px] pt-[168px]">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: BCF_EASE, delay: 0.2 }}
        >
          <BcfMonogram />
        </motion.div>

        <motion.p
          className="mt-9 text-center text-[26px] font-semibold uppercase"
          style={{ color: BCF.nature, letterSpacing: "0.3em" }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: BCF_EASE, delay: 0.45 }}
        >
          {bcfCopy.en.attractTagline}
        </motion.p>

        <motion.span
          className="mt-12 block h-px w-[560px] origin-center"
          style={{
            background: `linear-gradient(90deg, transparent, ${BCF.gold}, transparent)`,
          }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.3, ease: BCF_EASE, delay: 0.6 }}
        />

        {/* The three words, turning over in place. Each is shown in all three
            languages at once — no language has been chosen yet, and the screen
            should read as the visitor's own before they pick one. */}
        <div className="relative mt-[150px] flex h-[560px] w-full items-start justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={wordKey}
              className="flex flex-col items-center gap-8 text-center"
              initial={{ opacity: 0, y: 40, filter: "blur(14px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{
                opacity: 0,
                y: -28,
                filter: "blur(10px)",
                transition: { duration: 0.55, ease: "easeIn" },
              }}
              transition={{ duration: 1.05, ease: BCF_EASE }}
            >
              {LANGS.map((lang) => {
                const isPrimary = lang === "en";
                return (
                  <span
                    key={lang}
                    dir={lang === "en" ? "ltr" : "rtl"}
                    className={
                      isPrimary
                        ? "block font-sans text-[136px] font-bold uppercase leading-[0.98] tracking-[0.012em]"
                        : "block font-sans text-[58px] font-medium leading-tight"
                    }
                    style={{
                      color: isPrimary ? BCF.gold : BCF.creamSoft,
                      textShadow: isPrimary
                        ? "0 22px 64px rgba(0,0,0,0.55)"
                        : "0 10px 34px rgba(0,0,0,0.5)",
                      opacity: isPrimary ? 1 : 0.82,
                    }}
                  >
                    {bcfCopy[lang][wordKey]}
                  </span>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Word position, so the turn reads as a deliberate sequence rather than
            a caption that keeps changing on its own. */}
        <div className="mt-2 flex items-center gap-3">
          {WORD_KEYS.map((key, index) => (
            <span
              key={key}
              className="h-[3px] rounded-full transition-all duration-700 ease-smooth-out"
              style={{
                width: index === wordIndex ? 56 : 20,
                backgroundColor:
                  index === wordIndex ? BCF.goldBright : "rgba(255,255,255,0.24)",
                boxShadow: index === wordIndex ? `0 0 14px ${BCF.gold}` : "none",
              }}
            />
          ))}
        </div>

        <motion.p
          className="mt-16 max-w-[820px] text-center font-display-num text-[38px] font-semibold italic leading-snug"
          style={{ color: BCF.cream }}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: BCF_EASE, delay: 0.9 }}
        >
          {bcfCopy.en.attractCaption}
        </motion.p>
      </div>

      {/* Enter control. Parked at ~72% of the height so it lands in the reach
          band of a portrait 65" panel rather than down at floor level.
          The entrance lives on the wrapper so the press keeps its own short
          curve instead of inheriting the slow arrival. */}
      <motion.div
        className="absolute inset-x-[150px] bottom-[420px] z-30"
        initial={{ opacity: 0, y: 42 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: BCF_EASE, delay: 1.1 }}
      >
      <motion.button
        type="button"
        onClick={onEnter}
        aria-label={bcfCopy.en.attractStart}
        className="grid w-full transform-gpu grid-cols-[64px_1fr_44px] items-center gap-7 rounded-full border px-10 py-7 text-start backdrop-blur-xl"
        style={{
          borderColor: `${BCF.gold}66`,
          backgroundColor: "rgba(10,12,16,0.62)",
          boxShadow: `0 26px 70px rgba(0,0,0,0.55), inset 0 0 0 1px ${BCF.gold}1f`,
        }}
        whileTap={BCF_TAP}
        transition={BCF_TAP_TRANSITION}
      >
        <span
          className="relative grid h-16 w-16 place-items-center rounded-full border"
          style={{ borderColor: `${BCF.gold}9e` }}
          aria-hidden="true"
        >
          {animate ? (
            <motion.span
              className="absolute inset-0 rounded-full border"
              style={{ borderColor: BCF.gold }}
              animate={{ scale: [1, 1.62], opacity: [0.5, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
            />
          ) : null}
          <span
            className="h-5 w-5 rounded-full"
            style={{
              backgroundColor: BCF.gold,
              boxShadow: `0 0 22px ${BCF.gold}`,
            }}
          />
        </span>

        <span className="flex flex-col">
          <span
            className="text-[40px] font-semibold leading-none"
            style={{ color: BCF.cream }}
          >
            {bcfCopy.en.attractStart}
          </span>
        </span>

        <ArrowRight
          className="h-11 w-11 justify-self-end"
          style={{ color: BCF.gold }}
          aria-hidden="true"
        />
      </motion.button>
      </motion.div>

      {/* Quiet reminder that the whole plate is live, not just the pill. */}
      <motion.p
        className="pointer-events-none absolute inset-x-0 bottom-[300px] z-30 text-center text-[22px] font-semibold uppercase"
        style={{ color: `${BCF.nature}9c`, letterSpacing: "0.26em" }}
        initial={{ opacity: 0 }}
        animate={animate ? { opacity: [0.35, 0.9, 0.35] } : { opacity: 0.7 }}
        transition={
          animate
            ? { duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 1.6 }
            : { duration: 0.4, delay: 1.6 }
        }
      >
        {bcfCopy.en.enterHint}
      </motion.p>
    </motion.section>
  );
}
