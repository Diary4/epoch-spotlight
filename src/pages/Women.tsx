import React from "react";
import { Sparkles } from "lucide-react";
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
  const canvasRef = React.useRef<HTMLDivElement | null>(null);
  const [fit, setFit] = React.useState({ scale: 1, x: 0 });
  const [activeSection, setActiveSection] = React.useState<"historic" | "knowledge" | "resistance" | "culture" | null>(null);
  const [lang, setLang] = React.useState<LangCode>(() => getAppLanguage());

  // Fixed design canvas (1400px wide) — same fit logic as The System / Parliament:
  // measure the natural height and scale uniformly so the page looks identical on every screen.
  const DESIGN_WIDTH = 1400;

  React.useEffect(() => {
    setLang(getAppLanguage());
  }, [langProp]);

  React.useEffect(() => {
    if (activeSection !== null) return;
    const recompute = () => {
      const el = canvasRef.current;
      if (!el) return;
      const naturalHeight = el.offsetHeight;
      if (!naturalHeight) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const scale = Math.min(vw / DESIGN_WIDTH, vh / naturalHeight);
      const x = (vw - DESIGN_WIDTH * scale) / 2;
      setFit({ scale, x });
    };

    recompute();
    window.addEventListener("resize", recompute);
    const el = canvasRef.current;
    const ro = el ? new ResizeObserver(recompute) : null;
    if (el && ro) ro.observe(el);
    return () => {
      window.removeEventListener("resize", recompute);
      ro?.disconnect();
    };
  }, [activeSection]);

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
    <div
      dir={dir}
      className={`relative h-screen w-screen overflow-hidden bg-[#f9f3e8] ${isRtlScript ? "font-noto-naskh" : ""}`}
      style={{ width: "100vw", height: "100vh" }}
    >
      <div
        ref={canvasRef}
        style={{
          width: `${DESIGN_WIDTH}px`,
          transform: `translate(${fit.x}px, 0px) scale(${fit.scale})`,
          transformOrigin: "top left",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <main className={`m-0 w-full bg-[#fcf7ef] text-[#2a1534] ${isRtlScript ? "font-noto-naskh" : ""}`}>
          <section
            ref={sectionRef}
            className="relative flex w-full flex-col overflow-hidden bg-[#fcf7ef] pb-12"
          >
            <WomenLanguageButton
              lang={lang}
              languageLabel={languageLabel}
              onLanguageChange={handleLanguageChange}
              className="z-30"
              fadeAttr="data-legacy-fade"
            />

            {/* Hero — fixed side-by-side layout */}
            <section
              className={`relative z-10 grid grid-cols-[0.9fr_1.1fr] items-start gap-4 ${
                dir === "rtl" ? "pl-0 pr-16" : "pl-16 pr-0"
              }`}
            >
              <div data-legacy-fade="true" className="relative z-20 max-w-[520px] pt-16">
                <div className="mb-5 flex items-center gap-5 text-[#b4864d]">
                  <span className="h-px w-20 bg-[#d4b98f]" />
                  <Sparkles className="h-5 w-5" />
                </div>

                <h1 className={`${displayFont} text-[104px] font-medium leading-[0.95] tracking-tight text-[#2c1337] drop-shadow-[0_1px_2px_rgba(252,247,239,0.85)]`}>
                  {copy.title}
                </h1>

                <h2 className={`mt-4 ${displayFont} font-light text-[34px] text-[#a75a69] drop-shadow-[0_1px_2px_rgba(252,247,239,0.85)] whitespace-pre-line`}>
                  {copy.subtitle}
                </h2>

                <div className="my-9 flex w-full max-w-[290px] items-center gap-3 text-[#b4864d]">
                  <span className="h-px flex-1 bg-[#d4b98f]" />
                  <Sparkles className="h-5 w-5" />
                  <span className="h-px flex-1 bg-[#d4b98f]" />
                </div>

                <p className="max-w-[300px] text-[18px] leading-[1.5] text-[#353445] drop-shadow-[0_1px_2px_rgba(252,247,239,0.95)]">
                  {copy.description}
                </p>
              </div>

              {/* Illustration bleeds under the text for a larger visual scale */}
              <div
                data-legacy-hero="true"
                className={`pointer-events-none relative self-stretch h-full w-[145%] ${
                  dir === "rtl" ? "origin-top-left mr-[-45%]" : "origin-top-right ml-[-45%]"
                }`}
              >
                <div className="relative h-full w-full">
                  <div
                    className={`pointer-events-none absolute inset-y-0 z-10 w-[45%] ${
                      dir === "rtl"
                        ? "right-0 bg-gradient-to-l from-[#fcf7ef] via-[#fcf7ef]/85 to-transparent"
                        : "left-0 bg-gradient-to-r from-[#fcf7ef] via-[#fcf7ef]/85 to-transparent"
                    }`}
                    aria-hidden
                  />
                  <video
                    src={legacyVideo}
                    aria-label="Kurdish women legacy"
                    className={`h-full w-full object-contain object-right-center ${dir === "rtl" ? "-scale-x-100" : ""}`}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 h-[120px] bg-gradient-to-t from-[#fcf7ef] via-[#fcf7ef]/40 to-transparent"
                    aria-hidden
                  />
                </div>
              </div>
            </section>

            {/* Cards — centered row aligned with quote section */}
            <section className="relative z-20 mt-10 mx-16">
              <div className="mx-auto grid w-full max-w-[1280px] grid-cols-4 gap-5">
              {legacyCards.map((card) => {
                return (
                  <button
                    data-legacy-card="true"
                    key={card.id}
                    type="button"
                    onClick={() => openSection(card.id)}
                    className="flex min-w-0 h-[310px] flex-col rounded-[56px] border border-[#dfcdb7] bg-white/55 px-5 pb-5 pt-7 shadow-[inset_0_0_24px_rgba(159,116,81,0.08)] backdrop-blur-sm"
                  >
                    <div className="flex-1 flex items-center justify-center overflow-hidden">
                      <img
                        src={card.imageSrc}
                        alt={copy.cards[card.id]}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    <p className={`mt-auto text-center ${displayFont} text-[22px] leading-tight text-[#2c1736]`}>
                      {copy.cards[card.id]}
                    </p>

                    <div className="mt-2 flex items-center justify-center gap-2 text-[#b4864d]">
                      <span className="h-px w-7 bg-[#d4b98f]" />
                      <span className="h-2 w-2 rotate-45 border border-[#b4864d]" />
                      <span className="h-px w-7 bg-[#d4b98f]" />
                    </div>
                  </button>
                );
              })}
              </div>
            </section>

            {/* Quote Box */}
            <section
              data-legacy-fade="true"
              className="relative z-20 mx-16 mt-8 flex min-h-[420px] items-center justify-center overflow-hidden rounded-[28px] border border-[#dfcdb7] bg-white/65 px-8 py-0 text-center shadow-[0_10px_25px_rgba(67,35,45,0.12)]"
            >
              {/* Left flower decoration */}
              <div className="pointer-events-none absolute left-[-100px] top-1/2 z-[1] -translate-y-1/2">
                <div
                  aria-hidden
                  className="absolute left-[15%] top-1/2 z-0 h-[440px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-[48%] bg-[radial-gradient(ellipse_72%_58%_at_45%_48%,rgba(189,104,119,0.55)_0%,rgba(216,166,174,0.38)_42%,rgba(245,208,214,0.2)_62%,transparent_78%)] blur-[36px]"
                />
                <div
                  aria-hidden
                  className="absolute left-[35%] top-[42%] z-0 h-[280px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-[55%] bg-[radial-gradient(ellipse_65%_55%_at_35%_45%,rgba(182,95,113,0.42)_0%,rgba(232,180,188,0.28)_50%,transparent_72%)] blur-[20px]"
                />
                <img
                  src={flowerIcon2}
                  alt="Quote decoration"
                  className="relative z-[1] h-[520px] w-[400px] object-contain drop-shadow-[0_4px_20px_rgba(90,42,62,0.12)]"
                />
              </div>

              {/* Centered Quote text */}
              <div className="relative z-10 max-w-2xl px-0">
                <p className={`${displayFont} text-[36px] leading-snug text-[#281234]`}>
                  {copy.quoteLine1}
                  <br />
                  {copy.quoteLine2}
                  <br />
                  {copy.quoteLine3}
                </p>
              </div>

              {/* Right flower decoration */}
              <div className="pointer-events-none absolute right-[-80px] top-1/2 z-[1] -translate-y-1/2">
                <div
                  aria-hidden
                  className="absolute right-[12%] top-1/2 z-0 h-[420px] w-[340px] translate-x-1/2 -translate-y-1/2 rounded-[52%] bg-[radial-gradient(ellipse_70%_56%_at_55%_50%,rgba(189,104,119,0.52)_0%,rgba(216,166,174,0.36)_40%,rgba(245,208,214,0.18)_60%,transparent_76%)] blur-[36px]"
                />
                <div
                  aria-hidden
                  className="absolute right-[28%] top-[44%] z-0 h-[260px] w-[280px] translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(ellipse_62%_52%_at_65%_48%,rgba(182,95,113,0.4)_0%,rgba(232,180,188,0.26)_48%,transparent_70%)] blur-[20px]"
                />
                <img
                  src={flowerIcon}
                  alt="Quote decoration"
                  className="relative z-[1] h-[520px] w-[400px] object-contain drop-shadow-[0_4px_20px_rgba(90,42,62,0.12)]"
                />
              </div>
            </section>
          </section>
        </main>
      </div>
    </div>
  );
}