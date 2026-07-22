import { Church, Heart, ShieldCheck, Sparkles } from "lucide-react";
import RightsDetailPage, {
  type RightsDetailContent,
} from "./RightsDetailPage";

const content: Record<"en" | "ku" | "ar", RightsDetailContent> = {
  en: {
    back: "Back",
    pageTitle: "Kurdistan — A Safe Home",
    pageSubtitle: "Safety, dignity, and a place to belong.",
    cards: [
      {
        id: "safety",
        eyebrow: "Safety",
        title: "A Critical Refuge",
        body:
          "The Kurdistan Region became a critical refuge for vulnerable communities during the rise and brutal rule of ISIS, offering protection and a secure space to practice their faith.",
        icon: ShieldCheck,
        accent: "#52235f",
      },
      {
        id: "freedom",
        eyebrow: "Freedom",
        title: "A Beacon for the Persecuted",
        body:
          "Religious minorities not only worship freely in Kurdistan — the region has become a beacon for those fleeing persecution across Iraq and the wider region.",
        icon: Sparkles,
        accent: "#7a4a12",
      },
      {
        id: "communities",
        eyebrow: "Communities",
        title: "Choosing to Remain",
        body:
          "Christians, Yazidis, and Kakais who sought refuge in Kurdistan have chosen to remain, appreciating the region's commitment to coexistence and respectful treatment.",
        icon: Heart,
        accent: "#16466b",
      },
      {
        id: "hope",
        eyebrow: "Hope",
        title: "A Patriarch Returns",
        body:
          "The Patriarch of the Assyrian Church of the East returned his seat to Erbil in 2015 after 83 years of exile, declaring: “Our return to Erbil signifies our enduring presence.”",
        icon: Church,
        accent: "#244b1f",
      },
    ],
    tagline: "A safe home in difficult times.",
  },
  ku: {
    back: "گەڕانەوە",
    pageTitle: "کوردستان — ماڵێکی ئارام",
    pageSubtitle: "ئارامی، کەرامەت و شوێنێک بۆ بوون",
    cards: [
      {
        id: "safety",
        eyebrow: "ئارامی",
        title: "ئارامی",
        body:
          "هەرێم بووە پەناگەیەکی گرنگ بۆ پێکهاتەکان لە کاتی سەرهەڵدانی داعش، ژینگەیەکی ئارامی بۆ دابین کردن تاوەکو بتوانن بە ئازادی ڕێوڕەسمە ئایینییەکانیان ئەنجام بدەن.",
        icon: ShieldCheck,
        accent: "#52235f",
      },
      {
        id: "freedom",
        eyebrow: "ئازادی",
        title: "ئازادی",
        body:
          "ئازادی ئاینی لە کوردستان تەنیا مافێکی کەمینەکان نییە؛، بەڵکو هەرێم بووەتە چرایەک بۆ ئەوانەی لە شوێنەکانی تری عێراق و ناوچەکە لە ستەم ڕادەکەن.",
        icon: Sparkles,
        accent: "#7a4a12",
      },
      {
        id: "communities",
        eyebrow: "کۆمەڵگەکان",
        title: "کۆمەڵگەکان",
        body:
          "زۆرێک لە مەسیحی و ئێزیدی و کاکەییەکان کوردستانیان بۆ مانەوە هەڵبژارد بەهۆی مامەڵەی باشی هەرێم.",
        icon: Heart,
        accent: "#16466b",
      },
      {
        id: "hope",
        eyebrow: "هیوا",
        title: "هیوا",
        body:
          "گەڕانەوەی کورسی پاتریارکی بۆ هەولێر لە ٢٠١٥ نیشانەی مانەوەی هەمیشەیی و متمانەیە بەم خاکە.",
        icon: Church,
        accent: "#244b1f",
      },
    ],
    tagline: "ماڵێکی ئارام لە کاتە سەختەکاندا.",
  },
  ar: {
    back: "العودة",
    pageTitle: "كوردستان — بيت آمن",
    pageSubtitle: "الأمان والكرامة ومكان للانتماء",
    cards: [
      {
        id: "safety",
        eyebrow: "الأمان",
        title: "الأمان",
        body:
          "أصبح الإقليم ملاذاً حيوياً للمجتمعات المستضعفة إبان صعود داعش وحكمه الوحشي، مُتيحاً لها الحماية والفضاء الآمن لممارسة شعائرها الدينية.",
        icon: ShieldCheck,
        accent: "#52235f",
      },
      {
        id: "freedom",
        eyebrow: "الحرية",
        title: "الحرية",
        body:
          "لا تقتصر حرية العبادة على الأقليات في كوردستان — بل غدا الإقليم منارةً لمن يفرون من الاضطهاد في سائر أنحاء العراق والمنطقة.",
        icon: Sparkles,
        accent: "#7a4a12",
      },
      {
        id: "communities",
        eyebrow: "المجتمعات",
        title: "المجتمعات",
        body:
          "اختار المسيحيون والإيزيديون والكاكائيون وغيرهم ممن لجأوا إلى كوردستان البقاءَ فيها، تقديراً منهم لالتزام الإقليم بالتعايش وحسن المعاملة.",
        icon: Heart,
        accent: "#16466b",
      },
      {
        id: "hope",
        eyebrow: "الأمل",
        title: "الأمل",
        body:
          "أعاد بطريرك كنيسة المشرق الآشورية كرسيه إلى أربيل عام 2015 بعد 83 عاماً من المنفى، معلناً: \"عودتنا إلى أربيل تُعبّر عن بقائنا الدائم.\"",
        icon: Church,
        accent: "#244b1f",
      },
    ],
    tagline: "بيت آمن في الأوقات العصيبة.",
  },
};

export default function RightsRefuge(
  props: Omit<React.ComponentProps<typeof RightsDetailPage>, "content">,
) {
  return <RightsDetailPage {...props} content={content} />;
}
