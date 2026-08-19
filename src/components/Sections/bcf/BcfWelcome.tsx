import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import BcfShell from "@/components/Sections/bcf/BcfShell";
import { bcfCopy, type BcfLang } from "@/components/Sections/bcf/bcfContent";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import {
  BCF_TAP,
  BCF_TAP_TRANSITION,
  bcfDrawX,
  bcfRise,
  bcfStagger,
} from "@/components/Sections/bcf/bcfMotion";
import { bcfAttractPoster } from "@/components/Sections/bcf/bcfAssets";

type BcfWelcomeProps = {
  lang: BcfLang;
  onStart: () => void;
};

export default function BcfWelcome({ lang, onStart }: BcfWelcomeProps) {
  const c = bcfCopy[lang];
  const reduceMotion = useReducedMotion();

  return (
    /*
     * Third of the three opening plates, and the only one of the pair the
     * visitor has not yet been alone with — the attract cycles both, the vow
     * holds on the sunrise, and this closes on the citadel ridge. It used to be
     * a borrowed portrait from the Women section, which broke the one place the
     * opening had been building since the first frame.
     */
    <BcfShell
      backgroundImage={bcfAttractPoster}
      overlayClassName="bg-gradient-to-r from-[#04090c]/95 via-[#04090c]/60 to-[#04090c]/10"
    >
      <motion.div
        className="relative flex min-h-[1920px] flex-col justify-center px-14 pb-28 pt-48"
        variants={bcfStagger(0.12, 0.24)}
        initial="initial"
        animate="animate"
      >
        <div className="max-w-[1080px]">
          <motion.p
            variants={bcfRise}
            className="text-[40px] font-medium tracking-[0.12em]"
            style={{ color: BCF.nature }}
          >
            {c.welcomeEyebrow}
          </motion.p>

          <motion.div
            variants={bcfRise}
            className="mt-4 flex flex-wrap items-baseline gap-x-4 font-sans text-[124px] font-bold uppercase leading-[1.02] tracking-[0.01em]"
          >
            {lang === "ku" ? (
              <>
                <span className="text-[#fbf4e4]">{c.welcomeTitleRest}</span>
                <span style={{ color: BCF.gold }}>{c.welcomeTitleBcf}</span>
              </>
            ) : (
              <>
                <span style={{ color: BCF.gold }}>{c.welcomeTitleBcf}</span>
                <span className="text-[#fbf4e4]">{c.welcomeTitleRest}</span>
              </>
            )}
          </motion.div>

          <motion.span
            variants={bcfDrawX}
            className="mt-10 block h-px w-[520px] origin-left"
            style={{
              background: `linear-gradient(90deg, ${BCF.gold}, transparent)`,
            }}
          />

          <motion.p
            variants={bcfRise}
            className="mt-8 max-w-[920px] text-[40px] font-medium leading-snug"
            style={{ color: BCF.nature }}
          >
            {c.welcomeBody}
          </motion.p>

          <motion.button
            variants={bcfRise}
            type="button"
            onClick={onStart}
            whileTap={BCF_TAP}
            transition={BCF_TAP_TRANSITION}
            className="group relative mt-16 flex w-full max-w-[920px] transform-gpu items-center justify-between overflow-hidden rounded-full border border-[#ece1d0]/70 bg-black/30 px-8 py-5 backdrop-blur-sm"
            style={{ boxShadow: "0 16px 48px rgba(0,0,0,0.42)" }}
          >
            {/* Gold sweep that keeps crossing the button — the one moving thing on
                a still screen, which is what makes the CTA read as live. */}
            {!reduceMotion ? (
              <span
                aria-hidden="true"
                className="bcf-sweep pointer-events-none absolute inset-y-0 w-[42%]"
                style={{
                  background: `linear-gradient(90deg, transparent, ${BCF.gold}22, transparent)`,
                }}
              />
            ) : null}

            <span className="relative text-[32px] font-medium tracking-wide text-white">
              {c.startJourney}
            </span>
            <span
              className={`relative grid h-[100px] w-[100px] transform-gpu place-items-center rounded-full border border-[#f0e8da] ${
                reduceMotion ? "" : "bcf-pulse"
              }`}
              style={{ boxShadow: "inset -1px -1px 20px 0 #fbb22f" }}
            >
              <ArrowRight className="h-10 w-10 text-white rtl:rotate-180" />
            </span>
          </motion.button>
        </div>
      </motion.div>
    </BcfShell>
  );
}
