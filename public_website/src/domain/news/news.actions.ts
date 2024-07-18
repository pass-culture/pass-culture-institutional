import { APIResponseData } from '@/types/strapi'
import { fetchCMS } from '@/utils/fetchCMS'

export const getNews = async (
  queryParams: string
): Promise<APIResponseData<'api::news.news'>[]> => {
  const apiEndpoint = `/news-list?${queryParams}`
  const response =
    await fetchCMS<APIResponseData<'api::news.news'>[]>(apiEndpoint)
  const { data } = response
  return data
}
