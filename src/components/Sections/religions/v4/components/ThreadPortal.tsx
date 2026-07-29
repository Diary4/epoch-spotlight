import { motion } from "motion/react";
import { type LucideIcon } from "lucide-react";
import type { Chapter, ThreadsAction } from "../threadsTypes";

type ThreadPortalProps = {
  chapter: Chapter;
  icon: LucideIcon;
  dispatch: React.Dispatch<ThreadsAction>;
};

export default function ThreadPortal({
  chapter,
  icon: Icon,
  dispatch,
}: ThreadPortalProps) {
  return (
    <motion.button
      type="button"
      className={`tok-thread-portal tok-thread-portal--${chapter.id}`}
      style={{ "--thread-accent": chapter.accent } as React.CSSProperties}
      onClick={() => dispatch({ type: "OPEN_THREAD", threadId: chapter.id })}
      whileTap={{ scale: 0.975 }}
      aria-label={`${chapter.title}. ${chapter.line}`}
    >
      <span className="tok-thread-portal__image">
        <img src={chapter.hero} alt="" />
        <span className="tok-thread-portal__shade" />
        <span className="tok-thread-portal__number">{chapter.number}</span>
        {isVisited ? (
          <span className="tok-thread-portal__visited">
            <Check aria-hidden="true" />
          </span>
        ) : null}
      </span>
      <span className="tok-thread-portal__copy">
        <Icon aria-hidden="true" />
        <span>
          <b>{chapter.title}</b>
          <small>{chapter.line}</small>
        </span>
      </span>
    </motion.button>
  );
}
