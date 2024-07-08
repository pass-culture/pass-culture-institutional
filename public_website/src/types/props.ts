import { type BlocksContent } from '@strapi/blocks-react-renderer'
import { AppProps } from 'next/app'

import { CTA } from './CTA'
import { Offer } from './playlist'
import { APIResponse, APIResponseData } from './strapi'
import { ExperienceVideoCarouselSlideProps } from '@/lib/blocks/experienceVideoCarousel/experieneVideoCarouselSlide'
import { PiledCardItemsTheme } from '@/lib/blocks/PiledCards/piled-card-items-theme'
import { FooterProps } from '@/ui/components/footer/Footer'

export type BaseTextProps = {
  title: string
  description: string
}

export type XMetaProps = {
  image: APIResponse<'plugin::upload.file'> | null | undefined
}

export type SeoProps = {
  metaData: APIResponseData<'api::page.page'>['attributes']['seo'] | null
}
export type FacebookMetaProps = {
  image: APIResponse<'plugin::upload.file'> | null | undefined
}
export type MyAppProps = AppProps & {
  headerData: HeaderMenuProps
  footerData: FooterProps
}
export type BreadcrumbProps = {
  isUnderHeader?: boolean
  className?: string
}
export type HeroProps = {
  title: string
  subTitle: string
  cta: CTA
  firstEmoji: string
  secondEmoji: string
  thirdEmoji: string
  fourthEmoji: string
  fifthEmoji: string
  sixthEmoji: string
  images: APIResponseData<'plugin::upload.file'>[] | null
}
export type TabSimpleTextProps = {
  id: number
  tab: {
    title: string
    block: ImageTextProps & { text: string }[]
    id: number
  }[]
}
export type ImageTextProps = {
  title?: string
  text: BlocksContent
  image?: APIResponse<'plugin::upload.file'> | null
  icon?: string
  isImageRight?: boolean
}
export type HeaderMenuProps = {
  targetItems: HeaderNavigationItemProps[]
  aboutItems: HeaderNavigationItemProps[]
  login: {
    buttonLabel: string
    items: AccountItemProps[]
  }
  signup: {
    buttonLabel: string
    items: AccountItemProps[]
  }
}
export type AccountItemProps = {
  label: string
  url: string
  color: string
  emoji: string
}

export type AccountItemDropdownProps = {
  color: string
  url: string
  emoji: string
  label: string
  eventName?: string
  eventOrigin?: string
}

export type AccountDropdownProps = {
  items: AccountItemProps[]
  openButtonElement: HTMLButtonElement | null
  labelId: string
  align?: 'left' | 'right'
  onKeyDown: () => void
  onBlur: () => void
  onMouseLeave: () => void
}

export type HeaderNavigationItemProps = {
  id: number
  label: string
  megaMenu: {
    title: string
    cta: CTA
    bannerText?: string
    bannerAndroidUrl?: string
    bannerDefaultUrl: string
    bannerIosUrl?: string
    primaryListItems: CTA[]
    secondaryListItems: CTA[]
    cardTitle: string
    cardDescription: string
    cardLink: CTA
    cardFirstEmoji: string
    cardSecondEmoji: string
  }
}

export type QRCodeProps = {
  qrCodeDescription: string
  ctaLink: CTA
  qrCodeUrl: string
}

export type PushCTAProps = {
  title: string
  description?: string
  surtitle?: string
  image: APIResponse<'plugin::upload.file'> | null | undefined
  cta?: CTA
  icon?: string
  className?: string
}
export type SocialMediaProps = {
  title: string
  socialMediaLink: { name: string; url: string }[]
  className?: string
}
export type SeparatorTextProps = {
  isActive: boolean | undefined
}
export type OfferProps = {
  offers: Offer[]
  cta: CTA
  firstCartTitle: string
  secondCartTitle: string
  ctaCard: CTA
  descriptionCard: string
  firstIcon: string
  secondIcon: string
}

export type SimpleTextV2Props = {
  title?: string
  text: BlocksContent
  columns: {
    id: number
    title: string
    text: BlocksContent
  }[]
}

export type VideoProps = {
  description?: string
  url?: string
  alt?: string
  image?: APIResponse<'plugin::upload.file'> | null
}

export type SimpleTextWithMediaProps = SimpleTextV2Props & {
  video: VideoProps & { $noMargin?: boolean }
}

export type HeaderProps = {
  title: string
  text?: string
  aboveTitle?: string
  image: APIResponse<'plugin::upload.file'> | null
  icon: string
  icon2?: string
  cta?: CTA
}

export type ExperienceVideoCarouselProps = {
  title: string
  isLandscape?: boolean
  carouselItems: Omit<ExperienceVideoCarouselSlideProps, 'slideIndex'>[]
}

export type ListProps = {
  offerListe: APIResponseData<'api::liste-offre.liste-offre'>
  offerItems: Offer[]
}
export type HomeProps = {
  homeData: APIResponseData<'api::home.home'>
  recommendationItems: Offer[]
  latestStudies: APIResponseData<'api::resource.resource'>[]
}
export type FaqProps = {
  title: string
  cta: CTA
  /** Category IDs separated by commas */
  categories: string | undefined
  /** Only questions with the given property set to true are displayed. */
  filteringProperty: string
  limit: number
}
type Item = {
  id: number
  title: string
  description: string
  firstIcon: string
  secondIcon: string
  image: APIResponse<'plugin::upload.file'> | null
  theme: PiledCardItemsTheme
}
export type PiledCardsProps = {
  items: Item[]
  accessibleTitle: string
}
export type PiledCardsCarouselProps = {
  title: string
  items: Omit<PiledCardsCarouselSlideProps, 'slideIndex'>[]
  className?: string
}
export type PiledCardsCarouselSlideProps = {
  slideIndex: number
  image: string | APIResponse<'plugin::upload.file'> | null
  title: string
  description: string
  theme: PiledCardItemsTheme
}

export type DetailedLogosProps = {
  title?: string
  logos: {
    title: string
    description: string
    cta: CTA
    image: APIResponse<'plugin::upload.file'> | null
  }[]
}

export type LatestNewsProps = {
  events: APIResponseData<'api::event.event'>[]
  className?: string
  buttonText?: string
  type?: string
}
export type OrganizationChartProps = {
  title?: string
  description: string
  people: {
    name: string
    position: string
    image: APIResponse<'plugin::upload.file'> | null
  }[]
}

export type BannerProps = {
  bannerText?: string
  bannerAndroidUrl?: string
  bannerIosUrl?: string
  bannerDefaultUrl?: string
}

export type MegaMenuProps = {
  onBlur: () => void
  onKeyDown: (e: KeyboardEvent) => void
  onMouseLeave: () => void
  getOpenButtonEl: () => HTMLButtonElement | null
  id: string
  labelId: string
  data: {
    title: string
    cta: CTA
    primaryListItems: CTA[]
    secondaryListItems: CTA[]
    cardTitle: string
    cardDescription: string
    cardLink: CTA
    cardFirstEmoji: string
    cardSecondEmoji: string
  } & BannerProps
}

export type RecommendationsProps = {
  title: string
  recommendations: Offer[]
  cta: CTA
}
export type ListCardProps = {
  title: string
  category: string
  date: Date | string
  imageUrl: string | null | undefined
  slug: string
  type: string | undefined
}
export type NewsCardProps = {
  title: string
  category: string
  date: Date | string
  imageUrl: string | null
  slug: string
}

export type WhiteSpaceProps = {
  space?: number
}
