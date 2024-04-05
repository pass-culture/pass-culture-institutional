import React from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled from 'styled-components'

import { Header } from '@/lib/blocks/Header'
import { APIResponseData } from '@/types/strapi'
import { fetchCMS } from '@/utils/fetchCMS'

interface ListProps {
  notData: APIResponseData<'api::not-found.not-found'>
}

export default function NotFound({ notData }: ListProps) {
  return (
    <Root>
      {notData.attributes.header?.title &&
        notData.attributes.header?.image &&
        notData.attributes.header?.icon && (
          <Header
            title={notData.attributes.header?.title}
            text={notData.attributes.header?.text}
            image={notData.attributes.header?.image}
            icon={notData.attributes.header.icon}
            cta={notData.attributes.header.cta}
          />
        )}
    </Root>
  )
}

export const getStaticProps = (async () => {
  const query = stringify({
    populate: ['header.image', 'header', 'header.cta'],
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
