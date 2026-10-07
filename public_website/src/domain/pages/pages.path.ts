export const PATHS = {
  NEWS: 'news-list',
  SIMULATOR: 'simulator',
  RESSOURCES_PASS: 'ressourcespass',
  RESSOURCES_PASS_PAGE: 'ressources-pass-culture',
  RESSOURCES_TEACHERS_PAGE: 'ressources-enseignant',
  EVENTS: 'events',
  PAGES: 'pages',
  LISTE_JEUNES: 'liste-jeune',
  ACTU_PASS: 'actualites-pass-culture',
  ACTU_RDV_ACTEURS: 'actualites-rdv-acteurs-culturel',
  HELP_CULTURAL_ACTORS: 'help-cultural-actors',
  HELP_TEACHERS: 'help-teachers',
  HELP: 'help',
  RESOURCES: 'resources',
  HOME: 'home',
  OFFERS_LIST: 'liste-offre',
  PRESSE: 'presse',
  ETUDES_PASS_PAGE: 'etudes-pass-culture',
  MAP_SITE: 'plan-du-site',
  REGLEMENTS_PAGE: 'reglements-pass-culture',
  BLOGTECH_PAGE: 'blogtech-pass-culture',
  REGLEMENTS: 'reglements',
  BLOGTECH: 'blogtech-list',
  RUBRIQUE_INSTIT: 'rubrique-instit-list',
  RUBRIQUE_INSTIT_PAGE: 'rubrique-instit-pass-culture',
  OBSERVATORIES: 'observatories',
}

// Website routes of the Observatory. ROOT is not a Next.js page: it is served
// by `[...slug].tsx`, so a CMS page with the `observatoire` Path must exist.
export const OBSERVATORY_PATHS = {
  ROOT: '/observatoire',
  ARTICLES: '/observatoire/articles',
} as const
