import React from 'react'

type ConditionalRenderProps = {
  condition: boolean
  children: React.ReactNode
}

const ConditionalRender = ({ condition, children }: ConditionalRenderProps) => {
  return condition && children
}

const BlockRendererWithCondition = ({
  condition,
  children,
}: {
  condition: boolean
  children: React.ReactNode
}) => {
  return <ConditionalRender condition={condition}>{children}</ConditionalRender>
}

export default React.memo(BlockRendererWithCondition)
