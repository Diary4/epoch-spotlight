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
    heroSubtitle: "Leaders in parliament, governance, and civil society.",
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
      id: "leyla-zana",
      name: "Leyla Zana",
      role: "First Kurdish Woman in Turkish Parliament · Sakharov Prize Laureate",
      teaser:
        "She took her parliamentary oath in Kurdish in 1991 — and paid with a decade in prison for turning parliament into a stage for Kurdish rights.",
      listIcon: "crown",
    },
    {
      id: "mayan-khatun",
      name: "Mayan Khatun",
      role: "Yazidi Princess · Leader of the Yazidi Community",
      teaser:
        "She led the Yazidi Supreme Spiritual Council for decades — navigating Ottoman collapse, British rule, and the birth of modern Iraq.",
      listIcon: "crown",
    },
    {
      id: "maryam-khan",
      name: "Maryam Khan",
      role: "The Voice of Kurdistan · Pioneer of Kurdish Radio Singing",
      teaser:
        "The first Kurdish woman to record songs professionally for radio — she saved over 200 traditional songs and precious Kurdish maqams from being lost to history.",
      listIcon: "flower",
    },
  ],
  ku: [
    {
      id: "leyla-zana",
      name: "لەیلا زانا",
      role: "یەکەم ژنانی کورد لە پەرلەمانی تورکیا · خاوەنی خەڵاتی ساخارۆڤ",
      teaser:
        "لە ساڵی ١٩٩١دا سوێندی پەرلەمانی بە کوردی خوێندەوە — و بە دە ساڵ زیندانی بۆ ئەوەی پەرلەمان بکاتە سەکۆیەک بۆ مافەکانی کورد.",
      listIcon: "crown",
    },
    {
      id: "mayan-khatun",
      name: "مەیان خاتوون",
      role: "شازادەی ئێزیدییەکان · میری کۆمەڵگەی ئێزیدی",
      teaser:
        "بۆ زیاتر لە چوار دەیە سەرۆکایەتی ئەنجومەنی ڕۆحیی باڵای ئێزیدییەکان کرد و گەلەکەی لە قۆناغێکی پڕ لە ئاڵنگاریی مێژووییدا پاراست.",
      listIcon: "crown",
    },
    {
      id: "maryam-khan",
      name: "مەریەم خان",
      role: "دەنگی کوردستان · پێشەنگی گۆرانی ڕادیۆیی کوردی",
      teaser:
        "یەکەم ژنانی کورد بوو کە گۆرانی بە پیشەیی بۆ ڕادیۆ تۆمارکرد — زیاتر لە ٢٠٠ گۆرانی نەریتی و مەقامی کوردی لە مێژوودا ڕزگارکرد.",
      listIcon: "flower",
    },
  ],
  ar: [
    {
      id: "leyla-zana",
      name: "ليلى زانا",
      role: "أول امرأة كردية في البرلمان التركي · حائزة جائزة ساخاروف",
      teaser:
        "أدّت القسم البرلماني باللغة الكردية عام 1991 — ودفعت عقداً من السجن لأنها حوّلت البرلمان إلى منصة لحقوق الكرد.",
      listIcon: "crown",
    },
    {
      id: "mayan-khatun",
      name: "ميان خاتون",
      role: "أميرة الإيزيديين · زعيمة المجتمع الإيزيدي",
      teaser:
        "قادت المجلس الروحي الأعلى للإيزيديين لأكثر من أربعة عقود وحافظت على شعبها خلال حقبة تاريخية مليئة بالتحديات.",
      listIcon: "crown",
    },
    {
      id: "maryam-khan",
      name: "مريم خان",
      role: "صوت كردستان · رائدة الغناء الكردي الإذاعي",
      teaser:
        "أول امرأة كردية سجّلت الأغاني مهنةً للإذاعة — أنقذت أكثر من 200 أغنية تقليدية ومقاماً كردياً من الضياع.",
      listIcon: "flower",
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
