import React from "react";
import gsap from "gsap";
import { ArrowLeft, ChevronRight, Globe2 } from "lucide-react";

import bg from "@/assets/images/religions/r-1.webp";
import whoarekurds from "@/assets/mainImages/whoarekurds.webp";
import nationTurkmens from "@/assets/images/religions/r-3.webp";
import nationChaldo from "@/assets/images/religions/r-4.webp";
import nationArmenians from "@/assets/images/religions/r-5.webp";

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
        image: whoarekurds,
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
        image: whoarekurds,
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
        image: whoarekurds,
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

  React.useEffect(() => {
    if (!sectionRef.current || activeId) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-n-hero='true']", { autoAlpha: 0, scale: 1.04 });
      gsap.set("[data-n-animate='true']", { autoAlpha: 0, y: 24 });

      const tl = gsap.timeline();
      tl.to("[data-n-hero='true']", {
        autoAlpha: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      }).to(
        "[data-n-animate='true']",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.05,
          ease: "power2.out",
        },
        "-=0.2",
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
      className="m-0 flex min-h-screen w-screen justify-center bg-[#f8f1e7] p-0 text-[#3d2b18]"
    >
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden bg-[#fbf1df] px-6 pb-20 pt-10 sm:px-12 lg:px-20"
      >
        <img
          data-n-hero="true"
          src={bg}
          alt=""
          className="absolute inset-0 h-[55vh] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_72%,transparent_100%)]"
        />
        <div className="absolute inset-x-0 top-0 h-[55vh] bg-gradient-to-b from-[#fbf1df]/72 via-[#fbf1df]/30 to-[#f4dfbb]/95" />
        <div className="pointer-events-none absolute inset-5 rounded-[30px] border-2 border-[#d2a35a]/45" />

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="absolute left-8 top-8 z-30 grid h-14 w-14 place-items-center rounded-full border-2 border-[#d9b477] bg-white text-[#5a3a18] shadow-sm"
            aria-label={c.back}
          >
            <ArrowLeft className="h-7 w-7" />
          </button>
        )}

        {onLanguageChange && (
          <button
            type="button"
            onClick={onLanguageChange}
            className="absolute right-8 top-8 z-30 flex items-center gap-3 rounded-full border border-[#d9b477] bg-white px-5 py-3 font-serif text-sm font-semibold text-[#4b3219] shadow-[0_8px_20px_rgba(84,54,16,0.15)]"
          >
            <Globe2 className="h-5 w-5" />
            {languageLabel}
          </button>
        )}

        <div className="relative z-10 mx-auto flex w-full max-w-[1180px] flex-col">
          <header
            data-n-animate="true"
            className="mx-auto max-w-[850px] pt-28 text-center sm:pt-32"
          >
            <div className="mx-auto mb-3 w-[260px]">
              <DecorativeLine color="#c3923a" />
            </div>
            <h1 className="font-serif text-[56px] font-semibold uppercase leading-[1.04] tracking-[0.04em] text-[#3b2410] sm:text-[76px] lg:text-[84px]">
              {c.pageTitle}
            </h1>
            <div className="mx-auto mt-5 w-[180px]">
              <DecorativeLine color="#c3923a" />
            </div>
            <p className="mx-auto mt-5 max-w-[620px] text-[18px] font-semibold leading-relaxed text-[#4d3c2a] sm:text-[20px]">
              {c.pageDescription}
            </p>
          </header>

          <section
            data-n-animate="true"
            className="mx-auto mt-[clamp(80px,50vh,360px)] grid w-full max-w-[1180px] grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4"
          >
            {c.nations.map((nation) => (
              <article
                key={nation.id}
                role="button"
                tabIndex={0}
                onClick={() => setActiveId(nation.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveId(nation.id);
                  }
                }}
                aria-label={nation.title}
                className="mt-[clamp(20px,30vh,500px)] relative flex min-h-[420px] cursor-pointer flex-col overflow-hidden rounded-[28px] border-2 border-[#f3dfb5] bg-white shadow-[0_18px_36px_rgba(69,43,14,0.22)] outline-none focus-visible:ring-2 focus-visible:ring-[#c3923a]"
              >
                <div className="relative h-[230px] w-full overflow-hidden">
                  <img
                    src={nation.image}
                    alt={nation.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f05]/55 via-transparent to-transparent" />
                </div>

                <div className="flex flex-1 flex-col px-6 py-6">
                  <h3 className="font-serif text-[26px] font-semibold uppercase leading-tight text-[#3b2410]">
                    {nation.title}
                  </h3>
                  <div className="mt-2 mb-3 w-[60px]">
                    <span className="block h-[2px] bg-[#c3923a]" />
                  </div>
                  <p className="text-[14px] leading-relaxed text-[#5a4a30]">
                    {nation.shortIntro}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-5">
                    <span className="font-serif text-[12px] font-semibold uppercase tracking-[0.28em] text-[#a77423]">
                      {c.openLabel}
                    </span>
                    <div className="grid h-11 w-11 place-items-center rounded-full border border-[#d8bc7b] bg-[#fff4dc] text-[#8a5a12]">
                      <ChevronRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 h-[180px] w-full bg-gradient-to-t from-[#b9893d]/20 to-transparent" />
      </section>
    </main>
  );
}
