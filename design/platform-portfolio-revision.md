# Four-platform portfolio revision

## Scope
Owner-directed local revision of the group homepage, preserving thesis → technology → why now → team → compact platforms. No publication or commit.

- Pulse: forward-deployed enterprise AI, joining knowledge, operational data and business systems.
- RALLO: video/movement intelligence across sports and physical activities; position, speed, technique, statistics, feedback and guidance are the platform direction, not a claim of validated universal accuracy.
- Nian: everyday voice/audio → contextual knowledge, decisions and actionable information.
- PhenoLab: experimental data ontology connecting samples, instruments, protocols, conditions and results to model predictions.
- Removed Pheno operations as a separate homepage platform. Old `application=pheno-operations` and `#pheno-operations` homepage links resolve to Pulse. Existing detailed showcase routes remain available as evidence, not extra homepage platforms.

## Assets
Actual V4 high-throughput equipment footage replaces the lab photo. Silent 70-second web version with controls, no autoplay, visual-description tracks and a real extracted poster. Source video unchanged. RALLO uses its official transparent vector logo. Pulse/Pheno original PNG alpha preserved; CSS white plates removed. Nian has a newly created geometric SVG wordmark with a blue audio accent, explicitly requested by the owner after confirming no standalone logo existed. See asset-provenance.json.

## Verification
Task workspace: `/Users/michael/.hermes/reviews/szkl-platforms/`.
- Initial browser contract failed on the old five-item portfolio, white backgrounds, missing equipment video and narrow copy; current contract passes EN/ZH.
- Production build including TypeScript checks passed.
- Actual media playback and seeking passed in EN/ZH at desktop and mobile widths (4 states).
- Responsive rendering, images, language toggles, anchors and console/HTTP checks passed at 1440, 1024, 390 and 320 pixels in EN/ZH (8 states).
- 58 legacy navigation/profile/showcase checks and 4 mobile interactions passed.
- Axe WCAG A/AA scans: zero violations in 8 tested states; not a full accessibility certification.
- Added-source security scan: no findings. `git diff --check` passed.

## Local preview
The old Python SimpleHTTP server did not support Range requests, causing seeking failures. It was replaced with Vite's range-capable static preview on the same 127.0.0.1:4175 address. Range response verified as HTTP 206 and actual seeking retested successfully. This is local serving only; remote hosting has not been tested or changed.
