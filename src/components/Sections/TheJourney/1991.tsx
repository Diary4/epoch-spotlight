import React from "react";
import { ArrowLeft, BarChart3, Landmark, UsersRound } from "lucide-react";
import { useJourneyDetailAnimation } from "@/components/Sections/TheJourney/useJourneyDetailAnimation";
import en from "@/data/en.json";
import ar from "@/data/ar.json";
import ku from "@/data/ku.json";
import bg from "@/assets/mainImages/1991.webp";

const cards = [
  {
    title: "Historic\nUprising",
    text: "In 1991, a major uprising marked a turning point in Kurdish history in Iraq.",
    icon: UsersRound,
    color: "bg-[#c59a4b]",
  },
  {
    title: "A New\nReality",
    text: "This moment opened the way for a new political and administrative reality in the Kurdistan Region.",
    icon: Landmark,
    color: "bg-[#5d6a50]",
  },
  {
    title: "A Foundation\nfor the Future",
    text: "The developments of 1991 laid the groundwork for modern self-governance.",
    icon: BarChart3,
    color: "bg-[#9d3637]",
  },
];

type LangCode = "ku" | "en" | "ar";

type JourneySection = {
  title?: string;
  headline?: string;
  description?: string;
  cards?: { title: string; description: string }[];
};

const CONTENT = { en, ar, ku } as const;

type Year1991PageProps = {
  lang?: LangCode;
  onBack?: () => void;
};

export default function Year1991Page({ lang = "en", onBack }: Year1991PageProps) {
  const rootRef = useJourneyDetailAnimation([lang]);
  const data = CONTENT[lang] as any;
  const section: JourneySection =
    data?.journey?.sections?.["1991"] ?? data?.people?.sections?.["1991"] ?? {};
  const localizedCards = cards.map((card, i) => ({
    ...card,
    title: (section.cards?.[i]?.title ?? card.title).replace(" ", "\n"),
    text: section.cards?.[i]?.description ?? card.text,
  }));

  return (
    <main ref={rootRef} className="m-0 min-h-screen w-full max-w-none bg-[#f8f1e7] text-[#17233b] overflow-x-hidden">
      <section className="relative mx-auto flex min-h-screen w-[min(100vw,1400px)] flex-col overflow-y-auto overflow-x-hidden md:overflow-hidden rounded-[22px] bg-[#fbf5eb]">
        
        {/* Responsive back button */}
        <button
          type="button"
          onClick={onBack}
          className="journey-detail-back absolute left-3 top-3 z-30 grid h-10 w-10 place-items-center rounded-full border border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm sm:border-2 sm:left-[clamp(1rem,2vw,2rem)] sm:top-[clamp(1rem,2vh,2rem)] sm:h-[clamp(2.8rem,4.4vw,3.8rem)] sm:w-[clamp(2.8rem,4.4vw,3.8rem)]"
          aria-label="Back to The Journey"
        >
          <ArrowLeft className="h-5 w-5 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
        </button>
        
        {/* Subtle Background Paper Pattern (Hidden on mobile to preserve readability) */}
        <div className="absolute left-0 top-[120px] h-full w-24 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px] hidden sm:block" />
        <div className="absolute right-0 top-[120px] h-full w-24 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px] hidden sm:block" />

        {/* Absolutely positioned background illustration layer */}
        <div className="pointer-events-none absolute right-0 top-[000px] h-[60vh] sm:top-0 sm:h-[min(100vh,1400px)] w-full overflow-hidden z-0">
          <img
            src={bg}
            alt="1991 background placeholder"
            className="journey-detail-hero absolute inset-0 h-full w-full object-cover opacity-30 sm:opacity-50 md:opacity-78 
                      [mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_75%,transparent_100%)]
                      sm:[mask-image:radial-gradient(circle_at_58%_48%,black_0%,black_55%,transparent_84%)]"
          />
        </div>

        {/* Padding px-3 on mobile to maximize card grid width */}
        <div className="relative z-10 flex flex-1 flex-col px-3 xs:px-6 sm:px-[clamp(1.4rem,4vw,4rem)] pt-12 sm:pt-[clamp(1.2rem,4vh,3.5rem)] pb-12 md:pb-[clamp(1.2rem,3vh,2.6rem)]">
          {/* Text */}
          <section className="journey-detail-intro w-full max-w-full md:max-w-[min(46vw,720px)] pt-12 sm:pt-0">
            <h1 className="font-serif text-[clamp(3.5rem,10vw,5.5rem)] md:text-[clamp(6rem,11vw,10rem)] font-light leading-none tracking-tight text-[#17233b]">
              {section.title ?? "1991"}
            </h1>

            <p className="mt-[clamp(1rem,2.2vh,2rem)] text-[clamp(1.4rem,3vw,2.2rem)] md:text-[clamp(1.65rem,2.75vw,2.7rem)] font-light leading-tight text-[#9b6d35]">
              {section.headline ?? "A historic turning point."}
            </p>

            <div className="mt-[clamp(1rem,2.3vh,2rem)] flex w-12 xs:w-20 sm:w-[clamp(9rem,18vw,14.5rem)] items-center gap-2 sm:gap-4 text-[#b99152]">
              <span className="h-0.5 flex-1 bg-[#b99152]" />
              <span className="h-2.5 w-2.5 rotate-45 border-2 border-[#b99152]" />
              <span className="h-0.5 flex-1 bg-[#b99152]" />
            </div>

            <p className="mt-[clamp(1rem,2.4vh,2rem)] w-full max-w-full md:max-w-[min(38vw,590px)] text-[clamp(1.1rem,2vw,1.6rem)] md:text-[clamp(1.2rem,2vw,1.95rem)] font-medium leading-[1.55] text-[#2d3549]">
              {section.description ?? "A moment of courage and unity that opened the path to a new chapter for the Kurdistan Region."}
            </p>
          </section>

          {/* Spacer keeps card block near bottom like reference (Reset on mobile to prevent massive gap layout) */}
          <div className="mt-8 flex-0 md:flex-[0.85] md:mt-0" />

          {/* Cards Section - forced responsive 3-column layout */}
          <section className="relative z-10 mt-[200px] sm:mt-[200px] grid grid-cols-3 gap-1.5 xs:gap-2.5 sm:gap-5 pb-4 pt-4 lg:gap-6 lg:pb-8 lg:pt-10">
            {localizedCards.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  className="journey-detail-card relative flex min-h-[140px] xs:min-h-[180px] sm:min-h-[300px] lg:min-h-[clamp(23rem,37vh,33rem)] flex-col items-center overflow-hidden rounded-[12px] border border-[#ead8b7] bg-white/76 px-1.5 py-4 xs:px-2.5 xs:py-5 sm:border-2 sm:rounded-[26px] sm:px-6 sm:py-8 lg:px-[clamp(0.95rem,1.9vw,2rem)] lg:py-[clamp(1rem,2.2vh,2rem)] text-center shadow-[0_4px_12px_rgba(84,54,16,0.1)] sm:shadow-[0_14px_35px_rgba(84,54,16,0.15)] backdrop-blur-md"
                >
                  <div className="grid h-10 w-10 xs:h-12 xs:w-12 sm:h-[clamp(4.1rem,7.5vw,7.2rem)] sm:w-[clamp(4.1rem,7.5vw,7.2rem)] place-items-center rounded-full border-2 xs:border-4 sm:border-[6px] border-white text-[#f8e5b8] shadow-[0_8px_20px_rgba(0,0,0,0.16)] shrink-0" style={{ backgroundColor: card.color.replace('bg-[', '').replace(']', '') }}>
                    <Icon className="h-5 w-5 xs:h-6 xs:w-6 sm:h-14 sm:w-14" strokeWidth={1.5} />
                  </div>

                  <h3 className="mt-2.5 xs:mt-4 sm:mt-[clamp(0.8rem,1.8vh,1.9rem)] font-serif text-[9px] xs:text-[11px] sm:text-[24px] lg:text-[40px] font-light leading-tight text-[#17233b]">
                    {card.title}
                  </h3>

                  <div className="mx-auto my-1.5 xs:my-3 sm:my-[clamp(0.75rem,1.6vh,1.7rem)] flex w-12 xs:w-16 sm:w-[clamp(4.8rem,10vw,8rem)] items-center justify-center gap-1 sm:gap-3 text-[#b99152]">
                    <span className="h-0.5 flex-1 bg-[#d2b475]" />
                    <span className="h-1.5 w-1.5 xs:h-2 xs:w-2 sm:h-3 sm:w-3 rotate-45 border border-[#b99152] sm:border-2" />
                    <span className="h-0.5 flex-1 bg-[#d2b475]" />
                  </div>

                  <p className="text-[8px] xs:text-[9.5px] sm:text-[15px] lg:text-[24px] font-light leading-[1.5] text-[#303a50]">
                    {card.text}
                  </p>

                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:18px_18px]" />
                </article>
              );
            })}
          </section>
        </div>
      </section>
    </main>
  );
}