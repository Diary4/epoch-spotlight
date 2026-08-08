import React from "react";

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

      setFit({
        scale,
        x: Math.max(0, (availWidth - designWidth * scale) / 2),
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
  }, [...fitDeps, designWidth]);

  return (
    <div
      ref={wrapRef}
      dir={dir}
      lang={lang}
      className={`relative min-h-screen w-full overflow-x-hidden overflow-y-auto ${bgClassName} ${className}`}
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
