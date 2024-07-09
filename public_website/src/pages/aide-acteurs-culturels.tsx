import React from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'

import { DoublePushCTA } from '@/lib/blocks/DoublePushCta'
import { Faq } from '@/lib/blocks/Faq'
import { Header } from '@/lib/blocks/Header'
import { SimplePushCta } from '@/lib/blocks/SimplePushCta'
import { SocialMedia } from '@/lib/blocks/SocialMedia'
import { Seo } from '@/lib/seo/seo'
import { APIResponseData } from '@/types/strapi'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'
import ButtonScrollTo from '@/ui/components/buttonScrollTo/ButtonScrollTo'
import { fetchCMS } from '@/utils/fetchCMS'

interface CulturalActorsHelpProps {
  helpData: APIResponseData<'api::help-cultural-actors.help-cultural-actors'>
}

export default function CulturalActorsHelp({
  helpData,
}: CulturalActorsHelpProps) {
  const { seo, heroSection, faq, simplepushcta, cardText, social } =
    helpData.attributes

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
      <span id="target-anchor-scroll">
        <Faq
          title={faq.title}
          categories={faq.categories}
          cta={faq.cta}
          filteringProperty={faq.filteringProperty}
          limit={faq.limit}
        />
      </span>
      <DoublePushCTA
        title={cardText.title}
        text={cardText.text}
        firstCta={cardText.firstCta}
        image={cardText.image}
        secondCta={cardText.secondCta}
      />

      <SimplePushCta
        title={simplepushcta.title}
        surtitle={simplepushcta.surtitle}
        cta={simplepushcta.cta}
        image={simplepushcta.image}
        icon={simplepushcta.icon}
      />

      <SocialMedia
        socialMediaLink={social.socialMediaLink}
        title={social.title}
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
      'seo',
      'seo.metaSocial',
      'seo.metaSocial.image',
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
