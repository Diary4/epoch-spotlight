import React from "react";
import gsap from "gsap";
import { ArrowLeft, Globe2, BookOpen, Landmark } from "lucide-react";
import bg from "@/assets/images/religions/c-1.png";

type LangCode = "en" | "ku" | "ar";

type SourcesReferencesProps = {
  lang?: LangCode;
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function SourcesReferences({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: SourcesReferencesProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const dir = lang === "en" ? "ltr" : "rtl";

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-src-animate='true']", {
        autoAlpha: 0,
        y: 28,
      });

      gsap.to("[data-src-animate='true']", {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      dir={dir}
      className="m-0 min-h-screen w-screen bg-[#f4eadb] p-0 text-[#302214]"
    >
      <section
        ref={sectionRef}
        className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#f3e5ce] px-6 py-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.55),transparent_34%),linear-gradient(180deg,#f8eddb_0%,#ead3ad_100%)]" />

        <img
          data-src-hero="true"
          src={bg}
          alt=""
          className="absolute right-0 top-0 h-[100vh] w-full object-cover [mask-image:linear-gradient(to_left,black_0%,black_70%,transparent_100%)]"
        />
        <div className="absolute inset-x-0 top-0 h-[50vh] bg-gradient-to-b from-[#f4eadb]/72 via-[#f4eadb]/30 to-[#f4eadb]/95" />
        <div className="absolute inset-0 opacity-[0.18]">
          <div className="absolute left-0 top-0 h-[360px] w-[360px] rounded-full border border-[#b98634]" />
          <div className="absolute right-0 bottom-0 h-[360px] w-[360px] rounded-full border border-[#b98634]" />
        </div>

        <div className="pointer-events-none absolute inset-5 rounded-[30px] border border-[#c99a55]/55" />

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="absolute left-8 top-8 z-30 grid h-14 w-14 place-items-center rounded-full border border-[#d7b77e] bg-white/75 text-[#3f2b17] shadow-[0_10px_24px_rgba(75,45,12,0.12)] backdrop-blur-md"
          >
            <ArrowLeft className="h-7 w-7" />
          </button>
        )}

        {onLanguageChange && (
          <button
            type="button"
            onClick={onLanguageChange}
            className="absolute right-8 top-8 z-30 flex items-center gap-3 rounded-full border border-[#d7b77e] bg-white/75 px-5 py-3 font-serif text-sm font-semibold text-[#3f2b17] shadow-[0_10px_24px_rgba(75,45,12,0.12)] backdrop-blur-md"
          >
            <Globe2 className="h-5 w-5" />
            {languageLabel}
          </button>
        )}

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-[900px] flex-col items-center justify-center text-center">
          <div data-src-animate="true" className="mb-5 grid place-items-center">
            <div className="grid h-24 w-24 place-items-center rounded-full border border-[#b98634]/50 bg-white/35 shadow-[0_16px_40px_rgba(96,60,21,0.15)] backdrop-blur-sm">
              <Landmark className="h-11 w-11 text-[#9f6b25]" strokeWidth={1.4} />
            </div>
          </div>

          <div data-src-animate="true" className="mb-6 flex w-full max-w-[520px] items-center gap-5">
            <span className="h-px flex-1 bg-[#b98634]/60" />
            <span className="text-3xl text-[#b98634]">✥</span>
            <span className="h-px flex-1 bg-[#b98634]/60" />
          </div>

          <h1
            data-src-animate="true"
            className="font-serif text-[56px] font-semibold uppercase leading-[1.05] tracking-[0.08em] text-[#2c1d10] sm:text-[78px] lg:text-[92px]"
          >
            Sources &
            <br />
            References
          </h1>

          <p
            data-src-animate="true"
            className="mt-5 font-serif text-[28px] text-[#4f3824] sm:text-[36px]"
          >
            Official publication and source material
          </p>

          <div data-src-animate="true" className="mt-8 w-[220px]">
            <div className="flex items-center justify-center gap-4">
              <span className="h-px flex-1 bg-[#b98634]/60" />
              <span className="text-2xl text-[#b98634]">✥</span>
              <span className="h-px flex-1 bg-[#b98634]/60" />
            </div>
          </div>

          <div
            data-src-animate="true"
            className="relative mt-10 w-full max-w-[650px] rounded-[28px] border border-[#c99a55]/70 bg-[#f8ecd8]/78 px-8 py-12 shadow-[0_28px_70px_rgba(88,55,20,0.18)] backdrop-blur-md"
          >
            <div className="absolute left-1/2 top-0 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#d8bc7b] bg-[#b78332] text-white shadow-lg">
              <BookOpen className="h-9 w-9" strokeWidth={1.4} />
            </div>

            <p className="mt-4 font-serif text-[27px] leading-relaxed text-[#3e2a19]">
              All information presented in this exhibition is sourced from the
              official publication:
            </p>

            <div className="mx-auto my-8 w-[180px]">
              <div className="flex items-center justify-center gap-4">
                <span className="h-px flex-1 bg-[#b98634]/60" />
                <span className="text-xl text-[#b98634]">✥</span>
                <span className="h-px flex-1 bg-[#b98634]/60" />
              </div>
            </div>

            <h2 className="font-serif text-[42px] font-semibold leading-tight text-[#2f2013] sm:text-[52px]">
              “Kurdistan:
              <br />
              The Cradle of Coexistence”
            </h2>

            <div className="mx-auto my-8 w-[180px]">
              <div className="flex items-center justify-center gap-4">
                <span className="h-px flex-1 bg-[#b98634]/60" />
                <span className="text-xl text-[#b98634]">✥</span>
                <span className="h-px flex-1 bg-[#b98634]/60" />
              </div>
            </div>

            <p className="font-serif text-[27px] leading-relaxed text-[#3e2a19]">
              Published by the
              <br />
              <strong>Ministry of Endowment and Religious Affairs</strong>
              <br />
              Kurdistan Regional Government — Iraq
            </p>
          </div>

          <div data-src-animate="true" className="mt-10 w-[220px]">
            <div className="flex items-center justify-center gap-4">
              <span className="h-px flex-1 bg-[#b98634]/60" />
              <span className="text-2xl text-[#b98634]">✥</span>
              <span className="h-px flex-1 bg-[#b98634]/60" />
            </div>
          </div>

          <p
            data-src-animate="true"
            className="mt-6 font-serif text-[25px] leading-relaxed text-[#3e2a19]"
          >
            Prepared for museum exhibition
            <br />
            and public education.
          </p>
        </div>
      </section>
    </main>
  );
}