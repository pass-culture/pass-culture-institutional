export function getStrapiURL(path = '') {
  if (path.startsWith('/')) {
    return `${'http://localhost:1337'}${path}`
  }
  return path
}

export function getOfferUrl(id: number) {
  return `${
    process.env['NEXT_PUBLIC_APP_URL'] || 'https://app.testing.passculture.team'
  }/offre/${id}`
}
