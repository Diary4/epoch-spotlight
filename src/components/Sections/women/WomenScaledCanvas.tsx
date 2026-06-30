import React from "react";
import { useWomenCanvasFit, WOMEN_DESIGN_WIDTH } from "@/components/Sections/women/womenCanvasFit";

type WomenScaledCanvasProps = {
  dir?: "ltr" | "rtl";
  className?: string;
  bgClassName?: string;
  fitDeps?: React.DependencyList;
  /** Scale down further so the full canvas height fits within the viewport (no scroll). */
  fitViewport?: boolean;
  children: React.ReactNode;
};

/** Width-scaled 1400px canvas; optionally scales to viewport height when `fitViewport` is set. */
export default function WomenScaledCanvas({
  dir,
  className = "",
  bgClassName = "bg-[#f9f3e8]",
  fitDeps = [],
  fitViewport = false,
  children,
}: WomenScaledCanvasProps) {
  const { canvasRef, fit } = useWomenCanvasFit(fitDeps, { fitViewport });

  return (
    <div
      dir={dir}
      className={`relative w-full overflow-x-hidden ${fitViewport ? "h-screen overflow-y-hidden" : "min-h-screen overflow-y-auto"} ${bgClassName} ${className}`}
    >
      <div style={{ height: fit.contentHeight || undefined, position: "relative" }}>
        <div
          ref={canvasRef}
          style={{
            width: WOMEN_DESIGN_WIDTH,
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
