import { useEffect, useState } from "react";
import { ArrowLeft, BookOpen, Smartphone } from "lucide-react";
import QRCode from "react-qr-code";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FREE_PREVIEW_PAGES,
  getPurchaseUrlForDevice,
  PURCHASE_DEVICE_LABELS,
  type PurchaseDevice,
} from "@/lib/libraryPreview";
import type { LibraryBook } from "@/data/libraryTypes";
import { cn } from "@/lib/utils";

type BookPurchaseDialogProps = {
  book: LibraryBook;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type DialogStep = "intro" | "device" | "qr";

const deviceOptions: {
  id: PurchaseDevice;
  description: string;
}[] = [
  {
    id: "android",
    description: "Scan with your Android phone or tablet",
  },
  {
    id: "ios",
    description: "Scan with your iPhone or iPad",
  },
];

export default function BookPurchaseDialog({
  book,
  open,
  onOpenChange,
}: BookPurchaseDialogProps) {
  const [step, setStep] = useState<DialogStep>("intro");
  const [selectedDevice, setSelectedDevice] = useState<PurchaseDevice | null>(null);

  const remainingPages = (book.pages ?? 0) - FREE_PREVIEW_PAGES;
  const purchaseUrl = selectedDevice
    ? getPurchaseUrlForDevice(book.id, selectedDevice)
    : null;

  useEffect(() => {
    if (!open) {
      setStep("intro");
      setSelectedDevice(null);
    }
  }, [open]);

  const handleDeviceSelect = (device: PurchaseDevice) => {
    setSelectedDevice(device);
    setStep("qr");
  };

  const handleBack = () => {
    if (step === "qr") {
      setStep("device");
      setSelectedDevice(null);
      return;
    }
    if (step === "device") {
      setStep("intro");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-[#E8E0D4] bg-[#FAF8F5] lg:max-w-lg 3xl:max-w-2xl 3xl:p-10">
        {step !== "intro" && (
          <button
            type="button"
            onClick={handleBack}
            className="absolute left-4 top-4 flex items-center gap-1 text-sm text-[#8B7355] transition-colors hover:text-[#0B1C14] lg:text-base 3xl:left-6 3xl:top-6 3xl:text-lg"
          >
            <ArrowLeft className="h-4 w-4 lg:h-5 lg:w-5" />
            Back
          </button>
        )}

        <DialogHeader>
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#0B1C14] lg:h-14 lg:w-14 3xl:h-16 3xl:w-16">
            <BookOpen className="h-6 w-6 text-[#C5A059] lg:h-7 lg:w-7 3xl:h-8 3xl:w-8" />
          </div>

          {step === "intro" && (
            <>
              <DialogTitle className="text-center font-serif text-xl text-[#0B1C14] lg:text-2xl 3xl:text-3xl">
                Continue reading {book.title}
              </DialogTitle>
              <DialogDescription className="text-center text-[#5C4A3A] lg:text-lg 3xl:text-xl">
                You have read the first {FREE_PREVIEW_PAGES} free pages.
                {remainingPages > 0 && (
                  <> Unlock {remainingPages} more pages to finish the book.</>
                )}
              </DialogDescription>
            </>
          )}

          {step === "device" && (
            <>
              <DialogTitle className="text-center font-serif text-xl text-[#0B1C14] lg:text-2xl 3xl:text-3xl">
                Which device do you use?
              </DialogTitle>
              <DialogDescription className="text-center text-[#5C4A3A] lg:text-lg 3xl:text-xl">
                We will show a QR code for your device to purchase the full book in the
                Voices of Kurdistan app.
              </DialogDescription>
            </>
          )}

          {step === "qr" && selectedDevice && (
            <>
              <DialogTitle className="text-center font-serif text-xl text-[#0B1C14] lg:text-2xl 3xl:text-3xl">
                Scan to get the full book
              </DialogTitle>
              <DialogDescription className="text-center text-[#5C4A3A] lg:text-lg 3xl:text-xl">
                Open your camera on {PURCHASE_DEVICE_LABELS[selectedDevice]} and scan the
                code below.
              </DialogDescription>
            </>
          )}
        </DialogHeader>

        {step === "intro" && (
          <div className="rounded-xl border border-[#E8E0D4] bg-white px-4 py-3 text-sm text-[#5C4A3A] lg:text-base 3xl:px-6 3xl:py-5 3xl:text-lg">
            <p className="flex items-start gap-2">
              <Smartphone className="mt-0.5 h-4 w-4 shrink-0 text-[#C5A059] lg:h-5 lg:w-5 3xl:h-6 3xl:w-6" />
              Full book purchases are completed on your phone through the Voices of
              Kurdistan mobile app.
            </p>
          </div>
        )}

        {step === "device" && (
          <div className="grid gap-3 lg:gap-4">
            {deviceOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleDeviceSelect(option.id)}
                className="flex flex-col items-start rounded-2xl border border-[#E8E0D4] bg-white px-5 py-4 text-left transition-colors hover:border-[#C5A059] hover:bg-[#FFFCF8] lg:px-6 lg:py-5 3xl:px-8 3xl:py-6"
              >
                <span className="font-serif text-lg text-[#0B1C14] lg:text-xl 3xl:text-2xl">
                  {PURCHASE_DEVICE_LABELS[option.id]}
                </span>
                <span className="mt-1 text-sm text-[#8B7355] lg:text-base 3xl:text-lg">
                  {option.description}
                </span>
              </button>
            ))}
          </div>
        )}

        {step === "qr" && purchaseUrl && selectedDevice && (
          <div className="flex flex-col items-center gap-4 lg:gap-6">
            <div className="rounded-2xl border border-[#E8E0D4] bg-white p-4 lg:p-6 3xl:p-8">
              <QRCode
                value={purchaseUrl}
                size={280}
                bgColor="#FFFFFF"
                fgColor="#0B1C14"
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                viewBox="0 0 280 280"
              />
            </div>
            <p className="text-center text-xs text-[#8B7355] lg:text-sm 3xl:text-base">
              {PURCHASE_DEVICE_LABELS[selectedDevice]} · {book.title}
            </p>
          </div>
        )}

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          {step === "intro" && (
            <button
              type="button"
              onClick={() => setStep("device")}
              className="w-full rounded-full bg-[#0B1C14] px-6 py-3 text-sm text-[#C5A059] transition-colors hover:bg-[#1B3022] lg:text-base 3xl:px-8 3xl:py-4 3xl:text-xl"
            >
              Get the Full Book
            </button>
          )}

          {step === "qr" && (
            <button
              type="button"
              onClick={() => {
                setStep("device");
                setSelectedDevice(null);
              }}
              className={cn(
                "w-full rounded-full border border-[#E8E0D4] bg-white px-6 py-3 text-sm text-[#8B7355] lg:text-base 3xl:px-8 3xl:py-4 3xl:text-xl",
              )}
            >
              Choose a different device
            </button>
          )}

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="w-full rounded-full border border-[#E8E0D4] bg-white px-6 py-3 text-sm text-[#8B7355] lg:text-base 3xl:px-8 3xl:py-4 3xl:text-xl"
          >
            Keep Reading Preview
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
