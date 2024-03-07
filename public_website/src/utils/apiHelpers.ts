export function getStrapiURL(path = '') {
  if (path.startsWith('/')) {
    return `${process.env['STRAPI_API_URL'] || 'http://localhost:1337'}${path}`
  }
  return path
}
