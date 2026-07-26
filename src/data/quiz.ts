// Material for Tidsmaskinen.
//
// The split here matters. Masking happens at BUILD time and its output is what
// ships; `scripts/validate.ts` asserts on the built strings that nothing is
// readable before the player asks for it. Assembling rounds into a session is
// ordinary game logic and lives in the page.
//
// Every round is derived from the atlas. There is no question bank: an event
// added to the dataset becomes playable material in six modes automatically and
// cannot fall out of sync with the record.

import { atlas } from "./atlas.ts";
import { columnOf, eraOf } from "./derived.ts";
import type { AtlasEvent, Text } from "./schema.ts";

// A cut keeps what it removed, wrapped in markers, so the page can render it as
// a masked block the reader may lift if they choose. The consequence is that the
// year ships inside the HTML: the guarantee is "the clue does not SHOW its
// answer", not "does not contain it". `visible()` is what the build gate checks,
// so nothing is ever readable without a deliberate act.
//
// The markers are written as escapes, never as literal control characters — a
// pasted U+0002 is invisible in every editor and diff, and a `\b` typed into a
// template literal silently becomes a backspace instead of a word boundary.
const M0 = String.fromCharCode(2);
const M1 = String.fromCharCode(3);
const PARK = String.fromCharCode(1);
const CUT_RE = new RegExp(M0 + "[^" + M1 + "]*" + M1, "g");
const PARK_RE = new RegExp(PARK + "([a-z])" + PARK, "g");

/** What the reader sees before lifting anything — and what validate.ts checks. */
export const visible = (s: string): string => s.replace(CUT_RE, "————");

const MO =
  "jan(?:uar[y]?)?|feb(?:ruar[y]?)?|mar(?:ts|ch)?|apr(?:il)?|ma[jy]|jun[ei]?|" +
  "jul[iy]?|aug(?:ust)?|sep(?:t|tember)?|okt(?:ober)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?";

/** [pattern, which capture group to mask] — 0 masks the whole match. */
const RULES: [RegExp, number][] = [
  [/\b\d{3,4}-?tallet\b/gi, 0], // 1800-tallet
  [/\b\d{1,2}\.?\s*århundrede\b/gi, 0], // 18. århundrede
  [/\b\d{1,2}(?:st|nd|rd|th)[-\s]centur(?:y|ies)\b/gi, 0], // 19th-century
  [/\b\d{4}'?erne\b/g, 0], // 1730'erne
  [/\b(?:the\s+)?\d{3,4}s\b/g, 0], // the 1300s · 800s
  [new RegExp(`\\b\\d{1,2}\\.?\\s*(?:${MO})\\b`, "gi"), 0], // 5. juni · 9 April
  [new RegExp(`\\b(?:${MO})\\s+\\d{1,2}\\b`, "gi"), 0], // June 5
  [/\b(?:1\d{3}|20[0-3]\d|[6-9]\d{2})\b/g, 0], // bare years
  // A regnal number dates a fragment to the decade for any Danish reader, so
  // only the numeral is masked and the name is left standing. The trailing
  // s / 's is the genitive — "Christian 3.s hær", "Christian IV's".
  [/([A-ZÆØÅ][a-zæøå]{2,})\s+((?:[IVXL]{1,5}|\d{1,2}\.)(?:'?s)?)(?=[\s,.;:)'’]|$)/g, 2]
];

const AZ = "abcdefghijklmnopqrstuvwxyz";

/**
 * Mask everything that would hand the player the answer.
 *
 * Rules run over the UNMASKED segments only. Applying them to the whole string
 * in sequence let a later rule cut inside an earlier cut — the bare-year rule
 * matched "800" inside the century rule's "800-tallet" — which nested the
 * markers and rendered as two broken, overlapping spans. Ten strings were
 * malformed that way.
 *
 * Grouped numbers are parked behind sentinels first, so the year pass cannot
 * see "944" inside "4,260,944". Order still matters: the day-month passes run
 * before the bare-year pass, or "5. juni" loses its month and keeps its day.
 */
export function redact(s: string): string {
  const keep: string[] = [];
  s = s.replace(/\d{1,3}(?:[.,]\d{3})+(?:[.,]\d+)?/g, (m) =>
    keep.length >= 26 ? m : (keep.push(m), PARK + AZ[keep.length - 1] + PARK)
  );

  let segs: { t: string; cut: boolean }[] = [{ t: s, cut: false }];
  for (const [re, group] of RULES) {
    const next: typeof segs = [];
    for (const sg of segs) {
      if (sg.cut) {
        next.push(sg);
        continue;
      }
      const rx = new RegExp(re.source, re.flags);
      let last = 0;
      let m: RegExpExecArray | null;
      while ((m = rx.exec(sg.t))) {
        const whole = m[0];
        const cut = group === 0 ? whole : m[group];
        const lead = group === 0 ? "" : whole.slice(0, whole.length - cut.length);
        if (m.index > last) next.push({ t: sg.t.slice(last, m.index), cut: false });
        if (lead) next.push({ t: lead, cut: false });
        next.push({ t: cut, cut: true });
        last = m.index + whole.length;
        if (rx.lastIndex === m.index) rx.lastIndex++;
      }
      if (last < sg.t.length) next.push({ t: sg.t.slice(last), cut: false });
    }
    segs = next;
  }

  const out = segs.map((x) => (x.cut ? M0 + x.t + M1 : x.t)).join("");
  return out.replace(PARK_RE, (_, c: string) => keep[AZ.indexOf(c)]);
}

const hide = (t: Text): Text => ({ en: redact(t.en), da: redact(t.da) });

/**
 * A hint is only a hint if something survived masking it.
 *
 * 52 of the 94 figures used as hints came out the far side as two or more runs
 * of dashes — "———— Lindisfarne · ———— Paris · c. ———— Normandy" — set in
 * italic under the clue where help is supposed to be. That is not a hard
 * question, it is a promise of help that delivers a joke. Show the ones that
 * survive ("63,3% ja · valgdeltagelse 89,6%") and drop the rest.
 */
const usefulHint = (t: Text): boolean => {
  const cuts = t.en.split(M0).length - 1;
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
 * The compact, already-masked dataset the game runs on.
 *
 * Titles are masked too — "The 1953 Constitution" would otherwise announce
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
