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

  const titleLines = (detail?.title ?? "Who Are\nthe Kurds?").split("\n");
  const subtitleLines = (detail?.subtitle ?? "An ancient people of\nthe Middle East.").split("\n");
  const isRtl = lang === "ar" || lang === "ku";

  return (
    <main ref={rootRef} className="m-0 min-h-[100dvh] w-full max-w-[100vw] overflow-x-hidden bg-[#fbf3e8] select-none">
      <section className="relative mx-auto flex min-h-0 w-full max-w-[1800px] flex-col overflow-x-hidden overflow-y-auto px-4 py-6 sm:px-6 sm:py-8 lg:min-h-screen lg:overflow-hidden lg:px-[6vw] lg:py-12">
        <button
          type="button"
          onClick={onBack}
          className="back-btn absolute left-4 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#d9b477] bg-white/60 text-[#00604f] shadow-lg backdrop-blur-md transition-all hover:bg-white sm:left-6 sm:top-6 sm:h-14 sm:w-14 lg:left-8 lg:top-8 lg:h-16 lg:w-16"
          aria-label="Back to The People"
        >
          <ArrowLeft className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
        </button>

        <div className="hero-image pointer-events-none absolute inset-x-0 top-0 z-0 h-[min(42vh,360px)] w-full sm:inset-x-auto sm:right-0 sm:h-[min(58vh,520px)] sm:w-[78%] lg:h-[110vh] lg:w-[70%]">
          <img
            src={bgImage}
            alt="Kurdish Visual"
            className="h-full w-full object-contain object-[center_top] opacity-90 sm:object-right-top"
            style={{
              maskImage:
                "linear-gradient(to left, black 50%, transparent 95%), linear-gradient(to bottom, black 80%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to left, black 50%, transparent 95%), linear-gradient(to bottom, black 80%, transparent 100%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fbf3e8] via-[#fbf3e8]/50 to-transparent sm:via-[#fbf3e8]/10" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#fbf3e8] to-transparent sm:hidden" />
        </div>

        <div
          dir={isRtl ? "rtl" : "ltr"}
          className="relative z-10 mt-16 flex w-full min-w-0 max-w-none flex-col items-start sm:mt-20 lg:mt-20 lg:max-w-[900px]"
        >
          <div className="stagger-text mb-8 flex items-center gap-3 sm:mb-12 sm:gap-4">
            <div className="flex items-center">
              <span className="h-[2px] w-8 bg-[#c9903f] sm:w-12" />
              <div className="ml-[-2px] h-3 w-3 rotate-45 border-2 border-[#c9903f] sm:h-4 sm:w-4" />
            </div>
            <h2 className="font-serif text-lg font-light uppercase tracking-[0.15em] text-[#c9903f] sm:text-2xl sm:tracking-[0.2em]">
              {detail?.sectionLabel ?? "The People"}
            </h2>
          </div>

          <h1 className="stagger-text font-serif text-[clamp(44px,11vw,160px)] font-light leading-[0.9] tracking-tighter text-[#00604f] sm:leading-[0.85]">
            {titleLines.map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < titleLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>

          <div className="stagger-text my-8 flex items-center gap-4 sm:my-12 sm:gap-6">
            <span className="h-[2px] w-20 bg-[#d9b477] sm:w-32" />
            <div className="rounded-full border border-[#d9b477] p-1.5 sm:p-2">
              <Sparkles className="h-5 w-5 text-[#c9903f] sm:h-6 sm:w-6" />
            </div>
            <span className="h-[2px] w-10 bg-[#d9b477] sm:w-16" />
          </div>

          <h2 className="stagger-text mb-6 max-w-none font-serif text-[clamp(24px,5.5vw,68px)] leading-[1.1] text-[#00604f] sm:mb-10 lg:max-w-[700px]">
            {subtitleLines.map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < subtitleLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>

          <p className="stagger-text max-w-none text-[clamp(16px,4vw,30px)] font-light leading-relaxed text-[#31445d] opacity-80 sm:max-w-[550px]">
            {detail?.description ??
              "The Kurds have lived in these mountains and plains for thousands of years, shaping the region with their strength, spirit, and culture."}
          </p>
        </div>

        <section className="relative z-20 mt-8 grid w-full grid-cols-1 items-stretch gap-4 pb-8 pt-4 sm:mt-12 sm:gap-5 sm:pb-10 sm:pt-6 md:grid-cols-3 lg:mt-[clamp(26px,5.5vh,84px)] lg:gap-[clamp(16px,1.7vw,34px)] lg:pb-[clamp(6px,1vh,20px)] lg:pt-[clamp(24px,3.2vh,52px)]">
          {localizedCards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="info-card flex min-h-[260px] flex-col items-center rounded-[20px] border-2 border-white bg-white/78 px-5 py-6 text-center shadow-[0_14px_35px_rgba(84,54,16,0.16)] backdrop-blur-md sm:min-h-[300px] sm:rounded-[24px] sm:px-6 sm:py-7 lg:min-h-[clamp(360px,32vh,540px)] lg:rounded-[clamp(22px,2.3vw,34px)] lg:px-[clamp(18px,1.8vw,34px)] lg:py-[clamp(20px,2.2vh,36px)]"
              >
                <div
                  className={`grid h-16 w-16 place-items-center rounded-full ${card.color} text-[#f8dfae] shadow-[0_8px_22px_rgba(84,54,16,0.2)] sm:h-[clamp(72px,7.2vw,120px)] sm:w-[clamp(72px,7.2vw,120px)]`}
                >
                  <Icon className="h-9 w-9 sm:h-12 sm:w-12 lg:h-14 lg:w-14" strokeWidth={1.45} />
                </div>
                <div className="my-4 flex w-[clamp(72px,20vw,130px)] items-center justify-center gap-3 text-[#c9903f] sm:my-[clamp(16px,1.8vh,28px)]">
                  <span className="h-0.5 flex-1 bg-[#d7b56c]" />
                  <span className="h-3 w-3 rotate-45 border border-[#c9903f]" />
                  <span className="h-0.5 flex-1 bg-[#d7b56c]" />
                </div>
                <h3 className="font-serif text-[clamp(20px,4.5vw,36px)] font-light leading-tight text-[#00604f]">
                  {card.title}
                </h3>
                <p className="mt-4 flex-1 text-[clamp(15px,3.8vw,28px)] font-light leading-[1.55] text-[#31445d] sm:mt-[clamp(14px,1.8vh,26px)]">
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