import React from 'react'

interface CenteredTextProps {
  Title: string
  Text: string
}

export default function CenteredText(props: CenteredTextProps) {
  return (
    <div data-testid="centered-text">
      Centered Text
      <pre>
        <code>{JSON.stringify(props, null, 2)}</code>
      </pre>
    </div>
  )
}
