import React from "react";
import gsap from "gsap";
import {
  Languages,
  Flame,
  Music,
  Landmark,
  Sparkles,
} from "lucide-react";

import bg from "@/assets/mainImages/whoarekurds.webp";
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
      className={FAITH_MAIN_CLASS}
    >
      <section ref={sectionRef} className={FAITH_SECTION_CLASS}>
        <FaithDetailHeroImage
          heroAttr="data-kurds-hero"
          src={bg}
          desktopClassName="absolute inset-0 h-[60vh] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]"
        >
          <div className="absolute inset-x-0 top-0 hidden h-[60vh] bg-gradient-to-b from-[#fbf1df]/72 via-[#fbf1df]/30 to-[#f4dfbb]/95 sm:block" />
        </FaithDetailHeroImage>

        <FaithDetailControls
          controlsAttr="data-kurds-controls"
          backLabel={c.back}
          onBack={onBack}
          onLanguageChange={onLanguageChange}
          languageLabel={languageLabel}
        />

        <div className={`relative z-10 mx-auto max-w-[1120px] ${FAITH_CONTENT_PADDING}`}>
          <header
            data-kurds-animate="true"
            className="mx-auto max-w-[900px] pt-4 text-center sm:pt-28 lg:pt-32"
          >
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center text-[48px] text-[#b9822d] sm:mb-6 sm:h-24 sm:w-24 sm:text-[68px]">
              ✥
            </div>

            <div className="mx-auto mb-4 w-[480px] max-w-full sm:mb-5">
              <DecorativeLine />
            </div>

            <h1 className="break-words font-serif text-[clamp(36px,10vw,118px)] font-semibold uppercase leading-[1] tracking-[0.16em] text-[#2f1f12] sm:text-[94px] lg:text-[118px]">
              {c.pageTitle}
            </h1>

            <p className="mt-3 font-serif text-[clamp(20px,5vw,40px)] font-semibold text-[#7d5a2d] sm:mt-4 sm:text-[40px]">
              {c.subtitle}
            </p>

            <div className="mx-auto mt-5 w-[210px] max-w-full sm:mt-8">
              <DecorativeLine />
            </div>
          </header>

          <FaithDetailSpacer desktopHeight="h-[500px]" />

          <section
            data-kurds-animate="true"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
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

          <section data-kurds-animate="true" className={FAITH_TAGLINE_SECTION_CLASS}>
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
