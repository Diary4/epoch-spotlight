import React from "react";
import {
  BookOpen,
  Clock,
  Landmark,
  Sparkles,
  Star,
  UsersRound,
} from "lucide-react";

import bg from "@/assets/images/religions/j-1.webp";
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
    cards: { title: string; icon: typeof UsersRound; text: string }[];
  }
> = {
  en: {
    title: "Judaism",
    subtitle: "Memory, heritage, and continuity",
    tagline: "Rooted in memory and respect.",
    cards: [
      {
        title: "Kurdish Jews",
        icon: UsersRound,
        text: "Ancient Eastern community historically residing in northern Mesopotamia. When Cyrus allowed them to return to Jerusalem after Babylonian exile, most chose to remain in Kurdistan.",
      },
      {
        title: "Torah",
        icon: BookOpen,
        text: "Judaism's sacred text consists of five books: Genesis, Exodus, Leviticus, Numbers, and Deuteronomy. Other important texts include the Talmud, Tanakh, Midrash, and Mishnah.",
      },
      {
        title: "Nahum Shrine",
        icon: Landmark,
        text: "The Shrine of the Prophet Nahum in Alqosh — a historically significant Jewish sacred site in the Kurdistan Region.",
      },
      {
        title: "Heritage",
        icon: Clock,
        text: "Kurdistan's Jewish history spans over 2,500 years. Jewish traveler Benjamin of Tudela estimated 25,000 Jews in Amadiya alone in the 12th century.",
      },
    ],
  },
  ku: {
    title: "جوولەکەیی",
    subtitle: "یادەوەری و میرات و بەردەوامی",
    tagline: "ڕەگداکوتاو لە یادەوەری و ڕێز.",
    cards: [
      {
        title: "جوولەکەکانی کوردستان",
        icon: UsersRound,
        text: "کۆمەڵگایەکی ڕۆژهەڵاتی دێرین بوون کە مێژوویان لە باکووری میزۆپۆتامیا بووە. کاتێک کورش ڕێگەی دا دوای دیلی بابلی بگەڕێنەوە بۆ قودس، زۆربەیان مانەوە لە کوردستان هەڵبژارد.",
      },
      {
        title: "تەورات",
        icon: BookOpen,
        text: "کتێبی پیرۆزی جوولەکەیی پێنج سێفری لەخۆ دەگرێت: پیدابوون، دەرچوون، لاویان، ژمارەکان و دووبارەکردنەوەی یاسا. تێکستە گرنگەکانی تر بریتین لە تەلمود، تەناخ، میدراش و میشنا.",
      },
      {
        title: "مەزاری پێغەمبەر ناحوم",
        icon: Landmark,
        text: "مەزاری پێغەمبەر ناحوم لە ئەلقۆش شوێنێکی پیرۆزی جوولەکەییە و گرنگییەکی مێژوویی زۆری لە هەرێمی کوردستان هەیە.",
      },
      {
        title: "میرات",
        icon: Clock,
        text: "مێژووی جوولەکەکان لە کوردستان زیاتر لە 2,500 ساڵ دەبێت. گەشتیاری جوولەکە بنیامین تودێلایی لە سەدەی دوازدەهەمدا ژمارەی جوولەکەکانی ئامێدی بە تەنها بە 25,000 کەس مەزندە کردووە.",
      },
    ],
  },
  ar: {
    title: "اليهودية",
    subtitle: "الذاكرة والتراث والاستمرارية",
    tagline: "متجذرون في الذاكرة والاحترام.",
    cards: [
      {
        title: "يهود كوردستان",
        icon: UsersRound,
        text: "مجتمع شرقي عريق أقام تاريخياً في شمال بلاد الرافدين. حين أذن لهم كورش بالعودة إلى القدس بعد السبي البابلي، اختار معظمهم البقاء في كوردستان.",
      },
      {
        title: "التوراة",
        icon: BookOpen,
        text: "الكتاب المقدس لليهودية يتضمن خمسة أسفار: التكوين والخروج واللاويين والعدد والتثنية. وثمة نصوص مهمة أخرى كالتلمود والتناخ والميدراش والمشناه.",
      },
      {
        title: "ضريح النبي ناحوم",
        icon: Landmark,
        text: "ضريح النبي ناحوم في ألقوش — موقع يهودي مقدس بالغ الأهمية التاريخية في إقليم كوردستان.",
      },
      {
        title: "التراث",
        icon: Clock,
        text: "يمتد التاريخ اليهودي في كوردستان أكثر من 2,500 عام. وقدّر الرحالة اليهودي بنيامين التطيلي عدد يهود عمادية وحدها بـ25,000 نسمة في القرن الثاني عشر.",
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

type JudaismPageProps = {
  lang?: LangCode;
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function JudaismPage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: JudaismPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const dir = lang === "en" ? "ltr" : "rtl";
  const c = content[lang];

  useReligionPageAnimation(
    sectionRef,
    {
      hero: "[data-judaism-hero='true']",
      animate: "[data-judaism-animate='true']",
      controls: "[data-judaism-controls='true']",
    },
    [lang],
  );

  return (
    <main dir={dir} className={FAITH_MAIN_CLASS}>
      <section ref={sectionRef} className={FAITH_SECTION_CLASS}>
        <FaithDetailHeroImage
          heroAttr="data-judaism-hero"
          src={bg}
          desktopClassName="absolute inset-0 h-[60vh] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]"
        >
          <div className="absolute inset-x-0 top-0 hidden h-[60vh] bg-gradient-to-b from-[#faf8f5]/72 via-[#faf8f5]/30 to-[#faf8f5]/95 sm:block" />
        </FaithDetailHeroImage>

        <FaithDetailControls
          controlsAttr="data-judaism-controls"
          backLabel="Back"
          onBack={onBack}
          onLanguageChange={onLanguageChange}
          languageLabel={languageLabel}
        />

        <div className={`relative z-10 mx-auto max-w-[1120px] ${FAITH_CONTENT_PADDING}`}>
          <header
            data-judaism-animate="true"
            className="mx-auto max-w-[900px] pt-4 text-center sm:pt-32"
          >
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center text-[48px] text-[#b9822d] sm:mb-6 sm:h-24 sm:w-24 sm:text-[68px]">
              ✥
            </div>

            <div className="mx-auto mb-4 w-[480px] max-w-full sm:mb-5">
              <DecorativeLine />
            </div>

            <h1 className="break-words font-serif text-[clamp(36px,10vw,118px)] font-semibold uppercase leading-[1] tracking-[0.16em] text-[#2f1f12] sm:text-[94px] lg:text-[118px]">
              {c.title}
            </h1>

            <p className="mt-3 font-serif text-[clamp(20px,5vw,40px)] font-semibold text-[#7d5a2d] sm:mt-4 sm:text-[40px]">
              {c.subtitle}
            </p>

            <div className="mx-auto mt-5 w-[210px] max-w-full sm:mt-8">
              <DecorativeLine />
            </div>
          </header>

          <FaithDetailSpacer desktopHeight="h-[820px]" />

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {c.cards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  data-judaism-animate="true"
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

          <section data-judaism-animate="true" className={FAITH_TAGLINE_SECTION_CLASS}>
            <div className={`${FAITH_TAGLINE_ICON_WRAP_CLASS} text-[32px] sm:text-[42px]`}>
              <Star className="h-8 w-8 sm:h-10 sm:w-10" />
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
