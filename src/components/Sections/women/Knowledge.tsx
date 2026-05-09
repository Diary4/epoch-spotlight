import React from "react";
import gsap from "gsap";
import { BookOpen, Feather, Sparkles } from "lucide-react";

import knowledgeHero from "@/assets/images/women/w-6.png";
import masturaImage from "@/assets/images/women/w-2.png";
import hapsaImage from "@/assets/images/women/w-3.png";

const knowledgeWomen = [
  {
    name: "Mastura Ardalan",
    role: "Historian and Poet",
    description:
      "One of the earliest known Kurdish women writers, remembered for history writing and poetry that preserved Kurdish memory.",
    image: masturaImage,
  },
  {
    name: "Hapsa Khan",
    role: "Pioneer of Girls’ Education",
    description:
      "A leading advocate for women’s education who helped establish girls’ schooling and encouraged families to educate their daughters.",
    image: hapsaImage,
  },
];

export default function WomenKnowledgePage() {
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
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_7%,rgba(205,143,151,0.18),transparent_34%),radial-gradient(circle_at_25%_54%,rgba(212,185,143,0.12),transparent_30%)]" />

        {/* Hero */}
        <section className="relative z-10 grid min-h-[560px] grid-cols-[0.82fr_1.18fr] items-center">
          <div data-fade="true" className="relative z-20">
            <Sparkles className="mb-8 h-16 w-16 text-[#b4864d]" />

            <h1 className="font-serif text-[88px] font-medium leading-[0.95] tracking-tight text-[#2c1337] lg:text-[96px]">
              Women of
              <br />
              Knowledge
            </h1>

            <div className="my-8 flex w-[290px] items-center gap-3 text-[#b4864d]">
              <span className="h-px flex-1 bg-[#d4b98f]" />
              <span className="h-3 w-3 rotate-45 bg-[#b4864d]" />
              <span className="h-px flex-1 bg-[#d4b98f]" />
            </div>

            <h2 className="max-w-[400px] font-serif text-[31px] italic leading-snug text-[#a75a69]">
              Writers, historians, and pioneers of education.
            </h2>

            <p className="mt-8 max-w-[365px] text-[22px] leading-[1.55] text-[#56505a]">
              Through scholarship, writing, and education, Kurdish women have
              helped preserve memory and open new paths for future generations.
            </p>
          </div>

          <div data-hero="true" className="pointer-events-none relative h-[560px]">
        
            <img
              src={knowledgeHero}
              alt="Women of Knowledge"
              className="absolute bottom-0 right-[-20px] h-full w-full object-contain object-right-bottom"
            />
          </div>
        </section>

        {/* Cards */}
        <section className="relative z-20 mt-4 grid grid-cols-2 gap-8">
          {knowledgeWomen.map((woman) => (
            <article
              data-card="true"
              key={woman.name}
              className="relative overflow-hidden rounded-[28px] border border-[#dfcdb7] bg-white/65 px-9 pb-10 pt-8 text-center shadow-[0_10px_25px_rgba(67,35,45,0.12)]"
            >
              <div className="relative mx-auto h-[285px] w-[285px]">
                <div className="absolute inset-0 rounded-full bg-[#c2768a]/35" />

                <img
                  src={woman.image}
                  alt={woman.name}
                  className="relative z-10 h-full w-full rounded-full object-cover object-top"
                />

                <div
                  data-floating="true"
                  className="absolute -bottom-3 right-[-28px] h-24 w-24 rounded-full bg-[#d99bad]/25 blur-xl"
                />
              </div>

              <h3 className="mt-8 font-serif text-[44px] leading-none text-[#2c1736]">
                {woman.name}
              </h3>

              <p className="mt-4 font-serif text-[25px] italic text-[#a75a69]">
                {woman.role}
              </p>

              <div className="mx-auto mt-5 flex w-[120px] items-center gap-3 text-[#b4864d]">
                <span className="h-px flex-1 bg-[#d4b98f]" />
                <span className="h-3 w-3 rotate-45 bg-[#b4864d]" />
                <span className="h-px flex-1 bg-[#d4b98f]" />
              </div>

              <p className="mx-auto mt-6 max-w-[390px] text-[21px] leading-relaxed text-[#4f4a55]">
                {woman.description}
              </p>
            </article>
          ))}
        </section>

        {/* Why This Matters */}
        <section
          data-fade="true"
          className="relative z-20 mt-8 flex min-h-[165px] items-center overflow-hidden rounded-[28px] border border-[#dfcdb7] bg-white/60 px-12 shadow-[0_8px_22px_rgba(67,35,45,0.1)]"
        >
          <div className="grid h-28 w-28 shrink-0 place-items-center rounded-full bg-[#b85f79] text-white">
            <div className="relative">
              <BookOpen className="h-14 w-14 stroke-[1.4]" />
              <Feather className="absolute -right-5 -top-4 h-11 w-11 rotate-12 stroke-[1.3]" />
            </div>
          </div>

          <div className="ml-12">
            <h2 className="font-serif text-[42px] leading-none text-[#2c1736]">
              Why This Matters
            </h2>

            <div className="my-5 flex w-[260px] items-center gap-3 text-[#b4864d]">
              <span className="h-px flex-1 bg-[#d4b98f]" />
              <span className="h-3 w-3 rotate-45 bg-[#b4864d]" />
              <span className="h-px flex-1 bg-[#d4b98f]" />
            </div>

            <p className="max-w-[850px] text-[20px] leading-relaxed text-[#4f4a55]">
              Their work shows that knowledge, education, and literature have
              long been central to Kurdish women’s contribution to society.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}