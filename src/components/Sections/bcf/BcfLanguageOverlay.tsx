import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, X } from "lucide-react";
import { bcfCopy, type BcfLang } from "@/components/Sections/bcf/bcfContent";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import {
  BCF_EASE,
  BCF_TAP,
  BCF_TAP_FIRM,
  BCF_TAP_TRANSITION,
} from "@/components/Sections/bcf/bcfMotion";

/** Latin names, so a visitor can find their language without reading its script. */
const LANGUAGE_OPTIONS: { code: BcfLang; native: string; latin: string }[] = [
  { code: "ku", native: "کوردی", latin: "KURDISH" },
  { code: "en", native: "English", latin: "ENGLISH" },
  { code: "ar", native: "عربي", latin: "ARABIC" },
];

type BcfLanguageOverlayProps = {
  open: boolean;
  /**
   * `entry` is the first, unavoidable choice on the way in — it has no close.
   * `control` is the same panel reopened later from the rail, which does.
   */
  origin: "entry" | "control";
  lang: BcfLang;
  onSelect: (lang: BcfLang) => void;
  onClose: () => void;
};

/**
 * Language as an overlay rather than a screen of its own.
 *
 * It used to be step two of a one-way corridor: choose once, and the choice was
 * unreachable for the rest of the visit unless you walked all the way back out.
 * The same panel now serves both moments — the way in, and any time after from
 * the rail — which is why it carries an origin instead of being two components.
 */
export default function BcfLanguageOverlay({
  open,
  origin,
  lang,
  onSelect,
  onClose,
}: BcfLanguageOverlayProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="absolute inset-0 z-[60] grid place-items-center backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="bcf-language-title"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, rgba(251,193,88,0.10), transparent 58%), rgba(4,6,9,0.82)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: BCF_EASE }}
        >
          <motion.div
            className="relative w-[860px] overflow-hidden border px-20 pb-20 pt-24 text-center"
            style={{
              borderColor: `${BCF.gold}3d`,
              borderRadius: "260px 260px 40px 40px",
              background:
                "linear-gradient(160deg, rgba(22,18,10,0.96), rgba(8,10,14,0.98))",
              boxShadow: `0 40px 120px rgba(0,0,0,0.6), inset 0 0 0 1px ${BCF.gold}12`,
            }}
            initial={{ opacity: 0, y: 54, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 26, scale: 0.98 }}
            transition={{ duration: 0.62, ease: BCF_EASE }}
          >
            {/* Two faint arcs echoing the arch of the panel, the same quiet
                geometry the rest of the experience draws its rules with. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-[150px] -top-[220px] h-[340px] w-[340px] rounded-full border"
              style={{ borderColor: `${BCF.gold}14` }}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-[230px] -right-[170px] h-[340px] w-[340px] rounded-full border"
              style={{ borderColor: `${BCF.gold}14` }}
            />

            {origin === "control" ? (
              <motion.button
                type="button"
                onClick={onClose}
                aria-label={bcfCopy[lang].close}
                whileTap={BCF_TAP_FIRM}
                transition={BCF_TAP_TRANSITION}
                className="absolute end-12 top-12 z-10 grid h-[84px] w-[84px] place-items-center rounded-full border"
                style={{
                  borderColor: `${BCF.gold}3d`,
                  backgroundColor: "rgba(0,0,0,0.4)",
                }}
              >
                <X className="h-8 w-8" style={{ color: BCF.sand }} />
              </motion.button>
            ) : null}

            <div>
              <p
                className="text-[19px] font-semibold uppercase"
                style={{ color: BCF.goldDeep, letterSpacing: "0.26em" }}
              >
                {bcfCopy.en.attractTagline}
              </p>

              <div
                className="mx-auto mt-8 flex w-[380px] items-center gap-5"
                aria-hidden="true"
              >
                <span
                  className="h-px flex-1"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${BCF.gold}80)`,
                  }}
                />
                <span
                  className="h-2 w-2 rotate-45"
                  style={{ backgroundColor: BCF.gold }}
                />
                <span
                  className="h-px flex-1"
                  style={{
                    background: `linear-gradient(90deg, ${BCF.gold}80, transparent)`,
                  }}
                />
              </div>

              {/* Trilingual title: on the way in, no language has been chosen
                  yet, so the panel cannot assume which one to speak. */}
              <h2
                id="bcf-language-title"
                className="mt-10 font-display-num text-[64px] font-semibold leading-tight"
                style={{ color: BCF.cream }}
              >
                {bcfCopy.en.languageTitle}
              </h2>
              <p
                className="mt-3 text-[30px] font-medium leading-snug"
                style={{ color: `${BCF.nature}c4` }}
                dir="rtl"
              >
                {bcfCopy.ku.languageTitle} · {bcfCopy.ar.languageTitle}
              </p>

              <div className="mt-14 grid gap-5">
                {LANGUAGE_OPTIONS.map((option, index) => {
                  const isCurrent = option.code === lang;

                  return (
                    <motion.button
                      key={option.code}
                      type="button"
                      onClick={() => onSelect(option.code)}
                      whileTap={BCF_TAP}
                      transition={BCF_TAP_TRANSITION}
                      // The row stays LTR so all three read as one column with
                      // the arrow on a single edge; only the label runs RTL.
                      dir="ltr"
                      className="grid grid-cols-[54px_1fr_150px_44px] items-center gap-6 rounded-2xl border px-9 py-7 text-start transition-[border-color,background-color,box-shadow] duration-300 ease-smooth-out"
                      style={{
                        borderColor: isCurrent ? `${BCF.gold}b0` : `${BCF.gold}33`,
                        backgroundColor: isCurrent
                          ? "rgba(251,193,88,0.12)"
                          : "rgba(255,255,255,0.03)",
                        boxShadow: isCurrent
                          ? `0 0 40px ${BCF.gold}2e`
                          : "0 10px 30px rgba(0,0,0,0.3)",
                      }}
                    >
                      <span
                        className="font-display-num text-[28px]"
                        style={{ color: BCF.goldDeep }}
                      >
                        0{index + 1}
                      </span>
                      <span
                        lang={option.code}
                        dir={option.code === "en" ? "ltr" : "rtl"}
                        className="text-[44px] font-medium"
                        style={{ color: BCF.cream }}
                      >
                        {option.native}
                      </span>
                      <span
                        className="text-[18px] font-semibold"
                        style={{ color: `${BCF.nature}a8`, letterSpacing: "0.14em" }}
                      >
                        {option.latin}
                      </span>
                      <ArrowRight
                        className="h-8 w-8 justify-self-end"
                        style={{ color: BCF.gold }}
                        aria-hidden="true"
                      />
                    </motion.button>
                  );
                })}
              </div>

              {origin === "control" ? (
                <p
                  className="mt-10 text-[22px]"
                  style={{ color: `${BCF.nature}8a` }}
                >
                  {bcfCopy[lang].chooseLanguageHint}
                </p>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
