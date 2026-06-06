import React from "react";
import {
  Flower2,
  Handshake,
  Heart,
  MapPin,
  Scale,
  Sparkles,
} from "lucide-react";

import bg from "@/assets/images/religions/b-1.webp";
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

const content: Record<
  LangCode,
  {
    title: string;
    subtitle: string;
    tagline: string;
    cards: { title: string; icon: typeof MapPin; text: string }[];
  }
> = {
  en: {
    title: "Baha'i Faith",
    subtitle: "Unity, peace, and one humanity",
    tagline: "One humanity. One future.",
    cards: [
      {
        title: "Baha'u'llah in Kurdistan",
        icon: MapPin,
        text: "Chose Kurdistan for seclusion. Resided in Sargalu then Sulaymaniyah for two years. Sent \"The Four Valleys\" to Kurdish Sufi leader Sheikh Abdul Rahman Talabani and \"The Seven Valleys\" to Sheikh Mohiuddin.",
      },
      {
        title: "Core Principles",
        icon: Scale,
        text: "Oneness of God, unity of humanity, gender equality, harmony of religion and science, and justice for all.",
      },
      {
        title: "Free in Kurdistan",
        icon: Handshake,
        text: "Since 2015 represented in the Ministry of Endowments and Religious Affairs. Practice rituals freely. Baha'u'llah described Kurdistan as a refuge of peace.",
      },
      {
        title: "Festival of Ridvan",
        icon: Flower2,
        text: "Most important Baha'i holiday, April 20 to May 2. Commemorates Baha'u'llah's announcement of his message in Baghdad.",
      },
    ],
  },
  ku: {
    title: "ئاینی بەهایی",
    subtitle: "یەکگرتوویی و ئاشتی و یەک مرۆڤایەتی",
    tagline: "یەک مرۆڤایەتی. یەک داهاتوو.",
    cards: [
      {
        title: "بەهاءوڵڵا لە کوردستان",
        icon: MapPin,
        text: "کوردستانی بۆ گۆشەگیری ڕۆحانی هەڵبژارد. دوو ساڵ لە سەرگەلوو و پاشان لە سلێمانی ژیا. \"چوار دۆڵ\"ی پێشکەش بە شێخ عەبدولڕەحمان تاڵەبانی کرد و \"حەوت دۆڵ\"ی بۆ شێخ محییەدین نووسی.",
      },
      {
        title: "بنەما سەرەکییەکان",
        icon: Scale,
        text: "یەکتایی خودا، یەکگرتوویی مرۆڤایەتی، یەکسانی نێوان ڕەگەزەکان، هاوئاهەنگی نێوان ئاین و زانست، و دادپەروەری بۆ هەمووان.",
      },
      {
        title: "ئازادی لە کوردستان",
        icon: Handshake,
        text: "لە ساڵی 2015ەوە نوێنەریان لە وەزارەتی ئەوقاف و کاروباری ئاینی هەیە. بە ئازادی ڕێوڕەسمەکانیان ئەنجام دەدەن. بەهاءوڵڵا کوردستانی وەک پەناگەی ئاشتی وەسف کردووە.",
      },
      {
        title: "جەژنی ڕەزوان",
        icon: Flower2,
        text: "گرنگترین جەژنی بەهاییە، لە 20-21ی نیسانەوە تا 2ی ئایار. یادکردنەوەی ڕاگەیاندنی پەیامی بەهاءوڵڵا لە بەغدادە.",
      },
    ],
  },
  ar: {
    title: "الديانة البهائية",
    subtitle: "الوحدة والسلام وإنسانية واحدة",
    tagline: "إنسانية واحدة. مستقبل واحد.",
    cards: [
      {
        title: "بهاء الله في كوردستان",
        icon: MapPin,
        text: "اختار كوردستان للعزلة الروحية. أقام في سرجلو ثم السليمانية لمدة عامين. أهدى \"الأودية الأربعة\" للشيخ عبد الرحمن الطالباني، و\"الأودية السبعة\" للشيخ محيي الدين.",
      },
      {
        title: "المبادئ الأساسية",
        icon: Scale,
        text: "وحدانية الله، ووحدة البشرية، والمساواة بين الجنسين، والتناغم بين الدين والعلم، والعدل للجميع.",
      },
      {
        title: "حرية في كوردستان",
        icon: Handshake,
        text: "ممثَّلون في وزارة الأوقاف والشؤون الدينية منذ 2015. يمارسون شعائرهم بحرية. ووصف بهاء الله كوردستان بأنها ملاذ للسلام.",
      },
      {
        title: "عيد الرضوان",
        icon: Flower2,
        text: "أهم الأعياد البهائية، من 20-21 أبريل حتى 2 مايو. يُحيي ذكرى إعلان بهاء الله رسالته في بغداد.",
      },
    ],
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

type BahaiPageProps = {
  lang?: LangCode;
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function BahaiPage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: BahaiPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const dir = lang === "en" ? "ltr" : "rtl";
  const c = content[lang];

  useReligionPageAnimation(
    sectionRef,
    {
      hero: "[data-bahai-hero='true']",
      animate: "[data-bahai-animate='true']",
      controls: "[data-bahai-controls='true']",
    },
    [lang],
  );

  return (
    <main dir={dir} className={FAITH_MAIN_CLASS}>
      <section ref={sectionRef} className={FAITH_SECTION_CLASS}>
        <FaithDetailHeroImage
          heroAttr="data-bahai-hero"
          src={bg}
          desktopClassName="absolute inset-0 h-[60vh] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]"
        >
          <div className="absolute inset-x-0 top-0 hidden h-[60vh] bg-gradient-to-b from-[#fbf1df]/72 via-[#fbf1df]/30 to-[#f4dfbb]/95 sm:block" />
        </FaithDetailHeroImage>

        <FaithDetailControls
          controlsAttr="data-bahai-controls"
          backLabel="Back"
          onBack={onBack}
          onLanguageChange={onLanguageChange}
          languageLabel={languageLabel}
        />

        <div className={`relative z-10 mx-auto max-w-[1120px] ${FAITH_CONTENT_PADDING}`}>
          <header
            data-bahai-animate="true"
            className="mx-auto max-w-[900px] pt-4 text-center sm:pt-32"
          >
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center text-[48px] text-[#b9822d] sm:mb-6 sm:h-24 sm:w-24 sm:text-[68px]">
              ✥
            </div>

            <div className="mx-auto mb-4 w-[480px] max-w-full sm:mb-5">
              <DecorativeLine />
            </div>

            <h1 className="break-words font-serif text-[clamp(32px,9vw,108px)] font-semibold uppercase leading-[1] tracking-[0.14em] text-[#2f1f12] sm:text-[84px] lg:text-[108px]">
              {c.title}
            </h1>

            <p className="mt-3 font-serif text-[clamp(18px,4.5vw,36px)] font-semibold text-[#7d5a2d] sm:mt-4 sm:text-[36px]">
              {c.subtitle}
            </p>

            <div className="mx-auto mt-5 w-[210px] max-w-full sm:mt-8">
              <DecorativeLine />
            </div>
          </header>

          <FaithDetailSpacer desktopHeight="h-[480px]" />

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {c.cards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  data-bahai-animate="true"
                  className={FAITH_ICON_CARD_CLASS}
                >
                  <div className={FAITH_ICON_CARD_ICON_WRAP_CLASS}>
                    <Icon className={FAITH_ICON_CARD_ICON_CLASS} strokeWidth={1.7} />
                  </div>

                  <h3 className="font-serif text-[19px] font-semibold uppercase leading-tight text-[#3b2410] sm:text-[19px]">
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

          <section data-bahai-animate="true" className={FAITH_TAGLINE_SECTION_CLASS}>
            <div className={FAITH_TAGLINE_ICON_WRAP_CLASS}>
              <Heart className="h-8 w-8 sm:h-10 sm:w-10" />
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
