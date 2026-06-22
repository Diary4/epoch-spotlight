import type { WomenLangCode } from "@/components/Sections/women/womenLanguage";

export type ResistanceFigureCopy = {
  id: string;
  name: string;
  nameLine1: string;
  nameLine2: string;
  role: string;
  teaser: string;
  knownFor: string;
  legacy: string;
  placeEra: string;
  quote: string;
  listIcon: "crown" | "flower";
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
      { text: "Kill me, and thousands of Kurds will rise.", author: "Layla Qasim" },
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
      { text: "بمکوژە، هەزاران کورد هەڵدەستن.", author: "لەیلا قاسم" },
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
      { text: "اقتلوني، وستنهض آلاف الكرد.", author: "ليلا قاسم" },
      { text: "حمل صوتها رسالة شجاعة.", author: "شفا گردی" },
      { text: "قاتلت من أجل وطن أعظم من نفسها.", author: "مارغريت جورج شيلو" },
    ],
  },
};

const womenByLang: Record<WomenLangCode, ResistanceFigureCopy[]> = {
  en: [
    {
      id: "khaja-bawa",
      name: "Khaja Bawa",
      nameLine1: "Khaja",
      nameLine2: "Bawa",
      role: "Heroine of the 1991 uprising",
      teaser:
        "A courageous daughter of Erbil whose life was given during the city's uprising for freedom.",
      knownFor: "Leadership and bravery during the 1991 uprising in Erbil.",
      legacy: "Her sacrifice is woven into Erbil's memory of that spring.",
      placeEra: "Erbil • 1991.",
      quote: "Her courage shook a city.",
      listIcon: "crown",
    },
    {
      id: "qadam-kher",
      name: "Qadam Kher",
      nameLine1: "Qadam",
      nameLine2: "Kher",
      role: "Resistance leader",
      teaser:
        "A Kurdish lioness who led her tribes' uprising with unshakable resolve against Reza Shah's forces.",
      knownFor: "Leading tribal resistance against Reza Shah's forces.",
      legacy: "She held ground where others broke.",
      placeEra: "Luristan • early 20th century.",
      quote: "She resisted where others collapsed.",
      listIcon: "flower",
    },
    {
      id: "shifa-gardi",
      name: "Shifa Gardi",
      nameLine1: "Shifa",
      nameLine2: "Gardi",
      role: "Field journalist",
      teaser:
        "A pioneering, fearless reporter who brought truthful news from the front lines of the war against ISIS to the world.",
      knownFor: "Frontline coverage of the war against ISIS.",
      legacy: "Her reporting widened the world's view of Kurdish courage.",
      placeEra: "Erbil and Mosul • 21st century.",
      quote: "Her voice carried a message of courage.",
      listIcon: "flower",
    },
    {
      id: "qara-fateme",
      name: "Kara Fateme",
      nameLine1: "Kara",
      nameLine2: "Fateme",
      role: "Military commander and tribal leader",
      teaser: "A rare military leader remembered for courage in battle and skill in diplomacy.",
      knownFor: "Command of mounted fighters and negotiation with state powers.",
      legacy: "Her name is tied to courage that stayed with her at every step.",
      placeEra: "Marash and Istanbul • 19th century.",
      quote: "Courage accompanied her in every step.",
      listIcon: "crown",
    },
    {
      id: "layla-qasim",
      name: "Layla Qasim",
      nameLine1: "Layla",
      nameLine2: "Qasim",
      role: "Symbol of resistance",
      teaser: "A young fighter whose sacrifice became a beacon of dignity and national awakening.",
      knownFor: "Defiance and sacrifice in the face of oppression.",
      legacy: "Remembered as a national symbol of youth and resolve.",
      placeEra: "Khanaqin and Baghdad • 1970s.",
      quote: "Kill me, and thousands of Kurds will rise.",
      listIcon: "flower",
    },
    {
      id: "margaret-george-shilo",
      name: "Margaret George Shilo",
      nameLine1: "Margaret",
      nameLine2: "George Shilo",
      role: "First female Peshmerga",
      teaser:
        "A legendary Assyrian woman who fought for Kurdistan and became a symbol of coexistence and loyalty.",
      knownFor: "The first woman to command in a Peshmerga military formation.",
      legacy: "A living emblem of shared struggle for Kurdistan.",
      placeEra: "Dohuk region • 1960s.",
      quote: "She fought for a homeland greater than herself.",
      listIcon: "crown",
    },
  ],
  ku: [
    {
      id: "khaja-bawa",
      name: "خەجە باوا",
      nameLine1: "خەجە",
      nameLine2: "باوا",
      role: "پاڵەوانی سەرهەڵدانی ١٩٩١",
      teaser: "کچێکی ئازای هەولێر کە ژیانی لە سەرهەڵدانی شارەکە بۆ ئازادی دا.",
      knownFor: "سەرکردایەتی و ئازایەتی لە سەرهەڵدانی ١٩٩١ لە هەولێر.",
      legacy: "قوربانییەکەی لە یادەوەی هەولێر بۆ ئەو بەهارە بەرگەیەکی.",
      placeEra: "هەولێر • ١٩٩١.",
      quote: "ئازایەتییەکەی شارێکی لە جێ هێنا.",
      listIcon: "crown",
    },
    {
      id: "qadam-kher",
      name: "قەدەم خێر",
      nameLine1: "قەدەم",
      nameLine2: "خێر",
      role: "سەرکردەی بەرخۆدان",
      teaser: "شێری کوردی کە سەرهەڵدانی هۆزەکەی بە بڕوای نەگۆڕاو بەرامبەر هێزەکانی ڕەزا شا بەڕێوەبرد.",
      knownFor: "سەرکردایەتی بەرخۆدانی هۆزی بەرامبەر هێزەکانی ڕەزا شا.",
      legacy: "لەو شوێنە جێگیر بوو کە ئەوانی تر شکان.",
      placeEra: "لۆرستان • سەرەتای سەدەی بیستەم.",
      quote: "لەو شوێنە بەرخۆی کە ئەوانی تر ڕووخان.",
      listIcon: "flower",
    },
    {
      id: "shifa-gardi",
      name: "شیفا گەردی",
      nameLine1: "شیفا",
      nameLine2: "گەردی",
      role: "ڕۆژنامەنووسی مەیدان",
      teaser: "ڕۆژنامەنووسێکی پێشەنگ و بێترس کە هەواڵی ڕاستەقینە لە هێڵی پێشەوەی شەڕی دژی داعش بۆ جیهان گەیاند.",
      knownFor: "ڕووماڵکردنی هێڵی پێشەوەی شەڕی دژی داعش.",
      legacy: "ڕاپۆرتەکانی بینینی جیهان بۆ ئازایەتی کوردی فراوانکرد.",
      placeEra: "هەولێر و مووسڵ • سەدەی بیست و یەکەم.",
      quote: "دەنگی پەیامی ئازایەتی هەڵگرت.",
      listIcon: "flower",
    },
    {
      id: "qara-fateme",
      name: "قەرە فاتیمە",
      nameLine1: "قەرە",
      nameLine2: "فاتیمە",
      role: "فەرماندەی سەربازی و سەرۆکی هۆز",
      teaser: "سەرکردەیەکی سەربازی دەگمەن کە بە ئازایەتی لە شەڕ و شارەزایی لە دیپلۆماسی لە یادەوەری مایەوە.",
      knownFor: "فەرماندەیی شەڕڤانان و دانوستاندن لەگەڵ دەسەڵاتەکانی دەوڵەت.",
      legacy: "ناوی پەیوەستە بە ئازایەتی کە لە هەموو هەنگاوێکدا لەگەڵیدا بوو.",
      placeEra: "مەڕەش و ئیستانبول • سەدەی نوزدەهەم.",
      quote: "ئازایەتی لە هەموو هەنگاوێکدا لەگەڵیدا بوو.",
      listIcon: "crown",
    },
    {
      id: "layla-qasim",
      name: "لەیلا قاسم",
      nameLine1: "لەیلا",
      nameLine2: "قاسم",
      role: "هێمای بەرخۆدان",
      teaser: "شەڕڤانێکی گەنج کە قوربانییەکەی بووە بە چرای ڕێز و خۆهێنانەوەی نەتەوەیی.",
      knownFor: "سەرهەڵدان و قوربانی بەرامبەر داپێڕان.",
      legacy: "وەک هێمای نەتەوەیی گەنجی و بڕوای جێگیر لە یادەوەری مایەوە.",
      placeEra: "خانەقین و بەغدا • ساڵانی ١٩٧٠.",
      quote: "بمکوژە، هەزاران کورد هەڵدەستن.",
      listIcon: "flower",
    },
    {
      id: "margaret-george-shilo",
      name: "مارگرێت جۆرج شیلۆ",
      nameLine1: "مارگرێت",
      nameLine2: "جۆرج شیلۆ",
      role: "یەکەم پێشمەرگەی ژن",
      teaser: "ژنێکی ئاشوری ئەفسانەیی کە بۆ کوردستان شەڕی کرد و بووە هێمای پێکەوەژیان و وەفاداری.",
      knownFor: "یەکەم ژن کە فەرماندەیی لە پێکهاتەیەکی سەربازی پێشمەرگەدا کرد.",
      legacy: "هێمایەکی زیندوو بۆ تێکۆشانی هاوبەش بۆ کوردستان.",
      placeEra: "ناوچەی دهۆک • ساڵانی ١٩٦٠.",
      quote: "بۆ نیشتمانێکی گەورەتر لە خۆی شەڕی کرد.",
      listIcon: "crown",
    },
  ],
  ar: [
    {
      id: "khaja-bawa",
      name: "خاجة باوا",
      nameLine1: "خاجة",
      nameLine2: "باوا",
      role: "بطلة انتفاضة ١٩٩١",
      teaser: "ابنة شجاعة لأربيل قدّمت حياتها في انتفاضة المدينة من أجل الحرية.",
      knownFor: "القيادة والشجاعة في انتفاضة ١٩٩١ في أربيل.",
      legacy: "تضحيتها منسوجة في ذاكرة أربيل لذلك الربيع.",
      placeEra: "أربيل • ١٩٩١.",
      quote: "هزت شجاعتها مدينة.",
      listIcon: "crown",
    },
    {
      id: "qadam-kher",
      name: "قدم خير",
      nameLine1: "قدم",
      nameLine2: "خير",
      role: "قائدة مقاومة",
      teaser: "أسد كردي قاد انتفاضة قبيلتها بعزم لا يلين ضد قوات رضا شاه.",
      knownFor: "قيادة مقاومة قبلية ضد قوات رضا شاه.",
      legacy: "ثبتت موقفها حيث انهار الآخرون.",
      placeEra: "لورستان • أوائل القرن العشرين.",
      quote: "قاومت حيث انهار الآخرون.",
      listIcon: "flower",
    },
    {
      id: "shifa-gardi",
      name: "شفا گردی",
      nameLine1: "شفا",
      nameLine2: "گردی",
      role: "صحفية ميدانية",
      teaser: "مراسلة رائدة لا تخاف نقلت الأخبار الحقيقية من خطوط المواجهة ضد داعش إلى العالم.",
      knownFor: "تغطية خطوط المواجهة في الحرب ضد داعش.",
      legacy: "وسّعت تقاريرها رؤية العالم لشجاعة الكرد.",
      placeEra: "أربيل والموصل • القرن الحادي والعشرون.",
      quote: "حمل صوتها رسالة شجاعة.",
      listIcon: "flower",
    },
    {
      id: "qara-fateme",
      name: "كارا فاطمة",
      nameLine1: "كارا",
      nameLine2: "فاطمة",
      role: "قائدة عسكرية وقبلية",
      teaser: "قائدة عسكرية نادرة تُذكر بشجاعتها في المعركة ومهارتها في الدبلوماسية.",
      knownFor: "قيادة المقاتلين الفرسان والتفاوض مع سلطات الدولة.",
      legacy: "اسمها مرتبط بشجاعة رافقتها في كل خطوة.",
      placeEra: "مرعش وإسطنبول • القرن التاسع عشر.",
      quote: "رافقتها الشجاعة في كل خطوة.",
      listIcon: "crown",
    },
    {
      id: "layla-qasim",
      name: "ليلا قاسم",
      nameLine1: "ليلا",
      nameLine2: "قاسم",
      role: "رمز المقاومة",
      teaser: "مقاتلة شابة أصبح تضحيتها منارة للكرامة والصحوة الوطنية.",
      knownFor: "التحدي والتضحية في مواجهة القمع.",
      legacy: "تُذكر رمزاً وطنياً للشباب والعزم.",
      placeEra: "خانقين وبغداد • سبعينيات القرن العشرين.",
      quote: "اقتلوني، وستنهض آلاف الكرد.",
      listIcon: "flower",
    },
    {
      id: "margaret-george-shilo",
      name: "مارغريت جورج شيلو",
      nameLine1: "مارغريت",
      nameLine2: "جورج شيلو",
      role: "أول امرأة بيشمركة",
      teaser: "امرأة آشورية أسطورية قاتلت من أجل كردستان وصارت رمز التعايش والوفاء.",
      knownFor: "أول امرأة تقود في تشكيل عسكري بيشمركي.",
      legacy: "رمز حي للنضال المشترك من أجل كردستان.",
      placeEra: "منطقة دهوك • ستينيات القرن العشرين.",
      quote: "قاتلت من أجل وطن أعظم من نفسها.",
      listIcon: "crown",
    },
  ],
};

export function getResistancePageCopy(lang: WomenLangCode): ResistancePageCopy {
  return pageCopy[lang];
}

export function getResistanceWomen(lang: WomenLangCode): ResistanceFigureCopy[] {
  return womenByLang[lang];
}
