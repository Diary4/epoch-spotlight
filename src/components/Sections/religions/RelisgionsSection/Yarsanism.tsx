import React from "react";
import {
  ChevronRight,
  HeartHandshake,
  Sparkles,
} from "lucide-react";
import OtherFaithTraditionsPage from "@/components/Sections/religions/RelisgionsSection/OtherFaith";

import bg from "@/assets/images/religions/k-1.webp";
import { useReligionPageAnimation } from "@/components/Sections/religions/useReligionPageAnimation";
import {
  FAITH_CONTENT_PADDING,
  FAITH_DETAIL_CONTENT_WIDTH,
  FAITH_DETAIL_HEADER_CLASS,
  FAITH_TAGLINE_ACTION_SECTION_CLASS,
  NATION_TAGLINE_TEXT_CLASS,
  FaithDetailControls,
  FaithDetailHeroImage,
  FaithDetailPageShell,
  FaithDetailSpacer,
} from "@/components/Sections/religions/faithDetailLayout";
import { NationTopicSwitcher } from "@/components/Sections/religions/nations/NationTopicSwitcher";
import meaningImg from "@/assets/mainImages/letter.webp";
import principlesImg from "@/assets/mainImages/story-2.webp";
import jamkhanaImg from "@/assets/mainImages/shared.webp";
import bookImg from "@/assets/mainImages/story-1.webp";

type LangCode = "en" | "ku" | "ar";

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

type TopicId = "meaning" | "four-principles" | "jamkhana" | "sacred-book";

type TopicContent = {
  id: TopicId;
  title: string;
  text: string;
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
        text: "«یارسان» واتە یارانی خودا. لە کوردستان بە «کاکەیی» دەناسرێن کە لە وشەی «کاکا»ی کوردییەوە هاتووە.",
      },
      {
        id: "four-principles",
        title: "چوار بنەماکە",
        text: "پاکی، ڕاستی، بێفیزی (خۆبچووککردنەوە) و دینداری. سێ بنەمایان پەیوەندییە مرۆییەکان ڕێکدەخەن و یەکێکیان پەیوەندی لەگەڵ خودا.",
      },
      {
        id: "jamkhana",
        title: "جەمخانە",
        text: "شوێنی پیرۆزی کۆبوونەوە و ئەنجامدانی ڕێوڕەسمەکانە. مۆسیقا و ئامێری تەمبوور لای ئەوان پێگەیەکی ڕۆحی بالای هەیە.",
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
    subtitle: "حقيقة الباطن، والإخلاص، والمجتمع",
    topics: [
      {
        id: "meaning",
        title: "المعنى",
        text: "«يارسان» تعني أصحاب الله. ويُعرفون في كوردستان بالكاكائيين، نسبةً إلى الكلمة الكوردية «كاكا».",
      },
      {
        id: "four-principles",
        title: "المبادئ الأربعة",
        text: "الطهارة، والصدق، والتجرّد (نِستي)، والتديّن (رَدا). ثلاثة منها تنظّم العلاقات بين الناس، والرابع ينظّم العلاقة مع الله.",
      },
      {
        id: "jamkhana",
        title: "جمخانە",
        text: "المكان المقدّس للاجتماع وأداء الطقوس. وللموسيقى وآلة الطنبور مكانة روحية رفيعة عندهم.",
      },
      {
        id: "sacred-book",
        title: "الكتاب المقدّس",
        text: "«السرنجام» المكتوب شعراً باللهجتين الكورديتين الكورانية والسورانية.",
      }
    ],
    tagline: "طريقٌ هادئ للإيمان.",
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
  const [subPage, setSubPage] = React.useState<null | "otherFaith">(null);
  const c = content[lang];
  const dir = lang === "en" ? "ltr" : "rtl";

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
            className={FAITH_DETAIL_HEADER_CLASS}
          >
            <div className="mx-auto mb-3 mt-3 w-[260px] max-w-full">
              <DecorativeLine color="#c3923a" />
            </div>

            <h1 className="break-words font-serif text-[96px] font-light uppercase leading-[1.04] tracking-[0.04em] text-[#3b2410]">
              {c.pageTitle}
            </h1>

            <div className="mx-auto mt-5 w-[180px] max-w-full">
              <DecorativeLine color="#c3923a" />
            </div>

            <p className="mx-auto mt-5 max-w-[620px] font-serif text-[22px] font-light leading-relaxed text-[#4d3c2a]">
              {c.subtitle}
            </p>
          </header>

          <FaithDetailSpacer />

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
              onClick={() => setSubPage("otherFaith")}
              className="grid h-16 w-16 shrink-0 place-items-center self-auto rounded-full border border-[#d6b06b] bg-[#fff4dc] text-[#a8751f]"
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
