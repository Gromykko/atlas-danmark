// Lookups derived from the dataset.
//
// These three were copy-pasted into index.astro, spil.astro and validate.ts.
// Three copies of "which column does this event sit in" is three chances for
// the plate, the game and the build gate to disagree about the same event.

import { atlas } from "./atlas.ts";
import { isProvisional, isWikipedia } from "./schema.ts";
import type { AtlasEvent, ColumnId, Era, Theme, ThemeId } from "./schema.ts";
import { CARD_GAP, cardHeight, pack, timeScale } from "./layout.ts";

const themes = new Map<ThemeId, Theme>(atlas.themes.map((t) => [t.id, t]));

export const themeOf = (e: AtlasEvent): Theme => themes.get(e.theme)!;
export const columnOf = (e: AtlasEvent): ColumnId => themes.get(e.theme)!.column;
export const eraOf = (e: AtlasEvent): Era =>
  atlas.eras.find((r) => e.year >= r.from && e.year < r.to) ?? atlas.eras.at(-1)!;

/**
 * The composed plate: where every card sits, and how tall the whole thing is.
 *
 * The page built this and the build gate rebuilt it separately — same decade
 * banding, same packing, but the gate used a flat 42px card height while the
 * page measured each title. So the gate proved that a layout nobody renders has
 * no overlaps. One function, imported by both, is the only version of this that
 * is worth running.
 */
export function plate() {
  const events = [...atlas.events].sort((a, b) => a.year - b.year);

  // Give each decade the room its own densest column needs. Density is bursty
  // inside an era too — the 1940s carry more of the record than the rest of
  // their century — so era-level sizing still pushed post-war cards decades
  // below their date.
  const decades: { id: string; from: number; to: number }[] = [];
  for (let d = Math.floor(atlas.meta.minYear / 10) * 10; d < atlas.meta.maxYear; d += 10)
    decades.push({ id: `d${d}`, from: d, to: d + 10 });

  const needs = new Map<string, number>();
  for (const d of decades) {
    const stacks = new Map<string, number>();
    for (const e of events)
      if (e.year >= d.from && e.year < d.to) {
        const c = columnOf(e);
        stacks.set(c, (stacks.get(c) ?? 0) + cardHeight(e.title) + CARD_GAP);
      }
    needs.set(d.id, Math.max(0, ...stacks.values()));
  }

  const scale = timeScale(decades, needs);
  const placed = pack(
    events.map((e) => ({
      id: e.id,
      col: columnOf(e),
      want: scale.y(e.year),
      height: cardHeight(e.title)
    })),
    CARD_GAP
  );

  // Measure to the BOTTOM of the lowest card. Measuring to its top let the last
  // card in the densest column hang out of the plate by its own height.
  const bottom = Math.max(
    scale.total,
    ...events.map((e) => placed.get(e.id)!.top + cardHeight(e.title))
  );
  return { events, scale, placed, height: bottom + 60 };
}

/**
 * The atlas's audit of itself.
 *
 * These numbers were computed every build and thrown away into a console. They
 * are the least flattering facts about the project — most records rest on one
 * citation, and most contested records cite one work for both sides of the
 * disagreement — which is exactly why they belong on the page rather than in a
 * build log. A reference work that publishes its own weakest measurement is
 * making a claim the reader can check; one that reports only its strengths is
 * asking to be trusted.
 */
export function audit() {
  const events = atlas.events;
  const hosts = new Map<string, number>();
  for (const e of events)
    for (const s of e.sources) {
      if (!s.url) continue;
      const h = new URL(s.url).hostname.replace(/^www\./, "");
      hosts.set(h, (hosts.get(h) ?? 0) + 1);
    }
  const ranked = [...hosts].sort((a, b) => b[1] - a[1]);
  const urls = ranked.reduce((n, [, c]) => n + c, 0);
  const contested = events.filter((e) => e.confidence === "contested");

  return {
    events: events.length,
    /** Rule 2's debt: records resting entirely on Wikipedia. */
    wikipediaOnly: events.filter(isProvisional).length,
    partlyWikipedia: events.filter((e) => e.sources.some(isWikipedia) && !isProvisional(e)).length,
    unverified: events.filter((e) => e.sources.some((s) => s.unverified)).length,
    /** One citation is one reading, however good the citation. */
    singleSource: events.filter((e) => e.sources.length === 1).length,
    contested: contested.length,
    /** Contested records whose competing readings rest on the same work. */
    contestedOneSource: contested.filter(
      (e) => new Set((e.readings ?? []).map((r) => r.source.trim())).size === 1
    ).length,
    figures: events.flatMap((e) => e.figures ?? []).length,
    figuresWithBasis: events.flatMap((e) => e.figures ?? []).filter((f) => f.basis).length,
    urls,
    topHost: ranked[0]?.[0] ?? "—",
    topHostShare: ranked[0] ? Math.round((ranked[0][1] / urls) * 100) : 0,
    built: atlas.meta.built
  };
}
