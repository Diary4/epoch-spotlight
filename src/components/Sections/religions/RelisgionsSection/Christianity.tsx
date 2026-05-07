import React from "react";
import gsap from "gsap";
import {
  ArrowLeft,
  ChevronRight,
  Church,
  Cross,
  Globe2,
  MapPin,
  UsersRound,
} from "lucide-react";

import bg from "@/assets/images/religions/r-5.png";
import ankawa from "@/assets/mainImages/story-1.png";
import churches from "@/assets/mainImages/story-2.png";
import denominations from "@/assets/mainImages/2005.png";
import sacredSites from "@/assets/images/bg-2.jpg";
import pope from "@/assets/images/kurdistan.jpg";

const cards = [
  {
    title: "Ankawa",
    text: "One of the world's oldest Christian communities, the Assyrian Church of the East has its spiritual heart in Ankawa.",
    image: ankawa,
    icon: Cross,
    color: "#245a2f",
  },
  {
    title: "Churches",
    text: "From ancient monasteries to modern parishes, churches across Kurdistan stand as beacons of prayer and community.",
    image: churches,
    icon: Church,
    color: "#075c78",
  },
  {
    title: "Major Denominations",
    text: "Christian life in Kurdistan is enriched by diverse traditions including the Assyrian Church of the East, Chaldean Catholic, Syriac Orthodox, and more.",
    image: denominations,
    icon: UsersRound,
    color: "#51245f",
  },
  {
    title: "Sacred Sites",
    text: "Historic monasteries, shrines, and holy landscapes reflect a timeless legacy of devotion and resilience.",
    image: sacredSites,
    icon: MapPin,
    color: "#7b5b16",
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

type ChristianityPageProps = {
  lang?: "en" | "ku" | "ar";
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function ChristianityPage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: ChristianityPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const dir = lang === "en" ? "ltr" : "rtl";

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-christian-animate='true']", {
        autoAlpha: 0,
        y: 24,
      });

      gsap.to("[data-christian-animate='true']", {
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
    <main dir={dir} className="m-0 flex min-h-screen w-screen justify-center bg-[#f8f1e7] p-0 text-[#3d2b18]">
      <section
        ref={sectionRef}
        className="relative min-h-screen w-full overflow-hidden bg-[#fbf1df] px-7 py-9 sm:px-10 lg:px-16"
      >
        <img
          src={bg}
          alt=""
          className="absolute left-0 top-0 h-[calc(50vh-160px)] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_78%,transparent_100%)]"
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-[calc(50vh-160px)] z-[1] h-24 -translate-y-full blur-[2px]"
          style={{
            background:
              "linear-gradient(to top, rgba(251,241,223,0.95) 0%, rgba(251,241,223,0.62) 45%, rgba(251,241,223,0) 100%)",
          }}
        />

        {/* <div className="absolute inset-0 bg-gradient-to-b from-[#fbf1df]/35 via-[#fbf1df]/8 to-[#fbf1df]" />
        <div className="absolute left-0 top-[660px] h-[170px] w-full bg-gradient-to-b from-transparent to-[#fbf1df]" />

        <div className="pointer-events-none absolute inset-4 rounded-[30px] border-2 border-[#d2a35a]/40" /> */}

        <button
          type="button"
          onClick={onBack}
          className="absolute left-8 top-8 z-30 grid h-14 w-14 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#5a3a18] shadow-sm"
          aria-label="Back"
        >
          <ArrowLeft className="h-7 w-7" />
        </button>

        <button
          type="button"
          onClick={onLanguageChange}
          className="absolute right-8 top-8 z-30 flex items-center gap-3 rounded-full border border-[#d9b477] bg-white/75 px-5 py-3 font-serif text-sm font-semibold text-[#4b3219] shadow-[0_8px_20px_rgba(84,54,16,0.15)]"
        >
          <Globe2 className="h-5 w-5" />
          {languageLabel}
        </button>

        <div className="relative z-10 mx-auto max-w-[1040px]">
          <header
            data-christian-animate="true"
            className="mx-auto max-w-[820px] pt-10 text-center"
          >
            <Cross className="mx-auto mb-3 h-16 w-16 text-[#c58b16]" />

            <div className="mx-auto mb-4 w-[430px] max-w-full">
              <DecorativeLine color="#c3923a" />
            </div>

            <h1 className="font-serif text-[64px] font-semibold uppercase leading-[1] tracking-[0.08em] text-[#2f1f12] sm:text-[86px] lg:text-[102px]">
              Christianity
            </h1>

            <p className="mt-4 font-serif text-[24px] font-semibold uppercase tracking-[0.08em] text-[#a46f22] sm:text-[30px]">
              Ancient Roots, Living Communities.
            </p>

            <div className="mx-auto mt-6 w-[190px]">
              <DecorativeLine color="#c3923a" />
            </div>

            <p className="mx-auto mt-6 max-w-[560px] text-[20px] font-semibold leading-relaxed text-[#3f3528] sm:text-[24px]">
              Christianity has thrived in Kurdistan for nearly two millennia,
              shaping our heritage, culture, and values. Today, vibrant
              communities continue to build bridges of faith and harmony.
            </p>
          </header>

          <div className="h-[520px]" />

          <div
            data-christian-animate="true"
            className="mb-5 flex justify-end"
          >
            <span className="rounded-full border border-[#d8b875]/70 bg-[#fff8e9]/90 px-5 py-2 font-serif text-[15px] italic font-semibold text-[#6a4a25] shadow-sm">
              Bedial Village – Barzan
            </span>
          </div>

          <section
            data-christian-animate="true"
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {cards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  className="group relative min-h-[470px] overflow-hidden rounded-[24px] border-2 border-[#f3dfb5] shadow-[0_14px_28px_rgba(69,43,14,0.22)]"
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to bottom, rgba(40,25,10,0.05), ${card.color}dd 58%, ${card.color})`,
                    }}
                  />

                  <div className="relative z-10 flex h-full flex-col justify-end px-5 py-6 text-white">
                    <div className="mb-5 grid h-20 w-20 place-items-center rounded-full border-2 border-[#e4c47e] bg-white/12 backdrop-blur-sm">
                      <Icon className="h-10 w-10" strokeWidth={1.7} />
                    </div>

                    <h3 className="font-serif text-[26px] font-semibold uppercase leading-tight">
                      {card.title}
                    </h3>

                    <p className="mt-3 flex-1 text-[16px] font-semibold leading-relaxed text-white/92">
                      {card.text}
                    </p>

                    <button className="mt-5 grid h-14 w-full place-items-center rounded-2xl border-2 border-[#d8bc7b] bg-white/5 text-white backdrop-blur-sm transition group-hover:bg-white/15">
                      <ChevronRight className="h-8 w-8" />
                    </button>
                  </div>
                </article>
              );
            })}
          </section>

          <section
            data-christian-animate="true"
            className="mt-7 grid overflow-hidden rounded-[24px] border-2 border-[#d8b875]/55 bg-[#fff8e9]/92 shadow-[0_12px_26px_rgba(75,45,12,0.14)] backdrop-blur-sm sm:grid-cols-[300px_1fr]"
          >
            <img
              src={pope}
              alt="Pope Francis in Erbil"
              className="h-full min-h-[170px] w-full object-cover"
            />

            <div className="flex items-center gap-6 px-7 py-6">
              <div className="grid h-24 w-24 shrink-0 place-items-center rounded-full border border-[#d8b875] bg-[#fff4dc] text-[#c58b16]">
                <Cross className="h-14 w-14" strokeWidth={1.5} />
              </div>

              <div>
                <h2 className="font-serif text-[31px] font-semibold uppercase leading-tight text-[#3b2410]">
                  Pope Francis in Erbil
                </h2>

                <p className="mt-1 font-serif text-[19px] font-semibold uppercase tracking-[0.07em] text-[#b27a22]">
                  5–8 March 2021
                </p>

                <p className="mt-3 text-[17px] font-semibold leading-relaxed text-[#4d3c2a]">
                  A historic visit of peace and hope. Pope Francis prayed for
                  the people of Iraq and encouraged dialogue, reconciliation,
                  and the protection of religious communities.
                </p>
              </div>
            </div>
          </section>

          <section
            data-christian-animate="true"
            className="mx-auto mt-6 flex max-w-[800px] items-center gap-7 rounded-[26px] border-2 border-[#c99745]/45 bg-[#fff7e7]/95 px-8 py-5 shadow-[0_12px_28px_rgba(75,45,12,0.16)]"
          >
            <Cross className="h-14 w-14 shrink-0 text-[#c58b16]" />

            <p className="flex-1 font-serif text-[22px] font-semibold leading-tight text-[#3b2410]">
              Faith, hope, and love unite us across generations.
              <br />
              <span className="italic text-[#a46f22]">
                Together, we build a future of dignity and peace.
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