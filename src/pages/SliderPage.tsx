import React, { useEffect, useMemo, useState } from "react";

const places = [
  {
    id: 1,
    title: "Sarchnar\nSprings",
    category: "Nature",
    description:
      "A beloved green retreat known for cool water, gardens, and peaceful outdoor gatherings.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: 2,
    title: "Rawanduz\nValley",
    category: "Mountains",
    description:
      "A dramatic mountain view with deep valleys, fresh air, and unforgettable sunset scenery.",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: 3,
    title: "Bekhal\nWaterfall",
    category: "Waterfall",
    description:
      "A refreshing landmark surrounded by green cliffs, flowing water, and family picnic spaces.",
    image:
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1600&q=90",
  },
];

function FlowerIcon({ small = false }) {
  return (
    <div className={`relative ${small ? "h-7 w-7" : "h-16 w-16"}`}>
      {[0, 45, 90, 135].map((deg) => (
        <span
          key={deg}
          className="absolute left-1/2 top-1/2 block h-3/4 w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d7ae56]"
          style={{ transform: `translate(-50%, -50%) rotate(${deg}deg)` }}
        />
      ))}
    </div>
  );
}

export default function VerticalTourismShowcase() {
  const [active, setActive] = useState(0);
  const total = places.length;
  const place = places[active];

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % total);
    }, 6000);

    return () => clearInterval(timer);
  }, [total]);

  const dots = useMemo(() => Array.from({ length: 20 }, (_, i) => i + 1), []);

  const nextSlide = () => setActive((current) => (current + 1) % total);
  const previousSlide = () => setActive((current) => (current - 1 + total) % total);

  return (
    <main
      className="relative min-h-screen w-full overflow-hidden bg-black text-white"
      onClick={nextSlide}
    >
      {places.map((item, index) => (
        <img
          key={item.id}
          src={item.image}
          alt={item.title.replace("\n", " ")}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-out ${
            index === active ? "scale-100 opacity-100" : "scale-105 opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,transparent_0%,rgba(0,0,0,0.12)_45%,rgba(0,0,0,0.55)_100%)]" />

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1080px] flex-col px-14 py-12">
        <header className="flex items-start justify-between">
          <div className="flex items-center gap-7">
            <FlowerIcon />
            <div>
              <p className="tracking-[0.45em] text-[#d7ae56] text-xl uppercase">Touristic Places of</p>
              <h1 className="font-serif text-5xl tracking-[0.18em] text-[#f1d28b]">Kurdistan</h1>
            </div>
          </div>

          <div className="flex items-center gap-7 pt-3 text-3xl">
            <span>EN</span>
            <span className="h-12 w-px bg-[#d7ae56]" />
            <button
              className="grid h-20 w-20 place-items-center rounded-full border border-[#d7ae56]/70 bg-white/5 backdrop-blur-md"
              onClick={(e) => e.stopPropagation()}
            >
              <FlowerIcon small />
            </button>
          </div>
        </header>

        <div className="grid flex-1 grid-cols-[90px_1fr] pt-32">
          <aside className="flex flex-col items-center text-[#d7ae56]">
            <span className="mb-5 text-3xl">01</span>
            <div className="relative flex h-[650px] flex-col items-center justify-between">
              <span className="absolute top-0 h-full w-px bg-[#d7ae56]/60" />
              {dots.map((dot) => (
                <button
                  key={dot}
                  className={`relative z-10 rounded-full border border-[#d7ae56] bg-[#d7ae56] transition-all ${
                    dot === active + 12
                      ? "h-8 w-8 bg-[#f1d28b] shadow-[0_0_25px_rgba(241,210,139,1)] ring-4 ring-[#f1d28b]/60 border-[#f1d28b]"
                      : "h-3 w-3"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActive((dot - 1) % total);
                  }}
                />
              ))}
            </div>
            <span className="mt-5 text-3xl">20</span>
          </aside>

          <article className="max-w-[650px] pt-28">
            <h2 className="whitespace-pre-line font-serif text-[100px] leading-[0.98] tracking-wide drop-shadow-2xl">
              {place.title}
            </h2>

            <div className="mt-8 inline-flex items-center gap-5 rounded-2xl border border-[#d7ae56] bg-black/20 px-8 py-4 text-[#f1d28b] backdrop-blur-md">
              <FlowerIcon small />
              <span className="text-2xl font-semibold uppercase tracking-[0.25em]">{place.category}</span>
            </div>

            <p className="mt-8 max-w-[520px] text-3xl leading-relaxed text-white/90 drop-shadow-lg">
              {place.description}
            </p>

            <div className="mt-14 flex items-end gap-5 font-serif">
              <span className="text-6xl text-[#f1d28b]">{String(active + 12).padStart(2, "0")}</span>
              <span className="pb-3 text-4xl text-white">/ 20</span>
            </div>
          </article>
        </div>

        <footer className="flex items-end justify-between pb-2">
          <button
            className="group flex flex-col items-center gap-4 text-[#f1d28b]"
            onClick={(e) => {
              e.stopPropagation();
              previousSlide();
            }}
          >
            <span className="grid h-20 w-20 place-items-center rounded-full border border-[#d7ae56]/70 bg-white/5 text-4xl backdrop-blur-md transition group-active:scale-95">
              ♧
            </span>
            <span className="text-2xl font-semibold uppercase">Map</span>
          </button>

          <button
            className="flex flex-col items-center gap-5 text-center"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
          >
            <FlowerIcon />
            <span className="h-px w-28 bg-[#d7ae56]" />
            <span className="text-2xl tracking-[0.55em]">SWIPE TO CONTINUE</span>
            <span className="text-4xl tracking-[-0.2em] text-[#d7ae56]">━━━━›››</span>
          </button>

          <button
            className="group flex flex-col items-center gap-4 text-[#f1d28b]"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="grid h-20 w-20 place-items-center rounded-full border border-[#d7ae56]/70 bg-white/5 text-4xl backdrop-blur-md transition group-active:scale-95">
              ⓘ
            </span>
            <span className="text-2xl font-semibold uppercase">Info</span>
          </button>
        </footer>
      </section>
    </main>
  );
}
