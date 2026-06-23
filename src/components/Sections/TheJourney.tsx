import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  BarChart3,
  Landmark,
  Network,
  Scale,
  SunMedium,
} from "lucide-react";
import { sectionBackButtonClassName, sectionBackIconClassName } from "@/constants/backNavigation";
import en from "@/data/en.json";
import ar from "@/data/ar.json";
import ku from "@/data/ku.json";
import { localizeDigits } from "@/lib/utils";
import { discoverDisplayFont, discoverRtlScript } from "@/components/Sections/discoverLanguage";
import bg from "@/assets/images/new/theJourney/journey-1.webp";
import bg2 from "@/assets/images/new/theJourney/journey-2.webp";
import bg3 from "@/assets/images/new/theJourney/journey-3.webp";

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

const DEFAULT_MILESTONE_IDS: JourneyMilestoneId[] = [
  "1991",
  "1992",
  "buildingInstitutions",
  "2005",
  "today",
];

function normalizeMilestoneId(rawId: unknown, fallbackIndex: number): JourneyMilestoneId {
  const id = String(rawId ?? "").toLowerCase().trim();
  if (id === "1991") return "1991";
  if (id === "1992") return "1992";
  if (id === "2005") return "2005";
  if (id === "today") return "today";
  if (id === "institutions" || id === "buildinginstitutions" || id === "building_institutions") {
    return "buildingInstitutions";
  }
  return DEFAULT_MILESTONE_IDS[fallbackIndex] ?? "today";
}

type JourneyTimelinePageProps = {
  lang?: LangCode;
  onBack?: () => void;
  onSelectMilestone?: (milestone: JourneyMilestoneId) => void;
};

/** Horizontal wobble along the rail (offsets from viewBox center). */
const DOT_X_OFFSET = [-1, -2, 0, 1, 2] as const;

const SVG_W = 180;
const VIEWBOX_W = 150;
// PATH_CENTER_X is the X coordinate in SVG viewBox space where the path & dots are drawn.
// The SVG is positioned so that this point aligns exactly with the card column right edge.
const PATH_CENTER_X = VIEWBOX_W / 2; // 75px from the left of the viewBox

const PATH_CURVE_K = 0.34;
const PATH_SWING_X: readonly number[] = [24, -28, 26, -24];

function getRelativePoint(el: HTMLElement, container: HTMLElement): { x: number; y: number } {
  const containerRect = container.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  const scaleX = container.offsetWidth / containerRect.width || 1;
  const scaleY = container.offsetHeight / containerRect.height || 1;

  return {
    x: (elRect.left - containerRect.left) * scaleX,
    y: (elRect.top - containerRect.top) * scaleY,
  };
}

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
  const isRtlScript = discoverRtlScript(lang);
  const displayFont = discoverDisplayFont(lang);
  const data = CONTENT[lang] as any;
  const journey = data?.journey ?? {};
  const journeyItems = Array.isArray(journey.items) ? journey.items : EMPTY_JOURNEY_ITEMS;
  const localizedMilestones = useMemo(
    () =>
      milestones.map((item, idx) => ({
        ...item,
        id: normalizeMilestoneId(journeyItems[idx]?.id, idx),
        title: localizeDigits(journeyItems[idx]?.title ?? item.title, lang),
        text: localizeDigits(journeyItems[idx]?.description ?? item.text, lang),
      })),
    [journeyItems, lang],
  );

  const rootRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const cardColumnRef = useRef<HTMLDivElement | null>(null);
  const pathStrokeRef = useRef<SVGPathElement | null>(null);
  const pathBgRef = useRef<SVGPathElement | null>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const imageColumnRef = useRef<HTMLDivElement | null>(null);

  const [timelineLayout, setTimelineLayout] = useState<{
    pathD: string;
    points: { x: number; y: number }[];
    height: number;
    // svgLeft: the CSS `left` value for the SVG element in track-relative pixels.
    // We position the SVG so PATH_CENTER_X (75px in viewBox) sits at the
    // right edge of the card column. Since the SVG viewBox is VIEWBOX_W wide
    // but the element is SVG_W wide, we must account for the scale factor.
    svgLeft: number;
  } | null>(null);

  // Layout scale handles for smaller viewports.
  // Compute the initial values synchronously from the current viewport so the
  // very first paint is already scaled (no flash where the full-size 1400px
  // layout renders big and then shrinks).
  const getLayout = () => {
    const targetWidth = 1400;
    const width = typeof window !== "undefined" ? window.innerWidth : targetWidth;
    return width < targetWidth
      ? { scale: width / targetWidth, leftOffset: 0 }
      : { scale: 1, leftOffset: (width - targetWidth) / 2 };
  };

  const initialLayout = getLayout();
  const [scale, setScale] = useState(initialLayout.scale);
  const [leftOffset, setLeftOffset] = useState(initialLayout.leftOffset);

  useLayoutEffect(() => {
    const handleResize = () => {
      const next = getLayout();
      setScale(next.scale);
      setLeftOffset(next.leftOffset);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;

      const h = track.clientHeight;
      if (h < 8) return;

      const n = localizedMilestones.length;
      const centers: { x: number; y: number }[] = [];
      for (let i = 0; i < n; i++) {
        const el = cardRefs.current[i];
        if (!el) return;
        const relative = getRelativePoint(el, track);
        centers.push({
          x: PATH_CENTER_X + (DOT_X_OFFSET[i] ?? 0),
          y: relative.y + el.offsetHeight / 2,
        });
      }

      // ── KEY FIX ──────────────────────────────────────────────────────────
      // The card column div is w-full so cardCol.offsetWidth gives the full
      // container width — useless. Instead, measure the right edge of the
      // first actual card button, which has max-w-[640px] and reflects the
      // true rendered card width.
      //
      // Then place the SVG so PATH_CENTER_X (75px in viewBox space) lands
      // exactly at that right edge, centered in the gap between cards and images.
      //
      // renderScale = SVG_W / VIEWBOX_W accounts for the fact that the 150-wide
      // viewBox is rendered into an SVG_W (180) CSS-pixel wide element.
      const firstCard = cardRefs.current[0];
      if (!firstCard) return;
      const firstCardRect = getRelativePoint(firstCard, track);
      const cardRight = firstCardRect.x + firstCard.offsetWidth;

      // Also find image column left edge for true centering in the gap
      const imageCol = imageColumnRef.current;
      const imageLeft = imageCol ? getRelativePoint(imageCol, track).x : cardRight + 80;

      // Center the path in the gap between cards and images
      const gapCenter = (cardRight + imageLeft) / 2;
      const renderScale = SVG_W / VIEWBOX_W;
      const svgLeft = gapCenter - PATH_CENTER_X * renderScale;
      // ─────────────────────────────────────────────────────────────────────

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
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
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
    <div
      className={`relative h-screen w-screen overflow-hidden bg-[#f8f1e7] ${isRtlScript ? "font-amiri" : ""}`}
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
        <main ref={rootRef} className="m-0 flex h-full w-full justify-center bg-[#f8f1e7] p-0 text-[#17233b] overflow-x-hidden">
          <section className="relative flex h-full w-full flex-col overflow-x-hidden overflow-y-visible bg-[#fbf5eb]">
            <button
              type="button"
              onClick={onBack}
              className={`journey-back ${sectionBackButtonClassName}`}
              aria-label="Back to Discover"
            >
              <ArrowLeft className={sectionBackIconClassName} />
            </button>
            
            {/* Subtle paper patterns */}
            <div className="absolute left-0 top-[120px] h-full w-24 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px] block" />
            <div className="absolute right-0 top-[120px] h-full w-24 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px] block" />

            {/* Right illustration column */}
            <div
              ref={imageColumnRef}
              className="pointer-events-none absolute right-0 top-[90px] z-0 h-[1720px] w-[46cqw] min-w-[520px] block"
            >
              <img
                ref={(el) => { imageRefs.current[0] = el; }}
                src={bg}
                className="journey-image absolute right-0 top-0 h-[900px] w-[96%] rounded-[58px] object-cover opacity-80 [mask-image:radial-gradient(circle,black_54%,transparent_79%)]"
                alt="1991 illustration"
              />
              <img
                ref={(el) => { imageRefs.current[1] = el; }}
                src={bg2}
                className="journey-image absolute right-0 top-[800px] h-[800px] w-[96%] rounded-[58px] object-cover opacity-78 [mask-image:radial-gradient(circle,black_54%,transparent_82%)]"
                alt="1992 illustration"
              />
              <img
                ref={(el) => { imageRefs.current[2] = el; }}
                src={bg3}
                className="journey-image absolute right-0 top-[1400px] h-[910px] w-[96%] rounded-[58px] object-cover opacity-76 [mask-image:radial-gradient(circle,black_54%,transparent_82%)]"
                alt="building institutions illustration"
              />
            </div>

            <div className="relative z-10 flex min-h-0 flex-1 flex-col px-20 pb-14 pt-20">
              {/* Title */}
              <section className="journey-intro max-w-[760px]">
                <h1 className={`${displayFont} text-[clamp(34px,9cqw,64px)] font-light leading-none text-[#17233b] sm:text-[88px] md:text-[102px] lg:text-[124px]`}>
                  {journey.title ?? "The Journey"}
                </h1>
                <h2 className="mt-6 text-[clamp(16px,4cqw,24px)] font-light text-[#9b6d35] sm:mt-5 sm:text-[34px] md:mt-6 md:text-[40px] lg:text-[46px]">
                  {localizeDigits(
                    lang === "ar" ? "من عام 1991 حتى الوقت الحاضر" : lang === "ku" ? "لە ساڵی ١٩٩١ تا ئێستا" : "From 1991 to the present.",
                    lang,
                  )}
                </h2>
                <div className="mt-8 flex w-full max-w-[290px] items-center gap-5 text-[#b99152]">
                  <span className="h-0.5 flex-1 bg-[#b99152]" />
                  <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
                </div>
                <p className="mt-8 max-w-[680px] text-[clamp(14px,3.5cqw,20px)] leading-snug text-[#2d3549] md:text-[32px] lg:text-[36px]">
                  {localizeDigits(journey.subtitle ?? "Explore the key milestones that shaped the Kurdistan Region.", lang)}
                </p>
              </section>

              {/* Timeline */}
              <section className="relative mt-20 flex min-h-0 flex-1 flex-col">
                <div ref={trackRef} className="relative flex min-h-0 flex-1 flex-col">
                  
                  {/* Dynamic Curvy Path SVG */}
                  {timelineLayout && (
                    <svg
                      className="pointer-events-none absolute top-0 z-20 overflow-visible block"
                      style={{ left: timelineLayout.svgLeft, width: SVG_W }}
                      width={SVG_W}
                      height={timelineLayout.height}
                      viewBox={`0 0 ${VIEWBOX_W} ${timelineLayout.height}`}
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

                  {/*
                    ── KEY FIX ──────────────────────────────────────────────
                    We add `ref={cardColumnRef}` to the card column div so we
                    can measure its right edge directly in the layout effect.
                    Previously the code tried to infer this from the first card's
                    parent, which was unreliable. Now it's an explicit ref.
                    ─────────────────────────────────────────────────────────
                  */}
                  <div ref={cardColumnRef} className="flex min-h-0 flex-1 flex-col justify-between gap-5 pl-0">
                    {localizedMilestones.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <button
                          type="button"
                          onClick={() => onSelectMilestone?.(item.id)}
                          key={item.title}
                          ref={(el) => {
                            cardRefs.current[index] = el;
                          }}
                          className="journey-card relative z-10 flex min-h-[148px] w-full max-w-[640px] flex-1 basis-0 items-stretch rounded-[22px] border border-[#ead8b7] bg-white/80 shadow-[0_8px_20px_rgba(84,54,16,0.08)] backdrop-blur-sm md:w-[clamp(480px,48cqw,640px)]"
                        >
                          <div className="flex w-[168px] shrink-0 items-center justify-center py-4">
                            <div
                              className="grid h-28 w-28 shrink-0 place-items-center rounded-full border-[5px] border-white text-[#f7e3b5] shadow-[0_6px_16px_rgba(0,0,0,0.16)]"
                              style={{ backgroundColor: item.color }}
                            >
                              <Icon className="h-[52px] w-[52px]" strokeWidth={1.5} />
                            </div>
                          </div>

                          <div className="min-h-[96px] w-px shrink-0 self-stretch bg-[#e2c99b]" />

                          <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-center px-7 py-6">
                            <h3 className={`${displayFont} text-[clamp(18px,4cqw,26px)] sm:text-[32px] md:text-[38px] font-light leading-tight text-[#17233b]`}>
                              {item.title}
                            </h3>
                            <p className="mt-2 max-w-[380px] text-[clamp(14px,3cqw,18px)] sm:text-[19px] md:text-[23px] leading-snug text-[#303a50] font-light">
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
      </div>
    </div>
  );
}