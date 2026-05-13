import React, { useLayoutEffect, useRef } from "react";
import { ArrowLeft, KeyRound, Sparkles, TreePine } from "lucide-react";
import { gsap } from "gsap";
import bgImage from "@/assets/mainImages/whoarekurds.webp";
import en from "@/data/en.json";
import ar from "@/data/ar.json";
import ku from "@/data/ku.json";

const infoCards = [
  {
    title: "Ancient Roots",
    text: "The Kurds are among the ancient peoples of the Middle East, with a long and rich historical presence in the region.",
    icon: TreePine,
    color: "bg-[#00604f]",
  },
  {
    title: "Culture and Values",
    text: "Kurdish society is widely associated with courage, hospitality, family bonds, and a strong love of freedom and culture.",
    icon: Sparkles,
    color: "bg-[#c9903f]",
  },
  {
    title: "A Living Identity",
    text: "Today, Kurdish identity continues through language, music, traditions, literature, and everyday life across generations.",
    icon: KeyRound,
    color: "bg-[#00604f]",
  },
];

type WhoAreTheKurdsSectionProps = {
  lang?: "ku" | "en" | "ar";
  onBack?: () => void;
};

const CONTENT = { en, ar, ku } as const;

export default function WhoAreTheKurdsSection({ lang = "en", onBack }: WhoAreTheKurdsSectionProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const data = CONTENT[lang] as any;
  const detail = data?.people?.detailPages?.whoAreTheKurds ?? {};
  
  const localizedCards = infoCards.map((card, i) => ({
    ...card,
    title: detail?.cards?.[i]?.title ?? card.title,
    text: detail?.cards?.[i]?.description ?? card.text,
  }));

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".back-btn", { opacity: 0, scale: 0.7, duration: 1 })
        .from(".hero-image", { 
          opacity: 0, 
          x: 120, 
          scale: 1.05, 
          duration: 2.5 
        }, "-=0.5")
        .from(".stagger-text", { 
          opacity: 0, 
          y: 60, 
          stagger: 0.2, 
          duration: 1.5 
        }, "-=1.8")
        .from(".info-card", { 
          opacity: 0, 
          y: 100, 
          stagger: 0.2, 
          duration: 1.2 
        }, "-=1");

      // Soft breathing animation for the hero image
      gsap.to(".hero-image", {
        y: -15,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <main 
      ref={rootRef} 
      className="m-0 min-h-screen w-full bg-[#fbf3e8] overflow-x-hidden select-none"
    >
      <section className="relative mx-auto min-h-screen w-full max-w-[1800px] px-[6vw] py-12 flex flex-col">
        
        {/* Navigation Button */}
        <button
          onClick={onBack}
          className="back-btn absolute left-8 top-8 z-50 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#d9b477] bg-white/60 text-[#00604f] shadow-lg backdrop-blur-md transition-all hover:bg-white"
        >
          <ArrowLeft size={32} />
        </button>

        {/* --- BACKGROUND ARTWORK (Right Side) --- */}
        <div className="hero-image pointer-events-none absolute right-0 top-0 h-[110vh] w-[70%] z-0">
          <img
            src={bgImage}
            alt="Kurdish Visual"
            className="h-full w-full object-contain object-right-top opacity-100"
            style={{
              maskImage: 'linear-gradient(to left, black 50%, transparent 95%), linear-gradient(to bottom, black 80%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to left, black 50%, transparent 95%), linear-gradient(to bottom, black 80%, transparent 100%)'
            }}
          />
          {/* Subtle overlay to help text readability if image is too dark */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#fbf3e8] via-[#fbf3e8]/10 to-transparent" />
        </div>

        {/* --- MAIN CONTENT (Left Side) --- */}
        <div className="relative z-10 mt-20 flex flex-col items-start max-w-[900px]">
          
          {/* Label: THE PEOPLE */}
          <div className="stagger-text flex items-center gap-4 mb-12">
            <div className="flex items-center">
              <span className="w-12 h-[2px] bg-[#c9903f]" />
              <div className="w-4 h-4 border-2 border-[#c9903f] rotate-45 ml-[-2px]" />
            </div>
            <h2 className="font-serif text-2xl font-bold uppercase tracking-[0.2em] text-[#c9903f]">
              {detail?.sectionLabel ?? "The People"}
            </h2>
          </div>

          {/* Massive Title: Structured as requested */}
          <h1 className="stagger-text font-serif text-[clamp(80px,9vw,160px)] font-bold leading-[0.85] text-[#00604f] tracking-tighter">
            Who Are <br /> 
            the Kurds?
          </h1>

          {/* Elegant Divider */}
          <div className="stagger-text my-12 flex items-center gap-6">
            <span className="h-[2px] w-32 bg-[#d9b477]" />
            <div className="p-2 border border-[#d9b477] rounded-full">
               <Sparkles size={24} className="text-[#c9903f]" />
            </div>
            <span className="h-[2px] w-16 bg-[#d9b477]" />
          </div>

          {/* Subtitle: High contrast font size */}
          <h2 className="stagger-text font-serif text-[clamp(32px,3.5vw,68px)] leading-[1.1] text-[#00604f] mb-10 max-w-[700px]">
            An ancient people of <br /> 
            the Middle East.
          </h2>

          {/* Body Text */}
          <p className="stagger-text max-w-[550px] text-[clamp(20px,1.6vw,30px)] leading-relaxed text-[#31445d] font-medium italic opacity-80">
            {detail?.description ?? "The Kurds have lived in these mountains and plains for thousands of years, shaping the region with their strength, spirit, and culture."}
          </p>
        </div>
       {/* Cards */}
       <section className="relative z-20 mt-[clamp(26px,5.5vh,84px)] grid grid-cols-3 gap-[clamp(16px,1.7vw,34px)] pb-[clamp(6px,1vh,20px)] pt-[clamp(24px,3.2vh,52px)]">
        {localizedCards.map((card) => {
          const Icon = card.icon;
          return (
            <article
              key={card.title}
              className="info-card flex min-h-[clamp(360px,32vh,540px)] flex-col items-center rounded-[clamp(22px,2.3vw,34px)] border-2 border-white bg-white/78 px-[clamp(18px,1.8vw,34px)] py-[clamp(20px,2.2vh,36px)] text-center shadow-[0_14px_35px_rgba(84,54,16,0.16)] backdrop-blur-md"
            >
              <div className={`grid h-[clamp(78px,7.2vw,120px)] w-[clamp(78px,7.2vw,120px)] place-items-center rounded-full ${card.color} text-[#f8dfae] shadow-[0_8px_22px_rgba(84,54,16,0.2)]`}>
                <Icon size={56} strokeWidth={1.45} />
              </div>
              <div className="my-[clamp(16px,1.8vh,28px)] flex w-[clamp(82px,8vw,130px)] items-center justify-center gap-3 text-[#c9903f]">
                <span className="h-0.5 flex-1 bg-[#d7b56c]" />
                <span className="h-3 w-3 rotate-45 border border-[#c9903f]" />
                <span className="h-0.5 flex-1 bg-[#d7b56c]" />
              </div>
              <h3 className="font-serif text-[clamp(24px,2.35vw,36px)] font-semibold leading-tight text-[#00604f]">
                {card.title}
              </h3>
              <p className="mt-[clamp(14px,1.8vh,26px)] flex-1 text-[clamp(18px,1.8vw,28px)] font-semibold leading-[1.55] text-[#31445d]">
                {card.text}
              </p>
            </article>
          );
        })}
        </section>
      </section>
    </main>
  );
}