import React from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'

import { CenteredText } from '@/lib/blocks/CenteredText'
import { PushCTA } from '@/lib/blocks/PushCTA'
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
        Title={props.data.attributes.CTASection.Title}
        Text={props.data.attributes.CTASection.Text}
      />

      <p>
        Amet consectetur pariatur incididunt veniam. Aliquip irure culpa
        consectetur ut quis ullamco sit do anim velit dolor veniam ut
        consectetur. Esse id et adipisicing eiusmod quis ex et in ex veniam
        deserunt excepteur ipsum id. Ad do ipsum labore aute enim pariatur ex.
        Culpa fugiat deserunt pariatur eiusmod. Nostrud sunt magna esse culpa.
      </p>
    </main>
  )
}

export const getStaticProps = (async () => {
  const query = stringify({
    populate: ['AboutSection', 'CTASection.Image'],
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
