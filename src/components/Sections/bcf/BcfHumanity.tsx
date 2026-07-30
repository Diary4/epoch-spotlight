import React from "react";
import { ChevronLeft } from "lucide-react";
import gsap from "gsap";
import BcfShell from "@/components/Sections/bcf/BcfShell";
import BcfChapterPill from "@/components/Sections/bcf/BcfChapterPill";
import {
  bcfCopy,
  type BcfLang,
  type ServeCategoryId,
} from "@/components/Sections/bcf/bcfContent";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import humanityThumb from "@/assets/images/PrimeMinistir/education.webp";
import reliefImg from "@/assets/images/PrimeMinistir/isis.webp";
import healthImg from "@/assets/images/PrimeMinistir/service.webp";
import educationImg from "@/assets/images/PrimeMinistir/education.webp";
import environmentImg from "@/assets/images/TouristicPlace/GaliAliBag/16.webp";
import communityImg from "@/assets/images/religions/coexistence/masoud-barzani.webp";

type BcfHumanityProps = {
  lang: BcfLang;
  onBack: () => void;
};

const categoryImages: Record<ServeCategoryId, string> = {
  relief: reliefImg,
  health: healthImg,
  education: educationImg,
  environment: environmentImg,
  community: communityImg,
};

/**
 * Figma Who We Serve (50789:12 → 50791:208):
 * 600px cards, 64px gap; inactive y=112 / h=575; active y=0 / h=799 with tags.
 * Strip slides so the active card stays centered (Smart Animate).
 */
const CARD_W = 600;
const CARD_GAP = 64;
const CARD_PITCH = CARD_W + CARD_GAP;
const ACTIVE_H = 799;
const INACTIVE_H = 575;
const INACTIVE_Y = 112;
const TRACK_H = ACTIVE_H;
/** Figma Smart Animate default ≈ Ease In And Out @ 400ms */
const ANIM_DURATION = 0.4;
const ANIM_EASE = "power1.inOut";

export default function BcfHumanity({ lang, onBack }: BcfHumanityProps) {
  const c = bcfCopy[lang];
  const chapterTitle =
    c.journeyChapters.find((chapter) => chapter.id === "humanity")?.title ??
    c.journeyChapters[1].title;
  const categories = c.serveCategories;
  const initialIndex = Math.max(
    0,
    categories.findIndex((cat) => cat.id === "education"),
  );

  const viewportRef = React.useRef<HTMLDivElement | null>(null);
  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const cardRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const tagRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const activeIndexRef = React.useRef(initialIndex);
  const dragRef = React.useRef({ startX: 0, baseX: 0, dragging: false, moved: false });

  const trackXForIndex = React.useCallback((index: number, viewportWidth: number) => {
    const center = viewportWidth / 2;
    return center - (index * CARD_PITCH + CARD_W / 2);
  }, []);

  const animateToIndex = React.useCallback(
    (nextIndex: number, immediate = false) => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;

      const clamped = Math.max(0, Math.min(categories.length - 1, nextIndex));
      activeIndexRef.current = clamped;

      const x = trackXForIndex(clamped, viewport.clientWidth);
      const duration = immediate ? 0 : ANIM_DURATION;

      // GSAP owns x / y / height / tags — avoid React style fighting mid-tween.
      gsap.to(track, {
        x,
        duration,
        ease: ANIM_EASE,
        overwrite: "auto",
      });

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const active = i === clamped;
        gsap.to(card, {
          y: active ? 0 : INACTIVE_Y,
          height: active ? ACTIVE_H : INACTIVE_H,
          duration,
          ease: ANIM_EASE,
          overwrite: "auto",
          boxShadow: active
            ? "0px 0px 20px 4px rgba(251,178,47,0.25)"
            : "0px 0px 0px 0px rgba(251,178,47,0)",
        });
      });

      tagRefs.current.forEach((tags, i) => {
        if (!tags) return;
        const active = i === clamped;
        gsap.to(tags, {
          autoAlpha: active ? 1 : 0,
          y: active ? 0 : 12,
          duration: immediate ? 0 : ANIM_DURATION * 0.9,
          ease: active ? "power2.out" : "power1.in",
          overwrite: "auto",
        });
      });
    },
    [categories.length, trackXForIndex],
  );

  React.useLayoutEffect(() => {
    animateToIndex(initialIndex, true);
  }, [animateToIndex, initialIndex, lang]);

  React.useEffect(() => {
    const onResize = () => animateToIndex(activeIndexRef.current, true);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [animateToIndex]);

  const onPointerDown = (event: React.PointerEvent) => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;
    dragRef.current = {
      startX: event.clientX,
      baseX: gsap.getProperty(track, "x") as number,
      dragging: true,
      moved: false,
    };
    viewport.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent) => {
    if (!dragRef.current.dragging || !trackRef.current) return;
    const dx = event.clientX - dragRef.current.startX;
    if (Math.abs(dx) > 8) dragRef.current.moved = true;
    gsap.set(trackRef.current, { x: dragRef.current.baseX + dx });
  };

  const onPointerUp = (event: React.PointerEvent) => {
    if (!dragRef.current.dragging) return;
    dragRef.current.dragging = false;
    const dx = event.clientX - dragRef.current.startX;
    const threshold = 80;
    if (dx < -threshold) {
      animateToIndex(activeIndexRef.current + 1);
    } else if (dx > threshold) {
      animateToIndex(activeIndexRef.current - 1);
    } else {
      animateToIndex(activeIndexRef.current);
    }
  };

  return (
    <BcfShell showLogo={false} overlayClassName="bg-black/0">
      <div
        className="relative flex min-h-[1920px] flex-col overflow-hidden pt-24"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 55%, rgba(251,178,47,0.06), transparent 60%), linear-gradient(180deg, #191205 0%, #0a0d22 100%)",
        }}
      >
        {/* Subtle dot field behind the carousel (Figma Mini Dots). */}
        <div
          className="pointer-events-none absolute inset-x-0 top-[520px] h-[900px] opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(251,178,47,0.35) 1.5px, transparent 1.6px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse 55% 50% at 50% 50%, black, transparent 75%)",
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

        <div className="relative z-10 px-14">
          <BcfChapterPill title={chapterTitle} thumb={humanityThumb} />

          <div className="mt-16 max-w-[1080px]">
            <p dir="ltr" className="text-[80px] font-bold leading-none">
              <span className="text-[#fbf4e4]">0</span>
              <span style={{ color: BCF.gold }}>2</span>
            </p>
            <h1 className="mt-6 text-[80px] font-bold leading-[1.05]">
              <span className="text-[#fbf4e4]">{c.whoWeServeWhite} </span>
              <span style={{ color: BCF.gold }}>{c.whoWeServeGold}</span>
            </h1>
          </div>
        </div>

        <div
          ref={viewportRef}
          className="relative z-10 mt-10 h-[860px] w-full touch-pan-y overflow-hidden"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div
            ref={trackRef}
            className="absolute top-0 flex will-change-transform"
            style={{ height: TRACK_H, gap: CARD_GAP }}
          >
            {categories.map((category, index) => (
              <button
                key={category.id}
                type="button"
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                data-serve={category.id}
                onClick={() => {
                  if (dragRef.current.moved) return;
                  animateToIndex(index);
                }}
                className="relative flex shrink-0 flex-col items-center overflow-hidden rounded-[32px] bg-white/[0.08] px-6 pt-6 text-center"
                style={{ width: CARD_W }}
              >
                <span className="text-[64px] font-bold leading-none text-white">
                  {category.title}
                </span>
                <span
                  className="mt-8 block h-[400px] w-full overflow-hidden rounded-[20px] border"
                  style={{ borderColor: BCF.nature }}
                >
                  <img
                    src={categoryImages[category.id]}
                    alt=""
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                </span>

                <div
                  ref={(el) => {
                    tagRefs.current[index] = el;
                  }}
                  className="mt-8 flex w-full flex-col gap-6"
                  style={{ opacity: 0, visibility: "hidden" }}
                >
                  {(category.tags ?? []).map((tag, tagIndex) => (
                    <span
                      key={tag}
                      className={`flex items-center gap-4 bg-black/25 px-8 py-5 text-[24px] font-medium text-[#fbf4e4] ${
                        tagIndex % 2 === 0
                          ? "self-start rounded-br-[42px] rounded-tl-[42px]"
                          : "flex-row-reverse self-end rounded-bl-[42px] rounded-tr-[42px]"
                      }`}
                    >
                      <span
                        className="h-4 w-4 shrink-0 rounded-full"
                        style={{ backgroundColor: BCF.goldBright }}
                      />
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </BcfShell>
  );
}
