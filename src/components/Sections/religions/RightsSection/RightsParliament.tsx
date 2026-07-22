import { Calendar, FileText, ScrollText, Vote } from "lucide-react";
import RightsDetailPage, {
  type RightsDetailContent,
} from "./RightsDetailPage";
import parliamentHero from "@/assets/images/religions/rights/images.jpeg";

const content: Record<"en" | "ku" | "ar", RightsDetailContent> = {
  en: {
    back: "Back",
    pageTitle: "Voices in Parliament",
    pageSubtitle: "Every community has a seat at the table.",
    cards: [
      {
        id: "seats",
        eyebrow: "11 Reserved Seats",
        title: "Representation Guaranteed",
        body:
          "In 2005 the Kurdistan Parliament increased minority seats from 5 to 11: 5 for Chaldo-Assyrians, 5 for Turkmen, and 1 for Armenians — a guarantee written into law.",
        icon: Vote,
        accent: "#52235f",
      },
      {
        id: "law-5-2015",
        eyebrow: "Law No. 5 of 2015",
        title: "Rights Across All Communities",
        body:
          "Voted unanimously by the Kurdistan Parliament. Guarantees the political, religious, cultural, and linguistic rights of Turkmen, Chaldeans, Syriacs, Armenians, Christians, Yazidis, Mandaeans, Kakais, and Zoroastrians.",
        icon: ScrollText,
        accent: "#7a4a12",
      },
      {
        id: "holidays",
        eyebrow: "Official Holidays",
        title: "Recognized in the Calendar",
        body:
          "Decision No. 47 of 1992 established holidays for Christians and Assyrians. Resolution No. 6 of 2010 established Yazidi holidays. All communities are recognized in the official calendar.",
        icon: Calendar,
        accent: "#16466b",
      },
      {
        id: "genocide-day",
        eyebrow: "Yazidi Genocide Day",
        title: "August 3 — A Day of Recognition",
        body:
          "Decision No. 11 of 2019 officially declared August 3 as Yazidi Genocide Day — recognizing the crimes of ISIS as genocide, crimes against humanity, and war crimes.",
        icon: FileText,
        accent: "#6b1d1d",
      },
    ],
    tagline: "Representation is not a privilege. It is a right.",
  },
  ku: {
    back: "گەڕانەوە",
    pageTitle: "دەنگەکان لە پەرلەمان",
    pageSubtitle: "هەر کۆمەڵگەیەک کورسییەکی هەیە.",
    cards: [
      {
        id: "seats",
        eyebrow: "١١ کورسی پاراست",
        title: "نوێنەرایەتی دڵنیاکراو",
        body:
          "ساڵی ٢٠٠٥ پەرلەمانی کوردستان کورسی کەمینەکانی لە ٥ بۆ ١١ زیاد کرد: ٥ بۆ کلدوئاشوور، ٥ بۆ تورکمان، ١ بۆ ئەرمەن — دڵنیاییەکی نووسراو لە یاسادا.",
        icon: Vote,
        accent: "#52235f",
      },
      {
        id: "law-5-2015",
        eyebrow: "یاسای ژمارە ٥ ی ٢٠١٥",
        title: "ماف بۆ هەموو کۆمەڵگەکان",
        body:
          "بە یەکدەنگی لە پەرلەمانی کوردستان دەنگی پێدرا. مافی سیاسی، ئاینی، کلتووری و زمانیی تورکمان، کلدان، سریان، ئەرمەن، مەسیحی، ئێزدی، مەندایی، کاکەیی و زەردەشتی دەپارێزێت.",
        icon: ScrollText,
        accent: "#7a4a12",
      },
      {
        id: "holidays",
        eyebrow: "پشووە فەرمییەکان",
        title: "ناسراو لە ڕۆژژمێردا",
        body:
          "بڕیاری ژمارە ٤٧ ی ١٩٩٢ پشووی فەرمی بۆ مەسیحی و ئاشووریەکان دامەزراند. بڕیاری ژمارە ٦ ی ٢٠١٠ پشووی فەرمی ئێزدی دامەزراند. هەموو کۆمەڵگەکان لە ڕۆژژمێری فەرمیدا ناسراون.",
        icon: Calendar,
        accent: "#16466b",
      },
      {
        id: "genocide-day",
        eyebrow: "ڕۆژی کۆمەڵکوژی ئێزدی",
        title: "٣ی ئاب — ڕۆژی ناسینەوە",
        body:
          "بڕیاری ژمارە ١١ ی ٢٠١٩ بە فەرمی ٣ی ئاب وەک ڕۆژی کۆمەڵکوژی ئێزدی ڕاگەیاند — تاوانەکانی داعش وەک کۆمەڵکوژی، تاوانی دژی مرۆڤایەتی و تاوانی جەنگ ناسینەوە.",
        icon: FileText,
        accent: "#6b1d1d",
      },
    ],
    tagline: "نوێنەرایەتی پێگە نییە. مافە.",
  },
  ar: {
    back: "العودة",
    pageTitle: "أصوات في البرلمان",
    pageSubtitle: "لكل مجتمع مقعد على الطاولة",
    cards: [
      {
        id: "seats",
        eyebrow: "11 مقعداً مخصصاً",
        title: "11 مقعداً مخصصاً",
        body:
          "رُفع عدد المقاعد المخصصة للأقليات في برلمان كوردستان من 5 إلى 11 عام 2005: 5 للكلدو آشوريين، و5 للتركمان، و1 للأرمن. ضمان مكفول بالقانون.",
        icon: Vote,
        accent: "#52235f",
      },
      {
        id: "law-5-2015",
        eyebrow: "القانون رقم 5 لسنة 2015",
        title: "القانون رقم 5 لسنة 2015",
        body:
          "صوّت عليه برلمان كوردستان بالإجماع. يكفل الحقوق السياسية والدينية والثقافية واللغوية للتركمان والكلدان والسريان والأرمن والمسيحيين والإيزيديين والمندائيين والكاكائيين والزرادشتيين.",
        icon: ScrollText,
        accent: "#7a4a12",
      },
      {
        id: "holidays",
        eyebrow: "الأعياد الرسمية",
        title: "الأعياد الرسمية",
        body:
          "أرسى القرار رقم 47 لسنة 1992 عطلاً رسمية للمسيحيين والآشوريين. وأقر قرار عام 2010 عطلاً رسمية للإيزيديين. جميع المجتمعات معترف بها في التقويم الرسمي.",
        icon: Calendar,
        accent: "#16466b",
      },
      {
        id: "genocide-day",
        eyebrow: "يوم الإبادة الجماعية الإيزيدية",
        title: "يوم الإبادة الجماعية الإيزيدية",
        body:
          "أعلن القرار رقم 11 لسنة 2019 الثالث من أغسطس يوماً رسمياً للإبادة الجماعية الإيزيدية — معترفاً بجرائم داعش بوصفها إبادةً جماعيةً وجرائم ضد الإنسانية وجرائم حرب.",
        icon: FileText,
        accent: "#6b1d1d",
      },
    ],
    tagline: "التمثيل ليس امتيازاً. بل هو حق",
  },
};

export default function RightsParliament(
  props: Omit<React.ComponentProps<typeof RightsDetailPage>, "content" | "heroImage">,
) {
  return <RightsDetailPage {...props} content={content} heroImage={parliamentHero} />;
}
