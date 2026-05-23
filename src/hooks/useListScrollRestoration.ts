import { useEffect, useLayoutEffect, useRef } from "react";
import {
  readListScrollPosition,
  restoreListScrollPositionWithRetry,
  saveListScrollPosition,
} from "@/lib/listScrollRestoration";

/**
 * Persists list scroll while scrolling and restores when returning from a detail page.
 * Saves on scroll (not only unmount) so navigation does not overwrite with y=0.
 */
export function useListScrollRestoration(
  routeKey: string,
  categoryId: string,
  onRestored?: () => void,
) {
  const categoryRef = useRef(categoryId);
  categoryRef.current = categoryId;

  useEffect(() => {
    if (!("scrollRestoration" in history)) return;
    const previous = history.scrollRestoration;
    history.scrollRestoration = "manual";
    return () => {
      history.scrollRestoration = previous;
    };
  }, []);

  useEffect(() => {
    let throttleId: ReturnType<typeof setTimeout> | null = null;

    const persist = () => {
      saveListScrollPosition(routeKey, categoryRef.current);
    };

    const onScroll = () => {
      if (throttleId !== null) return;
      throttleId = setTimeout(() => {
        throttleId = null;
        persist();
      }, 100);
    };

    persist();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (throttleId !== null) clearTimeout(throttleId);
      window.removeEventListener("scroll", onScroll);
    };
  }, [routeKey]);

  useLayoutEffect(() => {
    const snapshot = readListScrollPosition(routeKey);
    if (!snapshot || snapshot.category !== categoryId) return;

    restoreListScrollPositionWithRetry(routeKey, categoryId, onRestored);
  }, [routeKey, categoryId, onRestored]);
}
