import React from "react";
import gsap from "gsap";
import {
  ArrowLeft,
  Globe2,
  Landmark,
  Vote,
  Scale,
  DoorOpen,
  ShieldCheck,
  Tv,
  type LucideIcon,
} from "lucide-react";
import { detailBackIconClassName, detailBackIconSize } from "@/constants/backNavigation";

import ReligionInfoCard from "@/components/Sections/religions/ReligionInfoCard";

import bg3 from "@/assets/images/religions/r-8.webp";
import governmentImg from "@/assets/mainImages/government.webp";
import parliamentImg from "@/assets/mainImages/parliment.webp";
import letterImg from "@/assets/mainImages/letter.webp";
import buildingImg from "@/assets/mainImages/building.webp";
import sharedImg from "@/assets/mainImages/shared.webp";
import mediaImg from "@/assets/images/religions/r-6.webp";

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

const CARD_IMAGES: Record<RightsCardId, string> = {
  krg: governmentImg,
  parliament: parliamentImg,
  laws: letterImg,
  year2014: buildingImg,
  refuge: sharedImg,
  media: mediaImg,
};

const content: Record<LangCode, RightsOverviewContent> = {
  en: {
    back: "Back",
    pageTitle: "Rights & Recognition",
    pageSubtitle: "A government for all its peoples.",
    pageDescription:
      "From the first democratic election in 1992 to the laws of today, Kurdistan has built a framework that recognizes, protects, and celebrates every community.",
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

function RightsOverviewCardButton({
  card,
  imageSrc,
  index,
  onOpen,
}: {
  card: RightsOverviewCard;
  imageSrc: string;
  index: number;
  onOpen: () => void;
}) {
  return (
    <div data-rts-animate="true">
      <ReligionInfoCard
        title={card.title}
        body={card.subtitle}
        image={imageSrc}
        accentIndex={index}
        onClick={onOpen}
        titleClassName="uppercase text-[26px] sm:text-[30px] font-light"
        bodyClassName="text-[15px] sm:text-[16px] font-light"
      />
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
      className="m-0 flex min-h-screen w-screen justify-center bg-[#faf8f5] p-0 text-[#3d2b18]"
    >
      <section
        ref={sectionRef}
        className="relative w-full overflow-x-hidden bg-[#faf8f5] px-6 pb-20 pt-10 sm:px-12 lg:px-20"
      >
        <img
          data-rts-hero="true"
          src={bg3}
          alt=""
          className="absolute inset-0 h-[60vh] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]"
        />
        <div className="absolute inset-x-0 top-0 h-[60vh] bg-gradient-to-b from-[#faf8f5]/72 via-[#faf8f5]/30 to-[#faf8f5]/95" />

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="absolute left-8 top-8 z-30 grid h-14 w-14 place-items-center rounded-full border-2 border-[#d9b477] bg-white/80 text-[#5a3a18] shadow-sm transition"
            aria-label={c.back}
          >
            <ArrowLeft size={detailBackIconSize} className={detailBackIconClassName(dir)} />
          </button>
        )}

        {onLanguageChange && (
          <button
            type="button"
            onClick={onLanguageChange}
            className="absolute right-8 top-8 z-30 flex items-center gap-3 rounded-full border border-[#d9b477] bg-white/75 px-5 py-3 font-serif text-sm font-semibold text-[#4b3219] shadow-[0_8px_20px_rgba(84,54,16,0.15)] transition"
          >
            <Globe2 className="h-5 w-5" />
            {languageLabel}
          </button>
        )}

        <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col">
          <header
            data-rts-animate="true"
            className="mx-auto max-w-[900px] pt-28 text-center sm:pt-40"
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

          <div className="mx-auto mt-[clamp(80px,50vh,700px)] grid w-full max-w-[1200px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {c.cards.map((card, index) => (
              <RightsOverviewCardButton
                key={card.id}
                card={card}
                imageSrc={CARD_IMAGES[card.id]}
                index={index}
                onOpen={() => onOpenCard?.(card.id)}
              />
            ))}
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
