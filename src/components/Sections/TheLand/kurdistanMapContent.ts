import type { DiscoverLangCode } from "@/components/Sections/discoverLanguage";

/**
 * Copy and palette for the Kurdistan map on The Land.
 *
 * Four layers, four colours, drawn from the flag rather than invented: the gold
 * of the sun for the homeland, green for the Region, red for the Kurdistani
 * areas still being argued over, and a cool slate for the four states — the one
 * layer that is not Kurdish ground, so the one colour that is not from the flag.
 */

export type LandMapLayerId = "greater" | "region" | "disputed" | "presence";

/** Legend order: outward from the Region, ending on the states that hold it. */
export const LAND_MAP_LAYERS: LandMapLayerId[] = ["greater", "region", "disputed", "presence"];

export const LAND_MAP_COLORS: Record<LandMapLayerId, { fill: string; line: string; ink: string }> = {
  greater: { fill: "#d8a63c", line: "#a97717", ink: "#7a5310" },
  region: { fill: "#2f6d4c", line: "#1d4c33", ink: "#173d29" },
  disputed: { fill: "#963538", line: "#6f2325", ink: "#5c1d1f" },
  presence: { fill: "#5c6f9e", line: "#3f5079", ink: "#334063" },
};

/** Parchment ground the layers are painted on, shared with the rest of The Land. */
export const LAND_MAP_PAPER = {
  sea: "#dce8ef",
  seaLine: "#a9c3d2",
  land: "#f2e8d3",
  landLine: "#cdba99",
  hostLand: "#f9f3e4",
  hostLine: "#a4906a",
  graticule: "#c7ab77",
  ink: "#17233b",
  gold: "#b99152",
  paper: "#f7efe0",
} as const;

/* -------------------------------------------------------------------- places */

export type LandMapPlaceTier = "region" | "disputed" | "greater" | "capital" | "community";

export type LandMapPlace = {
  id: string;
  lon: number;
  lat: number;
  tier: LandMapPlaceTier;
  /** Capital of the Kurdistan Region — drawn with a ring, like a capital should be. */
  seat?: boolean;
};

export const LAND_MAP_PLACES: LandMapPlace[] = [
  { id: "erbil", lon: 44.009, lat: 36.191, tier: "region", seat: true },
  { id: "duhok", lon: 42.999, lat: 36.867, tier: "region" },
  { id: "sulaymaniyah", lon: 45.436, lat: 35.561, tier: "region" },
  { id: "halabja", lon: 45.986, lat: 35.178, tier: "region" },

  { id: "kirkuk", lon: 44.392, lat: 35.468, tier: "disputed" },
  { id: "sinjar", lon: 41.86, lat: 36.32, tier: "disputed" },
  { id: "khanaqin", lon: 45.386, lat: 34.351, tier: "disputed" },

  { id: "diyarbakir", lon: 40.23, lat: 37.914, tier: "greater" },
  { id: "van", lon: 43.38, lat: 38.494, tier: "greater" },
  { id: "mardin", lon: 40.735, lat: 37.312, tier: "greater" },
  { id: "sanliurfa", lon: 38.796, lat: 37.159, tier: "greater" },
  { id: "hakkari", lon: 43.74, lat: 37.575, tier: "greater" },
  { id: "qamishli", lon: 41.229, lat: 37.053, tier: "greater" },
  { id: "kobani", lon: 38.354, lat: 36.891, tier: "greater" },
  { id: "afrin", lon: 36.87, lat: 36.512, tier: "greater" },
  { id: "urmia", lon: 45.076, lat: 37.555, tier: "greater" },
  { id: "mahabad", lon: 45.722, lat: 36.764, tier: "greater" },
  { id: "sanandaj", lon: 46.996, lat: 35.315, tier: "greater" },
  { id: "kermanshah", lon: 47.065, lat: 34.314, tier: "greater" },

  { id: "ankara", lon: 32.859, lat: 39.933, tier: "capital" },
  { id: "damascus", lon: 36.292, lat: 33.51, tier: "capital" },
  { id: "baghdad", lon: 44.361, lat: 33.312, tier: "capital" },
  { id: "tehran", lon: 51.389, lat: 35.689, tier: "capital" },

  { id: "istanbul", lon: 28.979, lat: 41.008, tier: "community" },
  { id: "centralAnatolia", lon: 32.49, lat: 38.66, tier: "community" },
  { id: "khorasan", lon: 58.51, lat: 37.1, tier: "community" },
  { id: "yerevan", lon: 44.51, lat: 40.18, tier: "community" },
  { id: "beirut", lon: 35.5, lat: 33.89, tier: "community" },
  { id: "lachin", lon: 46.55, lat: 39.63, tier: "community" },
];

/** Country labels, hand-placed: a polygon centroid puts "Iran" in a desert. */
export const LAND_MAP_COUNTRY_LABELS: { id: string; lon: number; lat: number; host?: boolean }[] = [
  { id: "turkey", lon: 32.2, lat: 39.0, host: true },
  { id: "syria", lon: 38.2, lat: 34.4, host: true },
  { id: "iraq", lon: 42.6, lat: 31.9, host: true },
  { id: "iran", lon: 54.4, lat: 32.6, host: true },
  { id: "georgia", lon: 43.4, lat: 42.4 },
  { id: "armenia", lon: 44.9, lat: 40.5 },
  { id: "azerbaijan", lon: 47.6, lat: 40.4 },
  { id: "turkmenistan", lon: 59.4, lat: 40.4 },
  { id: "jordan", lon: 36.8, lat: 30.9 },
  { id: "saudiArabia", lon: 43.5, lat: 27.6 },
  { id: "kuwait", lon: 47.9, lat: 29.1 },
];

/**
 * The same four states, named again close in. A label placed for the wide view
 * sits in central Anatolia and central Iran — both a long way outside a card
 * cropped to the Region, which is how the first two cards ended up with no
 * country named on them at all.
 */
export const LAND_MAP_CLOSE_COUNTRY_LABELS: { id: string; lon: number; lat: number }[] = [
  { id: "turkey", lon: 42.4, lat: 37.78 },
  { id: "syria", lon: 40.75, lat: 36.35 },
  { id: "iran", lon: 46.55, lat: 36.15 },
  { id: "iraq", lon: 43.4, lat: 34.25 },
];

/** Water labels — the italic names that make a map look drawn rather than plotted. */
export const LAND_MAP_WATER_LABELS: { id: string; lon: number; lat: number }[] = [
  { id: "blackSea", lon: 33.4, lat: 42.6 },
  { id: "mediterranean", lon: 30.2, lat: 33.6 },
  { id: "caspian", lon: 51.2, lat: 40.6 },
  { id: "gulf", lon: 51.4, lat: 27.4 },
  { id: "vanLake", lon: 42.95, lat: 38.68 },
  { id: "urmiaLake", lon: 45.5, lat: 37.72 },
];

/* ---------------------------------------------------------------------- copy */

type LayerCopy = { name: string; blurb: string };

type LandMapCopy = {
  title: string;
  kicker: string;
  intro: string;
  legend: string;
  hint: string;
  source: string;
  layers: Record<LandMapLayerId, LayerCopy>;
  countries: Record<string, string>;
  places: Record<string, string>;
  waters: Record<string, string>;
};

export const landMapCopy: Record<DiscoverLangCode, LandMapCopy> = {
  en: {
    title: "Kurdistan\non the Map",
    kicker: "One homeland, four states, one people.",
    intro:
      "Kurdistan is a geography before it is a border. This map draws it in layers: the Kurdish homeland across Turkey, Syria, Iraq and Iran; the Kurdistan Region of Iraq, the one part of it governed by Kurds; the Kurdistani areas of Iraq still awaiting settlement; and the wider presence of Kurds across the countries they live in.",
    legend: "Select a layer",
    hint: "Tap a layer to bring it forward",
    source:
      "Boundaries: Natural Earth (public domain) and geoBoundaries (CC BY 4.0). Shown for orientation.",
    layers: {
      greater: {
        name: "Greater Kurdistan",
        blurb:
          "The continuous Kurdish homeland — roughly 190,000 square miles across four states, from the Taurus mountains to the Zagros.",
      },
      region: {
        name: "Kurdistan Region",
        blurb:
          "Duhok, Erbil and Sulaymaniyah: the federal Kurdistan Region of Iraq, recognised in the 2005 constitution, with Erbil as its capital.",
      },
      disputed: {
        name: "Kurdistani Areas",
        blurb:
          "Kirkuk, Sinjar, Makhmour, Khanaqin and their neighbours — Kurdistani districts of Iraq whose status Article 140 has yet to settle.",
      },
      presence: {
        name: "Kurdish Presence",
        blurb:
          "Kurds live across all four states and beyond them — in Istanbul and central Anatolia, in Khorasan, in the Caucasus, in Baghdad and in a diaspora reaching Europe.",
      },
    },
    countries: {
      turkey: "Turkey",
      syria: "Syria",
      iraq: "Iraq",
      iran: "Iran",
      georgia: "Georgia",
      armenia: "Armenia",
      azerbaijan: "Azerbaijan",
      turkmenistan: "Turkmenistan",
      jordan: "Jordan",
      saudiArabia: "Saudi Arabia",
      kuwait: "Kuwait",
    },
    places: {
      erbil: "Erbil",
      duhok: "Duhok",
      sulaymaniyah: "Sulaymaniyah",
      halabja: "Halabja",
      kirkuk: "Kirkuk",
      sinjar: "Sinjar",
      khanaqin: "Khanaqin",
      diyarbakir: "Diyarbakır",
      van: "Van",
      mardin: "Mardin",
      sanliurfa: "Şanlıurfa",
      hakkari: "Hakkâri",
      qamishli: "Qamishli",
      kobani: "Kobanî",
      afrin: "Afrin",
      urmia: "Urmia",
      mahabad: "Mahabad",
      sanandaj: "Sanandaj",
      kermanshah: "Kermanshah",
      ankara: "Ankara",
      damascus: "Damascus",
      baghdad: "Baghdad",
      tehran: "Tehran",
      istanbul: "Istanbul",
      centralAnatolia: "Central Anatolia",
      khorasan: "Khorasan",
      yerevan: "Yerevan",
      tbilisi: "Tbilisi",
      beirut: "Beirut",
      lachin: "Lachin",
    },
    waters: {
      blackSea: "Black Sea",
      mediterranean: "Mediterranean Sea",
      caspian: "Caspian Sea",
      gulf: "Persian Gulf",
      vanLake: "Lake Van",
      urmiaLake: "Lake Urmia",
    },
  },

  ku: {
    title: "کوردستان\nلەسەر نەخشە",
    kicker: "یەک نیشتمان، چوار دەوڵەت، یەک گەل.",
    intro:
      "کوردستان پێش ئەوەی سنوور بێت، جوگرافیایە. ئەم نەخشەیە بە چوار چین دەیکێشێت: نیشتمانی کوردی لە تورکیا، سووریا، عێراق و ئێران؛ هەرێمی کوردستانی عێراق، ئەو بەشەی کە کورد خۆی بەڕێوەی دەبات؛ ناوچە کوردستانییەکانی عێراق کە هێشتا چارەسەر نەکراون؛ و بوونی فراوانی کورد لەو وڵاتانەی تێیدا دەژین.",
    legend: "چینێک هەڵبژێرە",
    hint: "دەست لە چینێک بدە بۆ ئەوەی بێتە پێشەوە",
    source:
      "سنوورەکان: Natural Earth و geoBoundaries (CC BY 4.0). تەنها بۆ ئاراستەکردن.",
    layers: {
      greater: {
        name: "کوردستانی گەورە",
        blurb:
          "نیشتمانی یەکگرتووی کورد — نزیکەی ٤٩٠٬٠٠٠ کیلۆمەتر دووجا بەسەر چوار دەوڵەتدا، لە چیای تۆرۆسەوە تا زاگرۆس.",
      },
      region: {
        name: "هەرێمی کوردستان",
        blurb:
          "دهۆک، هەولێر و سلێمانی: هەرێمی فیدراڵی کوردستانی عێراق، لە دەستووری ٢٠٠٥ دا ناسراوە، بە هەولێر وەک پایتەخت.",
      },
      disputed: {
        name: "ناوچە کوردستانییەکان",
        blurb:
          "کەرکووک، شنگال، مەخموور، خانەقین و دراوسێکانیان — قەزا کوردستانییەکانی عێراق کە ماددەی ١٤٠ هێشتا چارەسەری نەکردوون.",
      },
      presence: {
        name: "بوونی کورد",
        blurb:
          "کورد لە هەر چوار دەوڵەتەکە و دەرەوەیان دەژین — لە ئەستەنبوڵ و ناوەڕاستی ئەناتۆلیا، لە خۆراسان، لە قەفقاس، لە بەغدا و لە دیاسپۆرایەک کە دەگاتە ئەوروپا.",
      },
    },
    countries: {
      turkey: "تورکیا",
      syria: "سووریا",
      iraq: "عێراق",
      iran: "ئێران",
      georgia: "گورجستان",
      armenia: "ئەرمەنستان",
      azerbaijan: "ئازەربایجان",
      turkmenistan: "تورکمانستان",
      jordan: "ئوردن",
      saudiArabia: "عەرەبستانی سعودی",
      kuwait: "کوەیت",
    },
    places: {
      erbil: "هەولێر",
      duhok: "دهۆک",
      sulaymaniyah: "سلێمانی",
      halabja: "هەڵەبجە",
      kirkuk: "کەرکووک",
      sinjar: "شنگال",
      khanaqin: "خانەقین",
      diyarbakir: "ئامەد",
      van: "وان",
      mardin: "ماردین",
      sanliurfa: "ڕوها",
      hakkari: "حەکاری",
      qamishli: "قامیشلۆ",
      kobani: "کۆبانێ",
      afrin: "عەفرین",
      urmia: "ورمێ",
      mahabad: "مەهاباد",
      sanandaj: "سنە",
      kermanshah: "کرماشان",
      ankara: "ئەنقەرە",
      damascus: "دیمەشق",
      baghdad: "بەغدا",
      tehran: "تاران",
      istanbul: "ئەستەنبوڵ",
      centralAnatolia: "ناوەڕاستی ئەناتۆلیا",
      khorasan: "خۆراسان",
      yerevan: "ئێرڤان",
      tbilisi: "تبلیسی",
      beirut: "بەیروت",
      lachin: "لاچین",
    },
    waters: {
      blackSea: "دەریای ڕەش",
      mediterranean: "دەریای ناوەڕاست",
      caspian: "دەریای خەزەر",
      gulf: "کەنداوی فارس",
      vanLake: "دەریاچەی وان",
      urmiaLake: "دەریاچەی ورمێ",
    },
  },

  ar: {
    title: "كوردستان\nعلى الخريطة",
    kicker: "وطن واحد، أربع دول، شعب واحد.",
    intro:
      "كوردستان جغرافيا قبل أن تكون حدودًا. ترسمها هذه الخريطة على طبقات: الوطن الكوردي الممتد في تركيا وسوريا والعراق وإيران؛ وإقليم كوردستان العراق، الجزء الذي يحكمه الكورد؛ والمناطق الكوردستانية في العراق التي لم يُحسم وضعها بعد؛ والوجود الكوردي الأوسع في البلدان التي يعيشون فيها.",
    legend: "اختر طبقة",
    hint: "المس أي طبقة لإبرازها",
    source:
      "الحدود: Natural Earth وgeoBoundaries (CC BY 4.0). للاسترشاد فقط.",
    layers: {
      greater: {
        name: "كوردستان الكبرى",
        blurb:
          "الوطن الكوردي المتصل — نحو ٤٩٠٬٠٠٠ كيلومتر مربع عبر أربع دول، من جبال طوروس إلى زاغروس.",
      },
      region: {
        name: "إقليم كوردستان",
        blurb:
          "دهوك وأربيل والسليمانية: إقليم كوردستان العراق الاتحادي، المعترف به في دستور ٢٠٠٥، وعاصمته أربيل.",
      },
      disputed: {
        name: "المناطق الكوردستانية",
        blurb:
          "كركوك وسنجار ومخمور وخانقين وجوارها — أقضية كوردستانية في العراق لم تحسم المادة ١٤٠ وضعها بعد.",
      },
      presence: {
        name: "الوجود الكوردي",
        blurb:
          "يعيش الكورد في الدول الأربع جميعها وخارجها — في إسطنبول ووسط الأناضول، وفي خراسان، وفي القوقاز، وفي بغداد، وفي شتات يمتد إلى أوروبا.",
      },
    },
    countries: {
      turkey: "تركيا",
      syria: "سوريا",
      iraq: "العراق",
      iran: "إيران",
      georgia: "جورجيا",
      armenia: "أرمينيا",
      azerbaijan: "أذربيجان",
      turkmenistan: "تركمانستان",
      jordan: "الأردن",
      saudiArabia: "السعودية",
      kuwait: "الكويت",
    },
    places: {
      erbil: "أربيل",
      duhok: "دهوك",
      sulaymaniyah: "السليمانية",
      halabja: "حلبجة",
      kirkuk: "كركوك",
      sinjar: "سنجار",
      khanaqin: "خانقين",
      diyarbakir: "ديار بكر",
      van: "وان",
      mardin: "ماردين",
      sanliurfa: "أورفا",
      hakkari: "هكاري",
      qamishli: "القامشلي",
      kobani: "كوباني",
      afrin: "عفرين",
      urmia: "أورمية",
      mahabad: "مهاباد",
      sanandaj: "سنندج",
      kermanshah: "كرمانشاه",
      ankara: "أنقرة",
      damascus: "دمشق",
      baghdad: "بغداد",
      tehran: "طهران",
      istanbul: "إسطنبول",
      centralAnatolia: "وسط الأناضول",
      khorasan: "خراسان",
      yerevan: "يريفان",
      tbilisi: "تبليسي",
      beirut: "بيروت",
      lachin: "لاتشين",
    },
    waters: {
      blackSea: "البحر الأسود",
      mediterranean: "البحر المتوسط",
      caspian: "بحر قزوين",
      gulf: "الخليج",
      vanLake: "بحيرة وان",
      urmiaLake: "بحيرة أورمية",
    },
  },
};
