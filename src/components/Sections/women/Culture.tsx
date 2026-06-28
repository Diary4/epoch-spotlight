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
import culturePlaceholder from "@/assets/images/women/historic.png";

type LangCode = "ku" | "en" | "ar";

const personImages: Record<string, string> = {
  "eyse-san": imgAysha,
  "pakize-rafik-hilmi": imgPakiza,
  "roshan-bedirkhan": culturePlaceholder,
  "nahida-sheikh-salam": culturePlaceholder,
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
      className={`relative flex w-full min-w-0 cursor-pointer flex-col overflow-hidden rounded-[12px] border border-[#dfcdb7] bg-white/65 p-1.5 shadow-[0_8px_20px_rgba(67,35,45,0.1)] transition hover:border-[#d8b979] sm:rounded-[20px] sm:p-3 lg:p-4 ${
        dir === "rtl" ? "text-right" : "text-left"
      }`}
    >
      <div className="relative aspect-[5/3] w-full overflow-hidden rounded-[8px] sm:aspect-[4/3] sm:rounded-[14px]">
        <img
          src={personImages[woman.id] ?? cultureHero}
          alt={woman.name}
          className="relative z-10 h-full w-full object-cover object-[center_22%]"
        />
      </div>

      <h3 className={`mt-1.5 ${displayFont} text-[clamp(11px,2.6vw,20px)] leading-tight text-[#2c1736] sm:mt-2 sm:text-[clamp(16px,1.8vw,20px)]`}>
        {woman.name}
      </h3>

      <p className={`mt-0.5 ${displayFont} text-[clamp(9px,2vw,14px)] italic text-[#a75a69] sm:mt-1 sm:text-[clamp(12px,1.3vw,14px)]`}>
        ({woman.role})
      </p>

      <div className="my-1 flex w-10 items-center gap-1 text-[#b4864d] sm:my-2 sm:w-16 sm:gap-1.5">
        <span className="h-px flex-1 bg-[#d4b98f]" />
        <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
        <span className="h-px flex-1 bg-[#d4b98f]" />
      </div>

      <p
        className={`hidden text-[clamp(11px,1.8vw,13px)] leading-relaxed text-[#4a3f50] sm:block ${
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
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

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

  const handleBack = () => {
    if (selectedId) setSelectedId(null);
    else onBack?.();
  };

  return (
    <main
      dir={dir}
      className={`m-0 flex w-full max-w-full flex-col justify-start overflow-x-hidden p-0 sm:w-screen ${
        selectedId ? "min-h-screen bg-[#f7efe3] text-[#2d1436]" : "min-h-screen bg-[#f9f3e8] text-[#2a1534]"
      } ${isRtlScript ? "font-amiri" : ""}`}
    >
      <section
        ref={sectionRef}
        className={`relative flex w-full max-w-full flex-col overflow-x-hidden overflow-y-auto scrollbar-hide sm:w-[min(100vw,1400px)] ${
          selectedId ? "min-h-screen bg-transparent" : "min-h-screen bg-[#fcf7ef]"
        }`}
      >
        <button
          type="button"
          onClick={handleBack}
          className={`absolute top-4 z-50 grid h-12 w-12 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#2c1337] shadow-sm backdrop-blur-sm transition-all hover:bg-white sm:top-8 sm:h-14 sm:w-14 ${
            dir === "rtl" ? "right-4 sm:right-8" : "left-4 sm:left-8"
          }`}
          aria-label={selectedId ? copy.backToList : copy.backToWomen}
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

        {detail && selectedId ? (
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
        ) : (
          <>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_6%,rgba(205,143,151,0.15),transparent_30%),radial-gradient(circle_at_20%_48%,rgba(212,185,143,0.12),transparent_32%)]" />

            <section data-culture-hero="true" className="relative z-10 shrink-0">
              <div
                data-culture-fade="true"
                className="relative z-20 mx-auto max-w-[900px] px-4 pb-3 pt-16 text-center sm:px-6 sm:pb-5 sm:pt-20 lg:pt-14"
              >
                <div className="mx-auto mb-5 flex w-full max-w-[300px] items-center justify-center gap-3 text-[#b4864d] sm:mb-6">
                  <span className="h-px flex-1 bg-[#d4b98f]" />
                  <Sparkles className="h-6 w-6 sm:h-8 sm:w-8" />
                  <span className="h-px flex-1 bg-[#d4b98f]" />
                </div>

                <h1 className={`${displayFont} text-[clamp(34px,8vw,80px)] font-medium leading-[1.05] tracking-tight text-[#2c1337]`}>
                  {copy.heroTitleLine1}
                  <br />
                  {copy.heroTitleLine2}
                </h1>

                <h2 className={`mx-auto mt-5 max-w-[640px] ${displayFont} text-[clamp(17px,3.8vw,28px)] italic leading-snug text-[#a75a69] sm:mt-8`}>
                  {copy.heroSubtitle}
                </h2>

                <div className="mx-auto my-5 flex w-full max-w-[270px] items-center justify-center gap-3 text-[#b4864d] sm:my-7">
                  <span className="h-px flex-1 bg-[#d4b98f]" />
                  <span className="h-3 w-3 rotate-45 bg-[#b4864d]" />
                  <span className="h-px flex-1 bg-[#d4b98f]" />
                </div>

                <p className="mx-auto max-w-[680px] text-[clamp(15px,3.4vw,20px)] leading-relaxed text-[#55505a]">
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

            <section className="relative z-20 -mt-2 px-3 pb-6 sm:mt-0 sm:px-5 lg:px-10">
              <div className="mx-auto grid w-full max-w-[1280px] grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
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
          </>
        )}
      </section>
    </main>
  );
}
