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
import { PushCTAProps, SocialMediaProps } from '@/types/props'
import { APIResponseData } from '@/types/strapi'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { Typo } from '@/ui/components/typographies'
import { fetchCMS } from '@/utils/fetchCMS'
import { setFilter } from '@/utils/filterOptions'
interface ListProps {
  newsActuPassData: APIResponseData<'api::news.news'>[]
  listeActualitesPassCulture: APIResponseData<'api::actualites-pass-culture.actualites-pass-culture'>
}

export default function ListeActualitesPassCulture({
  newsActuPassData,
  listeActualitesPassCulture,
}: ListProps) {
  const {
    seo,
    title,
    buttonText,
    separator,
    aide,
    socialMediaSection = [],
    filtres,
  } = listeActualitesPassCulture.attributes
  const cat = Array.from(
    new Set(newsActuPassData.map((item) => item.attributes.category))
  )

  const loc = Array.from(
    new Set(newsActuPassData.map((item) => item.attributes.localisation))
  )
  const [category, setCategory] = useState<string[]>([])
  const [localisation, setLocalisation] = useState<string[]>([])
  const [originalCategory, setOriginalCategory] = useState<string[]>([])
  const [originalLocalisation, setOriginalLocalisation] = useState<string[]>([])

  const [filters, setFilters] = useState<Filter[]>([])
  const [data, setData] = useState<APIResponseData<'api::news.news'>[]>([])

  useEffect(() => {
    setCategory(cat)
    setLocalisation(loc)
    setOriginalLocalisation(loc)
    setOriginalCategory(cat)

    setData(newsActuPassData)
    let uniqueLocalisations = []
    let uniqueCategories = []

    const filtresOption = filtres?.map((filtre) => {
      switch (filtre.filtre) {
        case 'Localisation':
          uniqueLocalisations = Array.from(
            new Set(
              newsActuPassData.map((item) => item.attributes.localisation)
            )
          )
          return {
            ...filtre,
            value: uniqueLocalisations,
          }
        case 'Catégorie':
          uniqueCategories = Array.from(
            new Set(newsActuPassData.map((item) => item.attributes.category))
          )
          return {
            ...filtre,
            value: uniqueCategories,
          }
        default:
          return { ...filtre, value: [] }
      }
    })

    if (filtresOption) setFilters(filtresOption)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchData = async () => {
    const newsQuery = stringify({
      populate: ['image'],
      sort: ['date:desc'],
      pagination: {},
      filters: {
        category: {
          $eqi: category,
        },
        localisation: {
          $eqi: localisation,
        },
        pageLocalisation: {
          $containsi: 'S’informer',
        },
      },
    })

    const news = await fetchCMS<APIResponseData<'api::news.news'>[]>(
      `/news-list?${newsQuery}`
    )

    setData(news.data)
  }

  const handleFilterChange = (name: string, value: string[]) => {
    switch (name) {
      case 'Catégorie':
        setFilter(setCategory, originalCategory, value)
        break
      case 'Localisation':
        setFilter(setLocalisation, originalLocalisation, value)
        break
      default:
        break
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, localisation])

  return (
    <React.Fragment>
      {seo && <Seo metaData={seo} />}
      <StyledTitle>
        {title && <Typo.Heading2>{title}</Typo.Heading2>}
        <UnpaddedBreadcrumb />
        <FilterContainer
          filtres={filters}
          onFilterChange={handleFilterChange}
        />
      </StyledTitle>
      <StyledListItems news={data} type="actualite" buttonText={buttonText} />
      <Separator isActive={separator?.isActive} />
      <SimplePushCta {...(aide as PushCTAProps)} />
      <StyledSocialMedia {...(socialMediaSection as SocialMediaProps)} />
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
      pageLocalisation: {
        $containsi: 'S’informer',
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
      'seo',
      'seo.metaSocial',
      'seo.metaSocial.image',
    ],
  })
  const { data } = await fetchCMS<
    APIResponseData<'api::actualites-pass-culture.actualites-pass-culture'>
  >(`/actualites-pass-culture?${query}`)
  return {
    props: {
      newsActuPassData: news.data,
      listeActualitesPassCulture: data,
    },
  }
}) satisfies GetStaticProps<ListProps>

const StyledTitle = styled(ContentWrapper)`
  ${({ theme }) => css`
    --module-spacing: 0;
    margin-top: 3.5rem;

    h2 {
      margin-bottom: 3.5rem;
      font-size: ${theme.fonts.sizes['8xl']};
    }

    h3 {
      margin-bottom: 3.5rem;

      font-size: ${theme.fonts.sizes['6xl']};
      color: ${theme.colors.secondary};
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      margin-top: 2rem;

      h2 {
        text-align: center;
        font-size: ${theme.fonts.sizes['4xl']};
        margin-bottom: 2rem;
      }

      h3 {
        font-size: ${theme.fonts.sizes['3xl']};
        margin-bottom: 3rem;
      }
    }
  `}
`

const StyledListItems = styled(ListItems)`
  margin-top: -3rem;
  --module-spacing: 0;

  @media (width < ${(p) => p.theme.mediaQueries.mobile}) {
    margin-top: 1.5rem;
  }
`

const StyledSocialMedia = styled(SocialMedia)`
  ${({ theme }) => css`
    @media (width < ${theme.mediaQueries.mobile}) {
      margin: 5rem 0 6.25rem;
    }
    margin-bottom: 5rem;
    margin-top: 6rem;
  `}
`

const UnpaddedBreadcrumb = styled(Breadcrumb)`
  padding: 0;
`
