import { http, HttpHandler } from 'msw'
import { describe, expect, it } from 'vitest'

import { testDataFixtures } from './fixtures'
import { server } from './server'
import { fetchAPI } from '@/utils/fetchAPI'

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

describe('fetchAPI', async () => {
  it('should fail if no token is found', async () => {
    await expect(fetchAPI('/test')).rejects.toThrow(
      'Environnement variable ID_TOKEN not found'
    )
  })
  it('should pass if token is found', async () => {
    process.env = { ...process.env, ID_TOKEN: 'your_dummy_token' }

    const response = await fetchAPI('/test')

    expect(response.data).toMatchObject(testDataFixtures)
  })

  it('should fail if response is not ok', async () => {
    process.env = { ...process.env, ID_TOKEN: 'your_dummy_token' }
    const statusCode = 500
    const responseResolver: HttpHandler = http.get(
      'http://localhost:1337/api/test',
      () => respondWith({}, statusCode)
    )
    server.use(responseResolver)

    await expect(fetchAPI('/test')).rejects.toThrow(
      `Server returned a non-OK status: ${statusCode}`
    )
  })

  it('should fail if response is html', async () => {
    process.env = { ...process.env, ID_TOKEN: 'your_dummy_token' }
    const responseResolver: HttpHandler = http.get(
      'http://localhost:1337/api/test',
      () => respondWith({}, 200, 'OK', { 'content-type': 'text/html' })
    )
    server.use(responseResolver)

    await expect(fetchAPI('/test')).rejects.toThrow(
      'Unexpected response. Content type received: text/html'
    )
  })

  it('should fail if the content-type is not specified', async () => {
    process.env = { ...process.env, ID_TOKEN: 'your_dummy_token' }
    const responseResolver: HttpHandler = http.get(
      'http://localhost:1337/api/test',
      () => respondWith({}, 200, 'OK', { 'content-type': '' })
    )
    server.use(responseResolver)

    await expect(fetchAPI('/test')).rejects.toThrow(
      'Unexpected response. Content type received: '
    )
  })
})
