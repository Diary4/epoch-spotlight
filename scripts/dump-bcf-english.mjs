/**
 * Writes every on-screen string in the BCF experience, one file per language.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import url from "node:url";
import esbuild from "esbuild";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BUNDLE = path.join(ROOT, "scripts", ".dump-bcf-english.bundle.mjs");

const LANGS = {
  en: {
    file: "bcf-english-texts-for-translation.txt",
    title: "BCF — ENGLISH TEXTS FOR TRANSLATION",
    intro:
      "Every English phrase that appears on screen in the Barzani Charity Foundation experience.",
  },
  ku: {
    file: "bcf-kurdish-texts-for-translation.txt",
    title: "BCF — KURDISH TEXTS (on-screen copy)",
    intro:
      "Kurdish phrases shown when the experience is set to Kurdish. Section headings in this file stay in English so you can match them to the English list.",
  },
  ar: {
    file: "bcf-arabic-texts-for-translation.txt",
    title: "BCF — ARABIC TEXTS (on-screen copy)",
    intro:
      "Arabic phrases shown when the experience is set to Arabic. Section headings in this file stay in English so you can match them to the English list.",
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
  lines.push(
    "Names of people and organisations can stay as they are.",
  );
  if (langId !== "en") {
    lines.push(
      "Project register bodies use textKu / textAr when present; English is noted where a translation is still missing.",
    );
    lines.push(
      "A few accessibility labels stay English in the code: Experience controls, Previous image, Next image, Open image.",
    );
  }

  heading("SHARED CHROME (most pages)");
  add(c.home);
  add(c.language);
  add(c.back);
  add(c.close);
  add(c.tapToExplore);
  add("Experience controls");
  add("Barzani Charity Foundation");
  add("Previous image");
  add("Next image");
  add("Open image");

  heading("LANGUAGE OVERLAY");
  add(c.languageTitle);
  add(c.chooseLanguageHint);
  add(c.touchToContinue);
  c.languages.forEach((l) => add(l.label));

  heading("IDLE WARNING");
  add(c.idleTitle);
  add(c.idleBody);
  add(c.idleContinue);

  heading("PAGE: Attract (opening screen)");
  add(c.attractEyebrow);
  add(c.attractTagline);
  add(c.attractCaption);
  add(c.attractStart);
  add(c.enterHint);

  heading("PAGE: Intro");
  add(c.humanity);
  add(c.dignity);
  add(c.hope);
  add(c.quote);
  add(c.quoteAttr);

  heading("PAGE: Welcome");
  add(c.welcomeEyebrow);
  add(c.welcomeTitleBcf);
  add(c.welcomeTitleRest);
  add(c.welcomeBody);
  add(c.startJourney);

  heading("PAGE: Our Journey (chapter menu)");
  add(c.journeyEyebrow);
  add(c.journeyTitleLead);
  add(c.journeyTitleGold);
  add(c.journeySubtitle);
  c.journeyChapters.forEach((ch) => add(ch.title));

  heading("PAGE: Humanity in Action");
  add(c.whoWeServeWhite);
  add(c.whoWeServeGold);
  add(c.serveDetailCta);
  add(c.whoServesTitle);
  add(c.howServesTitle);
  add(c.whoHowHint);
  c.whoServesItems.forEach(add);
  c.howServesItems.forEach(add);
  for (const cat of c.serveCategories) {
    sub(`Sector: ${cat.title}`);
    add(cat.title);
    add(cat.intro);
    if (cat.headline) add(cat.headline);
    if (cat.beneficiaries) {
      add(c.serveBeneficiariesLabel);
      if (cat.beneficiaries.families) {
        add(`${cat.beneficiaries.families} ${c.serveFamiliesLabel}`);
      }
      if (cat.beneficiaries.individuals) {
        add(`${cat.beneficiaries.individuals} ${c.serveIndividualsLabel}`);
      }
    }
    for (const g of cat.groups) {
      add(g.title);
      g.items.forEach(add);
    }
  }

  heading("PAGE: Our Story");
  add(c.storyTimelineStart);
  add(c.storyTimelineEnd);
  add(c.storyScrollHint);
  for (const s of c.storySections) {
    sub(`Story section: ${s.titleGold} ${s.titleWhite}`.trim());
    add(s.titleGold);
    add(s.titleWhite);
    if (s.body) add(s.body);
  }
  sub("Values");
  c.storyValues.forEach((v) => add(v.title));
  sub("Timeline");
  c.storyMilestones.forEach((m) => {
    add(m.year);
    add(m.title);
    add(m.body);
  });

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

  heading("PAGE: Projects (city / sector register)");
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

  if (langId !== "en") {
    sub("Project entries (localised bodies; English fallback marked)");
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
          add(noteIsEnglish ? `[ENGLISH NOTE] ${note}` : note);
        }
      }
    }
  }

  heading("PAGE: Our Impact");
  add(c.ourImpact);
  add(c.impactTitleLead);
  add(c.impactTitleGold);
  add(c.impactSubtitle);
  for (const total of c.impactTotals ?? []) {
    sub(`Impact total: ${total.title}`);
    add(total.title);
    add(total.description);
  }
  for (const item of c.impactItems) {
    sub(`Impact card / gallery: ${item.title}`);
    add(item.value);
    if (item.valueLabel) add(item.valueLabel);
    if (item.secondaryValue) add(item.secondaryValue);
    if (item.secondaryLabel) add(item.secondaryLabel);
    add(item.title);
    add(item.description);
  }

  heading("PAGE: Trust Behind the Work");
  add(c.trustTitle);
  add(c.trustTitleGold);
  add(c.trustTitleRest);
  c.trustTopics.forEach((t) => add(t.title));

  sub("Leadership");
  add(c.trustLeadershipTitle);
  c.trustFounders.forEach((f) => {
    add(f.title);
    add(f.subtitle);
  });
  add(c.trustAdminBoardTitle);
  add(c.trustAdminBoardOpen);
  add(c.trustAdminBoardBody);
  for (const g of c.trustStaffGroups) {
    add(g.title);
    g.members.forEach((m) => {
      add(m.name);
      add(m.role);
    });
  }

  sub("Board Chief profile");
  addAll(c.boardChief);

  sub("BCF President profile");
  addAll(c.bcfPresident);

  sub("Founding Board member profile");
  addAll(c.bcfFounder);

  sub("Quality and Credibility");
  if (langId === "en") {
    add("Quality");
    add("and");
    add("Credibility");
  }
  add(c.trustQualityTitle);
  c.trustCredentials.forEach((cred) => {
    add(cred.title);
    add(cred.body);
  });

  sub("Partnerships");
  add(c.trustPartnershipsTitle);
  add(c.trustPartnershipsHint);
  add(c.trustPartnersLabel);
  add(c.trustDonorsLabel);
  add(c.trustSponsorsLabel);

  sub("Recognition");
  add(c.trustRecognitionTitle);
  add(c.trustRecognitionBody);
  c.trustRecognitionItems.forEach((item) => {
    add(item.title);
    add(item.detail);
  });

  heading("PAGE: Future");
  add(c.futureCircle);
  add(c.legacyCircle);
  add(c.futureHeadingWhite);
  add(c.futureHeadingGold);
  add(c.futureHeadingRest);
  add(c.futureSubtitle);
  for (const topic of c.futureTopics) {
    sub(topic.title);
    add(topic.title);
    topic.bullets.forEach(add);
  }

  heading("PAGE: Legacy");
  add(c.legacyTitleWhite);
  add(c.legacyTitleGold);
  add(c.legacyLead);
  add(c.legacyBridge);
  c.legacyPillars.forEach((p) => {
    add(p.titleWhite);
    add(p.titleGold);
  });
  add(c.legacyThanks);
  add(c.legacyThanksBody);
  add(c.legacyRestart);

  return lines.join("\n").replace(/\n{3,}/g, "\n\n") + "\n";
}

for (const langId of Object.keys(LANGS)) {
  const out = path.join(ROOT, LANGS[langId].file);
  await fs.writeFile(out, dumpLang(langId), "utf8");
  console.log(`Wrote ${out}`);
}

await fs.unlink(BUNDLE).catch(() => {});
