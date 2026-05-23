import React from "react";
import {
  ArrowLeft,
  BookOpen,
  Droplets,
  Globe2,
  Landmark,
  Languages,
  Sparkles,
} from "lucide-react";

import waterVideo from "@/assets/videos/water.webm?url";
import { useReligionPageAnimation } from "@/components/Sections/religions/useReligionPageAnimation";

type LangCode = "en" | "ku" | "ar";

const content: Record<
  LangCode,
  {
    title: string;
    subtitle: string;
    tagline: string;
    cards: { title: string; icon: typeof BookOpen; text: string }[];
  }
> = {
  en: {
    title: "Sabean-Mandaeanism",
    subtitle: "Living water, purity, and continuity",
    tagline: "Faith flowing through time.",
    cards: [
      {
        title: "Meaning",
        icon: BookOpen,
        text: "Sabians: those who immerse in water. Mandaeans: those of knowledge. Together: those immersed in divine knowledge following the true religion.",
      },
      {
        title: "Five Pillars",
        icon: Sparkles,
        text: "Monotheism, Baptism, Prayer, Fasting, and Almsgiving. Prophets: Adam, Seth, Sam son of Noah, and Yahya (John the Baptist).",
      },
      {
        title: "Mandaic Language",
        icon: Languages,
        text: "Their own ancient language, a dialect of Aramaic related to Syriac and Hebrew. All religious ceremonies are conducted in Mandaic.",
      },
      {
        title: "In Kurdistan",
        icon: Landmark,
        text: "Mandaean Cultural Association headquartered in Erbil. Rights protected under Law No. 5 of 2015 and the Iraqi Constitution 2005.",
      },
    ],
  },
  ku: {
    title: "سابیی-مەندەیی",
    subtitle: "ئاوی زیندوو، پاکی، و بەردەوامی",
    tagline: "باوەڕێک کە بە درێژایی کات دەڕوات.",
    cards: [
      {
        title: "مانا",
        icon: BookOpen,
        text: "سابییەکان: ئەوانەن کە خۆیان لە ئاو دەخەن. مەندەییەکان: خاوەنانی زانینن. پێکەوە: ئەوانەی لە زانینی ئیلاهی دەچنە ناو و ڕێگای حەق دەگرنەبەر.",
      },
      {
        title: "پێنج ڕوکن",
        icon: Sparkles,
        text: "یەکتاپەرستی، تەعمید، نوێژ، ڕۆژوو و زەکات. پێغەمبەرەکان: ئادەم، شێث، سامی کوڕی نوح، و یەحیا کوڕی زەکەریا (یوحەنای مەعمەدانکەر).",
      },
      {
        title: "زمانی مەندەیی",
        icon: Languages,
        text: "زمانە دێرینە تایبەتییەکەیانە، شێوەزارێکە لە ئارامی کە نزیکە لە سریانی و عیبری. هەموو ڕێوڕەسمە ئاینییەکان بە زمانی مەندەیی ئەنجام دەدرێن.",
      },
      {
        title: "لە کوردستان",
        icon: Landmark,
        text: "بارەگای کۆمەڵەی کولتووری مەندەیی لە هەولێرە. مافەکانیان بە دەستووری عێراقی 2005 و یاسای ژمارە 5ی ساڵی 2015 پارێزراون.",
      },
    ],
  },
  ar: {
    title: "الصابئة المندائيون",
    subtitle: "الماء الحي والطهارة والاستمرارية",
    tagline: "إيمان يتدفق عبر الزمن.",
    cards: [
      {
        title: "المعنى",
        icon: BookOpen,
        text: "الصابئة: المنغمسون في الماء. والمندائيون: أهل المعرفة. معاً: المنغمسون في المعرفة الإلهية السالكون طريق الحق.",
      },
      {
        title: "الأركان الخمسة",
        icon: Sparkles,
        text: "التوحيد والتعميد والصلاة والصوم والزكاة. والأنبياء: آدم وشيث وسام بن نوح ويحيى بن زكريا (يوحنا المعمدان).",
      },
      {
        title: "اللغة المندائية",
        icon: Languages,
        text: "لغتهم الخاصة العريقة، لهجة من الآرامية قريبة من السريانية والعبرية. وتُؤدَّى جميع الشعائر الدينية باللغة المندائية.",
      },
      {
        title: "في كوردستان",
        icon: Landmark,
        text: "مقر الجمعية الثقافية المندائية في أربيل. وتكفل حقوقهم المادة الثانية من الدستور العراقي 2005 وقانون رقم 5 لسنة 2015.",
      },
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

type SabeanMandaeanismPageProps = {
  lang?: LangCode;
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function SabeanMandaeanismPage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: SabeanMandaeanismPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const dir = lang === "en" ? "ltr" : "rtl";
  const c = content[lang];

  useReligionPageAnimation(
    sectionRef,
    {
      hero: "[data-sabean-hero='true']",
      animate: "[data-sabean-animate='true']",
      controls: "[data-sabean-controls='true']",
    },
    [lang],
  );

  return (
    <main
      dir={dir}
      className="m-0 flex min-h-screen w-screen justify-center bg-[#f8f1e7] p-0 text-[#3d2b18]"
    >
      <section
        ref={sectionRef}
        className="relative min-h-screen w-full overflow-hidden bg-[#fbf1df] px-7 py-9 sm:px-10 lg:px-16"
      >
        <video
          data-sabean-hero="true"
          src={waterVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-[80vh] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]"
        />
        <div className="absolute inset-x-0 top-0 h-[60vh] bg-gradient-to-b from-[#fbf1df]/72 via-[#fbf1df]/30 to-[#f4dfbb]/95" />

        <button
          type="button"
          data-sabean-controls="true"
          onClick={onBack}
          className="absolute left-8 top-8 z-30 grid h-14 w-14 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#5a3a18] shadow-sm"
          aria-label="Back"
        >
          <ArrowLeft className="h-7 w-7" />
        </button>

        <button
          type="button"
          data-sabean-controls="true"
          onClick={onLanguageChange}
          className="absolute right-8 top-8 z-30 flex items-center gap-3 rounded-full border border-[#d9b477] bg-white/75 px-5 py-3 font-serif text-sm font-semibold text-[#4b3219] shadow-[0_8px_20px_rgba(84,54,16,0.15)]"
        >
          <Globe2 className="h-5 w-5" />
          {languageLabel}
        </button>

        <div className="relative z-10 mx-auto max-w-[1120px]">
          <header
            data-sabean-animate="true"
            className="mx-auto max-w-[900px] pt-28 text-center sm:pt-32"
          >
            <div className="mx-auto mb-6 grid h-24 w-24 place-items-center text-[68px] text-[#b9822d]">
              ✥
            </div>

            <div className="mx-auto mb-5 w-[480px] max-w-full">
              <DecorativeLine />
            </div>

            <h1 className="font-serif text-[52px] font-semibold uppercase leading-[1] tracking-[0.12em] text-[#2f1f12] sm:text-[68px] lg:text-[88px]">
              {c.title}
            </h1>

            <p className="mt-4 font-serif text-[26px] font-semibold text-[#7d5a2d] sm:text-[36px]">
              {c.subtitle}
            </p>

            <div className="mx-auto mt-8 w-[210px]">
              <DecorativeLine />
            </div>
          </header>

          <div className="h-[780px]" />

          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {c.cards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  data-sabean-animate="true"
                  className="min-h-[335px] rounded-[24px] border-2 border-[#d8b875]/70 bg-[#fff8e9]/92 px-5 py-7 text-center shadow-[0_12px_28px_rgba(75,45,12,0.18)] backdrop-blur-sm"
                >
                  <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full border-4 border-[#f4dfb7] bg-[#b9822d] text-white shadow-inner">
                    <Icon className="h-10 w-10" strokeWidth={1.7} />
                  </div>

                  <h3 className="font-serif text-[21px] font-semibold uppercase leading-tight text-[#3b2410]">
                    {card.title}
                  </h3>

                  <div className="mx-auto my-4 w-[140px]">
                    <DecorativeLine color="#d1a14f" />
                  </div>

                  <p className="text-[16px] font-semibold leading-relaxed text-[#4d3c2a]">
                    {card.text}
                  </p>
                </article>
              );
            })}
          </section>

          <section
            data-sabean-animate="true"
            className="mx-auto mt-8 flex max-w-[820px] items-center justify-center gap-8 rounded-[26px] border-2 border-[#c99745]/55 bg-[#fff7e7]/95 px-8 py-5 shadow-[0_12px_28px_rgba(75,45,12,0.16)]"
          >
            <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-[#b9822d] text-[42px] text-white">
              <Droplets className="h-10 w-10" />
            </div>

            <p className="font-serif text-[32px] font-semibold leading-tight text-[#3b2410]">
              {c.tagline}
            </p>

            <Sparkles className="h-8 w-8 shrink-0 text-[#c58b16]" />
          </section>

          <div className="mt-8 text-center text-[58px] text-[#b9822d]">✥</div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 h-52 w-52 rounded-tr-full border-r-2 border-t-2 border-[#d2a35a]/30 opacity-70" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-52 w-52 rounded-tl-full border-l-2 border-t-2 border-[#d2a35a]/30 opacity-70" />
      </section>
    </main>
  );
}
