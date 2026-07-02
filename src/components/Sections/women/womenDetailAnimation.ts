import gsap from "gsap";
import type React from "react";

export function runWomenDetailIntroAnimation(sectionRef: React.RefObject<HTMLElement | null>) {
  if (!sectionRef.current) return () => {};

  const ctx = gsap.context(() => {
    const fadeTargets = "[data-women-detail-fade='true']";
    const portraitTargets = "[data-women-detail-portrait-fade='true']";

    // Portrait gets only a brief fade — no zoom — so the image reads as static.
    gsap.set(portraitTargets, { autoAlpha: 0 });
    gsap.set(fadeTargets, { autoAlpha: 0, y: 18 });

    gsap
      .timeline({ defaults: { ease: "power2.out" } })
      .to(
        portraitTargets,
        {
          autoAlpha: 1,
          duration: 0.4,
        },
        0,
      )
      .to(
        fadeTargets,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
        },
        0.18,
      )
      .eventCallback("onComplete", () => {
        gsap.set([portraitTargets, fadeTargets], { clearProps: "opacity,visibility,transform" });
      });
  }, sectionRef);

  return () => ctx.revert();
}
