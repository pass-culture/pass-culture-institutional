import { http, HttpResponse } from 'msw'

import { homeDataFixtures } from '@/pages/fixtures.test'

const BASE_URL = 'http://localhost:1337'

const jsonResponseOf = <T>(data: T) => HttpResponse.json({ data })

export const handlers = [
  http.get(`${BASE_URL}/api/restaurants`, () => {
    return jsonResponseOf(homeDataFixtures)
  }),
]
