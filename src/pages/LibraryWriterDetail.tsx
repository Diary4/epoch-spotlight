import { useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  User,
  BookOpen,
  Quote,
  TrendingUp,
  Trophy,
} from "lucide-react";
import DesignScaledCanvas from "@/components/DesignScaledCanvas";
import LibraryLogo from "@/components/Sections/library/LibraryLogo";
import { KioskBookCard } from "@/components/Sections/library/kioskCards";
import { getWriterById } from "@/data/libraryWriters";
import { getBooksByAuthor } from "@/data/libraryBooks";
import { cn } from "@/lib/utils";
import { useLibraryPageAnimation } from "@/components/Sections/library/useLibraryPageAnimation";

const tabs = [
  { id: "overview", label: "Overview", icon: User },
  { id: "books", label: "Books", icon: BookOpen },
  { id: "quotes", label: "Quotes", icon: Quote },
  { id: "journey", label: "Life Journey", icon: TrendingUp },
  { id: "awards", label: "Awards", icon: Trophy },
];

export default function LibraryWriterDetail() {
  const { writerId } = useParams();
  const writer = writerId ? getWriterById(writerId) : undefined;
  const [activeTab, setActiveTab] = useState("overview");
  const rootRef = useRef<HTMLDivElement>(null);

  useLibraryPageAnimation(rootRef, [writerId]);

  if (!writer) {
    return <Navigate to="/library/writers" replace />;
  }

  const sampleBooks = getBooksByAuthor(writer.id);

  return (
    <DesignScaledCanvas fitViewport bgClassName="bg-[#F5F2ED]" fitDeps={[writerId]}>
      <div ref={rootRef} className="flex min-h-[1920px] w-full flex-col bg-[#F5F2ED] px-12 pb-12">
        <header data-library-header className="flex items-center justify-between py-8">
          <Link to="/library/writers" className="flex items-center gap-2 text-lg text-[#5C4A3A]">
            <ArrowLeft className="h-6 w-6" />
            Back to Writers
          </Link>
          <LibraryLogo variant="light" size="md" />
          <div className="invisible flex items-center gap-2 text-lg" aria-hidden>
            <ArrowLeft className="h-6 w-6" />
            Back to Writers
          </div>
        </header>

        <section
          data-library-section
          className="mt-2 overflow-hidden rounded-3xl bg-[#FAF8F5]"
        >
          <div className="flex items-start gap-10 p-10">
            <div data-library-hero-image className="w-[340px] shrink-0">
              <img
                src={writer.portrait}
                alt={writer.name}
                className="h-[420px] w-full object-cover grayscale"
                style={{
                  objectPosition: writer.portraitObjectPosition ?? "center top",
                  maskImage: "linear-gradient(to right, black 70%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to right, black 70%, transparent 100%)",
                }}
              />
            </div>

            <div data-library-hero-text className="flex-1 pt-2">
              <h1 className="font-serif text-6xl text-[#0B1C14]">{writer.name}</h1>
              <p className="mt-2 text-xl text-[#C5A059]">{writer.roles.join(" • ")}</p>

              <div className="mt-6 flex flex-wrap gap-6 text-lg text-[#5C4A3A]">
                {writer.born && (
                  <span className="flex items-center gap-2">
                    <Calendar className="h-6 w-6 text-[#C5A059]" />
                    Born: {writer.born}
                  </span>
                )}
                {writer.birthplace && (
                  <span className="flex items-center gap-2">
                    <MapPin className="h-6 w-6 text-[#C5A059]" />
                    Place: {writer.birthplace}
                  </span>
                )}
              </div>

              <p className="mt-6 text-lg leading-relaxed text-[#5C4A3A]">{writer.bio}</p>
            </div>
          </div>
        </section>

        <nav data-library-section className="mt-8 border-b border-[#E8E0D4]">
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex shrink-0 items-center gap-2 border-b-2 px-6 py-4 text-lg transition-colors",
                  activeTab === tab.id
                    ? "border-[#C5A059] text-[#0B1C14]"
                    : "border-transparent text-[#8B7355]",
                )}
              >
                <tab.icon className="h-6 w-6" />
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        <section data-library-section className="mt-8 h-[980px] overflow-hidden">
          {activeTab === "overview" && (
            <div className="grid h-full grid-cols-5 gap-8">
              <div className="col-span-3 rounded-2xl border border-[#E8E0D4] bg-[#FAF8F5] p-8">
                <h3 className="font-serif text-3xl text-[#2D4635]">Life Journey</h3>
                <div className="relative mt-8 space-y-7 pl-6">
                  <div className="absolute bottom-2 left-[7px] top-2 w-px bg-[#C5A059]/40" />
                  {writer.timeline.map((event) => (
                    <div key={event.year} className="relative">
                      <span className="absolute -left-6 top-1.5 h-4 w-4 rounded-full border-2 border-[#C5A059] bg-[#FAF8F5]" />
                      <p className="text-base font-medium text-[#C5A059]">{event.year}</p>
                      <p className="mt-1 text-lg leading-relaxed text-[#5C4A3A]">{event.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-span-2 rounded-2xl border border-[#E8E0D4] bg-[#FAF8F5] p-8">
                <h3 className="font-serif text-3xl text-[#2D4635]">Selected Works</h3>
                <div className="mt-8 flex flex-col items-center gap-8">
                  {sampleBooks.length > 0 ? (
                    sampleBooks.slice(0, 2).map((book) => (
                      <KioskBookCard key={book.id} book={book} />
                    ))
                  ) : (
                    <p className="mt-4 text-center text-lg text-[#8B7355]">
                      Books by {writer.name} coming soon.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "books" && (
            <div className="flex flex-wrap gap-8">
              {sampleBooks.length > 0 ? (
                sampleBooks.map((book) => (
                  <KioskBookCard key={book.id} book={book} />
                ))
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <p className="text-xl text-[#5C4A3A]">
                    Books by {writer.name} will be featured here.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "quotes" && writer.quote && (
            <div className="flex h-full items-center justify-center">
              <div className="mx-auto max-w-2xl rounded-2xl border border-[#E8E0D4] bg-[#FAF8F5] p-16 text-center">
                <span className="font-serif text-8xl text-[#C5A059]/40">&ldquo;</span>
                <p className="font-serif text-4xl italic leading-relaxed text-[#0B1C14]">
                  {writer.quote}
                </p>
                <p className="mt-8 text-lg text-[#8B7355]">— {writer.name}</p>
              </div>
            </div>
          )}

          {activeTab === "journey" && (
            <div className="grid grid-cols-2 gap-6">
              {writer.timeline.map((event) => (
                <div
                  key={event.year}
                  className="rounded-xl border border-[#E8E0D4] bg-[#FAF8F5] px-8 py-6"
                >
                  <p className="text-lg font-medium text-[#C5A059]">{event.year}</p>
                  <p className="mt-1 text-lg leading-relaxed text-[#5C4A3A]">{event.text}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "awards" && (
            <div className="flex h-full items-center justify-center">
              <p className="text-xl text-[#5C4A3A]">
                Awards and honors for {writer.name} will be featured here.
              </p>
            </div>
          )}
        </section>

        {sampleBooks.length > 0 && (
          <footer data-library-section className="mt-auto pt-8">
            <div className="flex items-center gap-4 rounded-2xl bg-[#E8E0D4]/60 px-8 py-6">
              <span className="text-3xl text-[#C5A059]">✦</span>
              <p className="flex-1 text-lg text-[#5C4A3A]">
                Explore his words, feel his world. Dive deeper into the works of {writer.name}.
              </p>
              <Link
                to={`/library/books/${sampleBooks[0].id}`}
                className="inline-flex items-center gap-2 rounded-full bg-[#0B1C14] px-8 py-4 text-lg text-[#C5A059]"
              >
                Explore Books →
              </Link>
            </div>
          </footer>
        )}
      </div>
    </DesignScaledCanvas>
  );
}
