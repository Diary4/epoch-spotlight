/**
 * Coalesces a callback to at most once per animation frame.
 *
 * The design-artboard canvases recompute their scale from a `resize` listener
 * *and* a `ResizeObserver` on two elements. A single window resize therefore ran
 * the same measurement three or four times, and each run reads `offsetHeight`
 * after having written `style.minHeight` — a forced synchronous layout per call.
 * On the kiosk panel that showed up as a burst of layout work on every rotation,
 * soft-keyboard open and container resize.
 *
 * Wrapping the measurement in this scheduler keeps the *result* identical — the
 * same function, the same reads, the same state — while collapsing the burst into
 * one run per frame, timed to when the browser is about to lay out anyway.
 */
export function rafSchedule<T extends (...args: never[]) => void>(fn: T) {
  let frame = 0;

  const scheduled = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      fn();
    });
  };

  /** Runs `fn` now and drops any pending frame — for the initial measurement. */
  scheduled.flush = () => {
    if (frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
    fn();
  };

  /** Cancels a pending run. Call from effect cleanup so nothing fires after unmount. */
  scheduled.cancel = () => {
    if (frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  };

  return scheduled;
}
