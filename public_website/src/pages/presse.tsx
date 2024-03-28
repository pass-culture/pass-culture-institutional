import React, { useEffect, useState } from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled, { css } from 'styled-components'

import { DoublePushCTA } from '@/lib/blocks/DoublePushCta'
import { Filter, FilterContainer } from '@/lib/blocks/FilterContainer'
import { ImageText } from '@/lib/blocks/ImageText'
import { ListItems } from '@/lib/blocks/ListItems'
import { Separator } from '@/lib/blocks/Separator'
import { SimplePushCta } from '@/lib/blocks/SimplePushCta'
import { SocialMedia } from '@/lib/blocks/SocialMedia'
import { APIResponseData } from '@/types/strapi'
import { Typo } from '@/ui/components/typographies'
import { fetchCMS } from '@/utils/fetchCMS'

interface ListProps {
  newsData: APIResponseData<'api::news.news'>[]
  presseListe: APIResponseData<'api::presse.presse'>
}

export default function Presse({ newsData, presseListe }: ListProps) {
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

    const filtres = presseListe.attributes?.filtres?.map((filtre) => {
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
            __html: presseListe.attributes.title,
          }}
        />
        <FilterContainer
          filtres={filters}
          onFilterChange={handleFilterChange}
        />
      </StyledTitle>
      <StyledListItems
        news={data}
        buttonText={presseListe.attributes.buttonText}
      />

      <Separator isActive={presseListe.attributes.separator?.isActive} />

      <ImageText
        title={presseListe.attributes.texteImage?.title}
        image={presseListe.attributes.texteImage?.image}
        description={presseListe.attributes.texteImage?.description}
        icon={presseListe.attributes.texteImage?.icon}
        isImageRight={presseListe.attributes.texteImage?.isImageRight}
      />

      <DoublePushCTA
        title={presseListe.attributes.pushCta?.title}
        image={presseListe.attributes.pushCta?.image}
        firstCta={presseListe.attributes.pushCta?.firstCta}
        secondCta={presseListe.attributes.pushCta?.secondCta}
        text={presseListe.attributes.pushCta?.text}
        icon={presseListe.attributes.pushCta?.icon}
      />

      <SimplePushCta
        title={presseListe.attributes.aide?.title}
        image={presseListe.attributes.aide?.image}
        cta={presseListe.attributes.aide?.cta}
        surtitle={presseListe.attributes.aide?.surtitle}
        icon={presseListe.attributes.aide?.icon}
      />

      {presseListe.attributes.socialMediaSection &&
        presseListe.attributes.socialMediaSection.title &&
        presseListe.attributes.socialMediaSection.socialMediaLink && (
          <StyledSocialMedia
            title={presseListe.attributes.socialMediaSection.title}
            socialMediaLink={
              presseListe.attributes.socialMediaSection.socialMediaLink
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
      'texteImage',
      'texteImage.image',
      'pushCta',
      'pushCta.image',
      'pushCta.firstCta',
      'pushCta.secondCta',
      'aide.image',
      'aide.cta',
    ],
  })
  const { data } = await fetchCMS<APIResponseData<'api::presse.presse'>>(
    `/presse?${query}`
  )
  return {
    props: {
      newsData: news.data,
      presseListe: data,
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
