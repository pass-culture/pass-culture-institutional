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

  it('should fail when no key is found', async () => {
    process.env = {
      ...OLD_ENV,
      BACKEND_API_URL: 'http://dummy_localhost:5001/',
    }

    await expect(fetchBackend('institutional/playlist/test')).rejects.toThrow(
      'Please check if the backend is running and you set all the required tokens. Error: Environnement variable INSTITUTIONAL_API_KEY not found, http://dummy_localhost:5001/institutional/playlist/test'
    )
  })

  describe('when key exists', () => {
    beforeAll(() => {
      process.env = {
        ...OLD_ENV,
        BACKEND_API_URL: 'http://dummy_localhost:5001/',
        INSTITUTIONAL_API_KEY: 'dummy_key',
      }
    })

    it('should pass', async () => {
      const response = await fetchBackend('institutional/playlist/test')

      expect(response).toMatchObject(playlistOffersFixtures)
    })

    it('should fail if response is not ok', async () => {
      const statusCode = 500
      const responseResolver: HttpHandler = http.get(
        'http://dummy_localhost:5001/institutional/playlist/test',
        () => respondWith({}, statusCode)
      )
      server.use(responseResolver)

      await expect(fetchBackend('institutional/playlist/test')).rejects.toThrow(
        `Please check if the backend is running and you set all the required tokens. Error: Server returned a non-OK status: ${statusCode}`
      )
    })
  })
})
