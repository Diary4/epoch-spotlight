import { AlertCircle, ScrollText, Tv, Users } from "lucide-react";
import RightsDetailPage, {
  type RightsDetailContent,
} from "./RightsDetailPage";

const content: Record<"en" | "ku" | "ar", RightsDetailContent> = {
  en: {
    back: "Back",
    pageTitle: "Media & Coexistence",
    pageSubtitle: "Telling every community's story.",
    cards: [
      {
        id: "legal",
        eyebrow: "Legal Protection",
        title: "Speech That Protects",
        body:
          "Law No. 5 of 2015 prohibits any media call to hatred, violence, or marginalization. All communities have the right to media and broadcasting in their own languages.",
        icon: ScrollText,
        accent: "#52235f",
      },
      {
        id: "programs",
        eyebrow: "Dedicated Programs",
        title: "Voices on Air",
        body:
          "Jihani Adam — Rudaw (100 episodes). Be Kurdi — Kurdistan 24 (254 episodes). Ezidikhan (129 episodes). Lavzh — Waar TV (288 episodes). Suraya (20 episodes).",
        icon: Tv,
        accent: "#7a4a12",
      },
      {
        id: "coverage",
        eyebrow: "Equal Coverage",
        title: "Shared Holidays on Screen",
        body:
          "Kurdish TV channels gave equal attention to Christian, Yazidi, and Islamic holidays and events. Rudaw began operations on a Wednesday — a sacred day for Yazidis.",
        icon: Users,
        accent: "#16466b",
      },
      {
        id: "challenges",
        eyebrow: "Challenges",
        title: "Work Still Ahead",
        body:
          "Lack of expertise, financial constraints, the spread of hate speech on social media, and the absence of a unified national strategy remain ongoing challenges for Kurdish media.",
        icon: AlertCircle,
        accent: "#6b1d1d",
      },
    ],
    tagline: "Every community deserves to see itself on screen.",
  },
  ku: {
    back: "گەڕانەوە",
    pageTitle: "میدیا و پێکەوەژیان",
    pageSubtitle: "گێڕانەوەی چیرۆکی هەر کۆمەڵگەیەک.",
    cards: [
      {
        id: "legal",
        eyebrow: "پاراستنی یاسایی",
        title: "وتنێک کە دەپارێزێت",
        body:
          "یاسای ژمارە ٥ ی ٢٠١٥ هەر بانگەشەیەکی میدیایی بۆ ڕق و توندوتیژی یان لاوازکردن قەدەغە دەکات. هەموو کۆمەڵگەکان مافی میدیا و بڵاوکردنەوەیان بە زمانی خۆیان هەیە.",
        icon: ScrollText,
        accent: "#52235f",
      },
      {
        id: "programs",
        eyebrow: "بەرنامە تایبەتەکان",
        title: "دەنگەکان لە ئاسماندا",
        body:
          "جیهانی ئادەم — ڕووداو (١٠٠ ئەڵقە). بە کوردی — کوردستان ٢٤ (٢٥٤ ئەڵقە). ئێزدیخان (١٢٩ ئەڵقە). لاڤژ — وەار تیڤی (٢٨٨ ئەڵقە). سورایا (٢٠ ئەڵقە).",
        icon: Tv,
        accent: "#7a4a12",
      },
      {
        id: "coverage",
        eyebrow: "پۆشانی یەکسان",
        title: "پشووە هاوبەشەکان لەسەر ئاسمان",
        body:
          "کەناڵە تیڤییە کوردییەکان گرنگییەکی یەکسانیان دایە پشوو و بۆنەکانی مەسیحی، ئێزدی و ئیسلامی. ڕووداو لە چوارشەممەیەکدا دەستی بە کارکرد — ڕۆژێکی پیرۆز بۆ ئێزدییەکان.",
        icon: Users,
        accent: "#16466b",
      },
      {
        id: "challenges",
        eyebrow: "ڕووبەڕووبوونەوەکان",
        title: "کاری ماوە",
        body:
          "نەبوونی شارەزایی، گرفتە داراییەکان، بڵاوبوونەوەی وتاری ڕق لە تۆڕە کۆمەڵایەتییەکاندا و نەبوونی ستراتیژێکی نیشتمانی یەکگرتوو، ڕووبەڕووبوونەوەی بەردەوامی میدیای کوردین.",
        icon: AlertCircle,
        accent: "#6b1d1d",
      },
    ],
    tagline: "هەر کۆمەڵگەیەک شایەنی ئەوەیە خۆی لەسەر ئاسماندا ببینێ.",
  },
  ar: {
    back: "العودة",
    pageTitle: "الإعلام والتعايش",
    pageSubtitle: "دور المؤسسات والإعلام في تعزيز ثقافة التسامح",
    cards: [
      {
        id: "legal",
        eyebrow: "تشجيع بث ثقافة التعايش",
        title: "تشجيع بث ثقافة التعايش",
        body:
          "تحث حكومة إقليم كوردستان، من خلال وزارة الثقافة ودائرة الإعلام والمعلومات، وسائل الإعلام باستمرار على إنتاج وبث برامج ومحتوى يهدف إلى تعزيز روح الأخوة والتسامح والقبول المتبادل بين جميع الأديان والقوميات..",
        icon: ScrollText,
        accent: "#52235f",
      },
      {
        id: "programs",
        eyebrow: "الحق في البث باللغات الأم",
        title: "الحق في البث باللغات الأم",
        body:
          "بموجب قانون اللغات الرسمية (القانون رقم 6 لسنة 2014)، هيأت الحكومة البيئة الكاملة للمكونات التركمانية والسريانية والأرمنية لامتلاك القنوات التلفزيونية والإذاعات والمؤسسات الصحفية المستقلة الخاصة بها، وإيصال رسائلها بلغاتها الأم.",
        icon: Tv,
        accent: "#7a4a12",
      },
      {
        id: "coverage",
        eyebrow: "حظر خطاب الكراهية",
        title: "حظر خطاب الكراهية",
        body:
          "وفقاً للتعليمات الرسمية للعمل الإعلامي وقانون حماية حقوق المكونات (القانون رقم 5 لسنة 2015)، يُحظر أي خطاب أو برنامج يحرض على التطرف، أو الإساءة للمقدسات الدينية، أو نشر الكراهية، وتُلزم وسائل الإعلام بحماية الكرامة الإنسانية.",
        icon: Users,
        accent: "#16466b",
      },
      {
        id: "challenges",
        eyebrow: "التغطية المتساوية للأعياد والمناسبات",
        title: "التغطية المتساوية للأعياد والمناسبات",
        body:
          "بناءً على توصيات الجهات الحكومية المختصة، تولي وسائل الإعلام أهمية خاصة ومتساوية للتغطية المباشرة لأعياد ومناسبات المسلمين، والمسيحيين، والإيزيديين، والكاكائيين، والتركمان، كواجب وطني لإبراز لوحة التنوع الجميلة والفريدة في كوردستان.",
        icon: AlertCircle,
        accent: "#6b1d1d",
      },
    ],
    tagline: "الإعلام في كوردستان جسرٌ لتقارب المكونات وصوتٌ لحماية الوحدة الوطنية.",
  },
};

export default function RightsMedia(
  props: Omit<React.ComponentProps<typeof RightsDetailPage>, "content">,
) {
  return <RightsDetailPage {...props} content={content} />;
}
