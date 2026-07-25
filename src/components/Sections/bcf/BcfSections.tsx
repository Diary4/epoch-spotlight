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
import humanityThumb from "@/assets/images/PrimeMinistir/service.webp";
import mapThumb from "@/assets/images/TouristicPlace/ErbilCastle/IMG_8636 copy.webp";
import impactThumb from "@/assets/images/TouristicPlace/GaliAliBag/16.webp";
import futureThumb from "@/assets/images/religions/coexistence/masoud-barzani.jpeg";

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

// Circle centers (px) inside a 1288-wide coordinate space — the content
// width of the 1400px design canvas minus the page's px-14 gutters.
const CANVAS_WIDTH = 1288;
const CIRCLE_R = 96;
const POINTS = [
  { x: 150, y: 116 },
  { x: 214, y: 388 },
  { x: 160, y: 660 },
  { x: 112, y: 932 },
  { x: 98, y: 1204 },
];

/** Catmull-Rom -> cubic-Bezier conversion for a smooth curve through arbitrary points. */
function smoothPath(points: { x: number; y: number }[]) {
  if (points.length < 2) return "";
  const d: string[] = [`M ${points[0].x} ${points[0].y}`];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d.push(`C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`);
  }
  return d.join(" ");
}

const CURVE_PATH = smoothPath(POINTS);
const LIST_HEIGHT = POINTS[POINTS.length - 1].y + CIRCLE_R + 40;

export default function BcfSections({ lang, onBack, onSelect }: BcfSectionsProps) {
  const c = bcfCopy[lang];
  const listRef = React.useRef<HTMLDivElement | null>(null);

  React.useLayoutEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const rows = el.querySelectorAll("[data-journey-row]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        rows,
        { opacity: 0, x: -32 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power3.out", stagger: 0.14, delay: 0.15 },
      );
    }, el);
    return () => ctx.revert();
  }, [lang]);

  return (
    <BcfShell overlayClassName="bg-black/0">
      <div
        className="relative flex min-h-[1920px] flex-col px-14 pb-24 pt-28"
        style={{
          background:
            "radial-gradient(1100px 640px at 10% -8%, rgba(32,44,94,0.55), transparent 62%), linear-gradient(180deg, #0c1224 0%, #0a0a0a 55%, #0a0a0a 100%)",
        }}
      >
        <button
          type="button"
          onClick={onBack}
          className="mb-10 flex w-fit items-center gap-2 text-[24px] text-white/70"
        >
          <ChevronLeft className="h-7 w-7" />
          {c.back}
        </button>

        <h1 className="flex flex-wrap items-baseline gap-x-4 font-sans text-[62px] font-bold leading-[1.12] tracking-[0.01em]">
          <span className="text-white">{c.journeyTitleLead}</span>
          <span style={{ color: BCF.gold }}>{c.journeyTitleGold}</span>
        </h1>
        <div className="mt-6 flex items-center gap-3">
          <span className="h-px w-[180px]" style={{ backgroundColor: `${BCF.gold}88` }} />
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: BCF.gold }} />
        </div>
        <p className="mt-6 text-[24px] tracking-[0.1em] text-white/70">{c.journeySubtitle}</p>

        <div ref={listRef} className="relative mt-16 w-full" style={{ height: LIST_HEIGHT }}>
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox={`0 0 ${CANVAS_WIDTH} ${LIST_HEIGHT}`}
            fill="none"
            preserveAspectRatio="none"
          >
            <circle
              cx={-260}
              cy={LIST_HEIGHT * 0.42}
              r={620}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={1}
            />
            <path d={CURVE_PATH} stroke="rgba(255,255,255,0.22)" strokeWidth={1.5} />
          </svg>

          {c.journeyChapters.map((chapter, index) => {
            const point = POINTS[index];
            const pillLeft = point.x + CIRCLE_R + 32;
            return (
              <div
                key={chapter.id}
                data-journey-row
                className="absolute left-0 right-0"
                style={{ top: point.y - CIRCLE_R, height: CIRCLE_R * 2 }}
              >
                <button
                  type="button"
                  onClick={() => onSelect(chapter.id)}
                  className="absolute top-0 overflow-hidden rounded-full border-2 transition active:scale-[0.96]"
                  style={{
                    left: point.x - CIRCLE_R,
                    width: CIRCLE_R * 2,
                    height: CIRCLE_R * 2,
                    borderColor: index === 0 ? BCF.gold : "rgba(255,255,255,0.35)",
                    boxShadow: index === 0 ? `0 0 34px ${BCF.gold}66` : "none",
                  }}
                >
                  <img src={thumbs[chapter.id]} alt="" className="h-full w-full object-cover" />
                </button>

                <button
                  type="button"
                  onClick={() => onSelect(chapter.id)}
                  className="absolute flex items-center justify-between rounded-full border border-white/12 bg-white/[0.06] px-9 py-6 text-left backdrop-blur-sm transition active:scale-[0.99]"
                  style={{ left: pillLeft, right: 0, top: "50%", transform: "translateY(-50%)" }}
                >
                  <span className="text-[30px] font-medium text-white">{chapter.title}</span>
                  <span className="ml-6 flex shrink-0 items-center gap-2">
                    <span className="h-px w-8 bg-white/40" />
                    <ArrowRight className="h-6 w-6" style={{ color: BCF.gold }} />
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </BcfShell>
  );
}
