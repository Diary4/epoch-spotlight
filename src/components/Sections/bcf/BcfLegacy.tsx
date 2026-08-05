import { motion, useReducedMotion } from "motion/react";
import { RotateCcw } from "lucide-react";
import BcfShell, { BcfBackButton } from "@/components/Sections/bcf/BcfShell";
import { bcfCopy, type BcfLang } from "@/components/Sections/bcf/bcfContent";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import {
  BCF_DRIFT_TRANSITION,
  BCF_EASE,
  BCF_TAP,
  BCF_TAP_TRANSITION,
  bcfDrawX,
  bcfRise,
  bcfRiseCard,
  bcfStagger,
} from "@/components/Sections/bcf/bcfMotion";
import legacyHero from "@/assets/images/bcf/selected/humanity-relief.webp";
import pillarService from "@/assets/images/bcf/selected/humanity-relief.webp";
import pillarHumanity from "@/assets/images/bcf/selected/humanity-community.webp";
import pillarHope from "@/assets/images/bcf/selected/humanity-education.webp";

type BcfLegacyProps = {
  lang: BcfLang;
  onBack: () => void;
  /** Closing page's own exit — the roadmap ends on "Return to Beginning". */
  onRestart: () => void;
};

const PILLAR_IMAGES = [pillarService, pillarHumanity, pillarHope];

/**
 * Closing page — "A Legacy That Continues" (roadmap page 29).
 *
 * The scene is one photograph that dissolves into black, three pillars that
 * arrive on a stagger, and the thanks last: the visitor should feel the room
 * settling rather than another list opening.
 */
export default function BcfLegacy({ lang, onBack, onRestart }: BcfLegacyProps) {
  const c = bcfCopy[lang];
  const reduceMotion = useReducedMotion();

  return (
    <BcfShell showLogo={false} backgroundStyle={{ backgroundColor: BCF.bg }}>
      <div className="relative flex min-h-[1920px] flex-col">
        <BcfBackButton onClick={onBack} label={c.back} />

        {/* Hero plate. It carries its own fade to black so the pillars below sit
            on the page rather than on a photograph. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[700px] overflow-hidden">
          <motion.img
            src={legacyHero}
            alt=""
            decoding="async"
            fetchPriority="high"
            className="h-full w-full object-cover"
            initial={reduceMotion ? undefined : { scale: 1.06 }}
            animate={reduceMotion ? undefined : { scale: 1.13 }}
            transition={BCF_DRIFT_TRANSITION}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,10,10,0.42) 0%, rgba(10,10,10,0.25) 34%, rgba(10,10,10,0.86) 76%, #0a0a0a 100%)",
            }}
          />
        </div>

        <motion.div
          className="relative z-10 flex flex-1 flex-col px-14 pb-20 pt-[340px]"
          variants={bcfStagger(0.12, 0.2)}
          initial="initial"
          animate="animate"
        >
          <motion.h1
            variants={bcfRise}
            className="text-[92px] font-bold leading-[1.02]"
          >
            <span className="block text-[#fbf4e4]">{c.legacyTitleWhite}</span>
            <span className="block" style={{ color: BCF.gold }}>
              {c.legacyTitleGold}
            </span>
          </motion.h1>

          <motion.div
            variants={bcfDrawX}
            className="mt-9 flex w-[420px] max-w-full origin-left items-center gap-3 rtl:origin-right"
          >
            <span
              className="h-px flex-1"
              style={{
                background: `linear-gradient(90deg, ${BCF.gold}, ${BCF.gold}22)`,
              }}
            />
            <span
              className="h-3 w-3 shrink-0 rounded-full"
              style={{ backgroundColor: BCF.gold }}
            />
          </motion.div>

          <motion.p
            variants={bcfRise}
            className="mt-10 max-w-[900px] text-[30px] leading-relaxed text-white/80"
          >
            {c.legacyLead}
          </motion.p>

          <motion.p
            variants={bcfRise}
            className="mt-7 max-w-[900px] text-[28px] leading-relaxed text-white/60"
          >
            {c.legacyBridge}
          </motion.p>

          {/* The three pillars, numbered the way every other BCF list is. */}
          <div className="mt-12 flex flex-col gap-6">
            {c.legacyPillars.map((pillar, index) => (
              <motion.div
                key={pillar.id}
                variants={bcfRiseCard}
                className="relative flex h-[170px] items-stretch overflow-hidden rounded-[26px] border"
                style={{
                  borderColor: "rgba(251,193,88,0.28)",
                  background:
                    "linear-gradient(100deg, rgba(18,14,8,0.95) 0%, rgba(12,11,10,0.9) 58%, rgba(12,11,10,0.4) 100%)",
                  boxShadow: "0 22px 56px rgba(0,0,0,0.5)",
                }}
              >
                <span
                  className="grid w-[150px] shrink-0 place-items-center text-[46px] font-bold tabular-nums"
                  style={{ color: `${BCF.gold}cc` }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="flex min-w-0 flex-1 flex-col justify-center gap-2 pe-8">
                  <span className="text-[42px] font-semibold uppercase leading-tight tracking-[0.04em] text-[#fbf4e4]">
                    {pillar.titleWhite}
                  </span>
                  <span
                    className="text-[42px] font-semibold uppercase leading-tight tracking-[0.04em]"
                    style={{ color: BCF.gold }}
                  >
                    {pillar.titleGold}
                  </span>
                </span>

                <span className="relative w-[280px] shrink-0 overflow-hidden">
                  <img
                    src={PILLAR_IMAGES[index % PILLAR_IMAGES.length]}
                    alt=""
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  {/* Feathered edge so the photo joins the card instead of
                      sitting in a window cut out of it. */}
                  <span
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(12,11,10,1) 0%, rgba(12,11,10,0.45) 42%, rgba(12,11,10,0.15) 100%)",
                    }}
                  />
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={bcfRise}
            className="mt-16 flex flex-col items-center text-center"
          >
            <span
              className="text-[26px] font-semibold uppercase tracking-[0.34em]"
              style={{ color: BCF.gold }}
            >
              {c.legacyThanks}
            </span>
            <p className="mt-7 max-w-[760px] text-[30px] leading-relaxed text-white/80">
              {c.legacyThanksBody}
            </p>

            <motion.button
              type="button"
              onClick={onRestart}
              whileTap={BCF_TAP}
              transition={BCF_TAP_TRANSITION}
              className="mt-10 flex transform-gpu items-center gap-4 rounded-full px-12 py-6 text-[30px] font-medium will-change-transform"
              style={{
                border: `1px solid ${BCF.gold}66`,
                backgroundColor: "rgba(0,0,0,0.45)",
                color: BCF.creamSoft,
              }}
            >
              <RotateCcw className="h-8 w-8" style={{ color: BCF.gold }} />
              {c.legacyRestart}
            </motion.button>
          </motion.div>

          {/* A last slow breath of gold under the thanks. */}
          {!reduceMotion ? (
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[320px]"
              style={{
                background: `radial-gradient(60% 100% at 50% 100%, ${BCF.gold}1f, transparent 70%)`,
              }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 7, repeat: Infinity, ease: BCF_EASE }}
            />
          ) : null}
        </motion.div>
      </div>
    </BcfShell>
  );
}
