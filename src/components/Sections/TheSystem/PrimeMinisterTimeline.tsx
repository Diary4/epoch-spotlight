import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { discoverDisplayFont, discoverRtlScript } from "@/components/Sections/discoverLanguage";
import citadel from "@/assets/mainImages/building.webp";
import publicServiceImage from "@/assets/images/PrimeMinistir/p-2.png";
import primeMinisterImage from "@/assets/images/PrimeMinistir/pm.jpeg";
import visionImage from "@/assets/images/PrimeMinistir/WhatsApp Image 2026-06-30 at 20.16.30 (1).jpeg";
import economicImage from "@/assets/images/PrimeMinistir/economic.jpeg";
import myAccountImage from "@/assets/images/PrimeMinistir/myaccount.jpeg";
import runakiImage from "@/assets/images/PrimeMinistir/runaki.jpeg";
import infrastructureImage from "@/assets/images/PrimeMinistir/infrastructure.jpeg";
import digitalImage from "@/assets/images/PrimeMinistir/digital.jpeg";
import agreementImage from "@/assets/images/PrimeMinistir/agreement.jpeg";
import jobImage from "@/assets/images/PrimeMinistir/job.jpeg";

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

const timelineImages = {
  "early-life": citadel,
  "public-service": publicServiceImage,
  "prime-minister": primeMinisterImage,
  vision: visionImage,
} as const;

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

function getTimeline(lang: "ku" | "en" | "ar"): TimelineEntry[] {
  const achievementEntries = getAchievementEntries(lang);

  if (lang === "ar") {
    return [
      {
        id: "early-life",
        era: "1969",
        title: "الحياة المبكرة والأصول",
        description:
          "وُلد مسرور بارزاني في منطقة بارزان، في عائلة لها دور تاريخي في الحركة الوطنية الكردية, ونشأ في بيئة تقوم على القيادة والانضباط والخدمة.",
        image: timelineImages["early-life"],
        details: ["وُلد عام 1969 في بارزان", "عائلة متجذرة في الحركة الوطنية", "التعليم والصمود في الجوهر"],
      },
      {
        id: "public-service",
        era: "الخدمة العامة",
        title: "حياة من الخدمة",
        description:
          "دخل القيادة خلال فترات الصراع والتحول، وساهم في الأمن والتطوير المؤسسي في جميع أنحاء كوردستان.",
        image: timelineImages["public-service"],
        details: ["تعزيز مؤسسات الأمن", "دعم المصالحة الوطنية", "بناء هياكل أقوى"],
      },
      {
        id: "prime-minister",
        era: "2019",
        title: "رئيس الوزراء",
        description: "أصبح رئيسًا للوزراء بمهمة تركز على الإصلاح والاستقرار والتنمية المستدامة.",
        image: timelineImages["prime-minister"],
        details: ["حكومة تقودها الإصلاحات", "التركيز على الاستقرار", "أجندة تنمية مستدامة"],
      },
      ...achievementEntries,
      {
        id: "vision",
        era: "المستقبل",
        title: "الرؤية المستقبلية",
        description: "كوردستان مزدهرة ومستقرة وجاهزة للمستقبل تضمن جودة حياة عالية لجميع المواطنين.",
        image: timelineImages.vision,
        details: visionDetails.ar,
      },
    ];
  }

  if (lang === "ku") {
    return [
      {
        id: "early-life",
        era: "١٩٦٩",
        title: "ژیانی سەرەتایی و ڕەگ",
        description:
          "مەسرور بارزانی لە ناوچەی بارزان لە دایکبوو، لە خێزانێک کە ڕۆڵێکی مێژوویی هەبوو لە بزووتنەوەی نەتەوەیی کوردیدا، لە ژینگەیەکی ڕابەرایەتی و ڕێکوپێکی و خزمەتدا گەورە بوو.",
        image: timelineImages["early-life"],
        details: ["لە ١٩٦٩ لە بارزان لە دایکبوو", "خێزانێکی ڕەگداکوتاو لە بزووتنەوەی نەتەوەیی", "پەروەردە و خۆڕاگری لە ناوەکدا"],
      },
      {
        id: "public-service",
        era: "خزمەتی گشتی",
        title: "ژیانێک لە خزمەت",
        description:
          "لە کاتی ناکۆکی و گۆڕانکارییەکاندا چووە ناو ڕێبەرایەتی، بەشداری لە ئاسایش و پەرەپێدانی دامەزراوەیی کرد لە سەرانسەری کوردستاندا.",
        image: timelineImages["public-service"],
        details: ["بەهێزکردنی دامەزراوەکانی ئاسایش", "پاڵپشتی ئاشتەوایی نەتەوەیی", "بونیادنانی پێکهاتەی بەهێزتر"],
      },
      {
        id: "prime-minister",
        era: "٢٠١٩",
        title: "سەرۆک وەزیران",
        description: "بوو بە سەرۆک وەزیران بە مانداتێک کە جەخت لەسەر چاکسازی، سەقامگیری، و گەشەی بەردەوام دەکات.",
        image: timelineImages["prime-minister"],
        details: ["حکومەتێکی چاکسازی-بنەما", "جەخت لەسەر سەقامگیری", "بەرنامەی گەشەی بەردەوام"],
      },
      ...achievementEntries,
      {
        id: "vision",
        era: "داهاتوو",
        title: "ئامانجی داهاتوو",
        description: "کوردستانێکی گەشاوە، سەقامگیر، و ئامادە بۆ داهاتوو کە کوالیتیی ژیانێکی بەرز بۆ هەموو هاوڵاتییەکان دڵنیادەکاتەوە.",
        image: timelineImages.vision,
        details: visionDetails.ku,
      },
    ];
  }

  return [
    {
      id: "early-life",
      era: "1969",
      title: "Early Life & Origins",
      description:
        "Born in the Barzan region into a family with a historic role in the Kurdish national movement, raised in an environment of leadership, discipline, and service.",
      image: timelineImages["early-life"],
      details: ["Born in 1969 in Barzan", "Family rooted in the national movement", "Education and resilience at the core"],
    },
    {
      id: "public-service",
      era: "Public Service",
      title: "A Life of Service",
      description:
        "Entered leadership during periods of conflict and transition, contributing to security and institutional development across Kurdistan.",
      image: timelineImages["public-service"],
      details: ["Strengthened security institutions", "Supported national reconciliation", "Built stronger structures"],
    },
    {
      id: "prime-minister",
      era: "2019",
      title: "Prime Minister",
      description: "Became Prime Minister with a mandate centered on reform, stability, and sustainable development.",
      image: timelineImages["prime-minister"],
      details: ["Reform-driven government", "Focus on stability", "Sustainable development agenda"],
    },
    ...achievementEntries,
    {
      id: "vision",
      era: "The Future",
      title: "Vision for the Future",
      description: "A prosperous, stable, and future-ready Kurdistan that guarantees a high quality of life for all citizens.",
      image: timelineImages.vision,
      details: visionDetails.en,
    },
  ];
}

export default function PrimeMinisterTimeline({ lang = "en", onBack }: PrimeMinisterTimelineProps) {
  const isRtl = discoverRtlScript(lang);
  const displayFont = discoverDisplayFont(lang);
  const isAr = lang === "ar";
  const isKu = lang === "ku";

  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const timeline = getTimeline(lang);

  const backLabel = isAr ? "رجوع" : isKu ? "گەڕانەوە" : "Back";
  const headerLabel = isAr ? "المسيرة" : isKu ? "گەشتەکە" : "The Journey";
  const endLabel = isAr ? "تستمر المسيرة..." : isKu ? "گەشتەکە بەردەوامە..." : "The Journey Continues...";

  useEffect(() => {
    const t = window.setTimeout(() => setIsVisible(true), 60);
    return () => window.clearTimeout(t);
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollPosition = e.currentTarget.scrollTop + 220;
    sectionRefs.current.forEach((section, index) => {
      if (!section) return;
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < bottom) {
        setActiveSection(index);
      }
    });
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
          backgroundImage: `url(${publicServiceImage})`,
          backgroundPosition: "center 18%",
          filter: "blur(12px)",
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
        className={`absolute top-5 z-30 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:gap-3 sm:top-8 ${
          isRtl ? "right-4 sm:right-8" : "left-4 sm:left-8"
        }`}
        style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", border: "1px solid rgba(201,154,85,0.3)" }}
        aria-label={backLabel}
      >
        <ArrowLeft className={`h-4 w-4 ${isRtl ? "rotate-180" : ""}`} />
        <span>{backLabel}</span>
      </button>

      {/* Vertical timeline navigation */}
      <div className={`absolute bottom-0 top-0 z-20 hidden md:block ${isRtl ? "right-8" : "left-8"}`}>
        <div className="relative flex h-full flex-col justify-center">
          <div
            className="absolute left-1/2 h-[70%] w-px -translate-x-1/2"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, rgba(201,154,85,0.5) 20%, rgba(201,154,85,0.5) 80%, transparent 100%)",
            }}
          />
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
        className={`relative z-10 mx-auto h-full max-w-5xl overflow-y-auto px-6 pb-20 pt-28 ${
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
