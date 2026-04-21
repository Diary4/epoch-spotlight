const HeroCharacter = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 200 260"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Soft glow behind figure */}
      <defs>
        <radialGradient id="charGlow" cx="50%" cy="55%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--hero-accent))" stopOpacity="0.25" />
          <stop offset="100%" stopColor="hsl(var(--hero-accent))" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="charFill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--hero-foreground))" stopOpacity="0.95" />
          <stop offset="100%" stopColor="hsl(var(--hero-foreground))" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      <ellipse cx="100" cy="150" rx="95" ry="100" fill="url(#charGlow)" />

      {/* Generic human silhouette: head + shoulders + torso */}
      <g fill="url(#charFill)">
        {/* Head */}
        <circle cx="100" cy="70" r="32" />
        {/* Neck */}
        <rect x="90" y="98" width="20" height="14" rx="4" />
        {/* Shoulders / torso */}
        <path d="M40 220 C 40 160, 70 120, 100 120 C 130 120, 160 160, 160 220 L 160 260 L 40 260 Z" />
      </g>
    </svg>
  );
};

export default HeroCharacter;
