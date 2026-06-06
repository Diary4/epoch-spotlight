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
    <div className={`flex items-center gap-4 text-[#b99152] ${wide ? "w-[260px]" : "w-[120px]"}`}>
      <span className="h-0.5 flex-1 bg-[#b99152]" />
      <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
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
      <section className="relative mx-auto flex w-full max-w-[min(100vw,1400px)] flex-1 flex-col overflow-hidden rounded-[clamp(12px,1.5vw,28px)] bg-[#fbf5eb]">
        <button
          type="button"
          onClick={onBack}
          className="system-detail-back absolute left-[clamp(16px,2.5vw,40px)] top-[clamp(16px,2vh,36px)] z-30 grid h-[clamp(52px,7vw,72px)] w-[clamp(52px,7vw,72px)] place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm touch-manipulation"
          aria-label="Back to The System"
        >
          <ArrowLeft className="h-[clamp(22px,3vw,32px)] w-[clamp(22px,3vw,32px)]" />
        </button>
        <div className="absolute left-0 top-0 hidden h-full w-[clamp(64px,10vw,112px)] opacity-22 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px] sm:block" />

        {/* Mobile hero */}
        <div className="relative h-[min(38vh,300px)] min-h-[200px] w-full overflow-hidden sm:hidden">
          <img
            src={bg}
            alt=""
            className="h-full w-full object-cover object-center"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#fbf5eb] to-transparent" />
        </div>

        <div className="pointer-events-none absolute right-0 top-0 z-0 hidden h-[min(86vh,900px)] w-[min(70vw,880px)] max-w-[min(92vw,880px)] sm:block">
          <img
            src={bg}
            alt="Presidency building placeholder"
            className="system-detail-hero absolute inset-0 h-full w-full object-cover object-right [mask-image:radial-gradient(circle_at_62%_48%,black_0%,black_56%,transparent_84%)]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fbf5eb] via-[#fbf5eb]/20 to-transparent" />
          {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fbf5eb]" /> */}
        </div>

        <div className="pointer-events-none absolute left-0 right-0 top-[clamp(520px,48vh,800px)] z-[1] hidden h-[clamp(140px,16vh,800px)] sm:block">
          <img
            src={bg2}
            alt=""
            className="system-detail-hero h-full w-full object-cover [mask-image:linear-gradient(to_bottom,transparent_0%,black_35%,black_70%,transparent_100%)]"
          />
        </div>

        <div className="px-[clamp(18px,3.2vw,52px)] py-[clamp(14px,2vh,36px)] relative z-10 flex min-h-0 flex-1 flex-col gap-y-[clamp(28px,4vh,64px)]">
          <section className="system-detail-intro max-w-[min(92vw,720px)] break-words pt-0 sm:pt-[clamp(72px,10vh,120px)]">
            <h1 className="font-serif text-[clamp(3rem,9.5vw,5.75rem)] font-light leading-none tracking-tight text-[#943134]">
              {isAr ? "الرئاسة" : isKu ? "سەرۆکایەتی" : "Presidency"}
            </h1>

            <div className="mt-[clamp(24px,3vh,40px)]">
              <Divider wide />
            </div>

            <p className="mt-[clamp(24px,3vh,40px)] text-[clamp(1.25rem,2.8vw,2.1875rem)] font-light leading-[1.35] text-[#9b6d35]">
              {isAr ? "مؤسسة دستورية وطنية في المنظومة الإقليمية." : isKu ? "دامەزراوەیەکی دەستووری و نیشتمانی لەناو سیستەمی هەرێمیدا." : "A constitutional and national institution within the regional system."}
            </p>

            <div className="mt-[clamp(24px,3vh,40px)]">
              <Divider wide />
            </div>

            <p className="mt-[clamp(20px,2.6vh,36px)] max-w-[min(92vw,520px)] text-[clamp(1.125rem,2.1vw,1.8125rem)] font-light leading-[1.55] text-[#2d3549]">
              {isAr
                ? "تُسهم الرئاسة في الإطار الدستوري والحياة العامة والتوازن المؤسسي الأشمل لإقليم كوردستان."
                : isKu
                  ? "سەرۆکایەتی کۆڵەکەیەکی بنەڕەتییە لە چوارچێوەی دەستووری، ژیانی گشتی و پاراستنی هاوسەنگیی دامەزراوەیی لە هەرێمی کوردستان."
                : "The Presidency contributes to the constitutional framework, public life, and the broader institutional balance of the Kurdistan Region."}
            </p>
          </section>

          <section className="mt-8 grid grid-cols-1 gap-[clamp(16px,2.2vw,32px)] pb-[clamp(8px,1.5vh,16px)] sm:mt-[clamp(36px,24vh,400px)] sm:grid-cols-3">
            {localCards.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  className="system-detail-card relative flex min-h-[clamp(340px,38vh,560px)] flex-col items-center overflow-hidden rounded-[clamp(18px,2vw,28px)] border-2 border-[#ead8b7] bg-white/78 px-[clamp(16px,2.2vw,32px)] py-[clamp(20px,2.5vh,40px)] text-center shadow-[0_14px_35px_rgba(84,54,16,0.15)] backdrop-blur-md touch-manipulation"
                >
                  <div className="grid h-[clamp(100px,12vw,120px)] w-[clamp(100px,12vw,120px)] place-items-center rounded-full border-[6px] border-white bg-[#963538] text-[#f8e5b8] shadow-[0_8px_20px_rgba(0,0,0,0.16)] ring-2 ring-[#c58e65]">
                    <Icon className="h-[clamp(44px,5.5vw,62px)] w-[clamp(44px,5.5vw,62px)]" strokeWidth={1.45} />
                  </div>

                  <h3 className="mt-[clamp(20px,2.5vh,40px)] font-serif text-[clamp(1.25rem,2.2vw,2rem)] font-light leading-tight text-[#17233b]">
                    {card.title}
                  </h3>

                  <div className="my-[clamp(20px,2.5vh,32px)]">
                    <Divider />
                  </div>

                  <p className="text-[clamp(1.0625rem,1.75vw,1.4375rem)] font-medium leading-[1.45] text-[#35435b]">
                    {card.text}
                  </p>

                  <button
                    type="button"
                    className="mt-auto grid h-[clamp(52px,6.5vw,64px)] w-[clamp(52px,6.5vw,64px)] place-items-center rounded-full bg-[#963538] text-white shadow-md ring-4 ring-white touch-manipulation"
                  >
                    <ArrowRight className="h-[clamp(26px,3.5vw,36px)] w-[clamp(26px,3.5vw,36px)]" />
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
