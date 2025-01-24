import React, { ReactNode, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { OutlinedText } from '../OutlinedText'
import { AmountScreen } from './AmountScreen'
import { BackButton } from './BackButton'
import { FailureScreen } from './FailureScreen'
import { Question } from './Question'
import { ResultScreen } from './ResultScreen'
import { Step } from './Step'
import { SimulatorFragment } from '@/generated/graphql'
import { theme } from '@/theme/theme'
import { stripTags } from '@/utils/stripTags'

type SimulatorProps = SimulatorFragment & {
  className?: string
}

// type AmountScreen =
//   | SimulatorProps['data']['amountScreen_15']
//   | SimulatorProps['data']['amountScreen_16']
//   | SimulatorProps['amountScreen17']
//   | SimulatorProps['amountScreen18']

enum AgeAnswer {
  IS_LESS_THAN_15 = 0,
  IS_15 = 1,
  IS_16 = 2,
  IS_17 = 3,
  IS_18 = 4,
  IS_MORE_THAN_18 = 5,
}

enum NationalityAnswer {
  FRANCE = 0,
  OTHER = 1,
}

enum ResidencyAnswer {
  MORE_THAN_A_YEAR = 0,
  LESS_THAN_A_YEAR = 1,
}

export function Simulator(props: SimulatorProps) {
  // Each number in the array represents an answer or validated step
  const [answers, setAnswers] = useState<number[]>([])
  const [isPristine, setIsPristine] = useState(true)

  function onAnswerSubmit(newAnswers: number[]) {
    setAnswers(newAnswers)
    setIsPristine(false)
  }

  // Reset the focus at the start of the current step whenever it changes
  const stepContainerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (answers.length !== 0 || !isPristine) {
      stepContainerRef.current?.focus()
    }
  }, [answers, isPristine])

  let currentStepElement: ReactNode = null
  let isResultScreen = false
  let stepContainerAriaLabel = ''

  if (answers.length === 0) {
    // Age question
    currentStepElement = (
      <Question
        onSubmit={(r) => onAnswerSubmit([r])}
        title={props.ageQuestion.title}
        answers={props.ageQuestion.answers.filter((a) => a !== null)}
        type="slider"
      />
    )
    stepContainerAriaLabel = props.ageQuestion.title
  } else if (answers.length === 1 && typeof answers[0] === 'number') {
    // Amount screens or failures
    if (answers[0] === AgeAnswer.IS_LESS_THAN_15) {
      // Less than 15 yo
      currentStepElement = (
        <FailureScreen
          title={props.tooYoungScreen.title}
          text={props.tooYoungScreen.text}
          ctaLink={props.tooYoungScreen.cta}
        />
      )
      isResultScreen = true
      stepContainerAriaLabel = props.tooYoungScreen.title
    } else if (answers[0] === AgeAnswer.IS_MORE_THAN_18) {
      // More than 18 yo
      currentStepElement = (
        <FailureScreen
          title={props.tooOldScreen.title}
          text={props.tooOldScreen.text}
          ctaLink={props.tooOldScreen.cta}
        />
      )
      isResultScreen = true
      stepContainerAriaLabel = props.tooOldScreen.title
    } else {
      // 15, 16, 17, or 18 yo
      const screen = {
        [AgeAnswer.IS_15]: props.amountScreen_15,
        [AgeAnswer.IS_16]: props.amountScreen_16,
        [AgeAnswer.IS_17]: props.amountScreen_17,
        [AgeAnswer.IS_18]: props.amountScreen_18,
      }[answers[0]]
      const ageAnswer = answers[0]
      currentStepElement = (
        <AmountScreen
          text={screen?.text ?? ''}
          title={screen?.title ?? ''}
          onNext={() => onAnswerSubmit([ageAnswer, 0])}
        />
      )
      isResultScreen = true
      stepContainerAriaLabel = screen?.title ?? ''
    }
  } else if (answers.length === 2) {
    // Nationality question
    const previousAnswers = answers.slice(0, 2)
    currentStepElement = (
      <Question
        key="nat_question"
        onSubmit={(r) => onAnswerSubmit([...previousAnswers, r])}
        title={props.nationnalityQuestion.title}
        answers={props.nationnalityQuestion.answers.filter((a) => a !== null)}
        type="radio"
      />
    )
    stepContainerAriaLabel = props.nationnalityQuestion.title
  } else if (answers.length === 3) {
    if (answers[2] === NationalityAnswer.FRANCE) {
      // Success screen
      currentStepElement = (
        <ResultScreen
          title={props.successScreen.title}
          steps={props.successScreen.steps
            .map((s) => s?.step)
            .filter((s) => s != null)}
          ctaLink={props.successScreen.cta}
          helpText={props.successScreen.needSupport}
          supportLink={props.successScreen.supportLink}
        />
      )
      isResultScreen = true
      stepContainerAriaLabel = props.successScreen.title
    } else {
      // Residency time question
      const previousAnswers = answers.slice(0, 3)
      currentStepElement = (
        <Question
          key="res_question"
          onSubmit={(r) => setAnswers([...previousAnswers, r])}
          title={props.residencyQuestion.title}
          answers={props.residencyQuestion.answers.filter((a) => a != null)}
          type="radio"
        />
      )
      stepContainerAriaLabel = props.residencyQuestion.title
    }
  } else if (answers.length === 4) {
    if (answers[3] === ResidencyAnswer.MORE_THAN_A_YEAR) {
      // More than a year, success
      currentStepElement = (
        <ResultScreen
          title={props.successScreen.title}
          steps={props.successScreen.steps
            .map((s) => s?.step)
            .filter((s) => s != null)}
          ctaLink={props.successScreen.cta}
          helpText={props.successScreen.needSupport}
          supportLink={props.successScreen.supportLink}
        />
      )
      isResultScreen = true
      stepContainerAriaLabel = props.successScreen.title
    } else {
      // Failure
      currentStepElement = (
        <FailureScreen
          title={props.failureScreen.title}
          text={props.failureScreen.text}
          ctaLink={props.failureScreen.cta}
        />
      )
      isResultScreen = true
      stepContainerAriaLabel = props.failureScreen.title
    }
  }

  let displayedSteps = props.steps.slice(0, 1)
  if (answers.length === 2) {
    displayedSteps = props.steps.slice(0, 2)
  } else if (answers.length >= 3) {
    displayedSteps = props.steps.slice(0, 3)
  }

  const handleBackClick = function () {
    setAnswers(answers.slice(0, -1))
  }

  return (
    <Root className={props.className}>
      <Inner $showingResult={isResultScreen}>
        <Steps>
          {displayedSteps.map((step, i) => (
            <React.Fragment key={step?.id}>
              {i !== 0 && <StepSeparator aria-hidden="true" />}
              <Step
                circleText={(i + 1).toString().padStart(2, '0')}
                surtitle={`ÉTAPE ${i + 1}`}
                title={step?.step ?? ''}
                isActive={i + 1 === displayedSteps.length}
              />
            </React.Fragment>
          ))}
        </Steps>

        <BackContainer>
          {answers.length > 0 && <BackButton onClick={handleBackClick} />}
        </BackContainer>

        <StepContainer
          tabIndex={-1}
          aria-label={stripTags(stepContainerAriaLabel)}
          ref={stepContainerRef}>
          {currentStepElement}
        </StepContainer>
      </Inner>

      <TopEmoji shadow aria-hidden="true">
        {props.topEmoji}
      </TopEmoji>
      <BottomEmoji shadow aria-hidden="true">
        {props.bottomEmoji}
      </BottomEmoji>
    </Root>
  )
}

const Root = styled.div`
  position: relative;
`

const TopEmoji = styled(OutlinedText)`
  position: absolute;
  top: 0;
  right: 3rem;
  font-size: 5rem;
  transform: translateY(-50%) rotate(-16.81deg);

  @media (width < ${({ theme }) => theme.mediaQueries.largeDesktop}) {
    display: none;
  }
`

const BottomEmoji = styled(OutlinedText)`
  position: absolute;
  bottom: 0;
  left: 10rem;
  font-size: 5rem;
  z-index: 1;
  transform: translateY(50%) rotate(8.56deg);

  @media (width < ${({ theme }) => theme.mediaQueries.largeDesktop}) {
    display: none;
  }
`

const Inner = styled.div<{ $showingResult: boolean }>`
  box-shadow: ${({ theme }) => theme.shadows.sticker};
  background-color: ${({ theme, $showingResult }) =>
    $showingResult ? theme.colors.lightGray : theme.colors.white};
  position: relative;
  border-radius: ${theme.radius.sm};
  min-height: 42rem;
  border: 1px solid #cbcdd2;
  display: grid;
  grid-template-columns: 21rem 1fr;
  grid-template-rows: auto 1fr;

  @media (width < ${({ theme }) => theme.mediaQueries.largeDesktop}) {
    display: block;
    min-height: 41rem;
  }
`

const Steps = styled.ol`
  grid-row: 1 / -1;

  padding: 6.25rem 4rem;
  border-right: 1px solid ${({ theme }) => theme.colors.gray};

  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (width < ${({ theme }) => theme.mediaQueries.largeDesktop}) {
    flex-direction: row;
    padding: 2rem 1.5rem;
  }
`

const StepSeparator = styled.li`
  height: 2.25rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    left: 1.4375rem;
    width: 0.125rem;
    background-color: ${({ theme }) => theme.colors.darkGray};
    border-radius: 0.0625rem;
  }

  @media (width < ${({ theme }) => theme.mediaQueries.largeDesktop}) {
    height: 0;
    width: 2.25rem;

    &::after {
      left: 0;
      top: 1.4375rem;
      height: 0.125rem;
      width: unset;
    }
  }
`

const StepContainer = styled.div`
  &:focus {
    outline: none;
  }
`

const BackContainer = styled.div`
  margin-top: 4rem;
  padding: 0 4rem;

  @media (width < ${({ theme }) => theme.mediaQueries.largeDesktop}) {
    padding: 0 1.5rem;
    margin-top: 0;
  }
`
