import React from "react";
import gsap from "gsap";
import {
  GraduationCap,
  Landmark,
  Languages,
  Music,
  Sparkles,
} from "lucide-react";

import bg from "@/assets/images/religions/turkmen.webp";
import {
  FAITH_CONTENT_PADDING,
  FAITH_ICON_CARD_CLASS,
  FAITH_ICON_CARD_ICON_CLASS,
  FAITH_ICON_CARD_ICON_WRAP_CLASS,
  FAITH_MAIN_CLASS,
  FAITH_SECTION_CLASS,
  FAITH_TAGLINE_ICON_WRAP_CLASS,
  FAITH_TAGLINE_SECTION_CLASS,
  FAITH_TAGLINE_TEXT_CLASS,
  FaithDetailControls,
  FaithDetailHeroImage,
  FaithDetailSpacer,
} from "@/components/Sections/religions/faithDetailLayout";

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
    <main dir={dir} className={FAITH_MAIN_CLASS}>
      <section ref={sectionRef} className={FAITH_SECTION_CLASS}>
        <FaithDetailHeroImage
          heroAttr="data-turkmens-hero"
          src={bg}
          desktopClassName="absolute inset-0 h-[60vh] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]"
        >
          <div className="absolute inset-x-0 top-0 hidden h-[60vh] bg-gradient-to-b from-[#faf8f5]/72 via-[#faf8f5]/30 to-[#faf8f5]/95 sm:block" />
        </FaithDetailHeroImage>

        <FaithDetailControls
          controlsAttr="data-turkmens-controls"
          backLabel={c.back}
          onBack={onBack}
          onLanguageChange={onLanguageChange}
          languageLabel={languageLabel}
        />

        <div className={`relative z-10 mx-auto max-w-[1120px] ${FAITH_CONTENT_PADDING}`}>
          <header
            data-turkmens-animate="true"
            className="mx-auto max-w-[900px] pt-4 text-center sm:pt-28 lg:pt-32"
          >
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center text-[48px] text-[#b9822d] sm:mb-6 sm:h-24 sm:w-24 sm:text-[68px]">
              ✥
            </div>

            <div className="mx-auto mb-4 w-[480px] max-w-full sm:mb-5">
              <DecorativeLine />
            </div>

            <h1 className="whitespace-nowrap font-serif text-[clamp(28px,8.5vw,118px)] font-semibold uppercase leading-[1] tracking-[0.12em] text-[#2f1f12] sm:text-[94px] sm:tracking-[0.16em] lg:text-[118px]">
              {c.pageTitle}
            </h1>

            <p className="mt-3 font-serif text-[clamp(20px,5vw,40px)] font-semibold text-[#7d5a2d] sm:mt-4 sm:text-[40px]">
              {c.subtitle}
            </p>

            <div className="mx-auto mt-5 w-[210px] max-w-full sm:mt-8">
              <DecorativeLine />
            </div>
          </header>

          <FaithDetailSpacer desktopHeight="h-[820px]" />

          <section
            data-turkmens-animate="true"
            className="mt-10 grid grid-cols-1 gap-4 sm:mt-0 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
          >
            {c.cards.map((card) => {
              const Icon = card.icon;

              return (
                <article key={card.title} className={FAITH_ICON_CARD_CLASS}>
                  <div className={FAITH_ICON_CARD_ICON_WRAP_CLASS}>
                    <Icon className={FAITH_ICON_CARD_ICON_CLASS} strokeWidth={1.7} />
                  </div>

                  <h3 className="font-serif text-[19px] font-semibold uppercase leading-tight text-[#3b2410] sm:text-[21px]">
                    {card.title}
                  </h3>

                  <div className="mx-auto my-3 w-[140px] sm:my-4">
                    <DecorativeLine color="#d1a14f" />
                  </div>

                  <p className="text-[15px] font-semibold leading-relaxed text-[#4d3c2a] sm:text-[16px]">
                    {card.text}
                  </p>
                </article>
              );
            })}
          </section>

          <section data-turkmens-animate="true" className={FAITH_TAGLINE_SECTION_CLASS}>
            <div className={`${FAITH_TAGLINE_ICON_WRAP_CLASS} text-[32px] sm:text-[42px]`}>
              ✺
            </div>

            <p className={FAITH_TAGLINE_TEXT_CLASS}>{c.tagline}</p>

            <Sparkles className="h-7 w-7 shrink-0 text-[#c58b16] sm:h-8 sm:w-8" />
          </section>

          <div className="mt-6 text-center text-[40px] text-[#b9822d] sm:mt-8 sm:text-[58px]">✥</div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 hidden h-52 w-52 rounded-tr-full border-r-2 border-t-2 border-[#d2a35a]/30 opacity-70 sm:block" />
        <div className="pointer-events-none absolute bottom-0 right-0 hidden h-52 w-52 rounded-tl-full border-l-2 border-t-2 border-[#d2a35a]/30 opacity-70 sm:block" />
      </section>
    </main>
  );
}
