/**
 * Apply final Kurdish copy from bcf-kurdish-final.txt to bcfProjectData.ts
 * (textKu / noteKu) and patch common bcfContent.ts ku strings.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import url from "node:url";
import esbuild from "esbuild";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BUNDLE = path.join(ROOT, "scripts", ".apply-kurdish.bundle.mjs");
const FINAL = path.join(ROOT, "bcf-kurdish-final.txt");
const PROJECT_DATA = path.join(
  ROOT,
  "src/components/Sections/bcf/bcfProjectData.ts",
);
const CONTENT = path.join(ROOT, "src/components/Sections/bcf/bcfContent.ts");

await esbuild.build({
  absWorkingDir: ROOT,
  entryPoints: [path.join(__dirname, "dump-bcf-english-entry.mts")],
  outfile: BUNDLE,
  bundle: true,
  platform: "node",
  format: "esm",
  packages: "external",
  alias: { "@": path.join(ROOT, "src") },
});

const { bcfCopy, BCF_PROJECT_DATA } = await import(
  url.pathToFileURL(BUNDLE).href
);

const finalText = await fs.readFile(FINAL, "utf8");
const lines = finalText.split("\n");

function parseProjectEntries() {
  const start = lines.findIndex((l) =>
    l.includes("PAGE: Projects (city / sector register)"),
  );
  if (start < 0) throw new Error("Projects section not found");

  const entries = [];
  let locId = null;
  let sectorId = null;
  let current = null;

  const locByName = Object.fromEntries(
    Object.entries(bcfCopy.ku.locations).map(([id, loc]) => [loc.name, id]),
  );

  const sectorByName = Object.fromEntries(
    Object.entries(bcfCopy.ku.projects.sectors).map(([id, name]) => [name, id]),
  );

  for (let i = start; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("PAGE: Our Impact")) break;

    const locMatch = line.match(/^--- Projects — (.+) ---$/);
    if (locMatch) {
      locId = locByName[locMatch[1].trim()];
      if (!locId) {
        console.warn("Unknown location:", locMatch[1]);
      }
      continue;
    }

    const sectorMatch = line.match(/^\[(.+)\]$/);
    if (sectorMatch) {
      sectorId = sectorByName[sectorMatch[1].trim()];
      if (!sectorId) console.warn("Unknown sector:", sectorMatch[1]);
      continue;
    }

    const entryMatch = line.match(/^(.+?) — (.+)$/);
    if (entryMatch && locId && sectorId) {
      if (current) entries.push(current);
      current = {
        locId,
        sectorId,
        year: entryMatch[1].trim(),
        textKu: entryMatch[2].trim(),
        noteKu: null,
      };
      continue;
    }

    if (current && line && !line.startsWith("---") && !line.startsWith("[")) {
      if (
        !line.startsWith("[ENGLISH") &&
        !line.match(/^(Historic|Ongoing|Multi-year)/)
      ) {
        current.noteKu = line;
      }
      entries.push(current);
      current = null;
    }
  }
  if (current) entries.push(current);
  return entries;
}

function escapeForTs(str) {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n");
}

async function applyProjectData(parsed) {
  let src = await fs.readFile(PROJECT_DATA, "utf8");
  let updates = 0;
  let misses = 0;

  for (const p of parsed) {
    const sectors = BCF_PROJECT_DATA[p.locId];
    if (!sectors) {
      misses++;
      continue;
    }
    const sector = sectors.find((s) => s.id === p.sectorId);
    if (!sector) {
      misses++;
      continue;
    }
    const entry = sector.entries.find((e) => e.year === p.year);
    if (!entry) {
      console.warn("No entry:", p.locId, p.sectorId, p.year);
      misses++;
      continue;
    }

    const oldText = entry.textKu ?? entry.text;
    if (oldText === p.textKu && (!p.noteKu || entry.noteKu === p.noteKu)) continue;

    const yearPattern = new RegExp(
      `(year:\\s*"${p.year.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[\\s\\S]*?textKu:\\s*\\n\\s*")([^"]*)(")`,
      "m",
    );
    const m = src.match(yearPattern);
    if (!m) {
      console.warn("Could not patch textKu for", p.locId, p.sectorId, p.year);
      misses++;
      continue;
    }
    if (m[2] !== p.textKu) {
      src = src.replace(m[0], `${m[1]}${escapeForTs(p.textKu)}${m[3]}`);
      updates++;
    }

    if (p.noteKu) {
      const notePattern = new RegExp(
        `(year:\\s*"${p.year.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[\\s\\S]*?noteKu:\\s*\\n\\s*")([^"]*)(")`,
        "m",
      );
      const nm = src.match(notePattern);
      if (nm && nm[2] !== p.noteKu) {
        src = src.replace(nm[0], `${nm[1]}${escapeForTs(p.noteKu)}${nm[3]}`);
        updates++;
      } else if (!nm && entry.note) {
        // insert noteKu after textAr block for this entry - skip complex insert
        console.warn("Note insert skipped:", p.locId, p.sectorId, p.year);
      }
    }
  }

  await fs.writeFile(PROJECT_DATA, src);
  console.log(`Project data: ${updates} field updates, ${misses} misses`);
}

async function applyContentPatches() {
  let src = await fs.readFile(CONTENT, "utf8");
  const kuStart = src.indexOf("  ku: {");
  const arStart = src.indexOf("  ar: {", kuStart);
  if (kuStart < 0 || arStart < 0) throw new Error("ku/ar blocks not found");

  const before = src.slice(0, kuStart);
  let ku = src.slice(kuStart, arStart);
  const after = src.slice(arStart);

  // Spelling normalisation in Kurdish block only
  ku = ku.replace(/دەزگای خێرخوازیی بارزانی/g, "دەزگای خێرخوازی بارزانی");
  ku = ku.replace(/خێرخوازیی بارزانی/g, "خێرخوازی بارزانی");

  const replacements = [
    ['enterHint: "دەستی لە هەر شوێنێک بدە"', 'enterHint: "دەست لە هەر شوێنێک بدە"'],
    ['quoteAttr: "— مەلا مستەفا بارزانی"', 'quoteAttr: "— مستەفا بارزانی"'],
    ['welcomeTitleBcf: "BCF"', 'welcomeTitleBcf: "دەزگای خێرخوازی بارزانی"'],
    [
      'welcomeBody: "چیرۆک، کاری مرۆیی، و کاریگەرییەکەمان پێکەوە ببینە."',
      'welcomeBody: "چیرۆک، کاری مرۆیی، و کاریگەرییەکانمان پێکەوە ببینە."',
    ],
    [
      '{ id: "humanity", title: "مرۆڤایەتی لە کردار" }',
      '{ id: "humanity", title: "مرۆڤایەتی بە کردار" }',
    ],
    ["هاوکاریی خۆراکی", "هاوکاری خۆراکی"],
    ["پشتگیریی خۆراک", "پشتگیری خۆراک"],
    ["هاوکاریی مرۆیی", "هاوکاری مرۆیی"],
    ["بێدەرەتان", "بێدارەکان"],
    ["کاراوان", "کاروان"],
    ['quoteAttr: "مەلا مستەفا بارزانی"', 'quoteAttr: "مستەفا بارزانی"'],
    [
      'body: "دەزگای خێرخوازی بارزانی لەسەر ئەم بنەمایە دامەزرا و بەردەوامە لە خزمەتکردن."',
      'body: "وتەی «شانازییە بۆ مرۆڤ خزمەتکاری میللەتی خۆی بێ» تەنها دروشمێک نییە؛ بەڵکو بنەمای ئەخلاقی کارەکانی دەزگای خێرخوازی بارزانییە. کاری مرۆیی بەخشینێک نییە لە سەرەوە، بەڵکو خزمەتکردنە بە کەرامەتەوە."',
    ],
    [
      'beyondSubtitle: "ئەو کارانەی BCF لە دەرەوەی نەخشەی هەرێمی کوردستان تۆماری کردوون."',
      'beyondSubtitle: "ئەو کارانەی دەزگای خێرخوازی بارزانی لە دەرەوەی نەخشەی هەرێمی کوردستان تۆماری کردوون."',
    ],
    [
      'sourceNote:\n    "لە ڕاپۆرتە ساڵانە فەرمییەکانی BCF، ڕاپۆرتی کۆی ٢٠٠٥-٢٠٢٤ و نوێکارییەکانی ماڵپەڕ کە لە ئابی ٢٠٢٦ پشتڕاست کراونەتەوە."',
      'sourceNote:\n    "لە ڕاپۆرتە ساڵانە فەرمییەکانی دەزگای خێرخوازی بارزانی، ڕاپۆرتی کۆی ٢٠٠٥-٢٠٢٤ و نوێکارییەکانی ماڵپەڕ کە لە ئابی ٢٠٢٦ پشتڕاست کراونەتەوە."',
    ],
    ['trustQualityTitle: "کوالیتی و باوەڕپێکراوی"', 'trustQualityTitle: "کوالێتی و باوەڕپێکراوی"'],
    [
      'body: "BCF بە فەرمی مۆڵەتی کارکردنی لە هەرێمی کوردستان هەیە، بە پابەندبوون بە یاسا هەرێمییەکان و پابەندییەکی بەهێز بە کۆمەڵگە ناوخۆییەکان."',
      'body: "دەزگای خێرخوازی بارزانی بە شێوەی فەرمی مۆڵەتی کارکردنی لە هەرێمی کوردستان هەیە، و هەموو کارەکانی بەپێی یاسا و ڕێنماییەکانی هەرێم ئەنجام دەدات. هەروەها بەردەوام پابەندە بە خزمەتکردن و پشتگیریکردنی کۆمەڵگا ناوخۆییەکان."',
    ],
    [
      'body: "BCF بە فەرمی مۆڵەتی کارکردنی لە کۆماری عێراق هەیە، بە پابەندبوون بە یاسا نیشتمانییەکان و پابەندییەکی بەهێز بە کۆمەڵگەکان لە سەرانسەری وڵاتدا."',
      'body: "دەزگای خێرخوازی بارزانی بە شێوەی فەرمی مۆڵەتی کارکردنی لە کۆماری عێراقدا هەیە، و هەموو کار و چالاکییەکانی بەپێی یاسا و ڕێنماییە نیشتیمانییەکان ئەنجام دەدات. هەروەها بەردەوام پابەندە بە خزمەتکردن و پشتگیریکردنی کۆمەڵگا لە سەرانسەری عێراق."',
    ],
    [
      'body: "تۆمارکراوە بۆ کارکردن لە ئەمریکا، بۆ هاوبەشی شفاف و پشتگیری مرۆیی بەرپرسیار."',
      'body: "بە شێوەی فەرمی مۆڵەتی کارکردنی لە ویلایەتە یەکگرتووەکانی ئەمریکا هەیە. ئەمەش ڕێگە دەدات هاوبەشییەکان بە شەفافی ئەنجام بدرێن و یارمەتییە مرۆییەکان بۆ دەرەوەی سنوورەکان بە شێوەیەکی بەرپرسیارانە بگوازرێنەوە."',
    ],
    [
      'title: "ناسراو لە کوێت"',
      'title: "باوەڕپێکراو لە کوێت"',
    ],
    [
      'body: "لە ساڵی ٢٠١٩ وەک ڕێکخراوێکی خێرخوازی لە کوێت تۆمارکراوە."',
      'body: "لە ساڵی ٢٠١٩ وەک ڕێکخراوێکی خێرخوازی لە کوێت بە فەرمی تۆمارکرا، و بەو شێوەیە دەزگای خێرخوازی بارزانی توانی چالاکییە مرۆییە مۆڵەتپێدراوەکانی لە ناوچەکەدا فراوانتر بکات."',
    ],
    [
      'body: "ناسراو لە چوارچێوەی کۆمیسیۆنی خێرخوازی بەریتانیا بۆ حوکمڕانی و متمانەی گشتی."',
      'body: "باوەڕپێکراوە لە چوارچێوەی کۆمیسیۆنی خێرخوازی بەریتانیا بۆ حوکمڕانی و متمانەی گشتی."',
    ],
    [
      'body: "بڕوانامەی بەڕێوەبردنی کوالیتی: بەرپرسیارێتییەکان ڕوونن، سیستمەکان ڕێکخراون، و خزمەتگوزارییە مرۆییەکان بە کوالیتییەکی جێگیر پێشکەش دەکرێن."',
      'body: "بڕوانامەی بەڕێوەبردنی کوالێتی: بەرپرسیارێتییەکان ڕوونن، سیستمەکان ڕێکخراون، و خزمەتگوزارییە مرۆییەکان بە کوالێتییەکی جێگیر پێشکەش دەکرێن."',
    ],
    [
      'trustPartnershipsHint: "هاوبەش و بەخشەر و سپۆنسەرەکان لەگەڵ BCF"',
      'trustPartnershipsHint: "هاوبەش و بەخشەر و سپۆنسەرەکان لەگەڵ دەزگای خێرخوازی بارزانی"',
    ],
    [
      'detail:\n          "پێگەی ڕاوێژکاری لە ئەنجومەنی ئابووری و کۆمەڵایەتیی نەتەوە یەکگرتووەکان (ECOSOC) لە ساڵی ٢٠١٦ەوە، و بڕوانامەی بەڕێوەبردنی کوالیتی ISO 9001:2015."',
      'detail:\n          "پێگەی ڕاوێژکاری لە ئەنجومەنی ئابووری و کۆمەڵایەتی نەتەوە یەکگرتووەکان (ECOSOC) لە ساڵی ٢٠١٦ەوە، و بڕوانامەی بەڕێوەبردنی کوالێتی ISO 9001:2015."',
    ],
    ['futureCircle: "داهاتووی بنیاد دەنێین"', 'futureCircle: "داهاتوو بنیاد دەنێین"'],
    ['futureHeadingGold: "کە"', 'futureHeadingGold: "بنیاد دەنێین"'],
    ['futureHeadingRest: "بنیاد دەنێین"', 'futureHeadingRest: ""'],
    [
      'futureSubtitle:\n      "ئامانجە ستراتیژییەکان بۆ خەڵک، پەروەردە، نۆژەنکردنەوە، ژینگە و ئامادەکاری قەیران"',
      'futureSubtitle:\n      "ئامانجە ستراتیژییەکان سەرنج دەخاتە سەر خەڵک، پەروەردە، نۆژەنکردنەوە، ژینگە و بەرەنگاربوونەوەی قەیرانەکان"',
    ],
    ['"فراوانکردنی بەرنامەکانی ژیانی سەوز"', '"پەرەپێدانی بەرنامەکانی بژێوی سەوز"'],
    ['title: "ئامادەکاری قەیران"', 'title: "ئامادەکاری بۆ قەیران"'],
    ['"دانانی یارمەتی لە ڕێڕەوە سەرەکییەکان"', '"ئامادەکردنی یارمەتییەکان لە ڕێگەی ڕێڕەوە سەرەکییەکان"'],
    ['"ڕاهێنانی تیمە خێرا وەڵامدەرەکان"', '"ڕاهێنانی تیمەکانی فریاکەوتنی خێرا"'],
    ['"دووبارە دروستکردنەوەی ماڵ و شوێنە گشتییەکان"', '"نۆژەنکردنەوەی خانوو و شوێنە گشتییەکان"'],
    ['"فراوانکردنی خزمەتگوزارییەکانی گشتگیری"', '"فراوانکردنی خزمەتگوزارییە گشتییەکان بۆ خاوەن پێداویستییە تایبەتەکان"'],
    ['"پشتگیریکردنی گەڕانەوە و پێکەوەژیان"', '"پشتگیریکردنی ئاوەدانکردنەوە و پێکەوەژیان"'],
    ['title: "مافی مرۆڤ و چاکبوونەوە"', 'title: "مافی مرۆڤ و بوژانەوە"'],
    ['"پاراستنی کەرامەت لە هەموو بەرنامەیەکدا"', '"پاراستنی کەرامەتی مرۆڤ لە سەرجەم پڕۆگرامەکاندا"'],
    ['"دەستپێڕاگەیشتنی دادپەروەرانە بە خزمەتگوزارییەکان"', '"پەرەپێدانی دەستگەیشتنی دادپەروەرانە بە خزمەتگوزارییەکان"'],
  ];

  for (const [from, to] of replacements) {
    if (ku.includes(from)) ku = ku.replace(from, to);
    else if (!ku.includes(to)) console.warn("Missing replacement source:", from.slice(0, 60));
  }

  // BCF -> full name in Kurdish project textKu references inside ku block (projectsKu strings)
  ku = ku.replace(/\bBCF\b/g, "دەزگای خێرخوازی بارزانی");

  await fs.writeFile(CONTENT, before + ku + after);
  console.log("Applied bcfContent.ts ku patches");
}

const parsed = parseProjectEntries();
console.log(`Parsed ${parsed.length} project strings from final file`);
await applyProjectData(parsed);
await applyContentPatches();
