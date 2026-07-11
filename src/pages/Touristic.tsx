import { useCallback, useEffect, useLayoutEffect, useMemo, useState, useRef } from "react";
import { useListScrollRestoration } from "@/hooks/useListScrollRestoration";
import {
  TOURISTIC_LIST_KEY,
  readListScrollPosition,
  restoreListScrollPositionWithRetry,
  saveListScrollPosition,
} from "@/lib/listScrollRestoration";
import { ArrowUp } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { CITY_CATEGORIES, getCityCategory, getPlacesByCity } from "@/data/touristicPlaces";

// GSAP Imports
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const placeCategories = CITY_CATEGORIES;

const NaturalPlaces = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const activeCategoryId = searchParams.get("category") ?? placeCategories[0].id;
  
  const rootRef = useRef<HTMLElement | null>(null);

  const refreshScrollTriggers = useCallback(() => {
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  useListScrollRestoration(TOURISTIC_LIST_KEY, activeCategoryId, refreshScrollTriggers);

  const handleOpenPlace = useCallback(
    (placeId: string) => {
      saveListScrollPosition(TOURISTIC_LIST_KEY, activeCategoryId, placeId);
    },
    [activeCategoryId],
  );

  const activeCategory = getCityCategory(activeCategoryId);

  const places = useMemo(() => getPlacesByCity(activeCategoryId), [activeCategoryId]);

  // GSAP Page Load & Category Transition Entrance Animation
  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      const eyebrow = "[data-places-eyebrow='true']";
      const title = "[data-places-title='true']";
      const categoryButtons = "[data-places-category='true']";
      const backBtn = "[data-places-back='true']";
      const line = "[data-places-line='true']";

      gsap.set([eyebrow, title, categoryButtons, backBtn], { autoAlpha: 0, y: 15 });
      gsap.set(line, { scaleY: 0, transformOrigin: "top center" });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.05)
        .to(title, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.12)
        .to(backBtn, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.18)
        .to(categoryButtons, { autoAlpha: 1, y: 0, stagger: 0.04, duration: 0.5 }, 0.22)
        .to(
          line,
          { 
            scaleY: 1, 
            duration: 1.0, 
            ease: "power1.inOut", 
            onComplete: () => ScrollTrigger.refresh() 
          }, 
          0.15
        );
    }, rootRef);

    return () => ctx.revert();
  }, [activeCategoryId]);

  // GSAP Choreographed Scroll Effect for Images, Titles, and Dots
  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const items = rootRef.current.querySelectorAll(".timeline-item");

      items.forEach((item) => {
        const index = parseInt(item.getAttribute("data-index") || "0", 10);
        const isEven = index % 2 === 0;

        // Target individual components of the timeline card
        const textContent = item.querySelector("[data-animate-text='true']");
        const imageContainer = item.querySelector("[data-animate-image='true']");
        const dot = item.querySelector("[data-animate-dot='true']");
        const mobileImage = item.querySelector("[data-animate-mobile-image='true']");

        // Set initial positions off-screen/faded
        gsap.set(dot, { scale: 0, autoAlpha: 0 });
        gsap.set(textContent, { opacity: 0, x: isEven ? -40 : 40 });
        gsap.set(imageContainer, { opacity: 0, x: isEven ? 40 : -40 });
        gsap.set(mobileImage, { opacity: 0, y: 30 });

        // Trigger 1: Reveal from the bottom of the screen
        ScrollTrigger.create({
          trigger: item,
          start: "top bottom-=100px", 
          onEnter: () => {
            gsap.to(dot, { scale: 1, autoAlpha: 1, duration: 0.5, ease: "back.out(1.5)" });
            gsap.to(textContent, { opacity: 1, x: 0, duration: 0.75, ease: "power2.out" });
            gsap.to(imageContainer, { opacity: 1, x: 0, duration: 0.75, ease: "power2.out" });
            gsap.to(mobileImage, { opacity: 1, y: 0, duration: 0.75, ease: "power2.out" });
          },
          onLeaveBack: () => {
            gsap.to(dot, { scale: 0, autoAlpha: 0, duration: 0.4 });
            gsap.to(textContent, { opacity: 0, x: isEven ? -40 : 40, duration: 0.5 });
            gsap.to(imageContainer, { opacity: 0, x: isEven ? 40 : -40, duration: 0.5 });
            gsap.to(mobileImage, { opacity: 0, y: 30, duration: 0.5 });
          }
        });

        // Trigger 2: Fade away at the top of the window
        ScrollTrigger.create({
          trigger: item,
          start: "bottom top+=150px",
          onEnter: () => {
            gsap.to([dot, textContent, imageContainer, mobileImage], {
              opacity: 0,
              y: -30,
              duration: 0.5,
              stagger: 0.05,
              ease: "power2.in"
            });
          },
          onLeaveBack: () => {
            gsap.to(dot, { scale: 1, autoAlpha: 1, y: 0, duration: 0.5 });
            gsap.to(textContent, { opacity: 1, x: 0, y: 0, duration: 0.6 });
            gsap.to(imageContainer, { opacity: 1, x: 0, y: 0, duration: 0.6 });
            gsap.to(mobileImage, { opacity: 1, y: 0, duration: 0.6 });
          }
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, [places]);

  // Restore scroll positions once images are laid out
  useEffect(() => {
    const snapshot = readListScrollPosition(TOURISTIC_LIST_KEY);
    if (!snapshot || snapshot.category !== activeCategoryId) return;
    if (window.scrollY > 80 && snapshot.y > window.scrollY + 40) return;

    restoreListScrollPositionWithRetry(
      TOURISTIC_LIST_KEY,
      activeCategoryId,
      refreshScrollTriggers,
    );
  }, [places, activeCategoryId, refreshScrollTriggers]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 520);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main ref={rootRef} className="min-h-screen w-screen overflow-x-hidden bg-[#faf8f5] text-stone-800">
      <section className="relative mx-auto min-h-screen w-full bg-[#faf8f5]">
        {/* Soft elegant warm background lighting */}
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(186,140,84,0.1),transparent_40%),linear-gradient(180deg,#faf8f5_0%,#f5f2eb_100%)]" />
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(250,248,245,0.4)_90%)]" />

        {/* Header */}
        <header className="relative z-30 flex items-center justify-between gap-4 px-6 pb-12 pt-8 sm:px-10 lg:px-14">
          <div className="min-w-0">
            <p data-places-eyebrow="true" className="text-[11px] uppercase tracking-[0.38em] text-[#d6a45b] font-semibold">
              Kurdistan
            </p>
            <h1 data-places-title="true" className="mt-2 font-serif text-3xl uppercase tracking-[0.2em] text-stone-900 sm:text-4xl">
              {activeCategory.en}
            </h1>
            <div className="mt-5 flex flex-wrap gap-2">
              {placeCategories.map((category) => {
                const isActive = category.id === activeCategory.id;

                return (
                  <button
                    key={category.id}
                    type="button"
                    data-places-category="true"
                    onClick={() => setSearchParams({ category: category.id })}
                    className={`rounded-full border px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] backdrop-blur-sm transition ${
                      isActive
                        ? "border-[#d6a45b] bg-[#c89b52]/10 text-stone-900"
                        : "border-stone-200 bg-white/55 text-stone-600 hover:border-[#c89b52]/50 hover:text-stone-800"
                    }`}
                  >
                    {category.en}
                  </button>
                );
              })}
            </div>
          </div>

          <Link
            to="/screen-1"
            data-places-back="true"
            className="shrink-0 rounded-full border border-stone-200 bg-white/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-stone-700 backdrop-blur-sm transition hover:bg-stone-50 sm:px-5"
          >
            Back
          </Link>
        </header>

        {/* Timeline Container */}
        <div className="relative z-20 w-full max-w-6xl mx-auto px-6 pb-24">
          {/* Vertical Central Line */}
          <div data-places-line="true" className="absolute left-8 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#d6a45b]/10 via-[#d6a45b]/35 to-[#d6a45b]/10 -translate-x-1/2" />

          <div className="flex flex-col gap-16 md:gap-24">
            {places.map((place, index) => {
              const isEven = index % 2 === 0;

              return (
                <article
                  key={place.id}
                  id={`touristic-place-${place.id}`}
                  data-index={index}
                  className="timeline-item relative group w-full scroll-mt-24"
                >
                  <Link
                    to={`/touristic/${activeCategory.id}/${place.id}`}
                    onClick={() => handleOpenPlace(place.id)}
                    className="relative flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-16 items-center w-full"
                  >
                    {/* Left Column (Desktop) */}
                    <div
                      className={`w-full pl-16 md:pl-0 flex flex-col justify-center ${
                        isEven
                          ? "md:items-end md:text-right md:pr-12"
                          : "hidden md:flex md:items-start md:text-left md:pr-12"
                      }`}
                    >
                      {isEven ? (
                        <div data-animate-text="true" className="max-w-md">
                          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#d6a45b]">
                            {place.role}
                          </span>
                          <h2 className="mt-1 font-serif text-xl uppercase tracking-[0.15em] text-stone-900 transition duration-300 group-hover:text-[#d6a45b] sm:text-2xl">
                            {place.name}
                          </h2>
                          <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-stone-600">
                            {place.description}
                          </p>
                        </div>
                      ) : (
                        // Desktop Left Side Full-Width Image Preview
                        <div data-animate-image="true" className="relative w-full h-[280px] lg:h-[340px] overflow-hidden rounded-xl border border-stone-200 transition duration-500 group-hover:border-[#c89b52]/40">
                          <img
                            src={place.image}
                            alt={place.name}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                          {/* Inner shadow applying an off-white border bleed effect */}
                          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_#faf8f5]" />
                        </div>
                      )}
                    </div>

                    {/* Central Timeline Dot (Circle Thumbnail) */}
                    <div data-animate-dot="true" className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-[#d6a45b]/40 bg-[#faf8f5] overflow-hidden flex items-center justify-center p-0.5 shadow-[0_4px_12px_rgba(0,0,0,0.05)] group-hover:border-[#d6a45b] group-hover:scale-105 group-hover:shadow-[0_4px_18px_rgba(214,164,91,0.2)] transition duration-300">
                        <img
                          src={place.image}
                          alt=""
                          className="h-full w-full rounded-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Right Column (Desktop) */}
                    <div
                      className={`w-full pl-16 md:pl-0 flex flex-col justify-center ${
                        !isEven
                          ? "md:items-start md:text-left md:pl-12"
                          : "hidden md:flex md:items-start md:text-left md:pl-12"
                      }`}
                    >
                      {!isEven ? (
                        <div data-animate-text="true" className="max-w-md">
                          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#d6a45b]">
                            {place.role}
                          </span>
                          <h2 className="mt-1 font-serif text-xl uppercase tracking-[0.15em] text-stone-900 transition duration-300 group-hover:text-[#d6a45b] sm:text-2xl">
                            {place.name}
                          </h2>
                          <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-stone-600">
                            {place.description}
                          </p>
                        </div>
                      ) : (
                        // Desktop Right Side Full-Width Image Preview
                        <div data-animate-image="true" className="relative w-full h-[280px] lg:h-[340px] overflow-hidden rounded-xl border border-stone-200 transition duration-500 group-hover:border-[#c89b52]/40">
                          <img
                            src={place.image}
                            alt={place.name}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                          {/* Inner shadow applying an off-white border bleed effect */}
                          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_#faf8f5]" />
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Mobile-only Image Preview */}
                  <div data-animate-mobile-image="true" className="mt-4 ml-16 mr-4 block md:hidden">
                    <Link
                      to={`/touristic/${activeCategory.id}/${place.id}`}
                      onClick={() => handleOpenPlace(place.id)}
                      className="relative block w-full h-[200px] overflow-hidden rounded-xl border border-stone-200"
                    >
                      <img
                        src={place.image}
                        alt={place.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                      {/* Inner shadow applying an off-white border bleed effect */}
                      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_#faf8f5]" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-20 pb-10 text-center text-[11px] uppercase tracking-[0.28em] text-[#d6a45b] font-medium">
          {places.length} places in {activeCategory.en}
        </footer>

        {/* Scroll To Top */}
        <button
          type="button"
          aria-label="Scroll to top"
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full border border-stone-200 bg-white/95 text-stone-800 shadow-[0_8px_24px_rgba(0,0,0,0.06)] backdrop-blur-md transition duration-300 hover:border-[#d6a45b] hover:bg-stone-50 sm:bottom-8 sm:right-8 ${
            showScrollTop
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none translate-y-3 opacity-0"
          }`}
        >
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </button>
      </section>
    </main>
  );
};

export default NaturalPlaces;