import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Bookmark,
  Share2,
  Play,
  Calendar,
  MapPin,
  User,
  BookOpen,
  Quote,
  TrendingUp,
  Trophy,
} from "lucide-react";
import LibraryLogo from "@/components/Sections/library/LibraryLogo";
import LibraryPageShell from "@/components/Sections/library/LibraryPageShell";
import BookCard from "@/components/Sections/library/BookCard";
import {
  libraryBody,
  libraryBodySmall,
  libraryBtn,
  libraryDisplayTitle,
  libraryHeaderPad,
  libraryIconSm,
  libraryNavText,
  libraryPad,
  librarySectionTitle,
} from "@/components/Sections/library/libraryLayout";
import { getWriterById } from "@/data/libraryWriters";
import { getBooksByAuthor } from "@/data/libraryBooks";
import { cn } from "@/lib/utils";

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

  if (!writer) {
    return <Navigate to="/library" replace />;
  }

  const books = getBooksByAuthor(writer.id);

  return (
    <main className="min-h-screen bg-[#F5F2ED]">
      <header className={cn(libraryHeaderPad, "flex items-center justify-between")}>
        <LibraryPageShell className="flex w-full items-center justify-between">
          <Link
            to="/library"
            className={cn(libraryNavText, "flex items-center gap-2 transition-colors hover:text-[#0B1C14]")}
          >
            <ArrowLeft className={libraryIconSm} />
            Back to Home
          </Link>
          <LibraryLogo variant="light" size="md" />
          <button type="button" className={cn(libraryNavText, "flex items-center gap-1")} aria-label="Search">
            <Search className={libraryIconSm} />
            Search
          </button>
        </LibraryPageShell>
      </header>

      <section className={cn("mx-5 overflow-hidden rounded-2xl bg-[#FAF8F5] sm:mx-8 lg:mx-12 lg:rounded-3xl 3xl:mx-24")}>
        <LibraryPageShell>
          <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-start lg:gap-10 lg:p-10 3xl:gap-14 3xl:p-14">
            <div className="relative mx-auto w-full max-w-xs shrink-0 lg:mx-0 lg:max-w-sm xl:max-w-md 3xl:max-w-lg">
              <img
                src={writer.portrait}
                alt={writer.name}
                className="w-full object-cover grayscale"
                style={{
                  maskImage: "linear-gradient(to right, black 70%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to right, black 70%, transparent 100%)",
                }}
              />
            </div>

            <div className="flex-1">
              <h1 className={libraryDisplayTitle}>{writer.name}</h1>
              <p className="mt-1 text-sm text-[#C5A059] lg:text-base 3xl:text-xl">
                {writer.roles.join(" • ")}
              </p>

              <div className={cn(libraryBody, "mt-4 flex flex-wrap gap-4 lg:gap-6")}>
                {writer.born && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className={libraryIconSm + " text-[#C5A059]"} />
                    Born: {writer.born}
                  </span>
                )}
                {writer.birthplace && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className={libraryIconSm + " text-[#C5A059]"} />
                    Place: {writer.birthplace}
                  </span>
                )}
              </div>

              <p className={cn(libraryBody, "mt-4 max-w-xl lg:max-w-2xl 3xl:max-w-3xl")}>{writer.bio}</p>

              <p className="mt-4 font-serif text-lg italic text-[#8B7355]/60 lg:text-xl 3xl:text-2xl">
                — {writer.name}
              </p>
            </div>

            <div className="flex flex-row gap-3 lg:flex-col lg:gap-4">
              {[
                { icon: Bookmark, label: "Save" },
                { icon: Share2, label: "Share" },
                { icon: Play, label: "Listen Introduction" },
              ].map((action) => (
                <button
                  key={action.label}
                  type="button"
                  className="flex flex-col items-center gap-1 rounded-xl border border-[#E8E0D4] bg-white px-4 py-3 text-[10px] text-[#5C4A3A] transition-colors hover:border-[#C5A059] sm:text-xs lg:px-6 lg:py-4 lg:text-sm 3xl:px-8 3xl:py-5 3xl:text-base"
                >
                  <action.icon className="h-5 w-5 text-[#C5A059] lg:h-6 lg:w-6 3xl:h-8 3xl:w-8" />
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </LibraryPageShell>
      </section>

      <nav className={cn("mt-6 border-b border-[#E8E0D4] lg:mt-8 3xl:mt-10", libraryPad)}>
        <LibraryPageShell>
          <div className="flex gap-1 overflow-x-auto lg:gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm transition-colors lg:px-6 lg:py-4 lg:text-base 3xl:px-8 3xl:py-5 3xl:text-xl",
                  activeTab === tab.id
                    ? "border-[#C5A059] text-[#0B1C14]"
                    : "border-transparent text-[#8B7355] hover:text-[#0B1C14]",
                )}
              >
                <tab.icon className={libraryIconSm} />
                {tab.label}
              </button>
            ))}
          </div>
        </LibraryPageShell>
      </nav>

      <section className={cn("py-8 lg:py-12 3xl:py-16", libraryPad)}>
        <LibraryPageShell>
          {activeTab === "overview" && (
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8 3xl:gap-12">
              <div className="rounded-2xl border border-[#E8E0D4] bg-[#FAF8F5] p-6 lg:p-8 3xl:p-10">
                <h3 className={librarySectionTitle}>Life Journey</h3>
                <div className="relative mt-6 space-y-6 pl-6 lg:mt-8 lg:space-y-8 3xl:space-y-10">
                  <div className="absolute bottom-2 left-[7px] top-2 w-px bg-[#C5A059]/40" />
                  {writer.timeline.map((event) => (
                    <div key={event.year} className="relative">
                      <span className="absolute -left-6 top-1 h-3 w-3 rounded-full border-2 border-[#C5A059] bg-[#FAF8F5] lg:h-4 lg:w-4 3xl:h-5 3xl:w-5" />
                      <p className="text-xs font-medium text-[#C5A059] lg:text-sm 3xl:text-base">{event.year}</p>
                      <p className={cn(libraryBody, "mt-0.5")}>{event.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {writer.portraitLibrary && (
                <div className="hidden overflow-hidden rounded-2xl lg:block">
                  <img
                    src={writer.portraitLibrary}
                    alt={`${writer.name} in library`}
                    className="h-full w-full object-cover grayscale"
                  />
                </div>
              )}
            </div>
          )}

          {activeTab === "books" && (
            <div className="flex flex-wrap gap-4 lg:gap-6 3xl:gap-8">
              {books.map((book) => (
                <BookCard key={book.id} book={book} variant="compact" />
              ))}
            </div>
          )}

          {activeTab === "quotes" && writer.quote && (
            <div className="mx-auto max-w-lg rounded-2xl border border-[#E8E0D4] bg-[#FAF8F5] p-8 text-center lg:max-w-2xl lg:p-12 3xl:max-w-3xl 3xl:p-16">
              <span className="font-serif text-6xl text-[#C5A059]/40 lg:text-7xl 3xl:text-8xl">"</span>
              <p className="font-serif text-xl italic leading-relaxed text-[#0B1C14] lg:text-2xl 3xl:text-4xl">
                {writer.quote}
              </p>
              <p className={cn(libraryBodySmall, "mt-6")}>— {writer.name}</p>
            </div>
          )}

          {activeTab === "journey" && (
            <div className="mx-auto max-w-md space-y-6 lg:max-w-xl lg:space-y-8 3xl:max-w-2xl 3xl:space-y-10">
              {writer.timeline.map((event) => (
                <div
                  key={event.year}
                  className="rounded-xl border border-[#E8E0D4] bg-[#FAF8F5] px-5 py-4 lg:px-8 lg:py-6 3xl:px-10 3xl:py-8"
                >
                  <p className="text-sm font-medium text-[#C5A059] lg:text-base 3xl:text-xl">{event.year}</p>
                  <p className={cn(libraryBody, "mt-1")}>{event.text}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "awards" && (
            <p className={cn(libraryBody, "text-center")}>
              Awards and honors for {writer.name} will be featured here.
            </p>
          )}
        </LibraryPageShell>
      </section>

      {books.length > 0 && (
        <section className={cn("border-t border-[#E8E0D4] py-8 lg:py-12 3xl:py-16", libraryPad)}>
          <LibraryPageShell>
            <div className="flex items-center justify-between">
              <h2 className={librarySectionTitle}>Books by {writer.name}</h2>
              <button type="button" className={libraryBodySmall}>
                View all →
              </button>
            </div>
            <div className="mt-4 flex gap-4 overflow-x-auto pb-2 lg:mt-6 lg:gap-6 3xl:mt-8 3xl:gap-8">
              {books.map((book) => (
                <BookCard key={book.id} book={book} variant="compact" />
              ))}
            </div>
          </LibraryPageShell>
        </section>
      )}

      <footer className={cn("mb-8 lg:mb-12 3xl:mb-16", libraryPad)}>
        <LibraryPageShell className="flex items-center gap-4 rounded-2xl bg-[#E8E0D4]/60 px-6 py-5 lg:px-8 lg:py-7 3xl:px-12 3xl:py-10">
          <span className="text-2xl text-[#C5A059] lg:text-3xl 3xl:text-4xl">✦</span>
          <p className={cn(libraryBody, "flex-1")}>
            Explore his words, feel his world. Dive deeper into the works of {writer.name}.
          </p>
          <Link to={`/library/books/${books[0]?.id ?? ""}`} className={libraryBtn}>
            Explore Books →
          </Link>
        </LibraryPageShell>
      </footer>
    </main>
  );
}
