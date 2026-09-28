# SZKL fundability revision — QA v5

Date: 2026-09-24 (America/Los_Angeles)
Owner: SZKL. Archetype: Knowledge Institution / Document Scroll.

## Validation
- Both English and Chinese source copy, calls to action, product status, five-stage Pulse concept and RALLO venue journey reviewed.
- Exact document widths 1440, 1024 and 390 px tested in both languages using a temporary same-origin viewport harness. All six had matching client and scroll widths and no broken loaded images. Evidence: qa-v5/responsive-matrix.json.
- Native in-app browser phone viewport measured 389 x 844 CSS pixels; Pulse panels and thesis visually inspected. Screenshots in qa-v5.
- Pulse stages Gather / Ask / Assess / Review / Verify exercised, including Next, Home/End keyboard selection and language changes retaining the selected stage.
- Product tabs selected Pulse and RALLO; RALLO embedded viewer retained its Chinese locale and new journey copy. Application deep-link initial scrolling fixed and checked.
- TypeScript checks and production builds pass for both review and GitHub configurations. git diff --check passes.
- Approved SZKL, Pulse and Pheno marks retained. English Pulse lockup stays unchanged in Chinese.
- No mock revenue or scale projections published. Scenario arithmetic remains in the separate private BP revision.

## Scope and limitations
- These are public-site presentation and interaction checks, not field validation of the products or commercial assumptions.
- The Pulse panel is explicitly an illustrative concept; it sends no messages and executes no manufacturing actions.
- RALLO session matching, payment and coaching are identified as proposed capabilities rather than functionality of the tracking viewer.
- Browser captured one MutationObserver error without source attribution during temporary harness testing. No MutationObserver exists in the site source; origin not established. Tested interactions completed successfully.
- The private BP HTML was source-reviewed; the browser policy blocked its local-file preview, so it is not included in visual QA claims.
