import { useLayoutEffect, useRef } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { gsap } from "gsap";
import { NATURAL_PLACES } from "@/data/naturalPlaces";

const detailFields = [
  ["Distance from Erbil", "distanceFromErbil"],
  ["Best time to visit", "bestTimeToVisit"],
  ["Visitor experience", "visitorExperience"],
  ["Travel guidance", "travelGuidance"],
  ["Accommodation", "accommodation"],
];

const TouristicDetail = () => {
  const { id } = useParams();
  const rootRef = useRef<HTMLElement | null>(null);
  const place = NATURAL_PLACES.find((item) => item.id === id);

  useLayoutEffect(() => {
    if (!rootRef.current || !place) return;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const back = "[data-place-back='true']";
      const heroImage = "[data-place-hero-image='true']";
      const heroText = "[data-place-hero-text='true'] > *";
      const intro = "[data-place-intro='true']";
      const cards = "[data-place-card='true']";

      if (reducedMotion) {
        gsap.set([back, heroImage, heroText, intro, cards], {
          autoAlpha: 1,
          clearProps: "transform",
        });
        return;
      }

      gsap.set(back, { autoAlpha: 0, scale: 0.86 });
      gsap.set(heroImage, {
        autoAlpha: 0,
        scale: 1.08,
        transformOrigin: "center center",
      });
      gsap.set(heroText, { autoAlpha: 0, y: 30 });
      gsap.set(intro, { autoAlpha: 0, y: 32 });
      gsap.set(cards, { autoAlpha: 0, y: 44 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.to(heroImage, { autoAlpha: 1, scale: 1, duration: 1.15 }, 0)
        .to(back, { autoAlpha: 1, scale: 1, duration: 0.55 }, 0.08)
        .to(heroText, { autoAlpha: 1, y: 0, stagger: 0.09, duration: 0.75 }, 0.2)
        .to(intro, { autoAlpha: 1, y: 0, duration: 0.75 }, 0.48)
        .to(cards, { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.75 }, 0.62);
    }, rootRef);

    return () => ctx.revert();
  }, [place]);

  if (!place) {
    return <Navigate to="/touristic" replace />;
  }

  return (
    <main
      ref={rootRef}
      className="min-h-screen w-screen overflow-x-hidden bg-[#071014] text-white selection:bg-[#c89b52]/30"
    >
      <section className="relative h-[60vh] min-h-[500px] w-full">
        <img
          data-place-hero-image="true"
          src={place.image}
          alt={place.name}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071014] via-[#071014]/60 to-transparent" />

        <div
          data-place-back="true"
          className="absolute left-6 top-8 z-20 sm:left-10 lg:left-14"
        >
          <Link
            to="/touristic"
            className="inline-flex items-center gap-2 rounded-full border border-[#c89b52]/35 bg-black/25 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-[#e6d8bd] backdrop-blur-md transition hover:bg-[#c89b52]/20 hover:text-white"
          >
            <span>←</span> Back
          </Link>
        </div>

        <div
          data-place-hero-text="true"
          className="absolute bottom-0 left-0 w-full px-6 pb-12 sm:px-12 md:px-20 lg:px-32"
        >
          <p className="text-[12px] uppercase tracking-[0.38em] text-[#d6a45b] drop-shadow-md">
            {place.role}
          </p>
          <h1 className="mt-4 font-serif text-4xl uppercase tracking-[0.15em] text-[#f2eee5] drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] sm:text-5xl md:text-6xl lg:text-7xl">
            {place.name}
          </h1>
          <div className="mt-6 flex items-center gap-4">
            <span className="h-px w-12 bg-[#d6a45b]/80" />
            <p className="text-sm uppercase tracking-[0.25em] text-white/80">
              {place.location}
            </p>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[1200px] px-6 py-16 sm:px-12 md:px-20 lg:px-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(186,140,84,0.05),transparent_40%)]" />

        <div data-place-intro="true" className="relative z-10 max-w-3xl">
          <p className="text-lg font-light leading-relaxed text-white/80 sm:text-xl sm:leading-loose">
            {place.description}
          </p>
        </div>

        <div className="relative z-10 mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {detailFields.map(([label, key]) => (
            <div
              key={key}
              data-place-card="true"
              className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm transition-colors hover:bg-white/[0.04]"
            >
              <h3 className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#d6a45b]/90">
                {label}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
                {place[key]}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default TouristicDetail;
