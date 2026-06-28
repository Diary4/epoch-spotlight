import React from "react";
import {
  ArrowRight,
  Sparkles,
} from "lucide-react";
import {
  getAppLanguage,
  nextAppLanguage,
  setAppLanguage,
  type AppLangCode,
} from "@/lib/appLanguage";
import { WOMEN_LANGUAGE_LABELS, womenDisplayFont, womenRtlScript } from "@/components/Sections/women/womenLanguage";
import { hubCopy } from "@/components/Sections/women/content/hubContent";
import WomenLanguageButton from "@/components/Sections/women/WomenLanguageButton";
import WomenCultureMemoryPage from "@/components/Sections/women/Culture";
import gsap from "gsap";
import WomenPoliticalPage from "@/components/Sections/women/Political";
import WomenResistancePage from "@/components/Sections/women/Resistance";
import WomenHistoricPage from "@/components/Sections/women/Historic";
import legacyVideo from "@/assets/videos/women.webm";
;
import guitarIcon from "@/assets/images/women/icons/guitar.webp";
import crownIcon from "@/assets/images/women/icons/crown.webp";
import bookIcon from "@/assets/images/women/icons/book.webp";
import handIcon from "@/assets/images/women/icons/hand.webp";
import flowerIcon from "@/assets/images/women/icons/flower-1.webp";
import flowerIcon2 from "@/assets/images/women/icons/flower-2.webp";

type LangCode = AppLangCode;

type LegacyPageProps = {
  lang?: LangCode;
  onExploreMore?: () => void;
};

type LegacyCard = {
  id: "historic" | "knowledge" | "resistance" | "culture";
  imageSrc: string;
};

const legacyCards: LegacyCard[] = [
  { id: "historic", imageSrc: crownIcon },
  { id: "knowledge", imageSrc: bookIcon },
  { id: "resistance", imageSrc: handIcon },
  { id: "culture", imageSrc: guitarIcon },
];

export default function LegacyPage({
  lang: langProp = "en",
  onExploreMore,
}: LegacyPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const [activeSection, setActiveSection] = React.useState<"historic" | "knowledge" | "resistance" | "culture" | null>(null);
  const [lang, setLang] = React.useState<LangCode>(() => getAppLanguage());

  React.useEffect(() => {
    setLang(getAppLanguage());
  }, [langProp]);

  const languageLabel = WOMEN_LANGUAGE_LABELS[lang];
  const copy = hubCopy[lang];
  const dir = lang === "en" ? "ltr" : "rtl";
  const displayFont = womenDisplayFont(lang);
  const isRtlScript = womenRtlScript(lang);

  const handleLanguageChange = () => {
    setLang((current) => {
      const next = nextAppLanguage(current);
      setAppLanguage(next);
      return next;
    });
  };

  const openSection = (section: "historic" | "knowledge" | "resistance" | "culture") => {
    setLang(getAppLanguage());
    setActiveSection(section);
  };

  React.useLayoutEffect(() => {
    if (activeSection !== null) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-legacy-fade='true']", {
        autoAlpha: 0,
        y: 28,
      });

      gsap.set("[data-legacy-hero='true']", {
        autoAlpha: 0,
        scale: 1.04,
      });

      gsap.set("[data-legacy-card='true']", {
        autoAlpha: 0,
        y: 35,
        rotateX: -8,
        transformOrigin: "center top",
      });

      const tl = gsap.timeline({
        defaults: {
          ease: "power2.out",
        },
      });

      tl.to("[data-legacy-hero='true']", {
        autoAlpha: 1,
        scale: 1,
        duration: 1.3,
      })
        .to(
          "[data-legacy-fade='true']",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
          },
          "-=0.7",
        )
        .to(
          "[data-legacy-card='true']",
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            stagger: 0.12,
          },
          "-=0.4",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeSection]);

  if (activeSection === "historic") {
    return (
      <WomenHistoricPage
        lang={lang}
        languageLabel={languageLabel}
        onLanguageChange={handleLanguageChange}
        onBack={() => setActiveSection(null)}
      />
    );
  }

  if (activeSection === "knowledge") {
    return (
      <WomenPoliticalPage
        lang={lang}
        languageLabel={languageLabel}
        onLanguageChange={handleLanguageChange}
        onBack={() => setActiveSection(null)}
      />
    );
  }

  if (activeSection === "culture") {
    return (
      <WomenCultureMemoryPage
        lang={lang}
        onBack={() => setActiveSection(null)}
        languageLabel={languageLabel}
        onLanguageChange={handleLanguageChange}
      />
    );
  }

  if (activeSection === "resistance") {
    return (
      <WomenResistancePage
        lang={lang}
        languageLabel={languageLabel}
        onLanguageChange={handleLanguageChange}
        onBack={() => setActiveSection(null)}
      />
    );
  }

  return (
    <main
      dir={dir}
      className={`m-0 flex min-h-screen w-full max-w-full justify-center bg-[#f9f3e8] p-0 text-[#2a1534] overflow-x-hidden ${isRtlScript ? "font-noto-naskh" : ""}`}
    >
      <section
        ref={sectionRef}
        className={`relative flex min-h-screen w-[min(100vw,1400px)] flex-col overflow-x-hidden overflow-y-auto scrollbar-hide bg-[#fcf7ef] pb-12 sm:pb-0 ${isRtlScript ? "font-noto-naskh" : ""}`}
      >
        <WomenLanguageButton
          lang={lang}
          languageLabel={languageLabel}
          onLanguageChange={handleLanguageChange}
          className="z-30"
          fadeAttr="data-legacy-fade"
        />

        {/* Hero — side-by-side layout on all screens with responsive column ratios */}
        <section
          className={`relative z-10 grid grid-cols-[1.1fr_0.9fr] sm:grid-cols-[1fr_1fr] lg:grid-cols-[0.95fr_1.05fr] xl:grid-cols-[0.9fr_1.1fr] items-start gap-2 sm:gap-4 ${
            dir === "rtl" ? "pl-0 pr-4 sm:pr-8 lg:pr-16" : "pl-4 pr-0 sm:pl-8 lg:pl-16"
          }`}
        >
          <div data-legacy-fade="true" className="relative z-20 max-w-[700px] pt-12 sm:pt-12 lg:pt-16">
            <div className="mb-2 flex items-center gap-2 text-[#b4864d] sm:mb-5 sm:gap-5">
              <span className="h-px w-8 bg-[#d4b98f] sm:w-20" />
              <Sparkles className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
            </div>

            <h1 className={`${displayFont} text-[clamp(20px,5.5vw,104px)] font-medium leading-[0.95] tracking-tight text-[#2c1337] drop-shadow-[0_1px_2px_rgba(252,247,239,0.85)]`}>
              {copy.title}
            </h1>

            <h2 className={`mt-2 ${displayFont} font-light text-[clamp(11px,2.5vw,34px)] text-[#a75a69] sm:mt-4 drop-shadow-[0_1px_2px_rgba(252,247,239,0.85)] whitespace-pre-line`}>
              {copy.subtitle}
            </h2>

            <div className="my-3 flex w-full max-w-[290px] items-center gap-3 text-[#b4864d] sm:my-9">
              <span className="h-px flex-1 bg-[#d4b98f]" />
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="h-px flex-1 bg-[#d4b98f]" />
            </div>

            <p className="max-w-[420px] text-[clamp(11px,2.2vw,20px)] leading-[1.5] text-[#353445] sm:leading-[1.75] drop-shadow-[0_1px_1px_rgba(252,247,239,0.9)]">
              {copy.description}
            </p>
          </div>

          {/* Expanded width and negative margin allows the illustration to bleed under the text for a much larger visual scale */}
          <div
            data-legacy-hero="true"
            className={`pointer-events-none relative self-stretch h-full w-[200%] pt-14 sm:w-[155%] sm:pt-0 md:w-[165%] lg:w-[175%] ${
              dir === "rtl"
                ? "origin-top-left scale-[1.15] sm:scale-100 mr-[-100%] sm:mr-[-55%] md:mr-[-65%] lg:mr-[-75%]"
                : "origin-top-right scale-[1.15] sm:scale-100 ml-[-100%] sm:ml-[-55%] md:ml-[-65%] lg:ml-[-75%]"
            }`}
          >
            <div className="relative h-full w-full">
              <video
                src={legacyVideo}
                aria-label="Kurdish women legacy"
                className={`h-[clamp(260px,68vw,520px)] w-full object-contain object-right-top sm:h-full sm:object-right-center ${dir === "rtl" ? "-scale-x-100" : ""}`}
                autoPlay
                loop
                muted
                playsInline
              />
              <div
                className="absolute inset-x-0 top-0 z-10 h-[clamp(33px,3vw,20px)] bg-gradient-to-b from-[#fcf7ef] from-0% via-[#fcf7ef]/85 via-35% via-[#fcf7ef]/45 via-65% to-transparent sm:hidden"
                aria-hidden
              />
              <div
                className="absolute inset-x-0 bottom-0 h-[clamp(28px,6vh,120px)] bg-gradient-to-t from-[#fcf7ef] via-[#fcf7ef]/40 to-transparent"
                aria-hidden
              />
            </div>
          </div>
        </section>

        {/* Cards — centered row aligned with quote/journey sections */}
        <section className="relative z-20 mt-4 sm:mt-8 lg:mt-10 mx-4 sm:mx-8 lg:mx-16">
          <div className="mx-auto grid w-full max-w-[1280px] grid-cols-4 gap-2 sm:gap-4 lg:gap-5">
          {legacyCards.map((card) => {
            return (
              <button
                data-legacy-card="true"
                key={card.id}
                type="button"
                onClick={() => openSection(card.id)}
                className="flex min-w-0 h-[clamp(112px,30vw,150px)] flex-col rounded-[16px] border border-[#dfcdb7] bg-white/55 px-1.5 pb-2 pt-2.5 shadow-[inset_0_0_24px_rgba(159,116,81,0.08)] backdrop-blur-sm sm:h-[clamp(170px,24vw,260px)] sm:rounded-[34px] sm:px-3 sm:pb-3 sm:pt-4 lg:h-[310px] lg:rounded-[56px] lg:px-5 lg:pb-5 lg:pt-7"
              >
                <div className="flex-1 flex items-center justify-center overflow-hidden">
                  <img
                    src={card.imageSrc}
                    alt={copy.cards[card.id]}
                    className="max-h-[84%] max-w-[84%] object-contain sm:max-h-full sm:max-w-full"
                  />
                </div>

                <p className={`mt-auto text-center ${displayFont} text-[clamp(10px,2.5vw,22px)] leading-tight text-[#2c1736]`}>
                  {copy.cards[card.id]}
                </p>

                <div className="mt-1 flex items-center justify-center gap-1 text-[#b4864d] sm:mt-2 sm:gap-2">
                  <span className="h-px w-3.5 bg-[#d4b98f] sm:w-7" />
                  <span className="h-1.5 w-1.5 rotate-45 border border-[#b4864d] sm:h-2 sm:w-2" />
                  <span className="h-px w-3.5 bg-[#d4b98f] sm:w-7" />
                </div>
              </button>
            );
          })}
          </div>
        </section>

        {/* Quote Box with optimized responsive typography and flower positioning */}
        <section
          data-legacy-fade="true"
          className="relative z-20 mx-4 mt-6 flex min-h-[220px] items-center justify-center overflow-hidden rounded-[22px] border border-[#dfcdb7] bg-white/65 px-4 py-8 text-center shadow-[0_10px_25px_rgba(67,35,45,0.12)] sm:mx-8 sm:mt-8 sm:min-h-[300px] sm:rounded-[28px] sm:px-8 sm:py-0 lg:mx-16 lg:min-h-[420px]"
        >
          {/* Left flower decoration — shifted slightly more inward on mobile viewports */}
          <div className="pointer-events-none absolute left-[-45px] sm:left-[-62px] lg:left-[-100px] top-1/2 z-[1] -translate-y-1/2">
            <div
              aria-hidden
              className="absolute left-[15%] top-1/2 z-0 h-[clamp(100px,52vw,440px)] w-[clamp(88px,48vw,360px)] -translate-x-1/2 -translate-y-1/2 rounded-[48%] bg-[radial-gradient(ellipse_72%_58%_at_45%_48%,rgba(189,104,119,0.55)_0%,rgba(216,166,174,0.38)_42%,rgba(245,208,214,0.2)_62%,transparent_78%)] blur-[28px] sm:blur-[36px]"
            />
            <div
              aria-hidden
              className="absolute left-[35%] top-[42%] z-0 h-[clamp(72px,36vw,280px)] w-[clamp(80px,40vw,300px)] -translate-x-1/2 -translate-y-1/2 rounded-[55%] bg-[radial-gradient(ellipse_65%_55%_at_35%_45%,rgba(182,95,113,0.42)_0%,rgba(232,180,188,0.28)_50%,transparent_72%)] blur-[20px]"
            />
            <img
              src={flowerIcon2}
              alt="Quote decoration"
              className="relative z-[1] h-[clamp(64px,60vw,520px)] w-[clamp(92px,44vw,400px)] object-contain drop-shadow-[0_4px_20px_rgba(90,42,62,0.12)]"
            />
          </div>

          {/* Centered Quote text scaled down on mobile screen widths to prevent overlapping */}
          <div className="relative z-10 max-w-2xl px-1 sm:px-0">
            <p className={`${displayFont} text-[clamp(13px,4.5vw,36px)] leading-snug text-[#281234]`}>
              {copy.quoteLine1}
              <br />
              {copy.quoteLine2}
              <br />
              {copy.quoteLine3}
            </p>
          </div>

          {/* Right flower decoration — shifted slightly more inward on mobile viewports */}
          <div className="pointer-events-none absolute right-[-40px] sm:right-[-52px] lg:right-[-80px] top-1/2 z-[1] -translate-y-1/2">
            <div
              aria-hidden
              className="absolute right-[12%] top-1/2 z-0 h-[clamp(96px,50vw,420px)] w-[clamp(80px,44vw,340px)] translate-x-1/2 -translate-y-1/2 rounded-[52%] bg-[radial-gradient(ellipse_70%_56%_at_55%_50%,rgba(189,104,119,0.52)_0%,rgba(216,166,174,0.36)_40%,rgba(245,208,214,0.18)_60%,transparent_76%)] blur-[28px] sm:blur-[36px]"
            />
            <div
              aria-hidden
              className="absolute right-[28%] top-[44%] z-0 h-[clamp(68px,34vw,260px)] w-[clamp(76px,38vw,280px)] translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(ellipse_62%_52%_at_65%_48%,rgba(182,95,113,0.4)_0%,rgba(232,180,188,0.26)_48%,transparent_70%)] blur-[20px]"
            />
            <img
              src={flowerIcon}
              alt="Quote decoration"
              className="relative z-[1] h-[clamp(64px,56vw,520px)] w-[clamp(64px,42vw,400px)] object-contain drop-shadow-[0_4px_20px_rgba(90,42,62,0.12)]"
            />
          </div>
        </section>

        {/* Journey Card */}
        <section
          data-legacy-fade="true"
          className="relative z-20 mx-4 mb-6 mt-6 overflow-hidden px-4 py-4 text-white sm:mx-8 sm:mt-8 sm:px-6 sm:py-4 lg:mx-16 lg:px-10 shrink-0"
        >
          
        </section>
      </section>
    </main>
  );
}