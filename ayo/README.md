# Ayo website

A second app for Upsun project **Personal / Artetecha.com** (`z7in7lm43pz5c`).

- `app/` remains the existing Astro website at `www.artetecha.com`.
- `ayo/public/` contains the static Ayo website at `ayo.artetecha.com`.
- Both apps are configured in the repository's `.upsun/config.yaml`.

Ayo uses nginx static file serving, with no Node HTTP server, dependency installation, database, persistent mount or relationship to the main app. The Node image runs the build validation and an idle start command. Unknown paths return a real nginx 404 (`passthru: false`); they are not rewritten to the homepage. Only `public/` is exposed. HTML/assets use a short ten-minute cache so privacy and support edits can propagate.

The public site has Italian and English home, privacy and support pages, and is marked as preparing its first App Store release. The homepages describe Ayo as an independent PEC client with setup for Aruba PEC, Poste Italiane, Legalmail, Register.it and Namirial plus manual configuration, with localized screenshots of the real app using sample data. They explain Free (one mailbox) and Ayo Plus (a one-time in-app purchase for more mailboxes and on-device receipt signature checks) without quoting a price; the App Store shows it. The privacy page is the GDPR notice for the app, this site and email support. No native app source, mailbox credentials or push relay is included here.

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

## Preview and production

`ayo.artetecha.com` is live on `main` (DNS on Cloudflare, proxied). Every pull request gets an Upsun preview environment through the GitHub integration; in it, select the route whose upstream is `ayo:http`. Check `/`, both languages' home, privacy and support pages, `/style.css`, `/favicon.png` and a nonexistent URL that must return 404, and that `www.artetecha.com` still works. Merging to `main` deploys to production.

References: [multi-app structure](https://developer.upsun.com/docs/configure-apps/multi-app/project-structure), [subdomain routes](https://developer.upsun.com/docs/configure-apps/multi-app/routes).
