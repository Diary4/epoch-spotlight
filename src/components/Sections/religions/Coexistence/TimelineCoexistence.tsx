import React from "react";
import gsap from "gsap";
import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  DoorOpen,
  FileCheck,
  Globe2,
  HandHeart,
  Handshake,
  HeartHandshake,
  Recycle,
  ShieldCheck,
  Sparkles,
  Sun,
  UsersRound,
} from "lucide-react";

const timeline = [
  {
    period: "Before 1900s",
    title: "Roots of Diversity",
    text: "Ancient peoples, languages, and faiths have shaped Kurdistan’s rich and diverse heritage.",
    icon: UsersRound,
    color: "#2f6b3f",
  },
  {
    period: "1900s – Mid 1900s",
    title: "A Long-Standing Legacy",
    text: "Communities of different religions and ethnicities lived, worked, and celebrated side by side.",
    icon: Handshake,
    color: "#0d6a84",
  },
  {
    period: "Mid 1900s – Late 1900s",
    title: "Refuge and Resilience",
    text: "In times of hardship, Kurdistan became a refuge—offering shelter, solidarity, and hope to many.",
    icon: HandHeart,
    color: "#65328a",
  },
  {
    period: "2000s – Early 2010s",
    title: "Recognition and Rights",
    text: "The Kurdistan Region formally recognized multiple religions and communities in law.",
    icon: FileCheck,
    color: "#c58b16",
  },
  {
    period: "2010s – Present",
    title: "Return and Continuity",
    text: "Displaced families return home. Communities rebuild, traditions flourish, and bonds endure.",
    icon: DoorOpen,
    color: "#2f6b3f",
  },
  {
    period: "Today and Beyond",
    title: "Shared Future",
    text: "Together, we build a future grounded in respect, equality, and shared purpose.",
    icon: UsersRound,
    color: "#0d6a84",
  },
];

const threads = [
  {
    title: "Respect",
    text: "Honoring every belief and identity.",
    icon: HandHeart,
    color: "#c58b16",
  },
  {
    title: "Solidarity",
    text: "Standing together in times of need and joy.",
    icon: UsersRound,
    color: "#b8862e",
  },
  {
    title: "Peace",
    text: "Choosing dialogue and understanding over division.",
    icon: Sparkles,
    color: "#47704c",
  },
  {
    title: "Heritage",
    text: "Preserving our cultural and spiritual legacy.",
    icon: BookOpen,
    color: "#65328a",
  },
  {
    title: "Unity",
    text: "Many paths, one shared home.",
    icon: Recycle,
    color: "#47704c",
  },
  {
    title: "Hope",
    text: "Inspiring future generations to live together.",
    icon: Sun,
    color: "#c58b16",
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

type TimelineOfCoexistencePageProps = {
  lang?: "en" | "ku" | "ar";
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function TimelineOfCoexistencePage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: TimelineOfCoexistencePageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const dir = lang === "en" ? "ltr" : "rtl";

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-timeline-animate='true']", {
        autoAlpha: 0,
        y: 24,
      });

      gsap.to("[data-timeline-animate='true']", {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.06,
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#fff8ea_0%,#fbf1df_45%,#f0dcb7_100%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(#d7b56c_1px,transparent_1px)] [background-size:24px_24px]" />
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

        <div className="relative z-10 mx-auto max-w-[1080px]">
          <header
            data-timeline-animate="true"
            className="mx-auto max-w-[850px] pt-12 text-center"
          >
            <div className="mx-auto mb-4 w-[440px] max-w-full">
              <DecorativeLine color="#c3923a" />
            </div>

            <h1 className="font-serif text-[56px] font-semibold uppercase leading-[1.03] tracking-[0.07em] text-[#2f1f12] sm:text-[76px] lg:text-[88px]">
              Timeline of
              <br />
              Coexistence
            </h1>

            <p className="mt-4 font-serif text-[24px] font-semibold text-[#a46f22] sm:text-[30px]">
              A journey through memory, resilience, and shared life.
            </p>

            <div className="mx-auto mt-7 w-[190px]">
              <DecorativeLine color="#c3923a" />
            </div>
          </header>

          <section
            data-timeline-animate="true"
            className="relative mx-auto mt-10 max-w-[980px]"
          >
            <div className="absolute left-[235px] top-0 hidden h-full w-px bg-[#c3923a]/55 lg:block" />

            <div className="space-y-7">
              {timeline.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="grid items-center gap-5 lg:grid-cols-[170px_90px_1fr_260px]"
                  >
                    <p className="text-center font-serif text-[22px] font-semibold uppercase leading-tight text-[#a8751f] lg:text-right">
                      {item.period}
                    </p>

                    <div
                      className="relative z-10 mx-auto grid h-24 w-24 place-items-center rounded-full border-[5px] border-[#ead8b7] text-white shadow-[0_10px_22px_rgba(75,45,12,0.16)]"
                      style={{ backgroundColor: item.color }}
                    >
                      <Icon className="h-12 w-12" strokeWidth={1.7} />
                    </div>

                    <div className="border-b border-[#d8b875]/45 pb-5">
                      <h3 className="font-serif text-[27px] font-semibold uppercase leading-tight text-[#3b2410]">
                        {item.title}
                      </h3>

                      <p className="mt-2 max-w-[430px] text-[17px] font-semibold leading-relaxed text-[#4d3c2a]">
                        {item.text}
                      </p>
                    </div>

                    <div className="hidden h-[115px] rounded-xl border border-[#d8b875]/35 bg-[#fff4dc]/35 p-4 text-[#c3923a]/45 lg:grid lg:place-items-center">
                      <ShieldCheck className="h-20 w-20" strokeWidth={1.1} />
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section
            data-timeline-animate="true"
            className="mt-11 rounded-[24px] border-2 border-[#d8b875]/55 bg-[#fff8e9]/88 px-6 py-6 shadow-[0_12px_26px_rgba(75,45,12,0.13)] backdrop-blur-sm"
          >
            <div className="mx-auto mb-5 flex max-w-[560px] items-center gap-4">
              <span className="h-px flex-1 bg-[#c3923a]" />
              <h2 className="font-serif text-[22px] font-semibold uppercase tracking-[0.06em] text-[#3b2410]">
                Threads That Connect Us
              </h2>
              <span className="h-px flex-1 bg-[#c3923a]" />
            </div>

            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
              {threads.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="border-[#d8b875]/45 text-center lg:border-r lg:last:border-r-0"
                  >
                    <Icon
                      className="mx-auto h-12 w-12"
                      strokeWidth={1.55}
                      style={{ color: item.color }}
                    />

                    <h3 className="mt-3 font-serif text-[18px] font-semibold uppercase text-[#3b2410]">
                      {item.title}
                    </h3>

                    <p className="mx-auto mt-1 max-w-[120px] text-[13px] font-semibold leading-snug text-[#4d3c2a]">
                      {item.text}
                    </p>
                  </article>
                );
              })}
            </div>
          </section>

          <section
            data-timeline-animate="true"
            className="mx-auto mt-8 flex max-w-[930px] items-center justify-center gap-10 rounded-[26px] border-2 border-[#c99745] bg-[#185c35] px-10 py-8 text-center shadow-[0_14px_30px_rgba(75,45,12,0.22)]"
          >
            <Sparkles className="h-20 w-20 shrink-0 text-[#d6a53a]" />

            <p className="font-serif text-[42px] leading-tight text-[#f6e3b4]">
              Past and present,
              <br />
              <span className="italic text-[#e2b95d]">woven together.</span>
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