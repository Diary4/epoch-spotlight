import React from "react";
import gsap from "gsap";
import { ArrowLeft, Globe2, LucideIcon } from "lucide-react";

import bg from "@/assets/images/religions/r-7.png";
import bg2 from "@/assets/images/religions/r-3.png";
import bg3 from "@/assets/mainImages/parliment.png";

type LangCode = "en" | "ku" | "ar";

export type RightsCard = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  icon: LucideIcon;
  accent: string;
};

export type RightsDetailContent = {
  back: string;
  pageTitle: string;
  pageSubtitle: string;
  cards: RightsCard[];
  tagline: string;
};

type RightsDetailPageProps = {
  lang?: LangCode;
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
  content: Record<LangCode, RightsDetailContent>;
  heroImage?: string;
};

function DecorativeLine({ color = "#c99a55" }: { color?: string }) {
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

export default function RightsDetailPage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
  content,
  heroImage = bg,
}: RightsDetailPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const c = content[lang];
  const dir = lang === "en" ? "ltr" : "rtl";

  React.useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set("[data-rd-hero='true']", { autoAlpha: 0, scale: 1.04 });
      gsap.set("[data-rd-animate='true']", { autoAlpha: 0, y: 24 });
      const tl = gsap.timeline();
      tl.to("[data-rd-hero='true']", {
        autoAlpha: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      }).to(
        "[data-rd-animate='true']",
        { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.06, ease: "power2.out" },
        "-=0.2",
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [lang]);

  return (
    <main
      dir={dir}
      className="m-0 flex min-h-screen w-screen justify-center bg-[#f8f1e7] p-0 text-[#3d2b18]"
    >
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden bg-[#fbf1df] px-6 pb-20 pt-10 sm:px-12 lg:px-20"
      >
        <img
          data-rd-hero="true"
          src={bg3}
          alt=""
          className="absolute inset-0 h-[60vh] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]"
        />
        <div className="absolute inset-x-0 top-0 h-[60vh] bg-gradient-to-b from-[#fbf1df]/72 via-[#fbf1df]/30 to-[#f4dfbb]/95" />
        <div className="pointer-events-none absolute inset-5 rounded-[30px] border-2 border-[#d2a35a]/45" />

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="absolute left-8 top-8 z-30 grid h-14 w-14 place-items-center rounded-full border-2 border-[#d9b477] bg-white/80 text-[#5a3a18] shadow-sm transition hover:bg-white"
            aria-label={c.back}
          >
            <ArrowLeft className="h-7 w-7" />
          </button>
        )}

        {onLanguageChange && (
          <button
            type="button"
            onClick={onLanguageChange}
            className="absolute right-8 top-8 z-30 flex items-center gap-3 rounded-full border border-[#d9b477] bg-white/75 px-5 py-3 font-serif text-sm font-semibold text-[#4b3219] shadow-[0_8px_20px_rgba(84,54,16,0.15)] transition hover:bg-white"
          >
            <Globe2 className="h-5 w-5" />
            {languageLabel}
          </button>
        )}

        <div className="relative z-10 mx-auto flex w-full max-w-[1180px] flex-col">
          <header
            data-rd-animate="true"
            className="mx-auto max-w-[900px] pt-28 text-center sm:pt-32"
          >
            <div className="mx-auto mb-3 w-[260px]">
              <DecorativeLine color="#c3923a" />
            </div>
            <h1 className="font-serif text-[44px] font-semibold uppercase leading-[1.06] tracking-[0.04em] text-[#3b2410] sm:text-[60px] lg:text-[68px]">
              {c.pageTitle}
            </h1>
            <div className="mx-auto mt-5 w-[180px]">
              <DecorativeLine color="#c3923a" />
            </div>
            <p className="mx-auto mt-5 max-w-[720px] font-serif text-[18px] italic leading-relaxed text-[#6a4a25] sm:text-[22px]">
              {c.pageSubtitle}
            </p>
          </header>

          <div
            data-rd-animate="true"
            className="mx-auto mt-[40vh] grid w-full max-w-[1180px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2"
          >
            {c.cards.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.id}
                  className="group relative flex flex-col overflow-hidden rounded-[24px] border-2 border-[#f3dfb5] bg-white/92 shadow-[0_16px_32px_rgba(69,43,14,0.16)] transition hover:-translate-y-1 hover:shadow-[0_22px_42px_rgba(69,43,14,0.24)]"
                >
                  <div
                    className="relative h-[110px] w-full"
                    style={{
                      background: `linear-gradient(135deg, ${card.accent} 0%, ${card.accent}cc 100%)`,
                    }}
                  >
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.18]"
                      style={{
                        backgroundImage: `url(${bg2})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        mixBlendMode: "overlay",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-between px-6">
                      <p className="font-serif text-xs font-semibold uppercase tracking-[0.28em] text-white/85">
                        {card.eyebrow}
                      </p>
                      <div className="grid h-12 w-12 place-items-center rounded-full border-2 border-white/40 bg-white/15 backdrop-blur-sm">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col px-6 py-6">
                    <h3 className="font-serif text-[20px] font-semibold uppercase leading-tight text-[#3b2410] sm:text-[22px]">
                      {card.title}
                    </h3>
                    <div className="mb-4 mt-3 w-[60px]">
                      <span
                        className="block h-[2px]"
                        style={{ backgroundColor: card.accent }}
                      />
                    </div>
                    <p className="text-[15px] font-medium leading-relaxed text-[#4d3c2a]">
                      {card.body}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          <div
            data-rd-animate="true"
            className="mx-auto mt-12 max-w-[860px] rounded-[20px] border-2 border-[#c99745]/55 bg-[#fff7e7]/95 px-7 py-5 text-center shadow-[0_12px_26px_rgba(75,45,12,0.14)]"
          >
            <p className="font-serif text-[17px] font-semibold italic leading-snug text-[#6a4a25] sm:text-[19px]">
              {c.tagline}
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 h-[180px] w-full bg-gradient-to-t from-[#b9893d]/20 to-transparent" />
      </section>
    </main>
  );
}
