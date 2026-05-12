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
    pageSubtitle: "رواية قصة كل مجتمع.",
    cards: [
      {
        id: "legal",
        eyebrow: "حماية قانونية",
        title: "خطاب يحمي",
        body:
          "يحظر قانون رقم ٥ لعام ٢٠١٥ أي دعوة إعلامية للكراهية أو العنف أو التهميش. ولكل المجتمعات الحق في الإعلام والبث بلغاتها الخاصة.",
        icon: ScrollText,
        accent: "#52235f",
      },
      {
        id: "programs",
        eyebrow: "برامج مخصصة",
        title: "أصوات على الهواء",
        body:
          "جيهاني آدم — رووداو (١٠٠ حلقة). به كوردي — كوردستان ٢٤ (٢٥٤ حلقة). إيزيديخان (١٢٩ حلقة). لاڤج — وار تي في (٢٨٨ حلقة). سورايا (٢٠ حلقة).",
        icon: Tv,
        accent: "#7a4a12",
      },
      {
        id: "coverage",
        eyebrow: "تغطية متكافئة",
        title: "أعياد مشتركة على الشاشة",
        body:
          "أولت القنوات الكوردية اهتماماً متساوياً للأعياد والمناسبات المسيحية والإيزيدية والإسلامية. وبدأت رووداو عملها يوم أربعاء — وهو يوم مقدس عند الإيزيديين.",
        icon: Users,
        accent: "#16466b",
      },
      {
        id: "challenges",
        eyebrow: "التحديات",
        title: "عمل لم يكتمل",
        body:
          "نقص الخبرة، والقيود المالية، وانتشار خطاب الكراهية على وسائل التواصل، وغياب استراتيجية وطنية موحّدة، تحديات مستمرة أمام الإعلام الكوردي.",
        icon: AlertCircle,
        accent: "#6b1d1d",
      },
    ],
    tagline: "كل مجتمع يستحق أن يرى نفسه على الشاشة.",
  },
};

export default function RightsMedia(
  props: Omit<React.ComponentProps<typeof RightsDetailPage>, "content">,
) {
  return <RightsDetailPage {...props} content={content} />;
}
