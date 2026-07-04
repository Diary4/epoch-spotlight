import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, BarChart3, GraduationCap, MonitorCog, Mountain, Route } from "lucide-react";
import { useLandDetailAnimation } from "@/components/Sections/TheLand/useLandDetailAnimation";
import { detailBackButtonClassName, detailBackButtonSideClassName } from "@/constants/backNavigation";
import { discoverDisplayFont, discoverRtlScript } from "@/components/Sections/discoverLanguage";
import bg from "@/assets/mainImages/theland/progress-4.webp";
import pattern1 from "@/assets/images/patterns/card-1.webp";
import pattern2 from "@/assets/images/patterns/card-2.webp";
import pattern3 from "@/assets/images/patterns/card-3.webp";

const cardPatterns = [pattern1, pattern2, pattern3];

const topCards = [
  {
    title: "Infrastructure",
    text: "Building modern roads, utilities, and public services.",
    icon: Route,
    color: "#13213b",
  },
  {
    title: "Education",
    text: "Investing in knowledge and empowering future generations.",
    icon: GraduationCap,
    color: "#405846",
  },
  {
    title: "Economy",
    text: "Driving sustainable growth and job creation.",
    icon: BarChart3,
    color: "#963538",
  },
];

const bottomCards = [
  {
    title: "Tourism",
    text: "Showcasing Kurdistan's beauty and cultural heritage.",
    icon: Mountain,
    color: "#c69237",
  },
  {
    title: "Digital Transformation",
    text: "Embracing technology and innovation for a smarter future.",
    icon: MonitorCog,
    color: "#13213b",
  },
];

function Divider({ className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-4 text-[#b99152] ${className}`}>
      <span className="h-0.5 flex-1 bg-[#b99152]" />
      <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
      <span className="h-0.5 flex-1 bg-[#b99152]" />
    </div>
  );
}

function ProgressCard({
  card,
  pattern,
  displayFont = "font-serif",
}: {
  card: (typeof topCards)[number];
  pattern?: string;
  displayFont?: string;
}) {
  const Icon = card.icon;

  return (
    <article className="land-detail-card relative flex min-h-[clamp(24rem,40cqh,36rem)] flex-col items-center overflow-hidden rounded-[26px] border-2 border-[#ead8b7] bg-white/82 px-[clamp(0.95rem,1.9cqw,2rem)] py-[clamp(1rem,2.2cqh,2rem)] text-center shadow-[0_14px_35px_rgba(84,54,16,0.16)] backdrop-blur-md">
      <div
        className="grid h-[clamp(4.1rem,7.5cqw,7.2rem)] w-[clamp(4.1rem,7.5cqw,7.2rem)] place-items-center rounded-full border-[6px] border-white text-[#f8e5b8] shadow-[0_8px_20px_rgba(0,0,0,0.16)] ring-2 ring-[#e1c496]"
        style={{ backgroundColor: card.color }}
      >
        <Icon className="h-[clamp(2rem,3.5cqw,3.5rem)] w-[clamp(2rem,3.5cqw,3.5rem)]" strokeWidth={1.45} />
      </div>

      <h3 className={`mt-[clamp(0.8rem,1.8cqh,1.9rem)] ${displayFont} text-[clamp(1.5rem,2.7cqw,2.5rem)] font-light leading-tight text-[#17233b]`}>
        {card.title}
      </h3>

      <div className="my-[clamp(0.75rem,1.6cqh,1.7rem)] w-[clamp(4.8rem,10cqw,8rem)]">
        <Divider />
      </div>

      <p className="max-w-[min(22cqw,320px)] text-[clamp(1.02rem,1.58cqw,1.5rem)] font-light leading-[1.45] text-[#35435b]">
        {card.text}
      </p>

      {pattern ? (
        <img
          src={pattern}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-[clamp(2rem,4cqh,4.5rem)] w-full object-cover opacity-[0.15] [mask-image:linear-gradient(to_top,black_45%,transparent_100%)]"
        />
      ) : (
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 opacity-22 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:18px_18px]" />
      )}
    </article>
  );
}

type ProgressPageProps = {
  lang?: "ku" | "en" | "ar";
  onBack?: () => void;
};

export default function ProgressPage({ lang = "en", onBack }: ProgressPageProps) {
  const rootRef = useLandDetailAnimation([lang]);
  const isAr = lang === "ar";
  const isKu = lang === "ku";
  const dir = lang === "en" ? "ltr" : "rtl";
  const isRtlScript = discoverRtlScript(lang);
  const displayFont = discoverDisplayFont(lang);
  const localTopCards = isAr
    ? [
        { title: "البنية التحتية", text: "بناء الطرق الحديثة والمرافق والخدمات العامة.", icon: Route, color: "#13213b" },
        { title: "التعليم", text: "الاستثمار في المعرفة وتمكين الأجيال القادمة.", icon: GraduationCap, color: "#405846" },
        { title: "الاقتصاد", text: "تحقيق النمو المستدام وخلق فرص العمل.", icon: BarChart3, color: "#963538" },
      ]
    : isKu
      ? [
          { title: "ژێرخان", text: "بونیادنانی ڕێگاوبانی مۆدێرن، پێداویستییە سەرەکییەکان و خزمەتگوزارییە گشتییەکان.", icon: Route, color: "#13213b" },
          { title: "پەروەردە", text: "وەبەرهێنان لە زانیاری و بەهێزکردنی نەوەکانی داهاتوو.", icon: GraduationCap, color: "#405846" },
          { title: "ئابووری", text: "هاندانی گەشەی بەردەوام و ڕەخساندنی هەلی کار.", icon: BarChart3, color: "#963538" },
        ]
      : topCards;
  const localBottomCards = isAr
    ? [
        { title: "السياحة", text: "إبراز جمال كوردستان وتراثها الثقافي.", icon: Mountain, color: "#c69237" },
        { title: "التحول الرقمي", text: "تبنّي التكنولوجيا والابتكار لمستقبل أكثر ذكاءً.", icon: MonitorCog, color: "#13213b" },
      ]
    : isKu
      ? [
          { title: "گەشتیاری", text: "نیشاندانی جوانیی کوردستان و کەلەپوورە کولتوورییەکەی.", icon: Mountain, color: "#c69237" },
          { title: "گۆڕانی دیجیتاڵی", text: "لەئامێزگرتنی تەکنەلۆژیا و داهێنان بۆ داهاتوویەکی زیرەکتر.", icon: MonitorCog, color: "#13213b" },
        ]
      : bottomCards;

  // Fixed design canvas (1400px wide). We measure its natural height and scale
  // the whole canvas to fit the viewport in BOTH dimensions, then center it
  // horizontally and anchor it to the top, so all content stays visible without
  // scrolling on any screen (e.g. 1080x1920) and the hero stays flush to the top.
  const DESIGN_WIDTH = 1400;
  const canvasRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState({ scale: 1, x: 0 });

  useEffect(() => {
    const recompute = () => {
      const el = canvasRef.current;
      if (!el) return;
      const naturalHeight = el.offsetHeight;
      if (!naturalHeight) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const scale = Math.min(vw / DESIGN_WIDTH, vh / naturalHeight);
      const x = (vw - DESIGN_WIDTH * scale) / 2;
      setFit({ scale, x });
    };

    recompute();
    window.addEventListener("resize", recompute);
    const el = canvasRef.current;
    const ro = el ? new ResizeObserver(recompute) : null;
    if (el && ro) ro.observe(el);
    return () => {
      window.removeEventListener("resize", recompute);
      ro?.disconnect();
    };
  }, [lang]);

  return (
    <div
      dir={dir}
      className={`relative h-screen w-screen overflow-hidden bg-[#f8f1e7] ${isRtlScript ? "font-noto-naskh" : ""}`}
      style={{ width: "100vw", height: "100vh" }}
    >
      <div
        ref={canvasRef}
        style={{
          width: `${DESIGN_WIDTH}px`,
          transform: `translate(${fit.x}px, 0px) scale(${fit.scale})`,
          transformOrigin: "top left",
          position: "absolute",
          top: 0,
          left: 0,
          containerType: "inline-size",
        }}
      >
        <main ref={rootRef} className="m-0 w-full bg-[#f8f1e7] text-[#17233b]">
          <section className="relative mx-auto flex w-full flex-col overflow-hidden rounded-[22px] bg-[#fbf5eb]">
            <button
              type="button"
              onClick={onBack}
              className={`land-detail-back ${detailBackButtonClassName} ${detailBackButtonSideClassName(dir)}`}
              aria-label="Back to The Land and Future"
            >
              <ArrowLeft size={32} className="rtl:rotate-180" />
            </button>

            <div className="absolute left-0 top-[120px] h-full w-24 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />
            <div className="absolute right-0 top-[120px] h-full w-24 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

            {/* Main portrait — top-right, fading into the paper */}
            <div className="land-detail-hero pointer-events-none absolute right-0 top-0 z-0 h-[840px] w-full overflow-hidden rtl:right-auto rtl:left-0">
              <div className={`absolute inset-0 ${dir === "rtl" ? "-scale-x-100" : ""}`}>
                <img
                  src={bg}
                  alt="Progress city portrait"
                  className="absolute inset-0 h-full w-full object-cover object-[center_top] opacity-[0.82] [mask-image:linear-gradient(to_bottom,black_0%,black_74%,transparent_100%)]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#fbf5eb] via-[#fbf5eb]/25 to-transparent rtl:bg-gradient-to-l" />
            </div>

            <div className="relative z-10 flex h-[760px] min-h-0 flex-col px-[clamp(1.4rem,4cqw,4rem)] pt-[clamp(1.2rem,4cqh,3.5rem)] pb-[clamp(1.2rem,3cqh,2.6rem)]">
              <section className="land-detail-intro max-w-[min(46cqw,720px)]">
                <h1 className={`${displayFont} text-[clamp(6rem,11cqw,10rem)] font-light leading-none tracking-tight text-[#17233b]`}>
                  {isAr ? "التقدم" : isKu ? "پێشکەوتن" : "Progress"}
                </h1>

                <p className="mt-[clamp(1rem,2.2cqh,2rem)] text-[clamp(1.65rem,2.75cqw,2.7rem)] font-light leading-tight text-[#9b6d35]">
                  {isAr ? "التنمية عبر القطاعات الرئيسية." : isKu ? "گەشەپێدان لە کەرتە سەرەکییەکاندا." : "Development across key sectors."}
                </p>

                <div className="mt-[clamp(1rem,2.3cqh,2rem)] w-[clamp(9rem,18cqw,14.5rem)]">
                  <Divider />
                </div>

                <p className="mt-[clamp(1rem,2.4cqh,2rem)] max-w-[min(38cqw,590px)] text-[clamp(1.2rem,2cqw,1.95rem)] font-medium leading-[1.55] text-[#2d3549]">
                  {isAr
                    ? "يواصل إقليم كوردستان مسيرة تقدّمه في البنية التحتية والتعليم والاقتصاد والسياحة والتحول الرقمي."
                    : isKu
                      ? "هەرێمی کوردستان بەردەوامە لە پێشخستنی ژێرخان، پەروەردە، ئابووری، گەشتیاری، و گۆڕانی دیجیتاڵی."
                      : "The Kurdistan Region continues to advance through infrastructure, education, economy, tourism, and digital transformation."}
                </p>
              </section>
            </div>

            <div className="relative z-10 px-[clamp(1.4rem,4cqw,4rem)] pb-[clamp(1.2rem,3cqh,2.6rem)]">
              {/* Top 3 cards */}
              <section className="grid grid-cols-3 gap-[clamp(0.85rem,1.8cqw,2.1rem)]">
                {localTopCards.map((card, index) => (
                  <ProgressCard key={card.title} card={card} pattern={cardPatterns[index % cardPatterns.length]} displayFont={displayFont} />
                ))}
              </section>

              {/* Bottom 2 centered cards */}
              <section className="mx-auto mt-[clamp(0.85rem,1.8cqh,2.1rem)] grid w-full max-w-[min(64cqw,920px)] grid-cols-2 gap-[clamp(0.85rem,1.8cqw,2.1rem)]">
                {localBottomCards.map((card, index) => (
                  <ProgressCard key={card.title} card={card} pattern={cardPatterns[index % cardPatterns.length]} displayFont={displayFont} />
                ))}
              </section>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
