import React from "react";
import {
  Flame,
  Sparkles,
} from "lucide-react";

import bg from "@/assets/images/religions/z-1.webp";
import { useReligionPageAnimation } from "@/components/Sections/religions/useReligionPageAnimation";
import {
  FAITH_CONTENT_PADDING,
  FAITH_DETAIL_CONTENT_WIDTH,
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

type PageContent = {
  title: string;
  subtitle: string;
  tagline: string;
  topics: [TopicContent, TopicContent, TopicContent, TopicContent];
};

type TopicId = "history" | "three-pillars" | "environment" | "nowruz";

type TopicContent = {
  id: TopicId;
  title: string;
  text: string;
};

const TOPIC_IMAGES: Record<TopicId, string> = {
  history: bg,
  "three-pillars": bg,
  environment: bg,
  nowruz: bg,
};

const content: Record<LangCode, PageContent> = {
  en: {
    title: "Zoroastrianism",
    subtitle: "Light, truth, and ancient wisdom",
    tagline: "An ancient flame of wisdom.",
    topics: [
      {
        id: "history",
        title: "History",
        text: "Dominant religion in Kurdistan before Islam. Flourished during Achaemenid and Sassanian empires. First fire temple in Iraqi Kurdistan opened in Sulaymaniyah in 2016.",
      },
      {
        id: "three-pillars",
        title: "Three Pillars",
        text: "Good Thoughts, Good Words, Good Deeds. Work and diligence are religious duties. Respecting the beliefs of others is a core principle.",
      },
      {
        id: "environment",
        title: "Environment",
        text: "Fire, air, water, and earth are sacred. Environmental protection is the most crucial religious duty. Both spouses must plant a tree upon marriage and with the birth of each child.",
      },
      {
        id: "nowruz",
        title: "Nowruz",
        text: "The most prominent Zoroastrian festival, celebrated March 21. Since 2015 the Atashgah has provided over 10,000 job opportunities to people of all backgrounds in Kurdistan.",
      }
    ],
  },
  ku: {
    title: "زەردەشتیەتی",
    subtitle: "ڕووناکی و ڕاستی و دانایی دێرین",
    tagline: "بڵێسەی داناییەکی دێرین کە ناکوژێتەوە.",
    topics: [
      {
        id: "history",
        title: "مێژوو",
        text: "پێش ئیسلام ئاینی باڵادەست بوو لە کوردستان. لە سەردەمی هەخامەنشی و ساسانییەکاندا گەشەی کرد. یەکەم پەرستگای ئاگر لە کوردستانی عێراق ساڵی 2016 لە سلێمانی کرایەوە.",
      },
      {
        id: "three-pillars",
        title: "سێ بنەما",
        text: "بیرۆکەی باش، وشەی باش، کردەوەی باش. کار و هەوڵدان ئەرکی ئاینییە. ڕێزگرتن لە باوەڕی ئەوانی تر بنەمایەکی سەرەکییە.",
      },
      {
        id: "environment",
        title: "ژینگە",
        text: "ئاگر و هەوا و ئاو و خاک توخمە پیرۆزەکانن. پاراستنی ژینگە لە گرنگترین ئەرکە ئاینییەکانە. هەر ژن و مێردێک دەبێت لە کاتی هاوسەرگیری و لەدایکبوونی هەر منداڵێکدا دارێک بچێنن.",
      },
      {
        id: "nowruz",
        title: "نەورۆز",
        text: "گرنگترین جەژنی زەردەشتییە و لە 21ی ئازاردا دەگیرێت. لە ساڵی 2015ەوە ئاتەشگا زیاتر لە 10,000 هەلی کار بۆ خەڵکی ئاین و نەتەوە جیاوازەکانی کوردستان دابین کردووە.",
      }
    ],
  },
  ar: {
    title: "الزرادشتية",
    subtitle: "النور والحقيقة والحكمة العريقة",
    tagline: "شعلة حكمة عريقة لا تنطفئ.",
    topics: [
      {
        id: "history",
        title: "التاريخ",
        text: "كانت الديانة السائدة في كوردستان قبل الإسلام. ازدهرت في عهدَي الأخمينيين والساسانيين. افتُتح أول معبد للنار في كوردستان العراق بالسليمانية عام 2016.",
      },
      {
        id: "three-pillars",
        title: "الركائز الثلاث",
        text: "الأفكار الحسنة والكلمات الحسنة والأفعال الحسنة. العمل والاجتهاد فريضة دينية. واحترام معتقدات الآخرين مبدأ أساسي.",
      },
      {
        id: "environment",
        title: "البيئة",
        text: "النار والهواء والماء والأرض عناصر مقدسة. وحماية البيئة أهم الواجبات الدينية. ويلزم كل زوجين زرع شجرة عند الزواج وعند ولادة كل طفل.",
      },
      {
        id: "nowruz",
        title: "نوروز",
        text: "أبرز الأعياد الزرادشتية، يُحتفل به في 21 مارس. ومنذ عام 2015 وفّر معبد النار أكثر من 10,000 فرصة عمل لأبناء مختلف الأديان والقوميات في كوردستان.",
      }
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

        <div className={`relative z-10 mx-auto ${FAITH_DETAIL_CONTENT_WIDTH} ${FAITH_CONTENT_PADDING}`}>
          <header
            data-zoro-animate="true"
            className={FAITH_DETAIL_HEADER_CLASS}
          >
            <div className="mx-auto mb-6 grid h-24 w-24 place-items-center text-[68px] text-[#b9822d]">
              ✥
            </div>

            <div className="mx-auto mb-3 mt-3 w-[260px] max-w-full">
              <DecorativeLine />
            </div>

            <h1 className="break-words font-serif text-[96px] font-light uppercase leading-[1.04] tracking-[0.04em] text-[#3b2410]">
              {c.title}
            </h1>

            <div className="mx-auto mt-5 w-[180px] max-w-full">
              <DecorativeLine />
            </div>

            <p className="mx-auto mt-5 max-w-[620px] font-serif text-[22px] font-light leading-relaxed text-[#4d3c2a]">
              {c.subtitle}
            </p>
          </header>

          <FaithDetailSpacer />

          <NationTopicSwitcher
            pageTitle={c.title}
            topics={c.topics}
            images={TOPIC_IMAGES}
            animateAttr="data-zoro-animate"
            ariaLabel="Zoroastrianism topics"
            langKey={lang}
          />

          <section data-zoro-animate="true" className={FAITH_TAGLINE_SECTION_CLASS}>
            <div className={FAITH_TAGLINE_ICON_WRAP_CLASS}>
              <Flame className="h-10 w-10" />
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
