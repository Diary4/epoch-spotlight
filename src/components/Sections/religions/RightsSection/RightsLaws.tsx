import { BookOpen, HeartHandshake, Languages, Scale } from "lucide-react";
import RightsDetailPage, {
  type RightsDetailContent,
} from "./RightsDetailPage";

const content: Record<"en" | "ku" | "ar", RightsDetailContent> = {
  en: {
    back: "Back",
    pageTitle: "Laws & Protection",
    pageSubtitle: "Rights, dignity, and coexistence.",
    cards: [
      {
        id: "constitution",
        eyebrow: "Draft Constitution",
        title: "Belonging & Belief",
        body:
          "Article 5: The people of Kurdistan include Kurds, Turkmen, Arabs, Chaldeans, Syriacs, Assyrians, and Armenians. Article 16: Religion is not compulsory — freedom of belief is guaranteed for all.",
        icon: BookOpen,
        accent: "#52235f",
      },
      {
        id: "no-discrimination",
        eyebrow: "No Discrimination",
        title: "Equality Before the Law",
        body:
          "Article 20: Equality before the law. No discrimination based on origin, color, ethnicity, language, religion, or belief. Violators are punished under applicable laws.",
        icon: Scale,
        accent: "#7a4a12",
      },
      {
        id: "languages",
        eyebrow: "Languages Protected",
        title: "Official Languages Law No. 6 of 2014",
        body:
          "Turkmen, Syriac, and Armenian are official languages in their areas alongside Kurdish. All communities have the right to media in their own language.",
        icon: Languages,
        accent: "#16466b",
      },
      {
        id: "directorate",
        eyebrow: "Directorate of Coexistence",
        title: "Established 2017",
        body:
          "Established by the Ministry of Endowments and Religious Affairs to deepen relationships among all religious and ethnic groups in the Kurdistan Region.",
        icon: HeartHandshake,
        accent: "#244b1f",
      },
    ],
    tagline: "Protection gives coexistence strength.",
  },
  ku: {
    back: "گەڕانەوە",
    pageTitle: "یاسا و پاراستن",
    pageSubtitle: "ماف، شکۆ و پێکەوەژیان.",
    cards: [
      {
        id: "constitution",
        eyebrow: "پڕۆژەی دەستوور",
        title: "سەربەخۆیی و باوەڕ",
        body:
          "ماددەی ٥: گەلی کوردستان لە کورد، تورکمان، عەرەب، کلدان، سریان، ئاشوور و ئەرمەن پێکدێت. ماددەی ١٦: ئاین زۆرەملێ نییە — ئازادی باوەڕ بۆ هەمووان دڵنیاکراوە.",
        icon: BookOpen,
        accent: "#52235f",
      },
      {
        id: "no-discrimination",
        eyebrow: "بێ جیاوازی",
        title: "یەکسانی لەبەردەم یاسا",
        body:
          "ماددەی ٢٠: یەکسانی لەبەردەم یاسا. هیچ جیاوازییەک لەسەر ڕەسەن، ڕەنگ، نەژاد، زمان، ئاین یان باوەڕ نییە. سەرپێچیکاران بەپێی یاسا سزا دەدرێن.",
        icon: Scale,
        accent: "#7a4a12",
      },
      {
        id: "languages",
        eyebrow: "زمانەکان پارێزراون",
        title: "یاسای زمانە فەرمییەکان ژمارە ٦ ی ٢٠١٤",
        body:
          "تورکمانی، سریانی و ئەرمەنی لە ناوچەکانیاندا زمانی فەرمین لەگەڵ کوردیدا. هەموو کۆمەڵگەکان مافی میدیایان بە زمانی خۆیان هەیە.",
        icon: Languages,
        accent: "#16466b",
      },
      {
        id: "directorate",
        eyebrow: "بەڕێوەبەرایەتی پێکەوەژیان",
        title: "دامەزرا ٢٠١٧",
        body:
          "لەلایەن وەزارەتی ئەوقاف و کاروباری ئاینییەوە دامەزرا بۆ قووڵکردنەوەی پەیوەندی نێوان هەموو گرووپە ئاینی و نەتەوەییەکانی هەرێمی کوردستان.",
        icon: HeartHandshake,
        accent: "#244b1f",
      },
    ],
    tagline: "پاراستن هێز بە پێکەوەژیان دەبەخشێت.",
  },
  ar: {
    back: "العودة",
    pageTitle: "القوانين والحماية",
    pageSubtitle: "حقوق، كرامة، وتعايش.",
    cards: [
      {
        id: "constitution",
        eyebrow: "مسودة الدستور",
        title: "الانتماء والمعتقد",
        body:
          "المادة ٥: يتألف شعب كوردستان من الكورد والتركمان والعرب والكلدان والسريان والآشوريين والأرمن. المادة ١٦: الدين ليس إجبارياً — حرية المعتقد مكفولة للجميع.",
        icon: BookOpen,
        accent: "#52235f",
      },
      {
        id: "no-discrimination",
        eyebrow: "لا تمييز",
        title: "المساواة أمام القانون",
        body:
          "المادة ٢٠: المساواة أمام القانون. لا تمييز على أساس الأصل أو اللون أو العرق أو اللغة أو الدين أو المعتقد. ويُعاقب المخالفون وفق القوانين النافذة.",
        icon: Scale,
        accent: "#7a4a12",
      },
      {
        id: "languages",
        eyebrow: "اللغات محمية",
        title: "قانون اللغات الرسمية رقم ٦ لعام ٢٠١٤",
        body:
          "التركمانية والسريانية والأرمنية لغات رسمية في مناطقها إلى جانب الكوردية. ولكل المجتمعات الحق في الإعلام بلغتها الخاصة.",
        icon: Languages,
        accent: "#16466b",
      },
      {
        id: "directorate",
        eyebrow: "مديرية التعايش",
        title: "أُسست عام ٢٠١٧",
        body:
          "أسستها وزارة الأوقاف والشؤون الدينية لتعميق العلاقات بين كل المجموعات الدينية والعرقية في إقليم كوردستان.",
        icon: HeartHandshake,
        accent: "#244b1f",
      },
    ],
    tagline: "الحماية تمنح التعايش قوته.",
  },
};

export default function RightsLaws(
  props: Omit<React.ComponentProps<typeof RightsDetailPage>, "content">,
) {
  return <RightsDetailPage {...props} content={content} />;
}
