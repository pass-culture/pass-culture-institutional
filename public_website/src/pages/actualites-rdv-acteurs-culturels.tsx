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

interface ListProps {
  newsData: APIResponseData<'api::news.news'>[]
  listeActuCulturel: APIResponseData<'api::actualites-rdv-acteurs-culturel.actualites-rdv-acteurs-culturel'>
}

export default function ListeActuCulturels({
  newsData,
  listeActuCulturel,
}: ListProps) {
  const cat = Array.from(
    new Set(newsData.map((item) => item.attributes.category))
  )

  const loc = Array.from(
    new Set(newsData.map((item) => item.attributes.localisation))
  )

  const sec = Array.from(
    new Set(newsData.map((item) => item.attributes.secteur))
  )
  const [category, setCategory] = useState<string[]>([])
  const [originalCategory, setOriginalCategory] = useState<string[]>([])
  const [localisation, setLocalisation] = useState<string[]>([])
  const [originalLocalisation, setOriginalLocalisation] = useState<string[]>([])
  const [secteur, setSecteur] = useState<string[]>([])
  const [originalSecteur, setOriginalSecteur] = useState<string[]>([])

  const [filters, setFilters] = useState<Filter[]>([])
  const [data, setData] = useState<APIResponseData<'api::news.news'>[]>([])

  useEffect(() => {
    setCategory(cat)
    setLocalisation(loc)
    setOriginalCategory(cat)
    setOriginalLocalisation(loc)
    setSecteur(sec)
    setOriginalSecteur(sec)

    setData(newsData)
    let uniqueCategories = []
    let uniqueLocalisations = []
    let uniqueSecteurs = []

    const filtres = listeActuCulturel.attributes?.filtres?.map((filtre) => {
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
        case "Secteur d'activités":
          uniqueSecteurs = Array.from(
            new Set(newsData.map((item) => item.attributes.secteur))
          )
          return {
            ...filtre,
            value: uniqueSecteurs,
          }
        default:
          return { ...filtre, value: [] }
      }
    })

    setFilters(filtres)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        secteur: {
          $eqi: secteur,
        },
      },
    })

    const news = await fetchCMS<APIResponseData<'api::news.news'>[]>(
      `/news-list?${newsQuery}`
    )

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
    } else if (name === "Secteur d'activités") {
      if (value[0] === '') {
        setSecteur(originalSecteur)
      } else {
        setSecteur(value)
      }
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, localisation, secteur])

  return (
    <React.Fragment>
      <StyledTitle>
        <Typo.Heading2
          dangerouslySetInnerHTML={{
            __html: listeActuCulturel.attributes.title,
          }}
        />
        <FilterContainer
          filtres={filters}
          onFilterChange={handleFilterChange}
        />
      </StyledTitle>
      <StyledListItems
        news={data}
        buttonText={listeActuCulturel.attributes.buttonText}
      />

      <Separator isActive={listeActuCulturel.attributes.separator?.isActive} />
      {listeActuCulturel.attributes.socialMediaSection &&
        listeActuCulturel.attributes.socialMediaSection.title &&
        listeActuCulturel.attributes.socialMediaSection.socialMediaLink && (
          <StyledSocialMedia
            title={listeActuCulturel.attributes.socialMediaSection.title}
            links={
              listeActuCulturel.attributes.socialMediaSection.socialMediaLink
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

  // Fetch list jeune data
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
    APIResponseData<'api::actualites-rdv-acteurs-culturel.actualites-rdv-acteurs-culturel'>
  >(`/actualites-rdv-acteurs-culturel?${query}`)
  return {
    props: {
      newsData: news.data,
      listeActuCulturel: data,
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
