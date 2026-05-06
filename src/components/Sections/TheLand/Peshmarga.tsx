import React from "react";
import { ArrowLeft, ArrowRight, Bird, Shield, ShieldCheck, UsersRound } from "lucide-react";
import bg from "@/assets/mainImages/peshmarga.png"

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
    <main className="m-0 min-h-[100vh] w-[100vw] max-w-none bg-[#f8f1e7] text-[#17233b]">
      <section className="relative mx-auto flex min-h-[calc(100vh-clamp(16px,2.6vh,32px))] w-[min(100vw,1400px)] max-w-none flex-col overflow-hidden rounded-[clamp(22px,2.4vw,34px)] bg-[#fbf5eb]">
        <button
          type="button"
          onClick={onBack}
          className="absolute left-[clamp(16px,2vw,30px)] top-[clamp(16px,2vh,30px)] z-30 grid h-[clamp(50px,4.8vw,64px)] w-[clamp(50px,4.8vw,64px)] place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm"
          aria-label="Back to The Land and Future"
        >
          <ArrowLeft size={30} />
        </button>
        <div className="absolute left-0 top-0 h-full w-28 opacity-22 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

        {/* Replace this with your generated Peshmerga background image */}
        <div className="pointer-events-none absolute right-0 top-0 h-[min(92vh,1100px)] w-full min-w-[760px]">
          <img
            src={bg}
            alt="Peshmerga landscape placeholder"
            className="absolute inset-0 h-full w-full object-cover opacity-78 [mask-image:linear-gradient(to_bottom,black_0%,black_72%,transparent_100%)]"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-r from-[#fbf5eb] via-[#fbf5eb]/22 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[clamp(170px,20vh,300px)] bg-gradient-to-b from-transparent to-[#fbf5eb]" /> */}
        </div>

        <div className="px-[clamp(18px,3.2vw,52px)] py-[clamp(14px,2vh,36px)] relative z-10 flex flex-1 flex-col">
          {/* Hero */}
          <section className="max-w-[min(58vw,760px)] pt-[clamp(72px,9.5vh,136px)]">
            <h1 className="font-serif text-[clamp(66px,8.2vw,120px)] font-semibold leading-none tracking-tight text-[#17233b]">
              {isAr ? "البيشمركة" : isKu ? "پێشمەرگە" : "Peshmerga"}
            </h1>

            <p className="mt-[clamp(20px,2.9vh,38px)] text-[clamp(28px,3.25vw,48px)] font-bold leading-tight text-[#9b6d35]">
              {isAr ? "رمز الشجاعة والحماية والخدمة." : isKu ? "هێمای ئازایەتی، پاراستن، و خزمەت." : "A symbol of courage, protection, and service."}
            </p>

            <div className="mt-[clamp(18px,2.8vh,36px)] w-[clamp(160px,16vw,260px)]">
              <Divider />
            </div>

            <p className="mt-[clamp(18px,2.8vh,38px)] max-w-[min(48vw,680px)] text-[clamp(20px,2.3vw,34px)] font-medium leading-[1.58] text-[#2d3549]">
              {isAr
                ? "أدّى البيشمركة دورًا بالغ الأهمية في الدفاع عن إقليم كوردستان وحماية المدنيين."
                : isKu
                  ? "پێشمەرگە ڕۆڵێکی گرنگیان هەبووە لە بەرگریکردن لە هەرێمی کوردستان و پاراستنی مەدەنییەکان."
                : "The Peshmerga have played an important role in defending the Kurdistan Region and protecting civilians."}
            </p>
          </section>

          {/* Cards */}
          <section className="mt-[clamp(120px,18vh,450px)] grid grid-cols-3 gap-[clamp(16px,1.8vw,34px)] pb-[clamp(8px,1vh,22px)] pt-[clamp(20px,3vh,44px)]">
            {localCards.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  className="relative flex min-h-[clamp(350px,31vh,520px)] flex-col items-center overflow-hidden rounded-[clamp(22px,2.3vw,34px)] border-2 border-[#ead8b7] bg-white/82 px-[clamp(16px,1.8vw,34px)] py-[clamp(18px,2.2vh,38px)] text-center shadow-[0_14px_35px_rgba(84,54,16,0.16)] backdrop-blur-md"
                >
                  <div
                    className="grid h-[clamp(82px,7.3vw,124px)] w-[clamp(82px,7.3vw,124px)] place-items-center rounded-full border-[6px] border-white text-[#f8e5b8] shadow-[0_8px_20px_rgba(0,0,0,0.16)] ring-2 ring-[#e1c496]"
                    style={{ backgroundColor: card.color }}
                  >
                    <Icon size={58} strokeWidth={1.45} />
                  </div>

                  <h3 className="mt-[clamp(16px,2vh,32px)] whitespace-pre-line font-serif text-[clamp(25px,2.45vw,38px)] font-semibold leading-[1.02]" style={{ color: card.color }}>
                    {card.title}
                  </h3>

                  <div className="my-[clamp(12px,1.8vh,30px)] w-[clamp(90px,8.5vw,140px)]">
                    <Divider />
                  </div>

                  <p className="text-[clamp(18px,1.8vw,28px)] font-medium leading-[1.45] text-[#35435b]">
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
            })}
          </section>
        </div>
      </section>
    </main>
  );
}
