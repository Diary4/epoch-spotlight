import React from "react";
import { ArrowLeft, ArrowRight, Bird, Shield, ShieldCheck, UsersRound } from "lucide-react";
import { useLandDetailAnimation } from "@/components/Sections/TheLand/useLandDetailAnimation";
import bg from "@/assets/mainImages/peshmarga.webp"

const cards = [
  {
    title: "Defending\nthe Region",
    text: "Standing in defense of Kurdistan and its people.",
    icon: Shield,
    color: "#963538",
  },
  {
    title: "Protecting\nCivilians",
    text: "Supporting safety during times of crisis.",
    icon: UsersRound,
    color: "#405846",
  },
  {
    title: "Standing Against\nTerrorism",
    text: "Playing an important role against extremism.",
    icon: Bird,
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

type PeshmergaPageProps = {
  lang?: "ku" | "en" | "ar";
  onBack?: () => void;
};

export default function PeshmergaPage({ lang = "en", onBack }: PeshmergaPageProps) {
  const rootRef = useLandDetailAnimation([lang]);
  const isAr = lang === "ar";
  const isKu = lang === "ku";
  const localCards = isAr
    ? [
        { title: "الدفاع عن\nالإقليم", text: "الوقوف في وجه كل من يهدد كوردستان وشعبها.", icon: Shield, color: "#963538" },
        { title: "حماية\nالمدنيين", text: "تأمين السلامة في أوقات الأزمات.", icon: UsersRound, color: "#405846" },
        { title: "التصدي للإرهاب", text: "أداء دور محوري في مواجهة التطرف.", icon: Bird, color: "#13213b" },
      ]
    : isKu
      ? [
          { title: "بەرگریکردن لە هەرێم", text: "وەستان بۆ بەرگری لە کوردستان و گەلەکەی.", icon: Shield, color: "#963538" },
          { title: "پاراستنی مەدەنییەکان", text: "پاڵپشتیکردنی ئاسایش لە کاتی قەیرانەکاندا.", icon: UsersRound, color: "#405846" },
          { title: "وەستانەوە دژی تیرۆر", text: "گێڕانی ڕۆڵێکی سەرەکی لە ڕووبەڕووبوونەوەی توندڕەویدا.", icon: Bird, color: "#13213b" },
        ]
      : cards;
  return (
    <main ref={rootRef} className="m-0 min-h-[100dvh] w-full max-w-[100vw] overflow-x-hidden bg-[#f8f1e7] text-[#17233b]">
      <section className="relative mx-auto flex min-h-0 w-full max-w-[1400px] flex-col overflow-x-hidden overflow-y-auto rounded-[22px] bg-[#fbf5eb] sm:rounded-[28px] lg:min-h-[calc(100vh-clamp(16px,2.6vh,32px))] lg:overflow-hidden lg:rounded-[clamp(22px,2.4vw,34px)]">
        <button
          type="button"
          onClick={onBack}
          className="land-detail-back absolute left-4 top-4 z-30 grid h-12 w-12 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm sm:left-6 sm:top-6 sm:h-14 sm:w-14 lg:left-[clamp(16px,2vw,30px)] lg:top-[clamp(16px,2vh,30px)] lg:h-[clamp(50px,4.8vw,64px)] lg:w-[clamp(50px,4.8vw,64px)]"
          aria-label="Back to The Land and Future"
        >
          <ArrowLeft className="h-6 w-6 sm:h-7 sm:w-7 lg:h-[30px] lg:w-[30px]" />
        </button>
        <div className="pointer-events-none absolute left-0 top-0 hidden h-full w-28 opacity-22 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px] sm:block" />

        {/* Peshmerga background */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[min(48vh,400px)] w-full min-w-0 sm:h-[min(62vh,640px)] lg:absolute lg:inset-x-auto lg:right-0 lg:h-[min(92vh,1100px)] lg:min-w-[760px]">
          <img
            src={bg}
            alt="Peshmerga landscape placeholder"
            className="land-detail-hero absolute inset-0 h-full w-full object-cover object-[center_top] opacity-60 [mask-image:linear-gradient(to_bottom,black_0%,black_72%,transparent_100%)] sm:object-right sm:opacity-78"
          />
        </div>

        <div className="relative z-10 flex flex-1 flex-col px-4 py-4 sm:px-6 sm:py-6 lg:px-[clamp(18px,3.2vw,52px)] lg:py-[clamp(14px,2vh,36px)]">
          {/* Hero */}
          <section className="land-detail-intro w-full max-w-none pt-20 sm:pt-24 sm:max-w-[min(85vw,760px)] lg:max-w-[min(58vw,760px)] lg:pt-[clamp(72px,9.5vh,136px)]">
            <h1 className="font-serif text-[clamp(44px,12vw,120px)] font-light leading-none tracking-tight text-[#17233b]">
              {isAr ? "البيشمركة" : isKu ? "پێشمەرگە" : "Peshmerga"}
            </h1>

            <p className="mt-5 text-[clamp(22px,5vw,48px)] font-light leading-tight text-[#9b6d35] sm:mt-[clamp(20px,2.9vh,38px)]">
              {isAr ? "رمز الشجاعة والحماية والخدمة." : isKu ? "هێمای ئازایەتی، پاراستن، و خزمەت." : "A symbol of courage, protection, and service."}
            </p>

            <div className="mt-5 w-[clamp(140px,40vw,260px)] sm:mt-[clamp(18px,2.8vh,36px)]">
              <Divider />
            </div>

            <p className="mt-5 max-w-none text-[clamp(15px,4vw,34px)] font-light leading-[1.58] text-[#2d3549] sm:mt-[clamp(18px,2.8vh,38px)] lg:max-w-[min(48vw,680px)]">
              {isAr
                ? "أدّى البيشمركة دورًا بالغ الأهمية في الدفاع عن إقليم كوردستان وحماية المدنيين."
                : isKu
                  ? "پێشمەرگە ڕۆڵێکی گرنگیان هەبووە لە بەرگریکردن لە هەرێمی کوردستان و پاراستنی مەدەنییەکان."
                  : "The Peshmerga have played an important role in defending the Kurdistan Region and protecting civilians."}
            </p>
          </section>

          {/* Cards */}
          <section className="mt-8 grid grid-cols-1 gap-4 pb-8 pt-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 sm:pb-10 sm:pt-6 lg:mt-[clamp(120px,18vh,450px)] lg:grid-cols-3 lg:gap-[clamp(16px,1.8vw,34px)] lg:pb-[clamp(8px,1vh,22px)] lg:pt-[clamp(20px,3vh,44px)]">
            {localCards.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  className="land-detail-card relative flex min-h-[280px] flex-col items-center overflow-hidden rounded-[20px] border-2 border-[#ead8b7] bg-white/82 px-5 py-6 text-center shadow-[0_14px_35px_rgba(84,54,16,0.16)] backdrop-blur-md sm:min-h-[320px] sm:rounded-[24px] sm:px-6 sm:py-7 lg:min-h-[clamp(350px,31vh,520px)] lg:rounded-[clamp(22px,2.3vw,34px)] lg:px-[clamp(16px,1.8vw,34px)] lg:py-[clamp(18px,2.2vh,38px)]"
                >
                  <div
                    className="grid h-16 w-16 place-items-center rounded-full border-[5px] border-white text-[#f8e5b8] shadow-[0_8px_20px_rgba(0,0,0,0.16)] ring-2 ring-[#e1c496] sm:h-[clamp(72px,7.3vw,124px)] sm:w-[clamp(72px,7.3vw,124px)] sm:border-[6px]"
                    style={{ backgroundColor: card.color }}
                  >
                    <Icon className="h-9 w-9 sm:h-12 sm:w-12 lg:h-14 lg:w-14" strokeWidth={1.45} />
                  </div>

                  <h3 className="mt-4 whitespace-pre-line font-serif text-[clamp(20px,4.5vw,38px)] font-light leading-[1.08] sm:mt-[clamp(16px,2vh,32px)] sm:leading-[1.02]" style={{ color: card.color }}>
                    {card.title}
                  </h3>

                  <div className="my-4 w-[clamp(80px,22vw,140px)] sm:my-[clamp(12px,1.8vh,30px)]">
                    <Divider />
                  </div>

                  <p className="text-[clamp(15px,3.8vw,28px)] font-light leading-[1.45] text-[#35435b]">
                    {card.text}
                  </p>

                  <button
                    type="button"
                    className="mt-5 grid h-12 w-12 place-items-center rounded-full text-white shadow-md ring-4 ring-white sm:mt-auto sm:h-[clamp(52px,5vw,78px)] sm:w-[clamp(52px,5vw,78px)]"
                    style={{ backgroundColor: card.color }}
                  >
                    <ArrowRight className="h-6 w-6 sm:h-8 sm:w-8" />
                  </button>

                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[clamp(48px,5vh,90px)] opacity-22 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:18px_18px]" />
                </article>
              );
            })}
          </section>
        </div>
      </section>
    </main>
  );
}
