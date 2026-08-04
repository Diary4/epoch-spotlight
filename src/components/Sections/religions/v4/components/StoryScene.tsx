import { AnimatePresence, motion } from "motion/react";
import { localizeDigits } from "@/lib/utils";
import type { Chapter, ThreadsAction } from "../threadsTypes";
import type { ThreadsCopy, ThreadsLang } from "../threadsCopy";
import { SCENE_TRANSITION } from "../threadsTypes";

type StorySceneProps = {
  chapter: Chapter;
  storyIndex: number;
  detailIndex: number;
  lang: ThreadsLang;
  copy: ThreadsCopy;
  dispatch: React.Dispatch<ThreadsAction>;
};

export default function StoryScene({
  chapter,
  storyIndex,
  detailIndex,
  lang,
  copy,
  dispatch,
}: StorySceneProps) {
  const story = chapter.stories[storyIndex];
  const cards = story.detailCards;
  const card = cards[detailIndex] ?? cards[0];

  return (
    <motion.section
      className="tok-scene tok-story"
      style={{ "--thread-accent": chapter.accent } as React.CSSProperties}
      aria-labelledby="tok-collection-title"
      initial={{ opacity: 0, scale: 1.025 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.985 }}
      transition={SCENE_TRANSITION}
    >
      <motion.img
        key={card.image}
        src={card.image}
        alt=""
        className="tok-story__image"
        style={{ objectPosition: card.imagePosition ?? "center" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 0.62 }}
      />
      <div className="tok-story__image-veil" />
      <div className="tok-story__grain" />
      <motion.header
        className="tok-story__collection-heading"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...SCENE_TRANSITION, delay: 0.08 }}
      >
        <h1 id="tok-collection-title">{story.title}</h1>
        <p>{story.body}</p>
      </motion.header>
      <AnimatePresence mode="wait" initial={false}>
        <motion.article
          key={card.id}
          className="tok-detail-card"
          initial={{ opacity: 0, x: 52, scale: 0.985 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -52, scale: 0.985 }}
          transition={SCENE_TRANSITION}
        >
          <div
            className={`tok-detail-card__visual${
              card.imageFit === "contain" ? " tok-detail-card__visual--contain" : ""
            }`}
          >
            <img
              src={card.image}
              alt={card.title}
              style={{
                objectFit: card.imageFit ?? "cover",
                objectPosition: card.imagePosition ?? "center",
              }}
            />
            <span className="tok-detail-card__shade" aria-hidden="true" />
            <div className="tok-detail-card__caption">
              <h2 id="tok-story-title">{card.title}</h2>
              <p>{card.body}</p>
            </div>
          </div>
        </motion.article>
      </AnimatePresence>
      <div className="tok-detail-selector" aria-label={copy.collectionLabel}>
        {cards.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={index === detailIndex ? "is-active" : ""}
            onClick={() => dispatch({ type: "SELECT_DETAIL", detailIndex: index })}
            aria-label={`${localizeDigits(String(index + 1), lang)}. ${item.title}`}
            aria-current={index === detailIndex ? "step" : undefined}
          >
            <span>
              {localizeDigits(String(index + 1).padStart(2, "0"), lang)}
            </span>
            <b>{item.title}</b>
          </button>
        ))}
      </div>
    </motion.section>
  );
}
