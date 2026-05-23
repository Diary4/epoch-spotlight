import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { useListScrollRestoration } from "@/hooks/useListScrollRestoration";
import {
  TOURISTIC_LIST_KEY,
  readListScrollPosition,
  restoreListScrollPositionWithRetry,
  saveListScrollPosition,
} from "@/lib/listScrollRestoration";
import { ArrowUp } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { NATURAL_PLACES } from "@/data/naturalPlaces";
import { HISTORICAL_PLACES } from "@/data/historicalPlaces";
import { RELIGIOUS_SITES } from "@/data/religousSites";
import { MUSEUM_CENTERS } from "@/data/museumCenters";

// GSAP Imports
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const placeCategories = [
  {
    id: "nature",
    label: "Nature",
    title: "Natural Places",
    places: NATURAL_PLACES,
  },
  {
    id: "religious",
    label: "Religious",
    title: "Religious Sites",
    places: RELIGIOUS_SITES,
  },
  {
    id: "historical",
    label: "Historical",
    title: "Historical Places",
    places: HISTORICAL_PLACES,
  },
  {
    id: "museums",
    label: "Museums",
    title: "Museum Centers",
    places: MUSEUM_CENTERS,
  },
];

const NaturalPlaces = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const activeCategoryId = searchParams.get("category") ?? placeCategories[0].id;
  
  const containerRef = useRef(null);

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

  const activeCategory =
    placeCategories.find((category) => category.id === activeCategoryId) ??
    placeCategories[0];

  const places = useMemo(
    () =>
      activeCategory.places.map((place) => ({
        ...place,
        locationLabel: place.location.split(",")[0],
      })),
    [activeCategory],
  );

  // GSAP Scroll Animation Effect
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const items = containerRef.current.querySelectorAll(".timeline-item");

      items.forEach((item) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top bottom", 
            end: "bottom top",   
            scrub: 1,            
          },
        });

        tl.fromTo(
          item,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power1.out" }
        )
          .to(item, { opacity: 1, duration: 0.3 })
          .to(item, { opacity: 0, y: -30, duration: 0.35, ease: "power1.in" });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [places]);

  // GSAP runs after first paint; restore again once timeline + images are laid out.
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
    <main className="min-h-screen w-screen overflow-x-hidden bg-[#071014] text-white">
      <section className="relative mx-auto min-h-screen w-full bg-[#071014]">
        {/* Decorative background gradients */}
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(186,140,84,0.18),transparent_28%),linear-gradient(180deg,#071014_0%,#0a1115_45%,#080d10_100%)]" />
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_24%,rgba(0,0,0,0.76)_88%)]" />
        <div className="pointer-events-none fixed inset-y-0 left-0 w-32 bg-gradient-to-r from-black/75 to-transparent md:w-44" />
        <div className="pointer-events-none fixed inset-y-0 right-0 w-32 bg-gradient-to-l from-black/75 to-transparent md:w-44" />

        {/* Header */}
        <header className="relative z-30 flex items-center justify-between gap-4 px-6 pb-12 pt-8 sm:px-10 lg:px-14">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.38em] text-[#d6a45b]/80">
              Kurdistan
            </p>
            <h1 className="mt-2 font-serif text-3xl uppercase tracking-[0.2em] text-[#f2eee5] sm:text-4xl">
              {activeCategory.title}
            </h1>
            <div className="mt-5 flex flex-wrap gap-2">
              {placeCategories.map((category) => {
                const isActive = category.id === activeCategory.id;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setSearchParams({ category: category.id })}
                    className={`rounded-full border px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] backdrop-blur-sm transition ${
                      isActive
                        ? "border-[#d6a45b]/70 bg-[#c89b52]/20 text-white"
                        : "border-white/10 bg-black/20 text-white/60 hover:border-[#c89b52]/45 hover:text-[#e6d8bd]"
                    }`}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>

          <Link
            to="/screen-1"
            className="shrink-0 rounded-full border border-[#c89b52]/35 bg-black/25 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-[#e6d8bd] backdrop-blur-sm transition hover:bg-[#c89b52]/15 sm:px-5"
          >
            Back
          </Link>
        </header>

        {/* Timeline Container scoped with containerRef */}
        <div ref={containerRef} className="relative z-20 w-full max-w-6xl mx-auto px-6 pb-24">
          {/* Vertical Central Line */}
          <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#d6a45b]/5 via-[#d6a45b]/25 to-[#d6a45b]/5 -translate-x-1/2" />

          <div className="flex flex-col gap-16 md:gap-24">
            {places.map((place, index) => {
              const isEven = index % 2 === 0;

              return (
                <article
                  key={place.id}
                  id={`touristic-place-${place.id}`}
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
                        <div className="max-w-md">
                          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#d6a45b]">
                            {place.locationLabel}
                          </span>
                          <h2 className="mt-1 font-serif text-xl uppercase tracking-[0.15em] text-[#f2eee5] transition duration-300 group-hover:text-[#d6a45b] sm:text-2xl">
                            {place.name}
                          </h2>
                          <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-white/60">
                            {place.description}
                          </p>
                        </div>
                      ) : (
                        // Desktop Left Side Full-Width Image Preview
                        <div className="relative w-full h-[280px] lg:h-[340px] overflow-hidden rounded-xl border border-white/5 transition duration-500 group-hover:border-[#c89b52]/30">
                          <img
                            src={place.image}
                            alt={place.name}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                          {/* Dark inner shadow applied only to the borders inside the card */}
                          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_#071014]" />
                        </div>
                      )}
                    </div>

                    {/* Central Timeline Dot (Circle Thumbnail) */}
                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-[#d6a45b]/40 bg-[#071014] overflow-hidden flex items-center justify-center p-0.5 shadow-[0_0_15px_rgba(214,164,91,0.15)] group-hover:border-[#d6a45b] group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(214,164,91,0.3)] transition duration-300">
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
                        <div className="max-w-md">
                          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#d6a45b]">
                            {place.locationLabel}
                          </span>
                          <h2 className="mt-1 font-serif text-xl uppercase tracking-[0.15em] text-[#f2eee5] transition duration-300 group-hover:text-[#d6a45b] sm:text-2xl">
                            {place.name}
                          </h2>
                          <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-white/60">
                            {place.description}
                          </p>
                        </div>
                      ) : (
                        // Desktop Right Side Full-Width Image Preview
                        <div className="relative w-full h-[280px] lg:h-[340px] overflow-hidden rounded-xl border border-white/5 transition duration-500 group-hover:border-[#c89b52]/30">
                          <img
                            src={place.image}
                            alt={place.name}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                          {/* Dark inner shadow applied only to the borders inside the card */}
                          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_#071014]" />
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Mobile-only Image Preview */}
                  <div className="mt-4 ml-16 mr-4 block md:hidden">
                    <Link
                      to={`/touristic/${activeCategory.id}/${place.id}`}
                      onClick={() => handleOpenPlace(place.id)}
                      className="relative block w-full h-[200px] overflow-hidden rounded-xl border border-white/5"
                    >
                      <img
                        src={place.image}
                        alt={place.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                      {/* Dark inner shadow applied only to the borders inside the card */}
                      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_#071014]" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-20 pb-10 text-center text-[11px] uppercase tracking-[0.28em] text-[#d6a45b]/60">
          {places.length} {activeCategory.title}
        </footer>

        {/* Scroll To Top */}
        <button
          type="button"
          aria-label="Scroll to top"
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full border border-[#c89b52]/45 bg-black/45 text-[#e6d8bd] shadow-[0_12px_30px_rgba(0,0,0,0.35)] backdrop-blur-md transition duration-300 hover:border-[#d6a45b]/80 hover:bg-[#c89b52]/20 hover:text-white sm:bottom-8 sm:right-8 ${
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