import { http, HttpHandler } from 'msw'
import { beforeAll, describe, expect, it } from 'vitest'

import { testDataFixtures } from '../fixtures'
import { server } from '../server'
import { fetchCMS } from '@/utils/fetchCMS'

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
const OLD_ENV = { ...process.env }

describe('fetchCMS', () => {
  it('should fail when not in localhost/testing and no token is found', async () => {
    process.env = {
      ...OLD_ENV,
      STRAPI_API_URL: 'https://siteinstit-cms.staging.passculture.team',
    }

    await expect(fetchCMS('/test')).rejects.toThrow(
      'Environnement variable ID_TOKEN not found'
    )
  })

  describe('when token exists', () => {
    beforeAll(() => {
      process.env = { ...OLD_ENV, ID_TOKEN: 'dummy_token' }
    })

    it('should pass', async () => {
      const response = await fetchCMS('/test')

      expect(response.data).toMatchObject(testDataFixtures)
    })

    it('should fail if response is not ok', async () => {
      const statusCode = 500
      const requestUrl = 'http://localhost:1337/api/test'
      const responseResolver: HttpHandler = http.get(requestUrl, () =>
        respondWith({}, statusCode)
      )
      server.use(responseResolver)

      await expect(fetchCMS('/test')).rejects.toThrow(
        `CMS returned a non-OK status: ${statusCode} on ${requestUrl}`
      )
    })

    it('should fail if response is html', async () => {
      const responseResolver: HttpHandler = http.get(
        'http://localhost:1337/api/test',
        () => respondWith({}, 200, 'OK', { 'content-type': 'text/html' })
      )
      server.use(responseResolver)

      await expect(fetchCMS('/test')).rejects.toThrow(
        'Unexpected response. Content type received: text/html'
      )
    })

    it('should fail if the content-type is not specified', async () => {
      const responseResolver: HttpHandler = http.get(
        'http://localhost:1337/api/test',
        () => respondWith({}, 200, 'OK', { 'content-type': '' })
      )
      server.use(responseResolver)

      await expect(fetchCMS('/test')).rejects.toThrow(
        'Unexpected response. Content type received: '
      )
    })
  })
})
