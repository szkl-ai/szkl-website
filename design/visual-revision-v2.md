# Visual refinement and stronger scroll scenes

## Owner feedback applied
- Motion 1/2/3 retained, Motion 1 default.
- Hardware 1 retained; Hardware 2 and 3 regenerated to simplify equipment and improve physical plausibility.
- Knowledge 1/2/3 replaced: directed entity graph, coordinate/vector retrieval, and layered records/relations/vectors. No biological or virus-like spheres.
- Nian 3 retained as homepage default. Nian 1/2 regenerated using the supplied Muse conceptual exploded reference for differentiated functional components, not its screen/camera/shape. Touch flex, three microphone subassemblies, main PCB, foil pouch cell and structural rear housing replace redundant discs.
- Workspace 1 and 3 retained, Workspace 1 default. Workspace 2 removed from the active registry; original files retained.
- Active gallery: 14 studies, seven selected directions and seven revisions for owner review. All revised images have an official transparent SZKL watermark.

## Stronger website interaction
New `ScrollScene.tsx` and scoped CSS provide two real scroll-driven compositions:
1. Motion 3 ambient background, Motion 1 primary foreground, Motion 2 translating/rotating secondary panel.
2. Workspace 1 ambient background and primary foreground, Workspace 3 secondary panel.

Desktop uses natural sticky positioning and reversible scroll progress, not intercepted scrolling. Smaller mobile transforms use stacked, non-sticky layouts. Foreground image ratios are preserved with `object-fit: contain`. Text/captions are outside image planes. Reduced-motion load/change and print disable transforms/sticky surplus distance. Keyboard focus settles layers; hash landing is static, with explicit user scrolling restoring motion. Existing editorial reveals continue elsewhere.

## Verification performed
- Production build + TypeScript: PASS.
- Curation contract: initially RED against old selection; final 17 checks PASS, including seven unchanged approved SHA-256 values and bilingual gallery counts/defaults.
- New scene tests against the actual built homepage: eight language/viewport/scene combinations PASS, multiple forward/backward samples, exact reversibility, initial/dynamic reduced motion, focus/hash settling and input resumption, print and no console errors.
- Existing motion regression: 33 PASS, 0 failures.
- Responsive homepage matrix: eight EN/ZH viewport states PASS.
- Gallery: eight EN/ZH states at desktop/tablet/mobile widths, all 14 decoded images, category counts, links/downloads, toggles, no overflow, automated axe checks PASS.
- Existing navigation/profile/showcase: 58 cases PASS; mobile interactions: four PASS.
- Actual equipment-video playback/seeking: four states PASS.
- Homepage automated WCAG A/AA axe checks: no violations in eight tested states; this is not a full accessibility certification.
- Representative live desktop and Chinese mobile scroll screenshots inspected. Scroll recording saved in review workspace `after/scroll-demo.webm`.
- Native source hashes, branded outputs and both build directories verified. All native generators exited normally. A late Nian-2 correction was reprocessed and rebuilt; current selected source hash starts `60d68a40`, active WebP `e8f9bb62`.
- Independent review reports retained in review workspace; initial stale Nian-2 derivative finding addressed with exact hash/pixel verification and targeted re-review.

## Debugging evidence
- Gallery's old `last-child` tablet rule incorrectly placed the second workspace study on a new row. New tablet-row assertion reproduced it; selector now applies to odd last children only.
- First live scene test falsely compared different scroll positions: resetting `location.hash=''` launched native smooth scroll-to-top that overlapped the next test's instant seek. Instrumentation showed fixed scene geometry but changing actual scrollY. No animation code was weakened. Test cleanup now changes history and dispatches hashchange without launching native anchor scrolling. All original forward/reverse assertions pass.

## Boundaries / pending owner review
These are conceptual raster visualizations, not validated computational graphs, manufactured assemblies, electrical diagrams or actual workspace photographs. Some graph arrow semantics and cable routing remain illustrative. Nian-1's very small blue accent still appears dot-like; exact mic alignment, contact routing and assembly fit remain engineering-validation items. The two revisions are not claimed to be exact approved-production drawings.

## Artifacts
Review workspace: `/Users/michael/.hermes/reviews/szkl-visual-v2/`.
- `before/`: source and original-visual snapshot.
- `approved-hashes.json`, `asset-manifest.json`: preservation and final-source/derivative provenance.
- `renders/{knowledge,hardware,nian}/`: native PNGs, prompts, manifests and reports.
- `branded-masters/`: seven revised PNG masters.
- `SZKL-Revised-Visuals-v2.zip`: seven PNG + seven WebP + three comparison/contact sheets, verified CRC.
- `curation-test.mjs`, `scene-test.mjs` and regression scripts/reports: executable QA.
- `final-review-initial.json`, `final-review.json`: independent review evidence.

Both English and Chinese content/alt/caption/CTA/layout variants were checked. No commit, push, publication or deployment.
