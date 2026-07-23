import React from "react";
import gsap from "gsap";
import {
  ArrowLeft,
  Globe2,
  MoonStar,
  UsersRound,
} from "lucide-react";
import { detailBackIconClassName, detailBackIconSize, religionsOverlayStartClassName, religionsOverlayEndClassName } from "@/constants/backNavigation";
import { cn } from "@/lib/utils";

import ReligionInfoCard from "@/components/Sections/religions/ReligionInfoCard";
import ReligionsScaledPage from "@/components/Sections/religions/ReligionsScaledPage";

import bg from "@/assets/images/religions/thecradle/cradle.jpeg";
import nationsCover from "@/assets/images/religions/nations/cover.jpeg";
import imgIslam from "@/assets/images/religions/islam/barzani.jpeg";
import imgChristianity from "@/assets/images/religions/christianity/christianity.jpeg";
import imgYazidism from "@/assets/images/religions/yazidi/lalish.jpeg";
import imgYarsanism from "@/assets/images/new/religions/faiths/yarsanism.webp";
import imgZoroastrianism from "@/assets/images/new/religions/faiths/zoroastrianism.webp";
import imgJudaism from "@/assets/images/new/religions/faiths/judaism.webp";
import imgBahai from "@/assets/images/new/religions/faiths/bahai.webp";
import imgSabean from "@/assets/images/new/religions/faiths/sabean-mandaeanism.webp";
import nationKurds from "@/assets/images/new/religions/nations/kurd.webp";
import nationTurkmens from "@/assets/images/religions/nations/turkmen/cover.jpeg";
import nationChaldo from "@/assets/images/new/religions/nations/assyrian.webp";
import nationArmenians from "@/assets/images/new/religions/nations/armenian.webp";

import IslamPage from "@/components/Sections/religions/RelisgionsSection/Islam";
import ChristianityPage from "@/components/Sections/religions/RelisgionsSection/Christianity";
import YazidismPage from "@/components/Sections/religions/RelisgionsSection/Yazidism";
import YarsanismPage from "@/components/Sections/religions/RelisgionsSection/Yarsanism";
import ZoroastrianismPage from "@/components/Sections/religions/RelisgionsSection/Zoroastrianism";
import JudaismPage from "@/components/Sections/religions/RelisgionsSection/Judaism";
import BahaiPage from "@/components/Sections/religions/RelisgionsSection/Bahai";
import SabeanMandaeanismPage from "@/components/Sections/religions/RelisgionsSection/SabeanMandaeanism";
import KurdsPage from "@/components/Sections/religions/nations/Kurds";
import TurkmensPage from "@/components/Sections/religions/nations/Turkmens";
import ChaldoAssyriansPage from "@/components/Sections/religions/nations/ChaldoAssyrians";
import ArmeniansPage from "@/components/Sections/religions/nations/Armenians";

type LangCode = "en" | "ku" | "ar";
type TabId = "religions" | "nations";

type FaithId =
  | "islam"
  | "christianity"
  | "yazidism"
  | "yarsanism"
  | "zoroastrianism"
  | "judaism"
  | "bahai"
  | "sabean-mandaeanism";

type NationId = "kurds" | "turkmens" | "chaldo-assyrians" | "armenians";

type FaithCard = {
  id: FaithId;
  title: string;
  body: string;
  image: string;
};

type NationCard = {
  id: NationId;
  title: string;
  body: string;
  image: string;
  accent: string;
};

type IntroductionContent = {
  back: string;
  pageTitle: string;
  pageDescription: string;
  religionsTab: string;
  nationsTab: string;
  religions: {
    subtitle: string;
    tagline: string;
    cards: FaithCard[];
  };
  nations: {
    subtitle: string;
    tagline: string;
    cards: NationCard[];
  };
};

const faithAccents = ["#7a4a12", "#a05a18", "#b9822d", "#c58b16", "#6f7d4e", "#4d6b7c", "#8c4a54", "#bf7a2f"];

const content: Record<LangCode, IntroductionContent> = {
  en: {
    back: "Back",
    pageTitle: "The Cradle",
    pageDescription:
      "A land where many faiths, languages, and peoples have shared one home.",
    religionsTab: "Religions",
    nationsTab: "Nations",
    religions: {
      subtitle: "Tap a faith to open its story.",
      tagline: "Different faiths. One shared homeland.",
      cards: [
        { id: "islam", title: "Islam", body: "Faith, worship, and living tradition.", image: imgIslam },
        { id: "christianity", title: "Christianity", body: "Ancient roots, faith, and community.", image: imgChristianity },
        { id: "yazidism", title: "Yazidism", body: "Sacred valley, memory, and resilience.", image: imgYazidism },
        { id: "yarsanism", title: "Yarsanism (Kaka'i)", body: "Inner truth, devotion, and community.", image: imgYarsanism },
        { id: "zoroastrianism", title: "Zoroastrianism", body: "Light, truth, and ancient wisdom.", image: imgZoroastrianism },
        { id: "judaism", title: "Judaism", body: "Memory, heritage, and continuity.", image: imgJudaism },
        { id: "bahai", title: "Baha'i Faith", body: "Unity, peace, and one humanity.", image: imgBahai },
        { id: "sabean-mandaeanism", title: "Sabean-Mandaeanism", body: "Living water, purity, and continuity.", image: imgSabean },
      ],
    },
    nations: {
      subtitle: "Tap a people to open their story.",
      tagline: "Different languages. One shared homeland.",
      cards: [
        {
          id: "kurds",
          title: "Kurds",
          body: "The majority people of the Region, carrying language, culture, and hospitality.",
          image: nationKurds,
          accent: "#7a4a12",
        },
        {
          id: "chaldo-assyrians",
          title: "Chaldo-Assyrians",
          body: "Historic Christian communities whose Syriac heritage remains active.",
          image: nationChaldo,
          accent: "#a05a18",
        },
        {
          id: "armenians",
          title: "Armenians",
          body: "A community shaped by sanctuary, memory, and lasting belonging.",
          image: nationArmenians,
          accent: "#b9822d",
        },
        {
          id: "turkmens",
          title: "Turkmens",
          body: "A long-standing community with its own language, culture, and public life.",
          image: nationTurkmens,
          accent: "#c58b16",
        },
      ],
    },
  },
  ku: {
    back: "گەڕانەوە",
    pageTitle: "کوردستان",
    pageDescription: "لانکەی پێکەوەژیان",
    religionsTab: "ئایینەکان",
    nationsTab: "نەتەوەکان",
    religions: {
      subtitle: "لە سەرەتایی مێژووەوە چەندین ئاینی جیاواز لێرەدا سەری هەڵداوە",
      tagline: "ئایینی جیاواز. زمانی جیاواز. یەک نیشتمانی هاوبەش.",
      cards: [
        { id: "islam", title: "ئیسلام", body: "باوەڕ، پەرستن و نەریتە زیندووەکان", image: imgIslam },
        { id: "christianity", title: "مەسیحییەت", body: "ڕەگی دێرین، باوەڕی چەسپاو و کۆمەڵگەی یەکگرتوو", image: imgChristianity },
        { id: "yazidism", title: "ئێزیدیاتی", body: "دۆڵە پیرۆزەکە، یادەوەری و خۆڕاگری", image: imgYazidism },
        { id: "yarsanism", title: "یارسانی (کاکەیی)", body: "ڕاستی ناخ، باوەڕداری و کۆمەڵگە", image: imgYarsanism },
        { id: "zoroastrianism", title: "زەردەشتی", body: "ڕووناکی، ڕاستی و دانایی", image: imgZoroastrianism },
        { id: "judaism", title: "جوو", body: "یادەوەری، میرات و بەردەوامی", image: imgJudaism },
        { id: "bahai", title: "ئایینی بەهایی", body: "تەبایی، ئاشتی و یەکبوون لە مرۆڤایەتیدا.", image: imgBahai },
        { id: "sabean-mandaeanism", title: "سابیئەی مەندائی", body: "ئاوی زیندوو، پاکوخاوێنی و بەردەوامی", image: imgSabean },
      ],
    },
    nations: {
      subtitle: "کورد، تورکمان، ئاشووری، ئەرمەن، و چەندانی تر.",
      tagline: "ئایینی جیاواز. زمانی جیاواز. یەک نیشتمانی هاوبەش.",
      cards: [
        {
          id: "kurds",
          title: "کورد",
          body: "زمان، کەلەپوور و ناسنامەیەکی زیندوو",
          image: nationKurds,
          accent: "#7a4a12",
        },
        {
          id: "chaldo-assyrians",
          title: "کلدو ئاشوورییەکان",
          body: "نەتەوەیەکی دێرین بە میراتێکی بێ پچڕان",
          image: nationChaldo,
          accent: "#a05a18",
        },
        {
          id: "armenians",
          title: "ئەرمەن",
          body: "سەدەیەک لە سۆز و پەیوەستبوون لە کوردستان",
          image: nationArmenians,
          accent: "#b9822d",
        },
        {
          id: "turkmens",
          title: "تورکمان",
          body: "زمان، کەلەپوور و ژیانی کۆمەڵایەتی",
          image: nationTurkmens,
          accent: "#c58b16",
        },
      ],
    },
  },
  ar: {
    back: "العودة",
    pageTitle: "كوردستان",
    pageDescription: "مهد التعايش",
    religionsTab: "الأديان",
    nationsTab: "القوميات",
    religions: {
      subtitle: "أديان متعددة ازدهرت هنا منذ فجر التاريخ.",
      tagline: "أديان مختلفة. لغات مختلفة. وطن واحد مشترك.",
      cards: [
        { id: "islam", title: "الإسلام", body: "الإيمان والعبادة والتقاليد الحية", image: imgIslam },
        { id: "christianity", title: "المسيحية", body: "جذور عريقة وإيمان راسخ ومجتمع متماسك", image: imgChristianity },
        { id: "yazidism", title: "الإيزيدية", body: "الوادي المقدس والذاكرة والصمود", image: imgYazidism },
        { id: "yarsanism", title: "اليارسانية (الكاكائية)", body: "الحقيقة الداخلية والتقوى والمجتمع", image: imgYarsanism },
        { id: "zoroastrianism", title: "الزرادشتية", body: "النور والحقيقة والحكمة العريقة", image: imgZoroastrianism },
        { id: "judaism", title: "اليهودية", body: "الذاكرة والتراث والاستمرارية", image: imgJudaism },
        { id: "bahai", title: "الديانة البهائية", body: "الوحدة والسلام وإنسانية واحدة", image: imgBahai },
        { id: "sabean-mandaeanism", title: "الصابئة المندائيون", body: "الماء الحي والطهارة والاستمرارية", image: imgSabean },
      ],
    },
    nations: {
      subtitle: "الكورد والآشوريون والأرمن والتركمان وغيرهم.",
      tagline: "أديان مختلفة. لغات مختلفة. وطن واحد مشترك.",
      cards: [
        {
          id: "kurds",
          title: "الكورد",
          body: "اللغة والتراث والهوية الحية",
          image: nationKurds,
          accent: "#7a4a12",
        },
        {
          id: "chaldo-assyrians",
          title: "الكلدو آشوريون",
          body: "قومية عريقة بتراث لا ينقطع",
          image: nationChaldo,
          accent: "#a05a18",
        },
        {
          id: "armenians",
          title: "الأرمن",
          body: "قرن من الانتماء في كوردستان",
          image: nationArmenians,
          accent: "#b9822d",
        },
        {
          id: "turkmens",
          title: "التركمان",
          body: "اللغة والتراث وحياة المجتمع",
          image: nationTurkmens,
          accent: "#c58b16",
        },
      ],
    },
  },
};

const tabs: { id: TabId; icon: typeof MoonStar }[] = [
  { id: "religions", icon: MoonStar },
  { id: "nations", icon: UsersRound },
];

const tabHeroImages: Record<TabId, string> = {
  religions: bg,
  nations: nationsCover,
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

type IntroductionPageProps = {
  lang?: LangCode;
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

const detailProps = (
  lang: LangCode,
  languageLabel: string,
  onLanguageChange: (() => void) | undefined,
  onBackToCradle: () => void,
) => ({
  lang,
  languageLabel,
  onLanguageChange,
  onBack: onBackToCradle,
});

export default function IntroductionPage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: IntroductionPageProps = {}) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const [activeTab, setActiveTab] = React.useState<TabId>("religions");
  const [activeFaith, setActiveFaith] = React.useState<FaithId | null>(null);
  const [activeNation, setActiveNation] = React.useState<NationId | null>(null);
  const c = content[lang];
  const dir = lang === "en" ? "ltr" : "rtl";
  const tabPanel = c[activeTab];

  React.useLayoutEffect(() => {
    if (!sectionRef.current || activeFaith || activeNation) return;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      gsap.set("[data-intro-hero='true']", { autoAlpha: 0 });
      gsap.set("[data-intro-animate='true']", { autoAlpha: 0, y: 24 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to("[data-intro-hero='true']", {
        autoAlpha: 1,
        duration: 1.0,
      }).to(
        "[data-intro-animate='true']",
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
  }, [lang, activeFaith, activeNation, activeTab]);

  const closeDetail = () => {
    setActiveFaith(null);
    setActiveNation(null);
  };
  const pageDetailProps = detailProps(lang, languageLabel, onLanguageChange, closeDetail);

  if (activeFaith === "islam") return <IslamPage {...pageDetailProps} />;
  if (activeFaith === "christianity") return <ChristianityPage {...pageDetailProps} />;
  if (activeFaith === "yazidism") return <YazidismPage {...pageDetailProps} />;
  if (activeFaith === "yarsanism") return <YarsanismPage {...pageDetailProps} />;
  if (activeFaith === "zoroastrianism") return <ZoroastrianismPage {...pageDetailProps} />;
  if (activeFaith === "judaism") return <JudaismPage {...pageDetailProps} />;
  if (activeFaith === "bahai") return <BahaiPage {...pageDetailProps} />;
  if (activeFaith === "sabean-mandaeanism") return <SabeanMandaeanismPage {...pageDetailProps} />;

  if (activeNation === "kurds") return <KurdsPage {...pageDetailProps} />;
  if (activeNation === "turkmens") return <TurkmensPage {...pageDetailProps} />;
  if (activeNation === "chaldo-assyrians") return <ChaldoAssyriansPage {...pageDetailProps} />;
  if (activeNation === "armenians") return <ArmeniansPage {...pageDetailProps} />;

  return (
    <ReligionsScaledPage
      dir={dir}
      lang={lang}
      fitDeps={[lang]}
      sectionRef={sectionRef}
      className="min-h-full px-12 pb-12"
    >
      <img
        data-intro-hero="true"
        key={activeTab}
        src={tabHeroImages[activeTab]}
        alt=""
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[1100px] w-full object-cover object-[center_32%] [mask-image:linear-gradient(to_bottom,black_0%,black_84%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_84%,transparent_100%)]"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[1100px] bg-[linear-gradient(to_bottom,transparent_0%,transparent_72%,#faf8f5_100%)]" />

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
        <header data-intro-animate="true" className="mx-auto max-w-[850px] shrink-0 pt-[140px] text-center">
          <div className="mx-auto mb-2 w-[220px]">
            <DecorativeLine color="#c3923a" />
          </div>
          <h1 className="font-serif text-[72px] font-semibold uppercase leading-[1.02] tracking-[0.04em] text-[#3b2410]">
            {c.pageTitle}
          </h1>
          <div className="mx-auto mt-4 w-[160px]">
            <DecorativeLine color="#c3923a" />
          </div>
          <p className="mx-auto mt-4 max-w-[640px] text-[18px] font-medium leading-relaxed text-[#4d3c2a]">
            {c.pageDescription}
          </p>
        </header>

        <section data-intro-animate="true" className="mt-[920px] flex flex-1 flex-col pb-4">
          <nav className="mb-6 flex shrink-0 justify-center border-b border-[#d7b77e]/45">
            <div className="flex gap-2">
              {tabs.map((tab) => {
                const label = tab.id === "religions" ? c.religionsTab : c.nationsTab;
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

          <div className="grid w-full flex-1 grid-cols-4 content-stretch gap-5">
            {activeTab === "religions"
              ? c.religions.cards.map((card, index) => (
                  <ReligionInfoCard
                    key={card.id}
                    title={card.title}
                    body={card.body}
                    image={card.image}
                    accent={faithAccents[index]}
                    accentIndex={index}
                    onClick={() => setActiveFaith(card.id)}
                    ariaLabel={card.title}
                    titleClassName="uppercase"
                    imageHeightClass="min-h-[320px] flex-1"
                    className="min-h-full"
                  />
                ))
              : c.nations.cards.map((card, index) => (
                  <ReligionInfoCard
                    key={card.id}
                    title={card.title}
                    body={card.body}
                    image={card.image}
                    accent={card.accent}
                    accentIndex={index}
                    onClick={() => setActiveNation(card.id)}
                    ariaLabel={card.title}
                    titleClassName="uppercase"
                    imageHeightClass="min-h-[360px] flex-1"
                    imageClassName="object-[center_22%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_12%,black_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_12%,black_100%)]"
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
