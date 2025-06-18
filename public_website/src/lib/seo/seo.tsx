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
  const meta_title = metaData?.metaTitle && isRenderable(metaData?.metaTitle)
  if (!meta_title) {
    throw new Error(
      '[SEO] Le titre de la page est manquant. Vérifie la configuration SEO de cette page.'
    )
  }
  const meta_description =
    metaData?.metaDescription && isRenderable(metaData?.metaDescription)
  const meta_robots = metaData?.metaRobots && isRenderable(metaData?.metaRobots)
  const structure_data =
    metaData?.structuredData &&
    isRenderable(JSON.stringify(metaData?.structuredData))
  const meta_viewport =
    metaData?.metaViewport && isRenderable(metaData?.metaViewport)
  const keywords = metaData?.keywords && isRenderable(metaData?.keywords)
  const meta_social = metaData?.metaSocial
  const canonica_url =
    metaData?.canonicalURL && isRenderable(metaData?.canonicalURL)
  const path = usePathname()

  const setCanonicaURL = (): string => {
    if (canonica_url && metaData?.canonicalURL) {
      return metaData.canonicalURL
    }
    return process.env['NEXT_PUBLIC_APP_URL'] + path
  }

  return (
    <React.Fragment>
      <Head>
        {meta_title && <title>{metaData.metaTitle}</title>}
        {meta_description && (
          <meta name="description" content={metaData.metaDescription} />
        )}
        {meta_robots && <meta name="robots" content={metaData.metaRobots} />}
        {structure_data && (
          <script type="application/ld+json">
            {JSON.stringify(metaData.structuredData)}
          </script>
        )}
        {meta_viewport && (
          <meta name="viewport" content={metaData.metaViewport} />
        )}
        {keywords && <meta name="keywords" content={metaData.keywords} />}
        <link rel="canonical" href={setCanonicaURL()} />
      </Head>
      {meta_social?.map((social) => (
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
