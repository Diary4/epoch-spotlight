import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { gsap } from "gsap";
import { NATURAL_PLACES } from "@/data/naturalPlaces";
import { HISTORICAL_PLACES } from "@/data/historicalPlaces";
import { RELIGIOUS_SITES } from "@/data/religousSites";
import { MUSEUM_CENTERS } from "@/data/museumCenters";

const placeCategories = [
  {
    id: "nature",
    places: NATURAL_PLACES,
  },
  {
    id: "religious",
    places: RELIGIOUS_SITES,
  },
  {
    id: "historical",
    places: HISTORICAL_PLACES,
  },
  {
    id: "museums",
    places: MUSEUM_CENTERS,
  },
];

const detailFields = [
  ["Distance from Erbil", "distanceFromErbil"],
  ["Best time to visit", "bestTimeToVisit"],
  ["Visitor experience", "visitorExperience"],
  ["Travel guidance", "travelGuidance"],
  ["Accommodation", "accommodation"],
];

const gallerySizes = ["large", "small", "small", "medium"] as const;

const TouristicDetail = () => {
  const { category, id } = useParams();
  const rootRef = useRef<HTMLElement | null>(null);
  const [selectedGalleryId, setSelectedGalleryId] = useState<string | null>(null);
  const categoryId = category ?? "nature";
  const activeCategory =
    placeCategories.find((item) => item.id === categoryId) ?? placeCategories[0];
  const place = activeCategory.places.find((item) => item.id === id);
  const galleryImages = useMemo(() => {
    if (!place) return [];

    const currentIndex = activeCategory.places.findIndex((item) => item.id === place.id);
    const orderedPlaces = [
      place,
      ...activeCategory.places
        .slice(currentIndex + 1)
        .concat(activeCategory.places.slice(0, currentIndex))
        .filter((item) => item.id !== place.id),
    ];

    return orderedPlaces.slice(0, 4).map((item, index) => ({
      id: item.id,
      url: item.image,
      name: item.name,
      location: item.location,
      size: gallerySizes[index],
    }));
  }, [activeCategory.places, place]);
  const selectedGalleryImage =
    galleryImages.find((image) => image.id === selectedGalleryId) ?? null;

  useEffect(() => {
    if (!selectedGalleryImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedGalleryId(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedGalleryImage]);

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
      const gallery = "[data-place-gallery='true']";
      const galleryItems = "[data-place-gallery-item='true']";
      const cards = "[data-place-card='true']";

      if (reducedMotion) {
        gsap.set([back, heroImage, heroText, intro, gallery, galleryItems, cards], {
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
      gsap.set(gallery, { autoAlpha: 0, y: 34 });
      gsap.set(galleryItems, { autoAlpha: 0, scale: 0.94 });
      gsap.set(cards, { autoAlpha: 0, y: 44 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.to(heroImage, { autoAlpha: 1, scale: 1, duration: 1.15 }, 0)
        .to(back, { autoAlpha: 1, scale: 1, duration: 0.55 }, 0.08)
        .to(heroText, { autoAlpha: 1, y: 0, stagger: 0.09, duration: 0.75 }, 0.2)
        .to(intro, { autoAlpha: 1, y: 0, duration: 0.75 }, 0.48)
        .to(gallery, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.58)
        .to(galleryItems, { autoAlpha: 1, scale: 1, stagger: 0.1, duration: 0.65 }, 0.68)
        .to(cards, { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.75 }, 0.92);
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
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <img
          data-place-hero-image="true"
          src={place.image}
          alt={place.name}
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071014] via-[#071014]/70 to-transparent" />
        <div className="absolute bottom-[-1px] left-0 right-0 h-32 bg-gradient-to-t from-[#071014] via-[#071014]/95 to-transparent" />

        <div
          data-place-back="true"
          className="absolute left-6 top-8 z-20 sm:left-10 lg:left-14"
        >
          <Link
            to={`/touristic?category=${activeCategory.id}`}
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

        <section data-place-gallery="true" className="relative z-10 mt-14">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.34em] text-[#d6a45b]/80">
                Gallery
              </p>
              <h2 className="mt-2 font-serif text-2xl uppercase tracking-[0.16em] text-[#f2eee5] sm:text-3xl">
                Artistic Flow
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-white/55">
              A visual path through {activeCategory.id === "museums" ? "nearby cultural stops" : "related destinations"} in this collection.
            </p>
          </div>

          <div className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] md:grid-cols-4 md:auto-rows-[170px] lg:auto-rows-[190px]">
            {galleryImages.map((image) => (
              <button
                key={image.id}
                type="button"
                data-place-gallery-item="true"
                onClick={() => setSelectedGalleryId(image.id)}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] text-left shadow-[0_24px_70px_rgba(0,0,0,0.35)] transition duration-500 hover:z-10 hover:scale-[1.025] hover:border-[#d6a45b]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d6a45b] ${
                  image.size === "large"
                    ? "col-span-2 row-span-2"
                    : image.size === "medium"
                      ? "col-span-2"
                      : ""
                }`}
              >
                <img
                  src={image.url}
                  alt={image.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />
                <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="font-serif text-lg uppercase tracking-[0.12em] text-white">
                    {image.name}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-[#d6a45b]">
                    {image.location}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>

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

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm transition duration-300 sm:p-8 ${
          selectedGalleryImage
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!selectedGalleryImage}
        onClick={() => setSelectedGalleryId(null)}
      >
        {selectedGalleryImage ? (
          <div
            className="relative h-full max-h-[82vh] w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-black shadow-[0_30px_90px_rgba(0,0,0,0.65)] transition duration-300"
            role="dialog"
            aria-modal="true"
            aria-label={selectedGalleryImage.name}
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selectedGalleryImage.url}
              alt={selectedGalleryImage.name}
              className="h-full w-full object-contain"
            />
            <button
              type="button"
              aria-label="Close gallery image"
              onClick={() => setSelectedGalleryId(null)}
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/55 text-2xl leading-none text-white backdrop-blur-md transition hover:border-[#d6a45b]/70 hover:bg-[#c89b52]/25"
            >
              ×
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 to-transparent p-5">
              <p className="font-serif text-xl uppercase tracking-[0.14em] text-white">
                {selectedGalleryImage.name}
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-[#d6a45b]">
                {selectedGalleryImage.location}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default TouristicDetail;
