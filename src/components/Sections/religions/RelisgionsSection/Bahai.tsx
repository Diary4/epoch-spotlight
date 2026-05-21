import React from "react";
import {
  ArrowLeft,
  Flower2,
  Globe2,
  Handshake,
  Heart,
  MapPin,
  Scale,
  Sparkles,
} from "lucide-react";

import bg from "@/assets/images/religions/r-6.webp";
import { useReligionPageAnimation } from "@/components/Sections/religions/useReligionPageAnimation";

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
    <main
      dir={dir}
      className="m-0 flex min-h-screen w-screen justify-center bg-[#f8f1e7] p-0 text-[#3d2b18]"
    >
      <section
        ref={sectionRef}
        className="relative min-h-screen w-full overflow-hidden bg-[#fbf1df] px-7 py-9 sm:px-10 lg:px-16"
      >
        <img
          data-bahai-hero="true"
          src={bg}
          alt=""
          className="absolute inset-0 h-[60vh] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]"
        />
        <div className="absolute inset-x-0 top-0 h-[60vh] bg-gradient-to-b from-[#fbf1df]/72 via-[#fbf1df]/30 to-[#f4dfbb]/95" />
        <div className="pointer-events-none absolute inset-5 rounded-[30px] border-2 border-[#d2a35a]/45" />

        <button
          type="button"
          data-bahai-controls="true"
          onClick={onBack}
          className="absolute left-8 top-8 z-30 grid h-14 w-14 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#5a3a18] shadow-sm"
          aria-label="Back"
        >
          <ArrowLeft className="h-7 w-7" />
        </button>

        <button
          type="button"
          data-bahai-controls="true"
          onClick={onLanguageChange}
          className="absolute right-8 top-8 z-30 flex items-center gap-3 rounded-full border border-[#d9b477] bg-white/75 px-5 py-3 font-serif text-sm font-semibold text-[#4b3219] shadow-[0_8px_20px_rgba(84,54,16,0.15)]"
        >
          <Globe2 className="h-5 w-5" />
          {languageLabel}
        </button>

        <div className="relative z-10 mx-auto max-w-[1120px]">
          <header
            data-bahai-animate="true"
            className="mx-auto max-w-[900px] pt-28 text-center sm:pt-32"
          >
            <div className="mx-auto mb-6 grid h-24 w-24 place-items-center text-[68px] text-[#b9822d]">
              ✥
            </div>

            <div className="mx-auto mb-5 w-[480px] max-w-full">
              <DecorativeLine />
            </div>

            <h1 className="font-serif text-[64px] font-semibold uppercase leading-[1] tracking-[0.14em] text-[#2f1f12] sm:text-[84px] lg:text-[108px]">
              {c.title}
            </h1>

            <p className="mt-4 font-serif text-[26px] font-semibold text-[#7d5a2d] sm:text-[36px]">
              {c.subtitle}
            </p>

            <div className="mx-auto mt-8 w-[210px]">
              <DecorativeLine />
            </div>
          </header>

          <div className="h-[480px]" />

          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {c.cards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  data-bahai-animate="true"
                  className="min-h-[335px] rounded-[24px] border-2 border-[#d8b875]/70 bg-[#fff8e9]/92 px-5 py-7 text-center shadow-[0_12px_28px_rgba(75,45,12,0.18)] backdrop-blur-sm"
                >
                  <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full border-4 border-[#f4dfb7] bg-[#b9822d] text-white shadow-inner">
                    <Icon className="h-10 w-10" strokeWidth={1.7} />
                  </div>

                  <h3 className="font-serif text-[19px] font-semibold uppercase leading-tight text-[#3b2410]">
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
            data-bahai-animate="true"
            className="mx-auto mt-8 flex max-w-[820px] items-center justify-center gap-8 rounded-[26px] border-2 border-[#c99745]/55 bg-[#fff7e7]/95 px-8 py-5 shadow-[0_12px_28px_rgba(75,45,12,0.16)]"
          >
            <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-[#b9822d] text-[42px] text-white">
              <Heart className="h-10 w-10" />
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
