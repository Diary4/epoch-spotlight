import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type BcfDomeSlide = {
  image: string;
  title: string;
  caption: string;
};

type BcfDomeGalleryProps = {
  slides: BcfDomeSlide[];
  autoRotateMs?: number;
};

const BASE_CARD_CLASS =
  "absolute left-1/2 top-1/2 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[26px] border border-white/20 bg-black/40 shadow-[0_20px_40px_rgba(0,0,0,0.38)] transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]";

function wrapIndex(index: number, total: number) {
  return ((index % total) + total) % total;
}

function shortestOffset(target: number, active: number, total: number) {
  const raw = target - active;
  const half = Math.floor(total / 2);
  if (raw > half) return raw - total;
  if (raw < -half) return raw + total;
  return raw;
}

function slideStyle(offset: number): React.CSSProperties {
  const clamped = Math.max(-2, Math.min(2, offset));
  const abs = Math.abs(clamped);
  const translateX = clamped * 210;
  const rotateY = clamped * -24;
  const scale = 1 - abs * 0.1;
  const opacity = abs > 2 ? 0 : 1 - abs * 0.22;
  const blur = abs > 0 ? abs * 0.5 : 0;
  const zIndex = 10 - abs;

  return {
    transform: `translate(-50%, -50%) translateX(${translateX}px) rotateY(${rotateY}deg) scale(${scale})`,
    opacity,
    filter: `blur(${blur}px)`,
    zIndex,
    pointerEvents: abs > 0 ? "none" : "auto",
  };
}

export default function BcfDomeGallery({ slides, autoRotateMs = 4200 }: BcfDomeGalleryProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const canRender = slides.length > 0;

  React.useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => wrapIndex(prev + 1, slides.length));
    }, autoRotateMs);

    return () => window.clearInterval(timer);
  }, [slides.length, autoRotateMs]);

  React.useEffect(() => {
    if (!canRender) return;
    setActiveIndex((prev) => wrapIndex(prev, slides.length));
  }, [slides.length, canRender]);

  if (!canRender) return null;

  return (
    <section className="relative h-[470px] w-full">
      <div className="absolute inset-0 [perspective:1400px]">
        {slides.map((slide, index) => {
          const offset = shortestOffset(index, activeIndex, slides.length);
          return (
            <article key={`${slide.title}-${index}`} className={BASE_CARD_CLASS} style={slideStyle(offset)}>
              <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-[26px] font-semibold leading-tight text-[#fdeed4]">{slide.title}</p>
                <p className="mt-2 text-[20px] leading-snug text-white/85">{slide.caption}</p>
              </div>
            </article>
          );
        })}
      </div>

      {slides.length > 1 ? (
        <>
          <button
            type="button"
            onClick={() => setActiveIndex((prev) => wrapIndex(prev - 1, slides.length))}
            className="absolute left-2 top-1/2 z-30 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/35 text-white/90 backdrop-blur-sm transition-colors hover:bg-black/50"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>
          <button
            type="button"
            onClick={() => setActiveIndex((prev) => wrapIndex(prev + 1, slides.length))}
            className="absolute right-2 top-1/2 z-30 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/35 text-white/90 backdrop-blur-sm transition-colors hover:bg-black/50"
            aria-label="Next image"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
        </>
      ) : null}
    </section>
  );
}
