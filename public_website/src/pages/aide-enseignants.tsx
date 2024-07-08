import React from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled, { css } from 'styled-components'

import { DoublePushCTA } from '@/lib/blocks/DoublePushCta'
import { Faq } from '@/lib/blocks/Faq'
import { Header } from '@/lib/blocks/Header'
import { LatestNews } from '@/lib/blocks/LatestNews'
import { SimplePushCta } from '@/lib/blocks/SimplePushCta'
import { SocialMedia } from '@/lib/blocks/SocialMedia'
import { Seo } from '@/lib/seo/seo'
import { APIResponseData } from '@/types/strapi'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'
import ButtonScrollTo from '@/ui/components/buttonScrollTo/ButtonScrollTo'
import { fetchCMS } from '@/utils/fetchCMS'

interface TeachersHelpProps {
  data: APIResponseData<'api::help-teachers.help-teachers'>
  latestStudies: APIResponseData<'api::news.news'>[]
}

export default function TeachersHelp({
  data,
  latestStudies,
}: TeachersHelpProps) {
  const { seo, heroSection, faq, cardText, simplepushcta, social } =
    data.attributes

  return (
    <React.Fragment>
      {seo && <Seo metaData={seo} />}
      <Header
        title={heroSection?.title}
        text={heroSection?.text}
        icon={heroSection.icon}
        image={heroSection.image}
      />
      <Breadcrumb isUnderHeader />
      <ButtonScrollTo noTranslate />
      <StyledSpacer />
      <span id="target-anchor-scroll">
        <Faq
          title={faq.title}
          cta={faq.cta}
          categories={faq.categories}
          filteringProperty={faq.filteringProperty}
          limit={faq.limit}
        />
      </span>
      <LatestNews
        news={latestStudies}
        title={data.attributes.latestStudies.title}
        cta={data.attributes.latestStudies.cta}
      />
      <DoublePushCTA
        title={cardText.title}
        text={cardText.text}
        image={cardText.image}
        firstCta={cardText.firstCta}
        secondCta={cardText.secondCta}
        icon={cardText.icon}
      />

      <SimplePushCta
        title={simplepushcta.title}
        surtitle={simplepushcta.surtitle}
        image={simplepushcta.image}
        cta={simplepushcta.cta}
        icon={simplepushcta.icon}
      />

      <SocialMedia
        title={social.title}
        socialMediaLink={social.socialMediaLink}
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
      'seo',
      'seo.metaSocial',
      'seo.metaSocial.image',
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

const StyledSpacer = styled.div`
  margin-bottom: var(--module-spacing);
  ${({ theme }) => css`
    @media (width < ${theme.mediaQueries.mobile}) {
      padding-top: 0;
      margin-bottom: 0;
    }
  `}
`
