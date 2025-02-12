import React, { AnchorHTMLAttributes, ReactNode } from 'react'
import { type BlocksContent } from '@strapi/blocks-react-renderer'
import { AppProps } from 'next/app'
import { LinkProps as NextLinkProps } from 'next/link'

import { CTA } from './CTA'
import { Offer } from './playlist'
import { APIResponse, APIResponseData } from './strapi'
import { ItemsTheme } from '@/theme/style'

export type BaseTextProps = {
  title: string
  description: string
}
export type BaseTextWithOptionTitleProps = {
  title?: string
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
export type TabImageTextProps = {
  id: number
  children: React.ReactNode
  tab: {
    title: string
    block: ImageTextProps & { text: string }[]
    id: number
  }[]
}
export type TabSimpleTextProps = {
  id: number
  children: React.ReactNode
  tab: {
    title: string
    block: SimpleTextV2Props & { text: string }[]
    id: number
  }[]
}
export type TabSimpleListProps = {
  id: number
  children: React.ReactNode
  tab: {
    title: string
    block: LittleListProps & { text: string }[]
    id: number
  }[]
}
export type TabPushGreyProps = {
  id: number
  children: React.ReactNode
  tab: {
    title: string
    block: PushCTAProps &
      {
        text?: string
        firstCta: CTA
        secondCta?: CTA
      }[]
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
export type BreadcrumbDataProps = {
  targetItems: HeaderNavigationItemProps[]
  aboutItems: HeaderNavigationItemProps[]
  footerItems: { Label: string; URL: string; id: number }[]
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
    theme: ItemsTheme
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
export type HeaderWithQRCodeProps = {
  title: string
  text?: string
  image: APIResponse<'plugin::upload.file'> | null
  icon: string
  cta?: CTA
  QRCode: {
    URL: string
    Label: string
  }
}

export type ExperienceVideoCarouselProps = {
  title: string
  isLandscape?: boolean
  carouselItems: Omit<ExperienceVideoCarouselSlideProps, 'slideIndex'>[]
}
export type ExperienceVideoCarouselSlideProps = {
  slideIndex: number
  title: string
  description: string
  url?: string
  isLandscape?: boolean
}

export type KeyNumberCarouselProps = {
  title: string
  items: Omit<KeyNumberCarouselSlideProps, 'slideIndex'>[]
}
export type KeyNumberCarouselSlideProps = {
  slideIndex: number
  title: string
  description: string
  firstEmoji: string
  secondEmoji: string
  thirdEmoji: string
}

export type KeyNumberProps = {
  title: string
  items: Omit<KeyNumberCarouselSlideProps, 'slideIndex'>[]
}

export type LogoCarouselProps = {
  items: { logo: APIResponse<'plugin::upload.file'> | null | undefined }[]
}
export type LogoCarouselSlideProps = {
  slideIndex: number
  image: APIResponse<'plugin::upload.file'> | undefined | null
}

export type OffersVideoCarouselProps = {
  title: string
  items: Omit<OffersCarouselSlideProps, 'slideIndex'>[]
  description?: BlocksContent
  cta: CTA
}

export type OffersCarouselSlideProps = {
  slideIndex: number
  title: string
  surtitle: string
  firstIcon: string
  secondIcon: string
  text: string
  theme: ItemsTheme
}
export type VerticalCarouselProps = {
  title: string
  items: Omit<VerticalCarouselSlideProps, 'slideIndex'>[]
  hidePlayIcon?: boolean
}
export type VerticalCarouselSlideProps = {
  slideIndex: number
  image: string | { data: APIResponseData<'plugin::upload.file'> | null } | null
  title: string
  description: string
  url: string
  hidePlayIcon?: boolean
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
  theme: ItemsTheme
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
  theme: ItemsTheme
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

export type LatestEventsProps = {
  events: APIResponseData<'api::event.event'>[]
  className?: string
  buttonText?: string
  type?: string
}
export type LatestNewsProps = {
  title: string
  newsOrStudies:
    | APIResponseData<'api::news.news'>[]
    | APIResponseData<'api::resource.resource'>[]
    | APIResponseData<'api::blogtech.blogtech'>[]
  cta?: CTA
  className?: string
  isNews: boolean
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
    theme: ItemsTheme
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
  category?: string
  date: Date | string
  imageUrl: string | null | undefined
  slug: string
  type: string | undefined
}
export type NewsCardProps = {
  title: string
  category?: string
  date: Date | string
  imageUrl: string | null
  slug: string
}

export type WhiteSpaceProps = {
  space?: number
}
export type LogoProps = {
  logo: { logo: APIResponse<'plugin::upload.file'> | null | undefined }[]
}
export type AppBannerProps = {
  title?: string
  androidUrl?: string
  defaultUrl: string
  iosUrl?: string
  onClick?: () => void
}
export type FooterProps = {
  PlayStoreUrl: string
  AppStoreUrl: string
  bannerText: string
  bannerDefaultUrl: string
  LegalLinks: { Label: string; URL: string; id: number }[]
  Lists: {
    id: number
    Title: string
    Links: CTA[]
  }[]
}
export type FooterListProps = {
  title: string
  listItems: CTA[]
}

export type MobileMenuAccountSubPanelProps = {
  items: AccountItemDropdownProps[]
}
export type MobileMenuListSubPanelProps = {
  primaryList: CTA[]
  secondaryList: CTA[]
  cardTitle: string
  cardDescription: string
  cardLink: CTA
  cardFirstEmoji: string
  cardSecondEmoji: string
  theme: ItemsTheme
}
export type MobileMenuSubPanelProps = {
  onClose: () => void
  title: string
  children: React.ReactNode
}

export type ButtonProps = {
  href: string
  target?: '_blank'
  text: string
}

export type EligibilityProps = {
  title: string
  items: { title: string; description: string; emoji: string }[]
  cardTitle: string
  cardDescription: string
  cardCta: CTA
  cardFirstEmoji: string
  cardSecondEmoji: string
}

export type LinkProps = {
  href: string
  children?: ReactNode
} & NextLinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement>

export type ImageProps = {
  description?: string
  image: APIResponse<'plugin::upload.file'>
  alt: string
}

type ContentItem = {
  id: number
  text: string
  description: string | null
  firstEmoji: string
  secondEmoji: string
}
export type LittleListProps = {
  title?: string
  description?: string
  content?: ContentItem[]
}
export type SimulatorProps = {
  data: APIResponseData<'api::simulator.simulator'>
}
export type ListOffresProps = {
  newsRDVData: APIResponseData<'api::news.news'>[]
  listeActuCulturel: APIResponseData<'api::actualites-rdv-acteurs-culturel.actualites-rdv-acteurs-culturel'>
  eventsData: APIResponseData<'api::event.event'>[]
}
export type CulturalActorsHelpProps = {
  helpData: APIResponseData<'api::help-cultural-actors.help-cultural-actors'>
}

export type ListPressProps = {
  resourcesData: APIResponseData<'api::resource.resource'>[]
  presseListe: APIResponseData<'api::presse.presse'>
  eventsData: APIResponseData<'api::event.event'>[]
}

export type ListRessourcesProps = {
  ressourcesData: APIResponseData<'api::ressourcepass.ressourcepass'>[]
  ressourcesPassCultureListe: APIResponseData<'api::ressources-pass-culture.ressources-pass-culture'>
}

export type PageLayoutProps = {
  children: React.ReactNode
  seo?: APIResponseData<'api::page.page'>['attributes']['seo'] | null
  socialMediaSection?: SocialMediaProps
  title?: string
}

export type ListReglementsProps = {
  reglementsData: APIResponseData<'api::reglement.reglement'>[]
  reglementsPage: APIResponseData<'api::reglements-pass-culture.reglements-pass-culture'>
}

export type ListBlogtechProps = {
  blogtechData: APIResponseData<'api::blogtech.blogtech'>[]
  blogtechPage: APIResponseData<'api::blogtech-pass-culture.blogtech-pass-culture'>
}
