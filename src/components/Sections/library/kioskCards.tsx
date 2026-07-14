import { Link } from "react-router-dom";
import { BookOpen, Feather, Mountain, Leaf, Users, Star } from "lucide-react";
import type { LibraryBook, LibraryCategory, LibraryWriter } from "@/data/libraryTypes";
import { getWriterById } from "@/data/libraryWriters";
import { cn } from "@/lib/utils";

/**
 * Fixed-size (non-responsive) card variants used only inside the library
 * writer screens, which render on a fixed 1080px design canvas that is scaled
 * to fit the viewport. Sizes are absolute px so every screen looks identical.
 */

export function KioskWriterTile({ writer }: { writer: LibraryWriter }) {
  return (
    <Link
      to={`/library/writers/${writer.id}`}
      data-library-item
      className="flex w-[228px] flex-col overflow-hidden rounded-2xl border border-[#E8E0D4] bg-[#FAF8F5] shadow-sm"
    >
      <div className="relative overflow-hidden">
        <img
          src={writer.portrait}
          alt={writer.name}
          className="aspect-[3/4] w-full object-cover sepia-[0.3]"
          style={
            writer.portraitObjectPosition
              ? { objectPosition: writer.portraitObjectPosition }
              : undefined
          }
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0B1C14]/50 to-transparent" />
      </div>
      <div className="px-3 py-5 text-center">
        <p className="font-serif text-xl text-[#0B1C14]">{writer.name}</p>
        {writer.lifespan && <p className="mt-0.5 text-sm text-[#8B7355]">{writer.lifespan}</p>}
        <p className="mt-0.5 text-sm text-[#A68A64]">{writer.roles[0]}</p>
      </div>
    </Link>
  );
}

export function KioskWriterAvatar({ writer }: { writer: LibraryWriter }) {
  return (
    <Link
      to={`/library/writers/${writer.id}`}
      data-library-item
      className="flex w-[150px] flex-col items-center gap-3"
    >
      <div className="h-[130px] w-[130px] overflow-hidden rounded-full border-2 border-[#C5A059]">
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
      <p className="text-center text-base text-white/90">{writer.name}</p>
    </Link>
  );
}

export function KioskQuoteCard({
  writer,
  variant = "light",
  className,
}: {
  writer: LibraryWriter;
  variant?: "light" | "dark";
  className?: string;
}) {
  if (!writer.quote) return null;
  const isDark = variant === "dark";

  return (
    <Link
      to={`/library/writers/${writer.id}`}
      data-library-item
      className={cn(
        "flex w-[440px] flex-col justify-between rounded-3xl border p-8",
        isDark
          ? "border-[#C5A059]/20 bg-[#0B1C14]/80 backdrop-blur-sm"
          : "border-[#E8E0D4] bg-[#FAF8F5]",
        className,
      )}
    >
      <div>
        <span
          className={cn(
            "font-serif text-6xl leading-none",
            isDark ? "text-[#C5A059]/30" : "text-[#C5A059]/40",
          )}
        >
          &ldquo;
        </span>
        <p
          className={cn(
            "mt-2 font-serif text-2xl italic leading-relaxed",
            isDark ? "text-[#F5F2ED]/90" : "text-[#0B1C14]",
          )}
        >
          {writer.quote}
        </p>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <div
          className={cn(
            "h-14 w-14 overflow-hidden rounded-full border-2",
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
              "font-serif text-lg",
              isDark ? "text-[#C5A059]" : "text-[#2D4635]",
            )}
          >
            {writer.name}
          </p>
          <p className={cn("text-base", isDark ? "text-[#B0926A]/70" : "text-[#8B7355]")}>
            {writer.roles[0]}
          </p>
        </div>
      </div>
    </Link>
  );
}

export function KioskBookCard({ book }: { book: LibraryBook }) {
  const author = getWriterById(book.authorId);

  return (
    <Link
      to={`/library/books/${book.id}`}
      data-library-item
      className="flex w-[200px] flex-col"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-md">
        <img src={book.cover} alt={book.title} className="h-full w-full object-cover" />
      </div>
      <p className="mt-3 line-clamp-1 font-serif text-lg text-[#0B1C14]">{book.title}</p>
      <p className="text-sm text-[#8B7355]">
        {book.genre} • {book.year}
      </p>
    </Link>
  );
}

const categoryIconMap = {
  poetry: Feather,
  novels: BookOpen,
  history: Mountain,
  philosophy: Leaf,
  biographies: Users,
  culture: Star,
} as const;

export function KioskCategoryCard({ category }: { category: LibraryCategory }) {
  const Icon = categoryIconMap[category.icon];

  return (
    <button
      type="button"
      className="flex w-[150px] shrink-0 flex-col items-center gap-3 rounded-2xl bg-[#F0EBE3] px-3 py-6"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-[#C5A059]/30">
        <Icon className="h-8 w-8 text-[#C5A059]" strokeWidth={1.5} />
      </div>
      <span className="text-center text-base text-[#2D4635]">{category.label}</span>
    </button>
  );
}

export function KioskShelfBook({ book }: { book: LibraryBook }) {
  const author = getWriterById(book.authorId);

  return (
    <Link
      to={`/library/books/${book.id}`}
      data-library-item
      className="flex flex-col items-center"
    >
      <div className="relative h-[280px] w-[180px] overflow-hidden rounded-sm shadow-[4px_4px_12px_rgba(0,0,0,0.25)]">
        <img src={book.cover} alt={book.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
      </div>
      <p className="mt-3 text-center font-serif text-lg text-[#0B1C14]">{book.title}</p>
      <p className="text-center text-sm text-[#8B7355]">{author?.name}</p>
    </Link>
  );
}
