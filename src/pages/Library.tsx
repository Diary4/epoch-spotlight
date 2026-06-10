import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Quote } from "lucide-react";
import LibraryLogo from "@/components/Sections/library/LibraryLogo";
import LibraryPageShell from "@/components/Sections/library/LibraryPageShell";
import WriterCard from "@/components/Sections/library/WriterCard";
import BookCard from "@/components/Sections/library/BookCard";
import {
  libraryBody,
  libraryBodySmall,
  libraryBtn,
  libraryBtnOutline,
  libraryHeaderPad,
  libraryHeroTitle,
  libraryIconMd,
  libraryPad,
  librarySectionLabel,
  librarySectionTitle,
  libraryViewAll,
} from "@/components/Sections/library/libraryLayout";
import libraryHeroBg from "@/assets/images/library/l-1.webp";
import { getFeaturedWriters, getWritersWithQuotes } from "@/data/libraryWriters";
import { getFeaturedBooks } from "@/data/libraryBooks";
import { cn } from "@/lib/utils";
import { useLibraryPageAnimation } from "@/components/Sections/library/useLibraryPageAnimation";

export default function Library() {
  const rootRef = useRef<HTMLElement>(null);
  const featuredWriters = getFeaturedWriters().slice(0, 4);
  const featuredBooks = getFeaturedBooks();
  const spotlightQuote = getWritersWithQuotes()[0];

  useLibraryPageAnimation(rootRef);

  return (
    <main ref={rootRef} className="min-h-screen bg-[#F5F2ED]">
      <header
        data-library-header
        className={cn(libraryHeaderPad, "border-b border-[#E8E0D4]/60 bg-[#F5F2ED]/80 backdrop-blur-sm")}
      >
        <LibraryPageShell className="flex items-center justify-between">
          <LibraryLogo variant="light" size="md" showTagline={false} />
          <nav className="hidden items-center gap-6 sm:flex lg:gap-8">
            <Link to="/library/writers" className={libraryBodySmall}>
              Writers
            </Link>
            <Link to="/library/books" className={libraryBodySmall}>
              Books
            </Link>
          </nav>
        </LibraryPageShell>
      </header>

      {/* Hero */}
      <section
        data-library-section
        className="relative mx-4 mt-4 overflow-hidden rounded-3xl sm:mx-8 lg:mx-12 lg:mt-6 lg:rounded-[2rem] 3xl:mx-24 3xl:mt-8"
      >
        <div className="relative flex min-h-[400px] flex-col sm:min-h-[460px] lg:min-h-[520px] xl:min-h-[580px] 3xl:min-h-[660px]">
          <img src={libraryHeroBg} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F5F2ED] via-[#F5F2ED]/85 to-[#F5F2ED]/20" />
          <div
            className="pointer-events-none absolute right-0 top-0 h-full w-1/3 opacity-[0.07]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z' fill='%23C5A059'/%3E%3C/svg%3E")`,
              backgroundSize: "36px 36px",
            }}
          />

          <div
            data-library-hero-text
            className="relative z-10 flex flex-1 flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16 3xl:px-20 3xl:py-20"
          >
            <p className={librarySectionLabel}>Kurdish Library</p>
            <h1 className={cn(libraryHeroTitle, "mt-3")}>
              Our Writers.
              <br />
              <span className="text-[#2D4635]">Our Heritage.</span>
            </h1>
            <p className={cn(libraryBody, "mt-4 max-w-sm lg:max-w-lg 3xl:max-w-2xl")}>
              Discover the stories and voices that shaped Kurdistan — from timeless poetry to modern novels.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 lg:mt-8 lg:gap-4">
              <Link to="/library/writers" className={cn(libraryBtn, "w-fit")}>
                Explore Writers
                <ArrowRight className={libraryIconMd} />
              </Link>
              <Link to="/library/books" className={cn(libraryBtnOutline, "w-fit")}>
                Explore Books
                <ArrowRight className={libraryIconMd} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quote spotlight */}
      {spotlightQuote?.quote && (
        <section data-library-section className={cn("mt-8 lg:mt-10 3xl:mt-14", libraryPad)}>
          <LibraryPageShell>
            <Link
              to={`/library/writers/${spotlightQuote.id}`}
              className="flex items-center gap-5 rounded-2xl border border-[#E8E0D4] bg-[#FAF8F5] px-6 py-5 lg:gap-8 lg:rounded-3xl lg:px-10 lg:py-7 3xl:px-14 3xl:py-9"
            >
              <Quote className="h-8 w-8 shrink-0 text-[#C5A059]/50 lg:h-10 lg:w-10 3xl:h-12 3xl:w-12" />
              <div className="min-w-0 flex-1">
                <p className="font-serif text-base italic leading-relaxed text-[#0B1C14] lg:text-xl 3xl:text-2xl">
                  "{spotlightQuote.quote}"
                </p>
                <p className={cn(libraryBodySmall, "mt-2")}>— {spotlightQuote.name}</p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-[#C5A059] lg:h-5 lg:w-5" />
            </Link>
          </LibraryPageShell>
        </section>
      )}

      {/* Featured Writers */}
      <section data-library-section className={cn("mt-10 lg:mt-14 3xl:mt-20", libraryPad)}>
        <LibraryPageShell>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className={librarySectionTitle}>Featured Writers</h2>
              <p className={cn(libraryBodySmall, "mt-1")}>Poets and novelists who defined our letters</p>
            </div>
            <Link to="/library/writers" className={libraryViewAll}>
              View all
              <ArrowRight className="h-3 w-3 lg:h-4 lg:w-4" />
            </Link>
          </div>

          <div className="relative mt-6 lg:mt-8 3xl:mt-10">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#F5F2ED] to-transparent lg:w-12" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#F5F2ED] to-transparent lg:w-12" />
            <div className="flex justify-start gap-4 overflow-x-auto pb-2 scrollbar-hide sm:justify-center lg:gap-6 3xl:gap-8">
              {featuredWriters.map((writer) => (
                <div key={writer.id} data-library-item>
                  <WriterCard writer={writer} variant="featured" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-center lg:mt-8">
            <Link
              to="/library/writers"
              className={cn(libraryBtnOutline, "border-[#C5A059]/40 text-[#2D4635]")}
            >
              View All Writers
              <ArrowRight className={libraryIconMd} />
            </Link>
          </div>
        </LibraryPageShell>
      </section>

      {/* Explore Books */}
      <section
        data-library-section
        className={cn("mt-12 pb-10 lg:mt-16 lg:pb-14 3xl:mt-24 3xl:pb-20", libraryPad)}
      >
        <LibraryPageShell>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className={librarySectionTitle}>Explore Books</h2>
              <p className={cn(libraryBodySmall, "mt-1")}>Poetry, novels, and epics from our collection</p>
            </div>
            <Link to="/library/books" className={libraryViewAll}>
              View all
              <ArrowRight className="h-3 w-3 lg:h-4 lg:w-4" />
            </Link>
          </div>

          <div className="relative mt-6 rounded-2xl border border-[#E8E0D4]/80 bg-[#FAF8F5]/50 p-5 lg:mt-8 lg:rounded-3xl lg:p-8 3xl:mt-10 3xl:p-10">
            <div className="-mx-2 flex gap-6 overflow-x-auto px-2 pb-10 scrollbar-hide sm:gap-8 lg:mx-0 lg:justify-center lg:gap-12 3xl:gap-16">
              {featuredBooks.map((book) => (
                <div key={book.id} data-library-item className="shrink-0">
                  <BookCard book={book} variant="shelf" />
                </div>
              ))}
            </div>
            <div className="absolute inset-x-5 bottom-5 h-3 rounded-sm bg-gradient-to-b from-[#A67C1A] to-[#6B4F10] shadow-[0_4px_12px_rgba(0,0,0,0.15)] lg:inset-x-8 lg:bottom-8 lg:h-4 3xl:h-5" />
            <div className="absolute inset-x-5 -bottom-0.5 h-1 rounded-sm bg-[#5C3D0A] lg:inset-x-8 lg:-bottom-1 lg:h-1.5" />
          </div>

          <div className="mt-8 flex justify-center lg:mt-10">
            <Link to="/library/books" className={libraryBtn}>
              View All Books
              <ArrowRight className={libraryIconMd} />
            </Link>
          </div>
        </LibraryPageShell>
      </section>
    </main>
  );
}
