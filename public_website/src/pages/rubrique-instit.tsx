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

interface ListProps {
  rubriqueInstitData: APIResponseData<'api::rubrique-instit.rubrique-instit'>[]
  rubriqueInstitPage: APIResponseData<'api::rubrique-instit-pass-culture.rubrique-instit-pass-culture'>
}

const setQuery = (): string => {
  return stringify({
    sort: ['date:desc'],
    populate: ['image'],
    pagination: {},
  })
}

export default function RubriqueInstit({
  rubriqueInstitData,
  rubriqueInstitPage,
}: ListProps) {
  const { buttonText, seo, socialMediaSection, title, cta } =
    rubriqueInstitPage.attributes

  return (
    <PageLayout seo={seo} title={title} socialMediaSection={socialMediaSection}>
      <ContentWrapper $noMargin>
        <UnpaddedBreadcrumb />
      </ContentWrapper>

      {rubriqueInstitData.length > 0 ? (
        <StyledListItems
          news={rubriqueInstitData}
          type="rubrique-instit"
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
  const rubriqueInstitQuery = setQuery()

  const rubriqueInstitData = (await getPage(
    PATHS.RUBRIQUE_INSTIT,
    rubriqueInstitQuery
  )) as APIResponseData<'api::rubrique-instit.rubrique-instit'>[]

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

  const rubriqueInstitPage = (await Pages.getPage(
    PATHS.RUBRIQUE_INSTIT_PAGE,
    query
  )) as APIResponseData<'api::rubrique-instit-pass-culture.rubrique-instit-pass-culture'>

  return {
    props: {
      rubriqueInstitData,
      rubriqueInstitPage,
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
