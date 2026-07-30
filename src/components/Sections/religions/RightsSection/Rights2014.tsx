import { AlertTriangle, DoorOpen, Shield, Users } from "lucide-react";
import RightsDetailPage, {
  type RightsDetailContent,
} from "./RightsDetailPage";
import hawlerCastleHero from "@/assets/images/religions/rights/Hawler_Castle.webp";

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
    pageTitle: "٢٠١٤ — کوردستان دەرگاکانی واڵا کرد",
    pageSubtitle: "کاتێک جیهان سەیری دەکرد، کوردستان هەنگاوی نا",
    cards: [
      {
        id: "isis",
        eyebrow: "جینۆساید",
        title: "جینۆساید",
        body:
          "داعش تاوانی دژ بە ئێزیدییەکان لە شنگال ئەنجام دا. هەرێم بووە پەناگەی سەرەکییان.",
        icon: AlertTriangle,
        accent: "#6b1d1d",
      },
      {
        id: "minorities",
        eyebrow: "بەئامانجگرتنی کەمینەکان",
        title: "بەئامانجگرتنی کەمینەکان",
        body:
          "مەسیحی و تورکمان و ئەوانی تر ناچار بوون هەڵبێن، هەرێم تەنها شوێنی ئارام بوو بۆیان.",
        icon: Users,
        accent: "#7a4a12",
      },
      {
        id: "peshmerga",
        eyebrow: "پێشمەرگە",
        title: "پێشمەرگە",
        body:
          "ڕۆڵی سەرەکی هەبوو لە ڕاگرتنی داعش و پاراستنی پێکهاتەکان و ڕزگارکردنی ناوچەکانی وەک شنگال و کەرکوک.",
        icon: Shield,
        accent: "#244b1f",
      },
      {
        id: "region",
        eyebrow: "هەرێمێک کە گەلەکەی پاراست",
        title: "هەرێمێک کە گەلەکەی پاراست",
        body:
          "هەرێم میوانداری ئاوارەکانی کرد. پاتریارکی کەنیسەی ئاشووری سوپاسی هەرێمی کرد بۆ میوانداریکردنی زیاتر لە ملیۆنێک و نیو ئاوارە.",
        icon: DoorOpen,
        accent: "#52235f",
      },
    ],
    tagline: "هەرێم دەرگاکانی دانەخست، بەڵکو بە تەواوی واڵای کرد.",
  },
  ar: {
    back: "العودة",
    pageTitle: "2014 — كوردستان فتحت أبوابها",
    pageSubtitle: "حين راقب العالم، تصرفت كوردستان",
    cards: [
      {
        id: "isis",
        eyebrow: "الإبادة الجماعية",
        title: "الإبادة الجماعية",
        body:
          "ارتكب داعش إبادةً جماعيةً بحق الإيزيديين في شنگال — إعداماتٌ جماعية وتهجير قسري واسترقاق. وأعلن برلمان كوردستان الثالث من أغسطس يوماً رسمياً للإبادة الجماعية الإيزيدية.",
        icon: AlertTriangle,
        accent: "#6b1d1d",
      },
      {
        id: "minorities",
        eyebrow: "استهداف جميع الأقليات",
        title: "استهداف جميع الأقليات",
        body:
          "اضطر المسيحيون والتركمان وغيرهم إلى الفرار. فكان الإقليم ملاذهم الآمن حين لم يجدوا سواه.",
        icon: Users,
        accent: "#7a4a12",
      },
      {
        id: "peshmerga",
        eyebrow: "البيشمركة",
        title: "البيشمركة",
        body:
          "أدّت دوراً محورياً في وقف تقدم داعش وحماية المجتمعات الأقلوية وتحرير المناطق الرئيسية كشنگال وكركوك بالتنسيق مع قوات التحالف الدولي.",
        icon: Shield,
        accent: "#244b1f",
      },
      {
        id: "region",
        eyebrow: "إقليم حمى شعبه",
        title: "إقليم حمى شعبه",
        body:
          "استضاف الإقليم المشرّدين وأطعمهم وحماهم. وأعرب بطريرك كنيسة المشرق الآشورية عن امتنانه لحكومة الإقليم على استضافة أكثر من مليون ونصف مليون لاجئ.",
        icon: DoorOpen,
        accent: "#52235f",
      },
    ],
    tagline: "لم يُغلق الإقليم أبوابه. بل فتحها على مصراعيها.",
  },
};

export default function Rights2014(
  props: Omit<React.ComponentProps<typeof RightsDetailPage>, "content" | "heroImage">,
) {
  return <RightsDetailPage {...props} content={content} heroImage={hawlerCastleHero} />;
}
