import React from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'

import { Pages } from '@/domain/pages/pages.output'
import { PATHS } from '@/domain/pages/pages.path'
import { DoublePushCTA } from '@/lib/blocks/DoublePushCta'
import { Faq } from '@/lib/blocks/Faq'
import { Header } from '@/lib/blocks/Header'
import { SimplePushCta } from '@/lib/blocks/SimplePushCta'
import { SocialMedia } from '@/lib/blocks/SocialMedia'
import { Seo } from '@/lib/seo/seo'
import { APIResponseData } from '@/types/strapi'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'

interface HelpProps {
  helpData: APIResponseData<'api::help.help'>
}

export default function Help({ helpData }: HelpProps) {
  const { seo, heroSection, faq, cardText, simplepushcta, social } =
    helpData.attributes

  return (
    <React.Fragment>
      {!!seo && <Seo metaData={seo} />}
      <Header
        title={heroSection.title}
        text={heroSection?.text}
        icon={heroSection.icon}
        icon2={heroSection?.icon2}
        image={heroSection.image}
      />

      <Breadcrumb isUnderHeader />
      <Faq
        title={faq.title}
        cta={faq.cta}
        categories={faq.categories}
        filteringProperty={faq.filteringProperty}
        limit={faq.limit}
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
      'seo',
      'seo.metaSocial',
      'seo.metaSocial.image',
    ],
  })

  const help = (await Pages.getPage(
    PATHS.HELP,
    helpQuery
  )) as APIResponseData<'api::help.help'>

  return {
    props: {
      helpData: help,
    },
  }
}) satisfies GetStaticProps<HelpProps>
