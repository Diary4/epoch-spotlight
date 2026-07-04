import { useCallback, useEffect, useRef, useState } from "react";
import { Capacitor } from "@capacitor/core";
import { canRequestAppFullscreen, isFullscreenActive, requestAppFullscreen } from "@/lib/fullscreen";

const INTERACTION_EVENTS = ["pointerdown", "click", "keydown", "touchstart"] as const;

function isWebPlatform() {
  return !Capacitor.isNativePlatform();
}

export function useAppFullscreen(pathname = "/") {
  const [showGate, setShowGate] = useState(false);
  const gateDismissedRef = useRef(false);
  const skipGate = pathname === "/" || pathname.startsWith("/__dev/");

  const dismissGate = useCallback(() => {
    gateDismissedRef.current = true;
    setShowGate(false);
  }, []);

  const enterFullscreen = useCallback(() => {
    if (!isWebPlatform() || isFullscreenActive()) {
      return Promise.resolve(true);
    }

    if (!canRequestAppFullscreen()) {
      return Promise.resolve(false);
    }

    return requestAppFullscreen();
  }, []);

  useEffect(() => {
    if (!isWebPlatform()) {
      return;
    }

    let active = true;
    gateDismissedRef.current = false;

    const onFirstInteraction = () => {
      void enterFullscreen();
      dismissGate();

      INTERACTION_EVENTS.forEach((eventName) => {
        document.removeEventListener(eventName, onFirstInteraction, true);
      });
    };

    void enterFullscreen().then((entered) => {
      if (!active || gateDismissedRef.current) {
        return;
      }

      if (entered) {
        setShowGate(false);
        return;
      }

      if (!skipGate && canRequestAppFullscreen()) {
        setShowGate(true);
      }
    });

    const onFullscreenChange = () => {
      if (!active || gateDismissedRef.current) {
        return;
      }

      if (isFullscreenActive()) {
        setShowGate(false);
      }
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    INTERACTION_EVENTS.forEach((eventName) => {
      document.addEventListener(eventName, onFirstInteraction, true);
    });

    return () => {
      active = false;
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      INTERACTION_EVENTS.forEach((eventName) => {
        document.removeEventListener(eventName, onFirstInteraction, true);
      });
    };
  }, [dismissGate, enterFullscreen, skipGate]);

  const onGateActivate = useCallback(() => {
    dismissGate();
    void enterFullscreen();
  }, [dismissGate, enterFullscreen]);

  return {
    showGate: isWebPlatform() && showGate && !skipGate,
    onGateActivate,
    enterFullscreen,
  };
}
