import React from "react";
import gsap from "gsap";
import WomenScaledCanvas from "@/components/Sections/women/WomenScaledCanvas";
import BcfLanguage from "@/components/Sections/bcf/BcfLanguage";
import BcfIntro from "@/components/Sections/bcf/BcfIntro";
import BcfWelcome from "@/components/Sections/bcf/BcfWelcome";
import BcfHub from "@/components/Sections/bcf/BcfHub";
import BcfMap from "@/components/Sections/bcf/BcfMap";
import BcfProjects from "@/components/Sections/bcf/BcfProjects";
import BcfProjectDetail from "@/components/Sections/bcf/BcfProjectDetail";
import BcfImpact from "@/components/Sections/bcf/BcfImpact";
import BcfFuture from "@/components/Sections/bcf/BcfFuture";
import BcfFutureDetail from "@/components/Sections/bcf/BcfFutureDetail";
import {
  type BcfLang,
  type BcfStep,
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

  React.useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
      );
    }, el);
    return () => ctx.revert();
  }, [step, lang, locationId, projectId, modalLocation]);

  const content = (() => {
    switch (step) {
      case "language":
        return (
          <BcfLanguage
            onSelect={(next) => {
              setLang(next);
              setStep("intro");
            }}
          />
        );
      case "intro":
        return <BcfIntro lang={lang} onContinue={() => setStep("welcome")} />;
      case "welcome":
        return <BcfWelcome lang={lang} onStart={() => setStep("hub")} />;
      case "hub":
        return (
          <BcfHub
            lang={lang}
            onBackToWelcome={() => setStep("welcome")}
            onOpen={(id) => {
              if (id === "map") {
                setModalLocation(null);
                setStep("map");
              } else if (id === "impact") {
                setStep("impact");
              } else {
                setStep("future");
              }
            }}
          />
        );
      case "map":
        return (
          <BcfMap
            lang={lang}
            selectedLocation={modalLocation}
            onSelectLocation={setModalLocation}
            onBack={() => {
              setModalLocation(null);
              setStep("hub");
            }}
            onExploreProjects={(id) => {
              setLocationId(id);
              setModalLocation(null);
              setStep("projects");
            }}
          />
        );
      case "projects":
        if (!locationId) return null;
        return (
          <BcfProjects
            lang={lang}
            locationId={locationId}
            onBack={() => {
              setModalLocation(locationId);
              setStep("map");
            }}
            onOpenProject={(id) => {
              setProjectId(id);
              setStep("projectDetail");
            }}
          />
        );
      case "projectDetail":
        if (!locationId || !projectId) return null;
        return (
          <BcfProjectDetail
            lang={lang}
            locationId={locationId}
            projectId={projectId}
            onBack={() => setStep("projects")}
          />
        );
      case "impact":
        return <BcfImpact lang={lang} onBack={() => setStep("hub")} />;
      case "future":
        return (
          <BcfFuture
            lang={lang}
            onBack={() => setStep("hub")}
            onOpenFuture={() => setStep("futureDetail")}
          />
        );
      case "futureDetail":
        return <BcfFutureDetail lang={lang} onBack={() => setStep("future")} />;
      default:
        return null;
    }
  })();

  return (
    <WomenScaledCanvas dir={dir} bgClassName="bg-[#0a0a0a]" fitViewport fitDeps={[step, lang]}>
      <div ref={stageRef} key={`${step}-${lang}-${locationId ?? ""}-${projectId ?? ""}-${modalLocation ?? ""}`}>
        {content}
      </div>
    </WomenScaledCanvas>
  );
}
