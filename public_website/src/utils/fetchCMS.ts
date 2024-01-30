import { getStrapiURL } from './apiHelpers'

type HttpResponse<T> = {
  data: T
}

export async function fetchCMS<T>(path: string) {
  try {
    const apiPath = `/api${path}`
    const requestUrl = `${getStrapiURL(apiPath)}`
    const token = process.env['ID_TOKEN']

    if (!requestUrl.includes('localhost') && !token) {
      throw new Error('Environnement variable ID_TOKEN not found')
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
