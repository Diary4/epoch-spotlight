import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Entrance animation for System detail pages (Government, Parliament, Presidency, PM).
 * Hero, intro, cards, and panels animate in parallel on load.
 */
export function useSystemDetailAnimation(deps: unknown[] = []) {
  const rootRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const back = ".system-detail-back";
      const hero = ".system-detail-hero";
      const intro = ".system-detail-intro > *";
      const cards = ".system-detail-card";
      const panels = ".system-detail-panel";
      const extras = ".system-detail-extra";

      const all = [back, hero, intro, cards, panels, extras];

      if (reducedMotion) {
        gsap.set(all, { autoAlpha: 1, clearProps: "transform" });
        return;
      }

      gsap.set(back, { autoAlpha: 0, scale: 0.85 });
      gsap.set(hero, { autoAlpha: 0, scale: 1.07, transformOrigin: "center center" });
      gsap.set(intro, { autoAlpha: 0, y: 28 });
      gsap.set(cards, { autoAlpha: 0, y: 48 });
      gsap.set(panels, { autoAlpha: 0, y: 40 });
      gsap.set(extras, { autoAlpha: 0, y: 32 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.to(back, { autoAlpha: 1, scale: 1, duration: 0.55 }, 0)
        .to(hero, { autoAlpha: 1, scale: 1, duration: 1.25, stagger: 0.12 }, 0)
        .to(intro, { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.75 }, 0)
        .to(cards, { autoAlpha: 1, y: 0, stagger: 0.16, duration: 0.8 }, 0.18)
        .to(panels, { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.14 }, 0.32)
        .to(extras, { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.7 }, 0.42);
    }, rootRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return rootRef;
}
