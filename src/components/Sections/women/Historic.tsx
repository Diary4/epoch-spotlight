import React from "react";
import { ArrowLeft, Sparkles, Quote } from "lucide-react";
import { detailBackIconSize } from "@/constants/backNavigation";
import gsap from "gsap";

import mainHero from "@/assets/images/women/historic.png";

import WomenLanguageButton from "@/components/Sections/women/WomenLanguageButton";
import WomenDetailPanel from "@/components/Sections/women/WomenDetailPanel";
import { runWomenDetailIntroAnimation } from "@/components/Sections/women/womenDetailAnimation";
import { getAppLanguage, type AppLangCode } from "@/lib/appLanguage";
import type { WomenLanguageProps } from "@/components/Sections/women/womenLanguage";
import { womenDir, womenDisplayFont, womenRtlScript } from "@/components/Sections/women/womenLanguage";
import {
  getHistoricDetail,
  getHistoricPageCopy,
  getHistoricWomen,
  historicDetailPortraits,
  historicDetailToPanelCards,
} from "@/components/Sections/women/content/historicContent";

type HistoricPageProps = WomenLanguageProps & {
  onBack?: () => void;
};

function runListIntroAnimation(sectionRef: React.RefObject<HTMLElement | null>) {
  if (!sectionRef.current) return () => {};
  const ctx = gsap.context(() => {
    gsap.set("[data-hist-fade='true']", { autoAlpha: 0, y: 28 });
    gsap.set("[data-hist-hero='true']", { autoAlpha: 0, scale: 1.04 });
    gsap.set("[data-hist-card='true']", {
      autoAlpha: 0,
      y: 35,
      rotateX: -8,
      transformOrigin: "center top",
    });

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.to("[data-hist-hero='true']", { autoAlpha: 1, scale: 1, duration: 1.2 })
      .to("[data-hist-fade='true']", { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12 }, "-=0.7")
      .to(
        "[data-hist-card='true']",
        { autoAlpha: 1, y: 0, rotateX: 0, duration: 0.85, stagger: 0.1 },
        "-=0.35",
      );

    gsap.to("[data-floating='true']", {
      y: -10,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.18,
    });
  }, sectionRef);
  return () => ctx.revert();
}


export default function WomenHistoricPage({
  onBack,
  lang: langProp,
  languageLabel = "ENGLISH",
  onLanguageChange,
}: HistoricPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const canvasRef = React.useRef<HTMLDivElement | null>(null);
  const [fit, setFit] = React.useState({ scale: 1, x: 0 });
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [internalLang, setInternalLang] = React.useState<AppLangCode>(() => getAppLanguage());
  const lang = langProp ?? internalLang;

  // Fixed design canvas (1400px wide) — same fit logic as The System / Women hub:
  // measure the natural height and scale uniformly so the whole page fits the window on every screen.
  const DESIGN_WIDTH = 1400;

  const copy = getHistoricPageCopy(lang);
  const historicWomen = getHistoricWomen(lang);
  const detail = selectedId ? getHistoricDetail(selectedId, lang) : null;
  const dir = womenDir(lang);
  const displayFont = womenDisplayFont(lang);
  const isRtlScript = womenRtlScript(lang);

  const handleLanguageChange = () => {
    if (onLanguageChange) {
      onLanguageChange();
      return;
    }
    setInternalLang((current) => (current === "en" ? "ku" : current === "ku" ? "ar" : "en"));
  };

  React.useLayoutEffect(() => {
    const cleanup = detail
      ? runWomenDetailIntroAnimation(sectionRef)
      : runListIntroAnimation(sectionRef);
    return cleanup;
  }, [selectedId]);

  React.useEffect(() => {
    if (selectedId) return;
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
  }, [selectedId, lang]);

  const handleBack = () => {
    if (selectedId) setSelectedId(null);
    else onBack?.();
  };

  // Detail view keeps its own scrolling full-screen layout.
  if (detail && selectedId) {
    return (
      <main
        dir={dir}
        className={`m-0 flex min-h-screen w-full max-w-full flex-col justify-start overflow-x-hidden p-0 sm:w-screen bg-[#f7efe3] text-[#2d1436] ${isRtlScript ? "font-noto-naskh" : ""}`}
      >
        <section
          ref={sectionRef}
          className="relative flex min-h-screen w-full max-w-full flex-col overflow-x-hidden overflow-y-auto scrollbar-hide bg-transparent sm:w-[min(100vw,1400px)]"
        >
          <WomenLanguageButton
            lang={lang}
            languageLabel={languageLabel}
            onLanguageChange={handleLanguageChange}
          />

          <button
            type="button"
            onClick={handleBack}
            className={`absolute top-4 z-[60] flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#2c1337] shadow-md backdrop-blur-sm transition-all hover:bg-white sm:top-8 sm:h-14 sm:w-14 ${
              dir === "rtl" ? "right-4 sm:right-8" : "left-4 sm:left-8"
            }`}
            aria-label={copy.backToList}
          >
            <ArrowLeft size={detailBackIconSize} className={dir === "rtl" ? "rotate-180" : ""} />
          </button>

          <WomenDetailPanel
            dir={dir}
            lang={lang}
            nameLine1={detail.nameLine1}
            nameLine2={detail.nameLine2}
            role={detail.role}
            metaLine={detail.metaLine}
            intro={detail.intro}
            portraitSrc={historicDetailPortraits[selectedId]}
            portraitAlt={detail.portraitAlt}
            cards={historicDetailToPanelCards(detail, lang)}
            quote={detail.quote}
            quoteAuthor={detail.quoteAuthor}
            greatestAchievement={detail.greatestAchievement}
            whySheMatters={detail.whySheMatters}
            didYouKnow={detail.didYouKnow}
            listIcon={detail.listIcon}
          />
        </section>
      </main>
    );
  }

  // List view — fixed design canvas scaled uniformly so everything fits the window.
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
            />

            <button
              type="button"
              onClick={handleBack}
              className={`absolute top-8 z-[60] flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#2c1337] shadow-md backdrop-blur-sm transition-all hover:bg-white ${
                dir === "rtl" ? "right-8" : "left-8"
              }`}
              aria-label={copy.backToWomen}
            >
              <ArrowLeft size={detailBackIconSize} className={dir === "rtl" ? "rotate-180" : ""} />
            </button>

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_8%,rgba(205,143,151,0.18),transparent_34%),radial-gradient(circle_at_22%_52%,rgba(212,185,143,0.12),transparent_30%)]" />

            {/* Hero — fixed side-by-side layout */}
            <section
              className={`relative z-10 grid grid-cols-[0.9fr_1.1fr] items-center gap-4 pt-24 ${
                dir === "rtl" ? "pl-0 pr-10" : "pl-10 pr-0"
              }`}
            >
              <div
                data-hist-fade="true"
                className={`relative z-20 max-w-[700px] ${dir === "rtl" ? "pl-0" : "pr-0"}`}
              >
                <h1 className={`${displayFont} text-[96px] font-medium leading-[0.95] tracking-tight text-[#2c1337]`}>
                  {copy.heroTitle1}
                  <br />
                  {copy.heroTitle2}
                </h1>

                <div className="my-8 flex w-full max-w-[285px] items-center gap-3 text-[#b4864d]">
                  <span className="h-px flex-1 bg-[#d4b98f]" />
                  <Sparkles className="h-6 w-6" />
                  <span className="h-px flex-1 bg-[#d4b98f]" />
                </div>

                <h2 className={`whitespace-pre-line ${displayFont} text-[34px] text-[#a75a69]`}>
                  {copy.heroSubtitle}
                </h2>

                <p className="mt-5 max-w-[400px] text-[24px] leading-[1.45] text-[#56505a]">
                  {copy.heroIntro}
                </p>
              </div>

              {/* Hero image bleeds under the text */}
              <div
                data-hist-hero="true"
                className={`pointer-events-none relative self-stretch h-full w-[175%] ${
                  dir === "rtl" ? "mr-[-75%]" : "ml-[-75%]"
                }`}
              >
                <img
                  src={mainHero}
                  alt="Historic Women"
                  className={`h-full w-full object-contain object-right-center ${dir === "rtl" ? "-scale-x-100" : ""}`}
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-[110px] bg-gradient-to-t from-[#fcf7ef] via-[#fcf7ef]/40 to-transparent"
                  aria-hidden
                />
              </div>
            </section>

            {/* Cards grid */}
            <section className="relative z-20 mt-6 grid grid-cols-4 gap-6 px-10">
              {historicWomen.map((woman) => (
                <button
                  type="button"
                  data-hist-card="true"
                  key={woman.id}
                  onClick={() => setSelectedId(woman.id)}
                  className={`relative flex min-w-0 cursor-pointer flex-col overflow-hidden rounded-[24px] border border-[#dfcdb7] bg-white/65 p-5 shadow-[0_10px_25px_rgba(67,35,45,0.12)] transition hover:border-[#d8b979] ${
                    dir === "rtl" ? "text-right" : "text-left"
                  }`}
                >
                  <div className="relative mx-auto h-[260px] w-full overflow-hidden rounded-[20px]">
                    <img
                      src={historicDetailPortraits[woman.id]}
                      alt={woman.name}
                      className="relative z-10 h-full w-full object-cover object-[center_20%]"
                    />
                  </div>

                  <h3 className={`mt-4 ${displayFont} text-[32px] leading-tight text-[#2c1736]`}>
                    {woman.name}
                  </h3>

                  <p className={`mt-2 ${displayFont} text-[20px] italic text-[#a75a69]`}>
                    ({woman.role})
                  </p>
                </button>
              ))}
            </section>

            {/* Quotes grid */}
            <section className="relative z-20 mt-6 grid w-full grid-cols-3 gap-6 px-10">
              {copy.quotes.map(({ text, author }) => (
                <article
                  data-hist-card="true"
                  key={text}
                  className="relative flex min-h-[160px] min-w-0 flex-col justify-center overflow-hidden rounded-[24px] border border-[#dfcdb7] bg-white/65 px-8 py-6 shadow-[0_10px_25px_rgba(67,35,45,0.1)]"
                >
                  <Quote className="mb-3 h-9 w-9 shrink-0 fill-[#d98994]/70 text-[#d98994]/70" />

                  <p className={`${displayFont} text-[22px] leading-snug text-[#3a293f]`}>{text}</p>

                  <p className={`mt-3 ${displayFont} text-[16px] italic text-[#a75a69]`}>
                    — {author}
                  </p>

                  <div
                    data-floating="true"
                    className="pointer-events-none absolute bottom-3 right-6 h-20 w-16 rounded-full bg-[#d99bad]/20 blur-xl"
                  />

                  <div className="mt-4 flex w-full max-w-[120px] items-center gap-2 text-[#b4864d]">
                    <span className="h-px flex-1 bg-[#d4b98f]" />
                    <Sparkles className="h-4 w-4" />
                    <span className="h-px flex-1 bg-[#d4b98f]" />
                  </div>
                </article>
              ))}
            </section>
          </section>
        </main>
      </div>
    </div>
  );
}