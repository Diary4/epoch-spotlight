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

function WomenDetailQuoteCard({
  quote,
  quoteAuthor,
  dir = "ltr",
}: {
  quote: string;
  quoteAuthor?: string;
  dir?: "rtl" | "ltr";
}) {
  const borderColor = "#7d4f56";
  const textAlign = dir === "rtl" ? "text-right" : "text-left";
  const quoteMarkSide =
    dir === "rtl"
      ? { open: "right-[clamp(18px,2.8vw,30px)]", close: "left-[clamp(18px,2.8vw,30px)]" }
      : { open: "left-[clamp(18px,2.8vw,30px)]", close: "right-[clamp(18px,2.8vw,30px)]" };

  return (
    <div
      data-women-detail-fade="true"
      className="relative h-full overflow-hidden rounded-[clamp(14px,2vw,20px)]"
      style={{
        backgroundImage: `url(${cardBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Outer frame */}
      <div
        className="pointer-events-none absolute inset-[clamp(12px,2.2vw,22px)] rounded-[3px] border"
        style={{ borderColor }}
        aria-hidden
      />

      {/* Inner frame — side rails plus broken top/bottom segments */}
      <div
        className="pointer-events-none absolute inset-[clamp(18px,3vw,30px)]"
        aria-hidden
      >
        <div className="absolute inset-y-0 left-0 w-px" style={{ backgroundColor: borderColor }} />
        <div className="absolute inset-y-0 right-0 w-px" style={{ backgroundColor: borderColor }} />
        <div className="absolute left-0 top-0 h-px w-[30%]" style={{ backgroundColor: borderColor }} />
        <div className="absolute right-0 top-0 h-px w-[30%]" style={{ backgroundColor: borderColor }} />
        <div className="absolute bottom-0 left-0 h-px w-[30%]" style={{ backgroundColor: borderColor }} />
        <div className="absolute bottom-0 right-0 h-px w-[30%]" style={{ backgroundColor: borderColor }} />
      </div>

      <span
        className={`pointer-events-none absolute top-[clamp(14px,2.4vw,24px)] ${quoteMarkSide.open} font-serif text-[clamp(40px,7vw,72px)] leading-none text-[#e89595]`}
        aria-hidden
      >
        &ldquo;
      </span>
      <span
        className={`pointer-events-none absolute bottom-[clamp(40px,6vw,56px)] ${quoteMarkSide.close} font-serif text-[clamp(40px,7vw,72px)] leading-none text-[#e89595]`}
        aria-hidden
      >
        &rdquo;
      </span>

      <div
        className={`relative flex h-full min-h-[220px] flex-col justify-between px-[clamp(28px,4.5vw,48px)] py-[clamp(28px,4vw,44px)] ${textAlign}`}
      >
        <p className="font-serif text-[clamp(14px,2vw,22px)] italic leading-[1.7] text-[#454545]">
          {quote}
        </p>

        {quoteAuthor && (
          <p className="mt-[clamp(16px,2.4vw,28px)] text-[clamp(11px,1.4vw,15px)] leading-snug text-[#7d4f56]">
            {quoteAuthor}
          </p>
        )}
      </div>
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

  return (
    <div
      data-women-detail-fade="true"
      className={
        isMatters
          ? "relative flex h-full min-h-0 flex-col overflow-hidden rounded-[clamp(16px,2.4vw,28px)] border-2 border-[#e8a8a8] px-[clamp(16px,3vw,32px)] py-[clamp(28px,4vw,48px)] text-center shadow-[0_12px_36px_rgba(254,165,165,0.22)]"
          : "relative flex h-full min-h-0 flex-col overflow-hidden rounded-[clamp(16px,2.4vw,28px)] border-2 border-[#5a223f] px-[clamp(16px,3vw,32px)] py-[clamp(28px,4vw,48px)] text-center shadow-[0_12px_36px_rgba(80,45,30,0.14)]"
      }
      style={{
        backgroundImage: `url(${cardBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
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

      {/* <div className="relative z-10 mx-auto mb-[clamp(12px,2vw,20px)] grid h-[clamp(48px,8vw,88px)] w-[clamp(48px,8vw,88px)] place-items-center rounded-full border-2 border-[#d7aa4e] bg-[#5a223f] text-[clamp(24px,5vw,48px)] text-[#d7aa4e] shadow-[0_4px_20px_rgba(90,34,63,0.3)]">
        {icon}
      </div> */}

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

/** Shared detail layout for Historic, Political, Culture, and Resistance. */
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
  // Hero portrait is pinned to the inline-end side; text stays on the inline-start
  // side so the figure never sits under the text, at any screen width.
  const heroImageSide = dir === "rtl" ? "left-0" : "right-0";
  const heroFadeSide = dir === "rtl" ? "right-0" : "left-0";
  // Fade to a *transparent cream* (rgba alpha 0) rather than the `transparent`
  // keyword, which resolves to transparent black and leaves a gray fringe/seam
  // along the gradient's edge — most visible when the panel narrows.
  const heroFadeStyle = {
    backgroundImage: `linear-gradient(${dir === "rtl" ? "to left" : "to right"}, #fbf4e8 4%, rgba(251,244,232,0.6) 42%, rgba(251,244,232,0) 100%)`,
  };
  // Timeline Position / Map Location info cards are intentionally not shown.
  const visibleCards = cards.filter(
    (c) => c.title !== "Timeline Position" && c.title !== "Map Location",
  );
  const cardGridClass =
    visibleCards.length === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : visibleCards.length === 4
        ? "grid-cols-1 sm:grid-cols-2"
        : "grid-cols-1 sm:grid-cols-3";
  const heroScrim =
    "pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(251,244,232,0)_62%,rgba(251,244,232,0.55)_82%,#fbf4e8_100%)]";

  return (
    <div
      className={`flex min-h-screen w-full max-w-full justify-center overflow-x-hidden bg-[#f7efe3] ${dir === "rtl" ? "font-amiri" : ""}`}
      dir={dir}
    >
      <div className="relative min-h-screen w-full overflow-x-hidden border-x border-[#d8bd83] bg-[#fbf4e8] pb-10 sm:pb-0">
        <div className="pointer-events-none absolute left-4 top-0 hidden h-full w-px bg-[#d4b778]/45 sm:block" />
        <div className="pointer-events-none absolute right-4 top-0 hidden h-full w-px bg-[#d4b778]/45 sm:block" />

        <section className="relative z-10 w-full">
          <div className={`absolute ${heroImageSide} top-0 h-full w-[62%] max-w-[760px] overflow-hidden sm:w-[56%]`}>
            <div data-women-detail-portrait-fade="true" className="absolute inset-0">
              <div className={`absolute inset-0 ${portraitFlip}`}>
                <img
                  src={portraitSrc}
                  alt={portraitAlt}
                  decoding="async"
                  // React 18 expects the lowercase DOM attribute name.
                  {...({ fetchpriority: "high" } as React.ImgHTMLAttributes<HTMLImageElement>)}
                  className="h-full w-full object-cover object-[42%_10%]"
                />
              </div>
            </div>
            {/* Blend the portrait's inner edge into the cream text area */}
            <div className={`pointer-events-none absolute inset-y-0 ${heroFadeSide} w-[60%]`} style={heroFadeStyle} />
            {/* Fade the portrait's bottom into the page */}
            <div data-women-detail-portrait-fade="true" className={heroScrim} />
          </div>

          <div
            className="relative z-20 flex min-h-[50vh] max-w-[min(52%,560px)] flex-col px-[clamp(16px,3vw,56px)] pb-[clamp(24px,3vw,32px)] pt-[clamp(80px,12vw,112px)]"
            data-women-detail-fade="true"
          >
            <h1 className={`break-words ${displayFont} text-[clamp(24px,7vw,118px)] leading-[0.92] tracking-[-0.04em] text-[#2d1436]`}>
              {nameLine1}
              <br />
              {nameLine2}
            </h1>

            <div className="mt-[clamp(16px,3vw,32px)] flex w-[260px] max-w-full items-center gap-3 text-[#c7a45e]">
              <span className="h-px flex-1 bg-[#c7a45e]" />
              <span aria-hidden>❖</span>
              <span className="h-px flex-1 bg-[#c7a45e]" />
            </div>

            <h2 className={`mt-[clamp(16px,3vw,32px)] max-w-full break-words ${displayFont} text-[clamp(17px,3vw,26px)] italic leading-tight text-[#a75a69]`}>
              {role}
            </h2>

            {metaLine && (
              <p className="mt-[clamp(10px,2vw,16px)] max-w-full text-[clamp(12px,1.5vw,18px)] leading-snug text-[#5a4a52]">
                {metaLine}
              </p>
            )}

            <p className="mt-[clamp(16px,3vw,24px)] max-w-full text-[clamp(13px,1.6vw,20px)] leading-[1.7] text-[#3f3b42]">
              {intro}
            </p>

            <div className="mt-[clamp(16px,3vw,32px)] flex w-[190px] max-w-full items-center gap-3 text-[#c7a45e]">
              <span className="h-px flex-1 bg-[#c7a45e]" />
              <span aria-hidden>❖</span>
              <span className="h-px flex-1 bg-[#c7a45e]" />
            </div>
          </div>
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

        {visibleCards.length > 0 && (
          <section
            className={`relative z-30 mt-[clamp(20px,3vw,32px)] grid ${cardGridClass} gap-[clamp(12px,1.6vw,20px)] px-[clamp(16px,3vw,56px)]`}
          >
            {visibleCards.map((c) => (
              <WomenDetailInfoCard key={c.title} {...c} displayFont={displayFont} />
            ))}
          </section>
        )}

        {/* Did You Know + quote, side by side */}
        <section
          className={`relative z-30 mx-[clamp(16px,3vw,56px)] mb-[clamp(24px,3vw,40px)] mt-[clamp(20px,3vw,32px)] grid items-stretch gap-[clamp(12px,1.6vw,20px)] ${
            didYouKnow ? "grid-cols-1 sm:grid-cols-2 xl:mx-auto xl:max-w-[1200px]" : "max-w-[760px] xl:mx-auto"
          }`}
        >
          {didYouKnow && (
            <div
              data-women-detail-fade="true"
              className="flex h-full flex-col rounded-[clamp(14px,2vw,18px)] border border-[#dfc997] bg-[#fff8ee]/85 px-[clamp(16px,2.4vw,28px)] py-[clamp(20px,2.8vw,32px)]"
            >
              <h3 className={`${displayFont} text-[clamp(12px,2vw,22px)] uppercase tracking-[0.18em] text-[#a75a69]`}>
                {didYouKnow.title}
              </h3>
              <p className="mt-[clamp(10px,1.6vw,16px)] text-[clamp(13px,1.6vw,19px)] leading-[1.65] text-[#3f3b42]">
                {didYouKnow.text}
              </p>
            </div>
          )}

          <WomenDetailQuoteCard quote={quote} quoteAuthor={quoteAuthor} dir={dir} />
        </section>
      </div>
    </div>
  );
}
