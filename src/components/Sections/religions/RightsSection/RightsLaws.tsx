import { BookOpen, HeartHandshake, Languages, Scale } from "lucide-react";
import RightsDetailPage, {
  type RightsDetailContent,
} from "./RightsDetailPage";
import lawsHero from "@/assets/images/Religion new photos/Rights and Recognition/Laws and Protection (Main card).jpg";

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
        title: "Directorate of Coexistence",
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
    pageTitle: "یاساکان و پاراستن",
    pageSubtitle: "ماف، کەرامەت و پێکەوەژیان",
    cards: [
      {
        id: "constitution",
        eyebrow: "ڕەشنووسی دەستوور",
        title: "ڕەشنووسی دەستوور",
        body:
          "ماددەی ٥ دەڵێت گەلی کوردستان لە کورد، تورکمان، عەرەب، کلدان، سریان، ئاشووری و ئەرمەن پێکدێت. ماددەی ١٦ ئازادی باوەڕ دەستەبەر دەکات.",
        icon: BookOpen,
        accent: "#52235f",
      },
      {
        id: "no-discrimination",
        eyebrow: "نەبوونی جیاکاری",
        title: "نەبوونی جیاکاری",
        body:
          "ماددەی ٢٠ جەخت لە یەکسانی بەردەم یاسا دەکاتەوە بەبێ گوێدانە ڕەگەز، ڕەنگ، نەتەوە یان ئایین.",
        icon: Scale,
        accent: "#7a4a12",
      },
      {
        id: "languages",
        eyebrow: "زمانە پارێزراوەکان",
        title: "زمانە پارێزراوەکان",
        body:
          "یاسای زمانە فەرمییەکان، ژمارە ٦ی ساڵی ٢٠١٤: زمانەکانی تورکمانی، سریانی و ئەرمەنی لە ناوچەکانی خۆیاندا لە پاڵ زمانی کوردیدا زمانى فەرمین. هەروەها هەر پێکهاتەیەک مافی ئەوەی هەیە بە زمانی دایکی خۆی ڕاگەیاندنی هەبێت.",
        icon: Languages,
        accent: "#16466b",
      },
      {
        id: "directorate",
        eyebrow: "بەڕێوەبەرایەتی پێکەوەژیان",
        title: "بەڕێوەبەرایەتی پێکەوەژیان",
        body:
          "لە ٢٠١٧ لە وەزارەتی ئەوقاف بۆ قووڵکردنەوەی پەیوەندی نێوان پێکهاتەکان دامەزرا.",
        icon: HeartHandshake,
        accent: "#244b1f",
      },
    ],
    tagline: "پاراستن هێز بە پێکەوەژیان دەبەخشێت.",
  },
  ar: {
    back: "العودة",
    pageTitle: "القوانين والحماية",
    pageSubtitle: "الحقوق والكرامة والتعايش",
    cards: [
      {
        id: "constitution",
        eyebrow: "مسودة الدستور",
        title: "مسودة الدستور",
        body:
          "المادة 5: يتكون شعب كوردستان من الكورد والتركمان والعرب والكلدان والسريان والآشوريين والأرمن. المادة 16: الدين ليس إلزامياً. وحرية المعتقد مكفولة للجميع.",
        icon: BookOpen,
        accent: "#52235f",
      },
      {
        id: "no-discrimination",
        eyebrow: "لا تمييز",
        title: "لا تمييز",
        body:
          "المادة 20: المساواة أمام القانون. لا تمييز على أساس الأصل أو اللون أو القومية أو اللغة أو الدين أو المعتقد. والمخالفون يُعاقَبون وفق القوانين النافذة.",
        icon: Scale,
        accent: "#7a4a12",
      },
      {
        id: "languages",
        eyebrow: "اللغات محمية",
        title: "اللغات محمية",
        body:
          "قانون اللغات الرسمية رقم 6 لسنة 2014. التركمانية والسريانية والأرمنية لغات رسمية في مناطقها إلى جانب الكوردية. ولكل مجتمع الحق في إعلام بلغته.",
        icon: Languages,
        accent: "#16466b",
      },
      {
        id: "directorate",
        eyebrow: "مديرية التعايش",
        title: "مديرية التعايش",
        body:
          "أُسست عام 2017 في وزارة الأوقاف والشؤون الدينية لتعميق العلاقات بين جميع المجموعات الدينية والقومية في إقليم كوردستان.",
        icon: HeartHandshake,
        accent: "#244b1f",
      },
    ],
    tagline: "الحماية تمنح التعايش قوته.",
  },
};

export default function RightsLaws(
  props: Omit<React.ComponentProps<typeof RightsDetailPage>, "content" | "heroImage">,
) {
  return <RightsDetailPage {...props} content={content} heroImage={lawsHero} />;
}
