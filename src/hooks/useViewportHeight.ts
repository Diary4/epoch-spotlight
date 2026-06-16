import { useEffect } from "react";

/**
 * Keeps --viewport-height in sync with window.innerHeight.
 * Android kiosk browsers often report 100dvh incorrectly on large portrait displays.
 */
export function useViewportHeight() {
  useEffect(() => {
    const update = () => {
      document.documentElement.style.setProperty(
        "--viewport-height",
        `${window.innerHeight}px`,
      );
    };

    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    window.visualViewport?.addEventListener("resize", update);

    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, []);
}
