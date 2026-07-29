import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, X } from "lucide-react";
import type { ThreadsCopy } from "../threadsCopy";
import type { ThreadsAction, ThreadsState } from "../threadsTypes";
import { LANGUAGE_OPTIONS, SCENE_TRANSITION } from "../threadsTypes";

type LanguageOverlayProps = {
  state: ThreadsState;
  copy: ThreadsCopy;
  dispatch: React.Dispatch<ThreadsAction>;
};

export default function LanguageOverlay({
  state,
  copy,
  dispatch,
}: LanguageOverlayProps) {
  return (
    <AnimatePresence>
      {state.languageOpen ? (
        <motion.div
          className="tok-language"
          role="dialog"
          aria-modal="true"
          aria-labelledby="tok-language-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="tok-language__panel"
            initial={{ opacity: 0, y: 48, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={SCENE_TRANSITION}
          >
            {state.languageOrigin === "control" ? (
              <button
                type="button"
                className="tok-language__close"
                onClick={() => dispatch({ type: "CLOSE_LANGUAGE" })}
                aria-label={copy.back}
              >
                <X aria-hidden="true" />
              </button>
            ) : null}
            <span className="tok-language__kicker">THREADS OF KURDISTAN</span>
            <div className="tok-language__ornament" aria-hidden="true">
              <span />
              <SparklesIcon />
              <span />
            </div>
            <h2 id="tok-language-title">{copy.chooseLanguage}</h2>
            <p>{copy.chooseLanguageHint}</p>
            <div className="tok-language__options">
              {LANGUAGE_OPTIONS.map((option, index) => (
                <button
                  key={option.code}
                  type="button"
                  className={
                    state.lang === option.code
                      ? "tok-language__option is-current"
                      : "tok-language__option"
                  }
                  onClick={() =>
                    dispatch({ type: "SELECT_LANGUAGE", lang: option.code })
                  }
                >
                  <span className="tok-language__number">0{index + 1}</span>
                  <span className="tok-language__native" lang={option.code}>
                    {option.native}
                  </span>
                  <span className="tok-language__latin">{option.label}</span>
                  <ArrowRight aria-hidden="true" />
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function SparklesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3l1.2 4.2L17.5 8.5 13.2 9.7 12 14l-1.2-4.3L6.5 8.5l4.3-1.3L12 3z" />
      <path d="M19 14l.8 2.8L22.5 18l-2.7.8L19 21.5l-.8-2.7L15.5 18l2.7-.2L19 14z" />
    </svg>
  );
}
