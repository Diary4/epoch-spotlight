import React from "react";
import { ArrowLeft, ArrowRight, BookOpenCheck, Building2, Landmark, Scale, UsersRound } from "lucide-react";
import { useSystemDetailAnimation } from "@/components/Sections/TheSystem/useSystemDetailAnimation";
import bg from "@/assets/mainImages/presidency-1.webp"
import bg2 from "@/assets/mainImages/presidency-2.webp"

const cards = [
  {
    title: "Constitutional Role",
    text: "Supports the institutional framework of the Region.",
    icon: BookOpenCheck,
  },
  {
    title: "National Role",
    text: "Represents unity, continuity, and public dignity.",
    icon: UsersRound,
  },
  {
    title: "Institutional Balance",
    text: "Works within the wider governance system.",
    icon: Building2,
  },
];

function Divider({ wide = false }) {
  return (
    <div className={`flex items-center gap-1.5 sm:gap-4 text-[#b99152] ${wide ? "w-[120px] xs:w-[180px] sm:w-[260px]" : "w-12 xs:w-16 sm:w-[120px]"}`}>
      <span className="h-0.5 flex-1 bg-[#b99152]" />
      <span className="h-1.5 w-1.5 xs:h-2 xs:w-2 sm:h-3 sm:w-3 rotate-45 border border-[#b99152] sm:border-2" />
      <span className="h-0.5 flex-1 bg-[#b99152]" />
    </div>
  );
}

type PresidencyPageProps = {
  lang?: "ku" | "en" | "ar";
  onBack?: () => void;
};

export default function PresidencyPage({ lang = "en", onBack }: PresidencyPageProps) {
  const rootRef = useSystemDetailAnimation([lang]);
  const isAr = lang === "ar";
  const isKu = lang === "ku";
  const localCards = isAr
    ? [
        { title: "الدور الدستوري", text: "دعم الإطار المؤسسي للإقليم.", icon: BookOpenCheck },
        { title: "الدور الوطني", text: "تمثيل الوحدة والاستمرارية والكرامة الوطنية.", icon: UsersRound },
        { title: "التوازن المؤسسي", text: "العمل ضمن منظومة الحوكمة الأشمل.", icon: Building2 },
      ]
    : isKu
      ? [
          { title: "ڕۆڵی دەستووری", text: "پاڵپشتی چوارچێوەی دامەزراوەیی هەرێم دەکات.", icon: BookOpenCheck },
          { title: "ڕۆڵی نیشتمانی", text: "نوێنەرایەتی یەکڕیزی، بەردەوامی، و شکۆی گشتی دەکات.", icon: UsersRound },
          { title: "هاوسەنگی دامەزراوەیی", text: "لەناو سیستەمێكی حکومڕانی فراوانتردا کاردەکات.", icon: Building2 },
        ]
    : cards;

  return (
    <main ref={rootRef} className="m-0 flex min-h-[100dvh] w-full max-w-full flex-col overflow-x-hidden bg-[#f8f1e7] text-[#17233b] [padding-bottom:max(env(safe-area-inset-bottom),12px)]">
      <section className="relative mx-auto flex w-full max-w-[min(100vw,1400px)] flex-1 flex-col overflow-x-clip rounded-[clamp(12px,1.5vw,28px)] bg-[#fbf5eb]">
        
        {/* Responsive back button */}
        <button
          type="button"
          onClick={onBack}
          className="system-detail-back absolute left-3 top-3 z-30 grid h-10 w-10 place-items-center rounded-full border border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm sm:border-2 sm:left-6 sm:top-6 sm:h-12 sm:w-12 lg:left-8 lg:top-8 lg:h-14 lg:w-14"
          aria-label="Back to The System"
        >
          <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
        </button>
        <div className="absolute left-0 top-0 hidden h-full w-[clamp(64px,10vw,112px)] opacity-22 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px] sm:block" />

        {/* Blended background illustration — anchored to the top on every screen so
            there is no white gap above it, fading into the paper at the bottom. */}
        <div className="pointer-events-none absolute right-0 top-0 h-[min(86vh,900px)] w-full sm:w-[min(70vw,880px)] sm:max-w-[min(92vw,880px)] overflow-hidden z-0">
          <img
            src={bg}
            alt="Presidency building portrait placeholder"
            className="system-detail-hero absolute inset-0 h-full w-full object-cover object-right
                      [mask-image:linear-gradient(to_bottom,black_0%,black_72%,rgba(0,0,0,0.75)_82%,rgba(0,0,0,0.35)_92%,transparent_100%)]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fbf5eb] via-[#fbf5eb]/20 to-transparent" />
        </div>

        <div className="pointer-events-none absolute left-0 right-0 top-[clamp(520px,48vh,800px)] z-[1] hidden h-[clamp(140px,16vh,800px)] sm:block">
          <img
            src={bg2}
            alt=""
            className="system-detail-hero h-full w-full object-cover [mask-image:linear-gradient(to_bottom,transparent_0%,black_35%,black_70%,transparent_100%)]"
          />
        </div>

        {/* Tighter padding px-3 on mobile to maximize card grid width */}
        <div className="px-3 xs:px-[clamp(18px,3.2vw,52px)] py-[clamp(14px,2vh,36px)] relative z-10 flex min-h-0 flex-1 flex-col gap-y-[clamp(28px,4vh,64px)]">
          <section className="system-detail-intro max-w-[min(92vw,720px)] break-words pt-12 sm:pt-[clamp(72px,10vh,120px)]">
            <h1 className="font-serif text-[clamp(3rem,9.5vw,5.75rem)] font-light leading-none tracking-tight text-[#943134]">
              {isAr ? "الرئاسة" : isKu ? "سەرۆکایەتی" : "Presidency"}
            </h1>

            <div className="mt-[clamp(16px,3vh,40px)]">
              <Divider wide />
            </div>

            <p className="mt-[clamp(16px,3vh,40px)] text-[clamp(1.25rem,2.8vw,2.1875rem)] font-light leading-[1.35] text-[#9b6d35]">
              {isAr ? "مؤسسة دستورية وطنية في المنظومة الإقليمية." : isKu ? "دامەزراوەیەکی دەستووری و نیشتمانی لەناو سیستەمی هەرێمیدا." : "A constitutional and national institution within the regional system."}
            </p>

            <div className="mt-[clamp(16px,3vh,40px)]">
              <Divider wide />
            </div>

            <p className="mt-[clamp(16px,2.6vh,36px)] max-w-[min(92vw,520px)] text-[clamp(1.125rem,2.1vw,1.8125rem)] font-light leading-[1.55] text-[#2d3549]">
              {isAr
                ? "تُسهم الرئاسة في الإطار الدستوري والحياة العامة والتوازن المؤسسي الأشمل لإقليم كوردستان."
                : isKu
                  ? "سەرۆکایەتی کۆڵەکەیەکی بنەڕەتییە لە چوارچێوەی دەستووری، ژیانی گشتی و پاراستنی هاوسەنگیی دامەزراوەیی لە هەرێمی کوردستان."
                : "The Presidency contributes to the constitutional framework, public life, and the broader institutional balance of the Kurdistan Region."}
            </p>
          </section>

          {/* Cards section - mt-12 (xs:mt-16) pushes cards below header safely on mobile viewports */}
          <section className="relative z-10 mt-[200px] sm:mt-[500px] grid grid-cols-3 gap-1.5 xs:gap-2.5 sm:gap-5 pb-4 pt-4 lg:gap-6 lg:pb-8 lg:pt-10">
            {localCards.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  className="system-detail-card relative flex min-h-[140px] xs:min-h-[180px] sm:min-h-[420px] lg:min-h-[560px] flex-col items-center overflow-hidden rounded-[12px] border border-[#ead8b7] bg-white/78 px-1.5 py-4 xs:px-3 xs:py-5 sm:border-2 sm:rounded-[20px] sm:px-[clamp(16px,2.2vw,32px)] sm:py-[clamp(20px,2.5vh,40px)] text-center shadow-[0_4px_12px_rgba(84,54,16,0.1)] sm:shadow-[0_14px_35px_rgba(84,54,16,0.15)] backdrop-blur-md touch-manipulation"
                >
                  <div className="grid h-10 w-10 xs:h-12 xs:w-12 sm:h-[clamp(100px,12vw,120px)] sm:w-[clamp(100px,12vw,120px)] place-items-center rounded-full border-2 xs:border-4 sm:border-[6px] border-white bg-[#963538] text-[#f8e5b8] shadow-[0_8px_20px_rgba(0,0,0,0.16)] ring-1 ring-[#c58e65] sm:ring-2">
                    <Icon className="h-5 w-5 xs:h-6 xs:w-6 sm:h-[clamp(44px,5.5vw,62px)] sm:w-[clamp(44px,5.5vw,62px)]" strokeWidth={1.45} />
                  </div>

                  <h3 className="mt-2.5 xs:mt-4 sm:mt-[clamp(20px,2.5vh,40px)] font-serif text-[9px] xs:text-[11px] sm:text-[24px] lg:text-[34px] font-light leading-tight text-[#17233b]">
                    {card.title}
                  </h3>

                  <div className="my-1.5 xs:my-3 sm:my-[clamp(20px,2.5vh,32px)]">
                    <Divider />
                  </div>

                  <p className="text-[8px] xs:text-[9.5px] sm:text-[15px] lg:text-[20px] font-medium leading-[1.45] text-[#35435b]">
                    {card.text}
                  </p>

                  <button
                    type="button"
                    className="mt-auto grid h-7 w-7 xs:h-9 xs:w-9 sm:h-[clamp(52px,6.5vw,64px)] sm:w-[clamp(52px,6.5vw,64px)] place-items-center rounded-full bg-[#963538] text-white shadow-md ring-1 ring-white sm:ring-4 touch-manipulation"
                  >
                    <ArrowRight className="h-3.5 w-3.5 xs:h-4.5 xs:w-4.5 sm:h-[clamp(26px,3.5vw,36px)] sm:w-[clamp(26px,3.5vw,36px)]" />
                  </button>

                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 opacity-22 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:18px_18px]" />
                </article>
              );
            })}
          </section>
        </div>
      </section>
    </main>
  );
}