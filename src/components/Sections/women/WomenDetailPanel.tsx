import React from "react";

import cardBg from "@/assets/images/patterns/card-bg.jpg";

export type WomenDetailPanelCard = {
  icon: string;
  title: string;
  text: string;
};

export type WomenDetailPanelProps = {
  nameLine1: string;
  nameLine2: string;
  role: string;
  intro: string;
  portraitSrc: string;
  portraitAlt: string;
  cards: WomenDetailPanelCard[];
  quote: string;
  /** Dates and region, e.g. "1805 – 1848 | Ardalan Principality". */
  metaLine?: string;
  quoteAuthor?: string;
  greatestAchievement?: { title: string; text: string };
  /** Highlighted legacy section — rendered as a full-width banner. */
  whySheMatters?: { title: string; text: string };
  didYouKnow?: { title: string; text: string };
  /** Accepted for API parity with grid cards; layout matches Historic (no badge). */
  listIcon?: "crown" | "flower";
  /** Use `rtl` for Sorani / Arabic script detail copy. */
  dir?: "rtl" | "ltr";
};

function WomenDetailInfoCard({
  icon,
  title,
  text,
  displayFont,
}: WomenDetailPanelCard & { displayFont: string }) {
  return (
    <div
      data-women-detail-fade="true"
      className="flex min-h-0 min-w-0 flex-col items-center justify-start rounded-[clamp(12px,1.6vw,18px)] border border-[#dfc997] bg-[#fff8ee]/75 px-[clamp(8px,1.6vw,20px)] py-[clamp(12px,2.4vw,32px)] text-center shadow-[0_8px_20px_rgba(80,45,30,0.06)]"
    >
      <div className="grid h-[clamp(36px,6vw,78px)] w-[clamp(36px,6vw,78px)] place-items-center rounded-full bg-[#5a223f] text-[clamp(16px,3vw,38px)] text-[#d7aa4e]">
        {icon}
      </div>

      <div className="mt-[clamp(6px,1.2vw,20px)] flex w-[clamp(48px,7vw,80px)] items-center gap-[clamp(4px,0.6vw,8px)] text-[#c8a765]">
        <span className="h-px flex-1 bg-[#d9bd81]" />
        <span className="text-[clamp(10px,1.2vw,14px)]">❖</span>
        <span className="h-px flex-1 bg-[#d9bd81]" />
      </div>

      <h3 className={`mt-[clamp(4px,1vw,16px)] ${displayFont} text-[clamp(10px,3vw,30px)] leading-tight text-[#2d1436]`}>
        {title}
      </h3>

      <p className="mt-[clamp(6px,1.4vw,24px)] max-w-[min(100%,280px)] text-[clamp(9px,2.5vw,18px)] leading-snug text-[#3f3b42] sm:max-w-[min(100%,210px)]">
        {text}
      </p>
    </div>
  );
}

function WomenDetailHighlightSection({
  title,
  text,
  icon,
  variant,
  displayFont,
}: {
  title: string;
  text: string;
  icon: string;
  variant: "plum" | "cream";
  displayFont: string;
}) {
  const isMatters = variant === "plum";
  const texturedBackground = isMatters
    ? `linear-gradient(180deg, rgba(246,242,236,0.88) 0%, rgba(254,165,165,0.88) 100%), url(${cardBg})`
    : `linear-gradient(165deg, rgba(255,248,238,0.88) 0%, rgba(243,226,196,0.88) 100%), url(${cardBg})`;

  return (
    <div
      data-women-detail-fade="true"
      className={
        isMatters
          ? "relative flex h-full min-h-0 flex-col overflow-hidden rounded-[clamp(16px,2.4vw,28px)] border-2 border-[#e8a8a8] px-[clamp(16px,3vw,32px)] py-[clamp(28px,4vw,48px)] text-center shadow-[0_12px_36px_rgba(254,165,165,0.22)]"
          : "relative flex h-full min-h-0 flex-col overflow-hidden rounded-[clamp(16px,2.4vw,28px)] border-2 border-[#5a223f] px-[clamp(16px,3vw,32px)] py-[clamp(28px,4vw,48px)] text-center shadow-[0_12px_36px_rgba(80,45,30,0.14)]"
      }
      style={{
        backgroundImage: texturedBackground,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className={`pointer-events-none absolute inset-x-[clamp(16px,4vw,40px)] top-[clamp(12px,2vw,20px)] h-px ${isMatters ? "bg-[#5a223f]/20" : "bg-[#5a223f]/20"}`}
        aria-hidden
      />
      <div
        className={`pointer-events-none absolute inset-x-[clamp(16px,4vw,40px)] bottom-[clamp(12px,2vw,20px)] h-px ${isMatters ? "bg-[#5a223f]/20" : "bg-[#5a223f]/20"}`}
        aria-hidden
      />

      <div className="relative z-10 mx-auto mb-[clamp(12px,2vw,20px)] grid h-[clamp(48px,8vw,88px)] w-[clamp(48px,8vw,88px)] place-items-center rounded-full border-2 border-[#d7aa4e] bg-[#5a223f] text-[clamp(24px,5vw,48px)] text-[#d7aa4e] shadow-[0_4px_20px_rgba(90,34,63,0.3)]">
        {icon}
      </div>

      <h3
        className={`relative z-10 ${displayFont} text-[clamp(14px,2.4vw,26px)] font-medium uppercase tracking-[0.22em] text-[#5a223f]`}
      >
        {title}
      </h3>

      <div className="relative z-10 mx-auto mt-[clamp(14px,2.4vw,24px)] flex w-[min(100%,280px)] items-center gap-3 text-[#a75a69]">
        <span className="h-px flex-1 bg-[#5a223f]/25" />
        <span aria-hidden className="text-[clamp(10px,1.4vw,14px)]">
          ❖
        </span>
        <span className="h-px flex-1 bg-[#5a223f]/25" />
      </div>

      <p className="relative z-10 mx-auto mt-[clamp(16px,2.8vw,28px)] max-w-[min(100%,680px)] flex-1 text-[clamp(14px,2vw,22px)] leading-[1.65] text-[#2d1436]">
        {text}
      </p>
    </div>
  );
}

/** Shared detail layout for Historic, Knowledge, Culture, and Resistance. */
export default function WomenDetailPanel({
  nameLine1,
  nameLine2,
  role,
  intro,
  portraitSrc,
  portraitAlt,
  cards,
  quote,
  metaLine,
  quoteAuthor,
  greatestAchievement,
  whySheMatters,
  didYouKnow,
  dir = "ltr",
}: WomenDetailPanelProps) {
  const displayFont = dir === "rtl" ? "font-amiri" : "font-serif";
  const portraitFlip = dir === "rtl" ? "-scale-x-100" : "";
  const cardGridClass =
    cards.length === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : cards.length === 4
        ? "grid-cols-1 sm:grid-cols-2"
        : "grid-cols-1 sm:grid-cols-3";
  const heroScrim =
    "pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_62%,rgba(251,244,232,0.55)_82%,#fbf4e8_100%)]";

  return (
    <div
      className={`flex min-h-screen w-full max-w-full justify-center overflow-x-hidden bg-[#f7efe3] ${dir === "rtl" ? "font-amiri" : ""}`}
      dir={dir}
    >
      <div className="relative min-h-screen w-full overflow-x-hidden border-x border-[#d8bd83] bg-[#fbf4e8] pb-10 sm:pb-0">
        <div className="pointer-events-none absolute left-4 top-0 hidden h-full w-px bg-[#d4b778]/45 sm:block" />
        <div className="pointer-events-none absolute right-4 top-0 hidden h-full w-px bg-[#d4b778]/45 sm:block" />

        <section className="relative z-10 w-full">
          <div className="absolute inset-x-0 top-0 h-[50vh] overflow-hidden">
            <div data-women-detail-portrait-fade="true" className="absolute inset-0">
              <div className={`absolute inset-0 ${portraitFlip}`}>
                <img
                  src={portraitSrc}
                  alt={portraitAlt}
                  decoding="async"
                  // React 18 expects the lowercase DOM attribute name.
                  {...({ fetchpriority: "high" } as React.ImgHTMLAttributes<HTMLImageElement>)}
                  className="h-full w-full object-cover object-[10%_10%]"
                />
              </div>
            </div>
            <div data-women-detail-portrait-fade="true" className={heroScrim} />
          </div>

          <div
            className="relative z-20 min-h-[50vh] px-[clamp(16px,3vw,56px)] pb-[clamp(24px,3vw,32px)] pt-[clamp(80px,12vw,112px)]"
            data-women-detail-fade="true"
          >
            <h1 className={`break-words ${displayFont} text-[clamp(24px,7vw,118px)] leading-[0.92] tracking-[-0.04em] text-[#2d1436]`}>
              {nameLine1}
              <br />
              {nameLine2}
            </h1>

            <div className="mt-[clamp(16px,3vw,32px)] flex w-[260px] max-w-[66%] items-center gap-3 text-[#c7a45e]">
              <span className="h-px flex-1 bg-[#c7a45e]" />
              <span aria-hidden>❖</span>
              <span className="h-px flex-1 bg-[#c7a45e]" />
            </div>

            <h2 className={`mt-[clamp(16px,3vw,32px)] max-w-[min(66%,300px)] break-words ${displayFont} text-[clamp(17px,4.2vw,48px)] italic leading-tight text-[#a75a69]`}>
              {role}
            </h2>

            {metaLine && (
              <p className="mt-[clamp(10px,2vw,16px)] max-w-[min(66%,360px)] text-[clamp(12px,1.5vw,18px)] leading-snug text-[#5a4a52]">
                {metaLine}
              </p>
            )}

            <div className="mt-[clamp(16px,3vw,32px)] flex w-[190px] max-w-[66%] items-center gap-3 text-[#c7a45e]">
              <span className="h-px flex-1 bg-[#c7a45e]" />
              <span aria-hidden>❖</span>
              <span className="h-px flex-1 bg-[#c7a45e]" />
            </div>
          </div>
        </section>

        <section
          data-women-detail-fade="true"
          className="relative z-30 mx-[clamp(16px,3vw,56px)] mt-[clamp(20px,3vw,32px)] max-w-[760px] xl:mx-auto"
        >
          <p className="text-[clamp(14px,1.8vw,21px)] leading-[1.75] text-[#3f3b42]">
            {intro}
          </p>
        </section>

        {(greatestAchievement || whySheMatters) && (
          <section
            className={`relative z-30 mx-[clamp(12px,2.4vw,40px)] mt-[clamp(16px,3vw,24px)] grid grid-cols-1 gap-[clamp(12px,1.6vw,20px)] px-[clamp(4px,1vw,16px)] sm:grid-cols-2 xl:mx-auto xl:max-w-[1200px]`}
          >
            {greatestAchievement && (
              <WomenDetailHighlightSection
                title={greatestAchievement.title}
                text={greatestAchievement.text}
                icon="📖"
                variant="cream"
                displayFont={displayFont}
              />
            )}

            {whySheMatters && (
              <WomenDetailHighlightSection
                title={whySheMatters.title}
                text={whySheMatters.text}
                icon="♛"
                variant="plum"
                displayFont={displayFont}
              />
            )}
          </section>
        )}

        <section
          className={`relative z-30 mt-[clamp(20px,3vw,32px)] grid ${cardGridClass} gap-[clamp(12px,1.6vw,20px)] px-[clamp(16px,3vw,56px)]`}
        >
          {cards.map((c) => (
            <WomenDetailInfoCard key={c.title} {...c} displayFont={displayFont} />
          ))}
        </section>

        {didYouKnow && (
          <section
            data-women-detail-fade="true"
            className="relative z-30 mx-[clamp(16px,3vw,56px)] mt-[clamp(24px,3vw,36px)] max-w-[760px] rounded-[clamp(14px,2vw,18px)] border border-[#dfc997] bg-[#fff8ee]/85 px-[clamp(16px,2.4vw,28px)] py-[clamp(20px,2.8vw,32px)] xl:mx-auto"
          >
            <h3 className={`${displayFont} text-[clamp(12px,2vw,22px)] uppercase tracking-[0.18em] text-[#a75a69]`}>
              {didYouKnow.title}
            </h3>
            <p className="mt-[clamp(10px,1.6vw,16px)] text-[clamp(13px,1.6vw,19px)] leading-[1.65] text-[#3f3b42]">
              {didYouKnow.text}
            </p>
          </section>
        )}

        <section
          data-women-detail-fade="true"
          className="relative z-30 mx-[clamp(16px,3vw,56px)] mb-[clamp(24px,3vw,40px)] mt-[clamp(32px,4vw,48px)] max-w-[760px] rounded-[clamp(14px,2vw,18px)] border border-[#d3ad65] bg-[#fff8ee]/75 p-[clamp(12px,1.4vw,20px)] xl:mx-auto"
        >
          <div className="relative rounded-[14px] border border-[#e2c98f] px-[clamp(16px,2.4vw,32px)] py-[clamp(28px,3vw,40px)] text-center">
            <div className="absolute left-1/2 top-[-18px] -translate-x-1/2 bg-[#fbf4e8] px-3 text-[#c8a65c]">
              ❖
            </div>

            <p className={`break-words ${displayFont} text-[clamp(20px,5.5vw,44px)] italic leading-snug text-[#2d1436]`}>
              {quote}
            </p>

            {quoteAuthor && (
              <p className={`mt-[clamp(12px,2vw,20px)] ${displayFont} text-[clamp(13px,1.8vw,20px)] italic text-[#a75a69]`}>
                — {quoteAuthor}
              </p>
            )}

            <div className="mx-auto mt-[clamp(16px,2vw,24px)] flex w-[220px] max-w-full items-center gap-3 text-[#c7a45e]">
              <span className="h-px flex-1 bg-[#c7a45e]" />
              <span aria-hidden>❖</span>
              <span className="h-px flex-1 bg-[#c7a45e]" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
