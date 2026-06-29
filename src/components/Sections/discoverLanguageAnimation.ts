import gsap from "gsap";

const LANG_SELECTOR = "[data-discover-lang='true']";

export function animateDiscoverLanguageOut(
  scope: HTMLElement,
  onComplete: () => void,
): gsap.core.Tween {
  return gsap.to(scope.querySelectorAll(LANG_SELECTOR), {
    autoAlpha: 0,
    y: 14,
    duration: 0.3,
    stagger: 0.025,
    ease: "power2.in",
    onComplete,
  });
}

export function animateDiscoverLanguageIn(scope: HTMLElement): gsap.core.Tween {
  return gsap.fromTo(
    scope.querySelectorAll(LANG_SELECTOR),
    { autoAlpha: 0, y: -14 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.45,
      stagger: 0.04,
      ease: "power2.out",
    },
  );
}
