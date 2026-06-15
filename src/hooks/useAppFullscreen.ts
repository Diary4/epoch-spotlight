import { useCallback, useEffect, useState } from "react";
import { Capacitor } from "@capacitor/core";
import { isFullscreenActive, requestAppFullscreen } from "@/lib/fullscreen";

const INTERACTION_EVENTS = ["pointerdown", "click", "keydown", "touchstart"] as const;

function isWebPlatform() {
  return !Capacitor.isNativePlatform();
}

export function useAppFullscreen(pathname = "/") {
  const [showGate, setShowGate] = useState(false);
  const skipGate = pathname === "/";

  const enterFullscreen = useCallback(() => {
    if (!isWebPlatform() || isFullscreenActive()) {
      setShowGate(false);
      return Promise.resolve(true);
    }

    return requestAppFullscreen().then((entered) => {
      if (entered) {
        setShowGate(false);
      }
      return entered;
    });
  }, []);

  useEffect(() => {
    if (!isWebPlatform()) {
      return;
    }

    let active = true;

    const syncGate = () => {
      if (!active) {
        return;
      }
      setShowGate(!isFullscreenActive());
    };

    const onFirstInteraction = () => {
      void enterFullscreen().then((entered) => {
        if (!entered) {
          return;
        }

        INTERACTION_EVENTS.forEach((eventName) => {
          document.removeEventListener(eventName, onFirstInteraction, true);
        });
      });
    };

    void enterFullscreen().then((entered) => {
      if (!active) {
        return;
      }

      if (!entered && !skipGate) {
        setShowGate(true);
      }
    });

    document.addEventListener("fullscreenchange", syncGate);
    INTERACTION_EVENTS.forEach((eventName) => {
      document.addEventListener(eventName, onFirstInteraction, true);
    });

    return () => {
      active = false;
      document.removeEventListener("fullscreenchange", syncGate);
      INTERACTION_EVENTS.forEach((eventName) => {
        document.removeEventListener(eventName, onFirstInteraction, true);
      });
    };
  }, [enterFullscreen, skipGate]);

  const onGateActivate = useCallback(() => {
    void enterFullscreen();
  }, [enterFullscreen]);

  return {
    showGate: isWebPlatform() && showGate && !skipGate,
    onGateActivate,
    enterFullscreen,
  };
}
