import React from "react";
import { Sparkles } from "lucide-react";

import heroBg from "@/assets/images/religions/nations/kurds.jpeg";
import languageImg from "@/assets/images/religions/k-1.webp";
import newrozImg from "@/assets/images/religions/kurds/newroz.jpg";
import cultureImg from "@/assets/images/religions/kurds/culture.jpeg";
import citiesImg from "@/assets/images/religions/cradle.jpeg";
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
type TopicId = "language" | "newroz" | "culture" | "cities";

type TopicContent = {
  id: TopicId;
  title: string;
  text: string;
};

type KurdsContent = {
  back: string;
  pageTitle: string;
  subtitle: string;
  topics: [TopicContent, TopicContent, TopicContent, TopicContent];
  tagline: string;
};

const TOPIC_IMAGES: Record<TopicId, string> = {
  language: languageImg,
  newroz: newrozImg,
  culture: cultureImg,
  cities: citiesImg,
};

const content: Record<LangCode, KurdsContent> = {
  en: {
    back: "Back",
    pageTitle: "KURDS",
    subtitle: "Language, heritage, and living identity",
    topics: [
      {
        id: "language",
        title: "LANGUAGE",
        text: "Sorani and Kurmanji are the two main Kurdish dialects. Both are official languages of the Kurdistan Region alongside Arabic.",
      },
      {
        id: "newroz",
        title: "NEWROZ",
        text: "The Kurdish New Year celebrated on March 21 with fire and renewal. One of the most celebrated cultural events of the year with ancient Zoroastrian roots.",
      },
      {
        id: "culture",
        title: "CULTURE",
        text: "Traditional dress, the Halparke dance, poetry, and hospitality define Kurdish cultural identity. Sufi orders shaped Kurdish society and spirituality for centuries.",
      },
      {
        id: "cities",
        title: "CITIES",
        text: "Erbil, Duhok, and Sulaymaniyah are the three governorates and cultural hearts of the Kurdistan Region.",
      },
    ],
    tagline: "Rooted in heritage. Building the future.",
  },
  ku: {
    back: "گەڕانەوە",
    pageTitle: "کورد",
    subtitle: "زمان، کەلەپوور و ناسنامەیەکی زیندوو",
    topics: [
      {
        id: "language",
        title: "زمان",
        text: "سۆرانی و بادینی هەردووکیان دوو شێوەزاری سەرەکین لە هەرێمی کوردستان.",
      },
      {
        id: "newroz",
        title: "نەورۆز",
        text: "جەژنی سەرکەوتن و نوێبوونەوەیە، لوتکەی شکۆی نەتەوەیی کورد و دەسپێکی ساڵی نوێیە لە ٢١ی ئازاردا. ئەم یادە مێژووییە بە داگیرساندنی مەشخەڵی ئاگر و جلی ڕەنگینی کوردی، گوزارشت لە ڕەسەنایەتی و ئاشتیخوازیی ئەم گەلە دەکات.",
      },
      {
        id: "culture",
        title: "کلتوور",
        text: "جلوبەرگی ڕەسەن، هەڵپەڕکێ، شیعر و میواندۆستی ناسنامەی نەتەوەی کوردن. ئەم میراتە دەوڵەمەندە ڕۆحییە، بە درێژایی سەدەکان کۆمەڵگەی کوردی بونیاد ناوە و وەک سیمبولی شکۆ و ڕەسەنایەتی ماوەتەوە.",
      },
      {
        id: "cities",
        title: "پارێزگاکان",
        text: "سێ پارێزگا سەرەکییەکانی هەرێمی کوردستان: هەولێر، دهۆک و سلێمانی.",
      },
    ],
    tagline: "ڕەگ داکوتاو لە مێژوو، بنیادنەری داهاتوو.",
  },
  ar: {
    back: "العودة",
    pageTitle: "الكورد",
    subtitle: "اللغة، التراث، وهوية حيّة",
    topics: [
      {
        id: "language",
        title: "اللغة",
        text: "السورانية والكرمانجية هما اللهجتان الرئيسيتان في إقليم كوردستان.",
      },
      {
        id: "newroz",
        title: "نوروز",
        text: "عيد النصر والتجدد، وذروة المجد القومي الكوردي وبداية السنة الجديدة في ٢١ آذار. تُجسَّد هذه الذكرى التاريخية بإيقاد المشاعل وارتداء الزي الكوردي الزاهي، تعبيراً عن أصالة هذا الشعب ومحبته للسلام.",
      },
      {
        id: "culture",
        title: "الثقافة",
        text: "الزي التقليدي ورقصة الهلپَركێ والشعر وحُسن الضيافة من معالم الهوية القومية الكوردية. هذا الإرث الروحي الغني صاغ المجتمع الكوردي عبر القرون وبقي رمزاً للمجد والأصالة.",
      },
      {
        id: "cities",
        title: "المحافظات",
        text: "محافظات إقليم كوردستان الرئيسية الثلاث: أربيل، دهوك، والسليمانية.",
      },
    ],
    tagline: "جذور راسخة في التاريخ، وبناء للمستقبل.",
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

type KurdsPageProps = {
  lang?: LangCode;
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function KurdsPage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: KurdsPageProps) {
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
      hero: "[data-kurds-hero='true']",
      animate: "[data-kurds-animate='true']",
      controls: "[data-kurds-controls='true']",
    },
    [lang],
  );

  return (
    <FaithDetailPageShell dir={dir} lang={lang} fitDeps={[lang]} sectionRef={sectionRef}>
      <FaithDetailHeroImage
        heroAttr="data-kurds-hero"
        src={heroBg}
        imageClassName="object-[28%_center]"
        overlayClassName="bg-[linear-gradient(to_bottom,transparent_0%,transparent_72%,#faf8f5_100%)]"
      />

      <FaithDetailControls
        controlsAttr="data-kurds-controls"
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
          data-kurds-animate="true"
          className={FAITH_DETAIL_HEADER_CLASS}
        >
          <div className="mx-auto mb-3 mt-3 w-[260px]">
            <DecorativeLine color="#c3923a" />
          </div>
          <h1 className="break-words font-serif text-[96px] font-light uppercase leading-[1.04] tracking-[0.04em] text-[#3b2410]">
            {c.pageTitle}
          </h1>
          <div className="mx-auto mt-5 w-[180px]">
            <DecorativeLine color="#c3923a" />
          </div>
          <p className="mx-auto mt-5 max-w-[620px] font-serif text-[22px] font-light leading-relaxed text-[#4d3c2a]">
            {c.subtitle}
          </p>
        </header>

        <FaithDetailSpacer />

        <NationTopicSwitcher
          pageTitle={c.pageTitle}
          topics={c.topics}
          images={TOPIC_IMAGES}
          animateAttr="data-kurds-animate"
          ariaLabel="Kurds topics"
          langKey={lang}
        />

        <section data-kurds-animate="true" className={FAITH_TAGLINE_SECTION_CLASS}>
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
