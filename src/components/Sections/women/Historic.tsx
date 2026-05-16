import React from "react";
import { ArrowLeft, Crown, Flower2 } from "lucide-react";
import gsap from "gsap";

import mainHero from "@/assets/images/women/le-1.webp";
/** Historic grid thumbnails. Detail portraits live in `src/assets/images/women/historic-detail/`. */
import masturaImg from "@/assets/images/women/w-10.webp";
import adelaImg from "@/assets/images/women/w-3.webp";
import hafsaImg from "@/assets/images/women/w-11.webp";
import khanzadImg from "@/assets/images/women/w-6.webp";
import halimaImg from "@/assets/images/women/w-4.webp";

import WomenLanguageButton from "@/components/Sections/women/WomenLanguageButton";
import HistoricCharacterPanel from "./historic/HistoricCharacterPanel";
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

const historicImages: Record<string, string> = {
  "mastura-ardalan": masturaImg,
  "adela-khanum": adelaImg,
  "hafsa-khanum": hafsaImg,
  "khanzada-khanum": khanzadImg,
  "halima-khanum": halimaImg,
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

function runHistoricDetailIntroAnimation(sectionRef: React.RefObject<HTMLElement | null>) {
  if (!sectionRef.current) return () => {};
  const ctx = gsap.context(() => {
    gsap.set("[data-historic-fade='true']", { autoAlpha: 0, y: 18 });
    gsap.timeline({ defaults: { ease: "power2.out" } }).to("[data-historic-fade='true']", {
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
      className={`m-0 flex w-screen flex-col justify-start p-0 ${
        selectedId ? "min-h-screen bg-[#f7efe3] text-[#2d1436]" : "min-h-screen bg-[#f9f3e8] text-[#2a1534]"
      }`}
    >
      <section
        ref={sectionRef}
        className={`relative flex min-h-screen w-[min(100vw,1400px)] flex-col overflow-x-hidden overflow-y-auto ${
          selectedId ? "bg-transparent" : "bg-[#fcf7ef]"
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
          <HistoricCharacterPanel
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
            <div
              data-hist-hero="true"
              className="pointer-events-none absolute right-0 top-0 h-[min(55vh,520px)] w-[80vw] sm:h-[min(72vh,900px)] lg:h-[min(100vh,1000px)]"
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

            <section className="relative z-10 px-4 py-5 sm:px-8 sm:py-6 lg:px-14">
              <div data-hist-fade="true" className="relative z-20 max-w-[700px] pt-10 sm:pt-14 lg:pt-16">
                <div className="mb-4 flex justify-center lg:justify-start lg:pl-24">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-[#bd6877] text-[#fff8ef] shadow-[0_8px_20px_rgba(90,42,62,0.18)] sm:h-20 sm:w-20">
                    <Crown className="h-8 w-8 sm:h-10 sm:w-10" />
                  </div>
                </div>

                <h1 className="font-serif text-[clamp(58px,15vw,112px)] font-medium leading-[0.88] tracking-tight text-[#48263f]">
                  {copy.heroTitle1}
                  <br />
                  {copy.heroTitle2}
                </h1>

                <div className="my-6 flex w-full max-w-[260px] items-center gap-3 text-[#b4864d] sm:my-7">
                  <span className="h-px flex-1 bg-[#d4b98f]" />
                  <span className="h-3 w-3 rotate-45 bg-[#b4864d]" />
                  <span className="h-px flex-1 bg-[#d4b98f]" />
                </div>

                <h2 className="font-serif text-[clamp(26px,6vw,38px)] font-light italic leading-tight text-[#b65f71] whitespace-pre-line">
                  {copy.heroSubtitle}
                </h2>

                <p className="mt-7 max-w-[410px] text-[clamp(16px,4vw,19px)] leading-[1.7] text-[#353445]">
                  {copy.heroIntro}
                </p>
              </div>
            </section>

            <section className="relative z-20 mt-[clamp(26px,40vh,400px)] grid grid-cols-1 gap-4 px-4 py-4 sm:grid-cols-2 lg:gap-5">
              {historicWomen.map((woman) => {
                const Icon = woman.icon === "crown" ? Crown : Flower2;
                return (
                  <button
                    type="button"
                    key={woman.id}
                    data-hist-card="true"
                    onClick={() => setSelectedId(woman.id)}
                    className="relative grid min-h-[560px] w-full cursor-pointer grid-cols-[0.95fr_1.05fr] overflow-hidden rounded-[28px] border border-[#e4d5c3] bg-white/62 p-4 text-left shadow-[inset_0_0_24px_rgba(159,116,81,0.08),0_8px_22px_rgba(70,38,48,0.08)] backdrop-blur-sm transition hover:border-[#d8b979] sm:min-h-[500px] sm:rounded-[34px] sm:p-5"
                  >
                    <div className="flex items-center justify-center">
                      <div className="h-[260px] w-[220px] overflow-hidden rounded-full border-2 border-[#d8b979] bg-[#d8a6ae]/30 p-1 sm:h-[360px] sm:w-[240px]">
                        <img
                          src={historicImages[woman.id]}
                          alt=""
                          className="h-full w-full rounded-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="relative flex flex-col justify-center pr-1">
                      <div className="absolute right-0 top-0 grid h-12 w-12 place-items-center rounded-full bg-[#bd6877] text-[#fff8ef] sm:h-14 sm:w-14">
                        <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                      </div>

                      <h3 className="max-w-[220px] font-serif text-[clamp(26px,4.5vw,38px)] font-semibold leading-[1.05] text-[#4c2d43]">
                        {woman.name}
                      </h3>

                      <p className="mt-2 font-serif text-[clamp(16px,3.2vw,22px)] italic leading-snug text-[#b65f71]">
                        ({woman.role})
                      </p>

                      <div className="my-3 flex w-24 items-center gap-2 text-[#b4864d]">
                        <span className="h-px flex-1 bg-[#d4b98f]" />
                        <span className="h-2 w-2 rotate-45 bg-[#b4864d]" />
                        <span className="h-px flex-1 bg-[#d4b98f]" />
                      </div>

                      <p className="mt-1 max-w-[260px] text-left text-[clamp(13px,2.7vw,16px)] leading-[1.45] text-[#353445]">
                        {woman.teaser}
                      </p>
                    </div>
                  </button>
                );
              })}
            </section>
          </>
        )}
      </section>
    </main>
  );
}
