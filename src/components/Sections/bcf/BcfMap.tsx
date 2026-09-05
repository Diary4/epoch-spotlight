import React from "react";
import { motion, useReducedMotion, type Transition } from "motion/react";
import { ArrowRight, Globe, Map, MapPin } from "lucide-react";
import BcfShell, { BcfBackButton } from "@/components/Sections/bcf/BcfShell";
import BcfChapterPill from "@/components/Sections/bcf/BcfChapterPill";
import {
  BCF_EASE,
  BCF_EASE_IN,
  BCF_TAP,
  BCF_TAP_TRANSITION,
  bcfRise,
  bcfStagger,
} from "@/components/Sections/bcf/bcfMotion";
import {
  BCF_BEYOND_LOCATIONS,
  bcfCopy,
  type BcfLang,
  type GlobalLocationId,
  type LocationId,
  type MapScopeId,
} from "@/components/Sections/bcf/bcfContent";
import {
  bcfEntryCountFor,
  bcfSectorsFor,
} from "@/components/Sections/bcf/bcfProjectData";
import { bcfDigits } from "@/components/Sections/bcf/bcfDigits";
import BcfGlobalMap from "@/components/Sections/bcf/BcfGlobalMap";
import BcfIraqMap from "@/components/Sections/bcf/BcfIraqMap";
import BcfKurdistanMap from "@/components/Sections/bcf/BcfKurdistanMap";
import { BCF, BCF_FIELD_BG } from "@/components/Sections/bcf/bcfTheme";
import { bcfMapBg } from "@/components/Sections/bcf/bcfAssets";

const scopeIcons: Record<MapScopeId, typeof Globe> = {
  global: Globe,
  iraq: Map,
  kurdistan: MapPin,
};

/**
 * The world comes first. BCF is licensed internationally and was across the
 * Turkish and Syrian border within days of the 2023 earthquakes; opening on the
 * Region alone told the smaller half of that story, so the scope is a category
 * the visitor switches, and it starts wide.
 *
 * Then the country, then the Region: each step in is a subset of the one before
 * it, which is the only order a visitor does not have to think about.
 */
const SCOPES: MapScopeId[] = ["global", "iraq", "kurdistan"];

/**
 * Crossfade between two scopes that are both already drawn.
 *
 * The halves overlap rather than queue: the one being left starts going as the
 * one being entered starts arriving, so there is never a frame with nothing on
 * the plate. That gap is what read as a stop — the old swap waited out a 220ms
 * exit on an empty plate and then spent the first frames of the entrance
 * mounting a map, which is the one frame the visitor is actually watching.
 *
 * Opacity only, on both sides. It is the one property the compositor can carry
 * on any GPU without re-rasterising what is inside it, which is why this is the
 * same transition on the Windows box, the Android panel and a laptop.
 */
const SCOPE_FADE_IN: Transition = { duration: 0.3, delay: 0.06, ease: BCF_EASE };
const SCOPE_FADE_OUT: Transition = { duration: 0.24, ease: BCF_EASE_IN };

type BcfMapProps = {
  lang: BcfLang;
  selectedLocation: LocationId | null;
  onSelectLocation: (id: LocationId | null) => void;
  onExploreProjects: (id: LocationId) => void;
  onBack: () => void;
};

export default function BcfMap({
  lang,
  selectedLocation,
  onSelectLocation,
  onExploreProjects,
  onBack,
}: BcfMapProps) {
  const c = bcfCopy[lang];
  const reduceMotion = useReducedMotion();
  const [scope, setScope] = React.useState<MapScopeId>("global");
  const [globalSelection, setGlobalSelection] =
    React.useState<GlobalLocationId | null>(null);
  /* Which scopes exist in the DOM. A scope joins the list the first time it is
     opened and never leaves it, so a second visit costs a crossfade instead of
     a mount. The world half is on it from the start because it is the one the
     screen opens on. */
  const [opened, setOpened] = React.useState<MapScopeId[]>(["global"]);

  /* Switching scope closes whatever card was open on the half being left —
     otherwise the Region's Erbil panel is still sitting over the world map. */
  const selectScope = (next: MapScopeId) => {
    if (next === scope) return;
    setGlobalSelection(null);
    onSelectLocation(null);
    setOpened((prev) => (prev.includes(next) ? prev : [...prev, next]));
    setScope(next);
  };

  return (
    <BcfShell
      backgroundImage={bcfMapBg}
      overlayClassName="bg-black/65"
      drift={false}
    >
      <div className="relative flex min-h-[1920px] flex-col px-10 pb-16 pt-24">
        <BcfBackButton onClick={onBack} label={c.back} />

        <motion.div
          variants={bcfStagger(0.1, 0.16)}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={bcfRise}>
            <BcfChapterPill title={c.whereWeWork} />
          </motion.div>

          {/* Title and scope share one row. Stacked, they cost the map a
              hundred and fifty pixels of height for two elements that between
              them fill less than the width — and on this screen the map is the
              thing worth the height. `flex-wrap` is the safety net: the Kurdish
              and Arabic labels are longer, and if the row ever runs out of room
              the control drops beneath the title rather than squashing it. */}
          <div className="mt-9 flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
            <motion.h1
              variants={bcfRise}
              className="text-[76px] font-bold leading-[1.05]"
            >
              <span className="text-[#fbf4e4]">{c.across} </span>
              <span style={{ color: BCF.gold }}>{c.borders}</span>
            </motion.h1>

            {/* Segmented scope control. Two states, both always visible, with the
                active one carrying the gold — on a kiosk a dropdown would be a
                second tap and a hidden option. */}
            <motion.div
              variants={bcfRise}
              role="tablist"
              aria-label={c.whereWeWork}
              className="inline-flex gap-2 rounded-full border border-white/12 bg-black/45 p-2 backdrop-blur-md"
            >
              {SCOPES.map((id) => {
                const Icon = scopeIcons[id];
                const on = scope === id;
                return (
                  <motion.button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => selectScope(id)}
                    whileTap={BCF_TAP}
                    transition={BCF_TAP_TRANSITION}
                    className="relative flex transform-gpu items-center gap-3 rounded-full px-6 py-3.5"
                  >
                    {on ? (
                      <motion.span
                        layoutId="bcf-map-scope"
                        className="absolute inset-0 rounded-full border"
                        style={{
                          borderColor: `${BCF.gold}80`,
                          backgroundColor: "rgba(251,178,47,0.14)",
                          boxShadow: `0 0 28px ${BCF.gold}33`,
                        }}
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { duration: 0.4, ease: BCF_EASE }
                        }
                      />
                    ) : null}
                    <Icon
                      className="relative h-7 w-7"
                      style={{ color: on ? BCF.gold : "rgba(255,255,255,0.45)" }}
                    />
                    <span
                      className="relative whitespace-nowrap text-[28px]"
                      style={{ color: on ? BCF.creamSoft : "rgba(255,255,255,0.5)" }}
                    >
                      {c.mapScopes[id]}
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
        </motion.div>

        {/* The near abroad, above the map rather than below it.
            Two reasons it moved. On a 65" panel stood on its end, a control at
            the foot of a 1920 artboard is around knee height — reachable in a
            mockup, not by a visitor. And it only belongs to the Region half:
            the world map answers "which countries?" itself, so a second list of
            countries under it was the same question asked twice.

            It belongs to the Region half, but it is laid out in all three
            scopes and only its ink comes and goes. An `auto` height is a layout
            animation: for every frame of one the plate below is a different
            size, so the outlines relay themselves, the world map re-rasterises
            at 2×, and the country map's plate observer fires — sixty times
            over, on exactly the frames the map swap is running on. Reserving
            the row costs a hundred pixels of map on the two scopes that do not
            use it, and buys a plate whose geometry never changes. That is most
            of the roughness. */}
        <BcfMapFade
          as="section"
          active={scope === "kurdistan"}
          className="mt-7 flex items-center gap-5"
        >
          <h2
            className="w-[190px] shrink-0 text-[28px] font-semibold leading-tight"
            style={{ color: BCF.gold }}
          >
            {c.projects.beyondTitle}
          </h2>
          <div className="grid flex-1 grid-cols-2 gap-4">
            {BCF_BEYOND_LOCATIONS.map((id) => (
              <motion.button
                key={id}
                type="button"
                onClick={() => onExploreProjects(id)}
                /* Out of the tab order while the row is faded out: the box is
                   still in the layout, so without this the Region's two chips
                   stay reachable from the world map. */
                tabIndex={scope === "kurdistan" ? 0 : -1}
                whileTap={BCF_TAP}
                transition={BCF_TAP_TRANSITION}
                className="flex transform-gpu items-center justify-between gap-3 rounded-2xl border border-white/12 bg-black/45 px-5 py-4 text-start backdrop-blur-md"
              >
                <span className="min-w-0">
                  <span
                    className="block truncate text-[26px] font-semibold leading-tight"
                    style={{ color: BCF.creamSoft }}
                  >
                    {c.locations[id].short}
                  </span>
                  {/* Both numbers carry a noun — "3 Sectors · 4" left the
                      second one meaning nothing — but the short one, since
                      "Documented projects" wrapped the chip to three lines. */}
                  <span className="mt-1 block truncate text-[19px] lowercase text-white/50">
                    <span className="tabular-nums">
                      {bcfDigits(bcfSectorsFor(id).length, lang)}
                    </span>{" "}
                    {bcfSectorsFor(id).length === 1
                      ? c.projects.sectorLabel
                      : c.projects.sectorsLabel}{" "}
                    ·{" "}
                    <span className="tabular-nums">
                      {bcfDigits(bcfEntryCountFor(id), lang)}
                    </span>{" "}
                    {c.projects.entriesShort}
                  </span>
                </span>
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full border"
                  style={{ borderColor: `${BCF.gold}80` }}
                >
                  <ArrowRight
                    className="h-5 w-5 rtl:rotate-180"
                    style={{ color: BCF.gold }}
                  />
                </span>
              </motion.button>
            ))}
          </div>
        </BcfMapFade>

        <motion.div
          className="relative mt-6 min-h-[1150px] flex-1 overflow-hidden rounded-[36px] border border-[#fbc158]/28"
          style={{
            boxShadow:
              "inset 0 1px 0 rgba(251,193,88,0.14), inset 0 0 140px rgba(0,0,0,0.5), 0 34px 90px rgba(0,0,0,0.45)",
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: BCF_EASE }}
        >
          {/* A chart table, not a landscape. The plate used to be the sunrise
              photograph the opening screens are set on, dimmed to 30% — but a
              mountain ridge and a tree line under a world map read as two maps
              fighting, and the dark photo left the coastlines with almost no
              ground to sit on. The deep field the photograph-free scenes already
              use gives the cartography a surface of its own. */}
          <div className="absolute inset-0" style={{ background: BCF_FIELD_BG }} />
          {/* Gold graticule — reads as cartography rather than a dimmed photo. */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.13]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(251,193,88,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(251,193,88,0.5) 1px, transparent 1px)",
              backgroundSize: "120px 120px",
              maskImage:
                "radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent 82%)",
            }}
          />
          {/* Warm light under the middle of the plate, dark at the corners, so
              the map sits in the lit part and the buttons stay legible on the
              rim. Sized to this plate rather than the 1080×1920 artboard. */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 82% at 50% 44%, transparent 46%, rgba(4,6,9,0.62) 100%), radial-gradient(72% 54% at 50% 40%, rgba(251,193,88,0.1), transparent 72%)",
            }}
          />

          {/* Each scope is mounted the first time it is opened and is never
              unmounted again; switching is an opacity crossfade between two
              subtrees that are both already drawn.

              They used to swap through `AnimatePresence mode="wait"`, which
              unmounts the half being left and mounts the half being entered.
              Mounting a map is not free — the world half rebuilds 177 country
              paths, hands React 177 new elements to reconcile and the panel a
              2160×3840 surface to rasterise — and all of that landed on the
              first frames of the entrance, which are the frames the visitor is
              actually watching. That is the stop.

              Kept mounted, the cost is paid once per scope per visit, on the
              tap that opens it rather than on every tap after. And the world
              half is the one that starts open, so the expensive mount happens
              while the screen itself is arriving and never on a switch. */}
          {opened.includes("global") ? (
            <BcfMapFade
              active={scope === "global"}
              className="absolute inset-0 z-10"
            >
              <BcfGlobalMap
                lang={lang}
                selected={globalSelection}
                onSelect={setGlobalSelection}
                onExploreProjects={onExploreProjects}
              />
            </BcfMapFade>
          ) : null}

          {opened.includes("iraq") ? (
            <BcfMapFade
              active={scope === "iraq"}
              className="absolute inset-0 z-10"
            >
              <BcfIraqMap
                lang={lang}
                /* The country map keeps its own governorate selection, and now
                   that it outlives the switch it has to be told when it has
                   been left — otherwise Samawah's card is still open behind the
                   world map, waiting to reappear. */
                active={scope === "iraq"}
                selectedLocation={selectedLocation}
                onSelectLocation={onSelectLocation}
                onExploreProjects={onExploreProjects}
              />
            </BcfMapFade>
          ) : null}

          {opened.includes("kurdistan") ? (
            <BcfMapFade
              active={scope === "kurdistan"}
              className="absolute inset-0 z-10 flex flex-col"
            >
              <BcfKurdistanMap
                lang={lang}
                /* The Region map now holds a camera of its own, and now that it
                   outlives the switch it has to be told when it has been left —
                   otherwise a visitor who zoomed into a street in Kalar comes
                   back to it from the world map with no memory of going there. */
                active={scope === "kurdistan"}
                selectedLocation={selectedLocation}
                onSelectLocation={onSelectLocation}
                onExploreProjects={onExploreProjects}
              />
            </BcfMapFade>
          ) : null}
        </motion.div>
      </div>
    </BcfShell>
  );
}

/**
 * One layer that fades in and out of a screen it never leaves.
 *
 * Three things it does that a plain `AnimatePresence` swap does not:
 *
 *   It keeps the subtree mounted, so the crossfade has nothing to build — see
 *   the note at the scope panes.
 *
 *   It takes the layer out of the paint once the fade has finished, with
 *   `visibility: hidden` rather than `display: none`. Hidden keeps the box in
 *   the layout, which the country map depends on: its plate is measured from
 *   the plane it is handed, and a plane that has been display-noned measures
 *   zero, so the map would have to remeasure and redraw itself on the very
 *   frame it is being shown on. Hidden, it is already the right size.
 *
 *   And it promotes only while it is on screen. `will-change: opacity` is what
 *   lets the compositor carry the fade instead of the main thread repainting
 *   the plate under it — the difference between a smooth swap and a rough one
 *   on a GPU with no headroom — but a promoted layer is a full-plate surface
 *   held in video memory, and holding three of them is how a kiosk with two
 *   idle maps runs out. So the hint goes on with the layer and comes off with
 *   it.
 */
function BcfMapFade({
  active,
  className = "",
  as: Tag = "div",
  children,
}: {
  active: boolean;
  className?: string;
  /** `section` where the layer is one, so the landmark survives the fade. */
  as?: "div" | "section";
  children: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  /* Painted, not "visible": true through the whole of the fade out, false only
     once the layer has actually reached zero. */
  const [painted, setPainted] = React.useState(active);
  React.useLayoutEffect(() => {
    if (active) setPainted(true);
  }, [active]);

  const Component = Tag === "section" ? motion.section : motion.div;

  return (
    <Component
      /* Idle layers hold their pings still; see index.css. */
      className={`${active ? "" : "bcf-map-idle "}${className}`}
      aria-hidden={!active}
      style={{
        visibility: painted ? "visible" : "hidden",
        willChange: painted ? "opacity" : undefined,
        pointerEvents: active ? undefined : "none",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : active
            ? SCOPE_FADE_IN
            : SCOPE_FADE_OUT
      }
      onAnimationComplete={() => {
        if (!active) setPainted(false);
      }}
    >
      {children}
    </Component>
  );
}
