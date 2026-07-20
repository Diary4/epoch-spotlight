import React from "react";
import {
  Cross,
  Sparkles,
} from "lucide-react";

import bg from "@/assets/images/religions/r-5.webp";
import popeImg from "@/assets/images/religions/christianity/pope.jpeg";
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
type TopicId = "historical-presence" | "churches" | "easter-christmas" | "pope-francis";

type TopicContent = {
  id: TopicId;
  title: string;
  text: string;
};

type ChristianityContent = {
  back: string;
  pageTitle: string;
  subtitle: string;
  topics: [TopicContent, TopicContent, TopicContent, TopicContent];
  tagline: string;
};

const TOPIC_IMAGES: Record<TopicId, string> = {
  "historical-presence": bg,
  churches: bg,
  "easter-christmas": bg,
  "pope-francis": popeImg,
};

const content: Record<LangCode, ChristianityContent> = {
  en: {
    back: "Back",
    pageTitle: "CHRISTIANITY",
    subtitle: "Ancient roots, steadfast faith, and a united community",
    topics: [
      {
        id: "historical-presence",
        title: "HISTORICAL PRESENCE",
        text: "Christianity reached Erbil (Adiabene) in the 1st century CE. By the 3rd century, Erbil had become a major Christian center.",
      },
      {
        id: "churches",
        title: "CHURCHES",
        text: "All four main traditions are present: Catholic, Orthodox, Eastern, and Evangelical. Dozens of active churches and monasteries stand in Erbil, Duhok, Zakho, and Sulaymaniyah.",
      },
      {
        id: "easter-christmas",
        title: "EASTER & CHRISTMAS",
        text: "Both Easter and Christmas are official public holidays across the Kurdistan Region.",
      },
      {
        id: "pope-francis",
        title: "POPE FRANCIS",
        text: "On 7 March 2021 he visited Erbil and said: \u201CFreedom is deeply rooted in Kurdistan. Thank you for what you offer to every religion and community.\u201D",
      },
    ],
    tagline: "A living faith in Kurdistan.",
  },
  ku: {
    back: "گەڕانەوە",
    pageTitle: "مەسیحییەت",
    subtitle: "ڕەگی دێرین، باوەڕی چەسپاو و کۆمەڵگەی یەکگرتوو",
    topics: [
      {
        id: "historical-presence",
        title: "بوونی مێژوویی",
        text: "مەسیحییەت لە سەدەی یەکەمی زایینی گەیشتە هەولێر (حەدیاب). هەولێر لە سەدەی سێیەمەوە مەڵبەندێکی گەورەی مەسیحی بووە.",
      },
      {
        id: "churches",
        title: "کەنیسەکان",
        text: "هەر چوار جۆری سەرەکی: کاسۆلیک، ئۆرسۆدۆکس، ڕۆژهەڵاتی و ئینجیلی. دەیان کەنیسە و دێری چالاک لە هەولێر، دهۆک، زاخۆ و سلێمانی هەن.",
      },
      {
        id: "easter-christmas",
        title: "جەژنی قیامەت و لەدایکبوون",
        text: "هەردووکیان پشووی فەرمین لە هەرێمی کوردستان.",
      },
      {
        id: "pope-francis",
        title: "پاپا فرانسیس",
        text: "لە ٧ی ئاداری ٢٠٢١ سەردانی هەولێری کرد و وتی: «ئازادی لە کوردستان ڕەگی داکوتاوە. سوپاس بۆ ئەوەی پێشکەشی هەموو ئایین و پێکهاتەکانی دەکەن».",
      },
    ],
    tagline: "باوەڕێکی زیندوو لە کوردستان.",
  },
  ar: {
    back: "العودة",
    pageTitle: "المسيحية",
    subtitle: "جذور عريقة، وإيمان راسخ، ومجتمع متّحد",
    topics: [
      {
        id: "historical-presence",
        title: "حضور تاريخي",
        text: "وصلت المسيحية إلى أربيل (حدياب) في القرن الأول الميلادي. وأصبحت أربيل مركزاً مسيحياً كبيراً منذ القرن الثالث.",
      },
      {
        id: "churches",
        title: "الكنائس",
        text: "تحضر جميع الطوائف الأربع الرئيسية: الكاثوليكية والأرثوذكسية والمشرقية والإنجيلية. وتنتشر عشرات الكنائس والأديرة النشطة في أربيل ودهوك وزاخو والسليمانية.",
      },
      {
        id: "easter-christmas",
        title: "عيدا الفصح والميلاد",
        text: "كلاهما عطلتان رسميتان في إقليم كوردستان.",
      },
      {
        id: "pope-francis",
        title: "البابا فرنسيس",
        text: "في ٧ آذار ٢٠٢١ زار أربيل وقال: «الحرية متجذرة عميقاً في كوردستان. شكراً لما تقدّمونه لكل الأديان والمكوّنات».",
      },
    ],
    tagline: "إيمان حيٌّ في كوردستان.",
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

type ChristianityPageProps = {
  lang?: LangCode;
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function ChristianityPage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: ChristianityPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const c = content[lang];
  const dir = lang === "en" ? "ltr" : "rtl";

  useReligionPageAnimation(
    sectionRef,
    {
      hero: "[data-christian-hero='true']",
      animate: "[data-christian-animate='true']",
      controls: "[data-christian-controls='true']",
    },
    [lang],
  );

  return (
    <FaithDetailPageShell dir={dir} lang={lang} fitDeps={[lang]} sectionRef={sectionRef}>
        <FaithDetailHeroImage
          heroAttr="data-christian-hero"
          src={bg}
        />

        <FaithDetailControls
          controlsAttr="data-christian-controls"
          backLabel={c.back}
          dir={dir}
          onBack={onBack}
          onLanguageChange={onLanguageChange}
          languageLabel={languageLabel}
        />

        <div className={`relative z-10 mx-auto max-w-[1040px] ${FAITH_CONTENT_PADDING}`}>
          <header
            data-christian-animate="true"
            className="mx-auto max-w-[820px] pt-10 text-center"
          >
            <Cross className="mx-auto mb-3 h-16 w-16 text-[#c58b16]" />

            <div className="mx-auto mb-4 w-[430px] max-w-full">
              <DecorativeLine color="#c3923a" />
            </div>

            <h1 className="break-words font-serif text-[102px] font-semibold uppercase leading-[1] tracking-[0.08em] text-[#2f1f12]">
              {c.pageTitle}
            </h1>

            <p className="mt-4 font-serif text-[30px] font-semibold uppercase tracking-[0.08em] text-[#a46f22]">
              {c.subtitle}
            </p>

            <div className="mx-auto mt-6 w-[190px] max-w-full">
              <DecorativeLine color="#c3923a" />
            </div>
          </header>

          <FaithDetailSpacer />

          <NationTopicSwitcher
            pageTitle={c.pageTitle}
            topics={c.topics}
            images={TOPIC_IMAGES}
            animateAttr="data-christian-animate"
            ariaLabel="Christianity topics"
            langKey={lang}
          />

          <section data-christian-animate="true" className={FAITH_TAGLINE_SECTION_CLASS}>
            <div className={FAITH_TAGLINE_ICON_WRAP_CLASS}>
              <Cross className="h-10 w-10" strokeWidth={1.7} />
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
