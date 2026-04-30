import React from "react";
import { ArrowLeft, BarChart3, Landmark, UsersRound } from "lucide-react";
import en from "@/data/en.json";
import ar from "@/data/ar.json";
import ku from "@/data/ku.json";

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
  const data = CONTENT[lang] as any;
  const section: JourneySection =
    data?.journey?.sections?.["1991"] ?? data?.people?.sections?.["1991"] ?? {};
  const localizedCards = cards.map((card, i) => ({
    ...card,
    title: (section.cards?.[i]?.title ?? card.title).replace(" ", "\n"),
    text: section.cards?.[i]?.description ?? card.text,
  }));

  return (
    <main className="m-0 min-h-screen w-[100vw] max-w-none bg-[#f8f1e7] px-[2vw] py-[1.8vh] text-[#17233b]">
      <section className="relative mx-auto flex min-h-screen w-[min(95vw,1400px)] flex-col overflow-hidden rounded-[22px] bg-[#fbf5eb]">
        <button
          type="button"
          onClick={onBack}
          className="absolute left-[clamp(1rem,2vw,2rem)] top-[clamp(1rem,2vh,2rem)] z-30 grid h-[clamp(2.8rem,4.4vw,3.8rem)] w-[clamp(2.8rem,4.4vw,3.8rem)] place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm"
          aria-label="Back to The Journey"
        >
          <ArrowLeft size={32} />
        </button>
        <div className="absolute inset-0 opacity-18 [background-image:radial-gradient(#d7b56c_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute left-0 top-[120px] h-full w-24 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute right-0 top-[120px] h-full w-24 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

        {/* Background hero image placeholder */}
        <div className="pointer-events-none absolute right-0 top-[7.5vh] h-[min(72vh,980px)] w-[min(63vw,980px)]">
          <img
            src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=90"
            alt="1991 background placeholder"
            className="absolute inset-0 h-full w-full object-cover opacity-78 [mask-image:radial-gradient(circle_at_58%_48%,black_0%,black_55%,transparent_84%)]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fbf5eb] via-[#fbf5eb]/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fbf5eb]" />
        </div>

        <div className="relative z-10 flex flex-1 flex-col px-[clamp(1.4rem,4vw,4rem)] pt-[clamp(1.2rem,4vh,3.5rem)] pb-[clamp(1.2rem,3vh,2.6rem)]">
          {/* Text */}
          <section className="max-w-[min(46vw,720px)]">
            <h1 className="font-serif text-[clamp(6rem,11vw,10rem)] font-semibold leading-none tracking-tight text-[#17233b]">
              {section.title ?? "1991"}
            </h1>

            <p className="mt-[clamp(1rem,2.2vh,2rem)] text-[clamp(1.65rem,2.75vw,2.7rem)] font-bold leading-tight text-[#9b6d35]">
              {section.headline ?? "A historic turning point."}
            </p>

            <div className="mt-[clamp(1rem,2.3vh,2rem)] flex w-[clamp(9rem,18vw,14.5rem)] items-center gap-4 text-[#b99152]">
              <span className="h-0.5 flex-1 bg-[#b99152]" />
              <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
            </div>

            <p className="mt-[clamp(1rem,2.4vh,2rem)] max-w-[min(38vw,590px)] text-[clamp(1.2rem,2vw,1.95rem)] font-medium leading-[1.55] text-[#2d3549]">
              {section.description ?? "A moment of courage and unity that opened the path to a new chapter for the Kurdistan Region."}
            </p>
          </section>

          {/* Spacer keeps card block near bottom like reference */}
          <div className="flex-[0.85]" />

          {/* Cards */}
          <section className="grid grid-cols-3 gap-[clamp(0.85rem,1.8vw,2.1rem)]">
            {localizedCards.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  className="relative flex min-h-[clamp(23rem,37vh,33rem)] flex-col items-center overflow-hidden rounded-[26px] border-2 border-[#ead8b7] bg-white/76 px-[clamp(0.95rem,1.9vw,2rem)] py-[clamp(1rem,2.2vh,2rem)] text-center shadow-[0_14px_35px_rgba(84,54,16,0.15)] backdrop-blur-md"
                >
                  <div className={`grid h-[clamp(4.1rem,7.5vw,7.2rem)] w-[clamp(4.1rem,7.5vw,7.2rem)] place-items-center rounded-full border-[6px] border-white ${card.color} text-[#f8e5b8] shadow-[0_8px_20px_rgba(0,0,0,0.16)]`}>
                    <Icon size={56} strokeWidth={1.5} />
                  </div>

                  <h3 className="mt-[clamp(0.8rem,1.8vh,1.9rem)] whitespace-pre-line font-serif text-[clamp(1.5rem,2.7vw,2.5rem)] font-semibold leading-[0.98] text-[#17233b]">
                    {card.title}
                  </h3>

                  <div className="my-[clamp(0.75rem,1.6vh,1.7rem)] flex w-[clamp(4.8rem,10vw,8rem)] items-center justify-center gap-3 text-[#b99152]">
                    <span className="h-0.5 flex-1 bg-[#d2b475]" />
                    <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
                    <span className="h-0.5 flex-1 bg-[#d2b475]" />
                  </div>

                  <p className="text-[clamp(1.02rem,1.58vw,1.5rem)] font-medium leading-[1.5] text-[#303a50]">
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
