import { playlistOffersFixtures } from '../../__tests__/fixtures'

type HttpResponse<T> = {
  data: T
}

export async function fetchBackend<T>(path: string) {
  try {
    const requestUrl = `${
      process.env['BACKEND_API_URL'] ||
      'https://backend.testing.passculture.team/'
    }${path}`
    const key = process.env['INSTITUTIONAL_API_KEY']

    if (!key || key === 'je_suis_un_jeton_non_devinable') {
      console.warn(
        'Environnement variable INSTITUTIONAL_API_KEY not found, getting playlists from dummy data'
      )
      return { data: playlistOffersFixtures }
    }

    const mergedOptions = {
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
    }

    const response = await fetch(requestUrl, mergedOptions)
    // response.json().then((data) => console.log({ data }))
    if (!response.ok) {
      throw new Error(`Server returned a non-OK status: ${response.status}`)
    }

    const data: HttpResponse<T> = await response.json()
    return data
  } catch (error) {
    console.error(
      `Please check if the backend is running and you set all the required tokens. ${error}`
    )
    return { data: [] }
  }
}
