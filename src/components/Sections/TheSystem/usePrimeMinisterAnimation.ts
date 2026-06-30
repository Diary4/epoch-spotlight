import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export type PrimeMinisterAnimationVariant = "main" | "list";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function isRtlRoot(root: HTMLElement) {
  const dir = root.closest("[dir]")?.getAttribute("dir");
  return dir === "rtl";
}

function animateMainPage(root: HTMLElement) {
  const rtl = isRtlRoot(root);
  const copySlideX = rtl ? 24 : -24;

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  gsap.set(".system-detail-back", { autoAlpha: 0, scale: 0.86 });
  gsap.set(".pm-hero-text > *", { autoAlpha: 0, y: 32 });
  gsap.set(".system-detail-hero", { autoAlpha: 0, y: 48, scale: 1.04 });
  gsap.set(".pm-citadel", { autoAlpha: 0, y: 36, clipPath: "inset(0 0 100% 0 round 12px)" });
  gsap.set(".pm-timeline-line", { scaleY: 0, transformOrigin: "top center" });
  gsap.set(".pm-timeline-item", { autoAlpha: 0 });
  gsap.set(".pm-timeline-icon", { scale: 0, rotation: -60, autoAlpha: 0 });
  gsap.set(".pm-timeline-copy", { autoAlpha: 0, x: copySlideX });
  gsap.set(".system-detail-card", { autoAlpha: 0, y: 44 });

  tl.to(".system-detail-back", { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(1.6)" })
    .to(".pm-hero-text > *", { autoAlpha: 1, y: 0, stagger: 0.11, duration: 0.72 }, "-=0.15")
    .to(
      ".system-detail-hero",
      { autoAlpha: 1, y: 0, scale: 1, duration: 1.05, ease: "power3.out" },
      "-=0.55",
    )
    .to(
      ".pm-citadel",
      { autoAlpha: 1, y: 0, clipPath: "inset(0 0 0% 0 round 12px)", duration: 0.95, ease: "power2.inOut" },
      "-=0.45",
    )
    .to(".pm-timeline-line", { scaleY: 1, duration: 1.15, ease: "power2.inOut" }, "-=0.35")
    .to(".pm-timeline-item", { autoAlpha: 1, duration: 0.01, stagger: 0.28 }, "-=0.95")
    .to(
      ".pm-timeline-icon",
      { scale: 1, rotation: 0, autoAlpha: 1, stagger: 0.28, duration: 0.62, ease: "back.out(2)" },
      "-=0.9",
    )
    .to(
      ".pm-timeline-copy",
      { autoAlpha: 1, x: 0, stagger: 0.28, duration: 0.68 },
      "-=0.82",
    )
    .to(
      ".system-detail-card",
      { autoAlpha: 1, y: 0, stagger: 0.16, duration: 0.78, ease: "power2.out" },
      "-=0.25",
    );
}

function animateListPage(root: HTMLElement) {
  const rtl = isRtlRoot(root);
  const slideX = rtl ? 28 : -28;

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  gsap.set(".system-detail-back", { autoAlpha: 0, scale: 0.86 });
  gsap.set(".pm-page-header > *", { autoAlpha: 0, y: 28 });
  gsap.set(".pm-ornament", { autoAlpha: 0, scale: 0.4, rotation: -90 });
  gsap.set(".pm-statement", { autoAlpha: 0, y: 24 });
  gsap.set(".pm-section-label", { autoAlpha: 0, scaleX: 0.4, transformOrigin: "center center" });
  gsap.set(".pm-list-item", { autoAlpha: 0 });
  gsap.set(".pm-list-icon", { scale: 0, rotation: -45, autoAlpha: 0 });
  gsap.set(".pm-list-copy", { autoAlpha: 0, x: slideX });
  gsap.set(".pm-list-divider", { scaleX: 0, transformOrigin: "center center", autoAlpha: 0 });
  gsap.set(".pm-footer-image", { autoAlpha: 0, y: 40, clipPath: "inset(0 0 100% 0)" });

  tl.to(".system-detail-back", { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(1.6)" })
    .to(".pm-page-header > *", { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.7 }, "-=0.1")
    .to(".pm-ornament", { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.55, ease: "back.out(2.2)" }, "-=0.35")
    .to(".pm-statement", { autoAlpha: 1, y: 0, duration: 0.75 }, "-=0.2")
    .to(
      ".pm-section-label",
      { autoAlpha: 1, scaleX: 1, duration: 0.65, ease: "power2.inOut" },
      "-=0.35",
    )
    .to(".pm-list-item", { autoAlpha: 1, duration: 0.01, stagger: 0.12 }, "-=0.15")
    .to(
      ".pm-list-icon",
      { scale: 1, rotation: 0, autoAlpha: 1, stagger: 0.12, duration: 0.55, ease: "back.out(1.9)" },
      "-=0.55",
    )
    .to(".pm-list-copy", { autoAlpha: 1, x: 0, stagger: 0.12, duration: 0.6 }, "-=0.5")
    .to(
      ".pm-list-divider",
      { scaleX: 1, autoAlpha: 1, stagger: 0.12, duration: 0.45, ease: "power2.inOut" },
      "-=0.48",
    )
    .to(
      ".pm-footer-image",
      {
        autoAlpha: 1,
        y: 0,
        clipPath: "inset(0 0 0% 0)",
        duration: 1,
        ease: "power2.inOut",
      },
      "-=0.2",
    );
}

/**
 * Choreographed entrance for Prime Minister pages — sequenced hero,
 * drawing timeline, and staggered list items.
 */
export function usePrimeMinisterAnimation(
  deps: unknown[] = [],
  variant: PrimeMinisterAnimationVariant = "main",
) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (prefersReducedMotion()) {
      const ctx = gsap.context(() => {
        gsap.set(
          [
            ".system-detail-back",
            ".pm-hero-text > *",
            ".system-detail-hero",
            ".pm-citadel",
            ".pm-timeline-line",
            ".pm-timeline-item",
            ".pm-timeline-icon",
            ".pm-timeline-copy",
            ".system-detail-card",
            ".pm-page-header > *",
            ".pm-ornament",
            ".pm-statement",
            ".pm-section-label",
            ".pm-list-item",
            ".pm-list-icon",
            ".pm-list-copy",
            ".pm-list-divider",
            ".pm-footer-image",
          ],
          { autoAlpha: 1, clearProps: "all" },
        );
      }, root);
      return () => ctx.revert();
    }

    const ctx = gsap.context(() => {
      if (variant === "main") {
        animateMainPage(root);
      } else {
        animateListPage(root);
      }
    }, root);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return rootRef;
}
