import React from "react";
import { Sparkles, Star } from "lucide-react";

import bg from "@/assets/images/religions/judaism/cover.jpeg";
import kurdishJewsImg from "@/assets/images/religions/judaism/kurdish-jews.jpeg";
import cardCoverImg from "@/assets/images/religions/judaism/card-cover.jpeg";
import nahumShrineImg from "@/assets/images/religions/judaism/nahum-shrine.jpeg";
import heritageImg from "@/assets/images/religions/judaism/heritage.jpeg";
import { useReligionPageAnimation } from "@/components/Sections/religions/useReligionPageAnimation";
import {
  FAITH_CONTENT_PADDING,
  FAITH_DETAIL_CONTENT_WIDTH,
  FAITH_DETAIL_SUBTITLE_CLASS,
  FAITH_DETAIL_TITLE_CLASS,
  FAITH_TAGLINE_SECTION_CLASS,
  FAITH_TAGLINE_ICON_WRAP_CLASS,
  NATION_TAGLINE_TEXT_CLASS,
  FaithDetailControls,
  FaithDetailHeroImage,
  FaithDetailPageShell,
  FaithDetailSpacer,
} from "@/components/Sections/religions/faithDetailLayout";
import { NationTopicSwitcher } from "@/components/Sections/religions/nations/NationTopicSwitcher";

type LangCode = "en" | "ku" | "ar";
type TopicId = "kurdish-jews" | "torah" | "nahum-shrine" | "heritage";

type TopicContent = {
  id: TopicId;
  title: string;
  text: string;
};

type JudaismContent = {
  title: string;
  subtitle: string;
  tagline: string;
  topics: [TopicContent, TopicContent, TopicContent, TopicContent];
};

const TOPIC_IMAGES: Record<TopicId, string> = {
  "kurdish-jews": kurdishJewsImg,
  torah: cardCoverImg,
  "nahum-shrine": nahumShrineImg,
  heritage: heritageImg,
};

const content: Record<LangCode, JudaismContent> = {
  en: {
    title: "Judaism",
    subtitle: "Memory, heritage, and continuity",
    tagline: "Rooted in memory and respect.",
    topics: [
      {
        id: "kurdish-jews",
        title: "Kurdish Jews",
        text: "Ancient Eastern community historically residing in northern Mesopotamia. When Cyrus allowed them to return to Jerusalem after Babylonian exile, most chose to remain in Kurdistan.",
      },
      {
        id: "torah",
        title: "Torah",
        text: "Judaism's sacred text consists of five books: Genesis, Exodus, Leviticus, Numbers, and Deuteronomy. Other important texts include the Talmud, Tanakh, Midrash, and Mishnah.",
      },
      {
        id: "nahum-shrine",
        title: "Nahum Shrine",
        text: "The Shrine of the Prophet Nahum in Alqosh — a historically significant Jewish sacred site in the Kurdistan Region.",
      },
      {
        id: "heritage",
        title: "Heritage",
        text: "Kurdistan's Jewish history spans over 2,500 years. Jewish traveler Benjamin of Tudela estimated 25,000 Jews in Amadiya alone in the 12th century.",
      },
    ],
  },
  ku: {
    title: "جوو",
    subtitle: "یادەوەری، میرات و بەردەوامی",
    tagline: "ڕەگ داکوتاو لە یادەوەری و ڕێزگرتن.",
    topics: [
      {
        id: "kurdish-jews",
        title: "جووەکانی کوردستان",
        text: "کۆمەڵگەیەکی کۆنی ڕۆژهەڵاتن کە لە باکووری میزۆپۆتامیا نیشتەجێ بوون. کاتێک کورش دوای ڕووخانی بابل کۆرش ڕێگەی پێدان بگەڕێنەوە بۆ قودس بەڵام زۆربەیان مانەوەیان لە کوردستان هەڵبژارد.",
      },
      {
        id: "torah",
        title: "تەورات",
        text: "کتێبی پیرۆزی جووەکانە.",
      },
      {
        id: "nahum-shrine",
        title: "مەزاری پێغەمبەر ناحوم",
        text: "مەزاری ناحوم لە ئەلقوش شوێنێکی پیرۆزی جووەکانە کە گرنگییەکی مێژوویی زۆری هەیە لە هەرێم.",
      },
      {
        id: "heritage",
        title: "میرات",
        text: "مێژووی جوو لە کوردستان بۆ زیاتر لە ٢٥٠٠ ساڵ دەگەڕێتەوە. گەڕیدە (بنیامین تودێلی) ژمارەی جووەکانی ئامێدی لە سەدەی ١٢دا بە ٢٥ هەزار کەس مەزەندە کردووە.",
      },
    ],
  },
  ar: {
    title: "اليهودية",
    subtitle: "الذاكرة والتراث والاستمرارية",
    tagline: "متجذرون في الذاكرة والاحترام.",
    topics: [
      {
        id: "kurdish-jews",
        title: "يهود كوردستان",
        text: "مجتمع شرقي عريق أقام تاريخياً في شمال بلاد الرافدين. حين أذن لهم كورش بالعودة إلى القدس بعد السبي البابلي، اختار معظمهم البقاء في كوردستان.",
      },
      {
        id: "torah",
        title: "التوراة",
        text: "الكتاب المقدس لليهودية يتضمن خمسة أسفار: التكوين والخروج واللاويين والعدد والتثنية. وثمة نصوص مهمة أخرى كالتلمود والتناخ والميدراش والمشناه.",
      },
      {
        id: "nahum-shrine",
        title: "ضريح النبي ناحوم",
        text: "ضريح النبي ناحوم في ألقوش — موقع يهودي مقدس بالغ الأهمية التاريخية في إقليم كوردستان.",
      },
      {
        id: "heritage",
        title: "التراث",
        text: "يمتد التاريخ اليهودي في كوردستان أكثر من 2,500 عام. وقدّر الرحالة اليهودي بنيامين التطيلي عدد يهود عمادية وحدها بـ25,000 نسمة في القرن الثاني عشر.",
      },
    ],
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

type JudaismPageProps = {
  lang?: LangCode;
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function JudaismPage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: JudaismPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const dir = lang === "en" ? "ltr" : "rtl";
  const c = content[lang];

  useReligionPageAnimation(
    sectionRef,
    {
      hero: "[data-judaism-hero='true']",
      animate: "[data-judaism-animate='true']",
      controls: "[data-judaism-controls='true']",
    },
    [lang],
  );

  return (
    <FaithDetailPageShell dir={dir} lang={lang} fitDeps={[lang]} sectionRef={sectionRef}>
        <FaithDetailHeroImage
          heroAttr="data-judaism-hero"
          src={bg}
        />

        <FaithDetailControls
          controlsAttr="data-judaism-controls"
          backLabel="Back"
          dir={dir}
          onBack={onBack}
          onLanguageChange={onLanguageChange}
          languageLabel={languageLabel}
        />

        <div className={`relative z-10 mx-auto ${FAITH_DETAIL_CONTENT_WIDTH} ${FAITH_CONTENT_PADDING}`}>
          <header
            data-judaism-animate="true"
            className="mx-auto max-w-[850px] translate-x-[90px] pt-[90px] text-center"
          >
            <div className="mx-auto mb-6 grid h-24 w-24 place-items-center text-[68px] text-[#b9822d]">
              ✥
            </div>

            <div className="mx-auto mb-3 mt-3 w-[260px] max-w-full">
              <DecorativeLine />
            </div>

            <h1 className={`${FAITH_DETAIL_TITLE_CLASS} text-[#3b2410]`}>
              {c.title}
            </h1>

            <div className="mx-auto mt-5 w-[180px] max-w-full">
              <DecorativeLine />
            </div>

            <p className={`mx-auto mt-5 max-w-[620px] ${FAITH_DETAIL_SUBTITLE_CLASS} text-[#4d3c2a]`}>
              {c.subtitle}
            </p>
          </header>

          <FaithDetailSpacer />

          <NationTopicSwitcher
            pageTitle={c.title}
            topics={c.topics}
            images={TOPIC_IMAGES}
            animateAttr="data-judaism-animate"
            ariaLabel="Judaism topics"
            langKey={lang}
          />

          <section data-judaism-animate="true" className={FAITH_TAGLINE_SECTION_CLASS}>
            <div className={`${FAITH_TAGLINE_ICON_WRAP_CLASS} text-[42px]`}>
              <Star className="h-10 w-10" />
            </div>

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
