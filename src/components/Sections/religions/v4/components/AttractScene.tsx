import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { threadsAssets } from "../threadsAssets";
import type { ThreadsCopy } from "../threadsCopy";
import type { ThreadsAction } from "../threadsTypes";
import { SCENE_TRANSITION } from "../threadsTypes";

type AttractSceneProps = {
  copy: ThreadsCopy;
  dispatch: React.Dispatch<ThreadsAction>;
};

export default function AttractScene({ copy, dispatch }: AttractSceneProps) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reduceMotion) {
      video.pause();
      return;
    }

    const tryPlay = () => {
      video.play().catch(() => {
        // Autoplay can be blocked; the poster frame still reads as the backdrop.
      });
    };

    tryPlay();
    const onVisibility = () => {
      if (document.hidden) video.pause();
      else tryPlay();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [reduceMotion]);

  return (
    <motion.section
      className="tok-scene tok-attract"
      aria-labelledby="tok-attract-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={SCENE_TRANSITION}
    >
      {reduceMotion ? (
        <img
          src={threadsAssets.attract}
          alt=""
          className="tok-attract__image"
        />
      ) : (
        <video
          ref={videoRef}
          className="tok-attract__image"
          src={threadsAssets.attractVideo}
          poster={threadsAssets.attract}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      )}
      <div className="tok-attract__veil" />
      <div className="tok-attract__grain" />
      <div className="tok-attract__content">
        <p className="tok-eyebrow">{copy.attractEyebrow}</p>
        <h1 id="tok-attract-title">
          <span>{copy.attractTitle}</span>
        </h1>
        <p className="tok-attract__caption">
          {copy.attractCaption[0]}
        </p>
      </div>
      <button
        type="button"
        className="tok-enter"
        onClick={() => dispatch({ type: "ENTER" })}
      >
        <span className="tok-enter__pulse" aria-hidden="true" />
        <span>
          <b>{copy.enter}</b>
          <small>{copy.enterHint}</small>
        </span>
        <ArrowRight className="tok-enter__arrow" aria-hidden="true" />
      </button>
    </motion.section>
  );
}
