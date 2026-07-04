import React, { useState, useEffect } from "react";
import { ArrowLeft, BookOpen, Landmark, Scale } from "lucide-react";
import { useJourneyDetailAnimation } from "@/components/Sections/TheJourney/useJourneyDetailAnimation";
import { discoverDisplayFont, discoverSectionFont } from "@/components/Sections/discoverLanguage";
import { detailBackButtonClassName, detailBackButtonSideClassName } from "@/constants/backNavigation";
import en from "@/data/en.json";
import ar from "@/data/ar.json";
import ku from "@/data/ku.json";
import { localizeDigits } from "@/lib/utils";
import bg from "@/assets/images/thejourney/today.webp";

const rows = [
  {
    title: "Institutional Growth",
    text: "Today, Kurdistan continues strengthening institutions to serve society and public life.",
    icon: Landmark,
    color: "bg-[#13213b]",
  },
  {
    title: "Development and Services",
    text: "Ongoing reforms and projects aim to improve services, infrastructure, and opportunities.",
    icon: Scale,
    color: "bg-[#405846]",
  },
  {
    title: "Future Vision",
    text: "The Region moves forward with a long-term vision for stability, prosperity, and innovation.",
    icon: BookOpen,
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

type TodayPageProps = {
  lang?: LangCode;
  onBack?: () => void;
};

export default function TodayPage({ lang = "en", onBack }: TodayPageProps) {
  const rootRef = useJourneyDetailAnimation([lang]);
  const dir = lang === "en" ? "ltr" : "rtl";
  const displayFont = discoverDisplayFont(lang);
  const sectionFont = discoverSectionFont(lang);
  const data = CONTENT[lang] as any;
  const section: JourneySection =
    data?.journey?.sections?.today ?? data?.people?.sections?.today ?? {};

  const localizedRows = rows.map((row, i) => ({
    ...row,
    title: section.cards?.[i]?.title ?? row.title,
    text: section.cards?.[i]?.description ?? row.text,
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
      className={`relative h-screen w-screen overflow-hidden bg-[#f8f1e7] ${sectionFont}`}
      style={{
        width: "100vw",
        height: "100vh",
      }}
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
          <section className="relative mx-auto flex h-full w-full flex-col overflow-hidden bg-[#fbf5eb]">
            <button
              type="button"
              onClick={onBack}
              className={`journey-detail-back ${detailBackButtonClassName} ${detailBackButtonSideClassName(dir)}`}
              aria-label="Back to The Journey"
            >
              <ArrowLeft size={32} className="rtl:rotate-180" />
            </button>
            <div className="absolute left-0 top-[120px] h-full w-24 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />
            <div className="absolute right-0 top-[120px] h-full w-24 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

            <div className="journey-detail-hero pointer-events-none absolute right-0 top-0 h-[min(100cqh,1500px)] w-full overflow-hidden rtl:right-auto rtl:left-0">
              <div className={`absolute inset-0 ${dir === "rtl" ? "-scale-x-100" : ""}`}>
                <img
                  src={bg}
                  alt="Today development"
                  className="absolute inset-0 h-full w-full object-cover opacity-78 [mask-image:radial-gradient(circle_at_38%_46%,black_0%,black_55%,transparent_84%)]"
                />
              </div>
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[clamp(5rem,18cqh,14rem)] bg-gradient-to-t from-[#fbf5eb] via-[#fbf5eb]/80 to-transparent"
                aria-hidden
              />
            </div>

            <div className="relative z-10 flex flex-1 flex-col px-[clamp(1.4rem,4cqw,4rem)] pt-[clamp(1.2rem,4cqh,3.5rem)] pb-[clamp(1.2rem,3cqh,2.6rem)]">
              <section className="journey-detail-intro ml-auto max-w-[min(47cqw,740px)] text-right rtl:text-right">
                <h1 className={`${displayFont} text-[clamp(6rem,11cqw,10rem)] font-light leading-none tracking-tight text-[#17233b]`}>
                  {localizeDigits(section.title ?? "Today", lang)}
                </h1>

                <p className="mt-[clamp(1rem,2.1cqh,1.8rem)] text-[clamp(1.6rem,2.6cqw,2.55rem)] font-light leading-tight text-[#9b6d35]">
                  {section.headline ?? "Kurdistan continues to grow through institutions, development, and vision."}
                </p>

                <div className="ml-auto mt-[clamp(1rem,2.3cqh,2rem)] flex w-[clamp(9rem,18cqw,14.5rem)] items-center gap-4 text-[#b99152]">
                  <span className="h-0.5 flex-1 bg-[#b99152]" />
                  <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
                </div>

                <p className="ml-auto mt-[clamp(1rem,2.4cqh,2rem)] max-w-[min(39cqw,620px)] rounded-[18px] border border-[#ead8b7]/80 bg-white/90 px-[clamp(1rem,1.8cqw,1.6rem)] py-[clamp(0.85rem,1.6cqh,1.4rem)] text-[clamp(1.2rem,2cqw,1.95rem)] font-light leading-[1.55] text-[#2d3549] shadow-[0_8px_24px_rgba(84,54,16,0.12)] backdrop-blur-md">
                  {section.description ?? "Kurdistan is building a stronger tomorrow through progress, unity, and opportunity."}
                </p>
              </section>

              <div className="flex-[0.85]" />

              <section className="space-y-[clamp(0.8rem,1.7cqh,1.9rem)]">
                {localizedRows.map((row) => {
                  const Icon = row.icon;
                  return (
                    <article
                      key={row.title}
                      className="journey-detail-card relative flex min-h-[clamp(9.2rem,16cqh,13.5rem)] items-center rounded-[26px] border-2 border-[#ead8b7] bg-white/76 px-[clamp(1rem,2.1cqw,2.5rem)] py-[clamp(0.9rem,1.9cqh,1.8rem)] shadow-[0_14px_35px_rgba(84,54,16,0.13)] backdrop-blur-md"
                    >
                      <div className="flex w-[clamp(5.6rem,13cqw,11.5rem)] justify-center">
                        <div className={`grid h-[clamp(4.1rem,7.5cqw,7rem)] w-[clamp(4.1rem,7.5cqw,7rem)] place-items-center rounded-full border-[6px] border-white ${row.color} text-[#f8e5b8] shadow-[0_8px_20px_rgba(0,0,0,0.16)]`}>
                          <Icon size={54} strokeWidth={1.5} />
                        </div>
                      </div>

                      <div className="h-[clamp(4.5rem,9cqh,7rem)] w-px bg-[#e2c99b]" />

                      <div className="px-[clamp(0.9rem,1.9cqw,2.4rem)]">
                        <h3 className={`${displayFont} text-[clamp(1.45rem,2.65cqw,2.6rem)] font-light leading-tight text-[#17233b]`}>
                          {localizeDigits(row.title, lang)}
                        </h3>
                        <p className="mt-[clamp(0.45rem,0.9cqh,0.9rem)] max-w-[min(45cqw,760px)] text-[clamp(1.02rem,1.58cqw,1.5rem)] font-light leading-[1.42] text-[#303a50]">
                          {localizeDigits(row.text, lang)}
                        </p>
                      </div>
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
