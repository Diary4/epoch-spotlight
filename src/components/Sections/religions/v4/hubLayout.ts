import type { ThreadId } from "./threadsTypes";

/**
 * Geometry for the hub constellation, expressed in the portal layer's own
 * 1080×1206 space. The cards and the SVG web are both driven from these
 * numbers, so a thread always meets the card it points at.
 */
export const HUB_LAYOUT = {
  width: 1080,
  height: 1196,
  centre: { x: 540, y: 463 },
  card: { width: 250, height: 366, radiusTop: 64, radiusBottom: 52 },
  badge: 29,
  sun: { rays: 21, outer: 66, inner: 28, disc: 30 },
  ring: { inner: 104, outer: 148 },
  cards: {
    faiths: { x: 415, y: 0 },
    nations: { x: 100, y: 280 },
    rights: { x: 730, y: 280 },
    sharedLife: { x: 185, y: 700 },
    coexistence: { x: 645, y: 700 },
  } satisfies Record<ThreadId, { x: number; y: number }>,
} as const;

const { centre, card, cards, ring, badge } = HUB_LAYOUT;

export type Segment = { x1: number; y1: number; x2: number; y2: number };
type Corner = { x: number; y: number; r: number };

const unit = (dx: number, dy: number) => {
  const length = Math.hypot(dx, dy) || 1;
  return { x: dx / length, y: dy / length };
};

/** A spoke that leaves the outer ring and stops at `to`. */
function spoke(to: { x: number; y: number }): Segment {
  const u = unit(to.x - centre.x, to.y - centre.y);
  return {
    x1: centre.x + u.x * ring.outer,
    y1: centre.y + u.y * ring.outer,
    x2: to.x,
    y2: to.y,
  };
}

/** Where a line from the centre meets a card's rounded corner. */
function onCorner({ x, y, r }: Corner) {
  const u = unit(x - centre.x, y - centre.y);
  return { x: x - u.x * r, y: y - u.y * r };
}

/** The stretch of open paper between two rounded corners. */
function between(a: Corner, b: Corner): Segment {
  const u = unit(b.x - a.x, b.y - a.y);
  return {
    x1: a.x + u.x * a.r,
    y1: a.y + u.y * a.r,
    x2: b.x - u.x * b.r,
    y2: b.y - u.y * b.r,
  };
}

const corner = (
  id: ThreadId,
  side: "top-left" | "top-right" | "bottom-left" | "bottom-right",
): Corner => {
  const { x, y } = cards[id];
  const top = side.startsWith("top");
  const r = top ? card.radiusTop : card.radiusBottom;
  return {
    x: side.endsWith("left") ? x + r : x + card.width - r,
    y: top ? y + r : y + card.height - r,
    r,
  };
};

/** Threads that run from the medallion out to each card. */
export const HUB_SPOKES: Segment[] = [
  // Straight up to the rim of the Faiths badge.
  spoke({
    x: cards.faiths.x + card.width / 2,
    y: cards.faiths.y + card.height + badge,
  }),
  // Sideways to the inner edge of the two mid cards.
  spoke({ x: cards.nations.x + card.width, y: centre.y }),
  spoke({ x: cards.rights.x, y: centre.y }),
  // Diagonally to the inner top corner of the two lower cards.
  spoke(onCorner(corner("sharedLife", "top-right"))),
  spoke(onCorner(corner("coexistence", "top-left"))),
];

/** Short links that tie the upper card to its neighbours. */
export const HUB_LINKS: Segment[] = [
  between(corner("faiths", "bottom-left"), corner("nations", "top-right")),
  between(corner("faiths", "bottom-right"), corner("rights", "top-left")),
];

/** The tail that carries the eye from the medallion down to the prompt. */
export const HUB_TAIL: Segment = {
  x1: centre.x,
  y1: centre.y + ring.outer,
  x2: centre.x,
  y2: HUB_LAYOUT.height - 12,
};

/**
 * The 21-ray sun, drawn once at module scope in its own centred viewBox.
 */
export const HUB_SUN_PATH = (() => {
  const { rays, outer, inner } = HUB_LAYOUT.sun;
  const step = (Math.PI * 2) / rays;
  const half = step * 0.42;
  let d = "";
  for (let i = 0; i < rays; i += 1) {
    const angle = -Math.PI / 2 + i * step;
    const at = (a: number, r: number) =>
      `${(Math.cos(a) * r).toFixed(2)} ${(Math.sin(a) * r).toFixed(2)}`;
    d += `M${at(angle - half, inner)}L${at(angle, outer)}L${at(angle + half, inner)}Z`;
  }
  return d;
})();
