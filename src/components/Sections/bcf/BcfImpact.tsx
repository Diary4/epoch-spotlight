import React from "react";
import { ArrowRight, ChevronLeft, Sun } from "lucide-react";
import gsap from "gsap";
import BcfShell from "@/components/Sections/bcf/BcfShell";
import BcfStatValue from "@/components/Sections/bcf/BcfStatValue";
import { bcfCopy, type BcfLang } from "@/components/Sections/bcf/bcfContent";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import cardA from "@/assets/images/PrimeMinistir/service.webp";
import cardB from "@/assets/images/TouristicPlace/GaliAliBag/16.webp";

type BcfImpactProps = {
  lang: BcfLang;
  onBack: () => void;
};

const CARD_IMAGES = [cardA, cardB, cardA, cardB] as const;

/**
 * Our Impact — Figma grid: 2×2 photo stat cards + Human Story Layer CTA.
 */
export default function BcfImpact({ lang, onBack }: BcfImpactProps) {
  const c = bcfCopy[lang];
  const enItems = bcfCopy.en.impactItems;
  const gridRef = React.useRef<HTMLDivElement | null>(null);

  React.useLayoutEffect(() => {
    const root = gridRef.current;
    if (!root) return;
    const cards = root.querySelectorAll<HTMLElement>("[data-impact-card]");
    gsap.set(cards, { opacity: 0, y: 32 });

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: "power2.out",
        stagger: 0.1,
        delay: 0.12,
      });
    }, root);

    return () => ctx.revert();
  }, [lang]);

  return (
    <BcfShell showLogo={false} overlayClassName="bg-black/0">
      <div
        className="relative flex min-h-[1920px] flex-col overflow-hidden px-14 pb-20 pt-28"
        style={{
          background:
            "radial-gradient(900px 800px at 110% 35%, rgba(40,70,140,0.35), transparent 55%), linear-gradient(180deg, #0b0d14 0%, #0a0a0a 55%, #14100a 100%)",
        }}
      >
        <button
          type="button"
          onClick={onBack}
          className="absolute right-10 top-10 z-20 grid h-14 w-14 place-items-center rounded-full bg-black/40 backdrop-blur-sm"
          aria-label={c.back}
        >
          <ChevronLeft className="h-7 w-7 text-white" />
        </button>

        <div className="relative z-10 max-w-[820px]">
          <h1 className="text-[80px] font-bold leading-none tracking-[0.01em]">
            <span className="text-[#fbf4e4]">{c.impactTitleLead} </span>
            <span style={{ color: BCF.gold }}>{c.impactTitleGold}</span>
          </h1>
          <span
            className="mt-5 block h-px w-[120px]"
            style={{ backgroundColor: BCF.gold }}
          />
          <p className="mt-8 max-w-[720px] text-[28px] leading-relaxed text-white/80">
            {c.impactSubtitle}
          </p>
        </div>

        <div ref={gridRef} className="relative z-10 mt-14 flex w-full flex-col gap-7">
          <div className="grid grid-cols-2 gap-7">
            {c.impactItems.map((item, index) => (
              <article
                key={`${item.title}-${index}`}
                data-impact-card
                className="relative flex h-[520px] flex-col overflow-hidden rounded-[28px] border border-white/15 opacity-0"
              >
                <img
                  src={CARD_IMAGES[index]}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/35" />

                <div className="relative z-10 flex h-full flex-col p-9">
                  <div className="flex items-start justify-between">
                    <span className="text-[28px] font-light text-white/55">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="grid h-11 w-11 place-items-center rounded-full border"
                      style={{ borderColor: `${BCF.gold}88`, color: BCF.gold }}
                    >
                      <Sun className="h-5 w-5" />
                    </span>
                  </div>

                  <div className="mt-auto">
                    <BcfStatValue
                      value={enItems[index]?.value ?? item.value}
                      className="text-[72px] font-bold leading-none"
                      color="#fbf4e4"
                      duration={2.2}
                    />
                    <p className="mt-4 text-[34px] font-medium" style={{ color: BCF.gold }}>
                      {item.title}
                    </p>
                    <span className="mt-5 block border-t border-dashed border-white/30" />
                    <p className="mt-5 text-[24px] leading-snug text-white/80">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            data-impact-card
            className="relative flex h-[180px] w-full items-center overflow-hidden rounded-[28px] border border-white/20 bg-black/40 px-10 text-left opacity-0 backdrop-blur-sm"
          >
            <span className="absolute left-10 top-8 text-[28px] font-light text-white/55">
              01
            </span>
            <div className="min-w-0 flex-1 pr-10 pt-4">
              <h2 className="text-[44px] font-bold leading-tight">
                <span style={{ color: BCF.gold }}>{c.impactHumanStoryLead} </span>
                <span className="text-[#fbf4e4]">{c.impactHumanStoryRest}</span>
              </h2>
              <p className="mt-3 text-[26px] text-white/75">{c.impactHumanStoryHint}</p>
            </div>
            <span
              className="grid h-16 w-16 shrink-0 place-items-center rounded-full border"
              style={{ borderColor: `${BCF.gold}99`, color: BCF.gold }}
            >
              <ArrowRight className="h-7 w-7" />
            </span>
          </button>
        </div>
      </div>
    </BcfShell>
  );
}
