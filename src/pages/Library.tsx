import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import LibraryLogo from "@/components/Sections/library/LibraryLogo";
import WriterCard from "@/components/Sections/library/WriterCard";
import BookCard from "@/components/Sections/library/BookCard";
import { getFeaturedWriters, getWriterById, HERO_BACKGROUND } from "@/data/libraryWriters";
import { getFeaturedBooks } from "@/data/libraryBooks";

export default function Library() {
  const featuredWriters = getFeaturedWriters().slice(0, 4);
  const featuredBooks = getFeaturedBooks();
  const heroWriter = getWriterById("farhad-pirbal");
  const [activeWriterIndex, setActiveWriterIndex] = useState(0);

  return (
    <main className="min-h-screen bg-[#F5F2ED]">
      {/* Header */}
      <header className="flex items-center gap-3 px-5 py-4 sm:px-8">
        <LibraryLogo variant="light" size="sm" showTagline={false} />
      </header>

      {/* Hero Section */}
      <section className="relative mx-4 overflow-hidden rounded-3xl sm:mx-8">
        <div className="relative flex min-h-[420px] flex-col sm:min-h-[480px] sm:flex-row">
          {/* Background */}
          <div className="absolute inset-0">
            <img
              src={HERO_BACKGROUND}
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#F5F2ED] via-[#F5F2ED]/80 to-transparent sm:via-[#F5F2ED]/60" />
          </div>

          {/* Text Content */}
          <div className="relative z-10 flex flex-1 flex-col justify-center px-6 py-10 sm:px-10 sm:py-14">
            <h1 className="font-serif text-3xl leading-tight text-[#0B1C14] sm:text-4xl lg:text-5xl">
              Our Writers.
              <br />
              Our Heritage.
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#5C4A3A] sm:text-base">
              Discover the stories and voices that shaped Kurdistan.
            </p>
            <Link
              to="/library/browse"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#0B1C14] px-6 py-3 text-sm text-[#C5A059] transition-colors hover:bg-[#1B3022]"
            >
              Explore Writers
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Portrait */}
          {heroWriter && (
            <div className="relative z-10 flex flex-1 items-end justify-center sm:justify-end">
              <img
                src={heroWriter.portrait}
                alt={heroWriter.name}
                className="h-72 w-auto object-cover object-top sm:h-96 lg:h-[420px]"
              />
              <div className="absolute bottom-6 right-6 text-right sm:bottom-10 sm:right-10">
                <p className="font-serif text-lg uppercase tracking-wider text-[#C5A059] sm:text-xl">
                  {heroWriter.name}
                </p>
                <p className="text-xs text-[#8B7355] sm:text-sm">
                  {heroWriter.roles.join(" • ")}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured Writers */}
      <section className="mt-10 px-5 sm:px-8">
        <h2 className="text-center text-[10px] uppercase tracking-[0.3em] text-[#8B7355]">
          Featured Writers
        </h2>

        <div className="relative mt-6">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {featuredWriters.map((writer, index) => (
              <div
                key={writer.id}
                onMouseEnter={() => setActiveWriterIndex(index)}
              >
                <WriterCard
                  writer={writer}
                  variant="featured"
                  active={index === activeWriterIndex}
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            className="absolute -right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#0B1C14] text-[#C5A059] shadow-lg"
            aria-label="Next writers"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Pagination dots */}
        <div className="mt-4 flex justify-center gap-2">
          {featuredWriters.map((_, index) => (
            <span
              key={index}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                index === activeWriterIndex ? "bg-[#C5A059]" : "bg-[#D4C4A8]"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Explore Books */}
      <section className="mt-12 px-5 pb-32 sm:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-[10px] uppercase tracking-[0.3em] text-[#8B7355]">
            Explore Books
          </h2>
          <Link
            to="/library/browse"
            className="text-xs text-[#8B7355] transition-colors hover:text-[#0B1C14]"
          >
            View all →
          </Link>
        </div>

        {/* Wooden shelf effect */}
        <div className="relative mt-6">
          <div className="flex justify-center gap-6 overflow-x-auto pb-8 sm:gap-10">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} variant="shelf" />
            ))}
          </div>
          <div className="absolute inset-x-0 bottom-0 h-3 rounded-sm bg-gradient-to-b from-[#8B6914] to-[#6B4F10] shadow-[0_4px_8px_rgba(0,0,0,0.2)]" />
          <div className="absolute inset-x-0 -bottom-1 h-1 rounded-sm bg-[#5C3D0A]" />
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="fixed inset-x-0 bottom-0 bg-[#0B1C14] px-6 py-5 text-center">
        <Link to="/library/browse" className="block">
          <LibraryLogo variant="gold" size="sm" showTagline={false} />
          <p className="mt-2 font-serif text-sm text-[#C5A059]/90">
            Touch to begin your journey
          </p>
          <p className="mt-1 text-[#C5A059]/50">👆</p>
        </Link>
      </footer>
    </main>
  );
}
