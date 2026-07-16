import React from "react";
import gsap from "gsap";
import {
  ArrowLeft,
  Globe2,
  MoonStar,
  Scale,
  UsersRound,
} from "lucide-react";
import { detailBackIconClassName, detailBackIconSize } from "@/constants/backNavigation";
import { cn } from "@/lib/utils";

import ReligionInfoCard from "@/components/Sections/religions/ReligionInfoCard";
import ReligionsScaledPage from "@/components/Sections/religions/ReligionsScaledPage";

import bg from "@/assets/images/religions/main.webp";
import nationsImg from "@/assets/images/religions/nations.webp";
import lawsImg from "@/assets/images/religions/nl-1.webp";
import valleyImg from "@/assets/images/religions/b-1.webp";
import imgIslam from "@/assets/images/new/religions/faiths/islam.webp";
import imgChristianity from "@/assets/images/new/religions/faiths/christianity.webp";
import imgYazidism from "@/assets/images/new/religions/faiths/yazidism.webp";
import imgYarsanism from "@/assets/images/new/religions/faiths/yarsanism.webp";
import imgZoroastrianism from "@/assets/images/new/religions/faiths/zoroastrianism.webp";
import imgJudaism from "@/assets/images/new/religions/faiths/judaism.webp";
import imgBahai from "@/assets/images/new/religions/faiths/bahai.webp";
import imgSabean from "@/assets/images/new/religions/faiths/sabean-mandaeanism.webp";

import IslamPage from "@/components/Sections/religions/RelisgionsSection/Islam";
import ChristianityPage from "@/components/Sections/religions/RelisgionsSection/Christianity";
import YazidismPage from "@/components/Sections/religions/RelisgionsSection/Yazidism";
import YarsanismPage from "@/components/Sections/religions/RelisgionsSection/Yarsanism";
import ZoroastrianismPage from "@/components/Sections/religions/RelisgionsSection/Zoroastrianism";
import JudaismPage from "@/components/Sections/religions/RelisgionsSection/Judaism";
import BahaiPage from "@/components/Sections/religions/RelisgionsSection/Bahai";
import SabeanMandaeanismPage from "@/components/Sections/religions/RelisgionsSection/SabeanMandaeanism";

type LangCode = "en" | "ku" | "ar";
type TabId = "religions" | "nations" | "laws";

type FaithId =
  | "islam"
  | "christianity"
  | "yazidism"
  | "yarsanism"
  | "zoroastrianism"
  | "judaism"
  | "bahai"
  | "sabean-mandaeanism";

type FaithCard = {
  id: FaithId;
  title: string;
  body: string;
  image: string;
};

type TabCard = {
  id: string;
  title: string;
  body: string;
  image: string;
  accent: string;
};

type TabContent = {
  subtitle: string;
  tagline: string;
  cards: TabCard[];
};

type IntroductionContent = {
  back: string;
  pageTitle: string;
  pageDescription: string;
  religionsTab: string;
  nationsTab: string;
  lawsTab: string;
  religions: {
    subtitle: string;
    tagline: string;
    cards: FaithCard[];
  };
  nations: TabContent;
  laws: TabContent;
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
    lawsTab: "Laws",
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
      subtitle: "Kurds, Assyrians, Armenians, Turkmen, and more.",
      tagline: "Different languages. One shared homeland.",
      cards: [
        {
          id: "kurds",
          title: "Kurds",
          body: "The majority people of the Region, carrying language, culture, and hospitality.",
          image: nationsImg,
          accent: "#7a4a12",
        },
        {
          id: "assyrians",
          title: "Assyrians & Chaldeans",
          body: "Historic Christian communities whose Syriac heritage remains active.",
          image: bg,
          accent: "#a05a18",
        },
        {
          id: "armenians",
          title: "Armenians",
          body: "A community shaped by sanctuary, memory, and lasting belonging.",
          image: valleyImg,
          accent: "#b9822d",
        },
        {
          id: "turkmen",
          title: "Turkmen",
          body: "A long-standing community with its own language, culture, and public life.",
          image: nationsImg,
          accent: "#c58b16",
        },
      ],
    },
    laws: {
      subtitle: "Legal frameworks protect every community.",
      tagline: "Recognition made durable by law.",
      cards: [
        {
          id: "legal-protection",
          title: "Legal Protection",
          body: "Rights of belief, language, and identity are supported under regional law.",
          image: lawsImg,
          accent: "#7a4a12",
        },
        {
          id: "representation",
          title: "Representation",
          body: "Communities take part in parliament, government, and public institutions.",
          image: bg,
          accent: "#a05a18",
        },
        {
          id: "language-rights",
          title: "Language Rights",
          body: "Mother tongues are taught, preserved, and used in community life.",
          image: nationsImg,
          accent: "#b9822d",
        },
        {
          id: "cultural-recognition",
          title: "Cultural Recognition",
          body: "Faith, heritage, and tradition are protected as part of public life.",
          image: valleyImg,
          accent: "#c58b16",
        },
      ],
    },
  },
  ku: {
    back: "گەڕانەوە",
    pageTitle: "لانکە",
    pageDescription: "خاکێک کە چەندین ئاین و زمان و گەل ماڵێکیان هاوبەش بووە.",
    religionsTab: "ئاینەکان",
    nationsTab: "نەتەوەکان",
    lawsTab: "یاساکان",
    religions: {
      subtitle: "دەست لێبدە بۆ کردنەوەی چیرۆکی ئاینەکە.",
      tagline: "ئاینە جیاوازەکان. یەک وڵاتی هاوبەش.",
      cards: [
        { id: "islam", title: "ئیسلام", body: "باوەڕ، پەرستن، و نەریتی زیندوو.", image: imgIslam },
        { id: "christianity", title: "مەسیحی", body: "ڕەگەکانی کۆن، باوەڕ، و کۆمەڵگە.", image: imgChristianity },
        { id: "yazidism", title: "ئێزدیەتی", body: "دۆڵی پیرۆز، یاد، و بەرگری.", image: imgYazidism },
        { id: "yarsanism", title: "یارسانیەتی (کاکەیی)", body: "ڕاستیی ناوەخۆ، تەرخانکردن، و کۆمەڵگە.", image: imgYarsanism },
        { id: "zoroastrianism", title: "زەردەشتیەتی", body: "ڕووناکی، ڕاستی، و دانایی کۆن.", image: imgZoroastrianism },
        { id: "judaism", title: "جوولەکە", body: "یاد، میرات، و بەردەوامی.", image: imgJudaism },
        { id: "bahai", title: "ئاینی بەهایی", body: "یەکگرتوویی، ئاشتی، و یەک مرۆڤایەتی.", image: imgBahai },
        { id: "sabean-mandaeanism", title: "سابیی-مەندەیی", body: "ئاوی زیندوو، پاکی، و بەردەوامی.", image: imgSabean },
      ],
    },
    nations: {
      subtitle: "کورد، ئاشووری، ئەرمەن، تورکمان، و زۆرتر.",
      tagline: "زمانە جیاوازەکان. یەک وڵاتی هاوبەش.",
      cards: [
        {
          id: "kurds",
          title: "کورد",
          body: "زۆرینەی هەرێم، خاوەنی زمان و کلتوور و میوانداری.",
          image: nationsImg,
          accent: "#7a4a12",
        },
        {
          id: "assyrians",
          title: "ئاشووری و کلدانی",
          body: "کۆمەڵگەی مەسیحی مێژوویی کە میراتی سریانیان زیندووە.",
          image: bg,
          accent: "#a05a18",
        },
        {
          id: "armenians",
          title: "ئەرمەن",
          body: "کۆمەڵگەیەک دروستبوو لە پەنا و یادەوەری و سەر بە یەکبوون.",
          image: valleyImg,
          accent: "#b9822d",
        },
        {
          id: "turkmen",
          title: "تورکمان",
          body: "کۆمەڵگەیەکی دێرین بە زمان و کلتوور و ژیانی گشتی خۆیەوە.",
          image: nationsImg,
          accent: "#c58b16",
        },
      ],
    },
    laws: {
      subtitle: "چوارچێوەی یاسایی هەموو کۆمەڵگەیەک دەپارێزێت.",
      tagline: "ناسینەوە بە یاسا بەهێز دەبێت.",
      cards: [
        {
          id: "legal-protection",
          title: "پاراستنی یاسایی",
          body: "مافی باوەڕ و زمان و ناسنامە لە ژێر یاسای هەرێمدا پشتگیری دەکرێن.",
          image: lawsImg,
          accent: "#7a4a12",
        },
        {
          id: "representation",
          title: "نوێنەرایەتی",
          body: "کۆمەڵگەکان لە پەرلەمان و حکومەت و دامەزراوە گشتییەکاندا بەشدارن.",
          image: bg,
          accent: "#a05a18",
        },
        {
          id: "language-rights",
          title: "مافی زمان",
          body: "زمانی دایک فێر دەکرێت، دەپارێزرێت و لە ژیانی کۆمەڵگەدا بەکاردێت.",
          image: nationsImg,
          accent: "#b9822d",
        },
        {
          id: "cultural-recognition",
          title: "ناسینەوەی کلتووری",
          body: "ئاین و میرات و نەریت وەک بەشێک لە ژیانی گشتی دەپارێزرێن.",
          image: valleyImg,
          accent: "#c58b16",
        },
      ],
    },
  },
  ar: {
    back: "العودة",
    pageTitle: "مهد",
    pageDescription: "أرضٌ تقاسمت فيها ديانات ولغات وشعوب وطناً واحداً.",
    religionsTab: "الأديان",
    nationsTab: "القوميات",
    lawsTab: "القوانين",
    religions: {
      subtitle: "المس ديناً لفتح قصته.",
      tagline: "ديانات مختلفة. وطن واحد مشترك.",
      cards: [
        { id: "islam", title: "الإسلام", body: "إيمان وعبادة وتقليد حيّ.", image: imgIslam },
        { id: "christianity", title: "المسيحية", body: "جذور قديمة وإيمان ومجتمع.", image: imgChristianity },
        { id: "yazidism", title: "الإيزيدية", body: "وادٍ مقدس وذاكرة وصمود.", image: imgYazidism },
        { id: "yarsanism", title: "اليارسانية (الكاكائية)", body: "حقيقة باطنية وتفانٍ ومجتمع.", image: imgYarsanism },
        { id: "zoroastrianism", title: "الزرادشتية", body: "نور وحق وحكمة قديمة.", image: imgZoroastrianism },
        { id: "judaism", title: "اليهودية", body: "ذاكرة وتراث واستمرارية.", image: imgJudaism },
        { id: "bahai", title: "البهائية", body: "وحدة وسلام وإنسانية واحدة.", image: imgBahai },
        { id: "sabean-mandaeanism", title: "الصابئة المندائية", body: "ماء حيّ ونقاء واستمرارية.", image: imgSabean },
      ],
    },
    nations: {
      subtitle: "الكورد، الآشوريون، الأرمن، التركمان، وغيرهم.",
      tagline: "لغات مختلفة. وطن واحد مشترك.",
      cards: [
        {
          id: "kurds",
          title: "الكورد",
          body: "غالبية الإقليم، يحملون اللغة والثقافة وكرم الضيافة.",
          image: nationsImg,
          accent: "#7a4a12",
        },
        {
          id: "assyrians",
          title: "الآشوريون والكلدان",
          body: "مجتمعات مسيحية تاريخية يبقى تراثها السرياني حياً.",
          image: bg,
          accent: "#a05a18",
        },
        {
          id: "armenians",
          title: "الأرمن",
          body: "مجتمع تشكّل باللجوء والذاكرة والانتماء الدائم.",
          image: valleyImg,
          accent: "#b9822d",
        },
        {
          id: "turkmen",
          title: "التركمان",
          body: "مجتمع عريق بلغته وثقافته وحضوره في الحياة العامة.",
          image: nationsImg,
          accent: "#c58b16",
        },
      ],
    },
    laws: {
      subtitle: "الأطر القانونية تحمي كل مجتمع.",
      tagline: "اعتراف يحفظه القانون.",
      cards: [
        {
          id: "legal-protection",
          title: "حماية قانونية",
          body: "حقوق الإيمان واللغة والهوية مدعومة في قانون الإقليم.",
          image: lawsImg,
          accent: "#7a4a12",
        },
        {
          id: "representation",
          title: "التمثيل",
          body: "تشارك المجتمعات في البرلمان والحكومة والمؤسسات العامة.",
          image: bg,
          accent: "#a05a18",
        },
        {
          id: "language-rights",
          title: "حقوق اللغة",
          body: "تُدرَّس اللغات الأم وتُحفظ وتُستخدم في حياة المجتمع.",
          image: nationsImg,
          accent: "#b9822d",
        },
        {
          id: "cultural-recognition",
          title: "اعتراف ثقافي",
          body: "يُحمى الإيمان والتراث والتقاليد كجزء من الحياة العامة.",
          image: valleyImg,
          accent: "#c58b16",
        },
      ],
    },
  },
};

const tabs: { id: TabId; icon: typeof MoonStar }[] = [
  { id: "religions", icon: MoonStar },
  { id: "nations", icon: UsersRound },
  { id: "laws", icon: Scale },
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

type IntroductionPageProps = {
  lang?: LangCode;
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

const faithDetailProps = (
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
  const c = content[lang];
  const dir = lang === "en" ? "ltr" : "rtl";
  const tabPanel = c[activeTab];

  React.useLayoutEffect(() => {
    if (!sectionRef.current || activeFaith) return;

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
  }, [lang, activeFaith]);

  const closeFaith = () => setActiveFaith(null);
  const detailProps = faithDetailProps(lang, languageLabel, onLanguageChange, closeFaith);

  if (activeFaith === "islam") return <IslamPage {...detailProps} />;
  if (activeFaith === "christianity") return <ChristianityPage {...detailProps} />;
  if (activeFaith === "yazidism") return <YazidismPage {...detailProps} />;
  if (activeFaith === "yarsanism") return <YarsanismPage {...detailProps} />;
  if (activeFaith === "zoroastrianism") return <ZoroastrianismPage {...detailProps} />;
  if (activeFaith === "judaism") return <JudaismPage {...detailProps} />;
  if (activeFaith === "bahai") return <BahaiPage {...detailProps} />;
  if (activeFaith === "sabean-mandaeanism") return <SabeanMandaeanismPage {...detailProps} />;

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
        src={bg}
        alt=""
        className="pointer-events-none absolute inset-x-0 top-[220px] z-0 h-[900px] w-full object-cover object-center [mask-image:linear-gradient(to_bottom,transparent_0%,black_14%,black_86%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_14%,black_86%,transparent_100%)]"
      />
      <div className="pointer-events-none absolute inset-x-0 top-[220px] z-[1] h-[900px] bg-[linear-gradient(to_bottom,#faf8f5_0%,transparent_16%,transparent_84%,#faf8f5_100%)]" />

      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="absolute left-8 top-8 z-30 grid h-14 w-14 place-items-center rounded-full border-2 border-[#d9b477] bg-white/80 text-[#5a3a18] shadow-sm"
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

      <div className="relative z-10 mx-auto flex min-h-full w-full max-w-[1220px] flex-col">
        <header data-intro-animate="true" className="mx-auto max-w-[850px] shrink-0 pt-8 text-center">
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
                const label =
                  tab.id === "religions"
                    ? c.religionsTab
                    : tab.id === "nations"
                      ? c.nationsTab
                      : c.lawsTab;
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
              : tabPanel.cards.map((card, index) => (
                  <ReligionInfoCard
                    key={card.id}
                    title={card.title}
                    body={card.body}
                    image={card.image}
                    accent={"accent" in card ? card.accent : faithAccents[index]}
                    accentIndex={index}
                    imageHeightClass="min-h-[360px] flex-1"
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
