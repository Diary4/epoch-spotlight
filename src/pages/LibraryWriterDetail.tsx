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
import BookCard from "@/components/Sections/library/BookCard";
import { getWriterById } from "@/data/libraryWriters";
import { getBooksByAuthor } from "@/data/libraryBooks";

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
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 sm:px-8">
        <Link
          to="/library"
          className="flex items-center gap-2 text-sm text-[#5C4A3A] transition-colors hover:text-[#0B1C14]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        <LibraryLogo variant="light" size="sm" />
        <button
          type="button"
          className="flex items-center gap-1 text-sm text-[#5C4A3A]"
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
          Search
        </button>
      </header>

      {/* Hero */}
      <section className="mx-5 overflow-hidden rounded-2xl bg-[#FAF8F5] sm:mx-8">
        <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-start lg:gap-10 lg:p-8">
          {/* Portrait */}
          <div className="relative mx-auto w-full max-w-xs shrink-0 lg:mx-0 lg:max-w-sm">
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

          {/* Details */}
          <div className="flex-1">
            <h1 className="font-serif text-3xl text-[#0B1C14] sm:text-4xl">{writer.name}</h1>
            <p className="mt-1 text-sm text-[#C5A059]">{writer.roles.join(" • ")}</p>

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-[#5C4A3A]">
              {writer.born && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-[#C5A059]" />
                  Born: {writer.born}
                </span>
              )}
              {writer.birthplace && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-[#C5A059]" />
                  Place: {writer.birthplace}
                </span>
              )}
            </div>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#5C4A3A]">{writer.bio}</p>

            <p className="mt-4 font-serif text-lg italic text-[#8B7355]/60">
              — {writer.name}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-row gap-3 lg:flex-col">
            {[
              { icon: Bookmark, label: "Save" },
              { icon: Share2, label: "Share" },
              { icon: Play, label: "Listen Introduction" },
            ].map((action) => (
              <button
                key={action.label}
                type="button"
                className="flex flex-col items-center gap-1 rounded-xl border border-[#E8E0D4] bg-white px-4 py-3 text-[10px] text-[#5C4A3A] transition-colors hover:border-[#C5A059]"
              >
                <action.icon className="h-5 w-5 text-[#C5A059]" />
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <nav className="mt-6 border-b border-[#E8E0D4] px-5 sm:px-8">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-[#C5A059] text-[#0B1C14]"
                  : "border-transparent text-[#8B7355] hover:text-[#0B1C14]"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Tab Content */}
      <section className="px-5 py-8 sm:px-8">
        {activeTab === "overview" && (
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Timeline */}
            <div className="rounded-2xl border border-[#E8E0D4] bg-[#FAF8F5] p-6">
              <h3 className="font-serif text-lg text-[#0B1C14]">Life Journey</h3>
              <div className="relative mt-6 space-y-6 pl-6">
                <div className="absolute bottom-2 left-[7px] top-2 w-px bg-[#C5A059]/40" />
                {writer.timeline.map((event) => (
                  <div key={event.year} className="relative">
                    <span className="absolute -left-6 top-1 h-3 w-3 rounded-full border-2 border-[#C5A059] bg-[#FAF8F5]" />
                    <p className="text-xs font-medium text-[#C5A059]">{event.year}</p>
                    <p className="mt-0.5 text-sm text-[#5C4A3A]">{event.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Secondary portrait */}
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
          <div className="flex flex-wrap gap-4">
            {books.map((book) => (
              <BookCard key={book.id} book={book} variant="compact" />
            ))}
          </div>
        )}

        {activeTab === "quotes" && writer.quote && (
          <div className="mx-auto max-w-lg rounded-2xl border border-[#E8E0D4] bg-[#FAF8F5] p-8 text-center">
            <span className="font-serif text-6xl text-[#C5A059]/40">"</span>
            <p className="font-serif text-xl italic leading-relaxed text-[#0B1C14]">
              {writer.quote}
            </p>
            <p className="mt-6 text-sm text-[#8B7355]">— {writer.name}</p>
          </div>
        )}

        {activeTab === "journey" && (
          <div className="mx-auto max-w-md space-y-6">
            {writer.timeline.map((event) => (
              <div
                key={event.year}
                className="rounded-xl border border-[#E8E0D4] bg-[#FAF8F5] px-5 py-4"
              >
                <p className="text-sm font-medium text-[#C5A059]">{event.year}</p>
                <p className="mt-1 text-[#5C4A3A]">{event.text}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "awards" && (
          <p className="text-center text-sm text-[#8B7355]">
            Awards and honors for {writer.name} will be featured here.
          </p>
        )}
      </section>

      {/* Books by writer */}
      {books.length > 0 && (
        <section className="border-t border-[#E8E0D4] px-5 py-8 sm:px-8">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg text-[#0B1C14]">Books by {writer.name}</h2>
            <button type="button" className="text-xs text-[#8B7355]">
              View all →
            </button>
          </div>
          <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
            {books.map((book) => (
              <BookCard key={book.id} book={book} variant="compact" />
            ))}
          </div>
        </section>
      )}

      {/* Footer CTA */}
      <footer className="mx-5 mb-8 flex items-center gap-4 rounded-2xl bg-[#E8E0D4]/60 px-6 py-5 sm:mx-8">
        <span className="text-2xl text-[#C5A059]">✦</span>
        <p className="flex-1 text-sm text-[#5C4A3A]">
          Explore his words, feel his world. Dive deeper into the works of {writer.name}.
        </p>
        <Link
          to={`/library/books/${books[0]?.id ?? ""}`}
          className="shrink-0 rounded-full bg-[#0B1C14] px-5 py-2.5 text-sm text-[#C5A059]"
        >
          Explore Books →
        </Link>
      </footer>
    </main>
  );
}
