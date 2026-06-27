/** Back navigation sizing — aligned with The People section */

/** Top-level section pages (e.g. back to Discover) */
export const sectionBackButtonClassName =
  "absolute left-3 top-3 z-30 grid h-9 w-9 place-items-center rounded-full border border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm xs:left-6 xs:top-6 xs:h-10 xs:w-10 xs:border-2 lg:h-11 lg:w-11";

export const sectionBackIconClassName = "h-4 w-4 xs:h-5 xs:w-5";

/** Detail / sub-section pages (e.g. back to parent section) */
export const detailBackButtonClassName =
  "absolute left-[clamp(1rem,2cqw,2rem)] top-[clamp(1rem,2cqh,2rem)] z-30 grid h-[clamp(2.8rem,4.4cqw,3.8rem)] w-[clamp(2.8rem,4.4cqw,3.8rem)] place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm rtl:left-auto rtl:right-[clamp(1rem,2cqw,2rem)]";

export const detailBackIconSize = 32;

export const detailBackIconClassName = "rtl:rotate-180";

/** Scaled 1400px canvas pages (Government, Parliament, Presidency) */
export const systemCanvasBackButtonClassName =
  "system-detail-back absolute left-6 top-5 z-30 grid h-10 w-10 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm rtl:left-auto rtl:right-6";

export const systemCanvasBackIconSize = 20;
