import React from "react";
import {
  ChevronRight,
  HeartHandshake,
  Sparkles,
} from "lucide-react";
import OtherFaithTraditionsPage from "@/components/Sections/religions/RelisgionsSection/OtherFaith";

import bg from "@/assets/images/religions/yazidi/cover.webp";
import { useReligionPageAnimation } from "@/components/Sections/religions/useReligionPageAnimation";
import { useSectionExit } from "@/components/Sections/religions/useSectionExit";
import {
  FAITH_CONTENT_PADDING,
  FAITH_DETAIL_CONTENT_WIDTH,
  FAITH_DETAIL_SUBTITLE_CLASS,
  FAITH_DETAIL_TITLE_CLASS,
  FAITH_TAGLINE_ACTION_SECTION_CLASS,
  NATION_TAGLINE_TEXT_CLASS,
  FaithDetailControls,
  FaithDetailHeroImage,
  FaithDetailPageShell,
  FaithDetailSpacer,
} from "@/components/Sections/religions/faithDetailLayout";
import { NationTopicSwitcher } from "@/components/Sections/religions/nations/NationTopicSwitcher";
import lalish from "@/assets/images/religions/yazidi/lalish.webp";
import peacock from "@/assets/images/religions/yazidi/tawus.webp";
import jemayiImg from "@/assets/images/religions/yazidi/jemayi.webp";
import candle from "@/assets/images/religions/yazidi/resilience.webp";

type LangCode = "en" | "ku" | "ar";

type TopicContent = {
  id: TopicId;
  title: string;
  text: string;
};

type YazidismContent = {
  back: string;
  pageTitle: string;
  subtitle: string;
  topics: [TopicContent, TopicContent, TopicContent, TopicContent];
  tagline: string;
};

type TopicId = "lalish" | "tawus-melek" | "jemayi" | "resilience";

type TopicContent = {
  id: TopicId;
  title: string;
  text: string;
};

const TOPIC_IMAGES: Record<TopicId, string> = {
  lalish: lalish,
  "tawus-melek": peacock,
  jemayi: candle,
  resilience: jemayiImg,
};


const content: Record<LangCode, YazidismContent> = {
  en: {
    back: "Back",
    pageTitle: "YAZIDISM",
    subtitle: "Sacred valley, memory, and resilience",
    topics: [
      {
        id: "lalish",
        title: "LALISH",
        text: "60 km north of Mosul, in the Sheikhan district. Home to the shrine of Sheikh Adi and the global spiritual center of the Yazidi faith.",
      },
      {
        id: "tawus-melek",
        title: "TAWUS MELEK",
        text: "The Peacock Angel — chief of the angels and guardian of the universe, the pillar of Yazidi belief and identity.",
      },
      {
        id: "jemayi",
        title: "JEMAYÎ",
        text: "The largest annual religious gathering (6–13 October). One of the four festivals officially recognized as public holidays.",
      },
      {
        id: "resilience",
        title: "RESILIENCE",
        text: "The Yazidi population in Kurdistan is estimated at 750,000–800,000. The Kurdistan Parliament has recognized August 3 as Yazidi Genocide Day.",
      }
    ],
    tagline: "Rooted in faith, living with dignity.",
  },
  ku: {
    back: "گەڕانەوە",
    pageTitle: "ئێزیدیاتی",
    subtitle: "دۆڵە پیرۆزەکە، یادەوەری و خۆڕاگری",
    topics: [
      {
        id: "lalish",
        title: "لالش",
        text: "٦٠ کم لە باکووری مووسڵەوە دوورە لە قەزای شێخان. مەزاری شێخ عەدی لێیە و ناوەندی ڕۆحیی جیهانی ئێزیدییە.",
      },
      {
        id: "tawus-melek",
        title: "مەلەک تاووس",
        text: "گەورەی فریشتەکانە و پارێزەری گەردوونە. کۆڵەکەی باوەڕی ئێزیدی و ناسنامەیانە.",
      },
      {
        id: "jemayi",
        title: "جەمایێ",
        text: "گەورەترین کۆبوونەوەی ئایینی ساڵانەیە (٦-١٣ی تشرینی یەکەم). یەکێکە لەو چوار جەژنەی کە وەک پشووی فەرمی ناسراون.",
      },
      {
        id: "resilience",
        title: "خۆڕاگری",
        text: "ژمارەی ئێزیدییەکان لە کوردستان بە ٧٥٠ بۆ ٨٠٠ هەزار کەس دەخەمڵێنرێت. پەرلەمانی کوردستان ڕۆژی ٣ی ئابی وەک ڕۆژی جینۆسایدی ئێزیدییەکان ناساندووە.",
      }
    ],
    tagline: "لە باوەڕدا ڕەگداکوتاون، بە کەرامەتەوە دەژین.",
  },
  ar: {
    back: "العودة",
    pageTitle: "الإيزيدية",
    subtitle: "الوادي المقدس والذاكرة والصمود",
    topics: [
      {
        id: "lalish",
        title: "لالش",
        text: "تقع على بعد 60 كم شمال الموصل في قضاء شيخان بدهوك. تضم ضريح الشيخ عدي بن مسافر. القلب الروحي للعالم الإيزيدي ومقر المجلس الروحي الأعلى.",
      },
      {
        id: "tawus-melek",
        title: "ملك طاووس",
        text: "طاووس ملك هو كبير الملائكة، يجسّد نور الله ويحرس الكون. محور الإيمان الإيزيدي وركيزة الهوية.",
      },
      {
        id: "jemayi",
        title: "جمايا",
        text: "أكبر تجمع ديني سنوي يُحتفل به سبعة أيام من 6 إلى 13 أكتوبر. وهو أحد أربعة مهرجانات إيزيدية موسمية معترف بها عطلاً رسمية.",
      },
      {
        id: "resilience",
        title: "الصمود",
        text: "يُقدَّر عدد الإيزيديين في كوردستان العراق بـ750,000 إلى 800,000 نسمة. وأعلن برلمان كوردستان رسمياً الثالث من أغسطس يوماً للإبادة الجماعية الإيزيدية عام 2019.",
      }
    ],
    tagline: "متجذرون في الإيمان. يعيشون بكرامة.",
  },
};


function DecorativeLine({ color = "#c99a55" }) {
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

type YazidismPageProps = {
  lang?: LangCode;
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function YazidismPage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: YazidismPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const { runExit, resetExit } = useSectionExit(sectionRef);
  const [subPage, setSubPage] = React.useState<null | "otherFaith">(null);
  const c = content[lang];
  const dir = lang === "en" ? "ltr" : "rtl";

  // Clear the navigation guard whenever the main faith view is shown again.
  React.useEffect(() => {
    if (!subPage) resetExit();
  }, [subPage, resetExit]);

  useReligionPageAnimation(
    sectionRef,
    {
      hero: "[data-yazidi-hero='true']",
      animate: "[data-yazidi-animate='true']",
      controls: "[data-yazidi-controls='true']",
    },
    [lang],
  );

  if (subPage === "otherFaith") {
    return (
      <OtherFaithTraditionsPage
        lang={lang}
        languageLabel={languageLabel}
        onLanguageChange={onLanguageChange}
        onBack={() => setSubPage(null)}
      />
    );
  }

  return (
    <FaithDetailPageShell dir={dir} lang={lang} fitDeps={[lang]} sectionRef={sectionRef}>
        <FaithDetailHeroImage
          heroAttr="data-yazidi-hero"
          src={bg}
        />

        <FaithDetailControls
          controlsAttr="data-yazidi-controls"
          backLabel={c.back}
          dir={dir}
          onBack={onBack}
          onLanguageChange={onLanguageChange}
          languageLabel={languageLabel}
        />

        <div className={`relative z-10 mx-auto ${FAITH_DETAIL_CONTENT_WIDTH} ${FAITH_CONTENT_PADDING}`}>
          <header
            data-yazidi-animate="true"
            className="-mr-8 ml-auto max-w-[560px] pt-[300px] pr-0 text-right"
          >
            <div className="ml-auto mb-3 mt-3 w-[180px] max-w-full">
              <DecorativeLine color="#c3923a" />
            </div>

            <h1 className={`whitespace-nowrap ${FAITH_DETAIL_TITLE_CLASS} text-[#3b2410] drop-shadow-[0_2px_12px_rgba(250,248,245,0.9)]`}>
              {c.pageTitle}
            </h1>

            <div className="ml-auto mt-5 w-[130px] max-w-full">
              <DecorativeLine color="#c3923a" />
            </div>

            <p className={`ml-auto mt-5 max-w-[440px] ${FAITH_DETAIL_SUBTITLE_CLASS} text-[#4d3c2a] drop-shadow-[0_2px_10px_rgba(250,248,245,0.9)]`}>
              {c.subtitle}
            </p>
          </header>

          <FaithDetailSpacer desktopHeight="h-[424px]" />

          <NationTopicSwitcher
            pageTitle={c.pageTitle}
            topics={c.topics}
            images={TOPIC_IMAGES}
            animateAttr="data-yazidi-animate"
            ariaLabel="Yazidism topics"
            langKey={lang}
          />

          <section data-yazidi-animate="true" className={FAITH_TAGLINE_ACTION_SECTION_CLASS}>
            <div className="grid h-16 w-16 shrink-0 place-items-center self-auto text-[#c58b16]">
              <HeartHandshake className="h-12 w-12" strokeWidth={1.8} />
            </div>

            <p className={`flex-1 text-start ${NATION_TAGLINE_TEXT_CLASS}`}>
              {c.tagline}
            </p>

            <button
              type="button"
              onClick={() => runExit(() => setSubPage("otherFaith"))}
              className="grid h-16 w-16 shrink-0 place-items-center self-auto rounded-full border border-[#d6b06b] bg-[#fff4dc] text-[#a8751f] transition-transform duration-300 ease-smooth-out active:scale-95"
            >
              <ChevronRight className="h-9 w-9" />
            </button>
          </section>

          <Sparkles className="mx-auto mt-5 h-12 w-12 text-[#c58b16]" />
        </div>

        <div className="pointer-events-none absolute bottom-0 right-0 h-52 w-52 rounded-tl-full border-l-2 border-t-2 border-[#d2a35a]/30 opacity-70" />
    </FaithDetailPageShell>
  );
}
