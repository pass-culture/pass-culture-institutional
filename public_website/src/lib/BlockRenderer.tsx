import React, { ComponentProps } from 'react'

import { CenteredText } from './blocks/CenteredText'
import { DetailedLogos } from './blocks/DetailedLogos'
import { DoublePushCTA } from './blocks/DoublePushCta'
import { ExperienceVideoCarousel } from './blocks/experienceVideoCarousel/experienceVideoCarousel'
import { Faq } from './blocks/Faq'
import { Header } from './blocks/Header'
import { Headertest } from './blocks/HeaderTest'
import { HeaderWithQRCode } from './blocks/HeaderWithQRCode'
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
import { SimpleTextWithMedia } from './blocks/SimpleTextWithMedia'
import { SocialMedia } from './blocks/SocialMedia'
import TabsImageText from './blocks/tabs/TabsImageText'
import TabsPushGreyCta from './blocks/tabs/TabsPushGreyCta'
import TabsLittleList from './blocks/tabs/TabsSimpleList'
import TabsSimpleText from './blocks/tabs/TabsSimpleText'
import { VerticalCarousel } from './blocks/verticalCarousel/VerticalCarousel'
import { Video } from './blocks/Video'
import { WhiteSpace } from './blocks/WhiteSpace'
import { UnkwnownBlock } from './UnknownBlock'
import { PageQuery } from '@/generated/graphql'
import { Breadcrumb } from '@/ui/components/breadcrumb/Breadcrumb'
export interface Block {
  __component: string
}

const COMPONENTS: Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (props: ComponentProps<any>) => React.JSX.Element | null
> = {
  ComponentBlockHeader: Header,
  ComponentBlockHeaderTest: Headertest,
  ComponentBlockCenteredText: CenteredText,
  ComponentBlockPushCta: PushCTA,
  ComponentBlockSocialMedia: SocialMedia,
  ComponentBlockLatestNews: LatestNews,
  ComponentBlockVerticalCarousel: VerticalCarousel,
  ComponentBlockKeyNumber: KeyNumber,
  ComponentBlockLogos: Logos,
  ComponentBlockDetailedLogos: DetailedLogos,
  ComponentBlockExperienceVideoCarousel: ExperienceVideoCarousel,
  ComponentBlockKeyNumberCarousel: KeyNumberCarousel,
  ComponentBlockLogoCarousel: LogoCarousel,
  ComponentBlockLogoCarouselSlide: LogoCarouselSlide,
  ComponentBlockImage: Imageblock,
  ComponentBlockImageText: ImageText,
  ComponentBlockLittleList: LittleList,
  ComponentBlockVideo: Video,
  ComponentBlockSpace: WhiteSpace,
  ComponentBlockKeyNumberCarouselSlide: KeyNumberCarouselSlide,
  ComponentBlockDoublePushCta: DoublePushCTA,
  ComponentBlockSeparator: Separator,
  ComponentBlockSimplePushCta: SimplePushCta,
  ComponentBlockOffersCarousel: OffersCarousel,
  ComponentBlockPiledCards: PiledCards,
  ComponentBlockFaq: Faq,
  ComponentBlockOrganizationChart: OrganizationChart,
  ComponentBlockSimpleTextV2: SimpleTextV2,
  ComponentBlockImageGallery: ImageGallery,
  ComponentBlockBreadcrumb: Breadcrumb,
  ComponentBlockHeaderWithQRcode: HeaderWithQRCode,
  ComponentBlockColumnsText: SimpleTextWithMedia,
  ComponentBlockCenteredTitle: CenteredText,
  ComponentBlockTabsImageText: TabsImageText,
  ComponentBlockTabsSimpleText: TabsSimpleText,
  ComponentBlockTabsLittleList: TabsLittleList,
  ComponentBlockTabsPushGreyCta: TabsPushGreyCta,
}

export function BlockRenderer({
  block,
}: {
  block: NonNullable<
    NonNullable<NonNullable<PageQuery['pages'][number]>['Blocks']>[number]
  >
}) {
  const BlockComponent = COMPONENTS[block.__typename]

  if (!BlockComponent) {
    return <UnkwnownBlock block={block} />
  }

  return <BlockComponent {...block} />
}
