import React from "react";
import { ArrowLeft, BookOpen, Landmark, Scale } from "lucide-react";
import { detailBackIconClassName, detailBackIconSize } from "@/constants/backNavigation";
import { useJourneyDetailAnimation } from "@/components/Sections/TheJourney/useJourneyDetailAnimation";
import { discoverDisplayFont, discoverSectionFont } from "@/components/Sections/discoverLanguage";
import en from "@/data/en.json";
import ar from "@/data/ar.json";
import ku from "@/data/ku.json";
import { localizeDigits } from "@/lib/utils";
import bg from "@/assets/images/thejourney/2005.webp";

const rows = [
  {
    number: "1",
    title: "Constitutional Recognition",
    text: "In 2005, Iraq’s constitution officially recognized the Kurdistan Region as a federal region.",
    icon: Landmark,
    color: "bg-[#13213b]",
  },
  {
    number: "2",
    title: "Legal Status",
    text: "This recognition affirmed the legal and constitutional status of the Region and its institutions.",
    icon: Scale,
    color: "bg-[#405846]",
  },
  {
    number: "3",
    title: "A New Chapter",
    text: "It marked an important step in the development of the Kurdistan Region within federal Iraq.",
    icon: BookOpen,
    color: "bg-[#9d3637]",
  },
];

type LangCode = "ku" | "en" | "ar";
type JourneySection = {
  title?: string;
  headline?: string;
  cards?: { title: string; description: string }[];
};
const CONTENT = { en, ar, ku } as const;

type Year2005PageProps = {
  lang?: LangCode;
  onBack?: () => void;
};

export default function Year2005Page({ lang = "en", onBack }: Year2005PageProps) {
  const rootRef = useJourneyDetailAnimation([lang]);
  const dir = lang === "en" ? "ltr" : "rtl";
  const displayFont = discoverDisplayFont(lang);
  const sectionFont = discoverSectionFont(lang);
  const data = CONTENT[lang] as any;
  const section: JourneySection =
    data?.journey?.sections?.["2005"] ?? data?.people?.sections?.["2005"] ?? {};
  const localizedRows = rows.map((row, i) => ({
    ...row,
    title: section.cards?.[i]?.title ?? row.title,
    text: section.cards?.[i]?.description ?? row.text,
  }));

  return (
    <main ref={rootRef} dir={dir} className={`m-0 min-h-screen w-full max-w-none bg-[#f8f1e7] text-[#17233b] overflow-x-hidden ${sectionFont}`}>
      <section className="relative mx-auto flex min-h-screen w-full max-w-[1400px] flex-col overflow-hidden sm:rounded-[22px] bg-[#fbf5eb]">
        
        {/* Back Button */}
        <button
          type="button"
          onClick={onBack}
          className="journey-detail-back absolute left-4 top-4 sm:left-[clamp(1rem,2vw,2rem)] sm:top-[clamp(1rem,2vh,2rem)] z-30 grid h-10 w-10 sm:h-[clamp(2.8rem,4.4vw,3.8rem)] sm:w-[clamp(2.8rem,4.4vw,3.8rem)] place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm transition-transform active:scale-95 rtl:left-auto rtl:right-4 sm:rtl:right-[clamp(1rem,2vw,2rem)]"
          aria-label="Back to Journey"
        >
          <ArrowLeft size={detailBackIconSize} className={detailBackIconClassName} />
        </button>

        {/* Decorative Side Grids */}
        <div className="absolute left-0 top-[120px] h-full w-12 sm:w-24 opacity-10 sm:opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute right-0 top-[120px] h-full w-12 sm:w-24 opacity-10 sm:opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

        {/* Hero Background Image */}
        <div className="journey-detail-hero pointer-events-none absolute right-0 top-0 h-[45vh] sm:h-[min(100vh,1500px)] w-full overflow-hidden rtl:right-auto rtl:left-0">
          <div className={`absolute inset-0 ${dir === "rtl" ? "-scale-x-100" : ""}`}>
            <img
              src={bg}
              alt="2005 recognition"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="relative z-10 flex flex-1 flex-col px-3 sm:px-[clamp(1.4rem,4vw,4rem)] pt-20 sm:pt-[clamp(1.5rem,5vh,4.5rem)] pb-6 sm:pb-[clamp(1.2rem,3vh,2.6rem)]">
          
          {/* Header */}
          <section className="journey-detail-intro w-full max-w-full sm:max-w-[min(46vw,700px)]">
            <h1 className={`${displayFont} text-5xl sm:text-7xl md:text-8xl lg:text-[clamp(6rem,11vw,10rem)] font-light leading-none tracking-tight text-[#17233b]`}>
              {localizeDigits(section.title ?? "2005", lang)}
            </h1>

            <p className="mt-3 sm:mt-[clamp(1rem,2.1vh,1.8rem)] text-base sm:text-xl md:text-2xl lg:text-[clamp(1.6rem,2.6vw,2.55rem)] font-light leading-snug text-[#9b6d35]">
              {section.headline ?? "Federal recognition within Iraq."}
            </p>

            <div className="mt-3 sm:mt-[clamp(1rem,2.3vh,2rem)] flex w-28 sm:w-[clamp(9rem,18vw,14.5rem)] items-center gap-4 text-[#b99152]">
              <span className="h-0.5 flex-1 bg-[#b99152]" />
              <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
            </div>
          </section>

          {/* Dynamic Spacer */}
          <div className="my-6 sm:my-0 sm:flex-[0.88]" />

          {/* 3-Column Grid Container */}
          <section className="mt-[200px] sm:mt-[0px] grid grid-cols-3 gap-1.5 sm:gap-4 lg:gap-[clamp(0.8rem,1.7vh,1.9rem)]">
            {localizedRows.map((row) => {
              const Icon = row.icon;
              return (
                <article
                  key={row.title}
                  className="journey-detail-card relative flex flex-col items-center rounded-[14px] sm:rounded-[20px] lg:rounded-[26px] border border-[#ead8b7] sm:border-2 bg-white/80 sm:bg-white/76 p-2 sm:p-4 lg:p-[clamp(1rem,2.1vw,2.5rem)] shadow-[0_10px_25px_rgba(84,54,16,0.1)] sm:shadow-[0_14px_35px_rgba(84,54,16,0.13)] backdrop-blur-md text-center"
                >
                  {/* Icon section */}
                  <div className="flex justify-center mb-2 sm:mb-4">
                    <div className={`grid h-10 w-10 sm:h-14 sm:w-14 lg:h-[clamp(4.1rem,7.5vw,7rem)] lg:w-[clamp(4.1rem,7.5vw,7rem)] place-items-center rounded-full border-2 sm:border-4 lg:border-[6px] border-white ${row.color} text-[#f8e5b8] shadow-[0_4px_10px_rgba(0,0,0,0.1)] sm:shadow-[0_8px_20px_rgba(0,0,0,0.16)]`}>
                      <Icon className="w-5 h-5 sm:w-7 sm:h-7 lg:w-12 lg:h-12" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Horizontal Divider inside vertical card */}
                  <div className="w-full h-px bg-[#e2c99b] opacity-60 mb-2 sm:mb-3" />

                  {/* Text Content wrapper */}
                  <div className="flex-1 flex flex-col items-center w-full">
                    {/* Header with badge + title */}
                    <div className="flex flex-col items-center gap-1 sm:gap-2">
                      <span className={`grid h-5 w-5 sm:h-6 sm:w-6 lg:h-[clamp(2.15rem,3.5vw,3rem)] lg:w-[clamp(2.15rem,3.5vw,3rem)] place-items-center rounded-full text-[9px] sm:text-[10px] lg:text-[clamp(1rem,1.75vw,1.75rem)] font-bold text-white ${row.color}`}>
                        {localizeDigits(row.number, lang)}
                      </span>
                      <h3 className={`${displayFont} text-[10px] sm:text-base lg:text-[clamp(1.35rem,2.45vw,2.45rem)] font-light leading-tight text-[#17233b]`}>
                        {localizeDigits(row.title, lang)}
                      </h3>
                    </div>

                    {/* Paragraph description */}
                    <p className="mt-1.5 sm:mt-2 text-[9px] sm:text-xs lg:text-[clamp(1.02rem,1.58vw,1.5rem)] font-light leading-snug sm:leading-relaxed text-[#303a50]">
                      {localizeDigits(row.text, lang)}
                    </p>
                  </div>

                  {/* Decorative corner grid background */}
                  <div className="pointer-events-none absolute right-0 top-0 h-full w-8 sm:w-[clamp(2.4rem,6vw,7rem)] opacity-5 sm:opacity-18 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:18px_18px]" />
                </article>
              );
            })}
          </section>
        </div>
      </section>
    </main>
  );
}