import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import LibraryLogo from "@/components/Sections/library/LibraryLogo";
import WriterCard from "@/components/Sections/library/WriterCard";
import BookCard from "@/components/Sections/library/BookCard";
import CategoryCard from "@/components/Sections/library/CategoryCard";
import { getFeaturedWriters, HERO_BACKGROUND } from "@/data/libraryWriters";
import { getPopularBooks, LIBRARY_CATEGORIES } from "@/data/libraryBooks";

const heroSlides = [
  {
    title: "Stories that shape our identity",
    subtitle: "Explore timeless books from Kurdish writers and thinkers.",
    cta: "Explore Books",
    image: HERO_BACKGROUND,
  },
  {
    title: "Voices of a nation",
    subtitle: "Discover poets, novelists, and thinkers who defined Kurdish literature.",
    cta: "Meet the Writers",
    image: HERO_BACKGROUND,
  },
  {
    title: "Our Writers. Our Heritage.",
    subtitle: "A living library of Kurdish culture and letters.",
    cta: "Begin Reading",
    image: HERO_BACKGROUND,
  },
];

export default function LibraryBrowse() {
  const featuredWriters = getFeaturedWriters();
  const popularBooks = getPopularBooks();
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = heroSlides[activeSlide];

  return (
    <main className="min-h-screen bg-[#FDFBF7] pb-8">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <LibraryLogo variant="light" size="sm" showTagline={false} />
          <div>
            <h1 className="font-serif text-lg text-[#2D4635]">Kurdish Writers</h1>
            <p className="text-xs text-[#A68A64]">Discover the beauty of Kurdish literature</p>
          </div>
        </div>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E0D4] text-[#2D4635]"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>
      </header>

      {/* Hero Carousel */}
      <section className="mx-5 overflow-hidden rounded-2xl sm:mx-8">
        <div className="relative min-h-[200px]">
          <img
            src={slide.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF7]/95 via-[#FDFBF7]/70 to-[#FDFBF7]/30" />
          <div
            className="absolute right-0 top-0 h-full w-1/3 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z' fill='%23C5A059'/%3E%3C/svg%3E")`,
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 px-6 py-8 sm:px-8 sm:py-10">
            <h2 className="font-serif text-2xl leading-tight text-[#2D4635] sm:text-3xl">
              {slide.title}
            </h2>
            <p className="mt-2 max-w-xs text-sm text-[#5C4A3A]">{slide.subtitle}</p>
            <Link
              to="/library"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#2D4635] px-5 py-2.5 text-sm text-white"
            >
              {slide.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>

            <div className="mt-6 flex gap-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    index === activeSlide ? "bg-[#2D4635]" : "bg-[#D4C4A8]"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="mt-8 px-5 sm:px-8">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-base text-[#2D4635]">Browse by Category</h2>
          <button type="button" className="text-xs text-[#A68A64]">
            View all &gt;
          </button>
        </div>
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {LIBRARY_CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Writers */}
      <section className="mt-8 px-5 sm:px-8">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-base text-[#2D4635]">Featured Writers</h2>
          <Link to="/library" className="text-xs text-[#A68A64]">
            View all &gt;
          </Link>
        </div>
        <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
          {featuredWriters.map((writer) => (
            <WriterCard key={writer.id} writer={writer} variant="browse" />
          ))}
        </div>
      </section>

      {/* Popular Books */}
      <section className="mt-8 px-5 sm:px-8">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-base text-[#2D4635]">Popular Books</h2>
          <button type="button" className="text-xs text-[#A68A64]">
            View all &gt;
          </button>
        </div>
        <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
          {popularBooks.map((book) => (
            <BookCard key={book.id} book={book} showRating />
          ))}
        </div>
      </section>
    </main>
  );
}
