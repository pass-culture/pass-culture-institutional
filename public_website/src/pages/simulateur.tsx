import React, { useMemo } from 'react'
import { GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled, { css } from 'styled-components'

import { Pages } from '@/domain/pages/pages.output'
import { PATHS } from '@/domain/pages/pages.path'
import { SimplePushCta } from '@/lib/blocks/SimplePushCta'
import { SocialMedia } from '@/lib/blocks/SocialMedia'
import { Seo } from '@/lib/seo/seo'
import { APIResponseData } from '@/types/strapi'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'
import { Simulator } from '@/ui/components/simulator/Simulator'
import { Typo } from '@/ui/components/typographies'

interface SimulatorProps {
  data: APIResponseData<'api::simulator.simulator'>
}

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
    tooYoungScreen,
    steps,
    amountScreen_15,
    amountScreen_16,
    amountScreen_17,
    amountScreen_18,
    tooOldScreen,
    topEmoji,
    bottomEmoji,
    socialMedias,
    offres,
  } = props.data.attributes

  const memoSteps = useMemo(() => steps.map((s) => s.step), [steps])

  return (
    <Root>
      {!!seo && <Seo metaData={seo} />}
      <Title>{title}</Title>
      <Description>{description}</Description>
      <UnpaddedBreadcrumb />

      <StyledSimulator
        ageQuestion={ageQuestion}
        nationnalityQuestion={nationnalityQuestion}
        residencyQuestion={residencyQuestion}
        successScreen={successScreen}
        failureScreen={failureScreen}
        tooYoungScreen={tooYoungScreen}
        steps={memoSteps}
        amountScreen15={amountScreen_15}
        amountScreen16={amountScreen_16}
        amountScreen17={amountScreen_17}
        amountScreen18={amountScreen_18}
        tooOldScreen={tooOldScreen}
        topEmoji={topEmoji}
        bottomEmoji={bottomEmoji}
      />

      {!!offres && (
        <SimplePushCta
          title={offres.title}
          surtitle={offres.surtitle}
          image={offres.image}
          cta={offres.cta}
          icon={offres.icon}
        />
      )}

      <SocialMedia
        title={socialMedias.title}
        socialMediaLink={socialMedias.socialMediaLink}
      />
    </Root>
  )
}

const Root = styled.div`
  max-width: calc(75rem + 1rem);
  margin: auto;
  padding: 1rem;
`

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
    margin-top: 7rem;
    margin-bottom: 11rem;

    @media (width < ${theme.mediaQueries.tablet}) {
      margin-top: 3rem;
      margin-bottom: 3rem;
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
