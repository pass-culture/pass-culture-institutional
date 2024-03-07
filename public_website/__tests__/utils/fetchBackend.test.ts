import { http, HttpHandler } from 'msw'
import { beforeAll, describe, expect, it } from 'vitest'

import { playlistOffersFixtures } from '../fixtures'
import { server } from '../server'
import { fetchBackend } from '@/utils/fetchBackend'

const respondWith = async (
  body: unknown,
  status = 200,
  statusText?: string,
  headers?: HeadersInit
): Promise<Response> => {
  return new Response(JSON.stringify(body), {
    headers: {
      'content-type': 'application/json',
      ...headers,
    },
    status,
    statusText,
  })
}

describe('fetchBackend', () => {
  const OLD_ENV = { ...process.env }

  beforeAll(() => {
    process.env = {
      ...OLD_ENV,
      BACKEND_API_URL: 'http://dummy_localhost:5001',
    }
  })

  it('should pass', async () => {
    const response = await fetchBackend(
      'institutional/playlist/Bons_plans_du_moment'
    )

    expect(response).toMatchObject(playlistOffersFixtures)
  })

  it('should fail if response is not ok', async () => {
    const statusCode = 500
    const requestUrl =
      'http://dummy_localhost:5001/institutional/playlist/Bons_plans_du_moment'
    const responseResolver: HttpHandler = http.get(requestUrl, () =>
      respondWith({}, statusCode)
    )
    server.use(responseResolver)

    await expect(
      fetchBackend('institutional/playlist/Bons_plans_du_moment')
    ).rejects.toThrow(
      `Please check if the backend is running and you set all the required tokens. Error: Backend returned a non-OK status: ${statusCode} on ${requestUrl}`
    )
  })
})
