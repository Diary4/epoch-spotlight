import type { WomenLangCode } from "@/components/Sections/women/womenLanguage";
import { womenCardsToPanel } from "@/components/Sections/women/womenLanguage";

import masturaDetail from "@/assets/images/womens/mastura.jpg";
import adilaDetail from "@/assets/images/womens/adila.jpg";
import hafsaDetail from "@/assets/images/womens/hapsaxan.jpg";
import khanzadDetail from "@/assets/images/womens/khanzad.jpg";
import halimaDetail from "@/assets/images/women/historic-detail/halima-khanum-detail.webp";

export type HistoricFigureListItem = {
  id: string;
  name: string;
  role: string;
  teaser: string;
  icon: "crown" | "flower";
};

export type HistoricPageCopy = {
  backToWomen: string;
  backToList: string;
  heroTitle1: string;
  heroTitle2: string;
  heroSubtitle: string;
  heroIntro: string;
};

export type HistoricDetailContent = {
  nameLine1: string;
  nameLine2: string;
  role: string;
  intro: string;
  portraitAlt: string;
  listIcon: "crown" | "flower";
  cards: { icon: string; text: string }[];
  quote: string;
};

export const historicDetailPortraits: Record<string, string> = {
  "mastura-ardalan": masturaDetail,
  "adela-khanum": adilaDetail,
  "hafsa-khanum": hafsaDetail,
  "khanzada-khanum": khanzadDetail,
  "halima-khanum": halimaDetail,
};

const pageCopy: Record<WomenLangCode, HistoricPageCopy> = {
  en: {
    backToWomen: "Back to Women",
    backToList: "Back to list",
    heroTitle1: "Historic",
    heroTitle2: "Women",
    heroSubtitle: "Poets, rulers, teachers,\nand tribal leaders.",
    heroIntro:
      "Figures from Kurdish history who led, wrote, taught, and defended their communities—each remembered for a distinct legacy.",
  },
  ku: {
    backToWomen: "گەڕانەوە بۆ ژنان",
    backToList: "گەڕانەوە بۆ لیست",
    heroTitle1: "ژنانی",
    heroTitle2: "مێژوویی",
    heroSubtitle: "شاعیر، حاکم، مامۆستا،\nو سەرۆکی هۆز.",
    heroIntro:
      "کەسایەتییەکانی مێژووی کورد کە سەرکردایەتیان کرد، نووسیان، فێریان کرد، و کۆمەڵگاکانیان بەرگریان کرد—هەر یەکێک بە میراتێکی جیاواز لە یادەوەری مایەوە.",
  },
  ar: {
    backToWomen: "العودة إلى النساء",
    backToList: "العودة إلى القائمة",
    heroTitle1: "نساء",
    heroTitle2: "تاريخيات",
    heroSubtitle: "شاعرات، حاكمات، معلمات،\nوقائدات قبليات.",
    heroIntro:
      "شخصيات من التاريخ الكردي قادت وكتبت وعلّمت ودافعت عن مجتمعاتها—كل منهن تُذكر بإرث مميز.",
  },
};

const listByLang: Record<WomenLangCode, HistoricFigureListItem[]> = {
  en: [
    {
      id: "mastura-ardalan",
      name: "Mastura Ardalan",
      role: "Poet and historian",
      teaser:
        "A leading Kurdish writer who preserved identity and memory through poetry and history.",
      icon: "flower",
    },
    {
      id: "adela-khanum",
      name: "Adila Khanum",
      role: "Ruler of Halabja",
      teaser:
        "A visionary governor remembered for justice, diplomacy, and rebuilding her city.",
      icon: "crown",
    },
    {
      id: "hafsa-khanum",
      name: "Hafsa Khanum",
      role: "Education pioneer",
      teaser:
        "Opened the door of learning to girls and showed that education is the foundation of national renewal.",
      icon: "flower",
    },
    {
      id: "khanzada-khanum",
      name: "Khanzada Khanum",
      role: "Ruler of Soran",
      teaser:
        "A capable mir who defended her emirate with strategic skill, courage, and wide-ranging authority.",
      icon: "flower",
    },
    {
      id: "halima-khanum",
      name: "Halima Khanum",
      role: "Leader of the Bashqal tribe",
      teaser:
        "A historical Kurdish leader who stood by her people with steady judgment in times of change.",
      icon: "crown",
    },
  ],
  ku: [
    {
      id: "mastura-ardalan",
      name: "مەستورەی ئەردەڵان",
      role: "شاعیر و مێژوونووس",
      teaser:
        "نووسەرێکی پێشەنگی کوردی کە ناسنامە و یادەوەری لە ڕێگەی شیعر و مێژووەوە پاراست.",
      icon: "flower",
    },
    {
      id: "adela-khanum",
      name: "ئادیلە خانم",
      role: "حاکمی هەڵەبجە",
      teaser:
        "فەرمانڕەوایەکی بینراو کە بە دادپەروەری، دیپلۆماسی، و دروستکردنەوەی شارەکەی لە یادەوەری مایەوە.",
      icon: "crown",
    },
    {
      id: "hafsa-khanum",
      name: "حەفسە خانم",
      role: "پێشەنگی پەروەردە",
      teaser:
        "دەرگای فێربوونی بۆ کچان کردەوە و نیشانی دا کە پەروەردە بنەمای نوێکردنەوەی نەتەوەییە.",
      icon: "flower",
    },
    {
      id: "khanzada-khanum",
      name: "خانزادە خانم",
      role: "حاکمی سۆران",
      teaser:
        "میرێکی بەتوانا کە ئیمارەتەکەی بە شارەزایی ستراتیژی، ئازایەتی، و دەسەڵاتی فراوان بەرگری کرد.",
      icon: "flower",
    },
    {
      id: "halima-khanum",
      name: "حەلیمە خانم",
      role: "سەرۆکی هۆزی باشقاڵ",
      teaser:
        "سەرکردەیەکی مێژوویی کوردی کە لە کاتی گۆڕانکارییەکاندا بە حوکمڕانیی جێگیر لەگەڵ خەڵکەکەی وەستا.",
      icon: "crown",
    },
  ],
  ar: [
    {
      id: "mastura-ardalan",
      name: "مستورة أردلان",
      role: "شاعرة ومؤرخة",
      teaser: "كاتبة كردية رائدة حفظت الهوية والذاكرة عبر الشعر والتاريخ.",
      icon: "flower",
    },
    {
      id: "adela-khanum",
      name: "عادلة خانم",
      role: "حاكمة حلبجة",
      teaser: "حاكمة رؤيوية تُذكر بالعدل والدبلوماسية وإعادة بناء مدينتها.",
      icon: "crown",
    },
    {
      id: "hafsa-khanum",
      name: "حفصة خانم",
      role: "رائدة التعليم",
      teaser: "فتحت باب التعلم للفتيات وأظهرت أن التربية أساس التجديد الوطني.",
      icon: "flower",
    },
    {
      id: "khanzada-khanum",
      name: "خانزاد خانم",
      role: "حاكمة سوران",
      teaser: "أميرة قادرة دافعت عن إمارتها بمهارة استراتيجية وشجاعة وسلطة واسعة.",
      icon: "flower",
    },
    {
      id: "halima-khanum",
      name: "حليمة خانم",
      role: "قائدة قبيلة باشقال",
      teaser: "قائدة كردية تاريخية وقفت مع شعبها بحكم ثابت في أوقات التغيير.",
      icon: "crown",
    },
  ],
};

const detailsByLang: Record<WomenLangCode, Record<string, HistoricDetailContent>> = {
  en: {
    "mastura-ardalan": {
      nameLine1: "Mastura",
      nameLine2: "Ardalan",
      role: "Poet and Historian",
      intro:
        "An early Kurdish writer whose poetry and historical writing preserved memory, identity, and the story of her time.",
      portraitAlt: "Mastura Ardalan",
      listIcon: "flower",
      cards: [
        { icon: "✒", text: "Writing poetry and history." },
        { icon: "📖", text: "One of the earliest Kurdish women of letters." },
        { icon: "⛩", text: "Ardalan Principality • 19th century." },
      ],
      quote: "She wrote herself into history.",
    },
    "adela-khanum": {
      nameLine1: "Adila",
      nameLine2: "Khanum",
      role: "Ruler of Halabja",
      intro:
        "A visionary leader who governed Halabja with justice and diplomacy, lifting trade, order, and the dignity of her people.",
      portraitAlt: "Adila Khanum",
      listIcon: "crown",
      cards: [
        { icon: "⚖", text: "Governing Halabja with wisdom, reform, and steady diplomacy." },
        { icon: "♛", text: "Remembered as a model of civic leadership in Kurdish history." },
        { icon: "♜", text: "Halabja • late 19th & early 20th century." },
      ],
      quote: "True leadership can uplift a city and forge a nation.",
    },
    "hafsa-khanum": {
      nameLine1: "Hafsa",
      nameLine2: "Khanum",
      role: "Education Pioneer",
      intro:
        "A tireless advocate who widened access to learning for girls and treated schooling as the foundation of a stronger society.",
      portraitAlt: "Hafsa Khanum",
      listIcon: "flower",
      cards: [
        { icon: "✎", text: "Founding and expanding programmes for girls' education." },
        { icon: "♛", text: "Demonstrated that literacy and schools reshape families and futures." },
        { icon: "♜", text: "Sulaymaniyah • 20th century." },
      ],
      quote: "Every girl who studies opens a new door toward tomorrow.",
    },
    "khanzada-khanum": {
      nameLine1: "Khanzad",
      nameLine2: "Khanum",
      role: "Leader of Soran",
      intro: "A powerful Kurdish ruler known for strategic leadership, courage, and regional strength.",
      portraitAlt: "Khanzada Khanum",
      listIcon: "flower",
      cards: [
        { icon: "⛨", text: "Safeguarding her principality and commanding respect." },
        { icon: "♛", text: "A historic symbol of Kurdish women in power." },
        { icon: "♜", text: "Soran • early 17th century." },
      ],
      quote: "Strength and strategy defined her rule.",
    },
    "halima-khanum": {
      nameLine1: "Halima",
      nameLine2: "Khanum",
      role: "Leader of the Bashqal Tribe",
      intro:
        "A Kurdish leader of memory who stood with her people through political upheaval, offering steadiness when the ground itself seemed to shift.",
      portraitAlt: "Halima Khanum",
      listIcon: "crown",
      cards: [
        { icon: "⛨", text: "Defending her community and guiding the Bashqal through hardship." },
        { icon: "♛", text: "A reminder that tribal leadership and counsel belonged to women too." },
        { icon: "♜", text: "Bashqal • 19th century." },
      ],
      quote: "Leadership and guidance had women's share in them too.",
    },
  },
  ku: {
    "mastura-ardalan": {
      nameLine1: "مەستورەی",
      nameLine2: "ئەردەڵان",
      role: "شاعیر و مێژوونووس",
      intro:
        "نووسەرێکی کوردی سەرەتایی کە شیعر و نووسینی مێژوویی یادەوەری، ناسنامە، و چیرۆکی کاتی خۆی پاراست.",
      portraitAlt: "مەستورەی ئەردەڵان",
      listIcon: "flower",
      cards: [
        { icon: "✒", text: "نووسینی شیعر و مێژوو." },
        { icon: "♛", text: "یەکێک لە یەکەم ژنە نووسەرەکانی کوردی." },
        { icon: "♜", text: "ئیماراتی ئەردەڵان • سەدەی نوزدەهەم." },
      ],
      quote: "خۆی لە مێژوو نووسی.",
    },
    "adela-khanum": {
      nameLine1: "ئادیلە",
      nameLine2: "خانم",
      role: "حاکمی هەڵەبجە",
      intro:
        "سەرکردەیەکی بینراو کە هەڵەبجەی بە دادپەروەری و دیپلۆماسی بەڕێوەبرد، بازرگانی، ڕێکخستن، و ڕێزی خەڵکەکەی بەرزکردەوە.",
      portraitAlt: "ئادیلە خانم",
      listIcon: "crown",
      cards: [
        { icon: "⚖", text: "بەڕێوەبردنی هەڵەبجە بە حیکمەت، چاکسازی، و دیپلۆماسیی جێگیر." },
        { icon: "♛", text: "وەک نموونەی سەرکردایەتی شارستانی لە مێژووی کورد لە یادەوەری مایەوە." },
        { icon: "♜", text: "هەڵەبجە • کۆتایی سەدەی نوزدەهەم و سەرەتای بیستەم." },
      ],
      quote: "سەرکردایەتی ڕاستەقینە دەتوانێت شار بەرز بکاتەوە و نەتەوەیەک دروست بکات.",
    },
    "hafsa-khanum": {
      nameLine1: "حەفسە",
      nameLine2: "خانم",
      role: "پێشەنگی پەروەردە",
      intro:
        "پاڵپشتێکی بێوەستان کە دەستگەیشتن بە فێربوون بۆ کچان فراوانکرد و قوتابخانەی وەک بنەمای کۆمەڵگایەکی بەهێزتر دید.",
      portraitAlt: "حەفسە خانم",
      listIcon: "flower",
      cards: [
        { icon: "✎", text: "دامەزراندن و فراوانکردنی بەرنامەکانی پەروەردەی کچان." },
        { icon: "♛", text: "نیشانی دا کە خوێندن و قوتابخانە خێزان و داهاتوو دەگۆڕن." },
        { icon: "♜", text: "سلێمانی • سەدەی بیستەم." },
      ],
      quote: "هەر کچێک کە فێر دەبێت دەرگایەکی نوێ بۆ سبەیین دەکاتەوە.",
    },
    "khanzada-khanum": {
      nameLine1: "خانزاد",
      nameLine2: "خانم",
      role: "سەرۆکی سۆران",
      intro: "حاکمێکی بەهێزی کوردی کە بە سەرکردایەتی ستراتیژی، ئازایەتی، و هێزی ناوچەیی ناسراوە.",
      portraitAlt: "خانزادە خانم",
      listIcon: "flower",
      cards: [
        { icon: "⛨", text: "پاراستنی ئیمارەتەکەی و فەرمانڕەوایی ڕێزدار." },
        { icon: "♛", text: "هێمایەکی مێژوویی بۆ ژنانی کوردی لە دەسەڵات." },
        { icon: "♜", text: "سۆران • سەرەتای سەدەی حەڤدەهەم." },
      ],
      quote: "هێز و ستراتیژی حوکمی ئەو دیاری کرد.",
    },
    "halima-khanum": {
      nameLine1: "حەلیمە",
      nameLine2: "خانم",
      role: "سەرۆکی هۆزی باشقاڵ",
      intro:
        "سەرکردەیەکی کوردی لە یادەوەری کە لەگەڵ خەڵکەکەی لە نێوان گۆڕانکاری سیاسی وەستا و جێگیربوونی دابینکرد کاتێک زەوی خۆی دەجوڵا.",
      portraitAlt: "حەلیمە خانم",
      listIcon: "crown",
      cards: [
        { icon: "⛨", text: "بەرگریکردن لە کۆمەڵگاکەی و ڕێنمایی باشقاڵ لە سەختی." },
        { icon: "♛", text: "بیرخستنەوەیەک کە سەرکردایەتی هۆزی و ڕاوێژکاری بەشێکی ژنان بوو." },
        { icon: "♜", text: "باشقاڵ • سەدەی نوزدەهەم." },
      ],
      quote: "سەرکردایەتی و ڕێنمایی بەشێکی ژنان بوو لەواندا.",
    },
  },
  ar: {
    "mastura-ardalan": {
      nameLine1: "مستورة",
      nameLine2: "أردلان",
      role: "شاعرة ومؤرخة",
      intro: "كاتبة كردية مبكرة حفظت شعرها وكتاباتها التاريخية الذاكرة والهوية وقصة عصرها.",
      portraitAlt: "مستورة أردلان",
      listIcon: "flower",
      cards: [
        { icon: "✒", text: "كتابة الشعر والتاريخ." },
        { icon: "♛", text: "من أوائل النساء الكرديات في عالم الأدب." },
        { icon: "♜", text: "إمارة أردلان • القرن التاسع عشر." },
      ],
      quote: "كتبت نفسها في التاريخ.",
    },
    "adela-khanum": {
      nameLine1: "عادلة",
      nameLine2: "خانم",
      role: "حاكمة حلبجة",
      intro: "قائدة رؤيوية حكمت حلبجة بالعدل والدبلوماسية، رافعة التجارة والنظام وكرامة شعبها.",
      portraitAlt: "عادلة خانم",
      listIcon: "crown",
      cards: [
        { icon: "⚖", text: "حكم حلبجة بحكمة وإصلاح ودبلوماسية ثابتة." },
        { icon: "♛", text: "تُذكر كنموذج للقيادة المدنية في التاريخ الكردي." },
        { icon: "♜", text: "حلبجة • أواخر القرن التاسع عشر وأوائل العشرين." },
      ],
      quote: "القيادة الحقيقية ترفع المدينة وتصنع الأمة.",
    },
    "hafsa-khanum": {
      nameLine1: "حفصة",
      nameLine2: "خانم",
      role: "رائدة التعليم",
      intro: "مدافعة لا تكلّ عن توسيع التعلم للفتيات ورأت المدرسة أساس مجتمع أقوى.",
      portraitAlt: "حفصة خانم",
      listIcon: "flower",
      cards: [
        { icon: "✎", text: "تأسيس وتوسيع برامج تعليم الفتيات." },
        { icon: "♛", text: "أظهرت أن القراءة والمدارس تعيد تشكيل العائلات والمستقبل." },
        { icon: "♜", text: "السليمانية • القرن العشرين." },
      ],
      quote: "كل فتاة تدرس تفتح باباً جديداً نحو الغد.",
    },
    "khanzada-khanum": {
      nameLine1: "خانزاد",
      nameLine2: "خانم",
      role: "حاكمة سوران",
      intro: "حاكمة كردية قوية عُرفت بالقيادة الاستراتيجية والشجاعة والقوة الإقليمية.",
      portraitAlt: "خانزاد خانم",
      listIcon: "flower",
      cards: [
        { icon: "⛨", text: "حماية إمارتها وفرض الاحترام." },
        { icon: "♛", text: "رمز تاريخي للمرأة الكردية في السلطة." },
        { icon: "♜", text: "سوران • أوائل القرن السابع عشر." },
      ],
      quote: "القوة والاستراتيجية حددتا حكمها.",
    },
    "halima-khanum": {
      nameLine1: "حليمة",
      nameLine2: "خانم",
      role: "قائدة قبيلة باشقال",
      intro: "قائدة كردية في الذاكرة وقفت مع شعبها في اضطراب سياسي، مقدمة ثباتاً حين يبدو الأرض نفسها تتحرك.",
      portraitAlt: "حليمة خانم",
      listIcon: "crown",
      cards: [
        { icon: "⛨", text: "الدفاع عن مجتمعها وإرشاد باشقال في الشدة." },
        { icon: "♛", text: "تذكير بأن القيادة القبلية والمشورة كان لهما نصيب من النساء." },
        { icon: "♜", text: "باشقال • القرن التاسع عشر." },
      ],
      quote: "للقيادة والإرشاد نصيب من النساء أيضاً.",
    },
  },
};

export function getHistoricPageCopy(lang: WomenLangCode): HistoricPageCopy {
  return pageCopy[lang];
}

export function getHistoricWomen(lang: WomenLangCode): HistoricFigureListItem[] {
  return listByLang[lang];
}

export function getHistoricDetail(id: string, lang: WomenLangCode): HistoricDetailContent | null {
  return detailsByLang[lang][id] ?? null;
}

export function historicDetailToPanelCards(
  detail: HistoricDetailContent,
  lang: WomenLangCode,
): { icon: string; title: string; text: string }[] {
  return womenCardsToPanel(detail.cards, lang);
}
