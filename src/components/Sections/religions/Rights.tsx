import React from "react";
import gsap from "gsap";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Globe2,
  Landmark,
  Vote,
  Scale,
  DoorOpen,
  ShieldCheck,
  Tv,
  type LucideIcon,
} from "lucide-react";

import bg from "@/assets/images/religions/r-7.png";
import bg2 from "@/assets/images/religions/r-3.png";

type LangCode = "en" | "ku" | "ar";

export type RightsCardId =
  | "krg"
  | "parliament"
  | "laws"
  | "year2014"
  | "refuge"
  | "media";

type RightsOverviewCard = {
  id: RightsCardId;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  accent: string;
};

type RightsOverviewContent = {
  back: string;
  pageTitle: string;
  pageSubtitle: string;
  pageDescription: string;
  openLabel: string;
  cards: RightsOverviewCard[];
  tagline: string;
};

const ACCENTS = {
  krg: "#52235f",
  parliament: "#7a4a12",
  laws: "#244b1f",
  year2014: "#6b1d1d",
  refuge: "#16466b",
  media: "#a05a18",
} as const;

const ICONS: Record<RightsCardId, LucideIcon> = {
  krg: Landmark,
  parliament: Vote,
  laws: Scale,
  year2014: DoorOpen,
  refuge: ShieldCheck,
  media: Tv,
};

const content: Record<LangCode, RightsOverviewContent> = {
  en: {
    back: "Back",
    pageTitle: "Rights & Recognition",
    pageSubtitle: "A government for all its peoples.",
    pageDescription:
      "From the first democratic election in 1992 to the laws of today, Kurdistan has built a framework that recognizes, protects, and celebrates every community.",
    openLabel: "Open",
    cards: [
      {
        id: "krg",
        title: "The Kurdistan Regional Government",
        subtitle: "A government for all its peoples.",
        icon: ICONS.krg,
        accent: ACCENTS.krg,
      },
      {
        id: "parliament",
        title: "Voices in Parliament",
        subtitle: "Every community has a seat at the table.",
        icon: ICONS.parliament,
        accent: ACCENTS.parliament,
      },
      {
        id: "laws",
        title: "Laws & Protection",
        subtitle: "Rights, dignity, and coexistence.",
        icon: ICONS.laws,
        accent: ACCENTS.laws,
      },
      {
        id: "year2014",
        title: "2014 — Kurdistan Opened Its Doors",
        subtitle: "When the world watched, Kurdistan acted.",
        icon: ICONS.year2014,
        accent: ACCENTS.year2014,
      },
      {
        id: "refuge",
        title: "Kurdistan — A Safe Home",
        subtitle: "Safety, dignity, and a place to belong.",
        icon: ICONS.refuge,
        accent: ACCENTS.refuge,
      },
      {
        id: "media",
        title: "Media & Coexistence",
        subtitle: "Telling every community's story.",
        icon: ICONS.media,
        accent: ACCENTS.media,
      },
    ],
    tagline: "Recognition is the foundation of coexistence.",
  },
  ku: {
    back: "گەڕانەوە",
    pageTitle: "ماف و ناسینەوە",
    pageSubtitle: "حکومەتێک بۆ هەموو گەلەکانی.",
    pageDescription:
      "لە یەکەم هەڵبژاردنی دیموکراسی ١٩٩٢ ەوە تاکوو یاساکانی ئەمڕۆ، کوردستان چوارچێوەیەکی بنیات ناوە کە هەموو کۆمەڵگەیەک دەناسێتەوە، دەپارێزێت و پێی ئاهەنگ دەگێڕێ.",
    openLabel: "بکەرەوە",
    cards: [
      {
        id: "krg",
        title: "حکومەتی هەرێمی کوردستان",
        subtitle: "حکومەتێک بۆ هەموو گەلەکانی.",
        icon: ICONS.krg,
        accent: ACCENTS.krg,
      },
      {
        id: "parliament",
        title: "دەنگەکان لە پەرلەمان",
        subtitle: "هەر کۆمەڵگەیەک کورسییەکی هەیە.",
        icon: ICONS.parliament,
        accent: ACCENTS.parliament,
      },
      {
        id: "laws",
        title: "یاسا و پاراستن",
        subtitle: "ماف، شکۆ و پێکەوەژیان.",
        icon: ICONS.laws,
        accent: ACCENTS.laws,
      },
      {
        id: "year2014",
        title: "٢٠١٤ — کوردستان دەرگاکانی کردەوە",
        subtitle: "کاتێک جیهان سەیری دەکرد، کوردستان کاری کرد.",
        icon: ICONS.year2014,
        accent: ACCENTS.year2014,
      },
      {
        id: "refuge",
        title: "کوردستان — ماڵێکی سەلامەت",
        subtitle: "سەلامەتی، شکۆ و شوێنێک بۆ سەرکەوتن.",
        icon: ICONS.refuge,
        accent: ACCENTS.refuge,
      },
      {
        id: "media",
        title: "میدیا و پێکەوەژیان",
        subtitle: "گێڕانەوەی چیرۆکی هەر کۆمەڵگەیەک.",
        icon: ICONS.media,
        accent: ACCENTS.media,
      },
    ],
    tagline: "ناسینەوە بنەمای پێکەوەژیانە.",
  },
  ar: {
    back: "العودة",
    pageTitle: "الحقوق والاعتراف",
    pageSubtitle: "حكومة لكل شعوبها.",
    pageDescription:
      "من أول انتخابات ديمقراطية عام ١٩٩٢ إلى قوانين اليوم، أرست كوردستان إطاراً يعترف بكل مجتمع ويحميه ويحتفي به.",
    openLabel: "اعرض",
    cards: [
      {
        id: "krg",
        title: "حكومة إقليم كوردستان",
        subtitle: "حكومة لكل شعوبها.",
        icon: ICONS.krg,
        accent: ACCENTS.krg,
      },
      {
        id: "parliament",
        title: "أصوات في البرلمان",
        subtitle: "لكل مجتمع مقعد على الطاولة.",
        icon: ICONS.parliament,
        accent: ACCENTS.parliament,
      },
      {
        id: "laws",
        title: "القوانين والحماية",
        subtitle: "حقوق، كرامة، وتعايش.",
        icon: ICONS.laws,
        accent: ACCENTS.laws,
      },
      {
        id: "year2014",
        title: "٢٠١٤ — كوردستان فتحت أبوابها",
        subtitle: "حين كان العالم يراقب، تحرّكت كوردستان.",
        icon: ICONS.year2014,
        accent: ACCENTS.year2014,
      },
      {
        id: "refuge",
        title: "كوردستان — وطن آمن",
        subtitle: "أمان، كرامة، ومكان للانتماء.",
        icon: ICONS.refuge,
        accent: ACCENTS.refuge,
      },
      {
        id: "media",
        title: "الإعلام والتعايش",
        subtitle: "رواية قصة كل مجتمع.",
        icon: ICONS.media,
        accent: ACCENTS.media,
      },
    ],
    tagline: "الاعتراف هو أساس التعايش.",
  },
};

function DecorativeLine({ color = "#c99a55" }: { color?: string }) {
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

type RightsPageProps = {
  lang?: LangCode;
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
  onOpenCard?: (id: RightsCardId) => void;
};

export default function RightsPage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
  onOpenCard,
}: RightsPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const c = content[lang];
  const dir = lang === "en" ? "ltr" : "rtl";
  const ChevronIcon = dir === "rtl" ? ArrowLeft : ArrowRight;

  React.useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set("[data-rts-hero='true']", { autoAlpha: 0, scale: 1.04 });
      gsap.set("[data-rts-animate='true']", { autoAlpha: 0, y: 26 });
      const tl = gsap.timeline();
      tl.to("[data-rts-hero='true']", {
        autoAlpha: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
      }).to(
        "[data-rts-animate='true']",
        { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.06, ease: "power2.out" },
        "-=0.45",
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [lang]);

  return (
    <main
      dir={dir}
      className="m-0 flex min-h-screen w-screen justify-center bg-[#f8f1e7] p-0 text-[#3d2b18]"
    >
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden bg-[#fbf1df] px-6 pb-20 pt-10 sm:px-12 lg:px-20"
      >
        <img
          data-rts-hero="true"
          src={bg}
          alt=""
          className="absolute inset-0 h-[60vh] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]"
        />
        <div className="absolute inset-x-0 top-0 h-[60vh] bg-gradient-to-b from-[#fbf1df]/72 via-[#fbf1df]/30 to-[#f4dfbb]/95" />
        <div className="pointer-events-none absolute inset-5 rounded-[30px] border-2 border-[#d2a35a]/45" />

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="absolute left-8 top-8 z-30 grid h-14 w-14 place-items-center rounded-full border-2 border-[#d9b477] bg-white/80 text-[#5a3a18] shadow-sm transition hover:bg-white"
            aria-label={c.back}
          >
            <ArrowLeft className="h-7 w-7" />
          </button>
        )}

        {onLanguageChange && (
          <button
            type="button"
            onClick={onLanguageChange}
            className="absolute right-8 top-8 z-30 flex items-center gap-3 rounded-full border border-[#d9b477] bg-white/75 px-5 py-3 font-serif text-sm font-semibold text-[#4b3219] shadow-[0_8px_20px_rgba(84,54,16,0.15)] transition hover:bg-white"
          >
            <Globe2 className="h-5 w-5" />
            {languageLabel}
          </button>
        )}

        <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col">
          <header
            data-rts-animate="true"
            className="mx-auto max-w-[900px] pt-28 text-center sm:pt-32"
          >
            <div className="mx-auto mb-3 w-[260px]">
              <DecorativeLine color="#c3923a" />
            </div>
            <h1 className="font-serif text-[44px] font-semibold uppercase leading-[1.06] tracking-[0.04em] text-[#3b2410] sm:text-[64px] lg:text-[76px]">
              {c.pageTitle}
            </h1>
            <div className="mx-auto mt-5 w-[180px]">
              <DecorativeLine color="#c3923a" />
            </div>
            <p className="mx-auto mt-5 max-w-[700px] font-serif text-[18px] italic text-[#6a4a25] sm:text-[22px]">
              {c.pageSubtitle}
            </p>
            <p className="mx-auto mt-4 max-w-[720px] text-[15px] font-medium leading-relaxed text-[#4d3c2a] sm:text-[17px]">
              {c.pageDescription}
            </p>
          </header>

          <div className="mx-auto mt-12 grid w-full max-w-[1200px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {c.cards.map((card) => {
              const Icon = card.icon;
              return (
                <button
                  key={card.id}
                  type="button"
                  data-rts-animate="true"
                  onClick={() => onOpenCard?.(card.id)}
                  className="group relative flex flex-col overflow-hidden rounded-[24px] border-2 border-[#f3dfb5] bg-white/92 text-start shadow-[0_16px_32px_rgba(69,43,14,0.16)] transition hover:-translate-y-1 hover:shadow-[0_22px_42px_rgba(69,43,14,0.24)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c3923a]"
                >
                  <div
                    className="relative h-[120px] w-full"
                    style={{
                      background: `linear-gradient(135deg, ${card.accent} 0%, ${card.accent}cc 100%)`,
                    }}
                  >
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.18]"
                      style={{
                        backgroundImage: `url(${bg2})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        mixBlendMode: "overlay",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-end px-6">
                      <div className="grid h-12 w-12 place-items-center rounded-full border-2 border-white/40 bg-white/15 backdrop-blur-sm">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col px-6 py-6">
                    <h3 className="font-serif text-[19px] font-semibold uppercase leading-tight text-[#3b2410] sm:text-[21px]">
                      {card.title}
                    </h3>
                    <div className="mb-3 mt-3 w-[60px]">
                      <span
                        className="block h-[2px]"
                        style={{ backgroundColor: card.accent }}
                      />
                    </div>
                    <p className="text-[14.5px] font-medium leading-relaxed text-[#4d3c2a]">
                      {card.subtitle}
                    </p>
                    <span
                      className="mt-5 inline-flex items-center gap-2 self-start rounded-full px-4 py-2 font-serif text-[12.5px] font-semibold uppercase tracking-[0.18em] text-white shadow-sm"
                      style={{ backgroundColor: card.accent }}
                    >
                      {c.openLabel}
                      <ChevronIcon className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div
            data-rts-animate="true"
            className="mx-auto mt-12 max-w-[860px] rounded-[20px] border-2 border-[#c99745]/55 bg-[#fff7e7]/95 px-7 py-5 text-center shadow-[0_12px_26px_rgba(75,45,12,0.14)]"
          >
            <p className="font-serif text-[17px] font-semibold italic leading-snug text-[#6a4a25] sm:text-[19px]">
              {c.tagline}
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 h-[180px] w-full bg-gradient-to-t from-[#b9893d]/20 to-transparent" />
      </section>
    </main>
  );
}
