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
  | "humanStories"
  | "impactGallery"
  | "trust"
  | "future"
  | "futureDetail"
  | "legacy";

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

export type ImpactGalleryId = "employees" | "camps" | "idps" | "schools";

type ImpactItem = {
  id: ImpactGalleryId;
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
};

/**
 * One value from roadmap page 04. The Values chapter scrolls as a long column
 * rather than a pane of floating pills, so each value carries its full text.
 */
export type StoryValue = { id: string; title: string; body: string };

export type HumanStoryId =
  | "school"
  | "shelter"
  | "care"
  | "displaced"
  | "skills"
  | "cash"
  | "autism"
  | "recovery";

/**
 * Roadmap page 27. The titles are the roadmap's own story categories; `body`
 * carries the verified sector figures that stand behind each one, because the
 * publication supplies no per-person narrative and a museum must not invent one.
 */
export type HumanStory = {
  id: HumanStoryId;
  title: string;
  body: string;
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
  storyValuesIntro: string;
  storyValues: StoryValue[];
  /** Captions under the three portraits in the Values chapter. */
  storyValuesCaptions: string[];
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
  humanStoriesTitle: string;
  humanStoriesTagline: string;
  humanStories: HumanStory[];
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
    attractCaption: "A legacy of service.",
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
        titleGold: "A Legacy",
        titleWhite: "of Service",
        body: "BCF was officially established in 2005 in Erbil, capital of the Kurdistan Region of Iraq, to turn compassion into organized humanitarian action.",
      },
      {
        id: "mission",
        titleGold: "Mission",
        titleWhite: "",
        body: "To provide humanitarian aid to the most vulnerable people, regardless of ethnic, religious or political background, while promoting peace, dignity and sustainability for humanity and nature.",
      },
      {
        id: "vision",
        titleGold: "Vision",
        titleWhite: "",
        body: "A world where poverty and forced migration are eliminated, and where every person has access to education, essential services, basic rights and a protected environment.",
      },
      {
        id: "philosophy",
        titleGold: "Humanitarian",
        titleWhite: "Philosophy",
        body: "Humanitarian work is not charity from above. It is service with dignity, delivered to people as human beings, not as statistics.",
      },
      {
        id: "values",
        titleGold: "Values",
        titleWhite: "Behind the Mission",
      },
    ],
    storyValuesIntro:
      "BCF operates through values that shape both local and international humanitarian work.",
    storyValues: [
      {
        id: "neutrality",
        title: "Humanitarian Neutrality",
        body: "BCF provides aid based on need alone, without discrimination based on politics, ethnicity, religion, gender or background.",
      },
      {
        id: "dignity",
        title: "Dignity in Giving",
        body: "Support is delivered in a way that protects the honor and self-worth of every person served.",
      },
      {
        id: "resilience",
        title: "Resilience and Empowerment",
        body: "BCF works beyond emergency relief by helping communities rebuild, recover and become self-reliant.",
      },
      {
        id: "coexistence",
        title: "Coexistence and Harmony",
        body: "BCF promotes peaceful coexistence among Kurdistan's diverse ethnic and religious communities.",
      },
      {
        id: "vulnerable",
        title: "Supporting the Vulnerable",
        body: "BCF serves poor families, IDPs, refugees, people with disabilities, elderly people, orphans and other vulnerable groups.",
      },
      {
        id: "transparency",
        title: "Transparency",
        body: "BCF maintains accountability to donors, partners and beneficiaries to ensure that resources reach those most in need.",
      },
    ],
    storyValuesCaptions: [
      "Masrour Barzani, President of the Board of Founders",
      "Service before self — leadership measured by what it gives",
      "A humanitarian philosophy carried into a second generation",
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
    humanStoriesTitle: "Human Stories",
    humanStoriesTagline: "Numbers help us understand scale. Stories help us understand meaning.",
    humanStories: [
      {
        id: "school",
        title: "A child returning to school",
        body: "310 schools renovated, 131 classrooms built and 362,538 sets of school materials distributed, with two back-to-school projects planned for children who dropped out.",
      },
      {
        id: "shelter",
        title: "A family receiving shelter",
        body: "540 residential units distributed to families of martyrs in Erbil and Soran in 2024, 20 houses built in Sinjar, and 4,129 tents provided after the 2023 Turkey and Syria earthquakes.",
      },
      {
        id: "care",
        title: "A patient receiving medical care",
        body: "Five primary health-care centres built and opened, Khalifan, Peshmarga and Akre Maternity hospitals renovated, and a congenital heart surgery programme for children.",
      },
      {
        id: "displaced",
        title: "A displaced community receiving food and water",
        body: "14,429,226 hot meals and 2,450,099 food parcels distributed, and 65,864,000 litres of drinking water delivered in Erbil in 2021.",
      },
      {
        id: "skills",
        title: "A young person gaining new skills",
        body: "21 vocational training centres have supported 587,216 individuals through skills development, training and job opportunities.",
      },
      {
        id: "cash",
        title: "A vulnerable family receiving cash support",
        body: "141,468,261,002 IQD distributed in cash assistance, alongside blankets, winter supplies, mattresses and emergency household items.",
      },
      {
        id: "autism",
        title: "A child with autism receiving care",
        body: "Awareness and support programmes, with targets to rehabilitate 200 autistic children, reintegrate 100 into public schools and open three autism centres.",
      },
      {
        id: "recovery",
        title: "A community recovering after disaster",
        body: "Rapid emergency support following the 2023 earthquake in Turkey and Syria, with five disaster-response teams planned across five locations.",
      },
    ],
    changing: "Changing lives",
    livesEveryday: "everyday",
    impactItems: [
      {
        id: "employees",
        value: "1,004",
        title: "Employees",
        description: "People coordinating humanitarian action every day.",
      },
      {
        id: "camps",
        value: "191,386",
        title: "People in Camps",
        description: "Individuals supported through organized camp services.",
      },
      {
        id: "idps",
        value: "751,948",
        title: "IDPs and Refugees",
        description: "People reached outside camps across communities.",
      },
      {
        id: "schools",
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
      { id: "recognition", title: "Recognition and Awards" },
    ],
    trustLeadershipTitle: "Leadership and Governance",
    trustFounders: [
      {
        title: "Board of Founders",
        subtitle: "The highest authority of the foundation.",
      },
      {
        title: "Administrative Board",
        subtitle: "Reviews and approves major decisions, policies and project direction.",
      },
      {
        title: "Operational Departments",
        subtitle: "Assess needs and design the humanitarian programs.",
      },
      {
        title: "Regional Offices",
        subtitle: "Implement the work directly with local communities.",
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
        id: "kuwait",
        title: "Registered in Kuwait",
        body: "Registered as a charity organization in Kuwait in 2019, extending BCF's licensed humanitarian presence across the region.",
      },
      {
        id: "iso",
        title: "ISO 9001:2015",
        body: "Quality-management certification: responsibilities are clear, systems are organized, and humanitarian services are delivered with consistent quality.",
      },
    ],
    trustPartnershipsTitle: "Partnerships",
    trustPartnershipsHint: "Trusted partners working alongside BCF",
    trustRecognitionTitle: "Recognition and Awards",
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
    attractTagline: "دەزگای خێرخوازیی بارزانی",
    attractEyebrow: "دەزگای خێرخوازیی بارزانی",
    attractCaption: "میراتێک لە خزمەتکردن.",
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
    quote: "خزمەتکردنی گەلی خۆت، شانازییە.",
    quoteAttr: "— مستەفا بارزانی",
    welcomeEyebrow: "بەخێربێیت بۆ",
    welcomeTitleBcf: "BCF",
    welcomeTitleRest: "ئەزموون",
    welcomeBody: "چیرۆک، کاری مرۆیی، و کاریگەرییەکەمان پێکەوە ببینە.",
    startJourney: "دەستپێکردنی گەشتەکە",
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
        titleGold: "میراتێک",
        titleWhite: "لە خزمەتکردن",
        body: "دەزگای خێرخوازیی بارزانی بە شێوەیەکی فەرمی لە ساڵی ٢٠٠٥ لە هەولێری پایتەختی هەرێمی کوردستانی عێراق دامەزرا، بۆ گۆڕینی بەزەیی و هاوسۆزی بە کارێکی مرۆیی ڕێکخراو.",
      },
      {
        id: "mission",
        titleGold: "پەیام",
        titleWhite: "",
        body: "پێشکەشکردنی هاوکاریی مرۆیی بە لێقەوماوان، بەبێ جیاکاری لەسەر بنەمای بنچینەی نەتەوەیی، ئاینی یان سیاسی، لەگەڵ بەرقەرارکردنی ئاشتی و کەرامەت بۆ مرۆڤایەتی و سروشت.",
      },
      {
        id: "vision",
        titleGold: "دیدگا",
        titleWhite: "",
        body: "جیهانێک کە تێیدا هەژاری و کۆچی زۆرەملێ بنبڕ کرابێت، و هەموو کەسێک مافی هەبێت لە بەدەستهێنانی پەروەردە، خزمەتگوزارییە سەرەکییەکان، مافە بنەڕەتییەکان و ژینگەیەکی پارێزراو.",
      },
      {
        id: "philosophy",
        titleGold: "فەلسەفەی",
        titleWhite: "مرۆڤدۆستانە",
        body: "وتەی «خزمەتکردنی گەلی خۆت، شانازییە» تەنها دروشمێک نییە؛ بەڵکو بنەمای ئەخلاقیی کارەکانی دەزگای خێرخوازیی بارزانییە. کاری مرۆیی بەخشینێک نییە لە سەرەوە، بەڵکو خزمەتکردنە بە کەرامەتەوە.",
      },
      {
        id: "values",
        titleGold: "بەهاکانی",
        titleWhite: "پشت پەیامەکە",
      },
    ],
    storyValuesIntro:
      "دەزگای خێرخوازیی بارزانی لە ڕێگەی کۆمەڵێک بەهاوە کاردەکات کە کاری مرۆیی ناوخۆیی و نێودەوڵەتی دادەڕێژن.",
    storyValues: [
      {
        id: "neutrality",
        title: "بێلایەنیی مرۆیی",
        body: "هاوکارییەکان تەنها لەسەر بنەمای پێویستی پێشکەش دەکرێن، بەبێ جیاکاری لەسەر بنەمای ڕامیاری، نەتەوە، ئاین، ڕەگەز یان بنچینە.",
      },
      {
        id: "dignity",
        title: "کەرامەت لە بەخشیندا",
        body: "پاڵپشتییەکان بە شێوازێک پێشکەش دەکرێن کە پارێزگاری لە کەرامەت و بەهای خودیی هەر کەسێک بکەن کە خزمەت دەکرێت.",
      },
      {
        id: "resilience",
        title: "خۆڕاگری و بەهێزکردن",
        body: "کارەکانی دەزگای خێرخوازیی بارزانی لە سنووری فریاگوزاریی خێرا تێدەپەڕن؛ ئەمەش لە ڕێگەی یارمەتیدانی کۆمەڵگەکان بۆ بونیاتنانەوە، چاکبوونەوە و پشتبەستن بە خۆیان.",
      },
      {
        id: "coexistence",
        title: "پێکەوەژیان و تەبایی",
        body: "دەزگای خێرخوازیی بارزانی کار دەکات بۆ بڵاوکردنەوەی پێکەوەژیانی ئاشتیانە لە نێوان پێکهاتە نەتەوەیی و ئاینییە جیاوازەکانی کوردستاندا.",
      },
      {
        id: "vulnerable",
        title: "پاڵپشتیکردنی لێقەوماوان",
        body: "خزمەت بە خێزانە هەژارەکان، ئاوارەکان، پەنابەران، خاوەن پێداویستییە تایبەتەکان، بەساڵاچووان، بێسەرپەرشتان و گروپە لێقەوماوەکانی دیکە دەکات.",
      },
      {
        id: "transparency",
        title: "شەفافییەت",
        body: "دەزگای خێرخوازیی بارزانی بەرپرسیارێتی لە بەرامبەر بەخشەران، هاوبەشان و سوودمەندان هەڵدەگرێت بۆ دڵنیابوونەوە لەوەی سەرچاوەکان دەگەنە دەست ئەو کەسانەی پێویستیان پێیەتی.",
      },
    ],
    storyValuesCaptions: [
      "مەسرور بارزانی، سەرۆکی بۆردی دامەزرێنەران",
      "خزمەتکردن پێش خود — سەرکردایەتی بەوە دەپێورێت کە چی دەبەخشێت",
      "فەلسەفەیەکی مرۆڤدۆستانە کە بۆ نەوەی دووەم گوازراوەتەوە",
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
    humanStoriesTitle: "چیرۆکە مرۆییەکان",
    humanStoriesTagline: "ژمارەکان قەبارە دەگەیەنن، چیرۆکەکان مانا.",
    humanStories: [
      {
        id: "school",
        title: "منداڵێک کە دەگەڕێتەوە بۆ قوتابخانە",
        body: "نۆژەنکردنەوەی ٣١٠ قوتابخانە، دروستکردنی ١٣١ پۆلی خوێندن و دابەشکردنی ٣٦٢،٥٣٨ پێداویستیی قوتابخانە، لەگەڵ دوو پڕۆژەی گەڕانەوە بۆ قوتابخانە بۆ ئەو منداڵانەی وازیان هێناوە.",
      },
      {
        id: "shelter",
        title: "خێزانێک کە پەناگە وەردەگرێت",
        body: "دابەشکردنی ٥٤٠ یەکەی نیشتەجێبوون بەسەر خێزانی شەهیدان لە هەولێر و سۆران لە ٢٠٢٤، دروستکردنی ٢٠ خانوو لە شنگال، و دابینکردنی ٤،١٢٩ خێمە دوای بوومەلەرزەی تورکیا و سوریا لە ٢٠٢٣.",
      },
      {
        id: "care",
        title: "نەخۆشێک کە چاودێری پزیشکی پێدەگات",
        body: "دروستکردن و کردنەوەی پێنج بنکەی تەندروستی سەرەتایی، نۆژەنکردنەوەی نەخۆشخانەکانی خەلیفان و پێشمەرگە و لەدایکبوونی ئاکرێ، و پڕۆژەی نەشتەرگەریی دڵی زگماکی بۆ منداڵان.",
      },
      {
        id: "displaced",
        title: "کۆمەڵگەیەکی ئاوارە کە خۆراک و ئاویان پێدەگات",
        body: "دابەشکردنی ١٤،٤٢٩،٢٢٦ ژەمی گەرم و ٢،٤٥٠،٠٩٩ سەبەتەی خۆراک، و گەیاندنی ٦٥،٨٦٤،٠٠٠ لیتر ئاوی خواردنەوە لە هەولێر لە ٢٠٢١.",
      },
      {
        id: "skills",
        title: "گەنجێک کە کارامەیی نوێ بەدەست دەهێنێت",
        body: "٢١ سەنتەری ڕاهێنانی پیشەیی پشتگیریی ٥٨٧،٢١٦ تاکیان کردووە لە ڕێگەی گەشەپێدانی کارامەیی، ڕاهێنان و دەرفەتی کار.",
      },
      {
        id: "cash",
        title: "خێزانێکی کەمدەرامەت کە پاڵپشتیی نەقدی وەردەگرێت",
        body: "دابەشکردنی ١٤١،٤٦٨،٢٦١،٠٠٢ دیناری عێراقی وەک هاوکاریی نەقدی، لەگەڵ بەتانی، پێداویستییەکانی زستانە، دۆشەک و پێداویستییە بەپەلەکانی ناوماڵ.",
      },
      {
        id: "autism",
        title: "منداڵێکی ئۆتیزم کە چاودێری دەکرێت",
        body: "بەرنامەکانی هۆشیاری و پشتگیری، بە ئامانجی ڕاهێنانەوەی ٢٠٠ منداڵی ئۆتیزم، تێکەڵکردنەوەی ١٠٠ منداڵ لە قوتابخانە حکومییەکان و کردنەوەی سێ سەنتەری ئۆتیزم.",
      },
      {
        id: "recovery",
        title: "کۆمەڵگەیەک کە دوای کارەسات دەبوژێتەوە",
        body: "پاڵپشتیی فریاگوزاریی خێرا دوای بوومەلەرزەی ٢٠٢٣ لە تورکیا و سوریا، بە ئامانجی بەهێزکردنی پێنج تیمی بەدەمەوەچوونی کارەسات لە پێنج شوێندا.",
      },
    ],
    changing: "گۆڕینی ژیان",
    livesEveryday: "هەموو ڕۆژێک",
    impactItems: [
      {
        id: "employees",
        value: "1,004",
        title: "کارمەند",
        description: "هەماهەنگی کاری مرۆیی هەموو ڕۆژێک",
      },
      {
        id: "camps",
        value: "191,386",
        title: "کەس لە کەمپ",
        description: "پشتگیریکراو لە ڕێگەی خزمەتگوزارییە ڕێکخراوەکان",
      },
      {
        id: "idps",
        value: "751,948",
        title: "ئاوارە و پەنابەر",
        description: "گەیشتوون لە دەرەوەی کەمپەکان لە کۆمەڵگەکان",
      },
      {
        id: "schools",
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
      { id: "recognition", title: "پێزانین و خەڵاتەکان" },
    ],
    trustLeadershipTitle: "سەرکردایەتی و حوکمڕانی",
    trustFounders: [
      {
        title: "بۆردی دامەزرێنەران",
        subtitle: "باڵاترین دەسەڵاتە لە دەزگاکەدا.",
      },
      {
        title: "دەستەی کارگێڕی",
        subtitle: "سەرپەرشتی بڕیارە سەرەکییەکان و ڕێساکان و ئاڕاستەکردنی پڕۆژەکان دەکات.",
      },
      {
        title: "بەشەکانی ڕاپەڕاندن",
        subtitle: "هەڵسەنگاندن بۆ پێداویستییەکان دەکەن و بەرنامەکان دادەڕێژن.",
      },
      {
        title: "نووسینگە هەرێمییەکان",
        subtitle: "کارەکان لەگەڵ کۆمەڵگە ناوخۆییەکاندا جێبەجێ دەکەن.",
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
        id: "kuwait",
        title: "تۆمارکراو لە کوێت",
        body: "لە ساڵی ٢٠١٩ وەک ڕێکخراوێکی خێرخوازی لە کوێت تۆمارکراوە.",
      },
      {
        id: "iso",
        title: "ISO 9001:2015",
        body: "بڕوانامەی بەڕێوەبردنی کوالیتی: بەرپرسیارێتییەکان ڕوونن، سیستمەکان ڕێکخراون، و خزمەتگوزارییە مرۆییەکان بە کوالیتییەکی جێگیر پێشکەش دەکرێن.",
      },
    ],
    trustPartnershipsTitle: "هاوبەشییەکان",
    trustPartnershipsHint: "هاوبەشە باوەڕپێکراوەکان لەگەڵ BCF",
    trustRecognitionTitle: "پێزانین و خەڵاتەکان",
    trustRecognitionBody:
      "پێزانین ڕەنگدانەوەی متمانەیە، بەڵام بەهای ڕاستەقینەی کاری دەزگای خێرخوازیی بارزانی لەو کۆمەڵگایانەدایە کە هێشتا خزمەتیان دەکات.",
    trustRecognitionItems: [
      {
        id: "awards",
        title: "خەڵاتە مرۆییە نێودەوڵەتییەکان",
        detail:
          "خەڵاتی Sergio de Mello لەلایەن حکومەتی پورتوگالەوە، خەڵاتی ڕێکخراوی باڵەکانی یارمەتی (Wings of Help) ٢٠٢٥، خەڵاتی Helfen Bringt Freude ٢٠٢٥، خەڵاتی پێزانینی لوتکەی خۆبەخشان ٢٠٢٥، و خەڵاتێک لەلایەن حاکمی ئێسن / ئەڵمانیا ٢٠٢٤.",
      },
      {
        id: "certifications",
        title: "پێزانین و بڕوانامەکان",
        detail:
          "پێگەی ڕاوێژکاری لە ئەنجومەنی ئابووری و کۆمەڵایەتیی نەتەوە یەکگرتووەکان (ECOSOC) لە ساڵی ٢٠١٦ەوە، و بڕوانامەی بەڕێوەبردنی کوالیتی ISO 9001:2015.",
      },
      {
        id: "parliament",
        title: "پێزانینی پەرلەمانی",
        detail:
          "خەڵاتی پەرلەمانی فیدراڵی ئەڵمانیا ٢٠٢٥، خەڵاتی پەرلەمانی عێراق بۆ باشترین ڕێکخراوی ناحکومی لە عێراق ٢٠١٥، و خەڵاتی گرووپی کار (Labour Group) لە لەندەن.",
      },
      {
        id: "letters",
        title: "سوپاسنامەکان",
        detail: "چەندین سوپاسنامە و پێزانینی ناوخۆیی و نێودەوڵەتی.",
      },
      {
        id: "timeline",
        title: "هێڵی کاتیی خەڵاتەکان",
        detail: "تۆمارێکی بەڵگەدار بە درێژایی دەیەیەک، لە ٢٠١٥ەوە تا ٢٠٢٥.",
      },
    ],
    futureCircle: "داهاتووی بنیاد دەنێین",
    legacyCircle: "میراتێک کە بەردەوامە",
    legacyTitleWhite: "میراتێک",
    legacyTitleGold: "کە بەردەوامە",
    legacyLead:
      "دەزگای خێرخوازیی بارزانی کە ڕەگی لە ناو خاکی کوردستاندایە و بەو باوەڕەوە هەنگاو دەنێت کە خزمەتکردن شانازییە، بەردەوامە لە پشتگیریکردنی کۆمەڵگا نەدار و کەمدەرامەتەکان لە ڕێگەی بەزەیی، کەرامەت و کارە مرۆییە پیشەییەکانەوە.",
    legacyBridge:
      "لە دابینکردنی خۆراک و پەناگە تا دەگاتە پەروەردە، تەندروستی، پاراستن، ڕاهێنان و بەرپرسیارێتی ژینگەیی، دەزگای خێرخوازیی بارزانی پەیامێک هەڵدەگرێت کە دەگاتە دەرەوەی سنوورەکان:",
    legacyPillars: [
      { id: "service", titleWhite: "خزمەتکردن", titleGold: "کەرامەتە" },
      { id: "humanity", titleWhite: "مرۆڤایەتی", titleGold: "بەرپرسیارێتییە" },
      { id: "hope", titleWhite: "هیوا", titleGold: "لە ڕێگەی کارکردنەوە بنیاد دەنرێت" },
    ],
    legacyThanks: "سوپاس",
    legacyThanksBody: "سوپاس بۆ سەردانیکردنی دەزگای خێرخوازیی بارزانی.",
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
    attractCaption: "إرث من الخدمة.",
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
    quote: "شرفٌ عظيم أن يخدم الإنسان أبناء شعبه.",
    quoteAttr: "— مصطفى بارزاني",
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
        titleGold: "إرث",
        titleWhite: "من الخدمة",
        body: "تأسست مؤسسة بارزاني الخيرية رسمياً عام 2005 في أربيل، عاصمة إقليم كوردستان العراق، لتحوّل التعاطف إلى عمل إنساني منظم.",
      },
      {
        id: "mission",
        titleGold: "الرسالة",
        titleWhite: "",
        body: "تقديم المساعدة الإنسانية لأكثر الفئات ضعفاً، بصرف النظر عن انتمائها العرقي أو الديني أو السياسي، مع تعزيز قيم السلام والكرامة والاستدامة للإنسان والبيئة.",
      },
      {
        id: "vision",
        titleGold: "الرؤية",
        titleWhite: "",
        body: "عالمٌ خالٍ من الفقر والنزوح القسري، يحصل فيه كل إنسان على التعليم والخدمات الأساسية وحقوقه، وبيئة محمية.",
      },
      {
        id: "philosophy",
        titleGold: "الفلسفة",
        titleWhite: "الإنسانية",
        body: "العمل الإنساني ليس إحساناً من الأعلى، بل خدمة بكرامة تُقدَّم للناس كبشر، لا كأرقام.",
      },
      {
        id: "values",
        titleGold: "القيم",
        titleWhite: "التي تقوم عليها الرسالة",
      },
    ],
    storyValuesIntro:
      "تعمل المؤسسة وفق قيم تصوغ عملها الإنساني محلياً ودولياً.",
    storyValues: [
      {
        id: "neutrality",
        title: "الحياد الإنساني",
        body: "تقدّم المؤسسة مساعداتها بناءً على الحاجة فقط، دون تمييز على أساس السياسة أو العرق أو الدين أو الجنس أو الخلفية الاجتماعية.",
      },
      {
        id: "dignity",
        title: "الكرامة في العطاء",
        body: "يُقدَّم الدعم بطريقة تحافظ على كرامة كل شخص واحترام ذاته.",
      },
      {
        id: "resilience",
        title: "الصمود والتمكين",
        body: "لا تتوقف المؤسسة عند حدود الإغاثة الطارئة، بل تساعد المجتمعات على إعادة البناء والتعافي والاعتماد على الذات.",
      },
      {
        id: "coexistence",
        title: "التعايش والانسجام",
        body: "تعزّز المؤسسة التعايش السلمي بين مكوّنات كوردستان العرقية والدينية المتنوعة.",
      },
      {
        id: "vulnerable",
        title: "دعم الفئات الضعيفة",
        body: "تخدم المؤسسة الأسر الفقيرة والنازحين واللاجئين وذوي الإعاقة وكبار السن والأيتام وغيرهم من الفئات المستضعفة.",
      },
      {
        id: "transparency",
        title: "الشفافية",
        body: "تلتزم المؤسسة بالمساءلة أمام المانحين والشركاء والمستفيدين لضمان وصول الموارد إلى مستحقيها.",
      },
    ],
    storyValuesCaptions: [
      "مسرور بارزاني، رئيس مجلس المؤسسين",
      "الخدمة قبل الذات — القيادة تُقاس بما تقدّمه",
      "فلسفة إنسانية انتقلت إلى جيل ثانٍ",
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
    humanStoriesTitle: "قصص إنسانية",
    humanStoriesTagline: "الأرقام تساعدنا على فهم الحجم، والقصص على فهم المعنى.",
    humanStories: [
      {
        id: "school",
        title: "طفل يعود إلى مدرسته",
        body: "ترميم 310 مدارس، وبناء 131 صفاً دراسياً، وتوزيع 362,538 قطعة من المواد المدرسية، مع مشروعين لإعادة الأطفال المتسرّبين إلى المدارس.",
      },
      {
        id: "shelter",
        title: "عائلة تحصل على مأوى",
        body: "توزيع 540 وحدة سكنية على عائلات الشهداء في أربيل وسوران عام 2024، وبناء 20 منزلاً في سنجار، وتوزيع 4,129 خيمة بعد زلزال تركيا وسوريا عام 2023.",
      },
      {
        id: "care",
        title: "مريض يتلقى الرعاية الطبية",
        body: "بناء وافتتاح خمسة مراكز للرعاية الصحية الأولية، وترميم مستشفيات خليفان والبيشمركة والولادة في عقرة، ومشروع جراحة القلب الخلقي عند الأطفال.",
      },
      {
        id: "displaced",
        title: "مجتمع نازح يحصل على الغذاء والماء",
        body: "توزيع 14,429,226 وجبة ساخنة و2,450,099 سلة غذائية، وتوصيل 65,864,000 لتر من مياه الشرب في أربيل عام 2021.",
      },
      {
        id: "skills",
        title: "شاب يكتسب مهارات جديدة",
        body: "21 مركزاً للتدريب المهني دعمت 587,216 شخصاً عبر تطوير المهارات والتدريب ودعم فرص العمل.",
      },
      {
        id: "cash",
        title: "عائلة ضعيفة تحصل على دعم نقدي",
        body: "توزيع 141,468,261,002 ديناراً عراقياً كمساعدات نقدية، إلى جانب البطانيات ومستلزمات الشتاء والفرشات والأدوات المنزلية الطارئة.",
      },
      {
        id: "autism",
        title: "طفل مصاب بالتوحّد يحظى بالرعاية",
        body: "برامج التوعية والدعم، مع أهداف لتأهيل 200 طفل من ذوي التوحّد، ودمج 100 منهم في المدارس الحكومية، وافتتاح ثلاثة مراكز للتوحّد.",
      },
      {
        id: "recovery",
        title: "مجتمع يتعافى بعد كارثة",
        body: "استجابة طارئة سريعة عقب زلزال تركيا وسوريا عام 2023، مع خطة لتعزيز خمسة فرق للاستجابة للكوارث في خمسة مواقع.",
      },
    ],
    changing: "نغيّر الحيوات",
    livesEveryday: "كل يوم",
    impactItems: [
      {
        id: "employees",
        value: "1,004",
        title: "موظفون",
        description: "ينسّقون العمل الإنساني كل يوم",
      },
      {
        id: "camps",
        value: "191,386",
        title: "أشخاص في المخيمات",
        description: "مدعومون عبر خدمات المخيمات المنظمة",
      },
      {
        id: "idps",
        value: "751,948",
        title: "نازحون ولاجئون",
        description: "تم الوصول إليهم خارج المخيمات في المجتمعات",
      },
      {
        id: "schools",
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
      { id: "recognition", title: "التقدير والجوائز" },
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
        id: "kuwait",
        title: "مسجَّلة في الكويت",
        body: "مسجَّلة كمنظمة خيرية في الكويت عام 2019.",
      },
      {
        id: "iso",
        title: "ISO 9001:2015",
        body: "شهادة إدارة الجودة: المسؤوليات واضحة، والأنظمة منظمة، والخدمات الإنسانية تُقدَّم بجودة ثابتة.",
      },
    ],
    trustPartnershipsTitle: "الشراكات",
    trustPartnershipsHint: "شركاء موثوقون يعملون إلى جانب BCF",
    trustRecognitionTitle: "التقدير والجوائز",
    trustRecognitionBody:
      "التقدير يعكس الثقة، لكن القيمة الحقيقية لعمل المؤسسة تكمن في المجتمعات التي ما تزال تخدمها.",
    trustRecognitionItems: [
      {
        id: "awards",
        title: "جوائز إنسانية دولية",
        detail:
          "جائزة سيرجيو دي ميلو من الحكومة البرتغالية، وجائزة منظمة أجنحة العون (Wings of Help) 2025، وجائزة Helfen Bringt Freude 2025، وجائزة قمة المتطوعين التقديرية 2025، وجائزة من محافظ إيسن، ألمانيا، 2024.",
      },
      {
        id: "certifications",
        title: "شهادات التقدير والاعتماد",
        detail:
          "الصفة الاستشارية لدى المجلس الاقتصادي والاجتماعي للأمم المتحدة منذ عام 2016، وشهادة الأيزو ISO 9001:2015 لإدارة الجودة.",
      },
      {
        id: "parliament",
        title: "تكريم برلماني",
        detail:
          "جائزة البرلمان الألماني الاتحادي 2025، وجائزة البرلمان العراقي لأفضل منظمة غير حكومية في العراق 2015، وجائزة مجموعة Labour Group لندن.",
      },
      {
        id: "letters",
        title: "كتب الشكر والتقدير",
        detail: "عدة كتب شكر وتقدير محلية ودولية.",
      },
      {
        id: "timeline",
        title: "خط زمني موثّق للجوائز",
        detail: "سجل موثّق يمتد عقداً كاملاً، من 2015 إلى 2025.",
      },
    ],
    futureCircle: "المستقبل الذي نبنيه",
    legacyCircle: "إرث مستمر",
    legacyTitleWhite: "إرث",
    legacyTitleGold: "مستمر",
    legacyLead:
      "انطلاقاً من جذورها في كوردستان، وإيماناً منها بأن الخدمة شرف، تواصل مؤسسة بارزاني الخيرية دعم المجتمعات الضعيفة بتعاطف وكرامة وعمل إنساني احترافي.",
    legacyBridge:
      "من الغذاء والمأوى إلى التعليم والصحة والحماية وإعادة التأهيل والمسؤولية البيئية، تحمل المؤسسة رسالة تتجاوز الحدود:",
    legacyPillars: [
      { id: "service", titleWhite: "الخدمة", titleGold: "كرامة" },
      { id: "humanity", titleWhite: "الإنسانية", titleGold: "مسؤولية" },
      { id: "hope", titleWhite: "الأمل", titleGold: "يُبنى بالعمل" },
    ],
    legacyThanks: "شكراً لكم",
    legacyThanksBody: "شكراً لزيارتكم تجربة مؤسسة بارزاني الخيرية.",
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
