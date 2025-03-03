/* eslint-disable @typescript-eslint/no-explicit-any */

import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

import { Pages } from '../src/domain/pages/pages.output'
import { PATHS } from '../src/domain/pages/pages.path'

const FILES_TO_IGNORE = [
  '_app.tsx',
  '_document.tsx',
  '_error.tsx',
  '[...slug].tsx',
  '404.tsx',
  'index.tsx',
]

interface SitemapEntry {
  url: string
  lastmod: string
  priority: number
}

interface SitemapSection {
  path: string
  prefix?: string
  name: string
}

const SITEMAP_SECTIONS: SitemapSection[] = [
  { path: PATHS.PAGES, name: 'pages' },
  { path: PATHS.RESOURCES, prefix: 'ressources', name: 'resources' },
  { path: PATHS.REGLEMENTS, prefix: 'reglements', name: 'reglements' },
  { path: PATHS.BLOGTECH, prefix: 'blog-tech', name: 'blog-tech' },
  { path: PATHS.EVENTS, prefix: 'evenement', name: 'events' },
  { path: PATHS.NEWS, prefix: 'actualite', name: 'actualites' },
]

function listStaticPages() {
  const pages = fs.readdirSync(path.join(__dirname, '../src/pages'))

  const staticPages = pages
    .filter((page) => page.includes('.tsx'))
    .filter((page) => !FILES_TO_IGNORE.includes(page))
  return [
    {
      url: '/',
      lastmod: new Date().toISOString(),
      priority: 1,
    },
    ...staticPages.map((page) => {
      return {
        url: `/${page.replace('.tsx', '')}`,
        lastmod: new Date().toISOString(),
        priority: 0.5,
      }
    }),
  ]
}

function createPathBasedEntry(path: string, updatedAt?: string): SitemapEntry {
  const slugParts = path.split('/').filter((slug: string) => slug.length > 0)
  return {
    url: slugParts.length > 0 ? `/${slugParts.join('/')}` : '/',
    lastmod: updatedAt ?? new Date().toISOString(),
    priority: slugParts.length > 0 ? 0.5 : 1,
  }
}

function createSlugBasedEntry(
  slug: string,
  prefix: string,
  updatedAt?: string
): SitemapEntry | null {
  const url = `/${prefix}/${slug}`
  if (url.includes('//')) {
    console.warn(
      `Double slash détecté dans l'URL: ${url}. Le slug "${slug}" ou le préfixe "${prefix}" pose problème.`
    )
    return null
  }

  return {
    url,
    lastmod: updatedAt ?? new Date().toISOString(),
    priority: 0.3,
  }
}

async function getSlugParts(
  path: string,
  prefix: string = ''
): Promise<SitemapEntry[]> {
  const pagesResponse = (await Pages.getPage(path, '')) as any[]

  if (!Array.isArray(pagesResponse) || pagesResponse.length === 0) {
    console.warn(`Aucune page trouvée pour le chemin: ${path}`)
    return []
  }

  if (pagesResponse[0].attributes?.Path) {
    return pagesResponse
      .map((page) => {
        if (!page.attributes?.Path) {
          console.warn(
            'Une page sans attribut Path détectée, elle sera ignorée'
          )
          return null
        }
        return createPathBasedEntry(
          page.attributes.Path,
          page.attributes.updatedAt
        )
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)
  }

  return pagesResponse
    .map((page) => {
      if (!page.attributes?.slug) {
        console.warn('Une page sans attribut slug détectée, elle sera ignorée')
        return null
      }
      return createSlugBasedEntry(
        page.attributes.slug,
        prefix,
        page.attributes.updatedAt
      )
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)
}

async function generateSitemap() {
  dotenv.config()
  const baseUrl =
    process.env['NEXT_PUBLIC_WEBSITE_URL'] || 'https://pass.culture.fr'

  const staticPages = listStaticPages()

  const dynamicPagesPromises = SITEMAP_SECTIONS.map((section) =>
    getSlugParts(section.path, section.prefix)
  )
  const dynamicPages = await Promise.all(dynamicPagesPromises)

  const sitemapEntries = [...staticPages, ...dynamicPages.flat()]
    .map((url) => {
      return `
    <url>
      <loc>${baseUrl}${url.url}</loc>
      <lastmod>${url.lastmod}</lastmod>
      <priority>${url.priority}</priority>
    </url>`
    })
    .join('')

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${sitemapEntries}
  </urlset>`

  const filePath = path.join(process.cwd(), 'public', 'sitemap.xml')
  fs.writeFileSync(filePath, sitemapXml, 'utf8')
  // eslint-disable-next-line no-console
  console.log(`Sitemap généré avec succès à ${filePath}`)
}

generateSitemap().catch((error) => {
  console.error('Erreur lors de la génération du sitemap:', error)
})
