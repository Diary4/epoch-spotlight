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
  FaithDetailCard,
  FAITH_CONTENT_PADDING,
  FAITH_TAGLINE_SECTION_CLASS,
  FAITH_TAGLINE_ICON_WRAP_CLASS,
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
    <FaithDetailPageShell dir={dir} lang={lang} fitDeps={[lang]} sectionRef={sectionRef}>
        <FaithDetailHeroImage
          heroAttr="data-islam-hero"
          src={bg}
        />

        <FaithDetailControls
          controlsAttr="data-islam-controls"
          backLabel={c.back}
          dir={dir}
          onBack={onBack}
          onLanguageChange={onLanguageChange}
          languageLabel={languageLabel}
        />

        <div className={`relative z-10 mx-auto max-w-[1040px] ${FAITH_CONTENT_PADDING}`}>
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

            <h1 className="break-words font-serif text-[118px] font-semibold uppercase leading-[1] tracking-[0.16em] text-[#2f1f12]">
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

          <section className="grid grid-cols-4 gap-6">
            {c.cards.map((card, index) => (
              <FaithDetailCard
                key={card.title}
                title={card.title}
                text={card.text}
                image={bg}
                index={index}
                animateAttr="data-islam-animate"
              />
            ))}
          </section>

          <section data-islam-animate="true" className={FAITH_TAGLINE_SECTION_CLASS}>
            <div className={`${FAITH_TAGLINE_ICON_WRAP_CLASS} text-[42px]`}>
              ☾
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