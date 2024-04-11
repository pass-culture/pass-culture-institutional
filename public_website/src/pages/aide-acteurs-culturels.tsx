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
import { fetchCMS } from '@/utils/fetchCMS'

interface CulturalActorsHelpProps {
  helpData: APIResponseData<'api::help-cultural-actors.help-cultural-actors'>
}

export default function CulturalActorsHelp({
  helpData,
}: CulturalActorsHelpProps) {
  return (
    <React.Fragment>
      {helpData.attributes.seo && <Seo metaData={helpData.attributes.seo} />}
      <Header
        title={helpData.attributes?.heroSection?.title}
        text={helpData.attributes?.heroSection?.text}
        icon={helpData.attributes.heroSection.icon}
        image={helpData.attributes.heroSection.image}
      />
      <Breadcrumb isUnderHeader />
      <Faq
        title={helpData.attributes.faq.title}
        categories={helpData.attributes.faq.categories}
        cta={helpData.attributes.faq.cta}
        filteringProperty={helpData.attributes.faq.filteringProperty}
        limit={helpData.attributes.faq.limit}
      />
      <DoublePushCTA
        title={helpData.attributes.cardText.title}
        text={helpData.attributes.cardText.text}
        firstCta={helpData.attributes.cardText.firstCta}
        image={helpData.attributes.cardText.image}
        secondCta={helpData.attributes.cardText.secondCta}
      />

      <SimplePushCta
        title={helpData.attributes.simplepushcta.title}
        surtitle={helpData.attributes.simplepushcta.surtitle}
        cta={helpData.attributes.simplepushcta.cta}
        image={helpData.attributes.simplepushcta.image}
        icon={helpData.attributes.simplepushcta.icon}
      />

      <SocialMedia
        socialMediaLink={helpData.attributes.social.socialMediaLink}
        title={helpData.attributes.social.title}
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
