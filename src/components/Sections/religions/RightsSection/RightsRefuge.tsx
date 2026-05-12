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
    pageTitle: "کوردستان — ماڵێکی سەلامەت",
    pageSubtitle: "سەلامەتی، شکۆ و شوێنێک بۆ سەرکەوتن.",
    cards: [
      {
        id: "safety",
        eyebrow: "سەلامەتی",
        title: "پەناگایەکی گرنگ",
        body:
          "هەرێمی کوردستان بوو بە پەناگایەکی گرنگ بۆ کۆمەڵگە برینداربووەکان لە سەردەمی هەستان و دەسەڵاتی دڕندانەی داعش، پاراستنی پێشکەش کرد و شوێنێکی سەلامەت بۆ پەرستنی ئاینەکانیان.",
        icon: ShieldCheck,
        accent: "#52235f",
      },
      {
        id: "freedom",
        eyebrow: "ئازادی",
        title: "ڕووناکییەک بۆ چەوسێنراوەکان",
        body:
          "ئاینە کەمینەکان نەک تەنها بە ئازادی لە کوردستان پەرستن دەکەن — هەرێم بووە بە ڕووناکییەک بۆ ئەوانەی لە چەوسانەوە لە عێراق و ناوچەی فراوانتر هەڵدێن.",
        icon: Sparkles,
        accent: "#7a4a12",
      },
      {
        id: "communities",
        eyebrow: "کۆمەڵگەکان",
        title: "بڕیاری مانەوە",
        body:
          "مەسیحی، ئێزدی و کاکەییەکان کە پەنایان بۆ کوردستان هێنا، بڕیاریان داوە بمێننەوە، چونکە بەهای پابەندبوونی هەرێم بە پێکەوەژیان و ڕێز هەڵدەسەنگێنن.",
        icon: Heart,
        accent: "#16466b",
      },
      {
        id: "hope",
        eyebrow: "هیوا",
        title: "گەڕانەوەی پاتریارک",
        body:
          "پاتریارکی کلێسای ڕۆژهەڵاتی ئاشووری ساڵی ٢٠١٥ دوای ٨٣ ساڵ دوور بوون، کورسییەکەی گەڕاندەوە بۆ هەولێر و ڕایگەیاند: «گەڕانەوەمان بۆ هەولێر بەڵگەی بوونی بەردەوامی ئێمەیە.»",
        icon: Church,
        accent: "#244b1f",
      },
    ],
    tagline: "ماڵێکی سەلامەت لە کاتە سەختەکاندا.",
  },
  ar: {
    back: "العودة",
    pageTitle: "كوردستان — وطن آمن",
    pageSubtitle: "أمان، كرامة، ومكان للانتماء.",
    cards: [
      {
        id: "safety",
        eyebrow: "الأمان",
        title: "ملاذ حاسم",
        body:
          "أصبح إقليم كوردستان ملاذاً حاسماً للمجتمعات المستضعفة خلال صعود داعش وحكمه الوحشي، موفراً الحماية ومساحة آمنة لممارسة الإيمان.",
        icon: ShieldCheck,
        accent: "#52235f",
      },
      {
        id: "freedom",
        eyebrow: "الحرية",
        title: "منارة للمضطهدين",
        body:
          "لا تمارس الأقليات الدينية عبادتها بحرية في كوردستان فحسب — بل أصبح الإقليم منارة لمن يفرّون من الاضطهاد في عموم العراق والمنطقة.",
        icon: Sparkles,
        accent: "#7a4a12",
      },
      {
        id: "communities",
        eyebrow: "المجتمعات",
        title: "اختاروا البقاء",
        body:
          "المسيحيون والإيزيديون والكاكائيون الذين لجأوا إلى كوردستان اختاروا البقاء تقديراً لالتزام الإقليم بالتعايش والمعاملة باحترام.",
        icon: Heart,
        accent: "#16466b",
      },
      {
        id: "hope",
        eyebrow: "الأمل",
        title: "عودة بطريرك",
        body:
          "أعاد بطريرك كنيسة المشرق الآشورية كرسيه إلى أربيل عام ٢٠١٥ بعد ٨٣ عاماً من المنفى، قائلاً: «عودتنا إلى أربيل تعني وجودنا الراسخ.»",
        icon: Church,
        accent: "#244b1f",
      },
    ],
    tagline: "وطن آمن في أوقات صعبة.",
  },
};

export default function RightsRefuge(
  props: Omit<React.ComponentProps<typeof RightsDetailPage>, "content">,
) {
  return <RightsDetailPage {...props} content={content} />;
}
