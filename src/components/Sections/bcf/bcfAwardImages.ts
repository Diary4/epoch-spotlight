/**
 * Award / recognition plates for Trust → Recognition → Awards.
 *
 * Eager-loaded so the awards grid opens without a decode pause on first tap.
 * Headline honours lead the grid in the curated order; the rest follow.
 */

import featuredMedal from "@/assets/images/bcf/awards/e5c32586-98f0-4f37-94ba-e70929a0f7a0.webp";
import featuredMedalCertificate from "@/assets/images/bcf/awards/barzani-medal-certificate-2018.webp";
import featuredAgitator from "@/assets/images/bcf/awards/6f41b5d0-3b93-441a-a104-c1341f3d4723.webp";
import featuredBundestag from "@/assets/images/bcf/awards/63959e9f-7e2a-46a8-8299-5269b4c3dd32.webp";
import featuredWingsOfHelp from "@/assets/images/bcf/awards/0cd31f0a-7c0e-434c-92c4-d1bd67949571.webp";
import featuredWingsCertificate from "@/assets/images/bcf/awards/61684958-a477-4fe0-af7e-685d3ba484cf.webp";
import featuredUnhcr from "@/assets/images/bcf/awards/7bd68b40-ec16-43a9-93b5-fed0b47e4d6b.webp";
import featuredHumanRights from "@/assets/images/bcf/awards/c8ba53ca-a769-4294-a4f9-2943b9333f18.webp";
import featuredMasoudGift from "@/assets/images/bcf/awards/95b05a84-ffb1-497c-a5cc-d70961c84408.webp";
import featuredPlaque from "@/assets/images/bcf/awards/fb56d7b9-fd12-4175-96dd-a65bd49d10af.webp";
import featuredFlag from "@/assets/images/bcf/awards/0cd1aa62-481a-4cdc-bb7a-0c2ad39dcb04.webp";
import featuredMemorial from "@/assets/images/bcf/awards/570f12d4-9fe6-4e49-a6ab-84104200ccb5.webp";
import featuredHealthErbil from "@/assets/images/bcf/awards/fe4b9f57-0c58-4a89-b7a0-432e96be81e1.webp";
import featuredMusaBox from "@/assets/images/bcf/awards/837f9e1b-9d12-418b-8c1d-d76fd8fdaa3b.webp";
import featuredErbilGov from "@/assets/images/bcf/awards/f80756e6-fbed-4f23-81e2-598ab3b31b06.webp";
import featuredK24 from "@/assets/images/bcf/awards/3792ab54-4500-4bab-9481-a5b1c531cd5f.webp";
import featuredInvestment from "@/assets/images/bcf/awards/54a917ec-f78c-444b-aba7-735f8400da00.webp";
import featuredAva from "@/assets/images/bcf/awards/ad0c88ce-3317-4b2e-ad89-12d277500ee4.webp";
import featuredHealthAnniversary from "@/assets/images/bcf/awards/9f5a922e-f0a3-4af8-94db-eb54129c7a2c.webp";
import featuredKdpKirkuk from "@/assets/images/bcf/awards/2041a20e-3fc3-46c9-bf9e-403a5dcb5e69.webp";
import featuredBarzaniBust from "@/assets/images/bcf/awards/d81b363d-c2ee-4a20-a394-74dab3b529df.webp";

function collect(modules: Record<string, string>): string[] {
  return Object.keys(modules)
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
    .map((key) => modules[key]);
}

/** Curated lead order — Barzani medal, then its 2018 certificate, then the rest. */
const featuredAwardImages = [
  featuredMedal,
  featuredMedalCertificate,
  featuredWingsOfHelp,
  featuredWingsCertificate,
  featuredAgitator,
  featuredBundestag,
  featuredUnhcr,
  featuredHumanRights,
  featuredMasoudGift,
  featuredPlaque,
  featuredFlag,
  featuredMemorial,
  featuredHealthErbil,
  featuredMusaBox,
  featuredErbilGov,
  featuredK24,
  featuredInvestment,
  featuredAva,
  featuredHealthAnniversary,
  featuredKdpKirkuk,
  featuredBarzaniBust,
];

const awardModules = import.meta.glob<string>(
  "@/assets/images/bcf/awards/*.webp",
  { eager: true, import: "default" },
);

const featuredSet = new Set(featuredAwardImages);

export const bcfAwardImages: string[] = [
  ...featuredAwardImages,
  ...collect(awardModules).filter((src) => !featuredSet.has(src)),
];
