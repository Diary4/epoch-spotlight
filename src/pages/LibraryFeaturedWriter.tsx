import { useRef } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import DesignScaledCanvas from "@/components/DesignScaledCanvas";
import LibraryLogo from "@/components/Sections/library/LibraryLogo";
import { KioskBookCard, KioskWriterAvatar } from "@/components/Sections/library/kioskCards";
import {
  getWriterById,
  getFeaturedWriters,
  FEATURED_HERO_BACKGROUND,
} from "@/data/libraryWriters";
import { getBooksByAuthor, getFeaturedBooks } from "@/data/libraryBooks";
import { cn } from "@/lib/utils";
import { useLibraryPageAnimation } from "@/components/Sections/library/useLibraryPageAnimation";

const STAR_PATTERN =
  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z' fill='%23C5A059'/%3E%3C/svg%3E\")";

export default function LibraryFeaturedWriter() {
  const { writerId } = useParams();
  const writer = writerId ? getWriterById(writerId) : undefined;
  const rootRef = useRef<HTMLDivElement>(null);

  useLibraryPageAnimation(rootRef, [writerId]);

  if (!writer) {
    return <Navigate to="/library" replace />;
  }

  const otherWriters = getFeaturedWriters().filter((w) => w.id !== writer.id);
  const ownBooks = getBooksByAuthor(writer.id);
  const books = (ownBooks.length > 0 ? ownBooks : getFeaturedBooks()).slice(0, 2);

  return (
    <DesignScaledCanvas fitViewport bgClassName="bg-[#0A0A0A]" fitDeps={[writerId]}>
      <div ref={rootRef} className="flex min-h-[1920px] w-full flex-col bg-[#0A0A0A] text-white">
        <section
          data-library-section
          className="relative flex flex-col items-center overflow-hidden"
        >
          <img
            src={FEATURED_HERO_BACKGROUND}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-[#0A0A0A]" />

          <div
            className="pointer-events-none absolute left-0 top-0 h-48 w-48 opacity-10"
            style={{ backgroundImage: STAR_PATTERN, backgroundSize: "30px 30px" }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 h-48 w-48 opacity-10"
            style={{ backgroundImage: STAR_PATTERN, backgroundSize: "30px 30px" }}
          />

          <div className="relative z-10 flex w-full flex-col items-center px-12 pt-14">
            <div data-library-header>
              <LibraryLogo variant="gold" size="lg" />
            </div>

            <div data-library-hero-image className="relative mt-12 w-full max-w-[560px]">
              <img
                src={writer.portraitDark ?? writer.portrait}
                alt={writer.name}
                className="mx-auto h-[620px] w-auto object-cover object-top"
              />
              <div
                data-library-hero-text
                className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0A0A0A] to-transparent pt-24 text-center"
              >
                <h1 className="font-serif text-5xl uppercase tracking-[0.15em] text-[#C5A059]">
                  {writer.name}
                </h1>
                <p className="mt-2 text-xl text-[#C5A059]/70">{writer.roles.join(". ")}.</p>
              </div>
            </div>

            <div data-library-hero-text>
              <Link
                to={`/library/writers/${writer.id}`}
                className="mt-10 inline-flex items-center gap-2 rounded-full border border-[#C5A059] bg-[#0B1C14]/80 px-10 py-4 text-lg uppercase tracking-wider text-[#C5A059] backdrop-blur-sm"
              >
                Explore Writer
                <ArrowRight className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </section>

        <section data-library-section className="px-12 py-14">
          <div className="flex items-center gap-6">
            <div className="h-px flex-1 bg-[#C5A059]/30" />
            <h2 className="text-base uppercase tracking-[0.3em] text-[#C5A059]">Other Writers</h2>
            <div className="h-px flex-1 bg-[#C5A059]/30" />
          </div>

          <div className="mt-12 flex justify-center gap-14">
            {otherWriters.map((w) => (
              <KioskWriterAvatar key={w.id} writer={w} />
            ))}
          </div>
        </section>

        {books.length > 0 && (
          <section data-library-section className="px-12 py-12">
            <div className="flex items-center gap-6">
              <div className="h-px flex-1 bg-[#C5A059]/30" />
              <h2 className="text-base uppercase tracking-[0.3em] text-[#C5A059]">Selected Books</h2>
              <div className="h-px flex-1 bg-[#C5A059]/30" />
            </div>

            <div className="mt-12 flex justify-center gap-16">
              {books.map((book) => (
                <KioskBookCard key={book.id} book={book} />
              ))}
            </div>
          </section>
        )}

        <footer className="mt-auto px-12 py-14 text-center">
          <Link to="/library/writers" className="block">
            <p className={cn("text-base uppercase tracking-[0.3em] text-[#C5A059]/60")}>
              Touch anywhere to begin your journey
            </p>
            <p className="mt-3 text-3xl text-[#C5A059]/40">👆</p>
          </Link>
        </footer>
      </div>
    </DesignScaledCanvas>
  );
}
