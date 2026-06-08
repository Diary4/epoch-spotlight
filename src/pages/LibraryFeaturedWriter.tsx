import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import LibraryLogo from "@/components/Sections/library/LibraryLogo";
import WriterCard from "@/components/Sections/library/WriterCard";
import BookCard from "@/components/Sections/library/BookCard";
import {
  getWriterById,
  getFeaturedWriters,
  FEATURED_HERO_BACKGROUND,
} from "@/data/libraryWriters";
import { getBooksByAuthor } from "@/data/libraryBooks";

export default function LibraryFeaturedWriter() {
  const { writerId } = useParams();
  const writer = writerId ? getWriterById(writerId) : undefined;

  if (!writer) {
    return <Navigate to="/library" replace />;
  }

  const otherWriters = getFeaturedWriters().filter((w) => w.id !== writer.id);
  const books = getBooksByAuthor(writer.id).slice(0, 2);

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Featured Hero */}
      <section className="relative min-h-[55vh] overflow-hidden">
        <img
          src={FEATURED_HERO_BACKGROUND}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-[#0A0A0A]" />

        {/* Decorative patterns */}
        <div
          className="pointer-events-none absolute left-0 top-0 h-32 w-32 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z' fill='%23C5A059'/%3E%3C/svg%3E")`,
            backgroundSize: "30px 30px",
          }}
        />
        <div
          className="pointer-events-none absolute right-0 top-0 h-32 w-32 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z' fill='%23C5A059'/%3E%3C/svg%3E")`,
            backgroundSize: "30px 30px",
          }}
        />

        <div className="relative z-10 flex flex-col items-center px-6 pt-8">
          <LibraryLogo variant="gold" size="md" />

          <div className="relative mt-6 w-full max-w-md">
            <img
              src={writer.portraitDark ?? writer.portrait}
              alt={writer.name}
              className="mx-auto h-64 w-auto object-cover object-top sm:h-80"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0A0A0A] to-transparent pt-16 text-center">
              <h1 className="font-serif text-2xl uppercase tracking-[0.15em] text-[#C5A059] sm:text-3xl">
                {writer.name}
              </h1>
              <p className="mt-1 text-sm text-[#C5A059]/70">
                {writer.roles.join(". ")}.
              </p>
            </div>
          </div>

          <Link
            to={`/library/writers/${writer.id}`}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#C5A059] bg-[#0B1C14]/80 px-8 py-3 text-sm uppercase tracking-wider text-[#C5A059] backdrop-blur-sm transition-colors hover:bg-[#1B3022]"
          >
            Explore Writer
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Other Writers */}
      <section className="px-6 py-10">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-[#C5A059]/30" />
          <h2 className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059]">
            Other Writers
          </h2>
          <div className="h-px flex-1 bg-[#C5A059]/30" />
        </div>

        <div className="mt-6 flex justify-center gap-6 overflow-x-auto pb-4">
          {otherWriters.map((w) => (
            <WriterCard key={w.id} writer={w} variant="avatar" />
          ))}
        </div>

        <div className="mx-auto mt-4 h-0.5 w-24 rounded-full bg-[#C5A059]/20">
          <div className="h-full w-1/3 rounded-full bg-[#C5A059]" />
        </div>
      </section>

      {/* Selected Books */}
      {books.length > 0 && (
        <section className="px-6 py-10">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-[#C5A059]/30" />
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059]">
              Selected Books
            </h2>
            <div className="h-px flex-1 bg-[#C5A059]/30" />
          </div>

          <div className="mt-8 flex justify-center gap-10">
            {books.map((book) => (
              <BookCard key={book.id} book={book} variant="shelf" />
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="px-6 py-10 text-center">
        <Link to="/library/browse" className="block">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059]/60">
            Touch anywhere to begin your journey
          </p>
          <p className="mt-2 text-[#C5A059]/40">👆</p>
        </Link>
      </footer>
    </main>
  );
}
