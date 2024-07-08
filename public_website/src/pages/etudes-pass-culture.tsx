import React, { useEffect, useState } from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled, { css } from 'styled-components'

import { Filter } from '@/lib/blocks/FilterContainer'
import { ListItems } from '@/lib/blocks/ListItems'
import NoResult from '@/lib/blocks/NoResult'
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
import { separatorIsActive } from '@/utils/separatorIsActive'

interface ListProps {
  ressourcesData: APIResponseData<'api::resource.resource'>[]
  etudesPassCultureListe: APIResponseData<'api::etudes-pass-culture.etudes-pass-culture'>
}

export default function EtudesPassCulture({
  ressourcesData,
  etudesPassCultureListe,
}: ListProps) {
  const {
    seo,
    title,
    buttonText,
    observatoire,
    socialMediaSection,
    separator,
    filtres,
  } = etudesPassCultureListe.attributes

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

  const [data, setData] = useState<APIResponseData<'api::resource.resource'>[]>(
    []
  )
  const [filters, setFilters] = useState<Filter[]>([])

  useEffect(() => {
    setCategory(cat)
    setLocalisation(loc)
    setSecteur(sec)
    setPartner(part)

    setData(ressourcesData)
    const filtresOption = filterByAttribute(filtres, ressourcesData)
    if (filtresOption) setFilters(filtresOption)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, localisation, secteur, partner])

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
        pageLocalisation: {
          $containsi: 'S’informer - études',
        },
      },
    })

    const news = await fetchCMS<APIResponseData<'api::resource.resource'>[]>(
      `/resources?${newsQuery}`
    )
    setData(news.data)
  }

  const hasData = data.length

  return (
    <React.Fragment>
      {seo && <Seo metaData={seo} />}
      <StyledTitle>
        {title && <Typo.Heading2>{title}</Typo.Heading2>}
      </StyledTitle>
      <ContentWrapper $noMargin>
        <UnpaddedBreadcrumb />
      </ContentWrapper>

      <React.Fragment>
        <ContentWrapper $noMargin $marginBottom={2} $marginTop={0}>
          <FilterOption
            setCategory={setCategory}
            originalCategory={category}
            setLocalisation={setLocalisation}
            originalLocalisation={localisation}
            setPartner={setPartner}
            originalPartner={partner}
            data={filters}
          />
        </ContentWrapper>
        {hasData > 0 ? (
          <StyledListItems
            news={data}
            type="ressources"
            buttonText={buttonText}
          />
        ) : (
          <NoResult />
        )}
      </React.Fragment>

      <Separator isActive={separatorIsActive(separator)} />
      {observatoire && (
        <SimplePushCta
          surtitle={observatoire?.surtitle}
          title={observatoire.title}
          image={observatoire?.image}
          icon={observatoire?.icon}
          cta={observatoire?.cta}
        />
      )}
      {socialMediaSection &&
        socialMediaSection.title &&
        socialMediaSection.socialMediaLink && (
          <StyledSocialMedia
            socialMediaLink={socialMediaSection.socialMediaLink}
            title={socialMediaSection.title}
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
      pageLocalisation: {
        $containsi: 'S’informer - études',
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

const StyledTitle = styled(ContentWrapper)`
  ${({ theme }) => css`
    --module-spacing: 0;
    // margin-top: 3.5rem;
    // padding: 1rem 1.5rem;
    // max-width: 80rem;
    // margin-inline: auto;
    // margin-top: 4rem;

    // h2 {
    //   margin-bottom: 4rem;
    // }

    @media (width < ${theme.mediaQueries.mobile}) {
      h2 {
        text-align: center;
        font-size: ${theme.fonts.sizes['5xl']};
      }
    }
  `}
`

const StyledListItems = styled(ListItems)`
  top: 0;
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
