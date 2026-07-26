// Build gate. Exits non-zero if the dataset breaks any integrity rule.
// Run: npm run validate
//
// This runs BEFORE build in the npm script chain, so a violation cannot ship.

import { atlas } from "../src/data/atlas.ts";
import { isProvisional, isWikipedia, type AtlasEvent, type Lang } from "../src/data/schema.ts";
import { cardHeight } from "../src/data/layout.ts";
import { audit, columnOf, plate } from "../src/data/derived.ts";
import { quizVisibleStrings, redact } from "../src/data/quiz.ts";

const LANGS: Lang[] = ["en", "da"];
const errors: string[] = [];
const warnings: string[] = [];
const sameSource: string[] = [];

const themeIds = new Set(atlas.themes.map((t) => t.id));
const columnIds = new Set(atlas.columns.map((c) => c.id));
const seen = new Set<string>();

function bothLangs(v: Record<string, string> | undefined, where: string) {
  if (!v) return void errors.push(`${where}: missing text`);
  for (const l of LANGS) {
    if (!v[l] || !v[l].trim()) errors.push(`${where}: missing ${l.toUpperCase()} text`);
  }
}

for (const t of atlas.themes) {
  if (!columnIds.has(t.column)) errors.push(`theme "${t.id}": unknown column "${t.column}"`);
  bothLangs(t.name, `theme "${t.id}" name`);
}

for (const e of atlas.events as AtlasEvent[]) {
  const at = `event "${e.id ?? "?"}"`;
  if (!e.id) errors.push(`${at}: missing id`);
  else if (seen.has(e.id)) errors.push(`${at}: duplicate id`);
  seen.add(e.id);

  if (typeof e.year !== "number") errors.push(`${at}: missing/invalid year`);
  if (e.year < atlas.meta.minYear || e.year > atlas.meta.maxYear)
    errors.push(`${at}: year ${e.year} outside the atlas range`);
  if (e.endYear !== undefined && e.endYear < e.year) errors.push(`${at}: endYear before year`);
  if (!themeIds.has(e.theme)) errors.push(`${at}: unknown theme "${e.theme}"`);

  bothLangs(e.title, `${at} title`);
  bothLangs(e.summary, `${at} summary`);
  if (e.detail) bothLangs(e.detail, `${at} detail`);

  // Rule 1 — nothing renders without a source.
  if (!Array.isArray(e.sources) || e.sources.length === 0)
    errors.push(`${at}: NO SOURCE — build rule violated`);
  else
    for (const s of e.sources)
      if (!s.label?.trim()) errors.push(`${at}: source with no citation label`);

  // Rule 4 — contested means genuinely two-sided, not a label.
  if (e.confidence === "contested") {
    if (!e.readings || e.readings.length < 2)
      errors.push(`${at}: marked contested but carries fewer than two readings`);
    else
      for (const r of e.readings) {
        bothLangs(r.side, `${at} reading side`);
        bothLangs(r.text, `${at} reading text`);
        if (!r.source?.trim()) errors.push(`${at}: reading with no source`);
      }
  }
  if (e.readings && e.readings.length > 0 && e.confidence !== "contested")
    warnings.push(`${at}: has readings but is not marked contested`);

  // Rule 5 — a legend must never be dressed as a fact.
  if (e.confidence === "legendary" && !/legend|myth|sagn|tradition|story/i.test(e.summary.en))
    warnings.push(`${at}: marked legendary but the summary does not say so to the reader`);

  // Rule 4, second order — "two readings" is satisfiable by one encyclopaedia
  // summarising a debate with itself. That is one account formatted as two, and
  // it is the failure mode this rule exists to prevent. Warned, not failed:
  // where the disagreement really is recorded in a single reference work, the
  // record is still honest — it just is not independent.
  if (e.confidence === "contested" && (e.readings?.length ?? 0) >= 2) {
    const cited = new Set(e.readings!.map((r) => r.source.trim()));
    if (cited.size === 1) sameSource.push(e.id);
  }

  for (const f of e.figures ?? []) {
    bothLangs(f.label, `${at} figure label`);
    // Rule 0 — a figure's VALUE is reader-visible text too. It carries prose and
    // locale number/date formatting, so it is bilingual like everything else.
    bothLangs(f.value, `${at} figure value`);
    if (!f.source?.trim()) errors.push(`${at}: figure "${f.label?.en}" has no source`);
    // Rule 3 is the project's stated worst-possible error and was the only rule
    // with no machine check, because "basis is required when comparability is at
    // stake" is not a condition a program can evaluate. A population count is the
    // case where it is always at stake — Denmark's territory changes twice in the
    // series — so at least that much is checkable.
    if (!f.basis && /population|befolkning|folketal|indbygger/i.test(f.label?.en + " " + f.label?.da))
      warnings.push(`${at}: figure "${f.label?.en}" counts people but states no territorial basis`);
  }

  if ((e.lat === undefined) !== (e.lon === undefined))
    errors.push(`${at}: lat and lon must come together`);
  if (e.lat !== undefined && (e.lat < 54 || e.lat > 58.5 || e.lon! < 7 || e.lon! > 16))
    warnings.push(`${at}: coordinates outside Denmark's frame — intended?`);

}

for (const l of atlas.links) {
  if (!seen.has(l.from)) errors.push(`link ${l.from}→${l.to}: unknown source id`);
  if (!seen.has(l.to)) errors.push(`link ${l.from}→${l.to}: unknown target id`);
  bothLangs(l.relation, `link ${l.from}→${l.to} relation`);
}

// Rule 2 — Wikipedia-only records are reported every build so the debt stays
// visible and shrinking, rather than quietly permanent.
const provisional = (atlas.events as AtlasEvent[]).filter(isProvisional);
const partWiki = (atlas.events as AtlasEvent[]).filter(
  (e) => e.sources.some(isWikipedia) && !isProvisional(e)
);
const unverified = (atlas.events as AtlasEvent[]).filter((e) => e.sources.some((s) => s.unverified));

if (warnings.length) console.warn(warnings.map((w) => `WARN:  ${w}`).join("\n"));

if (errors.length) {
  console.error(errors.map((e) => `ERROR: ${e}`).join("\n"));
  console.error(`\nVALIDATION FAILED — ${errors.length} error(s).`);
  process.exit(1);
}

// Layout check — the packer's whole job is that no two cards in a column
// overlap. Run it over the real dataset and assert that, plus report how far
// the worst-displaced card sits from its true year: a card pushed decades down
// the plate is misinformation, even if nothing visibly collides.
{
  // Not a mirror of the page — the same function the page calls. A gate that
  // rebuilds the layout its own way can only prove things about its own version.
  const { events: sorted, scale, placed } = plate();
  const { bands } = scale;

  // A band whose rate is far off the plate average is a scale break the axis
  // must be showing the reader.
  const avg = bands.reduce((s, b) => s + b.height, 0) / (atlas.meta.maxYear - atlas.meta.minYear);
  const steep = bands.filter((b) => b.rate > avg * 2.5).map((b) => b.id);

  const byCol = new Map<string, { top: number; bottom: number; id: string }[]>();
  for (const e of sorted) {
    const p = placed.get(e.id)!;
    if (p.offset < -0.001) throw new Error(`layout: ${e.id} placed ABOVE its year`);
    const col = columnOf(e);
    const row = { top: p.top, bottom: p.top + cardHeight(e.title), id: e.id };
    (byCol.get(col) ?? byCol.set(col, []).get(col)!).push(row);
  }
  for (const [col, cards] of byCol) {
    cards.sort((a, b) => a.top - b.top);
    for (let i = 1; i < cards.length; i++)
      if (cards[i].top < cards[i - 1].bottom)
        throw new Error(`layout: ${cards[i].id} overlaps ${cards[i - 1].id} in column ${col}`);
  }

  const worst = [...placed.entries()].sort((a, b) => b[1].offset - a[1].offset)[0];
  const displaced = [...placed.values()].filter((p) => p.offset > 2).length;
  const worstYear = atlas.events.find((x) => x.id === worst[0])!.year;
  const worstBand = bands.find((b) => worstYear >= b.from && worstYear < b.to) ?? bands[0];
  const worstYears = worst[1].offset / worstBand.rate;
  console.log(
    `    layout: no overlaps · ${displaced}/${atlas.events.length} displaced · ` +
      `worst "${worst[0]}" +${worstYears.toFixed(1)} yr · ` +
      `compressed bands: ${steep.join(", ") || "none"}`
  );
  if (worstYears > 25)
    console.warn(`WARN:  layout: "${worst[0]}" sits ${worstYears.toFixed(0)} yr below its date`);
}

// The quiz clue must not contain its own answer. Before the redaction rule was
// tightened this was live for 32 of 107 events, 13 of which printed their exact
// year in the first clause of the prompt. Checked on the built strings so that
// every event added to the atlas is covered without anyone remembering to.
{
  const LEAK = /\b(?:1\d{3}|20[0-3]\d|[6-9]\d{2})\b|\b\d{3,4}-?tallet\b|\b\d{3,4}s\b|\b\d{1,2}\.?\s*århundrede\b/gi;
  // A regnal number dates a fragment to the decade for any Danish reader, so it
  // is an answer leak even though it contains no year. Both notations, and the
  // genitive of each: "Christian IV", "Christian 4.", "Christian 3.s hær".
  const REGNAL = /\b[A-ZÆØÅ][a-zæøå]{2,}\s+(?:[IVXL]{1,5}|\d{1,2}\.)(?:'?s)?(?=[\s,.;:)'’]|$)/g;
  const leaks: string[] = [];
  for (const e of atlas.events)
    for (const t of quizVisibleStrings(e)) {
      const r = redact(t);
      for (const m of r.matchAll(REGNAL))
        leaks.push(`${e.id}: regnal "${m[0]}" survives redaction`);
      for (const m of r.matchAll(LEAK)) {
        // A digit group inside a preserved figure ("620,000") is not a date.
        const after = r.slice(m.index + m[0].length);
        const before = r.slice(0, m.index);
        if (/^[.,]\d{3}/.test(after) || /[\d.,]$/.test(before)) continue;
        leaks.push(`${e.id}: "${m[0]}" survives redaction in "${r.slice(Math.max(0, m.index - 30), m.index + 30)}"`);
      }
    }
  if (leaks.length) {
    console.error(leaks.map((l) => `ERROR: quiz leak — ${l}`).join("\n"));
    console.error(`\nVALIDATION FAILED — ${leaks.length} clue(s) contain their own answer.`);
    process.exit(1);
  }
  console.log(`    quiz: no answer leaks across ${atlas.events.length} events' clues, titles, figures and readings`);
}

const pct = ((provisional.length / atlas.events.length) * 100).toFixed(1);
console.log(
  `OK: ${atlas.events.length} events · ${atlas.themes.length} themes in ${atlas.columns.length} columns · every event sourced, EN+DA complete.`
);
console.log(
  `    sourcing debt: ${provisional.length} Wikipedia-only (${pct}%) · ${partWiki.length} partly Wikipedia · ${unverified.length} citing an unverified source`
);

// The same audit the page publishes. Printing it here too means the number a
// reader sees and the number the build sees cannot drift apart.
const a = audit();
console.log(
  `    independence: ${a.singleSource}/${a.events} rest on a single citation · ` +
    `${a.topHostShare}% of ${a.urls} URLs are ${a.topHost} · ` +
    `${a.contestedOneSource}/${a.contested} contested records cite one work for both readings`
);
if (sameSource.length)
  console.warn(
    `WARN:  ${sameSource.length} contested record(s) cite the same source for every reading — ` +
      `rule 4 is satisfied in form, not in evidence: ${sameSource.slice(0, 6).join(", ")}` +
      (sameSource.length > 6 ? ` +${sameSource.length - 6} more` : "")
  );
