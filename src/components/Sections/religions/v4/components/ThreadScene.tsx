import { motion } from "motion/react";
import type { Chapter, ThreadsAction } from "../threadsTypes";
import type { ThreadsCopy } from "../threadsCopy";
import { SCENE_TRANSITION } from "../threadsTypes";
import StoryCarousel from "./StoryCarousel";

type ThreadSceneProps = {
  chapter: Chapter;
  storyIndex: number;
  copy: ThreadsCopy;
  dispatch: React.Dispatch<ThreadsAction>;
  bottomNav: React.ReactNode;
};

export default function ThreadScene({
  chapter,
  storyIndex,
  copy,
  dispatch,
  bottomNav,
}: ThreadSceneProps) {
  return (
    <motion.section
      className="tok-scene tok-thread"
      style={{ "--thread-accent": chapter.accent } as React.CSSProperties}
      aria-labelledby="tok-thread-title"
      initial={{ opacity: 0, x: 42 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -42 }}
      transition={SCENE_TRANSITION}
    >
      <img src={chapter.hero} alt="" className="tok-thread__background" />
      <div className="tok-thread__wash" />
      <div className="tok-thread__grain" />
      <header className="tok-thread__header">
        <span className="tok-thread__number">{chapter.number}</span>
        <div>
          <p className="tok-eyebrow">{copy.threadLabel}</p>
          <h1 id="tok-thread-title">{chapter.title}</h1>
          <p>{chapter.description}</p>
        </div>
        <span className="tok-thread__line">{chapter.line}</span>
      </header>
      <StoryCarousel
        chapter={chapter}
        storyIndex={storyIndex}
        copy={copy}
        dispatch={dispatch}
      />
      <p className="tok-thread__instruction">{copy.storyInstruction}</p>
      {bottomNav}
    </motion.section>
  );
}
