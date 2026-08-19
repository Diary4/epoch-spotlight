import React from "react";
import { rafSchedule } from "@/lib/rafSchedule";

type FitScaledCanvasProps = {
  /** Artboard width the screens are designed against. */
  designWidth: number;
  /**
   * Artboard height. Only read when `fit` is `"contain"`, which needs to know
   * the shape of the box it is fitting, not just its width.
   */
  designHeight?: number;
  /**
   * How the artboard meets the window.
   *
   * `"width"` — the original behaviour, and the right one for a panel built to
   * the artboard's own proportions: fill the width, and let anything past the
   * bottom of the window scroll.
   *
   * `"contain"` — scale so the *whole* artboard is on screen, centred, with the
   * background showing either side of it. Nothing scrolls and nothing is cut
   * off, whatever shape the screen is. This is what a 1080×1920 experience
   * needs on a display that is not 9:16 — an iPad Pro held upright is 3:4, so
   * width-fitting it leaves a quarter of every screen below the fold.
   */
  fit?: "width" | "contain";
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
  designHeight = 1920,
  fit: fitMode = "width",
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
    y: 0,
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

      if (fitMode === "contain") {
        /**
         * The artboard box is fixed, so the measurement cannot chase itself:
         * `minHeight` is a constant here rather than something derived from the
         * window, which is what the width path has to guard against below.
         *
         * `naturalHeight` still allows for a screen that runs past the artboard
         * — it shrinks to fit rather than clipping, because on a kiosk losing
         * the bottom of a chapter is worse than reading it a little smaller.
         */
        canvas.style.minHeight = `${designHeight}px`;
        // `offsetHeight` rounds to whole layout pixels, so an artboard that is
        // exactly 1920 routinely measures 1921. Taking that literally would
        // shrink every screen by a hair to make room for a pixel that is not
        // there — and worse, by a *different* hair on different chapters. Only
        // a real overflow counts. (Same rounding the width path guards below.)
        const measured = canvas.offsetHeight;
        const naturalHeight =
          measured > designHeight + 1 ? measured : designHeight;

        const containScale = Math.min(
          availWidth / designWidth,
          availHeight / naturalHeight,
        );

        const next = {
          scale: containScale,
          x: Math.max(0, (availWidth - designWidth * containScale) / 2),
          y: Math.max(0, (availHeight - naturalHeight * containScale) / 2),
          contentHeight: availHeight,
          minCanvasHeight: designHeight,
        };

        setFit((prev) =>
          prev.scale === next.scale &&
          prev.x === next.x &&
          prev.y === next.y &&
          prev.contentHeight === next.contentHeight &&
          prev.minCanvasHeight === next.minCanvasHeight
            ? prev
            : next,
        );
        return;
      }

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
        y: 0,
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
        prev.y === next.y &&
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
  }, [...fitDeps, designWidth, designHeight, fitMode]);

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
      className={
        fitMode === "contain"
          ? // `fit-canvas-contain` is a definite viewport height with a `100vh`
            // fallback under `100dvh` — see index.css. A definite height is what
            // makes `clientHeight` above the real visible height on iPad Safari,
            // where a `min-height` would let the wrapper grow past the window
            // and quietly reintroduce the scroll this mode exists to remove.
            `fit-canvas-contain relative w-full ${bgClassName} ${className}`
          : `relative min-h-screen w-full overflow-x-hidden overflow-y-auto scrollbar-hide ${bgClassName} ${className}`
      }
    >
      <div style={{ height: fit.contentHeight || undefined, position: "relative" }}>
        <div
          ref={canvasRef}
          // Flex column + growing children stretch the page (and its background)
          // to the full window height when the scaled content runs shorter.
          className="flex flex-col [&>*]:grow"
          style={{
            /**
             * How far the window reaches past the artboard, in artboard units.
             *
             * Contain-fitting a 9:16 composition onto a screen that is not 9:16
             * leaves room either side of it, and painting that room flat black
             * puts two hard seams down a full-bleed photograph. These say how
             * much room there is, so a layer that is *meant* to be full-bleed —
             * the backdrop, its scrims, the atmosphere, a modal veil — can grow
             * out into it and meet the edge of the screen, while everything
             * composed against the artboard stays where it was designed.
             *
             * Zero in width-fit mode, where there is no room to fill.
             */
            ["--fit-bleed-x" as string]: `${fit.scale ? fit.x / fit.scale : 0}px`,
            ["--fit-bleed-y" as string]: `${fit.scale ? fit.y / fit.scale : 0}px`,
            width: designWidth,
            minHeight: fit.minCanvasHeight || undefined,
            transform: `translate(${fit.x}px, ${fit.y}px) scale(${fit.scale})`,
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
