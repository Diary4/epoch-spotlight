import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Chapter, ThreadsAction } from "../threadsTypes";
import type { ThreadsCopy } from "../threadsCopy";
import { SCENE_TRANSITION } from "../threadsTypes";
import Signature from "./Signature";

type StorySceneProps = {
  chapter: Chapter;
  storyIndex: number;
  detailIndex: number;
  copy: ThreadsCopy;
  dispatch: React.Dispatch<ThreadsAction>;
  bottomNav: React.ReactNode;
};

export default function StoryScene({
  chapter,
  storyIndex,
  detailIndex,
  copy,
  dispatch,
  bottomNav,
}: StorySceneProps) {
  const story = chapter.stories[storyIndex];
  const cards = story.detailCards;
  const card = cards[detailIndex] ?? cards[0];

  const goPrevious = () =>
    dispatch({ type: "PREVIOUS_DETAIL", detailCount: cards.length });
  const goNext = () =>
    dispatch({ type: "NEXT_DETAIL", detailCount: cards.length });

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
        transition={{ duration: 0.42 }}
      />
      <div className="tok-story__image-veil" />
      <div className="tok-story__grain" />
      <header className="tok-story__topline">
        <Signature />
        <span>
          {chapter.number} · {chapter.title}
        </span>
      </header>
      <motion.header
        className="tok-story__collection-heading"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...SCENE_TRANSITION, delay: 0.04 }}
      >
        <p className="tok-eyebrow">{copy.collectionLabel}</p>
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
          <div className="tok-detail-card__visual">
            <img
              src={card.image}
              alt={card.title}
              style={{ objectPosition: card.imagePosition ?? "center" }}
            />
            <span className="tok-detail-card__shade" aria-hidden="true" />
            <span className="tok-detail-card__count">
              {String(detailIndex + 1).padStart(2, "0")} /{" "}
              {String(cards.length).padStart(2, "0")}
            </span>
            <span className="tok-detail-card__eyebrow">
              {copy.cardLabel} · {card.eyebrow}
            </span>
          </div>
          <div className="tok-detail-card__copy">
            <h2 id="tok-story-title">{card.title}</h2>
            <span aria-hidden="true" />
            <p>{card.body}</p>
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
            aria-label={`${index + 1}. ${item.title}`}
            aria-current={index === detailIndex ? "step" : undefined}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <b>{item.title}</b>
          </button>
        ))}
      </div>
      <div className="tok-story__stepper">
        <button
          type="button"
          onClick={goPrevious}
          aria-label={`${copy.previous}: ${
            cards[(detailIndex - 1 + cards.length) % cards.length].title
          }`}
        >
          <ArrowLeft aria-hidden="true" />
          <span>{copy.previous}</span>
        </button>
        <div>
          <b>
            {detailIndex + 1} / {cards.length}
          </b>
          <small>{copy.collectionHint}</small>
        </div>
        <button
          type="button"
          onClick={goNext}
          aria-label={`${copy.next}: ${
            cards[(detailIndex + 1) % cards.length].title
          }`}
        >
          <span>{copy.next}</span>
          <ArrowRight aria-hidden="true" />
        </button>
      </div>
      {bottomNav}
    </motion.section>
  );
}
