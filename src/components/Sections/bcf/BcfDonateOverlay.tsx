import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { bcfCopy, type BcfLang } from "@/components/Sections/bcf/bcfContent";
import donateQr from "@/assets/images/bcf/donate-qr.png";
import { BCF, BCF_BLEED_STYLE } from "@/components/Sections/bcf/bcfTheme";
import {
  BCF_EASE,
  BCF_PANEL_MOTION,
  BCF_TAP_FIRM,
  BCF_TAP_TRANSITION,
} from "@/components/Sections/bcf/bcfMotion";
import { BCF_LOW_POWER } from "@/components/Sections/bcf/bcfPerf";

/**
 * Official BCF donate page — scanning the QR opens it on the visitor's phone.
 *
 * The code itself is not generated here any more. `scripts/build-donate-qr.mjs`
 * renders it to `donate-qr.png` from this exact URL, so if this string changes
 * that script has to be re-run.
 */
export const BCF_DONATE_URL = "https://bcf.krd/donate-eng/";

/**
 * Decoded while the kiosk is still on the attract plate.
 *
 * This module is a static import of the BCF page, so this runs at page load.
 * Without it the first decode of the code lands on the frame the visitor taps
 * Donate, and the panel arrives with an empty white square in it for a beat.
 */
if (typeof Image !== "undefined") {
  const warm = new Image();
  warm.src = donateQr;
}

type BcfDonateOverlayProps = {
  open: boolean;
  lang: BcfLang;
  onClose: () => void;
};

export default function BcfDonateOverlay({
  open,
  lang,
  onClose,
}: BcfDonateOverlayProps) {
  const c = bcfCopy[lang];

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="absolute z-[65] grid place-items-center px-14"
          role="dialog"
          aria-modal="true"
          aria-labelledby="bcf-donate-title"
          style={{
            /* Covers the screen, not just the artboard — see BCF_BLEED_STYLE. */
            ...BCF_BLEED_STYLE,
            /* Held on a compositing layer from mount to unmount. Chromium
               otherwise promotes a fading element when the animation starts and
               demotes it when it ends, and each of those costs a repaint of the
               artboard behind — the flash on the Android panel. */
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: BCF_EASE }}
        >
          {/* The scrim states its own tier rather than leaning on the
              `[class*="backdrop-blur"]` sweep in index.css. A full-artboard
              `backdrop-filter` is a GPU readback per frame, so it is worth
              being unable to get here by accident — a panel that once had
              `?perf=high` opened on it keeps that in localStorage. */}
          <button
            type="button"
            className={`absolute inset-0 border-0 ${
              BCF_LOW_POWER ? "bg-black/90" : "bg-black/78 backdrop-blur-xl"
            }`}
            aria-label={c.close}
            onClick={onClose}
          />

          <motion.div
            className="relative z-10 w-full max-w-[860px] border px-16 py-20 text-center"
            style={{
              borderColor: `${BCF.gold}3d`,
              borderRadius: 48,
              background:
                "linear-gradient(160deg, rgba(24,19,10,0.98), rgba(8,10,14,0.99))",
              boxShadow: `0 40px 120px rgba(0,0,0,0.6), inset 0 0 0 1px ${BCF.gold}12`,
            }}
            {...BCF_PANEL_MOTION}
            transition={{ duration: 0.5, ease: BCF_EASE }}
          >
            <motion.button
              type="button"
              onClick={onClose}
              aria-label={c.close}
              whileTap={BCF_TAP_FIRM}
              transition={BCF_TAP_TRANSITION}
              className="absolute end-8 top-8 grid h-[76px] w-[76px] place-items-center rounded-full border border-[#fbc158]/35 bg-black/45"
            >
              <X className="h-8 w-8" style={{ color: BCF.sand }} />
            </motion.button>

            <h2
              id="bcf-donate-title"
              className="text-[56px] font-semibold"
              style={{ color: BCF.gold }}
            >
              {c.donateTitle}
            </h2>
            <p
              className="mx-auto mt-6 max-w-[640px] text-[28px] leading-snug"
              style={{ color: BCF.creamSoft }}
            >
              {c.donateHint}
            </p>

            {/* The pre-rendered code, as one texture.
                It used to be `react-qr-code`, which draws a QR as two SVG paths
                carrying one subpath per module — a little over twelve hundred
                of them for this URL. This panel arrives on a `scale` animation,
                so Chromium re-rasterised all of them on every frame of the
                entrance, at the 2× the 4K portrait panel draws the artboard.
                That is the stutter this screen showed on open. A texture scales
                on the GPU for free. See scripts/build-donate-qr.mjs. */}
            <div className="mx-auto mt-12 w-fit rounded-[28px] bg-white p-8">
              <img
                src={donateQr}
                alt=""
                width={480}
                height={480}
                decoding="async"
                className="block h-[480px] w-[480px]"
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
