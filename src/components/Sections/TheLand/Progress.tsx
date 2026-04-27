import React from "react";
import { ArrowLeft, ArrowRight, BarChart3, GraduationCap, MonitorCog, Mountain, Route } from "lucide-react";

const topCards = [
  {
    title: "Infrastructure",
    text: "Building modern roads, utilities, and public services.",
    icon: Route,
    color: "#13213b",
  },
  {
    title: "Education",
    text: "Investing in knowledge and empowering future generations.",
    icon: GraduationCap,
    color: "#405846",
  },
  {
    title: "Economy",
    text: "Driving sustainable growth and job creation.",
    icon: BarChart3,
    color: "#963538",
  },
];

const bottomCards = [
  {
    title: "Tourism",
    text: "Showcasing Kurdistan's beauty and cultural heritage.",
    icon: Mountain,
    color: "#c69237",
  },
  {
    title: "Digital Transformation",
    text: "Embracing technology and innovation for a smarter future.",
    icon: MonitorCog,
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

function ProgressCard({ card, large = false }) {
  const Icon = card.icon;

  return (
    <article
      className={`relative flex flex-col items-center overflow-hidden rounded-[24px] border-2 border-[#ead8b7] bg-white/82 px-8 py-10 text-center shadow-[0_14px_35px_rgba(84,54,16,0.16)] backdrop-blur-md ${
        large ? "min-h-[365px]" : "min-h-[410px]"
      }`}
    >
      <div
        className="grid h-28 w-28 place-items-center rounded-full border-[6px] border-white text-[#f8e5b8] shadow-[0_8px_20px_rgba(0,0,0,0.16)] ring-2 ring-[#e1c496]"
        style={{ backgroundColor: card.color }}
      >
        <Icon size={58} strokeWidth={1.45} />
      </div>

      <h3 className="mt-10 font-serif text-[34px] font-semibold leading-tight text-[#17233b]">
        {card.title}
      </h3>

      <div className="my-5 w-32">
        <Divider />
      </div>

      <p className="max-w-[270px] text-[21px] font-medium leading-[1.45] text-[#35435b]">
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
}

type ProgressPageProps = {
  onBack?: () => void;
};

export default function ProgressPage({ onBack }: ProgressPageProps) {
  return (
    <main className="min-h-screen w-full bg-[#f8f1e7] text-[#17233b]">
      <section className="relative mx-auto flex min-h-screen w-full max-w-[1080px] flex-col overflow-hidden bg-[#fbf5eb] px-12 py-12">
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

        {/* Replace this with your generated progress/city background */}
        <div className="pointer-events-none absolute inset-x-0 top-[120px] h-[820px]">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=90"
            alt="Progress city placeholder"
            className="absolute inset-0 h-full w-full object-cover opacity-78 [mask-image:linear-gradient(to_bottom,black_0%,black_74%,transparent_100%)]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fbf5eb] via-[#fbf5eb]/22 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[260px] bg-gradient-to-b from-transparent to-[#fbf5eb]" />
        </div>

        <div className="relative z-10 flex flex-1 flex-col">
          {/* Hero */}
          <section className="max-w-[560px] pt-16">
            <h1 className="font-serif text-[105px] font-semibold leading-none tracking-tight text-[#17233b]">
              Progress
            </h1>

            <p className="mt-8 text-[34px] font-bold leading-tight text-[#9b6d35]">
              Development across key sectors.
            </p>

            <div className="mt-10 w-[230px]">
              <Divider />
            </div>

            <p className="mt-10 max-w-[520px] text-[28px] font-medium leading-[1.55] text-[#2d3549]">
              The Kurdistan Region continues to advance through infrastructure, education, economy, tourism, and digital transformation.
            </p>
          </section>

          <div className="flex-1" />

          {/* Top 3 cards */}
          <section className="grid grid-cols-3 gap-8 pb-8">
            {topCards.map((card) => (
              <ProgressCard key={card.title} card={card} />
            ))}
          </section>

          {/* Bottom 2 centered cards */}
          <section className="mx-auto grid w-[760px] grid-cols-2 gap-8 pb-4">
            {bottomCards.map((card) => (
              <ProgressCard key={card.title} card={card} large />
            ))}
          </section>
        </div>
      </section>
    </main>
  );
}
