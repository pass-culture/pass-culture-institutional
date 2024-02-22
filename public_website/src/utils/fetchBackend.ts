export async function fetchBackend(path: string) {
  try {
    const requestUrl = `${process.env['BACKEND_API_URL']}/${path}`

    const response = await fetch(requestUrl)

    if (!response.ok) {
      throw new Error(`Server returned a non-OK status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(
      `Please check if the backend is running and you set all the required tokens. ${error}`
    )
  }
}
