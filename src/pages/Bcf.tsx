import React from "react";
import { AnimatePresence } from "motion/react";
import FitScaledCanvas from "@/components/FitScaledCanvas";
import { DESIGN_WIDTH } from "@/hooks/useDesignCanvasFit";
import BcfAttract from "@/components/Sections/bcf/BcfAttract";
import BcfLanguageOverlay from "@/components/Sections/bcf/BcfLanguageOverlay";
import BcfIdleOverlay from "@/components/Sections/bcf/BcfIdleOverlay";
import BcfReachRail from "@/components/Sections/bcf/BcfReachRail";
import BcfIntro from "@/components/Sections/bcf/BcfIntro";
import BcfWelcome from "@/components/Sections/bcf/BcfWelcome";
import BcfSections from "@/components/Sections/bcf/BcfSections";
import BcfHumanity from "@/components/Sections/bcf/BcfHumanity";
import BcfStory from "@/components/Sections/bcf/BcfStory";
import BcfMap from "@/components/Sections/bcf/BcfMap";
import BcfProjects from "@/components/Sections/bcf/BcfProjects";
import BcfProjectDetail from "@/components/Sections/bcf/BcfProjectDetail";
import BcfImpact from "@/components/Sections/bcf/BcfImpact";
import BcfFuture from "@/components/Sections/bcf/BcfFuture";
import BcfFutureDetail from "@/components/Sections/bcf/BcfFutureDetail";
import BcfTrust from "@/components/Sections/bcf/BcfTrust";
import BcfLegacy from "@/components/Sections/bcf/BcfLegacy";
import BcfHumanStories from "@/components/Sections/bcf/BcfHumanStories";
import BcfImpactGallery from "@/components/Sections/bcf/BcfImpactGallery";
import { BCF_PERF_CLASS } from "@/components/Sections/bcf/bcfPerf";
import {
  bcfCopy,
  type BcfLang,
  type BcfStep,
  type ImpactGalleryId,
  type JourneyChapterId,
  type LocationId,
  type ProjectId,
} from "@/components/Sections/bcf/bcfContent";

/** Steps that draw their own back control, which the rail has to clear. */
const STEPS_WITH_BACK_BUTTON: BcfStep[] = [
  "sections",
  "humanity",
  "hub",
  "map",
  "projects",
  "projectDetail",
  "impact",
  "humanStories",
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
  const [projectId, setProjectId] = React.useState<ProjectId | null>(null);
  const [impactGalleryId, setImpactGalleryId] =
    React.useState<ImpactGalleryId | null>(null);
  const [languageOpen, setLanguageOpen] = React.useState(false);
  const [languageOrigin, setLanguageOrigin] =
    React.useState<"entry" | "control">("entry");
  const [idleCount, setIdleCount] = React.useState<number | null>(null);

  const c = bcfCopy[lang];
  const dir = lang === "en" ? "ltr" : "rtl";
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
    setLanguageOrigin("entry");
    setModalLocation(null);
    setLocationId(null);
    setProjectId(null);
    setImpactGalleryId(null);
    setLang("en");
    setStep("attract");
  }, []);

  /**
   * Idle watch. The attract screen is already the resting state, so it is the
   * one place that needs no timer.
   */
  React.useEffect(() => {
    if (step === "attract") {
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
  }, [step, reset]);

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

  const content = (() => {
    switch (step) {
      case "attract":
        return <BcfAttract key="attract" onEnter={() => openLanguage("entry")} />;
      case "intro":
        return (
          <BcfIntro
            key={`intro-${lang}`}
            lang={lang}
            onContinue={() => go(() => setStep("welcome"))}
          />
        );
      case "welcome":
        return (
          <BcfWelcome
            key={`welcome-${lang}`}
            lang={lang}
            onStart={() => go(() => setStep("sections"))}
          />
        );
      case "sections":
        return (
          <BcfSections
            key={`sections-${lang}`}
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
            key={`humanity-${lang}`}
            lang={lang}
            onBack={() => go(() => setStep("sections"))}
          />
        );
      case "hub":
        return (
          <BcfStory
            key={`story-${lang}`}
            lang={lang}
            onBack={() => go(() => setStep("sections"))}
          />
        );
      case "map":
        return (
          <BcfMap
            key={`map-${lang}`}
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
            key={`projects-${lang}-${locationId}`}
            lang={lang}
            locationId={locationId}
            onBack={() =>
              go(() => {
                setModalLocation(locationId);
                setStep("map");
              })
            }
            onOpenProject={(id) =>
              go(() => {
                setProjectId(id);
                setStep("projectDetail");
              })
            }
          />
        );
      case "projectDetail":
        if (!locationId || !projectId) return null;
        return (
          <BcfProjectDetail
            key={`project-${lang}-${locationId}-${projectId}`}
            lang={lang}
            locationId={locationId}
            projectId={projectId}
            onBack={() => go(() => setStep("projects"))}
          />
        );
      case "impact":
        return (
          <BcfImpact
            key={`impact-${lang}`}
            lang={lang}
            onBack={() => go(() => setStep("sections"))}
            onOpenStories={() => go(() => setStep("humanStories"))}
            onOpenGallery={(id) =>
              go(() => {
                setImpactGalleryId(id);
                setStep("impactGallery");
              })
            }
          />
        );
      case "humanStories":
        return (
          <BcfHumanStories
            key={`humanStories-${lang}`}
            lang={lang}
            onBack={() => go(() => setStep("impact"))}
          />
        );
      case "impactGallery":
        if (!impactGalleryId) return null;
        return (
          <BcfImpactGallery
            key={`impactGallery-${lang}-${impactGalleryId}`}
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
            key={`trust-${lang}`}
            lang={lang}
            onBack={() => go(() => setStep("sections"))}
          />
        );
      case "future":
        return (
          <BcfFuture
            key={`future-${lang}`}
            lang={lang}
            onBack={() => go(() => setStep("sections"))}
            onOpenFuture={() => go(() => setStep("futureDetail"))}
            onOpenLegacy={() => go(() => setStep("legacy"))}
          />
        );
      case "futureDetail":
        return (
          <BcfFutureDetail
            key={`futureDetail-${lang}`}
            lang={lang}
            onBack={() => go(() => setStep("future"))}
          />
        );
      case "legacy":
        return (
          <BcfLegacy
            key={`legacy-${lang}`}
            lang={lang}
            onBack={() => go(() => setStep("future"))}
            onRestart={reset}
          />
        );
      default:
        return null;
    }
  })();

  return (
    /* `BCF_PERF_CLASS` is the switch for the low-power rendering path — see
       bcfPerf.ts. It has to sit above the scenes *and* the two overlays, which
       is why it goes on the canvas rather than on the shell. */
    <FitScaledCanvas
      designWidth={DESIGN_WIDTH}
      dir={dir}
      bgClassName="bg-[#0a0a0a]"
      className={BCF_PERF_CLASS}
      fitDeps={[step, lang]}
    >
      {/* `relative` so the rail and the two overlays can pin themselves to the
          artboard rather than the window — they have to scale with it. */}
      <div className="relative flex min-h-[1920px] w-full flex-col">
        {/* `mode="wait"` lets the outgoing scene finish its short exit before the
            next one dissolves up, so the backdrop never cuts to black between
            screens. `initial={false}` keeps the attract from fading in over
            itself on first paint. */}
        <AnimatePresence mode="wait" initial={false}>
          {content}
        </AnimatePresence>

        {step !== "attract" ? (
          <BcfReachRail
            homeLabel={c.home}
            languageLabel={c.language}
            onHome={
              STEPS_WITH_HOME.includes(step)
                ? () => go(() => setStep("sections"))
                : undefined
            }
            onLanguage={() => openLanguage("control")}
            homeActive={step === "sections"}
            offsetForBackButton={STEPS_WITH_BACK_BUTTON.includes(step)}
          />
        ) : null}

        <BcfLanguageOverlay
          open={languageOpen}
          origin={languageOrigin}
          lang={lang}
          onSelect={chooseLanguage}
          onClose={() => setLanguageOpen(false)}
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
