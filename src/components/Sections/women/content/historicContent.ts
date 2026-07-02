import type { WomenLangCode } from "@/components/Sections/women/womenLanguage";
import { womenCardLabels } from "@/components/Sections/women/womenLanguage";
import {
  arHistoricDetails,
  arHistoricList,
} from "@/components/Sections/women/content/arWomenContentData";
import {
  kuHistoricDetails,
  kuHistoricList,
  kuHistoricPageCopy,
} from "@/components/Sections/women/content/kuWomenContentData";

import masturaDetail from "@/assets/images/womens/mastura.webp";
import adilaDetail from "@/assets/images/womens/adila.webp";
import hafsaDetail from "@/assets/images/womens/hapsaxan.webp";
import khanzadDetail from "@/assets/images/womens/khanzad.webp";
import halimaDetail from "@/assets/images/women/historic-detail/halima-khanum-detail.webp";
import meryemDetail from "@/assets/images/womens/maryamkhan.webp";
import minaDetail from "@/assets/images/womens/minaqazi.webp";
import najibaDetail from "@/assets/images/womens/najibakhan.webp";

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
      { text: "True leadership can uplift a city and forge a nation.", author: "Adela Khanum" },
      { text: "There is no difference between men and women... so I am going to continue.", author: "Hapsa Khan" },
    ],
  },
  ku: {
    backToWomen: "گەڕانەوە بۆ ژنان",
    backToList: "گەڕانەوە بۆ لیست",
    heroTitle1: "ژنانی",
    heroTitle2: "مێژوویی",
    heroSubtitle: "شاعیر، حاکم، مامۆستا،\nو سەرۆکی هۆز.",
    ...kuHistoricPageCopy,
    legacyTitle: "میراتی دانایی",
    legacySubtitle: "شیعر، دادپەروەری، و فێربوون.",
    quotes: [
      { text: "لە ناو جەرگەی مێژوودا، تەختێکی بۆ خۆی بونیاد نا.", author: "مەستورەی ئەردەڵان" },
      { text: " سەرکردایەتیی ڕاستەقینە دەتوانێت شارێک ئاوا بکات و نەتەوەیەک دروست بکات", author: "عادیلە خانم" },
      { text: "هیچ جیاوازییەک لە نێوان پیاوان و ژناندا نییە... بۆیە من بەردەوام دەبم.", author: "حەپسەخانی نەقیب" },
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
      name: "Adela Khanum",
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
  ku: kuHistoricList,
  ar: arHistoricList,
};

const detailsByLang: Record<WomenLangCode, Record<string, HistoricDetailContent>> = {
  en: {
    "mastura-ardalan": {
      nameLine1: "Mesture",
      nameLine2: "Erdelan",
      role: "Poet · Historian · First Kurdish Female Writer",
      metaLine: "1805 – 1848 | Sanandaj, Eastern Kurdistan",
      intro:
        "Born into the educated ruling family of the Ardalan principality, Mastura was given access to learning at a time when most women were denied any education at all. She became a poet, a historian, and a chronicler of her dynasty, writing in both Kurdish and Persian. When political upheaval brought exile and loss to her life, she turned her pain into literature. She did not disappear into history. She wrote herself into it.",
      portraitAlt: "Mastura Ardalan",
      listIcon: "flower",
      greatestAchievement: {
        title: "Greatest Achievement",
        text: "She wrote Tarikhi Ardalan, the history of the Ardalan dynasty, making her one of the earliest known women historians in Kurdistan. Alongside it, her Diwan of poetry remains a cornerstone of Kurdish literary heritage.",
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
      metaLine: "c. 1847 – 1924 | Halabja, Kurdistan Region of Iraq",
      intro:
        "When her husband died in 1909, Adela Khanum did not step aside. She stepped forward and ruled Halabja in his place. Under her leadership, a modest settlement became a regional center of trade, justice, and culture. She built courts, markets, and prisons. She negotiated with Ottoman governors, British officers, and local tribes on her own terms. British diplomat Gertrude Bell described her as a striking personality who acted as great Kurdish ladies do.",
      portraitAlt: "Adela Khanum",
      listIcon: "crown",
      greatestAchievement: {
        title: "Greatest Achievement",
        text: "She was appointed the title Khan-Bahadur by the British and called 'Princess of the Brave', the only female leader in the region to receive such recognition. She transformed Halabja from a small settlement into a thriving administrative and cultural hub.",
      },
      whySheMatters: {
        title: "Why She Still Matters",
        text: "Adela Khanum proved that a Kurdish woman could govern a region, command respect from foreign powers, and build a city, at a time when the whole world said she couldn't.",
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
        text: "Famous British traveler and diplomat Gertrude Bell personally visited Adela Khanum and wrote about her in letters that are preserved in the British Museum. Bell was not easily impressed.",
      },
      quote:
        "Her position was probably unique owing to a happy combination of rank and character.",
      quoteAuthor: "E.B. Soane, British officer, 1926",
    },
    "hafsa-khanum": {
      nameLine1: "Hepsexana",
      nameLine2: "Neqib",
      role: "Educator · Activist · Founder of the First Girls' School in Kurdistan",
      metaLine: "1891 – 1953 | Sulaymaniyah, Kurdistan Region of Iraq",
      intro:
        "When the British bombed Sulaymaniyah in the early 1920s, everyone who could leave did. Hapsa Khan stayed. While others fled, she stayed with the families who had nowhere to go, and kept fighting for them after the bombs fell. She went door to door across the city to convince parents to send their daughters to school. If a family could not afford it, she paid herself. In 1930 she wrote to the League of Nations to demand Kurdish rights.",
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
      metaLine: "Early 17th Century | Erbil, Kurdistan Region of Iraq",
      intro:
        "When her brother, the ruler of the Soran Emirate, was murdered by a treacherous commander, Khanzad did not mourn in silence. She took control of the entire emirate, commanded its army, and governed its people for seven years. She lured the murderer into a meeting under the pretense of marriage, and had him executed along with all his men. Then she built roads, schools, mosques, and a fortress.",
      portraitAlt: "Khanzad Khanum",
      listIcon: "crown",
      greatestAchievement: {
        title: "Greatest Achievement",
        text: "She commanded an army of 50,000 soldiers, built Khanzad Castle on the Erbil – Shaqlawa road, a fortress that still stands and expanded the Soran Emirate's territory by liberating areas from Ottoman and Safavid control.",
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
        text: "The first all-female Kurdish band — formed in Erbil in 1980 — named themselves Khanzad in her honor. Their manager called it 'a radical step for the women's movement in Kurdistan.'",
      },
      quote:
        "She proved that a woman could do her duties and confront all plots and plans her enemies designed for her.",
      quoteAuthor: "Kurdish historical record",
    },
    "halima-khanum": {
      nameLine1: "Halima Xanim",
      nameLine2: "a Hekkariyê",
      role: "Ruler of Bash Kala · Kurdish Tribal Leader",
      metaLine: "Late 19th Century | Bash Kala, Hakkari — Northern Kurdistan",
      intro:
        "In the late 19th century, as the Ottoman Empire moved to crush Kurdish autonomy and dismantle the Kurdish emirate system, Halima Xanim ruled Bashkala in the Hakkari mountains. She held her position until she was forced to surrender following the suppression of the Bedir Khan revolt in 1847. She was one of several Kurdish women who stepped into power when the men around them fell, and held it as long as they could.",
      portraitAlt: "Halima Xanim",
      listIcon: "crown",
      greatestAchievement: {
        title: "Greatest Achievement",
        text: "She governed the strategic mountain region of Bash Kala during one of the most turbulent periods of Kurdish history.",
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
        text: "Kurdish historian Sharaf ad-Din Bitlisi documented that multiple Kurdish women assumed power in principalities after the death of their husbands, governing until their sons came of age.",
      },
      quote:
        "She exercised real political authority not merely symbolic power, in a male-dominated political world.",
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
      metaLine: "1908 – 1998 | Mahabad, Eastern Kurdistan",
      intro:
        "She was a revolutionary leader and the wife of Qazi Muhammad, the President of the Republic of Kurdistan. Breaking deep-seated social traditions, she emerged as a prominent public figure and, in March 1946, established the first official Kurdish women's organization to promote education and political participation. Following Republic's fall and her husband's execution in 1947, she endured decades of immense hardship and state pressure. Despite these challenges, she remained in Mahabad, refusing to yield to her oppressors.",
      portraitAlt: "Mina Qazi",
      listIcon: "flower",
      greatestAchievement: {
        title: "Greatest Achievement",
        text: 'She founded the "Kurdish Women\'s Union" (Yekêtiya Jinên Kurdistan) in 1946. She successfully mobilized women to support the Republic\'s civic life and paved the way for modern Kurdish women\'s participation in politics.',
      },
      whySheMatters: {
        title: "Why She Still Matters",
        text: "Mina Qazi remains the ultimate symbol of resilience and female leadership in Kurdish history. She proved that the national struggle was not only the duty of men.",
      },
      cards: [
        {
          icon: "♜",
          title: "Timeline Position",
          text: "1908 until February 17, 1998",
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
      nameLine1: "Najiba Khani",
      nameLine2: "Jelizadeh",
      role: "Intellectual · Women's Rights Activist · Pioneer of Education",
      metaLine: "1917 – 1999 | Koya, Kurdistan Region of Iraq",
      intro:
        "She was born in Koya in 1917, the daughter of Mala Muhammed Koyi, one of the most respected religious scholars of the region. At a time when even sending boys to school was considered a burden, her father enrolled her alongside boys in Koya's primary school in 1924, an act so unusual that other parents in the area were inspired to send their own daughters to school because of her success. In the 1940s she entered political life.",
      portraitAlt: "Najiba Khani Jelizadeh",
      listIcon: "flower",
      greatestAchievement: {
        title: "Greatest Achievement",
        text: "In 1953 she was secretly elected as president of the Women's Union of Kurdistan, Koya branch. She published three volumes of her father's religious commentaries and left behind several important manuscripts on Kurdish history and folklore.",
      },
      whySheMatters: {
        title: "Why She Still Matters",
        text: "She proved that a Kurdish woman could be an intellectual, a writer, a mother, and a political leader all at once.",
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
          text: "Koya, Sulaymaniyah, Erbil (Iraqi Kurdistan)",
        },
      ],
      didYouKnow: {
        title: "Did You Know?",
        text: "After the collapse of the revolution in 1975, Najiba Khani went into exile in Iran. When she returned to Sulaymaniyah, her high social standing and years of activism earned her an honorary title.",
      },
      quote:
        "She was not just a student, she was a flame that lit the path of education for thousands of other girls in the region.",
      quoteAuthor: "Historical records of Koya city",
    },
  },
  ku: kuHistoricDetails,
  ar: arHistoricDetails,
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
