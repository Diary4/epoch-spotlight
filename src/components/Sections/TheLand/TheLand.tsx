import React from "react";
import { ArrowLeft, ArrowRight, MapPinned } from "lucide-react";

const mapCards = [
  {
    number: "1",
    title: "Kurdistan Region\nof Iraq",
    text: "Explore the officially recognized Kurdistan Region of Iraq — its governorates, major cities, and borders.",
    color: "#c69237",
    mapImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Iraqi_Kurdistan_in_Iraq_%28disputed_hatched%29.svg/1280px-Iraqi_Kurdistan_in_Iraq_%28disputed_hatched%29.svg.png",
  },
  {
    number: "2",
    title: "Disputed Areas",
    text: "Explore the disputed areas between Kurdistan and Iraq, shown here in pink.",
    color: "#963538",
    mapImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Iraqi_Kurdistan_in_Iraq_%28disputed_hatched%29.svg/1280px-Iraqi_Kurdistan_in_Iraq_%28disputed_hatched%29.svg.png",
  },
  {
    number: "3",
    title: "Kurdish Presence\nAcross Countries",
    text: "See the broader areas where Kurdish communities live across the region.",
    color: "#c69237",
    mapImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Kurdish-inhabited_area_by_CIA_%281992%29.jpg/1280px-Kurdish-inhabited_area_by_CIA_%281992%29.jpg",
  },
];

function Divider({ color = "#b99152" }) {
  return (
    <div className="mx-auto my-6 flex w-32 items-center justify-center gap-3" style={{ color }}>
      <span className="h-0.5 flex-1" style={{ backgroundColor: color }} />
      <span className="h-3 w-3 rotate-45 border-2" style={{ borderColor: color }} />
      <span className="h-0.5 flex-1" style={{ backgroundColor: color }} />
    </div>
  );
}

function MapCard({ card }) {
  return (
    <article className="grid min-h-[440px] grid-cols-[205px_1fr] overflow-hidden rounded-[26px] border-2 border-[#ead8b7] bg-white/72 shadow-[0_12px_32px_rgba(84,54,16,0.13)] backdrop-blur-md">
      <div className="flex flex-col items-center justify-center border-r border-[#ead8b7] px-7 py-8 text-center">
        <div
          className="grid h-20 w-20 place-items-center rounded-full border-[5px] border-white text-[34px] font-bold text-white shadow-md"
          style={{ backgroundColor: card.color }}
        >
          {card.number}
        </div>

        <Divider color={card.color} />

        <h3 className="whitespace-pre-line font-serif text-[24px] font-semibold leading-tight text-[#17233b]">
          {card.title}
        </h3>

        <p className="mt-6 text-[17px] font-semibold leading-[1.45] text-[#35435b]">
          {card.text}
        </p>

        <button
          className="mt-auto grid h-16 w-16 place-items-center rounded-full text-white shadow-md"
          style={{ backgroundColor: card.color }}
        >
          <ArrowRight size={34} />
        </button>
      </div>

      <div className="relative bg-[#f7efe2]">
        <img src={card.mapImage} alt={card.title.replace("\n", " ")} className="h-full w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-[#fbf5eb]/20 mix-blend-multiply" />
      </div>
    </article>
  );
}

type TheLandPageProps = {
  onBack?: () => void;
};

export default function TheLandPage({ onBack }: TheLandPageProps) {
  return (
    <main className="min-h-screen w-full bg-[#f8f1e7] text-[#17233b]">
      <section className="relative mx-auto flex min-h-screen w-full max-w-[1080px] overflow-hidden bg-[#fbf5eb] px-8 py-10">
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

        {/* Left scenic placeholder */}
        <div className="pointer-events-none absolute bottom-0 left-0 h-[850px] w-[420px]">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=90"
            alt="Kurdistan landscape placeholder"
            className="absolute inset-0 h-full w-full object-cover opacity-72 [mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_76%,transparent_100%)]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#fbf5eb]/25 to-[#fbf5eb]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#fbf5eb] via-transparent to-[#fbf5eb]" />
        </div>

        {/* Left text */}
        <aside className="relative z-10 flex w-[370px] shrink-0 flex-col pt-20 pl-6">
          <h1 className="font-serif text-[86px] font-semibold leading-[0.98] tracking-tight text-[#17233b]">
            The<br />Land
          </h1>

          <div className="mt-10 w-[230px]">
            <Divider />
          </div>

          <p className="mt-4 font-serif text-[30px] leading-tight text-[#9b6d35]">
            A region of beauty,<br />geography, and heritage.
          </p>

          <p className="mt-10 max-w-[285px] text-[21px] font-semibold leading-[1.55] text-[#35435b]">
            Kurdistan is a land of mountains, rivers, and rich history. From its heart in northern Iraq to the wider regions where Kurds live across the Middle East, this is a land defined by resilience, culture, and people.
          </p>

          <div className="mt-10 w-[150px]">
            <Divider />
          </div>
        </aside>

        {/* Right maps */}
        <section className="relative z-10 flex flex-1 flex-col gap-7 pl-4">
          {mapCards.map((card) => (
            <MapCard key={card.number} card={card} />
          ))}
        </section>
      </section>
    </main>
  );
}
