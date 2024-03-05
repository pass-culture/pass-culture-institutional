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
import { LittleList } from '@/lib/blocks/LittleList'
import { WhiteSpace } from '@/lib/blocks/WhiteSpace'

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
        Title={master.attributes.simpleText?.title}
        Text={master.attributes.simpleText?.text}
        IsNormal={master.attributes.simpleText?.isNormal}
      />
      <SimpleText
        Title={master.attributes.simpleTextTwo?.title}
        Text={master.attributes.simpleTextTwo?.text}
        IsNormal={master.attributes.simpleTextTwo?.isNormal}
        FirstSubTitle={master.attributes.simpleTextTwo?.firstSubTitle}
        SecondSubTitle={master.attributes.simpleTextTwo?.secondSubTitle}
        FirstText={master.attributes.simpleTextTwo?.firstText}
        SecondText={master.attributes.simpleTextTwo?.secondText}
      />

      <Image
        description={master.attributes.image?.description}
        image={master.attributes.image?.image}
      />

      <ImageText
        title={master.attributes.imageTextRight?.title}
        description={master.attributes.imageTextRight?.description}
        image={master.attributes.imageTextRight?.image?.data}
        icon={master.attributes.imageTextRight?.icon?.data}
        isImageRight={master.attributes.imageTextRight?.isImageRight}
      />

      <ImageText
        title={master.attributes.imageTextLeft?.title}
        description={master.attributes.imageTextLeft?.description}
        image={master.attributes.imageTextLeft?.image?.data}
        icon={master.attributes.imageTextLeft?.icon?.data}
        isImageRight={master.attributes.imageTextLeft?.isImageRight}
      />

      <LittleList
        title={master.attributes.littleList?.title}
        description={master.attributes.littleList?.description}
        content={master.attributes.littleList?.content}
        withDescription={master.attributes.littleList?.withDescritpion}
      />

      <LittleList
        title={master.attributes.littleListdescription?.title}
        description={master.attributes.littleListdescription?.description}
        content={master.attributes.littleListdescription?.content}
        withDescription={
          master.attributes.littleListdescription?.withDescritpion
        }
      />

      <WhiteSpace space={master.attributes.space?.space} />
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
      'simpleText',
      'simpleTextTwo',
      'image',
      'image.image',
      'imageTextRight',
      'imageTextRight.image',
      'imageTextRight.icon',
      'imageTextLeft',
      'imageTextLeft.image',
      'imageTextLeft.icon',
      'littleList',
      'littleList.content',
      'littleListdescription',
      'littleListdescription.content',
      'space',
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
