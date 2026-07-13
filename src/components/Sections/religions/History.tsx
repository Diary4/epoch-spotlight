import React from "react";
import gsap from "gsap";
import {
  ArrowLeft,
  Globe2,
  Mountain,
  Star,
  Cross,
  Sun,
  Quote,
  type LucideIcon,
} from "lucide-react";
import { detailBackIconClassName, detailBackIconSize } from "@/constants/backNavigation";

import ReligionInfoCard from "@/components/Sections/religions/ReligionInfoCard";

import bg from "@/assets/images/religions/r-1.webp";
import ancientRootsImg from "@/assets/images/religions/faiths.webp";
import jewishCommunityImg from "@/assets/images/religions/j-1.webp";
import christiansImg from "@/assets/images/religions/r-5.webp";
import bahaullahImg from "@/assets/images/religions/b-1.webp";

type LangCode = "en" | "ku" | "ar";

type HistoryCardId = "ancient-roots" | "jewish-community" | "christians" | "bahaullah";

const CARD_IMAGES: Record<HistoryCardId, string> = {
  "ancient-roots": ancientRootsImg,
  "jewish-community": jewishCommunityImg,
  christians: christiansImg,
  bahaullah: bahaullahImg,
};

type SlideCard = {
  id: HistoryCardId;
  number: number;
  title: string;
  body: string;
  icon: LucideIcon;
  accent: string;
  isQuote?: boolean;
};

type Slide = {
  id: string;
  number: number;
  eyebrow: string;
  title: string;
  subtitle: string;
  cards: SlideCard[];
  tagline: string;
};

type HistoryContent = {
  back: string;
  sectionLabel: string;
  pageTitle: string;
  pageDescription: string;
  cardLabel: string;
  slides: Slide[];
};

const content: Record<LangCode, HistoryContent> = {
  en: {
    back: "Back",
    sectionLabel: "Section 2",
    pageTitle: "History",
    pageDescription:
      "How Kurdistan became a homeland of refuge where threatened peoples always found safety.",
    cardLabel: "Card",
    slides: [
      {
        id: "land-of-refuge",
        number: 3,
        eyebrow: "Slide 3",
        title: "A Land of Refuge",
        subtitle: "Where threatened peoples always found safety",
        cards: [
          {
            id: "ancient-roots",
            number: 1,
            title: "Ancient Roots",
            body: "Religions including Mithraism, Judaism, Zoroastrianism, Christianity, Yazidism, and Islam all flourished here since ancient times.",
            icon: Mountain,
            accent: "#7a4a12",
          },
          {
            id: "jewish-community",
            number: 2,
            title: "Jewish Community",
            body: "Jews settled in Kurdistan in the 6th century BCE and chose to remain because they found Kurds exceptionally tolerant.",
            icon: Star,
            accent: "#2a3550",
          },
          {
            id: "christians",
            number: 3,
            title: "Christians",
            body: "Christianity reached Erbil in the 1st century CE through Apostles Addai and Mari. Erbil became a major Christian center by the 3rd century.",
            icon: Cross,
            accent: "#244b1f",
          },
          {
            id: "bahaullah",
            number: 4,
            title: "Bahá'u'lláh",
            body: "Founder of the Baha'i Faith chose Kurdistan for seclusion, describing it as \u201Cthe happiest days of his life.\u201D",
            icon: Sun,
            accent: "#a05a14",
          },
        ],
        tagline:
          "Stability and peace made Kurdistan a sanctuary through the ages.",
      },
    ],
  },
  ku: {
    back: "گەڕانەوە",
    sectionLabel: "بەشی ٢",
    pageTitle: "مێژوو",
    pageDescription:
      "چۆن کوردستان بوو بە نیشتمانی پەناگە کە گەلانی ترسێنراو هەمیشە تێیدا ئاسایشیان دۆزیوەتەوە.",
    cardLabel: "کارت",
    slides: [
      {
        id: "land-of-refuge",
        number: 3,
        eyebrow: "سلایدی ٣",
        title: "وڵاتی پەنابەری",
        subtitle: "شوێنێک کە گەلانی ترسێنراو هەمیشە تێیدا ئاسایشیان دۆزیوەتەوە",
        cards: [
          {
            id: "ancient-roots",
            number: 1,
            title: "ڕەگەکانی کۆن",
            body: "ئاینەکانی وەک میترایی، جوولەکە، زەردەشتی، مەسیحی، ئێزدی، و ئیسلام لێرە لە کۆنەوە گەشەیان کردووە.",
            icon: Mountain,
            accent: "#7a4a12",
          },
          {
            id: "jewish-community",
            number: 2,
            title: "کۆمەڵگەی جوولەکە",
            body: "جوولەکە لە سەدەی شەشەمی پێش زاینی لە کوردستان نیشتەجێ بوون و لێرە مانەوە چونکە کوردیان وەک گەلێکی زۆر چاوپۆشێن دۆزیەوە.",
            icon: Star,
            accent: "#2a3550",
          },
          {
            id: "christians",
            number: 3,
            title: "مەسیحیەکان",
            body: "مەسیحیەت لە سەدەی یەکەمی زاینی لە ڕێگەی نێردراوەکانی ئەدای و ماری گەیشتە هەولێر. هەولێر لە سەدەی سێیەمدا بوو بە سەنتەرێکی گرنگی مەسیحیەت.",
            icon: Cross,
            accent: "#244b1f",
          },
          {
            id: "bahaullah",
            number: 4,
            title: "بەهائوڵڵا",
            body: "دامەزرێنەری ئاینی بەهائی کوردستانی بۆ گۆشەگیری هەڵبژارد، و وەسفی کرد بە «خۆشترین ڕۆژەکانی ژیانی».",
            icon: Sun,
            accent: "#a05a14",
          },
        ],
        tagline:
          "جێگیری و ئاشتی کوردستانی کردووە بە پەناگەیەک بەدرێژایی سەردەمەکان.",
      },
    ],
  },
  ar: {
    back: "العودة",
    sectionLabel: "القسم ٢",
    pageTitle: "التاريخ",
    pageDescription:
      "كيف صارت كوردستان أرض لجوء حيث وجدت الشعوب المهددة الأمان دائماً.",
    cardLabel: "البطاقة",
    slides: [
      {
        id: "land-of-refuge",
        number: 3,
        eyebrow: "الشريحة ٣",
        title: "أرض اللجوء",
        subtitle: "حيث وجدت الشعوب المهددة الأمان دائماً",
        cards: [
          {
            id: "ancient-roots",
            number: 1,
            title: "جذور قديمة",
            body: "ازدهرت هنا منذ القدم أديان منها المثرائية، اليهودية، الزرادشتية، المسيحية، الإيزيدية، والإسلام.",
            icon: Mountain,
            accent: "#7a4a12",
          },
          {
            id: "jewish-community",
            number: 2,
            title: "الجالية اليهودية",
            body: "استقرّ اليهود في كوردستان في القرن السادس قبل الميلاد واختاروا البقاء لأنهم وجدوا الكورد متسامحين بشكل استثنائي.",
            icon: Star,
            accent: "#2a3550",
          },
          {
            id: "christians",
            number: 3,
            title: "المسيحيون",
            body: "وصلت المسيحية إلى أربيل في القرن الأول الميلادي عبر الرسولين أداي وماري، وأصبحت أربيل مركزاً مسيحياً رئيسياً بحلول القرن الثالث.",
            icon: Cross,
            accent: "#244b1f",
          },
          {
            id: "bahaullah",
            number: 4,
            title: "بهاء الله",
            body: "اختار مؤسس الديانة البهائية كوردستان للخلوة ووصفها بأنها «أسعد أيام حياته».",
            icon: Sun,
            accent: "#a05a14",
          },
        ],
        tagline:
          "الاستقرار والسلام جعلا كوردستان ملاذاً عبر العصور.",
      },
    ],
  },
};

function DecorativeLine({ color = "#c99a55" }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <span className="h-px flex-1" style={{ backgroundColor: color }} />
      <span className="text-2xl" style={{ color }}>
        ✥
      </span>
      <span className="h-px flex-1" style={{ backgroundColor: color }} />
    </div>
  );
}

function HistoryOverviewCard({ card, index }: { card: SlideCard; index: number }) {
  return (
    <div data-h-animate="true">
      <ReligionInfoCard
        title={card.title}
        body={card.body}
        image={CARD_IMAGES[card.id]}
        accent={card.accent}
        accentIndex={index}
        italicBody={card.isQuote}
        titleClassName="uppercase"
      />
    </div>
  );
}

type HistoryPageProps = {
  lang?: LangCode;
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function HistoryPage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: HistoryPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const c = content[lang];
  const dir = lang === "en" ? "ltr" : "rtl";

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-h-hero='true']", { autoAlpha: 0, scale: 1.04 });
      gsap.set("[data-h-animate='true']", { autoAlpha: 0, y: 24 });

      const tl = gsap.timeline();
      tl.to("[data-h-hero='true']", {
        autoAlpha: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      }).to(
        "[data-h-animate='true']",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.05,
          ease: "power2.out",
        },
        "-=0.2",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <main
      dir={dir}
      className="m-0 flex min-h-screen w-screen justify-center bg-[#faf8f5] p-0 text-[#3d2b18]"
    >
      <section
        ref={sectionRef}
        className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#faf8f5] px-6 pt-10 sm:px-12 lg:px-20"
      >
        <img
          data-h-hero="true"
          src={bg}
          alt=""
          className="absolute inset-0 h-[60vh] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]"
        />
        <div className="absolute inset-x-0 top-0 h-[60vh] bg-gradient-to-b from-[#faf8f5]/72 via-[#faf8f5]/30 to-[#faf8f5]/95" />

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="absolute left-8 top-1/2 z-30 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full border-2 border-[#d9b477] bg-white/80 text-[#5a3a18] shadow-sm"
            aria-label={c.back}
          >
            <ArrowLeft size={detailBackIconSize} className={detailBackIconClassName(dir)} />
          </button>
        )}

        {onLanguageChange && (
          <button
            type="button"
            onClick={onLanguageChange}
            className="absolute right-8 top-8 z-30 flex items-center gap-3 rounded-full border border-[#d9b477] bg-white/75 px-5 py-3 font-serif text-sm font-semibold text-[#4b3219] shadow-[0_8px_20px_rgba(84,54,16,0.15)]"
          >
            <Globe2 className="h-5 w-5" />
            {languageLabel}
          </button>
        )}

        <div className="relative z-10 mx-auto min-h-screen w-full max-w-[1180px]">
          <header
            data-h-animate="true"
            className="mx-auto max-w-[850px] shrink-0 pt-14 text-center"
          >
            <div className="mx-auto mt-3 mb-3 w-[260px]">
              <DecorativeLine color="#c3923a" />
            </div>
            <h1 className="font-serif text-[56px] font-semibold uppercase leading-[1.04] tracking-[0.04em] text-[#3b2410] sm:text-[76px] lg:text-[88px]">
              {c.pageTitle}
            </h1>
            <div className="mx-auto mt-5 w-[180px]">
              <DecorativeLine color="#c3923a" />
            </div>
            <p className="mx-auto mt-5 max-w-[620px] text-[19px] font-semibold leading-relaxed text-[#4d3c2a] sm:text-[22px]">
              {c.pageDescription}
            </p>
          </header>

          {c.slides.map((slide) => (
            <section
              key={slide.id}
              data-h-animate="true"
              className="absolute inset-x-0 top-[50vh] z-10 w-full pb-[200px]"
              aria-labelledby={`h-slide-${slide.id}`}
            >
              <div className="mx-auto max-w-[860px] text-center">
                <h2
                  id={`h-slide-${slide.id}`}
                  className="font-serif text-[36px] font-semibold uppercase leading-tight tracking-[0.04em] text-[#3b2410] sm:text-[48px]"
                >
                  {slide.title}
                </h2>
                <div className="mx-auto mt-4 w-[200px]">
                  <DecorativeLine color="#c3923a" />
                </div>
                <p className="mx-auto mt-4 max-w-[640px] font-serif text-[18px] italic text-[#6a4a25] sm:text-[20px]">
                  {slide.subtitle}
                </p>
              </div>

              <div className="mx-auto mt-10 grid w-full max-w-[1280px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {slide.cards.map((card, index) => (
                  <HistoryOverviewCard key={card.id} card={card} index={index} />
                ))}
              </div>

              <div className="mx-auto mt-10 max-w-[860px] rounded-[20px] border-2 border-[#c99745]/55 bg-[#fff7e7]/95 px-7 py-5 text-center shadow-[0_12px_26px_rgba(75,45,12,0.14)]">
                <p className="font-serif text-[17px] font-semibold italic leading-snug text-[#6a4a25] sm:text-[19px]">
                  {slide.tagline}
                </p>
              </div>
            </section>
          ))}
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 h-[180px] w-full bg-gradient-to-t from-[#b9893d]/20 to-transparent" />
      </section>
    </main>
  );
}
