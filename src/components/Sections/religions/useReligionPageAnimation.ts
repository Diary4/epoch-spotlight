import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";

export type ReligionPageAnimationSelectors = {
  hero?: string;
  animate: string;
  controls?: string;
};

/** Soft entrance timing shared across faith / nation detail pages. */
const EASE = "power2.out";
const CONTROLS_DURATION = 1.6;
const HERO_DURATION = 2;
const CONTENT_DURATION = 1.8;

export function useReligionPageAnimation(
  scopeRef: RefObject<HTMLElement | null>,
  selectors: ReligionPageAnimationSelectors,
  deps: unknown[] = [],
) {
  const { hero, animate, controls } = selectors;

  // Layout effect hides targets before paint so open doesn't flash then lag.
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      const motionTargets = [controls, hero, animate].filter(Boolean) as string[];
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReduced) {
        gsap.set(motionTargets.join(","), { autoAlpha: 1, y: 0, scale: 1 });
        return;
      }

      if (controls) {
        gsap.set(controls, { autoAlpha: 0, y: -10 });
      }
      if (hero) {
        gsap.set(hero, { autoAlpha: 0, scale: 1.03 });
      }
      gsap.set(animate, { autoAlpha: 0, y: 18 });

      const tl = gsap.timeline({ defaults: { ease: EASE } });

      if (controls) {
        tl.to(controls, {
          autoAlpha: 1,
          y: 0,
          duration: CONTROLS_DURATION,
          stagger: 0.14,
        });
      }

      if (hero) {
        tl.to(
          hero,
          { autoAlpha: 1, scale: 1, duration: HERO_DURATION },
          controls ? "-=1.2" : 0,
        );
      }

      tl.to(
        animate,
        {
          autoAlpha: 1,
          y: 0,
          duration: CONTENT_DURATION,
          stagger: 0.16,
        },
        hero || controls ? "-=1.4" : 0,
      );
    }, scope);

    return () => ctx.revert();
    // Callers pass a stable deps list for lang / page resets.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
