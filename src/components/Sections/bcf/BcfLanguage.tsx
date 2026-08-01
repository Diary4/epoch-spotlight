import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import BcfShell from "@/components/Sections/bcf/BcfShell";
import { bcfCopy, type BcfLang } from "@/components/Sections/bcf/bcfContent";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import {
  BCF_TAP,
  BCF_TAP_TRANSITION,
  bcfDrawX,
  bcfRise,
  bcfRiseCard,
  bcfStagger,
} from "@/components/Sections/bcf/bcfMotion";
import { bcfLangBg as langBg } from "@/components/Sections/bcf/bcfAssets";

type BcfLanguageProps = {
  onSelect: (lang: BcfLang) => void;
};

export default function BcfLanguage({ onSelect }: BcfLanguageProps) {
  const c = bcfCopy.en;
  // The chosen row lights up and holds for a beat before the screen changes, so
  // the visitor sees their own choice register rather than the page just leaving.
  const [chosen, setChosen] = React.useState<BcfLang | null>(null);

  const choose = (lang: BcfLang) => {
    if (chosen) return;
    setChosen(lang);
    window.setTimeout(() => onSelect(lang), 240);
  };

  return (
    <BcfShell backgroundImage={langBg} overlayClassName="bg-black/55">
      <motion.div
        className="relative flex min-h-[1920px] flex-col items-center justify-center px-16"
        variants={bcfStagger(0.1, 0.2)}
        initial="initial"
        animate="animate"
      >
        <motion.p
          variants={bcfRise}
          className="text-center text-[28px] tracking-[0.22em]"
          style={{ color: BCF.nature }}
        >
          {c.languageTitle}
        </motion.p>

        <motion.span
          variants={bcfDrawX}
          className="mt-9 mb-16 block h-px w-[300px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${BCF.gold}, transparent)`,
          }}
        />

        <div className="flex w-full max-w-[720px] flex-col gap-7">
          {c.languages.map((lang) => {
            const isChosen = chosen === lang.id;
            const dimmed = chosen !== null && !isChosen;

            return (
              <motion.button
                key={lang.id}
                type="button"
                variants={bcfRiseCard}
                onClick={() => choose(lang.id)}
                whileTap={BCF_TAP}
                animate={{ opacity: dimmed ? 0.28 : 1 }}
                transition={BCF_TAP_TRANSITION}
                // The row itself stays LTR so all three read as one column with
                // the label left and the arrow right; only the label's own text
                // runs RTL. Flipping the row per language made the list ragged.
                dir="ltr"
                className="group relative flex transform-gpu items-center justify-between overflow-hidden rounded-2xl border-2 px-10 py-7 text-left text-[42px] font-light text-white backdrop-blur-sm will-change-transform"
                style={{
                  borderColor: isChosen ? BCF.goldBright : `${BCF.gold}88`,
                  backgroundColor: isChosen
                    ? "rgba(251,178,47,0.16)"
                    : "rgba(0,0,0,0.32)",
                  boxShadow: isChosen
                    ? `0 0 44px ${BCF.gold}55, inset 0 0 0 1px ${BCF.gold}55`
                    : "0 12px 40px rgba(0,0,0,0.35)",
                  transition:
                    "border-color 260ms cubic-bezier(0.22,1,0.36,1), background-color 260ms cubic-bezier(0.22,1,0.36,1), box-shadow 260ms cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                <span dir={lang.id === "en" ? "ltr" : "rtl"}>{lang.label}</span>
                <span
                  className="grid h-[62px] w-[62px] shrink-0 place-items-center rounded-full border transition-all duration-300"
                  style={{
                    borderColor: isChosen ? BCF.goldBright : `${BCF.gold}66`,
                    color: BCF.gold,
                    boxShadow: isChosen ? `0 0 26px ${BCF.gold}55` : "none",
                  }}
                >
                  <ArrowRight className="h-8 w-8" />
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </BcfShell>
  );
}
