import React from "react";
import { BarChart3, Landmark, UsersRound } from "lucide-react";

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

export default function Year1991Page() {
  return (
    <main className="min-h-screen w-full bg-[#f8f1e7] text-[#17233b]">
      <section className="relative mx-auto flex min-h-screen w-full max-w-[1080px] flex-col overflow-hidden bg-[#fbf5eb]">
        <div className="absolute inset-0 opacity-18 [background-image:radial-gradient(#d7b56c_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute left-0 top-[120px] h-full w-24 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute right-0 top-[120px] h-full w-24 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

        {/* Background hero image placeholder */}
        <div className="pointer-events-none absolute right-0 top-[120px] h-[900px] w-[860px]">
          <img
            src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=90"
            alt="1991 background placeholder"
            className="absolute inset-0 h-full w-full object-cover opacity-78 [mask-image:radial-gradient(circle_at_58%_48%,black_0%,black_55%,transparent_84%)]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fbf5eb] via-[#fbf5eb]/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fbf5eb]" />
        </div>

        <div className="relative z-10 flex flex-1 flex-col px-14 pt-14 pb-14">
          {/* Text */}
          <section className="max-w-[540px]">
            <h1 className="font-serif text-[150px] font-semibold leading-none tracking-tight text-[#17233b]">
              1991
            </h1>

            <p className="mt-7 text-[39px] font-bold leading-tight text-[#9b6d35]">
              A historic turning point.
            </p>

            <div className="mt-10 flex w-[230px] items-center gap-4 text-[#b99152]">
              <span className="h-0.5 flex-1 bg-[#b99152]" />
              <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
            </div>

            <p className="mt-10 max-w-[455px] text-[30px] font-medium leading-[1.55] text-[#2d3549]">
              A moment of courage and unity that opened the path to a new chapter for the Kurdistan Region.
            </p>
          </section>

          {/* Spacer keeps card block near bottom like reference */}
          <div className="flex-1" />

          {/* Cards */}
          <section className="grid grid-cols-3 gap-9">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  className="relative flex min-h-[520px] flex-col items-center overflow-hidden rounded-[26px] border-2 border-[#ead8b7] bg-white/76 px-8 py-10 text-center shadow-[0_14px_35px_rgba(84,54,16,0.15)] backdrop-blur-md"
                >
                  <div className={`grid h-28 w-28 place-items-center rounded-full border-[6px] border-white ${card.color} text-[#f8e5b8] shadow-[0_8px_20px_rgba(0,0,0,0.16)]`}>
                    <Icon size={60} strokeWidth={1.5} />
                  </div>

                  <h3 className="mt-9 whitespace-pre-line font-serif text-[39px] font-semibold leading-[0.98] text-[#17233b]">
                    {card.title}
                  </h3>

                  <div className="my-7 flex w-32 items-center justify-center gap-3 text-[#b99152]">
                    <span className="h-0.5 flex-1 bg-[#d2b475]" />
                    <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
                    <span className="h-0.5 flex-1 bg-[#d2b475]" />
                  </div>

                  <p className="text-[23px] font-medium leading-[1.5] text-[#303a50]">
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
