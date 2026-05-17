import { ChevronRight } from "lucide-react";

type ClassicalCardProps = {
  title: string;
  image: string;
  onClick: () => void;
  ariaLabel?: string;
};

export default function ClassicalCard({
  title,
  image,
  onClick,
  ariaLabel,
}: ClassicalCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel ?? title}
      className="relative h-[360px] w-full overflow-hidden rounded-[28px] border border-[#d9b873]/60 bg-[#fff8ea] p-3 text-left shadow-[0_18px_35px_rgba(67,43,18,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c3923a]"
    >
      <div className="relative h-[210px] overflow-hidden rounded-[20px]">
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#3a2615]/25" />
      </div>

      <div className="relative flex h-[120px] flex-col items-center justify-center px-4 text-center">
        <h3 className="font-serif text-[25px] font-black uppercase leading-[1.05] tracking-tight text-[#332315]">
          {title}
        </h3>

        <div className="mt-5 flex items-center gap-2 text-[#b98222]">
          <span className="h-px w-10 bg-[#c69235]" />
          <span className="text-xs">◆</span>
          <span className="h-px w-10 bg-[#c69235]" />
        </div>
      </div>

      <div className="absolute bottom-8 right-8 flex h-11 w-11 items-center justify-center rounded-full border border-[#c9973e]/70 bg-[#fff3d8] text-[#b98222]">
        <ChevronRight size={22} />
      </div>
    </button>
  );
}
