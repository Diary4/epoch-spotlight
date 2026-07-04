import React, { useLayoutEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import {
  ArrowLeft,
  MapPin,
  Sparkles,
  Compass,
  Mountain,
  Landmark,
  SunMedium,
  History,
  BookOpen,
} from "lucide-react";
import { detailBackIconClassName, detailBackIconSize } from "@/constants/backNavigation";

// Localized place data imports
import { NATURAL_PLACES } from "@/data/naturalPlaces";
import { RELIGIOUS_SITES } from "@/data/religousSites";
import { HISTORICAL_PLACES } from "@/data/historicalPlaces";
import { MUSEUM_CENTERS } from "@/data/museumCenters";

import { getAppLanguage, type AppLangCode } from "@/lib/appLanguage";

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

type TouristicPlaceDetailPageProps = {
  categoryId?: string;
  placeId?: string;
  lang?: AppLangCode;
  onBack?: () => void;
};

const categoryDataMap: Record<string, TouristicPlace[]> = {
  nature: NATURAL_PLACES,
  religious: RELIGIOUS_SITES,
  historical: HISTORICAL_PLACES,
  museums: MUSEUM_CENTERS,
};

// Localized mapping titles for the Category kicker
const categoryLabels: Record<AppLangCode, Record<string, string>> = {
  en: { nature: "Nature", religious: "Religious Site", historical: "Historical Site", museums: "Museum" },
  ku: { nature: "سروشت", religious: "شوێنی ئایینی", historical: "شوێنی مێژوویی", museums: "مۆزەخانە" },
  ar: { nature: "الطبيعة", religious: "موقع ديني", historical: "موقع تاريخي", museums: "متحف" },
};

// Reusable localized Highlight Card templates mapped to category IDs
const categoryHighlightCards: Record<
  AppLangCode,
  Record<
    string,
    Array<{ title: string; descTemplate: string; icon: any; color: string }>
  >
> = {
  en: {
    nature: [
      { title: "Natural Wonder", descTemplate: "Explore the ancient geology, ecosystems, and natural features that define this majestic site.", icon: Mountain, color: "#c59a4b" },
      { title: "Seasonal Magic", descTemplate: "Witness a dramatic transformation from flowing spring waters to snow-capped winter landscapes.", icon: Compass, color: "#405846" },
      { title: "Exploration", descTemplate: "An ideal escape for hiking, landscape photography, and deep nature discovery.", icon: Sparkles, color: "#9d3637" }
    ],
    religious: [
      { title: "Sacred Legacy", descTemplate: "A historically significant sanctuary representing peace, legacy, and spiritual tolerance.", icon: SunMedium, color: "#c59a4b" },
      { title: "Sacred Art", descTemplate: "Examine beautiful architecture, historic symbols, and masonry built to endure.", icon: Landmark, color: "#13213b" },
      { title: "Community", descTemplate: "A vibrant cultural meeting point hosting decades of traditional assemblies and gatherings.", icon: Compass, color: "#9d3637" }
    ],
    historical: [
      { title: "Ancient Roots", descTemplate: "Discover archaeological findings tracing back centuries of human residency and action.", icon: History, color: "#c59a4b" },
      { title: "Kurdish Heritage", descTemplate: "A crucial site preserving oral legends, architectural remains, and defensive history.", icon: Landmark, color: "#405846" },
      { title: "Discoveries", descTemplate: "Modern scientific excavations here continue to reveal new secrets of ancient civilizations.", icon: Compass, color: "#9d3637" }
    ],
    museums: [
      { title: "Curated History", descTemplate: "Housing precious remnants, traditional garments, and historical tools of ancestors.", icon: Landmark, color: "#c59a4b" },
      { title: "Living Memory", descTemplate: "Serving as an educational center preserving Kurdish craft, poetry, and literature.", icon: BookOpen, color: "#13213b" },
      { title: "Cultural Wealth", descTemplate: "Witness authentic representations of Kurdish folk art, values, and community legacy.", icon: Sparkles, color: "#9d3637" }
    ]
  },
  ku: {
    nature: [
      { title: "سروشتی سەرنجڕاکێش", descTemplate: "گەڕان بەدوای جیۆلۆجی، سیستەمی ژینگەیی و تایبەتمەندییە سروشتییەکانی ئەم شوێنەدا.", icon: Mountain, color: "#c59a4b" },
      { title: "گۆڕانی وەرزەکان", descTemplate: "بینینی گۆڕانکاریی سەرنجڕاکێشی سروشت لە ئاوی بەهارییەوە بۆ دیمەنی بەفرینی زستان.", icon: Compass, color: "#405846" },
      { title: "گەڕان و دۆزینەوە", descTemplate: "شوێنێکی گونجاوە بۆ گەشتکردن، وێنەگرتنی سروشتی، و دۆزینەوەی قوڵایی سروشت.", icon: Sparkles, color: "#9d3637" }
    ],
    religious: [
      { title: "کەلەپووری پیرۆز", descTemplate: "شوێنێکی مێژوویی گرنگ کە گوزارشت لە ئاشتی، پێکەوەژیان و فرە ئایینی دەکات.", icon: SunMedium, color: "#c59a4b" },
      { title: "هونەری پیرۆز", descTemplate: "سەیرکردنی تەلارسازیی جوان، هێما مێژووییەکان و تاشەبەردە نەخشێنراوەکان.", icon: Landmark, color: "#13213b" },
      { title: "پێکەوەژیان", descTemplate: "شوێنێکی گرنگە کە ساڵانە میوانداری بۆنە مێژوویی و ئایینییەکان دەکات.", icon: Compass, color: "#9d3637" }
    ],
    historical: [
      { title: "ڕەگی دێرین", descTemplate: "دۆزینەوە مێژووییەکان مێژووی چەندین سەدەی نیشتەجێبوونی مرۆڤ دەردەخەن.", icon: History, color: "#c59a4b" },
      { title: "کەلەپووری کوردی", descTemplate: "شوێنێکی مێژوویی گرنگ کە دیمەن و مێژووی بەرگریی نیشتمان دەپارێزێت.", icon: Landmark, color: "#405846" },
      { title: "دۆزینەوە مێژووییەکان", descTemplate: "کۆڵینەوە شوێنەوارییە نوێیەکان بەردەوامن لە ئاشکراکردنی لایەنە نوێیەکانی شارستانییەتە دێرینەکان.", icon: Compass, color: "#9d3637" }
    ],
    museums: [
      { title: "مێژووی پارێزراو", descTemplate: "لەخۆگرتنی کەلوپەل، جلوبەرگی دێرین و ئامرازە مێژووییەکانی باوانمان.", icon: Landmark, color: "#c59a4b" },
      { title: "بیرەوەریی زیندوو", descTemplate: "پاراستنی کارە دەستییەکان، هۆنراوە و ئەدەبیاتی دەوڵەمەندی مێژوویی.", icon: BookOpen, color: "#13213b" },
      { title: "دەوڵەمەندیی کلتووری", descTemplate: "دەرخستنی ڕەسەنایەتی فۆلکلۆری کوردی، بەهاکان و کەلەپووری کۆمەڵایەتی.", icon: Sparkles, color: "#9d3637" }
    ]
  },
  ar: {
    nature: [
      { title: "عجيبة طبيعية", descTemplate: "استكشف التكوينات الجيولوجية القديمة والأنظمة البيئية الفريدة التي تميز هذا الموقع.", icon: Mountain, color: "#c59a4b" },
      { title: "سحر الفصول", descTemplate: "شاهد تحولاً مذهلاً للطبيعة من تدفق مياه الربيع إلى جبال يكسوها الجليد شتاءً.", icon: Compass, color: "#405846" },
      { title: "الاستكشاف المغامر", descTemplate: "ملاذ رائع للتنزه، والتصوير الطبيعي، واستكشاف أسرار الطبيعة الخلابة.", icon: Sparkles, color: "#9d3637" }
    ],
    religious: [
      { title: "إرث مقدّس", descTemplate: "ملاذ ذو أهمية تاريخية يرمز للسلام، والتعايش، والتسامح الروحي عبر العصور.", icon: SunMedium, color: "#c59a4b" },
      { title: "الفن المعماري", descTemplate: "تأمل الهندسة المعمارية الدينية البديعة والرموز الحجرية التي بنيت لتدوم طويلاً.", icon: Landmark, color: "#13213b" },
      { title: "الملتقى الروحي", descTemplate: "نقطة تجمع ثقافية واجتماعية نابضة بالحياة تحتضن الطقوس والمناسبات التاريخية.", icon: Compass, color: "#9d3637" }
    ],
    historical: [
      { title: "جذور قديمة", descTemplate: "اكتشف اللقى الأثرية التي تروي حكايات تعود لقرون طويلة من الاستيطان البشري.", icon: History, color: "#c59a4b" },
      { title: "التراث الكوردستاني", descTemplate: "موقع بارز يحفظ القصص الشعبية والآثار المعمارية وملاحم الصمود والتحدي.", icon: Landmark, color: "#405846" },
      { title: "الاكتشافات الأثرية", descTemplate: "تواصل التنقيبات العلمية الكشف عن أسرار حضارات كوردستان التاريخية العريقة.", icon: Compass, color: "#9d3637" }
    ],
    museums: [
      { title: "التاريخ المنسق", descTemplate: "حفظ المقتنيات الثمينة، والملابس التقليدية، والأدوات التاريخية لحياة الأجداد.", icon: Landmark, color: "#c59a4b" },
      { title: "الذاكرة الحية", descTemplate: "منصة تعليمية لحفظ الحرف اليدوية، والقصائد البلاغية، والأدب الكوردي الخالد.", icon: BookOpen, color: "#13213b" },
      { title: "الثراء الثقافي", descTemplate: "تأمل المظاهر الأصيلة للفولكلور، والتعرف على القيم والتقاليد الاجتماعية البارزة.", icon: Sparkles, color: "#9d3637" }
    ]
  }
};

function getLocalizedValue(
  place: TouristicPlace,
  key: "name" | "location" | "description",
  lang: AppLangCode
) {
  if (lang === "en") return place[key];
  const localizedKey = `${key}${lang === "ar" ? "Ar" : "Ku"}` as keyof TouristicPlace;
  const value = place[localizedKey];
  return typeof value === "string" && value.trim() ? value : place[key];
}

export default function TouristicPlaceDetailPage({
  categoryId: catProp,
  placeId: idProp,
  lang: langProp,
  onBack,
}: TouristicPlaceDetailPageProps) {
  const routeParams = useParams();
  const navigate = useNavigate();
  const rootRef = useRef<HTMLElement | null>(null);

  const categoryId = catProp ?? routeParams.categoryId ?? "nature";
  const placeId = idProp ?? routeParams.placeId ?? "";
  const lang = langProp ?? (getAppLanguage() as AppLangCode);

  const dir = lang === "en" ? "ltr" : "rtl";
  const categoryPlaces = categoryDataMap[categoryId] ?? [];
  const place = categoryPlaces.find((item) => item.id === placeId);

  // Fallback default in case path parameters are misaligned
  const fallbackPlace: TouristicPlace = {
    id: "fallback",
    name: "Shanidar Cave",
    location: "Erbil, Kurdistan",
    image: "",
    description: "An incredible destination waiting for deep cultural, natural, and historic discovery in Kurdistan.",
  };

  const activePlace = place ?? fallbackPlace;
  const placeName = getLocalizedValue(activePlace, "name", lang);
  const placeLocation = getLocalizedValue(activePlace, "location", lang);
  const placeDescription = getLocalizedValue(activePlace, "description", lang);
  const kickerLabel = categoryLabels[lang]?.[categoryId] ?? "Touristic Site";

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  // GSAP Entrance Transitions
  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-tour-hero='true']", { autoAlpha: 0, scale: 1.05 });
      gsap.set("[data-tour-fade='true']", { autoAlpha: 0, y: 24 });
      gsap.set("[data-tour-card='true']", { autoAlpha: 0, y: 32, rotateX: -6, transformOrigin: "center top" });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.to("[data-tour-hero='true']", { autoAlpha: 1, scale: 1, duration: 1.4, ease: "power3.out" })
        .to("[data-tour-fade='true']", { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1 }, "-=0.8")
        .to("[data-tour-card='true']", { autoAlpha: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.12 }, "-=0.4");
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Fetch the custom category card details
  const detailCards = categoryHighlightCards[lang]?.[categoryId] ?? categoryHighlightCards[lang].nature;

  return (
    <main ref={rootRef} dir={dir} className="m-0 min-h-screen w-full max-w-none bg-[#f8f1e7] text-[#17233b] overflow-x-hidden">
      <section className="relative mx-auto flex min-h-screen w-[min(100vw,1400px)] flex-col overflow-y-auto overflow-x-hidden md:overflow-hidden rounded-[22px] bg-[#fbf5eb]">
        {/* Responsive Back Button */}
        <button
          type="button"
          onClick={handleBack}
          className="journey-detail-back absolute left-4 top-4 z-30 grid h-12 w-12 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm sm:left-8 sm:top-8 sm:h-14 sm:w-14 lg:h-16 lg:w-16"
          aria-label="Back"
        >
          <ArrowLeft size={detailBackIconSize} className={detailBackIconClassName(dir)} />
        </button>

        {/* Paper texture columns (Desktop Only) */}
        <div className="absolute left-0 top-[120px] h-full w-24 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px] hidden sm:block" />
        <div className="absolute right-0 top-[120px] h-full w-24 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px] hidden sm:block" />

        {/* Mobile View Hero Header (Stacked Flow) */}
        {activePlace.image && (
          <div
            data-tour-hero="true"
            className="pointer-events-none w-full h-[35vh] min-h-[240px] relative overflow-hidden sm:hidden"
          >
            <img
              src={activePlace.image}
              alt={placeName}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div
              className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#fbf5eb] to-transparent"
              aria-hidden
            />
          </div>
        )}

        {/* Desktop View Hero Background (Absolute Placement with Blend Gradient) */}
        {activePlace.image && (
          <div className="pointer-events-none absolute right-0 top-0 h-[min(100vh,1500px)] w-full hidden sm:block">
            <img
              data-tour-hero="true"
              src={activePlace.image}
              alt={placeName}
              className="absolute inset-0 h-full w-full object-cover opacity-25 sm:opacity-50 md:opacity-92 [mask-image:radial-gradient(circle_at_58%_48%,black_0%,black_55%,transparent_84%)]"
            />
          </div>
        )}

        <div className="relative z-10 flex flex-1 flex-col px-[clamp(1.4rem,4vw,4rem)] pt-24 sm:pt-[clamp(1.2rem,4vh,3.5rem)] pb-12 md:pb-[clamp(1.2rem,3vh,2.6rem)]">
          {/* Main Info */}
          <section className="w-full max-w-full md:max-w-[min(45vw,670px)]">
            <p data-tour-fade="true" className="text-[clamp(1.1rem,1.8vw,1.5rem)] font-semibold uppercase tracking-[0.25em] text-[#9b6d35]">
              {kickerLabel}
            </p>

            <h1 data-tour-fade="true" className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] md:text-[clamp(4.2rem,8vw,6.5rem)] font-light leading-none tracking-tight text-[#17233b] mt-2 whitespace-pre-line">
              {placeName}
            </h1>

            <p data-tour-fade="true" className="mt-3 text-[clamp(1rem,1.5vw,1.4rem)] font-light text-[#59625d] flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[#b99152] shrink-0" />
              {placeLocation}
            </p>

            <div data-tour-fade="true" className="my-6 flex w-[140px] items-center gap-3 text-[#b99152]">
              <span className="h-0.5 flex-1 bg-[#d2b475]" />
              <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
              <span className="h-0.5 flex-1 bg-[#d2b475]" />
            </div>

            <p data-tour-fade="true" className="w-full max-w-full md:max-w-[min(42vw,600px)] text-[clamp(1.05rem,1.75vw,1.6rem)] font-light leading-relaxed text-[#2d3549]">
              {placeDescription}
            </p>
          </section>

          {/* Spacer Block (Pushes Highlights to Bottom on Desktop) */}
          <div className="mt-8 flex-0 md:flex-[0.85] md:mt-0" />

          {/* Cards: Highlights Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {detailCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <article
                  key={i}
                  data-tour-card="true"
                  className="journey-detail-card relative flex min-h-[16rem] md:min-h-[20rem] flex-col items-center overflow-hidden rounded-[26px] border-2 border-[#ead8b7] bg-white/76 px-6 py-8 text-center shadow-[0_14px_35px_rgba(84,54,16,0.15)] backdrop-blur-md"
                >
                  <div
                    className="grid h-14 w-14 md:h-20 md:w-20 place-items-center rounded-full border-[3px] md:border-[5px] border-white text-[#f8e5b8] shadow-md shrink-0 mb-4"
                    style={{ backgroundColor: card.color }}
                  >
                    <Icon className="h-6 w-6 md:h-10 md:w-10" strokeWidth={1.5} />
                  </div>

                  <h3 className="font-serif text-[clamp(1.25rem,2.15vw,2.25rem)] font-light leading-tight text-[#17233b]">
                    {card.title}
                  </h3>

                  <div className="my-3 flex w-24 items-center justify-center gap-2 text-[#b99152]">
                    <span className="h-px flex-1 bg-[#d2b475]" />
                    <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
                    <span className="h-px flex-1 bg-[#d2b475]" />
                  </div>

                  <p className="text-[clamp(0.95rem,1.35vw,1.35rem)] font-light leading-relaxed text-[#303a50]">
                    {card.descTemplate}
                  </p>

                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:18px_18px]" />
                </article>
              );
            })}
          </section>
        </div>
      </section>
    </main>
  );
}