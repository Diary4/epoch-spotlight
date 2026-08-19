import React from "react";
import { ChevronLeft } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { bcfLogo } from "@/components/Sections/bcf/bcfAssets";

/**
 * React 18 note: this must stay lowercase and be applied via a spread.
 *
 * `react-dom@18.3.1` does not know the camelCase `fetchPriority` prop — it warns
 * and drops it, so the hint never reaches the DOM — while `@types/react@18.3`
 * already declares it, which makes the correct lowercase spelling look like a
 * type error. Spreading keeps the spelling the runtime needs without a cast.
 * On React 19 this can become a plain `fetchPriority` prop.
 */
const HIGH_FETCH_PRIORITY = { fetchpriority: "high" };
import {
  BCF,
  BCF_ATMOSPHERE_STYLE,
  BCF_BLEED_STYLE,
  BCF_GRAIN_STYLE,
  BCF_PAGE,
} from "@/components/Sections/bcf/bcfTheme";
import {
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
  /** Top-to-bottom fade over the photograph. Off when the plate should stay visible. */
  overlayFade?: boolean;
  /** Optional custom background layer (e.g. DomeGallery on one page only). */
  backgroundSlot?: React.ReactNode;
  /** Background for scenes that carry no photograph. */
  backgroundStyle?: React.CSSProperties;
  /** Slow ken-burns push on the backdrop. Off for maps, where drift misleads. */
  drift?: boolean;
  /** Soften the full-bleed plate. Scale up so the blur does not show empty edges. */
  backgroundBlur?: boolean;
  /**
   * Warm bloom / grain / vignette stack. Turn off for flat scenes (e.g. the
   * impact dome galleries) where those layers fight the dome's own edge fade.
   */
  atmosphere?: boolean;
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
      />
    </div>
  );
}

/**
 * The one back control for the whole experience. Every screen previously drew
 * its own — at three different insets, one of them a bare text row — which is
 * exactly the kind of drift a visitor reads as "unfinished" without being able
 * to name it.
 *
 * It sits in the top-left corner, and it is pinned to the *physical* left in
 * every language rather than to the logical start.
 *
 * That looks backwards for Kurdish and Arabic until you look at the corner it
 * came from. Back used to share the top right with the home/language rail,
 * stacked one above the other — a column of circles running 300px down the
 * right edge of the artboard. In an RTL layout the page title starts at that
 * same edge, so "لەسەر سنوورەکان" was printed straight through the rail. Every
 * screen then carried its own bit of clearance for the corner: a `pr-[150px]`
 * here, an extra hundred pixels of top padding there.
 *
 * Splitting the pair fixes all of it at once. Back owns the left corner, the
 * rail owns the right, both in every language, and the title in between has
 * the full width. The chevron still turns round in RTL, so the arrow points
 * the way the visitor came from even though the button does not move.
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
      className={`absolute left-10 top-10 z-40 grid h-[76px] w-[76px] place-items-center rounded-full border border-[#fbc158]/35 bg-black/45 backdrop-blur-md ${className}`}
      style={{ boxShadow: "0 10px 34px rgba(0,0,0,0.45)" }}
    >
      <ChevronLeft className="h-9 w-9 rtl:rotate-180" style={{ color: BCF.sand }} />
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
  showLogo = false,
  backgroundImage,
  overlayClassName = "bg-black/50",
  overlayFade = true,
  backgroundSlot,
  backgroundStyle,
  drift = true,
  backgroundBlur = false,
  atmosphere = true,
  children,
  className = "",
}: BcfShellProps) {
  const reduceMotion = useReducedMotion();
  // The ken-burns push is a CSS animation (`.bcf-drift` in index.css) rather
  // than a `motion` one. It runs for as long as the screen is up, and driven
  // from JS that meant a style write on the main thread every frame, forever,
  // competing with the taps. On the compositor it is free. `prefers-reduced-
  // motion` is handled in the stylesheet alongside the keyframes.
  const driftClass = drift && !reduceMotion ? "bcf-drift" : "";
  const blurClass = backgroundBlur ? "scale-[1.12] blur-[22px]" : "";

  return (
    <motion.section
      className={`${BCF_PAGE} ${className}`}
      variants={reduceMotion ? bcfSceneReduced : bcfScene}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* The scenes that carry no photograph paint a field instead. It used to
          be the section's own background, which stopped at the artboard; as its
          own plate it bleeds with everything else. */}
      {backgroundStyle ? (
        <div
          className="pointer-events-none absolute z-0"
          style={{ ...BCF_BLEED_STYLE, ...backgroundStyle }}
        />
      ) : null}

      {backgroundSlot ? (
        <div
          className="pointer-events-none absolute z-0 overflow-hidden"
          style={BCF_BLEED_STYLE}
        >
          {backgroundSlot}
          <div className={`absolute inset-0 ${overlayClassName}`} />
          {overlayFade ? (
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/65" />
          ) : null}
        </div>
      ) : backgroundImage ? (
        <div
          className="pointer-events-none absolute z-0 overflow-hidden"
          style={BCF_BLEED_STYLE}
        >
          <img
            src={backgroundImage}
            alt=""
            decoding="async"
            {...HIGH_FETCH_PRIORITY}
            className={`absolute inset-0 h-full w-full object-cover ${driftClass} ${blurClass}`}
          />
          <div className={`absolute inset-0 ${overlayClassName}`} />
          {overlayFade ? (
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/65" />
          ) : null}
        </div>
      ) : null}

      {/* Texture stack — always above the backdrop, always below the content.
          Bloom and vignette share one element (see BCF_ATMOSPHERE_STYLE): they
          are both static gradients, and a separate layer for each only doubled
          the compositor memory the scene needs. */}
      {atmosphere ? (
        <>
          <div
            className="pointer-events-none absolute z-[1]"
            style={{ ...BCF_BLEED_STYLE, ...BCF_ATMOSPHERE_STYLE }}
          />
          <div
            className="pointer-events-none absolute z-[2] opacity-[0.09]"
            style={{ ...BCF_BLEED_STYLE, ...BCF_GRAIN_STYLE }}
          />
        </>
      ) : null}
      {showLogo ? <BcfLogoMark /> : null}
      {/* The clip that used to be on the section. The composition is still held
          to the artboard — only the backdrop behind it is allowed out. */}
      <div className="relative z-10 flex min-h-[1920px] w-full flex-1 flex-col overflow-hidden">
        {children}
      </div>
    </motion.section>
  );
}
