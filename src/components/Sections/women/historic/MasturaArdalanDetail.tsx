import React from "react";

/** Grid thumbnails stay in `Historic.tsx`; swap this file for a different detail portrait. */
import detailPortrait from "@/assets/images/women/w-1.webp";
import HistoricCharacterPanel from "./HistoricCharacterPanel";

export default function MasturaArdalanDetail() {
  return (
    <HistoricCharacterPanel
      nameLine1="Mastura"
      nameLine2="Ardalan"
      role="Poet and Historian"
      listIcon="flower"
      intro="An early Kurdish writer whose poetry and historical writing preserved memory, identity, and the story of her time."
      portraitSrc={detailPortrait}
      portraitAlt="Mastura Ardalan"
      cards={[
        {
          icon: "✒",
          title: "Known For",
          text: "Writing poetry and history.",
        },
        {
          icon: "📖",
          title: "Legacy",
          text: "One of the earliest Kurdish women of letters.",
        },
        {
          icon: "⛩",
          title: "Place & Era",
          text: "Ardalan Principality • 19th century.",
        },
      ]}
      quote="She wrote herself into history."
    />
  );
}
