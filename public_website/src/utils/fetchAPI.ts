import { getStrapiURL } from './apiHelpers'

type HttpResponse<T> = {
  data: T
}

export async function fetchAPI<T>(path: string) {
  try {
    const token = process.env['ID_TOKEN']
    if (!token) {
      throw new Error('Environnement variable ID_TOKEN not found')
    }
    // eslint-disable-next-line no-console
    console.log(`fetching ${path} with token ${token}`)

    const mergedOptions = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const apiPath = `/api${path}`
    const requestUrl = `${getStrapiURL(apiPath)}`
    const nonOKStatuses = [
      400, 401, 402, 403, 404, 405, 406, 429, 500, 502, 503, 504,
    ]

    const response = await fetch(requestUrl, mergedOptions)
    if (nonOKStatuses.includes(response.status)) {
      throw new Error(`Server returned a non-OK status: ${response.status}`)
    }

    const contentType = response.headers.get('Content-Type') || ''

    if (contentType.includes('application/json')) {
      const data: HttpResponse<T> = await response.json()
      return data
    } else {
      // Handle non-JSON responses (e.g., display an error message)
      throw new Error(
        `Unexpected response. Content type received: ${contentType}`
      )
    }
  } catch (error) {
    console.error(error)
    throw new Error(
      `Please check if your server is running and you set all the required tokens. ${error}`
    )
  }
}
