import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, Quote } from "lucide-react";
import LibraryLogo from "@/components/Sections/library/LibraryLogo";
import LibraryPageShell from "@/components/Sections/library/LibraryPageShell";
import WriterCard from "@/components/Sections/library/WriterCard";
import WriterQuoteCard from "@/components/Sections/library/WriterQuoteCard";
import {
  libraryBody,
  libraryBodySmall,
  libraryDisplayTitle,
  libraryHeaderPad,
  libraryIconMd,
  libraryIconSm,
  libraryNavText,
  libraryPad,
  librarySectionLabel,
  librarySectionTitle,
} from "@/components/Sections/library/libraryLayout";
import libraryHeroBg from "@/assets/images/library/l-1.webp";
import { getAllWriters, getWritersWithQuotes } from "@/data/libraryWriters";
import { cn } from "@/lib/utils";
import { useLibraryPageAnimation } from "@/components/Sections/library/useLibraryPageAnimation";

export default function LibraryWriters() {
  const rootRef = useRef<HTMLElement>(null);
  const allWriters = getAllWriters();
  const quotedWriters = getWritersWithQuotes();

  useLibraryPageAnimation(rootRef);

  return (
    <main ref={rootRef} className="min-h-screen overflow-x-hidden bg-[#F5F2ED] pb-6 lg:pb-8 3xl:pb-10">
      <header data-library-header className={cn(libraryHeaderPad, "flex items-center justify-between")}>
        <LibraryPageShell className="flex w-full items-center justify-between">
          <Link to="/library" className={cn(libraryNavText, "flex items-center gap-2")}>
            <ArrowLeft className={libraryIconSm} />
            Back to Library
          </Link>
          <LibraryLogo variant="light" size="md" showTagline={false} />
          <Link
            to="/library/books"
            className={cn(libraryNavText, "flex items-center gap-2 text-[#C5A059]")}
          >
            Books
            <BookOpen className={libraryIconSm} />
          </Link>
        </LibraryPageShell>
      </header>

      <section
        data-library-section
        className="relative mx-4 overflow-hidden rounded-3xl sm:mx-8 lg:mx-12 lg:rounded-[2rem] 3xl:mx-24"
      >
        <div className="relative min-h-[320px] sm:min-h-[380px] lg:min-h-[440px] 3xl:min-h-[520px]">
          <img src={libraryHeroBg} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1C14]/90 via-[#0B1C14]/70 to-[#0B1C14]/30" />

          <div
            data-library-hero-text
            className="relative z-10 flex h-full flex-col justify-center px-6 py-12 sm:px-10 lg:px-14 3xl:px-20"
          >
            <p className={cn(librarySectionLabel, "text-[#C5A059]")}>Kurdish Literature</p>
            <h1 className={cn(libraryDisplayTitle, "mt-3 text-[#F5F2ED]")}>Our Writers</h1>
            <p className={cn(libraryBody, "mt-4 max-w-lg text-[#F5F2ED]/80 lg:max-w-xl 3xl:max-w-2xl")}>
              Poets, novelists, and thinkers whose words carried Kurdish culture across generations.
            </p>
          </div>
        </div>
      </section>

      <section
        data-library-section
        className={cn("relative mt-10 overflow-hidden lg:mt-14 3xl:mt-20", libraryPad)}
      >
        <LibraryPageShell>
          <div className="flex items-center gap-3">
            <Quote className="h-5 w-5 text-[#C5A059] lg:h-6 lg:w-6 3xl:h-8 3xl:w-8" />
            <div>
              <h2 className={librarySectionTitle}>Words That Endure</h2>
              <p className={libraryBodySmall}>Famous quotes from Kurdish literary voices</p>
            </div>
          </div>

          <div className="relative mt-6 lg:mt-8 3xl:mt-10">
            <div className="overflow-hidden rounded-3xl bg-[#0B1C14] p-6 lg:p-10 3xl:p-14">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z' fill='%23C5A059'/%3E%3C/svg%3E")`,
                  backgroundSize: "48px 48px",
                }}
              />
              <div className="relative flex gap-4 overflow-x-auto pb-2 scrollbar-hide lg:gap-6 3xl:gap-8">
                {quotedWriters.map((writer) => (
                  <div key={writer.id} data-library-item>
                    <WriterQuoteCard writer={writer} variant="dark" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </LibraryPageShell>
      </section>

      <section data-library-section className={cn("mt-10 lg:mt-14 3xl:mt-20", libraryPad)}>
        <LibraryPageShell>
          <div className="flex items-end justify-between">
            <div>
              <h2 className={librarySectionTitle}>All Writers</h2>
              <p className={libraryBodySmall}>{allWriters.length} voices in our collection</p>
            </div>
            <Link to="/library/books" className={cn(libraryBodySmall, "flex items-center gap-1")}>
              Explore Books
              <ArrowRight className="h-3 w-3 lg:h-4 lg:w-4" />
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:mt-8 lg:grid-cols-4 lg:gap-6 3xl:mt-10 3xl:gap-8">
            {allWriters.map((writer) => (
              <div key={writer.id} data-library-item className="flex justify-center">
                <WriterCard writer={writer} variant="browse" />
              </div>
            ))}
          </div>
        </LibraryPageShell>
      </section>

      <section data-library-section className={libraryPad}>
        <LibraryPageShell>
          <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">
            {quotedWriters.slice(0, 4).map((writer) => (
              <div key={writer.id} data-library-item>
                <WriterQuoteCard writer={writer} variant="light" className="!w-full" />
              </div>
            ))}
          </div>
        </LibraryPageShell>
      </section>
    </main>
  );
}
