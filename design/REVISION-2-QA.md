# Revision 2 — method-first positioning

## Design
- SZKL / knowledge-institution archetype; approved S2 light editorial language, document scrolling.
- Primary object: Capture → Compute → Act. A connected method diagram replaces the opening product collage. It is a conceptual system diagram, not a live data or performance display.
- Three capability chapters explain the work, SZKL's specific advantage, the technology/methods and the user output.
- Capture: in-house hardware engineering and access to Shenzhen's component, prototyping and manufacturing ecosystem.
- Compute: vision, speech, retrieval/language and predictive model families; internal data-science and deployment experience. Named YOLO11s-pose / TrackNetV3 examples are scoped to RALLO's current prototype.
- Act: domain expertise, workflow integration, review, responsibility and outcome feedback.
- Product photographs, screenshots and concepts follow the method in the use-case section. Product images and portraits use contain framing rather than cutting off their subjects.
- Ethan is shown as PhD; Louis Zhang, PhD, joins the team and has a separate bilingual profile and downloadable business contact card.

## Responsive and bilingual checks
- Homepage checked at actual CSS viewports 1440×900, 1024×768 and 390×844 in EN and ZH. No horizontal overflow.
- Desktop: three method columns with direction indicators and three team columns. Mobile: a readable vertical method sequence, plus a concise Capture → Compute → Act line near the top.
- Labels, method/output descriptions, capabilities, navigation and use-case copy switch together.
- Both PhD designations are present on the homepage and individual profiles. Louis's English and Chinese profile and full portrait checked on mobile.
- Browser viewport scaling required compensation during capture; recorded dimensions were verified through rendered page geometry. Final screenshots use the browser's native capture.
- Representative screenshots: `design/qa-v2/`.

## Functional verification
- Method links navigate to their matching capability chapter.
- All four application tabs load the matching panel. Images load and retain contain framing.
- Language switching preserves the selected application.
- Arrow-key product navigation updates selection and focus.
- Image enlargement opens the correct image and closes with the labelled control.
- New Louis route renders with biography, PhD designation, language controls and contact link. An actual contact download event was verified.
- Louis profile also checked at 320×844 in EN/ZH, with no overflow. Ethan's PhD heading and Chinese profile checked.
- Browser console: no warnings or errors observed.
- Existing email and social placeholders remain; no messages sent.

## Release boundary
This is a revision of the private review site and GitHub draft PR #3. Production `main`, production hosting identity and the live szkl.com site remain unchanged. Public launch still requires Michael's final approval.

## Limits
No accuracy benchmark, hardware field validation or automatic model superiority is claimed by this marketing revision. Model capability statements remain scoped to project maturity. Missing social contacts still need owner input. Print/PDF pagination has not been independently verified in this revision.
