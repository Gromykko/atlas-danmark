// Column packing for the plate.
//
// Cards want to sit at their year. In dense decades they would overlap and clip
// each other, so within a column each card is pushed down to clear the one
// above. The offset it was pushed by is returned, not discarded: the page draws
// a leader line back to the true year so a displaced card never reads as a
// silent claim about a date it does not have.

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
