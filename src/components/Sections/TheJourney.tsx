import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  ArrowLeft,
  BarChart3,
  Landmark,
  Network,
  Scale,
  SunMedium,
} from "lucide-react";
import en from "@/data/en.json";
import ar from "@/data/ar.json";
import ku from "@/data/ku.json";
import { localizeDigits } from "@/lib/utils";
import bg from "@/assets/mainImages/thejourney/journey-1.webp";
import bg2 from "@/assets/mainImages/thejourney/journey-2.webp";
import bg3 from "@/assets/mainImages/thejourney/journey-3.webp";

const milestones = [
  {
    title: "1991",
    text: "A historic turning point that opened the path to a new reality.",
    icon: SunMedium,
    color: "#c29242",
  },
  {
    title: "1992",
    text: "The first parliament and government marked the beginning of self-rule.",
    icon: Landmark,
    color: "#425b42",
  },
  {
    title: "Building Institutions",
    text: "Public institutions gradually formed the structure of modern governance.",
    icon: Network,
    color: "#963438",
  },
  {
    title: "2005",
    text: "Federal recognition gave constitutional status to the Kurdistan Region.",
    icon: Scale,
    color: "#0f203a",
  },
  {
    title: "Today",
    text: "Kurdistan continues to grow through institutions, development, and vision.",
    icon: BarChart3,
    color: "#c29242",
  },
];

type LangCode = "ku" | "en" | "ar";
const CONTENT = { en, ar, ku } as const;

const EMPTY_JOURNEY_ITEMS: never[] = [];

type JourneyMilestoneId = "1991" | "1992" | "buildingInstitutions" | "2005" | "today";

type JourneyTimelinePageProps = {
  lang?: LangCode;
  onBack?: () => void;
  onSelectMilestone?: (milestone: JourneyMilestoneId) => void;
};

/** Horizontal wobble along the rail (matches original art direction). */
const DOT_X = [59, 58, 60, 61, 62] as const;

/** Nudge the whole rail a few px right of the card–image midpoint. */
const TIMELINE_NUDGE_RIGHT_PX = 28;

/**
 * Curvier path than default Catmull (1/6): still passes exactly through each milestone
 * so dots stay on-card; only control handles + lateral swing shape the S between knots.
 */
const PATH_CURVE_K = 0.34;
/** Per-span horizontal offset on Bézier controls (viewBox units), alternating like the legacy art. */
const PATH_SWING_X: readonly number[] = [24, -28, 26, -24];

/** Fraction along path length (0–1) closest to a milestone dot. */
function getPathProgress(path: SVGPathElement, x: number, y: number): number {
  const total = path.getTotalLength();
  if (total <= 0) return 0;
  let bestLen = 0;
  let bestDist = Infinity;
  const steps = 140;
  for (let i = 0; i <= steps; i++) {
    const len = (i / steps) * total;
    const pt = path.getPointAtLength(len);
    const dist = (pt.x - x) ** 2 + (pt.y - y) ** 2;
    if (dist < bestDist) {
      bestDist = dist;
      bestLen = len;
    }
  }
  return bestLen / total;
}

function timelinePathThrough(points: { x: number; y: number }[]): string {
  if (points.length < 2) return "";
  const n = points.length;
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < n - 1; i++) {
    const p0 =
      points[i - 1] ??
      ({ x: 2 * points[0].x - points[1].x, y: 2 * points[0].y - points[1].y } as const);
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 =
      points[i + 2] ??
      ({
        x: 2 * points[n - 1].x - points[n - 2].x,
        y: 2 * points[n - 1].y - points[n - 2].y,
      } as const);
    const swing = PATH_SWING_X[i] ?? 0;
    const cp1x = p1.x + (p2.x - p0.x) * PATH_CURVE_K + swing;
    const cp1y = p1.y + (p2.y - p0.y) * PATH_CURVE_K;
    const cp2x = p2.x - (p3.x - p1.x) * PATH_CURVE_K - swing * 0.78;
    const cp2y = p2.y - (p3.y - p1.y) * PATH_CURVE_K;
    d += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p2.x} ${p2.y}`;
  }
  return d;
}

export default function JourneyTimelinePage({ lang = "en", onBack, onSelectMilestone }: JourneyTimelinePageProps) {
  const data = CONTENT[lang] as any;
  const journey = data?.journey ?? {};
  const journeyItems = Array.isArray(journey.items) ? journey.items : EMPTY_JOURNEY_ITEMS;
  const localizedMilestones = useMemo(
    () =>
      milestones.map((item, idx) => ({
        ...item,
        title: localizeDigits(journeyItems[idx]?.title ?? item.title, lang),
        text: localizeDigits(journeyItems[idx]?.description ?? item.text, lang),
      })),
    [journeyItems, lang],
  );

  const rootRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pathStrokeRef = useRef<SVGPathElement | null>(null);
  const pathBgRef = useRef<SVGPathElement | null>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const [timelineLayout, setTimelineLayout] = useState<{
    pathD: string;
    points: { x: number; y: number }[];
    height: number;
    /** px from track left — centers the 180px-wide rail in the gap between cards and image column */
    svgLeft: number;
  } | null>(null);

  const imageColumnRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const imageCol = imageColumnRef.current;
      if (!track) return;
      const trackRect = track.getBoundingClientRect();
      const h = track.clientHeight;
      if (h < 8) return;

      const n = localizedMilestones.length;
      const centers: { x: number; y: number }[] = [];
      for (let i = 0; i < n; i++) {
        const el = cardRefs.current[i];
        if (!el) return;
        const r = el.getBoundingClientRect();
        centers.push({
          x: DOT_X[i]!,
          y: r.top - trackRect.top + r.height / 2,
        });
      }

      const SVG_W = 180;
      const firstCard = cardRefs.current[0];
      let svgLeft = 0;
      const narrow =
        typeof window !== "undefined" &&
        window.matchMedia("(max-width: 767px)").matches;

      if (firstCard) {
        if (narrow) {
          const cardR = firstCard.getBoundingClientRect();
          svgLeft = Math.max(4, cardR.left - trackRect.left - SVG_W + 28);
        } else if (imageCol) {
          const cardRight = firstCard.getBoundingClientRect().right;
          const imageLeft = imageCol.getBoundingClientRect().left;
          const midX = (cardRight + imageLeft) / 2;
          svgLeft = midX - SVG_W / 2 - trackRect.left + TIMELINE_NUDGE_RIGHT_PX;
        } else {
          const cw = firstCard.getBoundingClientRect().width ?? 560;
          svgLeft = cw + 24 + TIMELINE_NUDGE_RIGHT_PX;
        }
      }

      setTimelineLayout({
        height: h,
        points: centers,
        pathD: timelinePathThrough(centers),
        svgLeft,
      });
    };

    measure();
    const raf = requestAnimationFrame(() => measure());
    const ro = new ResizeObserver(() => measure());
    const t = trackRef.current;
    const img = imageColumnRef.current;
    if (t) ro.observe(t);
    if (img) ro.observe(img);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [localizedMilestones]);

  useLayoutEffect(() => {
    if (!timelineLayout || !pathStrokeRef.current || !rootRef.current) return;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const path = pathStrokeRef.current!;
      const pathBg = pathBgRef.current;
      const pathEls = [path, pathBg].filter(Boolean) as SVGPathElement[];
      const pathLen = path.getTotalLength();
      const cards = cardRefs.current.filter(Boolean) as HTMLButtonElement[];
      const images = imageRefs.current.filter(Boolean) as HTMLImageElement[];
      const dots = gsap.utils.toArray<SVGGElement>(".journey-dot");

      const cardProgress = timelineLayout.points.map((pt) => getPathProgress(path, pt.x, pt.y));
      const imageOffsets = [0, 800, 1400];
      const imageProgress = imageOffsets.map((top) =>
        Math.min(1, Math.max(0.05, (top + 280) / timelineLayout.height)),
      );

      if (reducedMotion) {
        gsap.set(pathEls, { strokeDashoffset: 0, strokeDasharray: pathLen });
        gsap.set([cards, images, dots, ".journey-intro > *", ".journey-back"], { autoAlpha: 1, clearProps: "transform" });
        return;
      }

      gsap.set(pathEls, { strokeDasharray: pathLen, strokeDashoffset: pathLen });
      gsap.set(cards, { autoAlpha: 0, x: -48 });
      gsap.set(images, { autoAlpha: 0, scale: 1.07, transformOrigin: "center center" });
      gsap.set(dots, { scale: 0, opacity: 0, transformOrigin: "center center" });
      gsap.set(".journey-intro > *", { autoAlpha: 0, y: 28 });
      gsap.set(".journey-back", { autoAlpha: 0, scale: 0.85 });

      const lineDuration = 3.2;
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.to(".journey-back", { autoAlpha: 1, scale: 1, duration: 0.55 }, 0).to(
        ".journey-intro > *",
        { autoAlpha: 1, y: 0, stagger: 0.07, duration: 0.75 },
        0,
      )
        .to(
          pathEls,
          {
            strokeDashoffset: 0,
            duration: lineDuration,
            ease: "none",
          },
          0,
        );

      images.forEach((img, i) => {
        tl.to(img, { autoAlpha: 1, scale: 1, duration: 1.1 }, imageProgress[i]! * lineDuration * 0.92);
      });

      cards.forEach((card, i) => {
        const t = cardProgress[i]! * lineDuration;
        tl.to(card, { autoAlpha: 1, x: 0, duration: 0.7 }, t);
        if (dots[i]) {
          tl.to(dots[i], { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(2)" }, t);
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, [timelineLayout]);

  return (
    <main ref={rootRef} className="m-0 flex min-h-screen w-screen justify-center bg-[#f8f1e7] p-0 text-[#17233b]">
      <section className="relative flex min-h-screen w-[min(100vw,1400px)] min-w-[100vw] flex-col overflow-x-hidden overflow-y-visible bg-[#fbf5eb]">
        <button
          type="button"
          onClick={onBack}
          className="journey-back absolute left-4 top-4 z-30 grid h-12 w-12 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm sm:left-8 sm:top-8 sm:h-14 sm:w-14 lg:h-16 lg:w-16"
          aria-label="Back to Discover"
        >
          <ArrowLeft className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
        </button>
        {/* subtle paper/pattern */}
        <div className="absolute left-0 top-[120px] h-full w-24 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute right-0 top-[120px] h-full w-24 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

        {/* Right illustration column - replace these with your AI images */}
        <div
          ref={imageColumnRef}
          className="pointer-events-none absolute right-0 top-[90px] z-0 hidden h-[1720px] w-[46vw] min-w-[520px] md:block"
        >
          <img
            ref={(el) => {
              imageRefs.current[0] = el;
            }}
            src={bg}
            className="journey-image absolute right-0 top-0 h-[900px] w-[96%] rounded-[58px] object-cover opacity-80 [mask-image:radial-gradient(circle,black_54%,transparent_79%)]"
            alt="1991 illustration"
          />
          <img
            ref={(el) => {
              imageRefs.current[1] = el;
            }}
            src={bg2}
            className="journey-image absolute right-0 top-[800px] h-[800px] w-[96%] rounded-[58px] object-cover opacity-78 [mask-image:radial-gradient(circle,black_54%,transparent_82%)]"
            alt="1992 illustration"
          />
          <img
            ref={(el) => {
              imageRefs.current[2] = el;
            }}
            src={bg3}
            className="journey-image absolute right-0 top-[1400px] h-[910px] w-[96%] rounded-[58px] object-cover opacity-76 [mask-image:radial-gradient(circle,black_54%,transparent_82%)]"
            alt="building institutions illustration"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#fbf5eb]/10 to-[#fbf5eb]/72" />
          <div className="absolute inset-x-0 bottom-0 h-[300px] bg-gradient-to-b from-transparent to-[#fbf5eb]" /> */}
        </div>

        <div className="relative z-10 flex min-h-0 flex-1 flex-col px-4 pb-8 pt-14 sm:px-12 md:px-16 md:pb-10 md:pt-20 lg:px-20 lg:pb-14">
          {/* Title */}
          <section className="journey-intro max-w-[760px]">
            <h1 className="font-serif text-[clamp(40px,10vw,76px)] font-semibold leading-none text-[#17233b] sm:text-[88px] md:text-[102px] lg:text-[124px]">
              {journey.title ?? "The Journey"}
            </h1>
            <h2 className="mt-4 text-[clamp(18px,4.5vw,30px)] font-semibold text-[#9b6d35] sm:mt-5 sm:text-[34px] md:mt-6 md:text-[40px] lg:text-[46px]">
              {localizeDigits(
                lang === "ar" ? "من عام 1991 حتى الوقت الحاضر" : lang === "ku" ? "لە ساڵی ١٩٩١ تا ئێستا" : "From 1991 to the present.",
                lang,
              )}
            </h2>
            <div className="mt-6 flex w-full max-w-[290px] items-center gap-5 text-[#b99152] md:mt-8">
              <span className="h-0.5 flex-1 bg-[#b99152]" />
              <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
            </div>
            <p className="mt-6 max-w-[680px] text-[clamp(17px,4vw,28px)] leading-snug text-[#2d3549] md:mt-8 md:text-[32px] lg:text-[36px]">
              {localizeDigits(journey.subtitle ?? "Explore the key milestones that shaped the Kurdistan Region.", lang)}
            </p>
          </section>

          {/* Timeline — rail + dots track measured card centers */}
          <section className="relative mt-10 flex min-h-0 flex-1 flex-col md:mt-20">
            <div ref={trackRef} className="relative flex min-h-0 flex-1 flex-col">
              {timelineLayout && (
                <svg
                  className="pointer-events-none absolute top-0 z-20 w-[180px] overflow-visible"
                  style={{ left: timelineLayout.svgLeft }}
                  width={180}
                  height={timelineLayout.height}
                  viewBox={`0 0 150 ${timelineLayout.height}`}
                  fill="none"
                  aria-hidden
                >
                  <path
                    ref={pathBgRef}
                    className="journey-path-bg"
                    d={timelineLayout.pathD}
                    stroke="#ffffff"
                    strokeWidth="17"
                    strokeLinecap="round"
                  />
                  <path
                    ref={pathStrokeRef}
                    className="journey-path-stroke"
                    d={timelineLayout.pathD}
                    stroke="#d8b875"
                    strokeWidth="9"
                    strokeLinecap="round"
                  />
                  {timelineLayout.points.map((dot, index) => (
                    <g key={index} className="journey-dot">
                      <circle cx={dot.x} cy={dot.y} r="19" fill="#c89a4e" />
                      <circle cx={dot.x} cy={dot.y} r="14" fill="white" />
                      <circle cx={dot.x} cy={dot.y} r="7" fill="#c89a4e" />
                    </g>
                  ))}
                </svg>
              )}

              <div className="flex min-h-0 flex-1 flex-col gap-5">
              {localizedMilestones.map((item, index) => {
                const Icon = item.icon;
                const milestoneId: JourneyMilestoneId =
                  index === 0 ? "1991" : index === 1 ? "1992" : index === 2 ? "buildingInstitutions" : index === 3 ? "2005" : "today";
                return (
                  <button
                    type="button"
                    onClick={() => onSelectMilestone?.(milestoneId)}
                    key={item.title}
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    className="journey-card relative z-10 flex min-h-[120px] w-full max-w-[640px] flex-1 basis-0 items-stretch rounded-[22px] border border-[#ead8b7] bg-white/78 shadow-[0_10px_26px_rgba(84,54,16,0.12)] backdrop-blur-sm md:min-h-[148px] md:w-[clamp(480px,48vw,640px)]"
                  >
                    <div className="flex w-[100px] shrink-0 items-center justify-center py-3 sm:w-[148px] sm:py-4 md:w-[168px]">
                      <div
                        className="grid h-[72px] w-[72px] shrink-0 place-items-center rounded-full border-[5px] border-white text-[#f7e3b5] shadow-[0_6px_16px_rgba(0,0,0,0.16)] sm:h-24 sm:w-24 md:h-28 md:w-28"
                        style={{ backgroundColor: item.color }}
                      >
                        <Icon className="h-[34px] w-[34px] sm:h-[46px] sm:w-[46px] md:h-[52px] md:w-[52px]" strokeWidth={1.5} />
                      </div>
                    </div>

                    <div className="min-h-[96px] w-px shrink-0 self-stretch bg-[#e2c99b]" />

                    <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-center px-3 py-4 sm:px-5 sm:py-5 md:px-7 md:py-6">
                      <h3 className="font-serif text-[clamp(28px,4vw,38px)] font-semibold leading-tight text-[#17233b]">
                        {item.title}
                      </h3>
                      <p className="mt-2 max-w-[380px] text-[clamp(17px,2.2vw,23px)] leading-snug text-[#303a50]">
                        {item.text}
                      </p>
                    </div>
                  </button>
                );
              })}
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
