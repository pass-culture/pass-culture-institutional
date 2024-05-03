import React, { ReactNode, useEffect, useId, useState } from 'react'
import { createPortal } from 'react-dom'
import styled, { WebTarget } from 'styled-components'

interface OutlinedTextProps {
  children: ReactNode
  className?: string
  /** Change the element type. Defaults to 'span' */
  innerAs?: WebTarget

  /**
   * Color of the outline as an array of numbers between 0 and 1.
   * @default [1, 1, 1]
   */
  color?: [number, number, number]
  /**
   * Value of the `stdDeviation` attribute for the `<feGaussianBlur>` element.
   * @default 2
   */
  blurDeviation?: number
  /**
   * Value of the `radius` attribute for the `<feMorphology operator="dilate">` element.
   * @default 5
   */
  dilationRadius?: number

  /** If true, add a "synthetic" shadow to the text using more SVG filters. */
  shadow?: boolean
}

/**
 * Add an outline effect to the child text by adding an SVG filter to the `body` element.
 */
export function OutlinedText(props: OutlinedTextProps) {
  const filterId = useId()

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const {
    color = [1, 1, 1],
    blurDeviation = 1,
    dilationRadius = 6,
    shadow,
    innerAs,
    className,
    children,
    ...other
  } = props

  const svgElement = (
    <Svg
      version="1.1"
      xmlns="//www.w3.org/2000/svg"
      xmlnsXlink="//www.w3.org/1999/xlink">
      <defs>
        <filter id={filterId} x="-40%" width="180%" y="-40%" height="180%">
          <feGaussianBlur stdDeviation={blurDeviation} />
          <feColorMatrix
            mode="matrix"
            values={`0 0 0 0 ${color[0]}
                  0 0 0 0 ${color[1]}
                  0 0 0 0 ${color[2]}
                  0 0 0 999 0`}
          />
          <feMorphology
            operator="dilate"
            radius={dilationRadius}
            result="outline"
          />
          <feComposite
            in="SourceGraphic"
            in2="outline"
            operator="over"
            result="outlinedText"
          />

          {shadow && (
            <React.Fragment>
              <feGaussianBlur stdDeviation={2.5} result="shadow" />
              <feColorMatrix
                in="shadow"
                mode="matrix"
                values={`0 0 0 0 0
                         0 0 0 0 0
                         0 0 0 0 0
                         0 0 0 0.2 0`}
                result="shadow"
              />
              <feOffset in="shadow" result="shadow" dx={-4} dy={8} />
              <feComposite in="outlinedText" in2="shadow" operator="over" />
            </React.Fragment>
          )}
        </filter>
      </defs>
    </Svg>
  )

  return (
    <React.Fragment>
      <Root as={innerAs} className={className} $filterId={filterId} {...other}>
        {children}
      </Root>
      {mounted ? createPortal(svgElement, document.body) : null}
    </React.Fragment>
  )
}

const Root = styled.span<{ $filterId: string }>`
  filter: url(#${({ $filterId }) => $filterId});
`

const Svg = styled.svg`
  display: hidden;
  position: fixed;
  width: 0;
  height: 0;
`
