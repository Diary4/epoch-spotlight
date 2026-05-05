import React from "react";
import gsap from "gsap";
import {
  ArrowLeft,
  ChevronRight,
  Globe2,
  UsersRound,
  Sparkles,
} from "lucide-react";

import bg from "@/assets/images/religions/r-3.png";

const communities = [
  {
    title: "Kurds",
    text: "The indigenous people of Kurdistan with a rich cultural heritage, language, and enduring spirit.",
    color: "#9b7a34",
  },
  {
    title: "Turkmens",
    text: "Descendants of Oghuz Turkic tribes, known for their hospitality, traditions, and vibrant culture.",
    color: "#1681a2",
  },
  {
    title: "Assyrians",
    text: "An ancient Christian community with a deep historical presence and a strong cultural legacy.",
    color: "#8c795d",
  },
  {
    title: "Chaldeans",
    text: "A distinct Christian community preserving the Chaldean rite, faith, and centuries-old traditions.",
    color: "#9a3f2d",
  },
  {
    title: "Syriacs",
    text: "Keepers of one of the world's oldest liturgical traditions and a proud heritage of faith and learning.",
    color: "#3b718f",
  },
  {
    title: "Armenians",
    text: "An ancient community with a rich cultural, religious, and artistic heritage in Kurdistan.",
    color: "#71428c",
  },
  {
    title: "Yazidis",
    text: "A spiritual community with unique beliefs, honoring peace, tolerance, and the cycles of nature.",
    color: "#d0a143",
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

type LangCode = "en" | "ku" | "ar";

type NationalitiesProps = {
  lang?: LangCode;
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function Nationalities({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: NationalitiesProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const dir = lang === "en" ? "ltr" : "rtl";

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-nationality-animate='true']", {
        autoAlpha: 0,
        y: 22,
      });

      gsap.to("[data-nationality-animate='true']", {
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
    <main
      dir={dir}
      className="m-0 flex min-h-screen w-screen justify-center bg-[#f8f1e7] p-0 text-[#3d2b18]"
    >
      <section
        ref={sectionRef}
        className="relative min-h-screen w-full overflow-hidden bg-[#fbf1df] px-7 py-9 sm:px-10 lg:px-16"
      >
        <img
          src={bg}
          alt=""
          className="pointer-events-none absolute left-0 top-0 z-[1] h-[max(14rem,calc(50vh-10rem))] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_78%,transparent_100%)]"
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-[max(14rem,calc(50vh-10rem))] z-[1] h-24 -translate-y-full blur-[2px]"
          style={{
            background:
              "linear-gradient(to top, rgba(251,241,223,0.95) 0%, rgba(251,241,223,0.62) 45%, rgba(251,241,223,0) 100%)",
          }}
        />

        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-[#fbf1df]/15 via-[#fbf1df]/58 to-[#fbf1df]" />
        <div className="pointer-events-none absolute inset-4 rounded-[30px] border-2 border-[#d2a35a]/40" />

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
            data-nationality-animate="true"
            className="mx-auto max-w-[850px] pt-16 text-center"
          >
            <div className="mx-auto mb-4 w-[420px] max-w-full">
              <DecorativeLine color="#c3923a" />
            </div>

            <h1 className="font-serif text-[56px] font-semibold uppercase leading-[1.03] tracking-[0.07em] text-[#2f1f12] sm:text-[76px] lg:text-[88px]">
              Nationalities &
              <br />
              Communities
            </h1>

            <p className="mt-4 font-serif text-[24px] font-semibold uppercase tracking-[0.13em] text-[#a46f22] sm:text-[30px]">
              Languages, Heritage, and Belonging.
            </p>

            <div className="mx-auto mt-6 w-[190px]">
              <DecorativeLine color="#c3923a" />
            </div>

            <p className="mx-auto mt-5 max-w-[610px] text-[20px] font-semibold leading-relaxed text-[#4d3c2a] sm:text-[24px]">
              Kurdistan is a home to many peoples.
              <br />
              Each community brings its own history,
              <br />
              language, and traditions—woven together
              <br />
              in a shared identity.
            </p>
          </header>

          <div className="h-[230px]" />

          <section
            data-nationality-animate="true"
            className="mx-auto space-y-4"
          >
            {communities.map((item) => (
              <article
                key={item.title}
                className="flex min-h-[118px] items-center gap-7 rounded-[22px] border-2 border-[#d8b875]/55 bg-[#fff8e9]/92 px-7 py-5 shadow-[0_10px_22px_rgba(75,45,12,0.12)] backdrop-blur-sm"
              >
                <div
                  className="grid h-20 w-20 shrink-0 place-items-center"
                  style={{ color: item.color }}
                >
                  <Sparkles className="h-16 w-16" strokeWidth={1.4} />
                </div>

                <div className="flex-1">
                  <h3 className="font-serif text-[33px] font-semibold uppercase leading-tight text-[#3b2410]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[19px] font-semibold leading-snug text-[#4d3c2a]">
                    {item.text}
                  </p>
                </div>

                <button
                  type="button"
                  className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-[#d6b06b] bg-[#fff4dc] text-[#a8751f]"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
              </article>
            ))}
          </section>

          <section
            data-nationality-animate="true"
            className="mx-auto mt-6 flex items-center gap-7 rounded-[24px] border-2 border-[#c99745]/45 bg-[#fff7e7]/95 px-8 py-5 shadow-[0_12px_28px_rgba(75,45,12,0.16)]"
          >
            <div className="grid h-16 w-16 shrink-0 place-items-center text-[#c58b16]">
              <UsersRound className="h-12 w-12" strokeWidth={1.8} />
            </div>

            <p className="flex-1 font-serif text-[29px] font-semibold uppercase leading-tight text-[#3b2410]">
              United in Diversity
              <br />
              <span className="text-[20px] normal-case font-semibold text-[#6a4a25]">
                Different roots, one homeland.
              </span>
            </p>

            <button
              type="button"
              className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#c58b16] text-white shadow-[0_8px_18px_rgba(75,45,12,0.18)]"
            >
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