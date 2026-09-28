# SZKL visual expansion — implementation and verification

## Delivered locally
- Replaced Michael, Ethan and Louis portraits with their existing user-approved cartoon PNGs, converted to 900×900 WebP. Shared people data updates both homepage and profile pages. Original photos and approved PNGs retained. Contain framing preserves faces and Louis's hands.
- Added progressive-enhancement scroll motion: finite hero entrance, staggered one-time editorial reveals, small card settling and bounded desktop image parallax. No scroll interception or pinning. Reduced-motion is static on initial load and preference changes; mobile omits parallax. Focus/Tab/hash navigation reveals instantly. Observers/listeners/RAF are cleaned up; default content remains visible without enhancement.
- Generated 15 distinct 1536×1024 images with Codex's native image-generation tool, three each: motion tracking, knowledge/memory, custom hardware, Nian exploded design, aspirational engineering workspace. Generative outputs were visually reviewed. Exact transparent SZKL branding was composited on each final image; there are no rectangular watermark plates.
- Integrated five representative images into the homepage while preserving the group-first narrative and four-platform portfolio. Added bilingual gallery `/?visual-studies=1&lang=en` with all fifteen variations and individual downloads.
- Nian follows the approved graphite circular pendant design and provided exploded reference; internals remain conceptual. Tiny blue-mark fidelity and contact visibility vary by view. Workspace scenes are aspirational concepts, not photos of the actual office. Captions/alt/gallery statements maintain these distinctions in EN/ZH.

## Source / output locations
- Portrait approval evidence: review workspace `headshots.json` and `~/.hermes/artifacts/szkl-portraits/`.
- Generation brief: `~/.hermes/reviews/szkl-visual-expansion/render-brief.md`.
- Three native-generation manifests (actual paths/prompts/retries): `renders/intelligence/manifest.json`, `renders/engineering/manifest.json`, `renders/nian/manifest.json` in that workspace.
- Web assets: `public/visuals/`; source/branding/hash manifest: review workspace `asset-manifest.json` and repository `design/asset-provenance.json`.
- Branded PNG masters, contact sheets and `SZKL-Visual-Studies.zip`: review workspace. Archive contains exactly 15 PNG, 15 WebP and five category preview sheets; CRC verified.

## Verification actually run
- Production build + TypeScript checks PASS.
- Integration contract originally RED for old portraits/missing images/gallery; final EN/ZH checks PASS.
- Live motion tests: 33 pass, 0 fail, including desktop/mobile, reduced-motion load/change, hash/focus visibility and bounded depth.
- Homepage responsive matrix: EN/ZH at 1440, 1024, 390, 320 pixels; no overflow, missing images, bad anchors, browser or HTTP errors.
- Gallery: 6 language/viewport states; exactly 15 distinct decoded images, three per category, language toggle, section links, downloads and axe checks pass.
- Existing navigation/profile/showcase: 58 cases PASS; mobile interactions: 4 cases PASS.
- Actual equipment video playback and seeking retained: 4 language/viewport states PASS.
- Homepage axe WCAG A/AA scans: no violations in 8 tested states. This is an automated scan, not full accessibility certification.
- Independent source review: PASS, no blocking security/logic/content findings. Optional refinements: gallery hash RAF cleanup, eager hero image loading, more explicit English concept caption wording.
- All 15 assets have unique verified SHA-256 hashes and valid 1536×1024 dimensions. Built image bytes match final source assets.
- All five category contact sheets and representative actual desktop/mobile screenshots inspected.

## Design audit
Primary surface: Decide/Learn, retaining existing editorial system. No generic equal-weight feature cards, glossy gradients, glassmorphism, fake metrics, centered-everything layout or unrelated icons added. Existing brand type and blue accent retained; imagery provides visual rhythm and authentic-looking engineering concepts rather than arbitrary decoration.

Local preview only. No commit, push, publication or deployment.
