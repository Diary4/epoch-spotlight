type ClassicalCardProps = {
  title: string;
  image: string;
  ctaLabel?: string; // Retained in types to prevent compilation breaks elsewhere
  onClick?: () => void;
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
      className="group bg-[#faf8f5] border border-stone-200/60 p-3 sm:p-4 relative flex w-full cursor-pointer flex-col overflow-hidden rounded-[32px] text-left shadow-[0_8px_30px_rgba(28,24,20,0.03)] hover:shadow-[0_16px_40px_rgba(214,164,91,0.06)] hover:border-[#d6a45b]/30 transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6a45b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf8f5]"
      style={{ aspectRatio: "3 / 4" }}
    >
      {/* Framed Image Container */}
      <div className="relative w-full h-[76%] overflow-hidden rounded-2xl bg-stone-100">
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover"
        />
        {/* Soft inner shadow for depth */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_15px_rgba(0,0,0,0.04)]" />
      </div>

      {/* Minimalist Title & Arrow Indicator */}
      <div className="flex items-center justify-between flex-1 pt-3 sm:pt-4 w-full">
        <h3 className="font-serif text-base sm:text-[1.15rem] leading-snug text-stone-900 transition duration-300 group-hover:text-[#d6a45b] line-clamp-2 pr-3 flex-1">
          {title}
        </h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4 text-[#d6a45b] transform translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300 shrink-0"
        >
          <path
            fillRule="evenodd"
            d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </button>
  );
}