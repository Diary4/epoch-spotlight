import { useEffect, useRef, useState, type DependencyList } from "react";

/** Portrait kiosk design width — matches 1080×1920 reference screens. */
export const DESIGN_WIDTH = 1080;

export type DesignCanvasFit = {
  scale: number;
  x: number;
  contentHeight: number;
  /** Pre-scale min height so short canvases still fill the window (scroll pages). */
  minCanvasHeight: number;
};

type DesignCanvasFitOptions = {
  /** Scale down further so the full canvas fits inside the viewport (no scroll). */
  fitViewport?: boolean;
  designWidth?: number;
};

export function useDesignCanvasFit(
  deps: DependencyList = [],
  options: DesignCanvasFitOptions = {},
) {
  const { fitViewport = false, designWidth = DESIGN_WIDTH } = options;
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const [fit, setFit] = useState<DesignCanvasFit>({
    scale: 1,
    x: 0,
    contentHeight: 0,
    minCanvasHeight: 0,
  });

  useEffect(() => {
    const recompute = () => {
      const el = canvasRef.current;
      if (!el) return;
      const naturalHeight = el.offsetHeight;
      if (!naturalHeight) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const widthScale = vw / designWidth;
      const scale = fitViewport
        ? Math.min(widthScale, vh / naturalHeight)
        : widthScale;
      const x = Math.max(0, (vw - designWidth * scale) / 2);
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
  }, [...deps, fitViewport, designWidth]);

  return { canvasRef, fit };
}
