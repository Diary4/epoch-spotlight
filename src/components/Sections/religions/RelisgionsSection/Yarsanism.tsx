import React from "react";
import {
  ChevronRight,
  HeartHandshake,
  Sparkles,
} from "lucide-react";
import OtherFaithTraditionsPage from "@/components/Sections/religions/RelisgionsSection/OtherFaith";

import bg from "@/assets/images/religions/kakayi/cover.jpeg";
import meaningImg from "@/assets/images/religions/kakayi/meaning.jpeg";
import principlesImg from "@/assets/images/religions/kakayi/fourprinciple.jpeg";
import jamkhanaImg from "@/assets/images/religions/kakayi/jamkhana.jpeg";
import bookImg from "@/assets/images/religions/kakayi/book.jpeg";
import { useReligionPageAnimation } from "@/components/Sections/religions/useReligionPageAnimation";
import { useSectionExit } from "@/components/Sections/religions/useSectionExit";
import {
  FAITH_CONTENT_PADDING,
  FAITH_DETAIL_CONTENT_WIDTH,
  FAITH_TAGLINE_ACTION_SECTION_CLASS,
  NATION_TAGLINE_TEXT_CLASS,
  FaithDetailControls,
  FaithDetailHeroImage,
  FaithDetailPageShell,
  FaithDetailSpacer,
} from "@/components/Sections/religions/faithDetailLayout";
import { NationTopicSwitcher } from "@/components/Sections/religions/nations/NationTopicSwitcher";

type LangCode = "en" | "ku" | "ar";
type TopicId = "meaning" | "four-principles" | "jamkhana" | "sacred-book";

type TopicContent = {
  id: TopicId;
  title: string;
  text: string;
};

type YarsanismContent = {
  back: string;
  pageTitle: string;
  subtitle: string;
  topics: [TopicContent, TopicContent, TopicContent, TopicContent];
  tagline: string;
};

const TOPIC_IMAGES: Record<TopicId, string> = {
  meaning: meaningImg,
  "four-principles": principlesImg,
  jamkhana: jamkhanaImg,
  "sacred-book": bookImg,
};


const content: Record<LangCode, YarsanismContent> = {
  en: {
    back: "Back",
    pageTitle: "YARSANISM (KAKAI)",
    subtitle: "Inner truth, devotion, and community",
    topics: [
      {
        id: "meaning",
        title: "MEANING",
        text: "\u201CYarsan\u201D means \u201Cthe companions of God.\u201D In Kurdistan they are known as Kakais, from the Kurdish word \u201CKaka.\u201D",
      },
      {
        id: "four-principles",
        title: "FOUR PRINCIPLES",
        text: "Purity, Truth, Selflessness (Nisti), and Religiosity (Rada). Three principles govern human relationships, and one governs the relationship with God.",
      },
      {
        id: "jamkhana",
        title: "JAMKHANA",
        text: "The sacred gathering place where rites are performed. Music and the tambour hold a uniquely elevated spiritual role.",
      },
      {
        id: "sacred-book",
        title: "SACRED BOOK",
        text: "The Sernjam — written in verse in the Gorani and Sorani Kurdish dialects.",
      }
    ],
    tagline: "A quiet path of faith.",
  },
  ku: {
    back: "گەڕانەوە",
    pageTitle: "یارسانی (کاکەیی)",
    subtitle: "ڕاستی ناخ، باوەڕداری و کۆمەڵگە",
    topics: [
      {
        id: "meaning",
        title: "واتا",
        text: "\"یارسان\" واتە یارانی خودا. لە کوردستان بە \"کاکەیی\" دەناسرێن کە لە وشەی \"کاکا\"ی کوردییەوە هاتووە.",
      },
      {
        id: "four-principles",
        title: "چوار بنەماکە",
        text: "پاکی، ڕاستی، بێ‌فیزی (خۆبچووککردنەوە) و دینداری. سێ بنەمایان پەیوەندییە مرۆییەکان ڕێکدەخەن و یەکێکیان پەیوەندی لەگەڵ خودا.",
      },
      {
        id: "jamkhana",
        title: "جەمخانە",
        text: "شوێنی پیرۆزی کۆبوونەوە و ئەنجامدانی ڕێوڕەسمەکانە. مۆسیقا و ئامێری تەمبوور لای ئەوان پێگەیەکی ڕۆحی باڵای هەیە.",
      },
      {
        id: "sacred-book",
        title: "کتێبی پیرۆز",
        text: "(سەرەنجام) کە بە شێوەزاری گۆران و سۆرانی بە شیعر نووسراوەتەوە.",
      }
    ],
    tagline: "ڕێگایەکی ئارام بۆ باوەڕ.",
  },
  ar: {
    back: "العودة",
    pageTitle: "اليارسانية (الكاكائية)",
    subtitle: "الحقيقة الداخلية والتقوى والمجتمع",
    topics: [
      {
        id: "meaning",
        title: "المعنى",
        text: "\"يارسان\" تعني محبي الله وأتباعه. ويُعرف أتباعها في كوردستان بالكاكائيين — من الكلمة الكوردية \"كاكا\" التي تعني الأخ الأكبر الموقّر.",
      },
      {
        id: "four-principles",
        title: "المبادئ الأربعة",
        text: "الطهارة والحق والتواضع (نيستي) والتديّن (رادا). ثلاثة مبادئ تنظّم العلاقات الإنسانية، ومبدأ واحد يُنظّم العلاقة مع الله.",
      },
      {
        id: "jamkhana",
        title: "جمخانة",
        text: "المكان المقدس للتجمع حيث تُؤدَّى جميع الشعائر الدينية. والموسيقى، ولا سيما الطنبور، محور أساسي في الاحتفالات والحياة الروحية.",
      },
      {
        id: "sacred-book",
        title: "الكتاب المقدس",
        text: "السرنجام — مكتوب بلهجتَي الگوراني والسوراني الكورديتَين شعراً. يتناول الخلق والملائكة وآدم وحواء والتعاليم الدينية.",
      }
    ],
    tagline: "طريق إيمان هادئة.",
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

type YarsanismPageProps = {
  lang?: LangCode;
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function YarsanismPage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: YarsanismPageProps) {
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
      hero: "[data-yarsan-hero='true']",
      animate: "[data-yarsan-animate='true']",
      controls: "[data-yarsan-controls='true']",
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
          heroAttr="data-yarsan-hero"
          src={bg}
        />

        <FaithDetailControls
          controlsAttr="data-yarsan-controls"
          backLabel={c.back}
          dir={dir}
          onBack={onBack}
          onLanguageChange={onLanguageChange}
          languageLabel={languageLabel}
        />

        <div className={`relative z-10 mx-auto ${FAITH_DETAIL_CONTENT_WIDTH} ${FAITH_CONTENT_PADDING}`}>
          <header
            data-yarsan-animate="true"
            className="-ml-8 max-w-[440px] pt-[200px] pl-0 text-left"
          >
            <div className="mb-3 mt-3 w-[160px] max-w-full">
              <DecorativeLine color="#c3923a" />
            </div>

            <h1 className="break-words font-serif text-[56px] font-light uppercase leading-[1.04] tracking-[0.04em] text-[#3b2410] drop-shadow-[0_2px_12px_rgba(250,248,245,0.9)]">
              {c.pageTitle}
            </h1>

            <div className="mt-4 w-[120px] max-w-full">
              <DecorativeLine color="#c3923a" />
            </div>

            <p className="mt-4 max-w-[360px] font-serif text-[16px] font-light leading-relaxed text-[#4d3c2a] drop-shadow-[0_2px_10px_rgba(250,248,245,0.9)]">
              {c.subtitle}
            </p>
          </header>

          <FaithDetailSpacer desktopHeight="h-[520px]" />

          <NationTopicSwitcher
            pageTitle={c.pageTitle}
            topics={c.topics}
            images={TOPIC_IMAGES}
            animateAttr="data-yarsan-animate"
            ariaLabel="Yarsanism topics"
            langKey={lang}
          />

          <section data-yarsan-animate="true" className={FAITH_TAGLINE_ACTION_SECTION_CLASS}>
            <div className="grid h-16 w-16 shrink-0 place-items-center self-auto text-[#c58b16]">
              <HeartHandshake className="h-12 w-12" strokeWidth={1.8} />
            </div>

            <p className={`flex-1 text-start ${NATION_TAGLINE_TEXT_CLASS}`}>
              {c.tagline}
            </p>

            <button
              type="button"
              onClick={() => runExit(() => setSubPage("otherFaith"))}
              className="grid h-16 w-16 shrink-0 place-items-center self-auto rounded-full border border-[#d6b06b] bg-[#fff4dc] text-[#a8751f] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 active:scale-95"
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
