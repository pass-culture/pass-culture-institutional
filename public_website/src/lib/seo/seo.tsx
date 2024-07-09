import React from 'react'
import Head from 'next/head'
import { usePathname } from 'next/navigation'

import { FacebookMeta } from './facebookMeta'
import { XMeta } from './xMeta'
import { SeoProps } from '@/types/props'
import { isRenderable } from '@/utils/isRenderable'
import { isStringAreEquals } from '@/utils/stringAreEquals'

export function Seo(props: SeoProps) {
  const { metaData } = props
  const META_TITLE = metaData?.metaTitle && isRenderable(metaData?.metaTitle)
  const META_DESCRIPTION =
    metaData?.metaDescription && isRenderable(metaData?.metaDescription)
  const META_ROBOTS = metaData?.metaRobots && isRenderable(metaData?.metaRobots)
  const STRUCTURE_DATA =
    metaData?.structuredData &&
    isRenderable(JSON.stringify(metaData?.structuredData))
  const META_VIEWPORT =
    metaData?.metaViewport && isRenderable(metaData?.metaViewport)
  const KEYWORDS = metaData?.keywords && isRenderable(metaData?.keywords)
  const METASOCIAL = metaData?.metaSocial
  const CANONICA_URL =
    metaData?.canonicalURL && isRenderable(metaData?.canonicalURL)
  const PATH = usePathname()

  const setCanonicaURL = (): string => {
    if (CANONICA_URL && metaData?.canonicalURL) {
      return metaData.canonicalURL
    }
    return process.env['NEXT_PUBLIC_APP_URL'] + PATH
  }

  return (
    <React.Fragment>
      <Head>
        {META_TITLE && <title>{metaData.metaTitle}</title>}
        {META_DESCRIPTION && (
          <meta name="description" content={metaData.metaDescription} />
        )}
        {META_ROBOTS && <meta name="robots" content={metaData.metaRobots} />}
        {STRUCTURE_DATA && (
          <script type="application/ld+json">
            {JSON.stringify(metaData.structuredData)}
          </script>
        )}
        {META_VIEWPORT && (
          <meta name="viewport" content={metaData.metaViewport} />
        )}
        {KEYWORDS && <meta name="keywords" content={metaData.keywords} />}
        <link rel="canonical" href={setCanonicaURL()} />
      </Head>
      {METASOCIAL?.map((social) => (
        <React.Fragment key={social.title}>
          {isStringAreEquals(social.socialNetwork, 'Facebook') && (
            <FacebookMeta
              key={social.title}
              title={social.title}
              description={social.description}
              image={social.image}
            />
          )}
          {isStringAreEquals(social.socialNetwork, 'X') && (
            <XMeta
              key={social.title}
              title={social.title}
              description={social.description}
              image={social.image}
            />
          )}
        </React.Fragment>
      ))}
    </React.Fragment>
  )
}
