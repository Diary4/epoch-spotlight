import React from "react";
import { ArrowLeft, Sparkles, Quote } from "lucide-react";
import gsap from "gsap";

import mainHero from "@/assets/images/women/le-1.webp";

import WomenLanguageButton from "@/components/Sections/women/WomenLanguageButton";
import WomenDetailPanel from "@/components/Sections/women/WomenDetailPanel";
import { runWomenDetailIntroAnimation } from "@/components/Sections/women/womenDetailAnimation";
import { getAppLanguage, type AppLangCode } from "@/lib/appLanguage";
import type { WomenLanguageProps } from "@/components/Sections/women/womenLanguage";
import { womenDir } from "@/components/Sections/women/womenLanguage";
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
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [internalLang, setInternalLang] = React.useState<AppLangCode>(() => getAppLanguage());
  const lang = langProp ?? internalLang;

  const copy = getHistoricPageCopy(lang);
  const historicWomen = getHistoricWomen(lang);
  const detail = selectedId ? getHistoricDetail(selectedId, lang) : null;
  const dir = womenDir(lang);

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

  const handleBack = () => {
    if (selectedId) setSelectedId(null);
    else onBack?.();
  };

  return (
    <main
      dir={dir}
      className={`m-0 flex w-full max-w-full flex-col justify-start overflow-x-hidden p-0 sm:w-screen ${
        selectedId ? "min-h-min bg-[#f7efe3] text-[#2d1436]" : "min-h-screen bg-[#f9f3e8] text-[#2a1534]"
      }`}
    >
      <section
        ref={sectionRef}
        className={`relative flex w-full max-w-full flex-col overflow-x-hidden overflow-y-auto sm:w-[min(100vw,1400px)] ${
          selectedId ? "min-h-min bg-transparent pb-6 sm:pb-0" : "min-h-0 bg-[#fcf7ef]"
        }`}
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
          aria-label={selectedId ? copy.backToList : copy.backToWomen}
        >
          <ArrowLeft className={`h-6 w-6 sm:h-7 sm:w-7 ${dir === "rtl" ? "rotate-180" : ""}`} />
        </button>

        {detail && selectedId ? (
          <WomenDetailPanel
            dir={dir}
            nameLine1={detail.nameLine1}
            nameLine2={detail.nameLine2}
            role={detail.role}
            intro={detail.intro}
            portraitSrc={historicDetailPortraits[selectedId]}
            portraitAlt={detail.portraitAlt}
            cards={historicDetailToPanelCards(detail, lang)}
            quote={detail.quote}
            listIcon={detail.listIcon}
          />
        ) : (
          <>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_8%,rgba(205,143,151,0.18),transparent_34%),radial-gradient(circle_at_22%_52%,rgba(212,185,143,0.12),transparent_30%)]" />

            {/* Hero — side-by-side on every screen (text left, image right) */}
            <section
              className={`relative z-10 grid grid-cols-[1.05fr_0.95fr] lg:grid-cols-[1fr_1.2fr] xl:grid-cols-[0.9fr_1.3fr] items-center gap-2 pt-20 sm:gap-4 sm:pt-24 ${
                dir === "rtl" ? "pl-0 pr-5 sm:pr-8 lg:pr-10" : "pl-5 pr-0 sm:pl-8 lg:pl-10"
              }`}
            >
              <div data-hist-fade="true" className="relative z-20 max-w-[700px]">
                <h1 className="font-serif text-[clamp(26px,6.5vw,96px)] font-medium leading-[0.95] tracking-tight text-[#2c1337]">
                  {copy.heroTitle1}
                  <br />
                  {copy.heroTitle2}
                </h1>

                <div className="my-3 flex w-full max-w-[285px] items-center gap-3 text-[#b4864d] sm:my-6 lg:my-8">
                  <span className="h-px flex-1 bg-[#d4b98f]" />
                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                  <span className="h-px flex-1 bg-[#d4b98f]" />
                </div>

                <h2 className="whitespace-pre-line font-serif text-[clamp(14px,2.8vw,34px)] text-[#a75a69]">
                  {copy.heroSubtitle}
                </h2>

                <p className="mt-2 max-w-[400px] text-[clamp(11px,2.2vw,24px)] leading-[1.5] text-[#56505a] sm:mt-4 lg:mt-5 lg:leading-[1.45]">
                  {copy.heroIntro}
                </p>
              </div>

              {/* Hero image — fully visible (contain), scales up on bigger screens */}
              <div data-hist-hero="true" className="pointer-events-none relative self-stretch">
                <img
                  src={mainHero}
                  alt="Historic Women"
                  className={`h-full w-full object-contain object-top ${dir === "rtl" ? "-scale-x-100" : ""}`}
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-[clamp(24px,5vh,110px)] bg-gradient-to-t from-[#fcf7ef] via-[#fcf7ef]/40 to-transparent"
                  aria-hidden
                />
              </div>
            </section>

            {/* Cards grid */}
            <section
              className="relative z-20 mt-6 gap-2 px-3 sm:gap-6 sm:px-5 lg:px-10"
              style={{ display: "grid", gridTemplateColumns: "repeat(6, minmax(0, 1fr))" }}
            >
              {historicWomen.map((woman, index) => (
                <button
                  type="button"
                  data-hist-card="true"
                  key={woman.id}
                  onClick={() => setSelectedId(woman.id)}
                  style={{ gridColumn: index < 3 ? "span 2" : "span 3" }}
                  className={`relative flex min-w-0 cursor-pointer flex-col overflow-hidden rounded-[14px] border border-[#dfcdb7] bg-white/65 p-2 shadow-[0_10px_25px_rgba(67,35,45,0.12)] transition hover:border-[#d8b979] sm:rounded-[24px] sm:p-5 ${
                    dir === "rtl" ? "text-right" : "text-left"
                  }`}
                >
                  <div className="relative mx-auto h-[min(200px,38vw)] w-full overflow-hidden rounded-[10px] sm:h-[220px] sm:rounded-[20px] lg:h-[260px]">
                    <img
                      src={historicDetailPortraits[woman.id]}
                      alt={woman.name}
                      className="relative z-10 h-full w-full object-cover object-[center_20%]"
                    />
                  </div>

                  <h3 className="mt-1.5 font-serif text-[clamp(10px,3vw,32px)] leading-tight text-[#2c1736] sm:mt-4 sm:text-[clamp(22px,2.4vw,32px)]">
                    {woman.name}
                  </h3>

                  <p className="mt-0.5 font-serif text-[clamp(8px,2.2vw,20px)] italic text-[#a75a69] sm:mt-2 sm:text-[clamp(15px,1.6vw,20px)]">
                    ({woman.role})
                  </p>

                  <div className="my-1.5 flex w-full max-w-[60px] items-center gap-1 text-[#b4864d] sm:my-3 sm:max-w-[96px] sm:gap-2">
                    <span className="h-px flex-1 bg-[#d4b98f]" />
                    <Sparkles className="h-2.5 w-2.5 sm:h-4 sm:w-4" />
                    <span className="h-px flex-1 bg-[#d4b98f]" />
                  </div>

                  <p
                    className={`hidden text-[14px] leading-relaxed text-[#4a3f50] sm:block sm:text-[15px] ${
                      dir === "rtl" ? "text-right" : "text-left"
                    }`}
                  >
                    {woman.teaser}
                  </p>
                </button>
              ))}
            </section>

            {/* Quotes grid */}
            <section
              className="relative z-20 mt-6 gap-2 px-3 sm:gap-6 sm:px-5 md:gap-6 lg:px-10"
              style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
            >
              {copy.quotes.map(({ text, author }) => (
                <article
                  data-hist-card="true"
                  key={text}
                  className="relative flex min-h-[80px] min-w-0 flex-col justify-center overflow-hidden rounded-[14px] border border-[#dfcdb7] bg-white/65 px-2 py-3 shadow-[0_10px_25px_rgba(67,35,45,0.1)] sm:min-h-[160px] sm:rounded-[24px] sm:px-8 sm:py-6"
                >
                  <Quote className="mb-1 h-4 w-4 shrink-0 fill-[#d98994]/70 text-[#d98994]/70 sm:mb-3 sm:h-9 sm:w-9" />

                  <p className="font-serif text-[clamp(9px,2.5vw,22px)] leading-snug text-[#3a293f] sm:text-[clamp(17px,2.8vw,22px)]">{text}</p>

                  <p className="mt-2 font-serif text-[clamp(8px,2vw,16px)] italic text-[#a75a69] sm:mt-3 sm:text-[clamp(14px,1.8vw,16px)]">
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

            {/* Legacy banner */}
            <section
              data-hist-fade="true"
              className="relative z-20 mx-5 mt-6 mb-10 flex min-h-[120px] flex-col items-start gap-4 overflow-hidden rounded-[24px] border border-[#d9bd7e] bg-white/55 px-6 py-6 shadow-[0_8px_22px_rgba(67,35,45,0.1)] sm:min-h-[145px] sm:flex-row sm:items-center sm:px-12 lg:mx-10"
            >
              <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full border border-[#e4c78f] bg-[#fff8ed] sm:h-28 sm:w-28">
                <div className="text-[40px] text-[#b4864d] sm:text-[58px]">♧</div>
              </div>

              <div className="min-w-0 sm:ml-12 lg:ml-20">
                <h2 className="font-serif text-[clamp(28px,5vw,44px)] leading-none text-[#2c1736]">
                  {copy.legacyTitle}
                </h2>

                <p className="mt-3 font-serif text-[clamp(16px,3vw,28px)] text-[#a75a69] sm:mt-4">
                  {copy.legacySubtitle}
                </p>
              </div>

              <div className="pointer-events-none absolute bottom-0 right-0 h-24 w-[min(100%,360px)] opacity-45 sm:h-32">
                <div className="h-full w-full bg-[radial-gradient(circle_at_60%_30%,rgba(151,97,126,0.28),transparent_22%),linear-gradient(135deg,transparent_35%,rgba(143,76,104,0.25)_36%_50%,transparent_51%)]" />
              </div>
            </section>
          </>
        )}
      </section>
    </main>
  );
}