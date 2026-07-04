import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { discoverDisplayFont, discoverRtlScript } from "@/components/Sections/discoverLanguage";
import {
  detailBackButtonClassName,
  detailBackButtonSideClassName,
  detailBackIconClassName,
  detailBackIconSize,
} from "@/constants/backNavigation";
import mainPrimeMinisterImage from "@/assets/images/PrimeMinistir/p-2.webp";
import primeMinisterImage from "@/assets/images/PrimeMinistir/2019.webp";
import visionImage from "@/assets/images/PrimeMinistir/WhatsApp Image 2026-06-30 at 20.16.30 (1).webp";
import formationImage from "@/assets/images/PrimeMinistir/formation.webp";
import youthImage from "@/assets/images/PrimeMinistir/youth.webp";
import educationImage from "@/assets/images/PrimeMinistir/education.webp";
import securityImage from "@/assets/images/PrimeMinistir/security.webp";
import isisImage from "@/assets/images/PrimeMinistir/isis.webp";
import serviceImage from "@/assets/images/PrimeMinistir/service.webp";
import economicImage from "@/assets/images/PrimeMinistir/economic.webp";
import myAccountImage from "@/assets/images/PrimeMinistir/myaccount.webp";
import runakiImage from "@/assets/images/PrimeMinistir/runaki.webp";
import infrastructureImage from "@/assets/images/PrimeMinistir/infrastructure.webp";
import digitalImage from "@/assets/images/PrimeMinistir/digital.webp";
import agreementImage from "@/assets/images/PrimeMinistir/agreement.webp";
import jobImage from "@/assets/images/PrimeMinistir/job.webp";

type TimelineDetail =
  | string
  | {
      title: string;
      text: string;
    };

type TimelineEntry = {
  id: string;
  era: string;
  title: string;
  description: string;
  image: string;
  details: TimelineDetail[];
};

type PrimeMinisterTimelineProps = {
  lang?: "ku" | "en" | "ar";
  onBack?: () => void;
};

const biographyImages = {
  "origins-formation": formationImage,
  "youth-resistance": youthImage,
  "education-borders": educationImage,
  "security-state-building": securityImage,
  "isis-war": isisImage,
  "service-beyond-government": serviceImage,
  "prime-minister-cabinet": primeMinisterImage,
  vision: visionImage,
} as const;

type BiographyId = keyof Omit<typeof biographyImages, "vision">;

const biographyOrder: BiographyId[] = [
  "origins-formation",
  "youth-resistance",
  "education-borders",
  "security-state-building",
  "isis-war",
  "service-beyond-government",
  "prime-minister-cabinet",
];

const biographyCatalog: Record<
  BiographyId,
  Record<"en" | "ku" | "ar", { era: string; title: string; description: string; details: string[] }>
> = {
  "origins-formation": {
    en: {
      era: "1969",
      title: "Origins & Formation",
      description:
        "Born in 1969, Masrour Barzani grew up during a defining period in Kurdish history. His early years were shaped by displacement, resistance, education, and the responsibility of serving a nation in struggle.",
      details: [
        "Born on 2 March 1969",
        "Raised within the Barzani family's historic national legacy",
        "Completed high school in Iran",
        "Continued higher education in the United States",
      ],
    },
    ku: {
      era: "١٩٦٩",
      title: "ڕەگ و پێکهاتە",
      description:
        "مەسرور بارزانی لە ١٩٦٩دا لە دایکبوو و لە ماوەیەکی دیاریکەر لە مێژووی کوردیدا گەورە بوو. ساڵانی سەرەتاییی ژیانی بە دابڕان، بەرخودان، پەروەردە، و بەرپرسیارێتی خزمەتکردنی نەتەوەیەک لە ناکۆکیدا شێوە پێدرا.",
      details: [
        "لە ٢ی ئازاری ١٩٦٩دا لە دایکبوو",
        "لە میراتی نەتەوەیی مێژوویی خێزانی بارزانیدا گەورە بوو",
        "قوتابخانەی ناوەندی لە ئێران تەواو کرد",
        "پەروەردەی باڵا لە ویلایەتە یەکگرتووەکانی ئەمریکا بەردەوام بوو",
      ],
    },
    ar: {
      era: "1969",
      title: "الأصول والنشأة",
      description:
        "وُلد مسرور بارزاني عام 1969 ونشأ في فترة محورية من تاريخ كردستان. شكلت سنواته الأولى النزوح والمقاومة والتعليم ومسؤولية خدمة أمة في صراع.",
      details: [
        "وُلد في 2 آذار 1969",
        "نشأ ضمن الإرث الوطني التاريخي لعائلة بارزاني",
        "أنهى المرحلة الثانوية في إيران",
        "واصل التعليم العالي في الولايات المتحدة",
      ],
    },
  },
  "youth-resistance": {
    en: {
      era: "1985",
      title: "From Youth to Resistance",
      description:
        "In 1985, at the age of sixteen, Masrour Barzani joined the Kurdistan Peshmerga. His early service placed him directly within the Kurdish struggle during some of its most difficult chapters.",
      details: [
        "Joined the Peshmerga in 1985",
        "Participated in the Battle of Khwakurk in 1988",
        "Took part in the 1991 Kurdish uprising",
        "Documented key moments of struggle through his camera",
      ],
    },
    ku: {
      era: "١٩٨٥",
      title: "لە گەنجییەوە بۆ بەرخودان",
      description:
        "لە ١٩٨٥دا، لە تەمەنی شانزە ساڵیدا، مەسرور بارزانی بەشداری پێشمەرگەی کوردستان بوو. خزمەتکردنی سەرەتاییی ئەو ڕاستەوخۆ لە ناو بەرخودانی کوردیدا بوو لە کاتی هەندێک لە قورسترین بەشەکانی.",
      details: [
        "لە ١٩٨٥دا بەشداری پێشمەرگە بوو",
        "بەشداری لە شەڕی خەوەکورک لە ١٩٨٨دا کرد",
        "بەشداری لە سەرهەڵدانی کوردستانی ١٩٩١دا کرد",
        "ساتە گرنگەکانی بەرخودان بە کامێراکەی تۆمار کرد",
      ],
    },
    ar: {
      era: "1985",
      title: "من الشباب إلى المقاومة",
      description:
        "في عام 1985، وفي سن السادسة عشرة، انضم مسرور بارزاني إلى پێشمەرگە كردستان. وضعته خدمته المبكرة مباشرة في صلب النضال الكردي خلال بعض أصعب فصوله.",
      details: [
        "انضم إلى پێشمەرگە عام 1985",
        "شارك في معركة خاوەكورك عام 1988",
        "شارك في انتفاضة كردستان 1991",
        "وثّق لحظات النضال الرئيسية عبر كاميرته",
      ],
    },
  },
  "education-borders": {
    en: {
      era: "1993",
      title: "Education Beyond Borders",
      description:
        "After years shaped by conflict, Masrour Barzani pursued higher education abroad, strengthening his understanding of international relations, peace, and conflict resolution.",
      details: [
        "Moved to the United States in 1993",
        "Earned a bachelor's degree in 1997",
        "Studied peace and conflict resolution",
        "Speaks Kurdish, Persian, English, and Arabic",
      ],
    },
    ku: {
      era: "١٩٩٣",
      title: "پەروەردە لە دەرەوەی سنوورەکان",
      description:
        "دوای ساڵانێک کە لە ناکۆکیدا شێوە پێدرا، مەسرور بارزانی پەروەردەی باڵا لە دەرەوە بەدواداچوو، تێگەیشتنی لە پەیوەندییە نێودەوڵەتییەکان، ئاشتی، و چارەسەرکردنی ناکۆکی بەهێزتر کرد.",
      details: [
        "لە ١٩٩٣دا گواسترایەوە بۆ ویلایەتە یەکگرتووەکانی ئەمریکا",
        "لە ١٩٩٧دا بڕوانامەی بەکالۆریۆسی بەدەست هێنا",
        "خوێندنی ئاشتی و چارەسەرکردنی ناکۆکی",
        "زمانی کوردی، فارسی، ئینگلیزی، و عەرەبی دەزانێت",
      ],
    },
    ar: {
      era: "1993",
      title: "التعليم عبر الحدود",
      description:
        "بعد سنوات شكلها الصراع، واصل مسرور بارزاني التعليم العالي في الخارج، وتعزيز فهمه للعلاقات الدولية والسلام وحل النزاعات.",
      details: [
        "انتقل إلى الولايات المتحدة عام 1993",
        "حصل على درجة البكالوريوس عام 1997",
        "درس السلام وحل النزاعات",
        "يتحدث الكردية والفارسية والإنجليزية والعربية",
      ],
    },
  },
  "security-state-building": {
    en: {
      era: "1998",
      title: "Security & State-Building",
      description:
        "After returning to Kurdistan in 1998, Masrour Barzani took on senior responsibilities in political and security institutions, later becoming Chancellor of the Kurdistan Region Security Council.",
      details: [
        "Returned to Kurdistan in 1998",
        "Headed the Kurdistan Region Security Agency in 2004",
        "Appointed KRSC Chancellor in 2012",
        "Contributed to security coordination and institutional development",
      ],
    },
    ku: {
      era: "١٩٩٨",
      title: "ئاسایش و دامەزراندنی دەوڵەت",
      description:
        "دوای گەڕانەوەی بۆ کوردستان لە ١٩٩٨دا، مەسرور بارزانی بەرپرسیارێتییە باڵاکانی لە دامەزراوە سیاسی و ئاسایشییەکان وەرگرت، دواتر بوو بە کانسێری ئەنجومەنی ئاسایشی هەرێمی کوردستان.",
      details: [
        "لە ١٩٩٨دا گەڕایەوە بۆ کوردستان",
        "لە ٢٠٠٤دا سەرۆکایەتی ئاژانسی ئاسایشی هەرێمی کوردستان کرد",
        "لە ٢٠١٢دا وەک کانسێری KRSC دامەزرا",
        "بەشداری لە هاوکاریی ئاسایش و پەرەپێدانی دامەزراوەیی کرد",
      ],
    },
    ar: {
      era: "1998",
      title: "الأمن وبناء الدولة",
      description:
        "بعد عودته إلى كردستان عام 1998، تولى مسرور بارزاني مسؤوليات عليا في المؤسسات السياسية والأمنية، ثم أصبح مستشار مجلس أمن إقليم كردستان.",
      details: [
        "عاد إلى كردستان عام 1998",
        "ترأس وكالة أمن إقليم كردستان عام 2004",
        "عُيّن مستشار KRSC عام 2012",
        "ساهم في تنسيق الأمن والتطوير المؤسسي",
      ],
    },
  },
  "isis-war": {
    en: {
      era: "2014",
      title: "The ISIS War",
      description:
        "During the ISIS attacks after 2014, Masrour Barzani played a major security role through the Kurdistan Region Security Council, coordinating with coalition forces and supporting field operations.",
      details: [
        "Helped form a joint operations room with the coalition",
        "Supported airstrike coordination and field operations",
        "Participated in operations against ISIS",
        "Took part in the liberation process of Shingal / Sinjar",
      ],
    },
    ku: {
      era: "٢٠١٤",
      title: "جەنگی داعش",
      description:
        "لە کاتی هێرشەکانی داعش دوای ٢٠١٤دا، مەسرور بارزانی ڕۆڵێکی گرنگی ئاسایشی لە ڕێگەی ئەنجومەنی ئاسایشی هەرێمی کوردستانەوە گرت، هاوکاری لەگەڵ هێزەکانی هاوپەیمان و پشتگیری لە کاروباری مەیدانی.",
      details: [
        "یارمەتی دروستکردنی ژووری کاروباری هاوبەش لەگەڵ هاوپەیمان",
        "پشتگیری لە هاوکاریی هێرشی ئاسمانی و کاروباری مەیدانی",
        "بەشداری لە کاروبارەکان دژی داعش",
        "بەشداری لە پرۆسەی ئازادکردنی شنگال / سنجار",
      ],
    },
    ar: {
      era: "2014",
      title: "حرب داعش",
      description:
        "خلال هجمات داعش بعد 2014، لعب مسرور بارزاني دورًا أمنيًا رئيسيًا عبر مجلس أمن إقليم كردستان، منسقًا مع قوات التحالف وداعمًا للعمليات الميدانية.",
      details: [
        "ساعد في تشكيل غرفة عمليات مشتركة مع التحالف",
        "دعم تنسيق الغارات الجوية والعمليات الميدانية",
        "شارك في العمليات ضد داعش",
        "شارك في عملية تحرير شنكال / سنجار",
      ],
    },
  },
  "service-beyond-government": {
    en: {
      era: "2005",
      title: "Service Beyond Government",
      description:
        "Masrour Barzani's public work also extended into humanitarian and academic fields, including the establishment of the Barzani Charity Foundation and support for higher education in Kurdistan.",
      details: [
        "Founded Barzani Charity Foundation in 2005",
        "Supported refugees, displaced people, and vulnerable families",
        "Helped establish Kurdish academic initiatives abroad",
        "Laid the foundation stone of the American University in Duhok in 2013",
      ],
    },
    ku: {
      era: "٢٠٠٥",
      title: "خزمەت لە دەرەوەی حکومەت",
      description:
        "کاری گشتیی مەسرور بارزانی هەروەها بۆ بواری مرۆیی و ئەکادیمی درێژ بوو، لەوانە دامەزراندنی دامەزراوەی خێرخوازی بارزانی و پشتگیری لە پەروەردەی باڵا لە کوردستان.",
      details: [
        "لە ٢٠٠٥دا دامەزراوەی خێرخوازی بارزانی دامەزراند",
        "پشتگیری لە پەنابەران، جێگیربوونەوەکان، و خێزانە لاوازەکان",
        "یارمەتی دامەزراندنی دەستپێشخەرییە ئەکادیمییە کوردییەکان لە دەرەوە",
        "لە ٢٠١٣دا بنیادنانی زانکۆی ئەمریکی لە دهۆک",
      ],
    },
    ar: {
      era: "2005",
      title: "خدمة خارج نطاق الحكومة",
      description:
        "امتد عمل مسرور بارزاني العام أيضًا إلى المجالات الإنسانية والأكاديمية، بما في ذلك تأسيس مؤسسة بارزاني الخيرية ودعم التعليم العالي في كردستان.",
      details: [
        "أسس مؤسسة بارزاني الخيرية عام 2005",
        "دعم اللاجئين والنازحين والعائلات الضعيفة",
        "ساعد في إنشاء مبادرات أكاديمية كردية في الخارج",
        "وضع حجر الأساس للجامعة الأمريكية في دهوك عام 2013",
      ],
    },
  },
  "prime-minister-cabinet": {
    en: {
      era: "2019",
      title: "Prime Minister — The Ninth Cabinet",
      description:
        "In 2019, Masrour Barzani became Prime Minister of the Kurdistan Region and was appointed to form the ninth cabinet of the Kurdistan Regional Government.",
      details: [
        "Nominated by KDP leadership in 2018",
        "Elected by Kurdistan Parliament in 2019",
        "Appointed to form the ninth cabinet",
      ],
    },
    ku: {
      era: "٢٠١٩",
      title: "سەرۆک وەزیران — کابینەی نۆیەم",
      description:
        "لە ٢٠١٩دا، مەسرور بارزانی بوو بە سەرۆک وەزیرانی هەرێمی کوردستان و دامەزرا بۆ پێکهێنانی کابینەی نۆیەمی حکومەتی هەرێمی کوردستان.",
      details: [
        "لە ٢٠١٨دا لەلایەن سەرکردایەتی KDPەوە پێشنیار کرا",
        "لە ٢٠١٩دا لەلایەن پەرلەمانی کوردستانەوە هەڵبژێردرا",
        "دامەزرا بۆ پێکهێنانی کابینەی نۆیەم",
      ],
    },
    ar: {
      era: "2019",
      title: "رئيس الوزراء — الحكومة التاسعة",
      description:
        "في عام 2019، أصبح مسرور بارزاني رئيسًا لوزراء إقليم كردستان وعُيّن لتشكيل الحكومة التاسعة للحكومة الإقليمية لكردستان.",
      details: [
        "رُشّح من قيادة KDP عام 2018",
        "انتُخب من قبل برلمان كردستان عام 2019",
        "عُيّن لتشكيل الحكومة التاسعة",
      ],
    },
  },
};

const achievementImages = {
  "economic-reform": economicImage,
  "my-account": myAccountImage,
  "runaki-program": runakiImage,
  "infrastructure-development": infrastructureImage,
  "digital-transformation": digitalImage,
  "investment-partnerships": agreementImage,
  "youth-empowerment": jobImage,
} as const;

type AchievementId = keyof typeof achievementImages;

const achievementCatalog: Record<
  AchievementId,
  Record<"en" | "ku" | "ar", { title: string; text: string }>
> = {
  "economic-reform": {
    en: {
      title: "Economic Reform",
      text: "Diversified the economy and reduced dependence on oil revenues.",
    },
    ku: {
      title: "چاکسازیی ئابووری",
      text: "هەمەجۆرکردنی ئابووری و کەمکردنەوەی پشتبەستن بە داهاتی نەوت.",
    },
    ar: {
      title: "الإصلاح الاقتصادي",
      text: "تنويع الاقتصاد وتقليل الاعتماد على عائدات النفط.",
    },
  },
  "my-account": {
    en: {
      title: "MyAccount",
      text: "Launched MyAccount to modernize public sector payroll and ensure financial inclusion.",
    },
    ku: {
      title: "هەژماری من",
      text: "دەستپێکردنی هەژماری من بۆ نوێکردنەوەی مووچەی کەرتی گشتی و دڵنیابوون لە گشتگیریی دارایی.",
    },
    ar: {
      title: "حسابي",
      text: "إطلاق حسابي لتحديث رواتب القطاع العام وضمان الشمول المالي.",
    },
  },
  "runaki-program": {
    en: {
      title: "Runaki Program",
      text: "Expanded electricity production and improved the reliability of energy across the region.",
    },
    ku: {
      title: "پڕۆژەی ڕووناکی",
      text: "فراوانکردنی بەرهەمهێنانی کارەبا و باشترکردنی جێگیریی وزە لە سەرانسەری هەرێمدا.",
    },
    ar: {
      title: "برنامج ڕووناکی",
      text: "توسيع إنتاج الكهرباء وتحسين موثوقية الطاقة في جميع أنحاء الإقليم.",
    },
  },
  "infrastructure-development": {
    en: {
      title: "Infrastructure Development",
      text: "Invested in roads, bridges, airports, water projects, and urban development to connect communities.",
    },
    ku: {
      title: "پەرەپێدانی ژێرخان",
      text: "وەبەرهێنان لە ڕێگاوبان، پرد، فڕۆکەخانە، پڕۆژەی ئاو، و پەرەپێدانی شار.",
    },
    ar: {
      title: "تطوير البنية التحتية",
      text: "الاستثمار في الطرق والجسور والمطارات ومشاريع المياه والتنمية الحضرية.",
    },
  },
  "digital-transformation": {
    en: {
      title: "Digital Transformation",
      text: "Advanced digital services and e-government to make services faster, easier, and more transparent.",
    },
    ku: {
      title: "گۆڕینی دیجیتاڵ",
      text: "پێشخستنی خزمەتگوزارییە دیجیتاڵییەکان و حکومەتی ئەلیکترۆنی بۆ خزمەتگوزاری خێراتر و ئاسانتر.",
    },
    ar: {
      title: "التحول الرقمي",
      text: "تطوير الخدمات الرقمية والحكومة الإلكترونية لجعل الخدمات أسرع وأسهل وأكثر شفافية.",
    },
  },
  "investment-partnerships": {
    en: {
      title: "Investment & Partnerships",
      text: "Attracted international investment and strengthened partnerships to support sustainable growth.",
    },
    ku: {
      title: "وەبەرهێنان و هاوبەشی",
      text: "ڕاکێشانی وەبەرهێنانی نێودەوڵەتی و بەهێزکردنی هاوبەشی بۆ پشتگیری گەشەی بەردەوام.",
    },
    ar: {
      title: "الاستثمار والشراكات",
      text: "جذب الاستثمار الدولي وتعزيز الشراكات لدعم النمو المستدام.",
    },
  },
  "youth-empowerment": {
    en: {
      title: "Job Creation & Youth Empowerment",
      text: "Created more job opportunities and supported youth, entrepreneurship, and private sector development.",
    },
    ku: {
      title: "دروستکردنی کار و توانادارکردنی گەنجان",
      text: "دروستکردنی هەلی کاری زیاتر و پاڵپشتی گەنجان، کارسازی، و کەرتی تایبەت.",
    },
    ar: {
      title: "خلق فرص العمل وتمكين الشباب",
      text: "خلق المزيد من فرص العمل ودعم الشباب وريادة الأعمال والقطاع الخاص.",
    },
  },
};

const achievementOrder: AchievementId[] = [
  "economic-reform",
  "my-account",
  "runaki-program",
  "infrastructure-development",
  "digital-transformation",
  "investment-partnerships",
  "youth-empowerment",
];

const visionDetails: Record<"en" | "ku" | "ar", TimelineDetail[]> = {
  en: [
    {
      title: "A Strong & Diversified Economy",
      text: "Building sustainable growth and creating opportunities for every citizen.",
    },
    {
      title: "Reliable Energy & Infrastructure",
      text: "Securing clean energy and world-class infrastructure for a better life.",
    },
    {
      title: "Empowering People & Youth",
      text: "Investing in education, skills, and innovation to unlock the potential of our people.",
    },
    {
      title: "Good Governance & Partnerships",
      text: "Upholding transparency and building strong partnerships for peace and prosperity.",
    },
    {
      title: "Sustainable & Resilient Kurdistan",
      text: "Protecting our environment and building a safe, inclusive, and future-ready Kurdistan.",
    },
  ],
  ku: [
    {
      title: "ئابوورییەکی بەهێز و هەمەجۆر",
      text: "بونیادنانی گەشەی بەردەوام و دروستکردنی دەرفەت بۆ هەموو هاوڵاتی.",
    },
    {
      title: "وزە و ژێرخانی جێگیر",
      text: "دڵنیابوون لە وزەی پاک و ژێرخانی ئاستی جیهانی بۆ ژیانێکی باشتر.",
    },
    {
      title: "توانادارکردنی خەڵک و گەنجان",
      text: "وەبەرهێنان لە پەروەردە، لێهاتوویی، و داهێنان بۆ ئاشکراکردنی توانای خەڵکمان.",
    },
    {
      title: "حکومڕانی باش و هاوبەشی",
      text: "پاراستنی شەفافیەت و بونیادنانی هاوبەشی بەهێز بۆ ئاشتی و گەشە.",
    },
    {
      title: "کوردستانێکی بەردەوام و خۆڕاگر",
      text: "پاراستنی ژینگە و بونیادنانی کوردستانێکی سەلامەت، گشتگیر، و ئامادە بۆ داهاتوو.",
    },
  ],
  ar: [
    {
      title: "اقتصاد قوي ومتنوع",
      text: "بناء نمو مستدام وخلق فرص لكل مواطن.",
    },
    {
      title: "طاقة و بنية تحتية موثوقة",
      text: "تأمين طاقة نظيفة وبنية تحتية عالمية المستوى لحياة أفضل.",
    },
    {
      title: "تمكين الناس والشباب",
      text: "الاستثمار في التعليم والمهارات والابتكار لإطلاق إمكانات شعبنا.",
    },
    {
      title: "حوكمة رشيدة وشراكات",
      text: "التمسك بالشفافية وبناء شراكات قوية من أجل السلام والازدهار.",
    },
    {
      title: "كوردستان مستدامة ومرنة",
      text: "حماية بيئتنا وبناء كوردستان آمنة وشاملة وجاهزة للمستقبل.",
    },
  ],
};

function detailKey(detail: TimelineDetail): string {
  return typeof detail === "string" ? detail : detail.title;
}

function getAchievementEraLabel(lang: "ku" | "en" | "ar", index: number): string {
  if (lang === "ar") return `إنجاز ${index + 1}`;
  if (lang === "ku") return `دەستکەوت ${index + 1}`;
  return `Achievement ${index + 1}`;
}

function getAchievementEntries(lang: "ku" | "en" | "ar"): TimelineEntry[] {
  return achievementOrder.map((id, index) => {
    const content = achievementCatalog[id][lang];
    return {
      id,
      era: getAchievementEraLabel(lang, index),
      title: content.title,
      description: content.text,
      image: achievementImages[id],
      details: [],
    };
  });
}

function getBiographyEntries(lang: "ku" | "en" | "ar"): TimelineEntry[] {
  return biographyOrder.map((id) => {
    const content = biographyCatalog[id][lang];
    return {
      id,
      era: content.era,
      title: content.title,
      description: content.description,
      image: biographyImages[id],
      details: content.details,
    };
  });
}

function getVisionEntry(lang: "ku" | "en" | "ar"): TimelineEntry {
  const visionCopy = {
    en: {
      era: "The Future",
      title: "Vision for the Future",
      description: "A prosperous, stable, and future-ready Kurdistan that guarantees a high quality of life for all citizens.",
    },
    ku: {
      era: "داهاتوو",
      title: "ئامانجی داهاتوو",
      description: "کوردستانێکی گەشاوە، سەقامگیر، و ئامادە بۆ داهاتوو کە کوالیتیی ژیانێکی بەرز بۆ هەموو هاوڵاتییەکان دڵنیادەکاتەوە.",
    },
    ar: {
      era: "المستقبل",
      title: "الرؤية المستقبلية",
      description: "كوردستان مزدهرة ومستقرة وجاهزة للمستقبل تضمن جودة حياة عالية لجميع المواطنين.",
    },
  }[lang];

  return {
    id: "vision",
    era: visionCopy.era,
    title: visionCopy.title,
    description: visionCopy.description,
    image: biographyImages.vision,
    details: visionDetails[lang],
  };
}

function getTimeline(lang: "ku" | "en" | "ar"): TimelineEntry[] {
  return [...getBiographyEntries(lang), ...getAchievementEntries(lang), getVisionEntry(lang)];
}

export default function PrimeMinisterTimeline({ lang = "en", onBack }: PrimeMinisterTimelineProps) {
  const isRtl = discoverRtlScript(lang);
  const dir = lang === "en" ? "ltr" : "rtl";
  const displayFont = discoverDisplayFont(lang);
  const isAr = lang === "ar";
  const isKu = lang === "ku";

  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const timeline = getTimeline(lang);

  const headerLabel = isAr ? "المسيرة" : isKu ? "گەشتەکە" : "The Journey";
  const endLabel = isAr ? "تستمر المسيرة..." : isKu ? "گەشتەکە بەردەوامە..." : "The Journey Continues...";

  useEffect(() => {
    const t = window.setTimeout(() => setIsVisible(true), 60);
    return () => window.clearTimeout(t);
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;

    // At (or near) the bottom the probe point can't reach the last sections,
    // so force the final item active.
    if (container.scrollTop + container.clientHeight >= container.scrollHeight - 8) {
      setActiveSection(timeline.length - 1);
      return;
    }

    const scrollPosition = container.scrollTop + container.clientHeight / 3;
    let current = 0;
    sectionRefs.current.forEach((section, index) => {
      if (section && section.offsetTop <= scrollPosition) {
        current = index;
      }
    });
    setActiveSection(current);
  };

  const scrollToSection = (index: number) => {
    const container = scrollContainerRef.current;
    const section = sectionRefs.current[index];
    if (container && section) {
      container.scrollTo({ top: section.offsetTop - 24, behavior: "smooth" });
      setActiveSection(index);
    }
  };

  return (
    <main
      dir={isRtl ? "rtl" : "ltr"}
      className={`relative h-full min-h-0 w-full overflow-hidden bg-black ${isRtl ? "font-noto-naskh" : ""}`}
    >
      {/* Background — same portrait as Prime Minister page */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${mainPrimeMinisterImage})`,
          backgroundPosition: "center 18%",
          filter: "blur(4px)",
          transform: "scale(1.08)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.8) 100%)" }}
      />

      {/* Back button */}
      <button
        type="button"
        onClick={onBack}
        className={`system-detail-back ${detailBackButtonClassName} ${detailBackButtonSideClassName(dir)}`}
        aria-label="Back to Prime Minister"
      >
        <ArrowLeft size={detailBackIconSize} className={detailBackIconClassName(dir)} />
      </button>

      {/* Vertical timeline navigation */}
      <div className={`absolute bottom-0 top-0 z-20 hidden md:block ${isRtl ? "right-8" : "left-8"}`}>
        <div className="relative flex h-full flex-col justify-center">
          <div className="relative flex flex-col gap-12">
            {timeline.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(index)}
                className={`group relative flex items-center gap-4 transition-all duration-300 ${
                  isRtl ? "flex-row-reverse text-right" : "text-left"
                }`}
              >
                <div className="relative z-10">
                  <div
                    className={`rounded-full transition-all duration-500 ${
                      activeSection === index
                        ? "h-3 w-3 bg-[#e6c98f] shadow-lg shadow-[#c69237]/50"
                        : "h-2 w-2 bg-white/40 group-hover:bg-white/70"
                    }`}
                  />
                </div>
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    activeSection === index
                      ? "max-w-xs opacity-100"
                      : "max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100"
                  }`}
                >
                  <p className="whitespace-nowrap text-sm font-light uppercase tracking-[0.2em] text-white/70">
                    {item.era}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className={`relative z-10 mx-auto h-full max-w-5xl overflow-y-auto scrollbar-hide px-6 pb-20 pt-28 ${
          isRtl ? "md:pl-8 md:pr-32" : "md:pl-32 md:pr-8"
        }`}
      >
        {/* Header */}
        <div className={`mb-16 ${isRtl ? "text-right" : "text-left"}`}>
          <p className="text-xs font-light uppercase tracking-[0.3em] text-[#e6c98f]">{headerLabel}</p>
          <h1 className={`mt-2 ${displayFont} text-4xl font-light tracking-tight text-white sm:text-5xl`}>
            {isAr ? "مەسرور بارزانی" : isKu ? "مەسرور بارزانی" : "Masrour Barzani"}
          </h1>
        </div>

        <div className="space-y-28">
          {timeline.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                sectionRefs.current[index] = el;
              }}
              className={`transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"}`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="relative">
                {/* Era badge */}
                <div className="mb-6 inline-block">
                  <div
                    className="rounded-full px-5 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#e6c98f]"
                    style={{
                      background: "rgba(0,0,0,0.7)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(201,154,85,0.35)",
                    }}
                  >
                    {item.era}
                  </div>
                </div>

                {/* Card */}
                <div
                  className="overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-2xl"
                  style={{
                    background: "rgba(10,14,22,0.55)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(201,154,85,0.18)",
                  }}
                >
                  <div className="grid md:grid-cols-2">
                    {/* Image */}
                    <div className={`relative h-64 overflow-hidden md:h-auto ${index % 2 === 0 ? "md:order-1" : "md:order-2"}`}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                      <div
                        className="absolute inset-0 md:hidden"
                        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 100%)" }}
                      />
                    </div>
                    {/* Text */}
                    <div className={`p-6 md:p-8 ${index % 2 === 0 ? "md:order-2" : "md:order-1"} ${isRtl ? "text-right" : "text-left"}`}>
                      <h2 className={`mb-3 ${displayFont} text-2xl font-light tracking-tight text-white md:text-3xl`}>
                        {item.title}
                      </h2>
                      <p className={`${item.details.length > 0 ? "mb-6" : ""} text-sm leading-relaxed text-white/80 md:text-base`}>
                        {item.description}
                      </p>
                      {item.details.length > 0 && (
                        <div className="space-y-4">
                          {item.details.map((detail) => (
                            <div
                              key={detailKey(detail)}
                              className={`flex items-start gap-2 ${isRtl ? "flex-row-reverse" : ""}`}
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c69237]" />
                              {typeof detail === "string" ? (
                                <span className="text-xs text-white/65 md:text-sm">{detail}</span>
                              ) : (
                                <div>
                                  <p className="text-xs font-medium text-white/90 md:text-sm">{detail.title}</p>
                                  <p className="mt-1 text-xs leading-relaxed text-white/65 md:text-sm">{detail.text}</p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* End message */}
        <div className="mt-20 pb-10 text-center">
          <div
            className="inline-block rounded-full px-8 py-4"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(10px)", border: "1px solid rgba(201,154,85,0.25)" }}
          >
            <p className="text-sm uppercase tracking-[0.2em] text-[#e6c98f]/80">{endLabel}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
