import { NATURAL_PLACES } from "./naturalPlaces";
import { HISTORICAL_PLACES } from "./historicalPlaces";
import { RELIGIOUS_SITES } from "./religousSites";
import { MUSEUM_CENTERS } from "./museumCenters";

// Real photographs supplied under src/assets/images/TouristicPlace/<Folder>/.
// Every image in a folder is loaded via a glob so newly added photos are picked
// up automatically. Each folder maps to a place id below; the first image
// becomes the place's main photo and the rest form its detail-page gallery.
const FOLDER_TO_PLACE = {
  AhmedAwa: "ahmad-awa-resort",
  Biara: "byara-shrines",
  DoliAlana: "alana-valley",
  ErbilCastle: "erbil-citadel",
  GaliAliBag: "gali-ali-begg-waterfall-valley",
  GomyFelaw: "gomi-felaw-alpine-lake",
  Halgurd: "halgurd-mountain",
  KaniRash: "kani-rash-black-spring",
  Lalish: "lalish-temple-yazidi-holy-site",
  Sakran: "sakran-valley",
  "Vin-Shiledze": "sheladeze",
  XanzadCastle: "khanzad-citadel",
  Zaxo: "dalal-bridge-zakho",
  XarandiRwanduz: "rawanduz-canyon",
  SafinMountain: "shaqlawa-resort-town",
  MazariShahidan: "barzan-graveyard-of-martyrs",
  Monoment: "halabja-martyrs-monument-cemetery",
};

const touristicPhotoModules = import.meta.glob(
  "../assets/images/TouristicPlace/*/*.{webp,jpg,jpeg,png,WEBP,JPG,JPEG,PNG}",
  { eager: true, import: "default" },
);

// folder name -> array of image urls (sorted for a stable order)
const FOLDER_IMAGES = {};
for (const [path, url] of Object.entries(touristicPhotoModules)) {
  const match = path.match(/TouristicPlace\/([^/]+)\//);
  if (!match) continue;
  const folder = match[1];
  (FOLDER_IMAGES[folder] ??= []).push({ path, url });
}
Object.values(FOLDER_IMAGES).forEach((list) =>
  list.sort((a, b) => a.path.localeCompare(b.path)),
);

// Hand-picked main photo per place (by filename fragment). The chosen image is
// promoted to the front of the gallery so it becomes the place's cover image.
const PLACE_MAIN_OVERRIDES = {
  "rawanduz-canyon": "IMG_0252 copy 2",
  "gomi-felaw-alpine-lake": "IMG_0595",
  "erbil-citadel": "IMG_8636 copy",
  sheladeze: "Untitled_Panorama1- ven - 2-Recovered -5",
  "lalish-temple-yazidi-holy-site": "DSC_4103 -3",
  "byara-shrines": "peshraw mahdi1 (42)",
};

// place id -> ordered array of photo urls (chosen main image first)
const PLACE_GALLERIES = {};
for (const [folder, placeId] of Object.entries(FOLDER_TO_PLACE)) {
  const images = FOLDER_IMAGES[folder];
  if (!images || !images.length) continue;

  const urls = images.map((item) => item.url);
  const mainKey = PLACE_MAIN_OVERRIDES[placeId];
  const mainIndex = mainKey ? images.findIndex((item) => item.path.includes(mainKey)) : -1;

  PLACE_GALLERIES[placeId] =
    mainIndex > 0
      ? [urls[mainIndex], ...urls.slice(0, mainIndex), ...urls.slice(mainIndex + 1)]
      : urls;
}

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
  places.map((place) => {
    const gallery = PLACE_GALLERIES[place.id] ?? [];
    return {
      ...place,
      type,
      typeLabel: { en: typeEn, ku: typeKu, ar: typeAr },
      cityId: cityIdFromLocation(place.location),
      image: gallery[0] ?? place.image,
      gallery,
      // "Completed" places are the ones with real photographs supplied under the
      // TouristicPlace folder; everything else is still using stock imagery.
      completed: gallery.length > 0,
    };
  }),
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
