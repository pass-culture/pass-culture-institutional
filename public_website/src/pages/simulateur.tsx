import React from 'react'
import styled, { css } from 'styled-components'

import {
  SimulateurDocument,
  SimulateurQuery,
  SimulatorFragment,
} from '@/generated/graphql'
import { SimplePushCta } from '@/lib/blocks/SimplePushCta'
import PageLayout from '@/lib/PageLayout'
import urqlClient from '@/lib/urqlClient'
import { PageWrapper } from '@/theme/style'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { Simulator } from '@/ui/components/simulator/Simulator'
import { Typo } from '@/ui/components/typographies'

type SimulatorPageProps = {
  data: SimulatorFragment
}

export default function SimulatorPage(props: SimulatorPageProps) {
  const { seo, title, description, socialMedias, offres } = props.data

  return (
    <PageLayout seo={seo} title={undefined} socialMediaSection={socialMedias}>
      <PageWrapper>
        <Root>
          <Title>{title}</Title>
          <Description>{description}</Description>
          <UnpaddedBreadcrumb />
          <StyledSimulator {...props.data} />
        </Root>
        {!!offres && (
          <SimplePushCta
            surtitle={offres.surtitle}
            requiredTitle={offres.requiredTitle}
            requiredImage={offres.requiredImage}
            requiredCta={offres.requiredCta}
            icon={offres.icon}
          />
        )}
      </PageWrapper>
    </PageLayout>
  )
}

const Root = styled(ContentWrapper)``

const Title = styled(Typo.Heading1)`
  margin-bottom: 1.75rem;
  padding-top: 1.75rem;
  @media (width < ${({ theme }) => theme.mediaQueries.mobile}) {
    text-align: center;
  }
`

const Description = styled(Typo.Body)`
  margin-bottom: 2rem;
  max-width: 38rem;

  @media (width < ${({ theme }) => theme.mediaQueries.mobile}) {
    text-align: center;
  }
`

const StyledSimulator = styled(Simulator)`
  ${({ theme }) => css`
    @media (width < ${theme.mediaQueries.tablet}) {
      margin-top: 2rem;
      margin-bottom: 2rem;
    }
  `}
`

export const getStaticProps = async () => {
  const result = await urqlClient
    .query<SimulateurQuery>(SimulateurDocument, {})
    .toPromise()

  if (result.error || !result.data || !result.data.simulator) {
    console.error('GraphQL Error:', result.error?.message ?? 'No data')
    return { notFound: true }
  }

  return {
    props: {
      data: result.data.simulator,
    },
    revalidate: false,
  }
}

const UnpaddedBreadcrumb = styled(Breadcrumb)`
  padding: 0;
`
