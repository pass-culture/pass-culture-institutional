import React, { ComponentProps } from 'react'

import { CenteredText } from './blocks/CenteredText'
import { Header } from './blocks/Header'
import { Image } from './blocks/Image'
import { ImageText } from './blocks/ImageText'
import { LatestNews } from './blocks/LatestNews'
import { LittleList } from './blocks/LittleList'
import { PushCTA } from './blocks/PushCTA'
import { SimpleText } from './blocks/SimpleText'
import { SocialMedia } from './blocks/SocialMedia'
import { VerticalCarousel } from './blocks/verticalCarousel/VerticalCarousel'
import { Video } from './blocks/Video'
import { WhiteSpace } from './blocks/WhiteSpace'
import { UnkwnownBlock } from './UnknownBlock'

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
  'block.push-cta': PushCTA,
  'block.social-media': SocialMedia,
  'block.latest-news': LatestNews,
  'block.vertical-carousel': VerticalCarousel,
  'block.image': Image,
  'block.image-text': ImageText,
  'block.little-list': LittleList,
  'block.video': Video,
  'block.white-space': WhiteSpace,
}

export function BlockRenderer(props: BlockRendererProps) {
  const BlockComponent = COMPONENTS[props.block.__component]

  if (!BlockComponent) {
    return <UnkwnownBlock block={props.block} />
  }

  return <BlockComponent {...props.block} />
}
