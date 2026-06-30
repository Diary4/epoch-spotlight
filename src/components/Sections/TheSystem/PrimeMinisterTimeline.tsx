import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { discoverDisplayFont, discoverRtlScript } from "@/components/Sections/discoverLanguage";
import citadel from "@/assets/mainImages/building.webp";
import peshmarga from "@/assets/mainImages/peshmarga.webp";
import government from "@/assets/mainImages/government.webp";
import cityscape from "@/assets/mainImages/theland/progress-4.webp";
import landscape from "@/assets/mainImages/theland/land-2.webp";

type TimelineEntry = {
  era: string;
  title: string;
  description: string;
  image: string;
  details: string[];
};

type PrimeMinisterTimelineProps = {
  lang?: "ku" | "en" | "ar";
  onBack?: () => void;
};

const images = [citadel, peshmarga, government, cityscape, landscape];

function getTimeline(lang: "ku" | "en" | "ar"): TimelineEntry[] {
  if (lang === "ar") {
    return [
      {
        era: "1969",
        title: "الحياة المبكرة والأصول",
        description:
          "وُلد مسرور بارزاني في منطقة بارزان، في عائلة لها دور تاريخي في الحركة الوطنية الكردية، ونشأ في بيئة تقوم على القيادة والانضباط والخدمة.",
        image: images[0],
        details: ["وُلد عام 1969 في بارزان", "عائلة متجذرة في الحركة الوطنية", "التعليم والصمود في الجوهر"],
      },
      {
        era: "الخدمة العامة",
        title: "حياة من الخدمة",
        description:
          "دخل القيادة خلال فترات الصراع والتحول، وساهم في الأمن والتطوير المؤسسي في جميع أنحاء كوردستان.",
        image: images[1],
        details: ["تعزيز مؤسسات الأمن", "دعم المصالحة الوطنية", "بناء هياكل أقوى"],
      },
      {
        era: "2019",
        title: "رئيس وزراء الإقليم",
        description: "أصبح رئيسًا للوزراء بمهمة تركز على الإصلاح والاستقرار والتنمية المستدامة.",
        image: images[2],
        details: ["حكومة تقودها الإصلاحات", "التركيز على الاستقرار", "أجندة تنمية مستدامة"],
      },
      {
        era: "الإنجازات",
        title: "الإنجازات المختارة",
        description: "قاد إصلاحات واسعة حدّثت الحكومة وحسّنت الحياة اليومية للمواطنين.",
        image: images[3],
        details: [
          "الإصلاح الاقتصادي والتنويع",
          "برنامجا حسابي وڕووناکی",
          "البنية التحتية والتحول الرقمي",
          "الاستثمار وفرص العمل وتمكين الشباب",
        ],
      },
      {
        era: "المستقبل",
        title: "الرؤية المستقبلية",
        description: "كوردستان مزدهرة ومستقرة وجاهزة للمستقبل تضمن جودة حياة عالية لجميع المواطنين.",
        image: images[4],
        details: [
          "اقتصاد قوي ومتنوع",
          "طاقة و بنية تحتية موثوقة",
          "تمكين الناس والشباب",
          "كوردستان مستدامة ومرنة",
        ],
      },
    ];
  }

  if (lang === "ku") {
    return [
      {
        era: "١٩٦٩",
        title: "ژیانی سەرەتایی و ڕەگ",
        description:
          "مەسرور بارزانی لە ناوچەی بارزان لە دایکبوو، لە خێزانێک کە ڕۆڵێکی مێژوویی هەبوو لە بزووتنەوەی نەتەوەیی کوردیدا، لە ژینگەیەکی ڕابەرایەتی و ڕێکوپێکی و خزمەتدا گەورە بوو.",
        image: images[0],
        details: ["لە ١٩٦٩ لە بارزان لە دایکبوو", "خێزانێکی ڕەگداکوتاو لە بزووتنەوەی نەتەوەیی", "پەروەردە و خۆڕاگری لە ناوەکدا"],
      },
      {
        era: "خزمەتی گشتی",
        title: "ژیانێک لە خزمەت",
        description:
          "لە کاتی ناکۆکی و گۆڕانکارییەکاندا چووە ناو ڕێبەرایەتی، بەشداری لە ئاسایش و پەرەپێدانی دامەزراوەیی کرد لە سەرانسەری کوردستاندا.",
        image: images[1],
        details: ["بەهێزکردنی دامەزراوەکانی ئاسایش", "پاڵپشتی ئاشتەوایی نەتەوەیی", "بونیادنانی پێکهاتەی بەهێزتر"],
      },
      {
        era: "٢٠١٩",
        title: "سەرۆک وەزیرانی هەرێم",
        description: "بوو بە سەرۆک وەزیران بە مانداتێک کە جەخت لەسەر چاکسازی، سەقامگیری، و گەشەی بەردەوام دەکات.",
        image: images[2],
        details: ["حکومەتێکی چاکسازی-بنەما", "جەخت لەسەر سەقامگیری", "بەرنامەی گەشەی بەردەوام"],
      },
      {
        era: "دەستکەوتەکان",
        title: "دەستکەوتە هەڵبژێردراوەکان",
        description: "ڕابەری چاکسازیی فراوان کرد کە حکومەتی نوێ کردەوە و ژیانی ڕۆژانەی هاوڵاتیانی باشتر کرد.",
        image: images[3],
        details: [
          "چاکسازیی ئابووری و هەمەجۆری",
          "پڕۆژەکانی هەژماری من و ڕووناکی",
          "ژێرخان و گۆڕینی دیجیتاڵ",
          "وەبەرهێنان، کار، و توانادارکردنی گەنجان",
        ],
      },
      {
        era: "داهاتوو",
        title: "ئامانجی داهاتوو",
        description: "کوردستانێکی گەشاوە، سەقامگیر، و ئامادە بۆ داهاتوو کە کوالیتیی ژیانێکی بەرز بۆ هەموو هاوڵاتییەکان دڵنیادەکاتەوە.",
        image: images[4],
        details: [
          "ئابوورییەکی بەهێز و هەمەجۆر",
          "وزە و ژێرخانی جێگیر",
          "توانادارکردنی خەڵک و گەنجان",
          "کوردستانێکی بەردەوام و خۆڕاگر",
        ],
      },
    ];
  }

  return [
    {
      era: "1969",
      title: "Early Life & Origins",
      description:
        "Born in the Barzan region into a family with a historic role in the Kurdish national movement, raised in an environment of leadership, discipline, and service.",
      image: images[0],
      details: ["Born in 1969 in Barzan", "Family rooted in the national movement", "Education and resilience at the core"],
    },
    {
      era: "Public Service",
      title: "A Life of Service",
      description:
        "Entered leadership during periods of conflict and transition, contributing to security and institutional development across Kurdistan.",
      image: images[1],
      details: ["Strengthened security institutions", "Supported national reconciliation", "Built stronger structures"],
    },
    {
      era: "2019",
      title: "Prime Minister of the KRG",
      description: "Became Prime Minister with a mandate centered on reform, stability, and sustainable development.",
      image: images[2],
      details: ["Reform-driven government", "Focus on stability", "Sustainable development agenda"],
    },
    {
      era: "Achievements",
      title: "Selected Achievements",
      description: "Led far-reaching reforms that modernized government and improved daily life for citizens.",
      image: images[3],
      details: [
        "Economic reform & diversification",
        "MyAccount & Runaki programs",
        "Infrastructure & digital transformation",
        "Investment, jobs & youth empowerment",
      ],
    },
    {
      era: "The Future",
      title: "Vision for the Future",
      description: "A prosperous, stable, and future-ready Kurdistan that guarantees a high quality of life for all citizens.",
      image: images[4],
      details: [
        "A strong & diversified economy",
        "Reliable energy & infrastructure",
        "Empowered people & youth",
        "Sustainable & resilient Kurdistan",
      ],
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
  const endLabel = isAr
    ? "تستمر المسيرة..."
    : isKu
      ? "گەشتەکە بەردەوامە..."
      : "The Journey Continues...";

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
      {/* Background with subtle blur */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${citadel})`, filter: "brightness(0.3) blur(2px)", transform: "scale(1.1)" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.9) 100%)" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.45) 100%)" }}
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
                key={item.title}
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
              key={item.title}
              ref={(el) => {
                sectionRefs.current[index] = el;
              }}
              className={`transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"}`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="relative">
                {/* Era badge */}
                <div className={`mb-6 inline-block`}>
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
                      <p className="mb-6 text-sm leading-relaxed text-white/80 md:text-base">{item.description}</p>
                      <div className="space-y-2">
                        {item.details.map((detail) => (
                          <div key={detail} className={`flex items-start gap-2 ${isRtl ? "flex-row-reverse" : ""}`}>
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c69237]" />
                            <span className="text-xs text-white/65 md:text-sm">{detail}</span>
                          </div>
                        ))}
                      </div>
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
