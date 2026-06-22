import React from "react";
import { ArrowRight, Landmark, Map, Mountain, UsersRound } from "lucide-react";
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
import backgroundPattern from "@/assets/images/patterns/flower.webp";

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

type DiscoverKurdistanProps = {
  lang?: LangCode;
  onStartExploring?: () => void;
  onSelectSection?: (section: DiscoverSectionId) => void;
};

export default function DiscoverKurdistan({
  lang = "en",
  onStartExploring,
  onSelectSection,
}: DiscoverKurdistanProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const [introDone, setIntroDone] = React.useState(false);

  const data = CONTENT[lang] as any;
  const discover = data?.discover ?? {};
  const isKu = lang === "ku";
  const isRtlScript = lang === "ku" || lang === "ar";
  const displayFont = isRtlScript ? "font-ibm-arabic" : "font-serif";
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
      gsap.set("[data-choose-line='true']", {
        scaleX: 0,
        transformOrigin: "center",
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
        .to(
          "[data-choose-line='true']",
          {
            scaleX: 1,
            duration: 0.7,
            stagger: 0.07,
          },
          "-=0.25",
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
      {/*
        Removed overflow-x-hidden from <section> — it was the main GPU killer.
        overflow: hidden creates a stacking context that collapses all child
        elements into the parent layer, preventing individual compositor promotion.
        Horizontal overflow is already handled by the parent <main>.
      */}
      <section
        ref={sectionRef}
        lang={lang}
        dir={lang === "ar" || isKu ? "rtl" : "ltr"}
        className={`relative flex min-h-screen w-[min(100vw,1400px)] flex-col bg-[#fbf5ea] ${isRtlScript ? "font-ibm-arabic" : ""}`}
      >
        {/* Paper texture background pattern */}
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundPattern})` }}
        />

        {/* Light cream overlay */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-[#fbf5ea]/55" />

        {/* Bottom fade */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-[#fbf5ea]/85 via-transparent to-[#fbf5ea]/65" />

        {/* Main content container */}
        <div className="relative z-10 flex flex-1 flex-col justify-between px-3 pb-6 pt-6 xs:px-4 sm:px-8 sm:pt-16 md:px-10 md:pb-12 md:pt-20 lg:px-12 lg:pb-14 lg:pt-24">
          <div className="text-center">
            {/* Top decorative line and star */}
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

            {/* Responsive Main Title */}
            <h1
              data-intro-title="true"
              className={`${displayFont} text-[24px] leading-tight tracking-tight text-[#18362d] xs:text-[30px] sm:text-[56px] md:text-[84px] lg:text-[102px] xl:text-[120px] 3xl:text-[150px] 4xl:text-[180px] kiosk-portrait:text-[110px]`}
            >
              {kuText(discover.title ?? "Discover Kurdistan")}
            </h1>

            {/* Subtitle */}
            <p
              data-intro-rest="true"
              className={`mx-auto mt-3 ${bodyWeight} max-w-[980px] px-1 text-[13px] leading-relaxed text-[#424c48] xs:text-[15px] sm:mt-6 sm:text-[22px] md:mt-8 md:px-0 md:text-[28px] lg:mt-10 lg:text-[33px] xl:max-w-[1200px] xl:text-[40px] 3xl:max-w-[1500px] 3xl:text-[52px] 4xl:text-[64px] kiosk-portrait:max-w-[920px] kiosk-portrait:text-[40px]`}
            >
              {kuText(
                discover.subtitle ??
                  "A short journey through the people, identity, history, institutions, and future of the Kurdistan Region.",
              )}
            </p>

            {/* Central Diamond Divider */}
            <div
              data-intro-rest="true"
              className="mx-auto mt-4 flex max-w-[180px] items-center gap-2 text-[#c49b52] xs:max-w-[240px] sm:mt-8 sm:gap-5 md:mt-10 md:gap-6 lg:mt-12 lg:max-w-[520px]"
            >
              <span className="h-0.5 flex-1 bg-[#d6bd83]" />
              <span className="h-2 w-2 rotate-45 bg-[#c49b52] sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
              <span className="h-0.5 flex-1 bg-[#d6bd83]" />
            </div>

            {/* Description Paragraph */}
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

          <div data-intro-rest="true" className="mt-6 sm:mt-12 md:mt-16">
            {/* Choosing section title wrapper */}
            <div className={`mb-3 flex items-center justify-center gap-1.5 ${displayFont} text-[13px] text-[#2d3d35] xs:text-[15px] sm:mb-5 sm:gap-3 sm:text-[23px] md:mb-6 md:gap-5 md:text-[30px] lg:mb-8 lg:text-[36px] xl:text-[44px] 3xl:text-[56px] 4xl:text-[66px] kiosk-portrait:text-[44px]`}>
              <span
                data-choose-line="true"
                className="h-0.5 w-4 bg-[#c8a05a] xs:w-8 sm:w-12 md:w-74 md:max-w-[74px] lg:w-[108px]"
              />
              <span className="h-1.5 w-1.5 rotate-45 border border-[#c8a05a] sm:h-3 sm:w-3 md:h-4 md:w-4 md:border-2 lg:h-5 lg:w-5" />
              <span className={bodyWeight}>
                {kuText(discover.chooseSection ?? "Choose a section to begin")}
              </span>
              <span className="h-1.5 w-1.5 rotate-45 border border-[#c8a05a] sm:h-3 sm:w-3 md:h-4 md:w-4 md:border-2 lg:h-5 lg:w-5" />
              <span
                data-choose-line="true"
                className="h-0.5 w-4 bg-[#c8a05a] xs:w-8 sm:w-12 md:w-74 md:max-w-[74px] lg:w-[108px]"
              />
            </div>

            {/*
              Grid wrapper: no animation data attribute here anymore.
              Each card gets data-card-item so GSAP animates them individually
              via stagger — far cheaper than repainting the whole grid subtree.
            */}
            <div className="grid grid-cols-2 gap-3 [perspective:1200px] xs:gap-4 sm:gap-5 md:gap-6 lg:gap-6">
              {localizedSections.map((section) => {
                const Icon = sectionIcons[section.id];
                return (
                  <button
                    key={section.title}
                    data-card-item
                    type="button"
                    onClick={() => onSelectSection?.(section.id)}
                    className={`relative flex flex-col overflow-hidden rounded-[12px] sm:rounded-[20px] border border-[#e1bf7a] sm:border-2 bg-[#fffaf0] text-center shadow-[0_4px_12px_rgba(84,54,16,0.1)] sm:shadow-[0_10px_30px_rgba(84,54,16,0.16)] ${
                      introDone
                        ? "transition-transform duration-150 active:scale-[0.98]"
                        : "will-change-[transform,opacity]"
                    }`}
                  >
                    <div className="relative w-full">
                      <img
                        src={sectionImages[section.id]}
                        alt={section.title}
                        className="aspect-[16/9] w-full object-cover"
                      />
                      <GoldIcon className="absolute bottom-0 left-1/2 z-10 h-10 w-10 -translate-x-1/2 translate-y-1/2 xs:h-12 xs:w-12 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28">
                        <Icon
                          className="h-4 w-4 xs:h-5 xs:w-5 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14"
                          strokeWidth={1.6}
                        />
                      </GoldIcon>
                    </div>
                    <div className={`relative flex flex-col justify-center ${bodyWeight} min-h-[95px] px-2 pb-3 pt-6 xs:min-h-[110px] xs:px-3 xs:pb-4 xs:pt-8 sm:min-h-[160px] sm:px-6 sm:pb-6 sm:pt-12 md:min-h-[190px] lg:min-h-[250px] xl:min-h-[300px] 3xl:min-h-[360px] 4xl:min-h-[420px] kiosk-portrait:min-h-[220px]`}>
                      <h3 className={`${displayFont} text-[12px] leading-tight ${bodyWeight} text-[#18362d] xs:text-[14px] sm:text-[34px] md:text-[44px] lg:text-[38px] xl:text-[46px] 3xl:text-[54px] 4xl:text-[60px] kiosk-portrait:text-[40px]`}>
                        {kuText(localizeDigits(section.title, lang))}
                      </h3>
                      <p className="mt-1 whitespace-nowrap text-[9px] leading-tight text-[#5f6662] xs:text-[11px] sm:text-[22px] md:text-[28px] lg:mt-3 lg:text-[42px] xl:text-[48px] 3xl:text-[58px] 4xl:text-[70px] kiosk-portrait:text-[26px]">
                        {kuText(localizeDigits(section.desc, lang))}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}