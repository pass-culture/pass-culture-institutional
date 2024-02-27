import React, { FormEvent, useState } from 'react'
import styled from 'styled-components'

import { Button } from '../button/Button'
import { Label } from './Label'
import { RadioField } from './RadioField'

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
      {props.type === 'slider' ? (
        <Field>
          <Label htmlFor="question-field">{props.title}</Label>
          {/* TODO: slider https://slider-react-component.vercel.app/demo/marks */}
          <select
            id="question-field"
            value={answer}
            onChange={(e) => setAnswer(Number(e.target.value))}>
            {props.answers.map((answer, i) => (
              <option value={i} key={answer}>
                {answer}
              </option>
            ))}
          </select>
        </Field>
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

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  @media (width < ${({ theme }) => theme.mediaQueries.mobile}) {
    gap: 1.5rem;
  }
`

const SubmitContainer = styled.div`
  display: flex;
  justify-content: end;
`
