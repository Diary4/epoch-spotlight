import React from "react";
import {
  ArrowRight,
  Sparkles,
} from "lucide-react";
import WomenCultureMemoryPage from "@/components/Sections/women/Culture";
import gsap from "gsap";
import WomenKnowledgePage from "@/components/Sections/women/Knowledge";
import WomenResistancePage from "@/components/Sections/women/Resistance";
import WomenPowerPage from "@/components/Sections/women/Leadership";

import legacyHero from "@/assets/images/women/w-1.png";
import journeyImage from "@/assets/nature.jpg";
import guitarIcon from "@/assets/images/women/icons/guitar.png";
import crownIcon from "@/assets/images/women/icons/crown.png";
import bookIcon from "@/assets/images/women/icons/book.png";
import handIcon from "@/assets/images/women/icons/hand.png";
import flowerIcon from "@/assets/images/women/icons/flower-1.png";
import flowerIcon2 from "@/assets/images/women/icons/flower-2.png";

type LangCode = "ku" | "en" | "ar";

type LegacyPageProps = {
  lang?: LangCode;
  onExploreMore?: () => void;
};

type LegacyCard = {
  title: string;
  imageSrc: string;
};

const legacyCards: LegacyCard[] = [
  {
    title: "Leadership",
    imageSrc: crownIcon,
  },
  {
    title: "Knowledge",
    imageSrc: bookIcon,
  },
  {
    title: "Resistance",
    imageSrc: handIcon,
  },
  {
    title: "Culture",
    imageSrc: guitarIcon,
  },
  // {
  //   title: "Identity",
  //   imageSrc: symbolIcon,
  // },
];

export default function LegacyPage({
  lang = "en",
  onExploreMore,
}: LegacyPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const [activeSection, setActiveSection] = React.useState<"leadership" | "knowledge" | "resistance" | "culture" | null>(null);

  // Re-run intro when returning from Knowledge / Culture / Resistance — the main
  // section unmounts while a subsection is open, so [] would never re-attach GSAP.
  React.useLayoutEffect(() => {
    if (activeSection !== null) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-legacy-fade='true']", {
        autoAlpha: 0,
        y: 28,
      });

      gsap.set("[data-legacy-hero='true']", {
        autoAlpha: 0,
        scale: 1.04,
      });

      gsap.set("[data-legacy-card='true']", {
        autoAlpha: 0,
        y: 35,
        rotateX: -8,
        transformOrigin: "center top",
      });

      const tl = gsap.timeline({
        defaults: {
          ease: "power2.out",
        },
      });

      tl.to("[data-legacy-hero='true']", {
        autoAlpha: 1,
        scale: 1,
        duration: 1.3,
      })
        .to(
          "[data-legacy-fade='true']",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
          },
          "-=0.7",
        )
        .to(
          "[data-legacy-card='true']",
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            stagger: 0.12,
          },
          "-=0.4",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeSection]);

  if (activeSection === "leadership") {
    return <WomenPowerPage onBack={() => setActiveSection(null)} />;
  }

  if (activeSection === "knowledge") {
    return <WomenKnowledgePage onBack={() => setActiveSection(null)} />;
  }

  if (activeSection === "culture") {
    return <WomenCultureMemoryPage onBack={() => setActiveSection(null)} />;
  }

  if (activeSection === "resistance") {
    return <WomenResistancePage onBack={() => setActiveSection(null)} />;
  }

  return (
    <main className="m-0 flex min-h-screen w-screen justify-center bg-[#f9f3e8] p-0 text-[#2a1534]">
      <section
        ref={sectionRef}
        className="relative flex min-h-screen w-[min(100vw,1400px)] flex-col overflow-x-hidden overflow-y-auto bg-[#fcf7ef]"
      >
        {/* Hero full-bleed image */}
        <div
          data-legacy-hero="true"
          className="pointer-events-none absolute right-0 top-0 h-[min(55vh,520px)] w-[100vw] sm:h-[min(72vh,900px)] lg:h-[min(100vh,1000px)]"
        >
          <img
            src={legacyHero}
            alt="Kurdish women legacy"
            className="absolute inset-0 h-full w-[100%] object-cover object-right-top"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-[clamp(72px,14vh,200px)] bg-gradient-to-t from-[#fcf7ef] via-[#fcf7ef]/55 to-transparent"
            aria-hidden
          />
        </div>

        {/* Hero text */}
        <section className="relative z-10 px-4 py-5 sm:px-8 sm:py-6 lg:px-16">
          <div data-legacy-fade="true" className="relative z-20 max-w-[700px] pt-10 sm:pt-14 lg:pt-16">
            <div className="mb-4 flex items-center gap-3 text-[#b4864d] sm:mb-5 sm:gap-5">
              <span className="h-px w-12 bg-[#d4b98f] sm:w-20" />
              <Sparkles className="h-5 w-5" />
            </div>

            <h1 className="font-serif text-[clamp(54px,16vw,104px)] font-medium leading-[0.92] tracking-tight text-[#2c1337] drop-shadow-[0_1px_2px_rgba(252,247,239,0.85)]">
              The Women of Kurdistan
            </h1>

            <h2 className="mt-3 font-serif font-light text-[clamp(24px,6vw,34px)] text-[#a75a69] sm:mt-4 drop-shadow-[0_1px_2px_rgba(252,247,239,0.85)]">
              Leadership, knowledge, <br /> resistance, culture, and legacy.
            </h2>

            <div className="my-6 flex w-full max-w-[290px] items-center gap-3 text-[#b4864d] sm:my-9">
              <span className="h-px flex-1 bg-[#d4b98f]" />
              <Sparkles className="h-5 w-5" />
              <span className="h-px flex-1 bg-[#d4b98f]" />
            </div>

            <p className="max-w-[420px] text-[clamp(17px,4.2vw,20px)] leading-[1.65] text-[#353445] sm:leading-[1.75] drop-shadow-[0_1px_1px_rgba(252,247,239,0.9)]">
              Kurdish women have shaped history through leadership,
              learning, courage, and culture.
            </p>
          </div>
        </section>

        {/* Cards - Fixed to prevent text overflow */}
        <section className="relative z-20 mt-[clamp(26px,40vh,400px)] grid grid-cols-2 gap-3 px-4 pb-1 sm:grid-cols-3 sm:gap-4 sm:px-8 lg:grid-cols-4 lg:gap-5 lg:px-16">
          {legacyCards.map((card) => {
            return (
              <button
                data-legacy-card="true"
                key={card.title}
                type="button"
                onClick={() => {
                  if (card.title === "Leadership") {
                    setActiveSection("leadership");
                  }
                  if (card.title === "Knowledge") {
                    setActiveSection("knowledge");
                  }
                  if (card.title === "Culture") {
                    setActiveSection("culture");
                  }
                  if (card.title === "Resistance") {
                    setActiveSection("resistance");
                  }
                }}
                className="flex h-[210px] flex-col rounded-[28px] border border-[#dfcdb7] bg-white/55 px-3 pb-3 pt-4 shadow-[inset_0_0_24px_rgba(159,116,81,0.08)] backdrop-blur-sm sm:h-[260px] sm:rounded-[40px] sm:px-4 sm:pb-4 sm:pt-5 lg:h-[310px] lg:rounded-[56px] lg:px-5 lg:pb-5 lg:pt-7"
              >
                <div className="flex-1 flex items-center justify-center overflow-hidden">
                  <img
                    src={card.imageSrc}
                    alt={card.title}
                    className="max-h-[84%] max-w-[84%] object-contain sm:max-h-full sm:max-w-full"
                  />
                </div>

                <p className="mt-auto text-center font-serif text-[clamp(16px,3.4vw,22px)] text-[#2c1736]">
                  {card.title}
                </p>

                <div className="mt-1 flex items-center justify-center gap-2 text-[#b4864d] sm:mt-2">
                  <span className="h-px w-7 bg-[#d4b98f]" />
                  <span className="h-2 w-2 rotate-45 border border-[#b4864d]" />
                  <span className="h-px w-7 bg-[#d4b98f]" />
                </div>
              </button>
            );
          })}
        </section>

        {/* Quote Box - With bigger images */}
        <section
          data-legacy-fade="true"
          className="relative z-20 mx-4 mt-6 flex min-h-[220px] items-center justify-center overflow-hidden rounded-[22px] border border-[#dfcdb7] bg-white/65 px-4 text-center shadow-[0_10px_25px_rgba(67,35,45,0.12)] sm:mx-8 sm:mt-8 sm:min-h-[300px] sm:rounded-[28px] sm:px-8 lg:mx-16 lg:min-h-[420px]"
        >
          <img 
            src={flowerIcon2} 
            alt="Quote decoration" 
            className="absolute left-[-62px] top-1/2 hidden h-[clamp(64px,60vw,520px)] w-[clamp(92px,44vw,400px)] -translate-y-1/2 object-contain sm:block lg:left-[-100px]"
          />

          <div className="relative z-10 max-w-2xl px-1 sm:px-0">
            <p className="font-serif text-[clamp(24px,5.3vw,36px)] leading-snug text-[#281234]">
              Across generations,
              <br />
              Kurdish women have remained
              <br />
              voices of strength and continuity.
            </p>
          </div>

          <img 
            src={flowerIcon} 
            alt="Quote decoration" 
            className="absolute right-[-52px] top-1/2 hidden h-[clamp(64px,56vw,520px)] w-[clamp(64px,42vw,400px)] -translate-y-1/2 object-contain sm:block lg:right-[-80px]"
          />
        </section>

        {/* Journey */}
        <section
          data-legacy-fade="true"
          className="relative z-20 mx-4 mb-6 mt-6 flex min-h-[110px] flex-col gap-4 rounded-[20px] bg-gradient-to-r from-[#36153d] via-[#6f3158] to-[#b66d83] px-4 py-4 text-white shadow-[0_12px_30px_rgba(57,20,54,0.24)] sm:mx-8 sm:mt-8 sm:min-h-[120px] sm:flex-row sm:items-center sm:gap-5 sm:rounded-[24px] sm:px-6 sm:py-4 lg:mx-16 lg:gap-7 lg:px-10"
        >
          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border-2 border-[#d7b06d] bg-white sm:h-20 sm:w-20 lg:h-24 lg:w-24">
            <img
              src={journeyImage}
              alt="Journey"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex-1">
            <h3 className="font-serif text-[clamp(26px,6vw,34px)] leading-none">
              Continue the Journey
            </h3>

            <p className="mt-2 text-[clamp(14px,3.2vw,17px)] text-white/90 sm:mt-3">
              Explore the stories behind each name.
            </p>
          </div>

          <button
            type="button"
            onClick={onExploreMore}
            className="ml-auto grid h-12 w-12 flex-shrink-0 place-items-center rounded-full border-[3px] border-white bg-[#fff8f5] text-[#35143d] transition-transform hover:scale-105 sm:h-14 sm:w-14 lg:h-16 lg:w-16"
          >
            <ArrowRight className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
          </button>
        </section>
      </section>
    </main>
  );
}