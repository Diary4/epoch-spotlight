import React from "react";
import { ArrowLeft, ArrowRight, Compass, Grid2X2, Home, Landmark, Map, Mountain, UsersRound } from "lucide-react";

const sections = [
  {
    title: "The People",
    desc: "Identity, culture,\nand resilience",
    icon: UsersRound,
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=90",
  },
  {
    title: "The Journey",
    desc: "From 1991 to\nthe present",
    icon: Map,
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=90",
  },
  {
    title: "The System",
    desc: "Parliament, government,\nand leadership",
    icon: Landmark,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=90",
  },
  {
    title: "The Land and Future",
    desc: "Geography, symbols,\nprotection, and progress",
    icon: Mountain,
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=90",
  },
];

function GoldIcon({ children, className = "" }) {
  return (
    <div className={`grid place-items-center rounded-full border-2 border-[#c8a05a] bg-[#104231] text-[#f6d995] shadow-[0_8px_24px_rgba(84,54,16,0.25)] ${className}`}>
      {children}
    </div>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-5">
      <div className="relative h-24 w-16">
        <div className="absolute left-0 top-8 h-16 w-6 bg-gradient-to-b from-[#e5c16f] to-[#a9782f]" />
        <div className="absolute right-0 top-8 h-16 w-6 bg-gradient-to-b from-[#e5c16f] to-[#a9782f]" />
        <div className="absolute left-2 top-0 h-16 w-12 rounded-t-full border-[18px] border-b-0 border-[#d5a84e]" />
      </div>
      <div className="leading-tight">
        <p className="text-[30px] font-semibold tracking-[0.08em] text-[#22372f]">GATE OF</p>
        <p className="text-[30px] font-semibold tracking-[0.08em] text-[#22372f]">KURDISTAN</p>
        <p className="text-[22px] tracking-[0.18em] text-[#b6883f]">GOK</p>
      </div>
    </div>
  );
}

type DiscoverKurdistanProps = {
  onStartExploring?: () => void;
};

export default function DiscoverKurdistan({ onStartExploring }: DiscoverKurdistanProps) {
  return (
    <main className="min-h-screen w-full overflow-hidden bg-[#f8f1e4] text-[#18362d]">
      <section className="relative mx-auto flex min-h-screen w-full max-w-[1080px] flex-col overflow-hidden bg-[#fbf5ea] px-12 py-12">
        <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(#d7b56c_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[620px] bg-[url('https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-20" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[700px] bg-gradient-to-t from-[#f8f1e4]/80 via-[#f8f1e4]/70 to-transparent" />

        {/* Header
        <header className="relative z-10 flex items-start justify-between">
          <Logo />

          <nav className="mt-8 flex items-center gap-8 text-[24px] text-[#38433e]">
            <span>Kurdish</span>
            <span className="h-10 w-px bg-[#c8a05a]" />
            <span className="border-b-4 border-[#c8a05a] pb-4 font-semibold text-[#b5853d]">English</span>
            <span className="h-10 w-px bg-[#c8a05a]" />
            <span>Arabic</span>
          </nav>

          <div className="mt-5 flex gap-5">
            <button className="grid h-18 w-18 place-items-center rounded-full border-2 border-[#b88b43] bg-white/45 text-[#18362d] shadow-sm">
              <Home size={34} />
            </button>
            <button className="grid h-18 w-18 place-items-center rounded-full border-2 border-[#b88b43] bg-white/45 text-[#18362d] shadow-sm">
              <ArrowLeft size={38} />
            </button>
          </div>
        </header> */}

        {/* Main content fills vertical space */}
        <div className="relative z-10 flex flex-1 flex-col justify-between pt-20">
          <div className="text-center">
            <div className="mb-6 flex items-center justify-center gap-12 text-[#c49b52]">
              <span className="h-0.5 w-150 max-w-[150px] bg-[#c49b52]" />
              <span className="text-8xl leading-none">✹</span>
              <span className="h-0.5 w-150 max-w-[150px] bg-[#c49b52]" />
            </div>

            <h1 className="font-serif text-[84px] font-semibold leading-none tracking-tight text-[#18362d]">
              Discover Kurdistan
            </h1>

            <p className="mx-auto mt-8 max-w-[760px] text-[28px] leading-[1.45] text-[#424c48]">
              A short journey through the people, identity, history,
              institutions, and future of the Kurdistan Region.
            </p>

            <div className="mx-auto mt-10 flex max-w-[420px] items-center gap-6 text-[#c49b52]">
              <span className="h-0.5 flex-1 bg-[#d6bd83]" />
              <span className="h-5 w-5 rotate-45 bg-[#c49b52]" />
              <span className="h-0.5 flex-1 bg-[#d6bd83]" />
            </div>

            <p className="mx-auto mt-8 max-w-[650px] text-[28px] leading-[1.45] text-[#4d5652]">
              This interactive experience offers visitors
              a simple introduction to Kurdistan and its story.
            </p>

            <button
              type="button"
              onClick={onStartExploring}
              className="mt-9 inline-flex min-w-[520px] items-center justify-center gap-14 rounded-[22px] border-4 border-[#d0a660] bg-[#0f442f] px-12 py-8 font-serif text-[43px] font-bold text-[#f6d995] shadow-[0_12px_28px_rgba(57,35,6,0.28)]"
            >
              Start Exploring
              <ArrowRight size={52} strokeWidth={1.7} />
            </button>
          </div>

          <div>
            <div className="mb-6 flex items-center justify-center gap-5 font-serif text-[30px] text-[#2d3d35]">
              <span className="h-0.5 w-74 max-w-[74px] bg-[#c8a05a]" />
              <span className="h-4 w-4 rotate-45 border-2 border-[#c8a05a]" />
              <span>Choose a section to begin</span>
              <span className="h-4 w-4 rotate-45 border-2 border-[#c8a05a]" />
              <span className="h-0.5 w-74 max-w-[74px] bg-[#c8a05a]" />
            </div>

            <div className="grid grid-cols-2 gap-8">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.title}
                    className="relative overflow-hidden rounded-[20px] border-2 border-[#e1bf7a] bg-[#fffaf0] text-center shadow-[0_10px_30px_rgba(84,54,16,0.16)] transition active:scale-[0.98]"
                  >
                    <img src={section.image} alt={section.title} className="h-[240px] w-full object-cover" />
                    <GoldIcon className="absolute left-1/2 top-[202px] h-24 w-24 -translate-x-1/2">
                      <Icon size={48} strokeWidth={1.6} />
                    </GoldIcon>
                    <div className="relative min-h-[160px] px-12 pb-7 pt-14">
                      <h3 className="font-serif text-[34px] font-semibold leading-tight text-[#18362d]">{section.title}</h3>
                      <p className="mt-2 whitespace-pre-line text-[23px] leading-tight text-[#5f6662]">{section.desc}</p>
                      <ArrowRight className="absolute right-8 top-1/2 text-[#b88b43]" size={40} strokeWidth={1.8} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <footer className="grid grid-cols-[1fr_120px_1fr] items-end pt-10 text-center">
            <button className="rounded-t-[70px] border-t-2 border-[#c8a05a] pt-6">
              <div className="mx-auto grid h-18 w-18 place-items-center rounded-full border-2 border-[#c8a05a] bg-white/40 text-[#18362d]">
                <Grid2X2 size={36} />
              </div>
              <h4 className="mt-4 font-serif text-[30px]">Main Menu</h4>
              <p className="text-[20px] text-[#6c706d]">Return to the main menu</p>
            </button>

            <div className="flex flex-col items-center text-[#c8a05a]">
              <div className="h-20 w-px bg-[#c8a05a]" />
              <div className="grid h-20 w-20 place-items-center border-2 border-[#c8a05a] bg-[#fbf5ea] rotate-45">
                <span className="rotate-[-45deg] text-3xl">✥</span>
              </div>
            </div>

            <button className="rounded-t-[70px] border-t-2 border-[#c8a05a] pt-6">
              <div className="mx-auto grid h-18 w-18 place-items-center rounded-full border-2 border-[#c8a05a] bg-white/40 text-[#18362d]">
                <Compass size={38} />
              </div>
              <h4 className="mt-4 font-serif text-[30px]">Explore More</h4>
              <p className="text-[20px] text-[#6c706d]">Continue your journey</p>
            </button>
          </footer>
        </div>
      </section>
    </main>
  );
}
