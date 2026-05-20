import erbilCitadelImage from "@/assets/mainImages/building.webp";
import shanidarImage from "@/assets/mainImages/land-3.webp";
import akreImage from "@/assets/mainImages/land-4.webp";

export const HISTORICAL_PLACES = [
  {
    id: "erbil-citadel",
    name: "Erbil Citadel",
    location: "Erbil City",
    image: erbilCitadelImage,
    description:
      "One of the world's oldest continuously inhabited sites. UNESCO World Heritage Site (2014). The mound rises 25-32m above the city with 6,000 years of civilizations layered beneath. Before modernization in the 1930s it contained over 500 traditional courtyard houses.",
    role: "Historical",
    distanceFromErbil: "0 km - city center",
    bestTimeToVisit: "March-May, October-November.",
    visitorExperience:
      "Walk ancient alleys, visit the Textile Museum and renovated houses. 360-degree views over Erbil.",
    travelGuidance:
      "On foot from central Erbil. All transport routes pass through the city center.",
    accommodation: "Full range of hotels in Erbil city.",
  },
  {
    id: "shanidar-cave",
    name: "Shanidar Cave",
    location: "Bradost Mountain, Erbil Governorate",
    image: shanidarImage,
    description:
      "Located on Bradost Mountain. Remains of ten Neanderthals dating 35,000-65,000 years ago were discovered here, one of the world's most significant prehistoric sites. Also contains two proto-Neolithic cemeteries.",
    role: "Historical | Natural",
    distanceFromErbil: "~100 km northeast",
    bestTimeToVisit: "Spring and autumn.",
    visitorExperience:
      "Hiking to the cave entrance, stunning mountain scenery, site of ongoing international archaeological research.",
    travelGuidance:
      "Via Soran road then mountain trail. 4WD recommended. Approx. 2-2.5 hours.",
    accommodation:
      "Basic guesthouses in nearby Soran (~50 km). Korek Mountain Resort accessible.",
  },
  {
    id: "akre-town-citadel",
    name: "Akre Town & Citadel",
    location: "Duhok Province",
    image: akreImage,
    description:
      "Founded by Kurdish Prince Zand in 580 BC. Rich in temples, statues, ancient houses, mineral springs, the 30m Sepa Waterfall, and a Zoroastrian cave temple. Located at the foot of the Speelik and Kaynagal mountains.",
    role: "Historical | Natural",
    distanceFromErbil: "~175 km northeast",
    bestTimeToVisit: "March 20 (Newroz), spring and autumn.",
    visitorExperience:
      "Citadel exploration, Sepa Waterfall, therapeutic mineral springs, Zarathustra Temple cave.",
    travelGuidance:
      "Via Erbil-Gwer-Makhmour-Akre road, or via Duhok-Akre road. Approx. 2-2.5 hours from Erbil.",
    accommodation:
      "Local hotels and guesthouses in Akre. Duhok city (~100 km) for more options.",
  },
];
