import React, { useLayoutEffect, useRef } from "react";
import { ArrowLeft, Mountain, SunMedium, Landmark } from "lucide-react";
import { gsap } from "gsap";
import en from "@/data/en.json";
import ar from "@/data/ar.json";
import ku from "@/data/ku.json";
import bg1 from "@/assets/mainImages/story-3.webp";

const cards = [
  {
    title: "Endurance",
    text: "Through countless challenges, the Kurdish people have shown unwavering strength and the will to persevere.",
    icon: Mountain,
  },
  {
    title: "Dignity",
    text: "With deep respect for their heritage and values, Kurds have preserved their identity with pride and honor.",
    icon: Landmark,
  },
  {
    title: "Hope",
    text: "Looking ahead with optimism, the Kurdish people continue to build a future rooted in peace, unity, and progress.",
    icon: SunMedium,
  },
];

type StoryOfResilienceProps = {
  lang?: "ku" | "en" | "ar";
  onBack?: () => void;
};

const CONTENT = { en, ar, ku } as const;

export default function StoryOfResilience({ lang = "en", onBack }: StoryOfResilienceProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const data = CONTENT[lang] as any;
  const detail = data?.people?.detailPages?.resilience ?? {};
  const localizedCards = cards.map((card, i) => ({
    ...card,
    title: detail?.cards?.[i]?.title ?? card.title,
    text: detail?.cards?.[i]?.description ?? card.text,
  }));

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".back-btn", { opacity: 0, scale: 0.72, duration: 0.9 })
        .from(".pattern-layer", { opacity: 0, duration: 1 }, "-=0.5")
        .from(".hero-image", { opacity: 0, x: 75, scale: 1.09, duration: 1.7 }, "-=0.7")
        .from(".main-title", { opacity: 0, y: 60, duration: 1.1 }, "-=0.8")
        .from(".title-divider > *", { opacity: 0, scaleX: 0, stagger: 0.16, duration: 0.75 }, "-=0.5")
        .from(".subtitle-text", { opacity: 0, y: 36, duration: 0.9 }, "-=0.5")
        .from(".description-text", { opacity: 0, y: 26, duration: 0.85 }, "-=0.4")
        .from(".culture-strip", { opacity: 0, y: 28, duration: 1 }, "-=0.35")
        .from(".resilience-card", { opacity: 0, y: 70, scale: 0.95, stagger: 0.2, duration: 0.9 }, "-=0.35");

    }, rootRef);

    return () => ctx.revert();
  }, []);

  const titleLines = (detail?.title ?? "A Story of\nResilience").split("\n");
  const subtitleText = detail?.subtitle ?? "A history shaped by endurance, dignity, and hope.";
  const subtitleLines = subtitleText.includes("\n")
    ? subtitleText.split("\n")
    : subtitleText.split(/,\s+/);
  const isRtl = lang === "ar" || lang === "ku";

  return (
    <main ref={rootRef} className="m-0 min-h-[100dvh] w-full max-w-[100vw] overflow-x-hidden bg-[#fbf3e8] text-[#174b3d]">
      <section className="relative mx-auto flex min-h-screen w-full max-w-[1400px] flex-col justify-between overflow-x-hidden overflow-y-auto rounded-[22px] bg-[#fff7ec] sm:rounded-[28px] lg:rounded-[clamp(22px,2.4vw,34px)] px-3 pb-8 pt-4 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
        <button
          type="button"
          onClick={onBack}
          className="back-btn absolute left-3 top-3 z-30 grid h-10 w-10 place-items-center rounded-full border border-[#d9b477] bg-white/70 text-[#174b3d] shadow-sm sm:border-2 sm:left-6 sm:top-6 sm:h-14 sm:w-14 lg:left-8 lg:top-8 lg:h-16 lg:w-16"
          aria-label="Back to The People"
        >
          <ArrowLeft className="h-5 w-5 sm:h-7 sm:w-7 lg:h-[30px] lg:w-[30px]" />
        </button>
        <div className="pattern-layer pointer-events-none absolute left-0 top-0 hidden h-full w-28 opacity-20 [background-image:linear-gradient(45deg,#d5b372_1px,transparent_1px),linear-gradient(-45deg,#d5b372_1px,transparent_1px)] [background-size:24px_24px] sm:block" />
        <div className="pattern-layer pointer-events-none absolute right-0 top-0 hidden h-full w-28 opacity-20 [background-image:linear-gradient(45deg,#d5b372_1px,transparent_1px),linear-gradient(-45deg,#d5b372_1px,transparent_1px)] [background-size:24px_24px] sm:block" />

        {/* Blended background illustration shifted downwards on mobile screen sizes */}
        <div className="hero-image pointer-events-none absolute inset-x-0 top-[000px] h-[40vh] sm:top-[clamp(100px,10vh,180px)] sm:h-[min(58vh,520px)] lg:right-0 lg:left-auto lg:top-[clamp(130px,11vh,210px)] lg:h-[clamp(780px,67vh,1160px)] w-full">
          <img
            src={bg1}
            alt="Resilience background placeholder"
            className="absolute inset-0 h-full w-full object-cover object-[center_top] opacity-70 sm:opacity-100 sm:object-center
                      [mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_75%,transparent_100%)]
                      sm:[mask-image:none]"
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#fff7ec] via-[#fff7ec]/80 to-transparent sm:h-24" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-b from-transparent via-[#fff7ec]/55 to-[#fff7ec] sm:h-[42%]" />
        </div>

        <section
          dir={isRtl ? "rtl" : "ltr"}
          className="relative z-10 w-full min-w-0 max-w-none px-3 pb-4 pt-12 xs:px-6 sm:py-6 lg:mt-[clamp(62px,8.2vh,126px)] lg:max-w-[min(58vw,760px)] lg:px-[clamp(20px,5vw,80px)] lg:py-[clamp(20px,5vh,80px)]"
        >
          <h1 className="main-title font-serif text-[clamp(32px,10vw,48px)] xs:text-[clamp(38px,11vw,80px)] sm:text-[clamp(40px,11vw,116px)] font-light leading-[1.05] tracking-tight text-[#214439] sm:leading-[1.03]">
            {titleLines.map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < titleLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>

          <div className="title-divider mt-4 flex items-center gap-2 sm:mt-[clamp(26px,3.8vh,48px)] sm:gap-[clamp(14px,1.5vw,22px)] text-[#c9903f]">
            <span className="h-0.5 w-12 bg-[#c9903f] xs:w-20 sm:w-[clamp(130px,13vw,220px)]" />
            <span className="text-[9px] xs:text-[11px] sm:text-[clamp(24px,2.2vw,36px)]">✥</span>
            <span className="h-0.5 w-8 bg-[#c9903f] sm:w-[clamp(110px,11vw,190px)]" />
          </div>

          <p className="subtitle-text mt-4 font-serif text-[clamp(18px,5vw,28px)] xs:text-[clamp(22px,5.5vw,40px)] sm:text-[clamp(22px,5.5vw,52px)] leading-tight text-[#b06f25] sm:mt-[clamp(22px,3vh,40px)]">
            {subtitleLines.map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < subtitleLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>

          <p className="description-text mt-3 max-w-none text-[12px] xs:text-[14px] sm:text-[22px] lg:text-[30px] font-light leading-[1.65] text-[#35435b] sm:mt-[clamp(18px,2.8vh,38px)] sm:leading-[1.75] lg:max-w-[min(48vw,650px)]">
            {detail?.description ??
              "Across centuries, the Kurdish people have faced hardship and change, yet they have held on to their identity, culture, and values. Through every challenge, they have stood together, preserved their heritage, and moved forward with courage and hope for a better tomorrow."}
          </p>
        </section>

        {/* Cards Section - anchored at bottom with sm:mt-auto to utilize vertical screen flow */}
        <section className="relative z-20 mt-12 sm:mt-auto grid w-full grid-cols-3 items-stretch gap-1.5 xs:gap-2.5 sm:gap-5 pb-4 pt-4 px-3 xs:px-6 sm:px-6 lg:px-14 lg:pb-[clamp(8px,1vh,22px)] lg:pt-[clamp(20px,2.8vh,42px)]">
          {localizedCards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="resilience-card relative flex min-h-[140px] xs:min-h-[180px] sm:min-h-[280px] lg:min-h-[clamp(330px,30vh,500px)] flex-col items-center overflow-hidden rounded-[12px] border border-[#f4e5cc] bg-white/82 px-1.5 py-4 xs:px-2.5 xs:py-5 sm:border-2 sm:rounded-[24px] sm:px-6 sm:py-7 lg:rounded-[clamp(20px,2.2vw,32px)] lg:px-[clamp(16px,1.8vw,34px)] lg:py-[clamp(18px,2.1vh,34px)] text-center shadow-[0_4px_12px_rgba(84,54,16,0.1)] sm:shadow-[0_14px_35px_rgba(84,54,16,0.16)] backdrop-blur-md"
              >
                <div className="grid h-10 w-10 xs:h-12 xs:w-12 sm:h-[clamp(72px,7.3vw,124px)] sm:w-[clamp(72px,7.3vw,124px)] place-items-center rounded-full border border-[#d8a14c] sm:border-2 bg-white text-[#c9903f] shadow-[0_4px_12px_rgba(84,54,16,0.15)] sm:shadow-[0_7px_18px_rgba(84,54,16,0.13)]">
                  <Icon className="h-5 w-5 xs:h-6 xs:w-6 sm:h-12 sm:w-12 lg:h-14 lg:w-14" strokeWidth={1.45} />
                </div>

                <h3 className="mt-2.5 xs:mt-4 sm:mt-[clamp(14px,1.9vh,30px)] font-serif text-[9px] xs:text-[11px] sm:text-[24px] lg:text-[42px] font-light leading-tight text-[#214439]">
                  {card.title}
                </h3>

                <div className="mx-auto my-1.5 xs:my-3 sm:my-[clamp(12px,1.6vh,24px)] flex w-12 xs:w-16 sm:w-[clamp(72px,20vw,138px)] items-center justify-center gap-1 sm:gap-3 text-[#c9903f]">
                  <span className="h-0.5 flex-1 bg-[#d7b56c]" />
                  <span className="h-1.5 w-1.5 xs:h-2 xs:w-2 sm:h-3 sm:w-3 rotate-45 border border-[#c9903f] sm:border-2" />
                  <span className="h-0.5 flex-1 bg-[#d7b56c]" />
                </div>

                <p className="flex-1 text-[8px] xs:text-[9.5px] sm:text-[15px] lg:text-[27px] font-light leading-[1.55] text-[#40515f]">
                  {card.text}
                </p>

                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:18px_18px] sm:h-[clamp(44px,5vh,84px)]" />
              </article>
            );
          })}
        </section>
      </section>
    </main>
  );
}