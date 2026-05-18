import React from "react";
import gsap from "gsap";
import {
  ArrowLeft,
  Church,
  Clock,
  Globe2,
  Landmark,
  Sparkles,
  UsersRound,
} from "lucide-react";

import bg from "@/assets/images/religions/r-5.webp";

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
    <main
      dir={dir}
      className="m-0 flex min-h-screen w-screen justify-center bg-[#f8f1e7] p-0 text-[#3d2b18]"
    >
      <section
        ref={sectionRef}
        className="relative min-h-screen w-full overflow-hidden bg-[#fbf1df] px-7 py-9 sm:px-10 lg:px-16"
      >
        <img
          data-armenians-hero="true"
          src={bg}
          alt=""
          className="absolute inset-0 h-[60vh] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]"
        />
        <div className="absolute inset-x-0 top-0 h-[60vh] bg-gradient-to-b from-[#fbf1df]/72 via-[#fbf1df]/30 to-[#f4dfbb]/95" />
        <div className="pointer-events-none absolute inset-5 rounded-[30px] border-2 border-[#d2a35a]/45" />

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
            data-armenians-animate="true"
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
            data-armenians-animate="true"
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
            data-armenians-animate="true"
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
