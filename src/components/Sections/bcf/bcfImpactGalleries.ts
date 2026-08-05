/**
 * Impact-card dome galleries — every image comes from the matching BCF field
 * folder so a visitor can browse the real photography behind each statistic.
 *
 * Sources are kiosk-sized WebPs under `bcf/optimized/` (max edge 1600px). The
 * original camera JPGs stay in the repo for archival use but are not bundled.
 *
 * Employees maps to `administration/` (there is no dedicated employees folder).
 * IDPs maps to `flood/` emergency-response photography.
 */
import type { DomeImage } from "@/components/Sections/bcf/DomeGallery";
import type { ImpactGalleryId } from "@/components/Sections/bcf/bcfContent";

import emp01 from "@/assets/images/bcf/optimized/administration/2496383.webp";
import emp02 from "@/assets/images/bcf/optimized/administration/405A9925.webp";
import emp03 from "@/assets/images/bcf/optimized/administration/8C6A0443.webp";
import emp04 from "@/assets/images/bcf/optimized/administration/8C6A0612.webp";
import emp05 from "@/assets/images/bcf/optimized/administration/8C6A7435.webp";
import emp06 from "@/assets/images/bcf/optimized/administration/8C6A7443.webp";
import emp07 from "@/assets/images/bcf/optimized/administration/FB_IMG_1785061539929.webp";
import emp08 from "@/assets/images/bcf/optimized/administration/whatsapp-admin.webp";
import emp09 from "@/assets/images/bcf/optimized/administration/fff.webp";

import camp01 from "@/assets/images/bcf/optimized/camps/baharka.webp";
import camp02 from "@/assets/images/bcf/optimized/camps/basrma.webp";
import camp03 from "@/assets/images/bcf/optimized/camps/dara-shakran.webp";
import camp04 from "@/assets/images/bcf/optimized/camps/debaga.webp";
import camp05 from "@/assets/images/bcf/optimized/camps/harsham.webp";
import camp06 from "@/assets/images/bcf/optimized/camps/hasa-sham-bnkay-tandrusti.webp";
import camp07 from "@/assets/images/bcf/optimized/camps/hasan-sham-u2.webp";
import camp08 from "@/assets/images/bcf/optimized/camps/hasan-sham-u3.webp";
import camp09 from "@/assets/images/bcf/optimized/camps/kawrgosk.webp";
import camp10 from "@/assets/images/bcf/optimized/camps/qushtapa.webp";
import camp11 from "@/assets/images/bcf/optimized/camps/xazir-bnkay-tandrusti.webp";
import camp12 from "@/assets/images/bcf/optimized/camps/xazir.webp";

import idp01 from "@/assets/images/bcf/optimized/flood/2B1A6744.webp";
import idp02 from "@/assets/images/bcf/optimized/flood/2B1A6924.webp";
import idp03 from "@/assets/images/bcf/optimized/flood/4520448.webp";
import idp04 from "@/assets/images/bcf/optimized/flood/4949107.webp";
import idp05 from "@/assets/images/bcf/optimized/flood/5534246.webp";
import idp06 from "@/assets/images/bcf/optimized/flood/6816800.webp";
import idp07 from "@/assets/images/bcf/optimized/flood/8C6A6595.webp";

import school01 from "@/assets/images/bcf/optimized/schools/8D1A6532.webp";
import school02 from "@/assets/images/bcf/optimized/schools/8D1A6548.webp";
import school03 from "@/assets/images/bcf/optimized/schools/8D1A6556.webp";
import school04 from "@/assets/images/bcf/optimized/schools/8D1A7003.webp";
import school05 from "@/assets/images/bcf/optimized/schools/8D1A7008.webp";
import school06 from "@/assets/images/bcf/optimized/schools/8D1A7011.webp";
import school07 from "@/assets/images/bcf/optimized/schools/IMG_6698.webp";
import school08 from "@/assets/images/bcf/optimized/schools/IMG_6785.webp";
import school09 from "@/assets/images/bcf/optimized/schools/IMG_6982.webp";
import school10 from "@/assets/images/bcf/optimized/schools/photo_2022-08-28.webp";
import school11 from "@/assets/images/bcf/optimized/schools/photo_2022-09-04.webp";
import school12 from "@/assets/images/bcf/optimized/schools/photo_2022-09-12.webp";

function toDome(srcs: string[], alt: string): DomeImage[] {
  return srcs.map((src, index) => ({
    src,
    alt: `${alt} ${String(index + 1).padStart(2, "0")}`,
  }));
}

export const IMPACT_GALLERY_IMAGES: Record<ImpactGalleryId, DomeImage[]> = {
  employees: toDome(
    [emp01, emp02, emp03, emp04, emp05, emp06, emp07, emp08, emp09],
    "Employees",
  ),
  camps: toDome(
    [
      camp01,
      camp02,
      camp03,
      camp04,
      camp05,
      camp06,
      camp07,
      camp08,
      camp09,
      camp10,
      camp11,
      camp12,
    ],
    "Camps",
  ),
  idps: toDome(
    [idp01, idp02, idp03, idp04, idp05, idp06, idp07],
    "IDPs and Refugees",
  ),
  schools: toDome(
    [
      school01,
      school02,
      school03,
      school04,
      school05,
      school06,
      school07,
      school08,
      school09,
      school10,
      school11,
      school12,
    ],
    "Schools",
  ),
};
