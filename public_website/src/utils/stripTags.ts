/**
 * Remove HTML tags from a string and merge spaces
 */
export function stripTags(str: string): string {
  if (str) {
    return str
      .replace(/(<([^>]+)>)/gi, '')
      .replace(/\s\s+/g, ' ')
      .replace('&nbsp;', ' ');
  } else {
    return ''
  }
}
