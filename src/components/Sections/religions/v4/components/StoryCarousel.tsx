import { useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Chapter, ThreadsAction } from "../threadsTypes";
import type { ThreadsCopy } from "../threadsCopy";
import { SCENE_TRANSITION } from "../threadsTypes";

type StoryCarouselProps = {
  chapter: Chapter;
  storyIndex: number;
  copy: ThreadsCopy;
  dispatch: React.Dispatch<ThreadsAction>;
};

export default function StoryCarousel({
  chapter,
  storyIndex,
  copy,
  dispatch,
}: StoryCarouselProps) {
  const dragRef = useRef(false);
  const story = chapter.stories[storyIndex];
  const hasDetail = story.detailCards.length > 0;
  const fullFrame = story.imageFit === "contain";
  const previousStory =
    chapter.stories[
      (storyIndex - 1 + chapter.stories.length) % chapter.stories.length
    ];
  const nextStory =
    chapter.stories[(storyIndex + 1) % chapter.stories.length];

  const goPrevious = () =>
    dispatch({ type: "PREVIOUS_STORY", storyCount: chapter.stories.length });
  const goNext = () =>
    dispatch({ type: "NEXT_STORY", storyCount: chapter.stories.length });

  return (
    <div className="tok-carousel">
      <button
        type="button"
        className="tok-carousel__peek tok-carousel__peek--previous"
        onClick={goPrevious}
        aria-label={`${copy.previous}: ${previousStory.title}`}
      >
        <img src={previousStory.image} alt="" />
        <span>{previousStory.title}</span>
      </button>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.button
          key={story.id}
          type="button"
          className={`tok-story-card${hasDetail ? "" : " tok-story-card--static"}${
            fullFrame ? " tok-story-card--full" : ""
          }`}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.16}
          onDragStart={() => {
            dragRef.current = true;
          }}
          onDragEnd={(_, info) => {
            if (info.offset.x < -80 || info.velocity.x < -420) goNext();
            if (info.offset.x > 80 || info.velocity.x > 420) goPrevious();
            window.setTimeout(() => {
              dragRef.current = false;
            }, 50);
          }}
          onClick={() => {
            if (!dragRef.current && hasDetail) dispatch({ type: "OPEN_STORY" });
          }}
          initial={{ opacity: 0, x: 80, rotateY: -4 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          exit={{ opacity: 0, x: -80, rotateY: 4 }}
          transition={SCENE_TRANSITION}
          whileTap={hasDetail ? { scale: 0.992 } : undefined}
          aria-label={
            hasDetail ? `${copy.openStory}: ${story.title}` : story.title
          }
        >
          {/* Blurred over-scaled copy so a letterboxed photo still fills the
              arch instead of leaving flat slabs above and below it. */}
          {fullFrame ? (
            <img className="tok-story-card__fill" src={story.image} alt="" aria-hidden="true" />
          ) : null}
          <img
            className="tok-story-card__photo"
            src={story.image}
            alt={story.title}
            style={{ objectPosition: story.imagePosition ?? "center" }}
          />
          <span className="tok-story-card__veil" />
          <span className="tok-story-card__index">
            {String(storyIndex + 1).padStart(2, "0")} /{" "}
            {String(chapter.stories.length).padStart(2, "0")}
          </span>
          <span className="tok-story-card__copy">
            <b>{story.title}</b>
            <span>{story.body}</span>
            {hasDetail ? (
              <em>
                {copy.openStory}
                <ArrowRight aria-hidden="true" />
              </em>
            ) : null}
          </span>
        </motion.button>
      </AnimatePresence>
      <button
        type="button"
        className="tok-carousel__peek tok-carousel__peek--next"
        onClick={goNext}
        aria-label={`${copy.next}: ${nextStory.title}`}
      >
        <img src={nextStory.image} alt="" />
        <span>{nextStory.title}</span>
      </button>
      <button
        type="button"
        className="tok-carousel__arrow tok-carousel__arrow--previous"
        onClick={goPrevious}
        aria-label={copy.previous}
      >
        <ArrowLeft aria-hidden="true" />
      </button>
      <button
        type="button"
        className="tok-carousel__arrow tok-carousel__arrow--next"
        onClick={goNext}
        aria-label={copy.next}
      >
        <ArrowRight aria-hidden="true" />
      </button>
      <div className="tok-carousel__progress" aria-hidden="true">
        {chapter.stories.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={index === storyIndex ? "is-active" : ""}
            onClick={() => dispatch({ type: "SELECT_STORY", storyIndex: index })}
            tabIndex={-1}
          >
            <span style={{ "--progress": index === storyIndex ? 1 : 0 } as React.CSSProperties} />
          </button>
        ))}
      </div>
    </div>
  );
}
