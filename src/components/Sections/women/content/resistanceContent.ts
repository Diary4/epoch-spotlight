import type { WomenLangCode } from "@/components/Sections/women/womenLanguage";
import { womenCardLabels } from "@/components/Sections/women/womenLanguage";
import { resistanceDetailsByLang } from "@/components/Sections/women/content/resistanceDetails";
import { kuResistanceList, kuResistancePageCopy } from "@/components/Sections/women/content/kuWomenContentData";

export type ResistanceFigureListItem = {
  id: string;
  name: string;
  role: string;
  teaser: string;
  listIcon: "crown" | "flower";
};

export type ResistanceDetailContent = {
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

/** @deprecated Use ResistanceFigureListItem for lists and ResistanceDetailContent for detail pages. */
export type ResistanceFigureCopy = ResistanceFigureListItem & {
  nameLine1: string;
  nameLine2: string;
  knownFor: string;
  legacy: string;
  placeEra: string;
  quote: string;
};

export type ResistancePageCopy = {
  backToWomen: string;
  backToList: string;
  partLabel: string;
  heroTitle1: string;
  heroTitle2: string;
  heroSubtitle: string;
  heroIntro: string;
  legacyTitle: string;
  legacySubtitle: string;
  quotes: { text: string; author: string }[];
};

const pageCopy: Record<WomenLangCode, ResistancePageCopy> = {
  en: {
    backToWomen: "Back to Women",
    backToList: "Back to resistance list",
    partLabel: "Part two",
    heroTitle1: "Women of",
    heroTitle2: "Resistance",
    heroSubtitle: "Voices of courage.",
    heroIntro:
      "Commanders, journalists, and young women who faced armies, dictators, and occupation—and helped write Kurdish resistance across the nineteenth century to today.",
    legacyTitle: "Legacy of courage",
    legacySubtitle: "Defiance, sacrifice, and hope.",
    quotes: [
      { text: "Kill me, but thousands of Kurds will wake up.", author: "Leyla Qasim" },
      { text: "Her voice carried a message of courage.", author: "Shifa Gardi" },
      { text: "My sons were sacrificed for the soil and the homeland; keep your morale high and never leave the frontlines.", author: "Aisha Taha" },
    ],
  },
  ku: {
    backToWomen: "گەڕانەوە بۆ ژنان",
    backToList: "گەڕانەوە بۆ لیستی بەرخۆدان",
    partLabel: "بەشی دووەم",
    heroTitle1: "ژنانی",
    heroTitle2: "بەرخۆدان",
    heroSubtitle: "دەنگی ئازایەتی.",
    ...kuResistancePageCopy,
    legacyTitle: "میراتی ئازایەتی",
    legacySubtitle: "سەرهەڵدان، قوربانی، و هیوا.",
    quotes: [
      { text: "بمکوژە، بەڵام هەزاران کورد لە خەو هەستن.", author: "لەیلا قاسم" },
      { text: "دەنگی پەیامی ئازایەتی هەڵگرت.", author: "شیفا گەردی" },
      { text: "کوڕەکانم قوربانی خاک و نیشتمان بوون؛ مۆڕاڵەکانتان بەرز بهێڵنەوە و هەرگیز هێڵی پێشەوە مەهێڵن.", author: "عائشە تاها" },
    ],
  },
  ar: {
    backToWomen: "العودة إلى النساء",
    backToList: "العودة إلى قائمة المقاومة",
    partLabel: "الجزء الثاني",
    heroTitle1: "نساء",
    heroTitle2: "المقاومة",
    heroSubtitle: "أصوات الشجاعة.",
    heroIntro:
      "قائدات وصحفيات وشابات واجهن الجيوش والديكتاتوريات والاحتلال—وساهمن في كتابة المقاومة الكردية من القرن التاسع عشر إلى اليوم.",
    legacyTitle: "إرث الشجاعة",
    legacySubtitle: "التحدي والتضحية والأمل.",
    quotes: [
      { text: "اقتلوني، لكن آلاف الكرد سيستيقظون.", author: "ليلى قاسم" },
      { text: "حمل صوتها رسالة شجاعة.", author: "شفا گردی" },
      { text: "ضُحي بأبنائي من أجل التربة والوطن؛ حافظوا على معنوياتكم مرتفعة ولا تغادروا خطوط المواجهة أبداً.", author: "عائشة طه" },
    ],
  },
};

const listByLang: Record<WomenLangCode, ResistanceFigureListItem[]> = {
  en: [
    {
      id: "khaja-bawa",
      name: "Khaja Bawa",
      role: "First Female Peshmerga Fighter · Military Commander",
      teaser:
        "Martyred on March 11, 1991 at the forefront of Erbil's uprising — she smuggled weapons, treated wounded revolutionaries, and never retreated.",
      listIcon: "crown",
    },
    {
      id: "aisha-taha",
      name: "Aisha Taha",
      role: "Symbol of Resilience and Patriotism",
      teaser:
        "After losing three Peshmerga sons in a single battle against ISIS, she turned grief into defiance and became a spiritual mother to every defender.",
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
      id: "layla-qasim",
      name: "Leyla Qasim",
      role: "Student Activist · Kurdish Martyr · National Symbol",
      teaser:
        "Executed at 22, her final words — \"Kill me, but thousands of Kurds will wake up\" — became among the most repeated in Kurdish history.",
      listIcon: "flower",
    },
    {
      id: "margaret-george-shilo",
      name: "Margaret George Shello",
      role: "First Female Peshmerga Fighter · Military Commander",
      teaser:
        "A Christian Assyrian who became commander of an all-male Peshmerga unit — Western media called her the 'Joan of Arc of the Kurdish Revolution.'",
      listIcon: "crown",
    },
    {
      id: "qadam-kher",
      name: "Qadem Xer",
      role: "Tribal Leader · Military Commander · Patriot",
      teaser:
        "When her brothers fell fighting Reza Shah, she donned battle attire and led Luristan's tribes for years against the Iranian army.",
      listIcon: "crown",
    },
  ],
  ku: kuResistanceList,
  ar: [
    {
      id: "khaja-bawa",
      name: "خاجة باوا",
      role: "أول مقاتلة بيشمركية · قائدة عسكرية",
      teaser:
        "استُشهدت في ١١ مارس ١٩٩١ في طليعة انتفاضة أربيل — هربّت الأسلحة، عالجت الثوار الجرحى، ولم تتراجع أبداً.",
      listIcon: "crown",
    },
    {
      id: "aisha-taha",
      name: "عائشة طه",
      role: "رمز الصمود والوطنية",
      teaser:
        "بعد فقدان ثلاثة أبناء بيشمركة في معركة واحدة ضد داعش، حوّلت الحزن إلى تحدٍ وأصبحت أمّاً روحية لكل مدافع.",
      listIcon: "flower",
    },
    {
      id: "shifa-gardi",
      name: "شفا گردی",
      role: "صحفية ميدانية · مقدمة · مديرة إنتاج في روداو",
      teaser:
        "مراسلة رائدة استشهدت أثناء تغطية الحرب ضد داعش — أول صحفية كردية تستشهد في خطوط المواجهة.",
      listIcon: "flower",
    },
    {
      id: "layla-qasim",
      name: "ليلى قاسم",
      role: "ناشطة طالبة · شهيدة كردية · رمز وطني",
      teaser:
        "أُعدمت في الثانية والعشرين؛ كلماتها الأخيرة — «اقتلوني، لكن آلاف الكرد سيستيقظون» — من أكثر العبارات تكراراً في التاريخ الكردي.",
      listIcon: "flower",
    },
    {
      id: "margaret-george-shilo",
      name: "مارغريت جورج شيلو",
      role: "أول مقاتلة بيشمركية · قائدة عسكرية",
      teaser:
        "آشورية مسيحية أصبحت قائدة لوحدة بيشمركية من الرجال فقط — أطلق عليها الإعلام الغربي لقب «جان دارك الثورة الكردية».",
      listIcon: "crown",
    },
    {
      id: "qadam-kher",
      name: "قدم خير",
      role: "زعيمة قبلية · قائدة عسكرية · وطنية",
      teaser:
        "عندما سقط إخوتها في مواجهة رضا شاه، ارتدت لباس المعركة وقادت قبائل لورستان لسنوات ضد الجيش الإيراني.",
      listIcon: "crown",
    },
  ],
};

export function getResistancePageCopy(lang: WomenLangCode): ResistancePageCopy {
  return pageCopy[lang];
}

export function getResistanceWomen(lang: WomenLangCode): ResistanceFigureListItem[] {
  return listByLang[lang];
}

export function getResistanceDetail(id: string, lang: WomenLangCode): ResistanceDetailContent | null {
  const detail = resistanceDetailsByLang[lang][id];
  return detail ? (detail as ResistanceDetailContent) : null;
}

export function resistanceDetailToPanelCards(
  detail: ResistanceDetailContent,
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
