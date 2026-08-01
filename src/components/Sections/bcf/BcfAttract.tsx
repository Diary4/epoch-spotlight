import React from "react";
import gsap from "gsap";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Play, SkipForward } from "lucide-react";

import { bcfCopy, type BcfLang } from "@/components/Sections/bcf/bcfContent";
import {
  BCF,
  BCF_GRAIN_STYLE,
  BCF_VIGNETTE_STYLE,
} from "@/components/Sections/bcf/bcfTheme";
import {
  BCF_TAP,
  BCF_TAP_TRANSITION,
  bcfScene,
  bcfSceneReduced,
} from "@/components/Sections/bcf/bcfMotion";
import {
  bcfAttractVideo,
  bcfErbil,
  bcfImpactBg,
  bcfIntroBg,
  bcfLangBg,
  bcfWelcomeBg,
} from "@/components/Sections/bcf/bcfAssets";

/**
 * Opening attract screen for the BCF kiosk.
 *
 * Sits before language selection and behaves like a film: it holds on a poster
 * frame carrying the BCF identity, waits for one touch — prompted in Kurdish,
 * English and Arabic, since no language has been chosen yet — plays the reel
 * once, then hands off to the language step.
 *
 * The reel is animated rather than encoded, so it needs no video asset and stays
 * sharp on the 1080x1920 display. Assign `bcfAttractVideo` in bcfAssets to play
 * a real film instead; the surrounding flow is identical either way.
 */

type BcfAttractProps = {
  onFinish: () => void;
};

/** Trilingual order matches the language menu: Kurdish, English, Arabic. */
const LANGS: BcfLang[] = ["ku", "en", "ar"];

const SCENE_IMAGES = [bcfWelcomeBg, bcfIntroBg, bcfErbil, bcfImpactBg, bcfLangBg];

/** Scene starts on the master timeline, in seconds. */
const OPEN = 0;
const WORD_1 = 2.8;
const WORD_2 = 5.6;
const WORD_3 = 8.4;
const STATS = 11.2;
const CLOSE = 15;
const REEL_END = 17.4;

const WORD_STARTS = [WORD_1, WORD_2, WORD_3];

/** Impact figures that carry the reel's closing statement. */
const STAT_INDEXES = [1, 2, 3] as const;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

type BcfMonogramProps = React.HTMLAttributes<HTMLDivElement>;

function BcfMonogram({ className = "", ...rest }: BcfMonogramProps) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`} {...rest}>
      <div
        className="grid h-[132px] w-[132px] place-items-center rounded-full border-2 text-[34px] font-semibold tracking-[0.12em]"
        style={{ borderColor: BCF.gold, color: BCF.gold }}
      >
        BCF
      </div>
      <span
        className="font-serif text-[46px] font-bold leading-none tracking-[0.1em]"
        style={{ color: BCF.red }}
      >
        BCF
      </span>
    </div>
  );
}

/** One word of the reel, shown in all three languages at once. */
function WordScene({
  scene,
  image,
  words,
}: {
  scene: number;
  image: string;
  words: { lang: BcfLang; text: string }[];
}) {
  return (
    <div
      data-scene={scene}
      className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-16 opacity-0"
    >
      <img
        data-scene-image={scene}
        src={image}
        alt=""
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-black/85" />

      <div className="relative flex flex-col items-center gap-6 text-center">
        {words.map(({ lang, text }) => {
          const isPrimary = lang === "en";

          return (
            <span
              key={lang}
              data-scene-word={scene}
              dir={lang === "en" ? "ltr" : "rtl"}
              className={`opacity-0 ${
                isPrimary
                  ? "font-sans text-[132px] font-bold uppercase leading-[1.02] tracking-[0.01em]"
                  : "font-sans text-[68px] font-medium leading-tight"
              }`}
              style={{ color: isPrimary ? BCF.gold : BCF.creamSoft }}
            >
              {text}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function BcfAttract({ onFinish }: BcfAttractProps) {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const progressRef = React.useRef<HTMLSpanElement | null>(null);
  const timelineRef = React.useRef<gsap.core.Timeline | null>(null);
  const finishedRef = React.useRef(false);

  const [playing, setPlaying] = React.useState(false);
  const reduceMotion = useReducedMotion();

  const en = bcfCopy.en;

  // Held in a ref so `finish` stays stable — an unstable callback would rebuild
  // (and therefore revert) the timeline mid-play.
  const onFinishRef = React.useRef(onFinish);
  onFinishRef.current = onFinish;

  const finish = React.useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    onFinishRef.current();
  }, []);

  const setProgress = React.useCallback((ratio: number) => {
    const bar = progressRef.current;
    if (bar) bar.style.width = `${Math.min(1, Math.max(0, ratio)) * 100}%`;
  }, []);

  // Build the reel paused on its poster frame, so the screen reads as a film
  // waiting to be started.
  React.useLayoutEffect(() => {
    if (bcfAttractVideo || !rootRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        onUpdate: () => setProgress(tl.time() / REEL_END),
        onComplete: finish,
      });

      // Opening: the poster frame drifts, then dissolves into the first word.
      tl.to("[data-scene-image='0']", { scale: 1.12, duration: 3.3, ease: "none" }, OPEN)
        .to("[data-open-mark]", { y: -40, duration: 2.4, ease: "power1.inOut" }, OPEN)
        .to("[data-scene='0']", { autoAlpha: 0, duration: 1.15, ease: "power2.inOut" }, WORD_1 - 0.5);

      // Three word scenes: cross-dissolve, slow push on the photo, words rise in.
      WORD_STARTS.forEach((at, index) => {
        const scene = index + 1;
        const isLast = index === WORD_STARTS.length - 1;

        tl.fromTo(
          `[data-scene='${scene}']`,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 1.45, ease: "power2.inOut" },
          at - 0.5,
        )
          .fromTo(
            `[data-scene-image='${scene}']`,
            { scale: 1.16 },
            { scale: 1, duration: 4.2, ease: "none" },
            at - 0.5,
          )
          .fromTo(
            `[data-scene-word='${scene}']`,
            { autoAlpha: 0, y: 44 },
            { autoAlpha: 1, y: 0, duration: 1.8, ease: "power2.out", stagger: 0.14 },
            at,
          )
          .to(
            `[data-scene='${scene}']`,
            { autoAlpha: 0, duration: 1.3, ease: "power2.inOut" },
            (isLast ? STATS : at + 2.8) - 0.5,
          );
      });

      // Impact figures count up.
      tl.fromTo(
        "[data-scene='4']",
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 1.45, ease: "power2.inOut" },
        STATS - 0.5,
      )
        .fromTo(
          "[data-scene-image='4']",
          { scale: 1.14 },
          { scale: 1, duration: 4.6, ease: "none" },
          STATS - 0.5,
        )
        .fromTo(
          "[data-stat]",
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 1.45, ease: "power2.out", stagger: 0.22 },
          STATS,
        );

      // Counters start exactly as their figure begins to fade in, so the final
      // value is never briefly on screen before it resets to zero.
      const statNodes = Array.from(
        rootRef.current?.querySelectorAll<HTMLElement>("[data-stat-value]") ?? [],
      );
      statNodes.forEach((node, index) => {
        const target = Number(node.dataset.statValue ?? "0");
        const counter = { value: 0 };

        tl.to(
          counter,
          {
            value: target,
            duration: 1.9,
            ease: "power2.out",
            onUpdate: () => {
              node.textContent = Math.round(counter.value).toLocaleString("en-US");
            },
          },
          STATS + index * 0.22,
        );
      });

      tl.to("[data-scene='4']", { autoAlpha: 0, duration: 1.3, ease: "power2.inOut" }, CLOSE - 0.5);

      // Closing lockup, then fade to black and hand off.
      tl.fromTo(
        "[data-scene='5']",
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 1.45, ease: "power2.inOut" },
        CLOSE - 0.5,
      )
        .fromTo(
          "[data-close-mark]",
          { autoAlpha: 0, scale: 0.9 },
          { autoAlpha: 1, scale: 1, duration: 2, ease: "power2.out" },
          CLOSE - 0.5,
        )
        .fromTo(
          "[data-close-rule]",
          { scaleX: 0 },
          { scaleX: 1, duration: 1.6, ease: "power2.out" },
          CLOSE + 0.3,
        )
        .to("[data-scene='5']", { autoAlpha: 0, duration: 1.45, ease: "power2.in" }, REEL_END - 0.9);

      timelineRef.current = tl;
    }, rootRef);

    return () => {
      timelineRef.current = null;
      ctx.revert();
    };
  }, [finish, setProgress]);

  const start = React.useCallback(() => {
    if (playing) return;
    setPlaying(true);

    // Reduced motion skips the reel and goes straight to the experience.
    if (prefersReducedMotion()) {
      finish();
      return;
    }

    if (bcfAttractVideo) {
      void videoRef.current?.play();
      return;
    }

    timelineRef.current?.play();
  }, [playing, finish]);

  const skip = React.useCallback(() => {
    timelineRef.current?.pause();
    videoRef.current?.pause();
    finish();
  }, [finish]);

  return (
    <motion.section
      ref={rootRef}
      className="relative flex h-full min-h-[1920px] w-full flex-col overflow-hidden bg-[#0a0a0a] text-white"
      // Carries the same dissolve as every BcfShell scene, so handing off to the
      // language step is one continuous motion rather than a cut.
      variants={reduceMotion ? bcfSceneReduced : bcfScene}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {bcfAttractVideo ? (
        <video
          ref={videoRef}
          src={bcfAttractVideo}
          muted
          playsInline
          preload="auto"
          onTimeUpdate={(event) => {
            const el = event.currentTarget;
            if (el.duration) setProgress(el.currentTime / el.duration);
          }}
          onEnded={finish}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <>
          {/* Scene 0 — the poster frame the reel rests on before it is started. */}
          <div data-scene="0" className="pointer-events-none absolute inset-0">
            <img
              data-scene-image="0"
              src={bcfLangBg}
              alt=""
              decoding="async"
              fetchpriority="high"
              className="absolute inset-0 h-full w-full object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/92" />

            <div className="relative flex min-h-[1920px] flex-col items-center gap-9 pt-[360px]">
              <BcfMonogram data-open-mark="" />
              <p
                className="text-center text-[34px] font-medium uppercase"
                style={{ color: BCF.nature, letterSpacing: "0.18em" }}
              >
                {en.attractTagline}
              </p>
            </div>
          </div>

          {/* Scenes 1–3 — HUMANITY / DIGNITY / HOPE, each in all three languages. */}
          {(["humanity", "dignity", "hope"] as const).map((wordKey, index) => (
            <WordScene
              key={wordKey}
              scene={index + 1}
              image={SCENE_IMAGES[index]}
              words={LANGS.map((lang) => ({ lang, text: bcfCopy[lang][wordKey] }))}
            />
          ))}

          {/* Scene 4 — impact figures. */}
          <div
            data-scene="4"
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-16 opacity-0"
          >
            <img
              data-scene-image="4"
              src={SCENE_IMAGES[3]}
              alt=""
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/78" />

            <div className="relative flex w-full max-w-[860px] flex-col gap-20">
              {STAT_INDEXES.map((statIndex) => {
                const item = en.impactItems[statIndex];
                if (!item) return null;

                const numeric = Number(item.value.replace(/\D/g, "")) || 0;
                const labels = LANGS.map((lang) => bcfCopy[lang].impactItems[statIndex]?.title)
                  .filter(Boolean)
                  .join(" ·  ");

                return (
                  <div data-stat="" key={item.title} className="text-center opacity-0">
                    <p
                      data-stat-value={numeric}
                      className="font-sans text-[128px] font-bold leading-none"
                      style={{ color: BCF.gold }}
                    >
                      {item.value}
                    </p>
                    <p className="mt-5 text-[30px] font-medium" style={{ color: BCF.creamSoft }}>
                      {labels}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scene 5 — closing lockup. */}
          <div
            data-scene="5"
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center opacity-0"
          >
            <img
              src={SCENE_IMAGES[4]}
              alt=""
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/92" />

            <div className="relative flex flex-col items-center gap-10">
              <BcfMonogram data-close-mark="" className="opacity-0" />
              <span
                data-close-rule=""
                className="block h-[3px] w-[420px] origin-center rounded-full"
                style={{ backgroundColor: BCF.gold }}
              />
              <p className="text-[34px] font-medium tracking-[0.16em]" style={{ color: BCF.nature }}>
                {en.attractTagline}
              </p>
            </div>
          </div>
        </>
      )}

      {/* Film texture over every scene — grain and corner falloff, the same
          stack the rest of the experience gets from BcfShell. */}
      <div
        className="pointer-events-none absolute inset-0 z-[5] opacity-[0.1]"
        style={BCF_GRAIN_STYLE}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[6]"
        style={BCF_VIGNETTE_STYLE}
      />

      {/* Start prompt — the reel holds here until the visitor touches the screen. */}
      <AnimatePresence>
        {!playing ? (
          <motion.button
            type="button"
            onClick={start}
            aria-label={LANGS.map((lang) => bcfCopy[lang].attractStart).join(" / ")}
            className="absolute inset-0 z-30 flex transform-gpu flex-col items-center justify-center gap-12 border-0 bg-black/45 p-0 will-change-transform"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.45 } }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileTap={BCF_TAP}
          >
            <span className="relative grid h-[220px] w-[220px] place-items-center">
              {/* Two rings on staggered cycles read as a beacon rather than a
                  single blinking outline. */}
              {!reduceMotion
                ? [0, 1].map((ring) => (
                    <motion.span
                      key={ring}
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full border-2"
                      style={{ borderColor: BCF.gold }}
                      animate={{ scale: [1, 1.55], opacity: [0.45, 0] }}
                      transition={{
                        duration: 2.8,
                        repeat: Infinity,
                        delay: ring * 1.4,
                        ease: "easeOut",
                      }}
                    />
                  ))
                : null}
              <span
                className="absolute inset-0 rounded-full border-2 bg-black/40 backdrop-blur-sm"
                style={{
                  borderColor: BCF.gold,
                  boxShadow: `0 0 60px ${BCF.gold}3a`,
                }}
              />
              <Play
                className="relative h-20 w-20 translate-x-2"
                style={{ color: BCF.gold }}
                fill={BCF.gold}
              />
            </span>

            <span className="flex flex-col items-center gap-5">
              {LANGS.map((lang) => (
                <span
                  key={lang}
                  dir={lang === "en" ? "ltr" : "rtl"}
                  className={
                    lang === "en"
                      ? "text-[52px] font-semibold leading-none"
                      : "text-[40px] font-medium leading-none"
                  }
                  style={{ color: lang === "en" ? BCF.cream : BCF.nature }}
                >
                  {bcfCopy[lang].attractStart}
                </span>
              ))}
            </span>
          </motion.button>
        ) : null}
      </AnimatePresence>

      {/* Scrubber — reinforces that this is a film, and shows how much is left. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[6px] bg-white/12">
        <span
          ref={progressRef}
          className="block h-full w-0"
          style={{
            backgroundColor: BCF.gold,
            boxShadow: `0 0 14px ${BCF.gold}`,
          }}
        />
      </div>

      <AnimatePresence>
        {playing ? (
          <motion.button
            type="button"
            onClick={skip}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.45, delay: 0.8 }}
            whileTap={BCF_TAP}
            className="absolute bottom-16 end-12 z-30 flex transform-gpu items-center gap-3 rounded-full border border-[#fbc158]/50 bg-black/55 px-7 py-4 text-[26px] font-medium text-white backdrop-blur-md will-change-transform"
          >
            <SkipForward className="h-7 w-7 rtl:rotate-180" style={{ color: BCF.gold }} />
            Skip
          </motion.button>
        ) : null}
      </AnimatePresence>
    </motion.section>
  );
}
