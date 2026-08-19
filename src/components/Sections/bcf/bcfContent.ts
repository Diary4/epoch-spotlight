import type { BcfEraId, SectorId } from "@/components/Sections/bcf/bcfProjectData";

export type BcfLang = "en" | "ku" | "ar";

/**
 * Language is an overlay raised on first entry, or later from the reach rail.
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
  | "unitedStates"
  | "ukraine"
  | "serbia"
  | "turkiye"
  | "syria"
  | "lebanon"
  | "morocco"
  | "saudiArabia"
  | "yemen"
  | "bangladesh"
  | "australia"
  | "greece"
  | "southSudan";

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
 * Countries on BCF's own "geographical area of work in 20 years" map, listed
 * west to east after the HQ, plus licensed registrations (UK, United States).
 * Countries that only ever appeared here as an award — Kuwait, Germany,
 * Portugal — are not part of that footprint and are not plotted; the awards
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
  {
    id: "unitedStates",
    coordinates: [-98.5, 39.8],
    kind: "registered",
    iso: "840",
    focusZoom: 3.2,
  },
  { id: "morocco", coordinates: [-6.842, 31.8], kind: "work", iso: "504", focusZoom: 4.5 },
  { id: "serbia", coordinates: [20.457, 44.787], kind: "work", iso: "688", focusZoom: 6.5 },
  { id: "greece", coordinates: [21.8, 39.1], kind: "work", iso: "300", focusZoom: 5.5 },
  { id: "ukraine", coordinates: [31.2, 48.8], kind: "work", iso: "804", focusZoom: 4 },
  { id: "turkiye", coordinates: [35.2, 39.1], kind: "response", iso: "792", focusZoom: 4.5 },
  { id: "lebanon", coordinates: [35.501, 33.888], kind: "work", iso: "422", focusZoom: 7 },
  { id: "syria", coordinates: [38.5, 35], kind: "response", iso: "760", focusZoom: 6 },
  { id: "southSudan", coordinates: [30.1, 7.0], kind: "work", iso: "728", focusZoom: 4.5 },
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

type ImpactTotal = {
  id: "families" | "people";
  title: string;
  description: string;
};

/**
 * The twelve sectors Humanity in Action presents, in the same reading order the
 * project register uses (`BCF_SECTOR_ORDER`): the long-running service sectors
 * first, the cross-cutting ones last. `rehabilitation` is the register's
 * `disability` sector under the name BCF publishes it with.
 */
export type ServeCategoryId =
  | "food"
  | "health"
  | "education"
  | "shelter"
  | "wash"
  | "camp"
  | "nfi"
  | "rehabilitation"
  | "protection"
  | "livelihood"
  | "cash"
  | "environment";

/** One labelled block inside a sector — its activities, its projects, its goals. */
export type ServeCategoryGroup = {
  title: string;
  items: string[];
};

export type ServeCategory = {
  id: ServeCategoryId;
  title: string;
  /** Opening paragraph: what BCF does in this sector, and for whom. */
  intro: string;
  /**
   * The sector's wall text — BCF's own "museum text" line, which is written to
   * be read on a panel rather than in a report. Shown on the card and as the
   * closing line of the dialog. Absent where the source gives none, in which
   * case the card falls back to `intro`.
   */
  headline?: string;
  groups: ServeCategoryGroup[];
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

/** One person on the management roster: name and title, exactly as BCF lists them. */
export type TrustStaffMember = {
  id: string;
  name: string;
  role: string;
};

export type TrustStaffGroup = {
  id: string;
  title: string;
  members: TrustStaffMember[];
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
  | "origins"
  | "youth"
  | "education"
  | "security"
  | "service"
  | "cabinet";

/**
 * One node on the life timeline. Photography lives in BcfBoardChief.
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
  /**
   * Photography for the filmstrip. The caption is no longer printed under the
   * plate — it is the `alt` the plate carries, which is the only description a
   * screen reader or a maintainer swapping the art ever gets.
   */
  slides: BoardChiefSlide[];
  timelineCta: string;
  timelineTitle: string;
  timelineRange: string;
  timelineMilestones: BoardChiefMilestone[];
};

/**
 * One row of the President's career rail: a period in gold and what he did in
 * it. Deliberately not a `year` — two of the three entries are a span
 * ("1994 – 1998") or a duration ("+19 years") rather than a date.
 */
export type BcfPresidentFact = {
  id: string;
  period: string;
  body: string;
};

/**
 * BCF President profile.
 *
 * Read as a record rather than a narrative: three labelled sections down the
 * left, their content to the right. The biography prose it replaced said the
 * same things in a paragraph a visitor had to finish before finding the one
 * fact they came for.
 */
export type BcfPresidentCopy = {
  open: string;
  name: string;
  role: string;
  meta: string;
  bioLabel: string;
  bio: string;
  journeyLabel: string;
  journey: BcfPresidentFact[];
  awardsLabel: string;
  awards: string;
};

/**
 * One entry in a founder's record: a headed fact rather than a dated one. His
 * service and his party seats are both told as named stages ("The 1991
 * Uprising", "Head of the President's Private Bureau") — pinning them to years
 * would invent precision the source biography does not carry.
 */
export type BcfFounderEntry = {
  id: string;
  title: string;
  body: string;
};

/**
 * Founding Board member profile.
 *
 * Built on the President's record layout — labelled spine on one side, content
 * on the other — because it answers the same questions and should be recognised
 * as the same kind of page when a visitor lands on it from the Leadership grid.
 * Four museum-label sections: profile, leadership, Peshmerga struggle, and
 * liberation and defense.
 */
export type BcfFounderCopy = {
  open: string;
  name: string;
  role: string;
  meta: string;
  bioLabel: string;
  bio: string;
  rolesLabel: string;
  roles: BcfFounderEntry[];
  serviceLabel: string;
  /** Sets the scene the stages beneath it happened in; not itself a stage. */
  serviceIntro: string;
  service: BcfFounderEntry[];
  partyLabel: string;
  party: BcfFounderEntry[];
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

export type StorySectionId =
  | "foundation"
  | "timeline"
  | "mission"
  | "vision"
  | "philosophy"
  | "values";

export type StorySection = {
  id: StorySectionId;
  titleGold: string;
  titleWhite: string;
  body?: string;
};

/**
 * One of the six values on the Values pane — title and the source description.
 */
export type StoryValue = { id: string; title: string; body: string };

/** One beat on the Our Story institutional timeline. */
export type StoryMilestone = {
  id: string;
  year: string;
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
  donate: string;
  donateTitle: string;
  donateHint: string;
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
  /** Gold eyebrow over the title — whose journey this is. */
  journeyEyebrow: string;
  /** One line under the rule, telling a visitor the cards are touchable. */
  journeySubtitle: string;
  journeyChapters: { id: JourneyChapterId; title: string }[];
  whoWeServeWhite: string;
  whoWeServeGold: string;
  serveCategories: ServeCategory[];
  /** Cue on the centred sector card, and the label of the dialog it opens. */
  serveDetailCta: string;
  whoServesTitle: string;
  howServesTitle: string;
  whoHowHint: string;
  whoServesItems: string[];
  howServesItems: string[];
  storyTimelineStart: string;
  storyTimelineEnd: string;
  storyScrollHint: string;
  storySections: StorySection[];
  storyValues: StoryValue[];
  storyMilestones: StoryMilestone[];
  whereWeWork: string;
  across: string;
  borders: string;
  filters: Record<MapFilterId, string>;
  tapToExplore: string;
  locations: Record<LocationId, LocCopy>;
  mapScopes: Record<MapScopeId, string>;
  globalLead: string;
  globalZoomHint: string;
  globeHint: string;
  viewGlobe: string;
  viewFlat: string;
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
  changing: string;
  livesEveryday: string;
  impactTotals: ImpactTotal[];
  impactItems: ImpactItem[];
  trustTitle: string;
  trustTitleGold: string;
  trustTitleRest: string;
  trustTopics: TrustTopic[];
  trustLeadershipTitle: string;
  trustFounders: TrustFounderCard[];
  trustAdminBoardTitle: string;
  trustAdminBoardOpen: string;
  trustAdminBoardBody: string;
  /**
   * The management roster from bcf.krd/management-staff, minus the President,
   * who has his own card one screen up. Grouped because only the board seats
   * belong under the name the screen carries.
   */
  trustStaffGroups: TrustStaffGroup[];
  boardChief: BoardChiefCopy;
  bcfPresident: BcfPresidentCopy;
  /** The Founding Board member who sits beside the President on the grid. */
  bcfFounder: BcfFounderCopy;
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
  cash: "پارە و ئازیزان",
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
      { id: "ar", label: "العربية" },
    ],
    touchToContinue: "Touch to continue",
    attractStart: "Touch to Start",
    attractTagline: "Barzani Charity Foundation",
    attractEyebrow: "BARZANI CHARITY FOUNDATION",
    attractCaption: "A legacy of service.",
    enterHint: "TOUCH ANYWHERE",
    home: "Home",
    language: "Language",
    donate: "Donate",
    donateTitle: "Donate to BCF",
    donateHint: "Scan this code with your phone to open the BCF donate page.",
    chooseLanguageHint: "You can change this at any time from the side controls.",
    idleTitle: "Still with us?",
    idleBody: "The experience returns to the start so the next visitor begins fresh.",
    idleContinue: "I'm still here",
    humanity: "HUMANITY",
    dignity: "DIGNITY",
    hope: "HOPE",
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
    journeyEyebrow: "BARZANI CHARITY FOUNDATION",
    journeySubtitle: "Tap a chapter to explore",
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
    /**
     * The twelve sectors, transcribed from BCF's own sector document (the
     * Kurdish and Arabic editions of "Humanitarian Sectors"). Group headings
     * are the document's own; nothing is added to a sector the document does
     * not state, which is why Non-Food Items carries relief items and no
     * wall text — the source gives it none.
     */
    serveCategories: [
      {
        id: "food",
        title: "Food Security",
        intro:
          "Food security is one of BCF's core humanitarian sectors. Food assistance reaches vulnerable families, internally displaced people, refugees and communities affected by crisis.",
        headline:
          "Food support is more than a meal: it is stability in a time of uncertainty, dignity in a time of hardship, and hope in a time of crisis.",
        groups: [
          {
            title: "Key activities",
            items: [
              "Dry food distribution",
              "Hot meals",
              "Food baskets",
              "Emergency food response",
              "Support aligned with humanitarian food-security standards",
            ],
          },
          {
            title: "Impact figures",
            items: [
              "776,427 tonnes of dry food distributed",
              "14,429,226 hot meals distributed",
              "2,450,099 food parcels distributed",
            ],
          },
        ],
      },
      {
        id: "health",
        title: "Health and Medical Support",
        intro:
          "BCF supports health services for vulnerable communities through medical projects, support to facilities, and treatment programmes.",
        headline:
          "Health care protects more than the body. It protects dignity, the stability of a family, and the right to live in hope.",
        groups: [
          {
            title: "Selected health projects",
            items: [
              "Five primary health care centers built and opened",
              "Khalifan Hospital renovated",
              "Peshmerga Hospital renovated",
              "The maternity hospital in Akre renovated",
              "A counselling center opened in Bardarash camp",
              "Congenital heart surgery project for children",
              "Support for children referred for treatment abroad",
              "Medical support for displaced communities",
            ],
          },
        ],
      },
      {
        id: "education",
        title: "Education and Human Development",
        intro:
          "BCF invests in education because learning is one of the strongest routes out of poverty and vulnerability.",
        headline:
          "Education gives children more than knowledge. It gives them confidence, opportunity and a future that crisis cannot easily take away.",
        groups: [
          {
            title: "Key achievements",
            items: [
              "310 schools renovated",
              "362,538 school materials and stationery items distributed",
              "131 classrooms built",
              "The Tanahi Center opened in 2022",
            ],
          },
          {
            title: "Future goals",
            items: [
              "Renovate 200 schools",
              "Build five new schools",
              "Run two back-to-school projects for children who have dropped out",
            ],
          },
        ],
      },
      {
        id: "wash",
        title: "Water, Sanitation and Hygiene",
        intro:
          "BCF's work in this sector focuses on clean water, sanitation and hygiene services.",
        headline:
          "Clean water protects health, restores dignity and supports life in places where crisis has taken away the basics.",
        groups: [
          {
            title: "Key activities",
            items: [
              "Drinking-water support",
              "Water networks",
              "Water wells",
              "Sanitation and environmental health support",
              "Hygiene services",
              "Water delivery to vulnerable families",
            ],
          },
          {
            title: "Selected projects",
            items: [
              "Four water wells drilled for four villages in Duhok in 2019",
              "Four water wells drilled on Mount Sinjar in 2016",
              "65,864,000 litres of drinking water delivered in Erbil in 2021",
              "9,100 families supported with drinking water in Erbil in 2024",
            ],
          },
        ],
      },
      {
        id: "shelter",
        title: "Shelter and Emergency Response",
        intro:
          "BCF provides shelter and rapid relief to families and communities displaced by war, crisis and natural disaster.",
        headline:
          "Shelter is the first step toward recovery and a return to normal life. A safe place gives a family the strength to begin again.",
        groups: [
          {
            title: "Selected shelter and response projects",
            items: [
              "400 caravans established in Van, Türkiye, 2011-2012",
              "300 caravans established in Baharka camp in 2015",
              "600 caravans established in Darkar Ajam camp in 2016",
              "4,129 tents provided after the 2023 Türkiye and Syria earthquakes",
              "540 residential units distributed to families of martyrs in Erbil and Soran in 2024",
              "20 houses built in Sinjar in 2024",
            ],
          },
        ],
      },
      {
        id: "protection",
        title: "Protection and Human Dignity",
        intro:
          "BCF's protection work focuses on the safety, dignity and wellbeing of vulnerable people.",
        headline:
          "Protection means more than responding to danger. It means making sure every person is treated with dignity, respect and worth.",
        groups: [
          {
            title: "Protection focus",
            items: [
              "Physical safety",
              "Psychosocial support",
              "Child protection",
              "Support for vulnerable families",
              "Support for people with disabilities",
              "Awareness and training",
              "Community-based protection services",
            ],
          },
        ],
      },
      {
        id: "rehabilitation",
        title: "Rehabilitation and Inclusion",
        intro:
          "BCF supports people with disabilities, children with autism, and communities facing health and social challenges.",
        headline:
          "Inclusion means giving every person the right to participate, learn, recover and live with dignity.",
        groups: [
          {
            title: "Current and future focus",
            items: [
              "Autism awareness and support",
              "Support for children with disabilities",
              "Awareness of the risks of addiction",
              "Drug rehabilitation initiatives",
              "Reintegration support for children with autism",
              "Public awareness through seminars, posters, leaflets and video",
            ],
          },
          {
            title: "Future goals",
            items: [
              "Rehabilitate 200 children with autism",
              "Integrate 100 children with autism into government schools within five years",
              "Open three autism centers in the Kurdistan Region",
              "Open a drug addiction rehabilitation center",
              "Hold five awareness symposiums on the risks of addiction",
            ],
          },
        ],
      },
      {
        id: "livelihood",
        title: "Livelihood and Empowerment",
        intro:
          "BCF supports livelihood projects that help individuals and families become more self-reliant.",
        headline:
          "The strongest humanitarian work does not only help people survive today. It helps them stand stronger tomorrow.",
        groups: [
          {
            title: "Main areas",
            items: [
              "Skills development",
              "Vocational training",
              "Employment support",
              "Income generation",
              "Community recovery",
              "Youth and family empowerment",
            ],
          },
          {
            title: "Vocational training centers",
            items: [
              "21 vocational training centers supported",
              "587,216 individuals reached through them",
            ],
          },
        ],
      },
      {
        id: "camp",
        title: "Camps and Displacement Support",
        intro:
          "BCF manages and supports camps serving refugees and internally displaced people.",
        headline:
          "Camp management is not only logistics. It is coordination, protection and a daily responsibility toward people living in displacement.",
        groups: [
          {
            title: "Camp services",
            items: [
              "Food and fuel distribution",
              "Medical care",
              "Waste management",
              "Tent and caravan maintenance",
              "Education support",
              "Water and sanitation services",
              "Vocational and non-vocational training",
              "Coordination with NGOs and government bodies",
              "Advocacy for dignity and wellbeing",
            ],
          },
          {
            title: "Camps today",
            items: [
              "27 camps currently managed in Erbil and Duhok",
              "More than 200,000 refugees and IDPs served each year through camp management",
            ],
          },
        ],
      },
      {
        id: "nfi",
        title: "Non-Food Items",
        intro:
          "Essential relief items delivered to vulnerable families alongside food, water, shelter and cash support.",
        groups: [
          {
            title: "Essential relief items",
            items: [
              "Blankets",
              "Winter supplies",
              "Mattresses",
              "Kitchen sets",
              "Emergency household items",
            ],
          },
        ],
      },
      {
        id: "cash",
        title: "Cash Assistance and Essential Relief",
        intro:
          "BCF provides direct financial support to families who need urgent help to cover the basic needs of life.",
        headline:
          "Cash assistance gives vulnerable families the flexibility to meet urgent needs with dignity.",
        groups: [
          {
            title: "Impact figure",
            items: ["141,468,261,002 IQD distributed in cash assistance"],
          },
        ],
      },
      {
        id: "environment",
        title: "Environment and Climate Change",
        intro:
          "BCF's future direction includes protecting the environment and building awareness of climate change.",
        headline:
          "Protecting people also means protecting the environment they depend on. Humanitarian work cannot ignore climate change, water security, green space and the conditions of future life.",
        groups: [
          {
            title: "Future goals",
            items: [
              "Plant one million trees within five years",
              "Reduce plastic use by 80% in BCF offices",
              "Launch recycling projects",
              "Build environmental awareness",
              "Support a healthier, greener Kurdistan Region",
            ],
          },
        ],
      },
    ],
    serveDetailCta: "View details",
    whoServesTitle: "Who BCF Serves",
    howServesTitle: "How BCF Serves",
    whoHowHint:
      "BCF works across the main humanitarian sectors to meet urgent needs and support long-term recovery.",
    whoServesItems: [
      "Orphans and widows",
      "Refugees and IDPs",
      "Host communities and low-income families",
      "People with disabilities",
      "Children, youth and disaster-affected communities",
    ],
    howServesItems: [
      "Food Security",
      "Non-Food Items",
      "WASH",
      "Education and Development",
      "Livelihood and Cash Assistance",
      "Protection, Health, Shelter and CCCM",
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
        id: "timeline",
        titleGold: "Institutional",
        titleWhite: "Timeline",
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
        body: "BCF operates through values that shape both local and international humanitarian work.",
      },
    ],
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
    storyMilestones: [
      { id: "founded", year: "2005", body: "BCF founded in Erbil." },
      { id: "orphan-care", year: "2009", body: "Orphan Care Project begins." },
      {
        id: "sinjar",
        year: "2014",
        body: "Emergency response for displaced people on Sinjar Mountain.",
      },
      {
        id: "camps",
        year: "2015",
        body: "Management of IDP and refugee camps in Erbil.",
      },
      {
        id: "ecosoc",
        year: "2016",
        body: "UN ECOSOC consultative status and international licensing milestones.",
      },
      {
        id: "sphere",
        year: "2018",
        body: "Sphere representation in the Kurdistan Region.",
      },
      {
        id: "uk-duhok",
        year: "2020",
        body: "UK Charity Commission recognition and Duhok camp management.",
      },
      {
        id: "iso-quake",
        year: "2023",
        body: "ISO 9001:2015 certification and Turkey-Syria earthquake response.",
      },
      {
        id: "recent",
        year: "2024–2026",
        body: "Major housing, health, education and international recognition milestones.",
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
      "Sixteen countries in twenty years, all run from Erbil.",
    globalZoomHint: "Drag to move · pinch to zoom",
    globeHint: "Drag to spin · pinch to zoom",
    viewGlobe: "Globe",
    viewFlat: "Flat map",
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
      unitedStates: {
        name: "United States of America",
        meta: "Licensed",
        description:
          "Registered to operate in the United States, enabling transparent partnerships and accountable cross-border humanitarian support.",
        facts: [
          "Licensed humanitarian presence in the United States",
          "Supports transparent cross-border partnerships",
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
          "4,129 tents provided after the 2023 Türkiye and Syria earthquakes",
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
      greece: {
        name: "Greece",
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
      southSudan: {
        name: "South Sudan",
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
    changing: "Changing lives",
    livesEveryday: "everyday",
    impactTotals: [
      {
        id: "families",
        title: "Beneficiary Families",
        description:
          "Total number of families who benefited from the organization’s activities and assistance over 19 years.",
      },
      {
        id: "people",
        title: "Individual Beneficiaries",
        description:
          "Total number of people who benefited from the organization’s activities and assistance over 19 years.",
      },
    ],
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
    trustAdminBoardTitle: "Administrative Board Members",
    trustAdminBoardOpen: "View members",
    trustAdminBoardBody:
      "Reviews and approves major decisions, policies and project direction.",
    trustStaffGroups: [
      {
        id: "board",
        title: "Administrative Board Members",
        members: [
          { id: "ibrahim", name: "Ibrahim Samin", role: "BCF Vice President" },
          { id: "farzin", name: "Farzin Bagzade", role: "Administrative Board Member" },
          { id: "awat", name: "Awat Ahmed", role: "Administrative Board Member" },
          {
            id: "abdulwahid",
            name: "Abdulwahid Amin",
            role: "Administrative Board Member and Duhok Office Director",
          },
          { id: "ways", name: "Ways Jalil", role: "Administrative Board Member" },
          {
            id: "ismail-a",
            name: "Ismail Abudlaziz",
            role: "Administrative Board Member",
          },
          {
            id: "karzan-n",
            name: "Karzan Nuri",
            role: "Administrative Board Member and Program Planning Dep. Manager",
          },
          {
            id: "rawaj",
            name: "Rawaj Haji",
            role: "Administrative Board Member and Human Resources Dep. Manager",
          },
        ],
      },
    ],
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
      meta: "Barzani Charity Foundation",
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
      timelineCta: "View Governance Timeline",
      timelineTitle: "Masrour Barzani",
      timelineRange: "1969 — Present",
      timelineMilestones: [
        {
          id: "origins",
          year: "1969",
          title: "Origins & Formation",
          body: "Born in 1969, Masrour Barzani grew up during a defining period in Kurdish history. His early years were shaped by displacement, resistance, education, and the responsibility of serving a nation in struggle.",
        },
        {
          id: "youth",
          year: "1985",
          title: "From Youth to Resistance",
          body: "In 1985, at the age of sixteen, Masrour Barzani joined the Kurdistan Peshmerga. His early service placed him directly within the Kurdish struggle during some of its most difficult chapters.",
        },
        {
          id: "education",
          year: "1993",
          title: "Education Beyond Borders",
          body: "After years shaped by conflict, Masrour Barzani pursued higher education abroad, strengthening his understanding of international relations, peace, and conflict resolution.",
        },
        {
          id: "security",
          year: "1998",
          title: "Security & State-Building",
          body: "After returning to Kurdistan in 1998, Masrour Barzani took on senior responsibilities in political and security institutions, later becoming Chancellor of the Kurdistan Region Security Council.",
        },
        {
          id: "service",
          year: "2005",
          title: "Service Beyond Government",
          body: "Masrour Barzani's public work also extended into humanitarian and academic fields, including the establishment of the Barzani Charity Foundation and support for higher education in Kurdistan.",
        },
        {
          id: "cabinet",
          year: "2019",
          title: "Prime Minister — The Ninth Cabinet",
          body: "In 2019, Masrour Barzani became Prime Minister of the Kurdistan Region and was appointed to form the ninth cabinet of the Kurdistan Regional Government.",
        },
      ],
    },
    bcfPresident: {
      open: "Meet the BCF President",
      name: "Musa Ahmed",
      role: "BCF President",
      meta: "Barzani Charity Foundation",
      bioLabel: "Biography",
      bio: "Born on August 5, 1974, in Kalok village in the Barzan region, he graduated from the Institute of Fine Arts. His commitment to public and humanitarian service began at an early age.",
      journeyLabel: "Starting the Journey",
      journey: [
        {
          id: "students",
          period: "1994 – 1998",
          body: "Served as Secretary of the Kurdistan Students Union",
        },
        {
          id: "bcf",
          period: "2007",
          body: "Joined the leadership of the Barzani Charity Foundation as Vice President and later became its President",
        },
        {
          id: "tenure",
          period: "+19 years",
          body: "Has helped guide the foundation’s humanitarian mission and expand its support for communities in need.",
        },
      ],
      awardsLabel: "Awards",
      awards:
        "Awarded the Immortal Barzani Medal, along with hundreds of other honors and distinctions.",
    },
    bcfFounder: {
      open: "Meet the Founding Board Member",
      name: "Sidad Mulla Mustafa Barzani",
      role: "Member of the Board of Founders",
      meta: "Barzani Charity Foundation · Born 1968",
      bioLabel: "Profile",
      bio: "Sidad Mulla Mustafa Barzani (b. 1968), son of national leader Mulla Mustafa Barzani and younger brother to President Masoud Barzani; founding board member of Barzani Charity Foundation.",
      rolesLabel: "Leadership",
      roles: [
        {
          id: "politburo",
          title: "KDP Political Bureau",
          body: "Member of the Kurdistan Democratic Party Political Bureau and Executive Board.",
        },
        {
          id: "envoy",
          title: "Special Envoy",
          body: "Special Envoy to President Masoud Barzani.",
        },
        {
          id: "bureau",
          title: "President's Private Bureau",
          body: "Head of the President's Private Bureau.",
        },
      ],
      serviceLabel: "Peshmerga Struggle",
      serviceIntro:
        "Enlisted in the Peshmerga in the late 1970s.",
      service: [
        {
          id: "gulan",
          title: "Gulan Revolution",
          body: "Served in the Gulan Revolution, mountain struggle logistics, and photographic documentation of the revolution.",
        },
      ],
      partyLabel: "Liberation and Defense",
      party: [
        {
          id: "uprising",
          title: "March 1991 Uprising",
          body: "Participated in the March 1991 Uprising.",
        },
        {
          id: "isis",
          title: "Counter-ISIS Campaign",
          body: "Provided continuous frontline leadership in the counter-ISIS campaign.",
        },
      ],
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
        id: "kuwait",
        title: "Registered in Kuwait",
        body: "Registered as a charity organization in Kuwait in 2019, extending BCF's licensed humanitarian presence across the region.",
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
    attractTagline: "دەزگای خێرخوازی بارزانی",
    attractEyebrow: "دەزگای خێرخوازی بارزانی",
    attractCaption: "میراتێک لە خزمەتکردن.",
    enterHint: "دەستی لە هەر شوێنێک بدە",
    home: "سەرەتا",
    language: "زمان",
    donate: "بەخشین",
    donateTitle: "بەخشین بۆ BCF",
    donateHint: "ئەم کۆدە بە مۆبایلەکەت سکان بکە بۆ کردنەوەی پەڕەی بەخشینی BCF.",
    chooseLanguageHint: "هەر کاتێک بتەوێت لە کۆنترۆڵەکانی لاوە دەیگۆڕیت.",
    idleTitle: "هێشتا لەگەڵمانیت؟",
    idleBody: "ئەزموونەکە دەگەڕێتەوە سەرەتا بۆ ئەوەی سەردانکەری داهاتوو لە سەرەتاوە دەست پێبکات.",
    idleContinue: "بەڵێ، لێرەم",
    humanity: "مرۆڤایەتی",
    dignity: "کەرامەت",
    hope: "هیوا",
    quote: "شانازییە بۆ مرۆڤ خزمەتکاری میللەتی خۆی بێ",
    quoteAttr: "— مستەفا بارزانی",
    welcomeEyebrow: "بەخێربێیت بۆ",
    welcomeTitleBcf: "BCF",
    welcomeTitleRest: "ئەزموون",
    welcomeBody: "چیرۆک، کاری مرۆیی، و کاریگەرییەکەمان پێکەوە ببینە.",
    startJourney: "دەستپێکردنی گەشتەکە",
    journeyTitleLead: "گەشتی",
    journeyTitleGold: "ئێمە",
    journeyEyebrow: "دەزگای خێرخوازی بارزانی",
    journeySubtitle: "دەست لە بەشێک بدە بۆ گەڕان",
    journeyChapters: [
      { id: "humanity", title: "مرۆڤایەتی لە کردار" },
      { id: "story", title: "دەربارەی ئێمە" },
      { id: "map", title: "لە کوێ کار دەکەین؟" },
      { id: "impact", title: "کاریگەرییەکانمان" },
      { id: "trust", title: "متمانەی پشت کارەکانمان" },
      { id: "future", title: "داهاتوو و میرات" },
    ],
    whoWeServeWhite: "ئێمە",
    whoWeServeGold: "خزمەتی کێ دەکەین؟",
    serveCategories: [
      {
        id: "food",
        title: "ئاسایشی خۆراک",
        intro:
          "ئاسایشی خۆراک یەکێکە لە سێکتەرە مرۆییە سەرەکییەکانی دەزگای خێرخوازیی بارزانی. هاوکاریی خۆراکی پێشکەش بە خێزانە لێقەوماوەکان، ئاوارەکان، پەنابەران و ئەو کۆمەڵگایانە دەکرێت کە بەهۆی قەیرانەکانەوە زیانیان پێگەیشتووە.",
        headline:
          "پشتگیریی خۆراک زیاترە لە تەنها ژەمێک: سەقامگیرییە لە کاتی نادڵنیایی، کەرامەتە لە کاتی سەختی، و ئومێدە لە کاتی قەیراندا.",
        groups: [
          {
            title: "چالاکییە سەرەکییەکان",
            items: [
              "دابەشکردنی خۆراکی وشک",
              "ژەمی خۆراکی گەرم",
              "سەبەتەی خۆراک",
              "دابینکردنی بەپەلەی خۆراک",
              "پێشکەشکردنی پاڵپشتی بەپێی پێوەرە مرۆییەکانی ئاسایشی خۆراک",
            ],
          },
          {
            title: "ئامارەکانی کاریگەری",
            items: [
              "دابەشکردنی ٧٧٦,٤٢٧ تەن خۆراکی وشک",
              "دابەشکردنی ١٤,٤٢٩,٢٢٦ ژەمی گەرم",
              "دابەشکردنی ٢,٤٥٠,٠٩٩ سەبەتەی خۆراک",
            ],
          },
        ],
      },
      {
        id: "health",
        title: "تەندروستی و پشتگیری پزیشکی",
        intro:
          "دەزگای خێرخوازیی بارزانی پشتگیری خزمەتگوزارییە تەندروستییەکان بۆ کۆمەڵگە کەمدەرامەت و نەدارەکان دەکات، لە ڕێگەی پڕۆژەی پزیشکی، پشتگیریکردنی بنکە و دامەزراوەکان و پڕۆگرامەکانی چارەسەرکردنەوە.",
        headline:
          "چاودێری تەندروستی تەنها جەستە ناپارێزێت، بەڵکو کەرامەت، سەقامگیری خێزان و مافی ژیان بە ئومێدەوە دەپارێزێت.",
        groups: [
          {
            title: "پڕۆژە تەندروستییە دیاریکراوەکان",
            items: [
              "دروستکردن و کردنەوەی پێنج بنکەی تەندروستی سەرەتایی",
              "نۆژەنکردنەوەی نەخۆشخانەی خەلیفان",
              "نۆژەنکردنەوەی نەخۆشخانەی پێشمەرگە",
              "نۆژەنکردنەوەی نەخۆشخانەی لەدایکبوون لە ئاکرێ",
              "کردنەوەی سەنتەری ڕاوێژکاری لە کامپی بەردەڕەش",
              "پڕۆژەی نەشتەرگەری دڵی زگماکی بۆ منداڵان",
              "پشتگیریکردنی ئەو منداڵانەی کە لە دەرەوەی وڵات چارەسەر وەردەگرن",
              "پشتگیری پزیشکی بۆ کۆمەڵگە ئاوارەکان",
            ],
          },
        ],
      },
      {
        id: "education",
        title: "پەروەردە و گەشەپێدانی مرۆیی",
        intro:
          "دەزگای خێرخوازیی بارزانی وەبەرهێنان لە کەرتی پەروەردەدا دەکات، چونکە فێربوون یەکێکە لە بەهێزترین ڕێگاکان بۆ ڕزگاربوون لە هەژاری و نەداری.",
        headline:
          "پەروەردە شتێک لە زانیاری زیاتر بە منداڵان دەبەخشێت. بڕوا بەخۆبوون، دەرفەت و داهاتوویەکیان پێدەبەخشێت کە قەیرانەکان ناتوانن بە ئاسانی لێیان بستێننەوە.",
        groups: [
          {
            title: "دەستکەوتە سەرەکییەکان",
            items: [
              "نۆژەنکردنەوەی ٣١٠ قوتابخانە",
              "دابەشکردنی ٣٦٢,٥٣٨ پێداویستی قوتابخانە و تێنووس و قەڵەم",
              "دروستکردنی ١٣١ پۆلی خوێندن",
              "کردنەوەی سەنتەری تەنهایی لە ساڵی ٢٠٢٢",
            ],
          },
          {
            title: "ئامانجەکانی داهاتووی پەروەردە",
            items: [
              "نۆژەنکردنەوەی ٢٠٠ قوتابخانە",
              "دروستکردنی ٥ قوتابخانەی نوێ",
              "جێبەجێکردنی ٢ پڕۆژەی گەڕانەوە بۆ قوتابخانە بۆ ئەو منداڵانەی کە وازیان لە خوێندن هێناوە",
            ],
          },
        ],
      },
      {
        id: "wash",
        title: "ئاو، ئاوەڕۆ و پاکوخاوێنی",
        intro:
          "کاری دەزگای خێرخوازیی بارزانی لە کەرتی ئاو، ئاوەڕۆ و پاکوخاوێنیدا سەرنج دەخاتە سەر دابینکردنی ئاوی خاوێن، خزمەتگوزارییەکانی ئاوەڕۆ و پاکوخاوێنی.",
        headline:
          "ئاوی خاوێن تەندروستی دەپارێزێت، کەرامەت دەگێڕێتەوە و پشتگیری لە ژیان دەکات لەو شوێنانەی کە قەیرانەکان پێداویستییە سەرەکییەکانیانی لێ زەوت کردووە.",
        groups: [
          {
            title: "چالاکییە سەرەکییەکان",
            items: [
              "پشتگیریکردنی ئاوی خواردنەوە",
              "تۆڕەکانی ئاو",
              "بیرەکانی ئاو",
              "پشتگیری ئاوەڕۆ و تەندروستی ژینگە",
              "خزمەتگوزارییەکانی پاکوخاوێنی",
              "گەیاندنی ئاو بە خێزانە کەمدەرامەتەکان",
            ],
          },
          {
            title: "پڕۆژە دیاریکراوەکان",
            items: [
              "لێدانی چوار بیری ئاو بۆ چوار گوند لە دهۆک لە ساڵی ٢٠١٩",
              "لێدانی چوار بیری ئاو لە چیای شنگال لە ساڵی ٢٠١٦",
              "گەیاندنی ٦٥,٨٦٤,٠٠٠ لیتر ئاوی خواردنەوە لە هەولێر لە ساڵی ٢٠٢١",
              "پشتگیریکردنی ٩,١٠٠ خێزان بە ئاوی خواردنەوە لە هەولێر لە ساڵی ٢٠٢٤",
            ],
          },
        ],
      },
      {
        id: "shelter",
        title: "حەوانەوە و بەدەمەوەچوونی فریاگوزاری",
        intro:
          "دەزگای خێرخوازیی بارزانی حەوانەوە و فریاگوزاری خێرا پێشکەش بە خێزانە ئاوارەکان و ئەو کۆمەڵگایانە دەکات کە بەهۆی شەڕ، قەیران و کارەساتی سروشتییەوە زیانیان بەرکەوتووە.",
        headline:
          "حەوانەوە یەکەم هەنگاوە بەرەو چاکبوونەوە و گەڕانەوە بۆ دۆخی ئاسایی. شوێنێکی ئارام هێز بە خێزانەکان دەبەخشێت بۆ ئەوەی سەرلەنوێ دەست پێبکەنەوە.",
        groups: [
          {
            title: "پڕۆژە دیاریکراوەکانی حەوانەوە و بەدەمەوەچوون",
            items: [
              "دروستکردنی ٤٠٠ کاراوان لە ڤان، تورکیا، لە ساڵانی ٢٠١١–٢٠١٢",
              "دروستکردنی ٣٠٠ کاراوان لە کامپی بەحرکە لە ساڵی ٢٠١٥",
              "دروستکردنی ٦٠٠ کاراوان لە کامپی دەرکار عەجەم لە ساڵی ٢٠١٦",
              "دابینکردنی ٤,١٢٩ خێمە دوای بوومەلەرزەی تورکیا و سوریا لە ساڵی ٢٠٢٣",
              "دابەشکردنی ٥٤٠ یەکەی نیشتەجێبوون بەسەر خێزانی شەهیداندا لە هەولێر و سۆران لە ساڵی ٢٠٢٤",
              "دروستکردنی ٢٠ خانوو لە شنگال لە ساڵی ٢٠٢٤",
            ],
          },
        ],
      },
      {
        id: "protection",
        title: "پاراستن و کەرامەتی مرۆیی",
        intro:
          "کاری دەزگای خێرخوازیی بارزانی لە کەرتی پاراستندا سەرنج دەخاتە سەر سەلامەتی، کەرامەت و خۆشگوزەرانی خەڵکی کەمدەرامەت و بێدەرەتان.",
        headline:
          "پاراستن تەنها بەدەمەوەچوون لە مەترسییەکان نییە، بەڵکو بەو مانایەیە کە دڵنیا بین لەوەی مامەڵە لەگەڵ هەر مرۆڤێکدا بە کەرامەت و ڕێز و بایەخ پێدانەوە دەکرێت.",
        groups: [
          {
            title: "تەرکیزی پاراستن",
            items: [
              "سەلامەتی جەستەیی",
              "پاڵپشتی دەروونی",
              "پاراستنی منداڵان",
              "پشتگیریکردنی خێزانە کەمدەرامەتەکان",
              "پشتگیریکردنی کەسانی خاوەن پێداویستی تایبەت",
              "هۆشیاری و ڕاهێنان",
              "خزمەتگوزارییەکانی پاراستنی کۆمەڵگە",
            ],
          },
        ],
      },
      {
        id: "rehabilitation",
        title: "ڕاهێنانەوە و گشتگیرکردن",
        intro:
          "دەزگای خێرخوازیی بارزانی پشتگیری کەسانی خاوەن پێداویستی تایبەت، منداڵانی ئۆتیزم و ئەو کۆمەڵگایانە دەکات کە بەدەست تەحەددییاتە تەندروستی و کۆمەڵایەتییەکانەوە دەناڵێنن.",
        headline:
          "تێکەڵکردنەوە واتە بەخشینی مافی بەشداریکردن، فێربوون، چاکبوونەوە و ژیان بە کەرامەتەوە بە هەر مرۆڤێک.",
        groups: [
          {
            title: "تەرکیزی ئێستا و داهاتوو",
            items: [
              "هۆشیاری و پشتگیریکردنی ئۆتیزم",
              "پشتگیریکردنی منداڵانی خاوەن پێداویستی تایبەت",
              "هۆشیارکردنەوە لە ماددە هۆشبەرەکان",
              "دەستپێشخەرییەکانی ڕاهێنانەوەی ئاڵوودەبووانی ماددەی هۆشبەر",
              "پشتگیری تێکەڵکردنەوە بۆ منداڵانی ئۆتیزم",
              "هۆشیاری گشتی لە ڕێگەی سیمینار، پۆستەر، نامیلکە و ڤیدیۆوە",
            ],
          },
          {
            title: "ئامانجەکانی داهاتوو",
            items: [
              "ڕاهێنانەوەی ٢٠٠ منداڵی ئۆتیزم",
              "تێکەڵکردنەوەی ١٠٠ منداڵی ئۆتیزم لە قوتابخانە حکومییەکاندا لە ماوەی پێنج ساڵدا",
              "کردنەوەی سێ سەنتەری ئۆتیزم لە هەرێمی کوردستان",
              "کردنەوەی سەنتەرێکی ڕاهێنانەوەی ئاڵوودەبووانی ماددەی هۆشبەر",
              "ڕێکخستنی پێنج سیمپۆزیۆمی هۆشیاری لەسەر ماددەی هۆشبەر",
            ],
          },
        ],
      },
      {
        id: "livelihood",
        title: "بژێوی ژیان و تواناسازی",
        intro:
          "دەزگای خێرخوازیی بارزانی پشتگیری پڕۆژەکانی بژێوی ژیان دەکات کە یارمەتی تاکەکان و خێزانەکان دەدەن بۆ ئەوەی زیاتر پشت بە خۆیان ببەستن.",
        headline:
          "بەهێزترین کاری مرۆیی تەنها یارمەتیدانی خەڵک نییە بۆ ئەوەی ئەمڕۆ بژین، بەڵکو یارمەتییان دەدات بۆ ئەوەی سبەینێ بە بەهێزی بوەستنەوە.",
        groups: [
          {
            title: "کەرتە سەرەکییەکان",
            items: [
              "گەشەپێدانی کارامەییەکان",
              "ڕاهێنانی پیشەیی",
              "پشتگیریکردنی دەرفەتی کار",
              "داهاتسازی",
              "بوژانەوەی کۆمەڵگە",
              "تواناسازی گەنجان و خێزانەکان",
            ],
          },
          {
            title: "سەنتەرەکانی ڕاهێنانی پیشەیی",
            items: [
              "پشتگیریکردنی ٢١ سەنتەری ڕاهێنانی پیشەیی",
              "٥٨٧,٢١٦ تاک لێیان سوودمەند بوون",
            ],
          },
        ],
      },
      {
        id: "camp",
        title: "بەڕێوەبردن و پشتگیریکردنی کامپەکان",
        intro:
          "دەزگای خێرخوازیی بارزانی بەڕێوەبردن و پشتگیریکردنی ئەو کامپانە دەکات کە خزمەتگوزاری بە پەنابەران و ئاوارە ناوخۆییەکان پێشکەش دەکەن.",
        headline:
          "بەڕێوەبردنی کامپ تەنها لۆجیستیک نییە، بەڵکو هەماهەنگی، پاراستن و بەرپرسیارێتی ڕۆژانەیە بەرامبەر بەو مرۆڤانەی کە لە دۆخی ئاوارەییدا دەژین.",
        groups: [
          {
            title: "خزمەتگوزارییەکانی کامپ",
            items: [
              "دابەشکردنی خۆراک و سووتەمەنی",
              "چاودێری پزیشکی",
              "بەڕێوەبردنی پاشماوەکان",
              "چاککردنەوە و ڕاگرتنی خێمە و کاراوانەکان",
              "پشتگیری پەروەردە و فێرکردن",
              "خزمەتگوزارییەکانی ئاو و ئاوەڕۆ",
              "ڕاهێنانی پیشەیی و ناپیشەیی",
              "هەماهەنگی لەگەڵ ڕێکخراوە ناحکومییەکان و لایەنە حکومییەکان",
              "داکۆکیکردن لە کەرامەت و خۆشگوزەرانی",
            ],
          },
          {
            title: "کامپەکان لە ئێستادا",
            items: [
              "بەڕێوەبردنی ٢٧ کامپ لە هەولێر و دهۆک",
              "خزمەتکردنی زیاتر لە ٢٠٠,٠٠٠ پەنابەر و ئاوارە بە ساڵێک لە ڕێگەی بەڕێوەبردنی کامپەکانەوە",
            ],
          },
        ],
      },
      {
        id: "nfi",
        title: "پێداویستییە ناخۆراکییەکان",
        intro:
          "پێداویستییە فریاگوزارییە سەرەکییەکان کە لەگەڵ خۆراک، ئاو، حەوانەوە و هاوکاری نەقدی پێکەوە بە خێزانە کەمدەرامەتەکان دەگەیەنرێن.",
        groups: [
          {
            title: "پێداویستییە فریاگوزارییە سەرەکییەکان",
            items: [
              "بەتانی",
              "پێداویستییەکانی زستانە",
              "دۆشەک",
              "پێداویستییەکانی چێشتخانە",
              "پێداویستییە بەپەلەکانی ناوماڵ",
            ],
          },
        ],
      },
      {
        id: "cash",
        title: "هاوکاری نەقدی و فریاگوزارییە سەرەکییەکان",
        intro:
          "دەزگای خێرخوازیی بارزانی پاڵپشتی دارایی ڕاستەوخۆ پێشکەش بەو خێزانانە دەکات کە پێویستیان بە یارمەتی بەپەلە هەیە بۆ دابینکردنی پێداویستییە سەرەکییەکانی ژیان.",
        headline:
          "هاوکاری نەقدی نەرمی و ئاسانکاری بە خێزانە کەمدەرامەتەکان دەبەخشێت بۆ دابینکردنی پێویستییە بەپەلەکانیان بە کەرامەتەوە.",
        groups: [
          {
            title: "ئاماری کاریگەری",
            items: ["دابەشکردنی ١٤١,٤٦٨,٢٦١,٠٠٢ دیناری عێراقی وەک هاوکاری نەقدی"],
          },
        ],
      },
      {
        id: "environment",
        title: "ژینگە و گۆڕانی کەشوهەوا",
        intro:
          "ئاڕاستەی داهاتووی دەزگای خێرخوازیی بارزانی پاراستنی ژینگە و هۆشیاری سەبارەت بە کەشوهەوا لەخۆ دەگرێت.",
        headline:
          "پاراستنی مرۆڤەکان بە مانای پاراستنی ئەو ژینگەیەش دێت کە پشتی پێ دەبەستن. کاری مرۆیی ناتوانێت چاوپۆشی لە گۆڕانی کەشوهەوا، ئاسایشی ئاو، ڕووبەری سەوزایی و مەرجەکانی داهاتووی ژیان بکات.",
        groups: [
          {
            title: "ئامانجەکانی داهاتوو",
            items: [
              "چاندنی یەک ملیۆن درەخت لە ماوەی پێنج ساڵدا",
              "کەمکردنەوەی بەکارهێنانی پلاستیک بە ڕێژەی ٨٠٪ لە نووسینگەکانی دەزگای خێرخوازیی بارزانیدا",
              "دەستپێکردنی پڕۆژەکانی ڕیسایکلین",
              "پەرەپێدانی هۆشیاری ژینگەیی",
              "پشتگیریکردنی هەرێمێکی کوردستانی تەندروستتر و سەوزتر",
            ],
          },
        ],
      },
    ],
    serveDetailCta: "بینینی وردەکاری",
    whoServesTitle: "کێ خزمەت دەکەین؟",
    howServesTitle: "چۆن خزمەت دەکەین؟",
    whoHowHint:
      "دەزگای خێرخوازیی بارزانی لە سەرانسەری سێکتەرە مرۆییە سەرەکییەکاندا کار دەکات بۆ دابینکردنی پێداویستییە بەپەلەکان و پاڵپشتیکردنی چاکبوونەوەی درێژخایەن.",
    whoServesItems: [
      "منداڵانی ئازیزان و بێ هاوژینان",
      "پەنابەر و ئاوارەکان",
      "کۆمەڵگە خانەخوێکان و خێزانە کەمداهاتەکان",
      "کەسانی خاوەن پێداویستی تایبەت",
      "منداڵان، گەنجان و کۆمەڵگە زیانلێکەوتووەکانی کارەسات",
    ],
    howServesItems: [
      "ئاسایشی خۆراک",
      "کاڵای نەخۆراکی",
      "ئاو، ئاوەڕۆ و پاکوخاوێنی (WASH)",
      "پەروەردە و گەشەپێدان",
      "بژێوی و هاوکاری نەختی",
      "پاراستن، تەندروستی، پەناگە و بەڕێوەبردنی کەمپ",
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
        id: "timeline",
        titleGold: "هێڵی کاتی",
        titleWhite: "دەزگاکە",
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
        titleWhite: "مرۆڤ دۆستانە",
        body: "وتەی «شانازییە بۆ مرۆڤ خزمەتکاری میللەتی خۆی بێ» تەنها دروشمێک نییە؛ بەڵکو بنەمای ئەخلاقی کارەکانی دەزگای خێرخوازی بارزانییە. کاری مرۆیی بەخشینێک نییە لە سەرەوە، بەڵکو خزمەتکردنە بە کەرامەتەوە.",
      },
      {
        id: "values",
        titleGold: "بەهاکانی",
        titleWhite: "پشت پەیامەکە",
        body: "دەزگا لە ڕێگەی بەهاکانەوە کار دەکات کە کاری مرۆیی ناوخۆیی و نێودەوڵەتی دادەڕێژن.",
      },
    ],
    storyValues: [
      {
        id: "neutrality",
        title: "بێلایەنی مرۆیی",
        body: "دەزگا یارمەتی دەدات تەنها لەسەر بنەمای پێویستی، بەبێ جیاوازی لەسەر سیاسەت، نەتەوە، ئایین، ڕەگەز یان پێشینە.",
      },
      {
        id: "dignity",
        title: "کەرامەت لە بەخشیندا",
        body: "پشتگیری بە شێوەیەک پێشکەش دەکرێت کە شەرەف و کەرامەتی هەر کەسێک بپارێزێت.",
      },
      {
        id: "resilience",
        title: "بەرگەگرتن و بەهێزکردن",
        body: "دەزگا لە فریاکەوتنی فریاگوزاری تێدەپەڕێت و کۆمەڵگەکان یارمەتی دەدات بۆ نۆژەنکردنەوە، گەڕانەوە و خۆبەڕێوەبردن.",
      },
      {
        id: "coexistence",
        title: "هاوژیانی ئاشتیانە",
        body: "دەزگا هاوژیانی ئاشتیانە لەنێوان کۆمەڵگە جیاوازە نەتەوەیی و ئایینییەکانی کوردستان پەرەپێدەدات.",
      },
      {
        id: "vulnerable",
        title: "پشتگیری لە لاوازەکان",
        body: "دەزگا خزمەتی خێزانە هەژارەکان، ئاوارەکان، پەنابەران، کەسانی خاوەن پێداویستی تایبەت، بەساڵاچووان، ئازیزان و گروپە لاوازەکانی تر دەکات.",
      },
      {
        id: "transparency",
        title: "ڕوونکاری",
        body: "دەزگا بەرپرسیارێتی لەبەردەم بەخشەران، هاوبەشان و سودمەندان دەپارێزێت بۆ ئەوەی سەرچاوەکان بگەنە ئەوانەی زۆرترین پێویستیان پێیەتی.",
      },
    ],
    storyMilestones: [
      { id: "founded", year: "2005", body: "دامەزراندنی دەزگا لە هەولێر." },
      { id: "orphan-care", year: "2009", body: "دەستپێکی پڕۆژەی چاودێری ئازیزان." },
      {
        id: "sinjar",
        year: "2014",
        body: "وەڵامی فریاکەوتن بۆ ئاوارەکانی چیای شنگال.",
      },
      {
        id: "camps",
        year: "2015",
        body: "بەڕێوەبردنی کەمپەکانی ئاوارە و پەنابەران لە هەولێر.",
      },
      {
        id: "ecosoc",
        year: "2016",
        body: "پێگەی ڕاوێژکاری ECOSOC لە نەتەوە یەکگرتووەکان و مۆڵەتە نێودەوڵەتییەکان.",
      },
      {
        id: "sphere",
        year: "2018",
        body: "نوێنەرایەتی Sphere لە هەرێمی کوردستان.",
      },
      {
        id: "uk-duhok",
        year: "2020",
        body: "ناسینەوەی کۆمیسیۆنی خێرخوازیی بەریتانیا و بەڕێوەبردنی کەمپی دهۆک.",
      },
      {
        id: "iso-quake",
        year: "2023",
        body: "بڕوانامەی ISO 9001:2015 و وەڵامی بوومەلەرزەی تورکیا و سووریا.",
      },
      {
        id: "recent",
        year: "2024–2026",
        body: "هەنگاوە گەورەکانی نیشتەجێبوون، تەندروستی، پەروەردە و ناسینەوەی نێودەوڵەتی.",
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
      "شازدە وڵات لە بیست ساڵدا، هەموویان لە هەولێرەوە بەڕێوە دەبرێن.",
    globalZoomHint: "ڕایبکێشە بۆ جوڵاندن · بیگوشە بۆ نزیکبوونەوە",
    globeHint: "ڕایبکێشە بۆ خولاندن · بیگوشە بۆ نزیکبوونەوە",
    viewGlobe: "گۆی زەوی",
    viewFlat: "نەخشەی تەخت",
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
      unitedStates: {
        name: "ویلایەتە یەکگرتووەکانی ئەمریکا",
        meta: "مۆڵەتدار",
        description:
          "لە ویلایەتە یەکگرتووەکان تۆمار کراوە بۆ کارکردن، کە هاوبەشی ڕوون و پشتگیریی مرۆیی بەرپرسیارانەی نێودەوڵەتی دەستەبەر دەکات.",
        facts: [
          "ئامادەبوونی مرۆیی مۆڵەتدار لە ویلایەتە یەکگرتووەکان",
          "پشتگیری بۆ هاوبەشییە نێودەوڵەتییە ڕوونەکان",
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
          "٤,١٢٩ چادر دوای بوومەلەرزەکانی تورکیا و سووریا لە ٢٠٢٣ دابین کرا",
          "چادر، بەتانی و پێداویستی زستانە بۆ خێزانە ئاوارەکان",
          "لەگەڵ وەڵامدانەوەکەی تورکیا پێکەوە گەیەنرا",
        ],
      },
      ukraine: { name: "ئۆکرانیا", meta: "ناوچەی کار", description: WORK_ONLY_KU, facts: [] },
      serbia: { name: "سربیا", meta: "ناوچەی کار", description: WORK_ONLY_KU, facts: [] },
      greece: { name: "یۆنان", meta: "ناوچەی کار", description: WORK_ONLY_KU, facts: [] },
      lebanon: { name: "لوبنان", meta: "ناوچەی کار", description: WORK_ONLY_KU, facts: [] },
      morocco: { name: "مەغریب", meta: "ناوچەی کار", description: WORK_ONLY_KU, facts: [] },
      saudiArabia: {
        name: "عەرەبستانی سعودی",
        meta: "ناوچەی کار",
        description: WORK_ONLY_KU,
        facts: [],
      },
      southSudan: { name: "باشووری سودان", meta: "ناوچەی کار", description: WORK_ONLY_KU, facts: [] },
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
          "پشتگیری کۆڤید-١٩ بۆ بەڕێوەبەرایەتی تەندروستی، یازدە قوتابخانەی نۆژەنکراوە، باخچەیەکی منداڵان لە ٢٠٢٣، و یارمەتی بەردەوامی خێزانی ئازیزان",
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
          "بەرنامەیەکی چەسپاو لە سووریا: کلینیکی گەڕۆک، ناوەندی کولتوور و گەشەپێدانی بارزانی، پشتگیری خوێندکاران، و ١٩٢ ئازیزانی سەرپەرشتیکراو.",
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
    ourImpact: "کاریگەرییەکانمان",
    impactTitleLead: "کاریگەرییەکانمان",
    impactTitleGold: "",
    impactSubtitle:
      "ژمارە گەورەکان پشتگیری دەکرێن بە چیرۆکی مرۆیی، وێنەی فەرمی و بەڵگەی پڕۆژە.",
    changing: "گۆڕینی ژیان",
    livesEveryday: "هەموو ڕۆژێک",
    impactTotals: [
      {
        id: "families",
        title: "خێزانی سوودمەند",
        description:
          "کۆی ژمارەی ئەو خێزانانەی لە ماوەی ١٩ ساڵدا لە چالاکی و یارمەتییەکانی ڕێکخراوەکە سوودمەند بوون.",
      },
      {
        id: "people",
        title: "کەسی سوودمەند",
        description:
          "کۆی ژمارەی ئەو کەسانەی لە ماوەی ١٩ ساڵدا لە چالاکی و یارمەتییەکانی ڕێکخراوەکە سوودمەند بوون.",
      },
    ],
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
    trustTitle: "متمانەی پشت کارەکانمان",
    trustTitleGold: "متمانەی",
    trustTitleRest: "پشت کارەکانمان",
    trustTopics: [
      { id: "leadership", title: "سەرکردایەتی و حوکمڕانی" },
      { id: "quality", title: "کوالیتی و باوەڕپێکراوی" },
      { id: "partnerships", title: "هاوبەشییەکان" },
      { id: "recognition", title: "پێزانین و خەڵاتەکان" },
    ],
    trustLeadershipTitle: "سەرکردایەتی و حوکمڕانی",
    trustAdminBoardTitle: "ئەندامانی دەستەی کارگێڕی",
    trustAdminBoardOpen: "بینینی ئەندامان",
    trustAdminBoardBody:
      "سەرپەرشتی بڕیارە سەرەکییەکان و ڕێساکان و ئاڕاستەکردنی پڕۆژەکان دەکات.",
    trustStaffGroups: [
      {
        id: "board",
        title: "ئەندامانی دەستەی کارگێڕی",
        members: [
          { id: "ibrahim", name: "ئیبراهیم سامین", role: "جێگری سەرۆکی دەزگا" },
          { id: "farzin", name: "فەرزین بەگزادە", role: "ئەندامی دەستەی کارگێڕی" },
          { id: "awat", name: "ئاوات ئەحمەد", role: "ئەندامی دەستەی کارگێڕی" },
          {
            id: "abdulwahid",
            name: "عەبدولواحید ئەمین",
            role: "ئەندامی دەستەی کارگێڕی و بەڕێوەبەری نووسینگەی دهۆک",
          },
          { id: "ways", name: "ویس جەلیل", role: "ئەندامی دەستەی کارگێڕی" },
          {
            id: "ismail-a",
            name: "ئیسماعیل عەبدولعەزیز",
            role: "ئەندامی دەستەی کارگێڕی",
          },
          {
            id: "karzan-n",
            name: "کارزان نووری",
            role: "ئەندامی دەستەی کارگێڕی و بەڕێوەبەری بەشی پلاندانانی پڕۆگرام",
          },
          {
            id: "rawaj",
            name: "ڕەواج حاجی",
            role: "ئەندامی دەستەی کارگێڕی و بەڕێوەبەری بەشی سەرچاوە مرۆییەکان",
          },
        ],
      },
    ],
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
      meta: "دەزگای خێرخوازیی بارزانی",
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
      timelineCta: "بینینی هێڵی کاتی حوکمڕانی",
      timelineTitle: "مەسرور بارزانی",
      timelineRange: "١٩٦٩ — ئێستا",
      timelineMilestones: [
        {
          id: "origins",
          year: "١٩٦٩",
          title: "ڕەگ و پێکهاتە",
          body: "مەسرور بارزانی لە ١٩٦٩دا لە دایکبوو و لە ماوەیەکی دیاریکەر لە مێژووی کوردیدا گەورە بوو. ساڵانی سەرەتاییی ژیانی بە دابڕان، بەرخودان، پەروەردە، و بەرپرسیارێتی خزمەتکردنی نەتەوەیەک لە ناکۆکیدا شێوە پێدرا.",
        },
        {
          id: "youth",
          year: "١٩٨٥",
          title: "لە گەنجییەوە بۆ بەرخودان",
          body: "لە ١٩٨٥دا، لە تەمەنی شانزە ساڵیدا، مەسرور بارزانی بەشداری پێشمەرگەی کوردستان بوو. خزمەتکردنی سەرەتاییی ئەو ڕاستەوخۆ لە ناو بەرخودانی کوردیدا بوو لە کاتی هەندێک لە قورسترین بەشەکانی.",
        },
        {
          id: "education",
          year: "١٩٩٣",
          title: "پەروەردە لە دەرەوەی سنوورەکان",
          body: "دوای ساڵانێک کە لە ناکۆکیدا شێوە پێدرا، مەسرور بارزانی پەروەردەی باڵا لە دەرەوە بەدواداچوو، تێگەیشتنی لە پەیوەندییە نێودەوڵەتییەکان، ئاشتی، و چارەسەرکردنی ناکۆکی بەهێزتر کرد.",
        },
        {
          id: "security",
          year: "١٩٩٨",
          title: "ئاسایش و دامەزراندنی دەوڵەت",
          body: "دوای گەڕانەوەی بۆ کوردستان لە ١٩٩٨دا، مەسرور بارزانی بەرپرسیارێتییە باڵاکانی لە دامەزراوە سیاسی و ئاسایشییەکان وەرگرت، دواتر بوو بە کانسێری ئەنجومەنی ئاسایشی هەرێمی کوردستان.",
        },
        {
          id: "service",
          year: "٢٠٠٥",
          title: "خزمەت لە دەرەوەی حکومەت",
          body: "کاری گشتیی مەسرور بارزانی هەروەها بۆ بواری مرۆیی و ئەکادیمی درێژ بوو، لەوانە دامەزراندنی دامەزراوەی خێرخوازی بارزانی و پشتگیری لە پەروەردەی باڵا لە کوردستان.",
        },
        {
          id: "cabinet",
          year: "٢٠١٩",
          title: "سەرۆک وەزیران — کابینەی نۆیەم",
          body: "لە ٢٠١٩دا، مەسرور بارزانی بوو بە سەرۆک وەزیرانی هەرێمی کوردستان و دامەزرا بۆ پێکهێنانی کابینەی نۆیەمی حکومەتی هەرێمی کوردستان.",
        },
      ],
    },
    bcfPresident: {
      open: "ناسینی سەرۆکی دەزگا",
      name: "موسا ئەحمەد ئاغا تاجەدین",
      role: "سەرۆکی دەزگا",
      meta: "دەزگای خێرخوازیی بارزانی",
      bioLabel: "ژیاننامە",
      bio: "لە ٥ی ئابی ١٩٧٤ لە گوندی کەلۆک لە ناوچەی بارزان لە دایک بووە و دەرچووی پەیمانگای هونەرە جوانەکانە. پابەندیی بە خزمەتی گشتی و مرۆیی لە تەمەنێکی زووەوە دەستی پێکرد.",
      journeyLabel: "دەستپێکی ڕێگا",
      journey: [
        {
          id: "students",
          period: "١٩٩٤ – ١٩٩٨",
          body: "سکرتێری یەکێتیی قوتابیانی کوردستان بووە",
        },
        {
          id: "bcf",
          period: "٢٠٠٧",
          body: "پەیوەستی بە سەرکردایەتیی دەزگای خێرخوازیی بارزانی بوو وەک جێگری سەرۆک و دواتر بوو بە سەرۆکی دەزگاکە",
        },
        {
          id: "tenure",
          period: "+١٩ ساڵ",
          body: "یارمەتی ڕێنمایی کردنی پەیامی مرۆیی دەزگاکە و فراوانکردنی پشتگیری بۆ کۆمەڵگە پێویستدارەکانی داوە.",
        },
      ],
      awardsLabel: "خەڵاتەکان",
      awards:
        "مەدالیای بارزانیی نەمر و سەدان شانازی و جیاکاری تری پێبەخشراوە. خێزاندارە و خاوەنی چوار منداڵە.",
    },
    bcfFounder: {
      open: "ناسینی ئەندامی بۆردی دامەزرێنەران",
      name: "سیداد مەلا مستەفا بارزانی",
      role: "ئەندامی بۆردی دامەزرێنەران",
      meta: "دەزگای خێرخوازیی بارزانی · لەدایکبووی ١٩٦٨",
      bioLabel: "ژیاننامە",
      bio: "سیداد بارزانی کوڕی ڕابەری نەتەوەیی کورد مەلا مستەفا بارزانی و برای بچووکی سەرۆک مەسعود بارزانییە. کەسایەتییەکی دیاری سیاسی و کۆمەڵایەتی و بڕیاردەرە، ئەندامی سەرکردایەتی و مەکتەبی سیاسیی پارتی دیموکراتی کوردستان و نوێنەری تایبەتی جەنابی سەرۆک مەسعود بارزانییە. بە کەسایەتییەکی ئارام و لەسەرخۆ ناسراوە، کاریگەری لەسەر دۆسیە کۆمەڵایەتی و سیاسییەکان هەیە، هەڵگری ئەزموونێکی دەوڵەمەندە لە خەباتی سیاسی و نیشتیمانی و نەتەوەیی و ژینگەپارێزیدا، ئەندامی بۆردی دامەزرێنەری دەزگای خێرخوازیی بارزانییە.",
      rolesLabel: "ڕۆڵ و چالاکییەکان",
      roles: [
        {
          id: "politburo",
          title: "ئەندامی مەکتەبی سیاسی",
          body: "لە کۆنگرەکانی پارتی دیموکراتی کوردستاندا وەک ئەندامی ئەنجومەنی سەرکردایەتی و دواتریش وەک ئەندامی مەکتەبی سیاسی و دەستەی کارگێڕی (کە بەرزترین دەستەی بڕیاردانی جێبەجێکردنی حیزبە) هەڵبژێردراوە.",
        },
        {
          id: "envoy",
          title: "نوێنەری تایبەتی سەرۆک بارزانی",
          body: "بە فەرمی ئەرکی نوێنەرایەتیکردنی سەرۆک مەسعود بارزانی پێسپێردراوە لە زۆربەی بۆنە سیاسی و نیشتیمانی و کۆمەڵایەتییەکاندا.",
        },
        {
          id: "bureau",
          title: "لێپرسراوی ئۆفیسی تایبەتی سەرۆک",
          body: "ڕۆڵێکی ناوەندی لە بەڕێوەبردنی پەیوەندییەکان، گەیاندنی ئاڕاستە سیاسییەکان و ڕێکخستنی دیداری سەرۆک بارزانی لەگەڵ شاند و کەسایەتییە ناوخۆیی و دەرەکییەکاندا دەگێڕێت.",
        },
      ],
      serviceLabel: "خەباتی پێشمەرگایەتی",
      serviceIntro:
        "سیداد بارزانی لە ناو جەرگەی خەبات و ژینگەی دەستپێکی شۆڕشە ڕزگاریخوازییەکانی کوردستاندا ژیاوە. وەک کوڕی مەلا مستەفا بارزانی، ژیانی لە تەمەنێکی زووەوە ئاوێتەی خەبات و سیاسەت و ڕووبەڕووبوونەوەی ستەم و زۆرداری بووە.",
      service: [
        {
          id: "gulan",
          title: "قۆناغی ئاوارەیی و شۆڕشی گوڵان",
          body: "لەگەڵ سەرکردایەتیی پارتی و براکانیدا (ئیدریس بارزانی و مەسعود بارزانی)، ئەگەرچی تەمەنی بچووک بووە، بەڵام هاوڕێ و شاهیدی سەردەمە سەختەکان بووە.",
        },
      ],
      partyLabel: "پلە و ئەرکەکان لە پارتیدا",
      party: [
        {
          id: "uprising",
          title: "بەشداری لە ڕاپەڕینی ١٩٩١",
          body: "لە کاتی ڕاپەڕینە مەزنەکەی کوردستان لە ئاداری ١٩٩١دا، بەشدار بووە لە ڕزگارکردنی ناوچە و شارەکانی کوردستان لە دەست ڕژێمی بەعس.",
        },
        {
          id: "isis",
          title: "شەڕی دژی داعش",
          body: "بەدرێژایی دەیەی ڕابردوو و تا ئێستاش، وەک کەسایەتییەکی کاریگەر و ئەندامی مەکتەبی سیاسی و دەستەی کارگێڕی، ئامادەیی بەردەوامی هەبووە — بەتایبەتی لە شەڕی دژی داعشدا — و سەرپەرشتی کۆبوونەوە و پشتگیرییە مەیدانییەکانی هێزەکانی پێشمەرگەی کردووە.",
        },
      ],
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
        id: "kuwait",
        title: "تۆمارکراو لە کوێت",
        body: "لە ساڵی ٢٠١٩ وەک ڕێکخراوێکی خێرخوازی لە کوێت تۆمارکراوە.",
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
      { id: "ar", label: "العربية" },
    ],
    touchToContinue: "اضغط للمتابعة",
    attractStart: "اضغط للبدء",
    attractTagline: "مؤسسة بارزاني الخيرية",
    attractEyebrow: "مؤسسة بارزاني الخيرية",
    attractCaption: "إرث من الخدمة.",
    enterHint: "اضغط في أي مكان",
    home: "الرئيسية",
    language: "اللغة",
    donate: "تبرّع",
    donateTitle: "تبرّع لمؤسسة بارزاني الخيرية",
    donateHint: "امسح هذا الرمز بهاتفك لفتح صفحة التبرع.",
    chooseLanguageHint: "يمكنك تغييرها في أي وقت من أدوات التحكم الجانبية.",
    idleTitle: "هل ما زلت معنا؟",
    idleBody: "تعود التجربة إلى البداية حتى يبدأ الزائر التالي تجربة جديدة.",
    idleContinue: "نعم، ما زلت هنا",
    humanity: "الإنسانية",
    dignity: "الكرامة",
    hope: "الأمل",
    quote: "شرفٌ عظيم أن يخدم الإنسان أبناء شعبه.",
    quoteAttr: "— مصطفى بارزاني",
    welcomeEyebrow: "مرحباً بكم في",
    welcomeTitleBcf: "BCF",
    welcomeTitleRest: "التجربة",
    welcomeBody: "اكتشفوا قصتنا وعملنا الإنساني والإنجاز الذي نصنعه معاً.",
    startJourney: "ابدأ الرحلة",
    journeyTitleLead: "اكتشف",
    journeyTitleGold: "رحلتنا",
    journeyEyebrow: "مؤسسة بارزاني الخيرية",
    journeySubtitle: "اضغط على فصل لاستكشافه",
    journeyChapters: [
      { id: "humanity", title: "الإنسانية في العمل" },
      { id: "story", title: "قصتنا" },
      { id: "map", title: "أين نعمل" },
      { id: "impact", title: "إنجازاتنا" },
      { id: "trust", title: "الثقة وراء العمل" },
      { id: "future", title: "المستقبل والإرث" },
    ],
    whoWeServeWhite: "من",
    whoWeServeGold: "نخدم",
    serveCategories: [
      {
        id: "food",
        title: "الأمن الغذائي",
        intro:
          "الأمن الغذائي أحد القطاعات الإنسانية الأساسية للمؤسسة، حيث تُقدَّم المساعدات الغذائية للأسر الضعيفة والنازحين واللاجئين والمجتمعات المتأثرة بالأزمات.",
        headline:
          "الدعم الغذائي أكثر من مجرد وجبة؛ إنه استقرار في زمن عدم اليقين، وكرامة في زمن الشدة، وأمل في زمن الأزمة.",
        groups: [
          {
            title: "الأنشطة الرئيسية",
            items: [
              "توزيع المواد الغذائية الجافة",
              "الوجبات الساخنة",
              "السلال الغذائية",
              "الاستجابة الغذائية الطارئة",
              "دعم متوافق مع المعايير الإنسانية للأمن الغذائي",
            ],
          },
          {
            title: "أرقام الأثر",
            items: [
              "776,427 طناً من المواد الغذائية الجافة تم توزيعها",
              "14,429,226 وجبة ساخنة تم توزيعها",
              "2,450,099 سلة غذائية تم توزيعها",
            ],
          },
        ],
      },
      {
        id: "health",
        title: "الصحة والدعم الطبي",
        intro:
          "تدعم المؤسسة الخدمات الصحية للمجتمعات الضعيفة من خلال المشاريع الطبية ودعم المرافق وبرامج العلاج.",
        headline:
          "الرعاية الصحية لا تحمي الجسد وحده، بل تحمي الكرامة واستقرار الأسرة والحق في العيش بأمل.",
        groups: [
          {
            title: "مشاريع صحية مختارة",
            items: [
              "بناء وافتتاح خمسة مراكز للرعاية الصحية الأولية",
              "ترميم مستشفى خليفان",
              "ترميم مستشفى البيشمركة",
              "ترميم مستشفى الولادة في عقرة",
              "افتتاح مركز استشاري في مخيم بردرش",
              "مشروع جراحة القلب الخلقي عند الأطفال",
              "دعم الأطفال المرضى المحوَّلين للعلاج بالخارج",
              "الدعم الطبي للمجتمعات النازحة",
            ],
          },
        ],
      },
      {
        id: "education",
        title: "التعليم والتنمية البشرية",
        intro:
          "تستثمر المؤسسة في التعليم لأنه من أقوى السبل للخروج من دائرة الفقر والضعف.",
        headline:
          "التعليم يمنح الأطفال أكثر من المعرفة؛ يمنحهم الثقة والفرصة ومستقبلاً لا تسلبه الأزمات بسهولة.",
        groups: [
          {
            title: "الإنجازات الرئيسية",
            items: [
              "ترميم 310 مدارس",
              "توزيع 362,538 قطعة من المواد واللوازم المدرسية",
              "بناء 131 صفاً دراسياً",
              "افتتاح مركز تناهي عام 2022",
            ],
          },
          {
            title: "الأهداف المستقبلية",
            items: [
              "ترميم 200 مدرسة",
              "بناء 5 مدارس جديدة",
              "تنفيذ مشروعين لإعادة الأطفال المتسرّبين إلى المدارس",
            ],
          },
        ],
      },
      {
        id: "wash",
        title: "المياه والصرف الصحي والنظافة",
        intro:
          "يركّز عمل المؤسسة في هذا القطاع على توفير المياه النظيفة وخدمات الصرف الصحي والنظافة.",
        headline:
          "المياه النظيفة تحمي الصحة وتعيد الكرامة وتصون الحياة حيث سلبت الأزمات أبسط المقوّمات.",
        groups: [
          {
            title: "الأنشطة الرئيسية",
            items: [
              "دعم مياه الشرب",
              "شبكات المياه",
              "آبار المياه",
              "دعم الصرف الصحي",
              "خدمات النظافة",
              "توصيل المياه للأسر الضعيفة",
            ],
          },
          {
            title: "مشاريع مختارة",
            items: [
              "حفر أربع آبار مياه لأربع قرى في دهوك عام 2019",
              "حفر أربع آبار مياه في جبل سنجار عام 2016",
              "توزيع 65,864,000 لتر من مياه الشرب في أربيل عام 2021",
              "دعم 9,100 عائلة بمياه الشرب في أربيل عام 2024",
            ],
          },
        ],
      },
      {
        id: "shelter",
        title: "المأوى والاستجابة الطارئة",
        intro:
          "توفّر المؤسسة المأوى والإغاثة الطارئة للأسر والمجتمعات النازحة جرّاء الحروب والأزمات والكوارث الطبيعية.",
        headline:
          "المأوى هو الخطوة الأولى نحو التعافي والعودة إلى الحياة الطبيعية؛ فالمكان الآمن يمنح الأسرة القوة لتبدأ من جديد.",
        groups: [
          {
            title: "مشاريع مختارة في المأوى والاستجابة",
            items: [
              "إنشاء 400 كرفان في فان، تركيا، بين عامي 2011 و2012",
              "إنشاء 300 كرفان في مخيم بحركة عام 2015",
              "إنشاء 600 كرفان في مخيم دركرعجم عام 2016",
              "توزيع 4,129 خيمة بعد زلزال تركيا وسوريا عام 2023",
              "توزيع 540 وحدة سكنية على عائلات الشهداء في أربيل وسوران عام 2024",
              "بناء 20 منزلاً في سنجار عام 2024",
            ],
          },
        ],
      },
      {
        id: "protection",
        title: "الحماية والكرامة الإنسانية",
        intro:
          "يركّز عمل المؤسسة في مجال الحماية على سلامة الأفراد الضعفاء وكرامتهم ورفاههم.",
        headline:
          "الحماية أكثر من مجرد الاستجابة للخطر؛ إنها ضمان أن يُعامَل كل إنسان بكرامة واحترام وتقدير.",
        groups: [
          {
            title: "محاور الحماية",
            items: [
              "السلامة الجسدية",
              "الدعم النفسي",
              "حماية الطفل",
              "دعم الأسر الضعيفة",
              "دعم ذوي الإعاقة",
              "التوعية والتدريب",
              "خدمات الحماية المجتمعية",
            ],
          },
        ],
      },
      {
        id: "rehabilitation",
        title: "إعادة التأهيل والدمج",
        intro:
          "تدعم المؤسسة ذوي الإعاقة والأطفال المصابين بالتوحّد والمجتمعات المتأثرة بالتحديات الصحية والاجتماعية.",
        headline:
          "الدمج يعني منح كل إنسان الحق في المشاركة والتعلّم والتعافي والعيش بكرامة.",
        groups: [
          {
            title: "التركيز الحالي والمستقبلي",
            items: [
              "التوعية بالتوحّد ودعم المصابين به",
              "دعم الأطفال ذوي الإعاقة",
              "التوعية بمخاطر الإدمان",
              "مبادرات التأهيل من الإدمان",
              "دعم إعادة دمج الأطفال المصابين بالتوحّد",
              "التوعية العامة عبر الندوات والملصقات والمنشورات والفيديوهات",
            ],
          },
          {
            title: "أهداف مستقبلية",
            items: [
              "تأهيل 200 طفل من ذوي التوحّد",
              "دمج 100 طفل من ذوي التوحّد في المدارس الحكومية خلال خمس سنوات",
              "افتتاح ثلاثة مراكز للتوحّد في إقليم كوردستان",
              "افتتاح مركز لتأهيل مدمني المخدرات",
              "تنظيم خمس ندوات توعوية حول مخاطر الإدمان",
            ],
          },
        ],
      },
      {
        id: "livelihood",
        title: "سبل العيش والتمكين",
        intro:
          "تدعم المؤسسة مشاريع سبل العيش التي تساعد الأفراد والأسر على تحقيق مزيد من الاعتماد على الذات.",
        headline:
          "أقوى عمل إنساني لا يكتفي بمساعدة الناس على النجاة اليوم، بل يساعدهم على الوقوف أقوى غداً.",
        groups: [
          {
            title: "المحاور الرئيسية",
            items: [
              "تطوير المهارات",
              "التدريب المهني",
              "دعم فرص العمل",
              "توليد الدخل",
              "تعافي المجتمعات",
              "تمكين الشباب والأسر",
            ],
          },
          {
            title: "مراكز التدريب المهني",
            items: [
              "دعم 21 مركزاً للتدريب المهني",
              "استفادة 587,216 شخصاً منها",
            ],
          },
        ],
      },
      {
        id: "camp",
        title: "المخيمات ودعم النازحين",
        intro:
          "تدير المؤسسة وتدعم مخيمات تخدم اللاجئين والنازحين داخلياً.",
        headline:
          "إدارة المخيمات ليست عملاً لوجستياً فحسب؛ إنها تنسيق وحماية ومسؤولية يومية تجاه أناس يعيشون في النزوح.",
        groups: [
          {
            title: "خدمات المخيمات",
            items: [
              "توزيع الغذاء والوقود",
              "الرعاية الطبية",
              "إدارة النفايات",
              "صيانة الخيام والكرفانات",
              "دعم التعليم",
              "خدمات المياه والصرف الصحي",
              "التدريب المهني وغير المهني",
              "التنسيق مع المنظمات غير الحكومية والجهات الحكومية",
              "المناصرة من أجل الكرامة والرفاه",
            ],
          },
          {
            title: "المخيمات اليوم",
            items: [
              "إدارة 27 مخيماً في أربيل ودهوك",
              "خدمة أكثر من 200,000 لاجئ ونازح سنوياً عبر إدارة المخيمات",
            ],
          },
        ],
      },
      {
        id: "nfi",
        title: "المواد غير الغذائية",
        intro:
          "مواد إغاثية أساسية تُسلَّم للأسر الضعيفة إلى جانب دعم الغذاء والمياه والمأوى والمساعدات النقدية.",
        groups: [
          {
            title: "مواد الإغاثة الأساسية",
            items: [
              "البطانيات",
              "مستلزمات الشتاء",
              "الفرشات",
              "مستلزمات المطبخ",
              "الأدوات المنزلية الطارئة",
            ],
          },
        ],
      },
      {
        id: "cash",
        title: "المساعدات النقدية والإغاثة الأساسية",
        intro:
          "تقدّم المؤسسة دعماً مالياً مباشراً للأسر التي تحتاج مساعدة عاجلة لتغطية احتياجات الحياة الأساسية.",
        headline:
          "المساعدة النقدية تمنح الأسر الضعيفة مرونة تلبية احتياجاتها العاجلة بكرامة.",
        groups: [
          {
            title: "رقم الأثر",
            items: ["141,468,261,002 ديناراً عراقياً تم توزيعها كمساعدات نقدية"],
          },
        ],
      },
      {
        id: "environment",
        title: "البيئة وتغيّر المناخ",
        intro:
          "يشمل التوجّه المستقبلي للمؤسسة حماية البيئة والتوعية بتغيّر المناخ.",
        headline:
          "حماية الناس تعني أيضاً حماية البيئة التي يعتمدون عليها؛ فالعمل الإنساني لا يمكنه تجاهل تغيّر المناخ وأمن المياه والمساحات الخضراء وشروط الحياة المقبلة.",
        groups: [
          {
            title: "الأهداف المستقبلية",
            items: [
              "زراعة مليون شجرة خلال خمس سنوات",
              "خفض استخدام البلاستيك بنسبة 80% في مكاتب المؤسسة",
              "إطلاق مشاريع لإعادة التدوير",
              "تعزيز الوعي البيئي",
              "دعم إقليم كوردستان نحو بيئة أكثر صحة وخضرة",
            ],
          },
        ],
      },
    ],
    serveDetailCta: "عرض التفاصيل",
    whoServesTitle: "من تخدم المؤسسة",
    howServesTitle: "كيف تخدم المؤسسة",
    whoHowHint:
      "تعمل المؤسسة عبر قطاعات إنسانية رئيسية لتلبية الاحتياجات العاجلة ودعم التعافي طويل الأمد.",
    whoServesItems: [
      "الأيتام والأرامل",
      "اللاجئون والنازحون",
      "المجتمعات المضيفة والأسر ذات الدخل المحدود",
      "ذوو الإعاقة",
      "الأطفال والشباب والمجتمعات المتضررة من الكوارث",
    ],
    howServesItems: [
      "الأمن الغذائي",
      "المواد غير الغذائية",
      "المياه والصرف الصحي والنظافة (WASH)",
      "التعليم والتنمية",
      "سبل العيش والمساعدات النقدية",
      "الحماية، الصحة، المأوى وإدارة المخيمات",
    ],
    storyTimelineStart: "2005",
    storyTimelineEnd: "اليوم",
    storyScrollHint: "مرّر لأسفل الصفحة",
    storySections: [
      {
        id: "foundation",
        titleGold: "إرث",
        titleWhite: "من الخدمة",
        body: "تأسست مؤسسة بارزاني الخيرية رسمياً عام 2005 في أربيل، عاصمة إقليم كوردستان العراق، لتحوّل التعاطف إلى عمل إنساني منظم.",
      },
      {
        id: "timeline",
        titleGold: "المسار",
        titleWhite: "المؤسسي",
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
        body: "العمل الإنساني ليس تفضّلاً على الناس، بل خدمة تحفظ كرامتهم وتتعامل معهم كبشر، لا كأرقام.",
      },
      {
        id: "values",
        titleGold: "القيم",
        titleWhite: "التي تقوم عليها الرسالة",
        body: "تعمل المؤسسة من خلال قيم تشكّل العمل الإنساني محلياً ودولياً.",
      },
    ],
    storyValues: [
      {
        id: "neutrality",
        title: "الحياد الإنساني",
        body: "تقدم المؤسسة المساعدة على أساس الحاجة وحدها، دون تمييز على أساس السياسة أو العرق أو الدين أو الجنس أو الخلفية.",
      },
      {
        id: "dignity",
        title: "الكرامة في العطاء",
        body: "يُقدَّم الدعم بطريقة تحمي شرف وكرامة كل شخص يُخدم.",
      },
      {
        id: "resilience",
        title: "الصمود والتمكين",
        body: "تعمل المؤسسة بما يتجاوز الإغاثة الطارئة بمساعدة المجتمعات على إعادة البناء والتعافي والاعتماد على الذات.",
      },
      {
        id: "coexistence",
        title: "التعايش والانسجام",
        body: "تعزز المؤسسة التعايش السلمي بين مجتمعات كردستان المتنوعة عرقياً ودينياً.",
      },
      {
        id: "vulnerable",
        title: "دعم الفئات الضعيفة",
        body: "تخدم المؤسسة العائلات الفقيرة والنازحين واللاجئين وذوي الإعاقة وكبار السن والأيتام وغيرهم من الفئات الضعيفة.",
      },
      {
        id: "transparency",
        title: "الشفافية",
        body: "تحافظ المؤسسة على المساءلة أمام المانحين والشركاء والمستفيدين لضمان وصول الموارد إلى الأكثر احتياجاً.",
      },
    ],
    storyMilestones: [
      { id: "founded", year: "2005", body: "تأسيس المؤسسة في أربيل." },
      { id: "orphan-care", year: "2009", body: "انطلاق مشروع رعاية الأيتام." },
      {
        id: "sinjar",
        year: "2014",
        body: "استجابة طارئة للنازحين على جبل سنجار.",
      },
      {
        id: "camps",
        year: "2015",
        body: "إدارة مخيمات النازحين واللاجئين في أربيل.",
      },
      {
        id: "ecosoc",
        year: "2016",
        body: "الوضع الاستشاري لدى المجلس الاقتصادي والاجتماعي للأمم المتحدة وترخيص دولي.",
      },
      {
        id: "sphere",
        year: "2018",
        body: "تمثيل Sphere في إقليم كوردستان.",
      },
      {
        id: "uk-duhok",
        year: "2020",
        body: "اعتراف هيئة المؤسسات الخيرية البريطانية وإدارة مخيم دهوك.",
      },
      {
        id: "iso-quake",
        year: "2023",
        body: "شهادة ISO 9001:2015 والاستجابة لزلزال تركيا وسوريا.",
      },
      {
        id: "recent",
        year: "2024–2026",
        body: "محطات كبرى في الإسكان والصحة والتعليم والاعتراف الدولي.",
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
    tapToExplore: "اضغط للاستكشاف",
    mapScopes: {
      global: "عالمياً",
      kurdistan: "داخل كردستان",
    },
    globalLead:
      "تعمل المؤسسة في 16 دولة خلال 20 عاماً، وتُدار عملياتها من أربيل.",
    globalZoomHint: "اسحب للتحريك، وقرّب إصبعين للتكبير",
    globeHint: "اسحب للتدوير، وقرّب إصبعين للتكبير",
    viewGlobe: "الكرة الأرضية",
    viewFlat: "خريطة مسطحة",
    zoomIn: "تكبير",
    zoomOut: "تصغير",
    resetView: "إعادة العرض",
    globalKinds: {
      hq: "المقر",
      registered: "مرخّص",
      response: "الطوارئ",
      work: "منطقة العمل",
    },
    globalLocations: {
      kurdistan: {
        name: "إقليم كردستان، العراق",
        meta: "منذ 2005",
        description:
          "تأسست المؤسسة في أربيل، وحصلت على ترخيص للعمل في كلٍّ من جمهورية العراق وإقليم كوردستان، ومن هنا تُصمَّم برامجها وتُدار.",
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
      unitedStates: {
        name: "الولايات المتحدة الأمريكية",
        meta: "مرخّصة",
        description:
          "مسجّلة للعمل في الولايات المتحدة، بما يتيح شراكات شفافة ودعماً إنسانياً عابراً للحدود بمسؤولية.",
        facts: [
          "حضور إنساني مرخّص في الولايات المتحدة",
          "يدعم الشراكات الشفافة عبر الحدود",
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
          "توزيع 4,129 خيمة بعد زلزال تركيا وسوريا عام 2023",
          "خيام وبطانيات ومستلزمات شتوية للعائلات النازحة",
          "نُفِّذت بالتوازي مع الاستجابة في تركيا",
        ],
      },
      ukraine: { name: "أوكرانيا", meta: "منطقة عمل", description: WORK_ONLY_AR, facts: [] },
      serbia: { name: "صربيا", meta: "منطقة عمل", description: WORK_ONLY_AR, facts: [] },
      greece: { name: "اليونان", meta: "منطقة عمل", description: WORK_ONLY_AR, facts: [] },
      lebanon: { name: "لبنان", meta: "منطقة عمل", description: WORK_ONLY_AR, facts: [] },
      morocco: { name: "المغرب", meta: "منطقة عمل", description: WORK_ONLY_AR, facts: [] },
      saudiArabia: {
        name: "السعودية",
        meta: "منطقة عمل",
        description: WORK_ONLY_AR,
        facts: [],
      },
      southSudan: { name: "جنوب السودان", meta: "منطقة عمل", description: WORK_ONLY_AR, facts: [] },
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
    ourImpact: "إنجازاتنا",
    impactTitleLead: "إنجازاتنا",
    impactTitleGold: "",
    impactSubtitle:
      "تعرض هذه الأرقام الرئيسية قصصاً إنسانية، وصوراً رسمية، وأدلة موثّقة على مشاريع المؤسسة.",
    changing: "نغيّر حياة الناس",
    livesEveryday: "كل يوم",
    impactTotals: [
      {
        id: "families",
        title: "أُسرة مستفيدة",
        description:
          "إجمالي عدد الأسر التي استفادت من أنشطة ومساعدات المنظمة خلال 19 عامًا.",
      },
      {
        id: "people",
        title: "مستفيد فرد",
        description:
          "إجمالي عدد الأشخاص الذين استفادوا من أنشطة ومساعدات المنظمة خلال 19 عامًا.",
      },
    ],
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
    trustAdminBoardTitle: "أعضاء الهيئة الإدارية",
    trustAdminBoardOpen: "عرض الأعضاء",
    trustAdminBoardBody:
      "يراجع ويقرّ القرارات الكبرى والسياسات ومسار المشاريع.",
    trustStaffGroups: [
      {
        id: "board",
        title: "أعضاء الهيئة الإدارية",
        members: [
          { id: "ibrahim", name: "إبراهيم سامين", role: "نائب رئيس المؤسسة" },
          { id: "farzin", name: "فرزين بغزادة", role: "عضو الهيئة الإدارية" },
          { id: "awat", name: "آوات أحمد", role: "عضو الهيئة الإدارية" },
          {
            id: "abdulwahid",
            name: "عبدالواحد أمين",
            role: "عضو الهيئة الإدارية ومدير مكتب دهوك",
          },
          { id: "ways", name: "ويس جليل", role: "عضو الهيئة الإدارية" },
          {
            id: "ismail-a",
            name: "إسماعيل عبدالعزيز",
            role: "عضو الهيئة الإدارية",
          },
          {
            id: "karzan-n",
            name: "كارزان نوري",
            role: "عضو الهيئة الإدارية ومدير قسم تخطيط البرامج",
          },
          {
            id: "rawaj",
            name: "رواج حاجي",
            role: "عضو الهيئة الإدارية ومدير قسم الموارد البشرية",
          },
        ],
      },
    ],
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
      meta: "مؤسسة بارزاني الخيرية",
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
      timelineCta: "عرض المسار الزمني للحوكمة",
      timelineTitle: "مسرور بارزاني",
      timelineRange: "1969 — اليوم",
      timelineMilestones: [
        {
          id: "origins",
          year: "1969",
          title: "الأصول والنشأة",
          body: "وُلد مسرور بارزاني عام 1969 ونشأ في فترة محورية من تاريخ كردستان. شكلت سنواته الأولى النزوح والمقاومة والتعليم ومسؤولية خدمة أمة في صراع.",
        },
        {
          id: "youth",
          year: "1985",
          title: "من الشباب إلى المقاومة",
          body: "في عام 1985، وفي سن السادسة عشرة، انضم مسرور بارزاني إلى پێشمەرگە كردستان. وضعته خدمته المبكرة مباشرة في صلب النضال الكردي خلال بعض أصعب فصوله.",
        },
        {
          id: "education",
          year: "1993",
          title: "التعليم عبر الحدود",
          body: "بعد سنوات شكلها الصراع، واصل مسرور بارزاني التعليم العالي في الخارج، وتعزيز فهمه للعلاقات الدولية والسلام وحل النزاعات.",
        },
        {
          id: "security",
          year: "1998",
          title: "الأمن وبناء الدولة",
          body: "بعد عودته إلى كردستان عام 1998، تولى مسرور بارزاني مسؤوليات عليا في المؤسسات السياسية والأمنية، ثم أصبح مستشار مجلس أمن إقليم كردستان.",
        },
        {
          id: "service",
          year: "2005",
          title: "خدمة خارج نطاق الحكومة",
          body: "امتد عمل مسرور بارزاني العام أيضًا إلى المجالات الإنسانية والأكاديمية، بما في ذلك تأسيس مؤسسة بارزاني الخيرية ودعم التعليم العالي في كردستان.",
        },
        {
          id: "cabinet",
          year: "2019",
          title: "رئيس الوزراء — الحكومة التاسعة",
          body: "في عام 2019، أصبح مسرور بارزاني رئيسًا لوزراء إقليم كردستان وعُيّن لتشكيل الحكومة التاسعة للحكومة الإقليمية لكردستان.",
        },
      ],
    },
    bcfPresident: {
      open: "تعرّف على رئيس المؤسسة",
      name: "موسى أحمد آغا تاج الدين",
      role: "رئيس المؤسسة",
      meta: "مؤسسة بارزاني الخيرية",
      bioLabel: "السيرة الذاتية",
      bio: "وُلد في 5 آب/أغسطس 1974 في قرية كالوك بمنطقة بارزان، وتخرّج في معهد الفنون الجميلة. وبدأ التزامه بالخدمة العامة والإنسانية في سن مبكرة.",
      journeyLabel: "بداية المسيرة",
      journey: [
        {
          id: "students",
          period: "1994 – 1998",
          body: "عمل سكرتيراً لاتحاد طلبة كوردستان",
        },
        {
          id: "bcf",
          period: "2007",
          body: "انضم إلى قيادة مؤسسة بارزاني الخيرية نائباً للرئيس، ثم أصبح رئيساً لها",
        },
        {
          id: "tenure",
          period: "+19 عاماً",
          body: "ساعد في توجيه الرسالة الإنسانية للمؤسسة وتوسيع دعمها للمجتمعات المحتاجة.",
        },
      ],
      awardsLabel: "التكريمات",
      awards:
        "مُنح وسام البارزاني الخالد، إلى جانب مئات الأوسمة والتكريمات الأخرى. وهو متزوج ولديه أربعة أطفال.",
    },
    bcfFounder: {
      open: "تعرّف على عضو الهيئة التأسيسية",
      name: "سيداد ملا مصطفى بارزاني",
      role: "عضو الهيئة التأسيسية",
      meta: "مؤسسة بارزاني الخيرية · مواليد 1968",
      bioLabel: "السيرة الذاتية",
      bio: "وُلد سيداد بارزاني عام 1968، وهو نجل الزعيم الوطني الكوردي ملا مصطفى بارزاني والشقيق الأصغر للرئيس مسعود بارزاني. ويُعد شخصية سياسية واجتماعية بارزة، وعضواً في مجلس القيادة والمكتب السياسي للحزب الديمقراطي الكوردستاني، وممثلاً خاصاً للرئيس مسعود بارزاني. ويُعرف بشخصيته الهادئة والمتزنة وتأثيره في الملفات السياسية والاجتماعية، كما يمتلك خبرة واسعة في النضال السياسي والوطني والقومي وحماية البيئة، ويشغل عضوية الهيئة التأسيسية لمؤسسة بارزاني الخيرية.",
      rolesLabel: "المهام والأنشطة",
      roles: [
        {
          id: "politburo",
          title: "عضوية المكتب السياسي",
          body: "انتُخب في مؤتمرات الحزب عضواً في مجلس القيادة، ثم عضواً في المكتب السياسي والهيئة الإدارية، وهي أعلى سلطة تنفيذية لاتخاذ القرار في الحزب.",
        },
        {
          id: "envoy",
          title: "الممثل الخاص للرئيس بارزاني",
          body: "كُلّف رسمياً بتمثيل الرئيس مسعود بارزاني في غالبية المحافل والمناسبات السياسية والوطنية والاجتماعية.",
        },
        {
          id: "bureau",
          title: "مسؤول المكتب الخاص للرئيس",
          body: "يؤدي دوراً محورياً في إدارة العلاقات، وإيصال التوجيهات السياسية، وتنظيم لقاءات الرئيس بارزاني مع الوفود والشخصيات والقادة المحليين والدوليين.",
        },
      ],
      serviceLabel: "مسيرة نضال البيشمركة",
      serviceIntro:
        "نشأ سيداد بارزاني في خضم النضال والبيئة التي انطلقت منها الثورات التحررية الكوردستانية. وبصفته نجل ملا مصطفى بارزاني، ارتبطت حياته منذ سن مبكرة بالنضال والعمل السياسي ومواجهة الظلم والاستبداد.",
      service: [
        {
          id: "gulan",
          title: "مرحلة النزوح وثورة كولان",
          body: "رافق قيادة الحزب وشقيقيه إدريس بارزاني ومسعود بارزاني، ورغم صغر سنه آنذاك كان رفيقاً وشاهداً على تلك المراحل العصيبة.",
        },
      ],
      partyLabel: "المواقع التنظيمية في الحزب",
      party: [
        {
          id: "uprising",
          title: "المشاركة في انتفاضة 1991",
          body: "شارك بفاعلية في انتفاضة كوردستان الكبرى في آذار/مارس 1991، وأسهم في تحرير مدن ومناطق كوردستان من قبضة نظام البعث.",
        },
        {
          id: "isis",
          title: "الحرب ضد داعش",
          body: "على مدى العقد الماضي وحتى اليوم، واصل حضوره الميداني الفاعل بصفته عضواً في المكتب السياسي والهيئة الإدارية، ولا سيما خلال الحرب ضد تنظيم داعش، حيث أشرف على الاجتماعات وقدّم الدعم الميداني لقوات البيشمركة.",
        },
      ],
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
        id: "kuwait",
        title: "مسجَّلة في الكويت",
        body: "مسجَّلة كمنظمة خيرية في الكويت عام 2019.",
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
    legacyThanksBody: "شكراً لزيارتكم وخوضكم تجربة مؤسسة بارزاني الخيرية.",
    legacyRestart: "العودة إلى البداية",
    futureHeadingWhite: "المستقبل",
    futureHeadingGold: "الذي",
    futureHeadingRest: "نبنيه",
    futureSubtitle:
      "أهداف استراتيجية تركز على الناس والتعليم وإعادة التأهيل والبيئة والتأهب للأزمات.",
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
