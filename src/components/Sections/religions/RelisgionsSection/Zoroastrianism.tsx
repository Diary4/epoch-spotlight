import React from "react";
import gsap from "gsap";
import {
  ArrowLeft,
  Flame,
  Globe2,
  Leaf,
  Scale,
  Sparkles,
  Sun,
} from "lucide-react";

import bg from "@/assets/images/religions/r-7.png";

const cards = [
  {
    title: "HISTORY",
    icon: Scale,
    text: "Dominant religion in Kurdistan before Islam. Flourished during Achaemenid and Sassanian empires. First fire temple in Iraqi Kurdistan opened in Sulaymaniyah in 2016.",
  },
  {
    title: "THREE PILLARS",
    icon: Sparkles,
    text: "Good Thoughts, Good Words, Good Deeds. Work and diligence are religious duties. Respecting the beliefs of others is a core principle.",
  },
  {
    title: "ENVIRONMENT",
    icon: Leaf,
    text: "Fire, air, water, and earth are sacred. Environmental protection is the most crucial religious duty. Both spouses must plant a tree upon marriage and with the birth of each child.",
  },
  {
    title: "NOWRUZ",
    icon: Sun,
    text: "The most prominent Zoroastrian festival, celebrated March 21. Since 2015 the Atashgah has provided over 10,000 job opportunities to people of all backgrounds in Kurdistan.",
  },
];

function DecorativeLine({ color = "#c3923a" }) {
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

type ZoroastrianismPageProps = {
  lang?: "en" | "ku" | "ar";
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function ZoroastrianismPage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: ZoroastrianismPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const dir = lang === "en" ? "ltr" : "rtl";

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-zoro-hero='true']", {
        autoAlpha: 0,
        scale: 1.04,
      });

      gsap.set("[data-zoro-animate='true']", {
        autoAlpha: 0,
        y: 24,
      });

      const tl = gsap.timeline();

      tl.to("[data-zoro-hero='true']", {
        autoAlpha: 1,
        scale: 1,
        duration: 0.9,
        ease: "power2.out",
      }).to(
        "[data-zoro-animate='true']",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.25",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      dir={dir}
      className="m-0 flex min-h-screen w-screen justify-center bg-[#f8f1e7] p-0 text-[#3d2b18]"
    >
      <section
        ref={sectionRef}
        className="relative min-h-screen w-full overflow-hidden bg-[#fbf1df] px-7 py-9 sm:px-10 lg:px-16"
      >
        <img
          data-zoro-hero="true"
          src={bg}
          alt=""
          className="absolute inset-0 h-[60vh] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]"
        />
        <div className="absolute inset-x-0 top-0 h-[60vh] bg-gradient-to-b from-[#fbf1df]/72 via-[#fbf1df]/30 to-[#f4dfbb]/95" />
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
          type="button"
          onClick={onLanguageChange}
          className="absolute right-8 top-8 z-30 flex items-center gap-3 rounded-full border border-[#d9b477] bg-white/75 px-5 py-3 font-serif text-sm font-semibold text-[#4b3219] shadow-[0_8px_20px_rgba(84,54,16,0.15)]"
        >
          <Globe2 className="h-5 w-5" />
          {languageLabel}
        </button>

        <div className="relative z-10 mx-auto max-w-[1120px]">
          <header
            data-zoro-animate="true"
            className="mx-auto max-w-[900px] pt-28 text-center sm:pt-32"
          >
            <div className="mx-auto mb-6 grid h-24 w-24 place-items-center text-[68px] text-[#b9822d]">
              ✥
            </div>

            <div className="mx-auto mb-5 w-[480px] max-w-full">
              <DecorativeLine />
            </div>

            <h1 className="font-serif text-[64px] font-semibold uppercase leading-[1] tracking-[0.14em] text-[#2f1f12] sm:text-[82px] lg:text-[102px]">
              ZOROASTRIANISM
            </h1>

            <p className="mt-4 font-serif text-[26px] font-semibold text-[#7d5a2d] sm:text-[36px]">
              Light, truth, and ancient wisdom
            </p>

            <div className="mx-auto mt-8 w-[210px]">
              <DecorativeLine />
            </div>
          </header>

          <div className="h-[480px]" />

          <section
            data-zoro-animate="true"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {cards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  className="min-h-[335px] rounded-[24px] border-2 border-[#d8b875]/70 bg-[#fff8e9]/92 px-5 py-7 text-center shadow-[0_12px_28px_rgba(75,45,12,0.18)] backdrop-blur-sm"
                >
                  <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full border-4 border-[#f4dfb7] bg-[#b9822d] text-white shadow-inner">
                    <Icon className="h-10 w-10" strokeWidth={1.7} />
                  </div>

                  <h3 className="font-serif text-[21px] font-semibold uppercase leading-tight text-[#3b2410]">
                    {card.title}
                  </h3>

                  <div className="mx-auto my-4 w-[140px]">
                    <DecorativeLine color="#d1a14f" />
                  </div>

                  <p className="text-[16px] font-semibold leading-relaxed text-[#4d3c2a]">
                    {card.text}
                  </p>
                </article>
              );
            })}
          </section>

          <section
            data-zoro-animate="true"
            className="mx-auto mt-8 flex max-w-[820px] items-center justify-center gap-8 rounded-[26px] border-2 border-[#c99745]/55 bg-[#fff7e7]/95 px-8 py-5 shadow-[0_12px_28px_rgba(75,45,12,0.16)]"
          >
            <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-[#b9822d] text-[42px] text-white">
              <Flame className="h-10 w-10" />
            </div>

            <p className="font-serif text-[32px] font-semibold leading-tight text-[#3b2410]">
              An ancient flame of wisdom.
            </p>

            <Sparkles className="h-8 w-8 shrink-0 text-[#c58b16]" />
          </section>

          <div className="mt-8 text-center text-[58px] text-[#b9822d]">✥</div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 h-52 w-52 rounded-tr-full border-r-2 border-t-2 border-[#d2a35a]/30 opacity-70" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-52 w-52 rounded-tl-full border-l-2 border-t-2 border-[#d2a35a]/30 opacity-70" />
      </section>
    </main>
  );
}
