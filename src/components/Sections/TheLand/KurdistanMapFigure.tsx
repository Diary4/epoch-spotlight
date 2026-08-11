import React from "react";
import {
  LAND_MAP_DISPUTED,
  LAND_MAP_GREATER,
  LAND_MAP_HOST_COUNTRIES,
  LAND_MAP_KHORASAN,
  LAND_MAP_LAKES,
  LAND_MAP_NEIGHBOURS,
  LAND_MAP_REGION,
  LAND_MAP_REGION_GOVERNORATES,
  LAND_MAP_VIEWBOX,
  landMapPoint,
} from "@/components/Sections/TheLand/kurdistanMapGeometry";
import {
  LAND_MAP_CLOSE_COUNTRY_LABELS,
  LAND_MAP_COLORS,
  LAND_MAP_COUNTRY_LABELS,
  LAND_MAP_PAPER,
  LAND_MAP_PLACES,
  LAND_MAP_WATER_LABELS,
  landMapCopy,
  type LandMapLayerId,
  type LandMapPlaceTier,
} from "@/components/Sections/TheLand/kurdistanMapContent";
import type { DiscoverLangCode } from "@/components/Sections/discoverLanguage";

/**
 * The drawn map that sits in a card on The Land, in place of the painted plate
 * that used to. Real boundaries — see kurdistanMapGeometry — with the three
 * layers a visitor is being shown always present and the card's own layer the
 * only one at full strength: Greater Kurdistan in gold, the Kurdistan Region in
 * green, the Kurdistani areas of Iraq in red.
 */

/**
 * The ground each card must show, whatever shape its slot turns out to be.
 * This is a minimum, not a crop: the window grows around it to match the card,
 * revealing more of the neighbours rather than cutting into the subject.
 */
const FRAMES: Record<LandMapLayerId, { west: number; east: number; south: number; north: number }> = {
  /* The three governorates, with a margin of Turkey, Iran and Iraq around. */
  region: { west: 41.9, east: 46.8, south: 34.4, north: 37.75 },
  /* Widened west and south to hold Sinjar and Khanaqin, the two Kurdistani
     districts furthest from the Region. */
  disputed: { west: 40.8, east: 46.8, south: 33.7, north: 37.75 },
  /* The homeland whole, from Afrin to the Zagros. */
  greater: { west: 35.8, east: 49.2, south: 31.5, north: 42.1 },
  /* All four states, out as far as the Khorasani Kurds. */
  presence: { west: 26.6, east: 63, south: 29.8, north: 43 },
};

/** Which pins a card carries. A strip 200px tall cannot hold twenty labels. */
const TIERS: Record<LandMapLayerId, LandMapPlaceTier[]> = {
  region: ["region", "disputed"],
  disputed: ["region", "disputed"],
  greater: ["region", "disputed", "greater"],
  presence: ["capital", "community"],
};

/**
 * Non-selected layers stay on the plate rather than disappearing — a card that
 * shows only its own colour cannot say how the three relate — but held back far
 * enough that the card's own subject is unmistakably the subject.
 */
const DIMMED = 0.5;

/** Legend rows, in the order the eye should take them. */
const LEGEND: LandMapLayerId[] = ["greater", "region", "disputed"];

type KurdistanMapFigureProps = {
  layer: LandMapLayerId;
  lang?: DiscoverLangCode;
  /** Off for the smallest slots, where three swatches would crowd the map. */
  legend?: boolean;
  className?: string;
};

export default function KurdistanMapFigure({
  layer,
  lang = "en",
  legend = true,
  className = "",
}: KurdistanMapFigureProps) {
  const hostRef = React.useRef<HTMLDivElement | null>(null);
  const [box, setBox] = React.useState({ width: 720, height: 240 });

  /* The card is a wide, short strip whose shape changes with the screen, so the
     window is cut to the box rather than the box letterboxed to a window: a
     fixed viewBox left either bands of empty sea or a map two sizes too small. */
  React.useLayoutEffect(() => {
    const node = hostRef.current;
    if (!node || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) setBox({ width, height });
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const copy = landMapCopy[lang];
  const frame = FRAMES[layer];
  const tiers = TIERS[layer];

  const view = React.useMemo(() => {
    const topLeft = landMapPoint(frame.west, frame.north);
    const bottomRight = landMapPoint(frame.east, frame.south);
    const frameWidth = bottomRight.x - topLeft.x;
    const frameHeight = bottomRight.y - topLeft.y;
    const boxAspect = box.width / Math.max(box.height, 1);

    /* Grow the window to the card's shape rather than cropping the frame to it.
       The same card is a 3:1 strip on a laptop and nearly square on the portrait
       panel; cropping meant Duhok and Halabja fell off the top and bottom of the
       Region's own card on the first of those. Growing reveals more of Turkey
       and Iran instead, which is never wrong on this map. */
    let width = Math.max(frameWidth, frameHeight * boxAspect);
    let height = width / boxAspect;
    /* Past the edge of the drawn world there is nothing but empty sea, so the
       window stops there and takes the crop it was avoiding. */
    if (width > LAND_MAP_VIEWBOX.width) {
      width = LAND_MAP_VIEWBOX.width;
      height = width / boxAspect;
    }
    if (height > LAND_MAP_VIEWBOX.height) {
      height = LAND_MAP_VIEWBOX.height;
      width = height * boxAspect;
    }

    const clamp = (value: number, max: number) => Math.min(Math.max(value, 0), Math.max(max, 0));
    return {
      x: clamp((topLeft.x + bottomRight.x) / 2 - width / 2, LAND_MAP_VIEWBOX.width - width),
      y: clamp((topLeft.y + bottomRight.y) / 2 - height / 2, LAND_MAP_VIEWBOX.height - height),
      width,
      height,
      /** User units per CSS pixel — what keeps type the same size at any zoom. */
      unit: width / Math.max(box.width, 1),
    };
  }, [frame, box.width, box.height]);

  /** Wide enough that a country can be named from its own middle. */
  const wide = layer === "greater" || layer === "presence";
  /* On the presence card the homeland is not a supporting layer — it is most of
     what "where Kurds are" means — so it keeps full strength beside the states. */
  const strength = (id: LandMapLayerId) =>
    layer === id || (layer === "presence" && id === "greater") ? 1 : DIMMED;
  const type = (size: number) => size * view.unit;

  return (
    <div
      ref={hostRef}
      className={`relative h-full w-full ${className}`}
      style={{ backgroundColor: LAND_MAP_PAPER.sea }}
    >
      <svg
        className="block h-full w-full"
        viewBox={`${view.x} ${view.y} ${view.width} ${view.height}`}
        /* The page flips for Kurdish and Arabic; the map does not. */
        style={{ direction: "ltr" }}
        role="img"
        aria-label={copy.layers[layer].name}
      >
        {LAND_MAP_NEIGHBOURS.map((shape) => (
          <path
            key={shape.id}
            d={shape.d}
            fill={LAND_MAP_PAPER.land}
            stroke={LAND_MAP_PAPER.landLine}
            strokeWidth={1}
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {LAND_MAP_HOST_COUNTRIES.map((shape) => (
          <path
            key={shape.id}
            d={shape.d}
            fill={LAND_MAP_PAPER.hostLand}
            stroke={LAND_MAP_PAPER.hostLine}
            strokeWidth={1.6}
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {/* Kurdish presence: the only layer that is not Kurdish ground but the
            ground Kurds were divided across, so it tints whole states. */}
        {layer === "presence" ? (
          <g>
            {LAND_MAP_HOST_COUNTRIES.map((shape) => (
              <path
                key={shape.id}
                d={shape.d}
                fill={LAND_MAP_COLORS.presence.fill}
                fillOpacity={0.1}
                stroke={LAND_MAP_COLORS.presence.line}
                strokeWidth={2.6}
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            {/* Khorasan — Kurds deported east in the 1600s, still there. */}
            <path
              d={LAND_MAP_KHORASAN}
              fill={LAND_MAP_COLORS.presence.fill}
              fillOpacity={0.6}
              stroke={LAND_MAP_COLORS.presence.line}
              strokeWidth={1.6}
              strokeDasharray="9 6"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        ) : null}

        <path
          d={LAND_MAP_GREATER}
          fill={LAND_MAP_COLORS.greater.fill}
          fillOpacity={0.78 * strength("greater")}
          stroke={LAND_MAP_COLORS.greater.line}
          strokeWidth={1.8}
          strokeOpacity={strength("greater")}
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />

        <path
          d={LAND_MAP_DISPUTED}
          fill={LAND_MAP_COLORS.disputed.fill}
          fillOpacity={0.66 * strength("disputed")}
          stroke={LAND_MAP_COLORS.disputed.line}
          strokeWidth={1.6}
          strokeOpacity={strength("disputed")}
          strokeDasharray="10 7"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />

        <path
          d={LAND_MAP_REGION}
          fill={LAND_MAP_COLORS.region.fill}
          fillOpacity={0.82 * strength("region")}
          stroke={LAND_MAP_COLORS.region.line}
          strokeWidth={2.2}
          strokeOpacity={strength("region")}
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        {layer === "region"
          ? LAND_MAP_REGION_GOVERNORATES.map((shape) => (
              <path
                key={shape.id}
                d={shape.d}
                fill="none"
                stroke={LAND_MAP_PAPER.paper}
                strokeWidth={1.1}
                strokeOpacity={0.6}
                strokeDasharray="6 5"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            ))
          : null}

        {/* Water last, so Van and Urmia are holes in the land rather than blue
            paint laid over a Kurdish province. */}
        {LAND_MAP_LAKES.map((shape, index) => (
          <path
            key={`${shape.id}-${index}`}
            d={shape.d}
            fill={LAND_MAP_PAPER.sea}
            stroke={LAND_MAP_PAPER.seaLine}
            strokeWidth={1}
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {/* Named water, on the card wide enough to hold it: the italic sea names
            are most of what separates a map from a shape on a background. */}
        {layer === "presence"
          ? LAND_MAP_WATER_LABELS.map((label) => {
              const { x, y } = landMapPoint(label.lon, label.lat);
              return (
                <text
                  key={label.id}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  fontSize={type(11)}
                  fontStyle="italic"
                  fill="#4f7d99"
                  opacity={0.8}
                >
                  {copy.waters[label.id]}
                </text>
              );
            })
          : null}

        {/* Close in, the four states are named from inside the frame; wide, from
            their own middles, with the neighbours named too. */}
        {(wide ? LAND_MAP_COUNTRY_LABELS : LAND_MAP_CLOSE_COUNTRY_LABELS).map((label) => {
          const host = !("host" in label) || label.host;
          const { x, y } = landMapPoint(label.lon, label.lat);
          return (
            <text
              key={label.id}
              x={x}
              y={y}
              textAnchor="middle"
              fontSize={type(host ? 15 : 11)}
              letterSpacing={type(host ? 1.1 : 0.6)}
              fill={host ? "#5a4a30" : "#8b7a5e"}
              opacity={0.85}
            >
              {copy.countries[label.id]}
            </text>
          );
        })}

        {LAND_MAP_PLACES.map((place) => {
          if (!tiers.includes(place.tier)) return null;
          const { x, y } = landMapPoint(place.lon, place.lat);
          const tone =
            place.tier === "region"
              ? LAND_MAP_COLORS.region.ink
              : place.tier === "disputed"
                ? LAND_MAP_COLORS.disputed.ink
                : place.tier === "community"
                  ? LAND_MAP_COLORS.presence.ink
                  : "#5a4a30";
          const dot = type(place.tier === "capital" || place.tier === "community" ? 2.4 : 3);
          return (
            <g key={place.id}>
              {place.seat ? (
                <circle
                  cx={x}
                  cy={y}
                  r={dot * 2.1}
                  fill="none"
                  stroke={tone}
                  strokeWidth={1.6}
                  vectorEffect="non-scaling-stroke"
                />
              ) : null}
              <circle
                cx={x}
                cy={y}
                r={dot}
                fill={tone}
                stroke={LAND_MAP_PAPER.paper}
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
              <text
                x={x}
                y={y + type(place.seat ? 17 : 13)}
                textAnchor="middle"
                fontSize={type(11)}
                fill={tone}
                stroke={LAND_MAP_PAPER.paper}
                strokeWidth={type(2.2)}
                strokeLinejoin="round"
                paintOrder="stroke"
              >
                {copy.places[place.id]}
              </text>
            </g>
          );
        })}
      </svg>

      {legend ? (
        <ul className="pointer-events-none absolute bottom-[6%] start-[2.5%] flex flex-col gap-[0.35em] rounded-[10px] border border-[#e3d3b2] bg-white/78 px-[0.7em] py-[0.5em] text-[clamp(8px,0.78cqw,11px)] leading-none text-[#3d4a5f] backdrop-blur-[2px]">
          {LEGEND.map((id) => (
            <li key={id} className="flex items-center gap-[0.5em]">
              <span
                className="h-[0.95em] w-[0.95em] shrink-0 rounded-[3px] border"
                style={{
                  borderColor: LAND_MAP_COLORS[id].line,
                  backgroundColor: LAND_MAP_COLORS[id].fill,
                  opacity: layer === id ? 1 : 0.45,
                }}
              />
              <span style={{ opacity: layer === id ? 1 : 0.6 }}>{copy.layers[id].name}</span>
            </li>
          ))}
          {layer === "presence" ? (
            <li className="flex items-center gap-[0.5em]">
              <span
                className="h-[0.95em] w-[0.95em] shrink-0 rounded-[3px] border"
                style={{
                  borderColor: LAND_MAP_COLORS.presence.line,
                  backgroundColor: LAND_MAP_COLORS.presence.fill,
                }}
              />
              <span>{copy.layers.presence.name}</span>
            </li>
          ) : null}
        </ul>
      ) : null}
    </div>
  );
}
