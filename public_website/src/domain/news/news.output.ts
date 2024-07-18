import { getNews as getNewsService } from './news.actions'

export const News = {
  getNews: (queryParams: string) => getNewsService(queryParams),
}
