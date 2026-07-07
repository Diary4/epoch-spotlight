import React, { useState, useEffect } from "react";
import { ArrowLeft, BarChart3, Building2, Landmark } from "lucide-react";
import { useJourneyDetailAnimation } from "@/components/Sections/TheJourney/useJourneyDetailAnimation";
import { discoverDisplayFont, discoverSectionFont } from "@/components/Sections/discoverLanguage";
import { detailBackButtonClassName, detailBackButtonSideClassName, detailBackIconClassName, detailBackIconSize } from "@/constants/backNavigation";
import en from "@/data/en.json";
import ar from "@/data/ar.json";
import ku from "@/data/ku.json";
import bg from "@/assets/images/thejourney/building.jpg";

const rows = [
  {
    title: "Public Institutions",
    text: "Over time, Kurdistan developed institutions that helped organize governance and public life.",
    icon: Landmark,
    color: "bg-[#13213b]",
  },
  {
    title: "Parliament, Government, Presidency",
    text: "These institutions became essential parts of the regional political system.",
    icon: Building2,
    color: "bg-[#405846]",
  },
  {
    title: "Institutional Growth",
    text: "Together, they helped shape a more structured and functioning regional administration.",
    icon: BarChart3,
    color: "bg-[#943134]",
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

type BuildingInstitutionsPageProps = {
  lang?: LangCode;
  onBack?: () => void;
};

export default function BuildingInstitutionsPage({ lang = "en", onBack }: BuildingInstitutionsPageProps) {
  const rootRef = useJourneyDetailAnimation([lang]);
  const dir = lang === "en" ? "ltr" : "rtl";
  const displayFont = discoverDisplayFont(lang);
  const sectionFont = discoverSectionFont(lang);
  const data = CONTENT[lang] as any;
  const section: JourneySection =
    data?.journey?.sections?.institutions ?? data?.people?.sections?.institutions ?? {};
  
  const localizedRows = rows.map((row, i) => ({
    ...row,
    title: section.cards?.[i]?.title ?? row.title,
    text: section.cards?.[i]?.description ?? row.text,
  }));

  // Handle scaling layout for smaller viewport widths
  const [scale, setScale] = useState(1);
  const [leftOffset, setLeftOffset] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const targetWidth = 1400; // Target design width
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
      className={`relative h-screen w-screen overflow-hidden bg-[#fbf5eb] ${sectionFont}`}
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
        <main ref={rootRef} className="m-0 h-full w-full bg-[#fbf5eb] text-[#17233b]">
          <section className="relative mx-auto flex h-full w-full flex-col overflow-hidden bg-[#fbf5eb] px-[clamp(1.2rem,4cqw,4rem)] py-[clamp(1.2rem,3.6cqh,3.8rem)]">
            <button
              type="button"
              onClick={onBack}
              className={`journey-detail-back ${detailBackButtonClassName} ${detailBackButtonSideClassName(dir)}`}
              aria-label="Back to The Journey"
            >
              <ArrowLeft size={detailBackIconSize} className={detailBackIconClassName(dir)} />
            </button>
            <div className="absolute left-0 top-0 h-full w-24 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />
            <div className="absolute right-0 top-0 h-full w-24 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

            {/* Right-side visual: image and fade share the same entrance animation */}
            <div className="journey-detail-hero pointer-events-none absolute inset-y-0 right-0 h-[min(100cqh,1600px)] w-full overflow-hidden rtl:right-auto rtl:left-0">
              <div className={`absolute inset-0 ${dir === "rtl" ? "-scale-x-100" : ""}`}>
                <img
                  src={bg}
                  alt="Building institutions in Kurdistan"
                  className="h-full w-full object-cover object-right-top [mask-image:radial-gradient(circle_at_72%_42%,black_0%,black_58%,transparent_92%)]"
                />
              </div>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-[42%] bg-gradient-to-r from-[#fbf5eb]/95 via-[#fbf5eb]/35 to-transparent rtl:left-auto rtl:right-0 rtl:bg-gradient-to-l" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[clamp(6rem,16cqh,14rem)] bg-gradient-to-b from-transparent via-[#fbf5eb]/45 to-[#fbf5eb]/90" />
            </div>

            <div className="relative z-10 flex flex-1 flex-col">
              {/* Hero text */}
              <section className="journey-detail-intro max-w-[min(46cqw,740px)] pt-[clamp(2.5rem,7cqh,6rem)]">
                <h1 className={`${displayFont} text-[clamp(3.9rem,7.2cqw,6.8rem)] font-light leading-[1.02] tracking-tight text-[#17233b]`}>
                  {(section.title ?? "Building Institutions").split(" ").slice(0, -1).join(" ")}<br />{(section.title ?? "Building Institutions").split(" ").slice(-1)}
                </h1>

                <p className="mt-[clamp(1rem,2.2cqh,2rem)] text-[clamp(1.55rem,2.5cqw,2.45rem)] font-light leading-tight text-[#7a5324]">
                  {section.headline ?? "From transition to governance."}
                </p>

                <div className="mt-[clamp(1rem,2.3cqh,2rem)] flex w-[clamp(9rem,18cqw,14.5rem)] items-center gap-4 text-[#b99152]">
                  <span className="h-0.5 flex-1 bg-[#b99152]" />
                  <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
                </div>

                <p className="mt-[clamp(1rem,2.4cqh,2rem)] max-w-[min(37cqw,560px)] text-[clamp(1.12rem,1.85cqw,1.85rem)] font-light leading-[1.48] text-[#17233b]">
                  {section.description ?? "Discover how institutions were established and strengthened to serve the people of Kurdistan."}
                </p>
              </section>

              <div className="flex-[0.85]" />

              {/* Rows */}
              <section className="space-y-[clamp(0.75rem,1.6cqh,1.6rem)] pb-[clamp(0.3rem,1.4cqh,1rem)]">
                {localizedRows.map((row) => {
                  const Icon = row.icon;
                  return (
                    <article
                      key={row.title}
                      className="journey-detail-card relative flex min-h-[clamp(9.2rem,15.8cqh,13.2rem)] items-center rounded-[24px] border-2 border-[#ead8b7] bg-white/76 px-[clamp(1rem,2.1cqw,2.5rem)] py-[clamp(0.9rem,1.9cqh,1.8rem)] shadow-[0_14px_35px_rgba(84,54,16,0.13)] backdrop-blur-md"
                    >
                      <div className="flex w-[clamp(5.6rem,13cqw,11.5rem)] justify-center">
                        <div className={`grid h-[clamp(4.1rem,7.5cqw,7rem)] w-[clamp(4.1rem,7.5cqw,7rem)] place-items-center rounded-full border-[6px] border-white ${row.color} text-[#f8e5b8] shadow-[0_8px_20px_rgba(0,0,0,0.16)]`}>
                          <Icon size={54} strokeWidth={1.5} />
                        </div>
                      </div>

                      <div className="h-[clamp(4.5rem,8.8cqh,6.8rem)] w-px bg-[#e2c99b]" />

                      <div className="px-[clamp(0.9rem,1.9cqw,2.4rem)]">
                        <h3 className={`${displayFont} text-[clamp(1.35rem,2.45cqw,2.4rem)] font-light leading-tight text-[#17233b]`}>
                          {row.title}
                        </h3>
                        <p className="mt-[clamp(0.45rem,0.9cqh,0.9rem)] max-w-[min(45cqw,760px)] text-[clamp(1.02rem,1.56cqw,1.48rem)] font-medium leading-[1.42] text-[#303a50]">
                          {row.text}
                        </p>
                      </div>

                      <div className="pointer-events-none absolute right-0 top-0 h-full w-[clamp(2.4rem,6cqw,7rem)] opacity-18 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:18px_18px]" />
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