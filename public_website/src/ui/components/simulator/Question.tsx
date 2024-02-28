import React, { FormEvent, useState } from 'react'
import styled from 'styled-components'

import { Button } from '../button/Button'
import { RadioField } from './RadioField'
import { SliderField } from './SliderField'

interface QuestionProps {
  title: string
  type: 'slider' | 'radio'
  answers: string[]

  onSubmit: (response: number) => void
}

export function Question(props: QuestionProps) {
  const [answer, setAnswer] = useState<number>()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (answer) {
      props.onSubmit(answer)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      {answer}
      {props.type === 'slider' ? (
        <SliderField
          title={props.title}
          answers={props.answers}
          answer={answer}
          onChange={setAnswer}
        />
      ) : (
        <RadioField
          title={props.title}
          answers={props.answers}
          answer={answer}
          onChange={setAnswer}
        />
      )}
      <SubmitContainer>
        <Button type="submit" disabled={!answer}>
          Suivant
        </Button>
      </SubmitContainer>
    </Form>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  align-items: stretch;
  padding: 4rem;
  padding-top: 6.5rem;

  @media (width < ${({ theme }) => theme.mediaQueries.mobile}) {
    padding: 0 2rem;
    gap: 1.5rem;
  }
`

const SubmitContainer = styled.div`
  display: flex;
  justify-content: end;
`
