import React from "react";
import gsap from "gsap";
import { ArrowLeft, Globe2 } from "lucide-react";
import { detailBackIconClassName, detailBackIconSize } from "@/constants/backNavigation";

import ReligionInfoCard from "@/components/Sections/religions/ReligionInfoCard";

import bg from "@/assets/images/religions/nations.webp";
import nationKurds from "@/assets/images/new/religions/nations/kurd.webp";
import nationTurkmens from "@/assets/images/new/religions/nations/turkmen.webp";
import nationChaldo from "@/assets/images/new/religions/nations/assyrian.webp";
import nationArmenians from "@/assets/images/new/religions/nations/armenian.webp";

// Per-nation detail pages — wire up each nation to its own file in nations/.
import KurdsPage from "@/components/Sections/religions/nations/Kurds";
import TurkmensPage from "@/components/Sections/religions/nations/Turkmens";
import ChaldoAssyriansPage from "@/components/Sections/religions/nations/ChaldoAssyrians";
import ArmeniansPage from "@/components/Sections/religions/nations/Armenians";

type LangCode = "en" | "ku" | "ar";

type NationId = "kurds" | "turkmens" | "chaldo-assyrians" | "armenians";

type NationCard = {
  id: NationId;
  title: string;
  shortIntro: string;
  image: string;
};

type NationsContent = {
  back: string;
  pageTitle: string;
  pageDescription: string;
  openLabel: string;
  nations: NationCard[];
};

const content: Record<LangCode, NationsContent> = {
  en: {
    back: "Back",
    pageTitle: "Nations",
    pageDescription:
      "The peoples who share Kurdistan — their language, heritage, and place in public life.",
    openLabel: "Open",
    nations: [
      {
        id: "kurds",
        title: "Kurds",
        shortIntro: "A rooted people of language, dance, and mountains.",
        image: nationKurds,
      },
      {
        id: "turkmens",
        title: "Turkmens",
        shortIntro: "An ancient community woven into Kurdistan's life.",
        image: nationTurkmens,
      },
      {
        id: "chaldo-assyrians",
        title: "Chaldo-Assyrians",
        shortIntro: "Custodians of one of the oldest Christian heritages.",
        image: nationChaldo,
      },
      {
        id: "armenians",
        title: "Armenians",
        shortIntro: "A diaspora community with deep ties to the land.",
        image: nationArmenians,
      },
    ],
  },
  ku: {
    back: "گەڕانەوە",
    pageTitle: "نەتەوەکان",
    pageDescription:
      "ئەو گەلانەی کوردستان هاوبەشن — زمان، میرات، و جێگەیان لە ژیانی گشتی.",
    openLabel: "بکەرەوە",
    nations: [
      {
        id: "kurds",
        title: "کورد",
        shortIntro: "گەلێکی ڕەگدار بە زمان، سەماو چیا.",
        image: nationKurds,
      },
      {
        id: "turkmens",
        title: "تورکمان",
        shortIntro: "کۆمەڵگەیەکی کۆن چەسپاو بە ژیانی کوردستان.",
        image: nationTurkmens,
      },
      {
        id: "chaldo-assyrians",
        title: "کلدۆ-ئاشووری",
        shortIntro: "پارێزەرانی یەکێک لە کۆنترین میراتە مەسیحییەکان.",
        image: nationChaldo,
      },
      {
        id: "armenians",
        title: "ئەرمەن",
        shortIntro: "کۆمەڵگەیەکی دیاسپۆرا بە پەیوەندیی قووڵ بەو خاکە.",
        image: nationArmenians,
      },
    ],
  },
  ar: {
    back: "العودة",
    pageTitle: "القوميات",
    pageDescription:
      "الشعوب التي تتقاسم كوردستان — لغتها وتراثها ومكانتها في الحياة العامة.",
    openLabel: "اعرض",
    nations: [
      {
        id: "kurds",
        title: "الكورد",
        shortIntro: "شعب متجذر باللغة والرقص والجبال.",
        image: nationKurds,
      },
      {
        id: "turkmens",
        title: "التركمان",
        shortIntro: "مجتمع عريق منسوج في حياة كوردستان.",
        image: nationTurkmens,
      },
      {
        id: "chaldo-assyrians",
        title: "الكلدو-آشوريون",
        shortIntro: "حُماة أحد أقدم التراثات المسيحية.",
        image: nationChaldo,
      },
      {
        id: "armenians",
        title: "الأرمن",
        shortIntro: "مجتمع مهجري بروابط عميقة مع الأرض.",
        image: nationArmenians,
      },
    ],
  },
};

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

type NationsPageProps = {
  lang?: LangCode;
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function NationsPage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: NationsPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const [activeId, setActiveId] = React.useState<NationId | null>(null);
  const c = content[lang];
  const dir = lang === "en" ? "ltr" : "rtl";

  React.useLayoutEffect(() => {
    if (!sectionRef.current || activeId) return;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      const hero = "[data-n-hero='true']";
      const animElements = "[data-n-animate='true']";
      const cards = "[data-n-card='true']";

      gsap.set(hero, { autoAlpha: 0, scale: 1.04 });
      gsap.set(animElements, { autoAlpha: 0, y: 24 });
      gsap.set(cards, { autoAlpha: 0, y: 35 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.to(hero, {
        autoAlpha: 1,
        scale: 1,
        duration: 1.0,
        ease: "power2.out",
      })
        .to(
          animElements,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.08,
          },
          "-=0.5",
        )
        .to(
          cards,
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.8,
          },
          "-=0.4",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [lang, activeId]);

  // ---------------------------------------------------------------------------
  // Per-nation detail routing.
  // Wired up: Kurds (existing file in nations/). Add a branch for each new
  // per-nation page you create — uncomment the matching import at the top of
  // this file before enabling it.
  // ---------------------------------------------------------------------------

  if (activeId === "kurds") {
    return (
      <KurdsPage
        lang={lang}
        languageLabel={languageLabel}
        onLanguageChange={onLanguageChange}
        onBack={() => setActiveId(null)}
      />
    );
  }

  if (activeId === "turkmens") {
    return (
      <TurkmensPage
        lang={lang}
        languageLabel={languageLabel}
        onLanguageChange={onLanguageChange}
        onBack={() => setActiveId(null)}
      />
    );
  }

  if (activeId === "chaldo-assyrians") {
    return (
      <ChaldoAssyriansPage
        lang={lang}
        languageLabel={languageLabel}
        onLanguageChange={onLanguageChange}
        onBack={() => setActiveId(null)}
      />
    );
  }

  if (activeId === "armenians") {
    return (
      <ArmeniansPage
        lang={lang}
        languageLabel={languageLabel}
        onLanguageChange={onLanguageChange}
        onBack={() => setActiveId(null)}
      />
    );
  }

  return (
    <main
      dir={dir}
      className="m-0 flex min-h-screen w-full max-w-full justify-center overflow-x-hidden bg-[#faf8f5] p-0 text-[#3d2b18]"
    >
      <section
        ref={sectionRef}
        className="relative w-full overflow-x-hidden bg-[#faf8f5] px-0 pb-16 pt-0 sm:px-12 sm:pb-20 sm:pt-10 lg:px-20"
      >
        {/* Cinematic Absolute hero background overlay (Unifies mobile and desktop visually) */}
        <img
          data-n-hero="true"
          src={bg}
          alt=""
          className="pointer-events-none absolute inset-x-0 top-0 h-[45vh] w-full object-cover object-center [mask-image:linear-gradient(to_bottom,black_0%,black_72%,transparent_100%)] sm:h-[65vh]"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[45vh] bg-gradient-to-b from-[#faf8f5]/72 via-[#faf8f5]/30 to-[#faf8f5]/95 sm:h-[55vh]" />

        {/* Action Controls */}
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="absolute left-4 top-4 z-30 grid h-11 w-11 place-items-center rounded-full border-2 border-[#d9b477] bg-white text-[#5a3a18] shadow-sm transition hover:bg-[#fff7ea] sm:left-8 sm:top-8 sm:h-14 sm:w-14"
            aria-label={c.back}
          >
            <ArrowLeft size={detailBackIconSize} className={detailBackIconClassName(dir)} />
          </button>
        )}

        {onLanguageChange && (
          <button
            type="button"
            onClick={onLanguageChange}
            className="absolute right-4 top-4 z-30 flex items-center gap-2 rounded-full border border-[#d9b477] bg-white px-3 py-2 font-serif text-xs font-semibold text-[#4b3219] shadow-[0_8px_20px_rgba(84,54,16,0.15)] transition hover:bg-[#fff7ea] sm:right-8 sm:top-8 sm:gap-3 sm:px-5 sm:py-3 sm:text-sm"
          >
            <Globe2 className="h-4 w-4 sm:h-5 sm:w-5" />
            {languageLabel}
          </button>
        )}

        {/* Page Content layout wrapper */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1180px] flex-col px-4 sm:px-0">
          {/* Header - Overlaps seamlessly over the hero background */}
          <header
            data-n-animate="true"
            className="mx-auto max-w-[850px] pt-20 text-center sm:pt-28 lg:pt-32"
          >
            <div className="mx-auto mb-3 mt-1 w-[260px] max-w-full sm:mt-3">
              <DecorativeLine color="#c3923a" />
            </div>
            <h1 className="break-words font-serif text-4xl xs:text-5xl sm:text-[clamp(36px,10vw,84px)] font-semibold uppercase leading-[1.04] tracking-[0.04em] text-[#3b2410] lg:text-[84px]">
              {c.pageTitle}
            </h1>
            <div className="mx-auto mt-4 w-[180px] max-w-full sm:mt-5">
              <DecorativeLine color="#c3923a" />
            </div>
            <p className="mx-auto mt-4 max-w-[620px] text-[15px] sm:text-[18px] lg:text-[20px] font-semibold leading-relaxed text-[#4d3c2a] sm:mt-5">
              {c.pageDescription}
            </p>
          </header>

          {/* Cards Grid — Dynamic spacing pushes layout below the hero overlay area */}
          <div className="mx-auto mt-[18vh] sm:mt-[clamp(160px,46vh,960px)] grid w-full max-w-[1320px] grid-cols-2 gap-3 sm:gap-8 md:grid-cols-3 lg:grid-cols-4 animate-fade-in">
            {c.nations.map((nation, index) => (
              <div key={nation.id} data-n-card="true" className="w-full">
                <ReligionInfoCard
                  title={nation.title}
                  body={nation.shortIntro}
                  image={nation.image}
                  accentIndex={index}
                  onClick={() => setActiveId(nation.id)}
                  ariaLabel={nation.title}
                  titleClassName="uppercase"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 h-[180px] w-full bg-gradient-to-t from-[#b9893d]/20 to-transparent" />
      </section>
    </main>
  );
}
