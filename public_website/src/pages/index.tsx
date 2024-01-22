import React from 'react'
import Head from 'next/head'

import { Main } from '@/ui/components/containers/Main'
import { PageContainer } from '@/ui/components/containers/PageContainer'
import { ExternalLink } from '@/ui/components/links/ExternalLink'
import { InternalLink } from '@/ui/components/links/InternalLink'
import { Spacer } from '@/ui/components/Spacer'
import { CodeTag } from '@/ui/components/tags/CodeTag'
import { Typo } from '@/ui/components/typographies'
import { fetchAPI } from '@/utils/fetchAPI'

const CHECKBOX_ID = 'acceptTerms'

type HomeProps = {
  activePlaylistTags?: []
}

export default function Home({ activePlaylistTags }: Readonly<HomeProps>) {
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
        {activePlaylistTags ? (
          <ul>
            {activePlaylistTags.map((tag: ActivePlaylistTag) => (
              <li key={tag.id}>
                <Typo.Body>{tag.attributes.name}</Typo.Body>
              </li>
            ))}
          </ul>
        ) : null}
      </Main>
    </PageContainer>
  )
}

export async function getStaticProps() {
  const response = await fetchAPI<ActivePlaylistTag[]>('/active-playlist-tags')
  return {
    props: {
      activePlaylistTags: response.data,
    },
  }
}

export type ActivePlaylistTag = {
  attributes: {
    name: string
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
  id: number
}
