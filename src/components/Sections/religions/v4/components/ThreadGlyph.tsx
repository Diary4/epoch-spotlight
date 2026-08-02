import type { ThreadId } from "../threadsTypes";

/**
 * One line glyph per thread, drawn on a shared 24×24 grid with the same stroke
 * weight so the five seals on the hub read as a single engraved set.
 */
const GLYPHS: Record<ThreadId, React.ReactNode> = {
  faiths: (
    <>
      <path d="M4.6 20.6v-8.4c0-3.6 2.9-6.9 7.4-9.2 4.5 2.3 7.4 5.6 7.4 9.2v8.4" />
      <path d="M9.5 20.6v-4.9c0-1.5 1.1-2.7 2.5-2.7s2.5 1.2 2.5 2.7v4.9" />
      <path d="M2.9 20.6h18.2" />
    </>
  ),
  nations: (
    <>
      <circle cx="12" cy="7.4" r="2.5" />
      <path d="M7.4 20.6c0-3 2.1-5.2 4.6-5.2s4.6 2.2 4.6 5.2" />
      <circle cx="4.9" cy="10.4" r="1.8" />
      <path d="M1.8 20.6c0-2.4 1.4-4.1 3.1-4.1" />
      <circle cx="19.1" cy="10.4" r="1.8" />
      <path d="M22.2 20.6c0-2.4-1.4-4.1-3.1-4.1" />
    </>
  ),
  coexistence: (
    <>
      <circle cx="8.8" cy="12" r="5.6" />
      <circle cx="15.2" cy="12" r="5.6" />
    </>
  ),
  sharedLife: (
    <>
      <circle cx="12" cy="12" r="4.1" />
      <path d="M12 2.4v2.9M12 18.7v2.9M2.4 12h2.9M18.7 12h2.9M5.2 5.2l2.1 2.1M16.7 16.7l2.1 2.1M18.8 5.2l-2.1 2.1M7.3 16.7l-2.1 2.1" />
    </>
  ),
  rights: (
    <>
      <path d="M12 4.4v16.2M8.2 20.6h7.6M4.6 8h14.8" />
      <path d="M2.2 8 4.6 13.2 7 8" />
      <path d="M17 8l2.4 5.2L21.8 8" />
      <circle cx="12" cy="4.4" r="1.4" />
    </>
  ),
};

export default function ThreadGlyph({ threadId }: { threadId: ThreadId }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {GLYPHS[threadId]}
    </svg>
  );
}
