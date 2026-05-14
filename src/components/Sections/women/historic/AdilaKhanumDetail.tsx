import React from "react";

import detailPortrait from "@/assets/images/women/historic-detail/adila-khanum-detail.webp";
import HistoricCharacterPanel from "./HistoricCharacterPanel";

export default function AdilaKhanumDetail() {
  return (
    <HistoricCharacterPanel
      nameLine1="Adila"
      nameLine2="Khanum"
      role="Ruler of Halabja"
      intro="A visionary leader who governed Halabja with justice and diplomacy, lifting trade, order, and the dignity of her people."
      portraitSrc={detailPortrait}
      portraitAlt="Adila Khanum"
      cards={[
        {
          icon: "⚖",
          title: "Known For",
          text: "Governing Halabja with wisdom, reform, and steady diplomacy.",
        },
        {
          icon: "♛",
          title: "Legacy",
          text: "Remembered as a model of civic leadership in Kurdish history.",
        },
        {
          icon: "♜",
          title: "Place & Era",
          text: "Halabja • late 19th & early 20th century.",
        },
      ]}
      quote="True leadership can uplift a city and forge a nation."
    />
  );
}
