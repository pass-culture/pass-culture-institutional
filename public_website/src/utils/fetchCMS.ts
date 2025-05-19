import { stringify } from 'qs'

import { getStrapiURL } from './apiHelpers'
import type { APIResponseData } from '@/types/strapi'

type HttpResponse<T> = {
  data: T
}
export async function fetchCMS<T>(path: string) {
  try {
    const apiPath = `/api${path}`
    const sep = getStrapiURL(apiPath).includes('?') ? '&' : '?'
    const requestUrl = `${getStrapiURL(apiPath)}${
      process.env['NEXT_PUBLIC_PREVIEW_MODE'] === 'true'
        ? `${sep}publicationState=preview`
        : ''
    }`

    const mergedOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const response = await fetch(requestUrl, mergedOptions)

    if (!response.ok) {
      throw new Error(
        `CMS returned a non-OK status: ${response.status} on ${requestUrl}`
      )
    }

    const contentType = response.headers.get('Content-Type') || ''

    if (contentType.includes('application/json')) {
      const data: HttpResponse<T> = await response.json()
      return data
    } else {
      throw new Error(
        `Unexpected response. Content type received: ${contentType}`
      )
    }
  } catch (error) {
    throw new Error(
      `Please check if your CMS is running and you set all the required tokens. ${error}`
    )
  }
}

export async function fetchLayoutData() {
  const headerQuery = stringify({
    populate: [
      'targetItems.megaMenu',
      'targetItems.megaMenu.primaryListItems',
      'targetItems.megaMenu.secondaryListItems',
      'targetItems.megaMenu.cta',
      'targetItems.megaMenu.cardLink',
      'aboutItems.megaMenu',
      'aboutItems.megaMenu.primaryListItems',
      'aboutItems.megaMenu.secondaryListItems',
      'aboutItems.megaMenu.cta',
      'aboutItems.megaMenu.cardLink',
      'login',
      'login.items',
      'signup',
      'signup.items',
    ],
  })
  const headerData = await fetchCMS<APIResponseData<'api::header.header'>>(
    `/header?${headerQuery}`
  )

  const footerData = await fetchCMS<APIResponseData<'api::footer.footer'>>(
    '/footer?populate[0]=Lists&populate[1]=Lists.Links&populate[2]=LegalLinks'
  )

  return {
    headerData: headerData.data.attributes,
    footerData: footerData.data.attributes,
  }
}
