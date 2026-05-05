import React from "react";
import gsap from "gsap";
import {
  ChevronRight,
  Globe2,
  Home,
  HeartHandshake,
  Handshake,
  UsersRound,
  ShieldCheck,
  Quote,
} from "lucide-react";

import bg from "@/assets/mainImages/diversity/coexistence-bg.jpg";

const storyCards = [
  {
    title: "A Safe Haven",
    text: "Generations have found protection and refuge in the mountains and cities of Kurdistan.",
    icon: ShieldCheck,
    color: "#2f6b3f",
  },
  {
    title: "Shared Celebrations",
    text: "From religious feasts to national holidays, communities come together in joy and solidarity.",
    icon: HeartHandshake,
    color: "#6a3b8f",
  },
  {
    title: "Living Side by Side",
    text: "Neighbors, colleagues, and friends — different in belief, united in daily life and mutual respect.",
    icon: Handshake,
    color: "#1d6d86",
  },
  {
    title: "Hospitality With Heart",
    text: "A tradition of welcoming others with open doors, food, and compassion.",
    icon: Home,
    color: "#c6921d",
  },
];

const timeline = [
  {
    year: "1900s",
    text: "Communities live and trade together across the region.",
  },
  {
    year: "1960s",
    text: "Faiths and cultures stand together in challenging times.",
  },
  {
    year: "1990s",
    text: "Acts of protection and shelter define Kurdistan’s spirit.",
  },
  {
    year: "Today",
    text: "Coexistence continues as a living heritage for the future.",
  },
];

function DecorativeLine({ color = "#c99a55" }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <span className="h-px flex-1" style={{ backgroundColor: color }} />
      <span className="text-2xl" style={{ color }}>
        ✥
      </span>
      <span className="h-px flex-1" style={{ backgroundColor: color }} />
    </div>
  );
}

export default function StoriesOfCoexistencePage() {
  const sectionRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-story-animate='true']", {
        autoAlpha: 0,
        y: 24,
      });

      gsap.to("[data-story-animate='true']", {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.07,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="m-0 flex min-h-screen w-screen justify-center bg-[#f8f1e7] p-0 text-[#3d2b18]">
      <section
        ref={sectionRef}
        className="relative min-h-screen w-full overflow-hidden bg-[#fbf1df] px-7 py-9 sm:px-10 lg:px-16"
      >
        <img
          src={bg}
          alt=""
          className="absolute left-0 top-[210px] h-[610px] w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#fbf1df] via-[#fbf1df]/15 to-[#fbf1df]" />
        <div className="absolute left-0 top-[720px] h-[160px] w-full bg-gradient-to-b from-transparent to-[#fbf1df]" />

        <div className="pointer-events-none absolute inset-4 rounded-[30px] border-2 border-[#d2a35a]/40" />

        <button className="absolute right-8 top-8 z-30 flex items-center gap-3 rounded-full border border-[#d9b477] bg-white/75 px-5 py-3 font-serif text-sm font-semibold text-[#4b3219] shadow-[0_8px_20px_rgba(84,54,16,0.15)]">
          <Globe2 className="h-5 w-5" />
          ENGLISH
        </button>

        <div className="relative z-10 mx-auto max-w-[1060px]">
          <header
            data-story-animate="true"
            className="mx-auto max-w-[820px] pt-10 text-center"
          >
            <div className="mx-auto mb-4 w-[430px] max-w-full">
              <DecorativeLine color="#c3923a" />
            </div>

            <h1 className="font-serif text-[58px] font-semibold uppercase leading-[1.02] tracking-[0.06em] text-[#2f1f12] sm:text-[78px] lg:text-[90px]">
              Stories of
              <br />
              Coexistence
            </h1>

            <p className="mt-4 font-serif text-[25px] font-semibold text-[#a46f22] sm:text-[31px]">
              Protection, hospitality, and shared life.
            </p>
          </header>

          <div className="h-[560px]" />

          <section
            data-story-animate="true"
            className="relative mx-auto rounded-[22px] border-2 border-[#d8b875]/60 bg-[#fff8e9]/88 px-8 py-6 text-center shadow-[0_10px_24px_rgba(75,45,12,0.12)] backdrop-blur-sm"
          >
            <Quote className="absolute left-8 top-5 h-10 w-10 text-[#c58b16]" />
            <Quote className="absolute bottom-5 right-8 h-10 w-10 rotate-180 text-[#c58b16]" />

            <p className="mx-auto max-w-[760px] font-serif text-[24px] italic leading-relaxed text-[#3b2b1e]">
              In this land, we have learned that our differences do not divide
              us — they strengthen us.
            </p>

            <p className="mt-3 font-serif text-[15px] font-semibold uppercase tracking-[0.16em] text-[#b27a22]">
              Elder from Kurdistan
            </p>
          </section>

          <section
            data-story-animate="true"
            className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {storyCards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  className="flex min-h-[310px] flex-col items-center rounded-[22px] border-2 border-[#d8b875]/55 bg-[#fff8e9]/92 px-5 py-7 text-center shadow-[0_10px_22px_rgba(75,45,12,0.12)] backdrop-blur-sm"
                >
                  <div
                    className="grid h-20 w-20 place-items-center rounded-full border-2 border-[#e4c47e] text-white"
                    style={{ backgroundColor: card.color }}
                  >
                    <Icon className="h-10 w-10" strokeWidth={1.7} />
                  </div>

                  <h3 className="mt-5 min-h-[62px] font-serif text-[23px] font-semibold uppercase leading-tight text-[#3b2410]">
                    {card.title}
                  </h3>

                  <p className="mt-2 flex-1 text-[16px] font-semibold leading-relaxed text-[#4d3c2a]">
                    {card.text}
                  </p>

                  <div className="my-4 h-px w-[120px] bg-[#d1a14f]" />

                  <button className="flex items-center gap-3 font-serif text-[15px] font-semibold uppercase text-[#6a4a25]">
                    Read Story
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </article>
              );
            })}
          </section>

          <section data-story-animate="true" className="mt-8">
            <div className="mx-auto flex max-w-[760px] items-center gap-5">
              <span className="h-px flex-1 bg-[#c3923a]" />
              <h2 className="font-serif text-[25px] font-semibold uppercase tracking-[0.07em] text-[#8d611f]">
                A Journey Through Time
              </h2>
              <span className="h-px flex-1 bg-[#c3923a]" />
            </div>

            <div className="relative mt-6 grid grid-cols-1 gap-5 sm:grid-cols-4">
              <div className="absolute left-0 right-0 top-4 hidden h-px bg-[#c3923a] sm:block" />

              {timeline.map((item) => (
                <article key={item.year} className="relative text-center">
                  <div className="mx-auto mb-3 h-7 w-7 rounded-full border-4 border-[#f5e2b6] bg-[#c58b16] shadow-sm" />

                  <h3 className="font-serif text-[28px] font-semibold uppercase text-[#a8751f]">
                    {item.year}
                  </h3>

                  <p className="mx-auto mt-2 max-w-[180px] text-[16px] font-semibold leading-snug text-[#4d3c2a]">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section
            data-story-animate="true"
            className="mx-auto mt-9 flex max-w-[760px] items-center gap-7 rounded-[26px] border-2 border-[#c99745]/45 bg-[#fff7e7]/95 px-8 py-5 shadow-[0_12px_28px_rgba(75,45,12,0.16)]"
          >
            <div className="grid h-16 w-16 shrink-0 place-items-center text-[#c58b16]">
              <UsersRound className="h-12 w-12" strokeWidth={1.8} />
            </div>

            <p className="flex-1 font-serif text-[25px] font-semibold uppercase leading-tight text-[#3b2410]">
              Together, We Build Tomorrow
              <br />
              <span className="text-[17px] normal-case font-semibold text-[#6a4a25]">
                Diversity is our strength. Coexistence is our legacy.
              </span>
            </p>

            <button className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-[#d6b06b] bg-[#fff4dc] text-[#a8751f]">
              <ChevronRight className="h-9 w-9" />
            </button>
          </section>
        </div>

        <div className="pointer-events-none absolute bottom-0 right-0 h-52 w-52 rounded-tl-full border-l-2 border-t-2 border-[#d2a35a]/30 opacity-70" />
      </section>
    </main>
  );
}