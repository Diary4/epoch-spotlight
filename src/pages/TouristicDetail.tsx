import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import { gsap } from "gsap";
import { getPlaceById } from "@/data/touristicPlaces";
import { DESIGN_WIDTH, useDesignCanvasFit } from "@/hooks/useDesignCanvasFit";

const detailFields = [
  ["Distance from Erbil", "distanceFromErbil"],
  ["Best time to visit", "bestTimeToVisit"],
  ["Visitor experience", "visitorExperience"],
  ["Travel guidance", "travelGuidance"],
  ["Accommodation", "accommodation"],
];

const gallerySizes = ["large", "small", "small", "medium", "small", "small", "medium", "small"] as const;

const TouristicDetail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [selectedGalleryId, setSelectedGalleryId] = useState<string | null>(null);
  const place = getPlaceById(id);
  // The slider (`/touristic`) is the primary browse experience; the classic grid
  // is kept as a second version at `/touristic-v2` and flags itself via `from`.
  // Pass the place id back so the slider reopens on the place the user viewed
  // instead of resetting to the first slide.
  const backTo =
    searchParams.get("from") === "v2"
      ? "/touristic-v2"
      : place
        ? `/touristic?place=${place.id}`
        : "/touristic";
  const ownGallery = (place?.gallery ?? []) as string[];
  const galleryImages = useMemo(() => {
    if (!place) return [];

    // Only ever show the place's own photos — never images from other
    // destinations. Places that ship a single real photo (or only a hero
    // image) simply render that one image instead of borrowing unrelated ones.
    const sources = ownGallery.length ? ownGallery : place.image ? [place.image] : [];

    return sources.slice(0, 8).map((url, index, all) => ({
      id: `${place.id}-${index}`,
      url,
      name: place.name,
      location: place.location,
      // A lone image spans the full row so it reads as an intentional feature
      // rather than a stranded tile.
      size: all.length === 1 ? "full" : gallerySizes[index % gallerySizes.length],
    }));
  }, [place, ownGallery]);
  const hasOwnGallery = ownGallery.length > 1;
  const selectedGalleryImage =
    galleryImages.find((image) => image.id === selectedGalleryId) ?? null;
  const { canvasRef, fit } = useDesignCanvasFit([place?.id, galleryImages.length], {
    fitViewport: false,
  });

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
    window.scrollTo(0, 0);
  }, [id]);

  useLayoutEffect(() => {
    if (!canvasRef.current || !place) return;

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
    }, canvasRef);

    return () => ctx.revert();
  }, [place]);

  if (!place) {
    return <Navigate to={backTo} replace />;
  }

  return (
    <>
      <div className="relative min-h-screen w-full overflow-x-hidden bg-[#faf8f5]">
        <div style={{ height: fit.contentHeight || undefined, position: "relative" }}>
          <main
            ref={canvasRef}
            className="bg-[#faf8f5] text-stone-800 selection:bg-[#c89b52]/30"
            style={{
              width: DESIGN_WIDTH,
              minHeight: fit.minCanvasHeight || undefined,
              transform: `translate(${fit.x}px, 0px) scale(${fit.scale})`,
              transformOrigin: "top left",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            <section className="relative h-[960px] w-full overflow-hidden">
              <img
                data-place-hero-image="true"
                src={place.image}
                alt={place.name}
                className="absolute inset-0 h-full w-full object-cover will-change-transform"
              />

              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/45 to-transparent" />
              <div className="absolute bottom-[-1px] left-0 right-0 h-44 bg-gradient-to-t from-[#faf8f5] via-[#faf8f5]/90 to-transparent" />

              <div data-place-back="true" className="absolute left-14 top-8 z-20">
                <Link
                  to={backTo}
                  state={{ restoreTouristicScroll: true }}
                  className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/80 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-stone-700 backdrop-blur-md transition hover:bg-stone-50 hover:text-stone-900"
                >
                  <span>←</span> Back
                </Link>
              </div>

              <div
                data-place-hero-text="true"
                className="absolute bottom-0 left-0 w-full px-32 pb-12"
              >
                <div className="inline-block max-w-full rounded-3xl border border-white/40 bg-white/35 px-10 py-8 shadow-[0_18px_60px_rgba(0,0,0,0.18)] backdrop-blur-md">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.38em] text-[#b07f2c]">
                    {place.role}
                  </p>
                  <h1 className="mt-4 font-serif text-7xl uppercase tracking-[0.15em] text-stone-900">
                    {place.name}
                  </h1>
                  <div className="mt-6 flex items-center gap-4">
                    <span className="h-px w-12 bg-[#b07f2c]" />
                    <p className="text-sm uppercase tracking-[0.25em] text-stone-700">
                      {place.location}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="relative px-32 py-16">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(186,140,84,0.06),transparent_40%)]" />

              <div data-place-intro="true" className="relative z-10 max-w-3xl">
                <p className="text-xl font-light leading-loose text-stone-700">
                  {place.description}
                </p>
              </div>

              <section data-place-gallery="true" className="relative z-10 mt-14">
                <div className="mb-6 flex items-end justify-between gap-2">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#d6a45b]">
                      Gallery
                    </p>
                    <h2 className="mt-2 font-serif text-3xl uppercase tracking-[0.16em] text-stone-900">
                      Artistic Flow
                    </h2>
                  </div>
                  <p className="max-w-md text-sm leading-relaxed text-stone-500">
                    {hasOwnGallery
                      ? `More views of ${place.name}.`
                      : `A closer look at ${place.name}.`}
                  </p>
                </div>

                <div className="grid auto-rows-[190px] grid-cols-4 gap-3">
                  {galleryImages.map((image) => (
                    <button
                      key={image.id}
                      type="button"
                      data-place-gallery-item="true"
                      onClick={() => setSelectedGalleryId(image.id)}
                      className={`group relative overflow-hidden rounded-2xl border border-stone-200 bg-white/70 text-left shadow-[0_12px_40px_rgba(0,0,0,0.05)] transition duration-500 hover:z-10 hover:scale-[1.025] hover:border-[#d6a45b]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d6a45b] ${
                        image.size === "full"
                          ? "col-span-4 row-span-2"
                          : image.size === "large"
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-95" />
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

              <div className="relative z-10 mt-16 grid grid-cols-3 gap-6">
                {detailFields.map(([label, key]) => (
                  <div
                    key={key}
                    data-place-card="true"
                    className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-white/70 p-6 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
                  >
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#d6a45b]">
                      {label}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-stone-600">
                      {place[key]}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Full-Screen Dark Overlay Lightbox — outside scaled canvas */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm transition duration-300 sm:p-8 ${
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
    </>
  );
};

export default TouristicDetail;