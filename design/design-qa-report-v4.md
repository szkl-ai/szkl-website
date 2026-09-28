# SZKL application evidence — revision 4 QA

Date: 2026-09-24
Review scope: Phenolab, glovebox capture, robotic-hand concept, RALLO motion viewer, Pheno operations and agent-workflow concept.

## Implemented
- Kept the Capture / Compute / Act company-first opening intact.
- Added a fifth application tab, with dynamic keyboard navigation across all five tabs.
- Replaced the old Phenolab design-preview image with a responsive, interactive, bilingual workbench recreation.
- Added three generated hardware/camera concepts, maintaining full image framing. Official Pheno gray/green and unmodified logo are used in all Pheno workbenches.
- Replaced RALLO's primary static image with the real public sample and recorded tracking engine. Independently selectable player, joint, shuttle and footstep layers, player filter, three rally controls and court heatmap work.
- Added Pheno employee/RFID, equipment and knowledge demonstration views and a separately labelled four-stage agent workflow concept.
- Added focused review links via `?showcase=phenolab`, `?showcase=capture`, `?showcase=operations`, and `?showcase=rallo`.

## Verification
- TypeScript checks and both build pipelines pass: the GitHub Cloudflare/static mirror and the independent static private-review project.
- Design-brief validator passes.
- EN and ZH meaning, labels, CTA destinations, image captions, ARIA names and capability status reviewed together.
- Browser checks at actual CSS viewports 1440×900, 1024×768 and 390×844: no horizontal page overflow; no broken loaded images. Tablet matrix saved alongside this report.
- Desktop five-column tabs and mobile two-column/last-full-width layout checked. End reaches Pulse; ArrowRight wraps from Pulse to Nian.
- Experiment step selection changes the inspector. English-to-Chinese toggle retains the selected step and translates its details.
- Capture object/hand controls change the annotation layers. Training-record selection changes the record view. Labels state that annotations are illustrative, and robot action data/validation remain separate requirements.
- Pheno employee selection switches between linked and pending RFID examples. Equipment and knowledge views work in both languages. Agent next-step controls reach preparation, human review and an explicitly simulated audit result; no live actions occur.
- RALLO tested standalone and embedded: playable second and third rallies, player filter A2, body-joint layer toggling, EN/ZH remount, video readiness and heatmap. The iframe resizes to its content (phone observed main height 953px, iframe 956px), avoiding a nested page scrollbar.
- Browser console error inspection returned no errors.
- All four RALLO source assets were compared with the current public deployment and are byte-identical. SHA evidence saved in `qa-v4/live-rallo-asset-check.json`.
- Browser screenshots inspected during QA. The current IAB capture API scales/crops large overridden viewports; do not present its incomplete desktop captures as full-screen marketing assets. A readable phone screenshot is retained in `qa-v4/rallo-phone-en.jpg`; the website itself renders full responsive workbenches rather than those cropped captures.

## Evidence and privacy boundaries
- No private employee, account or scientific records are included.
- Pheno UI images are original feature-based recreations, not authenticated live screenshots.
- Glovebox hardware, robotic hands and annotation examples are clearly identified as concepts.
- No force/torque inference, validated 3D biomechanics, autonomous scientific work or deployed agent orchestration is claimed.
- Production `szkl.com` and the production hosting project are unchanged. Work belongs to the existing review branch and the separate owner-private review project.
