import React from "react";
import gsap from "gsap";
import {
  ArrowLeft,
  ChevronRight,
  Globe2,
  Home,
  HeartHandshake,
  Handshake,
  UsersRound,
  ShieldCheck,
  Quote,
} from "lucide-react";
import TimelineOfCoexistencePage from "@/components/Sections/religions/Coexistence/TimelineCoexistence";

import bg from "@/assets/images/religions/r-2.webp";
import en from "@/data/en.json";
import ar from "@/data/ar.json";

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
    <div className="flex items-center justify-center gap-2 sm:gap-4">
      <span className="h-px flex-1" style={{ backgroundColor: color }} />
      <span className="text-xl sm:text-2xl" style={{ color }}>
        ✥
      </span>
      <span className="h-px flex-1" style={{ backgroundColor: color }} />
    </div>
  );
}

type StoriesOfCoexistencePageProps = {
  lang?: "en" | "ku" | "ar";
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function StoriesOfCoexistencePage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: StoriesOfCoexistencePageProps) {
  const data = lang === "ar" ? (ar as any) : (en as any);
  const coexistenceData = data?.religions?.coexistence ?? {};
  const localizedStoryCards = storyCards.map((card, i) => ({
    ...card,
    title: coexistenceData?.storyCards?.[i]?.title ?? card.title,
    text: coexistenceData?.storyCards?.[i]?.text ?? card.text,
  }));
  const localizedTimeline = timeline.map((item, i) => ({
    ...item,
    year: coexistenceData?.timelinePreview?.items?.[i]?.year ?? item.year,
    text: coexistenceData?.timelinePreview?.items?.[i]?.text ?? item.text,
  }));
  const pageTitle = coexistenceData?.title ?? ["Stories of", "Coexistence"];
  const pageTitleLines = Array.isArray(pageTitle) ? pageTitle : [pageTitle];
  const pageSubtitle =
    coexistenceData?.subtitle ?? "Protection, hospitality, and shared life.";
  const quoteText =
    coexistenceData?.quote?.text ??
    "In this land, we have learned that our differences do not divide us — they strengthen us.";
  const quoteAuthor = coexistenceData?.quote?.author ?? "Elder from Kurdistan";
  const timelineTitle = coexistenceData?.timelinePreview?.title ?? "A Journey Through Time";
  const readStoryLabel = coexistenceData?.readStoryCta ?? "Read Story";
  const footerTitle = coexistenceData?.footer?.title ?? "Together, We Build Tomorrow";
  const footerText =
    coexistenceData?.footer?.text ?? "Diversity is our strength. Coexistence is our legacy.";

  const sectionRef = React.useRef<HTMLElement | null>(null);
  const [subPage, setSubPage] = React.useState<null | "timeline">(null);
  const dir = lang === "en" ? "ltr" : "rtl";

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-story-hero='true']", {
        autoAlpha: 0,
        scale: 1.04,
      });
      gsap.set("[data-story-animate='true']", {
        autoAlpha: 0,
        y: 24,
      });

      const tl = gsap.timeline();
      tl.to("[data-story-hero='true']", {
        autoAlpha: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      }).to(
        "[data-story-animate='true']",
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

  if (subPage === "timeline") {
    return (
      <TimelineOfCoexistencePage
        lang={lang}
        languageLabel={languageLabel}
        onLanguageChange={onLanguageChange}
        onBack={() => setSubPage(null)}
      />
    );
  }

  return (
    <main dir={dir} className="m-0 flex min-h-screen w-screen justify-center bg-[#f8f1e7] p-0 text-[#3d2b18]">
      <section
        ref={sectionRef}
        className="relative min-h-screen w-full overflow-hidden bg-[#fbf1df] px-4 py-6 sm:px-8 sm:py-9 lg:px-16"
      >
        <img
          data-story-hero="true"
          src={bg}
          alt=""
          className="absolute left-0 top-0 h-[calc(50vh-160px)] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_78%,transparent_100%)]"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#fbf1df] via-[#fbf1df]/15 to-[#fbf1df]" />
        <div
          className="pointer-events-none absolute inset-x-0 top-[calc(50vh-160px)] z-[1] h-24 -translate-y-full blur-[2px]"
          style={{
            background:
              "linear-gradient(to top, rgba(251,241,223,0.95) 0%, rgba(251,241,223,0.62) 45%, rgba(251,241,223,0) 100%)",
          }}
        />

        {/* <div className="pointer-events-none absolute inset-2 rounded-[20px] border-2 border-[#d2a35a]/40 sm:inset-4 sm:rounded-[30px]" /> */}

        <button
          type="button"
          onClick={onBack}
          className="absolute left-4 top-4 z-30 grid h-11 w-11 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#5a3a18] shadow-sm sm:left-8 sm:top-8 sm:h-14 sm:w-14"
          aria-label="Back"
        >
          <ArrowLeft className="h-5 w-5 sm:h-7 sm:w-7" />
        </button>

        <button
          type="button"
          onClick={onLanguageChange}
          className="absolute right-4 top-4 z-30 flex items-center gap-2 rounded-full border border-[#d9b477] bg-white/75 px-3 py-2 font-serif text-xs font-semibold text-[#4b3219] shadow-[0_8px_20px_rgba(84,54,16,0.15)] sm:right-8 sm:top-8 sm:gap-3 sm:px-5 sm:py-3 sm:text-sm"
        >
          <Globe2 className="h-4 w-4 sm:h-5 sm:w-5" />
          {languageLabel}
        </button>

        <div className="relative z-10 mx-auto max-w-[1060px]">
          <header
            data-story-animate="true"
            className="mx-auto max-w-[820px] pt-16 text-center sm:pt-10"
          >
            <div className="mx-auto mb-3 w-full max-w-[430px] sm:mb-4">
              <DecorativeLine color="#c3923a" />
            </div>

            <h1 className="font-serif text-[36px] font-semibold uppercase leading-[1.06] tracking-[0.04em] text-[#2f1f12] sm:text-[58px] sm:leading-[1.02] sm:tracking-[0.06em] lg:text-[90px]">
              {pageTitleLines.map((line, idx) => (
                <React.Fragment key={`${line}-${idx}`}>
                  {line}
                  {idx < pageTitleLines.length - 1 ? <br /> : null}
                </React.Fragment>
              ))}
            </h1>

            <p className="mt-3 font-serif text-[18px] font-semibold text-[#a46f22] sm:mt-4 sm:text-[25px] lg:text-[31px]">
              {pageSubtitle}
            </p>
          </header>

          <div className="h-[min(48vh,35rem)] min-h-[16rem] sm:min-h-[18rem]" />

          <section
            data-story-animate="true"
            className="relative mx-auto rounded-[18px] border-2 border-[#d8b875]/60 bg-[#fff8e9]/88 px-4 py-5 text-center shadow-[0_10px_24px_rgba(75,45,12,0.12)] backdrop-blur-sm sm:rounded-[22px] sm:px-8 sm:py-6"
          >
            <Quote className="absolute left-3 top-3 h-7 w-7 text-[#c58b16] sm:left-8 sm:top-5 sm:h-10 sm:w-10" />
            <Quote className="absolute bottom-3 right-3 h-7 w-7 rotate-180 text-[#c58b16] sm:bottom-5 sm:right-8 sm:h-10 sm:w-10" />

            <p className="mx-auto max-w-[760px] px-5 font-serif text-[18px] italic leading-relaxed text-[#3b2b1e] sm:px-0 sm:text-[24px]">
              {quoteText}
            </p>

            <p className="mt-2 font-serif text-[12px] font-semibold uppercase tracking-[0.12em] text-[#b27a22] sm:mt-3 sm:text-[15px] sm:tracking-[0.16em]">
              {quoteAuthor}
            </p>
          </section>

          <section
            data-story-animate="true"
            className="mt-6 grid grid-cols-1 gap-4 sm:mt-7 sm:gap-5 md:grid-cols-2 xl:grid-cols-4"
          >
            {localizedStoryCards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  className="flex min-h-[280px] flex-col items-center rounded-[20px] border-2 border-[#d8b875]/55 bg-[#fff8e9]/92 px-4 py-6 text-center shadow-[0_10px_22px_rgba(75,45,12,0.12)] backdrop-blur-sm sm:min-h-[310px] sm:rounded-[22px] sm:px-5 sm:py-7"
                >
                  <div
                    className="grid h-16 w-16 place-items-center rounded-full border-2 border-[#e4c47e] text-white sm:h-20 sm:w-20"
                    style={{ backgroundColor: card.color }}
                  >
                    <Icon className="h-8 w-8 sm:h-10 sm:w-10" strokeWidth={1.7} />
                  </div>

                  <h3 className="mt-4 min-h-[52px] font-serif text-[20px] font-semibold uppercase leading-tight text-[#3b2410] sm:mt-5 sm:min-h-[62px] sm:text-[23px]">
                    {card.title}
                  </h3>

                  <p className="mt-2 flex-1 text-[15px] font-semibold leading-relaxed text-[#4d3c2a] sm:text-[16px]">
                    {card.text}
                  </p>

                  <div className="my-4 h-px w-[120px] bg-[#d1a14f]" />

                  <button className="flex items-center gap-2 font-serif text-[13px] font-semibold uppercase text-[#6a4a25] sm:gap-3 sm:text-[15px]">
                    {readStoryLabel}
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </article>
              );
            })}
          </section>

          <section data-story-animate="true" className="mt-7 sm:mt-8">
            <div className="mx-auto flex max-w-[760px] items-center gap-3 sm:gap-5">
              <span className="h-px flex-1 bg-[#c3923a]" />
              <h2 className="text-center font-serif text-[18px] font-semibold uppercase tracking-[0.05em] text-[#8d611f] sm:text-[25px] sm:tracking-[0.07em]">
                {timelineTitle}
              </h2>
              <span className="h-px flex-1 bg-[#c3923a]" />
            </div>

            <div className="relative mt-5 grid grid-cols-1 gap-5 sm:mt-6 sm:grid-cols-2 xl:grid-cols-4">
              <div className="absolute left-0 right-0 top-4 hidden h-px bg-[#c3923a] xl:block" />

              {localizedTimeline.map((item) => (
                <article key={item.year} className="relative text-center">
                  <div className="mx-auto mb-3 h-7 w-7 rounded-full border-4 border-[#f5e2b6] bg-[#c58b16] shadow-sm" />

                  <h3 className="font-serif text-[24px] font-semibold uppercase text-[#a8751f] sm:text-[28px]">
                    {item.year}
                  </h3>

                  <p className="mx-auto mt-2 max-w-[200px] text-[15px] font-semibold leading-snug text-[#4d3c2a] sm:max-w-[180px] sm:text-[16px]">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section
            data-story-animate="true"
            className="mx-auto mt-8 flex max-w-[760px] flex-col items-start gap-4 rounded-[22px] border-2 border-[#c99745]/45 bg-[#fff7e7]/95 px-5 py-5 shadow-[0_12px_28px_rgba(75,45,12,0.16)] sm:mt-9 sm:flex-row sm:items-center sm:gap-7 sm:rounded-[26px] sm:px-8"
          >
            <div className="grid h-14 w-14 shrink-0 place-items-center text-[#c58b16] sm:h-16 sm:w-16">
              <UsersRound className="h-10 w-10 sm:h-12 sm:w-12" strokeWidth={1.8} />
            </div>

            <p className="flex-1 font-serif text-[20px] font-semibold uppercase leading-tight text-[#3b2410] sm:text-[25px]">
              {footerTitle}
              <br />
              <span className="text-[15px] normal-case font-semibold text-[#6a4a25] sm:text-[17px]">
                {footerText}
              </span>
            </p>

            <button
              type="button"
              onClick={() => setSubPage("timeline")}
              className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-[#d6b06b] bg-[#fff4dc] text-[#a8751f] sm:h-16 sm:w-16"
            >
              <ChevronRight className="h-8 w-8 sm:h-9 sm:w-9" />
            </button>
          </section>
        </div>

        <div className="pointer-events-none absolute bottom-0 right-0 h-28 w-28 rounded-tl-full border-l-2 border-t-2 border-[#d2a35a]/30 opacity-70 sm:h-52 sm:w-52" />
      </section>
    </main>
  );
}