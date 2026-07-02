import type { WomenLangCode } from "@/components/Sections/women/womenLanguage";
import { womenCardLabels } from "@/components/Sections/women/womenLanguage";
import { cultureDetailsByLang } from "@/components/Sections/women/content/cultureDetails";
import { arCultureList } from "@/components/Sections/women/content/arWomenContentData";
import { kuCultureList, kuCulturePageCopy } from "@/components/Sections/women/content/kuWomenContentData";

export type CultureFigureListItem = {
  id: string;
  name: string;
  role: string;
  teaser: string;
  listIcon: "crown" | "flower";
};

export type CultureDetailContent = {
  nameLine1: string;
  nameLine2: string;
  role: string;
  metaLine?: string;
  intro: string;
  portraitAlt: string;
  listIcon: "crown" | "flower";
  cards: { icon: string; text: string; title?: string }[];
  quote: string;
  quoteAuthor?: string;
  greatestAchievement?: { title: string; text: string };
  whySheMatters?: { title: string; text: string };
  didYouKnow?: { title: string; text: string };
};

export type CulturePageCopy = {
  backToWomen: string;
  backToList: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubtitle: string;
  heroIntro: string;
  livingMemoryTitle: string;
  livingMemoryText: string;
};

const pageCopy: Record<WomenLangCode, CulturePageCopy> = {
  en: {
    backToWomen: "Back to Women",
    backToList: "Back to culture list",
    heroTitleLine1: "Women of Culture",
    heroTitleLine2: "and Memory",
    heroSubtitle: "Poetry, oral tradition, and cultural preservation.",
    heroIntro:
      "Not every influential woman left official records. Some live on through song, poetry, oral tradition, and the memory of their communities.",
    livingMemoryTitle: "Living memory",
    livingMemoryText:
      "Oral tradition carried Kurdish identity across generations. Where written records were few, women helped preserve memory.",
  },
  ku: {
    backToWomen: "گەڕانەوە بۆ ژنان",
    backToList: "گەڕانەوە بۆ لیستی کولتوور",
    heroTitleLine1: "ژنانی کولتووری",
    heroTitleLine2: "و یادەوەری",
    heroSubtitle: "شیعر، میراتی دەمبێژ، و پاراستنی کولتوور.",
    ...kuCulturePageCopy,
    livingMemoryTitle: "یادەوەیی زیندوو",
    livingMemoryText:
      "میراتی دەمبێژ ناسنامەی کوردی لە نەوەکان بۆ نەوەکان گواست. لە شوێنێکدا تۆمارە نووسراوەکان کەم بوون، ژنان یارمەتی پاراستنی یادەوەرییان دا.",
  },
  ar: {
    backToWomen: "العودة إلى النساء",
    backToList: "العودة إلى قائمة الثقافة",
    heroTitleLine1: "نساء الثقافة",
    heroTitleLine2: "والذاكرة",
    heroSubtitle: "الشعر، التراث الشفهي، والحفاظ على الثقافة.",
    heroIntro:
      "لم تترك كل امرأة مؤثرة سجلات رسمية. بعضهن يعشن من خلال الأغنية والشعر والتراث الشفهي وذاكرة مجتمعاتهن.",
    livingMemoryTitle: "ذاكرة حية",
    livingMemoryText:
      "حمل التراث الشفهي الهوية الكردية عبر الأجيال. حيث كانت السجلات المكتوبة قليلة، ساعدت النساء في حفظ الذاكرة.",
  },
};

const listByLang: Record<WomenLangCode, CultureFigureListItem[]> = {
  en: [
    {
      id: "eyse-san",
      name: "Eyşe Şan",
      role: "Singer · Voice of Kurdish Resistance · Cultural Icon",
      teaser:
        "Her voice carried Kurdish pain and resistance when speaking Kurdish in public was illegal — she sang anyway.",
      listIcon: "flower",
    },
    {
      id: "pakize-rafik-hilmi",
      name: "Pakize Rafik Hilmi",
      role: "Harvard Linguist · First Kurdish Woman in the Kurdish Academy of Sciences",
      teaser:
        "The first Iraqi student to earn a Harvard master's degree — she opened Kurdish scholarship to the world stage.",
      listIcon: "crown",
    },
    {
      id: "roshan-bedirkhan",
      name: "Roshan Bedirkhan",
      role: "Writer · Cultural Pioneer · Activist",
      teaser:
        "Partner in publishing Hawar and Ronahî, she championed girls' education and the preservation of the Kurdish language.",
      listIcon: "crown",
    },
    {
      id: "nahida-sheikh-salam",
      name: "Nahida Sheikh Salam",
      role: "Writer · Cultural Pioneer · Cultural Activist",
      teaser:
        "Educator, poet, and nationalist who established a school for girls in Sulaymaniyah and mobilized youth for the Kurdish cause.",
      listIcon: "flower",
    },
    {
      id: "hana-malan",
      name: "Hana Malan",
      role: "Oral Tradition Poet · Dengbej Heritage",
      teaser:
        "Her poems survived for centuries through oral transmission — a voice for women who kept Kurdish culture alive without written records.",
      listIcon: "flower",
    },
    {
      id: "kurdistan-mukrayani",
      name: "Dr. Kurdistan Mukrayani",
      role: "Linguist · Academic · Writer & Translator",
      teaser:
        "Among the first Kurdish women to earn a doctorate in Kurdish linguistics and defend the language through rigorous scholarship.",
      listIcon: "crown",
    },
    {
      id: "danielle-mitterrand",
      name: "Danielle Mitterrand",
      role: "Human Rights Activist · First Lady of France · Friend of the Kurdish People",
      teaser:
        "After the Halabja chemical attack, she became one of Europe's most influential voices supporting the Kurdish people.",
      listIcon: "crown",
    },
  ],
  ku: kuCultureList,
  ar: arCultureList,
};

export function getCulturePageCopy(lang: WomenLangCode): CulturePageCopy {
  return pageCopy[lang];
}

export function getCulturePeople(lang: WomenLangCode): CultureFigureListItem[] {
  return listByLang[lang];
}

export function getCultureDetail(id: string, lang: WomenLangCode): CultureDetailContent | null {
  const detail = cultureDetailsByLang[lang][id as keyof (typeof cultureDetailsByLang)["en"]];
  return detail ? (detail as CultureDetailContent) : null;
}

export function cultureDetailToPanelCards(
  detail: CultureDetailContent,
  lang: WomenLangCode,
): { icon: string; title: string; text: string }[] {
  const labels = womenCardLabels[lang];
  const defaultTitles = [labels.knownFor, labels.legacy, labels.placeEra];
  return detail.cards.map((card, index) => ({
    icon: card.icon,
    title: card.title ?? defaultTitles[index] ?? labels.knownFor,
    text: card.text,
  }));
}
