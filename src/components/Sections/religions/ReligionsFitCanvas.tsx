import React from "react";
import { WOMEN_DESIGN_WIDTH } from "@/components/Sections/women/womenCanvasFit";

type ReligionsFitCanvasProps = {
  dir?: "ltr" | "rtl";
  bgClassName?: string;
  className?: string;
  fitDeps?: React.DependencyList;
  children: React.ReactNode;
};

/**
 * Religions artboard canvas — same 1400px design width and the same width-scaling
 * as Women.tsx, so the design always fills the available width with no letterboxed
 * margins, and short pages stretch their own background to the bottom.
 *
 * The one difference from `WomenScaledCanvas`: the available size is measured from
 * the wrapper with a ResizeObserver instead of `window.innerWidth/Height`, so the
 * canvas also follows container resizes (IDE preview panes, split or embedded
 * windows) that never fire a window resize event. Without that, a stale scale
 * leaves the canvas wider than its box and the right edge gets cut off.
 */
export default function ReligionsFitCanvas({
  dir,
  bgClassName = "bg-[#faf8f5]",
  className = "",
  fitDeps = [],
  children,
}: ReligionsFitCanvasProps) {
  const wrapRef = React.useRef<HTMLDivElement | null>(null);
  const canvasRef = React.useRef<HTMLDivElement | null>(null);
  const [fit, setFit] = React.useState({
    scale: 1,
    x: 0,
    contentHeight: 0,
    minCanvasHeight: 0,
  });

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const recompute = () => {
      const availWidth = wrap.clientWidth;
      const availHeight = wrap.clientHeight;
      if (!availWidth || !availHeight) return;

      const scale = availWidth / WOMEN_DESIGN_WIDTH;
      // Stretch short pages so their own background reaches the bottom of the
      // window instead of exposing the wrapper's fallback colour.
      const minCanvasHeight = availHeight / scale;
      canvas.style.minHeight = `${minCanvasHeight}px`;

      const naturalHeight = canvas.offsetHeight;
      if (!naturalHeight) return;

      setFit({
        scale,
        x: Math.max(0, (availWidth - WOMEN_DESIGN_WIDTH * scale) / 2),
        contentHeight: Math.max(naturalHeight * scale, availHeight),
        minCanvasHeight,
      });
    };

    recompute();

    const observer = new ResizeObserver(recompute);
    observer.observe(wrap);
    observer.observe(canvas);
    window.addEventListener("resize", recompute);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", recompute);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...fitDeps]);

  return (
    <div
      ref={wrapRef}
      dir={dir}
      className={`relative min-h-screen w-full overflow-x-hidden overflow-y-auto ${bgClassName} ${className}`}
    >
      <div style={{ height: fit.contentHeight || undefined, position: "relative" }}>
        <div
          ref={canvasRef}
          // Flex column + growing children stretch the page (and its background)
          // to the full window height when the scaled content runs shorter.
          className="flex flex-col [&>*]:grow"
          style={{
            width: WOMEN_DESIGN_WIDTH,
            minHeight: fit.minCanvasHeight || undefined,
            transform: `translate(${fit.x}px, 0px) scale(${fit.scale})`,
            transformOrigin: "top left",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
