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

import adilaDetail from "@/assets/images/womens/adila.webp";
import khanzadDetail from "@/assets/images/womens/khanzad.webp";
import halimaDetail from "@/assets/images/women/historic-detail/halima-khanum-detail.webp";
import meryemDetail from "@/assets/images/womens/maryamkhan.webp";
import minaDetail from "@/assets/images/womens/minaqazi.webp";
import mayanDetail from "@/assets/images/womens/mayankhan.webp";
import nahidaDetail from "@/assets/images/womens/nadia-sheikh.webp";
import danielleDetail from "@/assets/images/womens/danielle.png";

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
  "adela-khanum": adilaDetail,
  "khanzada-khanum": khanzadDetail,
  "halima-khanum": halimaDetail,
  "meryem-khan": meryemDetail,
  "mayan-khatun": mayanDetail,
  "mina-qazi": minaDetail,
  "nahida-sheikh-salam": nahidaDetail,
  "danielle-mitterrand": danielleDetail,
};

const pageCopy: Record<WomenLangCode, HistoricPageCopy> = {
  en: {
    backToWomen: "Back to Women",
    backToList: "Back to list",
    heroTitle1: "Stateswomen &",
    heroTitle2: "Political Leaders",
    heroSubtitle: "Rulers, diplomats, advocates, and leaders who shaped Kurdish political life.",
    heroIntro:
      "Princesses, parliamentarians, tribal leaders, and international allies who carried their people through empire, mandate, and modern statehood.",
    legacyTitle: "Legacy of leadership",
    legacySubtitle: "Governance, diplomacy, and courage.",
    quotes: [
      { text: "True leadership can uplift a city and forge a nation.", author: "Adela Khanum" },
      { text: "A leader is not defined by their title, but by their ability to keep their people united.", author: "Mayan Khatun" },
      { text: "Defending human rights knows no national borders.", author: "Danielle Mitterrand" },
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
      id: "adela-khanum",
      name: "Adela Khanum",
      role: "Ruler of Halabja · Leader of the Jaff Tribe",
      teaser:
        "When her husband died in 1909, she stepped forward to rule Halabja, transforming it into a center of trade, justice, and culture.",
      icon: "crown",
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
      id: "mayan-khatun",
      name: "Mayan Khatun",
      role: "Yazidi Princess · Leader of the Yazidi Community",
      teaser:
        "She led the Yazidi Supreme Spiritual Council for decades — navigating Ottoman collapse, British rule, and the birth of modern Iraq.",
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
      id: "nahida-sheikh-salam",
      name: "Nahida Sheikh Salam",
      role: "Writer · Cultural Pioneer · Activist",
      teaser:
        "Educator, poet, and nationalist who established a school for girls in Sulaymaniyah and mobilized youth for the Kurdish cause.",
      icon: "flower",
    },
    {
      id: "danielle-mitterrand",
      name: "Danielle Mitterrand",
      role: "Human Rights Activist · First Lady of France · Friend of the Kurdish People",
      teaser:
        "After the Halabja chemical attack, she became one of Europe's most influential voices supporting the Kurdish people.",
      icon: "crown",
    },
  ],
  ku: kuHistoricList,
  ar: arHistoricList,
};

const detailsByLang: Record<WomenLangCode, Record<string, HistoricDetailContent>> = {
  en: {
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
    "mayan-khatun": {
      nameLine1: "Mayan",
      nameLine2: "Khatun",
      role: "First Lady of the Republic · The Great Yazidi Princess · Leader of the Yazidi Community",
      metaLine: "1874 – 1957 | Shekhan, Nineveh, Kurdistan Region of Iraq",
      intro:
        "Mayan Khatun was the influential supreme leader and princess of the Yazidi community, navigating her people through a highly turbulent era in history. As a member of the noble house of Yazidi Mirs, she became the de facto ruler following her husband's death and headed the Yazidi Supreme Spiritual Council for decades. Renowned for her exceptional diplomatic acumen, she expertly mediated inter-tribal disputes and fought fiercely to protect the Yazidi faith and community during the complex political shifts of early 20th-century Mesopotamia.",
      portraitAlt: "Mayan Khatun",
      listIcon: "crown",
      greatestAchievement: {
        title: "Greatest Achievement",
        text: "She was the first woman in modern Yazidi history to lead the community's Supreme Spiritual Council for over four decades. Her greatest achievement was maintaining the cultural and religious integrity of the Yazidis during the transition from the Ottoman Empire to the modern state of Iraq.",
      },
      whySheMatters: {
        title: "Why She Still Matters",
        text: "Mayan Khatun remains an unparalleled figure of female authority in Yazidi history. She proved that even in the most insular and traditional environments, a woman could rise to become the absolute protector and voice of her people.",
      },
      cards: [
        { icon: "♜", title: "Timeline Position", text: "1874 until 1957" },
        { icon: "⛩", title: "Map Location", text: "Shekhan district, Nineveh Governorate" },
      ],
      didYouKnow: {
        title: "Did You Know?",
        text: "Mayan Khatun exercised authority that went beyond the spiritual; she held the final say in matters of community law and tribal governance, often issuing decrees that were respected across the entire Yazidi diaspora.",
      },
      quote:
        "A leader is not defined by their title, but by their ability to keep their people united in the face of the storm.",
      quoteAuthor: "Attributed to Mayan Khatun",
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
    "nahida-sheikh-salam": {
      nameLine1: "Nahida",
      nameLine2: "Sheikh Salam",
      role: "Writer · Cultural Pioneer · Activist",
      metaLine: "1922 – September 16, 1999 | Sulaymaniyah, Kurdistan Region of Iraq",
      intro:
        "She was a prominent Kurdish educator, poet, and writer from Sulaymaniyah who devoted her life to women's rights, national awareness, and the Kurdish cause. A member of Komeley Hiwa from 1935, she combined teaching with activism, supported the Mala Mustafa Barzani movement, mobilized youth, and made her home a refuge for those committed to Kurdish culture and liberation.",
      portraitAlt: "Nahida Sheikh Salam",
      listIcon: "flower",
      greatestAchievement: {
        title: "Greatest Achievement",
        text: "Her primary legacy lies in pioneering girls' education and nationalist activism. After completing her studies at the Teachers' House in Baghdad in 1940, she established a school for girls in Sulaymaniyah, significantly advancing women's education in the city.",
      },
      whySheMatters: {
        title: "Why She Still Matters",
        text: "Nahida Sheikh Salam remains an essential figure in Kurdish intellectual history. She proved that Kurdish women could simultaneously be pillars of the education system and frontline national activists. Her life serves as an enduring bridge between the early 20th-century movements for Kurdish consciousness and the modern era.",
      },
      cards: [
        { icon: "♜", title: "Timeline Position", text: "1922 until September 16, 1999." },
        { icon: "⛩", title: "Map Location", text: "Sulaymaniyah, Kurdistan Region of Iraq." },
      ],
      didYouKnow: {
        title: "Did You Know?",
        text: "She was deeply committed to the belief that the national struggle was not exclusively the domain of men and that women were equally capable of bearing the burden of national responsibility.",
      },
      quote:
        "I was the first Kurdish woman to join the struggle... because I believed that a woman should be a partner to a man in building the nation.",
      quoteAuthor: "Attributed to Nahida Sheikh Salam",
    },
    "danielle-mitterrand": {
      nameLine1: "Danielle",
      nameLine2: "Mitterrand",
      role: "Human Rights Activist · First Lady of France · Friend of the Kurdish People",
      metaLine: "1924 – 2011 | Verdun, France",
      intro:
        "A renowned human rights activist, Danielle Mitterrand began her journey as a member of the French Resistance against the Nazis. As First Lady of France, she championed the rights of marginalized peoples worldwide. Following the Halabja chemical attack, she became the Kurdish people's most influential voice in Europe. Through her frequent visits to Kurdistan and relentless international advocacy, she became a symbol of humanitarianism and a cherished friend of the Kurdish people.",
      portraitAlt: "Danielle Mitterrand",
      listIcon: "crown",
      greatestAchievement: {
        title: "Greatest Achievement",
        text: "In 1986, she founded the France Libertés foundation, which grew into a globally recognized human rights organization. Through this institution, she championed the cause of oppressed peoples—particularly the Kurds—working tirelessly to bring their struggles and tragedies to the attention of the international community.",
      },
      whySheMatters: {
        title: "Why She Still Matters",
        text: "True allies stand by the oppressed in their darkest hours, not just in times of peace. Danielle Mitterrand became a powerful voice for the Kurds when the world was silent. Her unwavering humanitarian legacy lives on today, remembered across Kurdistan as the \"Friend of the Kurdish People.\"",
      },
      cards: [
        { icon: "♜", title: "Timeline Position", text: "1924 to 2011" },
        { icon: "⛩", title: "Map Location", text: "Verdun, France and Kurdistan" },
      ],
      didYouKnow: {
        title: "Did You Know?",
        text: "In 1992, while participating in a humanitarian aid convoy in Iraqi Kurdistan, a bomb exploded near her motorcade. Rather than deterring her, this assassination attempt only strengthened her resolve, and she continued to fearlessly defend the rights of the Kurdish people.",
      },
      quote: "Defending human rights knows no national borders.",
      quoteAuthor: "Danielle Mitterrand",
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
