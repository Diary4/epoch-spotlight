import React from "react";
import gsap from "gsap";
import {
  ArrowLeft,
  Globe2,
  BookOpen,
  Landmark,
  Heart,
  UsersRound,
  ShieldCheck,
  Sunrise,
  type LucideIcon,
} from "lucide-react";
import { detailBackIconClassName, detailBackIconSize, religionsOverlayStartClassName, religionsOverlayEndClassName } from "@/constants/backNavigation";
import ReligionsScaledPage from "@/components/Sections/religions/ReligionsScaledPage";
import bg from "@/assets/images/religions/c-1.webp";

type LangCode = "en" | "ku" | "ar";

type ClosingCard = {
  id: string;
  title: string;
  body: string;
  icon: LucideIcon;
  accent: string;
};

type ClosingContent = {
  back: string;
  pageTitle: string;
  pageSubtitle: string;
  pageLead: string;
  cards: ClosingCard[];
  tagline: string;
  sourcesTitle: string;
  sourcesSubtitle: string;
  sourcesIntro: string;
  publicationTitleLine1: string;
  publicationTitleLine2: string;
  publishedByLead: string;
  ministryName: string;
  governmentLine: string;
  footerNote: string;
};

const CARD_ICONS: ClosingCard["icon"][] = [
  Heart,
  UsersRound,
  ShieldCheck,
  Sunrise,
];

const ACCENTS = ["#8b5a2b", "#6b4c2a", "#4a5f8c", "#b8860b"] as const;

const content: Record<LangCode, ClosingContent> = {
  en: {
    back: "Back",
    pageTitle: "One Shared Homeland",
    pageSubtitle: "Diversity, dignity, and a future together.",
    pageLead: "All are equal members of society in their rights.",
    cards: [
      {
        id: "respect",
        title: "Respect",
        body: "Every identity has its worth. Minorities in Kurdistan deserve respect and protection as a duty. From the mountains of Duhok to the plains of Erbil, every community calls this land home.",
        icon: CARD_ICONS[0],
        accent: ACCENTS[0],
      },
      {
        id: "belonging",
        title: "Belonging",
        body: "There is a place here for everyone.",
        icon: CARD_ICONS[1],
        accent: ACCENTS[1],
      },
      {
        id: "protection",
        title: "Protection",
        body: "Rights and heritage are safeguarded by law, by Parliament, and by Kurdish popular culture across history.",
        icon: CARD_ICONS[2],
        accent: ACCENTS[2],
      },
      {
        id: "hope",
        title: "Hope",
        body: "Tomorrow is built together. The Region continues its pursuit of lasting peace and genuine inclusion for all its people.",
        icon: CARD_ICONS[3],
        accent: ACCENTS[3],
      },
    ],
    tagline: "Different faiths. Different languages. One shared homeland.",
    sourcesTitle: "Sources &\nReferences",
    sourcesSubtitle: "Official publication and source material",
    sourcesIntro:
      "All information presented in this exhibition is sourced from the official publication:",
    publicationTitleLine1: "“Kurdistan:",
    publicationTitleLine2: "The Cradle of Coexistence”",
    publishedByLead: "Published by the",
    ministryName: "Ministry of Endowment and Religious Affairs",
    governmentLine: "Kurdistan Regional Government — Iraq",
    footerNote: "Prepared for museum exhibition\nand public education.",
  },
  ku: {
    back: "گەڕانەوە",
    pageTitle: "یەک نیشتمانی هاوبەش",
    pageSubtitle: "فرەیی، شکۆمەندی، و داهاتوویەکی هاوبەش.",
    pageLead: "هەمووان لە مافەکانیاندا ئەندامی یەکسانی کۆمەڵگان.",
    cards: [
      {
        id: "respect",
        title: "ڕێز",
        body: "هەر ناسنامەیەک بایەخی خۆی هەیە. کەمینەکان لە کوردستان شایانی ڕێز و پاراستنن و ئەمەش ئەرکێکە. لە شاخەکانی دهۆکەوە تا دەشتەکانی هەولێر، هەر کۆمەڵگەیەک ئەم خاکە بە ماڵی خۆی دەزانێت.",
        icon: CARD_ICONS[0],
        accent: ACCENTS[0],
      },
      {
        id: "belonging",
        title: "سەربەخۆبوون و هەست بە ماڵ",
        body: "لێرە شوێن بۆ هەمووان هەیە.",
        icon: CARD_ICONS[1],
        accent: ACCENTS[1],
      },
      {
        id: "protection",
        title: "پاراستن",
        body: "ماف و میرات بە یاسا، بە پەرلەمان، و بە کولتووری گەلی کورد لە درێژایی مێژوودا پارێزراون.",
        icon: CARD_ICONS[2],
        accent: ACCENTS[2],
      },
      {
        id: "hope",
        title: "هیوا",
        body: "سبەی پێکەوە دروست دەکرێت. هەرێم بەردەوامە لە هەوڵدان بۆ ئاشتییەکی پایەدار و بەشدارییەکی ڕاستەقینە بۆ هەموو هاووڵاتیانی.",
        icon: CARD_ICONS[3],
        accent: ACCENTS[3],
      },
    ],
    tagline: "ئاینە جیاوازەکان. زمانە جیاوازەکان. یەک نیشتمانی هاوبەش.",
    sourcesTitle: "سەرچاوەکان و\nئاماژەکان",
    sourcesSubtitle: "بڵاوکراوەی فەرمی و ماددەی سەرچاوە",
    sourcesIntro:
      "هەموو ئەو زانیارییانەی لەم پێشانگایەدا خراونەتەڕوو لە بڵاوکراوەی فەرمییەوە وەرگیراون:",
    publicationTitleLine1: "کوردستان",
    publicationTitleLine2: "گوارەی پێکەوەژیان",
    publishedByLead: "بڵاوکراوەتەوە لەلایەن",
    ministryName: "وەزارەتی ئەوقاف و کاروباری ئاینی",
    governmentLine: "حکومەتی هەرێمی کوردستان — عێراق",
    footerNote: "ئامادەکراوە بۆ پێشانگای مۆزەخانە\nو پەروەردەی گشتی.",
  },
  ar: {
    back: "العودة",
    pageTitle: "وطن مشترك واحد",
    pageSubtitle: "التنوع والكرامة ومستقبل مشترك",
    pageLead: "لا أقليات في كوردستان — الجميع أعضاء متساوون في المجتمع حقوقاً وواجباتٍ وحمايةً.",
    cards: [
      {
        id: "respect",
        title: "الاحترام",
        body: "كل هوية لها قيمتها. لا أقليات في كوردستان — الجميع أعضاء متساوون في المجتمع حقوقاً وواجباتٍ وحمايةً.",
        icon: CARD_ICONS[0],
        accent: ACCENTS[0],
      },
      {
        id: "belonging",
        title: "الانتماء",
        body: "للجميع مكان هنا. جميع المجتمعات تسمي هذه الأرض وطناً.",
        icon: CARD_ICONS[1],
        accent: ACCENTS[1],
      },
      {
        id: "protection",
        title: "الحماية",
        body: "الحقوق والتراث محمية بالقانون وبالبرلمان وبثقافة الشعب الكوردي عبر التاريخ.",
        icon: CARD_ICONS[2],
        accent: ACCENTS[2],
      },
      {
        id: "hope",
        title: "الأمل",
        body: "الغد يُبنى معاً. ويواصل الإقليم سعيه نحو سلام دائم وشمول حقيقي لجميع أبنائه.",
        icon: CARD_ICONS[3],
        accent: ACCENTS[3],
      },
    ],
    tagline: "أديان مختلفة. لغات مختلفة. وطن واحد مشترك.",
    sourcesTitle: "المصادر\nوالمراجع",
    sourcesSubtitle: "المنشور الرسمي ومواد المصدر",
    sourcesIntro:
      "جميع المعلومات الواردة في هذا الکتاب مستقاةٌ من المنشور الرسمي:",
    publicationTitleLine1: "كوردستان",
    publicationTitleLine2: "مهد التعايش",
    publishedByLead: "صادر عن",
    ministryName: "وزارة الأوقاف والشؤون الدينية",
    governmentLine: "حكومة إقليم كوردستان — العراق",
    footerNote: "أُعدَّ لعرض المتحف وللتثقيف العام.",
  },
};

type ClosingPageProps = {
  lang?: LangCode;
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function ClosingPage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: ClosingPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const dir = lang === "en" ? "ltr" : "rtl";
  const c = content[lang];
  const titleUpper = lang === "en";

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-src-animate='true']", {
        autoAlpha: 0,
        y: 28,
      });

      gsap.to("[data-src-animate='true']", {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  const sourcesTitleLines = c.sourcesTitle.split("\n");

  return (
    <ReligionsScaledPage dir={dir} lang={lang} fitDeps={[lang]} sectionRef={sectionRef} className="px-12 pb-14">
      <div className="absolute inset-0 bg-[#faf8f5]" />

      <img
        data-src-hero="true"
        src={bg}
        alt=""
        className="absolute right-0 top-0 h-[900px] w-full object-cover [mask-image:linear-gradient(to_left,black_0%,black_70%,transparent_100%)]"
      />
      <div className="absolute inset-x-0 top-0 h-[720px] bg-gradient-to-b from-[#faf8f5]/72 via-[#faf8f5]/30 to-[#faf8f5]/95" />
      <div className="absolute inset-0 opacity-[0.18]">
        <div className="absolute left-0 top-0 h-[360px] w-[360px] rounded-full border border-[#b98634]" />
        <div className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full border border-[#b98634]" />
      </div>

      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className={`absolute top-1/2 z-30 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-[#d7b77e] bg-white/75 text-[#3f2b17] shadow-[0_10px_24px_rgba(75,45,12,0.12)] backdrop-blur-md ${religionsOverlayStartClassName(dir)}`}
          aria-label={c.back}
        >
          <ArrowLeft size={detailBackIconSize} className={detailBackIconClassName(dir)} />
        </button>
      )}

      {onLanguageChange && (
        <button
          type="button"
          onClick={onLanguageChange}
          className={`absolute top-8 z-30 flex items-center gap-3 rounded-full border border-[#d7b77e] bg-white/75 px-5 py-3 font-serif text-sm font-semibold text-[#3f2b17] shadow-[0_10px_24px_rgba(75,45,12,0.12)] backdrop-blur-md ${religionsOverlayEndClassName(dir)}`}
        >
          <Globe2 className="h-5 w-5" />
          {languageLabel}
        </button>
      )}

      <div className="relative z-10 mx-auto flex w-full max-w-[900px] flex-col items-center pt-20 text-center">
        <div data-src-animate="true" className="mt-14 w-full max-w-[520px]">
          <div className="flex items-center justify-center gap-5">
            <span className="h-px flex-1 bg-[#b98634]/60" />
            <span className="text-3xl text-[#b98634]">✥</span>
            <span className="h-px flex-1 bg-[#b98634]/60" />
          </div>
        </div>

        <h2
          data-src-animate="true"
          className={`mt-8 break-words font-serif text-[72px] font-semibold leading-[1.05] tracking-[0.04em] text-[#2c1d10] ${titleUpper ? "uppercase tracking-[0.08em]" : ""}`}
        >
          {sourcesTitleLines[0]}
          <br />
          {sourcesTitleLines[1] ?? ""}
        </h2>

        <p
          data-src-animate="true"
          className="mt-5 break-words font-serif text-[30px] leading-snug text-[#4f3824]"
        >
          {c.sourcesSubtitle}
        </p>

        <div data-src-animate="true" className="mt-8 w-[220px]">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px flex-1 bg-[#b98634]/60" />
            <span className="text-2xl text-[#b98634]">✥</span>
            <span className="h-px flex-1 bg-[#b98634]/60" />
          </div>
        </div>

        <div
          data-src-animate="true"
          className="relative mt-10 w-full max-w-[650px] rounded-[28px] border border-[#c99a55]/70 bg-[#f8ecd8]/78 px-8 py-12 shadow-[0_28px_70px_rgba(88,55,20,0.18)] backdrop-blur-md"
        >
          <div className="absolute left-1/2 top-0 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#d8bc7b] bg-[#b78332] text-white shadow-lg">
            <BookOpen className="h-9 w-9" strokeWidth={1.4} />
          </div>

          <p className="mt-4 break-words font-serif text-[27px] leading-relaxed text-[#3e2a19]">
            {c.sourcesIntro}
          </p>

          <div className="mx-auto my-8 w-[180px]">
            <div className="flex items-center justify-center gap-4">
              <span className="h-px flex-1 bg-[#b98634]/60" />
              <span className="text-xl text-[#b98634]">✥</span>
              <span className="h-px flex-1 bg-[#b98634]/60" />
            </div>
          </div>

          <h3 className="break-words font-serif text-[48px] font-semibold leading-tight text-[#2f2013]">
            {c.publicationTitleLine1}
            <br />
            {c.publicationTitleLine2}
          </h3>

          <div className="mx-auto my-8 w-[180px]">
            <div className="flex items-center justify-center gap-4">
              <span className="h-px flex-1 bg-[#b98634]/60" />
              <span className="text-xl text-[#b98634]">✥</span>
              <span className="h-px flex-1 bg-[#b98634]/60" />
            </div>
          </div>

          <p className="break-words font-serif text-[27px] leading-relaxed text-[#3e2a19]">
            {c.publishedByLead}
            <br />
            <strong>{c.ministryName}</strong>
            <br />
            {c.governmentLine}
          </p>
        </div>

        <div data-src-animate="true" className="mt-10 w-[220px]">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px flex-1 bg-[#b98634]/60" />
            <span className="text-2xl text-[#b98634]">✥</span>
            <span className="h-px flex-1 bg-[#b98634]/60" />
          </div>
        </div>

        <p
          data-src-animate="true"
          className="mt-6 whitespace-pre-line break-words font-serif text-[25px] leading-relaxed text-[#3e2a19]"
        >
          {c.footerNote}
        </p>
      </div>
    </ReligionsScaledPage>
  );
}
