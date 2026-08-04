/**
 * Impact-card dome galleries — every image comes from the matching BCF field
 * folder so a visitor can browse the real photography behind each statistic.
 *
 * Employees maps to `administration/` (there is no dedicated employees folder).
 * IDPs maps to `flood/` emergency-response photography.
 */
import type { DomeImage } from "@/components/Sections/bcf/DomeGallery";
import type { ImpactGalleryId } from "@/components/Sections/bcf/bcfContent";

import emp01 from "@/assets/images/bcf/administration/2496383.jpg";
import emp02 from "@/assets/images/bcf/administration/405A9925.jpg";
import emp03 from "@/assets/images/bcf/administration/8C6A0443.JPG";
import emp04 from "@/assets/images/bcf/administration/8C6A0612.JPG";
import emp05 from "@/assets/images/bcf/administration/8C6A7435 - Copy.JPG";
import emp06 from "@/assets/images/bcf/administration/8C6A7443.JPG";
import emp07 from "@/assets/images/bcf/administration/FB_IMG_1785061539929.jpg";
import emp08 from "@/assets/images/bcf/administration/WhatsApp Image 2026-07-23 at 3.27.23 AM.jpeg";
import emp09 from "@/assets/images/bcf/administration/fff.jpg";

import camp01 from "@/assets/images/bcf/camps/baharka.JPG";
import camp02 from "@/assets/images/bcf/camps/basrma.JPG";
import camp03 from "@/assets/images/bcf/camps/dara shakran.JPG";
import camp04 from "@/assets/images/bcf/camps/debaga.JPG";
import camp05 from "@/assets/images/bcf/camps/harsham.JPG";
import camp06 from "@/assets/images/bcf/camps/hasa sham bnkay tandrusti.JPG";
import camp07 from "@/assets/images/bcf/camps/hasan sham u2.JPG";
import camp08 from "@/assets/images/bcf/camps/hasan sham u3.JPG";
import camp09 from "@/assets/images/bcf/camps/kawrgosk.JPG";
import camp10 from "@/assets/images/bcf/camps/qushtapa.JPG";
import camp11 from "@/assets/images/bcf/camps/xazir bnkay tandrusti.JPG";
import camp12 from "@/assets/images/bcf/camps/xazir.JPG";

import idp01 from "@/assets/images/bcf/flood/2B1A6744.JPG";
import idp02 from "@/assets/images/bcf/flood/2B1A6924.JPG";
import idp03 from "@/assets/images/bcf/flood/4520448.jpg";
import idp04 from "@/assets/images/bcf/flood/4949107.jpg";
import idp05 from "@/assets/images/bcf/flood/5534246.jpg";
import idp06 from "@/assets/images/bcf/flood/6816800 copy.jpg";
import idp07 from "@/assets/images/bcf/flood/8C6A6595.JPG";

import school01 from "@/assets/images/bcf/schools/8D1A6532.JPG";
import school02 from "@/assets/images/bcf/schools/8D1A6548.JPG";
import school03 from "@/assets/images/bcf/schools/8D1A6556.JPG";
import school04 from "@/assets/images/bcf/schools/8D1A7003.JPG";
import school05 from "@/assets/images/bcf/schools/8D1A7008.JPG";
import school06 from "@/assets/images/bcf/schools/8D1A7011.JPG";
import school07 from "@/assets/images/bcf/schools/IMG_6698.JPG";
import school08 from "@/assets/images/bcf/schools/IMG_6785.JPG";
import school09 from "@/assets/images/bcf/schools/IMG_6982.JPG";
import school10 from "@/assets/images/bcf/schools/photo_2022-08-28_19-02-46.jpg";
import school11 from "@/assets/images/bcf/schools/photo_2022-09-04_10-30-59.jpg";
import school12 from "@/assets/images/bcf/schools/photo_2022-09-12_14-44-03.jpg";

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
