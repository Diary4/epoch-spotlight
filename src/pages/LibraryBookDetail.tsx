import { useLayoutEffect, useRef } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  BookOpen,
  Heart,
  Headphones,
  Play,
  User,
  Share2,
  Calendar,
  Globe,
  Clock,
  ChevronRight,
} from "lucide-react";
import LibraryLogo from "@/components/Sections/library/LibraryLogo";
import LibrarySidebar from "@/components/Sections/library/LibrarySidebar";
import BookCard from "@/components/Sections/library/BookCard";
import { getBookById, getBooksByAuthor } from "@/data/libraryBooks";
import { getWriterById } from "@/data/libraryWriters";
import { FREE_PREVIEW_PAGES } from "@/lib/libraryPreview";

const quickActions = [
  { icon: Headphones, title: "Listen to Audio", subtitle: "Narrated in Kurdish" },
  { icon: Play, title: "Watch Video", subtitle: "About the book" },
  { icon: User, title: "Author", subtitle: "About the writer" },
  { icon: Share2, title: "Share", subtitle: "Share this book" },
];

export default function LibraryBookDetail() {
  const { bookId } = useParams();
  const book = bookId ? getBookById(bookId) : undefined;
  const rootRef = useRef<HTMLElement>(null);

  if (!book) {
    return <Navigate to="/library" replace />;
  }

  const author = getWriterById(book.authorId);
  const relatedBooks = getBooksByAuthor(book.authorId).filter((b) => b.id !== book.id);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [bookId]);

  return (
    <div className="flex min-h-screen bg-[#F5F1E6]">
      <LibrarySidebar />

      <main ref={rootRef} className="flex-1 overflow-x-hidden">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-[#E8E0D4] px-5 py-4 sm:px-8">
          <Link
            to="/library"
            className="flex items-center gap-2 text-sm text-[#5C4A3A]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <LibraryLogo variant="light" size="sm" />
          <button
            type="button"
            className="flex items-center gap-1 text-sm text-[#5C4A3A]"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
            Search
          </button>
        </header>

        {/* Book Hero */}
        <section className="px-5 py-8 sm:px-8 lg:py-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
            {/* Cover */}
            <div className="mx-auto shrink-0 lg:mx-0">
              <div
                className="relative h-72 w-48 overflow-hidden rounded-lg shadow-[8px_8px_24px_rgba(11,28,20,0.2)] sm:h-80 sm:w-56"
                style={{ backgroundColor: book.coverColor ?? "#1B3022" }}
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <span className="inline-block rounded-full bg-[#0B1C14] px-3 py-1 text-[10px] uppercase tracking-wider text-white">
                {book.genre}
              </span>
              <h1 className="mt-3 font-serif text-3xl text-[#0B1C14] sm:text-4xl">
                {book.title}
              </h1>
              {author && (
                <Link
                  to={`/library/writers/${author.id}`}
                  className="mt-1 inline-block text-base text-[#B0926A] hover:underline"
                >
                  {author.name}
                </Link>
              )}

              <div className="mt-5 flex flex-wrap gap-5 text-sm text-[#5C4A3A]">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-[#C5A059]" />
                  Year {book.year}
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe className="h-4 w-4 text-[#C5A059]" />
                  Language {book.language}
                </span>
                {book.readingTime && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-[#C5A059]" />
                    Reading Time {book.readingTime}
                  </span>
                )}
              </div>

              <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#5C4A3A]">
                {book.description}
              </p>

              <p className="mt-4 text-xs text-[#8B7355]">
                Free preview: first {FREE_PREVIEW_PAGES} pages · Full book available for purchase
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  to={`/library/books/${bookId}/read`}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#0B1C14] px-5 py-2.5 text-sm text-white transition-colors hover:bg-[#1B3022]"
                >
                  <BookOpen className="h-4 w-4" />
                  Read Sample
                </Link>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-lg border border-[#B0926A] bg-white px-5 py-2.5 text-sm text-[#B0926A]"
                >
                  <Heart className="h-4 w-4" />
                  Add to Favorites
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="grid grid-cols-2 gap-3 px-5 sm:grid-cols-4 sm:px-8">
          {quickActions.map((action) => (
            <button
              key={action.title}
              type="button"
              className="flex flex-col items-start rounded-xl border border-[#E8E0D4] bg-[#FAF8F5] px-4 py-4 text-left transition-colors hover:border-[#C5A059]/50"
            >
              <action.icon className="h-5 w-5 text-[#C5A059]" />
              <p className="mt-2 text-sm font-medium text-[#0B1C14]">{action.title}</p>
              <p className="text-xs text-[#8B7355]">{action.subtitle}</p>
            </button>
          ))}
        </section>

        {/* About + Details */}
        <section className="mt-8 grid gap-6 px-5 sm:px-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#E8E0D4] bg-[#FAF8F5] p-6">
            <h2 className="font-serif text-xl text-[#0B1C14]">About the Book</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#5C4A3A]">
              {book.aboutText ?? book.description}
            </p>
          </div>

          <div className="rounded-2xl border border-[#E8E0D4] bg-[#FAF8F5] p-6">
            <h2 className="font-serif text-xl text-[#0B1C14]">Book Details</h2>
            <dl className="mt-4 space-y-3 text-sm">
              {[
                ["Genre", book.genre],
                ["Pages", book.pages?.toString()],
                ["Publisher", book.publisher],
                ["First Published", book.year.toString()],
                ["ISBN", book.isbn],
                ["Language", `${book.language} - Sorani`],
              ]
                .filter(([, value]) => value)
                .map(([label, value]) => (
                  <div key={label} className="flex justify-between border-b border-[#E8E0D4]/60 pb-2">
                    <dt className="text-[#8B7355]">{label}</dt>
                    <dd className="text-[#0B1C14]">{value}</dd>
                  </div>
                ))}
            </dl>

            <div className="mt-6 flex items-center justify-between rounded-xl bg-[#E8E0D4]/50 px-4 py-3">
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-[#C5A059]" />
                <div>
                  <p className="text-sm font-medium text-[#0B1C14]">Available in Library</p>
                  <p className="text-xs text-[#8B7355]">Read at your local cultural center</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-[#C5A059]" />
            </div>
          </div>
        </section>

        {/* Related Books */}
        {relatedBooks.length > 0 && author && (
          <section className="mt-10 border-t border-[#E8E0D4] px-5 py-8 sm:px-8">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-lg text-[#0B1C14]">
                More Books by {author.name}
              </h2>
              <button type="button" className="text-xs text-[#8B7355]">
                View all →
              </button>
            </div>
            <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
              {relatedBooks.map((relatedBook) => (
                <BookCard key={relatedBook.id} book={relatedBook} variant="compact" />
              ))}
            </div>
          </section>
        )}

        {/* Footer CTA */}
        <footer className="mx-5 mb-8 mt-6 flex items-center gap-4 rounded-2xl bg-[#E8E0D4]/60 px-6 py-5 sm:mx-8">
          <span className="text-2xl text-[#C5A059]">✦</span>
          <p className="flex-1 text-sm text-[#5C4A3A]">
            Step into the world of words. Explore the beauty of Kurdish literature.
          </p>
          <Link
            to="/library/browse"
            className="shrink-0 rounded-full bg-[#0B1C14] px-5 py-2.5 text-sm text-[#C5A059]"
          >
            Explore More Books →
          </Link>
        </footer>
      </main>
    </div>
  );
}
