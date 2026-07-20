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
import { detailBackIconClassName, detailBackIconSize, religionsOverlayStartClassName, religionsOverlayEndClassName } from "@/constants/backNavigation";
import { cn } from "@/lib/utils";

import ReligionInfoCard from "@/components/Sections/religions/ReligionInfoCard";
import ReligionsScaledPage from "@/components/Sections/religions/ReligionsScaledPage";

import bg3 from "@/assets/images/religions/r-8.webp";
import governmentImg from "@/assets/images/religions/rights/krg_cabinet.jpg";
import parliamentImg from "@/assets/images/religions/rights/images.jpeg";
import letterImg from "@/assets/mainImages/letter.webp";
import buildingImg from "@/assets/images/religions/rights/Hawler_Castle.jpg";
import sharedImg from "@/assets/mainImages/shared.webp";
import mediaImg from "@/assets/images/religions/r-6.webp";

type LangCode = "en" | "ku" | "ar";
type TabId = "institutions" | "sanctuary";

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

type TabContent = {
  subtitle: string;
  tagline: string;
  cards: RightsOverviewCard[];
};

type RightsOverviewContent = {
  back: string;
  pageTitle: string;
  pageDescription: string;
  institutionsTab: string;
  sanctuaryTab: string;
  institutions: TabContent;
  sanctuary: TabContent;
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
    pageDescription:
      "From the first democratic election in 1992 to the laws of today, Kurdistan has built a framework that recognizes, protects, and celebrates every community.",
    institutionsTab: "Institutions",
    sanctuaryTab: "Sanctuary",
    institutions: {
      subtitle: "A government for all its peoples.",
      tagline: "Recognition is the foundation of coexistence.",
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
      ],
    },
    sanctuary: {
      subtitle: "When the world watched, Kurdistan acted.",
      tagline: "Safety, dignity, and a place to belong.",
      cards: [
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
    },
  },
  ku: {
    back: "گەڕانەوە",
    pageTitle: "ماف و ناسینەوە",
    pageDescription:
      "لە یەکەم هەڵبژاردنی دیموکراسی ١٩٩٢ ەوە تاکوو یاساکانی ئەمڕۆ، کوردستان چوارچێوەیەکی بنیات ناوە کە هەموو کۆمەڵگەیەک دەناسێتەوە، دەپارێزێت و پێی ئاهەنگ دەگێڕێ.",
    institutionsTab: "دامەزراوەکان",
    sanctuaryTab: "پەناگە",
    institutions: {
      subtitle: "حکومەتێک بۆ هەموو گەلەکانی.",
      tagline: "ناسینەوە بنەمای پێکەوەژیانە.",
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
      ],
    },
    sanctuary: {
      subtitle: "کاتێک جیهان سەیری دەکرد، کوردستان کاری کرد.",
      tagline: "سەلامەتی، شکۆ و شوێنێک بۆ سەرکەوتن.",
      cards: [
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
    },
  },
  ar: {
    back: "العودة",
    pageTitle: "الحقوق والاعتراف",
    pageDescription:
      "من أول انتخابات ديمقراطية عام ١٩٩٢ إلى قوانين اليوم، أرست كوردستان إطاراً يعترف بكل مجتمع ويحميه ويحتفي به.",
    institutionsTab: "المؤسسات",
    sanctuaryTab: "الملاذ",
    institutions: {
      subtitle: "حكومة لكل شعوبها.",
      tagline: "الاعتراف هو أساس التعايش.",
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
      ],
    },
    sanctuary: {
      subtitle: "حين كان العالم يراقب، تحرّكت كوردستان.",
      tagline: "أمان، كرامة، ومكان للانتماء.",
      cards: [
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
    },
  },
};

const tabs: { id: TabId; icon: LucideIcon }[] = [
  { id: "institutions", icon: Landmark },
  { id: "sanctuary", icon: ShieldCheck },
];

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
  const [activeTab, setActiveTab] = React.useState<TabId>("institutions");
  const c = content[lang];
  const dir = lang === "en" ? "ltr" : "rtl";
  const tabPanel = activeTab === "institutions" ? c.institutions : c.sanctuary;

  React.useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      gsap.set("[data-rts-hero='true']", { autoAlpha: 0 });
      gsap.set("[data-rts-animate='true']", { autoAlpha: 0, y: 24 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to("[data-rts-hero='true']", {
        autoAlpha: 1,
        duration: 1.0,
      }).to(
        "[data-rts-animate='true']",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.08,
        },
        "-=0.5",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <ReligionsScaledPage
      dir={dir}
      lang={lang}
      fitDeps={[lang]}
      sectionRef={sectionRef}
      className="min-h-full px-12 pb-12"
    >
      <img
        data-rts-hero="true"
        src={bg3}
        alt=""
        className="pointer-events-none absolute inset-x-0 top-[220px] z-0 h-[900px] w-full object-cover object-center [mask-image:linear-gradient(to_bottom,transparent_0%,black_14%,black_86%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_14%,black_86%,transparent_100%)]"
      />
      <div className="pointer-events-none absolute inset-x-0 top-[220px] z-[1] h-[900px] bg-[linear-gradient(to_bottom,#faf8f5_0%,transparent_16%,transparent_84%,#faf8f5_100%)]" />

      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className={`absolute top-1/2 z-30 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full border-2 border-[#d9b477] bg-white/80 text-[#5a3a18] shadow-sm ${religionsOverlayStartClassName(dir)}`}
          aria-label={c.back}
        >
          <ArrowLeft size={detailBackIconSize} className={detailBackIconClassName(dir)} />
        </button>
      )}

      {onLanguageChange && (
        <button
          type="button"
          onClick={onLanguageChange}
          className={`absolute top-8 z-30 flex items-center gap-3 rounded-full border border-[#d9b477] bg-white/75 px-5 py-3 font-serif text-sm font-semibold text-[#4b3219] shadow-[0_8px_20px_rgba(84,54,16,0.15)] ${religionsOverlayEndClassName(dir)}`}
        >
          <Globe2 className="h-5 w-5" />
          {languageLabel}
        </button>
      )}

      <div className="relative z-10 mx-auto flex min-h-full w-full max-w-[1220px] flex-col">
        <header data-rts-animate="true" className="mx-auto max-w-[850px] shrink-0 pt-8 text-center">
          <div className="mx-auto mb-2 w-[220px]">
            <DecorativeLine color="#c3923a" />
          </div>
          <h1 className="font-serif text-[64px] font-semibold uppercase leading-[1.02] tracking-[0.04em] text-[#3b2410]">
            {c.pageTitle}
          </h1>
          <div className="mx-auto mt-4 w-[160px]">
            <DecorativeLine color="#c3923a" />
          </div>
          <p className="mx-auto mt-4 max-w-[640px] text-[18px] font-medium leading-relaxed text-[#4d3c2a]">
            {c.pageDescription}
          </p>
        </header>

        <section data-rts-animate="true" className="mt-[920px] flex flex-1 flex-col pb-4">
          <nav className="mb-6 flex shrink-0 justify-center border-b border-[#d7b77e]/45">
            <div className="flex gap-2">
              {tabs.map((tab) => {
                const label =
                  tab.id === "institutions" ? c.institutionsTab : c.sanctuaryTab;
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-3 border-b-2 px-8 py-3.5 font-serif text-[20px] transition-colors",
                      isActive
                        ? "border-[#b98222] text-[#2f1f12]"
                        : "border-transparent text-[#8a6a45] hover:text-[#3f2b17]",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {label}
                  </button>
                );
              })}
            </div>
          </nav>

          <div className="mb-6 text-center">
            <p className="font-serif text-[20px] italic text-[#6a4a25]">{tabPanel.subtitle}</p>
          </div>

          <div className="grid w-full flex-1 grid-cols-3 content-stretch gap-5">
            {tabPanel.cards.map((card, index) => (
              <ReligionInfoCard
                key={card.id}
                title={card.title}
                body={card.subtitle}
                image={CARD_IMAGES[card.id]}
                accent={card.accent}
                accentIndex={index}
                onClick={() => onOpenCard?.(card.id)}
                ariaLabel={card.title}
                titleClassName="uppercase text-[22px] font-light leading-tight"
                bodyClassName="text-[14px] font-light"
                imageHeightClass="min-h-[280px] flex-1"
                className="min-h-full"
              />
            ))}
          </div>

          <div className="mx-auto mt-8 w-full max-w-[920px] shrink-0 rounded-[28px] border-2 border-[#c99745]/55 bg-[#fff7e7]/95 px-8 py-6 text-center shadow-[0_12px_26px_rgba(75,45,12,0.14)]">
            <p className="font-serif text-[22px] font-semibold italic leading-snug text-[#6a4a25]">
              {tabPanel.tagline}
            </p>
          </div>
        </section>
      </div>
    </ReligionsScaledPage>
  );
}
