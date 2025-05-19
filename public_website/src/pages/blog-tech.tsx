import React from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled from 'styled-components'

import { getPage } from '@/domain/pages/pages.actions'
import { Pages } from '@/domain/pages/pages.output'
import { PATHS } from '@/domain/pages/pages.path'
import { ListItems } from '@/lib/blocks/ListItems'
import NoResult from '@/lib/blocks/NoResult'
import { Separator } from '@/lib/blocks/Separator'
import { SimplePushCta } from '@/lib/blocks/SimplePushCta'
import { WhiteSpace } from '@/lib/blocks/WhiteSpace'
import PageLayout from '@/lib/PageLayout'
import type { PushCTAProps } from '@/types/props'
import type { APIResponseData } from '@/types/strapi'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { fetchLayoutData } from '@/utils/fetchCMS'

interface ListProps {
  blogtechData: APIResponseData<'api::blogtech.blogtech'>[]
  blogtechPage: APIResponseData<'api::blogtech-pass-culture.blogtech-pass-culture'>
}

const setQuery = (): string => {
  return stringify({
    sort: ['date:desc'],
    populate: ['image'],
    pagination: {},
  })
}

export default function ListeActualitesPassCulture({
  blogtechData,
  blogtechPage,
}: ListProps) {
  const { buttonText, seo, socialMediaSection, title, cta } =
    blogtechPage.attributes

  return (
    <PageLayout seo={seo} title={title} socialMediaSection={socialMediaSection}>
      <ContentWrapper $noMargin>
        <UnpaddedBreadcrumb />
      </ContentWrapper>

      {blogtechData.length > 0 ? (
        <StyledListItems
          news={blogtechData}
          type="blog-tech"
          buttonText={buttonText}
        />
      ) : (
        <NoResult />
      )}

      <Separator isActive />
      <WhiteSpace />
      <SimplePushCta {...(cta as PushCTAProps)} />
      <Separator isActive={false} />
    </PageLayout>
  )
}

export const getStaticProps = (async () => {
  const blogtechQuery = setQuery()

  const blogtechData = (await getPage(
    PATHS.BLOGTECH,
    blogtechQuery
  )) as APIResponseData<'api::blogtech.blogtech'>[]

  const query = stringify({
    populate: [
      'title',
      'buttonText',
      'socialMediaSection',
      'socialMediaSection.socialMediaLink',
      'separator',
      'cta',
      'cta.image',
      'cta.cta',
      'seo',
      'seo.metaSocial',
      'seo.metaSocial.image',
    ],
  })

  const blogtechPage = (await Pages.getPage(
    PATHS.BLOGTECH_PAGE,
    query
  )) as APIResponseData<'api::blogtech-pass-culture.blogtech-pass-culture'>

  return {
    props: {
      ...(await fetchLayoutData()),
      blogtechData,
      blogtechPage,
    },
  }
}) satisfies GetStaticProps<ListProps>

const StyledListItems = styled(ListItems)`
  --module-spacing: 0;

  @media (width < ${(p) => p.theme.mediaQueries.mobile}) {
    margin-top: 1.5rem;
  }
`

const UnpaddedBreadcrumb = styled(Breadcrumb)`
  padding: 0;
`
