import React from 'react'
import Head from 'next/head'

import { ComponentSharedMetaSocialFragment } from '@/generated/graphql'
import { getStrapiURL } from '@/utils/apiHelpers'
import { isRenderable } from '@/utils/isRenderable'

export function FacebookMeta(props: ComponentSharedMetaSocialFragment) {
  const { title, description, image } = props
  const url = isRenderable(image?.url)
  return (
    <Head>
      <meta key="og:title" property="og:title" content={title} />
      <meta
        key="og:description"
        property="og:description"
        content={description}
      />
      {image && url && (
        <meta
          key="og:image"
          property="og:image"
          content={getStrapiURL(image.url)}
        />
      )}
    </Head>
  )
}
