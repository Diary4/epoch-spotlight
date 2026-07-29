import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { threadsAssets } from "../threadsAssets";
import type { ThreadsCopy } from "../threadsCopy";
import type { ThreadsAction } from "../threadsTypes";
import { SCENE_TRANSITION } from "../threadsTypes";
import Signature from "./Signature";
import WovenMark from "./WovenMark";

type ClosingSceneProps = {
  copy: ThreadsCopy;
  dispatch: React.Dispatch<ThreadsAction>;
  bottomNav: React.ReactNode;
};

export default function ClosingScene({
  copy,
  dispatch,
  bottomNav,
}: ClosingSceneProps) {
  return (
    <motion.section
      className="tok-scene tok-closing"
      aria-labelledby="tok-closing-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={SCENE_TRANSITION}
    >
      <img src={threadsAssets.closing} alt="" className="tok-closing__image" />
      <div className="tok-closing__veil" />
      <div className="tok-closing__grain" />
      <header className="tok-closing__header">
        <Signature />
        <span className="tok-museum-index">05 / SHARED FUTURE</span>
      </header>
      <div className="tok-closing__copy">
        <p className="tok-eyebrow">{copy.closingEyebrow}</p>
        <h1 id="tok-closing-title">{copy.closingTitle}</h1>
      </div>
      <div className="tok-closing__loom">
        <WovenMark complete />
        <div className="tok-closing__core">
          <b>{copy.closingCore}</b>
          <small>{copy.closingCoreHint}</small>
        </div>
      </div>
      <div className="tok-closing__statements">
        {copy.closingLines.map((line, index) => (
          <motion.p
            key={line}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SCENE_TRANSITION, delay: 0.45 + index * 0.14 }}
          >
            <span>0{index + 1}</span>
            {line}
          </motion.p>
        ))}
      </div>
      <button
        type="button"
        className="tok-closing__return"
        onClick={() => dispatch({ type: "HOME" })}
      >
        <Sparkles aria-hidden="true" />
        <span>{copy.returnToThreads}</span>
        <ArrowRight aria-hidden="true" />
      </button>
      {bottomNav}
    </motion.section>
  );
}
