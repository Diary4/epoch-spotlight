import React from "react";
import { ArrowLeft, ArrowRight, BarChart3, GraduationCap, MonitorCog, Mountain, Route } from "lucide-react";
import { useLandDetailAnimation } from "@/components/Sections/TheLand/useLandDetailAnimation";
import bg from "@/assets/images/new/discoverKurdistan/land-5.webp";

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
    <div className={`flex items-center justify-center gap-1.5 sm:gap-4 text-[#b99152] ${className}`}>
      <span className="h-0.5 flex-1 bg-[#b99152]" />
      <span className="h-1.5 w-1.5 xs:h-2 xs:w-2 sm:h-3 sm:w-3 rotate-45 border border-[#b99152] sm:border-2" />
      <span className="h-0.5 flex-1 bg-[#b99152]" />
    </div>
  );
}

function ProgressCard({ card, large = false }: { card: (typeof topCards)[number]; large?: boolean }) {
  const Icon = card.icon;

  return (
    <article
      className={`land-detail-card relative flex mt-[30px] sm:mt-0 min-h-[140px] xs:min-h-[180px] sm:min-h-[300px] lg:min-h-[clamp(330px,30vh,500px)] flex-col items-center overflow-hidden rounded-[12px] border border-[#ead8b7] bg-white/82 px-1.5 py-4 xs:px-2.5 xs:py-5 sm:border-2 sm:rounded-[24px] sm:px-6 sm:py-7 lg:rounded-[clamp(22px,2.3vw,34px)] lg:px-[clamp(16px,1.8vw,34px)] lg:py-[clamp(18px,2.2vh,38px)] ${
        large ? "lg:min-h-[clamp(300px,27vh,420px)]" : ""
      }`}
    >
      <div
        className="grid h-10 w-10 xs:h-12 xs:w-12 sm:h-[clamp(72px,7.3vw,124px)] sm:w-[clamp(72px,7.3vw,124px)] place-items-center rounded-full border-2 xs:border-4 sm:border-[6px] border-white text-[#f8e5b8] shadow-[0_4px_12px_rgba(84,54,16,0.15)] sm:shadow-[0_8px_20px_rgba(0,0,0,0.16)] ring-1 ring-[#e1c496] sm:ring-2"
        style={{ backgroundColor: card.color }}
      >
        <Icon className="h-5 w-5 xs:h-6 xs:w-6 sm:h-12 sm:w-12 lg:h-14 lg:w-14" strokeWidth={1.45} />
      </div>

      <h3 className="mt-2.5 xs:mt-4 sm:mt-[clamp(16px,2vh,32px)] font-serif text-[9px] xs:text-[11px] sm:text-[clamp(20px,4.5vw,38px)] font-light leading-tight text-[#17233b]">
        {card.title}
      </h3>

      <div className="mx-auto my-1.5 xs:my-3 sm:my-[clamp(12px,1.6vh,24px)] flex w-12 xs:w-16 sm:w-[clamp(80px,22vw,140px)] items-center justify-center gap-1 sm:gap-3 text-[#b99152]">
        <Divider />
      </div>

      <p className="max-w-none px-1 text-[8px] xs:text-[9.5px] sm:text-[clamp(15px,3.8vw,27px)] font-light leading-[1.45] text-[#35435b] sm:max-w-[clamp(200px,20vw,320px)]">
        {card.text}
      </p>

      <button
        type="button"
        className="mt-3 xs:mt-4 grid h-7 w-7 xs:h-9 xs:w-9 sm:mt-auto sm:h-[clamp(52px,5vw,78px)] sm:w-[clamp(52px,5vw,78px)] place-items-center rounded-full text-white shadow-md ring-1 ring-white sm:ring-4 touch-manipulation"
        style={{ backgroundColor: card.color }}
      >
        <ArrowRight className="h-3.5 w-3.5 xs:h-4.5 xs:w-4.5 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />
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
    <main ref={rootRef} className="m-0 min-h-[100dvh] w-full max-w-[100vw] overflow-x-hidden bg-[#f8f1e7] text-[#17233b]">
      <section className="relative mx-auto flex min-h-0 w-full max-w-[1400px] flex-col overflow-x-hidden overflow-y-auto bg-[#fbf5eb] lg:min-h-[calc(100vh-clamp(16px,2.6vh,32px))] lg:overflow-hidden lg:p-[clamp(10px,1.3vw,20px)]">
        
        {/* Responsive back button */}
        <button
          type="button"
          onClick={onBack}
          className="land-detail-back absolute left-3 top-3 z-30 grid h-10 w-10 place-items-center rounded-full border border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm sm:border-2 sm:left-6 sm:top-6 sm:h-14 sm:w-14 lg:left-[clamp(16px,2vw,30px)] lg:top-[clamp(16px,2vh,30px)] lg:h-[clamp(50px,4.8vw,64px)] lg:w-[clamp(50px,4.8vw,64px)]"
          aria-label="Back to The Land and Future"
        >
          <ArrowLeft className="h-5 w-5 sm:h-7 sm:w-7 lg:h-[30px] lg:w-[30px]" />
        </button>
        <div className="pointer-events-none absolute left-0 top-0 hidden h-full w-28 opacity-22 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px] sm:block" />

        {/* Absolutely positioned background illustration layer */}
        <div className="pointer-events-none absolute inset-x-0 top-[000px] h-[40vh] sm:top-0 sm:h-[min(62vh,560px)] lg:h-[clamp(720px,70vh,1080px)] w-full overflow-hidden z-0">
          <img
            src={bg}
            alt="Progress city placeholder"
            className="land-detail-hero absolute inset-0 h-full w-full object-cover object-[center_top] opacity-30 sm:opacity-50 md:opacity-78 
                      [mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_75%,transparent_100%)]
                      sm:[mask-image:none]"
          />
        </div>

        {/* Tighter horizontal padding px-3 on mobile to maximize card grid width */}
        <div className="relative z-10 flex flex-1 flex-col px-3 xs:px-6 sm:py-6 lg:px-[clamp(18px,3.2vw,52px)] lg:py-[clamp(14px,2vh,36px)]">
          {/* Hero header */}
          <section className="land-detail-intro w-full max-w-none pt-12 sm:max-w-[min(85vw,760px)] sm:pt-24 lg:max-w-[min(58vw,760px)] lg:pt-[clamp(64px,8.5vh,130px)]">
            <h1 className="font-serif text-[clamp(32px,10vw,48px)] xs:text-[clamp(38px,11vw,80px)] sm:text-[clamp(44px,12vw,130px)] font-light leading-none tracking-tight text-[#17233b]">
              {isAr ? "التقدم" : isKu ? "پێشکەوتن" : "Progress"}
            </h1>

            <p className="mt-4 sm:mt-[clamp(18px,2.8vh,36px)] text-[clamp(18px,5vw,28px)] xs:text-[clamp(22px,5.5vw,40px)] sm:text-[clamp(22px,5vw,48px)] font-light leading-tight text-[#9b6d35]">
              {isAr ? "التنمية عبر القطاعات الرئيسية." : isKu ? "گەشەپێدان لە کەرتە سەرەکییەکاندا." : "Development across key sectors."}
            </p>

            <div className="mt-4 sm:mt-[clamp(16px,2.5vh,34px)] w-[min(150px,52vw)]">
              <Divider />
            </div>

            <p className="mt-4 sm:mt-6 max-w-none text-[12px] xs:text-[14px] sm:text-[22px] lg:text-[34px] font-medium leading-[1.55] text-[#2d3549]">
              {isAr
                ? "يواصل إقليم كوردستان مسيرة تقدّمه في البنية التحتية والتعليم والاقتصاد والسياحة والتحول الرقمي."
                : isKu
                  ? "هەرێمی کوردستان بەردەوامە لە پێشخستنی ژێرخان، پەروەردە، ئابووری، گەشتیاری، و گۆڕانی دیجیتاڵی."
                : "The Kurdistan Region continues to advance through infrastructure, education, economy, tourism, and digital transformation."}
            </p>
          </section>

          {/* Cards Section - forced responsive 3-column layout */}
          <section className="relative z-10 mt-12 xs:mt-16 sm:mt-0 grid grid-cols-3 gap-1.5 xs:gap-2.5 sm:gap-5 pb-4 pt-4 lg:pb-[clamp(10px,1.2vh,24px)]">
            {localTopCards.map((card) => (
              <ProgressCard key={card.title} card={card} />
            ))}
          </section>

          {/* Bottom 2 Centered Cards - forced responsive 2-column layout */}
          <section className="relative z-10 mx-auto mt-4 grid w-full max-w-none grid-cols-2 gap-1.5 xs:gap-2.5 sm:gap-5 pb-8 sm:mt-[clamp(8px,1.3vh,20px)] sm:max-w-[920px] lg:pb-[clamp(8px,1vh,20px)]">
            {localBottomCards.map((card) => (
              <ProgressCard key={card.title} card={card} large />
            ))}
          </section>
        </div>
      </section>
    </main>
  );
}