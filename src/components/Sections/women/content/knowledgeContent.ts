import type { WomenLangCode } from "@/components/Sections/women/womenLanguage";
import { womenCardLabels } from "@/components/Sections/women/womenLanguage";
import { politicalDetailsByLang } from "@/components/Sections/women/content/politicalDetails";

export type PoliticalFigureListItem = {
  id: string;
  name: string;
  role: string;
  teaser: string;
  listIcon: "crown" | "flower";
};

export type PoliticalDetailContent = {
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

/** @deprecated Use PoliticalFigureListItem and PoliticalDetailContent. */
export type KnowledgePersonCopy = PoliticalFigureListItem & {
  nameLine1: string;
  nameLine2: string;
  intro: string;
  cards: { icon: string; text: string }[];
  quote: string;
};

export type KnowledgePageCopy = {
  backToWomen: string;
  backToList: string;
  heroTitle1: string;
  heroTitle2: string;
  heroSubtitle: string;
  heroIntro: string;
  impactTitle: string;
  impactText: string;
  topics: { poetry: string; history: string; political: string };
};

const pageCopy: Record<WomenLangCode, KnowledgePageCopy> = {
  en: {
    backToWomen: "Back to Women",
    backToList: "Back to political list",
    heroTitle1: "Women",
    heroTitle2: "Political",
    heroSubtitle: "Leaders and voices of power.",
    heroIntro:
      "Princesses, parliamentarians, and community leaders who carried their people through empire, mandate, and modern statehood.",
    impactTitle: "✤ Her Impact",
    impactText: "She became a global symbol of political courage.",
    topics: { poetry: "Poetry", history: "History", political: "Political Women" },
  },
  ku: {
    backToWomen: "گەڕانەوە بۆ ژنان",
    backToList: "گەڕانەوە بۆ لیستی سیاسی",
    heroTitle1: "ژنانی",
    heroTitle2: "سیاسی",
    heroSubtitle: "سەرکردە و دەنگی دەسەڵات.",
    heroIntro:
      "شازادە، پەرلەمانتار، و سەرکردەی کۆمەڵگە کە خەڵکەکەیان بەناو ئیمپراتۆریەت، ماندات، و دەوڵەتی مۆدێرن بەڕێوەبرد.",
    impactTitle: "✤ کاریگەریی",
    impactText: "بوو بە سمبولێکی جیهانی بۆ بوێری سیاسی.",
    topics: { poetry: "شیعر", history: "مێژوو", political: "ژنانی سیاسەتمەدار" },
  },
  ar: {
    backToWomen: "العودة إلى النساء",
    backToList: "العودة إلى القائمة السياسية",
    heroTitle1: "نساء",
    heroTitle2: "السياسة",
    heroSubtitle: "قائدات وأصوات السلطة.",
    heroIntro:
      "أميرات وبرلمانيات وقائدات مجتمع حملن شعوبهن عبر الإمبراطورية والانتداب والدولة الحديثة.",
    impactTitle: "✤ أثرها",
    impactText: "أصبحت رمزاً عالمياً للشجاعة السياسية.",
    topics: { poetry: "الشعر", history: "التاريخ", political: "النساء السياسيات" },
  },
};

const listByLang: Record<WomenLangCode, PoliticalFigureListItem[]> = {
  en: [
    {
      id: "mayan-khatun",
      name: "Mayan Khatun",
      role: "Yazidi Princess · Leader of the Yazidi Community",
      teaser:
        "She led the Yazidi Supreme Spiritual Council for decades — navigating Ottoman collapse, British rule, and the birth of modern Iraq.",
      listIcon: "crown",
    },
    {
      id: "leyla-zana",
      name: "Leyla Zana",
      role: "Political Leader · Human Rights Voice",
      teaser:
        "The first Kurdish woman in the Turkish parliament — a global symbol of political courage who carried her people's voice into public life.",
      listIcon: "crown",
    },
  ],
  ku: [
    {
      id: "mayan-khatun",
      name: "مەیان خاتوون",
      role: "شازادەی ئێزیدی · سەرۆکی کۆمەڵگەی ئێزیدی",
      teaser:
        "بۆ چەندین دەیە سەرۆکی ئەنجومەنی ڕۆحی باڵای ئێزیدی بوو — ڕووبەڕووی ڕووخانی عوسمانی، فەرمانڕەوایی بەریتان، و لەدایکبوونی عێراقی مۆدێرن بووەوە.",
      listIcon: "crown",
    },
    {
      id: "leyla-zana",
      name: "لەیلا زانا",
      role: "سەرکردەی سیاسی · دەنگی مافی مرۆڤ",
      teaser:
        "یەکەم ژنانی کورد لە پەرلەمانی تورکیا — سمبولێکی جیهانی بۆ بوێری سیاسی کە دەنگی گەلەکەی گەیاندە ژیانی گشتی.",
      listIcon: "crown",
    },
  ],
  ar: [
    {
      id: "mayan-khatun",
      name: "ميان خاتون",
      role: "الأميرة الإيزيدية · زعيمة المجتمع الإيزيدي",
      teaser:
        "قادت المجلس الروحي الأعلى للإيزيديين لعقود — متنقلة بين انهيار العثمانيين والحكم البريطاني وولادة العراق الحديث.",
      listIcon: "crown",
    },
    {
      id: "leyla-zana",
      name: "ليلى زانا",
      role: "قائدة سياسية · صوت لحقوق الإنسان",
      teaser:
        "أول امرأة كردية في البرلمان التركي — رمز عالمي للشجاعة السياسية حملت صوت شعبها إلى الحياة العامة.",
      listIcon: "crown",
    },
  ],
};

export function getKnowledgePageCopy(lang: WomenLangCode): KnowledgePageCopy {
  return pageCopy[lang];
}

/** @deprecated Use getPoliticalPeople */
export function getKnowledgePeople(lang: WomenLangCode): PoliticalFigureListItem[] {
  return listByLang[lang];
}

export function getPoliticalPeople(lang: WomenLangCode): PoliticalFigureListItem[] {
  return listByLang[lang];
}

export function getPoliticalDetail(id: string, lang: WomenLangCode): PoliticalDetailContent | null {
  const detail = politicalDetailsByLang[lang][id as keyof (typeof politicalDetailsByLang)["en"]];
  return detail ? (detail as PoliticalDetailContent) : null;
}

export function politicalDetailToPanelCards(
  detail: PoliticalDetailContent,
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
