import type { APIResponseData } from '@/types/strapi'

type CategorizedItem =
  | APIResponseData<'api::news.news'>
  | APIResponseData<'api::resource.resource'>
  | APIResponseData<'api::blogtech.blogtech'>
  | APIResponseData<'api::rubrique-instit.rubrique-instit'>
  | APIResponseData<'api::observatory.observatory'>

const DEFAULT_CATEGORY = 'Article'

/**
 * Returns the label displayed on list cards.
 * The Observatory category is a relation, the other ones are plain strings.
 */
export const getItemCategory = (
  attributes: CategorizedItem['attributes']
): string => {
  if (!('category' in attributes)) return DEFAULT_CATEGORY

  const { category } = attributes
  if (typeof category === 'string') return category

  return category?.data?.attributes?.name ?? DEFAULT_CATEGORY
}
