import React from "react";
import { Landmark, Map, Mountain, UsersRound } from "lucide-react";
import en from "@/data/en.json";
import ar from "@/data/ar.json";
import ku from "@/data/ku.json";
import { localizeDigits } from "@/lib/utils";
import { withRudawGlyphFallback } from "@/lib/kurdishText";
import gsap from "gsap";
import card1 from "@/assets/images/new/the-people.webp";
import card2 from "@/assets/images/new/the-journey.webp";
import card3 from "@/assets/images/new/the-system.webp";
import card4 from "@/assets/images/new/the-land-and-future.webp";
import peopleVideo from "@/assets/videos/main-compressed.mp4";

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
  introDone,
  displayFont,
  bodyWeight,
  kuText,
  onSelect,
  featured = false,
}: {
  section: SectionCardData;
  lang: LangCode;
  introDone: boolean;
  displayFont: string;
  bodyWeight: string;
  kuText: (text: string) => React.ReactNode;
  onSelect?: (id: DiscoverSectionId) => void;
  featured?: boolean;
}) {
  const Icon = sectionIcons[section.id];
  const pressClass = introDone
    ? "transition-transform duration-150 active:scale-[0.98]"
    : "will-change-[transform,opacity]";

  if (featured) {
    return (
      <button
        data-card-item
        type="button"
        onClick={() => onSelect?.(section.id)}
        className={`relative flex w-full flex-col overflow-hidden rounded-[12px] sm:rounded-[24px] border border-[#e1bf7a] sm:border-2 bg-[#fffaf0] text-center shadow-[0_4px_12px_rgba(84,54,16,0.1)] sm:shadow-[0_12px_36px_rgba(84,54,16,0.18)] ${pressClass}`}
      >
        <div className="relative aspect-video w-full bg-[#f3ead8]">
          <video
            src={peopleVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#fffaf0] to-transparent sm:h-16" />
          <GoldIcon className="absolute bottom-0 left-1/2 z-10 h-12 w-12 -translate-x-1/2 translate-y-1/2 xs:h-14 xs:w-14 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32">
            <Icon
              className="h-5 w-5 xs:h-6 xs:w-6 sm:h-11 sm:w-11 md:h-14 md:w-14 lg:h-16 lg:w-16"
              strokeWidth={1.6}
            />
          </GoldIcon>
        </div>
        <div
          className={`relative flex flex-col justify-center ${bodyWeight} min-h-[120px] px-3 pb-5 pt-8 xs:min-h-[140px] xs:px-4 xs:pb-6 xs:pt-10 sm:min-h-[180px] sm:px-8 sm:pb-8 sm:pt-14 md:min-h-[210px] lg:min-h-[240px] xl:min-h-[280px] kiosk-portrait:min-h-[200px]`}
        >
          <h3
            className={`${displayFont} text-[22px] leading-tight ${bodyWeight} text-[#18362d] xs:text-[26px] sm:text-[44px] md:text-[52px] lg:text-[56px] xl:text-[62px] 3xl:text-[68px] 4xl:text-[76px] kiosk-portrait:text-[48px]`}
          >
            {kuText(localizeDigits(section.title, lang))}
          </h3>
          <p className="mx-auto mt-2 max-w-[720px] text-[13px] leading-snug text-[#5f6662] xs:text-[15px] sm:mt-4 sm:text-[26px] md:text-[30px] lg:text-[36px] xl:text-[40px] 3xl:text-[48px] 4xl:text-[56px] kiosk-portrait:text-[30px]">
            {kuText(localizeDigits(section.desc, lang))}
          </p>
        </div>
      </button>
    );
  }

  return (
    <button
      data-card-item
      type="button"
      onClick={() => onSelect?.(section.id)}
      className={`relative flex h-full flex-col overflow-hidden rounded-[12px] sm:rounded-[20px] border border-[#e1bf7a] sm:border-2 bg-[#fffaf0] text-center shadow-[0_4px_12px_rgba(84,54,16,0.1)] sm:shadow-[0_10px_30px_rgba(84,54,16,0.16)] ${pressClass}`}
    >
      <div className="relative w-full">
        <img
          src={sectionImages[section.id]}
          alt={section.title}
          className="aspect-[4/3] w-full object-cover sm:aspect-[16/11]"
        />
        <GoldIcon className="absolute bottom-0 left-1/2 z-10 h-9 w-9 -translate-x-1/2 translate-y-1/2 xs:h-11 xs:w-11 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24">
          <Icon
            className="h-4 w-4 xs:h-4 xs:w-4 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12"
            strokeWidth={1.6}
          />
        </GoldIcon>
      </div>
      <div
        className={`relative flex flex-1 flex-col justify-center ${bodyWeight} min-h-[100px] px-2 pb-3 pt-5 xs:min-h-[115px] xs:px-3 xs:pb-4 xs:pt-7 sm:min-h-[150px] sm:px-4 sm:pb-5 sm:pt-10 md:min-h-[170px] lg:min-h-[200px] xl:min-h-[240px]`}
      >
        <h3
          className={`${displayFont} text-[14px] leading-tight ${bodyWeight} text-[#18362d] xs:text-[16px] sm:text-[28px] md:text-[34px] lg:text-[38px] xl:text-[42px] kiosk-portrait:text-[36px]`}
        >
          {kuText(localizeDigits(section.title, lang))}
        </h3>
        <p className="mt-1 text-[10px] leading-snug text-[#5f6662] xs:text-[12px] sm:mt-2 sm:text-[18px] md:text-[22px] lg:text-[24px] xl:text-[26px] kiosk-portrait:text-[22px]">
          {kuText(localizeDigits(section.desc, lang))}
        </p>
      </div>
    </button>
  );
}

type DiscoverKurdistanV2Props = {
  lang?: LangCode;
  onStartExploring?: () => void;
  onSelectSection?: (section: DiscoverSectionId) => void;
  onBackToOriginal?: () => void;
  onOpenDesignDraftV3?: () => void;
};

export default function DiscoverKurdistanV2({
  lang = "en",
  onStartExploring,
  onSelectSection,
  onBackToOriginal,
  onOpenDesignDraftV3,
}: DiscoverKurdistanV2Props) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const [introDone, setIntroDone] = React.useState(false);

  const data = CONTENT[lang] as any;
  const discover = data?.discover ?? {};
  const isKu = lang === "ku";
  const isRtlScript = lang === "ku" || lang === "ar";
  const displayFont = isRtlScript ? "font-amiri" : "font-serif";
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
  const peopleSection =
    localizedSections.find((section) => section.id === "people") ?? fallbackSections[0];
  const otherSections = localizedSections.filter((section) => section.id !== "people");

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Use force3D: true on every set/to call to ensure translate3d is used
      // This promotes each element to its own GPU compositor layer
      gsap.set("[data-intro-lineshape='true']", {
        autoAlpha: 0,
        y: -18,
        force3D: true,
      });
      gsap.set("[data-intro-title='true']", {
        autoAlpha: 0,
        y: 24,
        force3D: true,
      });
      gsap.set("[data-intro-rest='true']", {
        autoAlpha: 0,
        y: 20,
        force3D: true,
      });
      // Target individual cards — match The People card entrance
      gsap.set("[data-card-item]", {
        autoAlpha: 0,
        y: 42,
        rotateX: -10,
        transformOrigin: "center top",
        force3D: true,
      });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out", force3D: true },
        // Re-enable the CSS press transition only after the intro is done so it
        // no longer fights GSAP's per-frame transform/opacity writes.
        onComplete: () => setIntroDone(true),
      });

      tl.to("[data-intro-lineshape='true']", {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
      })
        .to(
          "[data-intro-title='true']",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.15",
        )
        .to(
          "[data-intro-rest='true']",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.08,
          },
          "-=0.1",
        )
        // Stagger individual cards with the same smooth tilt-in as The People
        .to(
          "[data-card-item]",
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: 1.15,
            stagger: 0.24,
          },
          "-=0.35",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="m-0 flex min-h-screen w-screen justify-center overflow-x-hidden bg-[#f8f1e4] p-0 text-[#18362d]">
      <section
        ref={sectionRef}
        lang={lang}
        dir={lang === "ar" || isKu ? "rtl" : "ltr"}
        className={`relative flex min-h-screen w-[min(100vw,1400px)] flex-col bg-[#fbf5ea] ${isRtlScript ? "font-amiri" : ""}`}
      >
        <div className="absolute start-3 top-3 z-20 flex items-center gap-2 sm:start-6 sm:top-6">
          <span className="rounded-full border border-[#c49b52]/60 bg-[#104231] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[#f6d995] sm:px-4 sm:py-2 sm:text-xs">
            Design draft
          </span>
          {onBackToOriginal && (
            <button
              type="button"
              onClick={onBackToOriginal}
              className="rounded-full border border-[#c49b52]/60 bg-[#fffaf0]/90 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[#9b6d35] shadow-sm backdrop-blur-sm transition-colors hover:bg-[#fff3dc] sm:px-4 sm:py-2 sm:text-xs"
            >
              Current design
            </button>
          )}
          {onOpenDesignDraftV3 && (
            <button
              type="button"
              onClick={onOpenDesignDraftV3}
              className="rounded-full border border-[#c49b52]/60 bg-[#104231] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[#f6d995] shadow-sm backdrop-blur-sm transition-colors hover:bg-[#145a47] sm:px-4 sm:py-2 sm:text-xs"
            >
              Draft 3
            </button>
          )}
        </div>
        {/* Paper texture background pattern */}
        {/* <div
          className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundPattern})` }}
        /> */}

        {/* Light cream overlay */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-[#fbf5ea]/55" />

        {/* Bottom fade */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-[#fbf5ea]/85 via-transparent to-[#fbf5ea]/65" />

        {/* Main content container */}
        <div className="relative z-10 flex min-h-screen flex-1 flex-col px-3 pb-6 pt-6 xs:px-4 sm:px-8 sm:pt-16 md:px-10 md:pb-12 md:pt-20 lg:px-12 lg:pb-14 lg:pt-24">
          <div className="shrink-0 text-center">
            <div
              data-intro-lineshape="true"
              className="mb-3 flex items-center justify-center gap-2 text-[#c49b52] sm:mb-6 sm:gap-6 md:gap-12 lg:mb-8"
            >
              <span className="h-0.5 w-6 bg-[#c49b52] xs:w-10 sm:w-20 md:max-w-[150px] md:flex-1 lg:max-w-[220px]" />
              <div className="flex w-full flex-col items-center">
                <span className="text-2xl leading-none xs:text-3xl sm:text-6xl md:text-8xl lg:text-9xl">
                  ✹
                </span>
              </div>
              <span className="h-0.5 w-6 bg-[#c49b52] xs:w-10 sm:w-20 md:max-w-[150px] md:flex-1 lg:max-w-[220px]" />
            </div>

            <h1
              data-intro-title="true"
              className={`${displayFont} text-[24px] leading-tight tracking-tight text-[#18362d] xs:text-[30px] sm:text-[56px] md:text-[84px] lg:text-[102px] xl:text-[120px] 3xl:text-[150px] 4xl:text-[180px] kiosk-portrait:text-[110px]`}
            >
              {kuText(discover.title ?? "Discover Kurdistan")}
            </h1>

            <p
              data-intro-rest="true"
              className={`mx-auto mt-3 ${bodyWeight} max-w-[980px] px-1 text-[13px] leading-relaxed text-[#424c48] xs:text-[15px] sm:mt-6 sm:text-[22px] md:mt-8 md:px-0 md:text-[28px] lg:mt-10 lg:text-[33px] xl:max-w-[1200px] xl:text-[40px] 3xl:max-w-[1500px] 3xl:text-[52px] 4xl:text-[64px] kiosk-portrait:max-w-[920px] kiosk-portrait:text-[40px]`}
            >
              {kuText(
                discover.subtitle ??
                  "A short journey through the people, identity, history, institutions, and future of the Kurdistan Region.",
              )}
            </p>

            <div
              data-intro-rest="true"
              className="mx-auto mt-4 flex max-w-[180px] items-center gap-2 text-[#c49b52] xs:max-w-[240px] sm:mt-8 sm:gap-5 md:mt-10 md:gap-6 lg:mt-12 lg:max-w-[520px]"
            >
              <span className="h-0.5 flex-1 bg-[#d6bd83]" />
              <span className="h-2 w-2 rotate-45 bg-[#c49b52] sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
              <span className="h-0.5 flex-1 bg-[#d6bd83]" />
            </div>

            <p
              data-intro-rest="true"
              className={`mx-auto ${bodyWeight} mt-3 max-w-[880px] px-1 text-[13px] leading-relaxed text-[#4d5652] xs:text-[15px] sm:mt-6 sm:text-[22px] md:mt-8 md:px-0 md:text-[28px] lg:text-[33px] xl:max-w-[1100px] xl:text-[40px] 3xl:max-w-[1400px] 3xl:text-[52px] 4xl:text-[64px] kiosk-portrait:max-w-[860px] kiosk-portrait:text-[40px]`}
            >
              {kuText(
                discover.description ??
                  "This interactive experience offers visitors a simple introduction to Kurdistan and its story.",
              )}
            </p>
          </div>

          <div
            data-intro-rest="true"
            className="flex flex-1 flex-col items-center justify-center py-4 sm:py-6 md:py-8"
          >
            <div className="flex w-full max-w-[1200px] flex-col gap-3 [perspective:1200px] xs:gap-4 sm:gap-5 md:gap-6 lg:gap-6">
              <SectionCard
                section={peopleSection}
                lang={lang}
                introDone={introDone}
                displayFont={displayFont}
                bodyWeight={bodyWeight}
                kuText={kuText}
                onSelect={onSelectSection}
                featured
              />

              <div className="grid grid-cols-3 gap-2 xs:gap-3 sm:gap-5 md:gap-6 lg:gap-6">
                {otherSections.map((section) => (
                  <SectionCard
                    key={section.id}
                    section={section}
                    lang={lang}
                    introDone={introDone}
                    displayFont={displayFont}
                    bodyWeight={bodyWeight}
                    kuText={kuText}
                    onSelect={onSelectSection}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}