import { motion } from "motion/react";
import type { Chapter, ThreadsAction } from "../threadsTypes";

type ThreadPortalProps = {
  chapter: Chapter;
  position: { x: number; y: number };
  dispatch: React.Dispatch<ThreadsAction>;
};

/**
 * Captions read as two short lines. A dotted list drops its last segment to
 * line two — the separator disappears with the break — and a plain phrase
 * breaks after its first word instead.
 */
function splitCaption(line: string): [string, string] {
  const cut = line.includes("·") ? line.lastIndexOf("·") : line.indexOf(" ");
  if (cut < 0) return [line, ""];
  return [line.slice(0, cut).trim(), line.slice(cut + 1).trim()];
}

export default function ThreadPortal({
  chapter,
  position,
  dispatch,
}: ThreadPortalProps) {
  const [lead, tail] = splitCaption(chapter.line);

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
        <span className="tok-thread-portal__image">
          <img src={chapter.hero} alt="" />
          <span className="tok-thread-portal__shade" />
        </span>
        <span className="tok-thread-portal__copy">
          <b>{chapter.title}</b>
          <small>
            <span>{lead}</span>
            {tail ? <span>{tail}</span> : null}
          </small>
        </span>
      </span>
    </motion.button>
  );
}
