import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import LibraryLogo from "@/components/Sections/library/LibraryLogo";
import LibraryPageShell from "@/components/Sections/library/LibraryPageShell";
import WriterCard from "@/components/Sections/library/WriterCard";
import BookCard from "@/components/Sections/library/BookCard";
import CategoryCard from "@/components/Sections/library/CategoryCard";
import {
  libraryBody,
  libraryBodySmall,
  libraryDisplayTitle,
  libraryHeaderPad,
  libraryIconMd,
  libraryPad,
  librarySectionTitle,
} from "@/components/Sections/library/libraryLayout";
import libraryHeroBg from "@/assets/images/library/l-1.webp";
import { getFeaturedWriters } from "@/data/libraryWriters";
import { getPopularBooks, LIBRARY_CATEGORIES } from "@/data/libraryBooks";
import { cn } from "@/lib/utils";
import { useLibraryPageAnimation } from "@/components/Sections/library/useLibraryPageAnimation";

const heroSlides = [
  {
    title: "Stories that shape our identity",
    subtitle: "Explore timeless books from Kurdish writers and thinkers.",
    cta: "Explore Books",
    image: libraryHeroBg,
  },
  {
    title: "Voices of a nation",
    subtitle: "Discover poets, novelists, and thinkers who defined Kurdish literature.",
    cta: "Meet the Writers",
    image: libraryHeroBg,
  },
  {
    title: "Our Writers. Our Heritage.",
    subtitle: "A living library of Kurdish culture and letters.",
    cta: "Begin Reading",
    image: libraryHeroBg,
  },
];

export default function LibraryBrowse() {
  const rootRef = useRef<HTMLElement>(null);
  const featuredWriters = getFeaturedWriters();
  const popularBooks = getPopularBooks();
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = heroSlides[activeSlide];

  useLibraryPageAnimation(rootRef);

  return (
    <main ref={rootRef} className="min-h-screen bg-[#FDFBF7] pb-8 lg:pb-12 3xl:pb-16">
      <header data-library-header className={cn(libraryHeaderPad, "flex items-center justify-between")}>
        <LibraryPageShell className="flex w-full items-center justify-between">
          <div className="flex items-center gap-3 lg:gap-5 3xl:gap-8">
            <LibraryLogo variant="light" size="md" showTagline={false} />
            <div>
              <h1 className={cn(librarySectionTitle, "text-[#2D4635]")}>Kurdish Writers</h1>
              <p className={libraryBodySmall}>Discover the beauty of Kurdish literature</p>
            </div>
          </div>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E0D4] text-[#2D4635] lg:h-12 lg:w-12 3xl:h-16 3xl:w-16"
            aria-label="Search"
          >
            <Search className={libraryIconMd} />
          </button>
        </LibraryPageShell>
      </header>

      <section
        data-library-section
        className={cn("mx-5 sm:mx-8 lg:mx-12 3xl:mx-24", "overflow-hidden rounded-2xl lg:rounded-3xl")}
      >
        <LibraryPageShell>
          <div className="relative min-h-[200px] lg:min-h-[280px] xl:min-h-[340px] 3xl:min-h-[400px]">
            <img src={slide.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF7]/95 via-[#FDFBF7]/70 to-[#FDFBF7]/30" />
            <div
              className="absolute right-0 top-0 h-full w-1/3 opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z' fill='%23C5A059'/%3E%3C/svg%3E")`,
                backgroundSize: "40px 40px",
              }}
            />

            <div
              data-library-hero-text
              className="relative z-10 px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14 3xl:px-16 3xl:py-16"
            >
              <h2 className={libraryDisplayTitle}>{slide.title}</h2>
              <p className={cn(libraryBody, "mt-2 max-w-xs lg:max-w-lg 3xl:max-w-2xl")}>{slide.subtitle}</p>
              <Link
                to="/library"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#2D4635] px-5 py-2.5 text-sm text-white sm:text-base lg:px-8 lg:py-4 lg:text-lg 3xl:px-10 3xl:py-5 3xl:text-xl"
              >
                {slide.cta}
                <ArrowRight className={libraryIconMd} />
              </Link>

              <div className="mt-6 flex gap-2 lg:mt-8 lg:gap-3">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    className={cn(
                      "h-2 w-2 rounded-full transition-colors lg:h-2.5 lg:w-2.5 3xl:h-3 3xl:w-3",
                      index === activeSlide ? "bg-[#2D4635]" : "bg-[#D4C4A8]",
                    )}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </LibraryPageShell>
      </section>

      <section data-library-section className={cn("mt-8 lg:mt-12 3xl:mt-16", libraryPad)}>
        <LibraryPageShell>
          <div className="flex items-center justify-between">
            <h2 className={librarySectionTitle}>Browse by Category</h2>
            <button type="button" className={libraryBodySmall}>
              View all &gt;
            </button>
          </div>
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
            <h2 className={librarySectionTitle}>Featured Writers</h2>
            <Link to="/library" className={libraryBodySmall}>
              View all &gt;
            </Link>
          </div>
          <div className="mt-4 flex gap-4 overflow-x-auto pb-2 lg:mt-6 lg:gap-6 3xl:mt-8 3xl:gap-8">
            {featuredWriters.map((writer) => (
              <div key={writer.id} data-library-item>
                <WriterCard writer={writer} variant="browse" />
              </div>
            ))}
          </div>
        </LibraryPageShell>
      </section>

      <section data-library-section className={cn("mt-8 lg:mt-12 3xl:mt-16", libraryPad)}>
        <LibraryPageShell>
          <div className="flex items-center justify-between">
            <h2 className={librarySectionTitle}>Popular Books</h2>
            <button type="button" className={libraryBodySmall}>
              View all &gt;
            </button>
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
    </main>
  );
}
