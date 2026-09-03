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
import { detailBackIconClassName, detailBackIconSize, religionsOverlayStartClassName, religionsOverlayEndClassName } from "@/constants/backNavigation";
import TimelineOfCoexistencePage from "@/components/Sections/religions/Coexistence/TimelineCoexistence";

import ReligionInfoCard from "@/components/Sections/religions/ReligionInfoCard";
import ReligionsScaledPage from "@/components/Sections/religions/ReligionsScaledPage";
import { useSectionExit } from "@/components/Sections/religions/useSectionExit";

import bg from "@/assets/images/Religion new photos/Coexistence/Coexistance in daily life (main card).jpg";
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
    <div className="flex items-center justify-center gap-4">
      <span className="h-px flex-1" style={{ backgroundColor: color }} />
      <span className="text-2xl" style={{ color }}>
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
  const { runExit, resetExit } = useSectionExit(sectionRef);
  const [subPage, setSubPage] = React.useState<null | "timeline">(null);
  const dir = lang === "en" ? "ltr" : "rtl";

  React.useEffect(() => {
    if (!sectionRef.current || subPage) return;

    resetExit();

    const ctx = gsap.context(() => {
      gsap.set("[data-story-hero='true']", {
        autoAlpha: 0,
        scale: 1.04,
      });
      gsap.set("[data-story-animate='true']", {
        autoAlpha: 0,
        y: 24,
      });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to("[data-story-hero='true']", {
        autoAlpha: 1,
        scale: 1,
        duration: 2,
      }).to(
        "[data-story-animate='true']",
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.8,
          stagger: 0.16,
        },
        "-=1.2",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [subPage, resetExit]);

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
    <ReligionsScaledPage dir={dir} lang={lang} fitDeps={[lang]} sectionRef={sectionRef} className="px-12 pb-14">
      <img
        data-story-hero="true"
        src={bg}
        alt=""
        className="absolute left-0 top-0 h-[720px] w-full object-cover object-top [mask-image:linear-gradient(to_bottom,black_0%,black_82%,transparent_100%)]"
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[720px] bg-[linear-gradient(to_bottom,transparent_0%,transparent_78%,#faf8f5_100%)]" />

      <button
        type="button"
        onClick={onBack}
        className={`absolute top-1/2 z-30 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#5a3a18] shadow-sm ${religionsOverlayStartClassName(dir)}`}
        aria-label="Back"
      >
        <ArrowLeft size={detailBackIconSize} className={detailBackIconClassName(dir)} />
      </button>

      <button
        type="button"
        onClick={onLanguageChange}
        className={`absolute top-8 z-30 flex items-center gap-3 rounded-full border border-[#d9b477] bg-white/75 px-5 py-3 font-serif text-sm font-semibold text-[#4b3219] shadow-[0_8px_20px_rgba(84,54,16,0.15)] ${religionsOverlayEndClassName(dir)}`}
      >
        <Globe2 className="h-5 w-5" />
        {languageLabel}
      </button>

      <div className="relative z-10 mx-auto max-w-[1060px]">
        <header
          data-story-animate="true"
          className="mx-auto max-w-[820px] pt-[760px] text-center"
        >
          <div className="mx-auto mb-4 w-full max-w-[430px]">
            <DecorativeLine color="#c3923a" />
          </div>

          <h1 className="font-serif text-[90px] font-semibold uppercase leading-[1.02] tracking-[0.06em] text-[#2f1f12]">
            {pageTitleLines.map((line, idx) => (
              <React.Fragment key={`${line}-${idx}`}>
                {line}
                {idx < pageTitleLines.length - 1 ? <br /> : null}
              </React.Fragment>
            ))}
          </h1>

          <p className="mt-4 font-serif text-[31px] font-semibold text-[#a46f22]">
            {pageSubtitle}
          </p>
        </header>

        <section
          data-story-animate="true"
          className="relative mx-auto mt-10 rounded-[22px] border-2 border-[#d8b875]/60 bg-[#fff8e9]/88 px-8 py-6 text-center shadow-[0_10px_24px_rgba(75,45,12,0.12)] backdrop-blur-sm"
        >
          <Quote className={`absolute top-5 h-10 w-10 text-[#c58b16] ${religionsOverlayStartClassName(dir)}`} />
          <Quote className={`absolute bottom-5 h-10 w-10 rotate-180 text-[#c58b16] ${religionsOverlayEndClassName(dir)}`} />

          <p className="mx-auto max-w-[760px] font-serif text-[24px] italic leading-relaxed text-[#3b2b1e]">
            {quoteText}
          </p>

          <p className="mt-3 font-serif text-[15px] font-semibold uppercase tracking-[0.16em] text-[#b27a22]">
            {quoteAuthor}
          </p>
        </section>

        <section
          data-story-animate="true"
          className="mt-7 grid grid-cols-4 gap-5"
        >
          {localizedStoryCards.map((card, index) => (
            <ReligionInfoCard
              key={card.title}
              title={card.title}
              body={card.text}
              image={bg}
              accent={card.color}
              accentIndex={index}
              align="center"
              titleClassName="uppercase"
              footer={
                <button
                  type="button"
                  className="flex items-center gap-3 font-serif text-[15px] font-semibold uppercase text-[#6a4a25]"
                >
                  {readStoryLabel}
                  <ChevronRight className="h-5 w-5" />
                </button>
              }
            />
          ))}
        </section>

        <section data-story-animate="true" className="mt-8">
          <div className="mx-auto flex max-w-[760px] items-center gap-5">
            <span className="h-px flex-1 bg-[#c3923a]" />
            <h2 className="text-center font-serif text-[25px] font-semibold uppercase tracking-[0.07em] text-[#8d611f]">
              {timelineTitle}
            </h2>
            <span className="h-px flex-1 bg-[#c3923a]" />
          </div>

          <div className="relative mt-6 grid grid-cols-4 gap-5">
            <div className="absolute left-0 right-0 top-4 h-px bg-[#c3923a]" />

            {localizedTimeline.map((item) => (
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
            {footerTitle}
            <br />
            <span className="text-[17px] normal-case font-semibold text-[#6a4a25]">
              {footerText}
            </span>
          </p>

          <button
            type="button"
            onClick={() => runExit(() => setSubPage("timeline"))}
            className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-[#d6b06b] bg-[#fff4dc] text-[#a8751f] transition-transform duration-300 ease-smooth-out active:scale-95"
          >
            <ChevronRight className="h-9 w-9" />
          </button>
        </section>
      </div>

      <div className="pointer-events-none absolute bottom-0 right-0 h-52 w-52 rounded-tl-full border-l-2 border-t-2 border-[#d2a35a]/30 opacity-70" />
    </ReligionsScaledPage>
  );
}
