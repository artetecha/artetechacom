---
title: 'Artetecha.com'
date: '2026-07'
category: 'Websites'
client: 'Artetecha'
role: 'Design, development & deployment'
summary: >-
  A bilingual home for the practice, bringing services, past work, and writing
  together. A responsive design with light and dark themes, a simpler publishing
  workflow, and fourteen years of links preserved.
stack: ['Astro', 'TypeScript', 'Markdown', 'Upsun']
image: ../../../assets/portfolio/artetecha-desktop.png
imageAlt: 'The Artetecha homepage in dark mode, with a blue-to-lime headline, clear navigation, and rounded calls to action.'
screenshots:
  - image: ../../../assets/portfolio/artetecha-light.png
    alt: 'The desktop homepage in light mode, with the original brand colours carried through a pale blue and lime background.'
    caption: 'The same identity, adapted for a light theme.'
  - image: ../../../assets/portfolio/artetecha-mobile.png
    alt: 'The homepage on a mobile screen, with wrapping navigation, a stacked headline, and accessible calls to action.'
    caption: 'A responsive layout for smaller screens.'
website: 'https://www.artetecha.com/'
writeUp: '/writing/wordpress-to-astro-in-a-day/'
order: 5
---

## A new home for the practice

Artetecha’s old consultancy site had outlived the business it was built for.
The brief was to turn it into a home for the current practice: a clear account
of the work, room for new writing, and a way to start a conversation.

## Designed to work in two languages

English and Italian have their own pages and navigation, with a language
switcher that takes readers to the matching page. The original logo supplies
the colour palette, carried through light and dark themes, typography, and
responsive layouts.

## Less infrastructure, more room for content

The WordPress stack became an Astro site built from Markdown. Pages are
generated at build time and served from Upsun, with no database to maintain.
The migration also preserved fourteen years of URLs, so old links still lead
readers to the right place.
