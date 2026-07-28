import React from "react";
import { Sparkles } from "lucide-react";

import heroBg from "@/assets/images/religions/nations/assriyan.jpeg";
import languageImg from "@/assets/images/new/religions/faiths/christianity.webp";
import ankawaImg from "@/assets/images/religions/nations/assyrian/ankawa.jpeg";
import patriarchImg from "@/assets/images/religions/nations/assyrian/patriah.jpeg";
import parliamentImg from "@/assets/images/religions/nations/assyrian/seat.jpeg";
import {
  FAITH_CONTENT_PADDING,
  FAITH_DETAIL_CONTENT_WIDTH,
  FAITH_DETAIL_HEADER_CLASS,
  FAITH_TAGLINE_ICON_WRAP_CLASS,
  FAITH_TAGLINE_SECTION_CLASS,
  NATION_TAGLINE_TEXT_CLASS,
  FaithDetailControls,
  FaithDetailHeroImage,
  FaithDetailPageShell,
  FaithDetailSpacer,
} from "@/components/Sections/religions/faithDetailLayout";
import { NationTopicSwitcher } from "@/components/Sections/religions/nations/NationTopicSwitcher";
import { useReligionPageAnimation } from "@/components/Sections/religions/useReligionPageAnimation";

type LangCode = "en" | "ku" | "ar";
type TopicId = "language" | "ankawa" | "patriarch" | "parliament";

type TopicContent = {
  id: TopicId;
  title: string;
  text: string;
};

type ChaldoContent = {
  back: string;
  pageTitle: string;
  subtitle: string;
  topics: [TopicContent, TopicContent, TopicContent, TopicContent];
  tagline: string;
};

const TOPIC_IMAGES: Record<TopicId, string> = {
  language: languageImg,
  ankawa: ankawaImg,
  patriarch: patriarchImg,
  parliament: parliamentImg,
};

const content: Record<LangCode, ChaldoContent> = {
  en: {
    back: "Back",
    pageTitle: "CHALDO-ASSYRIANS",
    subtitle: "An Ancient Nation with an Unbroken Heritage",
    topics: [
      {
        id: "language",
        title: "SYRIAC LANGUAGE",
        text: "One of the world's oldest living languages. A form of Eastern Aramaic. Used in daily life, liturgy, and officially recognized by the KRG.",
      },
      {
        id: "ankawa",
        title: "ANKAWA",
        text: "The main Christian district of Erbil. Home to the Chaldean Archdiocese, seminary, and Babel College of Philosophy and Theology.",
      },
      {
        id: "patriarch",
        title: "PATRIARCH RETURNS",
        text: "The Assyrian Church of the East returned its patriarchal seat to Erbil in 2015 after 83 years of exile. Patriarchal complex inaugurated in 2022 with support from President Masoud Barzani.",
      },
      {
        id: "parliament",
        title: "5 PARLIAMENT SEATS",
        text: "The Chaldean and Assyrian communities hold five reserved seats in the Kurdistan Parliament.",
      },
    ],
    tagline: "Among the oldest peoples of this land—still here, still thriving.",
  },
  ku: {
    back: "گەڕانەوە",
    pageTitle: "کلدو ئاشوورییەکان",
    subtitle: "نەتەوەیەکی دێرین بە میراتێکی بێ پچڕان",
    topics: [
      {
        id: "language",
        title: "زمانی سریانی",
        text: "یەکێکە لە دێرینترین زمانە زیندووەکانی جیهان. لقێکە لە ئارامی ڕۆژهەڵاتی. لە ژیانی ڕۆژانە و ڕێوڕەسمە ئایینییەکاندا بەکاردێت و بە فەرمی لەلایەن حکومەتی هەرێمی کوردستانەوە ناسێنراوە.",
      },
      {
        id: "ankawa",
        title: "عەنکاوە",
        text: "ناوچەیەکی سەرەکی مەسیحییەکانە لە هەولێر. ناوەندی ئەپەرشیەی کلدانی و پەیمانگای بابل بۆ فەلسەفە و خوداناسییە.",
      },
      {
        id: "patriarch",
        title: "گەڕانەوەی پاتریارک",
        text: "کەنیسەی ڕۆژهەڵاتی ئاشووری کورسی پاتریارکی خۆی لە ساڵی ٢٠١٥دا گەڕاندەوە هەولێر دوای ٨٣ ساڵ لە مەنفا. کۆمەڵگەی پاتریارکی لە ٢٠٢٢ بە پاڵپشتی سەرۆک بارزانی کرایەوە.",
      },
      {
        id: "parliament",
        title: "٥ کورسی پەرلەمان",
        text: "کلدو ئاشوورییەکان ٥ کورسی کۆتایان لە پەرلەمان هەیە.",
      },
    ],
    tagline: "کۆنترین نەتەوەکانی ئەم خاکە، هێشتا لێرەن.",
  },
  ar: {
    back: "العودة",
    pageTitle: "الكلدو آشوريون",
    subtitle: "قومية عريقة بتراث لا ينقطع",
    topics: [
      {
        id: "language",
        title: "اللغة السريانية",
        text: "إحدى أعرق اللغات الحية في العالم. فرع من الآرامية الشرقية. تُستخدم في الحياة اليومية والطقوس الدينية، وتحظى باعتراف رسمي من حكومة إقليم كوردستان.",
      },
      {
        id: "ankawa",
        title: "عينكاوة",
        text: "الحي المسيحي الرئيسي في أربيل. موطن الأبرشية الكلدانية والمعهد الإكليريكي وكلية بابل للفلسفة واللاهوت.",
      },
      {
        id: "patriarch",
        title: "عودة البطريرك",
        text: "أعادت كنيسة المشرق الآشورية كرسيها البطريركي إلى أربيل عام 2015 بعد 83 عاماً من المنفى. وافتُتح المجمع البطريركي عام 2022 بدعم من الرئيس مسعود البارزاني.",
      },
      {
        id: "parliament",
        title: "5 مقاعد برلمانية",
        text: "يحتل الكلدو آشوريون 5 مقاعد مخصصة في برلمان كوردستان — أكثر من أي أقلية أخرى.",
      },
    ],
    tagline: "أقدم قوميات هذه الأرض، لا تزال هنا.",
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
  const fontStyle =
    lang === "ar"
      ? { fontFamily: "'Almarai', 'Oxygen', sans-serif" }
      : undefined;

  useReligionPageAnimation(
    sectionRef,
    {
      hero: "[data-chaldo-hero='true']",
      animate: "[data-chaldo-animate='true']",
      controls: "[data-chaldo-controls='true']",
    },
    [lang],
  );

  return (
    <FaithDetailPageShell dir={dir} lang={lang} fitDeps={[lang]} sectionRef={sectionRef}>
      <FaithDetailHeroImage
        heroAttr="data-chaldo-hero"
        src={heroBg}
        heightClassName="h-[1100px]"
        overlayClassName="bg-[linear-gradient(to_bottom,transparent_0%,transparent_72%,#faf8f5_100%)]"
      />

      <FaithDetailControls
        controlsAttr="data-chaldo-controls"
        backLabel={c.back}
        dir={dir}
        onBack={onBack}
        onLanguageChange={onLanguageChange}
        languageLabel={languageLabel}
      />

      <div
        style={fontStyle}
        className={`relative z-10 mx-auto ${FAITH_DETAIL_CONTENT_WIDTH} ${FAITH_CONTENT_PADDING}`}
      >
        <header
          data-chaldo-animate="true"
          className={`${FAITH_DETAIL_HEADER_CLASS} translate-x-16`}
        >
          <div className="mx-auto mb-2 w-[220px]">
            <DecorativeLine color="#c3923a" />
          </div>
          <h1 className="break-words font-serif text-[84px] font-light uppercase leading-[1.02] tracking-[0.04em] text-[#3b2410]">
            {c.pageTitle}
          </h1>
          <div className="mx-auto mt-4 w-[160px]">
            <DecorativeLine color="#c3923a" />
          </div>
          <p className="mx-auto mt-4 max-w-[640px] font-serif text-[22px] font-light leading-relaxed text-[#4d3c2a]">
            {c.subtitle}
          </p>
        </header>

        <FaithDetailSpacer desktopHeight="h-[700px]" />

        <NationTopicSwitcher
          pageTitle={c.pageTitle}
          topics={c.topics}
          images={TOPIC_IMAGES}
          animateAttr="data-chaldo-animate"
          ariaLabel="Chaldo-Assyrians topics"
          langKey={lang}
        />

        <section data-chaldo-animate="true" className={FAITH_TAGLINE_SECTION_CLASS}>
          <div className={`${FAITH_TAGLINE_ICON_WRAP_CLASS} text-[42px]`}>✺</div>
          <p className={NATION_TAGLINE_TEXT_CLASS}>{c.tagline}</p>
          <Sparkles className="h-8 w-8 shrink-0 text-[#c58b16]" />
        </section>

        <div className="mt-8 text-center text-[58px] text-[#b9822d]">✥</div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 h-52 w-52 rounded-tr-full border-r-2 border-t-2 border-[#d2a35a]/30 opacity-70" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-52 w-52 rounded-tl-full border-l-2 border-t-2 border-[#d2a35a]/30 opacity-70" />
    </FaithDetailPageShell>
  );
}
