import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Users } from "lucide-react";
import LibraryLogo from "@/components/Sections/library/LibraryLogo";
import LibraryPageShell from "@/components/Sections/library/LibraryPageShell";
import BookCard from "@/components/Sections/library/BookCard";
import CategoryCard from "@/components/Sections/library/CategoryCard";
import {
  libraryBody,
  libraryBodySmall,
  libraryDisplayTitle,
  libraryHeaderPad,
  libraryBackIconClassName,
  libraryIconSm,
  libraryNavText,
  libraryPad,
  librarySectionLabel,
  librarySectionTitle,
} from "@/components/Sections/library/libraryLayout";
import libraryHeroBg from "@/assets/images/library/l-1.webp";
import { getAllBooks, getBooksWithQuotes, getPopularBooks, LIBRARY_CATEGORIES } from "@/data/libraryBooks";
import { getWriterById } from "@/data/libraryWriters";
import { cn } from "@/lib/utils";
import { useLibraryPageAnimation } from "@/components/Sections/library/useLibraryPageAnimation";

export default function LibraryBooks() {
  const rootRef = useRef<HTMLElement>(null);
  const allBooks = getAllBooks();
  const popularBooks = getPopularBooks();
  const quotedBooks = getBooksWithQuotes();

  useLibraryPageAnimation(rootRef);

  return (
    <main ref={rootRef} className="min-h-screen overflow-x-hidden bg-[#FDFBF7] pb-6 lg:pb-8 3xl:pb-10">
      <header data-library-header className={cn(libraryHeaderPad, "flex items-center justify-between")}>
        <LibraryPageShell className="flex w-full items-center justify-between">
          <Link to="/library" className={cn(libraryNavText, "flex items-center gap-2")}>
            <ArrowLeft className={libraryBackIconClassName} />
            Back to Library
          </Link>
          <LibraryLogo variant="light" size="md" showTagline={false} />
          <Link
            to="/library/writers"
            className={cn(libraryNavText, "flex items-center gap-2 text-[#C5A059]")}
          >
            Writers
            <Users className={libraryIconSm} />
          </Link>
        </LibraryPageShell>
      </header>

      <section
        data-library-section
        className={cn("mx-5 sm:mx-8 lg:mx-12 3xl:mx-24", "overflow-hidden rounded-2xl lg:rounded-3xl")}
      >
        <LibraryPageShell>
          <div className="relative min-h-[280px] lg:min-h-[360px] xl:min-h-[420px] 3xl:min-h-[480px]">
            <img src={libraryHeroBg} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF7]/95 via-[#FDFBF7]/75 to-[#FDFBF7]/20" />
            <div
              className="absolute right-0 top-0 h-full w-2/5 opacity-15"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z' fill='%23C5A059'/%3E%3C/svg%3E")`,
                backgroundSize: "40px 40px",
              }}
            />

            <div
              data-library-hero-text
              className="relative z-10 px-6 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-16 3xl:px-16 3xl:py-20"
            >
              <p className={librarySectionLabel}>Kurdish Library</p>
              <h1 className={cn(libraryDisplayTitle, "mt-2 text-[#2D4635]")}>Explore Books</h1>
              <p className={cn(libraryBody, "mt-3 max-w-md lg:max-w-lg 3xl:max-w-xl")}>
                Timeless poetry, novels, and epics — the written heritage of Kurdistan.
              </p>
              <Link
                to="/library/writers"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#2D4635] px-6 py-3 text-sm text-white lg:px-8 lg:py-4 lg:text-lg 3xl:px-10 3xl:py-5 3xl:text-xl"
              >
                Meet the Writers
                <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5" />
              </Link>
            </div>
          </div>
        </LibraryPageShell>
      </section>

      {quotedBooks.length > 0 && (
        <section data-library-section className={cn("mt-8 lg:mt-12 3xl:mt-16", libraryPad)}>
          <LibraryPageShell>
            <h2 className={librarySectionTitle}>Passages from the Page</h2>
            <p className={libraryBodySmall}>Memorable lines from Kurdish literature</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:mt-8 lg:gap-6 3xl:mt-10">
              {quotedBooks.map((book) => {
                const author = getWriterById(book.authorId);
                return (
                  <Link
                    key={book.id}
                    to={`/library/books/${book.id}`}
                    data-library-item
                    className="rounded-2xl border border-[#E8E0D4] bg-[#FAF8F5] p-6 lg:rounded-3xl lg:p-8 3xl:p-10"
                  >
                    <span className="font-serif text-4xl text-[#C5A059]/40 lg:text-5xl">"</span>
                    {book.quoteEnglish && (
                      <p className="font-serif text-base italic leading-relaxed text-[#0B1C14] lg:text-lg 3xl:text-2xl">
                        {book.quoteEnglish}
                      </p>
                    )}
                    {book.quoteKurdish && (
                      <p className="mt-2 text-sm text-[#8B7355] lg:text-base 3xl:text-lg" dir="rtl">
                        {book.quoteKurdish}
                      </p>
                    )}
                    <div className="mt-5 flex items-center justify-between border-t border-[#E8E0D4]/60 pt-4">
                      <div>
                        <p className="font-serif text-sm text-[#2D4635] lg:text-base 3xl:text-xl">{book.title}</p>
                        <p className={libraryBodySmall}>{author?.name}</p>
                      </div>
                      <span className="text-xs uppercase tracking-wider text-[#C5A059] lg:text-sm">
                        Read →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </LibraryPageShell>
        </section>
      )}

      <section data-library-section className={cn("mt-8 lg:mt-12 3xl:mt-16", libraryPad)}>
        <LibraryPageShell>
          <h2 className={librarySectionTitle}>Browse by Category</h2>
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2 lg:mt-6 lg:gap-5 3xl:mt-8 3xl:gap-6">
            {LIBRARY_CATEGORIES.map((category) => (
              <div key={category.id} data-library-item>
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        </LibraryPageShell>
      </section>

      <section data-library-section className={cn("mt-8 lg:mt-12 3xl:mt-16", libraryPad)}>
        <LibraryPageShell>
          <div className="flex items-center justify-between">
            <div>
              <h2 className={librarySectionTitle}>Popular Books</h2>
              <p className={libraryBodySmall}>Most loved titles in our collection</p>
            </div>
          </div>
          <div className="mt-4 flex gap-4 overflow-x-auto pb-2 lg:mt-6 lg:gap-6 3xl:mt-8 3xl:gap-8">
            {popularBooks.map((book) => (
              <div key={book.id} data-library-item>
                <BookCard book={book} showRating />
              </div>
            ))}
          </div>
        </LibraryPageShell>
      </section>

      <section data-library-section className={cn("mt-8 lg:mt-12 3xl:mt-16", libraryPad)}>
        <LibraryPageShell>
          <h2 className={librarySectionTitle}>Full Collection</h2>
          <p className={libraryBodySmall}>{allBooks.length} books to discover</p>

          <div className="mt-6 overflow-hidden rounded-2xl border border-[#E8E0D4]/80 bg-[#FAF8F5]/50 lg:mt-8 3xl:mt-10">
            <div className="flex flex-wrap justify-center gap-6 px-5 py-6 sm:gap-8 sm:px-8 lg:gap-10 lg:px-8 3xl:gap-14 3xl:py-8">
              {allBooks.map((book) => (
                <div key={book.id} data-library-item className="shrink-0">
                  <BookCard book={book} variant="shelf" />
                </div>
              ))}
            </div>
            <div className="h-3 bg-gradient-to-b from-[#8B6914] to-[#6B4F10] shadow-[0_4px_8px_rgba(0,0,0,0.2)] lg:h-4 3xl:h-5" />
            <div className="h-1 bg-[#5C3D0A] lg:h-1.5" />
          </div>
        </LibraryPageShell>
      </section>
    </main>
  );
}
