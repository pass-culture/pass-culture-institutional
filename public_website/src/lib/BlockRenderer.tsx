import React, { ComponentProps } from 'react'

import { CenteredText } from './blocks/CenteredText'
import { ExperienceVideo } from './blocks/ExperienceVideo'
import { ExperienceVideoCarousel } from './blocks/experienceVideoCarousel/experienceVideoCarousel'
import { Header } from './blocks/Header'
import { KeyNumber } from './blocks/Keynumber'
import { KeyNumberCarousel } from './blocks/keyNumberCarousel/keyNumberCarousel'
import { LatestNews } from './blocks/LatestNews'
import { LogoCarousel } from './blocks/logoCarousel/logoCarousel'
import { LogoCarouselSlide } from './blocks/logoCarousel/logoCarouselSlide'
import { Logos } from './blocks/Logos'
import { PushCTA } from './blocks/PushCTA'
import { SimpleText } from './blocks/SimpleText'
import { SocialMedia } from './blocks/SocialMedia'
import { Testimonies } from './blocks/Testimonies'
import { TestimonyCarouselSlide } from './blocks/testimonyCaousel/testimonyCarouselSlide'
import { VerticalCarousel } from './blocks/verticalCarousel/VerticalCarousel'
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
  'block.experience-video': ExperienceVideo,
  'block.key-number': KeyNumber,
  'block.logos': Logos,
  'block.testimonies': Testimonies,
  'block.experience-video-carousel': ExperienceVideoCarousel,
  'block.key-number-carousel': KeyNumberCarousel,
  'block.logo-carousel': LogoCarousel,
  'block.logo-carousel-slide': LogoCarouselSlide,
  'block.testimony-carousel': TestimonyCarouselSlide,
  'block.experience-video-carousel-props': ExperienceVideoCarouselP
}

export function BlockRenderer(props: BlockRendererProps) {
  const BlockComponent = COMPONENTS[props.block.__component]

  if (!BlockComponent) {
    return <UnkwnownBlock block={props.block} />
  }

  return <BlockComponent {...props.block} />
}
