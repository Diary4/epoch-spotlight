import {
  ArrowLeft,
  Globe2,
  Home,
  Sparkles,
} from "lucide-react";
import type { ThreadsCopy } from "../threadsCopy";
import type { SceneState, ThreadsAction } from "../threadsTypes";
import { THREAD_IDS } from "../threadsTypes";

type ReachRailProps = {
  copy: ThreadsCopy;
  scene: SceneState;
  visitedCount: number;
  dispatch: React.Dispatch<ThreadsAction>;
};

/**
 * Vertical control rail. It sits beside the stage instead of under it so the
 * controls stay within arm's reach on a portrait 65" screen, where the bottom
 * edge of the panel is close to floor level.
 *
 * Hidden on the attract scene via `.tok-experience[data-scene="attract"]`.
 */
export default function ReachRail({
  copy,
  scene,
  visitedCount,
  dispatch,
}: ReachRailProps) {
  const isHub = scene.kind === "hub";
  const isClosing = scene.kind === "closing";

  return (
    <nav className="tok-rail" aria-label="Experience controls">
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
      <span className="tok-rail__progress" aria-live="polite">
        <b>
          {visitedCount} / {THREAD_IDS.length}
        </b>
        <small>{copy.visited}</small>
      </span>
      <button type="button" onClick={() => dispatch({ type: "OPEN_LANGUAGE" })}>
        <Globe2 aria-hidden="true" />
        <span>{copy.language}</span>
      </button>
      <button
        type="button"
        className={isClosing ? "is-active" : ""}
        onClick={() => dispatch({ type: "OPEN_CLOSING" })}
        aria-current={isClosing ? "page" : undefined}
      >
        <Sparkles aria-hidden="true" />
        <span>{copy.closing}</span>
      </button>
    </nav>
  );
}
