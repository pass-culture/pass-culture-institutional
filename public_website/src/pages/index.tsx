import React from 'react'
import Head from 'next/head'

import { playlistOffersFixtures } from '../../__tests__/fixtures'
import { Main } from '@/ui/components/containers/Main'
import { PageContainer } from '@/ui/components/containers/PageContainer'
import { ExternalLink } from '@/ui/components/links/ExternalLink'
import { InternalLink } from '@/ui/components/links/InternalLink'
import { Spacer } from '@/ui/components/Spacer'
import { CodeTag } from '@/ui/components/tags/CodeTag'
import { Typo } from '@/ui/components/typographies'
import { fetchBackend } from '@/utils/fetchBackend'
import { fetchCMS } from '@/utils/fetchCMS'

const CHECKBOX_ID = 'acceptTerms'

type HomeProps = {
  tags?: Tag[]
  playlist?: Offer[]
}

export default function Home({ tags, playlist }: Readonly<HomeProps>) {
  return (
    <PageContainer>
      <Head>
        <title>pass Culture</title>
        <meta
          name="pass Culture"
          content="Site institutionnel du pass Culture"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Typo.Title1>
          Welcome to{' '}
          <ExternalLink href="https://nextjs.org">Next.js!</ExternalLink>
        </Typo.Title1>
        <Typo.Body>
          Get started by editing
          <CodeTag>pages/index.tsx</CodeTag>
        </Typo.Body>
        {/* <Image
          src="https://storage.googleapis.com/passculture-metier-ehp-testing-assets-fine-grained/thumbs/mediations/LE"
          alt="image"
          width={200}
          height={300}
        /> */}
        <Spacer.Vertical spaces={2} />
        <div>
          <input
            type="checkbox"
            id={CHECKBOX_ID}
            data-testid={`checkbox-${CHECKBOX_ID}`}
          />
          <label htmlFor={CHECKBOX_ID}>Checkbox à cocher</label>
        </div>
        <InternalLink href="/about" name="About &rarr;" />
        <Spacer.Vertical spaces={2} />
        {tags ? (
          <ul>
            {tags.map((tag: Tag) => (
              <li key={tag.id}>
                <Typo.Body>{tag.attributes.displayName}</Typo.Body>
              </li>
            ))}
          </ul>
        ) : null}
        {playlist && playlist?.length > 0 ? (
          <ul>
            {playlist.map((offer: Offer) => (
              <li key={offer.id}>
                <Typo.Body>{offer.name}</Typo.Body>
                <Typo.Body>{offer.stocks[0]?.price}</Typo.Body>
              </li>
            ))}
          </ul>
        ) : null}
      </Main>
    </PageContainer>
  )
}

export async function getStaticProps() {
  const tagsResponse = await fetchCMS<Tag[]>('/active-playlist-tags')
  const tags = tagsResponse.data
  const playlistResponse =
    process.env['NODE_ENV'] === 'development'
      ? playlistOffersFixtures
      : await fetchBackend<Offer[]>(
          `institutional/playlist/${tags[0] ? tags[0].attributes.tag : ''}`
        )
  return {
    props: {
      tags: tags || null,
      playlist: playlistResponse.data || null,
      // "|| null" to avoid: "undefined cannot be serialized as JSON." https://github.com/vercel/next.js/discussions/11209
    },
  }
}

export type Tag = {
  attributes: {
    tag: string
    displayName: string
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
  id: number
}

type Venue = {
  id: number
  commonName: string
}

type Stock = {
  id: number
  price: number
}

export type Offer = {
  id: number
  name: string
  venue: Venue
  image: null
  stocks: Stock[]
}
