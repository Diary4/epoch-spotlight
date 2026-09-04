import React from "react";

/**
 * A pan-and-zoom camera over a drawing that never moves.
 *
 * The Region map is one vector plate — governorate rings, districts, water,
 * roads, streets, all in the projection recovered in bcfMapGeometry.ts — and
 * this is the window onto it. Nothing here knows what is being drawn; it owns
 * a translate and a scale, the gestures that change them, and the two numbers
 * the rest of the screen needs back.
 *
 * Three things it does deliberately.
 *
 * It writes the transform to the DOM itself rather than through React. A pinch
 * is sixty state updates a second, and a state update on this screen re-runs a
 * component holding a hundred thousand path commands. The camera lives in a
 * ref, the transform is one `style.transform` write per frame, and React only
 * hears about the things that actually change what is mounted — the detail
 * tier and which cities are on screen.
 *
 * It publishes `--bcf-inv-k`, the reciprocal of the scale, on the same element.
 * Everything that must stay the size it looks — a road's stroke, a city's name,
 * a pin — multiplies by that variable in CSS instead of being re-rendered.
 * Roads that thicken with the zoom stop being roads at the third doubling.
 *
 * And it only takes the gesture when the gesture is the map's. One finger on an
 * unzoomed map scrolls the page, because this plate sits two thirds of the way
 * down a 1920-tall screen and a visitor who cannot scroll past it is stuck.
 * Once it is zoomed in, the finger is panning.
 */

export type BcfCameraState = { x: number; y: number; k: number };

/**
 * The two boxes the camera works in, measured rather than read per frame.
 *
 * `plate` is the drawing at k = 1; `plane` is the window it is seen through.
 * Both are measured by a ResizeObserver and cached, because everything that
 * wanted them — the clamp, the scale bar, the culling — wanted them on every
 * frame of a gesture, and `offsetWidth` on every frame is a style recalculation
 * on every frame.
 */
export type BcfCameraBox = {
  plateW: number;
  plateH: number;
  planeW: number;
  planeH: number;
  /**
   * Where the plate's own top-left sits inside the window, in layout pixels.
   *
   * The plate holds the Region's aspect ratio and the window does not, so the
   * plate is letterboxed inside it — and the transform is measured from the
   * *plate's* corner while a finger is measured from the window's. Without this
   * offset a pinch is anchored a couple of hundred pixels above the finger, and
   * the map slides away from whatever the visitor was reaching for.
   */
  offsetX: number;
  offsetY: number;
  /**
   * Rendered pixels per layout pixel.
   *
   * Every BCF screen is drawn on a 1080-wide artboard that `FitScaledCanvas`
   * scales to the panel — 2× on the 4K kiosk. `clientX` arrives in rendered
   * pixels and `transform: translate()` is applied in layout pixels, so a drag
   * measured in one and applied in the other moves the map at twice the speed
   * of the finger.
   */
  scale: number;
};

/** Metres per degree of latitude, over the projection's units per degree. */
const KM_PER_UNIT = 111.32 / 283.23;

/** The plate's width in projection units — BCF_MAP_VIEWBOX.width. */
const PLATE_UNITS = 1120;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** A tap is a tap while it has travelled less than this many CSS pixels. */
const TAP_SLOP = 10;
const DOUBLE_TAP_MS = 320;

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Where one axis of the plate is allowed to sit.
 *
 * Two regimes, and they have to meet without a step. While the plate is smaller
 * than the window along this axis it is centred in it — that is the letterboxed
 * rest state the Region map opens on. Once the zoom has made it larger, it may
 * be panned but never dragged clear of an edge, the way any map behaves. At the
 * crossover the two give the same answer, so the map grows through it rather
 * than jumping.
 */
function clampAxis(
  t: number,
  offset: number,
  plateSize: number,
  planeSize: number,
  k: number,
) {
  const span = plateSize * k;
  if (span <= planeSize) return planeSize / 2 - offset - span / 2;
  return clamp(t, planeSize - offset - span, -offset);
}

type Options = {
  /** The clipping viewport: the box gestures are read from. */
  planeRef: React.RefObject<HTMLDivElement | null>;
  /** The plate that carries the transform. Its layout box is the k=1 view. */
  contentRef: React.RefObject<HTMLDivElement | null>;
  minZoom?: number;
  maxZoom?: number;
  /**
   * Called on every frame the camera moves, off React. Use it for anything
   * continuous — the scale bar, the detail tier, viewport culling — and set
   * state from it only when the answer actually changes.
   */
  onCamera?: (camera: BcfCameraState, box: BcfCameraBox) => void;
};

export type BcfMapCamera = {
  /** Multiply the zoom about the centre of the plane. */
  zoomBy: (factor: number) => void;
  /** Back to the whole Region, animated. */
  reset: () => void;
  /** Put a point given in plate fractions (0–1) in the middle, at this zoom. */
  focus: (fx: number, fy: number, k: number) => void;
  /**
   * Re-publish the camera without moving it.
   *
   * `onCamera` is what decides which cities are close enough to be drawn, and
   * it only runs when the camera moves. A detail layer that finishes loading
   * while the visitor is holding still would otherwise sit there unmounted
   * until they nudged the map.
   */
  refresh: () => void;
  /** Whether the gesture that just ended was a drag rather than a tap. */
  dragged: React.RefObject<boolean>;
  /** Pixels per kilometre at the current zoom — for a scale bar. */
  pxPerKm: () => number;
  min: number;
  max: number;
};

export function useBcfMapCamera({
  planeRef,
  contentRef,
  minZoom = 1,
  maxZoom = 16,
  onCamera,
}: Options): BcfMapCamera {
  const cam = React.useRef<BcfCameraState>({ x: 0, y: 0, k: 1 });
  const settle = React.useRef(0);
  const pointers = React.useRef(new Map<number, { x: number; y: number }>());
  const dragged = React.useRef(false);
  const anim = React.useRef(0);
  const onCameraRef = React.useRef(onCamera);
  onCameraRef.current = onCamera;

  /* `offsetWidth` and not `getBoundingClientRect`, because the rect is the
     *transformed* box and this has to be the untransformed one — otherwise
     every clamp is scaled by the scale it is trying to clamp. */
  const box = React.useRef<BcfCameraBox>({
    plateW: 0,
    plateH: 0,
    planeW: 0,
    planeH: 0,
    offsetX: 0,
    offsetY: 0,
    scale: 1,
  });

  /**
   * The plate's untransformed box.
   *
   * `contentRef` carries the camera, so its own rect is the *transformed* one —
   * clamping against that would scale the clamp by the scale it is clamping.
   * Its parent is the letterbox frame: the same box, never transformed.
   */
  const frameOf = React.useCallback(
    () => contentRef.current?.parentElement ?? null,
    [contentRef],
  );

  const measure = React.useCallback(() => {
    const plate = contentRef.current;
    const plane = planeRef.current;
    const frame = frameOf();
    if (!plate || !plane || !frame) return;
    const frameRect = frame.getBoundingClientRect();
    const planeRect = plane.getBoundingClientRect();
    const measured =
      frame.offsetWidth > 0 ? frameRect.width / frame.offsetWidth : 1;
    const scale = measured > 0.001 ? measured : 1;
    box.current = {
      plateW: plate.offsetWidth,
      plateH: plate.offsetHeight,
      planeW: plane.clientWidth,
      planeH: plane.clientHeight,
      offsetX: (frameRect.left - planeRect.left) / scale,
      offsetY: (frameRect.top - planeRect.top) / scale,
      scale,
    };
  }, [contentRef, planeRef, frameOf]);

  const commit = React.useCallback(
    (next: BcfCameraState) => {
      const { plateW, plateH, planeW, planeH, offsetX, offsetY } = box.current;
      const k = clamp(next.k, minZoom, maxZoom);
      const state = {
        k,
        x: clampAxis(next.x, offsetX, plateW, planeW, k),
        y: clampAxis(next.y, offsetY, plateH, planeH, k),
      };
      cam.current = state;
      const el = contentRef.current;
      if (el) {
        el.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) scale(${state.k})`;
        el.style.setProperty("--bcf-inv-k", String(1 / state.k));
        /* Promoted only while it is actually moving. `will-change: transform`
           is what lets the compositor carry a pan instead of the main thread
           repainting the plate, but a promoted layer is a full-plate surface
           held in video memory — at kiosk scale a 2160×1700 one — and this
           screen already keeps three maps alive at once. So it goes on with the
           first frame of a gesture and comes off once the map is still. */
        el.style.willChange = "transform";
        clearTimeout(settle.current);
        settle.current = window.setTimeout(() => {
          if (contentRef.current) contentRef.current.style.willChange = "";
        }, 400);
      }
      onCameraRef.current?.(state, box.current);
    },
    [contentRef, minZoom, maxZoom],
  );

  /** Scale about a point given in plane-local pixels, keeping it still. */
  const scaleAbout = React.useCallback(
    (factor: number, px: number, py: number) => {
      const { x, y, k } = cam.current;
      const next = clamp(k * factor, minZoom, maxZoom);
      const ratio = next / k;
      commit({ k: next, x: px - (px - x) * ratio, y: py - (py - y) * ratio });
    },
    [commit, minZoom, maxZoom],
  );

  const animateTo = React.useCallback(
    (target: BcfCameraState, ms = 420) => {
      cancelAnimationFrame(anim.current);
      const from = { ...cam.current };
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / ms);
        const e = easeOut(t);
        commit({
          x: from.x + (target.x - from.x) * e,
          y: from.y + (target.y - from.y) * e,
          k: from.k + (target.k - from.k) * e,
        });
        if (t < 1) anim.current = requestAnimationFrame(step);
      };
      anim.current = requestAnimationFrame(step);
    },
    [commit],
  );

  /** The camera that puts plane-local point (px, py) still under a new scale. */
  const targetFor = React.useCallback(
    (factor: number, px: number, py: number): BcfCameraState => {
      const { x, y, k } = cam.current;
      const next = clamp(k * factor, minZoom, maxZoom);
      const ratio = next / k;
      const { plateW, plateH, planeW, planeH, offsetX, offsetY } = box.current;
      return {
        k: next,
        x: clampAxis(px - (px - x) * ratio, offsetX, plateW, planeW, next),
        y: clampAxis(py - (py - y) * ratio, offsetY, plateH, planeH, next),
      };
    },
    [minZoom, maxZoom],
  );

  React.useEffect(() => {
    const plane = planeRef.current;
    if (!plane) return;

    /* A pointer, in the plate's own untransformed layout pixels — the frame it
       is about to be translated in. Read per event rather than cached, because
       this plate sits two thirds of the way down a page that scrolls. */
    const local = (event: { clientX: number; clientY: number }) => {
      const frame = frameOf();
      if (!frame) return { x: 0, y: 0 };
      const rect = frame.getBoundingClientRect();
      const scale = box.current.scale || 1;
      return {
        x: (event.clientX - rect.left) / scale,
        y: (event.clientY - rect.top) / scale,
      };
    };

    let pinchDistance = 0;
    let travelled = 0;
    let lastTapAt = 0;
    let lastTapPoint = { x: 0, y: 0 };

    const centreOf = () => {
      const points = [...pointers.current.values()];
      const sum = points.reduce((a, p) => ({ x: a.x + p.x, y: a.y + p.y }), { x: 0, y: 0 });
      return { x: sum.x / points.length, y: sum.y / points.length };
    };

    const spreadOf = () => {
      const [a, b] = [...pointers.current.values()];
      return b ? Math.hypot(a.x - b.x, a.y - b.y) : 0;
    };

    const onPointerDown = (event: PointerEvent) => {
      /* The zoom buttons and the scale bar are laid out inside the window so
         they can ride its corners, but a finger on a button is pressing the
         button, not dragging the map underneath it. */
      const target = event.target as Element | null;
      if (target?.closest?.("[data-bcf-map-chrome]")) return;

      /* A finger on an unzoomed map belongs to the page, not to the map: this
         plate is two thirds of the way down a 1920-tall screen. The second
         finger always belongs to the map. */
      if (pointers.current.size === 0 && cam.current.k <= minZoom + 0.001) {
        pointers.current.set(event.pointerId, local(event));
        travelled = 0;
        return;
      }
      plane.setPointerCapture(event.pointerId);
      pointers.current.set(event.pointerId, local(event));
      if (pointers.current.size === 1) travelled = 0;
      if (pointers.current.size === 2) pinchDistance = spreadOf();
      cancelAnimationFrame(anim.current);
    };

    const onPointerMove = (event: PointerEvent) => {
      const previous = pointers.current.get(event.pointerId);
      if (!previous) return;
      const point = local(event);
      pointers.current.set(event.pointerId, point);

      if (pointers.current.size >= 2) {
        const spread = spreadOf();
        if (pinchDistance > 0 && spread > 0) {
          const centre = centreOf();
          scaleAbout(spread / pinchDistance, centre.x, centre.y);
          pinchDistance = spread;
          travelled += TAP_SLOP + 1;
          dragged.current = true;
        }
        return;
      }

      /* One finger, and the map is zoomed in — otherwise the page has it. */
      if (cam.current.k <= minZoom + 0.001) return;
      const dx = point.x - previous.x;
      const dy = point.y - previous.y;
      travelled += Math.hypot(dx, dy);
      if (travelled > TAP_SLOP) dragged.current = true;
      commit({ ...cam.current, x: cam.current.x + dx, y: cam.current.y + dy });
    };

    const endPointer = (event: PointerEvent) => {
      const point = pointers.current.get(event.pointerId);
      pointers.current.delete(event.pointerId);
      if (plane.hasPointerCapture?.(event.pointerId)) {
        plane.releasePointerCapture(event.pointerId);
      }
      if (pointers.current.size === 1) pinchDistance = 0;
      if (pointers.current.size > 0 || !point) return;

      if (travelled <= TAP_SLOP) {
        const now = performance.now();
        const near = Math.hypot(point.x - lastTapPoint.x, point.y - lastTapPoint.y) < 40;
        if (now - lastTapAt < DOUBLE_TAP_MS && near) {
          /* Double tap zooms toward the point, the way a map is expected to. */
          animateTo(targetFor(2.2, point.x, point.y));
          lastTapAt = 0;
          dragged.current = true;
        } else {
          lastTapAt = now;
          lastTapPoint = point;
        }
      }
      /* Cleared on the next frame, after the click this pointerup produces has
         had its chance to be swallowed by whatever it landed on. */
      requestAnimationFrame(() => {
        dragged.current = false;
      });
    };

    /* Wheel is the workstation's pinch. The kiosk never sends one, but the
       screen is built and reviewed on a laptop. */
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const point = local(event);
      scaleAbout(Math.exp(-event.deltaY * 0.0016), point.x, point.y);
    };

    plane.addEventListener("pointerdown", onPointerDown);
    plane.addEventListener("pointermove", onPointerMove);
    plane.addEventListener("pointerup", endPointer);
    plane.addEventListener("pointercancel", endPointer);
    plane.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      plane.removeEventListener("pointerdown", onPointerDown);
      plane.removeEventListener("pointermove", onPointerMove);
      plane.removeEventListener("pointerup", endPointer);
      plane.removeEventListener("pointercancel", endPointer);
      plane.removeEventListener("wheel", onWheel);
      cancelAnimationFrame(anim.current);
      clearTimeout(settle.current);
    };
  }, [planeRef, frameOf, commit, scaleAbout, animateTo, targetFor, minZoom]);

  /* The boxes are measured, not assumed: the plate is sized from the plane it
     is handed, and the plane changes with the language row above it. A resize
     with the camera left alone would leave the clamp holding a stale box. */
  React.useEffect(() => {
    measure();
    commit(cam.current);
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => {
      measure();
      commit(cam.current);
    });
    if (contentRef.current) observer.observe(contentRef.current);
    if (planeRef.current) observer.observe(planeRef.current);
    return () => observer.disconnect();
  }, [contentRef, planeRef, measure, commit]);

  return React.useMemo(
    () => ({
      zoomBy: (factor: number) => {
        const { planeW, planeH, offsetX, offsetY } = box.current;
        animateTo(
          targetFor(factor, planeW / 2 - offsetX, planeH / 2 - offsetY),
          300,
        );
      },
      reset: () => animateTo({ x: 0, y: 0, k: minZoom }, 480),
      refresh: () => commit(cam.current),
      focus: (fx: number, fy: number, k: number) => {
        const { plateW, plateH, planeW, planeH, offsetX, offsetY } = box.current;
        const next = clamp(k, minZoom, maxZoom);
        animateTo({
          k: next,
          x: clampAxis(
            planeW / 2 - offsetX - fx * plateW * next,
            offsetX,
            plateW,
            planeW,
            next,
          ),
          y: clampAxis(
            planeH / 2 - offsetY - fy * plateH * next,
            offsetY,
            plateH,
            planeH,
            next,
          ),
        });
      },
      dragged,
      pxPerKm: () => {
        const { plateW } = box.current;
        return plateW ? ((plateW / PLATE_UNITS) * cam.current.k) / KM_PER_UNIT : 0;
      },
      min: minZoom,
      max: maxZoom,
    }),
    [animateTo, targetFor, commit, minZoom, maxZoom],
  );
}
