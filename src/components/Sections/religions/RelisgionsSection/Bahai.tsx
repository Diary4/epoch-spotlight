import React from "react";
import { Heart, Sparkles } from "lucide-react";

import bg from "@/assets/images/religions/bahai/cover.webp";
import kurdistanImg from "@/assets/images/religions/bahai/kurdistan.webp";
import coreImg from "@/assets/images/religions/bahai/core.webp";
import freeImg from "@/assets/images/religions/bahai/free.webp";
import { useReligionPageAnimation } from "@/components/Sections/religions/useReligionPageAnimation";
import {
  FAITH_CONTENT_PADDING,
  FAITH_DETAIL_CONTENT_WIDTH,
  FAITH_DETAIL_SUBTITLE_CLASS,
  FAITH_DETAIL_TITLE_CLASS,
  FAITH_DETAIL_HEADER_CLASS,
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
type TopicId = "bahaullah-kurdistan" | "core-principles" | "free-kurdistan" | "festival-ridvan";

type TopicContent = {
  id: TopicId;
  title: string;
  text: string;
};

type BahaiContent = {
  title: string;
  subtitle: string;
  tagline: string;
  topics: [TopicContent, TopicContent, TopicContent, TopicContent];
};

const TOPIC_IMAGES: Record<TopicId, string> = {
  "bahaullah-kurdistan": kurdistanImg,
  "core-principles": coreImg,
  "free-kurdistan": freeImg,
  "festival-ridvan": bg,
};

const content: Record<LangCode, BahaiContent> = {
  en: {
    title: "Baha'i Faith",
    subtitle: "Unity, peace, and one humanity",
    tagline: "One humanity. One future.",
    topics: [
      {
        id: "bahaullah-kurdistan",
        title: "Baha'u'llah in Kurdistan",
        text: "Chose Kurdistan for seclusion. Resided in Sargalu then Sulaymaniyah for two years. Sent \"The Four Valleys\" to Kurdish Sufi leader Sheikh Abdul Rahman Talabani and \"The Seven Valleys\" to Sheikh Mohiuddin.",
      },
      {
        id: "core-principles",
        title: "Core Principles",
        text: "Oneness of God, unity of humanity, gender equality, harmony of religion and science, and justice for all.",
      },
      {
        id: "free-kurdistan",
        title: "Free in Kurdistan",
        text: "Since 2015 represented in the Ministry of Endowments and Religious Affairs. Practice rituals freely. Baha'u'llah described Kurdistan as a refuge of peace.",
      },
      {
        id: "festival-ridvan",
        title: "Festival of Ridvan",
        text: "Most important Baha'i holiday, April 20 to May 2. Commemorates Baha'u'llah's announcement of his message in Baghdad.",
      },
    ],
  },
  ku: {
    title: "ئایینی بەهایی",
    subtitle: "تەبایی، ئاشتی و یەکبوون لە مرۆڤایەتیدا.",
    tagline: "یەک مرۆڤایەتی. یەک داهاتوو.",
    topics: [
      {
        id: "bahaullah-kurdistan",
        title: "بەهائوڵڵا لە کوردستان",
        text: "کوردستانی بۆ خەڵوەت و گۆشەگیریی ڕۆحی هەڵبژارد. بۆ ماوەی دوو ساڵ لە سەرگەڵو و پاشان لە سلێمانی نیشتەجێ بوو. پەڕتووکی \"چوار دۆڵەکە\"ی پێشکەش بە شێخ عەبدولڕەحمانی تاڵەبانی کرد، و \"حەوت دۆڵەکە\"شی پێشکەش بە شێخ محییەدین کرد.",
      },
      {
        id: "core-principles",
        title: "بنەما سەرەکییەکان",
        text: "یەکێتی خودا، یەکێتی مرۆڤایەتی، یەکسانی نێوان ژن و پیاو، و گونجانی ئایین و زانست.",
      },
      {
        id: "free-kurdistan",
        title: "ئازادی لە کوردستان",
        text: "لە ساڵی ٢٠١٥وە لە وەزارەتی ئەوقاف نوێنەریان هەیە. بە ئازادی ڕێوڕەسمەکانیان ئەنجام دەدەن.",
      },
      {
        id: "festival-ridvan",
        title: "جەژنی ڕەزوان",
        text: "گرنگترین جەژنی بەهاییەکانە (٢٠ی نیسان تا ٢ی ئایار).",
      },
    ],
  },
  ar: {
    title: "الديانة البهائية",
    subtitle: "الوحدة والسلام وإنسانية واحدة",
    tagline: "إنسانية واحدة. مستقبل واحد.",
    topics: [
      {
        id: "bahaullah-kurdistan",
        title: "بهاء الله في كوردستان",
        text: "اختار كوردستان للعزلة الروحية. أقام في سرجلو ثم السليمانية لمدة عامين. أهدى \"الأودية الأربعة\" للشيخ عبد الرحمن الطالباني، و\"الأودية السبعة\" للشيخ محيي الدين.",
      },
      {
        id: "core-principles",
        title: "المبادئ الأساسية",
        text: "وحدانية الله، ووحدة البشرية، والمساواة بين الجنسين، والتناغم بين الدين والعلم، والعدل للجميع.",
      },
      {
        id: "free-kurdistan",
        title: "حرية في كوردستان",
        text: "ممثَّلون في وزارة الأوقاف والشؤون الدينية منذ 2015. يمارسون شعائرهم بحرية. ووصف بهاء الله كوردستان بأنها ملاذ للسلام.",
      },
      {
        id: "festival-ridvan",
        title: "عيد الرضوان",
        text: "أهم الأعياد البهائية، من 20-21 أبريل حتى 2 مايو. يُحيي ذكرى إعلان بهاء الله رسالته في بغداد.",
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

type BahaiPageProps = {
  lang?: LangCode;
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function BahaiPage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: BahaiPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const dir = lang === "en" ? "ltr" : "rtl";
  const c = content[lang];

  useReligionPageAnimation(
    sectionRef,
    {
      hero: "[data-bahai-hero='true']",
      animate: "[data-bahai-animate='true']",
      controls: "[data-bahai-controls='true']",
    },
    [lang],
  );

  return (
    <FaithDetailPageShell dir={dir} lang={lang} fitDeps={[lang]} sectionRef={sectionRef}>
        <FaithDetailHeroImage
          heroAttr="data-bahai-hero"
          src={bg}
        />

        <FaithDetailControls
          controlsAttr="data-bahai-controls"
          backLabel="Back"
          dir={dir}
          onBack={onBack}
          onLanguageChange={onLanguageChange}
          languageLabel={languageLabel}
        />

        <div className={`relative z-10 mx-auto ${FAITH_DETAIL_CONTENT_WIDTH} ${FAITH_CONTENT_PADDING}`}>
          <header
            data-bahai-animate="true"
            className={FAITH_DETAIL_HEADER_CLASS}
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
            animateAttr="data-bahai-animate"
            ariaLabel="Baha'i Faith topics"
            langKey={lang}
          />

          <section data-bahai-animate="true" className={FAITH_TAGLINE_SECTION_CLASS}>
            <div className={FAITH_TAGLINE_ICON_WRAP_CLASS}>
              <Heart className="h-10 w-10" />
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
