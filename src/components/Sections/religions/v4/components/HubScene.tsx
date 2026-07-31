import { motion } from "motion/react";
import { Pointer } from "lucide-react";
import type { Chapter, ThreadId, ThreadsAction } from "../threadsTypes";
import { SCENE_TRANSITION } from "../threadsTypes";
import {
  HUB_LAYOUT,
  HUB_LINKS,
  HUB_SPOKES,
  HUB_SUN_PATH,
  HUB_TAIL,
  type Segment,
} from "../hubLayout";
import ThreadPortal from "./ThreadPortal";

const THREAD_ORDER: ThreadId[] = [
  "faiths",
  "nations",
  "rights",
  "sharedLife",
  "coexistence",
];

type HubSceneProps = {
  chapters: Record<ThreadId, Chapter>;
  hubBackground: string;
  copy: {
    hubEyebrow: string;
    hubTitle: string;
    hubBody: string;
    hubQuote: string;
    hubInstruction: string;
    hubInstructionHint: string;
  };
  dispatch: React.Dispatch<ThreadsAction>;
};

function Rule({ tight = false }: { tight?: boolean }) {
  return (
    <div
      className={`tok-hub__rule${tight ? " tok-hub__rule--tight" : ""}`}
      aria-hidden="true"
    >
      <span />
      <i />
      <span />
    </div>
  );
}

function Thread({ x1, y1, x2, y2 }: Segment) {
  return (
    <>
      <line className="tok-thread-line" x1={x1} y1={y1} x2={x2} y2={y2} />
      <circle className="tok-thread-node" cx={x1} cy={y1} r={4} />
      <circle className="tok-thread-node" cx={x2} cy={y2} r={4} />
    </>
  );
}

export default function HubScene({
  chapters,
  hubBackground,
  copy,
  dispatch,
}: HubSceneProps) {
  const { centre, ring, sun, width, height } = HUB_LAYOUT;

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
        <Rule />
        <h1 id="tok-hub-title">{copy.hubTitle}</h1>
        <p className="tok-hub__body">{copy.hubBody}</p>
        <blockquote>{copy.hubQuote}</blockquote>
        <Rule tight />
      </header>
      {/* Drawn 1:1 in the portal layer's own space, from the same geometry the
          cards are placed with, so every thread lands on its card. */}
      <div className="tok-hub__web" aria-hidden="true">
        <svg viewBox={`0 0 ${width} ${height}`}>
          <line
            className="tok-thread-line tok-thread-line--soft"
            x1={HUB_TAIL.x1}
            y1={HUB_TAIL.y1}
            x2={HUB_TAIL.x2}
            y2={HUB_TAIL.y2}
          />
          <rect
            className="tok-thread-diamond"
            x={centre.x - 5}
            y={(HUB_TAIL.y1 + HUB_TAIL.y2) / 2 - 5}
            width={10}
            height={10}
            transform={`rotate(45 ${centre.x} ${(HUB_TAIL.y1 + HUB_TAIL.y2) / 2})`}
          />
          {HUB_LINKS.map((segment) => (
            <Thread key={`link-${segment.x1}-${segment.y1}`} {...segment} />
          ))}
          {HUB_SPOKES.map((segment) => (
            <Thread key={`spoke-${segment.x2}-${segment.y2}`} {...segment} />
          ))}
          <circle
            className="tok-thread-ring"
            cx={centre.x}
            cy={centre.y}
            r={ring.outer}
          />
          <circle
            className="tok-thread-ring tok-thread-ring--inner"
            cx={centre.x}
            cy={centre.y}
            r={ring.inner}
          />
          <g transform={`translate(${centre.x} ${centre.y})`}>
            <circle className="tok-sun__halo" r={sun.outer + 16} />
            <path className="tok-sun__rays" d={HUB_SUN_PATH} />
            <circle className="tok-sun__disc" r={sun.disc} />
          </g>
        </svg>
      </div>
      <div className="tok-hub__portals">
        {THREAD_ORDER.map((threadId) => (
          <ThreadPortal
            key={threadId}
            chapter={chapters[threadId]}
            position={HUB_LAYOUT.cards[threadId]}
            dispatch={dispatch}
          />
        ))}
      </div>
      <div className="tok-hub__instruction">
        <Pointer aria-hidden="true" />
        <p>{copy.hubInstruction}</p>
        <span>{copy.hubInstructionHint}</span>
      </div>
    </motion.section>
  );
}
