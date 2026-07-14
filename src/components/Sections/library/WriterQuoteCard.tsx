import { Link } from "react-router-dom";
import type { LibraryWriter } from "@/data/libraryTypes";
import { cn } from "@/lib/utils";
import { libraryBodySmall } from "./libraryLayout";

type WriterQuoteCardProps = {
  writer: LibraryWriter;
  variant?: "light" | "dark";
  className?: string;
};

export default function WriterQuoteCard({
  writer,
  variant = "light",
  className,
}: WriterQuoteCardProps) {
  if (!writer.quote) return null;

  const isDark = variant === "dark";

  return (
    <Link
      to={`/library/writers/${writer.id}`}
      className={cn(
        "flex shrink-0 flex-col justify-between rounded-2xl border p-6 lg:rounded-3xl lg:p-8 3xl:p-10",
        isDark
          ? "w-72 border-[#C5A059]/20 bg-[#0B1C14]/80 backdrop-blur-sm sm:w-80 lg:w-96 3xl:w-[28rem]"
          : "w-72 border-[#E8E0D4] bg-[#FAF8F5] sm:w-80 lg:w-96 3xl:w-[28rem]",
        className,
      )}
    >
      <div>
        <span
          className={cn(
            "font-serif text-5xl leading-none lg:text-6xl 3xl:text-7xl",
            isDark ? "text-[#C5A059]/30" : "text-[#C5A059]/40",
          )}
        >
          "
        </span>
        <p
          className={cn(
            "mt-1 font-serif text-base italic leading-relaxed lg:text-lg 3xl:text-2xl",
            isDark ? "text-[#F5F2ED]/90" : "text-[#0B1C14]",
          )}
        >
          {writer.quote}
        </p>
      </div>

      <div className="mt-6 flex items-center gap-3 lg:mt-8 lg:gap-4">
        <div
          className={cn(
            "h-10 w-10 overflow-hidden rounded-full border-2 lg:h-12 lg:w-12 3xl:h-14 3xl:w-14",
            isDark ? "border-[#C5A059]/60" : "border-[#C5A059]",
          )}
        >
          <img
            src={writer.portrait}
            alt={writer.name}
            className="h-full w-full object-cover grayscale"
            style={
              writer.portraitObjectPosition
                ? { objectPosition: writer.portraitObjectPosition }
                : undefined
            }
          />
        </div>
        <div>
          <p
            className={cn(
              "font-serif text-sm lg:text-base 3xl:text-xl",
              isDark ? "text-[#C5A059]" : "text-[#2D4635]",
            )}
          >
            {writer.name}
          </p>
          <p className={cn(libraryBodySmall, isDark && "text-[#B0926A]/70")}>
            {writer.roles[0]}
          </p>
        </div>
      </div>
    </Link>
  );
}
