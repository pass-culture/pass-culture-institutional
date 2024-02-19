import React from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'

import { CenteredText } from '@/lib/blocks/CenteredText'
import { PushCTA } from '@/lib/blocks/PushCTA'
import { SocialMedia } from '@/lib/blocks/SocialMedia'
import { APIResponseData } from '@/types/strapi'
import { fetchCMS } from '@/utils/fetchCMS'

interface HomeProps {
  data: APIResponseData<'api::home.home'>
}

export default function Home(props: HomeProps) {
  return (
    <main>
      <CenteredText
        Title={props.data.attributes.AboutSection.Title}
        Text={props.data.attributes.AboutSection.Text}
      />

      <PushCTA
        title={props.data.attributes.CTASection.Title}
        text={props.data.attributes.CTASection.Text}
        image={props.data.attributes.CTASection.Image}
        ctaLink={props.data.attributes.CTASection.ctaLink}
        qrCodeDescription={props.data.attributes.CTASection.qrCodeDescription}
        qrCodeUrl={props.data.attributes.CTASection.qrCodeUrl}
      />

      <SocialMedia
        title={props.data.attributes.SocialMediaSection.title}
        links={props.data.attributes.SocialMediaSection.socialMediaLink}
      />
    </main>
  )
}

export const getStaticProps = (async () => {
  const query = stringify({
    populate: [
      'AboutSection',
      'CTASection',
      'CTASection.Image',
      'CTASection.ctaLink',
      'SocialMediaSection',
      'SocialMediaSection.socialMediaLink',
    ],
  })
  const { data } = await fetchCMS<APIResponseData<'api::home.home'>>(
    `/home?${query}`
  )

  return {
    props: {
      data,
    },
  }
}) satisfies GetStaticProps<HomeProps>
