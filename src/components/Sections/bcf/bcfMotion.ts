import type { Transition, Variants } from "motion/react";
import { BCF_LOW_POWER } from "@/components/Sections/bcf/bcfPerf";

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
 *
 * And on the low tier it is dropped, because that scale is the single reason
 * the heavier chapters arrive worse than the lighter ones.
 *
 * It sits on the scene root, so for the 660ms of the entrance every layer
 * inside the scene is being drawn at a size that changes on every frame:
 * the full-bleed photograph, the atmosphere gradients, the grain grid, and
 * each of the borders, rounded corners, shadows and text runs the chapter
 * lays over them. Chromium cannot composite a scale it has to keep sharp — it
 * re-rasterises the subtree — so the bill is proportional to how much the
 * chapter puts on screen, at the 2× the 4K portrait panel draws the artboard.
 * The Future and Legacy pages mount about twenty elements and feel weightless.
 * Trust mounts a hundred and sixteen and animates thirty-three of them, and
 * pays that same bill a hundred times over on the one frame the visitor is
 * actually watching.
 *
 * Nobody at kiosk distance can name a 1.2% scale. Everybody can see a chapter
 * stutter on the way in. So the low tier keeps the dissolve — which composites
 * on the GPU whatever is inside it — and lets the depth go. Same trade the
 * rest of this experience already makes; see bcfPerf.ts.
 */
const SCENE_DEPTH = !BCF_LOW_POWER;

export const bcfScene: Variants = {
  initial: { opacity: 0, ...(SCENE_DEPTH ? { scale: 1.012 } : null) },
  animate: {
    opacity: 1,
    ...(SCENE_DEPTH ? { scale: 1 } : null),
    transition: { duration: 0.66, ease: BCF_EASE, when: "beforeChildren" },
  },
  exit: {
    opacity: 0,
    ...(SCENE_DEPTH ? { scale: 0.995 } : null),
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

/**
 * For cards and tiles: rises and settles out of a slight recess.
 *
 * The 1.5% recess comes off on the low tier for the same reason the scene's
 * does, and it matters more here than it looks: a card is a rounded border
 * over a gradient with a wide shadow and a photograph inside it, and a grid of
 * them all animate at once. Rising them on `y` alone is a transform the
 * compositor can carry; rising them on `y` and `scale` makes it redraw every
 * card on every frame of the stagger.
 */
export const bcfRiseCard: Variants = {
  initial: { opacity: 0, y: 44, ...(SCENE_DEPTH ? { scale: 0.985 } : null) },
  animate: {
    opacity: 1,
    y: 0,
    ...(SCENE_DEPTH ? { scale: 1 } : null),
    transition: { duration: 0.78, ease: BCF_EASE },
  },
};

/**
 * Dialog panels — the donate card and the idle warning.
 *
 * These carry the most expensive paint in the experience for their size: a
 * 48px radius over a gradient, an inset hairline, and a `0 40px 120px` shadow.
 * A 120px gaussian around an 860px panel is a raster region well over a
 * thousand pixels square, and the panel draws at 2× on the portrait screen.
 * Scaling it meant re-rendering that blur on every frame of the entrance —
 * which is the stutter the donate screen kept showing even after its QR stopped
 * being twelve hundred SVG subpaths.
 *
 * The rise stays: `y` is a transform and the compositor carries it. Only the
 * scale goes, and only on the low tier.
 */
export const BCF_PANEL_MOTION = {
  initial: { opacity: 0, y: 40, ...(SCENE_DEPTH ? { scale: 0.97 } : null) },
  animate: { opacity: 1, y: 0, ...(SCENE_DEPTH ? { scale: 1 } : null) },
  exit: { opacity: 0, y: 20, ...(SCENE_DEPTH ? { scale: 0.98 } : null) },
} as const;

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
