# Phenolab application revision

Date: 2026-09-24

## Implemented
- Replaced the LabPilot use case with Phenolab in English and Chinese, including tab labels, copy, accessibility text, product status and CTA.
- Direct CTA: https://lab.szkl.com, opening a new tab with noopener/noreferrer.
- Legacy application=labpilot links resolve to the Phenolab section.
- Official Pheno logo retained byte-for-byte on a white plate, with Phenolab product name outside the clear space. Website remains SZKL-owned.
- Larger, uncropped experiment-design preview replaces the old LabPilot canvas; visual evidence labels distinguish the pre-existing Designer mockup from deployed software.
- Actual application logo SHA-256 matches website asset: 2aaecb9751e4d8f01467161bc70ddb82f4ce3ab818247a3bdd2d54bba14f5cea.

## Verification
- TypeScript and production build passed. Design-brief validation passed.
- English/Chinese copy, labels, CTA destination, image labels and language persistence reviewed in browser.
- DOM layout checked at 1440x900, 1024x768 and 390x844: no horizontal document overflow; logo aspect ratio retained and product assets load.
- Image modal opens/closes in both languages. Product selection persists across language changes.
- Mobile screenshots saved in qa-v3. Desktop/tablet screenshot capture has a browser scaling/cropping issue; full-page stitching was discarded rather than presented as clean visual evidence. Desktop visual verification is therefore limited.

## Outstanding screenshot requirement
The live site opens its organization sign-in page. A fresh authenticated workspace screenshot is pending successful user sign-in. The current website illustration is the repository's existing Designer v0.1 design preview, explicitly labelled in both languages, with fictional example data corroborated by the repository seed fixture. It is not claimed to show the current deployed interface.

A separate local-only capture harness was prepared using the unmodified current HomeBoard component and fictional data. Browser URL policy blocked opening the local capture file; no workaround was attempted and it is not included in the public repository. No production app, database, account preferences or scientific records were changed.

## Deployment boundary
The GitHub review branch and local review are updated. The owner-private hosted Site is still on the previous revision: the bundled Sites publishing helper became unavailable after source opening and could not be found in the installed plugin directories. Main and production szkl.com remain unchanged.
