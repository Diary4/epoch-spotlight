import React from "react";

import castleBg from "@/assets/mainImages/building.webp";

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
};

function HistoricInfoCard({ icon, title, text }: HistoricPanelCard) {
  return (
    <div
      data-historic-fade="true"
      className="flex min-h-[220px] flex-col rounded-[14px] border border-[#d6b878] bg-[#fffaf1]/80 px-4 py-6 text-center shadow-sm sm:min-h-[260px] sm:px-6 sm:py-7"
    >
      <div className="mx-auto flex items-center justify-center">
        <div className="flex h-[64px] w-[64px] items-center justify-center rounded-full border-2 border-[#b98a35] bg-[#2d1436] text-3xl text-[#c99a38] sm:h-[72px] sm:w-[72px] sm:text-4xl">
          {icon}
        </div>
      </div>

      <h3 className="mt-4 font-serif text-[22px] text-[#2d1436] sm:text-[25px]">{title}</h3>

      <div className="mx-auto mt-3 flex items-center justify-center gap-3 text-[#c7a45e]">
        <span className="h-px w-12 bg-[#c7a45e] sm:w-16" />
        <span aria-hidden>❖</span>
        <span className="h-px w-12 bg-[#c7a45e] sm:w-16" />
      </div>

      <p className="mt-4 text-[15px] leading-7 text-[#454047] sm:text-[16px]">{text}</p>
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
    <div className="flex w-screen justify-center bg-[#f7efe3] min-h-screen">
      <div
        data-historic-fade="true"
        className="relative w-full min-h-[min(1080px,calc(100svh-5.25rem))] overflow-hidden rounded-sm border border-[#d8bd83] bg-[#fbf4e8] shadow-2xl"
      >
       
{/* 
        <div className="absolute right-0 top-0 h-full w-6 border-l border-[#e4cf9d] bg-[linear-gradient(180deg,#d9b77a33,#fff0,#d9b77a33)] sm:w-8" /> */}

        <section className="relative z-10 grid grid-cols-1 gap-6 px-6 pt-10 sm:grid-cols-2 sm:gap-4 sm:px-10 sm:pt-16">
          <div className="pt-0 sm:pt-8" data-historic-fade="true">
            <h1 className="font-serif text-[clamp(40px,10vw,64px)] leading-[0.98] text-[#2d1436]">
              {nameLine1}
              <br />
              {nameLine2}
            </h1>

            <h2 className="mt-6 font-serif text-[clamp(20px,4vw,28px)] text-[#b48734] sm:mt-8">{role}</h2>

            <div className="mt-5 flex items-center gap-3 text-[#c7a45e] sm:mt-6 sm:gap-4">
              <span className="h-px w-16 flex-1 bg-[#c7a45e] sm:w-28 sm:flex-none" />
              <span className="text-lg sm:text-xl" aria-hidden>
                ❖
              </span>
              <span className="h-px w-16 flex-1 bg-[#c7a45e] sm:w-28 sm:flex-none" />
            </div>

            <p className="mt-8 max-w-[300px] text-[17px] leading-8 text-[#3f3b42] sm:mt-10 sm:text-[18px]">
              {intro}
            </p>
          </div>

          <div
            className="relative flex min-h-[280px] justify-center sm:min-h-[400px] sm:justify-end"
            data-historic-fade="true"
          >
            <img
              src={portraitSrc}
              alt={portraitAlt}
              className="w-fullrelative z-10 max-h-[min(48vh,400px)] w-auto object-cover sm:absolute sm:right-[-32px] sm:top-0 sm:max-h-none sm:h-[min(650px,78svh)] sm:w-auto lg:right-[-40px]"
            />
          </div>
        </section>

        <div className="pointer-events-none absolute left-0 right-0 top-[min(420px,52vh)] z-20 h-24 bg-gradient-to-b from-transparent to-[#fbf4e8] sm:top-[580px] sm:h-28" />

        <section className="relative z-30 mt-8 grid grid-cols-1 gap-4 px-5 sm:mt-[220px] sm:grid-cols-3 sm:gap-6 sm:px-7 md:mt-[240px] lg:mt-[260px]">
          {cards.map((c) => (
            <HistoricInfoCard key={c.title} {...c} />
          ))}
        </section>

        <section className="relative z-30 mx-5 mb-8 mt-6 rounded-[14px] border border-[#d3ad65] p-[3px] sm:mx-7 sm:mt-8">
          <div className="flex flex-col items-center gap-4 rounded-[12px] border border-[#e2c98f] bg-[#fff8ee]/80 px-5 py-6 sm:flex-row sm:px-10 sm:py-8">
            <div className="text-4xl text-[#c8a65c] sm:text-5xl" aria-hidden>
              ✺
            </div>
            <div className="hidden h-20 w-px shrink-0 bg-[#d7bd84] sm:mx-4 sm:block" />
            <p className="flex-1 text-center font-serif text-[clamp(18px,4vw,30px)] italic leading-snug text-[#2d1436] sm:text-left">
              {quote}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
