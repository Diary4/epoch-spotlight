import React from "react";
import { ArrowLeft, ArrowRight, BarChart3, GraduationCap, MonitorCog, Mountain, Route } from "lucide-react";
import { useLandDetailAnimation } from "@/components/Sections/TheLand/useLandDetailAnimation";
import bg from "@/assets/images/new/discoverKurdistan/land-5.webp";
import pattern1 from "@/assets/images/patterns/card-1.png";
import pattern2 from "@/assets/images/patterns/card-2.png";
import pattern3 from "@/assets/images/patterns/card-3.png";

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
  large = false,
  pattern,
}: {
  card: (typeof topCards)[number];
  large?: boolean;
  pattern?: string;
}) {
  const Icon = card.icon;

  return (
    <article
      className={`land-detail-card relative flex min-h-[260px] flex-col items-center overflow-hidden rounded-[20px] border-2 border-[#ead8b7] bg-white/82 px-5 py-6 text-center shadow-[0_14px_35px_rgba(84,54,16,0.16)] backdrop-blur-md sm:min-h-[300px] sm:rounded-[24px] sm:px-6 sm:py-7 lg:rounded-[clamp(22px,2.3vw,34px)] lg:px-[clamp(16px,1.8vw,34px)] lg:py-[clamp(18px,2.2vh,38px)] ${
        large ? "lg:min-h-[clamp(300px,27vh,420px)]" : "lg:min-h-[clamp(330px,30vh,500px)]"
      }`}
    >
      <div
        className="grid h-16 w-16 place-items-center rounded-full border-[5px] border-white text-[#f8e5b8] shadow-[0_8px_20px_rgba(0,0,0,0.16)] ring-2 ring-[#e1c496] sm:h-[clamp(72px,7.3vw,124px)] sm:w-[clamp(72px,7.3vw,124px)] sm:border-[6px]"
        style={{ backgroundColor: card.color }}
      >
        <Icon className="h-9 w-9 sm:h-12 sm:w-12 lg:h-14 lg:w-14" strokeWidth={1.45} />
      </div>

      <h3 className="mt-4 font-serif text-[clamp(20px,4.5vw,38px)] font-light leading-tight text-[#17233b] sm:mt-[clamp(16px,2vh,32px)]">
        {card.title}
      </h3>

      <div className="my-4 w-[clamp(80px,22vw,140px)] sm:my-[clamp(12px,1.6vh,24px)]">
        <Divider />
      </div>

      <p className="max-w-none px-1 text-[clamp(15px,3.8vw,27px)] font-light leading-[1.45] text-[#35435b] sm:max-w-[clamp(200px,20vw,320px)]">
        {card.text}
      </p>

      <button
        type="button"
        className="relative z-10 mt-5 grid h-12 w-12 place-items-center rounded-full text-white shadow-md ring-4 ring-white sm:mt-auto sm:h-[clamp(52px,5vw,78px)] sm:w-[clamp(52px,5vw,78px)] touch-manipulation"
        style={{ backgroundColor: card.color }}
      >
        <ArrowRight className="h-6 w-6 sm:h-8 sm:w-8" />
      </button>

      {pattern ? (
        <img
          src={pattern}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-[clamp(24px,4vh,72px)] w-full object-cover opacity-[0.15] [mask-image:linear-gradient(to_top,black_45%,transparent_100%)]"
        />
      ) : (
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[clamp(48px,5vh,90px)] opacity-22 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:18px_18px]" />
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
  return (
    <main ref={rootRef} className="m-0 min-h-[100dvh] w-full max-w-[100vw] overflow-x-hidden bg-[#f8f1e7] text-[#17233b]">
      <section className="relative mx-auto flex min-h-0 w-full max-w-[1400px] flex-col overflow-x-hidden overflow-y-auto bg-[#fbf5eb] lg:min-h-[calc(100vh-clamp(16px,2.6vh,32px))] lg:overflow-hidden lg:p-[clamp(10px,1.3vw,20px)]">
        <button
          type="button"
          onClick={onBack}
          className="land-detail-back absolute left-4 top-4 z-30 grid h-12 w-12 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm sm:left-6 sm:top-6 sm:h-14 sm:w-14 lg:left-[clamp(16px,2vw,30px)] lg:top-[clamp(16px,2vh,30px)] lg:h-[clamp(50px,4.8vw,64px)] lg:w-[clamp(50px,4.8vw,64px)]"
          aria-label="Back to The Land and Future"
        >
          <ArrowLeft className="h-6 w-6 sm:h-7 sm:w-7 lg:h-[30px] lg:w-[30px]" />
        </button>
        <div className="pointer-events-none absolute left-0 top-0 hidden h-full w-28 opacity-22 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px] sm:block" />

        {/* Progress city background */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[min(50vh,420px)] w-full min-w-0 sm:h-[min(62vh,560px)] lg:h-[clamp(720px,70vh,1080px)]">
          <img
            src={bg}
            alt="Progress city placeholder"
            className="land-detail-hero absolute inset-0 h-full w-full object-cover object-[center_top] opacity-60 [mask-image:linear-gradient(to_bottom,black_0%,black_74%,transparent_100%)] sm:opacity-78"
          />
        </div>

        <div className="relative z-10 flex flex-1 flex-col px-4 py-4 sm:px-6 sm:py-6">
          {/* Hero */}
          <section className="land-detail-intro w-full max-w-none pt-20 sm:max-w-[min(85vw,760px)] sm:pt-24 lg:max-w-[min(58vw,760px)] lg:pt-[clamp(64px,8.5vh,130px)]">
            <h1 className="font-serif text-[clamp(44px,12vw,130px)] font-light leading-none tracking-tight text-[#17233b]">
              {isAr ? "التقدم" : isKu ? "پێشکەوتن" : "Progress"}
            </h1>

            <p className="mt-5 text-[clamp(22px,5vw,48px)] font-light leading-tight text-[#9b6d35] sm:mt-[clamp(18px,2.8vh,36px)]">
              {isAr ? "التنمية عبر القطاعات الرئيسية." : isKu ? "گەشەپێدان لە کەرتە سەرەکییەکاندا." : "Development across key sectors."}
            </p>

            <div className="mt-5 w-[clamp(140px,40vw,260px)] sm:mt-[clamp(16px,2.5vh,34px)]">
              <Divider />
            </div>

            <p className="mt-5 max-w-none text-[clamp(15px,4vw,34px)] font-medium leading-[1.55] text-[#2d3549] sm:mt-6 lg:max-w-[min(48vw,680px)]">
              {isAr
                ? "يواصل إقليم كوردستان مسيرة تقدّمه في البنية التحتية والتعليم والاقتصاد والسياحة والتحول الرقمي."
                : isKu
                  ? "هەرێمی کوردستان بەردەوامە لە پێشخستنی ژێرخان، پەروەردە، ئابووری، گەشتیاری، و گۆڕانی دیجیتاڵی."
                  : "The Kurdistan Region continues to advance through infrastructure, education, economy, tourism, and digital transformation."}
            </p>
          </section>

          {/* Top 3 cards */}
          <section className="mt-8 grid grid-cols-1 gap-4 pb-6 sm:mt-12 sm:grid-cols-2 sm:gap-5 sm:pb-8 lg:mt-[clamp(72px,18vh,600px)] lg:grid-cols-3 lg:gap-[clamp(16px,1.8vw,34px)] lg:pb-[clamp(10px,1.2vh,24px)]">
            {localTopCards.map((card, index) => (
              <ProgressCard key={card.title} card={card} pattern={cardPatterns[index % cardPatterns.length]} />
            ))}
          </section>

          {/* Bottom 2 centered cards */}
          <section className="mx-auto mt-4 grid w-full max-w-none grid-cols-1 gap-4 pb-8 sm:mt-[clamp(8px,1.3vh,20px)] sm:max-w-[920px] sm:grid-cols-2 sm:gap-5 lg:gap-[clamp(16px,1.8vw,34px)] lg:pb-[clamp(8px,1vh,20px)]">
            {localBottomCards.map((card, index) => (
              <ProgressCard key={card.title} card={card} large pattern={cardPatterns[index % cardPatterns.length]} />
            ))}
          </section>
        </div>
      </section>
    </main>
  );
}
