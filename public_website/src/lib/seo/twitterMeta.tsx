import React from 'react'
import Head from 'next/head'

import { APIResponse } from '@/types/strapi'
import { getStrapiURL } from '@/utils/apiHelpers'

interface TwitterMetaProps {
  title: string
  description: string
  image: APIResponse<'plugin::upload.file'> | null | undefined
}
export function TwitterMeta(props: TwitterMetaProps) {
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
