import type { WomenLangCode } from "@/components/Sections/women/womenLanguage";

export type HubCopy = {
  title: string;
  subtitle: string;
  description: string;
  quoteLine1: string;
  quoteLine2: string;
  quoteLine3: string;
  journeyTitle: string;
  journeyDesc: string;
  cards: { historic: string; knowledge: string; resistance: string; culture: string };
};

export const hubCopy: Record<WomenLangCode, HubCopy> = {
  en: {
    title: "The Women of Kurdistan",
    subtitle: "Leadership, knowledge,\nresistance, culture, and legacy.",
    description:
      "Kurdish women have shaped history through leadership, learning, courage, and culture.",
    quoteLine1: "Across generations,",
    quoteLine2: "Kurdish women have remained",
    quoteLine3: "voices of strength and continuity.",
    journeyTitle: "Continue the Journey",
    journeyDesc: "Explore the stories behind each name.",
    cards: { historic: "Historic", knowledge: "Knowledge", resistance: "Resistance", culture: "Culture" },
  },
  ku: {
    title: "ژنانی کوردستان",
    subtitle: "سەرکردایەتی، زانین،\nبەرخۆدان، کولتوور، و میرات.",
    description:
      "ژنانی کورد مێژوو شێوەداوە لە ڕێگەی سەرکردایەتی، فێربوون، ئازایەتی، و کولتوورەوە.",
    quoteLine1: "لە نەوەکان بۆ نەوەکان،",
    quoteLine2: "ژنانی کورد وەک",
    quoteLine3: "دەنگی هێز و بەردەوامی مایەوە.",
    journeyTitle: "بەردەوامبوون لە گەشت",
    journeyDesc: "چیرۆکەکانی پشت هەر ناوێک بگەڕێ.",
    cards: { historic: "مێژوویی", knowledge: "زانین", resistance: "بەرخۆدان", culture: "کولتوور" },
  },
  ar: {
    title: "نساء كردستان",
    subtitle: "القيادة، المعرفة،\nالمقاومة، الثقافة، والإرث.",
    description:
      "شكّلت النساء الكرديات التاريخ عبر القيادة والتعلم والشجاعة والثقافة.",
    quoteLine1: "عبر الأجيال،",
    quoteLine2: "بقيت النساء الكرديات",
    quoteLine3: "أصوات قوة واستمرارية.",
    journeyTitle: "تابع الرحلة",
    journeyDesc: "استكشف القصص وراء كل اسم.",
    cards: { historic: "تاريخي", knowledge: "المعرفة", resistance: "المقاومة", culture: "الثقافة" },
  },
};
