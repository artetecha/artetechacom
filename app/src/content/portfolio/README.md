# Portfolio entries

Portfolio showcases websites and web apps from Artetecha alongside selected
historical engineering case studies. The broader career timeline stays in
`src/content/projects`; open-source tooling has its own homepage section.

Add a Markdown file under `en/` and its translation under `it/`, using the
same filename. The filename becomes `/portfolio/<filename>/` (or
`/it/portfolio/<filename>/`). A missing translation falls back to the other
language’s homepage in the switcher and does not publish a false hreflang pair.

Frontmatter:

- `title`, `category`, `summary`, `client`, `role`: project and contribution.
- `date`: required quoted `YYYY-MM` or `YYYY` string, e.g. `'2026-07'`.
  Use the known precision; for a multi-year engagement use its final year.
  The portfolio is sorted newest first, and the homepage shows the two most
  recent published projects automatically.
- `period`: optional display period, e.g. `'2010–2011'`.
- `historical: true`: places the case study in the earlier engineering section.
  Without a screenshot, it receives a text cover in Artetecha's own visual style.
- `relationship: employment`: labels the organisation as an employer and
  credits employment on cards and detail pages. Historical commissioned work
  defaults to an Artetecha Ltd team contribution.
- `image`, `imageAlt`: cover screenshot path, relative to this Markdown file,
  and a meaningful description. Store screenshots in `src/assets/portfolio/`.
- `screenshots`: optional gallery of `{ image, alt, caption }` entries.
- `stack`: technology names.
- `website`, `repository`: optional absolute URLs.
- `writeUp`: optional root-relative article URL, localized explicitly.
- `order`: ascending tie-breaker for projects in the same month; defaults to 99.
- `draft: true`: excludes an entry from the index, homepage, and routes.

The Markdown body is the case study. Explain the brief, the contribution,
and the delivered result. Use real screenshots and supported claims; do not
include credentials, personal customer data, or internal dashboards in images.
