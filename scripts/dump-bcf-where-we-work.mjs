/**
 * Writes on-screen strings for the BCF "Where We Work" experience — maps,
 * location cards, project-register chrome, and every city/sector project entry.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import url from "node:url";
import esbuild from "esbuild";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BUNDLE = path.join(ROOT, "scripts", ".dump-bcf-where-we-work.bundle.mjs");

const LANGS = {
  en: {
    file: "bcf-where-we-work-english.txt",
    title: "BCF — WHERE WE WORK — ENGLISH",
    intro:
      "English copy for the Where We Work chapter: maps, location cards, project lists, and every documented project entry.",
  },
  ku: {
    file: "bcf-where-we-work-kurdish.txt",
    title: "BCF — WHERE WE WORK — KURDISH",
    intro:
      "Kurdish copy for the Where We Work chapter. Section headings stay in English for matching.",
  },
  ar: {
    file: "bcf-where-we-work-arabic.txt",
    title: "BCF — WHERE WE WORK — ARABIC",
    intro:
      "Arabic copy for the Where We Work chapter. Section headings stay in English for matching.",
  },
};

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

const { bcfCopy, BCF_PROJECT_DATA, BCF_SECTOR_2025_TOTALS } = await import(
  url.pathToFileURL(BUNDLE).href
);

function dumpLang(langId) {
  const c = bcfCopy[langId];
  const meta = LANGS[langId];
  const lines = [];

  function add(text) {
    const t = String(text ?? "").trim();
    if (!t) return;
    lines.push(t);
  }

  function addAll(value) {
    if (typeof value === "string") {
      add(value);
      return;
    }
    if (Array.isArray(value)) {
      value.forEach(addAll);
      return;
    }
    if (value && typeof value === "object") {
      Object.values(value).forEach(addAll);
    }
  }

  function heading(title) {
    lines.push("");
    lines.push("=".repeat(72));
    lines.push(title);
    lines.push("=".repeat(72));
    lines.push("");
  }

  function sub(title) {
    lines.push("");
    lines.push(`--- ${title} ---`);
    lines.push("");
  }

  heading(meta.title);
  lines.push(meta.intro);
  lines.push("Names of people and organisations can stay as they are.");

  heading("CHAPTER (Our Journey menu)");
  const mapChapter = c.journeyChapters.find((ch) => ch.id === "map");
  if (mapChapter) add(mapChapter.title);

  heading("PAGE: Where We Work — Kurdistan map");
  add(c.whereWeWork);
  add(c.across);
  add(c.borders);
  addAll(c.filters);
  add(c.mapScopes.kurdistan);
  add(c.projectsIn);
  for (const loc of Object.values(c.locations)) {
    sub(loc.name);
    add(loc.name);
    add(loc.short);
    add(loc.description);
    add(loc.explore);
  }

  heading("PAGE: Where We Work — Iraq map");
  add(c.mapScopes.iraq);
  add(c.iraqLegend.region);
  add(c.iraqLegend.federal);
  for (const place of Object.values(c.iraqPlaces)) {
    sub(place.name);
    add(place.name);
    add(place.short);
    add(place.note);
  }

  heading("PAGE: Where We Work — world / global map");
  add(c.mapScopes.global);
  add(c.globalLead);
  add(c.globalZoomHint);
  add(c.globeHint);
  add(c.viewGlobe);
  add(c.viewFlat);
  add(c.zoomIn);
  add(c.zoomOut);
  add(c.resetView);
  addAll(c.globalKinds);
  for (const loc of Object.values(c.globalLocations)) {
    sub(loc.name);
    add(loc.name);
    add(loc.meta);
    add(loc.description);
    (loc.facts ?? []).forEach(add);
  }

  heading("PAGE: Projects (city register — labels)");
  addAll(c.projects.sectors);
  addAll(c.projects.eras);
  addAll(c.projects.yearMarkers);
  add(c.projects.sectorsLabel);
  add(c.projects.sectorLabel);
  add(c.projects.entriesLabel);
  add(c.projects.entryLabel);
  add(c.projects.entriesShort);
  add(c.projects.yearsLabel);
  add(c.projects.timelineTitle);
  add(c.projects.beyondTitle);
  add(c.projects.beyondSubtitle);
  add(c.projects.orgTotalLabel);
  add(c.projects.orgTotalNote);
  add(c.projects.scopeNote);
  add(c.projects.sourceNote);
  sub("Organisation-wide 2025 totals (numbers)");
  Object.entries(BCF_SECTOR_2025_TOTALS).forEach(([id, n]) => {
    add(`${c.projects.sectors[id] ?? id}: ${n}`);
  });

  heading("PAGE: Projects — city and sector entries");
  if (langId !== "en") {
    lines.push(
      "Project bodies use textKu / textAr when present; English is noted where a translation is still missing.",
    );
    lines.push("");
  }

  for (const [locId, sectors] of Object.entries(BCF_PROJECT_DATA)) {
    const locName = c.locations[locId]?.name ?? locId;
    sub(`Projects — ${locName}`);
    for (const sector of sectors) {
      const sectorName = c.projects.sectors[sector.id] ?? sector.id;
      lines.push("");
      lines.push(`[${sectorName}]`);
      for (const entry of sector.entries) {
        const body =
          langId === "ku"
            ? entry.textKu
            : langId === "ar"
              ? entry.textAr
              : entry.text;
        const note =
          langId === "ku"
            ? entry.noteKu ?? entry.note
            : langId === "ar"
              ? entry.noteAr ?? entry.note
              : entry.note;
        if (body) {
          add(`${entry.year} — ${body}`);
        } else {
          add(`${entry.year} — [ENGLISH FALLBACK] ${entry.text}`);
        }
        if (note) {
          const noteIsEnglish =
            (langId === "ku" && !entry.noteKu && entry.note) ||
            (langId === "ar" && !entry.noteAr && entry.note);
          add(
            noteIsEnglish
              ? `${c.projects.scopeNote}: [ENGLISH NOTE] ${note}`
              : `${c.projects.scopeNote}: ${note}`,
          );
        }
      }
    }
  }

  heading("SHARED (opened from map)");
  add(c.back);
  add(c.close);
  add(c.tapToExplore);

  return lines.join("\n").replace(/\n{3,}/g, "\n\n") + "\n";
}

for (const langId of Object.keys(LANGS)) {
  const out = path.join(ROOT, LANGS[langId].file);
  await fs.writeFile(out, dumpLang(langId), "utf8");
  console.log(`Wrote ${out}`);
}

await fs.unlink(BUNDLE).catch(() => {});
