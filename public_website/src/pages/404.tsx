import React from 'react'
import styled from 'styled-components'

import { NotFoundDocument, NotFoundQuery } from '@/generated/graphql'
import { Header } from '@/lib/blocks/Header'
import { Seo } from '@/lib/seo/seo'
import urqlClient from '@/lib/urqlClient'

interface ListProps {
  notData: NonNullable<NotFoundQuery['notFound']>
}

export default function NotFound({ notData }: ListProps) {
  const { requiredTitle, text, requiredImage, requiredIcon, cta } =
    notData.header || {}

  return (
    <Root>
      {notData.seo && <Seo metaData={notData.seo} />}
      {requiredTitle && requiredImage && requiredIcon && (
        <Header
          requiredTitle={requiredTitle}
          text={text}
          requiredImage={requiredImage}
          requiredIcon={requiredIcon}
          cta={cta}
        />
      )}
    </Root>
  )
}

export const getStaticProps = async () => {
  const result = await urqlClient
    .query<NotFoundQuery>(NotFoundDocument, {})
    .toPromise()

  if (result.error || !result.data || !result.data.notFound) {
    console.error('GraphQL Error:', result.error?.message ?? 'No data')
    return { notFound: true }
  }

  return {
    props: {
      notData: result.data.notFound,
    },
    revalidate: false,
  }
}

const Root = styled.div`
  width: 100%;
`
