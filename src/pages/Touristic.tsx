import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NATURAL_PLACES } from "@/data/naturalPlaces";
// You can replace this with your own background image or keep a high-res nature image
import natureBackground from "@/assets/images/bg.webp"; // or use a URL directly

const NaturalPlaces = () => {
  const navigate = useNavigate();
  const [selectedPlace, setSelectedPlace] = useState(null);

  const rows = useMemo(
    () =>
      NATURAL_PLACES.map((place) => ({
        id: place.id,
        place: {
          id: place.id,
          name: place.name,
          image: place.image,
          location: place.location,
          description: place.description,
          role: place.role,
          distanceFromErbil: place.distanceFromErbil,
          bestTimeToVisit: place.bestTimeToVisit,
          visitorExperience: place.visitorExperience,
          travelGuidance: place.travelGuidance,
          accommodation: place.accommodation,
          target: place,
        },
      })),
    []
  );

  const openDetailModal = (place) => {
    setSelectedPlace(place);
  };

  const closeModal = () => {
    setSelectedPlace(null);
  };

  return (
    <main
      className="relative min-h-screen overflow-auto"
      style={{
        background: "linear-gradient(135deg, #0a1f1a 0%, #07140f 45%, #020a07 100%)",
      }}
    >
      {/* Background with mountain/nature image + dark overlay */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.85)), url(${natureBackground})`,
        }}
      />

      {/* Subtle animated earthy glow overlay */}
      <div
        className="fixed inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 30% 40%, rgba(210,180,140,0.15) 0%, rgba(20,40,15,0.6) 80%)",
        }}
      />

      {/* Decorative corner accents */}
      <div className="fixed left-8 top-8 h-20 w-20 border-l-2 border-t-2 border-white/10" />
      <div className="fixed right-8 top-8 h-20 w-20 border-r-2 border-t-2 border-white/10" />
      <div className="fixed bottom-8 left-8 h-20 w-20 border-b-2 border-l-2 border-white/10" />
      <div className="fixed bottom-8 right-8 h-20 w-20 border-b-2 border-r-2 border-white/10" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-12 md:py-16 lg:px-8">
        {/* Header Section */}
        <div className="mb-16 text-center md:text-left">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
            <div className="space-y-3">
              <p
                className="text-xs font-light uppercase tracking-[0.3em] md:text-sm"
                style={{ color: "rgba(210, 200, 170, 0.8)" }}
              >
                Wild Horizons
              </p>
              <h1
                className="text-5xl font-light tracking-tight md:text-7xl lg:text-8xl"
                style={{
                  color: "white",
                  textShadow: "0 2px 20px rgba(0,0,0,0.5)",
                }}
              >
                Natural Wonders
              </h1>
              <div className="flex justify-center md:justify-start">
                <div className="mt-2 h-px w-20 bg-gradient-to-r from-amber-400/60 to-transparent" />
              </div>
            </div>

            <Link
              to="/screen-1"
              className="group flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 hover:gap-3"
              style={{
                color: "#e6e0c8",
                border: "1px solid rgba(210,180,140,0.35)",
                background: "rgba(0,0,0,0.3)",
                backdropFilter: "blur(4px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(180,140,100,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(0,0,0,0.3)";
              }}
            >
              <span>←</span>
              <span>Back to Screen 1</span>
            </Link>
          </div>
        </div>

        {/* Places Grid */}
        <div className="space-y-6">
          {rows.map((row, rowIndex) => (
            <div
              key={`nature-row-${row.id}`}
              className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:bg-white/[0.02]"
            >
              <div className="relative px-6 py-6 md:px-8 md:py-8">
                <button
                  type="button"
                  onClick={() => openDetailModal(row.place.target)}
                  className={`group/place relative flex w-full items-center gap-6 transition-all duration-300 md:gap-12 ${
                    rowIndex % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {/* Image Container with Dark Border & Vignette Effect */}
                  <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full shadow-2xl transition-all duration-500 md:h-36 md:w-36 lg:h-44 lg:w-44">
                    {/* Outer dark rim / border effect */}
                    <div className="absolute inset-0 rounded-full shadow-[inset_0_0_0_2px_rgba(0,0,0,0.6),0_10px_25px_-5px_rgba(0,0,0,0.5)] z-10 pointer-events-none" />
                    {/* Dark gradient overlay for "dark effect surrounded image borders" */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover/place:opacity-60 transition-opacity duration-500 z-10 pointer-events-none" />
                    <div
                      className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover/place:opacity-100"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(255,215,150,0.25) 0%, transparent 70%)",
                      }}
                    />
                    <img
                      src={row.place.image}
                      alt={row.place.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover/place:scale-110"
                      loading="lazy"
                    />
                    {/* Double border dark effect */}
                    <div className="absolute inset-0 rounded-full border-2 border-black/30 transition-all duration-500 group-hover/place:border-amber-500/50" />
                    <div className="absolute inset-[-3px] rounded-full border border-white/5 pointer-events-none" />
                  </div>

                  {/* Text Content with "text above image" style via location badge */}
                  <div
                    className={`flex flex-col gap-1 ${
                      rowIndex % 2 === 0
                        ? "items-start text-left"
                        : "items-end text-right"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[11px] font-mono tracking-[0.15em] text-amber-300/70">
                        ✦
                      </span>
                      <p className="text-[11px] font-light uppercase tracking-[0.2em] text-amber-200/70">
                        {row.place.location.split(",")[0]}
                      </p>
                    </div>
                    <p
                      className="text-xl font-medium tracking-wide transition-all duration-300 md:text-3xl group-hover/place:tracking-wider"
                      style={{
                        color: "rgba(255,255,240,0.95)",
                        textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                      }}
                    >
                      {row.place.name}
                    </p>
                    <span
                      className="text-[11px] font-light uppercase tracking-[0.15em] md:text-xs"
                      style={{ color: "rgba(210,190,150,0.7)" }}
                    >
                      {row.place.location} • {row.place.role}
                    </span>
                    {/* Hover description */}
                    <div className="overflow-hidden max-w-full transition-all duration-300 max-h-0 group-hover/place:max-h-12 mt-0 group-hover/place:mt-1">
                      <p className="text-[11px] italic tracking-wide text-white/50 line-clamp-1">
                        {row.place.description}
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p
            className="text-xs font-light uppercase tracking-[0.2em]"
            style={{ color: "rgba(210,190,150,0.5)" }}
          >
            {NATURAL_PLACES.length} Natural Places • Click any landscape to explore
          </p>
          <div className="flex justify-center gap-3 mt-6">
            <span className="text-xs tracking-widest text-stone-400/50">
              ⟡ nature's majesty ⟡
            </span>
          </div>
        </div>
      </div>

      {/* Modal / Detail Overlay for "Click any portrait to explore" */}
      {selectedPlace && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300"
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)" }}
          onClick={closeModal}
        >
          <div
            className="relative max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 scale-100"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "linear-gradient(145deg, #0e1f18 0%, #04100b 100%)",
              border: "1px solid rgba(210,180,140,0.3)",
            }}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white/80 hover:bg-amber-700/60 transition"
            >
              ✕
            </button>

            {/* Image with dark border and vignette */}
            <div className="relative h-64 md:h-96 w-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <img
                src={selectedPlace.image}
                alt={selectedPlace.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-amber-300 text-xs tracking-widest">
                    ⛰️ NATURAL WONDER
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight">
                  {selectedPlace.name}
                </h2>
                <p className="text-amber-200/80 text-sm mt-1 font-mono">
                  {selectedPlace.location}
                </p>
              </div>
              {/* Dark border effect */}
              <div className="absolute inset-0 border-2 border-white/10 rounded-t-2xl pointer-events-none" />
              <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.7)] pointer-events-none" />
            </div>

            {/* Description */}
            <div className="p-6 md:p-8">
              <p className="text-white/80 leading-relaxed text-base md:text-lg font-light">
                {selectedPlace.description}
              </p>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {[
                  ["Distance from Erbil", selectedPlace.distanceFromErbil],
                  ["Best time to visit", selectedPlace.bestTimeToVisit],
                  ["Visitor experience", selectedPlace.visitorExperience],
                  ["Travel guidance", selectedPlace.travelGuidance],
                  ["Accommodation", selectedPlace.accommodation],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <p className="text-[10px] uppercase tracking-[0.2em] text-amber-300/70">
                      {label}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3 justify-between items-center border-t border-white/10 pt-5">
                <span className="text-xs uppercase tracking-wider text-amber-400/70">
                  ✦ natural adventure ✦
                </span>
                <button
                  onClick={closeModal}
                  className="px-5 py-2 rounded-full bg-white/5 text-white/80 border border-white/20 text-sm hover:bg-amber-800/40 transition"
                >
                  Return to Gallery
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default NaturalPlaces;
