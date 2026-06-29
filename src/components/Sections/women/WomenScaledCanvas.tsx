import React from "react";
import { useWomenCanvasFit, WOMEN_DESIGN_WIDTH } from "@/components/Sections/women/womenCanvasFit";

type WomenScaledCanvasProps = {
  dir?: "ltr" | "rtl";
  className?: string;
  bgClassName?: string;
  fitDeps?: React.DependencyList;
  children: React.ReactNode;
};

/** Width-scaled 1400px canvas that scrolls naturally — no empty gap below content. */
export default function WomenScaledCanvas({
  dir,
  className = "",
  bgClassName = "bg-[#f9f3e8]",
  fitDeps = [],
  children,
}: WomenScaledCanvasProps) {
  const { canvasRef, fit } = useWomenCanvasFit(fitDeps);

  return (
    <div
      dir={dir}
      className={`relative w-full min-h-screen overflow-x-hidden overflow-y-auto ${bgClassName} ${className}`}
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
