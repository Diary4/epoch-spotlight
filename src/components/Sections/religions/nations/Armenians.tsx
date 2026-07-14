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
  FaithDetailCard,
  FAITH_CONTENT_PADDING,
  FAITH_TAGLINE_ICON_WRAP_CLASS,
  FAITH_TAGLINE_SECTION_CLASS,
  FAITH_TAGLINE_TEXT_CLASS,
  FaithDetailControls,
  FaithDetailHeroImage,
  FaithDetailPageShell,
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
    <FaithDetailPageShell dir={dir} lang={lang} fitDeps={[lang]} sectionRef={sectionRef}>
        <FaithDetailHeroImage
          heroAttr="data-armenians-hero"
          src={bg}
        />

        <FaithDetailControls
          controlsAttr="data-armenians-controls"
          backLabel={c.back}
          dir={dir}
          onBack={onBack}
          onLanguageChange={onLanguageChange}
          languageLabel={languageLabel}
        />

        <div className={`relative z-10 mx-auto max-w-[1120px] ${FAITH_CONTENT_PADDING}`}>
          <header
            data-armenians-animate="true"
            className="mx-auto max-w-[900px] pt-32 text-center"
          >
            <div className="mx-auto mb-6 grid h-24 w-24 place-items-center text-[68px] text-[#b9822d]">
              ✥
            </div>

            <div className="mx-auto mb-5 w-[480px] max-w-full">
              <DecorativeLine />
            </div>

            <h1 className="whitespace-nowrap font-serif text-[118px] font-semibold uppercase leading-[1] tracking-[0.16em] text-[#2f1f12]">
              {c.pageTitle}
            </h1>

            <p className="mt-4 font-serif text-[40px] font-semibold text-[#7d5a2d]">
              {c.subtitle}
            </p>

            <div className="mx-auto mt-8 w-[210px] max-w-full">
              <DecorativeLine />
            </div>
          </header>

          <FaithDetailSpacer desktopHeight="h-[280px]" />

          <section
            data-armenians-animate="true"
            className="mt-0 grid grid-cols-4 gap-6"
          >
            {c.cards.map((card, index) => (
              <FaithDetailCard
                key={card.title}
                title={card.title}
                text={card.text}
                image={bg}
                index={index}
                animateAttr="data-armenians-animate"
              />
            ))}
          </section>

          <section data-armenians-animate="true" className={FAITH_TAGLINE_SECTION_CLASS}>
            <div className={`${FAITH_TAGLINE_ICON_WRAP_CLASS} text-[42px]`}>
              ✺
            </div>

            <p className={FAITH_TAGLINE_TEXT_CLASS}>{c.tagline}</p>

            <Sparkles className="h-8 w-8 shrink-0 text-[#c58b16]" />
          </section>

          <div className="mt-8 text-center text-[58px] text-[#b9822d]">✥</div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 h-52 w-52 rounded-tr-full border-r-2 border-t-2 border-[#d2a35a]/30 opacity-70" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-52 w-52 rounded-tl-full border-l-2 border-t-2 border-[#d2a35a]/30 opacity-70" />
    </FaithDetailPageShell>
  );
}
