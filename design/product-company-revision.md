# SZKL — product-company revision

## What changed
- Product-first opening with direct Pulse, RALLO, demo and pilot routes.
- Separate full-width product sections: Pulse's interactive investigation concept and RALLO's recorded-footage viewer remain working, explicitly labeled evidence.
- Concise English/Chinese copy, clearer hierarchy, a dark enterprise-product section, and the existing product identities.
- Progressive disclosure for technical detail, supporting workbenches, capture/compute/act chapters and repeatable-delivery material. These remain available rather than deleted.
- Real laboratory imagery, named people, profiles, vCards, QR codes and contact channels retained.
- Native expandable sections, visible keyboard focus, darker small blue text, and explicit/legacy deep-link handling.

## Claude involvement and final ownership
Claude Code was actually invoked with `--model claude-fable-5 --effort high`, after a successful real availability probe. It supplied the main product-led implementation and copy. The parent reviewed the rendered result, found it too long, and added progressive disclosure, tightened copy and spacing, and verified the final artifact independently. The Claude process was stopped during optional legacy-file cleanup; no legacy components were deleted. Existing unused modules were left intact, not removed through permission workarounds.

## Verification
Evidence and runnable QA harnesses: `/Users/michael/.hermes/reviews/szkl-product-polish/`.

- `run_final.py` records actual process exit codes in `final-checks.json`; it runs the TypeScript/Vite production build and real local-browser suites.
- Responsive EN/ZH homepage checks: 1440, 1024, 390 and 320 px; screenshots inspected at desktop and mobile sizes.
- Interactive investigation controls, language toggles, supporting-product tabs and keyboard selection, native disclosures, full viewer links and old product URLs exercised.
- Direct recorded RALLO demo playback/seek and independent tracking controls verified.
- Profiles/showcase routes and language switches checked; product assets, backend and dependencies unchanged.
- Axe WCAG 2 A/AA and 2.1 AA scans found no violations in the tested desktop/mobile EN/ZH states, both with primary disclosures closed and expanded. Automated scans are not complete accessibility certification.
- Tight regression tests first failed, then passed, for first-screen product access, excessive default page length, deep links inside closed disclosures, and explicit fragments taking precedence over old product query parameters.
- Independent final code review: `final-review.json`, passed with no blocking security or logic findings. Nonblocking reminder: include new `src/home.css` when eventually committing.

## Boundaries
Local preview only: `http://127.0.0.1:4175/?lang=en` or `?lang=zh`.
No deployment, commit, push, dependency change, backend change, or private-data import. No fabricated testimonials, customer adoption, accuracy, ROI or maturity claims. Pulse remains in development; RALLO remains a working recorded tracking demo with club-pilot development and explicit validation limits. Existing noindex policy is retained.

## Next credibility improvement
An approved real pilot case study with measured results and customer permission would add more credibility than additional decorative effects. Do not imply one exists until it is supplied and verified.
