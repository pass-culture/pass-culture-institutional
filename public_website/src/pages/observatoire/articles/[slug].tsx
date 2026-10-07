import React, { useMemo } from 'react'
import type { GetStaticPaths, GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled, { css } from 'styled-components'

import { Pages } from '@/domain/pages/pages.output'
import { PATHS } from '@/domain/pages/pages.path'
import { BlockRenderer } from '@/lib/BlockRenderer'
import { Header } from '@/lib/blocks/Header'
import { LatestNews } from '@/lib/blocks/LatestNews'
import { Seo } from '@/lib/seo/seo'
import type { CTA } from '@/types/CTA'
import type { APIResponseData } from '@/types/strapi'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'
import { fetchLayoutData } from '@/utils/fetchCMS'

type ObservatoryArticle = APIResponseData<'api::observatory.observatory'>

interface ObservatoryArticlePageProps {
  data: ObservatoryArticle
  relatedArticles: ObservatoryArticle[]
}

export default function ObservatoryArticlePage(
  props: ObservatoryArticlePageProps
) {
  const { data, relatedArticles } = props
  const { seo, image, title, blocks, category, theme } = data.attributes

  const themePageUrl = theme?.data?.attributes?.pageUrl
  const backToThemeCta: CTA | undefined = themePageUrl
    ? { Label: 'Retour à la thématique', URL: themePageUrl }
    : undefined
  const allThemeArticlesCta: CTA | undefined = themePageUrl
    ? { Label: 'Voir tous les contenus', URL: themePageUrl }
    : undefined

  const memoBlocks = useMemo(
    () =>
      blocks?.map((block) => (
        <BlockRenderer key={`${block.__component}_${block.id}`} block={block} />
      )),
    [blocks]
  )

  return (
    <React.Fragment>
      <Seo metaData={seo} />
      <Header
        image={image}
        icon=""
        title={title}
        aboveTitle={category?.data?.attributes?.name}
        cta={backToThemeCta}
      />
      <Breadcrumb isUnderHeader />
      {memoBlocks}
      {relatedArticles.length > 0 && (
        <StyledLatestNews
          newsOrStudies={relatedArticles}
          newsType="observatory"
          title="Dans la même **thématique**"
          cta={allThemeArticlesCta}
        />
      )}
    </React.Fragment>
  )
}

export const getStaticProps = (async ({ params }) => {
  const slug = params?.['slug'] as string

  const articleQuery = stringify(
    {
      populate: [
        'blocks',
        'blocks.image',
        'blocks.image.image',
        'blocks.image.image.data',
        'blocks.content',
        'blocks.items',
        'blocks.items.image',
        'blocks.items.items',
        'blocks.columns',
        'blocks.video',
        'blocks.video.image',
        'blocks.socialMediaLink',
        'blocks.cta',
        'blocks.firstCta',
        'blocks.secondCta',
        'blocks.simpleText',
        'blocks.tab.block.simpleText',
        'blocks.tab.block.accordions',
        'blocks.tab.block.accordions.simpleText',
        'blocks.tab.block.accordions.simpleText.columns',
        'blocks.tab.block.accordions.simpleText.columns.text',
        'blocks.accordions',
        'blocks.accordions.simpleText',
        'blocks.accordions.simpleText.columns',
        'blocks.accordions.simpleText.columns.text',
        'image',
        'category',
        'theme',
        'seo',
        'seo.metaSocial',
        'seo.metaSocial.image',
      ],
      filters: { slug: { $eqi: slug } },
    },
    { encodeValuesOnly: true }
  )

  const articles = (await Pages.getPage(
    PATHS.OBSERVATORIES,
    articleQuery
  )) as ObservatoryArticle[]

  const article = articles[0]
  if (!article) {
    return { notFound: true }
  }

  // Other articles of the same theme, most recent first
  const themeId = article.attributes.theme?.data?.id
  const relatedArticles = themeId
    ? ((await Pages.getPage(
        PATHS.OBSERVATORIES,
        stringify({
          sort: ['date:desc'],
          populate: ['image', 'category'],
          pagination: { limit: 3 },
          filters: {
            theme: { id: { $eq: themeId } },
            slug: { $ne: article.attributes.slug },
          },
        })
      )) as ObservatoryArticle[])
    : []

  return {
    props: {
      ...(await fetchLayoutData()),
      data: article,
      relatedArticles,
    },
  }
}) satisfies GetStaticProps<ObservatoryArticlePageProps>

export const getStaticPaths = (async () => {
  const articles = (await Pages.getPage(
    PATHS.OBSERVATORIES,
    stringify({ fields: ['slug'], pagination: {} })
  )) as ObservatoryArticle[]

  return {
    paths: articles.map((article) => ({
      params: { slug: article.attributes.slug },
    })),
    fallback: false,
  }
}) satisfies GetStaticPaths

const StyledLatestNews = styled(LatestNews)`
  ${({ theme }) => css`
    margin-top: 6rem;
    margin-bottom: 6rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      margin: 3.5rem 0 5rem;
    }
  `}
`
