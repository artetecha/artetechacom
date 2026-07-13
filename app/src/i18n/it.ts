import type { Dictionary } from './en';

export const it = {
  nav: {
    home: 'Home',
    about: 'Chi sono',
    work: 'Lavori',
    writing: 'Blog',
    contact: 'Contatti',
  },
  meta: {
    siteTagline: 'Lo studio tecnologico di Vincenzo Russo',
    siteDescription:
      'Artetecha è lo studio tecnologico di Vincenzo Russo — solutions architect e software engineer. Piattaforme cloud-native, DevOps e solutions engineering AI-first.',
  },
  a11y: {
    skipToContent: 'Vai al contenuto',
    toggleTheme: 'Cambia tema colore',
    switchLang: 'Read in English',
    mainNav: 'Navigazione principale',
  },
  footer: {
    piva: 'P.IVA',
    rights: 'Tutti i diritti riservati.',
    since: 'Instancabili dal 2012.',
  },
  writing: {
    title: 'Blog',
    intro: 'Appunti su piattaforme, architettura e l’arte di rilasciare software.',
    readMore: 'Leggi tutto',
    published: 'Pubblicato',
    updated: 'Aggiornato',
    minRead: 'min di lettura',
    backToWriting: 'Tutti gli articoli',
    englishOnly: 'EN',
    englishOnlyTitle: 'Questo articolo è disponibile solo in inglese',
    archiveLink: 'Sfoglia l’archivio (2009–2019)',
    empty: 'Nuovi articoli in arrivo.',
  },
  archive: {
    title: 'Archivio',
    intro:
      'Una selezione di articoli dalla precedente incarnazione di questo sito (2009–2019), quando Artetecha era una società di consulenza londinese. Conservati per memoria storica: i consigli risentono della loro epoca.',
    notice:
      'Dall’archivio — pubblicato originariamente il {date} sulla versione precedente di artetecha.com.',
    back: 'Tutti gli articoli d’archivio',
  },
  work: {
    title: 'Lavori',
    intro:
      'Un percorso che attraversa editoria enterprise, broadcasting, istituzioni pubbliche e piattaforme per sviluppatori.',
    testimonialsTitle: 'Cosa dicono di me',
    stack: 'Stack',
    role: 'Ruolo',
  },
  home: {
    heroTitle: 'L’arte incontra la tecnica.',
    heroSubtitle:
      'Artetecha è lo studio tecnologico di Vincenzo Russo — solutions architect, software engineer e instancabile semplificatore di piattaforme complesse.',
    heroCtaWork: 'Guarda i lavori',
    heroCtaAbout: 'La storia',
    nowTitle: 'Di cosa mi occupo',
    nowItems: [
      {
        title: 'Solutions architecture',
        body: 'Progettazione di piattaforme cloud-native che allineano capacità tecniche e risultati di business — Kubernetes, PaaS, API e tutta la colla invisibile ma vitale che li tiene insieme.',
      },
      {
        title: 'DevOps & SDLC',
        body: 'Ingegneria delle pipeline CI/CD, developer velocity e cicli di vita del software che lasciano dormire sonni tranquilli.',
      },
      {
        title: 'Solutions engineering AI-first',
        body: 'AI pratica nel ciclo di sales engineering: agenti di sizing, automazione dei flussi di lavoro, contenuti e codice assistiti dall’AI che arrivano davvero in produzione.',
      },
    ],
    trustTitle: 'Hanno lavorato con me',
    latestTitle: 'Ultimi articoli',
    latestAll: 'Tutti gli articoli',
  },
  contact: {
    title: 'Contatti',
    intro: 'Il modo più rapido per raggiungermi è l’email. Mi trovi anche su LinkedIn e GitHub.',
    emailLabel: 'Scrivimi',
  },
  notFound: {
    title: 'Pagina non trovata',
    body: 'Questa pagina non esiste — oppure apparteneva al vecchio sito ed è andata in pensione nell’archivio.',
    cta: 'Torna alla home',
  },
} as const satisfies Dictionary;
