import React from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled from 'styled-components'

import { Pages } from '@/domain/pages/pages.output'
import { PATHS } from '@/domain/pages/pages.path'
import NoResult from '@/lib/blocks/NoResult'
import { RessourceItems } from '@/lib/blocks/ResourceItems'
import { Separator } from '@/lib/blocks/Separator'
import { SimplePushCta } from '@/lib/blocks/SimplePushCta'
import { WhiteSpace } from '@/lib/blocks/WhiteSpace'
import PageLayout from '@/lib/PageLayout'
import { ListReglementsProps } from '@/types/props'
import { APIResponseData } from '@/types/strapi'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'
import { ContentWrapper } from '@/ui/components/ContentWrapper'

const reglementsPageQuery = stringify({
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

const getReglementsQuery = () => {
  return stringify({
    sort: ['date:desc'],
    populate: ['cta'],
    pagination: {},
  })
}

export default function ReglementsPassCulture({
  reglementsData,
  reglementsPage,
}: ListReglementsProps) {
  const { buttonText, cta, seo, socialMediaSection, title } =
    reglementsPage.attributes

  return (
    <PageLayout seo={seo} title={title} socialMediaSection={socialMediaSection}>
      <ContentWrapper $noMargin>
        <UnpaddedBreadcrumb />
      </ContentWrapper>
      {reglementsData.length > 0 ? (
        <StyledListItems
          news={reglementsData}
          buttonText={buttonText}
          className=""
        />
      ) : (
        <NoResult />
      )}
      <Separator isActive />
      <WhiteSpace />
      {!!cta && (
        <SimplePushCta
          title={cta.title}
          image={cta.image}
          cta={cta.cta}
          surtitle={cta.surtitle}
          icon={cta.icon}
        />
      )}
      <Separator isActive={false} />
    </PageLayout>
  )
}

export const getStaticProps = (async () => {
  const reglementsQuery = getReglementsQuery()

  const reglements = (await Pages.getPage(
    PATHS.REGLEMENTS,
    reglementsQuery
  )) as APIResponseData<'api::reglement.reglement'>[]

  const reglementsPage = (await Pages.getPage(
    PATHS.REGLEMENTS_PAGE,
    reglementsPageQuery
  )) as APIResponseData<'api::reglements-pass-culture.reglements-pass-culture'>

  return {
    props: {
      reglementsData: reglements,
      reglementsPage,
    },
  }
}) satisfies GetStaticProps<ListReglementsProps>

const StyledListItems = styled(RessourceItems)``

const UnpaddedBreadcrumb = styled(Breadcrumb)`
  padding: 0;
`
