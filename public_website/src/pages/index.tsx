import React from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled, { css } from 'styled-components'

import BlockRendererWithCondition from '@/lib/BlockRendererWithCondition'
import { CenteredText as AboutSection } from '@/lib/blocks/CenteredText'
import { LatestNews as LatestStudiesSection } from '@/lib/blocks/LatestNews'
import { PushCTA } from '@/lib/blocks/PushCTA'
import { Separator } from '@/lib/blocks/Separator'
import PageLayout from '@/lib/PageLayout'
import { Offer } from '@/types/playlist'
import { HomeProps } from '@/types/props'
import { APIResponseData } from '@/types/strapi'
import { Eligibility as EligibilitySection } from '@/ui/components/home/Eligibility'
import { Hero as HeroSection } from '@/ui/components/home/Hero'
import { Recommendations as RecommendationsSection } from '@/ui/components/home/Recommendations'
import { fetchBackend } from '@/utils/fetchBackend'
import { fetchCMS } from '@/utils/fetchCMS'

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
  } = homeData.attributes

  return (
    <PageLayout
      seo={seo}
      title={undefined}
      socialMediaSection={socialMediaSection}>
      <StyledHomeGradient>
        <HeroSection
          title={heroSection.title}
          subTitle={heroSection.subTitle}
          cta={heroSection.cta}
          firstEmoji={heroSection.firstEmoji}
          secondEmoji={heroSection.secondEmoji}
          thirdEmoji={heroSection.thirdEmoji}
          fourthEmoji={heroSection.fourthEmoji}
          fifthEmoji={heroSection.fifthEmoji}
          sixthEmoji={heroSection.sixthEmoji}
          images={
            heroSection.images
              ?.data as unknown as APIResponseData<'plugin::upload.file'>[]
          }
        />
      </StyledHomeGradient>

      <span id="target-anchor-scroll">
        <AboutSection
          title={aboutSection.title}
          description={aboutSection.description}
        />
      </span>

      <Separator isActive={false} />
      <EligibilitySection
        title={eligibilitySection.title}
        items={eligibilitySection.items}
        cardTitle={eligibilitySection.cardTitle}
        cardDescription={eligibilitySection.cardDescription}
        cardCta={eligibilitySection.cardCta}
        cardFirstEmoji={eligibilitySection.firstEmoji}
        cardSecondEmoji={eligibilitySection.secondEmoji}
      />
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
          title={recommendationsSection.recommendations.title}
          recommendations={recommendationItems}
          cta={recommendationsSection.cta}
        />
      </BlockRendererWithCondition>
      <Separator isActive={false} />
      <LatestStudiesSection
        newsOrStudies={latestStudies}
        newsType="resources"
        title={homeData.attributes.latestStudies.title}
        cta={homeData.attributes.latestStudies.cta}
      />
      <Separator isActive={false} />
    </PageLayout>
  )
}

export const getStaticProps = (async () => {
  const query = stringify({
    populate: [
      'heroSection',
      'heroSection.cta',
      'heroSection.images',
      'aboutSection',
      'eligibilitySection',
      'eligibilitySection.items',
      'eligibilitySection.cardCta',
      'CTASection',
      'CTASection.image',
      'CTASection.ctaLink',
      'recommendationsSection.cta',
      'recommendationsSection.recommendations.items',
      'recommendationsSection.recommendations.items.image',
      'latestStudies',
      'latestStudies.cta',
      'socialMediaSection',
      'socialMediaSection.socialMediaLink',
      'seo',
      'seo.metaSocial',
      'seo.metaSocial.image',
    ],
  })
  const { data } = await fetchCMS<APIResponseData<'api::home.home'>>(
    `/home?${query}`
  )

  const latestStudiesQuery = stringify({
    sort: ['date:desc'],
    populate: ['image'],
    pagination: {
      limit: 3,
    },
    filters: {
      category: {
        $eqi: ['Étude ponctuelle', 'Étude ritualisée'],
      },
    },
  })
  const latestStudies = await fetchCMS<
    APIResponseData<'api::resource.resource'>[]
  >(`/resources?${latestStudiesQuery}`)

  const recommendationTag =
    data.attributes.recommendationsSection.recommendationsBackendTag
  const recommendationItems = (await fetchBackend(
    `institutional/playlist/${recommendationTag}`
  )) as Offer[]

  return {
    props: {
      homeData: data,
      recommendationItems,
      latestStudies: latestStudies.data,
    },
  }
}) satisfies GetStaticProps<HomeProps>

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
