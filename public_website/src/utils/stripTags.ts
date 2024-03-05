/**
 * Remove HTML tags from a string and merge spaces
 */
export function stripTags(string: string): string {
  return string
    .replace(/(<([^>]+)>)/gi, '')
    .replace(/\s\s+/g, ' ')
    .replace('&nbsp;', ' ')
}
