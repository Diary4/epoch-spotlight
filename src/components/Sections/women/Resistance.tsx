import React from "react";
import gsap from "gsap";
import { ArrowLeft, Sparkles, Quote } from "lucide-react";
import { detailBackIconSize } from "@/constants/backNavigation";

import WomenDetailPanel from "@/components/Sections/women/WomenDetailPanel";
import WomenScaledCanvas from "@/components/Sections/women/WomenScaledCanvas";
import { runWomenDetailIntroAnimation } from "@/components/Sections/women/womenDetailAnimation";
import WomenLanguageButton from "@/components/Sections/women/WomenLanguageButton";
import { getAppLanguage, type AppLangCode } from "@/lib/appLanguage";
import type { WomenLanguageProps } from "@/components/Sections/women/womenLanguage";
import { womenDir, womenDisplayFont, womenRtlScript } from "@/components/Sections/women/womenLanguage";
import {
  getResistancePageCopy,
  getResistanceWomen,
  getResistanceDetail,
  resistanceDetailToPanelCards,
} from "@/components/Sections/women/content/resistanceContent";

import resistanceHeroVideo from "@/assets/videos/56.mp4";
import imgQadam from "@/assets/images/womens/qadamkher.jpg";
import imgShifa from "@/assets/images/womens/shifagardi.jpg";
import imgLayal from "@/assets/images/womens/laylaqasim.png";
import imgMargaret from "@/assets/images/womens/margret.jpg";
import imgKhaja from "@/assets/images/womens/khajabawa.png";
import imgAisha from "@/assets/images/womens/dayka-aisha.png";

type WomenResistancePageProps = WomenLanguageProps & {
  onBack?: () => void;
};

const resistanceImages: Record<string, string> = {
  "qadam-kher": imgQadam,
  "shifa-gardi": imgShifa,
  "layla-qasim": imgLayal,
  "margaret-george-shilo": imgMargaret,
  "khaja-bawa": imgKhaja,
  "dayka-aisha": imgAisha,
};

function runResistanceListIntro(sectionRef: React.RefObject<HTMLElement | null>) {
  if (!sectionRef.current) return () => {};
  const ctx = gsap.context(() => {
    gsap.set("[data-resist-fade='true']", { autoAlpha: 0, y: 28 });
    gsap.set("[data-resist-hero='true']", { autoAlpha: 0, scale: 1.04 });
    gsap.set("[data-resist-card='true']", {
      autoAlpha: 0,
      y: 35,
      rotateX: -8,
      transformOrigin: "center top",
    });

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.to("[data-resist-hero='true']", { autoAlpha: 1, scale: 1, duration: 1.2 })
      .to("[data-resist-fade='true']", { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12 }, "-=0.7")
      .to(
        "[data-resist-card='true']",
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

export default function WomenResistancePage({
  onBack,
  lang: langProp,
  languageLabel = "ENGLISH",
  onLanguageChange,
}: WomenResistancePageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [internalLang, setInternalLang] = React.useState<AppLangCode>(() => getAppLanguage());
  const lang = langProp ?? internalLang;

  const copy = getResistancePageCopy(lang);
  const resistanceWomen = getResistanceWomen(lang);
  const detail = selectedId ? getResistanceDetail(selectedId, lang) : null;
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
      : runResistanceListIntro(sectionRef);
    return cleanup;
  }, [selectedId, detail]);

  const handleBack = () => {
    if (selectedId) setSelectedId(null);
    else onBack?.();
  };

  const renderWomanCard = (woman: (typeof resistanceWomen)[number]) => (
    <button
      type="button"
      data-resist-card="true"
      key={woman.id}
      onClick={() => setSelectedId(woman.id)}
      className="relative flex w-full min-w-0 cursor-pointer flex-col overflow-hidden rounded-[24px] border border-[#dfcdb7] bg-white/65 p-4 text-left shadow-[0_10px_25px_rgba(67,35,45,0.12)] transition hover:border-[#d8b979]"
    >
      <div className="relative mx-auto h-[260px] w-full overflow-hidden rounded-[20px]">
        <img
          src={resistanceImages[woman.id]}
          alt={woman.name}
          className="relative z-10 h-full w-full object-cover object-[center_20%]"
        />
      </div>

      <h3 className={`mt-2.5 ${displayFont} text-[32px] leading-tight text-[#2c1736]`}>
        {woman.name}
      </h3>

      <p className={`mt-1 ${displayFont} text-[20px] italic text-[#a75a69]`}>
        ({woman.role})
      </p>
    </button>
  );

  // Detail view keeps its own scrolling full-screen layout.
  if (detail && selectedId) {
    return (
      <main
        dir={dir}
        className={`relative m-0 w-full bg-[#f7efe3] p-0 text-[#2d1436] ${isRtlScript ? "font-noto-naskh" : ""}`}
      >
        <section ref={sectionRef} className="relative">
          <WomenLanguageButton
            lang={lang}
            languageLabel={languageLabel}
            onLanguageChange={handleLanguageChange}
          />

          <button
            type="button"
            onClick={handleBack}
            className={`fixed top-4 z-[60] flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#2c1337] shadow-md backdrop-blur-sm transition-all hover:bg-white sm:top-8 sm:h-14 sm:w-14 ${
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
            portraitSrc={resistanceImages[selectedId]}
            portraitAlt={detail.portraitAlt}
            cards={resistanceDetailToPanelCards(detail, lang)}
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

  // List view — fixed design canvas scaled uniformly so the page looks identical on every screen.
  return (
    <WomenScaledCanvas
      dir={dir}
      className={isRtlScript ? "font-noto-naskh" : ""}
      fitDeps={[lang, selectedId]}
    >
      <main className={`m-0 w-full bg-[#fcf7ef] text-[#2a1534] ${isRtlScript ? "font-noto-naskh" : ""}`}>
        <section
          ref={sectionRef}
          className="relative flex w-full flex-col overflow-hidden bg-[#fcf7ef] pb-8"
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

            {/* Hero — side-by-side on every screen with responsive grid splits and overlapping styles */}
            <section
              className={`relative z-10 shrink-0 grid grid-cols-[0.9fr_1.1fr] items-center gap-4 pt-16 ${
                dir === "rtl" ? "pl-0 pr-10" : "pl-10 pr-0"
              }`}
            >
              <div
                data-resist-fade="true"
                className={`relative z-20 max-w-[700px] ${dir === "rtl" ? "pl-0" : "pr-0"}`}
              >
                <h1 className={`${displayFont} text-[96px] font-medium leading-[0.95] tracking-tight text-[#2c1337]`}>
                  {copy.heroTitle1}
                  <br />
                  {copy.heroTitle2}
                </h1>

                <div className="my-4 flex w-full max-w-[285px] items-center gap-3 text-[#b4864d]">
                  <span className="h-px flex-1 bg-[#d4b98f]" />
                  <Sparkles className="h-6 w-6" />
                  <span className="h-px flex-1 bg-[#d4b98f]" />
                </div>

                <h2 className={`${displayFont} text-[34px] text-[#a75a69]`}>
                  {copy.heroSubtitle}
                </h2>

                <p className="mt-3 max-w-[400px] text-[24px] leading-[1.4] text-[#56505a]">
                  {copy.heroIntro}
                </p>
              </div>

              {/* Hero video bleeds under the text */}
              <div
                data-resist-hero="true"
                className={`pointer-events-none relative self-stretch h-full w-[185%] ${
                  dir === "rtl" ? "mr-[-62%] -translate-x-8" : "ml-[-62%] translate-x-10"
                }`}
              >
                <div className="relative h-full w-full overflow-hidden leading-[0]">
                  <video
                    src={resistanceHeroVideo}
                    aria-label="Women of Resistance"
                    className={`block h-full w-full object-contain [mask-image:linear-gradient(to_bottom,black_0%,black_72%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_72%,transparent_100%)] ${dir === "rtl" ? "object-left-center -scale-x-100" : "object-[96%_center]"}`}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  <div
                    className="absolute inset-x-0 top-0 z-10 h-[140px] bg-gradient-to-b from-[#fcf7ef] from-0% via-[#fcf7ef] via-55% to-transparent to-100%"
                    aria-hidden
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 z-10 h-[160px] bg-gradient-to-t from-[#fcf7ef] from-0% via-[#fcf7ef] via-60% to-transparent to-100%"
                    aria-hidden
                  />
                </div>
              </div>
            </section>

            {/* Cards — 3 on the first row, 4 on the second; each row fills the full width */}
            <section className="relative z-20 -mt-10 flex flex-col gap-5 px-10">
              <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
                {resistanceWomen.slice(0, 3).map(renderWomanCard)}
              </div>
              <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}>
                {resistanceWomen.slice(3).map(renderWomanCard)}
              </div>
            </section>

            {/* Quotes grid */}
            <section
              className="relative z-20 mt-3 w-full gap-6 px-10 pb-4"
              style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
            >
              {copy.quotes.map(({ text, author }) => (
                <article
                  data-resist-card="true"
                  key={text}
                  className="relative flex min-h-[110px] min-w-0 flex-col justify-center overflow-hidden rounded-[24px] border border-[#dfcdb7] bg-white/65 px-8 py-4 shadow-[0_10px_25px_rgba(67,35,45,0.1)]"
                >
                  <Quote className="mb-2 h-8 w-8 shrink-0 fill-[#d98994]/70 text-[#d98994]/70" />

                  <p className={`${displayFont} text-[20px] leading-snug text-[#3a293f]`}>{text}</p>

                  <p className={`mt-2 ${displayFont} text-[16px] italic text-[#a75a69]`}>
                    — {author}
                  </p>

                  <div
                    data-floating="true"
                    className="pointer-events-none absolute bottom-3 right-6 h-20 w-16 rounded-full bg-[#d99bad]/20 blur-xl"
                  />

                  <div className="mt-2 flex w-full max-w-[120px] items-center gap-2 text-[#b4864d]">
                    <span className="h-px flex-1 bg-[#d4b98f]" />
                    <Sparkles className="h-4 w-4" />
                    <span className="h-px flex-1 bg-[#d4b98f]" />
                  </div>
                </article>
              ))}
            </section>

            {/* Legacy banner
            <section
              data-resist-fade="true"
              className="relative z-20 mx-5 mt-6 mb-10 flex min-h-[120px] flex-col items-start gap-4 overflow-hidden rounded-[24px] border border-[#d9bd7e] bg-white/55 px-6 py-6 shadow-[0_8px_22px_rgba(67,35,45,0.1)] sm:min-h-[145px] sm:flex-row sm:items-center sm:px-12 lg:mx-10"
            >
              <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full border border-[#e4c78f] bg-[#fff8ed] sm:h-28 sm:w-28">
                <div className="text-[40px] text-[#b4864d] sm:text-[58px]">♧</div>
              </div>

              <div className="min-w-0 sm:ml-12 lg:ml-20">
                <h2 className={`${displayFont} text-[clamp(28px,5vw,44px)] leading-none text-[#2c1736]`}>
                  {copy.legacyTitle}
                </h2>

                <p className={`mt-3 ${displayFont} text-[clamp(16px,3vw,28px)] text-[#a75a69] sm:mt-4`}>
                  {copy.legacySubtitle}
                </p>
              </div>

              <div className="pointer-events-none absolute bottom-0 right-0 h-24 w-[min(100%,360px)] opacity-45 sm:h-32">
                <div className="h-full w-full bg-[radial-gradient(circle_at_60%_30%,rgba(151,97,126,0.28),transparent_22%),linear-gradient(135deg,transparent_35%,rgba(143,76,104,0.25)_36%_50%,transparent_51%)]" />
              </div>
            </section> */}
          </section>
        </main>
    </WomenScaledCanvas>
  );
}