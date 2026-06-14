type FullscreenElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void>;
  mozRequestFullScreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
};

type FullscreenDocument = Document & {
  webkitFullscreenElement?: Element | null;
  mozFullScreenElement?: Element | null;
  msFullscreenElement?: Element | null;
};

export function isFullscreenActive(): boolean {
  const doc = document as FullscreenDocument;
  return Boolean(
    doc.fullscreenElement ?? doc.webkitFullscreenElement ?? doc.mozFullScreenElement ?? doc.msFullscreenElement,
  );
}

export async function requestAppFullscreen(): Promise<boolean> {
  if (isFullscreenActive()) {
    return true;
  }

  const el = document.documentElement as FullscreenElement;
  const request =
    el.requestFullscreen?.bind(el) ??
    el.webkitRequestFullscreen?.bind(el) ??
    el.mozRequestFullScreen?.bind(el) ??
    el.msRequestFullscreen?.bind(el);

  if (!request) {
    return false;
  }

  try {
    await request();
    return isFullscreenActive();
  } catch {
    return false;
  }
}
