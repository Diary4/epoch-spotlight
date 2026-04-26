import React from "react";
import { ArrowLeft, ArrowRight, MessageSquareText, Music2, UsersRound } from "lucide-react";

const identityCards = [
  {
    title: "Language",
    text: "Kurdish language is a central part of identity and remains a living connection between generations and communities.",
    icon: MessageSquareText,
    iconText: "کوردی",
  },
  {
    title: "Traditions",
    text: "Music, dance, clothing, celebrations, and hospitality help preserve a shared sense of belonging.",
    icon: Music2,
  },
  {
    title: "Collective\nMemory",
    text: "Across different places and borders, Kurds remain connected through shared history, stories, and cultural memory.",
    icon: UsersRound,
  },
];

type SharedIdentityPageProps = {
  onBack?: () => void;
};

export default function SharedIdentityPage({ onBack }: SharedIdentityPageProps) {
  return (
    <main className="min-h-screen w-full bg-[#fbf3e8] text-[#00604f]">
      <section className="relative mx-auto flex min-h-screen w-full max-w-[1080px] flex-col overflow-hidden bg-[#fff7ec] px-12 py-10">
        <button
          type="button"
          onClick={onBack}
          className="absolute left-8 top-8 z-30 grid h-14 w-14 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#00604f] shadow-sm"
          aria-label="Back to The People"
        >
          <ArrowLeft size={28} />
        </button>
        <div className="pointer-events-none absolute inset-0 opacity-16 [background-image:radial-gradient(#d8b875_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="pointer-events-none absolute right-0 top-[130px] h-[920px] w-[760px]">
          {/* Replace this placeholder with your generated people/culture image */}
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1500&q=90"
            alt="Shared identity placeholder"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-75 [mask-image:radial-gradient(circle_at_60%_45%,black_0%,black_52%,transparent_82%)]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fff7ec] via-[#fff7ec]/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fff7ec]" />
        </div>

        {/* Main text */}
        <section className="relative z-10 mt-16 max-w-[520px]">
          <h1 className="font-serif text-[96px] font-semibold leading-[1.02] tracking-tight text-[#214439]">
            A Shared<br />Identity
          </h1>

          <div className="mt-12 flex items-center gap-6 text-[#c9903f]">
            <span className="h-0.5 w-48 bg-[#c9903f]" />
            <span className="text-3xl">✥</span>
            <span className="h-0.5 w-28 bg-[#c9903f]" />
          </div>

          <p className="mt-8 font-serif text-[37px] leading-tight text-[#b06f25]">
            United by language,<br />heritage, and memory.
          </p>

          <p className="mt-9 max-w-[380px] text-[25px] font-semibold leading-[1.62] text-[#35435b]">
            Across generations and places, Kurdish identity is a source of strength, pride, and unity. Rooted in a rich history and carried forward through everyday life, it connects people through what they speak, celebrate, remember, and share.
          </p>
        </section>

        {/* Cards */}
        <section className="relative z-20 mt-auto grid grid-cols-3 gap-7 pb-8 pt-12">
          {identityCards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="flex min-h-[555px] flex-col items-center rounded-[24px] border-2 border-white bg-white/82 px-7 py-9 text-center shadow-[0_14px_35px_rgba(84,54,16,0.16)] backdrop-blur-md"
              >
                <div className="grid h-30 w-30 place-items-center rounded-full border-4 border-[#f5ead3] bg-white text-[#c9903f] shadow-[0_7px_18px_rgba(84,54,16,0.13)]">
                  {card.iconText ? (
                    <div className="relative">
                      <MessageSquareText size={64} strokeWidth={1.5} />
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[48%] text-[20px] font-bold">{card.iconText}</span>
                    </div>
                  ) : (
                    <Icon size={66} strokeWidth={1.45} />
                  )}
                </div>

                <h3 className="mt-8 whitespace-pre-line font-serif text-[37px] font-semibold leading-[0.95] text-[#214439]">
                  {card.title}
                </h3>

                <div className="my-6 flex w-30 items-center justify-center gap-3 text-[#c9903f]">
                  <span className="h-0.5 flex-1 bg-[#d7b56c]" />
                  <span className="text-xl">✥</span>
                  <span className="h-0.5 flex-1 bg-[#d7b56c]" />
                </div>

                <p className="flex-1 text-[22px] font-semibold leading-[1.55] text-[#35435b]">
                  {card.text}
                </p>

                <button className="mt-8 flex h-16 w-full items-center justify-center gap-10 rounded-[17px] border-2 border-[#ead2a8] bg-[#fff8ed] text-[24px] font-semibold text-[#c07b24] shadow-sm">
                  Learn More
                  <ArrowRight size={36} />
                </button>
              </article>
            );
          })}
        </section>

      </section>
    </main>
  );
}
