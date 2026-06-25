import type { WomenLangCode } from "@/components/Sections/women/womenLanguage";
import { womenCardLabels } from "@/components/Sections/women/womenLanguage";
import { resistanceDetailsByLang } from "@/components/Sections/women/content/resistanceDetails";

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
      { text: "She fought for a homeland greater than herself.", author: "Margaret George Shilo" },
    ],
  },
  ku: {
    backToWomen: "گەڕانەوە بۆ ژنان",
    backToList: "گەڕانەوە بۆ لیستی بەرخۆدان",
    partLabel: "بەشی دووەم",
    heroTitle1: "ژنانی",
    heroTitle2: "بەرخۆدان",
    heroSubtitle: "دەنگی ئازایەتی.",
    heroIntro:
      "فەرماندە، ڕۆژنامەنووس، و ژنانی گەنج کە ڕووبەڕووی سوپا، دیکتاتۆر، و داگیرکاری بوونەوە—و یارمەتی نووسینی بەرخۆدانی کوردیان دا لە سەدەی نوزدەهەم تا ئەمڕۆ.",
    legacyTitle: "میراتی ئازایەتی",
    legacySubtitle: "سەرهەڵدان، قوربانی، و هیوا.",
    quotes: [
      { text: "بمکوژە، بەڵام هەزاران کورد لە خەو هەستن.", author: "لەیلا قاسم" },
      { text: "دەنگی پەیامی ئازایەتی هەڵگرت.", author: "شیفا گەردی" },
      { text: "بۆ نیشتمانێکی گەورەتر لە خۆی شەڕی کرد.", author: "مارگەریت جۆرج شیلۆ" },
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
      { text: "قاتلت من أجل وطن أعظم من نفسها.", author: "مارغريت جورج شيلو" },
    ],
  },
};

const listByLang: Record<WomenLangCode, ResistanceFigureListItem[]> = {
  en: [
    {
      id: "khaja-bawa",
      name: "Khaja Bawa",
      role: "Heroine of the 1991 uprising",
      teaser:
        "A courageous daughter of Erbil whose life was given during the city's uprising for freedom.",
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
    {
      id: "shifa-gardi",
      name: "Shifa Gardi",
      role: "Field Journalist · Presenter · Output Manager at Rudaw",
      teaser:
        "A pioneering reporter martyred covering the war against ISIS — the first Kurdish female journalist to die on the front lines.",
      listIcon: "flower",
    },
    {
      id: "qara-fateme",
      name: "Kara Fatima",
      role: "Tribal Leader · Military Commander · Diplomat",
      teaser:
        "She marched to Istanbul with 500 fighters during the Crimean War — a \"Kurdish lioness\" whose portrait appeared in the Illustrated London News.",
      listIcon: "crown",
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
      role: "First Female Peshmerga",
      teaser:
        "An Assyrian woman who picked up a weapon in 1963 and became commander of an all-male Peshmerga unit.",
      listIcon: "crown",
    },
  ],
  ku: [
    {
      id: "khaja-bawa",
      name: "خەجە باوا",
      role: "پاڵەوانی سەرهەڵدانی ١٩٩١",
      teaser: "کچێکی ئازای هەولێر کە ژیانی لە سەرهەڵدانی شارەکە بۆ ئازادی دا.",
      listIcon: "crown",
    },
    {
      id: "qadam-kher",
      name: "قەدەم خێر",
      role: "سەرۆکی هۆز · فەرماندەی سەربازی · وڵاتپارێز",
      teaser:
        "کاتێک براکانی لە شەڕی دژی ڕەزا شا کوژران، جلی شەڕی لەبەرکرد و ساڵان بە سەرکردایەتی هۆزەکانی لۆرستان بەرامبەر سوپای ئێران وەستا.",
      listIcon: "crown",
    },
    {
      id: "shifa-gardi",
      name: "شیفا گەردی",
      role: "ڕۆژنامەنووسی مەیدان · پێشکەشکار · بەڕێوەبەری بەرهەم لە ڕووداو",
      teaser:
        "ڕۆژنامەنووسێکی پێشەنگ کە لە کاتی ڕووماڵکردنی شەڕی دژی داعش شەهید بوو — یەکەم ژنانی ڕۆژنامەنووسی کوردی لە هێڵی پێشەوە.",
      listIcon: "flower",
    },
    {
      id: "qara-fateme",
      name: "قەرە فاتیمە",
      role: "سەرۆکی هۆز · فەرماندەی سەربازی · دیپلۆمات",
      teaser:
        "لە جەنگی قریمەدا بە ٥٠٠ شەڕڤان ڕۆیشتە ئیستانبول — «شێری کوردی» کە وێنەکەی لە Illustrated London News بڵاوکرایەوە.",
      listIcon: "crown",
    },
    {
      id: "layla-qasim",
      name: "لەیلا قاسم",
      role: "چالاکوانی خوێندکار · شەهیدی کورد · هێمای نەتەوەیی",
      teaser:
        "لە تەمەنی ٢٢ ساڵیدا لە دەستدرا؛ وشەکانی کۆتایی — «بمکوژە، بەڵام هەزاران کورد لە خەو هەستن» — لە مێژووی کوردیدا زۆر دووبارە کراونەتەوە.",
      listIcon: "flower",
    },
    {
      id: "margaret-george-shilo",
      name: "مارگرێت جۆرج شیلۆ",
      role: "یەکەم پێشمەرگەی ژن",
      teaser:
        "ژنێکی ئاشوری کە لە ساڵی ١٩٦٣ چەکی هەڵگرت و بووە فەرماندەی پێکهاتەیەکی تەواو پێشمەرگەی پیاوان.",
      listIcon: "crown",
    },
  ],
  ar: [
    {
      id: "khaja-bawa",
      name: "خاجة باوا",
      role: "بطلة انتفاضة ١٩٩١",
      teaser: "ابنة شجاعة لأربيل قدّمت حياتها في انتفاضة المدينة من أجل الحرية.",
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
    {
      id: "shifa-gardi",
      name: "شفا گردی",
      role: "صحفية ميدانية · مقدمة · مديرة إنتاج في روداو",
      teaser:
        "مراسلة رائدة استشهدت أثناء تغطية الحرب ضد داعش — أول صحفية كردية تستشهد في خطوط المواجهة.",
      listIcon: "flower",
    },
    {
      id: "qara-fateme",
      name: "كارا فاطمة",
      role: "زعيمة قبلية · قائدة عسكرية · دبلوماسية",
      teaser:
        "سارت إلى إسطنبول بخمسمائة مقاتل في حرب القرم — «لبوة كردية» طُبعت صورتها في Illustrated London News.",
      listIcon: "crown",
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
      role: "أول امرأة بيشمركة",
      teaser:
        "امرأة آشورية حملت السلاح عام ١٩٦٣ وأصبحت قائدة لوحدة بيشمركية من الرجال فقط.",
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
