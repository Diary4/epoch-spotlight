import React from "react";
import {
  BookOpen,
  Droplets,
  Landmark,
  Languages,
  Sparkles,
} from "lucide-react";

import waterVideo from "@/assets/videos/water.webm?url";
import bg from "@/assets/images/religions/sabean-water.webp";
import { useReligionPageAnimation } from "@/components/Sections/religions/useReligionPageAnimation";
import {
  FaithDetailCard,
  FAITH_CONTENT_PADDING,
  FAITH_TAGLINE_SECTION_CLASS,
  FAITH_TAGLINE_ICON_WRAP_CLASS,
  FAITH_TAGLINE_TEXT_CLASS,
  FaithDetailControls,
  FaithDetailHeroVideo,
  FaithDetailPageShell,
  FaithDetailSpacer,
} from "@/components/Sections/religions/faithDetailLayout";

type LangCode = "en" | "ku" | "ar";

const content: Record<
  LangCode,
  {
    title: string;
    subtitle: string;
    tagline: string;
    cards: { title: string; icon: typeof BookOpen; text: string }[];
  }
> = {
  en: {
    title: "Sabean-Mandaeanism",
    subtitle: "Living water, purity, and continuity",
    tagline: "Faith flowing through time.",
    cards: [
      {
        title: "Meaning",
        icon: BookOpen,
        text: "Sabians: those who immerse in water. Mandaeans: those of knowledge. Together: those immersed in divine knowledge following the true religion.",
      },
      {
        title: "Five Pillars",
        icon: Sparkles,
        text: "Monotheism, Baptism, Prayer, Fasting, and Almsgiving. Prophets: Adam, Seth, Sam son of Noah, and Yahya (John the Baptist).",
      },
      {
        title: "Mandaic Language",
        icon: Languages,
        text: "Their own ancient language, a dialect of Aramaic related to Syriac and Hebrew. All religious ceremonies are conducted in Mandaic.",
      },
      {
        title: "In Kurdistan",
        icon: Landmark,
        text: "Mandaean Cultural Association headquartered in Erbil. Rights protected under Law No. 5 of 2015 and the Iraqi Constitution 2005.",
      },
    ],
  },
  ku: {
    title: "سابیی-مەندەیی",
    subtitle: "ئاوی زیندوو، پاکی، و بەردەوامی",
    tagline: "باوەڕێک کە بە درێژایی کات دەڕوات.",
    cards: [
      {
        title: "مانا",
        icon: BookOpen,
        text: "سابییەکان: ئەوانەن کە خۆیان لە ئاو دەخەن. مەندەییەکان: خاوەنانی زانینن. پێکەوە: ئەوانەی لە زانینی ئیلاهی دەچنە ناو و ڕێگای حەق دەگرنەبەر.",
      },
      {
        title: "پێنج ڕوکن",
        icon: Sparkles,
        text: "یەکتاپەرستی، تەعمید، نوێژ، ڕۆژوو و زەکات. پێغەمبەرەکان: ئادەم، شێث، سامی کوڕی نوح، و یەحیا کوڕی زەکەریا (یوحەنای مەعمەدانکەر).",
      },
      {
        title: "زمانی مەندەیی",
        icon: Languages,
        text: "زمانە دێرینە تایبەتییەکەیانە، شێوەزارێکە لە ئارامی کە نزیکە لە سریانی و عیبری. هەموو ڕێوڕەسمە ئاینییەکان بە زمانی مەندەیی ئەنجام دەدرێن.",
      },
      {
        title: "لە کوردستان",
        icon: Landmark,
        text: "بارەگای کۆمەڵەی کولتووری مەندەیی لە هەولێرە. مافەکانیان بە دەستووری عێراقی 2005 و یاسای ژمارە 5ی ساڵی 2015 پارێزراون.",
      },
    ],
  },
  ar: {
    title: "الصابئة المندائيون",
    subtitle: "الماء الحي والطهارة والاستمرارية",
    tagline: "إيمان يتدفق عبر الزمن.",
    cards: [
      {
        title: "المعنى",
        icon: BookOpen,
        text: "الصابئة: المنغمسون في الماء. والمندائيون: أهل المعرفة. معاً: المنغمسون في المعرفة الإلهية السالكون طريق الحق.",
      },
      {
        title: "الأركان الخمسة",
        icon: Sparkles,
        text: "التوحيد والتعميد والصلاة والصوم والزكاة. والأنبياء: آدم وشيث وسام بن نوح ويحيى بن زكريا (يوحنا المعمدان).",
      },
      {
        title: "اللغة المندائية",
        icon: Languages,
        text: "لغتهم الخاصة العريقة، لهجة من الآرامية قريبة من السريانية والعبرية. وتُؤدَّى جميع الشعائر الدينية باللغة المندائية.",
      },
      {
        title: "في كوردستان",
        icon: Landmark,
        text: "مقر الجمعية الثقافية المندائية في أربيل. وتكفل حقوقهم المادة الثانية من الدستور العراقي 2005 وقانون رقم 5 لسنة 2015.",
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
        <FaithDetailHeroVideo
          heroAttr="data-sabean-hero"
          src={waterVideo}
        />

        <FaithDetailControls
          controlsAttr="data-sabean-controls"
          backLabel="Back"
          dir={dir}
          onBack={onBack}
          onLanguageChange={onLanguageChange}
          languageLabel={languageLabel}
        />

        <div className={`relative z-10 mx-auto max-w-[1120px] ${FAITH_CONTENT_PADDING}`}>
          <header
            data-sabean-animate="true"
            className="mx-auto max-w-[900px] pt-32 text-center"
          >
            <div className="mx-auto mb-6 grid h-24 w-24 place-items-center text-[68px] text-[#b9822d]">
              ✥
            </div>

            <div className="mx-auto mb-5 w-[480px] max-w-full">
              <DecorativeLine />
            </div>

            <h1 className="break-words font-serif text-[88px] font-semibold uppercase leading-[1] tracking-[0.12em] text-[#2f1f12]">
              {c.title}
            </h1>

            <p className="mt-4 font-serif text-[36px] font-semibold text-[#7d5a2d]">
              {c.subtitle}
            </p>

            <div className="mx-auto mt-8 w-[210px] max-w-full">
              <DecorativeLine />
            </div>
          </header>

          <FaithDetailSpacer desktopHeight="h-[1220px]" />

          <section className="grid grid-cols-4 gap-6">
            {c.cards.map((card, index) => (
              <FaithDetailCard
                key={card.title}
                title={card.title}
                text={card.text}
                image={bg}
                index={index}
                animateAttr="data-sabean-animate"
              />
            ))}
          </section>

          <section data-sabean-animate="true" className={FAITH_TAGLINE_SECTION_CLASS}>
            <div className={FAITH_TAGLINE_ICON_WRAP_CLASS}>
              <Droplets className="h-10 w-10" />
            </div>

            <p className={FAITH_TAGLINE_TEXT_CLASS}>{c.tagline}</p>

            <Sparkles className="h-8 w-8 shrink-0 text-[#c58b16]" />
          </section>

          <div className="mt-8 text-center text-[58px] text-[#b9822d]">✥</div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 h-52 w-52 rounded-tr-full border-r-2 border-t-2 border-[#d2a35a]/30 opacity-70" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-52 w-52 rounded-tl-full border-l-2 border-t-2 border-[#d2a35a]/30 opacity-70" />
    </FaithDetailPageShell>
  );
}
