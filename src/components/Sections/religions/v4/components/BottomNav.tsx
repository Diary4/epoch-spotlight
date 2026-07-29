import {
  ArrowLeft,
  Globe2,
  Home,
  Sparkles,
} from "lucide-react";
import type { ThreadsCopy } from "../threadsCopy";
import type { SceneState, ThreadsAction } from "../threadsTypes";
import { THREAD_IDS } from "../threadsTypes";

type BottomNavProps = {
  copy: ThreadsCopy;
  scene: SceneState;
  visitedCount: number;
  dispatch: React.Dispatch<ThreadsAction>;
};

export default function BottomNav({
  copy,
  scene,
  visitedCount,
  dispatch,
}: BottomNavProps) {
  const isHub = scene.kind === "hub";
  const isClosing = scene.kind === "closing";
  const isStory = scene.kind === "story";

  return (
    <nav
      className={`tok-bottom-nav ${isStory ? "tok-bottom-nav--story" : ""}`}
      aria-label="Experience controls"
    >
      <button type="button" onClick={() => dispatch({ type: "BACK" })}>
        <ArrowLeft aria-hidden="true" />
        <span>{copy.back}</span>
      </button>
      <button
        type="button"
        className={isHub ? "is-active" : ""}
        onClick={() => dispatch({ type: "HOME" })}
        aria-current={isHub ? "page" : undefined}
      >
        <Home aria-hidden="true" />
        <span>{copy.home}</span>
      </button>
      {!isStory ? (
        <span className="tok-bottom-nav__progress" aria-live="polite">
          <b>
            {visitedCount} / {THREAD_IDS.length}
          </b>
          <small>{copy.visited}</small>
        </span>
      ) : null}
      <button type="button" onClick={() => dispatch({ type: "OPEN_LANGUAGE" })}>
        <Globe2 aria-hidden="true" />
        <span>{copy.language}</span>
      </button>
      {!isStory ? (
        <button
          type="button"
          className={isClosing ? "is-active" : ""}
          onClick={() => dispatch({ type: "OPEN_CLOSING" })}
          aria-current={isClosing ? "page" : undefined}
        >
          <Sparkles aria-hidden="true" />
          <span>{copy.closing}</span>
        </button>
      ) : null}
    </nav>
  );
}
