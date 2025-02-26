import React, { useMemo } from 'react'
import { GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled, { css } from 'styled-components'

import { Pages } from '@/domain/pages/pages.output'
import { PATHS } from '@/domain/pages/pages.path'
import { SimplePushCta } from '@/lib/blocks/SimplePushCta'
import PageLayout from '@/lib/PageLayout'
import { PageWrapper } from '@/theme/style'
import { SimulatorProps } from '@/types/props'
import { APIResponseData } from '@/types/strapi'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import DisabledSimulator from '@/ui/components/simulator/DisabledSimulator'
import { Simulator } from '@/ui/components/simulator/Simulator'
import { Typo } from '@/ui/components/typographies'

export default function SimulatorPage(props: SimulatorProps) {
  const {
    seo,
    title,
    description,
    ageQuestion,
    nationnalityQuestion,
    residencyQuestion,
    successScreen,
    failureScreen,
    steps,
    tooYoungScreen,
    amountScreen_15,
    amountScreen_16,
    amountScreen_17,
    amountScreen_18,
    tooOldScreen,
    topEmoji,
    bottomEmoji,
    socialMedias,
    offres,
    disableSimulator,
    disableText,
  } = props.data.attributes

  const memoSteps = useMemo(() => steps.map((s) => s.step), [steps])

  return (
    <PageLayout seo={seo} title={undefined} socialMediaSection={socialMedias}>
      <PageWrapper>
        <Root>
          <Title>{title}</Title>
          <Description>{description}</Description>
          <UnpaddedBreadcrumb />
          {disableSimulator ? (
            <DisabledSimulator disableText={disableText} />
          ) : (
            <StyledSimulator
              ageQuestion={ageQuestion}
              nationnalityQuestion={nationnalityQuestion}
              residencyQuestion={residencyQuestion}
              successScreen={successScreen}
              failureScreen={failureScreen}
              steps={memoSteps}
              tooYoungScreen={tooYoungScreen}
              amountScreen15={amountScreen_15}
              amountScreen16={amountScreen_16}
              amountScreen17={amountScreen_17}
              amountScreen18={amountScreen_18}
              tooOldScreen={tooOldScreen}
              topEmoji={topEmoji}
              bottomEmoji={bottomEmoji}
            />
          )}
        </Root>
        {!!offres && (
          <SimplePushCta
            title={offres.title}
            surtitle={offres.surtitle}
            image={offres.image}
            cta={offres.cta}
            icon={offres.icon}
          />
        )}
      </PageWrapper>
    </PageLayout>
  )
}

const Root = styled(ContentWrapper)``

const Title = styled(Typo.Heading1)`
  margin-bottom: 1.75rem;
  padding-top: 1.75rem;
  @media (width < ${({ theme }) => theme.mediaQueries.mobile}) {
    text-align: center;
  }
`

const Description = styled(Typo.Body)`
  margin-bottom: 2rem;
  max-width: 38rem;

  @media (width < ${({ theme }) => theme.mediaQueries.mobile}) {
    text-align: center;
  }
`

const StyledSimulator = styled(Simulator)`
  ${({ theme }) => css`
    @media (width < ${theme.mediaQueries.tablet}) {
      margin-top: 2rem;
      margin-bottom: 2rem;
    }
  `}
`

export const getStaticProps = (async () => {
  const query = stringify(
    {
      populate: [
        'breadcrumbLinks',
        'ageQuestion.answers',
        'nationnalityQuestion.answers',
        'residencyQuestion.answers',
        'successScreen.steps',
        'successScreen.cta',
        'successScreen.supportLink',
        'failureScreen.cta',
        'tooYoungScreen.cta',
        'tooOldScreen.cta',
        'steps',
        'amountScreen_15',
        'amountScreen_16',
        'amountScreen_17',
        'amountScreen_18',
        'socialMedias.socialMediaLink',
        'bread.breadCrumbs',
        'bread.breadCrumbs.parent',
        'bread.breadCrumbs.fils',
        'seo',
        'seo.metaSocial',
        'seo.metaSocial.image',
        'offres',
        'offres.cta',
        'offres.image',
      ],
    },
    { encodeValuesOnly: true }
  )

  const response = (await Pages.getPage(
    PATHS.SIMULATOR,
    query
  )) as APIResponseData<'api::simulator.simulator'>

  return {
    props: {
      data: response,
    },
  }
}) satisfies GetStaticProps<SimulatorProps>

const UnpaddedBreadcrumb = styled(Breadcrumb)`
  padding: 0;
`
