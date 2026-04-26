import React from "react";
import { ArrowLeft, ArrowRight, Grid2X2, Home, MessageSquareText, Music2, UsersRound } from "lucide-react";

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

function Logo() {
  return (
    <div className="flex items-center gap-5">
      <div className="relative h-24 w-16">
        <div className="absolute left-0 top-8 h-16 w-6 bg-gradient-to-b from-[#e5c16f] to-[#a9782f]" />
        <div className="absolute right-0 top-8 h-16 w-6 bg-gradient-to-b from-[#e5c16f] to-[#a9782f]" />
        <div className="absolute left-2 top-0 h-16 w-12 rounded-t-full border-[18px] border-b-0 border-[#d5a84e]" />
      </div>
      <div className="leading-tight">
        <p className="text-[28px] font-bold tracking-[0.08em] text-[#00604f]">GATE OF</p>
        <p className="text-[28px] font-bold tracking-[0.08em] text-[#00604f]">KURDISTAN</p>
        <p className="text-[21px] tracking-[0.18em] text-[#c9903f]">GOK</p>
      </div>
    </div>
  );
}

function CircleButton({ children }) {
  return (
    <button className="grid h-16 w-16 place-items-center rounded-full border-2 border-[#d9b477] bg-white/45 text-[#00604f] shadow-sm">
      {children}
    </button>
  );
}

function NavButton({ children, active = false }) {
  return (
    <button
      className={`flex h-[92px] min-w-[275px] items-center justify-center gap-5 rounded-[18px] border-2 px-7 text-[29px] shadow-md ${
        active
          ? "border-[#d79f43] bg-[#fff7e9] text-[#5f4c36]"
          : "border-[#e0b974] bg-[#fff9ef] text-[#4d4d4d]"
      }`}
    >
      {children}
    </button>
  );
}

export default function SharedIdentityPage() {
  return (
    <main className="min-h-screen w-full bg-[#fbf3e8] text-[#00604f]">
      <section className="relative mx-auto flex min-h-screen w-full max-w-[1080px] flex-col overflow-hidden bg-[#fff7ec] px-12 py-10">
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

        {/* Header */}
        <header className="relative z-10 flex items-start justify-between">
          <Logo />

          <nav className="mt-8 flex items-center gap-6 text-[22px] text-[#243d52]">
            <span>Kurdish</span>
            <span className="h-8 w-px bg-[#c99a55]" />
            <span className="border-b-4 border-[#c99a55] pb-3 font-semibold text-[#c9903f]">English</span>
            <span className="h-8 w-px bg-[#c99a55]" />
            <span>Arabic</span>
          </nav>

          <div className="mt-4 flex gap-5">
            <CircleButton><Home size={32} /></CircleButton>
            <CircleButton><ArrowLeft size={36} /></CircleButton>
          </div>
        </header>

        {/* Main text */}
        <section className="relative z-10 mt-24 max-w-[520px]">
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

        {/* Bottom controls */}
        <footer className="relative z-20 pb-4">
          <div className="grid grid-cols-3 gap-12">
            <NavButton>
              <ArrowLeft size={42} />
              Previous
            </NavButton>
            <NavButton active>
              <Grid2X2 size={44} className="text-[#c9903f]" />
              <span className="leading-tight text-left">Return to<br />Main Menu</span>
            </NavButton>
            <NavButton>
              Next
              <ArrowRight size={42} />
            </NavButton>
          </div>

          <div className="mt-8 text-center">
            <p className="text-[21px] font-bold uppercase tracking-[0.35em] text-[#c9903f]">
              ✥ Explore the Gate of Kurdistan ✥
            </p>

            <div className="mx-auto mt-7 flex max-w-[740px] items-center justify-between text-[#c9903f]">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="relative flex flex-col items-center gap-4">
                  <span className={`h-7 w-7 rounded-full border-4 ${n === 2 ? "border-[#d29128] bg-white shadow-[0_0_0_6px_rgba(210,145,40,0.25)]" : "border-[#cfc8bb] bg-[#fff7ec]"}`} />
                  <span className={`text-[17px] font-bold ${n === 2 ? "text-[#c9903f]" : "text-[#777]"}`}>
                    {n}. {n === 1 ? "THE LAND" : n === 2 ? "THE PEOPLE" : n === 3 ? "THE HERITAGE" : "THE FUTURE"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </footer>
      </section>
    </main>
  );
}
