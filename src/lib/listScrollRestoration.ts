export const TOURISTIC_LIST_KEY = "touristic";

export function touristicPlaceAnchorId(placeId: string) {
  return `touristic-place-${placeId}`;
}

type ScrollSnapshot = {
  y: number;
  category: string;
  placeId?: string;
};

function storageKey(routeKey: string) {
  return `epoch-scroll:${routeKey}`;
}

export function saveListScrollPosition(
  routeKey: string,
  category: string,
  placeId?: string,
) {
  const snapshot: ScrollSnapshot = {
    y: window.scrollY,
    category,
    ...(placeId ? { placeId } : {}),
  };
  sessionStorage.setItem(storageKey(routeKey), JSON.stringify(snapshot));
}

export function readListScrollPosition(routeKey: string): ScrollSnapshot | null {
  const raw = sessionStorage.getItem(storageKey(routeKey));
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as ScrollSnapshot;
    if (typeof parsed.y === "number" && typeof parsed.category === "string") {
      return parsed;
    }
  } catch {
    // ignore malformed storage
  }

  return null;
}

function scrollToPlaceAnchor(placeId: string): boolean {
  const el = document.getElementById(touristicPlaceAnchorId(placeId));
  if (!el) return false;

  el.scrollIntoView({ block: "center" });
  return true;
}

/** Single attempt — may return false if the page is not tall enough yet. */
export function restoreListScrollPosition(
  routeKey: string,
  categoryId: string,
): boolean {
  const snapshot = readListScrollPosition(routeKey);
  if (!snapshot || snapshot.category !== categoryId) return false;

  if (snapshot.placeId && scrollToPlaceAnchor(snapshot.placeId)) {
    return true;
  }

  const maxScroll = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight,
  );
  if (snapshot.y > maxScroll + 8) return false;

  window.scrollTo(0, snapshot.y);
  return true;
}

/** Retries until content height allows scrolling to the saved place. */
export function restoreListScrollPositionWithRetry(
  routeKey: string,
  categoryId: string,
  onDone?: () => void,
  maxAttempts = 48,
) {
  const snapshot = readListScrollPosition(routeKey);
  if (!snapshot || snapshot.category !== categoryId) {
    onDone?.();
    return;
  }

  let attempts = 0;

  const tick = () => {
    attempts += 1;
    restoreListScrollPosition(routeKey, categoryId);

    const maxScroll = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight,
    );
    const heightReady = snapshot.y <= maxScroll + 8;
    const anchorReady = snapshot.placeId
      ? !!document.getElementById(touristicPlaceAnchorId(snapshot.placeId))
      : true;
    const scrollOk =
      heightReady &&
      anchorReady &&
      (snapshot.y < 80 || window.scrollY >= Math.min(snapshot.y, maxScroll) - 24);

    if (scrollOk || attempts >= maxAttempts) {
      onDone?.();
      return;
    }

    requestAnimationFrame(tick);
  };

  tick();
}
