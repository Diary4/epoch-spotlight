import erbilCitadelImage from "@/assets/mainImages/building.webp";
import shanidarImage from "@/assets/mainImages/land-3.webp";
import akreImage from "@/assets/mainImages/land-4.webp";
import mountainImage from "@/assets/images/kurdistan-2.webp";
import valleyImage from "@/assets/images/kurdistan-3.webp";
import cityImage from "@/assets/mainImages/discoverkurdistan/card-1.webp";
import heritageImage from "@/assets/mainImages/card-3.webp";

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
  {
    id: "khanzad-citadel",
    name: "Khanzad Citadel",
    location: "Erbil Province (on Erbil-Shaqlawa Road)",
    image: heritageImage,
    description:
      "Built by Princess Khanzad and Prince Suleiman Beg in the 16th century during the Soran Emirate. A notable testament to female rulership in Kurdish history. Sits atop a small hill about 40m tall with four round towers at its corners made of stones and gypsum.",
    role: "Historical",
    distanceFromErbil: "~22 km (on the Erbil-Shaqlawa road)",
    bestTimeToVisit: "Spring and autumn.",
    visitorExperience:
      "Archaeological exploration of the 16th-century castle ruins, four round towers, panoramic views.",
    travelGuidance:
      "On the Erbil-Shaqlawa road, 22 km from Erbil. Approx. 30-40 minutes.",
    accommodation:
      "Hotels in Shaqlawa (~25 km further). Hotels in Erbil city.",
  },
  {
    id: "barzan-graveyard-of-martyrs",
    name: "Barzan - Graveyard of Martyrs",
    location: "Barzan / Mirgasor, Northern Erbil",
    image: mountainImage,
    description:
      "The graveyard in Barzan village holds the graves of Mustafa Barzani (1903-1979) and his eldest son Idris. Visited by hundreds of thousands annually including official state delegations.",
    role: "Historical",
    distanceFromErbil: "~155 km north",
    bestTimeToVisit: "Any time of year (pilgrimage site).",
    visitorExperience:
      "Deeply emotional pilgrimage and tribute site central to Kurdish national identity.",
    travelGuidance:
      "Via Erbil-Mergasor-Barzan road. Approx. 2.5 hours.",
    accommodation:
      "Village guesthouses in Barzan. Rezan Summer Resort (22 km southeast).",
  },
  {
    id: "rost-valley-citadel",
    name: "Rost Valley & Citadel",
    location: "Halgurd Area / Erbil Province",
    image: valleyImage,
    description:
      "Rost Valley sits at the foot of Halgurd Mountain with fresh water, forests and orchards. Rost Citadel stands on the mountaintop, a significant archaeological site spanning 45.5x29.2 m with over ten rooms.",
    role: "Historical | Natural | Adventure",
    distanceFromErbil: "~137 km northeast",
    bestTimeToVisit: "Late spring and summer.",
    visitorExperience:
      "Valley walks, citadel exploration, mountain scenery near Iraq's tallest peak.",
    travelGuidance:
      "Via Soran-Choman highway near Sirin village. Approx. 2.5 hours.",
    accommodation: "Village guesthouses in Rost/Sirin area. Choman town.",
  },
  {
    id: "bestoon-bastoon-cave",
    name: "Bestoon (Bastoon) Cave",
    location: "Soran Area, Erbil Province",
    image: shanidarImage,
    description:
      "A Stone Age cave believed to have been inhabited by Neanderthal people. Not yet excavated. A raw, undeveloped prehistoric heritage site of significant potential.",
    role: "Historical | Natural",
    distanceFromErbil: "~100+ km",
    bestTimeToVisit: "Spring and autumn.",
    visitorExperience:
      "Cave exploration, prehistoric atmosphere, challenging hiking to site.",
    travelGuidance:
      "Via Soran area roads. Mountain driving required, 4WD advised.",
    accommodation: "Hotels in Soran (~20 km).",
  },
  {
    id: "koya-city",
    name: "Koya City",
    location: "Between Erbil & Sulaymaniyah",
    image: cityImage,
    description:
      "Surrounded by Bawaji and Haibat Sultan mountains. Rich in shrines, historic mosques that served as centers of science and art, the Qshla Ottoman-era government headquarters, and one of the oldest bazaars in the region.",
    role: "Historical | Religious",
    distanceFromErbil: "~80 km southeast",
    bestTimeToVisit: "Spring and autumn.",
    visitorExperience:
      "Shrine pilgrimage, historic bazaar exploration, Qshla building visit, mountain scenery.",
    travelGuidance: "Via Erbil-Koya highway. Approx. 1.5 hours. Paved road.",
    accommodation: "Local hotels and guesthouses in Koya.",
  },
  {
    id: "qizqapan-rock-sculpture",
    name: "Qizqapan Rock Sculpture",
    location: "Sulaymaniyah Province",
    image: heritageImage,
    description:
      "A monumental rock-cut facade dating to King Mads period (650 BC), possibly the tomb of King Kaixosraw. Features two seated leaders in tribal dress and a Zoroastrian winged figure. Comparable to Petra in Jordan.",
    role: "Historical",
    distanceFromErbil: "~200+ km southeast",
    bestTimeToVisit: "Spring and autumn.",
    visitorExperience:
      "Archaeological viewing, historical interpretation, dramatic photography of the mountain-carved facade.",
    travelGuidance:
      "50 km west of Sulaymaniyah in the Chami Rezan valley, 17 km east of Dukan.",
    accommodation: "Hotels in Sulaymaniyah (~90 km) or Koya.",
  },
  {
    id: "duhok-valley-dam",
    name: "Duhok Valley & Dam",
    location: "Duhok City",
    image: valleyImage,
    description:
      "2 km north of Duhok city. The dam creates a serene blue lake alongside the Chwar Astoon Zoroastrian cave temple (Four Pillars Cave), a rare combination of natural beauty and ancient religious heritage.",
    role: "Historical | Natural | Religious",
    distanceFromErbil: "~250 km northwest",
    bestTimeToVisit: "Spring and autumn.",
    visitorExperience:
      "Lake views, Zoroastrian cave temple visit, large cave exploration.",
    travelGuidance: "Via Erbil-Duhok road. Approx. 3-3.5 hours.",
    accommodation: "Full range of hotels in Duhok city (2 km).",
  },
  {
    id: "hazar-merd-cave",
    name: "Hazar Merd Cave (Cave of a Thousand Men)",
    location: "Sulaymaniyah Province",
    image: shanidarImage,
    description:
      "A significant complex of Paleolithic caves in the Baranan Mountains, about 13 km southwest of Sulaymaniyah. Excavated by Dorothy Garrod in 1928. Stone tools and animal remains dating back approximately 50,000 years were discovered here.",
    role: "Historical",
    distanceFromErbil: "~190 km southeast",
    bestTimeToVisit: "Spring and autumn.",
    visitorExperience:
      "Moderate hike to cave entrance, commanding valley views, prehistoric atmosphere. Artifacts displayed at Sulaymaniyah Museum.",
    travelGuidance:
      "13 km west of Sulaymaniyah city center. Easily accessible by car.",
    accommodation: "All Sulaymaniyah hotels.",
  },
  {
    id: "qalinj-agha-hill",
    name: "Qalinj Agha Hill",
    location: "Erbil City",
    image: heritageImage,
    description:
      "An important archaeological mound in the center of Erbil. Its name means 'The Small Mound.' Only 7m high, it contains multiple historical inhabitations dating to the Halaf-Warka era of the 4th-5th millennia BC, first excavated in 1966.",
    role: "Historical",
    distanceFromErbil: "City center (1 km from the Citadel)",
    bestTimeToVisit: "Year-round.",
    visitorExperience:
      "Archaeological site exploration, connecting the mound's deep history to the broader ancient landscape of Erbil.",
    travelGuidance: "Central Erbil. Accessible on foot or by any transport.",
    accommodation: "Full range of Erbil city hotels.",
  },
  {
    id: "choli-minaret",
    name: "Choli Minaret",
    location: "Erbil City",
    image: cityImage,
    description:
      "One of Erbil city's most famous landmarks. Built 1128-1138 AD during the rule of Sultan Mudhaffar al-Din. Also known as al-Mudhafariah Minaret. Locals call it 'Choli' because it once stood far from the city, now a symbol at the heart of Erbil.",
    role: "Historical",
    distanceFromErbil: "City center",
    bestTimeToVisit: "Year-round.",
    visitorExperience:
      "Viewing the 12th-century Seljuk-era minaret and visiting the surrounding Minarah Park.",
    travelGuidance:
      "Central Erbil. Visible from across the city and accessible by all transport.",
    accommodation: "Full range of Erbil city hotels.",
  },
  {
    id: "qaysari-bazaar",
    name: "Qaysari Bazaar",
    location: "Erbil City",
    image: cityImage,
    description:
      "Located southeast of the Erbil Citadel, opposite its main gate. Constructed during the Ottoman era in the form of a bow with many long corridors, each lined with shops. Recently renovated by the KRG while preserving its original character.",
    role: "Historical",
    distanceFromErbil: "City center (at the Citadel gate)",
    bestTimeToVisit:
      "Year-round. Mornings and afternoons for the most activity.",
    visitorExperience:
      "Shopping for local crafts, spices, textiles and food; admiring the Ottoman covered-market architecture; photography.",
    travelGuidance:
      "At the base of the Erbil Citadel, southeast side. Walking distance from all central Erbil hotels.",
    accommodation: "Full range of Erbil city hotels.",
  },
  {
    id: "dween-castle",
    name: "Dween Castle",
    location: "Northwest of Erbil",
    image: heritageImage,
    description:
      "Located 56 km northwest of Erbil and 22 km southeast of Pirmam. A military fort built on a strategic ancient hill route. Linked to the Soran Emirate (1813-1837) and possibly to the era of Saladin's grandfather (1138-1193). Contains an ancient graveyard with tall, inscribed tombstones of unknown history.",
    role: "Historical",
    distanceFromErbil: "~56 km northwest",
    bestTimeToVisit: "Spring and autumn.",
    visitorExperience:
      "Castle ruins exploration, ancient inscribed graveyard visit, panoramic hill views.",
    travelGuidance: "Via Erbil-Pirmam road. Approx. 1-1.5 hours from Erbil.",
    accommodation: "Hotels in Erbil city as base.",
  },
  {
    id: "dairei-citadel",
    name: "Dairei Citadel",
    location: "Erbil Province",
    image: heritageImage,
    description:
      "Dates back to the reign of Prince Muhammad (1813-1837) in the 19th century. Situated high on a hill in the western edge of the Permam Mountains, 38 km from Erbil on the Erbil-Darabizmar road. A thick defense wall with shooting slits originally surrounded the citadel.",
    role: "Historical",
    distanceFromErbil: "~38 km",
    bestTimeToVisit: "Spring and autumn.",
    visitorExperience:
      "Exploring the 19th-century citadel ruins and its surviving defensive wall sections.",
    travelGuidance: "Via Erbil-Darabizmar road. Approx. 45 minutes from Erbil.",
    accommodation: "Hotels in Erbil city as base.",
  },
  {
    id: "barsireen-bridge",
    name: "Barsireen Bridge",
    location: "Northeast of Soran, Erbil Province",
    image: valleyImage,
    description:
      "An archaeological bridge on the Soran-Haji Omran section of the Hamilton Road, outside Barsireen village. Built during the Soran Emirate (1813-1837). Four beautifully designed cylindrical columns remain beneath the bridge, which is still used by locals today.",
    role: "Historical",
    distanceFromErbil: "~120 km northeast",
    bestTimeToVisit: "Spring and autumn.",
    visitorExperience:
      "Viewing the historic bridge and its four cylindrical columns, photography, exploring the Hamilton Road area.",
    travelGuidance:
      "On the Soran-Haji Omran section of the Hamilton Road. Via Erbil-Soran highway.",
    accommodation: "Hotels in Soran (~30 km). Haji Omran guesthouses.",
  },
  {
    id: "cannon-of-wasta-rajab",
    name: "Cannon of Wasta Rajab",
    location: "Rawanduz, Erbil Province",
    image: heritageImage,
    description:
      "A unique cultural and historical artifact in Rawanduz. Fabricated by Wasta Rajab (Craftsman Rajab) during the rule of Prince Muhammad of Soran (1813-1837). Wasta Rajab was the first Kurd sent to France by Prince Muhammad to learn the art of weapon making.",
    role: "Historical",
    distanceFromErbil: "~107 km northeast",
    bestTimeToVisit: "Year-round.",
    visitorExperience:
      "Viewing the historic cannon, learning about 19th-century Kurdish craft history and Wasta Rajab's extraordinary journey to France.",
    travelGuidance:
      "Located in Rawanduz city. Via Erbil-Soran-Rawanduz highway. Approx. 2 hours.",
    accommodation: "Hotels in Soran (~17 km). Rawanduz guesthouses.",
  },
  {
    id: "shrine-of-marbina-qadisha",
    name: "Shrine of Marbina Qadisha",
    location: "Near Koya City",
    image: cityImage,
    description:
      "Located northeast of Harmoota village, 3 km from Koya. Also known as Marbina Behnam. Some believe Mar Behnam and his sister Sara built this shrine. Others say monks from Mosul took refuge here during the Mongol invasion. A popular Christian pilgrimage site to this day.",
    role: "Historical | Religious",
    distanceFromErbil: "~80 km southeast",
    bestTimeToVisit: "Spring and autumn. Pilgrimage periods.",
    visitorExperience:
      "Christian shrine pilgrimage, historical architecture, combining visit with Koya city attractions.",
    travelGuidance:
      "3 km northeast of Harmoota village, near Koya. Via Erbil-Koya highway.",
    accommodation: "Hotels in Koya. Hotels in Erbil as base.",
  },
  {
    id: "chwar-taqan",
    name: "Chwar Taqan",
    location: "South of Koya City",
    image: heritageImage,
    description:
      "Located south of Koya city, Chwar Taqan was a resting place and stopover for caravans travelling between Koya, Erbil, and Kirkuk. Renovated in 2002, the ruins include four great water jars used by caravan travellers and their mules.",
    role: "Historical",
    distanceFromErbil: "~85 km southeast",
    bestTimeToVisit: "Spring and autumn.",
    visitorExperience:
      "Visiting the historic caravan stopover ruins, viewing the four ancient water jars, learning about historic trade routes.",
    travelGuidance:
      "South of Koya city. Via Erbil-Koya highway. Approx. 1.5 hours.",
    accommodation: "Hotels in Koya. Hotels in Erbil as base.",
  },
  {
    id: "koya-bazar",
    name: "Koya Bazar",
    location: "Koya City",
    image: cityImage,
    description:
      "One of the oldest bazaars in the region, with shops and stands selling a wide variety of local products. Step through its ancient arched doorways and explore the alleyways. Located in the center of Koya city.",
    role: "Historical",
    distanceFromErbil: "~80 km southeast",
    bestTimeToVisit: "Year-round.",
    visitorExperience:
      "Exploring the ancient arched doorways and alleyways, shopping for local products, experiencing traditional Kurdish bazaar culture.",
    travelGuidance: "Central Koya city. Via Erbil-Koya highway. Approx. 1.5 hours.",
    accommodation: "Hotels in Koya.",
  },
  {
    id: "taq-taq",
    name: "Taq Taq",
    location: "Koya District",
    image: valleyImage,
    description:
      "Part of Koya district, renowned for its many gardens and enchanting natural surroundings, including a small river that flows through the city. A popular tourist destination during spring and summer months.",
    role: "Historical | Natural",
    distanceFromErbil: "~90 km southeast",
    bestTimeToVisit: "Spring and summer.",
    visitorExperience:
      "Garden visits, river walks, natural scenery, family picnics, relaxation in a charming riverside setting.",
    travelGuidance:
      "Via Erbil-Koya highway then southeast to Taq Taq. Approx. 1.5-2 hours.",
    accommodation: "Hotels in Koya (~10 km). Hotels in Erbil as base.",
  },
  {
    id: "jally-river",
    name: "Jally River",
    location: "Near Koya, Erbil Province",
    image: valleyImage,
    description:
      "Located 75 km northeast of Erbil and 24 km from Koya. Passes through Smaqoli valley at 600m above sea level. Features stunning landscapes through a vast valley covered with orchards and trees. The water in its lakes and ponds is believed to treat certain skin diseases.",
    role: "Historical | Natural",
    distanceFromErbil: "~75 km northeast",
    bestTimeToVisit: "Spring and summer.",
    visitorExperience:
      "River walks, orchard and tree scenery, visiting therapeutic ponds and lakes, photography of the wide valley landscapes.",
    travelGuidance: "Via Erbil-Koya road then northeast. Approx. 1.5 hours.",
    accommodation: "Hotels in Koya (~24 km).",
  },
  {
    id: "amne-soreke-red-security-museum",
    name: "Amne Soreke (Red Security Museum)",
    location: "Sulaymaniyah City",
    image: heritageImage,
    description:
      "Named after the red color of the building, the former Ba'ath regime's secret police headquarters in Sulaymaniyah. After the 1991 uprising it was converted into a museum documenting the torture and suffering of Kurdish rebels and activists. One of the most emotionally significant historical sites in Kurdistan.",
    role: "Historical",
    distanceFromErbil: "~185 km southeast",
    bestTimeToVisit: "Year-round. Open 8:00 am-4:00 pm daily.",
    visitorExperience:
      "Guided walkthrough of former detention cells and torture chambers; understanding the scale of Ba'ath repression; a deeply moving historical experience.",
    travelGuidance: "Central Sulaymaniyah city. Accessible by taxi from all city hotels.",
    accommodation: "Full range of Sulaymaniyah city hotels.",
  },
  {
    id: "merqully",
    name: "Merqully",
    location: "Near Zaiwei Village, Sulaymaniyah Province",
    image: mountainImage,
    description:
      "An ancient sculpture carved into a stone on the face of a mountain. Thought to be around 3,000 years old. Located just north of Zaiwei village, 34 km from Sulaymaniyah city.",
    role: "Historical",
    distanceFromErbil: "~210 km southeast",
    bestTimeToVisit: "Spring and autumn.",
    visitorExperience:
      "Viewing the 3,000-year-old mountain-face carving, photography, combining visit with nearby Zaiwei village shrines.",
    travelGuidance:
      "Via Sulaymaniyah-Peramagroon road. 34 km west of Sulaymaniyah. Private car required.",
    accommodation: "Hotels in Sulaymaniyah.",
  },
  {
    id: "jami-rezan-caves",
    name: "Jami Rezan Caves",
    location: "Sulaymaniyah Province",
    image: shanidarImage,
    description:
      "Caves of profound historical significance, they served as the headquarters of Voice of Kurdistan radio and the Kurdish revolution in 1961. Used again as shelter during later revolutions. Located just 1 km from Bavel waterfall.",
    role: "Historical",
    distanceFromErbil: "~185 km southeast",
    bestTimeToVisit: "Spring and autumn.",
    visitorExperience:
      "Exploring the caves that housed the Kurdish revolution's radio operations; combining visit with nearby Bavel waterfall.",
    travelGuidance: "Via Sulaymaniyah roads. Private car recommended.",
    accommodation: "Hotels in Sulaymaniyah.",
  },
  {
    id: "jasna-cave",
    name: "Jasna Cave",
    location: "Sulaymaniyah Province",
    image: shanidarImage,
    description:
      "Located 50 km east of Sulaymaniyah between Sordash and Dukan. When British forces bombed Sulaymaniyah in February 1923, Sheikh Mahmood sheltered here and published the first edition of the newspaper Banki Haq (Voice of Rights) from within the cave.",
    role: "Historical",
    distanceFromErbil: "~220 km southeast",
    bestTimeToVisit: "Spring and autumn.",
    visitorExperience:
      "Cave exploration, learning about Sheikh Mahmood's resistance and the founding of Banki Haq, a remarkable moment in Kurdish press history.",
    travelGuidance:
      "Via Sulaymaniyah-Dukan road toward Sordash. Private car required.",
    accommodation: "Hotels in Sulaymaniyah (~50 km).",
  },
  {
    id: "palagawra-caves",
    name: "Palagawra Caves",
    location: "Bazyan Area, Sulaymaniyah Province",
    image: shanidarImage,
    description:
      "Three Paleolithic caves set into the foot of a mountain in the Bazyan area. Thought to have been home to some of the ancient people who lived in this region thousands of years ago.",
    role: "Historical",
    distanceFromErbil: "~185 km southeast",
    bestTimeToVisit: "Spring and autumn.",
    visitorExperience:
      "Cave exploration, prehistoric atmosphere, connecting to Kurdistan's ancient human history.",
    travelGuidance: "Via Sulaymaniyah-Bazyan road. Private car recommended.",
    accommodation: "Hotels in Sulaymaniyah.",
  },
  {
    id: "bazyan-strait-historical-remains",
    name: "Bazyan Strait Historical Remains",
    location: "Sulaymaniyah Province",
    image: heritageImage,
    description:
      "The remains of an old renovated citadel and the Strait Gate, 1 km from Leader Rock. The site has been converted into a tourist attraction with various visitor facilities.",
    role: "Historical",
    distanceFromErbil: "~180 km southeast",
    bestTimeToVisit: "Spring and autumn.",
    visitorExperience:
      "Exploring the ancient citadel remains and Strait Gate, visiting the developed tourist facilities.",
    travelGuidance: "Via Sulaymaniyah-Bazyan road.",
    accommodation: "Hotels in Sulaymaniyah.",
  },
  {
    id: "ancient-charmo-village",
    name: "Ancient Charmo Village",
    location: "Near Chamchamal, Sulaymaniyah Province",
    image: heritageImage,
    description:
      "The ruins of one of the oldest known agricultural villages in the world, east of Chamchamal town. Dating back to 7,000 BC, a research team from the University of Chicago excavated the site in 1955, finding agricultural equipment, household tools, animal bones and stored grain.",
    role: "Historical",
    distanceFromErbil: "~150 km southeast",
    bestTimeToVisit: "Spring and autumn.",
    visitorExperience:
      "Archaeological site visit, understanding the dawn of agriculture in human history.",
    travelGuidance:
      "Via Erbil-Koya-Chamchamal road. Approx. 2-2.5 hours from Erbil.",
    accommodation: "Hotels in Sulaymaniyah (~40 km). Koya guesthouses.",
  },
  {
    id: "barda-qaraman",
    name: "Barda Qaraman",
    location: "West of Sulaymaniyah Province",
    image: mountainImage,
    description:
      "'The Rock of the Hero', 35 km west of Sulaymaniyah on the highway to Kirkuk. During the British invasion of Iraq, Kurdish King Mahmood resisted British troops from behind this rock. A tribute to him stands at the site today.",
    role: "Historical",
    distanceFromErbil: "~160 km southeast",
    bestTimeToVisit: "Spring and autumn.",
    visitorExperience:
      "Visiting the tribute to King Mahmood, learning about Kurdish resistance to British colonialism, photography of the distinctive rock formation.",
    travelGuidance:
      "On the Sulaymaniyah-Kirkuk highway, 35 km west of Sulaymaniyah.",
    accommodation: "Hotels in Sulaymaniyah (35 km).",
  },
  {
    id: "gawar-strait-sculptures",
    name: "Ga'war Strait Sculptures",
    location: "Qaradagh District, Sulaymaniyah Province",
    image: heritageImage,
    description:
      "Remarkable 4,000-year-old sculptures in the Goshan valley in Qaradagh district, alongside a statue of the Akkadian King Naramsin. An exceptional open-air archaeological site.",
    role: "Historical",
    distanceFromErbil: "~210 km southeast",
    bestTimeToVisit: "Spring and autumn.",
    visitorExperience:
      "Viewing 4,000-year-old carvings and the statue of Akkadian King Naramsin, photography of this remote outdoor archaeological site.",
    travelGuidance: "Via Sulaymaniyah-Qaradagh road. Private car required.",
    accommodation: "Hotels in Sulaymaniyah.",
  },
  {
    id: "zirzi-cave",
    name: "Zirzi Cave",
    location: "Sulaymaniyah Province",
    image: shanidarImage,
    description:
      "At the entrance to Zirzi village, at the foot of Kunakotir Mountain. The cave dates back to the Stone Ages. Excavated in 1928 by Dorothy Garrod, who discovered tools and animal bones.",
    role: "Historical",
    distanceFromErbil: "~195 km southeast",
    bestTimeToVisit: "Spring and autumn.",
    visitorExperience:
      "Cave exploration, prehistoric atmosphere, combining visit with nearby Qizqapan site.",
    travelGuidance:
      "Near the Qizqapan archaeological site, west of Sulaymaniyah. Private car required.",
    accommodation: "Hotels in Sulaymaniyah.",
  },
  {
    id: "sartka-citadel",
    name: "Sartka Citadel",
    location: "Qashqoli Area, Sulaymaniyah Province",
    image: heritageImage,
    description:
      "Located in the area of Qashqoli, overlooking the river from the top of a hill where water flows from the Dukan Dam. Built by Prince Muhammad, Prince of Soran (1813-1837). The remains of some walls and rooms are still visible.",
    role: "Historical",
    distanceFromErbil: "~190 km southeast",
    bestTimeToVisit: "Spring and autumn.",
    visitorExperience:
      "Archaeological exploration of the citadel remains, panoramic river views from the hilltop, combining visit with nearby Qashqoli Resort.",
    travelGuidance:
      "Via Sulaymaniyah-Dukan road. From Erbil approx. 2.5-3 hours.",
    accommodation:
      "On-site resort facilities at Qashqoli. Hotels in Sulaymaniyah.",
  },
  {
    id: "sargalu-village",
    name: "Sargalu Village",
    location: "Jaffayati Valley, Sulaymaniyah Province",
    image: valleyImage,
    description:
      "A village in the Jaffayati Valley, 65 km from Sulaymaniyah. Rich with orchards, farms and water resources. Historically, Sargalu served as the headquarters of Kurdish revolutionaries and was home to the Voice of Kurdistan radio broadcasts.",
    role: "Historical",
    distanceFromErbil: "~235 km southeast",
    bestTimeToVisit: "Spring and summer.",
    visitorExperience:
      "Visiting the historic revolutionary headquarters, exploring the rich orchards and farmland, fresh water resources, village life.",
    travelGuidance:
      "Via Sulaymaniyah-Jaffayati Valley road. Private car recommended.",
    accommodation: "Hotels in Sulaymaniyah (~65 km).",
  },
  {
    id: "halabja-martyrs-monument-cemetery",
    name: "Halabja Martyrs' Monument & Cemetery",
    location: "Halabja City",
    image: heritageImage,
    description:
      "The national monument commemorating the chemical bombardment of Halabja by the Ba'ath regime on March 16th, 1988, which killed more than 5,000 people and wounded or disabled 10,000 more. A symbol of Kurdish resistance, remembrance and hope in the face of dictatorship.",
    role: "Historical",
    distanceFromErbil: "~210 km southeast",
    bestTimeToVisit: "Year-round. March 16 (Halabja Day) for commemorations.",
    visitorExperience:
      "Visiting the monument and cemetery, paying respects to the victims, understanding the full scale of the chemical attack, one of the most moving and significant sites in Kurdistan.",
    travelGuidance:
      "In Halabja city. Via Erbil-Sulaymaniyah-Halabja road. Approx. 3-3.5 hours from Erbil.",
    accommodation: "Hotels in Halabja city. Hotels in Sulaymaniyah (~75 km).",
  },
  {
    id: "darband-belola-ruins",
    name: "Darband Belola Ruins",
    location: "Midan District, Sulaymaniyah Province",
    image: heritageImage,
    description:
      "A map discovered by Sir Henry Rawlinson in 1836 is engraved on the stones of Darband Belola. The map is thought to date back to 32 BC. It includes a drawing of three people: one warrior with a bow, spear and axe, and two captives. The drawings are thought to relate to the Loloyans who ruled during the third millennium BC.",
    role: "Historical",
    distanceFromErbil: "~200 km southeast",
    bestTimeToVisit: "Spring and autumn.",
    visitorExperience:
      "Viewing the ancient engraved map and warrior figures, understanding this rare piece of ancient cartography.",
    travelGuidance: "Midan district. Via Sulaymaniyah roads. Private car required.",
    accommodation: "Hotels in Sulaymaniyah.",
  },
  {
    id: "shrine-srochki-castle-barzinja",
    name: "Shrine & Srochki Castle, Barzinja",
    location: "Sulaymaniyah Province",
    image: mountainImage,
    description:
      "The town of Barzinja lies 55 km northeast of Sulaymaniyah. Home to the shrine of two of Prophet Mohammed's offspring, Esa and Musa. Founded by Sheikh Esa, who died in 1353 AD. Srochki Castle was built in the 16th century and sits on top of a nearby mountain.",
    role: "Historical | Religious",
    distanceFromErbil: "~220 km southeast",
    bestTimeToVisit: "Spring and autumn.",
    visitorExperience:
      "Religious shrine pilgrimage, exploring the 16th-century Srochki Castle, scenic mountain setting.",
    travelGuidance: "55 km northeast of Sulaymaniyah. Private car required.",
    accommodation: "Hotels in Sulaymaniyah (~55 km).",
  },
  {
    id: "duhok-museum",
    name: "Duhok Museum",
    location: "Duhok City",
    image: cityImage,
    description:
      "Located next to Qa Park in Duhok, the museum houses a collection of over 1,000 artifacts dating from the Stone Age through to the Islamic era. Galleries are beautifully decorated and lit, ensuring an instructive experience for visitors.",
    role: "Historical",
    distanceFromErbil: "~250 km northwest",
    bestTimeToVisit: "Year-round.",
    visitorExperience:
      "Viewing over 1,000 artifacts from the Stone Age to the Islamic era, beautifully curated galleries.",
    travelGuidance: "Next to Qa Park, central Duhok city. Accessible by taxi from all city hotels.",
    accommodation: "Full range of hotels in Duhok city.",
  },
  {
    id: "sculptures-of-halamta-cave",
    name: "Sculptures of Halamta Cave",
    location: "East of Duhok City",
    image: shanidarImage,
    description:
      "A historic cave 7 km east of Duhok city, north of the town of Kifrki. The cave consists of four sections decorated with carvings of humans and animals representing a battle victory.",
    role: "Historical",
    distanceFromErbil: "~250 km northwest",
    bestTimeToVisit: "Spring and autumn.",
    visitorExperience:
      "Viewing the cave's four sections of ancient rock carvings depicting humans and animals in a battle scene.",
    travelGuidance: "7 km east of Duhok city, north of Kifrki. Private car recommended.",
    accommodation: "Full range of hotels in Duhok city.",
  },
];
