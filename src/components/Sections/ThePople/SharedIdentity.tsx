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
          className="back-btn absolute left-[clamp(16px,2vw,30px)] top-[clamp(16px,2vh,30px)] z-30 grid h-[clamp(50px,4.8vw,64px)] w-[clamp(50px,4.8vw,64px)] place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#00604f] shadow-sm"
          aria-label="Back to The People"
        >
          <ArrowLeft size={30} />
        </button>


        {/* --- FIXED HERO IMAGE SECTION --- */}
        <div className="hero-image pointer-events-none absolute right-0 top-0 h-[90vh] w-[70%] z-0">
          <img
            src={bg}
            alt="Shared identity visual"
            className="absolute inset-0 h-full w-full object-contain object-right-top opacity-100"
            style={{
              /* This creates the "white effect" fade-out from the screenshot */
              maskImage: 'linear-gradient(to left, black 40%, transparent 95%), linear-gradient(to bottom, black 80%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to left, black 40%, transparent 95%), linear-gradient(to bottom, black 80%, transparent 100%)'
            }}
          />
          {/* Gradients to blend into background exactly like the image */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#fff7ec] via-[#fff7ec]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fff7ec]" />
        </div>

        {/* Main text content */}
        <section className="relative z-10 mt-[clamp(62px,8.2vh,126px)] px-[clamp(20px,5vw,80px)] max-w-[min(65vw,900px)]">
          <h1 className="main-title font-serif text-[clamp(66px,8.3vw,120px)] font-light leading-[0.95] tracking-tight text-[#214439]">
            {(detail?.title ?? "A Shared\nIdentity").split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line} {i === 0 && <br />}
              </React.Fragment>
            ))}
          </h1>

          <div className="title-divider mt-[clamp(30px,4vh,52px)] flex items-center gap-[clamp(14px,1.5vw,22px)] text-[#c9903f]">
            <span className="h-0.5 w-[clamp(130px,13vw,220px)] bg-[#c9903f]" />
            <Sparkles size={32} />
            <span className="h-0.5 w-[clamp(90px,9vw,160px)] bg-[#c9903f]" />
          </div>

          <p className="subtitle-text mt-[clamp(24px,3.3vh,44px)] font-serif text-[clamp(31px,3.7vw,54px)] leading-tight text-[#b06f25]">
            {(detail?.subtitle ?? "United by language, heritage, and memory.").replace(", ", ",\n")}
          </p>

          <p className="description-text mt-[clamp(20px,3vh,40px)] max-w-[min(46vw,620px)] text-[clamp(20px,2.3vw,32px)] font-light leading-[1.62] text-[#35435b]">
            {detail?.description ?? "Across generations and places, Kurdish identity is a source of strength, pride, and unity. Rooted in a rich history and carried forward through everyday life."}
          </p>
        </section>

        {/* Cards: height follows content; desktop row uses equal stretch */}
        <section className="relative z-20 mt-[clamp(20px,3.5vh,56px)] grid w-full grid-cols-1 items-stretch gap-[clamp(16px,1.7vw,34px)] px-[clamp(20px,5vw,80px)] pb-[clamp(8px,1vh,22px)] md:grid-cols-3">
          {localizedCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <article
                key={i}
                className="identity-card flex h-full min-h-0 flex-col items-center rounded-[clamp(22px,2.3vw,34px)] border-2 border-white bg-white/82 px-[clamp(16px,1.7vw,32px)] py-[clamp(18px,2.1vh,34px)] text-center shadow-[0_14px_35px_rgba(84,54,16,0.16)] backdrop-blur-md"
              >
                <div className="grid h-[clamp(82px,7.3vw,124px)] w-[clamp(82px,7.3vw,124px)] place-items-center rounded-full border-4 border-[#f5ead3] bg-white text-[#c9903f] shadow-[0_7px_18px_rgba(84,54,16,0.13)]">
                  {card.iconText ? (
                    <div className="relative">
                      <MessageSquareText size={58} strokeWidth={1.5} />
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[48%] text-[clamp(16px,1.55vw,24px)] font-bold">{card.iconText}</span>
                    </div>
                  ) : (
                    <Icon size={58} strokeWidth={1.45} />
                  )}
                </div>

                <h3 className="mt-[clamp(14px,1.9vh,30px)] whitespace-pre-line font-serif text-[clamp(24px,2.4vw,38px)] font-light leading-[0.95] text-[#214439]">
                  {card.title}
                </h3>

                <div className="my-[clamp(12px,1.7vh,24px)] flex w-[clamp(88px,8.3vw,138px)] items-center justify-center gap-3 text-[#c9903f]">
                  <span className="h-0.5 flex-1 bg-[#d7b56c]" />
                  <span className="text-[clamp(16px,1.5vw,24px)]">✥</span>
                  <span className="h-0.5 flex-1 bg-[#d7b56c]" />
                </div>

                <p className="flex-1 text-[clamp(17px,1.65vw,27px)] font-light leading-[1.55] text-[#35435b]">
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