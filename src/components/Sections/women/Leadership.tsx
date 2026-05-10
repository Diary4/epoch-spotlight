import React from "react";
import { ArrowLeft, Crown, Flower2 } from "lucide-react";
import gsap from "gsap";

import mainHero from "@/assets/images/women/le-1.png";
import adelaImg from "@/assets/images/women/w-3.png";
import halimaImg from "@/assets/images/women/w-4.png";
import meryemImg from "@/assets/images/women/w-5.png";
import khanzadImg from "@/assets/images/women/w-6.png";

type LangCode = "ku" | "en" | "ar";

type WomenPowerPageProps = {
  lang?: LangCode;
  onBack?: () => void;
};

type WomanCard = {
  name: string;
  role: string;
  description: string;
  imageSrc: string;
  icon: "crown" | "flower";
};

const womenPowerCards: WomanCard[] = [
  {
    name: "Adela Khanum",
    role: "Ruler of Halabja",
    description:
      "A powerful leader who governed Halabja, supported justice, and helped turn the town into a regional center of trade and culture.",
    imageSrc: adelaImg,
    icon: "crown",
  },
  {
    name: "Halima Xanim",
    role: "Lady of Bash Kala",
    description:
      "Remembered as a female ruler who exercised authority during a difficult era of Kurdish political change.",
    imageSrc: halimaImg,
    icon: "crown",
  },
  {
    name: "Meryem Khan",
    role: "Lady Maryam of the Nehri Family",
    description:
      "A noblewoman whose authority was strong enough to shape negotiations in a time of war.",
    imageSrc: meryemImg,
    icon: "flower",
  },
  {
    name: "Khanzad Khanum",
    role: "Ruler of the Soran Emirate",
    description:
      "Celebrated as a strategic ruler who combined leadership, defense, and development.",
    imageSrc: khanzadImg,
    icon: "flower",
  },
];

export default function WomenPowerPage({
  lang = "en",
  onBack,
}: WomenPowerPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);

  React.useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-power-fade='true']", {
        autoAlpha: 0,
        y: 28,
      });

      gsap.set("[data-power-hero='true']", {
        autoAlpha: 0,
        scale: 1.04,
      });

      gsap.set("[data-power-card='true']", {
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

      tl.to("[data-power-hero='true']", {
        autoAlpha: 1,
        scale: 1,
        duration: 1.25,
      })
        .to(
          "[data-power-fade='true']",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.12,
          },
          "-=0.7",
        )
        .to(
          "[data-power-card='true']",
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: 0.85,
            stagger: 0.12,
          },
          "-=0.4",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="m-0 flex h-screen w-screen justify-center bg-[#f9f3e8] p-0 text-[#2a1534]">
      <section
        ref={sectionRef}
        className="relative flex h-screen w-[min(100vw,1400px)] flex-col overflow-y-auto overflow-x-hidden bg-[#fcf7ef]"
      >
        <button
          type="button"
          onClick={onBack}
          className="absolute left-4 top-4 z-30 grid h-12 w-12 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm sm:left-8 sm:top-8 sm:h-14 sm:w-14 lg:h-16 lg:w-16"
          aria-label="Back to Women"
        >
          <ArrowLeft className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
        </button>

        {/* Hero full-bleed image */}
        <div
          data-power-hero="true"
          className="pointer-events-none absolute right-0 top-0 h-[min(55vh,520px)] w-[80vw] sm:h-[min(72vh,900px)] lg:h-[min(100vh,1000px)]"
        >
          <img
            src={mainHero}
            alt="Women of Power"
            className="absolute inset-0 h-full w-full object-[75%_center] sm:object-right"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-[clamp(72px,14vh,200px)] bg-gradient-to-t from-[#fcf7ef] via-[#fcf7ef]/55 to-transparent"
            aria-hidden
          />
        </div>

        {/* Hero text */}
        <section className="relative z-10 px-4 py-5 sm:px-8 sm:py-6 lg:px-14">
          <div data-power-fade="true" className="relative z-20 max-w-[700px] pt-10 sm:pt-14 lg:pt-16">
            <div className="mb-4 flex justify-center lg:justify-start lg:pl-24">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-[#bd6877] text-[#fff8ef] shadow-[0_8px_20px_rgba(90,42,62,0.18)] sm:h-20 sm:w-20">
                <Crown className="h-8 w-8 sm:h-10 sm:w-10" />
              </div>
            </div>

            <h1 className="font-serif text-[clamp(58px,15vw,112px)] font-medium leading-[0.88] tracking-tight text-[#48263f]">
              Women of
              <br />
              Power
            </h1>

            <div className="my-6 flex w-full max-w-[260px] items-center gap-3 text-[#b4864d] sm:my-7">
              <span className="h-px flex-1 bg-[#d4b98f]" />
              <span className="h-3 w-3 rotate-45 bg-[#b4864d]" />
              <span className="h-px flex-1 bg-[#d4b98f]" />
            </div>

            <h2 className="font-serif text-[clamp(26px,6vw,38px)] font-light italic leading-tight text-[#b65f71]">
              Rulers, governors, and
              <br />
              tribal leaders.
            </h2>

            <p className="mt-7 max-w-[410px] text-[clamp(16px,4vw,19px)] leading-[1.7] text-[#353445]">
              Kurdish history includes women who led communities, governed
              regions, negotiated power, and helped guide society through times
              of change.
            </p>
          </div>
        </section>

        {/* Cards */}
        <section className="relative z-20 mt-[clamp(26px,40vh,400px)] grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5 px-4 py-4">
          {womenPowerCards.map((woman) => {
            const Icon = woman.icon === "crown" ? Crown : Flower2;

            return (
              <article
                data-power-card="true"
                key={woman.name}
                className="relative grid min-h-[660px] grid-cols-[0.95fr_1.05fr] overflow-hidden rounded-[28px] border border-[#e4d5c3] bg-white/62 p-4 shadow-[inset_0_0_24px_rgba(159,116,81,0.08),0_8px_22px_rgba(70,38,48,0.08)] backdrop-blur-sm sm:min-h-[550px] sm:rounded-[34px] sm:p-5"
              >
                <div className="flex items-center justify-center">
                  <div className="h-[290px] w-[250px] overflow-hidden rounded-full border-2 border-[#d8b979] bg-[#d8a6ae]/30 p-1 sm:h-[390px] sm:w-[250px]">
                    <img
                      src={woman.imageSrc}
                      alt={woman.name}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                </div>

                <div className="relative flex flex-col justify-center pr-1">
                  <div className="absolute right-0 top-0 grid h-12 w-12 place-items-center rounded-full bg-[#bd6877] text-[#fff8ef] sm:h-14 sm:w-14">
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>

                  <h3 className="max-w-[180px] whitespace-pre-line font-serif text-[clamp(30px,5vw,43px)] font-semibold leading-[0.95] text-[#4c2d43]">
                    {woman.name}
                  </h3>

                  <div className="my-3 flex w-24 items-center gap-2 text-[#b4864d]">
                    <span className="h-px flex-1 bg-[#d4b98f]" />
                    <span className="h-2 w-2 rotate-45 bg-[#b4864d]" />
                    <span className="h-px flex-1 bg-[#d4b98f]" />
                  </div>

                  <p className="font-serif text-[clamp(18px,3.5vw,24px)] italic leading-snug text-[#b65f71]">
                    {woman.role}
                  </p>

                  <p className="mt-4 max-w-[260px] text-[clamp(13px,2.7vw,16px)] leading-[1.45] text-[#353445]">
                    {woman.description}
                  </p>
                </div>
              </article>
            );
          })}
        </section>
      </section>
    </main>
  );
}