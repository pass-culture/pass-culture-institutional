import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components'

import { playlistOffersFixtures } from '../../__tests__/fixtures'
import { Offer, Tag } from '@/types/playlist'
import { Main } from '@/ui/components/containers/Main'
import { PageContainer } from '@/ui/components/containers/PageContainer'
import { ExternalLink } from '@/ui/components/links/ExternalLink'
import { InternalLink } from '@/ui/components/links/InternalLink'
import { Spacer } from '@/ui/components/Spacer'
import { CodeTag } from '@/ui/components/tags/CodeTag'
import { Typo } from '@/ui/components/typographies'
import { fetchBackend } from '@/utils/fetchBackend'
import { fetchCMS } from '@/utils/fetchCMS'

type Props = {
  playlistName?: string
  playlist?: Offer[]
}

export default function Home({ playlistName, playlist }: Readonly<Props>) {
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
        <Spacer.Vertical spaces={2} />

        <InternalLink href="/about" name="About &rarr;" />
        <Spacer.Vertical spaces={2} />

        {!!playlistName && <Typo.Title1>{playlistName}</Typo.Title1>}

        {playlist && playlist.length > 0 ? (
          <ul>
            {playlist.map((offer: Offer) => (
              <Li key={offer.id}>
                <Typo.Body>{offer.name}</Typo.Body>
                <Typo.Body>{offer.stocks[0]?.price} €</Typo.Body>
                {offer.image?.url ? (
                  <Image
                    src={offer.image?.url}
                    alt=""
                    width={300}
                    height={400}
                  />
                ) : null}
              </Li>
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
  const firstTag = tags[0]
  const playlistResponse =
    process.env['NODE_ENV'] === 'development'
      ? playlistOffersFixtures
      : await fetchBackend(`institutional/playlist/${firstTag?.attributes.tag}`)

  return {
    props: {
      playlistName: firstTag?.attributes.displayName,
      playlist: playlistResponse,
    },
  }
}

const Li = styled.li({
  display: 'inline-block',
  margin: '5px',
})
