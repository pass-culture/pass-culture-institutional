import React, { ComponentProps } from 'react'

import CenteredText from './blocks/CenteredText'
import Header from './blocks/Header'
import SimpleText from './blocks/SimpleText'
import UnkwnownBlock from './UnknownBlock'

export interface Block {
  __component: string
}

interface BlockRendererProps {
  block: Block
}

const COMPONENTS: Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (props: ComponentProps<any>) => React.JSX.Element
> = {
  'block.header': Header,
  'block.centered-text': CenteredText,
  'block.simple-text': SimpleText,
}

export default function BlockRenderer(props: BlockRendererProps) {
  const BlockComponent = COMPONENTS[props.block.__component]

  if (!BlockComponent) {
    return <UnkwnownBlock block={props.block} />
  }

  return <BlockComponent {...props.block} />
}
