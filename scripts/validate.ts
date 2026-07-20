// Build gate. Exits non-zero if the dataset breaks any integrity rule.
// Run: npm run validate
//
// This runs BEFORE build in the npm script chain, so a violation cannot ship.

import { atlas } from "../src/data/atlas.ts";
import { isProvisional, isWikipedia, type AtlasEvent, type Lang } from "../src/data/schema.ts";
import { pack, timeScale } from "../src/data/layout.ts";

const LANGS: Lang[] = ["en", "da"];
const errors: string[] = [];
const warnings: string[] = [];

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

  for (const f of e.figures ?? []) {
    bothLangs(f.label, `${at} figure label`);
    // Rule 0 — a figure's VALUE is reader-visible text too. It carries prose and
    // locale number/date formatting, so it is bilingual like everything else.
    bothLangs(f.value, `${at} figure value`);
    if (!f.source?.trim()) errors.push(`${at}: figure "${f.label?.en}" has no source`);
  }

  if ((e.lat === undefined) !== (e.lon === undefined))
    errors.push(`${at}: lat and lon must come together`);
  if (e.lat !== undefined && (e.lat < 54 || e.lat > 58.5 || e.lon! < 7 || e.lon! > 16))
    warnings.push(`${at}: coordinates outside Denmark's frame — intended?`);

  if (e.image && !e.image.credit?.trim())
    errors.push(`${at}: image without a credit line`);
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
  const H = 42;
  const GAP = 6;
  const themeCol = new Map(atlas.themes.map((t) => [t.id, t.column]));
  const sorted = [...atlas.events].sort((a, b) => a.year - b.year);

  // Mirror the page: each decade sized to its densest column, then pack.
  const decades = [];
  for (let d = Math.floor(atlas.meta.minYear / 10) * 10; d < atlas.meta.maxYear; d += 10)
    decades.push({ id: `d${d}`, from: d, to: d + 10 });

  const needs = new Map<string, number>();
  for (const d of decades) {
    const stacks = new Map<string, number>();
    for (const e of sorted)
      if (e.year >= d.from && e.year < d.to) {
        const c = themeCol.get(e.theme)!;
        stacks.set(c, (stacks.get(c) ?? 0) + H + GAP);
      }
    needs.set(d.id, Math.max(0, ...stacks.values()));
  }
  const { y, bands } = timeScale(decades, needs);

  const items = sorted.map((e) => ({
    id: e.id,
    col: themeCol.get(e.theme)!,
    want: y(e.year),
    height: H
  }));
  const placed = pack(items, GAP);

  // A band whose rate is far off the plate average is a scale break the axis
  // must be showing the reader.
  const avg = bands.reduce((s, b) => s + b.height, 0) / (atlas.meta.maxYear - atlas.meta.minYear);
  const steep = bands.filter((b) => b.rate > avg * 2.5).map((b) => b.id);

  const byCol = new Map<string, { top: number; id: string }[]>();
  for (const it of items) {
    const p = placed.get(it.id)!;
    if (p.offset < -0.001) throw new Error(`layout: ${it.id} placed ABOVE its year`);
    (byCol.get(it.col) ?? byCol.set(it.col, []).get(it.col)!).push({ top: p.top, id: it.id });
  }
  for (const [col, cards] of byCol) {
    cards.sort((a, b) => a.top - b.top);
    for (let i = 1; i < cards.length; i++)
      if (cards[i].top < cards[i - 1].top + H)
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

const pct = ((provisional.length / atlas.events.length) * 100).toFixed(1);
console.log(
  `OK: ${atlas.events.length} events · ${atlas.themes.length} themes in ${atlas.columns.length} columns · every event sourced, EN+DA complete.`
);
console.log(
  `    sourcing debt: ${provisional.length} Wikipedia-only (${pct}%) · ${partWiki.length} partly Wikipedia · ${unverified.length} citing an unverified source`
);
