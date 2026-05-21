import React from "react";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Globe2,
  Landmark,
  Sparkles,
  Star,
  UsersRound,
} from "lucide-react";

import bg from "@/assets/images/religions/r-5.webp";
import { useReligionPageAnimation } from "@/components/Sections/religions/useReligionPageAnimation";

type LangCode = "en" | "ku" | "ar";

const content: Record<
  LangCode,
  {
    title: string;
    subtitle: string;
    tagline: string;
    cards: { title: string; icon: typeof UsersRound; text: string }[];
  }
> = {
  en: {
    title: "Judaism",
    subtitle: "Memory, heritage, and continuity",
    tagline: "Rooted in memory and respect.",
    cards: [
      {
        title: "Kurdish Jews",
        icon: UsersRound,
        text: "Ancient Eastern community historically residing in northern Mesopotamia. When Cyrus allowed them to return to Jerusalem after Babylonian exile, most chose to remain in Kurdistan.",
      },
      {
        title: "Torah",
        icon: BookOpen,
        text: "Judaism's sacred text consists of five books: Genesis, Exodus, Leviticus, Numbers, and Deuteronomy. Other important texts include the Talmud, Tanakh, Midrash, and Mishnah.",
      },
      {
        title: "Nahum Shrine",
        icon: Landmark,
        text: "The Shrine of the Prophet Nahum in Alqosh — a historically significant Jewish sacred site in the Kurdistan Region.",
      },
      {
        title: "Heritage",
        icon: Clock,
        text: "Kurdistan's Jewish history spans over 2,500 years. Jewish traveler Benjamin of Tudela estimated 25,000 Jews in Amadiya alone in the 12th century.",
      },
    ],
  },
  ku: {
    title: "جوولەکەیی",
    subtitle: "یادەوەری و میرات و بەردەوامی",
    tagline: "ڕەگداکوتاو لە یادەوەری و ڕێز.",
    cards: [
      {
        title: "جوولەکەکانی کوردستان",
        icon: UsersRound,
        text: "کۆمەڵگایەکی ڕۆژهەڵاتی دێرین بوون کە مێژوویان لە باکووری میزۆپۆتامیا بووە. کاتێک کورش ڕێگەی دا دوای دیلی بابلی بگەڕێنەوە بۆ قودس، زۆربەیان مانەوە لە کوردستان هەڵبژارد.",
      },
      {
        title: "تەورات",
        icon: BookOpen,
        text: "کتێبی پیرۆزی جوولەکەیی پێنج سێفری لەخۆ دەگرێت: پیدابوون، دەرچوون، لاویان، ژمارەکان و دووبارەکردنەوەی یاسا. تێکستە گرنگەکانی تر بریتین لە تەلمود، تەناخ، میدراش و میشنا.",
      },
      {
        title: "مەزاری پێغەمبەر ناحوم",
        icon: Landmark,
        text: "مەزاری پێغەمبەر ناحوم لە ئەلقۆش شوێنێکی پیرۆزی جوولەکەییە و گرنگییەکی مێژوویی زۆری لە هەرێمی کوردستان هەیە.",
      },
      {
        title: "میرات",
        icon: Clock,
        text: "مێژووی جوولەکەکان لە کوردستان زیاتر لە 2,500 ساڵ دەبێت. گەشتیاری جوولەکە بنیامین تودێلایی لە سەدەی دوازدەهەمدا ژمارەی جوولەکەکانی ئامێدی بە تەنها بە 25,000 کەس مەزندە کردووە.",
      },
    ],
  },
  ar: {
    title: "اليهودية",
    subtitle: "الذاكرة والتراث والاستمرارية",
    tagline: "متجذرون في الذاكرة والاحترام.",
    cards: [
      {
        title: "يهود كوردستان",
        icon: UsersRound,
        text: "مجتمع شرقي عريق أقام تاريخياً في شمال بلاد الرافدين. حين أذن لهم كورش بالعودة إلى القدس بعد السبي البابلي، اختار معظمهم البقاء في كوردستان.",
      },
      {
        title: "التوراة",
        icon: BookOpen,
        text: "الكتاب المقدس لليهودية يتضمن خمسة أسفار: التكوين والخروج واللاويين والعدد والتثنية. وثمة نصوص مهمة أخرى كالتلمود والتناخ والميدراش والمشناه.",
      },
      {
        title: "ضريح النبي ناحوم",
        icon: Landmark,
        text: "ضريح النبي ناحوم في ألقوش — موقع يهودي مقدس بالغ الأهمية التاريخية في إقليم كوردستان.",
      },
      {
        title: "التراث",
        icon: Clock,
        text: "يمتد التاريخ اليهودي في كوردستان أكثر من 2,500 عام. وقدّر الرحالة اليهودي بنيامين التطيلي عدد يهود عمادية وحدها بـ25,000 نسمة في القرن الثاني عشر.",
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

type JudaismPageProps = {
  lang?: LangCode;
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function JudaismPage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: JudaismPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const dir = lang === "en" ? "ltr" : "rtl";
  const c = content[lang];

  useReligionPageAnimation(
    sectionRef,
    {
      hero: "[data-judaism-hero='true']",
      animate: "[data-judaism-animate='true']",
      controls: "[data-judaism-controls='true']",
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
        <img
          data-judaism-hero="true"
          src={bg}
          alt=""
          className="absolute inset-0 h-[60vh] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]"
        />
        <div className="absolute inset-x-0 top-0 h-[60vh] bg-gradient-to-b from-[#fbf1df]/72 via-[#fbf1df]/30 to-[#f4dfbb]/95" />
        <div className="pointer-events-none absolute inset-5 rounded-[30px] border-2 border-[#d2a35a]/45" />

        <button
          type="button"
          data-judaism-controls="true"
          onClick={onBack}
          className="absolute left-8 top-8 z-30 grid h-14 w-14 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#5a3a18] shadow-sm"
          aria-label="Back"
        >
          <ArrowLeft className="h-7 w-7" />
        </button>

        <button
          type="button"
          data-judaism-controls="true"
          onClick={onLanguageChange}
          className="absolute right-8 top-8 z-30 flex items-center gap-3 rounded-full border border-[#d9b477] bg-white/75 px-5 py-3 font-serif text-sm font-semibold text-[#4b3219] shadow-[0_8px_20px_rgba(84,54,16,0.15)]"
        >
          <Globe2 className="h-5 w-5" />
          {languageLabel}
        </button>

        <div className="relative z-10 mx-auto max-w-[1120px]">
          <header
            data-judaism-animate="true"
            className="mx-auto max-w-[900px] pt-28 text-center sm:pt-32"
          >
            <div className="mx-auto mb-6 grid h-24 w-24 place-items-center text-[68px] text-[#b9822d]">
              ✥
            </div>

            <div className="mx-auto mb-5 w-[480px] max-w-full">
              <DecorativeLine />
            </div>

            <h1 className="font-serif text-[72px] font-semibold uppercase leading-[1] tracking-[0.16em] text-[#2f1f12] sm:text-[94px] lg:text-[118px]">
              {c.title}
            </h1>

            <p className="mt-4 font-serif text-[29px] font-semibold text-[#7d5a2d] sm:text-[40px]">
              {c.subtitle}
            </p>

            <div className="mx-auto mt-8 w-[210px]">
              <DecorativeLine />
            </div>
          </header>

          <div className="h-[480px]" />

          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {c.cards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  data-judaism-animate="true"
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
            data-judaism-animate="true"
            className="mx-auto mt-8 flex max-w-[820px] items-center justify-center gap-8 rounded-[26px] border-2 border-[#c99745]/55 bg-[#fff7e7]/95 px-8 py-5 shadow-[0_12px_28px_rgba(75,45,12,0.16)]"
          >
            <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-[#b9822d] text-[42px] text-white">
              <Star className="h-10 w-10" />
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
