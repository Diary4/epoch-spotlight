import React from "react";
import { ArrowLeft, ArrowRight, BarChart3, GraduationCap, MonitorCog, Mountain, Route } from "lucide-react";
import { useLandDetailAnimation } from "@/components/Sections/TheLand/useLandDetailAnimation";
import bg from "@/assets/mainImages/theland/progress-4.webp";

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

function ProgressCard({ card, large = false }) {
  const Icon = card.icon;

  return (
    <article
      className={`land-detail-card relative flex flex-col items-center overflow-hidden rounded-[clamp(22px,2.3vw,34px)] border-2 border-[#ead8b7] bg-white/82 px-[clamp(16px,1.8vw,34px)] py-[clamp(18px,2.2vh,38px)] text-center shadow-[0_14px_35px_rgba(84,54,16,0.16)] backdrop-blur-md ${
        large ? "min-h-[clamp(300px,27vh,420px)]" : "min-h-[clamp(330px,30vh,500px)]"
      }`}
    >
      <div
        className="grid h-[clamp(82px,7.3vw,124px)] w-[clamp(82px,7.3vw,124px)] place-items-center rounded-full border-[6px] border-white text-[#f8e5b8] shadow-[0_8px_20px_rgba(0,0,0,0.16)] ring-2 ring-[#e1c496]"
        style={{ backgroundColor: card.color }}
      >
        <Icon size={56} strokeWidth={1.45} />
      </div>

      <h3 className="mt-[clamp(16px,2vh,32px)] font-serif text-[clamp(24px,2.4vw,38px)] font-light leading-tight text-[#17233b]">
        {card.title}
      </h3>

      <div className="my-[clamp(12px,1.6vh,24px)] w-[clamp(90px,8.5vw,140px)]">
        <Divider />
      </div>

      <p className="max-w-[clamp(200px,20vw,320px)] text-[clamp(17px,1.65vw,27px)] font-light leading-[1.45] text-[#35435b]">
        {card.text}
      </p>

      <button
        className="mt-auto grid h-[clamp(52px,5vw,78px)] w-[clamp(52px,5vw,78px)] place-items-center rounded-full text-white shadow-md ring-4 ring-white"
        style={{ backgroundColor: card.color }}
      >
        <ArrowRight size={32} />
      </button>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[clamp(48px,5vh,90px)] opacity-22 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:18px_18px]" />
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
    <main ref={rootRef} className="m-0 min-h-[100vh] w-[100vw] max-w-none bg-[#f8f1e7] text-[#17233b]">
      <section className="relative mx-auto flex min-h-[calc(100vh-clamp(16px,2.6vh,32px))] w-[min(100vw,1400px)] max-w-none flex-col overflow-hidden rounded-[clamp(22px,2.4vw,34px)] bg-[#fbf5eb] p-[clamp(10px,1.3vw,20px)]">
        <button
          type="button"
          onClick={onBack}
          className="land-detail-back absolute left-[clamp(16px,2vw,30px)] top-[clamp(16px,2vh,30px)] z-30 grid h-[clamp(50px,4.8vw,64px)] w-[clamp(50px,4.8vw,64px)] place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm"
          aria-label="Back to The Land and Future"
        >
          <ArrowLeft size={30} />
        </button>
        <div className="absolute left-0 top-0 h-full w-28 opacity-22 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

        {/* Replace this with your generated progress/city background */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[clamp(720px,70vh,1080px)]">
          <img
            src={bg}
            alt="Progress city placeholder"
            className="land-detail-hero absolute inset-0 h-full w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_74%,transparent_100%)]"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-r from-[#fbf5eb] via-[#fbf5eb]/22 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[clamp(160px,19vh,300px)] bg-gradient-to-b from-transparent to-[#fbf5eb]" /> */}
        </div>

        <div className="relative z-10 flex flex-1 flex-col">
          {/* Hero */}
          <section className="land-detail-intro max-w-[min(58vw,760px)] pt-[clamp(64px,8.5vh,130px)]">
            <h1 className="font-serif text-[clamp(72px,9vw,130px)] font-light leading-none tracking-tight text-[#17233b]">
              {isAr ? "التقدم" : isKu ? "پێشکەوتن" : "Progress"}
            </h1>

            <p className="mt-[clamp(18px,2.8vh,36px)] text-[clamp(28px,3.3vw,48px)] font-light leading-tight text-[#9b6d35]">
              {isAr ? "التنمية عبر القطاعات الرئيسية." : isKu ? "گەشەپێدان لە کەرتە سەرەکییەکاندا." : "Development across key sectors."}
            </p>

            <div className="mt-[clamp(16px,2.5vh,34px)] w-[clamp(160px,16vw,260px)]">
              <Divider />
            </div>

            <p className="mt-[clamp(16px,200vh,120px)] max-w-[min(48vw,680px)] text-[clamp(20px,2.2vw,34px)] font-medium leading-[1.55] text-[#2d3549]">
              {isAr
                ? "يواصل إقليم كوردستان مسيرة تقدّمه في البنية التحتية والتعليم والاقتصاد والسياحة والتحول الرقمي."
                : isKu
                  ? "هەرێمی کوردستان بەردەوامە لە پێشخستنی ژێرخان، پەروەردە، ئابووری، گەشتیاری، و گۆڕانی دیجیتاڵی."
                : "The Kurdistan Region continues to advance through infrastructure, education, economy, tourism, and digital transformation."}
            </p>
          </section>

          {/* Top 3 cards */}
          <section className="mt-[clamp(72px,18vh,600px)] grid grid-cols-3 gap-[clamp(16px,1.8vw,34px)] pb-[clamp(10px,1.2vh,24px)]">
            {localTopCards.map((card) => (
              <ProgressCard key={card.title} card={card} />
            ))}
          </section>

          {/* Bottom 2 centered cards */}
          <section className="mx-auto mt-[clamp(8px,1.3vh,20px)] grid w-[min(62vw,920px)] grid-cols-2 gap-[clamp(16px,1.8vw,34px)] pb-[clamp(8px,1vh,20px)]">
            {localBottomCards.map((card) => (
              <ProgressCard key={card.title} card={card} large />
            ))}
          </section>
        </div>
      </section>
    </main>
  );
}
