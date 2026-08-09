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
  /** A scope caveat, shown beneath the entry. Only where the source carries one. */
  note?: string;
};

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
        },
        {
          year: "2022",
          text: "The hot-meal programme served 694,362 meals in Erbil, alongside food distributions continuing through partner projects.",
        },
        {
          year: "2023",
          text: "Qurbani meat reached 1,481 families, with regular food and non-food assistance continuing across Erbil and the camps.",
        },
        {
          year: "2024",
          text: "The Ramadan overview recorded 14,943 food parcels in Erbil; other Ramadan and food projects ran separately.",
          note: "Annual report and website Ramadan overviews cover different project scopes.",
        },
        {
          year: "2026",
          text: "Ramadan iftar at Erbil Park for 1,000 people daily, 500 Turaq food baskets, food for families of martyrs, Eid food baskets and camp food and flour assistance.",
        },
      ],
    },
    {
      id: "education",
      entries: [
        {
          year: "2020",
          text: "The 450 school-chairs project covered Halgurd Basic School in Erbil together with schools under the Sulaymaniyah and Penjwen directorates.",
        },
        {
          year: "2022",
          text: "Fifty of the 203 schools in the renovation programme were in Erbil.",
        },
        {
          year: "2024",
          text: "Fifteen schools renovated in Erbil, and a solar-electricity pilot installed at ten Erbil schools.",
        },
        {
          year: "2025",
          text: "The Orphans' Educational Project was officially announced in Erbil and operates across BCF offices and Kurdistan.",
        },
        {
          year: "2026",
          text: "First participation in the Kurdish Book Fair, education and awareness initiatives, and a new Capacity Development Center for Orphans and Widows announced in Erbil.",
        },
      ],
    },
    {
      id: "health",
      entries: [
        {
          year: "2020",
          text: "COVID-19 medical assistance delivered to Central Erbil Hospital as part of regional hospital support.",
        },
        {
          year: "2024",
          text: "The Center of Excellence for Complex Care was active, and Erbil hospitals also received patients through the mobility-service project.",
        },
        {
          year: "2026",
          text: "The memorandum for the Kurdistan Center of Excellence for Complex Care was renewed, and a mammography support project announced for the Erbil breast-disease centre.",
        },
      ],
    },
    {
      id: "wash",
      entries: [
        {
          year: "2021",
          text: "Emergency water response delivered 65,864,000 litres through 3,261 tanker runs to 65,220 families across Erbil Governorate.",
        },
        {
          year: "2022",
          text: "Well drilling and repair, pumps and generators in Kawrgosk, Qushtapa, Kasnazan-area villages and Ruvia, with related countryside water systems.",
        },
        {
          year: "2024",
          text: "Drinking-water support reported for 9,100 families in Erbil Governorate.",
        },
      ],
    },
    {
      id: "shelter",
      entries: [
        {
          year: "2015",
          text: "Three hundred caravans established in Bahirka Camp.",
          note: "Recorded in the cumulative 2005-2024 report.",
        },
        {
          year: "2019",
          text: "Khazir camp shelter support, including large tent projects with LDS Charities and Catholic Teufen.",
        },
        {
          year: "2021",
          text: "Two major flood responses in Erbil: 751 households assisted in October and 2,905 households in December.",
        },
        {
          year: "2023",
          text: "BCF responded again to flood-affected families in Erbil after heavy rains.",
        },
        {
          year: "2024",
          text: "The foundation stone was laid for BCF City in Qushtapa, and the shared Erbil/Soran martyrs' housing distribution took place.",
          note: "540 units project-wide; the Erbil-vs-Soran split is not published in the reviewed source.",
        },
        {
          year: "2025",
          text: "The first phase of BCF City moved into implementation in Qushtapa, including 180 houses for poor and low-income families.",
        },
      ],
    },
    {
      id: "disability",
      entries: [
        {
          year: "2015",
          text: "The mobility-aid project launched with LDS Charities and continued in later years.",
        },
        { year: "2021", text: "389 people in Erbil received wheelchairs or other mobility aids." },
        { year: "2022", text: "326 beneficiaries recorded in Erbil." },
        {
          year: "2026",
          text: "Wheelchairs and other disability support continued: ten wheelchairs distributed in March, with further support in April.",
        },
      ],
    },
    {
      id: "camp",
      entries: [
        {
          year: "2021",
          text: "BCF managed nine IDP and refugee camps plus one host-community camp in Erbil Governorate; clothing, blanket and household-item projects supported Harsham, Hasan Sham, Bahirka, Debaga and others.",
        },
        {
          year: "2021-26",
          text: "Recurring food, NFI, winter, health and camp-support projects operated in Bahirka, Hasan Sham, Khazir, Debaga, Qushtapa, Basirma, Darashakran and Harsham.",
        },
        {
          year: "2023",
          text: "Seven camps managed in Erbil, and more than 300,000 Iranian pilgrims temporarily accommodated in Sami Abdulrahman Park with food, water and health services.",
        },
        {
          year: "2024",
          text: "The Warm Winter programme distributed heaters to schools in Erbil; camp coordination remained one of BCF's largest sectors.",
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
        },
        {
          year: "2021",
          text: "Erbil joined the academic-excellence programme honouring top Grade 12 orphan students.",
        },
        {
          year: "2025",
          text: "The Azizan-Kurdistan March stage reached 802 orphans in Erbil, and the educational project launched in the city.",
        },
        {
          year: "2025-26",
          text: "Nujin operates in Erbil.",
          note: "15 families in 2025 and 12 in 2026 are project-wide totals across all offices, not Erbil counts.",
        },
        {
          year: "2026",
          text: "The Capacity Development Center for Orphans and Widows was announced, and food, clothing and family assistance continued.",
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
        },
        {
          year: "2022",
          text: "60,788 hot meals reported in Duhok, with annual food-distribution projects continuing.",
        },
        {
          year: "2024",
          text: "The Ramadan overview recorded 13,931 food parcels in Duhok Governorate.",
          note: "Annual report and website Ramadan overviews cover different project scopes.",
        },
        {
          year: "2026",
          text: "A free-bread Ramadan project ran through 13 bakeries across Duhok-area districts, alongside Semel food baskets and large flour distributions to camp families.",
        },
      ],
    },
    {
      id: "health",
      entries: [
        { year: "2020", text: "COVID-19 medical supplies delivered to the Duhok Health Directorate." },
        {
          year: "2021",
          text: "A COVID vaccination centre opened in Domiz 1 Camp, and medical equipment and supplies were delivered to five Duhok hospitals and camp facilities.",
        },
        {
          year: "2025",
          text: "The Mobile Medical Clinic project launched for camps in Duhok Province; 17 Kurdish children were also sent to Germany for examination and treatment through a partner programme.",
        },
        {
          year: "2026",
          text: "BCF noted plans for an autism centre in Duhok, in addition to the existing centres elsewhere.",
        },
      ],
    },
    {
      id: "education",
      entries: [
        {
          year: "2022",
          text: "Twenty of the 203 schools in the renovation programme were in Duhok.",
        },
        { year: "2024", text: "Fourteen schools renovated in Duhok in the final annual report." },
        {
          year: "2025",
          text: "A solar-electricity project was announced for ten schools in Duhok Province.",
        },
      ],
    },
    {
      id: "shelter",
      entries: [
        { year: "2016", text: "Six hundred caravans established in Darkar Ajam Camp." },
        {
          year: "2021",
          text: "188 shelters built in Sharya Camp in cooperation with LDS Charities.",
          note: "Recorded in the cumulative 2005-2024 report.",
        },
        {
          year: "2022",
          text: "The Duhok martyrs' housing project completed 420 residential units in Roj City.",
          note: "First phase 368, second phase 52. Use 420 as the complete project; 368 is only the first phase.",
        },
        {
          year: "2024-26",
          text: "Camp shelter and winter support continued through BCF's regular camp programmes.",
        },
      ],
    },
    {
      id: "camp",
      entries: [
        { year: "2021", text: "BCF managed 20 IDP and refugee camps in Duhok Governorate." },
        {
          year: "2021-26",
          text: "Recurring food, NFI, winter, health and camp-support projects operated in Khanke, Domiz, Sharya and other Duhok-area sites.",
        },
        { year: "2023", text: "Thirteen camps managed in Duhok." },
        {
          year: "2024",
          text: "The Warm Winter heater project included Duhok schools, and flood-relief NFI support covered affected Duhok locations.",
        },
        {
          year: "2026",
          text: "Food, flour, white oil and other assistance continued across Duhok camps; Eid projects included major flour support for displaced families.",
        },
      ],
    },
    {
      id: "disability",
      entries: [
        { year: "2015", text: "The mobility-aid project launched and continued in Duhok." },
        { year: "2021", text: "154 mobility-aid beneficiaries in Duhok." },
        { year: "2022", text: "106 beneficiaries in Duhok." },
        {
          year: "2026",
          text: "Eight wheelchairs distributed in May, with disability-support activities continuing.",
        },
      ],
    },
    {
      id: "livelihood",
      entries: [
        {
          year: "2023",
          text: "Livelihood-sector activity continued through the Duhok office and its vocational centres.",
        },
        {
          year: "2026",
          text: "The Kurdivia fruit-drying and green-garden initiative was implemented at the University of Duhok with the American Corner.",
        },
      ],
    },
    {
      id: "cash",
      entries: [
        {
          year: "2012",
          text: "Orphan sponsorship — the Kurdistan project — operates across Duhok and the other offices.",
        },
        { year: "2025", text: "The Azizan-Kurdistan March stage reached 594 orphans in Duhok." },
        {
          year: "2025-26",
          text: "Nujin operates in Duhok.",
          note: "15 families in 2025 and 12 in 2026 are project-wide totals across all offices, not Duhok counts.",
        },
        {
          year: "2026",
          text: "The Duhok office organised activities and cash support for orphaned children and their families.",
        },
      ],
    },
    {
      id: "community",
      entries: [
        {
          year: "2025",
          text: "A community-support project announced carpets for 62 mosques across Duhok Province and the Zakho administration.",
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
        },
        { year: "2022", text: "3,550 hot meals reported in Sulaymaniyah." },
        { year: "2023", text: "The Qurbani meat project reached 1,149 families." },
        {
          year: "2024",
          text: "The Ramadan overview recorded 2,605 food parcels.",
          note: "Annual report and website Ramadan overviews cover different project scopes.",
        },
        {
          year: "2026",
          text: "400 Ramadan food baskets, support for 75 families and teachers in the Penjwen area, and 500 food baskets to families of persons with disabilities.",
        },
      ],
    },
    {
      id: "education",
      entries: [
        {
          year: "2020",
          text: "The school-chair project also covered schools under the Sulaymaniyah and Penjwen education directorates.",
        },
        {
          year: "2022",
          text: "Fifty of the 203 schools in the renovation programme were in Sulaymaniyah.",
        },
      ],
    },
    {
      id: "nfi",
      entries: [
        {
          year: "2023",
          text: "The NFI sector recorded 22,297 individual beneficiaries through the Sulaymaniyah office.",
        },
      ],
    },
    {
      id: "disability",
      entries: [
        { year: "2021", text: "125 mobility-aid beneficiaries." },
        { year: "2022", text: "115 beneficiaries." },
        {
          year: "2026",
          text: "Eleven wheelchairs in May; food support also targeted 250 people with special needs in March and 500 disability-linked families in May.",
        },
      ],
    },
    {
      id: "protection",
      entries: [
        {
          year: "2024",
          text: "Sulaymaniyah was included in BCF's protection-sector geographic coverage.",
        },
      ],
    },
    {
      id: "cash",
      entries: [
        {
          year: "2021",
          text: "Sulaymaniyah students were included in the top Grade 12 orphan recognition programme.",
        },
        {
          year: "2025",
          text: "The Azizan-Kurdistan March stage reached 561 orphans in Sulaymaniyah.",
        },
        {
          year: "2025-26",
          text: "Nujin operates in Sulaymaniyah.",
          note: "15 families in 2025 and 12 in 2026 are project-wide totals across all offices, not Sulaymaniyah counts.",
        },
        {
          year: "2026",
          text: "Two March cash projects supported 100 families with IQD 200,000 each and another 100 families with US$200 each.",
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
        },
        { year: "2022", text: "3,500 hot meals reported in Kirkuk." },
        { year: "2023", text: "The Qurbani meat project reached 1,972 families." },
        {
          year: "2024",
          text: "The Ramadan overview recorded 6,750 food parcels.",
          note: "Annual report and website Ramadan overviews cover different project scopes.",
        },
        {
          year: "2026",
          text: "Prde food baskets for 200 families, and the 'Immortal Barzani, Symbol of Coexistence' project began with food and NFI support to 30 families.",
        },
      ],
    },
    {
      id: "education",
      entries: [
        {
          year: "2022",
          text: "Fifty-two of the 203 schools in the renovation programme were in Kirkuk.",
        },
        { year: "2024", text: "The final 50-school programme included five schools in Kirkuk." },
      ],
    },
    {
      id: "nfi",
      entries: [
        { year: "2023", text: "NFI activities recorded 3,850 individual beneficiaries." },
      ],
    },
    {
      id: "disability",
      entries: [
        { year: "2021", text: "121 mobility-aid beneficiaries." },
        { year: "2022", text: "220 disability-support beneficiaries." },
      ],
    },
    {
      id: "protection",
      entries: [{ year: "2024", text: "Kirkuk was included in protection-sector programmes." }],
    },
    {
      id: "livelihood",
      entries: [
        { year: "2023", text: "Livelihood-sector work continued through the Kirkuk office." },
      ],
    },
    {
      id: "cash",
      entries: [
        { year: "2025", text: "The Azizan-Kurdistan March stage reached 644 orphans in Kirkuk." },
        {
          year: "2025-26",
          text: "Nujin operates in Kirkuk.",
          note: "15 families in 2025 and 12 in 2026 are project-wide totals across all offices, not Kirkuk counts.",
        },
        {
          year: "2026",
          text: "Cash distributions reached 300 families with US$100 each and another 50 families with US$200 each.",
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
        },
        {
          year: "2022",
          text: "498,545 hot meals reported in Nineveh, with food-project beneficiaries also recorded in Nineveh and Zummar.",
        },
        { year: "2023", text: "The Qurbani meat project reached 1,815 families in Mosul." },
        {
          year: "2024",
          text: "The Ramadan overview recorded 6,500 food parcels in Mosul.",
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
        },
        {
          year: "2024",
          text: "Nineveh recorded major health-sector reach; Patient Mobility Services transported 525 patients from East Mosul camps to hospitals in Erbil and Mosul.",
        },
      ],
    },
    {
      id: "education",
      entries: [
        {
          year: "2022",
          text: "Twenty of the 203 schools in the renovation programme were in Nineveh.",
        },
        { year: "2024", text: "The final 50-school programme included five schools in Mosul." },
      ],
    },
    {
      id: "wash",
      entries: [
        {
          year: "Multi-year",
          text: "A concrete water tank was constructed for Lalish as part of BCF's longer-term WASH infrastructure work.",
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
        },
        {
          year: "2024",
          text: "Camp coordination and multi-sector services remained active across displacement sites.",
        },
      ],
    },
    {
      id: "disability",
      entries: [
        { year: "2021", text: "208 mobility-aid beneficiaries in Nineveh." },
        { year: "2022", text: "115 disability-support beneficiaries." },
      ],
    },
    {
      id: "protection",
      entries: [{ year: "2024", text: "Nineveh was included in protection-sector programmes." }],
    },
    {
      id: "livelihood",
      entries: [
        { year: "2023", text: "Livelihood-sector work recorded through the Nineveh office." },
      ],
    },
    {
      id: "cash",
      entries: [
        {
          year: "2025-26",
          text: "Nujin operates in Nineveh and Mosul as part of its multi-office family-support programme.",
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
        },
        {
          year: "2014",
          text: "After the ISIS attack and the Yazidi genocide, BCF delivered aid to Mount Sinjar by helicopter.",
          note: "Recounted in BCF's 2025 historical project article.",
        },
        {
          year: "2015",
          text: "BCF opened an office on Mount Sinjar and supported displaced families with water, food, clothing and shelter; schools were built on the mountain with electricity and water.",
        },
        {
          year: "2024",
          text: "The Restoration of Life project constructed 20 houses for families in Sinjar.",
        },
        {
          year: "2025",
          text: "BCF highlighted continued Restoration of Life work and ongoing support for roughly 300 orphans in Sinjar.",
        },
      ],
    },
    {
      id: "food",
      entries: [
        { year: "2021", text: "Sinjar was included in BCF office and disability-support activity." },
        {
          year: "2022",
          text: "A winter convoy delivered flour and fuel to 1,300 displaced families on Mount Sinjar and its surroundings.",
        },
        {
          year: "2026",
          text: "750 food baskets in Zummar and 500 across Sinjar, with further Ramadan and Eid assistance.",
        },
      ],
    },
    {
      id: "health",
      entries: [
        {
          year: "2026",
          text: "A Dental Health Unit opened at Zorava Community Health Center for free examination, consultation and treatment.",
        },
      ],
    },
    {
      id: "education",
      entries: [
        {
          year: "2015",
          text: "Schools were built on Mount Sinjar during the displacement period.",
          note: "From BCF's historical website account.",
        },
        {
          year: "2023",
          text: "Food parcels and sleeping sheets were provided to 80 Grade 12 girls travelling from Sinjar to Duhok and Semel for their final exams.",
        },
        {
          year: "2024",
          text: "The final 50-school renovation programme included two schools in Sinjar.",
        },
      ],
    },
    {
      id: "wash",
      entries: [{ year: "2016", text: "Four water wells drilled in the Sinjar Mountain area." }],
    },
    {
      id: "disability",
      entries: [{ year: "2021", text: "63 mobility-aid beneficiaries in Sinjar." }],
    },
    {
      id: "cash",
      entries: [
        {
          year: "2025",
          text: "The Azizan-Kurdistan March stage reached 261 orphans in Sinjar; BCF separately reported ongoing support for about 300 Sinjar orphans.",
        },
        {
          year: "2026",
          text: "The eighth Poland-linked Azizan phase delivered cash, food baskets, school bags, supplies and desks, with separate cash support for low-income families.",
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
        },
        { year: "2022", text: "2,610 hot meals reported in Garmian." },
        { year: "2023", text: "The Qurbani meat project reached 1,188 families in Garmian." },
        {
          year: "2026",
          text: "Food baskets distributed in Kifri, Khanaqin, Rizgari and Darbandikhan, with Qurbani meat distributed in Darbandikhan.",
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
        { year: "2021", text: "95 mobility-aid beneficiaries in Garmian." },
        { year: "2022", text: "176 disability-support beneficiaries." },
        { year: "2026", text: "Wheelchairs provided in Kalar." },
      ],
    },
    {
      id: "protection",
      entries: [{ year: "2024", text: "Garmian was included in protection-sector coverage." }],
    },
    {
      id: "livelihood",
      entries: [
        {
          year: "2023",
          text: "Livelihood-sector activities were recorded through the Garmian office.",
        },
      ],
    },
    {
      id: "cash",
      entries: [
        { year: "2025", text: "The Azizan-Kurdistan March stage reached 454 orphans in Garmian." },
        {
          year: "2025-26",
          text: "Nujin operates in Garmian and Khanaqin.",
          note: "15 families in 2025 and 12 in 2026 are project-wide totals across all offices, not Garmian counts.",
        },
        {
          year: "2026",
          text: "The Garmian office distributed cash support to low-income families.",
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
        },
        {
          year: "2022",
          text: "Food-sector distributions continued; 1,055 food-project beneficiaries were listed in the annual location table.",
        },
        { year: "2023", text: "Qurbani meat reached 400 families." },
        {
          year: "2024",
          text: "The Ramadan overview recorded 500 food parcels in Halabja.",
          note: "Annual report and website Ramadan overviews cover different project scopes.",
        },
        {
          year: "2026",
          text: "Qurbani meat distributed to 235 families, with food and orphan-family assistance also continuing.",
        },
      ],
    },
    {
      id: "health",
      entries: [
        {
          year: "2020",
          text: "COVID-19 medical assistance delivered to the Halabja Health Directorate.",
        },
      ],
    },
    {
      id: "education",
      entries: [
        {
          year: "2022",
          text: "Eleven of the 203 schools in the renovation programme were in Halabja.",
        },
        {
          year: "2023",
          text: "Halabja Kindergarten opened under the Education and Development sector.",
        },
      ],
    },
    {
      id: "nfi",
      entries: [
        { year: "2023", text: "NFI activity recorded through the Halabja office." },
        { year: "2024", text: "Halabja was included in the flood-relief NFI response." },
      ],
    },
    {
      id: "disability",
      entries: [
        { year: "2021", text: "Two mobility-aid beneficiaries." },
        { year: "2022", text: "Ten disability-support beneficiaries." },
      ],
    },
    {
      id: "cash",
      entries: [
        {
          year: "2021",
          text: "Halabja students were included in the top Grade 12 orphan recognition programme.",
        },
        { year: "2025", text: "The Azizan-Kurdistan March stage reached 55 orphans in Halabja." },
        {
          year: "2026",
          text: "Forty low-income families received US$200 each, and orphan families also received food and financial support.",
        },
      ],
    },
  ],

  soran: [
    {
      id: "food",
      entries: [
        { year: "2021", text: "The Korek food project reached 300 households in Soran." },
      ],
    },
    {
      id: "education",
      entries: [
        {
          year: "2024",
          text: "The final 50-school renovation programme included five schools in Soran.",
        },
      ],
    },
    {
      id: "shelter",
      entries: [
        {
          year: "2024",
          text: "Soran was included in the shared Erbil/Soran martyrs' housing distribution project.",
          note: "540 units project-wide; the exact city split is not published in the reviewed source.",
        },
      ],
    },
    {
      id: "nfi",
      entries: [
        { year: "2024", text: "The Warm Winter heater programme included schools in Soran." },
      ],
    },
    {
      id: "disability",
      entries: [
        { year: "2021", text: "62 mobility-aid beneficiaries in Soran." },
        {
          year: "2021",
          text: "Mobility-aid beneficiaries in the surrounding administration: Rawanduz 16 and Sidakan 32.",
        },
        {
          year: "2026",
          text: "World Autism Awareness activities at the Mother Community Center involved 52 children.",
        },
      ],
    },
    {
      id: "cash",
      entries: [
        {
          year: "2025-26",
          text: "Nujin operates in Soran.",
          note: "15 families in 2025 and 12 in 2026 are project-wide totals across all offices, not Soran counts.",
        },
      ],
    },
  ],

  zakho: [
    {
      id: "food",
      entries: [
        { year: "2026", text: "Food assistance distributed to low-income families in Zakho." },
      ],
    },
    {
      id: "education",
      entries: [
        {
          year: "2024",
          text: "The final 50-school renovation programme included four schools in Zakho.",
        },
        {
          year: "2026",
          text: "A five-month literacy and education project launched for 50 refugee children, including school supplies and clothing.",
        },
      ],
    },
    {
      id: "emergency",
      entries: [
        {
          year: "2026",
          text: "The Rizgari flood response supported 60 affected families with food and non-food items.",
        },
      ],
    },
    {
      id: "nfi",
      entries: [
        {
          year: "2024",
          text: "The Warm Winter heater project included Zakho, and the flood-relief NFI project also covered the area.",
        },
      ],
    },
    {
      id: "disability",
      entries: [
        { year: "2021", text: "58 mobility-aid beneficiaries in Zakho." },
        {
          year: "2026",
          text: "Wheelchairs distributed through the Zakho representative office in April.",
        },
      ],
    },
    {
      id: "cash",
      entries: [
        {
          year: "2025-26",
          text: "Nujin operates in Zakho.",
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
        },
        { year: "2026", text: "300 Ramadan food baskets, and 250 families received Qurbani meat." },
      ],
    },
    {
      id: "health",
      entries: [
        {
          year: "Historic",
          text: "The cumulative report records the renovation of the maternity hospital in Akre.",
          note: "No year is specified in the cumulative summary.",
        },
      ],
    },
    {
      id: "environment",
      entries: [
        { year: "2021", text: "The Akre Greening Project planted 10,000 oak saplings." },
      ],
    },
    {
      id: "cash",
      entries: [
        {
          year: "2026",
          text: "82 families and patients received cash assistance across several aid categories.",
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
        },
      ],
    },
    {
      id: "disability",
      entries: [
        {
          year: "2021",
          text: "Mobility-aid beneficiaries: Amedi 4, Shiladze 3, Dereluk 12 and Sarsang 8.",
        },
        {
          year: "2024",
          text: "The Amedi Smile Center, with Caritas Germany, served 159 beneficiaries.",
        },
        {
          year: "2026",
          text: "Special-care and autism-awareness activities continued at the Amedi-area centres.",
        },
      ],
    },
    {
      id: "cash",
      entries: [
        {
          year: "2026",
          text: "The Amedi representative office distributed support to 43 low-income families and patients.",
        },
      ],
    },
  ],

  afrin: [
    {
      id: "emergency",
      entries: [
        {
          year: "2023",
          text: "BCF's earthquake response expanded into affected areas of Türkiye and Syria; Afrin received food, NFI and Qurbani assistance.",
        },
        { year: "2023", text: "The Qurbani meat project in Afrin reached 2,702 families." },
        {
          year: "2026",
          text: "Food and NFI assistance continued in Afrin camps, alongside youth football, cultural and other community activities.",
        },
      ],
    },
    {
      id: "health",
      entries: [
        {
          year: "Ongoing",
          text: "The Mobile Clinic in Afrin is listed among BCF's ongoing projects.",
        },
      ],
    },
    {
      id: "education",
      entries: [
        {
          year: "2024",
          text: "The Barzani Culture & Development Center in Afrin trained 213 participants in practical, market-oriented skills.",
        },
        {
          year: "2024",
          text: "The Afrin University student-support programme assisted 125 students.",
        },
        {
          year: "2026",
          text: "A reading and writing educational course and youth-development activities continued.",
        },
      ],
    },
    {
      id: "cash",
      entries: [
        {
          year: "2025",
          text: "Azizan financial assistance was distributed to 192 orphans across Afrin villages and townships, and December 2025 assistance again reached 192 orphans.",
        },
        {
          year: "2025",
          text: "Azizan education and welfare support continued for the same 192 orphans.",
        },
        {
          year: "2026",
          text: "Orphan and family-support services continued through the Afrin office.",
        },
      ],
    },
  ],

  rojava: [
    {
      id: "emergency",
      entries: [
        {
          year: "2026",
          text: "A large-scale response ran across Qamishlo, Hasakah, Amuda, Girke Lege, Derik, Tirbespiye, Derbasiye and the surrounding areas.",
        },
        {
          year: "2026",
          text: "BCF reported 415 truckloads of humanitarian aid and assistance to 29,070 families; 200 tons of flour supported the production and distribution of 3.36 million loaves.",
        },
      ],
    },
    {
      id: "health",
      entries: [
        {
          year: "2026",
          text: "8,707 people received medical treatment or medicines, and 294 cartons of medicines and supplies were delivered in one month to hospitals and health centres including Derik, Chil Agha and Hasakah.",
        },
      ],
    },
    {
      id: "livelihood",
      entries: [
        {
          year: "2026",
          text: "370,245 litres of diesel were distributed to 9,682 families, and the humanitarian operation created 1,483 employment opportunities.",
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
        },
        {
          year: "2022",
          text: "The food-project location table included Anbar, with 126 beneficiaries listed in the prepared-food distribution table.",
        },
        { year: "2023", text: "The Qurbani meat project included Anbar, reaching 480 families." },
      ],
    },
    {
      id: "health",
      entries: [
        {
          year: "2021",
          text: "A medical convoy was sent to Samawah Governorate with 50 types of medicines and medical supplies.",
        },
      ],
    },
    {
      id: "community",
      entries: [
        {
          year: "2025",
          text: "Latest full-year geography: 73,006 beneficiary families — 493,380 individuals — in Iraq outside the Kurdistan Region.",
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
        { year: "2011-12", text: "BCF constructed a camp in Van with 400 caravans." },
        {
          year: "2023",
          text: "Major earthquake response in Türkiye: rescue, hot meals, food, tents, medical aid and heavy equipment.",
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
        },
        {
          year: "2026",
          text: "The large Western Kurdistan response became one of BCF's biggest current cross-border operations.",
        },
      ],
    },
    {
      id: "community",
      entries: [
        {
          year: "2025",
          text: "BCF reported 10,673 individual beneficiaries in Syria for the full year.",
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
