import fetchMock from 'fetch-mock'
import { describe, expect, it } from 'vitest'

import { fetchAPI } from '@/utils/fetchAPI'

describe('fetchAPI', async () => {
  it('should fail if no token is found', async () => {
    await expect(fetchAPI('/test')).rejects.toThrow(
      'Environnement variable ID_TOKEN not found'
    )
  })
  it('should pass if token is found', async () => {
    process.env = { ...process.env, ID_TOKEN: 'your_dummy_token' }
    fetchMock.get('http://localhost:1337/api/test', { data: 'dummy data' })

    const response = await fetchAPI('/test')
    expect(response).toEqual({ data: 'dummy data' })
  })

  it('should fail if response is not ok', async () => {
    process.env = { ...process.env, ID_TOKEN: 'your_dummy_token' }
    fetchMock.get('http://localhost:1337/api/test2', 500)

    await expect(fetchAPI('/test2')).rejects.toThrow(
      'Server returned a non-OK status: 500'
    )
  })

  it('should fail if response is not json', async () => {
    process.env = { ...process.env, ID_TOKEN: 'your_dummy_token' }

    fetchMock.get('http://localhost:1337/api/test3', {
      headers: { 'Content-Type': 'text/html' },
    })

    await expect(fetchAPI('/test3')).rejects.toThrow(
      'Unexpected response. Content type received: text/html'
    )
  })

  it('contentType should be false if no header is found', async () => {
    process.env = { ...process.env, ID_TOKEN: 'your_dummy_token' }

    fetchMock.get('http://localhost:1337/api/test4', 200)

    await expect(fetchAPI('/test4')).rejects.toThrow(
      'Unexpected response. Content type received: '
    )
  })
})
