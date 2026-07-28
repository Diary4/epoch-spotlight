import React from "react";
import gsap from "gsap";
import { Globe2 } from "lucide-react";
import {
  religionsHeroImage,
  type ReligionsPageContent,
} from "@/components/Sections/religions/religionsContent";

type ReligionsV2AttractProps = {
  content: ReligionsPageContent;
  languageLabel: string;
  onEnter: () => void;
  onLanguageChange: () => void;
};

function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="h-px w-14 bg-[#c99a55]/70" />
      <span className="text-[18px] text-[#b98222]">✥</span>
      <span className="h-px w-14 bg-[#c99a55]/70" />
    </div>
  );
}

/** Opening introduction for Religions V2 — sets the story before the chapter hub. */
export default function ReligionsV2Attract({
  content,
  languageLabel,
  onEnter,
  onLanguageChange,
}: ReligionsV2AttractProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);

  React.useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-rv2-hero]", { autoAlpha: 0, scale: 1.05 });
      gsap.set("[data-rv2-a]", { autoAlpha: 0, y: 26 });
      gsap.set("[data-rv2-pillar]", { autoAlpha: 0, y: 32 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to("[data-rv2-hero]", { autoAlpha: 1, scale: 1, duration: 1.2 }, 0)
        .to("[data-rv2-a]", { autoAlpha: 1, y: 0, stagger: 0.1, duration: 1.1 }, 0.25)
        .to("[data-rv2-pillar]", { autoAlpha: 1, y: 0, stagger: 0.1, duration: 1.1 }, 0.5);
    }, sectionRef);

    return () => ctx.revert();
  }, [content.languageLabel]);

  return (
    <section
      ref={sectionRef}
      aria-label="Introduction to Religious and National Diversity in Kurdistan"
      className="relative flex min-h-full w-full flex-col overflow-hidden bg-[#faf8f5]"
    >
      <img
        data-rv2-hero="true"
        src={religionsHeroImage}
        alt=""
        className="absolute inset-x-0 top-0 h-[620px] w-full object-cover object-[center_28%]"
      />
      <div className="absolute inset-x-0 top-0 h-[620px] bg-gradient-to-b from-[#faf8f5]/55 via-[#faf8f5]/40 to-[#faf8f5]" />

      <button
        type="button"
        onClick={onLanguageChange}
        className="absolute right-12 top-10 z-40 flex items-center gap-3 rounded-full border border-[#d7b77e] bg-white/80 px-5 py-3 font-serif text-sm font-light text-[#3f2b17] shadow-[0_10px_24px_rgba(75,45,12,0.12)] backdrop-blur-md"
      >
        <Globe2 className="h-5 w-5" />
        {languageLabel}
      </button>

      <div className="relative z-20 flex flex-1 flex-col px-16 pb-12 pt-20">
        {/* Brand + introduction copy */}
        <div className="grid grid-cols-[1.05fr_0.95fr] items-end gap-10">
          <header data-rv2-a="true" className="max-w-[680px]">
            <p className="font-serif text-[13px] font-semibold uppercase tracking-[0.3em] text-[#b98222]">
              {content.introLabel}
            </p>
            <Ornament className="mt-6 justify-start" />
            <h1 className="mt-6 font-serif text-[78px] font-normal uppercase leading-[0.9] tracking-[0.06em] text-[#2f1f12]">
              Kurdistan
            </h1>
            <h2 className="mt-5 font-serif text-[24px] font-light uppercase tracking-[0.18em] text-[#6a4a25]">
              {content.subtitle.replace(/^Kurdistan:\s*/i, "")}
            </h2>
          </header>

          <div data-rv2-a="true" className="max-w-[520px] pb-2">
            <h3 className="font-serif text-[34px] font-normal leading-[1.15] text-[#2f1f12]">
              {content.introTitle}
            </h3>
            <p className="mt-5 font-sans text-[17px] leading-[1.7] text-[#5a3d22]/95">
              {content.introBody}
            </p>
          </div>
        </div>

        {/* Four intro pillars — what this journey covers */}
        <div className="mt-14 grid grid-cols-4 gap-5">
          {content.introPillars.map((pillar, index) => (
            <article
              key={pillar.title}
              data-rv2-pillar="true"
              className="group relative overflow-hidden rounded-[24px] border border-[#d7b77e]/45 bg-white/80 shadow-[0_12px_28px_rgba(75,45,12,0.08)]"
            >
              <div className="relative h-[180px] overflow-hidden">
                <img
                  src={pillar.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 "
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
                <span className="absolute left-4 top-4 font-serif text-[20px] text-[#b98222]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="px-5 pb-6 pt-2">
                <h4 className="font-serif text-[24px] leading-tight text-[#2f1f12]">{pillar.title}</h4>
                <p className="mt-2 font-sans text-[14px] leading-snug text-[#8a6a45]">{pillar.body}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Quote + CTA */}
        <div className="mt-auto flex items-end justify-between gap-10 pt-14">
          <blockquote
            data-rv2-a="true"
            className="max-w-[560px] border-l-[3px] border-[#b98222] pl-6"
          >
            <p className="font-serif text-[28px] italic leading-snug text-[#3f2b17]">
              “{content.introQuote}”
            </p>
            <p className="mt-4 font-sans text-[12px] font-semibold uppercase tracking-[0.18em] text-[#8a6a45]">
              {content.attractCaptionStrong}
            </p>
          </blockquote>

          <div data-rv2-a="true" className="flex flex-col items-end gap-5">
            <button
              type="button"
              onClick={onEnter}
              className="flex min-h-[84px] min-w-[340px] flex-col items-center justify-center rounded-full border border-[#d7b77e] bg-[#b98222] px-10 py-4 text-white shadow-[0_16px_36px_rgba(75,45,12,0.16)] transition-transform duration-200 active:scale-[0.98]"
            >
              <span className="font-serif text-[22px] uppercase tracking-[0.14em]">
                {content.introCta}
              </span>
              <small className="mt-1.5 font-sans text-[11px] uppercase tracking-[0.14em] text-white/80">
                {content.introCtaHint}
              </small>
            </button>
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a6a45]">
              {content.attractFooter[0]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
