import React from "react";
import gsap from "gsap";
import { Sparkles } from "lucide-react";

import heroBg from "@/assets/images/religions/a-1.webp";
import historyImg from "@/assets/images/new/religions/nations/armenian.webp";
import churchesImg from "@/assets/images/religions/sharedlife/churches.jpeg";
import communityImg from "@/assets/images/religions/coexistence/coexistence.jpeg";
import parliamentImg from "@/assets/images/religions/rights/parliment.jpeg";
import {
  FAITH_CONTENT_PADDING,
  FAITH_TAGLINE_ICON_WRAP_CLASS,
  FAITH_TAGLINE_SECTION_CLASS,
  FAITH_TAGLINE_TEXT_CLASS,
  FaithDetailControls,
  FaithDetailHeroImage,
  FaithDetailPageShell,
  FaithDetailSpacer,
} from "@/components/Sections/religions/faithDetailLayout";
import { NationTopicSwitcher } from "@/components/Sections/religions/nations/NationTopicSwitcher";

type LangCode = "en" | "ku" | "ar";
type TopicId = "history" | "churches" | "community" | "parliament";

type TopicContent = {
  id: TopicId;
  title: string;
  text: string;
};

type ArmeniansContent = {
  back: string;
  pageTitle: string;
  subtitle: string;
  topics: [TopicContent, TopicContent, TopicContent, TopicContent];
  tagline: string;
};

const TOPIC_IMAGES: Record<TopicId, string> = {
  history: historyImg,
  churches: churchesImg,
  community: communityImg,
  parliament: parliamentImg,
};

const content: Record<LangCode, ArmeniansContent> = {
  en: {
    back: "Back",
    pageTitle: "ARMENIANS",
    subtitle: "A century of belonging in Kurdistan",
    topics: [
      {
        id: "history",
        title: "HISTORY",
        text: "Armenians arrived in Kurdistan following the 1915 genocide, finding refuge in a land that became their home across generations.",
      },
      {
        id: "churches",
        title: "CHURCHES",
        text: "The Armenian Diocese oversees 14 churches, 5 of which are in the Kurdistan Region including Holy Cross Church in Erbil inaugurated in 2019.",
      },
      {
        id: "community",
        title: "COMMUNITY",
        text: "Currently approximately 3,500–4,000 Armenians live in the Kurdistan Region. The Armenian Cultural and Social Association is active in Erbil.",
      },
      {
        id: "parliament",
        title: "1 PARLIAMENT SEAT",
        text: "The Armenian community holds a reserved seat in the Kurdistan Parliament, ensuring their voice in public life.",
      },
    ],
    tagline: "A community of memory, resilience, and belonging.",
  },
  ku: {
    back: "گەڕانەوە",
    pageTitle: "ئەرمەن",
    subtitle: "سەدەیەک لە سۆز و پەیوەستبوون لە کوردستان",
    topics: [
      {
        id: "history",
        title: "مێژوو",
        text: "ئەرمەنەکان دوای کۆمەڵکوژیی ١٩١٥ ڕوویان لە کوردستان کرد و لێرە پەناگەیان دۆزییەوە و بە تێپەڕبوونی چەند نەوەیەک بوو بە نیشتمانیان.",
      },
      {
        id: "churches",
        title: "کەنیسەکان",
        text: "ئەپەرشیەی ئەرمەنی سەرپەرشتی ١٤ کەنیسە دەکات، ٥یان لە هەرێمی کوردستانن، لەوانە کەنیسەی خاچی پیرۆز لە هەولێر کە ساڵی ٢٠١٩ کرایەوە.",
      },
      {
        id: "community",
        title: "کۆمەڵگە",
        text: "ئێستا نزیکەی ٣٥٠٠ بۆ ٤٠٠٠ ئەرمەنی لە هەرێم دەژین. کۆمەڵەی کلتووری و کۆمەڵایەتی ئەرمەنی لە هەولێر زۆر چالاکە.",
      },
      {
        id: "parliament",
        title: "کورسییەکی پەرلەمان",
        text: "پێکهاتەی ئەرمەن خاوەنی یەک کورسی کۆتایە لە پەرلەمان، ئەمەش بۆ دڵنیابوون لە نوێنەرایەتیکردنیان.",
      },
    ],
    tagline: "کۆمەڵگەیەک بۆ یادەوەری، خۆڕاگری و دڵسۆزی.",
  },
  ar: {
    back: "العودة",
    pageTitle: "الأرمن",
    subtitle: "قرنٌ من الانتماء في كوردستان",
    topics: [
      {
        id: "history",
        title: "التاريخ",
        text: "وصل الأرمن إلى كوردستان إثر إبادة ١٩١٥، فوجدوا فيها ملاذاً صار بمرور الأجيال وطناً لهم.",
      },
      {
        id: "churches",
        title: "الكنائس",
        text: "تشرف الأبرشية الأرمنية على ١٤ كنيسة، خمسٌ منها في إقليم كوردستان، ومنها كنيسة الصليب المقدس في أربيل التي افتُتحت عام ٢٠١٩.",
      },
      {
        id: "community",
        title: "المجتمع",
        text: "يعيش حالياً نحو ٣٥٠٠ إلى ٤٠٠٠ أرمني في إقليم كوردستان، والجمعية الثقافية والاجتماعية الأرمنية ناشطة في أربيل.",
      },
      {
        id: "parliament",
        title: "مقعد برلماني",
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
  const fontStyle =
    lang === "ar"
      ? { fontFamily: "'Almarai', 'Oxygen', sans-serif" }
      : undefined;

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-armenians-hero='true']", { autoAlpha: 0, scale: 1.04 });
      gsap.set("[data-armenians-animate='true']", { autoAlpha: 0, y: 24 });

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
      <FaithDetailHeroImage heroAttr="data-armenians-hero" src={heroBg} />

      <FaithDetailControls
        controlsAttr="data-armenians-controls"
        backLabel={c.back}
        dir={dir}
        onBack={onBack}
        onLanguageChange={onLanguageChange}
        languageLabel={languageLabel}
      />

      <div
        style={fontStyle}
        className={`relative z-10 mx-auto max-w-[1120px] ${FAITH_CONTENT_PADDING}`}
      >
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

        <FaithDetailSpacer desktopHeight="h-[420px]" />

        <NationTopicSwitcher
          pageTitle={c.pageTitle}
          topics={c.topics}
          images={TOPIC_IMAGES}
          animateAttr="data-armenians-animate"
          ariaLabel="Armenians topics"
          langKey={lang}
        />

        <section data-armenians-animate="true" className={FAITH_TAGLINE_SECTION_CLASS}>
          <div className={`${FAITH_TAGLINE_ICON_WRAP_CLASS} text-[42px]`}>✺</div>
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
