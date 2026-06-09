import { useLayoutEffect, useRef } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Headphones,
  Calendar,
  Globe,
  Clock,
  ChevronRight,
} from "lucide-react";
import LibraryLogo from "@/components/Sections/library/LibraryLogo";
import LibraryPageShell from "@/components/Sections/library/LibraryPageShell";
import LibrarySidebar from "@/components/Sections/library/LibrarySidebar";
import BookCard from "@/components/Sections/library/BookCard";
import {
  libraryBody,
  libraryBodySmall,
  libraryBtnPrimary,
  libraryDisplayTitle,
  libraryIconSm,
  libraryNavText,
  libraryPad,
  librarySectionTitle,
} from "@/components/Sections/library/libraryLayout";
import { getBookById, getBooksByAuthor } from "@/data/libraryBooks";
import { getWriterById } from "@/data/libraryWriters";
import { FREE_PREVIEW_PAGES } from "@/lib/libraryPreview";
import { cn } from "@/lib/utils";
import { useLibraryPageAnimation } from "@/components/Sections/library/useLibraryPageAnimation";

const quickActions = [
  { icon: Headphones, title: "Listen to Audio", subtitle: "Narrated in Kurdish" },
];

export default function LibraryBookDetail() {
  const { bookId } = useParams();
  const book = bookId ? getBookById(bookId) : undefined;
  const rootRef = useRef<HTMLElement>(null);

  useLibraryPageAnimation(rootRef, [bookId]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [bookId]);

  if (!book) {
    return <Navigate to="/library" replace />;
  }

  const author = getWriterById(book.authorId);
  const relatedBooks = getBooksByAuthor(book.authorId).filter((b) => b.id !== book.id);

  return (
    <div className="flex min-h-screen bg-[#F5F1E6]">
      <LibrarySidebar />

      <main ref={rootRef} className="flex-1 overflow-x-hidden">
        <header
          data-library-header
          className={cn("flex items-center justify-between border-b border-[#E8E0D4]", libraryPad, "py-4 lg:py-6 3xl:py-8")}
        >
          <Link to="/library" className={cn(libraryNavText, "flex items-center gap-2")}>
            <ArrowLeft className={libraryIconSm} />
            Back
          </Link>
          <LibraryLogo variant="light" size="md" />
          <div className={cn(libraryNavText, "invisible flex items-center gap-2")} aria-hidden>
            <ArrowLeft className={libraryIconSm} />
            Back
          </div>
        </header>

        <section data-library-section className={cn("py-8 lg:py-12 3xl:py-16", libraryPad)}>
          <LibraryPageShell>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12 3xl:gap-16">
              <div data-library-hero-image className="mx-auto shrink-0 lg:mx-0">
                <div className="relative h-72 w-48 overflow-hidden rounded-lg shadow-[8px_8px_24px_rgba(11,28,20,0.2)] sm:h-80 sm:w-56 lg:h-96 lg:w-64 xl:h-[28rem] xl:w-72 3xl:h-[32rem] 3xl:w-80">
                  <img src={book.cover} alt={book.title} className="h-full w-full object-cover" />
                </div>
              </div>

              <div data-library-hero-text className="flex-1">
                <span className="inline-block rounded-full bg-[#0B1C14] px-3 py-1 text-[10px] uppercase tracking-wider text-white lg:text-xs 3xl:px-4 3xl:py-1.5 3xl:text-sm">
                  {book.genre}
                </span>
                <h1 className={cn(libraryDisplayTitle, "mt-3")}>{book.title}</h1>
                {author && (
                  <Link
                    to={`/library/writers/${author.id}`}
                    className="mt-1 inline-block text-base text-[#B0926A] lg:text-lg 3xl:text-2xl"
                  >
                    {author.name}
                  </Link>
                )}

                <div className={cn(libraryBody, "mt-5 flex flex-wrap gap-5 lg:gap-8")}>
                  <span className="flex items-center gap-1.5">
                    <Calendar className={libraryIconSm + " text-[#C5A059]"} />
                    Year {book.year}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Globe className={libraryIconSm + " text-[#C5A059]"} />
                    Language {book.language}
                  </span>
                  {book.readingTime && (
                    <span className="flex items-center gap-1.5">
                      <Clock className={libraryIconSm + " text-[#C5A059]"} />
                      Reading Time {book.readingTime}
                    </span>
                  )}
                </div>

                <p className={cn(libraryBody, "mt-5 max-w-xl lg:max-w-2xl 3xl:max-w-3xl")}>
                  {book.description}
                </p>

                <p className={cn(libraryBodySmall, "mt-4")}>
                  Free preview: first {FREE_PREVIEW_PAGES} pages · Full book available for purchase
                </p>

                <div className="mt-4 flex flex-wrap gap-3 lg:mt-6 lg:gap-4">
                  <Link to={`/library/books/${bookId}/read`} className={libraryBtnPrimary}>
                    <BookOpen className={libraryIconSm} />
                    Read Sample
                  </Link>
                </div>
              </div>
            </div>
          </LibraryPageShell>
        </section>

        <section data-library-section className={libraryPad}>
          <LibraryPageShell className="grid gap-3 sm:max-w-md lg:gap-4">
            {quickActions.map((action) => (
              <button
                key={action.title}
                type="button"
                data-library-item
                className="flex flex-col items-start rounded-xl border border-[#E8E0D4] bg-[#FAF8F5] px-4 py-4 text-left lg:px-6 lg:py-6 3xl:px-8 3xl:py-8"
              >
                <action.icon className="h-5 w-5 text-[#C5A059] lg:h-6 lg:w-6 3xl:h-8 3xl:w-8" />
                <p className="mt-2 text-sm font-medium text-[#0B1C14] lg:text-base 3xl:text-xl">{action.title}</p>
                <p className={libraryBodySmall}>{action.subtitle}</p>
              </button>
            ))}
          </LibraryPageShell>
        </section>

        <section data-library-section className={cn("mt-8 3xl:mt-12", libraryPad)}>
          <LibraryPageShell className="grid gap-6 lg:grid-cols-2 lg:gap-8 3xl:gap-12">
            <div className="rounded-2xl border border-[#E8E0D4] bg-[#FAF8F5] p-6 lg:p-8 3xl:p-10">
              <h2 className={librarySectionTitle}>About the Book</h2>
              <p className={cn(libraryBody, "mt-4")}>{book.aboutText ?? book.description}</p>
            </div>

            <div className="rounded-2xl border border-[#E8E0D4] bg-[#FAF8F5] p-6 lg:p-8 3xl:p-10">
              <h2 className={librarySectionTitle}>Book Details</h2>
              <dl className={cn(libraryBody, "mt-4 space-y-3 lg:space-y-4")}>
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

              <div className="mt-6 flex items-center justify-between rounded-xl bg-[#E8E0D4]/50 px-4 py-3 lg:px-6 lg:py-4 3xl:px-8 3xl:py-5">
                <div className="flex items-center gap-3 lg:gap-4">
                  <BookOpen className="h-5 w-5 text-[#C5A059] lg:h-6 lg:w-6 3xl:h-8 3xl:w-8" />
                  <div>
                    <p className="text-sm font-medium text-[#0B1C14] lg:text-base 3xl:text-xl">Available in Library</p>
                    <p className={libraryBodySmall}>Read at your local cultural center</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-[#C5A059] lg:h-6 lg:w-6 3xl:h-8 3xl:w-8" />
              </div>
            </div>
          </LibraryPageShell>
        </section>

        {relatedBooks.length > 0 && author && (
          <section
            data-library-section
            className={cn("mt-10 border-t border-[#E8E0D4] py-8 lg:py-12 3xl:mt-14 3xl:py-16", libraryPad)}
          >
            <LibraryPageShell>
              <div className="flex items-center justify-between">
                <h2 className={librarySectionTitle}>More Books by {author.name}</h2>
                <button type="button" className={libraryBodySmall}>
                  View all →
                </button>
              </div>
              <div className="mt-4 flex gap-4 overflow-x-auto pb-2 lg:mt-6 lg:gap-6 3xl:mt-8 3xl:gap-8">
                {relatedBooks.map((relatedBook) => (
                  <div key={relatedBook.id} data-library-item>
                    <BookCard book={relatedBook} variant="compact" />
                  </div>
                ))}
              </div>
            </LibraryPageShell>
          </section>
        )}

        <footer data-library-section className={cn("mb-8 mt-6 lg:mb-12 3xl:mb-16", libraryPad)}>
          <LibraryPageShell className="flex items-center gap-4 rounded-2xl bg-[#E8E0D4]/60 px-6 py-5 lg:px-8 lg:py-7 3xl:px-12 3xl:py-10">
            <span className="text-2xl text-[#C5A059] lg:text-3xl 3xl:text-4xl">✦</span>
            <p className={cn(libraryBody, "flex-1")}>
              Step into the world of words. Explore the beauty of Kurdish literature.
            </p>
            <Link to="/library/browse" className={libraryBtnPrimary + " shrink-0 !rounded-full text-[#C5A059] !bg-[#0B1C14]"}>
              Explore More Books →
            </Link>
          </LibraryPageShell>
        </footer>
      </main>
    </div>
  );
}
