# SZKL production publishing

The marketing site is a static build served by the existing Tencent/nginx host. GitHub is the source of record; pushing or merging does not automatically deploy.

## Scope

- Production origin: `https://www.szkl.com`.
- `https://szkl.com` and HTTP preserve the existing HTTPS/www redirects, paths and queries.
- Only `/etc/nginx/sites-available/www.szkl.com` and the SZKL marketing release directory are changed. Other subdomains, DNS, certificates and mail are unchanged.
- `deploy/nginx/www.szkl.com.conf` retains the established host configuration, with a versioned webroot and a same-origin framing exception **only** for `/demos/rallo/`.
- Scripts stay under `script-src 'self'`. RALLO localization is an external first-party script, not an inline-script exception.

## Build and verification

Build a clean checkout of the merged GitHub commit:

```sh
npm ci
SITE_ORIGIN=https://www.szkl.com SITE_INDEXING=allow npm run build
```

Publish **only the contents of `dist/client`**, excluding dotfiles such as `.assetsignore`. Do not upload the repository, worker build, development dependencies, credentials or review logs. The build contains profile routes and first-party videos, captions and images.

Before publishing, exercise English and Chinese on desktop/mobile, neural animation and reduced motion, Pheno video playback, the single HTE workflow, Pheno annotations and layer toggles, profiles/contact links, and the RALLO embedded viewer under the production CSP. GitHub Actions runs the reproducible production build but does not deploy.

## Promotion and rollback

1. Read the active nginx configuration and compare it to the reviewed baseline before making changes.
2. Back up the current marketing webroot and nginx config outside the public root. Preserve the old `/var/www/szkl-website` directory.
3. Upload the clean artifact to a new directory `/var/www/szkl-releases/<commit>`. Verify every uploaded file against a SHA-256 manifest before activation.
4. Point `/var/www/szkl-releases/current` to that immutable release. On the initial migration this does not affect the old live root.
5. Install the reviewed site config, run `nginx -t`, and reload only after validation passes. If validation or reload fails, restore the saved config immediately.
6. Verify the public HTML and assets against the uploaded hashes, HTTPS redirects, profile deep links, security headers, video range requests and real browser functionality. Keep old hashed assets available for clients holding the prior HTML.
7. If public verification fails, restore the backed-up nginx config (which points at the preserved old root), validate and reload. For later releases, atomically restore the previous `current` symlink target.

Never delete backups or old releases as part of promotion. No SSH private key or hosting token belongs in GitHub or the public artifact.
