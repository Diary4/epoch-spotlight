import type { WomenLangCode } from "@/components/Sections/women/womenLanguage";
import { womenCardLabels } from "@/components/Sections/women/womenLanguage";

import masturaDetail from "@/assets/images/womens/mastura.jpg";
import adilaDetail from "@/assets/images/womens/adila.jpg";
import hafsaDetail from "@/assets/images/womens/hapsaxan.jpg";
import khanzadDetail from "@/assets/images/womens/khanzad.jpg";
import halimaDetail from "@/assets/images/women/historic-detail/halima-khanum-detail.webp";
import najibaDetail from "@/assets/images/womens/najibakhan.jpg";

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
  legacyTitle: string;
  legacySubtitle: string;
  quotes: { text: string; author: string }[];
};

export type HistoricDetailContent = {
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

export const historicDetailPortraits: Record<string, string> = {
  "mastura-ardalan": masturaDetail,
  "adela-khanum": adilaDetail,
  "hafsa-khanum": hafsaDetail,
  "khanzada-khanum": khanzadDetail,
  "halima-khanum": halimaDetail,
  "najiba-jalizada": najibaDetail,
};

const pageCopy: Record<WomenLangCode, HistoricPageCopy> = {
  en: {
    backToWomen: "Back to Women",
    backToList: "Back to list",
    heroTitle1: "Historic",
    heroTitle2: "Women",
    heroSubtitle: "Rulers, leaders, writers,\nand activists who shaped Kurdish history.",
    heroIntro:
      "Figures from Kurdish history who led, wrote, taught, and defended their communities—each remembered for a distinct legacy.",
    legacyTitle: "Legacy of wisdom",
    legacySubtitle: "Poetry, justice, and learning.",
    quotes: [
      { text: "She wrote herself into history.", author: "Mastura Ardalan" },
      { text: "True leadership can uplift a city and forge a nation.", author: "Adila Khanum" },
      { text: "Every girl who studies opens a new door toward tomorrow.", author: "Hafsa Khanum" },
    ],
  },
  ku: {
    backToWomen: "گەڕانەوە بۆ ژنان",
    backToList: "گەڕانەوە بۆ لیست",
    heroTitle1: "ژنانی",
    heroTitle2: "مێژوویی",
    heroSubtitle: "شاعیر، حاکم، مامۆستا،\nو سەرۆکی هۆز.",
    heroIntro:
      "کەسایەتییەکانی مێژووی کورد کە سەرکردایەتیان کرد، نووسیان، فێریان کرد، و کۆمەڵگاکانیان بەرگریان کرد—هەر یەکێک بە میراتێکی جیاواز لە یادەوەری مایەوە.",
    legacyTitle: "میراتی دانایی",
    legacySubtitle: "شیعر، دادپەروەری، و فێربوون.",
    quotes: [
      { text: "لە ناو جەرگەی مێژوودا، تەختێکی بۆ خۆی بونیاد نا.", author: "مەستورەی ئەردەڵان" },
      { text: " سەرکردایەتیی ڕاستەقینە دەتوانێت شارێک ئاوا بکات و نەتەوەیەک دروست بکات", author: "عادیلە خانم" },
      { text: "هەر کچێک کە دەخوێنێت، دەرگایەکی نوێ بە ڕووی پاشەڕۆژدا دەکاتەوە.", author: "حەپسە خانم" },
    ],
  },
  ar: {
    backToWomen: "العودة إلى النساء",
    backToList: "العودة إلى القائمة",
    heroTitle1: "نساء",
    heroTitle2: "تاريخيات",
    heroSubtitle: "شاعرات، حاكمات، معلمات،\nوقائدات قبليات.",
    heroIntro:
      "شخصيات من التاريخ الكردي قادت وكتبت وعلّمت ودافعت عن مجتمعاتها—كل منهن تُذكر بإرث مميز.",
    legacyTitle: "إرث الحكمة",
    legacySubtitle: "الشعر والعدل والتعلّم.",
    quotes: [
      { text: "كتبت نفسها في التاريخ.", author: "مستورة أردلان" },
      { text: "القيادة الحقيقية ترفع المدينة وتصنع الأمة.", author: "عادلة خانم" },
      { text: "كل فتاة تدرس تفتح باباً جديداً نحو الغد.", author: "حفصة خانم" },
    ],
  },
};

const listByLang: Record<WomenLangCode, HistoricFigureListItem[]> = {
  en: [
    {
      id: "mastura-ardalan",
      name: "Mastura Ardalan",
      role: "Poet · Historian · First Kurdish Female Writer",
      teaser:
        "Born into the Ardalan ruling family, she became one of Kurdistan's earliest women historians — writing herself into history from exile.",
      icon: "flower",
    },
    {
      id: "adela-khanum",
      name: "Adila Khanum",
      role: "Ruler of Halabja · Leader of the Jaff Tribe",
      teaser:
        "When her husband died in 1909, she stepped forward to rule Halabja — transforming it into a center of trade, justice, and culture.",
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
    {
      id: "najiba-jalizada",
      name: "Najiba Khani Jalizada",
      role: "Intellectual and pioneer",
      teaser:
        "A tireless advocate for girls' education, social awareness, and the preservation of culture.",
      icon: "flower",
    },
  ],
  ku: [
    {
      id: "mastura-ardalan",
      name: "مەستورەی ئەردەڵان",
      role: "شاعیر · مێژوونووس · یەکەمین نووسەری ژنی کوردی",
      teaser:
        "لە خێزانی فەرمانڕەوای ئەردەڵاندا لەدایک بوو و بوو بە یەکێک لە کۆنترین مێژوونووسەکانی ژن لە کوردستان — خۆی لە نێو نیشتەجێبوونەوەدا لە مێژوو نووسی.",
      icon: "flower",
    },
    {
      id: "adela-khanum",
      name: "عادیلە خانم",
      role: "حاکمی هەڵەبجە · سەرۆکی هۆزی جاف",
      teaser:
        "لە مردنی مێردەکەی لە ١٩٠٩دا، پێشەوە هەستا و هەڵەبجەی بەڕێوەبرد — گۆڕی بۆ ناوەندێکی بازرگانی، دادپەروەری، و کولتوور.",
      icon: "crown",
    },
    {
      id: "hafsa-khanum",
      name: "حەپسە خانم",
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
      role: "سەرۆکی هۆزی باشقەڵا",
      teaser:
        "سەرکردەیەکی مێژوویی کوردی کە لە کاتی گۆڕانکارییەکاندا بە حوکمڕانیی جێگیر لەگەڵ خەڵکەکەی وەستا.",
      icon: "crown",
    },
    {
      id: "najiba-jalizada",
      name: "نەجیبە خانی جەلیزادە",
      role: "ڕۆشنبیر و پێشەنگ",
      teaser:
        "داکۆکیکارێکی سەرسەختی خوێندنی کچان و باڵوکردنەوەی هۆشیاریی کۆمەڵایەتی و پاراستنی کولتوور بوو.",
      icon: "flower",
    },
  ],
  ar: [
    {
      id: "mastura-ardalan",
      name: "مستورة أردلان",
      role: "شاعرة · مؤرخة · أول كاتبة كردية",
      teaser:
        "وُلدت في عائلة حاكمة أردلانية وأصبحت من أوائل المؤرخات في كردستان — كتبت نفسها في التاريخ من المنفى.",
      icon: "flower",
    },
    {
      id: "adela-khanum",
      name: "عادلة خانم",
      role: "حاكمة حلبجة · قائدة قبيلة الجاف",
      teaser:
        "حين توفي زوجها عام ١٩٠٩، تقدّمت لحكم حلبجة — وحوّلتها إلى مركز للتجارة والعدل والثقافة.",
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
    {
      id: "najiba-jalizada",
      name: "نجيبة خاني جليزادة",
      role: "مثقفة ورائدة",
      teaser: "مدافعة عن تعليم الفتيات ورفع الوعي المجتمعي والحفاظ على الثقافة.",
      icon: "flower",
    },
  ],
};

const detailsByLang: Record<WomenLangCode, Record<string, HistoricDetailContent>> = {
  en: {
    "mastura-ardalan": {
      nameLine1: "Mesture",
      nameLine2: "Erdelan",
      role: "Poet · Historian · First Kurdish Female Writer",
      metaLine: "1805 – 1848 | Ardalan Principality, West Iran",
      intro:
        "Born into the educated ruling family of the Ardalan principality, Mastura was given access to learning at a time when most women were denied any education at all. She became a poet, a historian, and a chronicler of her dynasty — writing in both Kurdish and Persian. When political upheaval brought exile and loss to her life, she turned her pain into literature. She did not disappear into history. She wrote herself into it.",
      portraitAlt: "Mastura Ardalan",
      listIcon: "flower",
      greatestAchievement: {
        title: "Greatest Achievement",
        text: "She wrote Tarikh-e Ardalan — the history of the Ardalan dynasty — making her one of the earliest known women historians in Kurdistan. Alongside it, her Diwan of poetry remains a cornerstone of Kurdish literary heritage.",
      },
      whySheMatters: {
        title: "Why She Still Matters",
        text: "Without Mastura, a major chapter of Kurdistan's 19th-century history would exist only through male eyes. She gave the Ardalan dynasty its own voice — and that voice belonged to a woman.",
      },
      cards: [
        {
          icon: "♜",
          title: "Timeline Position",
          text: "1800s — Early 19th Century",
        },
        {
          icon: "⛩",
          title: "Map Location",
          text: "Sanandaj region, Ardalan Principality (western Iran / Kurdistan)",
        },
      ],
      didYouKnow: {
        title: "Did You Know?",
        text: "Mastura wrote her historical chronicle in the 1840s, at a time when women across the world were largely excluded from academic and literary life. She did it anyway — from exile.",
      },
      quote:
        "Her poetic voice combines personal sorrow with broader reflections on society and fate — a voice that still speaks across centuries.",
      quoteAuthor: "Kurdish literary historians",
    },
    "adela-khanum": {
      nameLine1: "Adile",
      nameLine2: "Xanî Jaff",
      role: "Ruler of Halabja · Leader of the Jaff Tribe",
      metaLine: "c. 1847 – 1924 | Halabja, Iraqi Kurdistan",
      intro:
        "When her husband died in 1909, Adila Khanum did not step aside. She stepped forward — and ruled Halabja in his place. Under her leadership, a modest settlement became a regional center of trade, justice, and culture. She built courts, markets, and prisons. She negotiated with Ottoman governors, British officers, and local tribes — on her own terms. British diplomat Gertrude Bell described her as a striking figure who behaved as great Kurdish ladies do behave.",
      portraitAlt: "Adila Khanum",
      listIcon: "crown",
      greatestAchievement: {
        title: "Greatest Achievement",
        text: "She was appointed the title Khan-Bahadur by the British and called 'Princess of the Brave' — the only female leader in the region to receive such recognition. She transformed Halabja from a small settlement into a thriving administrative and cultural hub.",
      },
      whySheMatters: {
        title: "Why She Still Matters",
        text: "Adila Khanum proved that a Kurdish woman could govern a region, command respect from foreign powers, and build a city — at a time when the whole world said she couldn't.",
      },
      cards: [
        {
          icon: "♜",
          title: "Timeline Position",
          text: "Late 1800s – Early 1900s",
        },
        {
          icon: "⛩",
          title: "Map Location",
          text: "Halabja, Sulaymaniyah Governorate, Iraqi Kurdistan",
        },
      ],
      didYouKnow: {
        title: "Did You Know?",
        text: "Famous British traveler and diplomat Gertrude Bell personally visited Adila Khanum and wrote about her in letters that are preserved in the British Museum. Bell was not easily impressed.",
      },
      quote:
        "Her position was probably unique owing to a happy combination of rank and character.",
      quoteAuthor: "E.B. Soane, British officer, 1926",
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
    "najiba-jalizada": {
      nameLine1: "Najiba Khani",
      nameLine2: "Jalizada",
      role: "Intellectual and Pioneer",
      intro:
        "A tireless advocate for girls' education, raising social awareness, and preserving Kurdish culture.",
      portraitAlt: "Najiba Khani Jalizada",
      listIcon: "flower",
      cards: [
        { icon: "✎", text: "The first girl from Koya to attend formal school." },
        { icon: "♛", text: "Championed learning, awareness, and cultural preservation." },
        { icon: "♜", text: "Koya • 20th century." },
      ],
      quote: "She made education a path to changing the lives of future generations.",
    },
  },
  ku: {
    "mastura-ardalan": {
      nameLine1: "Mesture",
      nameLine2: "Erdelan",
      role: "شاعیر · مێژوونووس · یەکەمین نووسەری ژنی کوردی",
      metaLine: "١٨٠٥ – ١٨٤٨ | ئیمارەتی ئەردەڵان، ڕۆژئاوای ئێران",
      intro:
        "لە نێو خێزانێکی فێرکاری و فەرمانڕەوای ئیمارەتی ئەردەڵاندا لەدایک بوو، مەستورە لە کاتێکدا زۆربەی ژنان لە هیچ فێربوونێک بێبەش بوون، دەستی بە خوێندن و فێربوون کەوت. بوو بە شاعیر، مێژوونووس، و بەدواداچووی خێزانەکەی — بە هەردوو زمانی کوردی و فارسی دەنووسی. کاتێک ناڕەزایی سیاسی نێوەندی و دۆڕان بۆ ژیانی هێنا، ئازاری گۆڕی بە ئەدەبیات. لە مێژوو نەما. خۆی تێیدا نووسی.",
      portraitAlt: "مەستورەی ئەردەڵان",
      listIcon: "flower",
      greatestAchievement: {
        title: "گەورەترین دەستکەوت",
        text: "تاریخی ئەردەڵان — مێژووی ئیمارەتی ئەردەڵان — نووسی، کە وایکرد ببێتە یەکێک لە کۆنترین مێژوونووسە ناسراوەکانی ژن لە کوردستان. لەگەڵ ئەوەشدا، دیوانی شیعرەکەی هێشتا بەردەوامە وەک بنەمایەکی گرنگی میراتی ئەدەبی کوردی.",
      },
      whySheMatters: {
        title: "بۆچی هێشتا گرنگە",
        text: "بەبێ مەستورە، بەشێکی گەورەی مێژووی سەدەی نوزدەهەمی کوردستان تەنها لە ڕێگەی چاوەکانی پیاوەکانەوە دەمێنایەوە. دەنگێکی تایبەت بە ئیمارەتی ئەردەڵان بەخشی — و ئەو دەنگەش هی ژنێک بوو.",
      },
      cards: [
        {
          icon: "♜",
          title: "شوێنی کاتی",
          text: "سەدەی ١٨٠٠ەکان — سەرەتای سەدەی نوزدەهەم",
        },
        {
          icon: "⛩",
          title: "شوێنی نەخشە",
          text: "ناوچەی سنە، ئیمارەتی ئەردەڵان (ڕۆژئاوای ئێران / کوردستان)",
        },
      ],
      didYouKnow: {
        title: "ئایا دەزانی؟",
        text: "مەستورە لە ساڵانی ١٨٤٠دا مێژووی خێزانەکەی نووسی، لە کاتێکدا ژنان لە سەرانسەری جیهاندا بە شێوەیەکی گشتی لە ژیانی ئەکادیمی و ئەدەبی دوورخرابوون. بەهەرحاڵ ئەو کارەی کرد — لە نێو نیشتەجێبوونەوەی دوور.",
      },
      quote:
        "دەنگی شیعرەکەی داخی کەسی لەگەڵ بیرکردنەوەی فراوانتر لەسەر کۆمەڵگا و چارەنووس تێکەڵ دەکات — دەنگێک کە هێشتا لە نێوان سەدان ساڵدا دەدوێ.",
      quoteAuthor: "مێژوونووسانی ئەدەبی کوردی",
    },
    "adela-khanum": {
      nameLine1: "Adile",
      nameLine2: "Xanî Jaff",
      role: "حاکمی هەڵەبجە · سەرۆکی هۆزی جاف",
      metaLine: "نز. ١٨٤٧ – ١٩٢٤ | هەڵەبجە، کوردستانی عێراق",
      intro:
        "لە مردنی مێردەکەی لە ١٩٠٩دا، عادیلە خانم لای چوو نەبوو. پێشەوە هەستا — و هەڵەبجەی لە جیاتی ئەو بەڕێوەبرد. لەژێر سەرکردایەتییەکەی، ناوچەیەکی بچووک گۆڕا بۆ ناوەندێکی بازرگانی، دادپەروەری، و کولتوور. دادگا، بازاڕ، و زیندان دروستکرد. لەگەڵ فەرمانبەرانی عوسمانی، ئەفسەرانی بەریتانی، و هۆزە ناوخۆییەکاندا دانوستاند — بە مەرجەکانی خۆی. دیپلۆماتی بەریتانی گێرترود بێڵ وەسفی کرد وەک کەسایەتییەکی سەرنجڕاکێش کە وەک خانمە گەورەکانی کورد ڕەفتار دەکات.",
      portraitAlt: "عادیلە خانم",
      listIcon: "crown",
      greatestAchievement: {
        title: "گەورەترین دەستکەوت",
        text: "ناونیشانی خان-بەھادور لەلایەن بەریتانییەکانەوە پێدرا و پێی دەوترا 'شازادەی ئازادان' — تاکە سەرکردەی ژن لە ناوچەکە بوو کە چاوەڕوانی چەندین ناسینەوەی لەو جۆرە بوو. هەڵەبجەی لە ناوچەیەکی بچووک گۆڕی بۆ ناوەندێکی بەڕێوەبردن و کولتووری گەشەسەندوو.",
      },
      whySheMatters: {
        title: "بۆچی هێشتا گرنگە",
        text: "عادیلە خانم سەلماند کە ژنێکی کوردی دەتوانێت ناوچەیەک بەڕێوەببات، ڕێزی لە دەسەڵاتە بیانییەکان وەربگرێت، و شارێک دروست بکات — لە کاتێکدا هەموو جیهان دەڵێی ناتوانێت.",
      },
      cards: [
        {
          icon: "♜",
          title: "شوێنی کاتی",
          text: "کۆتایی سەدەی ١٨٠٠ەکان – سەرەتای سەدەی ١٩٠٠ەکان",
        },
        {
          icon: "⛩",
          title: "شوێنی نەخشە",
          text: "هەڵەبجە، پارێزگای سلێمانی، کوردستانی عێراق",
        },
      ],
      didYouKnow: {
        title: "ئایا دەزانی؟",
        text: "گەشتیار و دیپلۆماتی بەناوبانگی بەریتانی گێرترود بێڵ بە کەسی عادیلە خانم سەردانی کرد و لە نامەکانیدا دەربارەی نووسیوە کە لە مۆزەخانەی بەریتانی پارێزراون. بێڵ بە ئاسانی سەرسام نەدەبوو.",
      },
      quote:
        "پێگەی ئەو لەوانەیە تایبەت بووبێت بەهۆی تێکەڵبوونێکی خۆش لە پلە و کەسایەتی.",
      quoteAuthor: "ئی.بی. سۆان، ئەفسەری بەریتانی، ١٩٢٦",
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
    "najiba-jalizada": {
      nameLine1: "نەجیبە خانی",
      nameLine2: "جەلیزادە",
      role: "ڕۆشنبیر و پێشەنگ",
      intro:
        "داکۆکیکارێکی سەرسەختی خوێندنی کچان و باڵوکردنەوەی هۆشیاریی کۆمەڵایەتی و پاراستنی کولتوور بوو.",
      portraitAlt: "نەجیبە خانی جەلیزادە",
      listIcon: "flower",
      cards: [
        { icon: "✎", text: "یەکەمین کچی کۆیە بوو کە چووە قوتابخانەی فەرمی." },
        { icon: "♛", text: "داکۆکی لە فێربوون، هۆشیاری، و پاراستنی کولتوور کرد." },
        { icon: "♜", text: "کۆیە • سەدەی بیستەم." },
      ],
      quote: "خوێندنی کردە ڕێگایەک بۆ گۆڕینی ژیانی نەوەکانی داهاتوو.",
    },
  },
  ar: {
    "mastura-ardalan": {
      nameLine1: "Mesture",
      nameLine2: "Erdelan",
      role: "شاعرة · مؤرخة · أول كاتبة كردية",
      metaLine: "١٨٠٥ – ١٨٤٨ | إمارة أردلان، غرب إيران",
      intro:
        "وُلدت في عائلة حاكمة متعلمة من إمارة أردلان، وحصلت على التعلم في وقت حُرم فيه معظم النساء من أي تعليم. أصبحت شاعرة ومؤرخة ومدونة لسلالتها — تكتب بالكردية والفارسية. حين جلب الاضطراب السياسي المنفى والخسارة إلى حياتها، حوّلت ألمها إلى أدب. لم تختفِ في التاريخ. كتبت نفسها فيه.",
      portraitAlt: "مستورة أردلان",
      listIcon: "flower",
      greatestAchievement: {
        title: "أعظم إنجاز",
        text: "كتبت تاريخ أردلان — تاريخ إمارة أردلان — مما جعلها من أوائل المؤرخات المعروفات في كردستان. إلى جانبه، يبقى ديوان شعرها حجراً أساسياً في التراث الأدبي الكردي.",
      },
      whySheMatters: {
        title: "لماذا لا تزال مهمة",
        text: "من دون مستورة، لكان فصلٌ كبير من تاريخ كردستان في القرن التاسع عشر موجوداً فقط من خلال عيون الرجال. أعطت إمارة أردلان صوتها الخاص — وذلك الصوت كان لامرأة.",
      },
      cards: [
        {
          icon: "♜",
          title: "الموقع الزمني",
          text: "القرن التاسع عشر — أوائل القرن التاسع عشر",
        },
        {
          icon: "⛩",
          title: "الموقع الجغرافي",
          text: "منطقة سنندج، إمارة أردلان (غرب إيران / كردستان)",
        },
      ],
      didYouKnow: {
        title: "هل تعلم؟",
        text: "كتبت مستورة سجلها التاريخي في أربعينيات القرن التاسع عشر، في وقت استُبعدت فيه النساء في أنحاء العالم من الحياة الأكاديمية والأدبية. فعلت ذلك على أي حال — من المنفى.",
      },
      quote:
        "يجمع صوتها الشعري الحزن الشخصي مع تأملات أوسع في المجتمع والقدر — صوت لا يزال يتحدث عبر القرون.",
      quoteAuthor: "مؤرخو الأدب الكردي",
    },
    "adela-khanum": {
      nameLine1: "Adile",
      nameLine2: "Xanî Jaff",
      role: "حاكمة حلبجة · قائدة قبيلة الجاف",
      metaLine: "نحو ١٨٤٧ – ١٩٢٤ | حلبجة، كردستان العراق",
      intro:
        "حين توفي زوجها عام ١٩٠٩، لم تنحز عادلة خانم جانباً. تقدّمت — وحكمت حلبجة مكانه. تحت قيادتها، تحوّلت مستوطنة متواضعة إلى مركز إقليمي للتجارة والعدل والثقافة. بنت المحاكم والأسواق والسجون. تفاوضت مع حكام العثمانيين والضباط البريطانيين والقبائل المحلية — بشروطها الخاصة. وصفتها الدبلوماسية البريطانية غيرترود بيل بأنها شخصية لافتة تتصرف كما تتصرف سيدات الأكراد العظيمات.",
      portraitAlt: "عادلة خانم",
      listIcon: "crown",
      greatestAchievement: {
        title: "أعظم إنجاز",
        text: "منحت لقب خان-باهادور من البريطانيين ولُقّبت بـ 'أميرة الشجعان' — كانت القائدة الأنثى الوحيدة في المنطقة التي نالت مثل هذا التقدير. حوّلت حلبجة من مستوطنة صغيرة إلى مركز إداري وثقافي مزدهر.",
      },
      whySheMatters: {
        title: "لماذا لا تزال مهمة",
        text: "أثبتت عادلة خانم أن المرأة الكردية تستطيع حكم منطقة، وكسب احترام القوى الأجنبية، وبناء مدينة — في وقت قال فيه العالم كله إنها لا تستطيع.",
      },
      cards: [
        {
          icon: "♜",
          title: "الموقع الزمني",
          text: "أواخر القرن التاسع عشر – أوائل القرن العشرين",
        },
        {
          icon: "⛩",
          title: "الموقع الجغرافي",
          text: "حلبجة، محافظة السليمانية، كردستان العراق",
        },
      ],
      didYouKnow: {
        title: "هل تعلم؟",
        text: "زارَت المسافرة والدبلوماسية البريطانية الشهيرة غيرترود بيل عادلة خانم شخصياً وكتبت عنها في رسائل محفوظة في المتحف البريطاني. لم تكن بيل تُبهر بسهولة.",
      },
      quote: "كان موقعها على الأرجح فريداً بفضل مزيج سعيد من المكانة والشخصية.",
      quoteAuthor: "إي. بي. سوان، ضابط بريطاني، ١٩٢٦",
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
    "najiba-jalizada": {
      nameLine1: "نجيبة خاني",
      nameLine2: "جليزادة",
      role: "مثقفة ورائدة",
      intro:
        "مدافعة عن تعليم الفتيات ورفع الوعي المجتمعي والحفاظ على الثقافة الكردية.",
      portraitAlt: "نجيبة خاني جليزادة",
      listIcon: "flower",
      cards: [
        { icon: "✎", text: "أول فتاة من كويس تلتحق بالمدرسة الرسمية." },
        { icon: "♛", text: "دافعت عن التعلم والوعي والحفاظ على الثقافة." },
        { icon: "♜", text: "كويس • القرن العشرين." },
      ],
      quote: "جعلت التعليم طريقاً لتغيير حياة الأجيال القادمة.",
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
  const labels = womenCardLabels[lang];
  const defaultTitles = [labels.knownFor, labels.legacy, labels.placeEra];
  return detail.cards.map((card, index) => ({
    icon: card.icon,
    title: card.title ?? defaultTitles[index] ?? labels.knownFor,
    text: card.text,
  }));
}
