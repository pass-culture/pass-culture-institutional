import React from 'react'
import Head from 'next/head'

import { BaseTextProps, XMetaProps } from '@/types/props'
import { getStrapiURL } from '@/utils/apiHelpers'
import { isRenderable } from '@/utils/isRenderable'

export function XMeta(props: XMetaProps & BaseTextProps) {
  const { title, description, image } = props
  const URL = isRenderable(image?.data.attributes.url)
  return (
    <Head>
      <meta key="twitter:title" property="twitter:title" content={title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        key="twitter:description"
        property="twitter:description"
        content={description}
      />
      {image && URL && (
        <meta
          property="twitter:image"
          content={getStrapiURL(image.data.attributes.url)}
        />
      )}
    </Head>
  )
}
