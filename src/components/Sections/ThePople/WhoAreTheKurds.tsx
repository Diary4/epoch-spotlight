import { useState, useEffect } from "react";
import { ArrowLeft, KeyRound, Sparkles, TreePine } from "lucide-react";
import { useJourneyDetailAnimation } from "@/components/Sections/TheJourney/useJourneyDetailAnimation";
import PeopleDetailHeroVideo from "@/components/Sections/ThePople/PeopleDetailHeroVideo";
import heroVideo from "@/assets/videos/kch3.webm";
import en from "@/data/en.json";
import ar from "@/data/ar.json";
import ku from "@/data/ku.json";

const infoCards = [
  {
    title: "Ancient Roots",
    text: "The Kurds are among the ancient peoples of the Middle East, with a long and rich historical presence in the region.",
    icon: TreePine,
    color: "bg-[#00604f]",
  },
  {
    title: "Culture and Values",
    text: "Kurdish society is widely associated with courage, hospitality, family bonds, and a strong love of freedom and culture.",
    icon: Sparkles,
    color: "bg-[#c9903f]",
  },
  {
    title: "A Living Identity",
    text: "Today, Kurdish identity continues through language, music, traditions, literature, and everyday life across generations.",
    icon: KeyRound,
    color: "bg-[#00604f]",
  },
];

type WhoAreTheKurdsSectionProps = {
  lang?: "ku" | "en" | "ar";
  onBack?: () => void;
};

const CONTENT = { en, ar, ku } as const;

export default function WhoAreTheKurdsSection({ lang = "en", onBack }: WhoAreTheKurdsSectionProps) {
  const rootRef = useJourneyDetailAnimation([lang]);
  const data = CONTENT[lang] as any;
  const detail = data?.people?.detailPages?.whoAreTheKurds ?? {};

  const localizedCards = infoCards.map((card, i) => ({
    ...card,
    title: detail?.cards?.[i]?.title ?? card.title,
    text: detail?.cards?.[i]?.description ?? card.text,
  }));

  const dir = lang === "en" ? "ltr" : "rtl";
  const isRtlScript = lang === "ku" || lang === "ar";
  const displayFont = isRtlScript ? "font-amiri" : "font-serif";

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
      className={`relative h-screen w-screen overflow-hidden bg-[#f8f1e7] ${isRtlScript ? "font-amiri" : ""}`}
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
        <main ref={rootRef} className="m-0 h-full w-full bg-[#f8f1e7] text-[#17233b]">
          <section className="relative mx-auto flex h-full w-full flex-col overflow-hidden rounded-[22px] bg-[#fbf5eb]">
            <button
              type="button"
              onClick={onBack}
              className="journey-detail-back absolute left-[clamp(1rem,2cqw,2rem)] top-[clamp(1rem,2cqh,2rem)] z-30 grid h-[clamp(2.8rem,4.4cqw,3.8rem)] w-[clamp(2.8rem,4.4cqw,3.8rem)] place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm rtl:left-auto rtl:right-[clamp(1rem,2cqw,2rem)]"
              aria-label="Back to The People"
            >
              <ArrowLeft size={32} className="rtl:rotate-180" />
            </button>

            <div className="absolute left-0 top-[120px] h-full w-24 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />
            <div className="absolute right-0 top-[120px] h-full w-24 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

            <PeopleDetailHeroVideo
              src={heroVideo}
              dir={dir}
              className="h-[min(82cqh,1150px)] w-full"
              videoSide="right"
            />

            <div className="relative z-10 flex flex-1 flex-col px-[clamp(1.4rem,4cqw,4rem)] pt-[clamp(1.2rem,4cqh,3.5rem)] pb-[clamp(1.2rem,3cqh,2.6rem)]">
              <section className={`journey-detail-intro ${isRtlScript ? "max-w-[min(58cqw,900px)]" : "max-w-[min(46cqw,720px)]"}`}>
                <h1
                  className={`${displayFont} ${isRtlScript ? "font-medium" : "font-light"} whitespace-nowrap leading-none tracking-tight text-[#00604f] ${
                    isRtlScript
                      ? "text-[clamp(4.25rem,8.5cqw,8.5rem)]"
                      : "text-[clamp(6rem,11cqw,10rem)]"
                  }`}
                >
                  {detail?.title ?? "Who Are the Kurds?"}
                </h1>

                <p
                  className={`mt-[clamp(1rem,2.2cqh,2rem)] ${isRtlScript ? "font-medium" : "font-light"} leading-tight text-[#9b6d35] ${
                    isRtlScript
                      ? "whitespace-nowrap text-[clamp(1.35rem,2.35cqw,2.35rem)]"
                      : "text-[clamp(1.65rem,2.75cqw,2.7rem)]"
                  }`}
                >
                  {detail?.subtitle ?? "An ancient people of the Middle East."}
                </p>

                <div className="mt-[clamp(1rem,2.3cqh,2rem)] flex w-[clamp(9rem,18cqw,14.5rem)] items-center gap-4 text-[#b99152]">
                  <span className="h-0.5 flex-1 bg-[#b99152]" />
                  <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
                  <span className="h-0.5 flex-1 bg-[#b99152]" />
                </div>

                <p className={`mt-[clamp(1rem,2.4cqh,2rem)] max-w-[min(38cqw,590px)] text-[clamp(1.2rem,2cqw,1.95rem)] ${isRtlScript ? "font-bold" : "font-light"} leading-[1.55] text-[#2d3549]`}>
                  {detail?.description ??
                    "The Kurds have lived in these mountains and plains for thousands of years, shaping the region with their strength, spirit, and culture."}
                </p>
              </section>

              <div className="flex-[0.85]" />

              <section className="grid grid-cols-3 gap-[clamp(0.85rem,1.8cqw,2.1rem)]">
                {localizedCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <article
                      key={card.title}
                      className="journey-detail-card relative flex min-h-[clamp(27rem,44cqh,40rem)] flex-col items-center overflow-hidden rounded-[26px] border-2 border-[#ead8b7] bg-white/76 px-[clamp(0.95rem,1.9cqw,2rem)] py-[clamp(1rem,2.2cqh,2rem)] text-center shadow-[0_14px_35px_rgba(84,54,16,0.15)] backdrop-blur-md"
                    >
                      <div
                        className={`grid h-[clamp(4.1rem,7.5cqw,7.2rem)] w-[clamp(4.1rem,7.5cqw,7.2rem)] place-items-center rounded-full border-[6px] border-white ${card.color} text-[#f8e5b8] shadow-[0_8px_20px_rgba(0,0,0,0.16)]`}
                      >
                        <Icon size={56} strokeWidth={1.5} />
                      </div>

                      <h3 className={`mt-[clamp(0.8rem,1.8cqh,1.9rem)] whitespace-pre-line ${displayFont} text-[clamp(1.5rem,2.7cqw,2.5rem)] font-light leading-[0.98] text-[#00604f]`}>
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
                  );
                })}
              </section>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
