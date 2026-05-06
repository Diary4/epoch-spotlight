import React from "react";
import gsap from "gsap";
import {
  ChevronRight,
  DoorOpen,
  Globe2,
  Handshake,
  ShieldCheck,
  Sunrise,
  UsersRound,
} from "lucide-react";

import bg from "@/assets/mainImages/diversity/shared-homeland-bg.jpg";

const values = [
  {
    title: "Respect",
    text: "We honor every belief, every identity, and every voice.",
    icon: Handshake,
  },
  {
    title: "Protection",
    text: "We stand together to protect rights, preserve heritage, and uphold human dignity.",
    icon: ShieldCheck,
  },
  {
    title: "Belonging",
    text: "Everyone has a place here. Everyone belongs. This is our shared home.",
    icon: UsersRound,
  },
  {
    title: "Hope",
    text: "We build a future of peace, opportunity, and possibilities for generations to come.",
    icon: Sunrise,
  },
];

function DecorativeLine({ color = "#c99a55" }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <span className="h-px flex-1" style={{ backgroundColor: color }} />
      <span className="text-2xl" style={{ color }}>
        ✥
      </span>
      <span className="h-px flex-1" style={{ backgroundColor: color }} />
    </div>
  );
}

export default function OneSharedHomelandPage() {
  const sectionRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-homeland-animate='true']", {
        autoAlpha: 0,
        y: 24,
      });

      gsap.to("[data-homeland-animate='true']", {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.07,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="m-0 flex min-h-screen w-screen justify-center bg-[#f8f1e7] p-0 text-[#3d2b18]">
      <section
        ref={sectionRef}
        className="relative min-h-screen w-full overflow-hidden bg-[#fbf1df] px-7 py-9 sm:px-10 lg:px-16"
      >
        <img
          src={bg}
          alt=""
          className="absolute left-0 top-[230px] h-[520px] w-full object-cover object-center opacity-90"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#fbf1df] via-[#fbf1df]/45 to-[#fbf1df]" />
        <div className="absolute left-0 top-[650px] h-[170px] w-full bg-gradient-to-b from-transparent to-[#fbf1df]" />
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(#d7b56c_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="pointer-events-none absolute inset-4 rounded-[30px] border-2 border-[#d2a35a]/40" />

        <button className="absolute right-8 top-8 z-30 flex items-center gap-3 rounded-full border border-[#d9b477] bg-white/75 px-5 py-3 font-serif text-sm font-semibold text-[#4b3219] shadow-[0_8px_20px_rgba(84,54,16,0.15)]">
          <Globe2 className="h-5 w-5" />
          ENGLISH
        </button>

        <div className="relative z-10 mx-auto max-w-[920px]">
          <header
            data-homeland-animate="true"
            className="mx-auto max-w-[820px] pt-12 text-center"
          >
            <div className="mx-auto mb-4 w-[430px] max-w-full">
              <DecorativeLine color="#c3923a" />
            </div>

            <h1 className="font-serif text-[58px] font-semibold uppercase leading-[1.06] tracking-[0.08em] text-[#2f1f12] sm:text-[78px] lg:text-[92px]">
              One Shared
              <br />
              Homeland
            </h1>

            <p className="mt-5 font-serif text-[26px] font-semibold text-[#a46f22] sm:text-[33px]">
              Diversity, dignity, and a future together.
            </p>

            <div className="mx-auto mt-7 w-[190px]">
              <DecorativeLine color="#c3923a" />
            </div>

            <p className="mx-auto mt-6 max-w-[650px] text-[21px] font-semibold leading-relaxed text-[#3f3528] sm:text-[25px]">
              Kurdistan is not defined by one faith, one language, or one story.
              It is strengthened by all of them.
              <br />
              Our diversity is our heritage.
              <br />
              Our unity is our future.
            </p>
          </header>

          <div className="h-[430px]" />

          <section
            data-homeland-animate="true"
            className="mx-auto grid max-w-[760px] grid-cols-1 gap-6 sm:grid-cols-2"
          >
            {values.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="flex min-h-[285px] flex-col items-center justify-center rounded-[24px] border-2 border-[#d8b875]/60 bg-[#fff8e9]/92 px-7 py-7 text-center shadow-[0_12px_24px_rgba(75,45,12,0.13)] backdrop-blur-sm"
                >
                  <div className="mb-5 grid h-24 w-24 place-items-center rounded-full border border-[#d6b06b] bg-[#fff4dc]/70 text-[#c58b16]">
                    <Icon className="h-14 w-14" strokeWidth={1.6} />
                  </div>

                  <h3 className="font-serif text-[29px] font-semibold uppercase leading-tight text-[#3b2410]">
                    {item.title}
                  </h3>

                  <div className="my-4 w-[150px]">
                    <DecorativeLine color="#d1a14f" />
                  </div>

                  <p className="max-w-[230px] text-[17px] font-semibold leading-relaxed text-[#4d3c2a]">
                    {item.text}
                  </p>

                  <div className="mt-5 flex items-center gap-4 text-[#c58b16]">
                    <span className="h-px w-16 bg-[#d1a14f]" />
                    <span className="font-serif text-4xl leading-none">“</span>
                    <span className="h-px w-16 bg-[#d1a14f]" />
                  </div>
                </article>
              );
            })}
          </section>

          <section
            data-homeland-animate="true"
            className="mx-auto mt-8 max-w-[680px] text-center"
          >
            <p className="font-serif text-[29px] leading-tight text-[#3b2410] sm:text-[36px]">
              Different faiths. Different languages.
              <br />
              <span className="text-[44px] font-semibold sm:text-[58px]">
                One shared homeland.
              </span>
            </p>
          </section>

          <div className="mx-auto mt-5 w-[520px] max-w-full">
            <DecorativeLine color="#c3923a" />
          </div>

          <section
            data-homeland-animate="true"
            className="mx-auto mt-5 flex max-w-[720px] items-center gap-7 rounded-[26px] border-2 border-[#c99745]/45 bg-[#fff7e7]/95 px-8 py-5 shadow-[0_12px_28px_rgba(75,45,12,0.16)]"
          >
            <div className="grid h-16 w-16 shrink-0 place-items-center text-[#c58b16]">
              <DoorOpen className="h-14 w-14" strokeWidth={1.7} />
            </div>

            <p className="flex-1 font-serif text-[22px] font-semibold uppercase leading-tight text-[#3b2410]">
              Thank You For Your Visit
              <br />
              <span className="text-[16px] normal-case font-semibold text-[#6a4a25]">
                Leave with understanding.
                <br />
                Return with pride.
              </span>
            </p>

            <button className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-[#d6b06b] bg-[#fff4dc] text-[#a8751f]">
              <ChevronRight className="h-9 w-9" />
              <span className="mt-1 font-serif text-[11px] font-semibold uppercase">
                Exit
              </span>
            </button>
          </section>

          <div className="mx-auto mt-5 flex justify-center text-[#c58b16]">
            ✥
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 right-0 h-52 w-52 rounded-tl-full border-l-2 border-t-2 border-[#d2a35a]/30 opacity-70" />
      </section>
    </main>
  );
}