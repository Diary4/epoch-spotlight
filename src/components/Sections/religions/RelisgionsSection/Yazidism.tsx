import React from "react";
import gsap from "gsap";
import {
  ArrowLeft,
  ChevronRight,
  Globe2,
  HeartHandshake,
  Sparkles,
} from "lucide-react";

import bg from "@/assets/images/religions/r-4.png";
import lalish from "@/assets/mainImages/story-1.png";
import peacock from "@/assets/mainImages/story-2.png";
import festival from "@/assets/mainImages/2005.png";
import candle from "@/assets/images/bg-2.jpg";

const cards = [
  {
    title: "Lalish",
    text: "The holiest of Yazidism, nestled in the sacred valley of Lalish. A place of pilgrimage, learning, and spiritual renewal for thousands of Yazidis from around the world.",
    image: lalish,
  },
  {
    title: "Tawus Melek",
    text: "The Peacock Angel is the central figure in Yazidi belief. A symbol of divine wisdom, beauty, and the eternal presence of God’s light in the world.",
    image: peacock,
  },
  {
    title: "Major Festivals",
    text: "Çarşema Sor – Red Wednesday\nÊzîdî New Year – Serê Salê\nCejna Êzî – The Festival of Gathering and Gratitude",
    image: festival,
  },
  {
    title: "Remembrance of the 2014 Genocide",
    text: "We honor the memory of our martyrs and all victims of the 2014 genocide. We remember. We heal. We rise. We are Yazidi.",
    image: candle,
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

type YazidismPageProps = {
  onBack?: () => void;
};

export default function YazidismPage({ onBack }: YazidismPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-yazidi-hero='true']", {
        autoAlpha: 0,
        scale: 1.04,
      });
      gsap.set("[data-yazidi-animate='true']", {
        autoAlpha: 0,
        y: 24,
      });

      const tl = gsap.timeline();
      tl.to("[data-yazidi-hero='true']", {
        autoAlpha: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      }).to(
        "[data-yazidi-animate='true']",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.07,
          ease: "power2.out",
        },
        "-=0.2",
      );
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
          data-yazidi-hero="true"
          src={bg}
          alt=""
          className="absolute left-0 top-0 h-[calc(60vh-10rem)] w-full object-cover object-center"
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-[calc(60vh-10rem)] z-[1] h-24 -translate-y-full blur-[2px]"
          style={{
            background:
              "linear-gradient(to top, rgba(251,241,223,0.95) 0%, rgba(251,241,223,0.62) 45%, rgba(251,241,223,0) 100%)",
          }}
        />

        {/* <div className="absolute inset-0 bg-gradient-to-b from-[#fbf1df]/35 via-[#fbf1df]/15 to-[#fbf1df]" /> */}
        {/* <div className="absolute left-0 top-[670px] h-[150px] w-full bg-gradient-to-b from-transparent to-[#fbf1df]" /> */}

        {/* <div className="pointer-events-none absolute inset-4 rounded-[30px] border-2 border-[#d2a35a]/40" /> */}

        <button
          type="button"
          onClick={onBack}
          className="absolute left-8 top-8 z-30 grid h-14 w-14 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#5a3a18] shadow-sm"
          aria-label="Back"
        >
          <ArrowLeft className="h-7 w-7" />
        </button>

        <button className="absolute right-8 top-8 z-30 flex items-center gap-3 rounded-full border border-[#d9b477] bg-white/75 px-5 py-3 font-serif text-sm font-semibold text-[#4b3219] shadow-[0_8px_20px_rgba(84,54,16,0.15)]">
          <Globe2 className="h-5 w-5" />
          ENGLISH
        </button>

        <div className="relative z-10 mx-auto max-w-[1020px]">
          <header
            data-yazidi-animate="true"
            className="mx-auto max-w-[820px] pt-12 text-center"
          >
            <div className="mx-auto mb-4 w-[440px] max-w-full">
              <DecorativeLine color="#c3923a" />
            </div>

            <h1 className="font-serif text-[66px] font-semibold uppercase leading-[1] tracking-[0.1em] text-[#2f1f12] sm:text-[86px] lg:text-[104px]">
              Yazidism
            </h1>

            <p className="mt-4 font-serif text-[25px] font-semibold text-[#a46f22] sm:text-[31px]">
              Sacred memory, resilience, and spiritual continuity.
            </p>

            <div className="mx-auto mt-6 w-[190px]">
              <DecorativeLine color="#c3923a" />
            </div>

            <p className="mx-auto mt-6 max-w-[620px] text-[19px] font-semibold leading-relaxed text-[#3f3528] sm:text-[23px]">
              Rooted in ancient wisdom and nurtured through generations,
              Yazidism is a faith of light, truth, and compassion. It honors
              creation, cherishes freedom, and upholds the dignity of every soul.
            </p>
          </header>

          <div className="h-[560px]" />

          <div
            data-yazidi-animate="true"
            className="mb-6 flex justify-end"
          >
            <span className="rounded-full border border-[#d8b875]/70 bg-[#fff8e9]/90 px-5 py-2 font-serif text-[16px] font-semibold text-[#6a4a25] shadow-sm">
              Lalish Temple – Yazidi Holy Site
            </span>
          </div>

          <section
            data-yazidi-animate="true"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            {cards.map((card) => (
              <article
                key={card.title}
                className="grid min-h-[255px] grid-cols-[135px_1fr] gap-5 rounded-[24px] border-2 border-[#d8b875]/55 bg-[#fff8e9]/92 px-6 py-6 shadow-[0_10px_22px_rgba(75,45,12,0.12)] backdrop-blur-sm"
              >
                <div className="h-[135px] w-[135px] overflow-hidden rounded-full border-2 border-[#d8b875] bg-[#f4e1bb]">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif text-[27px] font-semibold uppercase leading-tight text-[#3b2410]">
                      {card.title}
                    </h3>
                    <Sparkles className="h-8 w-8 shrink-0 text-[#c58b16]" />
                  </div>

                  <div className="my-3 w-[130px]">
                    <DecorativeLine color="#d1a14f" />
                  </div>

                  <p className="whitespace-pre-line text-[17px] font-semibold leading-relaxed text-[#4d3c2a]">
                    {card.text}
                  </p>
                </div>
              </article>
            ))}
          </section>

          <section
            data-yazidi-animate="true"
            className="mx-auto mt-7 flex items-center gap-7 rounded-[26px] border-2 border-[#c99745]/45 bg-[#fff7e7]/95 px-8 py-5 shadow-[0_12px_28px_rgba(75,45,12,0.16)]"
          >
            <div className="grid h-16 w-16 shrink-0 place-items-center text-[#c58b16]">
              <HeartHandshake className="h-12 w-12" strokeWidth={1.8} />
            </div>

            <p className="flex-1 font-serif text-[27px] font-semibold uppercase leading-tight text-[#3b2410]">
              Faith. Memory. Future.
              <br />
              <span className="text-[18px] normal-case font-semibold text-[#6a4a25]">
                Through every trial, Yazidism endures.
                <br />
                Our faith is our strength. Our memory is our promise.
                <br />
                Our future is our light.
              </span>
            </p>

            <button className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-[#d6b06b] bg-[#fff4dc] text-[#a8751f]">
              <ChevronRight className="h-9 w-9" />
            </button>
          </section>

          <Sparkles className="mx-auto mt-5 h-12 w-12 text-[#c58b16]" />
        </div>

        <div className="pointer-events-none absolute bottom-0 right-0 h-52 w-52 rounded-tl-full border-l-2 border-t-2 border-[#d2a35a]/30 opacity-70" />
      </section>
    </main>
  );
}