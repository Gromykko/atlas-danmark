# Atlas Danmark

A sourced historical atlas of Denmark, 690–2026. Time runs down the page, themes
run across it in seven columns, and every record carries the evidence it rests on.

**107 events · every one sourced · EN + DA throughout · zero Wikipedia-only records**

## The rules

These are enforced by `scripts/validate.ts`, which runs before every build. A
violation fails the build rather than shipping quietly.

1. **Nothing renders without a source.** There is no "we'll cite it later" state.
2. **Wikipedia is a pointer to evidence, not evidence.** A record resting entirely
   on Wikipedia is shown to the reader as provisional.
3. **A figure that cannot be compared must not be drawn as if it can.** Every
   statistic carries the territory and definition it was measured on. Denmark's
   population series changes territorial basis in 1864 and 1920; charting those as
   one continuous line is the worst error this atlas could make.
4. **Contested history stays contested.** Two readings side by side, never one
   national story silently chosen. A record marked `contested` carrying fewer than
   two sourced readings fails the build.
5. **Uncertainty is data.** A date that cannot be pinned is marked approximate,
   not guessed at.
6. **Every reader-visible string is bilingual**, enforced by the type system —
   including figure values, which carry prose and locale number formatting
   (`1.058` / `63,3%` / `10. juli 1086`).

## Pages

- `/` — the plate. Confidence is visible in the border: dashed for contested,
  dotted for legendary. Clicking a card opens its sources, figures and, where the
  scholarship genuinely disagrees, both readings.
- `/spil/` — **Tidsmaskinen**, a guessing game on the same dataset. An event
  arrives with its dates redacted; you place it on the plate by domain and era.
  Every event added to the atlas becomes a round automatically.

## The vertical scale is not linear

The record is thin across 360 Viking years and thick across the 1940s alone. A
uniform scale starves the modern decades while wasting space on the early
medieval, so each decade gets whichever is larger: the room its duration implies,
or the room its densest column needs. The axis prints each era's span, so the
compression is visible rather than misread as elapsed time.

Where a card still cannot sit exactly at its year it is pushed down and given a
leader line back to the true date. A card silently sitting below its year would be
a quiet lie.

## Sources

Chiefly [danmarkshistorien.lex.dk](https://danmarkshistorien.lex.dk), the
encyclopaedia edited at Aarhus University, with Dansk Biografisk Leksikon and
Danmarks Statistik where noted. Every URL in the dataset was retrieved and read
rather than inferred.

## Development

```sh
npm install
npm run dev        # http://localhost:4321
npm run validate   # check dataset integrity
npm run build      # validate, then build to ./dist
```

Requires Node 22.12+. Built with [Astro](https://astro.build); no runtime
dependencies beyond it.
