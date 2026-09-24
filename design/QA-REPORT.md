# Design QA report — SZKL Physical AI review

## Project decision
- Owner brand: SZKL. Archetype: knowledge-institution.
- Dominant object: capture → understand → act, expressed through real product applications.
- Composition: institutional editorial homepage, interactive application index, separate one-page people profiles.
- Shell: document. Public marketing deliberately uses document scrolling, without artificial application panes. At compact widths columns become a single reading sequence.
- Primary action: discuss a specific pilot through business email.

## Sources
- Current Pheno SZKL Design System; `tokens/szkl.tokens.json`, `tokens/layout.tokens.json`, `tokens/themes.css`.
- Official `szkl.wordmark.dark` asset, copied without recolouring or redrawing.
- Black SZKL logo SHA-256: cf376455b31370b99f59a7e7eed9ae589e99e8bcc73fb52655f0731b02dbc072
- Approved official SZKL web icon set. Official Pulse and Pheno marks; current RALLO mark from product repository.
- Company scope follows Michael's new brief; old knowledge-only positioning is superseded for this review. No production site changed.

## States
- Populated: implemented. Four application panels, bilingual content, two profiles.
- Loading: local static image loading, lazy images below fold. No remote API data.
- Error/recovery: copy-link fallback message; image modal can close by button, backdrop or Escape.
- Missing information: social-contact placeholders; no empty or fake clickable links.
- Permission: private review hosting; no account signup, data collection or analytics inside the site.
- Evidence: photo, prototype screenshot and concept-render captions; application maturity descriptions.
- Offline: no service worker/offline promise. Local assets have no third-party runtime dependency.

## Responsive and language checks
| Viewport | English | Chinese | Overflow | Evidence |
|---|---|---|---|---|
| 1440×900 | checked | checked | none | home-en-1440.png, home-zh-1440.png |
| 1024×768 | checked | checked | none | home-en-1024.png, home-zh-1024.png |
| 390×844 | checked | checked | none | home-en-390.png, home-zh-390.png |
| 320×844 | Ethan profile checked | checked | none | DOM width check |

Bilingual labels, captions, alt text, application copy, links and selected states switch together. Existing product screenshots intentionally retain their original interface text and are identified as existing captures; captions and surrounding explanations are bilingual. Names and approved logo artwork are unchanged.

## Functional checks
- All four product tabs select the matching panel and update the deep-link parameter.
- Arrow-key navigation advances both selection and focus; tabs expose selected state.
- EN/中文 toggles preserve the chosen application and current page.
- Image modal opens with the correct full image and caption and closes correctly.
- Separate profile routes load and preserve language in return links.
- Copy profile link shows success.
- Contact download: initial generated-blob approach failed to surface a download in the embedded browser. Replaced with static .vcf files; actual browser download event verified for Michael.
- Email and LinkedIn destinations inspected. Email was not sent.

## Visual and accessibility checks
- Readable text and distinct heading hierarchy; restrained blue used for active states.
- Original logo images loaded. No broken loaded images in checked states.
- Visible focus outlines; native buttons, links, tabs and dialog. Image dialog has accessible name.
- Most buttons provide 44–48px targets; some inline contact/footer links are text links with smaller heights.
- Text colours: #667182 on white and #AAB3C0 on #07090D; text does not depend on colour alone.
- Reduced motion preference removes smooth scrolling and transitions.
- One-page print CSS implemented. Physical PDF pagination not yet independently verified.

## Technical checks
- TypeScript app and config checks: passed.
- Production build: passed.
- Corrected React 18 unsupported fetchPriority property warning by removing it.
- Browser console on final production build: no warnings or errors observed. Direct profile routes and mobile profile layout passed.

## Remaining review items
- Ethan's current title, education detail and social links need owner's final confirmation; based on existing team collateral.
- Current physical prototype photos for Nian were not found. Approved design renderings are labelled; do not treat them as photos of the latest prototype.
- RALLO automated scoring and technique suggestions, LabPilot camera capture and experiment recommendations are developmental, not proven production capabilities.
- The owner authorized publishing source to a separate branch of `szkl-ai/szkl-website` for debugging and approval. The hosted review remains private; merging `main`, public launch and replacing szkl.com require Michael's final approval.

## GitHub handoff checks — 2026-09-24
- Final UI source matches the reviewed bilingual site byte for byte.
- Existing production hosting identity and Cloudflare worker configuration are preserved.
- TypeScript and the original repository's Cloudflare/Sites production build pass.
- Profile pages, root-relative asset paths, contact-card URLs and robots directives pass in both the static output and Cloudflare client output.
- Review and production metadata modes were checked locally. The final local output was restored to review mode; no production deployment was performed.
- Asset provenance descriptions omit local machine paths. This repository is public; source publication is separate from the private review site's access controls.

## Recognition
The site remains recognisably SZKL through literal editorial hierarchy, predominantly black/white surfaces, restrained active blue, named sources, product-context flow and clearly differentiated evidence states. It avoids generic dashboard cards and decorative AI imagery.
