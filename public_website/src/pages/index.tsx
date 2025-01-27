import React from 'react'
import styled, { css } from 'styled-components'

import { HomeDocument, HomeQuery } from '@/generated/graphql'
import BlockRendererWithCondition from '@/lib/BlockRendererWithCondition'
import { CenteredText as AboutSection } from '@/lib/blocks/CenteredText'
import { LatestNews as LatestStudiesSection } from '@/lib/blocks/LatestNews'
import { PushCTA } from '@/lib/blocks/PushCTA'
import { Separator } from '@/lib/blocks/Separator'
import PageLayout from '@/lib/PageLayout'
import urqlClient from '@/lib/urqlClient'
import { Offer } from '@/types/playlist'
import { Eligibility } from '@/ui/components/home/Eligibility'
import { Hero as HeroSection } from '@/ui/components/home/Hero'
import { Recommendations as RecommendationsSection } from '@/ui/components/home/Recommendations'
import { fetchBackend } from '@/utils/fetchBackend'

type HomeProps = {
  homeData: NonNullable<HomeQuery['home']>
  recommendationItems: Offer[]
  latestStudies: NonNullable<HomeQuery['resources']>
}

export default function Home({
  homeData,
  recommendationItems,
  latestStudies,
}: HomeProps) {
  const {
    seo,
    heroSection,
    aboutSection,
    eligibilitySection,
    CTASection,
    recommendationsSection,
    socialMediaSection,
  } = homeData

  return (
    <PageLayout
      seo={seo}
      title={undefined}
      socialMediaSection={socialMediaSection}>
      <StyledHomeGradient>
        <HeroSection {...heroSection} />
      </StyledHomeGradient>

      <span id="target-anchor-scroll">
        <AboutSection
          title={aboutSection.title ?? ''}
          description={aboutSection.requiredDescription}
        />
      </span>

      <Separator isActive={false} />
      <Eligibility {...eligibilitySection} />

      <Separator isActive={false} />
      <PushCTA
        title={CTASection.title}
        description={CTASection.description}
        image={CTASection.image}
        ctaLink={CTASection.ctaLink}
        qrCodeDescription={CTASection.qrCodeDescription}
        qrCodeUrl={CTASection.qrCodeUrl}
      />
      <Separator isActive={false} />
      <BlockRendererWithCondition condition={recommendationItems.length > 0}>
        <RecommendationsSection
          requiredTitle={recommendationsSection.recommendations.requiredTitle}
          recommendations={recommendationItems}
          cta={recommendationsSection.cta}
        />
      </BlockRendererWithCondition>
      <Separator isActive={false} />
      <LatestStudiesSection
        newsOrStudies={latestStudies.filter((item) => item !== null)}
        isNews={false}
        title={homeData.latestStudies.requiredTitle}
        cta={homeData.latestStudies.requiredCta}
      />
      <Separator isActive={false} />
    </PageLayout>
  )
}

export const getStaticProps = async () => {
  const result = await urqlClient
    .query<HomeQuery>(HomeDocument, {
      pagination: {
        limit: 3,
      },
      sort: ['date:desc'],
      filters: {
        category: {
          in: ['Étude ponctuelle', 'Étude ritualisée'],
        },
      },
    })
    .toPromise()

  if (result.error || !result.data || !result.data.home) {
    console.error('GraphQL Error:', result.error?.message ?? 'No data')
    return { notFound: true }
  }

  const recommendationTag =
    result.data.home.recommendationsSection.recommendationsBackendTag
  const recommendationItems = (await fetchBackend(
    `institutional/playlist/${recommendationTag}`
  )) as Offer[]

  return {
    props: {
      homeData: result.data.home,
      recommendationItems,
      latestStudies: result.data.resources,
    },
    revalidate: false,
  }
}

const StyledHomeGradient = styled.section`
  ${({ theme }) => css`
    background: linear-gradient(
      180deg,
      ${theme.colors.lila} 0%,
      ${theme.colors.white} 100%
    );
    padding-top: 8rem;
    transform: translateY(-8rem);
    height: calc(100vh - 6.75rem);

    @media (width < ${theme.mediaQueries.mobile}) {
      transform: translateY(-7rem);
      padding-top: 7rem;
      margin-bottom: -5rem;
      height: calc(100vh - 6.75rem);
      overflow: hidden;
    }
  `}
`
