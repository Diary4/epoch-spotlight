import { AnimatePresence, motion } from "motion/react";
import type { ThreadsCopy } from "../threadsCopy";

type IdleOverlayProps = {
  count: number | null;
  copy: ThreadsCopy;
  onContinue: () => void;
};

export default function IdleOverlay({ count, copy, onContinue }: IdleOverlayProps) {
  return (
    <AnimatePresence>
      {count !== null ? (
        <motion.div
          className="tok-idle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="tok-idle__panel">
            <span>{count}</span>
            <h2>{copy.idleTitle}</h2>
            <p>{copy.idleBody}</p>
            <button type="button" onClick={onContinue}>
              {copy.idleContinue}
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
