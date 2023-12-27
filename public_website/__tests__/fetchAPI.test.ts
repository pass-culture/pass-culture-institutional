import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest'

import { fetchAPI } from '@/utils/fetchAPI'

const mockFetch = vi.spyOn(global, 'fetch')
const server = setupServer(
  http.get('http://localhost:1337/api/test', () => {
    return HttpResponse.json({ data: 'dummy data' })
  })
)

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

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
const mockSuccessfulResponse = { data: 'dummy data' }

describe('fetchAPI', async () => {
  it('should fail if no token is found', async () => {
    await expect(fetchAPI('/test')).rejects.toThrow(
      'Environnement variable ID_TOKEN not found'
    )
  })
  it('should pass if token is found', async () => {
    process.env = { ...process.env, ID_TOKEN: 'your_dummy_token' }
    mockFetch.mockResolvedValueOnce(await respondWith(mockSuccessfulResponse))
    const response = await fetchAPI('/test')
    expect(response).toEqual(mockSuccessfulResponse)
  })

  it('should fail if response is not ok', async () => {
    process.env = { ...process.env, ID_TOKEN: 'your_dummy_token' }
    mockFetch.mockResolvedValueOnce(await respondWith({}, 500))
    await expect(fetchAPI('/test')).rejects.toThrow(
      'Server returned a non-OK status: 500'
    )
  })

  it('should fail if response is not json', async () => {
    process.env = { ...process.env, ID_TOKEN: 'your_dummy_token' }
    mockFetch.mockResolvedValueOnce(
      await respondWith({}, 200, 'OK', { 'content-type': 'text/html' })
    )
    await expect(fetchAPI('/test')).rejects.toThrow(
      'Unexpected response. Content type received: text/html'
    )
  })

  it('contentType should be false if no header is found', async () => {
    process.env = { ...process.env, ID_TOKEN: 'your_dummy_token' }

    mockFetch.mockResolvedValueOnce(
      await respondWith(mockSuccessfulResponse, 200, 'OK', {
        'content-type': '',
      })
    )

    await expect(fetchAPI('/test')).rejects.toThrow(
      'Unexpected response. Content type received: '
    )
  })
})
