import { useCallback, useRef, type RefObject } from "react";
import gsap from "gsap";

/**
 * Smooth "open" transition shared across religion pages.
 *
 * Fades and lifts the current page out before the caller swaps to the next
 * page, so opening a card reads as one continuous motion into that page's own
 * entrance animation instead of a hard cut (matters on the showcase display).
 *
 * Usage:
 *   const { runExit, resetExit } = useSectionExit(sectionRef);
 *   // navigate:   runExit(() => setSubPage("timeline"))
 *   // on hub (re)mount / entrance effect:   resetExit()
 */
export function useSectionExit(sectionRef: RefObject<HTMLElement | null>) {
  const navigating = useRef(false);

  const runExit = useCallback(
    (onDone: () => void) => {
      if (navigating.current) return;

      const scope = sectionRef.current;
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!scope || prefersReduced) {
        onDone();
        return;
      }

      navigating.current = true;
      gsap.to(scope, {
        autoAlpha: 0,
        y: -14,
        duration: 0.6,
        ease: "power2.in",
        onComplete: onDone,
      });
    },
    [sectionRef],
  );

  // Call when the page is shown again so a later open can fade once more.
  const resetExit = useCallback(() => {
    navigating.current = false;
  }, []);

  return { runExit, resetExit };
}
