import React from "react";
import { ArrowLeft, Mountain, SunMedium, Landmark } from "lucide-react";

const cards = [
  {
    title: "Endurance",
    text: "Through countless challenges, the Kurdish people have shown unwavering strength and the will to persevere.",
    icon: Mountain,
  },
  {
    title: "Dignity",
    text: "With deep respect for their heritage and values, Kurds have preserved their identity with pride and honor.",
    icon: Landmark,
  },
  {
    title: "Hope",
    text: "Looking ahead with optimism, the Kurdish people continue to build a future rooted in peace, unity, and progress.",
    icon: SunMedium,
  },
];

type StoryOfResilienceProps = {
  onBack?: () => void;
};

export default function StoryOfResilience({ onBack }: StoryOfResilienceProps) {
  return (
    <main className="min-h-screen w-full bg-[#fbf3e8] text-[#174b3d]">
      <section className="relative mx-auto flex min-h-screen w-full max-w-[1080px] flex-col overflow-hidden bg-[#fff7ec] px-12 py-10">
        <button
          type="button"
          onClick={onBack}
          className="absolute left-8 top-8 z-30 grid h-14 w-14 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#174b3d] shadow-sm"
          aria-label="Back to The People"
        >
          <ArrowLeft size={28} />
        </button>
        <div className="pointer-events-none absolute inset-0 opacity-16 [background-image:radial-gradient(#d8b875_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="pointer-events-none absolute left-0 top-0 h-full w-28 opacity-20 [background-image:linear-gradient(45deg,#d5b372_1px,transparent_1px),linear-gradient(-45deg,#d5b372_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-28 opacity-20 [background-image:linear-gradient(45deg,#d5b372_1px,transparent_1px),linear-gradient(-45deg,#d5b372_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Replace this image later with your generated resilience background */}
        <div className="pointer-events-none absolute right-0 top-[155px] h-[980px] w-[760px]">
          <img
            src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=90"
            alt="Resilience background placeholder"
            className="absolute inset-0 h-full w-full object-cover opacity-80 [mask-image:radial-gradient(circle_at_62%_42%,black_0%,black_54%,transparent_82%)]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fff7ec] via-[#fff7ec]/18 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fff7ec]" />
        </div>

        {/* Text */}
        <section className="relative z-10 mt-16 max-w-[540px]">
          <h1 className="font-serif text-[91px] font-semibold leading-[1.03] tracking-tight text-[#214439]">
            A Story of<br />Resilience
          </h1>

          <div className="mt-10 flex items-center gap-6 text-[#c9903f]">
            <span className="h-0.5 w-48 bg-[#c9903f]" />
            <span className="text-3xl">✥</span>
            <span className="h-0.5 w-40 bg-[#c9903f]" />
          </div>

          <p className="mt-8 font-serif text-[33px] leading-tight text-[#b06f25]">
            A history shaped by endurance,<br />dignity, and hope.
          </p>

          <p className="mt-9 max-w-[430px] text-[21px] font-semibold leading-[1.75] text-[#35435b]">
            Across centuries, the Kurdish people have faced hardship and change, yet they have held on to their identity, culture, and values. Through every challenge, they have stood together, preserved their heritage, and moved forward with courage and hope for a better tomorrow.
          </p>
        </section>

        {/* Decorative culture strip placeholder */}
        <div className="relative z-10 mt-8 h-[210px] max-w-[620px] opacity-90">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80"
            alt="culture placeholder"
            className="h-full w-full object-cover [mask-image:linear-gradient(to_right,black_0%,black_70%,transparent_100%)]"
          />
        </div>

        {/* Cards */}
        <section className="relative z-20 mt-auto grid grid-cols-3 gap-8 pb-8 pt-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="relative flex min-h-[435px] flex-col items-center overflow-hidden rounded-[22px] border-2 border-[#f4e5cc] bg-white/82 px-8 py-9 text-center shadow-[0_14px_35px_rgba(84,54,16,0.16)] backdrop-blur-md"
              >
                <div className="grid h-30 w-30 place-items-center rounded-full border-2 border-[#d8a14c] bg-white text-[#c9903f] shadow-[0_7px_18px_rgba(84,54,16,0.13)]">
                  <Icon size={64} strokeWidth={1.45} />
                </div>

                <h3 className="mt-8 font-serif text-[41px] font-semibold leading-tight text-[#214439]">
                  {card.title}
                </h3>

                <div className="my-5 flex w-30 items-center justify-center gap-3 text-[#c9903f]">
                  <span className="h-0.5 flex-1 bg-[#d7b56c]" />
                  <span className="h-3 w-3 rotate-45 border border-[#c9903f]" />
                  <span className="h-0.5 flex-1 bg-[#d7b56c]" />
                </div>

                <p className="text-[21px] font-semibold leading-[1.55] text-[#40515f]">
                  {card.text}
                </p>

                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:18px_18px]" />
              </article>
            );
          })}
        </section>

      </section>
    </main>
  );
}
