import React from "react";
import gsap from "gsap";
import { ArrowLeft, Globe2, LucideIcon } from "lucide-react";
import { detailBackIconClassName, detailBackIconSize } from "@/constants/backNavigation";

import bg from "@/assets/images/religions/r-7.webp";
import bg2 from "@/assets/images/religions/r-3.webp";
import bg3 from "@/assets/mainImages/parliment.webp";

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
      className="m-0 flex min-h-screen w-screen justify-center bg-[#faf8f5] p-0 text-[#3d2b18]"
    >
      <section
        ref={sectionRef}
        className="relative w-full overflow-x-hidden bg-[#faf8f5] px-6 pb-20 pt-10 sm:px-12 lg:px-20"
      >
        <img
          data-rd-hero="true"
          src={bg3}
          alt=""
          className="absolute inset-0 h-[60vh] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]"
        />
        <div className="absolute inset-x-0 top-0 h-[60vh] bg-gradient-to-b from-[#faf8f5]/72 via-[#faf8f5]/30 to-[#faf8f5]/95" />

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="absolute left-8 top-8 z-30 grid h-14 w-14 place-items-center rounded-full border-2 border-[#d9b477] bg-white/80 text-[#5a3a18] shadow-sm transition"
            aria-label={c.back}
          >
            <ArrowLeft size={detailBackIconSize} className={detailBackIconClassName(dir)} />
          </button>
        )}

        {onLanguageChange && (
          <button
            type="button"
            onClick={onLanguageChange}
            className="absolute right-8 top-8 z-30 flex items-center gap-3 rounded-full border border-[#d9b477] bg-white/75 px-5 py-3 font-serif text-sm font-light text-[#4b3219] shadow-[0_8px_20px_rgba(84,54,16,0.15)] transition"
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
            <h1 className="font-serif text-[44px] font-light uppercase leading-[1.06] tracking-[0.04em] text-[#3b2410] sm:text-[60px] lg:text-[68px]">
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
            className="mx-auto mt-[30vh] grid w-full max-w-[1180px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2"
          >
            {c.cards.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.id}
                  className="group relative flex flex-col overflow-x-hidden rounded-[24px] border-2 border-[#f3dfb5] bg-[#fffaf2]/95 shadow-[0_16px_32px_rgba(69,43,14,0.16)]"
                >
                  <div className="relative mx-3 mt-3 overflow-x-hidden rounded-[18px] border border-[#dcc99a]/70 bg-[#f5e8d0] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]">
                    <div className="relative h-[132px] w-full overflow-x-hidden rounded-[14px]">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${bg2})` }}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2d2114]/58 via-[#f8f0e4]/18 to-[#fff7e8]/22" />
                      <div className="absolute inset-0 flex items-end justify-between gap-4 px-5 py-4">
                        <p className="max-w-[calc(100%-72px)] rounded-[14px] border border-[#ead3a3]/80 bg-[#fff7e7]/92 px-4 py-2.5 font-serif text-[18px] font-light uppercase leading-tight tracking-[0.03em] text-[#3b2410] shadow-[0_8px_18px_rgba(69,43,14,0.18)] backdrop-blur-md sm:text-[20px]">
                          {card.eyebrow}
                        </p>
                        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#ecd8ad]/80 bg-[#fff7e7]/90 text-[#7a4a12] shadow-[0_6px_16px_rgba(69,43,14,0.18)] backdrop-blur-md">
                          <Icon className="h-6 w-6" strokeWidth={1.7} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col px-6 py-6">
                    <h3 className="font-serif text-[30px] font-light uppercase leading-tight text-[#3b2410] sm:text-[34px]">
                      {card.title}
                    </h3>
                    <div className="mb-4 mt-3 w-[72px]">
                      <span className="block h-[2px] bg-[#c3923a]" />
                    </div>
                    <p className="text-[16px] font-medium leading-relaxed text-[#4d3c2a] sm:text-[17px]">
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
            <p className="font-serif text-[17px] font-light italic leading-snug text-[#6a4a25] sm:text-[19px]">
              {c.tagline}
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 h-[180px] w-full bg-gradient-to-t from-[#b9893d]/20 to-transparent" />
      </section>
    </main>
  );
}
