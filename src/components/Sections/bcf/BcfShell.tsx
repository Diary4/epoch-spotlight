import React from "react";
import { ChevronLeft } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { bcfLogo } from "@/components/Sections/bcf/bcfAssets";
import {
  BCF,
  BCF_BLOOM_STYLE,
  BCF_GRAIN_STYLE,
  BCF_PAGE,
  BCF_VIGNETTE_STYLE,
} from "@/components/Sections/bcf/bcfTheme";
import {
  BCF_DRIFT_TRANSITION,
  BCF_TAP_FIRM,
  BCF_TAP_TRANSITION,
  bcfScene,
  bcfSceneReduced,
} from "@/components/Sections/bcf/bcfMotion";

type BcfShellProps = {
  showLogo?: boolean;
  /** Optional full-bleed background image (template until VIP assets arrive). */
  backgroundImage?: string;
  /** Extra class for the dark scrim over the background image. */
  overlayClassName?: string;
  /** Optional custom background layer (e.g. DomeGallery on one page only). */
  backgroundSlot?: React.ReactNode;
  /** Background for scenes that carry no photograph. */
  backgroundStyle?: React.CSSProperties;
  /** Slow ken-burns push on the backdrop. Off for maps, where drift misleads. */
  drift?: boolean;
  children: React.ReactNode;
  className?: string;
};

function BcfLogoMark() {
  return (
    <div className="pointer-events-none absolute left-10 top-10 z-30">
      <img
        src={bcfLogo}
        alt="Barzani Charity Foundation"
        decoding="async"
        className="h-[172px] w-auto"
        style={{ filter: "drop-shadow(0 10px 28px rgba(0,0,0,0.55))" }}
      />
    </div>
  );
}

/**
 * The one back control for the whole experience. Every screen previously drew
 * its own — at three different insets, one of them a bare text row — which is
 * exactly the kind of drift a visitor reads as "unfinished" without being able
 * to name it.
 */
export function BcfBackButton({
  onClick,
  label,
  className = "",
}: {
  onClick: () => void;
  label: string;
  className?: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={label}
      whileTap={BCF_TAP_FIRM}
      transition={BCF_TAP_TRANSITION}
      className={`absolute right-10 top-10 z-40 grid h-[76px] w-[76px] place-items-center rounded-full border border-[#fbc158]/35 bg-black/45 backdrop-blur-md ${className}`}
      style={{ boxShadow: "0 10px 34px rgba(0,0,0,0.45)" }}
    >
      <ChevronLeft className="h-9 w-9" style={{ color: BCF.sand }} />
    </motion.button>
  );
}

/**
 * Scene shell. Owns the entrance/exit dissolve (so `AnimatePresence` in Bcf.tsx
 * gets it for free on every screen) and the three texture layers — drift, grain,
 * vignette — that give the photography depth instead of leaving it flat under a
 * single black scrim.
 */
export default function BcfShell({
  showLogo = true,
  backgroundImage,
  overlayClassName = "bg-black/50",
  backgroundSlot,
  backgroundStyle,
  drift = true,
  children,
  className = "",
}: BcfShellProps) {
  const reduceMotion = useReducedMotion();
  const driftAnimation =
    drift && !reduceMotion ? { scale: [1.04, 1.11] } : undefined;

  return (
    <motion.section
      className={`${BCF_PAGE} ${className}`}
      variants={reduceMotion ? bcfSceneReduced : bcfScene}
      initial="initial"
      animate="animate"
      exit="exit"
      style={backgroundStyle}
    >
      {backgroundSlot ? (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {backgroundSlot}
          <div className={`absolute inset-0 ${overlayClassName}`} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/65" />
        </div>
      ) : backgroundImage ? (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <motion.img
            src={backgroundImage}
            alt=""
            decoding="async"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
            initial={driftAnimation ? { scale: 1.04 } : undefined}
            animate={driftAnimation}
            transition={BCF_DRIFT_TRANSITION}
          />
          <div className={`absolute inset-0 ${overlayClassName}`} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/65" />
        </div>
      ) : null}

      {/* Texture stack — always above the backdrop, always below the content. */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={BCF_BLOOM_STYLE}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.09]"
        style={BCF_GRAIN_STYLE}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[3]"
        style={BCF_VIGNETTE_STYLE}
      />

      {showLogo ? <BcfLogoMark /> : null}
      <div className="relative z-10 flex min-h-[1920px] w-full flex-1 flex-col">
        {children}
      </div>
    </motion.section>
  );
}
