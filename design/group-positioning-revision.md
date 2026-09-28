# SZKL group-first homepage revision

## Design and hierarchy

A Decide/Learn surface, not a product catalogue. The new `GroupHome.tsx` presents one physical-AI thesis before technology, market logic, people and compact project evidence. The order is `#positioning` → `#technology` → `#why-now` → `#people` → `#projects` → contact.

Warm white, charcoal and restrained brand blue; existing SZKL brand and typography retained. An asymmetric editorial opening leads into an explicitly conceptual feedback-loop diagram. Three horizontally differentiated technical rows explain responsibilities, model/technology families, their importance and SZKL's engineering focus. Why-now pairs a single thesis block with technical shifts. Team portraits precede five compact project rows. No homepage app embeds, video, tabs, hidden full demonstrations, fake metrics or fake product graphics. The systems diagram becomes a legible vertical flow on mobile.

Main copy emphasizes preserving context, aligning observations with decisions, accountable outcomes, and reusable engineering disciplines with domain-specific validation. Boundaries for world models, VLA models and industry sources live in optional Further reading rather than interrupting the main narrative. No registered investment-fund or proven-moat claim.

Design self-audit: 0 compositional slop flags. No gradient, feature-tile grid, accent rails, unearned blur, fake metrics, icon toppers or centered stack. Existing Inter/Helvetica brand typography is intentionally retained, not introduced as a generic default.

## Grounding and bilingual content

Read `AGENTS.md`, actual source/styles, `design/content-sources.md`, `design/asset-provenance.json` and `/Users/michael/.hermes/reviews/szkl-group-positioning/research.md` before finalizing copy. Owner/source-backed prototype example: YOLO11s-pose and TrackNetV3, under evaluation. No named speech or foundation-model provider is asserted as adopted. Industry links explain world-model/VLA/edge/workflow-control context, not SZKL adoption or partnerships. OpenAI is cited only for agent-workflow safety principles, not as a recommendation for the deprecated Builder product.

Both English and Chinese were checked for section order, meaning, statuses, model distinctions, links, language controls and route behavior. Action is 行动; 执行 refers to execution. Approved Pulse English slogan remains unchanged. Pheno is framed around AI-enabled high-throughput interface-materials discovery, not solar-only.

## Files and compatibility

- `src/GroupHome.tsx`: new bilingual homepage, state, navigation and legacy-link normalization.
- `src/group.css`: namespaced responsive homepage styles; narrowly scoped standalone Pulse/Nian layout additions.
- `src/App.tsx`: minimal route shell selecting the new group homepage or preserved legacy route experiences.
- `src/LegacyApp.tsx`: preserves the previous local App source, profile tools, vCards, standalone RALLO/Phenolab/operations/capture viewers and unknown-showcase fallback. Adds Pulse concept and Nian prototype standalone routes. The old homepage source remains preserved but is not used for the homepage.
- `src/main.tsx`: adds group stylesheet after existing styles.
- `index.html`: group-first initial title and description; existing noindex retained.

Nian links to `?showcase=nian`: the existing `?showcase=capture` is a Phenolab glovebox concept and is preserved as such. Valid legacy `?application=` queries, including `labpilot`, select their compact teaser when the hash is absent or `#applications`. Other explicit hashes win. `#applications`, `#approach`, `#capture`, `#compute` and `#act` are normalized appropriately.

No dependencies, backend, public assets, brand assets, contacts, tokens or legacy files deleted. Existing unrelated dirty changes preserved. No commit or deployment.

## Actual verification

- Baseline RED observed with `node /Users/michael/.hermes/reviews/szkl-group-positioning/hierarchy.mjs`: missing positioning in EN and ZH.
- Final `npm run build`: PASS (TypeScript checks, Vite client/worker builds and profile-route postbuild).
- Final hierarchy test: PASS EN and ZH; ordered sections, exactly 3 phases and 5 projects; no homepage iframe/video.
- `node /Users/michael/.hermes/reviews/szkl-group-positioning/navigation.mjs`: PASS 54 cases across legacy links, explicit/reloaded navigation, profiles and standalone showcases, including language switching and desktop/mobile overflow checks.
- Additional Playwright check: PASS Nian showcase in EN/ZH at 1440px and 390px, language switching, no page errors or horizontal overflow.
- `git diff --check`: PASS.

Parent agent owns independent full visual, accessibility and interaction QA; this implementation report does not claim that as independently performed here. Dist/client rebuilt for the existing port-4175 preview; no server restart required.
