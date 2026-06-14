import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { isFullscreenActive, requestAppFullscreen } from "@/lib/fullscreen";

const INTERACTION_EVENTS = ["pointerdown", "keydown", "touchstart"] as const;

export function useAppFullscreen() {
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      return;
    }

    let active = true;

    const tryEnterFullscreen = () => {
      if (!active || isFullscreenActive()) {
        return;
      }

      void requestAppFullscreen();
    };

    const onFirstInteraction = () => {
      void requestAppFullscreen().then((entered) => {
        if (!entered) {
          return;
        }

        INTERACTION_EVENTS.forEach((eventName) => {
          document.removeEventListener(eventName, onFirstInteraction, true);
        });
      });
    };

    tryEnterFullscreen();

    INTERACTION_EVENTS.forEach((eventName) => {
      document.addEventListener(eventName, onFirstInteraction, true);
    });

    return () => {
      active = false;
      INTERACTION_EVENTS.forEach((eventName) => {
        document.removeEventListener(eventName, onFirstInteraction, true);
      });
    };
  }, []);
}
