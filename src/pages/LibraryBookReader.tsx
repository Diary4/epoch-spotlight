import { useLayoutEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, Lock } from "lucide-react";
import BookPurchaseDialog from "@/components/Sections/library/BookPurchaseDialog";
import { getBookPreviewPages } from "@/data/bookSampleContent";
import { getBookById } from "@/data/libraryBooks";
import { getWriterById } from "@/data/libraryWriters";
import {
  canReadPage,
  FREE_PREVIEW_PAGES,
  getMaxReadablePage,
  isBookPurchased,
} from "@/lib/libraryPreview";

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
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-[#E8E0D4] bg-[#F5F1E6]/95 px-5 py-4 backdrop-blur-sm sm:px-8">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link
            to={`/library/books/${bookId}`}
            className="flex items-center gap-2 text-sm text-[#5C4A3A] hover:text-[#0B1C14]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <div className="text-center">
            <p className="font-serif text-sm text-[#0B1C14]">{book.title}</p>
            {author && (
              <p className="text-xs text-[#8B7355]">{author.name}</p>
            )}
          </div>

          <div className="text-right text-xs text-[#8B7355]">
            <span className="font-medium text-[#0B1C14]">{currentPage}</span>
            {book.pages && (
              <span> / {book.pages}</span>
            )}
          </div>
        </div>

        {!purchased && (
          <div className="mx-auto mt-3 flex max-w-2xl items-center justify-center gap-2">
            <span className="rounded-full bg-[#0B1C14]/10 px-3 py-1 text-[10px] uppercase tracking-wider text-[#0B1C14]">
              Free preview · {FREE_PREVIEW_PAGES} pages
            </span>
          </div>
        )}
      </header>

      {/* Page content */}
      <article className="mx-auto w-full max-w-2xl flex-1 px-6 py-10 sm:px-8 sm:py-14">
        <p className="mb-6 text-xs uppercase tracking-widest text-[#C5A059]">
          Page {currentPage}
        </p>
        <div className="font-serif text-lg leading-[1.9] text-[#2A2018] sm:text-xl sm:leading-[2]">
          {activePage?.content ?? (
            <p className="text-[#8B7355]">This page is not available in the preview.</p>
          )}
        </div>

        {currentPage === FREE_PREVIEW_PAGES && !purchased && (
          <div className="mt-10 rounded-2xl border border-dashed border-[#C5A059]/50 bg-[#FAF8F5] px-5 py-6 text-center">
            <Lock className="mx-auto h-5 w-5 text-[#C5A059]" />
            <p className="mt-3 font-serif text-base text-[#0B1C14]">
              End of free preview
            </p>
            <p className="mt-1 text-sm text-[#8B7355]">
              Purchase the full book to continue reading
              {book.pages ? ` all ${book.pages} pages` : ""}.
            </p>
            <button
              type="button"
              onClick={() => setShowPurchase(true)}
              className="mt-4 rounded-full bg-[#0B1C14] px-6 py-2.5 text-sm text-[#C5A059]"
            >
              Get the Full Book
            </button>
          </div>
        )}
      </article>

      {/* Navigation */}
      <footer className="sticky bottom-0 border-t border-[#E8E0D4] bg-[#F5F1E6]/95 px-5 py-4 backdrop-blur-sm sm:px-8">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentPage <= 1}
            className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm text-[#5C4A3A] transition-colors hover:bg-[#E8E0D4]/50 disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>

          {/* Preview progress dots */}
          {!purchased && (
            <div className="flex items-center gap-1.5">
              {Array.from({ length: FREE_PREVIEW_PAGES }).map((_, index) => {
                const page = index + 1;
                const isActive = page === currentPage;
                const isRead = page < currentPage;

                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => goToPage(page)}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      isActive
                        ? "bg-[#C5A059] w-4"
                        : isRead
                          ? "bg-[#C5A059]/50"
                          : "bg-[#D4C4A8]"
                    }`}
                    aria-label={`Go to page ${page}`}
                  />
                );
              })}
              <Lock className="ml-1 h-3 w-3 text-[#C5A059]/60" />
            </div>
          )}

          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm text-[#5C4A3A] transition-colors hover:bg-[#E8E0D4]/50"
          >
            {currentPage >= maxReadable ? (
              <>
                <Lock className="h-4 w-4 text-[#C5A059]" />
                Unlock
              </>
            ) : (
              <>
                Next
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </footer>

      <BookPurchaseDialog
        book={book}
        open={showPurchase}
        onOpenChange={setShowPurchase}
      />
    </main>
  );
}
