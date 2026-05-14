import React from "react";

import detailPortrait from "@/assets/images/women/w-3.webp";
import HistoricCharacterPanel from "./HistoricCharacterPanel";

export default function KhanzadaKhanumDetail() {
  return (
    <HistoricCharacterPanel
      nameLine1="Khanzad"
      nameLine2="Khanum"
      role="Leader of Soran"
      intro="A powerful Kurdish ruler known for strategic leadership, courage, and regional strength."
      portraitSrc={detailPortrait}
      portraitAlt="Khanzada Khanum"
      cards={[
        {
          icon: "⛨",
          title: "Known For",
          text: "Safeguarding her principality and commanding respect.",
        },
        {
          icon: "♛",
          title: "Legacy",
          text: "A historic symbol of Kurdish women in power.",
        },
        {
          icon: "♜",
          title: "Place & Era",
          text: "Soran • early 17th century.",
        },
      ]}
      quote="Strength and strategy defined her rule."
    />
  );
}
