import { motion } from "motion/react";
import {
  Church,
  HeartHandshake,
  Scale,
  Sparkles,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import type { Chapter, ThreadId, ThreadsAction } from "../threadsTypes";
import { SCENE_TRANSITION } from "../threadsTypes";
import ThreadPortal from "./ThreadPortal";
import WovenMark from "./WovenMark";

const THREAD_ICONS: Record<ThreadId, LucideIcon> = {
  faiths: Church,
  nations: UsersRound,
  coexistence: HeartHandshake,
  sharedLife: Sparkles,
  rights: Scale,
};

const THREAD_ORDER: ThreadId[] = [
  "faiths",
  "nations",
  "coexistence",
  "sharedLife",
  "rights",
];

type HubSceneProps = {
  chapters: Record<ThreadId, Chapter>;
  visited: ThreadId[];
  hubBackground: string;
  copy: {
    hubEyebrow: string;
    hubTitle: string;
    hubBody: string;
    hubQuote: string;
    hubInstruction: string;
  };
  dispatch: React.Dispatch<ThreadsAction>;
};

export default function HubScene({
  chapters,
  visited,
  hubBackground,
  copy,
  dispatch,
}: HubSceneProps) {
  return (
    <motion.section
      className="tok-scene tok-hub"
      aria-labelledby="tok-hub-title"
      initial={{ opacity: 0, scale: 1.015 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.985 }}
      transition={SCENE_TRANSITION}
    >
      <img src={hubBackground} alt="" className="tok-hub__background" />
      <div className="tok-hub__wash" />
      <div className="tok-hub__grain" />
      <header className="tok-hub__header">
        <p className="tok-eyebrow">{copy.hubEyebrow}</p>
        <h1 id="tok-hub-title">{copy.hubTitle}</h1>
        <p className="tok-hub__body">{copy.hubBody}</p>
        <blockquote>{copy.hubQuote}</blockquote>
      </header>
      {/* Drawn 1:1 in the portal container's 1080×1290 space so the threads
          land on the portal images without any preserveAspectRatio guesswork. */}
      <div className="tok-hub__threads" aria-hidden="true">
        <svg viewBox="0 0 1080 1290" preserveAspectRatio="none">
          <path
            className="tok-path tok-path--faiths"
            d="M540 645 C452 520 336 360 244 210"
          />
          <path
            className="tok-path tok-path--nations"
            d="M540 645 C628 520 744 360 836 210"
          />
          <path
            className="tok-path tok-path--shared"
            d="M540 645 C452 770 336 900 244 1010"
          />
          <path
            className="tok-path tok-path--rights"
            d="M540 645 C628 770 744 900 836 1010"
          />
        </svg>
      </div>
      <div className="tok-hub__loom">
        <WovenMark />
      </div>
      <div className="tok-hub__portals">
        {THREAD_ORDER.map((threadId) => (
          <ThreadPortal
            key={threadId}
            chapter={chapters[threadId]}
            icon={THREAD_ICONS[threadId]}
            isVisited={visited.includes(threadId)}
            dispatch={dispatch}
          />
        ))}
      </div>
      <div className="tok-hub__instruction">
        <span aria-hidden="true" />
        <p>{copy.hubInstruction}</p>
        <span aria-hidden="true" />
      </div>
    </motion.section>
  );
}
