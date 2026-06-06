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
  FAITH_IMAGE_SIDE_AVATAR_CLASS,
  FAITH_IMAGE_SIDE_CARD_CLASS,
  FAITH_CONTENT_PADDING,
  FAITH_MAIN_CLASS,
  FAITH_SECTION_CLASS,
  FAITH_TAGLINE_ACTION_SECTION_CLASS,
  FAITH_TAGLINE_TEXT_CLASS,
  FaithDetailControls,
  FaithDetailHeroImage,
  FaithDetailSpacer,
} from "@/components/Sections/religions/faithDetailLayout";
import meaningImg from "@/assets/mainImages/letter.webp";
import principlesImg from "@/assets/mainImages/story-2.webp";
import jamkhanaImg from "@/assets/mainImages/shared.webp";
import bookImg from "@/assets/mainImages/story-1.webp";

type LangCode = "en" | "ku" | "ar";

type CardContent = {
  title: string;
  text: string;
};

type YarsanismContent = {
  back: string;
  pageTitle: string;
  subtitle: string;
  cards: [CardContent, CardContent, CardContent, CardContent];
  tagline: string;
};

const content: Record<LangCode, YarsanismContent> = {
  en: {
    back: "Back",
    pageTitle: "YARSANISM (KAKAI)",
    subtitle: "Inner truth, devotion, and community",
    cards: [
      {
        title: "MEANING",
        text: "\u201CYarsan\u201D means \u201Cthe companions of God.\u201D In Kurdistan they are known as Kakais, from the Kurdish word \u201CKaka.\u201D",
      },
      {
        title: "FOUR PRINCIPLES",
        text: "Purity, Truth, Selflessness (Nisti), and Religiosity (Rada). Three principles govern human relationships, and one governs the relationship with God.",
      },
      {
        title: "JAMKHANA",
        text: "The sacred gathering place where rites are performed. Music and the tambour hold a uniquely elevated spiritual role.",
      },
      {
        title: "SACRED BOOK",
        text: "The Sernjam — written in verse in the Gorani and Sorani Kurdish dialects.",
      },
    ],
    tagline: "A quiet path of faith.",
  },
  ku: {
    back: "گەڕانەوە",
    pageTitle: "یارسانی (کاکەیی)",
    subtitle: "ڕاستی ناخ، باوەڕداری و کۆمەڵگە",
    cards: [
      {
        title: "واتا",
        text: "«یارسان» واتە یارانی خودا. لە کوردستان بە «کاکەیی» دەناسرێن کە لە وشەی «کاکا»ی کوردییەوە هاتووە.",
      },
      {
        title: "چوار بنەماکە",
        text: "پاکی، ڕاستی، بێفیزی (خۆبچووککردنەوە) و دینداری. سێ بنەمایان پەیوەندییە مرۆییەکان ڕێکدەخەن و یەکێکیان پەیوەندی لەگەڵ خودا.",
      },
      {
        title: "جەمخانە",
        text: "شوێنی پیرۆزی کۆبوونەوە و ئەنجامدانی ڕێوڕەسمەکانە. مۆسیقا و ئامێری تەمبوور لای ئەوان پێگەیەکی ڕۆحی بالای هەیە.",
      },
      {
        title: "کتێبی پیرۆز",
        text: "(سەرەنجام) کە بە شێوەزاری گۆران و سۆرانی بە شیعر نووسراوەتەوە.",
      },
    ],
    tagline: "ڕێگایەکی ئارام بۆ باوەڕ.",
  },
  ar: {
    back: "العودة",
    pageTitle: "اليارسانية (الكاكائية)",
    subtitle: "حقيقة الباطن، والإخلاص، والمجتمع",
    cards: [
      {
        title: "المعنى",
        text: "«يارسان» تعني أصحاب الله. ويُعرفون في كوردستان بالكاكائيين، نسبةً إلى الكلمة الكوردية «كاكا».",
      },
      {
        title: "المبادئ الأربعة",
        text: "الطهارة، والصدق، والتجرّد (نِستي)، والتديّن (رَدا). ثلاثة منها تنظّم العلاقات بين الناس، والرابع ينظّم العلاقة مع الله.",
      },
      {
        title: "جمخانە",
        text: "المكان المقدّس للاجتماع وأداء الطقوس. وللموسيقى وآلة الطنبور مكانة روحية رفيعة عندهم.",
      },
      {
        title: "الكتاب المقدّس",
        text: "«السرنجام» المكتوب شعراً باللهجتين الكورديتين الكورانية والسورانية.",
      },
    ],
    tagline: "طريقٌ هادئ للإيمان.",
  },
};

const cardImages = [meaningImg, principlesImg, jamkhanaImg, bookImg];

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
    <main dir={dir} className={FAITH_MAIN_CLASS}>
      <section ref={sectionRef} className={FAITH_SECTION_CLASS}>
        <FaithDetailHeroImage
          heroAttr="data-yarsan-hero"
          src={bg}
          desktopClassName="absolute left-0 top-0 h-[calc(50vh-160px)] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_78%,transparent_100%)]"
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-[calc(50vh-160px)] z-[1] hidden h-24 -translate-y-full blur-[2px] sm:block"
            style={{
              background:
                "linear-gradient(to top, rgba(251,241,223,0.95) 0%, rgba(251,241,223,0.62) 45%, rgba(251,241,223,0) 100%)",
            }}
          />
        </FaithDetailHeroImage>

        <FaithDetailControls
          controlsAttr="data-yarsan-controls"
          backLabel={c.back}
          onBack={onBack}
          onLanguageChange={onLanguageChange}
          languageLabel={languageLabel}
        />

        <div className={`relative z-10 mx-auto max-w-[1020px] ${FAITH_CONTENT_PADDING}`}>
          <header
            data-yarsan-animate="true"
            className="mx-auto max-w-[820px] pt-4 text-center sm:pt-12"
          >
            <div className="mx-auto mb-4 w-[440px] max-w-full">
              <DecorativeLine color="#c3923a" />
            </div>

            <h1 className="break-words font-serif text-[clamp(32px,9vw,104px)] font-semibold uppercase leading-[1] tracking-[0.1em] text-[#2f1f12] sm:text-[86px] lg:text-[104px]">
              {c.pageTitle}
            </h1>

            <p className="mt-3 font-serif text-[clamp(18px,4.5vw,31px)] font-semibold text-[#a46f22] sm:mt-4 sm:text-[31px]">
              {c.subtitle}
            </p>

            <div className="mx-auto mt-5 w-[190px] max-w-full sm:mt-6">
              <DecorativeLine color="#c3923a" />
            </div>
          </header>

          <FaithDetailSpacer desktopHeight="h-[560px]" />

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            {c.cards.map((card, i) => (
              <article
                key={card.title}
                data-yarsan-animate="true"
                className={FAITH_IMAGE_SIDE_CARD_CLASS}
              >
                <div className={FAITH_IMAGE_SIDE_AVATAR_CLASS}>
                  <img
                    src={cardImages[i]}
                    alt={card.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif text-[22px] font-semibold uppercase leading-tight text-[#3b2410] sm:text-[27px]">
                      {card.title}
                    </h3>
                    <Sparkles className="h-7 w-7 shrink-0 text-[#c58b16] sm:h-8 sm:w-8" />
                  </div>

                  <div className="my-3 w-[130px]">
                    <DecorativeLine color="#d1a14f" />
                  </div>

                  <p className="whitespace-pre-line text-[15px] font-semibold leading-relaxed text-[#4d3c2a] sm:text-[17px]">
                    {card.text}
                  </p>
                </div>
              </article>
            ))}
          </section>

          <section data-yarsan-animate="true" className={FAITH_TAGLINE_ACTION_SECTION_CLASS}>
            <div className="grid h-16 w-16 shrink-0 place-items-center self-center text-[#c58b16] sm:self-auto">
              <HeartHandshake className="h-10 w-10 sm:h-12 sm:w-12" strokeWidth={1.8} />
            </div>

            <p className={`flex-1 text-center ${FAITH_TAGLINE_TEXT_CLASS} sm:text-left`}>
              {c.tagline}
            </p>

            <button
              type="button"
              onClick={() => setSubPage("otherFaith")}
              className="grid h-16 w-16 shrink-0 place-items-center self-center rounded-full border border-[#d6b06b] bg-[#fff4dc] text-[#a8751f] sm:self-auto"
            >
              <ChevronRight className="h-9 w-9" />
            </button>
          </section>

          <Sparkles className="mx-auto mt-5 h-10 w-10 text-[#c58b16] sm:h-12 sm:w-12" />
        </div>

        <div className="pointer-events-none absolute bottom-0 right-0 hidden h-52 w-52 rounded-tl-full border-l-2 border-t-2 border-[#d2a35a]/30 opacity-70 sm:block" />
      </section>
    </main>
  );
}
