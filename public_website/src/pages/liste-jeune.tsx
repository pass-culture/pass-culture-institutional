import React, { useEffect, useState } from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled, { css } from 'styled-components'

import { Filter, FilterContainer } from '@/lib/blocks/FilterContainer'
import { ListItems } from '@/lib/blocks/ListItems'
import { Separator } from '@/lib/blocks/Separator'
import { SocialMedia } from '@/lib/blocks/SocialMedia'
import { APIResponseData } from '@/types/strapi'
import { Typo } from '@/ui/components/typographies'
import { fetchCMS } from '@/utils/fetchCMS'
interface HomeProps {
  listJeune: APIResponseData<'api::list-jeune.list-jeune'>[]

  newsData: APIResponseData<'api::news.news'>[]
}

export default function ListeJeune({ newsData, listJeune }: HomeProps) {
  const [category, setCategory] = useState<string[]>([
    Array.from(new Set(newsData.map((item) => item.attributes.category))),
  ])
  const [originalCategory, setOriginalCategory] = useState<string[]>([
    Array.from(new Set(newsData.map((item) => item.attributes.category))),
  ])
  const [localisation, setLocalisation] = useState<string[]>([
    Array.from(new Set(newsData.map((item) => item.attributes.localisation))),
  ])
  const [originalLocalisation, setOriginalLocalisation] = useState<string[]>([
    Array.from(new Set(newsData.map((item) => item.attributes.localisation))),
  ])

  const [filters, setFilters] = useState<Filter[]>([])
  const [data, setData] = useState<APIResponseData<'api::news.news'>[]>([])

  useEffect(() => {
    setOriginalCategory(category)
    setOriginalLocalisation(localisation)

    setData(newsData)
    let uniqueCategories = []
    let uniqueLocalisations = []
    const filtres = listJeune.attributes.filtres.map((filtre) => {
      switch (filtre.filtre) {
        case 'Catégorie':
          uniqueCategories = Array.from(
            new Set(newsData.map((item) => item.attributes.category))
          )
          return {
            ...filtre,
            value: uniqueCategories,
          }
        case 'Localisation':
          uniqueLocalisations = Array.from(
            new Set(newsData.map((item) => item.attributes.localisation))
          )
          return {
            ...filtre,
            value: uniqueLocalisations,
          }
        default:
          return filtre
      }
    })
    setFilters(filtres)
  }, [])

  const fetchData = async () => {
    const newsQuery = stringify({
      sort: ['date:desc'],
      populate: ['image'],
      pagination: {},
      filters: {
        category: {
          $eqi: category,
        },
        localisation: {
          $eqi: localisation,
        },
      },
    })

    const news = await fetchCMS<APIResponseData<'api::news.news'>[]>(
      `/news-list?${newsQuery}`
    )
    // setFilters([...listJeune.attributes.filtres])
    // setNewsData(news.data)

    setData(news.data)
  }

  const handleFilterChange = (name: string, value: string[]) => {
    if (name === 'Catégorie') {
      if (value[0] === '') {
        setCategory(originalCategory)
      } else {
        setCategory(value)
      }
    } else if (name === 'Localisation') {
      if (value[0] === '') {
        setLocalisation(originalLocalisation)
      } else {
        setLocalisation(value)
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [category, localisation])

  return (
    <React.Fragment>
      <StyledTitle>
        <Typo.Heading2
          dangerouslySetInnerHTML={{ __html: listJeune.attributes.title }}
        />
        <FilterContainer
          filtres={filters}
          onFilterChange={handleFilterChange}
        />
      </StyledTitle>
      <StyledListItems
        news={data}
        buttonText={listJeune.attributes.buttonText}
      />

      <Separator isActive={listJeune.attributes.separator.isActive} />
      <StyledSocialMedia
        title={listJeune.attributes.socialMediaSection.title}
        links={listJeune.attributes.socialMediaSection.socialMediaLink}
      />
    </React.Fragment>
  )
}

export const getStaticProps = (async () => {
  const newsQuery = stringify({
    sort: ['date:desc'],
    populate: ['image'],
    pagination: {},
    filters: {
      category: {
        $eqi: ['Article', 'Évènement', 'Partenariat', 'Rencontre'],
      },
    },
  })

  const news = await fetchCMS<APIResponseData<'api::news.news'>[]>(
    `/news-list?${newsQuery}`
  )

  // Fetch home data
  const query = stringify({
    populate: [
      'title',
      'buttonText',
      'filtres',
      'socialMediaSection',
      'socialMediaSection.socialMediaLink',
      'separator',
    ],
  })
  const { data } = await fetchCMS<
    APIResponseData<'api::list-jeune.list-jeune'>
  >(`/list-jeune?${query}`)
  return {
    props: {
      newsData: news.data,
      listJeune: data,
    },
  }
}) satisfies GetStaticProps<HomeProps>

const StyledTitle = styled.div`
  ${({ theme }) => css`
    padding: 1rem 1.5rem;
    max-width: 80rem;
    margin-inline: auto;
    margin-top: 4rem;

    h2 {
      margin-bottom: 4rem;
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      h2 {
        text-align: center;
      }
    }
  `}
`

const StyledListItems = styled(ListItems)`
  ${({ theme }) => css`
    margin-top: 6rem;
    margin-bottom: 6rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      // margin: 3.5rem 0 5rem;
    }
  `}
`
const StyledSocialMedia = styled(SocialMedia)`
  ${({ theme }) => css`
    margin-top: 6rem;
    margin-bottom: 5rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      margin: 5rem 0 6.25rem;
    }
  `}
`
