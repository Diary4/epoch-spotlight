import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Quote } from "lucide-react";
import DesignScaledCanvas from "@/components/DesignScaledCanvas";
import LibraryLogo from "@/components/Sections/library/LibraryLogo";
import { KioskShelfBook, KioskWriterTile } from "@/components/Sections/library/kioskCards";
import libraryHeroBg from "@/assets/images/library/l-1.webp";
import { getFeaturedWriters, getWritersWithQuotes } from "@/data/libraryWriters";
import { getFeaturedBooks } from "@/data/libraryBooks";
import { useLibraryPageAnimation } from "@/components/Sections/library/useLibraryPageAnimation";

const STAR_PATTERN =
  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z' fill='%23C5A059'/%3E%3C/svg%3E\")";

export default function Library() {
  const rootRef = useRef<HTMLDivElement>(null);
  const featuredWriters = getFeaturedWriters().slice(0, 4);
  const featuredBooks = getFeaturedBooks();
  const spotlightQuote = getWritersWithQuotes()[0];

  useLibraryPageAnimation(rootRef);

  return (
    <DesignScaledCanvas fitViewport bgClassName="bg-[#F5F2ED]">
      <div ref={rootRef} className="flex min-h-[1920px] w-full flex-col bg-[#F5F2ED] px-12 pb-14">
        <header data-library-header className="flex items-center justify-between py-10">
          <LibraryLogo variant="light" size="md" showTagline={false} />
          <nav className="flex items-center gap-8">
            <Link to="/library/writers" className="text-lg text-[#5C4A3A]">
              Writers
            </Link>
            <Link to="/library/books" className="text-lg text-[#5C4A3A]">
              Books
            </Link>
          </nav>
        </header>

        <section
          data-library-section
          className="relative mt-2 h-[480px] overflow-hidden rounded-[2rem]"
        >
          <img src={libraryHeroBg} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F5F2ED] via-[#F5F2ED]/85 to-[#F5F2ED]/20" />
          <div
            className="pointer-events-none absolute right-0 top-0 h-full w-1/3 opacity-[0.07]"
            style={{ backgroundImage: STAR_PATTERN, backgroundSize: "36px 36px" }}
          />

          <div
            data-library-hero-text
            className="relative z-10 flex h-full flex-col justify-center px-14"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-[#8B7355]">Kurdish Library</p>
            <h1 className="mt-4 font-serif text-6xl text-[#0B1C14]">
              Our Writers.
              <br />
              <span className="text-[#2D4635]">Our Heritage.</span>
            </h1>
            <p className="mt-5 max-w-xl text-xl leading-relaxed text-[#5C4A3A]">
              Discover the stories and voices that shaped Kurdistan — from timeless poetry to modern novels.
            </p>
            <div className="mt-8 flex gap-4">
              <Link
                to="/library/writers"
                className="inline-flex items-center gap-2 rounded-full bg-[#2D4635] px-8 py-4 text-lg text-white"
              >
                Explore Writers
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/library/books"
                className="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/50 bg-transparent px-8 py-4 text-lg text-[#2D4635]"
              >
                Explore Books
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {spotlightQuote?.quote && (
          <section data-library-section className="mt-10">
            <Link
              to={`/library/writers/${spotlightQuote.id}`}
              data-library-item
              className="flex items-center gap-6 rounded-3xl border border-[#E8E0D4] bg-[#FAF8F5] px-10 py-7"
            >
              <Quote className="h-10 w-10 shrink-0 text-[#C5A059]/50" />
              <div className="min-w-0 flex-1">
                <p className="font-serif text-xl italic leading-relaxed text-[#0B1C14]">
                  "{spotlightQuote.quote}"
                </p>
                <p className="mt-2 text-base text-[#8B7355]">— {spotlightQuote.name}</p>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-[#C5A059]" />
            </Link>
          </section>
        )}

        <section data-library-section className="mt-14">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-serif text-3xl text-[#2D4635]">Featured Writers</h2>
              <p className="mt-1 text-base text-[#8B7355]">Poets and novelists who defined our letters</p>
            </div>
            <Link to="/library/writers" className="flex items-center gap-1.5 text-base text-[#8B7355]">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 flex justify-between gap-6">
            {featuredWriters.map((writer) => (
              <KioskWriterTile key={writer.id} writer={writer} />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              to="/library/writers"
              className="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/40 px-8 py-4 text-lg text-[#2D4635]"
            >
              View All Writers
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>

        <section data-library-section className="mt-14">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-serif text-3xl text-[#2D4635]">Explore Books</h2>
              <p className="mt-1 text-base text-[#8B7355]">Poetry, novels, and epics from our collection</p>
            </div>
            <Link to="/library/books" className="flex items-center gap-1.5 text-base text-[#8B7355]">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-[#E8E0D4]/80 bg-[#FAF8F5]/50">
            <div className="flex justify-center gap-10 px-8 py-8">
              {featuredBooks.map((book) => (
                <KioskShelfBook key={book.id} book={book} />
              ))}
            </div>
            <div className="h-4 bg-gradient-to-b from-[#A67C1A] to-[#6B4F10] shadow-[0_4px_12px_rgba(0,0,0,0.15)]" />
            <div className="h-1.5 bg-[#5C3D0A]" />
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              to="/library/books"
              className="inline-flex items-center gap-2 rounded-full bg-[#2D4635] px-8 py-4 text-lg text-white"
            >
              View All Books
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </div>
    </DesignScaledCanvas>
  );
}
