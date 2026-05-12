import { AlertTriangle, DoorOpen, Shield, Users } from "lucide-react";
import RightsDetailPage, {
  type RightsDetailContent,
} from "./RightsDetailPage";

const content: Record<"en" | "ku" | "ar", RightsDetailContent> = {
  en: {
    back: "Back",
    pageTitle: "2014 — Kurdistan Opened Its Doors",
    pageSubtitle: "When the world watched, Kurdistan acted.",
    cards: [
      {
        id: "isis",
        eyebrow: "ISIS Genocide",
        title: "Sinjar, August 2014",
        body:
          "ISIS committed genocide against Yazidis in Sinjar — mass executions, forced displacement, and enslavement. August 3 was officially recognized as Yazidi Genocide Day by the Kurdistan Parliament.",
        icon: AlertTriangle,
        accent: "#6b1d1d",
      },
      {
        id: "minorities",
        eyebrow: "All Minorities Targeted",
        title: "A Refuge for the Displaced",
        body:
          "Christians, Turkmen, and others were forced to flee. The Kurdistan Region became their refuge and safe haven when nowhere else was safe.",
        icon: Users,
        accent: "#7a4a12",
      },
      {
        id: "peshmerga",
        eyebrow: "Peshmerga",
        title: "Defenders of Communities",
        body:
          "Played a vital role in halting ISIS, protecting minority communities, and liberating key areas including Sinjar and Kirkuk in cooperation with international coalition forces.",
        icon: Shield,
        accent: "#244b1f",
      },
      {
        id: "region",
        eyebrow: "A Region That Protected",
        title: "1.5 Million Sheltered",
        body:
          "The KRG housed, fed, and protected displaced communities. The Patriarch of the Assyrian Church expressed gratitude to the KRG for hosting over one and a half million refugees.",
        icon: DoorOpen,
        accent: "#52235f",
      },
    ],
    tagline: "The Kurdistan Region did not close its doors. It opened them wider.",
  },
  ku: {
    back: "گەڕانەوە",
    pageTitle: "٢٠١٤ — کوردستان دەرگاکانی کردەوە",
    pageSubtitle: "کاتێک جیهان سەیری دەکرد، کوردستان کاری کرد.",
    cards: [
      {
        id: "isis",
        eyebrow: "کۆمەڵکوژی داعش",
        title: "شنگاڵ، ئابی ٢٠١٤",
        body:
          "داعش کۆمەڵکوژی لە دژی ئێزدییەکان لە شنگاڵ ئەنجامدا — کوشتنی بەکۆمەڵ، ڕاپێچکردنی بەزۆر و کۆیلایەتی. ٣ی ئاب لەلایەن پەرلەمانی کوردستانەوە بە فەرمی وەک ڕۆژی کۆمەڵکوژی ئێزدی ناسرایەوە.",
        icon: AlertTriangle,
        accent: "#6b1d1d",
      },
      {
        id: "minorities",
        eyebrow: "هەموو کەمینەکان ئامانج بوون",
        title: "پەناگا بۆ ئاوارەکان",
        body:
          "مەسیحیەکان، تورکمان و کۆمەڵگەکانی تر ناچار بوون هەڵبێن. هەرێمی کوردستان بوو بە پەناگاو شوێنی سەلامەتیان کاتێک هیچ شوێنێکی تر سەلامەت نەبوو.",
        icon: Users,
        accent: "#7a4a12",
      },
      {
        id: "peshmerga",
        eyebrow: "پێشمەرگە",
        title: "پارێزەرانی کۆمەڵگەکان",
        body:
          "ڕۆڵێکی گرنگیان گێڕا لە ڕاگرتنی داعش، پاراستنی کۆمەڵگە کەمینەکان و ڕزگارکردنی ناوچە گرنگەکان لەوانە شنگاڵ و کەرکوک بە هاوکاری هێزەکانی هاوپەیمانی نێودەوڵەتی.",
        icon: Shield,
        accent: "#244b1f",
      },
      {
        id: "region",
        eyebrow: "هەرێمێک پارێزی",
        title: "١.٥ ملیۆن کەس پەنایان دا",
        body:
          "حکومەتی هەرێم کۆمەڵگە ئاوارەکانی نیشتەجێ کرد، خۆراکی پێدان و پاراستی. پاتریارکی کلێسای ئاشووری سوپاسی حکومەتی هەرێمی دەربڕی بۆ پێشوازیکردنی زیاتر لە یەک ملیۆن و نیو ئاوارە.",
        icon: DoorOpen,
        accent: "#52235f",
      },
    ],
    tagline: "هەرێمی کوردستان دەرگاکانی دانەخست. زیاتر کردینیەوە.",
  },
  ar: {
    back: "العودة",
    pageTitle: "٢٠١٤ — كوردستان فتحت أبوابها",
    pageSubtitle: "حين كان العالم يراقب، تحرّكت كوردستان.",
    cards: [
      {
        id: "isis",
        eyebrow: "إبادة داعش",
        title: "سنجار، آب ٢٠١٤",
        body:
          "ارتكب داعش الإبادة بحق الإيزيديين في سنجار — إعدامات جماعية وتهجير قسري واسترقاق. واعترف برلمان كوردستان رسمياً بـ ٣ آب يوماً للإبادة الإيزيدية.",
        icon: AlertTriangle,
        accent: "#6b1d1d",
      },
      {
        id: "minorities",
        eyebrow: "كل الأقليات مستهدفة",
        title: "ملاذ للنازحين",
        body:
          "اضطر المسيحيون والتركمان وغيرهم للنزوح. وأصبح إقليم كوردستان ملاذهم الآمن حين لم يعد أي مكان آخر آمناً.",
        icon: Users,
        accent: "#7a4a12",
      },
      {
        id: "peshmerga",
        eyebrow: "البيشمركة",
        title: "حماة المجتمعات",
        body:
          "أدّت دوراً حيوياً في وقف داعش وحماية مجتمعات الأقليات وتحرير مناطق رئيسية كسنجار وكركوك بالتعاون مع قوات التحالف الدولي.",
        icon: Shield,
        accent: "#244b1f",
      },
      {
        id: "region",
        eyebrow: "إقليم احتضن",
        title: "١٫٥ مليون لجأوا إليه",
        body:
          "آوت حكومة الإقليم النازحين وأطعمتهم وحمتهم. وأعرب بطريرك كنيسة المشرق الآشورية عن امتنانه للحكومة لاستضافتها أكثر من مليون ونصف لاجئ.",
        icon: DoorOpen,
        accent: "#52235f",
      },
    ],
    tagline: "لم تُغلق كوردستان أبوابها — بل فتحتها أوسع.",
  },
};

export default function Rights2014(
  props: Omit<React.ComponentProps<typeof RightsDetailPage>, "content">,
) {
  return <RightsDetailPage {...props} content={content} />;
}
