import {
  Church,
  UsersRound,
  HeartHandshake,
  Sparkles,
  ScrollText,
  Scale,
  Flag,
  Award,
} from "lucide-react";

import bg2 from "@/assets/images/religions/r-8.webp";
import leadersImg from "@/assets/images/religions/coexistence/coexistence.jpeg";
import cradleImg from "@/assets/images/religions/cradle.jpeg";
import sharedImg from "@/assets/images/religions/sharedlife/cover.jpeg";
import nationsImg from "@/assets/images/religions/nations.webp";
import buildingImg from "@/assets/mainImages/building.webp";
import parliamentImg from "@/assets/images/religions/rights/parliment.jpeg";
import presidencyImg from "@/assets/images/religions/history/history.jpeg";
import faithsImg from "@/assets/images/religions/faiths.webp";

export type ReligionsLangCode = "en" | "ku" | "ar";

export type SectionCardId =
  | "introduction"
  | "history"
  | "leaders"
  | "nations"
  | "faiths"
  | "sharedLife"
  | "rights"
  | "closing";

export type SectionCard = {
  id: SectionCardId;
  title: string;
  image: string;
  icon: typeof Church;
  color: string;
  number: string;
  line: string;
};

export type IntroPillar = {
  title: string;
  body: string;
  image: string;
};

export type ReligionsPageContent = {
  languageLabel: string;
  title: string[];
  subtitle: string;
  description: string;
  cards: SectionCard[];
  detailComingSoon: string;
  detailBack: string;
  openLabel: string;
  attractEyebrow: string;
  attractCaption: string[];
  attractCaptionStrong: string;
  attractEnter: string;
  attractEnterHint: string;
  attractFooter: [string, string];
  introLabel: string;
  introTitle: string;
  introBody: string;
  introQuote: string;
  introPillars: IntroPillar[];
  introCta: string;
  introCtaHint: string;
  hubEyebrow: string;
  hubTitle: string;
  hubTitleEmphasis: string;
  hubHint: string;
  guidedJourney: string;
  guidedJourneyHint: string;
  closingEyebrow: string;
  closingTitle: string;
  closingTitleEmphasis: string;
  closingQuote: string[];
  closingCore: string;
  closingCoreHint: string;
  returnToHub: string;
  returnToHubHint: string;
  edgeHome: string;
  edgeChapters: string;
};

export const religionsHeroImage = bg2;

export const religionsMemoryImages = [
  bg2,
  cradleImg,
  faithsImg,
  nationsImg,
  leadersImg,
  sharedImg,
] as const;

export const religionsPageContent: Record<ReligionsLangCode, ReligionsPageContent> = {
  en: {
    languageLabel: "ENGLISH",
    title: ["Religious & National Diversity", "in", "Kurdistan"],
    subtitle: "Kurdistan: The Cradle of Coexistence",
    description:
      "Across faiths, languages, and cultures, Kurdistan stands as a timeless home of respect, unity, and shared heritage.",
    attractEyebrow: "The living memory of a shared homeland",
    attractCaption: ["Different faiths. Different languages.", "One shared homeland."],
    attractCaptionStrong: "One shared homeland.",
    attractEnter: "Touch to enter",
    attractEnterHint: "Let the stories find you",
    attractFooter: ["ERBIL · KURDISTAN REGION", "TOUCHSCREEN · ENGLISH"],
    introLabel: "Introduction",
    introTitle: "A land where many peoples share one home",
    introBody:
      "This journey invites you into Kurdistan's story of coexistence — through faiths, nations, leaders, shared life, and the rights that protect belonging.",
    introQuote: "Not enduring the other — celebrating one another.",
    introPillars: [
      {
        title: "Faiths",
        body: "Sacred paths living side by side.",
        image: faithsImg,
      },
      {
        title: "Nations",
        body: "Languages, cultures, and belonging.",
        image: nationsImg,
      },
      {
        title: "Shared Life",
        body: "Celebrations, solidarity, and everyday respect.",
        image: sharedImg,
      },
      {
        title: "Rights",
        body: "Recognition made durable by law.",
        image: parliamentImg,
      },
    ],
    introCta: "Begin the journey",
    introCtaHint: "Eight chapters of coexistence",
    hubEyebrow: "Eight paths · one shared story",
    hubTitle: "Choose a",
    hubTitleEmphasis: "living memory.",
    hubHint: "Tap a memory to enter · swipe left or right to browse.",
    guidedJourney: "Begin the guided journey",
    guidedJourneyHint: "Touch to begin · eight chapters",
    closingEyebrow: "The threads return to one centre",
    closingTitle: "We are one",
    closingTitleEmphasis: "living homeland.",
    closingQuote: [
      "Every identity has value.",
      "Every community belongs.",
      "The future is built together.",
    ],
    closingCore: "KURDISTAN",
    closingCoreHint: "One shared homeland",
    returnToHub: "Touch to explore another story",
    returnToHubHint: "Return to the constellation",
    edgeHome: "Home",
    edgeChapters: "Chapters",
    cards: [
      {
        id: "introduction",
        title: "The Cradle",
        image: cradleImg,
        icon: Sparkles,
        color: "#7a4a12",
        number: "01",
        line: "A living identity",
      },
      {
        id: "history",
        title: "History",
        image: presidencyImg,
        icon: ScrollText,
        color: "#3a2f12",
        number: "02",
        line: "Centuries of memory",
      },
      {
        id: "leaders",
        title: "Coexistence",
        image: leadersImg,
        icon: Award,
        color: "#52351a",
        number: "03",
        line: "Definition · leaders · values",
      },
      {
        id: "nations",
        title: "Nations",
        image: nationsImg,
        icon: UsersRound,
        color: "#16466b",
        number: "04",
        line: "Language · culture · belonging",
      },
      {
        id: "faiths",
        title: "Faiths",
        image: faithsImg,
        icon: Church,
        color: "#244b1f",
        number: "05",
        line: "Sacred stories · living traditions",
      },
      {
        id: "sharedLife",
        title: "Shared Life",
        image: sharedImg,
        icon: HeartHandshake,
        color: "#cf921d",
        number: "06",
        line: "Joy · memory · solidarity",
      },
      {
        id: "rights",
        title: "Rights & Recognition",
        image: parliamentImg,
        icon: Scale,
        color: "#52235f",
        number: "07",
        line: "Protection made visible",
      },
      {
        id: "closing",
        title: "Closing",
        image: buildingImg,
        icon: Flag,
        color: "#6b1d1d",
        number: "08",
        line: "One shared homeland",
      },
    ],
    detailComingSoon: "Detailed content for this section is coming soon.",
    detailBack: "Back to overview",
    openLabel: "Explore",
  },
  ku: {
    languageLabel: "کوردی",
    title: ["ئاینی و فرە نەتەوەیی", "لە کوردستان"],
    subtitle: "کوردستان: لانکەی پێکەوە ژیان",
    description:
      "لە نێوان ئاین و زمان و کلتوورە جیاوازەکاندا، کوردستان ماڵی ڕێز و یەکگرتوویی و میراتی هاوبەشە.",
    attractEyebrow: "یادەوەری زیندووی وڵاتێکی هاوبەش",
    attractCaption: ["ئاین و زمانە جیاوازەکان.", "یەک وڵاتی هاوبەش."],
    attractCaptionStrong: "یەک وڵاتی هاوبەش.",
    attractEnter: "دەست لێبدە بۆ چوونە ژوورەوە",
    attractEnterHint: "با چیرۆکەکان بدۆزیتەوە",
    attractFooter: ["هەولێر · هەرێمی کوردستان", "تاکتایل · کوردی"],
    introLabel: "پێشەکی",
    introTitle: "وڵاتێک کە گەلانی زۆر یەک ماڵی هاوبەشە",
    introBody:
      "ئەم گەشتە بانگەشەی چیرۆکی پێکەوەژیانی کوردستان دەکات — لە ڕێگەی ئاین، نەتەوە، ڕابەران، ژیانی هاوبەش و ئەو مافانەی سەر بە یەکگرتوویی پاراستوون.",
    introQuote: "نە خۆساڕاستن بۆ یەکتر — بەڵکو یەکتر بەرزڕاگرتن.",
    introPillars: [
      {
        title: "ئاینەکان",
        body: "ڕێگا پیرۆزەکان لە تەنیشت یەکتر دەژین.",
        image: faithsImg,
      },
      {
        title: "نەتەوەکان",
        body: "زمان و کلتوور و سەر بە یەکبوون.",
        image: nationsImg,
      },
      {
        title: "ژیانی هاوبەش",
        body: "ئاهەنگ و هاوکاری و ڕێزی ڕۆژانە.",
        image: sharedImg,
      },
      {
        title: "مافەکان",
        body: "ناسینەوە بە یاسا بەهێز دەبێت.",
        image: parliamentImg,
      },
    ],
    introCta: "دەستپێکردنی گەشت",
    introCtaHint: "هەشت بەشی پێکەوەژیان",
    hubEyebrow: "هەشت ڕێگا · یەک چیرۆکی هاوبەش",
    hubTitle: "یادەوەرییەکی",
    hubTitleEmphasis: "زیندوو هەڵبژێرە.",
    hubHint: "دەست لێبدە بۆ چوونە ژوورەوە · بۆ گەڕان لای ڕاست یان چەپ بکێشە.",
    guidedJourney: "دەستپێکردنی گەشتی ڕێنماییکراو",
    guidedJourneyHint: "دەست لێبدە · هەشت بەش",
    closingEyebrow: "تەنەکان دەگەڕێنەوە بۆ یەک ناوەند",
    closingTitle: "ئێمە یەک",
    closingTitleEmphasis: "وڵاتی زیندووین.",
    closingQuote: [
      "هەموو ناسنامەیەک بەنرخە.",
      "هەموو کۆمەڵگەیەک سەر بە ئەم وڵاتە.",
      "داهاتوو پێکەوە دروست دەکرێت.",
    ],
    closingCore: "کوردستان",
    closingCoreHint: "یەک وڵاتی هاوبەش",
    returnToHub: "دەست لێبدە بۆ چیرۆکێکی تر",
    returnToHubHint: "گەڕانەوە بۆ ئەستێرەکان",
    edgeHome: "سەرەتا",
    edgeChapters: "بەشەکان",
    cards: [
      {
        id: "introduction",
        title: "لانکە",
        image: cradleImg,
        icon: Sparkles,
        color: "#7a4a12",
        number: "01",
        line: "ناسنامەیەکی زیندوو",
      },
      {
        id: "history",
        title: "مێژوو",
        image: presidencyImg,
        icon: ScrollText,
        color: "#3a2f12",
        number: "02",
        line: "سەدەکان یادەوەری",
      },
      {
        id: "leaders",
        title: "پێکەوەژیان",
        image: leadersImg,
        icon: Award,
        color: "#52351a",
        number: "03",
        line: "دەنگی یەکگرتوویی",
      },
      {
        id: "nations",
        title: "نەتەوەکان",
        image: nationsImg,
        icon: UsersRound,
        color: "#16466b",
        number: "04",
        line: "زمان · کلتوور · هاوپێچی",
      },
      {
        id: "faiths",
        title: "ئاینەکان",
        image: faithsImg,
        icon: Church,
        color: "#244b1f",
        number: "05",
        line: "چیرۆکی پیرۆز · نەریتە زیندووەکان",
      },
      {
        id: "sharedLife",
        title: "ژیانی هاوبەش",
        image: sharedImg,
        icon: HeartHandshake,
        color: "#cf921d",
        number: "06",
        line: "خۆشی · یادەوەری · هاوپێچی",
      },
      {
        id: "rights",
        title: "ماف و ناسینەوە",
        image: parliamentImg,
        icon: Scale,
        color: "#52235f",
        number: "07",
        line: "پاراستن بە ڕوونی",
      },
      {
        id: "closing",
        title: "کۆتایی",
        image: buildingImg,
        icon: Flag,
        color: "#6b1d1d",
        number: "08",
        line: "یەک وڵاتی هاوبەش",
      },
    ],
    detailComingSoon: "ناوەڕۆکی ورد بۆ ئەم بەشە بەزووی دێت.",
    detailBack: "گەڕانەوە",
    openLabel: "گەڕان",
  },
  ar: {
    languageLabel: "العربية",
    title: ["التنوع الديني والقومي", " في كوردستان"],
    subtitle: "كوردستان: مهد التعايش",
    description:
      "عبر الأديان واللغات والثقافات، تظل كوردستان موطناً دائماً للاحترام والوحدة والتراث المشترك.",
    attractEyebrow: "الذاكرة الحية لوطن مشترك",
    attractCaption: ["أديان مختلفة. لغات مختلفة.", "وطن واحد مشترك."],
    attractCaptionStrong: "وطن واحد مشترك.",
    attractEnter: "المس للدخول",
    attractEnterHint: "دع القصص تجدك",
    attractFooter: ["أربيل · إقليم كوردستان", "شاشة لمس · العربية"],
    introLabel: "مقدمة",
    introTitle: "أرض يشترك فيها كثير من الشعوب في وطن واحد",
    introBody:
      "هذه الرحلة تدعوك إلى قصة التعايش في كوردستان — عبر الأديان والقوميات والقادة والحياة المشتركة والحقوق التي تحفظ الانتماء.",
    introQuote: "ليس تحمّل الآخر — بل الاحتفاء به.",
    introPillars: [
      {
        title: "الأديان",
        body: "أديان متعددة ازدهرت هنا منذ فجر التاريخ.",
        image: faithsImg,
      },
      {
        title: "القوميات",
        body: "الكورد والآشوريون والأرمن والتركمان وغيرهم.",
        image: nationsImg,
      },
      {
        title: "القوانين",
        body: "أطر قانونية تحمي كل مجتمع.",
        image: parliamentImg,
      },
      {
        title: "التعايش",
        body: "هوية حية، لا مجرد ذاكرة تاريخية.",
        image: sharedImg,
      },
    ],
    introCta: "ابدأ الرحلة",
    introCtaHint: "ثمانية فصول من التعايش",
    hubEyebrow: "ثمانية مسارات · قصة واحدة",
    hubTitle: "اختر",
    hubTitleEmphasis: "ذاكرة حية.",
    hubHint: "المس ذاكرة للدخول · اسحب يميناً أو يساراً للتصفح.",
    guidedJourney: "ابدأ الرحلة الموجهة",
    guidedJourneyHint: "المس للبدء · ثمانية فصول",
    closingEyebrow: "الخيوط تعود إلى مركز واحد",
    closingTitle: "نحن",
    closingTitleEmphasis: "وطن حي واحد.",
    closingQuote: [
      "كل هوية لها قيمة.",
      "كل مجتمع ينتمي.",
      "المستقبل يُبنى معاً.",
    ],
    closingCore: "كوردستان",
    closingCoreHint: "وطن مشترك واحد",
    returnToHub: "المس لاستكشاف قصة أخرى",
    returnToHubHint: "العودة إلى المجموعة",
    edgeHome: "الرئيسية",
    edgeChapters: "الفصول",
    cards: [
      {
        id: "introduction",
        title: "مهد",
        image: cradleImg,
        icon: Sparkles,
        color: "#7a4a12",
        number: "01",
        line: "هوية حية",
      },
      {
        id: "history",
        title: "التاريخ",
        image: presidencyImg,
        icon: ScrollText,
        color: "#3a2f12",
        number: "02",
        line: "قرون من الذاكرة",
      },
      {
        id: "leaders",
        title: "التعايش",
        image: leadersImg,
        icon: Award,
        color: "#52351a",
        number: "03",
        line: "أصوات الوحدة",
      },
      {
        id: "nations",
        title: "القوميات",
        image: nationsImg,
        icon: UsersRound,
        color: "#16466b",
        number: "04",
        line: "لغة · ثقافة · انتماء",
      },
      {
        id: "faiths",
        title: "الأديان",
        image: faithsImg,
        icon: Church,
        color: "#244b1f",
        number: "05",
        line: "قصص مقدسة · تقاليد حية",
      },
      {
        id: "sharedLife",
        title: "الحياة المشتركة",
        image: sharedImg,
        icon: HeartHandshake,
        color: "#cf921d",
        number: "06",
        line: "فرح · ذاكرة · تضامن",
      },
      {
        id: "rights",
        title: "الحقوق والاعتراف",
        image: parliamentImg,
        icon: Scale,
        color: "#52235f",
        number: "07",
        line: "حماية مرئية",
      },
      {
        id: "closing",
        title: "الخاتمة",
        image: buildingImg,
        icon: Flag,
        color: "#6b1d1d",
        number: "08",
        line: "وطن مشترك واحد",
      },
    ],
    detailComingSoon: "المحتوى التفصيلي لهذا القسم قادم قريباً.",
    detailBack: "العودة",
    openLabel: "استكشف",
  },
};

export const HUB_NODE_POSITIONS = [
  { left: "50%", top: "11%" },
  { left: "80%", top: "20%" },
  { left: "90%", top: "44%" },
  { left: "80%", top: "70%" },
  { left: "50%", top: "80%" },
  { left: "20%", top: "70%" },
  { left: "10%", top: "44%" },
  { left: "20%", top: "20%" },
] as const;
