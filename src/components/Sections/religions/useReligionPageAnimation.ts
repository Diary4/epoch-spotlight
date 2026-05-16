import { useEffect, type RefObject } from "react";
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

  useEffect(() => {
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
        gsap.set(hero, { autoAlpha: 0, scale: 1.04 });
      }
      gsap.set(animate, { autoAlpha: 0, y: 24 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      if (controls) {
        tl.to(controls, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.06 });
      }

      if (hero) {
        tl.to(
          hero,
          { autoAlpha: 1, scale: 1, duration: 0.9 },
          controls ? "-=0.1" : 0,
        );
      }

      tl.to(
        animate,
        { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.08 },
        hero || controls ? "-=0.25" : 0,
      );
    }, scope);

    return () => ctx.revert();
  }, deps);
}
