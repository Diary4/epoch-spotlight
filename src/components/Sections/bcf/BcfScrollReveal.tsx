import React from "react";
import { type MotionValue } from "motion/react";
import { BCF_EASE } from "@/components/Sections/bcf/bcfMotion";

type BcfScrollRevealProps = {
  /** Smoothed scroll position of the travelling column, in px. */
  scroll: MotionValue<number>;
  /** The element the column's scroll origin sits at — measurements are taken against it. */
  containerRef: React.RefObject<HTMLElement>;
  /** Viewport height, in the same coordinate space as the column. */
  viewport: number;
  /**
   * Where in the viewport the element counts as entered, as a fraction of its
   * height. 0.9 fires just before the element is fully on screen, so it is
   * already settling by the time the eye reaches it.
   */
  offset?: number;
  /** Rise distance, in px. 0 reveals on opacity alone — for plates that already drift. */
  distance?: number;
  /** Seconds held back after the element enters, for reading elements in sequence. */
  delay?: number;
  className?: string;
  children: React.ReactNode;
};

const EASE = `cubic-bezier(${BCF_EASE.join(", ")})`;
const DURATION = 1.05;

/**
 * One `data-scroll` element, ported from Locomotive Scroll.
 *
 * Locomotive adds `is-inview` the first time an element crosses into the
 * viewport and leaves it there; the site's CSS does the rest. This does the
 * same against the column's own smoothed position — the chapter is a
 * transformed column, not the document, so `IntersectionObserver` would report
 * against the wrong box.
 *
 * The transform lives on an inner wrapper so the measured box stays where the
 * layout put it, which is what a parallax plate nested inside needs in order to
 * measure its own centre.
 */
export default function BcfScrollReveal({
  scroll,
  containerRef,
  viewport,
  offset = 0.9,
  distance = 60,
  delay = 0,
  className,
  children,
}: BcfScrollRevealProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = React.useState(false);
  const inViewRef = React.useRef(false);

  React.useLayoutEffect(() => {
    const el = ref.current;
    const container = containerRef.current;
    if (!el || !container) return;

    let top = 0;
    const measure = () => {
      const box = el.getBoundingClientRect();
      const origin = container.getBoundingClientRect();
      top = box.top - origin.top;
    };

    const check = (value: number) => {
      if (inViewRef.current) return;
      // Where the element's top sits on screen once the column has travelled.
      if (top - value < viewport * offset) {
        inViewRef.current = true;
        setInView(true);
      }
    };

    measure();
    check(scroll.get());

    const unsubscribe = scroll.on("change", check);
    const observer = new ResizeObserver(() => {
      measure();
      check(scroll.get());
    });
    observer.observe(container);

    return () => {
      unsubscribe();
      observer.disconnect();
    };
  }, [containerRef, offset, scroll, viewport]);

  return (
    <div ref={ref} className={className}>
      <div
        style={{
          opacity: inView ? 1 : 0,
          transform: distance ? `translate3d(0, ${inView ? 0 : distance}px, 0)` : undefined,
          transition: `opacity ${DURATION}s ${EASE} ${delay}s, transform ${DURATION}s ${EASE} ${delay}s`,
          willChange: "opacity, transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}
