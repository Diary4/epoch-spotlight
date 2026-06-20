import React from "react";
import gsap from "gsap";
import {
  Church,
  Clock,
  Landmark,
  Sparkles,
  UsersRound,
} from "lucide-react";

import bg from "@/assets/images/religions/a-1.webp";
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

type ArmeniansContent = {
  back: string;
  pageTitle: string;
  subtitle: string;
  cards: [CardContent, CardContent, CardContent, CardContent];
  tagline: string;
};

const content: Record<LangCode, ArmeniansContent> = {
  en: {
    back: "Back",
    pageTitle: "ARMENIANS",
    subtitle: "A century of belonging in Kurdistan",
    cards: [
      {
        title: "HISTORY",
        icon: Clock,
        text: "Armenians arrived in Kurdistan following the 1915 genocide, finding refuge in a land that became their home across generations.",
      },
      {
        title: "CHURCHES",
        icon: Church,
        text: "The Armenian Diocese oversees 14 churches, 5 of which are in the Kurdistan Region including Holy Cross Church in Erbil inaugurated in 2019.",
      },
      {
        title: "COMMUNITY",
        icon: UsersRound,
        text: "Currently approximately 3,500–4,000 Armenians live in the Kurdistan Region. The Armenian Cultural and Social Association is active in Erbil.",
      },
      {
        title: "1 PARLIAMENT SEAT",
        icon: Landmark,
        text: "The Armenian community holds a reserved seat in the Kurdistan Parliament, ensuring their voice in public life.",
      },
    ],
    tagline: "A community of memory, resilience, and belonging.",
  },
  ku: {
    back: "گەڕانەوە",
    pageTitle: "ئەرمەن",
    subtitle: "سەدەیەک لە سۆز و پەیوەستبوون لە کوردستان",
    cards: [
      {
        title: "مێژوو",
        icon: Clock,
        text: "ئەرمەنەکان دوای کۆمەڵکوژیی ١٩١٥ ڕوویان لە کوردستان کرد و لێرە پەناگەیان دۆزییەوە و بە تێپەڕبوونی چەند نەوەیەک بوو بە نیشتمانیان.",
      },
      {
        title: "کەنیسەکان",
        icon: Church,
        text: "ئەپەرشیەی ئەرمەنی سەرپەرشتی ١٤ کەنیسە دەکات، ٥یان لە هەرێمی کوردستانن، لەوانە کەنیسەی خاچی پیرۆز لە هەولێر کە ساڵی ٢٠١٩ کرایەوە.",
      },
      {
        title: "کۆمەڵگە",
        icon: UsersRound,
        text: "ئێستا نزیکەی ٣٥٠٠ بۆ ٤٠٠٠ ئەرمەنی لە هەرێم دەژین. کۆمەڵەی کلتووری و کۆمەڵایەتی ئەرمەنی لە هەولێر زۆر چالاکە.",
      },
      {
        title: "کورسییەکی پەرلەمان",
        icon: Landmark,
        text: "پێکهاتەی ئەرمەن خاوەنی یەک کورسی کۆتایە لە پەرلەمان، ئەمەش بۆ دڵنیابوون لە نوێنەرایەتیکردنیان.",
      },
    ],
    tagline: "کۆمەڵگەیەک بۆ یادەوەری، خۆڕاگری و دڵسۆزی.",
  },
  ar: {
    back: "العودة",
    pageTitle: "الأرمن",
    subtitle: "قرنٌ من الانتماء في كوردستان",
    cards: [
      {
        title: "التاريخ",
        icon: Clock,
        text: "وصل الأرمن إلى كوردستان إثر إبادة ١٩١٥، فوجدوا فيها ملاذاً صار بمرور الأجيال وطناً لهم.",
      },
      {
        title: "الكنائس",
        icon: Church,
        text: "تشرف الأبرشية الأرمنية على ١٤ كنيسة، خمسٌ منها في إقليم كوردستان، ومنها كنيسة الصليب المقدس في أربيل التي افتُتحت عام ٢٠١٩.",
      },
      {
        title: "المجتمع",
        icon: UsersRound,
        text: "يعيش حالياً نحو ٣٥٠٠ إلى ٤٠٠٠ أرمني في إقليم كوردستان، والجمعية الثقافية والاجتماعية الأرمنية ناشطة في أربيل.",
      },
      {
        title: "مقعد برلماني",
        icon: Landmark,
        text: "يحتفظ مكوّن الأرمن بمقعد مخصص في برلمان كوردستان لضمان تمثيلهم في الحياة العامة.",
      },
    ],
    tagline: "مجتمعٌ للذاكرة والصمود والانتماء.",
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

type ArmeniansPageProps = {
  lang?: LangCode;
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function ArmeniansPage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: ArmeniansPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const c = content[lang];
  const dir = lang === "en" ? "ltr" : "rtl";

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-armenians-hero='true']", {
        autoAlpha: 0,
        scale: 1.04,
      });

      gsap.set("[data-armenians-animate='true']", {
        autoAlpha: 0,
        y: 24,
      });

      const tl = gsap.timeline();

      tl.to("[data-armenians-hero='true']", {
        autoAlpha: 1,
        scale: 1,
        duration: 0.9,
        ease: "power2.out",
      }).to(
        "[data-armenians-animate='true']",
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
          heroAttr="data-armenians-hero"
          src={bg}
          desktopClassName="absolute inset-0 h-[60vh] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]"
        >
          <div className="absolute inset-x-0 top-0 hidden h-[60vh] bg-gradient-to-b from-[#faf8f5]/72 via-[#faf8f5]/30 to-[#faf8f5]/95 sm:block" />
        </FaithDetailHeroImage>

        <FaithDetailControls
          controlsAttr="data-armenians-controls"
          backLabel={c.back}
          onBack={onBack}
          onLanguageChange={onLanguageChange}
          languageLabel={languageLabel}
        />

        <div className={`relative z-10 mx-auto max-w-[1120px] ${FAITH_CONTENT_PADDING}`}>
          <header
            data-armenians-animate="true"
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
            data-armenians-animate="true"
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

          <section data-armenians-animate="true" className={FAITH_TAGLINE_SECTION_CLASS}>
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
