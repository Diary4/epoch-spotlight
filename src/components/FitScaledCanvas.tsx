import React from "react";
import { rafSchedule } from "@/lib/rafSchedule";

type FitScaledCanvasProps = {
  /** Artboard width the screens are designed against. */
  designWidth: number;
  dir?: "ltr" | "rtl";
  /** BCP 47 language tag — drives script-specific font stacks via CSS. */
  lang?: string;
  bgClassName?: string;
  className?: string;
  fitDeps?: React.DependencyList;
  children: React.ReactNode;
};

/**
 * Design-artboard canvas that always fills the width it is given — the same
 * width-scaling Women.tsx uses, so a page never sits letterboxed inside empty
 * margins, and a short page stretches its own background to the bottom.
 *
 * The difference from the older canvases: the available size is measured from
 * the wrapper with a ResizeObserver instead of `window.innerWidth/Height`, so
 * the canvas also follows container resizes (IDE preview panes, split or
 * embedded windows) that never fire a window resize event. Without that, a
 * stale scale leaves the canvas wider than its box and the right edge is cut off.
 */
export default function FitScaledCanvas({
  designWidth,
  dir,
  lang,
  bgClassName = "",
  className = "",
  fitDeps = [],
  children,
}: FitScaledCanvasProps) {
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

      const scale = availWidth / designWidth;
      // Pre-scale height that fills the window when the page runs shorter.
      const minCanvasHeight = availHeight / scale;
      canvas.style.minHeight = `${minCanvasHeight}px`;

      const naturalHeight = canvas.offsetHeight;
      if (!naturalHeight) return;

      // `offsetHeight` is rounded to whole layout pixels, so a canvas that
      // exactly fills the window routinely measures one pixel taller than it
      // is. Scaled up that is `scale` device pixels of phantom overflow — and
      // on Windows, where scrollbars take real width rather than floating over
      // the content, a bar appears for it. The bar then eats `clientWidth`,
      // which lowers `scale`, which re-runs this measurement: the "sometimes"
      // in the reported flicker. Anything inside one layout pixel is that
      // rounding, never content, so it is snapped away.
      const scaledHeight = naturalHeight * scale;
      const overflow = scaledHeight - availHeight;

      const next = {
        scale,
        x: Math.max(0, (availWidth - designWidth * scale) / 2),
        contentHeight: overflow > scale ? scaledHeight : availHeight,
        minCanvasHeight,
      };

      // Bail out when nothing moved. This matters more here than elsewhere: the
      // observer watches `canvas`, whose `minHeight` this function writes, so an
      // unguarded update re-triggers the observer and the pair keeps measuring
      // and re-rendering each frame instead of settling.
      setFit((prev) =>
        prev.scale === next.scale &&
        prev.x === next.x &&
        prev.contentHeight === next.contentHeight &&
        prev.minCanvasHeight === next.minCanvasHeight
          ? prev
          : next,
      );
    };

    // Three sources (wrap resize, canvas resize, window resize) collapse into a
    // single measurement per frame.
    const schedule = rafSchedule(recompute);

    schedule.flush();

    const observer = new ResizeObserver(schedule);
    observer.observe(wrap);
    observer.observe(canvas);
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      schedule.cancel();
      observer.disconnect();
      window.removeEventListener("resize", schedule);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...fitDeps, designWidth]);

  return (
    <div
      ref={wrapRef}
      dir={dir}
      lang={lang}
      // `scrollbar-hide`: the artboard is 1080×1920, so any window that is not
      // exactly 9:16 leaves real vertical overflow — a browser window with a
      // toolbar on the 4K portrait panel is short by the height of that
      // toolbar. Scrolling is the right answer for it, but a drawn scrollbar is
      // not: these canvases are touch kiosks with no pointer, and on Windows
      // the bar is an opaque strip down the edge of the composition. Wheel,
      // touch and keyboard scrolling all still work.
      className={`relative min-h-screen w-full overflow-x-hidden overflow-y-auto scrollbar-hide ${bgClassName} ${className}`}
    >
      <div style={{ height: fit.contentHeight || undefined, position: "relative" }}>
        <div
          ref={canvasRef}
          // Flex column + growing children stretch the page (and its background)
          // to the full window height when the scaled content runs shorter.
          className="flex flex-col [&>*]:grow"
          style={{
            width: designWidth,
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
