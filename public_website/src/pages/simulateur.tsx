import React from 'react'
import { GetStaticProps } from 'next'
import { stringify } from 'qs'
import styled from 'styled-components'

import { SocialMedia } from '@/lib/blocks/SocialMedia'
import { APIResponseData } from '@/types/strapi'
import { Simulator } from '@/ui/components/simulator/Simulator'
import { fetchCMS } from '@/utils/fetchCMS'

interface SimulatorProps {
  data: APIResponseData<'api::simulator.simulator'>
}

export default function SimulatorPage(props: SimulatorProps) {
  console.log(props.data.attributes.socialMedias)
  return (
    <Root>
      <Title
        dangerouslySetInnerHTML={{ __html: props.data.attributes.title }}
      />
      <Description
        dangerouslySetInnerHTML={{ __html: props.data.attributes.description }}
      />

      <div>BREADCRUMB ICI</div>

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
        links={props.data.attributes.socialMedias.socialMediaLink}
      />
    </Root>
  )
}

const Root = styled.div`
  max-width: calc(1200px + 1rem);
  margin: auto;
  padding: 1rem;
`

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.secondary};

  margin-bottom: 1.75rem;
`

const Description = styled.p`
  font-size: 1rem;
  font-weight: 500;
  line-height: 2;
`

const StyledSimulator = styled(Simulator)`
  margin-top: 7rem;
  margin-bottom: 11rem;
`

export const getStaticProps = (async () => {
  const query = stringify(
    {
      populate: [
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
