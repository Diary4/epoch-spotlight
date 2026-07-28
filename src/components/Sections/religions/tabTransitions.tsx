import React from "react";
import gsap from "gsap";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Shared tab motion for the religions pages.
 *
 * Every hub page (Introduction, Rights, One Shared Homeland, Leaders) switches
 * between two panels of cards. Swapping them straight through React state made
 * the change read as a hard cut on the showcase display, so these helpers give
 * the switch one continuous motion:
 *
 * ReligionsTabNav — tab bar with a sliding gold indicator
 * ReligionsTabPanel — cross-dissolve + directional slide between panels
 * ReligionsTabHero — cross-dissolve between per-tab hero images
 * usePreloadImages — warms the inactive tab's art so nothing pops in
 */

const EXIT_DURATION = 0.5;
const ENTER_DURATION = 1.05;
const SHIFT = 26;

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Decode the other tab's images up front so the swap never waits on the network. */
export function usePreloadImages(sources: readonly string[]) {
  const key = sources.join("|");

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    // No cleanup: cancelling an in-flight decode would defeat the point, and the
    // browser cache keeps the result once it lands.
    key
      .split("|")
      .filter(Boolean)
      .forEach((src) => {
        const img = new Image();
        img.decoding = "async";
        img.src = src;
      });
  }, [key]);
}

type TabNavItem<T extends string> = {
  id: T;
  label: string;
  icon: LucideIcon;
};

type ReligionsTabNavProps<T extends string> = {
  tabs: readonly TabNavItem<T>[];
  activeId: T;
  onChange: (id: T) => void;
  className?: string;
};

export function ReligionsTabNav<T extends string>({
  tabs,
  activeId,
  onChange,
  className = "",
}: ReligionsTabNavProps<T>) {
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const indicatorRef = React.useRef<HTMLSpanElement | null>(null);
  const buttonRefs = React.useRef(new Map<T, HTMLButtonElement>());
  const placedRef = React.useRef(false);

  const placeIndicator = React.useCallback(
    (instant: boolean) => {
      const indicator = indicatorRef.current;
      const button = buttonRefs.current.get(activeId);
      if (!indicator || !button) return;

      const target = { x: button.offsetLeft, width: button.offsetWidth };

      if (instant || prefersReducedMotion()) {
        gsap.set(indicator, { ...target, autoAlpha: 1 });
        return;
      }

      gsap.to(indicator, {
        ...target,
        duration: 0.85,
        ease: "power2.inOut",
        overwrite: "auto",
      });
    },
    [activeId],
  );

  // First paint lands instantly; later changes glide across the tab bar.
  React.useLayoutEffect(() => {
    placeIndicator(!placedRef.current);
    placedRef.current = true;
  }, [placeIndicator]);

  // Web fonts and canvas rescaling change the tab widths after first paint.
  React.useEffect(() => {
    const list = listRef.current;
    if (!list || typeof ResizeObserver === "undefined") return;

    let first = true;
    const observer = new ResizeObserver(() => {
      if (first) {
        first = false;
        return;
      }
      placeIndicator(true);
    });

    observer.observe(list);
    return () => observer.disconnect();
  }, [placeIndicator]);

  return (
    <nav
      className={cn(
        "mb-6 flex shrink-0 justify-center border-b border-[#d7b77e]/45",
        className,
      )}
    >
      <div ref={listRef} role="tablist" className="relative flex gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeId === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              ref={(node) => {
                if (node) buttonRefs.current.set(tab.id, node);
                else buttonRefs.current.delete(tab.id);
              }}
              onClick={() => {
                if (!isActive) onChange(tab.id);
              }}
              aria-selected={isActive}
              role="tab"
              className={cn(
                "group relative flex items-center gap-3 px-8 pb-[15px] pt-3.5 font-serif text-[20px]",
                "transition-[color,transform] duration-500 ease-smooth-out",
                "motion-reduce:transition-none",
                isActive
                  ? "text-[#2f1f12]"
                  : "text-[#8a6a45] ",
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 transition-transform duration-500 ease-smooth-out motion-reduce:transition-none",
                  isActive ? "scale-110" : "scale-100",
                )}
              />
              {tab.label}
            </button>
          );
        })}

        <span
          ref={indicatorRef}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 h-[2px] rounded-full bg-[#b98222]"
          style={{ width: 0, opacity: 0 }}
        />
      </div>
    </nav>
  );
}

type ReligionsTabPanelProps<T extends string> = {
  /** Tab the user has selected. */
  tabKey: T;
  /** Tab order — decides which way the panel slides. */
  order: readonly T[];
  dir?: "ltr" | "rtl";
  className?: string;
  /** Rendered with the tab that is currently on screen, not the selected one. */
  children: (key: T) => React.ReactNode;
};

/**
 * Cross-dissolves between two panels of content.
 *
 * Elements marked `data-tab-fx` animate as a unit; children of a
 * `data-tab-fx-group` element (the card grid) animate individually so the row
 * of cards arrives as a stagger instead of a block.
 */
export function ReligionsTabPanel<T extends string>({
  tabKey,
  order,
  dir = "ltr",
  className = "",
  children,
}: ReligionsTabPanelProps<T>) {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  // `swap` counts completed exits, so an entrance always follows one — even when
  // a fast double-click lands back on the tab that was already showing.
  const [panel, setPanel] = React.useState({ key: tabKey, swap: 0 });
  const latestKeyRef = React.useRef<T>(tabKey);
  const previousKeyRef = React.useRef<T>(tabKey);
  const tweenRef = React.useRef<gsap.core.Tween | null>(null);

  latestKeyRef.current = tabKey;

  const collect = React.useCallback(() => {
    const root = rootRef.current;
    if (!root) return [] as HTMLElement[];
    return Array.from(
      root.querySelectorAll<HTMLElement>("[data-tab-fx], [data-tab-fx-group] > *"),
    );
  }, []);

  const advance = React.useCallback(() => {
    setPanel((current) => ({
      key: latestKeyRef.current,
      swap: current.swap + 1,
    }));
  }, []);

  // Selection changed: play the outgoing panel off before swapping content.
  React.useEffect(() => {
    if (tabKey === panel.key) return;

    const targets = collect();
    if (prefersReducedMotion() || !targets.length) {
      advance();
      return;
    }

    const forward = order.indexOf(tabKey) >= order.indexOf(panel.key);
    const away = (forward ? -SHIFT : SHIFT) * (dir === "rtl" ? -1 : 1);

    tweenRef.current?.kill();
    tweenRef.current = gsap.to(targets, {
      autoAlpha: 0,
      x: away,
      y: -6,
      duration: EXIT_DURATION,
      ease: "power2.in",
      stagger: 0.045,
      overwrite: "auto",
      onComplete: advance,
    });
  }, [tabKey, panel.key, order, dir, collect, advance]);

  // New panel is in the DOM: hide it before paint, then float it in.
  React.useLayoutEffect(() => {
    const previousKey = previousKeyRef.current;
    previousKeyRef.current = panel.key;

    // Mount renders at rest so the page's own entrance animation stays in charge.
    if (panel.swap === 0 || prefersReducedMotion()) return;

    const targets = collect();
    if (!targets.length) return;

    const forward = order.indexOf(panel.key) >= order.indexOf(previousKey);
    const from = (forward ? SHIFT : -SHIFT) * (dir === "rtl" ? -1 : 1);

    tweenRef.current?.kill();
    gsap.set(targets, { autoAlpha: 0, x: from, y: 10 });
    tweenRef.current = gsap.to(targets, {
      autoAlpha: 1,
      x: 0,
      y: 0,
      duration: ENTER_DURATION,
      ease: "power2.out",
      stagger: 0.09,
      overwrite: "auto",
      clearProps: "transform",
    });
  }, [panel.swap, panel.key, order, dir, collect]);

  React.useEffect(() => () => void tweenRef.current?.kill(), []);

  return (
    <div ref={rootRef} className={className}>
      {children(panel.key)}
    </div>
  );
}

type ReligionsTabHeroProps = React.HTMLAttributes<HTMLDivElement> & {
  activeKey: string;
  /** One image per tab, keyed the same way as the tabs. */
  sources: Record<string, string>;
  imageClassName?: string;
  duration?: number;
};

/**
 * Stacks every tab's hero image and cross-dissolves between them, so changing
 * tab no longer remounts (and re-decodes) the image.
 */
export function ReligionsTabHero({
  activeKey,
  sources,
  className = "",
  imageClassName = "",
  duration = 1.3,
  ...rest
}: ReligionsTabHeroProps) {
  const nodeRefs = React.useRef(new Map<string, HTMLImageElement>());
  const placedRef = React.useRef(false);

  React.useLayoutEffect(() => {
    const nodes = nodeRefs.current;
    const instant = !placedRef.current || prefersReducedMotion();
    placedRef.current = true;

    nodes.forEach((node, key) => {
      const isActive = key === activeKey;

      if (instant) {
        gsap.set(node, { opacity: isActive ? 1 : 0 });
        return;
      }

      gsap.to(node, {
        opacity: isActive ? 1 : 0,
        duration,
        ease: "power2.inOut",
        overwrite: "auto",
      });
    });
  }, [activeKey, duration]);

  return (
    <div className={className} {...rest}>
      {Object.entries(sources).map(([key, src]) => (
        <img
          key={key}
          ref={(node) => {
            if (node) nodeRefs.current.set(key, node);
            else nodeRefs.current.delete(key);
          }}
          src={src}
          alt=""
          decoding="async"
          style={{ opacity: 0 }}
          className={cn("absolute inset-0 h-full w-full object-cover", imageClassName)}
        />
      ))}
    </div>
  );
}
