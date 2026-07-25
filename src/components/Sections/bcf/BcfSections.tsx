import React from "react";
import { ArrowRight, ChevronLeft } from "lucide-react";
import gsap from "gsap";
import BcfShell from "@/components/Sections/bcf/BcfShell";
import {
  bcfCopy,
  type BcfLang,
  type JourneyChapterId,
} from "@/components/Sections/bcf/bcfContent";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import storyThumb from "@/assets/images/religions/kurds/cover.jpeg";
import humanityThumb from "@/assets/images/PrimeMinistir/education.webp";
import mapThumb from "@/assets/images/PrimeMinistir/service.webp";
import impactThumb from "@/assets/images/TouristicPlace/GaliAliBag/16.webp";
import futureThumb from "@/assets/images/PrimeMinistir/agreement.webp";

type BcfSectionsProps = {
  lang: BcfLang;
  onBack: () => void;
  onSelect: (id: JourneyChapterId) => void;
};

const thumbs: Record<JourneyChapterId, string> = {
  story: storyThumb,
  humanity: humanityThumb,
  map: mapThumb,
  impact: impactThumb,
  future: futureThumb,
};

/**
 * Figma Story Sections-3 (1080 design): pills along a left-anchored arc.
 * Canvas is 1400 wide — X positions are scaled; Y stays on the 1920 design grid.
 */
const SCALE_X = 1400 / 1080;
const CIRCLE = 200;

const LAYOUT: {
  id: JourneyChapterId;
  left: number;
  top: number;
  width: number;
}[] = [
  { id: "story", left: 153, top: 494, width: 483 },
  { id: "humanity", left: 379, top: 719, width: 606 },
  { id: "map", left: 460, top: 960, width: 570 },
  { id: "impact", left: 460, top: 1201, width: 476 },
  { id: "future", left: 360, top: 1441, width: 592 },
];

export default function BcfSections({ lang, onBack, onSelect }: BcfSectionsProps) {
  const c = bcfCopy[lang];
  const listRef = React.useRef<HTMLDivElement | null>(null);

  React.useLayoutEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const rows = el.querySelectorAll<HTMLElement>("[data-journey-row]");
    // Hide before first paint so sections never flash visible, then stagger in.
    gsap.set(rows, { opacity: 0, x: -36 });
    const ctx = gsap.context(() => {
      gsap.to(rows, {
        opacity: 1,
        x: 0,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.15,
      });
    }, el);
    return () => {
      ctx.revert();
      gsap.set(rows, { opacity: 0, x: -36 });
    };
  }, [lang]);

  return (
    <BcfShell showLogo={false} overlayClassName="bg-black/0">
      <div
        className="relative min-h-[1920px] w-full overflow-hidden"
        style={{
          background:
            "radial-gradient(900px 700px at -10% -5%, rgba(32,44,94,0.55), transparent 60%), radial-gradient(1000px 800px at 110% 110%, rgba(50,36,9,0.5), transparent 55%), linear-gradient(180deg, #191205 0%, #0a0d22 100%)",
        }}
      >
        {/* Concentric arcs behind the chapter pills (Figma Ellipse 1 / 2). */}
        <div
          className="pointer-events-none absolute rounded-full border border-white/[0.12]"
          style={{
            left: -715 * SCALE_X,
            top: 473,
            width: 1300 * SCALE_X,
            height: 1300 * SCALE_X,
          }}
        />
        <div
          className="pointer-events-none absolute rounded-full border border-white/[0.08]"
          style={{
            left: -659 * SCALE_X,
            top: 564,
            width: 1133 * SCALE_X,
            height: 1133 * SCALE_X,
          }}
        />

        <button
          type="button"
          onClick={onBack}
          className="absolute right-10 top-10 z-30 grid h-14 w-14 place-items-center rounded-full bg-black/40 backdrop-blur-sm"
          aria-label={c.back}
        >
          <ChevronLeft className="h-7 w-7 text-white" />
        </button>

        <div className="absolute left-[80px] top-[124px] z-20 max-w-[720px]">
          <h1 className="text-[80px] font-bold leading-none tracking-[0.01em]">
            <span className="text-[#fbf4e4]">{c.journeyTitleLead}</span>{" "}
            <span style={{ color: BCF.gold }}>{c.journeyTitleGold}</span>
          </h1>
          <div className="mt-8 flex w-full max-w-[520px] items-center gap-3">
            <span className="h-px flex-1" style={{ backgroundColor: `${BCF.gold}aa` }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: BCF.gold }} />
          </div>
          <p className="mt-6 text-[32px] text-[#d2ba91]">{c.journeySubtitle}</p>
        </div>

        <div ref={listRef} className="absolute inset-0 z-20">
          {LAYOUT.map((item) => {
            const chapter = c.journeyChapters.find((ch) => ch.id === item.id);
            if (!chapter) return null;
            const left = item.left * SCALE_X;
            const width = item.width * SCALE_X;
            return (
              <button
                key={item.id}
                type="button"
                data-journey-row
                onClick={() => onSelect(item.id)}
                className="absolute flex items-center rounded-full bg-black/25 py-5 pl-[210px] pr-8 text-left opacity-0 backdrop-blur-sm active:scale-[0.99]"
                style={{
                  left,
                  top: item.top,
                  width,
                  minHeight: 141,
                  transform: "translateX(-36px)",
                }}
              >
                <span
                  className="absolute left-0 top-1/2 h-[200px] w-[200px] -translate-y-1/2 overflow-hidden rounded-full border-2"
                  style={{
                    borderColor: item.id === "story" ? BCF.gold : "rgba(251,193,88,0.55)",
                    boxShadow:
                      item.id === "story" ? `0 0 28px ${BCF.gold}55` : "none",
                    width: CIRCLE,
                    height: CIRCLE,
                  }}
                >
                  <img src={thumbs[item.id]} alt="" className="h-full w-full object-cover" />
                </span>
                <span className="flex min-w-0 flex-col items-start gap-4">
                  <span className="text-[52px] font-light leading-none text-[#fdeed4]">
                    {chapter.title}
                  </span>
                  <span className="flex items-center gap-2 text-[#fbc158]">
                    <span className="h-px w-16 bg-current" />
                    <ArrowRight className="h-6 w-6" />
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </BcfShell>
  );
}
