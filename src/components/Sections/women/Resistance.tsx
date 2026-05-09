import React from "react";
import gsap from "gsap";
import { Sparkles, Quote } from "lucide-react";

import resistanceHero from "@/assets/images/women/w-1.png";
import zeynabImage from "@/assets/images/women/w-1.png";
import leylaImage from "@/assets/images/women/w-1.png";

const resistanceWomen = [
  {
    name: "Zeynab Pasha",
    role: "Resistance leader",
    image: zeynabImage,
  },
  {
    name: "Leyla Qasim",
    role: "Symbol of sacrifice",
    image: leylaImage,
  },
];

const quotes = [
  "Courage can awaken a nation.",
  "Resistance is also a woman's story.",
];

export default function WomenResistancePage() {
  const sectionRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-fade='true']", { autoAlpha: 0, y: 28 });
      gsap.set("[data-hero='true']", { autoAlpha: 0, scale: 1.04 });
      gsap.set("[data-card='true']", {
        autoAlpha: 0,
        y: 35,
        rotateX: -8,
        transformOrigin: "center top",
      });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.to("[data-hero='true']", {
        autoAlpha: 1,
        scale: 1,
        duration: 1.2,
      })
        .to(
          "[data-fade='true']",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
          },
          "-=0.7",
        )
        .to(
          "[data-card='true']",
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: 0.85,
            stagger: 0.14,
          },
          "-=0.35",
        );

      gsap.to("[data-floating='true']", {
        y: -10,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.18,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="m-0 flex min-h-screen w-screen justify-center bg-[#f9f3e8] p-0 text-[#2a1534]">
      <section
        ref={sectionRef}
        className="relative flex min-h-screen w-[min(100vw,1400px)] flex-col overflow-hidden bg-[#fcf7ef] px-8 py-10 sm:px-12 lg:px-16"
      >
        {/* soft background */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_8%,rgba(205,143,151,0.18),transparent_34%),radial-gradient(circle_at_22%_52%,rgba(212,185,143,0.12),transparent_30%)]" />

        {/* Hero */}
        <section className="relative z-10 grid min-h-[500px] grid-cols-[0.85fr_1.15fr] items-center">
          <div data-fade="true" className="relative z-20">
            <h1 className="font-serif text-[88px] font-medium leading-[0.95] tracking-tight text-[#2c1337] lg:text-[96px]">
              Women of
              <br />
              Resistance
            </h1>

            <div className="my-8 flex w-[285px] items-center gap-3 text-[#b4864d]">
              <span className="h-px flex-1 bg-[#d4b98f]" />
              <Sparkles className="h-6 w-6" />
              <span className="h-px flex-1 bg-[#d4b98f]" />
            </div>

            <h2 className="font-serif text-[34px] text-[#a75a69]">
              Voices of courage.
            </h2>

            <p className="mt-5 max-w-[360px] text-[24px] leading-[1.45] text-[#56505a]">
              Women who stood against oppression and inspired change.
            </p>
          </div>

          <div data-hero="true" className="pointer-events-none relative h-[520px]">
            <div className="absolute left-8 top-0 h-[420px] w-[420px] rounded-full border border-[#dfb7b5]/60 bg-[#f3d7d3]/25" />

            <img
              src={resistanceHero}
              alt="Women of Resistance"
              className="absolute bottom-0 right-[-20px] h-full w-full object-contain object-right-bottom"
            />
          </div>
        </section>

        {/* Character Cards */}
        <section className="relative z-20 mt-3 grid grid-cols-2 gap-7">
          {resistanceWomen.map((woman) => (
            <article
              data-card="true"
              key={woman.name}
              className="relative overflow-hidden rounded-[24px] border border-[#dfcdb7] bg-white/65 p-6 text-center shadow-[0_10px_25px_rgba(67,35,45,0.12)]"
            >
              <div className="relative mx-auto h-[360px] overflow-hidden rounded-[22px]">
                <div className="absolute left-1/2 top-4 h-[300px] w-[300px] -translate-x-1/2 rounded-full border border-[#e3bfc0]/60 bg-[#f3d7d3]/25" />

                <img
                  src={woman.image}
                  alt={woman.name}
                  className="relative z-10 h-full w-full object-contain object-bottom"
                />
              </div>

              <h3 className="mt-2 font-serif text-[46px] leading-none text-[#2c1736]">
                {woman.name}
              </h3>

              <p className="mt-4 font-serif text-[28px] text-[#a75a69]">
                {woman.role}
              </p>

              <div className="mx-auto mt-5 flex w-[150px] items-center gap-3 text-[#b4864d]">
                <span className="h-px flex-1 bg-[#d4b98f]" />
                <Sparkles className="h-5 w-5" />
                <span className="h-px flex-1 bg-[#d4b98f]" />
              </div>
            </article>
          ))}
        </section>

        {/* Quote Cards */}
        <section className="relative z-20 mt-7 grid grid-cols-2 gap-7">
          {quotes.map((text) => (
            <article
              data-card="true"
              key={text}
              className="relative flex min-h-[170px] items-center overflow-hidden rounded-[24px] border border-[#dfcdb7] bg-white/65 px-14 shadow-[0_10px_25px_rgba(67,35,45,0.1)]"
            >
              <Quote className="absolute left-9 top-8 h-14 w-14 fill-[#d98994]/70 text-[#d98994]/70" />

              <p className="ml-20 max-w-[280px] font-serif text-[28px] leading-snug text-[#3a293f]">
                {text}
              </p>

              <div
                data-floating="true"
                className="absolute bottom-4 right-10 h-28 w-24 rounded-full bg-[#d99bad]/20 blur-xl"
              />

              <div className="absolute bottom-8 left-1/2 flex w-[120px] -translate-x-1/2 items-center gap-2 text-[#b4864d]">
                <span className="h-px flex-1 bg-[#d4b98f]" />
                <Sparkles className="h-4 w-4" />
                <span className="h-px flex-1 bg-[#d4b98f]" />
              </div>
            </article>
          ))}
        </section>

        {/* Bottom Legacy Box */}
        <section
          data-fade="true"
          className="relative z-20 mt-7 flex min-h-[145px] items-center overflow-hidden rounded-[24px] border border-[#d9bd7e] bg-white/55 px-12 shadow-[0_8px_22px_rgba(67,35,45,0.1)]"
        >
          <div className="grid h-28 w-28 place-items-center rounded-full border border-[#e4c78f] bg-[#fff8ed]">
            <div className="text-[58px] text-[#b4864d]">♧</div>
          </div>

          <div className="ml-20">
            <h2 className="font-serif text-[44px] leading-none text-[#2c1736]">
              Legacy of Courage
            </h2>

            <p className="mt-4 font-serif text-[28px] text-[#a75a69]">
              Defiance, sacrifice, and hope.
            </p>
          </div>

          <div className="absolute bottom-0 right-0 h-32 w-[360px] opacity-45">
            <div className="h-full w-full bg-[radial-gradient(circle_at_60%_30%,rgba(151,97,126,0.28),transparent_22%),linear-gradient(135deg,transparent_35%,rgba(143,76,104,0.25)_36%_50%,transparent_51%)]" />
          </div>
        </section>
      </section>
    </main>
  );
}