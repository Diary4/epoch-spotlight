import React from "react";
import { ArrowLeft, KeyRound, Sparkles, TreePine } from "lucide-react";
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
  const data = CONTENT[lang] as any;
  const detail = data?.people?.detailPages?.whoAreTheKurds ?? {};
  
  const localizedCards = infoCards.map((card, i) => ({
    ...card,
    title: detail?.cards?.[i]?.title ?? card.title,
    text: detail?.cards?.[i]?.description ?? card.text,
  }));

  const titleLines = (detail?.title ?? "Who Are\nthe Kurds?").split("\n");
  const subtitleLines = (detail?.subtitle ?? "An ancient people of\nthe Middle East.").split("\n");
  const isRtl = lang === "ar" || lang === "ku";

  return (
    <main className="m-0 min-h-[100dvh] w-full max-w-[100vw] overflow-x-hidden bg-[#fbf3e8] select-none">
      <section className="relative mx-auto flex min-h-0 w-full max-w-[1800px] flex-col overflow-x-hidden overflow-y-auto px-3 pb-6 pt-4 sm:px-6 sm:py-8 lg:min-h-screen lg:overflow-hidden lg:px-[6vw] lg:py-12">
        
        {/* Back button */}
        <button
          type="button"
          onClick={onBack}
          className="absolute left-3 top-3 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-[#d9b477] bg-white/60 text-[#00604f] shadow-lg backdrop-blur-md transition-all hover:bg-white sm:border-2 sm:left-6 sm:top-6 sm:h-14 sm:w-14 lg:left-8 lg:top-8 lg:h-16 lg:w-16"
          aria-label="Back to The People"
        >
          <ArrowLeft className="h-5 w-5 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
        </button>

        {/* Absolutely positioned background artwork container */}
        <div className="pointer-events-none absolute right-[-50px] top-[000px] h-[40vh]  sm:top-0 sm:h-[min(58vh,520px)] w-full sm:w-[78%] lg:h-[110vh] lg:w-[70%] z-0">
          <img
            src={bgImage}
            alt="Kurdish Visual"
            className="h-full w-full object-contain object-[center_top] opacity-90 sm:object-right-top"
          />
        </div>

        <div
          dir={isRtl ? "rtl" : "ltr"}
          className="relative z-10 mt-12 flex w-full min-w-0 max-w-none flex-col items-start sm:mt-20 lg:mt-20 lg:max-w-[900px]"
        >
          <div className="mb-6 flex items-center gap-2 sm:mb-12 sm:gap-4">
            <div className="flex items-center">
              <span className="h-[2px] w-6 bg-[#c9903f] xs:w-8 sm:w-12" />
              <div className="ml-[-2px] h-2.5 w-2.5 rotate-45 border border-[#c9903f] sm:border-2 sm:h-4 sm:w-4" />
            </div>
            <h2 className="font-serif text-xs xs:text-sm sm:text-lg font-light uppercase tracking-[0.15em] text-[#c9903f] sm:tracking-[0.2em]">
              {detail?.sectionLabel ?? "The People"}
            </h2>
          </div>

          <h1 className="font-serif text-[clamp(32px,10vw,48px)] xs:text-[clamp(38px,11vw,80px)] sm:text-[clamp(44px,11vw,160px)] font-light leading-[0.9] tracking-tighter text-[#00604f] sm:leading-[0.85]">
            {titleLines.map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < titleLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>

          <div className="my-6 flex items-center gap-3 sm:my-12 sm:gap-6">
            <span className="h-[2px] w-12 bg-[#d9b477] xs:w-20 sm:w-32" />
            <div className="rounded-full border border-[#d9b477] p-1 sm:p-2">
              <Sparkles className="h-4 w-4 text-[#c9903f] xs:h-5 xs:w-5 sm:h-6 sm:w-6" />
            </div>
            <span className="h-[2px] w-6 bg-[#d9b477] xs:w-10 sm:w-16" />
          </div>

          <h2 className="mb-4 max-w-none font-serif text-[clamp(18px,5vw,28px)] xs:text-[clamp(22px,5.5vw,40px)] sm:text-[clamp(24px,5.5vw,68px)] leading-[1.1] text-[#00604f] sm:mb-10 lg:max-w-[700px]">
            {subtitleLines.map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < subtitleLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>

          <p className="max-w-none text-[12px] xs:text-[14px] sm:text-[22px] lg:text-[30px] font-light leading-relaxed text-[#31445d] opacity-80 sm:max-w-[550px]">
            {detail?.description ??
              "The Kurds have lived in these mountains and plains for thousands of years, shaping the region with their strength, spirit, and culture."}
          </p>
        </div>

        {/* Cards Section - forced responsive 3-column layout */}
        <section className="relative z-20 mt-[200px] sm:mt-[200px] grid w-full grid-cols-3 items-stretch gap-1.5 xs:gap-2.5 sm:gap-5 pb-4 pt-4 lg:pb-[clamp(6px,1vh,20px)] lg:pt-[clamp(24px,3.2vh,52px)]">
          {localizedCards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="flex min-h-[140px] xs:min-h-[180px] sm:min-h-[300px] lg:min-h-[540px] flex-col items-center rounded-[12px] border border-white bg-white/78 px-1.5 py-4 xs:px-2.5 xs:py-5 sm:border-2 sm:rounded-[24px] sm:px-6 sm:py-7 lg:rounded-[clamp(22px,2.3vw,34px)] lg:px-[clamp(18px,1.8vw,34px)] lg:py-[clamp(20px,2.2vh,36px)] text-center shadow-[0_4px_12px_rgba(84,54,16,0.1)] sm:shadow-[0_14px_35px_rgba(84,54,16,0.16)] backdrop-blur-md"
              >
                <div
                  className={`grid h-10 w-10 xs:h-12 xs:w-12 sm:h-[clamp(72px,7.2vw,120px)] sm:w-[clamp(72px,7.2vw,120px)] place-items-center rounded-full ${card.color} text-[#f8dfae] shadow-[0_4px_12px_rgba(84,54,16,0.15)] sm:shadow-[0_8px_22px_rgba(84,54,16,0.2)]`}
                >
                  <Icon className="h-5 w-5 xs:h-6 xs:w-6 sm:h-12 sm:w-12 lg:h-14 lg:w-14" strokeWidth={1.45} />
                </div>
                
                <div className="mx-auto my-1.5 xs:my-3 sm:my-[clamp(16px,1.8vh,28px)] flex w-12 xs:w-16 sm:w-[clamp(72px,20vw,130px)] items-center justify-center gap-1 sm:gap-3 text-[#c9903f]">
                  <span className="h-0.5 flex-1 bg-[#d7b56c]" />
                  <span className="h-1.5 w-1.5 xs:h-2 xs:w-2 sm:h-3 sm:w-3 rotate-45 border border-[#c9903f]" />
                  <span className="h-0.5 flex-1 bg-[#d7b56c]" />
                </div>

                <h3 className="font-serif text-[9px] xs:text-[11px] sm:text-[24px] lg:text-[36px] font-light leading-tight text-[#00604f]">
                  {card.title}
                </h3>
                <p className="mt-1.5 xs:mt-3 sm:mt-[clamp(14px,1.8vh,26px)] flex-1 text-[8px] xs:text-[9.5px] sm:text-[15px] lg:text-[28px] font-light leading-[1.55] text-[#31445d]">
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