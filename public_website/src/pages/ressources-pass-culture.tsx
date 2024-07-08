import React, { useEffect, useState } from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled, { css } from 'styled-components'

import { Filter } from '@/lib/blocks/FilterContainer'
import { ListItems } from '@/lib/blocks/ListItems'
import { Separator } from '@/lib/blocks/Separator'
import { SimplePushCta } from '@/lib/blocks/SimplePushCta'
import { SocialMedia } from '@/lib/blocks/SocialMedia'
import FilterOption from '@/lib/filters/FilterOption'
import { Seo } from '@/lib/seo/seo'
import { APIResponseData } from '@/types/strapi'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { Typo } from '@/ui/components/typographies'
import { fetchCMS } from '@/utils/fetchCMS'
import { filterByAttribute } from '@/utils/filterbyAttributes'

interface ListProps {
  ressourcesData: APIResponseData<'api::resource.resource'>[]
  ressourcesPassCultureListe: APIResponseData<'api::ressources-pass-culture.ressources-pass-culture'>
}

export default function RessourcesPassCulture({
  ressourcesData,
  ressourcesPassCultureListe,
}: ListProps) {
  const {
    seo,
    title,
    buttonText,
    etudes,
    socialMediaSection,
    separator,
    filtres,
  } = ressourcesPassCultureListe.attributes
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
  const [localisation, setLocalisation] = useState<string[]>([])
  const [secteur, setSecteur] = useState<string[]>([])

  const [data, setData] = useState<APIResponseData<'api::resource.resource'>[]>(
    []
  )
  const [filters, setFilters] = useState<Filter[]>([])

  useEffect(() => {
    setCategory(cat)
    setLocalisation(loc)
    setSecteur(sec)
    setData(ressourcesData)

    const filtresOption = filterByAttribute(filtres, ressourcesData)
    if (filtresOption) setFilters(filtresOption)
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

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, localisation, secteur])

  const hasData = data.length

  return (
    <React.Fragment>
      {seo && <Seo metaData={seo} />}
      <StyledTitle>
        {title && <Typo.Heading2>{title}</Typo.Heading2>}
      </StyledTitle>
      <UnpaddedBreadcrumb />
      {hasData > 0 && (
        <React.Fragment>
          <ContentWrapper $noMargin $marginBottom={2} $marginTop={0}>
            <FilterOption
              setCategory={setCategory}
              setLocalisation={setLocalisation}
              originalCategory={category}
              originalLocalisation={localisation}
              setSecteur={setSecteur}
              originalSecteur={secteur}
              data={filters}
            />
          </ContentWrapper>

          <StyledListItems
            news={data}
            type="ressources"
            buttonText={buttonText}
          />
        </React.Fragment>
      )}

      <Separator isActive={separator?.isActive} />

      {etudes && (
        <SimplePushCta
          title={etudes.title}
          image={etudes.image}
          cta={etudes.cta}
          surtitle={etudes.surtitle}
          icon={etudes.icon}
        />
      )}

      {socialMediaSection &&
        socialMediaSection.title &&
        socialMediaSection.socialMediaLink && (
          <StyledSocialMedia
            title={socialMediaSection.title}
            socialMediaLink={socialMediaSection.socialMediaLink}
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

const StyledTitle = styled(ContentWrapper)`
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
  margin-top: -3rem;
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
