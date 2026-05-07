import React from "react";
import gsap from "gsap";
import { ArrowLeft, BookOpen, Globe2, MapPin, Sparkles } from "lucide-react";

import bg from "@/assets/images/religions/r-3.png";

const languages = [
  {
    title: "Kurdish",
    script: "کوردی",
    text: "The heart of Kurdistan. Spoken in many dialects and written in Arabic, Latin, and Cyrillic scripts.",
    color: "#2f6b3f",
  },
  {
    title: "Arabic",
    script: "العربية",
    text: "A shared language across the region with deep roots in literature, faith, and daily life.",
    color: "#c58b16",
  },
  {
    title: "Turkmen",
    script: "مان",
    text: "A Turkic language spoken by Turkmen communities, carrying oral traditions and poetry.",
    color: "#16818b",
  },
  {
    title: "Syriac",
    script: "ܣܘܪܝܝܐ",
    text: "An ancient Aramaic heritage language of Christian communities, kept alive in worship and tradition.",
    color: "#71428c",
  },
  {
    title: "Armenian",
    script: "ԱԲԳ",
    text: "A classical language with a rich literary and cultural legacy in Kurdistan’s historic towns.",
    color: "#a04f1c",
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

type LanguagesOfKurdistanPageProps = {
  lang?: "en" | "ku" | "ar";
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function LanguagesOfKurdistanPage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: LanguagesOfKurdistanPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const dir = lang === "en" ? "ltr" : "rtl";

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-language-hero='true']", {
        autoAlpha: 0,
        scale: 1.04,
      });
      gsap.set("[data-language-animate='true']", {
        autoAlpha: 0,
        y: 24,
      });

      const tl = gsap.timeline();
      tl.to("[data-language-hero='true']", {
        autoAlpha: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      }).to(
        "[data-language-animate='true']",
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
    <main dir={dir} className="m-0 flex min-h-screen w-screen justify-center bg-[#f8f1e7] p-0 text-[#3d2b18]">
      <section
        ref={sectionRef}
        className="relative min-h-screen w-full overflow-hidden bg-[#fbf1df] px-7 py-9 sm:px-10 lg:px-16"
      >
        <img
          data-language-hero="true"
          src={bg}
          alt=""
          className="absolute left-0 top-0 h-[calc(50vh-160px)] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_78%,transparent_100%)]"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#fbf1df]/15 via-[#fbf1df]/58 to-[#fbf1df]" />
        <div
          className="pointer-events-none absolute inset-x-0 top-[calc(50vh-160px)] z-[1] h-24 -translate-y-full blur-[2px]"
          style={{
            background:
              "linear-gradient(to top, rgba(251,241,223,0.95) 0%, rgba(251,241,223,0.62) 45%, rgba(251,241,223,0) 100%)",
          }}
        />
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

        <div className="relative z-10 mx-auto max-w-[980px]">
          <header
            data-language-animate="true"
            className="mx-auto max-w-[820px] pt-12 text-center"
          >
            <div className="mx-auto mb-4 w-[430px] max-w-full">
              <DecorativeLine color="#c3923a" />
            </div>

            <h1 className="font-serif text-[58px] font-semibold uppercase leading-[1.04] tracking-[0.08em] text-[#2f1f12] sm:text-[78px] lg:text-[92px]">
              Languages
              <br />
              of Kurdistan
            </h1>

            <p className="mt-4 font-serif text-[23px] font-semibold uppercase tracking-[0.09em] text-[#a46f22] sm:text-[29px]">
              Voices, Scripts, and Living Identity
            </p>

            <div className="mx-auto mt-7 w-[190px]">
              <DecorativeLine color="#c3923a" />
            </div>

            <p className="mx-auto mt-6 max-w-[650px] text-[20px] font-semibold leading-relaxed text-[#3f3528] sm:text-[24px]">
              Across mountains and plains, many communities preserve their
              identities, pass down their stories, and build their
              futures—through language.
            </p>
          </header>

          <div className="h-[520px]" />

          <div
            data-language-animate="true"
            className="mb-5 flex justify-end"
          >
            <span className="flex items-center gap-2 rounded-full border border-[#d8b875]/70 bg-[#fff8e9]/90 px-5 py-2 font-serif text-[15px] font-semibold text-[#6a4a25] shadow-sm">
              <MapPin className="h-4 w-4 text-[#c58b16]" />
              Qubahan School – Amedi
            </span>
          </div>

          <section
            data-language-animate="true"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {languages.map((item) => (
              <article
                key={item.title}
                className="flex min-h-[315px] flex-col items-center rounded-[24px] border-2 border-[#d8b875]/55 bg-[#fff8e9]/92 px-6 py-7 text-center shadow-[0_10px_22px_rgba(75,45,12,0.12)] backdrop-blur-sm"
              >
                <div
                  className="mb-5 grid h-24 w-24 place-items-center rounded-full border-2 border-[#e4c47e] text-white"
                  style={{ backgroundColor: item.color }}
                >
                  <span className="font-serif text-[28px] font-semibold">
                    {item.script}
                  </span>
                </div>

                <h3
                  className="font-serif text-[28px] font-semibold uppercase leading-tight"
                  style={{ color: item.color }}
                >
                  {item.title}
                </h3>

                <div className="my-4 w-[150px]">
                  <DecorativeLine color="#d1a14f" />
                </div>

                <p className="text-[17px] font-semibold leading-relaxed text-[#4d3c2a]">
                  {item.text}
                </p>
              </article>
            ))}

            <article className="flex min-h-[315px] flex-col items-center justify-center rounded-[24px] border-2 border-[#d8b875]/55 bg-[#fff8e9]/92 px-6 py-7 text-center shadow-[0_10px_22px_rgba(75,45,12,0.12)] backdrop-blur-sm">
              <BookOpen className="mb-6 h-24 w-24 text-[#c58b16]" strokeWidth={1.4} />

              <h3 className="font-serif text-[24px] font-semibold uppercase leading-tight text-[#3b2410]">
                Language as Heritage
              </h3>

              <div className="my-4 w-[150px]">
                <DecorativeLine color="#d1a14f" />
              </div>

              <p className="text-[17px] font-semibold leading-relaxed text-[#4d3c2a]">
                Languages carry our memories, our values, and our worldview.
                Preserving them means preserving who we are—for today and for
                generations to come.
              </p>
            </article>
          </section>

          <section
            data-language-animate="true"
            className="mx-auto mt-8 rounded-[26px] border-2 border-[#c99745]/45 bg-[#fff7e7]/95 px-8 py-7 text-center shadow-[0_12px_28px_rgba(75,45,12,0.16)]"
          >
            <Sparkles className="mx-auto mb-4 h-12 w-12 text-[#c58b16]" />

            <h2 className="font-serif text-[34px] font-semibold uppercase leading-tight text-[#3b2410] sm:text-[42px]">
              Many Tongues, One Homeland.
            </h2>

            <p className="mt-3 text-[19px] font-semibold text-[#6a4a25]">
              Different languages. Shared stories. One Kurdistan.
            </p>

            <div className="mx-auto mt-5 w-[420px] max-w-full">
              <DecorativeLine color="#c3923a" />
            </div>
          </section>

          <Sparkles className="mx-auto mt-5 h-12 w-12 text-[#c58b16]" />
        </div>

        <div className="pointer-events-none absolute bottom-0 right-0 h-52 w-52 rounded-tl-full border-l-2 border-t-2 border-[#d2a35a]/30 opacity-70" />
      </section>
    </main>
  );
}