# HTE and neural presentation — v4

Supersedes the two-diagram HTE composition and raster-based, one-shot neural presentation described in experiment-workflows.md and public-polish-view-only.md.

## One HTE workflow

ExperimentWorkflow.tsx now contains one chart beside the unchanged Pheno video. A five-step vertical spine joins experimental planning and physical execution to contextual capture, linked/quality-qualified records, and reviewed learning. The highlighted execution stage corresponds to handling, dispensing and weighing in the footage.

Data provenance, raw files, units/timestamps, instrument settings/calibration, planned/actual conditions, experiment IDs, QC hold/pass and versioned datasets remain in the same flow. Measured results and model predictions remain distinct. Human approval precedes the next batch. The second lineage diagram was removed, not simply nested inside a shared wrapper.

The desktop chart is approximately 514px tall at 1440px. Mobile reflows without tiny raster labels. Video sources, poster, controls, captions and accessibility description remain intact.

## A rendered, continuously animated network

Michael rejected the mostly static image and easily missed entry sweep. NeuralExplorer.tsx now mounts neuralScene.ts: a procedural Canvas illustration with dense incoming data fragments, projected neuron planes, weighted connections, travelling activations, evolving embedding clusters and task-output glyphs. It does not run inference or show purported measurements.

No raster background, sliders, input values or inspector. Stage labels and explanatory text remain native bilingual HTML. The only control is a discreet pause/resume animation affordance for accessibility. On mobile, the scene flows vertically rather than shrinking a landscape picture into illegibility.

Animation continues while visible; it no longer ends after 4.4 seconds. It suspends outside the viewport, on document hiding, for printing, or on reduced-motion preference. User pause and dynamic reduced-motion changes are respected. Rendering is capped at 30fps and DPR 2; geometry is bounded and observers/listeners/RAF are cleaned up. The original knowledge-1 artwork remains on disk and in the direct review gallery; it is no longer the primary neural feature.

## Verified execution

Evidence: /Users/michael/.hermes/reviews/szkl-hte-neural-v4/

- Production build and both TypeScript configurations pass.
- neural-test.mjs: RED on original missing Canvas, then GREEN for real pixel changes, continuing motion beyond the old cutoff, pause/resume and dynamic reduced motion, no raster or model controls.
- hte-test.mjs: RED with two diagrams, then GREEN for one chart, eight EN/ZH/viewport states and print quality-gate text.
- visual-qa.mjs: EN/ZH at 1440, 1024, 390 and 320px; actual changing Canvas pixels, no horizontal/text overflow, one diagram, no page errors, live language toggles, and zero axe WCAG A/AA violations.
- lifecycle-test.mjs: offscreen freeze/resume, initial reduced motion and animation resuming after actual PDF generation.
- Existing real media suite: four states pass. Navigation suite: 58 checks pass.
- Desktop/mobile screenshots inspected for both components.
- record-motion.mjs: recorded the real browser, with over 13% of Canvas pixels visibly changing over the sampled interval. neural-network-motion.mp4 is a 10-second H.264 crop from that recording, not a fabricated animation.
- Independent final-review.json: PASS, no blocking security, logic or content findings.
- git diff --check passes.

Local only. No commit, push or deployment.
