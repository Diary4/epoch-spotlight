import type { BcfEraId, SectorId } from "@/components/Sections/bcf/bcfProjectData";

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

/**
 * Every place the project register documents, in three groups.
 *
 * The first twelve are pins on the Region map. The next three are the near
 * abroad — two operations across the Syrian border and the rest of Iraq — which
 * the Region map offers as a row beside itself. The last three are countries on
 * the world map, reached from their own country card there.
 */
export type LocationId =
  | "erbil"
  | "duhok"
  | "sulaymaniyah"
  | "kirkuk"
  | "nineveh"
  | "sinjar"
  | "garmian"
  | "halabja"
  | "soran"
  | "zakho"
  | "akre"
  | "amedi"
  | "afrin"
  | "rojava"
  | "iraq"
  | "turkiye"
  | "syria"
  | "lebanon";
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

/**
 * Where We Work opens on the world, because BCF's footprint is not only the
 * Region: it is licensed in four countries, sits at the UN table, and crossed
 * the border into Türkiye and Syria within days of the 2023 earthquakes. The
 * Region map is the second half of that story, not the whole of it.
 */
export type MapScopeId = "global" | "kurdistan";

export type BcfLocation = {
  id: LocationId;
  /** [longitude, latitude] — projected by bcfProjectPin, never hand-placed. */
  coordinates: [number, number];
  filters: MapFilterId[];
};

/** The four kinds of presence the world map distinguishes between. */
export type GlobalReachKind = "hq" | "registered" | "response" | "work";

export type GlobalLocationId =
  | "kurdistan"
  | "unitedKingdom"
  | "ukraine"
  | "serbia"
  | "turkiye"
  | "syria"
  | "lebanon"
  | "morocco"
  | "saudiArabia"
  | "sudan"
  | "yemen"
  | "bangladesh"
  | "australia";

export type BcfGlobalLocation = {
  id: GlobalLocationId;
  /** [longitude, latitude] — projected by the world map, never hand-placed. */
  coordinates: [number, number];
  kind: GlobalReachKind;
  /**
   * ISO 3166-1 numeric, matching the ids in the world topology, so the country
   * the dot sits on can be filled rather than only pricked with a pin.
   */
  iso: string;
  /**
   * Zoom the map flies to when this country is picked, chosen to frame the
   * country. One number for all thirteen cannot work: the zoom that separates
   * Beirut from Damascus puts a single Australian state on the screen.
   */
  focusZoom: number;
};

/**
 * The thirteen countries on BCF's own "geographical area of work in 20 years"
 * map, listed west to east after the HQ. Countries that only ever appeared here
 * as a registration or an award — the United States, Kuwait, Germany, Portugal —
 * are not part of that footprint and are no longer plotted; the awards
 * themselves are carried by the Recognition topic in BcfTrust.
 *
 * One point per country, roughly at its centre rather than on its capital or on
 * an operational city. The dot is a handle for the whole country — the country
 * itself is what gets filled — and centres are what keep the handles apart:
 * Beirut and Damascus are 85km from each other and merged into one dot when
 * both sat on their capitals. Erbil is the exception, because for the HQ the
 * city is the point. The cities a response actually reached are named in the
 * cards, which is where a city belongs at this scale.
 *
 * TODO(bcf): `work` is the honest default for the nine countries the poster
 * added — it claims only what the poster claims. Anything with a documented
 * registration or a dated emergency deployment should be moved to `registered`
 * or `response` once the copy below is filled in.
 */
export const BCF_GLOBAL_LOCATIONS: BcfGlobalLocation[] = [
  { id: "kurdistan", coordinates: [44.009, 36.191], kind: "hq", iso: "368", focusZoom: 4.5 },
  {
    id: "unitedKingdom",
    coordinates: [-2.5, 54.2],
    kind: "registered",
    iso: "826",
    focusZoom: 5,
  },
  { id: "morocco", coordinates: [-6.842, 31.8], kind: "work", iso: "504", focusZoom: 4.5 },
  { id: "serbia", coordinates: [20.457, 44.787], kind: "work", iso: "688", focusZoom: 6.5 },
  { id: "ukraine", coordinates: [31.2, 48.8], kind: "work", iso: "804", focusZoom: 4 },
  { id: "turkiye", coordinates: [35.2, 39.1], kind: "response", iso: "792", focusZoom: 4.5 },
  { id: "lebanon", coordinates: [35.501, 33.888], kind: "work", iso: "422", focusZoom: 7 },
  { id: "syria", coordinates: [38.5, 35], kind: "response", iso: "760", focusZoom: 6 },
  { id: "sudan", coordinates: [30.2, 15.9], kind: "work", iso: "729", focusZoom: 4 },
  { id: "saudiArabia", coordinates: [45.1, 24], kind: "work", iso: "682", focusZoom: 3.6 },
  { id: "yemen", coordinates: [47.5, 15.5], kind: "work", iso: "887", focusZoom: 5.5 },
  { id: "bangladesh", coordinates: [90.407, 23.811], kind: "work", iso: "050", focusZoom: 6.5 },
  { id: "australia", coordinates: [134, -25.5], kind: "work", iso: "036", focusZoom: 2.6 },
];

/**
 * Placeholder body for the nine countries the twenty-year map added. It states
 * only what the map states — that the country is inside the footprint — so the
 * screen never claims a programme, a date or a figure nobody has verified.
 * Replace per country as the real copy arrives; see the TODO in globalLocations.
 */
const WORK_ONLY_EN =
  "One of the countries reached by BCF's humanitarian work over the past twenty years.";
const WORK_ONLY_KU =
  "یەکێکە لەو وڵاتانەی کە کاری مرۆڤدۆستانەی BCF لە ماوەی بیست ساڵی ڕابردوودا گەیشتووەتێ.";
const WORK_ONLY_AR =
  "إحدى الدول التي وصل إليها عمل المؤسسة الإنساني خلال العشرين عاماً الماضية.";

/**
 * The twelve places on the Region map, by their real coordinates — the same
 * projection the governorate outlines are drawn with, so every city lands on
 * its own ground. Five of them were eyeballed onto a photograph before, which
 * put Kirkuk east of Sulaymaniyah and Zakho north-east of Duhok; the seven the
 * project register added could not have been placed that way at all.
 *
 * Rawanduz and Sidakan are not pins of their own. They sit 12 and 71 units from
 * Soran on this artboard — closer together than two labels can be drawn — and
 * they are districts of the Soran administration, so the mobility-aid figures
 * the source lists under their names are carried on Soran's page instead. The
 * Lalish water tank moves to Nineveh, the governorate it is actually in, and
 * the recurring camp support the same page grouped is split between the Erbil
 * and Duhok camp sectors by the camps it names.
 *
 * Filters describe what the source documents for each place: `offices` where
 * BCF reports an office or representative, `camps` where it reports camp
 * management, `emergency` where it reports a dated emergency deployment, and
 * `geographic` for the governorate-level programmes.
 */
export const BCF_LOCATIONS: BcfLocation[] = [
  { id: "erbil", coordinates: [44.009, 36.191], filters: ["offices", "camps", "geographic", "emergency"] },
  { id: "duhok", coordinates: [42.988, 36.868], filters: ["offices", "camps", "geographic"] },
  { id: "sulaymaniyah", coordinates: [45.436, 35.561], filters: ["offices", "geographic"] },
  { id: "kirkuk", coordinates: [44.392, 35.468], filters: ["offices", "geographic"] },
  { id: "nineveh", coordinates: [43.13, 36.345], filters: ["offices", "camps", "geographic"] },
  { id: "sinjar", coordinates: [41.84, 36.32], filters: ["offices", "emergency", "geographic"] },
  { id: "garmian", coordinates: [45.323, 34.629], filters: ["offices", "geographic", "emergency"] },
  { id: "halabja", coordinates: [45.986, 35.178], filters: ["offices", "geographic"] },
  { id: "soran", coordinates: [44.542, 36.652], filters: ["offices", "geographic"] },
  { id: "zakho", coordinates: [42.681, 37.144], filters: ["offices", "emergency"] },
  { id: "akre", coordinates: [43.892, 36.741], filters: ["camps", "geographic"] },
  { id: "amedi", coordinates: [43.487, 37.093], filters: ["offices", "geographic"] },
];

/**
 * The near abroad. Afrin and Western Kurdistan are across the Syrian border —
 * Afrin sits some 1,200 artboard units west of Sinjar, so putting them on the
 * Region map would shrink the Region to a corner of it — and the rest of Iraq
 * is a reporting grouping rather than a point. The Region map offers all three
 * as a row above itself, where they are in reach on a wall panel.
 */
export const BCF_BEYOND_LOCATIONS: LocationId[] = ["rojava", "afrin", "iraq"];

/**
 * Countries on the world map that have a register of their own, so their card
 * can open it. The other ten are on that map because BCF's twenty-year poster
 * puts them there; the poster names no project for them, and a card with
 * nothing behind it should not offer a way in.
 */
export const BCF_GLOBAL_PROJECT_LOCATIONS: Partial<
  Record<GlobalLocationId, LocationId>
> = {
  turkiye: "turkiye",
  syria: "syria",
  lebanon: "lebanon",
};

/**
 * A place on the map.
 *
 * The `projectsStat` / `peopleStat` pair this replaced held invented figures —
 * "+120 projects, 250K people helped" for Erbil, and four more like it, none of
 * which appears in any BCF source. The map card now counts what the register
 * actually holds (sectors, documented entries, the span of years it covers),
 * which is derived from the data at render time and cannot drift away from it.
 */
type LocCopy = {
  name: string;
  /** Short form for the map pin, where the full name will not fit. */
  short: string;
  description: string;
  explore: string;
};

type GlobalLocCopy = {
  name: string;
  /** The year or standing that makes the country part of the footprint. */
  meta: string;
  description: string;
  /** Two or three verifiable lines — the card carries no photography. */
  facts: string[];
};

/** Chrome around the project register — the entries themselves live in bcfProjectData. */
type ProjectsCopy = {
  /** Sector names, keyed by the ids in bcfProjectData. */
  sectors: Record<SectorId, string>;
  /** The four bands the source asks a screen to keep visually distinct. */
  eras: Record<BcfEraId, string>;
  /** Undated year markers, translated where the source used a word not a year. */
  yearMarkers: Record<string, string>;
  sectorsLabel: string;
  /** Singular, for the countries that document exactly one sector. */
  sectorLabel: string;
  /** Plural, and the singular beside it — "1 documented projects" reads as a bug. */
  entriesLabel: string;
  entryLabel: string;
  /** Compact noun for chips, where the full label wraps to three lines. */
  entriesShort: string;
  yearsLabel: string;
  timelineTitle: string;
  /** Header over the row of places that are not on the Region map. */
  beyondTitle: string;
  beyondSubtitle: string;
  /** Framing for the organisation-wide 2025 figure on a sector page. */
  orgTotalLabel: string;
  orgTotalNote: string;
  /** Preface to a `note` on an entry. */
  scopeNote: string;
  sourceNote: string;
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

/**
 * Board Chief — the person behind the first governance card.
 *
 * The four `trustFounders` cards name the layers of the foundation but nobody
 * stands in them, so Leadership reads as an org chart. This is the one profile
 * the chapter opens into: a nameplate, the photography, and the record the
 * office is answerable for.
 */
export type BoardChiefSlideId =
  | "honour"
  | "medal"
  | "gift"
  | "child"
  | "distribution"
  | "ceremony";

/** Caption under the carousel. Describes the photograph, nothing beyond it. */
export type BoardChiefSlide = {
  id: BoardChiefSlideId;
  caption: string;
};

export type BoardChiefMilestoneId =
  | "founded"
  | "ecosoc"
  | "kuwait"
  | "earthquake"
  | "homes"
  | "awards";

/**
 * One node on the governance timeline. Every entry restates a fact the rest of
 * this file already carries (founding, credentials, recognition, human stories)
 * — a museum wall may not introduce a claim it cannot source.
 */
export type BoardChiefMilestone = {
  id: BoardChiefMilestoneId;
  year: string;
  title: string;
  body: string;
};

export type BoardChiefCopy = {
  /** Label on the card that opens the profile, on the Leadership screen. */
  open: string;
  name: string;
  role: string;
  /** Third nameplate line — the institution, not a term of service. */
  meta: string;
  intro: string;
  slides: BoardChiefSlide[];
  /** Heading over the two governance bodies the chief sits with. */
  alongside: string;
  timelineCta: string;
  timelineTitle: string;
  timelineRange: string;
  timelineMilestones: BoardChiefMilestone[];
};

/** BCF President profile — same shape as the Board Chief, detail filled later. */
export type BcfPresidentCopy = {
  open: string;
  name: string;
  role: string;
  meta: string;
  intro: string;
  timelineCta: string;
  timelineTitle: string;
  timelineRange: string;
  timelinePlaceholder: string;
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

export type StorySectionId = "foundation" | "mission" | "vision" | "philosophy";

export type StorySection = {
  id: StorySectionId;
  titleGold: string;
  titleWhite: string;
  body?: string;
};

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
  whereWeWork: string;
  across: string;
  borders: string;
  filters: Record<MapFilterId, string>;
  tapToExplore: string;
  locations: Record<LocationId, LocCopy>;
  mapScopes: Record<MapScopeId, string>;
  globalLead: string;
  globalZoomHint: string;
  zoomIn: string;
  zoomOut: string;
  resetView: string;
  globalKinds: Record<GlobalReachKind, string>;
  globalLocations: Record<GlobalLocationId, GlobalLocCopy>;
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
  boardChief: BoardChiefCopy;
  bcfPresident: BcfPresidentCopy;
  trustQualityTitle: string;
  trustCredentials: TrustCredential[];
  trustPartnershipsTitle: string;
  trustPartnershipsHint: string;
  trustPartnersLabel: string;
  trustDonorsLabel: string;
  trustSponsorsLabel: string;
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
  projects: ProjectsCopy;
};

/**
 * Sector names.
 *
 * The recap prints combined headings — "Disability / Protection", "Cash /
 * Orphans / Nujin", "NFI / Livelihood" — that differ from city to city. The
 * entries beneath them are filed onto these fourteen sectors in
 * bcfProjectData, so "Health" means the same thing on Erbil's page as on
 * Afrin's and a visitor can compare two cities without re-reading a heading.
 */
const SECTORS_EN: Record<SectorId, string> = {
  emergency: "Emergency Response",
  food: "Food Security",
  health: "Health",
  education: "Education & Development",
  shelter: "Shelter & Housing",
  wash: "Water & Sanitation",
  camp: "Camp Management",
  nfi: "Non-Food Items",
  disability: "Disability Support",
  protection: "Protection",
  livelihood: "Livelihood",
  cash: "Cash & Orphans",
  environment: "Environment",
  community: "Community Support",
};

const SECTORS_KU: Record<SectorId, string> = {
  emergency: "وەڵامدانەوەی فریاکەوتن",
  food: "دڵنیایی خۆراک",
  health: "تەندروستی",
  education: "پەروەردە و گەشەپێدان",
  shelter: "پەناگە و نیشتەجێبوون",
  wash: "ئاو و خاوێنکاری",
  camp: "بەڕێوەبردنی کەمپ",
  nfi: "کەلوپەلی ناخۆراکی",
  disability: "پشتگیری کەمئەندامان",
  protection: "پاراستن",
  livelihood: "بژێوی",
  cash: "پارە و هەتیوان",
  environment: "ژینگە",
  community: "پشتگیری کۆمەڵگا",
};

const SECTORS_AR: Record<SectorId, string> = {
  emergency: "الاستجابة الطارئة",
  food: "الأمن الغذائي",
  health: "الصحة",
  education: "التعليم والتطوير",
  shelter: "المأوى والإسكان",
  wash: "المياه والإصحاح",
  camp: "إدارة المخيمات",
  nfi: "المواد غير الغذائية",
  disability: "دعم ذوي الإعاقة",
  protection: "الحماية",
  livelihood: "سبل العيش",
  cash: "النقد والأيتام",
  environment: "البيئة",
  community: "دعم المجتمع",
};

/**
 * The four bands. `latest` and `current` say different things and must not be
 * collapsed: 2025 is a closed annual dataset, 2026 is a run of dated updates
 * through July and not a year's total.
 */
const ERAS_EN: Record<BcfEraId, string> = {
  historic: "Historic",
  annual: "Annual reports 2020-24",
  latest: "2025 — latest complete year",
  current: "2026 — current",
};

const ERAS_KU: Record<BcfEraId, string> = {
  historic: "مێژوویی",
  annual: "ڕاپۆرتی ساڵانە ٢٠٢٠-٢٤",
  latest: "٢٠٢٥ — دوایین ساڵی تەواو",
  current: "٢٠٢٦ — ئێستا",
};

const ERAS_AR: Record<BcfEraId, string> = {
  historic: "تاريخي",
  annual: "التقارير السنوية ٢٠٢٠-٢٤",
  latest: "٢٠٢٥ — آخر سنة كاملة",
  current: "٢٠٢٦ — الحالي",
};

/**
 * Where the source names a project without a date it uses a word, not a year.
 * Those words are the only ones that need translating — an actual year renders
 * as itself.
 */
const YEAR_MARKERS_EN: Record<string, string> = {
  Historic: "Historic",
  "Multi-year": "Multi-year",
  Ongoing: "Ongoing",
};

const YEAR_MARKERS_KU: Record<string, string> = {
  Historic: "مێژوویی",
  "Multi-year": "چەند ساڵە",
  Ongoing: "بەردەوام",
};

const YEAR_MARKERS_AR: Record<string, string> = {
  Historic: "تاريخي",
  "Multi-year": "متعدد السنوات",
  Ongoing: "مستمر",
};

const projectsEn: ProjectsCopy = {
  sectors: SECTORS_EN,
  eras: ERAS_EN,
  yearMarkers: YEAR_MARKERS_EN,
  sectorsLabel: "Sectors",
  sectorLabel: "Sector",
  entriesLabel: "Documented projects",
  entryLabel: "Documented project",
  entriesShort: "projects",
  yearsLabel: "Years documented",
  timelineTitle: "Documented years",
  beyondTitle: "Beyond the Region",
  beyondSubtitle: "Work BCF documents outside the Kurdistan Region map.",
  orgTotalLabel: "Reached in 2025",
  orgTotalNote:
    "Organisation-wide individuals for this sector in 2025, published by BCF in January 2026. Not a figure for this location.",
  scopeNote: "Scope",
  sourceNote:
    "Paraphrased from official BCF annual reports, the cumulative 2005-2024 report, and BCF website updates verified in August 2026.",
};

const projectsKu: ProjectsCopy = {
  sectors: SECTORS_KU,
  eras: ERAS_KU,
  yearMarkers: YEAR_MARKERS_KU,
  sectorsLabel: "کەرتەکان",
  sectorLabel: "کەرت",
  entriesLabel: "پڕۆژەی تۆمارکراو",
  entryLabel: "پڕۆژەی تۆمارکراو",
  entriesShort: "پڕۆژە",
  yearsLabel: "ساڵانی تۆمارکراو",
  timelineTitle: "ساڵانی تۆمارکراو",
  beyondTitle: "لە دەرەوەی هەرێم",
  beyondSubtitle: "ئەو کارانەی BCF لە دەرەوەی نەخشەی هەرێمی کوردستان تۆماری کردوون.",
  orgTotalLabel: "گەیشتووە لە ٢٠٢٥",
  orgTotalNote:
    "کۆی گشتی کەسان بۆ ئەم کەرتە لە ٢٠٢٥ لە ئاستی دامەزراوەدا، لە کانوونی دووەمی ٢٠٢٦ بڵاوکراوەتەوە. ژمارەی ئەم شوێنە نییە.",
  scopeNote: "مەودا",
  sourceNote:
    "لە ڕاپۆرتە ساڵانە فەرمییەکانی BCF، ڕاپۆرتی کۆی ٢٠٠٥-٢٠٢٤ و نوێکارییەکانی ماڵپەڕ کە لە ئابی ٢٠٢٦ پشتڕاست کراونەتەوە.",
};

const projectsAr: ProjectsCopy = {
  sectors: SECTORS_AR,
  eras: ERAS_AR,
  yearMarkers: YEAR_MARKERS_AR,
  sectorsLabel: "القطاعات",
  sectorLabel: "قطاع",
  entriesLabel: "مشاريع موثّقة",
  entryLabel: "مشروع موثّق",
  entriesShort: "مشاريع",
  yearsLabel: "السنوات الموثّقة",
  timelineTitle: "السنوات الموثّقة",
  beyondTitle: "خارج الإقليم",
  beyondSubtitle: "أعمال توثّقها المؤسسة خارج خريطة إقليم كردستان.",
  orgTotalLabel: "تم الوصول إليهم في ٢٠٢٥",
  orgTotalNote:
    "إجمالي الأفراد لهذا القطاع على مستوى المؤسسة في ٢٠٢٥، نشرته المؤسسة في كانون الثاني ٢٠٢٦. ليس رقماً لهذا الموقع.",
  scopeNote: "النطاق",
  sourceNote:
    "مُعاد صياغته من التقارير السنوية الرسمية للمؤسسة، وتقرير ٢٠٠٥-٢٠٢٤ التراكمي، وتحديثات الموقع التي جرى التحقق منها في آب ٢٠٢٦.",
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
    mapScopes: {
      global: "Globally",
      kurdistan: "Inside Kurdistan",
    },
    globalLead:
      "Thirteen countries in twenty years, all run from Erbil.",
    globalZoomHint: "Drag to move · pinch to zoom",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    resetView: "Reset view",
    globalKinds: {
      hq: "Headquarters",
      registered: "Licensed",
      response: "Emergency",
      work: "Area of work",
    },
    globalLocations: {
      kurdistan: {
        name: "Kurdistan Region, Iraq",
        meta: "Since 2005",
        description:
          "Founded in Erbil and licensed in both the Republic of Iraq and the Kurdistan Region, this is where every programme is designed, staffed and run from.",
        facts: [
          "Offices in Erbil, Duhok, Zakho, Kirkuk and Sulaymaniyah",
          "ISO 9001:2015 quality-management certification",
        ],
      },
      unitedKingdom: {
        name: "United Kingdom",
        meta: "Charity Commission",
        description:
          "Recognized under the UK Charity Commission framework, reinforcing standards of governance, reporting and public trust.",
        facts: [
          "Governance and reporting to UK charity standards",
          "Labour Group London Award",
        ],
      },
      turkiye: {
        name: "Türkiye",
        meta: "Earthquake response, 2023",
        description:
          "Rapid emergency support after the February 2023 earthquakes, with relief moving across the border within days of the first tremor.",
        facts: [
          "4,129 tents provided to displaced families across Türkiye and Syria",
          "Five disaster-response teams planned across five locations",
        ],
      },
      syria: {
        name: "Syria",
        meta: "Earthquake response, 2023",
        description:
          "Shelter and emergency relief for families displaced by the 2023 earthquakes in northern Syria.",
        facts: [
          "Tents, blankets and winter supplies for displaced families",
          "Delivered alongside the response in Türkiye",
        ],
      },
      /* TODO(bcf): the nine entries below carry only what the twenty-year map
         itself states. Each needs its real meta line, description and facts —
         until then they say nothing that is not on the poster. */
      ukraine: {
        name: "Ukraine",
        meta: "Area of work",
        description: WORK_ONLY_EN,
        facts: [],
      },
      serbia: {
        name: "Serbia",
        meta: "Area of work",
        description: WORK_ONLY_EN,
        facts: [],
      },
      lebanon: {
        name: "Lebanon",
        meta: "Area of work",
        description: WORK_ONLY_EN,
        facts: [],
      },
      morocco: {
        name: "Morocco",
        meta: "Area of work",
        description: WORK_ONLY_EN,
        facts: [],
      },
      saudiArabia: {
        name: "Saudi Arabia",
        meta: "Area of work",
        description: WORK_ONLY_EN,
        facts: [],
      },
      sudan: {
        name: "Sudan",
        meta: "Area of work",
        description: WORK_ONLY_EN,
        facts: [],
      },
      yemen: {
        name: "Yemen",
        meta: "Area of work",
        description: WORK_ONLY_EN,
        facts: [],
      },
      bangladesh: {
        name: "Bangladesh",
        meta: "Area of work",
        description: WORK_ONLY_EN,
        facts: [],
      },
      australia: {
        name: "Australia",
        meta: "Area of work",
        description: WORK_ONLY_EN,
        facts: [],
      },
    },
    locations: {
      erbil: {
        name: "Erbil",
        short: "Erbil",
        description:
          "The headquarters governorate, and the broadest register BCF keeps: food, schools, water, camps, housing and the Center of Excellence for Complex Care.",
        explore: "Explore Projects",
      },
      duhok: {
        name: "Duhok",
        short: "Duhok",
        description:
          "Twenty camps at the 2021 peak, the 420-unit Roj City housing project, and the free-bread bakeries running through the districts in 2026.",
        explore: "Explore Projects",
      },
      sulaymaniyah: {
        name: "Sulaymaniyah",
        short: "Sulaymaniyah",
        description:
          "Fifty of the 203 renovated schools, recurring Qurbani and Ramadan food, and cash projects reaching families through the office in 2026.",
        explore: "Explore Projects",
      },
      kirkuk: {
        name: "Kirkuk",
        short: "Kirkuk",
        description:
          "The largest single share of the 203-school renovation programme, alongside food, disability and coexistence projects across a mixed governorate.",
        explore: "Explore Projects",
      },
      nineveh: {
        name: "Nineveh / Mosul",
        short: "Mosul",
        description:
          "Nearly half a million hot meals in 2022, ten camps under management, and patient transport out of the East Mosul camps to hospitals in Erbil and Mosul.",
        explore: "Explore Projects",
      },
      sinjar: {
        name: "Sinjar / Shingal",
        short: "Sinjar",
        description:
          "Where BCF's emergency work begins — the 2007 bombing response, the 2014 helicopter airlift to the mountain, and the houses built there since.",
        explore: "Explore Projects",
      },
      garmian: {
        name: "Garmian / Kalar",
        short: "Garmian",
        description:
          "Food, disability and cash programmes across Kalar, Kifri, Khanaqin, Rizgari and Darbandikhan, with flood relief in 2024.",
        explore: "Explore Projects",
      },
      halabja: {
        name: "Halabja",
        short: "Halabja",
        description:
          "COVID-19 support to the health directorate, eleven renovated schools, a kindergarten opened in 2023, and continuing orphan-family assistance.",
        explore: "Explore Projects",
      },
      soran: {
        name: "Soran",
        short: "Soran",
        description:
          "Five renovated schools, a share of the martyrs' housing distribution, and autism-awareness work at the Mother Community Center.",
        explore: "Explore Projects",
      },
      zakho: {
        name: "Zakho",
        short: "Zakho",
        description:
          "Winter heaters and flood response on the border, a five-month literacy project for refugee children, and mosque carpets across the administration.",
        explore: "Explore Projects",
      },
      akre: {
        name: "Akre",
        short: "Akre",
        description:
          "Camp food parcels through German Caritas, 10,000 oak saplings planted in 2021, and the maternity hospital renovation recorded in the cumulative report.",
        explore: "Explore Projects",
      },
      amedi: {
        name: "Amedi / Shiladze / Dereluk / Sarsang",
        short: "Amedi",
        description:
          "The Smile Center with Caritas Germany, special-care and autism activities, and food baskets across the mountain townships.",
        explore: "Explore Projects",
      },
      afrin: {
        name: "Afrin",
        short: "Afrin",
        description:
          "A standing programme in Syria: the mobile clinic, the Barzani Culture & Development Center, university student support, and 192 sponsored orphans.",
        explore: "Explore Projects",
      },
      rojava: {
        name: "Western Kurdistan / Rojava",
        short: "Rojava",
        description:
          "BCF's largest current cross-border operation — 415 truckloads, 29,070 families, flour for 3.36 million loaves, diesel, medicine and jobs.",
        explore: "Explore Projects",
      },
      iraq: {
        name: "Other Iraqi Governorates",
        short: "Iraq",
        description:
          "Food and medical work reaching Baghdad, Diyala, Dhi Qar, Anbar and Samawah — 493,380 individuals in Iraq outside the Region in 2025.",
        explore: "Explore Projects",
      },
      turkiye: {
        name: "Türkiye",
        short: "Türkiye",
        description:
          "The Van camp built with 400 caravans, and the 2023 earthquake response that crossed the border within days with rescue teams, hot meals and tents.",
        explore: "Explore Projects",
      },
      syria: {
        name: "Syria",
        short: "Syria",
        description:
          "Where the earthquake response and the Afrin programme expanded BCF's work, and where the Western Kurdistan operation now runs.",
        explore: "Explore Projects",
      },
      lebanon: {
        name: "Lebanon",
        short: "Lebanon",
        description:
          "Tents provided in Mam Rashan Camp to welcome Lebanese Kurds displaced by the regional crisis.",
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
    boardChief: {
      open: "Meet the Board Chief",
      name: "Masrour Barzani",
      role: "President of the Board of Founders",
      meta: "Barzani Charity Foundation · Established 2005",
      intro:
        "The Board of Founders is the highest authority of the foundation, and its president sets the standard the work is held to: aid given on need alone, delivered in a way that protects the dignity of the person receiving it.",
      slides: [
        {
          id: "honour",
          caption:
            "Honouring a mother at a BCF handover ceremony for the families of martyrs in Duhok.",
        },
        {
          id: "medal",
          caption:
            "A commemorative medal presented to a family at the same ceremony, beneath the foundation's seal.",
        },
        {
          id: "gift",
          caption:
            "Kneeling to hand a gift to a child on stage — the work measured one person at a time.",
        },
        {
          id: "child",
          caption:
            "A moment with a child away from the podium, in a foundation whose philosophy is service, not charity from above.",
        },
        {
          id: "distribution",
          caption:
            "Meeting children at a BCF distribution site, where the programmes reach families directly.",
        },
        {
          id: "ceremony",
          caption:
            "Seated with officials, partners and faith leaders — coexistence among Kurdistan's communities is one of the six values BCF works by.",
        },
      ],
      alongside: "Alongside the Board",
      timelineCta: "View Governance Timeline",
      timelineTitle: "Board of Founders",
      timelineRange: "2005 — Present",
      timelineMilestones: [
        {
          id: "founded",
          year: "2005",
          title: "Founded in Erbil",
          body: "BCF is officially established in Erbil, capital of the Kurdistan Region of Iraq, to turn compassion into organized humanitarian action.",
        },
        {
          id: "ecosoc",
          year: "2016",
          title: "A seat at the UN table",
          body: "Special consultative status with the United Nations Economic and Social Council, affirming BCF's role in international humanitarian dialogue.",
        },
        {
          id: "kuwait",
          year: "2019",
          title: "Registered in Kuwait",
          body: "Registered as a charity organization in Kuwait, extending BCF's licensed humanitarian presence across the region.",
        },
        {
          id: "earthquake",
          year: "2023",
          title: "Across the border, in days",
          body: "Rapid emergency support after the earthquakes in Turkey and Syria, including 4,129 tents provided to displaced families.",
        },
        {
          id: "homes",
          year: "2024",
          title: "Homes for the families of martyrs",
          body: "540 residential units distributed to the families of martyrs in Erbil and Soran.",
        },
        {
          id: "awards",
          year: "2025",
          title: "Recognized abroad",
          body: "The German Federal Parliament Award, the Wings of Help Organization Award and the Helfen Bringt Freude Award.",
        },
      ],
    },
    bcfPresident: {
      open: "Meet the BCF President",
      name: "Mousa Ahmed Agha Tajaldeen",
      role: "BCF President",
      meta: "Barzani Charity Foundation",
      intro:
        "Leading the foundation's day-to-day humanitarian work — detail for this profile will follow.",
      timelineCta: "View Timeline",
      timelineTitle: "BCF Presidency",
      timelineRange: "—",
      timelinePlaceholder: "Timeline details will be added soon.",
    },
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
    trustPartnershipsHint:
      "Partners, donors and sponsors who stand with BCF",
    trustPartnersLabel: "Partners",
    trustDonorsLabel: "Donors",
    trustSponsorsLabel: "Sponsors",
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
    mapScopes: {
      global: "جیهانی",
      kurdistan: "لە ناو کوردستان",
    },
    globalLead:
      "سیازدە وڵات لە بیست ساڵدا، هەموویان لە هەولێرەوە بەڕێوە دەبرێن.",
    globalZoomHint: "ڕایبکێشە بۆ جوڵاندن · بیگوشە بۆ نزیکبوونەوە",
    zoomIn: "نزیکبوونەوە",
    zoomOut: "دوورکەوتنەوە",
    resetView: "گەڕانەوە بۆ دیمەنی سەرەتا",
    globalKinds: {
      hq: "بارەگا",
      registered: "مۆڵەتدار",
      response: "فریاکەوتن",
      work: "ناوچەی کار",
    },
    globalLocations: {
      kurdistan: {
        name: "هەرێمی کوردستان، عێراق",
        meta: "لە ٢٠٠٥ەوە",
        description:
          "لە هەولێر دامەزراوە و لە کۆماری عێراق و هەرێمی کوردستان مۆڵەتی هەیە؛ لێرەوە هەموو بەرنامەیەک دادەڕێژرێت و بەڕێوە دەبرێت.",
        facts: [
          "ئۆفیس لە هەولێر، دهۆک، زاخۆ، کەرکوک و سلێمانی",
          "بڕوانامەی بەڕێوەبردنی جۆرایەتی ISO 9001:2015",
        ],
      },
      unitedKingdom: {
        name: "شانشینی یەکگرتوو",
        meta: "لیژنەی خێرخوازی بەریتانیا",
        description:
          "لە چوارچێوەی لیژنەی خێرخوازی بەریتانیا دانی پێدا نراوە، کە ستانداردی حوکمڕانی، ڕاپۆرتکردن و متمانەی گشتی بەهێز دەکات.",
        facts: [
          "حوکمڕانی و ڕاپۆرتکردن بەپێی ستانداردی خێرخوازی بەریتانیا",
          "خەڵاتی گرووپی کرێکاری لەندەن",
        ],
      },
      turkiye: {
        name: "تورکیا",
        meta: "وەڵامدانەوەی بوومەلەرزە، ٢٠٢٣",
        description:
          "پشتگیری فریاکەوتنی خێرا دوای بوومەلەرزەکانی شوباتی ٢٠٢٣، کە یارمەتی لە ماوەی چەند ڕۆژێکدا لە سنوور پەڕییەوە.",
        facts: [
          "٤,١٢٩ چادر بۆ خێزانە ئاوارەکان لە تورکیا و سووریا",
          "پلانی پێنج تیمی وەڵامدانەوەی کارەسات لە پێنج شوێن",
        ],
      },
      syria: {
        name: "سووریا",
        meta: "وەڵامدانەوەی بوومەلەرزە، ٢٠٢٣",
        description:
          "سەرپەناو یارمەتی فریاکەوتن بۆ ئەو خێزانانەی بە بوومەلەرزەکانی ٢٠٢٣ لە باکووری سووریا ئاوارە بوون.",
        facts: [
          "چادر، بەتانی و پێداویستی زستانە بۆ خێزانە ئاوارەکان",
          "لەگەڵ وەڵامدانەوەکەی تورکیا پێکەوە گەیەنرا",
        ],
      },
      ukraine: { name: "ئۆکرانیا", meta: "ناوچەی کار", description: WORK_ONLY_KU, facts: [] },
      serbia: { name: "سربیا", meta: "ناوچەی کار", description: WORK_ONLY_KU, facts: [] },
      lebanon: { name: "لوبنان", meta: "ناوچەی کار", description: WORK_ONLY_KU, facts: [] },
      morocco: { name: "مەغریب", meta: "ناوچەی کار", description: WORK_ONLY_KU, facts: [] },
      saudiArabia: {
        name: "عەرەبستانی سعودی",
        meta: "ناوچەی کار",
        description: WORK_ONLY_KU,
        facts: [],
      },
      sudan: { name: "سودان", meta: "ناوچەی کار", description: WORK_ONLY_KU, facts: [] },
      yemen: { name: "یەمەن", meta: "ناوچەی کار", description: WORK_ONLY_KU, facts: [] },
      bangladesh: {
        name: "بەنگلادیش",
        meta: "ناوچەی کار",
        description: WORK_ONLY_KU,
        facts: [],
      },
      australia: { name: "ئۆسترالیا", meta: "ناوچەی کار", description: WORK_ONLY_KU, facts: [] },
    },
    locations: {
      erbil: {
        name: "هەولێر",
        short: "هەولێر",
        description:
          "پارێزگای بارەگای سەرەکی و فراوانترین تۆمار: خۆراک، قوتابخانە، ئاو، کەمپ، نیشتەجێبوون و ناوەندی نایابی چاودێری ئاڵۆز.",
        explore: "پڕۆژەکان ببینە",
      },
      duhok: {
        name: "دهۆک",
        short: "دهۆک",
        description:
          "بیست کەمپ لە لووتکەی ٢٠٢١، پڕۆژەی نیشتەجێبوونی ٤٢٠ یەکەی شاری ڕۆژ، و نانەواخانە بێبەرامبەرەکانی ٢٠٢٦ بەناو قەزاکاندا.",
        explore: "پڕۆژەکان ببینە",
      },
      sulaymaniyah: {
        name: "سلێمانی",
        short: "سلێمانی",
        description:
          "پەنجا لە ٢٠٣ قوتابخانەی نۆژەنکراوە، خۆراکی قوربانی و ڕەمەزانی بەردەوام، و پڕۆژەی پارەیی بۆ خێزانەکان لە ٢٠٢٦.",
        explore: "پڕۆژەکان ببینە",
      },
      kirkuk: {
        name: "کەرکوک",
        short: "کەرکوک",
        description:
          "گەورەترین بەشی پڕۆژەی نۆژەنکردنەوەی ٢٠٣ قوتابخانە، لەگەڵ پڕۆژەی خۆراک، کەمئەندامی و پێکەوەژیان.",
        explore: "پڕۆژەکان ببینە",
      },
      nineveh: {
        name: "نەینەوا / مووسڵ",
        short: "مووسڵ",
        description:
          "نزیکەی نیو ملیۆن ژەمی گەرم لە ٢٠٢٢، دە کەمپ لەژێر بەڕێوەبردن، و گواستنەوەی نەخۆشان بۆ نەخۆشخانەکانی هەولێر و مووسڵ.",
        explore: "پڕۆژەکان ببینە",
      },
      sinjar: {
        name: "شنگال",
        short: "شنگال",
        description:
          "لێرەوە کاری فریاکەوتنی BCF دەست پێدەکات — وەڵامدانەوەی بۆمبارانی ٢٠٠٧، هەڵگرتنی ٢٠١٤ بۆ چیا، و ئەو ماڵانەی لەدوایدا دروستکران.",
        explore: "پڕۆژەکان ببینە",
      },
      garmian: {
        name: "گەرمیان / کەلار",
        short: "گەرمیان",
        description:
          "پڕۆژەی خۆراک، کەمئەندامی و پارە لە کەلار، کفری، خانەقین، ڕزگاری و دەربەندیخان، لەگەڵ فریاکەوتنی لافاوی ٢٠٢٤.",
        explore: "پڕۆژەکان ببینە",
      },
      halabja: {
        name: "هەڵەبجە",
        short: "هەڵەبجە",
        description:
          "پشتگیری کۆڤید-١٩ بۆ بەڕێوەبەرایەتی تەندروستی، یازدە قوتابخانەی نۆژەنکراوە، باخچەیەکی منداڵان لە ٢٠٢٣، و یارمەتی بەردەوامی خێزانی هەتیوان.",
        explore: "پڕۆژەکان ببینە",
      },
      soran: {
        name: "سۆران",
        short: "سۆران",
        description:
          "پێنج قوتابخانەی نۆژەنکراوە، بەشێک لە دابەشکردنی نیشتەجێبوونی شەهیدان، و کاری ئاگاداری ئۆتیزم لە ناوەندی کۆمەڵایەتی دایک.",
        explore: "پڕۆژەکان ببینە",
      },
      zakho: {
        name: "زاخۆ",
        short: "زاخۆ",
        description:
          "سۆبەی زستان و وەڵامدانەوەی لافاو لەسەر سنوور، پڕۆژەی پێنج مانگی خوێندەواری بۆ منداڵانی پەنابەر، و فەرشی مزگەوتەکان.",
        explore: "پڕۆژەکان ببینە",
      },
      akre: {
        name: "ئاکرێ",
        short: "ئاکرێ",
        description:
          "پاکێتی خۆراکی کەمپ لە ڕێگەی کاریتاسی ئەڵمانیا، ڕواندنی ١٠٬٠٠٠ نەمامی دار بەڕوو لە ٢٠٢١، و نۆژەنکردنەوەی نەخۆشخانەی لەدایکبوون.",
        explore: "پڕۆژەکان ببینە",
      },
      amedi: {
        name: "ئامێدی / شێلادزێ / دەرەلوک / سەرسنگ",
        short: "ئامێدی",
        description:
          "ناوەندی زەردەخەنە لەگەڵ کاریتاسی ئەڵمانیا، چالاکی چاودێری تایبەت و ئۆتیزم، و سەبەتەی خۆراک بەناو شارۆچکە شاخاوییەکاندا.",
        explore: "پڕۆژەکان ببینە",
      },
      afrin: {
        name: "عەفرین",
        short: "عەفرین",
        description:
          "بەرنامەیەکی چەسپاو لە سووریا: کلینیکی گەڕۆک، ناوەندی کولتوور و گەشەپێدانی بارزانی، پشتگیری خوێندکاران، و ١٩٢ هەتیوی سەرپەرشتیکراو.",
        explore: "پڕۆژەکان ببینە",
      },
      rojava: {
        name: "ڕۆژئاوای کوردستان",
        short: "ڕۆژئاوا",
        description:
          "گەورەترین کاری ئێستای BCF لە دەرەوەی سنوور — ٤١٥ بارهەڵگر، ٢٩٬٠٧٠ خێزان، ئارد بۆ ٣٫٣٦ ملیۆن نان، گازۆیل، دەرمان و کار.",
        explore: "پڕۆژەکان ببینە",
      },
      iraq: {
        name: "پارێزگاکانی دیکەی عێراق",
        short: "عێراق",
        description:
          "کاری خۆراک و پزیشکی لە بەغدا، دیالە، زیقار، ئەنبار و سەماوە — ٤٩٣٬٣٨٠ کەس لە عێراق لە دەرەوەی هەرێم لە ٢٠٢٥.",
        explore: "پڕۆژەکان ببینە",
      },
      turkiye: {
        name: "تورکیا",
        short: "تورکیا",
        description:
          "کەمپی وان بە ٤٠٠ کاروان، و وەڵامدانەوەی بوومەلەرزەی ٢٠٢٣ کە لە ماوەی چەند ڕۆژێکدا بە تیمی ڕزگارکردن، ژەمی گەرم و چادرەوە پەڕییەوە.",
        explore: "پڕۆژەکان ببینە",
      },
      syria: {
        name: "سووریا",
        short: "سووریا",
        description:
          "لێرەدا وەڵامدانەوەی بوومەلەرزە و بەرنامەی عەفرین کاری BCF فراوان کرد، و ئێستا کاری ڕۆژئاوای کوردستان لێرەدا بەڕێوەدەچێت.",
        explore: "پڕۆژەکان ببینە",
      },
      lebanon: {
        name: "لوبنان",
        short: "لوبنان",
        description:
          "چادر لە کەمپی مام ڕەشان بۆ پێشوازی لە کوردە لوبنانییەکان کە بەهۆی قەیرانی ناوچەکەوە ئاوارە بوون.",
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
    boardChief: {
      open: "ناسینی سەرۆکی بۆرد",
      name: "مەسرور بارزانی",
      role: "سەرۆکی بۆردی دامەزرێنەران",
      meta: "دەزگای خێرخوازیی بارزانی · دامەزراوە لە ٢٠٠٥",
      intro:
        "بۆردی دامەزرێنەران باڵاترین دەسەڵاتە لە دەزگاکەدا، و سەرۆکەکەی ئەو پێوەرە دادەنێت کە کارەکە پێوەی هەڵدەسەنگێنرێت: هاوکاری تەنها لەسەر بنەمای پێویستی دەدرێت، و بە شێوەیەک پێشکەش دەکرێت کە کەرامەتی ئەو کەسە بپارێزێت کە وەریدەگرێت.",
      slides: [
        {
          id: "honour",
          caption:
            "ڕێزلێنان لە دایکێک لە ڕێوڕەسمی پێشکەشکردنی خانوو بۆ خێزانی شەهیدان لە دهۆک.",
        },
        {
          id: "medal",
          caption:
            "پێشکەشکردنی مەدالیای یادەوەری بە خێزانێک لە هەمان ڕێوڕەسم، لەژێر ئاڵای دەزگاکەدا.",
        },
        {
          id: "gift",
          caption:
            "چۆکدادان بۆ پێشکەشکردنی دیارییەک بە منداڵێک لەسەر شانۆ — کارەکە بە یەک کەس یەک کەس دەپێورێت.",
        },
        {
          id: "child",
          caption:
            "ساتێک لەگەڵ منداڵێک دوور لە منبەر، لە دەزگایەکدا کە فەلسەفەکەی خزمەتکردنە، نەک بەخشین لە سەرەوە.",
        },
        {
          id: "distribution",
          caption:
            "بینینی منداڵان لە شوێنێکی دابەشکردنی دەزگاکە، لەوێدا بەرنامەکان ڕاستەوخۆ دەگەنە خێزانەکان.",
        },
        {
          id: "ceremony",
          caption:
            "دانیشتن لەگەڵ بەرپرسان و هاوبەشان و پێشەوایانی ئایینی — پێکەوەژیانی کۆمەڵگەکانی کوردستان یەکێکە لەو شەش بەهایەی دەزگاکە پێی کار دەکات.",
        },
      ],
      alongside: "لەپاڵ بۆردەکە",
      timelineCta: "بینینی هێڵی کاتی حوکمڕانی",
      timelineTitle: "بۆردی دامەزرێنەران",
      timelineRange: "٢٠٠٥ — ئێستا",
      timelineMilestones: [
        {
          id: "founded",
          year: "٢٠٠٥",
          title: "دامەزراندن لە هەولێر",
          body: "دەزگای خێرخوازیی بارزانی بە فەرمی لە هەولێری پایتەختی هەرێمی کوردستانی عێراق دامەزرا، بۆ گۆڕینی بەزەیی بە کارێکی مرۆیی ڕێکخراو.",
        },
        {
          id: "ecosoc",
          year: "٢٠١٦",
          title: "شوێنێک لەسەر مێزی نەتەوە یەکگرتووەکان",
          body: "پێگەی ڕاوێژکاری تایبەت لەگەڵ ئەنجومەنی ئابووری و کۆمەڵایەتی نەتەوە یەکگرتووەکان، کە ڕۆڵی دەزگاکە لە دیالۆگی مرۆیی نێودەوڵەتیدا دەسەلمێنێت.",
        },
        {
          id: "kuwait",
          year: "٢٠١٩",
          title: "تۆمارکردن لە کوێت",
          body: "وەک ڕێکخراوێکی خێرخوازی لە کوێت تۆمارکرا، بۆ فراوانکردنی ئامادەبوونی مۆڵەتپێدراوی دەزگاکە لە ناوچەکەدا.",
        },
        {
          id: "earthquake",
          year: "٢٠٢٣",
          title: "بەو دیوی سنوور، بە ڕۆژ",
          body: "پشتگیریی خێرای فریاگوزاری دوای بوومەلەرزەکانی تورکیا و سووریا، لەوانەش ٤٬١٢٩ ڕەشماڵ بۆ خێزانە ئاوارەکان.",
        },
        {
          id: "homes",
          year: "٢٠٢٤",
          title: "خانوو بۆ خێزانی شەهیدان",
          body: "٥٤٠ یەکەی نیشتەجێبوون بۆ خێزانی شەهیدان لە هەولێر و سۆران دابەشکرا.",
        },
        {
          id: "awards",
          year: "٢٠٢٥",
          title: "پێزانین لە دەرەوە",
          body: "خەڵاتی پەرلەمانی فیدراڵی ئەڵمانیا، خەڵاتی ڕێکخراوی Wings of Help و خەڵاتی Helfen Bringt Freude.",
        },
      ],
    },
    bcfPresident: {
      open: "ناسینی سەرۆکی دەزگا",
      name: "موسا ئەحمەد ئاغا تاجەدین",
      role: "سەرۆکی دەزگا",
      meta: "دەزگای خێرخوازیی بارزانی",
      intro:
        "سەرکردایەتیکردنی کاری ڕۆژانەی مرۆیی دەزگاکە — وردەکاریی ئەم پڕۆفایلە دواتر زیاد دەکرێت.",
      timelineCta: "بینینی هێڵی کات",
      timelineTitle: "سەرۆکایەتی دەزگا",
      timelineRange: "—",
      timelinePlaceholder: "وردەکاریی هێڵی کات بەم زووانە زیاد دەکرێت.",
    },
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
    trustPartnershipsHint: "هاوبەش و بەخشەر و سپۆنسەرەکان لەگەڵ BCF",
    trustPartnersLabel: "هاوبەشەکان",
    trustDonorsLabel: "بەخشەرەکان",
    trustSponsorsLabel: "سپۆنسەرەکان",
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
    projects: projectsKu,
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
    mapScopes: {
      global: "عالمياً",
      kurdistan: "داخل كردستان",
    },
    globalLead:
      "ثلاث عشرة دولة في عشرين عاماً، تُدار جميعها من أربيل.",
    globalZoomHint: "اسحب للتحريك · اضغط بإصبعين للتكبير",
    zoomIn: "تكبير",
    zoomOut: "تصغير",
    resetView: "إعادة العرض",
    globalKinds: {
      hq: "المقر",
      registered: "مرخّصة",
      response: "الطوارئ",
      work: "منطقة العمل",
    },
    globalLocations: {
      kurdistan: {
        name: "إقليم كردستان، العراق",
        meta: "منذ 2005",
        description:
          "تأسست في أربيل ومرخّصة في جمهورية العراق وإقليم كردستان معاً، ومن هنا تُصمَّم كل البرامج وتُدار.",
        facts: [
          "مكاتب في أربيل ودهوك وزاخو وكركوك والسليمانية",
          "شهادة إدارة الجودة ISO 9001:2015",
        ],
      },
      unitedKingdom: {
        name: "المملكة المتحدة",
        meta: "مفوضية الجمعيات الخيرية",
        description:
          "معترف بها ضمن إطار مفوضية الجمعيات الخيرية البريطانية، بما يعزّز معايير الحوكمة وإعداد التقارير وثقة الجمهور.",
        facts: [
          "حوكمة وتقارير وفق المعايير الخيرية البريطانية",
          "جائزة مجموعة العمال في لندن",
        ],
      },
      turkiye: {
        name: "تركيا",
        meta: "استجابة الزلزال، 2023",
        description:
          "دعم طارئ سريع بعد زلازل شباط/فبراير 2023، مع عبور الإغاثة للحدود خلال أيام من الهزّة الأولى.",
        facts: [
          "4,129 خيمة للعائلات النازحة في تركيا وسوريا",
          "خطة لخمسة فرق استجابة للكوارث في خمسة مواقع",
        ],
      },
      syria: {
        name: "سوريا",
        meta: "استجابة الزلزال، 2023",
        description:
          "مأوى وإغاثة طارئة للعائلات التي نزحت جرّاء زلازل 2023 في شمال سوريا.",
        facts: [
          "خيام وبطانيات ومستلزمات شتوية للعائلات النازحة",
          "نُفِّذت بالتوازي مع الاستجابة في تركيا",
        ],
      },
      ukraine: { name: "أوكرانيا", meta: "منطقة عمل", description: WORK_ONLY_AR, facts: [] },
      serbia: { name: "صربيا", meta: "منطقة عمل", description: WORK_ONLY_AR, facts: [] },
      lebanon: { name: "لبنان", meta: "منطقة عمل", description: WORK_ONLY_AR, facts: [] },
      morocco: { name: "المغرب", meta: "منطقة عمل", description: WORK_ONLY_AR, facts: [] },
      saudiArabia: {
        name: "السعودية",
        meta: "منطقة عمل",
        description: WORK_ONLY_AR,
        facts: [],
      },
      sudan: { name: "السودان", meta: "منطقة عمل", description: WORK_ONLY_AR, facts: [] },
      yemen: { name: "اليمن", meta: "منطقة عمل", description: WORK_ONLY_AR, facts: [] },
      bangladesh: { name: "بنغلاديش", meta: "منطقة عمل", description: WORK_ONLY_AR, facts: [] },
      australia: { name: "أستراليا", meta: "منطقة عمل", description: WORK_ONLY_AR, facts: [] },
    },
    locations: {
      erbil: {
        name: "أربيل",
        short: "أربيل",
        description:
          "محافظة المقر الرئيسي وأوسع سجل تحتفظ به المؤسسة: الغذاء والمدارس والمياه والمخيمات والإسكان ومركز التميّز للرعاية المعقّدة.",
        explore: "استكشف المشاريع",
      },
      duhok: {
        name: "دهوك",
        short: "دهوك",
        description:
          "عشرون مخيماً في ذروة ٢٠٢١، ومشروع إسكان روج سيتي بـ ٤٢٠ وحدة، ومخابز الخبز المجاني العاملة في الأقضية عام ٢٠٢٦.",
        explore: "استكشف المشاريع",
      },
      sulaymaniyah: {
        name: "السليمانية",
        short: "السليمانية",
        description:
          "خمسون من أصل ٢٠٣ مدارس مُرمَّمة، وغذاء الأضاحي ورمضان المتكرر، ومشاريع نقدية وصلت إلى العائلات عبر المكتب في ٢٠٢٦.",
        explore: "استكشف المشاريع",
      },
      kirkuk: {
        name: "كركوك",
        short: "كركوك",
        description:
          "أكبر حصة مفردة من برنامج ترميم ٢٠٣ مدارس، إلى جانب مشاريع الغذاء والإعاقة والتعايش في محافظة متنوّعة.",
        explore: "استكشف المشاريع",
      },
      nineveh: {
        name: "نينوى / الموصل",
        short: "الموصل",
        description:
          "قرابة نصف مليون وجبة ساخنة في ٢٠٢٢، وعشرة مخيمات تحت الإدارة، ونقل المرضى من مخيمات شرق الموصل إلى مستشفيات أربيل والموصل.",
        explore: "استكشف المشاريع",
      },
      sinjar: {
        name: "سنجار / شنكال",
        short: "سنجار",
        description:
          "من هنا يبدأ العمل الطارئ للمؤسسة — استجابة تفجير ٢٠٠٧، والجسر الجوي إلى الجبل عام ٢٠١٤، والبيوت التي بُنيت منذ ذلك الحين.",
        explore: "استكشف المشاريع",
      },
      garmian: {
        name: "كرميان / كلار",
        short: "كرميان",
        description:
          "برامج الغذاء والإعاقة والنقد في كلار وكفري وخانقين ورزكاري ودربنديخان، مع إغاثة الفيضانات في ٢٠٢٤.",
        explore: "استكشف المشاريع",
      },
      halabja: {
        name: "حلبجة",
        short: "حلبجة",
        description:
          "دعم كوفيد-١٩ لدائرة الصحة، وإحدى عشرة مدرسة مُرمَّمة، وروضة افتُتحت في ٢٠٢٣، ومساعدة مستمرة لعائلات الأيتام.",
        explore: "استكشف المشاريع",
      },
      soran: {
        name: "سوران",
        short: "سوران",
        description:
          "خمس مدارس مُرمَّمة، وحصة من توزيع إسكان الشهداء، وأنشطة التوعية بالتوحّد في مركز الأم المجتمعي.",
        explore: "استكشف المشاريع",
      },
      zakho: {
        name: "زاخو",
        short: "زاخو",
        description:
          "مدافئ الشتاء والاستجابة للفيضانات على الحدود، ومشروع محو أميّة لخمسة أشهر لأطفال لاجئين، وسجّاد للمساجد في الإدارة.",
        explore: "استكشف المشاريع",
      },
      akre: {
        name: "عقرة",
        short: "عقرة",
        description:
          "طرود غذائية للمخيم عبر كاريتاس ألمانيا، وزراعة ١٠٬٠٠٠ شتلة بلّوط في ٢٠٢١، وترميم مستشفى الولادة المسجّل في التقرير التراكمي.",
        explore: "استكشف المشاريع",
      },
      amedi: {
        name: "العمادية / شيلادزي / ديرلوك / سرسنك",
        short: "العمادية",
        description:
          "مركز الابتسامة مع كاريتاس ألمانيا، وأنشطة الرعاية الخاصة والتوحّد، وسلال غذائية في بلدات الجبل.",
        explore: "استكشف المشاريع",
      },
      afrin: {
        name: "عفرين",
        short: "عفرين",
        description:
          "برنامج قائم في سوريا: العيادة المتنقّلة، ومركز بارزاني للثقافة والتنمية، ودعم طلبة الجامعة، و١٩٢ يتيماً مكفولاً.",
        explore: "استكشف المشاريع",
      },
      rojava: {
        name: "غربي كردستان / روج آفا",
        short: "روج آفا",
        description:
          "أكبر عملية حالية للمؤسسة عبر الحدود — ٤١٥ شاحنة، و٢٩٬٠٧٠ عائلة، وطحين لـ ٣٫٣٦ مليون رغيف، ووقود ودواء وفرص عمل.",
        explore: "استكشف المشاريع",
      },
      iraq: {
        name: "المحافظات العراقية الأخرى",
        short: "العراق",
        description:
          "عمل غذائي وطبي وصل إلى بغداد وديالى وذي قار والأنبار والسماوة — ٤٩٣٬٣٨٠ فرداً في العراق خارج الإقليم عام ٢٠٢٥.",
        explore: "استكشف المشاريع",
      },
      turkiye: {
        name: "تركيا",
        short: "تركيا",
        description:
          "مخيم وان المبني بـ ٤٠٠ كرفان، والاستجابة لزلزال ٢٠٢٣ التي عبرت الحدود خلال أيام بفرق الإنقاذ والوجبات الساخنة والخيام.",
        explore: "استكشف المشاريع",
      },
      syria: {
        name: "سوريا",
        short: "سوريا",
        description:
          "حيث وسّعت الاستجابة للزلزال وبرنامج عفرين عمل المؤسسة، وحيث تجري الآن عملية غربي كردستان.",
        explore: "استكشف المشاريع",
      },
      lebanon: {
        name: "لبنان",
        short: "لبنان",
        description:
          "خيام قُدِّمت في مخيم مام رشان لاستقبال الأكراد اللبنانيين النازحين بفعل أزمة المنطقة.",
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
        subtitle: "السلطة العليا في المؤسسة.",
      },
      {
        title: "المجلس الإداري",
        subtitle: "يراجع ويقرّ القرارات الكبرى والسياسات ومسار المشاريع.",
      },
      {
        title: "الأقسام التنفيذية",
        subtitle: "تقيّم الاحتياجات وتصمّم البرامج الإنسانية.",
      },
      {
        title: "المكاتب الإقليمية",
        subtitle: "تنفّذ العمل مباشرة مع المجتمعات المحلية.",
      },
    ],
    boardChief: {
      open: "تعرّف على رئيس المجلس",
      name: "مسرور بارزاني",
      role: "رئيس مجلس المؤسسين",
      meta: "مؤسسة بارزاني الخيرية · تأسست عام 2005",
      intro:
        "مجلس المؤسسين هو السلطة العليا في المؤسسة، ورئيسه يضع المعيار الذي يُقاس به العمل: مساعدة تُقدَّم على أساس الحاجة وحدها، وبطريقة تصون كرامة من يتلقاها.",
      slides: [
        {
          id: "honour",
          caption: "تكريم أمٍّ في حفل تسليم المساكن لعوائل الشهداء في دهوك.",
        },
        {
          id: "medal",
          caption: "تسليم ميدالية تذكارية لإحدى العوائل في الحفل نفسه، تحت شعار المؤسسة.",
        },
        {
          id: "gift",
          caption:
            "الانحناء لتسليم هدية إلى طفلة على المسرح — عملٌ يُقاس بإنسانٍ واحد في كل مرة.",
        },
        {
          id: "child",
          caption:
            "لحظة مع طفل بعيداً عن المنصة، في مؤسسة فلسفتها الخدمة لا الإحسان من الأعلى.",
        },
        {
          id: "distribution",
          caption: "لقاء مع أطفال في أحد مواقع التوزيع، حيث تصل البرامج إلى العوائل مباشرة.",
        },
        {
          id: "ceremony",
          caption:
            "الجلوس مع المسؤولين والشركاء ورجال الدين — التعايش بين مكوّنات كوردستان أحد القيم الست التي تعمل بها المؤسسة.",
        },
      ],
      alongside: "إلى جانب المجلس",
      timelineCta: "عرض المسار الزمني للحوكمة",
      timelineTitle: "مجلس المؤسسين",
      timelineRange: "2005 — اليوم",
      timelineMilestones: [
        {
          id: "founded",
          year: "2005",
          title: "التأسيس في أربيل",
          body: "تأسست مؤسسة بارزاني الخيرية رسمياً في أربيل، عاصمة إقليم كوردستان العراق، لتحوّل التعاطف إلى عمل إنساني منظم.",
        },
        {
          id: "ecosoc",
          year: "2016",
          title: "مقعد على طاولة الأمم المتحدة",
          body: "وضع استشاري خاص لدى المجلس الاقتصادي والاجتماعي للأمم المتحدة، تأكيداً لدور المؤسسة في الحوار الإنساني الدولي.",
        },
        {
          id: "kuwait",
          year: "2019",
          title: "التسجيل في الكويت",
          body: "مسجَّلة كمنظمة خيرية في الكويت، بما يوسّع حضور المؤسسة المرخّص في المنطقة.",
        },
        {
          id: "earthquake",
          year: "2023",
          title: "عبر الحدود، خلال أيام",
          body: "دعم طارئ سريع بعد زلزالي تركيا وسوريا، شمل 4,129 خيمة للعوائل النازحة.",
        },
        {
          id: "homes",
          year: "2024",
          title: "مساكن لعوائل الشهداء",
          body: "توزيع 540 وحدة سكنية على عوائل الشهداء في أربيل وسوران.",
        },
        {
          id: "awards",
          year: "2025",
          title: "تقدير من الخارج",
          body: "جائزة البرلمان الاتحادي الألماني، وجائزة منظمة أجنحة العون (Wings of Help)، وجائزة Helfen Bringt Freude.",
        },
      ],
    },
    bcfPresident: {
      open: "تعرّف على رئيس المؤسسة",
      name: "موسى أحمد آغا تاج الدين",
      role: "رئيس المؤسسة",
      meta: "مؤسسة بارزاني الخيرية",
      intro:
        "يقود العمل الإنساني اليومي للمؤسسة — ستُضاف تفاصيل هذا الملف لاحقاً.",
      timelineCta: "عرض الجدول الزمني",
      timelineTitle: "رئاسة المؤسسة",
      timelineRange: "—",
      timelinePlaceholder: "ستُضاف تفاصيل الجدول الزمني قريباً.",
    },
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
    trustPartnershipsHint: "شركاء ومتبرعون وراعون يقفون إلى جانب BCF",
    trustPartnersLabel: "الشركاء",
    trustDonorsLabel: "المتبرعون",
    trustSponsorsLabel: "الراعون",
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
    projects: projectsAr,
  },
};
