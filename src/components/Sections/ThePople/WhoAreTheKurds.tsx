import React from "react";
import { KeyRound, Sparkles, TreePine } from "lucide-react";

const infoCards = [
  {
    title: "Ancient Roots",
    text: "The Kurds are among the ancient peoples of the Middle East, with a long and rich historical presence in the region.",
    icon: TreePine,
    color: "bg-[#00604f]",
  },
  {
    title: "Culture and Values",
    text: "Kurdish society is widely associated with courage, hospitality, family bonds, and a strong love of freedom and culture.",
    icon: Sparkles,
    color: "bg-[#c9903f]",
  },
  {
    title: "A Living Identity",
    text: "Today, Kurdish identity continues through language, music, traditions, literature, and everyday life across generations.",
    icon: KeyRound,
    color: "bg-[#00604f]",
  },
];

export default function WhoAreTheKurdsSection() {
  return (
    <main className="min-h-screen w-full bg-[#fbf3e8] text-[#00604f]">
      <section className="relative mx-auto flex min-h-screen w-full max-w-[1080px] flex-col overflow-hidden bg-[#fff7ec] px-12 py-10">
        <div className="pointer-events-none absolute inset-0 opacity-18 [background-image:radial-gradient(#d8b875_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="pointer-events-none absolute left-0 top-0 h-full w-28 opacity-20 [background-image:linear-gradient(45deg,#d5b372_1px,transparent_1px),linear-gradient(-45deg,#d5b372_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Replace this image later with your own generated background */}
        <div className="pointer-events-none absolute right-0 top-[190px] h-[1000px] w-[720px]">
          <img
            src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1500&q=90"
            alt="Kurdistan mountains placeholder"
            className="absolute inset-0 h-full w-full object-cover opacity-70 [mask-image:radial-gradient(circle_at_62%_44%,black_0%,black_45%,transparent_78%)]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fff7ec] via-[#fff7ec]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fff7ec]" />
        </div>

        <div className="pointer-events-none absolute right-0 top-[360px] h-[720px] w-[520px] rounded-full border border-[#d7b56c]/35 opacity-60" />
        <div className="pointer-events-none absolute right-[-50px] top-[420px] h-[620px] w-[620px] rounded-full border border-[#d7b56c]/25 opacity-60" />

        {/* Content */}
        <section className="relative z-10 mt-20 max-w-[500px]">
          <div className="mb-14 flex items-center gap-5 text-[#c9903f]">
            <span className="h-0.5 w-14 bg-[#c9903f]" />
            <span className="h-5 w-10 rounded-full border-2 border-[#c9903f]" />
            <h2 className="font-serif text-[28px] font-bold uppercase tracking-[0.05em]">The People</h2>
          </div>

          <h1 className="font-serif text-[92px] font-semibold leading-[1.02] tracking-tight text-[#00604f]">
            Who Are<br />the Kurds?
          </h1>

          <div className="mt-12 flex items-center gap-6 text-[#c9903f]">
            <span className="h-0.5 w-48 bg-[#c9903f]" />
            <Sparkles size={30} />
            <span className="h-0.5 w-32 bg-[#c9903f]" />
          </div>

          <p className="mt-12 font-serif text-[40px] leading-tight text-[#00604f]">
            An ancient people of<br />the Middle East.
          </p>

          <p className="mt-12 max-w-[400px] text-[29px] font-semibold leading-[1.45] text-[#31445d]">
            The Kurds have lived in these mountains and plains for thousands of years, shaping the region with their strength, spirit, and culture.
          </p>
        </section>

        {/* Cards */}
        <section className="relative z-20 mt-auto grid grid-cols-3 gap-7 pb-6 pt-18">
          {infoCards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="flex min-h-[500px] flex-col items-center rounded-[26px] border-2 border-white bg-white/78 px-8 py-9 text-center shadow-[0_14px_35px_rgba(84,54,16,0.16)] backdrop-blur-md"
              >
                <div className={`grid h-26 w-26 place-items-center rounded-full ${card.color} text-[#f8dfae] shadow-[0_8px_22px_rgba(84,54,16,0.2)]`}>
                  <Icon size={58} strokeWidth={1.45} />
                </div>

                <div className="my-5 flex w-28 items-center justify-center gap-3 text-[#c9903f]">
                  <span className="h-0.5 flex-1 bg-[#d7b56c]" />
                  <span className="h-3 w-3 rotate-45 border border-[#c9903f]" />
                  <span className="h-0.5 flex-1 bg-[#d7b56c]" />
                </div>

                <h3 className="font-serif text-[31px] font-semibold leading-tight text-[#00604f]">
                  {card.title}
                </h3>

                <p className="mt-8 flex-1 text-[22px] font-semibold leading-[1.55] text-[#31445d]">
                  {card.text}
                </p>

              </article>
            );
          })}
        </section>
      </section>
    </main>
  );
}
