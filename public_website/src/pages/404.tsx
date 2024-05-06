import React from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled from 'styled-components'

import { Header } from '@/lib/blocks/Header'
import { Seo } from '@/lib/seo/seo'
import { APIResponseData } from '@/types/strapi'
import { fetchCMS } from '@/utils/fetchCMS'

interface ListProps {
  notData: APIResponseData<'api::not-found.not-found'>
}

export default function NotFound({ notData }: ListProps) {
  const { title, text, image, icon, cta } = notData.attributes.header || {}

  return (
    <Root>
      {notData.attributes.seo && <Seo metaData={notData.attributes.seo} />}
      {title && image && icon && (
        <Header title={title} text={text} image={image} icon={icon} cta={cta} />
      )}
    </Root>
  )
}

export const getStaticProps = (async () => {
  const query = stringify({
    populate: [
      'header',
      'header.image',
      'header.cta',
      'seo',
      'seo.metaSocial',
      'seo.metaSocial.image',
    ],
  })

  const { data } = await fetchCMS<APIResponseData<'api::not-found.not-found'>>(
    `/not-found?${query}`
  )

  return {
    props: { notData: data },
  }
}) satisfies GetStaticProps<ListProps>

const Root = styled.div`
  width: 100%;
`
