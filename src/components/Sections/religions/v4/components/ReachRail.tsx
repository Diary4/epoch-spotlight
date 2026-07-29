import { ArrowLeft, Globe2, Home } from "lucide-react";
import type { ThreadsCopy } from "../threadsCopy";
import type { SceneState, ThreadsAction } from "../threadsTypes";

type ReachRailProps = {
  copy: ThreadsCopy;
  scene: SceneState;
  dispatch: React.Dispatch<ThreadsAction>;
};

/**
 * Vertical control rail. It sits beside the stage instead of under it so the
 * controls stay within arm's reach on a portrait 65" screen, where the bottom
 * edge of the panel is close to floor level.
 *
 * Hidden on the attract scene via `.tok-experience[data-scene="attract"]`.
 */
export default function ReachRail({ copy, scene, dispatch }: ReachRailProps) {
  const isHub = scene.kind === "hub";

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
      <button type="button" onClick={() => dispatch({ type: "OPEN_LANGUAGE" })}>
        <Globe2 aria-hidden="true" />
        <span>{copy.language}</span>
      </button>
    </nav>
  );
}
