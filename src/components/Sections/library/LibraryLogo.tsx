type LibraryLogoProps = {
  variant?: "light" | "dark" | "gold";
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
};

const sizeClasses = {
  sm: {
    icon: "h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 3xl:h-10 3xl:w-10",
    title: "text-[10px] sm:text-xs lg:text-sm 3xl:text-base",
    tagline: "text-[8px] sm:text-[9px] lg:text-[10px] 3xl:text-sm",
  },
  md: {
    icon: "h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 3xl:h-16 3xl:w-16",
    title: "text-xs sm:text-sm lg:text-base 3xl:text-xl",
    tagline: "text-[9px] sm:text-[10px] lg:text-xs 3xl:text-base",
  },
  lg: {
    icon: "h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 3xl:h-20 3xl:w-20",
    title: "text-sm sm:text-base lg:text-lg 3xl:text-2xl",
    tagline: "text-[10px] sm:text-xs lg:text-sm 3xl:text-lg",
  },
};

const colorClasses = {
  light: { icon: "text-[#C5A059]", title: "text-[#0B1C14]", tagline: "text-[#8B7355]" },
  dark: { icon: "text-[#C5A059]", title: "text-[#C5A059]", tagline: "text-[#C5A059]/70" },
  gold: { icon: "text-[#C5A059]", title: "text-[#C5A059]", tagline: "text-[#C5A059]/80" },
};

function StarIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="currentColor" aria-hidden>
      <path d="M20 2l2.5 7.5H30l-6 4.5 2.5 7.5L20 17l-6.5 4.5 2.5-7.5-6-4.5h7.5L20 2z" opacity="0.9" />
      <path d="M20 8l1.2 3.8h4l-3.2 2.3 1.2 3.8L20 14.5l-3.2 2.4 1.2-3.8-3.2-2.3h4L20 8z" />
    </svg>
  );
}

export default function LibraryLogo({
  variant = "light",
  size = "md",
  showTagline = true,
}: LibraryLogoProps) {
  const sizes = sizeClasses[size];
  const colors = colorClasses[variant];

  return (
    <div className="flex flex-col items-center gap-1 lg:gap-2">
      <StarIcon className={`${sizes.icon} ${colors.icon}`} />
      <p className={`font-serif uppercase tracking-[0.2em] ${sizes.title} ${colors.title}`}>
        Gate of Kurdistan
      </p>
      {showTagline && (
        <p className={`font-serif italic ${sizes.tagline} ${colors.tagline}`}>
          Our Writers. Our Heritage.
        </p>
      )}
    </div>
  );
}
