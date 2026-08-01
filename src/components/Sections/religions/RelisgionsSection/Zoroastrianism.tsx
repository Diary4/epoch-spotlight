import React from "react";
import {
  Flame,
  Sparkles,
} from "lucide-react";

import bg from "@/assets/images/religions/zoro/cover.webp";
import historyImg from "@/assets/images/religions/zoro/history.webp";
import threePillarsImg from "@/assets/images/religions/zoro/three-pillars.jpeg";
import environmentImg from "@/assets/images/religions/zoro/environment.webp";
import nowruzImg from "@/assets/images/religions/zoro/nowruz.webp";
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
  history: historyImg,
  "three-pillars": threePillarsImg,
  environment: environmentImg,
  nowruz: nowruzImg,
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
    title: "زەردەشتی",
    subtitle: "ڕووناکی، ڕاستی و دانایی",
    tagline: "بڵێسەی داناییەکی دێرین کە ناکوژێتەوە.",
    topics: [
      {
        id: "history",
        title: "مێژوو",
        text: "لە سەردەمی ئەخمینییەکان و ساسانییەکاندا گەیشتووەتە لووتکەی گەشەسەندن. یەکەمین پەرستگای لە کوردستانی عێراق، لە ساڵی ٢٠١٦دا لە شاری سلێمانی کرایەوە.",
      },
      {
        id: "three-pillars",
        title: "سێ کۆڵەکەکە",
        text: "بنەما سەرەکیەکانی بریتیە لە بیری چاک، وتەی چاک، کرداری چاک. کارکردن و ڕێزگرتن لە باوەڕی کەسانی تر.",
      },
      {
        id: "environment",
        title: "ژینگە",
        text: "ئاگر، هەوا، ئاو و خاک توخمە پیرۆزەکانن. پاراستنی ژینگە ئەرکێکی ئایینییە.",
      },
      {
        id: "nowruz",
        title: "نەورۆز",
        text: "دیارترین جەژنی زەردەشتییەکانە.",
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
        text: "أبرز الأعياد الزرادشتية، يُحتفل به في 21 مارس.",
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
          imageClassName="object-[58%_center]"
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
            className="-ml-4 max-w-[900px] pt-[200px] text-left"
          >
            <div className="mb-3 mt-3 w-[160px] max-w-full">
              <DecorativeLine color="#e8c56a" />
            </div>

            <h1 className="whitespace-nowrap font-serif text-[64px] font-light uppercase leading-[1.05] tracking-[0.06em] text-[#faf6ee] drop-shadow-[0_2px_18px_rgba(0,0,0,0.85)]">
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
