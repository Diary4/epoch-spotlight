import React from "react";
import {
  ArrowLeft,
  Globe2,
  BookOpen,
  MoonStar,
  Landmark,
  Sparkles,
} from "lucide-react";

import bg from "@/assets/images/religions/r-9.webp";
import { useReligionPageAnimation } from "@/components/Sections/religions/useReligionPageAnimation";

type LangCode = "en" | "ku" | "ar";

type CardContent = {
  title: string;
  text: string;
  icon: typeof Landmark;
};

type IslamContent = {
  back: string;
  pageTitle: string;
  subtitle: string;
  cards: [CardContent, CardContent, CardContent, CardContent];
  tagline: string;
};

const content: Record<LangCode, IslamContent> = {
  en: {
    back: "Back",
    pageTitle: "ISLAM",
    subtitle: "Faith, worship, and living tradition",
    cards: [
      {
        title: "SHAFI'I SCHOOL",
        icon: BookOpen,
        text: "The majority of Kurds follow the Shafi'i school of thought, embraced since the 7th century CE during the caliphate of Umar ibn al-Khattab.",
      },
      {
        title: "SUFISM",
        icon: Sparkles,
        text: "189 registered Sufi lodges across the KRI. The Qadiriyya and Naqshbandiyya orders shaped Kurdish society and culture for centuries through dhikr, poetry, and spiritual guidance.",
      },
      {
        title: "MINISTRY",
        icon: Landmark,
        text: "The Ministry of Endowments and Religious Affairs supervises 6,103 mosques, 121,112 staff, and serves all religions — not only Islam. Includes directorates for Christian and Yazidi affairs.",
      },
      {
        title: "RAMADAN & EID",
        icon: MoonStar,
        text: "Shared seasons of fasting, prayer, and generosity. Christians in Erbil prepare iftar tables during Ramadan as a gesture of solidarity with Muslims.",
      },
    ],
    tagline: "Faith lived every day.",
  },
  ku: {
    back: "گەڕانەوە",
    pageTitle: "ئیسلام",
    subtitle: "باوەڕ، پەرستن و نەریتە زیندووەکان",
    cards: [
      {
        title: "مەزهەبی شافعی",
        icon: BookOpen,
        text: "زۆربەی کوردان پەیڕەوی مەزهەبی شافعی دەکەن. هەرچەندە ئیسلام لە سەدەی حەوتەمی زایینییەوە گەیشتووەتە کوردستان، بەڵام ئەم مەزهەبە بە درێژایی سەدەکان بووەتە ناسنامەی سەرەکی و ڕێچکەی فقهی و ڕۆحیی زۆربەی کۆمەڵگەی کوردی.",
      },
      {
        title: "سۆفیگەری",
        icon: Sparkles,
        text: "١٨٩ تەکیەی سۆفیگەری تۆمارکراو لە هەرێم هەن. تەریقەتی قادری و نەقشبەندی ڕۆڵیان هەبووە لە پەروەردەی ڕۆحی و کلتووری کۆمەڵگەدا.",
      },
      {
        title: "وەزارەت",
        icon: Landmark,
        text: "وەزارەتی ئەوقاف و کاروباری ئایینی سەرپەرشتی ٦١٠٣ مزگەوت دەکات. ئەم وەزارەتە خزمەتی هەموو ئایینەکان دەکات و بەڕێوەبەرایەتی تایبەتی بۆ مەسیحی و ئێزیدییەکان هەیە.",
      },
      {
        title: "ڕەمەزان و جەژن",
        icon: MoonStar,
        text: "وەرزی ڕۆژوو و نزا و بەخشندەییە. مەسیحییەکانی هەولێر لە ڕەمەزاندا خوانی بەربانگ بۆ نیشاندانی هاوسۆزی ئامادە دەکەن.",
      },
    ],
    tagline: "باوەڕێک کە هەموو ڕۆژێک دەمانژیێنێتەوە.",
  },
  ar: {
    back: "العودة",
    pageTitle: "الإسلام",
    subtitle: "إيمان وعبادة وتقاليد حيّة",
    cards: [
      {
        title: "المذهب الشافعي",
        icon: BookOpen,
        text: "تتبع غالبية الكورد المذهب الشافعي. ومع أن الإسلام بلغ كوردستان منذ القرن السابع الميلادي، فقد غدا هذا المذهب على مرّ القرون عنوان الهوية الرئيسية والطريق الفقهي والروحي لمعظم المجتمع الكوردي.",
      },
      {
        title: "التصوّف",
        icon: Sparkles,
        text: "١٨٩ تكية صوفية مسجلة في الإقليم. أدت الطريقتان القادرية والنقشبندية دوراً بارزاً في التربية الروحية وثقافة المجتمع.",
      },
      {
        title: "الوزارة",
        icon: Landmark,
        text: "تشرف وزارة الأوقاف والشؤون الدينية على ٦١٠٣ مساجد. وتخدم هذه الوزارة جميع الأديان، ولها مديريات خاصة بالشؤون المسيحية والإيزيدية.",
      },
      {
        title: "رمضان والعيد",
        icon: MoonStar,
        text: "موسم للصيام والصلاة والعطاء. ويُعدّ المسيحيون في أربيل موائد الإفطار في رمضان تعبيراً عن التضامن.",
      },
    ],
    tagline: "إيمانٌ يحيا فينا كل يوم.",
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

type IslamPageProps = {
  lang?: LangCode;
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function IslamPage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: IslamPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const c = content[lang];
  const dir = lang === "en" ? "ltr" : "rtl";

  useReligionPageAnimation(
    sectionRef,
    {
      hero: "[data-islam-hero='true']",
      animate: "[data-islam-animate='true']",
      controls: "[data-islam-controls='true']",
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
          data-islam-hero="true"
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
          data-islam-controls="true"
          onClick={onBack}
          className="absolute left-8 top-8 z-30 grid h-14 w-14 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#5a3a18] shadow-sm"
          aria-label={c.back}
        >
          <ArrowLeft className="h-7 w-7" />
        </button>

        <button
          type="button"
          data-islam-controls="true"
          onClick={onLanguageChange}
          className="absolute right-8 top-8 z-30 flex items-center gap-3 rounded-full border border-[#d9b477] bg-white/75 px-5 py-3 font-serif text-sm font-semibold text-[#4b3219] shadow-[0_8px_20px_rgba(84,54,16,0.15)]"
        >
          <Globe2 className="h-5 w-5" />
          {languageLabel}
        </button>

        <div className="relative z-10 mx-auto max-w-[1040px]">
          <header
            data-islam-animate="true"
            className="mx-auto max-w-[820px] pt-10 text-center"
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

          <div className="h-[520px]" />

          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {c.cards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  data-islam-animate="true"
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
            data-islam-animate="true"
            className="mx-auto mt-8 flex max-w-[720px] items-center justify-center gap-8 rounded-[26px] border-2 border-[#c99745]/55 bg-[#fff7e7]/95 px-8 py-5 shadow-[0_12px_28px_rgba(75,45,12,0.16)]"
          >
            <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-[#b9822d] text-[42px] text-white">
              ☾
            </div>

            <p className="font-serif text-[34px] font-semibold leading-tight text-[#3b2410]">
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
