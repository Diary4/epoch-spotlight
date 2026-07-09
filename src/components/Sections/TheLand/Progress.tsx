import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { useLandDetailAnimation } from "@/components/Sections/TheLand/useLandDetailAnimation";
import { detailBackButtonClassName, detailBackButtonSideClassName, detailBackIconClassName, detailBackIconSize } from "@/constants/backNavigation";
import { discoverDisplayFont, discoverRtlScript } from "@/components/Sections/discoverLanguage";
import bg from "@/assets/images/theLand/progress.png";
import pattern1 from "@/assets/images/patterns/card-1.webp";
import pattern2 from "@/assets/images/patterns/card-2.webp";
import pattern3 from "@/assets/images/patterns/card-3.webp";
import infrastructureIcon from "@/assets/icons/theland/progress/infrastructure.png";
import educationIcon from "@/assets/icons/theland/progress/education.png";
import economyIcon from "@/assets/icons/theland/progress/economy.png";
import tourismIcon from "@/assets/icons/theland/progress/tourism.png";
import digitalIcon from "@/assets/icons/theland/progress/digital.png";

const cardPatterns = [pattern1, pattern2, pattern3];

const topCards = [
  {
    title: "Infrastructure",
    text: "Building modern roads, utilities, and public services.",
    icon: infrastructureIcon,
  },
  {
    title: "Education",
    text: "Investing in knowledge and empowering future generations.",
    icon: educationIcon,
  },
  {
    title: "Economy",
    text: "Driving sustainable growth and job creation.",
    icon: economyIcon,
  },
];

const bottomCards = [
  {
    title: "Tourism",
    text: "Showcasing Kurdistan's beauty and cultural heritage.",
    icon: tourismIcon,
  },
  {
    title: "Digital Transformation",
    text: "Embracing technology and innovation for a smarter future.",
    icon: digitalIcon,
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
  return (
    <article className="land-detail-card relative flex min-h-[clamp(24rem,40cqh,36rem)] flex-col items-center overflow-hidden rounded-[26px] border-2 border-[#ead8b7] bg-white/82 px-[clamp(0.95rem,1.9cqw,2rem)] py-[clamp(1rem,2.2cqh,2rem)] text-center shadow-[0_14px_35px_rgba(84,54,16,0.16)] backdrop-blur-md">
      <img
        src={card.icon}
        alt=""
        className="h-[clamp(6rem,11cqw,10rem)] w-[clamp(6rem,11cqw,10rem)] object-contain"
      />

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
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 opacity-0 [background-size:18px_18px]" />
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
        { title: "البنية التحتية", text: "بناء الطرق الحديثة والمرافق والخدمات العامة.", icon: infrastructureIcon },
        { title: "التعليم", text: "الاستثمار في المعرفة وتمكين الأجيال القادمة.", icon: educationIcon },
        { title: "الاقتصاد", text: "تحقيق النمو المستدام وخلق فرص العمل.", icon: economyIcon },
      ]
    : isKu
      ? [
          { title: "ژێرخان", text: "بونیادنانی ڕێگاوبانی مۆدێرن، پێداویستییە سەرەکییەکان و خزمەتگوزارییە گشتییەکان.", icon: infrastructureIcon },
          { title: "پەروەردە", text: "وەبەرهێنان لە زانیاری و بەهێزکردنی نەوەکانی داهاتوو.", icon: educationIcon },
          { title: "ئابووری", text: "هاندانی گەشەی بەردەوام و ڕەخساندنی هەلی کار.", icon: economyIcon },
        ]
      : topCards;
  const localBottomCards = isAr
    ? [
        { title: "السياحة", text: "إبراز جمال كوردستان وتراثها الثقافي.", icon: tourismIcon },
        { title: "التحول الرقمي", text: "تبنّي التكنولوجيا والابتكار لمستقبل أكثر ذكاءً.", icon: digitalIcon },
      ]
    : isKu
      ? [
          { title: "گەشتیاری", text: "نیشاندانی جوانیی کوردستان و کەلەپوورە کولتوورییەکەی.", icon: tourismIcon },
          { title: "گۆڕانی دیجیتاڵی", text: "لەئامێزگرتنی تەکنەلۆژیا و داهێنان بۆ داهاتوویەکی زیرەکتر.", icon: digitalIcon },
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
      className={`relative h-screen w-screen overflow-hidden bg-[#fbf5eb] ${isRtlScript ? "font-noto-naskh" : ""}`}
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
        <main ref={rootRef} className="m-0 w-full bg-[#fbf5eb] text-[#17233b]">
          <section className="relative mx-auto flex w-full flex-col overflow-hidden bg-[#fbf5eb]">
            <button
              type="button"
              onClick={onBack}
              className={`land-detail-back ${detailBackButtonClassName} ${detailBackButtonSideClassName(dir)}`}
              aria-label="Back to The Land and Future"
            >
              <ArrowLeft size={detailBackIconSize} className={detailBackIconClassName(dir)} />
            </button>

            <div className="absolute left-0 top-[120px] h-full w-24 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />
            <div className="absolute right-0 top-[120px] h-full w-24 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

            {/* Main portrait — soft-edged, shifted right */}
            <div className="land-detail-hero pointer-events-none absolute right-0 top-0 z-0 h-[840px] w-full overflow-hidden rtl:right-auto rtl:left-0">
              <div className={`absolute inset-0 ${dir === "rtl" ? "-scale-x-100" : ""}`}>
                <img
                  src={bg}
                  alt="Progress city portrait"
                  className={`absolute top-1/2 h-[82%] w-[82%] max-w-none -translate-y-1/2 object-cover object-center ${
                    dir === "rtl" ? "left-[34%] -translate-x-1/2" : "left-[74%] -translate-x-1/2"
                  } [mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.45)_9%,black_20%,black_66%,rgba(0,0,0,0.45)_88%,transparent_100%),linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.45)_9%,black_18%,black_68%,rgba(0,0,0,0.45)_90%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.45)_9%,black_20%,black_66%,rgba(0,0,0,0.45)_88%,transparent_100%),linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.45)_9%,black_18%,black_68%,rgba(0,0,0,0.45)_90%,transparent_100%)] [mask-composite:intersect] [-webkit-mask-composite:source-in]`}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#fbf5eb] via-[#fbf5eb]/20 to-transparent rtl:bg-gradient-to-l" />
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

            <div className="relative z-10 mt-[clamp(3.5rem,9cqh,8rem)] px-[clamp(1.4rem,4cqw,4rem)] pb-[clamp(1.2rem,3cqh,2.6rem)]">
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
