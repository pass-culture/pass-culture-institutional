import { APIResponseData } from '@/types/strapi'
import { fetchCMS } from '@/utils/fetchCMS'

export const getResources = async (
  queryParams: string
): Promise<APIResponseData<'api::resource.resource'>[]> => {
  const apiEndpoint = `/resources?${queryParams}`
  const response =
    await fetchCMS<APIResponseData<'api::resource.resource'>[]>(apiEndpoint)
  const { data } = response
  return data
}
