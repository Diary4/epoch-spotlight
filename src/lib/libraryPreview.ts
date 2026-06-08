/** Number of pages available without purchase. */
export const FREE_PREVIEW_PAGES = 5;

/** Deep link scheme for the future mobile purchase app. */
export const PURCHASE_DEEP_LINK_SCHEME = "voicesofkurdistan://purchase";

export function getPurchaseDeepLink(bookId: string) {
  return `${PURCHASE_DEEP_LINK_SCHEME}/${bookId}`;
}

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
