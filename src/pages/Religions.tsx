import React from "react";
import gsap from "gsap";
import {
  ArrowLeft,
  ChevronRight,
  Globe2,
  Landmark,
  Church,
  UsersRound,
  HeartHandshake,
} from "lucide-react";

import bg from "@/assets/mainImages/2005.png";
import card1 from "@/assets/mainImages/2005.png";
import card2 from "@/assets/mainImages/2005.png";
import card3 from "@/assets/mainImages/2005.png";

const cards = [
  {
    title: "Religions",
    text: "Explore the rich religious heritage and sacred traditions of Kurdistan.",
    image: card1,
    icon: Church,
    color: "#244b1f",
  },
  {
    title: "Nationalities",
    text: "Discover the diverse ethnic communities, their languages, and cultural contributions.",
    image: card2,
    icon: UsersRound,
    color: "#16466b",
  },
  {
    title: "Stories of Coexistence",
    text: "Real stories of unity, protection, and everyday coexistence across Kurdistan.",
    image: card3,
    icon: HeartHandshake,
    color: "#52235f",
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

type ReligiousDiversityPageProps = {
  onBack?: () => void;
};

export default function ReligiousDiversityPage({
  onBack,
}: ReligiousDiversityPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-rd-animate='true']", {
        autoAlpha: 0,
        y: 24,
      });

      gsap.to("[data-rd-animate='true']", {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="m-0 flex min-h-screen w-screen justify-center bg-[#f8f1e7] p-0 text-[#3d2b18]">
      <section
        ref={sectionRef}
        className="relative min-h-screen w-full overflow-hidden bg-[#fbf1df] px-8 py-10 sm:px-12 lg:px-20"
      >
        <img
          src={bg}
          alt=""
          className="absolute inset-0 h-[calc(70vh-160px)] w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#fbf1df]/78 via-[#fbf1df]/20 to-[#f4dfbb]/92" />
        <div className="pointer-events-none absolute inset-5 rounded-[30px] border-2 border-[#d2a35a]/45" />

        <button
          type="button"
          onClick={onBack}
          className="absolute left-8 top-8 z-30 grid h-14 w-14 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#5a3a18] shadow-sm"
          aria-label="Back"
        >
          <ArrowLeft className="h-7 w-7" />
        </button>

        <button
          data-rd-animate="true"
          className="absolute right-8 top-8 z-30 flex items-center gap-3 rounded-full border border-[#d9b477] bg-white/75 px-5 py-3 font-serif text-sm font-semibold text-[#4b3219] shadow-[0_8px_20px_rgba(84,54,16,0.15)]"
        >
          <Globe2 className="h-5 w-5" />
          ENGLISH
        </button>

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-[1180px] flex-col">
          <header
            data-rd-animate="true"
            className="mx-auto max-w-[850px] pt-12 text-center"
          >
            <div className="mx-auto mb-2 w-[420px] max-w-full">
              <DecorativeLine color="#c3923a" />
            </div>

            <h1 className="font-serif text-[56px] font-semibold uppercase leading-[1.04] tracking-[0.06em] text-[#3b2410] sm:text-[76px] lg:text-[88px]">
              Religious &
              <br />
              National Diversity
              <br />
              in Kurdistan
            </h1>

            <h2 className="mt-5 font-serif text-[24px] font-semibold uppercase tracking-[0.08em] text-[#b27a22] sm:text-[30px]">
              Kurdistan: The Cradle of Coexistence
            </h2>

            <div className="mx-auto mt-4 w-[190px]">
              <DecorativeLine color="#c3923a" />
            </div>

            <p className="mx-auto mt-5 max-w-[610px] text-[21px] font-semibold leading-relaxed text-[#4d3c2a] sm:text-[26px]">
              Across faiths, languages, and cultures, Kurdistan stands as a
              timeless home of respect, unity, and shared heritage.
            </p>
          </header>

          <div className="flex-1" />

          <section
            data-rd-animate="true"
            className="mx-auto grid w-full max-w-[1040px] grid-cols-1 gap-6 pb-7 sm:grid-cols-3"
          >
            {cards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  className="group relative min-h-[calc(30vh-160px)] overflow-hidden rounded-[28px] border-2 border-[#f3dfb5] shadow-[0_18px_35px_rgba(69,43,14,0.24)]"
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to bottom, rgba(30,20,10,0.05), ${card.color}ee 72%, ${card.color})`,
                    }}
                  />

                  <div className="relative z-10 flex h-full flex-col justify-end px-7 py-7 text-white">
                    <div className="mb-5 grid h-20 w-20 place-items-center rounded-full border-2 border-[#e4c47e] bg-white/12 backdrop-blur-sm">
                      <Icon className="h-10 w-10" strokeWidth={1.7} />
                    </div>

                    <h3 className="font-serif text-[32px] font-semibold uppercase leading-tight">
                      {card.title}
                    </h3>

                    <p className="mt-3 min-h-[82px] text-[18px] font-semibold leading-snug text-white/90">
                      {card.text}
                    </p>

                    <button className="mt-6 grid h-16 w-full place-items-center rounded-2xl border-2 border-[#d8bc7b] bg-white/5 text-white backdrop-blur-sm transition group-hover:bg-white/15">
                      <ChevronRight className="h-9 w-9" />
                    </button>
                  </div>
                </article>
              );
            })}
          </section>

          <section
            data-rd-animate="true"
            className="mx-auto mb-4 flex w-full max-w-[760px] items-center gap-7 rounded-[28px] border-2 border-[#c99745]/45 bg-[#fff7e7]/95 px-8 py-5 shadow-[0_12px_28px_rgba(75,45,12,0.16)]"
          >
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#cf921d] text-white">
              <UsersRound className="h-9 w-9" />
            </div>

            <p className="flex-1 font-serif text-[25px] font-semibold uppercase leading-tight text-[#3b2410]">
              Shared Celebrations
              <br />
              <span className="text-[17px] normal-case font-semibold text-[#6a4a25]">
                Festivals and holidays we celebrate together.
              </span>
            </p>

            <button className="grid h-14 w-14 place-items-center rounded-full border border-[#d5b873] bg-[#fff4dc] text-[#8a5a12]">
              <ChevronRight className="h-8 w-8" />
            </button>
          </section>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 h-[180px] w-full bg-gradient-to-t from-[#b9893d]/25 to-transparent" />
        <Landmark className="pointer-events-none absolute bottom-8 left-1/2 h-14 w-14 -translate-x-1/2 text-[#c3923a]/70" />
      </section>
    </main>
  );
}