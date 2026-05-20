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
  {
    id: "sheladeze",
    name: "Sheladeze",
    location: "Duhok Province (Badinan)",
    image: highlandImage,
    description:
      "A stunning mountainous sub-district within the Amadiya District, renowned for its unparalleled mountain landscapes, dense forests, and authentic historical villages. An exceptional destination for tourists who enjoy exploring remote, high-altitude environments.",
    role: "Natural",
    distanceFromErbil: "~250 km northwest",
    bestTimeToVisit: "Spring and summer.",
    visitorExperience:
      "Majestic towering mountain views, exploring local villages, nature photography, observing remote and untouched landscapes.",
    travelGuidance:
      "Take the Duhok-Amadiya road. A private vehicle is required to reach the area.",
    accommodation: "Local guesthouses or hotels in Duhok city.",
  },
  {
    id: "zoragvan-valley",
    name: "Zoragvan Valley",
    location: "Soran Area, Erbil Province",
    image: waterfallImage,
    description:
      "A lush green valley within the Zoragvan National Park featuring an epic 3-hour hiking trail along creeks, small waterfalls and stunning natural scenery. The trail ends at a dramatic main waterfall. Some sections require wading through the stream.",
    role: "Natural | Adventure",
    distanceFromErbil: "~150 km northeast",
    bestTimeToVisit:
      "Spring (Apr-Jun) for peak green scenery and full waterfalls.",
    visitorExperience:
      "3-hour round-trip hike to the main waterfall, creek crossings, waterfall photography, picnicking.",
    travelGuidance:
      "No public transport. Private car or guide required from Soran/Khalifan area. Approx. 2.5 hours from Erbil.",
    accommodation:
      "Guesthouses and homestays in nearby villages. Hotels in Soran (~30 km).",
  },
  {
    id: "mawat",
    name: "Mawat",
    location: "Sulaymaniyah Province",
    image: mountainImage,
    description:
      "An ancient district in northern Sulaymaniyah with rich history. Known for its beautiful mountain scenery, historical sites, traditional villages and its position at the gateway to the Halgurd-Sakran National Park from the Sulaymaniyah side.",
    role: "Natural | Historical",
    distanceFromErbil: "~170 km southeast",
    bestTimeToVisit: "April-September.",
    visitorExperience:
      "Historical site exploration, mountain hiking, traditional village visits, gateway to Halgurd-Sakran National Park.",
    travelGuidance:
      "Via Sulaymaniyah north roads. Private car recommended for village and mountain access.",
    accommodation: "Local guesthouses in Mawat. Hotels in Sulaymaniyah as base.",
  },
  {
    id: "pank-tourist-resort",
    name: "Pank Tourist Resort",
    location: "Rawanduz, Erbil Province",
    image: highlandImage,
    description:
      "A 5-star resort perched on a hill close to Rawanduz, roughly 100 km from Erbil. Offers summer cottages, restaurants, shops, swimming pools, and a fun park. One of the finest highland resort destinations in Kurdistan.",
    role: "Natural",
    distanceFromErbil: "~100 km northeast",
    bestTimeToVisit: "Summer (Jun-Sep) for cool mountain air.",
    visitorExperience:
      "Resort relaxation, swimming pools, fun park, mountain views, dining, shops.",
    travelGuidance:
      "Via Erbil-Soran-Rawanduz highway. Approx. 1.5-2 hours.",
    accommodation:
      "On-site 5-star resort with full facilities (cottages, restaurants, pools).",
  },
  {
    id: "minarah-park",
    name: "Minarah Park",
    location: "Erbil City",
    image: cityParkImage,
    description:
      "One of the most beautiful recreational grounds in Erbil, located opposite Shanadar Park. Named after the historic Choli Minaret housed within its grounds. National activities and celebrations are often held here.",
    role: "Natural",
    distanceFromErbil: "City center",
    bestTimeToVisit:
      "Year-round. Spring and autumn evenings for recreation.",
    visitorExperience:
      "Walking and recreation, viewing the historic Choli Minaret, attending cultural events and national celebrations.",
    travelGuidance:
      "Central Erbil, opposite Shanadar Park. Accessible by all transport.",
    accommodation: "Full range of Erbil city hotels within walking distance.",
  },
  {
    id: "sarsir-summer-resort",
    name: "Sarsir Summer Resort",
    location: "Sulaymaniyah Province",
    image: forestImage,
    description:
      "A summer resort 36 km north of Sulaymaniyah city. Surrounded by trees and natural springs. Recreational facilities available for visitors seeking a cool highland escape.",
    role: "Natural",
    distanceFromErbil: "~195 km southeast",
    bestTimeToVisit: "Summer (Jun-Sep).",
    visitorExperience:
      "Highland resort relaxation, natural springs, family recreational activities, fresh mountain air.",
    travelGuidance:
      "Via Sulaymaniyah north road. Approx. 45 minutes from Sulaymaniyah city.",
    accommodation: "Resort facilities on-site. Hotels in Sulaymaniyah (36 km).",
  },
  {
    id: "setak-area",
    name: "Setak Area",
    location: "Sulaymaniyah Province",
    image: landscapeImage,
    description:
      "A beautiful touristic area set behind the Azmar Mountain, roughly 20 km north of Sulaymaniyah city. Widely visited during spring and summer for its pure mountain air and fabulous scenery.",
    role: "Natural",
    distanceFromErbil: "~185 km southeast",
    bestTimeToVisit: "Spring and summer.",
    visitorExperience:
      "Mountain walking, fresh air, photography, nature appreciation.",
    travelGuidance:
      "Via Sulaymaniyah north road. Approx. 30 minutes from Sulaymaniyah.",
    accommodation: "Hotels in Sulaymaniyah city.",
  },
  {
    id: "ahmadawa",
    name: "Ahmadawa",
    location: "East of Sulaymaniyah",
    image: waterfallImage,
    description:
      "A beautiful natural area east of Sulaymaniyah where springs feed waterfalls surrounded by walnut, pomegranate and fig trees. Their cool shade attracts visitors seeking nature and fresh air.",
    role: "Natural",
    distanceFromErbil: "~200 km southeast",
    bestTimeToVisit: "Spring and summer.",
    visitorExperience:
      "Waterfall visiting, picnicking under walnut, pomegranate and fig trees, spring water, nature walks.",
    travelGuidance: "Via Sulaymaniyah east road. Private car recommended.",
    accommodation: "Hotels in Sulaymaniyah.",
  },
  {
    id: "qopi-qaradagh",
    name: "Qopi Qaradagh",
    location: "Northern Sulaymaniyah Province",
    image: mountainImage,
    description:
      "A district in northern Sulaymaniyah made up of nine adjacent mountains. Visitors come to enjoy the area's many water springs and to visit local shrines and graves. Tourist cabins available for overnight stays.",
    role: "Natural",
    distanceFromErbil: "~200 km southeast",
    bestTimeToVisit: "Spring and summer.",
    visitorExperience:
      "Visiting water springs, shrine pilgrimage, mountain scenery, overnight stays in tourist cabins.",
    travelGuidance: "Via Sulaymaniyah roads. Private car recommended.",
    accommodation: "Tourist cabins available on-site. Hotels in Sulaymaniyah.",
  },
  {
    id: "qashqoli-resort",
    name: "Qashqoli Resort",
    location: "Near Dukan, Sulaymaniyah Province",
    image: lakeImage,
    description:
      "A resort near Dukan town built on both sides of the Little Zab River. Popular for swimming and boating in the river waters, set amidst the scenic hills of the Dukan area.",
    role: "Natural",
    distanceFromErbil: "~190 km southeast",
    bestTimeToVisit: "Spring and summer.",
    visitorExperience:
      "River swimming and boating, riverside relaxation, picnicking.",
    travelGuidance:
      "Via Sulaymaniyah-Dukan road. From Erbil approx. 2.5-3 hours.",
    accommodation:
      "Resort facilities on both sides of the river. Hotels in Sulaymaniyah.",
  },
  {
    id: "darbandi-ranya",
    name: "Darbandi Ranya",
    location: "Sulaymaniyah Province",
    image: valleyImage,
    description:
      "A natural strait 4 km east of Ranya on the main road to Qaladiza. When the Dukan dam and lake were established, the water reached the strait, adding to its natural beauty. A nearby mineral lake (Ganaw) is visited for the treatment of skin diseases.",
    role: "Natural",
    distanceFromErbil: "~200 km southeast",
    bestTimeToVisit: "Spring and autumn.",
    visitorExperience:
      "Natural strait scenery, visiting the mineral lake Ganaw for therapeutic purposes, photography, picnicking.",
    travelGuidance:
      "Via Sulaymaniyah-Ranya-Qaladiza road. From Erbil approx. 3 hours.",
    accommodation: "Hotels in Ranya. Sulaymaniyah hotels as a base.",
  },
  {
    id: "betwata-sar-ashkawtan",
    name: "Betwata (Sar-Ashkawtan)",
    location: "Near Ranya, Sulaymaniyah Province",
    image: waterfallImage,
    description:
      "Located 20 km from Ranya town center. Remarkable geography with springs and waterfalls, gardens and abundant farmland in a picturesque highland setting.",
    role: "Natural",
    distanceFromErbil: "~200 km southeast",
    bestTimeToVisit: "Spring and summer.",
    visitorExperience:
      "Spring and waterfall visits, garden walks, farmland scenery, picnicking.",
    travelGuidance:
      "Via Sulaymaniyah-Ranya road, 20 km from Ranya center.",
    accommodation: "Local guesthouses in Ranya. Sulaymaniyah hotels as base.",
  },
  {
    id: "duhok-zoo",
    name: "Duhok Zoo",
    location: "Duhok City",
    image: parkImage,
    description:
      "Located in Duhok city center, the zoo is a popular attraction for locals and tourists. Visitors come to see the zoo's many animals and enjoy its park and playgrounds.",
    role: "Natural",
    distanceFromErbil: "~250 km northwest",
    bestTimeToVisit:
      "Year-round. Spring and autumn for best outdoor experience.",
    visitorExperience:
      "Viewing the zoo's animals, picnicking in the park, children's playground facilities.",
    travelGuidance: "Central Duhok city. Accessible by taxi from all city hotels.",
    accommodation: "Full range of hotels in Duhok city.",
  },
  {
    id: "azadi-park-duhok",
    name: "Azadi Park, Duhok",
    location: "Duhok City",
    image: cityParkImage,
    description:
      "Located in downtown Duhok near the Duhok sports club. Features a restaurant and cafeteria and vast green lawns that make it an ideal place for picnics.",
    role: "Natural",
    distanceFromErbil: "~250 km northwest",
    bestTimeToVisit: "Year-round. Spring and autumn for best conditions.",
    visitorExperience:
      "Picnicking on vast green lawns, dining at the restaurant and cafeteria, relaxation in a central green space.",
    travelGuidance:
      "Downtown Duhok, near the Duhok sports club. Accessible by all transport.",
    accommodation: "Full range of hotels in Duhok city.",
  },
  {
    id: "mazi-complex",
    name: "Mazi Complex",
    location: "Duhok City",
    image: parkImage,
    description:
      "A multi-facility tourist complex in Duhok housing a large supermarket, a hotel, a motel, a fun park and swimming pools. Many tourists visit in the spring and summer to enjoy its wide variety of facilities.",
    role: "Natural",
    distanceFromErbil: "~250 km northwest",
    bestTimeToVisit: "Spring and summer.",
    visitorExperience:
      "Fun park rides, swimming pools, hotel facilities, dining, shopping at the large supermarket.",
    travelGuidance: "Duhok city. Accessible by taxi from all city hotels.",
    accommodation: "On-site hotel and motel facilities.",
  },
  {
    id: "swaratuka-resort",
    name: "Swaratuka Resort",
    location: "Duhok Province",
    image: highlandImage,
    description:
      "A beautiful resort 32 km east of Duhok city at 1,075 meters above sea level in a leafy, green area. Its mountain views are stunning and the air is fresh and cool. Offers a restaurant, rest places and a cafe.",
    role: "Natural",
    distanceFromErbil: "~260 km northwest",
    bestTimeToVisit: "Summer (Jun-Sep).",
    visitorExperience:
      "Highland resort relaxation, stunning mountain views, fresh cool air, dining, rest areas.",
    travelGuidance:
      "Via Duhok east road. Approx. 40 minutes from Duhok city.",
    accommodation: "On-site resort facilities. Hotels in Duhok city (32 km).",
  },
  {
    id: "gara-mountain",
    name: "Gara Mountain",
    location: "Duhok Province",
    image: mountainImage,
    description:
      "A spectacular mountain northeast of Duhok city reaching 2,151 meters above sea level, overlooking the towns of Solav, Ashawa, Aneshki, and Bamerni. The ruins of a palace built by Saddam Hussein on the mountain are accessible as a piece of modern history.",
    role: "Natural | Adventure",
    distanceFromErbil: "~200 km northwest",
    bestTimeToVisit: "Spring and summer.",
    visitorExperience:
      "Hiking, panoramic views over the Duhok region, visiting Saddam Hussein's ruined mountain palace, exploring the surrounding resort towns.",
    travelGuidance:
      "Via Duhok-Sarsang road. From Erbil approx. 3 hours.",
    accommodation: "Hotels and motels in Sarsang. Full range in Duhok city.",
  },
  {
    id: "gulan-park-soran",
    name: "Gulan Park, Soran",
    location: "Soran, Erbil Province",
    image: parkImage,
    description:
      "Located 3 km from the center of Soran city. Contains fun rides for children and families. Its beautiful views attract tourists year-round.",
    role: "Natural",
    distanceFromErbil: "~100 km northeast",
    bestTimeToVisit: "Spring and summer.",
    visitorExperience:
      "Fun rides for families and children, beautiful mountain views, picnicking, recreation.",
    travelGuidance:
      "3 km from Soran city center. Via Erbil-Soran highway. Approx. 1.5 hours.",
    accommodation: "Hotels in Soran city center (~3 km).",
  },
  {
    id: "sidekan-streams",
    name: "Sidekan Streams",
    location: "Soran Area, Erbil Province",
    image: valleyImage,
    description:
      "Multiple streams of various sizes run through the area of Sidekan. The area provides amazing views in the summer, including snow-capped mountains emerging from wide green expanses.",
    role: "Natural",
    distanceFromErbil: "~140 km northeast",
    bestTimeToVisit:
      "Summer for snow-capped peaks above green valleys. Spring for full stream flow.",
    visitorExperience:
      "Stream walks, photography of snow-capped peaks contrasting with green valleys, picnicking, cool summer retreat.",
    travelGuidance:
      "Via Erbil-Soran-Sidikan road. Approx. 2 hours from Erbil.",
    accommodation: "Guesthouses in Sidekan. Hotels in Soran (~30 km).",
  },
  {
    id: "bsta-waterfall",
    name: "Bsta Waterfall",
    location: "Choman Area, Erbil Province",
    image: waterfallImage,
    description:
      "A beautiful waterfall just 3 km from Bsta village, northeast of Choman. The area's fresh climate and abundant spring water make it a perfect place for picnics and sightseeing during spring and summer months.",
    role: "Natural",
    distanceFromErbil: "~180 km northeast",
    bestTimeToVisit: "Spring and summer.",
    visitorExperience:
      "Waterfall viewing, picnicking in a fresh highland setting, photography, spring water.",
    travelGuidance:
      "Via Erbil-Soran-Choman road, then northeast toward Bsta village. Approx. 3 hours from Erbil.",
    accommodation: "Guesthouses in Choman (~10 km). Haji Omran lodges.",
  },
  {
    id: "awesar",
    name: "Awesar",
    location: "Hawraman District, Halabja Province",
    image: forestImage,
    description:
      "An area of Hawraman district, 3 km east of Taweila village. Famous for its walnut trees, fruit orchards and fresh water springs. One of the most popular natural tourist destinations in the Hawraman region.",
    role: "Natural",
    distanceFromErbil: "~220 km southeast",
    bestTimeToVisit: "Spring and summer.",
    visitorExperience:
      "Walking among walnut orchards and fruit trees, drinking from fresh water springs, picnicking, photography.",
    travelGuidance:
      "Via Sulaymaniyah-Halabja-Hawraman-Taweila road. From Erbil approx. 3.5 hours.",
    accommodation: "Guesthouses in Taweila. Hotels in Halabja (~25 km).",
  },
  {
    id: "chauq-gullan-park-halabja",
    name: "Chauq & Gullan Park, Halabja",
    location: "Halabja City",
    image: parkImage,
    description:
      "An attractive green picnic area 5 km east of Halabja city. Known for its fresh water springs, orchards and high trees. Has a play area for children and provides beautiful views over the town and surrounding hills.",
    role: "Natural",
    distanceFromErbil: "~215 km southeast",
    bestTimeToVisit: "Spring and summer.",
    visitorExperience:
      "Picnicking among fresh water springs, orchards and high trees, children's play area, panoramic views over Halabja.",
    travelGuidance:
      "5 km east of Halabja city. Via Erbil-Sulaymaniyah-Halabja road.",
    accommodation: "Hotels in Halabja. Hotels in Sulaymaniyah (~75 km).",
  },
  {
    id: "happy-theme-park-zakho",
    name: "Happy Theme Park, Zakho",
    location: "Zakho, Duhok Province",
    image: cityParkImage,
    description:
      "The biggest amusement park in Zakho. A modern theme park providing a range of attractions for children and adults alike. Features lakes, fountains, outdoor rides, indoor play areas, restaurants and a 5D cinema.",
    role: "Natural",
    distanceFromErbil: "~290 km northwest",
    bestTimeToVisit: "Spring and summer.",
    visitorExperience:
      "Outdoor rides, indoor play areas, lakes, fountains, restaurants, 5D cinema, a comprehensive family entertainment destination.",
    travelGuidance:
      "Via Erbil-Duhok-Zakho road. Approx. 4 hours from Erbil.",
    accommodation: "Hotels in Zakho. Full range in Duhok city (~80 km).",
  },
];
