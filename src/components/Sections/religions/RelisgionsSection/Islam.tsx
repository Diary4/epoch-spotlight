import React from "react";
import {
  BookOpen,
  MoonStar,
  Landmark,
  Sparkles,
} from "lucide-react";

import bg from "@/assets/images/religions/r-9.webp";
import { useReligionPageAnimation } from "@/components/Sections/religions/useReligionPageAnimation";
import {
  FAITH_ICON_CARD_CLASS,
  FAITH_ICON_CARD_ICON_CLASS,
  FAITH_ICON_CARD_ICON_WRAP_CLASS,
  FAITH_CONTENT_PADDING,
  FAITH_MAIN_CLASS,
  FAITH_SECTION_CLASS,
  FAITH_TAGLINE_SECTION_CLASS,
  FAITH_TAGLINE_ICON_WRAP_CLASS,
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
    <main dir={dir} className={FAITH_MAIN_CLASS}>
      <section ref={sectionRef} className={FAITH_SECTION_CLASS}>
        <FaithDetailHeroImage
          heroAttr="data-islam-hero"
          src={bg}
          desktopClassName="absolute left-0 top-0 h-[calc(50vh-160px)] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_78%,transparent_100%)]"
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-[calc(50vh-160px)] z-[1] hidden h-24 -translate-y-full blur-[2px] sm:block"
            style={{
              background:
                "linear-gradient(to top, rgba(251,241,223,0.95) 0%, rgba(251,241,223,0.62) 45%, rgba(251,241,223,0) 100%)",
            }}
          />
        </FaithDetailHeroImage>

        <FaithDetailControls
          controlsAttr="data-islam-controls"
          backLabel={c.back}
          onBack={onBack}
          onLanguageChange={onLanguageChange}
          languageLabel={languageLabel}
        />

        <div className={`relative z-10 mx-auto max-w-[1040px] ${FAITH_CONTENT_PADDING}`}>
          <header
            data-islam-animate="true"
            className="mx-auto max-w-[820px] pt-4 text-center sm:pt-10"
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

          <FaithDetailSpacer desktopHeight="h-[720px]" />

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {c.cards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  data-islam-animate="true"
                  className={FAITH_ICON_CARD_CLASS}
                >
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

          <section data-islam-animate="true" className={FAITH_TAGLINE_SECTION_CLASS}>
            <div className={`${FAITH_TAGLINE_ICON_WRAP_CLASS} text-[32px] sm:text-[42px]`}>
              ☾
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
