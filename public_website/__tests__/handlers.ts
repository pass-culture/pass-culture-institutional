import { graphql, http, HttpResponse } from 'msw'

import { playlistOffersFixtures } from './fixtures'

import { ActusPassCulturePageFixtures } from './fixtures/actualitesPassCulture'
import { ActusRdvActeursPageFixtures } from './fixtures/actualitesRdvActeursCulturels'
import { AideEnseignantsPageFixtures } from './fixtures/aide-enseignants'
import { AideJeunesParentsPageFixtures } from './fixtures/aide-jeunes-parents'
import { EtudesPassCulturePageFixtures } from './fixtures/etudesPassCulture'
import { HomePageFixtures } from './fixtures/home'
import { ListeOffrePageFixtures } from './fixtures/listeOffre'
import { NotFoundDataFixtures } from './fixtures/notFound'
import { PressePageFixtures } from './fixtures/presse'
import { RessourcesPassCulturePageFixtures } from './fixtures/ressourcesPassCulture'
import { SimulatorPageFixtures } from './fixtures/simulator'
import { AideActeursCulturelsPageFixtures } from './fixtures/aide-acteurs-culturels'
import { ActusPassCultureJeunePageFixtures } from './fixtures/actualitesPassCultureJeune'

const BACKEND_BASE_URL = 'http://dummy_localhost:5001'

export const handlers = [
  graphql.query('Presse', () => {
    return HttpResponse.json({
      data: {
        ...PressePageFixtures,
      },
    })
  }),
  graphql.query('Simulateur', () => {
    return HttpResponse.json({
      data: {
        ...SimulatorPageFixtures,
      },
    })
  }),
  graphql.query('RessourcesPass', () => {
    return HttpResponse.json({
      data: {
        ...RessourcesPassCulturePageFixtures,
      },
    })
  }),
  graphql.query('ListeOffres', () => {
    return HttpResponse.json({
      data: {
        ...ListeOffrePageFixtures,
      },
    })
  }),
  graphql.query('Home', () => {
    return HttpResponse.json({
      data: {
        ...HomePageFixtures,
      },
    })
  }),
  graphql.query('EtudesPassCulture', () => {
    return HttpResponse.json({
      data: {
        ...EtudesPassCulturePageFixtures,
      },
    })
  }),
  graphql.query('AideJeunesParents', () => {
    return HttpResponse.json({
      data: {
        ...AideJeunesParentsPageFixtures,
      },
    })
  }),
  graphql.query('AideEnseignants', () => {
    return HttpResponse.json({
      data: {
        ...AideEnseignantsPageFixtures,
      },
    })
  }),
  graphql.query('AideActeursCulturels', () => {
    return HttpResponse.json({
      data: {
        ...AideActeursCulturelsPageFixtures,
      },
    })
  }),
  graphql.query('ActualitesRDVActeursCulturels', () => {
    return HttpResponse.json({
      data: {
        ...ActusRdvActeursPageFixtures,
      },
    })
  }),
  graphql.query('ActualitesJeunesParents', () => {
    return HttpResponse.json({
      data: {
        ...ActusPassCultureJeunePageFixtures,
      },
    })
  }),
  graphql.query('ActualitesPassCulture', () => {
    return HttpResponse.json({
      data: {
        ...ActusPassCulturePageFixtures,
      },
    })
  }),
  graphql.query('NotFound', () => {
    return HttpResponse.json({
      data: {
        ...NotFoundDataFixtures,
      },
    })
  }),

  http.get(
    `${BACKEND_BASE_URL}/institutional/playlist/Bons_plans_du_moment`,
    () => {
      return HttpResponse.json(playlistOffersFixtures)
    }
  ),
]
