import { NATURAL_PLACES } from "./naturalPlaces";
import { HISTORICAL_PLACES } from "./historicalPlaces";
import { RELIGIOUS_SITES } from "./religousSites";
import { MUSEUM_CENTERS } from "./museumCenters";

// Real photographs supplied under src/assets/images/TouristicPlace/<Place>/.
// Each folder is mapped to the matching place id below; places without a
// dedicated folder keep their existing stock image.
import ahmedAwaImg from "@/assets/images/TouristicPlace/AhmedAwa/1000140566.webp";
import biaraImg from "@/assets/images/TouristicPlace/Biara/DSC_6811.webp";
import doliAlanaImg from "@/assets/images/TouristicPlace/DoliAlana/8.webp";
import erbilCastleImg from "@/assets/images/TouristicPlace/ErbilCastle/DSC_5315.webp";
import galiAliBagImg from "@/assets/images/TouristicPlace/GaliAliBag/16.webp";
import gomyFelawImg from "@/assets/images/TouristicPlace/GomyFelaw/1000140541.webp";
import halgurdImg from "@/assets/images/TouristicPlace/Halgurd/DSC04490.webp";
import kaniRashImg from "@/assets/images/TouristicPlace/KaniRash/1000140547.webp";
import lalishImg from "@/assets/images/TouristicPlace/Lalish/DSC_4018.webp";
import sakranImg from "@/assets/images/TouristicPlace/Sakran/DSC_3019 copy.webp";
import sheledzeImg from "@/assets/images/TouristicPlace/Vin-Shiledze/DSC04039.webp";
import xanzadCastleImg from "@/assets/images/TouristicPlace/XanzadCastle/IMG_8529 copy 3.webp";
import zaxoImg from "@/assets/images/TouristicPlace/Zaxo/IMG_9943 copy 3.webp";
import xarandiImg from "@/assets/images/TouristicPlace/XarandiRwanduz/IMG_0249 copy.webp";
import safinImg from "@/assets/images/TouristicPlace/SafinMountain/50560984651_d1bde10089_o.webp";
import mazariShahidanImg from "@/assets/images/TouristicPlace/MazariShahidan/1000140591.webp";
import monomentImg from "@/assets/images/TouristicPlace/Monoment/1000140549.webp";

const PLACE_IMAGE_OVERRIDES = {
  "ahmad-awa-resort": ahmedAwaImg,
  "byara-shrines": biaraImg,
  "alana-valley": doliAlanaImg,
  "erbil-citadel": erbilCastleImg,
  "gali-ali-begg-waterfall-valley": galiAliBagImg,
  "gomi-felaw-alpine-lake": gomyFelawImg,
  "halgurd-mountain": halgurdImg,
  "kani-rash-black-spring": kaniRashImg,
  "lalish-temple-yazidi-holy-site": lalishImg,
  "sakran-valley": sakranImg,
  sheladeze: sheledzeImg,
  "khanzad-citadel": xanzadCastleImg,
  "dalal-bridge-zakho": zaxoImg,
  "rawanduz-canyon": xarandiImg,
  "shaqlawa-resort-town": safinImg,
  "barzan-graveyard-of-martyrs": mazariShahidanImg,
  "halabja-martyrs-monument-cemetery": monomentImg,
};

// Primary browse dimension: the Kurdistan city / area a place belongs to.
export const CITY_CATEGORIES = [
  { id: "erbil", en: "Erbil", ku: "هەولێر", ar: "أربيل" },
  { id: "sulaymaniyah", en: "Sulaymaniyah", ku: "سلێمانی", ar: "السليمانية" },
  { id: "duhok", en: "Duhok", ku: "دهۆک", ar: "دهوك" },
  { id: "halabja", en: "Halabja", ku: "هەڵەبجە", ar: "حلبجة" },
  { id: "garmyan", en: "Garmyan", ku: "گەرمیان", ar: "گرميان" },
  { id: "kirkuk", en: "Kirkuk", ku: "کەرکووک", ar: "كركوك" },
  { id: "khanaqin", en: "Khanaqin", ku: "خانەقین", ar: "خانقين" },
];

const DEFAULT_CITY = "erbil";

// Derives the city id from a place's free-text `location`. Ordered from the
// most specific / self-contained regions to the general province fallbacks so
// that ambiguous strings (e.g. "Between Erbil & Sulaymaniyah") resolve sensibly.
function cityIdFromLocation(location = "") {
  const s = String(location).toLowerCase();

  if (/(halabja|hawraman|horaman|byara|biara|taweila|tawela|khurmal|awesar)/.test(s)) return "halabja";
  if (/(khanaqin|khaniqin|diyala)/.test(s)) return "khanaqin";
  if (/kirkuk/.test(s)) return "kirkuk";
  if (/(garmyan|garmiyan|germiyan|kalar|kifri)/.test(s)) return "garmyan";
  if (
    /(duhok|dohuk|zakho|zaxo|amedi|amadiya|amediya|akre|sarsang|badinan|sheladeze|zawita|swaratuka|deraluk|sharanish|shexan|shekhan|dinarta|bamerni|solav|zawa)/.test(
      s,
    )
  )
    return "duhok";
  if (
    /(erbil|hawler|soran|choman|rawanduz|rwanduz|shaqlawa|khalifan|koya|pirmam|sidikan|sidekan|balakian|barzan|mergasor|mirgasor|harir|makhmour|gwer|bradost)/.test(
      s,
    )
  )
    return "erbil";
  if (
    /(sulaymaniyah|sulaimani|slemani|dukan|ranya|rania|qaladiza|chamchamal|penjwin|sharbazher|mawat|peramagroon|goizha|bazyan|qaradagh|zaiwei|sargalu|barzinja|midan|sordash|darbandikhan|qashqoli|nawroli|mergapan|sarchnar|sarsir|setak|halabja)/.test(
      s,
    )
  )
    return "sulaymaniyah";

  return DEFAULT_CITY;
}

const SOURCES = [
  { type: "nature", typeEn: "Nature", typeKu: "سروشتی", typeAr: "طبيعية", places: NATURAL_PLACES },
  { type: "historical", typeEn: "Historical", typeKu: "مێژوویی", typeAr: "تاريخية", places: HISTORICAL_PLACES },
  { type: "religious", typeEn: "Religious", typeKu: "ئایینی", typeAr: "دينية", places: RELIGIOUS_SITES },
  { type: "museums", typeEn: "Museums", typeKu: "مۆزەخانە", typeAr: "متاحف", places: MUSEUM_CENTERS },
];

// Flattened list of every place, augmented with `cityId`, `type` and (where
// available) a real photograph. Ids are unique across the source datasets.
export const ALL_PLACES = SOURCES.flatMap(({ type, typeEn, typeKu, typeAr, places }) =>
  places.map((place) => ({
    ...place,
    type,
    typeLabel: { en: typeEn, ku: typeKu, ar: typeAr },
    cityId: cityIdFromLocation(place.location),
    image: PLACE_IMAGE_OVERRIDES[place.id] ?? place.image,
  })),
);

export function getCityCategory(cityId) {
  return CITY_CATEGORIES.find((city) => city.id === cityId) ?? CITY_CATEGORIES[0];
}

export function getPlacesByCity(cityId) {
  return ALL_PLACES.filter((place) => place.cityId === cityId);
}

export function getPlaceById(id) {
  return ALL_PLACES.find((place) => place.id === id) ?? null;
}
