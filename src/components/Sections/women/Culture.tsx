import React from "react";
import gsap from "gsap";
import { ArrowLeft, Sparkles, TreePine } from "lucide-react";

import cultureHero from "@/assets/images/women/c-1.png";
import hanaImage from "@/assets/images/women/w-10.png";
import sitiImage from "@/assets/images/women/w-3.png";

type CulturePageProps = {
  onBack?: () => void;
};

const cultureWomen = [
  {
    name: "Hana Malan",
    role: "Oral Tradition Poet",
    description:
      "Her voice reflects the Kurdish tradition of poetry, storytelling, and cultural memory.",
    image: hanaImage,
  },
  {
    name: "Siti Khan",
    role: "Remembered in Oral Tradition",
    description:
      "Her legacy survives through song, story, and community remembrance.",
    image: sitiImage,
  },
];

export default function WomenCultureMemoryPage({ onBack }: CulturePageProps) {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="m-0 flex min-h-screen w-screen justify-center bg-[#f9f3e8] p-0 text-[#2a1534]">
      <section
        ref={sectionRef}
        className="relative flex min-h-screen w-[min(100vw,1400px)] flex-col overflow-hidden bg-[#fcf7ef]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_6%,rgba(205,143,151,0.15),transparent_30%),radial-gradient(circle_at_20%_48%,rgba(212,185,143,0.12),transparent_32%)]" />

        <button
          type="button"
          onClick={onBack}
          className="absolute right-10 top-8 z-30 flex flex-col items-center gap-2 text-[15px] font-medium text-[#2c1736]"
        >
          <span className="grid h-16 w-16 place-items-center rounded-full border border-[#c7b59d] bg-white/55">
            <ArrowLeft className="h-8 w-8 stroke-[1.4]" />
          </span>
          BACK
        </button>

        {/* Hero */}
        <section
          data-hero="true"
          className="relative z-10 min-h-[1090px] overflow-hidden text-center"
        >
          <div data-fade="true" className="relative z-20 mx-auto max-w-[850px] pt-4">
            <p className="mb-10 tracking-[0.28em] text-[17px] font-semibold uppercase text-[#9b7b46]">
              Heritage. History. Humanity.
            </p>

            <div className="mx-auto mb-6 flex w-[300px] items-center gap-3 text-[#b4864d]">
              <span className="h-px flex-1 bg-[#d4b98f]" />
              <Sparkles className="h-8 w-8" />
              <span className="h-px flex-1 bg-[#d4b98f]" />
            </div>

            <h1 className="font-serif text-[76px] font-medium leading-[0.95] tracking-tight text-[#2c1337] lg:text-[88px]">
              Women of Culture
              <br />
              and Memory
            </h1>

            <h2 className="mt-8 font-serif text-[32px] italic text-[#a75a69]">
              Poetry, oral tradition, and cultural preservation.
            </h2>

            <div className="mx-auto my-7 flex w-[270px] items-center gap-3 text-[#b4864d]">
              <span className="h-px flex-1 bg-[#d4b98f]" />
              <span className="h-3 w-3 rotate-45 bg-[#b4864d]" />
              <span className="h-px flex-1 bg-[#d4b98f]" />
            </div>

            <p className="mx-auto max-w-[650px] text-[21px] leading-relaxed text-[#55505a]">
              Not every influential woman left official records. Some live on
              through songs, poetry, oral tradition, and the memory of their
              communities.
            </p>
          </div>

          <img
            src={cultureHero}
            alt="Women of Culture and Memory"
            className="absolute inset-x-0 bottom-0 z-10 mx-auto h-[820px] w-screen object-cover object-bottom"
          />
        </section>

        {/* Cards */}
        <section className="relative z-20 grid grid-cols-2 gap-8">
          {cultureWomen.map((woman) => (
            <article
              data-card="true"
              key={woman.name}
              className="relative overflow-hidden rounded-[28px] border border-[#dfcdb7] bg-white/65 px-9 pb-10 pt-8 text-center shadow-[0_10px_25px_rgba(67,35,45,0.12)]"
            >
              <div className="absolute right-8 top-8 text-[#c68194]/45">
                <Sparkles className="h-10 w-10" />
              </div>

              <div className="relative mx-auto h-[400px] w-[500px]">
                <img
                  src={woman.image}
                  alt={woman.name}
                  className="relative z-10 h-full w-full rounded-full object-cover object-top p-2"
                />
              </div>

              <h3 className="mt-9 font-serif text-[43px] leading-none text-[#2c1736]">
                {woman.name}
              </h3>

              <p className="mt-4 font-serif text-[25px] italic text-[#a75a69]">
                {woman.role}
              </p>

              <div className="mx-auto mt-6 flex w-[150px] items-center gap-3 text-[#b4864d]">
                <span className="h-px flex-1 bg-[#d4b98f]" />
                <Sparkles className="h-5 w-5" />
                <span className="h-px flex-1 bg-[#d4b98f]" />
              </div>

              <p className="mx-auto mt-6 max-w-[360px] text-[20px] leading-relaxed text-[#4f4a55]">
                {woman.description}
              </p>

              <div className="absolute bottom-0 left-0 h-28 w-full bg-[radial-gradient(circle_at_50%_100%,rgba(207,144,151,0.16),transparent_60%)]" />
            </article>
          ))}
        </section>

        {/* Living Memory */}
        <section
          data-fade="true"
          className="relative z-20 mt-8 flex min-h-[150px] items-center overflow-hidden rounded-[28px] border border-[#dfcdb7] bg-white/60 px-12 shadow-[0_8px_22px_rgba(67,35,45,0.1)]"
        >
          <div className="grid h-28 w-28 shrink-0 place-items-center rounded-full border border-[#dfcdb7] bg-[#fff7ef]">
            <TreePine className="h-16 w-16 fill-[#4b183c]/10 text-[#4b183c]" />
          </div>

          <div className="ml-12">
            <h2 className="font-serif text-[42px] leading-none text-[#2c1736]">
              Living Memory
            </h2>

            <div className="my-4 flex w-[250px] items-center gap-3 text-[#b4864d]">
              <span className="h-px flex-1 bg-[#d4b98f]" />
              <Sparkles className="h-5 w-5" />
              <span className="h-px flex-1 bg-[#d4b98f]" />
            </div>

            <p className="max-w-[850px] text-[20px] leading-relaxed text-[#4f4a55]">
              Oral tradition carried Kurdish identity across generations. Women
              helped preserve memory where written records were limited.
            </p>
          </div>

          <div className="absolute right-0 top-0 h-full w-[270px] opacity-25 bg-[repeating-linear-gradient(45deg,#b76e83_0_2px,transparent_2px_16px)]" />
        </section>
      </section>
    </main>
  );
}