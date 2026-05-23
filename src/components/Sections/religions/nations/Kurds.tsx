import React from "react";
import gsap from "gsap";
import {
  ArrowLeft,
  Globe2,
  Languages,
  Flame,
  Music,
  Landmark,
  Sparkles,
} from "lucide-react";

import bg from "@/assets/mainImages/whoarekurds.webp";

type LangCode = "en" | "ku" | "ar";

type CardContent = {
  title: string;
  text: string;
  icon: typeof Landmark;
};

type KurdsContent = {
  back: string;
  pageTitle: string;
  subtitle: string;
  cards: [CardContent, CardContent, CardContent, CardContent];
  tagline: string;
};

const content: Record<LangCode, KurdsContent> = {
  en: {
    back: "Back",
    pageTitle: "KURDS",
    subtitle: "Language, heritage, and living identity",
    cards: [
      {
        title: "LANGUAGE",
        icon: Languages,
        text: "Sorani and Kurmanji are the two main Kurdish dialects. Both are official languages of the Kurdistan Region alongside Arabic.",
      },
      {
        title: "NEWROZ",
        icon: Flame,
        text: "The Kurdish New Year celebrated on March 21 with fire and renewal. One of the most celebrated cultural events of the year with ancient Zoroastrian roots.",
      },
      {
        title: "CULTURE",
        icon: Music,
        text: "Traditional dress, the Halparke dance, poetry, and hospitality define Kurdish cultural identity. Sufi orders shaped Kurdish society and spirituality for centuries.",
      },
      {
        title: "CITIES",
        icon: Landmark,
        text: "Erbil, Duhok, and Sulaymaniyah are the three governorates and cultural hearts of the Kurdistan Region.",
      },
    ],
    tagline: "Rooted in heritage. Building the future.",
  },
  ku: {
    back: "گەڕانەوە",
    pageTitle: "کورد",
    subtitle: "زمان، کەلەپوور و ناسنامەیەکی زیندوو",
    cards: [
      {
        title: "زمان",
        icon: Languages,
        text: "سۆرانی و بادینی هەردووکیان دوو شێوەزاری سەرەکین لە هەرێمی کوردستان.",
      },
      {
        title: "نەورۆز",
        icon: Flame,
        text: "جەژنی سەرکەوتن و نوێبوونەوەیە، لوتکەی شکۆی نەتەوەیی کورد و دەسپێکی ساڵی نوێیە لە ٢١ی ئازاردا. ئەم یادە مێژووییە بە داگیرساندنی مەشخەڵی ئاگر و جلی ڕەنگینی کوردی، گوزارشت لە ڕەسەنایەتی و ئاشتیخوازیی ئەم گەلە دەکات.",
      },
      {
        title: "کلتوور",
        icon: Music,
        text: "جلوبەرگی ڕەسەن، هەڵپەڕکێ، شیعر و میواندۆستی ناسنامەی نەتەوەی کوردن. ئەم میراتە دەوڵەمەندە ڕۆحییە، بە درێژایی سەدەکان کۆمەڵگەی کوردی بونیاد ناوە و وەک سیمبولی شکۆ و ڕەسەنایەتی ماوەتەوە.",
      },
      {
        title: "پارێزگاکان",
        icon: Landmark,
        text: "سێ پارێزگا سەرەکییەکانی هەرێمی کوردستان: هەولێر، دهۆک و سلێمانی.",
      },
    ],
    tagline: "ڕەگ داکوتاو لە مێژوو، بنیادنەری داهاتوو.",
  },
  ar: {
    back: "العودة",
    pageTitle: "الكورد",
    subtitle: "اللغة، التراث، وهوية حيّة",
    cards: [
      {
        title: "اللغة",
        icon: Languages,
        text: "السورانية والكرمانجية هما اللهجتان الرئيسيتان في إقليم كوردستان.",
      },
      {
        title: "نوروز",
        icon: Flame,
        text: "عيد النصر والتجدد، وذروة المجد القومي الكوردي وبداية السنة الجديدة في ٢١ آذار. تُجسَّد هذه الذكرى التاريخية بإيقاد المشاعل وارتداء الزي الكوردي الزاهي، تعبيراً عن أصالة هذا الشعب ومحبته للسلام.",
      },
      {
        title: "الثقافة",
        icon: Music,
        text: "الزي التقليدي ورقصة الهلپَركێ والشعر وحُسن الضيافة من معالم الهوية القومية الكوردية. هذا الإرث الروحي الغني صاغ المجتمع الكوردي عبر القرون وبقي رمزاً للمجد والأصالة.",
      },
      {
        title: "المحافظات",
        icon: Landmark,
        text: "محافظات إقليم كوردستان الرئيسية الثلاث: أربيل، دهوك، والسليمانية.",
      },
    ],
    tagline: "جذور راسخة في التاريخ، وبناء للمستقبل.",
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

type KurdsPageProps = {
  lang?: LangCode;
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function KurdsPage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: KurdsPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const c = content[lang];
  const dir = lang === "en" ? "ltr" : "rtl";
  const fontStyle =
    lang === "ar"
      ? { fontFamily: "'Almarai', 'Oxygen', sans-serif" }
      : undefined;

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-kurds-hero='true']", {
        autoAlpha: 0,
        scale: 1.04,
      });

      gsap.set("[data-kurds-animate='true']", {
        autoAlpha: 0,
        y: 24,
      });

      const tl = gsap.timeline();

      tl.to("[data-kurds-hero='true']", {
        autoAlpha: 1,
        scale: 1,
        duration: 0.9,
        ease: "power2.out",
      }).to(
        "[data-kurds-animate='true']",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.25",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <main
      dir={dir}
      style={fontStyle}
      className="m-0 flex min-h-screen w-screen justify-center bg-[#f8f1e7] p-0 text-[#3d2b18]"
    >
      <section
        ref={sectionRef}
        className="relative min-h-screen w-full overflow-hidden bg-[#fbf1df] px-7 py-9 sm:px-10 lg:px-16"
      >
        <img
          data-kurds-hero="true"
          src={bg}
          alt=""
          className="absolute inset-0 h-[60vh] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]"
        />
        <div className="absolute inset-x-0 top-0 h-[60vh] bg-gradient-to-b from-[#fbf1df]/72 via-[#fbf1df]/30 to-[#f4dfbb]/95" />

        <button
          type="button"
          onClick={onBack}
          className="absolute left-8 top-8 z-30 grid h-14 w-14 place-items-center rounded-full border-2 border-[#d9b477] bg-white text-[#5a3a18] shadow-sm"
          aria-label={c.back}
        >
          <ArrowLeft className="h-7 w-7" />
        </button>

        <button
          type="button"
          onClick={onLanguageChange}
          className="absolute right-8 top-8 z-30 flex items-center gap-3 rounded-full border border-[#d9b477] bg-white px-5 py-3 font-serif text-sm font-semibold text-[#4b3219] shadow-[0_8px_20px_rgba(84,54,16,0.15)]"
        >
          <Globe2 className="h-5 w-5" />
          {languageLabel}
        </button>

        <div className="relative z-10 mx-auto max-w-[1120px]">
          <header
            data-kurds-animate="true"
            className="mx-auto max-w-[900px] pt-28 text-center sm:pt-32"
          >
            <div className="mx-auto mb-6 grid h-24 w-24 place-items-center text-[68px] text-[#b9822d]">
              ✥
            </div>

            <div className="mx-auto mb-5 w-[480px] max-w-full">
              <DecorativeLine />
            </div>

            <h1 className="font-serif text-[72px] font-semibold uppercase leading-[1] tracking-[0.16em] text-[#2f1f12] sm:text-[94px] lg:text-[118px]">
              {c.pageTitle}
            </h1>

            <p className="mt-4 font-serif text-[29px] font-semibold text-[#7d5a2d] sm:text-[40px]">
              {c.subtitle}
            </p>

            <div className="mx-auto mt-8 w-[210px]">
              <DecorativeLine />
            </div>
          </header>

          <div className="h-[500px]" />

          <section
            data-kurds-animate="true"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {c.cards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  className="min-h-[335px] rounded-[24px] border-2 border-[#d8b875]/70 bg-[#fff8e9] px-5 py-7 text-center shadow-[0_12px_28px_rgba(75,45,12,0.18)]"
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
            data-kurds-animate="true"
            className="mx-auto mt-8 flex max-w-[820px] items-center justify-center gap-8 rounded-[26px] border-2 border-[#c99745]/55 bg-[#fff7e7] px-8 py-5 shadow-[0_12px_28px_rgba(75,45,12,0.16)]"
          >
            <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-[#b9822d] text-[42px] text-white">
              ✺
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
