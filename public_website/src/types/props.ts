import { CTA } from './CTA'
import { APIResponse } from './strapi'

export interface PushCTAProps {
  title: string | undefined
  surtitle: string | undefined
  image: APIResponse<'plugin::upload.file'> | null | undefined
  cta: CTA | undefined
  icon: string | undefined
  className?: string
}
export type SocialMediaProps = {
  title: string
  socialMediaLink: { name: string; url: string }[]
  className?: string
}
