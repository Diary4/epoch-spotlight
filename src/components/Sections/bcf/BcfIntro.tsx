import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Hand } from "lucide-react";
import TextType from "@/components/TextType";
import BcfShell from "@/components/Sections/bcf/BcfShell";
import { bcfCopy, type BcfLang } from "@/components/Sections/bcf/bcfContent";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import { bcfDrawX, bcfRise, bcfStagger } from "@/components/Sections/bcf/bcfMotion";
import { bcfIntroBg as introBg } from "@/components/Sections/bcf/bcfAssets";

type BcfIntroProps = {
  lang: BcfLang;
  onContinue: () => void;
};

export default function BcfIntro({ lang, onContinue }: BcfIntroProps) {
  const c = bcfCopy[lang];
  const reduceMotion = useReducedMotion();

  return (
    <BcfShell
      backgroundImage={introBg}
      overlayClassName="bg-gradient-to-r from-[#04090c] via-[#04090c]/55 to-transparent"
    >
      {/* One tap continues. The screen used to open behind a black wall that had
          to be dismissed first, so the visitor's first touch bought them nothing
          but the page they were already looking at. */}
      <button
        type="button"
        className="absolute inset-0 z-20 cursor-pointer border-0 bg-transparent p-0"
        onClick={onContinue}
        aria-label={c.touchToContinue}
      />

      {/* pt clears the BCF logo mark in the top-left corner — at pt-32 the
          124px headline ran straight through it. */}
      <motion.div
        className="relative z-10 flex min-h-[1920px] flex-col px-16 pb-40 pt-[300px]"
        variants={bcfStagger(0.14, 0.28)}
        initial="initial"
        animate="animate"
      >
        <div className="max-w-[920px]">
          <motion.div variants={bcfRise}>
            <TextType
              as="h1"
              text={[c.humanity, c.dignity, c.hope]}
              typingSpeed={70}
              deletingSpeed={40}
              pauseDuration={1400}
              loop
              showCursor
              cursorCharacter="|"
              cursorClassName="text-[#fbc158]"
              textColors={["#fdeed4", "#fdeed4", BCF.gold]}
              className="font-sans text-[124px] font-bold uppercase leading-[1.02] tracking-[0.01em]"
            />
          </motion.div>

          <motion.span
            variants={bcfDrawX}
            className="mt-14 block h-px w-[420px] origin-left"
            style={{
              background: `linear-gradient(90deg, ${BCF.gold}, transparent)`,
            }}
          />

          <div className="mt-16 max-w-[640px]">
            <motion.span
              variants={bcfRise}
              className="block text-[64px] leading-none text-[#fbc158]"
            >
              “
            </motion.span>
            <motion.p
              variants={bcfRise}
              className="mt-4 text-[36px] font-medium italic leading-snug text-[#fbf4e4]"
            >
              {c.quote}
            </motion.p>
            <motion.div variants={bcfRise} className="mt-8 flex items-center gap-4">
              <span className="h-0.5 w-6 rounded-full" style={{ backgroundColor: BCF.goldDeep }} />
              <p className="text-[42px] font-medium" style={{ color: BCF.goldDeep }}>
                {c.quoteAttr.replace(/^—\s*/, "")}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Touch prompt: a breathing cue at the foot of the screen rather than a
          scrim across the artwork, so the composition is never hidden. */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-24 z-30 flex flex-col items-center gap-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.span
          className="grid h-[112px] w-[112px] place-items-center rounded-full border bg-black/35 backdrop-blur-sm"
          style={{ borderColor: `${BCF.gold}70` }}
          animate={reduceMotion ? undefined : { y: [0, -14, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Hand className="h-14 w-14" strokeWidth={1.4} style={{ color: BCF.sand }} />
        </motion.span>
        <p
          className="text-[32px] tracking-[0.14em]"
          style={{ color: BCF.nature }}
        >
          {c.touchToContinue}
        </p>
      </motion.div>
    </BcfShell>
  );
}
