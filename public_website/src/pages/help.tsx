import React from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled, { css } from 'styled-components'

import { DoublePushCTA } from '@/lib/blocks/DoublePushCta'
import { SimplePushCta } from '@/lib/blocks/SimplePushCta'
import { SocialMedia } from '@/lib/blocks/SocialMedia'
import { APIResponseData } from '@/types/strapi'
import { Faq } from '@/ui/components/help/Faq'
import { Hero } from '@/ui/components/help/Hero'
import { fetchCMS } from '@/utils/fetchCMS'
interface HelpProps {
  helpData: APIResponseData<'api::help.help'>
}

export default function Help({ helpData }: HelpProps) {
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
      {/* <StyledPushCTA
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
      /> */}
    </React.Fragment>
  )
}

export const getStaticProps = (async () => {
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

  return {
    props: {
      helpData: help.data,
    },
  }
}) satisfies GetStaticProps<HelpProps>

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
