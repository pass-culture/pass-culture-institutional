import React from 'react'
import type { GetStaticProps } from 'next'

import { CenteredText } from '@/lib/blocks/CenteredText'
import { PushCTA } from '@/lib/blocks/PushCTA'
import { fetchCMS } from '@/utils/fetchCMS'

interface HomeData {
  attributes: {
    AboutSection: {
      Title: string
      Text: string
    }
  }
}

interface HomeProps {
  data: HomeData
}

export default function Home(props: HomeProps) {
  return (
    <main>
      <CenteredText
        Title={props.data.attributes.AboutSection.Title}
        Text={props.data.attributes.AboutSection.Text}
      />

      <PushCTA />

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
  const { data } = await fetchCMS<HomeData>('/home?populate=*')
  return {
    props: {
      data,
    },
  }
}) satisfies GetStaticProps<HomeProps>
