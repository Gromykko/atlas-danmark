// Column packing for the plate.
//
// Cards want to sit at their year. In dense decades they would overlap and clip
// each other, so within a column each card is pushed down to clear the one
// above. The offset it was pushed by is returned, not discarded: the page draws
// a leader line back to the true year so a displaced card never reads as a
// silent claim about a date it does not have.

/**
 * Card geometry.
 *
 * The packer guarantees no two cards in a column overlap. That guarantee is
 * worth exactly nothing unless the renderer agrees with the packer about how
 * tall a card is — which is why the height is computed here, enforced in CSS
 * (fixed height + line clamp) rather than predicted and hoped for, and imported
 * by the build gate so it proves the layout that actually ships. An earlier
 * version estimated height from character count and let the browser lay out
 * freely; the two disagreed and cards overlapped in three places.
 *
 * CHARS_PER_LINE is calibrated to the 1330px plate width set in CSS AND to the
 * body face. Change either and you must re-measure: at 22 — the value tuned for
 * Georgia — three Danish titles wrapped to a line the packer had not budgeted
 * and were silently eaten by the clamp, which is the packer/renderer
 * disagreement this whole contract exists to prevent. The estimate must stay
 * PESSIMISTIC: budgeting a line too many costs vertical space, budgeting one too
 * few loses words.
 *
 * Verified by rendering all 107 cards and asserting no title overflows its box.
 */
export const CHARS_PER_LINE = 16;
const LINE = 17;
const CHROME = 25; // padding + border + the year line
export const CARD_GAP = 6;

export const titleLines = (title: { en: string; da: string }): number =>
  Math.min(3, Math.max(1, Math.ceil(Math.max(title.en.length, title.da.length) / CHARS_PER_LINE)));

export const cardHeight = (title: { en: string; da: string }): number =>
  CHROME + titleLines(title) * LINE;

export interface PackItem {
  id: string;
  /** Column key — packing is independent per column. */
  col: string;
  /** Where the card belongs: its year, in px. */
  want: number;
  height: number;
}

export interface Placed {
  top: number;
  /** How far below its true year the card was pushed. 0 when undisplaced. */
  offset: number;
}

export interface Band {
  id: string;
  from: number;
  to: number;
  top: number;
  height: number;
  /** px per year inside this band. Varies between bands — shown to the reader. */
  rate: number;
}

/**
 * A piecewise vertical time scale.
 *
 * A single linear scale cannot carry this dataset: the record is thin across
 * 360 Viking years and thick across the 1940s alone, so a uniform scale starves
 * the modern decades while wasting space on the early medieval. Each span gets
 * whichever is larger — the room its own duration implies, or the room its
 * densest column actually needs.
 *
 * Callers pass DECADES rather than eras: density is bursty inside an era too
 * (the 1940s carry more of the record than the rest of their century), and
 * era-level sizing still pushed post-war cards decades below their date.
 *
 * The scale therefore CHANGES between bands. That is only acceptable because
 * the axis renders era boundaries against it, so the reader sees the
 * compression rather than silently misreading distance as elapsed time.
 */
export function timeScale(
  spans: { id: string; from: number; to: number }[],
  needs: Map<string, number>,
  minPxPerYear = 1.15
): { bands: Band[]; total: number; y: (year: number) => number } {
  const bands: Band[] = [];
  let top = 0;
  for (const e of spans) {
    const span = e.to - e.from;
    const height = Math.max(span * minPxPerYear, needs.get(e.id) ?? 0);
    bands.push({ id: e.id, from: e.from, to: e.to, top, height, rate: height / span });
    top += height;
  }
  const total = top;

  const y = (year: number) => {
    const b =
      bands.find((b) => year >= b.from && year < b.to) ??
      (year < bands[0].from ? bands[0] : bands[bands.length - 1]);
    return Math.min(total, b.top + (year - b.from) * b.rate);
  };
  return { bands, total, y };
}

/** Items must be passed in ascending `want` order. */
export function pack(items: PackItem[], gap = 6): Map<string, Placed> {
  const bottoms = new Map<string, number>();
  const out = new Map<string, Placed>();
  for (const it of items) {
    const top = Math.max(it.want, bottoms.get(it.col) ?? 0);
    out.set(it.id, { top, offset: top - it.want });
    bottoms.set(it.col, top + it.height + gap);
  }
  return out;
}
