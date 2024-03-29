import React from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled, { css } from 'styled-components'

import { DoublePushCTA } from '@/lib/blocks/DoublePushCta'
import { Faq } from '@/lib/blocks/Faq'
import { SimplePushCta } from '@/lib/blocks/SimplePushCta'
import { SocialMedia } from '@/lib/blocks/SocialMedia'
import { APIResponseData } from '@/types/strapi'
import { Hero } from '@/ui/components/help/Hero'
import { fetchCMS } from '@/utils/fetchCMS'

interface CulturalActorsHelpProps {
  helpData: APIResponseData<'api::help.help'>
}

export default function CulturalActorsHelp({
  helpData,
}: CulturalActorsHelpProps) {
  return (
    <React.Fragment>
      <Hero
        title={helpData.attributes?.heroSection?.title}
        text={helpData.attributes.heroSection.text}
        image={
          helpData.attributes.heroSection.image
            ?.data as unknown as APIResponseData<'plugin::upload.file'>
        }
      />
      <Faq
        title={helpData.attributes.faq.title}
        cta={helpData.attributes.faq.cta}
        categories={helpData.attributes.faq.categories}
        filteringProperty={helpData.attributes.faq.filteringProperty}
        limit={helpData.attributes.faq.limit}
      />
      <StyledPushCTA
        title={helpData.attributes.cardText?.title}
        text={helpData.attributes.cardText?.text}
        image={helpData.attributes.cardText?.image}
        firstCta={helpData.attributes.cardText?.firstCta}
        secondCta={helpData.attributes.cardText?.secondCta}
      />

      {helpData.attributes?.simplepushcta &&
        helpData.attributes.simplepushcta[0] && (
          <StyledSimplePushCTA
            title={helpData.attributes.simplepushcta[0]?.title}
            surtitle={helpData.attributes.simplepushcta[0]?.surtitle}
            image={helpData.attributes.simplepushcta[0]?.image}
            cta={helpData.attributes.simplepushcta[0]?.cta}
          />
        )}

      {helpData.attributes?.social && helpData.attributes.social[0] && (
        <StyledSocialMedia
          title={helpData.attributes.social[0].title}
          socialMediaLink={helpData.attributes.social[0].socialMediaLink}
        />
      )}
    </React.Fragment>
  )
}

export const getStaticProps = (async () => {
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
      'faq',
      'faq.cta',
      'simplepushcta',
      'simplepushcta.image',
      'simplepushcta.cta',
      'simplepushcta.cta[0]',
    ],
  })

  const help = await fetchCMS<
    APIResponseData<'api::help-cultural-actors.help-cultural-actors'>
  >(`/help-cultural-actors?${helpQuery}`)

  return {
    props: {
      helpData: help.data,
    },
  }
}) satisfies GetStaticProps<CulturalActorsHelpProps>

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
