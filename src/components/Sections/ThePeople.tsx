import React from "react";
import { ArrowLeft, ArrowRight, Grid2X2, Landmark, Sparkles, Sun } from "lucide-react";

const cards = [
  {
    title: "Who Are\nthe Kurds?",
    description:
      "An ancient people of the Middle East known for courage, hospitality, and cultural richness.",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=90",
    icon: Landmark,
  },
  {
    title: "A Shared\nIdentity",
    description:
      "A people connected by language, history, tradition, and collective memory.",
    image:
      "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=900&q=90",
    icon: Grid2X2,
  },
  {
    title: "A Story of\nResilience",
    description:
      "A history shaped by endurance, dignity, and hope.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=90",
    icon: Sun,
  },
];

function GoldButton({ children, active = false }) {
  return (
    <button
      className={`flex min-w-[280px] items-center justify-center gap-5 rounded-[20px] border-2 px-8 py-7 text-[30px] font-medium shadow-md transition ${
        active
          ? "border-[#d4af63] bg-gradient-to-b from-[#ecd7a2] to-[#d4af63] text-[#2c342f]"
          : "border-[#d9b976] bg-[#fbf7ef] text-[#24362f]"
      }`}
    >
      {children}
    </button>
  );
}

function CircleIcon({ Icon }) {
  return (
    <div className="absolute left-1/2 top-[250px] grid h-24 w-24 -translate-x-1/2 place-items-center rounded-full border-2 border-[#ead8b3] bg-white shadow-[0_8px_22px_rgba(84,54,16,0.18)]">
      <Icon size={42} className="text-[#c7a04e]" strokeWidth={1.6} />
    </div>
  );
}

export default function ThePeoplePage() {
  return (
    <main className="min-h-screen w-full bg-[#f9f3e7] text-[#1e352d]">
      <section className="relative mx-auto flex min-h-screen w-full max-w-[1080px] flex-col overflow-hidden bg-[#fcf7ed] px-10 py-10">
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(#d7b56c_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="absolute inset-x-0 top-[300px] h-[520px] bg-[url('https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-22" />
        <div className="absolute inset-x-0 top-[260px] h-[620px] bg-gradient-to-b from-transparent via-[#fcf7ed]/20 to-[#fcf7ed]" />

        {/* Hero */}
        <header className="relative z-10 pt-8 text-center">
          <h1 className="font-serif text-[110px] font-semibold leading-none tracking-tight text-[#1d342d]">
            The People
          </h1>

          <div className="mx-auto mt-6 flex max-w-[520px] items-center justify-center gap-6 text-[#c8a05a]">
            <span className="h-0.5 flex-1 bg-[#d5b773]" />
            <Sparkles size={28} />
            <span className="h-0.5 flex-1 bg-[#d5b773]" />
          </div>

          <p className="mx-auto mt-8 max-w-[760px] text-[28px] leading-relaxed text-[#49524e]">
            Discover who the Kurds are and the values, identity,
            and resilience that shape their story.
          </p>
        </header>

        Character Showcase
        <div className="relative z-10 mt-10 flex justify-center">
          <img
            src="https://images.pexels.com/photos/11972899/pexels-photo-11972899.jpeg"
            alt="Kurdish people"
            className="h-[540px] w-full rounded-[28px] object-cover shadow-[0_18px_40px_rgba(84,54,16,0.18)]"
          />
          <div className="absolute inset-0 rounded-[28px] bg-gradient-to-t from-[#fcf7ed] via-transparent to-transparent" />
        </div>

        {/* Cards */}
        <div className="relative z-10 mt-10 grid grid-cols-3 gap-7">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="relative overflow-hidden rounded-[22px] border-2 border-[#e4c78f] bg-white shadow-[0_10px_30px_rgba(84,54,16,0.14)]"
              >
                <img src={card.image} alt={card.title} className="h-[290px] w-full object-cover" />
                <CircleIcon Icon={Icon} />
                <div className="min-h-[360px] px-8 pb-10 pt-20 text-center">
                  <h3 className="whitespace-pre-line font-serif text-[34px] font-semibold leading-tight text-[#1f352d]">
                    {card.title}
                  </h3>

                  <div className="mx-auto my-5 flex max-w-[140px] items-center justify-center gap-3 text-[#c7a04e]">
                    <span className="h-0.5 flex-1 bg-[#d7bc81]" />
                    <span className="h-3 w-3 rotate-45 border border-[#c7a04e]" />
                    <span className="h-0.5 flex-1 bg-[#d7bc81]" />
                  </div>

                  <p className="text-[24px] leading-relaxed text-[#59625d]">
                    {card.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
