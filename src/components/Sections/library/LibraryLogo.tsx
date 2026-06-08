type LibraryLogoProps = {
  variant?: "light" | "dark" | "gold";
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
};

const sizeClasses = {
  sm: { icon: "h-6 w-6", title: "text-[10px]", tagline: "text-[8px]" },
  md: { icon: "h-8 w-8", title: "text-xs", tagline: "text-[9px]" },
  lg: { icon: "h-10 w-10", title: "text-sm", tagline: "text-[10px]" },
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
    <div className="flex flex-col items-center gap-1">
      <StarIcon className={`${sizes.icon} ${colors.icon}`} />
      <p className={`font-serif uppercase tracking-[0.2em] ${sizes.title} ${colors.title}`}>
        Voices of Kurdistan
      </p>
      {showTagline && (
        <p className={`font-serif italic ${sizes.tagline} ${colors.tagline}`}>
          Our Writers. Our Heritage.
        </p>
      )}
    </div>
  );
}
