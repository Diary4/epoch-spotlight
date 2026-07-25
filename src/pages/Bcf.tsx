import React from "react";
import gsap from "gsap";
import DesignScaledCanvas from "@/components/DesignScaledCanvas";
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
import {
  type BcfLang,
  type BcfStep,
  type JourneyChapterId,
  type LocationId,
  type ProjectId,
} from "@/components/Sections/bcf/bcfContent";

export default function BcfPage() {
  const [step, setStep] = React.useState<BcfStep>("language");
  const [lang, setLang] = React.useState<BcfLang>("en");
  const [locationId, setLocationId] = React.useState<LocationId | null>(null);
  const [modalLocation, setModalLocation] = React.useState<LocationId | null>(null);
  const [projectId, setProjectId] = React.useState<ProjectId | null>(null);
  const stageRef = React.useRef<HTMLDivElement | null>(null);

  const dir = lang === "en" ? "ltr" : "rtl";
  const navigatingRef = React.useRef(false);

  React.useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    // New screen mounted and visible — clear the navigation guard.
    navigatingRef.current = false;

    const ctx = gsap.context(() => {
      // Opacity only — y-translating full-bleed photos causes stutter.
      gsap.fromTo(
        el,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.35, ease: "power2.out" },
      );
    }, el);
    return () => ctx.revert();
    // Intentionally excludes modalLocation: selecting a pin on the map is an
    // in-page interaction, not a screen change, and shouldn't replay the
    // whole-page entrance fade or force BcfMap to remount.
  }, [step, lang, locationId, projectId]);

  // Fade the current screen out before swapping so each transition reads as one
  // continuous motion instead of a hard cut (this display lives in the VIP room).
  const go = React.useCallback((apply: () => void) => {
    if (navigatingRef.current) return;
    const el = stageRef.current;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!el || prefersReduced) {
      apply();
      return;
    }

    navigatingRef.current = true;
    gsap.to(el, {
      autoAlpha: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: apply,
    });
  }, []);

  const content = (() => {
    switch (step) {
      case "language":
        return (
          <BcfLanguage
            onSelect={(next) => {
              go(() => {
                setLang(next);
                setStep("intro");
              });
            }}
          />
        );
      case "intro":
        return <BcfIntro lang={lang} onContinue={() => go(() => setStep("welcome"))} />;
      case "welcome":
        return <BcfWelcome lang={lang} onStart={() => go(() => setStep("sections"))} />;
      case "sections":
        return (
          <BcfSections
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
                } else {
                  setStep("future");
                }
              });
            }}
          />
        );
      case "humanity":
        return <BcfHumanity lang={lang} onBack={() => go(() => setStep("sections"))} />;
      case "hub":
        return <BcfStory lang={lang} onBack={() => go(() => setStep("sections"))} />;
      case "map":
        return (
          <BcfMap
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
            lang={lang}
            locationId={locationId}
            projectId={projectId}
            onBack={() => go(() => setStep("projects"))}
          />
        );
      case "impact":
        return <BcfImpact lang={lang} onBack={() => go(() => setStep("sections"))} />;
      case "future":
        return (
          <BcfFuture
            lang={lang}
            onBack={() => go(() => setStep("sections"))}
            onOpenFuture={() => go(() => setStep("futureDetail"))}
          />
        );
      case "futureDetail":
        return <BcfFutureDetail lang={lang} onBack={() => go(() => setStep("future"))} />;
      default:
        return null;
    }
  })();

  return (
    <DesignScaledCanvas dir={dir} bgClassName="bg-[#0a0a0a]" fitViewport fitDeps={[step, lang]}>
      <div
        ref={stageRef}
        key={`${step}-${lang}-${locationId ?? ""}-${projectId ?? ""}`}
        className="flex min-h-[1920px] w-full flex-col"
      >
        {content}
      </div>
    </DesignScaledCanvas>
  );
}
