import React from "react";
import {
  Cross,
  Sparkles,
} from "lucide-react";

import bg from "@/assets/images/religions/christianity/cover.jpeg";
import historicalImg from "@/assets/images/religions/christianity/christianity.jpeg";
import popeImg from "@/assets/images/religions/christianity/pope.jpeg";
import churchesImg from "@/assets/images/religions/christianity/churches.jpeg";
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
  "historical-presence": historicalImg,
  churches: churchesImg,
  "easter-christmas": historicalImg,
  "pope-francis": popeImg,
};

const content: Record<LangCode, ChristianityContent> = {
  en: {
    back: "Back",
    pageTitle: "CHRISTIANITY",
    subtitle: "Ancient Roots, Enduring Faith, and a United Community",
    topics: [
      {
        id: "historical-presence",
        title: "HISTORICAL PRESENCE",
        text: "Christianity reached Erbil (Adiabene) in the 1st century CE. By the 3rd century, Erbil had become a major Christian center.",
      },
      {
        id: "churches",
        title: "CHURCHES",
        text: "Christianity in the Kurdistan Region is represented by four main traditions: Catholic, Orthodox, Church of the East, and Evangelical. Dozens of active churches and monasteries are found across Erbil, Duhok, Zakho, and Sulaymaniyah.",
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
        text: "لە ٧ی ئاداری ٢٠٢١ سەردانی هەولێری کرد و وتی: \"ئازادی لە کوردستان ڕەگی داکوتاوە. سوپاس بۆ ئەوەی پێشکەشی هەموو ئایین و پێکهاتەکانی دەکەن.\"",
      },
    ],
    tagline: "باوەڕێکی زیندوو لە کوردستان.",
  },
  ar: {
    back: "العودة",
    pageTitle: "المسيحية",
    subtitle: "جذور عريقة وإيمان راسخ ومجتمع متماسك",
    topics: [
      {
        id: "historical-presence",
        title: "الحضور التاريخي",
        text: "بلغت المسيحية أربيل (حديابة) في القرن الأول الميلادي على يد الرسولين أدّاي وماري. وأصبحت أربيل مركزاً مسيحياً كبيراً بحلول القرن الثالث.",
      },
      {
        id: "churches",
        title: "الكنائس",
        text: "أربع عائلات رئيسية: الكاثوليكية والأرثوذكسية والشرقية والإنجيلية. عشرات الكنائس والأديرة النشطة في أربيل ودهوك وزاخو والسليمانية.",
      },
      {
        id: "easter-christmas",
        title: "عيد الفصح والميلاد",
        text: "كلاهما عطلة رسمية في إقليم كوردستان. يُحتفل بعيد الفصح بتلوين البيض وإعداد كعك العيد التقليدي.",
      },
      {
        id: "pope-francis",
        title: "البابا فرنسيس",
        text: "زار أربيل في 7 مارس 2021، وقال: \"الحرية متجذرة في كوردستان. شكراً على ما تقدمونه لجميع الأديان والمجتمعات.\"",
      },
    ],
    tagline: "إيمان حي في كوردستان.",
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
          heightClassName="h-[1100px]"
        />

        <FaithDetailControls
          controlsAttr="data-christian-controls"
          backLabel={c.back}
          dir={dir}
          onBack={onBack}
          onLanguageChange={onLanguageChange}
          languageLabel={languageLabel}
        />

        <div className={`relative z-10 mx-auto ${FAITH_DETAIL_CONTENT_WIDTH} ${FAITH_CONTENT_PADDING}`}>
          <header
            data-christian-animate="true"
            className="mx-auto max-w-[850px] pt-[620px] text-center"
          >
            <Cross className="mx-auto mb-3 h-16 w-16 text-[#e8c56a] drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]" />

            <div className="mx-auto mb-3 mt-3 w-[260px] max-w-full">
              <DecorativeLine color="#e8c56a" />
            </div>

            <h1 className={`${FAITH_DETAIL_TITLE_CLASS} text-[#f7f0e4] drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)]`}>
              {c.pageTitle}
            </h1>

            <div className="mx-auto mt-5 w-[180px] max-w-full">
              <DecorativeLine color="#e8c56a" />
            </div>

            <p className={`mx-auto mt-5 max-w-[620px] ${FAITH_DETAIL_SUBTITLE_CLASS} text-[#efe4d2] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]`}>
              {c.subtitle}
            </p>
          </header>

          <FaithDetailSpacer desktopHeight="h-[220px]" />

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
