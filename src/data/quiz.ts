// Material for Tidsmaskinen.
//
// The split here matters. Redaction happens at BUILD time and its output is
// what ships: the answers are never sent to the browser in readable form for
// any string the player sees before the reveal, and `scripts/validate.ts`
// asserts on the built strings that nothing leaks. Assembling rounds into a
// session is ordinary game logic and lives in the page.
//
// Every round is derived from the atlas. There is no question bank: an event
// added to the dataset becomes playable material in six modes automatically and
// cannot fall out of sync with the record.

import { atlas } from "./atlas.ts";
import { columnOf, eraOf } from "./derived.ts";
import type { AtlasEvent, Text } from "./schema.ts";

// A cut keeps what it removed, wrapped in markers, so the page can render it as
// a masked block the reader may lift if they choose. The consequence is that the
// year now ships inside the HTML: the guarantee becomes "the clue does not SHOW
// its answer", not "does not contain it". `visible()` is what the build gate
// checks, so nothing is ever readable without a deliberate act.
const M0 = "";
const M1 = "";
/** Replacement that KEEPS the matched text, wrapped so the page can mask it. */
const CUT = M0 + "$&" + M1;
/** What the reader sees before lifting anything — and what validate.ts checks. */
export const visible = (s: string) => s.replace(/[^]*/g, "————");

const MO =
  "jan(?:uar[y]?)?|feb(?:ruar[y]?)?|mar(?:ts|ch)?|apr(?:il)?|ma[jy]|jun[ei]?|" +
  "jul[iy]?|aug(?:ust)?|sep(?:t|tember)?|okt(?:ober)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?";

const RULES: [RegExp, string][] = [
  [/\b\d{3,4}-?tallet\b/gi, CUT], // 1800-tallet
  [/\b\d{1,2}\.?\s*århundrede\b/gi, CUT], // 18. århundrede
  [/\b\d{1,2}(?:st|nd|rd|th)[-\s]centur(?:y|ies)\b/gi, CUT], // 19th-century
  [/\b\d{4}'?erne\b/g, CUT], // 1730'erne
  [/\b(?:the\s+)?\d{3,4}s\b/g, CUT], // the 1300s · 800s
  [/\b(?:1\d{3}|20[0-3]\d|[6-9]\d{2})\b/g, CUT], // bare years
  [new RegExp(`\\b\\d{1,2}\\.?\\s*(?:${MO})\\b`, "gi"), CUT], // 5. juni · 9 April
  [new RegExp(`\\b(?:${MO})\\s+\\d{1,2}\\b`, "gi"), CUT], // June 5
  // A regnal number is a hard date to a Danish reader: "Christian IV" places a
  // fragment inside a decade as surely as printing the year would.
  // The trailing s?/'s is the Danish and English genitive — "Christian 3.s hær",
  // "Christian IV's". Without it the ordinal survives and names the monarch,
  // which for a Danish reader dates the fragment to the decade.
  [/([A-ZÆØÅ][a-zæøå]{2,})\s+((?:[IVXL]{1,5}|\d{1,2}\.)(?:'?s)?)(?=[\s,.;:)'’]|$)/g, "$1 " + M0 + "$2" + M1]
];

const AZ = "abcdefghijklmnopqrstuvwxyz";

/**
 * Strip everything that would hand the player the answer.
 *
 * The previous rule kept any year adjacent to a comma, meaning to protect the
 * trailing group of "1,864,000" — but a year followed by a comma is also the
 * commonest way a date appears in a sentence, so it leaked 49 real years across
 * 32 of 107 events. `grundlov1849`'s clue opened "Signed 5 June 1849".
 *
 * Grouped numbers are parked behind sentinels first, so the year pass cannot
 * see "944" inside "4,260,944". Two ordering constraints, both load-bearing:
 * parking runs first, and the day-month passes run before the regnal pass —
 * otherwise "5. juni" matches capitalised-word-plus-ordinal and the month
 * survives on its own.
 */
export function redact(s: string): string {
  const keep: string[] = [];
  s = s.replace(/\d{1,3}(?:[.,]\d{3})+(?:[.,]\d+)?/g, (m) =>
    keep.length >= 26 ? m : (keep.push(m), `${AZ[keep.length - 1]}`)
  );
  for (const [re, to] of RULES) s = s.replace(re, to);
  return s.replace(/([a-z])/g, (_, c: string) => keep[AZ.indexOf(c)]);
}

const hide = (t: Text): Text => ({ en: redact(t.en), da: redact(t.da) });

/**
 * A hint is only a hint if something survived redacting it.
 *
 * 52 of the 94 figures used as hints came out the far side as two or more runs
 * of dashes — "———— Lindisfarne · ———— Paris · c. ———— Normandy" — rendered in
 * italic under the clue where help is supposed to be. That is not a hard
 * question, it is a promise of help that delivers a joke. Show the ones that
 * survive ("63,3% ja · valgdeltagelse 89,6%") and drop the rest.
 */
const usefulHint = (t: Text): boolean => {
  const cuts = (t.en.match(//g) ?? []).length;
  const rest = visible(t.en).replace(/————/g, "").replace(/[^\p{L}\p{N}%]/gu, "");
  return cuts <= 1 && rest.length >= 8;
};

/** Every string a mode can put in front of a player before the reveal. */
export function quizVisibleStrings(e: AtlasEvent): string[] {
  return [
    e.title.en, e.title.da,
    e.summary.en, e.summary.da,
    ...(e.figures ?? []).flatMap((f) => [f.label.en, f.label.da, f.value.en, f.value.da]),
    ...(e.readings ?? []).flatMap((r) => [r.side.en, r.side.da, r.text.en, r.text.da])
  ];
}

/**
 * The compact, already-redacted dataset the game runs on.
 *
 * Titles are redacted too — "The 1953 Constitution" would otherwise announce
 * itself — and so are reading labels, one of which is literally
 * "1479 — the founding".
 */
export function quizData() {
  return {
    columns: atlas.columns,
    eras: atlas.eras,
    events: atlas.events.map((e) => ({
      id: e.id,
      year: e.year,
      end: e.endYear ?? e.year,
      col: columnOf(e),
      era: eraOf(e).id,
      conf: e.confidence,
      sources: e.sources.length,
      title: e.title,
      safeTitle: hide(e.title),
      clue: hide(e.summary),
      hint: e.figures?.[0] && usefulHint(hide(e.figures[0].value))
        ? hide(e.figures[0].value)
        : null,
      url: e.sources[0]?.url ?? null
    })),
    links: atlas.links.map((l) => ({ from: l.from, to: l.to, relation: l.relation })),
    readings: atlas.events
      .filter((e) => e.confidence === "contested" && (e.readings?.length ?? 0) >= 2)
      .map((e) => ({
        id: e.id,
        readings: e.readings!.map((r) => ({ side: hide(r.side), text: hide(r.text), source: r.source }))
      })),
    // Only 7 of 107 figures carry a basis. That is the honest supply for this
    // mode, and it must not be padded by inferring one: `basis` is optional, so
    // its absence means nobody wrote one, NOT that comparison is safe. Scoring
    // an unbased figure as "safe to chart" would have the quiz teaching the
    // exact error the atlas was built to prevent.
    bases: atlas.events.flatMap((e) =>
      (e.figures ?? [])
        .filter((f) => f.basis)
        .map((f) => ({
          id: e.id,
          title: e.title,
          label: f.label,
          value: f.value,
          basis: f.basis!
        }))
    )
  };
}
