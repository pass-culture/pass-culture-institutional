import React from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled, { css } from 'styled-components'

import { CenteredText } from '@/lib/blocks/CenteredText'
import { LatestNews } from '@/lib/blocks/LatestNews'
import { SocialMedia } from '@/lib/blocks/SocialMedia'
import { APIResponseData } from '@/types/strapi'
import { Eligibility } from '@/ui/components/home/Eligibility'
import { Hero } from '@/ui/components/help/Hero'
import { Faq } from '@/ui/components/help/Faq'
import { fetchCMS } from '@/utils/fetchCMS'

import { DoublePushCTA } from '@/lib/blocks/DoublePushCta'
import { SimplePushCta } from '@/lib/blocks/SimplePushCta'
interface HomeProps {
  homeData: APIResponseData<'api::home.home'>
  latestStudies: APIResponseData<'api::news.news'>[]
  helpData: APIResponseData<'api::help.help'>
}

export default function Help({ homeData, latestStudies, helpData }: HomeProps) {
  console.log(helpData)
  return (
    <React.Fragment>
      <Hero
        title={helpData.attributes.heroSection.Title}
        text={helpData.attributes.heroSection.Text}
        image={
          helpData.attributes.heroSection.Image
            ?.data as unknown as APIResponseData<'plugin::upload.file'>
        }
      />
      <Faq
        title="Les questions les plus posées"
        cta="Voir toute la FAQ"
        link="#"
      />
      <StyledPushCTA
        title={helpData.attributes.cardText?.title}
        description={helpData.attributes.cardText?.text}
        image={helpData.attributes.cardText?.image}
        ctaLink={helpData.attributes.cardText?.firstCta}
        sctaLink={helpData.attributes.cardText?.secondCta}
      />

      <StyledSimplePushCTA
        title={helpData.attributes.simplepushcta[0]?.title}
        description={helpData.attributes.simplepushcta[0]?.surtititle}
        image={helpData.attributes.simplepushcta[0]?.image}
        ctaLink={helpData.attributes.simplepushcta[0]?.cta}
      />

      <StyledSocialMedia
        title={helpData.attributes.social[0]?.title}
        links={helpData.attributes.social[0]?.socialMediaLink}
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
      'latestStudies',
      'latestStudies.cta',
      'socialMediaSection',
      'socialMediaSection.socialMediaLink',
    ],
  })
  const { data } = await fetchCMS<APIResponseData<'api::home.home'>>(
    `/home?${query}`
  )

  // Fetch 3 latest studies
  const latestStudiesQuery = stringify({
    sort: ['date:desc'],
    populate: ['image'],
    pagination: {
      limit: 3,
    },
    filters: {
      category: {
        $eq: 'Étude',
      },
    },
  })
  const latestStudies = await fetchCMS<APIResponseData<'api::news.news'>[]>(
    `/news-list?${latestStudiesQuery}`
  )

  // Fetch help data
  const helpQuery = stringify({
    populate: [
      'heroSection',
      'heroSection.Image',
      'cardText',
      'cardText.image',
      'cardText.firstCta',
      'cardText.secondCta',
      'social',
      'social.socialMediaLink',
      'social.title',
      'simplepushcta',
      'simplepushcta.image',
      'simplepushcta.cta',
    ],
  })

  const help = await fetchCMS<APIResponseData<'api::help.help'>>(
    `/help?${helpQuery}`
  )

  console.log(help.data)
  return {
    props: {
      homeData: data,
      latestStudies: latestStudies.data,
      helpData: help.data,
    },
  }
}) satisfies GetStaticProps<HomeProps>

const StyledPushCTA = styled(DoublePushCTA)`
  ${({ theme }) => css`
    margin-top: 12.5rem;
    margin-bottom: 10rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      margin: 4.5rem 0;
      margin-top: 13.125rem;
    }
  `}
`

const StyledLatestNews = styled(LatestNews)`
  ${({ theme }) => css`
    margin-top: 6rem;
    margin-bottom: 6rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      margin: 3.5rem 0 5rem;
    }
  `}
`

const StyledSocialMedia = styled(SocialMedia)`
  ${({ theme }) => css`
    margin-top: 6rem;
    margin-bottom: 5rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      margin: 5rem 0 6.25rem;
    }
  `}
`

const StyledFaq = styled(LatestNews)`
  ${({ theme }) => css`
    margin-top: 6rem;
    margin-bottom: 6rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      margin: 3.5rem 0 5rem;
    }
  `}
`

const StyledSimplePushCTA = styled(SimplePushCta)`
  ${({ theme }) => css`
    margin-top: 12.5rem;
    margin-bottom: 10rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      margin: 4.5rem 0;

      margin-top: 13.125rem;
    }
  `}
`
