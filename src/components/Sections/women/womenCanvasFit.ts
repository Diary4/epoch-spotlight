import React from "react";

export const WOMEN_DESIGN_WIDTH = 1400;

export type WomenCanvasFit = {
  scale: number;
  x: number;
  contentHeight: number;
  /** Pre-scale height the canvas must reach so it fills the window after scaling. */
  minCanvasHeight: number;
};

type WomenCanvasFitOptions = {
  fitViewport?: boolean;
};

export function useWomenCanvasFit(
  deps: React.DependencyList = [],
  options: WomenCanvasFitOptions = {},
) {
  const { fitViewport = false } = options;
  const canvasRef = React.useRef<HTMLDivElement | null>(null);
  const [fit, setFit] = React.useState<WomenCanvasFit>({
    scale: 1,
    x: 0,
    contentHeight: 0,
    minCanvasHeight: 0,
  });

  React.useEffect(() => {
    const recompute = () => {
      const el = canvasRef.current;
      if (!el) return;
      const naturalHeight = el.offsetHeight;
      if (!naturalHeight) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const widthScale = vw / WOMEN_DESIGN_WIDTH;
      const scale = fitViewport
        ? Math.min(widthScale, vh / naturalHeight)
        : widthScale;
      const x = Math.max(0, (vw - WOMEN_DESIGN_WIDTH * scale) / 2);
      // Stretch short pages so their own background reaches the bottom of the
      // window instead of exposing the wrapper's fallback color.
      const minCanvasHeight = fitViewport ? 0 : vh / scale;
      const contentHeight = fitViewport
        ? vh
        : Math.max(naturalHeight * scale, vh);
      setFit({ scale, x, contentHeight, minCanvasHeight });
    };

    recompute();
    window.addEventListener("resize", recompute);
    const el = canvasRef.current;
    const ro = el ? new ResizeObserver(recompute) : null;
    if (el && ro) ro.observe(el);
    return () => {
      window.removeEventListener("resize", recompute);
      ro?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, fitViewport]);

  return { canvasRef, fit };
}
