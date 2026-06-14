import React from "react";
import { ArrowLeft, BookOpen, Landmark, Scale } from "lucide-react";
import { useJourneyDetailAnimation } from "@/components/Sections/TheJourney/useJourneyDetailAnimation";
import en from "@/data/en.json";
import ar from "@/data/ar.json";
import ku from "@/data/ku.json";
import { localizeDigits } from "@/lib/utils";
import bg from "@/assets/mainImages/2005.webp";

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
  const data = CONTENT[lang] as any;
  const section: JourneySection =
    data?.journey?.sections?.["2005"] ?? data?.people?.sections?.["2005"] ?? {};
  const localizedRows = rows.map((row, i) => ({
    ...row,
    title: section.cards?.[i]?.title ?? row.title,
    text: section.cards?.[i]?.description ?? row.text,
  }));
  return (
    <main ref={rootRef} className="m-0 min-h-screen w-[100vw] max-w-none bg-[#f8f1e7] text-[#17233b] overflow-x-hidden">
      <section className="relative mx-auto flex min-h-screen w-[min(100vw,1400px)] flex-col overflow-y-auto overflow-x-hidden md:overflow-hidden rounded-[22px] bg-[#fbf5eb]">
        
        {/* Responsive back button */}
        <button
          type="button"
          onClick={onBack}
          className="journey-detail-back absolute left-3 top-3 z-30 grid h-10 w-10 place-items-center rounded-full border border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm sm:border-2 sm:left-[clamp(1rem,2vw,2rem)] sm:top-[clamp(1rem,2vh,2rem)] sm:h-[clamp(2.8rem,4.4vw,3.8rem)] sm:w-[clamp(2.8rem,4.4vw,3.8rem)]"
          aria-label="Back to Journey"
        >
          <ArrowLeft className="h-5 w-5 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
        </button>
        
        {/* Subtle Background Paper Pattern (Hidden on mobile to preserve readability) */}
        <div className="absolute left-0 top-[120px] h-full w-24 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px] hidden sm:block" />
        <div className="absolute right-0 top-[120px] h-full w-24 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px] hidden sm:block" />

        {/* Absolutely positioned background illustration layer */}
        <div className="pointer-events-none absolute right-0 top-[000px] h-[60vh] sm:top-0 sm:h-[min(100vh,1500px)] w-full overflow-hidden z-0">
          <img
            src={bg}
            alt="2005 recognition placeholder"
            className="journey-detail-hero absolute inset-0 h-full w-full object-cover opacity-30 sm:opacity-50 md:opacity-78 
                      [mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_75%,transparent_100%)]
                      sm:[mask-image:radial-gradient(circle_at_60%_48%,black_0%,black_55%,transparent_84%)]"
          />
        </div>

        {/* Padding px-3 on mobile to maximize horizontal space */}
        <div className="relative z-10 flex flex-1 flex-col px-3 xs:px-6 sm:px-[clamp(1.4rem,4vw,4rem)] pt-12 sm:pt-[clamp(1.5rem,5vh,4.5rem)] pb-[clamp(1.2rem,3vh,2.6rem)]">
          <section className="journey-detail-intro max-w-[min(46vw,700px)] pt-12 sm:pt-0">
            <h1 className="font-serif text-[clamp(3.5rem,10vw,5.5rem)] sm:text-[clamp(6rem,11vw,10rem)] font-light leading-none tracking-tight text-[#17233b]">
              {localizeDigits(section.title ?? "2005", lang)}
            </h1>

            <p className="mt-[clamp(1rem,2.1vh,1.8rem)] text-[clamp(1.4rem,3vw,2.2rem)] sm:text-[clamp(1.6rem,2.6vw,2.55rem)] font-light leading-tight text-[#9b6d35]">
              {section.headline ?? "Federal recognition within Iraq."}
            </p>

            <div className="mt-[clamp(1rem,2.3vh,2rem)] flex w-12 xs:w-20 sm:w-[clamp(9rem,18vw,14.5rem)] items-center gap-2 sm:gap-4 text-[#b99152]">
              <span className="h-0.5 flex-1 bg-[#b99152]" />
              <span className="h-2.5 w-2.5 rotate-45 border-2 border-[#b99152]" />
              <span className="h-0.5 flex-1 bg-[#b99152]" />
            </div>
          </section>

          <div className="flex-0 sm:flex-[0.88] mt-8 sm:mt-0" />

          {/* Stacked Rows Section - mt-12 (xs:mt-16) pushes rows below header on mobile viewports */}
          <section className="relative z-10 mt-[250px] sm:mt-[200px] space-y-3 sm:space-y-[clamp(0.8rem,1.7vh,1.9rem)]">
            {localizedRows.map((row) => {
              const Icon = row.icon;
              return (
                <article
                  key={row.title}
                  className="journey-detail-card relative flex min-h-[90px] xs:min-h-[110px] sm:min-h-[clamp(9.2rem,16vh,13.5rem)] items-center rounded-[12px] sm:rounded-[26px] border border-[#ead8b7] sm:border-2 bg-white/76 px-2 py-3 xs:px-4 xs:py-4 sm:px-[clamp(1rem,2.1vw,2.5rem)] sm:py-[clamp(0.9rem,1.9vh,1.8rem)] shadow-[0_4px_12px_rgba(84,54,16,0.1)] sm:shadow-[0_14px_35px_rgba(84,54,16,0.13)] backdrop-blur-md"
                >
                  <div className="flex w-14 xs:w-20 sm:w-[clamp(5.6rem,13vw,11.5rem)] justify-center shrink-0">
                    <div className={`grid h-10 w-10 xs:h-12 xs:w-12 sm:h-[clamp(4.1rem,7.5vw,7rem)] sm:w-[clamp(4.1rem,7.5vw,7rem)] place-items-center rounded-full border-2 xs:border-4 sm:border-[6px] border-white ${row.color} text-[#f8e5b8] shadow-[0_8px_20px_rgba(0,0,0,0.16)]`}>
                      <Icon className="h-5 w-5 xs:h-6 xs:w-6 sm:h-12 sm:w-12" strokeWidth={1.5} />
                    </div>
                  </div>

                  <div className="h-12 xs:h-16 sm:h-[clamp(4.5rem,9vh,7rem)] w-px bg-[#e2c99b]" />

                  <div className="px-3 xs:px-4 sm:px-[clamp(0.9rem,1.9vw,2.4rem)] flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 xs:gap-2.5 sm:gap-[clamp(0.55rem,1.3vw,1.25rem)]">
                      <span className={`grid h-4 w-4 xs:h-6 xs:w-6 sm:h-[clamp(2.15rem,3.5vw,3rem)] sm:w-[clamp(2.15rem,3.5vw,3rem)] shrink-0 place-items-center rounded-full text-[8px] xs:text-[11px] sm:text-[clamp(1rem,1.75vw,1.75rem)] font-bold text-white ${row.color}`}>
                        {localizeDigits(row.number, lang)}
                      </span>
                      <h3 className="font-serif text-[12px] xs:text-[14px] sm:text-[clamp(1.35rem,2.45vw,2.45rem)] font-light leading-tight text-[#17233b] truncate">
                        {localizeDigits(row.title, lang)}
                      </h3>
                    </div>

                    <p className="mt-1 sm:mt-[clamp(0.45rem,0.9vh,0.9rem)] max-w-full sm:max-w-[min(45vw,760px)] text-[10px] xs:text-[11.5px] sm:text-[clamp(1.02rem,1.58vw,1.5rem)] font-light leading-[1.42] text-[#303a50]">
                      {localizeDigits(row.text, lang)}
                    </p>
                  </div>

                  <div className="pointer-events-none absolute right-0 top-0 h-full w-[clamp(2.4rem,6vw,7rem)] opacity-18 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:18px_18px]" />
                </article>
              );
            })}
          </section>
        </div>
      </section>
    </main>
  );
}