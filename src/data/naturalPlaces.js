import kurdistanNature from "@/assets/images/nature.webp";
import mountainImage from "@/assets/images/kurdistan-2.webp";
import valleyImage from "@/assets/images/kurdistan-3.webp";
import landscapeImage from "@/assets/mainImages/land-1.webp";
import lakeImage from "@/assets/mainImages/theland/land-2.webp";
import waterfallImage from "@/assets/mainImages/theland/land-3.webp";
import forestImage from "@/assets/mainImages/land-4.webp";

export const NATURAL_PLACES = [
  {
    id: "korek-mountain-cable-car",
    name: "Korek Mountain & Cable Car",
    location: "Soran / Erbil Province",
    image: mountainImage,
    description:
      "Major mountain peak in the Soran area. A modern cable car takes visitors to the summit with panoramic views. Surrounded by the Malakan Valley and multiple resort facilities.",
    role: "Natural | Adventure",
    distanceFromErbil: "~100 km",
    bestTimeToVisit:
      "Spring (May-Jun) and summer for cable car. Winter for snow tourism.",
    visitorExperience:
      "Cable car ride, mountain summit views, hiking trails, Korek Mountain Resort at the top.",
    travelGuidance:
      "Via Erbil-Soran highway. Approx. 1.5-2 hours. Fully paved road.",
    accommodation:
      "Korek Mountain Resort (on-site). Hotels in Soran city (~15 km).",
  },
  {
    id: "gali-ali-begg-waterfall-valley",
    name: "Gali Ali Begg Waterfall & Valley",
    location: "Soran, Erbil Province",
    image: valleyImage,
    description:
      "A 12 km valley between Korek and Bradost mountains. Home to one of Kurdistan's most visited natural attractions, the Gali Ali Begg waterfall, plus springs, restaurants and cafes.",
    role: "Natural | Adventure",
    distanceFromErbil: "~95 km",
    bestTimeToVisit: "Spring (Mar-May) for peak water flow.",
    visitorExperience:
      "Waterfall viewing, picnicking, dining in valley restaurants, photography.",
    travelGuidance: "On the Erbil-Soran highway. Approx. 1.5 hours.",
    accommodation: "Restaurants and cafes on site. Hotels in Soran (~10-15 km).",
  },
  {
    id: "halgurd-mountain",
    name: "Halgurd Mountain",
    location: "Choman / Erbil Province",
    image: kurdistanNature,
    description:
      "The tallest mountain in Iraq at 3,607m. Snow-covered until April. The Halgurd-Sakran National Park (1,000 sq km) surrounds it with unique flora, fauna and lakes.",
    role: "Natural | Adventure",
    distanceFromErbil: "~170 km northeast",
    bestTimeToVisit: "Jul-Sep for trekking. Apr-May for snow and greenery.",
    visitorExperience:
      "Mountain climbing, trekking, national park exploration, wildlife spotting.",
    travelGuidance:
      "Via Erbil-Soran-Choman road. Approx. 3-3.5 hours. Mountain trails require guides.",
    accommodation:
      "Guesthouses in Choman and Haji Omran. Rezan Summer Resort (~22 km from Barzan).",
  },
  {
    id: "shaqlawa-resort-town",
    name: "Shaqlawa Resort Town",
    location: "Erbil Province",
    image: landscapeImage,
    description:
      "Kurdistan's most popular highland resort town between the Safeen and Sork mountains. Known for fresh air, cool summers, fruit orchards and panoramic mountain views.",
    role: "Natural",
    distanceFromErbil: "~47 km",
    bestTimeToVisit:
      "April-October (cool climate; summer escape from lowland heat).",
    visitorExperience:
      "Mountain market shopping, orchard visits, panoramic views, local restaurants.",
    travelGuidance:
      "Via Erbil-Shaqlawa mountain road. Approx. 1-1.5 hours.",
    accommodation:
      "Numerous hotels, resorts and guesthouses throughout the town.",
  },
  {
    id: "dukan-lake-resort",
    name: "Dukan Lake Resort",
    location: "Sulaymaniyah Province",
    image: lakeImage,
    description:
      "One of Kurdistan's most beautiful lakes. Surrounded by rolling hills with bright blue water. On-site resort with hotels, cabins and restaurants.",
    role: "Natural",
    distanceFromErbil: "~180 km southeast",
    bestTimeToVisit: "Spring (Apr-Jun) and early autumn.",
    visitorExperience:
      "Swimming, boating, fishing, lakeside dining, cabin stays.",
    travelGuidance:
      "Via Erbil-Sulaymaniyah road then west toward Dukan. Approx. 2.5-3 hours.",
    accommodation:
      "On-site resort hotels and cabins directly on the lakeshore.",
  },
  {
    id: "darbandikhan-lake",
    name: "Darbandikhan Lake",
    location: "Sulaymaniyah Province",
    image: kurdistanNature,
    description:
      "60 km southeast of Sulaymaniyah. Stunning natural lakeshore adjacent to Tuni Baba, an ancient winding rock channel carved by wind and water over millennia.",
    role: "Natural",
    distanceFromErbil: "~220 km southeast",
    bestTimeToVisit: "Spring and early autumn.",
    visitorExperience:
      "Lake boating, fishing, picnicking, visiting the Tuni Baba rock path corridor.",
    travelGuidance:
      "Via Sulaymaniyah-Darbandikhan road. From Erbil approx. 3+ hours.",
    accommodation:
      "Resort facilities near the lake. Hotels in Sulaymaniyah (~60 km).",
  },
  {
    id: "snow-cave-prsha-waterfall",
    name: "Snow Cave (Prsha) & Waterfall",
    location: "Balakian / Sakran Mountain, Erbil Province",
    image: waterfallImage,
    description:
      "Carved from rock by the Prsha Waterfall. Temperature stays below 5°C even in summer, a truly extraordinary experience unique to Kurdistan.",
    role: "Natural | Adventure",
    distanceFromErbil: "~150+ km",
    bestTimeToVisit:
      "July-August for the magical contrast of snow in summer.",
    visitorExperience:
      "Walking through a snow cave in mid-summer. Waterfall photography. Hiking in Sakran mountain area.",
    travelGuidance:
      "Via Soran-Sidikan roads. Mountain tracks, guide recommended.",
    accommodation: "Guesthouses in nearby Balakian. Soran hotels (~40 km).",
  },
  {
    id: "sakran-valley",
    name: "Sakran Valley",
    location: "Erbil Province",
    image: forestImage,
    description:
      "A lush green valley surrounded by trees, flowers, mountain creeks and birds. A traditional village offers authentic Kurdish rural hospitality.",
    role: "Natural | Adventure",
    distanceFromErbil: "~150 km",
    bestTimeToVisit: "Spring and summer.",
    visitorExperience:
      "Village stays, nature walks, bird watching, photography, Kurdish rural hospitality.",
    travelGuidance:
      "Via Soran-Sidikan-Sakran roads. Some unpaved mountain tracks.",
    accommodation: "Traditional village guesthouses. Soran hotels (~40 km).",
  },
  {
    id: "haji-omran-highland-area",
    name: "Haji Omran Highland Area",
    location: "Choman / Erbil Province",
    image: mountainImage,
    description:
      "At 3,000m altitude on the Iranian border. Renowned spa water said to treat ailments. The highest mountains of Kurdistan are accessible from here.",
    role: "Natural | Adventure",
    distanceFromErbil: "~200 km northeast",
    bestTimeToVisit:
      "June-September for access. Winter for snow tourism.",
    visitorExperience:
      "Therapeutic spa water, high mountain scenery, border region landscapes, mountain hiking.",
    travelGuidance:
      "Via Erbil-Soran-Choman-Haji Omran. Approx. 3.5-4 hours. Mountain roads.",
    accommodation:
      "Guesthouses and lodges in Haji Omran. Rezan Summer Resort nearby.",
  },
  {
    id: "mirgasor-district-forests",
    name: "Mirgasor District & Forests",
    location: "Northern Erbil Province",
    image: forestImage,
    description:
      "A rugged mountainous area with 252 villages. Famous for completely unspoiled forests, natural crops and fruit. Hunting is strictly prohibited.",
    role: "Natural",
    distanceFromErbil: "~130 km north",
    bestTimeToVisit: "Spring and summer.",
    visitorExperience:
      "Forest walks, village visits, fruit picking, pristine nature exploration away from crowds.",
    travelGuidance: "Via Erbil-Barzan road. Approx. 2-2.5 hours.",
    accommodation:
      "Village guesthouses. Rezan Summer Resort (~22 km from Barzan area).",
  },
  {
    id: "malakan-valley",
    name: "Malakan Valley",
    location: "Khalifan / Soran",
    image: valleyImage,
    description:
      "At the foot of the Korek Mountain range, 25 km from Khalifan. Beautiful nature, clean spring water, green trees and cafeterias, a perfect cool escape in summer heat.",
    role: "Natural",
    distanceFromErbil: "~125 km",
    bestTimeToVisit: "Summer (Jun-Aug) for escaping the heat.",
    visitorExperience:
      "Picnicking, spring water, walking trails, cafeteria visits with mountain backdrop.",
    travelGuidance:
      "Via Erbil-Soran-Khalifan road. Approx. 2 hours.",
    accommodation:
      "Hotels in Soran (~20 km from Khalifan). Korek Mountain Resort nearby.",
  },
];
