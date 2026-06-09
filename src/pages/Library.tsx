import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import LibraryLogo from "@/components/Sections/library/LibraryLogo";
import LibraryPageShell from "@/components/Sections/library/LibraryPageShell";
import WriterCard from "@/components/Sections/library/WriterCard";
import BookCard from "@/components/Sections/library/BookCard";
import {
  libraryBody,
  libraryBtn,
  libraryHeaderPad,
  libraryHeroTitle,
  libraryIconMd,
  libraryPad,
  librarySectionLabel,
} from "@/components/Sections/library/libraryLayout";
import libraryHeroBg from "@/assets/images/library/l-1.webp";
import { getFeaturedWriters } from "@/data/libraryWriters";
import { getFeaturedBooks } from "@/data/libraryBooks";
import { cn } from "@/lib/utils";
import { useLibraryPageAnimation } from "@/components/Sections/library/useLibraryPageAnimation";

export default function Library() {
  const rootRef = useRef<HTMLElement>(null);
  const featuredWriters = getFeaturedWriters().slice(0, 4);
  const featuredBooks = getFeaturedBooks();

  useLibraryPageAnimation(rootRef);

  return (
    <main ref={rootRef} className="min-h-screen bg-[#F5F2ED]">
      <header data-library-header className={libraryHeaderPad}>
        <LibraryPageShell>
          <LibraryLogo variant="light" size="md" showTagline={false} />
        </LibraryPageShell>
      </header>

      {/* Hero Section */}
      <section
        data-library-section
        className="relative mx-4 overflow-hidden rounded-3xl sm:mx-8 lg:mx-12 lg:rounded-[2rem] 3xl:mx-24"
      >
        <div className="relative flex min-h-[420px] flex-col sm:min-h-[480px] sm:flex-row lg:min-h-[560px] xl:min-h-[640px] 3xl:min-h-[720px]">
          <div className="absolute inset-0">
            <img src={libraryHeroBg} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#F5F2ED] via-[#F5F2ED]/80 to-transparent sm:via-[#F5F2ED]/60" />
          </div>

          <div
            data-library-hero-text
            className="relative z-10 flex flex-1 flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16 3xl:px-20 3xl:py-20"
          >
            <h1 className={libraryHeroTitle}>
              Our Writers.
              <br />
              Our Heritage.
            </h1>
            <p className={cn(libraryBody, "mt-4 max-w-sm lg:max-w-lg 3xl:max-w-2xl")}>
              Discover the stories and voices that shaped Kurdistan.
            </p>
            <Link to="/library/browse" className={cn(libraryBtn, "mt-6 w-fit")}>
              Explore Writers
              <ArrowRight className={libraryIconMd} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Writers */}
      <section data-library-section className={cn("mt-10 lg:mt-14 3xl:mt-20", libraryPad)}>
        <LibraryPageShell>
          <h2 className={cn(librarySectionLabel, "text-center")}>Featured Writers</h2>

          <div className="relative mt-6 lg:mt-8 3xl:mt-10">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide lg:gap-6 3xl:gap-8">
              {featuredWriters.map((writer) => (
                <div key={writer.id} data-library-item>
                  <WriterCard writer={writer} variant="featured" />
                </div>
              ))}
            </div>

            <button
              type="button"
              className="absolute -right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#0B1C14] text-[#C5A059] shadow-lg lg:h-12 lg:w-12 3xl:h-16 3xl:w-16"
              aria-label="Next writers"
            >
              <ChevronRight className="h-5 w-5 lg:h-6 lg:w-6 3xl:h-8 3xl:w-8" />
            </button>
          </div>
        </LibraryPageShell>
      </section>

      {/* Explore Books */}
      <section
        data-library-section
        className={cn("mt-12 pb-8 lg:mt-16 lg:pb-12 3xl:mt-24 3xl:pb-16", libraryPad)}
      >
        <LibraryPageShell>
          <div className="flex items-center justify-between">
            <h2 className={librarySectionLabel}>Explore Books</h2>
            <Link
              to="/library/browse"
              className="text-xs text-[#8B7355] lg:text-sm 3xl:text-lg"
            >
              View all →
            </Link>
          </div>

          <div className="relative mt-6 lg:mt-8 3xl:mt-10">
            <div className="flex justify-center gap-6 overflow-x-auto pb-8 sm:gap-10 lg:gap-14 3xl:gap-20">
              {featuredBooks.map((book) => (
                <div key={book.id} data-library-item>
                  <BookCard book={book} variant="shelf" />
                </div>
              ))}
            </div>
            <div className="absolute inset-x-0 bottom-0 h-3 rounded-sm bg-gradient-to-b from-[#8B6914] to-[#6B4F10] shadow-[0_4px_8px_rgba(0,0,0,0.2)] lg:h-4 3xl:h-5" />
            <div className="absolute inset-x-0 -bottom-1 h-1 rounded-sm bg-[#5C3D0A] lg:h-1.5" />
          </div>
        </LibraryPageShell>
      </section>
    </main>
  );
}
