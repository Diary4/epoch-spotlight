import React from "react";
import gsap from "gsap";
import {
  ArrowLeft,
  GraduationCap,
  Globe2,
  Landmark,
  Languages,
  Music,
  Sparkles,
} from "lucide-react";

import bg from "@/assets/images/religions/r-3.png";

type LangCode = "en" | "ku" | "ar";

type CardContent = {
  title: string;
  text: string;
  icon: typeof Landmark;
};

type TurkmensContent = {
  back: string;
  pageTitle: string;
  subtitle: string;
  cards: [CardContent, CardContent, CardContent, CardContent];
  tagline: string;
};

const content: Record<LangCode, TurkmensContent> = {
  en: {
    back: "Back",
    pageTitle: "TURKMENS",
    subtitle: "Language, heritage, and community life",
    cards: [
      {
        title: "5 PARLIAMENT SEATS",
        icon: Landmark,
        text: "Turkmens hold 5 reserved seats in the Kurdistan Parliament under the 2005 amendment — equal to the Chaldo-Assyrian allocation.",
      },
      {
        title: "OFFICIAL LANGUAGE",
        icon: Languages,
        text: "Turkmen is recognized as an official language in areas where Turkmens form the majority under Official Languages Law No. 6 of 2014.",
      },
      {
        title: "CULTURE & ARTS",
        icon: Music,
        text: "The Ministry of Culture established a dedicated General Directorate for Turkmen Culture and Arts. Turkmen Language and Culture Day is celebrated on November 17 each year.",
      },
      {
        title: "EDUCATION",
        icon: GraduationCap,
        text: "A General Directorate for Turkmen Education ensures Turkmen children receive education in their mother tongue across the Kurdistan Region.",
      },
    ],
    tagline: "Different roots. One homeland.",
  },
  ku: {
    back: "گەڕانەوە",
    pageTitle: "تورکمان",
    subtitle: "زمان، کەلەپوور و ژیانی کۆمەاڵیەتی",
    cards: [
      {
        title: "٥ کورسی پەرلەمان",
        icon: Landmark,
        text: "تورکمانەکان خاوەنی ٥ کورسی کۆتان لە پەرلەمانی کوردستان بەپێی هەموارکردنەوەی ٢٠٠٥، یەکسان بە بەشی کلدان و ئاشورییەکان.",
      },
      {
        title: "زمانی فەرمی",
        icon: Languages,
        text: "زمانی تورکمانی وەک زمانێکی فەرمی لەو ناوچانەی زۆرینەی تورکمانن دەناسرێت بەپێی یاسای زمانە فەرمییەکان ژمارە ٦ی ساڵی ٢٠١٤.",
      },
      {
        title: "کلتوور و هونەر",
        icon: Music,
        text: "وەزارەتی ڕۆشنبیری بەڕێوەبەرایەتییەکی گشتی تایبەتی بۆ کلتوور و هونەری تورکمانی دامەزراندووە. ١٧ی تشرینی دووەمی هەموو ساڵێک ڕۆژی زمان و کلتووری تورکمانییە.",
      },
      {
        title: "پەروەردە",
        icon: GraduationCap,
        text: "بەڕێوەبەرایەتی گشتی خوێندنی تورکمانی دڵنیایی دەدات کە مندااڵنی تورکمان بە زمانی دایکی خۆیان لە هەرێم دەخوێنن.",
      },
    ],
    tagline: "ڕەگی جیاواز. یەک نیشتمان.",
  },
  ar: {
    back: "العودة",
    pageTitle: "التركمان",
    subtitle: "اللغة والتراث وحياة المجتمع",
    cards: [
      {
        title: "٥ مقاعد برلمانية",
        icon: Landmark,
        text: "يحتل التركمان ٥ مقاعد مخصصة في برلمان كوردستان بموجب تعديل ٢٠٠٥ — مساوياً لحصة الكلدو آشوريين.",
      },
      {
        title: "لغة رسمية",
        icon: Languages,
        text: "تُعترف باللغة التركمانية لغةً رسميةً في المناطق ذات الغالبية التركمانية بموجب قانون اللغات الرسمية رقم ٦ لسنة ٢٠١٤.",
      },
      {
        title: "الثقافة والفنون",
        icon: Music,
        text: "أسست وزارة الثقافة مديريةً عامةً مخصصةً للثقافة والفنون التركمانية. ويُحتفل بيوم اللغة والثقافة التركمانية في ١٧ نوفمبر من كل عام.",
      },
      {
        title: "التعليم",
        icon: GraduationCap,
        text: "تضمن المديرية العامة للتربية التركمانية تلقّي أبناء التركمان تعليمهم بلغتهم الأم في مختلف أنحاء إقليم كوردستان.",
      },
    ],
    tagline: "جذور مختلفة. وطن واحد.",
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

type TurkmensPageProps = {
  lang?: LangCode;
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function TurkmensPage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: TurkmensPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const c = content[lang];
  const dir = lang === "en" ? "ltr" : "rtl";

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-turkmens-hero='true']", {
        autoAlpha: 0,
        scale: 1.04,
      });

      gsap.set("[data-turkmens-animate='true']", {
        autoAlpha: 0,
        y: 24,
      });

      const tl = gsap.timeline();

      tl.to("[data-turkmens-hero='true']", {
        autoAlpha: 1,
        scale: 1,
        duration: 0.9,
        ease: "power2.out",
      }).to(
        "[data-turkmens-animate='true']",
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
      className="m-0 flex min-h-screen w-screen justify-center bg-[#f8f1e7] p-0 text-[#3d2b18]"
    >
      <section
        ref={sectionRef}
        className="relative min-h-screen w-full overflow-hidden bg-[#fbf1df] px-7 py-9 sm:px-10 lg:px-16"
      >
        <img
          data-turkmens-hero="true"
          src={bg}
          alt=""
          className="absolute inset-0 h-[60vh] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]"
        />
        <div className="absolute inset-x-0 top-0 h-[60vh] bg-gradient-to-b from-[#fbf1df]/72 via-[#fbf1df]/30 to-[#f4dfbb]/95" />
        <div className="pointer-events-none absolute inset-5 rounded-[30px] border-2 border-[#d2a35a]/45" />

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

        <div className="relative z-10 mx-auto max-w-[1120px]">
          <header
            data-turkmens-animate="true"
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
            data-turkmens-animate="true"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {c.cards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
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
            data-turkmens-animate="true"
            className="mx-auto mt-8 flex max-w-[820px] items-center justify-center gap-8 rounded-[26px] border-2 border-[#c99745]/55 bg-[#fff7e7]/95 px-8 py-5 shadow-[0_12px_28px_rgba(75,45,12,0.16)]"
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
