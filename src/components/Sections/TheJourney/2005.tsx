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
    <main ref={rootRef} className="m-0 min-h-screen w-[100vw] max-w-none bg-[#f8f1e7] text-[#17233b]">
      <section className="relative mx-auto flex min-h-screen w-[min(100vw,1400px)] flex-col overflow-hidden rounded-[22px] bg-[#fbf5eb]">
        <button
          type="button"
          onClick={onBack}
          className="journey-detail-back absolute left-[clamp(1rem,2vw,2rem)] top-[clamp(1rem,2vh,2rem)] z-30 grid h-[clamp(2.8rem,4.4vw,3.8rem)] w-[clamp(2.8rem,4.4vw,3.8rem)] place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm"
          aria-label="Back to Journey"
        >
          <ArrowLeft size={32} />
        </button>
        <div className="absolute left-0 top-[120px] h-full w-24 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute right-0 top-[120px] h-full w-24 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

        {/* Main visual placeholder: replace with your generated 2005 constitution/legal image */}
        <div className="pointer-events-none absolute right-0 top-0 h-[min(100vh,1500px)] w-full">
          <img
            src={bg}
            alt="2005 recognition placeholder"
            className="journey-detail-hero absolute inset-0 h-full w-full object-cover opacity-78 [mask-image:radial-gradient(circle_at_60%_48%,black_0%,black_55%,transparent_84%)]"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-r from-[#fbf5eb] via-[#fbf5eb]/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fbf5eb]" /> */}
        </div>

        <div className="relative z-10 flex flex-1 flex-col px-[clamp(1.4rem,4vw,4rem)] pt-[clamp(1.5rem,5vh,4.5rem)] pb-[clamp(1.2rem,3vh,2.6rem)]">
          <section className="journey-detail-intro max-w-[min(46vw,700px)]">
            <h1 className="font-serif text-[clamp(6rem,11vw,10rem)] font-light leading-none tracking-tight text-[#17233b]">
              {localizeDigits(section.title ?? "2005", lang)}
            </h1>

            <p className="mt-[clamp(1rem,2.1vh,1.8rem)] text-[clamp(1.6rem,2.6vw,2.55rem)] font-light leading-tight text-[#9b6d35]">
              {section.headline ?? "Federal recognition within Iraq."}
            </p>

            <div className="mt-[clamp(1rem,2.3vh,2rem)] flex w-[clamp(9rem,18vw,14.5rem)] items-center gap-4 text-[#b99152]">
              <span className="h-0.5 flex-1 bg-[#b99152]" />
              <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
            </div>
          </section>

          <div className="flex-[0.88]" />

          <section className="space-y-[clamp(0.8rem,1.7vh,1.9rem)]">
            {localizedRows.map((row) => {
              const Icon = row.icon;
              return (
                <article
                  key={row.title}
                  className="journey-detail-card relative flex min-h-[clamp(9.2rem,16vh,13.5rem)] items-center rounded-[26px] border-2 border-[#ead8b7] bg-white/76 px-[clamp(1rem,2.1vw,2.5rem)] py-[clamp(0.9rem,1.9vh,1.8rem)] shadow-[0_14px_35px_rgba(84,54,16,0.13)] backdrop-blur-md"
                >
                  <div className="flex w-[clamp(5.6rem,13vw,11.5rem)] justify-center">
                    <div className={`grid h-[clamp(4.1rem,7.5vw,7rem)] w-[clamp(4.1rem,7.5vw,7rem)] place-items-center rounded-full border-[6px] border-white ${row.color} text-[#f8e5b8] shadow-[0_8px_20px_rgba(0,0,0,0.16)]`}>
                      <Icon size={54} strokeWidth={1.5} />
                    </div>
                  </div>

                  <div className="h-[clamp(4.5rem,9vh,7rem)] w-px bg-[#e2c99b]" />

                  <div className="px-[clamp(0.9rem,1.9vw,2.4rem)]">
                    <div className="flex items-center gap-[clamp(0.55rem,1.3vw,1.25rem)]">
                      <span className={`grid h-[clamp(2.15rem,3.5vw,3rem)] w-[clamp(2.15rem,3.5vw,3rem)] place-items-center rounded-full text-[clamp(1rem,1.75vw,1.75rem)] font-bold text-white ${row.color}`}>
                        {localizeDigits(row.number, lang)}
                      </span>
                      <h3 className="font-serif text-[clamp(1.35rem,2.45vw,2.45rem)] font-light leading-tight text-[#17233b]">
                        {localizeDigits(row.title, lang)}
                      </h3>
                    </div>

                    <p className="mt-[clamp(0.45rem,0.9vh,0.9rem)] max-w-[min(45vw,760px)] text-[clamp(1.02rem,1.58vw,1.5rem)] font-light leading-[1.42] text-[#303a50]">
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
