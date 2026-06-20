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
      className="font-serif bg-[#fffff4] border border-stone-200/60 p-1.5 sm:p-4 relative flex w-full cursor-pointer flex-col overflow-x-hidden rounded-2xl sm:rounded-[32px] text-left shadow-[0_8px_30px_rgba(28,24,20,0.03)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6a45b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf8f5]"
      style={{ aspectRatio: "3 / 4" }}
    >
      {/* Framed Image Container */}
      <div className="relative w-full h-[76%] overflow-x-hidden rounded-lg sm:rounded-2xl bg-stone-100">
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover"
        />
        {/* Soft inner shadow for depth */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_15px_rgba(0,0,0,0.04)]" />
      </div>

      {/* Minimalist Title & Arrow Indicator */}
      <div className="flex items-center justify-between flex-1 pt-1.5 sm:pt-4 w-full">
        <h3 className="font-serif font-black uppercase tracking-wider font-light text-[10px] sm:text-[1.15rem] leading-snug text-[#332315] line-clamp-2 pr-1.5 sm:pr-3 flex-1">
          {title}
        </h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-2.5 w-2.5 sm:h-4 sm:w-4 shrink-0 text-[#d6a45b]"
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