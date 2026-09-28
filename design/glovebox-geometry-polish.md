# PhenoLab glovebox geometry polish

## Scope

Owner-requested correction to the two renderings in `PhenolabEvidence`, not a change to the camera-frame annotation image, scientific copy, neural animation or HTE workflow. These remain conceptual visuals, not installation photography or validated engineering drawings. The public captions are preserved; robot alternative text now describes a sealed robotic enclosure in English and Chinese.

## Human demonstration rendering — full replacement

- Owner rejected the intermediate geometry-2 image despite its earlier visual review: the opaque fascia interrupted the window and the combined inside/outside arm paths appeared too long. That review does not establish acceptance.
- Generate an entirely new scene rather than editing the rejected composition. Stand the operator directly against the glovebox, with ordinary bent elbows and a short reach immediately behind the front pane.
- Use one uninterrupted rectangular transparent front panel with both access collars in its lower region. No stepped window, tall opaque patch or split facade.
- Make the near sleeve enter its collar naturally and continue to a proportionate black-gloved hand inside. The farther arm/collar is partly occluded by the operator, so exact continuity and equal physical diameter cannot be certified from this view.
- Retain the camera-capture story, wiring, external computer, transfer airlock and sample handling; whole-scene framing and equipment layout are new.

## Robotic enclosure rendering

- Remove both human glove ports completely, including black rubber gloves, metallic circular rings and their local fasteners.
- Reconstruct a continuous brushed-stainless fascia without circular plugs, ghost outlines or conspicuous patch seams.
- Preserve the two internal robot arms/hands, sample rack, cameras, wiring, transfer airlock and external computer close to the source composition.
- This supersedes the original robot prompt in `visual-prompts-v4.md` that explicitly asked for stowed human glove ports.

## Reproducibility and integration

- Native Codex generation; model identifier was not exposed. Current human: two fresh text-to-image candidates, selecting the second for its sleeve-to-port continuity and compact reach. Robot: the previously approved single edited candidate, unchanged.
- Both final assets retain 1672×941 dimensions, and are byte-identical copies of the inspected generation outputs.
- Original images and rejected intermediate edits are retained in `szkl-glovebox-polish`; the new human scene, brief and generation metadata are in the local `szkl-operator-rerender` review archive.
- `design/asset-provenance.json` records final SHA-256 hashes.
- Human URL uses `?v=geometry-3`; approved robot remains `?v=geometry-2` to prevent stale image reuse after deployment.

## Verification

- Inspected the whole newly rendered human scene for compact arm reach and continuous front glazing. This does not claim dimensional, sealing or engineering validation.
- The intermediate human review is superseded by the owner's rejection. The approved robot image is retained byte-for-byte.
- Browser regression first failed against the old image hash, then passed after replacement.
- Eight page states: English/Chinese × 1440, 1024, 390 and 320px. Checked exact asset hashes, complete aspect ratio, localized alternative text, captions, language switching, horizontal overflow and JavaScript errors.
- Existing 16-state capture annotation regression passed; the source frame and CSS box geometry were not changed.
- `npm run build` and `git diff --check` passed.
- Publication is separately gated on GitHub review/CI, actual-nginx candidate preflight and live verification; local build/image tests alone do not prove deployment.
