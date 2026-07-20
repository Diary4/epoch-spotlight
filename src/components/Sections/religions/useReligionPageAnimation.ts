import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";

export type ReligionPageAnimationSelectors = {
  hero?: string;
  animate: string;
  controls?: string;
};

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
        gsap.set(controls, { autoAlpha: 0, y: -8 });
      }
      if (hero) {
        gsap.set(hero, { autoAlpha: 0, scale: 1.02 });
      }
      gsap.set(animate, { autoAlpha: 0, y: 14 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      if (controls) {
        tl.to(controls, { autoAlpha: 1, y: 0, duration: 0.28, stagger: 0.04 });
      }

      if (hero) {
        tl.to(
          hero,
          { autoAlpha: 1, scale: 1, duration: 0.48 },
          controls ? "-=0.12" : 0,
        );
      }

      tl.to(
        animate,
        { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.04 },
        hero || controls ? "-=0.32" : 0,
      );
    }, scope);

    return () => ctx.revert();
    // Callers pass a stable deps list for lang / page resets.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
