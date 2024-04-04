import React from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled, { css } from 'styled-components'

import { DoublePushCTA } from '@/lib/blocks/DoublePushCta'
import { Faq } from '@/lib/blocks/Faq'
import { LatestNews } from '@/lib/blocks/LatestNews'
import { SimplePushCta } from '@/lib/blocks/SimplePushCta'
import { SocialMedia } from '@/lib/blocks/SocialMedia'
import { APIResponse, APIResponseData } from '@/types/strapi'
import { fetchCMS } from '@/utils/fetchCMS'
import { Header } from '@/lib/blocks/Header'

interface TeachersHelpProps {
  data: APIResponseData<'api::help-teachers.help-teachers'>
  latestStudies: APIResponseData<'api::news.news'>[]
}

export default function TeachersHelp({
  data,
  latestStudies,
}: TeachersHelpProps) {
  return (
    <React.Fragment>
      <Header
        title={data.attributes?.heroSection?.title}
        text={data.attributes?.heroSection?.text}
        icon={data.attributes.heroSection.icon}
        image={data.attributes.heroSection.image}
      />
      <Faq
        title={data.attributes.faq.title}
        cta={data.attributes.faq.cta}
        categories={data.attributes.faq.categories}
        filteringProperty={data.attributes.faq.filteringProperty}
        limit={data.attributes.faq.limit}
      />
      <StyledLatestNews
        news={latestStudies}
        title={data.attributes.latestStudies.title}
        cta={data.attributes.latestStudies.cta}
      />
      <StyledPushCTA
        title={data.attributes.cardText?.title}
        text={data.attributes.cardText?.text}
        image={data.attributes.cardText?.image}
        firstCta={data.attributes.cardText?.firstCta}
        secondCta={data.attributes.cardText?.secondCta}
      />

      <StyledSimplePushCTA
        title={data.attributes.simplepushcta.title}
        surtitle={data.attributes.simplepushcta.surtitle}
        image={data.attributes.simplepushcta.image}
        cta={data.attributes.simplepushcta.cta}
        icon={data.attributes.simplepushcta.icon}
      />

      <StyledSocialMedia
        title={data.attributes.social.title}
        socialMediaLink={data.attributes.social.socialMediaLink}
      />
    </React.Fragment>
  )
}

export const getStaticProps = (async () => {
  const helpQuery = stringify({
    populate: [
      'heroSection',
      'heroSection.image',
      'cardText',
      'cardText.image',
      'cardText.firstCta',
      'cardText.secondCta',
      'social',
      'social.socialMediaLink',
      'social.title',
      'faq',
      'faq.cta',
      'simplepushcta',
      'simplepushcta.image',
      'simplepushcta.cta',
      'simplepushcta.cta[0]',
      'latestStudies',
      'latestStudies.cta',
    ],
  })

  const help = await fetchCMS<
    APIResponseData<'api::help-teachers.help-teachers'>
  >(`/help-teachers?${helpQuery}`)

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
      data: help.data,
      latestStudies: latestStudies.data,
    },
  }
}) satisfies GetStaticProps<TeachersHelpProps>

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

const StyledSocialMedia = styled(SocialMedia)`
  ${({ theme }) => css`
    margin-top: 6rem;
    margin-bottom: 5rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      margin: 5rem 0 6.25rem;
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

const StyledLatestNews = styled(LatestNews)`
  ${({ theme }) => css`
    margin-top: 6rem;
    margin-bottom: 6rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      margin: 3.5rem 0 5rem;
    }
  `}
`
