import React from 'react'
import Head from 'next/head'

import { APIResponse } from '@/types/strapi'
import { getStrapiURL } from '@/utils/apiHelpers'

interface FacebookMetaProps {
  title: string
  description: string
  image: APIResponse<'plugin::upload.file'> | null | undefined
}
export function FacebookMeta(props: FacebookMetaProps) {
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
