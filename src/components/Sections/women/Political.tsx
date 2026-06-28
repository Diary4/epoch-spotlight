import React from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import { detailBackIconSize } from "@/constants/backNavigation";
import gsap from "gsap";

import WomenDetailPanel from "@/components/Sections/women/WomenDetailPanel";
import { runWomenDetailIntroAnimation } from "@/components/Sections/women/womenDetailAnimation";
import WomenLanguageButton from "@/components/Sections/women/WomenLanguageButton";
import { getAppLanguage, type AppLangCode } from "@/lib/appLanguage";
import type { WomenLanguageProps } from "@/components/Sections/women/womenLanguage";
import { womenDir, womenDisplayFont, womenRtlScript } from "@/components/Sections/women/womenLanguage";
import {
  getKnowledgePageCopy,
  getPoliticalPeople,
  getPoliticalDetail,
  politicalDetailToPanelCards,
} from "@/components/Sections/women/content/knowledgeContent";

import politicalHero from "@/assets/images/women/c-2.webp";
import politicBg from "@/assets/images/patterns/politic.png";
import topicPoetryImg from "@/assets/images/women/icons/k-2.webp";
import topicHistoryImg from "@/assets/images/women/icons/k-3.webp";
import topicPoliticalImg from "@/assets/images/women/icons/k-1.webp";
import maryamKhanImg from "@/assets/images/womens/maryamkhan.jpg";
import mayanPlaceholder from "@/assets/images/women/historic.png";

type WomenPoliticalPageProps = WomenLanguageProps & {
  onBack?: () => void;
};

const personImages: Record<string, string> = {
  "maryam-khan": maryamKhanImg,
  "mayan-khatun": mayanPlaceholder,
};

const topicImages = [
  { key: "poetry" as const, imageSrc: topicPoetryImg },
  { key: "history" as const, imageSrc: topicHistoryImg },
  { key: "political" as const, imageSrc: topicPoliticalImg },
];

function runPoliticalListIntro(sectionRef: React.RefObject<HTMLElement | null>) {
  if (!sectionRef.current) return () => {};
  const ctx = gsap.context(() => {
    gsap.set("[data-political-fade='true']", { autoAlpha: 0, y: 26 });
    gsap.set("[data-political-hero='true']", { autoAlpha: 0, scale: 1.04 });
    gsap.set("[data-political-card='true']", {
      autoAlpha: 0,
      y: 35,
      rotateX: -8,
      transformOrigin: "center top",
    });

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.to("[data-political-hero='true']", { autoAlpha: 1, scale: 1, duration: 1.2 })
      .to("[data-political-fade='true']", { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.12 }, "-=0.7")
      .to(
        "[data-political-card='true']",
        { autoAlpha: 1, y: 0, rotateX: 0, duration: 0.85, stagger: 0.1 },
        "-=0.35",
      );
  }, sectionRef);
  return () => ctx.revert();
}

export default function WomenPoliticalPage({
  onBack,
  lang: langProp,
  languageLabel = "ENGLISH",
  onLanguageChange,
}: WomenPoliticalPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [internalLang, setInternalLang] = React.useState<AppLangCode>(() => getAppLanguage());
  const lang = langProp ?? internalLang;

  const copy = getKnowledgePageCopy(lang);
  const people = getPoliticalPeople(lang);
  const detail = selectedId ? getPoliticalDetail(selectedId, lang) : null;
  const dir = womenDir(lang);
  const displayFont = womenDisplayFont(lang);
  const isRtlScript = womenRtlScript(lang);
  const heroConnector = lang === "en" ? "of" : lang === "ku" ? "ی" : "ـ";

  const handleLanguageChange = () => {
    if (onLanguageChange) {
      onLanguageChange();
      return;
    }
    setInternalLang((current) => (current === "en" ? "ku" : current === "ku" ? "ar" : "en"));
  };

  React.useLayoutEffect(() => {
    const cleanup = detail ? runWomenDetailIntroAnimation(sectionRef) : runPoliticalListIntro(sectionRef);
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
        selectedId ? "min-h-screen bg-[#f7efe3] text-[#2d1436]" : "min-h-screen bg-transparent text-[#2a1534]"
      } ${isRtlScript ? "font-amiri" : ""}`}
    >
      <section
        ref={sectionRef}
        className={`relative flex w-full max-w-full flex-col overflow-x-hidden overflow-y-auto scrollbar-hide sm:w-[min(100vw,1400px)] ${
          selectedId ? "min-h-screen bg-transparent" : "min-h-screen bg-transparent"
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
          <ArrowLeft size={detailBackIconSize} className={dir === "rtl" ? "rotate-180" : ""} />
        </button>

        {detail && selectedId ? (
          <WomenDetailPanel
            dir={dir}
            lang={lang}
            nameLine1={detail.nameLine1}
            nameLine2={detail.nameLine2}
            role={detail.role}
            metaLine={detail.metaLine}
            intro={detail.intro}
            portraitSrc={personImages[selectedId] ?? politicalHero}
            portraitAlt={detail.portraitAlt}
            cards={politicalDetailToPanelCards(detail, lang)}
            quote={detail.quote}
            quoteAuthor={detail.quoteAuthor}
            greatestAchievement={detail.greatestAchievement}
            whySheMatters={detail.whySheMatters}
            didYouKnow={detail.didYouKnow}
            listIcon={detail.listIcon}
          />
        ) : (
          <>
            <div
              data-political-hero="true"
              className="pointer-events-none absolute inset-0 min-h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${politicBg})`,
                minHeight: "100vh",
              }}
              aria-hidden
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_8%,rgba(205,143,151,0.18),transparent_34%),radial-gradient(circle_at_22%_52%,rgba(212,185,143,0.12),transparent_30%)]" />

            {/* Hero — centered title */}
            <section className="relative z-10 flex flex-col items-center px-5 pt-20 text-center sm:px-8 sm:pt-24 lg:px-10">
              <div
                data-political-fade="true"
                className="relative z-20 mx-auto flex w-full max-w-[700px] flex-col items-center"
              >
                <h1 className={`${displayFont} flex flex-wrap items-center justify-center gap-x-3 text-[clamp(20px,6vw,96px)] font-medium leading-none tracking-tight text-[#2c1337] sm:flex-nowrap sm:gap-x-4`}>
                  <span>{copy.heroTitle1}</span>
                  <span>{heroConnector}</span>
                  <span>{copy.heroTitle2}</span>
                </h1>

                <div className="my-3 flex w-full max-w-[285px] items-center gap-3 text-[#b4864d] sm:my-6 lg:my-8">
                  <span className="h-px flex-1 bg-[#d4b98f]" />
                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                  <span className="h-px flex-1 bg-[#d4b98f]" />
                </div>

                <h2 className={`${displayFont} text-[clamp(11px,2.5vw,34px)] text-[#a75a69]`}>
                  {copy.heroSubtitle}
                </h2>

                <p className="mt-2 max-w-[400px] text-[clamp(11px,2.2vw,24px)] leading-[1.5] text-[#56505a] sm:mt-4 lg:mt-5 lg:leading-[1.45]">
                  {copy.heroIntro}
                </p>
              </div>
            </section>

            {/* People cards */}
            <section className="relative z-20 mt-6 grid grid-cols-2 gap-2 px-3 sm:gap-6 sm:px-5 lg:px-10">
              {people.map((person) => (
                <button
                  type="button"
                  data-political-card="true"
                  key={person.id}
                  onClick={() => setSelectedId(person.id)}
                  className={`relative flex min-w-0 w-full cursor-pointer flex-col overflow-hidden rounded-[14px] border border-[#dfcdb7] bg-white p-2 shadow-[0_10px_25px_rgba(67,35,45,0.12)] transition hover:border-[#d8b979] sm:rounded-[24px] sm:p-5 ${
                    dir === "rtl" ? "text-right" : "text-left"
                  }`}
                >
                  <div className="relative mx-auto h-[min(200px,38vw)] w-full overflow-hidden rounded-[10px] sm:h-[220px] sm:rounded-[20px] lg:h-[260px]">
                    <img
                      src={personImages[person.id] ?? politicalHero}
                      alt={person.name}
                      className="relative z-10 h-full w-full object-cover object-[center_20%]"
                    />
                  </div>

                  <h3 className={`mt-1.5 ${displayFont} text-[clamp(10px,3vw,32px)] leading-tight text-[#2c1736] sm:mt-4 sm:text-[clamp(22px,2.4vw,32px)]`}>
                    {person.name}
                  </h3>

                  <p className={`mt-0.5 ${displayFont} text-[clamp(8px,2.2vw,20px)] italic text-[#a75a69] sm:mt-2 sm:text-[clamp(15px,1.6vw,20px)]`}>
                    ({person.role})
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
                    {person.teaser}
                  </p>
                </button>
              ))}
            </section>
          </>
        )}
      </section>
    </main>
  );
}
