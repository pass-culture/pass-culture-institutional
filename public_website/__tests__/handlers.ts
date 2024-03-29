import { http, HttpResponse } from 'msw'

import {
  activePlaylistTagsFixtures,
  playlistOffersFixtures,
  restaurantDataFixtures,
  testDataFixtures,
} from './fixtures'
import { AideJeunesParentsPageFixtures } from './fixtures/aide-jeunes-parents'
import { homePageFixtures } from './fixtures/home'
import { listeJeunePageFixtures } from './fixtures/listeJeune'
import { simulatorPageFixtures } from './fixtures/simulator'

const CMS_BASE_URL = 'http://localhost:1337'
const BACKEND_BASE_URL = 'http://dummy_localhost:5001'
const jsonResponseOf = <T>(data: T) => HttpResponse.json({ data })

export const handlers = [
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
  http.get(
    `${BACKEND_BASE_URL}/institutional/playlist/Bons_plans_du_moment`,
    () => {
      return HttpResponse.json(playlistOffersFixtures)
    }
  ),
]
