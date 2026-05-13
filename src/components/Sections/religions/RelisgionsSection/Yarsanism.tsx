import React from "react";
import gsap from "gsap";
import {
  ArrowLeft,
  ChevronRight,
  Globe2,
  HeartHandshake,
  Sparkles,
} from "lucide-react";
import OtherFaithTraditionsPage from "@/components/Sections/religions/RelisgionsSection/OtherFaith";

import bg from "@/assets/images/religions/r-3.webp";
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

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-yarsan-hero='true']", {
        autoAlpha: 0,
        scale: 1.04,
      });
      gsap.set("[data-yarsan-animate='true']", {
        autoAlpha: 0,
        y: 24,
      });

      const tl = gsap.timeline();
      tl.to("[data-yarsan-hero='true']", {
        autoAlpha: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      }).to(
        "[data-yarsan-animate='true']",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.07,
          ease: "power2.out",
        },
        "-=0.2",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

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
    <main
      dir={dir}
      className="m-0 flex min-h-screen w-screen justify-center bg-[#f8f1e7] p-0 text-[#3d2b18]"
    >
      <section
        ref={sectionRef}
        className="relative min-h-screen w-full overflow-hidden bg-[#fbf1df] px-7 py-9 sm:px-10 lg:px-16"
      >
        <img
          data-yarsan-hero="true"
          src={bg}
          alt=""
          className="absolute left-0 top-0 h-[calc(50vh-160px)] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_78%,transparent_100%)]"
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-[calc(50vh-160px)] z-[1] h-24 -translate-y-full blur-[2px]"
          style={{
            background:
              "linear-gradient(to top, rgba(251,241,223,0.95) 0%, rgba(251,241,223,0.62) 45%, rgba(251,241,223,0) 100%)",
          }}
        />

        <button
          type="button"
          onClick={onBack}
          className="absolute left-8 top-8 z-30 grid h-14 w-14 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#5a3a18] shadow-sm"
          aria-label={c.back}
        >
          <ArrowLeft className="h-7 w-7" />
        </button>

        <button
          type="button"
          onClick={onLanguageChange}
          className="absolute right-8 top-8 z-30 flex items-center gap-3 rounded-full border border-[#d9b477] bg-white/75 px-5 py-3 font-serif text-sm font-semibold text-[#4b3219] shadow-[0_8px_20px_rgba(84,54,16,0.15)]"
        >
          <Globe2 className="h-5 w-5" />
          {languageLabel}
        </button>

        <div className="relative z-10 mx-auto max-w-[1020px]">
          <header
            data-yarsan-animate="true"
            className="mx-auto max-w-[820px] pt-12 text-center"
          >
            <div className="mx-auto mb-4 w-[440px] max-w-full">
              <DecorativeLine color="#c3923a" />
            </div>

            <h1 className="font-serif text-[66px] font-semibold uppercase leading-[1] tracking-[0.1em] text-[#2f1f12] sm:text-[86px] lg:text-[104px]">
              {c.pageTitle}
            </h1>

            <p className="mt-4 font-serif text-[25px] font-semibold text-[#a46f22] sm:text-[31px]">
              {c.subtitle}
            </p>

            <div className="mx-auto mt-6 w-[190px]">
              <DecorativeLine color="#c3923a" />
            </div>
          </header>

          <div className="h-[560px]" />

          <section
            data-yarsan-animate="true"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            {c.cards.map((card, i) => (
              <article
                key={card.title}
                className="grid min-h-[255px] grid-cols-[135px_1fr] gap-5 rounded-[24px] border-2 border-[#d8b875]/55 bg-[#fff8e9]/92 px-6 py-6 shadow-[0_10px_22px_rgba(75,45,12,0.12)] backdrop-blur-sm"
              >
                <div className="h-[135px] w-[135px] overflow-hidden rounded-full border-2 border-[#d8b875] bg-[#f4e1bb]">
                  <img
                    src={cardImages[i]}
                    alt={card.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif text-[27px] font-semibold uppercase leading-tight text-[#3b2410]">
                      {card.title}
                    </h3>
                    <Sparkles className="h-8 w-8 shrink-0 text-[#c58b16]" />
                  </div>

                  <div className="my-3 w-[130px]">
                    <DecorativeLine color="#d1a14f" />
                  </div>

                  <p className="whitespace-pre-line text-[17px] font-semibold leading-relaxed text-[#4d3c2a]">
                    {card.text}
                  </p>
                </div>
              </article>
            ))}
          </section>

          <section
            data-yarsan-animate="true"
            className="mx-auto mt-7 flex items-center gap-7 rounded-[26px] border-2 border-[#c99745]/45 bg-[#fff7e7]/95 px-8 py-5 shadow-[0_12px_28px_rgba(75,45,12,0.16)]"
          >
            <div className="grid h-16 w-16 shrink-0 place-items-center text-[#c58b16]">
              <HeartHandshake className="h-12 w-12" strokeWidth={1.8} />
            </div>

            <p className="flex-1 font-serif text-[27px] font-semibold leading-tight text-[#3b2410]">
              {c.tagline}
            </p>

            <button
              type="button"
              onClick={() => setSubPage("otherFaith")}
              className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-[#d6b06b] bg-[#fff4dc] text-[#a8751f]"
            >
              <ChevronRight className="h-9 w-9" />
            </button>
          </section>

          <Sparkles className="mx-auto mt-5 h-12 w-12 text-[#c58b16]" />
        </div>

        <div className="pointer-events-none absolute bottom-0 right-0 h-52 w-52 rounded-tl-full border-l-2 border-t-2 border-[#d2a35a]/30 opacity-70" />
      </section>
    </main>
  );
}
