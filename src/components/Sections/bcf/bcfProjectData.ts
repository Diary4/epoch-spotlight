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
 * are English because the source is, matching how the previous project copy was
 * shared across all three languages — the chrome around them (city names,
 * sector names, era labels) is translated in bcfContent.
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
          textAr:
            "توزيعات غذائية في أربيل: استفادت 350 أسرة من طرود كورك، و6,817 أسرة من مساعدات كلاويز الغذائية في مخيمي حسن شام U2 وU3 والخازر، و14,021 أسرة من لحوم الأضاحي في المدينة ومخيماتها.",
        },
        {
          year: "2022",
          text: "The hot-meal programme served 694,362 meals in Erbil, alongside food distributions continuing through partner projects.",
          textAr:
            "قدّم برنامج الوجبات الساخنة 694,362 وجبة في أربيل، إلى جانب استمرار توزيع المواد الغذائية عبر المشاريع الشريكة.",
        },
        {
          year: "2023",
          text: "Qurbani meat reached 1,481 families, with regular food and non-food assistance continuing across Erbil and the camps.",
          textAr:
            "استفادت 1,481 أسرة من لحوم الأضاحي، مع استمرار تقديم المساعدات الغذائية وغير الغذائية في أربيل والمخيمات.",
        },
        {
          year: "2024",
          text: "The Ramadan overview recorded 14,943 food parcels in Erbil; other Ramadan and food projects ran separately.",
          textAr:
            "تم توزيع 14,943 طردًا غذائيًا في أربيل خلال شهر رمضان، إلى جانب تنفيذ مشاريع رمضانية وغذائية أخرى بشكل منفصل.",
          note: "Annual report and website Ramadan overviews cover different project scopes.",
        },
        {
          year: "2026",
          text: "Ramadan iftar at Erbil Park for 1,000 people daily, 500 Turaq food baskets, food for families of martyrs, Eid food baskets and camp food and flour assistance.",
          textAr:
            "أُقيم إفطار رمضاني في بارك أربيل لـ 1,000 شخص يوميًا، وتم توزيع 500 سلة غذائية في تورق، إلى جانب تقديم مساعدات غذائية لعائلات الشهداء، وسلال غذائية للعيد، ومساعدات غذائية وطحين للمخيمات.",
        },
      ],
    },
    {
      id: "education",
      entries: [
        {
          year: "2020",
          text: "The 450 school-chairs project covered Halgurd Basic School in Erbil together with schools under the Sulaymaniyah and Penjwen directorates.",
          textAr:
            "شمل مشروع 450 مقعدًا مدرسيًا مدرسة هەڵگورد الأساسية في أربيل، إلى جانب مدارس في السليمانية وبنجوين.",
        },
        {
          year: "2022",
          text: "Fifty of the 203 schools in the renovation programme were in Erbil.",
          textAr: "شمل برنامج ترميم 203 مدارس، منها 50 مدرسة في أربيل.",
        },
        {
          year: "2024",
          text: "Fifteen schools renovated in Erbil, and a solar-electricity pilot installed at ten Erbil schools.",
          textAr:
            "تم ترميم 15 مدرسة في أربيل، وتجهيز 10 مدارس بأنظمة تجريبية للطاقة الشمسية.",
        },
        {
          year: "2025",
          text: "The Orphans' Educational Project was officially announced in Erbil and operates across BCF offices and Kurdistan.",
          textAr:
            "أُطلق في أربيل المشروع التعليمي للأيتام، ويُنفَّذ عبر مكاتب مؤسسة بارزاني الخيرية في كوردستان.",
        },
        {
          year: "2026",
          text: "First participation in the Kurdish Book Fair, education and awareness initiatives, and a new Capacity Development Center for Orphans and Widows announced in Erbil.",
          textAr:
            "شاركت المؤسسة للمرة الأولى في معرض الكتاب الكوردي، ونفذت مبادرات تعليمية وتوعوية، كما أُعلن عن إنشاء مركز لتنمية قدرات الأيتام والأرامل في أربيل.",
        },
      ],
    },
    {
      id: "health",
      entries: [
        {
          year: "2020",
          text: "COVID-19 medical assistance delivered to Central Erbil Hospital as part of regional hospital support.",
          textAr:
            "تم تقديم مساعدات طبية لمواجهة كوفيد-19 إلى مستشفى أربيل المركزي ضمن دعم مستشفيات الإقليم.",
        },
        {
          year: "2024",
          text: "The Center of Excellence for Complex Care was active, and Erbil hospitals also received patients through the mobility-service project.",
          textAr:
            "واصل مركز كوردستان للتميز في رعاية الحالات المعقدة نشاطه، كما استقبلت مستشفيات أربيل مرضى ضمن مشروع نقل المرضى.",
        },
        {
          year: "2026",
          text: "The memorandum for the Kurdistan Center of Excellence for Complex Care was renewed, and a mammography support project announced for the Erbil breast-disease centre.",
          textAr:
            "تم تجديد مذكرة مركز كوردستان للتميز في رعاية الحالات المعقدة، والإعلان عن مشروع لدعم فحوصات الماموغرام في مركز أمراض الثدي بأربيل.",
        },
      ],
    },
    {
      id: "wash",
      entries: [
        {
          year: "2021",
          text: "Emergency water response delivered 65,864,000 litres through 3,261 tanker runs to 65,220 families across Erbil Governorate.",
          textAr:
            "وفّرت الاستجابة الطارئة للمياه 65,864,000 لتر عبر 3,261 رحلة بصهاريج المياه، استفادت منها 65,220 أسرة في أنحاء محافظة أربيل.",
        },
        {
          year: "2022",
          text: "Well drilling and repair, pumps and generators in Kawrgosk, Qushtapa, Kasnazan-area villages and Ruvia, with related countryside water systems.",
          textAr:
            "شملت الأعمال حفر الآبار وصيانتها، وتوفير المضخات والمولدات في كوركوسك وقوشتبة وقرى منطقة كسنەزان وروفيا، إلى جانب مشاريع المياه في المناطق الريفية.",
        },
        {
          year: "2024",
          text: "Drinking-water support reported for 9,100 families in Erbil Governorate.",
          textAr: "تم توفير مياه الشرب لـ 9,100 أسرة في محافظة أربيل.",
        },
      ],
    },
    {
      id: "shelter",
      entries: [
        {
          year: "2015",
          text: "Three hundred caravans established in Bahirka Camp.",
          textAr: "تم إنشاء 300 كرفان في مخيم بحركة.",
          note: "Recorded in the cumulative 2005-2024 report.",
        },
        {
          year: "2019",
          text: "Khazir camp shelter support, including large tent projects with LDS Charities and Catholic Teufen.",
          textAr:
            "تم دعم المأوى في مخيم الخازر، بما في ذلك مشاريع الخيام الكبيرة بالتعاون مع LDS Charities وCatholic Teufen.",
        },
        {
          year: "2021",
          text: "Two major flood responses in Erbil: 751 households assisted in October and 2,905 households in December.",
          textAr:
            "استفادت 751 أسرة من الاستجابة للفيضانات في أربيل خلال تشرين الأول، و2,905 أسر خلال كانون الأول.",
        },
        {
          year: "2023",
          text: "BCF responded again to flood-affected families in Erbil after heavy rains.",
          textAr:
            "قدّمت مؤسسة بارزاني الخيرية (BCF) الدعم مجددًا للعائلات المتضررة من الفيضانات في أربيل بعد الأمطار الغزيرة.",
        },
        {
          year: "2024",
          text: "The foundation stone was laid for BCF City in Qushtapa, and the shared Erbil/Soran martyrs' housing distribution took place.",
          textAr:
            "وُضع حجر الأساس لمدينة مؤسسة بارزاني الخيرية (BCF) في قوشتبة، وتم توزيع مساكن الشهداء ضمن المشروع المشترك بين أربيل وسوران.",
          note: "540 units project-wide; the Erbil-vs-Soran split is not published in the reviewed source.",
        },
        {
          year: "2025",
          text: "The first phase of BCF City moved into implementation in Qushtapa, including 180 houses for poor and low-income families.",
          textAr:
            "بدأ تنفيذ المرحلة الأولى من مدينة مؤسسة بارزاني الخيرية (BCF City) في قوشتبة، وتشمل 180 منزلًا للعائلات الفقيرة ومحدودة الدخل.",
        },
      ],
    },
    {
      id: "disability",
      entries: [
        {
          year: "2015",
          text: "The mobility-aid project launched with LDS Charities and continued in later years.",
          textAr:
            "أطلق مشروع المعينات الحركية بالتعاون مع جمعية قديسي الأيام الأخيرة الخيرية (LDS Charities) واستمر خلال السنوات اللاحقة.",
        },
        {
          year: "2021",
          text: "389 people in Erbil received wheelchairs or other mobility aids.",
          textAr: "استفاد 389 شخصًا في أربيل من الكراسي المتحركة وغيرها من المعينات الحركية.",
        },
        {
          year: "2022",
          text: "326 beneficiaries recorded in Erbil.",
          textAr: "بلغ عدد المستفيدين في أربيل 326 شخصًا.",
        },
        {
          year: "2026",
          text: "Wheelchairs and other disability support continued: ten wheelchairs distributed in March, with further support in April.",
          textAr:
            "استمر توزيع الكراسي المتحركة وتقديم الدعم لذوي الإعاقة؛ حيث تم توزيع 10 كراسٍ متحركة في آذار، وتواصل تقديم الدعم في نيسان.",
        },
      ],
    },
    {
      id: "camp",
      entries: [
        {
          year: "2021",
          text: "BCF managed nine IDP and refugee camps plus one host-community camp in Erbil Governorate; clothing, blanket and household-item projects supported Harsham, Hasan Sham, Bahirka, Debaga and others.",
          textAr:
            "أدارت مؤسسة بارزاني الخيرية 9 مخيمات للنازحين واللاجئين، إضافة إلى مخيم واحد للمجتمع المضيف في محافظة أربيل، ونفذت مشاريع لتوفير الملابس والبطانيات والمستلزمات المنزلية في هرشەم، حسن شام، بحركة، ديبگە ومخيمات أخرى.",
        },
        {
          year: "2021-26",
          text: "Recurring food, NFI, winter, health and camp-support projects operated in Bahirka, Hasan Sham, Khazir, Debaga, Qushtapa, Basirma, Darashakran and Harsham.",
        },
        {
          year: "2023",
          text: "Seven camps managed in Erbil, and more than 300,000 Iranian pilgrims temporarily accommodated in Sami Abdulrahman Park with food, water and health services.",
          textAr:
            "أدارت المؤسسة 7 مخيمات في أربيل، كما استضافت مؤقتًا أكثر من 300,000 زائر إيراني في حديقة سامی عبدالرحمن، مع توفير الغذاء والمياه والخدمات الصحية.",
        },
        {
          year: "2024",
          text: "The Warm Winter programme distributed heaters to schools in Erbil; camp coordination remained one of BCF's largest sectors.",
          textAr:
            "وزّع برنامج الشتاء الدافئ أجهزة تدفئة على مدارس في أربيل، فيما ظلت إدارة وتنسيق المخيمات من أكبر قطاعات عمل المؤسسة.",
        },
        {
          year: "2026",
          text: "Food, cash, clothing and disability assistance continued in Baharka, Hasan Sham, Khazir and Debaga camps, and a World Refugee Day event was held in Erbil.",
        },
      ],
    },
    {
      id: "cash",
      entries: [
        {
          year: "2012",
          text: "Orphan sponsorship — the Kurdistan project — began and later expanded across BCF offices.",
          textAr:
            "انطلق مشروع كوردستان لكفالة الأعزاء، ثم توسّع لاحقاً ليشمل مكاتب مؤسسة بارزاني الخيرية.",
        },
        {
          year: "2021",
          text: "Erbil joined the academic-excellence programme honouring top Grade 12 orphan students.",
          textAr:
            "شاركت أربيل في برنامج التفوق الدراسي لتكريم الطلبة الأعزاء المتفوقين في الصف الثاني عشر.",
        },
        {
          year: "2025",
          text: "The Azizan-Kurdistan March stage reached 802 orphans in Erbil, and the educational project launched in the city.",
          textAr:
            "وصلت محطة أربيل من مسيرة الأعزاء كوردستان إلى 802 من الأعزاء، كما أُطلق المشروع التعليمي في المدينة.",
        },
        {
          year: "2025-26",
          text: "Nujin operates in Erbil.",
          textAr: "يعمل مشروع نوزين في أربيل.",
          note: "15 families in 2025 and 12 in 2026 are project-wide totals across all offices, not Erbil counts.",
        },
        {
          year: "2026",
          text: "The Capacity Development Center for Orphans and Widows was announced, and food, clothing and family assistance continued.",
          textAr:
            "أُعلن عن مركز تنمية قدرات الأعزاء والأرامل، مع استمرار تقديم المساعدات الغذائية والملابس والدعم للأسر.",
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
          textAr:
            "غطت مشاريع الأمن الغذائي محافظة دهوك؛ حيث وصلت الأضاحي إلى 2,060 أسرة في دهوك ومخيم بردرش، بينما تلقى مخيم عقرة طروداً غذائية عبر كاريتاس.",
        },
        {
          year: "2022",
          text: "60,788 hot meals reported in Duhok, with annual food-distribution projects continuing.",
          textAr:
            "أُبلغ عن تقديم 60,788 وجبة ساخنة في دهوك، مع استمرار مشاريع التوزيع السنوي للأغذية.",
        },
        {
          year: "2024",
          text: "The Ramadan overview recorded 13,931 food parcels in Duhok Governorate.",
          textAr: "سُجلت في شهر رمضان توزيع 13,931 طرداً غذائياً في محافظة دهوك.",
          note: "Annual report and website Ramadan overviews cover different project scopes.",
        },
        {
          year: "2026",
          text: "A free-bread Ramadan project ran through 13 bakeries across Duhok-area districts, alongside Semel food baskets and large flour distributions to camp families.",
          textAr:
            "أُقيم مشروع رمضاني لتوفير الخبز المجاني عبر 13 مخبزاً في مناطق قضاء دهوك، إلى جانب توزيع سلال غذائية في سيميل وتوزيع كميات كبيرة من الطحين على العائلات في المخيمات.",
        },
      ],
    },
    {
      id: "health",
      entries: [
        {
          year: "2020",
          text: "COVID-19 medical supplies delivered to the Duhok Health Directorate.",
          textAr: "تسليم مستلزمات طبية خاصة بفيروس كورونا إلى مديرية صحة دهوك.",
        },
        {
          year: "2021",
          text: "A COVID vaccination centre opened in Domiz 1 Camp, and medical equipment and supplies were delivered to five Duhok hospitals and camp facilities.",
          textAr:
            "افتُتح مركز لتلقي لقاح كوفيد-19 في مخيم دوميز 1، وتم تسليم معدات ومستلزمات طبية إلى خمسة مستشفيات ومرافق مخيمات في دهوك.",
        },
        {
          year: "2025",
          text: "The Mobile Medical Clinic project launched for camps in Duhok Province; 17 Kurdish children were also sent to Germany for examination and treatment through a partner programme.",
          textAr:
            "إطلاق مشروع العيادة الطبية المتنقلة للمخيمات في محافظة دهوك؛ كما أُرسل 17 طفلاً كوردياً إلى ألمانيا للفحص والعلاج من خلال برنامج شريك.",
        },
        {
          year: "2026",
          text: "BCF noted plans for an autism centre in Duhok, in addition to the existing centres elsewhere.",
          textAr:
            "أشارت مؤسسة بارزاني الخيرية (BCF) إلى وجود خطط لإنشاء مركز لمرض التوحد في دهوك، بالإضافة إلى المراكز القائمة في أماكن أخرى.",
        },
      ],
    },
    {
      id: "education",
      entries: [
        {
          year: "2022",
          text: "Twenty of the 203 schools in the renovation programme were in Duhok.",
          textAr: "شمل برنامج الترميم 20 مدرسة في دهوك من أصل 203 مدارس مستهدفة.",
        },
        {
          year: "2024",
          text: "Fourteen schools renovated in Duhok in the final annual report.",
          textAr: "تضمن التقرير السنوي النهائي ترميم 14 مدرسة في دهوك.",
        },
        {
          year: "2025",
          text: "A solar-electricity project was announced for ten schools in Duhok Province.",
          textAr:
            "الإعلان عن مشروع لتوليد الكهرباء بالطاقة الشمسية لـ 10 مدارس في محافظة دهوك.",
        },
      ],
    },
    {
      id: "shelter",
      entries: [
        {
          year: "2016",
          text: "Six hundred caravans established in Darkar Ajam Camp.",
          textAr: "إنشاء 600 كرفان في مخيم دركار عجم.",
        },
        {
          year: "2021",
          text: "188 shelters built in Sharya Camp in cooperation with LDS Charities.",
          textAr: "بناء 188 مأوى في مخيم شاريا بالتعاون مع جمعيات LDS.",
          note: "Recorded in the cumulative 2005-2024 report.",
        },
        {
          year: "2022",
          text: "The Duhok martyrs' housing project completed 420 residential units in Roj City.",
          textAr:
            "إنجاز 420 وحدة سكنية ضمن مشروع إسكان عوائل شهداء دهوك في روج ستي.",
          note: "First phase 368, second phase 52. Use 420 as the complete project; 368 is only the first phase.",
        },
        {
          year: "2024-26",
          text: "Camp shelter and winter support continued through BCF's regular camp programmes.",
          textAr:
            "استمرار تقديم خدمات الإيواء والمساعدات الشتوية في المخيمات عبر برامج المخيمات الاعتيادية لمؤسسة بارزاني الخيرية (BCF).",
        },
      ],
    },
    {
      id: "camp",
      entries: [
        {
          year: "2021",
          text: "BCF managed 20 IDP and refugee camps in Duhok Governorate.",
          textAr:
            "تولت مؤسسة بارزاني الخيرية (BCF) إدارة 20 مخيماً للنازحين واللاجئين في محافظة دهوك.",
        },
        {
          year: "2021-26",
          text: "Recurring food, NFI, winter, health and camp-support projects operated in Khanke, Domiz, Sharya and other Duhok-area sites.",
          textAr:
            "عملت مشاريع الدعم المتكررة الخاصة بالأمن الغذائي، والمواد غير الغذائية، ومستلزمات الشتاء، والصحة، والمأوى والإسكان في مخيمات خانك، ودوميز، وشاريا وغيرها من المواقع في منطقة دهوك.",
        },
        {
          year: "2023",
          text: "Thirteen camps managed in Duhok.",
          textAr: "إدارة 13 مخيماً في نطاق محافظة دهوك.",
        },
        {
          year: "2024",
          text: "The Warm Winter heater project included Duhok schools, and flood-relief NFI support covered affected Duhok locations.",
          textAr:
            "امتد مشروع الشتاء الدافئ للمدافئ ليشمل مدارس دهوك، بالتزامن مع توفير مساعدات إغاثية من المواد غير الغذائية للمناطق المتضررة جراء الفيضانات.",
        },
        {
          year: "2026",
          text: "Food, flour, white oil and other assistance continued across Duhok camps; Eid projects included major flour support for displaced families.",
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
          textAr: "إطلاق واستمرار مشروع المعينات الحركية في دهوك.",
        },
        {
          year: "2021",
          text: "154 mobility-aid beneficiaries in Duhok.",
          textAr: "استفاد 154 شخصاً من المعينات الحركية في دهوك.",
        },
        {
          year: "2022",
          text: "106 beneficiaries in Duhok.",
          textAr: "بلغ عدد المستفيدين في دهوك 106 أشخاص.",
        },
        {
          year: "2026",
          text: "Eight wheelchairs distributed in May, with disability-support activities continuing.",
          textAr: "وُزعت 8 كراسٍ متحركة في شهر مايو، مع استمرار أنشطة دعم ذوي الإعاقة.",
        },
      ],
    },
    {
      id: "livelihood",
      entries: [
        {
          year: "2023",
          text: "Livelihood-sector activity continued through the Duhok office and its vocational centres.",
          textAr:
            "استمرت أنشطة قطاع سبل العيش من خلال مكتب دهوك ومراكزه للتدريب المهني.",
        },
        {
          year: "2026",
          text: "The Kurdivia fruit-drying and green-garden initiative was implemented at the University of Duhok with the American Corner.",
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
          textAr:
            "يعمل مشروع كفالة الأعزاء - مشروع كوردستان في دهوك إلى جانب مكاتب المؤسسة الأخرى.",
        },
        {
          year: "2025",
          text: "The Azizan-Kurdistan March stage reached 594 orphans in Duhok.",
          textAr: "وصلت مرحلة دهوك من مسيرة أعزاء كوردستان إلى 594 عزيزاً.",
        },
        {
          year: "2025-26",
          text: "Nujin operates in Duhok.",
          textAr: "يعمل مشروع نوزين في دهوك.",
          note: "15 families in 2025 and 12 in 2026 are project-wide totals across all offices, not Duhok counts.",
        },
        {
          year: "2026",
          text: "The Duhok office organised activities and cash support for orphaned children and their families.",
          textAr: "نظّم مكتب دهوك أنشطة وقدّم مساعدات نقدية للأعزاء وعائلاتهم.",
        },
      ],
    },
    {
      id: "community",
      entries: [
        {
          year: "2025",
          text: "A community-support project announced carpets for 62 mosques across Duhok Province and the Zakho administration.",
          textAr:
            "أعلن مشروع لدعم المجتمع عن توفير سجاد لـ 62 مسجداً في عموم محافظة دهوك وإدارة زاخو المستقلة.",
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
          textAr:
            "وصل مشروع كۆرەک الغذائي إلى 1,500 أسرة، ووصل لحم الأضاحي إلى 1,000 أسرة؛ كما غطت مشاريع غذائية أخرى بدعم من مؤسسة بارزاني الخيرية والكويت محافظة السليمانية.",
        },
        {
          year: "2022",
          text: "3,550 hot meals reported in Sulaymaniyah.",
          textAr: "الإبلاغ عن توزيع 3,550 وجبة ساخنة في السليمانية.",
        },
        {
          year: "2023",
          text: "The Qurbani meat project reached 1,149 families.",
          textAr: "وصل مشروع لحم الأضاحي إلى 1,149 عائلة.",
        },
        {
          year: "2024",
          text: "The Ramadan overview recorded 2,605 food parcels.",
          textAr: "أظهرت البيانات العامة لشهر رمضان توزيع 2,605 سلة غذائية.",
          note: "Annual report and website Ramadan overviews cover different project scopes.",
        },
        {
          year: "2026",
          text: "400 Ramadan food baskets, support for 75 families and teachers in the Penjwen area, and 500 food baskets to families of persons with disabilities.",
          textAr:
            "توزيع 400 سلة غذائية رمضانية، ودعم 75 عائلة ومعلماً في منطقة بنجوين، ووزعت 500 سلة غذائية على عائلات ذوي الإعاقة.",
        },
      ],
    },
    {
      id: "education",
      entries: [
        {
          year: "2020",
          text: "The school-chair project also covered schools under the Sulaymaniyah and Penjwen education directorates.",
          textAr:
            "شمل مشروع المقاعد المدرسية أيضاً المدارس التابعة لمديريتي التربية في السليمانية وبنجوين.",
        },
        {
          year: "2022",
          text: "Fifty of the 203 schools in the renovation programme were in Sulaymaniyah.",
          textAr:
            "تضمنت أعمال برنامج التأهيل والترميم 50 مدرسة من أصل 203 مدارس في محافظة السليمانية.",
        },
      ],
    },
    {
      id: "nfi",
      entries: [
        {
          year: "2023",
          text: "The NFI sector recorded 22,297 individual beneficiaries through the Sulaymaniyah office.",
          textAr:
            "تسجيل 22,297 مستفيداً ضمن قطاع المواد غير الغذائية عبر مكتب السليمانية.",
        },
      ],
    },
    {
      id: "disability",
      entries: [
        {
          year: "2021",
          text: "125 mobility-aid beneficiaries.",
          textAr: "بلغ عدد المستفيدين من المعينات الحركية 125.",
        },
        {
          year: "2022",
          text: "115 beneficiaries.",
          textAr: "بلغ إجمالي عدد المستفيدين 115 مستفيداً.",
        },
        {
          year: "2026",
          text: "Eleven wheelchairs in May; food support also targeted 250 people with special needs in March and 500 disability-linked families in May.",
          textAr:
            "توزيع 11 كرسياً متحركاً في شهر مايو؛ كما استهدف الدعم الغذائي 250 شخصاً من ذوي الاحتياجات الخاصة في شهر مارس، و500 أسرة من عائلات ذوي الإعاقة في شهر مايو.",
        },
      ],
    },
    {
      id: "protection",
      entries: [
        {
          year: "2024",
          text: "Sulaymaniyah was included in BCF's protection-sector geographic coverage.",
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
          textAr:
            "أُدرج طلاب محافظة السليمانية ضمن برنامج تكريم الأعزاء من المتفوقين في الصف الثاني عشر.",
        },
        {
          year: "2025",
          text: "The Azizan-Kurdistan March stage reached 561 orphans in Sulaymaniyah.",
          textAr:
            "وصلت مسيرة أعزاء كوردستان إلى 561 من الأعزاء في محافظة السليمانية.",
        },
        {
          year: "2025-26",
          text: "Nujin operates in Sulaymaniyah.",
          textAr: "ينشط مشروع نوجين في السليمانية.",
          note: "15 families in 2025 and 12 in 2026 are project-wide totals across all offices, not Sulaymaniyah counts.",
        },
        {
          year: "2026",
          text: "Two March cash projects supported 100 families with IQD 200,000 each and another 100 families with US$200 each.",
          textAr:
            "دعم مشروعان لشهر آذار 100 أسرة بمبلغ 200,000 دينار عراقي لكل منها، و100 أسرة أخرى بمبلغ 200 دولار أمريكي لكل منها.",
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
          textAr:
            "وصل مشروع كورك الغذائي إلى 750 أسرة، فيما استفادت 1,000 أسرة من مشروع لحوم الأضاحي. كما شملت مشاريع مؤسسة بارزاني الخيرية والمشاريع المدعومة من الكويت كركوك.",
        },
        {
          year: "2022",
          text: "3,500 hot meals reported in Kirkuk.",
          textAr: "تم تقديم 3,500 وجبة ساخنة في كركوك.",
        },
        {
          year: "2023",
          text: "The Qurbani meat project reached 1,972 families.",
          textAr: "استفادت 1,972 أسرة من مشروع الأضاحي.",
        },
        {
          year: "2024",
          text: "The Ramadan overview recorded 6,750 food parcels.",
          textAr: "تم توزيع 6,750 طردًا غذائيًا خلال شهر رمضان.",
          note: "Annual report and website Ramadan overviews cover different project scopes.",
        },
        {
          year: "2026",
          text: "Prde food baskets for 200 families, and the 'Immortal Barzani, Symbol of Coexistence' project began with food and NFI support to 30 families.",
          textAr:
            "تم توزيع سلال غذائية على 200 أسرة، كما انطلق مشروع «بارزاني الخالد، رمز التعايش» بتقديم مساعدات غذائية ومواد غير غذائية إلى 30 أسرة.",
        },
      ],
    },
    {
      id: "education",
      entries: [
        {
          year: "2022",
          text: "Fifty-two of the 203 schools in the renovation programme were in Kirkuk.",
          textAr: "كانت 52 مدرسة من أصل 203 مدارس ضمن برنامج الترميم في كركوك.",
        },
        {
          year: "2024",
          text: "The final 50-school programme included five schools in Kirkuk.",
          textAr: "شمل البرنامج النهائي المكوّن من 50 مدرسة، خمس مدارس في كركوك.",
        },
      ],
    },
    {
      id: "nfi",
      entries: [
        {
          year: "2023",
          text: "NFI activities recorded 3,850 individual beneficiaries.",
          textAr: "استفاد 3,850 شخصًا من أنشطة توزيع المواد غير الغذائية.",
        },
      ],
    },
    {
      id: "disability",
      entries: [
        {
          year: "2021",
          text: "121 mobility-aid beneficiaries.",
          textAr: "استفاد 121 شخصًا من مساعدات التنقّل.",
        },
        {
          year: "2022",
          text: "220 disability-support beneficiaries.",
          textAr: "استفاد 220 شخصًا من خدمات دعم ذوي الهمم.",
        },
      ],
    },
    {
      id: "protection",
      entries: [
        {
          year: "2024",
          text: "Kirkuk was included in protection-sector programmes.",
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
          textAr:
            "وصلت مرحلة آذار من مشروع الأعزاء كردستان إلى 644 يتيمًا في كركوك.",
        },
        {
          year: "2025-26",
          text: "Nujin operates in Kirkuk.",
          textAr: "يعمل مشروع نوجين في كركوك.",
          note: "15 families in 2025 and 12 in 2026 are project-wide totals across all offices, not Kirkuk counts.",
        },
        {
          year: "2026",
          text: "Cash distributions reached 300 families with US$100 each and another 50 families with US$200 each.",
          textAr:
            "تم توزيع مساعدات نقدية على 300 أسرة بمبلغ 100 دولار أمريكي لكل أسرة، وعلى 50 أسرة أخرى بواقع 200 دولار أمريكي لكل أسرة.",
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
          textAr:
            "استفادت 1,850 أسرة في الموصل من مشروع كورك. كما استفادت 1,000 أسرة في نينوى من مشروع توزيع الأضاحي، وشمل المحافظة أيضاً مشروع غذائي بدعم من الكويت.",
        },
        {
          year: "2022",
          text: "498,545 hot meals reported in Nineveh, with food-project beneficiaries also recorded in Nineveh and Zummar.",
          textAr:
            "تم تقديم 498,545 وجبة ساخنة في نينوى، إلى جانب مستفيدين من مشاريع غذائية في نينوى وزمار.",
        },
        {
          year: "2023",
          text: "The Qurbani meat project reached 1,815 families in Mosul.",
          textAr: "استفادت 1,815 أسرة في الموصل من مشروع توزيع لحوم الأضاحي.",
        },
        {
          year: "2024",
          text: "The Ramadan overview recorded 6,500 food parcels in Mosul.",
          textAr: "تم توزيع 6,500 سلة غذائية رمضانية في الموصل.",
          note: "Annual report and website Ramadan overviews cover different project scopes.",
        },
      ],
    },
    {
      id: "health",
      entries: [
        {
          year: "2022",
          text: "Hasan Sham and Khazir Health Centers were listed among ongoing BCF health projects serving displacement-affected populations near Nineveh.",
          textAr:
            "استمر مركزا حسن شام والخازر الصحيان ضمن مشاريع مؤسسة بارزاني الخيرية الصحية لخدمة النازحين والمتضررين من النزوح في مناطق نينوى.",
        },
        {
          year: "2024",
          text: "Nineveh recorded major health-sector reach; Patient Mobility Services transported 525 patients from East Mosul camps to hospitals in Erbil and Mosul.",
          textAr:
            "قدّمت خدمة نقل المرضى الدعم لـ 525 مريضاً، ونقلتهم من مخيمات شرق الموصل إلى مستشفيات في أربيل والموصل.",
        },
      ],
    },
    {
      id: "education",
      entries: [
        {
          year: "2022",
          text: "Twenty of the 203 schools in the renovation programme were in Nineveh.",
          textAr: "شمل برنامج ترميم 203 مدارس، منها 20 مدرسة في نينوى.",
        },
        {
          year: "2024",
          text: "The final 50-school programme included five schools in Mosul.",
          textAr:
            "وضمّت المرحلة النهائية من البرنامج، التي شملت 50 مدرسة، 5 مدارس في الموصل.",
        },
      ],
    },
    {
      id: "wash",
      entries: [
        {
          year: "Multi-year",
          text: "A concrete water tank was constructed for Lalish as part of BCF's longer-term WASH infrastructure work.",
          textAr:
            "تم إنشاء خزان مياه خرساني في لالش ضمن مشاريع مؤسسة بارزاني الخيرية طويلة الأمد لتطوير البنية التحتية للمياه والإصحاح.",
          note: "The cumulative report does not specify a year.",
        },
      ],
    },
    {
      id: "camp",
      entries: [
        {
          year: "2023",
          text: "Ten camps managed in Nineveh, with NFI office activity also continuing.",
          textAr: "أدارت المؤسسة 10 مخيمات في نينوى، مع استمرار أنشطة المواد غير الغذائية.",
        },
        {
          year: "2024",
          text: "Camp coordination and multi-sector services remained active across displacement sites.",
          textAr:
            "كما استمرت أعمال تنسيق المخيمات وتقديم الخدمات متعددة القطاعات في مواقع النزوح.",
        },
      ],
    },
    {
      id: "disability",
      entries: [
        {
          year: "2021",
          text: "208 mobility-aid beneficiaries in Nineveh.",
          textAr: "استفاد 208 أشخاص في نينوى من المعينات الحركية.",
        },
        {
          year: "2022",
          text: "115 disability-support beneficiaries.",
          textAr: "كما استفاد 115 شخصاً من خدمات دعم ذوي الهمم.",
        },
      ],
    },
    {
      id: "protection",
      entries: [
        {
          year: "2024",
          text: "Nineveh was included in protection-sector programmes.",
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
          textAr:
            "يباشر مشروع نوجين أنشطته في نينوى والموصل كجزء من برنامجه متعدد المكاتب لدعم الأسرة.",
          note: "15 families in 2025 and 12 in 2026 are project-wide totals across all offices, not Nineveh counts.",
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
          textAr:
            "استجابت الحملة الإغاثية الكبرى المبكرة لمؤسسة بارزاني الخيرية (BCF) لكارثة التفجيرات في جير أوذر وسيما شيخ خضر بمنطقة سنجار، والتي تعد واحدة من أولى الاستجابات الطارئة واسعة النطاق للمؤسسة.",
        },
        {
          year: "2014",
          text: "After the ISIS attack and the Yazidi genocide, BCF delivered aid to Mount Sinjar by helicopter.",
          textAr:
            "بعد هجوم داعش والإبادة الجماعية للإيزيديين، قامت مؤسسة بارزاني الخيرية بإيصال المساعدات إلى جبل سنجار عبر طائرات الهليكوبتر.",
          note: "Recounted in BCF's 2025 historical project article.",
        },
        {
          year: "2015",
          text: "BCF opened an office on Mount Sinjar and supported displaced families with water, food, clothing and shelter; schools were built on the mountain with electricity and water.",
          textAr:
            "افتتحت مؤسسة بارزاني الخيرية مكتباً على جبل سنجار وقدمت الدعم للعائلات النازحة عبر توفير المياه، والغذاء، والملابس، والمأوى؛ كما بُنيت مدارس على الجبل مزودة بالكهرباء والمياه.",
        },
        {
          year: "2024",
          text: "The Restoration of Life project constructed 20 houses for families in Sinjar.",
          textAr: "شيد مشروع إعادة الحياة 20 منزلاً للعائلات في سنجار.",
        },
        {
          year: "2025",
          text: "BCF highlighted continued Restoration of Life work and ongoing support for roughly 300 orphans in Sinjar.",
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
          textAr: "أُدرجت سنجار ضمن نطاق مكتب مؤسسة بارزاني الخيرية وأنشطة دعم ذوي الهمم.",
        },
        {
          year: "2022",
          text: "A winter convoy delivered flour and fuel to 1,300 displaced families on Mount Sinjar and its surroundings.",
          textAr:
            "أودعت قافلة شتوية الطحين والوقود لـ 1,300 عائلة نازحة على جبل سنجار والمناطق المحيطة به.",
        },
        {
          year: "2026",
          text: "750 food baskets in Zummar and 500 across Sinjar, with further Ramadan and Eid assistance.",
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
          textAr: "بُنيت مدارس على جبل سنجار خلال فترة النزوح.",
          note: "From BCF's historical website account.",
        },
        {
          year: "2023",
          text: "Food parcels and sleeping sheets were provided to 80 Grade 12 girls travelling from Sinjar to Duhok and Semel for their final exams.",
          textAr:
            "قُدّمت طرود غذائية وأغطية نوم لـ 80 فتاة في الصف الثاني عشر كنّ مسافرات من سنجار إلى دهوك وسيميل لأداء امتحاناتهن النهائية.",
        },
        {
          year: "2024",
          text: "The final 50-school renovation programme included two schools in Sinjar.",
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
          textAr:
            "وصل مشروع الاعزاء - مسيرة كوردستان إلى 261 يتيماً في سنجار؛ وأبلغت مؤسسة بارزاني الخيرية بشكل منفصل عن تقديم دعم مستمر لنحو 300 يتيم في سنجار.",
        },
        {
          year: "2026",
          text: "The eighth Poland-linked Azizan phase delivered cash, food baskets, school bags, supplies and desks, with separate cash support for low-income families.",
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
          textAr:
            "غطت مشاريع الأمن الغذائي والأضاحي التابعة لمؤسسة بارزاني الخيرية منطقتي كرميان وكلار، حيث بلغ عدد المستفيدين من توزيع لحم الأضاحي 500 أسرة.",
        },
        {
          year: "2022",
          text: "2,610 hot meals reported in Garmian.",
          textAr: "تم توثيق وتوزيع 2,610 وجبة ساخنة في كرميان.",
        },
        {
          year: "2023",
          text: "The Qurbani meat project reached 1,188 families in Garmian.",
          textAr: "شمل مشروع لحم الأضاحي توزيع المساعدات على 1,188 عائلة في كرميان.",
        },
        {
          year: "2026",
          text: "Food baskets distributed in Kifri, Khanaqin, Rizgari and Darbandikhan, with Qurbani meat distributed in Darbandikhan.",
          textAr:
            "تواصلت جهود المؤسسة عبر توزيع السلال الغذائية في مناطق كفري، خانقين، رزكاري، ودربنديخان، إلى جانب توزيع لحم الأضاحي في قضاء دربنديخان.",
        },
      ],
    },
    {
      id: "emergency",
      entries: [
        {
          year: "2024",
          text: "The flood-relief project covered Kalar and Rzgari among the affected areas, distributing essential household and winter items.",
        },
      ],
    },
    {
      id: "disability",
      entries: [
        {
          year: "2021",
          text: "95 mobility-aid beneficiaries in Garmian.",
          textAr: "تزويد 95 مستفيداً بالمعينات الحركية والتنقل في كرميان.",
        },
        {
          year: "2022",
          text: "176 disability-support beneficiaries.",
          textAr: "تقديم خدمات الدعم والتمكين لـ 176 مستفيداً من دعم ذوي الهمم.",
        },
        {
          year: "2026",
          text: "Wheelchairs provided in Kalar.",
          textAr: "توفير وتوزيع الكراسي المتحركة في كلار.",
        },
      ],
    },
    {
      id: "protection",
      entries: [
        {
          year: "2024",
          text: "Garmian was included in protection-sector coverage.",
          textAr: "شملت تغطية قطاع الحماية في كرميان.",
        },
      ],
    },
    {
      id: "livelihood",
      entries: [
        {
          year: "2023",
          text: "Livelihood-sector activities were recorded through the Garmian office.",
          textAr: "سُجِّلَت أنشطة قطاع سبل العيش من خلال مكتب كرميان.",
        },
      ],
    },
    {
      id: "cash",
      entries: [
        {
          year: "2025",
          text: "The Azizan-Kurdistan March stage reached 454 orphans in Garmian.",
          textAr:
            "وصلت مرحلة مسيرة أعزاء كوردستان إلى 454 من الأعزاء في إدارة كرميان.",
        },
        {
          year: "2025-26",
          text: "Nujin operates in Garmian and Khanaqin.",
          textAr: "تعمل نوجين في كرميان وخانقين.",
          note: "15 families in 2025 and 12 in 2026 are project-wide totals across all offices, not Garmian counts.",
        },
        {
          year: "2026",
          text: "The Garmian office distributed cash support to low-income families.",
          textAr: "قام مكتب كرميان بتوزيع الدعم النقدي على العائلات ذات الدخل المحدود.",
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
          textAr: "شملت مشاريع الغذاء مدينة حلبجة؛ حيث وصل لحم الأضاحي (قرباني) إلى 500 أسرة.",
        },
        {
          year: "2022",
          text: "Food-sector distributions continued; 1,055 food-project beneficiaries were listed in the annual location table.",
          textAr:
            "استمرت توزيعات القطاع الغذائي؛ وتم إدراج 1,055 مستفيداً من مشروع الغذاء في جدول المواقع السنوي.",
        },
        {
          year: "2023",
          text: "Qurbani meat reached 400 families.",
          textAr: "وصل لحم الأضاحي إلى 400 عائلة.",
        },
        {
          year: "2024",
          text: "The Ramadan overview recorded 500 food parcels in Halabja.",
          textAr: "سُجِّلت 500 سلة غذائية ضمن نظرة عامة لشهر رمضان في حلبجة.",
          note: "Annual report and website Ramadan overviews cover different project scopes.",
        },
        {
          year: "2026",
          text: "Qurbani meat distributed to 235 families, with food and orphan-family assistance also continuing.",
          textAr:
            "وُزِّع لحم الأضاحي على 235 عائلة، مع استمرار مساعدات الغذاء وعوائل الأيتام.",
        },
      ],
    },
    {
      id: "health",
      entries: [
        {
          year: "2020",
          text: "COVID-19 medical assistance delivered to the Halabja Health Directorate.",
          textAr: "تقديم المساعدة الطبية الخاصة بـكوفيد-19 إلى مديرية صحة حلبجة.",
        },
      ],
    },
    {
      id: "education",
      entries: [
        {
          year: "2022",
          text: "Eleven of the 203 schools in the renovation programme were in Halabja.",
          textAr:
            "أحد عشر مدرسة من أصل 203 مدرسة في برنامج إعادة التأهيل كانت في حلبجة.",
        },
        {
          year: "2023",
          text: "Halabja Kindergarten opened under the Education and Development sector.",
          textAr: "تم افتتاح روضة أطفال حلبجة ضمن قطاع التعليم والتطوير.",
        },
      ],
    },
    {
      id: "nfi",
      entries: [
        {
          year: "2023",
          text: "NFI activity recorded through the Halabja office.",
          textAr: "تم تسجيل أنشطة المواد غير الغذائية عبر مكتب حلبجة.",
        },
        {
          year: "2024",
          text: "Halabja was included in the flood-relief NFI response.",
          textAr: "تم إدراج حلبجة ضمن استجابة الإغاثة من الفيضانات وتوفير المواد غير الغذائية.",
        },
      ],
    },
    {
      id: "disability",
      entries: [
        {
          year: "2021",
          text: "Two mobility-aid beneficiaries.",
          textAr: "تقديم مساعدات حركية لمستفيدين اثنين.",
        },
        {
          year: "2022",
          text: "Ten disability-support beneficiaries.",
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
          textAr:
            "أُدرج طلبة مدينة حلبجة ضمن برنامج تكريم الطلبة المتفوقين من الأعزاء للصف الثاني عشر.",
        },
        {
          year: "2025",
          text: "The Azizan-Kurdistan March stage reached 55 orphans in Halabja.",
          textAr: "استفاد 55 من الأعزاء في حلبجة من محطة مسيرة أعزاء كوردستان.",
        },
        {
          year: "2026",
          text: "Forty low-income families received US$200 each, and orphan families also received food and financial support.",
          textAr:
            "تم تقديم منح مالية بقيمة 200 دولار أمريكي لكل عائلة لـ 40 أسرة من ذوي الدخل المحدود، فضلاً عن استمرار تقديم المساعدات الغذائية والدعم المالي لعائلات الأعزاء.",
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
          textAr: "شملت سوران مشروع توزيع مساكن الشهداء المشترك بين أربيل وسوران.",
          note: "540 units project-wide; the exact city split is not published in the reviewed source.",
        },
      ],
    },
    {
      id: "nfi",
      entries: [
        {
          year: "2024",
          text: "The Warm Winter heater programme included schools in Soran.",
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
          textAr: "استفاد 62 شخصًا من المعينات الحركية في سوران.",
        },
        {
          year: "2021",
          text: "Mobility-aid beneficiaries in the surrounding administration: Rawanduz 16 and Sidakan 32.",
          textAr:
            "بلغ عدد المستفيدين من المعينات الحركية في الإدارات المحيطة: 16 في رواندز و32 في سيدكان.",
        },
        {
          year: "2026",
          text: "World Autism Awareness activities at the Mother Community Center involved 52 children.",
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
          textAr: "يعمل مشروع نوجين في سوران.",
          note: "15 families in 2025 and 12 in 2026 are project-wide totals across all offices, not Soran counts.",
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
          textAr: "شمل البرنامج النهائي لترميم 50 مدرسة أربع مدارس في زاخو.",
        },
        {
          year: "2026",
          text: "A five-month literacy and education project launched for 50 refugee children, including school supplies and clothing.",
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
          textAr: "استفاد 58 شخصاً من المعينات الحركية في زاخو.",
        },
        {
          year: "2026",
          text: "Wheelchairs distributed through the Zakho representative office in April.",
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
          textAr: "يمتد نطاق عمل مشروع نوجين ليشمل مدينة زاخو.",
          note: "15 families in 2025 and 12 in 2026 are project-wide totals across all offices, not Zakho counts.",
        },
      ],
    },
    {
      id: "community",
      entries: [
        {
          year: "2025",
          text: "A carpet project was announced for 62 mosques across Duhok Province and the Zakho administration.",
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
          textAr:
            "تلقى مخيم عقرة طروداً غذائية لصالح 243 أسرة لاجئة بدعم من كاريتاس الألمانية (Caritas Germany)، كما شمل دعم کورک الغذائي كلاً من دهوك وعقرة.",
        },
        {
          year: "2026",
          text: "300 Ramadan food baskets, and 250 families received Qurbani meat.",
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
          textAr: "يُسجّل التقرير التراكمي أعمال ترميم مستشفى الولادة في عقرة.",
          note: "No year is specified in the cumulative summary.",
        },
      ],
    },
    {
      id: "environment",
      entries: [
        {
          year: "2021",
          text: "The Akre Greening Project planted 10,000 oak saplings.",
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
          textAr:
            "المستفيدون من المعينات الحركية: العمادية 4، شيلادزي 3، ديرلوك 12، وسرسنك 8.",
        },
        {
          year: "2024",
          text: "The Amedi Smile Center, with Caritas Germany, served 159 beneficiaries.",
          textAr:
            "قدّم مركز الابتسامة في العمادية، بالتعاون مع كاريتاس الألمانية، خدماته لـ 159 مستفيداً.",
        },
        {
          year: "2026",
          text: "Special-care and autism-awareness activities continued at the Amedi-area centres.",
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
          textAr:
            "توسعت استجابة مؤسسة بارزاني الخيرية للزلزال لتشمل المناطق المتضررة في تركيا وسوريا؛ حيث تلقت عفرين مساعدات الأمن الغذائي، والمستلزمات غير الغذائية، ومساعدات الأضاحي.",
        },
        {
          year: "2023",
          text: "The Qurbani meat project in Afrin reached 2,702 families.",
          textAr: "استهدف مشروع لحوم الأضاحي في عفرين 2,702 عائلة.",
        },
        {
          year: "2026",
          text: "A large-scale response ran across Qamishlo, Hasakah, Amuda, Girke Lege, Derik, Tirbespiye, Derbasiye and the surrounding areas.",
          textAr:
            "نفذت استجابة واسعة النطاق شملت مناطق القامشلي، والحسكة، وعامودا، وجركي لگه، وديريك (المالكية)، وتربسبي، والدرباسية والمناطق المحيطة بها.",
        },
        {
          year: "2026",
          text: "BCF reported 415 truckloads of humanitarian aid and assistance to 29,070 families; 200 tons of flour supported the production and distribution of 3.36 million loaves.",
          textAr:
            "أعلنت مؤسسة بارزاني الخيرية عن إرسال 415 شاحنة محملة بالمساعدات الإنسانية لخدمة 29,070 عائلة؛ فضلاً عن دعم إنتاج وتوزيع 3.36 مليون رغيف خبز باستخدام 200 طن من الطحين.",
        },
        {
          year: "2026",
          text: "Food and NFI assistance continued in Afrin camps, alongside youth football, cultural and other community activities.",
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
          textAr: "تُدرج العيادة المتنقلة في عفرين ضمن مشاريع مؤسسة بارزاني الخيرية المستمرة.",
        },
        {
          year: "2026",
          text: "8,707 people received medical treatment or medicines, and 294 cartons of medicines and supplies were delivered in one month to hospitals and health centres including Derik, Chil Agha and Hasakah.",
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
          textAr:
            "درب مركز بارزاني للثقافة والتطوير في عفرين 213 مشاركاً على مهارات عملية موجهة نحو سوق العمل.",
        },
        {
          year: "2024",
          text: "The Afrin University student-support programme assisted 125 students.",
          textAr: "قدم برنامج دعم طلاب جامعة عفرين المساعدة لـ 125 طالباً وطالبة.",
        },
        {
          year: "2026",
          text: "A reading and writing educational course and youth-development activities continued in Afrin.",
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
          textAr:
            "وُزعت مساعدات عزيزان المالية على 192 فرداً من الأعزاء في قرى ونواحي عفرين، وتكرر تقديم مساعدات شهر كانون الأول (ديسمبر) 2025 لتصل إلى 192 فرداً من الأعزاء أيضاً.",
        },
        {
          year: "2025",
          text: "Azizan education and welfare support continued for the same 192 orphans.",
          textAr: "استمر تقديم الدعم التعليمي والرعائي لنفس الـ 192 فرداً من الأعزاء.",
        },
        {
          year: "2026",
          text: "Orphan and family-support services continued through the Afrin office.",
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
          textAr:
            "شمل مشروع الأمن الغذائي المدعوم من الكويت كلاً من بغداد، وديالى، وذي قار إلى جانب مواقع في كوردستان. حيث استفادت 14,100 أسرة في عموم المواقع المذكورة.",
        },
        {
          year: "2022",
          text: "The food-project location table included Anbar, with 126 beneficiaries listed in the prepared-food distribution table.",
          textAr:
            "تضمن جدول مواقع مشاريع الأغذية محافظة الأنبار، مع تسجيل 126 مستفيداً في جدول توزيع الأغذية الجاهزة.",
        },
        {
          year: "2023",
          text: "The Qurbani meat project included Anbar, reaching 480 families.",
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
          textAr: "أنشأت مؤسسة بارزاني الخيرية مخيماً يضم 400 كرفان في مدينة وان.",
        },
        {
          year: "2023",
          text: "Major earthquake response in Türkiye: rescue, hot meals, food, tents, medical aid and heavy equipment.",
          textAr:
            "الاستجابة للزلزال الكبير في تركيا: عمليات الإنقاذ، الوجبات الساخنة، المواد الغذائية، الخيام، المساعدات الطبية والمعدات الثقيلة.",
          note: "The cumulative report records 4,129 tents for Türkiye and Syria earthquake victims together.",
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
          textAr:
            "وسّعت الاستجابة للزلزال والبرامج المستمرة في عفرين من نطاق عمل مؤسسة بارزاني الخيرية في سوريا.",
        },
        {
          year: "2026",
          text: "The large Western Kurdistan response became one of BCF's biggest current cross-border operations.",
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
 * The span a city's own register covers, as "2007 - 2026". Undated entries are
 * excluded from the arithmetic rather than being pinned to a year they never
 * claimed; a city documented only by undated projects gets no span at all.
 */
export function bcfYearSpanFor(locationId: LocationId): string | null {
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
