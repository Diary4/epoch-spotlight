type ClassicalCardProps = {
  title: string;
  description?: string;
  image: string;
  badges?: string[];
  ctaLabel?: string;
  onClick?: () => void;
  ariaLabel?: string;
};

export default function ClassicalCard({
  title,
  description,
  image,
  badges = [],
  ctaLabel = "Open",
  onClick,
  ariaLabel,
}: ClassicalCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel ?? title}
      className="relative flex w-full cursor-pointer flex-col overflow-hidden rounded-[28px] text-left shadow-[0_14px_44px_rgba(28,18,8,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c99a55] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4eadb]"
      style={{ aspectRatio: "3 / 4" }}
    >
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div
        className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/50 to-black/5"
        aria-hidden="true"
      />

      <div className="relative mt-auto flex flex-col p-5 sm:p-6">
        <h3 className="font-sans text-[1.35rem] font-bold leading-tight tracking-tight text-white sm:text-2xl">
          {title}
        </h3>

        {description ? (
          <p className="mt-2 line-clamp-3 font-sans text-[13px] leading-relaxed text-white/82 sm:text-sm">
            {description}
          </p>
        ) : null}

        {badges.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full bg-black/45 px-3 py-1 font-sans text-[11px] font-medium text-white/95 backdrop-blur-sm sm:text-xs"
              >
                {badge}
              </span>
            ))}
          </div>
        ) : null}

        <span className="mt-4 block w-full rounded-full bg-white py-3 text-center font-sans text-sm font-semibold text-[#141414]">
          {ctaLabel}
        </span>
      </div>
    </button>
  );
}
