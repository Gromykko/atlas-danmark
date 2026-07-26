// Atlas Danmark — data contract.
//
// The rules below are the project, not decoration around it. They exist because
// the previous atlas learned each of them the expensive way:
//
//  1. Nothing renders without a source. There is no "we'll cite it later" state.
//  2. Wikipedia is a POINTER to evidence, not evidence. A record whose entire
//     source list is Wikipedia is `provisional` and says so to the reader.
//  3. A figure that cannot be compared must not be drawn as if it can. Every
//     statistic carries the territory and definition it was measured on.
//  4. Contested history stays contested: two readings side by side, never one
//     national story silently chosen.
//  5. Uncertainty is data. A date we cannot pin is marked, not guessed.

export type Lang = "en" | "da";
/** Every reader-visible string is bilingual. No exceptions, enforced by types. */
export type Text = Record<Lang, string>;

/** Plate columns. Deliberately few — sparse columns are what make an atlas
 *  look empty. Themes are finer-grained and merge into these. */
export type ColumnId =
  | "power"      // kings, constitutions, government
  | "land"       // borders, territory, colonies
  | "people"     // population, migration, social structure
  | "conflict"   // war, occupation, resistance
  | "belief"     // religion, church, ideas
  | "economy"    // trade, agriculture, industry, welfare
  | "culture";   // culture, science, everyday life

export type ThemeId =
  | "power" | "law"
  | "borders" | "colonies"
  | "people" | "migration" | "enslavement"
  | "war" | "resistance"
  | "religion" | "ideas"
  | "economy" | "welfare"
  | "culture" | "science" | "everyday";

export interface Theme {
  id: ThemeId;
  column: ColumnId;
  color: string;
  name: Text;
}

/** How well established a record is. Drives a visible mark, not a hidden field. */
export type Confidence =
  | "established"  // uncontested in the scholarly literature
  | "sourced"      // documented, not independently cross-checked here
  | "contested"    // specialists genuinely disagree — REQUIRES >= 2 readings
  | "legendary";   // a story the culture tells; NOT presented as fact

export interface Source {
  /** Full citation. Author, title, publisher, year, page where applicable. */
  label: string;
  url?: string;
  /** Set when the source could not be opened and verified directly. */
  unverified?: boolean;
}

/** A competing interpretation. Contested records carry at least two. */
export interface Reading {
  /** Whose reading, e.g. "Traditional national account", "Recent scholarship". */
  side: Text;
  text: Text;
  source: string;
}

/** A sourced figure. `basis` is mandatory whenever comparability is at stake:
 *  a population count for a territory that later changed shape, a currency
 *  amount in a unit that no longer exists. Charting two different bases as one
 *  continuous series is the single worst error this atlas can make. */
export interface Figure {
  label: Text;
  /** Human-readable value, e.g. "1,864,000" or "38% → 57%".
   *  Bilingual like everything else the reader sees: these carry prose
   *  ("c. 15% of the adult population") and locale-specific number and date
   *  formatting (1.058 / 63,3% / 10. juli 1086), not bare digits. Typing this
   *  as a plain string was a hole in rule 0 — it let English into the Danish
   *  view in 86 places. */
  value: Text;
  /** What it was measured on, e.g. "Kingdom incl. Schleswig" — required when
   *  the measurement basis changes across the series. */
  basis?: Text;
  source: string;
}

export interface AtlasEvent {
  id: string;
  year: number;
  /** For spans. Must be >= year. */
  endYear?: number;
  /** True when the year itself is uncertain — rendered as an open marker
   *  rather than a hard date, instead of quietly pretending to precision. */
  yearApproximate?: boolean;
  theme: ThemeId;
  confidence: Confidence;
  title: Text;
  /** 2–3 sentences. This is what a reader sees WITHOUT clicking. */
  summary: Text;
  /** Optional longer text, shown only in the detail panel. */
  detail?: Text;
  figures?: Figure[];
  /** Required when confidence === "contested". Enforced by validate.ts. */
  readings?: Reading[];
  sources: Source[];
  place?: string;
  lat?: number;
  lon?: number;
  // An `image` block lived here with a credit rule and an `illustrative` flag
  // for pictures that do not depict the moment they sit beside. It had zero
  // instances in 107 records, so it was a schema field, a validation branch and
  // an editorial policy for a feature that never existed. Reinstate it — with
  // the credit check — if and when a record actually needs a picture.
}

/** A documented relationship between two events. Neutral phrasing only:
 *  states a sequence, never a moral claim about it. */
export interface Link {
  from: string;
  to: string;
  relation: Text;
}

export interface Era {
  id: string;
  from: number;
  to: number;
  name: Text;
}

export interface Atlas {
  meta: { minYear: number; maxYear: number; built: string };
  columns: { id: ColumnId; name: Text }[];
  themes: Theme[];
  eras: Era[];
  events: AtlasEvent[];
  links: Link[];
}

/** Wikipedia is a pointer to evidence, never evidence. */
export const isWikipedia = (s: Source): boolean =>
  /wikipedia\.org/i.test(s.url ?? "") || /wikipedia/i.test(s.label);

/** A record resting entirely on Wikipedia is shown to the reader as provisional. */
export const isProvisional = (e: AtlasEvent): boolean =>
  e.sources.length > 0 && e.sources.every(isWikipedia);
