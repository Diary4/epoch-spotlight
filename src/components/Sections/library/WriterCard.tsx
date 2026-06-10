import { Link } from "react-router-dom";
import type { LibraryWriter } from "@/data/libraryTypes";

type WriterCardProps = {
  writer: LibraryWriter;
  variant?: "featured" | "browse" | "avatar";
};

export default function WriterCard({ writer, variant = "featured" }: WriterCardProps) {
  if (variant === "avatar") {
    return (
      <Link
        to={`/library/writers/${writer.id}`}
        className="flex shrink-0 flex-col items-center gap-2 lg:gap-3"
      >
        <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-[#C5A059] sm:h-20 sm:w-20 lg:h-24 lg:w-24 xl:h-28 xl:w-28 3xl:h-32 3xl:w-32">
          <img
            src={writer.portrait}
            alt={writer.name}
            className="h-full w-full object-cover grayscale"
          />
        </div>
        <p className="max-w-[80px] text-center text-[10px] text-white/90 sm:text-xs lg:text-sm 3xl:text-base">
          {writer.name}
        </p>
      </Link>
    );
  }

  if (variant === "browse") {
    return (
      <Link
        to={`/library/writers/${writer.id}`}
        className="flex w-36 shrink-0 flex-col sm:w-40 lg:w-48 xl:w-52 3xl:w-60"
      >
        <div className="relative overflow-hidden rounded-t-2xl">
          <img
            src={writer.portrait}
            alt={writer.name}
            className="aspect-[3/4] w-full object-cover sepia-[0.3]"
          />
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 lg:-bottom-4">
            <span className="text-[#C5A059] lg:text-xl 3xl:text-2xl">✦</span>
          </div>
        </div>
        <div className="mt-4 rounded-b-2xl bg-[#F5F2ED] px-2 py-3 text-center lg:px-3 lg:py-4 3xl:py-5">
          <p className="font-serif text-sm text-[#0B1C14] lg:text-base 3xl:text-xl">{writer.name}</p>
          {writer.lifespan && (
            <p className="text-[10px] text-[#8B7355] lg:text-xs 3xl:text-sm">{writer.lifespan}</p>
          )}
          <p className="text-[10px] text-[#A68A64] lg:text-xs 3xl:text-sm">{writer.roles[0]}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/library/writers/${writer.id}`}
      className="relative flex w-32 shrink-0 flex-col overflow-hidden rounded-xl border border-[#E8E0D4] bg-[#FAF8F5] shadow-sm sm:w-36 lg:w-44 xl:w-48 3xl:w-56"
    >
      <div className="relative overflow-hidden">
        <img
          src={writer.portrait}
          alt={writer.name}
          className="aspect-[3/4] w-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C14]/60 via-transparent to-transparent opacity-80" />
      </div>
      <div className="px-2 py-3 text-center lg:px-3 lg:py-4">
        <p className="font-serif text-xs text-[#0B1C14] lg:text-sm 3xl:text-lg">{writer.name}</p>
        <p className="mt-0.5 text-[10px] text-[#8B7355] lg:text-xs 3xl:text-sm">{writer.roles[0]}</p>
      </div>
    </Link>
  );
}
