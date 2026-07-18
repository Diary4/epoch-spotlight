import React from "react";
import gsap from "gsap";
import { ArrowLeft, Globe2, type LucideIcon } from "lucide-react";
import {
  detailBackIconClassName,
  detailBackIconSize,
  religionsOverlayEndClassName,
  religionsOverlayStartClassName,
} from "@/constants/backNavigation";

import ReligionsScaledPage from "@/components/Sections/religions/ReligionsScaledPage";

import bg from "@/assets/images/religions/r-7.webp";
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


function RightsChapter({ card }: { card: RightsCard }) {
  return (
    <article
      data-rd-animate="true"
      className="relative overflow-hidden rounded-[28px] bg-[#e6d2a8] p-px shadow-[0_12px_28px_rgba(75,45,12,0.1)]"
    >
      <div className="rounded-[27px] bg-[#fffaf0] px-8 py-8 text-start">
        <p
          className="font-serif text-[13px] font-semibold uppercase tracking-[0.16em]"
          style={{ color: card.accent }}
        >
          {card.eyebrow}
        </p>
        <h2 className="mt-2 font-serif text-[28px] font-semibold uppercase leading-tight tracking-[0.03em] text-[#2f1f12]">
          {card.title}
        </h2>
        <div
          className="mt-3 h-[2px] w-12 rounded-full"
          style={{ backgroundColor: card.accent }}
        />
        <p className="mt-4 text-[17px] font-medium leading-[1.7] text-[#4d3c2a]">
          {card.body}
        </p>
      </div>
    </article>
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
  const cover = heroImage || bg3;

  React.useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      gsap.set("[data-rd-hero='true']", { autoAlpha: 0 });
      gsap.set("[data-rd-animate='true']", { autoAlpha: 0, y: 24 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to("[data-rd-hero='true']", {
        autoAlpha: 1,
        duration: 1.0,
      }).to(
        "[data-rd-animate='true']",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.08,
        },
        "-=0.5",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <ReligionsScaledPage
      dir={dir}
      lang={lang}
      fitDeps={[lang]}
      sectionRef={sectionRef}
      className="min-h-full px-12 pb-14"
    >
      <img
        data-rd-hero="true"
        src={cover}
        alt=""
        className="pointer-events-none absolute inset-x-0 top-[200px] z-0 h-[720px] w-full object-cover object-center [mask-image:linear-gradient(to_bottom,transparent_0%,black_14%,black_86%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_14%,black_86%,transparent_100%)]"
      />
      <div className="pointer-events-none absolute inset-x-0 top-[200px] z-[1] h-[720px] bg-[linear-gradient(to_bottom,#faf8f5_0%,transparent_16%,transparent_84%,#faf8f5_100%)]" />

      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className={`absolute top-1/2 z-30 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full border-2 border-[#d9b477] bg-white/80 text-[#5a3a18] shadow-sm ${religionsOverlayStartClassName(dir)}`}
          aria-label={c.back}
        >
          <ArrowLeft size={detailBackIconSize} className={detailBackIconClassName(dir)} />
        </button>
      )}

      {onLanguageChange && (
        <button
          type="button"
          onClick={onLanguageChange}
          className={`absolute top-8 z-30 flex items-center gap-3 rounded-full border border-[#d9b477] bg-white/75 px-5 py-3 font-serif text-sm font-semibold text-[#4b3219] shadow-[0_8px_20px_rgba(84,54,16,0.15)] ${religionsOverlayEndClassName(dir)}`}
        >
          <Globe2 className="h-5 w-5" />
          {languageLabel}
        </button>
      )}

      <div className="relative z-10 mx-auto flex min-h-full w-full max-w-[1080px] flex-col">
        <header data-rd-animate="true" className="mx-auto max-w-[900px] shrink-0 pt-10 text-center">
          <div className="mx-auto mb-2 w-[220px]">
            <DecorativeLine color="#c3923a" />
          </div>
          <h1 className="font-serif text-[52px] font-semibold uppercase leading-[1.06] tracking-[0.04em] text-[#3b2410]">
            {c.pageTitle}
          </h1>
          <div className="mx-auto mt-4 w-[160px]">
            <DecorativeLine color="#c3923a" />
          </div>
          <p className="mx-auto mt-4 max-w-[680px] font-serif text-[22px] italic leading-relaxed text-[#6a4a25]">
            {c.pageSubtitle}
          </p>
        </header>

        <section className="mt-[780px] flex flex-col gap-5 pb-4">
          {c.cards.map((card) => (
            <RightsChapter key={card.id} card={card} />
          ))}

          <div
            data-rd-animate="true"
            className="mx-auto mt-4 w-full max-w-[920px] rounded-[28px] border-2 border-[#c99745]/55 bg-[#fff7e7]/95 px-8 py-6 text-center shadow-[0_12px_26px_rgba(75,45,12,0.14)]"
          >
            <p className="font-serif text-[22px] font-semibold italic leading-snug text-[#6a4a25]">
              {c.tagline}
            </p>
          </div>
        </section>
      </div>
    </ReligionsScaledPage>
  );
}
