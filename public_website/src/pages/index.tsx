import React from 'react'
import type { GetStaticProps } from 'next'

import { CenteredText } from '@/lib/blocks/CenteredText'
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
