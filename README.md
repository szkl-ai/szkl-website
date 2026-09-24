# SZKL — AI for the physical world

English and Simplified Chinese company website with separate Michael Liu, Ethan (Yixin) Zhang, PhD, and Louis Zhang, PhD, profile pages. The positioning follows a practical loop: **capture real-world data, understand it, act on it**.

## Review status

This branch is for debugging and owner approval. **Do not merge into `main` or deploy to the production SZKL project until Michael gives final approval.**

- [Private review site](https://szkl-physical-ai-review.mike944718.chatgpt.site/?lang=en) — requires ChatGPT sign-in.
- [Michael profile](https://szkl-physical-ai-review.mike944718.chatgpt.site/people/michael/?lang=en)
- [Ethan profile](https://szkl-physical-ai-review.mike944718.chatgpt.site/people/ethan/?lang=en)
- [Louis profile](https://szkl-physical-ai-review.mike944718.chatgpt.site/people/louis/?lang=en)
- Use `?lang=zh` for Chinese; use `?lang=en&application=rallo#applications` for an application deep link.

The review site is a separate hosting project. This repository deliberately retains the existing production `.openai/hosting.json` identity and Cloudflare worker configuration. **Pushing this branch does not authorize a production deployment.** Do not publish this checkout using the production hosting identity during review.

## Local development

Use Node.js 22.12+ or 24+, then:

```sh
npm ci
npm run dev
npm run build
```

The build checks TypeScript and retains the repository's Cloudflare/Sites build layout. The postbuild script generates direct profile pages, social metadata and contact cards in both `dist/client` and the mirrored static `dist` output. A static-only build with `dist/index.html` is also supported.

No backend, analytics, third-party runtime scripts or API keys are needed for the marketing UI. Contact actions open the user's email client; they do not submit a server-side form.

## Deployment settings

Builds default to the private review origin and disable search indexing. `noindex` is a search preference, **not access control**; privacy is supplied by the separate review hosting project.

Only after owner approval, use the approved public origin and explicitly allow indexing for the production build:

```sh
SITE_ORIGIN=https://szkl.com SITE_INDEXING=allow npm run build
```

These settings update built profile metadata, vCard URLs and robots directives. They do not deploy anything. Merge and production deployment remain separate actions requiring Michael's final approval. For another review host, set `SITE_ORIGIN` to that host and omit `SITE_INDEXING`.

## Content and assets

- Four applications: Nian, RALLO, LabPilot and Pulse; each explains capture, understanding, action and current maturity.
- Official SZKL, Pheno and Pulse artwork is copied from approved brand material. RALLO artwork comes from its product repository.
- Nian renderings show the approved August enclosure concept; captions distinguish these from the later physical-button prototype described by Michael.
- RALLO and LabPilot images are existing prototype screenshots. Hardware and workshop concepts are labelled. No quantified accuracy or autonomous-lab capability is asserted.
- Michael's LinkedIn and email are user-provided. Portraits and background material come from existing company collateral. Financing, valuation, awards and private contact details are excluded.
- Ethan's title, education details, biography and social contacts need confirmation before public launch. Unknown social contacts are visible, non-clickable placeholders.
- Source descriptions are in `design/asset-provenance.json`; official asset registrations and design tokens are under `tokens/`.

## Review checklist

See `design/QA-REPORT.md` and screenshots under `design/qa/`. English and Chinese were reviewed at desktop, tablet and mobile sizes. Product tabs, language persistence, image dialogs, profile links, copy-link actions and contact download were exercised in the browser.

Before approving public launch, confirm Ethan's profile, replace any available social placeholders, review product maturity claims, and select the final public origin. The current review site's content is the reference for the visual implementation; GitHub-specific changes preserve the production build wiring and add configurable build metadata.

## Method-first revision
The opening now explains Capture → Compute → Act, with SZKL advantages in hardware/supply-chain, model/data engineering and workflow delivery before the use cases. Product images retain their full framing. Ethan and Louis have owner-confirmed PhD designations. See `design/REVISION-2-QA.md`, `design/content-sources.md` and screenshots in `design/qa-v2/`.
