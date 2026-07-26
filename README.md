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

## What the atlas says about itself

The masthead publishes the project's own audit, computed from the dataset at
build time by `audit()` in `src/data/derived.ts` and printed by the same function
that the build gate uses, so the number a reader sees and the number the build
sees cannot drift apart:

> 0 records rest on Wikipedia alone · 95 of 107 rest on a single citation · 97% of
> 119 source URLs are danmarkshistorien.lex.dk · 14 of 18 contested records cite
> one work for both readings.

Those are the least flattering facts available about this project, which is
exactly why they are on the page rather than in a build log. Rule 4 as originally
enforced was satisfiable by one encyclopaedia summarising a debate with itself —
two paragraphs, one account. The build now warns on every such record so the debt
stays visible and shrinking rather than quietly permanent.

Rule 3 was the strongest rule with no machine check, because "state the basis
when comparability is at stake" is not a condition a program can evaluate. It is
now checked for the case where it is always at stake: a figure counting people
without a stated territory fails to a warning. That check immediately found a
hole in the West Indies record, where 32,213 enslaved people were counted with no
note that they were enumerated in colonial registers as property rather than as
inhabitants — a figure that is not comparable with the Danish population series
and must never be drawn beside it.

## Pages

- `/` — the plate. Confidence is visible in the rule down each card's edge: it
  breaks up as the evidence thins, unbroken for established through dotted for
  legendary. Clicking a card opens its sources, figures and, where the
  scholarship genuinely disagrees, both readings. Every record has a permalink
  (`/#jellingsmall`), so a record can be cited, assigned or linked. The 47
  documented relations between events are followable.
- `/spil/` — **Tidsmaskinen**, six quiz modes on the same dataset. Every event
  added to the atlas becomes playable material automatically; there is no
  question bank to maintain.

## The vertical scale is not linear

The record is thin across 360 Viking years and thick across the 1940s alone. A
uniform scale starves the modern decades while wasting space on the early
medieval, so each decade gets whichever is larger: the room its duration implies,
or the room its densest column needs.

The plate draws its own graticule — one faint rule per decade, at each band's own
rate. The rules therefore crowd through the Viking centuries and open out across
the 1940s, so the compression is something the reader watches happen rather than
a caveat they are asked to remember. Each era band also carries a bar showing what
100 years measures *there*.

Where a card still cannot sit exactly at its year it is pushed down and given a
dotted leader back to the true date. A card silently sitting below its year would
be a quiet lie.

Below 1000px the plate is not shrunk — it is replaced. The cards are already
emitted in ascending-year order, so the narrow view is a chronological gazetteer
with full titles and every panel intact. A plate is a large-format object; the
small-format edition of an atlas has always been a gazetteer. The same rules are
the print stylesheet.

## Tidsmaskinen

Six modes, all generated from the dataset:

| Mode | The skill it exercises | Derived from |
| --- | --- | --- |
| Place it | Periodisation — domain and era together | `theme`→column, `year`→era |
| Sequence | Chronological reasoning without dates | four events' `year`, revealed on a proportional axis |
| How firm is this? | Evidential appraisal | `confidence` |
| What followed | Documented consequence vs. mere succession | `links[]` |
| Two accounts | Attributing an interpretation to its frame | `readings[]` |
| The comparison trap | Comparability of figures | `figures[].basis` |

**Scoring is chance-corrected.** Each answer earns `(raw − c) / (1 − c)` where `c`
is the expected score of a uniform-random answer *at that item*, derived per
question. A random player converges to 0 rather than to a comfortable positive
number, partial knowledge earns proportional credit, and a confidently backwards
answer costs. The board is not uniform — 36 of 107 events are modern and 6 are
in the belief column — so an event in a crowded cell is worth less, because
guessing finds it more often. Every round offers "Not sure", worth exactly zero
and never negative, which buys calibration data without a slider on every screen.

Credit for era placement decays in **years, not era indices**: "one era off"
between the Kalmar Union and the Reformation is 139 years, while between
Absolutism and the Constitution it can be a single year. An index is not a unit
of error.

**The clue must never contain its own answer.** Redaction runs at build time and
`validate.ts` asserts on the built strings that no year, decade word, century
word, date, or regnal number survives in anything a player sees before the
reveal — across summaries, titles, figures and readings. Before this was
tightened the leak was live for 32 of 107 events: `grundlov1849` opened with
"Signed 5 June 1849", and the old rule's exemption for thousands separators was
letting through every date that happened to be followed by a comma.

**What the game deliberately refuses:** streaks, timers, leaderboards, lives, XP,
badges, and unlockable content. A streak makes a player want easier questions,
which is the opposite of what a diagnostic should give them. A timer punishes
re-reading a paragraph, which is the target behaviour in four of the six modes,
and penalises anyone reading in their second language — on a bilingual site, by
design about half the audience. Every event is public and one click away on the
plate; locking history behind a score would be a lie about the material. What
remains is a chance-corrected score with its *n* attached, six skill bars, and a
review of what was missed with links back into the atlas and out to the sources.

Progress is kept in `localStorage` (what you have seen, what you missed, per-skill
means, a session counter) purely to avoid repeating questions and to resurface
missed ones. There is a "Forget my progress" button; storing anything about a
reader without an obvious way to erase it would not sit well on a project whose
first rule is transparency.

## Sources

Chiefly [danmarkshistorien.lex.dk](https://danmarkshistorien.lex.dk), the
encyclopaedia edited at Aarhus University, with Dansk Biografisk Leksikon and
Danmarks Statistik where noted. Every URL in the dataset was retrieved and read
rather than inferred.

This concentration is itself a limitation and is published as one. The atlas is
an index into the scholarship, not a substitute for it, and the number to watch
is single-source records: 95 of 107 today.

## Development

```sh
npm install
npm run dev        # http://localhost:4321
npm run validate   # dataset integrity, layout proof, quiz leak check
npm run build      # validate, then build to ./dist
```

`npm run validate` is the whole test suite, and it runs before every build. It
checks the six rules, then proves two things about what ships: that no two cards
overlap in any column — using `plate()`, the same function the page renders from,
rather than a re-implementation that could prove things about a layout nobody
sees — and that no quiz clue contains its own answer.

Requires Node 22.12+. Built with [Astro](https://astro.build); no runtime
dependencies beyond it, no webfonts, no external requests.
