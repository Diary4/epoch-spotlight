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
  topics: { poetry: string; history: string; education: string };
};

const pageCopy: Record<WomenLangCode, KnowledgePageCopy> = {
  en: {
    backToWomen: "Back to Women",
    backToList: "Back to knowledge list",
    heroTitle1: "Women",
    heroTitle2: "Knowledge",
    heroSubtitle: "Writers & educators.",
    heroIntro: "Voices of learning, literature, and education.",
    impactTitle: "✤ Their Impact",
    impactText: "They opened doors through knowledge.",
    topics: { poetry: "Poetry", history: "History", education: "Girls' Education" },
  },
  ku: {
    backToWomen: "گەڕانەوە بۆ ژنان",
    backToList: "گەڕانەوە بۆ لیستی زانین",
    heroTitle1: "ژنانی",
    heroTitle2: "زانین",
    heroSubtitle: "نووسەر و پەروەردەکار.",
    heroIntro: "دەنگی فێربوون، ئەدەبیات، و پەروەردە.",
    impactTitle: "✤ کاریگەرییان",
    impactText: "دەرگا لە ڕێگەی زانینەوە کردەوە.",
    topics: { poetry: "شیعر", history: "مێژوو", education: "پەروەردەی کچان" },
  },
  ar: {
    backToWomen: "العودة إلى النساء",
    backToList: "العودة إلى قائمة المعرفة",
    heroTitle1: "نساء",
    heroTitle2: "المعرفة",
    heroSubtitle: "كاتبات ومربيات.",
    heroIntro: "أصوات التعلم والأدب والتربية.",
    impactTitle: "✤ أثرهن",
    impactText: "فتحن الأبواب عبر المعرفة.",
    topics: { poetry: "الشعر", history: "التاريخ", education: "تعليم الفتيات" },
  },
};

const peopleByLang: Record<WomenLangCode, KnowledgePersonCopy[]> = {
  en: [
    {
      id: "mastura-ardalan",
      name: "Mastura Ardalan",
      nameLine1: "Mastura",
      nameLine2: "Ardalan",
      role: "Historian & poet",
      intro:
        "An early Kurdish writer whose poetry and historical writing preserved memory, identity, and the story of her time.",
      cards: [
        { icon: "✒", text: "Writing poetry and history." },
        { icon: "📖", text: "One of the earliest Kurdish women of letters." },
        { icon: "⛩", text: "Ardalan Principality • 19th century." },
      ],
      quote: "She wrote herself into history.",
      listIcon: "flower",
    },
    {
      id: "hapsa-khan",
      name: "Hapsa Khan",
      nameLine1: "Hapsa",
      nameLine2: "Khan",
      role: "Education pioneer",
      intro:
        "A tireless advocate who widened access to learning for girls and treated schooling as the foundation of a stronger society.",
      cards: [
        { icon: "✎", text: "Founding and expanding programmes for girls' education." },
        { icon: "♜", text: "Demonstrated that literacy and schools reshape families and futures." },
        { icon: "⛩", text: "Sulaymaniyah • 20th century." },
      ],
      quote: "Every girl who studies opens a new door toward tomorrow.",
      listIcon: "flower",
    },
  ],
  ku: [
    {
      id: "mastura-ardalan",
      name: "مەستورەی ئەردەڵان",
      nameLine1: "مەستورەی",
      nameLine2: "ئەردەڵان",
      role: "مێژوونووس و شاعیر",
      intro:
        "نووسەرێکی کوردی سەرەتایی کە شیعر و نووسینی مێژوویی یادەوەری، ناسنامە، و چیرۆکی کاتی خۆی پاراست.",
      cards: [
        { icon: "✒", text: "نووسینی شیعر و مێژوو." },
        { icon: "📖", text: "یەکێک لە یەکەم ژنە نووسەرەکانی کوردی." },
        { icon: "⛩", text: "ئیماراتی ئەردەڵان • سەدەی نوزدەهەم." },
      ],
      quote: "خۆی لە مێژوو نووسی.",
      listIcon: "flower",
    },
    {
      id: "hapsa-khan",
      name: "حەپسە خان",
      nameLine1: "حەپسە",
      nameLine2: "خان",
      role: "پێشەنگی پەروەردە",
      intro:
        "پاڵپشتێکی بێوەستان کە دەستگەیشتن بە فێربوون بۆ کچان فراوانکرد و قوتابخانەی وەک بنەمای کۆمەڵگایەکی بەهێزتر دید.",
      cards: [
        { icon: "✎", text: "دامەزراندن و فراوانکردنی بەرنامەکانی پەروەردەی کچان." },
        { icon: "♜", text: "نیشانی دا کە خوێندن و قوتابخانە خێزان و داهاتوو دەگۆڕن." },
        { icon: "⛩", text: "سلێمانی • سەدەی بیستەم." },
      ],
      quote: "هەر کچێک کە فێر دەبێت دەرگایەکی نوێ بۆ سبەیین دەکاتەوە.",
      listIcon: "flower",
    },
  ],
  ar: [
    {
      id: "mastura-ardalan",
      name: "مستورة أردلان",
      nameLine1: "مستورة",
      nameLine2: "أردلان",
      role: "مؤرخة وشاعرة",
      intro: "كاتبة كردية مبكرة حفظت شعرها وكتاباتها التاريخية الذاكرة والهوية وقصة عصرها.",
      cards: [
        { icon: "✒", text: "كتابة الشعر والتاريخ." },
        { icon: "📖", text: "من أوائل النساء الكرديات في عالم الأدب." },
        { icon: "⛩", text: "إمارة أردلان • القرن التاسع عشر." },
      ],
      quote: "كتبت نفسها في التاريخ.",
      listIcon: "flower",
    },
    {
      id: "hapsa-khan",
      name: "حبسة خان",
      nameLine1: "حبسة",
      nameLine2: "خان",
      role: "رائدة التعليم",
      intro: "مدافعة لا تكلّ عن توسيع التعلم للفتيات ورأت المدرسة أساس مجتمع أقوى.",
      cards: [
        { icon: "✎", text: "تأسيس وتوسيع برامج تعليم الفتيات." },
        { icon: "♜", text: "أظهرت أن القراءة والمدارس تعيد تشكيل العائلات والمستقبل." },
        { icon: "⛩", text: "السليمانية • القرن العشرين." },
      ],
      quote: "كل فتاة تدرس تفتح باباً جديداً نحو الغد.",
      listIcon: "flower",
    },
  ],
};

export function getKnowledgePageCopy(lang: WomenLangCode): KnowledgePageCopy {
  return pageCopy[lang];
}

export function getKnowledgePeople(lang: WomenLangCode): KnowledgePersonCopy[] {
  return peopleByLang[lang];
}
