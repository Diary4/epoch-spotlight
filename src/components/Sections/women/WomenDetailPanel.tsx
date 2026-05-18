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
  return (
    <div className="flex min-h-screen w-full justify-center bg-[#f7efe3]" dir={dir}>
      <div
        data-women-detail-fade="true"
        className="relative min-h-screen w-full overflow-hidden border-x border-[#d8bd83] bg-[#fbf4e8]"
      >
        <div className="pointer-events-none absolute left-4 top-0 h-full w-px bg-[#d4b778]/45" />
        <div className="pointer-events-none absolute right-4 top-0 h-full w-px bg-[#d4b778]/45" />

        <section className="relative z-10 w-full">
          <img
            src={portraitSrc}
            alt={portraitAlt}
            data-women-detail-fade="true"
            className="absolute inset-0 h-[60vh] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]"
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] bg-gradient-to-b from-[#fbf4e8]/72 via-[#fbf4e8]/30 to-[#fbf4e8]/95" />

          <div className="relative z-20 px-4 pb-8 pt-24 sm:px-8 sm:pt-28 lg:px-14" data-women-detail-fade="true">
            <h1 className="font-serif text-[clamp(70px,9vw,118px)] leading-[0.88] tracking-[-0.04em] text-[#2d1436]">
              {nameLine1}
              <br />
              {nameLine2}
            </h1>

            <div className="mt-8 flex w-[260px] max-w-full items-center gap-3 text-[#c7a45e]">
              <span className="h-px flex-1 bg-[#c7a45e]" />
              <span aria-hidden>❖</span>
              <span className="h-px flex-1 bg-[#c7a45e]" />
            </div>

            <h2 className="mt-8 max-w-[min(100%,300px)] font-serif text-[clamp(34px,4vw,48px)] italic leading-tight text-[#b48734]">
              {role}
            </h2>

            <div className="mt-8 flex w-[190px] max-w-full items-center gap-3 text-[#c7a45e]">
              <span className="h-px flex-1 bg-[#c7a45e]" />
              <span aria-hidden>❖</span>
              <span className="h-px flex-1 bg-[#c7a45e]" />
            </div>

            <p className="mt-8 max-w-[min(100%,330px)] text-[20px] leading-9 text-[#3f3b42]">{intro}</p>
          </div>

        </section>

        <section className="relative z-30 mt-[clamp(80px,50vh,360px)] grid grid-cols-1 gap-5 px-4 sm:grid-cols-3 sm:px-8 lg:px-14">
          {cards.map((c) => (
            <WomenDetailInfoCard key={c.title} {...c} />
          ))}
        </section>

        <section className="relative z-30 mx-4 mt-12 max-w-[760px] rounded-[18px] border border-[#d3ad65] bg-[#fff8ee]/75 p-5 sm:mx-8 lg:mx-14 xl:mx-auto">
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
