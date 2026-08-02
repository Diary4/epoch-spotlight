export type BcfLang = "en" | "ku" | "ar";

/**
 * Language is no longer a step: it is an overlay that can be raised from the
 * attract on the way in, or from the reach rail at any point after.
 */
export type BcfStep =
  | "attract"
  | "intro"
  | "welcome"
  | "sections"
  | "hub"
  | "humanity"
  | "map"
  | "projects"
  | "projectDetail"
  | "impact"
  | "trust"
  | "future"
  | "futureDetail";

export type JourneyChapterId =
  | "story"
  | "humanity"
  | "map"
  | "impact"
  | "trust"
  | "future";

export type LocationId = "erbil" | "duhok" | "zakho" | "kirkuk" | "sulaymaniyah";
export type ProjectId = "school-renovation" | "camp-support" | "emergency-aid";
export type TrustTopicId =
  | "leadership"
  | "quality"
  | "partnerships"
  | "recognition";
export type FutureTopicId =
  | "education"
  | "environment"
  | "crises"
  | "rehabilitation"
  | "rights";
export type MapFilterId = "offices" | "camps" | "geographic" | "emergency";

export type BcfLocation = {
  id: LocationId;
  x: string;
  y: string;
  filters: MapFilterId[];
};

/**
 * Pin positions, as a percentage of the map artboard in bcfMapGeometry — the
 * same projection the outlines are drawn with, so every city lands on its own
 * governorate. They were eyeballed onto a photograph before, which put Kirkuk
 * east of Sulaymaniyah and Zakho north-east of Duhok.
 */
export const BCF_LOCATIONS: BcfLocation[] = [
  { id: "erbil", x: "42.07%", y: "43.01%", filters: ["offices", "geographic", "emergency"] },
  { id: "duhok", x: "18.94%", y: "20.26%", filters: ["offices", "camps", "geographic"] },
  { id: "zakho", x: "11.68%", y: "10.94%", filters: ["camps", "emergency"] },
  { id: "kirkuk", x: "50.84%", y: "67.36%", filters: ["offices", "geographic"] },
  { id: "sulaymaniyah", x: "74.67%", y: "64.41%", filters: ["offices", "camps", "geographic"] },
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
  title: string;
  description: string;
};

export type ServeCategoryId = "relief" | "health" | "education" | "environment" | "community";

export type ServeCategory = {
  id: ServeCategoryId;
  title: string;
  tags?: string[];
};

type FutureTopic = {
  id: FutureTopicId;
  title: string;
  bullets: string[];
};

export type TrustTopic = {
  id: TrustTopicId;
  title: string;
};

export type TrustFounderCard = {
  title: string;
  subtitle: string;
};

export type TrustCredential = {
  id: string;
  title: string;
  body: string;
};

export type RecognitionItemId =
  | "awards"
  | "certifications"
  | "parliament"
  | "letters"
  | "timeline";

/**
 * The five proofs on the Recognition constellation, top to bottom. `detail`
 * carries the awards and certifications named in the BCF roadmap (Page 25), so
 * a node is a heading a visitor can open rather than an unsupported claim.
 */
export type RecognitionItem = {
  id: RecognitionItemId;
  title: string;
  detail: string;
};

/**
 * Closing pillars. Each reads as one sentence broken over two lines, the second
 * half in gold — the split is editorial, so it lives in the copy, not the view.
 */
export type LegacyPillar = {
  id: "service" | "humanity" | "hope";
  titleWhite: string;
  titleGold: string;
};

export type StorySectionId = "foundation" | "mission" | "vision" | "philosophy" | "values";

export type StorySection = {
  id: StorySectionId;
  titleGold: string;
  titleWhite: string;
  body?: string;
  values?: string[];
};

export type BcfCopy = {
  languageTitle: string;
  languages: { id: BcfLang; label: string }[];
  touchToContinue: string;
  /** Opening attract: shown in all three languages at once, before a language is chosen. */
  attractStart: string;
  attractTagline: string;
  attractEyebrow: string;
  attractCaption: string;
  enterHint: string;
  /** Persistent reach-rail controls, present on every scene after the attract. */
  home: string;
  language: string;
  chooseLanguageHint: string;
  /** Idle warning shown before the kiosk returns itself to the attract screen. */
  idleTitle: string;
  idleBody: string;
  idleContinue: string;
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
  journeyTitleLead: string;
  journeyTitleGold: string;
  journeySubtitle: string;
  journeyChapters: { id: JourneyChapterId; title: string }[];
  whoWeServeWhite: string;
  whoWeServeGold: string;
  serveCategories: ServeCategory[];
  storyTimelineStart: string;
  storyTimelineEnd: string;
  storyScrollHint: string;
  storySections: StorySection[];
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
  impactTitleLead: string;
  impactTitleGold: string;
  impactSubtitle: string;
  impactHumanStoryLead: string;
  impactHumanStoryRest: string;
  impactHumanStoryHint: string;
  changing: string;
  livesEveryday: string;
  impactItems: ImpactItem[];
  trustTitle: string;
  trustTitleGold: string;
  trustTitleRest: string;
  trustTopics: TrustTopic[];
  trustLeadershipTitle: string;
  trustFounders: TrustFounderCard[];
  trustQualityTitle: string;
  trustCredentials: TrustCredential[];
  trustPartnershipsTitle: string;
  trustPartnershipsHint: string;
  trustRecognitionTitle: string;
  trustRecognitionBody: string;
  trustRecognitionItems: RecognitionItem[];
  futureCircle: string;
  legacyCircle: string;
  legacyTitleWhite: string;
  legacyTitleGold: string;
  legacyLead: string;
  legacyBridge: string;
  legacyPillars: LegacyPillar[];
  legacyThanks: string;
  legacyThanksBody: string;
  legacyRestart: string;
  futureHeadingWhite: string;
  futureHeadingGold: string;
  futureHeadingRest: string;
  futureSubtitle: string;
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
    attractStart: "Touch to Start",
    attractTagline: "Barzani Charity Foundation",
    attractEyebrow: "BARZANI CHARITY FOUNDATION",
    attractCaption: "Thirty years of standing beside the people of Kurdistan.",
    enterHint: "TOUCH ANYWHERE",
    home: "Home",
    language: "Language",
    chooseLanguageHint: "You can change this at any time from the side controls.",
    idleTitle: "Still with us?",
    idleBody: "The experience returns to the start so the next visitor begins fresh.",
    idleContinue: "I'm still here",
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
    journeyTitleLead: "Explore",
    journeyTitleGold: "Our Journey",
    journeySubtitle: "6 Chapters . One Mission",
    journeyChapters: [
      { id: "humanity", title: "Humanity in Action" },
      { id: "story", title: "Our Story" },
      { id: "map", title: "Where we Work" },
      { id: "impact", title: "Our Impact" },
      { id: "trust", title: "Trust Behind the Work" },
      { id: "future", title: "Future & Legacy" },
    ],
    whoWeServeWhite: "Who",
    whoWeServeGold: "We Serve",
    serveCategories: [
      { id: "relief", title: "Relief" },
      { id: "health", title: "Health" },
      {
        id: "education",
        title: "Education",
        tags: ["Livelihood & Economic Empowerment", "Education & Human Development"],
      },
      { id: "environment", title: "Environment", tags: ["Environment and Climate Change"] },
      { id: "community", title: "Community" },
    ],
    storyTimelineStart: "2005",
    storyTimelineEnd: "Today",
    storyScrollHint: "Scroll Down",
    storySections: [
      {
        id: "foundation",
        titleGold: "The Foundation",
        titleWhite: "Story",
        body: "BCF was officially established in Erbil in 2005 to transform compassion into organized humanitarian action.",
      },
      {
        id: "mission",
        titleGold: "Mission",
        titleWhite: "",
        body: "Provide humanitarian support to vulnerable people without discrimination while promoting peace, dignity and sustainability.",
      },
      {
        id: "vision",
        titleGold: "Vision",
        titleWhite: "",
        body: "A world where poverty and forced migration are eliminated and every person can access rights, education and essential services",
      },
      {
        id: "philosophy",
        titleGold: "Humanitarian",
        titleWhite: "Philosophy",
        body: "Service is an honor — not charity from above. People are served as human beings, never treated as statistics.",
      },
      {
        id: "values",
        titleGold: "Values",
        titleWhite: "Behind the Mission",
        values: [
          "Humanitarian neutrality",
          "Dignity in giving",
          "Resilience and empowerment",
          "Coexistence and harmony",
          "Transparency",
        ],
      },
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
    ourImpact: "Our Impacts",
    impactTitleLead: "Our",
    impactTitleGold: "Impact",
    impactSubtitle:
      "Major numbers supported by human stories, official photography and project evidence.",
    impactHumanStoryLead: "The Human Story",
    impactHumanStoryRest: "Layer",
    impactHumanStoryHint: "Each statistic should open into one verified story:",
    changing: "Changing lives",
    livesEveryday: "everyday",
    impactItems: [
      {
        value: "1,004",
        title: "Employees",
        description: "People coordinating humanitarian action every day.",
      },
      {
        value: "191,386",
        title: "People in Camps",
        description: "Individuals supported through organized camp services.",
      },
      {
        value: "751,948",
        title: "IDPs and Refugees",
        description: "People reached outside camps across communities.",
      },
      {
        value: "310",
        title: "Schools Renovated",
        description: "Learning environments restored for children and young people.",
      },
    ],
    trustTitle: "Trust & The Future",
    trustTitleGold: "Trust",
    trustTitleRest: "Behind the Work",
    trustTopics: [
      { id: "leadership", title: "Leadership and Governance" },
      { id: "quality", title: "Quality and Credibility" },
      { id: "partnerships", title: "Partnerships" },
      { id: "recognition", title: "Recognition" },
    ],
    trustLeadershipTitle: "Leadership and Governance",
    trustFounders: [
      {
        title: "Board of Founders",
        subtitle: "Guiding the mission with vision and integrity",
      },
      {
        title: "Board of Founders",
        subtitle: "Guiding the mission with vision and integrity",
      },
      {
        title: "Board of Founders",
        subtitle: "Guiding the mission with vision and integrity",
      },
      {
        title: "Board of Founders",
        subtitle: "Guiding the mission with vision and integrity",
      },
    ],
    trustQualityTitle: "Quality and Credibility",
    trustCredentials: [
      {
        id: "iraq-krg",
        title: "Licensed in Iraq and Kurdistan",
        body: "BCF is officially licensed to operate in both the Republic of Iraq and the Kurdistan Region, ensuring full compliance with national regulations and a strong commitment to local communities.",
      },
      {
        id: "usa",
        title: "United States License",
        body: "Registered to operate in the United States, enabling transparent partnerships and accountable cross-border humanitarian support.",
      },
      {
        id: "ecosoc",
        title: "UN ECOSOC Consultative Status",
        body: "Special consultative status with the United Nations Economic and Social Council, affirming BCF's role in international humanitarian dialogue.",
      },
      {
        id: "uk",
        title: "British Charity Commission",
        body: "Recognized under the UK Charity Commission framework, reinforcing standards of governance, reporting, and public trust.",
      },
      {
        id: "iso",
        title: "ISO 9001:2015",
        body: "Quality-management certification that guides consistent, measurable, and continuously improving humanitarian delivery.",
      },
    ],
    trustPartnershipsTitle: "Partnerships",
    trustPartnershipsHint: "Trusted partners working alongside BCF",
    trustRecognitionTitle: "Recognition",
    trustRecognitionBody:
      "Recognition reflects trust. But the true value of BCF’s work is found in the communities it continues to serve.",
    trustRecognitionItems: [
      {
        id: "awards",
        title: "International humanitarian awards",
        detail:
          "Sergio de Mello Award by the Portuguese Government, Wings of Help Organization Award (2025), Helfen Bringt Freude Award (2025), Volunteer Summit Recognition Award (2025) and the Essen Governor Award, Germany (2024).",
      },
      {
        id: "certifications",
        title: "Institutional certifications",
        detail:
          "ECOSOC consultative status since 2016 and ISO 9001:2015 quality-management certification.",
      },
      {
        id: "parliament",
        title: "Parliamentary recognition",
        detail:
          "German Federal Parliament Award (2025), Iraqi Parliament Award for Best NGO in Iraq (2015) and the Labour Group London Award.",
      },
      {
        id: "letters",
        title: "Appreciation letters",
        detail: "Several local and international appreciation letters.",
      },
      {
        id: "timeline",
        title: "Verified award timeline",
        detail: "A documented record spanning a decade, from 2015 to 2025.",
      },
    ],
    futureCircle: "The Future We Build",
    legacyCircle: "A Legacy That Continues",
    legacyTitleWhite: "A Legacy",
    legacyTitleGold: "That Continues",
    legacyLead:
      "Rooted in Kurdistan and guided by the belief that service is an honor, the Barzani Charity Foundation continues to support vulnerable communities with compassion, dignity and professional humanitarian action.",
    legacyBridge:
      "From food and shelter to education, health, protection, rehabilitation and environmental responsibility, BCF carries a message that reaches beyond borders:",
    legacyPillars: [
      { id: "service", titleWhite: "Service", titleGold: "is dignity" },
      { id: "humanity", titleWhite: "Humanity", titleGold: "is responsibility" },
      { id: "hope", titleWhite: "Hope is built", titleGold: "through action" },
    ],
    legacyThanks: "Thank You",
    legacyThanksBody: "Thank you for visiting the BCF Experience.",
    legacyRestart: "Return to Beginning",
    futureHeadingWhite: "The",
    futureHeadingGold: "Future",
    futureHeadingRest: "We Build",
    futureSubtitle:
      "Strategic objectives for people, education, rehabilitation, the environment and crisis preparedness",
    futureTopics: [
      {
        id: "education",
        title: "Education",
        bullets: [
          "Renovate 200 schools",
          "Build five new schools",
          "Two back-to-school projects",
        ],
      },
      {
        id: "environment",
        title: "Environment",
        bullets: [
          "Protect shared natural resources",
          "Support climate-ready communities",
          "Expand green livelihoods programs",
        ],
      },
      {
        id: "crises",
        title: "Crises Preparations",
        bullets: [
          "Strengthen emergency response capacity",
          "Pre-position relief across key corridors",
          "Train rapid-response volunteer teams",
        ],
      },
      {
        id: "rehabilitation",
        title: "Rehabilitation and Inclusion",
        bullets: [
          "Rebuild homes and community spaces",
          "Expand disability inclusion services",
          "Support return and social cohesion",
        ],
      },
      {
        id: "rights",
        title: "Human Rights and Recovery",
        bullets: [
          "Defend dignity in every program",
          "Support survivors of violence",
          "Advance fair access to essential services",
        ],
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
    attractStart: "دەستی لێبدە بۆ دەستپێکردن",
    attractTagline: "دامەزراوەی خێرخوازیی بارزانی",
    attractEyebrow: "دامەزراوەی خێرخوازیی بارزانی",
    attractCaption: "سی ساڵ لەپاڵ خەڵکی کوردستان.",
    enterHint: "دەستی لە هەر شوێنێک بدە",
    home: "سەرەتا",
    language: "زمان",
    chooseLanguageHint: "هەر کاتێک بتەوێت لە کۆنترۆڵەکانی لاوە دەیگۆڕیت.",
    idleTitle: "هێشتا لەگەڵمانیت؟",
    idleBody: "ئەزموونەکە دەگەڕێتەوە سەرەتا بۆ ئەوەی سەردانکەری داهاتوو لە سەرەتاوە دەست پێبکات.",
    idleContinue: "بەڵێ، لێرەم",
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
    journeyTitleLead: "گەشتی",
    journeyTitleGold: "ئێمە بدۆزەرەوە",
    journeySubtitle: "٦ بەش . یەک ئامانج",
    journeyChapters: [
      { id: "humanity", title: "مرۆڤایەتی لە کردار" },
      { id: "story", title: "چیرۆکەکەمان" },
      { id: "map", title: "لە کوێ کار دەکەین" },
      { id: "impact", title: "کاریگەرییەکەمان" },
      { id: "trust", title: "متمانەی پشت کارەکە" },
      { id: "future", title: "داهاتوو و میرات" },
    ],
    whoWeServeWhite: "ئێمە",
    whoWeServeGold: "خزمەتی کێ دەکەین",
    serveCategories: [
      { id: "relief", title: "فریاگوزاری" },
      { id: "health", title: "تەندروستی" },
      {
        id: "education",
        title: "پەروەردە",
        tags: ["بژێوی و بەهێزکردنی ئابووری", "پەروەردە و گەشەپێدانی مرۆیی"],
      },
      { id: "environment", title: "ژینگە", tags: ["ژینگە و گۆڕانی کەشوهەوا"] },
      { id: "community", title: "کۆمەڵگە" },
    ],
    storyTimelineStart: "٢٠٠٥",
    storyTimelineEnd: "ئێستا",
    storyScrollHint: "بڕۆ خوارەوە",
    storySections: [
      {
        id: "foundation",
        titleGold: "دامەزراندنی",
        titleWhite: "دامەزراوە",
        body: "BCF بە فەرمی ساڵی ٢٠٠٥ لە هەولێر دامەزرا بۆ گۆڕینی بەزەیی بۆ کارێکی مرۆیی ڕێکخراو.",
      },
      {
        id: "mission",
        titleGold: "ئەرک",
        titleWhite: "",
        body: "پشتگیری مرۆیی بۆ کەسانی هەستیار بەبێ جیاکاری، لەگەڵ بەرزکردنەوەی ئاشتی، کەرامەت و بەردەوامی.",
      },
      {
        id: "vision",
        titleGold: "دیدگا",
        titleWhite: "",
        body: "جیهانێک کە هەژاری و ئاوارەیی زۆرەملێ نەمابێت و هەموو کەسێک بگاتە مافەکانی، پەروەردە و خزمەتگوزارییە بنەڕەتییەکان.",
      },
      {
        id: "philosophy",
        titleGold: "فەلسەفەی",
        titleWhite: "مرۆیی",
        body: "خزمەتکردن ڕێزێکە — نەک بەخشینێک لە سەرەوە. خەڵک وەک مرۆڤ خزمەت دەکرێن، نەک وەک ژمارە.",
      },
      {
        id: "values",
        titleGold: "بەها",
        titleWhite: "پشتی ئامانجەکە",
        values: [
          "بێلایەنی مرۆیی",
          "کەرامەت لە بەخشیندا",
          "بەرگەگرتن و بەهێزکردن",
          "هاوژیانی ئاشتیانە",
          "ڕوونکاری",
        ],
      },
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
    impactTitleLead: "کاریگەری",
    impactTitleGold: "ئێمە",
    impactSubtitle:
      "ژمارە گەورەکان پشتگیری دەکرێن بە چیرۆکی مرۆیی، وێنەی فەرمی و بەڵگەی پڕۆژە.",
    impactHumanStoryLead: "چیرۆکی مرۆیی",
    impactHumanStoryRest: "چین",
    impactHumanStoryHint: "هەر ئامارێک دەبێت بکرێتەوە بۆ یەک چیرۆکی پشتڕاستکراو:",
    changing: "گۆڕینی ژیان",
    livesEveryday: "هەموو ڕۆژێک",
    impactItems: [
      {
        value: "1,004",
        title: "کارمەند",
        description: "هەماهەنگی کاری مرۆیی هەموو ڕۆژێک",
      },
      {
        value: "191,386",
        title: "کەس لە کەمپ",
        description: "پشتگیریکراو لە ڕێگەی خزمەتگوزارییە ڕێکخراوەکان",
      },
      {
        value: "751,948",
        title: "ئاوارە و پەنابەر",
        description: "گەیشتوون لە دەرەوەی کەمپەکان لە کۆمەڵگەکان",
      },
      {
        value: "310",
        title: "قوتابخانەی نۆژەنکراو",
        description: "ژینگەی فێربوون بۆ منداڵان و گەنجان",
      },
    ],
    trustTitle: "متمانە و داهاتوو",
    trustTitleGold: "متمانە",
    trustTitleRest: "لە پشت کارەکە",
    trustTopics: [
      { id: "leadership", title: "سەرکردایەتی و حوکمڕانی" },
      { id: "quality", title: "کوالیتی و باوەڕپێکراوی" },
      { id: "partnerships", title: "هاوبەشییەکان" },
      { id: "recognition", title: "ناسینەوە" },
    ],
    trustLeadershipTitle: "سەرکردایەتی و حوکمڕانی",
    trustFounders: [
      {
        title: "ئەنجومەنی دامەزرێنەران",
        subtitle: "ڕێنمایی کردنی ئامانج بە بینین و دەستپاکی",
      },
      {
        title: "ئەنجومەنی دامەزرێنەران",
        subtitle: "ڕێنمایی کردنی ئامانج بە بینین و دەستپاکی",
      },
      {
        title: "ئەنجومەنی دامەزرێنەران",
        subtitle: "ڕێنمایی کردنی ئامانج بە بینین و دەستپاکی",
      },
      {
        title: "ئەنجومەنی دامەزرێنەران",
        subtitle: "ڕێنمایی کردنی ئامانج بە بینین و دەستپاکی",
      },
    ],
    trustQualityTitle: "کوالیتی و باوەڕپێکراوی",
    trustCredentials: [
      {
        id: "iraq-krg",
        title: "مۆڵەت لە عێراق و کوردستان",
        body: "BCF بە فەرمی مۆڵەتی کارکردنی لە کۆماری عێراق و هەرێمی کوردستان هەیە، بە پابەندبوون بە یاسا ناوخۆییەکان و پابەندییەکی بەهێز بە کۆمەڵگەکان.",
      },
      {
        id: "usa",
        title: "مۆڵەتی ویلایەتە یەکگرتووەکان",
        body: "تۆمارکراوە بۆ کارکردن لە ئەمریکا، بۆ هاوبەشی شفاف و پشتگیری مرۆیی بەرپرسیار.",
      },
      {
        id: "ecosoc",
        title: "پێگەی ڕاوێژکاری UN ECOSOC",
        body: "پێگەی ڕاوێژکاری تایبەت لەگەڵ ئەنجومەنی ئابووری و کۆمەڵایەتی نەتەوە یەکگرتووەکان.",
      },
      {
        id: "uk",
        title: "کۆمیسیۆنی خێرخوازی بەریتانیا",
        body: "ناسراو لە چوارچێوەی کۆمیسیۆنی خێرخوازی بەریتانیا بۆ حوکمڕانی و متمانەی گشتی.",
      },
      {
        id: "iso",
        title: "ISO 9001:2015",
        body: "بڕوانامەی بەڕێوەبردنی کوالیتی بۆ گەیاندنی مرۆیی بەردەوام و پێوانەکراو.",
      },
    ],
    trustPartnershipsTitle: "هاوبەشییەکان",
    trustPartnershipsHint: "هاوبەشە باوەڕپێکراوەکان لەگەڵ BCF",
    trustRecognitionTitle: "ناسینەوە",
    trustRecognitionBody:
      "ناسینەوە مانای متمانەیە. بەڵام بەهای ڕاستەقینەی کاری BCF لەو کۆمەڵگایانەدایە کە بەردەوامە لە خزمەتکردنیان.",
    trustRecognitionItems: [
      {
        id: "awards",
        title: "خەڵاتە مرۆییە نێودەوڵەتییەکان",
        detail:
          "خەڵاتی سێرجیۆ دی میلۆ لەلایەن حکومەتی پورتوگالەوە، خەڵاتی ڕێکخراوی Wings of Help (٢٠٢٥)، خەڵاتی Helfen Bringt Freude (٢٠٢٥)، خەڵاتی ناسینەوەی لووتکەی خۆبەخشان (٢٠٢٥) و خەڵاتی پارێزگاری ئێسن لە ئەڵمانیا (٢٠٢٤).",
      },
      {
        id: "certifications",
        title: "بڕوانامە دامەزراوەییەکان",
        detail:
          "دۆخی ڕاوێژکاری لە ئەنجومەنی ئابووری و کۆمەڵایەتیی نەتەوە یەکگرتووەکان لە ٢٠١٦ەوە، و بڕوانامەی بەڕێوەبردنی کوالیتی ISO 9001:2015.",
      },
      {
        id: "parliament",
        title: "ناسینەوەی پەرلەمانی",
        detail:
          "خەڵاتی پەرلەمانی فیدراڵی ئەڵمانیا (٢٠٢٥)، خەڵاتی پەرلەمانی عێراق بۆ باشترین ڕێکخراوی ناحکومی لە عێراق (٢٠١٥) و خەڵاتی گروپی کرێکاریی لەندەن.",
      },
      {
        id: "letters",
        title: "نامەکانی سوپاسگوزاری",
        detail: "چەندین نامەی سوپاسگوزاریی ناوخۆیی و نێودەوڵەتی.",
      },
      {
        id: "timeline",
        title: "هێڵی کاتیی خەڵاتە بەڵگەدارەکان",
        detail: "تۆمارێکی بەڵگەدار بە درێژایی دەیەیەک، لە ٢٠١٥ەوە تا ٢٠٢٥.",
      },
    ],
    futureCircle: "داهاتووی بنیاد دەنێین",
    legacyCircle: "میراتێک کە بەردەوامە",
    legacyTitleWhite: "میراتێک",
    legacyTitleGold: "کە بەردەوامە",
    legacyLead:
      "ڕەگداکوتاو لە کوردستان و ڕێنماییکراو بەو باوەڕەی کە خزمەتکردن شەرەفە، دەزگای خێرخوازیی بارزانی بەردەوامە لە پشتیوانیی کۆمەڵگا لاوازەکان بە بەزەیی، کەرامەت و کاری مرۆییی پیشەیی.",
    legacyBridge:
      "لە خواردن و سەرپەناوە تا پەروەردە، تەندروستی، پاراستن، چاکسازی و بەرپرسیارێتیی ژینگەیی، BCF پەیامێک دەگوازێتەوە کە لە سنوورەکان تێدەپەڕێت:",
    legacyPillars: [
      { id: "service", titleWhite: "خزمەت", titleGold: "کەرامەتە" },
      { id: "humanity", titleWhite: "مرۆڤایەتی", titleGold: "بەرپرسیارێتییە" },
      { id: "hope", titleWhite: "هیوا", titleGold: "بە کردار بنیاد دەنرێت" },
    ],
    legacyThanks: "سوپاس",
    legacyThanksBody: "سوپاس بۆ سەردانی ئەزموونی BCF.",
    legacyRestart: "گەڕانەوە بۆ سەرەتا",
    futureHeadingWhite: "داهاتوو",
    futureHeadingGold: "کە",
    futureHeadingRest: "بنیاد دەنێین",
    futureSubtitle:
      "ئامانجە ستراتیژییەکان بۆ خەڵک، پەروەردە، نۆژەنکردنەوە، ژینگە و ئامادەکاری قەیران",
    futureTopics: [
      {
        id: "education",
        title: "پەروەردە",
        bullets: [
          "نۆژەنکردنەوەی ٢٠٠ قوتابخانە",
          "دروستکردنی پێنج قوتابخانەی نوێ",
          "دوو پڕۆژەی گەڕانەوە بۆ قوتابخانە",
        ],
      },
      {
        id: "environment",
        title: "ژینگە",
        bullets: [
          "پاراستنی سەرچاوە سروشتییە هاوبەشەکان",
          "پشتگیریکردنی کۆمەڵگەکان لەبەرامبەر گۆڕانی کەشوهەوا",
          "فراوانکردنی بەرنامەکانی ژیانی سەوز",
        ],
      },
      {
        id: "crises",
        title: "ئامادەکاری قەیران",
        bullets: [
          "بەهێزکردنی توانای وەڵامدانەوەی فریاگوزاری",
          "دانانی یارمەتی لە ڕێڕەوە سەرەکییەکان",
          "ڕاهێنانی تیمە خێرا وەڵامدەرەکان",
        ],
      },
      {
        id: "rehabilitation",
        title: "نۆژەنکردنەوە و گشتگیری",
        bullets: [
          "دووبارە دروستکردنەوەی ماڵ و شوێنە گشتییەکان",
          "فراوانکردنی خزمەتگوزارییەکانی گشتگیری",
          "پشتگیریکردنی گەڕانەوە و پێکەوەژیان",
        ],
      },
      {
        id: "rights",
        title: "مافی مرۆڤ و چاکبوونەوە",
        bullets: [
          "پاراستنی کەرامەت لە هەموو بەرنامەیەکدا",
          "پشتگیریکردنی ڕزگاربووان",
          "دەستپێڕاگەیشتنی دادپەروەرانە بە خزمەتگوزارییەکان",
        ],
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
    attractStart: "المس للبدء",
    attractTagline: "مؤسسة بارزاني الخيرية",
    attractEyebrow: "مؤسسة بارزاني الخيرية",
    attractCaption: "ثلاثون عاماً إلى جانب أهالي كوردستان.",
    enterHint: "المس أي مكان",
    home: "الرئيسية",
    language: "اللغة",
    chooseLanguageHint: "يمكنك تغييرها في أي وقت من أدوات التحكم الجانبية.",
    idleTitle: "هل ما زلت معنا؟",
    idleBody: "تعود التجربة إلى البداية ليبدأ الزائر التالي من جديد.",
    idleContinue: "نعم، ما زلت هنا",
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
    journeyTitleLead: "اكتشف",
    journeyTitleGold: "رحلتنا",
    journeySubtitle: "6 فصول . رسالة واحدة",
    journeyChapters: [
      { id: "humanity", title: "الإنسانية في العمل" },
      { id: "story", title: "قصتنا" },
      { id: "map", title: "أين نعمل" },
      { id: "impact", title: "أثرنا" },
      { id: "trust", title: "الثقة وراء العمل" },
      { id: "future", title: "المستقبل والإرث" },
    ],
    whoWeServeWhite: "من",
    whoWeServeGold: "نخدم",
    serveCategories: [
      { id: "relief", title: "الإغاثة" },
      { id: "health", title: "الصحة" },
      {
        id: "education",
        title: "التعليم",
        tags: ["سبل العيش والتمكين الاقتصادي", "التعليم والتنمية البشرية"],
      },
      { id: "environment", title: "البيئة", tags: ["البيئة وتغير المناخ"] },
      { id: "community", title: "المجتمع" },
    ],
    storyTimelineStart: "2005",
    storyTimelineEnd: "اليوم",
    storyScrollHint: "مرر للأسفل",
    storySections: [
      {
        id: "foundation",
        titleGold: "قصة",
        titleWhite: "التأسيس",
        body: "تأسست مؤسسة BCF رسمياً في أربيل عام 2005 لتحويل التعاطف إلى عمل إنساني منظم.",
      },
      {
        id: "mission",
        titleGold: "الرسالة",
        titleWhite: "",
        body: "تقديم الدعم الإنساني للفئات الضعيفة دون تمييز، مع تعزيز السلام والكرامة والاستدامة.",
      },
      {
        id: "vision",
        titleGold: "الرؤية",
        titleWhite: "",
        body: "عالم يخلو من الفقر والنزوح القسري، يصل فيه كل إنسان إلى حقوقه والتعليم والخدمات الأساسية.",
      },
      {
        id: "philosophy",
        titleGold: "الفلسفة",
        titleWhite: "الإنسانية",
        body: "الخدمة شرف، لا إحسان من عل. يُعامل الناس كبشر، لا كأرقام.",
      },
      {
        id: "values",
        titleGold: "القيم",
        titleWhite: "خلف الرسالة",
        values: [
          "الحياد الإنساني",
          "الكرامة في العطاء",
          "الصمود والتمكين",
          "التعايش والانسجام",
          "الشفافية",
        ],
      },
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
    impactTitleLead: "أثر",
    impactTitleGold: "نا",
    impactSubtitle:
      "أرقام كبيرة مدعومة بقصص إنسانية وتصوير رسمي وأدلة المشاريع.",
    impactHumanStoryLead: "القصة الإنسانية",
    impactHumanStoryRest: "الطبقة",
    impactHumanStoryHint: "يجب أن يفتح كل رقم إلى قصة موثّقة واحدة:",
    changing: "نغيّر الحيوات",
    livesEveryday: "كل يوم",
    impactItems: [
      {
        value: "1,004",
        title: "موظفون",
        description: "ينسّقون العمل الإنساني كل يوم",
      },
      {
        value: "191,386",
        title: "أشخاص في المخيمات",
        description: "مدعومون عبر خدمات المخيمات المنظمة",
      },
      {
        value: "751,948",
        title: "نازحون ولاجئون",
        description: "تم الوصول إليهم خارج المخيمات في المجتمعات",
      },
      {
        value: "310",
        title: "مدارس مجدّدة",
        description: "بيئات تعلم أُعيد ترميمها للأطفال والشباب",
      },
    ],
    trustTitle: "الثقة والمستقبل",
    trustTitleGold: "الثقة",
    trustTitleRest: "وراء العمل",
    trustTopics: [
      { id: "leadership", title: "القيادة والحوكمة" },
      { id: "quality", title: "الجودة والمصداقية" },
      { id: "partnerships", title: "الشراكات" },
      { id: "recognition", title: "الاعتراف" },
    ],
    trustLeadershipTitle: "القيادة والحوكمة",
    trustFounders: [
      {
        title: "مجلس المؤسسين",
        subtitle: "توجيه الرسالة برؤية ونزاهة",
      },
      {
        title: "مجلس المؤسسين",
        subtitle: "توجيه الرسالة برؤية ونزاهة",
      },
      {
        title: "مجلس المؤسسين",
        subtitle: "توجيه الرسالة برؤية ونزاهة",
      },
      {
        title: "مجلس المؤسسين",
        subtitle: "توجيه الرسالة برؤية ونزاهة",
      },
    ],
    trustQualityTitle: "الجودة والمصداقية",
    trustCredentials: [
      {
        id: "iraq-krg",
        title: "مرخّص في العراق وكوردستان",
        body: "BCF مرخّصة رسمياً للعمل في جمهورية العراق وإقليم كوردستان، بما يضمن الامتثال للأنظمة الوطنية والالتزام بالمجتمعات المحلية.",
      },
      {
        id: "usa",
        title: "ترخيص الولايات المتحدة",
        body: "مسجّلة للعمل في الولايات المتحدة لدعم شراكات شفافة وعمل إنساني مسؤول.",
      },
      {
        id: "ecosoc",
        title: "الوضع الاستشاري لدى UN ECOSOC",
        body: "وضع استشاري خاص لدى المجلس الاقتصادي والاجتماعي للأمم المتحدة.",
      },
      {
        id: "uk",
        title: "هيئة الجمعيات الخيرية البريطانية",
        body: "معترف بها ضمن إطار هيئة الجمعيات الخيرية في المملكة المتحدة للحوكمة والثقة العامة.",
      },
      {
        id: "iso",
        title: "ISO 9001:2015",
        body: "شهادة إدارة الجودة لتقديم إنساني متسق وقابل للقياس ومتحسن باستمرار.",
      },
    ],
    trustPartnershipsTitle: "الشراكات",
    trustPartnershipsHint: "شركاء موثوقون يعملون إلى جانب BCF",
    trustRecognitionTitle: "الاعتراف",
    trustRecognitionBody:
      "الاعتراف انعكاس للثقة. لكن القيمة الحقيقية لعمل BCF تكمن في المجتمعات التي يواصل خدمتها.",
    trustRecognitionItems: [
      {
        id: "awards",
        title: "جوائز إنسانية دولية",
        detail:
          "جائزة سيرجيو دي ميلو من الحكومة البرتغالية، وجائزة منظمة Wings of Help (2025)، وجائزة Helfen Bringt Freude (2025)، وجائزة تقدير قمة المتطوعين (2025)، وجائزة محافظ إيسن في ألمانيا (2024).",
      },
      {
        id: "certifications",
        title: "اعتمادات مؤسسية",
        detail:
          "الصفة الاستشارية لدى المجلس الاقتصادي والاجتماعي للأمم المتحدة منذ 2016، وشهادة إدارة الجودة ISO 9001:2015.",
      },
      {
        id: "parliament",
        title: "اعتراف برلماني",
        detail:
          "جائزة البرلمان الاتحادي الألماني (2025)، وجائزة البرلمان العراقي لأفضل منظمة غير حكومية في العراق (2015)، وجائزة مجموعة العمل في لندن.",
      },
      {
        id: "letters",
        title: "رسائل التقدير",
        detail: "العديد من رسائل التقدير المحلية والدولية.",
      },
      {
        id: "timeline",
        title: "خط زمني موثّق للجوائز",
        detail: "سجل موثّق يمتد عقداً كاملاً، من 2015 إلى 2025.",
      },
    ],
    futureCircle: "المستقبل الذي نبنيه",
    legacyCircle: "إرث يستمر",
    legacyTitleWhite: "إرث",
    legacyTitleGold: "يستمر",
    legacyLead:
      "متجذّرة في كوردستان ومسترشدة بالإيمان بأن الخدمة شرف، تواصل مؤسسة بارزاني الخيرية دعم المجتمعات الهشّة بالرحمة والكرامة والعمل الإنساني المهني.",
    legacyBridge:
      "من الغذاء والمأوى إلى التعليم والصحة والحماية وإعادة التأهيل والمسؤولية البيئية، تحمل BCF رسالة تتجاوز الحدود:",
    legacyPillars: [
      { id: "service", titleWhite: "الخدمة", titleGold: "كرامة" },
      { id: "humanity", titleWhite: "الإنسانية", titleGold: "مسؤولية" },
      { id: "hope", titleWhite: "الأمل", titleGold: "يُبنى بالعمل" },
    ],
    legacyThanks: "شكراً لكم",
    legacyThanksBody: "شكراً لزيارتكم تجربة BCF.",
    legacyRestart: "العودة إلى البداية",
    futureHeadingWhite: "المستقبل",
    futureHeadingGold: "الذي",
    futureHeadingRest: "نبنيه",
    futureSubtitle:
      "أهداف استراتيجية للناس والتعليم وإعادة التأهيل والبيئة والتأهب للأزمات",
    futureTopics: [
      {
        id: "education",
        title: "التعليم",
        bullets: [
          "ترميم 200 مدرسة",
          "بناء خمس مدارس جديدة",
          "مشروعان للعودة إلى المدارس",
        ],
      },
      {
        id: "environment",
        title: "البيئة",
        bullets: [
          "حماية الموارد الطبيعية المشتركة",
          "دعم المجتمعات المستعدة للمناخ",
          "توسيع برامج سبل العيش الخضراء",
        ],
      },
      {
        id: "crises",
        title: "التأهب للأزمات",
        bullets: [
          "تعزيز قدرة الاستجابة للطوارئ",
          "تجهيز المساعدات عبر الممرات الرئيسية",
          "تدريب فرق المتطوعين سريعة الاستجابة",
        ],
      },
      {
        id: "rehabilitation",
        title: "إعادة التأهيل والشمول",
        bullets: [
          "إعادة بناء المنازل والفضاءات المجتمعية",
          "توسيع خدمات الشمول لذوي الإعاقة",
          "دعم العودة والتماسك الاجتماعي",
        ],
      },
      {
        id: "rights",
        title: "حقوق الإنسان والتعافي",
        bullets: [
          "حماية الكرامة في كل برنامج",
          "دعم الناجين من العنف",
          "تعزيز الوصول العادل إلى الخدمات الأساسية",
        ],
      },
    ],
    projects: projectsEn,
  },
};
