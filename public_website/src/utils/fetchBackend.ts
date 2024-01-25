type HttpResponse<T> = {
  data: T
}

export async function fetchBackend<T>(path: string) {
  try {
    const apiPath = `/api${path}`
    const requestUrl = `${
      process.env['BACKEND_API_URL'] ||
      'https://backend.testing.passculture.team/'
    }${apiPath}`
    const token = process.env['INSTITUTIONAL_API_TOKEN']

    if (!token) {
      console.warn(
        'Environnement variable INSTITUTIONAL_API_TOKEN not found, getting playlists from dummy data'
      )
      return { data: [] } //TODO: add dummy data
    }

    const mergedOptions = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(requestUrl, mergedOptions)
    if (!response.ok) {
      throw new Error(`Server returned a non-OK status: ${response.status}`)
    }

    const data: HttpResponse<T> = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw new Error(
      `Please check if your server is running and you set all the required tokens. ${error}`
    )
  }
}
