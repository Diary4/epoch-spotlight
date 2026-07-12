import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, Quote } from "lucide-react";
import DesignScaledCanvas from "@/components/DesignScaledCanvas";
import LibraryLogo from "@/components/Sections/library/LibraryLogo";
import { KioskQuoteCard, KioskWriterTile } from "@/components/Sections/library/kioskCards";
import libraryHeroBg from "@/assets/images/library/l-1.webp";
import { getAllWriters, getWritersWithQuotes } from "@/data/libraryWriters";
import { useLibraryPageAnimation } from "@/components/Sections/library/useLibraryPageAnimation";

export default function LibraryWriters() {
  const rootRef = useRef<HTMLDivElement>(null);
  const allWriters = getAllWriters();
  const quotedWriters = getWritersWithQuotes();

  useLibraryPageAnimation(rootRef);

  return (
    <DesignScaledCanvas fitViewport bgClassName="bg-[#F5F2ED]">
      <div ref={rootRef} className="flex min-h-[1920px] w-full flex-col bg-[#F5F2ED] px-12 pb-14">
        <header data-library-header className="flex items-center justify-between py-10">
          <Link to="/library" className="flex items-center gap-2 text-lg text-[#5C4A3A]">
            <ArrowLeft className="h-6 w-6" />
            Back to Library
          </Link>
          <LibraryLogo variant="light" size="md" showTagline={false} />
          <Link
            to="/library/books"
            className="flex items-center gap-2 text-lg text-[#C5A059]"
          >
            Books
            <BookOpen className="h-6 w-6" />
          </Link>
        </header>

        <section
          data-library-section
          className="relative mt-2 h-[520px] overflow-hidden rounded-[2rem]"
        >
          <img src={libraryHeroBg} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1C14]/90 via-[#0B1C14]/70 to-[#0B1C14]/30" />

          <div
            data-library-hero-text
            className="relative z-10 flex h-full flex-col justify-center px-14"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-[#C5A059]">Kurdish Literature</p>
            <h1 className="mt-4 font-serif text-6xl text-[#F5F2ED]">Our Writers</h1>
            <p className="mt-5 max-w-xl text-xl leading-relaxed text-[#F5F2ED]/80">
              Poets, novelists, and thinkers whose words carried Kurdish culture across generations.
            </p>
          </div>
        </section>

        <section data-library-section className="mt-14">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-serif text-3xl text-[#2D4635]">All Writers</h2>
              <p className="mt-1 text-base text-[#8B7355]">
                {allWriters.length} voices in our collection
              </p>
            </div>
            <Link to="/library/books" className="flex items-center gap-1.5 text-base text-[#8B7355]">
              Explore Books
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 flex justify-between gap-6">
            {allWriters.map((writer) => (
              <KioskWriterTile key={writer.id} writer={writer} />
            ))}
          </div>
        </section>

        <section data-library-section className="mt-14">
          <div className="flex items-center gap-3">
            <Quote className="h-7 w-7 text-[#C5A059]" />
            <div>
              <h2 className="font-serif text-3xl text-[#2D4635]">Words That Endure</h2>
              <p className="mt-1 text-base text-[#8B7355]">Famous quotes from Kurdish literary voices</p>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-10">
            {quotedWriters.slice(0, 2).map((writer) => (
              <KioskQuoteCard key={writer.id} writer={writer} variant="light" />
            ))}
          </div>
        </section>
      </div>
    </DesignScaledCanvas>
  );
}
