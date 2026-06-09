import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function useLibraryPageAnimation(
  scopeRef: RefObject<HTMLElement | null>,
  deps: unknown[] = [],
) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      const header = "[data-library-header]";
      const heroText = "[data-library-hero-text] > *";
      const heroImage = "[data-library-hero-image]";
      const sections = "[data-library-section]";
      const items = "[data-library-item]";

      if (prefersReducedMotion()) {
        gsap.set([header, heroText, heroImage, sections, items], {
          autoAlpha: 1,
          y: 0,
          x: 0,
          scale: 1,
        });
        return;
      }

      gsap.set(header, { autoAlpha: 0, y: -14 });
      gsap.set(heroText, { autoAlpha: 0, y: 22 });
      gsap.set(heroImage, { autoAlpha: 0, x: 28, scale: 1.02 });
      gsap.set(sections, { autoAlpha: 0, y: 32 });
      gsap.set(items, { autoAlpha: 0, y: 18 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.to(header, { autoAlpha: 1, y: 0, duration: 0.5 })
        .to(heroText, { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.08 }, "-=0.25")
        .to(heroImage, { autoAlpha: 1, x: 0, scale: 1, duration: 0.85 }, "-=0.45")
        .to(sections, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1 }, "-=0.35")
        .to(items, { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.06 }, "-=0.45");
    }, scope);

    return () => ctx.revert();
  }, deps);
}
