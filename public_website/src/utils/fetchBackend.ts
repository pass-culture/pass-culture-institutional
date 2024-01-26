type HttpResponse<T> = {
  data: T
}

export async function fetchBackend<T>(path: string) {
  try {
    const requestUrl = `${
      process.env['NODE_ENV'] === 'development'
        ? 'http://dummy_localhost:5001/'
        : process.env['BACKEND_API_URL']
    }${path}`
    const key = process.env['INSTITUTIONAL_API_KEY']

    if (!key) {
      throw new Error(
        `Environnement variable INSTITUTIONAL_API_KEY not found, ${requestUrl}`
      )
    }

    const mergedOptions = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
    }

    const response = await fetch(requestUrl, mergedOptions)
    if (!response.ok) {
      throw new Error(`Server returned a non-OK status: ${response.status}`)
    }

    const data: HttpResponse<T> = await response.json()
    return data
  } catch (error) {
    throw new Error(
      `Please check if the backend is running and you set all the required tokens. ${error}`
    )
  }
}
