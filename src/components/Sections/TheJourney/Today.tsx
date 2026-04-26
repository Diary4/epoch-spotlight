import React from "react";
import { BarChart3, GraduationCap, Mountain, Waves } from "lucide-react";

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

export default function TodayDevelopmentPage() {
  return (
    <main className="min-h-screen w-full bg-[#f8f1e7] text-[#17233b]">
      <section className="relative mx-auto flex min-h-screen w-full max-w-[1080px] flex-col overflow-hidden bg-[#fbf5eb]">
        <div className="absolute inset-0 opacity-18 [background-image:radial-gradient(#d7b56c_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute left-0 top-[120px] h-full w-24 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute right-0 top-[120px] h-full w-24 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

        {/* Hero city/future image placeholder: replace later with your generated image */}
        <div className="pointer-events-none absolute right-0 top-[120px] h-[930px] w-[880px]">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=90"
            alt="Today Kurdistan future city placeholder"
            className="absolute inset-0 h-full w-full object-cover opacity-76 [mask-image:radial-gradient(circle_at_62%_48%,black_0%,black_56%,transparent_84%)]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fbf5eb] via-[#fbf5eb]/22 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fbf5eb]" />
        </div>

        <div className="relative z-10 flex flex-1 flex-col px-14 pt-14 pb-14">
          <section className="max-w-[500px]">
            <h1 className="font-serif text-[120px] font-semibold leading-none tracking-tight text-[#17233b]">
              Today
            </h1>

            <p className="mt-8 text-[38px] font-bold leading-tight text-[#9b6d35]">
              Growth, development,<br />and vision.
            </p>

            <div className="mt-10 flex w-[230px] items-center gap-4 text-[#b99152]">
              <span className="h-0.5 flex-1 bg-[#b99152]" />
              <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
            </div>

            <p className="mt-10 max-w-[475px] text-[29px] font-medium leading-[1.52] text-[#2d3549]">
              Kurdistan is building a stronger tomorrow through progress, unity, and opportunity.
            </p>
          </section>

          <div className="flex-1" />

          <section className="grid grid-cols-2 gap-8">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  className="relative flex min-h-[250px] items-center overflow-hidden rounded-[24px] border-2 border-[#ead8b7] bg-white/76 px-8 py-8 shadow-[0_14px_35px_rgba(84,54,16,0.13)] backdrop-blur-md"
                >
                  <div className="flex w-[160px] justify-center">
                    <div className={`grid h-28 w-28 place-items-center rounded-full border-[6px] border-white ${card.color} text-[#f8e5b8] shadow-[0_8px_20px_rgba(0,0,0,0.16)]`}>
                      <Icon size={58} strokeWidth={1.5} />
                    </div>
                  </div>

                  <div className="h-[120px] w-px bg-[#e2c99b]" />

                  <div className="px-8">
                    <h3 className="whitespace-pre-line font-serif text-[36px] font-semibold leading-[0.98] text-[#17233b]">
                      {card.title}
                    </h3>
                    <p className="mt-4 max-w-[270px] text-[22px] font-medium leading-[1.38] text-[#303a50]">
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
