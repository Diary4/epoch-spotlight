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
import Signature from "./Signature";
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
  bottomNav: React.ReactNode;
};

export default function HubScene({
  chapters,
  visited,
  hubBackground,
  copy,
  dispatch,
  bottomNav,
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
        <Signature />
        <p className="tok-eyebrow">{copy.hubEyebrow}</p>
        <h1 id="tok-hub-title">{copy.hubTitle}</h1>
        <p className="tok-hub__body">{copy.hubBody}</p>
        <blockquote>{copy.hubQuote}</blockquote>
      </header>
      <div className="tok-hub__threads" aria-hidden="true">
        <svg viewBox="0 0 1080 1180" preserveAspectRatio="none">
          <path
            className="tok-path tok-path--faiths"
            d="M540 590 C420 500 315 360 188 175"
          />
          <path
            className="tok-path tok-path--nations"
            d="M540 590 C660 500 765 360 892 175"
          />
          <path
            className="tok-path tok-path--shared"
            d="M540 590 C420 700 315 870 188 1040"
          />
          <path
            className="tok-path tok-path--rights"
            d="M540 590 C660 700 765 870 892 1040"
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
      {bottomNav}
    </motion.section>
  );
}
