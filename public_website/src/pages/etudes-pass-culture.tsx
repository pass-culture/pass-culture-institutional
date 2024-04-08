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
  etudesPassCultureListe: APIResponseData<'api::etudes-pass-culture.etudes-pass-culture'>
}

export default function EtudesPassCulture({
  ressourcesData,
  etudesPassCultureListe,
}: ListProps) {
  const [category, setCategory] = useState<string[]>([])
  const [localisation, setLocalisation] = useState<string[]>([])
  const [secteur, setSecteur] = useState<string[]>([])
  const [partner, setPartner] = useState<string[]>([])

  const cat = Array.from(
    new Set(ressourcesData.map((item) => item.attributes.category))
  )
  const sec = Array.from(
    new Set(ressourcesData.map((item) => item.attributes.secteur))
  )
  const loc = Array.from(
    new Set(ressourcesData.map((item) => item.attributes.localisation))
  )
  const part = Array.from(
    new Set(ressourcesData.map((item) => item.attributes.partnership))
  )

  const [originalEtudesCategory, setOriginalEtudesCategory] = useState<
    string[]
  >([])
  const [originalEtudesLocalisation, setOriginalEtudesLocalisation] = useState<
    string[]
  >([])
  const [originalEtudesSecteur, setOriginalEtudesSecteur] = useState<string[]>(
    []
  )
  const [originalEtudesPartner, setOriginalEtudesPartner] = useState<string[]>(
    []
  )

  const [data, setData] = useState<APIResponseData<'api::resource.resource'>[]>(
    []
  )
  const [filters, setFilters] = useState<Filter[]>([])

  useEffect(() => {
    setOriginalEtudesCategory(cat)
    setOriginalEtudesLocalisation(loc)
    setOriginalEtudesSecteur(sec)
    setOriginalEtudesPartner(part)
    setCategory(cat)
    setLocalisation(loc)
    setSecteur(sec)
    setPartner(part)

    setData(ressourcesData)
    let uniqueCategories = []
    let uniqueSecteurs = []
    let uniqueLocalisations = []
    let uniquePartners = []

    const filtres = etudesPassCultureListe.attributes?.filtres?.map(
      (filtre) => {
        switch (filtre.filtre) {
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
          case 'Catégorie':
            uniqueCategories = Array.from(
              new Set(ressourcesData.map((item) => item.attributes.category))
            )
            return {
              ...filtre,
              value: uniqueCategories,
            }
          case "Secteur d'activités":
            uniqueSecteurs = Array.from(
              new Set(ressourcesData.map((item) => item.attributes.secteur))
            )
            return {
              ...filtre,
              value: uniqueSecteurs,
            }
          case 'Partenariat':
            uniquePartners = Array.from(
              new Set(ressourcesData.map((item) => item.attributes.partnership))
            )
            return {
              ...filtre,
              value: uniquePartners,
            }
          default:
            return { ...filtre, value: [] }
        }
      }
    )
    if (filtres) setFilters(filtres)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, localisation, secteur, partner])

  const handleFilterChange = (name: string, value: string[]) => {
    switch (name) {
      case "Secteur d'activités":
        setSecteur(value[0] === '' ? originalEtudesSecteur : value)
        break
      case 'Localisation':
        setLocalisation(value[0] === '' ? originalEtudesLocalisation : value)
        break
      case 'Catégorie':
        setCategory(value[0] === '' ? originalEtudesCategory : value)
        break
      case 'Partenariat':
        setPartner(value[0] === '' ? originalEtudesPartner : value)
        break
      default:
        break
    }
  }
  const fetchData = async () => {
    const newsQuery = stringify({
      populate: ['image'],
      pagination: {},
      sort: ['date:desc'],
      filters: {
        category: {
          $eqi: category,
        },

        secteur: {
          $eqi: secteur,
        },
        localisation: {
          $eqi: localisation,
        },
        partnership: {
          $eqi: partner,
        },
        pageDaffichage: {
          $eqi: 'Etudes',
        },
      },
    })

    const news = await fetchCMS<APIResponseData<'api::resource.resource'>[]>(
      `/resources?${newsQuery}`
    )

    setData(news.data)
  }

  return (
    <React.Fragment>
      {etudesPassCultureListe.attributes.seo && (
        <Seo metaData={etudesPassCultureListe.attributes.seo} />
      )}
      <StyledTitle>
        {etudesPassCultureListe.attributes.title && (
          <Typo.Heading2
            dangerouslySetInnerHTML={{
              __html: etudesPassCultureListe.attributes.title,
            }}
          />
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
      pageDaffichage: {
        $eqi: 'Etudes',
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
      'seo',
      'seo.metaSocial',
      'seo.metaSocial.image',
    ],
  })
  const news = await fetchCMS<APIResponseData<'api::resource.resource'>[]>(
    `/resources?${newsQuery}`
  )

  const { data } = await fetchCMS<
    APIResponseData<'api::etudes-pass-culture.etudes-pass-culture'>
  >(`/etudes-pass-culture?${query}`)

  return {
    props: {
      ressourcesData: news.data,
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
  margin-top: 6rem;
  margin-bottom: 6rem;
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
