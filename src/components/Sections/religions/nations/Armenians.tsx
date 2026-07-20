import React from "react";
import { Sparkles } from "lucide-react";

import heroBg from "@/assets/images/religions/a-1.webp";
import historyImg from "@/assets/images/new/religions/nations/armenian.webp";
import churchesImg from "@/assets/images/religions/sharedlife/churches.jpeg";
import communityImg from "@/assets/images/religions/coexistence/coexistence.jpeg";
import parliamentImg from "@/assets/images/religions/rights/parliment.jpeg";
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
type TopicId = "history" | "churches" | "community" | "parliament";

type TopicContent = {
  id: TopicId;
  title: string;
  text: string;
};

type ArmeniansContent = {
  back: string;
  pageTitle: string;
  subtitle: string;
  topics: [TopicContent, TopicContent, TopicContent, TopicContent];
  tagline: string;
};

const TOPIC_IMAGES: Record<TopicId, string> = {
  history: historyImg,
  churches: churchesImg,
  community: communityImg,
  parliament: parliamentImg,
};

const content: Record<LangCode, ArmeniansContent> = {
  en: {
    back: "Back",
    pageTitle: "ARMENIANS",
    subtitle: "A century of belonging in Kurdistan",
    topics: [
      {
        id: "history",
        title: "HISTORY",
        text: "Armenians arrived in Kurdistan following the 1915 genocide, finding refuge in a land that became their home across generations.",
      },
      {
        id: "churches",
        title: "CHURCHES",
        text: "The Armenian Diocese oversees 14 churches, 5 of which are in the Kurdistan Region including Holy Cross Church in Erbil inaugurated in 2019.",
      },
      {
        id: "community",
        title: "COMMUNITY",
        text: "Currently approximately 3,500–4,000 Armenians live in the Kurdistan Region. The Armenian Cultural and Social Association is active in Erbil.",
      },
      {
        id: "parliament",
        title: "1 PARLIAMENT SEAT",
        text: "The Armenian community holds a reserved seat in the Kurdistan Parliament, ensuring their voice in public life.",
      },
    ],
    tagline: "A community of memory, resilience, and belonging.",
  },
  ku: {
    back: "گەڕانەوە",
    pageTitle: "ئەرمەن",
    subtitle: "سەدەیەک لە سۆز و پەیوەستبوون لە کوردستان",
    topics: [
      {
        id: "history",
        title: "مێژوو",
        text: "ئەرمەنەکان دوای کۆمەڵکوژیی ١٩١٥ ڕوویان لە کوردستان کرد و لێرە پەناگەیان دۆزییەوە و بە تێپەڕبوونی چەند نەوەیەک بوو بە نیشتمانیان.",
      },
      {
        id: "churches",
        title: "کەنیسەکان",
        text: "ئەپەرشیەی ئەرمەنی سەرپەرشتی ١٤ کەنیسە دەکات، ٥یان لە هەرێمی کوردستانن، لەوانە کەنیسەی خاچی پیرۆز لە هەولێر کە ساڵی ٢٠١٩ کرایەوە.",
      },
      {
        id: "community",
        title: "کۆمەڵگە",
        text: "ئێستا نزیکەی ٣٥٠٠ بۆ ٤٠٠٠ ئەرمەنی لە هەرێم دەژین. کۆمەڵەی کلتووری و کۆمەڵایەتی ئەرمەنی لە هەولێر زۆر چالاکە.",
      },
      {
        id: "parliament",
        title: "کورسییەکی پەرلەمان",
        text: "پێکهاتەی ئەرمەن خاوەنی یەک کورسی کۆتایە لە پەرلەمان، ئەمەش بۆ دڵنیابوون لە نوێنەرایەتیکردنیان.",
      },
    ],
    tagline: "کۆمەڵگەیەک بۆ یادەوەری، خۆڕاگری و دڵسۆزی.",
  },
  ar: {
    back: "العودة",
    pageTitle: "الأرمن",
    subtitle: "قرنٌ من الانتماء في كوردستان",
    topics: [
      {
        id: "history",
        title: "التاريخ",
        text: "وصل الأرمن إلى كوردستان إثر إبادة ١٩١٥، فوجدوا فيها ملاذاً صار بمرور الأجيال وطناً لهم.",
      },
      {
        id: "churches",
        title: "الكنائس",
        text: "تشرف الأبرشية الأرمنية على ١٤ كنيسة، خمسٌ منها في إقليم كوردستان، ومنها كنيسة الصليب المقدس في أربيل التي افتُتحت عام ٢٠١٩.",
      },
      {
        id: "community",
        title: "المجتمع",
        text: "يعيش حالياً نحو ٣٥٠٠ إلى ٤٠٠٠ أرمني في إقليم كوردستان، والجمعية الثقافية والاجتماعية الأرمنية ناشطة في أربيل.",
      },
      {
        id: "parliament",
        title: "مقعد برلماني",
        text: "يحتفظ مكوّن الأرمن بمقعد مخصص في برلمان كوردستان لضمان تمثيلهم في الحياة العامة.",
      },
    ],
    tagline: "مجتمعٌ للذاكرة والصمود والانتماء.",
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

type ArmeniansPageProps = {
  lang?: LangCode;
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function ArmeniansPage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: ArmeniansPageProps) {
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
      hero: "[data-armenians-hero='true']",
      animate: "[data-armenians-animate='true']",
      controls: "[data-armenians-controls='true']",
    },
    [lang],
  );

  return (
    <FaithDetailPageShell dir={dir} lang={lang} fitDeps={[lang]} sectionRef={sectionRef}>
      <FaithDetailHeroImage
        heroAttr="data-armenians-hero"
        src={heroBg}
        overlayClassName="bg-[linear-gradient(to_bottom,transparent_0%,transparent_72%,#faf8f5_100%)]"
      />

      <FaithDetailControls
        controlsAttr="data-armenians-controls"
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
          data-armenians-animate="true"
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

        <FaithDetailSpacer />

        <NationTopicSwitcher
          pageTitle={c.pageTitle}
          topics={c.topics}
          images={TOPIC_IMAGES}
          animateAttr="data-armenians-animate"
          ariaLabel="Armenians topics"
          langKey={lang}
        />

        <section data-armenians-animate="true" className={FAITH_TAGLINE_SECTION_CLASS}>
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
