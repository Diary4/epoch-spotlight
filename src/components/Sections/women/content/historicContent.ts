import type { WomenLangCode } from "@/components/Sections/women/womenLanguage";
import { womenCardLabels } from "@/components/Sections/women/womenLanguage";

import masturaDetail from "@/assets/images/womens/mastura.jpg";
import adilaDetail from "@/assets/images/womens/adila.jpg";
import hafsaDetail from "@/assets/images/womens/hapsaxan.jpg";
import khanzadDetail from "@/assets/images/womens/khanzad.jpg";
import halimaDetail from "@/assets/images/women/historic-detail/halima-khanum-detail.webp";
import meryemDetail from "@/assets/images/womens/maryamkhan.jpg";
import minaDetail from "@/assets/images/women/historic.png";
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
  "meryem-khan": meryemDetail,
  "mina-qazi": minaDetail,
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
      "Figures from Kurdish history who led, wrote, taught, and defended their communities, each remembered for a distinct legacy.",
    legacyTitle: "Legacy of wisdom",
    legacySubtitle: "Poetry, justice, and learning.",
    quotes: [
      { text: "She wrote herself into history.", author: "Mastura Ardalan" },
      { text: "True leadership can uplift a city and forge a nation.", author: "Adila Khanum" },
      { text: "There is no difference between men and women... so I am going to continue.", author: "Hapsa Khan" },
    ],
  },
  ku: {
    backToWomen: "گەڕانەوە بۆ ژنان",
    backToList: "گەڕانەوە بۆ لیست",
    heroTitle1: "ژنانی",
    heroTitle2: "مێژوویی",
    heroSubtitle: "شاعیر، حاکم، مامۆستا،\nو سەرۆکی هۆز.",
    heroIntro:
      "کەسایەتییەکانی مێژووی کورد کە سەرکردایەتیان کرد، نووسیان، فێریان کرد، و کۆمەڵگاکانیان بەرگریان کرد, هەر یەکێک بە میراتێکی جیاواز لە یادەوەری مایەوە.",
    legacyTitle: "میراتی دانایی",
    legacySubtitle: "شیعر، دادپەروەری، و فێربوون.",
    quotes: [
      { text: "لە ناو جەرگەی مێژوودا، تەختێکی بۆ خۆی بونیاد نا.", author: "مەستورەی ئەردەڵان" },
      { text: " سەرکردایەتیی ڕاستەقینە دەتوانێت شارێک ئاوا بکات و نەتەوەیەک دروست بکات", author: "عادیلە خانم" },
      { text: "هیچ جیاوازییەک لە نێوان پیاو و ژندا نییە... بۆیە بەردەوام دەبم.", author: "حەپسە خانم" },
    ],
  },
  ar: {
    backToWomen: "العودة إلى النساء",
    backToList: "العودة إلى القائمة",
    heroTitle1: "نساء",
    heroTitle2: "تاريخيات",
    heroSubtitle: "شاعرات، حاكمات، معلمات،\nوقائدات قبليات.",
    heroIntro:
      "شخصيات من التاريخ الكردي قادت وكتبت وعلّمت ودافعت عن مجتمعاتها, كل منهن تُذكر بإرث مميز.",
    legacyTitle: "إرث الحكمة",
    legacySubtitle: "الشعر والعدل والتعلّم.",
    quotes: [
      { text: "كتبت نفسها في التاريخ.", author: "مستورة أردلان" },
      { text: "القيادة الحقيقية ترفع المدينة وتصنع الأمة.", author: "عادلة خانم" },
      { text: "لا فرق بين الرجال والنساء... لذلك سأواصل.", author: "حفصة خانم" },
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
        "Born into the Ardalan ruling family, she became one of Kurdistan's earliest women historians, writing herself into history from exile.",
      icon: "flower",
    },
    {
      id: "adela-khanum",
      name: "Adila Khanum",
      role: "Ruler of Halabja · Leader of the Jaff Tribe",
      teaser:
        "When her husband died in 1909, she stepped forward to rule Halabja, transforming it into a center of trade, justice, and culture.",
      icon: "crown",
    },
    {
      id: "hafsa-khanum",
      name: "Hapsa Khan",
      role: "Educator · Activist · Founder of the First Girls' School in Kurdistan",
      teaser:
        "She stayed in Sulaymaniyah when others fled the bombs, then opened the first girls' school and fought for Kurdish rights at the League of Nations.",
      icon: "flower",
    },
    {
      id: "khanzada-khanum",
      name: "Khanzad Khanum",
      role: "Ruler of Soran · Commander of 50,000 Soldiers",
      teaser:
        "After her brother was murdered, she took the emirate, commanded its army for seven years, and built a fortress that still stands east of Erbil.",
      icon: "crown",
    },
    {
      id: "halima-khanum",
      name: "Halima Xanim",
      role: "Ruler of Bash Kala · Kurdish Tribal Leader",
      teaser:
        "She ruled Bash Kala in the Hakkari mountains until Ottoman suppression, one of several Kurdish women who stepped into power when the men around them fell.",
      icon: "crown",
    },
    {
      id: "meryem-khan",
      name: "Meryem Khan",
      role: "Tribal Leader · Diplomat · Negotiator",
      teaser:
        "During WWI, Russian commanders negotiated with her, not a sultan, granting passage through Kurdish tribal territory on her terms.",
      icon: "crown",
    },
    {
      id: "mina-qazi",
      name: "Mina Qazi",
      role: "First Lady of the Republic of Kurdistan · Women's Rights Pioneer",
      teaser:
        "Wife of Qazi Muhammad, she founded the first official Kurdish women's organization in 1946 and remained in Mahabad as a pillar of strength for decades.",
      icon: "flower",
    },
    {
      id: "najiba-jalizada",
      name: "Najiba Khani Jelizadeh",
      role: "Intellectual · Women's Rights Activist · Pioneer of Education",
      teaser:
        "The first girl in Koya to attend formal school in 1924, an intellectual, activist, and keeper of Kurdish history who lit the path for thousands of girls.",
      icon: "flower",
    },
  ],
  ku: [
    {
      id: "mastura-ardalan",
      name: "مەستوورەی ئەردەلان",
      role: "شاعیر · مێژوونووس · یەکەم ژنە نووسەری کورد",
      teaser:
        "لە خێزانێکی خوێندەوار و فەرمانڕەوای میرنشینی ئەردەلاندا لەدایکبوو و بوو بە یەکێک لە یەکەمین ژنە مێژوونووسە ناسراوەکانی کوردستان، خۆی لە نێو ئاوارەییدا لە مێژوو نووسی.",
      icon: "flower",
    },
    {
      id: "adela-khanum",
      name: "عادیلە خانم",
      role: "حاکمی هەڵەبجە · سەرۆکی هۆزی جاف",
      teaser:
        "لە مردنی مێردەکەی لە ١٩٠٩دا، پێشەوە هەستا و هەڵەبجەی بەڕێوەبرد, گۆڕی بۆ ناوەندێکی بازرگانی، دادپەروەری، و کولتوور.",
      icon: "crown",
    },
    {
      id: "hafsa-khanum",
      name: "حەپسە خانم",
      role: "پەروەردەکار · چالاکوان · دامەزرێنەری یەکەم قوتابخانەی کچان لە کوردستان",
      teaser:
        "لە کاتی ئەوەی کەس هەڵدەهات لە بۆمباردمانەکانی سلێمانی مایەوە, دواتر یەکەم قوتابخانەی کچان کردەوە و لە کۆماری نەتەوەکاندا داکۆکی لە مافەکانی کورد کرد.",
      icon: "flower",
    },
    {
      id: "khanzada-khanum",
      name: "خانزادە خانم",
      role: "حاکمی سۆران · فەرماندەی ٥٠٬٠٠٠ سەرباز",
      teaser:
        "دوای کوشتنی براکەی، ئیمارەتەکەی وەرگرت، حوکمی سەربازەکانی بۆ حەوت ساڵ کرد، و قەڵایەکی دروستکرد کە هێشتا لە ڕۆژھەڵاتی ھەولێر وەستاوە.",
      icon: "crown",
    },
    {
      id: "halima-khanum",
      name: "حەلیمە خانم",
      role: "حاکمی باش کالا · سەرۆکی هۆزی کوردی",
      teaser:
        "حوکمی باش کالای لە شاخەکانی ھەکاری کرد تا داپێڕانی عوسمانی, یەکێک لە چەندین ژنی کوردی بوو کە کاتێک پیاوەکانیان کەوتن، دەسەڵات وەرگرتن.",
      icon: "crown",
    },
    {
      id: "meryem-khan",
      name: "مەریەم خان",
      role: "سەرۆکی هۆز · دیپلۆمات · دانوستانکار",
      teaser:
        "لە جەنگی جیهانی یەکەمدا، فەرماندەیانی ڕوسی لەگەڵ ئەو دانوستاندن, نەک لەگەڵ سلتان, و ڕێگای ناوچەی هۆزە کوردییەکان بە مەرجەکانی ئەو دانیان.",
      icon: "crown",
    },
    {
      id: "mina-qazi",
      name: "مینا قازی",
      role: "خانمەی یەکەمی کۆماری کوردستان · پێشەنگی مافی ژنان",
      teaser:
        "هاوسەری قازی محەممەد، یەکەم ڕێکخراوی فەرمی ژنانی کوردی لە ١٩٤٦دا دامەزراند و بۆ چەندین سەدە لە مەهاباد وەک ستونێکی بەهێز مایەوە.",
      icon: "flower",
    },
    {
      id: "najiba-jalizada",
      name: "نەجیبە خانی جەلیزادە",
      role: "ڕۆشنبیر · چالاکوانی مافی ژنان · پێشەنگی پەروەردە",
      teaser:
        "یەکەمین کچی کۆیە بوو کە لە ١٩٢٤دا چووە قوتابخانەی فەرمی, ڕۆشنبیر، چالاکوان، و پارێزەری مێژووی کورد کە ڕێگای هەزاران کچی ڕووناککرد.",
      icon: "flower",
    },
  ],
  ar: [
    {
      id: "mastura-ardalan",
      name: "مستورة أردلان",
      role: "شاعرة · مؤرخة · أول كاتبة كردية",
      teaser:
        "وُلدت في عائلة حاكمة أردلانية وأصبحت من أوائل المؤرخات في كردستان, كتبت نفسها في التاريخ من المنفى.",
      icon: "flower",
    },
    {
      id: "adela-khanum",
      name: "عادلة خانم",
      role: "حاكمة حلبجة · قائدة قبيلة الجاف",
      teaser:
        "حين توفي زوجها عام ١٩٠٩، تقدّمت لحكم حلبجة, وحوّلتها إلى مركز للتجارة والعدل والثقافة.",
      icon: "crown",
    },
    {
      id: "hafsa-khanum",
      name: "حفصة خانم",
      role: "مربية · ناشطة · مؤسسة أول مدرسة للبنات في كردستان",
      teaser:
        "بقيت في السليمانية حين هرب الآخرون من القصف, ثم أسست أول مدرسة للبنات ودافعت عن حقوق الأكراد في عصبة الأمم.",
      icon: "flower",
    },
    {
      id: "khanzada-khanum",
      name: "خانزاد خانم",
      role: "حاكمة سوران · قائدة ٥٠٬٠٠٠ جندي",
      teaser:
        "بعد اغتيال أخيها، تولّت الإمارة، قادت جيشها سبع سنوات، وبنت حصناً لا يزال قائماً شرق أربيل.",
      icon: "crown",
    },
    {
      id: "halima-khanum",
      name: "حليمة خانم",
      role: "حاكمة باش كالا · قائدة قبلية كردية",
      teaser:
        "حكمت باش كالا في جبال هكاري حتى القمع العثماني, إحدى عدة نساء كرديات تولّين السلطة حين سقط الرجال من حولهن.",
      icon: "crown",
    },
    {
      id: "meryem-khan",
      name: "مريم خان",
      role: "قائدة قبلية · دبلوماسية · مفاوضة",
      teaser:
        "خلال الحرب العالمية الأولى، تفاوض معها قادة روس, لا السلطان, ومنحت مروراً عبر أراضي القبائل الكردية بشروطها.",
      icon: "crown",
    },
    {
      id: "mina-qazi",
      name: "مينا قازي",
      role: "السيدة الأولى لجمهورية كردستان · رائدة حقوق المرأة",
      teaser:
        "زوجة قازي محمد، أسست أول منظمة رسمية للمرأة الكردية عام ١٩٤٦ وبقيت في مهاباد ركيزة قوة لعقود.",
      icon: "flower",
    },
    {
      id: "najiba-jalizada",
      name: "نجيبة خاني جليزادة",
      role: "مثقفة · ناشطة حقوق المرأة · رائدة التعليم",
      teaser:
        "أول فتاة في كويس تلتحق بالمدرسة الرسمية عام ١٩٢٤, مثقفة وناشطة وحافظة للتاريخ الكردي أضاءت الطريق لآلاف الفتيات.",
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
        "Born into the educated ruling family of the Ardalan principality, Mastura was given access to learning at a time when most women were denied any education at all. She became a poet, a historian, and a chronicler of her dynasty, writing in both Kurdish and Persian. When political upheaval brought exile and loss to her life, she turned her pain into literature. She did not disappear into history. She wrote herself into it.",
      portraitAlt: "Mastura Ardalan",
      listIcon: "flower",
      greatestAchievement: {
        title: "Greatest Achievement",
        text: "She wrote Tarikh-e Ardalan, the history of the Ardalan dynasty, making her one of the earliest known women historians in Kurdistan. Alongside it, her Diwan of poetry remains a cornerstone of Kurdish literary heritage.",
      },
      whySheMatters: {
        title: "Why She Still Matters",
        text: "Without Mastura, a major chapter of Kurdistan's 19th-century history would exist only through male eyes. She gave the Ardalan dynasty its own voice, and that voice belonged to a woman.",
      },
      cards: [
        {
          icon: "♜",
          title: "Timeline Position",
          text: "1800s, Early 19th Century",
        },
        {
          icon: "⛩",
          title: "Map Location",
          text: "Sanandaj region, Ardalan Principality (western Iran / Kurdistan)",
        },
      ],
      didYouKnow: {
        title: "Did You Know?",
        text: "Mastura wrote her historical chronicle in the 1840s, at a time when women across the world were largely excluded from academic and literary life. She did it anyway, from exile.",
      },
      quote:
        "Her poetic voice combines personal sorrow with broader reflections on society and fate, a voice that still speaks across centuries.",
      quoteAuthor: "Kurdish literary historians",
    },
    "adela-khanum": {
      nameLine1: "Adile",
      nameLine2: "Xanî Jaff",
      role: "Ruler of Halabja · Leader of the Jaff Tribe",
      metaLine: "c. 1847 – 1924 | Halabja, Iraqi Kurdistan",
      intro:
        "When her husband died in 1909, Adila Khanum did not step aside. She stepped forward, and ruled Halabja in his place. Under her leadership, a modest settlement became a regional center of trade, justice, and culture. She built courts, markets, and prisons. She negotiated with Ottoman governors, British officers, and local tribes, on her own terms. British diplomat Gertrude Bell described her as a striking figure who behaved as great Kurdish ladies do behave.",
      portraitAlt: "Adila Khanum",
      listIcon: "crown",
      greatestAchievement: {
        title: "Greatest Achievement",
        text: "She was appointed the title Khan-Bahadur by the British and called 'Princess of the Brave', the only female leader in the region to receive such recognition. She transformed Halabja from a small settlement into a thriving administrative and cultural hub.",
      },
      whySheMatters: {
        title: "Why She Still Matters",
        text: "Adila Khanum proved that a Kurdish woman could govern a region, command respect from foreign powers, and build a city, at a time when the whole world said she couldn't.",
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
      nameLine1: "Hepsexana",
      nameLine2: "Neqib",
      role: "Educator · Activist · Founder of the First Girls' School in Kurdistan",
      metaLine: "1891 – April 12, 1953 | Sulaymaniyah, Iraqi Kurdistan",
      intro:
        "When the British bombed Sulaymaniyah in the early 1920s, everyone who could leave did. Hapsa Khan stayed. While others fled, she stayed with the families who had nowhere to go, and kept fighting for them after the bombs fell. She went door to door across the city to convince parents to send their daughters to school. If a family could not afford it, she paid herself. In 1926 she opened the first girls' school in Sulaymaniyah. In 1930 she wrote to the League of Nations to demand Kurdish rights.",
      portraitAlt: "Hapsa Khan",
      listIcon: "flower",
      greatestAchievement: {
        title: "Greatest Achievement",
        text: "She founded the Kurdish Women's Association, the first women's rights organization in Iraqi Kurdistan, and established the first school for girls in Sulaymaniyah, personally financing students whose families could not afford it.",
      },
      whySheMatters: {
        title: "Why She Still Matters",
        text: "Hapsa Khan understood that a nation is built one educated girl at a time. Everything she built, the school, the association, the letter to the League of Nations, still echoes in Kurdistan today.",
      },
      cards: [
        {
          icon: "♜",
          title: "Timeline Position",
          text: "Early 20th Century, 1920s to 1950s",
        },
        {
          icon: "⛩",
          title: "Map Location",
          text: "Sulaymaniyah, Iraqi Kurdistan",
        },
      ],
      didYouKnow: {
        title: "Did You Know?",
        text: "After Hapsa Khan died in 1953, her home was converted into a school, because the building that raised her became the building that raised others.",
      },
      quote: "There is no difference between men and women... so I am going to continue.",
      quoteAuthor: "Hapsa Khan",
    },
    "khanzada-khanum": {
      nameLine1: "Mîr Xanzad",
      nameLine2: "a Soranê",
      role: "Ruler of Soran · Commander of 50,000 Soldiers",
      metaLine: "Early 17th Century | Soran Emirate, Erbil Region",
      intro:
        "When her brother, the ruler of the Soran Emirate, was murdered by a treacherous commander, Khanzad did not mourn in silence. She took control of the entire emirate, commanded its army, and governed its people for seven years. She lured the murderer into a meeting under the pretense of marriage, and had him executed along with all his men. Then she built roads, schools, mosques, and a fortress that still stands east of Erbil today.",
      portraitAlt: "Khanzad Khanum",
      listIcon: "crown",
      greatestAchievement: {
        title: "Greatest Achievement",
        text: "She commanded an army of 50,000 soldiers, built Khanzad Castle on the Erbil–Shaqlawa road, a fortress that still stands, and expanded the Soran Emirate's territory by liberating areas from Ottoman and Safavid control.",
      },
      whySheMatters: {
        title: "Why She Still Matters",
        text: "Four centuries ago, a Kurdish woman commanded the largest army in the region and built a fortress that outlasted empires. Khanzad Castle still stands east of Erbil, visible proof that she was real.",
      },
      cards: [
        {
          icon: "♜",
          title: "Timeline Position",
          text: "Early 1600s, Soran Emirate era",
        },
        {
          icon: "⛩",
          title: "Map Location",
          text: "Rawanduz (capital), Harir, Soran, Erbil Governorate, Iraqi Kurdistan",
        },
      ],
      didYouKnow: {
        title: "Did You Know?",
        text: "The first all-female Kurdish rock band, formed in Erbil in 1980, named themselves Khanzad in her honor. Their manager called it 'a radical step for the women's movement in Kurdistan.'",
      },
      quote:
        "She proved that a woman could do her duties and confront all plots and plans her enemies designed for her.",
      quoteAuthor: "Kurdish historical record",
    },
    "halima-khanum": {
      nameLine1: "Halima Xanim",
      nameLine2: "a Hekkariyê",
      role: "Ruler of Bash Kala · Kurdish Tribal Leader",
      metaLine: "Late 19th Century | Bash Kala, Hakkari, today's southeastern Turkey",
      intro:
        "In the late 19th century, as the Ottoman Empire moved to crush Kurdish autonomy and dismantle the Kurdish emirate system, Halima Xanim ruled Bashkala in the Hakkari mountains. She held her position until she was forced to surrender following the suppression of the Bedir Khan revolt in 1847. She was one of several Kurdish women who stepped into power when the men around them fell, and held it as long as they could.",
      portraitAlt: "Halima Xanim",
      listIcon: "crown",
      greatestAchievement: {
        title: "Greatest Achievement",
        text: "She governed the strategic mountain region of Bash Kala during one of the most turbulent periods of Kurdish history, resisting Ottoman consolidation of power until she was militarily overwhelmed.",
      },
      whySheMatters: {
        title: "Why She Still Matters",
        text: "Halima Xanim reminds us that Kurdish women's rule was not unusual, it was a pattern. When the men fell, the women governed. This is a history that deserves to be told.",
      },
      cards: [
        {
          icon: "♜",
          title: "Timeline Position",
          text: "Mid 1800s, Ottoman suppression era",
        },
        {
          icon: "⛩",
          title: "Map Location",
          text: "Bash Kala, Hakkari region (today's Van Province, southeastern Turkey)",
        },
      ],
      didYouKnow: {
        title: "Did You Know?",
        text: "Kurdish historian Sharaf ad-Din Bitlisi documented that multiple Kurdish women assumed power in principalities after the death of their husbands, governing until their sons came of age. Halima Xanim is part of this remarkable pattern.",
      },
      quote:
        "She exercised real political authority, not merely symbolic power, in a male-dominated political world.",
      quoteAuthor: "Kurdish historical studies",
    },
    "meryem-khan": {
      nameLine1: "Meryem",
      nameLine2: "Xan",
      role: "Tribal Leader · Diplomat · Negotiator",
      metaLine: "Late 19th – Early 20th Century | Nehri region, Kurdistan",
      intro:
        "During World War I, Russian military forces needed to move through Kurdish tribal territory. They did not write to a sultan or a governor. They negotiated with Lady Maryam, a Kurdish woman from the prominent Nehri family. Russian commanders recognized her authority and dealt with her as a legitimate representative of her people. She granted passage. The war moved around her community. Her authority protected them.",
      portraitAlt: "Meryem Khan",
      listIcon: "crown",
      greatestAchievement: {
        title: "Greatest Achievement",
        text: "She conducted direct diplomatic negotiations with Russian military forces during WWI, one of the first instances of a Kurdish woman being formally recognized by a foreign military power as a legitimate political authority.",
      },
      whySheMatters: {
        title: "Why She Still Matters",
        text: "Meryem Khan shows that Kurdish women's leadership was not created by modern politics, it already existed, recognized even by foreign armies, long before anyone asked for permission.",
      },
      cards: [
        {
          icon: "♜",
          title: "Timeline Position",
          text: "World War I era, c. 1914–1918",
        },
        {
          icon: "⛩",
          title: "Map Location",
          text: "Nehri region, Ottoman–Safavid frontier (northern Iraq / southeastern Turkey border area)",
        },
      ],
      didYouKnow: {
        title: "Did You Know?",
        text: "Meryem Khan was never elected, never appointed, and held no official title, yet a European military force treated her as a head of state. That is the measure of her true authority.",
      },
      quote:
        "She wielded great authority among her followers, recognized even by foreign military commanders.",
      quoteAuthor: "Basile Nikitine, documented account",
    },
    "mina-qazi": {
      nameLine1: "Mina",
      nameLine2: "Qazi",
      role: "First Lady of the Republic of Kurdistan · Women's Rights Pioneer",
      metaLine: "1908 – 1998",
      intro:
        "She was a revolutionary leader and the wife of Qazi Muhammad, the President of the Republic of Kurdistan. Breaking deep-seated social traditions, she emerged as a prominent public figure and, in March 1946, established the first official Kurdish women's organization to promote education and political participation. Following the Republic's fall and her husband's execution in 1947, she endured decades of immense hardship and state pressure. Despite these challenges, she remained in Mahabad, refusing to yield to her oppressors. Throughout her life, she remained a steadfast pillar of strength, dedicated to preserving her husband's legacy and supporting the Kurdish nation.",
      portraitAlt: "Mina Qazi",
      listIcon: "flower",
      greatestAchievement: {
        title: "Greatest Achievement",
        text: "She founded the Kurdish Women's Union (Yekêtiya Jinên Kurdistan) in 1946. She successfully mobilized women to support the Republic's civic and military efforts, organized literacy classes for girls, and famously appeared in public alongside her husband without a traditional veil, shattering societal taboos and paving the way for modern Kurdish women's participation in politics.",
      },
      whySheMatters: {
        title: "Why She Still Matters",
        text: "Revered as the \"Mother of Kurdistan,\" Mina Qazi remains the ultimate symbol of resilience and female leadership in Kurdish history. She proved that the national struggle was not only the duty of men. Her unwavering dignity in the face of the Republic's collapse, and her lifelong commitment to her husband's democratic dream, continue to be the foundational inspiration for Kurdish women's movements today.",
      },
      cards: [
        {
          icon: "♜",
          title: "Timeline Position",
          text: "1908 until February 17, 1998, lived through the declaration and fall of the 1946 Republic of Kurdistan",
        },
        {
          icon: "⛩",
          title: "Map Location",
          text: "Mahabad, Eastern Kurdistan (Iran), particularly the historic Chwar Chira Square where the Republic was declared",
        },
      ],
      didYouKnow: {
        title: "Did You Know?",
        text: "Mina Qazi was not just a supportive spouse; she used her own inherited personal wealth and sold her jewelry to financially support the Republic of Kurdistan, fund the establishment of the women's union, and help sustain the families of the Peshmerga.",
      },
      quote:
        "Do not weep for the Peshwa; he did not die for himself, he gave his life for the liberation and dignity of his people.",
      quoteAuthor: "Mina Qazi",
    },
    "najiba-jalizada": {
      nameLine1: "Nêjibê Xanî",
      nameLine2: "Jelîzadê",
      role: "Intellectual · Women's Rights Activist · Pioneer of Education",
      metaLine: "Born September 8, 1917, Koya, Iraqi Kurdistan | Died June 12, 1999",
      intro:
        "She was born in Koya in 1917, the daughter of Mala Muhammed Koyi, one of the most respected religious scholars of the region. At a time when even sending boys to school was considered a burden, her father enrolled her alongside boys in Koya's primary school in 1924, an act so unusual that other parents in the area were inspired to send their own daughters to school because of her success. In the 1940s she entered political life and became a supporter of the Hîwa Party, and later played an influential role in spreading national awareness during the era of the Republic of Kurdistan.",
      portraitAlt: "Najiba Khani Jelizadeh",
      listIcon: "flower",
      greatestAchievement: {
        title: "Greatest Achievement",
        text: "She was the first girl in Koya to attend formal school, in 1924. In 1953 she was secretly elected as president of the Women's Union of Kurdistan, Koya branch. She was not only a political activist, she also published three volumes of her father's religious commentaries and left behind several important manuscripts on Kurdish history and folklore.",
      },
      whySheMatters: {
        title: "Why She Still Matters",
        text: "She proved that a Kurdish woman could be an intellectual, a writer, a mother, and a political leader all at once. Her manuscripts on the history of Koya and the September Revolution are an irreplaceable historical source, written from the perspective of a woman who lived through it all.",
      },
      cards: [
        {
          icon: "♜",
          title: "Timeline Position",
          text: "Early 20th Century to late, 1917 to 1999",
        },
        {
          icon: "⛩",
          title: "Map Location",
          text: "Koya, Sulaymaniyah, Erbil (Iraqi Kurdistan), and exile in Iran",
        },
      ],
      didYouKnow: {
        title: "Did You Know?",
        text: "After the collapse of the revolution in 1975, Najiba Khani went into exile in Iran. When she returned to Sulaymaniyah, her high social standing and years of activism earned her an honorary title, she was called \"Hepsexana Naqib\" by those who knew her legacy.",
      },
      quote:
        "She was not just a student, she was a flame that lit the path of education for thousands of other girls in the region.",
      quoteAuthor: "Historical records of Koya city",
    },
  },
  ku: {
    "mastura-ardalan": {
      nameLine1: "مەستوورە",
      nameLine2: "ئەردەلان",
      role: "شاعیر · مێژوونووس · یەکەم ژنە نووسەری کورد",
      metaLine: "١٨٠٥ – ١٨٤٨ | میرنشینی ئەردەلان، ڕۆژهەڵاتی کوردستان",
      intro:
        "مەستوورە لەناو خێزانێکی خوێندەوار و فەرمانڕەوای میرنشینی ئەردەلاندا لەدایکبووە؛ لە سەردەمێکدا دەرفەتی خوێندنی بۆ ڕەخسا کە زۆربەی ژنان لە هەموو جۆرە فێربوونێک بێبەش بوون. بوو بە شاعیر، مێژوونووس و تۆمارکەری ڕووداوەکانی بنەماڵەکەی، بە هەردوو زمانی کوردی و فارسی دەینووسی. کاتێک ئاڵۆزییە سیاسییەکان بوونە هۆی ئاوارەیی و لەدەستدانی ئازیزانی، ئازارەکانی خۆی گۆڕی بۆ ئەدەب. مەستوورە لەناو مێژوودا ون نەبوو، بەڵکو خۆی مێژووی نووسییەوە.",
      portraitAlt: "مەستوورەی ئەردەلان",
      listIcon: "flower",
      greatestAchievement: {
        title: "گەورەترین دەستکەوت",
        text: "کتێبی «تاریخی ئەردەلان»ی نووسی، کە مێژووی بنەماڵەی ئەردەلانە، بەمەش بوو بە یەکێک لە یەکەمین ژنە مێژوونووسە ناسراوەکانی کوردستان. لە پاڵ ئەوەشدا، دیوانە شیعرەکەی وەک بەردی بناغەی کەلەپووری ئەدەبی کوردی ماوەتەوە.",
      },
      whySheMatters: {
        title: "بۆچی تا ئێستاش گرنگە؟",
        text: "ئەگەر مەستوورە نەبوایە، بەشێکی گەورەی مێژووی سەدەی نۆزدەهەمی کوردستان تەنیا لە ڕوانگەی پیاوانەوە دەبینرا. ئەو دەنگێکی تایبەتی بە میرنشینی ئەردەلان بەخشی، و ئەو دەنگەش دەنگی ژنێک بوو.",
      },
      cards: [
        {
          icon: "♜",
          title: "شوێنی کاتی",
          text: "ساڵانی ١٨٠٠، سەرەتای سەدەی نۆزدەهەم",
        },
        {
          icon: "⛩",
          title: "شوێنی نەخشە",
          text: "ناوچەی سنە، میرنشینی ئەردەلان (ڕۆژهەڵاتی کوردستان)",
        },
      ],
      didYouKnow: {
        title: "ئایا دەزانیت؟",
        text: "مەستوورە لە ساڵانی ١٨٤٠دا خەریکی نووسینەوەی مێژوو بوو، لەو سەردەمەدا ژنان لە زۆربەی شوێنەکانی جیهان لە ژیانی ئەکادیمی و ئەدەبی بێبەش کرابوون. بەڵام ئەو هەر نووسی، تەنانەت لە کاتی ئاوارەییشدا.",
      },
      quote:
        "دەنگی شیعری ئەو، خەم و تێڕامانە قووڵەکانی سەر کۆمەڵگە و قەدەر تێکەڵ دەکات، دەنگێک کە دوای تێپەڕبوونی چەندین سەدە، هێشتا دەبیسترێت.",
      quoteAuthor: "مێژوونووسانی ئەدەبی کوردی",
    },
    "adela-khanum": {
      nameLine1: "Adile",
      nameLine2: "Xanî Jaff",
      role: "حاکمی هەڵەبجە · سەرۆکی هۆزی جاف",
      metaLine: "نز. ١٨٤٧ – ١٩٢٤ | هەڵەبجە، کوردستانی عێراق",
      intro:
        "لە مردنی مێردەکەی لە ١٩٠٩دا، عادیلە خانم لای چوو نەبوو. پێشەوە هەستا, و هەڵەبجەی لە جیاتی ئەو بەڕێوەبرد. لەژێر سەرکردایەتییەکەی، ناوچەیەکی بچووک گۆڕا بۆ ناوەندێکی بازرگانی، دادپەروەری، و کولتوور. دادگا، بازاڕ، و زیندان دروستکرد. لەگەڵ فەرمانبەرانی عوسمانی، ئەفسەرانی بەریتانی، و هۆزە ناوخۆییەکاندا دانوستاند, بە مەرجەکانی خۆی. دیپلۆماتی بەریتانی گێرترود بێڵ وەسفی کرد وەک کەسایەتییەکی سەرنجڕاکێش کە وەک خانمە گەورەکانی کورد ڕەفتار دەکات.",
      portraitAlt: "عادیلە خانم",
      listIcon: "crown",
      greatestAchievement: {
        title: "گەورەترین دەستکەوت",
        text: "ناونیشانی خان-بەھادور لەلایەن بەریتانییەکانەوە پێدرا و پێی دەوترا 'شازادەی ئازادان', تاکە سەرکردەی ژن لە ناوچەکە بوو کە چاوەڕوانی چەندین ناسینەوەی لەو جۆرە بوو. هەڵەبجەی لە ناوچەیەکی بچووک گۆڕی بۆ ناوەندێکی بەڕێوەبردن و کولتووری گەشەسەندوو.",
      },
      whySheMatters: {
        title: "بۆچی هێشتا گرنگە",
        text: "عادیلە خانم سەلماند کە ژنێکی کوردی دەتوانێت ناوچەیەک بەڕێوەببات، ڕێزی لە دەسەڵاتە بیانییەکان وەربگرێت، و شارێک دروست بکات, لە کاتێکدا هەموو جیهان دەڵێی ناتوانێت.",
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
      nameLine1: "Hepsexana",
      nameLine2: "Neqib",
      role: "پەروەردەکار · چالاکوان · دامەزرێنەری یەکەم قوتابخانەی کچان لە کوردستان",
      metaLine: "١٨٩١ – ١٢ی نیسانی ١٩٥٣ | سلێمانی، کوردستانی عێراق",
      intro:
        "کاتێک بەریتانییەکان لە سەرەتای ساڵانی ١٩٢٠دا سلێمانییان بۆمبارد کرد، هەموو کەسێک کە دەتوانی هەڵی هات. حەپسە خانم مایەوە. لە کاتی هەڵاتنی کەسانی تر، لەگەڵ ئەو خێزانانە مایەوە کە شوێنیان نەبوو, و دوای کەوتنی بۆمبەکان بەردەوام بوو لە شەڕکردن بۆیان. لە شاردا لە دەرگایەکەوە بۆ دەرگایەکی تر چوو بۆ قەناعەتکردنی دایک و باوکان کە کچەکانیان بنێرنە قوتابخانە. ئەگەر خێزانێک نەیتوانی بیدایە، خۆی دەیدا. لە ١٩٢٦دا یەکەم قوتابخانەی کچان لە سلێمانی کردەوە. لە ١٩٣٠دا نامەیەکی بۆ کۆماری نەتەوەکان نووسی بۆ داواکردنی مافەکانی کورد.",
      portraitAlt: "حەپسە خانم",
      listIcon: "flower",
      greatestAchievement: {
        title: "گەورەترین دەستکەوت",
        text: "کۆمەڵەی ژنانی کورد دامەزراند, یەکەم ڕێکخراوی مافی ژنان لە کوردستانی عێراق, و یەکەم قوتابخانەی کچان لە سلێمانی دامەزراند، بە تایبەتی خوێندکاری ئەو خێزانانەی کە نەیتوانیان بیدایە.",
      },
      whySheMatters: {
        title: "بۆچی هێشتا گرنگە",
        text: "حەپسە خانم تێگەیشت کە نەتەوەیەک هەر کچێکی فێرکراو دروست دەکرێت. هەموو ئەوەی دروستی کرد, قوتابخانە، کۆمەڵە، نامەکە بۆ کۆماری نەتەوەکان, هێشتا لە کوردستاندا دەنگی دەداتەوە.",
      },
      cards: [
        {
          icon: "♜",
          title: "شوێنی کاتی",
          text: "سەرەتای سەدەی بیستەم, ١٩٢٠ەکان تا ١٩٥٠ەکان",
        },
        {
          icon: "⛩",
          title: "شوێنی نەخشە",
          text: "سلێمانی، کوردستانی عێراق",
        },
      ],
      didYouKnow: {
        title: "ئایا دەزانی؟",
        text: "دوای مردنی حەپسە خانم لە ١٩٥٣دا، ماڵەکەی گۆڕدرا بۆ قوتابخانە, چونکە بینایەک کە ئەو تێیدا گەورە بوو، بوو بە بینایەک کە کەسانی تر تێیدا گەورە بوون.",
      },
      quote: "هیچ جیاوازییەک لە نێوان پیاو و ژندا نییە... بۆیە بەردەوام دەبم.",
      quoteAuthor: "حەپسە خانم",
    },
    "khanzada-khanum": {
      nameLine1: "Mîr Xanzad",
      nameLine2: "a Soranê",
      role: "حاکمی سۆران · فەرماندەی ٥٠٬٠٠٠ سەرباز",
      metaLine: "سەرەتای سەدەی حەڤدەهەم | ئیمارەتی سۆران، ناوچەی ھەولێر",
      intro:
        "کاتێک براکەی، حاکمی ئیمارەتی سۆران، لەلایەن فەرمانبەرێکی خیانەتکارەوە کوژرا، خانزاد بە بێدەنگی ماتم نەگرت. کۆنترۆڵی هەموو ئیمارەتەکەی وەرگرت، فەرمانی سوپاکەی کرد، و حەوت ساڵ خەڵکەکەی بەڕێوەبرد. کوژەرەکەی بە نیشانەی هاوسەرگیری بۆ کۆبوونەوەیەک ڕاکێشا, و لەگەڵ هەموو پیاوەکانی کوشت. دواتر ڕێگا، قوتابخانە، مزگەوت، و قەڵایەکی دروستکرد کە هێشتا لە ڕۆژھەڵاتی ھەولێر وەستاوە.",
      portraitAlt: "خانزادە خانم",
      listIcon: "crown",
      greatestAchievement: {
        title: "گەورەترین دەستکەوت",
        text: "فەرمانی سوپایەکی ٥٠٬٠٠٠ سەربازی کرد، قەڵای خانزاد لەسەر ڕێگای ھەولێر–شەقڵاوە دروستکرد, قەڵایەک کە هێشتا وەستاوە, و خاکی ئیمارەتی سۆرانی فراوانکرد بە ئازادکردنی ناوچەکان لە دەستی عوسمانی و سەفەوی.",
      },
      whySheMatters: {
        title: "بۆچی هێشتا گرنگە",
        text: "چوار سەدە لەمەوبەر، ژنێکی کوردی گەورەترین سوپای ناوچەکەی فەرماندەی کرد و قەڵایەکی دروستکرد کە لە سەردەمی ئیمپراتۆرییەکان مابووەوە. قەڵای خانزاد هێشتا لە ڕۆژھەڵاتی ھەولێر وەستاوە, بەڵگەیەکی ڕوونە کە ئەو ڕاستەقینە بوو.",
      },
      cards: [
        {
          icon: "♜",
          title: "شوێنی کاتی",
          text: "سەرەتای ١٦٠٠ەکان, سەردەمی ئیمارەتی سۆران",
        },
        {
          icon: "⛩",
          title: "شوێنی نەخشە",
          text: "ڕەواندز (پایتەخت)، ھەریر، سۆران, پارێزگای ھەولێر، کوردستانی عێراق",
        },
      ],
      didYouKnow: {
        title: "ئایا دەزانی؟",
        text: "یەکەم گرووپی ڕۆکی کوردی تەنها ژنان, لە ھەولێر لە ١٩٨٠دا دامەزرا, ناویان خانزاد نا بە ڕێزگرتن لە ئەو. بەڕێوەبەرەکەیان وای پێداچووەوە 'هەنگاوێکی ڕادیکاڵ بۆ بزووتنەوەی ژنان لە کوردستان'.",
      },
      quote:
        "سەلماند کە ژنێک دەتوانێت ئەرکەکانی ئەنجام بدات و ڕووبەڕووی هەموو پلان و توێژینەوەکانی دوژمنەکانی ببێتەوە.",
      quoteAuthor: "تۆمارە مێژوویییەکانی کوردی",
    },
    "halima-khanum": {
      nameLine1: "Halima Xanim",
      nameLine2: "a Hekkariyê",
      role: "حاکمی باش کالا · سەرۆکی هۆزی کوردی",
      metaLine: "کۆتایی سەدەی نوزدەهەم | باش کالا، ھەکاری, باشووری ڕۆژھەڵاتی تورکیای ئەمڕۆ",
      intro:
        "لە کۆتایی سەدەی نوزدەهەمدا، کاتێک ئیمپراتۆریی عوسمانی هەوڵی داپێڕانی سەربەخۆیی کوردی و تێکدانی سیستەمی ئیمارەتی کوردی بدات، حەلیمە خانم حوکمی باشکالای لە شاخەکانی ھەکاری کرد. پێگەی خۆی هێشتا هەبوو تا ناچارکرا بە دەستنیشانکردن دوای داپێڕانی سەرهەڵدانی بدرخان لە ١٨٤٧دا. یەکێک بوو لە چەندین ژنی کوردی کە کاتێک پیاوەکانیان دەفتن، دەسەڵات وەرگرتن, و هەتا توانایان هەبوو بیگرتن.",
      portraitAlt: "حەلیمە خانم",
      listIcon: "crown",
      greatestAchievement: {
        title: "گەورەترین دەستکەوت",
        text: "حوکمی ناوچەی شاخی ستراتیژی باش کالای کرد لە یەکێک لە نائارامترین سەردەمەکانی مێژووی کورد, بەرگری لە یەکگرتنی دەسەڵاتی عوسمانی تا بە زۆری سەربازی داپێڕدرا.",
      },
      whySheMatters: {
        title: "بۆچی هێشتا گرنگە",
        text: "حەلیمە خانم بیرمان دەخاتەوە کە حوکمی ژنانی کوردی ئاسایی نەبوو, شێوازێک بوو. کاتێک پیاوەکان دەفتن، ژنان حوکم دەکردن. ئەمە مێژوویەکە شایانی گێڕانەوەیە.",
      },
      cards: [
        {
          icon: "♜",
          title: "شوێنی کاتی",
          text: "ناوەڕاستی ١٨٠٠ەکان, سەردەمی داپێڕانی عوسمانی",
        },
        {
          icon: "⛩",
          title: "شوێنی نەخشە",
          text: "باش کالا، ناوچەی ھەکاری (پارێزگای ڤانەی ئەمڕۆ، باشووری ڕۆژھەڵاتی تورکیا)",
        },
      ],
      didYouKnow: {
        title: "ئایا دەزانی؟",
        text: "مێژوونووسی کوردی شەرەفەدینی بیتلیسی تۆمارکرد کە چەندین ژنی کوردی دوای مردنی مێردەکانیان دەسەڵاتیان وەرگرت لە ئیمارەتەکاندا، تا کوڕەکانیان گەورە دەبن. حەلیمە خانم بەشێکە لەم شێوازە سەرنجڕاکێشە.",
      },
      quote:
        "دەسەڵاتی سیاسی ڕاستەقینەی بەکارهێنا, نەک تەنها دەسەڵاتێکی هێمایی, لە جیهانێکی سیاسی پیاوانی.",
      quoteAuthor: "لێکۆڵینەوە مێژووییەکانی کوردی",
    },
    "meryem-khan": {
      nameLine1: "Meryem",
      nameLine2: "Xan",
      role: "سەرۆکی هۆز · دیپلۆمات · دانوستانکار",
      metaLine: "کۆتایی سەدەی نوزدەهەم – سەرەتای سەدەی بیستەم | ناوچەی نەهری، کوردستان",
      intro:
        "لە جەنگی جیهانی یەکەمدا، هێزە سەربازییەکانی ڕوسی پێویستیان بە تێپەڕبوون لە ناوچەی هۆزە کوردییەکان بوو. نامەیان نەنووسی بۆ سلتان یان والی. لەگەڵ خانم مەریەم, ژنێکی کوردی لە خێزانی بەناوبانگی نەهری, دانوستاندن. فەرماندەیانی ڕوسی دەسەڵاتی ئەو ناساند و وەک نوێنەری شاراوەی خەڵکەکەی مامەڵەیان لەگەڵ کرد. ڕێگای پێدا. جەنگەکە لە دەوری کۆمەڵگاکەی دەجوڵا. دەسەڵاتی ئەو پارێزگاریان کرد.",
      portraitAlt: "مەریەم خان",
      listIcon: "crown",
      greatestAchievement: {
        title: "گەورەترین دەستکەوت",
        text: "دانوستانی دیپلۆماتی ڕاستەوخۆی لەگەڵ هێزە سەربازییەکانی ڕوسی ئەنجامدا لە جەنگی جیهانی یەکەم, یەکێک لە یەکەم جاران کە ژنێکی کوردی لەلایەن هێزێکی سەربازی بیانییەوە وەک دەسەڵاتێکی سیاسی شەرعی ناسراوە.",
      },
      whySheMatters: {
        title: "بۆچی هێشتا گرنگە",
        text: "مەریەم خان نیشان دەدات کە سەرکردایەتی ژنانی کوردی لەلایەن سیاسەتی مۆدێرنەوە دروست نەکراوە, پێشتر هەبووە، تەنانەت لەلایەن سوپای بیانییەوە ناسراوە، زۆر پێش ئەوەی کەس داوای مۆڵەت بکات.",
      },
      cards: [
        {
          icon: "♜",
          title: "شوێنی کاتی",
          text: "سەردەمی جەنگی جیهانی یەکەم, نز. ١٩١٤–١٩١٨",
        },
        {
          icon: "⛩",
          title: "شوێنی نەخشە",
          text: "ناوچەی نەهری، سنووری عوسمانی–سەفەوی (باشووری عێراق / سنووری باشووری ڕۆژھەڵاتی تورکیا)",
        },
      ],
      didYouKnow: {
        title: "ئایا دەزانی؟",
        text: "مەریەم خان هەرگیز هەڵبژێردراو نەبوو، هەرگیز دامەزراو نەبوو، و هیچ ناونیشانێکی فەرمی نەبوو, بەڵام هێزێکی سەربازی ئەوروپی وەک سەرۆکی وڵات مامەڵەی لەگەڵ دەکرد. ئەمە پێوانەی دەسەڵاتی ڕاستەقینەی ئەوەیە.",
      },
      quote:
        "دەسەڵاتی گەورەی لە نێو شوێندارەکانی هەبوو, تەنانەت لەلایەن فەرماندەیانی سەربازی بیانییەوە ناسراوە.",
      quoteAuthor: "باسیل نیکیتین، تۆمارێکی بەڵگەدار",
    },
    "mina-qazi": {
      nameLine1: "Mina",
      nameLine2: "Qazi",
      role: "خانمەی یەکەمی کۆماری کوردستان · پێشەنگی مافی ژنان",
      metaLine: "١٩٠٨ – ١٩٩٨",
      intro:
        "سەرکردەیەکی شۆڕشگێڕ و هاوسەری قازی محەممەد، سەرۆکی کۆماری کوردستان بوو. نەریتە کۆنە کۆمەڵایەتییەکان شکاند، وەک کەسایەتییەکی گشتیی بەرچاو دەرکەوت، و لە ئازاری ١٩٤٦دا یەکەم ڕێکخراوی فەرمی ژنانی کوردی دامەزراند بۆ پەرەپێدانی پەروەردە و بەشداری سیاسی. دوای ڕووخانی کۆمار و دەستگیرکردنی مێردەکەی لە ١٩٤٧دا، چەندین سەدە سەختی و فشاری دەوڵەت بەسەریدا گوزەراند. سەرەڕای ئەم ئاستەنگانە، لە مەهاباد مایەوە و ڕەتی کردەوە لە پەسەندان. لە تەواوی ژیانیدا ستونێکی بەهێزی بەردەوام بوو، تەرخانکراو بۆ پاراستنی میراتی مێردەکەی و پشتگیری نەتەوەی کورد.",
      portraitAlt: "مینا قازی",
      listIcon: "flower",
      greatestAchievement: {
        title: "گەورەترین دەستکەوت",
        text: "یەکێتیی ژنانی کوردستان (یەکێتییا ژنێن کوردستان) لە ١٩٤٦دا دامەزراند. بە سەرکەوتوویی ژنان بەکارخست بۆ پشتگیری هەوڵە شارستانی و سەربازییەکانی کۆمار، وانەکانی خوێندنەوەی بۆ کچان ڕێکخست، و بە ناوبانگی لە ناو خەڵکدا لە تەنیشت مێردەکەی دەرکەوت بەبێ پۆشینی نەریتی، تابوو کۆمەڵایەتییەکان شکاند و ڕێگای بەشداری ژنانی کوردی مۆدێرن لە سیاسەتدا کردەوە.",
      },
      whySheMatters: {
        title: "بۆچی هێشتا گرنگە",
        text: "وەک \"دایکی کوردستان\" ڕێزدارە، مینا قازی هێشتا هێمایەکی کۆتاییی خۆڕاگری و سەرکردایەتیی ژنانە لە مێژووی کوردستانە. سەلماند کە تێکۆشینی نەتەوەیی تەنها ئەرکی پیاوان نەبوو. ڕێزی نەگۆڕاوەکەی لە بەرامبەر ڕووخانی کۆمار و پابەندبوونی تەواوی ژیانی بە خەونە دیموکراتییەکەی مێردەکەی، هێشتا سەرچاوەی بنەڕەتیی هاندان بۆ بزووتنەوەکانی ژنانی کوردن.",
      },
      cards: [
        {
          icon: "♜",
          title: "شوێنی کاتی",
          text: "١٩٠٨ تا ١٧ی شوباتی ١٩٩٨, لە ڕێگەی ڕاگەیاندن و ڕووخانی کۆماری کوردستان لە ١٩٤٦دا تێپەڕی",
        },
        {
          icon: "⛩",
          title: "شوێنی نەخشە",
          text: "مەهاباد، ڕۆژھەڵاتی کوردستان (ئێران)، بەتایبەتی میدانی مێژوویی چوارچرا کە کۆمارەکە تێیدا ڕاگەیاندرا",
        },
      ],
      didYouKnow: {
        title: "ئایا دەزانی؟",
        text: "مینا قازی تەنها هاوسەرێکی پشتگیر نەبوو؛ سامانی کەسی میراتگیرکراوی خۆی بەکارهێنا و خزێنەکانی فرۆشت بۆ پشتگیری دارایی کۆماری کوردستان، دامەزراندنی یەکێتیی ژنان، و یارمەتیدانی خێزانەکانی پێشمەرگە.",
      },
      quote:
        "بۆ پێشوا گریان مەکەن؛ ئەو بۆ خۆی نەمر، ژیانی بۆ ئازادکردن و ڕێزی خەڵکەکەی دا.",
      quoteAuthor: "مینا قازی",
    },
    "najiba-jalizada": {
      nameLine1: "Nêjibê Xanî",
      nameLine2: "Jelîzadê",
      role: "ڕۆشنبیر · چالاکوانی مافی ژنان · پێشەنگی پەروەردە",
      metaLine: "لەدایکبوون ٨ی ئەیلوولی ١٩١٧، کۆیە، کوردستانی عێراق | مردن ١٢ی حوزەیرانی ١٩٩٩",
      intro:
        "لە کۆیە لە ١٩١٧دا لەدایک بوو، کچی مەلا محەممەد کۆیی, یەکێک لە زانایانی ئایینی ناوەڕاستی ناوچەکە. لە کاتێکدا تەنانەت ناردنی کوڕان بۆ قوتابخانە بە بارێک دادەنرا، باوکی لە ١٩٢٤دا لەگەڵ کوڕاندا لە قوتابخانەی سەرەتایی کۆیە تۆماری کرد, کارێکی زۆر نائاسایی کە دایک و باوکانی تر لە ناوچەکە هانیان دا کچەکانیان بنێرنە قوتابخانە بەهۆی سەرکەوتنی ئەوەوە. لە ١٩٤٠ەکاندا چووە ژیانی سیاسی و پشتگیرێکی حیزبی ھێوا بوو، دواتر ڕۆڵێکی کاریگەر لە بڵاوکردنەوەی هۆشیاری نەتەوەیی لە سەردەمی کۆماری کوردستاندا گێڕا.",
      portraitAlt: "نەجیبە خانی جەلیزادە",
      listIcon: "flower",
      greatestAchievement: {
        title: "گەورەترین دەستکەوت",
        text: "یەکەمین کچی کۆیە بوو کە لە ١٩٢٤دا چووە قوتابخانەی فەرمی. لە ١٩٥٣دا بە نهێنی وەک سەرۆکی لقی کۆیەی یەکێتیی ژنانی کوردستان هەڵبژێردرا. تەنها چالاکوانی سیاسی نەبوو, سێ بەرگی لێکۆڵینەوەی ئایینی باوکی بڵاوکردەوە و چەندین دەستنووسی گرنگی لەسەر مێژوو و فۆلکلۆری کورد بەجێی هێشت.",
      },
      whySheMatters: {
        title: "بۆچی هێشتا گرنگە",
        text: "سەلماند کە ژنێکی کوردی دەتوانێت ڕۆشنبیر، نووسەر، دایک، و سەرکردەی سیاسی بێت لە یەک کاتدا. دەستنووسەکانی لەسەر مێژووی کۆیە و شۆڕشی ئەیلوول سەرچاوەیەکی مێژوویی نەگۆڕاوە, لە ڕوانگەی ژنێکەوە نووسراوە کە هەمووی بەژێر بینی.",
      },
      cards: [
        {
          icon: "♜",
          title: "شوێنی کاتی",
          text: "سەرەتای سەدەی بیستەم تا کۆتایی, ١٩١٧ تا ١٩٩٩",
        },
        {
          icon: "⛩",
          title: "شوێنی نەخشە",
          text: "کۆیە، سلێمانی، ھەولێر (کوردستانی عێراق), و نیشتەجێبوونەوە لە ئێران",
        },
      ],
      didYouKnow: {
        title: "ئایا دەزانی؟",
        text: "دوای ڕووخانی شۆڕش لە ١٩٧٥دا، نەجیبە خانی چووە نیشتەجێبوونەوە لە ئێران. کاتێک گەڕایەوە سلێمانی، پلەی کۆمەڵایەتی بەرز و ساڵانی چالاکی ناونیشانی ڕێزلێنەرەی بەدەستهێنا, ئەوانەی میراتی ئەو دەناسیان پێی دەوترا \"حەپسەخانە نەقیب\".",
      },
      quote:
        "تەنها قوتابی نەبوو, ئەو گڕێک بوو کە ڕێگای پەروەردەی هەزاران کچی تر لە ناوچەکەدا ڕووناککرد.",
      quoteAuthor: "تۆمارە مێژووییەکانی شاری کۆیە",
    },
  },
  ar: {
    "mastura-ardalan": {
      nameLine1: "Mesture",
      nameLine2: "Erdelan",
      role: "شاعرة · مؤرخة · أول كاتبة كردية",
      metaLine: "١٨٠٥ – ١٨٤٨ | إمارة أردلان، غرب إيران",
      intro:
        "وُلدت في عائلة حاكمة متعلمة من إمارة أردلان، وحصلت على التعلم في وقت حُرم فيه معظم النساء من أي تعليم. أصبحت شاعرة ومؤرخة ومدونة لسلالتها, تكتب بالكردية والفارسية. حين جلب الاضطراب السياسي المنفى والخسارة إلى حياتها، حوّلت ألمها إلى أدب. لم تختفِ في التاريخ. كتبت نفسها فيه.",
      portraitAlt: "مستورة أردلان",
      listIcon: "flower",
      greatestAchievement: {
        title: "أعظم إنجاز",
        text: "كتبت تاريخ أردلان, تاريخ إمارة أردلان, مما جعلها من أوائل المؤرخات المعروفات في كردستان. إلى جانبه، يبقى ديوان شعرها حجراً أساسياً في التراث الأدبي الكردي.",
      },
      whySheMatters: {
        title: "لماذا لا تزال مهمة",
        text: "من دون مستورة، لكان فصلٌ كبير من تاريخ كردستان في القرن التاسع عشر موجوداً فقط من خلال عيون الرجال. أعطت إمارة أردلان صوتها الخاص, وذلك الصوت كان لامرأة.",
      },
      cards: [
        {
          icon: "♜",
          title: "الموقع الزمني",
          text: "القرن التاسع عشر, أوائل القرن التاسع عشر",
        },
        {
          icon: "⛩",
          title: "الموقع الجغرافي",
          text: "منطقة سنندج، إمارة أردلان (غرب إيران / كردستان)",
        },
      ],
      didYouKnow: {
        title: "هل تعلم؟",
        text: "كتبت مستورة سجلها التاريخي في أربعينيات القرن التاسع عشر، في وقت استُبعدت فيه النساء في أنحاء العالم من الحياة الأكاديمية والأدبية. فعلت ذلك على أي حال, من المنفى.",
      },
      quote:
        "يجمع صوتها الشعري الحزن الشخصي مع تأملات أوسع في المجتمع والقدر, صوت لا يزال يتحدث عبر القرون.",
      quoteAuthor: "مؤرخو الأدب الكردي",
    },
    "adela-khanum": {
      nameLine1: "Adile",
      nameLine2: "Xanî Jaff",
      role: "حاكمة حلبجة · قائدة قبيلة الجاف",
      metaLine: "نحو ١٨٤٧ – ١٩٢٤ | حلبجة، كردستان العراق",
      intro:
        "حين توفي زوجها عام ١٩٠٩، لم تنحز عادلة خانم جانباً. تقدّمت, وحكمت حلبجة مكانه. تحت قيادتها، تحوّلت مستوطنة متواضعة إلى مركز إقليمي للتجارة والعدل والثقافة. بنت المحاكم والأسواق والسجون. تفاوضت مع حكام العثمانيين والضباط البريطانيين والقبائل المحلية, بشروطها الخاصة. وصفتها الدبلوماسية البريطانية غيرترود بيل بأنها شخصية لافتة تتصرف كما تتصرف سيدات الأكراد العظيمات.",
      portraitAlt: "عادلة خانم",
      listIcon: "crown",
      greatestAchievement: {
        title: "أعظم إنجاز",
        text: "منحت لقب خان-باهادور من البريطانيين ولُقّبت بـ 'أميرة الشجعان', كانت القائدة الأنثى الوحيدة في المنطقة التي نالت مثل هذا التقدير. حوّلت حلبجة من مستوطنة صغيرة إلى مركز إداري وثقافي مزدهر.",
      },
      whySheMatters: {
        title: "لماذا لا تزال مهمة",
        text: "أثبتت عادلة خانم أن المرأة الكردية تستطيع حكم منطقة، وكسب احترام القوى الأجنبية، وبناء مدينة, في وقت قال فيه العالم كله إنها لا تستطيع.",
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
      nameLine1: "Hepsexana",
      nameLine2: "Neqib",
      role: "مربية · ناشطة · مؤسسة أول مدرسة للبنات في كردستان",
      metaLine: "١٨٩١ – ١٢ نيسان ١٩٥٣ | السليمانية، كردستان العراق",
      intro:
        "حين قصفت بريطانيا السليمانية في أوائل عشرينيات القرن الماضي، غادر كل من استطاع المغادرة. بقيت حفصة خانم. وبينما هرب الآخرون، بقيت مع العائلات التي لا مكان لها, وواصلت القتال من أجلهم بعد سقوط القنابل. ذهبت من باب إلى باب في المدينة لإقناع الآباء بإرسال بناتهم إلى المدرسة. وإذا لم تستطع عائلة تحمل التكلفة، دفعت هي بنفسها. في ١٩٢٦ افتتحت أول مدرسة للبنات في السليمانية. وفي ١٩٣٠ كتبت إلى عصبة الأمم مطالبة بحقوق الأكراد.",
      portraitAlt: "حفصة خانم",
      listIcon: "flower",
      greatestAchievement: {
        title: "أعظم إنجاز",
        text: "أسست الجمعية الكردية للمرأة, أول منظمة لحقوق المرأة في كردستان العراق, وأنشأت أول مدرسة للبنات في السليمانية، مموّلة شخصياً الطالبات اللواتي لا تستطيع عائلاتهن تحمل التكاليف.",
      },
      whySheMatters: {
        title: "لماذا لا تزال مهمة",
        text: "فهمت حفصة خانم أن الأمة تُبنى فتاة متعلمة واحدة في كل مرة. كل ما بنته, المدرسة، الجمعية، الرسالة إلى عصبة الأمم, لا يزال يتردد صداه في كردستان اليوم.",
      },
      cards: [
        {
          icon: "♜",
          title: "الموقع الزمني",
          text: "أوائل القرن العشرين, من عشرينيات إلى خمسينيات القرن",
        },
        {
          icon: "⛩",
          title: "الموقع الجغرافي",
          text: "السليمانية، كردستان العراق",
        },
      ],
      didYouKnow: {
        title: "هل تعلم؟",
        text: "بعد وفاة حفصة خانم عام ١٩٥٣، حُوّل منزلها إلى مدرسة, لأن المبنى الذي ربّاها أصبح المبنى الذي ربّى غيرها.",
      },
      quote: "لا فرق بين الرجال والنساء... لذلك سأواصل.",
      quoteAuthor: "حفصة خانم",
    },
    "khanzada-khanum": {
      nameLine1: "Mîr Xanzad",
      nameLine2: "a Soranê",
      role: "حاكمة سوران · قائدة ٥٠٬٠٠٠ جندي",
      metaLine: "أوائل القرن السابع عشر | إمارة سوران، منطقة أربيل",
      intro:
        "حين قُتل أخوها، حاكم إمارة سوران، على يد قائد خائن، لم تحز خانزاد في صمت. تولّت السيطرة على الإمارة بأكملها، وأمرت جيشها، وحكمت شعبها سبع سنوات. استدرجت القاتل إلى لقاء تحت ذريعة الزواج, وأعدمته مع جميع رجاله. ثم بنت طرقاً ومدارس ومساجد وحصناً لا يزال قائماً شرق أربيل اليوم.",
      portraitAlt: "خانزاد خانم",
      listIcon: "crown",
      greatestAchievement: {
        title: "أعظم إنجاز",
        text: "قادت جيشاً من ٥٠٬٠٠٠ جندي، وبنت قلعة خانزاد على طريق أربيل–شقلاوة, حصن لا يزال قائماً, ووسّعت أراضي إمارة سوران بتحرير مناطق من السيطرة العثمانية والصفوية.",
      },
      whySheMatters: {
        title: "لماذا لا تزال مهمة",
        text: "منذ أربعة قرون، أمرت امرأة كردية بأكبر جيش في المنطقة وبنت حصناً فاقى الإمبراطوريات. لا تزال قلعة خانزاد قائمة شرق أربيل, دليل مرئي على أنها كانت حقيقية.",
      },
      cards: [
        {
          icon: "♜",
          title: "الموقع الزمني",
          text: "أوائل ١٦٠٠, عصر إمارة سوران",
        },
        {
          icon: "⛩",
          title: "الموقع الجغرافي",
          text: "راوندوز (العاصمة)، هرير، سوران, محافظة أربيل، كردستان العراق",
        },
      ],
      didYouKnow: {
        title: "هل تعلم؟",
        text: "أول فرقة روك كردية نسائية بالكامل, تشكّلت في أربيل عام ١٩٨٠, سمّت نفسها خانزاد تكريماً لها. وصف مديرها ذلك بأنه 'خطوة جذرية لحركة المرأة في كردستان'.",
      },
      quote:
        "أثبتت أن المرأة تستطيع أداء واجباتها ومواجهة جميع المؤامرات والخطط التي صممها أعداؤها لها.",
      quoteAuthor: "السجل التاريخي الكردي",
    },
    "halima-khanum": {
      nameLine1: "Halima Xanim",
      nameLine2: "a Hekkariyê",
      role: "حاكمة باش كالا · قائدة قبلية كردية",
      metaLine: "أواخر القرن التاسع عشر | باش كالا، هكاري, جنوب شرق تركيا اليوم",
      intro:
        "في أواخر القرن التاسع عشر، حين سعت الإمبراطورية العثمانية إلى سحق الاستقلال الكردي وتفكيك نظام الإمارات الكردية، حكمت حليمة خانم باشكالا في جبال هكاري. أبقت على منصبها حتى أُجبرت على الاستسلام بعد قمع ثورة بدر خان عام ١٨٤٧. كانت إحدى عدة نساء كرديات تولّين السلطة حين سقط الرجال من حولهن, وأبقينها ما استطعن.",
      portraitAlt: "حليمة خانم",
      listIcon: "crown",
      greatestAchievement: {
        title: "أعظم إنجاز",
        text: "حكمت المنطقة الجبلية الاستراتيجية لباش كالا خلال أحد أكثر فترات التاريخ الكردي اضطراباً, مقاومة توحيد السلطة العثمانية حتى غُمرت عسكرياً.",
      },
      whySheMatters: {
        title: "لماذا لا تزال مهمة",
        text: "تذكّرنا حليمة خانم أن حكم النساء الكرديات لم يكن استثنائياً, بل كان نمطاً. حين سقط الرجال، حكمت النساء. هذا تاريخ يستحق أن يُروى.",
      },
      cards: [
        {
          icon: "♜",
          title: "الموقع الزمني",
          text: "منتصف ١٨٠٠, عصر القمع العثماني",
        },
        {
          icon: "⛩",
          title: "الموقع الجغرافي",
          text: "باش كالا، منطقة هكاري (محافظة وان اليوم، جنوب شرق تركيا)",
        },
      ],
      didYouKnow: {
        title: "هل تعلم؟",
        text: "وثّق المؤرخ الكردي شرف الدين البتليسي أن عدة نساء كرديات تولّين السلطة في الإمارات بعد وفاة أزواجهن، محكمن حتى يبلغ أبناؤهن سن الرشد. حليمة خانم جزء من هذا النمط الرائع.",
      },
      quote:
        "مارست سلطة سياسية حقيقية, لا سلطة رمزية فحسب, في عالم سياسي يهيمن عليه الرجال.",
      quoteAuthor: "الدراسات التاريخية الكردية",
    },
    "meryem-khan": {
      nameLine1: "Meryem",
      nameLine2: "Xan",
      role: "قائدة قبلية · دبلوماسية · مفاوضة",
      metaLine: "أواخر القرن التاسع عشر – أوائل العشرين | منطقة نهري، كردستان",
      intro:
        "خلال الحرب العالمية الأولى، احتاجت القوات العسكرية الروسية إلى التحرك عبر أراضي القبائل الكردية. لم تكتب إلى سلطان أو حاكم. تفاوضت مع السيدة مريم, امرأة كردية من عائلة نهري البارزة. اعترف القادة الروس بسلطتها وتعاملوا معها كممثلة شرعية لشعبها. منحت المرور. تحركت الحرب حول مجتمعها. حمتها سلطتها.",
      portraitAlt: "مريم خان",
      listIcon: "crown",
      greatestAchievement: {
        title: "أعظم إنجاز",
        text: "أجرت مفاوضات دبلوماسية مباشرة مع القوات العسكرية الروسية خلال الحرب العالمية الأولى, من أوائل الحالات التي اعترفت فيها قوة عسكرية أجنبية بامرأة كردية كسلطة سياسية شرعية.",
      },
      whySheMatters: {
        title: "لماذا لا تزال مهمة",
        text: "تُظهر مريم خان أن قيادة النساء الكرديات لم تُخلق بالسياسة الحديثة, بل كانت موجودة أصلاً، معترفاً بها حتى الجيوش الأجنبية، قبل أن يطلب أحد الإذن.",
      },
      cards: [
        {
          icon: "♜",
          title: "الموقع الزمني",
          text: "عصر الحرب العالمية الأولى, نحو ١٩١٤–١٩١٨",
        },
        {
          icon: "⛩",
          title: "الموقع الجغرافي",
          text: "منطقة نهري، الحدود العثمانية–الصفوية (شمال العراق / جنوب شرق تركيا)",
        },
      ],
      didYouKnow: {
        title: "هل تعلم؟",
        text: "لم تُنتخب مريم خان قط، ولم تُعيَّن، ولم تكن تحمل لقباً رسمياً, ومع ذلك عاملها جيش أوروبي كرئيس دولة. هذا هو مقياس سلطتها الحقيقية.",
      },
      quote:
        "تمتعت بسلطة عظيمة بين أتباعها, معترف بها حتى من قادة عسكريين أجانب.",
      quoteAuthor: "باسيل نيكيتين، رواية موثقة",
    },
    "mina-qazi": {
      nameLine1: "Mina",
      nameLine2: "Qazi",
      role: "السيدة الأولى لجمهورية كردستان · رائدة حقوق المرأة",
      metaLine: "١٩٠٨ – ١٩٩٨",
      intro:
        "كانت قائدة ثورية وزوجة قازي محمد، رئيس جمهورية كردستان. حطمت التقاليد الاجتماعية الراسخة، وبرزت كشخصية عامة بارزة، وفي آذار ١٩٤٦ أسست أول منظمة رسمية للمرأة الكردية لتعزيز التعليم والمشاركة السياسية. بعد سقوط الجمهورية وإعدام زوجها عام ١٩٤٧، تحملت عقوداً من المشقة الهائلة والضغط الحكومي. رغم ذلك، بقيت في مهاباد رافضة الخضوع لقمعها. طوال حياتها ظلت ركيزة ثابتة من القوة، مكرسة للحفاظ على إرث زوجها ودعم الأمة الكردية.",
      portraitAlt: "مينا قازي",
      listIcon: "flower",
      greatestAchievement: {
        title: "أعظم إنجاز",
        text: "أسست اتحاد المرأة الكردية (Yekêtiya Jinên Kurdistan) عام ١٩٤٦. حشدت النساء بنجاح لدعم الجهود المدنية والعسكرية للجمهورية، ونظمت صفوف محو الأمية للفتيات، وظهرت علناً إلى جانب زوجها دون حجاب تقليدي، محطمةً المحظورات الاجتماعية وممهدةً الطريق لمشاركة المرأة الكردية الحديثة في السياسة.",
      },
      whySheMatters: {
        title: "لماذا لا تزال مهمة",
        text: "المُبجلة بـ \"أم كردستان\"، تبقى مينا قازي الرمز الأسمى للصمود والقيادة النسائية في التاريخ الكردي. أثبتت أن النضال الوطني لم يكن واجب الرجال وحدهم. كرامتها الثابتة أمام انهيار الجمهورية، والتزامها مدى الحياة بالحلم الديمقراطي لزوجها، يظلان مصدر الإلهام الأساسي لحركات المرأة الكردية اليوم.",
      },
      cards: [
        {
          icon: "♜",
          title: "الموقع الزمني",
          text: "١٩٠٨ حتى ١٧ شباط ١٩٩٨, عاشت إعلان وسقوط جمهورية كردستان عام ١٩٤٦",
        },
        {
          icon: "⛩",
          title: "الموقع الجغرافي",
          text: "مهاباد، كردستان الشرقية (إيران)، ولا سيما ساحة تشوار تشيرا التاريخية حيث أُعلنت الجمهورية",
        },
      ],
      didYouKnow: {
        title: "هل تعلم؟",
        text: "لم تكن مينا قازي مجرد زوجة داعمة؛ استخدمت ثروتها الشخصية الموروثة وباعت مجوهراتها لدعم جمهورية كردستان مالياً، وتمويل تأسيس اتحاد المرأة، ومساعدة عائلات البيشمركة.",
      },
      quote:
        "لا تبكوا على البيشوا؛ لم يمت لنفسه، بل أعطى حياته لتحرير شعبه وكرامته.",
      quoteAuthor: "مينا قازي",
    },
    "najiba-jalizada": {
      nameLine1: "Nêjibê Xanî",
      nameLine2: "Jelîzadê",
      role: "مثقفة · ناشطة حقوق المرأة · رائدة التعليم",
      metaLine: "وُلدت ٨ أيلول ١٩١٧، كويس، كردستان العراق | توفيت ١٢ حزيران ١٩٩٩",
      intro:
        "وُلدت في كويس عام ١٩١٧، ابنة ملا محمد كويي, أحد أبرز العلماء الدينيين في المنطقة. في وقت كان إرسال الأولاد إلى المدرسة عبئاً، ألحقها والدها مع الأولاد في المدرسة الابتدائية في كويس عام ١٩٢٤, فعل غير مألوف ألهم آباء آخرين في المنطقة لإرسال بناتهم إلى المدرسة بفضل نجاحها. في الأربعينيات دخلت الحياة السياسية وأصبحت داعمة لحزب هيوا، ولعبت لاحقاً دوراً مؤثراً في نشر الوعي الوطني خلال عصر جمهورية كردستان.",
      portraitAlt: "نجيبة خاني جليزادة",
      listIcon: "flower",
      greatestAchievement: {
        title: "أعظم إنجاز",
        text: "كانت أول فتاة في كويس تلتحق بالمدرسة الرسمية عام ١٩٢٤. في ١٩٥٣ انتُخبت سراً رئيسة لفرع كويس في اتحاد المرأة الكردية. لم تكن ناشطة سياسية فحسب, بل نشرت ثلاثة مجلدات من شروح والدها الدينية وتركت عدة مخطوطات مهمة عن التاريخ والفولكلور الكردي.",
      },
      whySheMatters: {
        title: "لماذا لا تزال مهمة",
        text: "أثبتت أن المرأة الكردية تستطيع أن تكون مثقفة وكاتبة وأماً وقائدة سياسية في آن واحد. مخطوطاتها عن تاريخ كويس وثورة أيلول مصدر تاريخي لا يُعوَّض, مكتوبة من منظور امرأة عاشت كل ذلك.",
      },
      cards: [
        {
          icon: "♜",
          title: "الموقع الزمني",
          text: "أوائل القرن العشرين حتى أواخره, ١٩١٧ إلى ١٩٩٩",
        },
        {
          icon: "⛩",
          title: "الموقع الجغرافي",
          text: "كويس، السليمانية، أربيل (كردستان العراق), والمنفى في إيران",
        },
      ],
      didYouKnow: {
        title: "هل تعلم؟",
        text: "بعد انهيار الثورة عام ١٩٧٥، ذهبت نجيبة خاني إلى المنفى في إيران. حين عادت إلى السليمانية، أكسبها مكانتها الاجتماعية العالية وسنوات نشاطها لقباً فخرياً, كان يُدعى بها \"حفصة خانم النقيب\" من قبل من عرفوا إرثها.",
      },
      quote:
        "لم تكن مجرد طالبة, بل كانت لهباً أضاء طريق التعليم لآلاف الفتيات الأخريات في المنطقة.",
      quoteAuthor: "السجلات التاريخية لمدينة كويس",
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
