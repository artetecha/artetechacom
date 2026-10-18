# Ayo website

A second app for Upsun project **Personal / Artetecha.com** (`z7in7lm43pz5c`).

- `app/` remains the existing Astro website at `www.artetecha.com`.
- `ayo/public/` contains the static Ayo website at `ayo.artetecha.com`.
- Both apps are configured in the repository's `.upsun/config.yaml`.

Ayo uses nginx static file serving, with no Node HTTP server, dependency installation, database, persistent mount or relationship to the main app. The Node image runs the build validation and an idle start command. Unknown paths return a real nginx 404 (`passthru: false`); they are not rewritten to the homepage. Only `public/` is exposed. HTML/assets use a short ten-minute cache so privacy and support edits can propagate.

The public site has Italian and English home, privacy and support pages. It remains marked as preparing its first App Store release. The homepages present Ayo as born from frustration with Aruba PEC and intended to welcome other supported providers, with localized screenshots of the real app using sample data. They explain the planned Free/Plus split: one account free, multi-account and receipt signature verification in Plus, a €2.99 one-time introductory price and a planned €9.99 regular price. Purchases, additional provider support and signature verification are clearly marked as planned; current connections remain Aruba-specific. Offer dates will be announced before launch, and early buyers will retain the described Plus unlock. Compatibility details remain available in expandable sections and the support guide. No native app source, mailbox credentials or push relay is included here.

## Local checks

From this repository:

```sh
node ayo/validate.mjs
upsun app:config-validate
python3 -m http.server 8766 --directory ayo/public --bind 127.0.0.1
```

The validation checks the exact fourteen-file public set (including four localized screenshots), page languages, publisher contact, canonical origin and internal links. It is also the Ayo app's Upsun build hook.

## Updating content

The initial public files are generated from the Ayo iOS project's `Release/content.json`, `Release/publisher.json` and `scripts/generate_release_resources.py`. Keep privacy/help changes synchronized with the app's offline screens. In the Ayo workspace, `scripts/sync_upsun_website.py /absolute/path/to/artetechacom` copies only the generated public files into this checkout and verifies them. It does not push or deploy.

## Preview testing and production rollout

The pull request is intended for testing through the existing GitHub/Upsun integration. In its preview environment, select the route whose upstream is `ayo:http`; Upsun expands `ayo.{default}` to the environment-specific hostname. Test `/`, `/it/privacy/`, `/it/support/`, `/en/`, `/en/privacy/` and `/en/support/`, along with `/style.css`, `/favicon.png` and a nonexistent URL that must return 404. Follow the language links and verify the existing Artetecha app still works.

Opening the PR authorizes preview testing, not a production rollout. Production DNS, resource settings and merging to `main` remain pending owner approval. Before production deployment:

1. Refresh this branch against current `main` and recheck the configuration diff. Preserve the existing app name, source root, build and all redirects.
2. Confirm resources for the new `ayo` container in project `z7in7lm43pz5c`; adding it changes the project's resource footprint. Do not replace the existing app's resource allocation.
3. Verify the domain configuration and obtain the exact project-provided DNS target. The project already has `artetecha.com` as its default domain; `ayo.{default}` selects its Ayo subdomain. Set the `ayo.artetecha.com` DNS record to Upsun's instructed target and verify certificate issuance. Do not guess or reuse another project's target.
4. Merge the tested change using the project's existing GitHub/Upsun integration only when production deployment is approved, and verify the resulting environment.
5. Check `www.artetecha.com`, its apex/legacy redirects, Ayo's root and both languages' privacy/support pages, HTTP-to-HTTPS redirects, static assets and genuine 404 responses.
6. Run the Ayo release packet's submission preflight against the public URLs. Hosting does not complete iOS distribution signing or live device acceptance.

References: [multi-app structure](https://developer.upsun.com/docs/configure-apps/multi-app/project-structure), [subdomain routes](https://developer.upsun.com/docs/configure-apps/multi-app/routes).
