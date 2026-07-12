import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Users } from "lucide-react";
import DesignScaledCanvas from "@/components/DesignScaledCanvas";
import LibraryLogo from "@/components/Sections/library/LibraryLogo";
import {
  KioskBookCard,
  KioskCategoryCard,
  KioskShelfBook,
} from "@/components/Sections/library/kioskCards";
import libraryHeroBg from "@/assets/images/library/l-1.webp";
import { getAllBooks, getBooksWithQuotes, getPopularBooks, LIBRARY_CATEGORIES } from "@/data/libraryBooks";
import { getWriterById } from "@/data/libraryWriters";
import { useLibraryPageAnimation } from "@/components/Sections/library/useLibraryPageAnimation";

const STAR_PATTERN =
  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z' fill='%23C5A059'/%3E%3C/svg%3E\")";

export default function LibraryBooks() {
  const rootRef = useRef<HTMLDivElement>(null);
  const allBooks = getAllBooks();
  const popularBooks = getPopularBooks();
  const quotedBooks = getBooksWithQuotes();

  useLibraryPageAnimation(rootRef);

  return (
    <DesignScaledCanvas fitViewport bgClassName="bg-[#FDFBF7]">
      <div ref={rootRef} className="flex min-h-[1920px] w-full flex-col bg-[#FDFBF7] px-12 pb-12">
        <header data-library-header className="flex items-center justify-between py-8">
          <Link to="/library" className="flex items-center gap-2 text-lg text-[#5C4A3A]">
            <ArrowLeft className="h-6 w-6" />
            Back to Library
          </Link>
          <LibraryLogo variant="light" size="md" showTagline={false} />
          <Link to="/library/writers" className="flex items-center gap-2 text-lg text-[#C5A059]">
            Writers
            <Users className="h-6 w-6" />
          </Link>
        </header>

        <section
          data-library-section
          className="relative mt-2 h-[420px] overflow-hidden rounded-3xl"
        >
          <img src={libraryHeroBg} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF7]/95 via-[#FDFBF7]/75 to-[#FDFBF7]/20" />
          <div
            className="absolute right-0 top-0 h-full w-2/5 opacity-15"
            style={{ backgroundImage: STAR_PATTERN, backgroundSize: "40px 40px" }}
          />

          <div data-library-hero-text className="relative z-10 flex h-full flex-col justify-center px-14">
            <p className="text-sm uppercase tracking-[0.3em] text-[#8B7355]">Kurdish Library</p>
            <h1 className="mt-2 font-serif text-6xl text-[#2D4635]">Explore Books</h1>
            <p className="mt-4 max-w-lg text-xl leading-relaxed text-[#5C4A3A]">
              Timeless poetry, novels, and epics — the written heritage of Kurdistan.
            </p>
            <Link
              to="/library/writers"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#2D4635] px-8 py-4 text-lg text-white"
            >
              Meet the Writers
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>

        {quotedBooks.length > 0 && (
          <section data-library-section className="mt-10">
            <h2 className="font-serif text-3xl text-[#2D4635]">Passages from the Page</h2>
            <p className="mt-1 text-base text-[#8B7355]">Memorable lines from Kurdish literature</p>

            <div className="mt-6 grid grid-cols-2 gap-6">
              {quotedBooks.map((book) => {
                const author = getWriterById(book.authorId);
                return (
                  <Link
                    key={book.id}
                    to={`/library/books/${book.id}`}
                    data-library-item
                    className="rounded-3xl border border-[#E8E0D4] bg-[#FAF8F5] p-8"
                  >
                    <span className="font-serif text-5xl text-[#C5A059]/40">&ldquo;</span>
                    {book.quoteEnglish && (
                      <p className="font-serif text-lg italic leading-relaxed text-[#0B1C14]">
                        {book.quoteEnglish}
                      </p>
                    )}
                    {book.quoteKurdish && (
                      <p className="mt-2 text-base text-[#8B7355]" dir="rtl">
                        {book.quoteKurdish}
                      </p>
                    )}
                    <div className="mt-5 flex items-center justify-between border-t border-[#E8E0D4]/60 pt-4">
                      <div>
                        <p className="font-serif text-base text-[#2D4635]">{book.title}</p>
                        <p className="text-base text-[#8B7355]">{author?.name}</p>
                      </div>
                      <span className="text-sm uppercase tracking-wider text-[#C5A059]">Read →</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <section data-library-section className="mt-10">
          <h2 className="font-serif text-3xl text-[#2D4635]">Browse by Category</h2>
          <div className="mt-6 flex justify-between gap-4">
            {LIBRARY_CATEGORIES.map((category) => (
              <div key={category.id} data-library-item>
                <KioskCategoryCard category={category} />
              </div>
            ))}
          </div>
        </section>

        <section data-library-section className="mt-10">
          <h2 className="font-serif text-3xl text-[#2D4635]">Popular Books</h2>
          <p className="mt-1 text-base text-[#8B7355]">Most loved titles in our collection</p>
          <div className="mt-6 flex gap-10">
            {popularBooks.map((book) => (
              <KioskBookCard key={book.id} book={book} />
            ))}
          </div>
        </section>

        <section data-library-section className="mt-10">
          <h2 className="font-serif text-3xl text-[#2D4635]">Full Collection</h2>
          <p className="mt-1 text-base text-[#8B7355]">{allBooks.length} books to discover</p>

          <div className="mt-6 overflow-hidden rounded-2xl border border-[#E8E0D4]/80 bg-[#FAF8F5]/50">
            <div className="flex flex-wrap justify-center gap-14 px-8 py-8">
              {allBooks.map((book) => (
                <div key={book.id} data-library-item className="shrink-0">
                  <KioskShelfBook book={book} />
                </div>
              ))}
            </div>
            <div className="h-4 bg-gradient-to-b from-[#8B6914] to-[#6B4F10] shadow-[0_4px_8px_rgba(0,0,0,0.2)]" />
            <div className="h-1.5 bg-[#5C3D0A]" />
          </div>
        </section>
      </div>
    </DesignScaledCanvas>
  );
}
