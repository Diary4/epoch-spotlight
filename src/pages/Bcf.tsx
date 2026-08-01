import React from "react";
import { AnimatePresence } from "motion/react";
import FitScaledCanvas from "@/components/FitScaledCanvas";
import { DESIGN_WIDTH } from "@/hooks/useDesignCanvasFit";
import BcfAttract from "@/components/Sections/bcf/BcfAttract";
import BcfLanguage from "@/components/Sections/bcf/BcfLanguage";
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
import {
  type BcfLang,
  type BcfStep,
  type JourneyChapterId,
  type LocationId,
  type ProjectId,
} from "@/components/Sections/bcf/bcfContent";

export default function BcfPage() {
  const [step, setStep] = React.useState<BcfStep>("attract");
  const [lang, setLang] = React.useState<BcfLang>("en");
  const [locationId, setLocationId] = React.useState<LocationId | null>(null);
  const [modalLocation, setModalLocation] = React.useState<LocationId | null>(null);
  const [projectId, setProjectId] = React.useState<ProjectId | null>(null);

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

  const content = (() => {
    switch (step) {
      case "attract":
        return <BcfAttract key="attract" onFinish={() => go(() => setStep("language"))} />;
      case "language":
        return (
          <BcfLanguage
            key="language"
            onSelect={(next) => {
              go(() => {
                setLang(next);
                setStep("intro");
              });
            }}
          />
        );
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
      default:
        return null;
    }
  })();

  return (
    <FitScaledCanvas
      designWidth={DESIGN_WIDTH}
      dir={dir}
      bgClassName="bg-[#0a0a0a]"
      fitDeps={[step, lang]}
    >
      <div className="flex min-h-[1920px] w-full flex-col">
        {/* `mode="wait"` lets the outgoing scene finish its short exit before the
            next one dissolves up, so the backdrop never cuts to black between
            screens. `initial={false}` keeps the attract reel from fading in over
            itself on first paint. */}
        <AnimatePresence mode="wait" initial={false}>
          {content}
        </AnimatePresence>
      </div>
    </FitScaledCanvas>
  );
}
