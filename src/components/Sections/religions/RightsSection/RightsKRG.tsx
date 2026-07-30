import {
  BookOpen,
  Building2,
  GraduationCap,
  Landmark,
  Palette,
} from "lucide-react";
import RightsDetailPage, {
  type RightsDetailContent,
} from "./RightsDetailPage";
import krgCabinetHero from "@/assets/images/religions/rights/krg_cabinet.webp";

const content: Record<"en" | "ku" | "ar", RightsDetailContent> = {
  en: {
    back: "Back",
    pageTitle: "The Kurdistan Regional Government",
    pageSubtitle: "A government for all its peoples.",
    cards: [
      {
        id: "established-1992",
        eyebrow: "Established 1992",
        title: "First Democratic Election",
        body:
          "Following democratic elections on May 19, 1992 — the first in the region's history. Parliament was established with reserved minority seats from the very beginning.",
        icon: Landmark,
        accent: "#52235f",
      },
      {
        id: "ministry",
        eyebrow: "Ministry of Religious Affairs",
        title: "Renamed to Serve All",
        body:
          "Renamed in 2007 from “Islamic Affairs” to “Religious Affairs” — reflecting that it serves all faiths. Includes General Directorates for Christian and Yazidi Affairs.",
        icon: Building2,
        accent: "#7a4a12",
      },
      {
        id: "education",
        eyebrow: "Education in All Languages",
        title: "Schools in Mother Tongues",
        body:
          "Schools operate in Turkmen, Syriac, and Armenian. General Directorates for Syriac and Turkmen Education were established by law.",
        icon: GraduationCap,
        accent: "#16466b",
      },
      {
        id: "culture",
        eyebrow: "Culture for All",
        title: "Heritage Preserved",
        body:
          "The Ministry of Culture established General Directorates for Turkmen and Syriac Culture and Arts to preserve and develop minority heritage.",
        icon: Palette,
        accent: "#244b1f",
      },
    ],
    tagline: "A government that protects all its people.",
  },
  ku: {
    back: "گەڕانەوە",
    pageTitle: "حکومەتی هەرێمی کوردستان",
    pageSubtitle: "حکومەتێک بۆ هەموو هاووڵاتیان",
    cards: [
      {
        id: "established-1992",
        eyebrow: "دامەزراندنی ١٩٩٢",
        title: "دامەزراندنی ١٩٩٢",
        body:
          "دوای هەڵبژاردنێکی دیموکراسیی. لە یەکەم ساتەوە کورسی بۆ کەمینەکان تەرخانکرا.",
        icon: Landmark,
        accent: "#52235f",
      },
      {
        id: "ministry",
        eyebrow: "وەزارەتی کاروباری ئایینی",
        title: "وەزارەتی کاروباری ئایینی",
        body:
          "لە ٢٠٠٧ ناوی لە \"ئەوقاف و کاروباری ئیسلامی\" گۆڕدرا بۆ \"ئەوقاف و کاروباری ئایینی\" بۆ ئەوەی گوزارشت لە هەمووان بکات.",
        icon: Building2,
        accent: "#7a4a12",
      },
      {
        id: "education",
        eyebrow: "خوێندن بە هەموو زمانەکان",
        title: "خوێندن بە هەموو زمانەکان",
        body:
          "قوتابخانە بە زمانەکانی تورکمانی، سریانی و ئەرمەنی هەن. بەڕێوەبەرایەتی گشتی خوێندنی سریانی و تورکمانی دامەزراون.",
        icon: GraduationCap,
        accent: "#16466b",
      },
      {
        id: "culture",
        eyebrow: "کلتوور بۆ هەمووان",
        title: "کلتوور بۆ هەمووان",
        body:
          "بەڕێوەبەرایەتی تایبەت بۆ کلتووری تورکمانی و سریانی هەن بۆ پاراستنی میراتیان.",
        icon: Palette,
        accent: "#244b1f",
      },
    ],
    tagline: "حکومەتێک کە هەموو ڕۆڵەکانی دەپارێزێت.",
  },
  ar: {
    back: "العودة",
    pageTitle: "حكومة إقليم كوردستان",
    pageSubtitle: "حكومة لجميع أبنائها",
    cards: [
      {
        id: "established-1992",
        eyebrow: "التأسيس 1992",
        title: "التأسيس 1992",
        body:
          "أُسست في أعقاب الانتخابات الديمقراطية في 19 مايو 1992 — أولى الانتخابات الديمقراطية في تاريخ المنطقة. وخُصصت للأقليات مقاعد في البرلمان منذ اللحظة الأولى.",
        icon: Landmark,
        accent: "#52235f",
      },
      {
        id: "ministry",
        eyebrow: "وزارة الشؤون الدينية",
        title: "وزارة الشؤون الدينية",
        body:
          "أُعيدت تسميتها عام 2007 من \"الأوقاف والشؤون الإسلامية\" إلى \"الأوقاف والشؤون الدينية\" لتعكس خدمتها لجميع الأديان. وتضم مديريات للشؤون المسيحية والإيزيدية.",
        icon: Building2,
        accent: "#7a4a12",
      },
      {
        id: "education",
        eyebrow: "التعليم بجميع اللغات",
        title: "التعليم بجميع اللغات",
        body:
          "مدارس تعمل بالتركمانية والسريانية والأرمنية. أُسست المديرية العامة للتربية السريانية والمديرية العامة للتربية التركمانية بموجب القانون.",
        icon: GraduationCap,
        accent: "#16466b",
      },
      {
        id: "culture",
        eyebrow: "الثقافة للجميع",
        title: "الثقافة للجميع",
        body:
          "أسست وزارة الثقافة المديرية العامة للثقافة والفنون التركمانية والمديرية العامة للثقافة والفنون السريانية للحفاظ على تراث الأقليات وتنميته.",
        icon: Palette,
        accent: "#244b1f",
      },
    ],
    tagline: "حكومة تحمي جميع أبنائها.",
  },
};

export default function RightsKRG(
  props: Omit<React.ComponentProps<typeof RightsDetailPage>, "content" | "heroImage">,
) {
  return <RightsDetailPage {...props} content={content} heroImage={krgCabinetHero} />;
}
