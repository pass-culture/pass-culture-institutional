import { getStrapiURL } from './apiHelpers'

type HttpResponse<T> = {
  data: T
}

export async function fetchCMS<T>(path: string) {
  try {
    // console.log('fetchCMS', path)
    const apiPath = `/api${path}`
    const requestUrl = `${getStrapiURL(apiPath)}`

    // console.log('requestUrl', requestUrl)
    const token = process.env['ID_TOKEN']

    if (
      !requestUrl.includes('localhost') &&
      !requestUrl.includes('testing') &&
      !token
    ) {
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
      throw new Error(
        `CMS returned a non-OK status: ${response.status} on ${requestUrl}`
      )
    }

    const contentType = response.headers.get('Content-Type') || ''

    if (contentType.includes('application/json')) {
      const data: HttpResponse<T> = await response.json()
      return data
    } else {
      throw new Error(
        `Unexpected response. Content type received: ${contentType}`
      )
    }
  } catch (error) {
    throw new Error(
      `Please check if your CMS is running and you set all the required tokens. ${error}`
    )
  }
}
