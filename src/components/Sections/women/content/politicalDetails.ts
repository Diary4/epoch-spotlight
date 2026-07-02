import { arPoliticalDetails } from "@/components/Sections/women/content/arWomenContentData";
import { kuPoliticalDetails } from "@/components/Sections/women/content/kuWomenContentData";

export const politicalDetailsByLang = {
  en: {
    "mayan-khatun": {
      nameLine1: "Mayan",
      nameLine2: "Khatun",
      role: "First Lady of the Republic · The Great Yazidi Princess · Leader of the Yazidi Community",
      metaLine: "1874 – 1957 | Shekhan, Nineveh, Kurdistan Region of Iraq",
      intro:
        "Mayan Khatun was the influential supreme leader and princess of the Yazidi community, navigating her people through a highly turbulent era in history. As a member of the noble house of Yazidi Mirs, she became the de facto ruler following her husband's death and headed the Yazidi Supreme Spiritual Council for decades. Renowned for her exceptional diplomatic acumen, she expertly mediated inter-tribal disputes and fought fiercely to protect the Yazidi faith and community during the complex political shifts of early 20th-century Mesopotamia.",
      portraitAlt: "Mayan Khatun",
      listIcon: "crown" as const,
      greatestAchievement: {
        title: "Greatest Achievement",
        text: "She was the first woman in modern Yazidi history to lead the community's Supreme Spiritual Council for over four decades. Her greatest achievement was maintaining the cultural and religious integrity of the Yazidis during the transition from the Ottoman Empire to the modern state of Iraq.",
      },
      whySheMatters: {
        title: "Why She Still Matters",
        text: "Mayan Khatun remains an unparalleled figure of female authority in Yazidi history. She proved that even in the most insular and traditional environments, a woman could rise to become the absolute protector and voice of her people.",
      },
      cards: [
        {
          icon: "♜",
          title: "Timeline Position",
          text: "1874 until 1957",
        },
        {
          icon: "⛩",
          title: "Map Location",
          text: "Shekhan district, Nineveh Governorate",
        },
      ],
      didYouKnow: {
        title: "Did You Know?",
        text: "Mayan Khatun exercised authority that went beyond the spiritual; she held the final say in matters of community law and tribal governance, often issuing decrees that were respected across the entire Yazidi diaspora.",
      },
      quote:
        "A leader is not defined by their title, but by their ability to keep their people united in the face of the storm.",
      quoteAuthor: "Attributed to Mayan Khatun",
    },
    "maryam-khan": {
      nameLine1: "Maryam",
      nameLine2: "Khan",
      role: "The Voice of Kurdistan · Pioneer of Kurdish Radio Singing",
      metaLine: "1904 – 1949 | Botan, Northern Kurdistan",
      intro:
        "She was a revolutionary Kurdish artist whose life was shaped by early 20th-century forced migrations. Despite enduring severe personal hardships, including the loss of her child and constant displacement, she refused to be silenced. Transforming her suffering into art, she became the first Kurdish woman to professionally record her voice in Baghdad. Her legacy endures as a powerful symbol of Kurdish cultural survival and artistic resilience.",
      portraitAlt: "Maryam Khan",
      listIcon: "flower" as const,
      greatestAchievement: {
        title: "Greatest Achievement",
        text: 'Between 1937 and 1945, she recorded over 31 songs in Baghdad, and over her lifetime, she recorded over 200 traditional Kurdish songs with major international companies like "His Master\'s Voice".',
      },
      whySheMatters: {
        title: "Why She Still Matters",
        text: "She proved that Kurdish cultural identity could persist even in the face of political oppression and displacement. Her transition from the rural village life of Botan to the professional recording studios of Baghdad paved the way for generations of Kurdish female artists who followed in her footsteps.",
      },
      cards: [
        {
          icon: "♜",
          title: "Timeline Position",
          text: "1904 until 1949",
        },
        {
          icon: "⛩",
          title: "Map Location",
          text: "Botan, Northern Kurdistan",
        },
      ],
      didYouKnow: {
        title: "Did You Know?",
        text: "During her time in Zakho, Maryam Khan faced such severe poverty that she was forced to work as a servant, yet she maintained her dignity and musical identity.",
      },
      quote:
        "When I sing, I do not just sing for myself, I sing for every Kurdish mother who has faced the hardships of displacement and loss.",
      quoteAuthor: "Attributed to Maryam Khan",
    },
  },
  ku: kuPoliticalDetails,
  ar: arPoliticalDetails,
};
