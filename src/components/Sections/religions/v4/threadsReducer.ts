import {
  THREAD_IDS,
  type ThreadId,
  type ThreadsAction,
  type ThreadsLang,
  type ThreadsState,
} from "./threadsTypes";

export function createInitialThreadsState(lang: ThreadsLang = "en"): ThreadsState {
  return {
    scene: { kind: "attract" },
    lang,
    languageOpen: false,
    languageOrigin: "entry",
    visited: [],
  };
}

const wrapIndex = (index: number, count: number) =>
  count <= 0 ? 0 : ((index % count) + count) % count;

const markVisited = (visited: ThreadId[], threadId: ThreadId) =>
  visited.includes(threadId) ? visited : [...visited, threadId];

export function threadsReducer(
  state: ThreadsState,
  action: ThreadsAction,
): ThreadsState {
  switch (action.type) {
    case "ENTER":
      return { ...state, languageOpen: true, languageOrigin: "entry" };
    case "SELECT_LANGUAGE":
      return {
        ...state,
        lang: action.lang,
        languageOpen: false,
        scene:
          state.languageOrigin === "entry" ? { kind: "hub" } : state.scene,
      };
    case "OPEN_LANGUAGE":
      return { ...state, languageOpen: true, languageOrigin: "control" };
    case "CLOSE_LANGUAGE":
      return state.languageOrigin === "entry"
        ? state
        : { ...state, languageOpen: false };
    case "OPEN_THREAD":
      return {
        ...state,
        scene: { kind: "thread", threadId: action.threadId, storyIndex: 0 },
        visited: markVisited(state.visited, action.threadId),
      };
    case "SELECT_STORY":
      return state.scene.kind !== "thread"
        ? state
        : { ...state, scene: { ...state.scene, storyIndex: action.storyIndex } };
    case "OPEN_STORY":
      return state.scene.kind !== "thread"
        ? state
        : {
            ...state,
            scene: { ...state.scene, kind: "story", detailIndex: 0 },
          };
    case "NEXT_STORY":
      return state.scene.kind !== "thread"
        ? state
        : {
            ...state,
            scene: {
              ...state.scene,
              storyIndex: wrapIndex(
                state.scene.storyIndex + 1,
                action.storyCount,
              ),
            },
          };
    case "PREVIOUS_STORY":
      return state.scene.kind !== "thread"
        ? state
        : {
            ...state,
            scene: {
              ...state.scene,
              storyIndex: wrapIndex(
                state.scene.storyIndex - 1,
                action.storyCount,
              ),
            },
          };
    case "SELECT_DETAIL":
      return state.scene.kind !== "story"
        ? state
        : { ...state, scene: { ...state.scene, detailIndex: action.detailIndex } };
    case "NEXT_DETAIL":
      return state.scene.kind !== "story"
        ? state
        : {
            ...state,
            scene: {
              ...state.scene,
              detailIndex: wrapIndex(
                state.scene.detailIndex + 1,
                action.detailCount,
              ),
            },
          };
    case "PREVIOUS_DETAIL":
      return state.scene.kind !== "story"
        ? state
        : {
            ...state,
            scene: {
              ...state.scene,
              detailIndex: wrapIndex(
                state.scene.detailIndex - 1,
                action.detailCount,
              ),
            },
          };
    case "BACK":
      if (state.scene.kind === "story") {
        return {
          ...state,
          scene: {
            kind: "thread",
            threadId: state.scene.threadId,
            storyIndex: state.scene.storyIndex,
          },
        };
      }
      if (state.scene.kind === "thread" || state.scene.kind === "closing") {
        return { ...state, scene: { kind: "hub" } };
      }
      if (state.scene.kind === "hub") {
        return { ...state, scene: { kind: "attract" } };
      }
      return state;
    case "HOME":
      return { ...state, scene: { kind: "hub" }, languageOpen: false };
    case "OPEN_CLOSING":
      return { ...state, scene: { kind: "closing" }, languageOpen: false };
    case "RESET":
      return createInitialThreadsState(state.lang);
    default:
      return state;
  }
}

export function sceneKey(scene: ThreadsState["scene"]) {
  if (scene.kind === "story") {
    return `${scene.kind}-${scene.threadId}-${scene.storyIndex}-${scene.detailIndex}`;
  }
  if (scene.kind === "thread") {
    return `${scene.kind}-${scene.threadId}-${scene.storyIndex}`;
  }
  return scene.kind;
}

export { THREAD_IDS };
