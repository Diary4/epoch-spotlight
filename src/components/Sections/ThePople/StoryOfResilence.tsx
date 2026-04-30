import React, { useLayoutEffect, useRef } from "react";
import { ArrowLeft, Mountain, SunMedium, Landmark } from "lucide-react";
import { gsap } from "gsap";

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
  const rootRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".back-btn", { opacity: 0, scale: 0.72, duration: 0.9 })
        .from(".pattern-layer", { opacity: 0, duration: 1 }, "-=0.5")
        .from(".hero-image", { opacity: 0, x: 75, scale: 1.09, duration: 1.7 }, "-=0.7")
        .from(".main-title", { opacity: 0, y: 60, duration: 1.1 }, "-=0.8")
        .from(".title-divider > *", { opacity: 0, scaleX: 0, stagger: 0.16, duration: 0.75 }, "-=0.5")
        .from(".subtitle-text", { opacity: 0, y: 36, duration: 0.9 }, "-=0.5")
        .from(".description-text", { opacity: 0, y: 26, duration: 0.85 }, "-=0.4")
        .from(".culture-strip", { opacity: 0, y: 28, duration: 1 }, "-=0.35")
        .from(".resilience-card", { opacity: 0, y: 70, scale: 0.95, stagger: 0.2, duration: 0.9 }, "-=0.35");

    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={rootRef} className="m-0 min-h-[100vh] w-[100vw] max-w-none bg-[#fbf3e8] px-[clamp(12px,1.8vw,28px)] py-[clamp(10px,1.6vh,24px)] text-[#174b3d]">
      <section className="relative mx-auto flex min-h-[calc(100vh-2*clamp(10px,1.6vh,24px))] w-[min(100vw,1400px)] max-w-none flex-col overflow-hidden rounded-[clamp(22px,2.4vw,34px)] bg-[#fff7ec] px-[clamp(20px,3.1vw,52px)] py-[clamp(20px,2.7vh,40px)]">
        <button
          type="button"
          onClick={onBack}
          className="back-btn absolute left-[clamp(16px,2vw,30px)] top-[clamp(16px,2vh,30px)] z-30 grid h-[clamp(50px,4.8vw,64px)] w-[clamp(50px,4.8vw,64px)] place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#174b3d] shadow-sm"
          aria-label="Back to The People"
        >
          <ArrowLeft size={30} />
        </button>
        <div className="pattern-layer pointer-events-none absolute inset-0 opacity-16 [background-image:radial-gradient(#d8b875_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="pattern-layer pointer-events-none absolute left-0 top-0 h-full w-28 opacity-20 [background-image:linear-gradient(45deg,#d5b372_1px,transparent_1px),linear-gradient(-45deg,#d5b372_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="pattern-layer pointer-events-none absolute right-0 top-0 h-full w-28 opacity-20 [background-image:linear-gradient(45deg,#d5b372_1px,transparent_1px),linear-gradient(-45deg,#d5b372_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Replace this image later with your generated resilience background */}
        <div className="hero-image pointer-events-none absolute right-0 top-[clamp(130px,11vh,210px)] h-[clamp(780px,67vh,1160px)] w-[clamp(520px,52vw,900px)]">
          <img
            src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=90"
            alt="Resilience background placeholder"
            className="absolute inset-0 h-full w-full object-cover opacity-80 [mask-image:radial-gradient(circle_at_62%_42%,black_0%,black_54%,transparent_82%)]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fff7ec] via-[#fff7ec]/18 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fff7ec]" />
        </div>

        {/* Text */}
        <section className="relative z-10 mt-[clamp(62px,8.2vh,126px)] max-w-[min(58vw,760px)]">
          <h1 className="main-title font-serif text-[clamp(64px,8vw,116px)] font-semibold leading-[1.03] tracking-tight text-[#214439]">
            A Story of<br />Resilience
          </h1>

          <div className="title-divider mt-[clamp(26px,3.8vh,48px)] flex items-center gap-[clamp(14px,1.5vw,22px)] text-[#c9903f]">
            <span className="h-0.5 w-[clamp(130px,13vw,220px)] bg-[#c9903f]" />
            <span className="text-[clamp(24px,2.2vw,36px)]">✥</span>
            <span className="h-0.5 w-[clamp(110px,11vw,190px)] bg-[#c9903f]" />
          </div>

          <p className="subtitle-text mt-[clamp(22px,3vh,40px)] font-serif text-[clamp(30px,3.6vw,52px)] leading-tight text-[#b06f25]">
            A history shaped by endurance,<br />dignity, and hope.
          </p>

          <p className="description-text mt-[clamp(18px,2.8vh,38px)] max-w-[min(48vw,650px)] text-[clamp(18px,2vw,30px)] font-semibold leading-[1.75] text-[#35435b]">
            Across centuries, the Kurdish people have faced hardship and change, yet they have held on to their identity, culture, and values. Through every challenge, they have stood together, preserved their heritage, and moved forward with courage and hope for a better tomorrow.
          </p>
        </section>

        {/* Decorative culture strip placeholder */}
        <div className="culture-strip relative z-10 mt-[clamp(18px,2.5vh,36px)] h-[clamp(130px,15vh,250px)] max-w-[min(62vw,860px)] opacity-90">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80"
            alt="culture placeholder"
            className="h-full w-full object-cover [mask-image:linear-gradient(to_right,black_0%,black_70%,transparent_100%)]"
          />
        </div>

        {/* Cards */}
        <section className="relative z-20 mt-[clamp(20px,4.2vh,70px)] grid grid-cols-3 gap-[clamp(16px,1.8vw,34px)] pb-[clamp(8px,1vh,22px)] pt-[clamp(20px,2.8vh,42px)]">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="resilience-card relative flex min-h-[clamp(330px,30vh,500px)] flex-col items-center overflow-hidden rounded-[clamp(20px,2.2vw,32px)] border-2 border-[#f4e5cc] bg-white/82 px-[clamp(16px,1.8vw,34px)] py-[clamp(18px,2.1vh,34px)] text-center shadow-[0_14px_35px_rgba(84,54,16,0.16)] backdrop-blur-md"
              >
                <div className="grid h-[clamp(82px,7.3vw,124px)] w-[clamp(82px,7.3vw,124px)] place-items-center rounded-full border-2 border-[#d8a14c] bg-white text-[#c9903f] shadow-[0_7px_18px_rgba(84,54,16,0.13)]">
                  <Icon size={58} strokeWidth={1.45} />
                </div>

                <h3 className="mt-[clamp(14px,1.9vh,30px)] font-serif text-[clamp(26px,2.7vw,42px)] font-semibold leading-tight text-[#214439]">
                  {card.title}
                </h3>

                <div className="my-[clamp(12px,1.6vh,24px)] flex w-[clamp(88px,8.3vw,138px)] items-center justify-center gap-3 text-[#c9903f]">
                  <span className="h-0.5 flex-1 bg-[#d7b56c]" />
                  <span className="h-3 w-3 rotate-45 border border-[#c9903f]" />
                  <span className="h-0.5 flex-1 bg-[#d7b56c]" />
                </div>

                <p className="text-[clamp(17px,1.65vw,27px)] font-semibold leading-[1.55] text-[#40515f]">
                  {card.text}
                </p>

                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[clamp(44px,5vh,84px)] opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:18px_18px]" />
              </article>
            );
          })}
        </section>

      </section>
    </main>
  );
}
