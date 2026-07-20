import React from "react";
import gsap from "gsap";
import { ArrowLeft, Globe2 } from "lucide-react";
import { detailBackIconClassName, detailBackIconSize, religionsOverlayStartClassName, religionsOverlayEndClassName } from "@/constants/backNavigation";

import ReligionInfoCard from "@/components/Sections/religions/ReligionInfoCard";
import ReligionsScaledPage from "@/components/Sections/religions/ReligionsScaledPage";

import bg from "@/assets/images/religions/nations/cover.jpeg";
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
    <ReligionsScaledPage dir={dir} lang={lang} fitDeps={[lang]} sectionRef={sectionRef} className="px-12 pb-14">
      <img
        data-n-hero="true"
        src={bg}
        alt=""
        className="pointer-events-none absolute inset-x-0 top-0 h-[900px] w-full object-cover object-center [mask-image:linear-gradient(to_bottom,black_0%,black_72%,transparent_100%)]"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[900px] bg-gradient-to-b from-[#faf8f5]/72 via-[#faf8f5]/30 to-[#faf8f5]/95" />

      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className={`absolute top-1/2 z-30 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full border-2 border-[#d9b477] bg-white text-[#5a3a18] shadow-sm transition hover:bg-[#fff7ea] ${religionsOverlayStartClassName(dir)}`}
          aria-label={c.back}
        >
          <ArrowLeft size={detailBackIconSize} className={detailBackIconClassName(dir)} />
        </button>
      )}

      {onLanguageChange && (
        <button
          type="button"
          onClick={onLanguageChange}
          className={`absolute top-8 z-30 flex items-center gap-3 rounded-full border border-[#d9b477] bg-white px-5 py-3 font-serif text-sm font-semibold text-[#4b3219] shadow-[0_8px_20px_rgba(84,54,16,0.15)] transition hover:bg-[#fff7ea] ${religionsOverlayEndClassName(dir)}`}
        >
          <Globe2 className="h-5 w-5" />
          {languageLabel}
        </button>
      )}

      <div className="relative z-10 mx-auto flex w-full max-w-[1180px] flex-col">
        <header
          data-n-animate="true"
          className="mx-auto max-w-[850px] pt-32 text-center"
        >
          <div className="mx-auto mb-3 mt-3 w-[260px]">
            <DecorativeLine color="#c3923a" />
          </div>
          <h1 className="break-words font-serif text-[84px] font-semibold uppercase leading-[1.04] tracking-[0.04em] text-[#3b2410]">
            {c.pageTitle}
          </h1>
          <div className="mx-auto mt-5 w-[180px]">
            <DecorativeLine color="#c3923a" />
          </div>
          <p className="mx-auto mt-5 max-w-[620px] text-[20px] font-semibold leading-relaxed text-[#4d3c2a]">
            {c.pageDescription}
          </p>
        </header>

        <div className="mx-auto mt-[480px] grid w-full max-w-[1320px] grid-cols-4 gap-8">
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
                className="min-h-[520px]"
                imageHeightClass="h-[320px]"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 h-[180px] w-full bg-gradient-to-t from-[#b9893d]/20 to-transparent" />
    </ReligionsScaledPage>
  );
}
