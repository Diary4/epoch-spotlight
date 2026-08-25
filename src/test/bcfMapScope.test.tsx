import React from "react";
import { describe, it, expect, vi, beforeAll } from "vitest";
import { createRoot } from "react-dom/client";
import { act } from "react";
import BcfMap from "@/components/Sections/bcf/BcfMap";

/**
 * Where We Work is smooth only for as long as its three maps stay mounted.
 *
 * The roughness on a scope switch was a remount — the world half rebuilding 177
 * country paths on the first frames of the entrance, which are the frames the
 * visitor is watching. It is an easy fix to undo by accident: an
 * `AnimatePresence` put back around the panes, or a `key` that moves with the
 * scope. And the symptom only shows on the kiosk, never on the workstation it
 * would be undone on. So the invariant is asserted here instead: a scope that
 * has been opened is never built a second time.
 */

beforeAll(() => {
  // @ts-expect-error jsdom has no ResizeObserver; the country map observes its plane.
  window.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  // @ts-expect-error React's test-environment flag is untyped.
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
});

/** `.rsm-geographies` is react-simple-maps' own wrapper: one per world map. */
const worldMaps = (host: HTMLElement) =>
  host.querySelectorAll(".rsm-geographies").length;

describe("BcfMap scopes", () => {
  it("mounts each scope once and never again", async () => {
    const host = document.createElement("div");
    document.body.appendChild(host);
    const root = createRoot(host);

    const tap = async (element: HTMLElement) => {
      await act(async () => {
        element.click();
        await Promise.resolve();
      });
    };

    await act(async () => {
      root.render(
        <BcfMap
          lang="en"
          selectedLocation={null}
          onSelectLocation={vi.fn()}
          onExploreProjects={vi.fn()}
          onBack={vi.fn()}
        />,
      );
    });

    const tabs = Array.from(
      host.querySelectorAll('[role="tab"]'),
    ) as HTMLElement[];
    expect(tabs).toHaveLength(3);

    // Opens on the world, and on the world alone.
    expect(worldMaps(host)).toBe(1);

    // The near-abroad row is laid out from the start and only faded out, so the
    // plate below it is the same size in every scope — no reflow on a switch.
    const beyond = host.querySelector("section.mt-7") as HTMLElement;
    expect(beyond).not.toBeNull();
    expect(beyond.getAttribute("aria-hidden")).toBe("true");
    expect(beyond.style.visibility).toBe("hidden");

    await tap(tabs[2]); // Inside Kurdistan
    expect(worldMaps(host)).toBe(1);
    expect(beyond.getAttribute("aria-hidden")).toBe("false");
    expect(beyond.style.visibility).toBe("visible");

    await tap(tabs[1]); // Inside Iraq
    expect(worldMaps(host)).toBe(1);

    await tap(tabs[0]); // Globally — the same world map it started with
    expect(worldMaps(host)).toBe(1);

    root.unmount();
    host.remove();
  });
});
