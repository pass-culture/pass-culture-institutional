import React from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled, { css } from 'styled-components'

import { CenteredText } from '@/lib/blocks/CenteredText'
import { LatestNews } from '@/lib/blocks/LatestNews'
import { PushCTA } from '@/lib/blocks/PushCTA'
import { SocialMedia } from '@/lib/blocks/SocialMedia'
import { APIResponseData } from '@/types/strapi'
import { fetchCMS } from '@/utils/fetchCMS'
import { SimpleText } from '@/lib/blocks/SimpleText'
import { Image } from '@/lib/blocks/Image'
import { ImageText } from '@/lib/blocks/ImageText'

interface MasterProps {
  homeData: APIResponseData<'api::home.home'>
  master: APIResponseData<'api::master.master'>
}

export default function Master({ homeData, master }: MasterProps) {
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

      <ImageText
        title={master.attributes.ImageTextRight?.Title}
        description={master.attributes.ImageTextRight?.Description}
        image={master.attributes.ImageTextRight?.Image?.data}
        icon={master.attributes.ImageTextRight?.Icon?.data}
        isImageRight={master.attributes.ImageTextRight?.isImageRight}
      />

      <ImageText
        title={master.attributes.ImageTextLeft?.Title}
        description={master.attributes.ImageTextLeft?.Description}
        image={master.attributes.ImageTextLeft?.Image?.data}
        icon={master.attributes.ImageTextLeft?.Icon?.data}
        isImageRight={master.attributes.ImageTextLeft?.isImageRight}
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

  // Master help data
  const masterQuery = stringify({
    populate: [
      'SimpleText',
      'SimpleTextTwo',
      'Image',
      'Image.Image',
      'ImageTextRight',
      'ImageTextRight.Image',
      'ImageTextRight.Icon',
      'ImageTextLeft',
      'ImageTextLeft.Image',
      'ImageTextLeft.Icon',
    ],
  })

  const master = await fetchCMS<APIResponseData<'api::master.master'>>(
    `/master?${masterQuery}`
  )

  return {
    props: {
      homeData: data,
      master: master.data,
    },
  }
}) satisfies GetStaticProps<MasterProps>

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
