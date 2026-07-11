import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useJourneyDetailAnimation } from "@/components/Sections/TheJourney/useJourneyDetailAnimation";
import { detailBackButtonClassName, detailBackButtonSideClassName, detailBackIconClassName, detailBackIconSize } from "@/constants/backNavigation";
import PeopleDetailHeroVideo from "@/components/Sections/ThePople/PeopleDetailHeroVideo";
import heroVideo from "@/assets/videos/diy.webm";
import languageIcon from "@/assets/icons/thepeople/sharedidentity/language.webp";
import traditionsIcon from "@/assets/icons/thepeople/sharedidentity/traditions.webp";
import memoryIcon from "@/assets/icons/thepeople/sharedidentity/memory.webp";
import en from "@/data/en.json";
import ar from "@/data/ar.json";
import ku from "@/data/ku.json";

const identityCards = [
  {
    title: "Language",
    text: "Kurdish language is a central part of identity and remains a living connection between generations and communities.",
    icon: languageIcon,
  },
  {
    title: "Traditions",
    text: "Music, dance, clothing, celebrations, and hospitality help preserve a shared sense of belonging.",
    icon: traditionsIcon,
  },
  {
    title: "Collective\nMemory",
    text: "Across different places and borders, Kurds remain connected through shared history, stories, and cultural memory.",
    icon: memoryIcon,
  },
];

type SharedIdentityPageProps = {
  lang?: "ku" | "en" | "ar";
  onBack?: () => void;
};

const CONTENT = { en, ar, ku } as const;

export default function SharedIdentityPage({ lang = "en", onBack }: SharedIdentityPageProps) {
  const rootRef = useJourneyDetailAnimation([lang]);
  const data = CONTENT[lang] as any;
  const detail = data?.people?.detailPages?.sharedIdentity ?? {};

  const localizedCards = identityCards.map((card, i) => ({
    ...card,
    title: detail?.cards?.[i]?.title
      ? detail.cards[i].title.replace(" ", "\n")
      : card.title,
    text: detail?.cards?.[i]?.description ?? card.text,
  }));

  const dir = lang === "en" ? "ltr" : "rtl";
  const isRtlScript = lang === "ku" || lang === "ar";
  const displayFont = isRtlScript ? "font-noto-naskh" : "font-serif";

  const [scale, setScale] = useState(1);
  const [leftOffset, setLeftOffset] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const targetWidth = 1400;
      if (width < targetWidth) {
        setScale(width / targetWidth);
        setLeftOffset(0);
      } else {
        setScale(1);
        setLeftOffset((width - targetWidth) / 2);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      dir={dir}
      lang={lang}
      className={`relative h-screen w-screen overflow-hidden bg-[#fbf5eb] ${isRtlScript ? "font-noto-naskh" : ""}`}
      style={{ width: "100vw", height: "100vh" }}
    >
      <div
        style={{
          width: "1400px",
          height: `${100 / scale}vh`,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          position: "absolute",
          top: 0,
          left: `${leftOffset}px`,
          containerType: "size",
        }}
      >
        <main ref={rootRef} className="m-0 h-full w-full bg-[#fbf5eb] text-[#17233b]">
          <section className="relative mx-auto flex h-full w-full flex-col overflow-hidden bg-[#fbf5eb]">
            <button
              type="button"
              onClick={onBack}
              className={`journey-detail-back ${detailBackButtonClassName} ${detailBackButtonSideClassName(dir)}`}
              aria-label="Back to The People"
            >
              <ArrowLeft size={detailBackIconSize} className={detailBackIconClassName(dir)} />
            </button>

            <div className="absolute left-0 top-[120px] h-full w-24 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />
            <div className="absolute right-0 top-[120px] h-full w-24 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

            <PeopleDetailHeroVideo
              src={heroVideo}
              dir={dir}
              className="h-[min(82cqh,1150px)] w-full"
              videoSide="left"
            />

            <div className="relative z-10 flex flex-1 flex-col px-[clamp(1.4rem,4cqw,4rem)] pt-[clamp(1.2rem,4cqh,3.5rem)] pb-[clamp(1.2rem,3cqh,2.6rem)]">
              <section
                className={`journey-detail-intro relative z-20 ${isRtlScript ? "max-w-[min(58cqw,900px)]" : "max-w-[min(40cqw,580px)]"} ${dir === "rtl" ? "ml-auto" : ""}`}
              >
                <h1
                  className={`${displayFont} ${isRtlScript ? "font-medium whitespace-nowrap" : "font-light whitespace-pre-line"} leading-none tracking-tight text-[#214439] ${
                    isRtlScript
                      ? "text-[clamp(4.25rem,8.5cqw,8.5rem)]"
                      : "text-[clamp(6rem,11cqw,10rem)]"
                  }`}
                >
                  {detail?.title ?? "A Shared\nIdentity"}
                </h1>

                <p
                  className={`mt-[clamp(1rem,2.2cqh,2rem)] ${isRtlScript ? "font-medium" : "font-light"} leading-tight text-[#9b6d35] ${
                    isRtlScript
                      ? "whitespace-nowrap text-[clamp(1.35rem,2.35cqw,2.35rem)]"
                      : "text-[clamp(1.65rem,2.75cqw,2.7rem)]"
                  }`}
                >
                  {detail?.subtitle ?? "United by language, heritage, and memory."}
                </p>

                {/* <div className="mt-[clamp(1rem,2.3cqh,2rem)] flex w-[clamp(9rem,18cqw,14.5rem)] items-center gap-4 text-[#b99152]">
                  <span className="h-0.5 flex-1 bg-[#b99152]" />
                  <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
                  <span className="h-0.5 flex-1 bg-[#b99152]" />
                </div> */}

                <p className={`mt-[clamp(1rem,2.4cqh,2rem)] max-w-[min(36cqw,520px)] text-[clamp(1.2rem,2cqw,1.95rem)] ${isRtlScript ? "font-bold" : "font-light"} leading-[1.55] text-[#2d3549]`}>
                  {detail?.description ??
                    "Across generations and places, Kurdish identity is a source of strength, pride, and unity. Rooted in a rich history and carried forward through everyday life."}
                </p>
              </section>

              <div className="flex-[0.85]" />

              <section className="grid grid-cols-3 gap-[clamp(0.85rem,1.8cqw,2.1rem)]">
                {localizedCards.map((card, i) => (
                    <article
                      key={i}
                      className="journey-detail-card relative flex min-h-[clamp(27rem,44cqh,40rem)] flex-col items-center overflow-hidden rounded-[26px] border-2 border-[#ead8b7] bg-white/76 px-[clamp(0.95rem,1.9cqw,2rem)] py-[clamp(1rem,2.2cqh,2rem)] text-center shadow-[0_14px_35px_rgba(84,54,16,0.15)] backdrop-blur-md"
                    >
                      <img
                        src={card.icon}
                        alt=""
                        className="h-[clamp(6.5rem,12cqw,11rem)] w-[clamp(6.5rem,12cqw,11rem)] object-contain"
                      />

                      <h3 className={`mt-[clamp(0.8rem,1.8cqh,1.9rem)] whitespace-pre-line ${displayFont} text-[clamp(1.5rem,2.7cqw,2.5rem)] font-light leading-[0.98] text-[#214439]`}>
                        {card.title}
                      </h3>

                      <div className="my-[clamp(0.75rem,1.6cqh,1.7rem)] flex w-[clamp(4.8rem,10cqw,8rem)] items-center justify-center gap-3 text-[#b99152]">
                        <span className="h-0.5 flex-1 bg-[#d2b475]" />
                        <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
                        <span className="h-0.5 flex-1 bg-[#d2b475]" />
                      </div>

                      <p className="text-[clamp(1.02rem,1.58cqw,1.5rem)] font-light leading-[1.5] text-[#303a50]">
                        {card.text}
                      </p>

                      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:18px_18px]" />
                    </article>
                ))}
              </section>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
