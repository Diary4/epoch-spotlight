import React from "react";
import { ArrowLeft, ArrowRight, Grid2X2, Landmark, Sparkles, Sun } from "lucide-react";

const cards: {
  id: ThePeopleCardId;
  title: string;
  description: string;
  image: string;
  icon: typeof Landmark;
}[] = [
  {
    id: "whoAreTheKurds",
    title: "Who Are\nthe Kurds?",
    description:
      "An ancient people of the Middle East known for courage, hospitality, and cultural richness.",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=90",
    icon: Landmark,
  },
  {
    id: "sharedIdentity",
    title: "A Shared\nIdentity",
    description:
      "A people connected by language, history, tradition, and collective memory.",
    image:
      "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=900&q=90",
    icon: Grid2X2,
  },
  {
    id: "resilience",
    title: "A Story of\nResilience",
    description:
      "A history shaped by endurance, dignity, and hope.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=90",
    icon: Sun,
  },
];

type ThePeopleCardId = "whoAreTheKurds" | "sharedIdentity" | "resilience";

type ThePeoplePageProps = {
  onSelectCard?: (cardId: ThePeopleCardId) => void;
  onBack?: () => void;
};

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
    <div className="absolute left-1/2 top-[184px] grid h-16 w-16 -translate-x-1/2 place-items-center rounded-full border-2 border-[#ead8b3] bg-white shadow-[0_8px_22px_rgba(84,54,16,0.18)] sm:top-[214px] sm:h-20 sm:w-20 lg:top-[250px] lg:h-24 lg:w-24">
      <Icon className="h-8 w-8 text-[#c7a04e] sm:h-10 sm:w-10 lg:h-[42px] lg:w-[42px]" strokeWidth={1.6} />
    </div>
  );
}

export default function ThePeoplePage({ onSelectCard, onBack }: ThePeoplePageProps) {
  return (
    <main className="m-0 flex min-h-screen w-screen justify-center bg-[#f9f3e7] p-0 text-[#1e352d]">
      <section className="relative flex min-h-screen w-[min(100vw,1400px)] flex-col overflow-hidden bg-[#fcf7ed] px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
        <button
          type="button"
          onClick={onBack}
          className="absolute left-4 top-4 z-30 grid h-12 w-12 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm sm:left-8 sm:top-8 sm:h-14 sm:w-14 lg:h-16 lg:w-16"
          aria-label="Back to Discover"
        >
          <ArrowLeft className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
        </button>
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(#d7b56c_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="absolute inset-x-0 top-[220px] h-[470px] bg-[url('https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-22 sm:top-[280px] sm:h-[520px] lg:top-[320px] lg:h-[620px]" />
        <div className="absolute inset-x-0 top-[190px] h-[560px] bg-gradient-to-b from-transparent via-[#fcf7ed]/20 to-[#fcf7ed] sm:top-[240px] sm:h-[620px] lg:top-[280px] lg:h-[720px]" />

        {/* Hero */}
        <header className="relative z-10 pt-10 text-center sm:pt-8 lg:pt-12">
          <h1 className="font-serif text-[60px] font-semibold leading-none tracking-tight text-[#1d342d] sm:text-[88px] lg:text-[118px]">
            The People
          </h1>

          <div className="mx-auto mt-5 flex max-w-[520px] items-center justify-center gap-4 text-[#c8a05a] sm:mt-6 sm:gap-6 lg:max-w-[620px]">
            <span className="h-0.5 flex-1 bg-[#d5b773]" />
            <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
            <span className="h-0.5 flex-1 bg-[#d5b773]" />
          </div>

          <p className="mx-auto mt-6 max-w-[980px] text-[20px] leading-relaxed text-[#49524e] sm:mt-8 sm:text-[28px] lg:text-[34px]">
            Discover who the Kurds are and the values, identity,
            and resilience that shape their story.
          </p>
        </header>

        <div className="relative z-10 mt-8 flex justify-center sm:mt-10 lg:mt-12">
          <img
            src="https://images.pexels.com/photos/11972899/pexels-photo-11972899.jpeg"
            alt="Kurdish people"
            className="h-[360px] w-full rounded-[24px] object-cover shadow-[0_18px_40px_rgba(84,54,16,0.18)] sm:h-[500px] sm:rounded-[28px] lg:h-[620px] lg:rounded-[32px]"
          />
          <div className="absolute inset-0 rounded-[24px] bg-gradient-to-t from-[#fcf7ed] via-transparent to-transparent sm:rounded-[28px] lg:rounded-[32px]" />
        </div>

        {/* Cards */}
        <div className="relative z-10 mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:mt-12 lg:grid-cols-3 lg:gap-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                type="button"
                key={card.title}
                onClick={() => {
                  if (card.id === "whoAreTheKurds") {
                    onSelectCard?.("whoAreTheKurds");
                  } else if (card.id === "sharedIdentity") {
                    onSelectCard?.("sharedIdentity");
                  } else if (card.id === "resilience") {
                    onSelectCard?.("resilience");
                  }
                }}
                className="relative overflow-hidden rounded-[20px] border-2 border-[#e4c78f] bg-white text-left shadow-[0_10px_30px_rgba(84,54,16,0.14)] lg:rounded-[22px]"
              >
                <img src={card.image} alt={card.title} className="h-[220px] w-full object-cover sm:h-[250px] lg:h-[300px]" />
                <CircleIcon Icon={Icon} />
                <div className="min-h-[300px] px-6 pb-8 pt-16 text-center sm:min-h-[320px] sm:px-8 sm:pb-10 sm:pt-20 lg:min-h-[390px]">
                  <h3 className="whitespace-pre-line font-serif text-[28px] font-semibold leading-tight text-[#1f352d] sm:text-[32px] lg:text-[36px]">
                    {card.title}
                  </h3>

                  <div className="mx-auto my-5 flex max-w-[140px] items-center justify-center gap-3 text-[#c7a04e]">
                    <span className="h-0.5 flex-1 bg-[#d7bc81]" />
                    <span className="h-3 w-3 rotate-45 border border-[#c7a04e]" />
                    <span className="h-0.5 flex-1 bg-[#d7bc81]" />
                  </div>

                  <p className="text-[20px] leading-relaxed text-[#59625d] sm:text-[22px] lg:text-[26px]">
                    {card.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </main>
  );
}
