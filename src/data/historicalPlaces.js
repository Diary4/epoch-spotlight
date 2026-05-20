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
  {
    id: "chairlifts-pablo",
    name: "Chairlifts Pablo",
    location: "Duhok Province",
    image: mountainImage,
    description:
      "A tourist complex located 11 km northeast of Duhok. Features motels, restaurants, a casino, and chairlifts that take visitors up and down the mountainside.",
    role: "Historical | Natural",
    distanceFromErbil: "~255 km northwest",
    bestTimeToVisit: "Spring and summer.",
    visitorExperience:
      "Chairlift rides up and down the mountainside, panoramic views, dining, motel stays.",
    travelGuidance:
      "11 km northeast of Duhok city. Approx. 15 minutes from Duhok center.",
    accommodation: "On-site motel facilities. Hotels in Duhok city (11 km).",
  },
  {
    id: "amediya-amedi-town",
    name: "Amediya (Amedi) Town",
    location: "Duhok Province",
    image: cityImage,
    description:
      "A small, beautiful town perched on the plateau at the top of a mountain. Built over 1,000 years ago and still home to 5,000 inhabitants, 90 km northeast of Duhok. Contains an ancient mosque, the town's Old Gate, a Minaret, a Dome, the Zoroastrian's Gate, and ruins of Qubahani School, a 17th-century center for Islamic sciences.",
    role: "Historical",
    distanceFromErbil: "~210 km northwest",
    bestTimeToVisit: "Spring and autumn.",
    visitorExperience:
      "Exploring the ancient plateau town, visiting the ancient mosque, Old Gate, Minaret, Dome, Zoroastrian's Gate, and the ruins of Qubahani School.",
    travelGuidance:
      "Via Erbil-Duhok-Amedi road. Approx. 3 hours. The plateau is accessible by the car-friendly road.",
    accommodation: "Guesthouses in Amedi. Hotels in Duhok (~90 km).",
  },
  {
    id: "khinis-rock-carvings",
    name: "Khinis Rock Carvings",
    location: "Duhok Province",
    image: heritageImage,
    description:
      "Located 52 km east of Duhok, near Shexan. Also known as Sanharib, the summer resort of Assyrian King Sennacherib (705-681 BC). Features six engraved rocks, a statue of a flying oxen, cuneiform writing, a small cave temple, and a sculpture of the king himself.",
    role: "Historical",
    distanceFromErbil: "~220 km northwest",
    bestTimeToVisit: "Spring and autumn.",
    visitorExperience:
      "Viewing the Assyrian rock carvings depicting a winged bull, two gods and King Sennacherib, cuneiform inscriptions, small cave temple.",
    travelGuidance:
      "52 km east of Duhok, ~13 km northeast of Shexan. Private car required.",
    accommodation: "Hotels in Duhok (~52 km).",
  },
  {
    id: "anishki-cave",
    name: "Anishki Cave",
    location: "Near Sarsang, Duhok Province",
    image: shanidarImage,
    description:
      "Located 9 km north of Sarsang. A stone staircase leads to the cave where water drips from the ceiling, creating a natural fountain and a refreshingly cool environment inside, especially welcome during hot summer days.",
    role: "Historical | Natural",
    distanceFromErbil: "~210 km northwest",
    bestTimeToVisit: "Summer for the cool cave environment. Spring for greenery.",
    visitorExperience:
      "Climbing the stone staircase to the cave, experiencing the natural dripping fountain inside, picnicking in the surrounding tree-shaded area.",
    travelGuidance: "9 km north of Sarsang. Via Duhok-Sarsang road.",
    accommodation: "Hotels in Sarsang (9 km). Hotels in Duhok.",
  },
  {
    id: "girbish-village",
    name: "Girbish Village",
    location: "Near Akre, Duhok Province",
    image: valleyImage,
    description:
      "A village at the foot of Peris Mountain, 23 km north of Akre. At the tourist site above the village, six wells flow under a grove of walnut trees, creating a beautiful shaded area.",
    role: "Historical | Natural",
    distanceFromErbil: "~195 km northeast",
    bestTimeToVisit: "Spring and summer.",
    visitorExperience:
      "Visiting the six flowing wells under walnut trees, picnicking in the shaded grove, exploring the foot of Peris Mountain.",
    travelGuidance: "23 km north of Akre. Via Erbil-Akre road then north.",
    accommodation: "Hotels in Akre (23 km). Hotels in Duhok.",
  },
  {
    id: "zanta-valley",
    name: "Zanta Valley",
    location: "Near Akre, Duhok Province",
    image: valleyImage,
    description:
      "Lies 13 km east of Akre, starting at the small village of Bjail. The Brisho River flows through the valley, with Sari Sada Mountain to its east and Sari Sidanok to its west. Springs and wells can be found throughout the valley.",
    role: "Historical | Natural",
    distanceFromErbil: "~185 km northeast",
    bestTimeToVisit: "Spring and summer.",
    visitorExperience:
      "River walks along the Brisho River, spring and well visits, mountain scenery, photography.",
    travelGuidance:
      "13 km east of Akre, starting at Bjail village. Via Erbil-Akre road.",
    accommodation: "Hotels in Akre (13 km). Hotels in Duhok.",
  },
  {
    id: "selei",
    name: "Selei",
    location: "Near Akre, Duhok Province",
    image: valleyImage,
    description:
      "A beautiful site at the foot of the Peris Mountain chain, 8 km east of Dinarta and 32 km from Akre. Water flowing from the mountain creates a 50m high waterfall that falls onto an orchard of willow trees. Benches and seating areas are set up for tourists.",
    role: "Historical | Natural",
    distanceFromErbil: "~200 km northeast",
    bestTimeToVisit: "Spring and summer.",
    visitorExperience:
      "Viewing the 50m waterfall, relaxing among willow trees, picnicking in the seating areas by the waterfall.",
    travelGuidance: "8 km east of Dinarta, 32 km from Akre. Via Erbil-Akre road.",
    accommodation: "Hotels in Akre (~32 km). Hotels in Duhok.",
  },
  {
    id: "gundik-cave-sculptures",
    name: "Gundik Cave Sculptures",
    location: "Near Akre, Duhok Province",
    image: shanidarImage,
    description:
      "Gundik cave lies 20 km east of Akre, just outside the village of Gundik. Sculptures carved into the natural rock adorn both the outside and interior of the cave, depicting animals and humans.",
    role: "Historical",
    distanceFromErbil: "~190 km northeast",
    bestTimeToVisit: "Spring and autumn.",
    visitorExperience:
      "Viewing ancient rock sculptures of animals and humans both on the cave exterior and interior.",
    travelGuidance: "20 km east of Akre. Via Erbil-Akre road then east.",
    accommodation: "Hotels in Akre (20 km). Hotels in Duhok.",
  },
  {
    id: "sepay-bjail-waterfall-resort",
    name: "Sepay Bjail Waterfall & Resort",
    location: "Near Akre, Duhok Province",
    image: valleyImage,
    description:
      "Located in Bjail town, 13 km northwest of Akre. The waterfall is created by a combination of several mountain springs. Tourist facilities include an artificial cave behind the waterfall.",
    role: "Historical | Natural",
    distanceFromErbil: "~185 km northeast",
    bestTimeToVisit: "Spring and summer.",
    visitorExperience:
      "Viewing the combined-spring waterfall, exploring the artificial cave behind it, picnicking in the orchard valley.",
    travelGuidance: "13 km northwest of Akre, in Bjail town. Via Erbil-Akre road.",
    accommodation: "Hotels in Akre (13 km). Hotels in Duhok.",
  },
  {
    id: "shrine-of-abdul-aziz-al-gaylani",
    name: "Shrine of Abdul Aziz Al Gaylani",
    location: "Near Akre, Duhok Province",
    image: cityImage,
    description:
      "A famous sheikh and leader of the Alqadiriyya Sufi order who accompanied Saladin during the liberation of Jerusalem. His shrine lies west of the town of Akre in a valley full of orchards and grapevines. Visited by tens of thousands of pilgrims from Iraq, Iran, Pakistan, India, Afghanistan, and Turkey.",
    role: "Historical | Religious",
    distanceFromErbil: "~180 km northeast",
    bestTimeToVisit: "Year-round. Religious holidays for peak pilgrimage.",
    visitorExperience:
      "Sufi shrine pilgrimage, beautiful orchard valley setting, multinational pilgrimage atmosphere.",
    travelGuidance: "West of Akre town, in a valley west of the city. Via Erbil-Akre road.",
    accommodation: "Hotels in Akre. Hotels in Duhok (~100 km).",
  },
  {
    id: "dalal-bridge-zakho",
    name: "Dalal Bridge, Zakho",
    location: "Zakho, Duhok Province",
    image: heritageImage,
    description:
      "An ancient bridge in the town of Zakho, built on the Khapour River. It is 114 m long, 4.7 m wide, and 16 m high, built using large river stones. Zakho is also known for its mineral springs thought to have medicinal properties.",
    role: "Historical",
    distanceFromErbil: "~310 km northwest",
    bestTimeToVisit: "Year-round.",
    visitorExperience:
      "Walking across the historic ancient bridge, viewing its massive stone construction over the Khapour River, visiting the nearby mineral springs.",
    travelGuidance:
      "In the heart of Zakho city. Via Erbil-Duhok-Zakho road. Approx. 4 hours from Erbil.",
    accommodation: "Hotels in Zakho. Hotels in Duhok (~80 km).",
  },
  {
    id: "sherwana-citadel",
    name: "Sherwana Citadel",
    location: "Kalar, Garmyan",
    image: heritageImage,
    description:
      "Mahmood Pasha Jaff built Sherwana Citadel in the late 19th century as a tribal administrative center and residence. Set atop a small hill at the northeastern entrance to Kalar, this beautiful castle consists of a basement, two floors, an octagonal hall, and a small museum.",
    role: "Historical",
    distanceFromErbil: "~190 km southeast",
    bestTimeToVisit: "Spring and autumn.",
    visitorExperience:
      "Exploring the late 19th-century castle, viewing the octagonal hall, visiting the small on-site museum.",
    travelGuidance:
      "At the northeastern entrance to Kalar. Via Erbil-Koya-Kalar road. Approx. 2.5 hours.",
    accommodation: "Hotels in Kalar. Sulaymaniyah hotels as base.",
  },
  {
    id: "pasha-palace-mahmud-pasha-jaff",
    name: "Pasha Palace (Mahmud Pasha Jaff)",
    location: "Tazadai Village, Near Kalar",
    image: heritageImage,
    description:
      "Located in Tazadai village, 9 km northeast of Kalar. Mahmood Pasha Jaff built this two-story historic mansion in 1895. A rectangular building north of the palace was used as a storehouse and stable for horses and mules.",
    role: "Historical",
    distanceFromErbil: "~195 km southeast",
    bestTimeToVisit: "Spring and autumn.",
    visitorExperience:
      "Exploring the 1895 two-story historic mansion, viewing the original storehouse and stable buildings.",
    travelGuidance:
      "9 km northeast of Kalar in Tazadai village. Via Erbil-Koya-Kalar road.",
    accommodation: "Hotels in Kalar. Sulaymaniyah hotels as base.",
  },
  {
    id: "majeed-basha-palace",
    name: "Majeed Basha Palace",
    location: "East of Kifri, Garmyan",
    image: heritageImage,
    description:
      "Located east of Kifri district. Built by Majeed Basha ibn Qader Beik at the end of the 19th century, the palace contains two floors, some rooms and a hall.",
    role: "Historical",
    distanceFromErbil: "~160 km southeast",
    bestTimeToVisit: "Spring and autumn.",
    visitorExperience:
      "Exploring the late 19th-century two-story palace with its original rooms and hall.",
    travelGuidance: "East of Kifri district. Via Erbil-Koya-Kifri road. Approx. 2 hours.",
    accommodation: "Hotels in Kifri. Sulaymaniyah hotels as base.",
  },
  {
    id: "bawashaswar-manmade-caves",
    name: "Bawashaswar Manmade Caves",
    location: "Near Kifri, Garmyan",
    image: shanidarImage,
    description:
      "Rectangular caves constructed in the first centuries AD, located north and northeast of the town of Kifri. Visitors can also explore Bawashaswar's stony hills, the site of many historical graves.",
    role: "Historical",
    distanceFromErbil: "~155 km southeast",
    bestTimeToVisit: "Spring and autumn.",
    visitorExperience:
      "Exploring the rectangular manmade caves from the first centuries AD, viewing the ancient burial sites in the stony hills.",
    travelGuidance: "North and northeast of Kifri. Via Erbil-Koya-Kifri road.",
    accommodation: "Hotels in Kifri. Sulaymaniyah hotels as base.",
  },
  {
    id: "bhairai-cave-zakho",
    name: "Bhairai Cave, Zakho",
    location: "Near Zakho, Duhok Province",
    image: shanidarImage,
    description:
      "Located about 45 km east of Zakho and 5 km from the Sharanish resort. A large cave easily accessible for visitors who can also visit the nearby Qasrok and Dashta Tkhi parks.",
    role: "Historical | Natural",
    distanceFromErbil: "~315 km northwest",
    bestTimeToVisit: "Spring and summer.",
    visitorExperience:
      "Cave exploration, visiting nearby Qasrok and Dashta Tkhi parks, combining with Sharanish resort visit.",
    travelGuidance:
      "45 km east of Zakho, 5 km from Sharanish resort. Via Erbil-Duhok-Zakho road.",
    accommodation: "Hotels at Sharanish resort (5 km). Hotels in Zakho (~45 km).",
  },
  {
    id: "kirkuk-citadel",
    name: "Kirkuk Citadel",
    location: "Kirkuk City",
    image: cityImage,
    description:
      "Considered the oldest part of Kirkuk. The citadel stands on an artificial mound 130 feet high across the Khasa River, believed to have been built by King Ashurnasirpal II (884-858 BC). The palace houses a mosque with Prophet Daniel's tomb, two domes, three minarets, arches and a graveyard.",
    role: "Historical",
    distanceFromErbil: "~83 km south",
    bestTimeToVisit: "Spring and autumn.",
    visitorExperience:
      "Visiting Prophet Daniel's tomb and the historic mosque, viewing the ancient mound and its 5,000-year-old settlement, exploring the domes, minarets and arches.",
    travelGuidance:
      "In Kirkuk city, across the Khasa River. Via Erbil-Kirkuk highway. Approx. 1.5 hours.",
    accommodation: "Full range of hotels in Kirkuk city.",
  },
];

const HISTORICAL_PLACE_AR_TRANSLATIONS = {
  "erbil-citadel": {
    nameAr: "قلعة أربيل (قلعة هولير)",
    locationAr: "مدينة أربيل",
    roleAr: "تاريخي",
    descriptionAr:
      "من أقدم المواقع المأهولة باستمرار في العالم. موقع تراث عالمي لليونسكو (2014). يرتفع التل 25-32 مترا فوق المدينة بستة آلاف سنة من الحضارات المتراكمة.",
    distanceFromErbilAr: "0 كم — وسط المدينة",
    bestTimeToVisitAr: "مارس-مايو، أكتوبر-نوفمبر.",
    visitorExperienceAr:
      "المشي في الأزقة القديمة، زيارة متحف المنسوجات والبيوت المرممة. مناظر 360 درجة على أربيل.",
    travelGuidanceAr: "سيرا من وسط أربيل.",
    accommodationAr: "مجموعة كاملة من فنادق أربيل.",
  },
  "shanidar-cave": {
    nameAr: "كهف شاندر",
    locationAr: "جبل برادوست، محافظة أربيل",
    roleAr: "تاريخي | طبيعي",
    descriptionAr:
      "بقايا عشرة أفراد من إنسان النياندرتال يعود تاريخها إلى 35,000-65,000 سنة، أحد أهم المواقع ما قبل التاريخية في العالم.",
    distanceFromErbilAr: "~100 كم شمال شرق",
    bestTimeToVisitAr: "الربيع والخريف.",
    visitorExperienceAr:
      "المشي إلى مدخل الكهف، مناظر جبلية رائعة، موقع بحث أثري دولي مستمر.",
    travelGuidanceAr:
      "عبر طريق سوران ثم مسار جبلي. دفع رباعي موصى به. حوالي 2-2.5 ساعة.",
    accommodationAr: "بيوت ضيافة في سوران (~50 كم).",
  },
  "akre-town-citadel": {
    nameAr: "بلدة عقرة والقلعة",
    locationAr: "محافظة دهوك",
    roleAr: "تاريخي | طبيعي",
    descriptionAr:
      "أسسها الأمير الكردي زند عام 580 ق.م. غنية بالمعابد والتماثيل والبيوت القديمة والينابيع المعدنية وشلال سيبا البالغ 30 مترا ومعبد زرادشت الكهفي.",
    distanceFromErbilAr: "~175 كم شمال شرق",
    bestTimeToVisitAr: "20 مارس (نوروز)، الربيع والخريف.",
    visitorExperienceAr:
      "استكشاف القلعة، شلال سيبا، الينابيع المعدنية العلاجية، كهف معبد زرادشت.",
    travelGuidanceAr:
      "عبر طريق أربيل-گور-مخمور-عقرة. حوالي 2-2.5 ساعة من أربيل.",
    accommodationAr: "فنادق وبيوت ضيافة في عقرة.",
  },
  "khanzad-citadel": {
    nameAr: "قلعة خانزاد",
    locationAr: "محافظة أربيل (طريق أربيل-شقلاوة)",
    roleAr: "تاريخي",
    descriptionAr:
      "بنيت في القرن السادس عشر إبان إمارة السوران. شاهد على الحكم الأنثوي في التاريخ الكردي. تجلس على تل بأربعة أبراج مستديرة في زواياه.",
    distanceFromErbilAr: "~22 كم (على طريق أربيل-شقلاوة)",
    bestTimeToVisitAr: "الربيع والخريف.",
    visitorExperienceAr:
      "استكشاف أطلال القلعة والأبراج الأربعة والمناظر البانورامية.",
    travelGuidanceAr:
      "على طريق أربيل-شقلاوة، 22 كم من أربيل. حوالي 30-40 دقيقة.",
    accommodationAr: "فنادق شقلاوة (~25 كم أبعد). فنادق أربيل.",
  },
  "barzan-graveyard-of-martyrs": {
    nameAr: "بارزان — مقبرة الشهداء",
    locationAr: "بارزان / ميرجاسر، شمال أربيل",
    roleAr: "تاريخي",
    descriptionAr:
      "تحتضن المقبرة رفات ملا مصطفى البارزاني (1903-1979) ونجله الأكبر إدريس. يزورها مئات الآلاف سنويا.",
    distanceFromErbilAr: "~155 كم شمالا",
    bestTimeToVisitAr: "في أي وقت من العام (موقع حج وطني).",
    visitorExperienceAr: "موقع حج وطني عميق الأثر محوري للهوية الكردية.",
    travelGuidanceAr: "عبر طريق أربيل-ميرجاسر-بارزان. حوالي 2.5 ساعة.",
    accommodationAr:
      "بيوت ضيافة في بارزان. منتجع ريزان الصيفي (22 كم جنوب شرق).",
  },
  "rost-valley-citadel": {
    nameAr: "وادي روست والقلعة",
    locationAr: "منطقة هلگورد / محافظة أربيل",
    roleAr: "تاريخي | طبيعي | مغامرات",
    descriptionAr:
      "وادي روست عند سفح جبل هلگورد بمياهه العذبة وغاباته وبساتينه. قلعة روست فوق الجبل موقع أثري مهم.",
    distanceFromErbilAr: "~137 كم شمال شرق",
    bestTimeToVisitAr: "أواخر الربيع والصيف.",
    visitorExperienceAr:
      "المشي في الوادي، استكشاف القلعة، مناظر جبلية قرب أعلى قمة في العراق.",
    travelGuidanceAr:
      "عبر طريق سوران-شومان قرب قرية سيرين. حوالي 2.5 ساعة.",
    accommodationAr: "بيوت ضيافة في منطقة روست/سيرين. مدينة شومان.",
  },
  "bestoon-bastoon-cave": {
    nameAr: "كهف بيستون (باستون)",
    locationAr: "منطقة سوران، محافظة أربيل",
    roleAr: "تاريخي | طبيعي",
    descriptionAr:
      "كهف من العصر الحجري يعتقد أنه كان موطن إنسان النياندرتال. لم ينقب بعد.",
    distanceFromErbilAr: "~100 كم فأكثر",
    bestTimeToVisitAr: "الربيع والخريف.",
    visitorExperienceAr:
      "استكشاف الكهف، الأجواء ما قبل التاريخية، مشي صعب للوصول.",
    travelGuidanceAr: "عبر طرق منطقة سوران. دفع رباعي موصى به.",
    accommodationAr: "فنادق سوران (~20 كم).",
  },
  "koya-city": {
    nameAr: "مدينة كويسنجق",
    locationAr: "بين أربيل والسليمانية",
    roleAr: "تاريخي | ديني",
    descriptionAr:
      "تحيط بها جبال باواجي وهيبت سلطان. غنية بالمزارات والمساجد التاريخية ومقر الحكومة العثمانية (القشلة) وأحد أقدم الأسواق في المنطقة.",
    distanceFromErbilAr: "~80 كم جنوب شرق",
    bestTimeToVisitAr: "الربيع والخريف.",
    visitorExperienceAr:
      "الحج إلى المزارات، استكشاف السوق القديم، زيارة مبنى القشلة.",
    travelGuidanceAr: "عبر طريق أربيل-كويسنجق. حوالي 1.5 ساعة.",
    accommodationAr: "فنادق وبيوت ضيافة في كويسنجق.",
  },
  "qizqapan-rock-sculpture": {
    nameAr: "نقش كيژقاپان الصخري",
    locationAr: "محافظة السليمانية",
    roleAr: "تاريخي",
    descriptionAr:
      "واجهة صخرية منقوشة تعود إلى 650 ق.م، يرجح أنها ضريح الملك كايخوسرو. تتضمن شخصيات زرادشتية وتشبه بالبتراء الأردنية.",
    distanceFromErbilAr: "~200 كم جنوب شرق",
    bestTimeToVisitAr: "الربيع والخريف.",
    visitorExperienceAr:
      "مشاهدة النقوش الأثرية، التفسير التاريخي، تصوير الواجهة المنقوشة.",
    travelGuidanceAr:
      "50 كم غرب السليمانية في وادي شامي رزان، 17 كم شرق دوكان.",
    accommodationAr: "فنادق السليمانية (~90 كم) أو كويسنجق.",
  },
  "duhok-valley-dam": {
    nameAr: "وادي دهوك والسد",
    locationAr: "مدينة دهوك",
    roleAr: "تاريخي | طبيعي | ديني",
    descriptionAr:
      "2 كم شمال دهوك. السد يكون بحيرة هادئة بجانب معبد چوار ئاستون الزرادشتي الكهفي، مزيج نادر من الجمال والإرث الديني القديم.",
    distanceFromErbilAr: "~250 كم شمال غرب",
    bestTimeToVisitAr: "الربيع والخريف.",
    visitorExperienceAr:
      "مناظر البحيرة، زيارة المعبد الزرادشتي الكهفي، استكشاف الكهف الكبير.",
    travelGuidanceAr: "عبر طريق أربيل-دهوك. حوالي 3-3.5 ساعات.",
    accommodationAr: "مجموعة كاملة من فنادق دهوك (2 كم).",
  },
  "hazar-merd-cave": {
    nameAr: "كهف هزار ميرد (كهف الألف رجل)",
    locationAr: "محافظة السليمانية",
    roleAr: "تاريخي",
    descriptionAr:
      "مجمع كهوف 13 كم جنوب غرب السليمانية. نقبت به دوروثي غارود عام 1928 وعثر على أدوات حجرية وعظام حيوانات تعود إلى 50,000 سنة.",
    distanceFromErbilAr: "~190 كم جنوب شرق",
    bestTimeToVisitAr: "الربيع والخريف.",
    visitorExperienceAr:
      "مسار مشي معتدل، مناظر رائعة على الوادي، أجواء ما قبل التاريخ.",
    travelGuidanceAr:
      "13 كم غرب وسط مدينة السليمانية. يسهل الوصول بالسيارة.",
    accommodationAr: "جميع فنادق السليمانية.",
  },
  "qalinj-agha-hill": {
    nameAr: "تل قلنج آغا",
    locationAr: "مدينة أربيل",
    roleAr: "تاريخي",
    descriptionAr:
      "موقع أثري مهم في وسط أربيل يحوي طبقات استيطانية من الألفيتين الرابعة والخامسة قبل الميلاد.",
    distanceFromErbilAr: "وسط المدينة (1 كم من القلعة)",
    bestTimeToVisitAr: "طوال العام.",
    visitorExperienceAr:
      "استكشاف الموقع الأثري وربطه بالتاريخ العريق لأربيل.",
    travelGuidanceAr: "وسط أربيل. يمكن الوصول سيرا أو بأي مواصلة.",
    accommodationAr: "مجموعة كاملة من فنادق أربيل.",
  },
  "choli-minaret": {
    nameAr: "المنارة الجولية",
    locationAr: "مدينة أربيل",
    roleAr: "تاريخي",
    descriptionAr:
      "بنيت عام 1128-1138م في عهد السلطان مظفر الدين. تعرف بالمنارة المظفرية. رمز في قلب أربيل.",
    distanceFromErbilAr: "وسط المدينة",
    bestTimeToVisitAr: "طوال العام.",
    visitorExperienceAr:
      "مشاهدة المنارة السلجوقية من القرن الثاني عشر وزيارة منتزه المنارة.",
    travelGuidanceAr: "وسط أربيل. مرئية من مسافات بعيدة.",
    accommodationAr: "مجموعة كاملة من فنادق أربيل.",
  },
  "qaysari-bazaar": {
    nameAr: "بازار القيصرية",
    locationAr: "مدينة أربيل",
    roleAr: "تاريخي",
    descriptionAr:
      "جنوب شرق قلعة أربيل. شيد في الحقبة العثمانية بممرات طويلة تصطف على جانبيها المحلات. رمم مؤخرا مع الحفاظ على طابعه.",
    distanceFromErbilAr: "وسط المدينة (عند بوابة القلعة)",
    bestTimeToVisitAr: "طوال العام.",
    visitorExperienceAr:
      "التسوق للحرف اليدوية والبهارات والنسيج؛ إعجاب بعمارة السوق المقبب العثماني.",
    travelGuidanceAr:
      "عند قاعدة قلعة أربيل. على مسافة مشي من جميع فنادق أربيل المركزية.",
    accommodationAr: "مجموعة كاملة من فنادق أربيل.",
  },
  "dween-castle": {
    nameAr: "قلعة دوين",
    locationAr: "شمال غرب أربيل",
    roleAr: "تاريخي",
    descriptionAr:
      "56 كم شمال غرب أربيل. حصن عسكري على تل استراتيجي. مرتبطة بإمارة السوران ويحتمل ارتباطها بحقبة جد صلاح الدين. تضم مقبرة قديمة بشواهد قبور مكتوبة.",
    distanceFromErbilAr: "~56 كم شمال غرب",
    bestTimeToVisitAr: "الربيع والخريف.",
    visitorExperienceAr: "استكشاف أطلال القلعة والمقبرة القديمة المكتوبة.",
    travelGuidanceAr: "عبر طريق أربيل-بيرمام. حوالي 1-1.5 ساعة.",
    accommodationAr: "فنادق أربيل كقاعدة.",
  },
  "dairei-citadel": {
    nameAr: "قلعة ديريه",
    locationAr: "محافظة أربيل",
    roleAr: "تاريخي",
    descriptionAr:
      "تعود إلى عهد الأمير محمد (1813-1837). تقع 38 كم من أربيل على طريق أربيل-دارابزمار. جدار دفاعي سميك بفتحات قنص لا يزال بعضه قائما.",
    distanceFromErbilAr: "~38 كم",
    bestTimeToVisitAr: "الربيع والخريف.",
    visitorExperienceAr:
      "استكشاف أطلال القلعة من القرن التاسع عشر وبقايا الجدار الدفاعي.",
    travelGuidanceAr: "عبر طريق أربيل-دارابزمار. حوالي 45 دقيقة.",
    accommodationAr: "فنادق أربيل كقاعدة.",
  },
  "barsireen-bridge": {
    nameAr: "جسر بارسيرين",
    locationAr: "شمال شرق سوران، محافظة أربيل",
    roleAr: "تاريخي",
    descriptionAr:
      "جسر أثري على طريق هاملتون بني في عهد إمارة السوران (1813-1837). أربعة أعمدة أسطوانية بديعة لا تزال تحته واستخدامه مستمر.",
    distanceFromErbilAr: "~120 كم شمال شرق",
    bestTimeToVisitAr: "الربيع والخريف.",
    visitorExperienceAr:
      "مشاهدة الجسر التاريخي وأعمدته الأسطوانية الأربعة، التصوير.",
    travelGuidanceAr: "على قسم سوران-حاج عمران من طريق هاملتون.",
    accommodationAr: "فنادق سوران (~30 كم).",
  },
  "cannon-of-wasta-rajab": {
    nameAr: "مدفع وستا رجب",
    locationAr: "رواندوز، محافظة أربيل",
    roleAr: "تاريخي",
    descriptionAr:
      "صنعه واستا رجب في عهد أمير السوران (1813-1837). كان واستا رجب أول كردي يبعث إلى فرنسا لتعلم صناعة الأسلحة.",
    distanceFromErbilAr: "~107 كم شمال شرق",
    bestTimeToVisitAr: "طوال العام.",
    visitorExperienceAr:
      "مشاهدة المدفع التاريخي والتعرف على تاريخ الحرفة الكردية في القرن التاسع عشر.",
    travelGuidanceAr:
      "في مدينة رواندوز. عبر طريق أربيل-سوران-رواندوز. حوالي 2 ساعة.",
    accommodationAr: "فنادق سوران (~17 كم). بيوت ضيافة رواندوز.",
  },
  "shrine-of-marbina-qadisha": {
    nameAr: "ضريح ماربينا قديشا",
    locationAr: "قرب مدينة كويسنجق",
    roleAr: "تاريخي | ديني",
    descriptionAr:
      "3 كم من كويسنجق. يعرف بماربينا بهنام. موقع حج مسيحي إلى اليوم.",
    distanceFromErbilAr: "~80 كم جنوب شرق",
    bestTimeToVisitAr: "الربيع والخريف. مواسم الحج.",
    visitorExperienceAr: "الحج إلى الضريح المسيحي، العمارة التاريخية.",
    travelGuidanceAr: "3 كم شمال شرق قرية هارموتا، قرب كويسنجق.",
    accommodationAr: "فنادق كويسنجق. فنادق أربيل كقاعدة.",
  },
  "chwar-taqan": {
    nameAr: "چوار تاقان",
    locationAr: "جنوب مدينة كويسنجق",
    roleAr: "تاريخي",
    descriptionAr:
      "محطة توقف واستراحة للقوافل التاريخية. رممت أطلاله عام 2002 وتضم أربعة أجران ماء كبيرة.",
    distanceFromErbilAr: "~85 كم جنوب شرق",
    bestTimeToVisitAr: "الربيع والخريف.",
    visitorExperienceAr:
      "زيارة أطلال محطة القوافل ومشاهدة الأجران الأربعة القديمة.",
    travelGuidanceAr: "جنوب مدينة كويسنجق. عبر طريق أربيل-كويسنجق.",
    accommodationAr: "فنادق كويسنجق.",
  },
  "koya-bazar": {
    nameAr: "بازار كويسنجق",
    locationAr: "مدينة كويسنجق",
    roleAr: "تاريخي",
    descriptionAr:
      "من أقدم الأسواق في المنطقة بأقواسه وممراته القديمة. في وسط مدينة كويسنجق.",
    distanceFromErbilAr: "~80 كم جنوب شرق",
    bestTimeToVisitAr: "طوال العام.",
    visitorExperienceAr:
      "استكشاف الأقواس والممرات القديمة، التسوق للمنتجات المحلية.",
    travelGuidanceAr: "وسط مدينة كويسنجق. عبر طريق أربيل-كويسنجق.",
    accommodationAr: "فنادق كويسنجق.",
  },
  "taq-taq": {
    nameAr: "طاق طاق",
    locationAr: "قضاء كويسنجق",
    roleAr: "تاريخي | طبيعي",
    descriptionAr:
      "جزء من قضاء كويسنجق. يشتهر بحدائقه ومحيطه الطبيعي الساحر بما فيه نهر صغير يتدفق عبر المدينة.",
    distanceFromErbilAr: "~90 كم جنوب شرق",
    bestTimeToVisitAr: "الربيع والصيف.",
    visitorExperienceAr:
      "زيارة الحدائق، المشي على ضفاف النهر، المناظر الطبيعية، النزهات العائلية.",
    travelGuidanceAr: "عبر طريق أربيل-كويسنجق ثم جنوب شرق إلى طاق طاق.",
    accommodationAr: "فنادق كويسنجق (~10 كم).",
  },
  "jally-river": {
    nameAr: "نهر جالي",
    locationAr: "قرب كويسنجق، محافظة أربيل",
    roleAr: "تاريخي | طبيعي",
    descriptionAr:
      "75 كم شمال شرق أربيل و24 كم من كويسنجق. يشق وادي سماقولي بمناظر خلابة. يعتقد أن ماء بحيراته وبركه يعالج بعض أمراض الجلد.",
    distanceFromErbilAr: "~75 كم شمال شرق",
    bestTimeToVisitAr: "الربيع والصيف.",
    visitorExperienceAr:
      "المشي على ضفاف النهر، مناظر البساتين، زيارة البرك العلاجية.",
    travelGuidanceAr: "عبر طريق أربيل-كويسنجق ثم شمال شرقا.",
    accommodationAr: "فنادق كويسنجق (~24 كم).",
  },
  "amne-soreke-red-security-museum": {
    nameAr: "أمنه سوركه (متحف الأمن الأحمر)",
    locationAr: "مدينة السليمانية",
    roleAr: "تاريخي",
    descriptionAr:
      "المقر السابق للشرطة السرية لنظام البعث. بعد انتفاضة 1991 تحول إلى متحف يوثق تعذيب الأكراد. من أكثر المواقع أثرا في كردستان.",
    distanceFromErbilAr: "~185 كم جنوب شرق",
    bestTimeToVisitAr: "طوال العام. مفتوح يوميا 8ص-4م.",
    visitorExperienceAr:
      "جولة إرشادية في زنازين التعذيب السابقة؛ فهم حجم القمع البعثي.",
    travelGuidanceAr: "وسط مدينة السليمانية.",
    accommodationAr: "مجموعة كاملة من فنادق السليمانية.",
  },
  merqully: {
    nameAr: "مركولي",
    locationAr: "قرب قرية زيوي، محافظة السليمانية",
    roleAr: "تاريخي",
    descriptionAr:
      "منحوتة قديمة عمرها أكثر من 3,000 سنة نقرت في وجه الجبل الصخري. 34 كم من السليمانية.",
    distanceFromErbilAr: "~210 كم جنوب شرق",
    bestTimeToVisitAr: "الربيع والخريف.",
    visitorExperienceAr: "مشاهدة النقش الصخري، التصوير.",
    travelGuidanceAr: "34 كم غرب السليمانية. تتطلب سيارة خاصة.",
    accommodationAr: "فنادق السليمانية.",
  },
  "jami-rezan-caves": {
    nameAr: "كهوف جمي ريزان",
    locationAr: "محافظة السليمانية",
    roleAr: "تاريخي",
    descriptionAr:
      "خدمت مقرا لإذاعة صوت كردستان والثورة الكردية عام 1961. تقع 1 كم من شلال بافل.",
    distanceFromErbilAr: "~185 كم جنوب شرق",
    bestTimeToVisitAr: "الربيع والخريف.",
    visitorExperienceAr: "استكشاف الكهوف التي أذاعت منها الثورة الكردية.",
    travelGuidanceAr: "عبر طرق السليمانية. ينصح بسيارة خاصة.",
    accommodationAr: "فنادق السليمانية.",
  },
  "jasna-cave": {
    nameAr: "كهف جاسنة",
    locationAr: "محافظة السليمانية",
    roleAr: "تاريخي",
    descriptionAr:
      "50 كم شرق السليمانية. لجأ إليه الشيخ محمود عام 1923 وأصدر أول عدد من جريدة 'بانكي حق' من داخله.",
    distanceFromErbilAr: "~220 كم جنوب شرق",
    bestTimeToVisitAr: "الربيع والخريف.",
    visitorExperienceAr: "استكشاف الكهف والتعرف على تاريخ الصحافة الكردية.",
    travelGuidanceAr: "عبر طريق السليمانية-دوكان نحو منطقة سوردش.",
    accommodationAr: "فنادق السليمانية (~50 كم).",
  },
  "palagawra-caves": {
    nameAr: "كهوف پاالاگورا",
    locationAr: "منطقة بازيان، محافظة السليمانية",
    roleAr: "تاريخي",
    descriptionAr: "ثلاثة كهوف من العصر الحجري القديم في منطقة بازيان.",
    distanceFromErbilAr: "~185 كم جنوب شرق",
    bestTimeToVisitAr: "الربيع والخريف.",
    visitorExperienceAr: "استكشاف الكهوف والأجواء ما قبل التاريخية.",
    travelGuidanceAr: "عبر طريق السليمانية-بازيان.",
    accommodationAr: "فنادق السليمانية.",
  },
  "bazyan-strait-historical-remains": {
    nameAr: "أطلال مضيق بازيان التاريخية",
    locationAr: "محافظة السليمانية",
    roleAr: "تاريخي",
    descriptionAr:
      "بقايا قلعة قديمة مرممة وبوابة المضيق، 1 كم من صخرة القائد. تحول إلى معلم سياحي.",
    distanceFromErbilAr: "~180 كم جنوب شرق",
    bestTimeToVisitAr: "الربيع والخريف.",
    visitorExperienceAr: "استكشاف أطلال القلعة وبوابة المضيق.",
    travelGuidanceAr: "عبر طريق السليمانية-بازيان.",
    accommodationAr: "فنادق السليمانية.",
  },
  "ancient-charmo-village": {
    nameAr: "قرية چرمو القديمة",
    locationAr: "قرب چمچمال، محافظة السليمانية",
    roleAr: "تاريخي",
    descriptionAr:
      "أطلال إحدى أقدم القرى الزراعية في العالم. تعود إلى 7,000 ق.م. نقب بها فريق جامعة شيكاغو عام 1955.",
    distanceFromErbilAr: "~150 كم جنوب شرق",
    bestTimeToVisitAr: "الربيع والخريف.",
    visitorExperienceAr:
      "زيارة الموقع الأثري وفهم فجر الزراعة في التاريخ الإنساني.",
    travelGuidanceAr:
      "عبر طريق أربيل-كويسنجق-چمچمال. حوالي 2-2.5 ساعة.",
    accommodationAr: "فنادق السليمانية (~40 كم).",
  },
  "barda-qaraman": {
    nameAr: "برده قهرمان (صخرة البطل)",
    locationAr: "غرب محافظة السليمانية",
    roleAr: "تاريخي",
    descriptionAr:
      "35 كم غرب السليمانية. تحصن خلفها الملك الكردي محمود في مواجهة القوات البريطانية. يقوم في الموقع تمثال تكريمي له.",
    distanceFromErbilAr: "~160 كم جنوب شرق",
    bestTimeToVisitAr: "الربيع والخريف.",
    visitorExperienceAr: "زيارة التمثال التكريمي وتصوير الصخرة المميزة.",
    travelGuidanceAr: "على طريق السليمانية-كركوك، 35 كم غرب السليمانية.",
    accommodationAr: "فنادق السليمانية (35 كم).",
  },
  "gawar-strait-sculptures": {
    nameAr: "منحوتات مضيق گاوار",
    locationAr: "قضاء قرةداغ، محافظة السليمانية",
    roleAr: "تاريخي",
    descriptionAr:
      "منحوتات عمرها 4,000 سنة في وادي گوشان إلى جانب تمثال الملك الأكادي نارامسين.",
    distanceFromErbilAr: "~210 كم جنوب شرق",
    bestTimeToVisitAr: "الربيع والخريف.",
    visitorExperienceAr: "مشاهدة المنحوتات وتمثال الملك نارامسين.",
    travelGuidanceAr: "عبر طريق السليمانية-قرةداغ. تتطلب سيارة خاصة.",
    accommodationAr: "فنادق السليمانية.",
  },
  "zirzi-cave": {
    nameAr: "كهف زرزي",
    locationAr: "محافظة السليمانية",
    roleAr: "تاريخي",
    descriptionAr:
      "عند سفح جبل قوناكوتير. يعود إلى العصور الحجرية. نقبت به دوروثي غارود عام 1928.",
    distanceFromErbilAr: "~195 كم جنوب شرق",
    bestTimeToVisitAr: "الربيع والخريف.",
    visitorExperienceAr: "استكشاف الكهف والأجواء ما قبل التاريخية.",
    travelGuidanceAr: "قرب موقع كيژقاپان، غرب السليمانية.",
    accommodationAr: "فنادق السليمانية.",
  },
  "sartka-citadel": {
    nameAr: "قلعة سارتكة",
    locationAr: "منطقة قاشقولي، محافظة السليمانية",
    roleAr: "تاريخي",
    descriptionAr:
      "مطلة على النهر من قمة تل. بناها الأمير محمد أمير السوران (1813-1837). بقايا جدران وغرف لا تزال ماثلة.",
    distanceFromErbilAr: "~190 كم جنوب شرق",
    bestTimeToVisitAr: "الربيع والخريف.",
    visitorExperienceAr:
      "استكشاف بقايا القلعة ومناظر النهر البانورامية من التل.",
    travelGuidanceAr:
      "عبر طريق السليمانية-دوكان. من أربيل حوالي 2.5-3 ساعات.",
    accommodationAr: "مرافق منتجع قاشقولي. فنادق السليمانية.",
  },
  "sargalu-village": {
    nameAr: "قرية سرگالو",
    locationAr: "وادي جعفاياتي، محافظة السليمانية",
    roleAr: "تاريخي",
    descriptionAr:
      "65 كم من السليمانية. خدمت مقرا للثوار الأكراد وكانت موطن بث إذاعة صوت كردستان.",
    distanceFromErbilAr: "~235 كم جنوب شرق",
    bestTimeToVisitAr: "الربيع والصيف.",
    visitorExperienceAr:
      "زيارة المقر الثوري التاريخي واستكشاف البساتين الغنية والحياة القروية.",
    travelGuidanceAr: "عبر طريق السليمانية-وادي جعفاياتي.",
    accommodationAr: "فنادق السليمانية (~65 كم).",
  },
  "halabja-martyrs-monument-cemetery": {
    nameAr: "نصب شهداء حلبجة والمقبرة",
    locationAr: "مدينة حلبجة",
    roleAr: "تاريخي",
    descriptionAr:
      "النصب الوطني الذي يخلد ذكرى القصف الكيميائي في 16 مارس 1988 الذي راح ضحيته أكثر من 5,000 شهيد. رمز للمقاومة الكردية.",
    distanceFromErbilAr: "~210 كم جنوب شرق",
    bestTimeToVisitAr: "طوال العام. 16 مارس (يوم حلبجة).",
    visitorExperienceAr:
      "زيارة النصب والمقبرة، إحياء ذكرى الضحايا، من أكثر المواقع أهمية في كردستان.",
    travelGuidanceAr:
      "في مدينة حلبجة. عبر طريق أربيل-السليمانية-حلبجة. حوالي 3-3.5 ساعات.",
    accommodationAr: "فنادق حلبجة. فنادق السليمانية (~75 كم).",
  },
  "darband-belola-ruins": {
    nameAr: "أطلال دربند بيلوله",
    locationAr: "منطقة ميدان، محافظة السليمانية",
    roleAr: "تاريخي",
    descriptionAr:
      "خريطة منقورة على أحجاره اكتشفها رولينسون عام 1836. ترجح إلى 32 ق.م وتضم رسما لمحارب وأسيرين.",
    distanceFromErbilAr: "~200 كم جنوب شرق",
    bestTimeToVisitAr: "الربيع والخريف.",
    visitorExperienceAr: "مشاهدة الخريطة المنقوشة القديمة وأشكال المحارب.",
    travelGuidanceAr: "منطقة ميدان. عبر طرق السليمانية.",
    accommodationAr: "فنادق السليمانية.",
  },
  "shrine-srochki-castle-barzinja": {
    nameAr: "ضريح وقلعة سروجك، برزنجة",
    locationAr: "محافظة السليمانية",
    roleAr: "تاريخي | ديني",
    descriptionAr:
      "بلدة برزنجة 55 كم شمال شرق السليمانية. تضم ضريح اثنين من ذرية النبي محمد. قلعة سروچكي بنيت في القرن السادس عشر.",
    distanceFromErbilAr: "~220 كم جنوب شرق",
    bestTimeToVisitAr: "الربيع والخريف.",
    visitorExperienceAr: "الحج إلى الضريح واستكشاف قلعة سروچكي.",
    travelGuidanceAr: "55 كم شمال شرق السليمانية.",
    accommodationAr: "فنادق السليمانية (~55 كم).",
  },
  "duhok-museum": {
    nameAr: "متحف دهوك",
    locationAr: "مدينة دهوك",
    roleAr: "تاريخي",
    descriptionAr:
      "بجانب حديقة قع في دهوك. يضم أكثر من 1,000 قطعة أثرية من العصر الحجري حتى الإسلامي.",
    distanceFromErbilAr: "~250 كم شمال غرب",
    bestTimeToVisitAr: "طوال العام.",
    visitorExperienceAr: "مشاهدة أكثر من 1,000 قطعة أثرية في قاعات منسقة بعناية.",
    travelGuidanceAr: "بجانب حديقة قع، وسط دهوك.",
    accommodationAr: "مجموعة كاملة من فنادق دهوك.",
  },
  "sculptures-of-halamta-cave": {
    nameAr: "منحوتات كهف هالمتا",
    locationAr: "شرق مدينة دهوك",
    roleAr: "تاريخي",
    descriptionAr:
      "كهف 7 كم شرق دهوك. أربعة أقسام مزينة بنقوش لبشر وحيوانات تجسد انتصارا في معركة.",
    distanceFromErbilAr: "~250 كم شمال غرب",
    bestTimeToVisitAr: "الربيع والخريف.",
    visitorExperienceAr: "مشاهدة الأقسام الأربعة ونقوشها القديمة.",
    travelGuidanceAr: "7 كم شرق دهوك، شمال كيفركي.",
    accommodationAr: "مجموعة كاملة من فنادق دهوك.",
  },
  "chairlifts-pablo": {
    nameAr: "تلفريك بابلو",
    locationAr: "محافظة دهوك",
    roleAr: "تاريخي | طبيعي",
    descriptionAr:
      "مجمع سياحي 11 كم شمال شرق دهوك. يضم نزلا ومطاعم وكراسي تلفريك.",
    distanceFromErbilAr: "~255 كم شمال غرب",
    bestTimeToVisitAr: "الربيع والصيف.",
    visitorExperienceAr: "ركوب كراسي التلفريك، مناظر بانورامية، تناول الطعام.",
    travelGuidanceAr: "11 كم شمال شرق دهوك.",
    accommodationAr: "مرافق نزل في الموقع. فنادق دهوك (11 كم).",
  },
  "amediya-amedi-town": {
    nameAr: "بلدة عمادية (آمدي)",
    locationAr: "محافظة دهوك",
    roleAr: "تاريخي",
    descriptionAr:
      "بلدة تاريخية على هضبة قمة جبل. بنيت قبل أكثر من ألف سنة. تضم مسجدا قديما والبوابة القديمة ومئذنة وقبة وبوابة زرادشت وأطلال مدرسة قوباهاني.",
    distanceFromErbilAr: "~210 كم شمال غرب",
    bestTimeToVisitAr: "الربيع والخريف.",
    visitorExperienceAr:
      "استكشاف البلدة الهضبية القديمة ومعالمها التاريخية وأطلال مدرسة القرن السابع عشر.",
    travelGuidanceAr: "عبر طريق أربيل-دهوك-عمادية. حوالي 3 ساعات.",
    accommodationAr: "بيوت ضيافة في عمادية. فنادق دهوك (~90 كم).",
  },
  "khinis-rock-carvings": {
    nameAr: "نقوش خيناس الصخرية",
    locationAr: "محافظة دهوك",
    roleAr: "تاريخي",
    descriptionAr:
      "52 كم شرق دهوك. المنتجع الصيفي للملك الآشوري سنحاريب (705-681 ق.م). ستة صخور منقوشة وتمثال ثور طائر وكتابات مسمارية.",
    distanceFromErbilAr: "~220 كم شمال غرب",
    bestTimeToVisitAr: "الربيع والخريف.",
    visitorExperienceAr:
      "مشاهدة النقوش الآشورية والكتابات المسمارية والكهف المعبدي الصغير.",
    travelGuidanceAr: "52 كم شرق دهوك. تتطلب سيارة خاصة.",
    accommodationAr: "فنادق دهوك (~52 كم).",
  },
  "anishki-cave": {
    nameAr: "كهف أنيشكي",
    locationAr: "قرب سرسنج، محافظة دهوك",
    roleAr: "تاريخي | طبيعي",
    descriptionAr:
      "9 كم شمال سرسنج. تتساقط المياه من سقفه خالقة نافورة طبيعية ومناخا منعشا جدا داخله.",
    distanceFromErbilAr: "~210 كم شمال غرب",
    bestTimeToVisitAr: "الصيف لمناخ الكهف المنعش. الربيع للخضرة.",
    visitorExperienceAr: "صعود درجات السلم الحجري وتجربة النافورة الطبيعية.",
    travelGuidanceAr: "9 كم شمال سرسنج.",
    accommodationAr: "فنادق سرسنج (9 كم).",
  },
  "girbish-village": {
    nameAr: "قرية گربيش",
    locationAr: "قرب عقرة، محافظة دهوك",
    roleAr: "تاريخي | طبيعي",
    descriptionAr: "23 كم شمال عقرة. ستة آبار تتدفق تحت بستان أشجار الجوز.",
    distanceFromErbilAr: "~195 كم شمال شرق",
    bestTimeToVisitAr: "الربيع والصيف.",
    visitorExperienceAr: "زيارة الآبار الستة تحت أشجار الجوز، النزهة في البستان.",
    travelGuidanceAr: "23 كم شمال عقرة.",
    accommodationAr: "فنادق عقرة (23 كم).",
  },
  "zanta-valley": {
    nameAr: "وادي زنتا",
    locationAr: "قرب عقرة، محافظة دهوك",
    roleAr: "تاريخي | طبيعي",
    descriptionAr:
      "13 كم شرق عقرة. يشق نهر بريشو الوادي بين جبلي ساري سادا وساري سيدانوك. ينابيع وآبار متعددة.",
    distanceFromErbilAr: "~185 كم شمال شرق",
    bestTimeToVisitAr: "الربيع والصيف.",
    visitorExperienceAr: "المشي على ضفاف نهر بريشو وزيارة الينابيع والآبار.",
    travelGuidanceAr: "13 كم شرق عقرة.",
    accommodationAr: "فنادق عقرة (13 كم).",
  },
  selei: {
    nameAr: "سيليه",
    locationAr: "قرب عقرة، محافظة دهوك",
    roleAr: "تاريخي | طبيعي",
    descriptionAr: "8 كم شرق دينارتا، 32 كم من عقرة. شلال 50 مترا على بستان أشجار الصفصاف.",
    distanceFromErbilAr: "~200 كم شمال شرق",
    bestTimeToVisitAr: "الربيع والصيف.",
    visitorExperienceAr:
      "مشاهدة الشلال البالغ ارتفاعه 50 مترا والاسترخاء بين أشجار الصفصاف.",
    travelGuidanceAr: "8 كم شرق دينارتا، 32 كم من عقرة.",
    accommodationAr: "فنادق عقرة (~32 كم).",
  },
  "gundik-cave-sculptures": {
    nameAr: "منحوتات كهف گوندك",
    locationAr: "قرب عقرة، محافظة دهوك",
    roleAr: "تاريخي",
    descriptionAr:
      "20 كم شرق عقرة. منحوتات منقورة في الصخر تزين خارج الكهف وداخله.",
    distanceFromErbilAr: "~190 كم شمال شرق",
    bestTimeToVisitAr: "الربيع والخريف.",
    visitorExperienceAr: "مشاهدة المنحوتات الصخرية القديمة للحيوانات والبشر.",
    travelGuidanceAr: "20 كم شرق عقرة.",
    accommodationAr: "فنادق عقرة (20 كم).",
  },
  "sepay-bjail-waterfall-resort": {
    nameAr: "شلال ومنتجع سيباي بجيل",
    locationAr: "قرب عقرة، محافظة دهوك",
    roleAr: "تاريخي | طبيعي",
    descriptionAr:
      "في بلدة بجيل، 13 كم شمال غرب عقرة. الشلال يتشكل من عدة ينابيع جبلية. يضم كهفا اصطناعيا خلف الشلال.",
    distanceFromErbilAr: "~185 كم شمال شرق",
    bestTimeToVisitAr: "الربيع والصيف.",
    visitorExperienceAr: "مشاهدة الشلال واستكشاف الكهف الاصطناعي خلفه.",
    travelGuidanceAr: "13 كم شمال غرب عقرة، في بلدة بجيل.",
    accommodationAr: "فنادق عقرة (13 كم).",
  },
  "shrine-of-abdul-aziz-al-gaylani": {
    nameAr: "ضريح الشيخ عبد العزيز الگيلاني",
    locationAr: "قرب عقرة، محافظة دهوك",
    roleAr: "تاريخي | ديني",
    descriptionAr:
      "قائد الطريقة القادرية رافق صلاح الدين. ضريحه في واد مليء بالبساتين وكروم العنب غرب عقرة. يزوره حجاج من العراق وإيران وباكستان والهند وأفغانستان وتركيا.",
    distanceFromErbilAr: "~180 كم شمال شرق",
    bestTimeToVisitAr: "طوال العام. الأعياد الدينية لذروة الحج.",
    visitorExperienceAr: "الحج إلى الضريح الصوفي ووادي البساتين الجميل.",
    travelGuidanceAr: "غرب مدينة عقرة.",
    accommodationAr: "فنادق عقرة. فنادق دهوك (~100 كم).",
  },
  "dalal-bridge-zakho": {
    nameAr: "جسر دلال، زاخو",
    locationAr: "زاخو، محافظة دهوك",
    roleAr: "تاريخي",
    descriptionAr:
      "جسر قديم في زاخو على نهر الخابور. طوله 114 م، عرضه 4.7 م، ارتفاعه 16 م. بني بأحجار النهر الكبيرة.",
    distanceFromErbilAr: "~310 كم شمال غرب",
    bestTimeToVisitAr: "طوال العام.",
    visitorExperienceAr: "المشي عبر الجسر القديم وزيارة الينابيع المعدنية القريبة.",
    travelGuidanceAr: "في قلب مدينة زاخو. عبر طريق أربيل-دهوك-زاخو. حوالي 4 ساعات.",
    accommodationAr: "فنادق زاخو. فنادق دهوك (~80 كم).",
  },
  "sherwana-citadel": {
    nameAr: "قلعة شيروانة",
    locationAr: "كالر، گرميان",
    roleAr: "تاريخي",
    descriptionAr:
      "بناها محمود باشا الجاف في أواخر القرن التاسع عشر. تقع على تل صغير وتتألف من بدروم وطابقين وقاعة ثمانية الأضلاع ومتحف صغير.",
    distanceFromErbilAr: "~190 كم جنوب شرق",
    bestTimeToVisitAr: "الربيع والخريف.",
    visitorExperienceAr: "استكشاف القلعة والقاعة ثمانية الأضلاع والمتحف الصغير.",
    travelGuidanceAr: "عند المدخل الشمالي الشرقي لكالر. عبر طريق أربيل-كويسنجق-كالر.",
    accommodationAr: "فنادق كالر.",
  },
  "pasha-palace-mahmud-pasha-jaff": {
    nameAr: "قصر الباشا (محمود باشا الجاف)",
    locationAr: "قرية تازاداي، قرب كالر",
    roleAr: "تاريخي",
    descriptionAr:
      "9 كم شمال شرق كالر في قرية تازاداي. بناه محمود باشا الجاف عام 1895. قصر من طابقين مع مستودع وإسطبل.",
    distanceFromErbilAr: "~195 كم جنوب شرق",
    bestTimeToVisitAr: "الربيع والخريف.",
    visitorExperienceAr: "استكشاف القصر التاريخي من طابقين ومباني المستودع والإسطبل.",
    travelGuidanceAr: "9 كم شمال شرق كالر في قرية تازاداي.",
    accommodationAr: "فنادق كالر.",
  },
  "majeed-basha-palace": {
    nameAr: "قصر مجيد باشا",
    locationAr: "شرق قضاء كفري، گرميان",
    roleAr: "تاريخي",
    descriptionAr: "شرق قضاء كفري. بني في أواخر القرن التاسع عشر. طابقان وغرف وقاعة.",
    distanceFromErbilAr: "~160 كم جنوب شرق",
    bestTimeToVisitAr: "الربيع والخريف.",
    visitorExperienceAr: "استكشاف القصر من طابقين بغرفه وقاعته الأصلية.",
    travelGuidanceAr: "شرق قضاء كفري. عبر طريق أربيل-كويسنجق-كفري.",
    accommodationAr: "فنادق كفري.",
  },
  "bhairai-cave-zakho": {
    nameAr: "كهف بهيرا، زاخو",
    locationAr: "قرب زاخو، محافظة دهوك",
    roleAr: "تاريخي | طبيعي",
    descriptionAr:
      "45 كم شرق زاخو و5 كم من منتجع شارانش. كهف كبير يمكن دمج زيارته مع منتزهي قاسروك ودشتا تخي.",
    distanceFromErbilAr: "~315 كم شمال غرب",
    bestTimeToVisitAr: "الربيع والصيف.",
    visitorExperienceAr: "استكشاف الكهف وزيارة المنتزهات القريبة.",
    travelGuidanceAr: "45 كم شرق زاخو، 5 كم من شارانش.",
    accommodationAr: "فنادق منتجع شارانش (5 كم).",
  },
  "kirkuk-citadel": {
    nameAr: "قلعة كركوك",
    locationAr: "مدينة كركوك",
    roleAr: "تاريخي",
    descriptionAr:
      "أقدم جزء من كركوك. تقوم على تل 130 قدما وتضم جامعا بضريح النبي دانيال وقبتين وثلاث مآذن وأقواسا ومقبرة.",
    distanceFromErbilAr: "~83 كم جنوبا",
    bestTimeToVisitAr: "الربيع والخريف.",
    visitorExperienceAr:
      "زيارة ضريح النبي دانيال والجامع التاريخي، التل القديم بحضارته التي تمتد 5,000 سنة.",
    travelGuidanceAr: "في مدينة كركوك. عبر طريق أربيل-كركوك السريع. حوالي 1.5 ساعة.",
    accommodationAr: "مجموعة كاملة من فنادق كركوك.",
  },
};

HISTORICAL_PLACES.forEach((place) => {
  Object.assign(place, HISTORICAL_PLACE_AR_TRANSLATIONS[place.id]);
});
