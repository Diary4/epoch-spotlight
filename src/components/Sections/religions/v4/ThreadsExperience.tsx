import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { AnimatePresence } from "motion/react";
import DesignScaledCanvas from "@/components/DesignScaledCanvas";
import { threadsCopy } from "./threadsCopy";
import { getThreadsChapters } from "./threadsChapters";
import {
  createInitialThreadsState,
  sceneKey,
  threadsReducer,
} from "./threadsReducer";
import type { ThreadId } from "./threadsTypes";
import { threadsAssets } from "./threadsAssets";
import AttractScene from "./components/AttractScene";
import HubScene from "./components/HubScene";
import ThreadScene from "./components/ThreadScene";
import StoryScene from "./components/StoryScene";
import ClosingScene from "./components/ClosingScene";
import LanguageOverlay from "./components/LanguageOverlay";
import IdleOverlay from "./components/IdleOverlay";
import ReachRail from "./components/ReachRail";
import "./threads.css";

function ThreadsExperienceInner() {
  const [state, dispatch] = useReducer(
    threadsReducer,
    undefined,
    () => createInitialThreadsState("en"),
  );
  const [idleCount, setIdleCount] = useState<number | null>(null);
  const copy = threadsCopy[state.lang];
  const direction = state.lang === "en" ? "ltr" : "rtl";
  const sceneId = sceneKey(state.scene);
  const chapters = useMemo(
    () => getThreadsChapters(state.lang),
    [state.lang],
  );

  const dismissIdle = useCallback(() => {
    setIdleCount(null);
    window.dispatchEvent(new CustomEvent("threads-user-activity"));
  }, []);

  useEffect(() => {
    if (state.scene.kind === "attract") {
      setIdleCount(null);
      return;
    }

    let warningTimeout = 0;
    let resetTimeout = 0;
    let countdownInterval = 0;

    const resetIdleTimers = () => {
      window.clearTimeout(warningTimeout);
      window.clearTimeout(resetTimeout);
      window.clearInterval(countdownInterval);
      setIdleCount(null);

      warningTimeout = window.setTimeout(() => {
        let remaining = 15;
        setIdleCount(remaining);
        countdownInterval = window.setInterval(() => {
          remaining -= 1;
          setIdleCount(Math.max(remaining, 0));
        }, 1000);
      }, 75_000);

      resetTimeout = window.setTimeout(() => {
        window.clearInterval(countdownInterval);
        setIdleCount(null);
        dispatch({ type: "RESET" });
      }, 90_000);
    };

    const onActivity = () => resetIdleTimers();
    resetIdleTimers();
    window.addEventListener("pointerdown", onActivity, { passive: true });
    window.addEventListener("keydown", onActivity);
    window.addEventListener("threads-user-activity", onActivity);

    return () => {
      window.clearTimeout(warningTimeout);
      window.clearTimeout(resetTimeout);
      window.clearInterval(countdownInterval);
      window.removeEventListener("pointerdown", onActivity);
      window.removeEventListener("keydown", onActivity);
      window.removeEventListener("threads-user-activity", onActivity);
    };
  }, [state.scene.kind]);

  useEffect(() => {
    const heading = document.querySelector(".tok-scene h1, .tok-scene h2");
    if (heading instanceof HTMLElement) heading.tabIndex = -1;
  }, [sceneId]);

  const threadId =
    state.scene.kind === "thread" || state.scene.kind === "story"
      ? state.scene.threadId
      : null;

  return (
    <main
      className={`tok-experience tok-experience--${state.lang}`}
      dir={direction}
      lang={state.lang}
      data-scene={state.scene.kind}
    >
      <div className="tok-sr-live" aria-live="polite">
        {state.scene.kind}
      </div>
      <div className="tok-stage">
        <AnimatePresence mode="wait">
          {state.scene.kind === "attract" ? (
            <AttractScene key="attract" copy={copy} dispatch={dispatch} />
          ) : null}
          {state.scene.kind === "hub" ? (
            <HubScene
              key="hub"
              chapters={chapters}
              copy={copy}
              dispatch={dispatch}
              hubBackground={threadsAssets.hub}
            />
          ) : null}
          {state.scene.kind === "thread" && threadId ? (
            <ThreadScene
              key={`thread-${threadId}`}
              chapter={chapters[threadId as ThreadId]}
              storyIndex={state.scene.storyIndex}
              copy={copy}
              dispatch={dispatch}
            />
          ) : null}
          {state.scene.kind === "story" && threadId ? (
            <StoryScene
              key={`story-${threadId}-${state.scene.storyIndex}`}
              chapter={chapters[threadId as ThreadId]}
              storyIndex={state.scene.storyIndex}
              detailIndex={state.scene.detailIndex}
              lang={state.lang}
              copy={copy}
              dispatch={dispatch}
            />
          ) : null}
          {state.scene.kind === "closing" ? (
            <ClosingScene key="closing" copy={copy} dispatch={dispatch} />
          ) : null}
        </AnimatePresence>
      </div>
      {/* Reach rail: persists across scenes and stays vertically centred so the
          controls sit in the comfortable zone of a portrait 65" screen. */}
      <ReachRail copy={copy} scene={state.scene} dispatch={dispatch} />
      <LanguageOverlay state={state} copy={copy} dispatch={dispatch} />
      <IdleOverlay count={idleCount} copy={copy} onContinue={dismissIdle} />
    </main>
  );
}

export default function ThreadsExperience() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Threads of Kurdistan — Epoch";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <DesignScaledCanvas
      fitViewport
      bgClassName="bg-[#f1eadc]"
      className="tok-canvas"
    >
      <ThreadsExperienceInner />
    </DesignScaledCanvas>
  );
}
