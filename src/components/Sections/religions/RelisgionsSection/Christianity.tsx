import React from "react";
import gsap from "gsap";
import {
  ArrowLeft,
  ChevronRight,
  Church,
  Crown,
  Cross,
  Globe2,
  Sparkles,
} from "lucide-react";

import bg from "@/assets/images/religions/r-5.webp";
import ankawa from "@/assets/mainImages/story-1.webp";
import churches from "@/assets/mainImages/story-2.webp";
import denominations from "@/assets/mainImages/2005.webp";
import pope from "@/assets/images/kurdistan.webp";

type LangCode = "en" | "ku" | "ar";

type CardContent = {
  title: string;
  text: string;
};

type ChristianityContent = {
  back: string;
  pageTitle: string;
  subtitle: string;
  cards: [CardContent, CardContent, CardContent, CardContent];
  tagline: string;
};

const content: Record<LangCode, ChristianityContent> = {
  en: {
    back: "Back",
    pageTitle: "CHRISTIANITY",
    subtitle: "Ancient roots, steadfast faith, and a united community",
    cards: [
      {
        title: "HISTORICAL PRESENCE",
        text: "Christianity reached Erbil (Adiabene) in the 1st century CE. By the 3rd century, Erbil had become a major Christian center.",
      },
      {
        title: "CHURCHES",
        text: "All four main traditions are present: Catholic, Orthodox, Eastern, and Evangelical. Dozens of active churches and monasteries stand in Erbil, Duhok, Zakho, and Sulaymaniyah.",
      },
      {
        title: "EASTER & CHRISTMAS",
        text: "Both Easter and Christmas are official public holidays across the Kurdistan Region.",
      },
      {
        title: "POPE FRANCIS",
        text: "On 7 March 2021 he visited Erbil and said: \u201CFreedom is deeply rooted in Kurdistan. Thank you for what you offer to every religion and community.\u201D",
      },
    ],
    tagline: "A living faith in Kurdistan.",
  },
  ku: {
    back: "گەڕانەوە",
    pageTitle: "مەسیحییەت",
    subtitle: "ڕەگی دێرین، باوەڕی چەسپاو و کۆمەڵگەی یەکگرتوو",
    cards: [
      {
        title: "بوونی مێژوویی",
        text: "مەسیحییەت لە سەدەی یەکەمی زایینی گەیشتە هەولێر (حەدیاب). هەولێر لە سەدەی سێیەمەوە مەڵبەندێکی گەورەی مەسیحی بووە.",
      },
      {
        title: "کەنیسەکان",
        text: "هەر چوار جۆری سەرەکی: کاسۆلیک، ئۆرسۆدۆکس، ڕۆژهەڵاتی و ئینجیلی. دەیان کەنیسە و دێری چالاک لە هەولێر، دهۆک، زاخۆ و سلێمانی هەن.",
      },
      {
        title: "جەژنی قیامەت و لەدایکبوون",
        text: "هەردووکیان پشووی فەرمین لە هەرێمی کوردستان.",
      },
      {
        title: "پاپا فرانسیس",
        text: "لە ٧ی ئاداری ٢٠٢١ سەردانی هەولێری کرد و وتی: «ئازادی لە کوردستان ڕەگی داکوتاوە. سوپاس بۆ ئەوەی پێشکەشی هەموو ئایین و پێکهاتەکانی دەکەن».",
      },
    ],
    tagline: "باوەڕێکی زیندوو لە کوردستان.",
  },
  ar: {
    back: "العودة",
    pageTitle: "المسيحية",
    subtitle: "جذور عريقة، وإيمان راسخ، ومجتمع متّحد",
    cards: [
      {
        title: "حضور تاريخي",
        text: "وصلت المسيحية إلى أربيل (حدياب) في القرن الأول الميلادي. وأصبحت أربيل مركزاً مسيحياً كبيراً منذ القرن الثالث.",
      },
      {
        title: "الكنائس",
        text: "تحضر جميع الطوائف الأربع الرئيسية: الكاثوليكية والأرثوذكسية والمشرقية والإنجيلية. وتنتشر عشرات الكنائس والأديرة النشطة في أربيل ودهوك وزاخو والسليمانية.",
      },
      {
        title: "عيدا الفصح والميلاد",
        text: "كلاهما عطلتان رسميتان في إقليم كوردستان.",
      },
      {
        title: "البابا فرنسيس",
        text: "في ٧ آذار ٢٠٢١ زار أربيل وقال: «الحرية متجذرة عميقاً في كوردستان. شكراً لما تقدّمونه لكل الأديان والمكوّنات».",
      },
    ],
    tagline: "إيمان حيٌّ في كوردستان.",
  },
};

const cardVisuals: Array<{
  image: string;
  icon: typeof Cross;
  color: string;
}> = [
  { image: ankawa, icon: Cross, color: "#245a2f" },
  { image: churches, icon: Church, color: "#075c78" },
  { image: denominations, icon: Sparkles, color: "#51245f" },
  { image: pope, icon: Crown, color: "#7b5b16" },
];

function DecorativeLine({ color = "#c99a55" }) {
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

type ChristianityPageProps = {
  lang?: LangCode;
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function ChristianityPage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: ChristianityPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const c = content[lang];
  const dir = lang === "en" ? "ltr" : "rtl";

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-christian-animate='true']", {
        autoAlpha: 0,
        y: 24,
      });

      gsap.to("[data-christian-animate='true']", {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.07,
        ease: "power2.out",
      });
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
          src={bg}
          alt=""
          className="absolute left-0 top-0 h-[calc(50vh-160px)] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_78%,transparent_100%)]"
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-[calc(50vh-160px)] z-[1] h-24 -translate-y-full blur-[2px]"
          style={{
            background:
              "linear-gradient(to top, rgba(251,241,223,0.95) 0%, rgba(251,241,223,0.62) 45%, rgba(251,241,223,0) 100%)",
          }}
        />

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

        <div className="relative z-10 mx-auto max-w-[1040px]">
          <header
            data-christian-animate="true"
            className="mx-auto max-w-[820px] pt-10 text-center"
          >
            <Cross className="mx-auto mb-3 h-16 w-16 text-[#c58b16]" />

            <div className="mx-auto mb-4 w-[430px] max-w-full">
              <DecorativeLine color="#c3923a" />
            </div>

            <h1 className="font-serif text-[64px] font-semibold uppercase leading-[1] tracking-[0.08em] text-[#2f1f12] sm:text-[86px] lg:text-[102px]">
              {c.pageTitle}
            </h1>

            <p className="mt-4 font-serif text-[24px] font-semibold uppercase tracking-[0.08em] text-[#a46f22] sm:text-[30px]">
              {c.subtitle}
            </p>

            <div className="mx-auto mt-6 w-[190px]">
              <DecorativeLine color="#c3923a" />
            </div>
          </header>

          <div className="h-[520px]" />

          <section
            data-christian-animate="true"
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {c.cards.map((card, i) => {
              const visual = cardVisuals[i];
              const Icon = visual.icon;

              return (
                <article
                  key={card.title}
                  className="group relative min-h-[470px] overflow-hidden rounded-[24px] border-2 border-[#f3dfb5] shadow-[0_14px_28px_rgba(69,43,14,0.22)]"
                >
                  <img
                    src={visual.image}
                    alt={card.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to bottom, rgba(40,25,10,0.05), ${visual.color}dd 58%, ${visual.color})`,
                    }}
                  />

                  <div className="relative z-10 flex h-full flex-col justify-end px-5 py-6 text-white">
                    <div className="mb-5 grid h-20 w-20 place-items-center rounded-full border-2 border-[#e4c47e] bg-white/12 backdrop-blur-sm">
                      <Icon className="h-10 w-10" strokeWidth={1.7} />
                    </div>

                    <h3 className="font-serif text-[26px] font-semibold uppercase leading-tight">
                      {card.title}
                    </h3>

                    <p className="mt-3 flex-1 text-[16px] font-semibold leading-relaxed text-white/92">
                      {card.text}
                    </p>
                  </div>
                </article>
              );
            })}
          </section>

          <section
            data-christian-animate="true"
            className="mx-auto mt-8 flex max-w-[800px] items-center gap-7 rounded-[26px] border-2 border-[#c99745]/45 bg-[#fff7e7]/95 px-8 py-5 shadow-[0_12px_28px_rgba(75,45,12,0.16)]"
          >
            <Cross className="h-14 w-14 shrink-0 text-[#c58b16]" />

            <p className="flex-1 font-serif text-[26px] font-semibold leading-tight text-[#3b2410]">
              {c.tagline}
            </p>

            <button className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-[#d6b06b] bg-[#fff4dc] text-[#a8751f]">
              <ChevronRight className="h-9 w-9" />
            </button>
          </section>
        </div>

        <div className="pointer-events-none absolute bottom-0 right-0 h-52 w-52 rounded-tl-full border-l-2 border-t-2 border-[#d2a35a]/30 opacity-70" />
      </section>
    </main>
  );
}
