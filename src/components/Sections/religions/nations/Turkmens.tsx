import React from "react";
import { Sparkles } from "lucide-react";

import heroBg from "@/assets/images/religions/nations/turkmen/cover.jpeg";
import parliamentImg from "@/assets/images/religions/nations/turkmen/parliment.jpeg";
import languageImg from "@/assets/images/religions/nations/turkmen/cover.jpeg";
import cultureImg from "@/assets/images/religions/nations/turkmen/culture.jpeg";
import educationImg from "@/assets/images/religions/nations/turkmen/education.jpeg";
import {
  FAITH_CONTENT_PADDING,
  FAITH_DETAIL_CONTENT_WIDTH,
  FAITH_DETAIL_HEADER_CLASS,
  FAITH_TAGLINE_ICON_WRAP_CLASS,
  FAITH_TAGLINE_SECTION_CLASS,
  NATION_TAGLINE_TEXT_CLASS,
  FaithDetailControls,
  FaithDetailHeroImage,
  FaithDetailPageShell,
  FaithDetailSpacer,
} from "@/components/Sections/religions/faithDetailLayout";
import { NationTopicSwitcher } from "@/components/Sections/religions/nations/NationTopicSwitcher";
import { useReligionPageAnimation } from "@/components/Sections/religions/useReligionPageAnimation";

type LangCode = "en" | "ku" | "ar";
type TopicId = "parliament" | "language" | "culture" | "education";

type TopicContent = {
  id: TopicId;
  title: string;
  text: string;
};

type TurkmensContent = {
  back: string;
  pageTitle: string;
  subtitle: string;
  topics: [TopicContent, TopicContent, TopicContent, TopicContent];
  tagline: string;
};

const TOPIC_IMAGES: Record<TopicId, string> = {
  parliament: parliamentImg,
  language: languageImg,
  culture: cultureImg,
  education: educationImg,
};

const content: Record<LangCode, TurkmensContent> = {
  en: {
    back: "Back",
    pageTitle: "TURKMENS",
    subtitle: "Language, heritage, and community life",
    topics: [
      {
        id: "parliament",
        title: "5 PARLIAMENT SEATS",
        text: "Turkmens hold 5 reserved seats in the Kurdistan Parliament under the 2005 amendment — equal to the Chaldo-Assyrian allocation.",
      },
      {
        id: "language",
        title: "OFFICIAL LANGUAGE",
        text: "Turkmen is recognized as an official language in areas where Turkmens form the majority under Official Languages Law No. 6 of 2014.",
      },
      {
        id: "culture",
        title: "CULTURE & ARTS",
        text: "The Ministry of Culture established a dedicated General Directorate for Turkmen Culture and Arts. Turkmen Language and Culture Day is celebrated on November 17 each year.",
      },
      {
        id: "education",
        title: "EDUCATION",
        text: "A General Directorate for Turkmen Education ensures Turkmen children receive education in their mother tongue across the Kurdistan Region.",
      },
    ],
    tagline: "Different roots. One homeland.",
  },
  ku: {
    back: "گەڕانەوە",
    pageTitle: "تورکمان",
    subtitle: "زمان، کەلەپوور و ژیانی کۆمەڵایەتی",
    topics: [
      {
        id: "parliament",
        title: "٥ کورسی پەرلەمان",
        text: "تورکمانەکان خاوەنی ٥ کورسی کۆتان لە پەرلەمانی کوردستان بەپێی هەموارکردنەوەی ٢٠٠٥ یەکسان بە بەشی کلدان و ئاشورییەکان.",
      },
      {
        id: "language",
        title: "زمانی فەرمی",
        text: "زمانی تورکمانی وەک زمانێکی فەرمی لەو ناوچانەی زۆرینەی تورکمانن دەناسرێت بەپێی یاسای زمانە فەرمییەکان ژمارە ٦ی ساڵی ٢٠١٤.",
      },
      {
        id: "culture",
        title: "کلتوور و هونەر",
        text: "وەزارەتی ڕۆشنبیری بەڕێوەبەرایەتییەکی گشتی تایبەتی بۆ کلتوور و هونەری تورکمانی دامەزراندووە. ١٧ی تشرینی دووەمی هەموو ساڵێک ڕۆژی زمان و کلتووری تورکمانییە.",
      },
      {
        id: "education",
        title: "پەروەردە",
        text: "بەڕێوەبەرایەتی گشتی خوێندنی تورکمانی دڵنیایی دەدات کە منداڵانی تورکمان بە زمانی دایکی خۆیان لە هەرێم دەخوێنن.",
      },
    ],
    tagline: "ڕەگی جیاواز. یەک نیشتمان.",
  },
  ar: {
    back: "العودة",
    pageTitle: "التركمان",
    subtitle: "اللغة والتراث وحياة المجتمع",
    topics: [
      {
        id: "parliament",
        title: "5 مقاعد برلمانية",
        text: "يحتل التركمان 5 مقاعد مخصصة في برلمان كوردستان بموجب تعديل 2005 — مساوياً لحصة الكلدو آشوريين.",
      },
      {
        id: "language",
        title: "لغة رسمية",
        text: "تُعترف باللغة التركمانية لغةً رسميةً في المناطق ذات الغالبية التركمانية بموجب قانون اللغات الرسمية رقم 6 لسنة 2014.",
      },
      {
        id: "culture",
        title: "الثقافة والفنون",
        text: "أسست وزارة الثقافة مديريةً عامةً مخصصةً للثقافة والفنون التركمانية. ويُحتفل بيوم اللغة والثقافة التركمانية في 17 نوفمبر من كل عام.",
      },
      {
        id: "education",
        title: "التعليم",
        text: "تضمن المديرية العامة للتربية التركمانية تلقّي أبناء التركمان تعليمهم بلغتهم الأم في مختلف أنحاء إقليم كوردستان.",
      },
    ],
    tagline: "جذور مختلفة. وطن واحد.",
  },
};

function DecorativeLine({ color = "#c3923a" }) {
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

type TurkmensPageProps = {
  lang?: LangCode;
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function TurkmensPage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: TurkmensPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const c = content[lang];
  const dir = lang === "en" ? "ltr" : "rtl";
  const fontStyle =
    lang === "ar"
      ? { fontFamily: "'Almarai', 'Oxygen', sans-serif" }
      : undefined;

  useReligionPageAnimation(
    sectionRef,
    {
      hero: "[data-turkmens-hero='true']",
      animate: "[data-turkmens-animate='true']",
      controls: "[data-turkmens-controls='true']",
    },
    [lang],
  );

  return (
    <FaithDetailPageShell dir={dir} lang={lang} fitDeps={[lang]} sectionRef={sectionRef}>
      <FaithDetailHeroImage
        heroAttr="data-turkmens-hero"
        src={heroBg}
        heightClassName="h-[1100px]"
        overlayClassName="bg-[linear-gradient(to_bottom,transparent_0%,transparent_72%,#faf8f5_100%)]"
      />

      <FaithDetailControls
        controlsAttr="data-turkmens-controls"
        backLabel={c.back}
        dir={dir}
        onBack={onBack}
        onLanguageChange={onLanguageChange}
        languageLabel={languageLabel}
      />

      <div
        style={fontStyle}
        className={`relative z-10 mx-auto ${FAITH_DETAIL_CONTENT_WIDTH} ${FAITH_CONTENT_PADDING}`}
      >
        <header
          data-turkmens-animate="true"
          className={FAITH_DETAIL_HEADER_CLASS}
        >
          <div className="mx-auto mb-2 w-[220px]">
            <DecorativeLine color="#c3923a" />
          </div>
          <h1 className="break-words font-serif text-[84px] font-light uppercase leading-[1.02] tracking-[0.04em] text-[#3b2410]">
            {c.pageTitle}
          </h1>
          <div className="mx-auto mt-4 w-[160px]">
            <DecorativeLine color="#c3923a" />
          </div>
          <p className="mx-auto mt-4 max-w-[640px] font-serif text-[22px] font-light leading-relaxed text-[#4d3c2a]">
            {c.subtitle}
          </p>
        </header>

        <FaithDetailSpacer desktopHeight="h-[700px]" />

        <NationTopicSwitcher
          pageTitle={c.pageTitle}
          topics={c.topics}
          images={TOPIC_IMAGES}
          animateAttr="data-turkmens-animate"
          ariaLabel="Turkmens topics"
          langKey={lang}
        />

        <section data-turkmens-animate="true" className={FAITH_TAGLINE_SECTION_CLASS}>
          <div className={`${FAITH_TAGLINE_ICON_WRAP_CLASS} text-[42px]`}>✺</div>
          <p className={NATION_TAGLINE_TEXT_CLASS}>{c.tagline}</p>
          <Sparkles className="h-8 w-8 shrink-0 text-[#c58b16]" />
        </section>

        <div className="mt-8 text-center text-[58px] text-[#b9822d]">✥</div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 h-52 w-52 rounded-tr-full border-r-2 border-t-2 border-[#d2a35a]/30 opacity-70" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-52 w-52 rounded-tl-full border-l-2 border-t-2 border-[#d2a35a]/30 opacity-70" />
    </FaithDetailPageShell>
  );
}
