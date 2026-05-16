import React from "react";

export type HistoricPanelCard = {
  icon: string;
  title: string;
  text: string;
};

export type HistoricCharacterPanelProps = {
  nameLine1: string;
  nameLine2: string;
  role: string;
  intro: string;
  portraitSrc: string;
  portraitAlt: string;
  cards: HistoricPanelCard[];
  quote: string;
  listIcon?: "crown" | "flower";
};

function HistoricInfoCard({ icon, title, text }: HistoricPanelCard) {
  return (
    <div
      data-historic-fade="true"
      className="flex min-h-[220px] flex-col items-center justify-start rounded-[16px] border border-[#dfc997] bg-[#fff8ee]/75 px-4 py-6 text-center shadow-[0_8px_20px_rgba(80,45,30,0.06)] sm:min-h-[250px] sm:rounded-[18px] sm:px-5 sm:py-8"
    >
      <div className="grid h-[64px] w-[64px] place-items-center rounded-full bg-[#5a223f] text-[30px] text-[#d7aa4e] sm:h-[78px] sm:w-[78px] sm:text-[38px]">
        {icon}
      </div>

      <div className="mt-4 flex w-16 items-center gap-2 text-[#c8a765] sm:mt-5 sm:w-20">
        <span className="h-px flex-1 bg-[#d9bd81]" />
        <span className="text-sm">❖</span>
        <span className="h-px flex-1 bg-[#d9bd81]" />
      </div>

      <h3 className="mt-3 font-serif text-[clamp(22px,4vw,30px)] leading-none text-[#2d1436] sm:mt-4">
        {title}
      </h3>

      <p className="mt-4 max-w-[280px] text-[clamp(15px,3.2vw,18px)] leading-relaxed text-[#3f3b42] sm:mt-6 sm:max-w-[210px] sm:leading-8">
        {text}
      </p>
    </div>
  );
}

export default function HistoricCharacterPanel({
  nameLine1,
  nameLine2,
  role,
  intro,
  portraitSrc,
  portraitAlt,
  cards,
  quote,
}: HistoricCharacterPanelProps) {
  return (
    <div className="flex min-h-screen w-full justify-center bg-[#f7efe3]">
      <div
        data-historic-fade="true"
        className="relative min-h-screen w-full overflow-hidden border-x border-[#d8bd83] bg-[#fbf4e8]"
      >
        {/* side ornaments */}
        <div className="pointer-events-none absolute left-4 top-0 h-full w-px bg-[#d4b778]/45" />
        <div className="pointer-events-none absolute right-4 top-0 h-full w-px bg-[#d4b778]/45" />

        {/* hero */}
        <section className="relative z-10 grid min-h-0 grid-cols-1 items-start gap-6 px-4 pb-6 pt-20 sm:min-h-[650px] sm:grid-cols-[0.8fr_1.2fr] sm:gap-4 sm:px-8 sm:pt-24 lg:px-14">
          <div className="relative z-20 sm:pt-4" data-historic-fade="true">
            <h1 className="font-serif text-[clamp(48px,11vw,118px)] leading-[0.9] tracking-[-0.04em] text-[#2d1436]">
              {nameLine1}
              <br />
              {nameLine2}
            </h1>

            <div className="mt-6 flex w-full max-w-[260px] items-center gap-3 text-[#c7a45e] sm:mt-8">
              <span className="h-px flex-1 bg-[#c7a45e]" />
              <span aria-hidden>❖</span>
              <span className="h-px flex-1 bg-[#c7a45e]" />
            </div>

            <h2 className="mt-6 max-w-full font-serif text-[clamp(26px,5vw,48px)] italic leading-tight text-[#b48734] sm:mt-8 sm:max-w-[300px]">
              {role}
            </h2>

            <div className="mt-6 flex w-full max-w-[190px] items-center gap-3 text-[#c7a45e] sm:mt-8">
              <span className="h-px flex-1 bg-[#c7a45e]" />
              <span aria-hidden>❖</span>
              <span className="h-px flex-1 bg-[#c7a45e]" />
            </div>

            <p className="mt-6 max-w-full text-[clamp(16px,3.5vw,20px)] leading-relaxed text-[#3f3b42] sm:mt-8 sm:max-w-[330px] sm:leading-9">
              {intro}
            </p>
          </div>

          <div
            className="relative flex min-h-[280px] items-start justify-center sm:min-h-[520px] sm:justify-end"
            data-historic-fade="true"
          >
            <div className="absolute right-[7%] top-4 hidden h-[460px] w-[min(90%,360px)] rounded-t-full bg-[#ead9bd]/55 sm:block" />

            <img
              src={portraitSrc}
              alt={portraitAlt}
              className="relative z-10 mx-auto h-[clamp(280px,50vh,620px)] w-full max-w-[min(100%,420px)] object-contain sm:mx-0"
            />

            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-32 bg-gradient-to-b from-transparent to-[#fbf4e8]" />
          </div>
        </section>

        {/* cards */}
        <section className="relative z-30 mt-8 grid grid-cols-1 gap-4 px-4 pb-8 sm:mt-[10vh] sm:grid-cols-3 sm:gap-5 sm:px-8 lg:px-14">
          {cards.map((c) => (
            <HistoricInfoCard key={c.title} {...c} />
          ))}
        </section>

        {/* quote */}
        <section className="relative z-30 mx-4 mt-8 max-w-[760px] rounded-[18px] border border-[#d3ad65] bg-[#fff8ee]/75 p-4 sm:mx-8 sm:mt-12 sm:p-5 lg:mx-14 xl:mx-auto">
          <div className="relative rounded-[14px] border border-[#e2c98f] px-5 py-8 text-center sm:px-8 sm:py-10">
            <div className="absolute left-1/2 top-[-18px] -translate-x-1/2 bg-[#fbf4e8] px-3 text-[#c8a65c]">
              ❖
            </div>

            <p className="font-serif text-[clamp(30px,4vw,44px)] italic leading-tight text-[#2d1436]">
              {quote}
            </p>

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