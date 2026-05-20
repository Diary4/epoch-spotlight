import kurdistanNature from "@/assets/images/nature.webp";
import mountainImage from "@/assets/images/kurdistan-2.webp";
import valleyImage from "@/assets/images/kurdistan-3.webp";
import landscapeImage from "@/assets/mainImages/land-1.webp";
import lakeImage from "@/assets/mainImages/theland/land-2.webp";
import waterfallImage from "@/assets/mainImages/theland/land-3.webp";
import forestImage from "@/assets/mainImages/land-4.webp";
import parkImage from "@/assets/mainImages/land-5.webp";
import highlandImage from "@/assets/mainImages/land-6.webp";
import cityParkImage from "@/assets/mainImages/discoverkurdistan/card-1.webp";

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
  {
    id: "alana-valley",
    name: "Alana Valley",
    location: "Khalifan / Soran",
    image: forestImage,
    description:
      "15 km from Khalifan. A forested valley with a cool river flowing through it. Very popular for picnics and natural escape surrounded by lush forests.",
    role: "Natural",
    distanceFromErbil: "~110 km",
    bestTimeToVisit: "Spring and summer.",
    visitorExperience:
      "Riverside relaxation, forest walks, bird watching, photography, family picnics.",
    travelGuidance:
      "Via Erbil-Soran-Khalifan road. Approx. 1.5-2 hours.",
    accommodation: "Hotels in Khalifan and Soran.",
  },
  {
    id: "shanadar-park-newroz-site",
    name: "Shanadar Park (Newroz Site)",
    location: "Erbil City Center",
    image: cityParkImage,
    description:
      "A large central park in Erbil and the official venue for the annual Newroz celebration on March 21. All ethnic and religious communities gather here. Contains a hall for local art exhibitions built in the form of the renowned Shanadar Cave.",
    role: "Natural | Cultural",
    distanceFromErbil: "~2 km (city center)",
    bestTimeToVisit:
      "March 21 (Newroz). Also spring and autumn for general recreation.",
    visitorExperience:
      "Newroz festival atmosphere, picnicking, family activities, art exhibitions, cultural events year-round.",
    travelGuidance:
      "Central Erbil. Walking distance from Citadel. All transport options available.",
    accommodation: "Full range of Erbil city hotels within 2-5 km.",
  },
  {
    id: "ahmad-awa-resort",
    name: "Ahmad A'wa Resort",
    location: "Near Khurmall, Sulaymaniyah Province",
    image: waterfallImage,
    description:
      "84 km east of Sulaymaniyah near Khurmall. A rich green valley crossed by the Zallim River with a beautiful waterfall and lush surrounding forests.",
    role: "Natural",
    distanceFromErbil: "~250 km southeast",
    bestTimeToVisit: "Spring and summer.",
    visitorExperience:
      "Waterfall viewing, riverside walks, nature photography, picnicking in lush valley.",
    travelGuidance:
      "Via Sulaymaniyah-Khurmall road. From Erbil approx. 3.5+ hours.",
    accommodation:
      "On-site resort facilities. Hotels in Sulaymaniyah (84 km).",
  },
  {
    id: "sarsang-ashawa-mountain-resorts",
    name: "Sarsang & Ashawa Mountain Resorts",
    location: "Duhok Province",
    image: highlandImage,
    description:
      "Sarsang is a fully equipped mountain resort town on Gara Mountain with hotels, restaurants, a market and a castle built by King Faysal I. Ashawa is 4 km east, with trees, a waterfall and a dam.",
    role: "Natural",
    distanceFromErbil: "~200+ km",
    bestTimeToVisit: "Summer (Jun-Aug) as a highland escape.",
    visitorExperience:
      "Mountain resort lifestyle, Faysal I castle visit, Ashawa waterfall and dam.",
    travelGuidance:
      "Via Duhok-Atrush-Sarsang road. From Erbil approx. 3 hours.",
    accommodation:
      "Sarsang has multiple hotels, motels and restaurants, fully equipped resort.",
  },
  {
    id: "zawita-valley",
    name: "Zawita Valley",
    location: "Duhok Province",
    image: parkImage,
    description:
      "16 km northeast of Duhok city. Filled with diverse trees of outstanding natural beauty. Recreational facilities and restaurants make it an ideal visitor stop.",
    role: "Natural",
    distanceFromErbil: "~260 km",
    bestTimeToVisit: "Spring and summer.",
    visitorExperience:
      "Forest walks, river views, dining, family recreation.",
    travelGuidance:
      "Via Duhok northeast mountain road. From Erbil approx. 3.5 hours.",
    accommodation: "Hotels in Duhok (16 km). Swaratuka resort (32 km from Duhok).",
  },
  {
    id: "hawraman-horaman",
    name: "Hawraman (Horaman)",
    location: "Sulaymaniyah / Halabja Province",
    image: mountainImage,
    description:
      "A UNESCO World Heritage Site (2021), the only one in Kurdistan. A spectacular mountainous region home to the Hawrami people and their unique dialect, architecture, music, and traditions. Villages are built in dramatic terraced layers on steep slopes using traditional stone masonry with no mortar.",
    role: "Natural | Cultural | Historical",
    distanceFromErbil: "~200 km southeast",
    bestTimeToVisit:
      "Spring (Mar-May) for wildflowers and green scenery. Summer for cooler highland escape.",
    visitorExperience:
      "Exploring the villages of Tawela and Byara, traditional stone architecture, Hawrami cultural experiences, local cuisine, mountain hiking.",
    travelGuidance:
      "Via Erbil-Sulaymaniyah-Halabja-Hawraman road. Approx. 3-3.5 hours.",
    accommodation:
      "Tourist chalets and guesthouses in Tawela and Byara. Hotels in Halabja (~30 km).",
  },
  {
    id: "zawa-mountain",
    name: "Zawa Mountain",
    location: "Duhok City",
    image: highlandImage,
    description:
      "The commanding mountain that rises directly behind Duhok city offering panoramic views of the entire city and the Mosul Dam lake beyond. A cable car takes visitors to the summit with cafes and restaurants at the top.",
    role: "Natural | Adventure",
    distanceFromErbil: "~250 km northwest",
    bestTimeToVisit: "Spring and autumn for best views. Winter for snow.",
    visitorExperience:
      "Cable car ride to the summit, panoramic bird's-eye view of Duhok, hiking to historical ruins, cafes at the top.",
    travelGuidance:
      "From central Duhok city by taxi or car, a short drive to the cable car station.",
    accommodation: "Full range of hotels in Duhok city.",
  },
  {
    id: "sami-abdulrahman-park",
    name: "Sami Abdulrahman Park",
    location: "Erbil City",
    image: cityParkImage,
    description:
      "The largest green park in Erbil, built on the site of one of Saddam Hussein's former detention and military facilities. Now a vast open green space with walking paths, fountains, open lawns, cafes, the city's Martyrs' Memorial, Erbil International Fairground and Zaytun Public Library.",
    role: "Natural | Historical",
    distanceFromErbil: "0 km (city center)",
    bestTimeToVisit:
      "Year-round. Spring and autumn evenings are especially popular.",
    visitorExperience:
      "Walking, jogging, family picnics, outdoor cafes, cultural events, visiting the Martyrs' Memorial.",
    travelGuidance:
      "On 60 Meter Street in the western part of the city, opposite the Kurdistan Regional Parliament.",
    accommodation: "Full range of Erbil city hotels within 1-5 km.",
  },
  {
    id: "nawroli-valley",
    name: "Nawroli Valley",
    location: "Sulaymaniyah Province",
    image: valleyImage,
    description:
      "A serene natural valley near Sulaymaniyah known for its refreshing cool air, fresh water sources and lush green scenery. A popular escape for Sulaymaniyah residents with traditional villages and authentic Kurdish rural life.",
    role: "Natural | Adventure",
    distanceFromErbil: "~180 km southeast",
    bestTimeToVisit: "Spring and summer.",
    visitorExperience:
      "Nature walks, bird watching, village visits, photography, family picnics in green surroundings.",
    travelGuidance:
      "Via Sulaymaniyah road. Approx. 45 minutes from Sulaymaniyah city by car.",
    accommodation: "Hotels in Sulaymaniyah city.",
  },
  {
    id: "tangi-buk-u-zawa",
    name: "Tangi Buk u Zawa (Bride & Groom Gorge)",
    location: "Soran / Rawanduz, Erbil Province",
    image: valleyImage,
    description:
      "A dramatic narrow gorge named 'Bride and Groom' after two rocks within it that resemble the shapes of a bride and groom. Part of the spectacular Rawanduz canyon system with towering limestone walls.",
    role: "Natural | Adventure",
    distanceFromErbil: "~95-100 km",
    bestTimeToVisit: "Spring and autumn.",
    visitorExperience:
      "Canyon hiking, dramatic rock formations photography, viewpoints over the gorge.",
    travelGuidance:
      "Near Rawanduz, via Erbil-Soran highway. Approx. 1.5-2 hours.",
    accommodation: "Hotels in Soran (~20 km). Hotels in Rawanduz.",
  },
  {
    id: "awa-shin-blue-water-avasheen",
    name: "Awa Shin (Blue Water / Avasheen)",
    location: "Deraluk, Amedi, Duhok Province",
    image: lakeImage,
    description:
      "Known as 'Blue Water' in Kurdish, Awa Shin is a natural spring resort in the Gali Sherana valley area with vivid turquoise water. A popular summer destination requiring a hike to reach the pristine blue spring.",
    role: "Natural | Adventure",
    distanceFromErbil: "~230 km northwest",
    bestTimeToVisit: "Summer (Jun-Sep).",
    visitorExperience:
      "Hiking to pristine turquoise spring water, swimming in crystal-clear blue pools, photography of the vivid natural colors, picnicking.",
    travelGuidance:
      "Via Erbil-Duhok-Amedi-Deraluk road. Approx. 3.5-4 hours. Local guide recommended.",
    accommodation: "Guesthouses near Amedi. Hotels in Duhok (~80 km).",
  },
  {
    id: "gomi-felaw-alpine-lake",
    name: "Gomi Felaw (Felaw Alpine Lake)",
    location: "Choman, Erbil Province",
    image: lakeImage,
    description:
      "A perfect alpine lake set on a valley edge near the Hamilton Road outside Choman, surrounded by emerald-green grasses with snow-capped peaks across the valley. Described by multiple travellers as the most beautiful place in Iraqi Kurdistan. Located on the fringe of the Halgurd-Sakran National Park.",
    role: "Natural | Adventure",
    distanceFromErbil: "~175 km northeast",
    bestTimeToVisit:
      "April-June for spring green. Summer for hiking and camping.",
    visitorExperience:
      "Alpine lake photography, hiking (9 km each way from Choman), camping, stunning Zagros mountain panoramas.",
    travelGuidance:
      "Via Erbil-Soran-Choman (Hamilton Road), then dirt road east of Choman. 4WD essential. Guide recommended.",
    accommodation: "Guesthouses in Choman (~9 km). Haji Omran lodges.",
  },
  {
    id: "kani-rash-black-spring",
    name: "Kani Rash (Black Spring)",
    location: "Choman Area, Erbil Province",
    image: kurdistanNature,
    description:
      "A natural spring in the Choman district known for its notably dark mineral-rich water against green mountain surroundings. Part of the broader Choman tourism cluster near the Hamilton Road and Haji Omran.",
    role: "Natural",
    distanceFromErbil: "~175 km northeast",
    bestTimeToVisit: "Spring and summer.",
    visitorExperience:
      "Natural mineral spring visit, mountain scenery, picnicking, photography.",
    travelGuidance:
      "Via Erbil-Soran-Choman road. Approx. 2.5-3 hours.",
    accommodation: "Guesthouses in Choman. Haji Omran lodges.",
  },
  {
    id: "jundyan-summer-resort",
    name: "Jundyan Summer Resort",
    location: "Soran, Erbil Province",
    image: highlandImage,
    description:
      "On the slopes of Hindren Mountain, 5 km east of Soran and 115 km from Erbil. Features a magical intermittent spring that dries up and reappears suddenly each spring. Wild-growing trees and a favorable highland summer climate.",
    role: "Natural",
    distanceFromErbil: "~115 km",
    bestTimeToVisit: "Summer (Jun-Sep).",
    visitorExperience:
      "Highland resort relaxation, magical intermittent spring visit, wild trees, cool summer climate, picnicking.",
    travelGuidance:
      "Via Erbil-Soran road, 5 km east of Soran center. Approx. 1.5-2 hours.",
    accommodation: "On-site resort facilities. Hotels in Soran.",
  },
  {
    id: "bekhal-waterfall",
    name: "Bekhal Waterfall",
    location: "Rawanduz Area, Erbil Province",
    image: waterfallImage,
    description:
      "Located 7 km from Rawanduz and 130 km from Erbil. The waterfall cascades down limestone rock formations creating a constant mist. A staple of domestic tourism, especially popular with families and visitors from across Iraq.",
    role: "Natural",
    distanceFromErbil: "~130 km northeast",
    bestTimeToVisit: "Spring-Autumn (year-round flow).",
    visitorExperience:
      "Waterfall viewing, climbing steps alongside the cascade, bazaar, mineral water drinking, picnic areas and restaurants nearby.",
    travelGuidance:
      "Via Soran-Rawanduz road. Approx. 1.5-2 hours from Erbil.",
    accommodation:
      "Hotels in Soran or Rawanduz. Small guesthouses near the waterfall.",
  },
  {
    id: "rawanduz-canyon",
    name: "Rawanduz Canyon",
    location: "Rawanduz, Erbil Province",
    image: valleyImage,
    description:
      "A spectacular natural limestone gorge surrounding Rawanduz city. The town sits perched on its edge with towering cliffs on both sides, offering some of the most dramatic panoramic views in the Middle East.",
    role: "Natural | Adventure",
    distanceFromErbil: "~107 km northeast",
    bestTimeToVisit:
      "Spring (Mar-May) and autumn for greenery. Summer for cooler mountain air.",
    visitorExperience:
      "Panoramic cliff views, photography, nearby Bekhal Waterfall and Kharand scenic road.",
    travelGuidance: "Via Erbil-Soran-Rawanduz. Approx. 2 hours. Fully paved.",
    accommodation:
      "Hotels in Soran (~17 km) and Rawanduz. Pank Tourist Resort (5-star).",
  },
  {
    id: "rezan-summer-resort",
    name: "Rezan Summer Resort",
    location: "Mirgasor / Barzan Area, Erbil Province",
    image: forestImage,
    description:
      "Situated 22 km southeast of Barzan and 134 km from Erbil at 1,200 meters above sea level on the banks of the Rezan River. Offers a wonderful highland climate during the hot summer months.",
    role: "Natural",
    distanceFromErbil: "~134 km north",
    bestTimeToVisit: "June-September.",
    visitorExperience:
      "Riverside relaxation, cool summer highland climate, base for visiting Barzan area and surrounding mountains.",
    travelGuidance: "Via Erbil-Barzan road. Approx. 2 hours.",
    accommodation: "On-site resort facilities at the Rezan riverbank.",
  },
  {
    id: "gomesban-white-horse-spring",
    name: "Gomesban (White Horse Spring)",
    location: "Erbil Province",
    image: kurdistanNature,
    description:
      "A natural spring and scenic area in Erbil Governorate. Known for its clear spring water and green mountain surroundings, Gomesban ('White Horse' in Kurdish) is a peaceful local nature retreat valued for its unspoiled character.",
    role: "Natural",
    distanceFromErbil: "~130 km",
    bestTimeToVisit: "Spring and summer.",
    visitorExperience:
      "Fresh mountain spring visit, picnicking by the spring, photography, peaceful nature walks in unspoiled surroundings.",
    travelGuidance:
      "Accessible via the Erbil-Pirmam road or the Erbil-Koya route. Well-paved roads.",
    accommodation: "Nearby resort guesthouses. Hotels in Erbil for base.",
  },
  {
    id: "mergapan",
    name: "Mergapan",
    location: "Sulaymaniyah Province",
    image: forestImage,
    description:
      "A scenic natural valley and spring area behind Peramagroon Mountain, just west of Sulaymaniyah city. Known for lush greenery and a cool microclimate. In summer, ice collectors come to gather ice and snow to sell to surrounding villages.",
    role: "Natural",
    distanceFromErbil: "~185 km southeast",
    bestTimeToVisit: "Spring and summer.",
    visitorExperience:
      "Nature walks, spring water, picnicking, cool mountain air, resort facilities.",
    travelGuidance: "Via Sulaymaniyah roads. Private car recommended.",
    accommodation: "Hotels in Sulaymaniyah.",
  },
  {
    id: "sarchnar-park-spring",
    name: "Sarchnar Park & Spring",
    location: "Sulaymaniyah Province",
    image: parkImage,
    description:
      "A well-known recreation park and natural spring area 5 km west of Sulaymaniyah city. Recently expanded with hotels, restaurants, swimming pools, playgrounds and a small zoo.",
    role: "Natural",
    distanceFromErbil: "~185 km southeast",
    bestTimeToVisit: "Spring and summer.",
    visitorExperience:
      "Park walking, natural spring water, family picnics, swimming pools, children's playground, small zoo.",
    travelGuidance:
      "5 km west of Sulaymaniyah city center. Approx. 10 minutes from city.",
    accommodation: "On-site hotel facilities. All Sulaymaniyah hotels.",
  },
  {
    id: "goizha-mountain",
    name: "Goizha Mountain",
    location: "Sulaymaniyah Province",
    image: mountainImage,
    description:
      "One of the most famous mountains in Kurdistan from a cultural perspective, immortalized in Kurdish poetry and song as a symbol of Sulaymaniyah's identity. Features a cable car (teleferic) that transports tourists to its charming peaks.",
    role: "Natural",
    distanceFromErbil: "~185 km southeast",
    bestTimeToVisit: "All year round.",
    visitorExperience:
      "Riding the cable car, hiking and trekking, panoramic views of Sulaymaniyah, experiencing the mountain's significance in Kurdish literature.",
    travelGuidance:
      "Located on the western side of Sulaymaniyah; approximately 10 minutes from city center.",
    accommodation: "Available at all hotels across Sulaymaniyah.",
  },
];
