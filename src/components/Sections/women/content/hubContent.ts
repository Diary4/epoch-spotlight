import type { WomenLangCode } from "@/components/Sections/women/womenLanguage";
import { kuHubCopy } from "@/components/Sections/women/content/kuWomenContentData";

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
    subtitle: "Leadership, politics,\nresistance, culture, and legacy.",
    description:
      "To celebrate Kurdish women in history, politics, literature, resistance, education, and culture — delivering powerful, emotional profiles that every visitor can connect with.",
    quoteLine1: "Across generations,",
    quoteLine2: "Kurdish women have remained",
    quoteLine3: "voices of strength and continuity.",
    journeyTitle: "Continue the Journey",
    journeyDesc: "Explore the stories behind each name.",
    cards: { historic: "Historic", knowledge: "Political", resistance: "Resistance", culture: "Culture" },
  },
  ku: kuHubCopy,
  ar: {
    title: "نساء كردستان",
    subtitle: "القيادة، السياسة،\nالمقاومة، الثقافة، والإرث.",
    description:
      "شكّلت النساء الكرديات التاريخ عبر القيادة والتعلم والشجاعة والثقافة.",
    quoteLine1: "عبر الأجيال،",
    quoteLine2: "بقيت النساء الكرديات",
    quoteLine3: "أصوات قوة واستمرارية.",
    journeyTitle: "تابع الرحلة",
    journeyDesc: "استكشف القصص وراء كل اسم.",
    cards: { historic: "تاريخي", knowledge: "السياسة", resistance: "المقاومة", culture: "الثقافة" },
  },
};
