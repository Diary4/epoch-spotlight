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

function WomenDetailInfoCard({ icon, title, text }: WomenDetailPanelCard) {
  return (
    <div
      data-women-detail-fade="true"
      className="flex min-h-[250px] flex-col items-center justify-start rounded-[18px] border border-[#dfc997] bg-[#fff8ee]/75 px-5 py-8 text-center shadow-[0_8px_20px_rgba(80,45,30,0.06)]"
    >
      <div className="grid h-[78px] w-[78px] place-items-center rounded-full bg-[#5a223f] text-[38px] text-[#d7aa4e]">
        {icon}
      </div>

      <div className="mt-5 flex w-20 items-center gap-2 text-[#c8a765]">
        <span className="h-px flex-1 bg-[#d9bd81]" />
        <span className="text-sm">❖</span>
        <span className="h-px flex-1 bg-[#d9bd81]" />
      </div>

      <h3 className="mt-4 font-serif text-[30px] leading-none text-[#2d1436]">{title}</h3>

      <p className="mt-6 max-w-[210px] text-[18px] leading-8 text-[#3f3b42]">{text}</p>
    </div>
  );
}

/**
 * Knowledge / Resistance detail — same layout as {@link HistoricCharacterPanel};
 * uses `data-women-detail-fade` so GSAP stays scoped away from Historic.
 */
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
  return (
    <div className="flex min-h-screen w-full justify-center bg-[#f7efe3]" dir={dir}>
      <div
        data-women-detail-fade="true"
        className="relative min-h-screen w-full overflow-hidden border-x border-[#d8bd83] bg-[#fbf4e8]"
      >
        <div className="pointer-events-none absolute left-4 top-0 h-full w-px bg-[#d4b778]/45" />
        <div className="pointer-events-none absolute right-4 top-0 h-full w-px bg-[#d4b778]/45" />

        <section className="relative z-10 grid min-h-[650px] grid-cols-1 items-start gap-4 sm:grid-cols-[0.8fr_1.2fr]">
          <div className="relative z-20 pt-20" data-women-detail-fade="true">
            <h1 className="font-serif text-[clamp(70px,9vw,118px)] leading-[0.88] tracking-[-0.04em] text-[#2d1436]">
              {nameLine1}
              <br />
              {nameLine2}
            </h1>

            <div className="mt-8 flex w-[260px] items-center gap-3 text-[#c7a45e]">
              <span className="h-px flex-1 bg-[#c7a45e]" />
              <span aria-hidden>❖</span>
              <span className="h-px flex-1 bg-[#c7a45e]" />
            </div>

            <h2 className="mt-8 max-w-[300px] font-serif text-[clamp(34px,4vw,48px)] italic leading-tight text-[#b48734]">
              {role}
            </h2>

            <div className="mt-8 flex w-[190px] items-center gap-3 text-[#c7a45e]">
              <span className="h-px flex-1 bg-[#c7a45e]" />
              <span aria-hidden>❖</span>
              <span className="h-px flex-1 bg-[#c7a45e]" />
            </div>

            <p className="mt-8 max-w-[330px] text-[20px] leading-9 text-[#3f3b42]">{intro}</p>
          </div>

          <div
            className="relative flex min-h-[620px] items-start justify-center sm:justify-end"
            data-women-detail-fade="true"
          >
            <div className="absolute right-[7%] top-4 h-[560px] w-[430px] rounded-t-full bg-[#ead9bd]/55" />

            <img
              src={portraitSrc}
              alt={portraitAlt}
              className="relative z-10 mt-0 h-[690px] max-w-none object-contain"
            />

            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-32 bg-gradient-to-b from-transparent to-[#fbf4e8]" />
          </div>
        </section>

        <section className="relative z-30 mt-[20vh] grid grid-cols-1 gap-5 sm:grid-cols-3">
          {cards.map((c) => (
            <WomenDetailInfoCard key={c.title} {...c} />
          ))}
        </section>

        <section className="relative z-30 mx-auto mt-12 max-w-[760px] rounded-[18px] border border-[#d3ad65] bg-[#fff8ee]/75 p-5">
          <div className="relative rounded-[14px] border border-[#e2c98f] px-8 py-10 text-center">
            <div className="absolute left-1/2 top-[-18px] -translate-x-1/2 bg-[#fbf4e8] px-3 text-[#c8a65c]">
              ❖
            </div>

            <p className="font-serif text-[clamp(30px,4vw,44px)] italic leading-tight text-[#2d1436]">{quote}</p>

            <div className="mx-auto mt-6 flex w-[220px] items-center gap-3 text-[#c7a45e]">
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
