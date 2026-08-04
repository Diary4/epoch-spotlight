import { motion } from "motion/react";
import type { Chapter, ThreadsAction } from "../threadsTypes";
import ThreadGlyph from "./ThreadGlyph";

type ThreadPortalProps = {
  chapter: Chapter;
  position: { x: number; y: number };
  dispatch: React.Dispatch<ThreadsAction>;
};

export default function ThreadPortal({
  chapter,
  position,
  dispatch,
}: ThreadPortalProps) {
  return (
    <motion.button
      type="button"
      className={`tok-thread-portal tok-thread-portal--${chapter.id}`}
      style={
        {
          "--thread-accent": chapter.accent,
          insetInlineStart: `${position.x}px`,
          top: `${position.y}px`,
        } as React.CSSProperties
      }
      onClick={() => dispatch({ type: "OPEN_THREAD", threadId: chapter.id })}
      whileTap={{ scale: 0.975 }}
      aria-label={`${chapter.title}. ${chapter.line}`}
    >
      <span className="tok-thread-portal__card">
        {/* The photo now carries the whole card — title included — instead of
            handing off to a cream panel underneath it. */}
        <span className="tok-thread-portal__image">
          <img src={chapter.hero} alt="" />
          <span className="tok-thread-portal__shade" />
          <b>{chapter.title}</b>
        </span>
        {/* The seal caps the thread that arrives at the card's bottom rim. */}
        <span className="tok-thread-portal__seal" aria-hidden="true">
          <ThreadGlyph threadId={chapter.id} />
        </span>
      </span>
    </motion.button>
  );
}
