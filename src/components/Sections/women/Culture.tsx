import React from "react";
import gsap from "gsap";
import { ArrowLeft, Sparkles } from "lucide-react";
import { detailBackIconSize } from "@/constants/backNavigation";

import WomenDetailPanel from "@/components/Sections/women/WomenDetailPanel";
import { runWomenDetailIntroAnimation } from "@/components/Sections/women/womenDetailAnimation";
import { womenDisplayFont, womenRtlScript } from "@/components/Sections/women/womenLanguage";
import {
  cultureDetailToPanelCards,
  getCultureDetail,
  getCulturePageCopy,
  getCulturePeople,
  type CultureFigureListItem,
} from "@/components/Sections/women/content/cultureContent";

import cultureHero from "@/assets/images/women/c-1.webp";
import imgAysha from "@/assets/images/womens/ayshe.jpg";
import imgPakiza from "@/assets/images/womens/pakiza.jpg";
import imgRoshan from "@/assets/images/womens/roshan.jpeg";
import imgNahida from "@/assets/images/womens/nadia-sheikh.png";

type LangCode = "ku" | "en" | "ar";

const personImages: Record<string, string> = {
  "eyse-san": imgAysha,
  "pakize-rafik-hilmi": imgPakiza,
  "roshan-bedirkhan": imgRoshan,
  "nahida-sheikh-salam": imgNahida,
};

type CulturePageProps = {
  lang?: LangCode;
  onBack?: () => void;
  languageLabel?: string;
  onLanguageChange?: () => void;
};

function CultureListCard({
  woman,
  dir,
  displayFont,
  onSelect,
}: {
  woman: CultureFigureListItem;
  dir: "ltr" | "rtl";
  displayFont: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      data-culture-card="true"
      onClick={onSelect}
      className={`relative flex w-full min-w-0 cursor-pointer flex-col overflow-hidden rounded-[18px] border border-[#dfcdb7] bg-white/65 p-[14px] shadow-[0_8px_20px_rgba(67,35,45,0.1)] transition hover:border-[#d8b979] ${
        dir === "rtl" ? "text-right" : "text-left"
      }`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[12px]">
        <img
          src={personImages[woman.id] ?? cultureHero}
          alt={woman.name}
          className="relative z-10 h-full w-full object-cover object-[center_22%]"
        />
      </div>

      <h3 className={`mt-2 ${displayFont} text-[20px] leading-tight text-[#2c1736]`}>
        {woman.name}
      </h3>

      <p className={`mt-[2px] ${displayFont} text-[14px] italic text-[#a75a69]`}>
        ({woman.role})
      </p>

      <div className="my-2 flex w-16 items-center gap-1 text-[#b4864d]">
        <span className="h-px flex-1 bg-[#d4b98f]" />
        <Sparkles className="h-3 w-3" />
        <span className="h-px flex-1 bg-[#d4b98f]" />
      </div>

      <p
        className={`block text-[13px] leading-relaxed text-[#4a3f50] ${
          dir === "rtl" ? "text-right" : "text-left"
        }`}
      >
        {woman.teaser}
      </p>
    </button>
  );
}

function runCultureListIntro(sectionRef: React.RefObject<HTMLElement | null>) {
  if (!sectionRef.current) return () => {};
  const ctx = gsap.context(() => {
    gsap.set("[data-culture-fade='true']", { autoAlpha: 0, y: 28 });
    gsap.set("[data-culture-hero='true']", { autoAlpha: 0, scale: 1.04 });
    gsap.set("[data-culture-card='true']", {
      autoAlpha: 0,
      y: 35,
      rotateX: -8,
      transformOrigin: "center top",
    });

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.to("[data-culture-hero='true']", { autoAlpha: 1, scale: 1, duration: 1.2 })
      .to("[data-culture-fade='true']", { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12 }, "-=0.7")
      .to(
        "[data-culture-card='true']",
        { autoAlpha: 1, y: 0, rotateX: 0, duration: 0.85, stagger: 0.1 },
        "-=0.35",
      );
  }, sectionRef);
  return () => ctx.revert();
}

export default function WomenCultureMemoryPage({
  lang: langProp = "en",
  onBack,
  languageLabel,
  onLanguageChange,
}: CulturePageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const canvasRef = React.useRef<HTMLDivElement | null>(null);
  const [fit, setFit] = React.useState({ scale: 1, x: 0 });
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  // Fixed design canvas (1400px wide) — same fit logic as the Women hub / Historic / Resistance:
  // measure the natural height and scale uniformly so the page looks identical on every screen.
  const DESIGN_WIDTH = 1400;

  const lang: LangCode =
    langProp === "en" || langProp === "ku" || langProp === "ar" ? langProp : "en";
  const copy = getCulturePageCopy(lang);
  const cultureWomen = getCulturePeople(lang);
  const detail = selectedId ? getCultureDetail(selectedId, lang) : null;
  const dir = lang === "en" ? "ltr" : "rtl";
  const displayFont = womenDisplayFont(lang);
  const isRtlScript = womenRtlScript(lang);

  React.useLayoutEffect(() => {
    const cleanup = detail ? runWomenDetailIntroAnimation(sectionRef) : runCultureListIntro(sectionRef);
    return cleanup;
  }, [selectedId, detail]);

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
          <button
            type="button"
            onClick={handleBack}
            className={`absolute top-4 z-50 grid h-12 w-12 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#2c1337] shadow-sm backdrop-blur-sm transition-all hover:bg-white sm:top-8 sm:h-14 sm:w-14 ${
              dir === "rtl" ? "right-4 sm:right-8" : "left-4 sm:left-8"
            }`}
            aria-label={copy.backToList}
          >
            <ArrowLeft size={detailBackIconSize} className={dir === "rtl" ? "rotate-180" : ""} />
          </button>

          {onLanguageChange && languageLabel && (
            <button
              type="button"
              onClick={onLanguageChange}
              className={`absolute top-4 z-50 rounded-full border-2 border-[#d9b477] bg-white/80 px-4 py-2 ${displayFont} text-sm text-[#2c1337] shadow-sm backdrop-blur-sm transition hover:bg-white sm:top-8 sm:px-5 sm:py-2.5 sm:text-base ${
                dir === "rtl" ? "left-4 sm:left-8" : "right-4 sm:right-8"
              }`}
            >
              {languageLabel}
            </button>
          )}

          <WomenDetailPanel
            dir={dir}
            lang={lang}
            nameLine1={detail.nameLine1}
            nameLine2={detail.nameLine2}
            role={detail.role}
            metaLine={detail.metaLine}
            intro={detail.intro}
            portraitSrc={personImages[selectedId] ?? cultureHero}
            portraitAlt={detail.portraitAlt}
            cards={cultureDetailToPanelCards(detail, lang)}
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
            className="relative flex w-full flex-col overflow-hidden bg-[#fcf7ef] pb-8"
          >
            <button
              type="button"
              onClick={handleBack}
              className={`absolute top-8 z-50 grid h-14 w-14 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#2c1337] shadow-sm backdrop-blur-sm transition-all hover:bg-white ${
                dir === "rtl" ? "right-8" : "left-8"
              }`}
              aria-label={copy.backToWomen}
            >
              <ArrowLeft size={detailBackIconSize} className={dir === "rtl" ? "rotate-180" : ""} />
            </button>

            {onLanguageChange && languageLabel && (
              <button
                type="button"
                onClick={onLanguageChange}
                className={`absolute top-8 z-50 rounded-full border-2 border-[#d9b477] bg-white/80 px-5 py-2.5 ${displayFont} text-base text-[#2c1337] shadow-sm backdrop-blur-sm transition hover:bg-white ${
                  dir === "rtl" ? "left-8" : "right-8"
                }`}
              >
                {languageLabel}
              </button>
            )}

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_6%,rgba(205,143,151,0.15),transparent_30%),radial-gradient(circle_at_20%_48%,rgba(212,185,143,0.12),transparent_32%)]" />

            <section data-culture-hero="true" className="relative z-10 shrink-0">
              <div
                data-culture-fade="true"
                className="relative z-20 mx-auto w-full max-w-[900px] shrink-0 px-4 pb-2 pt-14 text-center"
              >
                <div className="mx-auto mb-3 flex w-full max-w-[300px] items-center justify-center gap-3 text-[#b4864d]">
                  <span className="h-px flex-1 bg-[#d4b98f]" />
                  <Sparkles className="h-8 w-8" />
                  <span className="h-px flex-1 bg-[#d4b98f]" />
                </div>

                <h1 className={`${displayFont} text-[72px] font-medium leading-[1.05] tracking-tight text-[#2c1337]`}>
                  {copy.heroTitleLine1}
                  <br />
                  {copy.heroTitleLine2}
                </h1>

                <h2 className={`mx-auto mt-3 max-w-[640px] ${displayFont} text-[28px] italic leading-snug text-[#a75a69]`}>
                  {copy.heroSubtitle}
                </h2>

                <div className="mx-auto my-3 flex w-full max-w-[270px] items-center justify-center gap-3 text-[#b4864d]">
                  <span className="h-px flex-1 bg-[#d4b98f]" />
                  <span className="h-3 w-3 rotate-45 bg-[#b4864d]" />
                  <span className="h-px flex-1 bg-[#d4b98f]" />
                </div>

                <p className="mx-auto max-w-[680px] text-[20px] leading-relaxed text-[#55505a]">
                  {copy.heroIntro}
                </p>
              </div>

              <div className="relative z-10 w-full">
                <img
                  src={cultureHero}
                  alt=""
                  className="pointer-events-none mx-auto block h-auto w-full max-w-[1400px] object-contain object-center"
                />
              </div>
            </section>

            <section className="relative z-20 shrink-0 px-10 pt-2">
              <div className="mx-auto grid w-full max-w-[1280px] grid-cols-4 gap-4">
                {cultureWomen.map((woman) => (
                  <CultureListCard
                    key={woman.id}
                    woman={woman}
                    dir={dir}
                    displayFont={displayFont}
                    onSelect={() => setSelectedId(woman.id)}
                  />
                ))}
              </div>
            </section>
          </section>
        </main>
      </div>
    </div>
  );
}
