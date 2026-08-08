import type { Transition, Variants } from "motion/react";

/**
 * Shared motion language for the BCF VIP experience.
 *
 * The rest of the app (Threads of Kurdistan) reads smooth because every scene
 * agrees on one easing curve and one rhythm: the scene itself dissolves, and its
 * content arrives a beat later on a stagger. These tokens are that agreement, so
 * a screen never has to invent its own timing.
 */

/** Same curve as `ease-smooth-out` in tailwind.config.ts and the threads scenes. */
export const BCF_EASE = [0.22, 1, 0.36, 1] as const;
/** Leaving is always quicker than arriving — the eye forgives an exit. */
export const BCF_EASE_IN = [0.4, 0, 1, 1] as const;

export const BCF_SCENE_TRANSITION: Transition = { duration: 0.66, ease: BCF_EASE };

/**
 * Scene shell transition. The 1.2% scale is deliberately below the threshold
 * where a full-bleed photo shows resampling — it reads as depth, not as a zoom.
 */
export const bcfScene: Variants = {
  initial: { opacity: 0, scale: 1.012 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.66, ease: BCF_EASE, when: "beforeChildren" },
  },
  exit: {
    opacity: 0,
    scale: 0.995,
    transition: { duration: 0.3, ease: BCF_EASE_IN },
  },
};

/** Reduced motion keeps the dissolve (it is not vestibular) but drops the scale. */
export const bcfSceneReduced: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

/** Parent that hands a staggered rise to every `bcfRise` child beneath it. */
export function bcfStagger(stagger = 0.08, delayChildren = 0.14): Variants {
  return {
    initial: {},
    animate: { transition: { staggerChildren: stagger, delayChildren } },
    exit: {},
  };
}

export const bcfRise: Variants = {
  initial: { opacity: 0, y: 34 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.72, ease: BCF_EASE } },
};

/** For cards and tiles: rises and settles out of a slight recess. */
export const bcfRiseCard: Variants = {
  initial: { opacity: 0, y: 44, scale: 0.985 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.78, ease: BCF_EASE },
  },
};

/** For pins, nodes and monograms: blooms from the centre instead of rising. */
export const bcfBloom: Variants = {
  initial: { opacity: 0, scale: 0.72 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.62, ease: BCF_EASE },
  },
};

/** Rules and dividers draw themselves along their own axis. */
export const bcfDrawX: Variants = {
  initial: { opacity: 0, scaleX: 0 },
  animate: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.9, ease: BCF_EASE },
  },
};

/**
 * Touch feedback. This runs on a kiosk, so press — not hover — is the only
 * signal a visitor ever gets; every tappable surface should carry one.
 */
export const BCF_TAP = { scale: 0.982 } as const;
export const BCF_TAP_FIRM = { scale: 0.96 } as const;
export const BCF_TAP_TRANSITION: Transition = { duration: 0.18, ease: BCF_EASE };

/*
 * The slow ken-burns drift for full-bleed backdrops used to live here as a
 * `Transition` with `repeat: Infinity`. It is now the `.bcf-drift` CSS class in
 * index.css: a never-ending transform belongs on the compositor, not in a
 * per-frame style write from the main thread. The same file holds the rest of
 * the experience's perpetual motions, for the same reason.
 */

/* -------------------------------------------------------------------------
 * Locomotive Scroll motion
 *
 * The long-read chapters follow sakharov.space, which drives its scroll with
 * Locomotive Scroll v4. Rather than approximate the feel, these are the two
 * numbers the library actually computes — the lerp it applies to the scroll
 * position every frame, and the transform it gives a `data-scroll-speed`
 * element — so a chapter here glides and drifts on the same curve.
 * ---------------------------------------------------------------------- */

/** Locomotive's default `lerp`, applied once per animation frame. */
export const LOCO_LERP = 0.1;

/** Below this the smoothed position is snapped, so the tail is not endless. */
export const LOCO_SETTLE = 0.08;

export function lerp(start: number, end: number, amount: number) {
  return (1 - amount) * start + amount * end;
}

/**
 * Locomotive's default parallax: `data-scroll-speed` is divided by ten, and the
 * element is pushed by its distance from the middle of the viewport — so it
 * sits at its laid-out position as it passes the centre of the screen and
 * drifts symmetrically either side of it.
 *
 * @param scroll        smoothed scroll position of the container
 * @param viewport      viewport height (Locomotive's `windowMiddle` is half it)
 * @param elementMiddle element centre in container coordinates, untransformed
 * @param speed         the raw `data-scroll-speed` value
 */
export function locoParallax(
  scroll: number,
  viewport: number,
  elementMiddle: number,
  speed: number,
) {
  return (scroll + viewport / 2 - elementMiddle) * -(speed / 10);
}
