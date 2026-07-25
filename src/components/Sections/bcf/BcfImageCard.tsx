import React from "react";
import { ArrowRight } from "lucide-react";

type BcfImageCardProps = {
  title: string;
  image: string;
  onClick?: () => void;
  className?: string;
};

/** Figma journey / future row: title + arrow on the left, masked photo on the right. */
export default function BcfImageCard({ title, image, onClick, className = "" }: BcfImageCardProps) {
  const Comp = onClick ? "button" : "div";
  return (
    <Comp
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={`relative flex h-[200px] w-full items-center overflow-hidden rounded-[24px] border border-[#84879d]/80 text-left transition active:scale-[0.99] ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-[46%]"
        style={{
          maskImage: "linear-gradient(90deg, transparent 0%, black 28%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 28%)",
        }}
      >
        <img src={image} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="relative z-10 flex flex-col items-start gap-5 px-9">
        <span className="text-[48px] font-light leading-none text-[#fdeed4]">{title}</span>
        <span className="flex items-center gap-2 text-[#fbc158]">
          <span className="h-px w-16 bg-current" />
          <ArrowRight className="h-6 w-6" />
        </span>
      </div>
    </Comp>
  );
}
