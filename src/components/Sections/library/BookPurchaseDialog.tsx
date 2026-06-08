import { BookOpen, Smartphone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FREE_PREVIEW_PAGES, getPurchaseDeepLink } from "@/lib/libraryPreview";
import type { LibraryBook } from "@/data/libraryTypes";

type BookPurchaseDialogProps = {
  book: LibraryBook;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function BookPurchaseDialog({
  book,
  open,
  onOpenChange,
}: BookPurchaseDialogProps) {
  const remainingPages = (book.pages ?? 0) - FREE_PREVIEW_PAGES;
  const purchaseLink = getPurchaseDeepLink(book.id);

  const handlePurchase = () => {
    // Future: open mobile app via deep link or in-app purchase flow
    window.location.href = purchaseLink;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-[#E8E0D4] bg-[#FAF8F5]">
        <DialogHeader>
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#0B1C14]">
            <BookOpen className="h-6 w-6 text-[#C5A059]" />
          </div>
          <DialogTitle className="text-center font-serif text-xl text-[#0B1C14]">
            Continue reading {book.title}
          </DialogTitle>
          <DialogDescription className="text-center text-[#5C4A3A]">
            You have read the first {FREE_PREVIEW_PAGES} free pages.
            {remainingPages > 0 && (
              <> Unlock {remainingPages} more pages to finish the book.</>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-xl border border-[#E8E0D4] bg-white px-4 py-3 text-sm text-[#5C4A3A]">
          <p className="flex items-start gap-2">
            <Smartphone className="mt-0.5 h-4 w-4 shrink-0 text-[#C5A059]" />
            Full book purchases will be available through the Voices of Kurdistan mobile app.
          </p>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <button
            type="button"
            onClick={handlePurchase}
            className="w-full rounded-full bg-[#0B1C14] px-6 py-3 text-sm text-[#C5A059] transition-colors hover:bg-[#1B3022]"
          >
            Get the Full Book
          </button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="w-full rounded-full border border-[#E8E0D4] bg-white px-6 py-3 text-sm text-[#8B7355]"
          >
            Keep Reading Preview
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
