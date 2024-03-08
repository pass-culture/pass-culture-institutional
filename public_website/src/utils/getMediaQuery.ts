import { MediaQueries } from '@/theme/media-queries'

/**
 * Get value of media query in pixels
 */
export function getMediaQuery(name: MediaQueries) {
  return Number(name.split('rem')[0]) * 16
}
