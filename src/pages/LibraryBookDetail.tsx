import { useRef } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Headphones,
  Calendar,
  Globe,
  Clock,
  ChevronRight,
} from "lucide-react";
import DesignScaledCanvas from "@/components/DesignScaledCanvas";
import LibraryLogo from "@/components/Sections/library/LibraryLogo";
import { KioskBookCard } from "@/components/Sections/library/kioskCards";
import { getBookById, getBooksByAuthor } from "@/data/libraryBooks";
import { getWriterById } from "@/data/libraryWriters";
import { FREE_PREVIEW_PAGES } from "@/lib/libraryPreview";
import { useLibraryPageAnimation } from "@/components/Sections/library/useLibraryPageAnimation";

const quickActions = [
  { icon: Headphones, title: "Listen to Audio", subtitle: "Narrated in Kurdish" },
];

export default function LibraryBookDetail() {
  const { bookId } = useParams();
  const book = bookId ? getBookById(bookId) : undefined;
  const rootRef = useRef<HTMLDivElement>(null);

  useLibraryPageAnimation(rootRef, [bookId]);

  if (!book) {
    return <Navigate to="/library/books" replace />;
  }

  const author = getWriterById(book.authorId);
  const authorBooks = getBooksByAuthor(book.authorId, book.id);

  return (
    <DesignScaledCanvas fitViewport bgClassName="bg-[#F5F1E6]" fitDeps={[bookId]}>
      <div ref={rootRef} className="flex min-h-[1920px] w-full flex-col bg-[#F5F1E6] px-12 pb-12">
        <header
          data-library-header
          className="flex items-center justify-between border-b border-[#E8E0D4] py-8"
        >
          <Link to="/library/books" className="flex items-center gap-2 text-lg text-[#5C4A3A]">
            <ArrowLeft className="h-6 w-6" />
            Back to Books
          </Link>
          <LibraryLogo variant="light" size="md" />
          {author ? (
            <Link
              to={`/library/writers/${author.id}`}
              className="flex items-center gap-2 text-lg text-[#C5A059]"
            >
              {author.name}
              <ArrowRight className="h-6 w-6" />
            </Link>
          ) : (
            <div className="invisible flex items-center gap-2 text-lg" aria-hidden>
              <ArrowLeft className="h-6 w-6" />
              Back
            </div>
          )}
        </header>

        <section data-library-section className="py-10">
          <div className="flex items-start gap-12">
            <div data-library-hero-image className="shrink-0">
              <div className="relative h-[440px] w-[300px] overflow-hidden rounded-lg shadow-[8px_8px_24px_rgba(11,28,20,0.2)]">
                <img src={book.cover} alt={book.title} className="h-full w-full object-cover" />
              </div>
            </div>

            <div data-library-hero-text className="flex-1">
              <span className="inline-block rounded-full bg-[#0B1C14] px-4 py-1.5 text-xs uppercase tracking-wider text-white">
                {book.genre}
              </span>
              <h1 className="mt-3 font-serif text-6xl text-[#0B1C14]">{book.title}</h1>
              {author && (
                <Link
                  to={`/library/writers/${author.id}`}
                  className="mt-1 inline-block text-xl text-[#B0926A]"
                >
                  {author.name}
                </Link>
              )}

              <div className="mt-6 flex flex-wrap gap-8 text-lg text-[#5C4A3A]">
                <span className="flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-[#C5A059]" />
                  Year {book.year}
                </span>
                <span className="flex items-center gap-2">
                  <Globe className="h-6 w-6 text-[#C5A059]" />
                  Language {book.language}
                </span>
                {book.readingTime && (
                  <span className="flex items-center gap-2">
                    <Clock className="h-6 w-6 text-[#C5A059]" />
                    Reading Time {book.readingTime}
                  </span>
                )}
              </div>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#5C4A3A]">
                {book.description}
              </p>

              <p className="mt-4 text-base text-[#8B7355]">
                Free preview: first {FREE_PREVIEW_PAGES} pages · Full book available for purchase
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  to={`/library/books/${bookId}/read`}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#0B1C14] px-7 py-3.5 text-lg text-white"
                >
                  <BookOpen className="h-6 w-6" />
                  Read Sample
                </Link>
                {quickActions.map((action) => (
                  <button
                    key={action.title}
                    type="button"
                    data-library-item
                    className="inline-flex items-center gap-3 rounded-lg border border-[#E8E0D4] bg-[#FAF8F5] px-7 py-3.5 text-left"
                  >
                    <action.icon className="h-6 w-6 text-[#C5A059]" />
                    <span>
                      <span className="block text-lg font-medium text-[#0B1C14]">{action.title}</span>
                      <span className="block text-base text-[#8B7355]">{action.subtitle}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section data-library-section className="mt-2 grid grid-cols-2 gap-8">
          <div className="rounded-2xl border border-[#E8E0D4] bg-[#FAF8F5] p-8">
            <h2 className="font-serif text-3xl text-[#2D4635]">About the Book</h2>
            <p className="mt-4 text-lg leading-relaxed text-[#5C4A3A]">
              {book.aboutText ?? book.description}
            </p>
          </div>

          <div className="rounded-2xl border border-[#E8E0D4] bg-[#FAF8F5] p-8">
            <h2 className="font-serif text-3xl text-[#2D4635]">Book Details</h2>
            <dl className="mt-4 space-y-4 text-lg text-[#5C4A3A]">
              {(
                [
                  ["Genre", book.genre],
                  ["Pages", book.pages?.toString()],
                  ["Publisher", book.publisher],
                  ["First Published", book.year.toString()],
                  ["ISBN", book.isbn],
                  ["Language", `${book.language} - Sorani`],
                ] as [string, string | undefined][]
              )
                .filter(([, value]) => value)
                .map(([label, value]) => (
                  <div key={label} className="flex justify-between border-b border-[#E8E0D4]/60 pb-2">
                    <dt className="text-[#8B7355]">{label}</dt>
                    <dd className="text-[#0B1C14]">{value}</dd>
                  </div>
                ))}
            </dl>

            <div className="mt-6 flex items-center justify-between rounded-xl bg-[#E8E0D4]/50 px-6 py-4">
              <div className="flex items-center gap-4">
                <BookOpen className="h-7 w-7 text-[#C5A059]" />
                <div>
                  <p className="text-lg font-medium text-[#0B1C14]">Available in Library</p>
                  <p className="text-base text-[#8B7355]">Read at your local cultural center</p>
                </div>
              </div>
              <ChevronRight className="h-7 w-7 text-[#C5A059]" />
            </div>
          </div>
        </section>

        {author && authorBooks.length > 0 && (
          <section data-library-section className="mt-10 border-t border-[#E8E0D4] pt-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="font-serif text-3xl text-[#2D4635]">More Books by {author.name}</h2>
                <p className="mt-1 text-base text-[#8B7355]">
                  {authorBooks.length} more {authorBooks.length === 1 ? "title" : "titles"} in our collection
                </p>
              </div>
              <Link
                to={`/library/writers/${author.id}`}
                className="inline-flex items-center gap-1.5 text-base text-[#8B7355]"
              >
                View writer
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-8">
              {authorBooks.map((relatedBook) => (
                <KioskBookCard key={relatedBook.id} book={relatedBook} />
              ))}
            </div>
          </section>
        )}

        <footer data-library-section className="mt-auto pt-8">
          <div className="flex items-center gap-4 rounded-2xl bg-[#E8E0D4]/60 px-8 py-6">
            <span className="text-3xl text-[#C5A059]">✦</span>
            <p className="flex-1 text-lg text-[#5C4A3A]">
              Step into the world of words. Explore the beauty of Kurdish literature.
            </p>
            <Link
              to="/library/books"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0B1C14] px-8 py-4 text-lg text-[#C5A059]"
            >
              Explore More Books →
            </Link>
          </div>
        </footer>
      </div>
    </DesignScaledCanvas>
  );
}
