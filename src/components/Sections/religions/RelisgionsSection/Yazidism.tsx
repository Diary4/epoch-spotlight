import React from "react";
import {
  ChevronRight,
  HeartHandshake,
  Sparkles,
} from "lucide-react";
import OtherFaithTraditionsPage from "@/components/Sections/religions/RelisgionsSection/OtherFaith";

import bg from "@/assets/images/religions/r-4.webp";
import { useReligionPageAnimation } from "@/components/Sections/religions/useReligionPageAnimation";
import {
  FaithDetailCard,
  FAITH_CONTENT_PADDING,
  FAITH_TAGLINE_ACTION_SECTION_CLASS,
  FAITH_TAGLINE_TEXT_CLASS,
  FaithDetailControls,
  FaithDetailHeroImage,
  FaithDetailPageShell,
  FaithDetailSpacer,
} from "@/components/Sections/religions/faithDetailLayout";
import lalish from "@/assets/mainImages/story-1.webp";
import peacock from "@/assets/mainImages/story-2.webp";
import festival from "@/assets/mainImages/2005.webp";
import candle from "@/assets/images/bg-2.webp";

type LangCode = "en" | "ku" | "ar";

type CardContent = {
  title: string;
  text: string;
};

type YazidismContent = {
  back: string;
  pageTitle: string;
  subtitle: string;
  cards: [CardContent, CardContent, CardContent, CardContent];
  tagline: string;
};

const content: Record<LangCode, YazidismContent> = {
  en: {
    back: "Back",
    pageTitle: "YAZIDISM",
    subtitle: "Sacred valley, memory, and resilience",
    cards: [
      {
        title: "LALISH",
        text: "60 km north of Mosul, in the Sheikhan district. Home to the shrine of Sheikh Adi and the global spiritual center of the Yazidi faith.",
      },
      {
        title: "TAWUS MELEK",
        text: "The Peacock Angel — chief of the angels and guardian of the universe, the pillar of Yazidi belief and identity.",
      },
      {
        title: "JEMAYÎ",
        text: "The largest annual religious gathering (6–13 October). One of the four festivals officially recognized as public holidays.",
      },
      {
        title: "RESILIENCE",
        text: "The Yazidi population in Kurdistan is estimated at 750,000–800,000. The Kurdistan Parliament has recognized August 3 as Yazidi Genocide Day.",
      },
    ],
    tagline: "Rooted in faith, living with dignity.",
  },
  ku: {
    back: "گەڕانەوە",
    pageTitle: "ئێزیدیاتی",
    subtitle: "دۆڵە پیرۆزەکە، یادەوەری و خۆڕاگری",
    cards: [
      {
        title: "لالش",
        text: "٦٠ کم لە باکووری مووسڵەوە دوورە، لە قەزای شێخان. مەزاری شێخ عەدی لێیە و ناوەندی ڕۆحیی جیهانی ئێزیدییە.",
      },
      {
        title: "مەلەک تاووس",
        text: "گەورەی فریشتەکانە و پارێزەری گەردوونە. کۆڵەکەی باوەڕی ئێزیدی و ناسنامەیانە.",
      },
      {
        title: "جەمایێ",
        text: "گەورەترین کۆبوونەوەی ئایینی ساڵانەیە (٦–١٣ی تشرینی یەکەم). یەکێکە لەو چوار جەژنەی کە وەک پشووی فەرمی ناسراون.",
      },
      {
        title: "خۆڕاگری",
        text: "ژمارەی ئێزیدییەکان لە کوردستان بە ٧٥٠ بۆ ٨٠٠ هەزار کەس دەخەمڵێنرێت. پەرلەمانی کوردستان ڕۆژی ٣ی ئابی وەک ڕۆژی جینۆسایدی ئێزیدییەکان ناساندووە.",
      },
    ],
    tagline: "لە باوەڕدا ڕەگداکوتاون، بە کەرامەتەوە دەژین.",
  },
  ar: {
    back: "العودة",
    pageTitle: "الإيزيدية",
    subtitle: "الوادي المقدس، الذاكرة، والصمود",
    cards: [
      {
        title: "لalish",
        text: "تبعد ٦٠ كم شمالي الموصل، في قضاء الشيخان. تضمّ ضريح الشيخ عدي، وهي المركز الروحي العالمي للإيزيديين.",
      },
      {
        title: "ملك طاووس",
        text: "كبير الملائكة وحارس الكون. عماد العقيدة الإيزيدية وهويتها.",
      },
      {
        title: "جماعية",
        text: "أكبر تجمّع ديني سنوي (٦–١٣ تشرين الأول). أحد أربعة أعياد معترف بها كعطلٍ رسمية.",
      },
      {
        title: "الصمود",
        text: "يُقدَّر عدد الإيزيديين في إقليم كوردستان بـ ٧٥٠ إلى ٨٠٠ ألف نسمة. وقد اعتمد برلمان كوردستان يوم ٣ آب يوماً لإبادة الإيزيديين.",
      },
    ],
    tagline: "متجذرون في الإيمان، نعيش بكرامة.",
  },
};

const cardImages = [lalish, peacock, festival, candle];

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

type YazidismPageProps = {
  lang?: LangCode;
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function YazidismPage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: YazidismPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const [subPage, setSubPage] = React.useState<null | "otherFaith">(null);
  const c = content[lang];
  const dir = lang === "en" ? "ltr" : "rtl";

  useReligionPageAnimation(
    sectionRef,
    {
      hero: "[data-yazidi-hero='true']",
      animate: "[data-yazidi-animate='true']",
      controls: "[data-yazidi-controls='true']",
    },
    [lang],
  );

  if (subPage === "otherFaith") {
    return (
      <OtherFaithTraditionsPage
        lang={lang}
        languageLabel={languageLabel}
        onLanguageChange={onLanguageChange}
        onBack={() => setSubPage(null)}
      />
    );
  }

  return (
    <FaithDetailPageShell dir={dir} lang={lang} fitDeps={[lang]} sectionRef={sectionRef}>
        <FaithDetailHeroImage
          heroAttr="data-yazidi-hero"
          src={bg}
        />

        <FaithDetailControls
          controlsAttr="data-yazidi-controls"
          backLabel={c.back}
          dir={dir}
          onBack={onBack}
          onLanguageChange={onLanguageChange}
          languageLabel={languageLabel}
        />

        <div className={`relative z-10 mx-auto max-w-[1020px] ${FAITH_CONTENT_PADDING}`}>
          <header
            data-yazidi-animate="true"
            className="mx-auto max-w-[820px] pt-12 text-center"
          >
            <div className="mx-auto mb-4 w-[440px] max-w-full">
              <DecorativeLine color="#c3923a" />
            </div>

            <h1 className="break-words font-serif text-[104px] font-semibold uppercase leading-[1] tracking-[0.1em] text-[#2f1f12]">
              {c.pageTitle}
            </h1>

            <p className="mt-4 font-serif text-[31px] font-semibold text-[#a46f22]">
              {c.subtitle}
            </p>

            <div className="mx-auto mt-6 w-[190px] max-w-full">
              <DecorativeLine color="#c3923a" />
            </div>
          </header>

          <FaithDetailSpacer desktopHeight="h-[280px]" />

          <section className="grid grid-cols-2 gap-6">
            {c.cards.map((card, i) => (
              <FaithDetailCard
                key={card.title}
                title={card.title}
                text={card.text}
                image={cardImages[i]}
                index={i}
                animateAttr="data-yazidi-animate"
              />
            ))}
          </section>

          <section data-yazidi-animate="true" className={FAITH_TAGLINE_ACTION_SECTION_CLASS}>
            <div className="grid h-16 w-16 shrink-0 place-items-center self-auto text-[#c58b16]">
              <HeartHandshake className="h-12 w-12" strokeWidth={1.8} />
            </div>

            <p className={`flex-1 text-start ${FAITH_TAGLINE_TEXT_CLASS}`}>
              {c.tagline}
            </p>

            <button
              type="button"
              onClick={() => setSubPage("otherFaith")}
              className="grid h-16 w-16 shrink-0 place-items-center self-auto rounded-full border border-[#d6b06b] bg-[#fff4dc] text-[#a8751f]"
            >
              <ChevronRight className="h-9 w-9" />
            </button>
          </section>

          <Sparkles className="mx-auto mt-5 h-12 w-12 text-[#c58b16]" />
        </div>

        <div className="pointer-events-none absolute bottom-0 right-0 h-52 w-52 rounded-tl-full border-l-2 border-t-2 border-[#d2a35a]/30 opacity-70" />
    </FaithDetailPageShell>
  );
}
