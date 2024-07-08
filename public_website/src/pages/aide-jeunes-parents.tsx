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

interface HelpProps {
  helpData: APIResponseData<'api::help.help'>
}

export default function Help({ helpData }: HelpProps) {
  const { seo, heroSection, faq, cardText, simplepushcta, social } =
    helpData.attributes

  return (
    <React.Fragment>
      {seo && <Seo metaData={seo} />}
      <Header
        title={heroSection.title}
        text={heroSection?.text}
        icon={heroSection.icon}
        icon2={heroSection?.icon2}
        image={heroSection.image}
      />

      <Breadcrumb isUnderHeader />
      <ButtonScrollTo noTranslate />
      <span id="target-anchor-scroll">
        <Faq
          title={faq.title}
          cta={faq.cta}
          categories={faq.categories}
          filteringProperty={faq.filteringProperty}
          limit={faq.limit}
        />
      </span>
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
  // Fetch help data
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

  const help = await fetchCMS<APIResponseData<'api::help.help'>>(
    `/help?${helpQuery}`
  )

  return {
    props: {
      helpData: help.data,
    },
  }
}) satisfies GetStaticProps<HelpProps>
