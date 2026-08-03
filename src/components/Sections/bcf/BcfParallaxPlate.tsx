import React from "react";
import { motion, useMotionValue, type MotionValue } from "motion/react";
import { locoParallax } from "@/components/Sections/bcf/bcfMotion";

type BcfParallaxPlateProps = {
  /** Smoothed scroll position of the travelling column, in px. */
  scroll: MotionValue<number>;
  /** The element the column's scroll origin sits at — measurements are taken against it. */
  containerRef: React.RefObject<HTMLElement>;
  /** Viewport height; Locomotive measures drift from the middle of it. */
  viewport: number;
  /** Raw `data-scroll-speed` value. Positive drifts against the scroll, negative lags. */
  speed: number;
  className?: string;
  children: React.ReactNode;
};

/**
 * One `data-scroll-speed` element, ported from Locomotive Scroll.
 *
 * The drift is a pure function of the scroll position and the element's
 * untransformed centre, so it is driven straight off the motion value rather
 * than through React state — the column re-rendering on every frame is exactly
 * what a parallax is there to avoid.
 */
export default function BcfParallaxPlate({
  scroll,
  containerRef,
  viewport,
  speed,
  className,
  children,
}: BcfParallaxPlateProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const middleRef = React.useRef(0);
  const y = useMotionValue(0);

  React.useLayoutEffect(() => {
    const el = ref.current;
    const container = containerRef.current;
    if (!el || !container) return;

    /**
     * Locomotive subtracts an element's own translate before storing its
     * position, otherwise every re-measure compounds the drift already applied.
     */
    const measure = () => {
      const box = el.getBoundingClientRect();
      const origin = container.getBoundingClientRect();
      const top = box.top - origin.top - y.get();
      middleRef.current = top + box.height / 2;
    };

    const apply = (value: number) => {
      y.set(locoParallax(value, viewport, middleRef.current, speed));
    };

    measure();
    apply(scroll.get());

    const unsubscribe = scroll.on("change", apply);
    const observer = new ResizeObserver(() => {
      measure();
      apply(scroll.get());
    });
    observer.observe(container);

    return () => {
      unsubscribe();
      observer.disconnect();
    };
  }, [containerRef, scroll, speed, viewport, y]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
