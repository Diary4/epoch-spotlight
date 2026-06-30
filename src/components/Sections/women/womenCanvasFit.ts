import React from "react";

export const WOMEN_DESIGN_WIDTH = 1400;

export type WomenCanvasFit = {
  scale: number;
  x: number;
  contentHeight: number;
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
      const contentHeight = fitViewport ? vh : naturalHeight * scale;
      setFit({ scale, x, contentHeight });
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
