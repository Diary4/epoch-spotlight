import React from "react";

import detailPortrait from "@/assets/images/women/historic-detail/hafsa-khanum-detail.webp";
import HistoricCharacterPanel from "./HistoricCharacterPanel";

export default function HafsaKhanumDetail() {
  return (
    <HistoricCharacterPanel
      nameLine1="Hafsa"
      nameLine2="Khanum"
      role="Education Pioneer"
      listIcon="flower"
      intro="A tireless advocate who widened access to learning for girls and treated schooling as the foundation of a stronger society."
      portraitSrc={detailPortrait}
      portraitAlt="Hafsa Khanum"
      cards={[
        {
          icon: "✎",
          title: "Known For",
          text: "Founding and expanding programmes for girls’ education.",
        },
        {
          icon: "♜",
          title: "Legacy",
          text: "Demonstrated that literacy and schools reshape families and futures.",
        },
        {
          icon: "⛩",
          title: "Place & Era",
          text: "Sulaymaniyah • 20th century.",
        },
      ]}
      quote="Every girl who studies opens a new door toward tomorrow."
    />
  );
}
