import React from "react";
import { Sparkles, Star } from "lucide-react";

import bg from "@/assets/images/religions/j-1.webp";
import kurdishJewsImg from "@/assets/images/religions/judaism/kurdish-jews.jpg";
import torahImg from "@/assets/images/religions/judaism/torah.jpg";
import nahumShrineImg from "@/assets/images/religions/judaism/nahum-shrine.jpeg";
import heritageImg from "@/assets/images/religions/judaism/250404-IK.jpg";
import { useReligionPageAnimation } from "@/components/Sections/religions/useReligionPageAnimation";
import {
  FAITH_CONTENT_PADDING,
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
  torah: torahImg,
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
    title: "جوولەکەیی",
    subtitle: "یادەوەری و میرات و بەردەوامی",
    tagline: "ڕەگداکوتاو لە یادەوەری و ڕێز.",
    topics: [
      {
        id: "kurdish-jews",
        title: "جوولەکەکانی کوردستان",
        text: "کۆمەڵگایەکی ڕۆژهەڵاتی دێرین بوون کە مێژوویان لە باکووری میزۆپۆتامیا بووە. کاتێک کورش ڕێگەی دا دوای دیلی بابلی بگەڕێنەوە بۆ قودس، زۆربەیان مانەوە لە کوردستان هەڵبژارد.",
      },
      {
        id: "torah",
        title: "تەورات",
        text: "کتێبی پیرۆزی جوولەکەیی پێنج سێفری لەخۆ دەگرێت: پیدابوون، دەرچوون، لاویان، ژمارەکان و دووبارەکردنەوەی یاسا. تێکستە گرنگەکانی تر بریتین لە تەلمود، تەناخ، میدراش و میشنا.",
      },
      {
        id: "nahum-shrine",
        title: "مەزاری پێغەمبەر ناحوم",
        text: "مەزاری پێغەمبەر ناحوم لە ئەلقۆش شوێنێکی پیرۆزی جوولەکەییە و گرنگییەکی مێژوویی زۆری لە هەرێمی کوردستان هەیە.",
      },
      {
        id: "heritage",
        title: "میرات",
        text: "مێژووی جوولەکەکان لە کوردستان زیاتر لە 2,500 ساڵ دەبێت. گەشتیاری جوولەکە بنیامین تودێلایی لە سەدەی دوازدەهەمدا ژمارەی جوولەکەکانی ئامێدی بە تەنها بە 25,000 کەس مەزندە کردووە.",
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

        <div className={`relative z-10 mx-auto max-w-[1120px] ${FAITH_CONTENT_PADDING}`}>
          <header
            data-judaism-animate="true"
            className="mx-auto max-w-[900px] pt-32 text-center"
          >
            <div className="mx-auto mb-6 grid h-24 w-24 place-items-center text-[68px] text-[#b9822d]">
              ✥
            </div>

            <div className="mx-auto mb-5 w-[480px] max-w-full">
              <DecorativeLine />
            </div>

            <h1 className="break-words font-serif text-[118px] font-semibold uppercase leading-[1] tracking-[0.16em] text-[#2f1f12]">
              {c.title}
            </h1>

            <p className="mt-4 font-serif text-[40px] font-semibold text-[#7d5a2d]">
              {c.subtitle}
            </p>

            <div className="mx-auto mt-8 w-[210px] max-w-full">
              <DecorativeLine />
            </div>
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
