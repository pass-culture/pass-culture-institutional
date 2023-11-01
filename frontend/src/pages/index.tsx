import React from 'react'
import Head from 'next/head'

import { analyticsProvider } from '@/libs/analytics/analyticsProvider'
import { Main } from '@/ui/components/containers/Main'
import { PageContainer } from '@/ui/components/containers/PageContainer'
import { ExternalLink } from '@/ui/components/links/ExternalLink'
import { InternalLink } from '@/ui/components/links/InternalLink'
import { CodeTag } from '@/ui/components/tags/CodeTag'
import { Typo } from '@/ui/components/typographies'

const CHECKBOX_ID = 'acceptTerms'

export default function Home() {
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

        <div>
          <input
            type="checkbox"
            id={CHECKBOX_ID}
            data-testid={`checkbox-${CHECKBOX_ID}`}
          />
          <label htmlFor={CHECKBOX_ID}>Checkbox à cocher</label>
        </div>

        <InternalLink href="/about" name="About &rarr;" />
        <button
          onClick={() =>
            analyticsProvider.logEvent('testEvent', { param: 'testParam' })
          }>
          Trigger analytics event
        </button>
      </Main>
    </PageContainer>
  )
}
