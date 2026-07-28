/* Temporary dev-only harness: measures rendered header heights per language. */
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import Rights from "@/components/Sections/religions/Rights";
import Introduction from "@/components/Sections/religions/Introduction";
import OneShared from "@/components/Sections/religions/OneShared";
import Leaders from "@/components/Sections/religions/LeadersOfCoexistence";
import Faiths from "@/components/Sections/religions/Faiths";
import Nations from "@/components/Sections/religions/Nations";
import Nationalities from "@/components/Sections/religions/Nationalities";
import ReligionsKurdistan from "@/components/Sections/religions/ReligionsKurdistan";
import Coexistence from "@/components/Sections/religions/Coexistence";
import SharedCelebrations from "@/components/Sections/religions/SharedCeleberations";
import History from "@/components/Sections/religions/History";
import Diversities from "@/components/Sections/religions/RelisgionsSection/Diversities";
import KurdistanLanguages from "@/components/Sections/religions/Languages/KurdistanLanguages";
import RightsKRG from "@/components/Sections/religions/RightsSection/RightsKRG";
import RightsParliament from "@/components/Sections/religions/RightsSection/RightsParliament";
import RightsLaws from "@/components/Sections/religions/RightsSection/RightsLaws";
import Rights2014 from "@/components/Sections/religions/RightsSection/Rights2014";
import RightsRefuge from "@/components/Sections/religions/RightsSection/RightsRefuge";
import RightsMedia from "@/components/Sections/religions/RightsSection/RightsMedia";
import Judaism from "@/components/Sections/religions/RelisgionsSection/Judaism";
import Islam from "@/components/Sections/religions/RelisgionsSection/Islam";
import Christianity from "@/components/Sections/religions/RelisgionsSection/Christianity";
import Yazidism from "@/components/Sections/religions/RelisgionsSection/Yazidism";
import Yarsanism from "@/components/Sections/religions/RelisgionsSection/Yarsanism";
import Zoroastrianism from "@/components/Sections/religions/RelisgionsSection/Zoroastrianism";
import Bahai from "@/components/Sections/religions/RelisgionsSection/Bahai";
import Sabean from "@/components/Sections/religions/RelisgionsSection/SabeanMandaeanism";
import OtherFaith from "@/components/Sections/religions/RelisgionsSection/OtherFaith";
import Kurds from "@/components/Sections/religions/nations/Kurds";
import Armenians from "@/components/Sections/religions/nations/Armenians";
import ChaldoAssyrians from "@/components/Sections/religions/nations/ChaldoAssyrians";
import Turkmens from "@/components/Sections/religions/nations/Turkmens";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PAGES: Array<[string, React.ComponentType<any>]> = [
  ["Rights", Rights],
  ["Introduction", Introduction],
  ["OneShared", OneShared],
  ["Leaders", Leaders],
  ["Faiths", Faiths],
  ["Nations", Nations],
  ["Nationalities", Nationalities],
  ["ReligionsKurdistan", ReligionsKurdistan],
  ["Coexistence", Coexistence],
  ["SharedCelebrations", SharedCelebrations],
  ["History", History],
  ["Diversities", Diversities],
  ["KurdistanLanguages", KurdistanLanguages],
  ["RightsKRG", RightsKRG],
  ["RightsParliament", RightsParliament],
  ["RightsLaws", RightsLaws],
  ["Rights2014", Rights2014],
  ["RightsRefuge", RightsRefuge],
  ["RightsMedia", RightsMedia],
  ["Judaism", Judaism],
  ["Islam", Islam],
  ["Christianity", Christianity],
  ["Yazidism", Yazidism],
  ["Yarsanism", Yarsanism],
  ["Zoroastrianism", Zoroastrianism],
  ["Bahai", Bahai],
  ["Sabean", Sabean],
  ["OtherFaith", OtherFaith],
  ["Kurds", Kurds],
  ["Armenians", Armenians],
  ["ChaldoAssyrians", ChaldoAssyrians],
  ["Turkmens", Turkmens],
];

const LANGS = ["en", "ku", "ar"] as const;

const frame = () =>
  new Promise<void>((res) =>
    requestAnimationFrame(() => requestAnimationFrame(() => res())),
  );

async function run() {
  const host = document.getElementById("host")!;
  const out = document.getElementById("out")!;
  const root = createRoot(host);
  const lines: string[] = [];

  await document.fonts.ready;

  for (const [name, C] of PAGES) {
    const row: Record<string, number[]> = {};
    for (const lang of LANGS) {
      root.render(<C lang={lang} onBack={() => {}} onLanguageChange={() => {}} />);
      await frame();
      await new Promise((r) => setTimeout(r, 120));
      row[lang] = Array.from(host.querySelectorAll("header")).map(
        (h) => Math.round((h as HTMLElement).offsetHeight * 10) / 10,
      );
    }
    lines.push(`${name}: en=${row.en} ku=${row.ku} ar=${row.ar}`);
    out.textContent = lines.join("\n");
  }

  out.textContent = lines.join("\n") + "\nDONE";
}

run().catch((e) => {
  document.getElementById("out")!.textContent = "ERROR " + (e?.stack ?? e);
});
