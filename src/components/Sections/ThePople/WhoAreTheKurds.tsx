import React, { useLayoutEffect, useRef } from "react";
import { ArrowLeft, KeyRound, Sparkles, TreePine } from "lucide-react";
import { gsap } from "gsap";
import bgImage from "@/assets/images/kurdistan.jpg";


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

type WhoAreTheKurdsSectionProps = {
  onBack?: () => void;
};

export default function WhoAreTheKurdsSection({ onBack }: WhoAreTheKurdsSectionProps) {
  const rootRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".back-btn", {
        opacity: 0,
        scale: 0.7,
        duration: 1,
      })
        .from(".pattern-layer", {
          opacity: 0,
          duration: 1.2,
        }, "-=0.7")
        .from(".hero-image", {
          opacity: 0,
          scale: 1.12,
          x: 80,
          duration: 2.2,
        }, "-=0.9")
        .from(".section-label > *", {
          opacity: 0,
          y: 20,
          stagger: 0.18,
          duration: 0.9,
        }, "-=1.2")
        .from(".main-title", {
          opacity: 0,
          y: 70,
          duration: 1.4,
        }, "-=0.5")
        .from(".title-divider > *", {
          opacity: 0,
          scaleX: 0,
          stagger: 0.2,
          duration: 0.8,
        }, "-=0.7")
        .from(".subtitle-text", {
          opacity: 0,
          y: 45,
          duration: 1.1,
        }, "-=0.4")
        .from(".description-text", {
          opacity: 0,
          y: 35,
          duration: 1,
        }, "-=0.5")
        .from(".info-card", {
          opacity: 0,
          y: 80,
          scale: 0.94,
          stagger: 0.22,
          duration: 1.1,
        }, "-=0.2");

      gsap.to(".floating-ring", {
        y: -28,
        rotate: 8,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.8,
      });

    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={rootRef} className="m-0 min-h-[100vh] w-[100vw] max-w-none bg-[#fbf3e8] px-[clamp(12px,1.8vw,28px)] py-[clamp(10px,1.6vh,24px)] text-[#00604f]">
      <section className="relative mx-auto flex min-h-[calc(100vh-2*clamp(10px,1.6vh,24px))] w-[min(100vw,1400px)] max-w-none flex-col overflow-hidden rounded-[clamp(22px,2.4vw,34px)] bg-[#fff7ec] px-[clamp(20px,3.1vw,52px)] py-[clamp(20px,2.7vh,40px)]">
        <button
          type="button"
          onClick={onBack}
          className="back-btn absolute left-[clamp(16px,2vw,30px)] top-[clamp(16px,2vh,30px)] z-30 grid h-[clamp(50px,4.8vw,64px)] w-[clamp(50px,4.8vw,64px)] place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#00604f] shadow-sm"
          aria-label="Back to The People"
        >
          <ArrowLeft size={30} />
        </button>
        <div className="pattern-layer pointer-events-none absolute inset-0 opacity-18 [background-image:radial-gradient(#d8b875_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="pattern-layer pointer-events-none absolute left-0 top-0 h-full w-28 opacity-20 [background-image:linear-gradient(45deg,#d5b372_1px,transparent_1px),linear-gradient(-45deg,#d5b372_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Replace this image later with your own generated background */}
        <div className="hero-image pointer-events-none absolute right-0 top-[clamp(150px,12vh,220px)] h-[clamp(860px,72vh,1220px)] w-[clamp(520px,52vw,860px)]">
          <img
            src={bgImage}
            alt="Kurdistan mountains placeholder"
            className="absolute inset-0 h-full w-full object-cover opacity-70 [mask-image:radial-gradient(circle_at_62%_44%,black_0%,black_45%,transparent_78%)]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fff7ec] via-[#fff7ec]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fff7ec]" />
        </div>

        <div className="floating-ring pointer-events-none absolute right-0 top-[clamp(310px,27vh,430px)] h-[clamp(560px,46vh,820px)] w-[clamp(400px,34vw,620px)] rounded-full border border-[#d7b56c]/35 opacity-60" />
        <div className="floating-ring pointer-events-none absolute right-[-50px] top-[clamp(380px,32vh,500px)] h-[clamp(500px,42vh,760px)] w-[clamp(500px,42vw,760px)] rounded-full border border-[#d7b56c]/25 opacity-60" />

        {/* Content */}
        <section className="relative z-10 mt-[clamp(68px,9vh,130px)] max-w-[min(58vw,760px)]">
          <div className="section-label mb-[clamp(30px,4vh,60px)] flex items-center gap-[clamp(14px,1.4vw,24px)] text-[#c9903f]">
            <span className="h-0.5 w-[clamp(52px,5vw,90px)] bg-[#c9903f]" />
            <span className="h-[clamp(16px,1.6vw,24px)] w-[clamp(32px,3.1vw,54px)] rounded-full border-2 border-[#c9903f]" />
            <h2 className="font-serif text-[clamp(24px,2.45vw,38px)] font-bold uppercase tracking-[0.05em]">The People</h2>
          </div>

          <h1 className="main-title font-serif text-[clamp(66px,8.4vw,120px)] font-semibold leading-[1.02] tracking-tight text-[#00604f]">
            Who Are<br />the Kurds?
          </h1>

          <div className="title-divider mt-[clamp(30px,4vh,52px)] flex items-center gap-[clamp(14px,1.5vw,22px)] text-[#c9903f]">
            <span className="h-0.5 w-[clamp(130px,13vw,220px)] bg-[#c9903f]" />
            <Sparkles size={32} />
            <span className="h-0.5 w-[clamp(90px,9vw,160px)] bg-[#c9903f]" />
          </div>

          <p className="subtitle-text mt-[clamp(28px,3.8vh,50px)] font-serif text-[clamp(33px,3.9vw,58px)] leading-tight text-[#00604f]">
            An ancient people of<br />the Middle East.
          </p>

          <p className="description-text mt-[clamp(24px,3.2vh,42px)] max-w-[min(46vw,600px)] text-[clamp(22px,2.55vw,34px)] font-semibold leading-[1.45] text-[#31445d]">
            The Kurds have lived in these mountains and plains for thousands of years, shaping the region with their strength, spirit, and culture.
          </p>
        </section>

        {/* Cards */}
        <section className="relative z-20 mt-[clamp(26px,5.5vh,84px)] grid grid-cols-3 gap-[clamp(16px,1.7vw,34px)] pb-[clamp(6px,1vh,20px)] pt-[clamp(24px,3.2vh,52px)]">
          {infoCards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="info-card flex min-h-[clamp(360px,32vh,540px)] flex-col items-center rounded-[clamp(22px,2.3vw,34px)] border-2 border-white bg-white/78 px-[clamp(18px,1.8vw,34px)] py-[clamp(20px,2.2vh,36px)] text-center shadow-[0_14px_35px_rgba(84,54,16,0.16)] backdrop-blur-md"
              >
                <div className={`grid h-[clamp(78px,7.2vw,120px)] w-[clamp(78px,7.2vw,120px)] place-items-center rounded-full ${card.color} text-[#f8dfae] shadow-[0_8px_22px_rgba(84,54,16,0.2)]`}>
                  <Icon size={56} strokeWidth={1.45} />
                </div>

                <div className="my-[clamp(16px,1.8vh,28px)] flex w-[clamp(82px,8vw,130px)] items-center justify-center gap-3 text-[#c9903f]">
                  <span className="h-0.5 flex-1 bg-[#d7b56c]" />
                  <span className="h-3 w-3 rotate-45 border border-[#c9903f]" />
                  <span className="h-0.5 flex-1 bg-[#d7b56c]" />
                </div>

                <h3 className="font-serif text-[clamp(24px,2.35vw,36px)] font-semibold leading-tight text-[#00604f]">
                  {card.title}
                </h3>

                <p className="mt-[clamp(14px,1.8vh,26px)] flex-1 text-[clamp(18px,1.8vw,28px)] font-semibold leading-[1.55] text-[#31445d]">
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
