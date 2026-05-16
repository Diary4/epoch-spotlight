import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Entrance animation for Journey milestone detail pages.
 * Hero image, intro copy, and cards animate in parallel on load.
 */
export function useJourneyDetailAnimation(deps: unknown[] = []) {
  const rootRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const back = ".journey-detail-back";
      const hero = ".journey-detail-hero";
      const intro = ".journey-detail-intro > *";
      const cards = ".journey-detail-card";

      if (reducedMotion) {
        gsap.set([back, hero, intro, cards], { autoAlpha: 1, clearProps: "transform" });
        return;
      }

      gsap.set(back, { autoAlpha: 0, scale: 0.85 });
      gsap.set(hero, { autoAlpha: 0, scale: 1.07, transformOrigin: "center center" });
      gsap.set(intro, { autoAlpha: 0, y: 28 });
      gsap.set(cards, { autoAlpha: 0, y: 48 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.to(back, { autoAlpha: 1, scale: 1, duration: 0.55 }, 0)
        .to(hero, { autoAlpha: 1, scale: 1, duration: 1.25 }, 0)
        .to(intro, { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.75 }, 0)
        .to(cards, { autoAlpha: 1, y: 0, stagger: 0.16, duration: 0.8 }, 0.18);
    }, rootRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return rootRef;
}
