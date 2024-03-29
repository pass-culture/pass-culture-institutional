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
  etudesPassCultureListe: APIResponseData<'api::etudes-pass-culture.etudes-pass-culture'>
}

export default function EtudesPassCulture({
  newsData,
  etudesPassCultureListe,
}: ListProps) {
  const cat = Array.from(
    new Set(newsData.map((item) => item.attributes.category))
  )

  const sec = Array.from(
    new Set(newsData.map((item) => item.attributes.secteur))
  )
  const loc = Array.from(
    new Set(newsData.map((item) => item.attributes.localisation))
  )

  const [category, setCategory] = useState<string[]>([])
  const [localisation, setLocalisation] = useState<string[]>([])
  const [secteur, setSecteur] = useState<string[]>([])
  const [originalCategory, setOriginalCategory] = useState<string[]>([])
  const [originalLocalisation, setOriginalLocalisation] = useState<string[]>([])
  const [originalSecteur, setOriginalSecteur] = useState<string[]>([])

  const [filters, setFilters] = useState<Filter[]>([])
  const [data, setData] = useState<APIResponseData<'api::news.news'>[]>([])

  useEffect(() => {
    setOriginalCategory(cat)
    setOriginalLocalisation(loc)
    setOriginalSecteur(sec)
    setCategory(cat)
    setLocalisation(loc)
    setSecteur(sec)

    setData(newsData)
    let uniqueCategories = []
    let uniqueSecteurs = []
    let uniqueLocalisations = []

    const filtres = etudesPassCultureListe.attributes?.filtres?.map(
      (filtre) => {
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
      }
    )
    if (filtres) setFilters(filtres)
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

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, localisation, secteur])

  const handleFilterChange = (name: string, value: string[]) => {
    switch (name) {
      case 'Localisation':
        setLocalisation(value[0] === '' ? originalLocalisation : value)
        break
      case 'Catégorie':
        setCategory(value[0] === '' ? originalCategory : value)
        break
      case "Secteur d'activités":
        setSecteur(value[0] === '' ? originalSecteur : value)
        break
      default:
        break
    }
  }

  return (
    <React.Fragment>
      <StyledTitle>
        {etudesPassCultureListe.attributes.title && (
          <Typo.Heading2
            dangerouslySetInnerHTML={{
              __html: etudesPassCultureListe.attributes.title,
            }}
          />
        )}
        <FilterContainer
          filtres={filters}
          onFilterChange={handleFilterChange}
        />
      </StyledTitle>
      <StyledListItems
        news={data}
        buttonText={etudesPassCultureListe.attributes.buttonText}
      />

      <Separator
        isActive={etudesPassCultureListe.attributes.separator?.isActive}
      />

      <SimplePushCta
        surtitle={etudesPassCultureListe.attributes.observatoire?.surtitle}
        title={etudesPassCultureListe.attributes.observatoire?.title}
        image={etudesPassCultureListe.attributes.observatoire?.image}
        icon={etudesPassCultureListe.attributes.observatoire?.icon}
        cta={etudesPassCultureListe.attributes.observatoire?.cta}
      />

      {etudesPassCultureListe.attributes.socialMediaSection &&
        etudesPassCultureListe.attributes.socialMediaSection.title &&
        etudesPassCultureListe.attributes.socialMediaSection
          .socialMediaLink && (
          <StyledSocialMedia
            socialMediaLink={
              etudesPassCultureListe.attributes.socialMediaSection
                .socialMediaLink
            }
            title={etudesPassCultureListe.attributes.socialMediaSection.title}
          />
        )}
    </React.Fragment>
  )
}

export const getStaticProps = (async () => {
  const newsQuery = stringify({
    sort: ['date:desc'],
    populate: ['image'],
    filters: {
      category: {
        $eqi: [
          'Dossier de presse',
          'Communiqué de presse',
          'Étude ritualisée',
          'Étude ponctuelle',
        ],
      },
    },
    pagination: {},
  })

  const query = stringify({
    populate: [
      'title',
      'filtres',
      'buttonText',
      'socialMediaSection.socialMediaLink',
      'separator',
      'socialMediaSection',
      'observatoire',
      'observatoire.image',
      'observatoire.cta',
    ],
  })
  const news = await fetchCMS<APIResponseData<'api::news.news'>[]>(
    `/news-list?${newsQuery}`
  )

  const { data } = await fetchCMS<
    APIResponseData<'api::etudes-pass-culture.etudes-pass-culture'>
  >(`/etudes-pass-culture?${query}`)

  return {
    props: {
      newsData: news.data,
      etudesPassCultureListe: data,
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
