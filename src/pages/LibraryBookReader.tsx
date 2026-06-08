import { useLayoutEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, Lock } from "lucide-react";
import BookPurchaseDialog from "@/components/Sections/library/BookPurchaseDialog";
import {
  libraryBodySmall,
  libraryIconSm,
  libraryNavText,
  libraryPad,
  libraryReaderShell,
  libraryReaderText,
  librarySectionTitle,
} from "@/components/Sections/library/libraryLayout";
import { getBookPreviewPages } from "@/data/bookSampleContent";
import { getBookById } from "@/data/libraryBooks";
import { getWriterById } from "@/data/libraryWriters";
import {
  canReadPage,
  FREE_PREVIEW_PAGES,
  getMaxReadablePage,
  isBookPurchased,
} from "@/lib/libraryPreview";
import { cn } from "@/lib/utils";

export default function LibraryBookReader() {
  const { bookId } = useParams();
  const book = bookId ? getBookById(bookId) : undefined;
  const [currentPage, setCurrentPage] = useState(1);
  const [showPurchase, setShowPurchase] = useState(false);

  if (!book || !bookId) {
    return <Navigate to="/library" replace />;
  }

  const author = getWriterById(book.authorId);
  const previewPages = getBookPreviewPages(bookId);
  const maxReadable = getMaxReadablePage(bookId, book.pages);
  const purchased = isBookPurchased(bookId);
  const activePage = previewPages.find((p) => p.pageNumber === currentPage);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, bookId]);

  const goToPage = (page: number) => {
    if (!canReadPage(page, bookId)) {
      setShowPurchase(true);
      return;
    }
    setCurrentPage(page);
  };

  const handleNext = () => {
    if (currentPage >= maxReadable) {
      setShowPurchase(true);
      return;
    }
    goToPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#F5F1E6]">
      <header className={cn("sticky top-0 z-10 border-b border-[#E8E0D4] bg-[#F5F1E6]/95 backdrop-blur-sm", libraryPad, "py-4 lg:py-6 3xl:py-8")}>
        <div className={cn(libraryReaderShell, "flex items-center justify-between")}>
          <Link
            to={`/library/books/${bookId}`}
            className={cn(libraryNavText, "flex items-center gap-2 hover:text-[#0B1C14]")}
          >
            <ArrowLeft className={libraryIconSm} />
            Back
          </Link>

          <div className="text-center">
            <p className="font-serif text-sm text-[#0B1C14] lg:text-base 3xl:text-2xl">{book.title}</p>
            {author && <p className={libraryBodySmall}>{author.name}</p>}
          </div>

          <div className={cn(libraryBodySmall, "text-right")}>
            <span className="font-medium text-[#0B1C14]">{currentPage}</span>
            {book.pages && <span> / {book.pages}</span>}
          </div>
        </div>

        {!purchased && (
          <div className={cn(libraryReaderShell, "mt-3 flex items-center justify-center lg:mt-4")}>
            <span className="rounded-full bg-[#0B1C14]/10 px-3 py-1 text-[10px] uppercase tracking-wider text-[#0B1C14] lg:text-xs 3xl:px-5 3xl:py-2 3xl:text-base">
              Free preview · {FREE_PREVIEW_PAGES} pages
            </span>
          </div>
        )}
      </header>

      <article className={cn(libraryReaderShell, libraryPad, "flex-1 py-10 sm:py-14 lg:py-16 3xl:py-20")}>
        <p className="mb-6 text-xs uppercase tracking-widest text-[#C5A059] lg:text-sm 3xl:text-lg">
          Page {currentPage}
        </p>
        <div className={libraryReaderText}>
          {activePage?.content ?? (
            <p className="text-[#8B7355]">This page is not available in the preview.</p>
          )}
        </div>

        {currentPage === FREE_PREVIEW_PAGES && !purchased && (
          <div className="mt-10 rounded-2xl border border-dashed border-[#C5A059]/50 bg-[#FAF8F5] px-5 py-6 text-center lg:mt-14 lg:px-8 lg:py-10 3xl:mt-20 3xl:px-12 3xl:py-14">
            <Lock className="mx-auto h-5 w-5 text-[#C5A059] lg:h-7 lg:w-7 3xl:h-9 3xl:w-9" />
            <p className={cn(librarySectionTitle, "mt-3")}>End of free preview</p>
            <p className={cn(libraryBodySmall, "mt-1")}>
              Purchase the full book to continue reading
              {book.pages ? ` all ${book.pages} pages` : ""}.
            </p>
            <button
              type="button"
              onClick={() => setShowPurchase(true)}
              className="mt-4 rounded-full bg-[#0B1C14] px-6 py-2.5 text-sm text-[#C5A059] lg:px-8 lg:py-3.5 lg:text-lg 3xl:px-10 3xl:py-4 3xl:text-xl"
            >
              Get the Full Book
            </button>
          </div>
        )}
      </article>

      <footer className={cn("sticky bottom-0 border-t border-[#E8E0D4] bg-[#F5F1E6]/95 backdrop-blur-sm", libraryPad, "py-4 lg:py-6 3xl:py-8")}>
        <div className={cn(libraryReaderShell, "flex items-center justify-between")}>
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentPage <= 1}
            className={cn(libraryNavText, "flex items-center gap-1 rounded-lg px-4 py-2 transition-colors hover:bg-[#E8E0D4]/50 disabled:opacity-30 lg:px-6 lg:py-3")}
          >
            <ChevronLeft className={libraryIconSm} />
            Previous
          </button>

          {!purchased && (
            <div className="flex items-center gap-1.5 lg:gap-2">
              {Array.from({ length: FREE_PREVIEW_PAGES }).map((_, index) => {
                const page = index + 1;
                const isActive = page === currentPage;
                const isRead = page < currentPage;

                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => goToPage(page)}
                    className={cn(
                      "h-2 w-2 rounded-full transition-colors lg:h-2.5 lg:w-2.5 3xl:h-3 3xl:w-3",
                      isActive ? "bg-[#C5A059] w-4 lg:w-5 3xl:w-6" : isRead ? "bg-[#C5A059]/50" : "bg-[#D4C4A8]",
                    )}
                    aria-label={`Go to page ${page}`}
                  />
                );
              })}
              <Lock className="ml-1 h-3 w-3 text-[#C5A059]/60 lg:h-4 lg:w-4 3xl:h-5 3xl:w-5" />
            </div>
          )}

          <button
            type="button"
            onClick={handleNext}
            className={cn(libraryNavText, "flex items-center gap-1 rounded-lg px-4 py-2 transition-colors hover:bg-[#E8E0D4]/50 lg:px-6 lg:py-3")}
          >
            {currentPage >= maxReadable ? (
              <>
                <Lock className={libraryIconSm + " text-[#C5A059]"} />
                Unlock
              </>
            ) : (
              <>
                Next
                <ChevronRight className={libraryIconSm} />
              </>
            )}
          </button>
        </div>
      </footer>

      <BookPurchaseDialog book={book} open={showPurchase} onOpenChange={setShowPurchase} />
    </main>
  );
}
