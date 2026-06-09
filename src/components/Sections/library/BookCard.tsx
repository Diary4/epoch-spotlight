import { Link } from "react-router-dom";
import { Bookmark } from "lucide-react";
import type { LibraryBook } from "@/data/libraryTypes";
import { getWriterById } from "@/data/libraryWriters";

type BookCardProps = {
  book: LibraryBook;
  variant?: "shelf" | "carousel" | "compact";
  showRating?: boolean;
};

export default function BookCard({ book, variant = "carousel", showRating = false }: BookCardProps) {
  const author = getWriterById(book.authorId);

  if (variant === "shelf") {
    return (
      <Link
        to={`/library/books/${book.id}`}
        className="flex flex-col items-center"
      >
        <div
          className="relative h-44 w-28 overflow-hidden rounded-sm shadow-[4px_4px_12px_rgba(0,0,0,0.25)] sm:h-52 sm:w-32 lg:h-64 lg:w-40 xl:h-72 xl:w-44 3xl:h-80 3xl:w-52"
          style={{ backgroundColor: book.coverColor ?? "#2D4635" }}
        >
          <img
            src={book.cover}
            alt={book.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
        </div>
        <p className="mt-2 text-center font-serif text-xs text-[#0B1C14] sm:text-sm lg:text-base 3xl:text-xl">
          {book.title}
        </p>
        <p className="text-center text-[10px] text-[#8B7355] sm:text-xs lg:text-sm 3xl:text-base">
          {author?.name}
        </p>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        to={`/library/books/${book.id}`}
        className="flex w-36 shrink-0 flex-col sm:w-40 lg:w-48 xl:w-52 3xl:w-60"
      >
        <div
          className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-md"
          style={{ backgroundColor: book.coverColor ?? "#2D4635" }}
        >
          <img src={book.cover} alt={book.title} className="h-full w-full object-cover" />
        </div>
        <p className="mt-2 font-serif text-sm text-[#0B1C14] line-clamp-1 lg:text-base 3xl:text-xl">
          {book.title}
        </p>
        <p className="text-xs text-[#8B7355] lg:text-sm 3xl:text-base">
          {book.genre} • {book.year}
        </p>
        <button
          type="button"
          className="mt-1 self-end text-[#C5A059]"
          aria-label={`Bookmark ${book.title}`}
          onClick={(e) => e.preventDefault()}
        >
          <Bookmark className="h-4 w-4 lg:h-5 lg:w-5 3xl:h-6 3xl:w-6" />
        </button>
      </Link>
    );
  }

  return (
    <Link
      to={`/library/books/${book.id}`}
        className="flex w-40 shrink-0 flex-col sm:w-44 lg:w-52 xl:w-56 3xl:w-64"
    >
      <div
        className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-[0_8px_24px_rgba(11,28,20,0.12)]"
        style={{ backgroundColor: book.coverColor ?? "#2D4635" }}
      >
        <img
          src={book.cover}
          alt={book.title}
          className="h-full w-full object-cover"
        />
      </div>
      <p className="mt-3 font-serif text-sm font-medium text-[#0B1C14] lg:text-base 3xl:text-xl">
        {book.title}
      </p>
      <p className="text-xs text-[#8B7355] lg:text-sm 3xl:text-base">{author?.name}</p>
      {showRating && book.rating && (
        <div className="mt-1 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`text-xs lg:text-sm 3xl:text-base ${i < Math.floor(book.rating!) ? "text-[#C5A059]" : "text-[#D4C4A8]"}`}
            >
              ★
            </span>
          ))}
          <span className="ml-1 text-xs text-[#8B7355] lg:text-sm 3xl:text-base">{book.rating}</span>
        </div>
      )}
    </Link>
  );
}
