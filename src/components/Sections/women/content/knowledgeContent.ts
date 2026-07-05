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
    backToList: "Back to scholars list",
    heroTitle1: "Scholars &",
    heroTitle2: "Educational Pioneers",
    heroSubtitle: "Educators, linguists, and founders who opened doors to learning.",
    heroIntro:
      "Women who built schools, preserved language, and lit the path of education for generations of Kurdish girls.",
    impactTitle: "✤ Her Impact",
    impactText: "She opened doors that had never been opened before.",
    topics: { poetry: "Poetry", history: "History", political: "Educational Pioneers" },
  },
  ku: {
    backToWomen: "گەڕانەوە بۆ ژنان",
    backToList: "گەڕانەوە بۆ لیستی زانایان",
    heroTitle1: "زانایان و",
    heroTitle2: "پێشەنگی پەروەردە",
    heroSubtitle: "پەروەردەکار، زمانەوانی، و دامەزرێنەرانی خوێندن.",
    heroIntro:
      "ئەو ژنانەی قوتابخانەیان دروستکرد، زمان پاراست، و ڕێگای خوێندن بۆ چەندین نەوەی کچانی کورد ڕووناککرد.",
    impactTitle: "✤ کاریگەریی",
    impactText: "بوو بە سمبولێکی جیهانی بۆ بوێری سیاسی.",
    topics: { poetry: "شیعر", history: "مێژوو", political: "ژنانی سیاسەتمەدار" },
  },
  ar: {
    backToWomen: "العودة إلى النساء",
    backToList: "العودة إلى قائمة العلماء",
    heroTitle1: "العالمات و",
    heroTitle2: "رواد التعليم",
    heroSubtitle: "مربيات ولغويات ومؤسسات فتحن أبواب التعلم.",
    heroIntro:
      "نساء بنين المدارس وحافظن على اللغة وأضاءن طريق التعليم لأجيال من الفتيات الكرديات.",
    impactTitle: "✤ أثرها",
    impactText: "أصبحت رمزاً عالمياً للشجاعة السياسية.",
    topics: { poetry: "الشعر", history: "التاريخ", political: "النساء السياسيات" },
  },
};

const listByLang: Record<WomenLangCode, PoliticalFigureListItem[]> = {
  en: [
    {
      id: "hafsa-khanum",
      name: "Hapsa Khan",
      role: "Educator · Activist · Founder of the First Girls' School in Kurdistan",
      teaser:
        "She stayed in Sulaymaniyah when others fled the bombs, then opened the first girls' school and fought for Kurdish rights at the League of Nations.",
      listIcon: "flower",
    },
    {
      id: "najiba-jalizada",
      name: "Najiba Khani Jelizadeh",
      role: "Intellectual · Women's Rights Activist · Pioneer of Education",
      teaser:
        "The first girl in Koya to attend formal school in 1924, an intellectual, activist, and keeper of Kurdish history who lit the path for thousands of girls.",
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
  ],
  ku: [
    {
      id: "hafsa-khanum",
      name: "حەپسەخانی نەقیب",
      role: "پەروەردەکار · چالاکوان · دامەزرێنەری یەکەم قوتابخانەی کچان لە کوردستان",
      teaser:
        "لە کاتی بۆمباردمانەکانی سلێمانی مایەوە، دواتر یەکەم قوتابخانەی کچان کردەوە و لە کۆماری نەتەوەکاندا داکۆکی لە مافەکانی کورد کرد.",
      listIcon: "flower",
    },
    {
      id: "najiba-jalizada",
      name: "نەجیبە خانی جەلیزادە",
      role: "ڕووناکبیر · چالاکوانی مافەکانی ژنان · پێشەنگی خوێندن",
      teaser:
        "یەکەمین کچی کۆیە بوو کە لە ١٩٢٤دا چووە قوتابخانەی فەرمی، ڕۆشنبیر، چالاکوان، و پارێزەری مێژووی کورد کە ڕێگای هەزاران کچی ڕووناککرد.",
      listIcon: "flower",
    },
    {
      id: "pakize-rafik-hilmi",
      name: "پاکیزە ڕەفیق حیلمی",
      role: "زمانەوانی هارڤارد · یەکەم ژنە کورد لە ئەکادیمیای زانستیی کورد",
      teaser:
        "یەکەم قوتابیی عێراقی بوو کە ماستەری هارڤارد بەدەستهێنا، زانستی کوردی کرد بە مێزەی جیهان.",
      listIcon: "crown",
    },
    {
      id: "roshan-bedirkhan",
      name: "رەوشەن بەدرخان",
      role: "نووسەر · پێشەنگی کولتووری · چالاکوان",
      teaser:
        "هاوبەش لە بڵاوکردنەوەی گۆڤارەکانی «هاوار» و «روناهی»، بەرگری لە پەروەردەی کچان و پاراستنی زمانی کوردی کرد.",
      listIcon: "crown",
    },
  ],
  ar: [
    {
      id: "hafsa-khanum",
      name: "حفصة خان النقيب",
      role: "مربية · ناشطة · مؤسسة أول مدرسة للبنات في كردستان",
      teaser:
        "بقيت في السليمانية حين هرب الآخرون من القصف، ثم أسست أول مدرسة للبنات ودافعت عن حقوق الأكراد في عصبة الأمم.",
      listIcon: "flower",
    },
    {
      id: "najiba-jalizada",
      name: "نجيبة جلي زادة",
      role: "مثقفة · ناشطة حقوق المرأة · رائدة التعليم",
      teaser:
        "أول فتاة في كوية تلتحق بالمدرسة الرسمية عام ١٩٢٤، مثقفة وناشطة وحافظة للتاريخ الكردي أضاءت الطريق لآلاف الفتيات.",
      listIcon: "flower",
    },
    {
      id: "pakize-rafik-hilmi",
      name: "باكيزة رفيق حلمي",
      role: "لغوية من هارفارد · أول امرأة كردية في الأكاديمية الكردية للعلوم",
      teaser:
        "أول طالبة عراقية تحصل على درجة الماجستير من هارفارد — فتحت البحث الكردي على المسرح العالمي.",
      listIcon: "crown",
    },
    {
      id: "roshan-bedirkhan",
      name: "روشن بديرخان",
      role: "كاتبة · رائدة ثقافية · ناشطة",
      teaser:
        "شريكة في نشر مجلات هاوار وروناهي، دافعت عن تعليم البنات والحفاظ على اللغة الكردية.",
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
