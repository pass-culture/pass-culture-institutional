import { http, HttpResponse } from 'msw'

import {
  activePlaylistTagsFixtures,
  playlistOffersFixtures,
  restaurantDataFixtures,
  testDataFixtures,
} from './fixtures'
import { ActusPassCultureJeunePageFixtures } from './fixtures/actualitesPassCulture'
import { ActusRdvActeursPageFixtures } from './fixtures/actualitesRdvActeursCulturels'
import { AideEnseignantsPageFixtures } from './fixtures/aide-enseignants'
import { AideJeunesParentsPageFixtures } from './fixtures/aide-jeunes-parents'
import { blogtechData, blogtechPage } from './fixtures/blog-tech'
import { EtudesPassCulturePageFixtures } from './fixtures/etudesPassCulture'
import { footer } from './fixtures/footer'
import { header } from './fixtures/header'
import { homePageFixtures } from './fixtures/home'
import { listeJeunePageFixtures } from './fixtures/listeJeune'
import { listeOffrePageFixtures } from './fixtures/listeOffre'
import { notFoundDataFixtures } from './fixtures/notFound'
import { PressePageFixtures } from './fixtures/presse'
import { reglements, reglementsPage } from './fixtures/reglements'
import { RessourcesPassFixtures } from './fixtures/ressourcespass'
import { RessourcesPassCulturePageFixtures } from './fixtures/ressourcesPassCulture'
import { simulatorPageFixtures } from './fixtures/simulator'

export const CMS_BASE_URL = 'http://localhost:1337'
const BACKEND_BASE_URL = 'http://dummy_localhost:5001'
export const jsonResponseOf = <T>(data: T) => HttpResponse.json({ data })

export const handlers = [
  http.get(`${CMS_BASE_URL}/api/header`, () => {
    return jsonResponseOf(header)
  }),
  http.get(`${CMS_BASE_URL}/api/footer`, () => {
    return jsonResponseOf(footer)
  }),
  http.get(`${CMS_BASE_URL}/api/test`, () => {
    return jsonResponseOf(testDataFixtures)
  }),
  http.get(`${CMS_BASE_URL}/api/restaurants`, () => {
    return jsonResponseOf(restaurantDataFixtures)
  }),
  http.get(`${CMS_BASE_URL}/api/active-playlist-tags`, () => {
    return jsonResponseOf(activePlaylistTagsFixtures)
  }),
  http.get(`${CMS_BASE_URL}/api/home`, () => {
    return jsonResponseOf(homePageFixtures.homeData)
  }),
  http.get(`${CMS_BASE_URL}/api/news-list`, () => {
    return jsonResponseOf(homePageFixtures.latestStudies)
  }),
  http.get(`${CMS_BASE_URL}/api/simulator`, () => {
    return jsonResponseOf(simulatorPageFixtures.data)
  }),
  http.get(`${CMS_BASE_URL}/api/liste-jeune`, () => {
    return jsonResponseOf(listeJeunePageFixtures.listejeune)
  }),
  http.get(`${CMS_BASE_URL}/api/help`, () => {
    return jsonResponseOf(AideJeunesParentsPageFixtures.data)
  }),
  http.get(`${CMS_BASE_URL}/api/help-cultural-actors`, () => {
    return jsonResponseOf(AideJeunesParentsPageFixtures.data)
  }),
  http.get(`${CMS_BASE_URL}/api/help-teachers`, () => {
    return jsonResponseOf(AideEnseignantsPageFixtures.data)
  }),
  http.get(`${CMS_BASE_URL}/api/actualites-pass-culture`, () => {
    return jsonResponseOf(ActusPassCultureJeunePageFixtures.listejeune)
  }),
  http.get(`${CMS_BASE_URL}/api/actualites-rdv-acteurs-culturel`, () => {
    return jsonResponseOf(ActusRdvActeursPageFixtures.actusrdv)
  }),
  http.get(`${CMS_BASE_URL}/api/events`, () => {
    return jsonResponseOf(ActusRdvActeursPageFixtures.eventsData)
  }),
  http.get(`${CMS_BASE_URL}/api/etudes-pass-culture`, () => {
    return jsonResponseOf(EtudesPassCulturePageFixtures.etudesPassCulture)
  }),
  http.get(`${CMS_BASE_URL}/api/ressources-pass-culture`, () => {
    return jsonResponseOf(
      RessourcesPassCulturePageFixtures.ressourcesPassCulture
    )
  }),
  http.get(`${CMS_BASE_URL}/api/ressourcespass`, () => {
    return jsonResponseOf(RessourcesPassFixtures.ressourcespass)
  }),
  http.get(`${CMS_BASE_URL}/api/presse`, () => {
    return jsonResponseOf(PressePageFixtures.presse)
  }),
  http.get(`${CMS_BASE_URL}/api/liste-offre`, () => {
    return jsonResponseOf(listeOffrePageFixtures.offerListe)
  }),
  http.get(`${CMS_BASE_URL}/api/not-found`, () => {
    return jsonResponseOf(notFoundDataFixtures.notFoundDataFixtures)
  }),
  http.get(`${CMS_BASE_URL}/api/resources`, () => {
    return jsonResponseOf(homePageFixtures.latestStudies)
  }),
  http.get(`${CMS_BASE_URL}/api/blogtech-list`, () => {
    return jsonResponseOf(blogtechData)
  }),
  http.get(`${CMS_BASE_URL}/api/blogtech-pass-culture`, () => {
    return jsonResponseOf(blogtechPage)
  }),
  http.get(`${CMS_BASE_URL}/api/reglements`, () => {
    return jsonResponseOf(reglements)
  }),
  http.get(`${CMS_BASE_URL}/api/reglements-pass-culture`, () => {
    return jsonResponseOf(reglementsPage)
  }),

  http.get(
    `${BACKEND_BASE_URL}/institutional/playlist/Bons_plans_du_moment`,
    () => {
      return HttpResponse.json(playlistOffersFixtures)
    }
  ),
]
