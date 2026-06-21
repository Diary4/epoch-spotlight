import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, Bird, Shield, UsersRound } from "lucide-react";
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
  const dir = lang === "en" ? "ltr" : "rtl";
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
      className="relative h-screen w-screen overflow-hidden bg-[#f8f1e7]"
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
              className="land-detail-back absolute left-[clamp(1rem,2cqw,2rem)] top-[clamp(1rem,2cqh,2rem)] z-30 grid h-[clamp(2.8rem,4.4cqw,3.8rem)] w-[clamp(2.8rem,4.4cqw,3.8rem)] place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm rtl:left-auto rtl:right-[clamp(1rem,2cqw,2rem)]"
              aria-label="Back to The Land and Future"
            >
              <ArrowLeft size={32} className="rtl:rotate-180" />
            </button>

            <div className="absolute left-0 top-[120px] h-full w-24 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />
            <div className="absolute right-0 top-[120px] h-full w-24 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

            {/* Main portrait — top-right, fading into the paper */}
            <div className="land-detail-hero pointer-events-none absolute right-0 top-0 z-0 h-[940px] w-full overflow-hidden rtl:right-auto rtl:left-0">
              <div className={`absolute inset-0 ${dir === "rtl" ? "-scale-x-100" : ""}`}>
                <img
                  src={bg}
                  alt="Peshmerga portrait"
                  className="absolute inset-0 h-full w-full object-cover object-right opacity-[0.82] [mask-image:linear-gradient(to_bottom,black_0%,black_72%,rgba(0,0,0,0.75)_82%,rgba(0,0,0,0.35)_92%,transparent_100%)]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#fbf5eb] via-[#fbf5eb]/25 to-transparent rtl:bg-gradient-to-l" />
            </div>

            <div className="relative z-10 flex h-[940px] min-h-0 flex-col px-[clamp(1.4rem,4cqw,4rem)] pt-[clamp(1.2rem,4cqh,3.5rem)] pb-[clamp(1.2rem,3cqh,2.6rem)]">
              <section className="land-detail-intro max-w-[min(46cqw,720px)]">
                <h1 className="font-serif text-[clamp(6rem,11cqw,10rem)] font-light leading-none tracking-tight text-[#17233b]">
                  {isAr ? "البيشمركة" : isKu ? "پێشمەرگە" : "Peshmerga"}
                </h1>

                <p className="mt-[clamp(1rem,2.2cqh,2rem)] text-[clamp(1.65rem,2.75cqw,2.7rem)] font-light leading-tight text-[#9b6d35]">
                  {isAr ? "رمز الشجاعة والحماية والخدمة." : isKu ? "هێمای ئازایەتی، پاراستن، و خزمەت." : "A symbol of courage, protection, and service."}
                </p>

                <div className="mt-[clamp(1rem,2.3cqh,2rem)] w-[clamp(9rem,18cqw,14.5rem)]">
                  <Divider />
                </div>

                <p className="mt-[clamp(1rem,2.4cqh,2rem)] max-w-[min(38cqw,590px)] text-[clamp(1.2rem,2cqw,1.95rem)] font-light leading-[1.55] text-[#2d3549]">
                  {isAr
                    ? "أدّى البيشمركة دورًا بالغ الأهمية في الدفاع عن إقليم كوردستان وحماية المدنيين."
                    : isKu
                      ? "پێشمەرگە ڕۆڵێکی گرنگیان هەبووە لە بەرگریکردن لە هەرێمی کوردستان و پاراستنی مەدەنییەکان."
                      : "The Peshmerga have played an important role in defending the Kurdistan Region and protecting civilians."}
                </p>
              </section>
            </div>

            <div className="relative z-10 px-[clamp(1.4rem,4cqw,4rem)] pb-[clamp(1.2rem,3cqh,2.6rem)]">
              <section className="grid grid-cols-3 gap-[clamp(0.85rem,1.8cqw,2.1rem)]">
                {localCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <article
                      key={card.title}
                      className="land-detail-card relative flex min-h-[clamp(27rem,44cqh,40rem)] flex-col items-center overflow-hidden rounded-[26px] border-2 border-[#ead8b7] bg-white/82 px-[clamp(0.95rem,1.9cqw,2rem)] py-[clamp(1rem,2.2cqh,2rem)] text-center shadow-[0_14px_35px_rgba(84,54,16,0.16)] backdrop-blur-md"
                    >
                      <div
                        className="grid h-[clamp(4.1rem,7.5cqw,7.2rem)] w-[clamp(4.1rem,7.5cqw,7.2rem)] place-items-center rounded-full border-[6px] border-white text-[#f8e5b8] shadow-[0_8px_20px_rgba(0,0,0,0.16)] ring-2 ring-[#e1c496]"
                        style={{ backgroundColor: card.color }}
                      >
                        <Icon className="h-[clamp(2rem,3.5cqw,3.5rem)] w-[clamp(2rem,3.5cqw,3.5rem)]" strokeWidth={1.45} />
                      </div>

                      <h3
                        className="mt-[clamp(0.8rem,1.8cqh,1.9rem)] whitespace-pre-line font-serif text-[clamp(1.5rem,2.7cqw,2.5rem)] font-light leading-[1.02]"
                        style={{ color: card.color }}
                      >
                        {card.title}
                      </h3>

                      <div className="my-[clamp(0.75rem,1.6cqh,1.7rem)] w-[clamp(4.8rem,10cqw,8rem)]">
                        <Divider />
                      </div>

                      <p className="text-[clamp(1.02rem,1.58cqw,1.5rem)] font-light leading-[1.45] text-[#35435b]">
                        {card.text}
                      </p>

                      <button
                        type="button"
                        className="mt-auto grid h-[clamp(3rem,5cqw,4.8rem)] w-[clamp(3rem,5cqw,4.8rem)] place-items-center rounded-full text-white shadow-md ring-4 ring-white"
                        style={{ backgroundColor: card.color }}
                      >
                        <ArrowRight className="h-[clamp(1.5rem,2.5cqw,2rem)] w-[clamp(1.5rem,2.5cqw,2rem)] rtl:rotate-180" />
                      </button>

                      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 opacity-22 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:18px_18px]" />
                    </article>
                  );
                })}
              </section>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
