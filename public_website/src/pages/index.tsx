import React from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled, { css } from 'styled-components'

import BlockRendererWithCondition from '@/lib/BlockRendererWithCondition'
import { CenteredText as AboutSection } from '@/lib/blocks/CenteredText'
import { LatestNews as LatestStudiesSection } from '@/lib/blocks/LatestNews'
import { PushCTA as CTASection } from '@/lib/blocks/PushCTA'
import { Seo } from '@/lib/seo/seo'
import { StyledSocialMedia } from '@/theme/style'
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
    <React.Fragment>
      {seo && <Seo metaData={seo} />}
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
            // There seem to be a bug with the `strapi.ts` helper file.
            // See https://github.com/PaulBratslavsky/strapi-next-js-no-types/issues/1#issuecomment-1812900338
            heroSection.images
              ?.data as unknown as APIResponseData<'plugin::upload.file'>[]
          }
        />
      </StyledHomeGradient>

      <AboutSection
        title={aboutSection.title}
        description={aboutSection.description}
      />

      <EligibilitySection
        title={eligibilitySection.title}
        items={eligibilitySection.items}
        cardTitle={eligibilitySection.cardTitle}
        cardDescription={eligibilitySection.cardDescription}
        cardCta={eligibilitySection.cardCta}
        cardFirstEmoji={eligibilitySection.firstEmoji}
        cardSecondEmoji={eligibilitySection.secondEmoji}
      />

      <StyledCTASection
        title={CTASection.title}
        description={CTASection.description}
        image={CTASection.image}
        ctaLink={CTASection.ctaLink}
        qrCodeDescription={CTASection.qrCodeDescription}
        qrCodeUrl={CTASection.qrCodeUrl}
      />

      <BlockRendererWithCondition condition={recommendationItems.length > 0}>
        <RecommendationsSection
          title={recommendationsSection.recommendations.title}
          recommendations={recommendationItems}
          cta={recommendationsSection.cta}
        />
      </BlockRendererWithCondition>

      <StyledLatestStudiesSection
        news={latestStudies}
        title={homeData.attributes.latestStudies.title}
        cta={homeData.attributes.latestStudies.cta}
      />

      <StyledSocialMedia
        title={socialMediaSection.title}
        socialMediaLink={socialMediaSection.socialMediaLink}
      />
    </React.Fragment>
  )
}

export const getStaticProps = (async () => {
  // Fetch home data
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

  /// Fetch 3 latest studies
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

  // Fetch recommandation items
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
    background: linear-gradient(180deg, #eae3ff 0%, #ffffff 100%);
    padding-top: 8rem;
    overflow: hidden;
    transform: translateY(-8rem);
    --module-spacing: 0;
    height: calc(100vh - 6.75rem);

    @media (width < ${theme.mediaQueries.mobile}) {
      transform: translateY(-7rem);
      padding-top: 7rem;
      margin-bottom: -5rem;
      height: calc(100vh - 6.75rem);
    }
  `}
`

const StyledCTASection = styled(CTASection)`
  ${({ theme }) => css`
    // margin-top: 12.5rem;
    // margin-bottom: 10rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      margin: 4.5rem 0;
    }
  `}
`

const StyledLatestStudiesSection = styled(LatestStudiesSection)`
  ${({ theme }) => css`
    // margin-top: 6rem;
    // margin-bottom: 6rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      margin: 3.5rem 0 5rem;
    }
  `}
`
