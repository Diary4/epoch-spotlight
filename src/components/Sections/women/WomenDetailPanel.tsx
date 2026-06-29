import React from "react";

import type { WomenLangCode } from "@/components/Sections/women/womenLanguage";
import { localizeDigits } from "@/lib/utils";
import WomenScaledCanvas from "@/components/Sections/women/WomenScaledCanvas";

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
  lang?: WomenLangCode;
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
      className="flex min-h-0 min-w-0 flex-col items-center justify-start rounded-[18px] border border-[#dfc997] bg-[#fff8ee]/75 px-5 py-8 text-center shadow-[0_8px_20px_rgba(80,45,30,0.06)]"
    >
      <div className="grid h-[78px] w-[78px] place-items-center rounded-full bg-[#5a223f] text-[38px] text-[#d7aa4e]">
        {icon}
      </div>

      <div className="mt-5 flex w-20 items-center gap-2 text-[#c8a765]">
        <span className="h-px flex-1 bg-[#d9bd81]" />
        <span className="text-[14px]">❖</span>
        <span className="h-px flex-1 bg-[#d9bd81]" />
      </div>

      <h3 className={`mt-4 ${displayFont} text-[30px] leading-tight text-[#2d1436]`}>
        {title}
      </h3>

      <p className="mt-6 max-w-[210px] text-[18px] leading-snug text-[#3f3b42]">
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
      ? { open: "right-[30px]", close: "left-[30px]" }
      : { open: "left-[30px]", close: "right-[30px]" };

  return (
    <div
      data-women-detail-fade="true"
      className="relative h-full overflow-hidden rounded-[20px] bg-[linear-gradient(160deg,#fff8f2_0%,#fceee6_55%,#f5e1d8_100%)]"
    >
      {/* Outer frame */}
      <div
        className="pointer-events-none absolute inset-[22px] rounded-[3px] border"
        style={{ borderColor }}
        aria-hidden
      />

      {/* Inner frame — side rails plus broken top/bottom segments */}
      <div
        className="pointer-events-none absolute inset-[30px]"
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
        className={`pointer-events-none absolute top-[24px] ${quoteMarkSide.open} font-serif text-[72px] leading-none text-[#e89595]`}
        aria-hidden
      >
        &ldquo;
      </span>
      <span
        className={`pointer-events-none absolute bottom-[56px] ${quoteMarkSide.close} font-serif text-[72px] leading-none text-[#e89595]`}
        aria-hidden
      >
        &rdquo;
      </span>

      <div
        className={`relative flex h-full min-h-[220px] flex-col justify-between px-12 py-11 ${textAlign}`}
      >
        <p className="font-serif text-[22px] italic leading-[1.7] text-[#454545]">
          {quote}
        </p>

        {quoteAuthor && (
          <p className="mt-7 text-[15px] leading-snug text-[#7d4f56]">
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
          ? "relative flex h-full min-h-0 flex-col overflow-hidden rounded-[28px] border-2 border-[#e8a8a8] bg-[#fff5f3] px-8 py-12 text-center shadow-[0_12px_36px_rgba(254,165,165,0.22)]"
          : "relative flex h-full min-h-0 flex-col overflow-hidden rounded-[28px] border-2 border-[#5a223f] bg-[#fff8ee] px-8 py-12 text-center shadow-[0_12px_36px_rgba(80,45,30,0.14)]"
      }
    >
      <div
        className="pointer-events-none absolute inset-x-10 top-5 h-px bg-[#5a223f]/20"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-10 bottom-5 h-px bg-[#5a223f]/20"
        aria-hidden
      />

      <h3
        className={`relative z-10 ${displayFont} text-[26px] font-medium uppercase tracking-[0.22em] text-[#5a223f]`}
      >
        {title}
      </h3>

      <div className="relative z-10 mx-auto mt-6 flex w-[280px] max-w-full items-center gap-3 text-[#a75a69]">
        <span className="h-px flex-1 bg-[#5a223f]/25" />
        <span aria-hidden className="text-[14px]">
          ❖
        </span>
        <span className="h-px flex-1 bg-[#5a223f]/25" />
      </div>

      <p className="relative z-10 mx-auto mt-7 max-w-[680px] flex-1 text-[22px] leading-[1.65] text-[#2d1436]">
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
  lang = "en",
}: WomenDetailPanelProps) {
  const t = (value: string) => localizeDigits(value, lang);
  const displayFont = dir === "rtl" ? "font-noto-naskh" : "font-serif";
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
  /** Timeline (♜) and map (⛩) cards are hidden in every language. */
  const hiddenDetailCardIcons = new Set(["♜", "⛩"]);
  const visibleCards = cards
    .filter((c) => !hiddenDetailCardIcons.has(c.icon))
    .map((c) => ({ ...c, title: t(c.title), text: t(c.text) }));
  const cardGridClass =
    visibleCards.length === 2
      ? "grid-cols-2"
      : visibleCards.length === 4
        ? "grid-cols-2"
        : "grid-cols-3";
  const heroScrim =
    "pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(251,244,232,0)_62%,rgba(251,244,232,0.55)_82%,#fbf4e8_100%)]";

  return (
    <WomenScaledCanvas
      dir={dir}
      bgClassName="bg-[#f7efe3]"
      className={dir === "rtl" ? "font-noto-naskh" : ""}
      fitDeps={[dir, lang, nameLine1, nameLine2, intro, quote, didYouKnow?.text]}
    >
      <div className="relative w-full overflow-hidden border-x border-[#d8bd83] bg-[#fbf4e8] pb-10">
          <div className="pointer-events-none absolute left-4 top-0 h-full w-px bg-[#d4b778]/45" />
          <div className="pointer-events-none absolute right-4 top-0 h-full w-px bg-[#d4b778]/45" />

        <section className="relative z-10 w-full">
          <div className={`absolute ${heroImageSide} top-0 h-full w-[56%] max-w-[760px] overflow-hidden`}>
            <div data-women-detail-portrait-fade="true" className="absolute inset-0">
              <div className={`absolute inset-0 ${portraitFlip}`}>
                <img
                  src={portraitSrc}
                  alt={t(portraitAlt)}
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
            className="relative z-20 flex min-h-[560px] max-w-[560px] flex-col px-14 pb-8 pt-28"
            data-women-detail-fade="true"
          >
            <h1 className={`break-words ${displayFont} text-[118px] leading-[0.92] tracking-[-0.04em] text-[#2d1436]`}>
              {t(nameLine1)}
              <br />
              {t(nameLine2)}
            </h1>

            <div className="mt-8 flex w-[260px] max-w-full items-center gap-3 text-[#c7a45e]">
              <span className="h-px flex-1 bg-[#c7a45e]" />
              <span aria-hidden>❖</span>
              <span className="h-px flex-1 bg-[#c7a45e]" />
            </div>

            <h2 className={`mt-8 max-w-full break-words ${displayFont} text-[26px] italic leading-tight text-[#a75a69]`}>
              {t(role)}
            </h2>

            {metaLine && (
              <p className="mt-4 max-w-full text-[18px] leading-snug text-[#5a4a52]">
                {t(metaLine)}
              </p>
            )}

            <p className="mt-6 max-w-full text-[20px] leading-[1.7] text-[#3f3b42]">
              {t(intro)}
            </p>

            <div className="mt-8 flex w-[190px] max-w-full items-center gap-3 text-[#c7a45e]">
              <span className="h-px flex-1 bg-[#c7a45e]" />
              <span aria-hidden>❖</span>
              <span className="h-px flex-1 bg-[#c7a45e]" />
            </div>
          </div>
        </section>

        {(greatestAchievement || whySheMatters) && (
          <section
            className="relative z-30 mx-auto mt-6 grid max-w-[1200px] grid-cols-2 gap-5 px-4"
          >
            {greatestAchievement && (
              <WomenDetailHighlightSection
                title={t(greatestAchievement.title)}
                text={t(greatestAchievement.text)}
                icon="📖"
                variant="cream"
                displayFont={displayFont}
              />
            )}

            {whySheMatters && (
              <WomenDetailHighlightSection
                title={t(whySheMatters.title)}
                text={t(whySheMatters.text)}
                icon="♛"
                variant="plum"
                displayFont={displayFont}
              />
            )}
          </section>
        )}

        {visibleCards.length > 0 && (
          <section
            className={`relative z-30 mx-auto mt-8 grid max-w-[1200px] ${cardGridClass} gap-5 px-14`}
          >
            {visibleCards.map((c) => (
              <WomenDetailInfoCard key={c.title} {...c} displayFont={displayFont} />
            ))}
          </section>
        )}

        {/* Did You Know + quote, side by side */}
        <section
          className={`relative z-30 mx-auto mb-10 mt-8 grid items-stretch gap-5 ${
            didYouKnow ? "grid-cols-2 max-w-[1200px]" : "max-w-[760px]"
          }`}
        >
          {didYouKnow && (
            <div
              data-women-detail-fade="true"
              className="flex h-full flex-col rounded-[18px] border border-[#dfc997] bg-[#fff8ee]/85 px-7 py-8"
            >
              <h3 className={`${displayFont} text-[22px] uppercase tracking-[0.18em] text-[#a75a69]`}>
                {t(didYouKnow.title)}
              </h3>
              <p className="mt-4 text-[19px] leading-[1.65] text-[#3f3b42]">
                {t(didYouKnow.text)}
              </p>
            </div>
          )}

          <WomenDetailQuoteCard quote={t(quote)} quoteAuthor={quoteAuthor ? t(quoteAuthor) : undefined} dir={dir} />
        </section>
      </div>
    </WomenScaledCanvas>
  );
}
