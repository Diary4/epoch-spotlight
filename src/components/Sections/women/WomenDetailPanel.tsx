import React from "react";

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

      <p className="mt-[clamp(6px,1.4vw,24px)] max-w-[min(100%,210px)] text-[clamp(9px,2.5vw,18px)] leading-snug text-[#3f3b42]">
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
  dir = "ltr",
}: WomenDetailPanelProps) {
  const displayFont = dir === "rtl" ? "font-amiri" : "font-serif";
  const portraitFlip = dir === "rtl" ? "-scale-x-100" : "";
  const heroScrim =
    "pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_62%,rgba(251,244,232,0.55)_82%,#fbf4e8_100%)]";

  return (
    <div
      className={`flex min-h-screen w-full max-w-full justify-center overflow-x-hidden bg-[#f7efe3] ${dir === "rtl" ? "font-amiri" : ""}`}
      dir={dir}
    >
      <div className="relative min-h-screen w-full overflow-hidden border-x border-[#d8bd83] bg-[#fbf4e8] pb-10 sm:pb-0">
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
                  fetchPriority="high"
                  className="h-full w-full object-cover object-[22%_12%]"
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

            <div className="mt-[clamp(16px,3vw,32px)] flex w-[190px] max-w-[66%] items-center gap-3 text-[#c7a45e]">
              <span className="h-px flex-1 bg-[#c7a45e]" />
              <span aria-hidden>❖</span>
              <span className="h-px flex-1 bg-[#c7a45e]" />
            </div>

            <p className="mt-[clamp(16px,3vw,32px)] max-w-[min(66%,330px)] text-[clamp(13px,1.6vw,20px)] leading-[1.6] text-[#3f3b42]">
              {intro}
            </p>
          </div>
        </section>

        <section
          className="relative z-30 mt-[clamp(20px,3vw,32px)] gap-[clamp(12px,1.6vw,20px)] px-[clamp(16px,3vw,56px)]"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
        >
          {cards.map((c) => (
            <WomenDetailInfoCard key={c.title} {...c} displayFont={displayFont} />
          ))}
        </section>

        <section className="relative z-30 mx-[clamp(16px,3vw,56px)] mb-[clamp(24px,3vw,40px)] mt-[clamp(32px,4vw,48px)] max-w-[760px] rounded-[clamp(14px,2vw,18px)] border border-[#d3ad65] bg-[#fff8ee]/75 p-[clamp(12px,1.4vw,20px)] xl:mx-auto">
          <div className="relative rounded-[14px] border border-[#e2c98f] px-[clamp(16px,2.4vw,32px)] py-[clamp(28px,3vw,40px)] text-center">
            <div className="absolute left-1/2 top-[-18px] -translate-x-1/2 bg-[#fbf4e8] px-3 text-[#c8a65c]">
              ❖
            </div>

            <p className={`break-words ${displayFont} text-[clamp(20px,5.5vw,44px)] italic leading-snug text-[#2d1436]`}>
              {quote}
            </p>

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
