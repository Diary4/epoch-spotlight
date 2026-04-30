import React from "react";
import { ArrowLeft, BarChart3, GraduationCap, Mountain, Waves } from "lucide-react";
import en from "@/data/en.json";
import ar from "@/data/ar.json";
import ku from "@/data/ku.json";

const cards = [
  {
    title: "Development",
    text: "Today, the Kurdistan Region continues to advance in infrastructure, education, and public services.",
    icon: Waves,
    color: "bg-[#c59a4b]",
  },
  {
    title: "Economy and\nInvestment",
    text: "Economic growth, business activity, and investment remain important parts of the Region’s future.",
    icon: BarChart3,
    color: "bg-[#405846]",
  },
  {
    title: "Youth and\nOpportunity",
    text: "A new generation is helping shape Kurdistan through learning, work, and innovation.",
    icon: GraduationCap,
    color: "bg-[#9d3637]",
  },
  {
    title: "Looking Ahead",
    text: "Kurdistan continues to look forward with resilience, ambition, and confidence.",
    icon: Mountain,
    color: "bg-[#13213b]",
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

type TodayDevelopmentPageProps = {
  lang?: LangCode;
  onBack?: () => void;
};

export default function TodayDevelopmentPage({ lang = "en", onBack }: TodayDevelopmentPageProps) {
  const data = CONTENT[lang] as any;
  const section: JourneySection =
    data?.journey?.sections?.today ?? data?.people?.sections?.today ?? {};
  const localizedCards = cards.map((card, i) => ({
    ...card,
    title: (section.cards?.[i]?.title ?? card.title).replace(" and ", " and\n"),
    text: section.cards?.[i]?.description ?? card.text,
  }));
  return (
    <main className="m-0 min-h-screen w-[100vw] max-w-none bg-[#f8f1e7] text-[#17233b]">
      <section className="relative mx-auto flex min-h-screen w-[min(100vw,1400px)] flex-col overflow-hidden rounded-[22px] bg-[#fbf5eb]">
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

        {/* Hero city/future image placeholder: replace later with your generated image */}
        <div className="pointer-events-none absolute right-0 top-[7.5vh] h-[min(73vh,1000px)] w-[min(64vw,980px)]">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=90"
            alt="Today Kurdistan future city placeholder"
            className="absolute inset-0 h-full w-full object-cover opacity-76 [mask-image:radial-gradient(circle_at_62%_48%,black_0%,black_56%,transparent_84%)]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fbf5eb] via-[#fbf5eb]/22 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fbf5eb]" />
        </div>

        <div className="relative z-10 flex flex-1 flex-col px-[clamp(1.4rem,4vw,4rem)] pt-[clamp(1.2rem,4vh,3.5rem)] pb-[clamp(1.2rem,3vh,2.6rem)]">
          <section className="max-w-[min(45vw,670px)]">
            <h1 className="font-serif text-[clamp(4.9rem,8.7vw,8.5rem)] font-semibold leading-none tracking-tight text-[#17233b]">
              {section.title ?? "Today"}
            </h1>

            <p className="mt-[clamp(1rem,2.2vh,2rem)] text-[clamp(1.6rem,2.65vw,2.65rem)] font-bold leading-tight text-[#9b6d35]">
              {section.headline ?? "Growth, development, and vision."}
            </p>

            <div className="mt-[clamp(1rem,2.3vh,2rem)] flex w-[clamp(9rem,18vw,14.5rem)] items-center gap-4 text-[#b99152]">
              <span className="h-0.5 flex-1 bg-[#b99152]" />
              <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
            </div>

            <p className="mt-[clamp(1rem,2.4vh,2rem)] max-w-[min(38vw,580px)] text-[clamp(1.15rem,1.95vw,1.9rem)] font-medium leading-[1.52] text-[#2d3549]">
              {section.description ?? "Kurdistan is building a stronger tomorrow through progress, unity, and opportunity."}
            </p>
          </section>

          <div className="flex-[0.86]" />

          <section className="grid grid-cols-2 gap-[clamp(0.8rem,1.7vw,1.9rem)]">
            {localizedCards.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  className="relative flex min-h-[clamp(11rem,19vh,17.5rem)] items-center overflow-hidden rounded-[24px] border-2 border-[#ead8b7] bg-white/76 px-[clamp(0.8rem,1.8vw,1.9rem)] py-[clamp(0.8rem,1.7vh,1.7rem)] shadow-[0_14px_35px_rgba(84,54,16,0.13)] backdrop-blur-md"
                >
                  <div className="flex w-[clamp(4.5rem,10vw,9rem)] justify-center">
                    <div className={`grid h-[clamp(3.85rem,7vw,6.8rem)] w-[clamp(3.85rem,7vw,6.8rem)] place-items-center rounded-full border-[6px] border-white ${card.color} text-[#f8e5b8] shadow-[0_8px_20px_rgba(0,0,0,0.16)]`}>
                      <Icon size={52} strokeWidth={1.5} />
                    </div>
                  </div>

                  <div className="h-[clamp(4.4rem,9.6vh,7.5rem)] w-px bg-[#e2c99b]" />

                  <div className="px-[clamp(0.7rem,1.5vw,1.8rem)]">
                    <h3 className="whitespace-pre-line font-serif text-[clamp(1.25rem,2.15vw,2.25rem)] font-semibold leading-[0.98] text-[#17233b]">
                      {card.title}
                    </h3>
                    <p className="mt-[clamp(0.4rem,0.9vh,0.85rem)] max-w-[min(24vw,420px)] text-[clamp(0.95rem,1.35vw,1.35rem)] font-medium leading-[1.38] text-[#303a50]">
                      {card.text}
                    </p>
                  </div>

                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 opacity-22 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:18px_18px]" />
                </article>
              );
            })}
          </section>
        </div>
      </section>
    </main>
  );
}
