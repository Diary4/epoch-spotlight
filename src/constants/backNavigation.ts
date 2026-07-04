/** Back navigation sizing — aligned with The People section */

/** Rotate back arrow to point toward "back" in RTL layouts */
export function backIconRotateClassName(dir: "ltr" | "rtl"): string {
  return dir === "rtl" ? "rotate-180" : "";
}

/** Top-level Discover section pages (e.g. back to Discover Kurdistan hub) */
export const sectionBackButtonClassName =
  "fixed top-1/2 z-[60] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-md backdrop-blur-sm transition-all hover:bg-white sm:h-14 sm:w-14";

export function sectionBackButtonSideClassName(dir: "ltr" | "rtl") {
  return dir === "rtl" ? "right-4 sm:right-8" : "left-4 sm:left-8";
}

export const sectionBackIconSizeClassName = "h-5 w-5 sm:h-6 sm:w-6";

export function sectionBackIconClassName(dir: "ltr" | "rtl"): string {
  return `${sectionBackIconSizeClassName} ${backIconRotateClassName(dir)}`.trim();
}

/** Detail / sub-section pages (e.g. back to parent section) */
export const detailBackButtonClassName =
  "fixed top-1/2 z-[60] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-md backdrop-blur-sm transition-all hover:bg-white sm:h-14 sm:w-14";

export function detailBackButtonSideClassName(dir: "ltr" | "rtl") {
  return dir === "rtl" ? "right-4 sm:right-8" : "left-4 sm:left-8";
}

export const detailBackIconSize = 32;

export function detailBackIconClassName(dir: "ltr" | "rtl"): string {
  return backIconRotateClassName(dir);
}

/** Women section pages — back button vertically centered on the screen edge */
export const womenBackButtonClassName =
  "fixed top-1/2 z-[60] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#2c1337] shadow-md backdrop-blur-sm transition-all hover:bg-white sm:h-14 sm:w-14";

export function womenBackButtonSideClassName(dir: "ltr" | "rtl") {
  return dir === "rtl" ? "right-4 sm:right-8" : "left-4 sm:left-8";
}

/** Scaled 1400px canvas pages (Government, Parliament, Presidency) */
export const systemCanvasBackButtonClassName =
  "system-detail-back fixed top-1/2 z-[60] grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm sm:h-12 sm:w-12";

export const systemCanvasBackIconSize = 20;
