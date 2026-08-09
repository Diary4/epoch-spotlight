import { AnimatePresence, motion } from "motion/react";
import { bcfCopy, type BcfLang } from "@/components/Sections/bcf/bcfContent";
import { bcfDigits } from "@/components/Sections/bcf/bcfDigits";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import {
  BCF_EASE,
  BCF_TAP,
  BCF_TAP_TRANSITION,
} from "@/components/Sections/bcf/bcfMotion";

type BcfIdleOverlayProps = {
  /** Seconds left before the reset, or null when the visitor is active. */
  count: number | null;
  lang: BcfLang;
  onContinue: () => void;
};

/**
 * Idle warning.
 *
 * A kiosk that keeps the last visitor's chapter on screen greets the next one
 * mid-story with no idea how they got there. This gives the person still
 * reading a way to say so, and everyone else a clean start.
 */
export default function BcfIdleOverlay({
  count,
  lang,
  onContinue,
}: BcfIdleOverlayProps) {
  const c = bcfCopy[lang];

  return (
    <AnimatePresence>
      {count !== null ? (
        <motion.div
          className="absolute inset-0 z-[70] grid place-items-center backdrop-blur-xl"
          role="alertdialog"
          aria-labelledby="bcf-idle-title"
          style={{ backgroundColor: "rgba(4,6,9,0.86)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: BCF_EASE }}
        >
          <motion.div
            className="w-[720px] border px-20 py-20 text-center"
            style={{
              borderColor: `${BCF.gold}3d`,
              borderRadius: 48,
              background:
                "linear-gradient(160deg, rgba(24,19,10,0.96), rgba(8,10,14,0.98))",
              boxShadow: `0 40px 120px rgba(0,0,0,0.6), inset 0 0 0 1px ${BCF.gold}12`,
            }}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.5, ease: BCF_EASE }}
          >
            <span
              className="mx-auto grid h-[168px] w-[168px] place-items-center rounded-full border-2 font-display-num text-[80px]"
              style={{ borderColor: BCF.goldDeep, color: BCF.gold }}
            >
              {bcfDigits(count, lang)}
            </span>
            <h2
              id="bcf-idle-title"
              className="mt-10 font-display-num text-[58px] font-semibold"
              style={{ color: BCF.cream }}
            >
              {c.idleTitle}
            </h2>
            <p
              className="mt-6 text-[28px] leading-snug"
              style={{ color: `${BCF.nature}cc` }}
            >
              {c.idleBody}
            </p>
            <motion.button
              type="button"
              onClick={onContinue}
              whileTap={BCF_TAP}
              transition={BCF_TAP_TRANSITION}
              className="mt-12 rounded-full border px-14 py-6 text-[32px] font-medium"
              style={{
                borderColor: `${BCF.gold}80`,
                backgroundColor: "rgba(251,193,88,0.12)",
                color: BCF.cream,
              }}
            >
              {c.idleContinue}
            </motion.button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
