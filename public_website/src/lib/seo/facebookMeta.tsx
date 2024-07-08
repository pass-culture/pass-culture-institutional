import React from 'react'
import Head from 'next/head'

import { BaseTextProps, FacebookMetaProps } from '@/types/props'
import { getStrapiURL } from '@/utils/apiHelpers'

export function FacebookMeta(props: FacebookMetaProps & BaseTextProps) {
  return (
    <Head>
      <meta key="og:title" property="og:title" content={props.title} />
      <meta
        key="og:description"
        property="og:description"
        content={props.description}
      />
      <meta
        key="og:image"
        property="og:image"
        content={getStrapiURL(props.image?.data.attributes.url)}
      />
    </Head>
  )
}
