import { getStrapiURL } from './apiHelpers'

type HttpResponse<T> = {
  data: T
}

export async function fetchAPI<T>(path: string) {
  try {
    const mergedOptions = {
      headers: { 'Content-Type': 'application/json' },
    }

    const apiPath = `/api${path}`
    const requestUrl = `${getStrapiURL(apiPath)}`

    const response = await fetch(requestUrl, mergedOptions)
    const data: HttpResponse<T> = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw new Error(
      `Please check if your server is running and you set all the required tokens.`
    )
  }
}
