import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import type { ThreadsCopy } from "../threadsCopy";
import type { ThreadsAction, ThreadsState } from "../threadsTypes";
import { LANGUAGE_OPTIONS } from "../threadsTypes";

type LanguageOverlayProps = {
  state: ThreadsState;
  copy: ThreadsCopy;
  dispatch: React.Dispatch<ThreadsAction>;
};

/**
 * Language as a veil over the current scene — same interaction as BCF:
 * English · Kurdish · Arabic in a row, each in its own script. Entry has no
 * close; reopening from the rail does.
 */
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
          aria-label={copy.chooseLanguage}
          dir="ltr"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {state.languageOrigin === "control" ? (
            <motion.button
              type="button"
              className="tok-language__close"
              onClick={() => dispatch({ type: "CLOSE_LANGUAGE" })}
              aria-label={copy.back}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <X aria-hidden="true" />
            </motion.button>
          ) : null}

          <div className="tok-language__stage">
            <motion.div
              className="tok-language__options"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              {LANGUAGE_OPTIONS.map((option) => {
                const isCurrent =
                  state.languageOrigin === "control" &&
                  option.code === state.lang;

                return (
                  <motion.button
                    key={option.code}
                    type="button"
                    className={
                      isCurrent
                        ? "tok-language__option is-current"
                        : "tok-language__option"
                    }
                    onClick={() =>
                      dispatch({ type: "SELECT_LANGUAGE", lang: option.code })
                    }
                    whileTap={{ scale: 0.982 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    lang={option.code}
                    dir={option.code === "en" ? "ltr" : "rtl"}
                  >
                    {option.native}
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
