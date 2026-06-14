import React, { useLayoutEffect, useRef } from "react";
import { ArrowLeft, MessageSquareText, Music2, UsersRound, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import en from "@/data/en.json";
import ar from "@/data/ar.json";
import ku from "@/data/ku.json";
import bg from "@/assets/mainImages/shared.webp";

const identityCards = [
  {
    title: "Language",
    text: "Kurdish language is a central part of identity and remains a living connection between generations and communities.",
    icon: MessageSquareText,
    iconText: "کوردی",
  },
  {
    title: "Traditions",
    text: "Music, dance, clothing, celebrations, and hospitality help preserve a shared sense of belonging.",
    icon: Music2,
  },
  {
    title: "Collective\nMemory",
    text: "Across different places and borders, Kurds remain connected through shared history, stories, and cultural memory.",
    icon: UsersRound,
  },
];

type SharedIdentityPageProps = {
  lang?: "ku" | "en" | "ar";
  onBack?: () => void;
};

const CONTENT = { en, ar, ku } as const;

export default function SharedIdentityPage({ lang = "en", onBack }: SharedIdentityPageProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const data = CONTENT[lang] as any;
  const detail = data?.people?.detailPages?.sharedIdentity ?? {};
  
  const localizedCards = identityCards.map((card, i) => ({
    ...card,
    title: detail?.cards?.[i]?.title ?? card.title,
    text: detail?.cards?.[i]?.description ?? card.text,
  }));

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".back-btn", { opacity: 0, scale: 0.72, duration: 0.9 })
        .from(".pattern-layer", { opacity: 0, duration: 1 }, "-=0.5")
        .from(".hero-image", { opacity: 0, x: 70, scale: 1.08, duration: 1.6 }, "-=0.7")
        .from(".main-title", { opacity: 0, y: 62, duration: 1.1 }, "-=0.8")
        .from(".title-divider > *", { opacity: 0, scaleX: 0, stagger: 0.16, duration: 0.75 }, "-=0.5")
        .from(".subtitle-text", { opacity: 0, y: 36, duration: 0.9 }, "-=0.5")
        .from(".description-text", { opacity: 0, y: 26, duration: 0.85 }, "-=0.4")
        .from(".identity-card", { opacity: 0, y: 70, scale: 0.95, stagger: 0.2, duration: 0.9 }, "-=0.3");

    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={rootRef} className="m-0 min-h-[100vh] w-[100vw] max-w-none bg-[#fbf3e8] text-[#00604f] overflow-x-hidden">
      <section className="relative mx-auto flex min-h-[calc(100vh-2*clamp(10px,1.6vh,24px))] w-[min(100vw,1600px)] max-w-none flex-col overflow-hidden rounded-[clamp(22px,2.4vw,34px)] bg-[#fff7ec]">
        
        {/* Navigation */}
        <button
          type="button"
          onClick={onBack}
          className="back-btn absolute left-3 top-3 z-30 grid h-10 w-10 place-items-center rounded-full border border-[#d9b477] bg-white/70 text-[#00604f] shadow-sm sm:border-2 sm:left-6 sm:top-6 sm:h-14 sm:w-14 lg:left-8 lg:top-8 lg:h-16 lg:w-16"
          aria-label="Back to The People"
        >
          <ArrowLeft className="h-5 w-5 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
        </button>


        {/* Absolutely positioned background artwork container */}
        <div className="hero-image pointer-events-none absolute right-0 top-[000px] h-[30vh] sm:top-0 sm:h-[90vh] w-full sm:w-[70%] z-0">
          <img
            src={bg}
            alt="Shared identity visual"
            className="absolute inset-0 h-full w-full object-contain object-right-top opacity-100"
            style={{
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 75%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 75%, transparent 100%)',
            }}
          />
          {/* Gradients to blend into background exactly like the image */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#fff7ec] via-[#fff7ec]/40 to-transparent" />
          {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fff7ec]" /> */}
        </div>

        {/* Main text content */}
        <section className="relative z-10 mt-12 sm:mt-[clamp(62px,8.2vh,126px)] px-3 xs:px-6 sm:px-[clamp(20px,5vw,80px)] max-w-[min(65vw,900px)]">
          <h1 className="main-title font-serif text-[clamp(32px,10vw,48px)] xs:text-[clamp(38px,11vw,80px)] sm:text-[clamp(66px,8.3vw,120px)] font-light leading-[0.95] tracking-tight text-[#214439]">
            {(detail?.title ?? "A Shared\nIdentity").split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line} {i === 0 && <br />}
              </React.Fragment>
            ))}
          </h1>

          <div className="title-divider mt-[clamp(16px,4vh,52px)] flex items-center gap-2 sm:gap-[clamp(14px,1.5vw,22px)] text-[#c9903f]">
            <span className="h-0.5 w-12 xs:w-20 sm:w-[clamp(130px,13vw,220px)] bg-[#c9903f]" />
            <Sparkles className="h-4 w-4 xs:h-6 xs:w-6 sm:h-8 sm:w-8" />
            <span className="h-0.5 w-8 xs:w-12 sm:w-[clamp(90px,9vw,160px)] bg-[#c9903f]" />
          </div>

          <p className="subtitle-text mt-4 sm:mt-[clamp(24px,3.3vh,44px)] font-serif text-[clamp(18px,5vw,28px)] xs:text-[clamp(22px,5.5vw,40px)] sm:text-[clamp(31px,3.7vw,54px)] leading-tight text-[#b06f25]">
            {(detail?.subtitle ?? "United by language, heritage, and memory.").replace(", ", ",\n")}
          </p>

          <p className="description-text mt-3 sm:mt-[clamp(20px,3vh,40px)] max-w-[min(46vw,620px)] text-[12px] xs:text-[14px] sm:text-[22px] lg:text-[32px] font-light leading-[1.62] text-[#35435b]">
            {detail?.description ?? "Across generations and places, Kurdish identity is a source of strength, pride, and unity. Rooted in a rich history and carried forward through everyday life."}
          </p>
        </section>

        {/* Cards Section - forced responsive 3-column layout */}
        <section className="relative z-20 mt-[100px] sm:mt-[200px] grid w-full grid-cols-3 items-stretch gap-1.5 xs:gap-2.5 sm:gap-5 pb-4 pt-4 px-3 xs:px-6 sm:px-[clamp(20px,5vw,80px)]">
          {localizedCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <article
                key={i}
                className="identity-card flex h-full min-h-[140px] xs:min-h-[180px] sm:min-h-[300px] lg:min-h-[560px] flex-col items-center rounded-[12px] border border-white bg-white/82 px-1.5 py-4 xs:px-2.5 xs:py-5 sm:border-2 sm:rounded-[24px] sm:px-6 sm:py-7 lg:rounded-[clamp(22px,2.3vw,34px)] lg:px-[clamp(18px,1.8vw,34px)] lg:py-[clamp(20px,2.2vh,36px)] text-center shadow-[0_4px_12px_rgba(84,54,16,0.1)] sm:shadow-[0_14px_35px_rgba(84,54,16,0.16)] backdrop-blur-md"
              >
                <div className="grid h-10 w-10 xs:h-12 xs:w-12 sm:h-[clamp(82px,7.3vw,124px)] sm:w-[clamp(82px,7.3vw,124px)] place-items-center rounded-full border border-[#f5ead3] bg-white text-[#c9903f] shadow-[0_4px_12px_rgba(84,54,16,0.1)] sm:border-4 sm:shadow-[0_7px_18px_rgba(84,54,16,0.13)]">
                  {card.iconText ? (
                    <div className="relative">
                      <MessageSquareText className="h-5 w-5 xs:h-6 xs:w-6 sm:h-12 sm:w-12 lg:h-[58px] lg:w-[58px]" strokeWidth={1.5} />
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[48%] text-[6px] xs:text-[8px] sm:text-[clamp(16px,1.55vw,24px)] font-bold">{card.iconText}</span>
                    </div>
                  ) : (
                    <Icon className="h-5 w-5 xs:h-6 xs:w-6 sm:h-12 sm:w-12 lg:h-[58px] lg:w-[58px]" strokeWidth={1.45} />
                  )}
                </div>

                <h3 className="mt-2.5 xs:mt-4 sm:mt-[clamp(14px,1.9vh,30px)] whitespace-pre-line font-serif text-[9px] xs:text-[11px] sm:text-[24px] lg:text-[38px] font-light leading-[0.95] text-[#214439]">
                  {card.title}
                </h3>

                <div className="mx-auto my-1.5 xs:my-3 sm:my-[clamp(12px,1.7vh,24px)] flex w-12 xs:w-16 sm:w-[clamp(88px,8.3vw,138px)] items-center justify-center gap-1 sm:gap-3 text-[#c9903f]">
                  <span className="h-0.5 flex-1 bg-[#d7b56c]" />
                  <span className="text-[9px] xs:text-[11px] sm:text-[clamp(16px,1.5vw,24px)]">✥</span>
                  <span className="h-0.5 flex-1 bg-[#d7b56c]" />
                </div>

                <p className="flex-1 text-[8px] xs:text-[9.5px] sm:text-[15px] lg:text-[27px] font-light leading-[1.55] text-[#35435b]">
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