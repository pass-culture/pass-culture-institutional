import { http, HttpResponse } from 'msw'

import { restaurantDataFixtures, testDataFixtures } from './fixtures'

const BASE_URL = 'http://localhost:1337'

const jsonResponseOf = <T>(data: T) => HttpResponse.json({ data })

export const handlers = [
  http.get(`${BASE_URL}/api/test`, () => {
    return jsonResponseOf(testDataFixtures)
  }),
  http.get(`${BASE_URL}/api/restaurants`, () => {
    return jsonResponseOf(restaurantDataFixtures)
  }),
]
