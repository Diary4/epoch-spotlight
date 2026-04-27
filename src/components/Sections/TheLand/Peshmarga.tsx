import React from "react";
import { ArrowLeft, ArrowRight, Bird, Shield, ShieldCheck, UsersRound } from "lucide-react";

const cards = [
  {
    title: "Defending\nthe Region",
    text: "Standing in defense of Kurdistan and its people.",
    icon: Shield,
    color: "#963538",
  },
  {
    title: "Protecting\nCivilians",
    text: "Supporting safety during times of crisis.",
    icon: UsersRound,
    color: "#405846",
  },
  {
    title: "Standing Against\nTerrorism",
    text: "Playing an important role against extremism.",
    icon: Bird,
    color: "#13213b",
  },
];

function Divider({ className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-4 text-[#b99152] ${className}`}>
      <span className="h-0.5 flex-1 bg-[#b99152]" />
      <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
      <span className="h-0.5 flex-1 bg-[#b99152]" />
    </div>
  );
}

type PeshmergaPageProps = {
  onBack?: () => void;
};

export default function PeshmergaPage({ onBack }: PeshmergaPageProps) {
  return (
    <main className="min-h-screen w-full bg-[#f8f1e7] text-[#17233b]">
      <section className="relative mx-auto flex min-h-screen w-full max-w-[1080px] flex-col overflow-hidden bg-[#fbf5eb] px-14 py-12">
        <button
          type="button"
          onClick={onBack}
          className="absolute left-8 top-8 z-30 grid h-14 w-14 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm"
          aria-label="Back to The Land and Future"
        >
          <ArrowLeft size={28} />
        </button>
        <div className="absolute inset-0 opacity-16 [background-image:radial-gradient(#d7b56c_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute left-0 top-0 h-full w-28 opacity-22 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

        {/* Replace this with your generated Peshmerga background image */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1040px]">
          <img
            src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1700&q=90"
            alt="Peshmerga landscape placeholder"
            className="absolute inset-0 h-full w-full object-cover opacity-78 [mask-image:linear-gradient(to_bottom,black_0%,black_72%,transparent_100%)]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fbf5eb] via-[#fbf5eb]/22 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[260px] bg-gradient-to-b from-transparent to-[#fbf5eb]" />
        </div>

        <div className="relative z-10 flex flex-1 flex-col">
          {/* Hero */}
          <section className="max-w-[540px] pt-28">
            <h1 className="font-serif text-[92px] font-semibold leading-none tracking-tight text-[#17233b]">
              Peshmerga
            </h1>

            <p className="mt-9 text-[34px] font-bold leading-tight text-[#9b6d35]">
              A symbol of courage,<br />protection, and service.
            </p>

            <div className="mt-10 w-[230px]">
              <Divider />
            </div>

            <p className="mt-10 max-w-[465px] text-[29px] font-medium leading-[1.58] text-[#2d3549]">
              The Peshmerga have played an important role in defending the Kurdistan Region and protecting civilians.
            </p>
          </section>

          <div className="flex-1" />

          {/* Cards */}
          <section className="grid grid-cols-3 gap-8 pb-6">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  className="relative flex min-h-[520px] flex-col items-center overflow-hidden rounded-[24px] border-2 border-[#ead8b7] bg-white/82 px-8 py-10 text-center shadow-[0_14px_35px_rgba(84,54,16,0.16)] backdrop-blur-md"
                >
                  <div
                    className="grid h-30 w-30 place-items-center rounded-full border-[6px] border-white text-[#f8e5b8] shadow-[0_8px_20px_rgba(0,0,0,0.16)] ring-2 ring-[#e1c496]"
                    style={{ backgroundColor: card.color }}
                  >
                    <Icon size={62} strokeWidth={1.45} />
                  </div>

                  <h3 className="mt-10 whitespace-pre-line font-serif text-[34px] font-semibold leading-[1.02]" style={{ color: card.color }}>
                    {card.title}
                  </h3>

                  <div className="my-8 w-32">
                    <Divider />
                  </div>

                  <p className="text-[23px] font-medium leading-[1.45] text-[#35435b]">
                    {card.text}
                  </p>

                  <button
                    className="mt-auto grid h-16 w-16 place-items-center rounded-full text-white shadow-md ring-4 ring-white"
                    style={{ backgroundColor: card.color }}
                  >
                    <ArrowRight size={36} />
                  </button>

                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 opacity-22 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:18px_18px]" />
                </article>
              );
            })}
          </section>
        </div>
      </section>
    </main>
  );
}
