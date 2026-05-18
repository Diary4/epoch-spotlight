type ClassicalCardProps = {
  title: string;
  image: string;
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
      className="relative flex w-full cursor-pointer flex-col overflow-hidden text-left focus-visible:ring-2 focus-visible:ring-[#c99a55] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4eadb]"
      style={{
        background: "#fffdf6",
        border: "1px solid #d9c07a",
        borderRadius: "10px",
        outline: "none",
      }}
    >
      <div
        className="pointer-events-none absolute inset-[5px] z-10"
      />

      <span
        className="pointer-events-none absolute left-2 top-2 z-10 text-[10px] leading-none opacity-40"
        style={{ color: "#c99a55" }}
        aria-hidden="true"
      >
        ✦
      </span>
      <span
        className="pointer-events-none absolute right-2 top-2 z-10 text-[10px] leading-none opacity-40"
        style={{ color: "#c99a55" }}
        aria-hidden="true"
      >
        ✦
      </span>

      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
        />
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: "45%",
            background: "linear-gradient(to top, #fffdf6 0%, transparent 100%)",
          }}
        />
      </div>

      <div
        className="flex flex-col items-center gap-2 px-4 pb-5 pt-3"
        style={{ background: "#fffdf6" }}
      >
        <h3
          className="text-center font-serif leading-snug"
          style={{
            fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif",
            fontSize: "clamp(9px, 1vw, 11px)",
            fontWeight: 700,
            letterSpacing: "0.13em",
            textTransform: "uppercase",
            color: "#2e2116",
            margin: 0,
          }}
        >
          {title}
        </h3>

        <div className="flex items-center gap-[5px]">
          <span
            className="block"
            style={{ width: 22, height: 0.5, background: "#c99a55" }}
          />
          <span
            className="block"
            style={{
              width: 5,
              height: 5,
              background: "#c99a55",
              transform: "rotate(45deg)",
            }}
          />
          <span
            className="block"
            style={{ width: 22, height: 0.5, background: "#c99a55" }}
          />
        </div>
      </div>
    </button>
  );
}
