import React from 'react'
import Head from 'next/head'
import { usePathname } from 'next/navigation'

import { FacebookMeta } from './facebookMeta'
import { XMeta } from './xMeta'
import { SeoProps } from '@/types/props'

export function Seo(props: SeoProps) {
  const {
    metaTitle = '',
    metaDescription = '',
    metaRobots = '',
    structuredData = '',
    metaViewport = '',
    keywords = '',
    canonicalURL = '',
    metaSocial = [],
  } = props.metaData ? props.metaData : {}

  const path = usePathname()

  return (
    <React.Fragment>
      <Head>
        {metaTitle && <title>{metaTitle}</title>}
        {metaDescription && (
          <meta name="description" content={metaDescription} />
        )}
        {metaRobots && <meta name="robots" content={metaRobots} />}
        {structuredData && (
          <script type="application/ld+json">
            {JSON.stringify(props.metaData?.structuredData)}
          </script>
        )}
        {metaViewport && <meta name="viewport" content={metaViewport} />}
        {keywords && <meta name="keywords" content={keywords} />}
        <link
          rel="canonical"
          href={canonicalURL || process.env['NEXT_PUBLIC_APP_URL'] + path}
        />
      </Head>
      {metaSocial?.map((social) => (
        <React.Fragment key={social.title}>
          {social.socialNetwork === 'Facebook' && (
            <FacebookMeta
              key={social.title}
              title={social.title}
              description={social.description}
              image={social.image}
            />
          )}
          {social.socialNetwork === 'X' && (
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
