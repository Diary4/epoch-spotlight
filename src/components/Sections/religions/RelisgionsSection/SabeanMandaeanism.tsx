import React from "react";
import { Droplets, Sparkles } from "lucide-react";

import bg from "@/assets/images/religions/sabean/cover.jpeg";
import meaningImg from "@/assets/images/religions/sabean/meaning.jpeg";
import kurdistanImg from "@/assets/images/religions/sabean/kurditan.jpeg";
import mandaicImg from "@/assets/images/religions/sabean/mandiac.gif";
import { useReligionPageAnimation } from "@/components/Sections/religions/useReligionPageAnimation";
import {
  FAITH_CONTENT_PADDING,
  FAITH_DETAIL_CONTENT_WIDTH,
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
type TopicId = "meaning" | "five-pillars" | "mandaic-language" | "in-kurdistan";

type TopicContent = {
  id: TopicId;
  title: string;
  text: string;
};

type SabeanContent = {
  title: string;
  subtitle: string;
  tagline: string;
  topics: [TopicContent, TopicContent, TopicContent, TopicContent];
};

const TOPIC_IMAGES: Record<TopicId, string> = {
  meaning: meaningImg,
  "five-pillars": bg,
  "mandaic-language": mandaicImg,
  "in-kurdistan": kurdistanImg,
};

const content: Record<LangCode, SabeanContent> = {
  en: {
    title: "Sabean-Mandaeanism",
    subtitle: "Living water, purity, and continuity",
    tagline: "Faith flowing through time.",
    topics: [
      {
        id: "meaning",
        title: "Meaning",
        text: "Sabians: those who immerse in water. Mandaeans: those of knowledge. Together: those immersed in divine knowledge following the true religion.",
      },
      {
        id: "five-pillars",
        title: "Five Pillars",
        text: "Monotheism, Baptism, Prayer, Fasting, and Almsgiving. Prophets: Adam, Seth, Sam son of Noah, and Yahya (John the Baptist).",
      },
      {
        id: "mandaic-language",
        title: "Mandaic Language",
        text: "Their own ancient language, a dialect of Aramaic related to Syriac and Hebrew. All religious ceremonies are conducted in Mandaic.",
      },
      {
        id: "in-kurdistan",
        title: "In Kurdistan",
        text: "Mandaean Cultural Association headquartered in Erbil. Rights protected under Law No. 5 of 2015 and the Iraqi Constitution 2005.",
      },
    ],
  },
  ku: {
    title: "سابیئەی مەندائی",
    subtitle: "ئاوی زیندوو، پاکوخاوێنی و بەردەوامی",
    tagline: "باوەڕێک کە بە درێژایی کات بەردەوامە.",
    topics: [
      {
        id: "meaning",
        title: "واتا",
        text: "سابیئە واتە نوقمبووان لە ئاودا.. مەندائی واتە خاوەن زانیارییەکان. پێکەوە: ئەوانەی لە ناسینی خودادا نوقمن و ڕێگای ڕاستییان گرتووەتە بەر.",
      },
      {
        id: "five-pillars",
        title: "پێنج کۆڵەکەکە",
        text: "یەکتاپەرستی، غوسڵ (تەعمید)، نوێژ، ڕۆژوو و زەکات. پێغەمبەرەکانیان: ئادەم، شیت، سام بن نوح و یەحیای کوڕی زەکەریا.",
      },
      {
        id: "mandaic-language",
        title: "زمانی مەندائی",
        text: "زمانێکی تایبەت و دێرینە، لقێکە لە ئارامی و نزیکە لە سریانی و عیبری.",
      },
      {
        id: "in-kurdistan",
        title: "لە کوردستان",
        text: "بارەگای کۆمەڵەی کلتووری مەندائی لە هەولێرە. مافەکانیان لە دەستوور و یاسای ژمارە ٥ی ساڵی ٢٠١٥ پارێزراوە.",
      },
    ],
  },
  ar: {
    title: "الصابئة المندائيون",
    subtitle: "الماء الحي والطهارة والاستمرارية",
    tagline: "إيمان يتدفق عبر الزمن.",
    topics: [
      {
        id: "meaning",
        title: "المعنى",
        text: "الصابئة: المنغمسون في الماء. والمندائيون: أهل المعرفة. معاً: المنغمسون في المعرفة الإلهية السالكون طريق الحق.",
      },
      {
        id: "five-pillars",
        title: "الأركان الخمسة",
        text: "التوحيد والتعميد والصلاة والصوم والزكاة. والأنبياء: آدم وشيث وسام بن نوح ويحيى بن زكريا (يوحنا المعمدان).",
      },
      {
        id: "mandaic-language",
        title: "اللغة المندائية",
        text: "لغتهم الخاصة العريقة، لهجة من الآرامية قريبة من السريانية والعبرية. وتُؤدَّى جميع الشعائر الدينية باللغة المندائية.",
      },
      {
        id: "in-kurdistan",
        title: "في كوردستان",
        text: "مقر الجمعية الثقافية المندائية في أربيل. وتكفل حقوقهم المادة الثانية من الدستور العراقي 2005 وقانون رقم 5 لسنة 2015.",
      },
    ],
  }
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

type SabeanMandaeanismPageProps = {
  lang?: LangCode;
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function SabeanMandaeanismPage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: SabeanMandaeanismPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const dir = lang === "en" ? "ltr" : "rtl";
  const c = content[lang];

  useReligionPageAnimation(
    sectionRef,
    {
      hero: "[data-sabean-hero='true']",
      animate: "[data-sabean-animate='true']",
      controls: "[data-sabean-controls='true']",
    },
    [lang],
  );

  return (
    <FaithDetailPageShell dir={dir} lang={lang} fitDeps={[lang]} sectionRef={sectionRef}>
        <FaithDetailHeroImage
          heroAttr="data-sabean-hero"
          src={bg}
          imageClassName="object-[62%_center]"
        />

        <FaithDetailControls
          controlsAttr="data-sabean-controls"
          backLabel="Back"
          dir={dir}
          onBack={onBack}
          onLanguageChange={onLanguageChange}
          languageLabel={languageLabel}
        />

        <div className={`relative z-10 mx-auto ${FAITH_DETAIL_CONTENT_WIDTH} ${FAITH_CONTENT_PADDING}`}>
          <header
            data-sabean-animate="true"
            className="-ml-4 max-w-[720px] pt-[160px] text-left"
          >
            <div className="mb-3 mt-3 w-[160px] max-w-full">
              <DecorativeLine color="#e8c56a" />
            </div>

            <h1 className="font-serif text-[64px] font-light uppercase leading-[1.05] tracking-[0.04em] text-[#faf6ee] drop-shadow-[0_2px_18px_rgba(0,0,0,0.85)]">
              {c.title}
            </h1>

            <div className="mt-4 w-[120px] max-w-full">
              <DecorativeLine color="#e8c56a" />
            </div>

            <p className="mt-5 max-w-[480px] font-serif text-[22px] font-light leading-relaxed text-[#f0e6d4] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              {c.subtitle}
            </p>
          </header>

          <FaithDetailSpacer />

          <NationTopicSwitcher
            pageTitle={c.title}
            topics={c.topics}
            images={TOPIC_IMAGES}
            animateAttr="data-sabean-animate"
            ariaLabel="Sabean-Mandaeanism topics"
            langKey={lang}
          />

          <section data-sabean-animate="true" className={FAITH_TAGLINE_SECTION_CLASS}>
            <div className={FAITH_TAGLINE_ICON_WRAP_CLASS}>
              <Droplets className="h-10 w-10" />
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
