import React from "react";
import { ArrowRight, Landmark, Map, Mountain, UsersRound } from "lucide-react";
import en from "@/data/en.json";
import ar from "@/data/ar.json";
import ku from "@/data/ku.json";
import { localizeDigits } from "@/lib/utils";
import gsap from "gsap";
import card1 from "@/assets/mainImages/discoverkurdistan/card-1.png"
import card2 from "@/assets/mainImages/discoverkurdistan/card-2.png"
import card3 from "@/assets/mainImages/discoverkurdistan/card-3.png"
import card4 from "@/assets/mainImages/discoverkurdistan/card-4.png"

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
  people: card1,
  journey: card2,
  system: card3,
  landFuture: card4,
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

type DiscoverKurdistanProps = {
  lang?: LangCode;
  onStartExploring?: () => void;
  onSelectSection?: (section: DiscoverSectionId) => void;
};

export default function DiscoverKurdistan({ lang = "en", onStartExploring, onSelectSection }: DiscoverKurdistanProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);

  const data = CONTENT[lang] as any;
  const discover = data?.discover ?? {};
  const localizedSections = Array.isArray(discover.sections)
    ? discover.sections.map((section: { id: DiscoverSectionId; title: string; desc: string }) => ({
        id: section.id,
        title: section.title,
        desc: section.desc,
      }))
    : fallbackSections;

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-intro-lineshape='true']", { autoAlpha: 0, y: -18 });
      gsap.set("[data-intro-title='true']", { autoAlpha: 0, y: 24 });
      gsap.set("[data-intro-rest='true']", { autoAlpha: 0, y: 20 });
      gsap.set("[data-intro-grid='true']", { autoAlpha: 0, y: 26 });
      gsap.set("[data-choose-line='true']", { scaleX: 0, transformOrigin: "center" });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.to("[data-intro-lineshape='true']", {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
      })
        .to(
          "[data-intro-title='true']",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.15",
        )
        .to(
          "[data-intro-rest='true']",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
          },
          "-=0.1",
        )
        .to(
          "[data-choose-line='true']",
          {
            scaleX: 1,
            duration: 0.7,
            stagger: 0.07,
          },
          "-=0.25",
        )
        .to(
          "[data-intro-grid='true']",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.95,
          },
          "-=0.2",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="m-0 flex min-h-screen w-screen justify-center overflow-hidden bg-[#f8f1e4] p-0 text-[#18362d]">
      <section ref={sectionRef} className="relative flex min-h-screen w-[min(100vw,1400px)] flex-col overflow-hidden bg-[#fbf5ea]">
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
        <div className="relative z-10 flex flex-1 flex-col justify-between px-6 pb-10 pt-12 sm:px-10 sm:pt-16 md:px-14 md:pb-12 md:pt-20 lg:px-16 lg:pb-14 lg:pt-24">
          <div className="text-center">
            <div data-intro-lineshape="true" className="mb-5 flex items-center justify-center gap-3 text-[#c49b52] sm:mb-6 sm:gap-6 md:gap-12 lg:mb-8">
              <span className="h-0.5 w-10 bg-[#c49b52] sm:w-20 md:max-w-[150px] md:flex-1 lg:max-w-[220px]" />
              <div className="flex w-full flex-col items-center">
                {/* <span className="mb-[-12px] h-4 w-full max-w-[1150px] rounded-sm bg-red-500 sm:mb-[-16px] sm:h-6 md:mb-[-20px] md:h-8 lg:h-9" /> */}
                <span className="text-5xl leading-none sm:text-6xl md:text-8xl lg:text-9xl">✹</span>
                {/* <span className="mt-[-8px] h-4 w-full max-w-[1150px] rounded-sm bg-green-500 sm:mt-[-12px] sm:h-6 md:mt-[-15px] md:h-8 lg:h-9" /> */}
              </div>
              <span className="h-0.5 w-10 bg-[#c49b52] sm:w-20 md:max-w-[150px] md:flex-1 lg:max-w-[220px]" />
            </div>

            <h1 data-intro-title="true" className="font-serif text-[42px] leading-none tracking-tight text-[#18362d] sm:text-[56px] md:text-[84px] lg:text-[102px]">{discover.title ?? "Discover Kurdistan"}</h1>

            <p data-intro-rest="true" className="mx-auto mt-5 max-w-[980px] px-1 text-[17px] leading-[1.5] text-[#424c48] sm:mt-6 sm:text-[22px] md:mt-8 md:px-0 md:text-[28px] lg:mt-10 lg:text-[33px]">
              {discover.subtitle ?? "A short journey through the people, identity, history, institutions, and future of the Kurdistan Region."}
            </p>

            <div data-intro-rest="true" className="mx-auto mt-6 flex max-w-[420px] items-center gap-4 text-[#c49b52] sm:mt-8 sm:gap-5 md:mt-10 md:gap-6 lg:mt-12 lg:max-w-[520px]">
              <span className="h-0.5 flex-1 bg-[#d6bd83]" />
              <span className="h-3.5 w-3.5 rotate-45 bg-[#c49b52] sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
              <span className="h-0.5 flex-1 bg-[#d6bd83]" />
            </div>

            <p data-intro-rest="true" className="mx-auto mt-5 max-w-[880px] px-1 text-[17px] leading-[1.5] text-[#4d5652] sm:mt-6 sm:text-[22px] md:mt-8 md:px-0 md:text-[28px] lg:text-[33px]">
              {discover.description ?? "This interactive experience offers visitors a simple introduction to Kurdistan and its story."}
            </p>
          </div>

          <div data-intro-rest="true" className="mt-10 md:mt-0">
            <div className="mb-4 flex items-center justify-center gap-2 font-serif text-[18px] text-[#2d3d35] sm:mb-5 sm:gap-3 sm:text-[23px] md:mb-6 md:gap-5 md:text-[30px] lg:mb-8 lg:text-[36px]">
              <span data-choose-line="true" className="h-0.5 w-8 bg-[#c8a05a] sm:w-12 md:w-74 md:max-w-[74px] lg:w-[108px]" />
              <span className="h-2.5 w-2.5 rotate-45 border border-[#c8a05a] sm:h-3 sm:w-3 md:h-4 md:w-4 md:border-2 lg:h-5 lg:w-5" />
              <span>{discover.chooseSection ?? "Choose a section to begin"}</span>
              <span className="h-2.5 w-2.5 rotate-45 border border-[#c8a05a] sm:h-3 sm:w-3 md:h-4 md:w-4 md:border-2 lg:h-5 lg:w-5" />
              <span data-choose-line="true" className="h-0.5 w-8 bg-[#c8a05a] sm:w-12 md:w-74 md:max-w-[74px] lg:w-[108px]" />
            </div>

            <div data-intro-grid="true" className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:gap-8 lg:gap-10">
              {localizedSections.map((section) => {
                const Icon = sectionIcons[section.id];
                return (
                  <button
                    key={section.title}
                    type="button"
                    onClick={() => onSelectSection?.(section.id)}
                    className="relative overflow-hidden rounded-[20px] border-2 border-[#e1bf7a] bg-[#fffaf0] text-center shadow-[0_10px_30px_rgba(84,54,16,0.16)] transition active:scale-[0.98]"
                  >
                    <div className="relative w-full">
                      <img
                        src={sectionImages[section.id]}
                        alt={section.title}
                        className="h-[185px] w-full object-cover sm:h-[210px] md:h-[240px] lg:h-[400px]"
                      />
                      {/* Centered on the seam between image and text — works at any image height */}
                      <GoldIcon className="absolute bottom-0 left-1/2 z-10 h-16 w-16 -translate-x-1/2 translate-y-1/2 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28">
                        <Icon className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14" strokeWidth={1.6} />
                      </GoldIcon>
                    </div>
                    <div className="relative min-h-[140px] px-6 pb-5 pt-10 sm:min-h-[148px] sm:px-8 sm:pb-6 sm:pt-12 md:min-h-[160px] md:px-12 md:pb-7 md:pt-14 lg:min-h-[210px] lg:px-14 lg:pb-9 lg:pt-16">
                      <h3 className="font-serif text-[26px] font-semibold leading-tight text-[#18362d] sm:text-[30px] md:text-[34px] lg:text-[44px]">{localizeDigits(section.title, lang)}</h3>
                      <p className="mt-2 whitespace-pre-line text-[17px] leading-tight text-[#5f6662] sm:text-[20px] md:text-[23px] lg:mt-3 lg:text-[30px]">{localizeDigits(section.desc, lang)}</p>
                      <ArrowRight className="absolute right-5 top-1/2 h-7 w-7 text-[#b88b43] sm:right-6 sm:h-8 sm:w-8 md:right-8 md:h-10 md:w-10 lg:right-10 lg:h-12 lg:w-12" strokeWidth={1.8} />
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
