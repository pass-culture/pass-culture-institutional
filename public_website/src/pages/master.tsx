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
import { fetchCMS } from '@/utils/fetchCMS'
import { SimpleText } from '@/lib/blocks/SimpleText'
import { Image } from '@/lib/blocks/Image'

interface HomeProps {
  homeData: APIResponseData<'api::home.home'>
  latestStudies: APIResponseData<'api::news.news'>[]
  master: APIResponseData<'api::master.master'>
}

export default function Master({ homeData, latestStudies, master }: HomeProps) {
  console.log(master.attributes)
  return (
    <>
      <CenteredText
        title={homeData.attributes.aboutSection.title}
        description={homeData.attributes.aboutSection.description}
      />

      <SimpleText
        Title={master.attributes.SimpleText.Title}
        Text={master.attributes.SimpleText.Text}
        IsNormal={master.attributes.SimpleText.IsNormal}
      />
      <SimpleText
        Title={master.attributes.SimpleTextTwo?.Title}
        Text={master.attributes.SimpleTextTwo?.Text}
        IsNormal={master.attributes.SimpleTextTwo?.IsNormal}
        FirstSubTitle={master.attributes.SimpleTextTwo?.FirstSubTitle}
        SecondSubTitle={master.attributes.SimpleTextTwo?.SecondSubTitle}
        FirstText={master.attributes.SimpleTextTwo?.FirstText}
        SecondText={master.attributes.SimpleTextTwo?.SecondText}
      />

      <Image
        description={master.attributes.Image?.Description}
        image={master.attributes.Image?.Image}
      />
    </>
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

  // Master help data
  const masterQuery = stringify({
    populate: ['SimpleText', 'SimpleTextTwo', 'Image', 'Image.Image'],
  })

  const master = await fetchCMS<APIResponseData<'api::master.master'>>(
    `/master?${masterQuery}`
  )

  return {
    props: {
      homeData: data,
      latestStudies: latestStudies.data,
      master: master.data,
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
