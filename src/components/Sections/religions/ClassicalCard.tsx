type ClassicalCardProps = {
  title: string;
  image: string;
  ctaLabel?: string;
  onClick?: () => void;
  ariaLabel?: string;
};

export default function ClassicalCard({
  title,
  image,
  ctaLabel = "Open",
  onClick,
  ariaLabel,
}: ClassicalCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel ?? title}
      className="bg-[#f4eadb] relative flex w-full cursor-pointer flex-col overflow-hidden rounded-[28px] text-left shadow-[0_14px_44px_rgba(28,18,8,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c99a55] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4eadb]"
      style={{ aspectRatio: "3 / 4" }}
    >
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div
        className="absolute inset-0 bg-gradient-to-b from-[#f4eadb]/30 via-[#f4eadb]/10 to-[#f4eadb]/30"
        aria-hidden="true"
      />

      <div className="relative flex h-full min-h-0 flex-col justify-between p-5 sm:p-6">
        <h3 className="text-center font-sans text-[1.35rem] font-bold leading-tight tracking-tight text-[#332315] sm:text-2xl">
          {title}
        </h3>

        <span className="block w-full rounded-full bg-white py-3 text-center font-sans text-sm font-semibold text-[#141414]">
          {ctaLabel}
        </span>
      </div>
    </button>
  );
}
