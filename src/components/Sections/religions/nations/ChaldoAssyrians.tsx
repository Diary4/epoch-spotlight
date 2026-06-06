import React from "react";
import gsap from "gsap";
import {
  Church,
  Crown,
  Landmark,
  Languages,
  Sparkles,
} from "lucide-react";

import bg from "@/assets/images/religions/r-4.webp";
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

type ChaldoContent = {
  back: string;
  pageTitle: string;
  subtitle: string;
  cards: [CardContent, CardContent, CardContent, CardContent];
  tagline: string;
};

const content: Record<LangCode, ChaldoContent> = {
  en: {
    back: "Back",
    pageTitle: "CHALDO-ASSYRIANS",
    subtitle: "An ancient nationality with an unbroken heritage",
    cards: [
      {
        title: "SYRIAC LANGUAGE",
        icon: Languages,
        text: "One of the world's oldest living languages. A form of Eastern Aramaic. Used in daily life, liturgy, and officially recognized by the KRG.",
      },
      {
        title: "ANKAWA",
        icon: Church,
        text: "The main Christian district of Erbil. Home to the Chaldean Archdiocese, seminary, and Babel College of Philosophy and Theology.",
      },
      {
        title: "PATRIARCH RETURNS",
        icon: Crown,
        text: "The Assyrian Church of the East returned its patriarchal seat to Erbil in 2015 after 83 years of exile. Patriarchal complex inaugurated in 2022 with support from President Masoud Barzani.",
      },
      {
        title: "5 PARLIAMENT SEATS",
        icon: Landmark,
        text: "The Chaldo-Assyrian community holds 5 reserved seats in the Kurdistan Parliament — more than any other minority.",
      },
    ],
    tagline: "The oldest nationality of the land, still here.",
  },
  ku: {
    back: "گەڕانەوە",
    pageTitle: "کلدو ئاشوورییەکان",
    subtitle: "نەتەوەیەکی دێرین بە میراتێکی بێ پچڕان",
    cards: [
      {
        title: "زمانی سریانی",
        icon: Languages,
        text: "یەکێکە لە دێرینترین زمانە زیندووەکانی جیهان. لقێکە لە ئارامی ڕۆژهەڵاتی. لە ژیانی ڕۆژانە و ڕێوڕەسمە ئایینییەکاندا بەکاردێت و بە فەرمی لەلایەن حکومەتی هەرێمی کوردستانەوە ناسێنراوە.",
      },
      {
        title: "عەنکاوە",
        icon: Church,
        text: "گەڕەکی سەرەکی مەسیحییەکانە لە هەولێر. ناوەندی ئەپەرشیەی کلدانی و پەیمانگای بابل بۆ فەلسەفە و خوداناسییە.",
      },
      {
        title: "گەڕانەوەی پاتریارک",
        icon: Crown,
        text: "کەنیسەی ڕۆژهەڵاتی ئاشووری کورسی پاتریارکی خۆی لە ساڵی ٢٠١٥دا گەڕاندەوە هەولێر دوای ٨٣ ساڵ لە مەنفا. کۆمەڵگەی پاتریارکی لە ٢٠٢٢ بە پاڵپشتی سەرۆک بارزانی کرایەوە.",
      },
      {
        title: "٥ کورسی پەرلەمان",
        icon: Landmark,
        text: "کلدو ئاشوورییەکان ٥ کورسی کۆتایان لە پەرلەمان هەیە.",
      },
    ],
    tagline: "کۆنترین نەتەوەکانی ئەم خاکە، هێشتا لێرەن.",
  },
  ar: {
    back: "العودة",
    pageTitle: "الكلدو-آشوريون",
    subtitle: "قومية عريقة بإرث متصل لا انقطاع فيه",
    cards: [
      {
        title: "اللغة السريانية",
        icon: Languages,
        text: "إحدى أقدم اللغات الحيّة في العالم، وفرع من الآرامية الشرقية. تُستخدم في الحياة اليومية والطقوس الدينية، ومُعترف بها رسمياً من حكومة إقليم كوردستان.",
      },
      {
        title: "عنكاوة",
        icon: Church,
        text: "الحي المسيحي الرئيسي في أربيل. مقر أبرشية الكلدان والكلية الإكليريكية وكلية بابل للفلسفة واللاهوت.",
      },
      {
        title: "عودة البطريرك",
        icon: Crown,
        text: "أعادت كنيسة المشرق الآشورية كرسيها البطريركي إلى أربيل عام ٢٠١٥ بعد ٨٣ عاماً من المنفى، وافتُتح المجمع البطريركي عام ٢٠٢٢ بدعم من الرئيس مسعود بارزاني.",
      },
      {
        title: "٥ مقاعد برلمانية",
        icon: Landmark,
        text: "يحظى الكلدو-آشوريون بـ ٥ مقاعد مخصصة في برلمان كوردستان — أكثر من أي مكوّن آخر.",
      },
    ],
    tagline: "أعرق قوميات هذه الأرض، ولا تزال هنا.",
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

type ChaldoAssyriansPageProps = {
  lang?: LangCode;
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function ChaldoAssyriansPage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: ChaldoAssyriansPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const c = content[lang];
  const dir = lang === "en" ? "ltr" : "rtl";

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-chaldo-hero='true']", {
        autoAlpha: 0,
        scale: 1.04,
      });

      gsap.set("[data-chaldo-animate='true']", {
        autoAlpha: 0,
        y: 24,
      });

      const tl = gsap.timeline();

      tl.to("[data-chaldo-hero='true']", {
        autoAlpha: 1,
        scale: 1,
        duration: 0.9,
        ease: "power2.out",
      }).to(
        "[data-chaldo-animate='true']",
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
          heroAttr="data-chaldo-hero"
          src={bg}
          desktopClassName="absolute inset-0 h-[60vh] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]"
        >
          <div className="absolute inset-x-0 top-0 hidden h-[60vh] bg-gradient-to-b from-[#fbf1df]/72 via-[#fbf1df]/30 to-[#f4dfbb]/95 sm:block" />
        </FaithDetailHeroImage>

        <FaithDetailControls
          controlsAttr="data-chaldo-controls"
          backLabel={c.back}
          onBack={onBack}
          onLanguageChange={onLanguageChange}
          languageLabel={languageLabel}
        />

        <div className={`relative z-10 mx-auto max-w-[1120px] ${FAITH_CONTENT_PADDING}`}>
          <header
            data-chaldo-animate="true"
            className="mx-auto max-w-[900px] pt-4 text-center sm:pt-28 lg:pt-32"
          >
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center text-[48px] text-[#b9822d] sm:mb-6 sm:h-24 sm:w-24 sm:text-[68px]">
              ✥
            </div>

            <div className="mx-auto mb-4 w-[480px] max-w-full sm:mb-5">
              <DecorativeLine />
            </div>

            <h1 className="break-words font-serif text-[clamp(32px,9vw,96px)] font-semibold uppercase leading-[1] tracking-[0.14em] text-[#2f1f12] sm:text-[80px] lg:text-[96px]">
              {c.pageTitle}
            </h1>

            <p className="mt-3 font-serif text-[clamp(20px,5vw,34px)] font-semibold text-[#7d5a2d] sm:mt-4 sm:text-[34px]">
              {c.subtitle}
            </p>

            <div className="mx-auto mt-5 w-[210px] max-w-full sm:mt-8">
              <DecorativeLine />
            </div>
          </header>

          <FaithDetailSpacer desktopHeight="h-[480px]" />

          <section
            data-chaldo-animate="true"
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

          <section data-chaldo-animate="true" className={FAITH_TAGLINE_SECTION_CLASS}>
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
