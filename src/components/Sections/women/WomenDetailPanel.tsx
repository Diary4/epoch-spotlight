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
      className="flex min-h-[220px] flex-col items-center justify-start rounded-[18px] border border-[#dfc997] bg-[#fff8ee]/75 px-4 py-6 text-center shadow-[0_8px_20px_rgba(80,45,30,0.06)] sm:min-h-[250px] sm:px-5 sm:py-8"
    >
      <div className="grid h-16 w-16 place-items-center rounded-full bg-[#5a223f] text-[30px] text-[#d7aa4e] sm:h-[78px] sm:w-[78px] sm:text-[38px]">
        {icon}
      </div>

      <div className="mt-4 flex w-20 items-center gap-2 text-[#c8a765] sm:mt-5">
        <span className="h-px flex-1 bg-[#d9bd81]" />
        <span className="text-sm">❖</span>
        <span className="h-px flex-1 bg-[#d9bd81]" />
      </div>

      <h3 className="mt-3 font-serif text-[24px] leading-none text-[#2d1436] sm:mt-4 sm:text-[30px]">{title}</h3>

      <p className="mt-4 max-w-[280px] text-[16px] leading-7 text-[#3f3b42] sm:mt-6 sm:max-w-[210px] sm:text-[18px] sm:leading-8">
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
            className="absolute inset-0 h-[50vh] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)] sm:h-[60vh]"
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[50vh] bg-gradient-to-b from-[#fbf4e8]/72 via-[#fbf4e8]/30 to-[#fbf4e8]/95 sm:h-[60vh]" />

          <div className="relative z-20 px-4 pb-8 pt-20 sm:px-8 sm:pt-28 lg:px-14" data-women-detail-fade="true">
            <h1 className="font-serif text-[clamp(44px,12vw,118px)] leading-[0.88] tracking-[-0.04em] text-[#2d1436] sm:text-[clamp(70px,9vw,118px)]">
              {nameLine1}
              <br />
              {nameLine2}
            </h1>

            <div className="mt-6 flex w-[260px] max-w-full items-center gap-3 text-[#c7a45e] sm:mt-8">
              <span className="h-px flex-1 bg-[#c7a45e]" />
              <span aria-hidden>❖</span>
              <span className="h-px flex-1 bg-[#c7a45e]" />
            </div>

            <h2 className="mt-6 max-w-[min(100%,300px)] font-serif text-[clamp(26px,6vw,48px)] italic leading-tight text-[#b48734] sm:mt-8">
              {role}
            </h2>

            <div className="mt-6 flex w-[190px] max-w-full items-center gap-3 text-[#c7a45e] sm:mt-8">
              <span className="h-px flex-1 bg-[#c7a45e]" />
              <span aria-hidden>❖</span>
              <span className="h-px flex-1 bg-[#c7a45e]" />
            </div>

            <p className="mt-6 max-w-[min(100%,330px)] text-[17px] leading-8 text-[#3f3b42] sm:mt-8 sm:text-[20px]">
              {intro}
            </p>
          </div>
        </section>

        <section className="relative z-30 mt-[clamp(28px,18vh,120px)] grid grid-cols-1 gap-5 px-4 sm:mt-[clamp(80px,50vh,360px)] sm:grid-cols-3 sm:px-8 lg:px-14">
          {cards.map((c) => (
            <WomenDetailInfoCard key={c.title} {...c} />
          ))}
        </section>

        <section className="relative z-30 mx-4 mt-10 max-w-[760px] rounded-[18px] border border-[#d3ad65] bg-[#fff8ee]/75 p-4 sm:mx-8 sm:mt-12 sm:p-5 lg:mx-14 xl:mx-auto">
          <div className="relative rounded-[14px] border border-[#e2c98f] px-5 py-8 text-center sm:px-8 sm:py-10">
            <div className="absolute left-1/2 top-[-18px] -translate-x-1/2 bg-[#fbf4e8] px-3 text-[#c8a65c]">
              ❖
            </div>

            <p className="font-serif text-[clamp(24px,6vw,44px)] italic leading-tight text-[#2d1436]">{quote}</p>

            <div className="mx-auto mt-5 flex w-[220px] max-w-full items-center gap-3 text-[#c7a45e] sm:mt-6">
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
