/**
 * Stops decorative videos from decoding while they are off-screen.
 *
 * Every hero video in the app is a muted, looping, autoplaying background layer.
 * Chrome keeps decoding those as long as they are attached, even when the page
 * has been scrolled a full screen past them — on the kiosk panel that means the
 * GPU is decoding a 1080p60 stream nobody can see, which is exactly the budget
 * the visible animations need.
 *
 * Rather than wiring an observer into each of the fourteen components that own a
 * video, this installs one pair of observers for the whole document. A single
 * implementation cannot drift between call sites, and components stay unchanged.
 *
 * Deliberate constraints, so behaviour is preserved exactly:
 *
 * - Only videos that are `muted` **and** `loop` **and** `autoplay` are managed.
 *   Those are decorative by construction: nothing in the UI reports their
 *   position, so a pause is unobservable. A video under explicit user control
 *   would never match, and is left alone.
 * - Only videos *we* paused are ever resumed, tracked in `pausedByUs`. A video
 *   that was already paused for its own reasons stays paused.
 * - `rootMargin` keeps a full viewport of slack on each side, so a video is
 *   paused only once it is comfortably outside the visible area and is running
 *   again well before it scrolls back in. Combined with `loop`, the seam is not
 *   observable: playback continues from where it stopped, as it would have if
 *   it had never been interrupted.
 */

const MANAGED = new WeakSet<HTMLVideoElement>();
const pausedByUs = new WeakSet<HTMLVideoElement>();

let observer: IntersectionObserver | null = null;
let mutationObserver: MutationObserver | null = null;
let refCount = 0;

function isDecorative(video: HTMLVideoElement): boolean {
  return video.muted && video.loop && video.autoplay;
}

function onIntersection(entries: IntersectionObserverEntry[]) {
  for (const entry of entries) {
    const video = entry.target as HTMLVideoElement;
    if (entry.isIntersecting) {
      if (pausedByUs.has(video)) {
        pausedByUs.delete(video);
        // Autoplay policy can still refuse; the video simply stays paused then,
        // which is the same outcome as the original code's `.catch(() => {})`.
        void video.play().catch(() => {});
      }
    } else if (!video.paused) {
      pausedByUs.add(video);
      video.pause();
    }
  }
}

function track(video: HTMLVideoElement) {
  if (MANAGED.has(video) || !isDecorative(video)) return;
  MANAGED.add(video);
  observer?.observe(video);
}

function scan(root: ParentNode) {
  if (root instanceof HTMLVideoElement) {
    track(root);
    return;
  }
  const videos = (root as Element).querySelectorAll?.("video");
  if (videos) for (const video of videos) track(video as HTMLVideoElement);
}

/**
 * Starts the document-wide observers. Idempotent and reference counted, so a
 * second caller (e.g. React fast-refresh remounting the app) does not install a
 * duplicate set of observers.
 */
export function startVideoAutopause(): () => void {
  refCount += 1;

  if (!observer) {
    observer = new IntersectionObserver(onIntersection, {
      // One viewport of slack: pause well after leaving, resume well before entry.
      rootMargin: "100% 0px 100% 0px",
      threshold: 0,
    });

    mutationObserver = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) scan(node as Element);
        }
        // `autoplay`/`muted`/`loop` are set by React after the node is inserted
        // in some paths, so re-check the target when they change.
        if (record.type === "attributes" && record.target instanceof HTMLVideoElement) {
          track(record.target);
        }
      }
    });
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributeFilter: ["muted", "loop", "autoplay", "src"],
    });

    scan(document.body);
  }

  return () => {
    refCount -= 1;
    if (refCount > 0) return;
    observer?.disconnect();
    mutationObserver?.disconnect();
    observer = null;
    mutationObserver = null;
  };
}
