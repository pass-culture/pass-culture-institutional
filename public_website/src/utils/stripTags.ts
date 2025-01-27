/**
 * Remove HTML tags from a string and merge spaces
 */
export function stripTags(str: string): string {
  return str
    ? str
        .replace(/(<([^>]+)>)/gi, '')
        .replace(/\s\s+/g, ' ')
        .replace('&nbsp;', ' ')
    : ''
}
