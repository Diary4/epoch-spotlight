import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import QRCode from "react-qr-code";
import { bcfCopy, type BcfLang } from "@/components/Sections/bcf/bcfContent";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import {
  BCF_EASE,
  BCF_TAP_FIRM,
  BCF_TAP_TRANSITION,
} from "@/components/Sections/bcf/bcfMotion";

/** Official BCF donate page — scanning this QR opens it on the visitor's phone. */
export const BCF_DONATE_URL = "https://bcf.krd/donate-eng/";

/**
 * The QR never changes, so it is encoded once at module load rather than on
 * every render of the overlay.
 *
 * `react-qr-code` builds the whole error-corrected matrix during render. Held
 * as a constant element that work happens while the kiosk is still sitting on
 * the attract screen, and the element is referentially stable afterwards, so
 * re-renders of this overlay never touch it again.
 */
const DONATE_QR = (
  <QRCode
    value={BCF_DONATE_URL}
    size={480}
    bgColor="#FFFFFF"
    fgColor="#0a0a0a"
    style={{ height: "auto", width: "480px" }}
  />
);

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
          className="absolute inset-0 z-[65] grid place-items-center px-14"
          role="dialog"
          aria-modal="true"
          aria-labelledby="bcf-donate-title"
          style={{
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
          <button
            type="button"
            className="absolute inset-0 border-0 bg-black/78 backdrop-blur-xl"
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
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
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

            <div className="mx-auto mt-12 w-fit rounded-[28px] bg-white p-8">
              {DONATE_QR}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
