/** Widens every leaf string so other locales can satisfy the same shape. */
type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepStringify<T[K]>;
};

export type Dictionary = DeepStringify<typeof en>;

export const en = {
  nav: {
    home: 'Home',
    about: 'About',
    work: 'Work',
    writing: 'Writing',
    contact: 'Contact',
  },
  meta: {
    siteTagline: 'The tech practice of Vincenzo Russo',
    siteDescription:
      'Artetecha is the tech practice of Vincenzo Russo — solutions architect and software engineer. Cloud-native platforms, DevOps, and AI-first solutions engineering.',
  },
  a11y: {
    skipToContent: 'Skip to content',
    toggleTheme: 'Toggle colour theme',
    switchLang: 'Leggi in italiano',
    mainNav: 'Main navigation',
  },
  footer: {
    piva: 'VAT no.',
    rights: 'All rights reserved.',
    since: 'Restless since 2012.',
  },
  writing: {
    title: 'Writing',
    intro: 'Notes on platforms, architecture, and the craft of shipping software.',
    readMore: 'Read more',
    published: 'Published',
    updated: 'Updated',
    minRead: 'min read',
    backToWriting: 'All writing',
    englishOnly: 'EN',
    englishOnlyTitle: 'This post is available in English only',
    archiveLink: 'Browse the archive (2009–2019)',
    empty: 'New writing is on its way.',
  },
  archive: {
    title: 'Archive',
    intro:
      'Selected posts from the previous incarnation of this site (2009–2019), when Artetecha was a London consultancy. Kept for the record — the advice is of its time.',
    notice: 'From the archive — originally published on {date} on the previous version of artetecha.com.',
    back: 'All archive posts',
  },
  work: {
    title: 'Work',
    intro:
      'A track record spanning enterprise publishing, broadcasting, government-adjacent institutions, and developer platforms.',
    testimonialsTitle: 'What people say',
    stack: 'Stack',
    role: 'Role',
  },
  home: {
    heroTitle: 'Art meets technique.',
    heroSubtitle:
      'Artetecha is the tech practice of Vincenzo Russo — solutions architect, software engineer, and restless simplifier of complex platforms.',
    heroCtaWork: 'See the work',
    heroCtaAbout: 'The story',
    nowTitle: 'What I do',
    nowItems: [
      {
        title: 'Solutions architecture',
        body: 'Cloud-native platform design that aligns technical capability with business outcomes — Kubernetes, PaaS, APIs, and the boring-but-vital glue between them.',
      },
      {
        title: 'DevOps & SDLC',
        body: 'CI/CD pipeline engineering, developer-velocity work, and software delivery life cycles that let teams sleep well at night.',
      },
      {
        title: 'AI-first solutions engineering',
        body: 'Practical AI in the sales-engineering loop: sizing agents, workflow automation, and AI-assisted content and code that actually ship.',
      },
    ],
    trustTitle: 'Trusted along the way by',
    latestTitle: 'Latest writing',
    latestAll: 'All writing',
  },
  contact: {
    title: 'Contact',
    intro: "The fastest way to reach me is email. I'm also on LinkedIn and GitHub.",
    emailLabel: 'Email me',
  },
  notFound: {
    title: 'Page not found',
    body: "This page doesn't exist — or it belonged to the old site and has retired to the archive.",
    cta: 'Back home',
  },
} as const;
