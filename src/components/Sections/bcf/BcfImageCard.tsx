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
  const interactive = Boolean(onClick);
  return (
    <Comp
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={`group relative flex h-[200px] w-full transform-gpu items-center overflow-hidden rounded-[24px] border border-[#84879d]/80 text-left transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
        interactive
          ? "hover:-translate-y-1.5 hover:border-[#fbc158]/70 hover:shadow-[0_20px_44px_rgba(0,0,0,0.4)] active:translate-y-0 active:scale-[0.99] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          : ""
      } ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-[46%]"
        style={{
          maskImage: "linear-gradient(90deg, transparent 0%, black 28%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 28%)",
        }}
      >
        <img
          src={image}
          alt=""
          decoding="async"
          className="h-full w-full transform-gpu object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
      <div className="relative z-10 flex flex-col items-start gap-5 px-9">
        <span className="text-[48px] font-light leading-none text-[#fdeed4]">{title}</span>
        <span className="flex items-center gap-2 text-[#fbc158]">
          <span className="h-px w-16 bg-current transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-24" />
          <ArrowRight className="h-6 w-6 transform-gpu transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5" />
        </span>
      </div>
    </Comp>
  );
}
