import React from "react";
import { ArrowRight, Landmark, Map, Mountain, UsersRound } from "lucide-react";
import en from "@/data/en.json";
import ar from "@/data/ar.json";
import ku from "@/data/ku.json";
import { localizeDigits } from "@/lib/utils";

type DiscoverSectionId = "people" | "journey" | "system" | "landFuture";

type LangCode = "ku" | "en" | "ar";
const CONTENT = { en, ar, ku } as const;

const sectionIcons: Record<DiscoverSectionId, typeof UsersRound> = {
  people: UsersRound,
  journey: Map,
  system: Landmark,
  landFuture: Mountain,
};

const sectionImages: Record<DiscoverSectionId, string> = {
  people: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=90",
  journey: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=90",
  system: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=90",
  landFuture: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=90",
};

const fallbackSections: {
  id: DiscoverSectionId;
  title: string;
  desc: string;
}[] = [
  {
    id: "people",
    title: "The People",
    desc: "Identity, culture,\nand resilience",
  },
  {
    id: "journey",
    title: "The Journey",
    desc: "From 1991 to\nthe present",
  },
  {
    id: "system",
    title: "The System",
    desc: "Parliament, government,\nand leadership",
  },
  {
    id: "landFuture",
    title: "The Land and Future",
    desc: "Geography, symbols,\nprotection, and progress",
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
  lang?: LangCode;
  onStartExploring?: () => void;
  onSelectSection?: (section: DiscoverSectionId) => void;
};

export default function DiscoverKurdistan({ lang = "en", onStartExploring, onSelectSection }: DiscoverKurdistanProps) {
  const data = CONTENT[lang] as any;
  const discover = data?.discover ?? {};
  const localizedSections = Array.isArray(discover.sections)
    ? discover.sections.map((section: { id: DiscoverSectionId; title: string; desc: string }) => ({
        id: section.id,
        title: section.title,
        desc: section.desc,
      }))
    : fallbackSections;

  return (
    <main className="min-h-screen w-full overflow-hidden bg-[#f8f1e4] text-[#18362d]">
      <section className="relative mx-auto flex min-h-screen w-full max-w-[1080px] flex-col overflow-hidden bg-[#fbf5ea] px-12 py-12">
        {/* Background image */}
        <img
          src="https://images.pexels.com/photos/18040523/pexels-photo-18040523.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center opacity-40"
        />

        {/* Light cream overlay */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-[#fbf5ea]/55" />

        {/* Bottom fade */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-[#fbf5ea]/85 via-transparent to-[#fbf5ea]/65" />
        {/* Main content fills vertical space */}
        <div className="relative z-10 flex flex-1 flex-col justify-between pt-20">
          <div className="text-center">
            <div className="mb-6 flex items-center justify-center gap-12 text-[#c49b52]">
              <span className="h-0.5 w-150 max-w-[150px] bg-[#c49b52]" />
              <div className="flex flex-col items-center w-full">
                {/* <span className="mb-2 h-8 w-full rounded-sm bg-red-500" /> */}
                <span className="text-8xl leading-none">✹</span>
                {/* <span className="mt-2 h-8 w-full rounded-sm bg-green-500" /> */}
              </div>
              <span className="h-0.5 w-150 max-w-[150px] bg-[#c49b52]" />
            </div>

            <h1 className="font-serif text-[84px] leading-none tracking-tight text-[#18362d]">{discover.title ?? "Discover Kurdistan"}</h1>

            <p className="mx-auto mt-8 max-w-[760px] font-light text-[28px] leading-[1.45] text-[#424c48]">
              {discover.subtitle ?? "A short journey through the people, identity, history, institutions, and future of the Kurdistan Region."}
            </p>

            <div className="mx-auto mt-10 flex max-w-[420px] items-center gap-6 text-[#c49b52]">
              <span className="h-0.5 flex-1 bg-[#d6bd83]" />
              <span className="h-5 w-5 rotate-45 bg-[#c49b52]" />
              <span className="h-0.5 flex-1 bg-[#d6bd83]" />
            </div>

            <p className="mx-auto mt-8 max-w-[650px] font-light text-[28px] leading-[1.45] text-[#4d5652]">
              {discover.description ?? "This interactive experience offers visitors a simple introduction to Kurdistan and its story."}
            </p>

            <button
              type="button"
              onClick={onStartExploring}
              className="mt-9 inline-flex min-w-[520px] items-center justify-center gap-14 rounded-[22px] border-4 border-[#d0a660] bg-[#0f442f] px-12 py-8 font-serif text-[43px] text-[#f6d995] shadow-[0_12px_28px_rgba(57,35,6,0.28)]"
            >
              {discover.startExploring ?? "Start Exploring"}
              <ArrowRight size={52} strokeWidth={1.7} />
            </button>
          </div>

          <div>
            <div className="mb-6 flex items-center justify-center gap-5 font-serif text-[30px] text-[#2d3d35]">
              <span className="h-0.5 w-74 max-w-[74px] bg-[#c8a05a]" />
              <span className="h-4 w-4 rotate-45 border-2 border-[#c8a05a]" />
              <span>{discover.chooseSection ?? "Choose a section to begin"}</span>
              <span className="h-4 w-4 rotate-45 border-2 border-[#c8a05a]" />
              <span className="h-0.5 w-74 max-w-[74px] bg-[#c8a05a]" />
            </div>

            <div className="grid grid-cols-2 gap-8">
              {localizedSections.map((section) => {
                const Icon = sectionIcons[section.id];
                return (
                  <button
                    key={section.title}
                    type="button"
                    onClick={() => onSelectSection?.(section.id)}
                    className="relative overflow-hidden rounded-[20px] border-2 border-[#e1bf7a] bg-[#fffaf0] text-center shadow-[0_10px_30px_rgba(84,54,16,0.16)] transition active:scale-[0.98]"
                  >
                    <img src={sectionImages[section.id]} alt={section.title} className="h-[240px] w-full object-cover" />
                    <GoldIcon className="absolute left-1/2 top-[202px] h-24 w-24 -translate-x-1/2">
                      <Icon size={48} strokeWidth={1.6} />
                    </GoldIcon>
                    <div className="relative min-h-[160px] px-12 pb-7 pt-14">
                      <h3 className="font-serif text-[34px] font-semibold leading-tight text-[#18362d]">{localizeDigits(section.title, lang)}</h3>
                      <p className="mt-2 whitespace-pre-line text-[23px] leading-tight text-[#5f6662]">{localizeDigits(section.desc, lang)}</p>
                      <ArrowRight className="absolute right-8 top-1/2 text-[#b88b43]" size={40} strokeWidth={1.8} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
