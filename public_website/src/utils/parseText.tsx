import React from 'react'

export const parseText = (
  text: string
): {
  processedText: JSX.Element[]
  accessibilityLabel: string
} => {
  const textWithLineBreaks = text.replace(/<br\s*\/?>/gi, '\n')
  const parts = textWithLineBreaks.split(/\*\*/)
  const accessibilityLabel = parts.join('').replace(/\n/g, '')

  const processedText = parts.map((part, index) => {
    if (index % 2 === 1) {
      return <mark key={part + index}>{part}</mark>
    } else {
      const lines = part.split('\n')
      return (
        <span key={part + index}>
          {lines.map((line, lineIndex) => (
            <React.Fragment key={lineIndex}>
              {line}
              {lineIndex < lines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </span>
      )
    }
  })

  return { processedText, accessibilityLabel }
}
