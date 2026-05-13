import React from "react";
import gsap from "gsap";
import { ArrowLeft, Sparkles, TreePine } from "lucide-react";

import cultureHero from "@/assets/images/women/c-1.webp";
import hanaImage from "@/assets/images/women/w-10.webp";
import sitiImage from "@/assets/images/women/w-11.webp";

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
        className="relative flex min-h-screen w-[min(100vw,1400px)] flex-col overflow-hidden bg-[#fcf7ef] pb-8 pt-2 sm:pb-10 sm:pt-4 lg:pb-12"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_6%,rgba(205,143,151,0.15),transparent_30%),radial-gradient(circle_at_20%_48%,rgba(212,185,143,0.12),transparent_32%)]" />

        <button
          type="button"
          onClick={onBack}
          className="absolute right-3 top-3 z-30 flex flex-col items-center gap-1 text-[11px] font-medium text-[#2c1736] sm:right-8 sm:top-6 sm:gap-2 sm:text-[15px] lg:right-10 lg:top-8"
        >
          <span className="grid h-12 w-12 place-items-center rounded-full border border-[#c7b59d] bg-white/55 sm:h-16 sm:w-16">
            <ArrowLeft className="h-6 w-6 stroke-[1.4] sm:h-8 sm:w-8" />
          </span>
          BACK
        </button>

        {/* Hero */}
        <section
          data-hero="true"
          className="relative z-10 min-h-0 overflow-hidden pb-[clamp(200px,42vh,420px)] text-center sm:min-h-[720px] sm:pb-[clamp(260px,38vh,480px)] lg:min-h-[960px] lg:pb-0"
        >
          <div
            data-fade="true"
            className="relative z-20 mx-auto max-w-[850px] px-1 pt-10 sm:px-4 sm:pt-14 lg:pt-4"
          >
            <p className="mb-6 max-w-[95vw] tracking-[0.18em] text-[clamp(11px,2.8vw,17px)] font-semibold uppercase text-[#9b7b46] sm:mb-10 sm:tracking-[0.28em]">
              Heritage. History. Humanity.
            </p>

            <div className="mx-auto mb-5 flex w-full max-w-[300px] items-center gap-3 text-[#b4864d] sm:mb-6">
              <span className="h-px flex-1 bg-[#d4b98f]" />
              <Sparkles className="h-6 w-6 sm:h-8 sm:w-8" />
              <span className="h-px flex-1 bg-[#d4b98f]" />
            </div>

            <h1 className="font-serif text-[clamp(36px,9vw,88px)] font-medium leading-[0.95] tracking-tight text-[#2c1337]">
              Women of Culture
              <br />
              and Memory
            </h1>

            <h2 className="mx-auto mt-5 max-w-[520px] font-serif text-[clamp(18px,4.2vw,32px)] italic leading-snug text-[#a75a69] sm:mt-8 lg:max-w-none">
              Poetry, oral tradition, and cultural preservation.
            </h2>

            <div className="mx-auto my-5 flex w-full max-w-[270px] items-center gap-3 text-[#b4864d] sm:my-7">
              <span className="h-px flex-1 bg-[#d4b98f]" />
              <span className="h-3 w-3 rotate-45 bg-[#b4864d]" />
              <span className="h-px flex-1 bg-[#d4b98f]" />
            </div>

            <p className="mx-auto max-w-[650px] text-[clamp(16px,3.8vw,21px)] leading-relaxed text-[#55505a]">
              Not every influential woman left official records. Some live on
              through songs, poetry, oral tradition, and the memory of their
              communities.
            </p>
          </div>

          <img
            src={cultureHero}
            alt="Women of Culture and Memory"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 mx-auto h-[clamp(220px,48vh,820px)] w-full max-w-[100vw] object-cover object-bottom sm:h-[clamp(320px,45vh,720px)] lg:h-[820px] lg:w-screen"
          />
        </section>

        {/* Cards */}
        <section className="relative z-20 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 md:gap-8">
          {cultureWomen.map((woman) => (
            <article
              data-card="true"
              key={woman.name}
              className="relative overflow-hidden rounded-[20px] border border-[#dfcdb7] bg-white/65 px-4 pb-6 pt-6 text-center shadow-[0_10px_25px_rgba(67,35,45,0.12)] sm:rounded-[24px] sm:px-6 sm:pb-8 sm:pt-7 lg:rounded-[28px] lg:px-9 lg:pb-10 lg:pt-8"
            >
              <div className="absolute right-3 top-3 text-[#c68194]/45 sm:right-6 sm:top-6 lg:right-8 lg:top-8">
                <Sparkles className="h-7 w-7 sm:h-9 sm:w-9 lg:h-10 lg:w-10" />
              </div>

              <div className="relative mx-auto aspect-[3/2] w-full max-w-[600px] sm:aspect-[600/400] sm:min-h-[240px] sm:max-h-[400px]">
                <img
                  src={woman.image}
                  alt={woman.name}
                  className="relative z-10 h-full w-full object-cover object-top sm:object-contain sm:object-top"
                />
              </div>

              <h3 className="mt-5 font-serif text-[clamp(28px,6vw,43px)] leading-none text-[#2c1736] sm:mt-7 lg:mt-9">
                {woman.name}
              </h3>

              <p className="mt-3 font-serif text-[clamp(17px,3.6vw,25px)] italic text-[#a75a69] sm:mt-4">
                {woman.role}
              </p>

              <div className="mx-auto mt-4 flex w-[min(150px,50%)] items-center gap-3 text-[#b4864d] sm:mt-6">
                <span className="h-px flex-1 bg-[#d4b98f]" />
                <Sparkles className="h-5 w-5" />
                <span className="h-px flex-1 bg-[#d4b98f]" />
              </div>

              <p className="mx-auto mt-4 max-w-[360px] text-[clamp(16px,3.5vw,20px)] leading-relaxed text-[#4f4a55] sm:mt-6">
                {woman.description}
              </p>

              <div className="absolute bottom-0 left-0 h-28 w-full bg-[radial-gradient(circle_at_50%_100%,rgba(207,144,151,0.16),transparent_60%)]" />
            </article>
          ))}
        </section>

        {/* Living Memory */}
        <section
          data-fade="true"
          className="relative z-20 mt-6 flex min-h-0 flex-col items-stretch gap-4 overflow-hidden rounded-[20px] border border-[#dfcdb7] bg-white/60 px-4 py-5 shadow-[0_8px_22px_rgba(67,35,45,0.1)] sm:mt-8 sm:min-h-[150px] sm:flex-row sm:items-center sm:gap-6 sm:rounded-[28px] sm:px-8 sm:py-6 lg:px-12"
        >
          <div className="mx-auto grid h-20 w-20 shrink-0 place-items-center rounded-full border border-[#dfcdb7] bg-[#fff7ef] sm:mx-0 sm:h-24 sm:w-24 lg:h-28 lg:w-28">
            <TreePine className="h-12 w-12 fill-[#4b183c]/10 text-[#4b183c] sm:h-14 sm:w-14 lg:h-16 lg:w-16" />
          </div>

          <div className="min-w-0 flex-1 text-center sm:ml-0 sm:text-left lg:ml-8">
            <h2 className="font-serif text-[clamp(28px,6vw,42px)] leading-none text-[#2c1736]">
              Living Memory
            </h2>

            <div className="mx-auto my-3 flex w-full max-w-[250px] items-center gap-3 text-[#b4864d] sm:mx-0 sm:my-4">
              <span className="h-px flex-1 bg-[#d4b98f]" />
              <Sparkles className="h-5 w-5" />
              <span className="h-px flex-1 bg-[#d4b98f]" />
            </div>

            <p className="max-w-[850px] text-[clamp(15px,3.4vw,20px)] leading-relaxed text-[#4f4a55]">
              Oral tradition carried Kurdish identity across generations. Women
              helped preserve memory where written records were limited.
            </p>
          </div>

          <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-[120px] opacity-20 bg-[repeating-linear-gradient(45deg,#b76e83_0_2px,transparent_2px_16px)] sm:block sm:w-[200px] lg:w-[270px] lg:opacity-25" />
        </section>
      </section>
    </main>
  );
}