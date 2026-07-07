import React from "react";
import gsap from "gsap";
import { Sparkles } from "lucide-react";
import { womenPagePadClassName } from "@/constants/backNavigation";

import WomenDetailPanel from "@/components/Sections/women/WomenDetailPanel";
import WomenScaledCanvas from "@/components/Sections/women/WomenScaledCanvas";
import WomenBackButton from "@/components/Sections/women/WomenBackButton";
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
import cultureHeroVideo from "@/assets/videos/culture.webm";
import imgAysha from "@/assets/images/womens/ayshe.webp";
import imgMastura from "@/assets/images/womens/mastura.webp";
import imgShifa from "@/assets/images/womens/shifagardi.webp";
import imgMaryam from "@/assets/images/womens/maryam.jpg";

type LangCode = "ku" | "en" | "ar";

const personImages: Record<string, string> = {
  "mastura-ardalan": imgMastura,
  "shifa-gardi": imgShifa,
  "maryam-khan": imgMaryam,
  "eyse-san": imgAysha,
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

  // Detail view keeps its own scrolling full-screen layout.
  if (detail && selectedId) {
    return (
      <main
        dir={dir}
        className={`relative m-0 w-full bg-[#f7efe3] p-0 text-[#2d1436] ${isRtlScript ? "font-noto-naskh" : ""}`}
      >
        <section ref={sectionRef} className="relative">
          <WomenBackButton onClick={handleBack} ariaLabel={copy.backToList} dir={dir} />

          {onLanguageChange && languageLabel && (
            <button
              type="button"
              onClick={onLanguageChange}
              className={`fixed top-4 z-50 rounded-full border-2 border-[#d9b477] bg-white/80 px-4 py-2 ${displayFont} text-sm text-[#2c1337] shadow-sm backdrop-blur-sm transition hover:bg-white sm:top-8 sm:px-5 sm:py-2.5 sm:text-base ${
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
      overlay={<WomenBackButton onClick={handleBack} ariaLabel={copy.backToWomen} dir={dir} />}
    >
      <main className={`m-0 w-full bg-[#fcf7ef] text-[#2a1534] ${isRtlScript ? "font-noto-naskh" : ""}`}>
        <section
          ref={sectionRef}
          className="relative flex w-full flex-col overflow-hidden bg-[#fcf7ef] pb-8"
        >
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

            {/* Hero: one square stage (the artwork is 1:1) holding both the video
                and the overlaid text, so their relationship is fixed and the
                canvas height never shifts while the video loads. */}
            <section data-culture-hero="true" className="relative z-10 w-full shrink-0 overflow-hidden">
              <div className="relative aspect-square w-full">
                <video
                  src={cultureHeroVideo}
                  aria-label={`${copy.heroTitleLine1} ${copy.heroTitleLine2}`}
                  className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_72%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_72%,transparent_100%)]"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[120px] bg-gradient-to-b from-[#fcf7ef] from-0% via-[#fcf7ef]/70 via-45% to-transparent to-100%"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[140px] bg-gradient-to-t from-[#fcf7ef] from-0% via-[#fcf7ef] via-60% to-transparent to-100%"
                  aria-hidden
                />

                {/* Text sits on the artwork's open sky, inside the same container. */}
                <div
                  data-culture-fade="true"
                  className="absolute inset-x-0 top-0 z-20 mx-auto w-full max-w-[900px] px-4 pt-14 text-center"
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
              </div>
            </section>

            <section className={`relative z-20 -mt-24 shrink-0 pt-2 ${womenPagePadClassName(dir)}`}>
              <div className="mx-auto grid w-full max-w-[1280px] grid-cols-6 gap-4">
                {cultureWomen.map((woman, index) => (
                  <div
                    key={woman.id}
                    className={index < 3 ? "col-span-2" : "col-span-3"}
                  >
                    <CultureListCard
                      woman={woman}
                      dir={dir}
                      displayFont={displayFont}
                      onSelect={() => setSelectedId(woman.id)}
                    />
                  </div>
                ))}
              </div>
            </section>
        </section>
      </main>
    </WomenScaledCanvas>
  );
}
