import React from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled, { css } from 'styled-components'

import { CenteredText as AboutSection } from '@/lib/blocks/CenteredText'
import { LatestNews as LatestStudiesSection } from '@/lib/blocks/LatestNews'
import { PushCTA as CTASection } from '@/lib/blocks/PushCTA'
import { SocialMedia as SocialMediaSection } from '@/lib/blocks/SocialMedia'
import { Seo } from '@/lib/seo/seo'
import { Offer } from '@/types/playlist'
import { APIResponseData } from '@/types/strapi'
import { Eligibility as EligibilitySection } from '@/ui/components/home/Eligibility'
import { Hero as HeroSection } from '@/ui/components/home/Hero'
import { Recommendations as RecommendationsSection } from '@/ui/components/home/Recommendations'
import { fetchBackend } from '@/utils/fetchBackend'
import { fetchCMS } from '@/utils/fetchCMS'

interface HomeProps {
  homeData: APIResponseData<'api::home.home'>
  recommendationItems: Offer[]
  latestStudies: APIResponseData<'api::resource.resource'>[]
}

export default function Home({
  homeData,
  recommendationItems,
  latestStudies,
}: HomeProps) {
  return (
    <React.Fragment>
      {homeData.attributes.seo && <Seo metaData={homeData.attributes.seo} />}
      <StyledHomeGradient>
        <HeroSection
          title={homeData.attributes.heroSection.title}
          subTitle={homeData.attributes.heroSection.subTitle}
          cta={homeData.attributes.heroSection.cta}
          firstEmoji={homeData.attributes.heroSection.firstEmoji}
          secondEmoji={homeData.attributes.heroSection.secondEmoji}
          thirdEmoji={homeData.attributes.heroSection.thirdEmoji}
          fourthEmoji={homeData.attributes.heroSection.fourthEmoji}
          fifthEmoji={homeData.attributes.heroSection.fifthEmoji}
          sixthEmoji={homeData.attributes.heroSection.sixthEmoji}
          images={
            // There seem to be a bug with the `strapi.ts` helper file.
            // See https://github.com/PaulBratslavsky/strapi-next-js-no-types/issues/1#issuecomment-1812900338
            homeData.attributes.heroSection.images
              ?.data as unknown as APIResponseData<'plugin::upload.file'>[]
          }
        />

        <AboutSection
          title={homeData.attributes.aboutSection.title}
          description={homeData.attributes.aboutSection.description}
        />
      </StyledHomeGradient>

      <EligibilitySection
        title={homeData.attributes.eligibilitySection.title}
        items={homeData.attributes.eligibilitySection.items}
        cardTitle={homeData.attributes.eligibilitySection.cardTitle}
        cardDescription={homeData.attributes.eligibilitySection.cardDescription}
        cardCta={homeData.attributes.eligibilitySection.cardCta}
        cardFirstEmoji={homeData.attributes.eligibilitySection.firstEmoji}
        cardSecondEmoji={homeData.attributes.eligibilitySection.secondEmoji}
      />

      <StyledCTASection
        title={homeData.attributes.CTASection.title}
        description={homeData.attributes.CTASection.description}
        image={homeData.attributes.CTASection.image}
        ctaLink={homeData.attributes.CTASection.ctaLink}
        qrCodeDescription={homeData.attributes.CTASection.qrCodeDescription}
        qrCodeUrl={homeData.attributes.CTASection.qrCodeUrl}
      />

      {recommendationItems.length > 0 && (
        <RecommendationsSection
          title={
            homeData.attributes.recommendationsSection.recommendations.title
          }
          recommendations={recommendationItems}
          cta={homeData.attributes.recommendationsSection.cta}
        />
      )}

      <StyledLatestStudiesSection
        news={latestStudies}
        title={homeData.attributes.latestStudies.title}
        cta={homeData.attributes.latestStudies.cta}
      />

      <StyledSocialMediaSection
        title={homeData.attributes.socialMediaSection.title}
        socialMediaLink={homeData.attributes.socialMediaSection.socialMediaLink}
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

const StyledHomeGradient = styled.div`
  ${({ theme }) => css`
    background: linear-gradient(
      180deg,
      rgba(233 223 238 / 1) 0%,
      rgba(233 223 238 / 0) 100%
    );
    padding-top: 8rem;
    overflow: hidden;
    transform: translateY(-8rem);
    --module-spacing: 0;

    @media (width < ${theme.mediaQueries.mobile}) {
      transform: translateY(-7rem);
      padding-top: 7rem;
      margin-bottom: -5rem;
    }
  `}
`

const StyledCTASection = styled(CTASection)`
  ${({ theme }) => css`
    margin-top: 12.5rem;
    margin-bottom: 10rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      margin: 4.5rem 0;
    }
  `}
`

const StyledLatestStudiesSection = styled(LatestStudiesSection)`
  ${({ theme }) => css`
    margin-top: 6rem;
    margin-bottom: 6rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      margin: 3.5rem 0 5rem;
    }
  `}
`

const StyledSocialMediaSection = styled(SocialMediaSection)`
  ${({ theme }) => css`
    margin-top: 6rem;
    margin-bottom: 5rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      margin: 5rem 0 6.25rem;
    }
  `}
`
