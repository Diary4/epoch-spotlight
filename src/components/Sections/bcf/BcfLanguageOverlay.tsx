import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { bcfCopy, type BcfLang } from "@/components/Sections/bcf/bcfContent";
import { bcfLogo } from "@/components/Sections/bcf/bcfAssets";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import {
  BCF_EASE,
  BCF_TAP,
  BCF_TAP_FIRM,
  BCF_TAP_TRANSITION,
} from "@/components/Sections/bcf/bcfMotion";

/** Mockup order: English · Kurdish · Arabic, each shown in its own script. */
const LANGUAGE_OPTIONS: { code: BcfLang; label: string }[] = [
  { code: "en", label: "English" },
  { code: "ku", label: "کوردی" },
  { code: "ar", label: "عربي" },
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
 * Language as a veil over the current scene. The scene itself is blurred by
 * the page (low-power mode strips `backdrop-filter`), so this plate only dims.
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
          className="absolute inset-0 z-[60] overflow-hidden bg-black/35"
          role="dialog"
          aria-modal="true"
          aria-label={bcfCopy.en.languageTitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: BCF_EASE }}
        >
          <img
            src={bcfLogo}
            alt="Barzani Charity Foundation"
            decoding="async"
            className="pointer-events-none absolute left-10 top-10 z-10 h-[172px] w-auto"
            style={{ filter: "drop-shadow(0 10px 28px rgba(0,0,0,0.55))" }}
          />

          {origin === "control" ? (
            <motion.button
              type="button"
              onClick={onClose}
              aria-label={bcfCopy[lang].close}
              whileTap={BCF_TAP_FIRM}
              transition={BCF_TAP_TRANSITION}
              className="absolute end-10 top-10 z-20 grid h-[76px] w-[76px] place-items-center rounded-full border border-[#fbc158]/35 bg-black/45 backdrop-blur-md"
              style={{ boxShadow: "0 10px 34px rgba(0,0,0,0.45)" }}
            >
              <X className="h-8 w-8" style={{ color: BCF.sand }} />
            </motion.button>
          ) : null}

          <div className="absolute inset-0 z-10 flex items-center justify-center px-14">
            <motion.div
              className="flex w-full max-w-[980px] items-center justify-center gap-7"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.55, delay: 0.08, ease: BCF_EASE }}
            >
              {LANGUAGE_OPTIONS.map((option) => {
                const isCurrent = origin === "control" && option.code === lang;

                return (
                  <motion.button
                    key={option.code}
                    type="button"
                    onClick={() => onSelect(option.code)}
                    whileTap={BCF_TAP}
                    transition={BCF_TAP_TRANSITION}
                    lang={option.code}
                    dir={option.code === "en" ? "ltr" : "rtl"}
                    className="min-h-[110px] flex-1 transform-gpu rounded-[22px] border px-6 py-8 text-center text-[40px] font-medium text-white backdrop-blur-md"
                    style={{
                      borderColor: isCurrent ? BCF.gold : `${BCF.gold}99`,
                      backgroundColor: isCurrent
                        ? "rgba(0,0,0,0.62)"
                        : "rgba(0,0,0,0.42)",
                      boxShadow: isCurrent
                        ? `0 0 36px ${BCF.gold}40, 0 14px 36px rgba(0,0,0,0.4)`
                        : "0 14px 36px rgba(0,0,0,0.4)",
                      transition:
                        "border-color 300ms ease, background-color 300ms ease, box-shadow 300ms ease",
                    }}
                  >
                    {option.label}
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
