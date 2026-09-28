# Public-page polish and view-only neural visual

## Direction

The neural feature is a visual showpiece, not a simulator or teaching tool. Michael explicitly rejected sliders, calculation inspectors and actionable model controls. Keep the selected layered artwork, concise bilingual stage labels and decorative signal motion. No inference is performed and no output values are presented. The rejected neuralModel.ts module was removed.

NeuralExplorer.tsx now renders a passive figure. Its signal sweep starts after the image loads and enters the viewport, finishes in under five seconds, then rests. Reduced-motion visitors see a still image with the same labels. No hover, focus, click or form interaction is required.

## Public copy and navigation

- Removed AI-generated/concept/not-real/deployment disclaimer subtitles across public pages and the direct review gallery. Removed product-status lines while retaining all four Explore links.
- Preserved substantive technical descriptions, review/approval requirements, source links and product-workbench controls.
- Ethan and Louis no longer have team-contact or save-contact buttons. Michael retains his contact and VCF actions.
- Editorial image links no longer lead to the review gallery. The review route remains available directly, without public navigation to it. It is unlinked, not access-controlled.

## Selected image placements

| Page | Selected assets |
| --- | --- |
| Homepage | motion-1, hardware-1, knowledge-1, motion-2, workspace-1, nian-1, nian-use |
| Pulse showcase | restored hardware-2, restored hardware-3, workspace-3 |
| RALLO showcase | motion-3 |
| Nian showcase | knowledge-2 |
| PhenoLab showcase | knowledge-3 |

All 13 selected assets have public placements. No previously rejected variants were reintroduced. All 81 pre-existing public assets were verified byte-identical to the task-start snapshot.

## Verification

Production build and TypeScript checks pass. Browser evidence is under `/Users/michael/.hermes/reviews/szkl-public-polish/`.

- `view-only-test.mjs`: six EN/ZH desktop/mobile states; absence of controls and inspectors, five labels, retained artwork, automatic finite animation, reduced motion and page-width checks.
- `public-matrix.mjs`: all 48 route/language/viewport states pass with zero axe WCAG A/AA violations, no page errors, decoded images and no horizontal overflow.
- `home-test.mjs`: public copy, passive artwork, four Explore links and retained video.
- `placements-test.mjs`: 13 unique selected public images and no gallery navigation.
- `copy-audit-test.mjs`: 22 route/language combinations including expanded content.
- Profile checks: both contact actions absent for Ethan/Louis and present for Michael, in both languages and both tested widths.
- Existing media suite: real playback and visual checks in four states.
- Existing navigation suite: 58 legacy links, shared/reloaded navigation, profiles and showcases.
- Live EN → ZH → EN toggles checked at 1440px and 390px.
- Independent static review and targeted contrast follow-up both passed (`final-review.json`, `final-review-followup.json`).
- `git diff --check` passes.

The broad route review found low-contrast captions in the dark showcase pages; scoped text colors were corrected without retheming workbenches or the homepage. English and Chinese desktop/mobile screenshots were inspected after the fix.

All changes remain local. No commit, push or deployment was performed.
