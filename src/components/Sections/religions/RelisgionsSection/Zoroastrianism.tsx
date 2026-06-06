import React from "react";
import {
  Flame,
  Leaf,
  Scale,
  Sparkles,
  Sun,
} from "lucide-react";

import bg from "@/assets/images/religions/r-2.webp";
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
    cards: { title: string; icon: typeof Scale; text: string }[];
  }
> = {
  en: {
    title: "Zoroastrianism",
    subtitle: "Light, truth, and ancient wisdom",
    tagline: "An ancient flame of wisdom.",
    cards: [
      {
        title: "History",
        icon: Scale,
        text: "Dominant religion in Kurdistan before Islam. Flourished during Achaemenid and Sassanian empires. First fire temple in Iraqi Kurdistan opened in Sulaymaniyah in 2016.",
      },
      {
        title: "Three Pillars",
        icon: Sparkles,
        text: "Good Thoughts, Good Words, Good Deeds. Work and diligence are religious duties. Respecting the beliefs of others is a core principle.",
      },
      {
        title: "Environment",
        icon: Leaf,
        text: "Fire, air, water, and earth are sacred. Environmental protection is the most crucial religious duty. Both spouses must plant a tree upon marriage and with the birth of each child.",
      },
      {
        title: "Nowruz",
        icon: Sun,
        text: "The most prominent Zoroastrian festival, celebrated March 21. Since 2015 the Atashgah has provided over 10,000 job opportunities to people of all backgrounds in Kurdistan.",
      },
    ],
  },
  ku: {
    title: "زەردەشتیەتی",
    subtitle: "ڕووناکی و ڕاستی و دانایی دێرین",
    tagline: "بڵێسەی داناییەکی دێرین کە ناکوژێتەوە.",
    cards: [
      {
        title: "مێژوو",
        icon: Scale,
        text: "پێش ئیسلام ئاینی باڵادەست بوو لە کوردستان. لە سەردەمی هەخامەنشی و ساسانییەکاندا گەشەی کرد. یەکەم پەرستگای ئاگر لە کوردستانی عێراق ساڵی 2016 لە سلێمانی کرایەوە.",
      },
      {
        title: "سێ بنەما",
        icon: Sparkles,
        text: "بیرۆکەی باش، وشەی باش، کردەوەی باش. کار و هەوڵدان ئەرکی ئاینییە. ڕێزگرتن لە باوەڕی ئەوانی تر بنەمایەکی سەرەکییە.",
      },
      {
        title: "ژینگە",
        icon: Leaf,
        text: "ئاگر و هەوا و ئاو و خاک توخمە پیرۆزەکانن. پاراستنی ژینگە لە گرنگترین ئەرکە ئاینییەکانە. هەر ژن و مێردێک دەبێت لە کاتی هاوسەرگیری و لەدایکبوونی هەر منداڵێکدا دارێک بچێنن.",
      },
      {
        title: "نەورۆز",
        icon: Sun,
        text: "گرنگترین جەژنی زەردەشتییە و لە 21ی ئازاردا دەگیرێت. لە ساڵی 2015ەوە ئاتەشگا زیاتر لە 10,000 هەلی کار بۆ خەڵکی ئاین و نەتەوە جیاوازەکانی کوردستان دابین کردووە.",
      },
    ],
  },
  ar: {
    title: "الزرادشتية",
    subtitle: "النور والحقيقة والحكمة العريقة",
    tagline: "شعلة حكمة عريقة لا تنطفئ.",
    cards: [
      {
        title: "التاريخ",
        icon: Scale,
        text: "كانت الديانة السائدة في كوردستان قبل الإسلام. ازدهرت في عهدَي الأخمينيين والساسانيين. افتُتح أول معبد للنار في كوردستان العراق بالسليمانية عام 2016.",
      },
      {
        title: "الركائز الثلاث",
        icon: Sparkles,
        text: "الأفكار الحسنة والكلمات الحسنة والأفعال الحسنة. العمل والاجتهاد فريضة دينية. واحترام معتقدات الآخرين مبدأ أساسي.",
      },
      {
        title: "البيئة",
        icon: Leaf,
        text: "النار والهواء والماء والأرض عناصر مقدسة. وحماية البيئة أهم الواجبات الدينية. ويلزم كل زوجين زرع شجرة عند الزواج وعند ولادة كل طفل.",
      },
      {
        title: "نوروز",
        icon: Sun,
        text: "أبرز الأعياد الزرادشتية، يُحتفل به في 21 مارس. ومنذ عام 2015 وفّر معبد النار أكثر من 10,000 فرصة عمل لأبناء مختلف الأديان والقوميات في كوردستان.",
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

type ZoroastrianismPageProps = {
  lang?: LangCode;
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function ZoroastrianismPage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: ZoroastrianismPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const dir = lang === "en" ? "ltr" : "rtl";
  const c = content[lang];

  useReligionPageAnimation(
    sectionRef,
    {
      hero: "[data-zoro-hero='true']",
      animate: "[data-zoro-animate='true']",
      controls: "[data-zoro-controls='true']",
    },
    [lang],
  );

  return (
    <main dir={dir} className={FAITH_MAIN_CLASS}>
      <section ref={sectionRef} className={FAITH_SECTION_CLASS}>
        <FaithDetailHeroImage
          heroAttr="data-zoro-hero"
          src={bg}
          desktopClassName="absolute inset-0 h-[60vh] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]"
        >
          <div className="absolute inset-x-0 top-0 hidden h-[60vh] bg-gradient-to-b from-[#fbf1df]/72 via-[#fbf1df]/30 to-[#f4dfbb]/95 sm:block" />
        </FaithDetailHeroImage>

        <FaithDetailControls
          controlsAttr="data-zoro-controls"
          backLabel="Back"
          onBack={onBack}
          onLanguageChange={onLanguageChange}
          languageLabel={languageLabel}
        />

        <div className={`relative z-10 mx-auto max-w-[1120px] ${FAITH_CONTENT_PADDING}`}>
          <header
            data-zoro-animate="true"
            className="mx-auto max-w-[900px] pt-4 text-center sm:pt-32"
          >
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center text-[48px] text-[#b9822d] sm:mb-6 sm:h-24 sm:w-24 sm:text-[68px]">
              ✥
            </div>

            <div className="mx-auto mb-4 w-[480px] max-w-full sm:mb-5">
              <DecorativeLine />
            </div>

            <h1 className="break-words font-serif text-[clamp(32px,9vw,102px)] font-semibold uppercase leading-[1] tracking-[0.14em] text-[#2f1f12] sm:text-[82px] lg:text-[102px]">
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
                  data-zoro-animate="true"
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

          <section data-zoro-animate="true" className={FAITH_TAGLINE_SECTION_CLASS}>
            <div className={FAITH_TAGLINE_ICON_WRAP_CLASS}>
              <Flame className="h-8 w-8 sm:h-10 sm:w-10" />
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
