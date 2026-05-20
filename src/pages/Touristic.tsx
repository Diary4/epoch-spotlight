import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { NATURAL_PLACES } from "@/data/naturalPlaces";
import { HISTORICAL_PLACES } from "@/data/historicalPlaces";
import { RELIGIOUS_SITES } from "@/data/religousSites";
import { MUSEUM_CENTERS } from "@/data/museumCenters";

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
  const activeCategoryId = searchParams.get("category") ?? placeCategories[0].id;

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

  return (
    <main className="min-h-screen w-screen overflow-x-hidden bg-[#071014] text-white">
      <section className="relative mx-auto min-h-screen w-full bg-[#071014]">
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(186,140,84,0.18),transparent_28%),linear-gradient(180deg,#071014_0%,#0a1115_45%,#080d10_100%)]" />
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_24%,rgba(0,0,0,0.76)_88%)]" />
        <div className="pointer-events-none fixed inset-y-0 left-0 w-32 bg-gradient-to-r from-black/75 to-transparent md:w-44" />
        <div className="pointer-events-none fixed inset-y-0 right-0 w-32 bg-gradient-to-l from-black/75 to-transparent md:w-44" />

        <header className="relative z-30 flex items-center justify-between gap-4 px-6 pb-4 pt-8 sm:px-10 lg:px-14">
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

        <div className="relative z-20 w-full pb-16 flex flex-col gap-1">
          {places.map((place) => (
            <article
              key={place.id}
              className="relative w-full"
            >
              <Link
                to={`/touristic/${activeCategory.id}/${place.id}`}
                className="relative block h-[35vh] min-h-[320px] w-full overflow-hidden text-left group"
              >
                <img
                  src={place.image}
                  alt={place.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-[#071014]/40 via-transparent to-[#071014]/40" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#071014]/90 via-black/30 to-[#071014]/84" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_18%,rgba(0,0,0,0.48)_78%,rgba(0,0,0,0.78)_100%)]" />

                <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                  <h2 className="max-w-[920px] font-serif text-[28px] uppercase tracking-[0.18em] text-[#f2eee5] drop-shadow-[0_2px_18px_rgba(0,0,0,0.9)] sm:text-[36px] sm:tracking-[0.22em] lg:text-[48px]">
                    {place.name}
                  </h2>
                  <p className="mt-3 max-w-[760px] text-[11px] uppercase tracking-[0.28em] text-[#d6a45b] sm:text-[13px] sm:tracking-[0.38em]">
                    {place.locationLabel}
                  </p>
                  <span className="mt-4 h-px w-12 bg-[#d6a45b]/80" />
                  <p className="mt-5 line-clamp-2 max-w-[680px] text-center text-xs leading-relaxed text-white/70 sm:text-sm">
                    {place.description}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <footer className="relative z-20 pb-10 text-center text-[11px] uppercase tracking-[0.28em] text-[#d6a45b]/60">
          {places.length} {activeCategory.title}
        </footer>
      </section>
    </main>
  );
};

export default NaturalPlaces;
