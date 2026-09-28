# High-throughput experimentation — workflow charts

## Scope
Owner-directed addition beside the existing real Pheno equipment video. Implements a **Learn** surface: explain where physical high-throughput operations fit, then trace capture into connected experimental data. Local only; no commit, push, publication, backend integration or equipment control.

- `src/ExperimentWorkflow.tsx`: bilingual native-HTML charts and the preserved video.
- `src/experiment-workflow.css`: scoped diagram composition and responsive/print layouts.
- `src/GroupHome.tsx`: only a component import and substitution for the old equipment figure.
- Existing source files, all visual selections and real media remain unchanged except that substitution. Asset baseline verified in task evidence.

## Chart 1 — experiment cycle
Beside the video on wide screens; below it on narrow screens. Six ordered steps:
1. Define experiment: question, variables, protocol.
2. Identify/prepare: sample IDs, batches, controls.
3. **High-throughput run:** handling, dispensing, weighing. Highlighted to connect to the actual filmed operations.
4. Capture evidence: measurements, time, conditions.
5. Connect/check: linked records and data quality.
6. Interpret/decide: compare outcomes and human review.

Explicit feedback identifies the next **approved** batch returning to design. The diagram has no live equipment state or autonomous-control claim. Desktop arrows follow the numbered serpentine; mobile reflows into a single downward sequence without changing DOM order.

## Chart 2 — data capture and integration
- **Capture with context:** raw instrument observations, values, units, timestamps and run logs; sample/material/batch, protocol version/planned conditions, instrument settings/calibration.
- **Connect and verify:** experiment/run identifier links sample, protocol, instrument and result; preserves planned versus actual conditions. Schema/unit/completeness/provenance quality gate. Flagged records are held for review. Raw files retained; transformations traceable.
- **Reuse evidence:** reviewed, versioned datasets with lineage; observed values kept visibly distinct from predictions; model/uncertainty evaluation and human review inform another experiment proposal.

Interfaces, imports and reviewed entry are alternatives—not an assertion that all equipment automatically exports every field. Diagram is explicitly an integration architecture, not proof that the entire loop is deployed. PhenoLab's experimental ontology direction is grounded in existing `design/platform-portfolio-revision.md` and `src/platforms.ts`; actual filmed operations are grounded in `design/asset-provenance.json`. No new capability numbers or performance claims.

## Visual treatment and accessibility
Transforms the user's grouped-box/blue-path reference into task-specific diagrams, not a dense generic node web. Inherits the site's warm neutral, graphite and cobalt palette, native type and natural document flow. Composition audit: 0/10 generic-design tells; these are connected process/record groups, not marketing feature tiles. No gradients, decorative stats, new hero, stock imagery, pinning or autoplay loops.

Selectable text, coherent h3–h6 hierarchy, labelled figures and explicit ordered-list roles (including WebKit's unstyled-list case). Decorative arrow SVGs hidden from assistive technology. The existing scroll enhancement progresses chapter rules; all chart labels remain present and unmoved. Reduced motion returns to static rules. Print preserves transition conditions such as QC passed, permits the long lineage to paginate and keeps individual record groups together; full print pagination is not certified.

## Verification and evidence
Task workspace: `/Users/michael/.hermes/reviews/szkl-experiment-workflow/`.

- Saved source snapshot and 20 media/visual hashes before editing; all 20 remain byte-identical after implementation.
- Cycle and lineage contracts each failed on the old page for the missing behavior, then passed in English and Chinese after implementation.
- `npm run build`: TypeScript + production build PASS.
- Responsive chart tests: **12 states** (EN/ZH × 1440, 1024, 901, 768, 390, 320). Exact step order, video/chart placement, geometry, language toggle, caption-language URLs, no page errors or page/text overflow, zero axe WCAG A/AA violations in the tested section.
- Browser QA caught a too-narrow tablet transition label. It also caught mobile labels wrapping into vertical Chinese characters. Final label sizing/wrapping fixed both; tests rerun and actual screenshots inspected.
- Four reading/accessibility states: horizontal mobile labels, explicit list roles and visible print transition conditions PASS.
- Eight chart motion cases: real scroll changes rule progress; initial/dynamic reduced motion and resumption PASS.
- Four direct language/viewport anchor cases: heading visible below header PASS.
- Four real media cases: playback, dimensions, controls, no autoplay and seeking PASS after final build.
- Existing homepage story regression: 114 named assertions, zero failures. Existing navigation 58 cases and mobile interactions four cases PASS. Homepage axe eight states had zero violations.
- Final English desktop/tablet and Chinese mobile screenshot crops visually inspected. Captures use full-page document crops to avoid Playwright's tall-element screenshot placing the sticky header artificially within the image; no production elements were hidden to obtain captures.
- Independent review `final-review.json`: PASS, no security, logic or content issues. Its optional list-role and print-condition suggestions were addressed and browser-tested. A targeted final-delta review is recorded separately.
- `git diff --check`: PASS.

Tests are runnable with `node <workspace>/<test>.mjs`; the motion regression uses `STORY_URL=http://127.0.0.1:4175 node <workspace>/story-test.mjs`. Build first, because port 4175 serves `dist`, not source.

Local section: `http://127.0.0.1:4175/?lang=en&v=experiment-workflow#experiment-workflow` (replace `en` with `zh` for Chinese).
