import React from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'

import { CenteredText } from '@/lib/blocks/CenteredText'
import { LatestNews } from '@/lib/blocks/LatestNews'
import { PushCTA } from '@/lib/blocks/PushCTA'
import { SocialMedia } from '@/lib/blocks/SocialMedia'
import { APIResponseData } from '@/types/strapi'
import { Eligibility } from '@/ui/components/home/Eligibility'
import { Hero } from '@/ui/components/home/Hero'
import { fetchCMS } from '@/utils/fetchCMS'

interface HomeProps {
  homeData: APIResponseData<'api::home.home'>
  latestStudies: APIResponseData<'api::news.news'>[]
}

export default function Home({ homeData, latestStudies }: HomeProps) {
  return (
    <React.Fragment>
      <Hero
        title={homeData.attributes.heroSection.title}
        subTitle={homeData.attributes.heroSection.subTitle}
        cta={homeData.attributes.heroSection.cta}
        firstEmoji={homeData.attributes.heroSection.firstEmoji}
        secondEmoji={homeData.attributes.heroSection.secondEmoji}
        thirdEmoji={homeData.attributes.heroSection.thirdEmoji}
        fourthEmoji={homeData.attributes.heroSection.fourthEmoji}
      />

      <CenteredText
        Title={homeData.attributes.AboutSection.Title}
        Text={homeData.attributes.AboutSection.Text}
      />

      <Eligibility
        title={homeData.attributes.eligibilitySection.title}
        items={homeData.attributes.eligibilitySection.items}
        cardTitle={homeData.attributes.eligibilitySection.cardTitle}
        cardDescription={homeData.attributes.eligibilitySection.cardDescription}
        cardCta={homeData.attributes.eligibilitySection.cardCta}
        cardFirstEmoji={homeData.attributes.eligibilitySection.firstEmoji}
        cardSecondEmoji={homeData.attributes.eligibilitySection.secondEmoji}
      />

      <PushCTA
        title={homeData.attributes.CTASection.Title}
        text={homeData.attributes.CTASection.Text}
        image={homeData.attributes.CTASection.Image}
        ctaLink={homeData.attributes.CTASection.ctaLink}
        qrCodeDescription={homeData.attributes.CTASection.qrCodeDescription}
        qrCodeUrl={homeData.attributes.CTASection.qrCodeUrl}
      />

      <LatestNews
        news={latestStudies}
        title={homeData.attributes.latestStudies.title}
        cta={homeData.attributes.latestStudies.cta}
      />

      <SocialMedia
        title={homeData.attributes.socialMediaSection.title}
        links={homeData.attributes.socialMediaSection.socialMediaLink}
      />
    </React.Fragment>
  )
}

export const getStaticProps = (async () => {
  // Fetch home data
  const query = stringify({
    populate: [
      'heroSection',
      'heroSection.cta',
      'heroSection.images',
      'AboutSection',
      'eligibilitySection',
      'eligibilitySection.items',
      'eligibilitySection.cardCta',
      'CTASection',
      'CTASection.Image',
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

  // Fetch 3 latest studies
  const latestStudiesQuery = stringify({
    sort: ['date:asc'],
    populate: ['image'],
    pagination: {
      limit: 3,
    },
    filters: {
      category: {
        $eq: 'Étude',
      },
    },
  })
  const latestStudies = await fetchCMS<APIResponseData<'api::news.news'>[]>(
    `/news-list?${latestStudiesQuery}`
  )

  return {
    props: {
      homeData: data,
      latestStudies: latestStudies.data,
    },
  }
}) satisfies GetStaticProps<HomeProps>
