import React, { useEffect, useState } from 'react'
import type { GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled from 'styled-components'

import { Pages } from '@/domain/pages/pages.output'
import { PATHS } from '@/domain/pages/pages.path'
import { Filter } from '@/lib/blocks/FilterContainer'
import { ListItems } from '@/lib/blocks/ListItems'
import NoResult from '@/lib/blocks/NoResult'
import { Separator } from '@/lib/blocks/Separator'
import { SimplePushCta } from '@/lib/blocks/SimplePushCta'
import FilterOption from '@/lib/filters/FilterOption'
import { Seo } from '@/lib/seo/seo'
import { StyledSocialMedia } from '@/theme/style'
import { APIResponseData } from '@/types/strapi'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import Title from '@/ui/components/title/Title'
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
    const resourcesQuery = stringify({
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

    const resources = (await Pages.getPage(
      PATHS.RESOURCES,
      resourcesQuery
    )) as APIResponseData<'api::resource.resource'>[]

    setData(resources)
  }

  const hasData = data.length > 0

  return (
    <React.Fragment>
      {!!seo && <Seo metaData={seo} />}
      {!!title && <Title title={title} />}
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
        {hasData ? (
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
  const resourcesQuery = stringify({
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

  const resources = (await Pages.getPage(
    PATHS.RESOURCES,
    resourcesQuery
  )) as APIResponseData<'api::resource.resource'>[]

  const data = (await Pages.getPage(
    PATHS.ETUDES_PASS_PAGE,
    query
  )) as APIResponseData<'api::etudes-pass-culture.etudes-pass-culture'>

  return {
    props: {
      ressourcesData: resources,
      etudesPassCultureListe: data,
    },
  }
}) satisfies GetStaticProps<ListProps>

const StyledListItems = styled(ListItems)`
  top: 0;
`
const UnpaddedBreadcrumb = styled(Breadcrumb)`
  padding: 0;
`
