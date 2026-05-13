import office from "@/assets/office.webp";
import natureBg from "@/assets/images/nature.webp";
import secondBg from "@/assets/second-bg.svg";
import firstPerson from "@/assets/firstperson.webp";
import bg from "@/assets/images/bg.webp";
import trump from "@/assets/images/trump.webp";
import benjaminfranklin from "@/assets/images/benjaminfranklin.webp";
import napoleon from "@/assets/images/napel.webp";

export type Portrait = {
  id: number;
  name: string;
  role: string;
  image: string;
  images: string[];
  about: string;
};

const BASE_PORTRAITS: Omit<Portrait, "id">[] = [
  {
    name: "Arin Soran",
    role: "Regional Commander",
    image: benjaminfranklin,
    images: [benjaminfranklin, napoleon, trump, bg, trump, benjaminfranklin],
    about: "A strategic leader focused on civic growth and cross-border cooperation.",
  },
  {
    name: "Lana Barin",
    role: "Archive Speaker",
    image: trump,
    images: [trump,natureBg, firstPerson, office],
    about: "Known for preserving oral history and translating legacy records for younger generations.",
  },
  {
    name: "Dara Haval",
    role: "Council Head",
    image: napoleon,
    images: [napoleon, natureBg, firstPerson],
    about: "A unifying figure who connects education, infrastructure, and public trust.",
  },
  {
    name: "Tara Helin",
    role: "Cultural Ambassador",
    image: office,
    images: [office, secondBg, natureBg],
    about: "Promotes identity, arts, and community dialogue across districts.",
  },
  {
    name: "Rayan Zhyar",
    role: "Field Coordinator",
    image: natureBg,
    images: [natureBg, office, secondBg],
    about: "Coordinates operations between institutions and local teams.",
  },
  {
    name: "Nalin Azad",
    role: "Policy Architect",
    image: firstPerson,
    images: [firstPerson, secondBg, office],
    about: "Designs long-term policy with focus on resilient public services.",
  },
];

export const PORTRAITS: Portrait[] = Array.from({ length: 100 }, (_, index) => {
  const base = BASE_PORTRAITS[index % BASE_PORTRAITS.length];
  return {
    ...base,
    id: 42 + index,
    name: `${base.name} ${index + 1}`,
  };
});

export const getPortraitById = (id: number) => PORTRAITS.find((portrait) => portrait.id === id);
