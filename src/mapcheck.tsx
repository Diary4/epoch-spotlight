import React from "react";
import { createRoot } from "react-dom/client";
import BcfKurdistanMap from "@/components/Sections/bcf/BcfKurdistanMap";
import { BCF_FIELD_BG } from "@/components/Sections/bcf/bcfTheme";
import "./index.css";

function Harness() {
  const [sel, setSel] = React.useState<null | string>(null);
  return (
    <div style={{ width: 1080, height: 1500, position: "relative", overflow: "hidden", background: BCF_FIELD_BG, color: "#fff" }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
        <BcfKurdistanMap
          lang="en"
          active
          selectedLocation={sel as never}
          onSelectLocation={(id) => setSel(id as never)}
          onExploreProjects={() => {}}
        />
      </div>
    </div>
  );
}
createRoot(document.getElementById("root")!).render(<Harness />);
