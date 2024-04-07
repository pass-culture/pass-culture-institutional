import React from 'react'
import { GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled, { css } from 'styled-components'

import { SocialMedia } from '@/lib/blocks/SocialMedia'
import { APIResponseData } from '@/types/strapi'
import { Simulator } from '@/ui/components/simulator/Simulator'
import { Typo } from '@/ui/components/typographies'
import { fetchCMS } from '@/utils/fetchCMS'

interface SimulatorProps {
  data: APIResponseData<'api::simulator.simulator'>
}

export default function SimulatorPage(props: SimulatorProps) {
  return (
    <Root>
      <Title
        dangerouslySetInnerHTML={{ __html: props.data.attributes.title }}
      />
      <Description
        dangerouslySetInnerHTML={{ __html: props.data.attributes.description }}
      />

      <StyledSimulator
        ageQuestion={props.data.attributes.ageQuestion}
        nationnalityQuestion={props.data.attributes.nationnalityQuestion}
        residencyQuestion={props.data.attributes.residencyQuestion}
        successScreen={props.data.attributes.successScreen}
        failureScreen={props.data.attributes.failureScreen}
        tooYoungScreen={props.data.attributes.tooYoungScreen}
        steps={props.data.attributes.steps.map((s) => s.step)}
        amountScreen15={props.data.attributes.amountScreen_15}
        amountScreen16={props.data.attributes.amountScreen_16}
        amountScreen17={props.data.attributes.amountScreen_17}
        amountScreen18={props.data.attributes.amountScreen_18}
        tooOldScreen={props.data.attributes.tooOldScreen}
        topEmoji={props.data.attributes.topEmoji}
        bottomEmoji={props.data.attributes.bottomEmoji}
      />

      <SocialMedia
        title={props.data.attributes.socialMedias.title}
        socialMediaLink={props.data.attributes.socialMedias.socialMediaLink}
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
      ],
    },
    { encodeValuesOnly: true }
  )
  const response = await fetchCMS<APIResponseData<'api::simulator.simulator'>>(
    `/simulator?${query}`
  )

  return {
    props: {
      data: response.data,
    },
  }
}) satisfies GetStaticProps<SimulatorProps>
