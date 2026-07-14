import React from "react";
import {
  DESIGN_WIDTH,
  useDesignCanvasFit,
  type DesignCanvasFit,
} from "@/hooks/useDesignCanvasFit";

type DesignScaledCanvasProps = {
  dir?: "ltr" | "rtl";
  className?: string;
  bgClassName?: string;
  fitDeps?: React.DependencyList;
  /** Scale to fit viewport height — for full-screen pages (slider). */
  fitViewport?: boolean;
  /** Fixed overlays rendered outside the scaled transform (e.g. lightboxes). */
  overlay?: React.ReactNode;
  children: React.ReactNode;
};

export default function DesignScaledCanvas({
  dir,
  className = "",
  bgClassName = "",
  fitDeps = [],
  fitViewport = false,
  overlay,
  children,
}: DesignScaledCanvasProps) {
  const { canvasRef, fit } = useDesignCanvasFit(fitDeps, { fitViewport });

  return (
    <div
      dir={dir}
      className={`relative w-full overflow-x-hidden ${
        fitViewport ? "h-screen overflow-y-hidden" : "min-h-screen overflow-y-auto"
      } ${bgClassName} ${className}`}
    >
      {overlay}
      <ScaledCanvasInner canvasRef={canvasRef} fit={fit} fitViewport={fitViewport}>
        {children}
      </ScaledCanvasInner>
    </div>
  );
}

type ScaledCanvasInnerProps = {
  canvasRef: React.RefObject<HTMLDivElement | null>;
  fit: DesignCanvasFit;
  fitViewport: boolean;
  children: React.ReactNode;
};

function ScaledCanvasInner({
  canvasRef,
  fit,
  fitViewport,
  children,
}: ScaledCanvasInnerProps) {
  return (
    <div style={{ height: fit.contentHeight || undefined, position: "relative" }}>
      <div
        ref={canvasRef}
        // Match WomenScaledCanvas: flex + grow keeps short pages filling the
        // window while still measuring natural height for scale.
        className="flex flex-col [&>*]:grow"
        style={{
          width: DESIGN_WIDTH,
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
  );
}
