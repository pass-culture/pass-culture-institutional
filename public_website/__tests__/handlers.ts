import { http, HttpResponse } from 'msw'

import {
  activePlaylistTagsFixtures,
  playlistOffersFixtures,
  restaurantDataFixtures,
  testDataFixtures,
} from './fixtures'

const CMS_BASE_URL = 'http://localhost:1337'
const BACKEND_BASE_URL = 'http://dummy_localhost:5001'
// http://localhost:5001/institutional/playlist/tag_example
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
  http.get(
    `${BACKEND_BASE_URL}/institutional/playlist/Livre%20avec%20EAN`,
    () => {
      return jsonResponseOf(playlistOffersFixtures)
    }
  ),
]
