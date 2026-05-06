import React from "react";
import gsap from "gsap";
import {
  ChevronRight,
  Globe2,
  Sparkles,
  Sun,
  Waves,
  UsersRound,
} from "lucide-react";

import yarsanism from "@/assets/mainImages/diversity/yarsanism.jpg";
import zoroastrianism from "@/assets/mainImages/diversity/zoroastrianism.jpg";
import judaism from "@/assets/mainImages/diversity/judaism.jpg";
import bahai from "@/assets/mainImages/diversity/bahai.jpg";
import mandaean from "@/assets/mainImages/diversity/mandaean.jpg";

const faiths = [
  {
    title: "Yarsanism",
    text: "An ancient Kurdish faith rooted in spiritual enlightenment and devotion to the Divine. Yarsanis value inner purity, truth, and respect for all living beings.",
    image: yarsanism,
    icon: Sparkles,
    label: "Kakai Shrines – Hawar Village",
  },
  {
    title: "Zoroastrianism",
    text: "One of the world’s oldest monotheistic faiths, brought to the region through ancient migrations. It teaches the eternal struggle between good and evil and the pursuit of truth and virtue.",
    image: zoroastrianism,
    icon: Sun,
    label: "Zoroastrian Temple – Darbandikhan",
  },
  {
    title: "Judaism",
    text: "An ancient presence in Kurdistan, dating back thousands of years. Kurdish Jews have played a vital role in the cultural, economic, and social life of the region.",
    image: judaism,
    icon: Sparkles,
    label: "Shrine of the Prophet Nahum – Aqosh",
  },
  {
    title: "Baha’i Faith",
    text: "A modern faith that teaches the unity of God, the oneness of humanity, and the harmony of religion, science, and reason. Its message resonates deeply in a diverse world.",
    image: bahai,
    icon: Sparkles,
    label: "",
  },
  {
    title: "Sabean-Mandaeanism",
    text: "An ancient Gnostic faith centered around John the Baptist as a prophet. It honors baptism, purity, and the light of knowledge.",
    image: mandaean,
    icon: Waves,
    label: "",
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

export default function OtherFaithTraditionsPage() {
  const sectionRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-faith-animate='true']", {
        autoAlpha: 0,
        y: 22,
      });

      gsap.to("[data-faith-animate='true']", {
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#fff7e8_0%,#fbf1df_48%,#f3dfbd_100%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(#d7b56c_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="pointer-events-none absolute inset-4 rounded-[30px] border-2 border-[#d2a35a]/40" />

        <button className="absolute right-8 top-8 z-30 flex items-center gap-3 rounded-full border border-[#d9b477] bg-white/75 px-5 py-3 font-serif text-sm font-semibold text-[#4b3219] shadow-[0_8px_20px_rgba(84,54,16,0.15)]">
          <Globe2 className="h-5 w-5" />
          ENGLISH
        </button>

        <div className="relative z-10 mx-auto max-w-[1060px]">
          <header
            data-faith-animate="true"
            className="mx-auto max-w-[880px] pt-12 text-center"
          >
            <div className="mx-auto mb-4 w-[440px] max-w-full">
              <DecorativeLine color="#c3923a" />
            </div>

            <h1 className="font-serif text-[56px] font-semibold uppercase leading-[1.03] tracking-[0.07em] text-[#2f1f12] sm:text-[76px] lg:text-[88px]">
              Other Faith
              <br />
              Traditions
            </h1>

            <p className="mt-4 font-serif text-[22px] font-semibold uppercase leading-snug tracking-[0.06em] text-[#a46f22] sm:text-[28px]">
              Yarsanism, Zoroastrianism, Judaism,
              <br />
              Baha’i Faith, and Sabean-Mandaeanism
            </p>

            <div className="mx-auto mt-6 w-[190px]">
              <DecorativeLine color="#c3923a" />
            </div>

            <p className="mx-auto mt-5 max-w-[690px] text-[19px] font-semibold leading-relaxed text-[#4d3c2a] sm:text-[23px]">
              Kurdistan is a land of spiritual depth and cultural harmony,
              where diverse faiths have lived, prayed, and contributed to a
              shared legacy of peace and respect.
            </p>
          </header>

          <section
            data-faith-animate="true"
            className="mt-9 space-y-5"
          >
            {faiths.map((faith) => {
              const Icon = faith.icon;

              return (
                <article
                  key={faith.title}
                  className="relative grid min-h-[210px] overflow-hidden rounded-[20px] border-2 border-[#d8b875]/55 bg-[#fff8e9]/92 shadow-[0_10px_22px_rgba(75,45,12,0.12)] backdrop-blur-sm lg:grid-cols-[420px_1fr]"
                >
                  <div className="relative z-10 flex gap-6 px-7 py-6">
                    <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full border border-[#d6b06b] bg-[#fff4dc]/70 text-[#c58b16]">
                      <Icon className="h-12 w-12" strokeWidth={1.45} />
                    </div>

                    <div>
                      <h3 className="font-serif text-[33px] font-semibold uppercase leading-tight text-[#3b2410]">
                        {faith.title}
                      </h3>

                      <div className="my-3 w-[160px]">
                        <DecorativeLine color="#d1a14f" />
                      </div>

                      <p className="text-[17px] font-semibold leading-relaxed text-[#4d3c2a]">
                        {faith.text}
                      </p>
                    </div>
                  </div>

                  <div className="relative min-h-[210px]">
                    <img
                      src={faith.image}
                      alt={faith.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />

                    <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#fff8e9] to-transparent" />

                    {faith.label && (
                      <span className="absolute bottom-3 right-3 rounded-full bg-black/45 px-4 py-1.5 font-serif text-[14px] italic text-white backdrop-blur-sm">
                        {faith.label}
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </section>

          <section
            data-faith-animate="true"
            className="mx-auto mt-7 flex max-w-[760px] items-center gap-7 rounded-[26px] border-2 border-[#c99745]/45 bg-[#fff7e7]/95 px-8 py-5 shadow-[0_12px_28px_rgba(75,45,12,0.16)]"
          >
            <div className="grid h-16 w-16 shrink-0 place-items-center text-[#c58b16]">
              <UsersRound className="h-12 w-12" strokeWidth={1.8} />
            </div>

            <p className="flex-1 font-serif text-[27px] font-semibold uppercase leading-tight text-[#3b2410]">
              Diversity Is Our Strength
              <br />
              <span className="text-[18px] normal-case font-semibold text-[#6a4a25]">
                Different paths, one shared home.
              </span>
            </p>

            <button className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-[#d6b06b] bg-[#fff4dc] text-[#a8751f]">
              <ChevronRight className="h-9 w-9" />
            </button>
          </section>

          <Sparkles className="mx-auto mt-5 h-12 w-12 text-[#c58b16]" />
        </div>

        <div className="pointer-events-none absolute bottom-0 right-0 h-52 w-52 rounded-tl-full border-l-2 border-t-2 border-[#d2a35a]/30 opacity-70" />
      </section>
    </main>
  );
}