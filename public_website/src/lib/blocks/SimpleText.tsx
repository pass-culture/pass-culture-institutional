import React from 'react'

interface SimpleTextProps {
  Title: string
  Text: string
}

export default function SimpleText(props: SimpleTextProps) {
  return (
    <div>
      SimpleText
      <pre>
        <code>{JSON.stringify(props, null, 2)}</code>
      </pre>
    </div>
  )
}
