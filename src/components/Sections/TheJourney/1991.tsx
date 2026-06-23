import React, { useState, useEffect } from "react";
import { ArrowLeft, BarChart3, Landmark, UsersRound } from "lucide-react";
import { useJourneyDetailAnimation } from "@/components/Sections/TheJourney/useJourneyDetailAnimation";
import { discoverDisplayFont, discoverRtlScript } from "@/components/Sections/discoverLanguage";
import en from "@/data/en.json";
import ar from "@/data/ar.json";
import ku from "@/data/ku.json";
import bg from "@/assets/mainImages/1991.webp";

const cards = [
  {
    title: "Historic\nUprising",
    text: "In 1991, a major uprising marked a turning point in Kurdish history in Iraq.",
    icon: UsersRound,
    color: "bg-[#c59a4b]",
  },
  {
    title: "A New\nReality",
    text: "This moment opened the way for a new political and administrative reality in the Kurdistan Region.",
    icon: Landmark,
    color: "bg-[#5d6a50]",
  },
  {
    title: "A Foundation\nfor the Future",
    text: "The developments of 1991 laid the groundwork for modern self-governance.",
    icon: BarChart3,
    color: "bg-[#9d3637]",
  },
];

type LangCode = "ku" | "en" | "ar";

type JourneySection = {
  title?: string;
  headline?: string;
  description?: string;
  cards?: { title: string; description: string }[];
};

const CONTENT = { en, ar, ku } as const;

type Year1991PageProps = {
  lang?: LangCode;
  onBack?: () => void;
};

export default function Year1991Page({ lang = "en", onBack }: Year1991PageProps) {
  const rootRef = useJourneyDetailAnimation([lang]);
  const dir = lang === "en" ? "ltr" : "rtl";
  const isRtlScript = discoverRtlScript(lang);
  const displayFont = discoverDisplayFont(lang);
  const data = CONTENT[lang] as any;
  const section: JourneySection =
    data?.journey?.sections?.["1991"] ?? data?.people?.sections?.["1991"] ?? {};
  const localizedCards = cards.map((card, i) => ({
    ...card,
    title: section.cards?.[i]?.title
      ? section.cards[i].title.replace(" ", "\n")
      : card.title,
    text: section.cards?.[i]?.description ?? card.text,
  }));

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
              aria-label="Back to The Journey"
            >
              <ArrowLeft size={32} className="rtl:rotate-180" />
            </button>

            <div className="absolute left-0 top-[120px] h-full w-24 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />
            <div className="absolute right-0 top-[120px] h-full w-24 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

            <div className="journey-detail-hero pointer-events-none absolute right-0 top-0 h-[min(100cqh,1400px)] w-full overflow-hidden rtl:right-auto rtl:left-0">
              <div className={`absolute inset-0 ${dir === "rtl" ? "-scale-x-100" : ""}`}>
                <img
                  src={bg}
                  alt="1991 background"
                  className="absolute inset-0 h-full w-full object-cover opacity-78 [mask-image:radial-gradient(circle_at_58%_48%,black_0%,black_55%,transparent_84%)]"
                />
              </div>
            </div>

            <div className="relative z-10 flex flex-1 flex-col px-[clamp(1.4rem,4cqw,4rem)] pt-[clamp(1.2rem,4cqh,3.5rem)] pb-[clamp(1.2rem,3cqh,2.6rem)]">
              <section className="journey-detail-intro max-w-[min(46cqw,720px)]">
                <h1 className={`${displayFont} text-[clamp(6rem,11cqw,10rem)] font-light leading-none tracking-tight text-[#17233b]`}>
                  {section.title ?? "1991"}
                </h1>

                <p className="mt-[clamp(1rem,2.2cqh,2rem)] text-[clamp(1.65rem,2.75cqw,2.7rem)] font-light leading-tight text-[#9b6d35]">
                  {section.headline ?? "A historic turning point."}
                </p>

                <div className="mt-[clamp(1rem,2.3cqh,2rem)] flex w-[clamp(9rem,18cqw,14.5rem)] items-center gap-4 text-[#b99152]">
                  <span className="h-0.5 flex-1 bg-[#b99152]" />
                  <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
                  <span className="h-0.5 flex-1 bg-[#b99152]" />
                </div>

                <p className="mt-[clamp(1rem,2.4cqh,2rem)] max-w-[min(38cqw,590px)] text-[clamp(1.2rem,2cqw,1.95rem)] font-light leading-[1.55] text-[#2d3549]">
                  {section.description ??
                    "A moment of courage and unity that opened the path to a new chapter for the Kurdistan Region."}
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

                      <h3 className={`mt-[clamp(0.8rem,1.8cqh,1.9rem)] whitespace-pre-line ${displayFont} text-[clamp(1.5rem,2.7cqw,2.5rem)] font-light leading-[0.98] text-[#17233b]`}>
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
