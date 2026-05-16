import type { WomenLangCode } from "@/components/Sections/women/womenLanguage";

export type KnowledgePersonCopy = {
  id: string;
  name: string;
  nameLine1: string;
  nameLine2: string;
  role: string;
  intro: string;
  cards: { icon: string; text: string }[];
  quote: string;
  listIcon: "crown" | "flower";
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
    backToList: "Back to knowledge list",
    heroTitle1: "Women",
    heroTitle2: "Knowledge",
    heroSubtitle: "Political women.",
    heroIntro: "Voices that carried their people into parliament and public life.",
    impactTitle: "✤ Her Impact",
    impactText: "She became a global symbol of political courage.",
    topics: { poetry: "Poetry", history: "History", political: "Political Women" },
  },
  ku: {
    backToWomen: "گەڕانەوە بۆ ژنان",
    backToList: "گەڕانەوە بۆ لیستی زانین",
    heroTitle1: "ژنانی",
    heroTitle2: "زانین",
    heroSubtitle: "ژنانی سیاسەتمەدار.",
    heroIntro: "دەنگی گەل گەیاندە ناو پەرلەمان و بوێریی سیاسی.",
    impactTitle: "✤ کاریگەریی",
    impactText: "بوو بە سمبولێکی جیهانی بۆ بوێریی سیاسی.",
    topics: { poetry: "شیعر", history: "مێژوو", political: "ژنانی سیاسەتمەدار" },
  },
  ar: {
    backToWomen: "العودة إلى النساء",
    backToList: "العودة إلى قائمة المعرفة",
    heroTitle1: "نساء",
    heroTitle2: "المعرفة",
    heroSubtitle: "النساء السياسيات.",
    heroIntro: "أصوات حملت شعبها إلى البرلمان والحياة العامة.",
    impactTitle: "✤ أثرها",
    impactText: "أصبحت رمزاً عالمياً للشجاعة السياسية.",
    topics: { poetry: "الشعر", history: "التاريخ", political: "النساء السياسيات" },
  },
};

const peopleByLang: Record<WomenLangCode, KnowledgePersonCopy[]> = {
  en: [
    {
      id: "leyla-zana",
      name: "Leyla Zana",
      nameLine1: "Leyla",
      nameLine2: "Zana",
      role: "Political leader & human rights voice",
      intro:
        "A Kurdish political activist who brought her people's voice into parliament and became a global symbol of political courage.",
      cards: [
        { icon: "♕", text: "The first Kurdish woman in the Turkish parliament." },
        { icon: "⚖", text: "Turned political representation into a form of struggle." },
        { icon: "⛩", text: "Amed (Diyarbakır), from the 1990s to today." },
      ],
      quote: "She carried her people's voice into parliament.",
      listIcon: "crown",
    },
  ],
  ku: [
    {
      id: "leyla-zana",
      name: "لەیلا زانا",
      nameLine1: "لەیلا",
      nameLine2: "زانا",
      role: "سەرکردەی سیاسی و دەنگی مافی مرۆڤ",
      intro:
        "تێکۆشەرێکی سیاسیی کوردە کە دەنگی گەلەکەی گەیاندە ناو پەرلەمان و بوو بە سمبولێکی جیهانی بۆ بوێریی سیاسی.",
      cards: [
        { icon: "♕", text: "یەکەمین ژنە کورد لە پەرلەمانی تورکیا." },
        { icon: "⚖", text: "نوێنەرایەتیی سیاسی کردە جۆرێک لە تێکۆشان." },
        { icon: "⛩", text: "ئامەد، لە نەوەدەکانەوە تا ئەمڕۆ." },
      ],
      quote: "دەنگێک بوو کە گەلەکەی هێنا ناو پەرلەمان.",
      listIcon: "crown",
    },
  ],
  ar: [
    {
      id: "leyla-zana",
      name: "ليلى زانا",
      nameLine1: "ليلى",
      nameLine2: "زانا",
      role: "قائدة سياسية وصوت لحقوق الإنسان",
      intro:
        "ناشطة سياسية كردية حملت صوت شعبها إلى البرلمان وأصبحت رمزاً عالمياً للشجاعة السياسية.",
      cards: [
        { icon: "♕", text: "أول امرأة كردية في برلمان تركيا." },
        { icon: "⚖", text: "جعل التمثيل السياسي شكلاً من أشكال النضال." },
        { icon: "⛩", text: "أمد (ديار بكر)، من التسعينيات حتى اليوم." },
      ],
      quote: "كان صوتاً حمل شعبها إلى البرلمان.",
      listIcon: "crown",
    },
  ],
};

export function getKnowledgePageCopy(lang: WomenLangCode): KnowledgePageCopy {
  return pageCopy[lang];
}

export function getKnowledgePeople(lang: WomenLangCode): KnowledgePersonCopy[] {
  return peopleByLang[lang];
}
