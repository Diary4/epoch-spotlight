import gsap from "gsap";
import type React from "react";

export function runWomenDetailIntroAnimation(sectionRef: React.RefObject<HTMLElement | null>) {
  if (!sectionRef.current) return () => {};

  const ctx = gsap.context(() => {
    gsap.set("[data-women-detail-portrait-fade='true']", { autoAlpha: 0, scale: 1.04 });
    gsap.set("[data-women-detail-fade='true']", { autoAlpha: 0, y: 18 });

    gsap
      .timeline({ defaults: { ease: "power2.out" } })
      .to(
        "[data-women-detail-portrait-fade='true']",
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.85,
        },
        0,
      )
      .to(
        "[data-women-detail-fade='true']",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
        },
        0.18,
      );
  }, sectionRef);

  return () => ctx.revert();
}
