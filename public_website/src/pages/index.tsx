import React from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled, { css } from 'styled-components'

import { CenteredText } from '@/lib/blocks/CenteredText'
import { LatestNews } from '@/lib/blocks/LatestNews'
import { PushCTA } from '@/lib/blocks/PushCTA'
import { SocialMedia } from '@/lib/blocks/SocialMedia'
import { APIResponseData } from '@/types/strapi'
import { Eligibility } from '@/ui/components/home/Eligibility'
import { Hero } from '@/ui/components/home/Hero'
import { VerticalCarousel } from '@/ui/components/vertical-carousel/VerticalCarousel'
import { fetchCMS } from '@/utils/fetchCMS'

interface HomeProps {
  homeData: APIResponseData<'api::home.home'>
  latestStudies: APIResponseData<'api::news.news'>[]
}

const carouselItems = [
  // {
  //   title: 'Madonna',
  //   description: 'Accor Arena Réduction 50%',
  //   imageUrl: 'https://picsum.photos/seed/picsum/300/400',
  //   url: '#',
  // },
  {
    title: 'Lumières',
    description: 'Bassins des Lumières, Bordeaux Entrée gratuite grâce au pass',
    imageUrl: 'https://picsum.photos/seed/picsum/300/400',
    url: '#',
  },
  {
    title: 'Dali',
    description: 'Accor Arena Réduction 50%',
    imageUrl: 'https://picsum.photos/seed/picsum/300/400',
    url: '#',
  },
  {
    title: 'Madonna2',
    description: 'Accor Arena Réduction 50%',
    imageUrl: 'https://picsum.photos/seed/picsum/300/400',
    url: '#',
  },
  {
    title: 'Lumières2',
    description: 'Bassins des Lumières, Bordeaux Entrée gratuite grâce au pass',
    imageUrl: 'https://picsum.photos/seed/picsum/300/400',
    url: '#',
  },
  {
    title: 'Dali2',
    description: 'Accor Arena Réduction 50%',
    imageUrl: 'https://picsum.photos/seed/picsum/300/400',
    url: '#',
  },
  {
    title: 'Madonna3',
    description: 'Accor Arena Réduction 50%',
    imageUrl: 'https://picsum.photos/seed/picsum/300/400',
    url: '#',
  },
  {
    title: 'Lumières3',
    description: 'Bassins des Lumières, Bordeaux Entrée gratuite grâce au pass',
    imageUrl: 'https://picsum.photos/seed/picsum/300/400',
    url: '#',
  },
  {
    title: 'Dali3',
    description: 'Accor Arena Réduction 50%',
    imageUrl: 'https://picsum.photos/seed/picsum/300/400',
    url: '#',
  },
]

export default function Home({ homeData, latestStudies }: HomeProps) {
  return (
    <React.Fragment>
      <Hero
        title={homeData.attributes.heroSection.title}
        subTitle={homeData.attributes.heroSection.subTitle}
        cta={homeData.attributes.heroSection.cta}
        firstEmoji={homeData.attributes.heroSection.firstEmoji}
        secondEmoji={homeData.attributes.heroSection.secondEmoji}
        thirdEmoji={homeData.attributes.heroSection.thirdEmoji}
        fourthEmoji={homeData.attributes.heroSection.fourthEmoji}
        images={
          // There seem to be a bug with the `strapi.ts` helper file.
          // See https://github.com/PaulBratslavsky/strapi-next-js-no-types/issues/1#issuecomment-1812900338
          homeData.attributes.heroSection.images
            ?.data as unknown as APIResponseData<'plugin::upload.file'>[]
        }
      />

      <CenteredText
        title={homeData.attributes.aboutSection.title}
        description={homeData.attributes.aboutSection.description}
      />

      <Eligibility
        title={homeData.attributes.eligibilitySection.title}
        items={homeData.attributes.eligibilitySection.items}
        cardTitle={homeData.attributes.eligibilitySection.cardTitle}
        cardDescription={homeData.attributes.eligibilitySection.cardDescription}
        cardCta={homeData.attributes.eligibilitySection.cardCta}
        cardFirstEmoji={homeData.attributes.eligibilitySection.firstEmoji}
        cardSecondEmoji={homeData.attributes.eligibilitySection.secondEmoji}
      />

      <StyledPushCTA
        title={homeData.attributes.CTASection.title}
        description={homeData.attributes.CTASection.description}
        image={homeData.attributes.CTASection.image}
        ctaLink={homeData.attributes.CTASection.ctaLink}
        qrCodeDescription={homeData.attributes.CTASection.qrCodeDescription}
        qrCodeUrl={homeData.attributes.CTASection.qrCodeUrl}
      />

      <VerticalCarousel
        title={'Les bons plans<br/> du moment'}
        items={carouselItems}
      />

      <StyledLatestNews
        news={latestStudies}
        title={homeData.attributes.latestStudies.title}
        cta={homeData.attributes.latestStudies.cta}
      />

      <StyledSocialMedia
        title={homeData.attributes.socialMediaSection.title}
        links={homeData.attributes.socialMediaSection.socialMediaLink}
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
        $eqi: 'Étude',
      },
    },
  })
  const latestStudies = await fetchCMS<APIResponseData<'api::news.news'>[]>(
    `/news-list?${latestStudiesQuery}`
  )

  return {
    props: {
      homeData: data,
      latestStudies: latestStudies.data,
    },
  }
}) satisfies GetStaticProps<HomeProps>

const StyledPushCTA = styled(PushCTA)`
  ${({ theme }) => css`
    margin-top: 12.5rem;
    margin-bottom: 10rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      margin: 4.5rem 0;
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
