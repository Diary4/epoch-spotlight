import React from "react";
import { Landmark, Map, Mountain, UsersRound } from "lucide-react";
import en from "@/data/en.json";
import ar from "@/data/ar.json";
import ku from "@/data/ku.json";
import { localizeDigits } from "@/lib/utils";
import { withRudawGlyphFallback } from "@/lib/kurdishText";
import { discoverDisplayFont, discoverSectionFont } from "@/components/Sections/discoverLanguage";
import gsap from "gsap";
import card1 from "@/assets/images/new/the-people.webp";
import card2 from "@/assets/images/new/the-journey.webp";
import card3 from "@/assets/images/new/the-system.webp";
import card4 from "@/assets/images/new/the-land-and-future.webp";
import peopleVideo from "@/assets/videos/main.webm";

type DiscoverSectionId = "people" | "journey" | "system" | "landFuture";

type LangCode = "ku" | "en" | "ar";
const CONTENT = { en, ar, ku } as const;

const sectionIcons: Record<DiscoverSectionId, typeof UsersRound> = {
  people: UsersRound,
  journey: Map,
  system: Landmark,
  landFuture: Mountain,
};

const sectionImages: Record<DiscoverSectionId, string> = {
  people: card1,
  journey: card2,
  system: card3,
  landFuture: card4,
};

const fallbackSections: {
  id: DiscoverSectionId;
  title: string;
  desc: string;
}[] = [
  {
    id: "people",
    title: "The People",
    desc: "Identity, culture, and resilience",
  },
  {
    id: "journey",
    title: "The Journey",
    desc: "From 1991 to the present",
  },
  {
    id: "system",
    title: "The System",
    desc: "Parliament, government, and leadership",
  },
  {
    id: "landFuture",
    title: "The Land and Future",
    desc: "Geography, symbols, protection, and progress",
  },
];

const tapHintCopy: Record<LangCode, string> = {
  en: "Touch to explore",
  ku: "بۆ گەڕان بەردەم بگرە",
  ar: "المس للاستكشاف",
};

function GoldIcon({ children, className = "" }) {
  return (
    <div
      className={`grid place-items-center rounded-full border border-[#c8a05a] sm:border-2 bg-[#104231] text-[#f6d995] shadow-[0_4px_12px_rgba(84,54,16,0.15)] sm:shadow-[0_8px_24px_rgba(84,54,16,0.25)] ${className}`}
    >
      {children}
    </div>
  );
}

type SectionCardData = {
  id: DiscoverSectionId;
  title: string;
  desc: string;
};

function SectionCard({
  section,
  lang,
  displayFont,
  bodyWeight,
  kuText,
  onSelect,
}: {
  section: SectionCardData;
  lang: LangCode;
  displayFont: string;
  bodyWeight: string;
  kuText: (text: string) => React.ReactNode;
  onSelect?: (id: DiscoverSectionId) => void;
}) {
  const Icon = sectionIcons[section.id];

  return (
    <button
      data-v3-card-item
      type="button"
      onClick={() => onSelect?.(section.id)}
      className="relative flex h-full flex-col overflow-hidden rounded-[12px] border border-[#e1bf7a] bg-[#fffaf0]/95 text-center shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-sm transition-transform duration-150 active:scale-[0.98] sm:rounded-[20px] sm:border-2"
    >
      <div className="relative w-full">
        <img
          src={sectionImages[section.id]}
          alt={section.title}
          className="aspect-[4/3] w-full object-cover sm:aspect-[16/11]"
        />
        <GoldIcon className="absolute bottom-0 left-1/2 z-10 h-9 w-9 -translate-x-1/2 translate-y-1/2 xs:h-11 xs:w-11 sm:h-16 sm:w-16 md:h-20 md:w-20">
          <Icon
            className="h-4 w-4 xs:h-4 xs:w-4 sm:h-8 sm:w-8 md:h-10 md:w-10"
            strokeWidth={1.6}
          />
        </GoldIcon>
      </div>
      <div
        className={`relative flex flex-1 flex-col justify-center ${bodyWeight} min-h-[88px] px-2 pb-3 pt-5 xs:min-h-[100px] xs:px-3 xs:pb-4 xs:pt-7 sm:min-h-[130px] sm:px-4 sm:pb-5 sm:pt-10 md:min-h-[150px]`}
      >
        <h3
          className={`${displayFont} text-[13px] leading-tight ${bodyWeight} text-[#18362d] xs:text-[15px] sm:text-[24px] md:text-[30px] lg:text-[34px]`}
        >
          {kuText(localizeDigits(section.title, lang))}
        </h3>
        <p className="mt-1 text-[9px] leading-snug text-[#5f6662] xs:text-[11px] sm:mt-2 sm:text-[16px] md:text-[18px]">
          {kuText(localizeDigits(section.desc, lang))}
        </p>
      </div>
    </button>
  );
}

type DiscoverKurdistanV3Props = {
  lang?: LangCode;
  onSelectSection?: (section: DiscoverSectionId) => void;
  onBackToOriginal?: () => void;
  onBackToV2?: () => void;
};

export default function DiscoverKurdistanV3({
  lang = "en",
  onSelectSection,
  onBackToOriginal,
  onBackToV2,
}: DiscoverKurdistanV3Props) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const cardsPanelRef = React.useRef<HTMLDivElement | null>(null);
  const [cardsVisible, setCardsVisible] = React.useState(false);

  const data = CONTENT[lang] as any;
  const discover = data?.discover ?? {};
  const isKu = lang === "ku";
  const isRtlScript = lang === "ku" || lang === "ar";
  const displayFont = discoverDisplayFont(lang);
  const sectionFont = discoverSectionFont(lang);
  const kuText = (text: string) => withRudawGlyphFallback(text, false);
  const bodyWeight = isKu ? "font-normal" : "font-light";
  const localizedSections = Array.isArray(discover.sections)
    ? discover.sections.map(
        (section: { id: DiscoverSectionId; title: string; desc: string }) => ({
          id: section.id,
          title: section.title,
          desc: section.desc,
        }),
      )
    : fallbackSections;

  const revealCards = React.useCallback(() => {
    setCardsVisible(true);
  }, []);

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-v3-intro-lineshape='true']", { autoAlpha: 0, y: -18, force3D: true });
      gsap.set("[data-v3-intro-title='true']", { autoAlpha: 0, y: 24, force3D: true });
      gsap.set("[data-v3-intro-rest='true']", { autoAlpha: 0, y: 20, force3D: true });
      gsap.set("[data-v3-tap-hint='true']", { autoAlpha: 0, y: 12, force3D: true });

      const tl = gsap.timeline({ defaults: { ease: "power2.out", force3D: true } });

      tl.to("[data-v3-intro-lineshape='true']", { autoAlpha: 1, y: 0, duration: 0.85 })
        .to("[data-v3-intro-title='true']", { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.15")
        .to(
          "[data-v3-intro-rest='true']",
          { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.08 },
          "-=0.1",
        )
        .to("[data-v3-tap-hint='true']", { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.2");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  React.useLayoutEffect(() => {
    if (!cardsVisible || !cardsPanelRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-v3-overlay='true']", { autoAlpha: 0 });
      gsap.set("[data-v3-card-item]", {
        autoAlpha: 0,
        y: 36,
        rotateX: -10,
        transformOrigin: "center top",
        force3D: true,
      });

      const tl = gsap.timeline({ defaults: { ease: "power2.out", force3D: true } });
      tl.to("[data-v3-overlay='true']", { autoAlpha: 1, duration: 0.45 })
        .to(
          "[data-v3-card-item]",
          { autoAlpha: 1, y: 0, rotateX: 0, duration: 0.85, stagger: 0.1 },
          "-=0.15",
        );
    }, cardsPanelRef);

    return () => ctx.revert();
  }, [cardsVisible]);

  return (
    <main className="m-0 flex min-h-screen w-screen justify-center overflow-x-hidden bg-[#0a1210] p-0 text-[#fbf5ea]">
      <section
        ref={sectionRef}
        lang={lang}
        dir={lang === "ar" || isKu ? "rtl" : "ltr"}
        className={`relative flex min-h-screen w-[min(100vw,1400px)] flex-col overflow-hidden ${sectionFont}`}
      >
        <video
          src={peopleVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a1210]/75 via-[#0a1210]/45 to-[#0a1210]/82" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(196,155,82,0.12),transparent_55%)]" />

        <div className="absolute start-3 top-3 z-30 flex flex-wrap items-center gap-2 sm:start-6 sm:top-6">
          <span className="rounded-full border border-[#c49b52]/60 bg-[#104231] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[#f6d995] sm:px-4 sm:py-2 sm:text-xs">
            Design draft 3
          </span>
          {onBackToV2 && (
            <button
              type="button"
              onClick={onBackToV2}
              className="rounded-full border border-[#c49b52]/60 bg-[#fffaf0]/90 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[#9b6d35] shadow-sm backdrop-blur-sm transition-colors hover:bg-[#fff3dc] sm:px-4 sm:py-2 sm:text-xs"
            >
              Draft 2
            </button>
          )}
          {onBackToOriginal && (
            <button
              type="button"
              onClick={onBackToOriginal}
              className="rounded-full border border-[#c49b52]/60 bg-[#fffaf0]/90 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[#9b6d35] shadow-sm backdrop-blur-sm transition-colors hover:bg-[#fff3dc] sm:px-4 sm:py-2 sm:text-xs"
            >
              Current design
            </button>
          )}
        </div>

        <div className="relative z-10 flex min-h-screen flex-1 flex-col px-3 pb-8 pt-16 xs:px-4 sm:px-8 sm:pt-20 md:px-10 md:pb-12 md:pt-24 lg:px-12">
          <div className="shrink-0 text-center">
            <div
              data-v3-intro-lineshape="true"
              className="mb-3 flex items-center justify-center gap-2 text-[#e8c97a] sm:mb-6 sm:gap-6 md:gap-12 lg:mb-8"
            >
              <span className="h-0.5 w-6 bg-[#e8c97a]/80 xs:w-10 sm:w-20 md:max-w-[150px] md:flex-1 lg:max-w-[220px]" />
              <div className="flex w-full flex-col items-center">
                <span className="text-2xl leading-none xs:text-3xl sm:text-6xl md:text-8xl lg:text-9xl">
                  ✹
                </span>
              </div>
              <span className="h-0.5 w-6 bg-[#e8c97a]/80 xs:w-10 sm:w-20 md:max-w-[150px] md:flex-1 lg:max-w-[220px]" />
            </div>

            <h1
              data-v3-intro-title="true"
              className={`${displayFont} text-[24px] leading-tight tracking-tight text-[#fbf5ea] drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] xs:text-[30px] sm:text-[56px] md:text-[84px] lg:text-[102px] xl:text-[120px] kiosk-portrait:text-[110px]`}
            >
              {kuText(discover.title ?? "Discover Kurdistan")}
            </h1>

            <p
              data-v3-intro-rest="true"
              className={`mx-auto mt-3 ${bodyWeight} max-w-[980px] px-1 text-[13px] leading-relaxed text-[#f0ebe2] drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)] xs:text-[15px] sm:mt-6 sm:text-[22px] md:mt-8 md:px-0 md:text-[28px] lg:mt-10 lg:text-[33px] xl:max-w-[1200px] xl:text-[40px] kiosk-portrait:max-w-[920px] kiosk-portrait:text-[40px]`}
            >
              {kuText(
                discover.subtitle ??
                  "A short journey through the people, identity, history, institutions, and future of the Kurdistan Region.",
              )}
            </p>

            <div
              data-v3-intro-rest="true"
              className="mx-auto mt-4 flex max-w-[180px] items-center gap-2 text-[#e8c97a] xs:max-w-[240px] sm:mt-8 sm:gap-5 md:mt-10 md:gap-6 lg:mt-12 lg:max-w-[520px]"
            >
              <span className="h-0.5 flex-1 bg-[#e8c97a]/70" />
              <span className="h-2 w-2 rotate-45 bg-[#e8c97a] sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
              <span className="h-0.5 flex-1 bg-[#e8c97a]/70" />
            </div>

            <p
              data-v3-intro-rest="true"
              className={`mx-auto ${bodyWeight} mt-3 max-w-[880px] px-1 text-[13px] leading-relaxed text-[#e8e4dc] drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)] xs:text-[15px] sm:mt-6 sm:text-[22px] md:mt-8 md:px-0 md:text-[28px] lg:text-[33px] xl:max-w-[1100px] xl:text-[40px] kiosk-portrait:max-w-[860px] kiosk-portrait:text-[40px]`}
            >
              {kuText(
                discover.description ??
                  "This interactive experience offers visitors a simple introduction to Kurdistan and its story.",
              )}
            </p>
          </div>

          {!cardsVisible && (
            <button
              type="button"
              data-v3-tap-hint="true"
              onClick={revealCards}
              className="absolute inset-0 z-20 flex items-end justify-center pb-10 sm:pb-14"
              aria-label={tapHintCopy[lang]}
            >
              <span className="rounded-full border border-[#e8c97a]/50 bg-[#104231]/75 px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.14em] text-[#f6d995] shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-sm animate-pulse xs:text-[13px] sm:px-6 sm:py-3 sm:text-sm">
                {tapHintCopy[lang]}
              </span>
            </button>
          )}
        </div>

        {cardsVisible && (
          <div
            ref={cardsPanelRef}
            className="absolute inset-0 z-30 flex items-center justify-center px-3 py-16 xs:px-4 sm:px-8 sm:py-20"
          >
            <div
              data-v3-overlay="true"
              className="absolute inset-0 bg-[#0a1210]/55 backdrop-blur-[2px]"
              aria-hidden
            />

            <div className="relative z-10 grid w-full max-w-[1100px] grid-cols-2 gap-2 [perspective:1200px] xs:gap-3 sm:gap-4 md:gap-5 lg:grid-cols-4 lg:gap-5">
              {localizedSections.map((section) => (
                <SectionCard
                  key={section.id}
                  section={section}
                  lang={lang}
                  displayFont={displayFont}
                  bodyWeight={bodyWeight}
                  kuText={kuText}
                  onSelect={onSelectSection}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
