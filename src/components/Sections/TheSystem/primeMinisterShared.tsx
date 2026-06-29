import type { ElementType, ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { discoverDisplayFont, discoverRtlScript } from "@/components/Sections/discoverLanguage";
import { detailBackIconClassName, detailBackIconSize } from "@/constants/backNavigation";
import backgroundPattern from "@/assets/images/patterns/pattern.webp";

export const PM_COLORS = {
  cream: "#fbf5eb",
  navy: "#17233b",
  gold: "#b99152",
  goldDark: "#9b6d35",
  textMuted: "#344052",
};

export function KrgEmblem({ className = "h-14 w-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
      <circle cx="40" cy="40" r="38" fill="none" stroke={PM_COLORS.gold} strokeWidth="1.5" />
      <path
        d="M40 14 L44 28 L58 28 L47 36 L51 50 L40 42 L29 50 L33 36 L22 28 L36 28 Z"
        fill={PM_COLORS.gold}
        opacity="0.9"
      />
      <ellipse cx="40" cy="58" rx="18" ry="8" fill="none" stroke={PM_COLORS.gold} strokeWidth="1.5" />
      <path d="M28 54 Q40 48 52 54" fill="none" stroke={PM_COLORS.gold} strokeWidth="1.2" />
    </svg>
  );
}

export function GoldDiamondDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px flex-1 bg-[#b99152]" />
      <span className="h-2.5 w-2.5 rotate-45 border-2 border-[#b99152]" />
      <span className="h-px flex-1 bg-[#b99152]" />
    </div>
  );
}

export function GoldOrnament() {
  return <span className="text-xl text-[#b99152]">✥</span>;
}

export function TimelineConnector() {
  return <div className="absolute left-[23px] top-12 bottom-0 w-px bg-[#d4b476] sm:left-[31px]" />;
}

type PageShellProps = {
  lang?: "ku" | "en" | "ar";
  onBack?: () => void;
  children: ReactNode;
  className?: string;
};

export function PrimeMinisterPageShell({ lang = "en", onBack, children, className = "" }: PageShellProps) {
  const isRtlScript = discoverRtlScript(lang);

  return (
    <main
      className={`m-0 flex min-h-full w-full self-start justify-center overflow-x-hidden bg-[#f8f1e7] p-0 text-[#17233b] ${isRtlScript ? "font-noto-naskh" : ""} ${className}`}
    >
      <section className="relative flex min-h-full w-full max-w-[900px] flex-col overflow-x-hidden bg-[#fbf5eb] px-5 pb-10 pt-4 sm:px-10 sm:pb-14 sm:pt-6">
        <button
          type="button"
          onClick={onBack}
          className="system-detail-back absolute left-4 top-4 z-30 grid h-10 w-10 place-items-center rounded-full border border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm sm:left-6 sm:top-6 sm:h-12 sm:w-12"
          aria-label="Back"
        >
          <ArrowLeft size={detailBackIconSize} className={detailBackIconClassName} />
        </button>

        <div
          className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: `url(${backgroundPattern})` }}
        />
        <div className="absolute left-0 top-0 h-full w-12 opacity-12 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:20px_20px] sm:w-16" />
        <div className="absolute right-0 top-0 h-full w-12 opacity-12 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:20px_20px] sm:w-16" />

        <div className="relative z-10 flex flex-col">{children}</div>
      </section>
    </main>
  );
}

export function SectionHeader({
  lang = "en",
  eyebrow,
  title,
  subtitle,
}: {
  lang?: "ku" | "en" | "ar";
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  const displayFont = discoverDisplayFont(lang);
  const isAr = lang === "ar";
  const isKu = lang === "ku";
  const governmentLabel = isAr ? "حكومة إقليم كوردستان" : isKu ? "حکومەتی هەرێمی کوردستان" : "Kurdistan Regional Government";

  return (
    <header className="system-detail-intro flex flex-col items-center pt-14 text-center sm:pt-16">
      <KrgEmblem className="h-16 w-16 sm:h-20 sm:w-20" />
      <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.28em] text-[#17233b] sm:text-xs">
        {eyebrow ?? governmentLabel}
      </p>
      {subtitle && (
        <p className={`mt-1 ${displayFont} text-sm uppercase tracking-[0.35em] text-[#b99152] sm:text-base`}>
          {subtitle}
        </p>
      )}
      <h1 className={`mt-2 ${displayFont} text-[clamp(2rem,7vw,3.5rem)] font-light leading-none tracking-tight text-[#17233b]`}>
        {title}
      </h1>
      <div className="mt-4 w-full max-w-[220px]">
        <GoldDiamondDivider />
      </div>
    </header>
  );
}

export function ListItemRow({
  icon: Icon,
  title,
  text,
  displayFont = "font-serif",
  showDivider = true,
}: {
  icon: ElementType;
  title: string;
  text: string;
  displayFont?: string;
  showDivider?: boolean;
}) {
  return (
    <>
      <article className="system-detail-panel grid grid-cols-[52px_1fr] gap-3 py-5 sm:grid-cols-[64px_1fr] sm:gap-4 sm:py-6">
        <div className="grid h-12 w-12 place-items-center rounded-full border border-[#d4b476] bg-white text-[#b99152] sm:h-16 sm:w-16">
          <Icon className="h-5 w-5 sm:h-7 sm:w-7" strokeWidth={1.6} />
        </div>
        <div>
          <h3 className={`${displayFont} text-[clamp(1rem,2.8vw,1.35rem)] font-medium leading-tight text-[#17233b]`}>
            {title}
          </h3>
          <p className="mt-1.5 text-[clamp(0.85rem,2vw,1rem)] font-light leading-relaxed text-[#344052]">
            {text}
          </p>
        </div>
      </article>
      {showDivider && (
        <div className="px-2">
          <GoldDiamondDivider />
        </div>
      )}
    </>
  );
}
