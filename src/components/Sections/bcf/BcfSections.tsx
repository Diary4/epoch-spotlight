import React from "react";
import { ChevronLeft } from "lucide-react";
import gsap from "gsap";
import BcfShell from "@/components/Sections/bcf/BcfShell";
import {
  bcfCopy,
  type BcfLang,
  type JourneyChapterId,
} from "@/components/Sections/bcf/bcfContent";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import storyThumb from "@/assets/images/religions/kurds/cover.webp";
import humanityThumb from "@/assets/images/PrimeMinistir/education.webp";
import mapThumb from "@/assets/images/PrimeMinistir/service.webp";
import impactThumb from "@/assets/images/TouristicPlace/GaliAliBag/16.webp";
import trustThumb from "@/assets/images/religions/coexistence/masoud-barzani.webp";
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
  trust: trustThumb,
  future: futureThumb,
};

const CIRCLE = 236;

/**
 * Constellation layout (1080×1920) — two rows of circles with the top-middle
 * node lifted, matching the Explore Our Journey Figma frame.
 * Positions are circle centers.
 */
const LAYOUT: {
  id: JourneyChapterId;
  cx: number;
  cy: number;
}[] = [
  { id: "humanity", cx: 200, cy: 820 },
  { id: "story", cx: 540, cy: 680 },
  { id: "map", cx: 880, cy: 820 },
  { id: "impact", cx: 200, cy: 1240 },
  { id: "trust", cx: 540, cy: 1240 },
  { id: "future", cx: 880, cy: 1240 },
];

type Point = { cx: number; cy: number };

/**
 * Smooth cubic path through three circle centers (left → middle → right).
 * Top row arches through the elevated middle; bottom row keeps a soft ribbon
 * undulation so flat rows still match the Figma wave, without looking hand-drawn.
 */
function rowCurve(a: Point, b: Point, c: Point, dy = 0): string {
  const lift = (p: Point): Point => ({ cx: p.cx, cy: p.cy + dy });
  const A = lift(a);
  const B = lift(b);
  const C = lift(c);
  const t = 0.42;
  const dx1 = B.cx - A.cx;
  const dx2 = C.cx - B.cx;
  const flat = Math.abs(A.cy - B.cy) < 1 && Math.abs(B.cy - C.cy) < 1;
  // Gentle sine-like ribbon when the three centers are level.
  const wave = flat ? 22 : 0;

  return [
    `M ${A.cx} ${A.cy}`,
    `C ${A.cx + dx1 * t} ${A.cy - wave} ${B.cx - dx1 * t} ${B.cy + wave * 0.35} ${B.cx} ${B.cy}`,
    `C ${B.cx + dx2 * t} ${B.cy + wave * 0.35} ${C.cx - dx2 * t} ${C.cy - wave} ${C.cx} ${C.cy}`,
  ].join(" ");
}

/** Three perfectly parallel strands per row — matching the Figma ribbon look. */
const ROW_STRAND_OFFSETS = [-14, 0, 14] as const;

export default function BcfSections({ lang, onBack, onSelect }: BcfSectionsProps) {
  const c = bcfCopy[lang];
  const stageRef = React.useRef<HTMLDivElement | null>(null);
  const [activeId, setActiveId] = React.useState<JourneyChapterId>("story");

  const topRow = React.useMemo(
    () => [LAYOUT[0], LAYOUT[1], LAYOUT[2]] as [Point, Point, Point],
    [],
  );
  const bottomRow = React.useMemo(
    () => [LAYOUT[3], LAYOUT[4], LAYOUT[5]] as [Point, Point, Point],
    [],
  );

  const rowPaths = React.useMemo(
    () => [
      ...ROW_STRAND_OFFSETS.map((dy) => rowCurve(topRow[0], topRow[1], topRow[2], dy)),
      ...ROW_STRAND_OFFSETS.map((dy) =>
        rowCurve(bottomRow[0], bottomRow[1], bottomRow[2], dy),
      ),
    ],
    [topRow, bottomRow],
  );

  React.useLayoutEffect(() => {
    const root = stageRef.current;
    if (!root) return;

    const nodes = root.querySelectorAll<HTMLElement>("[data-journey-node]");
    const lines = root.querySelectorAll<SVGPathElement>("[data-journey-line]");

    gsap.set(nodes, { opacity: 0, scale: 0.72 });
    gsap.set(lines, { opacity: 0 });

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(nodes, { opacity: 1, scale: 1 });
        gsap.set(lines, { opacity: 1 });
        return;
      }

      // Soft scale+fade entrance — same spirit as Who We Serve card motion.
      gsap
        .timeline({ delay: 0.12 })
        .to(lines, {
          opacity: 1,
          duration: 0.7,
          ease: "power1.out",
          stagger: 0.03,
        })
        .to(
          nodes,
          {
            opacity: 1,
            scale: 1,
            duration: 0.55,
            ease: "power2.out",
            stagger: 0.09,
          },
          "-=0.35",
        );
    }, root);

    return () => {
      ctx.revert();
      gsap.set(nodes, { opacity: 0, scale: 0.72 });
      gsap.set(lines, { opacity: 0 });
    };
  }, [lang]);

  const activate = (id: JourneyChapterId) => {
    setActiveId(id);
    const node = stageRef.current?.querySelector<HTMLElement>(
      `[data-journey-node="${id}"]`,
    );
    if (!node) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    gsap.fromTo(
      node,
      { scale: 0.92 },
      { scale: 1, duration: 0.4, ease: "power1.inOut", overwrite: "auto" },
    );
  };

  return (
    <BcfShell showLogo={false} overlayClassName="bg-black/0">
      <div
        className="relative min-h-[1920px] w-full overflow-hidden"
        style={{
          background:
            "radial-gradient(900px 700px at -10% -5%, rgba(32,44,94,0.55), transparent 60%), radial-gradient(1000px 800px at 110% 110%, rgba(50,36,9,0.5), transparent 55%), linear-gradient(180deg, #191205 0%, #0a0d22 100%)",
        }}
      >
        <button
          type="button"
          onClick={onBack}
          className="absolute right-10 top-10 z-30 grid h-14 w-14 place-items-center rounded-full bg-black/40 backdrop-blur-sm"
          aria-label={c.back}
        >
          <ChevronLeft className="h-7 w-7 text-white" />
        </button>

        <div className="absolute left-[80px] top-[124px] z-20 max-w-[860px]">
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

        <div ref={stageRef} className="absolute inset-0 z-20">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 1080 1920"
            fill="none"
            aria-hidden="true"
          >
            {rowPaths.map((d, index) => {
              const isCenter = index % 3 === 1;
              return (
                <path
                  key={`strand-${index}`}
                  data-journey-line=""
                  d={d}
                  stroke={
                    isCenter ? "rgba(251,193,88,0.42)" : "rgba(251,193,88,0.18)"
                  }
                  strokeWidth={isCenter ? 1.75 : 1.25}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              );
            })}
          </svg>

          {LAYOUT.map((item) => {
            const chapter = c.journeyChapters.find((ch) => ch.id === item.id);
            if (!chapter) return null;
            const isActive = activeId === item.id;
            const size = isActive ? CIRCLE + 16 : CIRCLE;

            return (
              <button
                key={item.id}
                type="button"
                data-journey-node={item.id}
                onClick={() => {
                  activate(item.id);
                  onSelect(item.id);
                }}
                onPointerEnter={() => activate(item.id)}
                className="absolute -translate-x-1/2 -translate-y-1/2 opacity-0"
                style={{
                  left: item.cx,
                  top: item.cy,
                  width: CIRCLE + 48,
                  height: CIRCLE + 48,
                }}
              >
                <span
                  className="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-2 transition-[width,height,box-shadow,border-color] duration-500 ease-smooth-out"
                  style={{
                    width: size,
                    height: size,
                    borderColor: isActive ? BCF.gold : "rgba(251,193,88,0.55)",
                    boxShadow: isActive
                      ? `0 0 28px ${BCF.gold}66, 0 0 0 6px rgba(251,193,88,0.12)`
                      : `0 0 0 0 ${BCF.gold}00`,
                  }}
                >
                  <img
                    src={thumbs[item.id]}
                    alt=""
                    decoding="async"
                    className="h-full w-full transform-gpu object-cover transition-transform duration-600 ease-smooth-out will-change-transform motion-reduce:transition-none"
                    style={{ transform: isActive ? "scale(1.08)" : "scale(1)" }}
                  />
                </span>
                <span className="absolute left-1/2 top-full mt-5 w-[280px] -translate-x-1/2 text-center text-[30px] font-medium leading-tight text-[#fdeed4]">
                  {chapter.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </BcfShell>
  );
}
