import React from "react";

import detailPortrait from "@/assets/images/women/historic-detail/halima-khanum-detail.webp";
import HistoricCharacterPanel from "./HistoricCharacterPanel";

export default function HalimaKhanumDetail() {
  return (
    <HistoricCharacterPanel
      nameLine1="Halima"
      nameLine2="Khanum"
      role="Leader of the Bashqal Tribe"
      listIcon="crown"
      intro="A Kurdish leader of memory who stood with her people through political upheaval, offering steadiness when the ground itself seemed to shift."
      portraitSrc={detailPortrait}
      portraitAlt="Halima Khanum"
      cards={[
        {
          icon: "⛨",
          title: "Known For",
          text: "Defending her community and guiding the Bashqal through hardship.",
        },
        {
          icon: "♛",
          title: "Legacy",
          text: "A reminder that tribal leadership and counsel belonged to women too.",
        },
        {
          icon: "♜",
          title: "Place & Era",
          text: "Bashqal • 19th century.",
        },
      ]}
      quote="Leadership and guidance had women’s share in them too."
    />
  );
}
