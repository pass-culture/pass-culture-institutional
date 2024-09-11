import { getStrapiURL } from './apiHelpers'

type HttpResponse<T> = {
  data: T
}
export async function fetchCMS<T>(path: string) {
  try {
    const isDevMode = process.env.NODE_ENV === 'development'
    const apiPath = `/api${path}`
    const strapiURL = getStrapiURL(apiPath)
    const isLocalHost = strapiURL.includes('localhost')
    const sep = strapiURL.includes('?') ? '&' : '?'
    const requestUrl = `${strapiURL}${
      process.env['NEXT_PUBLIC_PREVIEW_MODE'] === 'true'
        ? `${sep}publicationState=preview`
        : ''
    }`

    if (isDevMode && !isLocalHost && !process.env['NEXT_PUBLIC_IAP_ID_TOKEN']) {
      throw new Error(
        `To use the remote CMS, you need NEXT_PUBLIC_IAP_ID_TOKEN to be present on your machine.`
      )
    }

    const mergedOptions = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env['NEXT_PUBLIC_IAP_ID_TOKEN']}`,
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
