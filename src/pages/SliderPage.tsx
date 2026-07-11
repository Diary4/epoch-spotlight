import React, { useEffect, useMemo, useState, useLayoutEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { gsap } from "gsap";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ALL_PLACES, CITY_CATEGORIES } from "@/data/touristicPlaces";
import {
  getAppLanguage,
  nextAppLanguage,
  setAppLanguage,
  type AppLangCode,
} from "@/lib/appLanguage";

type TouristicPlace = {
  id: string;
  name: string;
  nameAr?: string;
  nameKu?: string;
  location: string;
  locationAr?: string;
  locationKu?: string;
  image: string;
  description: string;
  descriptionAr?: string;
  descriptionKu?: string;
  role?: string;
  roleAr?: string;
  roleKu?: string;
};

type SliderPlace = TouristicPlace & {
  categoryId: string;
  category: string;
  completed: boolean;
};

type DataScope = "all" | "completed";

const placeCategories = CITY_CATEGORIES.map((city) => ({
  id: city.id,
  category: { en: city.en, ku: city.ku, ar: city.ar },
}));

const places: SliderPlace[] = (ALL_PLACES as (TouristicPlace & { cityId: string; completed?: boolean })[]).map((place) => ({
  ...place,
  categoryId: place.cityId,
  category: placeCategories.find((c) => c.id === place.cityId)?.category.en ?? "",
  completed: Boolean(place.completed),
}));

type CategoryId = "all" | (typeof placeCategories)[number]["id"];

const languageLabels: Record<AppLangCode, string> = {
  en: "EN",
  ku: "کوردی",
  ar: "العربية",
};

const sliderCopy: Record<
  AppLangCode,
  {
    all: string;
    categoryBrowse: string;
    info: string;
    map: string;
    swipe: string;
    titleKicker: string;
    titleMain: string;
    explore: string;
    dataScope: string;
    allData: string;
    completedData: string;
    next: string;
    previous: string;
  }
> = {
  en: {
    all: "All",
    categoryBrowse: "Category Browse",
    info: "Info",
    map: "Map",
    swipe: "Swipe to continue",
    titleKicker: "Touristic Places of",
    titleMain: "Kurdistan",
    explore: "Explore",
    dataScope: "Data",
    allData: "All Data",
    completedData: "Completed",
    next: "Next",
    previous: "Back",
  },
  ku: {
    all: "هەموو",
    categoryBrowse: "گەڕان بە پۆل",
    info: "زانیاری",
    map: "نەخشە",
    swipe: "بۆ بەردەوامبوون دەست لێ بدە",
    titleKicker: "شوێنە گەشتیارییەکانی",
    titleMain: "کوردستان",
    explore: "بگەڕێ",
    dataScope: "داتا",
    allData: "هەموو داتا",
    completedData: "تەواوکراو",
    next: "دواتر",
    previous: "پێشتر",
  },
  ar: {
    all: "الكل",
    categoryBrowse: "تصفح حسب الفئة",
    info: "معلومات",
    map: "الخريطة",
    swipe: "اسحب للمتابعة",
    titleKicker: "الأماكن السياحية في",
    titleMain: "كوردستان",
    explore: "استكشف",
    dataScope: "البيانات",
    allData: "كل البيانات",
    completedData: "المكتملة",
    next: "التالي",
    previous: "السابق",
  },
};

function formatSlideTitle(name: string) {
  const words = name.split(" ");

  if (words.length < 3) {
    return name;
  }

  const midpoint = Math.ceil(words.length / 2);
  return `${words.slice(0, midpoint).join(" ")}\n${words.slice(midpoint).join(" ")}`;
}

function getLocalizedPlaceValue(
  place: TouristicPlace,
  key: "name" | "location" | "description" | "role",
  lang: AppLangCode,
) {
  if (lang === "en") {
    return place[key] ?? "";
  }

  const localizedKey = `${key}${lang === "ar" ? "Ar" : "Ku"}` as keyof TouristicPlace;
  const localizedValue = place[localizedKey];

  return typeof localizedValue === "string" && localizedValue.trim()
    ? localizedValue
    : place[key] ?? "";
}

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
  const [searchParams] = useSearchParams();
  // When returning from a place detail (`/touristic?place=<id>`), reopen the
  // slider on that place instead of resetting to the first slide.
  const initialActive = useMemo(() => {
    const placeId = searchParams.get("place");
    if (!placeId) return 0;
    const index = places.findIndex((item) => item.id === placeId);
    return index >= 0 ? index : 0;
  }, [searchParams]);
  const [active, setActive] = useState(initialActive);
  const [lang, setLang] = useState<AppLangCode>(() => getAppLanguage());
  const [activeCategoryId, setActiveCategoryId] = useState<CategoryId>("all");
  const [dataScope, setDataScope] = useState<DataScope>("all");
  const mainRef = useRef<HTMLElement | null>(null);
  const isMounted = useRef(false);
  const filtersInitialized = useRef(false);

  const copy = sliderCopy[lang];
  const filteredPlaces = useMemo(() => {
    const scoped = dataScope === "completed" ? places.filter((item) => item.completed) : places;
    return activeCategoryId === "all"
      ? scoped
      : scoped.filter((item) => item.categoryId === activeCategoryId);
  }, [activeCategoryId, dataScope]);
  const total = filteredPlaces.length;
  const place = filteredPlaces[active] ?? filteredPlaces[0] ?? places[0];
  const placeName = getLocalizedPlaceValue(place, "name", lang);
  const placeLocation = getLocalizedPlaceValue(place, "location", lang);
  const placeDescription = getLocalizedPlaceValue(place, "description", lang);
  const activeCategory = placeCategories.find((category) => category.id === place.categoryId);
  const placeCategoryLabel = activeCategory?.category[lang] ?? place.category;
  const currentNumber = String(active + 1).padStart(2, "0");
  const totalNumber = String(total).padStart(2, "0");
  const dir = lang === "en" ? "ltr" : "rtl";

  useEffect(() => {
    // Skip the mount run so a restored place (from ?place=) is preserved; only
    // reset to the first slide when the user actually switches a filter.
    if (!filtersInitialized.current) {
      filtersInitialized.current = true;
      return;
    }
    setActive(0);
  }, [activeCategoryId, dataScope]);

  const dots = useMemo(() => Array.from({ length: Math.min(total, 20) }, (_, i) => i), [total]);
  const activeDot = Math.round((active / Math.max(total - 1, 1)) * Math.max(dots.length - 1, 0));

  const nextSlide = () => setActive((current) => (current + 1) % total);
  const previousSlide = () => setActive((current) => (current - 1 + total) % total);
  const handleLanguageChange = () => {
    setLang((current) => {
      const next = nextAppLanguage(current);
      setAppLanguage(next);
      return next;
    });
  };

  // Mount Intro Timeline Animation
  useLayoutEffect(() => {
    if (!mainRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-slider-bg='true']", { scale: 1.1, autoAlpha: 0 });
      gsap.set("[data-slider-header='true']", { y: -32, autoAlpha: 0 });
      gsap.set("[data-slider-nav='true']", { y: -16, autoAlpha: 0 });
      gsap.set("[data-slider-aside='true']", { x: -32, autoAlpha: 0 });
      gsap.set("[data-slider-title='true']", { y: 28, autoAlpha: 0 });
      gsap.set("[data-slider-cat='true']", { scale: 0.9, autoAlpha: 0 });
      gsap.set("[data-slider-desc='true']", { y: 20, autoAlpha: 0 });
      gsap.set("[data-slider-loc='true']", { y: 12, autoAlpha: 0 });
      gsap.set("[data-slider-explore='true']", { scale: 0.94, autoAlpha: 0 });
      gsap.set("[data-slider-counter='true']", { y: 12, autoAlpha: 0 });
      gsap.set("[data-slider-footer='true']", { y: 32, autoAlpha: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.to("[data-slider-bg='true']", { autoAlpha: 1, scale: 1, duration: 1.8, ease: "power3.out" })
        .to("[data-slider-header='true']", { autoAlpha: 1, y: 0, duration: 0.8 }, "-=1.2")
        .to("[data-slider-nav='true']", { autoAlpha: 1, y: 0, duration: 0.65 }, "-=0.6")
        .to("[data-slider-aside='true']", { autoAlpha: 1, x: 0, duration: 0.85 }, "-=0.5")
        .to("[data-slider-title='true']", { autoAlpha: 1, y: 0, duration: 0.85 }, "-=0.65")
        .to("[data-slider-cat='true']", { autoAlpha: 1, scale: 1, duration: 0.55 }, "-=0.45")
        .to("[data-slider-desc='true']", { autoAlpha: 1, y: 0, duration: 0.75 }, "-=0.35")
        .to("[data-slider-loc='true']", { autoAlpha: 1, y: 0, duration: 0.55 }, "-=0.45")
        .to("[data-slider-explore='true']", { autoAlpha: 1, scale: 1, duration: 0.65 }, "-=0.45")
        .to("[data-slider-counter='true']", { autoAlpha: 1, y: 0, duration: 0.55 }, "-=0.45")
        .to("[data-slider-footer='true']", { autoAlpha: 1, y: 0, duration: 0.85 }, "-=0.45");
    }, mainRef);

    return () => ctx.revert();
  }, []);

  // Slide Switch cinematic animation
  useLayoutEffect(() => {
    if (!mainRef.current) return;
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set("[data-slider-bg='true']", { scale: 1.08, autoAlpha: 0 });
      gsap.set("[data-slider-title='true']", { y: 22, autoAlpha: 0 });
      gsap.set("[data-slider-cat='true']", { scale: 0.94, autoAlpha: 0 });
      gsap.set("[data-slider-desc='true']", { y: 16, autoAlpha: 0 });
      gsap.set("[data-slider-loc='true']", { y: 10, autoAlpha: 0 });
      gsap.set("[data-slider-explore='true']", { scale: 0.94, autoAlpha: 0 });
      gsap.set("[data-slider-counter='true']", { y: 10, autoAlpha: 0 });

      gsap.to("[data-slider-bg='true']", { autoAlpha: 1, scale: 1, duration: 1.5, ease: "power3.out" });
      gsap.to("[data-slider-title='true']", { autoAlpha: 1, y: 0, duration: 0.8, delay: 0.05, ease: "power2.out" });
      gsap.to("[data-slider-cat='true']", { autoAlpha: 1, scale: 1, duration: 0.6, delay: 0.15, ease: "back.out(1.15)" });
      gsap.to("[data-slider-desc='true']", { autoAlpha: 1, y: 0, duration: 0.7, delay: 0.2, ease: "power2.out" });
      gsap.to("[data-slider-loc='true']", { autoAlpha: 1, y: 0, duration: 0.65, delay: 0.25, ease: "power2.out" });
      gsap.to("[data-slider-explore='true']", { autoAlpha: 1, scale: 1, duration: 0.65, delay: 0.25, ease: "back.out(1.15)" });
      gsap.to("[data-slider-counter='true']", { autoAlpha: 1, y: 0, duration: 0.6, delay: 0.3, ease: "power2.out" });
    }, mainRef);

    return () => ctx.revert();
  }, [place.id]);

  return (
    <main
      ref={mainRef}
      dir="ltr"
      className="relative min-h-screen w-full overflow-hidden bg-black text-white"
      onClick={nextSlide}
    >
      <img
        key={place.id}
        data-slider-bg="true"
        src={place.image}
        alt={placeName}
        className="absolute inset-0 h-full w-full object-cover"
      />
{/* 
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent animate-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15 animate-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,transparent_0%,rgba(0,0,0,0.12)_45%,rgba(0,0,0,0.55)_100%)] animate-none" /> */}

      {/* Center-edge navigation between places */}
      <button
        type="button"
        aria-label={copy.previous}
        onClick={(e) => {
          e.stopPropagation();
          previousSlide();
        }}
        className="group absolute left-3 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center gap-2 sm:left-6"
      >
        <span className="grid h-12 w-12 place-items-center rounded-full border border-[#d7ae56]/70 bg-black/30 text-[#f1d28b] backdrop-blur-md transition group-hover:bg-[#f1d28b] group-hover:text-black group-active:scale-95 sm:h-16 sm:w-16">
          <ArrowLeft className="h-5 w-5 sm:h-7 sm:w-7" />
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f1d28b] sm:text-xs">
          {copy.previous}
        </span>
      </button>

      <button
        type="button"
        aria-label={copy.next}
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        className="group absolute right-3 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center gap-2 sm:right-6"
      >
        <span className="grid h-12 w-12 place-items-center rounded-full border border-[#d7ae56]/70 bg-black/30 text-[#f1d28b] backdrop-blur-md transition group-hover:bg-[#f1d28b] group-hover:text-black group-active:scale-95 sm:h-16 sm:w-16">
          <ArrowRight className="h-5 w-5 sm:h-7 sm:w-7" />
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f1d28b] sm:text-xs">
          {copy.next}
        </span>
      </button>

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1080px] flex-col px-4 sm:px-10 lg:px-14 py-6 lg:py-8">
        <header data-slider-header="true" className="flex items-start justify-between">
          <div className="flex items-center gap-4 sm:gap-7">
            <FlowerIcon />
            <div dir={dir}>
              <p className="tracking-[0.2em] sm:tracking-[0.45em] text-[#d7ae56] text-xs sm:text-base lg:text-xl uppercase">
                {copy.titleKicker}
              </p>
              <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl tracking-[0.1em] sm:tracking-[0.18em] text-[#f1d28b]">
                {copy.titleMain}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-7 pt-1 sm:pt-3 text-lg sm:text-2xl lg:text-3xl shrink-0">
            <button
              type="button"
              aria-label="Switch language"
              className="text-sm sm:text-base lg:text-lg transition hover:text-[#f1d28b]"
              onClick={(e) => {
                e.stopPropagation();
                handleLanguageChange();
              }}
            >
              {languageLabels[lang]}
            </button>
            <span className="h-6 sm:h-12 w-px bg-[#d7ae56]" />
            <button
              type="button"
              className="grid h-10 w-10 sm:h-16 sm:w-16 lg:h-20 lg:w-20 place-items-center rounded-full border border-[#d7ae56]/70 bg-white/5 backdrop-blur-md"
              onClick={(e) => e.stopPropagation()}
            >
              <FlowerIcon small />
            </button>
          </div>
        </header>

        {/* Data scope toggle: all places vs. only those with real photos */}
        <div
          data-slider-nav="true"
          dir={dir}
          className="mt-4 flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.12em] sm:tracking-[0.18em] text-[#f1d28b] shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="mr-2 text-[#d7ae56]/80 shrink-0">{copy.dataScope}</span>
          {[
            { id: "all" as const, label: copy.allData },
            { id: "completed" as const, label: copy.completedData },
          ].map((scope) => {
            const isActive = scope.id === dataScope;

            return (
              <button
                key={scope.id}
                type="button"
                onClick={() => setDataScope(scope.id)}
                className={`rounded-full border px-4 py-2 backdrop-blur-md transition shrink-0 ${
                  isActive
                    ? "border-[#f1d28b] bg-[#f1d28b]/20 text-white"
                    : "border-[#d7ae56]/45 bg-black/15 text-[#f1d28b]/80 hover:border-[#f1d28b]/80 hover:text-white"
                }`}
              >
                {scope.label}
              </button>
            );
          })}
        </div>

        {/* Responsive Category bar - horizontal scrolls on mobile, wraps on desktop */}
        <nav
          data-slider-nav="true"
          aria-label={copy.categoryBrowse}
          dir={dir}
          className="mt-5 flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.12em] sm:tracking-[0.18em] text-[#f1d28b] overflow-x-auto scrollbar-none pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="mr-2 text-[#d7ae56]/80 shrink-0">{copy.categoryBrowse}</span>
          {[
            { id: "all" as const, label: copy.all },
            ...placeCategories.map((category) => ({
              id: category.id,
              label: category.category[lang],
            })),
          ].map((category) => {
            const isActive = category.id === activeCategoryId;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategoryId(category.id)}
                className={`rounded-full border px-4 py-2 backdrop-blur-md transition shrink-0 ${
                  isActive
                    ? "border-[#f1d28b] bg-[#f1d28b]/20 text-white"
                    : "border-[#d7ae56]/45 bg-black/15 text-[#f1d28b]/80 hover:border-[#f1d28b]/80 hover:text-white"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </nav>

        {/* Grid Area: stacks on mobile, splits on desktop */}
        <div className="grid flex-1 grid-cols-1 sm:grid-cols-[90px_1fr] pt-[clamp(1rem,4vh,8rem)]">
          <aside data-slider-aside="true" className="flex flex-col items-center text-[#d7ae56] hidden sm:flex">
            <span className="mb-5 text-3xl">01</span>
            <div className="relative flex h-[clamp(240px,48vh,650px)] flex-col items-center justify-between">
              <span className="absolute top-0 h-full w-px bg-[#d7ae56]/60" />
              {dots.map((dot) => (
                <button
                  key={dot}
                  className={`relative z-10 rounded-full border border-[#d7ae56] bg-[#d7ae56] transition-all ${
                    dot === activeDot
                      ? "h-8 w-8 bg-[#f1d28b] shadow-[0_0_25px_rgba(241,210,139,1)] ring-4 ring-[#f1d28b]/60 border-[#f1d28b]"
                      : "h-3 w-3"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActive(Math.round((dot / Math.max(dots.length - 1, 1)) * (total - 1)));
                  }}
                  aria-label={`Go to slide group ${dot + 1}`}
                />
              ))}
            </div>
            <span className="mt-5 text-3xl">{totalNumber}</span>
          </aside>

          <article dir={dir} className="max-w-[650px] pt-[clamp(0rem,2vh,7rem)] flex flex-col justify-center sm:justify-start">
            <h2 data-slider-title="true" className="whitespace-pre-line font-serif text-[clamp(30px,5.8vw,82px)] leading-[1] sm:leading-[0.98] tracking-wide drop-shadow-2xl">
              {formatSlideTitle(placeName)}
            </h2>

            <div data-slider-cat="true" className="mt-4 sm:mt-5 inline-flex items-center gap-3 sm:gap-4 rounded-xl sm:rounded-2xl border border-[#d7ae56]/70 bg-black/40 px-4 py-2 sm:px-6 sm:py-3 text-[#f1d28b] backdrop-blur-md self-start">
              <FlowerIcon small />
              <span className="text-sm sm:text-xl font-semibold uppercase tracking-[0.25em]">
                {placeCategoryLabel}
              </span>
            </div>

            <p data-slider-desc="true" className="mt-4 sm:mt-5 line-clamp-3 sm:line-clamp-4 max-w-[520px] text-[clamp(14px,1.7vw,22px)] leading-relaxed text-white/90 drop-shadow-lg">
              {placeDescription}
            </p>

            <p data-slider-loc="true" className="mt-3 sm:mt-4 text-xs sm:text-base uppercase tracking-[0.18em] text-[#f1d28b]/85">
              {placeLocation}
            </p>

            {/* Explore Button */}
            <div data-slider-explore="true" className="mt-5 sm:mt-6">
              <Link
                to={`/touristic/${place.categoryId}/${place.id}`}
                onClick={(e) => e.stopPropagation()}
                className="group inline-flex items-center gap-2 sm:gap-3 rounded-full border border-[#f1d28b] bg-[#f1d28b]/15 px-6 py-2.5 sm:px-8 sm:py-3.5 text-sm sm:text-base font-semibold tracking-[0.12em] sm:tracking-[0.18em] text-[#f1d28b] backdrop-blur-md transition-all duration-300 hover:bg-[#f1d28b] hover:text-black hover:shadow-[0_0_20px_rgba(241,210,139,0.5)]"
              >
                <span className="uppercase">{copy.explore}</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180" />
              </Link>
            </div>

            <div data-slider-counter="true" dir="ltr" className="mt-5 sm:mt-6 flex items-end gap-4 font-serif">
              <span className="text-3xl sm:text-5xl text-[#f1d28b]">{currentNumber}</span>
              <span className="pb-1 sm:pb-2 text-xl sm:text-3xl text-white">/ {totalNumber}</span>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}