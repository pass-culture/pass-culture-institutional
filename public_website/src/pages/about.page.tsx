import React, { useCallback, useEffect, useState } from 'react'

import { Main } from '@/ui/components/containers/Main'
import { PageContainer } from '@/ui/components/containers/PageContainer'
import { InternalLink } from '@/ui/components/links/InternalLink'
import { CodeTag } from '@/ui/components/tags/CodeTag'
import { Typo } from '@/ui/components/typographies'
import { fetchAPI } from '@/utils/fetchAPI'

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

export default function About() {
  const [restaurants, setRestaurants] = useState<HomeData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      const responseData = await fetchAPI<HomeData[]>('/restaurants')
      setRestaurants(responseData.data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (isLoading) return <Typo.Body>Chargement...</Typo.Body>

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
