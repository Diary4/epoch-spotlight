export type BcfLang = "en" | "ku" | "ar";

export type BcfStep =
  | "language"
  | "intro"
  | "welcome"
  | "hub"
  | "map"
  | "projects"
  | "projectDetail"
  | "impact"
  | "future"
  | "futureDetail";

export type LocationId = "erbil" | "duhok" | "zakho" | "kirkuk" | "sulaymaniyah";
export type ProjectId = "school-renovation" | "camp-support" | "emergency-aid";
export type FutureTopicId = "leadership" | "quality" | "partnerships" | "recognition";
export type MapFilterId = "offices" | "camps" | "geographic" | "emergency";

export type BcfLocation = {
  id: LocationId;
  x: string;
  y: string;
  filters: MapFilterId[];
};

export const BCF_LOCATIONS: BcfLocation[] = [
  { id: "erbil", x: "58%", y: "48%", filters: ["offices", "geographic", "emergency"] },
  { id: "duhok", x: "42%", y: "28%", filters: ["offices", "camps", "geographic"] },
  { id: "zakho", x: "34%", y: "18%", filters: ["camps", "emergency"] },
  { id: "kirkuk", x: "72%", y: "58%", filters: ["offices", "geographic"] },
  { id: "sulaymaniyah", x: "78%", y: "42%", filters: ["offices", "camps", "geographic"] },
];

type LocCopy = {
  name: string;
  description: string;
  projectsLabel: string;
  peopleLabel: string;
  projectsStat: string;
  peopleStat: string;
  explore: string;
};

type ProjectCopy = {
  id: ProjectId;
  title: string;
  summary: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
};

type ImpactItem = {
  value: string;
  label: string;
};

type FutureTopic = {
  id: FutureTopicId;
  title: string;
  body: string;
};

export type BcfCopy = {
  languageTitle: string;
  languages: { id: BcfLang; label: string }[];
  touchToContinue: string;
  humanity: string;
  dignity: string;
  hope: string;
  quote: string;
  quoteAttr: string;
  welcomeEyebrow: string;
  welcomeTitleBcf: string;
  welcomeTitleRest: string;
  welcomeBody: string;
  startJourney: string;
  hubTitle: string;
  hubSubtitle: string;
  hubCards: { id: "map" | "impact" | "future"; title: string; subtitle: string }[];
  whereWeWork: string;
  across: string;
  borders: string;
  filters: Record<MapFilterId, string>;
  tapToExplore: string;
  locations: Record<LocationId, LocCopy>;
  projectsIn: string;
  back: string;
  close: string;
  ourImpact: string;
  changing: string;
  livesEveryday: string;
  impactItems: ImpactItem[];
  trustTitle: string;
  futureCircle: string;
  legacyCircle: string;
  futureHeadingWhite: string;
  futureHeadingGold: string;
  futureHeadingRest: string;
  futureTopics: FutureTopic[];
  projects: Record<LocationId, ProjectCopy[]>;
};

const projectsEn: Record<LocationId, ProjectCopy[]> = {
  erbil: [
    {
      id: "school-renovation",
      title: "School Renovation Program",
      summary: "Providing safe and effective learning environments for thousands of students.",
      stat1Value: "45",
      stat1Label: "Schools Renovated",
      stat2Value: "+12,500",
      stat2Label: "Students Benefited",
    },
    {
      id: "camp-support",
      title: "Community Support Centers",
      summary: "Daily services for families rebuilding their lives with dignity.",
      stat1Value: "18",
      stat1Label: "Centers Active",
      stat2Value: "62K",
      stat2Label: "People Served",
    },
    {
      id: "emergency-aid",
      title: "Emergency Relief Response",
      summary: "Rapid aid for vulnerable households during crises and displacement.",
      stat1Value: "90",
      stat1Label: "Response Days",
      stat2Value: "34K",
      stat2Label: "Families Reached",
    },
  ],
  duhok: [
    {
      id: "camp-support",
      title: "Camp Livelihoods Program",
      summary: "Skills, food security, and protection for people living in camps.",
      stat1Value: "12",
      stat1Label: "Camp Sites",
      stat2Value: "48K",
      stat2Label: "People Supported",
    },
    {
      id: "school-renovation",
      title: "Learning Spaces Initiative",
      summary: "Renovating classrooms and supplying educational materials.",
      stat1Value: "22",
      stat1Label: "Schools Supported",
      stat2Value: "+6,800",
      stat2Label: "Students Benefited",
    },
    {
      id: "emergency-aid",
      title: "Winterization Kits",
      summary: "Warmth and shelter support before and during harsh winters.",
      stat1Value: "15K",
      stat1Label: "Kits Delivered",
      stat2Value: "9K",
      stat2Label: "Households Helped",
    },
  ],
  zakho: [
    {
      id: "emergency-aid",
      title: "Border Emergency Hub",
      summary: "Immediate assistance for arrivals and families in transit.",
      stat1Value: "24/7",
      stat1Label: "Response Ready",
      stat2Value: "21K",
      stat2Label: "People Assisted",
    },
    {
      id: "camp-support",
      title: "Shelter & Water Access",
      summary: "Safe water points and improved shelter conditions.",
      stat1Value: "8",
      stat1Label: "Sites Upgraded",
      stat2Value: "11K",
      stat2Label: "Residents Reached",
    },
    {
      id: "school-renovation",
      title: "Child Learning Corners",
      summary: "Safe spaces for children to learn and play.",
      stat1Value: "6",
      stat1Label: "Learning Corners",
      stat2Value: "+1,200",
      stat2Label: "Children Benefited",
    },
  ],
  kirkuk: [
    {
      id: "school-renovation",
      title: "Inclusive Education Support",
      summary: "Strengthening schools serving diverse communities.",
      stat1Value: "14",
      stat1Label: "Schools Supported",
      stat2Value: "+4,100",
      stat2Label: "Students Benefited",
    },
    {
      id: "camp-support",
      title: "Family Assistance Desk",
      summary: "Casework and referrals for vulnerable households.",
      stat1Value: "5",
      stat1Label: "Service Desks",
      stat2Value: "8.5K",
      stat2Label: "Cases Assisted",
    },
    {
      id: "emergency-aid",
      title: "Rapid Needs Response",
      summary: "Food and non-food items for sudden displacement.",
      stat1Value: "120",
      stat1Label: "Distributions",
      stat2Value: "16K",
      stat2Label: "People Helped",
    },
  ],
  sulaymaniyah: [
    {
      id: "school-renovation",
      title: "School Infrastructure Drive",
      summary: "Modernizing facilities for safer learning.",
      stat1Value: "19",
      stat1Label: "Schools Renovated",
      stat2Value: "+5,600",
      stat2Label: "Students Benefited",
    },
    {
      id: "camp-support",
      title: "Youth Opportunity Labs",
      summary: "Training and mentorship for young people.",
      stat1Value: "9",
      stat1Label: "Lab Sites",
      stat2Value: "3.2K",
      stat2Label: "Youth Trained",
    },
    {
      id: "emergency-aid",
      title: "Community Relief Network",
      summary: "Coordinated local partners for emergency delivery.",
      stat1Value: "28",
      stat1Label: "Partner Orgs",
      stat2Value: "19K",
      stat2Label: "People Reached",
    },
  ],
};

export const bcfCopy: Record<BcfLang, BcfCopy> = {
  en: {
    languageTitle: "Choose your language",
    languages: [
      { id: "ku", label: "کوردی" },
      { id: "en", label: "English" },
      { id: "ar", label: "عربي" },
    ],
    touchToContinue: "Touch to continue",
    humanity: "HUMANITY.",
    dignity: "DIGNITY.",
    hope: "HOPE.",
    quote: "It is an honor to serve one's own people.",
    quoteAttr: "— Mustafa Barzani",
    welcomeEyebrow: "WELCOME TO THE",
    welcomeTitleBcf: "BCF",
    welcomeTitleRest: "EXPERIENCE",
    welcomeBody:
      "Discover our story, our humanitarian work, and the impact we create together.",
    startJourney: "Start the Journey",
    hubTitle: "Our Story",
    hubSubtitle: "Explore where we work, the lives we change, and the future we build.",
    hubCards: [
      { id: "map", title: "Where We Work", subtitle: "Across borders and communities" },
      { id: "impact", title: "Our Impact", subtitle: "Changing lives every day" },
      { id: "future", title: "Trust & Future", subtitle: "A legacy that continues" },
    ],
    whereWeWork: "Where We Work",
    across: "Across",
    borders: "Borders",
    filters: {
      offices: "Offices",
      camps: "Camps",
      geographic: "Geographic",
      emergency: "Emergency",
    },
    tapToExplore: "Tap to explore",
    locations: {
      erbil: {
        name: "Erbil",
        description: "Supporting education and community programs for a better tomorrow.",
        projectsLabel: "Projects",
        peopleLabel: "People Helped",
        projectsStat: "+120",
        peopleStat: "250K",
        explore: "Explore Projects",
      },
      duhok: {
        name: "Duhok",
        description: "Camp services, livelihoods, and protection for displaced families.",
        projectsLabel: "Projects",
        peopleLabel: "People Helped",
        projectsStat: "+86",
        peopleStat: "180K",
        explore: "Explore Projects",
      },
      zakho: {
        name: "Zakho",
        description: "Emergency hubs supporting arrivals and border communities.",
        projectsLabel: "Projects",
        peopleLabel: "People Helped",
        projectsStat: "+42",
        peopleStat: "95K",
        explore: "Explore Projects",
      },
      kirkuk: {
        name: "Kirkuk",
        description: "Inclusive programs for education, families, and rapid relief.",
        projectsLabel: "Projects",
        peopleLabel: "People Helped",
        projectsStat: "+55",
        peopleStat: "110K",
        explore: "Explore Projects",
      },
      sulaymaniyah: {
        name: "Sulaymaniyah",
        description: "Youth opportunity, school upgrades, and community partnerships.",
        projectsLabel: "Projects",
        peopleLabel: "People Helped",
        projectsStat: "+70",
        peopleStat: "140K",
        explore: "Explore Projects",
      },
    },
    projectsIn: "Projects in",
    back: "Back",
    close: "Close",
    ourImpact: "Our Impact",
    changing: "Changing lives",
    livesEveryday: "everyday",
    impactItems: [
      { value: "1,004", label: "Employees — people coordinating humanitarian action every day." },
      { value: "91,281", label: "People in Camps — individuals supported through organizational services." },
      { value: "75,548", label: "IDPs and Refugees — people assisted across communities." },
      { value: "20", label: "Schools Renovated — learning environments improved for children." },
    ],
    trustTitle: "Trust & the Future",
    futureCircle: "01 The Future We Build",
    legacyCircle: "02 A Legacy That Continues",
    futureHeadingWhite: "The",
    futureHeadingGold: "Future",
    futureHeadingRest: "We Build",
    futureTopics: [
      {
        id: "leadership",
        title: "Leadership and Governance",
        body: "Accountable leadership guiding humanitarian work with clarity and care.",
      },
      {
        id: "quality",
        title: "Quality and Credibility",
        body: "Standards that protect dignity and deliver trusted results.",
      },
      {
        id: "partnerships",
        title: "Partnerships",
        body: "Working with communities and institutions to multiply impact.",
      },
      {
        id: "recognition",
        title: "Recognition",
        body: "A record of service recognized across Kurdistan and beyond.",
      },
    ],
    projects: projectsEn,
  },
  ku: {
    languageTitle: "زمانەکەت هەڵبژێرە",
    languages: [
      { id: "ku", label: "کوردی" },
      { id: "en", label: "English" },
      { id: "ar", label: "عربي" },
    ],
    touchToContinue: "بۆ بەردەوامبوون دەستی لێبدە",
    humanity: "مرۆڤایەتی.",
    dignity: "کەرامەت.",
    hope: "هیوا.",
    quote: "شانازییە کە خزمەتی گەلی خۆت بکەیت.",
    quoteAttr: "— مستەفا بارزانی",
    welcomeEyebrow: "بەخێربێیت بۆ",
    welcomeTitleBcf: "BCF",
    welcomeTitleRest: "ئەزموون",
    welcomeBody: "چیرۆک، کاری مرۆیی، و کاریگەرییەکەمان پێکەوە ببینە.",
    startJourney: "دەستپێکردنی گەشت",
    hubTitle: "چیرۆکەکەمان",
    hubSubtitle: "شوێنی کار، ژیانە گۆڕاوەکان، و داهاتووی بنیادنان بگەڕێ.",
    hubCards: [
      { id: "map", title: "لە کوێ کار دەکەین", subtitle: "لە سنوور و کۆمەڵگەکاندا" },
      { id: "impact", title: "کاریگەرییەکەمان", subtitle: "هەموو ڕۆژێک ژیان دەگۆڕین" },
      { id: "future", title: "متمانە و داهاتوو", subtitle: "میراتێک کە بەردەوامە" },
    ],
    whereWeWork: "لە کوێ کار دەکەین",
    across: "لەسەر",
    borders: "سنوورەکان",
    filters: {
      offices: "ئۆفیسەکان",
      camps: "کەمپەکان",
      geographic: "جوگرافی",
      emergency: "فریاکەوتن",
    },
    tapToExplore: "بۆ گەڕان دەستی لێبدە",
    locations: {
      erbil: {
        name: "هەولێر",
        description: "پشتگیری پەروەردە و بەرنامەی کۆمەڵایەتی بۆ سبەینێیەکی باشتر.",
        projectsLabel: "پڕۆژە",
        peopleLabel: "کەسی یارمەتیدراو",
        projectsStat: "+١٢٠",
        peopleStat: "٢٥٠هەزار",
        explore: "پڕۆژەکان ببینە",
      },
      duhok: {
        name: "دهۆک",
        description: "خزمەتگوزاری کەمپ، بژێوی و پاراستن بۆ خێزانە ئاوارەکان.",
        projectsLabel: "پڕۆژە",
        peopleLabel: "کەسی یارمەتیدراو",
        projectsStat: "+٨٦",
        peopleStat: "١٨٠هەزار",
        explore: "پڕۆژەکان ببینە",
      },
      zakho: {
        name: "زاخۆ",
        description: "ناوەندی فریاکەوتن بۆ هاتووەکان و کۆمەڵگە سنوورییەکان.",
        projectsLabel: "پڕۆژە",
        peopleLabel: "کەسی یارمەتیدراو",
        projectsStat: "+٤٢",
        peopleStat: "٩٥هەزار",
        explore: "پڕۆژەکان ببینە",
      },
      kirkuk: {
        name: "کەرکوک",
        description: "بەرنامەی گشتگیر بۆ پەروەردە، خێزان و فریاکەوتنی خێرا.",
        projectsLabel: "پڕۆژە",
        peopleLabel: "کەسی یارمەتیدراو",
        projectsStat: "+٥٥",
        peopleStat: "١١٠هەزار",
        explore: "پڕۆژەکان ببینە",
      },
      sulaymaniyah: {
        name: "سلێمانی",
        description: "دەرفەتی گەنجان، نوێکردنەوەی قوتابخانە و هاوبەشی کۆمەڵایەتی.",
        projectsLabel: "پڕۆژە",
        peopleLabel: "کەسی یارمەتیدراو",
        projectsStat: "+٧٠",
        peopleStat: "١٤٠هەزار",
        explore: "پڕۆژەکان ببینە",
      },
    },
    projectsIn: "پڕۆژەکان لە",
    back: "گەڕانەوە",
    close: "داخستن",
    ourImpact: "کاریگەرییەکەمان",
    changing: "گۆڕینی ژیان",
    livesEveryday: "هەموو ڕۆژێک",
    impactItems: [
      { value: "١٬٠٠٤", label: "کارمەند — هەماهەنگی کاری مرۆیی هەموو ڕۆژێک." },
      { value: "٩١٬٢٨١", label: "کەس لە کەمپ — پشتگیریکراو لە ڕێگەی خزمەتگوزارییەکان." },
      { value: "٧٥٬٥٤٨", label: "ئاوارە و پەنابەر — یارمەتیدراو لە کۆمەڵگە جیاوازەکان." },
      { value: "٢٠", label: "قوتابخانەی نۆژەنکراو — ژینگەی فێربوون بۆ منداڵان." },
    ],
    trustTitle: "متمانە و داهاتوو",
    futureCircle: "٠١ داهاتووی بنیاد دەنێین",
    legacyCircle: "٠٢ میراتێک کە بەردەوامە",
    futureHeadingWhite: "ئەو",
    futureHeadingGold: "داهاتووە",
    futureHeadingRest: "کە بنیاد دەنێین",
    futureTopics: [
      {
        id: "leadership",
        title: "سەرکردایەتی و حوکمڕانی",
        body: "سەرکردایەتییەکی بەرپرسیار بۆ کاری مرۆیی بە ڕوونی و چاودێری.",
      },
      {
        id: "quality",
        title: "کوالیتی و باوەڕپێکراوی",
        body: "ستانداردەکان کە کەرامەت دەپارێزن و ئەنجامی باوەڕپێکراو دەدەن.",
      },
      {
        id: "partnerships",
        title: "هاوبەشییەکان",
        body: "کارکردن لەگەڵ کۆمەڵگە و دامەزراوەکان بۆ زیادکردنی کاریگەری.",
      },
      {
        id: "recognition",
        title: "ناسینەوە",
        body: "تۆماری خزمەت کە لە کوردستان و دەرەوەدا ناسراوە.",
      },
    ],
    projects: projectsEn,
  },
  ar: {
    languageTitle: "اختر لغتك",
    languages: [
      { id: "ku", label: "کوردی" },
      { id: "en", label: "English" },
      { id: "ar", label: "عربي" },
    ],
    touchToContinue: "المس للمتابعة",
    humanity: "الإنسانية.",
    dignity: "الكرامة.",
    hope: "الأمل.",
    quote: "إنه شرف أن تخدم شعبك.",
    quoteAttr: "— مصطفى البارزاني",
    welcomeEyebrow: "مرحباً بكم في",
    welcomeTitleBcf: "BCF",
    welcomeTitleRest: "التجربة",
    welcomeBody: "اكتشفوا قصتنا وعملنا الإنساني والأثر الذي نصنعه معاً.",
    startJourney: "ابدأ الرحلة",
    hubTitle: "قصتنا",
    hubSubtitle: "استكشفوا أماكن عملنا والحيوات التي نغيّرها والمستقبل الذي نبنيه.",
    hubCards: [
      { id: "map", title: "أين نعمل", subtitle: "عبر الحدود والمجتمعات" },
      { id: "impact", title: "أثرنا", subtitle: "نغيّر الحيوات كل يوم" },
      { id: "future", title: "الثقة والمستقبل", subtitle: "إرث يستمر" },
    ],
    whereWeWork: "أين نعمل",
    across: "عبر",
    borders: "الحدود",
    filters: {
      offices: "المكاتب",
      camps: "المخيمات",
      geographic: "الجغرافيا",
      emergency: "الطوارئ",
    },
    tapToExplore: "المس للاستكشاف",
    locations: {
      erbil: {
        name: "أربيل",
        description: "دعم التعليم وبرامج المجتمع من أجل غدٍ أفضل.",
        projectsLabel: "مشاريع",
        peopleLabel: "أشخاص تمت مساعدتهم",
        projectsStat: "+120",
        peopleStat: "250K",
        explore: "استكشف المشاريع",
      },
      duhok: {
        name: "دهوك",
        description: "خدمات المخيمات وسبل العيش والحماية للعائلات النازحة.",
        projectsLabel: "مشاريع",
        peopleLabel: "أشخاص تمت مساعدتهم",
        projectsStat: "+86",
        peopleStat: "180K",
        explore: "استكشف المشاريع",
      },
      zakho: {
        name: "زاخو",
        description: "مراكز طوارئ تدعم القادمين ومجتمعات الحدود.",
        projectsLabel: "مشاريع",
        peopleLabel: "أشخاص تمت مساعدتهم",
        projectsStat: "+42",
        peopleStat: "95K",
        explore: "استكشف المشاريع",
      },
      kirkuk: {
        name: "كركوك",
        description: "برامج شاملة للتعليم والعائلات والإغاثة السريعة.",
        projectsLabel: "مشاريع",
        peopleLabel: "أشخاص تمت مساعدتهم",
        projectsStat: "+55",
        peopleStat: "110K",
        explore: "استكشف المشاريع",
      },
      sulaymaniyah: {
        name: "السليمانية",
        description: "فرص الشباب وتحديث المدارس وشراكات المجتمع.",
        projectsLabel: "مشاريع",
        peopleLabel: "أشخاص تمت مساعدتهم",
        projectsStat: "+70",
        peopleStat: "140K",
        explore: "استكشف المشاريع",
      },
    },
    projectsIn: "المشاريع في",
    back: "العودة",
    close: "إغلاق",
    ourImpact: "أثرنا",
    changing: "نغيّر الحيوات",
    livesEveryday: "كل يوم",
    impactItems: [
      { value: "1,004", label: "موظفون — ينسّقون العمل الإنساني كل يوم." },
      { value: "91,281", label: "أشخاص في المخيمات — مدعومون عبر خدمات المنظمة." },
      { value: "75,548", label: "نازحون ولاجئون — تمت مساعدتهم في مجتمعات متعددة." },
      { value: "20", label: "مدارس مجدّدة — بيئات تعلم أفضل للأطفال." },
    ],
    trustTitle: "الثقة والمستقبل",
    futureCircle: "01 المستقبل الذي نبنيه",
    legacyCircle: "02 إرث يستمر",
    futureHeadingWhite: "المستقبل",
    futureHeadingGold: "الذي نبنيه",
    futureHeadingRest: "",
    futureTopics: [
      {
        id: "leadership",
        title: "القيادة والحوكمة",
        body: "قيادة مسؤولة توجّه العمل الإنساني بوضوح وعناية.",
      },
      {
        id: "quality",
        title: "الجودة والمصداقية",
        body: "معايير تحمي الكرامة وتقدّم نتائج موثوقة.",
      },
      {
        id: "partnerships",
        title: "الشراكات",
        body: "العمل مع المجتمعات والمؤسسات لمضاعفة الأثر.",
      },
      {
        id: "recognition",
        title: "الاعتراف",
        body: "سجل خدمة معترف به في كوردستان وخارجها.",
      },
    ],
    projects: projectsEn,
  },
};
