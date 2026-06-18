import React from "react";
import { ArrowLeft, Crown, Sparkles } from "lucide-react";
import gsap from "gsap";

import mainHero from "@/assets/images/women/le-1.webp";

import WomenLanguageButton from "@/components/Sections/women/WomenLanguageButton";
import WomenDetailPanel from "@/components/Sections/women/WomenDetailPanel";
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
    tl.to("[data-hist-hero='true']", { autoAlpha: 1, scale: 1, duration: 1.25 })
      .to("[data-hist-fade='true']", { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.12 }, "-=0.7")
      .to(
        "[data-hist-card='true']",
        { autoAlpha: 1, y: 0, rotateX: 0, duration: 0.85, stagger: 0.12 },
        "-=0.4",
      );
  }, sectionRef);
  return () => ctx.revert();
}

function HistoricListCard({
  woman,
  imageSrc,
  dir,
  onSelect,
}: {
  woman: { id: string; name: string; role: string; teaser: string; icon: "crown" | "flower" };
  imageSrc: string;
  dir: "ltr" | "rtl";
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      data-hist-card="true"
      onClick={onSelect}
      className={`relative flex w-full cursor-pointer flex-col overflow-hidden rounded-[12px] border border-[#dfcdb7] bg-white/65 p-2 shadow-[0_4px_12px_rgba(67,35,45,0.1)] transition hover:border-[#d8b979] xs:p-3 sm:rounded-[26px] sm:p-5 sm:shadow-[0_10px_25px_rgba(67,35,45,0.12)] lg:p-6 ${
        dir === "rtl" ? "text-right" : "text-left"
      }`}
    >
      <div className="relative mx-auto h-[88px] w-full overflow-hidden rounded-[10px] xs:h-[120px] sm:h-[200px] sm:rounded-[20px] md:h-[220px] lg:h-[260px]">
        <img
          src={imageSrc}
          alt={woman.name}
          className="relative z-10 h-full w-full object-cover object-[center_20%]"
        />
      </div>

      <h3 className="mt-2 font-serif text-[13px] leading-tight text-[#2c1736] xs:text-[15px] sm:mt-4 sm:text-[24px] lg:text-[28px]">
        {woman.name}
      </h3>

      <p className="mt-0.5 font-serif text-[10px] italic text-[#a75a69] xs:text-[12px] sm:mt-1.5 sm:text-[16px] lg:text-[18px]">
        ({woman.role})
      </p>

      <div className="my-2 flex w-12 items-center gap-1.5 text-[#b4864d] sm:my-3 sm:w-24 sm:gap-2">
        <span className="h-px flex-1 bg-[#d4b98f]" />
        <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
        <span className="h-px flex-1 bg-[#d4b98f]" />
      </div>

      <p
        className={`text-[10px] leading-relaxed text-[#4a3f50] xs:text-[12px] sm:text-[15px] lg:text-[16px] ${
          dir === "rtl" ? "text-right" : "text-left"
        }`}
      >
        {woman.teaser}
      </p>
    </button>
  );
}

function runHistoricDetailIntroAnimation(sectionRef: React.RefObject<HTMLElement | null>) {
  if (!sectionRef.current) return () => {};
  const ctx = gsap.context(() => {
    gsap.set("[data-women-detail-fade='true']", { autoAlpha: 0, y: 18 });
    gsap.timeline({ defaults: { ease: "power2.out" } }).to("[data-women-detail-fade='true']", {
      autoAlpha: 1,
      y: 0,
      duration: 0.65,
      stagger: 0.08,
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
      ? runHistoricDetailIntroAnimation(sectionRef)
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
      className={`m-0 flex w-full max-w-full flex-col justify-start p-0 overflow-x-hidden ${
        selectedId ? "min-h-min bg-[#f7efe3] text-[#2d1436]" : "min-h-screen bg-[#f9f3e8] text-[#2a1534]"
      }`}
    >
      <section
        ref={sectionRef}
        className={`relative flex w-full max-w-full flex-col overflow-y-auto overflow-x-hidden sm:w-[min(100vw,1400px)] ${
          selectedId ? "min-h-min bg-transparent pb-6 sm:pb-0" : "min-h-screen bg-[#fcf7ef] pb-12 sm:pb-0"
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
          className={`absolute top-4 z-[60] grid h-12 w-12 place-items-center rounded-full border-2 border-[#d8bd83] bg-[#fbf4e8]/95 text-[#2d1436] shadow-md transition hover:bg-white sm:top-8 sm:h-14 sm:w-14 lg:h-16 lg:w-16 ${
            dir === "rtl" ? "right-4 sm:right-8" : "left-4 sm:left-8"
          }`}
          aria-label={selectedId ? copy.backToList : copy.backToWomen}
        >
          <ArrowLeft className={`h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 ${dir === "rtl" ? "rotate-180" : ""}`} />
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
            {/* Mobile layout Hero top element */}
            <div
              data-hist-hero="true"
              className="pointer-events-none w-full h-[35vh] min-h-[240px] relative overflow-hidden sm:hidden"
            >
              <img
                src={mainHero}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-[75%_center]"
              />
              <div
                className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#fcf7ef] to-transparent"
                aria-hidden
              />
            </div>

            {/* Desktop layout Hero absolute backdrop */}
            <div
              data-hist-hero="true"
              className="pointer-events-none absolute right-0 top-0 h-[min(55vh,520px)] w-[80vw] sm:h-[min(72vh,900px)] lg:h-[min(108vh,1160px)] lg:w-[88vw] xl:w-[92vw] hidden sm:block"
            >
              <img
                src={mainHero}
                alt=""
                className="absolute inset-0 h-full w-full object-[75%_center] sm:object-right"
              />
              <div
                className="absolute inset-x-0 bottom-0 h-[clamp(72px,14vh,200px)] bg-gradient-to-t from-[#fcf7ef] via-[#fcf7ef]/55 to-transparent"
                aria-hidden
              />
            </div>

            <section className="relative z-10 px-4 py-5 sm:px-8 sm:py-6 lg:px-14 pt-20 sm:pt-6">
              <div data-hist-fade="true" className="relative z-20 max-w-[700px] pt-4 sm:pt-14 lg:pt-16">
                <div className="mb-4 flex justify-start sm:pl-24">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-[#bd6877] text-[#fff8ef] shadow-[0_8px_20px_rgba(90,42,62,0.18)] sm:h-20 sm:w-20">
                    <Crown className="h-8 w-8 sm:h-10 sm:w-10" />
                  </div>
                </div>

                <h1 className="font-serif text-[clamp(32px,8vw,112px)] font-medium leading-[0.95] tracking-tight text-[#48263f] text-left">
                  {copy.heroTitle1}
                  <br />
                  {copy.heroTitle2}
                </h1>

                <div className="my-6 flex w-full max-w-[260px] items-center gap-3 text-[#b4864d] sm:my-7">
                  <span className="h-px flex-1 bg-[#d4b98f]" />
                  <span className="h-3 w-3 rotate-45 bg-[#b4864d]" />
                  <span className="h-px flex-1 bg-[#d4b98f]" />
                </div>

                <h2 className="font-serif text-[clamp(20px,6vw,38px)] font-light italic leading-tight text-[#b65f71] whitespace-pre-line text-left">
                  {copy.heroSubtitle}
                </h2>

                <p className="mt-7 max-w-[410px] text-[clamp(16px,4vw,19px)] leading-[1.7] text-[#353445] text-left">
                  {copy.heroIntro}
                </p>
              </div>
            </section>

            <section className="relative z-20 mt-2 px-3 pb-6 xs:px-4 sm:mt-8 sm:px-5 lg:mt-20 lg:px-10">
              <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-2 xs:gap-3 sm:gap-5 lg:gap-6">
                <div className="grid w-full grid-cols-3 gap-2 xs:gap-3 sm:gap-5 lg:gap-6">
                  {historicWomen.slice(0, 3).map((woman) => (
                    <HistoricListCard
                      key={woman.id}
                      woman={woman}
                      imageSrc={historicDetailPortraits[woman.id]}
                      dir={dir}
                      onSelect={() => setSelectedId(woman.id)}
                    />
                  ))}
                </div>

                <div className="grid w-full grid-cols-2 gap-2 xs:gap-3 sm:gap-5 lg:gap-6">
                  {historicWomen.slice(3).map((woman) => (
                    <HistoricListCard
                      key={woman.id}
                      woman={woman}
                      imageSrc={historicDetailPortraits[woman.id]}
                      dir={dir}
                      onSelect={() => setSelectedId(woman.id)}
                    />
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </section>
    </main>
  );
}