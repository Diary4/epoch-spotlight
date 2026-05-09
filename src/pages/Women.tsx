import React from "react";
import {
  ArrowRight,
  Sparkles,
} from "lucide-react";
import gsap from "gsap";

import legacyHero from "@/assets/images/women/w-1.png";
import journeyImage from "@/assets/nature.jpg";
import guitarIcon from "@/assets/images/women/icons/guitar.png";
import crownIcon from "@/assets/images/women/icons/crown.png";
import bookIcon from "@/assets/images/women/icons/book.png";
import handIcon from "@/assets/images/women/icons/hand.png";
import symbolIcon from "@/assets/images/women/icons/symbol.png";

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
  {
    title: "Identity",
    imageSrc: symbolIcon,
  },
];

export default function LegacyPage({
  lang = "en",
  onExploreMore,
}: LegacyPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
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

      gsap.to("[data-floating='true']", {
        y: -10,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="m-0 flex min-h-screen w-screen justify-center bg-[#f9f3e8] p-0 text-[#2a1534]">
      <section
        ref={sectionRef}
        className="relative flex min-h-screen w-[min(100vw,1400px)] flex-col overflow-hidden bg-[#fcf7ef] px-8 py-6 sm:px-12 sm:py-8 lg:px-16"
      >

        {/* Hero */}
        <section className="relative z-10 grid grid-cols-1 items-start gap-8 pt-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div data-legacy-fade="true" className="relative z-20">
            <div className="mb-5 flex items-center gap-5 text-[#b4864d]">
              <span className="h-px w-20 bg-[#d4b98f]" />
              <Sparkles className="h-5 w-5" />
            </div>

            <h1 className="font-serif text-[104px] font-medium leading-none tracking-tight text-[#2c1337]">
              Legacy
            </h1>

            <h2 className="mt-4 font-serif text-[34px] text-[#a75a69]">
              A lasting influence.
            </h2>

            <div className="my-9 flex w-[290px] items-center gap-3 text-[#b4864d]">
              <span className="h-px flex-1 bg-[#d4b98f]" />
              <Sparkles className="h-5 w-5" />
              <span className="h-px flex-1 bg-[#d4b98f]" />
            </div>

            <p className="max-w-[360px] text-[20px] leading-[1.75] text-[#353445]">
              The women of Kurdistan shaped history through leadership,
              learning, courage, and culture.
            </p>
          </div>

          <div
            data-legacy-hero="true"
            className="pointer-events-none relative w-full self-start"
          >
            <img
              src={legacyHero}
              alt="Kurdish women legacy"
              className="h-[clamp(380px,56vh,760px)] w-full object-cover object-right-top"
            />
          </div>
        </section>

        {/* Cards */}
        <section className="relative z-20 grid grid-cols-5 gap-5">
          {legacyCards.map((card) => {
            return (
              <button
                data-legacy-card="true"
                key={card.title}
                type="button"
                className="flex h-[310px] flex-col justify-start rounded-[56px] border border-[#dfcdb7] bg-white/55 px-5 pt-7 shadow-[inset_0_0_24px_rgba(159,116,81,0.08)] backdrop-blur-sm"
              >
                <img
                  src={card.imageSrc}
                  alt={card.title}
                  className="h-full w-full object-contain"
                />

                <p className="mt-4 font-serif text-[22px] text-[#2c1736]">
                  {card.title}
                </p>

                <div className="mt-2 flex items-center gap-2 text-[#b4864d]">
                  <span className="h-px w-7 bg-[#d4b98f]" />
                  <span className="h-2 w-2 rotate-45 border border-[#b4864d]" />
                  <span className="h-px w-7 bg-[#d4b98f]" />
                </div>
              </button>
            );
          })}
        </section>

        {/* Quote Box */}
        <section
          data-legacy-fade="true"
          className="relative z-20 mt-8 flex min-h-[190px] items-center justify-center rounded-[28px] border border-[#dfcdb7] bg-white/65 px-8 text-center shadow-[0_10px_25px_rgba(67,35,45,0.12)]"
        >
          <div
            data-floating="true"
            className="absolute left-10 top-9 h-28 w-28 rounded-full bg-[#d99bad]/20 blur-xl"
          />

          <p className="font-serif text-[36px] leading-snug text-[#281234]">
            Across generations,
            <br />
            Kurdish women have remained
            <br />
            voices of strength and continuity.
          </p>

          <div
            data-floating="true"
            className="absolute bottom-9 right-10 h-28 w-28 rounded-full bg-[#d99bad]/20 blur-xl"
          />
        </section>

        {/* Journey */}
        <section
          data-legacy-fade="true"
          className="relative z-20 mt-8 flex h-[120px] items-center gap-7 rounded-[24px] bg-gradient-to-r from-[#36153d] via-[#6f3158] to-[#b66d83] px-10 text-white shadow-[0_12px_30px_rgba(57,20,54,0.24)]"
        >
          <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-[#d7b06d] bg-white">
            <img
              src={journeyImage}
              alt="Journey"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <h3 className="font-serif text-[34px] leading-none">
              Continue the Journey
            </h3>

            <p className="mt-3 text-[17px] text-white/90">
              Explore the stories behind each name.
            </p>
          </div>

          <button
            type="button"
            onClick={onExploreMore}
            className="ml-auto grid h-16 w-16 place-items-center rounded-full border-[3px] border-white bg-[#fff8f5] text-[#35143d]"
          >
            <ArrowRight className="h-8 w-8" />
          </button>
        </section>
      </section>
    </main>
  );
}