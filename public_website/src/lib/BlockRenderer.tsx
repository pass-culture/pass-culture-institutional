import React, { ComponentProps } from 'react'

import { CenteredText } from './blocks/CenteredText'
import { DetailedLogos } from './blocks/DetailedLogos'
import { DoublePushCTA } from './blocks/DoublePushCta'
import { ExperienceVideoCarousel } from './blocks/experienceVideoCarousel/experienceVideoCarousel'
import { Faq } from './blocks/Faq'
import { Header } from './blocks/Header'
import { Headertest } from './blocks/HeaderTest'
import { Imageblock } from './blocks/Image'
import { ImageGallery } from './blocks/ImageGallery'
import { ImageText } from './blocks/ImageText'
import { KeyNumber } from './blocks/Keynumber'
import { KeyNumberCarousel } from './blocks/keyNumberCarousel/keyNumberCarousel'
import { KeyNumberCarouselSlide } from './blocks/keyNumberCarousel/keyNumberCarouselSlide'
import { LatestNews } from './blocks/LatestNews'
import { LittleList } from './blocks/LittleList'
import { LogoCarousel } from './blocks/logoCarousel/logoCarousel'
import { LogoCarouselSlide } from './blocks/logoCarousel/logoCarouselSlide'
import { Logos } from './blocks/Logos'
import { OffersCarousel } from './blocks/offersCarousel/offersCarousel'
import { OrganizationChart } from './blocks/OrganizationChart'
import { PiledCards } from './blocks/PiledCards/PiledCards'
import { PushCTA } from './blocks/PushCTA'
import { Separator } from './blocks/Separator'
import { SimplePushCta } from './blocks/SimplePushCta'
import { SimpleTextV2 } from './blocks/SimpleTextV2'
import { SocialMedia } from './blocks/SocialMedia'
import { VerticalCarousel } from './blocks/verticalCarousel/VerticalCarousel'
import { Video } from './blocks/Video'
import { WhiteSpace } from './blocks/WhiteSpace'
import { UnkwnownBlock } from './UnknownBlock'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'
export interface Block {
  __component: string
}

interface BlockRendererProps {
  block: Block
}

const COMPONENTS: Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (props: ComponentProps<any>) => React.JSX.Element | null
> = {
  'block.header': Header,
  'block.header-test': Headertest,
  'block.centered-text': CenteredText,
  'block.push-cta': PushCTA,
  'block.social-media': SocialMedia,
  'block.latest-news': LatestNews,
  'block.vertical-carousel': VerticalCarousel,

  'block.key-number': KeyNumber,
  'block.logos': Logos,
  'block.detailed-logos': DetailedLogos,
  'block.experience-video-carousel': ExperienceVideoCarousel,
  'block.key-number-carousel': KeyNumberCarousel,
  'block.logo-carousel': LogoCarousel,
  'block.logo-carousel-slide': LogoCarouselSlide,
  'block.image': Imageblock,
  'block.image-text': ImageText,
  'block.little-list': LittleList,
  'block.video': Video,
  'block.space': WhiteSpace,
  'block.key-number-carousel-slide': KeyNumberCarouselSlide,
  'block.double-push-cta': DoublePushCTA,
  'block.separator': Separator,
  'block.simple-push-cta': SimplePushCta,
  'block.offers-carousel': OffersCarousel,
  'block.piled-cards': PiledCards,
  'block.faq': Faq,
  'block.organization-chart': OrganizationChart,
  'block.simple-text-v2': SimpleTextV2,
  'block.image-gallery': ImageGallery,
  'block.breadcrumb': Breadcrumb,
}

export function BlockRenderer(props: BlockRendererProps) {
  const BlockComponent = COMPONENTS[props.block.__component]

  if (!BlockComponent) {
    return <UnkwnownBlock block={props.block} />
  }

  return <BlockComponent {...props.block} />
}
