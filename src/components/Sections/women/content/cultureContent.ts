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
    backToList: "Back to literary list",
    heroTitleLine1: "Literary &",
    heroTitleLine2: "Cultural Figures",
    heroSubtitle: "Poets, singers, writers, and voices that preserved Kurdish culture.",
    heroIntro:
      "Women who carried Kurdish identity through poetry, song, journalism, and the written word across generations.",
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
      id: "mastura-ardalan",
      name: "Mastura Ardalan",
      role: "Poet · Historian · First Kurdish Female Writer",
      teaser:
        "Born into the Ardalan ruling family, she became one of Kurdistan's earliest women historians, writing herself into history from exile.",
      listIcon: "flower",
    },
    {
      id: "shifa-gardi",
      name: "Shifa Gardi",
      role: "Field Journalist · Presenter · Output Manager at Rudaw",
      teaser:
        "A pioneering reporter martyred covering the war against ISIS — the first Kurdish female journalist to die on the front lines.",
      listIcon: "flower",
    },
    {
      id: "maryam-khan",
      name: "Maryam Khan",
      role: "The Voice of Kurdistan · Pioneer of Kurdish Radio Singing",
      teaser:
        "The first Kurdish woman to record songs professionally for radio — she saved over 200 traditional songs and precious Kurdish maqams from being lost to history.",
      listIcon: "flower",
    },
    {
      id: "eyse-san",
      name: "Eyşe Şan",
      role: "Singer · Voice of Kurdish Resistance · Cultural Icon",
      teaser:
        "Her voice carried Kurdish pain and resistance when speaking Kurdish in public was illegal — she sang anyway.",
      listIcon: "flower",
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
