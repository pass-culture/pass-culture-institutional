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
  const [data, setData] = useState<HomeData[]>([])
  const [isLoading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const responseData = await fetchAPI<HomeData[]>('/restaurants')
      setData(responseData.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
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

        {data.map((value: HomeData, index) => (
          <React.Fragment key={index}>
            <Typo.Title1>{value.attributes.name}</Typo.Title1>
            <Typo.Body>{value.attributes.description}</Typo.Body>
          </React.Fragment>
        ))}

        <InternalLink name="&larr; Go Back" href="/" />
      </Main>
    </PageContainer>
  )
}
