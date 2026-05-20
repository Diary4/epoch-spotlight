import lalishImage from "@/assets/images/religions/r-1.webp";
import shrineImage from "@/assets/images/religions/r-2.webp";
import mosqueImage from "@/assets/images/religions/r-3.webp";
import churchImage from "@/assets/images/religions/c-1.webp";
import mountainImage from "@/assets/images/kurdistan-2.webp";
import villageImage from "@/assets/mainImages/land-4.webp";
import parkImage from "@/assets/mainImages/discoverkurdistan/card-1.webp";

export const RELIGIOUS_SITES = [
  {
    id: "lalish-temple-yazidi-holy-site",
    name: "Lalish Temple - Yazidi Holy Site",
    location: "Duhok Province",
    image: lalishImage,
    description:
      "The holiest site in the world for the Yazidi faith. Followers believe Noah's Ark docked here. Thousands of pilgrims visit annually to drink holy spring water. Open to all religions.",
    role: "Religious",
    distanceFromErbil: "~80 km west",
    bestTimeToVisit:
      "First Wednesday of April (Charshama Sor - Yazidi New Year). Also April-October.",
    visitorExperience:
      "Sacred temple complex with conical shrines, holy springs, deep spiritual atmosphere. Shoes must be removed at entry.",
    travelGuidance:
      "Via Erbil-Duhok road then north toward Ain Sifni. Approx. 1.5-2 hours.",
    accommodation:
      "Guesthouses in nearby villages. Full hotel range in Duhok city.",
  },
  {
    id: "hiran-village-sheikh-hira-cemetery",
    name: "Hiran Village & Sheikh Hira Cemetery",
    location: "Shaqlawa / Erbil Province",
    image: villageImage,
    description:
      "A verdant village 23 km from Shaqlawa, home to the Cemetery of Sheikh Hira, a Naqshabandi Sufi shrine visited by pilgrims. Dervishes and congregants practice their Sufi rituals during holy celebrations at the Hiran Hospice.",
    role: "Religious | Natural",
    distanceFromErbil: "~70 km",
    bestTimeToVisit: "Summer (Jun-Aug) as a cool retreat from the heat.",
    visitorExperience:
      "Visiting the Sheikh Hira cemetery, experiencing Sufi rituals during holy celebrations, buying local souvenirs and food.",
    travelGuidance:
      "Via Erbil-Shaqlawa road then south toward Hiran. Approx. 1-1.5 hours.",
    accommodation:
      "Hotels and resorts in Shaqlawa (23 km). All Erbil hotels (70 km).",
  },
  {
    id: "kani-maran-spring",
    name: "Kani Maran Spring",
    location: "West of Soran, Erbil Province",
    image: mountainImage,
    description:
      "Located west of Soran on the main Erbil-Soran highway. A permanent, freely flowing natural spring, a reliable and accessible natural feature along one of Kurdistan's most traveled tourism routes.",
    role: "Natural",
    distanceFromErbil: "~92 km",
    bestTimeToVisit: "Spring and summer.",
    visitorExperience:
      "Stopping to enjoy flowing spring water on road trips between Erbil and Soran. Picnicking.",
    travelGuidance:
      "On the Erbil-Soran highway. Approx. 1.5 hours from Erbil. Roadside access.",
    accommodation: "Hotels in Soran (~8 km from Kani Maran).",
  },
  {
    id: "koya-city-shrines-mosques",
    name: "Koya City Shrines & Mosques",
    location: "Between Erbil & Sulaymaniyah",
    image: mosqueImage,
    description:
      "Koya is rich in shrines (Kosar, Janarook, Hamamouk, Jely Kadan, Koumet Tal, Nazanin, and Marbina Qadisha), historic mosques that served as centres of science and art, and the Qshla Ottoman-era government headquarters.",
    role: "Religious | Historical",
    distanceFromErbil: "~80 km southeast",
    bestTimeToVisit: "Spring and autumn.",
    visitorExperience:
      "Shrine pilgrimage, historic mosque visits, Qshla building exploration, mountain scenery.",
    travelGuidance: "Via Erbil-Koya highway. Approx. 1.5 hours. Paved road.",
    accommodation: "Local hotels and guesthouses in Koya.",
  },
  {
    id: "great-mosque-of-sulaymaniyah",
    name: "Great Mosque of Sulaymaniyah",
    location: "Sulaymaniyah City",
    image: mosqueImage,
    description:
      "Built by Kurdish prince Ibrahim Pasha Baban in 1785. One of the oldest and most significant mosques in Kurdistan. Contains three small cemeteries and the shrines of Haji Kaka Ahmed and his grandson, King Mahmood.",
    role: "Religious | Historical",
    distanceFromErbil: "~185 km southeast",
    bestTimeToVisit: "Year-round. Friday prayer for atmosphere.",
    visitorExperience:
      "Visiting the 18th-century mosque, paying respects at the shrines of Haji Kaka Ahmed and King Mahmood.",
    travelGuidance:
      "Central Sulaymaniyah city. Accessible by taxi from all city hotels.",
    accommodation: "Full range of Sulaymaniyah city hotels.",
  },
  {
    id: "zaiwei-village-shrines",
    name: "Zaiwei Village & Shrines",
    location: "Near Sulaymaniyah City",
    image: villageImage,
    description:
      "Located close to Peramagroon Mountain, 34 km west of Sulaymaniyah. Home to the shrines of the Islamic scholar Peera Magroon and the celebrated linguist Tawfiq Wahbi, as well as playgrounds and covered recreational areas.",
    role: "Religious | Historical",
    distanceFromErbil: "~210 km southeast",
    bestTimeToVisit: "Spring and autumn.",
    visitorExperience:
      "Visiting the shrines of Peera Magroon and Tawfiq Wahbi, combining cultural and spiritual heritage with scenic mountain surroundings.",
    travelGuidance:
      "34 km west of Sulaymaniyah via Sulaymaniyah-Peramagroon road. Private car required.",
    accommodation: "Hotels in Sulaymaniyah.",
  },
  {
    id: "sheikh-balk-shrine",
    name: "Sheikh Balk Shrine",
    location: "Haji Omran Area, Erbil Province",
    image: shrineImage,
    description:
      "A 17th-century shrine of a sheikh known for his faith and for introducing the Al Sehrudia doctrine to Islam. Thousands of followers regularly visit the shrine.",
    role: "Religious",
    distanceFromErbil: "~200 km northeast",
    bestTimeToVisit: "Year-round. Religious holidays for peak pilgrimage.",
    visitorExperience:
      "Sufi shrine pilgrimage, learning about the Al Sehrudia doctrine, high mountain setting near Haji Omran.",
    travelGuidance:
      "In the Haji Omran area. Via Erbil-Soran-Choman-Haji Omran. Approx. 3.5 hours.",
    accommodation: "Guesthouses in Haji Omran.",
  },
  {
    id: "lonesome-boya-temple",
    name: "Lonesome Boya Temple",
    location: "Safeen Mountain, Erbil Province",
    image: shrineImage,
    description:
      "On the main road between Shaqlawa and Hiran, alongside Safeen Mountain, 46 km from Erbil. A cave shrine with two large rooms. Known to Muslims as Wusu Rahman and to Christians as Raban Buya. Sacred to both communities, Christian pilgrims visit every year after Easter.",
    role: "Religious",
    distanceFromErbil: "~46 km",
    bestTimeToVisit:
      "After Easter (for Christian pilgrims). Spring and autumn generally.",
    visitorExperience:
      "Cave shrine visit, experiencing a site sacred to both Muslim and Christian communities, mountain scenery.",
    travelGuidance:
      "On the Shaqlawa-Hiran main road, 46 km from Erbil. Paved road takes visitors most of the way.",
    accommodation: "Hotels in Shaqlawa (~15 km). Hotels in Erbil.",
  },
  {
    id: "byara-shrines",
    name: "Byara Shrines",
    location: "Halabja Province",
    image: shrineImage,
    description:
      "Byara is an old village about 98 km northeast of Sulaymaniyah, in the Hawraman district. Home to the shrine of Sheikh Ala'addin Naqshabandi. Thousands of pilgrims visit annually. The people of the area are famous for handmade crafts including knitted klash (Kurdish folkloric shoes) and hand-woven clothing.",
    role: "Religious",
    distanceFromErbil: "~230 km southeast",
    bestTimeToVisit:
      "Spring and summer. Religious holidays for peak pilgrimage.",
    visitorExperience:
      "Shrine pilgrimage, buying handmade klash shoes and hand-woven clothing, experiencing the Hawrami village atmosphere.",
    travelGuidance:
      "Via Sulaymaniyah-Halabja-Hawraman-Byara road. From Erbil approx. 3.5 hours.",
    accommodation: "Guesthouses in Byara. Hotels in Halabja (~50 km).",
  },
  {
    id: "shrine-of-sheikh-othman-naqshaband-taweila",
    name: "Shrine of Sheikh Othman Naqshaband, Taweila",
    location: "Halabja Province / Hawraman",
    image: shrineImage,
    description:
      "Taweila, just over 100 km from Sulaymaniyah, is a small town on the Iraq-Iran border known for its walnuts, pomegranates and distinctive Hawrami architecture. Home to the shrine of Sheikh Othman the Second, a leader of Naqshabandi Tariqa.",
    role: "Religious",
    distanceFromErbil: "~240 km southeast",
    bestTimeToVisit: "Spring and summer. Religious pilgrimage periods.",
    visitorExperience:
      "Shrine visit, exploring distinctive Hawrami-style architecture, tasting local walnuts and pomegranates.",
    travelGuidance:
      "Via Sulaymaniyah-Halabja-Hawraman-Taweila road. From Erbil approx. 3.5-4 hours.",
    accommodation: "Guesthouses in Taweila. Hotels in Halabja.",
  },
  {
    id: "khurmal-historic-mosque",
    name: "Khurmal & its Historic Mosque",
    location: "Halabja Province",
    image: mosqueImage,
    description:
      "A small historic town east of Sulaymaniyah. The town's mosque and minaret were built by Abdullah, grandson of the second caliph Alkhattab. There is also a mineral pond in Khurmal called Garaw, believed to have medicinal properties.",
    role: "Religious | Historical",
    distanceFromErbil: "~225 km southeast",
    bestTimeToVisit: "Year-round.",
    visitorExperience:
      "Visiting the historically significant mosque and minaret, bathing in or visiting the medicinal mineral pond Garaw.",
    travelGuidance:
      "East of Sulaymaniyah near the Iranian border. Via Sulaymaniyah-Halabja-Khurmal road. From Erbil approx. 3.5 hours.",
    accommodation: "Hotels in Sulaymaniyah (~50 km).",
  },
  {
    id: "syed-mahmoud-shrine-paweh-mahmoud",
    name: "Syed Mahmoud Shrine (Paweh Mahmoud)",
    location: "Near Khanaqin, Diyala Province",
    image: shrineImage,
    description:
      "Located west of Khanaqin, 10 km from the city center. A popular destination for pilgrims particularly during religious holidays. The shrine is surrounded by acres of orchards and palm trees.",
    role: "Religious",
    distanceFromErbil: "~200 km southeast",
    bestTimeToVisit: "Year-round. Religious holidays for peak pilgrimage.",
    visitorExperience:
      "Pilgrimage to the shrine, walking through surrounding orchards and palm trees.",
    travelGuidance:
      "West of Khanaqin, 10 km from city center. Via Erbil-Khanaqin road. Approx. 2.5 hours.",
    accommodation: "Hotels in Khanaqin. Hotels in Sulaymaniyah as base.",
  },
  {
    id: "khaniqin-church",
    name: "Khaniqin Church",
    location: "Khanaqin, Diyala Province",
    image: churchImage,
    description:
      "Located in the Pasha Guiri area of Khanaqin. Built in 1950 under Father Peter Joseph Shaya Alkarmalisi. Remains one of Khanaqin's most popular attractions.",
    role: "Religious",
    distanceFromErbil: "~200 km southeast",
    bestTimeToVisit: "Year-round.",
    visitorExperience:
      "Visiting the 1950 church, experiencing the Christian heritage of Khanaqin.",
    travelGuidance:
      "In the Pasha Guiri area of Khanaqin city. Via Erbil-Khanaqin road. Approx. 2.5 hours.",
    accommodation: "Hotels in Khanaqin.",
  },
  {
    id: "azadi-park-sulaymaniyah",
    name: "Azadi Park, Sulaymaniyah",
    location: "Sulaymaniyah City",
    image: parkImage,
    description:
      "The site of what is now Azadi Park was a military base during the Ba'ath regime. After the 1991 uprising it was transformed into a tourism destination with beautiful gardens, a restaurant, a small lake, sports areas and playgrounds. A symbol of Kurdish resilience.",
    role: "Natural | Historical",
    distanceFromErbil: "~185 km southeast",
    bestTimeToVisit: "Year-round. Spring and autumn for best conditions.",
    visitorExperience:
      "Walking in gardens, lake views, family picnics, sports facilities, relaxation in a space that was once a place of oppression.",
    travelGuidance:
      "Central Sulaymaniyah city. Accessible by taxi from all city hotels.",
    accommodation: "Full range of Sulaymaniyah city hotels.",
  },
  {
    id: "sulaymaniyah-park",
    name: "Sulaymaniyah Park",
    location: "Sulaymaniyah City",
    image: parkImage,
    description:
      "The oldest and most beautiful park in Sulaymaniyah, built in 1937. Located at the head of Salim Street. Contains statues of army officers, poets and local artists, alongside a playground. A historic green space central to Sulaymaniyah's cultural life for nearly a century.",
    role: "Natural | Historical",
    distanceFromErbil: "~185 km southeast",
    bestTimeToVisit: "Year-round.",
    visitorExperience:
      "Walking among historic statues of Kurdish cultural figures, family relaxation, children's playground, experiencing the heart of Sulaymaniyah's public life.",
    travelGuidance:
      "Head of Salim Street, central Sulaymaniyah, in front of the Sulaymaniyah Palace Hotel.",
    accommodation: "Full range of Sulaymaniyah city hotels.",
  },
];

const RELIGIOUS_SITE_AR_TRANSLATIONS = {
  "lalish-temple-yazidi-holy-site": {
    nameAr: "معبد اللش — الموقع المقدس للإيزيديين",
    locationAr: "محافظة دهوك",
    roleAr: "ديني",
    descriptionAr:
      "أقدس موقع في العالم للديانة الإيزيدية. يؤمن أتباعها أن سفينة نوح رست هنا. يزوره آلاف الحجاج سنويا. مفتوح لجميع الأديان.",
    distanceFromErbilAr: "~80 كم غربا",
    bestTimeToVisitAr:
      "أول أربعاء من أبريل (چارشمه سور — رأس السنة الإيزيدية). أبريل-أكتوبر.",
    visitorExperienceAr:
      "مجمع المعبد المقدس بأضرحة مخروطية وينابيع مقدسة وأجواء روحانية. يخلع الحذاء عند الدخول.",
    travelGuidanceAr:
      "عبر طريق أربيل-دهوك ثم شمالا نحو عين سفني. حوالي 1.5-2 ساعة.",
    accommodationAr:
      "بيوت ضيافة في القرى المجاورة. مجموعة كاملة من فنادق دهوك.",
  },
  "hiran-village-sheikh-hira-cemetery": {
    nameAr: "قرية هيران ومقبرة الشيخ هيرا",
    locationAr: "شقلاوة / محافظة أربيل",
    roleAr: "ديني | طبيعي",
    descriptionAr:
      "قرية خضراء 23 كم من شقلاوة. تضم مقبرة الشيخ هيرا، ضريح صوفي نقشبندي. يمارس الدراويش طقوسهم الصوفية خلال الاحتفالات الدينية في تكية هيران.",
    distanceFromErbilAr: "~70 كم",
    bestTimeToVisitAr: "الصيف (يونيو-أغسطس).",
    visitorExperienceAr:
      "زيارة مقبرة الشيخ هيرا وتجربة الطقوس الصوفية والتسوق للتذكارات المحلية.",
    travelGuidanceAr:
      "عبر طريق أربيل-شقلاوة ثم جنوبا نحو هيران. حوالي 1-1.5 ساعة.",
    accommodationAr: "فنادق ومنتجعات شقلاوة (23 كم).",
  },
  "kani-maran-spring": {
    nameAr: "ينبوع كاني ماران",
    locationAr: "غرب سوران، محافظة أربيل",
    roleAr: "طبيعي",
    descriptionAr:
      "غرب سوران على الطريق الرئيسي أربيل-سوران. ينبوع طبيعي متدفق باستمرار.",
    distanceFromErbilAr: "~92 كم",
    bestTimeToVisitAr: "الربيع والصيف.",
    visitorExperienceAr:
      "التوقف للاستمتاع بمياه الينبوع خلال رحلات أربيل-سوران.",
    travelGuidanceAr: "على طريق أربيل-سوران. حوالي 1.5 ساعة.",
    accommodationAr: "فنادق سوران (~8 كم).",
  },
  "koya-city-shrines-mosques": {
    nameAr: "مزارات ومساجد كويسنجق",
    locationAr: "بين أربيل والسليمانية",
    roleAr: "ديني | تاريخي",
    descriptionAr:
      "مزارات متعددة ومساجد تاريخية كانت مراكز للعلم والفن ومقر الحكومة العثمانية (القشلة).",
    distanceFromErbilAr: "~80 كم جنوب شرق",
    bestTimeToVisitAr: "الربيع والخريف.",
    visitorExperienceAr:
      "الحج إلى المزارات وزيارة المساجد التاريخية واستكشاف مبنى القشلة.",
    travelGuidanceAr: "عبر طريق أربيل-كويسنجق. حوالي 1.5 ساعة.",
    accommodationAr: "فنادق وبيوت ضيافة في كويسنجق.",
  },
  "great-mosque-of-sulaymaniyah": {
    nameAr: "الجامع الكبير في السليمانية",
    locationAr: "مدينة السليمانية",
    roleAr: "ديني | تاريخي",
    descriptionAr:
      "بناه الأمير إبراهيم باشا بابان عام 1785. من أقدم المساجد وأكثرها أهمية في كردستان. يضم أضرحة الحاج كاكا أحمد والملك محمود.",
    distanceFromErbilAr: "~185 كم جنوب شرق",
    bestTimeToVisitAr: "طوال العام. صلاة الجمعة للأجواء التراثية.",
    visitorExperienceAr:
      "زيارة المسجد من القرن الثامن عشر والتبرك عند الأضرحة.",
    travelGuidanceAr: "وسط مدينة السليمانية.",
    accommodationAr: "مجموعة كاملة من فنادق السليمانية.",
  },
  "zaiwei-village-shrines": {
    nameAr: "قرية زيوي والأضرحة",
    locationAr: "قرب مدينة السليمانية",
    roleAr: "ديني | تاريخي",
    descriptionAr:
      "34 كم غرب السليمانية. تضم أضرحة العالم الإسلامي پيرا ماغرون واللغوي الشهير توفيق وهبي.",
    distanceFromErbilAr: "~210 كم جنوب شرق",
    bestTimeToVisitAr: "الربيع والخريف.",
    visitorExperienceAr: "زيارة الأضرحة والجمع بين الإرث الثقافي والروحي.",
    travelGuidanceAr: "34 كم غرب السليمانية. تتطلب سيارة خاصة.",
    accommodationAr: "فنادق السليمانية.",
  },
  "sheikh-balk-shrine": {
    nameAr: "الشيخ بالك",
    locationAr: "منطقة حاج عمران، محافظة أربيل",
    roleAr: "ديني",
    descriptionAr:
      "ضريح من القرن السابع عشر لشيخ اشتهر بإيمانه وتقديمه الطريقة السهروردية في الإسلام.",
    distanceFromErbilAr: "~200 كم شمال شرق",
    bestTimeToVisitAr: "طوال العام. الأعياد الدينية لذروة الحج.",
    visitorExperienceAr:
      "الحج إلى الضريح الصوفي والتعرف على الطريقة السهروردية.",
    travelGuidanceAr:
      "في منطقة حاج عمران. عبر أربيل-سوران-شومان-حاج عمران.",
    accommodationAr: "بيوت ضيافة في حاج عمران.",
  },
  "lonesome-boya-temple": {
    nameAr: "معبد الرهبان المنعزل (لونسوم بويا)",
    locationAr: "جبل صفين، محافظة أربيل",
    roleAr: "ديني",
    descriptionAr:
      "على الطريق بين شقلاوة وهيران، 46 كم من أربيل. ضريح كهفي مقدس لدى المسلمين والمسيحيين. يزوره المسيحيون بعد عيد الفصح سنويا.",
    distanceFromErbilAr: "~46 كم",
    bestTimeToVisitAr: "بعد عيد الفصح (للحجاج المسيحيين). الربيع والخريف.",
    visitorExperienceAr: "زيارة الضريح الكهفي المقدس لدى الديانتين.",
    travelGuidanceAr: "على طريق شقلاوة-هيران، 46 كم من أربيل.",
    accommodationAr: "فنادق شقلاوة (~15 كم).",
  },
  "byara-shrines": {
    nameAr: "أضرحة بيارة",
    locationAr: "محافظة حلبجة",
    roleAr: "ديني",
    descriptionAr:
      "قرية قديمة 98 كم شمال شرق السليمانية في قضاء هورامان. تضم ضريح الشيخ علاء الدين النقشبندي. يزوره آلاف الحجاج. يشتهر أبناؤها بالكلاش والملابس المنسوجة.",
    distanceFromErbilAr: "~230 كم جنوب شرق",
    bestTimeToVisitAr: "الربيع والصيف. الأعياد الدينية.",
    visitorExperienceAr: "الحج إلى الضريح وشراء الكلاش المصنوع يدويا.",
    travelGuidanceAr:
      "عبر طريق أربيل-السليمانية-حلبجة-هورامان-بيارة.",
    accommodationAr: "بيوت ضيافة في بيارة. فنادق حلبجة (~50 كم).",
  },
  "shrine-of-sheikh-othman-naqshaband-taweila": {
    nameAr: "ضريح الشيخ عثمان النقشبندي، تاويلا",
    locationAr: "محافظة حلبجة / هورامان",
    roleAr: "ديني",
    descriptionAr:
      "بلدة تاويلا على الحدود العراقية-الإيرانية. تضم ضريح الشيخ عثمان الثاني، قائد الطريقة النقشبندية.",
    distanceFromErbilAr: "~240 كم جنوب شرق",
    bestTimeToVisitAr: "الربيع والصيف. مواسم الحج.",
    visitorExperienceAr: "زيارة الضريح واستكشاف الطراز الهوراماني المميز.",
    travelGuidanceAr:
      "عبر طريق أربيل-السليمانية-حلبجة-هورامان-تاويلا.",
    accommodationAr: "بيوت ضيافة في تاويلا.",
  },
  "khurmal-historic-mosque": {
    nameAr: "خورمال وجامعها التاريخي",
    locationAr: "محافظة حلبجة",
    roleAr: "ديني | تاريخي",
    descriptionAr:
      "بلدة شرق السليمانية. الجامع والمئذنة بنيا على يد عبدالله حفيد الخليفة الثاني عمر بن الخطاب. بركة معدنية (غاراو) يعتقد لها خصائص علاجية.",
    distanceFromErbilAr: "~225 كم جنوب شرق",
    bestTimeToVisitAr: "طوال العام.",
    visitorExperienceAr: "زيارة الجامع التاريخي والبركة المعدنية غاراو.",
    travelGuidanceAr: "عبر طريق السليمانية-حلبجة-خورمال.",
    accommodationAr: "فنادق السليمانية (~50 كم).",
  },
  "syed-mahmoud-shrine-paweh-mahmoud": {
    nameAr: "مقام السيد محمود (پاوه محمود)",
    locationAr: "قرب خانقين، محافظة ديالى",
    roleAr: "ديني",
    descriptionAr:
      "10 كم غرب خانقين. وجهة شعبية لدى الحجاج. يحيط بالمقام مئات الدونمات من البساتين وأشجار النخيل.",
    distanceFromErbilAr: "~200 كم جنوب شرق",
    bestTimeToVisitAr: "طوال العام. الأعياد الدينية.",
    visitorExperienceAr: "الحج إلى المقام والمشي بين البساتين وأشجار النخيل.",
    travelGuidanceAr:
      "10 كم غرب خانقين. عبر طريق أربيل-خانقين. حوالي 2.5 ساعة.",
    accommodationAr: "فنادق خانقين.",
  },
};

RELIGIOUS_SITES.forEach((place) => {
  Object.assign(place, RELIGIOUS_SITE_AR_TRANSLATIONS[place.id]);
});
