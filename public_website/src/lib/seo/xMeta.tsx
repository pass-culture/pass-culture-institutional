import React from 'react'
import Head from 'next/head'

import { BaseTextProps, XMetaProps } from '@/types/props'
import { getStrapiURL } from '@/utils/apiHelpers'

export function XMeta(props: XMetaProps & BaseTextProps) {
  return (
    <Head>
      <meta
        key="twitter:title"
        property="twitter:title"
        content={props.title}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        key="twitter:description"
        property="twitter:description"
        content={props.description}
      />
      <meta
        property="twitter:image"
        content={getStrapiURL(props.image?.data.attributes.url)}
      />
    </Head>
  )
}
