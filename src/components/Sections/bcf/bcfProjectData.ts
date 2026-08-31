/**
 * BCF project register — city → sector → year → project.
 *
 * Transcribed from "BCF All Cities / Sectors / Projects, Historical Recap +
 * Latest Update" (verified August 2026), which is itself built on the official
 * annual reports 2020-2024, the cumulative 2005-2024 report, and BCF's own
 * website updates through July 2026.
 *
 * Two editorial rules from that source are carried into this file rather than
 * left to the screens:
 *
 *   1. Nothing is inferred. A project appears under the year the source states
 *      and nowhere else. Where the source names a project without a date it
 *      keeps the marker the source used — "Historic", "Multi-year", "Ongoing" —
 *      instead of being given a plausible year.
 *   2. Figures are never combined. An annual, city, sector or project total is
 *      reproduced with the scope its source gave it; `note` carries the caveat
 *      where a number means less than it looks (the Nujin counts, the shared
 *      Erbil/Soran housing split).
 *
 * The screens read this file; they never hold copy of their own. Entry bodies
 * keep English `text` as the source line, with `textKu` / `textAr` (and
 * `noteKu` / `noteAr`) when a translation has been supplied. The chrome around
 * them (city names, sector names, era labels) is translated in bcfContent.
 */

import type { LocationId } from "@/components/Sections/bcf/bcfContent";

export type SectorId =
  | "emergency"
  | "food"
  | "health"
  | "education"
  | "shelter"
  | "wash"
  | "camp"
  | "nfi"
  | "disability"
  | "protection"
  | "livelihood"
  | "cash"
  | "environment"
  | "community";

/**
 * Reading order for a city page. Emergency first because that is where BCF's
 * history starts and where the current Western Kurdistan operation sits; the
 * long-running service sectors follow; the cross-cutting ones close.
 */
export const BCF_SECTOR_ORDER: SectorId[] = [
  "emergency",
  "food",
  "health",
  "education",
  "shelter",
  "wash",
  "camp",
  "nfi",
  "disability",
  "protection",
  "livelihood",
  "cash",
  "environment",
  "community",
];

/**
 * The four bands the source asks a screen to keep visually distinct, so a
 * visitor is never left guessing whether a line is history or this month.
 */
export type BcfEraId = "historic" | "annual" | "latest" | "current";

export type BcfProjectEntry = {
  /** Exactly as the source states it: "2021", "2011-12", "Historic", "Ongoing". */
  year: string;
  /** One sentence, paraphrased from the official BCF source. */
  text: string;
  /** Kurdish body when supplied; English `text` remains the shared fallback. */
  textKu?: string;
  /** Arabic body when supplied; English `text` remains the shared fallback. */
  textAr?: string;
  /** A scope caveat, shown beneath the entry. Only where the source carries one. */
  note?: string;
  /** Kurdish scope caveat when supplied. */
  noteKu?: string;
  /** Arabic scope caveat when supplied. */
  noteAr?: string;
};

export type BcfLangProject = "en" | "ku" | "ar";

/** Pick the localised body for a project entry; fall back to English. */
export function bcfLocalizedProjectEntry(
  entry: BcfProjectEntry,
  lang: BcfLangProject,
): { text: string; note?: string; dir: "ltr" | "rtl" } {
  if (lang === "ar" && entry.textAr) {
    return {
      text: entry.textAr,
      note: entry.noteAr ?? entry.note,
      dir: "rtl",
    };
  }
  if (lang === "ku" && entry.textKu) {
    return {
      text: entry.textKu,
      note: entry.noteKu ?? entry.note,
      dir: "rtl",
    };
  }
  return { text: entry.text, note: entry.note, dir: "ltr" };
}

export type BcfSectorRecord = {
  id: SectorId;
  entries: BcfProjectEntry[];
};

/**
 * Which era a year label belongs to.
 *
 * Ranges resolve to their end — "2021-26" is current work, "2005-24" closes in
 * the annual-report band — and a range written "2011-12" carries a two-digit
 * tail that has to be completed against its own century before it is compared.
 * Undated markers are historic, which is the only claim they support.
 */
export function bcfEraForYear(year: string): BcfEraId {
  const parts = year.match(/\d{2,4}/g);
  if (!parts) return "historic";

  const last = parts[parts.length - 1];
  const first = Number(parts[0]);
  const end = last.length === 4 ? Number(last) : Math.floor(first / 100) * 100 + Number(last);

  if (end >= 2026) return "current";
  if (end === 2025) return "latest";
  if (end >= 2020) return "annual";
  return "historic";
}

/** Sort key for a year label; undated markers lead, then chronological. */
export function bcfYearSortKey(year: string): number {
  const parts = year.match(/\d{2,4}/g);
  if (!parts) return 0;
  return Number(parts[0]);
}

/**
 * Organisation-wide 2025 individual-beneficiary totals, published by BCF on
 * 5 January 2026. These are *not* city figures — the source publishes no
 * city-by-city split for 2025 — so a sector page shows them explicitly labelled
 * as the whole organisation's year and never adds them to anything on the page.
 */
export const BCF_SECTOR_2025_TOTALS: Partial<Record<SectorId, string>> = {
  camp: "874,747",
  food: "475,867",
  health: "314,573",
  nfi: "175,708",
  livelihood: "111,552",
  wash: "73,152",
  cash: "45,917",
  education: "41,588",
  protection: "27,834",
  shelter: "228",
};

/**
 * Every documented project, by location.
 *
 * Where the recap printed a combined heading — "Disability / Protection",
 * "Cash / Orphans / Nujin" — the entries beneath it are split onto the sectors
 * they actually belong to, so that a sector means the same thing on every city
 * page. Nothing is added or dropped in the process.
 */
export const BCF_PROJECT_DATA: Record<LocationId, BcfSectorRecord[]> = {
  erbil: [
    {
      id: "food",
      entries: [
        {
          year: "2021",
          text: "Food distributions across Erbil: Korek parcels for 350 households, Galiawa food for 6,817 households in Hasan Sham U2/U3 and Khazir, and Qurbani meat for 14,021 households in the city and its camps.",
          textKu:
            "لە ناوچەکانی دەوروبەری ئیدارەی سۆرانیش، لە ڕەواندز ١٦ کەس و لە سیدەکان ٣٢ کەس یارمەتی جووڵە و گواستنەوەیان وەرگرت.",
          textAr:
            "توزيعات غذائية في أربيل: استفادت 350 أسرة من طرود كورك، و6,817 أسرة من مساعدات كلاويز الغذائية في مخيمي حسن شام U2 وU3 والخازر، و14,021 أسرة من لحوم الأضاحي في المدينة ومخيماتها.",
        },
        {
          year: "2022",
          text: "The hot-meal programme served 694,362 meals in Erbil, alongside food distributions continuing through partner projects.",
          textKu:
            "١٠ کەس کە خاوەن پێداویستی تایبەت بوون، یارمەتی و پشتگیریان وەرگرت.",
          textAr:
            "قدّم برنامج الوجبات الساخنة 694,362 وجبة في أربيل، إلى جانب استمرار توزيع المواد الغذائية عبر المشاريع الشريكة.",
        },
        {
          year: "2023",
          text: "Qurbani meat reached 1,481 families, with regular food and non-food assistance continuing across Erbil and the camps.",
          textKu:
            "وەڵامدانەوەی بوومەلەرزە و بەرنامەی بەردەوامی عەفرین کاری دەزگای خێرخوازی بارزانی لە سوریا فراوان کرد.",
          textAr:
            "استفادت 1,481 أسرة من لحوم الأضاحي، مع استمرار تقديم المساعدات الغذائية وغير الغذائية في أربيل والمخيمات.",
        },
        {
          year: "2024",
          text: "The Ramadan overview recorded 14,943 food parcels in Erbil; other Ramadan and food projects ran separately.",
          textKu:
            "دەزگای خێرخوازی بارزانی چادری دابین کرد بۆ پێشوازی لە کوردە لوبنانییەکان لە کەمپی مام ڕەشان — وەڵامی هەرێمی کوردستان بۆ ئاوارەبوون لە لوبنان.",
          textAr:
            "تم توزيع 14,943 طردًا غذائيًا في أربيل خلال شهر رمضان، إلى جانب تنفيذ مشاريع رمضانية وغذائية أخرى بشكل منفصل.",
          note: "Annual report and website Ramadan overviews cover different project scopes.",
          noteKu:
            "========================================================================",
        },
        {
          year: "2026",
          text: "Ramadan iftar at Erbil Park for 1,000 people daily, 500 Turaq food baskets, food for families of martyrs, Eid food baskets and camp food and flour assistance.",
          textKu:
            "لە کەمپەکانی عەفرین، دابەشکردنی خۆراک و کەلوپەلی پێویستی ڕۆژانە بەردەوام بوو. هەروەها یاری تۆپی پێ بۆ گەنجان، چالاکییە کەلتوورییەکان و چالاکییە کۆمەڵایەتییە جیاوازەکان بەڕێوەچوون.",
          textAr:
            "أُقيم إفطار رمضاني في بارك أربيل لـ 1,000 شخص يوميًا، وتم توزيع 500 سلة غذائية في تورق، إلى جانب تقديم مساعدات غذائية لعائلات الشهداء، وسلال غذائية للعيد، ومساعدات غذائية وطحين للمخيمات.",
        },
        {
          year: "2007",
          text: "Food parcels reached 700 families across four Erbil neighbourhoods, and 500 martyrs' families in Sarwaran received additional Eid support.",
          textKu:
            "یەکێک لە یەکەم هەڵمەتە گەورەکانی فریاکەوتنی دەزگای خێرخوازی بارزانی، وەڵامدانەوە بە کارەساتی تەقینەوەکانی گڕ عوزێر و سیبا شێخ خدر لە ناوچەی شنگال بوو؛ ئەمە یەکێک بوو لە یەکەم وەڵامدانەوە فریاکەوتنە گەورەکانی دامەزراوەکە.",
          textAr:
            "وصلت الطرود الغذائية إلى 700 أسرة في أربعة أحياء بأربيل، كما تلقت 500 من أسر الشهداء في سروران دعماً إضافياً بمناسبة العيد.",
        },
        {
          year: "2015",
          text: "Monthly food aid reached 12,741 refugees in Dibaga, Khabat and Koya, and 1,298 tonnes were distributed over the year.",
          textKu:
            "لە ماوەی ئاوارەبوونی خەڵکی شنگالدا، چەند قوتابخانەیەک لە چیای شنگال دروست کران.",
          textAr:
            "وصلت المساعدات الغذائية الشهرية إلى 12,741 لاجئاً في ديبكة والخبات وكويسنجق، وجرى توزيع 1,298 طناً خلال العام.",
        },
      ],
    },
    {
      id: "education",
      entries: [
        {
          year: "2020",
          text: "The 450 school-chairs project covered Halgurd Basic School in Erbil together with schools under the Sulaymaniyah and Penjwen directorates.",
          textKu:
            "یارمەتی و پێداویستی پزیشکی کۆڤید-١٩ بۆ بەڕێوەبەرایەتی تەندروستی هەڵەبجە دابین کرا.",
          textAr:
            "شمل مشروع 450 مقعدًا مدرسيًا مدرسة هەڵگورد الأساسية في أربيل، إلى جانب مدارس في السليمانية وبنجوين.",
        },
        {
          year: "2022",
          text: "Fifty of the 203 schools in the renovation programme were in Erbil.",
          textKu: "لە بەرنامەی نۆژەنکردنەوەی ٢٠٣ قوتابخانەدا، ٥٠ قوتابخانە لە هەولێر نۆژەن کرانەوە.",
          textAr: "شمل برنامج ترميم 203 مدارس، منها 50 مدرسة في أربيل.",
        },
        {
          year: "2024",
          text: "Fifteen schools renovated in Erbil, and a solar-electricity pilot installed at ten Erbil schools.",
          textKu:
            "لە هەولێر ١٥ قوتابخانە نۆژەن کرانەوە، هەروەها سیستەمی کارەبای خۆر بە شێوەی تاقیکاری لە ١٠ قوتابخانە دامەزرێنرا.",
          textAr:
            "تم ترميم 15 مدرسة في أربيل، وتجهيز 10 مدارس بأنظمة تجريبية للطاقة الشمسية.",
        },
        {
          year: "2025",
          text: "The Orphans' Educational Project was officially announced in Erbil and operates across BCF offices and Kurdistan.",
          textKu:
            "دەزگای خێرخوازی بارزانی ڕایگەیاند ١٠,٦٧٣ کەس لە سوریا سوودمەند بوون بۆ تەواوی ساڵەکە.",
          textAr:
            "أُطلق في أربيل المشروع التعليمي للأيتام، ويُنفَّذ عبر مكاتب مؤسسة بارزاني الخيرية في كوردستان.",
        },
        {
          year: "2026",
          text: "First participation in the Kurdish Book Fair, education and awareness initiatives, and a new Capacity Development Center for Orphans and Widows announced in Erbil.",
          textKu:
            "دەزگای خێرخوازی بارزانی بۆ یەکەم جار بەشداری پێشانگای کتێبی کوردی کرد. هەروەها چالاکییەکانی پەروەردە و هۆشیارکردنەوە بەڕێوەچوون، و دامەزراندنی ناوەندێکی نوێ بۆ گەشەپێدانی توانای ئازیزان و بێ هاوژینان لە هەولێر ڕاگەیەنرا.",
          textAr:
            "شاركت المؤسسة للمرة الأولى في معرض الكتاب الكوردي، ونفذت مبادرات تعليمية وتوعوية، كما أُعلن عن إنشاء مركز لتنمية قدرات الأيتام والأرامل في أربيل.",
        },
        {
          year: "2008",
          text: "A regional school-supplies campaign reached 7,700 pupils, including 17 schools in Erbil, Shaqlawa and the governorate's displacement camps.",
          textKu:
            "کەمپەینێکی هەرێمی بۆ پێداویستی خوێندن گەیشتە ٧,٧٠٠ قوتابی، لەوانە ١٧ قوتابخانە لە هەولێر، شەقڵاوە و کەمپەکانی ئاوارەکانی پارێزگاکە.",
          textAr:
            "وصلت حملة إقليمية للقرطاسية المدرسية إلى 7,700 تلميذ، شملت 17 مدرسة في أربيل وشقلاوة ومخيمات النزوح في المحافظة.",
        },
        {
          year: "2021",
          text: "A USD 3.5 million college-building project was announced at Salahaddin University.",
          textKu:
            "پڕۆژەی بنیاتنانی کۆلێژێک بە نرخی ٣.٥ ملیۆن دۆلار لە زانکۆی سەڵاحەدین ڕاگەیەنرا.",
          textAr:
            "أُعلن عن مشروع لبناء كلية بكلفة 3.5 مليون دولار أمريكي في جامعة صلاح الدين.",
        },
        {
          year: "2023",
          text: "Education activities recorded 39,745 beneficiaries in Erbil.",
          textKu:
            "چالاکییەکانی پەروەردە لە هەولێر ٣٩,٧٤٥ سوودمەندیان تۆمار کرد.",
          textAr:
            "سجلت الأنشطة التعليمية 39,745 مستفيداً في أربيل.",
          note: "Livelihood activities recorded 40,054 beneficiaries in the same year; education and livelihood stay separate records.",
          noteKu:
            "ئەم زانیارییە لە بابەتێکی مێژوویی دەزگای خێرخوازی بارزانی لە ماڵپەڕەکەی هاتووە.",
          noteAr:
            "سجلت أنشطة سبل العيش 40,054 مستفيداً في العام نفسه، والتعليم وسبل العيش سجلان منفصلان.",
        },
      ],
    },
    {
      id: "health",
      entries: [
        {
          year: "2020",
          text: "COVID-19 medical assistance delivered to Central Erbil Hospital as part of regional hospital support.",
          textKu:
            "یارمەتی پزیشکی کۆڤید-١٩ بۆ نەخۆشخانەی ناوەندی هەولێر گەیەنرا، وەک بەشێک لە بەرنامەی پشتگیری نەخۆشخانەکانی هەرێم.",
          textAr:
            "تم تقديم مساعدات طبية لمواجهة كوفيد-19 إلى مستشفى أربيل المركزي ضمن دعم مستشفيات الإقليم.",
        },
        {
          year: "2024",
          text: "The Center of Excellence for Complex Care was active, and Erbil hospitals also received patients through the mobility-service project.",
          textKu:
            "ناوەندی تایبەت بە چاودێری نەخۆشییە ئاڵۆزەکان بەردەوام لە کارکردن بوو؛ هەروەها لە ڕێگەی پڕۆژەی گواستنەوەی نەخۆشانەوە، نەخۆش بۆ نەخۆشخانەکانی هەولێر گواسترایەوە.",
          textAr:
            "واصل مركز كوردستان للتميز في رعاية الحالات المعقدة نشاطه، كما استقبلت مستشفيات أربيل مرضى ضمن مشروع نقل المرضى.",
        },
        {
          year: "2026",
          text: "The memorandum for the Kurdistan Center of Excellence for Complex Care was renewed, and a mammography support project announced for the Erbil breast-disease centre.",
          textKu:
            "ڕێککەوتننامەی ناوەندی کوردستان بۆ چاودێری نەخۆشییە ئاڵۆزەکان نوێ کرایەوە؛ هەروەها پڕۆژەیەک بۆ پشتگیری پشکنینی مامۆگرافی لە ناوەندی نەخۆشییەکانی مەمک لە هەولێر ڕاگەیەنرا.",
          textAr:
            "تم تجديد مذكرة مركز كوردستان للتميز في رعاية الحالات المعقدة، والإعلان عن مشروع لدعم فحوصات الماموغرام في مركز أمراض الثدي بأربيل.",
        },
        {
          year: "2006",
          text: "BCF supplied health facilities to hospitals in Erbil, benefiting 2,144 people in its first documented year.",
          textKu:
            "دەزگای خێرخوازی بارزانی پێداویستی تەندروستی بۆ نەخۆشخانەکانی هەولێر دابین کرد، کە لە یەکەم ساڵی تۆمارکراودا ٢,١٤٤ کەس سوودمەند بوون.",
          textAr:
            "زوّدت مؤسسة بارزاني الخيرية مستشفيات أربيل بالمستلزمات الصحية، فاستفاد 2,144 شخصاً في أول عام موثّق لها.",
        },
        {
          year: "2015",
          text: "The Harsham IDP Camp Health Center opened on 28 February to provide care inside the camp.",
          textKu:
            "لە ٢٨ی شوباتدا ناوەندی تەندروستی کەمپی ئاوارەکانی هەرشەم کرایەوە بۆ دابینکردنی چاودێری لە ناو کەمپەکەدا.",
          textAr:
            "افتُتح المركز الصحي في مخيم هرشم للنازحين في 28 شباط لتقديم الرعاية داخل المخيم.",
        },
        {
          year: "2024",
          text: "Health activities recorded 13,597 beneficiaries in Erbil.",
          textKu:
            "چالاکییەکانی کەرتی تەندروستی لە هەولێر ١٣,٥٩٧ سوودمەندیان تۆمار کرد.",
          textAr:
            "سجلت الأنشطة الصحية 13,597 مستفيداً في أربيل.",
        },
      ],
    },
    {
      id: "wash",
      entries: [
        {
          year: "2021",
          text: "Emergency water response delivered 65,864,000 litres through 3,261 tanker runs to 65,220 families across Erbil Governorate.",
          textKu:
            "لە پارێزگای هەولێر، بۆ دابینکردنی ئاوی فریاکەوتن، ٦٥,٨٦٤,٠٠٠ لیتر ئاو بە ٣,٢٦١ گەشتی تانکەر بۆ ٦٥,٢٢٠ خێزان گەیەنرا.",
          textAr:
            "وفّرت الاستجابة الطارئة للمياه 65,864,000 لتر عبر 3,261 رحلة بصهاريج المياه، استفادت منها 65,220 أسرة في أنحاء محافظة أربيل.",
        },
        {
          year: "2022",
          text: "Well drilling and repair, pumps and generators in Kawrgosk, Qushtapa, Kasnazan-area villages and Ruvia, with related countryside water systems.",
          textKu:
            "لە کەورگۆسک، قوشتەپە، گوندەکانی دەوروبەری کەسنەزان و ڕوڤیا، بیری ئاو حەفر و چاک کرایەوە، پەمپ و مۆلیدە دابین کرا، هەروەها سیستەمی ئاوی گوندەکان چاک و بەهێز کرا.",
          textAr:
            "شملت الأعمال حفر الآبار وصيانتها، وتوفير المضخات والمولدات في كوركوسك وقوشتبة وقرى منطقة كسنەزان وروفيا، إلى جانب مشاريع المياه في المناطق الريفية.",
        },
        {
          year: "2024",
          text: "WASH activities reached 9,508 families in Erbil Governorate, representing 48,180 people.",
          textKu:
            "چالاکییەکانی ئاو و خاوێنکاری لە پارێزگای هەولێر گەیشتنە ٩,٥٠٨ خێزان، واتە ٤٨,١٨٠ کەس.",
          textAr:
            "وصلت أنشطة المياه والإصحاح في محافظة أربيل إلى 9,508 أسر، أي ما يمثل 48,180 شخصاً.",
        },
        {
          year: "2015",
          text: "BCF delivered 120,000 litres of clean water daily to Erbil's Qalai Nwe and Qarabu neighbourhoods.",
          textKu:
            "دەزگای خێرخوازی بارزانی ڕۆژانە ١٢٠,٠٠٠ لیتر ئاوی خاوێنی بۆ گەڕەکەکانی قەڵای نوێ و قەرەبووی هەولێر دەگەیاند.",
          textAr:
            "كانت مؤسسة بارزاني الخيرية توصل يومياً 120,000 لتر من المياه النظيفة إلى حيي قلعة نوي وقره بو في أربيل.",
        },
      ],
    },
    {
      id: "shelter",
      entries: [
        {
          year: "2015",
          text: "BCF built 304 caravan homes in Bahirka Camp, and 251 displaced families were resettled there in September.",
          textKu:
            "دەزگای خێرخوازی بارزانی ژمارە ٣٠٤ ماڵی کەرەڤانی لە کەمپی بەحرکە دروست کرد، و لە ئەیلوولدا ٢٥١ خێزانی ئاوارە لەوێ نیشتەجێ کران.",
          textAr:
            "بنت مؤسسة بارزاني الخيرية 304 منازل كرفانية في مخيم بحركة، وأُسكنت فيها 251 أسرة نازحة في أيلول.",
          note: "Recorded in the cumulative 2005-2024 report.",
          noteKu: "ئەم زانیارییە لە ڕاپۆرتی کۆکراوەی ساڵانی ٢٠٠٥ تا ٢٠٢٤ هاتووە.",
        },
        {
          year: "2019",
          text: "Khazir camp shelter support, including large tent projects with LDS Charities and Catholic Teufen.",
          textKu:
            "لە کەمپی خازر، پەناگە و چادر بۆ ئاوارەکان دابین کران؛ هەروەها چەند پڕۆژەیەکی گەورەی چادر بە هاوکاری LDS Charities و Catholic Teufen جێبەجێ کران.",
          textAr:
            "تم دعم المأوى في مخيم الخازر، بما في ذلك مشاريع الخيام الكبيرة بالتعاون مع LDS Charities وCatholic Teufen.",
        },
        {
          year: "2021",
          text: "Two major flood responses in Erbil: 751 households assisted in October and 2,905 households in December.",
          textKu:
            "لە هەولێر دوو جار وەڵامدانەوەی گەورە بۆ لافاو ئەنجام درا؛ لە مانگی تشرینی یەکەم ٧٥١ خێزان و لە مانگی کانونی یەکەم ٢,٩٠٥ خێزان یارمەتییان وەرگرت.",
          textAr:
            "استفادت 751 أسرة من الاستجابة للفيضانات في أربيل خلال تشرين الأول، و2,905 أسر خلال كانون الأول.",
        },
        {
          year: "2023",
          text: "BCF responded again to flood-affected families in Erbil after heavy rains.",
          textKu: "دوای بارانبارینی زۆر، BCF جارێکی تر یارمەتی خێزانە زیانلێکەوتووەکانی لافاو لە هەولێر دا.",
          textAr:
            "قدّمت مؤسسة بارزاني الخيرية (BCF) الدعم مجددًا للعائلات المتضررة من الفيضانات في أربيل بعد الأمطار الغزيرة.",
        },
        {
          year: "2024",
          text: "The foundation stone was laid for BCF City in Qushtapa, and the shared Erbil/Soran martyrs' housing distribution took place.",
          textKu:
            "بەردی بناغەی شاری دەزگای خێرخوازی بارزانی لە قوشتەپە دانرا ؛ هەروەها خانووی شەهیدان لە پڕۆژەی هاوبەشی هەولێر و سۆران دابەش کران.",
          textAr:
            "وُضع حجر الأساس لمدينة مؤسسة بارزاني الخيرية (BCF) في قوشتبة، وتم توزيع مساكن الشهداء ضمن المشروع المشترك بين أربيل وسوران.",
          note: "540 units project-wide; the Erbil-vs-Soran split is not published in the reviewed source.",
          noteKu:
            "کۆی پڕۆژەکە ٥٤٠ یەکەی نیشتەجێبوون بوو، بەڵام لە سەرچاوەکەدا دیاری نەکراوە چەند یەکە بۆ هەولێر و چەند یەکە بۆ سۆران بوو.",
        },
        {
          year: "2025",
          text: "The first phase of BCF City moved into implementation in Qushtapa, including 180 houses for poor and low-income families.",
          textKu:
            "قۆناغی یەکەمی شاری دەزگای خێرخوازی بارزانی لە قوشتەپە چووە بواری جێبەجێکردن، کە ١٨٠ خانوو بۆ خێزانە هەژار و کەمداهاتەکان لەخۆدەگرت.",
          textAr:
            "بدأ تنفيذ المرحلة الأولى من مدينة مؤسسة بارزاني الخيرية (BCF City) في قوشتبة، وتشمل 180 منزلًا للعائلات الفقيرة ومحدودة الدخل.",
        },
        {
          year: "2011",
          text: "BCF supplied 90 complete bedroom sets to the Erbil Social Welfare Directorate.",
          textKu:
            "دەزگای خێرخوازی بارزانی ژمارە ٩٠ ست ژووری نووستنی تەواوی بۆ بەڕێوەبەرایەتی چاودێری کۆمەڵایەتی هەولێر دابین کرد.",
          textAr:
            "زوّدت مؤسسة بارزاني الخيرية مديرية الرعاية الاجتماعية في أربيل بـ 90 طقماً كاملاً لغرف النوم.",
        },
        {
          year: "2024",
          text: "Household-support records reached 24,796 people in Erbil and shelter records 2,682.",
          textKu:
            "تۆمارەکانی پاڵپشتی ماڵ لە هەولێر گەیشتنە ٢٤,٧٩٦ کەس و تۆمارەکانی سەرپەناش ٢,٦٨٢ کەس.",
          textAr:
            "بلغت سجلات دعم المستلزمات المنزلية 24,796 شخصاً في أربيل، وبلغت سجلات المأوى 2,682 شخصاً.",
          note: "Two separate records. The report never sums household support and shelter.",
          noteKu:
            "دوو تۆماری جیاوازن. ڕاپۆرتەکە هەرگیز پاڵپشتی ماڵ و سەرپەنا کۆناکاتەوە.",
          noteAr:
            "سجلان منفصلان، والتقرير لا يجمع بين دعم المستلزمات المنزلية والمأوى.",
        },
      ],
    },
    {
      id: "disability",
      entries: [
        {
          year: "2015",
          text: "The mobility-aid project launched with LDS Charities and continued in later years.",
          textKu:
            "پڕۆژەی یارمەتی جووڵە و گواستنەوە بە هاوکاری LDS Charities دەستی پێکرد و لە ساڵانی دواتریش بەردەوام بوو.",
          textAr:
            "أطلق مشروع المعينات الحركية بالتعاون مع جمعية قديسي الأيام الأخيرة الخيرية (LDS Charities) واستمر خلال السنوات اللاحقة.",
        },
        {
          year: "2021",
          text: "389 people in Erbil received wheelchairs or other mobility aids.",
          textKu: "لە هەولێر، ٣٨٩ کەس کورسی چەرخدار یان یارمەتییەکانی تری جووڵە و گواستنەوەیان وەرگرت.",
          textAr: "استفاد 389 شخصًا في أربيل من الكراسي المتحركة وغيرها من المعينات الحركية.",
        },
        {
          year: "2022",
          text: "326 beneficiaries recorded in Erbil.",
          textKu: "لە هەولێر، ٣٢٦ کەس لەم پڕۆژەیە سوودمەند بوون.",
          textAr: "بلغ عدد المستفيدين في أربيل 326 شخصًا.",
        },
        {
          year: "2026",
          text: "Wheelchairs and other disability support continued: ten wheelchairs distributed in March, with further support in April.",
          textKu:
            "پشتگیری کەسانی خاوەن پێداویستی تایبەت بەردەوام بوو؛ لە مانگی ئادار ١٠ کورسی چەرخدار دابەش کرا و لە مانگی نیسانیش یارمەتی زیاتر پێشکەش کرا.",
          textAr:
            "استمر توزيع الكراسي المتحركة وتقديم الدعم لذوي الإعاقة؛ حيث تم توزيع 10 كراسٍ متحركة في آذار، وتواصل تقديم الدعم في نيسان.",
        },
        {
          year: "2009",
          text: "Forty-two hearing aids were provided to children with hearing loss in Erbil.",
          textKu:
            "ژمارە ٤٢ ئامێری بیستن بۆ منداڵانی کێشەی بیستن لە هەولێر دابین کرا.",
          textAr:
            "قُدمت 42 سماعة طبية للأطفال ذوي ضعف السمع في أربيل.",
        },
        {
          year: "2015",
          text: "On World Autism Awareness Day, BCF presented gifts to 150 children with autism in Erbil.",
          textKu:
            "لە ڕۆژی جیهانی ئاگاداری لە ئۆتیزمدا، دەزگای خێرخوازی بارزانی دیاری بە ١٥٠ منداڵی ئۆتیزمی لە هەولێر بەخشی.",
          textAr:
            "في اليوم العالمي للتوعية بالتوحد، قدمت مؤسسة بارزاني الخيرية هدايا لـ 150 طفلاً من ذوي التوحد في أربيل.",
        },
        {
          year: "2024",
          text: "The autism centre in Erbil reports annual support for 60 to 90 children.",
          textKu:
            "ناوەندی ئۆتیزم لە هەولێر ڕایدەگەیەنێت ساڵانە پشتگیری ٦٠ بۆ ٩٠ منداڵ دەکات.",
          textAr:
            "يفيد مركز التوحد في أربيل بأنه يدعم سنوياً ما بين 60 و90 طفلاً.",
        },
      ],
    },
    {
      id: "camp",
      entries: [
        {
          year: "2021",
          text: "BCF managed nine IDP and refugee camps plus one host-community camp in Erbil Governorate; clothing, blanket and household-item projects supported Harsham, Hasan Sham, Bahirka, Debaga and others.",
          textKu:
            "دەزگای خێرخوازی بارزانی لە پارێزگای هەولێر ٩ کەمپی ئاوارە و پەنابەر و یەک کەمپی تری بۆ دانیشتوانی ناوچەکە بەڕێوە دەبرد. هەروەها لە هەرشەم، حەسەن شام، بەحرکە، دیبەگە و ناوچەکانی تر، جل‌ و بەرگ، بەتانی و کەلوپەلی پێویستی ماڵەوە دابەش دەکرد.",
          textAr:
            "أدارت مؤسسة بارزاني الخيرية 9 مخيمات للنازحين واللاجئين، إضافة إلى مخيم واحد للمجتمع المضيف في محافظة أربيل، ونفذت مشاريع لتوفير الملابس والبطانيات والمستلزمات المنزلية في هرشەم، حسن شام، بحركة، ديبگە ومخيمات أخرى.",
        },
        {
          year: "2021-26",
          text: "Recurring food, NFI, winter, health and camp-support projects operated in Bahirka, Hasan Sham, Khazir, Debaga, Qushtapa, Basirma, Darashakran and Harsham.",
          textKu:
            "پڕۆژەکانی خۆراک، کەلوپەلی ناخۆراکی، یارمەتیی زستانی، تەندروستی و پشتگیری کەمپەکان بەردەوام لە خانکێ، دومیز، شاریە و ناوچەکانی تری دهۆک جێبەجێ دەکران.",
        },
        {
          year: "2023",
          text: "Seven camps managed in Erbil, and more than 300,000 Iranian pilgrims temporarily accommodated in Sami Abdulrahman Park with food, water and health services.",
          textKu:
            "لە هەولێر ٧ کەمپ بەڕێوەدەبران. هەروەها زیاتر لە ٣٠٠,٠٠٠ زیارەتکاری ئێرانی بۆ ماوەیەکی کاتی لە پارکی سامی عەبدولڕەحمان نیشتەجێ کران و خۆراک، ئاو و خزمەتگوزاری تەندروستییان بۆ دابین کرا.",
          textAr:
            "أدارت المؤسسة 7 مخيمات في أربيل، كما استضافت مؤقتًا أكثر من 300,000 زائر إيراني في حديقة سامی عبدالرحمن، مع توفير الغذاء والمياه والخدمات الصحية.",
        },
        {
          year: "2024",
          text: "The Warm Winter programme distributed heaters to schools in Erbil; camp coordination remained one of BCF's largest sectors.",
          textKu:
            "لە بەرنامەی «گەرمی زستانە»دا، سۆپا بۆ قوتابخانەکانی هەولێر دابەش کرا. هەروەها بەڕێوەبردن و هەماهەنگی کەمپەکان یەکێک بوو لە گەورەترین بوارەکانی کاری دەزگای خێرخوازی بارزانی.",
          textAr:
            "وزّع برنامج الشتاء الدافئ أجهزة تدفئة على مدارس في أربيل، فيما ظلت إدارة وتنسيق المخيمات من أكبر قطاعات عمل المؤسسة.",
        },
        {
          year: "2026",
          text: "Food, cash, clothing and disability assistance continued in Baharka, Hasan Sham, Khazir and Debaga camps, and a World Refugee Day event was held in Erbil.",
          textKu:
            "لە کەمپەکانی بەحرکە، حەسەن شام، خازر و دیبەگە، دابەشکردنی خۆراک، یارمەتی پارەیی، جل‌ و بەرگ و پشتگیری کەسانی خاوەن پێداویستی تایبەت بەردەوام بوو. هەروەها لە هەولێر چالاکییەک بە بۆنەی ڕۆژی جیهانی پەنابەران بەڕێوەچوو.",
        },
        {
          year: "2011",
          text: "BCF assisted 100 families in the Kawa, Jazhnekan, Sebiran and Azadi camps in Koya.",
          textKu:
            "دەزگای خێرخوازی بارزانی یارمەتی ١٠٠ خێزانی دا لە کەمپەکانی کاوە، جەژنیکان، سەیبیران و ئازادی لە کۆیە.",
          textAr:
            "قدمت مؤسسة بارزاني الخيرية المساعدة لـ 100 أسرة في مخيمات كاوة وجزنيكان وسيبيران وآزادي في كويسنجق.",
        },
        {
          year: "2015",
          text: "BCF took over the administration of Harsham camp in January, following approval by UNHCR and the Erbil Refugee Council.",
          textKu:
            "لە کانوونی دووەمدا دەزگای خێرخوازی بارزانی بەڕێوەبردنی کەمپی هەرشەمی وەرگرت، دوای ڕەزامەندی UNHCR و ئەنجومەنی پەنابەرانی هەولێر.",
          textAr:
            "تسلمت مؤسسة بارزاني الخيرية إدارة مخيم هرشم في كانون الثاني، بعد موافقة المفوضية السامية لشؤون اللاجئين ومجلس لاجئي أربيل.",
        },
      ],
    },
    {
      id: "cash",
      entries: [
        {
          year: "2012",
          text: "Orphan sponsorship — the Kurdistan project — began and later expanded across BCF offices.",
          textKu:
            "پڕۆژەی پاڵپشتی ئازیزان ــ پڕۆژەی کوردستان ــ لە دهۆک و ئۆفیسەکانی تری دەزگای خێرخوازی بارزانی جێبەجێ دەکرێت.",
          textAr:
            "انطلق مشروع كوردستان لكفالة الأعزاء، ثم توسّع لاحقاً ليشمل مكاتب مؤسسة بارزاني الخيرية.",
        },
        {
          year: "2021",
          text: "Erbil joined the academic-excellence programme honouring top Grade 12 orphan students.",
          textKu:
            "لە هەولێر، قوتابییە ئازیزە سەرکەوتووەکانی پۆلی ١٢ لە بەرنامەی تایبەت بە ڕێزلێناندا بەشدار بوون.",
          textAr:
            "شاركت أربيل في برنامج التفوق الدراسي لتكريم الطلبة الأعزاء المتفوقين في الصف الثاني عشر.",
        },
        {
          year: "2025",
          text: "The Azizan-Kurdistan March stage reached 802 orphans in Erbil, and the educational project launched in the city.",
          textKu:
            "لە قۆناغی ئاداری پڕۆژەی ئازیزان-کوردستان، ٨٠٢ ئازیز لە هەولێر سوودمەند بوون؛ هەروەها پڕۆژەی پەروەردەیی ئازیزان لە هەولێر دەستی پێکرد.",
          textAr:
            "وصلت محطة أربيل من مسيرة الأعزاء كوردستان إلى 802 من الأعزاء، كما أُطلق المشروع التعليمي في المدينة.",
        },
        {
          year: "2025-26",
          text: "Nujin operates in Erbil.",
          textKu: "پڕۆژەی نوژین لە هەولێر جێبەجێ دەکرێت.",
          textAr: "يعمل مشروع نوزين في أربيل.",
          note: "15 families in 2025 and 12 in 2026 are project-wide totals across all offices, not Erbil counts.",
          noteKu:
            "١٥ خێزان لە ساڵی ٢٠٢٥ و ١٢ خێزان لە ساڵی ٢٠٢٦ کۆی گشتی سوودمەندانی هەموو ئۆفیسەکانی پڕۆژەکەن؛ ئەم ژمارانە تایبەت بە نەینەوا نین.",
        },
        {
          year: "2026",
          text: "The Capacity Development Center for Orphans and Widows was announced, and food, clothing and family assistance continued.",
          textKu:
            "پڕۆژەی نوژین لە نەینەوا و موسڵ جێبەجێ دەکرێت، و لە ڕێگەی چەند ئۆفیسێکەوە پشتگیری خێزانەکان دەکات.",
          textAr:
            "أُعلن عن مركز تنمية قدرات الأعزاء والأرامل، مع استمرار تقديم المساعدات الغذائية والملابس والدعم للأسر.",
        },
        {
          year: "2010",
          text: "Eighty-one children in Erbil's orphanages received Eid gifts of USD 100 each.",
          textKu:
            "ژمارە ٨١ منداڵ لە خانەکانی هەتیوانی هەولێر، هەریەکە دیاری جەژنی ١٠٠ دۆلاریان وەرگرت.",
          textAr:
            "تلقى 81 طفلاً في دور الأيتام بأربيل هدايا العيد بواقع 100 دولار أمريكي لكل طفل.",
        },
        {
          year: "2021",
          text: "The UAE-supported OrphanCare project recorded 3,195 children in Erbil.",
          textKu:
            "پڕۆژەی OrphanCare بە پشتگیری ئیمارات ٣,١٩٥ منداڵی لە هەولێر تۆمار کرد.",
          textAr:
            "سجل مشروع رعاية الأيتام المدعوم إماراتياً 3,195 طفلاً في أربيل.",
        },
        {
          year: "2024",
          text: "Cash assistance reached 1,027 Erbil families, representing 8,759 people.",
          textKu:
            "یارمەتی نەقدی گەیشتە ١,٠٢٧ خێزان لە هەولێر، واتە ٨,٧٥٩ کەس.",
          textAr:
            "وصلت المساعدات النقدية إلى 1,027 أسرة في أربيل، أي ما يمثل 8,759 شخصاً.",
        },
      ],
    },
  ],

  duhok: [
    {
      id: "food",
      entries: [
        {
          year: "2021",
          text: "Food projects covered Duhok; Qurbani meat reached 2,060 households in Duhok and Bardarash Camp, and Akre Camp received food parcels through Caritas.",
          textKu:
            "پڕۆژەکانی خۆراک دهۆکیان گرتەوە؛ گۆشتی قوربانی گەیشتە ٢,٠٦٠ خێزان لە دهۆک و کەمپی بەردەڕەش، هەروەها کەمپی ئاکرێ لە ڕێگەی Caritas پاکێتی خۆراکی وەرگرت.",
          textAr:
            "غطت مشاريع الأمن الغذائي محافظة دهوك؛ حيث وصلت الأضاحي إلى 2,060 أسرة في دهوك ومخيم بردرش، بينما تلقى مخيم عقرة طروداً غذائية عبر كاريتاس.",
        },
        {
          year: "2022",
          text: "60,788 hot meals reported in Duhok, with annual food-distribution projects continuing.",
          textKu:
            "لە دهۆک ٦٠,٧٨٨ ژەم خواردنی گەرم دابەش کرا، هەروەها پڕۆژە ساڵانەکانی دابەشکردنی خۆراک بەردەوام بوون.",
          textAr:
            "أُبلغ عن تقديم 60,788 وجبة ساخنة في دهوك، مع استمرار مشاريع التوزيع السنوي للأغذية.",
        },
        {
          year: "2024",
          text: "The Ramadan overview recorded 13,931 food parcels in Duhok Governorate.",
          textKu: "پوختەی بەرنامەکانی ڕەمەزان تۆماری ١٣,٩٣١ پاکێتی خۆراکی لە پارێزگای دهۆک کرد.",
          textAr: "سُجلت في شهر رمضان توزيع 13,931 طرداً غذائياً في محافظة دهوك.",
          note: "Annual report and website Ramadan overviews cover different project scopes.",
          noteKu:
            "ڕاپۆرتی ساڵانە و پوختەی ڕەمەزان لە ماڵپەڕەکە، هەر یەکەیان پڕۆژە و چالاکییە جیاوازەکان دەگرنەوە.",
        },
        {
          year: "2026",
          text: "A free-bread Ramadan project ran through 13 bakeries across Duhok-area districts, alongside Semel food baskets and large flour distributions to camp families.",
          textKu:
            "لە مانگی ڕەمەزاندا، پڕۆژەی نانی خۆڕایی لە ڕێگەی ١٣ نانەواخانە لە قەزاکانی ناوچەی دهۆک جێبەجێ کرا؛ هەروەها سەبەتەی خۆراک لە سێمێل و بڕێکی زۆر ئارد بۆ خێزانەکانی کەمپەکان دابەش کرا.",
          textAr:
            "أُقيم مشروع رمضاني لتوفير الخبز المجاني عبر 13 مخبزاً في مناطق قضاء دهوك، إلى جانب توزيع سلال غذائية في سيميل وتوزيع كميات كبيرة من الطحين على العائلات في المخيمات.",
        },
        {
          year: "2008",
          text: "BCF and its partners distributed food parcels to displaced Iraqi families across Duhok Governorate.",
          textKu:
            "دەزگای خێرخوازی بارزانی و هاوبەشەکانی پاکێتی خۆراکیان بۆ خێزانە ئاوارە عێراقییەکان لە سەرانسەری پارێزگای دهۆک دابەش کرد.",
          textAr:
            "وزّعت مؤسسة بارزاني الخيرية وشركاؤها طروداً غذائية على الأسر العراقية النازحة في عموم محافظة دهوك.",
        },
        {
          year: "2015",
          text: "Monthly food parcels reached 25,212 displaced families from Sinjar and Zummar, and 15,896 tonnes were delivered during the year.",
          textKu:
            "پاکێتی خۆراکی مانگانە گەیشتە ٢٥,٢١٢ خێزانی ئاوارە لە شنگال و زومار، هەروەها بە درێژایی ساڵ ١٥,٨٩٦ تەن گەیەنرا.",
          textAr:
            "وصلت الطرود الغذائية الشهرية إلى 25,212 أسرة نازحة من سنجار وزمار، وجرى إيصال 15,896 طناً خلال العام.",
        },
        {
          year: "2024",
          text: "Food assistance reached 43,260 families in Duhok, representing 226,300 people.",
          textKu:
            "یارمەتی خۆراک لە دهۆک گەیشتە ٤٣,٢٦٠ خێزان، واتە ٢٢٦,٣٠٠ کەس.",
          textAr:
            "وصلت المساعدات الغذائية في دهوك إلى 43,260 أسرة، أي ما يمثل 226,300 شخصاً.",
          note: "The annual sector record. The Ramadan parcel count is a separate record and the report does not combine the two.",
          noteKu:
            "ئەمە تۆماری ساڵانەی کەرتەکەیە. ژمارەی پاکێتەکانی ڕەمەزان تۆمارێکی جیاوازە و ڕاپۆرتەکە ئەم دووانە تێکەڵ ناکات.",
          noteAr:
            "هذا هو السجل السنوي للقطاع، أما عدد طرود رمضان فهو سجل منفصل، والتقرير لا يجمع بينهما.",
        },
      ],
    },
    {
      id: "health",
      entries: [
        {
          year: "2020",
          text: "COVID-19 medical supplies delivered to the Duhok Health Directorate.",
          textKu: "پێداویستییە پزیشکییەکانی کۆڤید-١٩ بۆ بەڕێوەبەرایەتی تەندروستی دهۆک گەیەنران.",
          textAr: "تسليم مستلزمات طبية خاصة بفيروس كورونا إلى مديرية صحة دهوك.",
        },
        {
          year: "2021",
          text: "A COVID vaccination centre opened in Domiz 1 Camp, and medical equipment and supplies were delivered to five Duhok hospitals and camp facilities.",
          textKu:
            "ناوەندێکی ڤاکسینی کۆڤید لە کەمپی دومیز ١ کرایەوە؛ هەروەها ئامێر و پێداویستییە پزیشکییەکان بۆ پێنج نەخۆشخانە لە دهۆک و ناوەندە پزیشکییەکانی کەمپەکان گەیەنران.",
          textAr:
            "افتُتح مركز لتلقي لقاح كوفيد-19 في مخيم دوميز 1، وتم تسليم معدات ومستلزمات طبية إلى خمسة مستشفيات ومرافق مخيمات في دهوك.",
        },
        {
          year: "2025",
          text: "The Mobile Medical Clinic project launched for camps in Duhok Province; 17 Kurdish children were also sent to Germany for examination and treatment through a partner programme.",
          textKu:
            "پڕۆژەی کلینیکی پزیشکی گەڕۆک بۆ کەمپەکانی پارێزگای دهۆک دەستی پێکرد؛ هەروەها ١٧ منداڵی کورد، لە ڕێگەی بەرنامەیەکی هاوبەشەوە، بۆ پشکنین و چارەسەر نێردران بۆ ئەڵمانیا.",
          textAr:
            "إطلاق مشروع العيادة الطبية المتنقلة للمخيمات في محافظة دهوك؛ كما أُرسل 17 طفلاً كوردياً إلى ألمانيا للفحص والعلاج من خلال برنامج شريك.",
        },
        {
          year: "2026",
          text: "BCF noted plans for an autism centre in Duhok, in addition to the existing centres elsewhere.",
          textKu:
            "دەزگای خێرخوازی بارزانی ڕایگەیاند کە پلانی دامەزراندنی ناوەندێک بۆ ئۆتیزم لە دهۆک هەیە، لە پاڵ ئەو ناوەندانەی کە لە ناوچەکانی تر هەن.",
          textAr:
            "أشارت مؤسسة بارزاني الخيرية (BCF) إلى وجود خطط لإنشاء مركز لمرض التوحد في دهوك، بالإضافة إلى المراكز القائمة في أماكن أخرى.",
        },
        {
          year: "2012",
          text: "Two medical missions examined and treated 730 refugees in the Domiz, Moqbele and Tanahi camps.",
          textKu:
            "دوو نێردراوی پزیشکی ٧٣٠ پەنابەریان لە کەمپەکانی دۆمیز، موقبلە و تەناهی پشکنین و چارەسەر کرد.",
          textAr:
            "فحصت بعثتان طبيتان وعالجتا 730 لاجئاً في مخيمات دوميز ومقبلة وتناهي.",
        },
        {
          year: "2023",
          text: "The Duhok health-sector record reached 56,004 people.",
          textKu:
            "تۆماری کەرتی تەندروستی لە دهۆک گەیشتە ٥٦,٠٠٤ کەس.",
          textAr:
            "بلغ سجل القطاع الصحي في دهوك 56,004 أشخاص.",
        },
        {
          year: "2024",
          text: "Health activities recorded 342,230 beneficiaries in Duhok, the largest city health record of the year.",
          textKu:
            "چالاکییەکانی تەندروستی لە دهۆک ٣٤٢,٢٣٠ سوودمەندیان تۆمار کرد، کە گەورەترین تۆماری تەندروستی شار بوو لەو ساڵەدا.",
          textAr:
            "سجلت الأنشطة الصحية 342,230 مستفيداً في دهوك، وهو أكبر سجل صحي لمدينة خلال ذلك العام.",
        },
      ],
    },
    {
      id: "education",
      entries: [
        {
          year: "2022",
          text: "Twenty of the 203 schools in the renovation programme were in Duhok.",
          textKu: "لە کۆی ٢٠٣ قوتابخانەی ناو بەرنامەی نۆژەنکردنەوە، ٢٠ قوتابخانە لە دهۆک بوون.",
          textAr: "شمل برنامج الترميم 20 مدرسة في دهوك من أصل 203 مدارس مستهدفة.",
        },
        {
          year: "2024",
          text: "Fourteen schools renovated in Duhok in the final annual report.",
          textKu: "لە ڕاپۆرتی ساڵانەی کۆتاییدا، ١٤ قوتابخانە لە دهۆک نۆژەن کرانەوە.",
          textAr: "تضمن التقرير السنوي النهائي ترميم 14 مدرسة في دهوك.",
        },
        {
          year: "2025",
          text: "A solar-electricity project was announced for ten schools in Duhok Province.",
          textKu: "پڕۆژەیەکی کارەبای خۆر بۆ ١٠ قوتابخانە لە پارێزگای دهۆک ڕاگەیەنرا.",
          textAr:
            "الإعلان عن مشروع لتوليد الكهرباء بالطاقة الشمسية لـ 10 مدارس في محافظة دهوك.",
        },
        {
          year: "2010",
          text: "A music laboratory opened inside Tanahi's vocational and cultural centre.",
          textKu:
            "تاقیگەیەکی مۆسیقا لە ناو ناوەندی پیشەیی و کولتووری تەناهی کرایەوە.",
          textAr:
            "افتُتح مختبر للموسيقى داخل المركز المهني والثقافي في تناهي.",
        },
        {
          year: "2022",
          text: "BCF supported 700 Sinjar students living temporarily in the University of Duhok dormitories.",
          textKu:
            "دەزگای خێرخوازی بارزانی پشتگیری ٧٠٠ قوتابی شنگالی کرد کە بە شێوەی کاتی لە نامۆخانەکانی زانکۆی دهۆک دەژیان.",
          textAr:
            "دعمت مؤسسة بارزاني الخيرية 700 طالب من سنجار يقيمون مؤقتاً في أقسام جامعة دهوك الداخلية.",
        },
        {
          year: "2023",
          text: "Education activities recorded 10,006 beneficiaries in Duhok.",
          textKu:
            "چالاکییەکانی پەروەردە لە دهۆک ١٠,٠٠٦ سوودمەندیان تۆمار کرد.",
          textAr:
            "سجلت الأنشطة التعليمية 10,006 مستفيدين في دهوك.",
        },
      ],
    },
    {
      id: "shelter",
      entries: [
        {
          year: "2016",
          text: "Six hundred caravans established in Darkar Ajam Camp.",
          textKu: "٦٠٠ کەرەڤان لە کەمپی دارکار عەجەم دامەزرێنران.",
          textAr: "إنشاء 600 كرفان في مخيم دركار عجم.",
        },
        {
          year: "2021",
          text: "188 shelters built in Sharya Camp in cooperation with LDS Charities.",
          textKu: "١٨٨ پەناگە لە کەمپی شاریە بە هاوکاری LDS Charities دروست کران.",
          textAr: "بناء 188 مأوى في مخيم شاريا بالتعاون مع جمعيات LDS.",
          note: "Recorded in the cumulative 2005-2024 report.",
          noteKu: "ئەم زانیارییە لە ڕاپۆرتی کۆکراوەی ساڵانی ٢٠٠٥ تا ٢٠٢٤ تۆمار کراوە.",
        },
        {
          year: "2022",
          text: "The Duhok martyrs' housing project completed 420 residential units in Roj City, housing 1,763 people.",
          textKu:
            "پڕۆژەی خانووبەرەی شەهیدانی دهۆک لە شاری ڕۆژ ٤٢٠ یەکەی نیشتەجێبوونی تەواو کرد، کە ١,٧٦٣ کەسی تێدا نیشتەجێ بوون.",
          textAr:
            "أنجز مشروع إسكان عوائل شهداء دهوك 420 وحدة سكنية في روج ستي، تؤوي 1,763 شخصاً.",
          note: "First phase 368, second phase 52. Use 420 as the complete project; 368 is only the first phase.",
          noteKu:
            "قۆناغی یەکەم ٣٦٨ یەکە و قۆناغی دووەم ٥٢ یەکە بوو. ژمارەی ٤٢٠ کۆی تەواوی پڕۆژەکەیە؛ ٣٦٨ تەنها ژمارەی قۆناغی یەکەمە.",
        },
        {
          year: "2024-26",
          text: "Camp shelter and winter support continued through BCF's regular camp programmes.",
          textKu:
            "پشتگیری پەناگە و پێداویستییە زستانییەکانی کەمپەکان، لە ڕێگەی بەرنامە بەردەوامەکانی دەزگای خێرخوازی بارزانی بەردەوام بوو.",
          textAr:
            "استمرار تقديم خدمات الإيواء والمساعدات الشتوية في المخيمات عبر برامج المخيمات الاعتيادية لمؤسسة بارزاني الخيرية (BCF).",
        },
        {
          year: "2006",
          text: "Household supplies reached 14 refugee families in Duhok, representing 70 people.",
          textKu:
            "پێداویستی ماڵ گەیشتە ١٤ خێزانی پەنابەر لە دهۆک، واتە ٧٠ کەس.",
          textAr:
            "وصلت المستلزمات المنزلية إلى 14 أسرة لاجئة في دهوك، أي ما يمثل 70 شخصاً.",
        },
        {
          year: "2024",
          text: "Household-support records reached 239,187 people in Duhok and shelter records 216.",
          textKu:
            "تۆمارەکانی پاڵپشتی ماڵ لە دهۆک گەیشتنە ٢٣٩,١٨٧ کەس و تۆمارەکانی سەرپەناش ٢١٦ کەس.",
          textAr:
            "بلغت سجلات دعم المستلزمات المنزلية 239,187 شخصاً في دهوك، وبلغت سجلات المأوى 216 شخصاً.",
          note: "Two separate records. The report never sums household support and shelter.",
          noteKu:
            "دوو تۆماری جیاوازن. ڕاپۆرتەکە هەرگیز پاڵپشتی ماڵ و سەرپەنا کۆناکاتەوە.",
          noteAr:
            "سجلان منفصلان، والتقرير لا يجمع بين دعم المستلزمات المنزلية والمأوى.",
        },
      ],
    },
    {
      id: "camp",
      entries: [
        {
          year: "2021",
          text: "BCF managed 20 IDP and refugee camps in Duhok Governorate.",
          textKu: "لە پارێزگای دهۆک ٢٠ کەمپی ئاوارە و پەنابەری بەڕێوە دەبرد BCF",
          textAr:
            "تولت مؤسسة بارزاني الخيرية (BCF) إدارة 20 مخيماً للنازحين واللاجئين في محافظة دهوك.",
        },
        {
          year: "2021-26",
          text: "Recurring food, NFI, winter, health and camp-support projects operated in Khanke, Domiz, Sharya and other Duhok-area sites.",
          textKu:
            "پڕۆژەکانی خۆراک، کەلوپەلی ناخۆراکی، یارمەتیی زستانی، تەندروستی و پشتگیریی کەمپەکان بەردەوام لە خانکێ، دومیز، شاریە و ناوچەکانی تری دهۆک جێبەجێ دەکران.",
          textAr:
            "عملت مشاريع الدعم المتكررة الخاصة بالأمن الغذائي، والمواد غير الغذائية، ومستلزمات الشتاء، والصحة، والمأوى والإسكان في مخيمات خانك، ودوميز، وشاريا وغيرها من المواقع في منطقة دهوك.",
        },
        {
          year: "2023",
          text: "Thirteen camps managed in Duhok.",
          textKu: "لە دهۆک ١٣ کەمپ بەڕێوەبران.",
          textAr: "إدارة 13 مخيماً في نطاق محافظة دهوك.",
        },
        {
          year: "2024",
          text: "The Warm Winter heater project included Duhok schools, and flood-relief NFI support covered affected Duhok locations.",
          textKu:
            "پڕۆژەی گەرمکەرەوەی «زستانی گەرم» قوتابخانەکانی دهۆکیشی گرتەوە؛ هەروەها یارمەتییە ناخۆراکییەکانی فریاکەوتنی لافاو بۆ ناوچە زیانلێکەوتووەکانی دهۆک دابین کران.",
          textAr:
            "امتد مشروع الشتاء الدافئ للمدافئ ليشمل مدارس دهوك، بالتزامن مع توفير مساعدات إغاثية من المواد غير الغذائية للمناطق المتضررة جراء الفيضانات.",
        },
        {
          year: "2026",
          text: "Food, flour, white oil and other assistance continued across Duhok camps; Eid projects included major flour support for displaced families.",
          textKu:
            "لە کەمپەکانی دهۆک، یارمەتیی خۆراک، ئارد، نەوتی سپی و یارمەتییەکانی تر بەردەوام دابەش دەکران؛ هەروەها لە پڕۆژەکانی جەژندا بڕێکی زۆر ئارد بۆ خێزانە ئاوارەکان دابەش کرا.",
          textAr:
            "استمرار توزيع المواد الغذائية، والطحين، والنفط الأبيض في مخيمات دهوك، إلى جانب تقديم دفعات دعم واسعة من الطحين للعائلات النازحة ضمن مشاريع العيد.",
        },
      ],
    },
    {
      id: "disability",
      entries: [
        {
          year: "2015",
          text: "The mobility-aid project launched and continued in Duhok.",
          textKu: "پڕۆژەی یارمەتییەکانی جووڵە و گواستنەوە لە دهۆک دەستی پێکرد و بەردەوام بوو.",
          textAr: "إطلاق واستمرار مشروع المعينات الحركية في دهوك.",
        },
        {
          year: "2021",
          text: "Mobility-aid support reached 154 people in Duhok city.",
          textKu: "یارمەتییەکانی جووڵە و گواستنەوە لە شاری دهۆک گەیشتنە ١٥٤ کەس.",
          textAr: "وصلت المعينات الحركية إلى 154 شخصاً في مدينة دهوك.",
          note: "The city record. Zakho, Amedi, Shiladze and the other districts are recorded separately.",
          noteKu:
            "ئەمە تۆماری شارەکەیە. زاخۆ، ئامێدی، شێلادزێ و ناوچەکانی دیکە بە جیا تۆمار کراون.",
          noteAr:
            "هذا سجل المدينة، أما زاخو والعمادية وشيلادزي والأقضية الأخرى فتُسجَّل على حدة.",
        },
        {
          year: "2022",
          text: "106 beneficiaries in Duhok.",
          textKu: "لە دهۆک ١٠٦ کەس سوودمەند بوون.",
          textAr: "بلغ عدد المستفيدين في دهوك 106 أشخاص.",
        },
        {
          year: "2026",
          text: "Eight wheelchairs distributed in May, with disability-support activities continuing.",
          textKu:
            "لە مانگی ئایار ٨ کورسی چەرخدار دابەش کرا؛ هەروەها چالاکییەکانی پشتگیری کەسانی خاوەن پێداویستی تایبەت بەردەوام بوون.",
          textAr: "وُزعت 8 كراسٍ متحركة في شهر مايو، مع استمرار أنشطة دعم ذوي الإعاقة.",
        },
        {
          year: "2016",
          text: "Disabled-care activities reached 110 people in Duhok host communities and 66 more inside the camps.",
          textKu:
            "چالاکییەکانی چاودێری کەم‌ئەندامان گەیشتنە ١١٠ کەس لە کۆمەڵگا میوانداریەکانی دهۆک و ٦٦ کەسی دیکەش لە ناو کەمپەکاندا.",
          textAr:
            "وصلت أنشطة رعاية ذوي الإعاقة إلى 110 أشخاص في المجتمعات المضيفة بدهوك و66 شخصاً آخرين داخل المخيمات.",
        },
      ],
    },
    {
      id: "livelihood",
      entries: [
        {
          year: "2023",
          text: "Livelihood-sector activity continued through the Duhok office and its vocational centres.",
          textKu:
            "چالاکییەکانی بواری بژێوی ژیان لە ڕێگەی ئۆفیسی دهۆک و ناوەندەکانی فێرکاریی پیشەیی بەردەوام بوون.",
          textAr:
            "استمرت أنشطة قطاع سبل العيش من خلال مكتب دهوك ومراكزه للتدريب المهني.",
        },
        {
          year: "2026",
          text: "The Kurdivia fruit-drying and green-garden initiative was implemented at the University of Duhok with the American Corner.",
          textKu:
            "دەستپێشخەری Kurdivia بۆ وشککردنەوەی بەرهەم و دروستکردنی باخچەی سەوز، لە زانکۆی دهۆک بە هاوکاری American Corner جێبەجێ کرا.",
          textAr:
            "نُفذت مبادرة Kurdvia لتجفيف الفواكه والحدائق الخضراء في جامعة دهوك بالتعاون مع الركن الأمريكي (American Corner).",
        },
      ],
    },
    {
      id: "cash",
      entries: [
        {
          year: "2012",
          text: "Orphan sponsorship — the Kurdistan project — operates across Duhok and the other offices.",
          textKu: "پڕۆژەی پاڵپشتی ئازیزان ــ پڕۆژەی کوردستان ــ لە دهۆک و ئۆفیسەکانی تری BCF جێبەجێ دەکرێت.",
          textAr:
            "يعمل مشروع كفالة الأعزاء - مشروع كوردستان في دهوك إلى جانب مكاتب المؤسسة الأخرى.",
        },
        {
          year: "2025",
          text: "The Azizan-Kurdistan March stage reached 594 orphans in Duhok.",
          textKu: "قۆناغی ئاداری پڕۆژەی ئازیزان-کوردستان لە دهۆک گەیشتە ٥٩٤ ئازیز",
          textAr: "وصلت مرحلة دهوك من مسيرة أعزاء كوردستان إلى 594 عزيزاً.",
        },
        {
          year: "2025-26",
          text: "Nujin operates in Duhok.",
          textKu: "پڕۆژەی نوژین لە دهۆک جێبەجێ دەکرێت.",
          textAr: "يعمل مشروع نوزين في دهوك.",
          note: "15 families in 2025 and 12 in 2026 are project-wide totals across all offices, not Duhok counts.",
          noteKu:
            "ژمارەی ١٥ خێزان لە ساڵی ٢٠٢٥ و ١٢ خێزان لە ساڵی ٢٠٢٦، کۆی گشیی پڕۆژەکە لە هەموو ئۆفیسەکانە و تایبەت بە دهۆک نییە.",
        },
        {
          year: "2026",
          text: "The Duhok office organised activities and cash support for orphaned children and their families.",
          textKu:
            "ئۆفیسی دهۆک چالاکی جیاوازی بۆ منداڵانی ئازیز و خێزانەکانیان ڕێکخست، هەروەها یارمەتی دارایی پێشکەش کرد.",
          textAr: "نظّم مكتب دهوك أنشطة وقدّم مساعدات نقدية للأعزاء وعائلاتهم.",
        },
        {
          year: "2021",
          text: "The UAE-supported OrphanCare project recorded 2,902 children in Duhok.",
          textKu:
            "پڕۆژەی OrphanCare بە پشتگیری ئیمارات ٢,٩٠٢ منداڵی لە دهۆک تۆمار کرد.",
          textAr:
            "سجل مشروع رعاية الأيتام المدعوم إماراتياً 2,902 طفلاً في دهوك.",
        },
        {
          year: "2024",
          text: "Cash assistance reached 515 families in Duhok, representing 6,588 people.",
          textKu:
            "یارمەتی نەقدی لە دهۆک گەیشتە ٥١٥ خێزان، واتە ٦,٥٨٨ کەس.",
          textAr:
            "وصلت المساعدات النقدية في دهوك إلى 515 أسرة، أي ما يمثل 6,588 شخصاً.",
        },
      ],
    },
    {
      id: "community",
      entries: [
        {
          year: "2025",
          text: "A community-support project announced carpets for 62 mosques across Duhok Province and the Zakho administration.",
          textKu:
            "پڕۆژەیەکی پشتگیری کۆمەڵگا ڕایگەیاند کە فەرش بۆ ٦٢ مزگەوت لە پارێزگای دهۆک و ئیدارەی زاخۆ دابین دەکرێت.",
          textAr:
            "أعلن مشروع لدعم المجتمع عن توفير سجاد لـ 62 مسجداً في عموم محافظة دهوك وإدارة زاخو المستقلة.",
        },
      ],
    },
    {
      id: "wash",
      entries: [
        {
          year: "2018",
          text: "WASH work recorded 9,557 family and 66,021 individual beneficiary entries in Duhok.",
          textKu:
            "کاری ئاو و خاوێنکاری لە دهۆک ٩,٥٥٧ تۆماری خێزان و ٦٦,٠٢١ تۆماری کەسی سوودمەندی تۆمار کرد.",
          textAr:
            "سجلت أعمال المياه والإصحاح 9,557 مدخلاً أسرياً و66,021 مدخلاً فردياً للمستفيدين في دهوك.",
        },
        {
          year: "2023",
          text: "The Duhok WASH record reached 3,151 beneficiaries.",
          textKu:
            "تۆماری ئاو و خاوێنکاری لە دهۆک گەیشتە ٣,١٥١ سوودمەند.",
          textAr:
            "بلغ سجل المياه والإصحاح في دهوك 3,151 مستفيداً.",
        },
        {
          year: "2024",
          text: "WASH activities reached 235 families in Duhok, representing 1,308 people.",
          textKu:
            "چالاکییەکانی ئاو و خاوێنکاری لە دهۆک گەیشتنە ٢٣٥ خێزان، واتە ١,٣٠٨ کەس.",
          textAr:
            "وصلت أنشطة المياه والإصحاح في دهوك إلى 235 أسرة، أي ما يمثل 1,308 أشخاص.",
        },
      ],
    },
  ],

  sulaymaniyah: [
    {
      id: "food",
      entries: [
        {
          year: "2021",
          text: "The Korek food project reached 1,500 households and Qurbani meat 1,000 households; other BCF and Kuwait-supported food projects also covered Sulaymaniyah.",
          textKu:
            "پڕۆژەی خۆراکی کۆرەک یارمەتی خۆراکی بۆ ١,٥٠٠ خێزان دابەش کرد، هەروەها گۆشتی قوربانی بۆ ١,٠٠٠ خێزان دابەش کرا؛ پڕۆژەکانی تری دەزگای خێرخوازی بارزانی و ئەو پڕۆژانەی بە پشتگیری کوێت جێبەجێ کران، سلێمانیشیان گرتەوە.",
          textAr:
            "وصل مشروع كۆرەک الغذائي إلى 1,500 أسرة، ووصل لحم الأضاحي إلى 1,000 أسرة؛ كما غطت مشاريع غذائية أخرى بدعم من مؤسسة بارزاني الخيرية والكويت محافظة السليمانية.",
        },
        {
          year: "2022",
          text: "3,550 hot meals reported in Sulaymaniyah.",
          textKu: "لە سلێمانی، ٣,٥٥٠ ژەم خواردنی گەرم دابەش کرا.",
          textAr: "الإبلاغ عن توزيع 3,550 وجبة ساخنة في السليمانية.",
        },
        {
          year: "2023",
          text: "The Qurbani meat project reached 1,149 families.",
          textKu: "لە پڕۆژەی گۆشتی قوربانیدا، ١,١٤٩ خێزان سوودمەند بوون.",
          textAr: "وصل مشروع لحم الأضاحي إلى 1,149 عائلة.",
        },
        {
          year: "2024",
          text: "The Ramadan overview recorded 2,605 food parcels.",
          textKu: "لە پوختەی بەرنامەکانی ڕەمەزاندا، ٢,٦٠٥ پاکێتی خۆراکی تۆمار کرا.",
          textAr: "أظهرت البيانات العامة لشهر رمضان توزيع 2,605 سلة غذائية.",
          note: "Annual report and website Ramadan overviews cover different project scopes.",
          noteKu:
            "ڕاپۆرتی ساڵانە و پوختەی ڕەمەزان لە ماڵپەڕەکە، هەر یەکەیان پڕۆژە و چالاکییە جیاوازەکان لەخۆدەگرن.",
        },
        {
          year: "2026",
          text: "400 Ramadan food baskets, support for 75 families and teachers in the Penjwen area, and 500 food baskets to families of persons with disabilities.",
          textKu:
            "لە ڕەمەزاندا ٤٠٠ سەبەتەی خۆراک دابەش کرا؛ هەروەها ٧٥ خێزان و مامۆستا لە ناوچەی پێنجوێن یارمەتییان وەرگرت، و ٥٠٠ سەبەتەی خۆراک بۆ خێزانەکانی کەسانی خاوەن پێداویستی تایبەت دابەش کرا.",
          textAr:
            "توزيع 400 سلة غذائية رمضانية، ودعم 75 عائلة ومعلماً في منطقة بنجوين، ووزعت 500 سلة غذائية على عائلات ذوي الإعاقة.",
        },
        {
          year: "2008",
          text: "Food parcels reached 860 poor and low-income families across nine locations in Sulaymaniyah.",
          textKu:
            "پاکێتی خۆراک گەیشتە ٨٦٠ خێزانی هەژار و کەمداهات لە نۆ شوێنی سلێمانی.",
          textAr:
            "وصلت الطرود الغذائية إلى 860 أسرة فقيرة ومحدودة الدخل في تسعة مواقع بالسليمانية.",
        },
        {
          year: "2015",
          text: "Food parcels reached 3,000 families in the Barika and Arbat refugee camps on 10 May.",
          textKu:
            "لە ١٠ی ئایاردا پاکێتی خۆراک گەیشتە ٣,٠٠٠ خێزان لە کەمپەکانی پەنابەرانی بەریکە و عەربەت.",
          textAr:
            "في 10 أيار وصلت الطرود الغذائية إلى 3,000 أسرة في مخيمي بريكة وعربت للاجئين.",
        },
        {
          year: "2024",
          text: "Food assistance reached 14,281 families in Sulaymaniyah, representing 63,273 people.",
          textKu:
            "یارمەتی خۆراک لە سلێمانی گەیشتە ١٤,٢٨١ خێزان، واتە ٦٣,٢٧٣ کەس.",
          textAr:
            "وصلت المساعدات الغذائية في السليمانية إلى 14,281 أسرة، أي ما يمثل 63,273 شخصاً.",
          note: "The annual sector record. The Ramadan parcel count is a separate record and the report does not combine the two.",
          noteKu:
            "ئەمە تۆماری ساڵانەی کەرتەکەیە. ژمارەی پاکێتەکانی ڕەمەزان تۆمارێکی جیاوازە و ڕاپۆرتەکە ئەم دووانە تێکەڵ ناکات.",
          noteAr:
            "هذا هو السجل السنوي للقطاع، أما عدد طرود رمضان فهو سجل منفصل، والتقرير لا يجمع بينهما.",
        },
      ],
    },
    {
      id: "education",
      entries: [
        {
          year: "2020",
          text: "The school-chair project also covered schools under the Sulaymaniyah and Penjwen education directorates.",
          textKu:
            "پڕۆژەی کورسی قوتابخانە، قوتابخانەکانی سەر بە بەڕێوەبەرایەتی پەروەردەی سلێمانی و پێنجوێنیشی گرتەوە.",
          textAr:
            "شمل مشروع المقاعد المدرسية أيضاً المدارس التابعة لمديريتي التربية في السليمانية وبنجوين.",
        },
        {
          year: "2022",
          text: "Fifty of the 203 schools in the renovation programme were in Sulaymaniyah.",
          textKu: "لە بەرنامەی نۆژەنکردنەوەی ٢٠٣ قوتابخانەدا، ٥٠ قوتابخانە لە سلێمانی بوون.",
          textAr:
            "تضمنت أعمال برنامج التأهيل والترميم 50 مدرسة من أصل 203 مدارس في محافظة السليمانية.",
        },
        {
          year: "2012",
          text: "School bags and stationery reached 300 low-income students.",
          textKu:
            "جانتای قوتابخانە و قەرتاسیە گەیشتە ٣٠٠ قوتابی کەمداهات.",
          textAr:
            "وصلت الحقائب المدرسية والقرطاسية إلى 300 طالب من ذوي الدخل المحدود.",
        },
        {
          year: "2015",
          text: "Two camp schools opened: Bar Khudan in Barika, and the 12-classroom Pekawazhiyan School in Ashti camp.",
          textKu:
            "دوو قوتابخانەی کەمپ کرانەوە: بەر خودان لە بەریکە، و قوتابخانەی پێکەوەژیان بە ١٢ پۆل لە کەمپی ئاشتی.",
          textAr:
            "افتُتحت مدرستان في المخيمات: مدرسة بر خودان في بريكة، ومدرسة بيكاوجيان المكوّنة من 12 صفاً في مخيم آشتي.",
        },
        {
          year: "2023",
          text: "Education activities recorded 25,178 beneficiaries in Sulaymaniyah.",
          textKu:
            "چالاکییەکانی پەروەردە لە سلێمانی ٢٥,١٧٨ سوودمەندیان تۆمار کرد.",
          textAr:
            "سجلت الأنشطة التعليمية 25,178 مستفيداً في السليمانية.",
        },
      ],
    },
    {
      id: "nfi",
      entries: [
        {
          year: "2023",
          text: "The NFI sector recorded 22,297 individual beneficiaries through the Sulaymaniyah office.",
          textKu: "لە ڕێگەی ئۆفیسی سلێمانی، ٢٢,٢٩٧ کەس لە یارمەتییە ناخۆراکییەکان سوودمەند بوون.",
          textAr:
            "تسجيل 22,297 مستفيداً ضمن قطاع المواد غير الغذائية عبر مكتب السليمانية.",
        },
        {
          year: "2018",
          text: "NFI activities recorded 284 families and 1,202 people.",
          textKu:
            "چالاکییەکانی کەلوپەلی ناخۆراکی ٢٨٤ خێزان و ١,٢٠٢ کەسیان تۆمار کرد.",
          textAr:
            "سجلت أنشطة المواد غير الغذائية 284 أسرة و1,202 شخص.",
        },
        {
          year: "2024",
          text: "Household-support records reached 110 people in Sulaymaniyah and shelter records 50.",
          textKu:
            "تۆمارەکانی پاڵپشتی ماڵ لە سلێمانی گەیشتنە ١١٠ کەس و تۆمارەکانی سەرپەناش ٥٠ کەس.",
          textAr:
            "بلغت سجلات دعم المستلزمات المنزلية 110 أشخاص في السليمانية، وبلغت سجلات المأوى 50 شخصاً.",
          note: "The report gives no family total for either record, and does not combine them.",
          noteKu:
            "ڕاپۆرتەکە بۆ هیچ کام لەم دوو تۆمارە کۆی خێزان نادات و کۆشیان ناکاتەوە.",
          noteAr:
            "لا يعطي التقرير إجمالاً للأسر في أي من السجلين، ولا يجمع بينهما.",
        },
      ],
    },
    {
      id: "disability",
      entries: [
        {
          year: "2021",
          text: "125 mobility-aid beneficiaries.",
          textKu: "١٢٥ کەس یارمەتی جووڵە و گواستنەوەیان وەرگرت.",
          textAr: "بلغ عدد المستفيدين من المعينات الحركية 125.",
        },
        {
          year: "2022",
          text: "115 beneficiaries.",
          textKu: "١١٥ کەس یارمەتی و پشتگیرییان وەرگرت.",
          textAr: "بلغ إجمالي عدد المستفيدين 115 مستفيداً.",
        },
        {
          year: "2026",
          text: "Eleven wheelchairs in May; food support also targeted 250 people with special needs in March and 500 disability-linked families in May.",
          textKu:
            "لە مانگی ئایار ١١ کورسی چەرخدار دابەش کرا؛ هەروەها لە مانگی ئادار یارمەتی خۆراکی بۆ ٢٥٠ کەسی خاوەن پێداویستی تایبەت و لە مانگی ئایار بۆ ٥٠٠ خێزانی کەسانی خاوەن پێداویستی تایبەت دابەش کرا.",
          textAr:
            "توزيع 11 كرسياً متحركاً في شهر مايو؛ كما استهدف الدعم الغذائي 250 شخصاً من ذوي الاحتياجات الخاصة في شهر مارس، و500 أسرة من عائلات ذوي الإعاقة في شهر مايو.",
        },
        {
          year: "2009",
          text: "Wheelchairs and walking aids reached 44 people directly in Sulaymaniyah.",
          textKu:
            "کورسی چەرخدار و داری یارمەتی ڕۆیشتن ڕاستەوخۆ گەیشتە ٤٤ کەس لە سلێمانی.",
          textAr:
            "وصلت الكراسي المتحركة ومساعدات المشي إلى 44 شخصاً مباشرة في السليمانية.",
        },
      ],
    },
    {
      id: "protection",
      entries: [
        {
          year: "2024",
          text: "Sulaymaniyah was included in BCF's protection-sector geographic coverage.",
          textKu: "سلێمانی یەکێک بوو لەو ناوچانەی کە BCF لە بواری پاراستندا خزمەتگوزاری پێشکەش دەکرد.",
          textAr:
            "أُدرجت محافظة السليمانية ضمن النطاق الجغرافي لقطاع الحماية التابع لمؤسسة بارزاني الخيرية (BCF).",
        },
      ],
    },
    {
      id: "cash",
      entries: [
        {
          year: "2021",
          text: "Sulaymaniyah students were included in the top Grade 12 orphan recognition programme.",
          textKu: "قوتابییە هەتیوە سەرکەوتووەکانی پۆلی ١٢ لە سلێمانی، لە بەرنامەی ڕێزلێناندا بەشدار بوون.",
          textAr:
            "أُدرج طلاب محافظة السليمانية ضمن برنامج تكريم الأعزاء من المتفوقين في الصف الثاني عشر.",
        },
        {
          year: "2025",
          text: "The Azizan-Kurdistan March stage reached 561 orphans in Sulaymaniyah.",
          textKu: "لە قۆناغی ئاداری پڕۆژەی ئازیزان-کوردستان، ٥٦١ ئازیز لە سلێمانی یارمەتییان وەرگرت.",
          textAr:
            "وصلت مسيرة أعزاء كوردستان إلى 561 من الأعزاء في محافظة السليمانية.",
        },
        {
          year: "2025-26",
          text: "Nujin operates in Sulaymaniyah.",
          textKu: "پڕۆژەی نوژین لە سلێمانی جێبەجێ دەکرێت.",
          textAr: "ينشط مشروع نوجين في السليمانية.",
          note: "15 families in 2025 and 12 in 2026 are project-wide totals across all offices, not Sulaymaniyah counts.",
          noteKu:
            "١٥ خێزان لە ساڵی ٢٠٢٥ و ١٢ خێزان لە ساڵی ٢٠٢٦، کۆی گشتی سوودمەندانی پڕۆژەکە لە هەموو ئۆفیسەکانن؛ ئەم ژمارانە تایبەت بە سلێمانی نین.",
        },
        {
          year: "2026",
          text: "Two March cash projects supported 100 families with IQD 200,000 each and another 100 families with US$200 each.",
          textKu:
            "لە مانگی ئادار، دوو پڕۆژەی یارمەتی دارایی جێبەجێ کران؛ ١٠٠ خێزان هەر یەک ٢٠٠,٠٠٠ دیناری عێراقییان وەرگرت، و ١٠٠ خێزانی تر هەر یەک ٢٠٠ دۆلاریان وەرگرت.",
          textAr:
            "دعم مشروعان لشهر آذار 100 أسرة بمبلغ 200,000 دينار عراقي لكل منها، و100 أسرة أخرى بمبلغ 200 دولار أمريكي لكل منها.",
        },
        {
          year: "2021",
          text: "The UAE-supported OrphanCare project recorded 2,193 children in Sulaymaniyah.",
          textKu:
            "پڕۆژەی OrphanCare بە پشتگیری ئیمارات ٢,١٩٣ منداڵی لە سلێمانی تۆمار کرد.",
          textAr:
            "سجل مشروع رعاية الأيتام المدعوم إماراتياً 2,193 طفلاً في السليمانية.",
        },
        {
          year: "2024",
          text: "Cash assistance reached 496 families in Sulaymaniyah, representing 4,882 people.",
          textKu:
            "یارمەتی نەقدی لە سلێمانی گەیشتە ٤٩٦ خێزان، واتە ٤,٨٨٢ کەس.",
          textAr:
            "وصلت المساعدات النقدية في السليمانية إلى 496 أسرة، أي ما يمثل 4,882 شخصاً.",
        },
      ],
    },
    {
      id: "health",
      entries: [
        {
          year: "2012",
          text: "A visiting medical team examined and treated 110 Iranian patients in Zurgwez camp.",
          textKu:
            "تیمێکی پزیشکی سەردانکەر ١١٠ نەخۆشی ئێرانی لە کەمپی زرگوێزدا پشکنین و چارەسەر کرد.",
          textAr:
            "فحص فريق طبي زائر وعالج 110 مرضى إيرانيين في مخيم زركويز.",
        },
        {
          year: "2022",
          text: "The Sulaymaniyah Health Directorate received 6,600 medicines and medical supplies.",
          textKu:
            "بەڕێوەبەرایەتی تەندروستی سلێمانی ٦,٦٠٠ دەرمان و پێداویستی پزیشکی وەرگرت.",
          textAr:
            "تسلمت دائرة صحة السليمانية 6,600 من الأدوية والمستلزمات الطبية.",
        },
        {
          year: "2023",
          text: "Health activities recorded 400 beneficiaries in Sulaymaniyah.",
          textKu:
            "چالاکییەکانی تەندروستی لە سلێمانی ٤٠٠ سوودمەندیان تۆمار کرد.",
          textAr:
            "سجلت الأنشطة الصحية 400 مستفيد في السليمانية.",
        },
      ],
    },
    {
      id: "wash",
      entries: [
        {
          year: "2018",
          text: "WASH work recorded 4,674 family and 33,403 individual beneficiary entries in Sulaymaniyah.",
          textKu:
            "کاری ئاو و خاوێنکاری لە سلێمانی ٤,٦٧٤ تۆماری خێزان و ٣٣,٤٠٣ تۆماری کەسی سوودمەندی تۆمار کرد.",
          textAr:
            "سجلت أعمال المياه والإصحاح 4,674 مدخلاً أسرياً و33,403 مدخلاً فردياً للمستفيدين في السليمانية.",
          note: "No clean 2024 city split appears in the supplied reports; this stays the latest verified figure.",
          noteKu:
            "لە ڕاپۆرتە پێشکەشکراوەکاندا دابەشکردنێکی ڕوونی ٢٠٢٤ بۆ شارەکە نییە؛ ئەمە دوایین ژمارەی پشتڕاستکراوەیە.",
          noteAr:
            "لا يرد في التقارير المتاحة تفصيل واضح لعام 2024 على مستوى المدينة، فيبقى هذا الرقم آخر رقم موثّق.",
        },
      ],
    },
    {
      id: "camp",
      entries: [
        {
          year: "2018",
          text: "Camp coordination recorded 122 family and 500 individual beneficiary entries in Sulaymaniyah.",
          textKu:
            "هەماهەنگی کەمپ لە سلێمانی ١٢٢ تۆماری خێزان و ٥٠٠ تۆماری کەسی سوودمەندی تۆمار کرد.",
          textAr:
            "سجل تنسيق المخيمات 122 مدخلاً أسرياً و500 مدخل فردي للمستفيدين في السليمانية.",
          note: "A historical record; no newer Sulaymaniyah camp-management figure is supplied.",
          noteKu:
            "تۆمارێکی مێژووییە؛ هیچ ژمارەیەکی نوێتری بەڕێوەبردنی کەمپ بۆ سلێمانی پێشکەش نەکراوە.",
          noteAr:
            "سجل تاريخي، ولم يُقدَّم رقم أحدث لإدارة المخيمات في السليمانية.",
        },
      ],
    },
  ],

  kirkuk: [
    {
      id: "food",
      entries: [
        {
          year: "2021",
          text: "The Korek food project reached 750 households and Qurbani meat 1,000 households; BCF and Kuwait-supported projects also covered Kirkuk.",
          textKu:
            "پڕۆژەی خۆراکی کۆرەک یارمەتی خۆراکی بۆ ٧٥٠ خێزان دابەش کرد، هەروەها گۆشتی قوربانی بۆ ١,٠٠٠ خێزان دابەش کرا؛ پڕۆژەکانی دەزگای خێرخوازی بارزانی و ئەو پڕۆژانەی بە پشتگیری کوێت جێبەجێ کران، کەرکوکیشیان گرتەوە.",
          textAr:
            "وصل مشروع كورك الغذائي إلى 750 أسرة، فيما استفادت 1,000 أسرة من مشروع لحوم الأضاحي. كما شملت مشاريع مؤسسة بارزاني الخيرية والمشاريع المدعومة من الكويت كركوك.",
        },
        {
          year: "2022",
          text: "3,500 hot meals reported in Kirkuk.",
          textKu: "لە کەرکووک، ٣,٥٠٠ ژەم خواردنی گەرم دابەش کرا.",
          textAr: "تم تقديم 3,500 وجبة ساخنة في كركوك.",
        },
        {
          year: "2023",
          text: "The Qurbani meat project reached 1,972 families.",
          textKu: "لە پڕۆژەی گۆشتی قوربانیدا، ١,٩٧٢ خێزان سوودمەند بوون.",
          textAr: "استفادت 1,972 أسرة من مشروع الأضاحي.",
        },
        {
          year: "2024",
          text: "The Ramadan overview recorded 6,750 food parcels.",
          textKu: "لە پوختەی بەرنامەکانی ڕەمەزاندا، ٦,٧٥٠ پاکێتی خۆراکی تۆمار کرا.",
          textAr: "تم توزيع 6,750 طردًا غذائيًا خلال شهر رمضان.",
          note: "Annual report and website Ramadan overviews cover different project scopes.",
          noteKu:
            "ڕاپۆرتی ساڵانە و پوختەی ڕەمەزان لە ماڵپەڕەکە، هەر یەکەیان پڕۆژە و چالاکییە جیاوازەکان لەخۆدەگرن.",
        },
        {
          year: "2026",
          text: "Prde food baskets for 200 families, and the 'Immortal Barzani, Symbol of Coexistence' project began with food and NFI support to 30 families.",
          textKu:
            "لە پردێ، سەبەتەی خۆراک بۆ ٢٠٠ خێزان دابەش کرا؛ هەروەها پڕۆژەی «بارزانی نەمر، هێمای پێکەوەژیان» دەستی پێکرد و خۆراک و کەلوپەلی ناخۆراکی بۆ ٣٠ خێزان دابین کرد.",
          textAr:
            "تم توزيع سلال غذائية على 200 أسرة، كما انطلق مشروع «بارزاني الخالد، رمز التعايش» بتقديم مساعدات غذائية ومواد غير غذائية إلى 30 أسرة.",
        },
        {
          year: "2007",
          text: "Food parcels reached 600 needy families across Kirkuk.",
          textKu:
            "پاکێتی خۆراک گەیشتە ٦٠٠ خێزانی کەمدەرامەت لە سەرانسەری کەرکووک.",
          textAr:
            "وصلت الطرود الغذائية إلى 600 أسرة محتاجة في عموم كركوك.",
        },
        {
          year: "2024",
          text: "Food assistance reached 8,542 families in Kirkuk, representing 42,839 people.",
          textKu:
            "یارمەتی خۆراک لە کەرکووک گەیشتە ٨,٥٤٢ خێزان، واتە ٤٢,٨٣٩ کەس.",
          textAr:
            "وصلت المساعدات الغذائية في كركوك إلى 8,542 أسرة، أي ما يمثل 42,839 شخصاً.",
          note: "The annual sector record. The Ramadan parcel count is a separate record and the report does not combine the two.",
          noteKu:
            "ئەمە تۆماری ساڵانەی کەرتەکەیە. ژمارەی پاکێتەکانی ڕەمەزان تۆمارێکی جیاوازە و ڕاپۆرتەکە ئەم دووانە تێکەڵ ناکات.",
          noteAr:
            "هذا هو السجل السنوي للقطاع، أما عدد طرود رمضان فهو سجل منفصل، والتقرير لا يجمع بينهما.",
        },
      ],
    },
    {
      id: "education",
      entries: [
        {
          year: "2022",
          text: "Fifty-two of the 203 schools in the renovation programme were in Kirkuk.",
          textKu: "لە بەرنامەی نۆژەنکردنەوەی ٢٠٣ قوتابخانەدا، ٥٢ قوتابخانە لە کەرکووک بوون.",
          textAr: "كانت 52 مدرسة من أصل 203 مدارس ضمن برنامج الترميم في كركوك.",
        },
        {
          year: "2024",
          text: "The final 50-school programme included five schools in Kirkuk.",
          textKu: "لە بەرنامەی کۆتایی نۆژەنکردنەوەی ٥٠ قوتابخانەدا، ٥ قوتابخانەی کەرکووک نۆژەن کرانەوە.",
          textAr: "شمل البرنامج النهائي المكوّن من 50 مدرسة، خمس مدارس في كركوك.",
        },
        {
          year: "2008",
          text: "Equipment reached six kindergartens and benefited 665 children.",
          textKu:
            "کەلوپەل گەیشتە شەش باخچەی منداڵان و ٦٦٥ منداڵی لێ سوودمەند بوون.",
          textAr:
            "وصلت التجهيزات إلى ست رياض أطفال واستفاد منها 665 طفلاً.",
        },
        {
          year: "2018",
          text: "Education activities recorded 1,074 beneficiaries in Kirkuk.",
          textKu:
            "چالاکییەکانی پەروەردە لە کەرکووک ١,٠٧٤ سوودمەندیان تۆمار کرد.",
          textAr:
            "سجلت الأنشطة التعليمية 1,074 مستفيداً في كركوك.",
        },
        {
          year: "2023",
          text: "Education activities recorded 4,014 beneficiaries in Kirkuk.",
          textKu:
            "چالاکییەکانی پەروەردە لە کەرکووک ٤,٠١٤ سوودمەندیان تۆمار کرد.",
          textAr:
            "سجلت الأنشطة التعليمية 4,014 مستفيداً في كركوك.",
        },
      ],
    },
    {
      id: "nfi",
      entries: [
        {
          year: "2023",
          text: "NFI activities recorded 3,850 individual beneficiaries.",
          textKu: "لە چالاکییەکانی یارمەتییە ناخۆراکییەکاندا، ٣,٨٥٠ کەس سوودمەند بوون.",
          textAr: "استفاد 3,850 شخصًا من أنشطة توزيع المواد غير الغذائية.",
        },
        {
          year: "2008",
          text: "Household essentials reached 1,230 displaced families returning to Kirkuk.",
          textKu:
            "پێداویستی سەرەکی ماڵ گەیشتە ١,٢٣٠ خێزانی ئاوارە کە دەگەڕانەوە کەرکووک.",
          textAr:
            "وصلت المستلزمات المنزلية الأساسية إلى 1,230 أسرة نازحة عائدة إلى كركوك.",
        },
        {
          year: "2018",
          text: "NFI activities recorded 166 families and 758 people in Kirkuk.",
          textKu:
            "چالاکییەکانی کەلوپەلی ناخۆراکی لە کەرکووک ١٦٦ خێزان و ٧٥٨ کەسیان تۆمار کرد.",
          textAr:
            "سجلت أنشطة المواد غير الغذائية 166 أسرة و758 شخصاً في كركوك.",
        },
        {
          year: "2024",
          text: "NFI assistance reached 110 families in Kirkuk, representing 611 people.",
          textKu:
            "یارمەتی کەلوپەلی ناخۆراکی لە کەرکووک گەیشتە ١١٠ خێزان، واتە ٦١١ کەس.",
          textAr:
            "وصلت مساعدات المواد غير الغذائية في كركوك إلى 110 أسر، أي ما يمثل 611 شخصاً.",
        },
      ],
    },
    {
      id: "disability",
      entries: [
        {
          year: "2021",
          text: "121 mobility-aid beneficiaries.",
          textKu: "١٢١ کەس یارمەتی جووڵە و گواستنەوەیان وەرگرت.",
          textAr: "استفاد 121 شخصًا من مساعدات التنقّل.",
        },
        {
          year: "2022",
          text: "220 disability-support beneficiaries.",
          textKu: "٢٢٠ کەس کە خاوەن پێداویستی تایبەت بوون، یارمەتی و پشتگیرییان وەرگرت.",
          textAr: "استفاد 220 شخصًا من خدمات دعم ذوي الهمم.",
        },
        {
          year: "2016",
          text: "Disabled-care assistance reached 24 people in Kirkuk.",
          textKu:
            "یارمەتی چاودێری کەم‌ئەندامان گەیشتە ٢٤ کەس لە کەرکووک.",
          textAr:
            "وصلت مساعدات رعاية ذوي الإعاقة إلى 24 شخصاً في كركوك.",
        },
        {
          year: "2023",
          text: "Wheelchairs were distributed in Kirkuk through the LDS-supported disability programme.",
          textKu:
            "کورسی چەرخدار لە کەرکووک دابەش کران لە ڕێگەی بەرنامەی کەم‌ئەندامان بە پشتگیری LDS.",
          textAr:
            "وُزّعت الكراسي المتحركة في كركوك عبر برنامج ذوي الإعاقة المدعوم من مؤسسة LDS الخيرية.",
        },
      ],
    },
    {
      id: "protection",
      entries: [
        {
          year: "2024",
          text: "Kirkuk was included in protection-sector programmes.",
          textKu: "کەرکووک یەکێک بوو لەو ناوچانەی کە بەرنامەکانی بواری پاراستن لێی جێبەجێ دەکران.",
          textAr: "شملت برامج قطاع الحماية محافظة كركوك.",
        },
      ],
    },
    {
      id: "livelihood",
      entries: [
        {
          year: "2023",
          text: "Livelihood-sector work continued through the Kirkuk office.",
          textKu: "کار و چالاکییەکانی بواری بژێوی ژیان لە ڕێگەی ئۆفیسی کەرکووک بەردەوام بوون.",
          textAr: "استمرت أنشطة قطاع سبل العيش من خلال مكتب كركوك.",
        },
      ],
    },
    {
      id: "cash",
      entries: [
        {
          year: "2025",
          text: "The Azizan-Kurdistan March stage reached 644 orphans in Kirkuk.",
          textKu: "لە قۆناغی ئاداری پڕۆژەی ئازیزان-کوردستاندا، ٦٤٤ ئازیز لە کەرکووک سوودمەند بوون.",
          textAr:
            "وصلت مرحلة آذار من مشروع الأعزاء كردستان إلى 644 يتيمًا في كركوك.",
        },
        {
          year: "2025-26",
          text: "Nujin operates in Kirkuk.",
          textKu: "پڕۆژەی نوژین لە کەرکووک جێبەجێ دەکرێت.",
          textAr: "يعمل مشروع نوجين في كركوك.",
          note: "15 families in 2025 and 12 in 2026 are project-wide totals across all offices, not Kirkuk counts.",
          noteKu:
            "١٥ خێزان لە ساڵی ٢٠٢٥ و ١٢ خێزان لە ساڵی ٢٠٢٦ سوودمەند بوون، بەڵام ئەم ژمارانە کۆی گشتی هەموو ئۆفیسەکانی پڕۆژەکەن و تایبەت بە کەرکووک نین.",
        },
        {
          year: "2026",
          text: "Cash distributions reached 300 families with US$100 each and another 50 families with US$200 each.",
          textKu:
            "یارمەتی دارایی بۆ ٣٠٠ خێزان دابەش کرا، هەر خێزانێک ١٠٠ دۆلاری وەرگرت؛ هەروەها ٥٠ خێزانی تر هەر یەک ٢٠٠ دۆلاریان وەرگرت.",
          textAr:
            "تم توزيع مساعدات نقدية على 300 أسرة بمبلغ 100 دولار أمريكي لكل أسرة، وعلى 50 أسرة أخرى بواقع 200 دولار أمريكي لكل أسرة.",
        },
        {
          year: "2021",
          text: "The UAE-supported OrphanCare project recorded 1,743 children in Kirkuk.",
          textKu:
            "پڕۆژەی OrphanCare بە پشتگیری ئیمارات ١,٧٤٣ منداڵی لە کەرکووک تۆمار کرد.",
          textAr:
            "سجل مشروع رعاية الأيتام المدعوم إماراتياً 1,743 طفلاً في كركوك.",
        },
        {
          year: "2024",
          text: "Cash assistance reached 451 families in Kirkuk, representing 3,604 people.",
          textKu:
            "یارمەتی نەقدی لە کەرکووک گەیشتە ٤٥١ خێزان، واتە ٣,٦٠٤ کەس.",
          textAr:
            "وصلت المساعدات النقدية في كركوك إلى 451 أسرة، أي ما يمثل 3,604 أشخاص.",
        },
      ],
    },
    {
      id: "health",
      entries: [
        {
          year: "2021",
          text: "Kirkuk received 25,000 masks through a COVID-19 prevention initiative.",
          textKu:
            "کەرکووک ٢٥,٠٠٠ ماسکی وەرگرت لە ڕێگەی دەستپێشخەرییەکی پێشگیری لە کۆڤید-١٩.",
          textAr:
            "تسلمت كركوك 25,000 كمامة ضمن مبادرة للوقاية من كوفيد-19.",
        },
        {
          year: "2022",
          text: "BCF and the Health Directorate delivered assistance to 35 children with cancer.",
          textKu:
            "دەزگای خێرخوازی بارزانی و بەڕێوەبەرایەتی تەندروستی یارمەتییان گەیاندە ٣٥ منداڵی تووشبووی شێرپەنجە.",
          textAr:
            "قدمت مؤسسة بارزاني الخيرية ودائرة الصحة المساعدة لـ 35 طفلاً مصاباً بالسرطان.",
          note: "A focused local story. The supplied 2024 report carries no clean Kirkuk health total.",
          noteKu:
            "چیرۆکێکی خۆجێیی دیاریکراوە. ڕاپۆرتی ٢٠٢٤ی پێشکەشکراو هیچ کۆیەکی ڕوونی تەندروستی بۆ کەرکووک ناگرێتەخۆ.",
          noteAr:
            "قصة محلية محددة، ولا يتضمن تقرير 2024 المتاح إجمالاً صحياً واضحاً لكركوك.",
        },
      ],
    },
    {
      id: "wash",
      entries: [
        {
          year: "2024",
          text: "WASH activities reached 110 families in Kirkuk, representing 501 people.",
          textKu:
            "چالاکییەکانی ئاو و خاوێنکاری لە کەرکووک گەیشتنە ١١٠ خێزان، واتە ٥٠١ کەس.",
          textAr:
            "وصلت أنشطة المياه والإصحاح في كركوك إلى 110 أسر، أي ما يمثل 501 شخص.",
        },
      ],
    },
    {
      id: "camp",
      entries: [
        {
          year: "2017",
          text: "The Kirkuk office reported nine IDP camps hosting 2,065 families, alongside 15,406 displaced families living outside camps.",
          textKu:
            "ئۆفیسی کەرکووک ڕایگەیاند نۆ کەمپی ئاوارەکان ٢,٠٦٥ خێزانیان لە خۆ گرتووە، لەگەڵ ١٥,٤٠٦ خێزانی ئاوارە کە لە دەرەوەی کەمپەکان دەژیان.",
          textAr:
            "أفاد مكتب كركوك بوجود تسعة مخيمات للنازحين تؤوي 2,065 أسرة، إلى جانب 15,406 أسر نازحة تقيم خارج المخيمات.",
          note: "A historical coordination footprint; no newer Kirkuk camp count is supplied.",
          noteKu:
            "ئەمە شوێنپێی مێژووی هەماهەنگییە؛ هیچ ژمارەیەکی نوێتری کەمپ بۆ کەرکووک پێشکەش نەکراوە.",
          noteAr:
            "بصمة تنسيق تاريخية، ولم يُقدَّم عدد أحدث لمخيمات كركوك.",
        },
      ],
    },
  ],

  nineveh: [
    {
      id: "food",
      entries: [
        {
          year: "2021",
          text: "The Korek project reached 1,850 households in Mosul and Qurbani meat 1,000 households in Nineveh; the Kuwait-supported food project also covered the governorate.",
          textKu:
            "پڕۆژەی کۆرەک لە موسڵ یارمەتی خۆراکی بۆ ١,٨٥٠ خێزان دابین کرد، هەروەها گۆشتی قوربانی بۆ ١,٠٠٠ خێزان لە نەینەوا دابەش کرا؛ پڕۆژەی خۆراکی بە پشتگیری کوێتیش پارێزگای نەینەوای گرتەوە.",
          textAr:
            "استفادت 1,850 أسرة في الموصل من مشروع كورك. كما استفادت 1,000 أسرة في نينوى من مشروع توزيع الأضاحي، وشمل المحافظة أيضاً مشروع غذائي بدعم من الكويت.",
        },
        {
          year: "2022",
          text: "498,545 hot meals reported in Nineveh, with food-project beneficiaries also recorded in Nineveh and Zummar.",
          textKu:
            "لە نەینەوا ٤٩٨,٥٤٥ ژەم خواردنی گەرم دابەش کرا؛ هەروەها سوودمەندانی پڕۆژەکانی خۆراک لە نەینەوا و زوممار تۆمار کران.",
          textAr:
            "تم تقديم 498,545 وجبة ساخنة في نينوى، إلى جانب مستفيدين من مشاريع غذائية في نينوى وزمار.",
        },
        {
          year: "2023",
          text: "The Qurbani meat project reached 1,815 families in Mosul.",
          textKu: "پڕۆژەی گۆشتی قوربانی لە موسڵ گەیشتە ١,٨١٥ خێزان.",
          textAr: "استفادت 1,815 أسرة في الموصل من مشروع توزيع لحوم الأضاحي.",
        },
        {
          year: "2024",
          text: "The Ramadan overview recorded 6,500 food parcels in Mosul.",
          textKu: "لە پوختەی بەرنامەکانی ڕەمەزاندا، ٦,٥٠٠ پاکێتی خۆراکی لە موسڵ تۆمار کرا.",
          textAr: "تم توزيع 6,500 سلة غذائية رمضانية في الموصل.",
          note: "Annual report and website Ramadan overviews cover different project scopes.",
          noteKu:
            "ڕاپۆرتی ساڵانە و پوختەی ڕەمەزان لە ماڵپەڕەکە هەر یەکەیان پڕۆژە و چالاکییە جیاوازەکان دەگرنەوە.",
        },
        {
          year: "2010",
          text: "Food assistance reached 37 displaced Christian families in Al-Qosh.",
          textKu:
            "یارمەتی خۆراک گەیشتە ٣٧ خێزانی مەسیحی ئاوارە لە ئەلقۆش.",
          textAr:
            "وصلت المساعدات الغذائية إلى 37 أسرة مسيحية نازحة في ألقوش.",
        },
        {
          year: "2017",
          text: "Ready meals supported 781,649 displaced-person beneficiary entries during the Mosul response.",
          textKu:
            "لە کاتی وەڵامدانەوەی موسڵدا، ژەمە ئامادەکان ٧٨١,٦٤٩ تۆماری سوودمەندی ئاوارەیان پشتگیری کرد.",
          textAr:
            "دعمت الوجبات الجاهزة 781,649 مدخلاً للمستفيدين من النازحين خلال الاستجابة في الموصل.",
          note: "Recorded service entries across the response, not a count of individual people.",
          noteKu:
            "ئەمانە تۆماری خزمەتگوزارین لە درێژایی وەڵامدانەوەکەدا، نەک ژمارەی کەسانی جیاواز.",
          noteAr:
            "هذه مدخلات خدمة مسجلة على امتداد الاستجابة، وليست عدداً للأشخاص الأفراد.",
        },
        {
          year: "2024",
          text: "Food assistance reached 14,431 families in Nineveh, representing 79,937 people.",
          textKu:
            "یارمەتی خۆراک لە نەینەوا گەیشتە ١٤,٤٣١ خێزان، واتە ٧٩,٩٣٧ کەس.",
          textAr:
            "وصلت المساعدات الغذائية في نينوى إلى 14,431 أسرة، أي ما يمثل 79,937 شخصاً.",
          note: "The annual sector record. The Ramadan parcel count is a separate record and the report does not combine the two.",
          noteKu:
            "ئەمە تۆماری ساڵانەی کەرتەکەیە. ژمارەی پاکێتەکانی ڕەمەزان تۆمارێکی جیاوازە و ڕاپۆرتەکە ئەم دووانە تێکەڵ ناکات.",
          noteAr:
            "هذا هو السجل السنوي للقطاع، أما عدد طرود رمضان فهو سجل منفصل، والتقرير لا يجمع بينهما.",
        },
      ],
    },
    {
      id: "health",
      entries: [
        {
          year: "2022",
          text: "Hasan Sham and Khazir Health Centers were listed among ongoing BCF health projects serving displacement-affected populations near Nineveh.",
          textKu:
            "ناوەندە تەندروستییەکانی حەسەن شام و خازر، بەشێک بوون لە پڕۆژە تەندروستییە بەردەوامەکانی دەزگای خێرخوازی بارزانی و خزمەتگوزارییان بۆ خەڵکی ئاوارەی ناوچەکانی نزیک نەینەوا پێشکەش دەکرد.",
          textAr:
            "استمر مركزا حسن شام والخازر الصحيان ضمن مشاريع مؤسسة بارزاني الخيرية الصحية لخدمة النازحين والمتضررين من النزوح في مناطق نينوى.",
        },
        {
          year: "2024",
          text: "Health activities recorded 228,247 beneficiaries in Nineveh; Patient Mobility Services transported 525 patients from East Mosul camps to hospitals in Erbil and Mosul.",
          textKu:
            "چالاکییەکانی تەندروستی لە نەینەوا ٢٢٨,٢٤٧ سوودمەندیان تۆمار کرد؛ هەروەها ٥٢٥ نەخۆش لە کەمپەکانی ڕۆژهەڵاتی موسڵ بۆ نەخۆشخانەکانی هەولێر و موسڵ گواسترایەوە.",
          textAr:
            "سجلت الأنشطة الصحية 228,247 مستفيداً في نينوى، كما نقلت خدمة نقل المرضى 525 مريضاً من مخيمات شرق الموصل إلى مستشفيات في أربيل والموصل.",
        },
        {
          year: "2017",
          text: "Two primary health centres served displaced families in the Hassan Sham and Khazir camps.",
          textKu:
            "دوو ناوەندی تەندروستی سەرەتایی خزمەتی خێزانە ئاوارەکانیان لە کەمپەکانی حەسەن شام و خازردا پێشکەش کرد.",
          textAr:
            "قدّم مركزان للرعاية الصحية الأولية الخدمة للأسر النازحة في مخيمي حسن شام والخازر.",
        },
        {
          year: "2018",
          text: "Health activities recorded 20,657 beneficiaries in Nineveh.",
          textKu:
            "چالاکییەکانی تەندروستی لە نەینەوا ٢٠,٦٥٧ سوودمەندیان تۆمار کرد.",
          textAr:
            "سجلت الأنشطة الصحية 20,657 مستفيداً في نينوى.",
        },
      ],
    },
    {
      id: "education",
      entries: [
        {
          year: "2022",
          text: "Twenty of the 203 schools in the renovation programme were in Nineveh.",
          textKu: "لە بەرنامەی نۆژەنکردنەوەی ٢٠٣ قوتابخانەدا، ٢٠ قوتابخانەی نەینەوا نۆژەن کرانەوە.",
          textAr: "شمل برنامج ترميم 203 مدارس، منها 20 مدرسة في نينوى.",
        },
        {
          year: "2024",
          text: "The final 50-school programme included five schools in Mosul.",
          textKu: "لە بەرنامەی کۆتایی نۆژەنکردنەوەی ٥٠ قوتابخانەدا، ٥ قوتابخانەی موسڵ نۆژەن کرانەوە.",
          textAr:
            "وضمّت المرحلة النهائية من البرنامج، التي شملت 50 مدرسة، 5 مدارس في الموصل.",
        },
        {
          year: "2008",
          text: "A regional school campaign included 17 schools in Tilkaif, Bartella and Bashiqa.",
          textKu:
            "کەمپەینێکی هەرێمی قوتابخانە ١٧ قوتابخانەی لە تلکێف، بەرتەلە و بەعشیقە لەخۆ گرت.",
          textAr:
            "شملت حملة مدرسية إقليمية 17 مدرسة في تلكيف وبرطلة وبعشيقة.",
        },
        {
          year: "2015",
          text: "A temporary school opened on Mount Sinjar on 13 December, bringing 300 Yazidi students back to class.",
          textKu:
            "لە ١٣ی کانوونی یەکەمدا قوتابخانەیەکی کاتی لەسەر چیای شنگال کرایەوە و ٣٠٠ قوتابی ئێزیدی گەڕانەوە ڕیزی خوێندن.",
          textAr:
            "افتُتحت مدرسة مؤقتة في جبل سنجار في 13 كانون الأول، فعاد 300 طالب إيزيدي إلى مقاعد الدراسة.",
        },
        {
          year: "2018",
          text: "Education activities recorded 6,847 beneficiaries in Nineveh.",
          textKu:
            "چالاکییەکانی پەروەردە لە نەینەوا ٦,٨٤٧ سوودمەندیان تۆمار کرد.",
          textAr:
            "سجلت الأنشطة التعليمية 6,847 مستفيداً في نينوى.",
        },
      ],
    },
    {
      id: "wash",
      entries: [
        {
          year: "Multi-year",
          text: "A concrete water tank was constructed for Lalish as part of BCF's longer-term WASH infrastructure work.",
          textKu:
            "تانکێکی کۆنکرێتی بۆ هەڵگرتنی ئاو لە لالش دروست کرا، وەک بەشێک لە پڕۆژە درێژخایەنەکانی دەزگای خێرخوازی بارزانی لە بواری ئاو، پاکوخاوێنی و تەندروستیی ژینگە.",
          textAr:
            "تم إنشاء خزان مياه خرساني في لالش ضمن مشاريع مؤسسة بارزاني الخيرية طويلة الأمد لتطوير البنية التحتية للمياه والإصحاح.",
          note: "The cumulative report does not specify a year.",
          noteKu: "لە ڕاپۆرتی کۆکراوەکەدا ساڵی جێبەجێکردنی ئەم پڕۆژەیە دیاری نەکراوە.",
        },
        {
          year: "2017",
          text: "A Sinjar water project supplied 2,500 displaced families every day.",
          textKu:
            "پڕۆژەیەکی ئاوی شنگال ڕۆژانە ئاوی بۆ ٢,٥٠٠ خێزانی ئاوارە دابین دەکرد.",
          textAr:
            "زوّد مشروع مائي في سنجار 2,500 أسرة نازحة بالمياه يومياً.",
        },
        {
          year: "2018",
          text: "WASH work recorded 76,711 family and 401,033 individual beneficiary entries in Nineveh.",
          textKu:
            "کاری ئاو و خاوێنکاری لە نەینەوا ٧٦,٧١١ تۆماری خێزان و ٤٠١,٠٣٣ تۆماری کەسی سوودمەندی تۆمار کرد.",
          textAr:
            "سجلت أعمال المياه والإصحاح 76,711 مدخلاً أسرياً و401,033 مدخلاً فردياً للمستفيدين في نينوى.",
        },
        {
          year: "2024",
          text: "WASH activities reached 2,195 families in Nineveh, representing 10,769 people.",
          textKu:
            "چالاکییەکانی ئاو و خاوێنکاری لە نەینەوا گەیشتنە ٢,١٩٥ خێزان، واتە ١٠,٧٦٩ کەس.",
          textAr:
            "وصلت أنشطة المياه والإصحاح في نينوى إلى 2,195 أسرة، أي ما يمثل 10,769 شخصاً.",
        },
      ],
    },
    {
      id: "camp",
      entries: [
        {
          year: "2023",
          text: "Ten camps managed in Nineveh, with NFI office activity also continuing.",
          textKu:
            "لە نەینەوا ١٠ کەمپ بەڕێوەدەبران، هەروەها چالاکییەکانی ئۆفیسی یارمەتییە ناخۆراکییەکان بەردەوام بوون.",
          textAr: "أدارت المؤسسة 10 مخيمات في نينوى، مع استمرار أنشطة المواد غير الغذائية.",
        },
        {
          year: "2024",
          text: "Camp coordination and multi-sector services remained active across displacement sites.",
          textKu:
            "لە شوێنەکانی نیشتەجێبوونی ئاوارەکان، هەماهەنگی کەمپەکان و خزمەتگوزارییەکانی چەند بوارێکی جیاواز بەردەوام بوون.",
          textAr:
            "كما استمرت أعمال تنسيق المخيمات وتقديم الخدمات متعددة القطاعات في مواقع النزوح.",
        },
        {
          year: "2018",
          text: "Nineveh camp coordination recorded 151,058 family and 808,298 individual beneficiary entries.",
          textKu:
            "هەماهەنگی کەمپەکانی نەینەوا ١٥١,٠٥٨ تۆماری خێزان و ٨٠٨,٢٩٨ تۆماری کەسی سوودمەندی تۆمار کرد.",
          textAr:
            "سجل تنسيق المخيمات في نينوى 151,058 مدخلاً أسرياً و808,298 مدخلاً فردياً للمستفيدين.",
          note: "Recorded service entries, not camp population.",
          noteKu:
            "لە ڕاپۆرتی کۆکراوەکەدا ساڵی جێبەجێکردنی ئەم پڕۆژەیە دیاری نەکراوە.",
          noteAr:
            "هذه مدخلات خدمة مسجلة، وليست عدد سكان المخيمات.",
        },
      ],
    },
    {
      id: "disability",
      entries: [
        {
          year: "2021",
          text: "Mobility-aid support recorded 208 people in Ninewa and 63 more in Sinjar.",
          textKu:
            "یارمەتییەکانی جووڵە و گواستنەوە ٢٠٨ کەسیان لە نەینەوا و ٦٣ کەسی دیکەیان لە شنگال تۆمار کرد.",
          textAr:
            "سجلت المعينات الحركية 208 أشخاص في نينوى و63 شخصاً آخرين في سنجار.",
          note: "Two separate local records; Sinjar is not counted inside the Ninewa figure.",
          noteKu:
            "دوو تۆماری خۆجێیی جیاوازن؛ شنگال لە ناو ژمارەی نەینەوادا ژمێردراو نییە.",
          noteAr: "سجلان محليان منفصلان، وسنجار غير محتسبة ضمن رقم نينوى.",
        },
        {
          year: "2022",
          text: "115 disability-support beneficiaries.",
          textKu: "هەروەها ١١٥ کەس کە خاوەن پێداویستیی تایبەت بوون، یارمەتی و پشتگیرییان وەرگرت.",
          textAr: "كما استفاد 115 شخصاً من خدمات دعم ذوي الهمم.",
        },
        {
          year: "2023",
          text: "Wheelchairs, walkers and crutches were distributed in Mosul and the surrounding communities.",
          textKu:
            "کورسی چەرخدار، ئامێری ڕۆیشتن و گۆچان لە موسڵ و کۆمەڵگا دەوروبەرەکاندا دابەش کران.",
          textAr:
            "وُزّعت الكراسي المتحركة والمشايات والعكازات في الموصل والمجتمعات المحيطة بها.",
        },
      ],
    },
    {
      id: "protection",
      entries: [
        {
          year: "2024",
          text: "Nineveh was included in protection-sector programmes.",
          textKu: "نەینەوا یەکێک بوو لەو ناوچانەی کە بەرنامەکانی بواری پاراستن لێ جێبەجێ دەکران.",
          textAr: "شملت برامج قطاع الحماية محافظة نينوى.",
        },
      ],
    },
    {
      id: "livelihood",
      entries: [
        {
          year: "2023",
          text: "Livelihood-sector work recorded through the Nineveh office.",
          textKu: "کار و چالاکییەکانی بواری بژێوی ژیان لە ڕێگەی ئۆفیسی نەینەوا تۆمار کران.",
          textAr: "استمرت أنشطة قطاع سبل العيش من خلال مكتب المؤسسة في نينوى.",
        },
      ],
    },
    {
      id: "cash",
      entries: [
        {
          year: "2025-26",
          text: "Nujin operates in Nineveh and Mosul as part of its multi-office family-support programme.",
          textKu:
            "پڕۆژەی نوژین لە نەینەوا و موسڵ جێبەجێ دەکرێت، و لە ڕێگەی چەند ئۆفیسێکەوە پشتگیری خێزانەکان دەکات.",
          textAr:
            "يباشر مشروع نوجين أنشطته في نينوى والموصل كجزء من برنامجه متعدد المكاتب لدعم الأسرة.",
          note: "15 families in 2025 and 12 in 2026 are project-wide totals across all offices, not Nineveh counts.",
          noteKu:
            "١٥ خێزان لە ساڵی ٢٠٢٥ و ١٢ خێزان لە ساڵی ٢٠٢٦ کۆی گشتیی سوودمەندانی هەموو ئۆفیسەکانی پڕۆژەکەن؛ ئەم ژمارانە تایبەت بە نەینەوا نین.",
        },
        {
          year: "2008",
          text: "IQD 110 million was allocated for displaced Christian families across several Nineveh communities.",
          textKu:
            "بڕی ١١٠ ملیۆن دیناری عێراقی بۆ خێزانە مەسیحییە ئاوارەکان لە چەند کۆمەڵگایەکی نەینەوا تەرخان کرا.",
          textAr:
            "خُصص 110 ملايين دينار عراقي للأسر المسيحية النازحة في عدد من مجتمعات نينوى.",
        },
        {
          year: "2024",
          text: "Cash assistance reached 722 families in Nineveh, representing 4,902 people.",
          textKu:
            "یارمەتی نەقدی لە نەینەوا گەیشتە ٧٢٢ خێزان، واتە ٤,٩٠٢ کەس.",
          textAr:
            "وصلت المساعدات النقدية في نينوى إلى 722 أسرة، أي ما يمثل 4,902 شخص.",
        },
      ],
    },
    {
      id: "nfi",
      entries: [
        {
          year: "2008",
          text: "Emergency household supplies supported families affected by the Khazna explosion near Bartella.",
          textKu:
            "پێداویستی ماڵی فریاکەوتن پشتگیری ئەو خێزانانەی کرد کە لە تەقینەوەی خەزنە نزیک بەرتەلە زیانیان بەرکەوتبوو.",
          textAr:
            "دعمت المستلزمات المنزلية الطارئة الأسر المتضررة من انفجار الخزنة قرب برطلة.",
        },
        {
          year: "2018",
          text: "NFI activities recorded 125,214 family and 647,115 individual beneficiary entries in Nineveh.",
          textKu:
            "چالاکییەکانی کەلوپەلی ناخۆراکی لە نەینەوا ١٢٥,٢١٤ تۆماری خێزان و ٦٤٧,١١٥ تۆماری کەسی سوودمەندی تۆمار کرد.",
          textAr:
            "سجلت أنشطة المواد غير الغذائية 125,214 مدخلاً أسرياً و647,115 مدخلاً فردياً للمستفيدين في نينوى.",
          note: "Recorded service entries across the year, not a count of individual people.",
          noteKu:
            "ئەمانە تۆماری خزمەتگوزارین بە درێژایی ساڵ، نەک ژمارەی کەسانی جیاواز.",
          noteAr:
            "هذه مدخلات خدمة مسجلة على مدار العام، وليست عدداً للأشخاص الأفراد.",
        },
        {
          year: "2024",
          text: "Household-support records reached 79,928 people in Nineveh and shelter records 14.",
          textKu:
            "تۆمارەکانی پاڵپشتی ماڵ لە نەینەوا گەیشتنە ٧٩,٩٢٨ کەس و تۆمارەکانی سەرپەناش ١٤ کەس.",
          textAr:
            "بلغت سجلات دعم المستلزمات المنزلية 79,928 شخصاً في نينوى، وبلغت سجلات المأوى 14 شخصاً.",
          note: "Two separate records. The report never sums household support and shelter.",
          noteKu:
            "دوو تۆماری جیاوازن. ڕاپۆرتەکە هەرگیز پاڵپشتی ماڵ و سەرپەنا کۆناکاتەوە.",
          noteAr:
            "سجلان منفصلان، والتقرير لا يجمع بين دعم المستلزمات المنزلية والمأوى.",
        },
      ],
    },
  ],

  sinjar: [
    {
      id: "emergency",
      entries: [
        {
          year: "2007",
          text: "BCF's early major relief campaign responded to the Gir Uzer and Siba Sheikh Khidr bombing disaster in the Sinjar area — one of the foundation's first large emergency responses.",
          textKu:
            "یەکێک لە یەکەم هەڵمەتە گەورەکانی فریاکەوتنی دەزگای خێرخوازی بارزانی، وەڵامدانەوە بە کارەساتی تەقینەوەکانی گڕ عوزێر و سیبا شێخ خدر لە ناوچەی شنگال بوو؛ ئەمە یەکێک بوو لە یەکەم وەڵامدانەوە فریاکەوتنە گەورەکانی دامەزراوەکە.",
          textAr:
            "استجابت الحملة الإغاثية الكبرى المبكرة لمؤسسة بارزاني الخيرية (BCF) لكارثة التفجيرات في جير أوذر وسيما شيخ خضر بمنطقة سنجار، والتي تعد واحدة من أولى الاستجابات الطارئة واسعة النطاق للمؤسسة.",
        },
        {
          year: "2014",
          text: "After the ISIS attack and the Yazidi genocide, BCF delivered aid to Mount Sinjar by helicopter.",
          textKu: "دوای هێرشی داعش و جینۆسایدی ئێزیدییەکان، BCF بە هەلیکۆپتەر یارمەتی بۆ چیای شنگال گەیاند.",
          textAr:
            "بعد هجوم داعش والإبادة الجماعية للإيزيديين، قامت مؤسسة بارزاني الخيرية بإيصال المساعدات إلى جبل سنجار عبر طائرات الهليكوبتر.",
          note: "Recounted in BCF's 2025 historical project article.",
          noteKu: "ئەم زانیارییە لە بابەتێکی مێژوویی BCF لە ساڵی ٢٠٢٥ دووبارە باس کراوەتەوە.",
        },
        {
          year: "2015",
          text: "BCF opened an office on Mount Sinjar and supported displaced families with water, food, clothing and shelter; schools were built on the mountain with electricity and water.",
          textKu:
            "دوای هێرشی داعش و جینۆسایدی ئێزیدییەکان، دەزگای خێرخوازی بارزانی بە هەلیکۆپتەر یارمەتی بۆ چیای شنگال گەیاند.",
          textAr:
            "افتتحت مؤسسة بارزاني الخيرية مكتباً على جبل سنجار وقدمت الدعم للعائلات النازحة عبر توفير المياه، والغذاء، والملابس، والمأوى؛ كما بُنيت مدارس على الجبل مزودة بالكهرباء والمياه.",
        },
        {
          year: "2024",
          text: "The Restoration of Life project constructed 20 houses for families in Sinjar.",
          textKu: "پڕۆژەی «گەڕاندنەوەی ژیان» ٢٠ خانووی بۆ خێزانەکان لە شنگال دروست کرد.",
          textAr: "شيد مشروع إعادة الحياة 20 منزلاً للعائلات في سنجار.",
        },
        {
          year: "2025",
          text: "BCF highlighted continued Restoration of Life work and ongoing support for roughly 300 orphans in Sinjar.",
          textKu:
            "دەزگای خێرخوازی بارزانی جەختی لە بەردەوامبوونی پڕۆژەی «گەڕاندنەوەی ژیان» کردەوە، هەروەها پشتگیری نزیکەی ٣٠٠ ئازیزان لە شنگال بەردەوام بوو.",
          textAr:
            "سلطت مؤسسة بارزاني الخيرية الضوء على استمرار أعمال مشروع إعادة الحياة والدعم المستمر لنحو 300 يتيم في سنجار.",
        },
      ],
    },
    {
      id: "food",
      entries: [
        {
          year: "2021",
          text: "Sinjar was included in BCF office and disability-support activity.",
          textKu:
            "شنگال لە بەرنامە و چالاکییەکانی دەزگای خێرخوازی بارزانی بۆ پشتگیری کەسانی خاوەن پێداویستی تایبەتدا بەشدار بوو.",
          textAr: "أُدرجت سنجار ضمن نطاق مكتب مؤسسة بارزاني الخيرية وأنشطة دعم ذوي الهمم.",
        },
        {
          year: "2022",
          text: "A winter convoy delivered flour and fuel to 1,300 displaced families on Mount Sinjar and its surroundings.",
          textKu:
            "لە زستاندا، کاروانێکی یارمەتی ئارد و سووتەمەنی بۆ ١,٣٠٠ خێزانی ئاوارە لە چیای شنگال و دەوروبەری دابەش کرد.",
          textAr:
            "أودعت قافلة شتوية الطحين والوقود لـ 1,300 عائلة نازحة على جبل سنجار والمناطق المحيطة به.",
        },
        {
          year: "2026",
          text: "750 food baskets in Zummar and 500 across Sinjar, with further Ramadan and Eid assistance.",
          textKu:
            "لە زوممار ٧٥٠ سەبەتەی خۆراک و لە ناوچەکانی شنگال ٥٠٠ سەبەتەی خۆراک دابەش کرا؛ هەروەها لە ڕەمەزان و جەژندا یارمەتی خۆراکی و یارمەتییەکانی تر بەردەوام بوون.",
          textAr:
            "توزيع 750 سلة غذائية في زمار و500 سلة في عموم سنجار، إلى جانب تقديم مساعدات إضافية بمناسبة شهر رمضان والعيد.",
        },
      ],
    },
    {
      id: "health",
      entries: [
        {
          year: "2026",
          text: "A Dental Health Unit opened at Zorava Community Health Center for free examination, consultation and treatment.",
          textKu:
            "لە ناوەندی تەندروستی کۆمەڵگەی زۆراڤا، بەشێکی تایبەت بە تەندروستی ددان کرایەوە، کە پشکنین، ڕاوێژکاری و چارەسەری ددان بە خۆڕای پێشکەش دەکات.",
          textAr:
            "افتُتحت وحدة طب الأسنان في مركز زورافا الصحي المجتمعي لتقديم خدمات الفحص والاستشارة والعلاج مجاناً.",
        },
      ],
    },
    {
      id: "education",
      entries: [
        {
          year: "2015",
          text: "Schools were built on Mount Sinjar during the displacement period.",
          textKu: "لە ماوەی ئاوارەبوونی خەڵکی شنگالدا، چەند قوتابخانەیەک لە چیای شنگال دروست کران.",
          textAr: "بُنيت مدارس على جبل سنجار خلال فترة النزوح.",
          note: "From BCF's historical website account.",
          noteKu: "ئەم زانیارییە لە بابەتێکی مێژوویی BCF لە ماڵپەڕەکەی هاتووە.",
        },
        {
          year: "2023",
          text: "Food parcels and sleeping sheets were provided to 80 Grade 12 girls travelling from Sinjar to Duhok and Semel for their final exams.",
          textKu:
            "بۆ ٨٠ کچە قوتابیی پۆلی ١٢ کە لە شنگالەوە بۆ دهۆک و سێمێل دەچوون بۆ بەشداری لە تاقیکردنەوە کۆتاییەکانیان، پاکێتی خۆراک و پێداویستیی خەویان بۆ دابین کرا.",
          textAr:
            "قُدّمت طرود غذائية وأغطية نوم لـ 80 فتاة في الصف الثاني عشر كنّ مسافرات من سنجار إلى دهوك وسيميل لأداء امتحاناتهن النهائية.",
        },
        {
          year: "2024",
          text: "The final 50-school renovation programme included two schools in Sinjar.",
          textKu: "لە بەرنامەی کۆتایی نۆژەنکردنەوەی ٥٠ قوتابخانەدا، ٢ قوتابخانەی شنگال نۆژەن کرانەوە.",
          textAr: "شمل البرنامج النهائي لترميم 50 مدرسة، مدرستين في سنجار.",
        },
      ],
    },
    {
      id: "wash",
      entries: [
        {
          year: "2016",
          text: "Four water wells drilled in the Sinjar Mountain area.",
          textKu: "لە ناوچەی چیای شنگال، ٤ بیری ئاو حەفر کران.",
          textAr: "حفر أربعة آبار مياه في منطقة جبل سنجار.",
        },
      ],
    },
    {
      id: "disability",
      entries: [
        {
          year: "2021",
          text: "63 mobility-aid beneficiaries in Sinjar.",
          textKu: "لە شنگال، ٦٣ کەس یارمەتی جووڵە و گواستنەوەیان وەرگرت.",
          textAr: "استفاد 63 شخصاً من المعينات الحركية في سنجار.",
        },
      ],
    },
    {
      id: "cash",
      entries: [
        {
          year: "2025",
          text: "The Azizan-Kurdistan March stage reached 261 orphans in Sinjar; BCF separately reported ongoing support for about 300 Sinjar orphans.",
          textKu:
            "قۆناغی ئاداری پڕۆژەی ئازیزان-کوردستان لە شنگال گەیشتە ٢٦١ ئازیز؛ هەروەها دەزگای خێرخوازی بارزانی بە جیا ڕایگەیاند کە پشتگیری نزیکەی ٣٠٠ ئازیزانی شنگال بەردەوامە.",
          textAr:
            "وصل مشروع الاعزاء - مسيرة كوردستان إلى 261 يتيماً في سنجار؛ وأبلغت مؤسسة بارزاني الخيرية بشكل منفصل عن تقديم دعم مستمر لنحو 300 يتيم في سنجار.",
        },
        {
          year: "2026",
          text: "The eighth Poland-linked Azizan phase delivered cash, food baskets, school bags, supplies and desks, with separate cash support for low-income families.",
          textKu:
            "لە قۆناغی هەشتەمی پڕۆژەی ئازیزان، کە بە هاوکاری پۆڵەندا جێبەجێ کرا، یارمەتی دارایی، سەبەتەی خۆراک، جانتای قوتابخانە، پێداویستی خوێندن و مێزی قوتابی دابەش کرا؛ هەروەها یارمەتی دارایی جیاواز بۆ خێزانە کەم‌داهاتەکان دابین کرا.",
          textAr:
            "قدمت المرحلة الثامنة من مشروع الاعزاء المرتبط ببولندا مساعدات نقدية، وسلالاً غذائية، وحقائب مدرسية، ومستلزمات ومقاعد دراسية، إلى جانب توفير دعم نقدي منفصل للعائلات ذات الدخل المحدود.",
        },
      ],
    },
  ],

  garmian: [
    {
      id: "food",
      entries: [
        {
          year: "2021",
          text: "BCF food and Qurbani projects covered Garmian and Kalar; Qurbani reached 500 households.",
          textKu:
            "پڕۆژەکانی خۆراک و گۆشتی قوربانی دەزگای خێرخوازی بارزانی لە گەرمیان و کەلار جێبەجێ کران؛ گۆشتی قوربانی بۆ ٥٠٠ خێزان دابەش کرا.",
          textAr:
            "غطت مشاريع الأمن الغذائي والأضاحي التابعة لمؤسسة بارزاني الخيرية منطقتي كرميان وكلار، حيث بلغ عدد المستفيدين من توزيع لحم الأضاحي 500 أسرة.",
        },
        {
          year: "2022",
          text: "2,610 hot meals reported in Garmian.",
          textKu: "لە گەرمیان، ٢,٦١٠ ژەم خواردنی گەرم دابەش کرا.",
          textAr: "تم توثيق وتوزيع 2,610 وجبة ساخنة في كرميان.",
        },
        {
          year: "2023",
          text: "The Qurbani meat project reached 1,188 families in Garmian.",
          textKu: "لە گەرمیان، گۆشتی قوربانی بۆ ١,١٨٨ خێزان دابەش کرا.",
          textAr: "شمل مشروع لحم الأضاحي توزيع المساعدات على 1,188 عائلة في كرميان.",
        },
        {
          year: "2026",
          text: "Food baskets distributed in Kifri, Khanaqin, Rizgari and Darbandikhan, with Qurbani meat distributed in Darbandikhan.",
          textKu:
            "لە کفری، خانەقین، ڕزگاری و دەربەندیخان سەبەتەی خۆراک دابەش کرا؛ هەروەها لە دەربەندیخان گۆشتی قوربانی دابەش کرا.",
          textAr:
            "تواصلت جهود المؤسسة عبر توزيع السلال الغذائية في مناطق كفري، خانقين، رزكاري، ودربنديخان، إلى جانب توزيع لحم الأضاحي في قضاء دربنديخان.",
        },
        {
          year: "2012",
          text: "Garmian joined a seven-area food programme reaching 5,409 families overall.",
          textKu:
            "گەرمیان بەشدار بوو لە بەرنامەیەکی خۆراکی حەوت ناوچەیی کە بە گشتی گەیشتە ٥,٤٠٩ خێزان.",
          textAr:
            "شاركت كرميان في برنامج غذائي شمل سبع مناطق ووصل إجمالاً إلى 5,409 أسر.",
          note: "The 5,409 figure is the programme total across all seven areas, not Garmian's own share.",
          noteKu:
            "ئەم زانیارییە لە بابەتێکی مێژوویی دەزگای خێرخوازی بارزانی لە ساڵی ٢٠٢٥ دووبارە باس کراوەتەوە.",
          noteAr:
            "رقم 5,409 هو إجمالي البرنامج في المناطق السبع كافة، وليس حصة كرميان وحدها.",
        },
        {
          year: "2018",
          text: "Food activities recorded 3,200 families and 16,789 people in Garmian.",
          textKu:
            "چالاکییەکانی خۆراک لە گەرمیان ٣,٢٠٠ خێزان و ١٦,٧٨٩ کەسیان تۆمار کرد.",
          textAr:
            "سجلت الأنشطة الغذائية 3,200 أسرة و16,789 شخصاً في كرميان.",
        },
        {
          year: "2024",
          text: "Food assistance reached 4,235 families in Garmian, representing 20,250 people.",
          textKu:
            "یارمەتی خۆراک لە گەرمیان گەیشتە ٤,٢٣٥ خێزان، واتە ٢٠,٢٥٠ کەس.",
          textAr:
            "وصلت المساعدات الغذائية في كرميان إلى 4,235 أسرة، أي ما يمثل 20,250 شخصاً.",
        },
      ],
    },
    {
      id: "emergency",
      entries: [
        {
          year: "2024",
          text: "The flood-relief project covered Kalar and Rzgari among the affected areas, distributing essential household and winter items.",
          textKu:
            "پڕۆژەی یارمەتی زیانلێکەوتووانی لافاو، کەلار و ڕزگاریشی گرتەوە؛ لەو ناوچانە کەلوپەلی پێویستی ماڵەوە و پێداویستی زستانی بۆ خێزانە زیانلێکەوتووەکان دابەش کرا.",
        },
      ],
    },
    {
      id: "disability",
      entries: [
        {
          year: "2021",
          text: "95 mobility-aid beneficiaries in Garmian.",
          textKu: "لە گەرمیان، ٩٥ کەس یارمەتی جووڵە و گواستنەوەیان وەرگرت.",
          textAr: "تزويد 95 مستفيداً بالمعينات الحركية والتنقل في كرميان.",
        },
        {
          year: "2022",
          text: "176 disability-support beneficiaries.",
          textKu: "١٧٦ کەس کە خاوەن پێداویستی تایبەت بوون، یارمەتی و پشتگیرییان وەرگرت.",
          textAr: "تقديم خدمات الدعم والتمكين لـ 176 مستفيداً من دعم ذوي الهمم.",
        },
        {
          year: "2026",
          text: "Wheelchairs provided in Kalar.",
          textKu: "لە کەلار، کورسی چەرخدار دابەش کرا.",
          textAr: "توفير وتوزيع الكراسي المتحركة في كلار.",
        },
        {
          year: "2023",
          text: "Wheelchairs were distributed in Darbandikhan through the LDS-supported programme.",
          textKu:
            "کورسی چەرخدار لە دەربەندیخان دابەش کران لە ڕێگەی بەرنامەکەی بە پشتگیری LDS.",
          textAr:
            "وُزّعت الكراسي المتحركة في دربنديخان عبر البرنامج المدعوم من مؤسسة LDS الخيرية.",
        },
      ],
    },
    {
      id: "protection",
      entries: [
        {
          year: "2024",
          text: "Garmian was included in protection-sector coverage.",
          textKu: "لە گەرمیان، بەرنامە و خزمەتگوزارییەکانی بواری پاراستن جێبەجێ دەکران.",
          textAr: "شملت تغطية قطاع الحماية في كرميان.",
        },
      ],
    },
    {
      id: "livelihood",
      entries: [
        {
          year: "2023",
          text: "Livelihood activities recorded 80 beneficiaries through the Garmian office.",
          textKu:
            "چالاکییەکانی بژێوی ژیان لە ڕێگەی ئۆفیسی گەرمیانەوە ٨٠ سوودمەندیان تۆمار کرد.",
          textAr: "سجلت أنشطة سبل العيش 80 مستفيداً من خلال مكتب كرميان.",
        },
      ],
    },
    {
      id: "cash",
      entries: [
        {
          year: "2025",
          text: "The Azizan-Kurdistan March stage reached 454 orphans in Garmian.",
          textKu: "لە قۆناغی ئاداری پڕۆژەی ئازیزان-کوردستان، ٤٥٤ ئازیز لە گەرمیان یارمەتییان وەرگرت.",
          textAr:
            "وصلت مرحلة مسيرة أعزاء كوردستان إلى 454 من الأعزاء في إدارة كرميان.",
        },
        {
          year: "2025-26",
          text: "Nujin operates in Garmian and Khanaqin.",
          textKu: "پڕۆژەی نوژین لە گەرمیان و خانەقین جێبەجێ دەکرێت.",
          textAr: "تعمل نوجين في كرميان وخانقين.",
          note: "15 families in 2025 and 12 in 2026 are project-wide totals across all offices, not Garmian counts.",
          noteKu:
            "١٥ خێزان لە ساڵی ٢٠٢٥ و ١٢ خێزان لە ساڵی ٢٠٢٦، کۆی گشتی سوودمەندانی پڕۆژەکە لە هەموو ئۆفیسەکانن و تایبەت بە گەرمیان نین.",
        },
        {
          year: "2026",
          text: "The Garmian office distributed cash support to low-income families.",
          textKu: "ئۆفیسی گەرمیان یارمەتی دارایی بۆ خێزانە کەمداهاتەکان دابەش کرد.",
          textAr: "قام مكتب كرميان بتوزيع الدعم النقدي على العائلات ذات الدخل المحدود.",
        },
        {
          year: "2023",
          text: "Cash assistance recorded 3,136 beneficiaries through the Garmian office.",
          textKu:
            "یارمەتی نەقدی لە ڕێگەی ئۆفیسی گەرمیانەوە ٣,١٣٦ سوودمەندی تۆمار کرد.",
          textAr:
            "سجلت المساعدات النقدية 3,136 مستفيداً عبر مكتب كرميان.",
        },
        {
          year: "2024",
          text: "Cash assistance reached 1,032 families in Garmian, representing 6,376 people.",
          textKu:
            "یارمەتی نەقدی لە گەرمیان گەیشتە ١,٠٣٢ خێزان، واتە ٦,٣٧٦ کەس.",
          textAr:
            "وصلت المساعدات النقدية في كرميان إلى 1,032 أسرة، أي ما يمثل 6,376 شخصاً.",
        },
      ],
    },
    {
      id: "health",
      entries: [
        {
          year: "2009",
          text: "Garmian joined a three-area health programme serving 4,925 people overall.",
          textKu:
            "گەرمیان بەشدار بوو لە بەرنامەیەکی تەندروستی سێ ناوچەیی کە بە گشتی خزمەتی ٤,٩٢٥ کەسی کرد.",
          textAr:
            "شاركت كرميان في برنامج صحي شمل ثلاث مناطق وخدم إجمالاً 4,925 شخصاً.",
          note: "The 4,925 figure is the programme total across all three areas, not Garmian's own share.",
          noteKu:
            "ژمارەی ٤,٩٢٥ کۆی بەرنامەکەیە بۆ هەر سێ ناوچەکە، نەک بەشی گەرمیان بە تەنها.",
          noteAr:
            "رقم 4,925 هو إجمالي البرنامج في المناطق الثلاث، وليس حصة كرميان وحدها.",
        },
        {
          year: "2024",
          text: "Health activities recorded 7,000 beneficiaries in Garmian.",
          textKu:
            "چالاکییەکانی تەندروستی لە گەرمیان ٧,٠٠٠ سوودمەندیان تۆمار کرد.",
          textAr:
            "سجلت الأنشطة الصحية 7,000 مستفيد في كرميان.",
        },
      ],
    },
    {
      id: "education",
      entries: [
        {
          year: "2010",
          text: "Garmian schools joined a regional programme distributing 10,000 school bags and stationery sets.",
          textKu:
            "قوتابخانەکانی گەرمیان بەشدار بوون لە بەرنامەیەکی هەرێمی کە ١٠,٠٠٠ جانتای قوتابخانە و ستی قەرتاسیەی دابەش کرد.",
          textAr:
            "شاركت مدارس كرميان في برنامج إقليمي وُزّعت خلاله 10,000 حقيبة مدرسية وطقم قرطاسية.",
        },
        {
          year: "2018",
          text: "Education activities recorded 237 beneficiaries in Garmian.",
          textKu:
            "چالاکییەکانی پەروەردە لە گەرمیان ٢٣٧ سوودمەندیان تۆمار کرد.",
          textAr:
            "سجلت الأنشطة التعليمية 237 مستفيداً في كرميان.",
        },
      ],
    },
    {
      id: "nfi",
      entries: [
        {
          year: "2018",
          text: "NFI activities recorded 2,928 families and 12,033 people in Garmian.",
          textKu:
            "چالاکییەکانی کەلوپەلی ناخۆراکی لە گەرمیان ٢,٩٢٨ خێزان و ١٢,٠٣٣ کەسیان تۆمار کرد.",
          textAr:
            "سجلت أنشطة المواد غير الغذائية 2,928 أسرة و12,033 شخصاً في كرميان.",
        },
        {
          year: "2023",
          text: "A caravan was supplied to the Garmian branch of a kidney-support organisation.",
          textKu:
            "کاروانێک بۆ لقی گەرمیانی ڕێکخراوێکی پشتگیری نەخۆشانی گورچیلە دابین کرا.",
          textAr:
            "جرى تجهيز كرفان لفرع كرميان في منظمة لدعم مرضى الكلى.",
        },
        {
          year: "2024",
          text: "NFI assistance reached 300 families in Garmian, representing 1,514 people.",
          textKu:
            "یارمەتی کەلوپەلی ناخۆراکی لە گەرمیان گەیشتە ٣٠٠ خێزان، واتە ١,٥١٤ کەس.",
          textAr:
            "وصلت مساعدات المواد غير الغذائية في كرميان إلى 300 أسرة، أي ما يمثل 1,514 شخصاً.",
        },
      ],
    },
    {
      id: "wash",
      entries: [
        {
          year: "2018",
          text: "WASH activities recorded 755 family and 4,385 individual beneficiary entries in Garmian.",
          textKu:
            "چالاکییەکانی ئاو و خاوێنکاری لە گەرمیان ٧٥٥ تۆماری خێزان و ٤,٣٨٥ تۆماری کەسی سوودمەندی تۆمار کرد.",
          textAr:
            "سجلت أنشطة المياه والإصحاح 755 مدخلاً أسرياً و4,385 مدخلاً فردياً للمستفيدين في كرميان.",
          note: "No newer verified city split is supplied; this stays the latest verified figure.",
          noteKu:
            "هیچ دابەشکردنێکی نوێتری پشتڕاستکراوەی شارەکە پێشکەش نەکراوە؛ ئەمە دوایین ژمارەی پشتڕاستکراوەیە.",
          noteAr:
            "لم يُقدَّم تفصيل موثّق أحدث على مستوى المدينة، فيبقى هذا الرقم آخر رقم موثّق.",
        },
      ],
    },
  ],

  halabja: [
    {
      id: "food",
      entries: [
        {
          year: "2021",
          text: "Food projects included Halabja; Qurbani meat reached 500 households.",
          textKu: "پڕۆژەکانی خۆراک هەڵەبجەشیان گرتەوە؛ گۆشتی قوربانی بۆ ٥٠٠ خێزان دابەش کرا.",
          textAr: "شملت مشاريع الغذاء مدينة حلبجة؛ حيث وصل لحم الأضاحي (قرباني) إلى 500 أسرة.",
        },
        {
          year: "2022",
          text: "Food-sector distributions continued; 1,055 food-project beneficiaries were listed in the annual location table.",
          textKu:
            "دابەشکردنی یارمەتی خۆراکی بەردەوام بوو؛ لە خشتەی ناوچەکانی ڕاپۆرتی ساڵانەدا ١,٠٥٥ سوودمەندی پڕۆژەکانی خۆراک لە هەڵەبجە تۆمار کران.",
          textAr:
            "استمرت توزيعات القطاع الغذائي؛ وتم إدراج 1,055 مستفيداً من مشروع الغذاء في جدول المواقع السنوي.",
        },
        {
          year: "2023",
          text: "Qurbani meat reached 400 families.",
          textKu: "گۆشتی قوربانی بۆ ٤٠٠ خێزان دابەش کرا.",
          textAr: "وصل لحم الأضاحي إلى 400 عائلة.",
        },
        {
          year: "2024",
          text: "The Ramadan overview recorded 500 food parcels in Halabja.",
          textKu: "لە پوختەی بەرنامەکانی ڕەمەزاندا، ٥٠٠ پاکێتی خۆراکی لە هەڵەبجە تۆمار کرا.",
          textAr: "سُجِّلت 500 سلة غذائية ضمن نظرة عامة لشهر رمضان في حلبجة.",
          note: "Annual report and website Ramadan overviews cover different project scopes.",
          noteKu:
            "ڕاپۆرتی ساڵانە و پوختەی ڕەمەزان لە ماڵپەڕەکە، هەر یەکەیان پڕۆژە و چالاکییە جیاوازەکان لەخۆدەگرن.",
        },
        {
          year: "2026",
          text: "Qurbani meat distributed to 235 families, with food and orphan-family assistance also continuing.",
          textKu:
            "گۆشتی قوربانی بۆ ٢٣٥ خێزان دابەش کرا؛ هەروەها یارمەتی خۆراک و پشتگیری خێزانەکانی ئازیزان بەردەوام بوو.",
          textAr:
            "وُزِّع لحم الأضاحي على 235 عائلة، مع استمرار مساعدات الغذاء وعوائل الأيتام.",
        },
        {
          year: "2012",
          text: "Halabja joined a seven-area food programme reaching 5,409 families overall.",
          textKu:
            "هەڵەبجە بەشدار بوو لە بەرنامەیەکی خۆراکی حەوت ناوچەیی کە بە گشتی گەیشتە ٥,٤٠٩ خێزان.",
          textAr:
            "شاركت حلبجة في برنامج غذائي شمل سبع مناطق ووصل إجمالاً إلى 5,409 أسر.",
          note: "The 5,409 figure is the programme total across all seven areas, not Halabja's own share.",
          noteKu:
            "ژمارەی ٥,٤٠٩ کۆی بەرنامەکەیە بۆ هەر حەوت ناوچەکە، نەک بەشی هەڵەبجە بە تەنها.",
          noteAr:
            "رقم 5,409 هو إجمالي البرنامج في المناطق السبع كافة، وليس حصة حلبجة وحدها.",
        },
        {
          year: "2018",
          text: "Food activities recorded 3,100 families and 15,994 people in Halabja.",
          textKu:
            "چالاکییەکانی خۆراک لە هەڵەبجە ٣,١٠٠ خێزان و ١٥,٩٩٤ کەسیان تۆمار کرد.",
          textAr:
            "سجلت الأنشطة الغذائية 3,100 أسرة و15,994 شخصاً في حلبجة.",
        },
        {
          year: "2024",
          text: "Food assistance reached 1,310 families in Halabja, representing 6,550 people.",
          textKu:
            "یارمەتی خۆراک لە هەڵەبجە گەیشتە ١,٣١٠ خێزان، واتە ٦,٥٥٠ کەس.",
          textAr:
            "وصلت المساعدات الغذائية في حلبجة إلى 1,310 أسر، أي ما يمثل 6,550 شخصاً.",
          note: "The annual sector record. The Ramadan parcel count is a separate record and the report does not combine the two.",
          noteKu:
            "ئەمە تۆماری ساڵانەی کەرتەکەیە. ژمارەی پاکێتەکانی ڕەمەزان تۆمارێکی جیاوازە و ڕاپۆرتەکە ئەم دووانە تێکەڵ ناکات.",
          noteAr:
            "هذا هو السجل السنوي للقطاع، أما عدد طرود رمضان فهو سجل منفصل، والتقرير لا يجمع بينهما.",
        },
      ],
    },
    {
      id: "health",
      entries: [
        {
          year: "2020",
          text: "The Halabja Health Directorate received COVID-19 tests, masks and medical equipment through the regional response.",
          textKu:
            "بەڕێوەبەرایەتی تەندروستی هەڵەبجە لە ڕێگەی وەڵامدانەوەی هەرێمییەوە تاقیکردنەوەی کۆڤید-١٩، ماسک و ئامێری پزیشکی وەرگرت.",
          textAr:
            "تسلمت مديرية صحة حلبجة فحوصات كوفيد-19 والكمامات والمعدات الطبية ضمن الاستجابة الإقليمية.",
          note: "A system-support record. The report gives no city beneficiary total for it.",
          noteKu:
            "ئەمە تۆماری پاڵپشتی سیستەمە. ڕاپۆرتەکە هیچ کۆیەکی سوودمەندی شارەکەی بۆ نادات.",
          noteAr: "سجل لدعم المنظومة الصحية، ولا يعطي التقرير إجمالاً للمستفيدين في المدينة.",
        },
      ],
    },
    {
      id: "education",
      entries: [
        {
          year: "2022",
          text: "Eleven of the 203 schools in the renovation programme were in Halabja.",
          textKu: "لە بەرنامەی نۆژەنکردنەوەی ٢٠٣ قوتابخانەدا، ١١ قوتابخانە لە هەڵەبجە بوون.",
          textAr:
            "أحد عشر مدرسة من أصل 203 مدرسة في برنامج إعادة التأهيل كانت في حلبجة.",
        },
        {
          year: "2023",
          text: "Halabja Kindergarten opened under the Education and Development sector.",
          textKu: "باخچەی منداڵانی هەڵەبجە لە چوارچێوەی بواری پەروەردە و گەشەپێداندا کرایەوە.",
          textAr: "تم افتتاح روضة أطفال حلبجة ضمن قطاع التعليم والتطوير.",
        },
        {
          year: "2008",
          text: "A regional school campaign included 41 schools in Halabja's villages.",
          textKu:
            "کەمپەینێکی هەرێمی قوتابخانە ٤١ قوتابخانەی گوندەکانی هەڵەبجەی لەخۆ گرت.",
          textAr:
            "شملت حملة مدرسية إقليمية 41 مدرسة في قرى حلبجة.",
        },
        {
          year: "2018",
          text: "Education activities recorded 2,271 beneficiaries in Halabja.",
          textKu:
            "چالاکییەکانی پەروەردە لە هەڵەبجە ٢,٢٧١ سوودمەندیان تۆمار کرد.",
          textAr:
            "سجلت الأنشطة التعليمية 2,271 مستفيداً في حلبجة.",
        },
      ],
    },
    {
      id: "nfi",
      entries: [
        {
          year: "2023",
          text: "NFI activity recorded through the Halabja office.",
          textKu: "لە ڕێگەی ئۆفیسی هەڵەبجە، یارمەتییە ناخۆراکییەکان دابەش کران.",
          textAr: "تم تسجيل أنشطة المواد غير الغذائية عبر مكتب حلبجة.",
        },
        {
          year: "2024",
          text: "Halabja was included in the flood-relief NFI response.",
          textKu: "لە هەڵەبجەش، یارمەتییە ناخۆراکییەکان بۆ خێزانە زیانلێکەوتووەکانی لافاو دابەش کران.",
          textAr: "تم إدراج حلبجة ضمن استجابة الإغاثة من الفيضانات وتوفير المواد غير الغذائية.",
        },
        {
          year: "2018",
          text: "NFI activities recorded four families and 23 people in Halabja.",
          textKu:
            "چالاکییەکانی کەلوپەلی ناخۆراکی لە هەڵەبجە چوار خێزان و ٢٣ کەسیان تۆمار کرد.",
          textAr:
            "سجلت أنشطة المواد غير الغذائية أربع أسر و23 شخصاً في حلبجة.",
        },
        {
          year: "2024",
          text: "NFI assistance reached 42 families in Halabja, representing 168 people.",
          textKu:
            "یارمەتی کەلوپەلی ناخۆراکی لە هەڵەبجە گەیشتە ٤٢ خێزان، واتە ١٦٨ کەس.",
          textAr:
            "وصلت مساعدات المواد غير الغذائية في حلبجة إلى 42 أسرة، أي ما يمثل 168 شخصاً.",
        },
      ],
    },
    {
      id: "disability",
      entries: [
        {
          year: "2021",
          text: "Two mobility-aid beneficiaries.",
          textKu: "٢ کەس یارمەتی جووڵە و گواستنەوەیان وەرگرت.",
          textAr: "تقديم مساعدات حركية لمستفيدين اثنين.",
        },
        {
          year: "2022",
          text: "Ten disability-support beneficiaries.",
          textKu: "١٠ کەس کە خاوەن پێداویستی تایبەت بوون، یارمەتی و پشتگیرییان وەرگرت.",
          textAr: "تقديم خدمات الدعم لـ 10 أشخاص من ذوي الإعاقة.",
        },
      ],
    },
    {
      id: "cash",
      entries: [
        {
          year: "2021",
          text: "Halabja students were included in the top Grade 12 orphan recognition programme.",
          textKu: "قوتابییە ئازیزە سەرکەوتووەکانی پۆلی ١٢ لە هەڵەبجە، لە بەرنامەی ڕێزلێناندا بەشدار بوون.",
          textAr:
            "أُدرج طلبة مدينة حلبجة ضمن برنامج تكريم الطلبة المتفوقين من الأعزاء للصف الثاني عشر.",
        },
        {
          year: "2025",
          text: "The Azizan-Kurdistan March stage reached 55 orphans in Halabja.",
          textKu: "لە قۆناغی ئاداری پڕۆژەی ئازیزان-کوردستان، ٥٥ ئازیز لە هەڵەبجە سوودمەند بوون.",
          textAr: "استفاد 55 من الأعزاء في حلبجة من محطة مسيرة أعزاء كوردستان.",
        },
        {
          year: "2026",
          text: "Forty low-income families received US$200 each, and orphan families also received food and financial support.",
          textKu:
            "٤٠ خێزانی کەمداهات هەر یەک ٢٠٠ دۆلاریان وەرگرت؛ هەروەها بۆ خێزانەکانی ئازیزان یارمەتی خۆراک و پارە دابین کرا.",
          textAr:
            "تم تقديم منح مالية بقيمة 200 دولار أمريكي لكل عائلة لـ 40 أسرة من ذوي الدخل المحدود، فضلاً عن استمرار تقديم المساعدات الغذائية والدعم المالي لعائلات الأعزاء.",
        },
        {
          year: "2018",
          text: "Two orphan-care programmes recorded separate beneficiary groups in Halabja.",
          textKu:
            "دوو بەرنامەی چاودێری هەتیوان لە هەڵەبجە دوو گرووپی جیاوازی سوودمەندیان تۆمار کرد.",
          textAr:
            "سجل برنامجان لرعاية الأيتام مجموعتين منفصلتين من المستفيدين في حلبجة.",
          note: "Each programme keeps its own count; the report does not combine them.",
          noteKu:
            "هەر بەرنامەیەک ژمارەی خۆی هەیە؛ ڕاپۆرتەکە کۆیان ناکاتەوە.",
          noteAr:
            "لكل برنامج عدده الخاص، والتقرير لا يجمع بينهما.",
        },
        {
          year: "2024",
          text: "Cash assistance reached 317 families in Halabja, representing 1,568 people.",
          textKu:
            "یارمەتی نەقدی لە هەڵەبجە گەیشتە ٣١٧ خێزان، واتە ١,٥٦٨ کەس.",
          textAr:
            "وصلت المساعدات النقدية في حلبجة إلى 317 أسرة، أي ما يمثل 1,568 شخصاً.",
        },
      ],
    },
    {
      id: "wash",
      entries: [
        {
          year: "2018",
          text: "WASH activities recorded 1,300 family and 8,015 individual beneficiary entries in Halabja.",
          textKu:
            "چالاکییەکانی ئاو و خاوێنکاری لە هەڵەبجە ١,٣٠٠ تۆماری خێزان و ٨,٠١٥ تۆماری کەسی سوودمەندی تۆمار کرد.",
          textAr:
            "سجلت أنشطة المياه والإصحاح 1,300 مدخل أسري و8,015 مدخلاً فردياً للمستفيدين في حلبجة.",
          note: "No newer verified city split is supplied; this stays the latest verified figure.",
          noteKu:
            "هیچ دابەشکردنێکی نوێتری پشتڕاستکراوەی شارەکە پێشکەش نەکراوە؛ ئەمە دوایین ژمارەی پشتڕاستکراوەیە.",
          noteAr:
            "لم يُقدَّم تفصيل موثّق أحدث على مستوى المدينة، فيبقى هذا الرقم آخر رقم موثّق.",
        },
      ],
    },
  ],

  raparin: [
    {
      id: "food",
      entries: [
        {
          year: "2007",
          text: "Food parcels reached 1,200 poor and low-income families in Pishdar and Bitwin.",
          textKu:
            "پاکێتی خۆراک گەیشتە ١,٢٠٠ خێزانی هەژار و کەمداهات لە پشدەر و بێتوێن.",
          textAr:
            "وصلت الطرود الغذائية إلى 1,200 أسرة فقيرة ومحدودة الدخل في بشدر وبيتوين.",
          note: "No recent city-only food total is supplied for Raparin.",
          noteKu:
            "هیچ کۆیەکی نوێی خۆراک تەنها بۆ ڕاپەڕین پێشکەش نەکراوە.",
          noteAr:
            "لم يُقدَّم إجمالي غذائي حديث خاص برابرين وحدها.",
        },
      ],
    },
    {
      id: "education",
      entries: [
        {
          year: "2010",
          text: "Raparin joined the regional school-supply and education-course programme.",
          textKu:
            "ڕاپەڕین بەشدار بوو لە بەرنامەی هەرێمیی پێداویستی خوێندن و خولە پەروەردەییەکان.",
          textAr:
            "شاركت رابرين في البرنامج الإقليمي للقرطاسية المدرسية والدورات التعليمية.",
          note: "Narrative evidence only; the reports record no city-only beneficiary split.",
          noteKu:
            "تەنها بەڵگەی چیرۆکییە؛ ڕاپۆرتەکان هیچ دابەشکردنێکی سوودمەندی تەنها بۆ شارەکە تۆمار ناکەن.",
          noteAr:
            "أدلة سردية فقط، ولا تسجل التقارير تفصيلاً للمستفيدين على مستوى المدينة وحدها.",
        },
      ],
    },
    {
      id: "wash",
      entries: [
        {
          year: "2018",
          text: "WASH activities recorded 400 family and 3,597 individual beneficiary entries in Raparin.",
          textKu:
            "چالاکییەکانی ئاو و خاوێنکاری لە ڕاپەڕین ٤٠٠ تۆماری خێزان و ٣,٥٩٧ تۆماری کەسی سوودمەندی تۆمار کرد.",
          textAr:
            "سجلت أنشطة المياه والإصحاح 400 مدخل أسري و3,597 مدخلاً فردياً للمستفيدين في رابرين.",
          note: "No newer verified Raparin WASH split appears in the supplied reports.",
          noteKu:
            "لە ڕاپۆرتە پێشکەشکراوەکاندا هیچ دابەشکردنێکی نوێتری ئاو و خاوێنکاری بۆ ڕاپەڕین نییە.",
          noteAr:
            "لا يرد في التقارير المتاحة تفصيل أحدث لأنشطة المياه والإصحاح في رابرين.",
        },
      ],
    },
    {
      id: "cash",
      entries: [
        {
          year: "2018",
          text: "The UAE-supported orphan project recorded 99 children in Raparin.",
          textKu:
            "پڕۆژەی هەتیوان بە پشتگیری ئیمارات ٩٩ منداڵی لە ڕاپەڕین تۆمار کرد.",
          textAr:
            "سجل مشروع الأيتام المدعوم إماراتياً 99 طفلاً في رابرين.",
        },
        {
          year: "2018",
          text: "The Kurdistan-supported orphan project separately recorded 674 children in Raparin.",
          textKu:
            "پڕۆژەی هەتیوانی پشتگیریکراو لە کوردستان بە جیا ٦٧٤ منداڵی لە ڕاپەڕین تۆمار کرد.",
          textAr:
            "وسجل مشروع الأيتام المدعوم من كوردستان بشكل منفصل 674 طفلاً في رابرين.",
          note: "Both figures stay labelled by programme; they are never added together.",
          noteKu:
            "هەردوو ژمارە بە ناوی بەرنامەکەی خۆیانەوە دەمێننەوە؛ هەرگیز کۆ ناکرێنەوە.",
          noteAr:
            "يبقى كل رقم منسوباً إلى برنامجه، ولا يُجمع الرقمان أبداً.",
        },
      ],
    },
  ],

  soran: [
    {
      id: "food",
      entries: [
        {
          year: "2021",
          text: "The Korek food project reached 300 households in Soran.",
          textKu: "لە سۆران، پڕۆژەی خۆراکی کۆرەک یارمەتی خۆراکی بۆ ٣٠٠ خێزان دابین کرد.",
          textAr: "وصل مشروع كورك الغذائي إلى 300 أسرة في سوران.",
        },
      ],
    },
    {
      id: "education",
      entries: [
        {
          year: "2024",
          text: "The final 50-school renovation programme included five schools in Soran.",
          textKu: "لە کۆی ٥٠ قوتابخانەی ئەو بەرنامەیەی نۆژەن کرانەوە، ٥ قوتابخانە لە سۆران بوون.",
          textAr: "شمل البرنامج النهائي لترميم 50 مدرسة، خمس مدارس في سوران.",
        },
      ],
    },
    {
      id: "shelter",
      entries: [
        {
          year: "2024",
          text: "Soran was included in the shared Erbil/Soran martyrs' housing distribution project.",
          textKu: "سۆران لە پڕۆژەی هاوبەشی دابەشکردنی خانووی شەهیدان بۆ هەولێر و سۆران بەشدار بوو.",
          textAr: "شملت سوران مشروع توزيع مساكن الشهداء المشترك بين أربيل وسوران.",
          note: "540 units project-wide; the exact city split is not published in the reviewed source.",
          noteKu:
            "لە کۆی گشتیی پڕۆژەکەدا ٥٤٠ یەکەی نیشتەجێبوون هەبوو، بەڵام لە سەرچاوەی پێداچوونەوەکراودا دیاری نەکراوە کە چەند یەکە بۆ هەولێر و چەند یەکە بۆ سۆران بوو.",
        },
      ],
    },
    {
      id: "nfi",
      entries: [
        {
          year: "2024",
          text: "The Warm Winter heater programme included schools in Soran.",
          textKu: "پڕۆژەی «گەرمی زستانە» بۆ دابینکردنی سۆپا، قوتابخانەکانی سۆرانیشی گرتەوە.",
          textAr: "شمل برنامج الشتاء الدافئ لتوفير أجهزة التدفئة مدارس في سوران.",
        },
      ],
    },
    {
      id: "disability",
      entries: [
        {
          year: "2021",
          text: "62 mobility-aid beneficiaries in Soran.",
          textKu: "لە سۆران، ٦٢ کەس سوودمەندی یارمەتییەکانی جووڵە و گواستنەوە بوون.",
          textAr: "استفاد 62 شخصًا من المعينات الحركية في سوران.",
        },
        {
          year: "2021",
          text: "Mobility-aid beneficiaries in the surrounding administration: Rawanduz 16 and Sidakan 32.",
          textKu:
            "لە ناوچەکانی دەوروبەری ئیدارەی سۆرانیش، لە ڕەواندز ١٦ کەس و لە سیدەکان ٣٢ کەس یارمەتی جووڵە و گواستنەوەیان وەرگرت.",
          textAr:
            "بلغ عدد المستفيدين من المعينات الحركية في الإدارات المحيطة: 16 في رواندز و32 في سيدكان.",
        },
        {
          year: "2026",
          text: "World Autism Awareness activities at the Mother Community Center involved 52 children.",
          textKu:
            "لە چالاکییەکانی ڕۆژی جیهانی هۆشیارکردنەوە دەربارەی ئۆتیزم، کە لە ناوەندی کۆمەڵایەتی دایک بەڕێوەچوو، ٥٢ منداڵ بەشدار بوون.",
          textAr:
            "شارك 52 طفلًا في أنشطة اليوم العالمي للتوعية بالتوحّد في مركز مجتمع الأم.",
        },
      ],
    },
    {
      id: "cash",
      entries: [
        {
          year: "2025-26",
          text: "Nujin operates in Soran.",
          textKu: "پڕۆژەی نوژین لە سۆران جێبەجێ دەکرێت.",
          textAr: "يعمل مشروع نوجين في سوران.",
          note: "15 families in 2025 and 12 in 2026 are project-wide totals across all offices, not Soran counts.",
          noteKu:
            "ژمارەی ١٥ خێزان لە ساڵی ٢٠٢٥ و ١٢ خێزان لە ساڵی ٢٠٢٦، کۆی گشتی سوودمەندانی پڕۆژەکە لە هەموو ئۆفیسەکانە، نەک تەنها لە سۆران.",
        },
      ],
    },
  ],

  zakho: [
    {
      id: "food",
      entries: [
        {
          year: "2026",
          text: "Food assistance distributed to low-income families in Zakho.",
          textKu: "هاوکاری خۆراک بەسەر خێزانە کەمداهاتەکانی زاخۆ دابەشکرا.",
          textAr: "توزيع مساعدات غذائية على العائلات ذات الدخل المحدود في زاخو.",
        },
      ],
    },
    {
      id: "education",
      entries: [
        {
          year: "2024",
          text: "The final 50-school renovation programme included four schools in Zakho.",
          textKu: "لە بەرنامەی کۆتایی نۆژەنکردنەوەی ٥٠ قوتابخانە، ٤ قوتابخانە لە زاخۆ بوون.",
          textAr: "شمل البرنامج النهائي لترميم 50 مدرسة أربع مدارس في زاخو.",
        },
        {
          year: "2026",
          text: "A five-month literacy and education project launched for 50 refugee children, including school supplies and clothing.",
          textKu:
            "پڕۆژەیەکی پێنج مانگی خوێندەواری و پەروەردە بۆ 50 منداڵی پەنابەر دەستیپێکرد، کە پێداویستییەکانی قوتابخانە و جل‌ وبەرگیشی بۆیان دابین دەکرد.",
          textAr:
            "إطلاق مشروع لمحو الأمية والتعليم لمدة خمسة أشهر لـ 50 طفلاً من اللاجئين، تضمن توفير المستلزمات المدرسية والملابس.",
        },
      ],
    },
    {
      id: "emergency",
      entries: [
        {
          year: "2026",
          text: "The Rizgari flood response supported 60 affected families with food and non-food items.",
          textKu:
            "لە پڕۆژەی یارمەتیدانی زیانلێکەوتووانی لافاو لە ڕزگاری، خۆراک و کەلوپەلی ناخۆراکی بۆ ٦٠ خێزانی زیانلێکەوتوو دابەش کرا.",
          textAr:
            "شملت استجابة فيضان رزگاري تقديم مواد الأمن الغذائي والمستلزمات غير الغذائية لدعم 60 عائلة متضررة.",
        },
      ],
    },
    {
      id: "nfi",
      entries: [
        {
          year: "2024",
          text: "The Warm Winter heater project included Zakho, and the flood-relief NFI project also covered the area.",
          textKu:
            "پڕۆژەی گەرمکەرەوەی گەرمی زستانە، کە سۆپای دابەش دەکرد زاخۆشی گرتەوە، هەروەها لە زاخۆ یارمەتی کەلوپەلی ناخۆراکی بۆ خێزانە زیانلێکەوتووەکانی لافاو دابەش کرا.",
          textAr:
            "شمل مشروع الشتاء الدافئ للمدافئ مدينة زاخو، كما غطى مشروع المواد غير الغذائية للإغاثة من الفيضانات المنطقة أيضاً.",
        },
      ],
    },
    {
      id: "disability",
      entries: [
        {
          year: "2021",
          text: "58 mobility-aid beneficiaries in Zakho.",
          textKu: "لە زاخۆ ٥٨ کەس سوودمەندی یارمەتییەکانی جووڵە و گواستنەوە بوون.",
          textAr: "استفاد 58 شخصاً من المعينات الحركية في زاخو.",
        },
        {
          year: "2026",
          text: "Wheelchairs distributed through the Zakho representative office in April.",
          textKu: "لە مانگی نیسان، کورسی چەرخدار لە ڕێگەی ئۆفیسی نوێنەرایەتیی زاخۆ دابەش کران.",
          textAr: "توزيع كراسي متحركة عبر مكتب ممثلية زاخو في شهر أبريل (نيسان).",
        },
      ],
    },
    {
      id: "cash",
      entries: [
        {
          year: "2025-26",
          text: "Nujin operates in Zakho.",
          textKu: "پڕۆژەی نوژین لە زاخۆ جێبەجێ دەکرێت.",
          textAr: "يمتد نطاق عمل مشروع نوجين ليشمل مدينة زاخو.",
          note: "15 families in 2025 and 12 in 2026 are project-wide totals across all offices, not Zakho counts.",
          noteKu:
            "لە ساڵی ٢٠٢٥دا ١٥ خێزان و لە ساڵی ٢٠٢٦دا ١٢ خێزان سوودمەند بوون، بەڵام ئەم ژمارانە کۆی هەموو ئۆفیسەکانی پڕۆژەکەن و تایبەت بە زاخۆ نین.",
        },
      ],
    },
    {
      id: "community",
      entries: [
        {
          year: "2025",
          text: "A carpet project was announced for 62 mosques across Duhok Province and the Zakho administration.",
          textKu: "پڕۆژەیەکی فەرش بۆ ٦٢ مزگەوت لە پارێزگای دهۆک و ئیدارەی زاخۆ ڕاگەیەنرا.",
          textAr:
            "الإعلان عن مشروع فرش السجاد لـ 62 مسجداً في عموم محافظة دهوك وإدارة زاخو المستقلة.",
        },
      ],
    },
  ],

  akre: [
    {
      id: "food",
      entries: [
        {
          year: "2021",
          text: "Akre Camp received food parcels for 243 refugee households through German Caritas; Duhok and Akre also shared Korek food support.",
          textKu:
            "کەمپی ئاکرێ لە ڕێگەی Caritasی ئەڵمانیا پاکێتی خۆراکی بۆ ٢٤٣ خێزانی پەنابەر دابەش کرد؛ هەروەها لە دهۆک و ئاکرێ یارمەتی خۆراکی پڕۆژەی کۆڕەک دابەش کرا.",
          textAr:
            "تلقى مخيم عقرة طروداً غذائية لصالح 243 أسرة لاجئة بدعم من كاريتاس الألمانية (Caritas Germany)، كما شمل دعم کورک الغذائي كلاً من دهوك وعقرة.",
        },
        {
          year: "2026",
          text: "300 Ramadan food baskets, and 250 families received Qurbani meat.",
          textKu: "لە ڕەمەزاندا ٣٠٠ سەبەتەی خۆراک دابەش کرا، هەروەها ٢٥٠ خێزان گۆشتی قوربانییان وەرگرت.",
          textAr: "وُزعت 300 سلة غذائية رمضانية، واستفادت 250 أسرة من لحوم الأضاحي.",
        },
      ],
    },
    {
      id: "health",
      entries: [
        {
          year: "Historic",
          text: "The cumulative report records the renovation of the maternity hospital in Akre.",
          textKu: "لە ڕاپۆرتی کۆکراوەدا نۆژەنکردنەوەی نەخۆشخانەی منداڵبوون لە ئاکرێ تۆمار کراوە.",
          textAr: "يُسجّل التقرير التراكمي أعمال ترميم مستشفى الولادة في عقرة.",
          note: "No year is specified in the cumulative summary.",
          noteKu: "لە پوختەی ڕاپۆرتە کۆکراوەکەدا ساڵی جێبەجێکردنی ئەم پڕۆژەیە دیاری نەکراوە.",
        },
      ],
    },
    {
      id: "environment",
      entries: [
        {
          year: "2021",
          text: "The Akre Greening Project planted 10,000 oak saplings.",
          textKu: "لە پڕۆژەی سەوزکردنەوەی ئاکرێدا، ١٠,٠٠٠ نەمامی داربەڕوو چێنرا.",
          textAr: "زرع مشروع تشجير عقرة 10,000 شتلة من أشجار البلوط.",
        },
      ],
    },
    {
      id: "cash",
      entries: [
        {
          year: "2026",
          text: "82 families and patients received cash assistance across several aid categories.",
          textKu:
            "یارمەتی دارایی بۆ ٨٢ خێزان و نەخۆش، لە چوارچێوەی چەند بەرنامەی جیاوازی یارمەتیدا دابین کران.",
          textAr: "استفادت 82 أسرة ومريضاً من المساعدات النقدية ضمن فئات مختلفة من الدعم.",
        },
      ],
    },
  ],

  amedi: [
    {
      id: "food",
      entries: [
        {
          year: "2026",
          text: "275 food baskets distributed across Sheladize, Deraluk, Amedi, Qadish and Sarsang to environmental workers and low-income families; separate food aid also reached Shiladze and Siriye.",
          textKu:
            "٢٧٥ سەبەتەی خۆراک لە شێلادزێ، دێرەلووک، ئامێدی، قادش و سەرسەنگ بۆ کرێکارانی ژینگە و خێزانە کەم‌ داهاتەکان دابەش کرا؛ هەروەها یارمەتیی خۆراکی جیاواز بۆ شێلادزێ و سیریێش گەیەنرا.",
          textAr:
            "وُزّعت 275 سلة غذائية في كل من شيلادزي، ديرلوك، العمادية، قاديش، وسرسنك على عمال البيئة والعائلات ذات الدخل المحدود؛ كما وصلت مساعدات غذائية منفصلة إلى شيلادزي وسيريا.",
        },
      ],
    },
    {
      id: "disability",
      entries: [
        {
          year: "2021",
          text: "Mobility-aid beneficiaries: Amedi 4, Shiladze 3, Dereluk 12 and Sarsang 8.",
          textKu:
            "سوودمەندانی یارمەتییەکانی جووڵە و گواستنەوە: لە ئامێدی ٤ کەس، لە شێلادزێ ٣ کەس، لە دێرەلووک ١٢ کەس و لە سەرسەنگ ٨ کەس.",
          textAr:
            "المستفيدون من المعينات الحركية: العمادية 4، شيلادزي 3، ديرلوك 12، وسرسنك 8.",
        },
        {
          year: "2024",
          text: "The Amedi Smile Center, with Caritas Germany, served 159 beneficiaries.",
          textKu:
            "ناوەندی زەردەخەنەی ئامێدی، بە هاوکاری Caritasی ئەڵمانیا، خزمەتگوزاریی بۆ ١٥٩ کەس پێشکەش کرد.",
          textAr:
            "قدّم مركز الابتسامة في العمادية، بالتعاون مع كاريتاس الألمانية، خدماته لـ 159 مستفيداً.",
        },
        {
          year: "2026",
          text: "Special-care and autism-awareness activities continued at the Amedi-area centres.",
          textKu:
            "لە ناوەندەکانی ناوچەی ئامێدی، خزمەتگوزاری چاودێری تایبەت و چالاکییەکانی هۆشیارکردنەوە دەربارەی ئۆتیزم بەردەوام بوون.",
          textAr:
            "استمرت أنشطة الرعاية الخاصة والتوعية بمرض التوحد في مراكز منطقة العمادية.",
        },
      ],
    },
    {
      id: "cash",
      entries: [
        {
          year: "2026",
          text: "The Amedi representative office distributed support to 43 low-income families and patients.",
          textKu: "ئۆفیسی نوێنەرایەتی ئامێدی یارمەتی بۆ ٤٣ خێزانی کەم‌ داهات و نەخۆش دابەش کرد.",
          textAr:
            "وزّع مكتب ممثلية العمادية مساعدات على 43 أسرة من ذوي الدخل المحدود والمرضى.",
        },
      ],
    },
  ],

  /*
   * Western Kurdistan, Afrin included.
   *
   * Afrin used to be a register of its own, sitting beside this one — which
   * split one geography into two entries and left a visitor choosing between
   * two halves of the same place. Afrin is in Rojava, so its projects are filed
   * here, under the sectors they belong to. Every entry keeps the wording that
   * names the town, so the merge costs no detail.
   */
  rojava: [
    {
      id: "emergency",
      entries: [
        {
          year: "2023",
          text: "BCF's earthquake response expanded into affected areas of Türkiye and Syria; Afrin received food, NFI and Qurbani assistance.",
          textKu:
            "وەڵامدانەوەی دەزگای خێرخوازی بارزانی بۆ بوومەلەرزەکە گەیشتە ناوچە زیان‌لێکەوتووەکانی تورکیا و سوریا. لە عەفرین خۆراک، کەلوپەلی پێویستی ڕۆژانە و گۆشتی قوربانی دابەش کرا.",
          textAr:
            "توسعت استجابة مؤسسة بارزاني الخيرية للزلزال لتشمل المناطق المتضررة في تركيا وسوريا؛ حيث تلقت عفرين مساعدات الأمن الغذائي، والمستلزمات غير الغذائية، ومساعدات الأضاحي.",
        },
        {
          year: "2023",
          text: "The Qurbani meat project in Afrin reached 2,702 families.",
          textKu: "لە عەفرین، گۆشتی قوربانی بە ٢,٧٠٢ خێزان دابەش کرا.",
          textAr: "استهدف مشروع لحوم الأضاحي في عفرين 2,702 عائلة.",
        },
        {
          year: "2026",
          text: "A large-scale response ran across Qamishlo, Hasakah, Amuda, Girke Lege, Derik, Tirbespiye, Derbasiye and the surrounding areas.",
          textKu:
            "یارمەتییە بەرفراوانەکان لە قامیشلۆ، حەسەکە، عامودا، گرکێ لەگە، دێریک، تربەسپیێ، دەرباسیێ و ناوچەکانی دەوروبەریان جێبەجێ کران.",
          textAr:
            "نفذت استجابة واسعة النطاق شملت مناطق القامشلي، والحسكة، وعامودا، وجركي لگه، وديريك (المالكية)، وتربسبي، والدرباسية والمناطق المحيطة بها.",
        },
        {
          year: "2026",
          text: "BCF reported 415 truckloads of humanitarian aid and assistance to 29,070 families; 200 tons of flour supported the production and distribution of 3.36 million loaves.",
          textKu:
            "دەزگای خێرخوازی بارزانی ڕایگەیاند کە ٤١٥ بار یارمەتی مرۆیی گەیەنراوە و ٢٩,٠٧٠ خێزان سوودمەند بوون. هەروەها ٢٠٠ تەن ئارد دابین کرا، کە بەهۆی ئەوەوە ٣.٣٦ ملیۆن نان بەرهەم هێنرا و دابەش کرا.",
          textAr:
            "أعلنت مؤسسة بارزاني الخيرية عن إرسال 415 شاحنة محملة بالمساعدات الإنسانية لخدمة 29,070 عائلة؛ فضلاً عن دعم إنتاج وتوزيع 3.36 مليون رغيف خبز باستخدام 200 طن من الطحين.",
        },
        {
          year: "2026",
          text: "Food and NFI assistance continued in Afrin camps, alongside youth football, cultural and other community activities.",
          textKu:
            "لە کەمپەکانی عەفرین، دابەشکردنی خۆراک و کەلوپەلی پێویستی ڕۆژانە بەردەوام بوو. هەروەها یاری تۆپی پێ بۆ گەنجان، چالاکییە کەلتوورییەکان و چالاکییە کۆمەڵایەتییە جیاوازەکان بەڕێوەچوون.",
          textAr:
            "استمرت مساعدات الأمن الغذائي والمستلزمات غير الغذائية في مخيمات الإيواء بعفرين، إلى جانب أنشطة كرة القدم للشباب والأنشطة الثقافية وغيرها من أنشطة دعم المجتمع المحلي.",
        },
      ],
    },
    {
      id: "health",
      entries: [
        {
          year: "Ongoing",
          text: "The Mobile Clinic in Afrin is listed among BCF's ongoing projects.",
          textKu:
            "دەزگای خێرخوازی بارزانی لە عەفرین کلینیکێکی گەڕۆکی هەیە کە تا ئێستا بەردەوامە لە پێشکەشکردنی خزمەتگوزاری تەندروستی.",
          textAr: "تُدرج العيادة المتنقلة في عفرين ضمن مشاريع مؤسسة بارزاني الخيرية المستمرة.",
        },
        {
          year: "2026",
          text: "8,707 people received medical treatment or medicines, and 294 cartons of medicines and supplies were delivered in one month to hospitals and health centres including Derik, Chil Agha and Hasakah.",
          textKu:
            "٨,٧٠٧ کەس چارەسەری پزیشکی یان دەرمانیان وەرگرت. هەروەها لە ماوەی یەک مانگدا ٢٩٤ کارتۆن دەرمان و پێداویستی تەندروستی بۆ نەخۆشخانە و ناوەندە تەندروستییەکانی دێریک، چل ئاغا و حەسەکە نێردران.",
          textAr:
            "تلقى 8,707 أشخاص العلاج الطبي أو الأدوية، كما جرى تسليم 294 كرتوناً من الأدوية والمستلزمات الطبية خلال شهر واحد إلى المستشفيات والمراكز الصحية، بما في ذلك في مالكية (ديريك)، وجل آغا، والحسكة.",
        },
      ],
    },
    {
      id: "education",
      entries: [
        {
          year: "2024",
          text: "The Barzani Culture & Development Center in Afrin trained 213 participants in practical, market-oriented skills.",
          textKu:
            "لە سەنتەری کەلتوور و گەشەپێدانی بارزانی لە عەفرین، ٢١٣ کەس فێری پیشە و شارەزایییەکان بوون کە بۆ دۆزینەوەی کار و کارکردن لە بازاڕی کار پێویستن.",
          textAr:
            "درب مركز بارزاني للثقافة والتطوير في عفرين 213 مشاركاً على مهارات عملية موجهة نحو سوق العمل.",
        },
        {
          year: "2024",
          text: "The Afrin University student-support programme assisted 125 students.",
          textKu: "بەرنامەی پشتگیری خوێندکارانی زانکۆی عەفرین، یارمەتی ١٢٥ خوێندکاری دا.",
          textAr: "قدم برنامج دعم طلاب جامعة عفرين المساعدة لـ 125 طالباً وطالبة.",
        },
        {
          year: "2026",
          text: "A reading and writing educational course and youth-development activities continued in Afrin.",
          textKu:
            "لە عەفرین، کۆرسی فێربوونی خوێندنەوە و نووسین و هەروەها چالاکییەکانی گەشەپێدانی گەنجان بەردەوام بوون.",
          textAr:
            "استمرت دورات محو الأمية والتعليم والتطوير، فضلاً عن أنشطة تنمية الشباب في عفرين.",
        },
      ],
    },
    {
      id: "livelihood",
      entries: [
        {
          year: "2026",
          text: "370,245 litres of diesel were distributed to 9,682 families, and the humanitarian operation created 1,483 employment opportunities.",
          textKu:
            "٣٧٠,٢٤٥ لیتر گازۆیل بە ٩,٦٨٢ خێزان دابەش کرا. هەروەها ئەم کارە مرۆییە ١,٤٨٣ دەرفەتی کاری دروست کرد.",
          textAr:
            "جرى توزيع 370,245 لترًا من مادة الكاز (الديزل) على 9,682 عائلة، وأتاحت العمليات الإنسانية توفير 1,483 فرصة عمل.",
        },
      ],
    },
    {
      id: "cash",
      entries: [
        {
          year: "2025",
          text: "Azizan financial assistance was distributed to 192 orphans across Afrin villages and townships, and December 2025 assistance again reached 192 orphans.",
          textKu:
            "لە گوند و شارۆچکەکانی عەفرین، یارمەتی دارایی بە ١٩٢ منداڵی ئازیز دابەش کرا. لە کانوونی یەکەمی ٢٠٢٥دا هەمان یارمەتی دیسان گەیشتە ١٩٢ منداڵی ئازیز.",
          textAr:
            "وُزعت مساعدات عزيزان المالية على 192 فرداً من الأعزاء في قرى ونواحي عفرين، وتكرر تقديم مساعدات شهر كانون الأول (ديسمبر) 2025 لتصل إلى 192 فرداً من الأعزاء أيضاً.",
        },
        {
          year: "2025",
          text: "Azizan education and welfare support continued for the same 192 orphans.",
          textKu: "پشتگیری خوێندن و خۆشگوزەرانی ئازیزان بۆ هەمان ١٩٢ منداڵی ئازیز بەردەوام بوو.",
          textAr: "استمر تقديم الدعم التعليمي والرعائي لنفس الـ 192 فرداً من الأعزاء.",
        },
        {
          year: "2026",
          text: "Orphan and family-support services continued through the Afrin office.",
          textKu: "لە نووسینگەی عەفرین، خزمەتگوزارییەکانی پشتگیری منداڵانی ئازیز و خێزانەکان بەردەوام بوون.",
          textAr: "استمر تقديم خدمات رعاية الأعزاء ودعم العائلات عبر مكتب عفرين.",
        },
      ],
    },
  ],

  iraq: [
    {
      id: "food",
      entries: [
        {
          year: "2021",
          text: "The Kuwait-supported food project included Baghdad, Diyala and Dhi Qar alongside Kurdistan locations; 14,100 households benefited across all listed locations.",
          textKu:
            "پڕۆژەی خۆراک کە بە پشتیوانی کوەیت جێبەجێ کرا، بەغدا، دیالە، زیقار و هەندێک ناوچەی کوردستانی لەخۆگرت. لە هەموو ئەو ناوچانەدا، ١٤,١٠٠ خێزان سوودمەند بوون.",
          textAr:
            "شمل مشروع الأمن الغذائي المدعوم من الكويت كلاً من بغداد، وديالى، وذي قار إلى جانب مواقع في كوردستان. حيث استفادت 14,100 أسرة في عموم المواقع المذكورة.",
        },
        {
          year: "2022",
          text: "The food-project location table included Anbar, with 126 beneficiaries listed in the prepared-food distribution table.",
          textKu:
            "ئەنبار یەکێک بوو لە ناوچەکانی پڕۆژەی خۆراک. لە دابەشکردنی خواردنی ئامادەدا، ١٢٦ کەس لە ئەنبار سوودمەند بوون.",
          textAr:
            "تضمن جدول مواقع مشاريع الأغذية محافظة الأنبار، مع تسجيل 126 مستفيداً في جدول توزيع الأغذية الجاهزة.",
        },
        {
          year: "2023",
          text: "The Qurbani meat project included Anbar, reaching 480 families.",
          textKu: "لە ئەنبار، گۆشتی قوربانی بە ٤٨٠ خێزان دابەش کرا.",
          textAr: "شمل مشروع لحوم الأضاحي محافظة الأنبار، ليصل إلى 480 عائلة.",
        },
      ],
    },
    {
      id: "health",
      entries: [
        {
          year: "2021",
          text: "A medical convoy was sent to Samawah Governorate with 50 types of medicines and medical supplies.",
          textKu:
            "کاروانێکی پزیشکی بۆ پارێزگای سەماوە نێردرا، کە ٥٠ جۆر دەرمان و پێداویستی پزیشکی لەخۆگرتبوو.",
          textAr:
            "أُرسلت قافلة طبية إلى محافظة السماوة تضم 50 نوعاً من الأدوية والمستلزمات الطبية.",
        },
      ],
    },
    {
      id: "community",
      entries: [
        {
          year: "2025",
          text: "Latest full-year geography: 73,006 beneficiary families — 493,380 individuals — in Iraq outside the Kurdistan Region.",
          textKu:
            "بەپێی دوا داتای ساڵانە، لە ناوچەکانی عێراق لە دەرەوەی هەرێمی کوردستان، ٧٣,٠٠٦ خێزان، واتە ٤٩٣,٣٨٠ کەس، سوودمەند بوون.",
          textAr:
            "أحدث نطاق جغرافي لسنة كاملة: 73,006 عائلة مستفيدة، بواقع 493,380 فرداً في العراق خارج إقليم كوردستان.",
        },
      ],
    },
  ],

  /*
   * The cross-border work, filed under the countries it happened in rather than
   * under one "International" heading.
   *
   * That heading was a category, not a place: it put the Van camp, the Türkiye
   * earthquake, the Syria totals and the Lebanese Kurds' tents on one page that
   * belonged nowhere on either map. Each of these three now hangs off its own
   * country on the world map, which is where a visitor looking for Türkiye
   * would go.
   *
   * The cumulative report's list of ten countries does not become entries here.
   * It states that BCF's work reached them, which is exactly what the world map
   * already says by plotting them — it names no project, so inventing project
   * lines out of it would break the rule the rest of this file keeps.
   */
  turkiye: [
    {
      id: "emergency",
      entries: [
        {
          year: "2011-12",
          text: "BCF constructed a camp in Van with 400 caravans.",
          textKu: "BCF کەمپێکی لە وان بە ٤٠٠ کەرەڤان دروست کرد.",
          textAr: "أنشأت مؤسسة بارزاني الخيرية مخيماً يضم 400 كرفان في مدينة وان.",
        },
        {
          year: "2023",
          text: "Major earthquake response in Türkiye: rescue, hot meals, food, tents, medical aid and heavy equipment.",
          textKu:
            "دەزگای خێرخوازی بارزانی کەمپێکی لە وان بە ٤٠٠ کەرەڤان دروست کرد.",
          textAr:
            "الاستجابة للزلزال الكبير في تركيا: عمليات الإنقاذ، الوجبات الساخنة، المواد الغذائية، الخيام، المساعدات الطبية والمعدات الثقيلة.",
          note: "The cumulative report records 4,129 tents for Türkiye and Syria earthquake victims together.",
          noteKu:
            "ڕاپۆرتی کۆکراوە ٤,١٢٩ چادر بۆ زیانلێکەوتووانی بوومەلەرزەی تورکیا و سوریا پێکەوە تۆمار دەکات.",
        },
      ],
    },
  ],

  syria: [
    {
      id: "emergency",
      entries: [
        {
          year: "2023",
          text: "The earthquake response and ongoing Afrin programming expanded BCF's work in Syria.",
          textKu: "وەڵامدانەوەی بوومەلەرزە و بەرنامەی بەردەوامی عەفرین کاری BCF لە سوریا فراوان کرد.",
          textAr:
            "وسّعت الاستجابة للزلزال والبرامج المستمرة في عفرين من نطاق عمل مؤسسة بارزاني الخيرية في سوريا.",
        },
        {
          year: "2026",
          text: "The large Western Kurdistan response became one of BCF's biggest current cross-border operations.",
          textKu:
            "وەڵامدانەوەی گەورەی ڕۆژئاوای کوردستان بوو بە یەکێک لە گەورەترین کارەکانی ئێستای دەزگای خێرخوازی بارزانی لە دەرەوەی سنوور.",
          textAr:
            "أصبحت الاستجابة الواسعة في غرب كوردستان إحدى كبرى العمليات الحالية العابرة للحدود لمؤسسة بارزاني الخيرية.",
        },
      ],
    },
    {
      id: "community",
      entries: [
        {
          year: "2025",
          text: "BCF reported 10,673 individual beneficiaries in Syria for the full year.",
          textKu: "BCF ڕایگەیاند ١٠,٦٧٣ کەس لە سوریا سوودمەند بوون بۆ تەواوی ساڵەکە.",
          textAr:
            "أفادت مؤسسة بارزاني الخيرية بأن عدد المستفيدين الأفراد في سوريا بلغ 10,673 شخصاً على مدار العام بأكمله.",
        },
      ],
    },
  ],

  lebanon: [
    {
      id: "emergency",
      entries: [
        {
          year: "2024",
          text: "BCF provided tents to welcome Lebanese Kurds in Mam Rashan Camp — the Kurdistan Region's response to displacement from Lebanon.",
          textKu:
            "دەزگای خێرخوازی بارزانی چادری دابین کرد بۆ پێشوازی لە کوردە لوبنانییەکان لە کەمپی مام ڕەشان — وەڵامی هەرێمی کوردستان بۆ ئاوارەبوون لە لوبنان.",
          textAr:
            "قدمت مؤسسة بارزاني الخيرية الخيام لاستقبال كورد لبنان في مخيم مام رشان، وذلك استجابةً من إقليم كوردستان لموجة النزوح من لبنان.",
        },
      ],
    },
  ],
};

/** Sectors documented for a location, in the canonical reading order. */
export function bcfSectorsFor(locationId: LocationId): BcfSectorRecord[] {
  const records = BCF_PROJECT_DATA[locationId] ?? [];
  return [...records].sort(
    (a, b) => BCF_SECTOR_ORDER.indexOf(a.id) - BCF_SECTOR_ORDER.indexOf(b.id),
  );
}

/** Entries for one sector of one location, oldest first. */
export function bcfEntriesFor(
  locationId: LocationId,
  sectorId: SectorId,
): BcfProjectEntry[] {
  const record = (BCF_PROJECT_DATA[locationId] ?? []).find((s) => s.id === sectorId);
  if (!record) return [];
  return [...record.entries].sort(
    (a, b) => bcfYearSortKey(a.year) - bcfYearSortKey(b.year),
  );
}

/**
 * Documented coverage spans from the BCF city register — not derived from the
 * selected stories on each page, which may start later than the office's own
 * archive.
 */
export const BCF_DOCUMENTED_YEAR_SPANS: Partial<Record<LocationId, string>> = {
  erbil: "2006 - 2026",
  sulaymaniyah: "2008 - 2024",
  duhok: "2006 - 2024",
  kirkuk: "2007 - 2024",
  nineveh: "2007 - 2024",
  garmian: "2008 - 2024",
  halabja: "2008 - 2024",
  raparin: "2007 - 2019",
};

/**
 * The span a city's own register covers, as "2007 - 2026". Uses
 * `BCF_DOCUMENTED_YEAR_SPANS` when the source gives an office archive wider
 * than the selected stories filed under it; otherwise falls back to the dated
 * entries in the register. Undated markers are excluded from that arithmetic.
 */
export function bcfYearSpanFor(locationId: LocationId): string | null {
  const documented = BCF_DOCUMENTED_YEAR_SPANS[locationId];
  if (documented) return documented;

  const years = (BCF_PROJECT_DATA[locationId] ?? [])
    .flatMap((sector) => sector.entries)
    .flatMap((entry) => entry.year.match(/\d{4}/g) ?? [])
    .map(Number);

  if (!years.length) return null;
  const min = Math.min(...years);
  const max = Math.max(...years);
  return min === max ? String(min) : `${min} - ${max}`;
}

/** How many documented project lines a city carries across every sector. */
export function bcfEntryCountFor(locationId: LocationId): number {
  return (BCF_PROJECT_DATA[locationId] ?? []).reduce(
    (total, sector) => total + sector.entries.length,
    0,
  );
}
