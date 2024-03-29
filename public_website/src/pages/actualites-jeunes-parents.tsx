import React, { useEffect, useState } from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled, { css } from 'styled-components'

import { Filter, FilterContainer } from '@/lib/blocks/FilterContainer'
import { ListItems } from '@/lib/blocks/ListItems'
import { Separator } from '@/lib/blocks/Separator'
import { SimplePushCta } from '@/lib/blocks/SimplePushCta'
import { SocialMedia } from '@/lib/blocks/SocialMedia'
import { APIResponseData } from '@/types/strapi'
import { Typo } from '@/ui/components/typographies'
import { fetchCMS } from '@/utils/fetchCMS'
interface ListProps {
  newsData: APIResponseData<'api::news.news'>[]
  listejeune: APIResponseData<'api::liste-jeune.liste-jeune'>
}

export default function ListeJeune({ newsData, listejeune }: ListProps) {
  const cat = Array.from(
    new Set(newsData.map((item) => item.attributes.category))
  )

  const loc = Array.from(
    new Set(newsData.map((item) => item.attributes.localisation))
  )
  const [category, setCategory] = useState<string[]>([])
  const [originalCategory, setOriginalCategory] = useState<string[]>([])
  const [localisation, setLocalisation] = useState<string[]>([])
  const [originalLocalisation, setOriginalLocalisation] = useState<string[]>([])

  const [filters, setFilters] = useState<Filter[]>([])
  const [data, setData] = useState<APIResponseData<'api::news.news'>[]>([])

  useEffect(() => {
    setCategory(cat)
    setLocalisation(loc)
    setOriginalCategory(cat)
    setOriginalLocalisation(loc)

    setData(newsData)
    let uniqueCategories = []
    let uniqueLocalisations = []

    const filtres = listejeune.attributes?.filtres?.map((filtre) => {
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
          return { ...filtre, value: [] }
      }
    })

    if (filtres) setFilters(filtres)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFilterChange = (name: string, value: string[]) => {
    switch (name) {
      case 'Catégorie':
        setCategory(value[0] === '' ? originalCategory : value)
        break
      case 'Localisation':
        setLocalisation(value[0] === '' ? originalLocalisation : value)
        break
      default:
        break
    }
  }

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

    setData(news.data)
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, localisation])

  return (
    <React.Fragment>
      <StyledTitle>
        <Typo.Heading2
          dangerouslySetInnerHTML={{ __html: listejeune.attributes.title }}
        />
        <FilterContainer
          filtres={filters}
          onFilterChange={handleFilterChange}
        />
      </StyledTitle>
      <StyledListItems
        news={data}
        buttonText={listejeune.attributes.buttonText}
      />

      <Separator isActive={listejeune.attributes.separator?.isActive} />

      <SimplePushCta
        title={listejeune.attributes.aide?.title}
        image={listejeune.attributes.aide?.image}
        cta={listejeune.attributes.aide?.cta}
        surtitle={listejeune.attributes.aide?.surtitle}
        icon={listejeune.attributes.aide?.icon}
      />

      {listejeune.attributes.socialMediaSection &&
        listejeune.attributes.socialMediaSection.title &&
        listejeune.attributes.socialMediaSection.socialMediaLink && (
          <StyledSocialMedia
            title={listejeune.attributes.socialMediaSection.title}
            socialMediaLink={
              listejeune.attributes.socialMediaSection.socialMediaLink
            }
          />
        )}
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

  const query = stringify({
    populate: [
      'title',
      'buttonText',
      'filtres',
      'socialMediaSection',
      'socialMediaSection.socialMediaLink',
      'separator',
      'aide',
      'aide.image',
      'aide.cta',
    ],
  })
  const { data } = await fetchCMS<
    APIResponseData<'api::liste-jeune.liste-jeune'>
  >(`/liste-jeune?${query}`)
  return {
    props: {
      newsData: news.data,
      listejeune: data,
    },
  }
}) satisfies GetStaticProps<ListProps>

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
