import { getStrapiURL } from './apiHelpers'

export async function fetchAPI(path: string) {
  try {
    const mergedOptions = {
      headers: { 'Content-Type': 'application/json' },
    }

    const requestUrl = `${getStrapiURL(`/api${path}`)}`

    const response = await fetch(requestUrl, mergedOptions)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw new Error(
      `Please check if your server is running and you set all the required tokens.`
    )
  }
}
