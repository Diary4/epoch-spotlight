import museumImage from "@/assets/mainImages/building.webp";
import citadelImage from "@/assets/mainImages/card-3.webp";
import cityImage from "@/assets/mainImages/discoverkurdistan/card-1.webp";
import craftImage from "@/assets/mainImages/letter.webp";
import parkImage from "@/assets/mainImages/discoverkurdistan/card-2.webp";
import natureImage from "@/assets/mainImages/land-5.webp";

export const MUSEUM_CENTERS = [
  {
    id: "kurdish-textile-museum",
    name: "Kurdish Textile Museum",
    location: "Erbil Citadel",
    image: museumImage,
    description:
      "Located inside the Erbil Citadel, the Kurdish Textile Museum exhibits artifacts that demonstrate Kurdistan's ancient traditions of spinning and weaving. Exhibits include carpets, clothing, raw materials, and wool dyed naturally using wild plants and flowers.",
    role: "Cultural | Historical",
    distanceFromErbil: "0 km - city center (inside the Citadel)",
    bestTimeToVisit: "Year-round.",
    visitorExperience:
      "Viewing historic carpets, traditional clothing, spinning and weaving tools, naturally dyed wool, a comprehensive overview of Kurdish textile heritage.",
    travelGuidance: "Inside the Erbil Citadel. On foot from central Erbil.",
    accommodation: "Full range of Erbil city hotels.",
  },
  {
    id: "erbil-citadel-mosque",
    name: "Erbil Citadel Mosque",
    location: "Erbil Citadel",
    image: citadelImage,
    description:
      "The first mosque to be built on the Citadel grounds, located in its center. Mentioned by Yaqout Hamawi in 1220 AD in 'The Compendium of Countries.' Referred to as the Fortress Mosque by Ibn Mustawfi in 'The History of Erbil.' Renovated in 1719-1720 AD.",
    role: "Cultural | Religious",
    distanceFromErbil: "0 km - city center (inside the Citadel)",
    bestTimeToVisit: "Year-round.",
    visitorExperience:
      "Visiting the historic mosque, viewing its decorated Mihrab (prayer niche) with its 1719 renovation inscription.",
    travelGuidance: "Inside the Erbil Citadel. On foot from central Erbil.",
    accommodation: "Full range of Erbil city hotels.",
  },
  {
    id: "erbil-citadel-bath-hamam",
    name: "Erbil Citadel Bath (Hamam)",
    location: "Erbil Citadel",
    image: citadelImage,
    description:
      "More than 200 years old, dating back to the 18th century. Consists of two main sections: one for summer and one for winter. Two large domes top its two bathing halls. On the north side is a 45m deep well that reaches all the way to the base of the Citadel.",
    role: "Cultural | Historical",
    distanceFromErbil: "0 km - city center (inside the Citadel)",
    bestTimeToVisit: "Year-round.",
    visitorExperience:
      "Exploring the 18th-century hamam, viewing its two domed halls, the famous 45m deep well, and learning about traditional Kurdish bathing culture.",
    travelGuidance: "Inside the Erbil Citadel. On foot from central Erbil.",
    accommodation: "Full range of Erbil city hotels.",
  },
  {
    id: "erbil-archaeological-museum",
    name: "Erbil Archaeological Museum",
    location: "Erbil City",
    image: museumImage,
    description:
      "Located in the city center, opposite City Hall. Divided into three sections with artifacts exhibited chronologically. The earliest exhibits date back to 5,000 BC. An extensive library, one of the most prestigious in the city, is located next door.",
    role: "Cultural | Historical",
    distanceFromErbil: "0 km - city center",
    bestTimeToVisit: "Year-round.",
    visitorExperience:
      "Walking through 7,000 years of history across three chronological sections; visiting the prestigious historical library next door.",
    travelGuidance:
      "Opposite Erbil City Hall, central Erbil. Accessible by all transport.",
    accommodation: "Full range of Erbil city hotels.",
  },
  {
    id: "sulaymaniyah-museum",
    name: "Sulaymaniyah Museum",
    location: "Sulaymaniyah City",
    image: museumImage,
    description:
      "Contains thousands of ancient artifacts including tablets and pottery. Visitors embark on a journey through Kurdish history as they walk through its rooms. One of the most important museums in Kurdistan and a must-see for tourists.",
    role: "Cultural | Historical",
    distanceFromErbil: "~185 km southeast",
    bestTimeToVisit: "Year-round.",
    visitorExperience:
      "Viewing thousands of ancient artifacts including tablets and pottery; a comprehensive journey through Kurdish and Mesopotamian history.",
    travelGuidance:
      "Central Sulaymaniyah, near Freedom Square (Saray). Accessible by taxi from all city hotels.",
    accommodation: "Full range of Sulaymaniyah city hotels.",
  },
  {
    id: "sulaymaniyah-handicraft-gallery",
    name: "Sulaymaniyah Handicraft Gallery",
    location: "Sulaymaniyah City",
    image: craftImage,
    description:
      "Built in 1971, located in the center of the city next to the Sulaymaniyah Museum. Offers courses and exhibitions on ceramics, silk-screening, carpet weaving, leather working, carpentry, sewing, floristry, and upholstery.",
    role: "Cultural",
    distanceFromErbil: "~185 km southeast",
    bestTimeToVisit: "Year-round.",
    visitorExperience:
      "Viewing and purchasing traditional Kurdish crafts, watching skilled artisans at work, attending craft courses.",
    travelGuidance:
      "Central Sulaymaniyah, next to the Sulaymaniyah Museum. Near Freedom Square.",
    accommodation: "Full range of Sulaymaniyah city hotels.",
  },
  {
    id: "freedom-square-saray",
    name: "Freedom Square (Saray)",
    location: "Sulaymaniyah City",
    image: cityImage,
    description:
      "Freedom Square, also known as the Saray, lies at the center of Sulaymaniyah city with several museums in the same area. The cultural and social heart of the city, a historic gathering place for Sulaymaniyah's intellectual and political life.",
    role: "Cultural",
    distanceFromErbil: "~185 km southeast",
    bestTimeToVisit: "Year-round. Evenings for atmosphere.",
    visitorExperience:
      "Walking through the cultural heart of Sulaymaniyah, visiting adjacent museums and cultural institutions, experiencing the city's intellectual atmosphere.",
    travelGuidance: "Central Sulaymaniyah. Accessible by taxi from all city hotels.",
    accommodation: "Full range of Sulaymaniyah city hotels.",
  },
  {
    id: "chavi-tourist-city",
    name: "Chavi Tourist City (Chavi Geshtyari)",
    location: "Sulaymaniyah City",
    image: parkImage,
    description:
      "One of Kurdistan's biggest tourism projects. Consists of a wax museum, a cinema, amusements, hotels, restaurants, green areas and fountains. Features a cable car from Maleek Mahmoud Circle Road up to the top of Goizha Mountain.",
    role: "Cultural | Natural",
    distanceFromErbil: "~185 km southeast",
    bestTimeToVisit: "Year-round.",
    visitorExperience:
      "Wax museum, cinema, cable car up Goizha Mountain, dining, hotels, green areas, a comprehensive entertainment and cultural complex.",
    travelGuidance: "Central Sulaymaniyah. Accessible by taxi from all city hotels.",
    accommodation: "On-site hotel facilities. Full range of Sulaymaniyah city hotels.",
  },
  {
    id: "folkloric-museum-of-germiyan",
    name: "Folkloric Museum of Germiyan",
    location: "Kalar, Garmyan",
    image: museumImage,
    description:
      "Established in 2003 by the Kalar Department of Antiquities, the museum houses some 400 artifacts including items from nearby Sherwana Citadel, traditional men's and women's clothing, agricultural tools and household items.",
    role: "Cultural | Historical",
    distanceFromErbil: "~190 km southeast",
    bestTimeToVisit: "Year-round.",
    visitorExperience:
      "Viewing 400 artifacts covering Garmyan's heritage, traditional clothing, agricultural tools, archaeological finds and household items.",
    travelGuidance:
      "South of Kalar, near Sherwana Citadel. Via Erbil-Koya-Kalar road. Approx. 2.5 hours.",
    accommodation: "Hotels in Kalar. Sulaymaniyah hotels as base.",
  },
  {
    id: "kifri-qaysari",
    name: "Kifri Qaysari",
    location: "Kifri, Garmyan",
    image: cityImage,
    description:
      "The Kifri Qaysari was built in the 19th century and contains many shops and warehouses (Khan), such as Coal Khan and Wheat Khan. Recently renovated while keeping its original features.",
    role: "Cultural | Historical",
    distanceFromErbil: "~150 km southeast",
    bestTimeToVisit: "Year-round.",
    visitorExperience:
      "Exploring the ancient covered market, shopping for local products, admiring the original 19th-century architecture and historic khans.",
    travelGuidance:
      "Central Kifri. Via Erbil-Koya-Kifri road. Approx. 2 hours.",
    accommodation: "Hotels in Kifri. Sulaymaniyah hotels as base.",
  },
  {
    id: "quldar-mill-of-kifri",
    name: "Quldar Mill of Kifri",
    location: "Kifri, Garmyan",
    image: craftImage,
    description:
      "Located north of the Bawashaswar cemetery in Kifri. The mill consists of a tower with two rooms: one for grinding wheat and one for storage. A rare surviving example of a traditional Kurdish mill.",
    role: "Cultural | Historical",
    distanceFromErbil: "~155 km southeast",
    bestTimeToVisit: "Year-round.",
    visitorExperience:
      "Viewing the traditional two-room grain mill tower, learning about historical Kurdish grain processing.",
    travelGuidance:
      "North of the Bawashaswar cemetery, Kifri. Via Erbil-Koya-Kifri road.",
    accommodation: "Hotels in Kifri. Sulaymaniyah hotels as base.",
  },
  {
    id: "lalonde-bridge-khanaqin",
    name: "Lalonde Bridge, Khanaqin",
    location: "Khanaqin, Diyala Province",
    image: cityImage,
    description:
      "Located in the heart of Khanaqin, Lalonde Bridge crosses the Lalonde River and dates back more than a hundred years. Orchards and palm trees, gardens and parks lie either side of the bridge, making the area an attractive destination.",
    role: "Cultural | Historical",
    distanceFromErbil: "~200 km southeast",
    bestTimeToVisit: "Spring and autumn.",
    visitorExperience:
      "Walking across the historic bridge, relaxing in the surrounding orchards, gardens and parks, riverside picnicking.",
    travelGuidance:
      "In the heart of Khanaqin city. Via Erbil-Khanaqin road. Approx. 2.5 hours.",
    accommodation: "Hotels in Khanaqin.",
  },
  {
    id: "sharanish-waterfall-resort",
    name: "Sharanish Waterfall & Resort",
    location: "Near Zakho, Duhok Province",
    image: natureImage,
    description:
      "About 40 km northeast of Zakho. A beautiful waterfall surrounded by woodland. Temperatures never exceed 32°C, making it a great place to visit during hot summer months.",
    role: "Natural",
    distanceFromErbil: "~315 km northwest",
    bestTimeToVisit:
      "Summer (Jun-Sep) for cool temperatures. Spring for full waterfall flow.",
    visitorExperience:
      "Waterfall viewing, woodland walks, cool summer retreat, combining with nearby Bhairai Cave visit.",
    travelGuidance: "40 km northeast of Zakho. Via Erbil-Duhok-Zakho road.",
    accommodation: "On-site resort facilities. Hotels in Zakho (~40 km).",
  },
];
