import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { NATURAL_PLACES } from "@/data/naturalPlaces";

const detailFields = [
  ["Distance from Erbil", "distanceFromErbil"],
  ["Best time to visit", "bestTimeToVisit"],
  ["Visitor experience", "visitorExperience"],
  ["Travel guidance", "travelGuidance"],
  ["Accommodation", "accommodation"],
];

const NaturalPlaces = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  const places = useMemo(
    () =>
      NATURAL_PLACES.map((place) => ({
        ...place,
        locationLabel: place.location.split(",")[0],
      })),
    [],
  );

  return (
    <main className="min-h-screen w-screen overflow-x-hidden bg-[#071014] text-white">
      <section className="relative mx-auto min-h-screen w-full max-w-[1120px] bg-[#071014]">
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(186,140,84,0.18),transparent_28%),linear-gradient(180deg,#071014_0%,#0a1115_45%,#080d10_100%)]" />
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_24%,rgba(0,0,0,0.76)_88%)]" />
        <div className="pointer-events-none fixed inset-y-0 left-0 w-32 bg-gradient-to-r from-black/75 to-transparent md:w-44" />
        <div className="pointer-events-none fixed inset-y-0 right-0 w-32 bg-gradient-to-l from-black/75 to-transparent md:w-44" />

        <header className="relative z-30 flex items-center justify-between gap-4 px-6 pb-4 pt-8 sm:px-10 lg:px-14">
          <div>
            <p className="text-[11px] uppercase tracking-[0.38em] text-[#d6a45b]/80">
              Kurdistan
            </p>
            <h1 className="mt-2 font-serif text-3xl uppercase tracking-[0.2em] text-[#f2eee5] sm:text-4xl">
              Natural Timeline
            </h1>
          </div>

          <Link
            to="/screen-1"
            className="shrink-0 rounded-full border border-[#c89b52]/35 bg-black/25 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-[#e6d8bd] backdrop-blur-sm transition hover:bg-[#c89b52]/15 sm:px-5"
          >
            Back
          </Link>
        </header>

        <div className="relative z-20 px-5 pb-16 pl-[88px] sm:px-10 sm:pl-[112px] lg:px-14 lg:pl-[128px]">
          <div className="absolute bottom-20 left-[52px] top-6 w-px bg-white/20 sm:left-[66px] lg:left-[76px]" />

          {places.map((place) => (
            <article
              key={place.id}
              className="group relative -mt-4 first:mt-0"
              style={{ minHeight: "25vh" }}
            >
              <span className="absolute left-[-52px] top-1/2 z-30 grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#c89b52]/80 bg-[#091116] shadow-[0_0_0_5px_rgba(8,15,20,0.9)] sm:left-[-62px] lg:left-[-66px]">
                <span className="h-3 w-3 rounded-full bg-[#d5a65b] shadow-[0_0_18px_rgba(213,166,91,0.75)]" />
              </span>

              <button
                type="button"
                onClick={() => setSelectedPlace(place)}
                className="relative block h-[28vh] min-h-[260px] w-full overflow-hidden text-left"
              >
                <img
                  src={place.image}
                  alt={place.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-[#071014] via-transparent to-[#071014]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#071014]/90 via-transparent to-[#071014]/84" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_18%,rgba(0,0,0,0.58)_78%,rgba(0,0,0,0.88)_100%)]" />

                <div className="absolute left-0 right-0 top-6 flex flex-col items-center px-4 text-center sm:top-8">
                  <h2 className="max-w-[920px] font-serif text-[24px] uppercase tracking-[0.18em] text-[#f2eee5] drop-shadow-[0_2px_18px_rgba(0,0,0,0.9)] sm:text-[32px] sm:tracking-[0.22em] lg:text-[42px]">
                    {place.name}
                  </h2>
                  <p className="mt-3 max-w-[760px] text-[11px] uppercase tracking-[0.28em] text-[#d6a45b] sm:text-[13px] sm:tracking-[0.38em]">
                    {place.locationLabel}
                  </p>
                  <span className="mt-3 h-px w-10 bg-[#d6a45b]/80" />
                  <p className="mt-4 line-clamp-2 max-w-[680px] text-center text-xs leading-relaxed text-white/60 sm:text-sm">
                    {place.description}
                  </p>
                </div>
              </button>
            </article>
          ))}
        </div>

        <footer className="relative z-20 pb-10 text-center text-[11px] uppercase tracking-[0.28em] text-[#d6a45b]/60">
          {NATURAL_PLACES.length} Natural Places
        </footer>
      </section>

      {selectedPlace && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-xl"
          onClick={() => setSelectedPlace(null)}
        >
          <div
            className="relative my-8 w-full max-w-5xl overflow-hidden rounded-2xl border border-[#c89b52]/30 bg-[#071014] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedPlace(null)}
              className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black/55 text-white/80 transition hover:bg-[#9b6a32]/70"
              aria-label="Close details"
            >
              ✕
            </button>

            {/* Full width image section - removing padding/margins */}
            <div className="relative -mx-0 h-96 w-full overflow-hidden md:h-[500px]">
              <img
                src={selectedPlace.image}
                alt={selectedPlace.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071014] via-black/35 to-black/10" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-[11px] uppercase tracking-[0.34em] text-[#d6a45b]">
                  {selectedPlace.role}
                </p>
                <h2 className="mt-3 font-serif text-3xl uppercase tracking-[0.12em] text-white md:text-5xl">
                  {selectedPlace.name}
                </h2>
                <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/65">
                  {selectedPlace.location}
                </p>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <p className="text-base font-light leading-relaxed text-white/78 md:text-lg">
                {selectedPlace.description}
              </p>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {detailFields.map(([label, key]) => (
                  <div
                    key={key}
                    className="rounded-xl border border-white/10 bg-white/[0.035] p-4"
                  >
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#d6a45b]/80">
                      {label}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">
                      {selectedPlace[key]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default NaturalPlaces;