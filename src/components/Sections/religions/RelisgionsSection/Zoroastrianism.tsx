import React from "react";
import {
  Flame,
  Leaf,
  Scale,
  Sparkles,
  Sun,
} from "lucide-react";

import bg from "@/assets/images/religions/z-1.webp";
import { useReligionPageAnimation } from "@/components/Sections/religions/useReligionPageAnimation";
import {
  FaithDetailCard,
  FAITH_CONTENT_PADDING,
  FAITH_DETAIL_CARD_GRID_4,
  FAITH_TAGLINE_SECTION_CLASS,
  FAITH_TAGLINE_ICON_WRAP_CLASS,
  FAITH_TAGLINE_TEXT_CLASS,
  FaithDetailControls,
  FaithDetailHeroImage,
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
    cards: { title: string; icon: typeof Scale; text: string }[];
  }
> = {
  en: {
    title: "Zoroastrianism",
    subtitle: "Light, truth, and ancient wisdom",
    tagline: "An ancient flame of wisdom.",
    cards: [
      {
        title: "History",
        icon: Scale,
        text: "Dominant religion in Kurdistan before Islam. Flourished during Achaemenid and Sassanian empires. First fire temple in Iraqi Kurdistan opened in Sulaymaniyah in 2016.",
      },
      {
        title: "Three Pillars",
        icon: Sparkles,
        text: "Good Thoughts, Good Words, Good Deeds. Work and diligence are religious duties. Respecting the beliefs of others is a core principle.",
      },
      {
        title: "Environment",
        icon: Leaf,
        text: "Fire, air, water, and earth are sacred. Environmental protection is the most crucial religious duty. Both spouses must plant a tree upon marriage and with the birth of each child.",
      },
      {
        title: "Nowruz",
        icon: Sun,
        text: "The most prominent Zoroastrian festival, celebrated March 21. Since 2015 the Atashgah has provided over 10,000 job opportunities to people of all backgrounds in Kurdistan.",
      },
    ],
  },
  ku: {
    title: "زەردەشتیەتی",
    subtitle: "ڕووناکی و ڕاستی و دانایی دێرین",
    tagline: "بڵێسەی داناییەکی دێرین کە ناکوژێتەوە.",
    cards: [
      {
        title: "مێژوو",
        icon: Scale,
        text: "پێش ئیسلام ئاینی باڵادەست بوو لە کوردستان. لە سەردەمی هەخامەنشی و ساسانییەکاندا گەشەی کرد. یەکەم پەرستگای ئاگر لە کوردستانی عێراق ساڵی 2016 لە سلێمانی کرایەوە.",
      },
      {
        title: "سێ بنەما",
        icon: Sparkles,
        text: "بیرۆکەی باش، وشەی باش، کردەوەی باش. کار و هەوڵدان ئەرکی ئاینییە. ڕێزگرتن لە باوەڕی ئەوانی تر بنەمایەکی سەرەکییە.",
      },
      {
        title: "ژینگە",
        icon: Leaf,
        text: "ئاگر و هەوا و ئاو و خاک توخمە پیرۆزەکانن. پاراستنی ژینگە لە گرنگترین ئەرکە ئاینییەکانە. هەر ژن و مێردێک دەبێت لە کاتی هاوسەرگیری و لەدایکبوونی هەر منداڵێکدا دارێک بچێنن.",
      },
      {
        title: "نەورۆز",
        icon: Sun,
        text: "گرنگترین جەژنی زەردەشتییە و لە 21ی ئازاردا دەگیرێت. لە ساڵی 2015ەوە ئاتەشگا زیاتر لە 10,000 هەلی کار بۆ خەڵکی ئاین و نەتەوە جیاوازەکانی کوردستان دابین کردووە.",
      },
    ],
  },
  ar: {
    title: "الزرادشتية",
    subtitle: "النور والحقيقة والحكمة العريقة",
    tagline: "شعلة حكمة عريقة لا تنطفئ.",
    cards: [
      {
        title: "التاريخ",
        icon: Scale,
        text: "كانت الديانة السائدة في كوردستان قبل الإسلام. ازدهرت في عهدَي الأخمينيين والساسانيين. افتُتح أول معبد للنار في كوردستان العراق بالسليمانية عام 2016.",
      },
      {
        title: "الركائز الثلاث",
        icon: Sparkles,
        text: "الأفكار الحسنة والكلمات الحسنة والأفعال الحسنة. العمل والاجتهاد فريضة دينية. واحترام معتقدات الآخرين مبدأ أساسي.",
      },
      {
        title: "البيئة",
        icon: Leaf,
        text: "النار والهواء والماء والأرض عناصر مقدسة. وحماية البيئة أهم الواجبات الدينية. ويلزم كل زوجين زرع شجرة عند الزواج وعند ولادة كل طفل.",
      },
      {
        title: "نوروز",
        icon: Sun,
        text: "أبرز الأعياد الزرادشتية، يُحتفل به في 21 مارس. ومنذ عام 2015 وفّر معبد النار أكثر من 10,000 فرصة عمل لأبناء مختلف الأديان والقوميات في كوردستان.",
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

type ZoroastrianismPageProps = {
  lang?: LangCode;
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function ZoroastrianismPage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: ZoroastrianismPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const dir = lang === "en" ? "ltr" : "rtl";
  const c = content[lang];

  useReligionPageAnimation(
    sectionRef,
    {
      hero: "[data-zoro-hero='true']",
      animate: "[data-zoro-animate='true']",
      controls: "[data-zoro-controls='true']",
    },
    [lang],
  );

  return (
    <FaithDetailPageShell dir={dir} lang={lang} fitDeps={[lang]} sectionRef={sectionRef}>
        <FaithDetailHeroImage
          heroAttr="data-zoro-hero"
          src={bg}
        />

        <FaithDetailControls
          controlsAttr="data-zoro-controls"
          backLabel="Back"
          dir={dir}
          onBack={onBack}
          onLanguageChange={onLanguageChange}
          languageLabel={languageLabel}
        />

        <div className={`relative z-10 mx-auto max-w-[1120px] ${FAITH_CONTENT_PADDING}`}>
          <header
            data-zoro-animate="true"
            className="mx-auto max-w-[900px] pt-32 text-center"
          >
            <div className="mx-auto mb-6 grid h-24 w-24 place-items-center text-[68px] text-[#b9822d]">
              ✥
            </div>

            <div className="mx-auto mb-5 w-[480px] max-w-full">
              <DecorativeLine />
            </div>

            <h1 className="break-words font-serif text-[102px] font-semibold uppercase leading-[1] tracking-[0.14em] text-[#2f1f12]">
              {c.title}
            </h1>

            <p className="mt-4 font-serif text-[36px] font-semibold text-[#7d5a2d]">
              {c.subtitle}
            </p>

            <div className="mx-auto mt-8 w-[210px] max-w-full">
              <DecorativeLine />
            </div>
          </header>

          <FaithDetailSpacer />

          <section className={FAITH_DETAIL_CARD_GRID_4}>
            {c.cards.map((card, index) => (
              <FaithDetailCard
                key={card.title}
                title={card.title}
                text={card.text}
                image={bg}
                index={index}
                animateAttr="data-zoro-animate"
              />
            ))}
          </section>

          <section data-zoro-animate="true" className={FAITH_TAGLINE_SECTION_CLASS}>
            <div className={FAITH_TAGLINE_ICON_WRAP_CLASS}>
              <Flame className="h-10 w-10" />
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
