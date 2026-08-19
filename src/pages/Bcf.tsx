import React from "react";
import { AnimatePresence } from "motion/react";
import FitScaledCanvas from "@/components/FitScaledCanvas";
import { DESIGN_WIDTH } from "@/hooks/useDesignCanvasFit";
import BcfLanguageOverlay from "@/components/Sections/bcf/BcfLanguageOverlay";
import BcfDonateOverlay from "@/components/Sections/bcf/BcfDonateOverlay";
import BcfIdleOverlay from "@/components/Sections/bcf/BcfIdleOverlay";
import BcfReachRail from "@/components/Sections/bcf/BcfReachRail";
import BcfAttract from "@/components/Sections/bcf/BcfAttract";
import BcfIntro from "@/components/Sections/bcf/BcfIntro";
import BcfWelcome from "@/components/Sections/bcf/BcfWelcome";

/**
 * The thirteen screens past the welcome are split out of the entry chunk.
 *
 * Every one of them used to be a static import, so opening /bcf meant
 * downloading, parsing and executing the world map geometry, the project
 * register, the dome gallery and the trust portraits before the attract plate
 * could paint — on a panel whose visitor had not yet chosen a language. That is
 * the weight the weaker machines were feeling on arrival.
 *
 * They are loaded on demand instead, and then warmed during the first idle
 * moment (see the prefetch effect below), so by the time anyone taps through
 * the language overlay the chunks are already in memory and navigation is as
 * instant as it was before.
 */
const BcfSections = React.lazy(() => import("@/components/Sections/bcf/BcfSections"));
const BcfHumanity = React.lazy(() => import("@/components/Sections/bcf/BcfHumanity"));
const BcfStory = React.lazy(() => import("@/components/Sections/bcf/BcfStory"));
const BcfMap = React.lazy(() => import("@/components/Sections/bcf/BcfMap"));
const BcfProjects = React.lazy(() => import("@/components/Sections/bcf/BcfProjects"));
const BcfProjectDetail = React.lazy(() => import("@/components/Sections/bcf/BcfProjectDetail"));
const BcfImpact = React.lazy(() => import("@/components/Sections/bcf/BcfImpact"));
const BcfFuture = React.lazy(() => import("@/components/Sections/bcf/BcfFuture"));
const BcfFutureDetail = React.lazy(() => import("@/components/Sections/bcf/BcfFutureDetail"));
const BcfTrust = React.lazy(() => import("@/components/Sections/bcf/BcfTrust"));
const BcfLegacy = React.lazy(() => import("@/components/Sections/bcf/BcfLegacy"));
const BcfImpactGallery = React.lazy(() => import("@/components/Sections/bcf/BcfImpactGallery"));

/**
 * Warmed in this order: the chapter menu first, because it is the screen the
 * visitor reaches next, then the six chapters behind it, then the details that
 * hang off those.
 */
const PREFETCH_STEPS: Array<() => Promise<unknown>> = [
  () => import("@/components/Sections/bcf/BcfSections"),
  () => import("@/components/Sections/bcf/BcfStory"),
  () => import("@/components/Sections/bcf/BcfHumanity"),
  () => import("@/components/Sections/bcf/BcfImpact"),
  () => import("@/components/Sections/bcf/BcfTrust"),
  () => import("@/components/Sections/bcf/BcfFuture"),
  () => import("@/components/Sections/bcf/BcfMap"),
  () => import("@/components/Sections/bcf/BcfProjects"),
  () => import("@/components/Sections/bcf/BcfProjectDetail"),
  () => import("@/components/Sections/bcf/BcfImpactGallery"),
  () => import("@/components/Sections/bcf/BcfFutureDetail"),
  () => import("@/components/Sections/bcf/BcfLegacy"),
];

import { BCF_LOW_POWER, BCF_PERF_CLASS } from "@/components/Sections/bcf/bcfPerf";
import {
  BCF_LOCATIONS,
  bcfCopy,
  type BcfLang,
  type BcfStep,
  type ImpactGalleryId,
  type JourneyChapterId,
  type LocationId,
} from "@/components/Sections/bcf/bcfContent";
import type { SectorId } from "@/components/Sections/bcf/bcfProjectData";

/** Steps that draw their own back control, in the opposite top corner. */
const STEPS_WITH_BACK_BUTTON: BcfStep[] = [
  "sections",
  "humanity",
  "hub",
  "map",
  "projects",
  "projectDetail",
  "impact",
  "impactGallery",
  "trust",
  "future",
  "futureDetail",
  "legacy",
];

/** Home only means something once the chapter menu exists behind the visitor. */
const STEPS_WITH_HOME: BcfStep[] = STEPS_WITH_BACK_BUTTON;

/** Idle rhythm, matched to the Threads experience so both kiosks behave alike. */
const IDLE_WARNING_MS = 75_000;
const IDLE_RESET_MS = 90_000;
const IDLE_COUNTDOWN_FROM = 15;

export default function BcfPage() {
  const [step, setStep] = React.useState<BcfStep>("attract");
  const [lang, setLang] = React.useState<BcfLang>("en");
  const [locationId, setLocationId] = React.useState<LocationId | null>(null);
  const [modalLocation, setModalLocation] = React.useState<LocationId | null>(null);
  const [sectorId, setSectorId] = React.useState<SectorId | null>(null);
  const [impactGalleryId, setImpactGalleryId] =
    React.useState<ImpactGalleryId | null>(null);
  const [languageOpen, setLanguageOpen] = React.useState(false);
  const [languageOrigin, setLanguageOrigin] =
    React.useState<"entry" | "control">("entry");
  const [donateOpen, setDonateOpen] = React.useState(false);
  const [idleCount, setIdleCount] = React.useState<number | null>(null);

  const c = bcfCopy[lang];
  const dir = lang === "en" ? "ltr" : "rtl";
  /** Any of the three overlays standing between the visitor and the scene. */
  const veiled = languageOpen || donateOpen || idleCount !== null;
  const navigatingRef = React.useRef(false);

  /**
   * Screen changes are handed to `AnimatePresence`, which cross-dissolves the
   * outgoing scene into the incoming one (see `bcfScene` in bcfMotion). The
   * previous approach — fade the stage to black, remount, fade back up — cost a
   * full second of dead screen and re-decoded every full-bleed photo on arrival.
   *
   * `go` now only guards against a second tap landing mid-transition; the motion
   * itself belongs to the scenes.
   */
  const go = React.useCallback((apply: () => void) => {
    if (navigatingRef.current) return;
    navigatingRef.current = true;
    apply();
    // Matches the scene exit + entrance overlap; long enough that a double tap
    // cannot skip a screen, short enough never to swallow a deliberate one.
    window.setTimeout(() => {
      navigatingRef.current = false;
    }, 420);
  }, []);

  const reset = React.useCallback(() => {
    setIdleCount(null);
    setLanguageOpen(false);
    setDonateOpen(false);
    setLanguageOrigin("entry");
    setModalLocation(null);
    setLocationId(null);
    setSectorId(null);
    setImpactGalleryId(null);
    setLang("en");
    setStep("attract");
  }, []);

  /**
   * Idle watch. The attract plate is the resting screen, so it needs no timer
   * until the visitor has tapped through into the journey.
   */
  React.useEffect(() => {
    if (
      step === "attract" ||
      step === "intro" ||
      (languageOpen && languageOrigin === "entry")
    ) {
      setIdleCount(null);
      return;
    }

    let warningTimeout = 0;
    let resetTimeout = 0;
    let countdownInterval = 0;

    const restart = () => {
      window.clearTimeout(warningTimeout);
      window.clearTimeout(resetTimeout);
      window.clearInterval(countdownInterval);
      setIdleCount(null);

      warningTimeout = window.setTimeout(() => {
        let remaining = IDLE_COUNTDOWN_FROM;
        setIdleCount(remaining);
        countdownInterval = window.setInterval(() => {
          remaining -= 1;
          setIdleCount(Math.max(remaining, 0));
        }, 1000);
      }, IDLE_WARNING_MS);

      resetTimeout = window.setTimeout(() => {
        window.clearInterval(countdownInterval);
        reset();
      }, IDLE_RESET_MS);
    };

    restart();
    window.addEventListener("pointerdown", restart, { passive: true });
    window.addEventListener("keydown", restart);

    return () => {
      window.clearTimeout(warningTimeout);
      window.clearTimeout(resetTimeout);
      window.clearInterval(countdownInterval);
      window.removeEventListener("pointerdown", restart);
      window.removeEventListener("keydown", restart);
    };
  }, [step, reset, languageOpen, languageOrigin]);

  /**
   * Warm the split screens once the attract plate is up and the main thread has
   * nothing else to do.
   *
   * The chunks are fetched one at a time rather than all at once: the point is
   * to use the idle gaps while a visitor reads the attract copy, not to hand the
   * weak CPU thirteen parse jobs on the same frame — which would reintroduce the
   * stutter this split exists to remove. `requestIdleCallback` yields between
   * each, so a tap always wins over the warming.
   */
  React.useEffect(() => {
    let cancelled = false;
    let handle = 0;

    const idle: (cb: () => void) => number =
      typeof window.requestIdleCallback === "function"
        ? (cb) => window.requestIdleCallback(cb, { timeout: 2000 })
        : (cb) => window.setTimeout(cb, 200);
    const cancelIdle: (id: number) => void =
      typeof window.cancelIdleCallback === "function"
        ? (id) => window.cancelIdleCallback(id)
        : (id) => window.clearTimeout(id);

    const warm = (index: number) => {
      if (cancelled || index >= PREFETCH_STEPS.length) return;
      handle = idle(() => {
        if (cancelled) return;
        // A chunk that fails to warm is not an error worth surfacing — the step
        // will simply load on demand when the visitor reaches it.
        PREFETCH_STEPS[index]()
          .catch(() => undefined)
          .then(() => warm(index + 1));
      });
    };

    warm(0);

    return () => {
      cancelled = true;
      cancelIdle(handle);
    };
  }, []);

  const openLanguage = React.useCallback((origin: "entry" | "control") => {
    setLanguageOrigin(origin);
    setLanguageOpen(true);
  }, []);

  const chooseLanguage = React.useCallback(
    (next: BcfLang) => {
      setLang(next);
      setLanguageOpen(false);
      if (languageOrigin === "entry") go(() => setStep("intro"));
    },
    [go, languageOrigin],
  );

  /**
   * The scene is memoised, and that is a fix rather than a micro-optimisation.
   *
   * Raising the language overlay is a `useState` on this component, so before
   * this every tap of that control re-rendered the entire experience —
   * the whole of the scene currently on screen, all of its cards, portraits,
   * map geometry and counters — purely to add a panel that sits on top of it.
   * On the Android panel that is a long main-thread block landing exactly on
   * the visitor's finger, which is the stutter that was reported.
   *
   * Holding the scene element by reference lets React skip the subtree
   * outright when only the overlay flags change: an element that is `===` what
   * it was is never reconciled. `AnimatePresence` still sees the same child, so
   * the screen transitions are untouched.
   *
   * Every value the branches read is in the dependency list below, so a real
   * navigation still rebuilds the scene on the same frame it always did.
   */
  const content = React.useMemo(() => {
    switch (step) {
      case "attract":
        return (
          <BcfAttract
            key="attract"
            onEnter={() => openLanguage("entry")}
          />
        );
      case "intro":
        return (
          <BcfIntro
            key="intro"
            lang={lang}
            onContinue={() => go(() => setStep("welcome"))}
          />
        );
      case "welcome":
        return (
          <BcfWelcome
            key="welcome"
            lang={lang}
            onStart={() => go(() => setStep("sections"))}
          />
        );
      case "sections":
        return (
          <BcfSections
            key="sections"
            lang={lang}
            onBack={() => go(() => setStep("welcome"))}
            onSelect={(id: JourneyChapterId) => {
              go(() => {
                if (id === "story") {
                  setStep("hub");
                } else if (id === "humanity") {
                  setStep("humanity");
                } else if (id === "map") {
                  setModalLocation(null);
                  setStep("map");
                } else if (id === "impact") {
                  setStep("impact");
                } else if (id === "trust") {
                  setStep("trust");
                } else if (id === "future") {
                  setStep("future");
                }
              });
            }}
          />
        );
      case "humanity":
        return (
          <BcfHumanity
            key="humanity"
            lang={lang}
            onBack={() => go(() => setStep("sections"))}
          />
        );
      case "hub":
        return (
          <BcfStory
            key="story"
            lang={lang}
            onBack={() => go(() => setStep("sections"))}
          />
        );
      case "map":
        return (
          <BcfMap
            key="map"
            lang={lang}
            selectedLocation={modalLocation}
            onSelectLocation={setModalLocation}
            onBack={() =>
              go(() => {
                setModalLocation(null);
                setStep("sections");
              })
            }
            onExploreProjects={(id) =>
              go(() => {
                setLocationId(id);
                setModalLocation(null);
                setStep("projects");
              })
            }
          />
        );
      case "projects":
        if (!locationId) return null;
        return (
          <BcfProjects
            key={`projects-${locationId}`}
            lang={lang}
            locationId={locationId}
            onBack={() =>
              go(() => {
                /* Reopen the card only for places that are pins. Coming back
                   from Rojava or "Other Iraqi Governorates" would otherwise
                   raise a location card over a map that has no marker for it. */
                setModalLocation(
                  BCF_LOCATIONS.some((loc) => loc.id === locationId) ? locationId : null,
                );
                setStep("map");
              })
            }
            onOpenSector={(id) =>
              go(() => {
                setSectorId(id);
                setStep("projectDetail");
              })
            }
          />
        );
      case "projectDetail":
        if (!locationId || !sectorId) return null;
        return (
          <BcfProjectDetail
            key={`project-${locationId}-${sectorId}`}
            lang={lang}
            locationId={locationId}
            sectorId={sectorId}
            onBack={() => go(() => setStep("projects"))}
          />
        );
      case "impact":
        return (
          <BcfImpact
            key="impact"
            lang={lang}
            onBack={() => go(() => setStep("sections"))}
            onOpenGallery={(id) =>
              go(() => {
                setImpactGalleryId(id);
                setStep("impactGallery");
              })
            }
          />
        );
      case "impactGallery":
        if (!impactGalleryId) return null;
        return (
          <BcfImpactGallery
            key={`impactGallery-${impactGalleryId}`}
            lang={lang}
            galleryId={impactGalleryId}
            onBack={() =>
              go(() => {
                setImpactGalleryId(null);
                setStep("impact");
              })
            }
          />
        );
      case "trust":
        return (
          <BcfTrust
            key="trust"
            lang={lang}
            onBack={() => go(() => setStep("sections"))}
          />
        );
      case "future":
        return (
          <BcfFuture
            key="future"
            lang={lang}
            onBack={() => go(() => setStep("sections"))}
            onOpenFuture={() => go(() => setStep("futureDetail"))}
            onOpenLegacy={() => go(() => setStep("legacy"))}
          />
        );
      case "futureDetail":
        return (
          <BcfFutureDetail
            key="futureDetail"
            lang={lang}
            onBack={() => go(() => setStep("future"))}
          />
        );
      case "legacy":
        return (
          <BcfLegacy
            key="legacy"
            lang={lang}
            onBack={() => go(() => setStep("future"))}
          />
        );
      default:
        return null;
    }
  }, [
    step,
    lang,
    locationId,
    modalLocation,
    sectorId,
    impactGalleryId,
    go,
    openLanguage,
  ]);

  return (
    /* `BCF_PERF_CLASS` is the switch for the low-power rendering path — see
       bcfPerf.ts. It has to sit above the scenes *and* the two overlays, which
       is why it goes on the canvas rather than on the shell. */
    <FitScaledCanvas
      designWidth={DESIGN_WIDTH}
      dir={dir}
      lang={lang}
      bgClassName="bg-[#0a0a0a]"
      className={`${BCF_PERF_CLASS} bcf-experience`}
      fitDeps={[step, lang]}
    >
      {/* `relative` so the rail and the two overlays can pin themselves to the
          artboard rather than the window — they have to scale with it. */}
      <div className="relative flex min-h-[1920px] w-full flex-col overflow-hidden">
        {/* Scene recession behind the language veil.
            This was a transitioned `filter: blur(22px) brightness(0.62)` plus
            `transform: scale(1.04)`, applied to the whole artboard on open and
            taken off again on close. That is the black flash on the Android
            panel, on both edges of the animation: a `filter` here forces
            Chromium to allocate a render surface for the entire 1080×1920
            artboard, which the panel draws at 2× — a 2160×3840 texture. The
            compositor shows that surface before it has finished painting, and
            removing the filter on close tears the same surface down and
            repaints the artboard underneath, so the flash happens twice.
            On the low tier — the default on every device, see bcfPerf.ts — the
            page behind is now left completely untouched: no filter, no
            transform, no surface to create or destroy, nothing to flash. The
            overlay carries the recession itself as a deeper scrim, the same
            trade the rest of this experience makes for `backdrop-filter`.
            `?perf=high` still restores the glass version for comparing the two
            on a workstation. */}
        <div
          /* `bcf-veiled` stops the thirteen perpetual animations for as long as
             anything is covering the scene — see the note in index.css. */
          className={`flex min-h-[1920px] w-full flex-col${
            veiled ? " bcf-veiled" : ""
          }`}
          style={
            BCF_LOW_POWER
              ? undefined
              : {
                  filter: languageOpen ? "blur(22px) brightness(0.62)" : undefined,
                  transform: languageOpen ? "scale(1.04)" : undefined,
                  transition: "filter 400ms ease, transform 400ms ease",
                }
          }
        >
        {/* `mode="wait"` lets the outgoing scene finish its short exit before the
            next one dissolves up, so the backdrop never cuts to black between
            screens. `initial={false}` keeps the first paint from fading in
            over itself. */}
        {/* The split screens suspend only if a visitor outruns the prefetch above.
            The fallback is deliberately empty rather than a spinner: the scene
            underneath has already faded out, and a chunk that is being read from
            the kiosk's own disk is up within a frame or two. */}
        <React.Suspense fallback={null}>
          <AnimatePresence mode="wait" initial={false}>
            {content}
          </AnimatePresence>
        </React.Suspense>

        {step !== "attract" &&
        step !== "intro" &&
        !(languageOpen && languageOrigin === "entry") ? (
          <BcfReachRail
            homeLabel={c.home}
            languageLabel={c.language}
            donateLabel={c.donate}
            onHome={
              STEPS_WITH_HOME.includes(step)
                ? () => go(() => setStep("sections"))
                : undefined
            }
            onLanguage={() => openLanguage("control")}
            onDonate={() => setDonateOpen(true)}
            homeActive={step === "sections"}
          />
        ) : null}
        </div>

        <BcfLanguageOverlay
          open={languageOpen}
          origin={languageOrigin}
          lang={lang}
          onSelect={chooseLanguage}
          onClose={() => setLanguageOpen(false)}
        />

        <BcfDonateOverlay
          open={donateOpen}
          lang={lang}
          onClose={() => setDonateOpen(false)}
        />

        <BcfIdleOverlay
          count={idleCount}
          lang={lang}
          onContinue={() => setIdleCount(null)}
        />
      </div>
    </FitScaledCanvas>
  );
}
