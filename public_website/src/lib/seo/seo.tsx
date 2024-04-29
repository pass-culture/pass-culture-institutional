import React from 'react'
import Head from 'next/head'
import { usePathname } from 'next/navigation'

import { FacebookMeta } from './facebookMeta'
import { XMeta } from './xMeta'
import { APIResponseData } from '@/types/strapi'

interface SeoProps {
  metaData: APIResponseData<'api::page.page'>['attributes']['seo']
}

export function Seo(props: SeoProps) {
  const path = usePathname()
  return (
    <React.Fragment>
      <Head>
        {props.metaData?.metaTitle && (
          <title>{props.metaData?.metaTitle}</title>
        )}
        {props.metaData?.metaDescription && (
          <meta name="description" content={props.metaData.metaDescription} />
        )}
        {props.metaData?.metaRobots && (
          <meta name="robots" content={props.metaData.metaRobots} />
        )}
        {props.metaData?.structuredData && (
          <script type="application/ld+json">
            {JSON.stringify(props.metaData?.structuredData)}
          </script>
        )}
        {props.metaData?.metaViewport && (
          <meta name="viewport" content={props.metaData?.metaViewport} />
        )}
        {props.metaData?.keywords && (
          <meta name="keywords" content={props.metaData.keywords} />
        )}
        <link
          rel="canonical"
          href={
            props.metaData?.canonicalURL
              ? props.metaData.canonicalURL
              : process.env['NEXT_PUBLIC_APP_URL'] + path
          }
        />
      </Head>
      {props.metaData &&
        props.metaData.metaSocial &&
        props.metaData.metaSocial.map((social) => (
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
