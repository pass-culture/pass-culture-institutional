import React from 'react'

import { Main } from '@/ui/components/containers/Main'
import { PageContainer } from '@/ui/components/containers/PageContainer'
import { InternalLink } from '@/ui/components/links/InternalLink'
import { CodeTag } from '@/ui/components/tags/CodeTag'
import { Typo } from '@/ui/components/typographies'
import { fetchAPI } from '@/utils/fetchAPI'
import { googleIAPAuth } from '@/utils/googleIAPAuth'

export type HomeData = {
  attributes: {
    description: string
    name: string
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
  id: number
}

type Props = {
  restaurants: HomeData[]
}

export default function About({ restaurants }: Props) {
  if (!restaurants) return <div>404</div>

  return (
    <PageContainer>
      <Main>
        <Typo.Title1>About Page</Typo.Title1>

        <Typo.Body>
          Get started by editing
          <CodeTag>pages/about.tsx</CodeTag>
        </Typo.Body>

        {restaurants.map((restaurant: HomeData) => (
          <React.Fragment key={restaurant.id}>
            <Typo.Title1>{restaurant.attributes.name}</Typo.Title1>
            <Typo.Body>{restaurant.attributes.description}</Typo.Body>
          </React.Fragment>
        ))}

        <InternalLink name="&larr; Go Back" href="/" />
      </Main>
    </PageContainer>
  )
}

export async function getStaticProps() {
  // Get google auth token
  const token = await googleIAPAuth()
  // eslint-disable-next-line no-console
  console.log(token)

  // Call an external API endpoint to get restaurants
  const response = await fetchAPI('/restaurants')

  // By returning { props: { restaurants } }, the Blog component
  // will receive `restaurants` as a prop at build time
  return {
    props: {
      restaurants: response.data,
    },
  }
}
