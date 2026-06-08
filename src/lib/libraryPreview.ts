/** Number of pages available without purchase. */
export const FREE_PREVIEW_PAGES = 5;

/** Deep link scheme for the future mobile purchase app. */
export const PURCHASE_DEEP_LINK_SCHEME = "voicesofkurdistan://purchase";

export type PurchaseDevice = "android" | "ios";

/** Replace with the live Play Store URL when the Android app is published. */
export const ANDROID_PURCHASE_BASE_URL =
  "https://play.google.com/store/apps/details?id=com.voicesofkurdistan";

/** Replace with the live App Store URL when the iOS app is published. */
export const IOS_PURCHASE_BASE_URL =
  "https://apps.apple.com/app/voices-of-kurdistan/id000000000";

export function getPurchaseDeepLink(bookId: string) {
  return `${PURCHASE_DEEP_LINK_SCHEME}/${bookId}`;
}

/** QR payload per device — Android and iOS use different store / deep-link targets. */
export function getPurchaseUrlForDevice(bookId: string, device: PurchaseDevice): string {
  if (device === "android") {
    return `${ANDROID_PURCHASE_BASE_URL}&book=${bookId}`;
  }
  return `${IOS_PURCHASE_BASE_URL}?book=${bookId}`;
}

export const PURCHASE_DEVICE_LABELS: Record<PurchaseDevice, string> = {
  android: "Android",
  ios: "iPhone / iPad",
};

/**
 * Whether the user owns the full book.
 * Wire this to the mobile app's purchase API / receipt validation later.
 */
export function isBookPurchased(_bookId: string): boolean {
  return false;
}

export function canReadPage(page: number, bookId: string): boolean {
  if (isBookPurchased(bookId)) return true;
  return page >= 1 && page <= FREE_PREVIEW_PAGES;
}

export function isPreviewPage(page: number, bookId: string): boolean {
  return !isBookPurchased(bookId) && page <= FREE_PREVIEW_PAGES;
}

export function getMaxReadablePage(bookId: string, totalPages?: number): number {
  if (isBookPurchased(bookId)) return totalPages ?? FREE_PREVIEW_PAGES;
  return FREE_PREVIEW_PAGES;
}
