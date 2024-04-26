import React, { useEffect, useState } from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled, { css } from 'styled-components'

import { Filter, FilterContainer } from '@/lib/blocks/FilterContainer'
import { ListItems } from '@/lib/blocks/ListItems'
import { Separator } from '@/lib/blocks/Separator'
import { SimplePushCta } from '@/lib/blocks/SimplePushCta'
import { SocialMedia } from '@/lib/blocks/SocialMedia'
import { Seo } from '@/lib/seo/seo'
import { APIResponseData } from '@/types/strapi'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'
import { Typo } from '@/ui/components/typographies'
import { fetchCMS } from '@/utils/fetchCMS'

interface ListProps {
  ressourcesData: APIResponseData<'api::resource.resource'>[]
  ressourcesPassCultureListe: APIResponseData<'api::ressources-pass-culture.ressources-pass-culture'>
}

export default function RessourcesPassCulture({
  ressourcesData,
  ressourcesPassCultureListe,
}: ListProps) {
  const cat = Array.from(
    new Set(ressourcesData.map((item) => item.attributes.category))
  )

  const loc = Array.from(
    new Set(ressourcesData.map((item) => item.attributes.localisation))
  )

  const sec = Array.from(
    new Set(ressourcesData.map((item) => item.attributes.secteur))
  )
  const [category, setCategory] = useState<string[]>([])
  const [originalCategory, setOriginalCategory] = useState<string[]>([])
  const [localisation, setLocalisation] = useState<string[]>([])
  const [originalLocalisation, setOriginalLocalisation] = useState<string[]>([])
  const [secteur, setSecteur] = useState<string[]>([])
  const [originalSecteur, setOriginalSecteur] = useState<string[]>([])

  const [data, setData] = useState<APIResponseData<'api::resource.resource'>[]>(
    []
  )
  const [filters, setFilters] = useState<Filter[]>([])

  useEffect(() => {
    setCategory(cat)
    setLocalisation(loc)
    setOriginalCategory(cat)
    setOriginalLocalisation(loc)
    setSecteur(sec)
    setOriginalSecteur(sec)

    setData(ressourcesData)
    let uniqueCategories = []
    let uniqueLocalisations = []
    let uniqueSecteurs = []

    const filtres = ressourcesPassCultureListe.attributes?.filtres?.map(
      (filtre) => {
        switch (filtre.filtre) {
          case 'Catégorie':
            uniqueCategories = Array.from(
              new Set(ressourcesData.map((item) => item.attributes.category))
            )
            return {
              ...filtre,
              value: uniqueCategories,
            }
          case 'Localisation':
            uniqueLocalisations = Array.from(
              new Set(
                ressourcesData.map((item) => item.attributes.localisation)
              )
            )
            return {
              ...filtre,
              value: uniqueLocalisations,
            }
          case "Secteur d'activités":
            uniqueSecteurs = Array.from(
              new Set(ressourcesData.map((item) => item.attributes.secteur))
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
        pageLocalisation: {
          $containsi: 'S’informer - ressources',
        },
      },
    })

    const news = await fetchCMS<APIResponseData<'api::resource.resource'>[]>(
      `/resources?${newsQuery}`
    )

    setData(news.data)
  }

  const handleFilterChange = (name: string, value: string[]) => {
    switch (name) {
      case 'Catégorie':
        setCategory(value[0] === '' ? originalCategory : value)
        break
      case 'Localisation':
        setLocalisation(value[0] === '' ? originalLocalisation : value)
        break
      case "Secteur d'activités":
        setSecteur(value[0] === '' ? originalSecteur : value)
        break
      default:
        break
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, localisation, secteur])

  return (
    <React.Fragment>
      {ressourcesPassCultureListe.attributes.seo && (
        <Seo metaData={ressourcesPassCultureListe.attributes.seo} />
      )}
      <StyledTitle>
        {ressourcesPassCultureListe.attributes.title && (
          <Typo.Heading2>
            {ressourcesPassCultureListe.attributes.title}
          </Typo.Heading2>
        )}
        <UnpaddedBreadcrumb />
        <FilterContainer
          filtres={filters}
          onFilterChange={handleFilterChange}
        />
      </StyledTitle>
      <StyledListItems
        news={data}
        type="ressources"
        buttonText={ressourcesPassCultureListe.attributes.buttonText}
      />

      <Separator
        isActive={ressourcesPassCultureListe.attributes.separator?.isActive}
      />

      <SimplePushCta
        title={ressourcesPassCultureListe.attributes.etudes?.title}
        image={ressourcesPassCultureListe.attributes.etudes?.image}
        cta={ressourcesPassCultureListe.attributes.etudes?.cta}
        surtitle={ressourcesPassCultureListe.attributes.etudes?.surtitle}
        icon={ressourcesPassCultureListe.attributes.etudes?.icon}
      />

      {ressourcesPassCultureListe.attributes.socialMediaSection &&
        ressourcesPassCultureListe.attributes.socialMediaSection.title &&
        ressourcesPassCultureListe.attributes.socialMediaSection
          .socialMediaLink && (
          <StyledSocialMedia
            title={
              ressourcesPassCultureListe.attributes.socialMediaSection.title
            }
            socialMediaLink={
              ressourcesPassCultureListe.attributes.socialMediaSection
                .socialMediaLink
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
        $eqi: [
          'Dossier de presse',
          'Communiqué de presse',
          'Étude ritualisée',
          'Étude ponctuelle',
        ],
      },
      pageLocalisation: {
        $containsi: 'S’informer - ressources',
      },
    },
  })

  const news = await fetchCMS<APIResponseData<'api::resource.resource'>[]>(
    `/resources?${newsQuery}`
  )

  const query = stringify({
    populate: [
      'title',
      'buttonText',
      'filtres',
      'socialMediaSection',
      'socialMediaSection.socialMediaLink',
      'separator',
      'etudes',
      'etudes.image',
      'etudes.cta',
      'seo',
      'seo.metaSocial',
      'seo.metaSocial.image',
    ],
  })
  const { data } = await fetchCMS<
    APIResponseData<'api::ressources-pass-culture.ressources-pass-culture'>
  >(`/ressources-pass-culture?${query}`)
  return {
    props: {
      ressourcesData: news.data,
      ressourcesPassCultureListe: data,
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
        font-size: ${theme.fonts.sizes['5xl']};
      }
    }
  `}
`

const StyledListItems = styled(ListItems)`
  margin-top: 3rem;
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
const UnpaddedBreadcrumb = styled(Breadcrumb)`
  padding: 0;
`
